import { getTranslations } from "next-intl/server";
import { HeroExperience } from "@/components/sections/HeroExperience";

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Hero" });
  const rotatingWords = t.raw("rotatingWordsList") as string[];

  return (
    <HeroExperience
      locale={locale}
      headlineTop={t("headlineTop")}
      headlineBottom={t("headlineBottom")}
      supportLine={t("supportLine")}
      subtitle={t("subtitle")}
      cta={t("cta")}
      secondaryCta={t("secondaryCta")}
      scrollLabel={t("scrollLabel")}
      availabilityBadge={t("availabilityBadge")}
      rotatingWords={rotatingWords}
      trustItems={[t("trust.projectsFrom"), t("trust.experience"), t("trust.region")]}
      systemsLabel={locale === "de" ? "Systeme in Produktion" : "Systems in production"}
    />
  );
}
