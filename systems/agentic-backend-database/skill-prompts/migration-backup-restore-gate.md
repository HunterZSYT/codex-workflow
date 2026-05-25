# Migration Backup Restore Gate

Use for migrations, backups, and restores.

Rules: no migration without backup/rollback awareness; inspect migration file first; flag destructive operations; suggest dry-run where supported; verify migration status; never drop data casually; restore operations require explicit target confirmation.
