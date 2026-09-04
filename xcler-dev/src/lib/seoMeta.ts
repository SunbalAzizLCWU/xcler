import type { Metadata } from "next";
import {
  getAbsoluteCanonical,
  getAlternateOpenGraphLocale,
  getCanonicalPath,
  getLanguageAlternates,
  getOpenGraphLocale,
} from "@/lib/canonical";

type PageSeoInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  noIndex?: boolean;
};

/** Build consistent Metadata without double brand suffix issues. */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  noIndex,
}: PageSeoInput): Metadata {
  const canonical = getCanonicalPath(locale, path);
  const absoluteUrl = getAbsoluteCanonical(locale, path);
  // Strip trailing "| XCLER" if present — layout template adds brand.
  const cleanTitle = title.replace(/\s*\|\s*XCLER\s*$/i, "").trim();

  return {
    title: cleanTitle,
    description,
    keywords,
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title: cleanTitle,
      description,
      url: absoluteUrl,
      type: "website",
      locale: getOpenGraphLocale(locale),
      alternateLocale: getAlternateOpenGraphLocale(locale),
      siteName: "XCLER",
      images: [
        {
          url: "/og-image-v2.webp",
          width: 1200,
          height: 630,
          alt: "XCLER — AI Automation for Chatbots, Agents & Workflows",
        },
      ],
    },
    other: {
      "article:published_time": "2024-01-15",
      "article:modified_time": new Date().toISOString().slice(0, 10),
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description,
      images: ["/og-image-v2.webp"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
