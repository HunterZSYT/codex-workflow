#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, LEARNING_ROOT, categoryTargets, redact } from "./pm-lib.mjs";

const category = redact(arg("category", "error pattern"));
const lesson = redact(arg("lesson"));
const summary = redact(arg("summary"));
const target = arg("target", categoryTargets(category)[0]);
const approved = arg("approved", "false").toLowerCase() === "true";

if (!lesson && !summary) {
  console.error("Usage: node pm-promote-lesson.mjs --category \"weak verification\" --summary \"...\" --lesson \"...\" [--approved true]");
  process.exit(1);
}

const highSeverity = /safety|secret|destructive|production/i.test(category);
if (!approved && !highSeverity) {
  console.error("Refusing to promote without --approved true unless severity/category is high safety risk.");
  process.exit(2);
}

await fs.mkdir(LEARNING_ROOT, { recursive: true });
const file = path.join(LEARNING_ROOT, target);
const entry = `\n## ${new Date().toISOString()}\nPattern: ${summary}\nCategory: ${category}\nCause: ${redact(arg("cause"))}\nObserved examples: ${redact(arg("examples"))}\nRecommended response: ${lesson}\nStatus: proposed\n`;
await fs.appendFile(file, entry);
console.log(JSON.stringify({ promoted: true, target: file }, null, 2));
