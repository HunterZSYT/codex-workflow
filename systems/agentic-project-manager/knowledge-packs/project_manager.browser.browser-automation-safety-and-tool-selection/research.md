# Research

## CloakBrowser Findings

CloakBrowser presents itself as a stealth Chromium distribution and wrapper for Playwright and Puppeteer. The README states that it uses source-level Chromium fingerprint patches rather than JavaScript injection or flag-only changes. It also documents proxy use, geo-IP matching, persistent profiles, local binary download/cache behavior, Docker usage, and a browser profile manager.

The same facts make it a poor default browsing tool for Codex Workflow. Its stated purpose includes passing bot-detection, anti-bot, CAPTCHA, Cloudflare, FingerprintJS, and related checks. That is a restricted capability. Safe absorption should improve tool-selection policy and safety checks, not enable the tool.

## Existing System Fit

- Frontend inspection should stay with existing frontend-inspect, Playwright, Chrome DevTools, and normal browser workflows.
- Browser automation remains ordinary Playwright/Puppeteer only for owned/local/test environments.
- Stealth or anti-detect browsers require explicit approval and a bounded legitimate test target.

## Current Signal

last30days found weak, low-specific current signal. It supports "there is public attention" but does not prove safety or capability.
