#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
const file = path.join(process.cwd(), ".ai-task", "current-roadmap.md");
let text = "";
try { text = await fs.readFile(file, "utf8"); } catch { console.error("No .ai-task/current-roadmap.md found."); process.exit(1); }
const next = text.split(/\r?\n/).find(l => /^\s*-\s*\[\s*\]/.test(l));
console.log(JSON.stringify({
  nextPacket: next ? next.replace(/^\s*-\s*\[\s*\]\s*/, "") : null,
  suggestedSkillTool: "Use roadmap Relevant Skills / Tools section.",
  expectedVerification: "Use roadmap Verification Plan section.",
  warning: /approval|required|destructive|database|server/i.test(text) ? "Risk markers present; do not execute risky writes without approval." : "No risk marker detected."
}, null, 2));
