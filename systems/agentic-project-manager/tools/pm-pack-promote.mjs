#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { PM_ROOT, FRONTEND_ROOT, BACKEND_ROOT, arg, exists } from "./pm-lib.mjs";

const id = arg("id");
const approved = process.argv.includes("--approved");
if (!id) {
  console.error("Usage: pm-pack-promote.mjs --id frontend.layout.swiss-editorial-grid --approved");
  process.exit(2);
}
if (!approved) {
  console.error("Promotion blocked: --approved is required.");
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
const blockers = [];
if (!(await nonPlaceholder(path.join(packPath, "source-ledger.md")))) blockers.push("source-ledger.md is empty or placeholder");
if ((yaml.maturity === "artifact_backed" || yaml.maturity === "verified") && artifacts.length === 0) blockers.push(`${yaml.maturity} requires artifacts`);
if (yaml.maturity === "verified" && !(await nonPlaceholder(path.join(packPath, "verification.md")))) blockers.push("verified maturity requires non-placeholder verification.md");
if (blockers.length) {
  console.error("Promotion blocked:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

yaml.status = "active";
yaml.approval_status = "approved";
yaml.last_verified = new Date().toISOString().slice(0, 10);
await fs.writeFile(packYamlPath, serializeYaml(yaml), "utf8");

const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");
const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
const index = registry.findIndex(item => item.product_type === "pack" && (item.id === `pack.${id}` || item.pack_id === id));
if (index >= 0) {
  registry[index] = {
    ...registry[index],
    status: "active",
    approval_status: "approved",
    promotion_status: "approved",
    last_verified: yaml.last_verified,
    artifact_paths: artifacts,
    artifacts_count: artifacts.length,
    source_confidence: yaml.source_confidence || registry[index].source_confidence || "medium"
  };
  await fs.writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
}

console.log(`Promoted pack: ${id}`);
