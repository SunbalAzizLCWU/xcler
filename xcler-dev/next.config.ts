import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
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
    ];
  },
};

export default withNextIntl(nextConfig);
