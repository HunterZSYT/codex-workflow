#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { PM_ROOT, FRONTEND_ROOT, BACKEND_ROOT, arg, exists } from "./pm-lib.mjs";

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
const sourceReady = await nonPlaceholder(path.join(packPath, "source-ledger.md"));
const specsReady = await nonPlaceholder(path.join(packPath, "specs.md"));
const verificationReady = await nonPlaceholder(path.join(packPath, "verification.md"));
const maturity = yaml.maturity || "unknown";
const status = yaml.status || "unknown";
const approval = yaml.approval_status || "unknown";

const blockers = [];
if (missing.length) blockers.push(`missing files: ${missing.join(", ")}`);
if (!sourceReady) blockers.push("source-ledger.md is empty or placeholder");
if (!specsReady && (maturity === "specified" || maturity === "artifact_backed" || maturity === "verified")) blockers.push(`${maturity} maturity requires non-placeholder specs.md`);
if (status === "active" && approval !== "approved") blockers.push("active status requires approval_status approved");
if ((maturity === "artifact_backed" || maturity === "verified") && artifacts.length === 0) blockers.push(`${maturity} requires artifacts`);
if (maturity === "verified" && !verificationReady) blockers.push("verified maturity requires non-placeholder verification.md");

console.log([
  `Pack: ${id}`,
  `Path: ${packPath}`,
  `Status: ${status}`,
  `Maturity: ${maturity}`,
  `Source confidence: ${yaml.source_confidence || "unknown"}`,
  `Approval status: ${approval}`,
  `Artifacts: ${artifacts.length}`,
  `Source ledger ready: ${sourceReady ? "yes" : "no"}`,
  `Specs ready: ${specsReady ? "yes" : "no"}`,
  `Verification ready: ${verificationReady ? "yes" : "no"}`,
  `Promotion readiness: ${blockers.length ? "not ready" : "ready for approval review"}`,
  ...(blockers.length ? ["Blockers:", ...blockers.map(b => `- ${b}`)] : [])
].join("\n"));

process.exit(missing.length ? 1 : 0);
