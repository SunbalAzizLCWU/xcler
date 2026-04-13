import { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Services | XCLER — Web, App, Automation & AI Development",
  description:
    "Full-stack web development, app development, WordPress, Shopify, workflow automation, AI chatbots, and RAG agents. Serving Germany and EU businesses.",
};

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Custom websites built with Next.js, React, and modern frameworks. Fast, responsive, SEO-optimized. From landing pages to complex web applications.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    href: "/services/web-development",
    lead: "Abeel Mehr",
    color: "from-terracotta/10 to-terracotta/5",
  },
  {
    number: "02",
    title: "App Development",
    description:
      "Cross-platform and native mobile applications. From MVP to full-scale product. Clean architecture, smooth UX, production-ready code.",
    tech: ["React Native", "Flutter", "Python", "REST APIs", "GraphQL"],
    href: "/services/app-development",
    lead: "Abeel Mehr",
    color: "from-sage/10 to-sage/5",
  },
  {
    number: "03",
    title: "WordPress & Shopify",
    description:
      "E-commerce stores and content-driven websites that actually convert. Custom themes, plugins, performance optimization, and ongoing management.",
    tech: ["WordPress", "Shopify", "WooCommerce", "Liquid", "PHP"],
    href: "/services/wordpress-shopify",
    lead: "Mehru Seemab",
    color: "from-stone/10 to-stone/5",
  },
  {
    number: "04",
    title: "Workflow Automation",
    description:
      "Eliminate repetitive tasks. Connect your tools. Save 20+ hours per week. We build automated workflows that run your business while you sleep.",
    tech: ["Make.com", "n8n", "Zapier", "GoHighLevel", "APIs"],
    href: "/services/workflow-automation",
    lead: "Musharraf Aziz",
    color: "from-terracotta/10 to-sage/5",
  },
  {
    number: "05",
    title: "AI Chatbots & Agents",
    description:
      "Intelligent chatbots and AI call agents that handle customer support, lead qualification, and sales 24/7. RAG-powered, context-aware, actually useful.",
    tech: ["RAG", "LLMs", "Call Agents", "Chatbots", "Vector DBs"],
    href: "/services/ai-chatbots-agents",
    lead: "Musharraf Aziz",
    color: "from-sage/10 to-terracotta/5",
  },
];

export default function ServicesPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <AnimatedSection>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                Our Services
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Everything you need.
              <br />
              <span className="text-terracotta">Nothing you don&apos;t.</span>
            </h1>
            <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50 max-w-2xl">
              We don&apos;t do everything. We do five things — and we do them
              exceptionally well. Each service is led by a specialist, not a
              generalist pretending to know it all.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-20 space-y-8">
          {services.map((service, i) => (
            <AnimatedSection key={service.number} delay={i * 0.1}>
              <Link href={service.href} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-8 transition-all duration-500 hover:border-terracotta/20 hover:shadow-xl hover:-translate-y-1">
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="font-mono text-sm text-stone dark:text-stone-dark">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="lg:col-span-5">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-terracotta transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-richblack/60 dark:text-cream/60 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Tech & Lead */}
                  <div className="lg:col-span-4">
                    <p className="text-xs text-richblack/30 dark:text-cream/30 uppercase tracking-wider mb-3">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-stone/10 dark:bg-stone-dark/10 px-3 py-1 font-mono text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-stone/20" />
                      <span className="text-sm text-richblack/40 dark:text-cream/40">
                        Led by {service.lead}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="lg:col-span-2 flex items-center justify-end">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-stone/20 dark:border-stone-dark/20 transition-all group-hover:border-terracotta group-hover:bg-terracotta group-hover:text-white">
                      <svg
                        className="h-5 w-5"
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
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection>
          <div className="mt-20 text-center">
            <p className="text-richblack/50 dark:text-cream/50 text-lg">
              Not sure which service you need?{" "}
              <a
                href="https://wa.me/923154823517"
                className="text-terracotta underline underline-offset-2"
              >
                WhatsApp us
              </a>{" "}
              — we&apos;ll figure it out together in 5 minutes.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
