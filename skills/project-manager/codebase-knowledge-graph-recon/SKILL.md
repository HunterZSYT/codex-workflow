---
name: codebase-knowledge-graph-recon
description: Use Understand Anything as an optional knowledge-graph recon layer for large, unfamiliar, risky, multi-module, or multi-layer codebase tasks; architecture, flow, dependency, onboarding, business-domain, template/static/full-stack mapping, and impact analysis. Runs after normal capability scans and avoids unnecessary use for tiny localized edits or copy-only tasks.
---

# Codebase Knowledge Graph Recon

Use Understand Anything when the project is large or unfamiliar, has many files/modules, may affect multiple layers, requires architecture/flow/dependency/onboarding/impact analysis, needs template/static/full-stack mapping before large edits, or benefits from business-domain flow understanding.

Do not use it when the task is tiny and localized, only one known file needs editing, the user asks for quick copy/content edits, no codebase exists, or direct inspection is faster.

Recommended workflow:
1. Run normal project capability scan first.
2. If project is large/unknown, use `/understand`.
3. Use `/understand-dashboard` for visual exploration when useful.
4. Use `/understand-chat` for architecture/flow questions.
5. Use `/understand-diff` before/after large changes when impact matters.
6. Use `/understand-domain` when business logic/process flow matters.
7. Log usage in `.ai-task/tool-skill-usage.md` if Project Manager tracking is active.

Safety: do not run on private/proprietary/production-sensitive code unless user approves. Do not paste secrets into graph/docs. If `.understand-anything/` is generated, mention whether it should be gitignored. Do not commit generated graph/dashboard files unless explicitly asked.
