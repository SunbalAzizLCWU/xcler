import { isGreeting } from "./guardrails";
import { KB_SEED_CHUNKS } from "./kb-seed";
import lite from "./kb-lite.json";

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
};

const CHUNKS: LocalChunk[] = Array.isArray((lite as { chunks?: LocalChunk[] }).chunks)
  ? (lite as { chunks: LocalChunk[] }).chunks
  : [];

function sanitizeQuery(query: string) {
  return query.replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 500);
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
  if (CHUNKS.length === 0) return [];
  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 2);
  if (terms.length === 0) return CHUNKS.slice(0, matchCount).map((chunk) => toRetrieved(chunk, 0.1));

  return CHUNKS.map((chunk) => ({ chunk, rank: lexicalScore(chunk, terms) }))
    .filter((row) => row.rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, matchCount)
    .map((row) => toRetrieved(row.chunk, row.rank));
}

export async function retrieveChunks(rawQuery: string, matchCount = 8): Promise<RetrievedChunk[]> {
  if (isGreeting(rawQuery)) return KB_SEED_CHUNKS.slice(0, matchCount);
  const query = sanitizeQuery(rawQuery);
  if (!query) return KB_SEED_CHUNKS.slice(0, matchCount);
  const local = localLexicalSearch(query, matchCount);
  return local.length > 0 ? local : KB_SEED_CHUNKS.slice(0, matchCount);
}
