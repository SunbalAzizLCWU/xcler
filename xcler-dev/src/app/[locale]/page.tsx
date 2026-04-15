// src/app/page.tsx
import type { Metadata } from "next";
import type { ComponentProps } from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqSchema } from "@/lib/structuredData";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { StatsSection } from "@/components/sections/StatsSection";

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection").then((module) => module.ServicesSection)
);

const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((module) => module.TestimonialsSection)
);

const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection").then((module) => module.FAQSection)
);

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then((module) => module.ContactSection)
);

type LocalizedHref = ComponentProps<typeof Link>["href"];

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
      languages: getLanguageAlternates("/"),
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
  const tHomeSeo = await getTranslations({ locale, namespace: "HomeSeo" });
  const faqItems = [1, 2, 3, 4, 5, 6].map((index) => ({
    question: tFaq(`faq${index}.question`),
    answer: tFaq(`faq${index}.answer`),
  }));
  const pillars = tHomeSeo.raw("pillars") as Record<string, { title: string; body: string; href: string; cta: string }>;

  return (
    <>
      <JsonLd id={`faq-schema-${locale}`} data={getFaqSchema(locale === "en" ? "en" : "de", faqItems)} />
      <HeroSection />
      <section className="section-padding pt-10" aria-labelledby="homepage-seo-pillars">
        <div className="container-custom">
          <div className="mb-6 flex items-center gap-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-richblack/40 dark:text-cream/40">
              {tHomeSeo("eyebrow")}
            </span>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-richblack/78 dark:text-cream/82">
            {tHomeSeo("intro")}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {Object.entries(pillars).map(([key, pillar]) => (
              <article key={key} className="rounded-2xl border border-stone/15 bg-white/80 p-6 dark:border-stone-dark/20 dark:bg-richblack/35">
                <h2 id={key === "shopify" ? "homepage-seo-pillars" : undefined} className="font-heading text-2xl font-semibold tracking-tight text-richblack dark:text-cream">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-richblack/78 dark:text-cream/82">{pillar.body}</p>
                <Link
                  href={pillar.href as LocalizedHref}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-all hover:gap-3"
                >
                  {pillar.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
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