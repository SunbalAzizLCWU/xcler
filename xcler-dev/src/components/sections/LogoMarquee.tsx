"use client";

import { motion } from "framer-motion";

const industries = [
  "HEALTHCARE",
  "RESTAURANTS",
  "E-COMMERCE",
  "EDUCATION",
  "DENTAL",
  "SaaS",
  "STARTUPS",
  "REAL ESTATE",
  "HEALTHCARE",
  "RESTAURANTS",
  "E-COMMERCE",
  "EDUCATION",
  "DENTAL",
  "SaaS",
  "STARTUPS",
  "REAL ESTATE",
];

export function LogoMarquee() {
  return (
    <section className="relative border-y border-stone/10 dark:border-stone-dark/10 py-6 overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex shrink-0 gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {industries.map((industry, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-4 font-heading text-sm tracking-[0.3em] text-richblack/20 dark:text-cream/20"
            >
              {industry}
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta/40" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}