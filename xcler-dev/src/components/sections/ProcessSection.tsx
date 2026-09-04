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
    <section className="section-padding bg-charcoal" id="process">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="line-decoration" />
            <span className="font-mono text-xs tracking-[0.3em] text-stone-light uppercase">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("headingLine1")}
            <br />
            <span className="text-gradient-signal">{t("headingLine2")}</span>
          </h2>
        </AnimatedSection>

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 hidden w-[1px] bg-cream/10 md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.15} direction="left">
                <div className="flex items-start gap-8 md:gap-16">
                  <div className="relative hidden md:block">
                    <div className="flex h-16 w-16 items-center justify-center border border-cream/15 bg-richblack">
                      <span className="font-mono text-sm font-semibold text-sage">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className="panel panel-hover flex-1 p-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs text-sage md:hidden">
                          {step.number}
                        </span>
                        <h3 className="mt-1 font-heading text-2xl font-semibold">
                          {step.title}
                        </h3>
                      </div>
                      <span className="border border-sage/25 bg-sage/10 px-3 py-1 font-mono text-xs text-sage">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-3 leading-relaxed text-cream/65">
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