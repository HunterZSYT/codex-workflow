#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const PRESETS = {
  desktop: {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
  tablet: {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
  "iphone-14-pro-max": {
    width: 430,
    height: 932,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },
  "iphone-se": {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
  "pixel-7": {
    width: 412,
    height: 915,
    deviceScaleFactor: 2.625,
    isMobile: true,
    hasTouch: true,
  },
};

function usage(exitCode = 0) {
  const presets = Object.keys(PRESETS).join(", ");
  console.log(`Usage:
  node scripts/frontend-inspect.mjs --url <url> --preset <preset> --out <dir> [options]

Required:
  --url <url>             URL to inspect
  --preset <preset>       One of: ${presets}
  --out <dir>             Output directory

Options:
  --selector <css>        Measure selector rect and computed styles
  --click <css>           Click selector before screenshot
  --hover <css>           Hover selector before screenshot
  --scroll <y|x,y>        Scroll before screenshot
  --wait <ms>             Wait after load/interactions (default: 250)
  --help                  Show this help

Examples:
  node scripts/frontend-inspect.mjs --url "http://127.0.0.1:3000" --preset desktop --out "_qa"
  node scripts/frontend-inspect.mjs --url "http://127.0.0.1:3000" --preset iphone-14-pro-max --out "_qa"
  node scripts/frontend-inspect.mjs --url "http://127.0.0.1:3000" --preset iphone-se --click ".menu-button" --selector ".mobile-menu" --out "_qa"
`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = {
    wait: 250,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") usage(0);
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${token}`);
    }
    i += 1;
    args[key] = value;
  }

  if (!args.url) throw new Error("Missing --url");
  if (!args.preset) throw new Error("Missing --preset");
  if (!args.out) throw new Error("Missing --out");
  if (!PRESETS[args.preset]) {
    throw new Error(`Unsupported preset "${args.preset}". Use one of: ${Object.keys(PRESETS).join(", ")}`);
  }
  args.wait = Number.parseInt(String(args.wait), 10);
  if (!Number.isFinite(args.wait) || args.wait < 0) {
    throw new Error("--wait must be a non-negative integer");
  }
  return args;
}

async function importPlaywright() {
  try {
    return await import("playwright");
  } catch (error) {
    const nodePaths = (process.env.NODE_PATH || "")
      .split(path.delimiter)
      .map((entry) => entry.trim())
      .filter(Boolean);

    const candidates = [];
    for (const nodePath of nodePaths) {
      candidates.push(path.join(nodePath, "playwright", "index.js"));
      candidates.push(path.join(nodePath, ".pnpm", "node_modules", "playwright", "index.js"));
      try {
        const pnpmDir = path.join(nodePath, ".pnpm");
        const entries = await fs.readdir(pnpmDir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory() && entry.name.startsWith("playwright@")) {
            candidates.push(path.join(pnpmDir, entry.name, "node_modules", "playwright", "index.js"));
          }
        }
      } catch {
        // This runtime may not use pnpm layout.
      }
    }

    for (const candidate of candidates) {
      try {
        await fs.access(candidate);
        return await import(pathToFileURL(candidate).href);
      } catch {
        // Try the next known package layout.
      }
    }

    throw error;
  }
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "inspect";
}

function parseScroll(scroll) {
  if (!scroll) return null;
  const parts = String(scroll).split(",").map((part) => Number.parseFloat(part.trim()));
  if (parts.length === 1 && Number.isFinite(parts[0])) {
    return { x: 0, y: parts[0] };
  }
  if (parts.length === 2 && parts.every(Number.isFinite)) {
    return { x: parts[0], y: parts[1] };
  }
  throw new Error("--scroll must be either <y> or <x,y>");
}

function serializeConsoleMessage(message) {
  return {
    type: message.type(),
    text: message.text(),
    location: message.location(),
  };
}

async function measurePage(page, selector) {
  return await page.evaluate((targetSelector) => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body ? body.scrollWidth : 0);
    const clientWidth = doc.clientWidth;
    const scrollHeight = Math.max(doc.scrollHeight, body ? body.scrollHeight : 0);
    const clientHeight = doc.clientHeight;

    const result = {
      document: {
        scrollWidth,
        clientWidth,
        scrollHeight,
        clientHeight,
        horizontalOverflow: scrollWidth > clientWidth + 1,
        overflowAmount: Math.max(0, scrollWidth - clientWidth),
      },
      selector: null,
    };

    if (!targetSelector) return result;

    const element = document.querySelector(targetSelector);
    if (!element) {
      result.selector = {
        selector: targetSelector,
        found: false,
      };
      return result;
    }

    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);
    result.selector = {
      selector: targetSelector,
      found: true,
      rect: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
      },
      computedStyles: {
        display: styles.display,
        position: styles.position,
        visibility: styles.visibility,
        opacity: styles.opacity,
        overflow: styles.overflow,
        overflowX: styles.overflowX,
        overflowY: styles.overflowY,
        zIndex: styles.zIndex,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        fontSize: styles.fontSize,
        lineHeight: styles.lineHeight,
        width: styles.width,
        height: styles.height,
        margin: styles.margin,
        padding: styles.padding,
      },
    };
    return result;
  }, selector || null);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const preset = PRESETS[args.preset];
  const scroll = parseScroll(args.scroll);
  const playwrightModule = await importPlaywright();
  const playwright = playwrightModule.chromium ? playwrightModule : playwrightModule.default;
  const { chromium } = playwright;
  if (!chromium) {
    throw new Error("Playwright chromium launcher was not found in the imported module");
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const urlSlug = slugify(args.url);
  const outDir = path.resolve(args.out);
  await fs.mkdir(outDir, { recursive: true });

  const screenshotPath = path.join(outDir, `${timestamp}-${args.preset}-${urlSlug}.png`);
  const reportPath = path.join(outDir, `${timestamp}-${args.preset}-${urlSlug}.json`);

  const consoleMessages = [];
  const failedRequests = [];
  const badResponses = [];
  const actions = [];

  const browser = await chromium.launch({ headless: true });
  let report;

  try {
    const context = await browser.newContext({
      viewport: { width: preset.width, height: preset.height },
      deviceScaleFactor: preset.deviceScaleFactor,
      isMobile: preset.isMobile,
      hasTouch: preset.hasTouch,
      userAgent: preset.isMobile
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        : undefined,
    });
    const page = await context.newPage();

    page.on("console", (message) => {
      if (["warning", "error"].includes(message.type())) {
        consoleMessages.push(serializeConsoleMessage(message));
      }
    });

    page.on("requestfailed", (request) => {
      failedRequests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        failure: request.failure(),
      });
    });

    page.on("response", (response) => {
      const status = response.status();
      if (status >= 400) {
        badResponses.push({
          url: response.url(),
          status,
          statusText: response.statusText(),
          requestMethod: response.request().method(),
          resourceType: response.request().resourceType(),
        });
      }
    });

    const navigation = await page.goto(args.url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    if (args.hover) {
      await page.locator(args.hover).first().hover({ timeout: 5000 });
      actions.push({ type: "hover", selector: args.hover });
    }

    if (args.click) {
      await page.locator(args.click).first().click({ timeout: 5000 });
      actions.push({ type: "click", selector: args.click });
    }

    if (scroll) {
      await page.evaluate(({ x, y }) => window.scrollTo(x, y), scroll);
      actions.push({ type: "scroll", ...scroll });
    }

    if (args.wait > 0) {
      await page.waitForTimeout(args.wait);
    }

    const measurements = await measurePage(page, args.selector);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    report = {
      ok: true,
      input: args,
      preset: args.preset,
      viewport: preset,
      initialResponse: navigation
        ? {
            url: navigation.url(),
            status: navigation.status(),
            statusText: navigation.statusText(),
          }
        : null,
      finalUrl: page.url(),
      actions,
      screenshotPath,
      reportPath,
      measurements,
      consoleMessages,
      failedRequests,
      badResponses,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    report = {
      ok: false,
      input: args,
      preset: args.preset,
      viewport: preset,
      finalUrl: null,
      actions,
      screenshotPath: null,
      reportPath,
      error: {
        name: error?.name || "Error",
        message: error?.message || String(error),
        stack: error?.stack || null,
      },
      consoleMessages,
      failedRequests,
      badResponses,
      generatedAt: new Date().toISOString(),
    };
  } finally {
    await browser.close();
  }

  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(JSON.stringify({
    ok: report.ok,
    screenshotPath: report.screenshotPath,
    reportPath,
    finalUrl: report.finalUrl,
    viewport: report.viewport,
    horizontalOverflow: report.measurements?.document?.horizontalOverflow ?? null,
    overflowAmount: report.measurements?.document?.overflowAmount ?? null,
    consoleMessageCount: consoleMessages.length,
    failedRequestCount: failedRequests.length,
    badResponseCount: badResponses.length,
    error: report.error?.message,
  }, null, 2));

  process.exit(report.ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exit(1);
});
