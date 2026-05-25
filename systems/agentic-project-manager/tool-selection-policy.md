# Tool Selection Policy

Default rule: start with the cheapest reliable method. Escalate only when the task needs more context, precision, or impact analysis.

## Routing Matrix

| Situation | Preferred Tooling |
| --- | --- |
| Small task, known file, one-file edit, copy/content update, simple styling fix | normal search/read |
| Unknown project, stack detection, available commands/tools | project capability scan |
| Frontend component add/modify, duplicate UI check | component-map |
| Backend/API route/service/controller tracing | API route map, backend capability scan |
| Database/schema/migration risk | db-engine-detect, db-schema-map, migration-safety-check |
| Architecture, onboarding, domain/business flow, explain unknown repo | Understand Anything |
| Symbol search, caller/callee, dependency paths, impact analysis, what uses this | CodeGraph |
| Semantic class/function/symbol navigation across large repo | Serena |
| Visual/responsive/mobile/layout proof | frontend-inspect |
| Accessibility/performance task | accessibility-check or performance-check only when directly relevant |

## Escalation Budget

Small tasks:
- Use direct inspection only.
- Do not run CodeGraph or Understand Anything unless direct search fails.

Medium tasks:
- Run capability scan first.
- Use one intelligence tool if needed.

Large/risky/unknown tasks:
- Use Project Manager tracking.
- Run capability scan.
- Choose the best intelligence tool and log why.

Avoid running multiple heavy tools unless:
- the first tool fails,
- the task requires both high-level explanation and precise symbol tracing,
- Project Manager records why both were needed.

## Normal Search vs Intelligence Tools

Use normal search/read when the target is obvious and the blast radius is small.

Use Understand Anything when the question is about the shape of the whole codebase: architecture, onboarding, domain flow, system explanation, or documentation-style summary.

Use CodeGraph when the question is about exact relationships: symbol usage, caller/callee paths, dependency paths, impact of changing something, or route/service/component relationships.

Use Serena when semantic navigation is available and useful for locating or editing symbols with context.

## Generated Artifact Safety

Do not sync or commit generated codebase-intelligence artifacts:

- `.codegraph/`
- `.understand-anything/`
- indexes
- caches
- graph databases

If a tool generates one of these folders in a project, keep it local-only and add it to `.gitignore` unless the user explicitly wants it committed.

Do not run tools on private/proprietary/sensitive code unless the task is inside that project and the tool is necessary. Do not expose secrets.

## Logging Requirements

When `.ai-task` tracking is active, record:

- tool chosen
- why chosen
- alternatives considered
- whether it reduced search/read loops
- whether it found the needed context
- whether it was overkill
- whether routing rules should change
