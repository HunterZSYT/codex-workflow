#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import lighthouse from "lighthouse";
import { chromium } from "playwright";

function parseArgs(argv) {
  const args = { preset: "desktop" };
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key === "--help" || key === "-h") { console.log("Usage: node performance-check.mjs --url <url> [--out dir] [--preset desktop|mobile]"); process.exit(0); }
    if (!key.startsWith("--")) throw new Error(`Unexpected argument: ${key}`);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${key}`);
    args[key.slice(2)] = value;
    i++;
  }
  if (!args.url) throw new Error("Missing --url");
  return args;
}

function pickPort() {
  return 9300 + Math.floor(Math.random() * 500);
}

function score(category) {
  return category?.score == null ? null : Math.round(category.score * 100);
}

function metric(audits, id) {
  return audits[id]?.displayValue || audits[id]?.numericValue || null;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outDir = path.resolve(args.out || path.join(process.cwd(), "ai-qa"));
  await fs.mkdir(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(outDir, `${stamp}-lighthouse.json`);
  const htmlPath = path.join(outDir, `${stamp}-lighthouse.html`);
  const mdPath = path.join(outDir, `${stamp}-lighthouse-summary.md`);
  const port = pickPort();
  const chromePath = chromium.executablePath();
  const chrome = spawn(chromePath, [`--remote-debugging-port=${port}`, "--headless=new", "--no-first-run", "--no-default-browser-check", `--user-data-dir=${path.join(outDir, `.chrome-${stamp}`)}`], { stdio: "ignore" });
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const result = await lighthouse(args.url, { port, output: ["json", "html"], logLevel: "error", formFactor: args.preset === "mobile" ? "mobile" : "desktop", screenEmulation: args.preset === "mobile" ? undefined : { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false } });
    if (!result?.lhr) throw new Error("Lighthouse did not return a report");
    const [jsonReport, htmlReport] = result.report;
    await fs.writeFile(jsonPath, jsonReport);
    await fs.writeFile(htmlPath, htmlReport);
    const lhr = result.lhr;
    const opportunities = Object.values(lhr.audits).filter((audit) => audit.details?.type === "opportunity" && audit.score !== 1).slice(0, 8).map((audit) => `- ${audit.title}: ${audit.displayValue || "review"}`).join("\n") || "- None reported";
    const summary = `# Lighthouse Summary\n\nURL: ${args.url}\nFinal URL: ${lhr.finalDisplayedUrl || lhr.finalUrl}\n\n- Performance: ${score(lhr.categories.performance)}\n- Accessibility: ${score(lhr.categories.accessibility)}\n- Best Practices: ${score(lhr.categories["best-practices"])}\n- SEO: ${score(lhr.categories.seo)}\n- LCP: ${metric(lhr.audits, "largest-contentful-paint")}\n- CLS: ${metric(lhr.audits, "cumulative-layout-shift")}\n- TBT: ${metric(lhr.audits, "total-blocking-time")}\n\n## Top Opportunities\n${opportunities}\n`;
    await fs.writeFile(mdPath, summary);
    console.log(JSON.stringify({ jsonPath, htmlPath, mdPath, performance: score(lhr.categories.performance), accessibility: score(lhr.categories.accessibility), bestPractices: score(lhr.categories["best-practices"]), seo: score(lhr.categories.seo) }, null, 2));
  } catch (error) {
    console.error(`Lighthouse could not run: ${error.message}`);
    process.exitCode = 1;
  } finally {
    chrome.kill();
  }
}

main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
