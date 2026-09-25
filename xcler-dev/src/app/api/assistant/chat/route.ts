import { NextResponse } from "next/server";
import { buildSystemPrompt, uniqueCitations } from "@/lib/rag/prompt";
import { clientIp, rateLimit } from "@/lib/rag/rate-limit";
import { retrieveChunks } from "@/lib/rag/retrieve";
import { logChatTurn, requireSession } from "@/lib/rag/session";
import { isSessionEnded } from "@/lib/rag/transcript-email";
import { readSseTokens, streamChatCompletion, type ChatMessage } from "@/lib/rag/groq";

export const runtime = "nodejs";
export const maxDuration = 60;

type IncomingMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Session required" }, { status: 401 });
  }
  if (isSessionEnded(session.id)) {
    return NextResponse.json({ error: "Chat ended", ended: true }, { status: 410 });
  }

  const limited = rateLimit(`chat:${session.id}`, 40, 60 * 60 * 1000);
  const ipLimited = rateLimit(`chat-ip:${clientIp(request)}`, 80, 60 * 60 * 1000);
  if (!limited.ok || !ipLimited.ok) {
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
    .map((msg) => ({ role: msg.role, content: msg.content.slice(0, 4000) }))
    .slice(-12);

  const lastUser = [...history].reverse().find((msg) => msg.role === "user");
  if (!lastUser?.content.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const started = Date.now();
  const voice = Boolean(body.voice);
  let chunks;
  try {
    chunks = await retrieveChunks(lastUser.content, voice ? 6 : 8);
  } catch (error) {
    console.error("retrieve failed:", error);
    return NextResponse.json({ error: "Retrieval failed" }, { status: 502 });
  }
  const citations = uniqueCitations(chunks);

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: buildSystemPrompt({
        locale: session.locale,
        visitorName: session.name,
        voice,
        chunks,
      }),
    },
    ...history,
  ];

  await logChatTurn({
    sessionId: session.id,
    role: "user",
    content: lastUser.content,
  });

  let stream: ReadableStream<Uint8Array>;
  try {
    ({ stream } = await streamChatCompletion(messages, { maxTokens: voice ? 280 : 700 }));
  } catch (error) {
    console.error("Groq chat failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Chat failed" },
      { status: 502 }
    );
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
        send({ type: "done", text: full });
        await logChatTurn({
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

  return new Response(sse, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
