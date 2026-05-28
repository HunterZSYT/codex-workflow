#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, ensureTaskLearningFiles, LEARNING_ROOT, redact } from "./pm-lib.mjs";

const event = {
  timestamp: new Date().toISOString(),
  task_id: redact(arg("task-id", arg("taskId", ""))),
  task: redact(arg("task")),
  packet: redact(arg("packet")),
  category: redact(arg("category", "unknown")),
  summary: redact(arg("summary")),
  cause: redact(arg("cause")),
  capability: redact(arg("capability")),
  owner_skill: redact(arg("owner-skill", arg("skill", ""))),
  blob_id: redact(arg("blob-id", arg("blob", ""))),
  pack_id: redact(arg("pack-id", arg("pack", ""))),
  retrieval_query: redact(arg("retrieval-query")),
  sufficiency_decision: redact(arg("sufficiency-decision")),
  selected_tool: redact(arg("selected-tool", arg("tool", ""))),
  selected_mcp: redact(arg("selected-mcp", arg("mcp", ""))),
  verification_method: redact(arg("verification-method")),
  expected_behavior: redact(arg("expected")),
  actual_behavior: redact(arg("actual")),
  root_cause_type: redact(arg("root-cause-type", arg("category", "unknown"))),
  repair_target_type: redact(arg("repair-target-type")),
  repair_target_path: redact(arg("repair-target-path")),
  knowledge_gap_detected: redact(arg("knowledge-gap", "no")),
  source_confidence_issue: redact(arg("source-confidence-issue", "no")),
  should_patch_knowledgebase: redact(arg("should-patch-knowledgebase", "no")),
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

const ledger = `\n## ${event.timestamp}\nError summary: ${event.summary}\nTask ID: ${event.task_id}\nTask packet: ${event.packet}\nCapability: ${event.capability}\nKnowledge used: ${[event.owner_skill || event.skill, event.blob_id, event.pack_id].filter(Boolean).join(" / ")}\nSufficiency decision: ${event.sufficiency_decision}\nWhat failed: ${event.evidence}\nExpected behavior: ${event.expected_behavior}\nActual behavior: ${event.actual_behavior}\nRoot cause type: ${event.root_cause_type}\nSuspected cause: ${event.cause}\nAffected skill/tool/MCP: ${[event.owner_skill || event.skill, event.selected_tool || event.tool, event.selected_mcp].filter(Boolean).join(" / ")}\nRepair target: ${[event.repair_target_type, event.repair_target_path].filter(Boolean).join(" -> ")}\nKnowledge gap detected: ${event.knowledge_gap_detected}\nSource confidence issue: ${event.source_confidence_issue}\nShould patch knowledgebase: ${event.should_patch_knowledgebase}\nCause class: ${event.category}\nNext corrective action: ${event.lesson}\nMust not repeat: ${event.lesson || event.root_cause_type}\n`;
await fs.appendFile(path.join(aiTask, "error-ledger.md"), ledger);

if (event.command) {
  const failed = `\n## ${event.timestamp}\nCommand: ${event.command}\nExit code: ${event.exitCode}\nSelected tool/MCP: ${[event.selected_tool || event.tool, event.selected_mcp].filter(Boolean).join(" / ")}\nKnowledge sufficiency decision: ${event.sufficiency_decision}\nSanitized stderr/stdout excerpt: ${event.evidence}\nWhy command was run: ${event.summary}\nExpected behavior: ${event.expected_behavior}\nActual behavior: ${event.actual_behavior}\nRetry useful: ${/environment|tool unavailable|permission|path/i.test(event.category) ? "maybe after environment fix" : "only with changed diagnosis"}\nSafer next command: ${event.lesson}\n`;
  await fs.appendFile(path.join(aiTask, "failed-commands.md"), failed);
}

if (event.tool || event.skill) {
  const decision = `\n## ${event.timestamp}\nChosen skill/tool/blob/pack: ${[event.owner_skill || event.skill, event.selected_tool || event.tool, event.blob_id, event.pack_id].filter(Boolean).join(" / ")}\nRetrieval query: ${event.retrieval_query}\nSufficiency decision: ${event.sufficiency_decision}\nWhy chosen: ${event.summary}\nWas it correct: ${/wrong skill|tool misuse|over-verification|overbuilding|missing_knowledge|stale_knowledge|vague_blob|candidate_used_as_active/i.test(event.root_cause_type + " " + event.category) ? "no or uncertain" : "uncertain"}\nBetter alternative: ${event.lesson}\nWhat should be patched: ${[event.repair_target_type, event.repair_target_path].filter(Boolean).join(" -> ") || event.should_patch_knowledgebase}\nLesson learned: ${event.lesson}\n`;
  await fs.appendFile(path.join(aiTask, "decision-review.md"), decision);
}

await fs.appendFile(path.join(LEARNING_ROOT, "recurring-failures.jsonl"), JSON.stringify(event) + "\n");

console.log(JSON.stringify({ logged: true, aiTask, globalLog: path.join(LEARNING_ROOT, "recurring-failures.jsonl"), category: event.category }, null, 2));
