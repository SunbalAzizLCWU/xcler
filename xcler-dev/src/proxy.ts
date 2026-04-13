import createMiddleware from "next-intl/middleware";

const locales = ["de", "en"];
const defaultLocale = "de";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed"
});

export const config = {
  // Ensure the matcher catches the root path ('/') explicitly
  // along with all other paths excluding api, _next, static assets, etc.
  matcher: [
    "/",
    "/(de|en)/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
  ]
};