#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { LEARNING_ROOT, exists } from "./pm-lib.mjs";

async function readJsonl(file) {
  if (!(await exists(file))) return [];
  const text = await fs.readFile(file, "utf8");
  return text.split(/\r?\n/).filter(Boolean).map(line => {
    try { return JSON.parse(line); } catch { return null; }
  }).filter(x => x && x.timestamp);
}

const events = await readJsonl(path.join(LEARNING_ROOT, "recurring-failures.jsonl"));
const currentLogs = [];
for (const name of ["error-ledger.md", "failed-commands.md", "decision-review.md"]) {
  const p = path.join(process.cwd(), ".ai-task", name);
  if (await exists(p)) currentLogs.push({ name, text: await fs.readFile(p, "utf8") });
}

const byCategory = new Map();
const byTool = new Map();
for (const e of events) {
  byCategory.set(e.category || "unknown", (byCategory.get(e.category || "unknown") || 0) + 1);
  const key = e.tool || e.skill || "unspecified";
  byTool.set(key, (byTool.get(key) || 0) + 1);
}

const repeated = [...byCategory.entries()].filter(([, count]) => count > 1).sort((a, b) => b[1] - a[1]);
const tools = [...byTool.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

const recommendations = [];
for (const [category, count] of repeated) {
  if (/verification|loop/i.test(category)) recommendations.push(`Repeated ${category} (${count}): propose verification-gate-controller update.`);
  else if (/routing|wrong skill|tool misuse/i.test(category)) recommendations.push(`Repeated ${category} (${count}): propose task-routing-and-skill-selection update.`);
  else if (/tool unavailable|environment/i.test(category)) recommendations.push(`Repeated ${category} (${count}): update tool-status recommendation or install/config docs.`);
  else recommendations.push(`Repeated ${category} (${count}): promote to learning/error-patterns.md.`);
}

const report = {
  generated: new Date().toISOString(),
  globalEvents: events.length,
  currentTaskLogsFound: currentLogs.map(x => x.name),
  topRepeatedErrors: repeated.map(([category, count]) => ({ category, count })),
  toolOrSkillCounts: tools.map(([tool, count]) => ({ tool, count })),
  likelyRootCauses: recommendations.length ? recommendations : ["No repeated pattern detected yet; log only."],
  recommendedChanges: recommendations
};

console.log(JSON.stringify(report, null, 2));
