# Decisions

## System Fit Verdict

Verdict: candidate pack plus future local tool/MCP evaluation notes.

Do not install now. Do not configure MCP now. Do not wrap Codex now. Do not run proxy now. Do not run `headroom learn` now. Do not activate as a core dependency.

## When To Consider Headroom

Consider a future approval-gated pilot when:

- Codex runs repeatedly hit token/context limits because of large tool outputs.
- Build/test logs, API/DB JSON, or long shell output dominate the context.
- Multiple agents need to hand off large research/tool-output context.
- A reversible compression path is needed, where originals stay retrievable.
- The user explicitly asks to evaluate token compression or Headroom.

## When To Skip

Skip or prefer existing workflow practices when:

- The issue is bad retrieval/search strategy rather than large raw outputs.
- The task is short, single-turn, or code-only.
- Native provider compaction is enough.
- A sandbox or machine policy cannot run local proxy/processes.
- The source data includes secrets or sensitive logs and redaction boundaries are unclear.
- The user wants stable workflow docs, skills, or knowledge packs, not runtime transport changes.

## Mode Decision

Preferred evaluation order:

1. Docs-only absorption and candidate pack: done by this task.
2. MCP compression pilot: possible future option, narrower than proxying all traffic.
3. Library/API pilot on synthetic or sanitized logs/tool outputs: possible future option.
4. Proxy pilot: only after privacy/network/rollback approval.
5. Agent wrapper pilot: highest risk; only after proxy pilot succeeds.
6. `headroom learn`: dry-run/review-only first because it writes to context files.

## Integration Boundaries

- Existing Project Manager retrieval, knowledge registry, memory citations, and learning ledgers remain the source of workflow truth.
- Headroom memory/failure learning must not silently write back into active Codex Workflow governance files.
- Headroom generated files must not sync into `codex-workflow`.
- Candidate pack can guide future evaluation, not implementation.

## What Not To Absorb

- Raw source code.
- AGENTS.md write behavior.
- Global install instructions as default setup.
- Proxy/wrapper as default routing.
- Headroom memory as a replacement for the current memory/knowledge system.
- Telemetry-on defaults.
