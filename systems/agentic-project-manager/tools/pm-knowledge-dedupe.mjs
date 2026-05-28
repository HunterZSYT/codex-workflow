#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { PM_ROOT } from "./pm-lib.mjs";

const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");

function arr(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (!value) return [];
  return String(value).split(",").map(x => x.trim()).filter(Boolean);
}

function terms(entry) {
  return new Set([
    entry.title,
    entry.capability,
    entry.capability_class,
    entry.owner_skill,
    entry.product_type,
    entry.pack_id,
    ...(arr(entry.aliases)),
    ...(arr(entry.trigger_terms)),
    ...(arr(entry.related_items))
  ].filter(Boolean).flatMap(x => String(x).toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) || []));
}

function overlap(a, b) {
  const ta = terms(a);
  const tb = terms(b);
  const common = [...ta].filter(t => tb.has(t) && t.length > 3);
  const score = common.length + (a.owner_skill && a.owner_skill === b.owner_skill ? 2 : 0) + (a.capability_class && a.capability_class === b.capability_class ? 2 : 0);
  return { score, common };
}

function recommendation(a, b, common) {
  if (a.capability_class === b.capability_class && a.owner_skill === b.owner_skill && common.length >= 3) return "cross-reference or merge if responsibilities are not distinct";
  if (a.status === "deprecated" || b.status === "deprecated") return "keep separate; deprecated item should point to replacement";
  return "keep separate but add related_items if frequently retrieved together";
}

const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
const pairs = [];
for (let i = 0; i < registry.length; i += 1) {
  for (let j = i + 1; j < registry.length; j += 1) {
    const a = registry[i];
    const b = registry[j];
    const o = overlap(a, b);
    if (o.score >= 5) pairs.push({ a, b, ...o, recommendation: recommendation(a, b, o.common) });
  }
}
pairs.sort((a, b) => b.score - a.score);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(pairs, null, 2));
} else if (pairs.length === 0) {
  console.log("No likely duplicate or overlap pairs found.");
} else {
  for (const pair of pairs.slice(0, 30)) {
    console.log([
      `- ${pair.a.id || pair.a.blob_id} <-> ${pair.b.id || pair.b.blob_id}`,
      `  score: ${pair.score}`,
      `  shared terms: ${pair.common.slice(0, 12).join(", ")}`,
      `  owner/capability: ${pair.a.owner_skill || "none"} / ${pair.a.capability_class || "unknown"}`,
      `  recommendation: ${pair.recommendation}`
    ].join("\n"));
  }
}
