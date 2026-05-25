---
name: performance-triage
description: Use when a page is slow, has heavy JavaScript/images/fonts, layout shift, Lighthouse score issues, Core Web Vitals concerns, or the user asks about speed/page performance. Uses Lighthouse or Chrome DevTools MCP to identify the largest bottleneck first.
---

# Performance Triage

Use `performance-check` / Lighthouse if a URL is available. Use Chrome DevTools MCP for deeper trace when configured. Identify the largest bottleneck first, make one targeted fix, and recheck once. Do not run performance audits for unrelated copy or visual-only tasks.
