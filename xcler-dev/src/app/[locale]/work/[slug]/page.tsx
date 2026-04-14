import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";

type RouteParams = {
  locale: "en" | "de";
  slug: string;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: locale === "de" ? "Fallstudie nicht gefunden | XCLER" : "Case Study Not Found | XCLER",
    };
  }

  const title = `${study.title[locale]} | XCLER`;
  const description = study.summary[locale];

  return {
    title,
    description,
    keywords: study.keywords[locale],
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: study.heroImage,
          alt: study.title[locale],
        },
      ],
    },
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const isGerman = locale === "de";

  const labels = {
    backToWork: isGerman ? "Alle Projekte" : "All Projects",
    challenge: isGerman ? "Ausgangslage" : "Challenge",
    solution: isGerman ? "Loesung" : "Solution",
    stack: isGerman ? "Technologie und Architektur" : "Tech Stack and Architecture",
    phases: isGerman ? "Engineering-Phasen" : "Engineering Phases",
    debug: isGerman ? "System-Debugging Highlights" : "Debugging Highlights",
    roadmap: isGerman ? "Roadmap" : "Roadmap",
    relatedServices: isGerman ? "Passende Leistungen" : "Related Services",
    cta: isGerman ? "Projekt mit uns starten" : "Start Your Project With Us",
    ctaButton: isGerman ? "Kontakt aufnehmen" : "Contact Us",
    soon: isGerman
      ? "Die vollstaendige Fallstudie wird aktuell aufbereitet."
      : "The full case study content is currently being prepared.",
  };

  return (
    <section className="section-padding pt-32">
      <article className="container-custom max-w-5xl">
        <Link
          href="/work"
          className="mb-8 inline-flex items-center gap-2 text-sm text-richblack/50 transition-colors hover:text-terracotta"
        >
          <span aria-hidden="true">←</span>
          <span>{labels.backToWork}</span>
        </Link>

        <div className="overflow-hidden rounded-2xl border border-stone/15 bg-white">
          <div className="relative h-[280px] w-full md:h-[380px]">
            <Image src={study.heroImage} alt={study.title[locale]} fill className="object-cover" priority />
          </div>
        </div>

        <header className="mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta">{study.category[locale]}</p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">{study.title[locale]}</h1>
          <p className="mt-4 text-lg text-richblack/70">{study.subtitle[locale]}</p>
          <p className="mt-6 max-w-3xl text-richblack/65">{study.summary[locale]}</p>
        </header>

        {study.comingSoon ? (
          <div className="mt-10 rounded-2xl border border-dashed border-stone/30 bg-stone/5 p-6 text-richblack/70">
            {labels.soon}
          </div>
        ) : (
          <>
            <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-stone/15 bg-white p-6">
                <h2 className="font-heading text-2xl font-semibold">{labels.challenge}</h2>
                <p className="mt-3 text-richblack/70">{study.challenge[locale]}</p>
              </div>
              <div className="rounded-2xl border border-stone/15 bg-white p-6">
                <h2 className="font-heading text-2xl font-semibold">{labels.solution}</h2>
                <p className="mt-3 text-richblack/70">{study.solution[locale]}</p>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-heading text-3xl font-bold">{labels.stack}</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                {study.techStack.map((group) => (
                  <div key={group.label.en} className="rounded-2xl border border-stone/15 bg-white p-5">
                    <h3 className="font-heading text-xl font-semibold">{group.label[locale]}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-richblack/70">
                      {group.items.map((item) => (
                        <li key={item.en}>• {item[locale]}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-heading text-3xl font-bold">{labels.phases}</h2>
              <div className="mt-6 space-y-4">
                {study.phases.map((phase) => (
                  <div key={phase.title.en} className="rounded-2xl border border-stone/15 bg-white p-6">
                    <h3 className="font-heading text-xl font-semibold text-terracotta">{phase.title[locale]}</h3>
                    <p className="mt-2 text-richblack/70">{phase.description[locale]}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-stone/15 bg-white p-6">
                <h2 className="font-heading text-2xl font-semibold">{labels.debug}</h2>
                <ul className="mt-3 space-y-2 text-richblack/70">
                  {study.debuggingHighlights.map((item) => (
                    <li key={item.en}>• {item[locale]}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-stone/15 bg-white p-6">
                <h2 className="font-heading text-2xl font-semibold">{labels.roadmap}</h2>
                <ul className="mt-3 space-y-2 text-richblack/70">
                  {study.roadmap.map((item) => (
                    <li key={item.en}>• {item[locale]}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-heading text-3xl font-bold">{labels.relatedServices}</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {study.relatedServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="rounded-2xl border border-stone/20 bg-white p-5 transition-colors hover:border-terracotta/40"
                  >
                    <h3 className="font-heading text-xl font-semibold">{service.title[locale]}</h3>
                    <p className="mt-2 text-sm text-richblack/65">{service.reason[locale]}</p>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        <section className="mt-14 rounded-2xl border border-terracotta/20 bg-terracotta/8 p-8 text-center">
          <h2 className="font-heading text-3xl font-bold">{labels.cta}</h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white transition-colors hover:bg-terracotta-light"
          >
            {labels.ctaButton}
          </Link>
        </section>
      </article>
    </section>
  );
}
