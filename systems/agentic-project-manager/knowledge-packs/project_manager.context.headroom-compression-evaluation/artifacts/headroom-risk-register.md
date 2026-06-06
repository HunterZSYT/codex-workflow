# Headroom Risk Register

| Risk | Severity | Why It Matters | Mitigation |
| --- | --- | --- | --- |
| Proxying Codex traffic | High | Changes provider transport path and may log/transform sensitive context. | Pilot only after privacy/network review; disable logs where possible; rollback base URL/wrapper changes. |
| Wrapping Codex | High | Could alter every request and make failures hard to attribute. | Do not wrap by default; test narrower MCP/library mode first. |
| `headroom learn` writes to context files | High | Conflicts with approval-controlled workflow and AGENTS.md bloat rules. | Dry-run/review only; no writes without explicit approval. |
| Local CCR/original stores | High | Originals may contain secrets or private tool output. | Keep local-only; verify paths; redact or avoid sensitive fixtures. |
| Telemetry default | Medium | Anonymous telemetry is still an explicit privacy decision. | Set telemetry off unless user approves. |
| Memory system overlap | Medium | May conflict with existing memory/knowledge registry and learning ledgers. | Treat as comparison, not replacement. |
| Benchmark mismatch | Medium | Official savings may not match this workflow's outputs. | Run local sanitized benchmarks before adoption. |
| Package version skew | Medium | PyPI/GitHub showed 0.23.0 while npm showed 0.22.4. | Pin and verify package versions during active-layer verification or pending-mode expansion. |
| Optional heavy dependencies | Medium | ML/memory/image extras may pull large native/ML packages. | Use minimal extras; avoid `[all]` unless approved. |
