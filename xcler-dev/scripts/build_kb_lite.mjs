import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(readFileSync(join(dir, "../src/lib/rag/kb-index.json"), "utf8"));
const lite = {
  version: source.version ?? 1,
  chunks: (source.chunks ?? []).map((chunk) => ({
    id: chunk.id,
    heading: chunk.heading,
    content: chunk.content,
    source_url: chunk.source_url,
    title: chunk.title,
    lang: chunk.lang,
  })),
};
const out = join(dir, "../src/lib/rag/kb-lite.json");
writeFileSync(out, JSON.stringify(lite));
console.log("kb-lite", lite.chunks.length, "chunks", writeFileSync && Buffer.byteLength(JSON.stringify(lite)), "bytes");
