import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Team } from "@/components/sections/Team";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  return (
    <main className="min-h-screen bg-richblack text-cream">
      <section className="section-padding border-b border-stone-dark/20">
        <div className="container-custom max-w-5xl">
          <div className="mb-4 flex items-center gap-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/55">
              {t("eyebrow")}
            </span>
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-6xl">
            {t("heroTitleLine1")}
            <br />
            <span className="text-terracotta">{t("heroTitleLine2")}</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-cream/80 md:text-lg">
            {t("mission")}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            {t("valuesHeading")}
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-stone-dark/25 bg-richblack/60 p-6">
              <p className="font-heading text-2xl text-terracotta">{t("values.efficiency.title")}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/80 md:text-base">
                {t("values.efficiency.description")}
              </p>
            </article>

            <article className="rounded-2xl border border-stone-dark/25 bg-richblack/60 p-6">
              <p className="font-heading text-2xl text-terracotta">{t("values.precision.title")}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/80 md:text-base">
                {t("values.precision.description")}
              </p>
            </article>

            <article className="rounded-2xl border border-stone-dark/25 bg-richblack/60 p-6">
              <p className="font-heading text-2xl text-terracotta">{t("values.scalability.title")}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/80 md:text-base">
                {t("values.scalability.description")}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-stone-dark/20">
        <div className="container-custom">
          <Team />
        </div>
      </section>
    </main>
  );
}
