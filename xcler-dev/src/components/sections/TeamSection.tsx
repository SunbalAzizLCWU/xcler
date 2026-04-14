import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getTranslations } from "next-intl/server";

export async function TeamSection() {
  const t = await getTranslations("Team");

  const team = [
    {
      name: "Musharraf Aziz",
      role: t("member1.role"),
      expertise: t("member1.expertise"),
      bio: t("member1.bio"),
      tools: "Make.com, n8n, Zapier, GoHighLevel",
      image: "/team/musharraf.jpg",
    },
    {
      name: "Abeel Mehr",
      role: t("member2.role"),
      expertise: t("member2.expertise"),
      bio: t("member2.bio"),
      tools: "Next.js, Python, FastAPI, Flask, CI/CD",
      image: "/team/abeel.jpg",
    },
    {
      name: "Mehru Seemab",
      role: t("member3.role"),
      expertise: t("member3.expertise"),
      bio: t("member3.bio"),
      tools: "WordPress, Shopify, WooCommerce, Liquid",
      image: "/team/mehru.jpg",
    },
  ];

  return (
    <section className="section-padding" id="team">
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
          <p className="mt-4 text-lg text-richblack/50 dark:text-cream/50 max-w-xl">
            {t("intro")}
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.15} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-xl">
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
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-semibold group-hover:text-terracotta transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-terracotta font-medium">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-richblack/50 dark:text-cream/50">
                    {member.expertise}
                  </p>
                  <p className="mt-3 text-sm text-richblack/50 dark:text-cream/50">
                    {member.bio}
                  </p>
                  <div className="mt-auto pt-4 border-t border-stone/10 dark:border-stone-dark/10">
                    <p className="font-mono text-xs text-richblack/30 dark:text-cream/30">
                      {member.tools}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}