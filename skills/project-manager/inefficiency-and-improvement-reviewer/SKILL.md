---
name: inefficiency-and-improvement-reviewer
description: Use at task completion to review logs and suggest workflow, skill, script, MCP, task splitting, verification, and AGENTS.md improvements based on observed inefficiencies.
---

# Inefficiency and Improvement Reviewer

Learning rules:
- Vague implementation from broad AI memory counts as a knowledge sufficiency failure.
- Repeated missing knowledge should propose a blob/pack update, not a random new skill.
- Repeated retrieval misses should propose aliases/trigger terms/registry/index improvements.
- One-off lessons remain candidates unless explicitly approved.
- User corrections should be logged as reusable feedback candidates when they express workflow, safety, tool, naming, or knowledgebase rules.

Review repeated manual steps, wrong skill/tool choice, excessive verification loops, missing scripts, missing MCPs, missing project docs, skill gaps, tool failures, over-bundling, under-bundling, unnecessary screenshots/tests, and missing safety gates. Output prioritized recommendations.

Capability precision failures: a vague package recommendation without best-practice operating rules counts as an inefficiency. Repeated "need package/tool" answers without owner skill, active knowledge blob, docs source, and verification method should propose a knowledge blob update. Prefer the micro-update order: use active blob, update blob, add blob under existing skill, add short owner-skill pointer, add docs/pattern note, add script, add MCP config, create new skill only when no owner fits. Do not promote raw task logs; summarize sanitized capability lessons only.

Retrieval failures count as improvement candidates when an existing blob, skill, artifact, script, MCP, or doc was missed and the agent created or proposed something new. Review whether `pm-knowledge-search.mjs`, `pm-knowledge-related.mjs`, and `pm-knowledge-dedupe.mjs` were used before creation. If ranked retrieval finds a candidate/stale item, recommend update, promotion, cross-reference, or dedupe review before any new item.

Knowledge product failures count as improvement candidates when advice-only blobs are treated as reusable systems, source-light packs are marked active, artifacts are claimed without files/apply commands, or active routing changes happen without approval. Recommend candidate packs, source ledgers, artifact creation, or promotion review instead of new skills.

For codebase intelligence routing, review whether the chosen method matched the task size and question type.

Recommend:
- Use CodeGraph more when impact tracing, caller/callee lookup, dependency paths, route/service/component relationships, "what uses this?", or "what breaks if I change this?" caused repeated manual search.
- Use Understand Anything more when onboarding, architecture explanation, business/domain flow, or high-level documentation would reduce confusion.
- Use Serena more when semantic symbol navigation is available and would reduce broad grep/read loops.
- Avoid CodeGraph for small known-file edits when direct search was enough.
- Avoid Understand Anything for tiny localized edits, copy/content-only tasks, or no-codebase tasks.
- Update router skills, add a script, add a gitignore rule, or update `codex-workflow` docs when repeated friction appears.

Tool effectiveness review should check: tool chosen, why chosen, alternatives considered, whether it reduced search/read loops, whether it found the needed context, whether it was overkill, and whether routing rules should change.

Read `.ai-task/error-ledger.md`, `.ai-task/failed-commands.md`, and `.ai-task/decision-review.md` when present. Distinguish one-off issues from repeated patterns. One-off issues should be logged only. Repeated patterns should create skill/tool/script/doc update candidates. High-severity safety risks should create immediate safety-rule proposals requiring user approval.
