import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/studio/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/studio/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/studio/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/studio/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/studio/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/studio/"],
      },
    ],
    // Single index entry — locale sitemaps are linked from the index
    sitemap: ["https://xcler.dev/sitemap-index.xml"],
    host: "https://xcler.dev",
  };
}
