#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, slug } from "./pm-lib.mjs";
const dir = path.join(process.cwd(), ".ai-task");
const task = arg("task", "completed-task");
const date = new Date().toISOString().slice(0, 10);
const dest = path.join(dir, "archive", `${date}-${slug(task)}`);
await fs.mkdir(dest, { recursive: true });
const files = ["current-roadmap.md","execution-ledger.md","verification-log.md","tool-skill-usage.md","inefficiency-log.md","improvement-backlog.md","completion-report.md","project-capabilities.md"];
for (const f of files) {
  const src = path.join(dir, f);
  try { await fs.rename(src, path.join(dest, f)); } catch {}
}
console.log(dest);
