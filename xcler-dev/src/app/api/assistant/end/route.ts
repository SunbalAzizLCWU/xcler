import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rag/rate-limit";
import { requireSession } from "@/lib/rag/session";
import { sendChatTranscript, type EndReason, type TranscriptMessage } from "@/lib/rag/transcript-email";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Session required" }, { status: 401 });
  }

  const limited = rateLimit(`end:${session.id}`, 8, 60 * 60 * 1000);
  const ipLimited = rateLimit(`end-ip:${clientIp(request)}`, 20, 60 * 60 * 1000);
  if (!limited.ok || !ipLimited.ok) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let body: { reason?: string; messages?: TranscriptMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const reason: EndReason = body.reason === "idle" ? "idle" : "manual";
  const messages = (body.messages ?? [])
    .filter((msg) => msg && (msg.role === "user" || msg.role === "assistant") && typeof msg.content === "string")
    .map((msg) => ({
      role: msg.role,
      content: msg.content.slice(0, 8000),
    }))
    .slice(0, 80);

  try {
    const result = await sendChatTranscript({
      sessionId: session.id,
      name: session.name,
      email: session.email,
      locale: session.locale,
      reason,
      messages,
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Transcript email failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send transcript" },
      { status: 502 }
    );
  }
}
