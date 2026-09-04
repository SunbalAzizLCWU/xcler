import { getAbsoluteCanonical } from "@/lib/canonical";
import { getBreadcrumbSchema, ORG_ID, WEBSITE_ID, type Locale } from "@/lib/structuredData";
import { getWebPageSchema } from "@/lib/webPageSchema";

const BASE_URL = "https://xcler.dev";

type BreadcrumbItem = { name: string; path: string };

type PageGraphInput = {
  locale: Locale;
  /** Internal path key, e.g. `/` or `/services/ai-chatbots-agents` */
  path: string;
  name: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Extra graph nodes: Service, OfferCatalog, BlogPosting, etc. */
  entities?: Record<string, unknown>[];
  primaryImageUrl?: string;
  datePublished?: string;
  dateModified?: string;
};

/**
 * Yoast / Rank Math style linked data: one @graph with @id references.
 * Org + WebSite live in the global head graph; pages reference them by @id.
 */
export function buildPageLinkedDataGraph(input: PageGraphInput) {
  const absoluteUrl = getAbsoluteCanonical(input.locale, input.path);
  const webpageId = `${absoluteUrl}#webpage`;
  const breadcrumbId = `${absoluteUrl}#breadcrumb`;
  const imageId = `${absoluteUrl}#primaryimage`;
  const imageUrl = input.primaryImageUrl ?? `${BASE_URL}/og-image.webp`;

  const webPageRaw = {
    ...getWebPageSchema({
      locale: input.locale,
      path: input.path,
      name: input.name,
      description: input.description,
      absoluteUrl,
      datePublished: input.datePublished,
      dateModified: input.dateModified,
    }),
    // Prefer @id links over duplicated Organization blobs
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@id": imageId },
    breadcrumb: input.breadcrumbs?.length ? { "@id": breadcrumbId } : undefined,
    mainEntity: input.entities?.[0]?.["@id"]
      ? { "@id": String(input.entities[0]["@id"]) }
      : undefined,
  };
  const { "@context": _wpCtx, ...webPage } = webPageRaw as Record<string, unknown> & {
    "@context"?: string;
  };
  void _wpCtx;

  const imageObject = {
    "@type": "ImageObject",
    "@id": imageId,
    url: imageUrl,
    contentUrl: imageUrl,
    width: 1200,
    height: 630,
    caption: input.name,
  };

  const graph: Record<string, unknown>[] = [webPage, imageObject];

  if (input.breadcrumbs?.length) {
    const crumbs = getBreadcrumbSchema(input.locale, input.breadcrumbs);
    graph.push({
      ...crumbs,
      "@id": breadcrumbId,
    });
  }

  if (input.entities?.length) {
    for (const entity of input.entities) {
      const cleaned = { ...entity };
      delete cleaned["@context"];
      graph.push(cleaned);
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
