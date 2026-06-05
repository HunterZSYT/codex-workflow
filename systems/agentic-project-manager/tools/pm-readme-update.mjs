#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const HOME = os.homedir();
const PM_ROOT = path.join(HOME, ".codex", "agentic-project-manager");
const FRONTEND_ROOT = path.join(HOME, ".codex", "agentic-frontend");
const BACKEND_ROOT = path.join(HOME, ".codex", "agentic-backend-database");
const SKILLS_ROOT = path.join(HOME, ".codex", "skills");
const KNOWLEDGE_ROOT = path.join(PM_ROOT, "knowledge");

const LOCAL_SYSTEMS = [
  { name: "agentic-frontend", root: FRONTEND_ROOT, label: "Frontend" },
  { name: "agentic-backend-database", root: BACKEND_ROOT, label: "Backend / Database / VPS" },
  { name: "agentic-project-manager", root: PM_ROOT, label: "Project Manager" }
];

const REQUIRED_PREREQS = [
  "Windows 10/11 or compatible PowerShell environment",
  "Git",
  "Node.js/npm",
  "Codex CLI / Codex environment",
  "PowerShell script execution permission",
  "GitHub access to HunterZSYT/codex-workflow"
];

const OPTIONAL_PREREQS = [
  "VS Code",
  "Python if a skill/tool requires Python validation or scripts",
  "Docker if backend/VPS tooling needs containers",
  "uv/uvx if Serena is used",
  "rsync/jq/psql/mysql/sqlite/mongosh/redis-cli if database tasks need them",
  "Playwright/Chrome/Chrome DevTools for frontend inspection",
  "Figma auth if Figma MCP is used",
  "Supabase auth if Supabase MCP is used",
  "SSH client for VPS work"
];

const NEVER_COMMIT = [
  "auth.json",
  "raw config.toml",
  ".env and .env.*",
  "SSH keys and private keys",
  "database URLs",
  "MCP credentials",
  "cookies and tokens",
  "generated indexes and databases",
  "logs",
  "screenshots",
  ".ai-task folders",
  "node_modules",
  "caches and raw local state"
];

const LOCAL_ONLY = [
  ".git",
  ".ai-task",
  ".retrieval",
  ".codegraph",
  ".understand-anything",
  "node_modules",
  "learning/events",
  "qa",
  "*.log",
  "*.png",
  "*.jpg",
  "*.jpeg",
  "*.webp",
  "*.gif",
  "*.sqlite",
  "*.sqlite3",
  "*.db",
  "*.dump",
  "*.sql",
  "*.bak",
  "*.backup",
  "*.pem",
  "*.key",
  ".env"
];

const SENSITIVE_NAME_RX = /(^|[\\/])(auth\.json|config\.toml|\.env(?:\..*)?|id_rsa|id_ed25519|.*\.(?:pem|key|ppk|sqlite|sqlite3|db|log|png|jpg|jpeg|webp|gif|bak|backup|sql|dump))$/i;
const SKIP_DIRS = new Set([".git", "node_modules", ".ai-task", ".retrieval", ".codegraph", ".understand-anything"]);

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function arg(name, fallback = "") {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readText(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

async function readJson(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return null;
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function walk(root, filter = () => true, acc = []) {
  if (!(await exists(root))) return acc;
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) await walk(full, filter, acc);
      continue;
    }
    if (entry.isFile() && filter(full)) acc.push(full);
  }
  return acc;
}

function rel(root, filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}

function linesList(items) {
  return items.length ? items.map(item => `- ${item}`).join("\n") : "- None detected.";
}

function mdTable(headers, rows) {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.length
    ? rows.map(row => `| ${row.map(cell => String(cell ?? "").replaceAll("\n", " ").replaceAll("|", "\\|")).join(" | ")} |`).join("\n")
    : `| ${headers.map(() => "None detected").join(" | ")} |`;
  return `${head}\n${sep}\n${body}`;
}

function headingCoverage(text) {
  return [...text.matchAll(/^#{1,3}\s+(.+)$/gm)].map(m => m[1].trim());
}

function titleFromMd(text, fallback) {
  return text.match(/^#\s+(.+)$/m)?.[1]?.trim() || fallback;
}

function parseSkillFrontmatter(text, fallback) {
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const block = fm?.[1] || "";
  const name = block.match(/^name:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "") || fallback;
  const description = block.match(/^description:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "") || "";
  return { name, description };
}

function parsePackStatus(text) {
  return text.match(/^status:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "") || "unknown";
}

function parseMcpNames(text) {
  const names = new Set();
  for (const match of text.matchAll(/^\s*#?\s*\[mcp_servers\.([A-Za-z0-9_.-]+)\]/gm)) {
    names.add(match[1]);
  }
  return [...names].sort();
}

function parseMcpMentions(text) {
  const names = new Set();
  const known = ["context7", "serena", "codegraph", "playwright", "chrome-devtools", "github", "figma", "supabase", "postgres"];
  const lower = text.toLowerCase();
  for (const name of known) if (lower.includes(name)) names.add(name);
  return [...names].sort();
}

function classifyScript(name) {
  const lower = name.toLowerCase();
  if (["sync-from-local.ps1", "auto-sync-once.ps1", "register-auto-sync-task.ps1", "run-auto-sync-hidden.vbs", "unregister-auto-sync-task.ps1"].includes(lower)) {
    return "primary-only";
  }
  if (["restore-to-local.ps1", "health-check.ps1", "validate-export.ps1", "redact-scan.ps1"].includes(lower)) {
    return "secondary-safe";
  }
  return "review-before-use";
}

function scriptPurpose(name) {
  const lower = name.toLowerCase();
  if (lower === "sync-from-local.ps1") return "Export sanitized local systems into codex-workflow.";
  if (lower === "auto-sync-once.ps1") return "Run one primary sync, validation, redaction scan, commit, and push cycle when safe.";
  if (lower === "register-auto-sync-task.ps1") return "Register the primary machine scheduled auto-sync task.";
  if (lower === "unregister-auto-sync-task.ps1") return "Remove the scheduled auto-sync task.";
  if (lower === "run-auto-sync-hidden.vbs") return "Hidden scheduled-task launcher for primary auto-sync.";
  if (lower === "restore-to-local.ps1") return "Restore exported workflow files to the local Codex directories.";
  if (lower === "validate-export.ps1") return "Validate exported files and expected repo structure.";
  if (lower === "redact-scan.ps1") return "Scan export for secrets and unsafe files before commit.";
  if (lower === "health-check.ps1") return "Run a basic repo health check.";
  if (lower === "log-user-response.ps1") return "Append sanitized user response ledger entries.";
  return "Review script content before use.";
}

async function collectSkills(root) {
  const files = await walk(root, file => path.basename(file).toLowerCase() === "skill.md");
  const skills = [];
  for (const file of files) {
    const text = await readText(file);
    const parsed = parseSkillFrontmatter(text, path.basename(path.dirname(file)));
    const category = rel(root, file).split("/")[0] || "root";
    skills.push({ ...parsed, category, file: rel(root, file) });
  }
  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

async function collectTools(root) {
  const files = await walk(root, file => /[\\/](tools)[\\/].+\.(mjs|js|sh|ps1)$/i.test(file));
  return files.map(file => ({ file: rel(root, file), name: path.basename(file) })).sort((a, b) => a.file.localeCompare(b.file));
}

async function collectKnowledgePacks(root) {
  const files = await walk(root, file => path.basename(file).toLowerCase() === "pack.yaml" && file.toLowerCase().includes(`${path.sep}knowledge-packs${path.sep}`.toLowerCase()));
  const packs = [];
  for (const file of files) {
    const text = await readText(file);
    packs.push({
      path: rel(root, file),
      id: text.match(/^id:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "") || path.basename(path.dirname(file)),
      status: parsePackStatus(text)
    });
  }
  packs.sort((a, b) => a.id.localeCompare(b.id));
  return packs;
}

async function collectSystem(root, repoRoot) {
  const readme = await readText(path.join(root, "README.md"));
  const packageJson = await readJson(path.join(root, "tools", "package.json"));
  return {
    name: path.basename(root),
    root,
    exportedPath: repoRoot ? rel(repoRoot, root) : "",
    readmeTitle: titleFromMd(readme, path.basename(root)),
    toolCount: (await collectTools(root)).length,
    tools: await collectTools(root),
    packCount: (await collectKnowledgePacks(root)).length,
    packs: await collectKnowledgePacks(root),
    dependencies: packageJson ? Object.keys({ ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) }).sort() : []
  };
}

async function scan(repoRoot) {
  const readmePath = path.join(repoRoot, "README.md");
  const docsRoot = path.join(repoRoot, "docs");
  const scriptsRoot = path.join(repoRoot, "scripts");
  const manifest = await readJson(path.join(repoRoot, "manifests", "export-manifest.json"));
  const syncSummary = await readJson(path.join(repoRoot, "manifests", "last-sync-summary.json"));
  const configTemplate = await readText(path.join(repoRoot, "codex", "config.template.toml"));
  const repoReadme = await readText(readmePath);
  const restoreGuide = await readText(path.join(docsRoot, "RESTORE_GUIDE.md"));
  const mcpSetup = await readText(path.join(docsRoot, "MCP_SETUP.md"));
  const docFiles = await walk(docsRoot, file => file.toLowerCase().endsWith(".md"));
  const repoFiles = await walk(repoRoot);
  const sensitiveFindings = repoFiles.filter(file => SENSITIVE_NAME_RX.test(file)).map(file => rel(repoRoot, file)).sort();
  const scripts = (await walk(scriptsRoot, file => /\.(ps1|sh|mjs|vbs)$/i.test(file))).map(file => {
    const name = path.basename(file);
    return { name, file: rel(repoRoot, file), classification: classifyScript(name), purpose: scriptPurpose(name) };
  }).sort((a, b) => a.name.localeCompare(b.name));
  const exportedSystems = [];
  for (const dir of await fs.readdir(path.join(repoRoot, "systems"), { withFileTypes: true }).catch(() => [])) {
    if (dir.isDirectory()) exportedSystems.push(await collectSystem(path.join(repoRoot, "systems", dir.name), repoRoot));
  }
  exportedSystems.sort((a, b) => a.name.localeCompare(b.name));
  const localSystems = [];
  for (const system of LOCAL_SYSTEMS) {
    if (await exists(system.root)) {
      localSystems.push({ ...system, ...(await collectSystem(system.root, "")) });
    }
  }
  const repoSkills = await collectSkills(path.join(repoRoot, "skills"));
  const globalSkills = await collectSkills(SKILLS_ROOT);
  const localTools = [];
  for (const system of localSystems) localTools.push(...system.tools.map(tool => ({ system: system.name, ...tool })));
  const repoPacks = [];
  for (const system of exportedSystems) repoPacks.push(...system.packs.map(pack => ({ system: system.name, ...pack })));
  const mcpNames = new Set(parseMcpNames(configTemplate));
  const systemDocFiles = [
    ...(await walk(path.join(repoRoot, "systems"), file => file.toLowerCase().endsWith(".md"))),
    ...(await walk(PM_ROOT, file => file.toLowerCase().endsWith(".md"))),
    ...(await walk(FRONTEND_ROOT, file => file.toLowerCase().endsWith(".md"))),
    ...(await walk(BACKEND_ROOT, file => file.toLowerCase().endsWith(".md")))
  ];
  for (const file of systemDocFiles) {
    for (const name of parseMcpMentions(await readText(file))) mcpNames.add(name);
  }
  const packageDeps = new Set();
  for (const system of [...exportedSystems, ...localSystems]) for (const dep of system.dependencies) packageDeps.add(dep);
  return {
    repoRoot,
    scannedAt: new Date().toISOString(),
    filesScanned: repoFiles.length + systemDocFiles.length,
    readmeCoverage: headingCoverage(repoReadme),
    restoreCoverage: headingCoverage(restoreGuide),
    mcpCoverage: headingCoverage(mcpSetup),
    docFiles: docFiles.map(file => rel(repoRoot, file)).sort(),
    manifest,
    syncSummary,
    exportedSystems,
    localSystems,
    repoSkills,
    globalSkills,
    localTools: localTools.sort((a, b) => `${a.system}/${a.file}`.localeCompare(`${b.system}/${b.file}`)),
    scripts,
    repoPacks,
    mcpNames: [...mcpNames].sort(),
    packageDeps: [...packageDeps].sort(),
    sensitiveFindings,
    localOnly: [...new Set([...(manifest?.excludedFilePatterns || []), ...LOCAL_ONLY])].sort(),
    requiredPrereqs: REQUIRED_PREREQS,
    optionalPrereqs: OPTIONAL_PREREQS,
    unknownPrereqs: ["Python availability for skill validation scripts", "Docker availability for backend/VPS tasks", "uv/uvx availability for Serena", "Database CLIs required by active project work"],
    manualAuth: ["Codex login/auth", "GitHub auth", "Figma auth when Figma MCP is used", "Supabase/Postgres/database credentials when used", "SSH keys/config for VPS work", "MCP credentials configured outside Git"],
    primaryOnlyScripts: scripts.filter(s => s.classification === "primary-only"),
    secondarySafeScripts: scripts.filter(s => s.classification === "secondary-safe"),
    reviewScripts: scripts.filter(s => s.classification === "review-before-use")
  };
}

function readmeDoc(data) {
  return `# Codex Workflow

This repository is a sanitized Codex Workflow command center for backup, migration, review, and restore.

It is a source for restoring workflow assets on another machine. It is not a secrets repo and must not contain real auth state, private keys, raw config, database URLs, tokens, cookies, generated indexes, logs, screenshots, caches, or raw local state.

## Source-of-truth model

This repository is one-way by default.

Primary PC:

- owns the live local Codex setup
- runs \`sync-from-local.ps1\`
- runs validation and redaction checks
- commits and pushes sanitized workflow updates

Secondary/new PC:

- clones or pulls this repo
- runs \`restore-to-local.ps1\`
- configures auth, MCP, SSH, database, and other secrets manually
- does not push changes back to this repo
- does not enable auto-sync
- keeps local experiments separate

Warning: do not run sync, auto-sync, or push from a restored machine unless explicitly promoting that machine to the new primary workflow machine.

Other PCs can create their own project repos, forks, branches, or local experiments, but they must not write back to \`HunterZSYT/codex-workflow\` by default.

## What this repo contains

- \`AGENTS.md\`
- \`systems/agentic-frontend\`
- \`systems/agentic-backend-database\`
- \`systems/agentic-project-manager\`
- \`skills/\`
- \`codex/config.template.toml\`
- \`docs/\`
- \`scripts/\`
- \`manifests/\`

Detected exported systems:

${linesList(data.exportedSystems.map(s => `${s.name} (${s.toolCount} tools, ${s.packCount} knowledge packs)`))}

Detected skill groups:

${linesList([...new Set(data.repoSkills.map(s => s.category))].sort())}

## What is not stored

${linesList(NEVER_COMMIT)}

## New PC prerequisites

Required:

${linesList(data.requiredPrereqs)}

Recommended or optional:

${linesList(data.optionalPrereqs.map(item => `${item} - verify manually when needed`))}

Detected local npm dependencies:

${linesList(data.packageDeps.length ? data.packageDeps : ["None detected"])}

## Restore on another PC

1. Install required prerequisites.
2. Clone the repo:
   \`\`\`powershell
   git clone https://github.com/HunterZSYT/codex-workflow.git
   \`\`\`
3. Review \`docs/SECURITY_POLICY.md\` and the one-way source-of-truth model.
4. Run restore:
   \`\`\`powershell
   powershell -ExecutionPolicy Bypass -File scripts\\restore-to-local.ps1
   \`\`\`
5. Install local tool dependencies if restore does not do it.
6. Configure Codex auth manually.
7. Create the live Codex \`config.toml\` from \`codex/config.template.toml\` and add credentials outside Git.
8. Configure MCP credentials manually.
9. Configure GitHub, Figma, Supabase, SSH, and database credentials manually only when needed.
10. Run health checks.
11. Rebuild knowledge indexes if needed.
12. Run validation and redaction scan.

## Primary PC sync workflow

PRIMARY MACHINE ONLY:

\`\`\`powershell
powershell -ExecutionPolicy Bypass -File scripts\\sync-from-local.ps1
powershell -ExecutionPolicy Bypass -File scripts\\validate-export.ps1
powershell -ExecutionPolicy Bypass -File scripts\\redact-scan.ps1
powershell -ExecutionPolicy Bypass -File scripts\\auto-sync-once.ps1
\`\`\`

Only the primary PC should commit and push sanitized workflow changes to this repo.

## Secondary machine rules

Allowed:

- \`git clone\`
- \`git pull\`
- \`restore-to-local.ps1\`
- local auth setup
- local verification
- project work in separate repos

Not allowed by default:

- \`sync-from-local.ps1\`
- \`auto-sync-once.ps1\`
- \`register-auto-sync-task.ps1\`
- committing or pushing changes to \`codex-workflow\`
- modifying exported workflow assets and pushing upstream

## Auto-sync

Only the primary PC should register auto-sync.

Never enable auto-sync on secondary machines. Only one primary auto-sync machine should exist at a time.

## Updating README and migration docs

Use the global \`readme-update-migration-guide\` skill.

\`\`\`powershell
node C:\\Users\\acer\\.codex\\agentic-project-manager\\tools\\pm-readme-update.mjs --repo "C:\\Users\\acer\\codex-workflow" --dry-run
node C:\\Users\\acer\\.codex\\agentic-project-manager\\tools\\pm-readme-update.mjs --repo "C:\\Users\\acer\\codex-workflow" --write
powershell -ExecutionPolicy Bypass -File scripts\\validate-export.ps1
powershell -ExecutionPolicy Bypass -File scripts\\redact-scan.ps1
\`\`\`

After write, review the diff. Commit and push only from the primary PC after validation and redaction scan pass.

## Troubleshooting

- PowerShell execution policy: run commands with \`-ExecutionPolicy Bypass\` for the current process.
- Missing Node/npm: install Node.js and verify with \`node --version\` and \`npm --version\`.
- Restore path differences: review scripts before restore if the Windows username or Codex path differs.
- Missing MCP credentials: configure live credentials manually outside Git, then restart Codex.
- Missing SSH config: create keys and SSH config manually; never restore private keys from this repo.
- Missing optional CLIs: install only the CLIs needed for the current project or MCP.
- Redaction scan failure: do not commit or push until the finding is removed or explicitly approved as safe.
- Git auth failure: re-authenticate GitHub locally.
- Accidental secondary sync: stop immediately, do not push, inspect the diff, and decide whether the machine is being explicitly promoted to primary.
`;
}

function restoreGuideDoc(data) {
  return `# Restore Guide

This guide is for restoring \`codex-workflow\` on a secondary or new machine. The default rule is restore-only: the machine consumes this repo and does not sync or push back.

Strong warning: do not run \`sync-from-local.ps1\`, \`auto-sync-once.ps1\`, \`register-auto-sync-task.ps1\`, or push to \`HunterZSYT/codex-workflow\` from a secondary machine unless the user explicitly promotes that machine to primary.

## New machine checklist

${linesList(data.requiredPrereqs)}

Optional tools to verify only when needed:

${linesList(data.optionalPrereqs)}

## Clone path recommendation

Clone to a normal user-owned development path. On this machine the source repo lives at:

\`\`\`text
C:\\Users\\acer\\codex-workflow
\`\`\`

If the target Windows username differs, review restore paths before running scripts.

## Restore command

From the repo root:

\`\`\`powershell
powershell -ExecutionPolicy Bypass -File scripts\\restore-to-local.ps1
\`\`\`

## What restore copies

The restore flow is based on the exported systems and allowlist in \`manifests/export-manifest.json\`.

Detected sources:

${linesList((data.manifest?.sources || []).map(s => `${s.destination} from ${s.source}`))}

Expected restored assets include exported system docs, skill prompts, tools, safe policies, knowledge markdown, knowledge-pack metadata, global skills, templates, and safe config templates.

## What restore does not restore

${linesList(NEVER_COMMIT)}

## Manual auth checklist

${linesList(data.manualAuth)}

## MCP setup checklist

Detected MCP references:

${linesList(data.mcpNames)}

1. Copy relevant template entries from \`codex/config.template.toml\` into the live Codex config.
2. Add credentials outside Git.
3. Restart Codex.
4. Verify each MCP by using the relevant tool or connector in a low-risk read-only check.

## Health checks

\`\`\`powershell
powershell -ExecutionPolicy Bypass -File scripts\\health-check.ps1
powershell -ExecutionPolicy Bypass -File scripts\\validate-export.ps1
powershell -ExecutionPolicy Bypass -File scripts\\redact-scan.ps1
node C:\\Users\\acer\\.codex\\agentic-project-manager\\tools\\project-manager-health-check.mjs
\`\`\`

## Post-restore knowledge index rebuild

Run after restore if Project Manager retrieval is stale or missing:

\`\`\`powershell
node C:\\Users\\acer\\.codex\\agentic-project-manager\\tools\\pm-knowledge-index.mjs
\`\`\`

## Confirm skills are visible

Check that global skill folders exist under:

\`\`\`text
C:\\Users\\<user>\\.codex\\skills
\`\`\`

Detected global skill count on the scanned primary machine: ${data.globalSkills.length}

## Confirm systems are restored

Expected systems:

${linesList(data.exportedSystems.map(s => `systems/${s.name}`))}

After restore, verify matching local folders under \`C:\\Users\\<user>\\.codex\\\`.

## Different Windows username or path

If the target machine username is not \`acer\`, treat every path in docs as an example. Prefer scripts that derive paths from the user profile. Review any hardcoded absolute path before running.

## Missing optional tools

Install optional tools only when a task needs them. Do not install dependencies globally just to satisfy the restore guide.

## Rollback and backup notes

Before overwriting an existing local Codex setup, back up the current local folders or review the restore script's backup behavior. If restore produces an unexpected diff, stop and inspect before running any sync command.
`;
}

function checklistDoc() {
  return `# Machine Setup Checklist

Default flow: secondary/new machines are restore-only.

## A. Secondary/new machine setup

- Install required prerequisites: Windows/PowerShell, Git, Node.js/npm, Codex environment, GitHub access.
- Clone \`https://github.com/HunterZSYT/codex-workflow\`.
- Review \`docs/SECURITY_POLICY.md\` and this checklist.
- Run \`powershell -ExecutionPolicy Bypass -File scripts\\restore-to-local.ps1\`.
- Configure Codex auth manually.
- Configure MCPs manually from \`codex/config.template.toml\`.
- Configure SSH/VPS access only if needed.
- Configure database credentials only if needed.
- Run health checks.
- Rebuild the Project Manager knowledge index if needed.
- Verify skills and systems are present.
- Do not sync or push back to \`codex-workflow\`.

## B. Primary machine only

- Run \`sync-from-local.ps1\`.
- Run \`validate-export.ps1\`.
- Run \`redact-scan.ps1\`.
- Run \`auto-sync-once.ps1\` only on the primary PC.
- Register auto-sync only on the primary PC.
- Run \`pm-readme-update.mjs\` to refresh README and migration docs.
- Commit and push sanitized workflow exports only after validation and redaction scan pass.

## C. Never do on secondary unless promoted

- Do not run \`sync-from-local.ps1\`.
- Do not run \`auto-sync-once.ps1\`.
- Do not run \`register-auto-sync-task.ps1\`.
- Do not push to \`codex-workflow\`.
- Do not enable scheduled sync.
- Do not overwrite exported workflow assets upstream from local experiments.
`;
}

function promoteDoc() {
  return `# Promote Machine To Primary

Use this only when intentionally moving primary ownership of \`codex-workflow\` to another machine.

Strong warning: never have two primary machines auto-syncing to \`codex-workflow\` at the same time.

## Checklist

1. Confirm the old primary is no longer syncing.
2. Pull the latest \`codex-workflow\`.
3. Restore locally with \`restore-to-local.ps1\`.
4. Configure Codex auth, MCP credentials, SSH, GitHub, Figma, Supabase, and database credentials manually.
5. Run health checks.
6. Run README updater dry-run:
   \`\`\`powershell
   node C:\\Users\\acer\\.codex\\agentic-project-manager\\tools\\pm-readme-update.mjs --repo "C:\\Users\\acer\\codex-workflow" --dry-run
   \`\`\`
7. Run \`sync-from-local.ps1\` only after explicit approval.
8. Run \`validate-export.ps1\`.
9. Run \`redact-scan.ps1\`.
10. Review \`git diff\`.
11. Commit and push only if the diff is safe.
12. Register auto-sync only after a successful manual sync and redaction scan.

## Approval gate

Promotion changes the write owner for the source-of-truth repo. Do not infer promotion from a normal restore request.
`;
}

function mcpSetupDoc(data) {
  const rows = data.mcpNames.map(name => {
    const relevance = name.includes("figma") || name.includes("playwright") || name.includes("chrome") ? "Frontend" :
      name.includes("postgres") || name.includes("supabase") ? "Backend/database" :
      name.includes("github") || name.includes("context7") || name.includes("serena") || name.includes("codegraph") ? "Project Manager / code intelligence" : "Optional";
    return [name, relevance, "Optional unless a task requires it", "Configure manually outside Git"];
  });
  return `# MCP Setup

MCP configuration in this repo is template-only. Use \`codex/config.template.toml\` as a starting point, then configure live credentials manually outside Git.

Never commit real tokens, passwords, database URLs, private keys, cookies, \`auth.json\`, or raw live \`config.toml\`.

## Detected MCP references

${mdTable(["MCP", "Relevant area", "Required?", "Auth/setup"], rows)}

## Safe to commit

- Commented config examples
- Placeholder-only templates
- Setup notes without credentials
- Public package names and commands

## Never commit

${linesList(NEVER_COMMIT)}

## Manual auth needed

${linesList(data.manualAuth)}

## Verify after Codex restart

1. Restart Codex after editing the live config.
2. Use a low-risk read-only probe for each MCP.
3. For Figma, verify auth before write access.
4. For GitHub, verify repo read access before write operations.
5. For database MCPs, verify against local/dev credentials first.
6. For browser/devtools MCPs, open a harmless local target first.

## Optional by default

All MCPs are optional unless a task explicitly needs them. Missing optional MCPs should be reported as manual setup items, not guessed as installed.
`;
}

function inventoryDoc(data) {
  const systems = data.exportedSystems.map(s => [s.name, s.toolCount, s.packCount, s.dependencies.join(", ") || "None detected"]);
  const scripts = data.scripts.map(s => [s.name, s.classification, s.purpose]);
  const packStatus = Object.entries(data.repoPacks.reduce((acc, pack) => {
    acc[pack.status] = (acc[pack.status] || 0) + 1;
    return acc;
  }, {})).map(([status, count]) => `${status}: ${count}`);
  return `# System Inventory

Generated from scan at ${data.scannedAt}.

## Exported systems

${mdTable(["System", "Tools", "Knowledge packs", "NPM dependencies"], systems)}

## Skills

- Exported repo skills detected: ${data.repoSkills.length}
- Global local skills detected: ${data.globalSkills.length}

Skill categories:

${linesList([...new Set(data.globalSkills.map(s => s.category))].sort())}

## Knowledge packs

- Exported knowledge packs detected: ${data.repoPacks.length}
- Status summary: ${packStatus.join(", ") || "None detected"}

## Tools by system

${mdTable(["System", "Tool"], data.localTools.map(t => [t.system, t.file]))}

## Scripts

${mdTable(["Script", "Classification", "Purpose"], scripts)}

## MCP references

${linesList(data.mcpNames)}

## Local-only/generated folders and files

${linesList(data.localOnly)}

## Sync allowlist

${linesList(data.manifest?.allowedFilePatterns || [])}

## Sync exclusions

${linesList(data.manifest?.excludedFilePatterns || [])}

## Last sync summary

- Timestamp: ${data.syncSummary?.timestamp || "unknown"}
- Files copied: ${data.syncSummary?.filesCopied ?? "unknown"}
- Warnings: ${(data.syncSummary?.warnings || []).length ? data.syncSummary.warnings.join("; ") : "none"}

## Primary-only scripts

${linesList(data.primaryOnlyScripts.map(s => `${s.name} - ${s.purpose}`))}

## Secondary-safe scripts

${linesList(data.secondarySafeScripts.map(s => `${s.name} - ${s.purpose}`))}
`;
}

function reportDoc(data) {
  return `# README Update Report

Generated: ${data.scannedAt}

## Files scanned

- Total files scanned: ${data.filesScanned}
- Docs scanned: ${data.docFiles.length}

## README sections updated

${linesList(["What this repo is", "Source-of-truth model", "What this repo contains", "What is not stored", "New PC prerequisites", "Restore on another PC", "Primary PC sync workflow", "Secondary machine rules", "Auto-sync", "Updating README and migration docs", "Troubleshooting"])}

## Docs updated

${linesList(["README.md", "docs/RESTORE_GUIDE.md", "docs/MCP_SETUP.md", "docs/MACHINE_SETUP_CHECKLIST.md", "docs/PROMOTE_MACHINE_TO_PRIMARY.md", "docs/SYSTEM_INVENTORY.md"])}

## Detected prerequisites

${linesList(data.requiredPrereqs)}

## Unknown prerequisites needing manual confirmation

${linesList(data.unknownPrereqs)}

## Primary-only scripts

${linesList(data.primaryOnlyScripts.map(s => s.name))}

## Secondary-safe scripts

${linesList(data.secondarySafeScripts.map(s => s.name))}

## Warnings

${linesList([
  "Secondary machines must not sync, auto-sync, or push to codex-workflow by default.",
  data.reviewScripts.length ? `Review-before-use scripts detected: ${data.reviewScripts.map(s => s.name).join(", ")}` : "",
  data.sensitiveFindings.length ? "Redaction-sensitive filenames were found in scanned paths; review before commit." : ""
].filter(Boolean))}

## Redaction-sensitive findings

${linesList(data.sensitiveFindings)}
`;
}

function auditDoc(data) {
  return `# README Migration Documentation Audit

Generated: ${data.scannedAt}

## Current README coverage

${linesList(data.readmeCoverage)}

## Current restore guide coverage

${linesList(data.restoreCoverage)}

## Current MCP setup coverage

${linesList(data.mcpCoverage)}

## Missing migration/setup details found before update

${linesList(["Explicit one-way source-of-truth model", "Primary-only versus secondary-safe scripts", "Detailed restore-only machine checklist", "Promote-machine-to-primary checklist", "Generated system inventory", "MCP verification guidance", "Unknown prerequisite list"])}

## Exported systems found

${linesList(data.exportedSystems.map(s => `${s.name}: ${s.toolCount} tools, ${s.packCount} knowledge packs`))}

## Skills found

- Exported repo skills: ${data.repoSkills.length}
- Global local skills: ${data.globalSkills.length}

## Tools/scripts found

- Local system tools: ${data.localTools.length}
- Repo scripts: ${data.scripts.length}

## Knowledge packs found

${linesList(data.repoPacks.map(p => `${p.id} (${p.status})`))}

## MCP/config references found

${linesList(data.mcpNames)}

## Manual auth requirements found

${linesList(data.manualAuth)}

## Prerequisites detected

${linesList(data.requiredPrereqs)}

## Optional tools detected or recommended for manual verification

${linesList(data.optionalPrereqs)}

## Local-only/generated files that must not sync

${linesList(data.localOnly)}

## One-way migration risks

${linesList(["Restored secondary machine accidentally running sync scripts", "Secondary machine registering auto-sync", "Two primary machines pushing to the same repo", "Secrets copied into template/config docs", "Generated indexes/logs/caches committed after restore"])}

## Docs that need creation or update

${linesList(["README.md", "docs/RESTORE_GUIDE.md", "docs/MCP_SETUP.md", "docs/MACHINE_SETUP_CHECKLIST.md", "docs/PROMOTE_MACHINE_TO_PRIMARY.md", "docs/SYSTEM_INVENTORY.md"])}
`;
}

async function writeDocs(data) {
  await ensureDir(path.join(data.repoRoot, "docs"));
  await ensureDir(KNOWLEDGE_ROOT);
  const exportedPmKnowledgeRoot = path.join(data.repoRoot, "systems", "agentic-project-manager", "knowledge");
  const writeKnowledgeCopy = async (name, content) => {
    await fs.writeFile(path.join(KNOWLEDGE_ROOT, name), content, "utf8");
    if (await exists(exportedPmKnowledgeRoot)) {
      await ensureDir(exportedPmKnowledgeRoot);
      await fs.writeFile(path.join(exportedPmKnowledgeRoot, name), content, "utf8");
    }
  };
  await fs.writeFile(path.join(data.repoRoot, "README.md"), readmeDoc(data), "utf8");
  await fs.writeFile(path.join(data.repoRoot, "docs", "RESTORE_GUIDE.md"), restoreGuideDoc(data), "utf8");
  await fs.writeFile(path.join(data.repoRoot, "docs", "MACHINE_SETUP_CHECKLIST.md"), checklistDoc(data), "utf8");
  await fs.writeFile(path.join(data.repoRoot, "docs", "PROMOTE_MACHINE_TO_PRIMARY.md"), promoteDoc(data), "utf8");
  await fs.writeFile(path.join(data.repoRoot, "docs", "MCP_SETUP.md"), mcpSetupDoc(data), "utf8");
  await fs.writeFile(path.join(data.repoRoot, "docs", "SYSTEM_INVENTORY.md"), inventoryDoc(data), "utf8");
  await writeKnowledgeCopy("readme-update-report.md", reportDoc(data));
  await writeKnowledgeCopy("readme-migration-doc-audit.md", auditDoc(data));
}

async function checkDocs(data) {
  const readme = await readText(path.join(data.repoRoot, "README.md"));
  const required = ["one-way by default", "PRIMARY MACHINE ONLY", "Secondary machine rules", "readme-update-migration-guide"];
  const missing = required.filter(text => !readme.includes(text));
  if (missing.length) {
    console.error(`README check failed. Missing: ${missing.join(", ")}`);
    process.exitCode = 1;
  } else {
    console.log("README check passed.");
  }
}

async function main() {
  const repoRoot = path.resolve(arg("repo", process.cwd()));
  if (!(await exists(repoRoot))) {
    console.error(`Repo path does not exist: ${repoRoot}`);
    process.exit(1);
  }
  const data = await scan(repoRoot);
  const shouldWrite = hasFlag("write");
  const shouldCheck = hasFlag("check");
  const summary = {
    repo: data.repoRoot,
    filesScanned: data.filesScanned,
    exportedSystems: data.exportedSystems.map(s => s.name),
    globalSkillCount: data.globalSkills.length,
    repoSkillCount: data.repoSkills.length,
    toolCount: data.localTools.length,
    mcpReferences: data.mcpNames,
    primaryOnlyScripts: data.primaryOnlyScripts.map(s => s.name),
    secondarySafeScripts: data.secondarySafeScripts.map(s => s.name),
    redactionSensitiveFindings: data.sensitiveFindings
  };
  if (shouldWrite) {
    await writeDocs(data);
    console.log("Docs written.");
  } else {
    console.log("Dry run. No files written.");
  }
  console.log(JSON.stringify(summary, null, 2));
  if (hasFlag("report")) console.log(`\n${reportDoc(data)}`);
  if (shouldCheck) await checkDocs(data);
}

main().catch(error => {
  console.error(error?.stack || String(error));
  process.exit(1);
});
