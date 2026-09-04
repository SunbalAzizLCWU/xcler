/**
 * Refresh static locale sitemaps in /public for GSC reliability.
 * Run with: node scripts/generate-static-sitemaps.mjs
 * (requires local or production sitemap builder via fetch)
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("public");
const BASE = process.env.SITEMAP_ORIGIN || "http://localhost:3000";

async function pull(name) {
  const res = await fetch(`${BASE}/${name}`);
  if (!res.ok) throw new Error(`${name} -> ${res.status}`);
  const xml = await res.text();
  fs.writeFileSync(path.join(ROOT, name), xml, "utf8");
  console.log("wrote", name, xml.length, "bytes");
}

await pull("sitemap.xml").catch(() => console.warn("skip combined sitemap.xml (Next metadata route)"));
// Locale files must already be served (static or route) for this refresh helper.
for (const name of ["sitemap-de.xml", "sitemap-en.xml", "sitemap-english.xml"]) {
  await pull(name);
}
