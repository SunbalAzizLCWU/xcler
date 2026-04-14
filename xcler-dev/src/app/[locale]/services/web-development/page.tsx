import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/lib/structuredData";
import { getCanonicalPath } from "@/lib/canonical";

type FeatureItem = {
  title: string;
  description: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceWebDevelopmentPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getCanonicalPath(locale, "/services/web-development"),
    },
  };
}

export default async function WebDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceWebDevelopmentPage" });
  const features = t.raw("features") as FeatureItem[];
  const schema = getServiceSchema({
    locale: locale === "en" ? "en" : "de",
    slug: "web-development",
    name: t("headingLine1") + " " + t("headingLine2"),
    description: t("metaDescription"),
  });

  return (
    <>
      <JsonLd id={`service-web-development-${locale}`} data={schema} />
      <section className="section-padding pt-32">
        <div className="container-custom">
          {/* Header */}
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

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-richblack/60 dark:text-cream/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Tech Stack */}
          <AnimatedSection>
            <div className="mt-20">
              <h2 className="font-heading text-2xl font-bold mb-8">
                {t("technologiesTitle")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Node.js",
                  "Python",
                  "FastAPI",
                  "Flask",
                  "PostgreSQL",
                  "MongoDB",
                  "Prisma",
                  "Vercel",
                  "AWS",
                  "Docker",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-stone/20 dark:border-stone-dark/20 px-4 py-2 font-mono text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <div className="mt-20 rounded-2xl bg-richblack dark:bg-cream/5 p-10 text-cream text-center">
              <h2 className="font-heading text-3xl font-bold">
                {t("ctaHeading")}
              </h2>
              <p className="mt-3 text-cream/60 max-w-lg mx-auto">
                {t("ctaDescription")}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
                >
                  {t("ctaPrimary")}
                </Link>
                <a
                  href="https://wa.me/923154823517"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 px-8 py-3 font-heading font-medium text-cream hover:border-cream/40 transition-colors"
                >
                  {t("ctaSecondary")}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
