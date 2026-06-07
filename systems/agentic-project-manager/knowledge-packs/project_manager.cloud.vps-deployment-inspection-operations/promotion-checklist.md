# Promotion Checklist

Date: 2026-06-07

Status: active.

Checklist:
- Pack has `pack.yaml`, README, source ledger, research, decisions, specs, verification, examples, activation review, enrichment history, and this checklist.
- Pack is artifact-backed with 8 reusable workflow artifacts.
- Registry entry exists with trigger terms, aliases, artifact paths, owner skill, verification method, and active status.
- Owner routing points to `task-routing-and-skill-selection`.
- Execution ledger and verification gate include short pointers to this pack.
- Source ledger references existing local tools and safety skills rather than unverified external claims.
- The pack is dynamic for arbitrary cloud/VPS/domain/public URL targets, not a single test domain.
- Real SSH access, installs, deployments, restarts, config edits, database writes, firewall changes, cache clears, and production changes remain approval-gated.
- Screenshots, logs, domain details, server inventory, and URL artifacts remain local-only unless sanitized and explicitly approved.
- Headroom is allowed only for large logs/context/research artifacts.
- last30days is allowed only for current signal/source discovery, with durable facts verified against official docs/repos before knowledge updates.

AI audit outcome:
- Activate as safe orchestration knowledge because it only routes existing read-only-first inspection, verification, and approval gates.
- Do not treat it as permission to run server-changing commands.
