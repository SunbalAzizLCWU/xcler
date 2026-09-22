import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getTranslations } from "next-intl/server";

type TeamMemberCard = {
  _id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  tools: string;
  image: string;
  imageAlt?: string;
  imagePosition: string;
};

const objectPositionMap: Record<string, string> = {
  center: "center center",
  top: "center top",
  bottom: "center bottom",
  "top-left": "left top",
  "top-right": "right top",
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "TM";
  if (parts.length === 1) return (parts[0].charAt(0) || "T").toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
};

export async function TeamSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Team" });

  const team: TeamMemberCard[] = [
    {
      _id: "musharraf",
      name: "Musharraf Aziz",
      role: t("member1.role"),
      expertise: t("member1.expertise"),
      bio: t("member1.bio"),
      tools: "Make.com, n8n, Zapier, GoHighLevel",
      image: "/team/musharraf.webp",
      imageAlt: "Musharraf Aziz, XCLER AI automation engineer for chatbots and workflows",
      imagePosition: objectPositionMap.center,
    },
    {
      _id: "abeel",
      name: "Abeel Mehr",
      role: t("member2.role"),
      expertise: t("member2.expertise"),
      bio: t("member2.bio"),
      tools: "Next.js, Python, FastAPI, Flask, CI/CD",
      image: "/team/abeel.webp",
      imageAlt: "Abeel Mehr, XCLER web and app development lead",
      imagePosition: objectPositionMap.center,
    },
    {
      _id: "mehru",
      name: "Mehru Seemab",
      role: t("member3.role"),
      expertise: t("member3.expertise"),
      bio: t("member3.bio"),
      tools: "WordPress, Shopify, WooCommerce, Liquid",
      image: "/team/mehru.webp",
      imageAlt: "Mehru Seemab, XCLER WordPress and Shopify commerce specialist",
      imagePosition: objectPositionMap.center,
    },
  ];

  return (
    <section className="section-padding" id="team">
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
          <p className="mt-4 max-w-xl text-lg text-cream/75">
            {t("intro")}
          </p>
        </AnimatedSection>

        <div className="mx-auto mt-16 grid max-w-[72rem] grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {team.map((member, i) => (
            <AnimatedSection key={member._id} delay={i * 0.15} className="h-full">
              <div className="panel panel-hover group mx-auto flex h-full w-full max-w-[22rem] flex-col overflow-hidden">
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-charcoal to-richblack md:h-[22rem]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-6xl font-bold text-cream/5">
                      {getInitials(member.name)}
                    </span>
                  </div>
                  <Image
                    src={member.image}
                    alt={member.imageAlt || member.name}
                    width={720}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover contrast-[1.05] saturate-[0.85] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
                    style={{ objectPosition: member.imagePosition }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-richblack via-transparent to-sage/5 mix-blend-multiply"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-semibold transition-colors group-hover:text-sage">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-sage">
                    {member.role}
                  </p>
                  {member.expertise ? (
                    <p className="mt-3 text-sm text-cream/75">
                      {member.expertise}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-cream/75">
                    {member.bio}
                  </p>
                  {member.tools ? (
                    <div className="mt-auto pt-4 border-t border-cream/10">
                      <p className="font-mono text-xs text-cream/60">
                        {member.tools}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
