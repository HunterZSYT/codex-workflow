#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, LEARNING_ROOT, redact } from "./pm-lib.mjs";

const targetSkill = redact(arg("skill", arg("target", "unspecified")));
const reason = redact(arg("reason"));
const wording = redact(arg("wording"));
const examples = redact(arg("examples"));
const risk = redact(arg("risk", "Review for over-broad routing before applying."));

if (!reason && !wording) {
  console.error("Usage: node pm-suggest-skill-update.mjs --skill \"verification-gate-controller\" --reason \"...\" --wording \"...\"");
  process.exit(1);
}

await fs.mkdir(LEARNING_ROOT, { recursive: true });
const file = path.join(LEARNING_ROOT, "skill-update-candidates.md");
const entry = `\n## ${new Date().toISOString()}\nTarget: ${targetSkill}\nReason: ${reason}\nProposed wording: ${wording}\nExamples: ${examples}\nRisk of change: ${risk}\nStatus: proposed; requires review before applying\n`;
await fs.appendFile(file, entry);
console.log(JSON.stringify({ suggested: true, target: file, skill: targetSkill }, null, 2));
