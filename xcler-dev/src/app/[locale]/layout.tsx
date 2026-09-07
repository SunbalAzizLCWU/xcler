// src/app/layout.tsx
import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteMotionChrome } from "@/components/ui/SiteMotionChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";
import { getGlobalSchema } from "@/lib/structuredData";
import "../globals.css";

const WhatsAppButton = dynamic(
  () => import("@/components/ui/WhatsAppButton").then((module) => module.WhatsAppButton)
);

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
});

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-syne",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
  preload: false,
});

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
  const pageTitle = t("pageTitle");
  const pageDescription = t("pageDescription");

  return {
    metadataBase: new URL("https://xcler.dev"),
    title: {
      default: pageTitle,
      template: "%s | XCLER",
    },
    description: pageDescription,
    icons: {
      icon: [{ url: "/icon.png" }, { url: "/favicon.ico" }, { url: "/logo.svg", type: "image/svg+xml" }],
      shortcut: [{ url: "/favicon.ico" }],
      apple: [{ url: "/apple-icon.png" }, { url: "/apple-touch-icon.png" }],
    },
    alternates: {
      canonical: getCanonicalPath(locale, "/"),
      languages: getLanguageAlternates("/", { xDefaultLocale: "de" }),
    },
    keywords: [
      "KI-Automatisierungsagentur Deutschland",
      "KI Automatisierung Agentur",
      "KI Chatbot Agentur Berlin",
      "KI Agenten RAG Deutschland",
      "n8n Agentur Deutschland",
      "Make.com Agentur Deutschland",
      "Workflow Automatisierung Agentur",
      "Prozessautomatisierung Agentur",
      "Webentwicklung Agentur Berlin",
      "Shopify Agentur Deutschland",
      "WordPress Agentur Deutschland",
      "AI automation agency Germany",
      "AI chatbot agency Germany",
      "n8n automation agency",
      "Make.com agency",
      "web development agency Germany",
    ],
    authors: [{ name: "XCLER", url: "https://xcler.dev" }],
    creator: "XCLER",
    publisher: "XCLER",
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
      url: getCanonicalPath(locale, "/") === "/" ? "https://xcler.dev" : `https://xcler.dev${getCanonicalPath(locale, "/")}`,
      siteName: "XCLER",
      title: pageTitle.replace(/\s*\|\s*XCLER\s*$/i, "").trim(),
      description: pageDescription,
      images: [
        {
          url: "/og-image-v2.webp",
          width: 1200,
          height: 630,
          alt: "XCLER — AI Automation for Chatbots, Agents & Workflows",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle.replace(/\s*\|\s*XCLER\s*$/i, "").trim(),
      description: pageDescription,
      images: ["/og-image-v2.webp"],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
  };
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`dark ${dmSans.variable} ${syne.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{
            __html: `
              html, body { margin: 0; padding: 0; }
              body {
                background: #07080c;
                color: #f2f4f7;
                font-family: var(--font-dm-sans), sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .container-custom {
                max-width: 1440px;
                margin-left: auto;
                margin-right: auto;
                padding-left: 1.25rem;
                padding-right: 1.25rem;
              }
              .section-padding {
                padding-left: 1.25rem;
                padding-right: 1.25rem;
                padding-top: 5.5rem;
                padding-bottom: 5.5rem;
              }
              @media (min-width: 768px) {
                .container-custom {
                  padding-left: 2.5rem;
                  padding-right: 2.5rem;
                }
                .section-padding {
                  padding-left: 2.5rem;
                  padding-right: 2.5rem;
                  padding-top: 7.5rem;
                  padding-bottom: 7.5rem;
                }
              }
              .line-decoration {
                width: 2.5rem;
                height: 2px;
                background: linear-gradient(90deg, #2dff9a, #ff4d1c);
              }
            `,
          }}
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://consent.cookiebot.com" />
        <script
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 1500
              });
            `,
          }}
        />
        {/* Defer Cookiebot + GTM until idle / first interaction — major TBT win */}
        <script
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var loaded = false;
                function loadThirdParties() {
                  if (loaded) return;
                  loaded = true;

                  try {
                    var hasCookieConsent = document.cookie.split(';').some(function (cookie) {
                      var key = cookie.trim().split('=')[0];
                      return key === 'CookieConsent' || key === 'CookieConsentBulkTicket';
                    });
                    if (hasCookieConsent) {
                      document.documentElement.setAttribute('data-has-cookiebot-consent', 'true');
                    }
                  } catch (_) {}

                  var cookiebot = document.createElement('script');
                  cookiebot.id = 'Cookiebot';
                  cookiebot.src = 'https://consent.cookiebot.com/uc.js';
                  cookiebot.setAttribute('data-cbid', '8452dd7f-8fce-4b63-b09d-158e0ccf7d45');
                  cookiebot.setAttribute('data-blockingmode', 'manual');
                  cookiebot.async = true;
                  document.head.appendChild(cookiebot);

                  function syncConsent() {
                    if (!window.Cookiebot || typeof window.gtag !== 'function') return;
                    window.gtag('consent', 'update', {
                      ad_storage: window.Cookiebot.consent.marketing ? 'granted' : 'denied',
                      analytics_storage: window.Cookiebot.consent.statistics ? 'granted' : 'denied',
                      ad_user_data: window.Cookiebot.consent.marketing ? 'granted' : 'denied',
                      ad_personalization: window.Cookiebot.consent.marketing ? 'granted' : 'denied'
                    });
                  }
                  window.addEventListener('CookiebotOnConsentReady', syncConsent);
                  window.addEventListener('CookiebotOnAccept', syncConsent);
                  window.addEventListener('CookiebotOnDecline', syncConsent);

                  if (!window.__xclerGtmLoaded) {
                    window.__xclerGtmLoaded = true;
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                    var gtmScript = document.createElement('script');
                    gtmScript.async = true;
                    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-K4669PCH';
                    document.head.appendChild(gtmScript);
                  }
                }

                function schedule() {
                  if ('requestIdleCallback' in window) {
                    requestIdleCallback(loadThirdParties, { timeout: 4000 });
                  } else {
                    setTimeout(loadThirdParties, 2500);
                  }
                }

                ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (evt) {
                  window.addEventListener(evt, loadThirdParties, { once: true, passive: true });
                });

                if (document.readyState === 'complete') {
                  schedule();
                } else {
                  window.addEventListener('load', schedule, { once: true });
                }
              })();
            `,
          }}
        />
        <JsonLd id={`global-graph-${locale}`} data={getGlobalSchema(locale === "en" ? "en" : "de")} />
        <meta property="article:published_time" content="2024-01-15" />
        <meta property="article:modified_time" content={new Date().toISOString().slice(0, 10)} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      </head>
      <body className="font-body antialiased text-cream bg-richblack" suppressHydrationWarning>
        <div className="site-atmosphere" aria-hidden="true" />
        <div className="site-grid" aria-hidden="true" />
        <div className="scan-line motion-safe:block hidden" aria-hidden="true" />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4669PCH" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:bg-terracotta focus:px-4 focus:py-2 focus:text-richblack"
          >
            Skip to content
          </a>
          <div className="relative z-10">
            <SiteMotionChrome />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer locale={locale} />
            <WhatsAppButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
