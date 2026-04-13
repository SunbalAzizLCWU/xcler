import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Our two language rooms
  locales: ['en', 'de'],
  // Germany is the main lobby
  defaultLocale: 'de',
  // Keep URLs clean (xcler.dev/about instead of xcler.dev/de/about)
  localePrefix: 'as-needed'
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);