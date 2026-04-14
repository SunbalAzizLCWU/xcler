// src/app/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqSchema } from "@/lib/structuredData";
import { getCanonicalPath } from "@/lib/canonical";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: getCanonicalPath(locale, "/"),
      languages: {
        "en-US": "/en",
        "de-DE": "/de",
      },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: locale === "de" ? "https://xcler.dev/de" : "https://xcler.dev/en",
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tFaq = await getTranslations({ locale, namespace: "FAQ" });
  const faqItems = [1, 2, 3, 4, 5, 6].map((index) => ({
    question: tFaq(`faq${index}.question`),
    answer: tFaq(`faq${index}.answer`),
  }));

  return (
    <>
      <JsonLd id={`faq-schema-${locale}`} data={getFaqSchema(locale === "en" ? "en" : "de", faqItems)} />
      <HeroSection />
      <LogoMarquee />
      <ServicesSection />
      <StatsSection />
      <WorkSection />
      <ProcessSection />
      <TeamSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}