import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Our two language rooms
  locales: ['de', 'en'],
  // Germany is the main lobby
  defaultLocale: 'de',
  // Localize user-facing URLs per locale while keeping stable internal route keys.
  pathnames: {
    '/': '/',
    '/services': {
      de: '/leistungen',
      en: '/services'
    },
    '/services/web-development': {
      de: '/leistungen/webentwicklung',
      en: '/services/web-development'
    },
    '/services/app-development': {
      de: '/leistungen/app-entwicklung',
      en: '/services/app-development'
    },
    '/services/wordpress-shopify': {
      de: '/leistungen/wordpress-entwicklung',
      en: '/services/wordpress-shopify'
    },
    '/services/workflow-automation': {
      de: '/leistungen/workflow-automatisierung',
      en: '/services/workflow-automation'
    },
    '/services/ai-chatbots-agents': {
      de: '/leistungen/ki-chatbots-agenten',
      en: '/services/ai-chatbots-agents'
    },
    '/services/ki-chatbots': {
      de: '/leistungen/ki-chatbots',
      en: '/services/ki-chatbots'
    },
    '/work': {
      de: '/projekte',
      en: '/work'
    },
    '/work/[slug]': {
      de: '/projekte/[slug]',
      en: '/work/[slug]'
    },
    '/about': {
      de: '/ueber-uns',
      en: '/about'
    },
    '/blog': {
      de: '/blog',
      en: '/blog'
    },
    '/blog/[slug]': {
      de: '/blog/[slug]',
      en: '/blog/[slug]'
    },
    '/pricing': {
      de: '/preise',
      en: '/pricing'
    },
    '/contact': {
      de: '/kontakt',
      en: '/contact'
    },
    '/privacy': {
      de: '/privacy',
      en: '/privacy'
    },
    '/datenschutz': {
      de: '/datenschutz',
      en: '/datenschutz'
    },
    '/impressum': {
      de: '/impressum',
      en: '/impressum'
    },
    '/cookies': {
      de: '/cookies',
      en: '/cookies'
    },
    '/agb': {
      de: '/agb',
      en: '/agb'
    }
  },
  // Keep URLs clean (xcler.dev/about instead of xcler.dev/de/about)
  localePrefix: 'as-needed',
  // Always open the German default unless a locale prefix is explicitly present.
  localeDetection: false,
  localeCookie: false
});

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);