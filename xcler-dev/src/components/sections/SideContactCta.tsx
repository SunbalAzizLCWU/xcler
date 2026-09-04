import { Link } from "@/navigation";

type Locale = "en" | "de";

type SideContactCtaProps = {
  locale: Locale;
  title: string;
  description: string;
  buttonLabel: string;
};

export function SideContactCta({ locale, title, description, buttonLabel }: SideContactCtaProps) {
  return (
    <>
      <aside className="mb-8 border border-sage/25 bg-gradient-to-br from-sage/10 via-charcoal to-terracotta/10 p-5 xl:hidden">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/45">
          {locale === "de" ? "Schnellkontakt" : "Quick Contact"}
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight text-cream">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/65">{description}</p>
        <Link
          href="/contact"
          locale={locale}
          aria-label={buttonLabel}
          className="btn-signal mt-5 px-5 py-2.5 text-sm"
        >
          {buttonLabel}
        </Link>
      </aside>

      <aside className="hidden xl:block xl:self-start" aria-label={locale === "de" ? "Kontaktbox" : "Contact box"}>
        <div className="panel relative overflow-hidden p-6">
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sage/20 blur-2xl" aria-hidden="true" />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.24em] text-cream/45">
            {locale === "de" ? "Projektanfrage" : "Project Inquiry"}
          </p>
          <h2 className="relative mt-3 font-heading text-2xl font-semibold leading-tight text-cream">{title}</h2>
          <p className="relative mt-3 text-sm leading-relaxed text-cream/65">{description}</p>
          <Link
            href="/contact"
            locale={locale}
            aria-label={buttonLabel}
            className="btn-signal relative mt-5 px-5 py-2.5 text-sm"
          >
            {buttonLabel}
          </Link>
          <p className="relative mt-4 text-xs text-cream/45">
            {locale === "de" ? "Antwort in der Regel innerhalb von 24 Stunden." : "Usually replies within 24 hours."}
          </p>
        </div>
      </aside>
    </>
  );
}
