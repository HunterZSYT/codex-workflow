#!/usr/bin/env bash
set -u
TARGET="${1:-}"; [ -z "$TARGET" ] && { echo "Usage: bash vps-webserver-map.sh user@host-or-alias"; exit 1; }
OUTDIR=".ai-task"; [ -d "$OUTDIR" ] || OUTDIR="ai-server-reports"; mkdir -p "$OUTDIR"; OUT="$OUTDIR/vps-webserver-map.md"
ssh "$TARGET" 'set +e
echo "## installed"; for c in nginx apache2 httpd caddy; do command -v "$c" >/dev/null && { echo "$c"; "$c" -v 2>&1 || "$c" version 2>&1; }; done
echo "## nginx paths"; ls -la /etc/nginx 2>/dev/null; ls -la /etc/nginx/sites-enabled 2>/dev/null; ls -la /etc/nginx/conf.d 2>/dev/null
echo "## apache paths"; ls -la /etc/apache2 2>/dev/null; ls -la /etc/apache2/sites-enabled 2>/dev/null; ls -la /etc/httpd 2>/dev/null
echo "## caddy paths"; ls -la /etc/caddy 2>/dev/null
echo "## document roots hints"; grep -R "root \|DocumentRoot\|reverse_proxy" /etc/nginx /etc/apache2 /etc/httpd /etc/caddy 2>/dev/null | head -120
echo "## SSL path hints"; grep -R "ssl_certificate\|SSLCertificate\|tls " /etc/nginx /etc/apache2 /etc/httpd /etc/caddy 2>/dev/null | head -80
' > "$OUT"; echo "$OUT"
