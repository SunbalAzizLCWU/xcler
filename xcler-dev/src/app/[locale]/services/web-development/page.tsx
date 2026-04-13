import { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Web Development Germany | Custom Websites & Web Apps | XCLER",
  description:
    "Professional web development services in Germany. Custom websites, web applications, landing pages built with Next.js, React, TypeScript. SEO-optimized, fast, responsive. Starting from €150.",
  keywords: [
    "web development Germany",
    "website erstellen lassen",
    "Webentwicklung Deutschland",
    "Next.js developer",
    "React developer Germany",
    "custom website development",
    "web app development",
  ],
};

const features = [
  {
    title: "Custom Design",
    description: "No templates. Every pixel designed for your brand and your customers.",
  },
  {
    title: "Lightning Fast",
    description: "Sub-second load times. Optimized Core Web Vitals. Google loves fast sites.",
  },
  {
    title: "SEO Built-In",
    description: "Technical SEO from day one. Meta tags, structured data, sitemaps — all included.",
  },
  {
    title: "Mobile-First",
    description: "Designed for phones first, then scaled up. Because 70% of your visitors are on mobile.",
  },
  {
    title: "CMS Integration",
    description: "Edit your own content without calling us. We set up easy content management.",
  },
  {
    title: "Analytics Ready",
    description: "Know exactly who visits, what they click, and where they drop off.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Development",
  provider: {
    "@type": "Organization",
    name: "XCLER",
    url: "https://xcler.dev",
  },
  description: "Custom web development services including websites, web applications, and landing pages.",
  areaServed: { "@type": "Country", name: "Germany" },
  serviceType: "Web Development",
};

export default function WebDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section-padding pt-32">
        <div className="container-custom">
          {/* Header */}
          <AnimatedSection>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-richblack/40 dark:text-cream/40 hover:text-terracotta transition-colors mb-8"
            >
              ← All Services
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                Service / 01
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Web
              <br />
              <span className="text-terracotta">Development.</span>
            </h1>
            <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50 max-w-2xl">
              We build custom websites and web applications that load fast, rank
              high, and convert visitors into customers. No WordPress templates.
              No page builders. Real code, real results.
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
                Technologies We Use
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
                Ready to build your website?
              </h2>
              <p className="mt-3 text-cream/60 max-w-lg mx-auto">
                Projects start from €150. Tell us what you need and we&apos;ll
                give you an honest quote within 24 hours.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
                >
                  Start Your Project →
                </Link>
                <a
                  href="https://wa.me/923154823517"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 px-8 py-3 font-heading font-medium text-cream hover:border-cream/40 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
