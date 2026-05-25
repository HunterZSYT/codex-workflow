#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const PRESETS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  tablet: { width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  "iphone-14-pro-max": { width: 430, height: 932, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  "iphone-se": { width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  "pixel-7": { width: 412, height: 915, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true }
};

function parseArgs(argv) {
  const args = { preset: "desktop" };
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key === "--help" || key === "-h") { console.log("Usage: node accessibility-check.mjs --url <url> [--preset desktop] [--out dir] [--include css] [--exclude css]"); process.exit(0); }
    if (!key.startsWith("--")) throw new Error(`Unexpected argument: ${key}`);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${key}`);
    args[key.slice(2)] = value;
    i++;
  }
  if (!args.url) throw new Error("Missing --url");
  if (!PRESETS[args.preset]) throw new Error(`Unsupported preset: ${args.preset}`);
  return args;
}

async function defaultOut(args) {
  if (args.out) return path.resolve(args.out);
  return path.join(process.cwd(), "ai-qa");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const preset = PRESETS[args.preset];
  const outDir = await defaultOut(args);
  await fs.mkdir(outDir, { recursive: true });
  const reportPath = path.join(outDir, `${new Date().toISOString().replace(/[:.]/g, "-")}-${args.preset}-accessibility.json`);
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    console.error(`Playwright/Chromium is unavailable. Run: npm install && npx playwright install chromium\n${error.message}`);
    process.exit(2);
  }
  let report;
  try {
    const context = await browser.newContext({ viewport: { width: preset.width, height: preset.height }, deviceScaleFactor: preset.deviceScaleFactor, isMobile: preset.isMobile, hasTouch: preset.hasTouch });
    const page = await context.newPage();
    await page.goto(args.url, { waitUntil: "networkidle", timeout: 30000 });
    let builder = new AxeBuilder({ page });
    if (args.include) builder = builder.include(args.include);
    if (args.exclude) builder = builder.exclude(args.exclude);
    const results = await builder.analyze();
    report = {
      url: args.url,
      finalUrl: page.url(),
      preset: args.preset,
      viewport: preset,
      violationCount: results.violations.length,
      violations: results.violations,
      incomplete: results.incomplete || [],
      limitations: "Automated axe checks do not prove full accessibility. Manual keyboard/focus/semantic review may still be needed.",
      timestamp: new Date().toISOString()
    };
  } finally {
    await browser.close();
  }
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ reportPath, finalUrl: report.finalUrl, violationCount: report.violationCount, incompleteCount: report.incomplete.length }, null, 2));
}

main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
