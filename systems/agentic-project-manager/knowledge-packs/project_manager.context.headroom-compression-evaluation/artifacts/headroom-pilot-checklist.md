# Headroom Pilot Checklist

- Confirm user approval for a pilot.
- Confirm no global install is required.
- Use a sandbox workspace, not `codex-workflow`.
- Use sanitized fixtures only.
- Disable telemetry or record explicit acceptance.
- Record exact generated files and stores.
- Test one mode only: library, MCP, proxy, or wrapper.
- Measure token reduction, latency, and correctness.
- Verify CCR retrieval works if CCR is in scope.
- Verify no secrets appear in logs/stores.
- Remove generated files after pilot.
- Do not promote candidate pack until audit and user approval.
