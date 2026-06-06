# Headroom Benchmark Plan

Use for active global context layer evaluation and pending-mode expansion review.

## Fixtures

- Sanitized JSON/API result with hundreds of rows.
- Sanitized build/test log with at least one failure.
- Sanitized ripgrep output.
- Sanitized diff.
- Sanitized multi-agent handoff document.

## Metrics

- input tokens
- output/compressed tokens
- savings percent
- p50/p95 latency if repeated
- correctness: did required facts survive?
- CCR: can the original be retrieved?
- generated files and logs
- telemetry state

## Comparison Baseline

Compare Headroom against current low-cost practices:

- narrower `rg` searches
- summarized test/build output
- targeted file reads
- Project Manager retrieval index
- task-local ledgers and reports

Keep Headroom active only where it improves real workflow outcomes, not just token counts.
