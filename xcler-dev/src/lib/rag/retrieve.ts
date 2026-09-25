import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { embedQuery } from "./jina";
import { getServiceSupabase } from "./supabase";

export type RetrievedChunk = {
  id: number | string;
  heading: string;
  content: string;
  sourceUrl: string;
  title: string;
  score: number;
};

type LocalChunk = {
  id: number | string;
  heading: string;
  content: string;
  source_url?: string;
  title?: string;
  lang?: string;
  embedding_b64: string;
  embedding?: Float32Array;
};

type LocalIndex = {
  chunks: LocalChunk[];
};

let cachedIndex: LocalChunk[] | null = null;

function decodeEmbedding(b64: string) {
  const buf = Buffer.from(b64, "base64");
  return new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
}

function loadLocalIndex(): LocalChunk[] {
  if (cachedIndex) return cachedIndex;
  try {
    const file = fileURLToPath(new URL("./kb-index.json", import.meta.url));
    const parsed = JSON.parse(readFileSync(file, "utf8")) as LocalIndex;
    if (Array.isArray(parsed.chunks)) {
      cachedIndex = parsed.chunks.map((chunk) => ({
        ...chunk,
        embedding: decodeEmbedding(chunk.embedding_b64),
      }));
      return cachedIndex;
    }
  } catch (error) {
    console.error("Failed to read local KB index:", error);
  }
  cachedIndex = [];
  return cachedIndex;
}

function cosine(a: number[] | Float32Array, b: Float32Array) {
  const len = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < len; i += 1) {
    const x = a[i] ?? 0;
    const y = b[i] ?? 0;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function sanitizeQuery(query: string) {
  return query.replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 500);
}

let remoteDisabled = false;

async function matchRemote(embedding: number[], query: string, matchCount: number) {
  if (remoteDisabled) return null;
  try {
    const supabase = getServiceSupabase();
    const attempts = [
      { query_embedding: embedding, query_text: query, match_count: matchCount },
      { query_embedding: `[${embedding.join(",")}]`, query_text: query, match_count: matchCount },
    ];

    for (const args of attempts) {
      const { data, error } = await supabase.rpc("match_kb_chunks", args);
      if (!error && Array.isArray(data)) {
        return data as Array<{
          id: number;
          heading: string | null;
          content: string;
          metadata: { source_url?: string; title?: string; heading?: string } | null;
          score: number;
        }>;
      }
      if (error?.message?.includes("schema cache") || error?.code === "PGRST202" || error?.code === "PGRST205") {
        remoteDisabled = true;
        break;
      }
      if (error) console.error("match_kb_chunks:", error.message);
    }
  } catch (error) {
    console.error("Supabase retrieval unavailable:", error);
    remoteDisabled = true;
  }
  return null;
}

function localHybridSearch(embedding: number[], query: string, matchCount: number) {
  const chunks = loadLocalIndex();
  if (chunks.length === 0) return [];

  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 2);
  const semantic = chunks
    .map((chunk) => ({
      chunk,
      rank: cosine(embedding, chunk.embedding ?? decodeEmbedding(chunk.embedding_b64)),
    }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, matchCount * 2);

  const lexical = chunks
    .map((chunk) => {
      const hay = `${chunk.heading} ${chunk.content}`.toLowerCase();
      const hits = terms.reduce((sum, term) => sum + (hay.includes(term) ? 1 : 0), 0);
      return { chunk, rank: hits };
    })
    .filter((row) => row.rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, matchCount * 2);

  const k = 50;
  const scores = new Map<string, { chunk: LocalChunk; score: number }>();
  semantic.forEach((row, index) => {
    const key = String(row.chunk.id);
    scores.set(key, {
      chunk: row.chunk,
      score: (scores.get(key)?.score ?? 0) + 1 / (k + index + 1),
    });
  });
  lexical.forEach((row, index) => {
    const key = String(row.chunk.id);
    const current = scores.get(key);
    scores.set(key, {
      chunk: row.chunk,
      score: (current?.score ?? 0) + 1 / (k + index + 1),
    });
  });

  return [...scores.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, matchCount)
    .map((row) => ({
      id: row.chunk.id,
      heading: row.chunk.heading,
      content: row.chunk.content,
      sourceUrl: row.chunk.source_url ?? "",
      title: row.chunk.title ?? row.chunk.heading,
      score: row.score,
    }));
}

export async function retrieveChunks(rawQuery: string, matchCount = 8): Promise<RetrievedChunk[]> {
  const query = sanitizeQuery(rawQuery);
  if (!query) return [];
  const embedding = await embedQuery(query);

  try {
    const remote = await matchRemote(embedding, query, matchCount);
    if (remote && remote.length > 0) {
      return remote.map((row) => ({
        id: row.id,
        heading: row.heading || row.metadata?.heading || "",
        content: row.content,
        sourceUrl: row.metadata?.source_url ?? "",
        title: row.metadata?.title ?? row.heading ?? "XCLER",
        score: row.score,
      }));
    }
  } catch (error) {
    console.error("Supabase retrieval failed, using local index:", error);
  }

  return localHybridSearch(embedding, query, matchCount);
}
