#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }
async function readJson(p) { return JSON.parse(await fs.readFile(p, "utf8")); }
async function findFiles(root, names, maxDepth = 4, depth = 0, acc = []) {
  if (depth > maxDepth) return acc;
  let entries = [];
  try { entries = await fs.readdir(root, { withFileTypes: true }); } catch { return acc; }
  for (const entry of entries) {
    if (["node_modules", ".git", "dist", "build", ".next"].includes(entry.name)) continue;
    const p = path.join(root, entry.name);
    if (names.some((name) => entry.name === name || entry.name.match(name))) acc.push(p);
    if (entry.isDirectory()) await findFiles(p, names, maxDepth, depth + 1, acc);
  }
  return acc;
}
function hasDep(deps, names) { return names.some((name) => deps[name]); }
function rel(p, root) { return path.relative(root, p).replaceAll("\\", "/") || "."; }

async function main() {
  const root = process.cwd();
  const outDir = path.join(root, ".ai-task");
  await fs.mkdir(outDir, { recursive: true });
  const pkgPath = path.join(root, "package.json");
  const pkg = await exists(pkgPath) ? await readJson(pkgPath) : null;
  const deps = { ...(pkg?.dependencies || {}), ...(pkg?.devDependencies || {}) };
  const packageManager = await exists(path.join(root, "pnpm-lock.yaml")) ? "pnpm" : await exists(path.join(root, "yarn.lock")) ? "yarn" : await exists(path.join(root, "bun.lockb")) || await exists(path.join(root, "bun.lock")) ? "bun" : await exists(path.join(root, "package-lock.json")) ? "npm" : "unknown";
  const markers = await findFiles(root, [/^tailwind\.config\./, "components.json", /^playwright\.config\./, "AGENTS.md", /^mcp\.json$/, "settings.json"], 4);
  const projectType = pkg ? hasDep(deps, ["next"]) ? "Next.js" : hasDep(deps, ["vite"]) ? "Vite" : hasDep(deps, ["react"]) ? "React" : "Node/Web" : await exists(path.join(root, "index.html")) ? "Static HTML" : "unknown";
  const capabilities = {
    Tailwind: hasDep(deps, ["tailwindcss"]) || markers.some((p) => path.basename(p).startsWith("tailwind.config")),
    "shadcn/ui": await exists(path.join(root, "components.json")),
    Radix: Object.keys(deps).some((d) => d.startsWith("@radix-ui/")),
    "React Aria": Object.keys(deps).some((d) => d.startsWith("react-aria") || d.startsWith("@react-aria/")),
    "Motion/Framer Motion": hasDep(deps, ["motion", "framer-motion"]),
    GSAP: hasDep(deps, ["gsap"]),
    Lenis: Object.keys(deps).some((d) => d.toLowerCase().includes("lenis")),
    CVA: hasDep(deps, ["class-variance-authority"]),
    "tailwind-variants": hasDep(deps, ["tailwind-variants"]),
    Storybook: Object.keys(deps).some((d) => d.includes("storybook")),
    Playwright: hasDep(deps, ["@playwright/test", "playwright"]),
    "axe-core": Object.keys(deps).some((d) => d.includes("axe")),
    Lighthouse: hasDep(deps, ["lighthouse"]),
    Chromatic: hasDep(deps, ["chromatic"]),
    TanStack: Object.keys(deps).some((d) => d.startsWith("@tanstack/")),
    "React Hook Form": hasDep(deps, ["react-hook-form"]),
    Zod: hasDep(deps, ["zod"])
  };
  const mcpFiles = [
    ".codex/config.toml", ".cursor/mcp.json", ".cursor/settings.json", ".vscode/mcp.json", ".windsurf"
  ].filter((p) => false);
  for (const p of [".codex/config.toml", ".cursor/mcp.json", ".cursor/settings.json", ".vscode/mcp.json", ".windsurf"]) {
    if (await exists(path.join(root, p))) mcpFiles.push(p);
  }
  const md = `# Project Capabilities\n\nGenerated: ${new Date().toISOString()}\nRoot: ${root}\n\n## Project\n- Type: ${projectType}\n- Package manager: ${packageManager}\n\n## Package Scripts\n${pkg?.scripts ? Object.entries(pkg.scripts).map(([k, v]) => `- ${k}: \`${v}\``).join("\n") : "- No package.json scripts found"}\n\n## Detected Capabilities\n${Object.entries(capabilities).map(([k, v]) => `- ${k}: ${v ? "yes" : "no"}`).join("\n")}\n\n## Dependencies\n${Object.keys(deps).sort().map((d) => `- ${d}: ${deps[d]}`).join("\n") || "- None detected"}\n\n## Important Files\n${markers.map((p) => `- ${rel(p, root)}`).join("\n") || "- None detected"}\n\n## MCP/Agent Configs\n${mcpFiles.map((p) => `- ${p}`).join("\n") || "- None detected"}\n`;
  await fs.writeFile(path.join(outDir, "project-capabilities.md"), md);
  console.log(path.join(outDir, "project-capabilities.md"));
}
main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
