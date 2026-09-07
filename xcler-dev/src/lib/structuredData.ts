import { getPathname } from "@/navigation";
import { toAbsoluteUrl } from "@/lib/canonical";

const BASE_URL = "https://xcler.dev";
export const ORG_ID = `${BASE_URL}#organization`;
export const BUSINESS_ID = `${BASE_URL}#localbusiness`;
export const WEBSITE_ID = `${BASE_URL}#website`;

export type Locale = "en" | "de";

type ServiceSchemaInput = {
  locale: Locale;
  /** Internal pathname key, e.g. `/services/ai-chatbots-agents` */
  path?: string;
  /** Legacy slug support — prefer `path` */
  slug?: string;
  name: string;
  description: string;
};

type ServiceCatalogItem = {
  name: string;
  description: string;
  /** Internal pathname key */
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type BreadcrumbItem = {
  name: string;
  /** Internal pathname key or absolute path */
  path: string;
};

function localizedPath(locale: Locale, href: string) {
  return getPathname({ locale, href: href as never });
}

function absoluteLocalized(locale: Locale, href: string) {
  return toAbsoluteUrl(localizedPath(locale, href));
}

const AREA_SERVED = [
  { "@type": "Country", name: "Germany" },
  { "@type": "Country", name: "Austria" },
  { "@type": "Country", name: "Switzerland" },
  { "@type": "Country", name: "Netherlands" },
  { "@type": "Country", name: "Belgium" },
  { "@type": "Country", name: "United States" },
  { "@type": "AdministrativeArea", name: "California" },
  { "@type": "AdministrativeArea", name: "Florida" },
  { "@type": "City", name: "Berlin" },
  { "@type": "City", name: "Munich" },
  { "@type": "City", name: "Hamburg" },
  { "@type": "City", name: "Frankfurt" },
  { "@type": "City", name: "Cologne" },
  { "@type": "City", name: "Düsseldorf" },
  { "@type": "City", name: "Stuttgart" },
  { "@type": "City", name: "Amsterdam" },
  { "@type": "City", name: "Rotterdam" },
  { "@type": "City", name: "Utrecht" },
  { "@type": "City", name: "The Hague" },
  { "@type": "City", name: "Brussels" },
  { "@type": "City", name: "Vienna" },
  { "@type": "City", name: "Zurich" },
  { "@type": "City", name: "Chicago" },
];

const KNOWS_ABOUT = [
  "KI-Automatisierungsagentur",
  "KI Automatisierung Agentur",
  "KI-Chatbot Agentur",
  "n8n Agentur Deutschland",
  "Make.com Agentur",
  "Workflow Automatisierung",
  "Prozessautomatisierung",
  "Webentwicklung Agentur Berlin",
  "Shopify Agentur Deutschland",
  "WordPress Agentur Deutschland",
  "AI automation agency",
  "AI chatbot agency",
  "n8n automation agency",
  "Make.com agency",
  "RAG systems",
  "AI agents",
  "Next.js development",
];

export function getGlobalSchema(locale: Locale) {
  const inLanguage = locale === "de" ? "de-DE" : "en-US";
  const siteUrl = absoluteLocalized(locale, "/");
  const published = "2024-01-15";
  const modified = new Date().toISOString().slice(0, 10);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "XCLER",
        legalName: "XCLER",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}#logo`,
          url: `${BASE_URL}/logo.webp`,
          contentUrl: `${BASE_URL}/logo.webp`,
          width: 180,
          height: 48,
          caption: "XCLER",
        },
        image: { "@id": `${BASE_URL}#logo` },
        sameAs: [
          "https://www.facebook.com/xcler.dev",
          "https://www.instagram.com/xcler.dev",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+923154823517",
            contactType: "sales",
            url: `${BASE_URL}/kontakt`,
            areaServed: ["DE", "AT", "CH", "NL", "BE", "US"],
            availableLanguage: ["English", "German"],
          },
        ],
        knowsAbout: KNOWS_ABOUT,
        slogan:
          locale === "de"
            ? "KI-Automatisierungsagentur fuer Chatbots, n8n und Make.com aus Berlin"
            : "AI automation agency for chatbots, n8n and Make.com from Berlin",
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": BUSINESS_ID,
        name: "XCLER",
        image: [`${BASE_URL}/og-image-v2.webp`, { "@id": `${BASE_URL}#logo` }],
        url: BASE_URL,
        telephone: "+923154823517",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Berlin",
          addressCountry: "DE",
        },
        areaServed: AREA_SERVED,
        priceRange: "€€",
        parentOrganization: { "@id": ORG_ID },
        description:
          locale === "de"
            ? "XCLER ist eine KI-Automatisierungsagentur in Berlin. Wir bieten KI-Chatbots, RAG-Agenten, n8n- und Make.com-Workflow-Automatisierung sowie Webentwicklung fuer Deutschland, DACH, Benelux und remote US."
            : "XCLER is an AI automation agency based in Berlin. We offer AI chatbots, RAG agents, n8n and Make.com workflow automation, plus web development for Germany, DACH, Benelux and remote US including California, Florida and Chicago.",
        knowsAbout: [
          ...KNOWS_ABOUT,
          "AI agency Berlin",
          "KI Agentur Muenchen",
          "web development agency Germany",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: BASE_URL,
        name: "XCLER",
        inLanguage,
        datePublished: published,
        dateModified: modified,
        publisher: { "@id": ORG_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function getServiceSchema({ locale, path, slug, name, description }: ServiceSchemaInput) {
  const resolvedPath = path ?? (slug ? `/services/${slug}` : "/services");
  const serviceUrl = absoluteLocalized(locale, resolvedPath);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    serviceType: name,
    name,
    description,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    availableLanguage: ["de", "en"],
    url: serviceUrl,
    mainEntityOfPage: serviceUrl,
  };
}

/** @deprecated Prefer getServiceSchema with `path`. Kept for gradual migration. */
export function getServiceSchemaBySlug(
  locale: Locale,
  slug: string,
  name: string,
  description: string
) {
  return getServiceSchema({
    locale,
    path: `/services/${slug}`,
    name,
    description,
  });
}

export function getServiceCatalogSchema(locale: Locale, items: ServiceCatalogItem[]) {
  const pageUrl = absoluteLocalized(locale, "/services");

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${pageUrl}#services-catalog`,
    name: locale === "de" ? "XCLER Leistungen" : "XCLER Services",
    url: pageUrl,
    itemListElement: items.map((item, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        url: absoluteLocalized(locale, item.href),
        provider: { "@id": ORG_ID },
        areaServed: AREA_SERVED,
      },
    })),
  };
}

export function getFaqSchema(locale: Locale, items: FaqItem[], pagePath = "/") {
  const pageUrl = absoluteLocalized(locale, pagePath);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(locale: Locale, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteLocalized(locale, item.path),
    })),
  };
}
