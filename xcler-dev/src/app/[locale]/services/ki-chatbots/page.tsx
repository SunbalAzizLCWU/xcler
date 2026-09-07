import { permanentRedirect } from "next/navigation";

/**
 * Legacy route kept only so next-intl pathnames stay consistent.
 * Canonical destination: /services/ai-chatbots-agents (and DE equivalent via next.config).
 */
export default async function LegacyKiChatbotsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(
    locale === "en" ? "/en/services/ai-chatbots-agents" : "/leistungen/ki-chatbots-agenten"
  );
}
