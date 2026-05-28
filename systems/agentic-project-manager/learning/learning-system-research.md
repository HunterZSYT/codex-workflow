# Learning System Research

Date: 2026-05-28

## Tools and Patterns Researched

| Option | Sources checked | Fit for Codex Workflow | Decision |
|---|---|---|---|
| OpenTelemetry trace/event concepts | https://opentelemetry.io/docs/, https://opentelemetry.io/docs/concepts/signals/, https://opentelemetry.io/docs/specs/otel/overview | Good conceptual model: tasks are traces, phases/events are span-like records, logs/events carry structured evidence. Full OTel SDK/collector is heavier than needed for local workflow learning. | Use the concepts only: event names, correlation IDs, severity, evidence, source confidence. Do not install collector infrastructure now. |
| JSONL event logs | JSON Lines/NDJSON pattern references and common CLI logging practice | Excellent local-first raw event store. Append-only, streamable, easy to redact, easy to keep out of sync. | Use sanitized JSONL for raw local events. Never sync raw event stores. |
| SQLite event store / FTS index | https://www.sqlite.org/fts5.html and existing `pm-knowledge-index.mjs` | Already present through `C:\Users\acer\.codex\agentic-project-manager\.retrieval\knowledge-index.sqlite`. Useful for ranked retrieval over knowledge and packs. | Reuse existing SQLite FTS knowledge index. Do not create a second event DB in this pass. |
| GitHub Issues improvement queue | https://docs.github.com/rest/issues and label docs | Good for reviewed, human-visible backlog items, but wrong for raw local traces or private task evidence. | Future optional: promote approved improvement candidates to GitHub Issues. Do not sync raw logs to GitHub. |
| Existing Node/CLI logging patterns | Existing PM tools: `pm-log-error.mjs`, `pm-log-user-response.mjs`, `pm-review-errors.mjs`, `pm-learning-report.mjs` | Best fit. Existing tools already write task-local and learning docs. | Extend existing Node CLI tools instead of creating a separate framework. |
| Lightweight local-first observability products | Considered conceptually against current local PM setup | Adds dependency and operational surface without clear benefit. Current needs are structured learning, retrieval, and sufficiency gating, not dashboards. | Avoid for now. Revisit only if local JSONL + FTS reports become insufficient. |

## What To Use Now

- Raw sanitized structured events in local JSONL.
- Existing `.ai-task` ledgers for task-local summaries.
- Existing SQLite FTS knowledge index for active/candidate blob and pack retrieval.
- Strict knowledge registry metadata for status, source confidence, artifact availability, owner skill, and verification method.
- Candidate patch files for reviewed learning updates.
- Git commits for sanitized knowledge and policy changes only.

## What To Avoid

- No OpenTelemetry collector, remote backend, dashboard service, or hosted trace storage.
- No raw conversation replay as active knowledge.
- No one-off error auto-promotion.
- No automatic skill rewriting from event logs.
- No candidate blob/pack treated as active implementation authority.
- No syncing of raw `learning/events/events.jsonl`, `.ai-task`, generated DBs, screenshots, caches, or secrets.

## Future Upgrade Options

- Index sanitized learning docs into the same SQLite retrieval index.
- Add optional GitHub Issue creation for approved improvement candidates.
- Add a local HTML report over sanitized event summaries if JSON output becomes too hard to inspect.
- Add an event compaction job that promotes reviewed patterns into learning docs while keeping raw logs local-only.

## Why This Direction

The current system already has the right primitives: Node CLI tools, append-only learning docs, a registry, knowledge blobs/packs, and SQLite FTS retrieval. The missing layer is a pre-action sufficiency decision and structured learning loop. A local-first extension gives the agent enough operating discipline without adding infrastructure or broad new skills.
