# Task Routing and Skill Selection

Purpose: select correct specialist skills/tools.

Rules:
- Do not use all tools every time.
- Choose smallest skill/tool that proves the claim.
- For frontend tasks, identify UI layer, UI scope, owner skill/blob/pack, local vs systemic impact, and verification method before choosing tools.
- Use `frontend.system.ui-layer-scope-model` as candidate routing material for multi-layer or cross-scope frontend work.
- Before medium/large/risky/unknown tasks, run `pm-knowledge-sufficiency.mjs --task "<task>"`.
- Run Capability Gap Radar for medium, high-risk, unclear, repeated, or tool-evaluation tasks.
- Run Capability Orchestration Radar for tasks that mention external libraries/tools/packages/MCPs, require current docs, combine multiple capabilities, or request best-practice stack/tool selection.
- Route external library/tool tasks through knowledge blob lookup before implementation; do not rely on broad package names alone.
- Before external package/tool/library/MCP use, check active blob/pack or current docs source.
- Before new skill/blob/pack/script creation, run indexed retrieval.
- Candidate/stale knowledge is planning material, not active implementation authority.
- If knowledge is missing, stage knowledge update first.
- Check `knowledge-registry.json` with `pm-knowledge-lookup.mjs` or `pm-knowledge-gap.mjs` when GSAP, Lenis, shadcn, Tailwind, PHPMailer, Prisma, Docker, Nginx, CodeGraph, Understand Anything, or similar capabilities appear.
- Missing/stale blobs require a docs-backed micro-update candidate before implementation.
- Before creating new workflow knowledge, run ranked retrieval. Use `pm-knowledge-search.mjs --query "<query>"` and inspect `pm-knowledge-related.mjs --id "<id>"` for plausible matches.
- Check exact match, aliases, ranked FTS, related items, candidate/stale entries, owner skill, and existing artifacts/scripts/tools.
- If a candidate or related item exists, route to update, promote, cross-reference, or leave candidate instead of creating a duplicate.
- If the user asks to "fill knowledgebase" or asks for a reusable layout/design/animation/backend system, route to `pack-builder-workflow.md` and create or update a capability pack. Do not implement the website/app from that prompt. Use source-first research and AI-audit the result; auto-activate safe knowledge when checks pass, and keep only weak/risky/approval-dependent items candidate.
- If the user asks to activate, promote, approve, make active, or AI-review a capability pack, route to `ai-audited-activation-workflow.md`. Audit source quality, specs, decisions, artifacts, verification, owner skill references, overlap, and registry metadata before activation. If weak, keep candidate or enrich first.
- If the user asks to enrich, deepen, refresh source, update knowledge, fill gaps, or improve an active pack, route to `knowledge-enrichment-workflow.md`. AI-audit the result; apply safe enrichment directly to active knowledge and keep candidate only when audit fails or manual approval is required.
- Active knowledge is a usable baseline that can still be enriched, marked stale, deprecated, or superseded. Do not treat activation as "finished forever."
- Do not overwrite active knowledge silently. Preserve baseline files, append `enrichment-history.md`, and stage patch notes when a gap is found.
- Ecosystem Scout triggers include "fill our knowledgebase", "add knowledge", "teach the system", "add integration knowledge", "best way", "best stack", "what tools exist", "what should we use", "find reusable sources", "use best tools", "build with existing tools", "don't generate from scratch", "research and add", "scout ecosystem", WordPress/WooCommerce/theme/plugin, animation/motion, frontend framework, backend/database/VPS, MCP, AI coding tool, testing/browser/devtools, design system, starter kit, template, registry, and reusable component work. For these, retrieve local knowledge first, then scout official docs, official repos, GitHub discovery, package registries, component registries, MCP ecosystems, starters, templates, and safe public examples. Use `ecosystem-option-scorecard.md` to decide placement.
- WordPress theme triggers include WordPress theme, WP theme, block theme, classic theme, theme.json, functions.php, wp_enqueue_script, wp_enqueue_style, Create Block Theme, Roots Sage, _s/Underscores, WooCommerce theme, WooCommerce template override, product gallery/carousel, GSAP WordPress, Lenis WordPress, and ScrollTrigger WordPress. Route these through the candidate WordPress/WooCommerce/design-system/motion packs and Knowledge Sufficiency Gate. Do not implement from broad AI memory or install dependencies without approval.
- Repo Absorption triggers include a GitHub/public repo, repo, tool, library, skill system, design system, research source, or workflow source plus "absorb this", "add this repo", "use this tool in our system", "enrich our knowledgebase with this", "improve the system from this", "integrate this knowledge", "update our workflow from this repo", "learn from", "mine", "strip goodies", "extract workflow", "copy useful patterns", "source reference", or "add this repo to our system". For these, use `repo-absorption-workflow.md`, not install/clone/copy by default. Require local retrieval, current active layers, source/license review, absorption report, source absorption ledger, architecture mapping, AI audit, and auto-activation of safe knowledge. Ask approval only for risky execution/integration actions, unclear source/license, conflicting facts, or cases the AI audit cannot safely decide.
- Route browser automation, Playwright/Puppeteer/Chrome DevTools choice, CloakBrowser, stealth browser, anti-detect browser, bot-detection, proxy browser, or persistent browser profile work to active pack `project_manager.browser.browser-automation-safety-and-tool-selection`. Use normal Browser/DevTools/Playwright first; require approval before stealth/anti-detect/bypass/proxy/account-session execution.
- Route Understand Anything, `.understand-anything`, codebase graph, knowledge graph, architecture understanding, onboarding, domain flow, and codebase-intelligence tool comparison to active pack `project_manager.codebase.codebase-intelligence-tooling`. Keep generated graphs, indexes, and graph databases local-only unless the user explicitly asks to sync a sanitized artifact.
- Route cybersecurity skills, Anthropic Cybersecurity Skills, MITRE ATT&CK, NIST CSF, D3FEND, NIST AI RMF, defensive security skill intake, secure coding review enrichment, and AI security risk review to active pack `project_manager.security.defensive-cybersecurity-skills-intake`. Defensive taxonomy and checklist knowledge may be used; offensive procedures, exploit playbooks, malware/phishing/opsec content, private logs, and tool commands require rejection or explicit safety review.
- Route LiteParse, PaddleOCR, PDF parser, spatial text parsing, document parser, OCR backend, document OCR, source ingestion, document ingestion, and PaddleOCR-VL to active pack `project_manager.ingestion.document-parsing-stack`. Choose lightweight text extraction first, then spatial parsing, then OCR; require approval before installs, model downloads, private document OCR, OCR services, or syncing extracted content/caches.
- Route VPS deployment, cloud deployment, SSH domain inspection, public URL inspection, online site QA, hosted website debugging, staging URL, live domain, WordPress VPS, theme development on server, inspect domain with SSH, deploy to VPS, server logs, Nginx, Apache, OpenLiteSpeed, SSL/domain/cache/CDN, cloud security inspection, and production-safe mode to active pack `project_manager.cloud.vps-deployment-inspection-operations`. URL-only tasks use public URL inspection mode; SSH/VPS-only tasks use read-only server inspection mode; URL plus SSH/VPS tasks use the full workflow. Any requested fix/deploy/restart/config/database/firewall/cache-clear/server write needs a change plan, backup/rollback note, and explicit approval before execution.
- Do not run Capability Gap Radar for tiny localized edits unless direct inspection fails.
- Use frontend stack for frontend.
- Use backend-database stack for backend/database/VPS.
- Use design grounding for Figma/design source.
- Use component supply for UI components.
- Use safety gates for risky work.
- Route update README, migration README, restore guide, new PC setup, machine setup, one-shot migration, document current system, system inventory, setup checklist, README out of date, one-way sync, source-of-truth PC, primary machine, secondary machine, restore-only machine, and promote machine to primary to `readme-update-migration-guide`. It must scan first, update docs from actual systems, validate/redact before commit, and preserve the one-way primary-PC source-of-truth model.
- Route headroom, context compression, token compression, context optimization, huge output, large logs, large context files, long debugging output, source ingestion markdown, knowledgebase fill raw text, repo absorption source material, research artifacts, compress tool outputs, compress logs, reversible compression, CCR, cross-agent memory, headroom learn, wrap Codex, proxy compression, and MCP compression to active global context layer pack `project_manager.context.headroom-compression-evaluation`. First run or rely on recent `pm-headroom-status.mjs`; use `pm-headroom-context.mjs --mode analyze` automatically for large context/log/tool-output/research-artifact analysis. Preserve raw source paths separately; official docs and source ledgers remain canonical. Do not use Headroom when exact raw text/code fidelity is required. Do not use Headroom on secret-looking files unless the user explicitly approves and `--force` is passed. Service-backed simulate/compress is allowed only when Headroom service health is green. If the user asks to run `headroom learn`, require safety review because it may write corrections to `AGENTS.md` or similar files. If the user asks to wrap Codex or proxy traffic, require privacy/network/rollback review first.
- Route last30days, last 30 days, current research, recent community signal, what people are saying, trending tools, latest ecosystem, compare current tools, social signal, source discovery, recent GitHub activity, recent complaints, current best practice, latest tool/repo/library/MCP, and research brief requests to active global research layer pack `project_manager.research.last30days-current-signal`. Use last30days for current ecosystem/community signal and source discovery, then verify implementation facts through official docs, Context7, package registries, and official repositories. Do not add API keys, paid sources, browser/session credentials, or synced raw artifacts without explicit approval.

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

Frontend layer/scope examples:
- Fix button hover: interaction feedback, element/primitive component, `frontend.interaction.interaction-feedback-states`, interaction proof if visual/behavioral claim is made.
- Fix card grid spacing: spacing + layout, component group/section, spacing rhythm + layout composition.
- Improve landing page design: layout, spacing, typography, color, IA, responsive, motion, page/site, Project Manager + frontend-tool-orchestrator.
- Mobile header overflow: layout, responsive, navigation, verification, component/site nav, mobile emulation and overflow measurement.

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
- If a repository is being evaluated for useful ideas, classify it as source absorption and AI-audit derived knowledge. Auto-activate safe workflow knowledge; keep risky installs/configs/source-code reuse candidates until explicit approval.
- For database/server/deployment/auth/SSH/migration tasks, route through the relevant safety gate and read-only inspection first.
- Generated retrieval indexes under `.retrieval/` and `*.sqlite`, `*.sqlite3`, or `*.db` files are local-only and must not sync.
