import { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "App Development Germany | Mobile & Web Apps | XCLER",
  description:
    "Professional app development services. Cross-platform mobile apps, web applications, MVPs. React Native, Flutter, Python. Serving Germany and EU.",
};

export default function AppDevelopmentPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
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
              Service / 02
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            App
            <br />
            <span className="text-terracotta">Development.</span>
          </h1>
          <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50 max-w-2xl">
            From idea to app store. We build cross-platform mobile applications
            and complex web apps that users actually want to use. Clean code,
            smooth UX, production-ready from day one.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Cross-Platform Apps", desc: "One codebase, iOS + Android. React Native or Flutter — we pick what fits your project best." },
              { title: "Web Applications", desc: "Complex dashboards, SaaS platforms, internal tools. Built with modern frameworks and real architecture." },
              { title: "MVP Development", desc: "Got a startup idea? We build your minimum viable product fast so you can validate and iterate." },
              { title: "API Development", desc: "RESTful and GraphQL APIs. Python FastAPI, Node.js, Flask. Scalable backend systems that handle growth." },
            ].map((item, i) => (
              <div key={item.title} className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-6">
                <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-richblack/60 dark:text-cream/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-20 rounded-2xl bg-richblack dark:bg-cream/5 p-10 text-cream text-center">
            <h2 className="font-heading text-3xl font-bold">Got an app idea?</h2>
            <p className="mt-3 text-cream/60">Let&apos;s talk about it. No commitment, no pressure.</p>
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
