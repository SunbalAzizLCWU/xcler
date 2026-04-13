import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ["de", "en"] as const;
export const defaultLocale = "de";

export default getRequestConfig(async ({locale}) => {
  const resolvedLocale = locale ?? defaultLocale;

  if (!locales.includes(resolvedLocale as any)) notFound();

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default
  };
});