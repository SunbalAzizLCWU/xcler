import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrivacyPage, { generateMetadata as generatePrivacyMetadata } from "../privacy/page";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "de") {
    return {
      title: "Not Found | XCLER",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseMetadata = await generatePrivacyMetadata({ params });

  return {
    ...baseMetadata,
    alternates: {
      canonical: getCanonicalPath("de", "/datenschutz"),
      languages: getLanguageAlternates("/datenschutz", {
        enPath: "/privacy",
        dePath: "/datenschutz",
        xDefaultLocale: "en",
      }),
    },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== "de") {
    notFound();
  }

  return <PrivacyPage params={params} />;
}
