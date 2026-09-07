import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/sections/ContactForm";
import { buildPageMetadata } from "@/lib/seoMeta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "contact XCLER",
      "AI agency contact Germany",
      "automation agency Berlin",
    ],
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const phoneNumber = "923154823517";
  const displayPhoneNumber = "+92 315 4823517";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <aside className="panel p-6 md:p-8">
            <div className="mb-4 flex items-center gap-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-light">
                {t("eyebrow")}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {t("headingLine1")}
              <br />
              <span className="text-gradient-signal">{t("headingLine2")}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/65">
              {t("intro")}
            </p>

            <div className="mt-8 space-y-6 text-sm md:text-base">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cream/40">
                  {t("emailLabel")}
                </p>
                <p className="mt-1 font-medium text-cream">
                  hello [at] xcler.dev
                </p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cream/40">
                  {t("phoneLabel")}
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-medium text-cream transition-colors hover:text-sage"
                >
                  {displayPhoneNumber}
                </a>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cream/40">
                  {t("hoursLabel")}
                </p>
                <p className="mt-1 font-medium text-cream">{t("hoursValue")}</p>
              </div>
            </div>

            <p className="mt-8 border-t border-cream/10 pt-6 text-sm text-cream/50">
              {t("responseTime")}
            </p>
          </aside>

          <div className="panel p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
