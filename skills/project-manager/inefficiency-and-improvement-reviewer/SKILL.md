---
name: inefficiency-and-improvement-reviewer
description: Use at task completion to review logs and suggest workflow, skill, script, MCP, task splitting, verification, and AGENTS.md improvements based on observed inefficiencies.
---

# Inefficiency and Improvement Reviewer

Review repeated manual steps, wrong skill/tool choice, excessive verification loops, missing scripts, missing MCPs, missing project docs, skill gaps, tool failures, over-bundling, under-bundling, unnecessary screenshots/tests, and missing safety gates. Output prioritized recommendations.

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
