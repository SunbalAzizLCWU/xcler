import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/sections/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <main className="min-h-screen bg-richblack text-cream">
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <aside className="rounded-2xl border border-stone-dark/25 bg-richblack/60 p-6 md:p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="line-decoration" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/55">
                  {t("eyebrow")}
                </span>
              </div>

              <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
                {t("headingLine1")}
                <br />
                <span className="text-terracotta">{t("headingLine2")}</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80">
                {t("intro")}
              </p>

              <div className="mt-8 space-y-6 text-sm md:text-base">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-cream/55">
                    {t("emailLabel")}
                  </p>
                  <a
                    href="mailto:hello@xcler.dev"
                    className="mt-1 inline-block font-medium text-white hover:text-terracotta transition-colors"
                  >
                    hello@xcler.dev
                  </a>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-cream/55">
                    {t("hoursLabel")}
                  </p>
                  <p className="mt-1 font-medium text-white">{t("hoursValue")}</p>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-cream/55">
                    {t("addressLabel")}
                  </p>
                  <p className="mt-1 whitespace-pre-line font-medium text-white">
                    {t("addressValue")}
                  </p>
                </div>
              </div>

              <p className="mt-8 text-sm text-cream/75">{t("responseTime")}</p>
            </aside>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}