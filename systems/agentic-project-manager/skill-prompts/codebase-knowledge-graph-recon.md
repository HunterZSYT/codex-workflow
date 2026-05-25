# Codebase Knowledge Graph Recon

Use Understand Anything as an optional knowledge-graph recon layer for large, unfamiliar, or risky codebase tasks.

Use Understand Anything when:
- the project is large or unfamiliar
- the codebase has many files/modules
- the task may affect multiple layers
- the user asks "understand this project/codebase"
- the user asks for architecture, flow, dependencies, onboarding, or impact analysis
- a template/static site/full-stack app needs mapping before large edits
- business-domain flow understanding is useful

Do not use Understand Anything when:
- the task is tiny and localized
- only one known file needs editing
- the user asks for a quick copy/content edit
- no codebase exists
- running it would be slower than direct inspection

Recommended workflow:
1. Run normal project capability scan first.
2. If project is large/unknown, run Understand Anything.
3. Use `/understand` to build graph.
4. Use `/understand-dashboard` for visual exploration when useful.
5. Use `/understand-chat` for questions about architecture/flows.
6. Use `/understand-diff` before/after large changes when impact matters.
7. Use `/understand-domain` when business logic/process flow matters.
8. Log whether it was used in `.ai-task/tool-skill-usage.md` if Project Manager tracking is active.

Safety:
- Do not run on private/proprietary/production-sensitive code unless user approves.
- Do not paste secrets into graph/docs.
- If `.understand-anything/` is generated, mention whether it should be gitignored.
- Do not commit generated graph/dashboard files unless user explicitly asks.
