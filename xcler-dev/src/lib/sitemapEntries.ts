import { getPathname } from "@/navigation";
import { caseStudies } from "@/data/caseStudies";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export type Locale = "en" | "de";

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
  alternates: {
    languages: Record<string, string>;
  };
};

type BlogSitemapRow = {
  slug_en?: string;
  slug_de?: string;
  updatedAt?: string;
  createdAt?: string;
};

export const BASE_URL = "https://xcler.dev";

const staticRouteConfig: Array<{
  href: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/about", changeFrequency: "monthly", priority: 0.7 },
  { href: "/services", changeFrequency: "monthly", priority: 0.9 },
  { href: "/services/web-development", changeFrequency: "monthly", priority: 0.85 },
  { href: "/services/app-development", changeFrequency: "monthly", priority: 0.85 },
  { href: "/services/wordpress-shopify", changeFrequency: "monthly", priority: 0.85 },
  { href: "/services/wordpress-development-germany", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/shopify-development-germany", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/workflow-automation", changeFrequency: "weekly", priority: 0.95 },
  { href: "/services/ai-chatbots-agents", changeFrequency: "weekly", priority: 0.95 },
  { href: "/work", changeFrequency: "weekly", priority: 0.8 },
  { href: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { href: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { href: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { href: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { href: "/datenschutz", changeFrequency: "yearly", priority: 0.3 },
  { href: "/impressum", changeFrequency: "yearly", priority: 0.2 },
  { href: "/cookies", changeFrequency: "yearly", priority: 0.2 },
  { href: "/agb", changeFrequency: "yearly", priority: 0.2 },
];

const blogSitemapQuery = groq`
  *[_type == "blogPost" && (defined(slug.current) || defined(slug_en.current) || defined(slug_de.current))] {
    "slug_en": coalesce(slug_en.current, slug.current, slug_de.current),
    "slug_de": coalesce(slug_de.current, slug.current, slug_en.current),
    "updatedAt": _updatedAt,
    "createdAt": _createdAt
  }
`;

export function toAbsoluteUrl(path: string) {
  if (path === "/") return BASE_URL;
  return `${BASE_URL}${path}`;
}

function getLocalizedPath(locale: Locale, href: string) {
  // Dynamic work/blog segments need the pathname object form for correct DE/EN rewrites.
  const workMatch = href.match(/^\/work\/([^/]+)$/);
  if (workMatch) {
    return getPathname({
      locale,
      href: {
        pathname: "/work/[slug]",
        params: { slug: workMatch[1] },
      },
    });
  }

  const blogMatch = href.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    return getPathname({
      locale,
      href: {
        pathname: "/blog/[slug]",
        params: { slug: blogMatch[1] },
      },
    });
  }

  return getPathname({ locale, href: href as never });
}

function languageAlternates(enPath: string, dePath: string) {
  return {
    languages: {
      en: toAbsoluteUrl(enPath),
      de: toAbsoluteUrl(dePath),
      "x-default": toAbsoluteUrl(dePath),
    },
  };
}

export async function buildLocaleSitemap(locale: Locale): Promise<SitemapEntry[]> {
  const now = new Date();
  const entries: SitemapEntry[] = [];

  for (const { href, changeFrequency, priority } of staticRouteConfig) {
    const enPath = getLocalizedPath("en", href);
    const dePath = getLocalizedPath("de", href);
    const localizedPath = locale === "de" ? dePath : enPath;

    entries.push({
      url: toAbsoluteUrl(localizedPath),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: languageAlternates(enPath, dePath),
    });
  }

  for (const study of caseStudies) {
    const href = `/work/${study.slug}`;
    const enPath = getLocalizedPath("en", href);
    const dePath = getLocalizedPath("de", href);
    const localizedPath = locale === "de" ? dePath : enPath;

    entries.push({
      url: toAbsoluteUrl(localizedPath),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: languageAlternates(enPath, dePath),
    });
  }

  try {
    const rows = await Promise.race([
      client.fetch<BlogSitemapRow[]>(blogSitemapQuery),
      new Promise<BlogSitemapRow[]>((_, reject) =>
        setTimeout(() => reject(new Error("sitemap blog fetch timeout")), 2500)
      ),
    ]);
    for (const row of rows) {
      if (!row.slug_en && !row.slug_de) continue;
      const lastModified = new Date(row.updatedAt ?? row.createdAt ?? now.toISOString());
      const fallback = row.slug_en ?? row.slug_de ?? "";
      const enPath = getLocalizedPath("en", `/blog/${row.slug_en ?? fallback}`);
      const dePath = getLocalizedPath("de", `/blog/${row.slug_de ?? fallback}`);
      const localizedPath = locale === "de" ? dePath : enPath;

      entries.push({
        url: toAbsoluteUrl(localizedPath),
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: languageAlternates(enPath, dePath),
      });
    }
  } catch {
    // CMS optional / timed out — keep static routes so Google still gets a 200.
  }

  return entries;
}

export async function buildFullSitemap(): Promise<SitemapEntry[]> {
  const [de, en] = await Promise.all([buildLocaleSitemap("de"), buildLocaleSitemap("en")]);
  return [...de, ...en];
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function sitemapEntriesToXml(entries: SitemapEntry[]): string {
  const body = entries
    .map((entry) => {
      const langs = Object.entries(entry.alternates.languages)
        .map(
          ([hreflang, href]) =>
            `<xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`
        )
        .join("");

      return `<url><loc>${escapeXml(entry.url)}</loc>${langs}<lastmod>${entry.lastModified.toISOString()}</lastmod><changefreq>${entry.changeFrequency}</changefreq><priority>${entry.priority}</priority></url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${body}</urlset>`;
}

export function sitemapIndexToXml(sitemaps: Array<{ loc: string; lastmod?: Date }>): string {
  const body = sitemaps
    .map((item) => {
      const last = item.lastmod ? `<lastmod>${item.lastmod.toISOString()}</lastmod>` : "";
      return `<sitemap><loc>${escapeXml(item.loc)}</loc>${last}</sitemap>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}
