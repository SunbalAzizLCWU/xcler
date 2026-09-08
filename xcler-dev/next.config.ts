import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://consent.cookiebot.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://consent.cookiebot.com; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-src https://consentcdn.cookiebot.com https://www.googletagmanager.com; base-uri 'self'",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Canonicalize AI chatbots: ki-chatbots → ai-chatbots-agents (EN + DE pathnames)
      {
        source: "/services/ki-chatbots",
        destination: "/services/ai-chatbots-agents",
        permanent: true,
      },
      {
        source: "/en/services/ki-chatbots",
        destination: "/en/services/ai-chatbots-agents",
        permanent: true,
      },
      {
        source: "/leistungen/ki-chatbots",
        destination: "/leistungen/ki-chatbots-agenten",
        permanent: true,
      },
      {
        source: "/de/services/ki-chatbots",
        destination: "/leistungen/ki-chatbots-agenten",
        permanent: true,
      },
      {
        source: "/de/leistungen/ki-chatbots",
        destination: "/leistungen/ki-chatbots-agenten",
        permanent: true,
      },
      // Unprefixed /work/* is not a valid DE path — send to EN case studies (fixes hreflang 307)
      {
        source: "/work/:slug",
        destination: "/en/work/:slug",
        permanent: true,
      },
      // Fix GSC 404: short Shopify URL → canonical DE service page
      {
        source: "/leistungen/shopify-entwicklung",
        destination: "/leistungen/shopify-entwicklung-deutschland",
        permanent: true,
      },
      {
        source: "/services/shopify-development",
        destination: "/en/services/shopify-development-germany",
        permanent: true,
      },
      // Typo slug Google discovered (missing "s")
      {
        source: "/en/services/ai-chatbot-agents",
        destination: "/en/services/ai-chatbots-agents",
        permanent: true,
      },
      {
        source: "/services/ai-chatbot-agents",
        destination: "/en/services/ai-chatbots-agents",
        permanent: true,
      },
      // Privacy: DE used /privacy historically; canonical DE is /datenschutz
      {
        source: "/privacy",
        destination: "/datenschutz",
        permanent: true,
      },
      {
        source: "/en/datenschutz",
        destination: "/en/privacy",
        permanent: true,
      },
      // Stale assets / files Google still crawls
      {
        source: "/Cv.docx",
        destination: "/ueber-uns",
        permanent: true,
      },
      {
        source: "/cv.docx",
        destination: "/ueber-uns",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
