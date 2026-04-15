import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
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