import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./navigation";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  // Canonical host: https://xcler.dev (no www) — clears GSC redirect/alternate noise
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.hostname = host.replace(/^www\./, "");
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  // Explicit /de/* → unprefixed DE (as-needed). Helps Google retire /de URLs faster.
  const { pathname } = request.nextUrl;
  if (pathname === "/de" || pathname.startsWith("/de/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/de" ? "/" : pathname.replace(/^\/de/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(de|en)/:path*", "/((?!api|trpc|_next|_vercel|studio|admin|sitemap|.*\\..*).*)"],
};
