# Task Routing and Skill Selection

Purpose: select correct specialist skills/tools.

Rules:
- Do not use all tools every time.
- Choose smallest skill/tool that proves the claim.
- Run Capability Gap Radar for medium, high-risk, unclear, repeated, or tool-evaluation tasks.
- Run Capability Orchestration Radar for tasks that mention external libraries/tools/packages/MCPs, require current docs, combine multiple capabilities, or request best-practice stack/tool selection.
- Route external library/tool tasks through knowledge blob lookup before implementation; do not rely on broad package names alone.
- Check `knowledge-registry.json` with `pm-knowledge-lookup.mjs` or `pm-knowledge-gap.mjs` when GSAP, Lenis, shadcn, Tailwind, PHPMailer, Prisma, Docker, Nginx, CodeGraph, Understand Anything, or similar capabilities appear.
- Missing/stale blobs require a docs-backed micro-update candidate before implementation.
- Before creating new workflow knowledge, run ranked retrieval. Use `pm-knowledge-search.mjs --query "<query>"` and inspect `pm-knowledge-related.mjs --id "<id>"` for plausible matches.
- Check exact match, aliases, ranked FTS, related items, candidate/stale entries, owner skill, and existing artifacts/scripts/tools.
- If a candidate or related item exists, route to update, promote, cross-reference, or leave candidate instead of creating a duplicate.
- Do not run Capability Gap Radar for tiny localized edits unless direct inspection fails.
- Use frontend stack for frontend.
- Use backend-database stack for backend/database/VPS.
- Use design grounding for Figma/design source.
- Use component supply for UI components.
- Use safety gates for risky work.

Tool decision logic:
- Normal search/read: small tasks, known target file, one-file edit, copy/content update, simple styling fix, or direct bug with known location.
- Project capability scan: unknown project, stack detection, verification command selection, or available tools/scripts.
- Component map: frontend component changes or avoiding duplicate UI.
- API/db/schema maps: backend/API/database route, service, migration, or schema risk.
- Understand Anything: architecture explanation, onboarding, business/domain flow, large unfamiliar projects, or documentation-style understanding.
- CodeGraph: symbol search, caller/callee tracing, dependency paths, impact analysis, route/service/component relationships, "what uses this?", or "what breaks if I change this?".
- Serena: semantic symbol/class/function navigation when available and useful.
- Frontend inspect: rendered visual proof, responsive/mobile/layout, overflow, sticky, header, button, or spacing claims.
- Accessibility/performance tools: only when directly involved, or nav/forms/modals/buttons were touched for accessibility.

Escalation budget:
- Small: direct inspection only; no CodeGraph/Understand Anything unless search fails.
- Medium: capability scan first; use one intelligence tool if needed.
- Large/risky/unknown: Project Manager tracking, capability scan, best intelligence tool, and logged reason.
- Do not run multiple heavy tools unless the first fails or both high-level explanation and precise symbol tracing are needed.

Capability recommendations:
- If existing skills/tools are enough, proceed.
- If current docs or external setup are needed, use official/current sources before recommending changes.
- If no active knowledge blob exists for a fast-changing tool/library, fetch Context7 docs when available before recommending implementation rules.
- If a tool/MCP/library install or config change is useful, recommend it with approval required; do not install automatically.
- For database/server/deployment/auth/SSH/migration tasks, route through the relevant safety gate and read-only inspection first.
- Generated retrieval indexes under `.retrieval/` and `*.sqlite`, `*.sqlite3`, or `*.db` files are local-only and must not sync.
