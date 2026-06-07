# Specs

## Decision Rules

1. Use web search or official docs for general web research.
2. Use Chrome DevTools or in-app Browser for local rendered UI inspection.
3. Use Playwright for normal automation against local, owned, or explicitly approved test targets.
4. Use frontend-inspect and DOM/CSS measurement for UI claims.
5. Treat stealth, anti-detect, CAPTCHA-avoidance, bot-detection-bypass, proxy-profile, and persistent-session browser tooling as restricted.

## Manual Approval Required

Ask before:

- installing CloakBrowser or similar tools
- running stealth/anti-detect browser automation
- using browser-session or account-based sources
- using proxies or profile managers
- storing or reusing cookies, localStorage, sessionStorage, or browser profiles
- attempting to bypass bot detection, CAPTCHA, Cloudflare, or access controls

## Sync Exclusions

Never sync browser binaries, browser profiles, cookies, localStorage/sessionStorage, proxy configs, proxy secrets, screenshots, traces, HAR files, browser logs, or generated profile data.
