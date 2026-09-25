export const MAX_USER_MESSAGE_CHARS = 1500;
export const MAX_HISTORY_TURNS = 8;
export const PROMPT_GUARD_BLOCK_THRESHOLD = 0.7;

const INJECTION_PATTERNS = [
  /ignore (all )?(previous|prior|above|earlier) (instructions|prompts|rules)/i,
  /disregard (your )?(system|previous) (prompt|instructions)/i,
  /you are now (a |an )?(unrestricted|jailbroken|dan)\b/i,
  /\bdo anything now\b/i,
  /reveal (your |the )?(hidden |secret )?(system )?prompt/i,
  /show me (your |the )?(system|hidden) (prompt|instructions)/i,
  /developer mode (enabled|on)/i,
  /override (the )?(safety|guardrails|system)/i,
  /<(system|im_start|\/system)>/i,
  /\[INST\]/i,
  /new (system )?instructions\s*:/i,
];

export function sanitizeUserText(input: string) {
  return input
    .replace(/\u0000/g, "")
    .replace(/[\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_USER_MESSAGE_CHARS);
}

export function looksLikeInjection(text: string) {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

export function isValidVisitorName(name: string) {
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 80) return false;
  if (!/^[\p{L}][\p{L}\p{M}\s'.-]*$/u.test(trimmed)) return false;
  if (looksLikeInjection(trimmed)) return false;
  return true;
}

export function sanitizeVisitorName(name: string) {
  return name.replace(/[^\p{L}\p{M}\s'.-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 40);
}

export function promptGuardShouldBlock(raw: string) {
  const numeric = Number.parseFloat(raw);
  if (Number.isFinite(numeric)) return numeric >= PROMPT_GUARD_BLOCK_THRESHOLD;
  const label = raw.toLowerCase();
  return /\b(jailbreak|injection|attack|malicious)\b/.test(label) || label.trim() === "1";
}

export function refusalMessage(locale: "de" | "en") {
  return locale === "de"
    ? "Ich kann nur zu XCLER-Leistungen, Preisen und Ablauf helfen. Fragen Sie nach einem Chatbot, Workflow oder Projekt — oder schreiben Sie an hello@xcler.dev."
    : "I can only help with XCLER services, pricing, and process. Ask about a chatbot, workflow, or project — or email hello@xcler.dev.";
}

export function degradedMessage(locale: "de" | "en") {
  return locale === "de"
    ? "Die Antwort ist gerade nicht erreichbar. Bitte erneut versuchen oder hello@xcler.dev schreiben."
    : "I could not reach the assistant just now. Try again or email hello@xcler.dev.";
}

export function allowCitationUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && (parsed.hostname === "xcler.dev" || parsed.hostname === "www.xcler.dev");
  } catch {
    return false;
  }
}

export function filterAssistantOutput(text: string, locale: "de" | "en") {
  let out = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  out = out.replace(/javascript:/gi, "");
  out = out.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  if (/GROQ_API_KEY|ASSISTANT_SESSION_SECRET|SUPABASE_SERVICE|BEGIN PRIVATE KEY/i.test(out)) {
    return refusalMessage(locale);
  }
  if (
    /retrieved knowledge:|system prompt source|ignore these rules/i.test(out) &&
    out.length > 900
  ) {
    return refusalMessage(locale);
  }
  return out.trim();
}

export function isGreeting(query: string) {
  return /^(hi|hey|hello|hallo|servus|moin|hiya|good (morning|afternoon|evening)|guten (tag|morgen|abend))[\s!.?]*$/i.test(
    query.trim()
  );
}
