import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { RetrievedChunk } from "./retrieve";

let cachedBehavior = "";

export function loadBehaviorPrompt() {
  if (cachedBehavior) return cachedBehavior;
  const file = fileURLToPath(new URL("./behavior.md", import.meta.url));
  try {
    cachedBehavior = readFileSync(file, "utf8").trim();
  } catch {
    cachedBehavior =
      "You are the XCLER website assistant. Answer only from retrieved knowledge-base context. German users get Sie. Never invent prices, addresses or guarantees. Offer hello@xcler.dev or WhatsApp +92 315 4823517 when unsure.";
  }
  return cachedBehavior;
}

export function buildSystemPrompt(input: {
  locale: "de" | "en";
  visitorName: string;
  voice: boolean;
  chunks: RetrievedChunk[];
}) {
  const sources = input.chunks
    .map((chunk, index) => {
      const url = chunk.sourceUrl ? `URL: ${chunk.sourceUrl}` : "";
      return `[${index + 1}] ${chunk.title} — ${chunk.heading}\n${url}\n${chunk.content}`;
    })
    .join("\n\n---\n\n");

  const voiceRule = input.voice
    ? "VOICE MODE is on. Answer in 2–4 short spoken sentences. No lists, tables, markdown or URLs. Offer to continue in text chat for details."
    : "TEXT MODE is on. Short paragraphs are fine. You may include one source URL as 'More: {url}'.";

  return `${loadBehaviorPrompt()}

Visitor name: ${input.visitorName}
Site locale: ${input.locale}
${voiceRule}

Retrieved knowledge:
${sources || "(no matching passages — say you are not sure and offer contact)"}`;
}

export function uniqueCitations(chunks: RetrievedChunk[]) {
  const seen = new Set<string>();
  const citations: Array<{ title: string; heading: string; url: string }> = [];
  let blogCount = 0;

  for (const chunk of chunks) {
    if (!chunk.sourceUrl || seen.has(chunk.sourceUrl)) continue;
    const isBlog = /\/blog\//.test(chunk.sourceUrl);
    if (isBlog && blogCount >= 1) continue;
    seen.add(chunk.sourceUrl);
    if (isBlog) blogCount += 1;
    citations.push({
      title: chunk.title,
      heading: chunk.heading,
      url: chunk.sourceUrl,
    });
    if (citations.length >= 3) break;
  }

  return citations;
}
