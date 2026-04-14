import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Pricing } from "@/components/sections/Pricing";
import { getCanonicalPath } from "@/lib/canonical";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricing" });

  return {
    title: `${t("eyebrow")} | XCLER`,
    description: t("introDescription"),
    alternates: {
      canonical: getCanonicalPath(locale, "/pricing"),
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Pricing locale={locale} />;
}