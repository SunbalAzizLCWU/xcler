import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Image from "next/image";
import { buildPageMetadata } from "@/lib/seoMeta";

type ProjectItem = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  color: string;
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });

  return buildPageMetadata({
    locale,
    path: "/work",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });
  const projects = t.raw("projects") as ProjectItem[];
  const projectImages: Record<string, string> = {
    "green-navigator": "/projects/green-navigator-v3.webp",
    aegisflow: "/projects/aegisflow-v3.webp",
    visapath: "/projects/visapath-v3.webp",
    "overwatch-ai": "/projects/overwatch-v3.webp",
  };

  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <AnimatedSection>
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-light">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t("headingLine1")}
              <br />
              <span className="text-gradient-signal">{t("headingLine2")}</span>
            </h1>
            <p className="mt-6 text-lg text-cream/60">{t("description")}</p>
          </div>
        </AnimatedSection>

        <div className="mt-16 space-y-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <div className="panel panel-hover grid grid-cols-1 overflow-hidden lg:grid-cols-2">
                <div className="flex items-center justify-center bg-richblack p-4 sm:p-5 lg:p-7">
                  <Image
                    src={projectImages[project.slug] ?? "/projects/green-navigator-v3.webp"}
                    alt={`${project.title} — XCLER AI automation case study cover`}
                    width={1600}
                    height={1067}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                    className="h-auto w-full max-w-full object-contain"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="font-mono text-xs uppercase tracking-wider text-sage">
                    {project.category}
                  </span>
                  <h2 className="mt-2 font-heading text-2xl font-bold md:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-cream/65">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="border border-cream/10 bg-cream/5 px-3 py-1 font-mono text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={{ pathname: "/work/[slug]", params: { slug: project.slug } }}
                    className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-medium text-sage transition-all hover:gap-3"
                  >
                    {locale === "de" ? "Fallstudie ansehen" : "View Case Study"}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-20 text-center">
            <h2 className="font-heading text-3xl font-bold">{t("ctaHeading")}</h2>
            <p className="mt-3 text-cream/55">{t("ctaDescription")}</p>
            <Link href="/contact" className="btn-signal mt-8">
              {t("ctaButton")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
