"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function ServicesSection() {
  const t = useTranslations("Services");

  const services = [
    {
      number: "01",
      title: t("service1.title"),
      description: t("service1.description"),
      tech: ["Next.js", "React", "TypeScript", "Tailwind"],
      href: "/services/web-development",
      lead: "Abeel Mehr",
    },
    {
      number: "02",
      title: t("service2.title"),
      description: t("service2.description"),
      tech: ["React Native", "Flutter", "Python", "APIs"],
      href: "/services/app-development",
      lead: "Abeel Mehr",
    },
    {
      number: "03",
      title: t("service3.title"),
      description: t("service3.description"),
      tech: ["WordPress", "Shopify", "WooCommerce", "Liquid"],
      href: "/services/wordpress-shopify",
      lead: "Mehru Seemab",
    },
    {
      number: "04",
      title: t("service4.title"),
      description: t("service4.description"),
      tech: ["Make.com", "n8n", "Zapier", "GoHighLevel"],
      href: "/services/workflow-automation",
      lead: "Musharraf Aziz",
    },
    {
      number: "05",
      title: t("service5.title"),
      description: t("service5.description"),
      tech: ["RAG", "LLMs", "Call Agents", "Chatbots"],
      href: "/services/ai-chatbots-agents",
      lead: "Musharraf Aziz",
    },
  ];

  const [activeService, setActiveService] = useState(0);

  return (
    <section className="section-padding" id="services">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("headingLine1")}
            <br />
            <span className="text-terracotta">{t("headingLine2")}</span>
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16">
          {/* Left: Service List */}
          <div className="space-y-0">
            {services.map((service, i) => (
              <AnimatedSection key={service.number} delay={i * 0.1}>
                <motion.div
                  onClick={() => setActiveService(i)}
                  className={`group cursor-pointer border-b border-stone/10 dark:border-stone-dark/10 py-6 transition-all duration-300 ${
                    activeService === i
                      ? "pl-4 border-l-2 border-l-terracotta"
                      : "pl-0 hover:pl-4"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs text-stone dark:text-stone-dark">
                        {service.number}
                      </span>
                      <h3
                        className={`font-heading text-2xl md:text-3xl font-semibold transition-colors ${
                          activeService === i
                            ? "text-terracotta"
                            : "text-richblack dark:text-cream group-hover:text-terracotta"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <motion.svg
                      animate={{ rotate: activeService === i ? 45 : 0 }}
                      className="mt-2 h-5 w-5 text-stone transition-colors group-hover:text-terracotta"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </motion.svg>
                  </div>

                  <AnimatePresence>
                    {activeService === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden lg:hidden"
                      >
                        <p className="mt-3 text-richblack/60 dark:text-cream/60 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-stone/10 dark:bg-stone-dark/10 px-3 py-1 font-mono text-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Right: Service Detail (Desktop) */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white/50 dark:bg-richblack/50 p-8 backdrop-blur-sm"
                >
                  <span className="font-mono text-6xl font-bold text-stone/10 dark:text-stone-dark/10">
                    {services[activeService].number}
                  </span>
                  <h3 className="mt-4 font-heading text-3xl font-bold">
                    {services[activeService].title}
                  </h3>
                  <p className="mt-4 text-richblack/60 dark:text-cream/60 leading-relaxed text-lg">
                    {services[activeService].description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {services[activeService].tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-stone/10 dark:bg-stone-dark/10 px-4 py-1.5 font-mono text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-stone/20" />
                    <div>
                      <p className="text-xs text-richblack/40 dark:text-cream/40">
                        {t("ledBy")}
                      </p>
                      <p className="text-sm font-medium">
                        {services[activeService].lead}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={services[activeService].href}
                    className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-medium text-terracotta transition-all hover:gap-3"
                  >
                    {t("learnMore")}
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
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}