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
    sitemap: [
      "https://xcler.dev/sitemap.xml",
      "https://xcler.dev/sitemap-index.xml",
      "https://xcler.dev/sitemap-de.xml",
      "https://xcler.dev/sitemap-en.xml",
      "https://xcler.dev/sitemap-english.xml",
    ],
    host: "https://xcler.dev",
  };
}
