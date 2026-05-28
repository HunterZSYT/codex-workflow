#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { PM_ROOT, FRONTEND_ROOT, BACKEND_ROOT, SKILLS_ROOT, exists, slug } from "./pm-lib.mjs";

const registryPath = path.join(PM_ROOT, "knowledge", "knowledge-registry.json");
const retrievalDir = path.join(PM_ROOT, ".retrieval");
const dbPath = path.join(retrievalDir, "knowledge-index.sqlite");

const SYSTEM_ROOTS = [
  { namespace: "project_manager", root: PM_ROOT },
  { namespace: "frontend", root: FRONTEND_ROOT },
  { namespace: "backend", root: BACKEND_ROOT }
];

function arr(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (!value) return [];
  return String(value).split(",").map(x => x.trim()).filter(Boolean);
}

function field(text, label) {
  const rx = new RegExp(`^${label}:\\s*(.*)$`, "im");
  return text.match(rx)?.[1]?.trim() || "";
}

function titleFromMarkdown(text, fallback) {
  return text.match(/^#\s+(.+)$/m)?.[1]?.trim() || fallback;
}

function parseYamlLite(text) {
  const data = {};
  let current = "";
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const keyMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (keyMatch) {
      current = keyMatch[1];
      const value = keyMatch[2].trim();
      if (value === "") data[current] = [];
      else data[current] = value.replace(/^["']|["']$/g, "");
      continue;
    }
    const itemMatch = line.match(/^\s*-\s+(.*)$/);
    if (itemMatch && current) {
      if (!Array.isArray(data[current])) data[current] = data[current] ? [data[current]] : [];
      data[current].push(itemMatch[1].trim().replace(/^["']|["']$/g, ""));
    }
  }
  return data;
}

async function readMaybe(filePath) {
  try { return await fs.readFile(filePath, "utf8"); } catch { return ""; }
}

function normalizeRegistryEntry(entry) {
  const legacyId = entry.blob_id || entry.id || slug(entry.capability || entry.file_path || "item");
  const namespace = entry.namespace || inferNamespace(entry.owner_system, entry.file_path);
  const type = entry.type || entry.product_type || "blob";
  const capabilityClass = entry.capability_class || inferCapabilityClass(entry);
  const artifactPaths = arr(entry.artifact_paths);
  const applyCommands = arr(entry.apply_commands).concat(entry.apply_command ? [entry.apply_command] : []);
  return {
    id: entry.id || `${capabilityClass}.${slug(legacyId).replace(/-layout$/, "")}`,
    title: entry.title || titleFromBlobId(legacyId),
    namespace,
    type,
    product_type: entry.product_type || type,
    capability: entry.capability || legacyId,
    capability_class: capabilityClass,
    owner_system: entry.owner_system || "",
    owner_skill: entry.owner_skill || "",
    status: entry.status || "candidate",
    maturity: entry.maturity || inferMaturity(entry),
    approval_status: entry.approval_status || "",
    pack_id: entry.pack_id || "",
    pack_path: entry.pack_path || "",
    artifacts_count: Number(entry.artifacts_count ?? artifactPaths.length),
    aliases: arr(entry.aliases),
    trigger_terms: arr(entry.trigger_terms),
    external_libraries: arr(entry.external_libraries),
    docs_sources: arr(entry.docs_sources),
    source_confidence: entry.source_confidence || inferSourceConfidence(entry),
    related_items: arr(entry.related_items),
    artifact_paths: artifactPaths,
    apply_command: applyCommands.join("; "),
    apply_commands: applyCommands,
    verification_method: entry.verification_method || "",
    safe_to_sync: entry.safe_to_sync !== false,
    file_path: entry.file_path || "",
    last_verified: entry.last_verified || "",
    notes: entry.notes || ""
  };
}

function titleFromBlobId(id) {
  return String(id).split(/[-_]+/).filter(Boolean).map(w => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

function inferNamespace(ownerSystem = "", filePath = "") {
  const value = `${ownerSystem} ${filePath}`.toLowerCase();
  if (value.includes("agentic-frontend")) return "frontend";
  if (value.includes("agentic-backend-database")) return "backend";
  if (value.includes("agentic-project-manager")) return "project_manager";
  return "global";
}

function inferCapabilityClass(entry) {
  const fp = String(entry.file_path || "").toLowerCase();
  const owner = String(entry.owner_skill || "").toLowerCase();
  if (fp.includes("\\layout\\") || owner.includes("layout")) return "frontend.layout";
  if (fp.includes("\\motion\\") || owner.includes("motion")) return "frontend.motion";
  if (fp.includes("\\components\\") || owner.includes("component")) return "frontend.components";
  if (fp.includes("\\inspection\\") || fp.includes("\\verification\\")) return "frontend.inspection";
  if (fp.includes("\\typography\\") || owner.includes("typography")) return "frontend.typography";
  if (fp.includes("\\color\\") || owner.includes("color")) return "frontend.color";
  if (fp.includes("\\spacing\\") || owner.includes("spacing")) return "frontend.spacing";
  if (fp.includes("\\api\\")) return "backend.api";
  if (fp.includes("\\database\\")) return "backend.database";
  if (fp.includes("\\vps\\")) return "vps.webserver";
  if (fp.includes("\\routing\\")) return "project_manager.routing";
  if (fp.includes("\\capability-orchestration\\")) return "project_manager.routing";
  return "project_manager.retrieval";
}

function inferMaturity(entry) {
  if (entry.status === "deprecated") return "deprecated";
  if (arr(entry.artifact_paths).length > 0 || entry.apply_command) return "artifact_backed";
  if (entry.status === "active") return "researched_blob";
  return "candidate_blob";
}

function inferSourceConfidence(entry) {
  const docs = arr(entry.docs_sources).join(" ").toLowerCase();
  const verified = String(entry.last_verified || "").toLowerCase();
  if (entry.status === "stale") return "stale";
  if (docs.includes("http") || docs.includes("context7") || /^\d{4}-\d{2}-\d{2}/.test(verified)) return "sourced";
  if (entry.status === "candidate" || verified.includes("candidate")) return "needs-docs";
  return "internal";
}

async function collectRegistryItems() {
  const raw = await fs.readFile(registryPath, "utf8");
  const registry = JSON.parse(raw);
  const items = [];
  for (const entry of registry) {
    const item = normalizeRegistryEntry(entry);
    item.body = await readMaybe(item.file_path);
    item.body_preview = item.body.slice(0, 700).replace(/\s+/g, " ").trim();
    items.push(item);
  }
  return items;
}

async function collectSkillItems() {
  if (!(await exists(SKILLS_ROOT))) return [];
  const dirs = await fs.readdir(SKILLS_ROOT, { withFileTypes: true });
  const items = [];
  for (const dir of dirs.filter(d => d.isDirectory())) {
    const filePath = path.join(SKILLS_ROOT, dir.name, "SKILL.md");
    if (!(await exists(filePath))) continue;
    const body = await readMaybe(filePath);
    items.push({
      id: `skill.${dir.name}`,
      title: field(body, "name") || dir.name,
      namespace: "skill",
      type: "skill",
      capability: field(body, "description") || titleFromMarkdown(body, dir.name),
      capability_class: inferCapabilityClass({ owner_skill: dir.name, file_path: filePath }),
      owner_system: "",
      owner_skill: dir.name,
      status: "active",
      maturity: "specification",
      aliases: [dir.name],
      trigger_terms: [],
      external_libraries: [],
      docs_sources: [],
      source_confidence: "internal",
      related_items: [],
      artifact_paths: [],
      apply_command: "",
      verification_method: "",
      safe_to_sync: true,
      file_path: filePath,
      last_verified: "",
      notes: "",
      body,
      body_preview: body.slice(0, 700).replace(/\s+/g, " ").trim()
    });
  }
  return items;
}

async function collectAuxiliaryItems() {
  const items = [];
  for (const { namespace, root } of SYSTEM_ROOTS) {
    const specs = [
      { dir: "skill-prompts", type: "doc" },
      { dir: "templates", type: "template" },
      { dir: "tools", type: "script" },
      { dir: "knowledge", type: "doc" }
    ];
    for (const spec of specs) {
      const base = path.join(root, spec.dir);
      if (!(await exists(base))) continue;
      const files = await walk(base);
      for (const filePath of files) {
        const ext = path.extname(filePath).toLowerCase();
        if (![".md", ".mjs", ".js", ".sh", ".json"].includes(ext)) continue;
        if (filePath.endsWith("knowledge-registry.json")) continue;
        if (filePath.endsWith(".blob.md")) continue;
        const body = await readMaybe(filePath);
        const rel = path.relative(root, filePath).replaceAll("\\", "/");
        const itemId = `${namespace}.${spec.type}.${slug(rel)}`;
        items.push({
          id: itemId,
          title: titleFromMarkdown(body, path.basename(filePath)),
          namespace,
          type: spec.type,
          capability: titleFromMarkdown(body, path.basename(filePath)),
          capability_class: spec.dir === "tools" ? "project_manager.retrieval" : inferCapabilityClass({ file_path: filePath }),
          owner_system: namespace,
          owner_skill: "",
          status: "active",
          maturity: spec.type === "script" ? "artifact_backed" : "specification",
          aliases: [path.basename(filePath)],
          trigger_terms: [],
          external_libraries: [],
          docs_sources: [],
          source_confidence: "internal",
          related_items: [],
          artifact_paths: spec.type === "script" || spec.type === "template" ? [filePath] : [],
          apply_command: spec.type === "script" ? `node ${filePath}` : "",
          verification_method: "",
          safe_to_sync: true,
          file_path: filePath,
          last_verified: "",
          notes: "",
          body,
          body_preview: body.slice(0, 700).replace(/\s+/g, " ").trim()
        });
      }
    }
  }
  return items;
}

async function collectPackItems() {
  const items = [];
  for (const { namespace, root } of SYSTEM_ROOTS) {
    const packsRoot = path.join(root, "knowledge-packs");
    if (!(await exists(packsRoot))) continue;
    const dirs = await fs.readdir(packsRoot, { withFileTypes: true });
    for (const dir of dirs.filter(d => d.isDirectory())) {
      const packPath = path.join(packsRoot, dir.name);
      const packYamlPath = path.join(packPath, "pack.yaml");
      if (!(await exists(packYamlPath))) continue;
      const yaml = parseYamlLite(await readMaybe(packYamlPath));
      const files = await walk(packPath);
      const safeFiles = files.filter(filePath => [".md", ".css", ".ts", ".tsx", ".json", ".yaml", ".yml"].includes(path.extname(filePath).toLowerCase()));
      const bodyParts = [];
      for (const filePath of safeFiles) bodyParts.push(`\n\n# ${path.relative(packPath, filePath)}\n${await readMaybe(filePath)}`);
      const artifactFiles = safeFiles.filter(filePath => filePath.includes(`${path.sep}artifacts${path.sep}`));
      items.push({
        id: `pack.${yaml.id || dir.name}`,
        title: yaml.title || titleFromBlobId(dir.name),
        namespace: yaml.namespace || namespace,
        type: "capability_pack",
        product_type: "pack",
        capability: yaml.title || dir.name,
        capability_class: yaml.id ? yaml.id.split(".").slice(0, 2).join(".") : inferCapabilityClass({ file_path: packPath }),
        owner_system: yaml.owner_system || namespace,
        owner_skill: yaml.owner_skill || "",
        status: yaml.status || "candidate",
        maturity: yaml.maturity || "idea",
        approval_status: yaml.approval_status || "not_requested",
        pack_id: yaml.id || dir.name,
        pack_path: packPath,
        artifacts_count: artifactFiles.length,
        aliases: arr(yaml.aliases),
        trigger_terms: arr(yaml.trigger_terms),
        external_libraries: [],
        docs_sources: [],
        source_confidence: yaml.source_confidence || "low",
        related_items: arr(yaml.related_blobs).concat(arr(yaml.related_packs)),
        artifact_paths: arr(yaml.artifact_paths).concat(artifactFiles),
        apply_command: arr(yaml.apply_commands).join("; "),
        apply_commands: arr(yaml.apply_commands),
        verification_method: arr(yaml.verification_methods).join("; "),
        safe_to_sync: String(yaml.safe_to_sync ?? "true") !== "false",
        file_path: packYamlPath,
        last_verified: yaml.last_verified || "",
        notes: "",
        body: bodyParts.join("\n"),
        body_preview: bodyParts.join(" ").slice(0, 700).replace(/\s+/g, " ").trim()
      });
    }
  }
  return items;
}

async function walk(root) {
  const out = [];
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".retrieval", ".git", ".ai-task", ".codegraph", ".understand-anything"].includes(entry.name)) continue;
      out.push(...await walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function insertItem(db, item) {
  const insert = db.prepare(`INSERT INTO items (
    id,title,namespace,type,capability,capability_class,owner_system,owner_skill,status,maturity,
    source_confidence,file_path,safe_to_sync,artifact_paths,apply_command,verification_method,body_preview,
    product_type,pack_id,pack_path,artifacts_count,approval_status
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  insert.run(
    item.id, item.title, item.namespace, item.type, item.capability, item.capability_class,
    item.owner_system, item.owner_skill, item.status, item.maturity, item.source_confidence,
    item.file_path, item.safe_to_sync ? 1 : 0, arr(item.artifact_paths).join("; "),
    item.apply_command, item.verification_method, item.body_preview, item.product_type || item.type,
    item.pack_id || "", item.pack_path || "", Number(item.artifacts_count || arr(item.artifact_paths).length),
    item.approval_status || ""
  );
  const rowid = db.prepare("SELECT last_insert_rowid() AS rowid").get().rowid;
  db.prepare(`INSERT INTO item_fts (
    rowid,title,aliases,trigger_terms,capability,capability_class,owner_skill,external_libraries,docs_sources,body
  ) VALUES (?,?,?,?,?,?,?,?,?,?)`).run(
    rowid, item.title, arr(item.aliases).join(" "), arr(item.trigger_terms).join(" "),
    item.capability, item.capability_class, item.owner_skill, arr(item.external_libraries).join(" "),
    arr(item.docs_sources).join(" "), item.body || ""
  );
}

function insertEdges(db, item, allIds) {
  const edge = db.prepare("INSERT INTO edges (source_id, relation, target_id, target_path, notes) VALUES (?,?,?,?,?)");
  if (item.owner_skill) edge.run(item.id, "owned_by_skill", `skill.${item.owner_skill}`, "", "");
  if (item.pack_id && item.id !== item.pack_id && item.id !== `pack.${item.pack_id}`) edge.run(item.id, "related_to", item.pack_id, "", "");
  for (const p of arr(item.artifact_paths)) edge.run(item.id, "has_artifact", "", p, "");
  for (const rel of arr(item.related_items)) edge.run(item.id, "related_to", allIds.has(rel) ? rel : "", "", rel);
  for (const doc of arr(item.docs_sources)) edge.run(item.id, "requires_docs", "", doc, "");
  if (item.verification_method) edge.run(item.id, "verifies_with", "", "", item.verification_method);
  if (item.safe_to_sync) edge.run(item.id, "syncs_to_repo", "", "C:\\Users\\acer\\codex-workflow", "");
}

await fs.mkdir(retrievalDir, { recursive: true });
if (await exists(dbPath)) await fs.rm(dbPath, { force: true });

const items = [
  ...await collectRegistryItems(),
  ...await collectSkillItems(),
  ...await collectAuxiliaryItems(),
  ...await collectPackItems()
];
const uniqueItems = [...new Map(items.map(item => [item.id, item])).values()];
const allIds = new Set(uniqueItems.map(item => item.id));

const db = new DatabaseSync(dbPath);
db.exec(`
  PRAGMA journal_mode = DELETE;
  CREATE TABLE items (
    id TEXT PRIMARY KEY,
    title TEXT,
    namespace TEXT,
    type TEXT,
    capability TEXT,
    capability_class TEXT,
    owner_system TEXT,
    owner_skill TEXT,
    status TEXT,
    maturity TEXT,
    source_confidence TEXT,
    file_path TEXT,
    safe_to_sync INTEGER,
    artifact_paths TEXT,
    apply_command TEXT,
    verification_method TEXT,
    body_preview TEXT
    ,
    product_type TEXT,
    pack_id TEXT,
    pack_path TEXT,
    artifacts_count INTEGER,
    approval_status TEXT
  );
  CREATE VIRTUAL TABLE item_fts USING fts5(
    title,
    aliases,
    trigger_terms,
    capability,
    capability_class,
    owner_skill,
    external_libraries,
    docs_sources,
    body,
    tokenize = 'porter unicode61'
  );
  CREATE TABLE edges (
    source_id TEXT,
    relation TEXT,
    target_id TEXT,
    target_path TEXT,
    notes TEXT
  );
  CREATE INDEX edges_source_idx ON edges(source_id);
  CREATE INDEX edges_target_idx ON edges(target_id);
`);

db.exec("BEGIN");
for (const item of uniqueItems) insertItem(db, item);
for (const item of uniqueItems) insertEdges(db, item, allIds);
db.exec("COMMIT");
db.close();

const report = [
  "# Knowledge Retrieval Index Report",
  "",
  `Generated: ${new Date().toISOString()}`,
  `Index path: ${dbPath}`,
  `Items indexed: ${uniqueItems.length}`,
  `Registry items: ${items.filter(x => x.type === "blob").length}`,
  `Packs indexed: ${uniqueItems.filter(x => x.type === "capability_pack").length}`,
  `Skills indexed: ${items.filter(x => x.type === "skill").length}`,
  `Local only: yes`,
  ""
].join("\n");
await fs.writeFile(path.join(retrievalDir, "last-index-report.md"), report, "utf8");
console.log(report);
