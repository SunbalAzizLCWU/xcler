import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ["de", "en"] as const;
export const defaultLocale = "de";
type SupportedLocale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  const resolvedLocale = locale ?? defaultLocale;

  if (!locales.includes(resolvedLocale as SupportedLocale)) notFound();

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default
  };
});