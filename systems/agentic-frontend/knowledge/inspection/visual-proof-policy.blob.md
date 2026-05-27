# Knowledge Blob: Visual Proof Policy

Blob ID: visual-proof-policy

Owner system: agentic-frontend

Owner skill: frontend-inspection-discipline

Capability: Rendered evidence for frontend visual, responsive, sticky, overflow, and interaction claims.

Trigger phrases:
- inspect
- screenshot
- mobile
- responsive
- sticky
- overflow
- visual proof
- looks broken
- verify UI

When to use:
- Use before claiming visual correctness, mobile correctness, sticky behavior, overflow absence, or interaction state.

When not to use:
- Do not require screenshots for copy-only changes unless layout risk is introduced.

External libraries/tools:
- Browser/Chrome connector
- local frontend inspect script when available

Required docs source:
- Context7:
- Official docs:
- GitHub/npm:
- Last verified: 2026-05-28

Best-practice rules:
- Inspect the actual rendered URL and state.
- Use mobile emulation for mobile claims.
- Use DOM/CSS measurement for overflow, sticky, size, and alignment claims.
- Treat screenshots of unreachable/error pages as invalid evidence.
- Stop after two failed verification attempts and report uncertainty.

Implementation pattern:
- Start local dev server if needed.
- Capture desktop and relevant mobile viewport.
- Measure target selectors when the claim is geometric.
- Re-run the same inspection after a fix.

Anti-patterns:
- Saying "looks good" without fresh rendered evidence.
- Treating desktop resize as mobile proof.
- Using broad QA when the task asks for one narrow claim.

Security/safety notes:
- Do not sync screenshots that may contain private data.

Verification method:
- Screenshot path plus JSON/DOM measurement path when available.
- Report viewport, URL, final state, and finding.

Generated/local artifacts:
- `_qa*` folders and screenshots are local task artifacts unless sanitized.

Micro-update history:
- 2026-05-28: Initial blob created from existing frontend inspection discipline.

Safe to sync to codex-workflow:
yes
