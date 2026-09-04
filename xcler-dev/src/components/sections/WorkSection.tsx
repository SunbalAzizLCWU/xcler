import type { ComponentProps } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Link } from "@/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type WorkHref = Extract<ComponentProps<typeof Link>["href"], { pathname: "/work/[slug]" }>;

type WorkProject = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  href: WorkHref;
  color: string;
};

export async function WorkSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Portfolio" });

  const projects: WorkProject[] = [
    {
      title: t("project1.title"),
      category: t("project1.category"),
      description: t("project1.description"),
      tech: [
        t("project1.tags.tag1"),
        t("project1.tags.tag2"),
        t("project1.tags.tag3"),
        t("project1.tags.tag4"),
      ],
      image: "/projects/green-navigator-v3.webp",
      href: { pathname: "/work/[slug]", params: { slug: "green-navigator" } },
      color: "from-sage/20 to-sage/5",
    },
    {
      title: t("project2.title"),
      category: t("project2.category"),
      description: t("project2.description"),
      tech: [
        t("project2.tags.tag1"),
        t("project2.tags.tag2"),
        t("project2.tags.tag3"),
        t("project2.tags.tag4"),
      ],
      image: "/projects/aegisflow-v3.webp",
      href: { pathname: "/work/[slug]", params: { slug: "aegisflow" } },
      color: "from-terracotta/20 to-terracotta/5",
    },
    {
      title: t("project3.title"),
      category: t("project3.category"),
      description: t("project3.description"),
      tech: [
        t("project3.tags.tag1"),
        t("project3.tags.tag2"),
        t("project3.tags.tag3"),
        t("project3.tags.tag4"),
      ],
      image: "/projects/visapath-v3.webp",
      href: { pathname: "/work/[slug]", params: { slug: "visapath" } },
      color: "from-stone/20 to-stone/5",
    },
    {
      title: t("project4.title"),
      category: t("project4.category"),
      description: t("project4.description"),
      tech: [
        t("project4.tags.tag1"),
        t("project4.tags.tag2"),
        t("project4.tags.tag3"),
        t("project4.tags.tag4"),
      ],
      image: "/projects/overwatch-v3.webp",
      href: { pathname: "/work/[slug]", params: { slug: "overwatch-ai" } },
      color: "from-richblack/20 to-richblack/5",
    },
  ];

  return (
    <section className="section-padding" id="work">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="line-decoration" />
                <span className="font-mono text-xs tracking-[0.3em] text-stone-light uppercase">
                  {t("eyebrow")}
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t("headingLine1")}{" "}
                <span className="text-gradient-signal">{t("headingLine2")}</span>{" "}
                <span className="text-stone">{t("headingLine3")}</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-heading text-sm font-medium text-sage transition-all hover:gap-3"
            >
              {t("viewAll")}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.15} className="h-full">
              <Link href={project.href} className="group block h-full">
                <div className="panel relative flex h-full flex-col overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-sage/45 group-hover:shadow-[0_24px_80px_-40px_rgba(45,255,154,0.45)]">
                  <div className="relative aspect-[3/2] bg-richblack p-3 sm:p-4">
                    <Image
                      src={project.image}
                      alt={`${project.title} — XCLER AI automation case study`}
                      width={1600}
                      height={1067}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="h-full w-full object-contain object-center"
                    />

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-richblack/85 via-richblack/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="translate-y-4 border border-sage/50 bg-richblack/70 px-6 py-2 font-heading text-sm text-sage opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {t("viewProject")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-xs tracking-wider text-stone">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-heading text-xl font-semibold transition-colors group-hover:text-sage">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-cream/75">
                      {project.description}
                    </p>
                    <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="truncate whitespace-nowrap border border-cream/10 bg-cream/5 px-3 py-1 font-mono text-[11px]"
                          title={t}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}