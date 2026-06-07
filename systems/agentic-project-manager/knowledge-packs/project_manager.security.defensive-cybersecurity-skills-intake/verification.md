# Verification

Check:

- No external cybersecurity skill files are copied into Codex Workflow.
- Offensive procedures are rejected or restricted.
- Defensive checklist artifacts are original summaries, not copied playbooks.
- Security tasks still route through security-env-secrets-gate, backend safety gates, deployment readiness, SQL/database gates, or VPS read-only gates.
- Redaction scan passes before sync.
