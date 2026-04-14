import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Image from "next/image";

type ServicesPageItem = {
  number: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
  lead: string;
};

const leadAvatars: Record<string, string> = {
  "abeel mehr": "/team/abeel.jpg",
  "mehru seemab": "/team/mehru.jpg",
  "musharraf aziz": "/team/musharraf.jpg",
};

function getLeadAvatar(name: string): string | null {
  return leadAvatars[name.trim().toLowerCase()] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const services = t.raw("services") as ServicesPageItem[];

  return (
    <section className="section-padding pt-32">
      <div className="container-custom">
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
            <p className="mt-6 text-lg text-richblack/50 dark:text-cream/50 max-w-2xl">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-20 space-y-8">
          {services.map((service, i) => (
            <AnimatedSection key={service.number} delay={i * 0.1}>
              <Link href={service.href} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-stone/10 dark:border-stone-dark/10 bg-white dark:bg-richblack/30 p-8 transition-all duration-500 hover:border-terracotta/20 hover:shadow-xl hover:-translate-y-1">
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="font-mono text-sm text-stone dark:text-stone-dark">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="lg:col-span-5">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-terracotta transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-richblack/60 dark:text-cream/60 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Tech & Lead */}
                  <div className="lg:col-span-4">
                    <p className="text-xs text-richblack/30 dark:text-cream/30 uppercase tracking-wider mb-3">
                      {t("technologiesLabel")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-stone/10 dark:bg-stone-dark/10 px-3 py-1 font-mono text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      {getLeadAvatar(service.lead) ? (
                        <div className="relative h-6 w-6 overflow-hidden rounded-full">
                          <Image
                            src={getLeadAvatar(service.lead)!}
                            alt={service.lead}
                            fill
                            className="object-cover"
                            sizes="24px"
                          />
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-stone/20" />
                      )}
                      <span className="text-sm text-richblack/40 dark:text-cream/40">
                        {t("ledBy")} {service.lead}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="lg:col-span-2 flex items-center justify-end">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-stone/20 dark:border-stone-dark/20 transition-all group-hover:border-terracotta group-hover:bg-terracotta group-hover:text-white">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection>
          <div className="mt-20 text-center">
            <p className="text-richblack/50 dark:text-cream/50 text-lg">
              {t("ctaPrefix")} {" "}
              <a
                href="https://wa.me/923154823517"
                className="text-terracotta underline underline-offset-2"
              >
                {t("ctaLink")}
              </a>{" "}
              {t("ctaSuffix")}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
