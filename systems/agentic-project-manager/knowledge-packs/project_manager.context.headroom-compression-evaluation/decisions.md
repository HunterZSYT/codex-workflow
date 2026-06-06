# Decisions

## System Fit Verdict

Verdict: active global context layer in SDK/tool mode.

The npm SDK dependency is already installed for Project Manager tools. Do not reinstall unless missing. Do not configure MCP now. Do not wrap Codex now. Do not run proxy now. Do not run `headroom learn` now.

## When To Consider Headroom

Use Headroom analysis automatically when:

- Codex runs repeatedly hit token/context limits because of large tool outputs.
- Build/test logs, API/DB JSON, or long shell output dominate the context.
- Multiple agents need to hand off large research/tool-output context.
- A reversible compression path is needed, where originals stay retrievable.
- The user explicitly asks to evaluate token compression or Headroom.
- Repo absorption or research produces long source material.
- Knowledgebase fill creates too much raw markdown for the active turn.

## When To Skip

Skip or prefer existing workflow practices when:

- The issue is bad retrieval/search strategy rather than large raw outputs.
- The task is short, single-turn, or code-only.
- Exact raw text/code fidelity is required.
- The input path or content looks secret-bearing and the user has not explicitly approved use.
- Native provider compaction is enough.
- A sandbox or machine policy cannot run local proxy/processes.
- The source data includes secrets or sensitive logs and redaction boundaries are unclear.
- The user wants stable workflow docs, skills, or knowledge packs, not runtime transport changes.

## Mode Decision

Active and pending modes:

1. SDK/tool analysis: active global context layer.
2. Explicit context analysis: active through `pm-headroom-context.mjs`.
3. Large log/tool-output/research artifact analysis: active when context is large/noisy.
4. MCP/service/proxy/wrapper: pending expansion modes.
5. `headroom learn`: pending; dry-run/review-only first because it writes to context files.

## Integration Boundaries

- Existing Project Manager retrieval, knowledge registry, memory citations, and learning ledgers remain the source of workflow truth.
- Raw source paths and official source ledgers remain canonical evidence.
- Headroom output is context optimization, not the only source of truth.
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
