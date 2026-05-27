#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { PM_ROOT, arg } from "./pm-lib.mjs";

const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");

function normalize(value) {
  return String(value || "").toLowerCase();
}

function matches(entry, query) {
  const q = normalize(query);
  if (!q) return true;
  const haystack = [
    entry.blob_id,
    entry.capability,
    entry.owner_system,
    entry.owner_skill,
    ...(entry.trigger_terms || []),
    ...(entry.external_libraries || []),
    ...(entry.docs_sources || [])
  ].map(normalize).join(" ");
  return haystack.includes(q);
}

const capability = arg("capability");
const term = arg("term");
const query = capability || term || "";

const raw = await fs.readFile(registryPath, "utf8");
const registry = JSON.parse(raw);
const results = registry.filter(entry => matches(entry, query));

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(results, null, 2));
} else {
  if (results.length === 0) {
    console.log(`No knowledge blobs matched: ${query}`);
    process.exit(1);
  }
  for (const entry of results) {
    console.log([
      `- ${entry.blob_id}`,
      `  capability: ${entry.capability}`,
      `  owner: ${entry.owner_system} / ${entry.owner_skill}`,
      `  status: ${entry.status}`,
      `  docs: ${(entry.docs_sources || []).join(", ") || "none"}`,
      `  file: ${entry.file_path}`
    ].join("\n"));
  }
}
