/**
 * Apply knowledge-base/scripts/kb_schema.sql to Supabase.
 * Tries the Management API, then a few project SQL endpoints.
 * Run: node scripts/setup_kb_schema.mjs
 */
import fs from "node:fs";
import path from "node:path";

function loadEnv() {
  const file = path.join(process.cwd(), ".env");
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim();
    if (key && !process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const schemaPath = path.join(process.cwd(), "scripts", "kb_schema.sql");
const sql = fs.readFileSync(schemaPath, "utf8");

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const ref = new URL(SUPABASE_URL).hostname.split(".")[0];

async function tablesExist() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/kb_chunks?select=id&limit=1`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });
  if (response.ok) return true;
  const text = await response.text();
  return { ok: false, status: response.status, text: text.slice(0, 300) };
}

async function runSql(url, headers, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  return { ok: response.ok, status: response.status, text: text.slice(0, 500) };
}

const existing = await tablesExist();
if (existing === true) {
  console.log("kb_chunks already exists.");
  process.exit(0);
}

console.log("Schema missing, attempting apply...", existing);

const attempts = [];

if (ACCESS_TOKEN) {
  attempts.push(
    runSql(
      `https://api.supabase.com/v1/projects/${ref}/database/query`,
      { Authorization: `Bearer ${ACCESS_TOKEN}` },
      { query: sql }
    )
  );
}

attempts.push(
  runSql(
    `${SUPABASE_URL}/pg/query`,
    { Authorization: `Bearer ${SERVICE_KEY}`, apikey: SERVICE_KEY },
    { query: sql }
  ),
  runSql(
    `${SUPABASE_URL}/postgres/v1/query`,
    { Authorization: `Bearer ${SERVICE_KEY}`, apikey: SERVICE_KEY },
    { query: sql }
  )
);

let applied = false;
for (const attempt of attempts) {
  const result = await attempt;
  console.log(`SQL attempt ${result.status}: ${result.text}`);
  if (result.ok) {
    applied = true;
    break;
  }
}

const after = await tablesExist();
if (after === true || applied) {
  console.log("Schema is ready.");
  process.exit(0);
}

console.warn(
  "Could not apply DDL from this environment. Create the tables in the Supabase SQL editor using scripts/kb_schema.sql. Ingest will still write data/kb-index.json so chat works locally."
);
process.exit(0);
