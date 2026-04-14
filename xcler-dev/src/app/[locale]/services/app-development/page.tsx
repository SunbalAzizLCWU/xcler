import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/lib/structuredData";
import { getCanonicalPath } from "@/lib/canonical";

type CapabilityItem = {
  title: string;
  desc: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceAppDevelopmentPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getCanonicalPath(locale, "/services/app-development"),
    },
  };
}

export default async function AppDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceAppDevelopmentPage" });
  const capabilities = t.raw("capabilities") as CapabilityItem[];
  const schema = getServiceSchema({
    locale: locale === "en" ? "en" : "de",
    slug: "app-development",
    name: t("headingLine1") + " " + t("headingLine2"),
    description: t("metaDescription"),
  });

  return (
    <>
      <JsonLd id={`service-app-development-${locale}`} data={schema} />
      <section className="section-padding pt-32">
        <div className="container-custom">
        <AnimatedSection>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-richblack/40 dark:text-cream/40 hover:text-terracotta transition-colors mb-8"
          >
            ← {t("backToServices")}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
              {t("serviceLabel")}
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("headingLine1")}
            <br />
            <span className="text-terracotta">{t("headingLine2")}</span>
          </h1>
          <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50 max-w-2xl">
            {t("intro")}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((item, i) => (
              <div key={item.title} className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-6">
                <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-richblack/60 dark:text-cream/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-20 rounded-2xl bg-richblack dark:bg-cream/5 p-10 text-cream text-center">
            <h2 className="font-heading text-3xl font-bold">{t("ctaHeading")}</h2>
            <p className="mt-3 text-cream/60">{t("ctaDescription")}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </AnimatedSection>
        </div>
      </section>
    </>
  );
}
