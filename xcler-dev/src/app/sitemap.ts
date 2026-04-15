import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { getPathname } from "@/navigation";
import { client } from "@/sanity/lib/client";

type Locale = "en" | "de";

type BlogSitemapRow = {
  slug_legacy?: string;
  slug_en?: string;
  slug_de?: string;
  updatedAt?: string;
  createdAt?: string;
};

const BASE_URL = "https://xcler.dev";
const SUPPORTED_LOCALES: Locale[] = ["en", "de"];

const staticRouteConfig: Array<{
  href: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/about", changeFrequency: "monthly", priority: 0.7 },
  { href: "/services", changeFrequency: "monthly", priority: 0.9 },
  { href: "/services/web-development", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/app-development", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/wordpress-shopify", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/workflow-automation", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/ai-chatbots-agents", changeFrequency: "monthly", priority: 0.8 },
  { href: "/work", changeFrequency: "weekly", priority: 0.8 },
  { href: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { href: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { href: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { href: "/privacy", changeFrequency: "yearly", priority: 0.4 },
];

const blogSitemapQuery = groq`
  *[_type == "blogPost" && (defined(slug.current) || defined(slug_en.current) || defined(slug_de.current))] {
    "slug_legacy": slug.current,
    "slug_en": coalesce(slug_en.current, slug.current, slug_de.current),
    "slug_de": coalesce(slug_de.current, slug.current, slug_en.current),
    "updatedAt": _updatedAt,
    "createdAt": _createdAt
  }
`;

function toAbsoluteUrl(path: string) {
  if (path === "/") {
    return BASE_URL;
  }

  return `${BASE_URL}${path}`;
}

function getLocalizedPath(locale: Locale, href: string) {
  return getPathname({ locale, href: href as never });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [];

  for (const { href, changeFrequency, priority } of staticRouteConfig) {
    const enPath = getLocalizedPath("en", href);
    const dePath = getLocalizedPath("de", href);

    for (const locale of SUPPORTED_LOCALES) {
      const localizedPath = locale === "de" ? dePath : enPath;

      staticEntries.push({
        url: toAbsoluteUrl(localizedPath),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: toAbsoluteUrl(enPath),
            de: toAbsoluteUrl(dePath),
          },
        },
      });
    }
  }

  let blogEntries: MetadataRoute.Sitemap = [];

  try {
    const rows = await client.fetch<BlogSitemapRow[]>(blogSitemapQuery);

    blogEntries = rows.flatMap((row) => {
      const entries: MetadataRoute.Sitemap = [];
      const enSlug = row.slug_en;
      const deSlug = row.slug_de;

      if (!enSlug && !deSlug) {
        return entries;
      }

      const lastModified = new Date(row.updatedAt ?? row.createdAt ?? now.toISOString());
      const fallbackSlug = enSlug ?? deSlug ?? "";
      const enPath = getLocalizedPath("en", `/blog/${enSlug ?? fallbackSlug}`);
      const dePath = getLocalizedPath("de", `/blog/${deSlug ?? fallbackSlug}`);
      const alternates = {
        languages: {
          en: toAbsoluteUrl(enPath),
          de: toAbsoluteUrl(dePath),
        },
      } as const;
      const sharedMetadata = {
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates,
      };

      entries.push({
        url: toAbsoluteUrl(enPath),
        ...sharedMetadata,
      });

      entries.push({
        url: toAbsoluteUrl(dePath),
        ...sharedMetadata,
      });

      return entries;
    });
  } catch {
    // Keep sitemap generation resilient if CMS is temporarily unreachable.
  }

  return [...staticEntries, ...blogEntries];
}
