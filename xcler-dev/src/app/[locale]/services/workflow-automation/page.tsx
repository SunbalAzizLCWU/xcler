import { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Workflow Automation Germany | Make.com, n8n, Zapier | XCLER",
  description:
    "Workflow automation services for German businesses. Make.com, n8n, Zapier, GoHighLevel integrations. Save 20+ hours per week with automated business processes.",
};

export default function WorkflowAutomationPage() {
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
              Service / 04
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Workflow
            <br />
            <span className="text-terracotta">Automation.</span>
          </h1>
          <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50 max-w-2xl">
            Stop doing manually what a machine can do in seconds. We connect
            your tools, automate your processes, and give you back 20+ hours
            every week. Led by Musharraf Aziz, our automation specialist.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Make.com Automations", desc: "Complex multi-step workflows connecting hundreds of apps. CRM updates, email sequences, data sync — all automated." },
              { title: "n8n Self-Hosted", desc: "For businesses that need full control. Self-hosted automation workflows with no per-operation limits." },
              { title: "Zapier Integrations", desc: "Quick, reliable automations for standard business processes. Connect your favorite tools in hours, not weeks." },
              { title: "GoHighLevel", desc: "Full CRM and marketing automation setup. Lead pipelines, SMS campaigns, appointment booking — all automated." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-6">
                <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-richblack/60 dark:text-cream/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-20 rounded-2xl bg-richblack dark:bg-cream/5 p-10 text-cream text-center">
            <h2 className="font-heading text-3xl font-bold">Ready to automate?</h2>
            <p className="mt-3 text-cream/60">Tell us what you&apos;re doing manually and we&apos;ll show you how to automate it.</p>
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
