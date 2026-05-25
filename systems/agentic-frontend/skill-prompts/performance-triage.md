# Performance Triage

Use when a page is slow, has heavy JS/images/fonts, layout shift, performance score issues, Core Web Vitals concerns, or the user asks about speed/page performance.

Rules:
- Use `performance-check` / Lighthouse if URL is available.
- Use Chrome DevTools MCP if configured for deeper trace.
- Identify the largest bottleneck first.
- Make one targeted fix.
- Recheck once.
- Do not run a performance audit for unrelated copy/visual-only tasks.
