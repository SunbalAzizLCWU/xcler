import { getGroqApiKey } from "./env";
import { promptGuardShouldBlock } from "./guardrails";

const GROQ_CHAT = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_STT = "https://api.groq.com/openai/v1/audio/transcriptions";
const GROQ_TTS = "https://api.groq.com/openai/v1/audio/speech";

/** Latest Qwen on Groq. Instruct mode (`reasoning_effort: none`) for sub-second replies. */
export const CHAT_MODELS = ["qwen/qwen3.8-27b"] as const;
export const CHAT_MODEL = CHAT_MODELS[0];
const AVAILABILITY_FALLBACK = "openai/gpt-oss-20b";
export const PROMPT_GUARD_MODEL = "meta-llama/llama-prompt-guard-2-22m";
export const STT_MODEL = "whisper-large-v3-turbo";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function groqHeaders(json = true) {
  const key = getGroqApiKey();
  if (!key) {
    throw new Error("Missing environment variable GROQ_API_KEY");
  }
  return {
    Authorization: `Bearer ${key}`,
    ...(json ? { "Content-Type": "application/json" } : {}),
  };
}

function abortAfter(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return {
    signal: controller.signal,
    dispose: () => clearTimeout(timer),
  };
}

export async function streamChatCompletion(messages: ChatMessage[], options?: { maxTokens?: number }) {
  let lastError = "";
  const attempts: Array<{ model: string; extra: Record<string, unknown> }> = [
    {
      model: CHAT_MODEL,
      extra: { reasoning_effort: "none", reasoning_format: "hidden", top_p: 0.8 },
    },
    { model: AVAILABILITY_FALLBACK, extra: {} },
  ];

  for (const attempt of attempts) {
    const timeout = abortAfter(12_000);
    try {
      const response = await fetch(GROQ_CHAT, {
        method: "POST",
        headers: groqHeaders(),
        body: JSON.stringify({
          model: attempt.model,
          messages,
          temperature: 0.3,
          max_tokens: options?.maxTokens ?? 500,
          stream: true,
          ...attempt.extra,
        }),
        signal: timeout.signal,
      });

      if (response.ok && response.body) {
        timeout.dispose();
        return { model: attempt.model, stream: response.body };
      }

      lastError = await response.text();
    } catch (error) {
      lastError = error instanceof Error ? error.message : "fetch failed";
    } finally {
      timeout.dispose();
    }
  }

  throw new Error(`Groq chat failed: ${lastError.slice(0, 400)}`);
}

export async function classifyPromptAttack(text: string) {
  const timeout = abortAfter(400);
  try {
    const response = await fetch(GROQ_CHAT, {
      method: "POST",
      headers: groqHeaders(),
      body: JSON.stringify({
        model: PROMPT_GUARD_MODEL,
        messages: [{ role: "user", content: text.slice(0, 1500) }],
        temperature: 0,
        max_tokens: 8,
      }),
      signal: timeout.signal,
    });
    if (!response.ok) return "allow" as const;
    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = json.choices?.[0]?.message?.content ?? "0";
    return promptGuardShouldBlock(raw) ? ("block" as const) : ("allow" as const);
  } catch {
    return "allow" as const;
  } finally {
    timeout.dispose();
  }
}

export async function transcribeAudio(file: Blob, filename: string, language?: "de" | "en") {
  const form = new FormData();
  form.set("file", file, filename);
  form.set("model", STT_MODEL);
  form.set("response_format", "json");
  if (language) form.set("language", language);

  const timeout = abortAfter(20_000);
  try {
    const response = await fetch(GROQ_STT, {
      method: "POST",
      headers: groqHeaders(false),
      body: form,
      signal: timeout.signal,
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Groq STT failed (${response.status}): ${detail.slice(0, 400)}`);
    }

    const json = (await response.json()) as { text?: string };
    return (json.text ?? "").trim();
  } finally {
    timeout.dispose();
  }
}

const TTS_ATTEMPTS = [
  { model: "canopylabs/orpheus-v1-english", voice: "hannah" },
  { model: "canopylabs/orpheus-v1-english", voice: "austin" },
  { model: "canopylabs/orpheus-v1-english", voice: "troy" },
] as const;

export async function synthesizeSpeech(text: string) {
  let lastError = "";

  for (const attempt of TTS_ATTEMPTS) {
    const timeout = abortAfter(15_000);
    try {
      const response = await fetch(GROQ_TTS, {
        method: "POST",
        headers: groqHeaders(),
        body: JSON.stringify({
          model: attempt.model,
          voice: attempt.voice,
          input: text.slice(0, 1400),
          response_format: "wav",
        }),
        signal: timeout.signal,
      });

      if (response.ok) {
        return {
          buffer: Buffer.from(await response.arrayBuffer()),
          contentType: response.headers.get("content-type") || "audio/wav",
          engine: "groq" as const,
        };
      }

      lastError = `${attempt.model}/${attempt.voice} ${response.status}: ${(await response.text()).slice(0, 220)}`;
    } finally {
      timeout.dispose();
    }
  }

  throw new Error(`Groq TTS failed: ${lastError.slice(0, 400)}`);
}

export async function* readSseTokens(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let inThink = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n");
    buffer = parts.pop() ?? "";

    for (const line of parts) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data) as {
          choices?: Array<{ delta?: { content?: string | null } }>;
        };
        let token = json.choices?.[0]?.delta?.content;
        if (!token) continue;
        if (token.includes("<think>")) inThink = true;
        if (inThink) {
          if (token.includes("</think>")) {
            inThink = false;
            token = token.slice(token.indexOf("</think>") + "</think>".length);
          } else {
            continue;
          }
        }
        if (token) yield token;
      } catch {
        // ignore malformed SSE fragments
      }
    }
  }
}
