import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { getSessionSecret, useRemoteSupabaseRag } from "./env";
import { isValidVisitorName, sanitizeUserText } from "./guardrails";
import { getServiceSupabase } from "./supabase";

export type AssistantSession = {
  id: string;
  name: string;
  email: string;
  locale: "de" | "en";
  exp: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email) && email.length <= 180;
}

export function isValidName(name: string) {
  return isValidVisitorName(name);
}

function encode(payload: AssistantSession) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", getSessionSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function decode(token: string): AssistantSession | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", getSessionSecret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as AssistantSession;
    if (!payload.id || !payload.email || !payload.name || !payload.exp) return null;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function readBearerToken(request: Request) {
  const header = request.headers.get("authorization") || "";
  if (header.toLowerCase().startsWith("bearer ")) return header.slice(7).trim();
  return "";
}

export function parseSessionToken(token: string) {
  return decode(token);
}

export async function createAssistantSession(input: {
  name: string;
  email: string;
  locale: "de" | "en";
}) {
  const session: AssistantSession = {
    id: randomUUID(),
    name: sanitizeUserText(input.name).slice(0, 80),
    email: input.email.trim().toLowerCase().slice(0, 180),
    locale: input.locale,
    exp: Date.now() + SESSION_TTL_MS,
  };

  if (useRemoteSupabaseRag()) {
    try {
      const supabase = getServiceSupabase();
      const { error } = await supabase.from("chat_sessions").insert({
        id: session.id,
        locale: session.locale,
        channel: "text",
        visitor_name: session.name,
        visitor_email: session.email,
      });
      if (error) console.error("chat_sessions insert skipped:", error.message);
    } catch (error) {
      console.error("chat_sessions insert skipped:", error);
    }
  }

  return { session, token: encode(session) };
}

export async function requireSession(request: Request) {
  const token = readBearerToken(request);
  const session = parseSessionToken(token);
  if (!session) return null;
  return session;
}

export async function logChatTurn(input: {
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  citations?: unknown;
  latencyMs?: number;
}) {
  if (!useRemoteSupabaseRag()) return;
  try {
    const supabase = getServiceSupabase();
    await supabase.from("chat_messages").insert({
      session_id: input.sessionId,
      role: input.role,
      content: input.content,
      citations: input.citations ?? [],
      latency_ms: input.latencyMs ?? null,
    });
  } catch (error) {
    console.error("chat_messages insert skipped:", error);
  }
}
