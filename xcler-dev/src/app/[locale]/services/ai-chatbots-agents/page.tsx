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
  const t = await getTranslations({ locale, namespace: "ServiceAiChatbotsPage" });
  return buildPageMetadata({
    locale,
    path: "/services/ai-chatbots-agents",
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "AI chatbots Germany",
      "AI agents RAG",
      "KI Chatbots Agentur",
      "AI engineering",
      "AI chatbots Netherlands Amsterdam",
      "KI-Chatbots Niederlande",
    ],
  });
}

export default async function AIChatbotsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locale === "en" ? "en" : "de";
  const t = await getTranslations({ locale, namespace: "ServiceAiChatbotsPage" });

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
    resolvedLocale === "de" ? "Wie bauen wir KI-Chatbots und Agenten?" : "How do we build AI chatbots and agents?"
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
    path: "/services/ai-chatbots-agents",
    name: hero.h1,
    description: t("metaDescription"),
  });
  const { "@context": _ctx, ...serviceNode } = service as Record<string, unknown> & {
    "@context"?: string;
  };
  void _ctx;
  const pageGraph = buildPageLinkedDataGraph({
    locale: resolvedLocale,
    path: "/services/ai-chatbots-agents",
    name: hero.h1,
    description: t("metaDescription"),
    breadcrumbs: [
      { name: "XCLER", path: "/" },
      { name: resolvedLocale === "de" ? "Leistungen" : "Services", path: "/services" },
      { name: hero.h1, path: "/services/ai-chatbots-agents" },
    ],
    entities: [serviceNode],
  });

  return (
    <>
      <JsonLd id={`page-graph-ai-${locale}`} data={pageGraph} />

      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-richblack/45 dark:text-cream/45">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-terracotta">
                    XCLER
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/services" className="hover:text-terracotta">
                    {resolvedLocale === "de" ? "Leistungen" : "Services"}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-richblack/70 dark:text-cream/70">{hero.h1}</li>
              </ol>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                  {hero.h1}
                </h1>
                <p className="mt-6 text-lg text-richblack/70 dark:text-cream/70 max-w-3xl leading-relaxed">{lede}</p>
                <div className="mt-4 text-xl text-terracotta max-w-3xl leading-relaxed">{hero.h2}</div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-stone/15 bg-stone/10">
                <Image
                  src="/og-image.webp"
                  alt={hero.h1}
                  width={1200}
                  height={630}
                  priority
                  fetchPriority="high"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>

          <SeoAnswerBlock
            headingId="ai-answer"
            heading={answerHeading}
            lede={lede}
            citablePassage={citablePassage}
            listTitle={listTitle}
            listItems={listItems}
            tableCaption={resolvedLocale === "de" ? "Leistungsumfang" : "Delivery scope"}
            tableRows={[
              {
                label: resolvedLocale === "de" ? "Fokus" : "Focus",
                value: resolvedLocale === "de" ? "KI-Chatbots, RAG, Agenten" : "AI chatbots, RAG, agents",
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
                value: "LLMs, RAG, Make.com, n8n, Next.js",
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
                ? "Retrieval-Augmented Generation verbindet Sprachmodelle mit externem Wissen, damit Antworten fundierter bleiben."
                : "Retrieval-augmented generation connects language models with external knowledge so answers stay grounded."
            }
            citationHref="https://docs.langchain.com/docs/concepts/rag/"
            citationLabel="LangChain RAG docs"
          />

          {coreFeatures.length > 0 ? (
            <AnimatedSection>
              <div className="mt-20">
                <h2 id="ai-core-features" className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  {resolvedLocale === "de" ? "Kernfunktionen" : "Core features"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coreFeatures.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-stone/15 bg-white/80 p-7 dark:border-stone-dark/20 dark:bg-richblack/30"
                    >
                      <span className="font-mono text-xs text-terracotta">{String(index + 1).padStart(2, "0")}</span>
                      <h3 id={`ai-feature-${index}`} className="mt-3 font-heading text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-richblack/65 dark:text-cream/65 leading-relaxed">{item.description}</p>
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
                <p className="mt-4 text-richblack/70 dark:text-cream/70 leading-relaxed">{section.body}</p>
              </div>
            </AnimatedSection>
          ))}

          {architectureHighlight ? (
            <AnimatedSection>
              <div className="mt-20 rounded-3xl bg-richblack p-8 md:p-10 text-cream">
                <h2 id="ai-architecture" className="font-heading text-2xl md:text-3xl font-semibold">
                  {resolvedLocale === "de" ? "Technische Architektur" : "Technical architecture"}
                </h2>
                <p className="mt-4 text-cream/75 leading-relaxed">{architectureHighlight}</p>
                <p className="mt-6 text-sm text-cream/55">
                  {resolvedLocale === "de" ? (
                    <>
                      Verwandte Leistung:{" "}
                      <Link href="/services/workflow-automation" className="text-terracotta underline-offset-2 hover:underline">
                        Workflow-Automatisierung Make n8n Deutschland
                      </Link>
                    </>
                  ) : (
                    <>
                      Related service:{" "}
                      <Link href="/services/workflow-automation" className="text-terracotta underline-offset-2 hover:underline">
                        Workflow automation Make n8n Germany
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
                <h2 id="ai-faq" className="font-heading text-3xl md:text-4xl font-semibold mb-8">
                  FAQ
                </h2>
                <div className="space-y-6">
                  {aeoFaq.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-stone/12 p-6 dark:border-stone-dark/20">
                      <h3 className="font-heading text-xl font-semibold">{item.question}</h3>
                      <p className="mt-3 text-richblack/65 dark:text-cream/65 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ) : null}

          <AnimatedSection>
            <div className="mt-20 rounded-2xl bg-richblack p-10 text-center text-cream">
              <h2 id="ai-cta" className="font-heading text-3xl font-bold">
                {t("ctaHeading")}
              </h2>
              <p className="mt-3 text-cream/60">{t("ctaDescription")}</p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light"
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
