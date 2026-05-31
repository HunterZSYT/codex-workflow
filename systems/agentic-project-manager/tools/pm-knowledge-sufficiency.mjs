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
  { capability: "Nginx edit safety", terms: ["nginx", "server block", "reverse proxy", "vps"], external: true, highRisk: true },
  { capability: "WordPress theme development", terms: ["wordpress theme", "wp theme", "block theme", "classic theme", "theme.json", "functions.php", "wp_enqueue_script", "wp_enqueue_style", "enqueue scripts", "enqueue styles"], external: true },
  { capability: "WordPress WooCommerce theme development", terms: ["woocommerce theme", "woocommerce template override", "woocommerce hooks", "woocommerce child theme", "single product template", "archive product", "checkout template", "product gallery", "product carousel"], external: true, highRisk: true },
  { capability: "WordPress theme design system", terms: ["wordpress design system", "theme.json design tokens", "theme.json spacing", "theme.json typography", "theme.json color", "editor frontend parity", "block pattern design"], external: true },
  { capability: "GSAP Lenis WordPress motion", terms: ["gsap wordpress", "lenis wordpress", "scrolltrigger wordpress", "animated wordpress theme", "wordpress scroll animation"], external: true },
  { capability: "Frontend UI layer scope model", terms: ["frontend layers", "ui layers", "scope ladder", "ui scope", "button to section", "component section page site", "visual system", "whole landing page", "landing page visual", "frontend system"], highRisk: false },
  { capability: "Interaction feedback states", terms: ["hover state", "focus state", "focus-visible", "active state", "disabled state", "loading button", "selected state", "current state", "expanded collapsed"], highRisk: false },
  { capability: "Responsive structure adaptation", terms: ["responsive", "responsive structure", "responsive layout", "mobile structure", "desktop to mobile", "wide medium narrow", "mobile order", "stack columns", "mobile header"], highRisk: false },
  { capability: "Frontend state system", terms: ["loading state", "empty state", "error state", "success state", "no-results", "skeleton", "offline", "permission state"], highRisk: false },
  { capability: "Visual media system", terms: ["visual media", "image ratio", "aspect ratio", "object-fit", "icon sizing", "responsive image", "hero image"], highRisk: false },
  { capability: "Form input system", terms: ["form input", "form validation", "label input", "helper text", "required field", "optional field", "submit loading"], highRisk: false },
  { capability: "Navigation system", terms: ["navigation", "navigation system", "nav active", "active route", "sticky nav", "sticky header", "mobile menu", "nav overflow"], highRisk: false }
];

const ECOSYSTEM_SCOUT_TERMS = [
  "scout", "ecosystem", "best tool", "best stack", "best library", "best way",
  "what tools exist", "what should we use", "reusable source", "existing solution",
  "existing software", "github trending", "find repos", "component source",
  "starter kit", "starter", "template", "registry", "wordpress theme",
  "woocommerce", "theme development", "wordpress theme", "wp theme", "block theme", "classic theme", "theme.json", "create block theme", "roots sage", "sage", "_s", "underscores", "plugin ecosystem", "animation library",
  "carousel", "custom carousel", "carousel library", "gallery", "gallery library", "mcp server", "integration knowledge",
  "fill knowledgebase", "add knowledge", "teach the system", "add integration knowledge",
  "use best tools", "build with existing tools", "don't generate from scratch",
  "research and add", "codebase intelligence tool"
];

const REPO_ABSORPTION_TERMS = [
  "absorb", "absorption", "repo absorption", "strip goodies", "mine repo",
  "mine this repo", "learn from repo", "learn from this repo", "open source reference",
  "open-source reference", "source repo", "copy useful patterns", "extract workflow",
  "extract patterns", "source system", "absorb into our system", "use this repo as source",
  "add this repo to our system"
];

function detectEcosystemScout(text) {
  const t = lower(text);
  return ECOSYSTEM_SCOUT_TERMS.filter(term => t.includes(lower(term)));
}

function extractRepoUrl(text) {
  const match = String(text || "").match(/https?:\/\/(?:www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/i);
  return match ? match[0].replace(/[),.;]+$/, "") : "";
}

function detectRepoAbsorption(text) {
  const t = lower(text);
  const triggers = REPO_ABSORPTION_TERMS.filter(term => t.includes(lower(term)));
  const sourceRepoUrl = extractRepoUrl(text);
  const hasRepoSignal = Boolean(sourceRepoUrl) || /\brepo\b|\brepository\b|open source|open-source|github\.com/.test(t);
  const hasAbsorptionSignal = /absorb|absorption|mine|strip|learn from|extract|copy useful|source reference|source system/.test(t);
  return {
    required: hasRepoSignal && (hasAbsorptionSignal || triggers.length > 0),
    triggers,
    sourceRepoUrl
  };
}

function sourceCategoriesFor(text) {
  const t = lower(text);
  const categories = new Set(["official docs/sites", "official GitHub repositories"]);
  if (/wordpress/.test(t)) {
    categories.add("WordPress Developer Docs");
    categories.add("WordPress theme/block docs");
    categories.add("WP-CLI scaffold docs");
    categories.add("GitHub starter themes");
    categories.add("WordPress plugin/theme directories");
  }
  if (/woocommerce|ecommerce|commerce|shop/.test(t)) categories.add("WooCommerce Developer Docs");
  if (/theme\.json|block theme|wordpress design system/.test(t)) categories.add("WordPress theme.json/global styles docs");
  if (/sage|roots|underscores|_s|create block theme|starter theme/.test(t)) categories.add("WordPress starter theme repositories");
  if (/animation|motion|gsap|lenis/.test(t)) categories.add("animation/motion library docs");
  if (/carousel|gallery/.test(t)) categories.add("carousel/gallery libraries");
  if (/github|repo|starter|template|boilerplate|theme|plugin/.test(t)) categories.add("GitHub discovery");
  if (/tool|library|codebase intelligence/.test(t)) categories.add("GitHub discovery");
  if (/github\.com|repo|repository|open source|open-source|absorb|absorption/.test(t)) {
    categories.add("license and attribution review");
    categories.add("repo health/release activity");
    categories.add("README/docs/examples/templates/scripts inspection");
  }
  if (/npm|package|library|gsap|lenis|carousel|gallery|shadcn|tailwind|wordpress|woocommerce|php|composer/.test(t)) categories.add("package registries");
  if (/component|ui|landing|shadcn|radix|tailwind|block|pattern/.test(t)) categories.add("component/registry ecosystems");
  if (/mcp|server|live capability|integration|codebase intelligence/.test(t)) categories.add("MCP/server ecosystems");
  if (/wordpress|woocommerce/.test(t)) categories.add("WordPress plugin/theme directories");
  if (/awesome|curated|trending/.test(t)) categories.add("curated lists as leads only");
  categories.add("public examples for pattern observation only");
  return [...categories];
}

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
const ecosystemScoutTriggers = detectEcosystemScout(task);
const repoAbsorption = detectRepoAbsorption(task);
const repoAbsorptionRequired = repoAbsorption.required;
const ecosystemScoutRequired = ecosystemScoutTriggers.length > 0 || repoAbsorptionRequired;
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

const existingLocalCoverage = {
  retrieved_count: retrieved.length,
  active_count: active.length,
  candidate_count: candidate.length,
  stale_count: stale.length,
  matched_count: matched.length
};

const activeSourceBackedCoverage = active.some(item => hasSource(item));
const candidatePackNeeded = ecosystemScoutRequired && !activeSourceBackedCoverage;
const toolReuseOpportunities = ecosystemScoutRequired
  ? [
      "official docs/sites",
      "official repositories",
      "GitHub discovery",
      "package registries",
      "component registries",
      "MCP/server ecosystems",
      "starter kits/templates"
    ]
  : [];

let decision = "proceed";
const reasons = [];
if (highRiskWithoutActiveSafety.length) {
  decision = "stop_and_research";
  reasons.push("high-risk capability lacks active safety knowledge");
}
if (ecosystemScoutRequired) {
  decision = decision === "proceed" ? "ecosystem_scout_required" : decision;
  reasons.push("ecosystem scouting required before custom generation");
}
if (repoAbsorptionRequired) {
  decision = decision === "proceed" ? "ecosystem_scout_required" : decision;
  reasons.push("repo absorption requires local retrieval, license check, absorption report, and approval before activation");
}
if (externalWithoutActiveSource.length) {
  decision = decision === "stop_and_research" || decision === "ecosystem_scout_required" ? decision : "fill_knowledgebase_first";
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
  frontend_layer_scope: classification.frontendLayerScope,
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
  ecosystem_scout_required: ecosystemScoutRequired,
  ecosystem_scout_triggers: ecosystemScoutTriggers,
  repo_absorption_required: repoAbsorptionRequired,
  repo_absorption_triggers: repoAbsorption.triggers,
  source_repo_url: repoAbsorption.sourceRepoUrl,
  license_check_required: repoAbsorptionRequired,
  absorption_report_required: repoAbsorptionRequired,
  activation_approval_required: repoAbsorptionRequired,
  suggested_source_categories: sourceCategoriesFor(task),
  existing_local_coverage: existingLocalCoverage,
  external_discovery_needed: ecosystemScoutRequired || externalWithoutActiveSource.length > 0,
  candidate_pack_needed: candidatePackNeeded,
  tool_reuse_opportunities: toolReuseOpportunities,
  decision,
  reasons: [...new Set(reasons)]
};

if (jsonOnly) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Knowledge Sufficiency Gate: ${decision}`);
  if (result.frontend_layer_scope?.applicable) {
    console.log(`Frontend layers: ${result.frontend_layer_scope.layers.join(", ") || "none"}`);
    console.log(`Frontend scopes: ${result.frontend_layer_scope.scopes.join(", ") || "none"}`);
    console.log(`Frontend owners: ${result.frontend_layer_scope.ownerKnowledge.join(", ") || "none"}`);
    console.log(`Frontend verification: ${result.frontend_layer_scope.verification.join(", ") || "none"}`);
  }
  console.log(`Reasons: ${result.reasons.join(", ") || "none"}`);
  console.log(`Capabilities: ${result.capabilities_detected.join(", ") || "none"}`);
  console.log(`Active: ${result.active_items.join(", ") || "none"}`);
  console.log(`Candidate: ${result.candidate_items.join(", ") || "none"}`);
  console.log(`Missing: ${result.missing_capabilities.join(", ") || "none"}`);
  console.log(`Source risks: ${result.source_confidence_risks.map(x => x.id).join(", ") || "none"}`);
  console.log(`Artifact gaps: ${result.artifact_gaps.map(x => x.id).join(", ") || "none"}`);
  console.log(`Verification gaps: ${result.verification_gaps.map(x => x.id).join(", ") || "none"}`);
  console.log(`Ecosystem scout required: ${result.ecosystem_scout_required ? "yes" : "no"}`);
  console.log(`Repo absorption required: ${result.repo_absorption_required ? "yes" : "no"}`);
  if (result.source_repo_url) console.log(`Source repo: ${result.source_repo_url}`);
  console.log(`License check required: ${result.license_check_required ? "yes" : "no"}`);
  console.log(`Absorption report required: ${result.absorption_report_required ? "yes" : "no"}`);
  console.log(`Activation approval required: ${result.activation_approval_required ? "yes" : "no"}`);
  console.log(`Suggested sources: ${result.suggested_source_categories.join(", ")}`);
  console.log(`External discovery needed: ${result.external_discovery_needed ? "yes" : "no"}`);
  console.log(`Candidate pack needed: ${result.candidate_pack_needed ? "yes" : "no"}`);
}
