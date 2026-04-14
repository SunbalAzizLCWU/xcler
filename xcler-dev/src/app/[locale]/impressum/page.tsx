import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Impressum | XCLER",
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: `/${locale}/impressum`,
    },
  };
}

export default function ImpressumPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-custom max-w-3xl">
        <header className="mb-10 border-b border-stone/20 dark:border-stone-dark/30 pb-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-richblack/40 dark:text-cream/50">
              Rechtliches
            </span>
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Impressum</h1>
          <p className="mt-4 text-base leading-relaxed text-richblack/60 dark:text-cream/80">
            Anbieterkennzeichnung und Pflichtangaben gemaess deutschem Recht.
          </p>
        </header>

        <article className="space-y-8 text-sm leading-7 text-richblack/80 dark:text-cream/85 md:text-base">
          <section>
            <h2 className="mb-2 font-heading text-xl text-richblack dark:text-white">Anbieter</h2>
            <p className="whitespace-pre-line">
              Abeel Mehr{"\n"}
              Xcler.dev{"\n"}
              Rudower Strasse 43{"\n"}
              Hosten, Rheinland-Pfalz{"\n"}
              54664 Hosten
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl text-richblack dark:text-white">Kontakt</h2>
            <p className="whitespace-pre-line">
              Telefon: +923154823517{"\n"}
              Telefax: 833-415-1101{"\n"}
              E-Mail: engrahmedrehan@gmail.com
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl text-richblack dark:text-white">Postadresse</h2>
            <p>106L, Shadman 1, Lahore, Pakistan 54000</p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl text-richblack dark:text-white">
              Berufsbezeichnung und berufsrechtliche Regelungen
            </h2>
            <p className="whitespace-pre-line">
              Berufsbezeichnung:{"\n"}
              Software Engineer
            </p>
            <p className="mt-3 whitespace-pre-line">
              Zustaendige Kammer:{"\n"}
              106L, Shadman 1, Lahore
            </p>
            <p className="mt-3 whitespace-pre-line">
              Verliehen in:{"\n"}
              Pakistan
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl text-richblack dark:text-white">Redaktionell verantwortlich</h2>
            <p>Abeel Mehr</p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl text-richblack dark:text-white">
              Verbraucherstreitbeilegung/Universalschlichtungsstelle
            </h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="border-t border-stone/20 dark:border-stone-dark/30 pt-6 text-richblack/60 dark:text-cream/70">
            <p>
              Quelle:{" "}
              <a
                href="https://www.e-recht24.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta underline underline-offset-2"
              >
                e-recht24.de
              </a>
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
