"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "They delivered our e-commerce store 2 weeks ahead of schedule. Revenue increased 40% in the first month. These guys mean business.",
    name: "Ahmed K.",
    company: "E-commerce Store Owner",
    industry: "Retail",
  },
  {
    quote:
      "The automation Musharraf built saved us 25+ hours per week. What we were doing manually with 3 people, now runs automatically. Incredible ROI.",
    name: "Dr. Sarah M.",
    company: "Healthcare Clinic",
    industry: "Healthcare",
  },
  {
    quote:
      "I've worked with 4 agencies before XCLER. They're the first ones who actually listened, delivered on time, and didn't disappear after launch.",
    name: "Rashid A.",
    company: "Restaurant Chain",
    industry: "Food & Beverage",
  },
  {
    quote:
      "Professional, fast, and genuinely cared about our school's online presence. The website they built increased our enrollment inquiries by 60%.",
    name: "Fatima N.",
    company: "Early Learning Academy",
    industry: "Education",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding bg-cream dark:bg-charcoal" id="testimonials">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
              Kind Words
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Don&apos;t take
            <br />
            <span className="text-terracotta">our word for it.</span>
          </h2>
        </AnimatedSection>

        <div className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <svg
                className="h-10 w-10 text-terracotta/30 mb-6"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl font-medium leading-snug tracking-tight">
                {testimonials[active].quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-stone/20 dark:bg-stone-dark/20 flex items-center justify-center">
                  <span className="font-heading font-semibold text-sm">
                    {testimonials[active].name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold">
                    {testimonials[active].name}
                  </p>
                  <p className="text-sm text-richblack/50 dark:text-cream/50">
                    {testimonials[active].company} •{" "}
                    {testimonials[active].industry}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="mt-12 flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-8 bg-terracotta"
                    : "w-2 bg-stone/30 dark:bg-stone-dark/30 hover:bg-stone/50"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
