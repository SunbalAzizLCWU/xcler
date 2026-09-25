import { NextResponse } from "next/server";
import { transcribeAudio } from "@/lib/rag/groq";
import { clientIp, rateLimit } from "@/lib/rag/rate-limit";
import { requireSession } from "@/lib/rag/session";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Session required" }, { status: 401 });
  }

  const limited = rateLimit(`stt:${session.id}`, 30, 60 * 60 * 1000);
  const ipLimited = rateLimit(`stt-ip:${clientIp(request)}`, 40, 60 * 60 * 1000);
  if (!limited.ok || !ipLimited.ok) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof Blob) || file.size < 400) {
    return NextResponse.json({ error: "Audio required" }, { status: 400 });
  }
  if (file.size > 4_000_000) {
    return NextResponse.json({ error: "Audio too large" }, { status: 413 });
  }

  const filename = file instanceof File && file.name ? file.name : "speech.webm";
  const text = await transcribeAudio(file, filename, session.locale);
  if (!text) {
    return NextResponse.json({ error: "Could not transcribe audio" }, { status: 422 });
  }

  return NextResponse.json({ text });
}
