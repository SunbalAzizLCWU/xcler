import type { Metadata } from "next";
import type { ComponentProps } from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoAnswerBlock } from "@/components/seo/SeoAnswerBlock";
import { buildPageLinkedDataGraph } from "@/lib/pageLinkedData";
import { buildPageMetadata } from "@/lib/seoMeta";
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

  return buildPageMetadata({
    locale,
    path: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
    keywords:
      locale === "en"
        ? [
            "AI chatbots Germany Netherlands",
            "AI agency Berlin Munich Amsterdam",
            "workflow automation n8n Make",
            "digital agency DACH Benelux",
          ]
        : [
            "KI-Chatbots Deutschland Niederlande",
            "KI Agentur Berlin Muenchen Hamburg Amsterdam",
            "Workflow Automatisierung n8n Make",
            "Digitalagentur DACH Benelux",
          ],
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locale === "en" ? "en" : "de";
  const tHomeSeo = await getTranslations({ locale, namespace: "HomeSeo" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  const pillars = tHomeSeo.raw("pillars") as Record<
    string,
    { title: string; body: string; href: string; cta: string }
  >;

  const getRaw = <T,>(key: string, fallback: T): T => {
    try {
      return tHomeSeo.raw(key) as T;
    } catch {
      return fallback;
    }
  };

  const answerHeading = getRaw(
    "answerHeading",
    resolvedLocale === "de"
      ? "Was bietet XCLER fuer KI und Automatisierung?"
      : "What does XCLER offer for AI and automation?"
  );
  const citablePassage = getRaw("citablePassage", tHomeSeo("intro"));
  const listTitle = getRaw("listTitle", resolvedLocale === "de" ? "Leistungen" : "Services");
  const listItems = getRaw<string[]>("listItems", []);

  const pageGraph = buildPageLinkedDataGraph({
    locale: resolvedLocale,
    path: "/",
    name: tMeta("homeTitle"),
    description: tMeta("homeDescription"),
    breadcrumbs: [{ name: "XCLER", path: "/" }],
  });

  return (
    <>
      <JsonLd id={`page-graph-home-${locale}`} data={pageGraph} />
      <HeroSection locale={locale} />
      <section className="section-padding pt-10" aria-labelledby="homepage-seo-pillars">
        <div className="container-custom">
          <SeoAnswerBlock
            headingId="home-ai-automation-answer"
            heading={answerHeading}
            lede={tHomeSeo("intro")}
            citablePassage={citablePassage}
            listTitle={listTitle}
            listItems={listItems}
            tableCaption={resolvedLocale === "de" ? "Fokusmaerkte" : "Focus markets"}
            tableRows={[
              {
                label: "DACH",
                value:
                  resolvedLocale === "de"
                    ? "Berlin, Muenchen, Hamburg, Frankfurt, Koeln, Stuttgart, Wien, Zuerich"
                    : "Berlin, Munich, Hamburg, Frankfurt, Cologne, Stuttgart, Vienna, Zurich",
              },
              {
                label: resolvedLocale === "de" ? "Benelux" : "Benelux",
                value:
                  resolvedLocale === "de"
                    ? "Amsterdam, Rotterdam, Utrecht, Den Haag, Bruessel (remote)"
                    : "Amsterdam, Rotterdam, Utrecht, The Hague, Brussels (remote)",
              },
              {
                label: "US",
                value: "California, Florida, Chicago (remote delivery)",
              },
              {
                label: resolvedLocale === "de" ? "Prioritaet" : "Priority",
                value:
                  resolvedLocale === "de"
                    ? "KI-Chatbots & Workflow-Automatisierung"
                    : "AI chatbots & workflow automation",
              },
            ]}
            numericClaims={
              resolvedLocale === "de"
                ? [
                    "3+ Jahre Erfahrung.",
                    "50+ gelieferte Projekte.",
                    "98 Prozent Kundenzufriedenheit.",
                    "6 Branchen betreut.",
                  ]
                : [
                    "3+ years experience.",
                    "50+ projects delivered.",
                    "98 percent client satisfaction.",
                    "6 industries served.",
                  ]
            }
            citationQuote={
              resolvedLocale === "de"
                ? "Next.js Dokumentation beschreibt App Router und Performance-Muster fuer moderne Webplattformen."
                : "Next.js documentation describes App Router and performance patterns for modern web platforms."
            }
            citationHref="https://nextjs.org/docs"
            citationLabel="nextjs.org/docs"
          />

          <div className="mb-6 mt-16 flex items-center gap-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-richblack/40 dark:text-cream/40">
              {tHomeSeo("eyebrow")}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {Object.entries(pillars).map(([key, pillar], index) => (
              <article
                key={key}
                className="rounded-2xl border border-stone/15 bg-white/80 p-6 dark:border-stone-dark/20 dark:bg-richblack/35"
              >
                <h2
                  id={index === 0 ? "homepage-seo-pillars" : `home-pillar-${key}`}
                  className="font-heading text-2xl font-semibold tracking-tight text-richblack dark:text-cream"
                >
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-richblack/78 dark:text-cream/82">
                  {pillar.body}
                </p>
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
      <WorkSection locale={locale} />
      <ProcessSection locale={locale} />
      <TeamSection locale={locale} />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
