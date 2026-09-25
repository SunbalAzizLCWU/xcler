import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rag/rate-limit";
import { createAssistantSession, isValidEmail, isValidName } from "@/lib/rag/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limited = rateLimit(`session:${clientIp(request)}`, 20, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many sessions. Try again later." }, { status: 429 });
  }

  let body: { name?: string; email?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "");
  const email = String(body.email ?? "");
  const locale = body.locale === "en" ? "en" : "de";

  if (!isValidName(name) || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid name and email." }, { status: 400 });
  }

  const { session, token } = await createAssistantSession({ name, email, locale });
  return NextResponse.json({
    token,
    sessionId: session.id,
    name: session.name,
  });
}
