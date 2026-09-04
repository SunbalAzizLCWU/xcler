import { ORG_ID, WEBSITE_ID } from "@/lib/structuredData";

type Locale = "en" | "de";

/** WebPage + authorship dates for GEO datePublished / author_identity checks */
export function getWebPageSchema(input: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  absoluteUrl: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const published = input.datePublished ?? "2024-01-15";
  const modified = input.dateModified ?? new Date().toISOString().slice(0, 10);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${input.absoluteUrl}#webpage`,
    url: input.absoluteUrl,
    name: input.name,
    description: input.description,
    inLanguage: input.locale === "de" ? "de-DE" : "en-US",
    datePublished: published,
    dateModified: modified,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
