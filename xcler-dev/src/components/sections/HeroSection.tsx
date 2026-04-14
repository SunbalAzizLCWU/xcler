"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HeroSection() {
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);
  const [wordIndex, setWordIndex] = useState(0);

  const rotatingWords = useMemo(() => {
    const rawWords = t.raw("rotatingWordsList");
    if (!Array.isArray(rawWords)) return [];

    return rawWords.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }, [t]);

  useEffect(() => {
    if (shouldReduceMotion || rotatingWords.length <= 1) return;

    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [rotatingWords, shouldReduceMotion]);

  const currentWord = rotatingWords.length ? rotatingWords[wordIndex % rotatingWords.length] : "";

  return (
    <section
      ref={containerRef}
      className="relative min-h-[max(42rem,100svh)] flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ contain: "paint" }} aria-hidden="true">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-terracotta/10 rounded-full blur-3xl motion-safe:animate-float will-change-transform" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl motion-safe:animate-float animate-delay-300 will-change-transform" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone/5 rounded-full blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity: 1 }}
        className="relative z-10 container-custom pt-24 min-h-[calc(100svh-6rem)] flex w-full items-center"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-stone/25 bg-white/75 dark:border-white/35 dark:bg-black/45 px-4 py-1.5 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
            </span>
            <span className="font-mono text-xs tracking-wider text-richblack dark:text-white">
              {t("availabilityBadge")}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 1, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.96] text-richblack dark:text-cream"
          >
            <span className="block">{t("headlineTop")}</span>
            <span className="mt-2 block min-h-[1.1em] text-terracotta">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentWord || "word-fallback"}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -14 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block border-y border-terracotta/35 px-3 py-1"
                >
                  {currentWord || t("lineTwoEmphasis")}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="mt-2 block">{t("headlineBottom")}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 text-lg md:text-xl text-richblack dark:text-cream/92 max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton href="/contact" variant="primary" size="lg">
              {t("cta")}
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
            </MagneticButton>
            <MagneticButton href="/work" variant="outline" size="lg">
              {t("secondaryCta")}
            </MagneticButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-richblack/75 dark:text-cream/90"
          >
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{t("trust.projectsFrom")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{t("trust.experience")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{t("trust.region")}</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-widest text-richblack/70 dark:text-cream/85 uppercase">
              {t("scrollLabel")}
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-richblack/45 to-transparent dark:from-cream/55" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}