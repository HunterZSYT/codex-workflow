#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { LEARNING_ROOT, exists } from "./pm-lib.mjs";

async function read(name) {
  const p = path.join(LEARNING_ROOT, name);
  return (await exists(p)) ? await fs.readFile(p, "utf8") : "";
}

const jsonlPath = path.join(LEARNING_ROOT, "recurring-failures.jsonl");
const events = (await exists(jsonlPath) ? (await fs.readFile(jsonlPath, "utf8")).split(/\r?\n/).filter(Boolean) : [])
  .map(line => { try { return JSON.parse(line); } catch { return null; } })
  .filter(x => x && x.timestamp);

const recent = events.slice(-10);
const categories = {};
for (const e of events) categories[e.category || "unknown"] = (categories[e.category || "unknown"] || 0) + 1;

const report = `# Learning Report

Generated: ${new Date().toISOString()}

## Recent Failures
${recent.length ? recent.map(e => `- ${e.timestamp}: ${e.category} - ${e.summary}`).join("\n") : "- none"}

## Repeated Patterns
${Object.entries(categories).filter(([, c]) => c > 1).map(([k, c]) => `- ${k}: ${c}`).join("\n") || "- none"}

## Skill Update Candidates
${(await read("skill-update-candidates.md")).split(/\r?\n/).slice(-40).join("\n")}

## Applied Lessons
${(await read("resolved-lessons.md")).split(/\r?\n/).slice(-30).join("\n")}
`;

console.log(report);
