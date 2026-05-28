#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, ensureAiTask, LEARNING_ROOT, redact } from "./pm-lib.mjs";

function boolArg(name, fallback = false) {
  const value = arg(name, "");
  if (!value) return fallback;
  return /^(1|true|yes)$/i.test(value);
}

function id(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const taskId = redact(arg("task-id", arg("taskId", ""))) || id("task");
const event = {
  event_id: redact(arg("event-id", "")) || id("evt"),
  task_id: taskId,
  timestamp: new Date().toISOString(),
  event_type: redact(arg("type", arg("event", "task.started"))),
  phase: redact(arg("phase", "")),
  category: redact(arg("category", "")),
  capability: redact(arg("capability", "")),
  owner_skill: redact(arg("owner-skill", arg("skill", ""))),
  blob_id: redact(arg("blob-id", arg("blob", ""))),
  pack_id: redact(arg("pack-id", arg("pack", ""))),
  tool: redact(arg("tool", "")),
  mcp: redact(arg("mcp", "")),
  command: redact(arg("command", "")),
  exit_code: redact(arg("exit-code", arg("exitCode", ""))),
  evidence_summary: redact(arg("evidence", arg("summary", ""))),
  root_cause: redact(arg("root-cause", arg("cause", ""))),
  lesson: redact(arg("lesson", "")),
  severity: redact(arg("severity", "medium")),
  source_confidence: redact(arg("source-confidence", "")),
  approval_required: boolArg("approval-required", false),
  safe_to_sync: boolArg("safe-to-sync", false),
  redaction_status: "redacted"
};

await fs.mkdir(path.join(LEARNING_ROOT, "events"), { recursive: true });
const globalFile = path.join(LEARNING_ROOT, "events", "events.jsonl");
await fs.appendFile(globalFile, `${JSON.stringify(event)}\n`, "utf8");

let taskFile = "";
if (!process.argv.includes("--global-only")) {
  const aiTask = await ensureAiTask();
  taskFile = path.join(aiTask, "events.jsonl");
  await fs.appendFile(taskFile, `${JSON.stringify(event)}\n`, "utf8");
}

console.log(JSON.stringify({ logged: true, event_id: event.event_id, task_id: event.task_id, globalLog: globalFile, taskLog: taskFile || null }, null, 2));
