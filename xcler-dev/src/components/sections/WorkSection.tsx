"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";

const projects = [
  {
    title: "Green Navigator",
    category: "B2B SaaS • Carbon Reporting",
    description:
      "A premium B2B SaaS for localized carbon reporting. Uses Gemini Flash OCR to transform utility bills into audit-ready environmental intelligence.",
    tech: ["Next.js", "Gemini AI", "OCR", "Data Viz"],
    image: "/projects/green-navigator.jpg",
    href: "/work/green-navigator",
    color: "from-sage/20 to-sage/5",
  },
  {
    title: "AegisFlow",
    category: "FinTech SaaS • Risk Management",
    description:
      "Enterprise-grade financial SaaS integrating LSTM neural networks and GANs for predictive liquidity forecasting and AI-driven risk management.",
    tech: ["Python", "LSTM", "GANs", "FastAPI"],
    image: "/projects/aegisflow.jpg",
    href: "/work/aegisflow",
    color: "from-terracotta/20 to-terracotta/5",
  },
  {
    title: "VisaPath",
    category: "B2C SaaS • Travel Tech",
    description:
      "A platform for digital nomads to optimize visa strategies with global access maps and AI-optimized travel routes.",
    tech: ["React", "Node.js", "Maps API", "AI"],
    image: "/projects/visapath.jpg",
    href: "/work/visapath",
    color: "from-stone/20 to-stone/5",
  },
  {
    title: "Overwatch AI",
    category: "Security • Threat Detection",
    description:
      "A cinematic AI command center leveraging Gemini Flash for multimodal scam detection through real-time audio, image, and text analysis.",
    tech: ["Gemini AI", "WebSockets", "Python", "React"],
    image: "/projects/overwatch.jpg",
    href: "/work/overwatch-ai",
    color: "from-richblack/20 to-richblack/5",
  },
];

export function WorkSection() {
  return (
    <section className="section-padding" id="work">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="line-decoration" />
                <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                  Selected Work
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Built.{" "}
                <span className="text-terracotta">Shipped.</span>{" "}
                <span className="text-stone">Proven.</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-heading text-sm font-medium text-terracotta transition-all hover:gap-3"
            >
              View all projects
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
            <AnimatedSection key={project.title} delay={i * 0.15}>
              <Link href={project.href} className="group block">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative overflow-hidden rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/50 transition-all duration-500 hover:border-terracotta/30 hover:shadow-2xl"
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
                        View Project
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="font-mono text-xs text-stone dark:text-stone-dark tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-heading text-xl font-semibold group-hover:text-terracotta transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-richblack/50 dark:text-cream/50 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
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