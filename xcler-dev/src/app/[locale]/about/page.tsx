import { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About Us | XCLER — Meet Our Team",
  description:
    "Meet the team behind XCLER. A small, dedicated team of developers and automation experts building exceptional digital products for businesses in Germany and EU.",
};

export default function AboutPage() {
  const t = useTranslations("About");

  const team = [
    {
      name: "Musharraf Aziz",
      role: t("team.member1.role"),
      expertise: t("team.member1.expertise"),
      tools: t("team.member1.tools"),
      bio: t("team.member1.bio"),
    },
    {
      name: "Abeel Mehr",
      role: t("team.member2.role"),
      expertise: t("team.member2.expertise"),
      tools: t("team.member2.tools"),
      bio: t("team.member2.bio"),
    },
    {
      name: "Mehru Seemab",
      role: t("team.member3.role"),
      expertise: t("team.member3.expertise"),
      tools: t("team.member3.tools"),
      bio: t("team.member3.bio"),
    },
  ];

  const values = [
    {
      title: t("values.value1.title"),
      description: t("values.value1.description"),
    },
    {
      title: t("values.value2.title"),
      description: t("values.value2.description"),
    },
    {
      title: t("values.value3.title"),
      description: t("values.value3.description"),
    },
    {
      title: t("values.value4.title"),
      description: t("values.value4.description"),
    },
  ];

  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("headingLine1")}
              <br />
              <span className="text-terracotta">{t("headingLine2")}</span>
            </h1>
            <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50">
              {t("introDescription")}
            </p>
          </div>
        </AnimatedSection>

        {/* Team */}
        <div className="mt-20">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold mb-10">
              {t("teamHeading")}
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
                        {t("expertiseLabel")}
                      </p>
                      <p className="text-sm text-richblack/60 dark:text-cream/60">
                        {member.expertise}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-richblack/40 dark:text-cream/40 uppercase tracking-wider mb-2">
                        {t("toolsLabel")}
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
              {t("valuesHeading")}
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
              {t("ctaHeading")}
            </h2>
            <p className="mt-3 text-cream/60 max-w-lg mx-auto">
              {t("ctaDescription")}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3 font-heading font-medium text-white hover:bg-terracotta-light transition-colors"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
