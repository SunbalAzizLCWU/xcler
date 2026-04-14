const BASE_URL = "https://xcler.dev";
const ORG_ID = `${BASE_URL}#organization`;
const BUSINESS_ID = `${BASE_URL}#localbusiness`;

type Locale = "en" | "de";

type ServiceSchemaInput = {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
};

type ServiceCatalogItem = {
  name: string;
  description: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

function getLocalePath(locale: Locale) {
  return locale === "de" ? "" : "/en";
}

export function getGlobalSchema(locale: Locale) {
  const localePath = getLocalePath(locale);
  const inLanguage = locale === "de" ? "de-DE" : "en-US";
  const siteUrl = `${BASE_URL}${localePath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "XCLER",
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        sameAs: [
          "https://www.facebook.com/xcler.dev",
          "https://www.instagram.com/xcler.dev"
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+923154823517",
            contactType: "sales",
            areaServed: ["DE", "AT", "CH"],
            availableLanguage: ["English", "German"]
          }
        ]
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": BUSINESS_ID,
        name: "XCLER",
        image: `${BASE_URL}/og-image.png`,
        url: BASE_URL,
        telephone: "+923154823517",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Berlin",
          addressCountry: "DE"
        },
        areaServed: [
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Austria" },
          { "@type": "Country", name: "Switzerland" }
        ],
        priceRange: "EUR",
        parentOrganization: { "@id": ORG_ID }
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}#website`,
        url: BASE_URL,
        name: "XCLER",
        inLanguage,
        publisher: { "@id": ORG_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
}

export function getServiceSchema({ locale, slug, name, description }: ServiceSchemaInput) {
  const localePath = getLocalePath(locale);
  const serviceUrl = `${BASE_URL}${localePath}/services/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    serviceType: name,
    name,
    description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Germany" },
    availableLanguage: ["de", "en"],
    url: serviceUrl
  };
}

export function getServiceCatalogSchema(locale: Locale, items: ServiceCatalogItem[]) {
  const localePath = getLocalePath(locale);
  const pageUrl = `${BASE_URL}${localePath}/services`;

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
        url: `${BASE_URL}${localePath}${item.href}`,
        provider: { "@id": ORG_ID }
      }
    }))
  };
}

export function getFaqSchema(locale: Locale, items: FaqItem[]) {
  const localePath = getLocalePath(locale);
  const pageUrl = `${BASE_URL}${localePath || "/"}`;

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
        text: item.answer
      }
    }))
  };
}
