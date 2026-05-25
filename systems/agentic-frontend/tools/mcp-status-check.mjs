#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import process from "node:process";

const ROOT = path.join(os.homedir(), ".codex", "agentic-frontend");
const TARGETS = [
  { name: "figma", manual: "Remote Figma MCP may require Figma OAuth. Desktop alternative requires Figma Desktop -> Dev Mode -> Enable desktop MCP server.", verify: "Restart Codex and inspect MCP tools; for desktop verify Figma local server at 127.0.0.1:3845/mcp." },
  { name: "shadcn", manual: "No auth needed for public registry. Private registries require project-level components.json/env setup.", verify: "Restart Codex and check shadcn MCP tools." },
  { name: "playwright", manual: "No auth. Browser binaries may install on first use.", verify: "Restart Codex and check Playwright MCP tools." },
  { name: "chrome-devtools", manual: "No auth for isolated browser. Existing logged-in browser debugging requires explicit permission/remote debugging setup.", verify: "Restart Codex and check Chrome DevTools MCP tools." },
  { name: "context7", manual: "API key is recommended for higher rate limits but not hardcoded.", verify: "Restart Codex and check Context7 docs tools." },
  { name: "serena", manual: "Install uv/uvx first, then add the official Serena Codex MCP command.", verify: "Run uvx --version, add Serena config, then restart Codex." },
  { name: "storybook", manual: "Project-dependent. Project must install @storybook/addon-mcp and run Storybook, typically at 127.0.0.1:6006/mcp.", verify: "Run Storybook in a project and open /mcp." },
  { name: "magic-ui", manual: "Optional. Official setup is IDE-specific; no Codex-safe global entry was added.", verify: "Install with Magic UI CLI for a target IDE if needed." },
  { name: "21st", manual: "Token/service-dependent. No fake API key was added.", verify: "Configure only after obtaining a real 21st.dev API key and official Codex-compatible instructions." }
];
async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }
async function read(p) { try { return await fs.readFile(p, "utf8"); } catch { return ""; } }
function redact(text) { return text.replace(/(api[_-]?key|token|secret|authorization|password)(["'\s:=]+)([^"'\s,\]}]+)/gi, "$1$2[REDACTED]"); }
function detect(name, texts) {
  const hay = texts.join("\n").toLowerCase();
  if (name === "chrome-devtools") return hay.includes("chrome-devtools");
  if (name === "magic-ui") return hay.includes("magicui") || hay.includes("magic-ui") || hay.includes("magicuidesign");
  if (name === "21st") return hay.includes("21st") || hay.includes("@21st-dev");
  return hay.includes(name);
}
async function main() {
  await fs.mkdir(ROOT, { recursive: true });
  const files = [
    path.join(os.homedir(), ".codex", "config.toml"),
    path.join(process.cwd(), ".cursor", "mcp.json"),
    path.join(process.cwd(), ".cursor", "settings.json"),
    path.join(process.cwd(), ".vscode", "mcp.json"),
    path.join(process.cwd(), ".codex", "config.toml")
  ];
  const windsurf = path.join(process.cwd(), ".windsurf");
  const existing = [];
  for (const f of files) if (await exists(f)) existing.push(f);
  if (await exists(windsurf)) existing.push(windsurf);
  const texts = [];
  for (const f of existing) texts.push(redact(await read(f)));
  const rows = TARGETS.map((target) => {
    const name = target.name;
    const found = detect(name, texts);
    let status = found ? "configured/documented" : "not detected";
    if (name === "serena" && !found) status = "placeholder; uv/uvx required";
    if (name === "storybook" && found) status = "project-dependent; Storybook must be running";
    if (name === "figma" && found) status = "configured; auth/desktop enable may be required";
    if (name === "magic-ui" || name === "21st") status = found ? "configured/documented" : "skipped/manual placeholder";
    return `| ${name} | ${status} | ${target.manual} | ${target.verify} |`;
  }).join("\n");
  const md = `# MCP Status\n\nGenerated: ${new Date().toISOString()}\n\n## Inspected Config Locations\n${existing.map((f) => `- ${f}`).join("\n") || "- None found"}\n\n## Status\n| MCP | Status | Manual steps | Verification |\n| --- | --- | --- | --- |\n${rows}\n\n## Notes\n- Tokens/secrets are not printed by this report.\n- Configured or documented MCP entries still require live verification after restarting Codex.\n- Figma may require browser OAuth for remote MCP or Figma Desktop Dev Mode MCP enabled manually.\n- Serena requires uv/uvx before enabling the Codex MCP entry.\n`;
  const out = path.join(ROOT, "mcp-status.md");
  await fs.writeFile(out, md);
  console.log(out);
}
main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
