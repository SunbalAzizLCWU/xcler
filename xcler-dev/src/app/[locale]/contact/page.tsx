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
    title: "Kontakt | XCLER AI Automation",
    description: t("metaDescription"),
  };
}

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <main className="min-h-screen bg-[#121212] text-zinc-100">
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
              <div className="mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                  {t("eyebrow")}
                </span>
              </div>

              <h1 className="font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {t("headingLine1")}
                <br />
                <span className="text-zinc-400">{t("headingLine2")}</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">
                {t("intro")}
              </p>

              <div className="mt-8 space-y-6 text-sm md:text-base">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
                    {t("emailLabel")}
                  </p>
                  <a
                    href="mailto:hello@xcler.dev"
                    className="mt-1 inline-block font-medium text-white transition-colors hover:text-zinc-300"
                  >
                    hello@xcler.dev
                  </a>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
                    {t("phoneLabel")}
                  </p>
                  <a
                    href="tel:+493012345670"
                    className="mt-1 inline-block font-medium text-white transition-colors hover:text-zinc-300"
                  >
                    +49 30 123 456 70
                  </a>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
                    {t("hoursLabel")}
                  </p>
                  <p className="mt-1 font-medium text-white">{t("hoursValue")}</p>
                </div>
              </div>

              <p className="mt-8 border-t border-zinc-800 pt-6 text-sm text-zinc-400">
                {t("responseTime")}
              </p>
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