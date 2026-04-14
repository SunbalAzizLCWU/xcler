"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function WorkSection() {
  const t = useTranslations("Portfolio");

  const projects = [
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
      image: "/projects/green-navigator.jpg",
      href: "/work/green-navigator",
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
      image: "/projects/aegisflow.jpg",
      href: "/work/aegisflow",
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
      image: "/projects/visapath.jpg",
      href: "/work/visapath",
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
      image: "/projects/overwatch.jpg",
      href: "/work/overwatch-ai",
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
                <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                  {t("eyebrow")}
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t("headingLine1")} {" "}
                <span className="text-terracotta">{t("headingLine2")}</span>{" "}
                <span className="text-stone">{t("headingLine3")}</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-heading text-sm font-medium text-terracotta transition-all hover:gap-3"
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
              <Link href={project.href} className="group block">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/50 transition-all duration-500 hover:border-terracotta/30 hover:shadow-2xl"
                >
                  {/* Image placeholder */}
                  <div
                    className={`relative h-64 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}
                  >
                    <span className="font-heading text-3xl font-bold text-richblack/10 dark:text-cream/10">
                      {project.title}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-richblack/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                      <span className="font-heading text-sm text-white border border-white/30 rounded-full px-6 py-2 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {t("viewProject")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-xs text-stone dark:text-stone-dark tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-heading text-xl font-semibold group-hover:text-terracotta transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-richblack/50 dark:text-cream/50 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-stone/10 dark:bg-stone-dark/10 px-3 py-1 font-mono text-[11px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}