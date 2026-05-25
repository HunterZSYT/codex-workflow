#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, ensureTaskLearningFiles, LEARNING_ROOT, redact } from "./pm-lib.mjs";

const event = {
  timestamp: new Date().toISOString(),
  task: redact(arg("task")),
  packet: redact(arg("packet")),
  category: redact(arg("category", "unknown")),
  summary: redact(arg("summary")),
  cause: redact(arg("cause")),
  tool: redact(arg("tool")),
  skill: redact(arg("skill")),
  command: redact(arg("command")),
  exitCode: redact(arg("exitCode")),
  evidence: redact(arg("evidence")),
  lesson: redact(arg("lesson")),
  severity: redact(arg("severity", "medium"))
};

await fs.mkdir(LEARNING_ROOT, { recursive: true });
const aiTask = await ensureTaskLearningFiles();

const ledger = `\n## ${event.timestamp}\nError summary: ${event.summary}\nTask packet: ${event.packet}\nWhat failed: ${event.evidence}\nSuspected cause: ${event.cause}\nAffected skill/tool: ${[event.skill, event.tool].filter(Boolean).join(" / ")}\nCause class: ${event.category}\nNext corrective action: ${event.lesson}\n`;
await fs.appendFile(path.join(aiTask, "error-ledger.md"), ledger);

if (event.command) {
  const failed = `\n## ${event.timestamp}\nCommand: ${event.command}\nExit code: ${event.exitCode}\nSanitized stderr/stdout excerpt: ${event.evidence}\nWhy command was run: ${event.summary}\nRetry useful: ${/environment|tool unavailable|permission|path/i.test(event.category) ? "maybe after environment fix" : "only with changed diagnosis"}\nSafer next command: ${event.lesson}\n`;
  await fs.appendFile(path.join(aiTask, "failed-commands.md"), failed);
}

if (event.tool || event.skill) {
  const decision = `\n## ${event.timestamp}\nChosen skill/tool: ${[event.skill, event.tool].filter(Boolean).join(" / ")}\nWhy chosen: ${event.summary}\nWas it correct: ${/wrong skill|tool misuse|over-verification|overbuilding/i.test(event.category) ? "no or uncertain" : "uncertain"}\nBetter alternative: ${event.lesson}\nLesson learned: ${event.lesson}\n`;
  await fs.appendFile(path.join(aiTask, "decision-review.md"), decision);
}

await fs.appendFile(path.join(LEARNING_ROOT, "recurring-failures.jsonl"), JSON.stringify(event) + "\n");

console.log(JSON.stringify({ logged: true, aiTask, globalLog: path.join(LEARNING_ROOT, "recurring-failures.jsonl"), category: event.category }, null, 2));
