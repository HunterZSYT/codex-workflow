#!/usr/bin/env node
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { PM_ROOT, arg, exists } from "./pm-lib.mjs";

const dbPath = path.join(PM_ROOT, ".retrieval", "knowledge-index.sqlite");
const query = arg("query") || arg("term") || "";
const limit = Number(arg("limit", "10"));

function tokens(value) {
  return String(value || "").toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) || [];
}

function ftsQuery(value) {
  const parts = tokens(value).filter(t => t.length > 1).map(t => `"${t.replaceAll('"', '""')}"`);
  if (parts.length === 0) return "";
  return parts.join(" OR ");
}

function maturityRecommendation(item) {
  const artifactCount = Number(item.artifacts_count || 0);
  if (item.type === "capability_pack" && item.status === "active" && item.approval_status === "approved" && artifactCount > 0) {
    return "approved active pack; use artifacts with task-fit verification";
  }
  if (item.type === "capability_pack" && item.approval_status !== "approved") {
    return "pack is not approved; use as candidate planning material only";
  }
  if (item.status === "candidate" || item.maturity === "candidate_blob") {
    return "candidate only; do not treat as reusable implementation until promoted or artifact-backed";
  }
  if (!item.artifact_paths && !item.apply_command && (item.type === "blob" || item.type === "capability_pack")) {
    return "guidance/spec only; no reusable artifact indexed";
  }
  return "usable as indexed; verify task fit before applying";
}

if (!query) {
  console.error("Usage: pm-knowledge-search.mjs --query <search text> [--limit 10]");
  process.exit(2);
}

if (!(await exists(dbPath))) {
  console.error(`Knowledge retrieval index missing: ${dbPath}`);
  console.error("Run: node C:\\Users\\acer\\.codex\\agentic-project-manager\\tools\\pm-knowledge-index.mjs");
  process.exit(1);
}

const match = ftsQuery(query);
if (!match) {
  console.error("Search query has no indexable terms.");
  process.exit(2);
}

const db = new DatabaseSync(dbPath, { readOnly: true });
const rows = db.prepare(`
  SELECT
    items.*,
    bm25(item_fts, 8.0, 5.0, 4.0, 5.0, 3.0, 3.0, 2.0, 1.0, 0.5) AS score,
    snippet(item_fts, 8, '[', ']', ' ... ', 24) AS snippet
  FROM item_fts
  JOIN items ON items.rowid = item_fts.rowid
  WHERE item_fts MATCH ?
  ORDER BY score ASC
  LIMIT ?
`).all(match, limit);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(rows, null, 2));
  db.close();
  process.exit(rows.length ? 0 : 1);
}

if (rows.length === 0) {
  console.log(`No ranked knowledge results for: ${query}`);
  db.close();
  process.exit(1);
}

let rank = 0;
for (const row of rows) {
  rank += 1;
  const related = db.prepare(`
    SELECT relation, target_id, target_path, notes
    FROM edges
    WHERE source_id = ?
    ORDER BY relation, target_id, target_path
    LIMIT 8
  `).all(row.id);
  console.log([
    `${rank}. ${row.id} - ${row.title}`,
    `   type: ${row.type}`,
    `   product_type: ${row.product_type || row.type}`,
    `   owner_skill: ${row.owner_skill || "none"}`,
    `   status: ${row.status}`,
    `   maturity: ${row.maturity}`,
    `   approval_status: ${row.approval_status || "none"}`,
    `   source_confidence: ${row.source_confidence || "unknown"}`,
    `   artifacts: ${Number(row.artifacts_count || 0) || row.artifact_paths || row.apply_command ? (row.artifacts_count || "yes") : "none"}`,
    `   apply_commands: ${row.apply_command || "none"}`,
    `   file: ${row.file_path}`,
    `   snippet: ${row.snippet || row.body_preview || ""}`,
    `   related: ${related.map(r => `${r.relation}:${r.target_id || r.target_path || r.notes}`).filter(Boolean).join("; ") || "none"}`,
    `   recommendation: ${maturityRecommendation(row)}`
  ].join("\n"));
}
db.close();
