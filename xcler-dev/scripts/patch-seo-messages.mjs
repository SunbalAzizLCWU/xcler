/**
 * SEO content patcher — updates EN/DE message namespaces for AEO/GEO/local SEO.
 * Run: node scripts/patch-seo-messages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function load(locale) {
  return JSON.parse(fs.readFileSync(path.join(root, "messages", `${locale}.json`), "utf8"));
}

function save(locale, data) {
  fs.writeFileSync(path.join(root, "messages", `${locale}.json`), JSON.stringify(data, null, 2) + "\n");
}

const en = load("en");
const de = load("de");

en.Metadata = {
  siteTitle: "XCLER — AI Engineering, Web Development & Automation Agency",
  siteDescription:
    "We are XCLER. We offer AI chatbots and agents, workflow automation, web development, and app development for businesses in Germany, the DACH region, and the US markets we serve including California, Florida, and Chicago.",
  pageTitle: "XCLER — AI Engineering, Web & Automation Agency",
  pageDescription:
    "We build AI agents, RAG systems, workflow automation, and high-performance web platforms. XCLER serves Germany, DACH, California, Florida, and Chicago.",
  homeTitle: "AI Engineering, Automation & Web Agency Germany",
  homeDescription:
    "We offer AI chatbots and agents, n8n and Make.com automation, Next.js web development, and custom SaaS. XCLER helps B2B teams in Germany and the US markets we serve grow with measurable digital systems.",
};

de.Metadata = {
  siteTitle: "XCLER — KI-Engineering, Webentwicklung & Automatisierung",
  siteDescription:
    "Wir sind XCLER. Wir bieten KI-Chatbots und Agenten, Workflow-Automatisierung, Webentwicklung und App-Entwicklung fuer Unternehmen in Deutschland, der DACH-Region und den US-Maerkten, die wir betreuen.",
  pageTitle: "XCLER — KI-Engineering, Web & Automatisierung",
  pageDescription:
    "Wir entwickeln KI-Agenten, RAG-Systeme, Workflow-Automatisierung und performante Webplattformen. XCLER arbeitet fuer Kunden in Deutschland, DACH und ausgewaehlten US-Maerkten.",
  homeTitle: "KI-Engineering, Automatisierung & Webagentur Deutschland",
  homeDescription:
    "Wir bieten KI-Chatbots und Agenten, n8n- und Make.com-Automatisierung, Next.js-Webentwicklung und Custom SaaS. XCLER unterstuetzt B2B-Teams in Deutschland und den von uns betreuten US-Maerkten.",
};

en.Hero = {
  ...en.Hero,
  title: "We build AI systems, automation, and web platforms that drive growth.",
  subtitle:
    "We offer AI chatbots and agents, workflow automation with Make and n8n, and scalable Next.js platforms for B2B companies in Germany and the US markets we serve — California, Florida, and Chicago.",
  headlineTop: "We are the digital agency for",
  headlineBottom: "in Germany & beyond",
  description:
    "XCLER delivers AI engineering, automation, and web development in one team. We turn business goals into production systems — efficient delivery, precise execution, built to scale across DACH and remote US engagements.",
  trust: {
    projectsFrom: "Projects from €150",
    experience: "3+ Years Experience",
    region: "Germany, DACH & US markets we serve",
  },
  rotatingWordsList: [
    "AI Engineering",
    "AI Chatbots & Agents",
    "Workflow Automation",
    "RAG AI Systems",
    "Web Development",
    "App Development",
    "Shopify Development",
    "SaaS Development",
    "Headless Commerce",
  ],
};

de.Hero = {
  ...de.Hero,
  title: "Wir entwickeln KI-Systeme, Automatisierung und Webplattformen mit messbarem Wachstum.",
  subtitle:
    "Wir bieten KI-Chatbots und Agenten, Workflow-Automatisierung mit Make und n8n sowie skalierbare Next.js-Plattformen fuer B2B-Unternehmen in Deutschland und den von uns betreuten US-Maerkten.",
  headlineTop: "Wir sind die Digitalagentur fuer",
  headlineBottom: "in Deutschland & darueber hinaus",
  description:
    "XCLER liefert KI-Engineering, Automatisierung und Webentwicklung aus einem Team. Wir verwandeln Geschaeftsziele in produktive Systeme — effizient, praezise und skalierbar fuer DACH und Remote-Projekte in den USA.",
  trust: {
    projectsFrom: "Projekte ab €150",
    experience: "3+ Jahre Erfahrung",
    region: "Deutschland, DACH & betreute US-Maerkte",
  },
  rotatingWordsList: [
    "KI-Engineering",
    "KI-Chatbots & Agenten",
    "Workflow-Automatisierung",
    "RAG-KI-Systeme",
    "Webentwicklung",
    "App-Entwicklung",
    "Shopify-Entwicklung",
    "SaaS-Entwicklung",
    "Headless Commerce",
  ],
};

en.HomeSeo = {
  eyebrow: "What we focus on",
  intro:
    "We combine AI engineering, workflow automation, and web development in one delivery stream. Each focus area links to a specialized service page so you can evaluate how XCLER can help your team.",
  pillars: {
    ai: {
      title: "AI Chatbots & Agents",
      body: "We build RAG agents, LLM chatbots, and autonomous assistants for support, lead qualification, and operations. XCLER designs production AI systems for teams in Germany, California, Florida, and Chicago.",
      href: "/services/ai-chatbots-agents",
      cta: "Explore AI Agents",
    },
    workflow: {
      title: "Workflow Automation",
      body: "We automate revenue and operations with Make.com, n8n, Zapier, and GoHighLevel. XCLER connects your tools so work moves without manual handoffs across DACH and remote US clients.",
      href: "/services/workflow-automation",
      cta: "Explore Automation",
    },
    shopify: {
      title: "Shopify & Headless Commerce",
      body: "We build high-performance Shopify architectures for B2B and D2C, including headless Next.js frontends and conversion-first structure.",
      href: "/services/wordpress-shopify",
      cta: "Explore Commerce",
    },
    next: {
      title: "Next.js Web Development",
      body: "We engineer Next.js frontends for speed, Core Web Vitals, and durable SEO across high-intent landing pages in Germany and beyond.",
      href: "/services/web-development",
      cta: "Explore Web Development",
    },
  },
};

de.HomeSeo = {
  eyebrow: "Worauf wir uns fokussieren",
  intro:
    "Wir verbinden KI-Engineering, Workflow-Automatisierung und Webentwicklung in einem Delivery-Strom. Jeder Fokusbereich verlinkt auf eine spezialisierte Leistungsseite, damit Sie klar sehen, wie XCLER Ihr Team unterstuetzen kann.",
  pillars: {
    ai: {
      title: "KI-Chatbots & Agenten",
      body: "Wir entwickeln RAG-Agenten, LLM-Chatbots und autonome Assistenten fuer Support, Lead-Qualifizierung und Operations. XCLER liefert produktive KI-Systeme fuer Teams in Deutschland und ausgewaehlten US-Maerkten.",
      href: "/services/ai-chatbots-agents",
      cta: "KI-Agenten entdecken",
    },
    workflow: {
      title: "Workflow-Automatisierung",
      body: "Wir automatisieren Umsatz und Operations mit Make.com, n8n, Zapier und GoHighLevel. XCLER verbindet Ihre Tools, damit Arbeit ohne manuelle Handoffs laeuft — in DACH und remote in den USA.",
      href: "/services/workflow-automation",
      cta: "Automatisierung entdecken",
    },
    shopify: {
      title: "Shopify & Headless Commerce",
      body: "Wir bauen performante Shopify-Architekturen fuer B2B und D2C, inklusive Headless-Frontends mit Next.js und conversion-first Struktur.",
      href: "/services/wordpress-shopify",
      cta: "Commerce entdecken",
    },
    next: {
      title: "Next.js Webentwicklung",
      body: "Wir entwickeln Next.js-Frontends fuer Geschwindigkeit, Core Web Vitals und nachhaltiges SEO auf High-Intent-Landingpages in Deutschland und darueber hinaus.",
      href: "/services/web-development",
      cta: "Webentwicklung entdecken",
    },
  },
};

// Fix HomeSeo pillar key used in page — page iterates Object.entries so renaming shopify/saas/rag/next is fine
// Old keys were shopify, saas, rag, next — new: ai, workflow, shopify, next

en.Services = {
  ...en.Services,
  eyebrow: "What we offer",
  headingLine1: "Services we deliver",
  headingLine2: "with clear business impact.",
  service1: {
    title: "Next.js Web Development",
    description:
      "We build performance-focused frontend systems with Next.js, React, and TypeScript — fast loading, strong Core Web Vitals, and durable SEO for Germany and the US markets we serve.",
  },
  service2: {
    title: "Custom SaaS & App Development",
    description:
      "We design and ship SaaS products, portals, and internal platforms with resilient APIs and a clear scaling strategy.",
  },
  service3: {
    title: "Shopify & WordPress Commerce",
    description:
      "We implement Shopify and WordPress commerce stacks, including headless storefronts when conversion and speed demand it.",
  },
  service4: {
    title: "Workflow Automation",
    description:
      "We automate processes with Make.com, n8n, Zapier, and GoHighLevel so your team spends less time on repetitive work.",
  },
  service5: {
    title: "AI Chatbots & Agents",
    description:
      "We engineer RAG systems, AI chatbots, and autonomous agents for support, sales qualification, and operational intelligence.",
  },
};

de.Services = {
  ...de.Services,
  eyebrow: "Was wir anbieten",
  headingLine1: "Leistungen, die wir",
  headingLine2: "mit klarem Business-Impact liefern.",
  service1: {
    title: "Next.js Webentwicklung",
    description:
      "Wir bauen performante Frontend-Systeme mit Next.js, React und TypeScript — schnelle Ladezeiten, starke Core Web Vitals und nachhaltiges SEO fuer Deutschland und die von uns betreuten US-Maerkte.",
  },
  service2: {
    title: "Custom SaaS & App-Entwicklung",
    description:
      "Wir konzipieren und liefern SaaS-Produkte, Portale und interne Plattformen mit robusten APIs und klarer Skalierungsstrategie.",
  },
  service3: {
    title: "Shopify & WordPress Commerce",
    description:
      "Wir setzen Shopify- und WordPress-Commerce-Stacks um — inklusive Headless-Storefronts, wenn Conversion und Speed es erfordern.",
  },
  service4: {
    title: "Workflow-Automatisierung",
    description:
      "Wir automatisieren Prozesse mit Make.com, n8n, Zapier und GoHighLevel, damit Ihr Team weniger Zeit mit Wiederholarbeit verliert.",
  },
  service5: {
    title: "KI-Chatbots & Agenten",
    description:
      "Wir entwickeln RAG-Systeme, KI-Chatbots und autonome Agenten fuer Support, Sales-Qualifizierung und operative Intelligenz.",
  },
};

en.Stats = {
  years: "Years of Experience",
  projects: "Projects Delivered",
  industries: "Industries Served",
  satisfaction: "Client Satisfaction",
  regionNote: "Delivered across Germany, DACH, California, Florida & Chicago",
};

de.Stats = {
  years: "Jahre Erfahrung",
  projects: "Gelieferte Projekte",
  industries: "Branchen",
  satisfaction: "Kundenzufriedenheit",
  regionNote: "Geliefert in Deutschland, DACH, Kalifornien, Florida & Chicago",
};

en.FAQ = {
  ...en.FAQ,
  eyebrow: "Answers first",
  faq1: {
    question: "What AI engineering services does XCLER offer?",
    answer:
      "We offer AI chatbots, RAG agents, and autonomous assistants integrated into your support and sales stack. XCLER designs production AI systems with clear guardrails, evaluation, and handoff to human teams when needed.",
  },
  faq2: {
    question: "Do you build workflow automation with n8n and Make.com?",
    answer:
      "Yes. We build and maintain workflow automation with Make.com, n8n, Zapier, and GoHighLevel. We connect CRMs, inboxes, and internal tools so processes run reliably for teams in Germany and remote US clients.",
  },
  faq3: {
    question: "Where does XCLER work geographically?",
    answer:
      "We are based in Berlin and primarily serve Germany and the DACH region. We also deliver remote projects for clients in California, Florida, and Chicago without claiming fake local storefronts.",
  },
  faq4: {
    question: "What web and app stack do you use?",
    answer:
      "We primarily use Next.js, React, TypeScript, and modern APIs for web and SaaS products, plus Shopify and WordPress when commerce requirements fit those platforms.",
  },
  faq5: {
    question: "How fast can we start a project with XCLER?",
    answer:
      "We typically kick off discovery within a few business days after scope alignment. You get a clear plan, milestones, and a single engineering team accountable for delivery.",
  },
  faq6: {
    question: "How do AI agents and workflow automation work together?",
    answer:
      "We connect AI agents to your automation layer so chatbots qualify leads, then n8n or Make routes the work into CRM, Slack, or ops queues. That combination is where XCLER excels for B2B operations.",
  },
};

de.FAQ = {
  ...de.FAQ,
  eyebrow: "Antworten zuerst",
  faq1: {
    question: "Welche KI-Engineering-Leistungen bietet XCLER an?",
    answer:
      "Wir bieten KI-Chatbots, RAG-Agenten und autonome Assistenten, die wir in Ihren Support- und Sales-Stack integrieren. XCLER entwickelt produktive KI-Systeme mit klaren Guardrails, Evaluation und Uebergabe an Menschen, wenn noetig.",
  },
  faq2: {
    question: "Baut ihr Workflow-Automatisierung mit n8n und Make.com?",
    answer:
      "Ja. Wir bauen und betreiben Workflow-Automatisierung mit Make.com, n8n, Zapier und GoHighLevel. Wir verbinden CRMs, Inboxes und interne Tools, damit Prozesse zuverlaessig laufen — in Deutschland und remote fuer US-Kunden.",
  },
  faq3: {
    question: "Wo arbeitet XCLER geografisch?",
    answer:
      "Wir sitzen in Berlin und betreuen primaer Deutschland und die DACH-Region. Zusaetzlich liefern wir Remote-Projekte fuer Kunden in Kalifornien, Florida und Chicago — ohne erfundene lokale Filialadressen.",
  },
  faq4: {
    question: "Welchen Web- und App-Stack nutzt ihr?",
    answer:
      "Wir nutzen primaer Next.js, React, TypeScript und moderne APIs fuer Web- und SaaS-Produkte sowie Shopify und WordPress, wenn Commerce-Anforderungen zu diesen Plattformen passen.",
  },
  faq5: {
    question: "Wie schnell koennen wir mit XCLER starten?",
    answer:
      "In der Regel starten wir Discovery innerhalb weniger Werktage nach Scope-Abstimmung. Sie erhalten einen klaren Plan, Meilensteine und ein verantwortliches Engineering-Team.",
  },
  faq6: {
    question: "Wie greifen KI-Agenten und Workflow-Automatisierung ineinander?",
    answer:
      "Wir verbinden KI-Agenten mit Ihrer Automatisierungsschicht: Chatbots qualifizieren Leads, n8n oder Make leitet die Arbeit in CRM, Slack oder Ops-Queues. Genau diese Kombination ist eine Staerke von XCLER fuer B2B-Operations.",
  },
};

// AI page enrichment
en.ServiceAiChatbotsPage = {
  ...en.ServiceAiChatbotsPage,
  metaTitle: "AI Chatbots & Agents Agency Germany | RAG & AI Engineering",
  metaDescription:
    "We build AI chatbots, RAG agents, and autonomous assistants for B2B teams. XCLER delivers AI engineering in Germany, DACH, California, Florida, and Chicago.",
  headingLine1: "AI chatbots & agents",
  headingLine2: "we engineer for production.",
  intro:
    "We offer AI engineering focused on chatbots, RAG systems, and autonomous agents. XCLER helps companies in Germany and the US markets we serve turn knowledge bases into reliable assistants that qualify leads, answer customers, and hand off to humans cleanly.",
  hero: {
    h1: "We build production AI chatbots and agents",
    h2: "RAG, LLMs, and autonomous workflows — delivered by XCLER",
    paragraph:
      "XCLER designs, builds, and ships AI chatbots and agents that sit inside your support and sales stack. We combine retrieval-augmented generation, tool calling, and evaluation so answers stay grounded. We serve teams across Germany, Berlin, Munich, Hamburg, and remote clients in California, Florida, and Chicago.",
  },
  seoIntro: {
    paragraph1:
      "Looking for an AI chatbot agency in Germany? We are XCLER. We engineer RAG systems, conversational agents, and call-capable assistants that reduce ticket volume and accelerate lead qualification. Our AI engineering practice covers prompt and tool design, retrieval pipelines, guardrails, analytics, and human takeover paths.",
    paragraph2:
      "We do not sell toy demos. We integrate agents with your CRM, helpdesk, and workflow automation (Make.com, n8n) so every conversation can trigger real work. Whether you operate in the DACH region or need a remote AI partner for California, Florida, or Chicago, we deliver first-person accountability from discovery through production.",
  },
  architectureHighlight:
    "Our typical AI architecture: document ingestion and embeddings, retrieval with citation, LLM orchestration with tools, evaluation harnesses, and escalation to humans. We connect agents to workflow automation so qualified intents become tickets, deals, or ops tasks automatically.",
  aeoFaq: [
    {
      question: "What is the difference between an AI chatbot and an AI agent?",
      answer:
        "We build chatbots for guided Q&A and agents when the system must take actions — create tickets, update CRM fields, or trigger n8n/Make workflows. XCLER designs both with clear permissions and audit trails.",
    },
    {
      question: "Do you build RAG systems for company knowledge?",
      answer:
        "Yes. We implement retrieval-augmented generation over your docs, FAQs, and product data so answers stay grounded. We tune chunking, retrieval, and citations for accuracy in production.",
    },
    {
      question: "Can XCLER deploy AI agents for German and US teams?",
      answer:
        "Yes. We deliver bilingual DE/EN experiences and operate as a Berlin-based partner for DACH, with remote delivery for California, Florida, and Chicago clients.",
    },
    {
      question: "How do you keep AI answers safe and on-brand?",
      answer:
        "We define allowed tools, topic boundaries, escalation rules, and evaluation sets. We monitor failure modes and keep a human handoff path for sensitive cases.",
    },
  ],
  ctaHeading: "Ready for AI agents that actually ship?",
  ctaDescription:
    "Tell us about your knowledge base, channels, and goals. We will propose a concrete AI engineering plan.",
  ctaButton: "Start an AI project",
};

de.ServiceAiChatbotsPage = {
  ...de.ServiceAiChatbotsPage,
  metaTitle: "KI-Chatbots & Agenten Agentur Deutschland | RAG & KI-Engineering",
  metaDescription:
    "Wir entwickeln KI-Chatbots, RAG-Agenten und autonome Assistenten fuer B2B-Teams. XCLER liefert KI-Engineering in Deutschland, DACH und ausgewaehlten US-Maerkten.",
  headingLine1: "KI-Chatbots & Agenten,",
  headingLine2: "die wir fuer Production bauen.",
  intro:
    "Wir bieten KI-Engineering mit Fokus auf Chatbots, RAG-Systeme und autonome Agenten. XCLER hilft Unternehmen in Deutschland und den von uns betreuten US-Maerkten, Wissensbasen in zuverlaessige Assistenten zu verwandeln.",
  hero: {
    h1: "Wir entwickeln produktive KI-Chatbots und Agenten",
    h2: "RAG, LLMs und autonome Workflows — geliefert von XCLER",
    paragraph:
      "XCLER konzipiert, baut und liefert KI-Chatbots und Agenten, die in Ihrem Support- und Sales-Stack sitzen. Wir kombinieren Retrieval-Augmented Generation, Tool Calling und Evaluation, damit Antworten fundiert bleiben. Wir betreuen Teams in Deutschland sowie remote in Kalifornien, Florida und Chicago.",
  },
  seoIntro: {
    paragraph1:
      "Suchen Sie eine KI-Chatbot-Agentur in Deutschland? Wir sind XCLER. Wir entwickeln RAG-Systeme, Conversational Agents und Assistenten, die Ticketvolumen senken und Lead-Qualifizierung beschleunigen. Unser KI-Engineering umfasst Prompt- und Tool-Design, Retrieval-Pipelines, Guardrails, Analytics und Human-Takeover.",
    paragraph2:
      "Wir verkaufen keine Demo-Spielereien. Wir integrieren Agenten mit CRM, Helpdesk und Workflow-Automatisierung (Make.com, n8n), damit jede Konversation echte Arbeit ausloesen kann. Ob DACH oder Remote-Partner fuer Kalifornien, Florida oder Chicago — wir liefern verantwortliche Delivery von Discovery bis Production.",
  },
  architectureHighlight:
    "Unsere typische KI-Architektur: Dokument-Ingestion und Embeddings, Retrieval mit Zitation, LLM-Orchestrierung mit Tools, Evaluation und Eskalation an Menschen. Wir verbinden Agenten mit Workflow-Automatisierung, damit qualifizierte Intents automatisch zu Tickets, Deals oder Ops-Tasks werden.",
  aeoFaq: [
    {
      question: "Was ist der Unterschied zwischen KI-Chatbot und KI-Agent?",
      answer:
        "Wir bauen Chatbots fuer gefuehrte Q&A und Agenten, wenn das System handeln muss — Tickets erstellen, CRM-Felder aktualisieren oder n8n/Make-Workflows ausloesen. XCLER designed beides mit klaren Rechten und Audit-Trails.",
    },
    {
      question: "Baut ihr RAG-Systeme fuer Unternehmenswissen?",
      answer:
        "Ja. Wir implementieren Retrieval-Augmented Generation ueber Docs, FAQs und Produktdaten, damit Antworten fundiert bleiben. Wir tunen Chunking, Retrieval und Zitationen fuer Production-Genauigkeit.",
    },
    {
      question: "Kann XCLER KI-Agenten fuer deutsche und US-Teams deployen?",
      answer:
        "Ja. Wir liefern bilinguale DE/EN-Erlebnisse und arbeiten als Berliner Partner fuer DACH sowie remote fuer Kunden in Kalifornien, Florida und Chicago.",
    },
    {
      question: "Wie haltet ihr KI-Antworten sicher und on-brand?",
      answer:
        "Wir definieren erlaubte Tools, Themengrenzen, Eskalationsregeln und Evaluation-Sets. Wir beobachten Failure Modes und halten einen Human-Handoff fuer sensible Faelle bereit.",
    },
  ],
  ctaHeading: "Bereit fuer KI-Agenten, die wirklich live gehen?",
  ctaDescription:
    "Erzaehlen Sie uns von Wissensbasis, Kanaelen und Zielen. Wir schlagen einen konkreten KI-Engineering-Plan vor.",
  ctaButton: "KI-Projekt starten",
};

en.ServiceWorkflowAutomationPage = {
  ...en.ServiceWorkflowAutomationPage,
  metaTitle: "Workflow Automation Agency Germany | Make.com & n8n",
  metaDescription:
    "We build workflow automation with Make.com, n8n, Zapier, and GoHighLevel. XCLER connects your tools for teams in Germany, DACH, California, Florida, and Chicago.",
  headingLine1: "Workflow automation",
  headingLine2: "we implement end to end.",
  intro:
    "We offer workflow automation that removes repetitive handoffs. XCLER designs Make.com and n8n scenarios that sync CRM, messaging, billing, and ops — for Germany-first teams and remote US clients.",
  hero: {
    h1: "We automate the workflows your team repeats every day",
    h2: "Make.com, n8n, Zapier, GoHighLevel — production ready",
    paragraph:
      "XCLER maps your process, builds reliable automations, and monitors failures. We integrate AI agents when conversation should trigger work. We serve companies across Germany and remote engagements in California, Florida, and Chicago.",
  },
  seoIntro: {
    paragraph1:
      "If you need a workflow automation agency in Germany, we are ready. We specialize in Make.com and n8n architectures that replace fragile spreadsheets and manual copy-paste between tools. We document every scenario, add error handling, and keep ownership clear.",
    paragraph2:
      "Automation pairs naturally with our AI engineering: chatbots qualify intent, then automation routes the work. That is how XCLER helps operations teams scale without growing headcount linearly.",
  },
  architectureHighlight:
    "Our automation stack typically includes trigger design, idempotent steps, retries, alerting, and CRM write-backs. When AI is involved, we place agents upstream and keep Make/n8n responsible for deterministic actions.",
  aeoFaq: [
    {
      question: "Which automation tools does XCLER use?",
      answer:
        "We primarily implement Make.com, n8n, Zapier, and GoHighLevel. We choose the tool based on complexity, hosting preferences, and how tightly you need to integrate AI agents.",
    },
    {
      question: "Can automation connect to our AI chatbot?",
      answer:
        "Yes. We connect chatbots and agents to automation so qualified conversations create deals, tickets, or Slack alerts automatically.",
    },
    {
      question: "Do you support teams outside Germany?",
      answer:
        "Yes. Berlin is our base and DACH is primary, but we deliver remote automation projects for California, Florida, and Chicago clients.",
    },
  ],
  ctaHeading: "Want workflows that run without chasing people?",
  ctaDescription: "Share your current process and tools. We will outline an automation blueprint.",
  ctaButton: "Start automation discovery",
};

de.ServiceWorkflowAutomationPage = {
  ...de.ServiceWorkflowAutomationPage,
  metaTitle: "Workflow-Automatisierung Agentur Deutschland | Make.com & n8n",
  metaDescription:
    "Wir bauen Workflow-Automatisierung mit Make.com, n8n, Zapier und GoHighLevel. XCLER verbindet Ihre Tools fuer Teams in Deutschland, DACH und ausgewaehlten US-Maerkten.",
  headingLine1: "Workflow-Automatisierung,",
  headingLine2: "die wir end-to-end umsetzen.",
  intro:
    "Wir bieten Workflow-Automatisierung, die repetitive Handoffs entfernt. XCLER designed Make.com- und n8n-Szenarien, die CRM, Messaging, Billing und Ops synchronisieren.",
  hero: {
    h1: "Wir automatisieren die Workflows, die Ihr Team taeglich wiederholt",
    h2: "Make.com, n8n, Zapier, GoHighLevel — production-ready",
    paragraph:
      "XCLER mappt Ihren Prozess, baut zuverlaessige Automationen und ueberwacht Fehler. Wir integrieren KI-Agenten, wenn Gespraeche Arbeit ausloesen sollen. Wir betreuen Unternehmen in Deutschland und remote in Kalifornien, Florida und Chicago.",
  },
  seoIntro: {
    paragraph1:
      "Wenn Sie eine Workflow-Automatisierungs-Agentur in Deutschland brauchen, sind wir bereit. Wir spezialisieren uns auf Make.com- und n8n-Architekturen, die fragile Spreadsheets und manuelles Copy-Paste ersetzen. Wir dokumentieren jedes Szenario, ergaenzen Error-Handling und halten Ownership klar.",
    paragraph2:
      "Automatisierung passt natuerlich zu unserem KI-Engineering: Chatbots qualifizieren Intent, danach routet Automation die Arbeit. So hilft XCLER Operations-Teams zu skalieren, ohne Headcount linear wachsen zu lassen.",
  },
  architectureHighlight:
    "Unser Automation-Stack umfasst typischerweise Trigger-Design, idempotente Steps, Retries, Alerting und CRM-Writebacks. Wenn KI involviert ist, platzieren wir Agenten upstream und halten Make/n8n fuer deterministische Aktionen verantwortlich.",
  aeoFaq: [
    {
      question: "Welche Automation-Tools nutzt XCLER?",
      answer:
        "Wir implementieren primaer Make.com, n8n, Zapier und GoHighLevel. Die Wahl haengt von Komplexitaet, Hosting und der Integration von KI-Agenten ab.",
    },
    {
      question: "Kann Automatisierung an unseren KI-Chatbot angebunden werden?",
      answer:
        "Ja. Wir verbinden Chatbots und Agenten mit Automation, damit qualifizierte Gespraeche automatisch Deals, Tickets oder Slack-Alerts erzeugen.",
    },
    {
      question: "Unterstuetzt ihr Teams ausserhalb Deutschlands?",
      answer:
        "Ja. Berlin ist unsere Basis und DACH primaer, aber wir liefern Remote-Automationsprojekte fuer Kunden in Kalifornien, Florida und Chicago.",
    },
  ],
  ctaHeading: "Wollen Sie Workflows, die ohne Nachfassen laufen?",
  ctaDescription: "Teilen Sie Ihren aktuellen Prozess und Toolstack. Wir skizzieren einen Automation-Blueprint.",
  ctaButton: "Automation-Discovery starten",
};

en.Footer = {
  ...en.Footer,
  brandDescription:
    "We are XCLER — AI engineering, workflow automation, and web development for Germany, DACH, and the US markets we serve.",
  cta: {
    headingLine1: "Tell us what you want",
    headingLine2: "to automate or build.",
    description: "We reply with a clear next step — usually within 24 hours.",
    button: "Contact XCLER",
  },
  links: {
    services: {
      webDevelopment: "Web Development",
      appDevelopment: "App Development",
      wordpressShopify: "WordPress & Shopify",
      workflowAutomation: "Workflow Automation",
      aiChatbots: "AI Chatbots & Agents",
      wordpressGermany: "WordPress Germany",
      shopifyGermany: "Shopify Germany",
    },
    company: {
      about: "About",
      contact: "Contact",
      work: "Work",
      blog: "Blog",
      pricing: "Pricing",
    },
    legal: {
      imprint: "Imprint",
      privacy: "Privacy",
      cookies: "Cookies",
      terms: "Terms",
    },
  },
};

de.Footer = {
  ...de.Footer,
  brandDescription:
    "Wir sind XCLER — KI-Engineering, Workflow-Automatisierung und Webentwicklung fuer Deutschland, DACH und die von uns betreuten US-Maerkte.",
  cta: {
    headingLine1: "Sagen Sie uns, was Sie",
    headingLine2: "automatisieren oder bauen wollen.",
    description: "Wir antworten mit einem klaren naechsten Schritt — meist innerhalb von 24 Stunden.",
    button: "XCLER kontaktieren",
  },
  links: {
    services: {
      webDevelopment: "Webentwicklung",
      appDevelopment: "App-Entwicklung",
      wordpressShopify: "WordPress & Shopify",
      workflowAutomation: "Workflow-Automatisierung",
      aiChatbots: "KI-Chatbots & Agenten",
      wordpressGermany: "WordPress Deutschland",
      shopifyGermany: "Shopify Deutschland",
    },
    company: {
      about: "Ueber uns",
      contact: "Kontakt",
      work: "Projekte",
      blog: "Blog",
      pricing: "Preise",
    },
    legal: {
      imprint: "Impressum",
      privacy: "Datenschutz",
      cookies: "Cookies",
      terms: "AGB",
    },
  },
};

en.AboutPage = {
  ...en.AboutPage,
  metaTitle: "About XCLER — AI, Automation & Web Agency",
  metaDescription:
    "We are XCLER. Learn how we deliver AI engineering, workflow automation, and web development from Berlin to DACH and remote US clients.",
};

de.AboutPage = {
  ...de.AboutPage,
  metaTitle: "Ueber XCLER — KI, Automatisierung & Webagentur",
  metaDescription:
    "Wir sind XCLER. Erfahren Sie, wie wir KI-Engineering, Workflow-Automatisierung und Webentwicklung von Berlin aus fuer DACH und remote US-Kunden liefern.",
};

en.ContactPage = {
  ...en.ContactPage,
  metaTitle: "Contact XCLER — Start an AI or Automation Project",
  metaDescription:
    "Contact XCLER to start an AI chatbot, workflow automation, or web development project. We serve Germany, DACH, California, Florida, and Chicago.",
};

de.ContactPage = {
  ...de.ContactPage,
  metaTitle: "Kontakt XCLER — KI- oder Automatisierungsprojekt starten",
  metaDescription:
    "Kontaktieren Sie XCLER fuer KI-Chatbots, Workflow-Automatisierung oder Webentwicklung. Wir betreuen Deutschland, DACH und ausgewaehlte US-Maerkte.",
};

en.ServicesPage = {
  ...en.ServicesPage,
  metaTitle: "Our Services — AI, Automation, Web & Commerce",
  metaDescription:
    "Explore what we offer: AI chatbots and agents, workflow automation, web development, app development, and Shopify/WordPress commerce.",
  description:
    "We offer a focused set of services. XCLER excels when AI engineering, automation, and product engineering need to ship together for teams in Germany and the US markets we serve.",
};

de.ServicesPage = {
  ...de.ServicesPage,
  metaTitle: "Unsere Leistungen — KI, Automatisierung, Web & Commerce",
  metaDescription:
    "Entdecken Sie, was wir anbieten: KI-Chatbots und Agenten, Workflow-Automatisierung, Webentwicklung, App-Entwicklung sowie Shopify/WordPress-Commerce.",
  description:
    "Wir bieten ein fokussiertes Leistungsportfolio. XCLER glaenzt, wenn KI-Engineering, Automatisierung und Product Engineering gemeinsam geliefert werden muessen.",
};

save("en", en);
save("de", de);
console.log("Patched SEO messages for en.json and de.json");
