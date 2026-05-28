# Inefficiency and Improvement Reviewer

Purpose: at task completion, review logs and suggest system improvements.

Look for repeated manual steps, wrong skill/tool choice, too many verification loops, missing scripts, missing MCPs, missing project docs, skill prompt gaps, tool failures, over-bundled tasks, under-bundled tasks, unnecessary screenshots/tests, and missing safety gates.

Capability precision failures:
- A vague package recommendation without best-practice operating rules counts as an inefficiency.
- Repeated "need package/tool" answers without owner skill, active knowledge blob, docs source, and verification method should propose a knowledge blob update.
- Prefer the micro-update order: use active blob, update blob, add blob under existing skill, add short owner-skill pointer, add docs/pattern note, add script, add MCP config, create new skill only when no owner fits.
- Do not promote raw task logs; summarize sanitized capability lessons only.
- Retrieval failures count as improvement candidates when an existing blob, skill, artifact, script, MCP, or doc was missed and the agent created or proposed something new.
- Review whether `pm-knowledge-search.mjs`, `pm-knowledge-related.mjs`, and `pm-knowledge-dedupe.mjs` were used before creation.
- If ranked retrieval finds a candidate/stale item, recommend update, promotion, cross-reference, or dedupe review before any new item.
- Knowledge product failures count as improvement candidates when advice-only blobs are treated as reusable systems, source-light packs are marked active, artifacts are claimed without files/apply commands, or active routing changes happen without approval.

Also review codebase-intelligence effectiveness:
- use CodeGraph more for impact tracing, caller/callee lookup, dependency paths, and "what uses this?"
- use Understand Anything more for onboarding, architecture, domain flow, and documentation-style understanding
- use Serena more when semantic navigation would reduce broad search/read loops
- avoid CodeGraph for small known-file edits
- avoid Understand Anything for tiny localized edits
- update router skills, add scripts, add gitignore rules, or update `codex-workflow` docs when repeated friction appears

Output recommended skill updates, scripts, MCPs, AGENTS.md rules, `codex-workflow` docs updates, and priority level.
