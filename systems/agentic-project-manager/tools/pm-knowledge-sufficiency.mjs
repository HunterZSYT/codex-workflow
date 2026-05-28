#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { PM_ROOT, LEARNING_ROOT, arg, exists, classifyTask, redact } from "./pm-lib.mjs";

const task = redact(arg("task", ""));
const jsonOnly = process.argv.includes("--json");
const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");
const searchTool = path.join(PM_ROOT, "tools", "pm-knowledge-search.mjs");
const learningTool = path.join(PM_ROOT, "tools", "pm-learning-search.mjs");

const CAPABILITY_TERMS = [
  { capability: "Swiss/editorial grid layout", terms: ["swiss", "swiss-style", "editorial grid"], highRisk: false },
  { capability: "Layout grid composition", terms: ["layout", "grid", "composition", "responsive layout"], highRisk: false },
  { capability: "shadcn/Radix primitive selection and no manual primitives", terms: ["shadcn", "radix", "no primitive", "manual primitive"], external: true },
  { capability: "React GSAP ScrollTrigger animation", terms: ["gsap", "scrolltrigger", "scroll trigger"], external: true },
  { capability: "Lenis smooth scroll and ScrollTrigger sync", terms: ["lenis", "smooth scroll"], external: true },
  { capability: "Spacing rhythm and grouping", terms: ["spacing", "strict spacing", "rhythm"], highRisk: false },
  { capability: "Typography hierarchy and readability", terms: ["typography", "type scale", "readability"], highRisk: false },
  { capability: "Color contrast and neutral fallback", terms: ["contrast", "accessible", "accessibility", "color"], highRisk: false },
  { capability: "PHP form email handling", terms: ["phpmailer", "smtp", "contact form", "php mail"], external: true },
  { capability: "SQL safety patterns", terms: ["sql", "database", "migration", "delete rows", "drop", "truncate"], highRisk: true },
  { capability: "Nginx edit safety", terms: ["nginx", "server block", "reverse proxy", "vps"], external: true, highRisk: true }
];

function lower(value) {
  return String(value || "").toLowerCase();
}

function runJson(tool, args) {
  const result = spawnSync(process.execPath, [tool, ...args, "--json"], { encoding: "utf8" });
  if (result.status !== 0 && !result.stdout.trim()) return [];
  try { return JSON.parse(result.stdout || "[]"); } catch { return []; }
}

function detectCapabilities(text) {
  const t = lower(text);
  const detected = CAPABILITY_TERMS.filter(item => item.terms.some(term => t.includes(lower(term))));
  const classified = classifyTask(text);
  if (classified.capabilityOrchestration?.detectedKnowledgeTerms?.length) {
    for (const term of classified.capabilityOrchestration.detectedKnowledgeTerms) {
      if (!detected.some(item => item.terms.includes(term))) {
        detected.push({ capability: term, terms: [term], external: true });
      }
    }
  }
  return detected;
}

function registryMatches(registry, capability) {
  const c = lower(capability.capability);
  const terms = capability.terms.map(lower);
  return registry.filter(entry => {
    const hay = [
      entry.blob_id,
      entry.id,
      entry.title,
      entry.capability,
      entry.owner_skill,
      ...(entry.trigger_terms || []),
      ...(entry.external_libraries || []),
      ...(entry.aliases || [])
    ].map(lower).join(" ");
    return hay.includes(c) || terms.some(term => hay.includes(term));
  });
}

function hasSource(item) {
  const docs = (item.docs_sources || []).join(" ").toLowerCase();
  const source = lower(item.source_confidence);
  const verified = lower(item.last_verified);
  return docs.includes("context7") || docs.includes("http") || source.includes("sourced") || source.includes("internal") || /^\d{4}-\d{2}-\d{2}/.test(verified);
}

function hasVerification(item) {
  return Boolean(item.verification_method || lower(item.capability).includes("verification") || lower(item.file_path).includes("verification") || lower(item.file_path).includes("inspection"));
}

function hasArtifact(item) {
  return Boolean(item.apply_command || item.apply_commands?.length || item.artifact_paths?.length || Number(item.artifacts_count || 0) > 0);
}

if (!task) {
  console.error('Usage: pm-knowledge-sufficiency.mjs --task "task description" [--json]');
  process.exit(2);
}

const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
const classification = classifyTask(task);
const capabilities = detectCapabilities(task);
const retrieved = (await exists(searchTool)) ? runJson(searchTool, ["--query", task, "--limit", "12"]) : [];
const learning = (await exists(learningTool)) ? runJson(learningTool, ["--query", task, "--limit", "8"]) : [];

const allMatched = [];
for (const capability of capabilities) {
  const matches = registryMatches(registry, capability);
  allMatched.push(...matches.map(item => ({ ...item, matched_capability: capability.capability, external_required: Boolean(capability.external), high_risk: Boolean(capability.highRisk) })));
}

const byKey = new Map();
for (const item of allMatched) byKey.set(item.id || item.blob_id || item.file_path, item);
const matched = [...byKey.values()];
const active = matched.filter(item => item.status === "active");
const candidate = matched.filter(item => item.status === "candidate");
const stale = matched.filter(item => item.status === "stale" || item.status === "deprecated");

const missing = capabilities
  .filter(cap => !allMatched.some(item => item.matched_capability === cap.capability))
  .map(cap => cap.capability);

const sourceRisks = matched
  .filter(item => item.status !== "active" || !hasSource(item))
  .map(item => ({ id: item.id || item.blob_id, status: item.status, source_confidence: item.source_confidence || "unknown", capability: item.matched_capability }));

const reusableSystemNeeded = /knowledgebase|from our knowledgebase|reusable|system|pack|artifact|clone|build .*homepage|component system|design system|setup/i.test(task);
const artifactGaps = matched
  .filter(item => reusableSystemNeeded && (item.product_type === "pack" || item.type === "capability_pack" || /pack|artifact|system/i.test(task)) && !hasArtifact(item))
  .map(item => ({ id: item.id || item.blob_id, capability: item.matched_capability, status: item.status }));

const verificationGaps = matched
  .filter(item => item.status === "active" && !hasVerification(item) && /verify|visual|responsive|backend|database|vps|server|layout|animation|component/i.test(task))
  .map(item => ({ id: item.id || item.blob_id, capability: item.matched_capability }));

const candidateOnlyCapabilities = capabilities
  .filter(cap => {
    const items = allMatched.filter(item => item.matched_capability === cap.capability);
    return items.length > 0 && !items.some(item => item.status === "active");
  })
  .map(cap => cap.capability);

const externalWithoutActiveSource = capabilities
  .filter(cap => cap.external)
  .filter(cap => !allMatched.some(item => item.matched_capability === cap.capability && item.status === "active" && hasSource(item)))
  .map(cap => cap.capability);

const highRiskWithoutActiveSafety = capabilities
  .filter(cap => cap.highRisk || classification.riskLevel === "high")
  .filter(cap => !allMatched.some(item => item.matched_capability === cap.capability && item.status === "active"))
  .map(cap => cap.capability);

let decision = "proceed";
const reasons = [];
if (highRiskWithoutActiveSafety.length) {
  decision = "stop_and_research";
  reasons.push("high-risk capability lacks active safety knowledge");
}
if (externalWithoutActiveSource.length) {
  decision = decision === "stop_and_research" ? decision : "fill_knowledgebase_first";
  reasons.push("external library/tool lacks active source-backed knowledge");
}
if (missing.length) {
  decision = decision === "proceed" ? "fill_knowledgebase_first" : decision;
  reasons.push("missing capability knowledge");
}
if (candidateOnlyCapabilities.length) {
  decision = decision === "proceed" ? "fill_knowledgebase_first" : decision;
  reasons.push("candidate-only knowledge cannot be treated as active");
}
if (artifactGaps.length) {
  decision = decision === "proceed" ? "fill_knowledgebase_first" : decision;
  reasons.push("reusable system needs artifact/apply-command backing");
}
if (verificationGaps.length && decision === "proceed") {
  decision = "proceed_with_warning";
  reasons.push("verification method is incomplete");
}
if (/install|dependency|server|database|sql|vps|deploy|auth|payment|config/i.test(task) && decision === "proceed") {
  decision = "ask_user_approval";
  reasons.push("approval needed before install/config/risky change");
}
if (/quick fix|just quick/i.test(task) && !classification.backendDatabaseSafetyGatesNeeded && missing.length === 0) {
  decision = decision === "fill_knowledgebase_first" ? "proceed_with_warning" : decision;
  reasons.push("minimal gate due to explicit quick-fix wording");
}

const result = {
  task,
  capabilities_detected: capabilities.map(item => item.capability),
  retrieved_items: retrieved.map(item => ({
    id: item.id,
    title: item.title,
    status: item.status,
    maturity: item.maturity,
    source_confidence: item.source_confidence,
    owner_skill: item.owner_skill,
    file_path: item.file_path,
    recommendation: item.recommendation
  })),
  active_items: active.map(item => item.id || item.blob_id),
  candidate_items: candidate.map(item => item.id || item.blob_id),
  stale_items: stale.map(item => item.id || item.blob_id),
  missing_capabilities: missing,
  source_confidence_risks: sourceRisks,
  artifact_gaps: artifactGaps,
  verification_gaps: verificationGaps,
  relevant_past_errors: learning.filter(item => /error|failure|mistake/i.test(item.file || item.snippet || "")),
  relevant_user_feedback: learning.filter(item => /feedback|preference|user/i.test(item.file || item.snippet || "")),
  decision,
  reasons: [...new Set(reasons)]
};

if (jsonOnly) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Knowledge Sufficiency Gate: ${decision}`);
  console.log(`Reasons: ${result.reasons.join(", ") || "none"}`);
  console.log(`Capabilities: ${result.capabilities_detected.join(", ") || "none"}`);
  console.log(`Active: ${result.active_items.join(", ") || "none"}`);
  console.log(`Candidate: ${result.candidate_items.join(", ") || "none"}`);
  console.log(`Missing: ${result.missing_capabilities.join(", ") || "none"}`);
  console.log(`Source risks: ${result.source_confidence_risks.map(x => x.id).join(", ") || "none"}`);
  console.log(`Artifact gaps: ${result.artifact_gaps.map(x => x.id).join(", ") || "none"}`);
  console.log(`Verification gaps: ${result.verification_gaps.map(x => x.id).join(", ") || "none"}`);
}
