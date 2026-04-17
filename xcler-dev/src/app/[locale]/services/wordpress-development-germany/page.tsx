import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SideContactCta } from "@/components/sections/SideContactCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/lib/structuredData";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";

type CoreServiceItem = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type HeroContent = {
  h1: string;
  h2: string;
  paragraph: string;
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
  const t = await getTranslations({ locale, namespace: "ServiceWordpressDevelopmentPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getCanonicalPath(locale, "/services/wordpress-development-germany"),
      languages: getLanguageAlternates("/services/wordpress-development-germany"),
    },
  };
}

export default async function WordPressDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "ServiceWordpressDevelopmentPage" });
  const t = await getTranslations({ locale, namespace: "ServiceWordpressPage" });
  const hero = t.raw("hero") as HeroContent;
  const seoIntroParagraphs = getSeoIntroParagraphs(t.raw("seoIntro"));
  const coreServices = t.raw("coreServices") as CoreServiceItem[];
  const infrastructureHighlight = t("infrastructureHighlight");
  const faqItems = t.raw("aeoFaq") as FaqItem[];
  const backToHubLabel = locale === "de" ? "Zurueck zum E-Commerce & CMS Hub" : "Back to E-Commerce & CMS Hub";
  const contactCtaTitle = locale === "de" ? "Planen wir Ihr WordPress-Projekt" : "Let us plan your WordPress project";
  const contactCtaDescription =
    locale === "de"
      ? "Erhalten Sie ein klares Setup fuer Architektur, Performance und langfristige Wartbarkeit."
      : "Get a clear setup for architecture, performance, and long-term maintainability.";
  const contactCtaButton = locale === "de" ? "WordPress-Beratung starten" : "Start WordPress Consultation";
  const schema = getServiceSchema({
    locale: locale === "en" ? "en" : "de",
    slug: "wordpress-development-germany",
    name: hero.h1,
    description: tMeta("metaDescription"),
  });

  return (
    <>
      <JsonLd id={`service-wordpress-development-${locale}`} data={schema} />
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-28 right-0 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
          <div className="absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-sage/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-stone/20 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10 xl:items-start">
            <div>
              <AnimatedSection>
                <Link
                  href="/services/wordpress-shopify"
                  className="inline-flex items-center gap-2 rounded-full border border-stone/20 bg-white/70 px-4 py-2 text-sm text-richblack/50 backdrop-blur-sm transition-colors hover:border-terracotta/40 hover:text-terracotta dark:border-stone-dark/20 dark:bg-richblack/40 dark:text-cream/50"
                >
                  ← {backToHubLabel}
                </Link>

            <div className="mt-8 rounded-3xl border border-stone/15 bg-gradient-to-br from-white/85 via-white/70 to-stone/10 p-8 shadow-[0_20px_60px_-40px_rgba(13,13,13,0.45)] backdrop-blur-sm dark:border-stone-dark/20 dark:from-richblack/40 dark:via-richblack/35 dark:to-richblack/20 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="line-decoration" />
                <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                  {locale === "de" ? "Leistung / WordPress" : "Service / WordPress"}
                </span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance">{hero.h1}</h1>
              <p className="mt-6 text-xl text-terracotta max-w-4xl leading-relaxed">{hero.h2}</p>
              <p className="mt-8 text-lg text-richblack/60 dark:text-cream/65 max-w-4xl leading-relaxed">{hero.paragraph}</p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-stone/15 bg-white/70 p-4 dark:border-stone-dark/20 dark:bg-richblack/30">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-richblack/40 dark:text-cream/40">{locale === "de" ? "Architektur" : "Architecture"}</p>
                  <p className="mt-2 font-heading text-lg">{locale === "de" ? "Modular & wartbar" : "Modular & maintainable"}</p>
                </div>
                <div className="rounded-2xl border border-stone/15 bg-white/70 p-4 dark:border-stone-dark/20 dark:bg-richblack/30">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-richblack/40 dark:text-cream/40">{locale === "de" ? "Performance" : "Performance"}</p>
                  <p className="mt-2 font-heading text-lg">{locale === "de" ? "Stabil unter Last" : "Stable under load"}</p>
                </div>
                <div className="rounded-2xl border border-stone/15 bg-white/70 p-4 dark:border-stone-dark/20 dark:bg-richblack/30">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-richblack/40 dark:text-cream/40">{locale === "de" ? "Governance" : "Governance"}</p>
                  <p className="mt-2 font-heading text-lg">{locale === "de" ? "Sicher deploybar" : "Safe to deploy"}</p>
                </div>
              </div>
            </div>
              </AnimatedSection>

              <AnimatedSection>
            <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div className="lg:sticky lg:top-28 h-max rounded-2xl border border-stone/15 bg-white/70 p-5 dark:border-stone-dark/20 dark:bg-richblack/30">
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-richblack/40 dark:text-cream/40">{locale === "de" ? "Technischer Brief" : "Technical Brief"}</p>
                <p className="mt-3 text-sm leading-relaxed text-richblack/60 dark:text-cream/60">{locale === "de" ? "Langform-Inhalt fuer Architektur, Performance und operative Skalierung." : "Long-form context for architecture, performance, and operational scale."}</p>
              </div>

              <div className="space-y-5">
                {seoIntroParagraphs.map((paragraph, index) => (
                  <p key={`${index}-${paragraph.slice(0, 24)}`} className="rounded-2xl border border-stone/12 bg-white/75 p-6 text-base md:text-lg leading-relaxed text-richblack/70 shadow-[0_14px_40px_-30px_rgba(13,13,13,0.35)] dark:border-stone-dark/20 dark:bg-richblack/30 dark:text-cream/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
              </AnimatedSection>

              <AnimatedSection>
            <div className="mt-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="line-decoration" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold">{locale === "de" ? "Core Services" : "Core Services"}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreServices.map((item, index) => (
                  <div key={item.title} className="group relative overflow-hidden rounded-3xl border border-stone/15 bg-gradient-to-br from-white to-stone/10 p-7 shadow-[0_18px_45px_-35px_rgba(13,13,13,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-[0_24px_60px_-35px_rgba(184,92,56,0.45)] dark:border-stone-dark/20 dark:from-richblack/35 dark:to-richblack/20">
                    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-terracotta/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-terracotta/30 bg-terracotta/10 px-2 font-mono text-xs text-terracotta">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-heading text-xl font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-4 text-richblack/65 dark:text-cream/65 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
              </AnimatedSection>

              <AnimatedSection>
            <div className="mt-20 relative overflow-hidden rounded-3xl bg-richblack p-8 md:p-10 text-cream shadow-[0_30px_80px_-45px_rgba(13,13,13,0.8)]">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-terracotta/20 blur-3xl" />
                <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-sage/20 blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold">{locale === "de" ? "Infrastruktur-Highlight" : "Infrastructure Highlight"}</h2>
                <p className="mt-4 text-cream/75 leading-relaxed">{infrastructureHighlight}</p>
              </div>
            </div>
              </AnimatedSection>

              <AnimatedSection>
            <div className="mt-20 rounded-3xl border border-stone/15 bg-white/80 p-8 md:p-10 shadow-[0_20px_55px_-40px_rgba(13,13,13,0.5)] dark:border-stone-dark/20 dark:bg-richblack/35">
              <div className="flex items-end justify-between gap-6 border-b border-stone/15 pb-6 dark:border-stone-dark/20">
                <h2 className="font-heading text-3xl md:text-4xl font-semibold">FAQ</h2>
                <p className="font-mono text-xs tracking-[0.25em] uppercase text-richblack/40 dark:text-cream/40">{locale === "de" ? "Haeufige Fragen" : "Common Questions"}</p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4">
                {faqItems.map((item, index) => (
                  <div key={item.question} className="rounded-2xl border border-stone/12 bg-gradient-to-br from-white to-stone/5 p-6 transition-all duration-300 hover:border-terracotta/30 hover:shadow-[0_14px_36px_-30px_rgba(184,92,56,0.45)] dark:border-stone-dark/20 dark:from-richblack/30 dark:to-richblack/15">
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

              <AnimatedSection>
            <div className="mt-20 relative overflow-hidden rounded-3xl bg-richblack p-10 text-cream text-center shadow-[0_35px_80px_-45px_rgba(13,13,13,0.85)]">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-terracotta/20 blur-3xl" />
              </div>
              <h2 className="font-heading text-3xl font-bold">{locale === "de" ? "Bereit fuer ein leistungsstarkes WordPress-System?" : "Ready for a high-performance WordPress system?"}</h2>
              <p className="mt-3 text-cream/70 max-w-2xl mx-auto">{locale === "de" ? "Wir bauen belastbare Architektur fuer Wachstum, Sicherheit und stabile Releases." : "We build resilient architecture for growth, security, and predictable releases."}</p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white shadow-[0_10px_30px_-10px_rgba(184,92,56,0.65)] transition-all hover:-translate-y-0.5 hover:bg-terracotta-light"
              >
                {locale === "de" ? "Projekt starten ->" : "Start Your Project ->"}
              </Link>
            </div>
              </AnimatedSection>
            </div>

            <SideContactCta
              locale={locale === "de" ? "de" : "en"}
              title={contactCtaTitle}
              description={contactCtaDescription}
              buttonLabel={contactCtaButton}
            />
          </div>
        </div>
      </section>
    </>
  );
}
