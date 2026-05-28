#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { LEARNING_ROOT, arg, exists } from "./pm-lib.mjs";

const query = arg("query", arg("term", ""));
const limit = Number(arg("limit", "10"));

const files = [
  "error-patterns.md",
  "routing-lessons.md",
  "tool-failure-patterns.md",
  "verification-mistakes.md",
  "resolved-lessons.md",
  "user-feedback-patterns.md",
  "knowledge-patch-candidates.md"
];

function tokens(value) {
  return String(value || "").toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) || [];
}

function statusFor(chunk) {
  const status = chunk.match(/Status:\s*([^\n\r]+)/i)?.[1]?.trim();
  if (status) return status;
  if (/status:\s*active/i.test(chunk)) return "active";
  if (/status:\s*(proposed|candidate)/i.test(chunk)) return "proposed";
  return "active";
}

function targetFor(chunk) {
  return chunk.match(/(?:Target skill\/blob\/pack\/tool|Proposed target|Target):\s*([^\n\r]+)/i)?.[1]?.trim() || "";
}

if (!query) {
  console.error("Usage: pm-learning-search.mjs --query <text> [--limit 10]");
  process.exit(2);
}

const q = tokens(query);
const matches = [];
for (const name of files) {
  const filePath = path.join(LEARNING_ROOT, name);
  if (!(await exists(filePath))) continue;
  const text = await fs.readFile(filePath, "utf8");
  const chunks = text.split(/\n(?=## |\---|\d{4}-\d{2}-\d{2}|- Date:)/).filter(chunk => chunk.trim());
  for (const chunk of chunks) {
    const hay = chunk.toLowerCase();
    const score = q.reduce((n, token) => n + (hay.includes(token) ? 1 : 0), 0);
    if (!score) continue;
    const status = statusFor(chunk);
    if (name === "knowledge-patch-candidates.md" && !/^(approved|proposed|active)/i.test(status)) continue;
    matches.push({
      file: filePath,
      status,
      confidence: score >= Math.max(2, Math.ceil(q.length * 0.6)) ? "high" : "medium",
      target: targetFor(chunk),
      active: /^(active|approved)$/i.test(status),
      snippet: chunk.replace(/\s+/g, " ").trim().slice(0, 500),
      score
    });
  }
}

matches.sort((a, b) => b.score - a.score || a.file.localeCompare(b.file));
const out = matches.slice(0, limit);
if (process.argv.includes("--json")) {
  console.log(JSON.stringify(out, null, 2));
} else if (!out.length) {
  console.log(`No sanitized learning matches for: ${query}`);
  process.exit(1);
} else {
  for (const item of out) {
    console.log([
      `- ${path.basename(item.file)} (${item.status}, ${item.confidence})`,
      `  active: ${item.active ? "yes" : "no"}`,
      `  target: ${item.target || "none"}`,
      `  file: ${item.file}`,
      `  snippet: ${item.snippet}`
    ].join("\n"));
  }
}
