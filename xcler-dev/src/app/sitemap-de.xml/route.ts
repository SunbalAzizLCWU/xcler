import { buildLocaleSitemap, sitemapEntriesToXml } from "@/lib/sitemapEntries";

export const dynamic = "force-dynamic";

/** German (default locale) sitemap for Search Console */
export async function GET() {
  const entries = await buildLocaleSitemap("de");
  const xml = sitemapEntriesToXml(entries);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
