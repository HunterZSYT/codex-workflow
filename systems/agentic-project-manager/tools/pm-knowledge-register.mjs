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

function inferFromBlob(text, filePath) {
  const blobId = field(text, "Blob ID") || path.basename(filePath).replace(/\.blob\.md$/i, "");
  return {
    blob_id: blobId,
    capability: field(text, "Capability") || blobId,
    owner_system: field(text, "Owner system") || "",
    owner_skill: field(text, "Owner skill") || "",
    file_path: filePath,
    trigger_terms: parseList(field(text, "Trigger phrases")),
    external_libraries: parseList(field(text, "External libraries/tools")),
    docs_sources: [],
    last_verified: field(text, "Last verified") || "candidate",
    status: arg("status", "candidate"),
    safe_to_sync: /^yes$/i.test(field(text, "Safe to sync to codex-workflow")) || arg("safe-to-sync", "true") !== "false"
  };
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
