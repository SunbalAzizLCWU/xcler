import { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Our Work | Portfolio | XCLER — Web & App Development Agency",
  description:
    "See our latest projects. SaaS platforms, web applications, automation systems, and AI solutions built for real businesses.",
};

const projects = [
  {
    title: "Green Navigator",
    category: "B2B SaaS • Carbon Reporting",
    description:
      "A premium B2B SaaS for localized carbon reporting that utilizes Gemini 3.1 Flash OCR to transform unstructured utility bills into audit-ready environmental intelligence.",
    tech: ["Next.js", "Gemini AI", "OCR", "Data Visualization"],
    color: "from-sage/20 to-sage/5",
  },
  {
    title: "AegisFlow",
    category: "FinTech SaaS • Risk Management",
    description:
      "Enterprise-grade financial SaaS integrating LSTM neural networks and GANs to provide predictive liquidity forecasting and AI-driven risk management for the Pakistani market.",
    tech: ["Python", "LSTM", "GANs", "FastAPI", "React"],
    color: "from-terracotta/20 to-terracotta/5",
  },
  {
    title: "VisaPath",
    category: "B2C SaaS • Travel Tech",
    description:
      "A modern B2C SaaS platform that allows digital nomads, frequent travelers, and expats to optimize their visa strategies by calculating global access maps and AI-optimized travel routes.",
    tech: ["React", "Node.js", "Maps API", "AI Routing"],
    color: "from-stone/20 to-stone/5",
  },
  {
    title: "Overwatch AI",
    category: "Security • Threat Detection",
    description:
      "A cinematic AI command center leveraging Gemini 3.1 Flash to detect multimodal scams through real-time audio, image, and text threat intelligence.",
    tech: ["Gemini AI", "WebSockets", "Python", "React", "Real-time"],
    color: "from-richblack/20 to-richblack/5",
  },
];

export default function WorkPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <AnimatedSection>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                Our Work
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Built. Shipped.
              <br />
              <span className="text-terracotta">Proven.</span>
            </h1>
            <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50">
              Real projects. Real code. Real results. Here&apos;s a selection of
              what we&apos;ve built.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 space-y-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 overflow-hidden transition-all duration-300 hover:border-terracotta/20 hover:shadow-lg">
                {/* Image placeholder */}
                <div className={`h-64 lg:h-auto bg-gradient-to-br ${project.color} flex items-center justify-center min-h-[300px]`}>
                  <span className="font-heading text-4xl font-bold text-richblack/5 dark:text-cream/5">
                    {project.title}
                  </span>
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
              Want to be our next success story?
            </h2>
            <p className="mt-3 text-richblack/50 dark:text-cream/50">
              Let&apos;s talk about your project.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
            >
              Start Your Project →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
