#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { PM_ROOT, arg, exists } from "./pm-lib.mjs";

const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");

function parseList(value = "") {
  return String(value || "").split(",").map(x => x.trim()).filter(Boolean);
}

function field(text, label) {
  const rx = new RegExp(`^${label}:\\s*(.*)$`, "im");
  return text.match(rx)?.[1]?.trim() || "";
}

function bulletBlock(text, label) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(line => line.trim().toLowerCase() === `${label.toLowerCase()}:`);
  if (start < 0) return [];
  const values = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^[A-Z][A-Za-z /-]+:\s*$/.test(line.trim()) || /^#{1,6}\s+/.test(line)) break;
    const item = line.match(/^\s*-\s+(.*)$/)?.[1]?.trim();
    if (item) values.push(item.replace(/^`|`$/g, ""));
  }
  return values;
}

function bulletField(text, label) {
  const rx = new RegExp(`^\\s*-\\s*${label}:\\s*(.*)$`, "im");
  return text.match(rx)?.[1]?.trim() || "";
}

function listField(text, label) {
  return parseList(field(text, label)).concat(bulletBlock(text, label));
}

function inferFromBlob(text, filePath) {
  const blobId = field(text, "Blob ID") || path.basename(filePath).replace(/\.blob\.md$/i, "");
  const ownerSystem = field(text, "Owner system") || "";
  const ownerSkill = field(text, "Owner skill") || "";
  const status = arg("status", "candidate");
  const artifactPaths = listField(text, "Artifact paths");
  const applyCommand = field(text, "Apply command");
  const docs = bulletBlock(text, "Required docs source")
    .map(item => item.replace(/^(Context7|Official docs|GitHub\/npm):\s*/i, "").trim())
    .filter(item => item && !/^not needed$/i.test(item) && !/^Last verified:/i.test(item));
  const capabilityClass = inferCapabilityClass(filePath, ownerSkill);
  return {
    id: `${capabilityClass}.${blobId.replace(/-layout$/i, "")}`,
    title: blobId.split(/[-_]+/).filter(Boolean).map(word => word[0]?.toUpperCase() + word.slice(1)).join(" "),
    namespace: inferNamespace(ownerSystem, filePath),
    type: "blob",
    blob_id: blobId,
    capability: field(text, "Capability") || blobId,
    capability_class: capabilityClass,
    owner_system: ownerSystem,
    owner_skill: ownerSkill,
    file_path: filePath,
    aliases: [blobId],
    trigger_terms: listField(text, "Trigger phrases"),
    external_libraries: listField(text, "External libraries/tools"),
    docs_sources: docs,
    last_verified: field(text, "Last verified") || bulletField(text, "Last verified") || "candidate",
    status,
    maturity: artifactPaths.length || applyCommand ? "artifact_backed" : status === "active" ? "researched_blob" : "candidate_blob",
    source_confidence: docs.some(doc => /https?:|context7/i.test(doc)) ? "sourced" : status === "candidate" ? "needs-docs" : "internal",
    related_items: listField(text, "Related items"),
    artifact_paths: artifactPaths,
    apply_command: applyCommand,
    verification_method: field(text, "Verification method"),
    safe_to_sync: /^yes$/i.test(field(text, "Safe to sync to codex-workflow")) || arg("safe-to-sync", "true") !== "false"
  };
}

function inferNamespace(ownerSystem, filePath) {
  const value = `${ownerSystem} ${filePath}`.toLowerCase();
  if (value.includes("agentic-frontend")) return "frontend";
  if (value.includes("agentic-backend-database")) return "backend";
  if (value.includes("agentic-project-manager")) return "project_manager";
  return "global";
}

function inferCapabilityClass(filePath, ownerSkill = "") {
  const fp = String(filePath || "").toLowerCase();
  const owner = String(ownerSkill || "").toLowerCase();
  if (fp.includes("\\layout\\") || owner.includes("layout")) return "frontend.layout";
  if (fp.includes("\\motion\\") || owner.includes("motion")) return "frontend.motion";
  if (fp.includes("\\components\\") || owner.includes("component")) return "frontend.components";
  if (fp.includes("\\inspection\\") || fp.includes("\\verification\\")) return "frontend.inspection";
  if (fp.includes("\\typography\\") || owner.includes("typography")) return "frontend.typography";
  if (fp.includes("\\color\\") || owner.includes("color")) return "frontend.color";
  if (fp.includes("\\spacing\\") || owner.includes("spacing")) return "frontend.spacing";
  if (fp.includes("\\api\\")) return "backend.api";
  if (fp.includes("\\database\\")) return "backend.database";
  if (fp.includes("\\vps\\")) return "vps.webserver";
  if (fp.includes("\\routing\\")) return "project_manager.routing";
  if (fp.includes("\\capability-orchestration\\")) return "project_manager.routing";
  return "project_manager.retrieval";
}

const file = arg("file");
if (!file) {
  console.error("Usage: pm-knowledge-register.mjs --file <blob.md> [--status active|candidate|stale|deprecated]");
  process.exit(2);
}

const filePath = path.resolve(file);
if (!(await exists(filePath))) {
  console.error(`Blob file not found: ${filePath}`);
  process.exit(1);
}

const text = await fs.readFile(filePath, "utf8");
const next = inferFromBlob(text, filePath);
const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
const index = registry.findIndex(entry => entry.blob_id === next.blob_id);
if (index >= 0) registry[index] = { ...registry[index], ...next };
else registry.push(next);

registry.sort((a, b) => String(a.blob_id).localeCompare(String(b.blob_id)));
await fs.writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
console.log(`${index >= 0 ? "updated" : "added"} ${next.blob_id}`);
