#!/usr/bin/env bash
set -u
TARGET="${1:-}"; [ -z "$TARGET" ] && { echo "Usage: bash vps-service-map.sh user@host-or-alias"; exit 1; }
OUTDIR=".ai-task"; [ -d "$OUTDIR" ] || OUTDIR="ai-server-reports"; mkdir -p "$OUTDIR"; OUT="$OUTDIR/vps-service-map.md"
ssh "$TARGET" 'set +e
echo "## systemd services"; command -v systemctl >/dev/null && systemctl list-units --type=service --state=running --no-pager
echo "## pm2"; command -v pm2 >/dev/null && pm2 list
echo "## docker"; command -v docker >/dev/null && docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}"
echo "## open ports"; (ss -tulpn 2>/dev/null || netstat -tulpn 2>/dev/null)
echo "## likely app processes"; ps aux | egrep "node|npm|php-fpm|gunicorn|uvicorn|java|python|ruby|go|pm2" | head -80
echo "## cron hints"; crontab -l 2>/dev/null; ls -la /etc/cron* 2>/dev/null
' > "$OUT"; echo "$OUT"
