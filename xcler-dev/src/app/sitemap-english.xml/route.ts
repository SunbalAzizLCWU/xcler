import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Alias kept for old Search Console sitemap submissions */
export async function GET() {
  return NextResponse.redirect("https://xcler.dev/sitemap-en.xml", 308);
}
