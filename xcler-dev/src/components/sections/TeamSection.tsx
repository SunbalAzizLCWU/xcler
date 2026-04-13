"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const team = [
  {
    name: "Musharraf Aziz",
    role: "Founder & Automation Lead",
    expertise: "Workflow Automation • AI Agents • RAG Systems",
    tools: "Make.com, n8n, Zapier, GoHighLevel",
    image: "/team/musharraf.jpg", // Add your photo here
  },
  {
    name: "Abeel Mehr",
    role: "Full Stack Developer",
    expertise: "Web & App Development • API Architecture",
    tools: "Next.js, Python, FastAPI, Flask, CI/CD",
    image: "/team/abeel.jpg", // Add photo here
  },
  {
    name: "Mehru Seemab",
    role: "CMS & Frontend Developer",
    expertise: "WordPress • Shopify • E-commerce",
    tools: "WordPress, Shopify, WooCommerce, Liquid",
    image: "/team/mehru.jpg", // Add photo here
  },
];

export function TeamSection() {
  return (
    <section className="section-padding" id="team">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
              The Team
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Small team.
            <br />
            <span className="text-terracotta">Big output.</span>
          </h2>
          <p className="mt-4 text-lg text-richblack/50 dark:text-cream/50 max-w-xl">
            We&apos;re not a 200-person agency where you talk to a PM who
            talks to a dev who never talks to you. You work directly with
            the people building your product.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 overflow-hidden transition-all duration-500 hover:border-terracotta/30 hover:shadow-xl"
              >
                {/* Photo */}
                <div className="relative h-72 bg-gradient-to-br from-stone/20 to-stone/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-6xl font-bold text-richblack/5 dark:text-cream/5">
                      {member.name.split(" ")[0][0]}
                      {member.name.split(" ")[1][0]}
                    </span>
                  </div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold group-hover:text-terracotta transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-terracotta font-medium">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-richblack/50 dark:text-cream/50">
                    {member.expertise}
                  </p>
                  <div className="mt-4 pt-4 border-t border-stone/10 dark:border-stone-dark/10">
                    <p className="font-mono text-xs text-richblack/30 dark:text-cream/30">
                      {member.tools}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}