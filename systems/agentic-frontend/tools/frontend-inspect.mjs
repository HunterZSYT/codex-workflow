#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const PRESETS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  tablet: { width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  "iphone-14-pro-max": { width: 430, height: 932, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  "iphone-se": { width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  "pixel-7": { width: 412, height: 915, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true }
};

function parseArgs(argv) {
  const args = { preset: "desktop", wait: "250", fullPage: "true" };
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key === "--help" || key === "-h") {
      console.log("Usage: node frontend-inspect.mjs --url <url> [--preset desktop|tablet|iphone-14-pro-max|iphone-se|pixel-7] [--out dir] [--selector css] [--click css] [--hover css] [--scroll y|x,y] [--wait ms] [--fullPage true|false]");
      process.exit(0);
    }
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

async function defaultOutDir(args) {
  if (args.out) return path.resolve(args.out);
  const cwd = process.cwd();
  try {
    const stat = await fs.stat(path.join(cwd, ".ai-task"));
    if (stat.isDirectory()) return path.join(cwd, ".ai-task", "qa");
  } catch {}
  return path.join(cwd, "ai-qa");
}

function parseScroll(value) {
  if (!value) return null;
  const parts = value.split(",").map((part) => Number(part.trim()));
  if (parts.length === 1 && Number.isFinite(parts[0])) return { x: 0, y: parts[0] };
  if (parts.length === 2 && parts.every(Number.isFinite)) return { x: parts[0], y: parts[1] };
  throw new Error("--scroll must be y or x,y");
}

function slug(input) {
  return String(input).replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 90) || "page";
}

async function pageMeasurements(page, selector) {
  return await page.evaluate((sel) => {
    const doc = document.documentElement;
    const all = Array.from(document.querySelectorAll("body *"));
    const overflowing = all.map((el) => {
      const rect = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), id: el.id || "", className: String(el.className || ""), left: rect.left, right: rect.right, width: rect.width };
    }).filter((item) => item.right > doc.clientWidth + 1 || item.left < -1).slice(0, 25);
    const data = {
      document: {
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
        clientHeight: doc.clientHeight,
        scrollHeight: doc.scrollHeight,
        horizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
        overflowAmount: Math.max(0, doc.scrollWidth - doc.clientWidth)
      },
      likelyOverflowingElements: overflowing,
      selector: null
    };
    if (sel) {
      const el = document.querySelector(sel);
      if (!el) data.selector = { selector: sel, found: false };
      else {
        const rect = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        data.selector = {
          selector: sel,
          found: true,
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left },
          computedStyle: {
            display: cs.display, position: cs.position, visibility: cs.visibility, opacity: cs.opacity,
            overflow: cs.overflow, overflowX: cs.overflowX, overflowY: cs.overflowY, zIndex: cs.zIndex,
            color: cs.color, backgroundColor: cs.backgroundColor, fontSize: cs.fontSize, lineHeight: cs.lineHeight,
            width: cs.width, height: cs.height, margin: cs.margin, padding: cs.padding
          }
        };
      }
    }
    return data;
  }, selector || null);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const preset = PRESETS[args.preset];
  const outDir = await defaultOutDir(args);
  await fs.mkdir(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const base = `${stamp}-${args.preset}-${slug(args.url)}`;
  const screenshotPath = path.join(outDir, `${base}.png`);
  const reportPath = path.join(outDir, `${base}.json`);
  const consoleMessages = [];
  const failedRequests = [];
  const badResponses = [];
  const actions = [];

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
    page.on("console", (msg) => { if (["warning", "error"].includes(msg.type())) consoleMessages.push({ type: msg.type(), text: msg.text(), location: msg.location() }); });
    page.on("requestfailed", (req) => failedRequests.push({ url: req.url(), method: req.method(), resourceType: req.resourceType(), failure: req.failure() }));
    page.on("response", (res) => { if (res.status() >= 400) badResponses.push({ url: res.url(), status: res.status(), statusText: res.statusText(), method: res.request().method(), resourceType: res.request().resourceType() }); });
    const response = await page.goto(args.url, { waitUntil: "networkidle", timeout: 30000 });
    if (args.hover) { await page.locator(args.hover).first().hover({ timeout: 5000 }); actions.push({ type: "hover", selector: args.hover }); }
    if (args.click) { await page.locator(args.click).first().click({ timeout: 5000 }); actions.push({ type: "click", selector: args.click }); }
    const scroll = parseScroll(args.scroll);
    if (scroll) { await page.evaluate(({ x, y }) => scrollTo(x, y), scroll); actions.push({ type: "scroll", ...scroll }); }
    await page.waitForTimeout(Number(args.wait));
    const measurements = await pageMeasurements(page, args.selector);
    await page.screenshot({ path: screenshotPath, fullPage: args.fullPage !== "false" });
    report = { inputUrl: args.url, finalUrl: page.url(), preset: args.preset, viewport: { width: preset.width, height: preset.height }, dpr: preset.deviceScaleFactor, mobile: preset.isMobile, touch: preset.hasTouch, screenshotPath, reportPath, response: response ? { status: response.status(), statusText: response.statusText() } : null, actions, ...measurements, consoleMessages, failedRequests, badResponses, timestamp: new Date().toISOString() };
  } finally {
    await browser.close();
  }
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ screenshotPath, reportPath, finalUrl: report.finalUrl, horizontalOverflow: report.document.horizontalOverflow, overflowAmount: report.document.overflowAmount, consoleMessages: consoleMessages.length, failedRequests: failedRequests.length, badResponses: badResponses.length }, null, 2));
}

main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
