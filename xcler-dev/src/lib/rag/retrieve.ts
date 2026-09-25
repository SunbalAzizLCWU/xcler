import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { useRemoteSupabaseRag } from "./env";
import { isGreeting } from "./guardrails";
import { embedQuery } from "./jina";
import { KB_SEED_CHUNKS } from "./kb-seed";
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

function indexCandidates() {
  const fromMeta = () => fileURLToPath(new URL("./kb-index.json", import.meta.url));
  return [
    fromMeta,
    () => join(process.cwd(), "src/lib/rag/kb-index.json"),
    () => join(process.cwd(), "lib/rag/kb-index.json"),
  ];
}

function loadLocalIndex(): LocalChunk[] {
  if (cachedIndex) return cachedIndex;
  for (const candidate of indexCandidates()) {
    try {
      const parsed = JSON.parse(readFileSync(candidate(), "utf8")) as LocalIndex;
      if (Array.isArray(parsed.chunks) && parsed.chunks.length > 0) {
        cachedIndex = parsed.chunks.map((chunk) => {
          try {
            return {
              ...chunk,
              embedding: chunk.embedding_b64 ? decodeEmbedding(chunk.embedding_b64) : undefined,
            };
          } catch {
            return { ...chunk, embedding: undefined };
          }
        });
        return cachedIndex;
      }
    } catch {
      // try next path
    }
  }
  console.error("Failed to read local KB index from all candidate paths");
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
  if (remoteDisabled || !useRemoteSupabaseRag()) return null;
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

function lexicalScore(chunk: LocalChunk, terms: string[]) {
  const heading = chunk.heading.toLowerCase();
  const title = (chunk.title ?? "").toLowerCase();
  const content = chunk.content.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (heading.includes(term)) score += 4;
    if (title.includes(term)) score += 2;
    if (content.includes(term)) score += 1;
  }
  if (/what xcler is|about xcler/.test(heading) || /about xcler/.test(title)) score += 6;
  if (/starter package|pricing/.test(heading)) score += 2;
  return score;
}

function toRetrieved(chunk: LocalChunk, score: number): RetrievedChunk {
  return {
    id: chunk.id,
    heading: chunk.heading,
    content: chunk.content,
    sourceUrl: chunk.source_url ?? "",
    title: chunk.title ?? chunk.heading,
    score,
  };
}

function localLexicalSearch(query: string, matchCount: number) {
  const chunks = loadLocalIndex();
  if (chunks.length === 0) return [];
  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 2);
  if (terms.length === 0) return chunks.slice(0, matchCount).map((chunk) => toRetrieved(chunk, 0.1));

  return chunks
    .map((chunk) => ({ chunk, rank: lexicalScore(chunk, terms) }))
    .filter((row) => row.rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, matchCount)
    .map((row) => toRetrieved(row.chunk, row.rank));
}

function localHybridSearch(embedding: number[] | null, query: string, matchCount: number) {
  const chunks = loadLocalIndex();
  if (chunks.length === 0) return [];
  if (!embedding) return localLexicalSearch(query, matchCount);

  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 2);
  const semantic = chunks
    .map((chunk) => ({
      chunk,
      rank: cosine(embedding, chunk.embedding ?? decodeEmbedding(chunk.embedding_b64)),
    }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, matchCount * 2);

  const lexical = chunks
    .map((chunk) => ({ chunk, rank: lexicalScore(chunk, terms) }))
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
    .map((row) => toRetrieved(row.chunk, row.score));
}

let jinaDisabledUntil = 0;

export async function retrieveChunks(rawQuery: string, matchCount = 8): Promise<RetrievedChunk[]> {
  if (isGreeting(rawQuery)) return KB_SEED_CHUNKS.slice(0, matchCount);

  const query = sanitizeQuery(rawQuery);
  if (!query) return KB_SEED_CHUNKS.slice(0, matchCount);

  let embedding: number[] | null = null;
  if (Date.now() >= jinaDisabledUntil) {
    try {
      embedding = await embedQuery(query);
    } catch (error) {
      jinaDisabledUntil = Date.now() + 5 * 60 * 1000;
      console.error("Jina embed failed, using lexical retrieval:", error);
    }
  }

  if (embedding) {
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
  }

  const local = localHybridSearch(embedding, query, matchCount);
  if (local.length > 0) return local;
  return KB_SEED_CHUNKS.slice(0, matchCount);
}
