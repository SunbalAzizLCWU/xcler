import { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | XCLER — Transparent Web Development Pricing",
  description:
    "Transparent pricing for web development, app development, WordPress, Shopify, automation, and AI services. Projects start from €150. No hidden fees.",
};

const packages = [
  {
    name: "Starter",
    price: "€150",
    period: "starting from",
    description: "Perfect for small businesses needing an online presence.",
    features: [
      "Landing page or single-page website",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "1 round of revisions",
      "Delivery in 1-2 weeks",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "€1,500",
    period: "starting from",
    description: "For businesses ready to scale with a full digital presence.",
    features: [
      "Multi-page custom website or web app",
      "Custom design & branding",
      "Advanced SEO optimization",
      "CMS integration (WordPress/Shopify)",
      "Workflow automation setup",
      "3 rounds of revisions",
      "Delivery in 3-5 weeks",
      "30 days post-launch support",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "€5,000+",
    period: "starting from",
    description:
      "Full-scale digital ecosystems for businesses that demand the best.",
    features: [
      "Custom web application",
      "Mobile app (iOS & Android)",
      "AI chatbot / call agent integration",
      "Full workflow automation",
      "API development & integrations",
      "Unlimited revisions",
      "Dedicated project manager",
      "Priority support & maintenance",
      "Training & documentation",
    ],
    cta: "Let's Talk",
    popular: false,
  },
];

const addons = [
  { name: "Workflow Automation Setup", price: "From €200" },
  { name: "AI Chatbot Integration", price: "From €300" },
  { name: "AI Call Agent Setup", price: "From €500" },
  { name: "Monthly Maintenance", price: "From €50/mo" },
  { name: "SEO Content Writing (per article)", price: "From €50" },
  { name: "Additional Pages", price: "From €50/page" },
];

export default function PricingPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                Pricing
              </span>
              <div className="line-decoration" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Honest pricing.
              <br />
              <span className="text-terracotta">No surprises.</span>
            </h1>
            <p className="mt-4 text-lg text-richblack/50 dark:text-cream/50">
              Every project is unique. These are starting points — we&apos;ll give
              you an exact quote after understanding your needs.
            </p>
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <AnimatedSection key={pkg.name} delay={i * 0.15}>
              <div
                className={`relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pkg.popular
                    ? "border-terracotta bg-terracotta/5 dark:bg-terracotta/10"
                    : "border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-terracotta px-4 py-1 text-xs font-heading font-medium text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="font-heading text-xl font-semibold">
                  {pkg.name}
                </h3>
                <div className="mt-4">
                  <span className="font-heading text-4xl font-bold">
                    {pkg.price}
                  </span>
                  <span className="text-sm text-richblack/40 dark:text-cream/40 ml-2">
                    {pkg.period}
                  </span>
                </div>
                <p className="mt-2 text-sm text-richblack/50 dark:text-cream/50">
                  {pkg.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-sage"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-8 block w-full rounded-xl py-3 text-center font-heading font-medium transition-all ${
                    pkg.popular
                      ? "bg-terracotta text-white hover:bg-terracotta-dark"
                      : "border border-stone/20 dark:border-stone-dark/20 hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Add-ons */}
        <AnimatedSection>
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold text-center mb-8">
              Add-ons & Extras
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {addons.map((addon) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between rounded-xl border border-stone/10 dark:border-stone-dark/10 p-4"
                >
                  <span className="text-sm font-medium">{addon.name}</span>
                  <span className="font-mono text-sm text-terracotta">
                    {addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection>
          <div className="mt-20 text-center">
            <p className="text-richblack/50 dark:text-cream/50 text-lg">
              Not sure which package fits?{" "}
              <a
                href="https://wa.me/923154823517"
                className="text-terracotta underline underline-offset-2"
              >
                WhatsApp us
              </a>{" "}
              and we&apos;ll help you figure it out in 5 minutes.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}