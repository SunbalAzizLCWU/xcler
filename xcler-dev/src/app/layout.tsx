// src/app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xcler.dev"),
  title: {
    default: "XCLER — Web & App Development Agency | Germany",
    template: "%s | XCLER",
  },
  description:
    "We build exceptional websites, apps, and automation systems. Based team serving Germany and beyond. Web development, WordPress, Shopify, AI chatbots, workflow automation.",
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
    locale: "en_US",
    alternateLocale: "de_DE",
    url: "https://xcler.dev",
    siteName: "XCLER",
    title: "XCLER — We Build What Others Prototype",
    description:
      "Exceptional websites, apps, and automation systems. Web development, WordPress, Shopify, AI chatbots, workflow automation.",
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
    title: "XCLER — We Build What Others Prototype",
    description:
      "Exceptional websites, apps, and automation systems for businesses.",
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

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XCLER",
  url: "https://xcler.dev",
  logo: "https://xcler.dev/logo.png",
  description:
    "Web & App Development Agency specializing in custom websites, apps, WordPress, Shopify, AI chatbots, and workflow automation.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+923154823517",
    contactType: "customer service",
    email: "hello@xcler.dev",
    availableLanguage: ["English", "German"],
  },
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
    "Web Development",
    "App Development",
    "WordPress Development",
    "Shopify Development",
    "Workflow Automation",
    "AI Chatbots",
    "n8n",
    "Make.com",
    "Next.js",
    "Python",
    "RAG Agents",
  ],
  areaServed: {
    "@type": "Country",
    name: "Germany",
  },
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrationSanitizerScript = `
    (() => {
      const clean = (root) => {
        if (!root || !root.querySelectorAll) return;
        const nodes = [root, ...root.querySelectorAll("*")];

        for (const el of nodes) {
          if (!(el instanceof Element)) continue;

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
        }
      };

      clean(document.documentElement);
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: hydrationSanitizerScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
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
      </body>
    </html>
  );
}