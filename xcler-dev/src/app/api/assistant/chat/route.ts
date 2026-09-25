import { NextResponse } from "next/server";
import {
  degradedMessage,
  filterAssistantOutput,
  looksLikeInjection,
  MAX_HISTORY_TURNS,
  refusalMessage,
  sanitizeUserText,
} from "@/lib/rag/guardrails";
import { buildSystemPrompt, uniqueCitations } from "@/lib/rag/prompt";
import { clientIp, rateLimit } from "@/lib/rag/rate-limit";
import { retrieveChunks } from "@/lib/rag/retrieve";
import { logChatTurn, requireSession } from "@/lib/rag/session";
import { isSessionEnded } from "@/lib/rag/transcript-email";
import {
  classifyPromptAttack,
  CHAT_MODEL,
  readSseTokens,
  streamChatCompletion,
  type ChatMessage,
} from "@/lib/rag/groq";
import { getGroqApiKey } from "@/lib/rag/env";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

type IncomingMessage = { role: "user" | "assistant"; content: string };

const SSE_HEADERS = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-store, no-transform",
  Connection: "keep-alive",
  "X-Content-Type-Options": "nosniff",
};

function sseText(text: string, citations: Array<{ title: string; heading: string; url: string }> = []) {
  const encoder = new TextEncoder();
  const body = [
    `data: ${JSON.stringify({ type: "meta", citations })}\n\n`,
    `data: ${JSON.stringify({ type: "token", token: text })}\n\n`,
    `data: ${JSON.stringify({ type: "done", text })}\n\n`,
  ].join("");
  return new Response(encoder.encode(body), { headers: SSE_HEADERS });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    model: CHAT_MODEL,
    groq: Boolean(getGroqApiKey()),
  });
}

export async function POST(request: Request) {
  try {
    return await handleChat(request);
  } catch (error) {
    console.error("assistant chat crashed:", error);
    return sseText(degradedMessage("en"));
  }
}

async function handleChat(request: Request) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Session required" }, { status: 401 });
  }
  if (isSessionEnded(session.id)) {
    return NextResponse.json({ error: "Chat ended", ended: true }, { status: 410 });
  }

  const burst = rateLimit(`chat-burst:${session.id}`, 8, 60 * 1000);
  const limited = rateLimit(`chat:${session.id}`, 40, 60 * 60 * 1000);
  const ipLimited = rateLimit(`chat-ip:${clientIp(request)}`, 80, 60 * 60 * 1000);
  if (!burst.ok || !limited.ok || !ipLimited.ok) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let body: { messages?: IncomingMessage[]; voice?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter((msg) => msg && (msg.role === "user" || msg.role === "assistant") && typeof msg.content === "string")
    .map((msg) => ({
      role: msg.role,
      content: sanitizeUserText(msg.content),
    }))
    .filter((msg) => msg.content)
    .slice(-MAX_HISTORY_TURNS);

  const lastUser = [...history].reverse().find((msg) => msg.role === "user");
  if (!lastUser?.content.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const started = Date.now();
  const voice = Boolean(body.voice);
  const locale = session.locale;

  if (looksLikeInjection(lastUser.content)) {
    const text = refusalMessage(locale);
    void logChatTurn({ sessionId: session.id, role: "user", content: lastUser.content });
    void logChatTurn({ sessionId: session.id, role: "assistant", content: text, latencyMs: Date.now() - started });
    return sseText(text);
  }

  let chunks;
  let guard: "allow" | "block" = "allow";
  try {
    const [retrieved, verdict] = await Promise.all([
      retrieveChunks(lastUser.content, voice ? 5 : 6),
      classifyPromptAttack(lastUser.content),
    ]);
    chunks = retrieved;
    guard = verdict;
  } catch (error) {
    console.error("retrieve failed:", error);
    chunks = await retrieveChunks(lastUser.content, 4).catch(() => []);
  }

  if (guard === "block") {
    const text = refusalMessage(locale);
    void logChatTurn({ sessionId: session.id, role: "user", content: lastUser.content });
    void logChatTurn({ sessionId: session.id, role: "assistant", content: text, latencyMs: Date.now() - started });
    return sseText(text);
  }

  const citations = uniqueCitations(chunks ?? []);

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: buildSystemPrompt({
        locale,
        visitorName: session.name,
        voice,
        chunks: chunks ?? [],
      }),
    },
    ...history,
  ];

  void logChatTurn({
    sessionId: session.id,
    role: "user",
    content: lastUser.content,
  });

  let stream: ReadableStream<Uint8Array>;
  try {
    ({ stream } = await streamChatCompletion(messages, { maxTokens: voice ? 220 : 420 }));
  } catch (error) {
    console.error("Groq chat failed:", error);
    return sseText(degradedMessage(locale), citations);
  }

  const encoder = new TextEncoder();
  let full = "";

  const sse = new ReadableStream({
    async start(controller) {
      const send = (payload: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };
      send({ type: "meta", citations });
      try {
        for await (const token of readSseTokens(stream)) {
          full += token;
          send({ type: "token", token });
        }
        full = filterAssistantOutput(full, locale);
        if (!full) full = refusalMessage(locale);
        send({ type: "done", text: full });
        void logChatTurn({
          sessionId: session.id,
          role: "assistant",
          content: full,
          citations,
          latencyMs: Date.now() - started,
        });
      } catch (error) {
        send({
          type: "error",
          error: error instanceof Error ? error.message : "Chat failed",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(sse, { headers: SSE_HEADERS });
}
