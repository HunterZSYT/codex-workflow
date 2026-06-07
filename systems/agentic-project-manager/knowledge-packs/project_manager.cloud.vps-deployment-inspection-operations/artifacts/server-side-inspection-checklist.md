# Server-Side Inspection Checklist

## Connection

- Confirm SSH target.
- Confirm user/host.
- Confirm environment type.
- Avoid storing or printing secrets.

## Inventory

- OS/version.
- Disk/memory.
- Web server.
- PHP/Node/Python/runtime versions.
- Services.
- Process manager.
- Firewall status, read-only.
- SSL certificate status, read-only.
- Domain/vhost mapping.
- Webroot.
- Active app/CMS/theme.
- Deployment method.
- Cache layers.

Useful read-only tools:

```powershell
node C:\Users\acer\.codex\agentic-backend-database\tools\remote-ssh-inventory.mjs
bash C:\Users\acer\.codex\agentic-backend-database\tools\vps-ssh-inspect.sh <ssh-target>
bash C:\Users\acer\.codex\agentic-backend-database\tools\vps-service-map.sh <ssh-target>
bash C:\Users\acer\.codex\agentic-backend-database\tools\vps-webserver-map.sh <ssh-target>
bash C:\Users\acer\.codex\agentic-backend-database\tools\vps-log-map.sh <ssh-target>
bash C:\Users\acer\.codex\agentic-backend-database\tools\vps-db-map.sh <ssh-target>
bash C:\Users\acer\.codex\agentic-backend-database\tools\vps-backup-check.sh <ssh-target>
```

## Logs

- Web server error/access logs.
- PHP/app logs.
- System service logs.
- Deployment logs.
- Database logs if needed.
- Use Headroom for huge logs only after secret safety review.

## Security

- File permissions quick check.
- Exposed `.env` or config files.
- Directory listing risk.
- Debug mode.
- Outdated runtime warnings.
- Open ports read-only.
- Suspicious writable webroot areas.
- Backup files exposed in public directories.
- Security headers from public URL.
- SSL/TLS basics.

## Database

- Detect engine.
- Inspect only after approval if credentials are needed.
- No destructive SQL.
- Backup before migrations.

## WordPress-Specific If Detected

- Active theme/child theme.
- Plugin list if WP-CLI is available and read-only use is approved.
- `wp-config.php` safety without printing secrets.
- Debug mode.
- Uploads/cache directories.
- WooCommerce template overrides.
- Theme functions/assets/templates.
- WP cron/cache issues.
- No admin password handling in synced logs.
