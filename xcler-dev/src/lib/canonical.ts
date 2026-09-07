import { getPathname } from "@/navigation";

type Locale = "en" | "de";

const BASE_URL = "https://xcler.dev";

/**
 * Resolve localized public paths, including dynamic /work/[slug] and /blog/[slug].
 * Plain string hrefs for dynamic routes can omit the /en prefix and break hreflang.
 */
function toLocalizedPath(locale: Locale, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const workMatch = normalizedPath.match(/^\/work\/([^/]+)\/?$/);
  if (workMatch) {
    return getPathname({
      locale,
      href: {
        pathname: "/work/[slug]",
        params: { slug: workMatch[1] },
      },
    });
  }

  const blogMatch = normalizedPath.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    return getPathname({
      locale,
      href: {
        pathname: "/blog/[slug]",
        params: { slug: blogMatch[1] },
      },
    });
  }

  return getPathname({ locale, href: normalizedPath as never });
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
