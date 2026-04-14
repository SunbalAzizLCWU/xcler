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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return (
    <>
      <section className="section-padding pt-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-richblack/40 dark:text-cream/40">
                {t("eyebrow")}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t("heroTitleLine1")}
              <br />
              <span className="text-terracotta">{t("heroTitleLine2")}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-richblack/50 dark:text-cream/50">
              {t("mission")}
            </p>
          </div>
        </div>
      </section>

      <Team />
    </>
  );
}
