---
name: frontend-inspection-discipline
description: "Use when visually inspecting, testing, or fixing frontend UI, especially mobile responsiveness, headers, buttons, sticky navigation, screenshots, spacing, overflow, or when the user is frustrated about repeated visual QA mistakes. Enforces real viewport/device emulation, screenshot evidence, DOM/CSS measurement, console/network checks, small changes, and honest verification."
---

# Frontend Inspection Discipline

## Purpose

Use this skill before making visual, responsive, layout, screenshot, overflow, sticky header, interaction, or frontend QA claims about a rendered frontend UI.

This is not a design theory skill. Do not decide color taste, spacing taste, typography taste, or layout aesthetics here. Verify what is actually rendered in the browser.

## Inspection Rules

- Make no visual claim without rendered evidence.
- Do not treat a resized desktop browser window as mobile proof.
- For mobile checks, use real device-style emulation: mobile viewport, DPR, touch, and mobile mode.
- Use fresh screenshots from the correct URL and state. Do not rely on stale screenshots or old Chrome error pages.
- Use one relevant inspection per task. Avoid broad QA unless the user asks for broad QA.
- If verification fails twice, stop and report uncertainty instead of pretending.
- Report what was checked, viewport used, evidence path, result, and the next task.

## Required Workflow

1. Identify the exact claim to verify:
   - Mobile menu opens.
   - Sticky header does not cover content.
   - No horizontal overflow.
   - Button is visible/clickable.
   - Modal appears after click.
   - A specific selector has the expected size/position/style.

2. Confirm the page URL is correct and reachable:
   - Prefer `http://127.0.0.1:<port>` for local servers.
   - If the screenshot shows "site cannot be reached", the evidence is invalid.
   - Fix the server/URL first or report that inspection could not be completed.

3. Run one targeted inspection with `scripts/frontend-inspect.mjs`:

```bash
node scripts/frontend-inspect.mjs --url "http://127.0.0.1:3000" --preset desktop --out "_qa"
node scripts/frontend-inspect.mjs --url "http://127.0.0.1:3000" --preset iphone-14-pro-max --out "_qa"
node scripts/frontend-inspect.mjs --url "http://127.0.0.1:3000" --preset iphone-se --click ".menu-button" --selector ".mobile-menu" --out "_qa"
```

4. Inspect the produced report and screenshot:
   - Screenshot PNG path
   - JSON report path
   - Viewport data
   - Final URL
   - Document scrollWidth/clientWidth
   - Horizontal overflow result
   - Optional selector rect/computed styles
   - Console messages
   - Failed requests
   - Bad HTTP responses

5. Make only the smallest frontend change needed for the verified issue.

6. Re-run the same targeted inspection after the change.

## Failure Discipline

Stop after two failed verification attempts.

Examples of failed attempts:

- Browser could not reach the URL.
- Dev server was not running.
- Selector was not found.
- Screenshot captured the wrong page/state.
- Interaction did not happen.
- Tooling/browser dependency failed.

After two failures, say what was attempted, what failed, what is uncertain, and what needs to happen next. Do not invent a visual result.

## Supported Presets

- `desktop`: 1440x900, DPR 1, desktop mode
- `tablet`: 768x1024, DPR 2, touch/mobile mode
- `iphone-14-pro-max`: 430x932, DPR 3, touch/mobile mode
- `iphone-se`: 375x667, DPR 2, touch/mobile mode
- `pixel-7`: 412x915, DPR 2.625, touch/mobile mode

## Script Usage

From the skill folder:

```bash
node scripts/frontend-inspect.mjs --url "http://127.0.0.1:3000" --preset desktop --out "_qa"
```

If using Codex bundled Node dependencies, set `NODE_PATH` to the bundled node modules directory when needed.

Options:

- `--url <url>`: required page URL.
- `--preset <name>`: one of the supported presets.
- `--out <dir>`: output directory for PNG and JSON.
- `--selector <css>`: optional selector to measure.
- `--click <css>`: optional selector to click before screenshot.
- `--hover <css>`: optional selector to hover before screenshot.
- `--scroll <x,y>` or `--scroll <y>`: optional scroll before screenshot.
- `--wait <ms>`: optional wait after load/interactions.

## Report Format

When reporting inspection results, include:

```text
Checked: <exact UI claim>
URL: <final URL>
Viewport: <preset and dimensions>
Evidence: <PNG path> and <JSON path>
Result: <pass/fail/uncertain>
Findings: <only what the evidence supports>
Next task: <smallest next action>
```

Do not say "looks good", "mobile is fixed", "no overflow", or "header works" unless the current rendered evidence supports that claim.
