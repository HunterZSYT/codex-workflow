#!/usr/bin/env node
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { PM_ROOT, arg, exists } from "./pm-lib.mjs";

const dbPath = path.join(PM_ROOT, ".retrieval", "knowledge-index.sqlite");
const id = arg("id");

if (!id) {
  console.error("Usage: pm-knowledge-related.mjs --id <item-id>");
  process.exit(2);
}

if (!(await exists(dbPath))) {
  console.error(`Knowledge retrieval index missing: ${dbPath}`);
  console.error("Run: node C:\\Users\\acer\\.codex\\agentic-project-manager\\tools\\pm-knowledge-index.mjs");
  process.exit(1);
}

const db = new DatabaseSync(dbPath, { readOnly: true });
const item = db.prepare("SELECT * FROM items WHERE id = ?").get(id);
if (!item) {
  console.log(`No indexed item found: ${id}`);
  db.close();
  process.exit(1);
}

const outgoing = db.prepare(`
  SELECT relation, target_id, target_path, notes
  FROM edges
  WHERE source_id = ?
  ORDER BY relation, target_id, target_path
`).all(id);
const incoming = db.prepare(`
  SELECT source_id, relation, target_path, notes
  FROM edges
  WHERE target_id = ?
  ORDER BY relation, source_id
`).all(id);

console.log([
  `${item.id} - ${item.title}`,
  `type: ${item.type}`,
  `owner skill: ${item.owner_skill || "none"}`,
  `status: ${item.status}`,
  `maturity: ${item.maturity}`,
  `source confidence: ${item.source_confidence || "unknown"}`,
  `artifact paths: ${item.artifact_paths || "none"}`,
  `apply command: ${item.apply_command || "none"}`,
  `verification: ${item.verification_method || "none"}`,
  `file: ${item.file_path}`,
  "",
  "Outgoing relationships:",
  ...(outgoing.length ? outgoing.map(r => `- ${r.relation}: ${r.target_id || r.target_path || r.notes}`) : ["- none"]),
  "",
  "Incoming relationships:",
  ...(incoming.length ? incoming.map(r => `- ${r.relation}: ${r.source_id}${r.target_path ? ` -> ${r.target_path}` : ""}${r.notes ? ` (${r.notes})` : ""}`) : ["- none"])
].join("\n"));
db.close();
