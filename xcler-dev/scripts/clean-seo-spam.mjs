import fs from "node:fs";

function cleanString(s) {
  let out = s;
  const markers = [
    "delivery milestones evaluation harnesses",
    "evaluation harnesses retrieval quality human escalation",
  ];
  let changed = false;
  for (const marker of markers) {
    const idx = out.indexOf(marker);
    if (idx !== -1) {
      out = out.slice(0, idx).trim();
      changed = true;
    }
  }
  if (!changed) return s;
  out = out.replace(/[,:;]\s*$/, "").trim();
  if (out.length > 40 && !/[.!?]$/.test(out)) out += ".";
  return out;
}

function walk(obj) {
  if (typeof obj === "string") return cleanString(obj);
  if (Array.isArray(obj)) return obj.map(walk);
  if (obj && typeof obj === "object") {
    const next = {};
    for (const [k, v] of Object.entries(obj)) next[k] = walk(v);
    return next;
  }
  return obj;
}

for (const file of ["messages/en.json", "messages/de.json"]) {
  const raw = fs.readFileSync(file, "utf8");
  const before = (raw.match(/delivery milestones/g) || []).length;
  const cleaned = walk(JSON.parse(raw));
  fs.writeFileSync(file, `${JSON.stringify(cleaned, null, 2)}\n`);
  const after = (fs.readFileSync(file, "utf8").match(/delivery milestones/g) || []).length;
  console.log(file, "spam before", before, "after", after);
}
