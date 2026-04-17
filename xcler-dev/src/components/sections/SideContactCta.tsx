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
      <aside className="xl:hidden mb-8 rounded-2xl border border-terracotta/25 bg-gradient-to-br from-terracotta/10 via-white to-stone/5 p-5 shadow-[0_18px_45px_-35px_rgba(184,92,56,0.55)] dark:from-terracotta/15 dark:via-richblack/35 dark:to-richblack/20">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-richblack/45 dark:text-cream/45">
          {locale === "de" ? "Schnellkontakt" : "Quick Contact"}
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight text-richblack dark:text-cream">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-richblack/65 dark:text-cream/65">{description}</p>
        <Link
          href="/contact"
          locale={locale}
          aria-label={buttonLabel}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 font-heading text-sm font-medium text-white shadow-[0_12px_30px_-15px_rgba(184,92,56,0.75)] transition-all hover:-translate-y-0.5 hover:bg-terracotta-light"
        >
          {buttonLabel}
        </Link>
      </aside>

      <aside className="pointer-events-none fixed left-4 top-1/2 z-40 hidden w-[280px] -translate-y-1/2 xl:block 2xl:left-8" aria-label={locale === "de" ? "Kontaktbox" : "Contact box"}>
        <div className="pointer-events-auto relative overflow-hidden rounded-3xl border border-terracotta/30 bg-gradient-to-br from-white via-white/95 to-terracotta/10 p-6 shadow-[0_26px_65px_-40px_rgba(184,92,56,0.65)] backdrop-blur-sm dark:from-richblack/65 dark:via-richblack/55 dark:to-richblack/45">
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-terracotta/20 blur-2xl" aria-hidden="true" />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.24em] text-richblack/45 dark:text-cream/45">
            {locale === "de" ? "Projektanfrage" : "Project Inquiry"}
          </p>
          <h2 className="relative mt-3 font-heading text-2xl font-semibold leading-tight text-richblack dark:text-cream">{title}</h2>
          <p className="relative mt-3 text-sm leading-relaxed text-richblack/65 dark:text-cream/65">{description}</p>
          <Link
            href="/contact"
            locale={locale}
            aria-label={buttonLabel}
            className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 font-heading text-sm font-medium text-white shadow-[0_12px_30px_-15px_rgba(184,92,56,0.75)] transition-all hover:-translate-y-0.5 hover:bg-terracotta-light"
          >
            {buttonLabel}
          </Link>
          <p className="relative mt-4 text-xs text-richblack/45 dark:text-cream/45">
            {locale === "de" ? "Antwort in der Regel innerhalb von 24 Stunden." : "Usually replies within 24 hours."}
          </p>
        </div>
      </aside>
    </>
  );
}
