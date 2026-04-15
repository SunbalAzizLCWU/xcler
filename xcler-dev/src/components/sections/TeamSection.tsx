import Image from "next/image";
import { groq } from "next-sanity";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type TeamMemberFromSanity = {
  _id: string;
  name?: string;
  role?: string;
  bio?: string;
  image?: unknown;
  imageAlt?: string;
};

type TeamMemberCard = {
  _id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  tools: string;
  image: string;
  imageAlt?: string;
  imageUrl?: string;
};

const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(_createdAt asc) {
    _id,
    name,
    "role": select($locale == "de" => coalesce(role_de, role_en), coalesce(role_en, role_de)),
    "bio": select($locale == "de" => coalesce(bio_de, bio_en), coalesce(bio_en, bio_de)),
    image,
    "imageAlt": coalesce(image.alt, name, "Team member")
  }
`;

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "TM";
  if (parts.length === 1) return (parts[0].charAt(0) || "T").toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
};

export async function TeamSection() {
  const t = await getTranslations("Team");
  const locale = await getLocale();

  const sanityTeam = await client.fetch<TeamMemberFromSanity[]>(teamMembersQuery, { locale });

  const fallbackTeam: TeamMemberCard[] = [
    {
      _id: "fallback-musharraf",
      name: "Musharraf Aziz",
      role: t("member1.role"),
      expertise: t("member1.expertise"),
      bio: t("member1.bio"),
      tools: "Make.com, n8n, Zapier, GoHighLevel",
      image: "/team/musharraf.jpg",
      imageAlt: "Musharraf Aziz",
    },
    {
      _id: "fallback-abeel",
      name: "Abeel Mehr",
      role: t("member2.role"),
      expertise: t("member2.expertise"),
      bio: t("member2.bio"),
      tools: "Next.js, Python, FastAPI, Flask, CI/CD",
      image: "/team/abeel.jpg",
      imageAlt: "Abeel Mehr",
    },
    {
      _id: "fallback-mehru",
      name: "Mehru Seemab",
      role: t("member3.role"),
      expertise: t("member3.expertise"),
      bio: t("member3.bio"),
      tools: "WordPress, Shopify, WooCommerce, Liquid",
      image: "/team/mehru.jpg",
      imageAlt: "Mehru Seemab",
    },
  ];

  const team: TeamMemberCard[] = sanityTeam.length
    ? sanityTeam.map((member) => ({
        _id: member._id,
        name: member.name || "Team Member",
        role: member.role || (locale === "de" ? "Teammitglied" : "Team Member"),
        expertise: locale === "de" ? "Spezialist" : "Specialist",
        bio: member.bio || (locale === "de" ? "Profil wird aktualisiert." : "Profile is being updated."),
        tools: locale === "de" ? "Technologien auf Anfrage" : "Technologies on request",
        image: "/team/musharraf.jpg",
        imageAlt: member.imageAlt || member.name || "Team member",
        imageUrl: member.image ? urlFor(member.image).width(900).height(980).fit("crop").quality(80).url() : undefined,
      }))
    : fallbackTeam;

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
          <p className="mt-4 text-lg text-richblack/70 dark:text-cream/82 max-w-xl">
            {t("intro")}
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <AnimatedSection key={member._id} delay={i * 0.15} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-xl">
                {/* Photo */}
                <div className="relative h-72 bg-gradient-to-br from-stone/20 to-stone/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-6xl font-bold text-richblack/5 dark:text-cream/5">
                      {getInitials(member.name)}
                    </span>
                  </div>
                  {member.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.imageUrl}
                      alt={member.imageAlt || member.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={member.image}
                      alt={member.imageAlt || member.name}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-semibold group-hover:text-terracotta transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-terracotta font-medium">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-richblack/70 dark:text-cream/80">
                    {member.expertise}
                  </p>
                  <p className="mt-3 text-sm text-richblack/70 dark:text-cream/80">
                    {member.bio}
                  </p>
                  <div className="mt-auto pt-4 border-t border-stone/10 dark:border-stone-dark/10">
                    <p className="font-mono text-xs text-richblack/60 dark:text-cream/75">
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