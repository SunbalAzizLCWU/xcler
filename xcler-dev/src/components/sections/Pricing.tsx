import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export async function Pricing({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Pricing" });

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
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-light">
                {t("eyebrow")}
              </span>
              <div className="line-decoration" />
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t("headingLine1")}
              <br />
              <span className="text-gradient-signal">{t("headingLine2")}</span>
            </h1>
            <p className="mt-4 text-lg text-cream/60">{t("introDescription")}</p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <AnimatedSection key={pkg.name} delay={i * 0.15} className="h-full">
              <div
                className={`panel panel-hover relative flex h-full flex-col p-8 ${
                  pkg.popular ? "border-sage/40 bg-sage/5" : ""
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 bg-sage px-4 py-1 font-heading text-xs font-medium text-richblack">
                    {t("popularBadge")}
                  </span>
                )}

                <h3 className="font-heading text-xl font-semibold">{pkg.name}</h3>
                <div className="mt-4">
                  <span className="font-heading text-4xl font-bold">{pkg.price}</span>
                  <span className="ml-2 text-sm text-cream/40">{pkg.period}</span>
                </div>
                <p className="mt-2 text-sm text-cream/55">{pkg.description}</p>

                <ul className="mt-8 flex-1 space-y-3">
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
                      <span className="text-sm text-cream/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-8 block w-full py-3 text-center font-heading font-medium transition-all ${
                    pkg.popular
                      ? "btn-signal"
                      : "btn-ghost"
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
            <h2 className="mb-8 text-center font-heading text-2xl font-bold">
              {t("addonsHeading")}
            </h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {addons.map((addon) => (
                <div
                  key={addon.name}
                  className="panel flex items-center justify-between p-4"
                >
                  <span className="text-sm font-medium">{addon.name}</span>
                  <span className="font-mono text-sm text-sage">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-20 text-center">
            <p className="text-lg text-cream/55">
              {t("bottomCtaPrefix")}{" "}
              <a
                href="https://wa.me/923154823517"
                className="text-sage underline underline-offset-2"
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
