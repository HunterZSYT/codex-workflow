#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import process from "node:process";
import { spawnSync } from "node:child_process";

const ROOT = path.join(os.homedir(), ".codex", "agentic-frontend");
const TOOLS = path.join(ROOT, "tools");
function run(cmd, args = []) {
  const command = process.platform === "win32" && ["npm", "npx"].includes(cmd)
    ? ["cmd.exe", ["/d", "/s", "/c", `${cmd} ${args.join(" ")}`]]
    : [cmd, args];
  const r = spawnSync(command[0], command[1], { encoding: "utf8", shell: false });
  return { ok: r.status === 0, stdout: (r.stdout || "").trim(), stderr: (r.stderr || r.error?.message || "").trim(), status: r.status };
}
async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }
async function main() {
  await fs.mkdir(ROOT, { recursive: true });
  const node = run("node", ["--version"]);
  const npm = run("npm", ["--version"]);
  const deps = [];
  for (const dep of ["playwright", "@axe-core/playwright", "lighthouse"]) deps.push(`- ${dep}: ${(await exists(path.join(TOOLS, "node_modules", dep))) ? "installed" : "missing"}`);
  const chromium = run("node", ["-e", "import('playwright').then(async({chromium})=>{console.log(chromium.executablePath())}).catch(e=>{console.error(e.message);process.exit(1)})"]);
  const mcpCheck = run("node", [path.join(TOOLS, "mcp-status-check.mjs")]);
  const scripts = ["frontend-inspect.mjs", "accessibility-check.mjs", "performance-check.mjs", "project-capability-scan.mjs", "component-map.mjs", "mcp-status-check.mjs", "agentic-health-check.mjs"];
  const scriptStatuses = [];
  for (const s of scripts) {
    scriptStatuses.push(`- ${path.join(TOOLS, s)}: ${await exists(path.join(TOOLS, s)) ? "present" : "missing"}`);
  }
  const md = `# Agentic Frontend Tool Status\n\nGenerated: ${new Date().toISOString()}\n\n## Runtime\n- Node: ${node.ok ? node.stdout : `failed (${node.stderr})`}\n- npm: ${npm.ok ? npm.stdout : `failed (${npm.stderr})`}\n\n## Local Dependencies\n${deps.join("\n")}\n\n## Playwright Chromium\n- Status: ${chromium.ok ? "available" : "failed"}\n- Path/Error: ${chromium.ok ? chromium.stdout : chromium.stderr}\n\n## Codex Config\n- ~/.codex/config.toml: ${(await exists(path.join(os.homedir(), ".codex", "config.toml"))) ? "found" : "missing"}\n\n## MCP Status Check\n- Status: ${mcpCheck.ok ? "ran" : "failed"}\n- Output: ${mcpCheck.ok ? mcpCheck.stdout : mcpCheck.stderr}\n\n## Global Scripts\n${scriptStatuses.join("\n")}\n\n## Example Commands\n\`\`\`bash\nnode ~/.codex/agentic-frontend/tools/frontend-inspect.mjs --url http://127.0.0.1:3000 --preset iphone-14-pro-max --out .ai-task/qa\nnode ~/.codex/agentic-frontend/tools/accessibility-check.mjs --url http://127.0.0.1:3000 --preset desktop --out .ai-task/qa\nnode ~/.codex/agentic-frontend/tools/performance-check.mjs --url http://127.0.0.1:3000 --out .ai-task/qa\nnode ~/.codex/agentic-frontend/tools/project-capability-scan.mjs\nnode ~/.codex/agentic-frontend/tools/component-map.mjs\n\`\`\`\n`;
  const out = path.join(ROOT, "tool-status.md");
  await fs.writeFile(out, md);
  console.log(out);
}
main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
