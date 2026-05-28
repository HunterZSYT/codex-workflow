#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
const dir = path.join(process.cwd(), ".ai-task");
async function read(name) { try { return await fs.readFile(path.join(dir, name), "utf8"); } catch { return ""; } }
await fs.mkdir(dir, { recursive: true });
const sufficiency = await read("knowledge-sufficiency.json");
let sufficiencyJson = {};
try { sufficiencyJson = sufficiency ? JSON.parse(sufficiency) : {}; } catch {}
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

## Knowledge Sufficiency Review
Gate run: ${sufficiency ? "yes" : "no"}
Decision: ${sufficiencyJson.decision || ""}
Active blobs/packs used: ${(sufficiencyJson.active_items || []).join(", ")}
Candidate/stale items encountered: ${(sufficiencyJson.candidate_items || []).concat(sufficiencyJson.stale_items || []).join(", ")}
Missing knowledge: ${(sufficiencyJson.missing_capabilities || []).join(", ")}
Source confidence issues: ${(sufficiencyJson.source_confidence_risks || []).map(x => x.id || x.capability).join(", ")}
Artifact gaps: ${(sufficiencyJson.artifact_gaps || []).map(x => x.id || x.capability).join(", ")}
Verification gaps: ${(sufficiencyJson.verification_gaps || []).map(x => x.id || x.capability).join(", ")}
Did coding start before knowledge was sufficient: ${sufficiencyJson.decision && !["proceed", "proceed_with_warning", "ask_user_approval", "use_existing_artifact"].includes(sufficiencyJson.decision) ? "yes or blocked; review task timeline" : "no evidence in report"}

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

System patch candidate:
Review learning/*-candidates.md and .ai-task decision-review.md.

Knowledgebase patch candidate:
Review knowledge-patch-candidates.md; candidate only until approved.

Skill/tool update candidate:
Review skill-update-candidates.md and tool-update-candidates.md.

Needs approval:
Yes for activating any candidate blob/pack/skill/tool update.

Apply now or backlog:
Backlog unless user explicitly approves or the task requested setup/update work.

Safe to sync to codex-workflow:
Only sanitized learning docs, never raw recurring-failures.jsonl or .ai-task logs.

## Do Not Repeat
Concrete mistake:
Review root cause fields in error-ledger.md.

Prevention rule:
Run Knowledge Sufficiency Gate before medium/large/risky/unknown or external-library work.

Target skill/blob/pack/tool:
Use the repair target from decision-review.md or candidate files.
`;
const out = path.join(dir, "completion-report.md");
await fs.writeFile(out, md);
console.log(out);
