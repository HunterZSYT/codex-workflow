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
const byRootCause = new Map();
const byKnowledge = new Map();
const byCommand = new Map();
for (const e of events) {
  byCategory.set(e.category || "unknown", (byCategory.get(e.category || "unknown") || 0) + 1);
  const key = e.tool || e.skill || "unspecified";
  byTool.set(key, (byTool.get(key) || 0) + 1);
  byRootCause.set(e.root_cause_type || e.category || "unknown", (byRootCause.get(e.root_cause_type || e.category || "unknown") || 0) + 1);
  const knowledgeKey = e.blob_id || e.pack_id || e.capability || "unspecified";
  byKnowledge.set(knowledgeKey, (byKnowledge.get(knowledgeKey) || 0) + 1);
  if (e.command) byCommand.set(e.command, (byCommand.get(e.command) || 0) + 1);
}

const repeated = [...byCategory.entries()].filter(([, count]) => count > 1).sort((a, b) => b[1] - a[1]);
const tools = [...byTool.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
const rootCauses = [...byRootCause.entries()].sort((a, b) => b[1] - a[1]);
const knowledgeAreas = [...byKnowledge.entries()].filter(([key, count]) => key !== "unspecified" && count > 0).sort((a, b) => b[1] - a[1]).slice(0, 10);
const repeatedCommands = [...byCommand.entries()].filter(([, count]) => count > 1).sort((a, b) => b[1] - a[1]).slice(0, 10);

const recommendations = [];
for (const [rootCause, count] of rootCauses.length ? rootCauses : repeated) {
  if (/missing_knowledge|stale_knowledge|vague_blob|candidate_used_as_active|external_docs_missing/i.test(rootCause)) recommendations.push(`Repeated ${rootCause} (${count}): fill/update knowledge blob or capability pack; do not implement until source-backed.`);
  else if (/retrieval_failed/i.test(rootCause)) recommendations.push(`Repeated ${rootCause} (${count}): improve aliases/trigger terms/registry metadata, rerun index, and dedupe if needed.`);
  else if (/wrong_tool|wrong_skill|missing_tool|missing_mcp/i.test(rootCause)) recommendations.push(`Repeated ${rootCause} (${count}): propose task-routing-and-skill-selection micro-update or tool status update.`);
  else if (/verification_weak|verification_overkill/i.test(rootCause)) recommendations.push(`Repeated ${rootCause} (${count}): propose verification-gate-controller or verification blob update.`);
  else if (/user_preference_mismatch/i.test(rootCause)) recommendations.push(`Repeated ${rootCause} (${count}): propose user preference candidate and ask approval before promotion.`);
  else recommendations.push(`Repeated ${rootCause} (${count}): keep logging unless evidence supports a candidate patch.`);
}

const report = {
  generated: new Date().toISOString(),
  globalEvents: events.length,
  currentTaskLogsFound: currentLogs.map(x => x.name),
  topRepeatedErrors: repeated.map(([category, count]) => ({ category, count })),
  repeatedRootCauses: rootCauses.map(([root_cause, count]) => ({ root_cause, count })),
  repeatedFailedCommands: repeatedCommands.map(([command, count]) => ({ command, count })),
  repeatedKnowledgeAreas: knowledgeAreas.map(([target, count]) => ({ target, count })),
  toolOrSkillCounts: tools.map(([tool, count]) => ({ tool, count })),
  likelyRootCauses: recommendations.length ? recommendations : ["No repeated pattern detected yet; log only."],
  recommendedChanges: recommendations,
  candidatePatchRecommended: recommendations.some(x => /propose|fill\/update|improve/.test(x)),
  docsResearchNeeded: recommendations.some(x => /source-backed|docs|external/i.test(x)),
  userApprovalNeeded: recommendations.some(x => /approval|promote|source-backed/.test(x))
};

console.log(JSON.stringify(report, null, 2));
