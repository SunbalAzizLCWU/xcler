"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const stats = [
  { number: "3+", label: "Years of Experience", suffix: "" },
  { number: "50+", label: "Projects Delivered", suffix: "" },
  { number: "6", label: "Industries Served", suffix: "" },
  { number: "98", label: "Client Satisfaction", suffix: "%" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="section-padding bg-richblack text-cream relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <motion.span
                  className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-terracotta"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                >
                  {stat.number}
                  {stat.suffix}
                </motion.span>
                <p className="mt-2 text-sm text-cream/40 font-mono tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}