"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";

const leadAvatars: Record<string, string> = {
  "abeel mehr": "/team/abeel.webp",
  "mehru seemab": "/team/mehru.webp",
  "musharraf aziz": "/team/musharraf.webp",
};

function getLeadAvatar(name: string): string | null {
  return leadAvatars[name.trim().toLowerCase()] ?? null;
}

export function ServicesSection() {
  const t = useTranslations("Services");

  const serviceConfig = [
    {
      number: "01",
      key: "service5",
      tech: ["RAG", "LLMs", "Call Agents", "Chatbots"],
      href: "/services/ai-chatbots-agents" as const,
      lead: "Musharraf Aziz",
    },
    {
      number: "02",
      key: "service4",
      tech: ["Make.com", "n8n", "Zapier", "GoHighLevel"],
      href: "/services/workflow-automation" as const,
      lead: "Musharraf Aziz",
    },
    {
      number: "03",
      key: "service1",
      tech: ["Next.js", "React", "TypeScript", "Tailwind"],
      href: "/services/web-development" as const,
      lead: "Abeel Mehr",
    },
    {
      number: "04",
      key: "service2",
      tech: ["React Native", "Flutter", "Python", "APIs"],
      href: "/services/app-development" as const,
      lead: "Abeel Mehr",
    },
    {
      number: "05",
      key: "service3",
      tech: ["WordPress", "Shopify", "WooCommerce", "Liquid"],
      href: "/services/wordpress-shopify" as const,
      lead: "Mehru Seemab",
    },
  ];

  const services = serviceConfig.map((service) => ({
    ...service,
    title: t(`${service.key}.title`),
    description: t(`${service.key}.description`),
  }));

  const [activeService, setActiveService] = useState(0);

  return (
    <section className="section-padding" id="services">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-stone-light uppercase">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("headingLine1")}
            <br />
            <span className="text-gradient-signal">{t("headingLine2")}</span>
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16">
          {/* Left: Service List */}
          <div className="space-y-0">
            {services.map((service, i) => (
              <AnimatedSection key={service.number} delay={i * 0.1}>
                <motion.div
                  onClick={() => setActiveService(i)}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className={`group cursor-pointer border-b border-cream/10 py-6 transition-all duration-300 ${
                    activeService === i
                      ? "border-l-2 border-l-sage pl-4"
                      : "pl-0 hover:pl-4"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs text-stone">
                        {service.number}
                      </span>
                      <h3
                        className={`font-heading text-2xl font-semibold transition-colors md:text-3xl ${
                          activeService === i
                            ? "text-sage"
                            : "text-cream group-hover:text-sage"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <motion.svg
                      animate={{ rotate: activeService === i ? 45 : 0 }}
                      className="mt-2 h-5 w-5 text-stone transition-colors group-hover:text-sage"
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
                        <p className="mt-3 text-cream/65 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.tech.map((t) => (
                            <span
                              key={t}
                              className="border border-cream/10 bg-cream/5 px-3 py-1 font-mono text-xs"
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
                  className="rounded-none border border-cream/10 bg-charcoal/70 p-8 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_80px_-48px_rgba(45,255,154,0.4)]"
                >
                  <span className="font-mono text-6xl font-bold text-sage/10">
                    {services[activeService].number}
                  </span>
                  <h3 className="mt-4 font-heading text-3xl font-bold">
                    {services[activeService].title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-cream/65">
                    {services[activeService].description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {services[activeService].tech.map((t) => (
                      <span
                        key={t}
                        className="border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    {getLeadAvatar(services[activeService].lead) ? (
                      <Image
                        src={getLeadAvatar(services[activeService].lead)!}
                        alt={`${services[activeService].lead}, XCLER service lead`}
                        width={32}
                        height={32}
                        loading="lazy"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-stone/20" />
                    )}
                    <div>
                      <p className="text-xs text-stone-light">
                        {t("ledBy")}
                      </p>
                      <p className="text-sm font-medium">
                        {services[activeService].lead}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={services[activeService].href}
                    className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-medium text-sage transition-all hover:gap-3"
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