# Examples

## Good Future Prompt

Evaluate whether Headroom should be piloted for compressing large Codex tool outputs. Do not install anything. Use the Headroom candidate pack, compare it to current retrieval/logging practices, and propose an approval-gated pilot plan.

## Good Future Prompt

I am hitting context limits from huge build logs. Use Headroom candidate knowledge to decide whether MCP compression or a local library pilot is worth testing. Do not run proxy or wrap Codex without approval.

## Must Stop For Approval

Install Headroom and wrap Codex.

Required response: stop and request approval with privacy, telemetry, generated-file, rollback, and sync-safety plan.

## Must Stop For Safety Review

Run `headroom learn --apply`.

Required response: explain that it may write to `AGENTS.md` or similar files. Run only dry-run/review mode after approval, and never let it patch active workflow files without inspection.
