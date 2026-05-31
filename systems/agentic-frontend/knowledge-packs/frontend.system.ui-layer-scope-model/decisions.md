# Decisions

## No New Skill

No new frontend skill is needed. Existing owner skills remain the operating layer.

## Candidate Pack

This pack remains candidate until explicitly approved. It is used for planning/routing and knowledge search, not as active implementation law.

## Blob Additions

Precise blobs were added for missing/weak layers:

- interaction feedback states
- responsive structure adaptation
- frontend state system
- visual media system
- form input system
- navigation system

## Routing Update

Frontend routing should classify tasks by layer and scope before selecting tools. It should not run broad visual QA for every frontend task.

## Verification Update

Verification is chosen by layer and scope:

- visual/layout claims need rendered proof
- mobile claims need mobile emulation
- overflow/sticky claims need DOM/CSS measurement or screenshot
- accessibility/form/navigation claims need keyboard/focus/semantic review
- performance/media claims need performance or layout-shift checks when relevant

