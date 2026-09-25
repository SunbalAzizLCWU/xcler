/**
 * Chunk knowledge-base + blog markdown, embed with Jina, upsert into Supabase,
 * and write src/lib/rag/kb-index.json as a retrieval fallback.
 * Run: node scripts/ingest_knowledge_base.mjs
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

function loadEnv() {
  const file = path.join(process.cwd(), ".env");
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim();
    if (key && !process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const ROOT = process.cwd();
const SKIP_KB = new Set(["README.md", "DATABASE.md"]);
const MIN_WORDS = 80;
const MAX_WORDS = 450;
const OVERLAP_WORDS = 40;
const JINA_URL = "https://api.jina.ai/v1/embeddings";

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const JINA_API_KEY = process.env.JINA_API_KEY;

if (!JINA_API_KEY) {
  console.error("Missing JINA_API_KEY");
  process.exit(1);
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith(".md")) acc.push(full);
  }
  return acc;
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function splitLongSection(heading, body) {
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const parts = [];
  let current = "";
  const flush = () => {
    if (current.trim()) parts.push(current.trim());
    current = "";
  };
  for (const para of paragraphs) {
    const next = current ? `${current}\n\n${para}` : para;
    if (wordCount(next) > MAX_WORDS && current) {
      flush();
      current = para;
    } else current = next;
  }
  flush();
  if (parts.length <= 1) return [{ heading, body }];
  return parts.map((part, index) => {
    if (index === 0) return { heading, body: part };
    const overlap = parts[index - 1].split(/\s+/).filter(Boolean).slice(-OVERLAP_WORDS).join(" ");
    return { heading: `${heading} (${index + 1})`, body: `${overlap} ${part}`.trim() };
  });
}

function chunkBody(title, body) {
  const sections = body
    .split(/^## /m)
    .slice(1)
    .map((section) => {
      const nl = section.indexOf("\n");
      return {
        heading: (nl === -1 ? section : section.slice(0, nl)).trim(),
        body: (nl === -1 ? "" : section.slice(nl + 1)).trim(),
      };
    })
    .filter((section) => section.body);

  if (!sections.length && body.trim()) sections.push({ heading: title, body: body.trim() });

  const merged = [];
  for (const section of sections) {
    const prev = merged[merged.length - 1];
    if (prev && wordCount(prev.body) < MIN_WORDS) {
      prev.body += `\n\n${section.heading}\n${section.body}`;
    } else merged.push({ ...section });
  }

  return merged.flatMap((section) =>
    wordCount(section.body) > MAX_WORDS ? splitLongSection(section.heading, section.body) : [section]
  );
}

function collectDocuments() {
  const docs = [];
  const kbRoot = path.join(ROOT, "knowledge-base");
  for (const file of walk(kbRoot)) {
    const rel = path.relative(kbRoot, file).replaceAll("\\", "/");
    if (SKIP_KB.has(path.basename(file))) continue;
    if (rel.startsWith("assistant/")) continue;
    const raw = fs.readFileSync(file, "utf8");
    const parsed = matter(raw);
    const lang = parsed.data.lang === "de" ? "de" : "en";
    docs.push({
      slug: String(parsed.data.id || rel.replace(/\.md$/, "")),
      title: String(parsed.data.title || path.basename(file, ".md")),
      category: String(parsed.data.category || "company"),
      lang,
      sourceUrl: String(parsed.data.source_url || "https://xcler.dev"),
      sourcePath: `knowledge-base/${rel}`,
      contentHash: crypto.createHash("sha256").update(raw).digest("hex"),
      body: parsed.content,
    });
  }

  for (const lang of ["en", "de"]) {
    const dir = path.join(ROOT, "content", "blog", lang);
    for (const file of walk(dir)) {
      const raw = fs.readFileSync(file, "utf8");
      const parsed = matter(raw);
      const slug = String(parsed.data.slug || path.basename(file, ".md"));
      const sourceUrl =
        lang === "en"
          ? `https://xcler.dev/en/blog/${slug}`
          : `https://xcler.dev/blog/${parsed.data.slug_de || slug}`;
      docs.push({
        slug: `blog/${lang}/${slug}`,
        title: String(parsed.data.title || slug),
        category: "blog",
        lang,
        sourceUrl,
        sourcePath: path.relative(ROOT, file).replaceAll("\\", "/"),
        contentHash: crypto.createHash("sha256").update(raw).digest("hex"),
        body: parsed.content,
      });
    }
  }
  return docs;
}

async function embedPassages(texts) {
  const embeddings = [];
  for (let i = 0; i < texts.length; i += 16) {
    const batch = texts.slice(i, i + 16);
    process.stdout.write(`Embedding ${i + 1}–${i + batch.length} of ${texts.length}\n`);
    const response = await fetch(JINA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JINA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "jina-embeddings-v3",
        task: "retrieval.passage",
        dimensions: 1024,
        input: batch,
      }),
    });
    if (!response.ok) {
      throw new Error(`Jina failed (${response.status}): ${(await response.text()).slice(0, 400)}`);
    }
    const json = await response.json();
    for (const row of json.data) embeddings.push(row.embedding);
  }
  return embeddings;
}

async function supabaseFetch(pathname, { method = "GET", body, query = "" } = {}) {
  if (!SUPABASE_URL || !SERVICE_KEY) return { ok: false, status: 0, json: null, text: "no supabase" };
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${pathname}${query}`, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: method === "POST" ? "return=representation" : "return=minimal",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { ok: response.ok, status: response.status, json, text };
}

const documents = collectDocuments();
const prepared = [];

for (const doc of documents) {
  const sections = chunkBody(doc.title, doc.body);
  sections.forEach((section, chunkIndex) => {
    const content = `${doc.title} > ${section.heading}\n\n${section.body}`.trim();
    prepared.push({
      doc,
      chunkIndex,
      heading: section.heading,
      content,
      tokenCount: Math.round(wordCount(content) * 1.3),
    });
  });
}

console.log(`${documents.length} documents, ${prepared.length} chunks`);
const embeddings = await embedPassages(prepared.map((row) => row.content));

const localChunks = prepared.map((row, index) => {
  const floats = Float32Array.from(embeddings[index]);
  return {
    id: index + 1,
    heading: row.heading,
    content: row.content,
    source_url: row.doc.sourceUrl,
    title: row.doc.title,
    lang: row.doc.lang,
    slug: row.doc.slug,
    embedding_b64: Buffer.from(floats.buffer).toString("base64"),
  };
});

const indexDir = path.join(ROOT, "src", "lib", "rag");
fs.mkdirSync(indexDir, { recursive: true });
const indexPath = path.join(indexDir, "kb-index.json");
fs.writeFileSync(
  indexPath,
  JSON.stringify({
    version: 1,
    generatedAt: new Date().toISOString(),
    chunks: localChunks,
  })
);
console.log(`Wrote ${indexPath} (${localChunks.length} chunks)`);

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.warn("Supabase env missing — local index only.");
  process.exit(0);
}

const probe = await supabaseFetch("kb_documents", { query: "?select=slug,content_hash" });
if (!probe.ok) {
  console.warn(`Supabase tables not ready (${probe.status}): ${probe.text.slice(0, 200)}`);
  console.warn("Local index is in place. Apply scripts/kb_schema.sql in the Supabase SQL editor, then re-run ingest.");
  process.exit(0);
}

const existing = new Map((probe.json || []).map((row) => [row.slug, row.content_hash]));
const keepSlugs = new Set(documents.map((doc) => doc.slug));

for (const [slug] of existing) {
  if (!keepSlugs.has(slug)) {
    await supabaseFetch("kb_documents", { method: "DELETE", query: `?slug=eq.${encodeURIComponent(slug)}` });
    console.log(`Deleted stale ${slug}`);
  }
}

for (const doc of documents) {
  const docChunks = prepared
    .map((row, index) => ({ row, embedding: embeddings[index] }))
    .filter(({ row }) => row.doc.slug === doc.slug);

  const upsertPref = await fetch(`${SUPABASE_URL}/rest/v1/kb_documents?on_conflict=slug`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({
      slug: doc.slug,
      title: doc.title,
      category: doc.category,
      lang: doc.lang,
      source_url: doc.sourceUrl,
      source_path: doc.sourcePath,
      content_hash: doc.contentHash,
      updated_at: new Date().toISOString(),
    }),
  });
  const saved = await upsertPref.json();
  const documentId = Array.isArray(saved) ? saved[0]?.id : saved?.id;
  if (!documentId) {
    console.warn(`Could not upsert ${doc.slug}:`, JSON.stringify(saved).slice(0, 240));
    continue;
  }

  await supabaseFetch("kb_chunks", {
    method: "DELETE",
    query: `?document_id=eq.${documentId}`,
  });

  const rows = docChunks.map(({ row, embedding }) => ({
    document_id: documentId,
    chunk_index: row.chunkIndex,
    heading: row.heading,
    content: row.content,
    token_count: row.tokenCount,
    lang: doc.lang,
    metadata: {
      title: doc.title,
      category: doc.category,
      source_url: doc.sourceUrl,
      slug: doc.slug,
      heading: row.heading,
    },
    embedding,
  }));

  for (let i = 0; i < rows.length; i += 20) {
    const batch = rows.slice(i, i + 20);
    const insert = await fetch(`${SUPABASE_URL}/rest/v1/kb_chunks`, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(batch),
    });
    if (!insert.ok) {
      console.error(`Chunk insert failed for ${doc.slug}:`, (await insert.text()).slice(0, 400));
      process.exit(1);
    }
  }
  console.log(`Upserted ${doc.slug} (${docChunks.length} chunks)`);
}

console.log("Ingest complete.");
