import fs from "node:fs";
import path from "node:path";
import matterImport from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import htmlImport from "remark-html";

const matter = (matterImport as unknown as { default?: typeof matterImport }).default ?? matterImport;
const html = (htmlImport as unknown as { default?: typeof htmlImport }).default ?? htmlImport;

export type Locale = "en" | "de";

export type BlogPostMeta = {
  id: string;
  slug: string;
  slugEn: string;
  slugDe: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  cover: string;
  coverAlt: string;
  readingTime: number;
  tags: string[];
};

export type BlogPost = BlogPostMeta & {
  html: string;
  locale: Locale;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

type Frontmatter = {
  id: string;
  slug: string;
  slug_en: string;
  slug_de: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  cover: string;
  coverAlt: string;
  readingTime?: number;
  tags?: string[];
};

async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(markdown);
  return String(result)
    .replace(/<table>/g, '<div class="blog-table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>")
    .replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

function listMarkdownFiles(locale: Locale) {
  const dir = path.join(CONTENT_ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(dir, name));
}

function parseFile(filePath: string): { data: Frontmatter; content: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return {
    data: parsed.data as Frontmatter,
    content: parsed.content,
  };
}

function toMeta(data: Frontmatter): BlogPostMeta {
  return {
    id: data.id,
    slug: data.slug,
    slugEn: data.slug_en,
    slugDe: data.slug_de,
    title: data.title,
    excerpt: data.excerpt,
    seoTitle: data.seoTitle || data.title,
    seoDescription: data.seoDescription || data.excerpt,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt || data.publishedAt,
    author: data.author || "XCLER",
    cover: data.cover,
    coverAlt: data.coverAlt,
    readingTime: data.readingTime || 8,
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
}

export function getAllBlogMetas(locale: Locale): BlogPostMeta[] {
  const metas = listMarkdownFiles(locale).map((filePath) => toMeta(parseFile(filePath).data));
  return metas.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getAllBlogSlugs(): Array<{ locale: Locale; slug: string }> {
  const out: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of ["en", "de"] as Locale[]) {
    for (const meta of getAllBlogMetas(locale)) {
      out.push({ locale, slug: meta.slug });
    }
  }
  return out;
}

export async function getBlogPost(locale: Locale, slug: string): Promise<BlogPost | null> {
  const files = listMarkdownFiles(locale);
  for (const filePath of files) {
    const { data, content } = parseFile(filePath);
    if (data.slug !== slug && data.slug_en !== slug && data.slug_de !== slug) continue;
    const meta = toMeta(data);
    return {
      ...meta,
      slug: data.slug,
      locale,
      html: await markdownToHtml(content),
    };
  }
  return null;
}

export function getBlogSitemapRows() {
  const en = getAllBlogMetas("en");
  return en.map((post) => ({
    slug_en: post.slugEn,
    slug_de: post.slugDe,
    updatedAt: post.updatedAt || post.publishedAt,
    createdAt: post.publishedAt,
  }));
}
