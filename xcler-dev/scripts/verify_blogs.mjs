/**
 * Validates local blog content: EN/DE pairing, frontmatter, images, internal links.
 * Optional: pass a base URL to also fetch every post, e.g.
 *   node scripts/verify_blogs.mjs http://localhost:3100
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content", "blog");
const PUBLIC = path.join(ROOT, "public");
const baseUrl = process.argv[2];

const STATIC_PATHS = new Set([
  "/", "/leistungen", "/leistungen/webentwicklung", "/leistungen/app-entwicklung",
  "/leistungen/wordpress-shopify", "/leistungen/wordpress-entwicklung-deutschland",
  "/leistungen/shopify-entwicklung-deutschland", "/leistungen/workflow-automatisierung",
  "/leistungen/ki-chatbots-agenten", "/leistungen/ki-automatisierung", "/projekte",
  "/ueber-uns", "/blog", "/preise", "/kontakt",
  "/en", "/en/services", "/en/services/web-development", "/en/services/app-development",
  "/en/services/wordpress-shopify", "/en/services/wordpress-development-germany",
  "/en/services/shopify-development-germany", "/en/services/workflow-automation",
  "/en/services/ai-chatbots-agents", "/en/services/ai-automation", "/en/work",
  "/en/about", "/en/blog", "/en/pricing", "/en/contact",
]);

const errors = [];
const posts = { en: [], de: [] };

for (const locale of ["en", "de"]) {
  for (const file of fs.readdirSync(path.join(CONTENT, locale)).filter((f) => f.endsWith(".md"))) {
    const { data, content } = matter(fs.readFileSync(path.join(CONTENT, locale, file), "utf8"));
    const where = `${locale}/${file}`;
    for (const key of ["id", "slug", "slug_en", "slug_de", "title", "excerpt", "publishedAt", "cover", "coverAlt"]) {
      if (!data[key]) errors.push(`${where}: missing ${key}`);
    }
    if (data.slug !== (locale === "en" ? data.slug_en : data.slug_de)) errors.push(`${where}: slug does not match slug_${locale}`);
    if (`${data.slug}.md` !== file) errors.push(`${where}: filename does not match slug`);
    if ((data.seoDescription || data.excerpt || "").length > 165) errors.push(`${where}: seoDescription > 165 chars`);
    if (Number.isNaN(Date.parse(data.publishedAt))) errors.push(`${where}: bad publishedAt`);
    posts[locale].push({ ...data, content, where });
  }
}

const bySlug = { en: new Map(posts.en.map((p) => [p.slug, p])), de: new Map(posts.de.map((p) => [p.slug, p])) };

for (const p of posts.en) if (!bySlug.de.has(p.slug_de)) errors.push(`${p.where}: no DE twin ${p.slug_de}`);
for (const p of posts.de) if (!bySlug.en.has(p.slug_en)) errors.push(`${p.where}: no EN twin ${p.slug_en}`);

for (const locale of ["en", "de"]) {
  for (const p of posts[locale]) {
    const images = [p.cover, ...[...p.content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1])];
    for (const src of images) {
      if (!src.startsWith("/")) continue;
      if (!fs.existsSync(path.join(PUBLIC, src))) errors.push(`${p.where}: missing image ${src}`);
      if (!src.endsWith(".webp")) errors.push(`${p.where}: non-webp image ${src}`);
    }
    for (const m of p.content.matchAll(/(?<!!)\[[^\]]*\]\((\/[^)\s]*)\)/g)) {
      const href = m[1].replace(/#.*$/, "");
      const blog = href.match(/^(\/en)?\/blog\/([^/]+)$/);
      if (blog) {
        const targetLocale = blog[1] ? "en" : "de";
        if (!bySlug[targetLocale].has(blog[2])) errors.push(`${p.where}: broken blog link ${href}`);
        if (targetLocale !== locale) errors.push(`${p.where}: cross-locale link ${href}`);
        continue;
      }
      if (!STATIC_PATHS.has(href)) errors.push(`${p.where}: unknown internal link ${href}`);
      const isEnPath = href === "/en" || href.startsWith("/en/");
      if ((locale === "en") !== isEnPath) errors.push(`${p.where}: cross-locale link ${href}`);
    }
  }
}

console.log(`EN posts: ${posts.en.length}, DE posts: ${posts.de.length}`);

if (baseUrl) {
  const urls = ["/blog", "/en/blog", ...posts.de.map((p) => `/blog/${p.slug}`), ...posts.en.map((p) => `/en/blog/${p.slug}`)];
  for (const u of urls) {
    const res = await fetch(baseUrl + u, { redirect: "manual" });
    const html = res.status === 200 ? await res.text() : "";
    if (res.status !== 200) {
      errors.push(`HTTP ${res.status} ${u}`);
      continue;
    }
    if (u.endsWith("/blog")) {
      const locale = u.startsWith("/en") ? "en" : "de";
      for (const p of posts[locale]) if (!html.includes(`/blog/${p.slug}`)) errors.push(`${u}: card missing for ${p.slug}`);
    } else {
      if (!/<h1[^>]*>/.test(html)) errors.push(`${u}: no <h1>`);
      if (/\| ?-{3,} ?\|/.test(html)) errors.push(`${u}: markdown table rendered as raw text`);
      if (!html.includes('"BlogPosting"')) errors.push(`${u}: no BlogPosting JSON-LD`);
      if (!html.includes('hreflang="de"') && !html.includes('hrefLang="de"')) errors.push(`${u}: no hreflang de`);
    }
  }
  const sitemapDe = await (await fetch(`${baseUrl}/sitemap-de.xml`)).text();
  const sitemapEn = await (await fetch(`${baseUrl}/sitemap-en.xml`)).text();
  for (const p of posts.de) if (!sitemapDe.includes(`/blog/${p.slug}<`)) errors.push(`sitemap-de missing ${p.slug}`);
  for (const p of posts.en) if (!sitemapEn.includes(`/en/blog/${p.slug}<`)) errors.push(`sitemap-en missing ${p.slug}`);
  console.log(`Fetched ${urls.length} URLs + 2 sitemaps`);
}

if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("All checks passed.");
