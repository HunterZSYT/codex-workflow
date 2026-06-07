# Browser Tool Decision Tree

1. Need public/current information?
   - Use web search or official docs.
2. Need local rendered UI inspection?
   - Use in-app Browser, Chrome DevTools, screenshots, DOM/CSS measurement, or frontend-inspect.
3. Need automated local UI testing?
   - Use Playwright against local or owned targets.
4. Need browser automation against a third-party site?
   - Confirm authorization and use normal tools first.
5. Need stealth, anti-detect, proxy, persistent profile, cookie/session reuse, or bot-detection avoidance?
   - Stop and ask for explicit approval with purpose, target, data handling, local-only artifacts, and rollback/cleanup plan.
