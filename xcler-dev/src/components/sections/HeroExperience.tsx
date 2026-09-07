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
        {/* Static orbs — no infinite Framer loops on the LCP path */}
        <div className="absolute -left-24 top-1/4 h-[22rem] w-[22rem] rounded-full bg-sage/10 blur-[100px] md:h-[28rem] md:w-[28rem]" />
        <div className="absolute -right-16 bottom-0 h-[24rem] w-[24rem] rounded-full bg-terracotta/15 blur-[110px] md:h-[32rem] md:w-[32rem]" />
      </div>

      <div className="container-custom relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-cream/10 pb-5 md:mb-10 md:gap-6 md:pb-6">
          <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-stone-light sm:text-[10px] sm:tracking-[0.35em]">
            Berlin · DACH · Benelux · Remote US
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-sage md:text-[10px] md:tracking-[0.3em]">
              {availabilityBadge}
            </div>
            <div className="mt-2 ml-auto h-px w-16 bg-sage/70 md:w-24" />
          </div>
        </div>

        <div className="grid items-end gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          <div>
            {/* LCP elements: always visible on first paint — never opacity:0 */}
            <h1 className="max-w-5xl text-balance font-heading text-[clamp(1.85rem,7.2vw,5.75rem)] font-bold leading-[0.95] tracking-[-0.04em] text-cream">
              {headlineTop}
              {headlineBottom ? <> {headlineBottom}</> : null}
            </h1>

            <div className="mt-4 max-w-2xl font-heading text-base leading-snug text-cream/80 sm:text-xl md:mt-5 md:text-2xl">
              {supportLine}
            </div>

            <div
              className="mt-5 inline-flex max-w-full overflow-hidden border-y border-sage/30 py-2 font-heading text-lg font-semibold text-sage sm:text-2xl md:mt-6 md:text-4xl"
              aria-hidden="true"
            >
              <RotatingServiceKeyword words={rotatingWords} />
            </div>

            {/* SEO lede — first <p> on page; must paint immediately for LCP */}
            <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-cream/80 sm:mt-8 sm:text-base md:text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <MagneticButton href={"/contact" as LocalizedHref} variant="primary" size="lg" className="w-full sm:w-auto">
                {cta}
                <span aria-hidden="true">→</span>
              </MagneticButton>
              <MagneticButton href={"/work" as LocalizedHref} variant="outline" size="lg" className="w-full sm:w-auto">
                {secondaryCta}
              </MagneticButton>
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <SpotlightPanel className="p-5 sm:p-6 md:p-8">
              <div className="eyebrow mb-5 md:mb-6">{systemsLabel}</div>
              <ul className="space-y-4 md:space-y-5">
                {trustItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-cream/10 pb-3 last:border-0 md:pb-4"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 bg-sage shadow-[0_0_12px_rgba(45,255,154,0.8)]" />
                    <span className="text-sm leading-relaxed text-cream/85">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-stone-light sm:mt-8 sm:text-[10px] sm:tracking-[0.28em]">
                AI · RAG · Agents · Make · n8n · Next.js
              </div>
            </SpotlightPanel>
          </motion.div>
        </div>

        <div className="mt-10 flex items-center gap-4 text-stone-light md:mt-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em]">{scrollLabel}</span>
          <span className="h-px max-w-24 flex-1 bg-gradient-to-r from-cream/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
