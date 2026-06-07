# Browser Automation Safety and Tool Selection

Active source-backed policy for choosing browser automation and inspection tools.

Core rule: use normal tools first. Web search, normal browser inspection, Chrome DevTools, Playwright, and existing frontend-inspect workflows are the default. Stealth or anti-detect browsers are restricted-use only and require explicit approval before install, configuration, or use.

This pack was created from the CloakBrowser absorption pass. It absorbs safety and routing knowledge, not the tool itself.

## Safe To Use Now

- Normal-tools-first browser decision tree.
- Restricted-use policy for stealth and anti-detect browsers.
- Sync exclusion rules for browser binaries, profiles, cookies, localStorage, sessionStorage, proxy configs, traces, screenshots, and logs.

## Approval-Gated

- Installing CloakBrowser or similar anti-detect browsers.
- Running stealth browsing.
- Using browser sessions, profiles, cookies, proxies, or account-based sources.
- Using stealth tooling to bypass websites, bot detection, CAPTCHA, or access controls.
