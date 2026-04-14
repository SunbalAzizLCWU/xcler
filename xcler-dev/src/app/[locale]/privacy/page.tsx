import type { Metadata } from "next";
import { getCanonicalPath } from "@/lib/canonical";

type Locale = "en" | "de";

const content = {
  en: {
    title: "Privacy Policy",
    eyebrow: "Legal",
    intro:
      "This Privacy Policy explains how XCLER collects, uses, stores, and protects personal data when you use our website and services.",
    sections: [
      {
        heading: "1. Data Controller",
        body: "XCLER\nEmail: hello@xcler.dev\nWebsite: https://xcler.dev"
      },
      {
        heading: "2. What Data We Process",
        body:
          "We may process the following categories of data: contact details (name, email, phone), project-related information you submit through forms, technical data (IP address, browser/device data), and analytics data used to improve performance and user experience."
      },
      {
        heading: "3. Why We Process Your Data",
        body:
          "We process personal data to respond to inquiries, provide requested services, improve website stability and security, analyze usage patterns, and fulfill legal obligations."
      },
      {
        heading: "4. Legal Basis (GDPR)",
        body:
          "Depending on context, processing is based on one or more legal grounds: consent (Art. 6(1)(a) GDPR), performance of a contract or pre-contractual steps (Art. 6(1)(b) GDPR), legal obligations (Art. 6(1)(c) GDPR), and legitimate interests (Art. 6(1)(f) GDPR)."
      },
      {
        heading: "5. Storage and Retention",
        body:
          "We keep personal data only as long as necessary for the purposes stated in this policy, contractual requirements, or legal retention obligations."
      },
      {
        heading: "6. Sharing with Third Parties",
        body:
          "We may use trusted processors (for hosting, analytics, communication, and infrastructure) under appropriate contractual safeguards. We do not sell personal data."
      },
      {
        heading: "7. Your Rights",
        body:
          "You may have rights to access, rectify, erase, restrict processing, object to processing, data portability, and withdraw consent where applicable. You may also lodge a complaint with a supervisory authority."
      },
      {
        heading: "8. Security",
        body:
          "We apply technical and organizational measures to protect personal data against unauthorized access, loss, misuse, and alteration."
      },
      {
        heading: "9. International Transfers",
        body:
          "If data is transferred outside your jurisdiction, we use suitable safeguards as required by applicable data protection laws."
      },
      {
        heading: "10. Contact",
        body:
          "For privacy-related questions or requests, contact us at hello@xcler.dev."
      }
    ],
    updated: "Last updated: April 14, 2026"
  },
  de: {
    title: "Datenschutzerklaerung",
    eyebrow: "Rechtliches",
    intro:
      "Diese Datenschutzerklaerung erklaert, wie XCLER personenbezogene Daten erhebt, verarbeitet, speichert und schuetzt, wenn Sie unsere Website und Leistungen nutzen.",
    sections: [
      {
        heading: "1. Verantwortliche Stelle",
        body: "XCLER\nE-Mail: hello@xcler.dev\nWebsite: https://xcler.dev"
      },
      {
        heading: "2. Welche Daten wir verarbeiten",
        body:
          "Wir koennen folgende Datenkategorien verarbeiten: Kontaktdaten (Name, E-Mail, Telefon), projektbezogene Informationen aus Formularen, technische Daten (IP-Adresse, Browser-/Geraetedaten) sowie Analysedaten zur Verbesserung von Performance und Nutzererlebnis."
      },
      {
        heading: "3. Zwecke der Verarbeitung",
        body:
          "Wir verarbeiten personenbezogene Daten, um Anfragen zu beantworten, angeforderte Leistungen bereitzustellen, Stabilitaet und Sicherheit der Website zu verbessern, Nutzungsverhalten zu analysieren und rechtliche Pflichten zu erfuellen."
      },
      {
        heading: "4. Rechtsgrundlagen (DSGVO)",
        body:
          "Je nach Kontext erfolgt die Verarbeitung auf einer oder mehreren Rechtsgrundlagen: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), Vertragserfuellung oder vorvertragliche Massnahmen (Art. 6 Abs. 1 lit. b DSGVO), rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO) sowie berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)."
      },
      {
        heading: "5. Speicherdauer",
        body:
          "Wir speichern personenbezogene Daten nur so lange, wie es fuer die genannten Zwecke, vertragliche Anforderungen oder gesetzliche Aufbewahrungspflichten erforderlich ist."
      },
      {
        heading: "6. Weitergabe an Dritte",
        body:
          "Wir setzen vertrauenswuerdige Auftragsverarbeiter ein (z. B. Hosting, Analytics, Kommunikation, Infrastruktur) unter geeigneten vertraglichen Schutzmassnahmen. Personenbezogene Daten werden nicht verkauft."
      },
      {
        heading: "7. Ihre Rechte",
        body:
          "Sie haben je nach Rechtslage Rechte auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung, Widerspruch, Datenuebertragbarkeit und Widerruf erteilter Einwilligungen. Zudem besteht ein Beschwerderecht bei einer Aufsichtsbehoerde."
      },
      {
        heading: "8. Datensicherheit",
        body:
          "Wir treffen technische und organisatorische Massnahmen, um personenbezogene Daten vor unbefugtem Zugriff, Verlust, Missbrauch und Veraenderung zu schuetzen."
      },
      {
        heading: "9. Internationale Datentransfers",
        body:
          "Sofern Daten ausserhalb Ihrer Rechtsordnung verarbeitet werden, setzen wir geeignete Garantien gemaess anwendbarem Datenschutzrecht ein."
      },
      {
        heading: "10. Kontakt",
        body:
          "Bei Fragen zum Datenschutz oder zur Ausuebung Ihrer Rechte schreiben Sie an hello@xcler.dev."
      }
    ],
    updated: "Stand: 14. April 2026"
  }
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locale === "en" ? "en" : "de";
  const data = content[safeLocale];

  return {
    title: `${data.title} | XCLER`,
    description: data.intro,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: getCanonicalPath(safeLocale, "/privacy"),
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "en" ? "en" : "de";
  const data = content[safeLocale];

  return (
    <section className="section-padding pt-32">
      <div className="container-custom max-w-3xl">
        <header className="mb-10 border-b border-stone/20 pb-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-richblack/40">
              {data.eyebrow}
            </span>
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">{data.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-richblack/65">{data.intro}</p>
        </header>

        <article className="space-y-8 text-sm leading-7 text-richblack/80 md:text-base">
          {data.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-2 font-heading text-xl text-richblack">{section.heading}</h2>
              <p className="whitespace-pre-line">{section.body}</p>
            </section>
          ))}

          <section className="border-t border-stone/20 pt-6 text-richblack/60">
            <p>{data.updated}</p>
          </section>
        </article>
      </div>
    </section>
  );
}
