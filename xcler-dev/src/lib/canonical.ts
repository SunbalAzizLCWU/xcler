export function getCanonicalPath(locale: string, path: string) {
  const localePrefix = locale === "de" ? "" : "/en";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return localePrefix || "/";
  }

  return `${localePrefix}${normalizedPath}`;
}

function toAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return "https://xcler.dev";
  }

  return `https://xcler.dev${normalizedPath}`;
}

function getLocaleSubdirectoryPath(locale: "en" | "de", path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
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
    en: toAbsoluteUrl(getLocaleSubdirectoryPath("en", enPath)),
    de: toAbsoluteUrl(getLocaleSubdirectoryPath("de", dePath)),
    "x-default": toAbsoluteUrl(getLocaleSubdirectoryPath(xDefaultLocale, xDefaultPath)),
  };
}
