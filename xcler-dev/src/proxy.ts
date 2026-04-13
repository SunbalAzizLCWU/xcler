// src/proxy.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./navigation";

/**
 * The Proxy (Middleware) handles the internationalization routing logic.
 * It uses the 'routing' configuration defined in src/navigation.ts 
 * to ensure consistency across the application.
 */
export default createMiddleware(routing);

export const config = {
  // The matcher tells Next.js which paths should be handled by this proxy.
  // We explicitly include the root '/', localized paths, and exclude
  // internal Next.js paths and static assets to maintain performance.
  matcher: [
    // Match the root path for automatic language redirection
    "/",
    
    // Match all paths starting with our supported locales
    "/(de|en)/:path*",
    
    // Catch-all that excludes internal files, APIs, and static assets
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
  ]
};