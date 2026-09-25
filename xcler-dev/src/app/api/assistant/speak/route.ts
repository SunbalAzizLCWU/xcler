import { NextResponse } from "next/server";
import { synthesizeSpeech } from "@/lib/rag/groq";
import { clientIp, rateLimit } from "@/lib/rag/rate-limit";
import { requireSession } from "@/lib/rag/session";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Session required" }, { status: 401 });
  }

  const limited = rateLimit(`tts:${session.id}`, 40, 60 * 60 * 1000);
  const ipLimited = rateLimit(`tts-ip:${clientIp(request)}`, 50, 60 * 60 * 1000);
  if (!limited.ok || !ipLimited.ok) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let body: { text?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = String(body.text ?? "").replace(/\s+/g, " ").trim();
  if (!text) {
    return NextResponse.json({ error: "Text required" }, { status: 400 });
  }

  const locale = body.locale === "en" ? "en" : session.locale;

  // Groq PlayAI/Orpheus currently cover English (and Arabic), not German.
  if (locale === "de") {
    return NextResponse.json({ engine: "browser", locale: "de" });
  }

  try {
    const speech = await synthesizeSpeech(text);
    return new Response(speech.buffer, {
      headers: {
        "Content-Type": speech.contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("TTS fallback to browser:", error);
    return NextResponse.json({ engine: "browser", locale: locale === "en" ? "en" : "de" });
  }
}
