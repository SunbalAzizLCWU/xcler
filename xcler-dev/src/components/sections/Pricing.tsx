import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Pricing() {
  const t = useTranslations("Pricing");

  const packages = [
    {
      name: t("package1.name"),
      price: "€150",
      period: t("startingFrom"),
      description: t("package1.description"),
      features: [
        t("package1.features.feature1"),
        t("package1.features.feature2"),
        t("package1.features.feature3"),
        t("package1.features.feature4"),
        t("package1.features.feature5"),
        t("package1.features.feature6"),
      ],
      cta: t("package1.cta"),
      popular: false,
    },
    {
      name: t("package2.name"),
      price: "€1,500",
      period: t("startingFrom"),
      description: t("package2.description"),
      features: [
        t("package2.features.feature1"),
        t("package2.features.feature2"),
        t("package2.features.feature3"),
        t("package2.features.feature4"),
        t("package2.features.feature5"),
        t("package2.features.feature6"),
        t("package2.features.feature7"),
        t("package2.features.feature8"),
      ],
      cta: t("package2.cta"),
      popular: true,
    },
    {
      name: t("package3.name"),
      price: "€5,000+",
      period: t("startingFrom"),
      description: t("package3.description"),
      features: [
        t("package3.features.feature1"),
        t("package3.features.feature2"),
        t("package3.features.feature3"),
        t("package3.features.feature4"),
        t("package3.features.feature5"),
        t("package3.features.feature6"),
        t("package3.features.feature7"),
        t("package3.features.feature8"),
        t("package3.features.feature9"),
      ],
      cta: t("package3.cta"),
      popular: false,
    },
  ];

  const addons = [
    { name: t("addons.item1.name"), price: t("addons.item1.price") },
    { name: t("addons.item2.name"), price: t("addons.item2.price") },
    { name: t("addons.item3.name"), price: t("addons.item3.price") },
    { name: t("addons.item4.name"), price: t("addons.item4.price") },
    { name: t("addons.item5.name"), price: t("addons.item5.price") },
    { name: t("addons.item6.name"), price: t("addons.item6.price") },
  ];

  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                {t("eyebrow")}
              </span>
              <div className="line-decoration" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("headingLine1")}
              <br />
              <span className="text-terracotta">{t("headingLine2")}</span>
            </h1>
            <p className="mt-4 text-lg text-richblack/50 dark:text-cream/50">
              {t("introDescription")}
            </p>
          </div>
        </AnimatedSection>

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
                    {t("popularBadge")}
                  </span>
                )}

                <h3 className="font-heading text-xl font-semibold">{pkg.name}</h3>
                <div className="mt-4">
                  <span className="font-heading text-4xl font-bold">{pkg.price}</span>
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

        <AnimatedSection>
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold text-center mb-8">
              {t("addonsHeading")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {addons.map((addon) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between rounded-xl border border-stone/10 dark:border-stone-dark/10 p-4"
                >
                  <span className="text-sm font-medium">{addon.name}</span>
                  <span className="font-mono text-sm text-terracotta">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-20 text-center">
            <p className="text-richblack/50 dark:text-cream/50 text-lg">
              {t("bottomCtaPrefix")} {" "}
              <a
                href="https://wa.me/923154823517"
                className="text-terracotta underline underline-offset-2"
              >
                {t("bottomCtaLink")}
              </a>{" "}
              {t("bottomCtaSuffix")}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
