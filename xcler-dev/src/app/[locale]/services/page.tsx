import type { Metadata } from "next";
import type { ComponentProps } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceCatalogSchema } from "@/lib/structuredData";
import { buildPageLinkedDataGraph } from "@/lib/pageLinkedData";
import { buildPageMetadata } from "@/lib/seoMeta";

type ServicesPageItem = {
  number: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
  lead: string;
};

type LocalizedHref = ComponentProps<typeof Link>["href"];

const leadAvatars: Record<string, string> = {
  "abeel mehr": "/team/abeel.webp",
  "mehru seemab": "/team/mehru.webp",
  "musharraf aziz": "/team/musharraf.webp",
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

  return buildPageMetadata({
    locale,
    path: "/services",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locale === "en" ? "en" : "de";
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const services = t.raw("services") as ServicesPageItem[];
  const schemaItems = services.map((service) => ({
    name: service.title,
    description: service.description,
    href: service.href,
  }));
  const catalog = getServiceCatalogSchema(resolvedLocale, schemaItems);
  const { "@context": _ctx, ...catalogNode } = catalog as Record<string, unknown> & {
    "@context"?: string;
  };
  void _ctx;
  const pageGraph = buildPageLinkedDataGraph({
    locale: resolvedLocale,
    path: "/services",
    name: t("metaTitle"),
    description: t("metaDescription"),
    breadcrumbs: [
      { name: "XCLER", path: "/" },
      { name: resolvedLocale === "de" ? "Leistungen" : "Services", path: "/services" },
    ],
    entities: [catalogNode],
  });

  return (
    <>
      <JsonLd id={`page-graph-services-${locale}`} data={pageGraph} />
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-4">
                <div className="line-decoration" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-light">
                  {t("eyebrow")}
                </span>
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {t("headingLine1")}
                <br />
                <span className="text-gradient-signal">{t("headingLine2")}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-cream/60">{t("description")}</p>
            </div>
          </AnimatedSection>

          <div className="mt-20 space-y-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.number} delay={i * 0.1}>
                <Link href={service.href as LocalizedHref} className="group block">
                  <div className="panel panel-hover grid grid-cols-1 gap-6 p-8 lg:grid-cols-12">
                    <div className="lg:col-span-1">
                      <span className="font-mono text-sm text-sage">{service.number}</span>
                    </div>

                    <div className="lg:col-span-5">
                      <h2 className="font-heading text-2xl font-bold transition-colors group-hover:text-sage md:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-cream/65">{service.description}</p>
                    </div>

                    <div className="lg:col-span-4">
                      <p className="mb-3 text-xs uppercase tracking-wider text-cream/35">
                        {t("technologiesLabel")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tech.map((tech) => (
                          <span
                            key={tech}
                            className="border border-cream/10 bg-cream/5 px-3 py-1 font-mono text-xs"
                          >
                            {tech}
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
                        <span className="text-sm text-cream/45">
                          {t("ledBy")} {service.lead}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end lg:col-span-2">
                      <div className="flex h-12 w-12 items-center justify-center border border-cream/15 transition-all group-hover:border-sage group-hover:bg-sage group-hover:text-richblack">
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

          <AnimatedSection>
            <div className="mt-20 text-center">
              <p className="text-lg text-cream/55">
                {t("ctaPrefix")}{" "}
                <a
                  href="https://wa.me/923154823517"
                  className="text-sage underline underline-offset-2"
                >
                  {t("ctaLink")}
                </a>{" "}
                {t("ctaSuffix")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
