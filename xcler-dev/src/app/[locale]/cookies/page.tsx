import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cookies" });

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
      canonical: `/${locale}/cookies`,
    },
  };
}

export default function CookiesPage() {
  const t = useTranslations("Cookies");

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
              <h2 className="mb-2 font-heading text-xl text-white">{t("whatAreCookiesTitle")}</h2>
              <p className="whitespace-pre-line">{t("whatAreCookiesBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("cookieTypesTitle")}</h2>
              <p className="whitespace-pre-line">{t("cookieTypesBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("consentTitle")}</h2>
              <p className="whitespace-pre-line">{t("consentBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("managementTitle")}</h2>
              <p className="whitespace-pre-line">{t("managementBody")}</p>
            </section>

            <section>
              <h2 className="mb-2 font-heading text-xl text-white">{t("updatesTitle")}</h2>
              <p className="whitespace-pre-line">{t("updatesBody")}</p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
