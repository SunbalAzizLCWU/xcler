import createMiddleware from "next-intl/middleware";
import { routing } from "./navigation";

export default createMiddleware(routing);

export const config = {
  // Skip APIs, Next internals, studio/admin, and static/sitemap assets (*.xml, images, etc.)
  matcher: ["/", "/(de|en)/:path*", "/((?!api|trpc|_next|_vercel|studio|admin|sitemap|.*\\..*).*)"],
};