import { getPathname } from "@/navigation";

type Locale = "en" | "de";

const BASE_URL = "https://xcler.dev";

function toLocalizedPath(locale: Locale, path: string) {
  return getPathname({ locale, href: path as never });
}

export function getCanonicalPath(locale: string, path: string) {
  const resolvedLocale: Locale = locale === "en" ? "en" : "de";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return toLocalizedPath(resolvedLocale, normalizedPath);
}

export function toAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return BASE_URL;
  }

  return `${BASE_URL}${normalizedPath}`;
}

export function getAbsoluteCanonical(locale: string, path: string) {
  return toAbsoluteUrl(getCanonicalPath(locale, path));
}

export function getLanguageAlternates(
  path: string,
  options?: {
    enPath?: string;
    dePath?: string;
    xDefaultLocale?: "en" | "de";
  }
) {
  const enPath = options?.enPath ?? path;
  const dePath = options?.dePath ?? path;
  // Default locale is German — x-default must match site defaultLocale.
  const xDefaultLocale = options?.xDefaultLocale ?? "de";
  const xDefaultPath = xDefaultLocale === "de" ? dePath : enPath;

  return {
    en: toAbsoluteUrl(toLocalizedPath("en", enPath)),
    de: toAbsoluteUrl(toLocalizedPath("de", dePath)),
    "x-default": toAbsoluteUrl(toLocalizedPath(xDefaultLocale, xDefaultPath)),
  };
}

export function getOpenGraphLocale(locale: string) {
  return locale === "de" ? "de_DE" : "en_US";
}

export function getAlternateOpenGraphLocale(locale: string) {
  return locale === "de" ? "en_US" : "de_DE";
}
