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
`;
const out = path.join(dir, "completion-report.md");
await fs.writeFile(out, md);
console.log(out);
