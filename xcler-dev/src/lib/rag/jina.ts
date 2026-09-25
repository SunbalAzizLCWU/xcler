import { getJinaApiKey } from "./env";

const JINA_URL = "https://api.jina.ai/v1/embeddings";
const MODEL = "jina-embeddings-v3";
const DIMENSIONS = 1024;
const TIMEOUT_MS = 280;

type JinaTask = "retrieval.passage" | "retrieval.query";

type JinaResponse = {
  data?: Array<{ embedding: number[] }>;
  error?: { message?: string };
};

export async function embedTexts(texts: string[], task: JinaTask) {
  if (texts.length === 0) return [];
  const jinaApiKey = getJinaApiKey();
  if (!jinaApiKey) {
    throw new Error("Jina API key not configured");
  }
  const embeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += 24) {
    const batch = texts.slice(i, i + 24);
    const response = await fetch(JINA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jinaApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        task,
        dimensions: DIMENSIONS,
        input: batch,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Jina embeddings failed (${response.status}): ${detail.slice(0, 400)}`);
    }

    const json = (await response.json()) as JinaResponse;
    const rows = json.data ?? [];
    if (rows.length !== batch.length) {
      throw new Error("Jina returned an unexpected embedding count");
    }
    for (const row of rows) embeddings.push(row.embedding);
  }

  return embeddings;
}

export async function embedQuery(query: string) {
  const [embedding] = await embedTexts([query], "retrieval.query");
  return embedding;
}
