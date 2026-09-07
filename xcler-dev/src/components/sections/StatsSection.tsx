"use client";

import { useTranslations } from "next-intl";
import { CountUp } from "@/components/ui/CountUp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function StatsSection() {
  const t = useTranslations("Stats");

  const stats = [
    { number: "3+", label: t("years") },
    { number: "50+", label: t("projects") },
    { number: "6", label: t("industries") },
    { number: "98%", label: t("satisfaction") },
  ];

  return (
    <section
      className="section-padding relative overflow-hidden border-y border-cream/10"
      aria-label={t("regionNote")}
    >
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-terracotta/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sage/10 blur-3xl" />

      <div className="container-custom relative z-10">
        <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-cream/70">
          {t("regionNote")}
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08} className="text-center">
              <CountUp
                value={stat.number}
                className="font-heading text-5xl font-bold text-sage md:text-6xl lg:text-7xl"
              />
              <p className="mt-2 font-mono text-sm uppercase tracking-wider text-cream/40">
                {stat.label}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
