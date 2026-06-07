# Source Ledger

Date checked: 2026-05-31

| Source | URL | Type | Extracted rule/pattern | Confidence | License/copyright note |
| --- | --- | --- | --- | --- | --- |
| GSAP ScrollTrigger docs | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | official docs | ScrollTrigger supports scroll animations and third-party smooth-scroll integration through documented patterns such as scroller proxy/events. | high | Summarized docs only |
| GSAP React docs | https://gsap.com/resources/React/ | official docs | `useGSAP` cleanup/scoping matters in React contexts; use only when WordPress architecture actually uses React. | high | Summarized docs only |
| Lenis GitHub | https://github.com/darkroomengineering/lenis | official repo | Lenis + ScrollTrigger sync uses `lenis.on('scroll', ScrollTrigger.update)` and GSAP ticker-driven Lenis RAF. | high | MIT; source reference only |
| WordPress Including Assets | https://developer.wordpress.org/themes/core-concepts/including-assets/ | official docs | Compile/enqueue theme JS/CSS through WordPress asset APIs rather than hard-coded tags. | high | Summarized docs only |
| Existing local GSAP/Lenis blobs | C:\Users\acer\.codex\agentic-frontend\knowledge\motion | local knowledge | Use existing active GSAP/Lenis/reduced-motion blobs for core motion behavior; this pack adds WordPress enqueue/build constraints. | high | Internal |
| GSAP npm/package docs | https://www.npmjs.com/package/gsap | package registry | GSAP 3.13.0 provides ScrollTrigger, matchMedia, TypeScript declarations, and npm import path evidence. | medium-high | Package metadata summarized only |
| GSAP docs | https://gsap.com/docs/v3/Plugins/ | official docs | GSAP plugins can be installed via script tags or npm and registered through `gsap.registerPlugin`. | high | Summarized docs only |
| GSAP ScrollSmoother docs | https://www.gsap.com/docs/v3/Plugins/ScrollSmoother/ | official docs | ScrollSmoother is native-scroll based and integrated with GSAP/ScrollTrigger; consider it when available instead of ad hoc smooth-scroll stacks. | medium-high | Summarized docs only |
| GSAP/Lenis current signal artifact | `.ai-task/last30days-wordpress-ecommerce/gsap-lenis-wordpress.md` | current signal | Found limited but relevant GSAP/WordPress signal and broader complaints around setup, reduced motion, and bundling. | low-medium | Local-only raw current-signal artifact |
