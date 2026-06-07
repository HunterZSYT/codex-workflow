#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { PM_ROOT, FRONTEND_ROOT, BACKEND_ROOT, SKILLS_ROOT, arg, exists } from "./pm-lib.mjs";

const id = arg("id");
if (!id) {
  console.error("Usage: pm-pack-audit.mjs --id frontend.layout.swiss-editorial-grid");
  process.exit(2);
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

const packPath = path.join(rootFor(id), "knowledge-packs", id);
const required = ["pack.yaml", "README.md", "source-ledger.md", "research.md", "decisions.md", "specs.md", "verification.md", "examples.md", "promotion-checklist.md"];
const missing = [];
for (const name of required) if (!(await exists(path.join(packPath, name)))) missing.push(name);

const yaml = missing.includes("pack.yaml") ? {} : parseYamlLite(await read(path.join(packPath, "pack.yaml")));
const artifactDir = path.join(packPath, "artifacts");
const artifacts = await exists(artifactDir) ? (await fs.readdir(artifactDir, { withFileTypes: true })).filter(d => d.isFile()).map(d => d.name) : [];
const sourceText = await read(path.join(packPath, "source-ledger.md"));
const researchText = await read(path.join(packPath, "research.md"));
const decisionsText = await read(path.join(packPath, "decisions.md"));
const specsText = await read(path.join(packPath, "specs.md"));
const verificationText = await read(path.join(packPath, "verification.md"));
const sourceReady = await nonPlaceholder(path.join(packPath, "source-ledger.md"));
const specsReady = await nonPlaceholder(path.join(packPath, "specs.md"));
const verificationReady = await nonPlaceholder(path.join(packPath, "verification.md"));
const maturity = yaml.maturity || "unknown";
const status = yaml.status || "unknown";
const approval = yaml.approval_status || "unknown";
const sourceUrlCount = (sourceText.match(/https?:\/\//g) || []).length;
const hasSourceDate = /\b20\d{2}-\d{2}-\d{2}\b/.test(sourceText);
const sourceQuality = !sourceReady ? "missing" : sourceUrlCount > 0 && hasSourceDate ? "trusted_sources_with_dates" : sourceUrlCount > 0 ? "trusted_sources_missing_dates" : "internal_or_user_authored";
const specsQuality = !specsReady ? "missing" : /TODO|Do not invent final values/i.test(specsText) ? "weak_or_placeholder" : specsText.length > 500 ? "usable" : "thin";
const verificationQuality = !verificationReady ? "missing" : /screenshot|inspect|verify|test|check|audit|mobile|accessibility|performance/i.test(verificationText) ? "actionable" : "thin";
const decisionsQuality = !decisionsText.trim() || /TODO/i.test(decisionsText) ? "missing_or_placeholder" : "explicit";
const researchQuality = !researchText.trim() || /TODO/i.test(researchText) ? "missing_or_placeholder" : "summarized";
const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");
let registryEntry = null;
try {
  const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
  registryEntry = registry.find(item => item.product_type === "pack" && (item.id === `pack.${id}` || item.pack_id === id)) || null;
} catch {}
const registryCompleteness = registryEntry && registryEntry.owner_skill && registryEntry.file_path && (registryEntry.artifacts_count ?? 0) >= artifacts.length ? "complete" : registryEntry ? "partial" : "missing";
const ownerSkill = yaml.owner_skill || registryEntry?.owner_skill || "";
const ownerSkillExists = ownerSkill ? await exists(path.join(SKILLS_ROOT, ownerSkill, "SKILL.md")) : false;
const overlapWarning = (yaml.related_blobs?.length || yaml.related_packs?.length || registryEntry?.related_items?.length) ? "related_items_documented" : "no_related_items_documented";

const blockers = [];
if (missing.length) blockers.push(`missing files: ${missing.join(", ")}`);
if (!sourceReady) blockers.push("source-ledger.md is empty or placeholder");
if (!specsReady && (maturity === "specified" || maturity === "artifact_backed" || maturity === "verified")) blockers.push(`${maturity} maturity requires non-placeholder specs.md`);
if (status === "active" && !/approved/.test(approval)) blockers.push("active status requires an approved approval_status");
if ((maturity === "artifact_backed" || maturity === "verified") && artifacts.length === 0) blockers.push(`${maturity} requires artifacts`);
if (maturity === "verified" && !verificationReady) blockers.push("verified maturity requires non-placeholder verification.md");
if (sourceReady && yaml.source_confidence === "sourced" && sourceUrlCount === 0) blockers.push("source_confidence sourced requires at least one URL/source reference");
if ((maturity === "specified" || maturity === "artifact_backed" || maturity === "verified") && specsQuality === "weak_or_placeholder") blockers.push("specs.md still looks placeholder-like");
if (!ownerSkillExists) blockers.push(`owner skill not found: ${ownerSkill || "none"}`);

let recommendation = "ready_to_promote";
if (blockers.length) recommendation = "enrich_first";
if (status === "active" && blockers.length) recommendation = "mark_stale";
if (status === "deprecated") recommendation = "keep_candidate";
if (!ownerSkill || registryCompleteness === "missing") recommendation = "enrich_first";
const aiAuditDecision = recommendation === "ready_to_promote"
  ? "auto_activate"
  : /security|offensive|unsafe|license/i.test(blockers.join(" "))
    ? "keep_candidate_due_to_risk"
    : "keep_candidate_due_to_weak_sources";

console.log([
  `Pack: ${id}`,
  `Path: ${packPath}`,
  `Status: ${status}`,
  `Maturity: ${maturity}`,
  `Source confidence: ${yaml.source_confidence || "unknown"}`,
  `Approval status: ${approval}`,
  `Artifacts: ${artifacts.length}`,
  `Source ledger quality: ${sourceQuality}`,
  `Specs quality: ${specsQuality}`,
  `Research quality: ${researchQuality}`,
  `Decisions quality: ${decisionsQuality}`,
  `Verification quality: ${verificationQuality}`,
  `Registry completeness: ${registryCompleteness}`,
  `Owner skill reference: ${ownerSkill || "none"} (${ownerSkillExists ? "found" : "missing"})`,
  `Dedupe/overlap warning: ${overlapWarning}`,
  `Source ledger ready: ${sourceReady ? "yes" : "no"}`,
  `Specs ready: ${specsReady ? "yes" : "no"}`,
  `Verification ready: ${verificationReady ? "yes" : "no"}`,
  `Promotion readiness: ${blockers.length ? "not ready" : "ready for approval review"}`,
  `Promotion recommendation: ${recommendation}`,
  `AI audit decision: ${aiAuditDecision}`,
  ...(blockers.length ? ["Blockers:", ...blockers.map(b => `- ${b}`)] : [])
].join("\n"));

process.exit(missing.length ? 1 : 0);
