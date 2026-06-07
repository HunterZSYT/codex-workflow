# Inefficiency and Improvement Reviewer

Purpose: at task completion, review logs and suggest system improvements.

Look for repeated manual steps, wrong skill/tool choice, too many verification loops, missing scripts, missing MCPs, missing project docs, skill prompt gaps, tool failures, over-bundled tasks, under-bundled tasks, unnecessary screenshots/tests, and missing safety gates.

Capability precision failures:
- A vague package recommendation without best-practice operating rules counts as an inefficiency.
- Vague generation from broad AI memory is a knowledge sufficiency failure.
- Custom generation before scouting official docs, repositories, registries, component sources, MCPs, starter kits, or existing ecosystem tools counts as an ecosystem scout failure.
- Researching only the user-named tool when adjacent ecosystem options are clearly relevant counts as an ecosystem scout failure.
- Installing, cloning large repos, copying source/assets, configuring risky integrations, or changing execution behavior from an "absorb this" request without a repo absorption report, license check, source absorption ledger, AI audit, and required approval counts as a source absorption failure.
- Implementing WordPress/WooCommerce/theme.json/GSAP-Lenis WordPress work without checking the candidate WordPress packs or current official docs counts as a knowledge sufficiency failure.
- Treating a repo absorption report as active knowledge before AI audit counts as a knowledge product failure. Leaving safe source-backed absorption output candidate by default after a passing AI audit also counts as a lifecycle failure.
- Repeated "need package/tool" answers without owner skill, active knowledge blob, docs source, and verification method should propose a knowledge blob update.
- Repeated missing knowledge proposes a blob/pack update, not a random new skill.
- Repeated retrieval failures propose alias/trigger/index metadata updates.
- Repeated wrong tool/skill choices propose routing micro-updates.
- Repeated weak verification proposes verification skill/blob updates.
- User feedback can create candidate preference/workflow updates, but activation needs approval unless explicitly requested.
- Prefer the micro-update order: use active blob, update blob, add blob under existing skill, add short owner-skill pointer, add docs/pattern note, add script, add MCP config, create new skill only when no owner fits.
- Do not promote raw task logs; summarize sanitized capability lessons only.
- Retrieval failures count as improvement candidates when an existing blob, skill, artifact, script, MCP, or doc was missed and the agent created or proposed something new.
- Review whether `pm-knowledge-search.mjs`, `pm-knowledge-related.mjs`, and `pm-knowledge-dedupe.mjs` were used before creation.
- If ranked retrieval finds a candidate/stale item, recommend update, promotion, cross-reference, or dedupe review before any new item.
- Knowledge product failures count as improvement candidates when advice-only blobs are treated as reusable systems, source-light packs are marked active, artifacts are claimed without files/apply commands, or active routing changes happen without approval.
- Lifecycle failures count as improvement candidates when candidate knowledge is treated as active, active knowledge is treated as final/immutable, enrichment is applied without review, stale active knowledge is used without warning, or activation skips source/spec/artifact/verification audit.
- When an active pack has a discovered gap, recommend an enrichment candidate against the active baseline rather than demoting the pack or rewriting it silently.
- When activation fails because sources/specs/artifacts/verification are weak, recommend targeted enrichment blockers and keep the pack candidate.
- Review whether activation created or updated `activation-review.md` and `enrichment-history.md` for capability packs.

Also review codebase-intelligence effectiveness:
- use CodeGraph more for impact tracing, caller/callee lookup, dependency paths, and "what uses this?"
- use Understand Anything more for onboarding, architecture, domain flow, and documentation-style understanding
- use Serena more when semantic navigation would reduce broad search/read loops
- avoid CodeGraph for small known-file edits
- avoid Understand Anything for tiny localized edits
- update router skills, add scripts, add gitignore rules, or update `codex-workflow` docs when repeated friction appears

Output recommended skill updates, scripts, MCPs, AGENTS.md rules, `codex-workflow` docs updates, and priority level.

When ecosystem scout failures repeat, recommend updating local knowledge aliases, trigger terms, source maps, option scorecards, or pack-builder docs before creating a new script or skill.

When source absorption failures repeat, recommend updating repo absorption triggers, report templates, source ledger templates, license review rules, or sync/redaction docs before creating a new skill.

When README/migration/setup documentation drifts from the live Codex Workflow system, recommend routing future work to `readme-update-migration-guide` and `pm-readme-update.mjs`. Treat missing one-way primary/secondary rules, stale restore steps, stale MCP setup, missing system inventory, or unsafe secondary sync instructions as high-priority documentation/routing inefficiencies.

When large context/log/tool-output/repo-absorption/research-artifact work skips `project_manager.context.headroom-compression-evaluation`, `pm-headroom-status.mjs`, or `pm-headroom-context.mjs --mode analyze`, treat it as a routing inefficiency. Recommend active global context layer lookup first, preserve raw source paths as canonical, and require safety-gated planning before any MCP, proxy, wrapper, or `headroom learn` action.

When current ecosystem/community-signal work skips `project_manager.research.last30days-current-signal`, treat it as a routing inefficiency. This includes last-30-days research, what people are saying, trending tools, current best practice, recent complaints, recent GitHub activity, latest tool/repo/library/MCP, and source discovery for knowledge packs. Recommend last30days as a current-signal layer, but keep official docs/repos authoritative and require approval before paid/API/browser/session sources or synced raw artifacts.

When browser automation/stealth browser/codebase graph/cybersecurity skills/document parsing/OCR work skips the relevant active source-absorption pack, treat it as a routing inefficiency. Relevant packs: `project_manager.browser.browser-automation-safety-and-tool-selection`, `project_manager.codebase.codebase-intelligence-tooling`, `project_manager.security.defensive-cybersecurity-skills-intake`, and `project_manager.ingestion.document-parsing-stack`. Recommend alias or trigger updates before adding a new skill.
