# User Response Ledger

The User Response Ledger captures short, sanitized summaries of task-relevant user feedback during iterative work.

It is not a transcript store. Do not copy full conversations into it.

## Purpose

Use this ledger when the user response changes the task direction, approves work, rejects work, reports a bug, gives a style/content/workflow preference, or creates a reusable rule candidate.

Do not log every small message. Log only useful feedback signals.

## Location

This workflow extends the existing Project Manager `.ai-task` pattern:

```text
.ai-task/user-response-ledger.md
```

The file is task-local and ignored by Git. Sanitized lessons may later be promoted into docs, skills, or memory candidates after review.

## Signal Types

- `approval`: user accepted the result or part of it.
- `correction`: user asked to fix something wrong.
- `modification_request`: user asked to change or adjust something.
- `style_preference`: user expressed a design, content, or workflow preference.
- `rejection`: user rejected the output or direction.
- `bug_report`: user reported broken behavior, visual issue, layout issue, error, or mismatch.
- `scope_change`: user expanded, reduced, or changed the task.
- `decision`: user made a clear architectural, tool, or workflow decision.
- `reusable_rule_candidate`: user said something that may become a future reusable rule, memory, skill rule, or docs update.
- `blocked_or_unclear`: user response indicates confusion, blocker, missing context, or ambiguity.

Multiple signal types can be recorded when useful, for example:

```text
style_preference, modification_request
```

## Entry Schema

```text
## 2026-05-26T18:00:00+06:00
Task ID:
Related artifact:
Artifact type:
User signal type:
User feedback summary:
Direct user phrase short:
Interpreted action:
Change made or next action:
Status after response:
Reusable preference candidate:
Should update memory or skill:
Safety notes:
Linked files changed:
Verification after change:
```

## Examples

### Premium Hero Feedback

User says: "make the hero more premium and less empty"

- Type: `style_preference, modification_request`
- Action: revise hero density, typography, spacing, and visual hierarchy.
- Reusable candidate: `maybe`

### Desktop Accepted, Mobile Added

User says: "this is okay, now add mobile version"

- Type: `approval, scope_change`
- Action: keep current desktop direction, add responsive pass.
- Reusable candidate: `no`

### Avoid Generic Cards

User says: "don't use this kind of generic card layout again"

- Type: `rejection, reusable_rule_candidate`
- Action: avoid generic card layout in related future work.
- Reusable candidate: `yes`

### Broken Button

User says: "button is not working"

- Type: `bug_report`
- Action: inspect event handler, routing, or state; run focused verification.
- Reusable candidate: `no`

### Style Approved

User says: "yes this style is good, keep this for the rest"

- Type: `approval, style_preference, reusable_rule_candidate`
- Action: reuse style direction across remaining screens.
- Reusable candidate: `yes`

## Safety Rules

Never log:

- secrets, tokens, API keys, private keys, passwords
- `.env` values
- server URLs with credentials
- SSH details
- database URLs
- cookies or auth headers
- private screenshots or sensitive logs
- full raw conversation transcripts

If a response contains sensitive/private information, redact it or skip logging it.

## Promotion Rules

One-off feedback stays task-local.

Repeated feedback or explicit reusable-rule language may be promoted after review to:

- Project Manager learning docs
- a skill update candidate
- a memory update request
- `codex-workflow` docs
- a tiny `AGENTS.md` router note, only when genuinely broad

Do not automatically rewrite skills from one response.
