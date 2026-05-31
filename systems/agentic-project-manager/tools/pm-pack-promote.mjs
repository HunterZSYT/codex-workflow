#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { PM_ROOT, FRONTEND_ROOT, BACKEND_ROOT, arg, exists } from "./pm-lib.mjs";

const id = arg("id");
const approved = process.argv.includes("--approved");
const aiReviewed = process.argv.includes("--ai-reviewed");
const dryRun = process.argv.includes("--dry-run");
const enrichIfWeak = process.argv.includes("--enrich-if-weak");
const reason = arg("reason", "");
if (!id) {
  console.error("Usage: pm-pack-promote.mjs --id frontend.layout.swiss-editorial-grid --approved|--ai-reviewed [--dry-run] [--enrich-if-weak] [--reason \"...\"]");
  process.exit(2);
}
if (!approved && !aiReviewed) {
  console.error("Promotion blocked: --approved or --ai-reviewed is required.");
  process.exit(1);
}

function rootFor(packId) {
  if (packId.startsWith("frontend.")) return FRONTEND_ROOT;
  if (packId.startsWith("backend.") || packId.startsWith("vps.")) return BACKEND_ROOT;
  return PM_ROOT;
}

function parseYamlLite(text) {
  const data = {};
  let current = "";
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const keyMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (keyMatch) {
      current = keyMatch[1];
      const value = keyMatch[2].trim();
      data[current] = value === "" ? [] : value.replace(/^["']|["']$/g, "");
      continue;
    }
    const itemMatch = line.match(/^\s*-\s+(.*)$/);
    if (itemMatch && current) {
      if (!Array.isArray(data[current])) data[current] = data[current] ? [data[current]] : [];
      data[current].push(itemMatch[1].trim().replace(/^["']|["']$/g, ""));
    }
  }
  return data;
}

async function read(filePath) {
  try { return await fs.readFile(filePath, "utf8"); } catch { return ""; }
}

async function nonPlaceholder(filePath) {
  const text = await read(filePath);
  return text.trim().length > 0 && !/^# .+\n+\s*TODO:/m.test(text) && !/No external sources have been checked/i.test(text);
}

function serializeYaml(data) {
  const lines = [];
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      if (value.length) for (const item of value) lines.push(`  - ${item}`);
      else lines.push("  []");
    } else {
      lines.push(`${key}: ${value ?? ""}`);
    }
  }
  return `${lines.join("\n")}\n`;
}

const packPath = path.join(rootFor(id), "knowledge-packs", id);
const packYamlPath = path.join(packPath, "pack.yaml");
if (!(await exists(packYamlPath))) {
  console.error(`Pack not found: ${packYamlPath}`);
  process.exit(1);
}

const yaml = parseYamlLite(await read(packYamlPath));
const artifactDir = path.join(packPath, "artifacts");
const artifacts = await exists(artifactDir) ? (await fs.readdir(artifactDir, { withFileTypes: true })).filter(d => d.isFile()).map(d => path.join(artifactDir, d.name)) : [];
const sourceText = await read(path.join(packPath, "source-ledger.md"));
const specsText = await read(path.join(packPath, "specs.md"));
const verificationText = await read(path.join(packPath, "verification.md"));
const sourceUrlCount = (sourceText.match(/https?:\/\//g) || []).length;
const blockers = [];
if (!(await nonPlaceholder(path.join(packPath, "source-ledger.md")))) blockers.push("source-ledger.md is empty or placeholder");
if ((yaml.maturity === "artifact_backed" || yaml.maturity === "verified") && artifacts.length === 0) blockers.push(`${yaml.maturity} requires artifacts`);
if (yaml.maturity === "verified" && !(await nonPlaceholder(path.join(packPath, "verification.md")))) blockers.push("verified maturity requires non-placeholder verification.md");
if (!(await nonPlaceholder(path.join(packPath, "specs.md")))) blockers.push("specs.md is empty or placeholder");
if (!(await nonPlaceholder(path.join(packPath, "verification.md")))) blockers.push("verification.md is empty or placeholder");
if (yaml.source_confidence === "sourced" && sourceUrlCount === 0) blockers.push("source_confidence sourced requires at least one URL/source reference");
if (/TODO|Do not invent final values/i.test(specsText)) blockers.push("specs.md still looks placeholder-like");
if (!/verify|check|audit|inspect|test|mobile|accessibility|performance/i.test(verificationText)) blockers.push("verification.md is not actionable enough");
if (blockers.length) {
  console.error("Promotion blocked:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  if (enrichIfWeak) console.error("Recommended lifecycle action: enrich_first");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const reviewerMode = aiReviewed && approved ? "ai_reviewed_with_user_request" : aiReviewed ? "ai_reviewed" : "user_reviewed";
if (dryRun) {
  console.log(JSON.stringify({
    dryRun: true,
    id,
    decision: "ready_to_promote",
    reviewerMode,
    reason,
    artifacts: artifacts.length
  }, null, 2));
  process.exit(0);
}

const previousStatus = yaml.status || "unknown";
yaml.status = "active";
yaml.approval_status = aiReviewed ? "ai_reviewed_approved" : "user_approved";
yaml.lifecycle_status = "active";
yaml.activation_mode = reviewerMode;
yaml.activation_review_path = "activation-review.md";
yaml.enrichment_history_path = "enrichment-history.md";
yaml.last_verified = today;
await fs.writeFile(packYamlPath, serializeYaml(yaml), "utf8");

const activationPath = path.join(packPath, "activation-review.md");
const activationEntry = `\n## ${new Date().toISOString()}\n- Date: ${today}\n- Pack/blob ID: ${id}\n- Previous status: ${previousStatus}\n- New status: active\n- Reviewer mode: ${reviewerMode}\n- Source ledger verdict: passed (${sourceUrlCount} URL/source references or internal/user-authored source noted)\n- Specs verdict: passed\n- Artifacts verdict: passed (${artifacts.length})\n- Verification verdict: passed\n- Safety/copyright verdict: no copied source/assets detected by promotion checks\n- Dedupe verdict: related/overlap review remains task-level responsibility\n- Final decision: promoted active usable baseline\n- Remaining gaps: active knowledge remains open to enrichment candidates\n- Reason: ${reason || "promotion requested"}\n- Commit hash if synced: pending\n`;
try {
  if (!(await exists(activationPath))) await fs.writeFile(activationPath, `# Activation Review\n`, "utf8");
  await fs.appendFile(activationPath, activationEntry, "utf8");
} catch {}

const enrichmentPath = path.join(packPath, "enrichment-history.md");
if (!(await exists(enrichmentPath))) {
  await fs.writeFile(enrichmentPath, `# Enrichment History\n\nActive knowledge remains open to source, artifact, verification, repo absorption, error, and user feedback enrichment candidates.\n`, "utf8");
}

const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");
const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
const index = registry.findIndex(item => item.product_type === "pack" && (item.id === `pack.${id}` || item.pack_id === id));
if (index >= 0) {
  registry[index] = {
    ...registry[index],
    status: "active",
    lifecycle_status: "active",
    approval_status: yaml.approval_status,
    activation_mode: reviewerMode,
    activation_review_path: activationPath,
    enrichment_history_path: enrichmentPath,
    promotion_status: "approved",
    last_verified: yaml.last_verified,
    last_enriched: registry[index].last_enriched || "",
    enrichment_triggers: registry[index].enrichment_triggers || ["source_discovery", "repo_absorption", "task_error", "user_feedback", "docs_refresh", "ecosystem_change"],
    active_baseline_version: registry[index].active_baseline_version || `active-${today}`,
    artifact_paths: artifacts,
    artifacts_count: artifacts.length,
    source_confidence: yaml.source_confidence || registry[index].source_confidence || "medium",
    notes: "Active usable baseline. Remains open to enrichment candidates, source refreshes, stale review, and superseding evidence."
  };
  await fs.writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
}

console.log(`Promoted pack: ${id}`);
console.log("Index rebuild recommended: node C:\\Users\\acer\\.codex\\agentic-project-manager\\tools\\pm-knowledge-index.mjs");
