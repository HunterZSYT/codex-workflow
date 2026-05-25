#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { exists } from "./pm-lib.mjs";
const outDir = path.join(process.cwd(), ".ai-task");
await fs.mkdir(outDir, { recursive: true });
const front = path.join(os.homedir(), ".codex", "agentic-frontend", "tools");
const back = path.join(os.homedir(), ".codex", "agentic-backend-database", "tools");
const notes = [];
function runTool(label, file) {
  if (!file) return;
  const r = spawnSync("node", [file], { cwd: process.cwd(), encoding: "utf8" });
  notes.push(`- ${label}: ${r.status === 0 ? "ran" : `failed: ${(r.stderr || r.stdout).slice(0, 300)}`}`);
}
if (await exists(path.join(front, "project-capability-scan.mjs"))) runTool("frontend project-capability-scan", path.join(front, "project-capability-scan.mjs")); else notes.push("- frontend project-capability-scan: missing");
if (await exists(path.join(back, "project-capability-scan.mjs"))) runTool("backend project-capability-scan", path.join(back, "project-capability-scan.mjs")); else notes.push("- backend project-capability-scan: missing");
if (await exists(path.join(front, "component-map.mjs"))) runTool("frontend component-map", path.join(front, "component-map.mjs")); else notes.push("- frontend component-map: missing");
let existing = "";
try { existing = await fs.readFile(path.join(outDir, "project-capabilities.md"), "utf8"); } catch {}
await fs.writeFile(path.join(outDir, "project-capabilities.md"), `# Combined Project Capabilities\n\nGenerated: ${new Date().toISOString()}\n\n## Sync Results\n${notes.join("\n")}\n\n## Existing Frontend/Backend Output\n${existing}\n`);
console.log(path.join(outDir, "project-capabilities.md"));
