import { buildLocaleSitemap, sitemapEntriesToXml } from "@/lib/sitemapEntries";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await buildLocaleSitemap("en");
  return new Response(sitemapEntriesToXml(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
