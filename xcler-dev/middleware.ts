import createMiddleware from "next-intl/middleware";
import {defaultLocale, locales} from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed"
});

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"]
};
