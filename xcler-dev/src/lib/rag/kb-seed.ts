import type { RetrievedChunk } from "./retrieve";

/** Used only if the local KB index cannot be loaded in production. */
export const KB_SEED_CHUNKS: RetrievedChunk[] = [
  {
    id: "seed-overview",
    heading: "What XCLER is",
    title: "About XCLER",
    sourceUrl: "https://xcler.dev/en/about",
    score: 1,
    content:
      "XCLER (xcler.dev) is an AI automation agency. XCLER builds AI chatbots, RAG agents, AI call agents and workflow automation with n8n and Make.com for B2B teams. When an automation needs a product surface, XCLER also delivers Next.js web development, custom SaaS and app development, and Shopify or WordPress commerce. XCLER is AI automation first: chatbots, agents, retrieval-augmented generation and workflows that remove manual work from support, sales and operations. The team is three specialists. Primary market is Germany and DACH, plus remote delivery for the Netherlands, Belgium and the United States.",
  },
  {
    id: "seed-pricing",
    heading: "Starter package — from €150",
    title: "XCLER Pricing and Packages",
    sourceUrl: "https://xcler.dev/en/pricing",
    score: 0.9,
    content:
      "XCLER publishes transparent starting-from prices. The final price depends on scope after a short discovery. Starter package from €150: landing page or single-page website, mobile responsive design, basic SEO, contact form, 1 round of revisions, delivery in 1–2 weeks. Professional package from €1,500. For a recommendation, WhatsApp +92 315 4823517 or email hello@xcler.dev.",
  },
  {
    id: "seed-contact",
    heading: "How to contact XCLER",
    title: "Contact XCLER",
    sourceUrl: "https://xcler.dev/en/contact",
    score: 0.8,
    content:
      "Contact XCLER via the form at https://xcler.dev/en/contact or https://xcler.dev/kontakt, email hello@xcler.dev, or WhatsApp +92 315 4823517. Business hours Monday to Friday, 09:00–18:00 CET. Response within 24 hours on business days.",
  },
];
