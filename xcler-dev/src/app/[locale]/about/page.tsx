import type { Metadata } from "next";
import { useTranslations } from "next-intl";
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
    title: "Über Uns | XCLER AI Automation",
    description: t("metaDescription"),
  };
}

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <main className="min-h-screen bg-[#121212] text-zinc-100">
      <section className="section-padding border-b border-zinc-800/90">
        <div className="container-custom max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-400">
              {t("eyebrow")}
            </span>

            <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-white md:text-6xl">
              {t("heroTitleLine1")}
              <br />
              <span className="text-zinc-400">{t("heroTitleLine2")}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {t("mission")}
            </p>

            <div className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-zinc-800/90">
        <div className="container-custom">
          <Team />
        </div>
      </section>
    </main>
  );
}
