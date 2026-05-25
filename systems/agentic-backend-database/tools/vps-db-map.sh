#!/usr/bin/env bash
set -u
TARGET="${1:-}"; [ -z "$TARGET" ] && { echo "Usage: bash vps-db-map.sh user@host-or-alias"; exit 1; }
OUTDIR=".ai-task"; [ -d "$OUTDIR" ] || OUTDIR="ai-server-reports"; mkdir -p "$OUTDIR"; OUT="$OUTDIR/vps-db-map.md"
ssh "$TARGET" 'set +e
echo "## DB binaries"; for c in psql postgres mysql mariadb sqlite3 mongosh mongo redis-cli; do command -v "$c" >/dev/null && echo "$c: $(command -v "$c")"; done
echo "## DB services"; command -v systemctl >/dev/null && systemctl list-units --type=service --all --no-pager | egrep "postgres|mysql|mariadb|mongo|redis" || true
echo "## DB ports"; (ss -tulpn 2>/dev/null || netstat -tulpn 2>/dev/null) | egrep "5432|3306|27017|6379" || true
echo "## config locations"; ls -la /etc/postgresql /var/lib/postgresql /etc/mysql /etc/mongodb* /etc/redis 2>/dev/null
echo "No database connections were attempted."
' > "$OUT"; echo "$OUT"
