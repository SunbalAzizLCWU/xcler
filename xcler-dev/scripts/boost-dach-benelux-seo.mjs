/**
 * Boost DACH + Benelux local SEO strings in EN/DE message catalogs.
 * Remote delivery only — no fake local storefronts in NL/BE.
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("messages");

function boost(locale, data) {
  const hero = data.Hero;
  const home = data.HomeSeo;
  const meta = data.Metadata;
  const ai = data.ServiceAiChatbotsPage;
  const wf = data.ServiceWorkflowAutomationPage;
  const faq = data.FAQ;

  if (locale === "en") {
    hero.subtitle =
      "We are XCLER, a Berlin digital agency for AI engineering, workflow automation, and web development. We offer AI chatbots and agents, Make.com and n8n automation, and Next.js platforms for B2B teams across Germany, DACH, the Netherlands, and Belgium — including Berlin, Munich, Hamburg, Frankfurt, Cologne, Amsterdam, Rotterdam, and Brussels — plus remote US clients in California, Florida, and Chicago.";
    home.intro = hero.subtitle;
    meta.homeDescription =
      "We offer AI chatbots, RAG agents, Make.com and n8n automation, and Next.js development for Germany, DACH, the Netherlands, Belgium, and US markets we serve.";
    meta.siteDescription =
      "We are XCLER. We offer AI chatbots and agents, workflow automation, web development, and app development for businesses in Germany, DACH, the Netherlands, Belgium, and the US markets we serve including California, Florida, and Chicago.";
    meta.pageDescription = meta.siteDescription;

    ai.seoLede =
      "We build AI chatbots and agents for production teams that need grounded answers, retrieval quality, and clear escalation. XCLER delivers bilingual assistants with tool calling, evaluation, and CRM handoffs for Germany, DACH, the Netherlands, and Belgium — including Berlin, Munich, Hamburg, Amsterdam, and Rotterdam — plus remote US clients in California, Florida, and Chicago.";
    ai.metaDescription =
      "We build AI chatbots and agents with RAG for Germany, DACH, the Netherlands, and Belgium. XCLER delivers assistants with evaluation and CRM handoffs.";
    if (ai.hero) ai.hero.paragraph = ai.seoLede;

    wf.seoLede =
      "We implement workflow automation with Make.com and n8n so your team stops repeating handoffs between CRM, inbox, and ops tools. XCLER designs reliable scenarios with retries, alerting, and clear ownership for Germany, DACH, the Netherlands, and Belgium — including Berlin, Munich, Frankfurt, Amsterdam, and Rotterdam — plus remote US clients in California, Florida, and Chicago.";
    wf.metaDescription =
      "Workflow automation with Make.com and n8n for Germany, DACH, the Netherlands, and Belgium. XCLER builds reliable CRM and ops scenarios.";
    if (wf.hero) wf.hero.paragraph = wf.seoLede;

    if (faq?.items) {
      for (const item of faq.items) {
        if (typeof item.answer === "string" && item.answer.includes("DACH") && !item.answer.includes("Netherlands")) {
          item.answer = item.answer.replace(
            "California, Florida, and Chicago without claiming fake local storefronts.",
            "California, Florida, and Chicago, and remote teams in the Netherlands and Belgium (Amsterdam, Rotterdam, Brussels) without claiming fake local storefronts."
          );
        }
      }
    }
  } else {
    hero.subtitle =
      "Wir sind XCLER, eine Berliner Digitalagentur fuer KI-Engineering, Workflow-Automatisierung und Webentwicklung. Wir bieten KI-Chatbots und Agenten, Make.com- und n8n-Automatisierung sowie Next.js-Plattformen fuer B2B-Teams in Deutschland, DACH, den Niederlanden und Belgien — inklusive Berlin, Muenchen, Hamburg, Frankfurt, Koeln, Amsterdam, Rotterdam und Bruessel — sowie remote fuer US-Kunden in Kalifornien, Florida und Chicago.";
    home.intro = hero.subtitle;
    meta.homeDescription =
      "Wir bieten KI-Chatbots, RAG-Agenten, Make.com- und n8n-Automatisierung sowie Next.js-Entwicklung fuer Deutschland, DACH, die Niederlande, Belgien und betreute US-Maerkte.";
    meta.siteDescription =
      "Wir sind XCLER. Wir bieten KI-Chatbots und Agenten, Workflow-Automatisierung, Webentwicklung und App-Entwicklung fuer Unternehmen in Deutschland, DACH, den Niederlanden, Belgien und den von uns betreuten US-Maerkten inklusive Kalifornien, Florida und Chicago.";
    meta.pageDescription = meta.siteDescription;

    ai.seoLede =
      "Wir entwickeln KI-Chatbots und Agenten fuer Production-Teams, die fundierte Antworten, Retrieval-Qualitaet und klare Eskalation brauchen. XCLER liefert bilinguale Assistenten mit Tool Calling, Evaluation und CRM-Handoffs fuer Deutschland, DACH, die Niederlande und Belgien — inklusive Berlin, Muenchen, Hamburg, Amsterdam und Rotterdam — sowie remote fuer US-Kunden in Kalifornien, Florida und Chicago.";
    ai.metaDescription =
      "Wir entwickeln KI-Chatbots und Agenten mit RAG fuer Deutschland, DACH, die Niederlande und Belgien. XCLER liefert Assistenten mit Evaluation und CRM-Handoffs.";
    if (ai.hero) ai.hero.paragraph = ai.seoLede;

    wf.seoLede =
      "Wir setzen Workflow-Automatisierung mit Make.com und n8n um, damit Ihr Team keine Handoffs zwischen CRM, Inbox und Ops-Tools mehr wiederholt. XCLER designed zuverlaessige Szenarien mit Retries, Alerting und klarer Ownership fuer Deutschland, DACH, die Niederlande und Belgien — inklusive Berlin, Muenchen, Frankfurt, Amsterdam und Rotterdam — sowie remote fuer US-Kunden in Kalifornien, Florida und Chicago.";
    wf.metaDescription =
      "Workflow-Automatisierung mit Make.com und n8n fuer Deutschland, DACH, die Niederlande und Belgien. XCLER baut zuverlaessige CRM- und Ops-Szenarien.";
    if (wf.hero) wf.hero.paragraph = wf.seoLede;
  }

  for (const key of ["HomeSeo", "ServiceAiChatbotsPage", "ServiceWorkflowAutomationPage"]) {
    const block = data[key];
    if (!block?.citablePassage || typeof block.citablePassage !== "string") continue;
    if (!block.citablePassage.includes("Amsterdam")) {
      block.citablePassage +=
        locale === "de"
          ? " Wir liefern remote auch fuer Teams in Amsterdam, Rotterdam, Utrecht, Den Haag und Bruessel, ohne lokale Storefronts zu erfinden."
          : " We also deliver remotely for teams in Amsterdam, Rotterdam, Utrecht, The Hague, and Brussels without inventing local storefronts.";
    }
  }
}

for (const locale of ["en", "de"]) {
  const file = path.join(ROOT, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  boost(locale, data);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("updated", file);
}
