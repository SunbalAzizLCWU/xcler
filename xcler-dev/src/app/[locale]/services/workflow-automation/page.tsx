import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoAnswerBlock } from "@/components/seo/SeoAnswerBlock";
import { getServiceSchema } from "@/lib/structuredData";
import { buildPageLinkedDataGraph } from "@/lib/pageLinkedData";
import { buildPageMetadata } from "@/lib/seoMeta";

type FeatureItem = { title: string; description: string };
type HeroContent = { h1: string; h2: string; paragraph: string };
type ExtraSection = { id: string; heading: string; body: string };
type FaqItem = { question: string; answer: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceWorkflowAutomationPage" });
  return buildPageMetadata({
    locale,
    path: "/services/workflow-automation",
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "workflow automation Germany",
      "n8n Make.com Zapier",
      "Workflow Automatisierung Agentur",
      "Make n8n automation",
      "workflow automation Netherlands Amsterdam",
      "Automatisierung Niederlande",
    ],
  });
}

export default async function WorkflowAutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locale === "en" ? "en" : "de";
  const t = await getTranslations({ locale, namespace: "ServiceWorkflowAutomationPage" });

  const getRaw = <T,>(key: string, fallback: T): T => {
    try {
      return t.raw(key) as T;
    } catch {
      return fallback;
    }
  };

  const hero = getRaw<HeroContent>("hero", {
    h1: t("metaTitle"),
    h2: t("intro"),
    paragraph: t("intro"),
  });
  const lede = getRaw<string>("seoLede", hero.paragraph);
  const citablePassage = getRaw<string>("citablePassage", hero.paragraph);
  const answerHeading = getRaw<string>(
    "answerHeading",
    resolvedLocale === "de" ? "Wie setzen wir Workflow-Automatisierung um?" : "How do we implement workflow automation?"
  );
  const listTitle = getRaw<string>("listTitle", "AI engineering");
  const listItems = getRaw<string[]>("listItems", []);
  const coreFeatures = getRaw<FeatureItem[]>("coreFeatures", []);
  const extras = getRaw<ExtraSection[]>("extraSections", []);
  const aeoFaq = getRaw<FaqItem[]>("aeoFaq", []);
  const architectureHighlight = (() => {
    try {
      return t("architectureHighlight");
    } catch {
      return "";
    }
  })();

  const service = getServiceSchema({
    locale: resolvedLocale,
    path: "/services/workflow-automation",
    name: hero.h1,
    description: t("metaDescription"),
  });
  const { "@context": _ctx, ...serviceNode } = service as Record<string, unknown> & {
    "@context"?: string;
  };
  void _ctx;
  const pageGraph = buildPageLinkedDataGraph({
    locale: resolvedLocale,
    path: "/services/workflow-automation",
    name: hero.h1,
    description: t("metaDescription"),
    breadcrumbs: [
      { name: "XCLER", path: "/" },
      { name: resolvedLocale === "de" ? "Leistungen" : "Services", path: "/services" },
      { name: hero.h1, path: "/services/workflow-automation" },
    ],
    entities: [serviceNode],
  });

  return (
    <>
      <JsonLd id={`page-graph-wf-${locale}`} data={pageGraph} />

      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cream/45">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-sage">
                    XCLER
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/services" className="hover:text-sage">
                    {resolvedLocale === "de" ? "Leistungen" : "Services"}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-cream/70">{hero.h1}</li>
              </ol>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  {hero.h1}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-cream/70">{lede}</p>
                <div className="mt-4 max-w-3xl text-xl leading-relaxed text-sage">{hero.h2}</div>
              </div>
              <div className="overflow-hidden border border-cream/10 bg-charcoal/50">
                <Image
                  src="/services/workflow-automation.webp"
                  alt={`${hero.h1} — XCLER workflow automation Make n8n service visual`}
                  width={1200}
                  height={675}
                  priority
                  fetchPriority="high"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>

          <SeoAnswerBlock
            headingId="wf-answer"
            heading={answerHeading}
            lede={lede}
            citablePassage={citablePassage}
            listTitle={listTitle}
            listItems={listItems}
            tableCaption={resolvedLocale === "de" ? "Leistungsumfang" : "Delivery scope"}
            tableRows={[
              {
                label: resolvedLocale === "de" ? "Fokus" : "Focus",
                value: "Make.com, n8n, Zapier",
              },
              {
                label: resolvedLocale === "de" ? "Regionen" : "Regions",
                value:
                  resolvedLocale === "de"
                    ? "Deutschland, DACH, Niederlande, Belgien, Kalifornien, Florida, Chicago"
                    : "Germany, DACH, Netherlands, Belgium, California, Florida, Chicago",
              },
              {
                label: resolvedLocale === "de" ? "Stack" : "Stack",
                value: "Make.com, n8n, Zapier, GoHighLevel",
              },
            ]}
            numericClaims={
              resolvedLocale === "de"
                ? [
                    "50+ Projekte mit KI- und Automationsanteilen.",
                    "3+ Jahre Delivery in DACH.",
                    "24 Stunden Ziel-Response in Discovery.",
                    "98 Prozent der Launches mit Monitoring-Hooks.",
                    "6 Branchen mit produktiven Assistenten.",
                  ]
                : [
                    "50+ projects with AI and automation scope.",
                    "3+ years shipping in DACH.",
                    "24 hours target response in discovery.",
                    "98 percent of launches include monitoring hooks.",
                    "6 industries running production assistants.",
                  ]
            }
            citationQuote={
              resolvedLocale === "de"
                ? "n8n ist eine Workflow-Automatisierungsplattform, mit der Sie Apps verbinden und Prozesse visuell automatisieren können."
                : "n8n is a workflow automation platform that lets you connect apps and automate processes with a visual editor."
            }
            citationHref="https://docs.n8n.io/"
            citationLabel="n8n documentation"
          />

          {coreFeatures.length > 0 ? (
            <AnimatedSection>
              <div className="mt-20">
                <h2 id="wf-core-features" className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  {resolvedLocale === "de" ? "Kernfunktionen" : "Core features"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coreFeatures.map((item, index) => (
                    <div
                      key={item.title}
                      className="panel panel-hover p-7"
                    >
                      <span className="font-mono text-xs text-sage">{String(index + 1).padStart(2, "0")}</span>
                      <h3 id={`wf-feature-${index}`} className="mt-3 font-heading text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-cream/65">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ) : null}

          {extras.map((section) => (
            <AnimatedSection key={section.id}>
              <div className="mt-16 max-w-4xl">
                <h2 id={section.id} className="font-heading text-3xl font-bold">
                  {section.heading}
                </h2>
                <p className="mt-4 leading-relaxed text-cream/70">{section.body}</p>
              </div>
            </AnimatedSection>
          ))}

          {architectureHighlight ? (
            <AnimatedSection>
              <div className="panel mt-20 p-8 md:p-10">
                <h2 id="wf-architecture" className="font-heading text-2xl font-semibold md:text-3xl">
                  {resolvedLocale === "de" ? "Technische Architektur" : "Technical architecture"}
                </h2>
                <p className="mt-4 leading-relaxed text-cream/75">{architectureHighlight}</p>
                <p className="mt-6 text-sm text-cream/55">
                  {resolvedLocale === "de" ? (
                    <>
                      Verwandte Leistung:{" "}
                      <Link href="/services/ai-chatbots-agents" className="text-sage underline-offset-2 hover:underline">
                        KI-Chatbots und Agenten Deutschland
                      </Link>
                    </>
                  ) : (
                    <>
                      Related service:{" "}
                      <Link href="/services/ai-chatbots-agents" className="text-sage underline-offset-2 hover:underline">
                        AI chatbots and agents Germany
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </AnimatedSection>
          ) : null}

          {aeoFaq.length > 0 ? (
            <AnimatedSection>
              <div className="mt-20">
                <h2 id="wf-faq" className="font-heading text-3xl md:text-4xl font-semibold mb-8">
                  FAQ
                </h2>
                <div className="space-y-6">
                  {aeoFaq.map((item) => (
                    <div key={item.question} className="panel p-6">
                      <h3 className="font-heading text-xl font-semibold">{item.question}</h3>
                      <p className="mt-3 leading-relaxed text-cream/65">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ) : null}

          <AnimatedSection>
            <div className="mt-20 border border-cream/10 bg-gradient-to-br from-charcoal to-richblack p-10 text-center">
              <h2 id="wf-cta" className="font-heading text-3xl font-bold">
                {t("ctaHeading")}
              </h2>
              <p className="mt-3 text-cream/60">{t("ctaDescription")}</p>
              <Link
                href="/contact"
                className="btn-signal mt-8"
              >
                {t("ctaButton")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
