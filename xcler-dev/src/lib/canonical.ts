import { getPathname } from "@/navigation";

export function getCanonicalPath(locale: string, path: string) {
  const resolvedLocale = locale === "en" ? "en" : "de";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return getPathname({ locale: resolvedLocale, href: normalizedPath as never });
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
    en: toAbsoluteUrl(getPathname({ locale: "en", href: enPath as never })),
    de: toAbsoluteUrl(getPathname({ locale: "de", href: dePath as never })),
    "x-default": toAbsoluteUrl(getPathname({ locale: xDefaultLocale, href: xDefaultPath as never })),
  };
}
