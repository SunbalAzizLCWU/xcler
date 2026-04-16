import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getTranslations } from "next-intl/server";

export async function ProcessSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Process" });

  const steps = [
    {
      number: "01",
      title: t("step1.title"),
      description: t("step1.description"),
      duration: t("step1.duration"),
    },
    {
      number: "02",
      title: t("step2.title"),
      description: t("step2.description"),
      duration: t("step2.duration"),
    },
    {
      number: "03",
      title: t("step3.title"),
      description: t("step3.description"),
      duration: t("step3.duration"),
    },
    {
      number: "04",
      title: t("step4.title"),
      description: t("step4.description"),
      duration: t("step4.duration"),
    },
  ];

  return (
    <section className="section-padding bg-cream dark:bg-charcoal" id="process">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("headingLine1")}
            <br />
            <span className="text-terracotta">{t("headingLine2")}</span>
          </h2>
        </AnimatedSection>

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-stone/20 dark:bg-stone-dark/20 hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.15} direction="left">
                <div className="flex gap-8 md:gap-16 items-start">
                  {/* Number */}
                  <div className="relative hidden md:block">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-stone/20 dark:border-stone-dark/20 bg-cream dark:bg-charcoal">
                      <span className="font-mono text-sm font-semibold text-terracotta">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-8 transition-all duration-300 hover:border-terracotta/20 hover:shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs text-terracotta md:hidden">
                          {step.number}
                        </span>
                        <h3 className="font-heading text-2xl font-semibold mt-1">
                          {step.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-sage/10 px-3 py-1 font-mono text-xs text-sage-dark dark:text-sage-light">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-3 text-richblack/60 dark:text-cream/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}