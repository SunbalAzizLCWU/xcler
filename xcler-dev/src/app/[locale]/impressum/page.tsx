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
    <main className="min-h-screen bg-richblack text-cream">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <article className="prose prose-invert prose-headings:font-heading prose-headings:text-white prose-p:text-cream/85 prose-li:text-cream/85 max-w-none">
          <h1>Impressum</h1>

          <p>
            Abeel Mehr
            <br />
            Xcler.dev
            <br />
            Rudower Strasse 43
            <br />
            Hosten, Rheinland-Pfalz
            <br />
            54664 Hosten
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: +923154823517
            <br />
            Telefax: 833-415-1101
            <br />
            E-Mail: engrahmedrehan@gmail.com
          </p>

          <h2>Postadresse</h2>
          <p>106L, Shadman 1, Lahore, Pakistan 54000</p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            Berufsbezeichnung:
            <br />
            Software Engineer
          </p>
          <p>
            Zustaendige Kammer:
            <br />
            106L, Shadman 1, Lahore
          </p>
          <p>
            Verliehen in:
            <br />
            Pakistan
          </p>

          <h2>Redaktionell verantwortlich</h2>
          <p>Abeel Mehr</p>

          <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <p>
            Quelle: {" "}
            <a
              href="https://www.e-recht24.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              e-recht24.de
            </a>
          </p>
        </article>
      </div>
    </main>
  );
}
