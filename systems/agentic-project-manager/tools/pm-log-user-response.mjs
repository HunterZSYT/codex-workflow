#!/usr/bin/env node
import { arg, ensureAiTask, copyTemplate, redact } from "./pm-lib.mjs";
import fs from "node:fs/promises";
import path from "node:path";

const dir = await ensureAiTask();
const file = path.join(dir, "user-response-ledger.md");
await copyTemplate("user-response-ledger-template.md", file);

const entry = `
---
Date/time: ${new Date().toISOString()}
Task ID: ${redact(arg("taskId", arg("task", "")))}
Related artifact: ${redact(arg("artifact", ""))}
Artifact type: ${redact(arg("artifactType", ""))}
User signal type: ${redact(arg("signal", classifyFeedback(arg("phrase", arg("summary", "")))) )}
User feedback summary: ${redact(arg("summary", ""))}
Direct user phrase short: ${redact(arg("phrase", ""))}
Interpreted action: ${redact(arg("action", ""))}
Change made or next action: ${redact(arg("next", ""))}
Status after response: ${redact(arg("status", ""))}
Reusable preference candidate: ${redact(arg("reusable", "no"))}
Should update memory or skill: ${redact(arg("promote", "no"))}
Owner policy/skill/blob: ${redact(arg("owner", ownerForFeedback(arg("phrase", arg("summary", "")))))}
Candidate update target: ${redact(arg("target", targetForFeedback(arg("phrase", arg("summary", "")))))}
Safety notes: ${redact(arg("safety", ""))}
Linked files changed: ${redact(arg("files", ""))}
Verification after change: ${redact(arg("verification", ""))}
`;

await fs.appendFile(file, entry);
if (/yes|true|1/i.test(arg("reusable", "")) || /ai memory|existing tools|knowledgebase|candidate|bloat agents|custom scripts/i.test(arg("phrase", arg("summary", "")))) {
  const patterns = path.join(path.dirname(path.dirname(file)), "learning", "user-feedback-patterns.md");
  const pmLearning = path.join(process.env.USERPROFILE || "", ".codex", "agentic-project-manager", "learning", "user-feedback-patterns.md");
  const candidate = `\n## ${new Date().toISOString()}\n- Status: proposed\n- Classification: ${redact(arg("signal", classifyFeedback(arg("phrase", arg("summary", ""))))) }\n- Feedback: ${redact(arg("phrase", arg("summary", "")))}\n- Owner policy/skill/blob: ${redact(arg("owner", ownerForFeedback(arg("phrase", arg("summary", ""))))) }\n- Proposed target: ${redact(arg("target", targetForFeedback(arg("phrase", arg("summary", ""))))) }\n- Proposed action: ${redact(arg("action", "Create candidate system update; do not auto-apply unless explicitly requested."))}\n- Approval required: yes\n`;
  try { await fs.appendFile(pmLearning, candidate); } catch {}
}
console.log(file);

function classifyFeedback(text = "") {
  const t = String(text).toLowerCase();
  if (/existing software|existing tools|custom scripts|mcp|tool/.test(t)) return "tool preference";
  if (/approve|approved|yes proceed/.test(t)) return "approval";
  if (/wrong|not correct|bug|broken/.test(t)) return "correction";
  if (/do not|don't|never|avoid/.test(t)) return "workflow rule";
  if (/style|design|tone|naming/.test(t)) return "style rule";
  if (/knowledge|ai memory|candidate|stale|source/.test(t)) return "knowledge gap";
  if (/verify|screenshot|proof|test/.test(t)) return "verification complaint";
  return "preference";
}

function ownerForFeedback(text = "") {
  const t = String(text).toLowerCase();
  if (/verify|screenshot|proof|test/.test(t)) return "verification-gate-controller";
  if (/tool|software|script|mcp|existing tools/.test(t)) return "task-routing-and-skill-selection";
  if (/knowledge|ai memory|candidate|stale|source/.test(t)) return "project-manager-execution-ledger";
  if (/agents\.md|bloat/.test(t)) return "project-manager-execution-ledger";
  return "project-manager-execution-ledger";
}

function targetForFeedback(text = "") {
  const t = String(text).toLowerCase();
  if (/knowledge|ai memory|candidate|stale|source/.test(t)) return "knowledge sufficiency policy/blob";
  if (/tool|software|script|mcp|existing tools/.test(t)) return "routing/tool selection policy";
  if (/verify|screenshot|proof|test/.test(t)) return "verification policy/blob";
  return "user preference candidate";
}
