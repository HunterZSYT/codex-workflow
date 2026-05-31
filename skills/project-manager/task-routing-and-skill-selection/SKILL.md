---
name: task-routing-and-skill-selection
description: Use to select the correct specialist skills/tools for frontend, backend, database, VPS, design-source, component, accessibility, performance, security, and mixed tasks. Chooses the smallest tool that proves the claim.
---

# Task Routing and Skill Selection

Before selecting implementation tools for medium/large/risky/unknown work, run:
- `node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-sufficiency.mjs --task "<task>"`

Rules:
- Before using an external package/tool/library/MCP, check for an active blob/pack or current docs source.
- Before creating a new skill/blob/pack/script, run indexed retrieval.
- Candidate/stale knowledge is planning material, not an active implementation rule.
- If knowledge is missing, stage a knowledge update first.
- Wrong tool/skill selection should be logged and reviewed as a candidate routing update.

Do not use all tools every time. Choose the smallest skill/tool that proves the claim. Use frontend stack for frontend, backend-database stack for backend/database/VPS, design grounding for Figma/design source, component supply for UI components, and safety gates for risky work.

Run Capability Gap Radar for medium, high-risk, unclear, repeated, or tool-evaluation tasks. Do not run it for tiny localized edits unless direct inspection fails.

Run Capability Orchestration Radar for external libraries/tools/packages/MCPs, current-doc dependent behavior, multi-capability tasks, high-risk work, and best-practice stack/tool selection. Route external library/tool tasks through knowledge blob lookup before implementation; do not rely on broad package names alone. Check `knowledge-registry.json` with `pm-knowledge-lookup.mjs` or `pm-knowledge-gap.mjs` when GSAP, Lenis, shadcn, Tailwind, PHPMailer, Prisma, Docker, Nginx, CodeGraph, Understand Anything, or similar capabilities appear. Missing/stale blobs require a docs-backed micro-update candidate before implementation.

Before creating new workflow knowledge, run ranked retrieval. Use `pm-knowledge-search.mjs --query "<query>"` and inspect `pm-knowledge-related.mjs --id "<id>"` for plausible matches. Check exact match, aliases, ranked FTS, related items, candidate/stale entries, owner skill, and existing artifacts/scripts/tools. If a candidate or related item exists, route to update, promote, cross-reference, or leave candidate instead of creating a duplicate.

If the user asks to "fill knowledgebase" or asks for a reusable layout/design/animation/backend system, route to `pack-builder-workflow.md` and create or update a candidate capability pack. Do not implement the website/app from that prompt. Use source-first research and leave the pack candidate until explicit approval.

Ecosystem Scout triggers include "fill our knowledgebase", "add knowledge", "teach the system", "add integration knowledge", "best way", "best stack", "what tools exist", "what should we use", "find reusable sources", "use best tools", "build with existing tools", "don't generate from scratch", "research and add", "scout ecosystem", WordPress/WooCommerce/theme/plugin, animation/motion, frontend framework, backend/database/VPS, MCP, AI coding tool, testing/browser/devtools, design system, starter kit, template, registry, and reusable component work. For these, retrieve local knowledge first, then scout official docs, official repos, GitHub discovery, package registries, component registries, MCP ecosystems, starters, templates, and safe public examples. Use `ecosystem-option-scorecard.md` to decide placement.

WordPress theme triggers include WordPress theme, WP theme, block theme, classic theme, theme.json, functions.php, wp_enqueue_script, wp_enqueue_style, Create Block Theme, Roots Sage, _s/Underscores, WooCommerce theme, WooCommerce template override, product gallery/carousel, GSAP WordPress, Lenis WordPress, and ScrollTrigger WordPress. Route these through the candidate WordPress/WooCommerce/design-system/motion packs and Knowledge Sufficiency Gate. Do not implement from broad AI memory or install dependencies without approval.

Repo Absorption triggers include a GitHub/public repo plus "absorb", "learn from", "mine", "strip goodies", "extract workflow", "copy useful patterns", "source reference", or "add this repo to our system". For these, use `repo-absorption-workflow.md`, not install/clone/copy by default. Require local retrieval, source/license review, absorption report, source absorption ledger, architecture mapping, and explicit approval before activation.

## Tool Selection Policy

Default rule: start with the cheapest reliable method. Escalate only when the task needs more context, precision, or impact analysis.

- Normal search/read: small task, known target file, one-file edit, copy/content update, simple styling fix, or direct bug with known location.
- Project capability scan: unknown project, stack detection, verification command selection, or available tool/script detection.
- Component map: adding/modifying frontend components, finding existing UI, or avoiding duplicate components.
- API/db/schema maps: backend/API/database tasks, route/controller/service tracing, migration/schema risk.
- Understand Anything: user asks to understand/onboard/explain a codebase, task needs architecture, business/domain flow, large unfamiliar project understanding, or documentation-style summary.
- CodeGraph: symbol search, caller/callee tracing, dependency path tracing, impact analysis, route/service/component relationship tracing, "what uses this?", or "what breaks if I change this?".
- Serena: semantic code navigation is available and useful for symbols/classes/functions across a large repo or targeted edits with semantic context.
- Frontend inspect: visual proof, responsive/mobile/layout issue, overflow/sticky/header/button/spacing visual claim.
- Accessibility/performance tools: only when the task directly involves accessibility/performance, or when touched UI includes nav/forms/modals/buttons for accessibility.

Budget: small tasks use direct inspection and no CodeGraph/Understand Anything unless search fails. Medium tasks run capability scan first and use one intelligence tool if needed. Large/risky/unknown tasks use Project Manager tracking, run capability scan, choose the best intelligence tool, and log why. Do not run multiple heavy tools unless one fails or the task needs both high-level explanation and precise symbol tracing.

Capability recommendations: if existing skills/tools are enough, proceed. If current docs or external setup are needed, use official/current sources before recommending changes. If no active knowledge blob exists for a fast-changing tool/library, fetch Context7 docs when available before recommending implementation rules. If a tool/MCP/library install or config change is useful, recommend it with approval required; do not install automatically. If a repository is only being evaluated for useful ideas, classify it as source absorption and stage candidates; do not promote it to active workflow knowledge until reviewed and approved. For database/server/deployment/auth/SSH/migration tasks, route through the relevant safety gate and read-only inspection first.

Generated artifacts from `.codegraph/`, `.understand-anything/`, indexes, caches, and databases are local-only and should be gitignored. Do not sync or commit them unless explicitly requested.

Generated retrieval indexes under `.retrieval/` and `*.sqlite`, `*.sqlite3`, or `*.db` files are local-only and must not sync.

## Tool Choice Feedback Loop

When Project Manager tracking is active, log task type, available tools considered, tool chosen, why chosen, expected benefit, actual benefit, time/cost/complexity, whether it was overkill, whether a cheaper tool would have worked, whether a stronger tool should have been used, and future routing lesson.

If wrong routing repeats, propose updates to this skill or `project-manager-execution-ledger`; do not auto-apply changes after a single mistake.
