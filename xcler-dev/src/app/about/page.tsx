import { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About Us | XCLER — Meet Our Team",
  description:
    "Meet the team behind XCLER. A small, dedicated team of developers and automation experts building exceptional digital products for businesses in Germany and EU.",
};

const team = [
  {
    name: "Musharraf Aziz",
    role: "Founder & Automation Lead",
    expertise: "Workflow Automation • AI Agents • RAG Systems",
    tools: "Make.com, n8n, Zapier, GoHighLevel, AI Call Agents",
    bio: "3+ years turning manual business processes into automated systems. Obsessed with efficiency and making technology work for people, not against them.",
  },
  {
    name: "Abeel Mehr",
    role: "Full Stack Developer",
    expertise: "Web & App Development • API Architecture • CI/CD",
    tools: "Next.js, React, Python, FastAPI, Flask, Docker",
    bio: "Builds web applications and mobile apps that are fast, scalable, and maintainable. Strong focus on clean architecture and production-ready code.",
  },
  {
    name: "Mehru Seemab",
    role: "CMS & Frontend Developer",
    expertise: "WordPress • Shopify • E-commerce",
    tools: "WordPress, Shopify, WooCommerce, Liquid, PHP",
    bio: "Specializes in CMS-based solutions that clients can actually manage themselves. E-commerce stores that convert and content sites that rank.",
  },
];

const values = [
  {
    title: "No Bullshit",
    description: "We say what we mean. If something will take 4 weeks, we say 4 weeks — not 2 weeks to win the deal.",
  },
  {
    title: "Customer First",
    description: "Your business goals drive every decision. We don't build what's trendy — we build what works for YOU.",
  },
  {
    title: "Fast Delivery",
    description: "Small team = no bureaucracy. We move fast, communicate directly, and ship ahead of schedule.",
  },
  {
    title: "Long-Term Thinking",
    description: "We don't disappear after launch. We offer retention packages because your product needs ongoing care.",
  },
];

export default function AboutPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                About Us
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Small team.
              <br />
              <span className="text-terracotta">Big ambitions.</span>
            </h1>
            <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50">
              We&apos;re not a 200-person agency with 17 layers of management.
              We&apos;re three specialists who love building things that work. When
              you hire XCLER, you work directly with the people writing the code.
            </p>
          </div>
        </AnimatedSection>

        {/* Team */}
        <div className="mt-20">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold mb-10">
              The People Behind the Code
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.15}>
                <div className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 overflow-hidden">
                  {/* Photo placeholder */}
                  <div className="h-72 bg-gradient-to-br from-stone/20 to-stone/5 flex items-center justify-center">
                    <span className="font-heading text-6xl font-bold text-richblack/5 dark:text-cream/5">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold">
                      {member.name}
                    </h3>
                    <p className="text-sm text-terracotta font-medium mt-1">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm text-richblack/60 dark:text-cream/60 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="mt-4 pt-4 border-t border-stone/10 dark:border-stone-dark/10">
                      <p className="text-xs text-richblack/40 dark:text-cream/40 uppercase tracking-wider mb-2">
                        Expertise
                      </p>
                      <p className="text-sm text-richblack/60 dark:text-cream/60">
                        {member.expertise}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-richblack/40 dark:text-cream/40 uppercase tracking-wider mb-2">
                        Tools
                      </p>
                      <p className="font-mono text-xs text-richblack/50 dark:text-cream/50">
                        {member.tools}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold mb-10">
              How We Work
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-6">
                  <h3 className="font-heading text-xl font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-richblack/60 dark:text-cream/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection>
          <div className="mt-20 rounded-2xl bg-richblack dark:bg-cream/5 p-10 text-cream text-center">
            <h2 className="font-heading text-3xl font-bold">
              Want to work with us?
            </h2>
            <p className="mt-3 text-cream/60 max-w-lg mx-auto">
              We&apos;re always looking for interesting projects. If you have an
              idea, let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
            >
              Start a Project →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
