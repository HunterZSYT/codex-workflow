#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, classifyTask, copyTemplate, ensureAiTask } from "./pm-lib.mjs";
const task = arg("task");
const scope = arg("scope", "auto");
if (!task) { console.error('Usage: node pm-init-task.mjs --task "task text" --scope small|medium|large|auto'); process.exit(1); }
const c = classifyTask(task);
const need = scope === "large" || scope === "medium" || (scope === "auto" && c.needsTracking);
if (!need) { console.log(JSON.stringify({ trackingCreated: false, classification: c, nextStep: "Use short in-chat checklist; no .ai-task files needed." }, null, 2)); process.exit(0); }
const dir = await ensureAiTask();
const templates = {
  "execution-ledger-template.md": "execution-ledger.md",
  "verification-log-template.md": "verification-log.md",
  "tool-skill-usage-template.md": "tool-skill-usage.md",
  "inefficiency-log-template.md": "inefficiency-log.md",
  "improvement-backlog-template.md": "improvement-backlog.md",
  "completion-report-template.md": "completion-report.md"
};
for (const [src, dest] of Object.entries(templates)) await copyTemplate(src, path.join(dir, dest));
await import("./pm-create-roadmap.mjs");
console.log(JSON.stringify({ trackingCreated: true, dir, classification: c, nextStep: "Run pm-next-packet.mjs" }, null, 2));
