#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { PM_ROOT, FRONTEND_ROOT, BACKEND_ROOT, arg, exists } from "./pm-lib.mjs";

const id = arg("id");
const title = arg("title") || id;

if (!id || !title) {
  console.error('Usage: pm-pack-init.mjs --id frontend.layout.swiss-editorial-grid --title "Swiss Editorial Grid Layout"');
  process.exit(2);
}

function rootFor(packId) {
  if (packId.startsWith("frontend.")) return { root: FRONTEND_ROOT, namespace: "frontend", ownerSystem: "agentic-frontend" };
  if (packId.startsWith("backend.") || packId.startsWith("vps.")) return { root: BACKEND_ROOT, namespace: packId.startsWith("vps.") ? "vps" : "backend", ownerSystem: "agentic-backend-database" };
  if (packId.startsWith("project_manager.")) return { root: PM_ROOT, namespace: "project_manager", ownerSystem: "agentic-project-manager" };
  return { root: PM_ROOT, namespace: "project_manager", ownerSystem: "agentic-project-manager" };
}

function ownerSkillFor(packId) {
  if (packId === "frontend.layout.swiss-editorial-grid") return "layout-composition-fundamentals";
  if (packId.startsWith("frontend.layout.")) return "layout-composition-fundamentals";
  if (packId.startsWith("frontend.motion.")) return "motion-quality-router";
  if (packId.startsWith("frontend.components.")) return "component-supply-router";
  if (packId.startsWith("backend.email.") || packId.startsWith("backend.api.")) return "api-contract-orchestrator";
  if (packId.startsWith("backend.database.")) return "database-safety-orchestrator";
  if (packId.startsWith("vps.webserver.")) return "vps-ssh-operations-gate";
  return "project-manager-execution-ledger";
}

function yamlList(values) {
  return values.length ? values.map(value => `  - ${value}`).join("\n") : "  []";
}

async function writeIfMissing(filePath, content) {
  if (await exists(filePath)) return false;
  await fs.writeFile(filePath, content, "utf8");
  return true;
}

async function upsertRegistry(pack) {
  const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");
  const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
  const entry = {
    id: `pack.${pack.id}`,
    title: pack.title,
    namespace: pack.namespace,
    type: "capability_pack",
    product_type: "pack",
    capability: pack.title,
    capability_class: pack.id.split(".").slice(0, 2).join("."),
    owner_system: pack.ownerSystem,
    owner_skill: pack.ownerSkill,
    status: "candidate",
    maturity: "researched",
    aliases: pack.aliases,
    trigger_terms: pack.triggerTerms,
    external_libraries: [],
    docs_sources: [],
    source_confidence: "low",
    related_items: pack.relatedBlobs,
    artifact_paths: [],
    apply_command: "",
    apply_commands: [],
    verification_method: "Audit pack readiness before use; do not implement from candidate pack without source verification or approval.",
    safe_to_sync: true,
    file_path: path.join(pack.packPath, "pack.yaml"),
    last_verified: "",
    notes: "Candidate knowledge product shell. Not active or reusable until source-grounded and approved.",
    pack_id: pack.id,
    pack_path: pack.packPath,
    source_ledger_path: path.join(pack.packPath, "source-ledger.md"),
    specs_path: path.join(pack.packPath, "specs.md"),
    artifacts_count: 0,
    approval_status: "not_requested",
    promotion_status: "not_ready",
    copied_from_external_source: false,
    copyright_risk: "none"
  };
  const index = registry.findIndex(item => item.product_type === "pack" && (item.id === `pack.${pack.id}` || item.pack_id === pack.id));
  if (index >= 0) registry[index] = { ...registry[index], ...entry };
  else registry.push(entry);
  registry.sort((a, b) => String(a.id || a.blob_id).localeCompare(String(b.id || b.blob_id)));
  await fs.writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
}

const target = rootFor(id);
const packPath = path.join(target.root, "knowledge-packs", id);
const artifactsPath = path.join(packPath, "artifacts");
await fs.mkdir(artifactsPath, { recursive: true });

const relatedBlobs = id === "frontend.layout.swiss-editorial-grid"
  ? ["frontend.layout.swiss-editorial-grid", "frontend.layout.layout-grid-composition", "frontend.layout.premium-agency-section-rhythm"]
  : [];
const aliases = id === "frontend.layout.swiss-editorial-grid"
  ? ["swiss grid", "swiss layout", "editorial grid", "international typographic style"]
  : [title];
const triggerTerms = id === "frontend.layout.swiss-editorial-grid"
  ? ["swiss grid", "swiss layout", "editorial grid", "typographic grid", "premium grid"]
  : [title];
const ownerSkill = ownerSkillFor(id);

const pack = { id, title, ...target, packPath, ownerSkill, relatedBlobs, aliases, triggerTerms };
const created = [];
if (await writeIfMissing(path.join(packPath, "pack.yaml"), `id: ${id}
title: ${title}
namespace: ${target.namespace}
owner_system: ${target.ownerSystem}
owner_skill: ${ownerSkill}
status: candidate
maturity: researched
source_confidence: low
aliases:
${yamlList(aliases)}
trigger_terms:
${yamlList(triggerTerms)}
related_blobs:
${yamlList(relatedBlobs)}
related_packs:
  []
artifact_paths:
  []
apply_commands:
  []
verification_methods:
  - Audit pack readiness before implementation.
safe_to_sync: true
last_verified:
approval_status: not_requested
`)) created.push("pack.yaml");

if (await writeIfMissing(path.join(packPath, "README.md"), `# ${title}

Status: candidate.

This pack is a Knowledge Product shell. It is not active and must not be treated as reusable implementation material until source research, exact specifications, artifacts, verification, and user approval are complete.

Use this pack when a task needs a source-grounded reusable system rather than loose guidance.
`)) created.push("README.md");

if (await writeIfMissing(path.join(packPath, "source-ledger.md"), `# Source Ledger

No external sources have been checked for this pack yet.

Required before activation:

- official/standard/source references
- date checked
- what was extracted
- reliability
- copyright/use note
- whether the source supports exact values or only general principles
`)) created.push("source-ledger.md");

if (await writeIfMissing(path.join(packPath, "research.md"), `# Research

TODO: gather source material before filling this pack.
`)) created.push("research.md");

if (await writeIfMissing(path.join(packPath, "decisions.md"), `# Decisions

TODO: define when to use, when not to use, variants, style fit, and domain fit.
`)) created.push("decisions.md");

if (await writeIfMissing(path.join(packPath, "specs.md"), `# Specs

TODO: define exact reusable values only when source-grounded or user-approved.

Do not invent final values from broad AI memory.
`)) created.push("specs.md");

if (await writeIfMissing(path.join(packPath, "verification.md"), `# Verification

TODO: define how to prove this pack was applied correctly.
`)) created.push("verification.md");

if (await writeIfMissing(path.join(packPath, "examples.md"), `# Examples

TODO: document public examples and the reusable patterns they demonstrate.

Do not copy proprietary assets, source code, or exact layouts.
`)) created.push("examples.md");

if (await writeIfMissing(path.join(packPath, "promotion-checklist.md"), `# Promotion Checklist

- [ ] Retrieval search completed.
- [ ] Related blobs/packs checked.
- [ ] Dedupe check completed.
- [ ] Source ledger contains trusted sources.
- [ ] Research is summarized, not copied.
- [ ] Decisions are explicit.
- [ ] Specs include exact values only where source-grounded or user-approved.
- [ ] Artifacts are original and source-safe, if maturity claims artifact-backed.
- [ ] Verification method is actionable.
- [ ] User approved activation.
`)) created.push("promotion-checklist.md");

await upsertRegistry(pack);

console.log(`Pack ready: ${packPath}`);
console.log(`Created files: ${created.length ? created.join(", ") : "none; existing pack left intact"}`);
console.log("Status: candidate; approval_status: not_requested");
