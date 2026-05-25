#!/usr/bin/env bash
set -u
TARGET="${1:-}"; [ -z "$TARGET" ] && { echo "Usage: bash vps-log-map.sh user@host-or-alias"; exit 1; }
OUTDIR=".ai-task"; [ -d "$OUTDIR" ] || OUTDIR="ai-server-reports"; mkdir -p "$OUTDIR"; OUT="$OUTDIR/vps-log-map.md"
ssh "$TARGET" 'set +e
echo "## /var/log"; ls -lah /var/log 2>/dev/null | head -100
echo "## web logs"; ls -lah /var/log/nginx /var/log/apache2 /var/log/httpd /var/log/caddy 2>/dev/null
echo "## php logs"; find /var/log -maxdepth 3 -iname "*php*" 2>/dev/null | head -60
echo "## app log hints"; find /var/www /srv /opt /home -maxdepth 4 \( -iname "*.log" -o -type d -iname "logs" \) 2>/dev/null | head -100
echo "## pm2 log hints"; command -v pm2 >/dev/null && pm2 jlist 2>/dev/null | head -20
echo "Docker logs are not dumped here. Use docker logs --tail N <container> only when requested."
' > "$OUT"; echo "$OUT"
