#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
const dir = path.join(process.cwd(), ".ai-task");
async function read(name) { try { return await fs.readFile(path.join(dir, name), "utf8"); } catch { return ""; } }
await fs.mkdir(dir, { recursive: true });
const ineff = await read("inefficiency-log.md");
const usage = await read("tool-skill-usage.md");
const recs = [];
if (/manual|repeat|again/i.test(ineff)) recs.push("Title: Automate repeated manual step\nObserved during: inefficiency log\nProblem: Repeated/manual workflow detected\nSuggested fix: consider script/tool update\nExpected benefit: fewer verification loops\nPriority: Medium\nStatus: proposed");
if (/Better tool\/skill needed:\s*\S/i.test(usage)) recs.push("Title: Review better tool/skill request\nObserved during: tool usage log\nProblem: current tool stack may be insufficient\nSuggested fix: update skill prompt or add script\nExpected benefit: better routing\nPriority: Medium\nStatus: proposed");
if (!recs.length) recs.push("Title: No concrete improvement found\nObserved during: review\nProblem: none detected heuristically\nSuggested fix: none\nExpected benefit: n/a\nPriority: Low\nStatus: noted");
const out = path.join(dir, "improvement-backlog.md");
await fs.appendFile(out, `\n\n## Automated Review ${new Date().toISOString()}\n\n${recs.join("\n\n")}\n`);
console.log(out);
