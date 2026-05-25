#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, ensureAiTask, roadmapFor } from "./pm-lib.mjs";
const task = arg("task");
if (!task) { console.error('Usage: node pm-create-roadmap.mjs --task "task text"'); process.exit(1); }
const dir = await ensureAiTask();
const { classification, packets } = roadmapFor(task);
const md = `# Active Task Roadmap

## Task Summary
${task}

## Task Type
${classification.type}

## Hard Constraints
- [ ] Extract from user request before editing.

## Relevant Skills
${classification.suggestedSkills.map(s => `- Skill: ${s}`).join("\n") || "- Skill: none"}

## Relevant Tools / Systems
${classification.suggestedTools.map(t => `- Tool: ${t}`).join("\n") || "- Tool: none"}

## Execution Packets
${packets.map(p => `- [ ] ${p}`).join("\n")}

## Bundled Tasks
- Same work type, same area, same verification, low risk.

## Single-Risk Tasks
${classification.userApprovalBeforeWrites ? "- Any write/destructive/server/database task requires approval." : "- None identified by heuristic classification."}

## Verification Plan
- [ ] Use the smallest verification method that proves the claim.

## Screenshot / Inspection Rules
${classification.screenshotsNeeded ? "Rendered evidence required before visual claim. Mobile claims require mobile emulation." : "No screenshots by default unless layout/visual risk appears."}

## Stop Conditions
- Stop if target/risk is unclear.
- Stop before destructive work without explicit approval.
- Stop if verification cannot be run honestly.

## Current Status
Pending
`;
const out = path.join(dir, "current-roadmap.md");
await fs.writeFile(out, md);
console.log(out);
