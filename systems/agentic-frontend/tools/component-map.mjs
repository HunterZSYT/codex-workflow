#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SCAN_DIRS = ["components", "src/components", "app/components", "components/ui", "components/layout", "components/sections", "src/ui", "ui", "layouts", "app", "pages"];
const EXT = new Set([".jsx", ".tsx", ".js", ".ts", ".vue", ".svelte"]);
async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }
async function walk(dir, acc = []) {
  let entries = [];
  try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return acc; }
  for (const entry of entries) {
    if (["node_modules", ".git", "dist", "build", ".next"].includes(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(p, acc);
    else if (EXT.has(path.extname(entry.name))) acc.push(p);
  }
  return acc;
}
function classify(file) {
  const n = path.basename(file).toLowerCase();
  const p = file.toLowerCase();
  if (p.includes("components/ui") || ["button", "input", "dialog", "card", "badge", "tabs", "accordion", "select"].some((x) => n.includes(x))) return "UI primitive";
  if (p.includes("layout") || ["header", "footer", "sidebar", "nav", "shell"].some((x) => n.includes(x))) return "Layout";
  if (p.includes("section") || ["hero", "features", "pricing", "testimonial", "faq", "cta"].some((x) => n.includes(x))) return "Section";
  return "Other";
}
function rel(p, root) { return path.relative(root, p).replaceAll("\\", "/"); }
async function main() {
  const root = process.cwd();
  const outDir = path.join(root, ".ai-task");
  await fs.mkdir(outDir, { recursive: true });
  const files = [];
  for (const dir of SCAN_DIRS) {
    const full = path.join(root, dir);
    if (await exists(full)) files.push(...await walk(full));
  }
  const unique = [...new Set(files)];
  const groups = {};
  for (const f of unique) {
    const c = classify(f);
    groups[c] ||= [];
    groups[c].push(f);
  }
  const baseCounts = {};
  for (const f of unique) {
    const base = path.basename(f, path.extname(f)).toLowerCase();
    baseCounts[base] = (baseCounts[base] || 0) + 1;
  }
  const duplicates = Object.entries(baseCounts).filter(([, count]) => count > 1);
  const shadcn = await exists(path.join(root, "components.json")) || unique.some((f) => rel(f, root).startsWith("components/ui/"));
  const md = `# Component Map\n\nGenerated: ${new Date().toISOString()}\nRoot: ${root}\n\n## Summary\n- Files scanned: ${unique.length}\n- shadcn likely present: ${shadcn ? "yes" : "no"}\n\n## Components By Type\n${Object.entries(groups).map(([group, list]) => `\n### ${group}\n${list.map((f) => `- ${rel(f, root)}`).join("\n")}`).join("\n") || "- No component files found"}\n\n## Possible Duplicates\n${duplicates.map(([name, count]) => `- ${name}: ${count} files`).join("\n") || "- None detected"}\n\n## Wrapper Opportunities\n- Prefer wrapping UI primitives into project-specific components before duplicating styling.\n- Check local Layout and Section components before creating new page structures.\n`;
  const out = path.join(outDir, "component-map.md");
  await fs.writeFile(out, md);
  console.log(out);
}
main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
