import { getPathname } from "@/navigation";

type Locale = "en" | "de";

function toLocalizedPath(locale: Locale, path: string) {
  return getPathname({ locale, href: path as never });
}

export function getCanonicalPath(locale: string, path: string) {
  const resolvedLocale: Locale = locale === "en" ? "en" : "de";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return toLocalizedPath(resolvedLocale, normalizedPath);
}

function toAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return "https://xcler.dev";
  }

  return `https://xcler.dev${normalizedPath}`;
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
  const xDefaultLocale = options?.xDefaultLocale ?? "en";
  const xDefaultPath = xDefaultLocale === "de" ? dePath : enPath;

  return {
    en: toAbsoluteUrl(toLocalizedPath("en", enPath)),
    de: toAbsoluteUrl(toLocalizedPath("de", dePath)),
    "x-default": toAbsoluteUrl(toLocalizedPath(xDefaultLocale, xDefaultPath)),
  };
}
