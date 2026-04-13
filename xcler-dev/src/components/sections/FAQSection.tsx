"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const faqs = [
  {
    question: "How much does a website cost?",
    answer:
      "Projects start from €150 for simple websites. Custom web apps, e-commerce stores, and automation projects are scoped individually based on complexity. We'll give you an honest quote after a 15-minute conversation — no hidden fees, no surprises.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A standard website takes 2-4 weeks. A web application takes 4-8 weeks. Automation setups can be done in 1-2 weeks. We're fast because we're a focused team, not a bloated agency with 17 layers of management.",
  },
  {
    question: "Do you work with clients in Germany?",
    answer:
      "Yes! While our team works remotely, we specifically serve the German and EU market. We understand German business requirements, GDPR compliance, and can communicate in English and German.",
  },
  {
    question: "What happens after the website is launched?",
    answer:
      "We don't disappear. We offer long-term retention packages for maintenance, updates, and improvements. Your website isn't a one-time project — it's a living product, and we treat it that way.",
  },
  {
    question: "Can you build both the website AND the automation?",
    answer:
      "That's literally our superpower. Most agencies do one or the other. We build your website, connect it to your CRM, set up automated email sequences, chatbots, booking systems — the whole ecosystem.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "For web: Next.js, React, TypeScript, Python, FastAPI. For CMS: WordPress, Shopify. For automation: Make.com, n8n, Zapier, GoHighLevel. For AI: RAG agents, chatbots, call agents. We pick the right tool for your specific needs — not whatever's trendy.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-cream dark:bg-richblack" id="faq">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <AnimatedSection>
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-4">
                <div className="line-decoration" />
                <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                  FAQ
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-richblack dark:text-white">
                Questions?
                <br />
                <span className="text-terracotta">Answers.</span>
              </h2>
              <p className="mt-4 text-richblack dark:text-gray-200">
                If your question isn&apos;t here, just{" "}
                <a
                  href="https://wa.me/923154823517"
                  className="text-terracotta underline underline-offset-2"
                >
                  WhatsApp us
                </a>
                . We reply fast.
              </p>
            </div>
          </AnimatedSection>

          {/* Right */}
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="border-b border-stone/10 dark:border-stone-dark/10">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                    className="flex w-full items-start justify-between py-6 text-left group"
                  >
                    <span className="font-heading text-lg font-medium pr-4 text-richblack dark:text-white group-hover:text-terracotta transition-colors">
                      {faq.question}
                    </span>
                    <motion.svg
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 h-5 w-5 shrink-0 text-stone dark:text-stone-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-richblack dark:text-gray-200 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}