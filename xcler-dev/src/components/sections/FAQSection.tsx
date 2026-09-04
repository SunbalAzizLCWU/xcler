"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function FAQSection() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: t("faq1.question"), answer: t("faq1.answer") },
    { question: t("faq2.question"), answer: t("faq2.answer") },
    { question: t("faq3.question"), answer: t("faq3.answer") },
    { question: t("faq4.question"), answer: t("faq4.answer") },
    { question: t("faq5.question"), answer: t("faq5.answer") },
    { question: t("faq6.question"), answer: t("faq6.answer") },
  ];

  return (
    <section className="section-padding" id="faq">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <AnimatedSection>
            <div className="lg:sticky lg:top-32">
              <div className="mb-4 flex items-center gap-4">
                <div className="line-decoration" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-light">
                  {t("eyebrow")}
                </span>
              </div>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">
                {t("headingLine1")}
                <br />
                <span className="text-gradient-signal">{t("headingLine2")}</span>
              </h2>
              <p className="mt-4 text-cream/70">
                {t("contactPrefix")}{" "}
                <a
                  href="https://wa.me/923154823517"
                  className="text-sage underline underline-offset-2"
                >
                  {t("contactLink")}
                </a>
                . {t("contactSuffix")}
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="border-b border-cream/10">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="group flex w-full items-start justify-between py-6 text-left"
                    type="button"
                  >
                    <h3 className="pr-4 font-heading text-lg font-medium text-cream transition-colors group-hover:text-sage">
                      {faq.question}
                    </h3>
                    <motion.svg
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 h-5 w-5 shrink-0 text-stone-light"
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
                        <p className="pb-6 leading-relaxed text-cream/70">
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
