#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
const dir = path.join(process.cwd(), ".ai-task");
async function read(name) { try { return await fs.readFile(path.join(dir, name), "utf8"); } catch { return ""; } }
await fs.mkdir(dir, { recursive: true });
const md = `# Completion Report

Generated: ${new Date().toISOString()}

## Summary
${(await read("current-roadmap.md")).split("## Task Summary")[1]?.split("##")[0]?.trim() || ""}

## Files Changed
See execution ledger.

## Skills / Tools Used
${await read("tool-skill-usage.md")}

## Verification Run
${await read("verification-log.md")}

## Remaining Items
Review unchecked roadmap items.

## Inefficiencies Noticed
${await read("inefficiency-log.md")}

## Recommended Improvements
${await read("improvement-backlog.md")}

## Learning Review
Errors encountered:
${await read("error-ledger.md")}

Failed commands:
${await read("failed-commands.md")}

Decision review:
${await read("decision-review.md")}

Mistake category:
Review the error ledger categories.

Tool/skill routing lesson:
Review decision-review.md and tool-skill-usage.md.

Proposed improvement:
Use pm-suggest-skill-update.mjs for repeated patterns; do not auto-apply one-off lessons.

Apply now or backlog:
Backlog unless user explicitly approves or the task requested setup/update work.

Safe to sync to codex-workflow:
Only sanitized learning docs, never raw recurring-failures.jsonl or .ai-task logs.
`;
const out = path.join(dir, "completion-report.md");
await fs.writeFile(out, md);
console.log(out);
