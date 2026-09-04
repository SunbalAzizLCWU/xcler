import { sitemapIndexToXml } from "@/lib/sitemapEntries";

export const dynamic = "force-dynamic";

/** Sitemap index pointing at DE + EN locale sitemaps */
export async function GET() {
  const now = new Date();
  const xml = sitemapIndexToXml([
    { loc: "https://xcler.dev/sitemap.xml", lastmod: now },
    { loc: "https://xcler.dev/sitemap-de.xml", lastmod: now },
    { loc: "https://xcler.dev/sitemap-en.xml", lastmod: now },
    { loc: "https://xcler.dev/sitemap-english.xml", lastmod: now },
  ]);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
