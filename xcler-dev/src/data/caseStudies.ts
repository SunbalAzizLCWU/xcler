export type Locale = "en" | "de";

type LocalizedText = {
  en: string;
  de: string;
};

type TechStackSection = {
  label: LocalizedText;
  items: LocalizedText[];
};

type Phase = {
  title: LocalizedText;
  description: LocalizedText;
};

type RelatedService = {
  href: string;
  title: LocalizedText;
  reason: LocalizedText;
};

export type CaseStudy = {
  slug: string;
  heroImage: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
  keywords: { en: string[]; de: string[] };
  challenge: LocalizedText;
  solution: LocalizedText;
  techStack: TechStackSection[];
  phases: Phase[];
  debuggingHighlights: LocalizedText[];
  roadmap: LocalizedText[];
  relatedServices: RelatedService[];
  comingSoon?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "aegisflow",
    heroImage: "/projects/aegisflow.jpg",
    title: {
      en: "AegisFlow (InvoiceIQ)",
      de: "AegisFlow (InvoiceIQ)",
    },
    subtitle: {
      en: "AI-Powered Financial Intelligence and Risk Management SaaS",
      de: "KI-gestuetzte Financial Intelligence und Risikomanagement SaaS",
    },
    category: {
      en: "FinTech SaaS and Predictive Risk Intelligence",
      de: "FinTech SaaS und praediktive Risiko-Intelligenz",
    },
    summary: {
      en: "AegisFlow is live as an enterprise FinTech SaaS platform delivering AI-powered risk intelligence to daily finance operations. Teams use it to classify client risk, forecast 30, 60 and 90 day liquidity, and stress-test cash flow under adverse market conditions with production-ready reliability.",
      de: "AegisFlow ist als Enterprise-FinTech-SaaS-Plattform live und liefert KI-gestuetzte Risiko-Intelligenz fuer den taeglichen Finanzbetrieb. Teams nutzen die Loesung, um Kundenrisiken zu klassifizieren, 30-, 60- und 90-Tage-Liquiditaet zu prognostizieren und Cashflow auch unter kritischen Marktszenarien stabil zu steuern.",
    },
    keywords: {
      en: [
        "fintech saas development",
        "ai risk management software",
        "cash flow forecasting platform",
        "fastapi machine learning backend",
        "nextjs fintech dashboard",
        "lstm liquidity forecasting",
        "gan stress testing finance",
        "workflow automation for finance"
      ],
      de: [
        "fintech saas entwicklung",
        "ki risikomanagement software",
        "cashflow prognose plattform",
        "fastapi machine learning backend",
        "nextjs fintech dashboard",
        "lstm liquiditaetsprognose",
        "gan stresstest finanzen",
        "prozessautomatisierung finanzen"
      ]
    },
    challenge: {
      en: "Finance teams needed one platform that combines enterprise reliability, audit-safe operations and advanced ML forecasts without slowing down day-to-day decisions.",
      de: "Finanzteams brauchten eine Plattform, die Enterprise-Zuverlaessigkeit, auditfaehige Prozesse und fortgeschrittene ML-Prognosen vereint, ohne den operativen Alltag zu verlangsamen.",
    },
    solution: {
      en: "We delivered a production split-architecture: Next.js SaaS frontend for finance operators, Python FastAPI intelligence services for heavy ML compute, and a Supabase security/data layer with strict Row Level Security. The result is a fast and trustworthy financial intelligence cockpit already used in live workflows.",
      de: "Wir haben eine produktive Split-Architektur geliefert: Next.js SaaS-Frontend fuer Finance-Teams, Python-FastAPI-Intelligence-Services fuer rechenintensive ML-Workloads und eine Supabase-Sicherheits- und Datenschicht mit strikter Row Level Security. Ergebnis ist ein schneller und verlaesslicher Financial-Intelligence-Cockpit fuer reale Workflows.",
    },
    techStack: [
      {
        label: { en: "Frontend", de: "Frontend" },
        items: [
          { en: "Next.js and React for fast SaaS UI", de: "Next.js und React fuer eine schnelle SaaS-UI" },
          { en: "Tailwind CSS with premium glassmorphism visual system", de: "Tailwind CSS mit hochwertigem Glassmorphism-Designsystem" },
          { en: "Recharts for liquidity and trajectory visualization", de: "Recharts fuer Liquiditaets- und Trajektorien-Visualisierung" },
          { en: "PKR-first localization and production deployment on Vercel", de: "PKR-First-Lokalisierung und produktive Bereitstellung auf Vercel" }
        ]
      },
      {
        label: { en: "Backend and AI", de: "Backend und KI" },
        items: [
          { en: "Python and FastAPI services deployed on Railway", de: "Python- und FastAPI-Services auf Railway" },
          { en: "K-Means clustering for mathematical risk tiers", de: "K-Means-Clustering fuer mathematische Risikostufen" },
          { en: "LSTM models for 30, 60 and 90 day liquidity forecasting", de: "LSTM-Modelle fuer 30-, 60- und 90-Tage-Liquiditaetsprognosen" },
          { en: "GAN simulation for macro-shock stress testing", de: "GAN-Simulation fuer Stresstests bei makrooekonomischen Schocks" }
        ]
      },
      {
        label: { en: "Data and Security", de: "Daten und Sicherheit" },
        items: [
          { en: "Supabase PostgreSQL as core transactional data grid", de: "Supabase PostgreSQL als zentrales transaktionales Datengrid" },
          { en: "Strict Row Level Security for tenant-safe access", de: "Strikte Row Level Security fuer mandantensicheren Zugriff" },
          { en: "Supabase Auth with production-safe magic link routing", de: "Supabase Auth mit produktionssicherem Magic-Link-Routing" }
        ]
      }
    ],
    phases: [
      {
        title: { en: "Phase 1: Foundation and UI Grid", de: "Phase 1: Fundament und UI-Grid" },
        description: {
          en: "Established relational data structures for clients and invoices, then delivered a premium operator UI with branded invoice generation and profile workflows.",
          de: "Relationale Datenstrukturen fuer Kunden und Rechnungen aufgebaut und danach eine hochwertige Operator-UI mit gebrandeter Rechnungserstellung und Profil-Workflows geliefert."
        }
      },
      {
        title: { en: "Phase 2: AI Processing Pipeline", de: "Phase 2: KI-Processing-Pipeline" },
        description: {
          en: "Connected the Next.js product layer with a dedicated Python intelligence API so live database metrics could feed K-Means and LSTM models in real time.",
          de: "Die Next.js-Produktschicht mit einer dedizierten Python-Intelligence-API verbunden, sodass Live-Daten aus der Datenbank in Echtzeit in K-Means- und LSTM-Modelle fliessen."
        }
      },
      {
        title: { en: "Phase 3: System Debugging and Optimization", de: "Phase 3: System-Debugging und Optimierung" },
        description: {
          en: "Resolved schema transfer failures, chart rendering race conditions and static date logic by aligning payload contracts, forcing safe chart dimensions, and engineering a live time-sync circuit.",
          de: "Schema-Uebertragungsfehler, Chart-Rendering-Race-Conditions und statische Datumslogik wurden geloest, indem Payload-Vertraege exakt ausgerichtet, sichere Chart-Dimensionen erzwungen und ein Live-Time-Sync-Circuit entwickelt wurden."
        }
      },
      {
        title: { en: "Phase 4: Production Readiness", de: "Phase 4: Produktionsreife" },
        description: {
          en: "Switched authentication redirects to production domain routing, added telemetry through Vercel Analytics and launched an in-app feedback loop wired directly to PostgreSQL.",
          de: "Authentifizierungs-Redirects auf produktive Domain-Routen umgestellt, Telemetrie ueber Vercel Analytics integriert und eine In-App-Feedbackschleife direkt mit PostgreSQL live geschaltet."
        }
      }
    ],
    debuggingHighlights: [
      {
        en: "422 schema sync issue fixed by strict JSON-to-Pydantic contract alignment and explicit numeric casting.",
        de: "422-Schema-Sync-Problem durch strikte JSON-zu-Pydantic-Vertragsausrichtung und explizites Number-Casting behoben."
      },
      {
        en: "Recharts negative width bug removed via enforced minimum render boundaries.",
        de: "Recharts-Negativbreitenfehler durch erzwungene Mindest-Render-Grenzen beseitigt."
      },
      {
        en: "Dynamic time-sync logic added to compute overdue status and payment-delay metrics against live dates.",
        de: "Dynamische Time-Sync-Logik hinzugefuegt, um Overdue-Status und Payment-Delay-Metriken gegen Live-Daten zu berechnen."
      }
    ],
    roadmap: [
      {
        en: "Expand GAN stress simulations for industry-specific regional shocks.",
        de: "GAN-Stresstest-Simulationen auf branchenspezifische regionale Schocks erweitern."
      },
      {
        en: "Automate K-Means clustering with scheduled Supabase Edge Functions.",
        de: "K-Means-Clustering ueber geplante Supabase-Edge-Functions automatisieren."
      }
    ],
    relatedServices: [
      {
        href: "/services/app-development",
        title: { en: "App Development", de: "App-Entwicklung" },
        reason: {
          en: "Cross-platform product engineering and scalable SaaS delivery.",
          de: "Cross-Platform-Produktentwicklung und skalierbare SaaS-Umsetzung."
        }
      },
      {
        href: "/services/web-development",
        title: { en: "Web Development", de: "Webentwicklung" },
        reason: {
          en: "High-performance dashboard architecture and conversion-ready web UX.",
          de: "High-Performance-Dashboard-Architektur und conversionstarke Web-UX."
        }
      },
      {
        href: "/services/workflow-automation",
        title: { en: "Workflow Automation", de: "Prozessautomatisierung" },
        reason: {
          en: "Automated financial operations, data pipelines and process reliability.",
          de: "Automatisierte Finanzprozesse, Datenpipelines und stabile Ablauflogik."
        }
      }
    ]
  },
  {
    slug: "green-navigator",
    heroImage: "/projects/green-navigator.jpg",
    title: { en: "Green Navigator", de: "Green Navigator" },
    subtitle: {
      en: "Carbon reporting, finally simple. Utility bills to audit-ready emissions insights in minutes.",
      de: "Carbon Reporting endlich einfach. Von Versorgerrechnungen zu auditfaehigen Emissionsdaten in Minuten."
    },
    category: { en: "Climate SaaS and Carbon Intelligence", de: "Climate SaaS und Carbon Intelligence" },
    summary: {
      en: "Green Navigator is live as a climate-focused SaaS platform that converts utility bills into compliance-ready emissions intelligence in minutes. Operations teams now move from unstructured documents to auditable carbon reporting workflows with speed, clarity and measurable confidence.",
      de: "Green Navigator ist als climate-fokussierte SaaS-Plattform live und wandelt Versorgerrechnungen in Minuten in compliance-faehige Emissions-Insights um. Operations-Teams gelangen damit schnell von unstrukturierten Dokumenten zu auditierbaren Carbon-Reporting-Workflows mit klaren Kennzahlen."
    },
    keywords: {
      en: [
        "carbon reporting software",
        "emissions dashboard development",
        "utility bill parsing ai",
        "nextjs saas platform development",
        "compliance reporting workflow",
        "climate tech web app",
        "workflow automation for operations",
        "ai integration services"
      ],
      de: [
        "carbon reporting software",
        "emissions dashboard entwicklung",
        "versorgerrechnung parsing ki",
        "nextjs saas plattform entwicklung",
        "compliance reporting workflow",
        "climate tech web app",
        "prozessautomatisierung operations",
        "ki integration agentur"
      ]
    },
    challenge: {
      en: "Manual carbon accounting was too slow, too error-prone and too opaque for modern operations teams. They needed accurate regional estimation and audit-ready reporting without spreadsheet-heavy workflows.",
      de: "Manuelles Carbon Accounting war fuer moderne Operations-Teams zu langsam, zu fehleranfaellig und zu intransparent. Benoetigt wurde eine Loesung mit regional korrekter Berechnung und auditfaehigem Reporting ohne Spreadsheet-Last."
    },
    solution: {
      en: "We delivered a production-grade full-stack SaaS product on Next.js with AI parsing and carbon-estimation APIs. The system combines onboarding context, document extraction, dashboard intelligence and compliance-oriented reporting UX into one workflow that teams can rely on daily.",
      de: "Wir haben ein produktionsreifes Full-Stack-SaaS-Produkt mit Next.js sowie KI-Parsing- und Carbon-Berechnungs-APIs geliefert. Das System vereint Onboarding-Kontext, Dokumentenextraktion, Dashboard-Intelligence und compliance-orientierte Reporting-UX in einem Workflow, auf den Teams taeglich vertrauen."
    },
    techStack: [
      {
        label: { en: "Frontend and UX", de: "Frontend und UX" },
        items: [
          { en: "Next.js App Router, React 19 and TypeScript", de: "Next.js App Router, React 19 und TypeScript" },
          { en: "Tailwind CSS v4, shadcn/ui and Radix UI", de: "Tailwind CSS v4, shadcn/ui und Radix UI" },
          { en: "Framer Motion and Lucide icons for premium UX details", de: "Framer Motion und Lucide Icons fuer hochwertige UX-Details" },
          { en: "Recharts dashboards for trend and source breakdown analysis", de: "Recharts-Dashboards fuer Trend- und Quellenanalyse" }
        ]
      },
      {
        label: { en: "Data and Intelligence", de: "Daten und Intelligence" },
        items: [
          { en: "Gemini API for utility bill parsing via PDF and image intake", de: "Gemini API fuer Utility-Bill-Parsing per PDF- und Bild-Upload" },
          { en: "Climatiq API for emissions estimation and non-PK fallback logic", de: "Climatiq API fuer Emissionsberechnung und Non-PK-Fallback-Logik" },
          { en: "Regional carbon-estimation logic including Pakistan-specific pathways", de: "Regionale Carbon-Berechnungslogik inklusive Pakistan-spezifischer Pfade" },
          { en: "Zod and React Hook Form for robust validation pipelines", de: "Zod und React Hook Form fuer robuste Validierungspipelines" }
        ]
      },
      {
        label: { en: "Tooling and Delivery", de: "Tooling und Delivery" },
        items: [
          { en: "Vercel deployment and web analytics", de: "Vercel-Deployment und Web-Analytics" },
          { en: "ESLint and PostCSS for engineering quality", de: "ESLint und PostCSS fuer Engineering-Qualitaet" },
          { en: "Component-driven architecture for long-term maintainability", de: "Komponentenbasierte Architektur fuer langfristige Wartbarkeit" }
        ]
      }
    ],
    phases: [
      {
        title: { en: "Phase 1: Product Foundation", de: "Phase 1: Produkt-Fundament" },
        description: {
          en: "Defined the platform around sustainability operations workflows with a clear split between marketing pages and authenticated app areas including onboarding, dashboard, reports and account flows.",
          de: "Die Plattform wurde entlang realer Sustainability-Operations-Workflows aufgebaut, mit klarer Trennung zwischen Marketingbereich und authentifiziertem App-Bereich inklusive Onboarding, Dashboard, Reports und Account-Flows."
        }
      },
      {
        title: { en: "Phase 2: Document-to-Data Pipeline", de: "Phase 2: Dokument-zu-Daten-Pipeline" },
        description: {
          en: "Implemented upload-to-intelligence flow where utility bills trigger parsing and emissions APIs, converting unstructured files into structured and reportable carbon signals.",
          de: "Ein Upload-zu-Intelligence-Flow wurde umgesetzt, bei dem Versorgerrechnungen Parsing- und Emissions-APIs ausloesen und unstrukturierte Dateien in strukturierte, reportbare Carbon-Signale ueberfuehren."
        }
      },
      {
        title: { en: "Phase 3: Dashboard and Reporting UX", de: "Phase 3: Dashboard- und Reporting-UX" },
        description: {
          en: "Built interactive emissions dashboards with trends and source breakdowns, then shaped reporting surfaces designed for audit-readiness and compliance expansion.",
          de: "Interaktive Emissions-Dashboards mit Trends und Source-Breakdowns wurden entwickelt und um Reporting-Flaechen ergaenzt, die auf Audit-Readiness und Compliance-Erweiterung ausgelegt sind."
        }
      },
      {
        title: { en: "Phase 4: Operational Scaling Roadmap", de: "Phase 4: Skalierungs-Roadmap" },
        description: {
          en: "Prepared the system for upcoming auth hardening, persistent storage, Scope 3 expansion, exportable compliance templates, RBAC and production observability.",
          de: "Das System wurde auf die naechsten Skalierungsschritte vorbereitet: Auth-Hardening, persistente Speicherung, Scope-3-Erweiterung, exportierbare Compliance-Templates, RBAC und produktive Observability."
        }
      }
    ],
    debuggingHighlights: [
      {
        en: "Created a stable parse and calculate API handoff between bill extraction and emission estimation.",
        de: "Ein stabiler API-Handoff zwischen Bill-Extraktion und Emissionsberechnung wurde etabliert."
      },
      {
        en: "Designed region-aware estimation logic to handle Pakistan-specific and fallback pathways.",
        de: "Eine regionsspezifische Berechnungslogik fuer Pakistan-spezifische und Fallback-Pfade wurde umgesetzt."
      },
      {
        en: "Structured dashboard data and visualization layers for clear operational decision support.",
        de: "Dashboard-Daten und Visualisierungsebenen wurden fuer klare operative Entscheidungsunterstuetzung strukturiert."
      }
    ],
    roadmap: [
      {
        en: "Real authentication and persistent user/session lifecycle.",
        de: "Echte Authentifizierung und persistenter User-/Session-Lifecycle."
      },
      {
        en: "Supabase-backed storage for uploads and emissions history.",
        de: "Supabase-basierte Speicherung fuer Uploads und Emissionshistorie."
      },
      {
        en: "Expanded Scope 3 calculators and exportable GHG/ISO compliance templates.",
        de: "Erweiterte Scope-3-Rechner und exportierbare GHG-/ISO-Compliance-Templates."
      },
      {
        en: "Team-level RBAC and production-grade observability with audit logs.",
        de: "Team-basiertes RBAC und produktionsreife Observability mit Audit-Logs."
      }
    ],
    relatedServices: [
      {
        href: "/services/web-development",
        title: { en: "Web Development", de: "Webentwicklung" },
        reason: {
          en: "Performance-first SaaS interfaces and SEO-ready product surfaces.",
          de: "Performance-optimierte SaaS-Interfaces und SEO-faehige Produktoberflaechen."
        }
      },
      {
        href: "/services/app-development",
        title: { en: "App Development", de: "App-Entwicklung" },
        reason: {
          en: "End-to-end product architecture for scalable climate-focused software.",
          de: "End-to-End-Produktarchitektur fuer skalierbare climate-fokussierte Software."
        }
      },
      {
        href: "/services/workflow-automation",
        title: { en: "Workflow Automation", de: "Prozessautomatisierung" },
        reason: {
          en: "Automated intake, extraction and reporting workflows for operations teams.",
          de: "Automatisierte Intake-, Extraktions- und Reporting-Workflows fuer Operations-Teams."
        }
      },
      {
        href: "/services/ai-chatbots-agents",
        title: { en: "AI Chatbots and Agents", de: "KI-Chatbots und Agenten" },
        reason: {
          en: "Practical AI integration patterns for parsing and data intelligence pipelines.",
          de: "Praxiserprobte KI-Integrationsmuster fuer Parsing- und Daten-Intelligence-Pipelines."
        }
      }
    ]
  },
  {
    slug: "visapath",
    heroImage: "/projects/visapath.jpg",
    title: { en: "VisaPath", de: "VisaPath" },
    subtitle: {
      en: "AI-powered visa strategy optimization for digital nomads, frequent travelers and expats.",
      de: "KI-gestuetzte Visa-Strategieoptimierung fuer digitale Nomaden, Vielreisende und Expats."
    },
    category: { en: "Travel Tech SaaS and Mobility Intelligence", de: "Travel-Tech-SaaS und Mobility Intelligence" },
    summary: {
      en: "VisaPath is live as a modern B2C SaaS platform helping users optimize global mobility decisions across citizenships. It combines access mapping, AI route optimization and embassy intelligence so travelers can plan smarter, reduce friction and move with confidence.",
      de: "VisaPath ist als moderne B2C-SaaS-Plattform live und hilft Nutzern, globale Mobilitaetsentscheidungen ueber mehrere Staatsbuergerschaften hinweg zu optimieren. Die Loesung kombiniert Access-Mapping, KI-Routenoptimierung und Embassy-Intelligence, damit Reisen planbarer, schneller und sicherer werden."
    },
    keywords: {
      en: [
        "travel tech saas development",
        "visa strategy optimization platform",
        "ai route optimization app",
        "nextjs b2c saas development",
        "supabase auth rls architecture",
        "maptiler interactive map application",
        "subscription paywall edge rate limiting",
        "app development for digital nomads"
      ],
      de: [
        "travel tech saas entwicklung",
        "visa strategie optimierung plattform",
        "ki routenoptimierung app",
        "nextjs b2c saas entwicklung",
        "supabase auth rls architektur",
        "maptiler interaktive kartenanwendung",
        "subscription paywall edge rate limiting",
        "app entwicklung fuer digitale nomaden"
      ]
    },
    challenge: {
      en: "Users with one or more passports struggled to compare visa access, optimize multi-country plans and manage embassy logistics in a single reliable workflow.",
      de: "Nutzer mit einer oder mehreren Staatsbuergerschaften hatten keinen verlaesslichen Workflow, um Visa-Zugang zu vergleichen, Multi-Country-Reisen zu optimieren und Embassy-Prozesse zentral zu steuern."
    },
    solution: {
      en: "We built a full-stack travel intelligence SaaS with premium glassmorphism UX, Supabase-secured account architecture, and an AI engine that computes optimized routes with practical cost and transport guidance.",
      de: "Wir haben ein Full-Stack-Travel-Intelligence-SaaS mit hochwertiger Glassmorphism-UX, Supabase-gesicherter Account-Architektur und KI-Engine entwickelt, die optimierte Routen inklusive Kosten- und Transporthinweisen berechnet."
    },
    techStack: [
      {
        label: { en: "Frontend and Product Experience", de: "Frontend und Produkterlebnis" },
        items: [
          { en: "Next.js App Router with SSR-ready SaaS architecture", de: "Next.js App Router mit SSR-faehiger SaaS-Architektur" },
          { en: "Tailwind CSS, Radix UI and Framer Motion for premium UX", de: "Tailwind CSS, Radix UI und Framer Motion fuer hochwertige UX" },
          { en: "MapTiler SDK for interactive global access and path maps", de: "MapTiler SDK fuer interaktive globale Access- und Pfadkarten" },
          { en: "Lucide iconography and component-driven UI system", de: "Lucide-Iconografie und komponentengetriebenes UI-System" }
        ]
      },
      {
        label: { en: "Data, Auth and Security", de: "Daten, Auth und Sicherheit" },
        items: [
          { en: "Supabase PostgreSQL with profiles and user_passports schema", de: "Supabase PostgreSQL mit profiles- und user_passports-Schema" },
          { en: "Strict Row Level Security isolating each user data scope", de: "Strikte Row Level Security zur sauberen Nutzer-Datenisolation" },
          { en: "Production-safe Supabase auth across account flows", de: "Produktionssichere Supabase-Authentifizierung ueber alle Account-Flows" },
          { en: "Pro-tier gating with API-level edge rate-limiting rules", de: "Pro-Tier-Gating mit API-seitigen Edge-Rate-Limiting-Regeln" }
        ]
      },
      {
        label: { en: "AI and Optimization Engine", de: "KI- und Optimierungs-Engine" },
        items: [
          { en: "Llama 3 via Groq API for route optimization logic", de: "Llama 3 via Groq API fuer die Routenoptimierungslogik" },
          { en: "Constraint-aware itinerary generation for multi-country travel", de: "Constraint-basierte Itinerary-Generierung fuer Multi-Country-Reisen" },
          { en: "Integrated visa-cost, transport and route tradeoff outputs", de: "Integrierte Ausgabe von Visa-Kosten, Transportoptionen und Routen-Tradeoffs" }
        ]
      }
    ],
    phases: [
      {
        title: { en: "Phase 1: Core Platform and Identity Layer", de: "Phase 1: Kernplattform und Identity-Layer" },
        description: {
          en: "Built the secure account foundation with Supabase auth and user profile schemas, including support for multi-passport identity models.",
          de: "Das sichere Account-Fundament wurde mit Supabase-Auth und User-Profile-Schemas aufgebaut, inklusive Support fuer Multi-Passport-Identitaetsmodelle."
        }
      },
      {
        title: { en: "Phase 2: Global Access Intelligence", de: "Phase 2: Global Access Intelligence" },
        description: {
          en: "Implemented interactive global access mapping that computes destination eligibility across up to multiple citizenship combinations.",
          de: "Ein interaktives Global-Access-Mapping wurde umgesetzt, das Ziel-Land-Zugaenge ueber mehrere Staatsbuergerschafts-Kombinationen berechnet."
        }
      },
      {
        title: { en: "Phase 3: AI Route Optimizer", de: "Phase 3: KI-Routenoptimierer" },
        description: {
          en: "Delivered an AI trip planning engine that transforms destination constraints into mathematically optimized routes with cost and transport suggestions.",
          de: "Eine KI-Trip-Planning-Engine wurde geliefert, die Reise-Constraints in mathematisch optimierte Routen mit Kosten- und Transportempfehlungen umwandelt."
        }
      },
      {
        title: { en: "Phase 4: Monetization and Scale Controls", de: "Phase 4: Monetarisierung und Skalierungssteuerung" },
        description: {
          en: "Introduced subscription-aware feature gating and API protections so Pro and Team capabilities stay performant and secure under growth.",
          de: "Subscription-basiertes Feature-Gating und API-Schutzmechanismen wurden eingefuehrt, damit Pro- und Team-Funktionen auch bei Wachstum performant und sicher bleiben."
        }
      }
    ],
    debuggingHighlights: [
      {
        en: "Hardened RLS policies to guarantee strict per-user row isolation for passports and profiles.",
        de: "RLS-Policies wurden gehaertet, um eine strikte nutzerspezifische Zeilenisolation fuer Passdaten und Profile sicherzustellen."
      },
      {
        en: "Stabilized map and route rendering paths for smooth multi-destination visualization.",
        de: "Map- und Routen-Rendering-Pfade wurden stabilisiert, um eine fluessige Multi-Destination-Visualisierung zu garantieren."
      },
      {
        en: "Enforced API-level rate limiting and plan checks to protect premium optimization endpoints.",
        de: "API-seitiges Rate-Limiting und Plan-Checks wurden konsequent durchgesetzt, um Premium-Optimierungsendpunkte zu schuetzen."
      }
    ],
    roadmap: [
      {
        en: "Expand embassy intelligence with richer real-time appointment signals.",
        de: "Embassy-Intelligence mit erweiterten Echtzeit-Signalen fuer Termine ausbauen."
      },
      {
        en: "Add collaborative trip planning workflows for team and family accounts.",
        de: "Kollaborative Trip-Planning-Workflows fuer Team- und Familienaccounts erweitern."
      }
    ],
    relatedServices: [
      {
        href: "/services/app-development",
        title: { en: "App Development", de: "App-Entwicklung" },
        reason: {
          en: "Built as a scalable B2C SaaS application with robust user lifecycle architecture.",
          de: "Als skalierbare B2C-SaaS-Anwendung mit robuster User-Lifecycle-Architektur umgesetzt."
        }
      },
      {
        href: "/services/web-development",
        title: { en: "Web Development", de: "Webentwicklung" },
        reason: {
          en: "High-performance web experience combining SSR, maps and conversion-ready UX.",
          de: "High-Performance-Web-Erlebnis mit SSR, interaktiven Karten und conversionstarker UX."
        }
      },
      {
        href: "/services/ai-chatbots-agents",
        title: { en: "AI Chatbots and Agents", de: "KI-Chatbots und Agenten" },
        reason: {
          en: "LLM-based optimization workflows delivering practical travel intelligence outputs.",
          de: "LLM-basierte Optimierungs-Workflows mit praxisnahen Travel-Intelligence-Ergebnissen."
        }
      },
      {
        href: "/services/workflow-automation",
        title: { en: "Workflow Automation", de: "Prozessautomatisierung" },
        reason: {
          en: "Automated logic for tiering, query controls and structured route generation pipelines.",
          de: "Automatisierte Logik fuer Tiering, Query-Kontrolle und strukturierte Routen-Generierungspipelines."
        }
      }
    ]
  },
  {
    slug: "overwatch-ai",
    heroImage: "/projects/overwatch.jpg",
    title: { en: "Overwatch AI", de: "Overwatch AI" },
    subtitle: {
      en: "A high-performance AI command center intercepting multimodal scam threats in real time.",
      de: "Ein hochperformantes KI-Command-Center zur Echtzeit-Erkennung multimodaler Scam-Bedrohungen."
    },
    category: { en: "Security AI and Threat Intelligence", de: "Security AI und Threat Intelligence" },
    summary: {
      en: "Overwatch AI is live as a security-focused command center built to expose AI-powered scams across voice, image and text channels. It delivers multimodal threat intelligence with a cinematic product experience and actionable verdict dashboards teams can trust under pressure.",
      de: "Overwatch AI ist als sicherheitsfokussiertes Command-Center live und erkennt KI-gestuetzte Betrugsversuche ueber Voice-, Bild- und Textkanaele. Die Plattform liefert multimodale Threat Intelligence mit cineastischer Produkt-UX und klaren Verdict-Dashboards fuer schnelle Entscheidungen unter Druck."
    },
    keywords: {
      en: [
        "ai scam detection platform",
        "multimodal threat detection",
        "voice phishing detection ai",
        "image phishing analysis software",
        "nextjs security dashboard development",
        "gemini multimodal api integration",
        "real-time cyber threat intelligence ui",
        "ai security command center"
      ],
      de: [
        "ki scam detection plattform",
        "multimodale bedrohungserkennung",
        "voice phishing erkennung ki",
        "bild phishing analyse software",
        "nextjs security dashboard entwicklung",
        "gemini multimodal api integration",
        "echtzeit threat intelligence dashboard",
        "ki security command center"
      ]
    },
    challenge: {
      en: "Scam attempts increasingly combine synthetic voice, manipulated visuals and engineered text pressure. Security teams needed a single system that can classify multimodal threats fast and explain risk with operational clarity.",
      de: "Betrugsversuche kombinieren zunehmend synthetische Stimmen, manipulierte Bilder und psychologischen Textdruck. Security-Teams brauchten ein zentrales System, das multimodale Bedrohungen schnell klassifiziert und Risiken operativ klar erklaert."
    },
    solution: {
      en: "We built a Next.js command center with a real-time scan pipeline powered by Gemini 3.1 Flash. The platform ingests audio, screenshots, text and URLs, then returns strict JSON intelligence including threat levels, authenticity scores and manipulation-tactic evidence.",
      de: "Wir haben ein Next.js-Command-Center mit Echtzeit-Scan-Pipeline auf Basis von Gemini 3.1 Flash entwickelt. Die Plattform verarbeitet Audio, Screenshots, Text und URLs und liefert strukturierte JSON-Intelligence mit Threat-Level, Authenticity-Score und belegbaren Manipulationsmustern."
    },
    techStack: [
      {
        label: { en: "Frontend and Experience", de: "Frontend und Experience" },
        items: [
          { en: "Next.js 14 and React command-center architecture", de: "Next.js-14- und React-Command-Center-Architektur" },
          { en: "Tailwind CSS and Framer Motion for cinematic interaction design", de: "Tailwind CSS und Framer Motion fuer cineastisches Interaction Design" },
          { en: "State-driven UI flow: Idle, Scanning, Verdict", de: "State-gesteuerter UI-Flow: Idle, Scanning, Verdict" },
          { en: "Responsive glassmorphism styling with threat-color accents", de: "Responsive Glassmorphism-Styling mit bedrohungsbasierten Farbakzenten" }
        ]
      },
      {
        label: { en: "AI and Detection Engine", de: "KI- und Detection-Engine" },
        items: [
          { en: "Gemini 3.1 Flash multimodal models via @google/generative-ai", de: "Gemini-3.1-Flash-Multimodalmodelle via @google/generative-ai" },
          { en: "Dynamic system prompt construction by media type", de: "Dynamische System-Prompt-Generierung je nach Medientyp" },
          { en: "Strict JSON schema enforcement for reliable machine-readable verdicts", de: "Strikte JSON-Schema-Validierung fuer zuverlaessige maschinenlesbare Verdicts" },
          { en: "Threat level, authenticity scoring and tactic-level intelligence outputs", de: "Threat-Level-, Authenticity-Score- und Taktik-basierte Intelligence-Ausgabe" }
        ]
      },
      {
        label: { en: "Backend and Delivery", de: "Backend und Delivery" },
        items: [
          { en: "Next.js serverless scan API for secure inference orchestration", de: "Next.js-Serverless-Scan-API fuer sichere Inference-Orchestrierung" },
          { en: "Payload parsing for text, URLs and file uploads", de: "Payload-Verarbeitung fuer Text, URLs und Datei-Uploads" },
          { en: "Production deployment with high-speed global delivery", de: "Produktive Bereitstellung mit schneller globaler Auslieferung" }
        ]
      }
    ],
    phases: [
      {
        title: { en: "Phase 1: Threat Intelligence Product Definition", de: "Phase 1: Threat-Intelligence-Produktdefinition" },
        description: {
          en: "Defined the command-center UX around rapid triage: from input ingestion to final verdict in a single guided interface.",
          de: "Die Command-Center-UX wurde auf schnelle Triage ausgelegt: von der Dateneingabe bis zum finalen Verdict in einer gefuehrten Oberflaeche."
        }
      },
      {
        title: { en: "Phase 2: Multimodal Scan Pipeline", de: "Phase 2: Multimodale Scan-Pipeline" },
        description: {
          en: "Implemented the scan API to process voice notes, screenshots, text and URLs, then route each input through media-aware AI prompting paths.",
          de: "Die Scan-API wurde implementiert, um Voice Notes, Screenshots, Text und URLs zu verarbeiten und jeden Input ueber medientyp-spezifische KI-Promptpfade zu analysieren."
        }
      },
      {
        title: { en: "Phase 3: Structured Verdict Intelligence", de: "Phase 3: Strukturierte Verdict-Intelligence" },
        description: {
          en: "Added strict structured-response contracts so every analysis returns consistent fields for threat level, authenticity and manipulation techniques.",
          de: "Strikte strukturierte Response-Vertraege wurden eingefuehrt, damit jede Analyse konsistente Felder fuer Threat-Level, Authentizitaet und Manipulationstechniken liefert."
        }
      },
      {
        title: { en: "Phase 4: Cinematic Operational Interface", de: "Phase 4: Cineastische Operative Oberflaeche" },
        description: {
          en: "Delivered a high-feedback interface with scanning animations, radar pulses and final verdict dashboards that improve confidence and speed during investigations.",
          de: "Eine hochreaktive Oberflaeche mit Scanning-Animationen, Radar-Pulses und finalen Verdict-Dashboards wurde geliefert, um Sicherheit und Geschwindigkeit in Ermittlungsprozessen zu steigern."
        }
      }
    ],
    debuggingHighlights: [
      {
        en: "Stabilized multimodal payload handling to support mixed input types without scan interruptions.",
        de: "Die multimodale Payload-Verarbeitung wurde stabilisiert, um gemischte Input-Typen ohne Scan-Unterbrechungen zu unterstuetzen."
      },
      {
        en: "Hardened JSON schema validation to prevent malformed AI outputs from reaching the verdict UI.",
        de: "Die JSON-Schema-Validierung wurde gehaertet, damit fehlerhafte KI-Ausgaben nicht in die Verdict-UI gelangen."
      },
      {
        en: "Optimized animated scanning states for responsive performance across desktop and mobile devices.",
        de: "Die animierten Scanning-States wurden fuer eine responsive Performance auf Desktop- und Mobile-Geraeten optimiert."
      }
    ],
    roadmap: [
      {
        en: "Expand threat taxonomy and intelligence memory for broader scam pattern coverage.",
        de: "Die Threat-Taxonomie und Intelligence-Memory werden fuer breitere Scam-Pattern-Abdeckung erweitert."
      },
      {
        en: "Add investigator collaboration modes and historical case comparison workflows.",
        de: "Kollaborative Investigator-Modi und historische Fallvergleichs-Workflows werden hinzugefuegt."
      }
    ],
    relatedServices: [
      {
        href: "/services/ai-chatbots-agents",
        title: { en: "AI Chatbots and Agents", de: "KI-Chatbots und Agenten" },
        reason: {
          en: "Advanced multimodal model integration and structured intelligence orchestration.",
          de: "Fortgeschrittene multimodale Modellintegration und strukturierte Intelligence-Orchestrierung."
        }
      },
      {
        href: "/services/web-development",
        title: { en: "Web Development", de: "Webentwicklung" },
        reason: {
          en: "Real-time command-center UX built for performance, clarity and trust.",
          de: "Echtzeit-Command-Center-UX mit Fokus auf Performance, Klarheit und Vertrauen."
        }
      },
      {
        href: "/services/app-development",
        title: { en: "App Development", de: "App-Entwicklung" },
        reason: {
          en: "Scalable application architecture across UI state orchestration and API layers.",
          de: "Skalierbare Applikationsarchitektur ueber UI-State-Orchestrierung und API-Schichten."
        }
      },
      {
        href: "/services/workflow-automation",
        title: { en: "Workflow Automation", de: "Prozessautomatisierung" },
        reason: {
          en: "Automated scanning workflows for consistent threat triage and response handling.",
          de: "Automatisierte Scanning-Workflows fuer konsistente Threat-Triage und Response-Handling."
        }
      }
    ]
  }
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
