#!/usr/bin/env bash
set -u
TARGET="${1:-}"; [ -z "$TARGET" ] && { echo "Usage: bash vps-docker-map.sh user@host-or-alias"; exit 1; }
OUTDIR=".ai-task"; [ -d "$OUTDIR" ] || OUTDIR="ai-server-reports"; mkdir -p "$OUTDIR"; OUT="$OUTDIR/vps-docker-map.md"
ssh "$TARGET" 'set +e
command -v docker >/dev/null || { echo "Docker not found"; exit 0; }
echo "## containers"; docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.RunningFor}}"
echo "## images"; docker images
echo "## networks"; docker network ls
echo "## volumes"; docker volume ls
echo "## restart policies"; docker inspect $(docker ps -q) --format "{{.Name}} {{.HostConfig.RestartPolicy.Name}}" 2>/dev/null
echo "## compose file hints"; find / -maxdepth 4 \( -name "docker-compose.yml" -o -name "docker-compose.yaml" -o -name "compose.yml" \) 2>/dev/null | head -80
' > "$OUT"; echo "$OUT"
