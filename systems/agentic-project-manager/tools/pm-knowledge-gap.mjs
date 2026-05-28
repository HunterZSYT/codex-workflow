#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { PM_ROOT, arg, exists } from "./pm-lib.mjs";

const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");
const indexPath = path.join(PM_ROOT, ".retrieval", "knowledge-index.sqlite");

const CAPABILITY_HINTS = [
  { capability: "Layout grid composition", terms: ["layout", "grid", "composition", "responsive layout", "agency homepage"], package: "layout/composition rules" },
  { capability: "Swiss/editorial grid layout", terms: ["swiss", "swiss-style", "editorial grid", "premium agency"], package: "layout/composition rules" },
  { capability: "Color contrast and neutral fallback", terms: ["contrast", "accessible", "accessibility", "color", "foreground", "background"], package: "color contrast rules" },
  { capability: "Spacing rhythm and grouping", terms: ["spacing", "strict spacing", "rhythm", "section spacing", "proximity"], package: "spacing rules" },
  { capability: "Typography hierarchy and readability", terms: ["typography", "type", "readability", "homepage", "agency homepage", "swiss-style"], package: "typography rules" },
  { capability: "React GSAP ScrollTrigger animation", terms: ["gsap", "scrolltrigger", "scroll trigger", "pinned scroll"], package: "gsap / @gsap/react" },
  { capability: "Lenis smooth scroll and ScrollTrigger sync", terms: ["lenis", "smooth scroll"], package: "lenis" },
  { capability: "shadcn/Radix primitive selection and no manual primitives", terms: ["shadcn", "radix", "no primitive", "manual primitive", "no manually created primitives"], package: "shadcn/ui" },
  { capability: "Frontend visual verification", terms: ["responsive", "mobile", "visual proof", "accessible responsive", "verify ui"], package: "Browser / Chrome" },
  { capability: "Tailwind styling", terms: ["tailwind", "tailwindcss"], package: "tailwindcss" },
  { capability: "PHP form email handling", terms: ["phpmailer", "php mail", "smtp", "email handler"], package: "PHPMailer" },
  { capability: "Prisma ORM", terms: ["prisma"], package: "prisma" },
  { capability: "Drizzle ORM", terms: ["drizzle"], package: "drizzle" },
  { capability: "Supabase integration", terms: ["supabase"], package: "supabase" },
  { capability: "Stripe integration", terms: ["stripe", "checkout", "payment"], package: "stripe" },
  { capability: "Docker operations", terms: ["docker", "compose", "container"], package: "docker" },
  { capability: "Nginx edit safety", terms: ["nginx", "server block", "reverse proxy"], package: "nginx" },
  { capability: "Caddy server config", terms: ["caddy"], package: "caddy" },
  { capability: "PM2 process management", terms: ["pm2"], package: "pm2" },
  { capability: "systemd service management", terms: ["systemd"], package: "systemd" },
  { capability: "Codebase intelligence routing", terms: ["codegraph", "understand anything", "serena", "architecture", "impact analysis", "what uses this"], package: "CodeGraph / Understand Anything / Serena" }
];

const ORCHESTRATION_TRIGGERS = [
  "figure out everything needed",
  "use every necessary tool",
  "take control",
  "best practice",
  "production-ready",
  "no primitive manually",
  "clone this site",
  "setup backend",
  "setup database",
  "setup server",
  "automate this workflow",
  "choose the right stack"
];

function normalize(value) {
  return String(value || "").toLowerCase();
}

function entryScore(entry, hint) {
  const primary = [entry.blob_id, entry.capability, ...(entry.external_libraries || [])].map(normalize).join(" ");
  const triggers = (entry.trigger_terms || []).map(normalize).join(" ");
  let score = 0;
  for (const term of hint.terms.map(normalize)) {
    if (primary.includes(term)) score += 5;
    if (triggers.includes(term)) score += 1;
  }
  if (primary.includes(normalize(hint.package))) score += 6;
  if (primary.includes(normalize(hint.capability))) score += 8;
  return score;
}

function findBestEntry(registry, hint) {
  return registry
    .map(entry => ({ entry, score: entryScore(entry, hint) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.entry;
}

function ftsQuery(value) {
  const parts = String(value || "").toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)?.filter(t => t.length > 1).map(t => `"${t.replaceAll('"', '""')}"`) || [];
  return parts.join(" OR ");
}

function searchIndex(query) {
  if (!globalThis.__knowledgeDbAvailable) return undefined;
  const match = ftsQuery(query);
  if (!match) return undefined;
  try {
    const rows = globalThis.__knowledgeDb.prepare(`
      SELECT items.*
      FROM item_fts
      JOIN items ON items.rowid = item_fts.rowid
      WHERE item_fts MATCH ?
      ORDER BY bm25(item_fts, 8.0, 5.0, 4.0, 5.0, 3.0, 3.0, 2.0, 1.0, 0.5) ASC
      LIMIT 1
    `).all(match);
    return rows[0];
  } catch {
    return undefined;
  }
}

function blobStatus(entry) {
  if (!entry) return "Missing";
  if (entry.status === "active") return "Exists and active";
  if (entry.status === "stale") return "Exists but stale";
  if (entry.status === "candidate") return "Candidate exists";
  return entry.status || "Missing";
}

function docsNeeded(entry) {
  if (!entry) return "Context7 if available, else official docs/GitHub/npm";
  if (entry.status === "active") return (entry.docs_sources || []).join(", ") || "Not needed";
  return (entry.docs_sources || []).join(", ") || "Current docs refresh needed";
}

const task = arg("task");
if (!task) {
  console.error("Usage: pm-knowledge-gap.mjs --task <task description> [--json]");
  process.exit(2);
}

const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
globalThis.__knowledgeDbAvailable = await exists(indexPath);
globalThis.__knowledgeDb = globalThis.__knowledgeDbAvailable ? new DatabaseSync(indexPath, { readOnly: true }) : undefined;
const taskText = normalize(task);
const triggerReasons = [];
for (const phrase of ORCHESTRATION_TRIGGERS) {
  if (taskText.includes(phrase)) triggerReasons.push(`phrase:${phrase}`);
}

const detected = CAPABILITY_HINTS.filter(hint => hint.terms.some(term => taskText.includes(normalize(term))));
if (detected.length > 1) triggerReasons.push("multi-capability");
if (/\bauth|payment|database|sql|vps|deployment|server config|production\b/.test(taskText)) triggerReasons.push("high-risk");
if (detected.length > 0) triggerReasons.push("external-library/tool");

const rows = detected.map(hint => {
  const registryEntry = findBestEntry(registry, hint);
  const indexed = searchIndex(`${hint.capability} ${hint.terms.join(" ")}`);
  const entry = registryEntry || indexed;
  const status = blobStatus(entry);
  return {
    Capability: hint.capability,
    "Existing owner skill": entry?.owner_skill || "unassigned",
    "Knowledge blob status": status,
    "Docs source needed": docsNeeded(entry),
    "Existing tool/MCP/script": "pm-knowledge-lookup.mjs / Context7 when docs needed",
    "External package/tool": hint.package,
    "Best-practice rules available?": status === "Exists and active" ? "yes" : status === "Candidate exists" ? "partial" : "no",
    "Micro-update needed?": status === "Exists and active" ? "no" : "yes",
    "Approval needed?": detected.length > 0 || /install|package|dependency|server|database|sql|vps|deployment|auth|payment|config/.test(taskText) ? "yes before install/config/risky change" : "maybe",
    Verification: verificationFor(hint.capability)
  };
});

function verificationFor(capability) {
  const c = normalize(capability);
  if (c.includes("gsap") || c.includes("lenis")) return "rendered scroll verification";
  if (c.includes("shadcn")) return "components.json + rendered accessibility/interaction check";
  if (c.includes("layout") || c.includes("spacing") || c.includes("typography") || c.includes("color")) return "rendered desktop/mobile inspection plus DOM/CSS checks when geometry matters";
  if (c.includes("visual")) return "screenshot/mobile emulation plus DOM measurement for exact claims";
  if (c.includes("nginx")) return "read-only inspect, config test after approval";
  if (c.includes("sql")) return "SQL safety check + read-only verification";
  return "task-appropriate verification";
}

const result = {
  task,
  triggered: triggerReasons.length > 0,
  trigger_reasons: [...new Set(triggerReasons)],
  rows
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Capability Orchestration Radar: ${result.triggered ? "TRIGGERED" : "not triggered"}`);
  console.log(`Reasons: ${result.trigger_reasons.join(", ") || "none"}`);
  console.log("");
  console.log("| Capability | Existing owner skill | Knowledge blob status | Docs source needed | Existing tool/MCP/script | External package/tool | Best-practice rules available? | Micro-update needed? | Approval needed? | Verification |");
  console.log("|---|---|---|---|---|---|---|---|---|---|");
  for (const row of rows) {
    console.log(`| ${row.Capability} | ${row["Existing owner skill"]} | ${row["Knowledge blob status"]} | ${row["Docs source needed"]} | ${row["Existing tool/MCP/script"]} | ${row["External package/tool"]} | ${row["Best-practice rules available?"]} | ${row["Micro-update needed?"]} | ${row["Approval needed?"]} | ${row.Verification} |`);
  }
}
globalThis.__knowledgeDb?.close();
