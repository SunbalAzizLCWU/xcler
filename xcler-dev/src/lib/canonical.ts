export function getCanonicalPath(locale: string, path: string) {
  const localePrefix = locale === "de" ? "" : "/en";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return localePrefix || "/";
  }

  return `${localePrefix}${normalizedPath}`;
}
