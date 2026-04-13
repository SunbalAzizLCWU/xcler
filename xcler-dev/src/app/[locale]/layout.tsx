// src/app/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "../globals.css";

// This tells Next.js to pre-build both the /en and /de versions of the site
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://xcler.dev"),
    title: {
      default: t("siteTitle"),
      template: "%s | XCLER",
    },
    description: t("siteDescription"),
    alternates: {
      languages: {
        "en-US": "/en",
        "de-DE": "/de",
      },
    },
    keywords: [
      "web development agency Germany",
      "app development Germany",
      "WordPress developer Germany",
      "Shopify developer Germany",
      "workflow automation",
      "AI chatbot development",
      "n8n automation",
      "make.com automation",
      "Next.js development",
      "full stack development Germany",
      "Webentwicklung Deutschland",
      "App Entwicklung Deutschland",
      "Website erstellen lassen",
      "Webdesign Agentur",
    ],
    authors: [{ name: "XCLER", url: "https://xcler.dev" }],
    creator: "XCLER",
    publisher: "XCLER",
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
      url: "https://xcler.dev",
      siteName: "XCLER",
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "XCLER — Web & App Development Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code", // Add later
    },
  };
}

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebDesignCompany",
  "@id": "https://xcler.dev/#webdesigncompany",
  name: "XCLER",
  url: "https://xcler.dev",
  logo: "https://xcler.dev/logo.png",
  image: "https://xcler.dev/og-image.png",
  description:
    "Web design and development company delivering conversion-focused websites, UX-first interfaces, and technical SEO for Berlin, Germany, and DACH businesses.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Friedrichstrasse 68",
    postalCode: "10117",
    addressLocality: "Berlin",
    addressRegion: "Berlin",
    addressCountry: "DE",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+923154823517",
      contactType: "customer service",
      email: "hello@xcler.dev",
      availableLanguage: ["English", "German"],
      areaServed: ["Berlin", "Germany"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+923154823517",
      contactType: "technical support",
      email: "hello@xcler.dev",
      availableLanguage: ["English", "German"],
      areaServed: ["Berlin", "Germany"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/xclerdev",
    "https://www.instagram.com/xclerdev",
  ],
  founder: {
    "@type": "Person",
    name: "Musharraf Aziz",
  },
  employee: [
    {
      "@type": "Person",
      name: "Abeel Mehr",
      jobTitle: "Full Stack Developer",
    },
    {
      "@type": "Person",
      name: "Mehru Seemab",
      jobTitle: "CMS Developer",
    },
  ],
  knowsAbout: [
    "Webentwicklung",
    "Webdesign Agentur Berlin",
    "WordPress Entwicklung",
    "Shopify Entwicklung",
    "KI-Chatbot Agentur",
    "Prozessautomatisierung mit n8n",
    "Automatisierung mit Make.com",
    "Technisches SEO",
    "Conversion-Optimierung",
    "Next.js Agentur",
    "App Entwicklung",
    "UX/UI Design",
  ],
  areaServed: [
    {
      "@type": "City",
      name: "Berlin",
    },
    {
      "@type": "Country",
      name: "Germany",
    },
    {
      "@type": "AdministrativeArea",
      name: "Bavaria",
    },
    {
      "@type": "AdministrativeArea",
      name: "Hesse",
    },
    {
      "@type": "City",
      name: "Munich",
    },
    {
      "@type": "City",
      name: "Hamburg",
    },
    {
      "@type": "City",
      name: "Frankfurt am Main",
    },
    {
      "@type": "City",
      name: "Vienna",
    },
    {
      "@type": "City",
      name: "Zurich",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Premium Web Design and Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        priceCurrency: "EUR",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Design",
          serviceType: "Web Design",
          description:
            "High-performance, conversion-focused website design tailored for Berlin and DACH markets.",
          areaServed: "Berlin",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "EUR",
        itemOffered: {
          "@type": "Service",
          name: "UX and Conversion Optimization",
          serviceType: "User Experience Design",
          description:
            "UX architecture and CRO implementation to improve lead quality and revenue outcomes.",
          areaServed: "Germany",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "EUR",
        itemOffered: {
          "@type": "Service",
          name: "Technical SEO Implementation",
          serviceType: "Technical SEO",
          description:
            "Structured data, crawl optimization, and semantic SEO engineering for scalable visibility.",
          areaServed: "Germany",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "EUR",
        itemOffered: {
          "@type": "Service",
          name: "WordPress and Shopify Development",
          serviceType: "Web Development",
          description:
            "Custom platform builds for growth-stage brands across Berlin and surrounding tech hubs.",
          areaServed: "DACH",
        },
      },
    ],
  },
  priceRange: "€€",
  currenciesAccepted: "EUR",
};

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const hydrationSanitizerScript = `
    (() => {
      const removeNoiseAttrs = (el) => {
        if (!(el instanceof Element)) return;

        if (el.hasAttribute("bis_skin_checked")) {
          el.removeAttribute("bis_skin_checked");
        }

        if (el.hasAttribute("bis_register")) {
          el.removeAttribute("bis_register");
        }

        for (const name of el.getAttributeNames()) {
          if (name.startsWith("__processed_") && name.endsWith("__")) {
            el.removeAttribute(name);
          }
        }
      };

      const cleanTree = (root) => {
        if (!root || !root.querySelectorAll) return;
        removeNoiseAttrs(root);
        for (const node of root.querySelectorAll("*")) {
          removeNoiseAttrs(node);
        }
      };

      cleanTree(document.documentElement);

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "attributes") {
            removeNoiseAttrs(mutation.target);
          }

          for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
              cleanTree(node);
            }
          }
        }
      });

      observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
      });
    })();
  `;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          id="hydration-sanitizer"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: hydrationSanitizerScript }}
        />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            <GrainOverlay />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}