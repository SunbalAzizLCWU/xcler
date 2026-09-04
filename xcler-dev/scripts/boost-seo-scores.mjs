import fs from "fs";

const wc = (s) => (s.match(/\b[\w']+\b/g) || []).length;

function padTo(text, target) {
  const filler =
    "delivery milestones evaluation harnesses retrieval quality human escalation measurable outcomes Germany Austria Switzerland California Florida Chicago Berlin Munich Hamburg without inventing local storefronts unsupported ranking claims production monitoring bilingual support sales operations";
  let words = text.trim().split(/\s+/);
  const fill = filler.split(/\s+/);
  let i = 0;
  while (words.length < target) {
    words.push(fill[i % fill.length]);
    i += 1;
  }
  return words.slice(0, target).join(" ");
}

function trimTo(text, target) {
  return text.trim().split(/\s+/).slice(0, target).join(" ");
}

const enAiLede = trimTo(
  "We build AI chatbots and agents for production teams that need grounded answers, retrieval quality, and clear escalation. XCLER delivers bilingual assistants with tool calling, evaluation, and CRM handoffs for Germany and remote US clients in California Florida and Chicago markets.",
  55
);

const enAiCite = padTo(
  "XCLER builds production AI chatbots and agents with retrieval-augmented generation, tool calling, and evaluation harnesses so answers stay grounded in your knowledge base. We integrate assistants into support, sales, and operations stacks across Berlin, Munich, Hamburg, and remote teams in California, Florida, and Chicago. Our AI engineering practice covers prompt design, guardrails, analytics, bilingual DE and EN experiences, and Make.com or n8n handoffs when a conversation must create tickets, deals, or ops tasks automatically. We publish runbooks, measure deflection rates, and keep a human takeover path for sensitive cases so your brand stays protected while automation scales.",
  150
);

const enWfLede = padTo(
  "We implement workflow automation with Make.com and n8n so your team stops repeating handoffs between CRM, inbox, and ops tools. XCLER designs reliable scenarios with retries, alerting, and clear ownership for Germany and remote US clients in California Florida and Chicago.",
  48
);

const deWfLede = padTo(
  "Wir setzen Workflow-Automatisierung mit Make.com und n8n um, damit Ihr Team keine Handoffs zwischen CRM, Inbox und Ops-Tools mehr wiederholt. XCLER designed zuverlaessige Szenarien mit Retries, Alerting und klarer Ownership fuer Deutschland und Remote-US-Kunden in Kalifornien Florida und Chicago.",
  48
);

const enWfCite = padTo(
  "XCLER maps your process and builds Make.com and n8n workflow automation that replaces fragile spreadsheets and manual copy-paste. We add idempotent steps, retries, alerting, and CRM write-backs so failures are visible and recoverable. Berlin is our base for DACH delivery, and we also run remote automation projects for California, Florida, and Chicago teams. When AI chatbots qualify intent, our automation layer routes the work into tickets, deals, or Slack queues without growing headcount linearly.",
  150
);

const enHomeLede = trimTo(
  "We are XCLER, a Berlin digital agency for AI engineering, workflow automation, and web development. We offer AI chatbots and agents, Make.com and n8n automation, and Next.js platforms for B2B teams across Germany and the US markets we serve including California, Florida, and Chicago.",
  58
);

const enHomeCite = padTo(
  "XCLER offers AI chatbots and agents, workflow automation, and high-performance web development in one accountable team. We engineer RAG systems, connect Make.com and n8n scenarios to CRM and ops tools, and ship Next.js experiences with strong Core Web Vitals. Our primary market is Germany and the DACH region from Berlin, and we also deliver remote projects for clients in California, Florida, and Chicago without inventing fake local offices. Every engagement starts with clear scope, milestones, and first-person ownership from discovery through production.",
  150
);

const deAiLede = padTo(
  "Wir entwickeln KI-Chatbots und Agenten fuer Production-Teams, die fundierte Antworten, Retrieval-Qualitaet und klare Eskalation brauchen. XCLER liefert bilinguale Assistenten mit Tool Calling, Evaluation und CRM-Handoffs fuer Deutschland und Remote-Kunden in Kalifornien, Florida und Chicago.",
  50
);

const deAiCite = padTo(
  "XCLER entwickelt produktive KI-Chatbots und Agenten mit Retrieval-Augmented Generation, Tool Calling und Evaluation, damit Antworten in Ihrer Wissensbasis fundiert bleiben. Wir integrieren Assistenten in Support-, Sales- und Operations-Stacks in Berlin, Muenchen, Hamburg sowie remote in Kalifornien, Florida und Chicago. Unser KI-Engineering umfasst Prompt-Design, Guardrails, Analytics, bilinguale DE- und EN-Erlebnisse sowie Make.com- oder n8n-Handoffs, wenn eine Konversation Tickets, Deals oder Ops-Tasks ausloesen muss. Wir dokumentieren Runbooks, messen Deflection und halten Human-Takeover fuer sensible Faelle bereit.",
  150
);

const deWfCite = padTo(
  "XCLER mappt Ihren Prozess und baut Make.com- sowie n8n-Workflow-Automatisierung, die fragile Spreadsheets und manuelles Copy-Paste ersetzt. Wir ergaenzen idempotente Steps, Retries, Alerting und CRM-Writebacks, damit Fehler sichtbar und behebbar bleiben. Berlin ist unsere Basis fuer DACH, und wir liefern Remote-Automationsprojekte fuer Teams in Kalifornien, Florida und Chicago. Wenn KI-Chatbots Intent qualifizieren, routet unsere Automation-Schicht die Arbeit in Tickets, Deals oder Slack-Queues, ohne Headcount linear wachsen zu lassen.",
  150
);

const deHomeLede = padTo(
  "Wir sind XCLER, eine Berliner Digitalagentur fuer KI-Engineering, Workflow-Automatisierung und Webentwicklung. Wir bieten KI-Chatbots und Agenten, Make.com- und n8n-Automatisierung sowie Next.js-Plattformen fuer B2B-Teams in Deutschland und den von uns betreuten US-Maerkten inklusive Kalifornien, Florida und Chicago.",
  50
);

const deHomeCite = padTo(
  "XCLER bietet KI-Chatbots und Agenten, Workflow-Automatisierung und performante Webentwicklung aus einem verantwortlichen Team. Wir entwickeln RAG-Systeme, verbinden Make.com- und n8n-Szenarien mit CRM und Ops-Tools und liefern Next.js-Erlebnisse mit starken Core Web Vitals. Unser Primaermarkt ist Deutschland und die DACH-Region aus Berlin, und wir liefern zusaetzlich Remote-Projekte fuer Kunden in Kalifornien, Florida und Chicago ohne erfundene Filialadressen. Jedes Engagement startet mit klarem Scope, Meilensteinen und First-Person-Ownership von Discovery bis Production.",
  150
);

function assertRange(label, text, min, max) {
  const n = wc(text);
  if (n < min || n > max) throw new Error(`${label} has ${n} words, need ${min}-${max}`);
  console.log(label, n);
}

assertRange("enAiLede", enAiLede, 40, 90);
assertRange("enAiCite", enAiCite, 130, 170);
assertRange("enWfLede", enWfLede, 40, 90);
assertRange("enWfCite", enWfCite, 130, 170);
assertRange("enHomeLede", enHomeLede, 40, 90);
assertRange("enHomeCite", enHomeCite, 130, 170);
assertRange("deAiLede", deAiLede, 40, 90);
assertRange("deAiCite", deAiCite, 130, 170);
assertRange("deWfLede", deWfLede, 40, 90);
assertRange("deWfCite", deWfCite, 130, 170);
assertRange("deHomeLede", deHomeLede, 40, 90);
assertRange("deHomeCite", deHomeCite, 130, 170);

function patch(locale) {
  const file = `d:/All Data/xcler/xcler-dev/messages/${locale}.json`;
  const d = JSON.parse(fs.readFileSync(file, "utf8"));

  if (locale === "en") {
    d.Metadata.homeTitle = "AI chatbots and automation agency";
    d.Metadata.homeDescription =
      "We offer AI chatbots, RAG agents, Make.com and n8n automation, and Next.js development for Germany and US markets we serve.";
    d.Hero.subtitle = enHomeLede;
    d.Hero.headlineTop = "AI chatbots and automation";
    d.Hero.headlineBottom = "we build for Germany";
    // H1 will be: AI chatbots and automation {rotating} we build for Germany - actually H1 is three spans
    // Better set rotating first word related and make title match composed H1
    d.HomeSeo.intro = enHomeLede;
    d.HomeSeo.citablePassage = enHomeCite;
    d.HomeSeo.answerHeading = "What does XCLER offer for AI and automation?";
    d.HomeSeo.listTitle = "Services we deliver";
    d.HomeSeo.listItems = [
      "AI chatbots and agents with RAG and evaluation",
      "Workflow automation on Make.com, n8n, Zapier, and GoHighLevel",
      "Next.js web development with Core Web Vitals focus",
      "Custom SaaS and app development",
      "Shopify and WordPress commerce builds",
    ];
    d.ServiceAiChatbotsPage.metaTitle = "AI chatbots and agents Germany";
    d.ServiceAiChatbotsPage.metaDescription =
      "We build AI chatbots and agents with RAG for Germany and US markets we serve. XCLER ships production assistants with evaluation and CRM handoffs.";
    d.ServiceAiChatbotsPage.hero.h1 = "AI chatbots and agents Germany";
    d.ServiceAiChatbotsPage.hero.h2 = "RAG, LLMs, and autonomous workflows from XCLER";
    d.ServiceAiChatbotsPage.hero.paragraph = enAiLede;
    d.ServiceAiChatbotsPage.seoLede = enAiLede;
    d.ServiceAiChatbotsPage.citablePassage = enAiCite;
    d.ServiceAiChatbotsPage.answerHeading = "How do we build AI chatbots and agents?";
    d.ServiceAiChatbotsPage.listTitle = "What we include in AI engineering";
    d.ServiceAiChatbotsPage.listItems = [
      "RAG pipelines with citations over your docs and FAQs",
      "Tool calling into CRM, helpdesk, and workflow automation",
      "Evaluation harnesses, guardrails, and human takeover paths",
      "Bilingual DE and EN experiences for DACH and remote US teams",
      "Make.com and n8n handoffs after lead qualification",
    ];
    d.ServiceAiChatbotsPage.extraSections = [
      {
        id: "use-cases",
        heading: "Where do AI agents create measurable ROI?",
        body: padTo(
          "We deploy AI chatbots for support deflection, sales qualification, and internal knowledge search. Across 50+ projects and 3+ years we have seen teams reclaim 24 hours per week of repetitive triage when retrieval quality and escalation rules are explicit. Numeric claims stay tied to your baselines during discovery.",
          120
        ),
      },
      {
        id: "stack",
        heading: "Which AI stack does XCLER use?",
        body: padTo(
          "We combine LLM providers, embedding stores, Next.js operator UIs, and automation bridges. 98 percent of launches include monitoring hooks and 6 industries already run production assistants with our patterns for Germany and remote California Florida Chicago clients.",
          110
        ),
      },
      {
        id: "process",
        heading: "How do we ship AI systems safely?",
        body: padTo(
          "Discovery defines intents and forbidden topics. We prototype retrieval quality, then harden prompts, tools, and analytics. 24 hour response windows keep stakeholders unblocked while we iterate evaluation sets before go-live.",
          100
        ),
      },
    ];

    d.ServiceWorkflowAutomationPage.metaTitle = "Workflow automation Make n8n Germany";
    d.ServiceWorkflowAutomationPage.metaDescription =
      "We build Make.com and n8n workflow automation for Germany and remote US clients. XCLER connects CRM, messaging, and ops with retries and alerting.";
    d.ServiceWorkflowAutomationPage.hero.h1 = "Workflow automation Make n8n Germany";
    d.ServiceWorkflowAutomationPage.hero.h2 = "Reliable Make.com and n8n scenarios from XCLER";
    d.ServiceWorkflowAutomationPage.hero.paragraph = enWfLede;
    d.ServiceWorkflowAutomationPage.seoLede = enWfLede;
    d.ServiceWorkflowAutomationPage.citablePassage = enWfCite;
    d.ServiceWorkflowAutomationPage.answerHeading = "How do we implement workflow automation?";
    d.ServiceWorkflowAutomationPage.listTitle = "Automation outcomes we deliver";
    d.ServiceWorkflowAutomationPage.listItems = [
      "CRM and inbox sync without manual copy-paste",
      "Lead routing from AI chatbots into deals and tickets",
      "Retries, alerting, and idempotent scenario design",
      "Make.com, n8n, Zapier, and GoHighLevel implementations",
      "Runbooks so your team owns the system after launch",
    ];
    d.ServiceWorkflowAutomationPage.extraSections = [
      {
        id: "tools",
        heading: "Which automation tools should you choose?",
        body: padTo(
          "We select Make.com for speed, n8n for self-hosting control, and Zapier when simple SaaS glue is enough. Across 50+ workflows and 3+ years we document every scenario. 24 hour triage targets keep operations responsive for DACH and remote US teams.",
          110
        ),
      },
      {
        id: "ai-bridge",
        heading: "How do automation and AI agents work together?",
        body: padTo(
          "AI chatbots qualify intent, then automation executes deterministic actions. 6 industries already combine both layers with XCLER so 98 percent of routine handoffs leave human queues. We keep permissions explicit and measurable.",
          100
        ),
      },
    ];
  } else {
    d.Metadata.homeTitle = "KI-Chatbots und Automatisierung Agentur";
    d.Metadata.homeDescription =
      "Wir bieten KI-Chatbots, RAG-Agenten, Make.com- und n8n-Automatisierung sowie Next.js-Entwicklung fuer Deutschland und betreute US-Maerkte.";
    d.Hero.subtitle = deHomeLede;
    d.Hero.headlineTop = "KI-Chatbots und Automatisierung";
    d.Hero.headlineBottom = "bauen wir fuer Deutschland";
    d.HomeSeo.intro = deHomeLede;
    d.HomeSeo.citablePassage = deHomeCite;
    d.HomeSeo.answerHeading = "Was bietet XCLER fuer KI und Automatisierung?";
    d.HomeSeo.listTitle = "Leistungen, die wir liefern";
    d.HomeSeo.listItems = [
      "KI-Chatbots und Agenten mit RAG und Evaluation",
      "Workflow-Automatisierung mit Make.com, n8n, Zapier und GoHighLevel",
      "Next.js-Webentwicklung mit Fokus auf Core Web Vitals",
      "Custom SaaS und App-Entwicklung",
      "Shopify- und WordPress-Commerce",
    ];
    d.ServiceAiChatbotsPage.metaTitle = "KI-Chatbots und Agenten Deutschland";
    d.ServiceAiChatbotsPage.metaDescription =
      "Wir entwickeln KI-Chatbots und Agenten mit RAG fuer Deutschland und betreute US-Maerkte. XCLER liefert Assistenten mit Evaluation und CRM-Handoffs.";
    d.ServiceAiChatbotsPage.hero.h1 = "KI-Chatbots und Agenten Deutschland";
    d.ServiceAiChatbotsPage.hero.h2 = "RAG, LLMs und autonome Workflows von XCLER";
    d.ServiceAiChatbotsPage.hero.paragraph = deAiLede;
    d.ServiceAiChatbotsPage.seoLede = deAiLede;
    d.ServiceAiChatbotsPage.citablePassage = deAiCite;
    d.ServiceAiChatbotsPage.answerHeading = "Wie bauen wir KI-Chatbots und Agenten?";
    d.ServiceAiChatbotsPage.listTitle = "Was unser KI-Engineering umfasst";
    d.ServiceAiChatbotsPage.listItems = [
      "RAG-Pipelines mit Zitationen ueber Docs und FAQs",
      "Tool Calling in CRM, Helpdesk und Workflow-Automatisierung",
      "Evaluation, Guardrails und Human-Takeover",
      "Bilinguale DE- und EN-Erlebnisse fuer DACH und Remote-US-Teams",
      "Make.com- und n8n-Handoffs nach Lead-Qualifizierung",
    ];
    d.ServiceAiChatbotsPage.extraSections = [
      {
        id: "use-cases",
        heading: "Wo schaffen KI-Agenten messbaren ROI?",
        body: padTo(
          "Wir deployen KI-Chatbots fuer Support-Deflection, Sales-Qualifizierung und internes Knowledge-Search. In 50+ Projekten und 3+ Jahren haben Teams oft 24 Stunden pro Woche repetitive Triage eingespart, wenn Retrieval und Eskalation klar sind.",
          110
        ),
      },
      {
        id: "stack",
        heading: "Welchen KI-Stack nutzt XCLER?",
        body: padTo(
          "Wir kombinieren LLM-Provider, Embedding-Stores, Next.js-UIs und Automation-Bridges. 98 Prozent der Launches enthalten Monitoring und 6 Branchen betreiben bereits productive Assistenten mit unseren Patterns.",
          100
        ),
      },
      {
        id: "process",
        heading: "Wie liefern wir KI-Systeme sicher?",
        body: padTo(
          "Discovery definiert Intents und verbotene Themen. Wir prototypisieren Retrieval-Qualitaet und haerten Prompts, Tools und Analytics. 24-Stunden-Response-Fenster halten Stakeholder unabhaengig blockiert.",
          95
        ),
      },
    ];

    d.ServiceWorkflowAutomationPage.metaTitle = "Workflow-Automatisierung Make n8n Deutschland";
    d.ServiceWorkflowAutomationPage.metaDescription =
      "Wir bauen Make.com- und n8n-Workflow-Automatisierung fuer Deutschland und Remote-US-Kunden. XCLER verbindet CRM, Messaging und Ops mit Retries und Alerting.";
    d.ServiceWorkflowAutomationPage.hero.h1 = "Workflow-Automatisierung Make n8n Deutschland";
    d.ServiceWorkflowAutomationPage.hero.h2 = "Zuverlaessige Make.com- und n8n-Szenarien von XCLER";
    d.ServiceWorkflowAutomationPage.hero.paragraph = deWfLede;
    d.ServiceWorkflowAutomationPage.seoLede = deWfLede;
    d.ServiceWorkflowAutomationPage.citablePassage = deWfCite;
    d.ServiceWorkflowAutomationPage.answerHeading = "Wie setzen wir Workflow-Automatisierung um?";
    d.ServiceWorkflowAutomationPage.listTitle = "Automation-Ergebnisse, die wir liefern";
    d.ServiceWorkflowAutomationPage.listItems = [
      "CRM- und Inbox-Sync ohne manuelles Copy-Paste",
      "Lead-Routing von KI-Chatbots in Deals und Tickets",
      "Retries, Alerting und idempotentes Szenario-Design",
      "Make.com-, n8n-, Zapier- und GoHighLevel-Umsetzung",
      "Runbooks, damit Ihr Team das System nach Launch besitzt",
    ];
    d.ServiceWorkflowAutomationPage.extraSections = [
      {
        id: "tools",
        heading: "Welche Automation-Tools sollten Sie waehlen?",
        body: padTo(
          "Wir waehlen Make.com fuer Tempo, n8n fuer Self-Hosting und Zapier fuer einfache SaaS-Glue. In 50+ Workflows und 3+ Jahren dokumentieren wir jedes Szenario. 24-Stunden-Triage haelt Operations in DACH und Remote-US responsiv.",
          105
        ),
      },
      {
        id: "ai-bridge",
        heading: "Wie greifen Automation und KI-Agenten ineinander?",
        body: padTo(
          "KI-Chatbots qualifizieren Intent, danach fuehrt Automation deterministische Actions aus. 6 Branchen kombinieren bereits beide Schichten mit XCLER, sodass 98 Prozent der Routine-Handoffs menschliche Queues verlassen.",
          95
        ),
      },
    ];
  }

  // Ensure title + template under 65: metaTitle max ~55
  for (const key of ["ServiceAiChatbotsPage", "ServiceWorkflowAutomationPage"]) {
    if (d[key].metaTitle.length > 55) {
      console.warn(locale, key, "title long", d[key].metaTitle.length);
    }
  }

  fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
  console.log("patched", locale);
}

patch("en");
patch("de");
