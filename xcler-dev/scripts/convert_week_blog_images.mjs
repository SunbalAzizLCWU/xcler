import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public", "blog");
const ASSETS = "C:\\Users\\pc\\.cursor\\projects\\d-All-Data-xcler\\assets";
fs.mkdirSync(PUBLIC, { recursive: true });

const ink = "#07080c";
const charcoal = "#10131a";
const cream = "#f2f4f7";
const sage = "#2dff9a";
const terracotta = "#ff4d1c";
const stone = "#8b93a7";

const covers = [
  "blog-enterprise-multi-agent-cover",
  "blog-model-cost-cuts-cover",
  "blog-enterprise-agent-platforms-cover",
  "blog-voice-multimodal-cover",
  "blog-agent-memory-cover",
  "blog-agentic-commerce-cover",
  "blog-nocode-agent-builder-cover",
  "blog-agent-messaging-cover",
  "blog-research-agents-cover",
  "blog-agent-infra-cover",
];

for (const name of covers) {
  const src = path.join(ASSETS, `${name}.png`);
  if (!fs.existsSync(src)) {
    console.warn("missing cover", src);
    continue;
  }
  const dest = path.join(PUBLIC, `${name}.webp`);
  await sharp(src).resize(1600, 900, { fit: "cover" }).webp({ quality: 86 }).toFile(dest);
  console.log("cover", dest);
}

function cardSvg(title, columns) {
  const colW = 360;
  const startX = 80;
  const cards = columns
    .map((col, i) => {
      const x = startX + i * (colW + 40);
      const items = col.items
        .map((item, j) => `<text x="${x + 28}" y="${220 + j * 36}" fill="${cream}" font-family="IBM Plex Mono, monospace" font-size="16">${item}</text>`)
        .join("");
      return `
        <rect x="${x}" y="140" width="${colW}" height="420" fill="${charcoal}" stroke="${i === 1 ? sage : "rgba(242,244,247,0.12)"}" stroke-width="1.5"/>
        <rect x="${x}" y="140" width="6" height="420" fill="${col.accent}"/>
        <text x="${x + 28}" y="188" fill="${col.accent}" font-family="Syne, sans-serif" font-size="22" font-weight="700">${col.title}</text>
        ${items}
      `;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="720" viewBox="0 0 1600 720">
  <rect width="1600" height="720" fill="${ink}"/>
  <text x="80" y="72" fill="${stone}" font-family="IBM Plex Mono, monospace" font-size="14" letter-spacing="6">${title}</text>
  <rect x="80" y="88" width="64" height="2" fill="${sage}"/>
  ${cards}
</svg>`;
}

const diagrams = {
  "blog-enterprise-multi-agent-diagram": cardSvg("XCLER  ·  PRODUCTION PATTERN", [
    { title: "Chatbot", accent: stone, items: ["Answers questions", "No tools", "Human closes work", "Low blast radius"] },
    { title: "Workflow", accent: terracotta, items: ["Fixed path", "Predictable cost", "Auditable", "Breaks on novelty"] },
    { title: "Multi-agent", accent: sage, items: ["Goal + tools", "Long horizon", "Needs guardrails", "Highest leverage"] },
  ]),
  "blog-model-cost-cuts-diagram": cardSvg("XCLER  ·  WHAT GOT CHEAPER", [
    { title: "Before", accent: terracotta, items: ["Frontier-only agents", "High error retries", "Pilot-only volume", "Budget fear"] },
    { title: "This week", accent: sage, items: ["Lower API unit cost", "Fewer retries", "More steps per euro", "Wider production"] },
    { title: "Still true", accent: stone, items: ["Eval harness required", "Tool spend dominates", "Human approval", "Trace everything"] },
  ]),
  "blog-enterprise-agent-platforms-diagram": cardSvg("XCLER  ·  WHERE AGENTS LAND", [
    { title: "CRM / sales", accent: sage, items: ["Lead research", "Next-best action", "Quote drafts", "Handoff to AE"] },
    { title: "Service", accent: terracotta, items: ["Ticket triage", "Knowledge RAG", "Voice + chat", "Escalation rules"] },
    { title: "Ops / finance", accent: stone, items: ["Invoice exceptions", "Master-data fixes", "Durable runs", "Audit trail"] },
  ]),
  "blog-voice-multimodal-diagram": cardSvg("XCLER  ·  CHANNEL LOOP", [
    { title: "Listen", accent: terracotta, items: ["STT transcript", "Intent + entities", "Auth / CRM lookup", "Policy check"] },
    { title: "Act", accent: sage, items: ["Tools / workflow", "Screen or form", "Confirm out loud", "Write the ticket"] },
    { title: "Close", accent: stone, items: ["Human takeover", "Summary in CRM", "No audio stored", "Cost per minute"] },
  ]),
  "blog-agent-memory-diagram": cardSvg("XCLER  ·  MEMORY LAYERS", [
    { title: "Ephemeral", accent: stone, items: ["Current turn", "Tool results", "Scratch notes", "Discard after job"] },
    { title: "Task memory", accent: sage, items: ["What worked", "Failure traces", "Per-job store", "Eval against it"] },
    { title: "Company KB", accent: terracotta, items: ["Policies / SKUs", "Permissions", "Citations", "Source of truth"] },
  ]),
  "blog-agentic-commerce-diagram": cardSvg("XCLER  ·  COMMERCE FRICTION", [
    { title: "Opportunity", accent: sage, items: ["Compare SKUs", "Fill checkout", "Reorder", "Support returns"] },
    { title: "Walls", accent: terracotta, items: ["Bot blocks", "ToS gaps", "Payment risk", "Identity unclear"] },
    { title: "Safe path", accent: stone, items: ["Official APIs", "Human confirm", "Logged consent", "Merchant policy"] },
  ]),
  "blog-nocode-agent-builder-diagram": cardSvg("XCLER  ·  WHO SHOULD BUILD", [
    { title: "No-code", accent: sage, items: ["Ops / service leads", "Governed tools", "Fast pilots", "Policy templates"] },
    { title: "Low-code", accent: terracotta, items: ["n8n + MCP", "Custom tools", "EU hosting", "Git export"] },
    { title: "Engineered", accent: stone, items: ["Eval harness", "Permissions", "Observability", "Production SLA"] },
  ]),
  "blog-agent-messaging-diagram": cardSvg("XCLER  ·  WORK CHAT SHIFT", [
    { title: "Human chat", accent: stone, items: ["Status pings", "Copy-paste", "Lost context", "After-hours lag"] },
    { title: "Bot in Slack", accent: terracotta, items: ["Commands", "Thin memory", "Another tab", "Still a sidekick"] },
    { title: "Agent-native", accent: sage, items: ["Goal in thread", "Tools in place", "Durable jobs", "Human only on risk"] },
  ]),
  "blog-research-agents-diagram": cardSvg("XCLER  ·  LAB / DESK LOOP", [
    { title: "Ingest", accent: stone, items: ["Papers / patents", "Lab notes", "Chunk + cite", "Access control"] },
    { title: "Agent", accent: sage, items: ["Hypothesis", "Tool experiments", "Interactive paper", "Trace the claims"] },
    { title: "Human", accent: terracotta, items: ["Review science", "Safety gates", "Publish / file", "Own the result"] },
  ]),
  "blog-agent-infra-diagram": cardSvg("XCLER  ·  WHERE WORK RUNS", [
    { title: "GPU cluster", accent: terracotta, items: ["Frontier reasoning", "Burst jobs", "High $ / token", "Queue risk"] },
    { title: "CPU fleet", accent: stone, items: ["Tool execution", "RAG retrieve", "Deterministic steps", "Cheaper scale"] },
    { title: "On-device", accent: sage, items: ["Private tool calls", "Low latency", "Offline fallback", "Weaker models"] },
  ]),
};

for (const [name, svg] of Object.entries(diagrams)) {
  const dest = path.join(PUBLIC, `${name}.webp`);
  await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(dest);
  console.log("diagram", dest);
}

console.log("done");
