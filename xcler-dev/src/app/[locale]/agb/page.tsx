import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AGB" });

  return {
    title: t("metaTitle"),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    alternates: {
      canonical: `/${locale}/agb`,
    },
  };
}

export default function AgbPage() {
  const t = useTranslations("AGB");

  return (
    <main className="min-h-screen bg-richblack text-cream">
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <header className="mb-10 border-b border-stone-dark/30 pb-6">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cream/50">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              {t("intro")}
            </p>
          </header>

          <article className="space-y-8 text-sm leading-7 text-cream/85 md:text-base">
            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("scopeTitle")}</h2>
              <p className="whitespace-pre-line">{t("scopeBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("servicesTitle")}</h2>
              <p className="whitespace-pre-line">{t("servicesBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("contractTitle")}</h2>
              <p className="whitespace-pre-line">{t("contractBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("paymentTitle")}</h2>
              <p className="whitespace-pre-line">{t("paymentBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("liabilityTitle")}</h2>
              <p className="whitespace-pre-line">{t("liabilityBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("finalTitle")}</h2>
              <p className="whitespace-pre-line">{t("finalBody")}</p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
