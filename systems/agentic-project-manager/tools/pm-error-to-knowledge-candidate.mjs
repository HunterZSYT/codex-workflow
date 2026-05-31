#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { LEARNING_ROOT, arg, exists, redact } from "./pm-lib.mjs";

function targetFile(rootCause, targetType, category) {
  const value = `${rootCause} ${targetType} ${category}`.toLowerCase();
  if (/user|preference|feedback/.test(value)) return "user-preference-candidates.md";
  if (/verification/.test(value)) return "verification-update-candidates.md";
  if (/tool|script|command|mcp/.test(value)) return "tool-update-candidates.md";
  if (/skill/.test(value)) return "skill-update-candidates.md";
  return "knowledge-patch-candidates.md";
}

async function latestErrors() {
  const file = path.join(LEARNING_ROOT, "recurring-failures.jsonl");
  if (!(await exists(file))) return [];
  const lines = (await fs.readFile(file, "utf8")).split(/\r?\n/).filter(Boolean);
  return lines.slice(-5).map(line => {
    try { return JSON.parse(line); } catch { return null; }
  }).filter(Boolean);
}

const category = redact(arg("category", "knowledge_gap"));
const capability = redact(arg("capability", ""));
const evidence = redact(arg("evidence", ""));
const rootCause = redact(arg("root-cause", arg("root-cause-type", "missing_knowledge")));
const targetType = redact(arg("target-type", arg("repair-target-type", "")));
const targetPath = redact(arg("target-path", arg("repair-target-path", "")));
const proposedPatch = redact(arg("patch", arg("proposed-patch", "")));
const taskId = redact(arg("task-id", arg("taskId", "")));
const lifecycleStatus = redact(arg("lifecycle-status", ""));
const existingItem = redact(arg("existing-item", ""));
const activeTarget = /active/i.test(lifecycleStatus) || /active/i.test(existingItem);
const events = await latestErrors();
const fileName = targetFile(rootCause, targetType, category);
const outPath = path.join(LEARNING_ROOT, fileName);

await fs.mkdir(LEARNING_ROOT, { recursive: true });
if (!(await exists(outPath))) await fs.writeFile(outPath, `# ${fileName.replace(/-/g, " ").replace(/\.md$/, "")}\n\n`, "utf8");

const entry = `\n## ${new Date().toISOString()}\n- Date: ${new Date().toISOString().slice(0, 10)}\n- Triggering event(s): ${taskId || events.map(e => e.timestamp).join(", ") || "manual"}\n- Capability: ${capability}\n- Root cause: ${rootCause}\n- Existing item found by retrieval: ${existingItem}\n- Proposed target: ${[targetType, targetPath].filter(Boolean).join(" -> ") || "knowledge blob/pack candidate"}\n- Proposed patch: ${proposedPatch || "Stage a focused knowledgebase update before implementation."}\n- Lifecycle action: ${activeTarget ? "enrichment_candidate_against_active_item" : "candidate_patch"}\n- Evidence: ${evidence || events.map(e => e.summary || e.evidence).filter(Boolean).slice(-2).join(" | ")}\n- Source/docs needed: ${redact(arg("docs-needed", "official/current docs if external capability is involved"))}\n- Risk of change: ${redact(arg("risk", "medium"))}\n- Approval required: yes\n- Validation needed: retrieval search, sufficiency gate, targeted verification\n- Status: proposed\n`;

await fs.appendFile(outPath, entry, "utf8");
console.log(JSON.stringify({ created: true, file: outPath, status: "proposed" }, null, 2));
