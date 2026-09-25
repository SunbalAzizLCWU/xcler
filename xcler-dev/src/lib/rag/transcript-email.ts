import { getServiceSupabase } from "./supabase";

export type TranscriptMessage = {
  role: "user" | "assistant";
  content: string;
};

export type EndReason = "idle" | "manual";

const TRANSCRIPT_TO = "hello@xcler.dev";
const endedSessions = new Map<string, number>();

const C = {
  ink: "#07080c",
  charcoal: "#12141a",
  cream: "#f2f4f7",
  creamMuted: "#d8dce3",
  text: "#0c0e12",
  textSecondary: "#2a2f3a",
  border: "#d5dae3",
  panel: "#eef1f5",
  terracotta: "#e64516",
  sage: "#0f9f5c",
  white: "#ffffff",
} as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function markSessionEnded(sessionId: string) {
  endedSessions.set(sessionId, Date.now());
}

export function isSessionEnded(sessionId: string) {
  return endedSessions.has(sessionId);
}

function pruneEnded() {
  const cutoff = Date.now() - 1000 * 60 * 60 * 24;
  for (const [id, at] of endedSessions) {
    if (at < cutoff) endedSessions.delete(id);
  }
}

function reasonLabel(reason: EndReason) {
  return reason === "idle" ? "Idle for 10 minutes" : "Visitor ended the chat";
}

function buildTranscriptHtml(input: {
  name: string;
  email: string;
  locale: string;
  reason: EndReason;
  messages: TranscriptMessage[];
}) {
  const rows = input.messages
    .map((msg) => {
      const label = msg.role === "user" ? "Visitor" : "Assistant";
      const bg = msg.role === "user" ? C.panel : C.white;
      return `<tr>
        <td style="padding:12px 16px;background:${bg};border-top:1px solid ${C.border};">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;color:${C.ink};">${label}</p>
          <p style="margin:0;font-size:15px;line-height:1.65;color:${C.textSecondary};white-space:pre-wrap;">${escapeHtml(msg.content)}</p>
        </td>
      </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>XCLER chat transcript</title></head>
<body style="margin:0;padding:24px;background:${C.panel};font-family:Arial,Helvetica,sans-serif;color:${C.text};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:${C.white};border:1px solid ${C.border};">
    <tr>
      <td style="padding:20px 24px;background:${C.ink};">
        <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${C.creamMuted};">Website assistant</p>
        <h1 style="margin:8px 0 0 0;font-size:22px;color:${C.cream};">Chat transcript — ${escapeHtml(input.name)}</h1>
      </td>
    </tr>
    <tr><td style="height:4px;background:linear-gradient(90deg,${C.sage},${C.terracotta});font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr>
      <td style="padding:24px;">
        <p style="margin:0 0 8px 0;font-size:15px;"><strong>Name:</strong> ${escapeHtml(input.name)}</p>
        <p style="margin:0 0 8px 0;font-size:15px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(input.email)}" style="color:${C.ink};">${escapeHtml(input.email)}</a></p>
        <p style="margin:0 0 8px 0;font-size:15px;"><strong>Locale:</strong> ${escapeHtml(input.locale)}</p>
        <p style="margin:0 0 18px 0;font-size:15px;"><strong>Ended:</strong> ${reasonLabel(input.reason)}</p>
      </td>
    </tr>
    ${rows || `<tr><td style="padding:16px;color:${C.textSecondary};">No messages were exchanged.</td></tr>`}
  </table>
</body>
</html>`;
}

async function alreadySent(sessionId: string) {
  if (endedSessions.has(sessionId)) return true;
  try {
    const supabase = getServiceSupabase();
    const { data } = await supabase
      .from("chat_sessions")
      .select("transcript_sent_at,ended_at")
      .eq("id", sessionId)
      .maybeSingle();
    if (data?.transcript_sent_at) return true;
  } catch {
    // tables may not exist yet
  }
  return false;
}

async function persistEnded(sessionId: string, reason: EndReason) {
  markSessionEnded(sessionId);
  try {
    const supabase = getServiceSupabase();
    await supabase
      .from("chat_sessions")
      .update({
        ended_at: new Date().toISOString(),
        transcript_sent_at: new Date().toISOString(),
        end_reason: reason,
      })
      .eq("id", sessionId);
  } catch (error) {
    console.error("chat_sessions end update skipped:", error);
  }
}

export async function sendChatTranscript(input: {
  sessionId: string;
  name: string;
  email: string;
  locale: string;
  reason: EndReason;
  messages: TranscriptMessage[];
}) {
  pruneEnded();
  if (await alreadySent(input.sessionId)) {
    markSessionEnded(input.sessionId);
    return { sent: false, alreadySent: true };
  }

  markSessionEnded(input.sessionId);

  const resendApiKey = process.env.RESEND_API_KEY?.replace(/^RESEND_API_KEY=/i, "").trim();
  if (!resendApiKey) {
    endedSessions.delete(input.sessionId);
    throw new Error("Missing RESEND_API_KEY");
  }

  const html = buildTranscriptHtml(input);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "XCLER Assistant <notifications@xcler.dev>",
      to: [TRANSCRIPT_TO],
      reply_to: input.email,
      subject: `Chat transcript: ${input.name} — ${reasonLabel(input.reason)}`,
      html,
    }),
  });

  if (!response.ok) {
    endedSessions.delete(input.sessionId);
    const detail = await response.text();
    throw new Error(`Resend failed (${response.status}): ${detail.slice(0, 400)}`);
  }

  await persistEnded(input.sessionId, input.reason);
  return { sent: true, alreadySent: false };
}
