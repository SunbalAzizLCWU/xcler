import fs from "fs";
import path from "path";

function parseVol(v) {
  if (!v) return 0;
  const s = String(v).replace(/[",]/g, "").trim();
  if (/k$/i.test(s)) return parseFloat(s) * 1000;
  return parseFloat(s) || 0;
}

function splitCSV(line) {
  const out = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      q = !q;
      continue;
    }
    if (c === "," && !q) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += c;
  }
  out.push(cur);
  return out;
}

function parseMagic(file) {
  const t = fs.readFileSync(file, "utf8");
  const lines = t.split(/\r?\n/).filter(Boolean);
  const header = splitCSV(lines[0]).map((h) => h.trim());
  const volIdx = Math.max(0, header.findIndex((h) => /^Volume$/i.test(h)));
  const kdIdx = header.findIndex((h) => /KD/i.test(h));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSV(lines[i]);
    const kw = (cols[1] || "").replace(/\u200b/g, "").trim();
    const intent = (cols[2] || "").trim();
    const vol = parseVol(cols[volIdx]);
    const kd = parseFloat((cols[kdIdx] || "").replace(/n\/a/i, "")) || 0;
    if (kw && vol > 0) rows.push({ kw, intent, vol, kd });
  }
  return rows;
}

const dir = "d:/All Data/xcler/semrushresearch";
const files = fs.readdirSync(dir).filter((f) => f.startsWith("table-export") && f.endsWith(".csv"));
const all = [];
for (const f of files) {
  try {
    all.push(...parseMagic(path.join(dir, f)));
  } catch {}
}
const map = new Map();
for (const r of all) {
  const k = r.kw.toLowerCase();
  if (!map.has(k) || map.get(k).vol < r.vol) map.set(k, r);
}
const ranked = [...map.values()].sort((a, b) => b.vol - a.vol);
console.log("TOP 50:");
ranked.slice(0, 50).forEach((r, i) => console.log(`${i + 1}. ${r.vol}\tKD${r.kd}\t${r.intent}\t${r.kw}`));
