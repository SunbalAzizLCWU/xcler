import type { MetadataRoute } from "next";
import { buildFullSitemap } from "@/lib/sitemapEntries";

/** Combined DE + EN sitemap at /sitemap.xml */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildFullSitemap();
}
