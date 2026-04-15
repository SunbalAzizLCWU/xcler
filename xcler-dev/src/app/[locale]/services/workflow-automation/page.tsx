import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/lib/structuredData";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";

type CapabilityItem = {
  title: string;
  desc: string;
};

type FeatureItem = {
  title: string;
  description: string;
};

type HeroContent = {
  h1: string;
  h2: string;
  paragraph: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type SeoIntroObject = {
  paragraph1?: string;
  paragraph2?: string;
};

function getSeoIntroParagraphs(raw: unknown): string[] {
  if (typeof raw === "string") {
    return raw
      .split("\n\n")
      .map((part) => part.trim())
      .filter(Boolean);
  }

  if (raw && typeof raw === "object") {
    const intro = raw as SeoIntroObject;
    return [intro.paragraph1, intro.paragraph2].filter((part): part is string => Boolean(part?.trim()));
  }

  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceWorkflowAutomationPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getCanonicalPath(locale, "/services/workflow-automation"),
      languages: getLanguageAlternates("/services/workflow-automation"),
    },
  };
}

export default async function WorkflowAutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceWorkflowAutomationPage" });

  const getRaw = <T,>(key: string, fallback: T): T => {
    try {
      return t.raw(key) as T;
    } catch {
      return fallback;
    }
  };

  const getText = (key: string, fallback = ""): string => {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  };

  const defaultHero: HeroContent = {
    h1: `${t("headingLine1")} ${t("headingLine2")}`,
    h2: t("intro"),
    paragraph: t("intro"),
  };

  const hero = getRaw<HeroContent>("hero", defaultHero);
  const seoIntroParagraphs = getSeoIntroParagraphs(getRaw<unknown>("seoIntro", ""));
  const coreFeatures = getRaw<FeatureItem[]>(
    "coreFeatures",
    (getRaw<CapabilityItem[]>("capabilities", [])).map((item) => ({ title: item.title, description: item.desc }))
  );
  const architectureHighlight = getText("architectureHighlight", "");
  const aeoFaq = getRaw<FaqItem[]>("aeoFaq", []);

  const schema = getServiceSchema({
    locale: locale === "en" ? "en" : "de",
    slug: "workflow-automation",
    name: hero.h1,
    description: t("metaDescription"),
  });

  const faqSchema =
    aeoFaq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: aeoFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <JsonLd id={`service-workflow-automation-${locale}`} data={schema} />
      {faqSchema ? <JsonLd id={`service-workflow-automation-faq-${locale}`} data={faqSchema} /> : null}
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-28 right-0 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
          <div className="absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-sage/10 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
        <AnimatedSection>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-stone/20 bg-white/70 px-4 py-2 text-sm text-richblack/50 backdrop-blur-sm transition-colors hover:border-terracotta/40 hover:text-terracotta dark:border-stone-dark/20 dark:bg-richblack/40 dark:text-cream/50"
          >
            ← {t("backToServices")}
          </Link>

          <div className="mt-8 rounded-3xl border border-stone/15 bg-gradient-to-br from-white/85 via-white/70 to-stone/10 p-8 shadow-[0_20px_60px_-40px_rgba(13,13,13,0.45)] backdrop-blur-sm dark:border-stone-dark/20 dark:from-richblack/40 dark:via-richblack/35 dark:to-richblack/20 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                {t("serviceLabel")}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance">{hero.h1}</h1>
            <p className="mt-6 text-xl text-terracotta max-w-4xl leading-relaxed">{hero.h2}</p>
            <p className="mt-8 text-lg text-richblack/60 dark:text-cream/65 max-w-4xl leading-relaxed">{hero.paragraph}</p>
          </div>
        </AnimatedSection>

        {seoIntroParagraphs.length > 0 ? (
          <AnimatedSection>
            <div className="mt-20 space-y-5 max-w-5xl">
              {seoIntroParagraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`} className="rounded-2xl border border-stone/12 bg-white/75 p-6 text-base md:text-lg leading-relaxed text-richblack/70 shadow-[0_14px_40px_-30px_rgba(13,13,13,0.35)] dark:border-stone-dark/20 dark:bg-richblack/30 dark:text-cream/70">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>
        ) : null}

        <AnimatedSection>
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="line-decoration" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold">{locale === "de" ? "Core Features" : "Core Features"}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreFeatures.map((item, index) => (
                <div key={item.title} className="group relative overflow-hidden rounded-3xl border border-stone/15 bg-gradient-to-br from-white to-stone/10 p-7 shadow-[0_18px_45px_-35px_rgba(13,13,13,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-[0_24px_60px_-35px_rgba(184,92,56,0.45)] dark:border-stone-dark/20 dark:from-richblack/35 dark:to-richblack/20">
                  <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-terracotta/30 bg-terracotta/10 px-2 font-mono text-xs text-terracotta">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-richblack/60 dark:text-cream/60 leading-relaxed">{item.description}</p>
                </div>
              ))}
              </div>
          </div>
        </AnimatedSection>

        {architectureHighlight ? (
          <AnimatedSection>
            <div className="mt-20 relative overflow-hidden rounded-3xl bg-richblack p-8 md:p-10 text-cream shadow-[0_30px_80px_-45px_rgba(13,13,13,0.8)]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-terracotta/20 blur-3xl" />
              <h2 className="relative font-heading text-2xl md:text-3xl font-semibold">{locale === "de" ? "Technische Architektur" : "Technical Architecture"}</h2>
              <p className="relative mt-4 text-cream/75 leading-relaxed">{architectureHighlight}</p>
            </div>
          </AnimatedSection>
        ) : null}

        {aeoFaq.length > 0 ? (
          <AnimatedSection>
            <div className="mt-20 rounded-3xl border border-stone/15 bg-white/80 p-8 md:p-10 shadow-[0_20px_55px_-40px_rgba(13,13,13,0.5)] dark:border-stone-dark/20 dark:bg-richblack/35">
              <div className="flex items-end justify-between gap-6 border-b border-stone/15 pb-6 dark:border-stone-dark/20">
                <h2 className="font-heading text-3xl md:text-4xl font-semibold">FAQ</h2>
                <p className="font-mono text-xs tracking-[0.25em] uppercase text-richblack/40 dark:text-cream/40">AEO</p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-4">
                {aeoFaq.map((item, index) => (
                  <div key={item.question} className="rounded-2xl border border-stone/12 bg-gradient-to-br from-white to-stone/5 p-6 dark:border-stone-dark/20 dark:from-richblack/30 dark:to-richblack/15">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-terracotta/15 font-mono text-[11px] text-terracotta">{index + 1}</span>
                      <div>
                        <h3 className="font-heading text-xl font-semibold leading-snug">{item.question}</h3>
                        <p className="mt-3 text-richblack/65 dark:text-cream/65 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ) : null}

        <AnimatedSection>
          <div className="mt-20 rounded-2xl bg-richblack dark:bg-cream/5 p-10 text-cream text-center">
            <h2 className="font-heading text-3xl font-bold">{t("ctaHeading")}</h2>
            <p className="mt-3 text-cream/60">{t("ctaDescription")}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </AnimatedSection>
        </div>
      </section>
    </>
  );
}
