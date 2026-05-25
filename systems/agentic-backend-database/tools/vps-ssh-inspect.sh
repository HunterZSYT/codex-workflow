#!/usr/bin/env bash
set -u
TARGET="${1:-}"
[ -z "$TARGET" ] && { echo "Usage: bash vps-ssh-inspect.sh user@host-or-alias"; exit 1; }
OUTDIR=".ai-task"; [ -d "$OUTDIR" ] || OUTDIR="ai-server-reports"; mkdir -p "$OUTDIR"
OUT="$OUTDIR/vps-inspection.md"
ssh "$TARGET" 'set +e
echo "## Identity"; whoami; hostname; uptime; uname -a; [ -r /etc/os-release ] && cat /etc/os-release
echo "## Disk"; df -h
echo "## Memory"; free -h 2>/dev/null
echo "## Process Summary"; ps aux --sort=-%mem | head -25
echo "## Running Services"; command -v systemctl >/dev/null && systemctl list-units --type=service --state=running --no-pager | head -80
echo "## Ports"; (ss -tulpn 2>/dev/null || netstat -tulpn 2>/dev/null) | head -80
echo "## Docker"; command -v docker >/dev/null && docker ps
echo "## Versions"; for c in nginx apache2 httpd caddy php node npm pm2 psql mysql sqlite3 mongosh redis-cli; do command -v "$c" >/dev/null && { echo "### $c"; "$c" -v 2>&1 || "$c" --version 2>&1 || "$c" version 2>&1; }; done
' > "$OUT"
echo "$OUT"
