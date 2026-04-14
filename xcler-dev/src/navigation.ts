import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Our two language rooms
  locales: ['en', 'de'],
  // Germany is the main lobby
  defaultLocale: 'de',
  // Keep URLs clean (xcler.dev/about instead of xcler.dev/de/about)
  localePrefix: 'as-needed',
  // Always open the German default unless a locale prefix is explicitly present.
  localeDetection: false,
  localeCookie: false
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);