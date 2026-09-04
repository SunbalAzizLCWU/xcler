"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RotatingServiceKeyword } from "@/components/ui/RotatingServiceKeyword";
import { SpotlightPanel } from "@/components/ui/SpotlightPanel";
import type { ComponentProps } from "react";
import { Link } from "@/navigation";

type LocalizedHref = ComponentProps<typeof Link>["href"];

type HeroExperienceProps = {
  locale: string;
  headlineTop: string;
  headlineBottom: string;
  supportLine: string;
  subtitle: string;
  cta: string;
  secondaryCta: string;
  scrollLabel: string;
  availabilityBadge: string;
  rotatingWords: string[];
  trustItems: string[];
  systemsLabel: string;
};

export function HeroExperience({
  locale,
  headlineTop,
  headlineBottom,
  supportLine,
  subtitle,
  cta,
  secondaryCta,
  scrollLabel,
  availabilityBadge,
  rotatingWords,
  trustItems,
  systemsLabel,
}: HeroExperienceProps) {
  const reduceMotion = useReducedMotion();
  const delay = (i: number) => (reduceMotion ? 0 : 0.08 + i * 0.08);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(45,255,154,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(255,77,28,0.14),_transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.35] md:opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,244,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242,244,247,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <motion.div
          className="absolute -left-24 top-1/4 h-[22rem] w-[22rem] rounded-full bg-sage/10 blur-[100px] md:h-[28rem] md:w-[28rem]"
          animate={reduceMotion ? undefined : { y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-0 h-[24rem] w-[24rem] rounded-full bg-terracotta/15 blur-[110px] md:h-[32rem] md:w-[32rem]"
          animate={reduceMotion ? undefined : { y: [0, 16, 0], x: [0, -12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>

      <div className="container-custom relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-24 md:pb-20 md:pt-28">
        <motion.div
          className="mb-8 flex items-end justify-between gap-4 border-b border-cream/10 pb-5 md:mb-10 md:gap-6 md:pb-6"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-stone-light sm:text-[10px] sm:tracking-[0.35em]">
            Berlin · DACH · Benelux · Remote US
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-sage md:text-[10px] md:tracking-[0.3em]">
              {availabilityBadge}
            </div>
            <motion.div
              className="mt-2 ml-auto h-px w-16 origin-right bg-sage/70 md:w-24"
              animate={reduceMotion ? undefined : { scaleX: [0.7, 1, 0.7], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        <div className="grid items-end gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          <div>
            <motion.h1
              className="max-w-5xl text-balance font-heading text-[clamp(1.85rem,7.2vw,5.75rem)] font-bold leading-[0.95] tracking-[-0.04em] text-cream"
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: delay(1), ease: [0.16, 1, 0.3, 1] }}
            >
              {headlineTop}
              {headlineBottom ? <> {headlineBottom}</> : null}
            </motion.h1>

            <motion.div
              className="mt-4 max-w-2xl font-heading text-base leading-snug text-cream/60 sm:text-xl md:mt-5 md:text-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: delay(2), ease: [0.16, 1, 0.3, 1] }}
            >
              {supportLine}
            </motion.div>

            <motion.div
              className="mt-5 inline-flex max-w-full overflow-hidden border-y border-sage/30 py-2 font-heading text-lg font-semibold text-sage sm:text-2xl md:mt-6 md:text-4xl"
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: delay(3) }}
            >
              <RotatingServiceKeyword words={rotatingWords} />
            </motion.div>

            {/* SEO lede — first <p> on page */}
            <motion.p
              className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-cream/75 sm:mt-8 sm:text-base md:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: delay(4), ease: [0.16, 1, 0.3, 1] }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: delay(5), ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton href={"/contact" as LocalizedHref} variant="primary" size="lg" className="w-full sm:w-auto">
                {cta}
                <span aria-hidden="true">→</span>
              </MagneticButton>
              <MagneticButton href={"/work" as LocalizedHref} variant="outline" size="lg" className="w-full sm:w-auto">
                {secondaryCta}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: delay(3), ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <SpotlightPanel className="p-5 sm:p-6 md:p-8">
              <div className="eyebrow mb-5 md:mb-6">{systemsLabel}</div>
              <ul className="space-y-4 md:space-y-5">
                {trustItems.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 border-b border-cream/10 pb-3 last:border-0 md:pb-4"
                    initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay(4) + i * 0.1, duration: 0.5 }}
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 bg-sage shadow-[0_0_12px_rgba(45,255,154,0.8)]" />
                    <span className="text-sm leading-relaxed text-cream/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-stone sm:mt-8 sm:text-[10px] sm:tracking-[0.28em]">
                AI · RAG · Agents · Make · n8n · Next.js
              </div>
            </SpotlightPanel>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 flex items-center gap-4 text-stone-light md:mt-16"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay(6), duration: 0.8 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em]">{scrollLabel}</span>
          <motion.span
            className="h-px max-w-24 flex-1 origin-left bg-gradient-to-r from-cream/30 to-transparent"
            animate={reduceMotion ? undefined : { scaleX: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
