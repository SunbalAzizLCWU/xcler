import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        // Legacy prefixed German service URL -> localized German pathname
        source: '/:locale(de)/services/wordpress-shopify',
        destination: '/leistungen/wordpress-entwicklung',
        permanent: true,
      },
      {
        // Legacy German pathname variant -> current localized German pathname
        source: '/leistungen/wordpress-shopify',
        destination: '/leistungen/wordpress-entwicklung',
        permanent: true,
      },

      // Manual blog slug migration template (German locale)
      // {
      //   source: '/de/blog/old-english-slug',
      //   destination: '/de/blog/neuer-deutscher-slug',
      //   permanent: true,
      // },
    ];
  },
};

export default withNextIntl(nextConfig);