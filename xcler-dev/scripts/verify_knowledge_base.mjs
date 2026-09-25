/**
 * Validates knowledge-base/*.md against the rules in knowledge-base/README.md:
 * frontmatter fields, unique ids, ## sections sized for chunking, and no leftover placeholders.
 * Run: node scripts/verify_knowledge_base.mjs
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "knowledge-base");
const SKIP = new Set(["README.md", "DATABASE.md"]);
const REQUIRED = ["id", "title", "category", "lang", "source_url", "updated", "tags"];
const CATEGORIES = new Set(["company", "service", "project", "person", "blog-index"]);
const MIN_WORDS = 40;
const MAX_WORDS = 450;

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "assistant") walk(full);
    } else if (entry.name.endsWith(".md") && !SKIP.has(entry.name)) {
      files.push(full);
    }
  }
};
walk(ROOT);

const errors = [];
const warnings = [];
const ids = new Map();
let sectionCount = 0;
let wordTotal = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  for (const key of REQUIRED) if (!data[key]) errors.push(`${rel}: missing frontmatter "${key}"`);
  if (data.category && !CATEGORIES.has(data.category)) errors.push(`${rel}: unknown category "${data.category}"`);
  if (data.lang && !["en", "de"].includes(data.lang)) errors.push(`${rel}: lang must be en or de`);
  if (data.id) {
    if (ids.has(data.id)) errors.push(`${rel}: duplicate id "${data.id}" (also in ${ids.get(data.id)})`);
    ids.set(data.id, rel);
  }
  if (/\[ADD |TODO|lorem ipsum/i.test(content)) errors.push(`${rel}: contains placeholder text`);

  const sections = content.split(/^## /m).slice(1);
  if (!sections.length) errors.push(`${rel}: no "## " sections to chunk`);
  for (const section of sections) {
    const heading = section.split("\n")[0].trim();
    const words = section.split(/\s+/).filter(Boolean).length;
    sectionCount += 1;
    wordTotal += words;
    if (words > MAX_WORDS) warnings.push(`${rel} > "${heading}": ${words} words (will be split)`);
    if (words < MIN_WORDS) warnings.push(`${rel} > "${heading}": ${words} words (will be merged)`);
  }
}

console.log(`${files.length} files, ${sectionCount} sections, ~${wordTotal} words`);
if (warnings.length) console.log(`\n${warnings.length} warning(s):\n- ${warnings.join("\n- ")}`);
if (errors.length) {
  console.error(`\n${errors.length} error(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("\nKnowledge base OK.");
