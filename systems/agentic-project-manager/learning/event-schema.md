# Structured Event Schema

## Purpose

Structured events give Project Manager a local evidence trail for learning without syncing raw logs or private task data.

## Event Types

- `task.started`
- `task.classified`
- `retrieval.query`
- `retrieval.result`
- `knowledge.sufficiency`
- `skill.selected`
- `blob.selected`
- `pack.selected`
- `tool.selected`
- `mcp.selected`
- `command.run`
- `command.failed`
- `file.changed`
- `verification.run`
- `verification.failed`
- `error.detected`
- `user.feedback`
- `improvement.candidate`
- `lesson.promoted`
- `knowledge.patch.candidate`
- `task.completed`

## Fields

| Field | Required | Notes |
|---|---|---|
| `event_id` | yes | Stable unique ID for the event. |
| `task_id` | yes | Task-local or generated task ID. |
| `timestamp` | yes | ISO timestamp. |
| `event_type` | yes | One of the event types above. |
| `phase` | no | Discovery, implementation, verification, completion, etc. |
| `category` | no | Error/learning/category label. |
| `capability` | no | Capability being exercised. |
| `owner_skill` | no | Skill responsible for the capability. |
| `blob_id` | no | Knowledge blob used or implicated. |
| `pack_id` | no | Capability pack used or implicated. |
| `tool` | no | CLI/script/tool selected. |
| `mcp` | no | MCP/server/tool selected. |
| `command` | no | Sanitized command string. |
| `exit_code` | no | Command exit code. |
| `evidence_summary` | no | Short sanitized evidence, not raw dumps. |
| `root_cause` | no | Classified root cause. |
| `lesson` | no | Proposed reusable lesson. |
| `severity` | no | low, medium, high, critical. |
| `source_confidence` | no | active, sourced, internal, candidate, stale, unknown. |
| `approval_required` | no | true/false. |
| `safe_to_sync` | no | true only for sanitized summary events that can become docs. Raw event logs remain unsynced. |
| `redaction_status` | yes | redacted, checked, or unsafe. |

## Storage

Raw sanitized local events:

- `C:\Users\acer\.codex\agentic-project-manager\learning\events\events.jsonl`

Task-local event mirror:

- `.ai-task/events.jsonl`

Never sync raw event stores. Promote only reviewed summaries into sanitized learning docs.
