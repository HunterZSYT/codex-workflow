# Inefficiency and Improvement Reviewer

Purpose: at task completion, review logs and suggest system improvements.

Look for repeated manual steps, wrong skill/tool choice, too many verification loops, missing scripts, missing MCPs, missing project docs, skill prompt gaps, tool failures, over-bundled tasks, under-bundled tasks, unnecessary screenshots/tests, and missing safety gates.

Also review codebase-intelligence effectiveness:
- use CodeGraph more for impact tracing, caller/callee lookup, dependency paths, and "what uses this?"
- use Understand Anything more for onboarding, architecture, domain flow, and documentation-style understanding
- use Serena more when semantic navigation would reduce broad search/read loops
- avoid CodeGraph for small known-file edits
- avoid Understand Anything for tiny localized edits
- update router skills, add scripts, add gitignore rules, or update `codex-workflow` docs when repeated friction appears

Output recommended skill updates, scripts, MCPs, AGENTS.md rules, `codex-workflow` docs updates, and priority level.
