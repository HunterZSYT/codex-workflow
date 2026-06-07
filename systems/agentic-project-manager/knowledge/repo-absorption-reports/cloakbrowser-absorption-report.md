# Repo Absorption Report: CloakBrowser

Date: 2026-06-07
Repo: https://github.com/CloakHQ/CloakBrowser
Local evidence: `.ai-task/official/cloak-readme.md`, `.ai-task/official/cloak-changelog.md`, `.ai-task/official/cloak-binary-license.md`, `.ai-task/official/cloakhq-cloakbrowser-repo.json`, `.ai-task/last30days/cloakbrowser-planned.md`

## Verdict

Absorb as safety and browser-tool-routing knowledge only. Do not install, enable, or recommend stealth/anti-detect/bypass behavior without explicit approval and a legitimate testing purpose.

## How It Helps

CloakBrowser is useful as a boundary case for browser automation decisions: it clarifies when normal Browser, DevTools, Playwright, or Puppeteer tooling is enough, and when a request moves into restricted stealth-browser territory.

## Repo Identity

- License: MIT for the package; separate binary license was inspected.
- Repo health signal: high-star, recently pushed and updated on 2026-06-07 via GitHub metadata.
- Claimed domain: stealth Chromium, bot-detection testing, Playwright/Puppeteer drop-in automation.

## Official Findings

- README describes a custom Chromium binary with source-level fingerprint patches.
- README presents Playwright/Puppeteer replacement use, persistent profiles, proxy and geo-location behavior, WebRTC spoofing, and profile management.
- README and topics include bot-detection, captcha, Cloudflare/Turnstile, reCAPTCHA, and stealth-browser language.
- Binary auto-download/cache and profile persistence make it materially different from ordinary browser automation.

## Current Signal

last30days signal was weak and Reddit-heavy. It was useful only as a discovery/current-awareness signal, not as technical proof.

## Useful Goodies

- Normal-tools-first browser decision tree.
- Explicit restricted-stealth-browser policy.
- Browser profile/cookie sync exclusion.
- Approval boundary for proxies, account sessions, anti-detect behavior, and bypass-related claims.

## System Placement

Active pack: `project_manager.browser.browser-automation-safety-and-tool-selection`

## Auto-Activated

Safe decision guidance: default to normal Browser/DevTools/Playwright tooling for local testing and require approval for stealth-browser execution.

## Approval-Gated

Installing CloakBrowser, downloading its Chromium binary, using proxies or persistent account profiles, bypass testing, captcha/bot-detection evasion, or any stealth/anti-detect execution.

## Rejected or Skipped

No package install, no binary download, no MCP/tool configuration, no account/session source, no bypass workflow import, and no copied source.
