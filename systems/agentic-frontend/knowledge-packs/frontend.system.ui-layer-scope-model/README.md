# Frontend UI Layer Scope Model

Status: candidate.

This pack defines how frontend tasks should be routed by UI layer, UI scope, owner skill/blob/pack, and verification requirement.

It does not replace existing frontend skills. It coordinates them.

Core philosophy:

1. Reuse first.
2. Orchestrate second.
3. Generate last.

Use this pack when a frontend task is broader than a one-file local edit, mixes multiple UI systems, or needs scope-aware decisions across button, card, section, page, template, or site/system levels.

Do not use this pack to bloat task handling for tiny copy or single-property changes.

