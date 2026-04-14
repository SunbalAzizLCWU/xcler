import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/lib/structuredData";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";

  return {
    title: isGerman
      ? "KI Chatbot Agentur Deutschland | KI Kundenservice automatisieren | XCLER"
      : "AI Chatbot Agency Germany | Automated Customer Support | XCLER",
    description: isGerman
      ? "Als KI Chatbot Agentur Deutschland automatisieren wir Ihren Kundenservice mit intelligenten Chatbots, RAG-Architektur und messbarem ROI fuer Unternehmen in Deutschland."
      : "As an AI chatbot agency for Germany, we automate customer support with intelligent chatbots, RAG architecture, and measurable ROI.",
    keywords: isGerman
      ? [
          "KI Chatbot Agentur Deutschland",
          "Kundenservice automatisieren",
          "RAG Agenten",
          "KI Chatbot fuer Unternehmen",
          "Chatbot Entwicklung Deutschland",
        ]
      : [
          "AI chatbot agency Germany",
          "automated customer support",
          "RAG agents",
          "AI chatbot development",
          "chatbot development Germany",
        ],
    alternates: {
      canonical: getCanonicalPath(locale, "/services/ki-chatbots"),
      languages: getLanguageAlternates("/services/ki-chatbots"),
    },
  };
}

export default async function KIChatbotsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const schema = getServiceSchema({
    locale: locale === "en" ? "en" : "de",
    slug: "ki-chatbots",
    name: locale === "de" ? "KI Chatbot Agentur Deutschland" : "AI Chatbot Agency Germany",
    description:
      locale === "de"
        ? "KI-gestuetzte Chatbot-Entwicklung fuer Kundenservice, Lead-Qualifizierung und automatisierte Supportprozesse in Deutschland."
        : "AI chatbot development for customer support, lead qualification, and automated service operations in Germany.",
  });

  return (
    <>
      <JsonLd id={`service-ki-chatbots-${locale}`} data={schema} />
      <section className="section-padding pt-32">
        <div className="container-custom">
        <AnimatedSection>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-richblack/50 dark:text-cream/70 hover:text-terracotta transition-colors mb-8"
          >
            ← Alle Services
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-richblack/50 dark:text-cream/70 uppercase">
              Service / KI Chatbots
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-richblack dark:text-cream">
            KI Chatbot Agentur Deutschland:
            <br />
            <span className="text-terracotta">Kundenservice automatisieren.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-richblack/80 dark:text-cream/85">
            Wir entwickeln KI-Chatbots, die Anfragen sofort beantworten, Leads
            qualifizieren und Support-Prozesse rund um die Uhr entlasten. Als
            spezialisierte KI Chatbot Agentur Deutschland bauen wir Systeme,
            die nicht nur beeindrucken, sondern im Alltag messbar Leistung
            bringen.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-stone/15 dark:border-stone-dark/30 bg-white dark:bg-richblack/30 p-7">
              <h2 className="font-heading text-2xl font-bold text-richblack dark:text-cream">
                Tech Stack
              </h2>
              <p className="mt-3 text-richblack/75 dark:text-cream/80 leading-relaxed">
                Unsere Implementierung kombiniert moderne Frontend- und
                KI-Architekturen fuer Stabilitaet, Geschwindigkeit und
                Skalierbarkeit.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {[
                  "Next.js",
                  "Python",
                  "RAG Agents",
                  "Vector Search",
                  "API Integrationen",
                  "Workflow Automation",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-stone/25 dark:border-stone-dark/35 px-3 py-1.5 font-mono text-xs text-richblack dark:text-cream"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border border-sage/20 dark:border-sage/30 bg-sage/5 dark:bg-sage-dark/10 p-7">
              <h2 className="font-heading text-2xl font-bold text-richblack dark:text-cream">
                ROI
              </h2>
              <p className="mt-3 text-richblack/80 dark:text-cream/85 leading-relaxed">
                Ein KI-gestuetzter Kundenservice spart Kosten pro Ticket,
                reduziert Reaktionszeiten und entlastet Ihr Team bei
                wiederkehrenden Aufgaben. Das Ergebnis: mehr Fokus auf
                wertschoepfende Arbeit, mehr Abschluesse und weniger manuelle
                Routine.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-richblack/80 dark:text-cream/85">
                <li>- Bis zu 24/7 Erreichbarkeit ohne zusaetzliche Schichten</li>
                <li>- Schnellere Qualifizierung eingehender Leads</li>
                <li>- Reduzierter Support-Aufwand und geringere Prozesskosten</li>
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-14 rounded-2xl bg-richblack text-cream p-10 text-center">
            <h3 className="font-heading text-3xl font-bold">
              Bereit, Ihren Support zu automatisieren?
            </h3>
            <p className="mt-3 max-w-2xl mx-auto text-cream/75">
              Wir zeigen Ihnen in einem kurzen Strategie-Call, wie ein
              KI-Chatbot in Ihre bestehenden Prozesse integriert wird und ab wann
              sich die Investition wirtschaftlich rechnet.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
              >
                Strategie-Call buchen
              </Link>
              <a
                href="https://wa.me/923154823517"
                className="inline-flex items-center justify-center rounded-full border border-cream/25 px-8 py-3 font-heading font-medium text-cream hover:border-cream/50 transition-colors"
              >
                WhatsApp Kontakt
              </a>
            </div>
          </div>
        </AnimatedSection>
        </div>
      </section>
    </>
  );
}
