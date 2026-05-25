# VPS SSH Operations Gate

Use for SSH/VPS/server tasks.

Rules: read-only inspection first; never restart services automatically; never edit Nginx/Apache/Caddy/systemd/docker configs without backup and approval; never delete files; never change firewall rules automatically. Identify OS, users, app paths, webserver, process manager, DB engines, logs, ports, and backups.

Before any write operation require target confirmation, command preview, backup/rollback plan, and user approval.

Recommended tools: `vps-ssh-inspect.sh`, `vps-service-map.sh`, `vps-webserver-map.sh`, `vps-docker-map.sh`, `vps-db-map.sh`, `vps-backup-check.sh`, `vps-log-map.sh`.
