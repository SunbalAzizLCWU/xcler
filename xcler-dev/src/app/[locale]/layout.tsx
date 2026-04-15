// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGlobalSchema } from "@/lib/structuredData";
import "../globals.css";

const WhatsAppButton = dynamic(
  () => import("@/components/ui/WhatsAppButton").then((module) => module.WhatsAppButton)
);

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jetbrains-mono",
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
      icon: [{ url: "/icon.png" }, { url: "/favicon.ico" }],
      shortcut: [{ url: "/favicon.ico" }],
      apple: [{ url: "/apple-icon.png" }, { url: "/apple-touch-icon.png" }],
    },
    alternates: {
      languages: {
        en: "https://xcler.dev/en",
        de: "https://xcler.dev/de",
        "x-default": "https://xcler.dev/en",
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
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: "XCLER — Web & App Development Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/og-image.webp"],
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{
            __html: `
              html, body { margin: 0; padding: 0; }
              body {
                background: #F5F0EB;
                color: #0D0D0D;
                font-family: var(--font-inter), sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .container-custom {
                max-width: 1400px;
                margin-left: auto;
                margin-right: auto;
                padding-left: 1.5rem;
                padding-right: 1.5rem;
              }
              .section-padding {
                padding-left: 1.5rem;
                padding-right: 1.5rem;
                padding-top: 5rem;
                padding-bottom: 5rem;
              }
              @media (min-width: 768px) {
                .container-custom {
                  padding-left: 3rem;
                  padding-right: 3rem;
                }
                .section-padding {
                  padding-left: 3rem;
                  padding-right: 3rem;
                  padding-top: 8rem;
                  padding-bottom: 8rem;
                }
              }
              .line-decoration { width: 3rem; height: 2px; background: #B85C38; }
            `,
          }}
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
                wait_for_update: 500
              });
            `,
          }}
        />
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="8452dd7f-8fce-4b63-b09d-158e0ccf7d45"
          data-blockingmode="manual"
          async
          type="text/javascript"></script>
        <script
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var hasCookieConsent = document.cookie.split(';').some(function (cookie) {
                    var key = cookie.trim().split('=')[0];
                    return key === 'CookieConsent' || key === 'CookieConsentBulkTicket';
                  });

                  if (hasCookieConsent) {
                    document.documentElement.setAttribute('data-has-cookiebot-consent', 'true');
                  }
                } catch (_) {
                  // Ignore cookie read issues and let Cookiebot handle defaults.
                }
              })();
            `,
          }}
        />
        <script
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
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
              })();
            `,
          }}
        />
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `
              (function (w, d, l, i) {
                function loadGtm() {
                  if (w.__xclerGtmLoaded) return;
                  w.__xclerGtmLoaded = true;

                  w[l] = w[l] || [];
                  w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                  });

                  var dl = l !== 'dataLayer' ? '&l=' + l : '';
                  var gtmScript = d.createElement('script');
                  gtmScript.async = true;
                  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                  d.head.appendChild(gtmScript);

                  w.dispatchEvent(new Event('afterLoad'));
                }

                if (d.readyState === 'complete') {
                  loadGtm();
                } else {
                  w.addEventListener('load', loadGtm, { once: true });
                }
              })(window, document, 'dataLayer', 'GTM-K4669PCH');
            `,
          }}
        />
        <JsonLd id={`global-graph-${locale}`} data={getGlobalSchema(locale === "en" ? "en" : "de")} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4669PCH" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}