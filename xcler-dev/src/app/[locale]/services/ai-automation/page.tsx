import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoAnswerBlock } from "@/components/seo/SeoAnswerBlock";
import { RelatedServices } from "@/components/seo/RelatedServices";
import { getServiceSchema, getFaqSchema } from "@/lib/structuredData";
import { buildPageLinkedDataGraph } from "@/lib/pageLinkedData";
import { buildPageMetadata } from "@/lib/seoMeta";

type FeatureItem = { title: string; description: string };
type HeroContent = { h1: string; h2: string; paragraph: string };
type FaqItem = { question: string; answer: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceAiAutomationPage" });
  return buildPageMetadata({
    locale,
    path: "/services/ai-automation",
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "KI Automatisierung",
      "KI Automatisierungsagentur",
      "KI Automatisierung Agentur",
      "AI automation agency",
      "AI automation agency Germany",
      "KI Agentur Berlin",
    ],
  });
}

export default async function AIAutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locale === "en" ? "en" : "de";
  const t = await getTranslations({ locale, namespace: "ServiceAiAutomationPage" });

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
    resolvedLocale === "de"
      ? "Was liefert eine KI-Automatisierungsagentur?"
      : "What does an AI automation agency deliver?"
  );
  const listTitle = getRaw<string>("listTitle", "AI automation");
  const listItems = getRaw<string[]>("listItems", []);
  const coreFeatures = getRaw<FeatureItem[]>("coreFeatures", []);
  const aeoFaq = getRaw<FaqItem[]>("aeoFaq", []);

  const service = getServiceSchema({
    locale: resolvedLocale,
    path: "/services/ai-automation",
    name: hero.h1,
    description: t("metaDescription"),
  });
  const faq = aeoFaq.length
    ? getFaqSchema(resolvedLocale, aeoFaq, "/services/ai-automation")
    : null;

  const stripContext = (node: Record<string, unknown>) => {
    const { "@context": _c, ...rest } = node;
    void _c;
    return rest;
  };

  const entities = [stripContext(service as Record<string, unknown>)];
  if (faq) entities.push(stripContext(faq as Record<string, unknown>));

  const pageGraph = buildPageLinkedDataGraph({
    locale: resolvedLocale,
    path: "/services/ai-automation",
    name: hero.h1,
    description: t("metaDescription"),
    breadcrumbs: [
      { name: "XCLER", path: "/" },
      { name: resolvedLocale === "de" ? "Leistungen" : "Services", path: "/services" },
      { name: hero.h1, path: "/services/ai-automation" },
    ],
    entities,
  });

  return (
    <>
      <JsonLd id={`page-graph-ai-automation-${locale}`} data={pageGraph} />

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
            <div className="flex items-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-cream/40 uppercase">
                {t("serviceLabel")}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl">
              {hero.h1}
            </h1>
            <p className="mt-4 text-xl text-cream/70 max-w-3xl">{hero.h2}</p>
            <p className="mt-6 text-lg text-cream/55 max-w-3xl leading-relaxed">
              {hero.paragraph}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-signal">
                {t("ctaButton")}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/ai-chatbots-agents"
                className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-sage"
              >
                {resolvedLocale === "de" ? "Zu KI-Chatbots & Agenten" : "To AI chatbots & agents"}
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="mt-16 max-w-3xl">
              <p className="leading-relaxed text-cream/70">{lede}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="mt-16">
              <SeoAnswerBlock
                headingId="ai-automation-answer"
                heading={answerHeading}
                lede={lede}
                citablePassage={citablePassage}
                listTitle={listTitle}
                listItems={listItems}
              />
            </div>
          </AnimatedSection>

          {coreFeatures.length > 0 ? (
            <AnimatedSection>
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreFeatures.map((feature) => (
                  <div key={feature.title} className="panel p-6">
                    <h2 className="font-heading text-xl font-semibold">{feature.title}</h2>
                    <p className="mt-3 leading-relaxed text-cream/65">{feature.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ) : null}

          {aeoFaq.length > 0 ? (
            <AnimatedSection>
              <div className="mt-20">
                <h2 id="ai-automation-faq" className="font-heading text-3xl md:text-4xl font-semibold mb-8">
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
              <h2 className="font-heading text-3xl font-bold">{t("ctaHeading")}</h2>
              <p className="mt-3 text-cream/60">{t("ctaDescription")}</p>
              <Link href="/contact" className="btn-signal mt-8">
                {t("ctaButton")}
                <span aria-hidden="true">→</span>
              </Link>
              <RelatedServices
                locale={resolvedLocale}
                items={[
                  {
                    href: "/services/ai-chatbots-agents",
                    label:
                      resolvedLocale === "de"
                        ? "KI-Chatbot-Agentur"
                        : "AI chatbot agency",
                  },
                  {
                    href: "/services/workflow-automation",
                    label:
                      resolvedLocale === "de"
                        ? "n8n- & Make.com-Agentur"
                        : "n8n & Make.com agency",
                  },
                  {
                    href: "/services/web-development",
                    label:
                      resolvedLocale === "de"
                        ? "Webentwicklung-Agentur"
                        : "Web development agency",
                  },
                ]}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
