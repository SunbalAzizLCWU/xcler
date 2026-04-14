import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Image from "next/image";

type ProjectItem = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  color: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });
  const projects = t.raw("projects") as ProjectItem[];
  const projectImages = [
    "/projects/green-navigator.jpg",
    "/projects/aegisflow.jpg",
    "/projects/visapath.jpg",
    "/projects/overwatch.jpg",
  ];

  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <AnimatedSection>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("headingLine1")}
              <br />
              <span className="text-terracotta">{t("headingLine2")}</span>
            </h1>
            <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 space-y-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 overflow-hidden transition-all duration-300 hover:border-terracotta/20 hover:shadow-lg">
                {/* Project image */}
                <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden">
                  <Image
                    src={projectImages[i] ?? "/projects/green-navigator.jpg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-700 hover:scale-105 ${
                      i === 0 || i === 3 ? "object-top" : ""
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <span className="font-mono text-xs text-terracotta tracking-wider uppercase">
                    {project.category}
                  </span>
                  <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-richblack/60 dark:text-cream/60 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-stone/10 dark:bg-stone-dark/10 px-3 py-1 font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection>
          <div className="mt-20 text-center">
            <h2 className="font-heading text-3xl font-bold">
              {t("ctaHeading")}
            </h2>
            <p className="mt-3 text-richblack/50 dark:text-cream/50">
              {t("ctaDescription")}
            </p>
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
  );
}
