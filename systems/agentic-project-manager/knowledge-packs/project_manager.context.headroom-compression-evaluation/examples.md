# Examples

## Good Prompt

Analyze this huge Codex tool output with Headroom. Preserve the raw file path as canonical evidence and do not use service/proxy/MCP modes.

## Good Prompt

I am hitting context limits from huge build logs. Use the Headroom global context layer to analyze the log, then tell me whether pending service or MCP expansion would add value. Do not run proxy or wrap Codex.

## Must Stop For Approval

Install Headroom and wrap Codex.

Required response: stop and request approval with privacy, telemetry, generated-file, rollback, and sync-safety plan.

## Must Stop For Safety Review

Run `headroom learn --apply`.

Required response: explain that it may write to `AGENTS.md` or similar files. Run only dry-run/review mode after approval, and never let it patch active workflow files without inspection.
