import { getRagEnv } from "./env";

const GROQ_CHAT = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_STT = "https://api.groq.com/openai/v1/audio/transcriptions";
const GROQ_TTS = "https://api.groq.com/openai/v1/audio/speech";

export const CHAT_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b"] as const;
export const STT_MODEL = "whisper-large-v3-turbo";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function groqHeaders(json = true) {
  const { groqApiKey } = getRagEnv();
  return {
    Authorization: `Bearer ${groqApiKey}`,
    ...(json ? { "Content-Type": "application/json" } : {}),
  };
}

export async function streamChatCompletion(messages: ChatMessage[], options?: { maxTokens?: number }) {
  let lastError = "";

  for (const model of CHAT_MODELS) {
    const response = await fetch(GROQ_CHAT, {
      method: "POST",
      headers: groqHeaders(),
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.25,
        max_tokens: options?.maxTokens ?? 700,
        stream: true,
      }),
    });

    if (response.ok && response.body) {
      return { model, stream: response.body };
    }

    lastError = await response.text();
    // Try the next model on deprecation / access errors.
  }

  throw new Error(`Groq chat failed: ${lastError.slice(0, 400)}`);
}

export async function transcribeAudio(file: Blob, filename: string, language?: "de" | "en") {
  const form = new FormData();
  form.set("file", file, filename);
  form.set("model", STT_MODEL);
  form.set("response_format", "json");
  if (language) form.set("language", language);

  const response = await fetch(GROQ_STT, {
    method: "POST",
    headers: groqHeaders(false),
    body: form,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Groq STT failed (${response.status}): ${detail.slice(0, 400)}`);
  }

  const json = (await response.json()) as { text?: string };
  return (json.text ?? "").trim();
}

const TTS_ATTEMPTS = [
  { model: "canopylabs/orpheus-v1-english", voice: "hannah" },
  { model: "canopylabs/orpheus-v1-english", voice: "austin" },
  { model: "canopylabs/orpheus-v1-english", voice: "troy" },
] as const;

export async function synthesizeSpeech(text: string) {
  let lastError = "";

  for (const attempt of TTS_ATTEMPTS) {
    const response = await fetch(GROQ_TTS, {
      method: "POST",
      headers: groqHeaders(),
      body: JSON.stringify({
        model: attempt.model,
        voice: attempt.voice,
        input: text.slice(0, 1400),
        response_format: "wav",
      }),
    });

    if (response.ok) {
      return {
        buffer: Buffer.from(await response.arrayBuffer()),
        contentType: response.headers.get("content-type") || "audio/wav",
        engine: "groq" as const,
      };
    }

    lastError = `${attempt.model}/${attempt.voice} ${response.status}: ${(await response.text()).slice(0, 220)}`;
  }

  throw new Error(`Groq TTS failed: ${lastError.slice(0, 400)}`);
}

export async function* readSseTokens(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

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
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const token = json.choices?.[0]?.delta?.content;
        if (token) yield token;
      } catch {
        // ignore malformed SSE fragments
      }
    }
  }
}
