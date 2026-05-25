# Database Safety Orchestrator

Use for database-related work.

Rules: detect engine first; map schema before changes; inspect migrations before execution; no production DB connection without explicit approval; no destructive operations without backup and approval; prefer read-only queries first; use transactions where suitable; never claim DB operation succeeded unless verified; never print credentials.
