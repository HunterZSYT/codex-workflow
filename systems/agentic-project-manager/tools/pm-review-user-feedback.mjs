#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { LEARNING_ROOT, arg, exists } from "./pm-lib.mjs";

const query = arg("query", "");
const file = path.join(LEARNING_ROOT, "user-feedback-patterns.md");

function chunks(text) {
  return text.split(/\n(?=## )/).filter(x => x.trim());
}

function classify(text) {
  const t = text.toLowerCase();
  if (/existing software|existing tools|custom scripts|mcp|tool/.test(t)) return "tool preference";
  if (/ai memory|knowledgebase|candidate|stale|source/.test(t)) return "knowledge gap";
  if (/agents\.md|bloat|workflow/.test(t)) return "workflow rule";
  if (/verify|proof|screenshot/.test(t)) return "verification complaint";
  if (/approve/.test(t)) return "approval";
  if (/wrong|bug|broken/.test(t)) return "correction";
  return "preference";
}

function owner(text) {
  const c = classify(text);
  if (c === "verification complaint") return "verification-gate-controller";
  if (c === "tool preference") return "task-routing-and-skill-selection";
  return "project-manager-execution-ledger";
}

if (!(await exists(file))) {
  console.log(JSON.stringify({ patterns: 0, recommendations: [] }, null, 2));
  process.exit(0);
}

const text = await fs.readFile(file, "utf8");
const items = chunks(text).filter(chunk => !query || chunk.toLowerCase().includes(query.toLowerCase())).map(chunk => ({
  classification: classify(chunk),
  owner: owner(chunk),
  status: chunk.match(/Status:\s*([^\n\r]+)/i)?.[1]?.trim() || "proposed",
  approval_required: /Approval required:\s*yes/i.test(chunk),
  snippet: chunk.replace(/\s+/g, " ").trim().slice(0, 500)
}));

const counts = new Map();
for (const item of items) counts.set(`${item.classification} -> ${item.owner}`, (counts.get(`${item.classification} -> ${item.owner}`) || 0) + 1);
const recommendations = [...counts.entries()].map(([target, count]) => ({
  target,
  count,
  action: count > 1 ? "consider enrichment candidate or promoted policy/blob update after approval" : "keep as proposed candidate unless user explicitly requested update"
}));

console.log(JSON.stringify({ patterns: items.length, items, recommendations }, null, 2));
