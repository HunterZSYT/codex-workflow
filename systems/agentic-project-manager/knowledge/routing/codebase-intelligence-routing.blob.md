# Knowledge Blob: Codebase Intelligence Routing

Blob ID: codebase-intelligence-routing

Owner system: agentic-project-manager

Owner skill: task-routing-and-skill-selection

Capability: Route codebase-intelligence tools without overuse.

Trigger phrases:
- CodeGraph
- Understand Anything
- Serena
- architecture
- onboarding
- impact analysis
- trace flow
- symbol
- what uses this

When to use:
- Use for unfamiliar architecture, dependency tracing, impact analysis, symbol navigation, route/service/component relationships, and onboarding/domain understanding.

When not to use:
- Do not use heavy recon for tiny localized edits or known one-file changes.

External libraries/tools:
- CodeGraph
- Understand Anything
- Serena

Required docs source:
- Context7:
- Official docs:
- GitHub/npm:
- Last verified: 2026-05-28

Best-practice rules:
- CodeGraph: symbol search, callers/callees, dependency paths, impact, what-uses/what-breaks.
- Understand Anything: architecture/onboarding/domain flow and large unfamiliar codebase understanding.
- Serena: semantic navigation and targeted symbol/class/function edits when available.
- Always verify conclusions with task-appropriate tests, builds, screenshots, or smoke checks.

Implementation pattern:
- Start with cheapest reliable method.
- Escalate to one intelligence tool that matches the question.
- Log tool choice for medium/large tasks.

Anti-patterns:
- Running multiple heavy recon tools by default.
- Treating graph/recon output as proof.

Security/safety notes:
- Keep generated graph/index folders local-only and gitignored.

Verification method:
- Use direct task verification after intelligence-assisted discovery.

Generated/local artifacts:
- `.codegraph/` and `.understand-anything/` are local-only.

Micro-update history:
- 2026-05-28: Initial blob created.

Safe to sync to codex-workflow:
yes
