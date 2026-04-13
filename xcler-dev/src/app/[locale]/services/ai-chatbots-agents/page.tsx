import { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "AI Chatbots & Call Agents Germany | RAG, LLMs | XCLER",
  description:
    "AI chatbot and call agent development for German businesses. RAG-powered assistants, customer support bots, lead qualification agents. 24/7 automated customer interaction.",
};

export default function AIChatbotsPage() {
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
              Service / 05
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            AI Chatbots
            <br />
            <span className="text-terracotta">& Agents.</span>
          </h1>
          <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50 max-w-2xl">
            Not the dumb chatbots that annoy everyone. We build AI agents that
            actually understand context, answer real questions, and handle
            customer interactions 24/7 — so you don&apos;t have to.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "RAG-Powered Chatbots", desc: "Chatbots trained on YOUR data. Product docs, FAQs, policies — they know your business inside out." },
              { title: "AI Call Agents", desc: "Voice agents that handle inbound calls, qualify leads, book appointments. Natural conversation, real results." },
              { title: "Customer Support Bots", desc: "Handle 80% of support tickets automatically. Escalate complex issues to humans. Available 24/7/365." },
              { title: "Lead Qualification", desc: "AI agents that chat with website visitors, qualify leads, and send hot prospects directly to your sales team." },
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
            <h2 className="font-heading text-3xl font-bold">Want an AI agent for your business?</h2>
            <p className="mt-3 text-cream/60">We&apos;ll build a custom AI solution that fits your specific needs.</p>
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
