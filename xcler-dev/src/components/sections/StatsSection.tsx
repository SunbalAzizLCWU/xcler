"use client";

import { useTranslations } from "next-intl";

export function StatsSection() {
  const t = useTranslations("Stats");

  const stats = [
    { number: "3+", label: t("years"), suffix: "" },
    { number: "50+", label: t("projects"), suffix: "" },
    { number: "6", label: t("industries"), suffix: "" },
    { number: "98", label: t("satisfaction"), suffix: "%" },
  ];

  return (
    <section className="section-padding bg-richblack text-cream relative overflow-hidden" aria-label={t("regionNote")}>
      <div className="absolute top-0 left-0 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-cream/45">
          {t("regionNote")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: "forwards" }}
            >
              <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-terracotta">
                {stat.number}
                {stat.suffix}
              </span>
              <p className="mt-2 text-sm text-cream/40 font-mono tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
