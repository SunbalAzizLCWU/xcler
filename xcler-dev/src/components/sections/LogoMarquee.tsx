"use client";

import { useState } from "react";

const industries = [
  "AI ENGINEERING",
  "RAG SYSTEMS",
  "WORKFLOW AUTOMATION",
  "N8N · MAKE",
  "NEXT.JS",
  "B2B PLATFORMS",
  "DACH",
  "BENELUX",
  "AI CHATBOTS",
  "AGENTS",
];

export function LogoMarquee() {
  const repeated = [...industries, ...industries];
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="relative overflow-hidden border-y border-cream/10 bg-charcoal/40 py-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Capabilities"
    >
      <div
        className="flex w-max animate-marquee"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-5 px-5 font-mono text-[11px] tracking-[0.35em] text-cream/70 transition-colors hover:text-sage"
          >
            {item}
            <span className="h-1.5 w-1.5 bg-sage shadow-[0_0_8px_rgba(45,255,154,0.7)]" />
          </span>
        ))}
      </div>
    </section>
  );
}
