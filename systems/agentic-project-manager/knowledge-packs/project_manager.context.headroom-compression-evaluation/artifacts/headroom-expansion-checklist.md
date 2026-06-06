# Headroom Expansion Checklist

- Confirm explicit user approval for any pending expansion mode.
- Confirm no reinstall is required when the npm SDK dependency already exists.
- Use sanitized fixtures only.
- Disable telemetry or record explicit acceptance for service/proxy/MCP modes.
- Record exact generated files and stores.
- Test one pending mode at a time: MCP, service, proxy, wrapper, or headroom_learn.
- Measure token reduction, latency, and correctness.
- Verify CCR retrieval works if CCR is in scope.
- Verify no secrets appear in logs/stores.
- Remove generated files after the expansion test.
- Do not enable proxy, wrapper, or `headroom learn` globally without rollback proof.
