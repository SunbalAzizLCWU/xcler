import { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "WordPress & Shopify Development Germany | XCLER",
  description:
    "Professional WordPress and Shopify development. E-commerce stores, custom themes, plugins, WooCommerce. Expert CMS development for German businesses.",
};

export default function WordPressShopifyPage() {
  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <AnimatedSection>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-richblack/40 dark:text-cream/40 hover:text-terracotta transition-colors mb-8"
          >
            ← All Services
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
              Service / 03
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            WordPress &
            <br />
            <span className="text-terracotta">Shopify.</span>
          </h1>
          <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50 max-w-2xl">
            Not every project needs custom code. Sometimes WordPress or Shopify
            is the right tool — and when it is, we make it sing. Custom themes,
            optimized performance, e-commerce that converts.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "WordPress Websites", desc: "Custom themes, plugin development, speed optimization. Not your average WordPress site — ours actually load fast." },
              { title: "Shopify Stores", desc: "Custom Shopify themes, app integrations, checkout optimization. E-commerce stores built to sell." },
              { title: "WooCommerce", desc: "Full e-commerce setup on WordPress. Payment gateways, shipping, inventory — all configured and tested." },
              { title: "Migration & Optimization", desc: "Already have a slow WordPress or Shopify site? We fix it. Speed optimization, security, SEO cleanup." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-6">
                <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-richblack/60 dark:text-cream/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-20 rounded-2xl bg-richblack dark:bg-cream/5 p-10 text-cream text-center">
            <h2 className="font-heading text-3xl font-bold">Need a WordPress or Shopify site?</h2>
            <p className="mt-3 text-cream/60">Led by Mehru Seemab, our CMS specialist with years of experience.</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
            >
              Start Your Project →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
