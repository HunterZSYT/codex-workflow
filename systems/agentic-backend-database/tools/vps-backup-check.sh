#!/usr/bin/env bash
set -u
TARGET="${1:-}"; [ -z "$TARGET" ] && { echo "Usage: bash vps-backup-check.sh user@host-or-alias"; exit 1; }
OUTDIR=".ai-task"; [ -d "$OUTDIR" ] || OUTDIR="ai-server-reports"; mkdir -p "$OUTDIR"; OUT="$OUTDIR/vps-backup-check.md"
ssh "$TARGET" 'set +e
echo "## backup dirs"; for d in /backups /backup /var/backups /home/backups /srv/backups; do [ -e "$d" ] && { echo "### $d"; ls -lah "$d" | head -80; }; done
echo "## dump/archive hints"; find /backups /backup /var/backups /home /srv -maxdepth 4 \( -name "*.sql" -o -name "*.dump" -o -name "*.gz" -o -name "*.zip" -o -name "*.tar" -o -name "*.tgz" \) 2>/dev/null | head -120
echo "## cron backup hints"; (crontab -l 2>/dev/null; grep -R "backup\|dump" /etc/cron* 2>/dev/null) | head -120
echo "No backups were created or modified."
' > "$OUT"; echo "$OUT"
