# Improvement Notes

- Keep project-manager tools dependency-free unless a concrete repeated workflow requires a small dependency.
- If `.ai-task` files become too noisy, tighten medium/large/risky thresholds in `pm-lib.mjs`.
- If repeated project types emerge, extend `pm-classify-task.mjs` routing rules.
- If verification is often overused, update `verification-gate-controller`.
- If task packets are too broad, update `task-bundling-controller` and `task-roadmap-orchestrator`.
- Re-run `project-manager-health-check.mjs` after modifying frontend/backend system paths.
