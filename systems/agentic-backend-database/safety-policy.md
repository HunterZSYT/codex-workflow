# Backend / Database / VPS Safety Policy

Default mode: **read-only inspection first**.

Never automatically:

- print secrets
- store passwords
- hardcode credentials
- modify `.env` files
- connect to production databases
- run migrations
- run destructive SQL
- restart production services
- edit Nginx/Apache/Caddy configs
- edit systemd services
- edit Docker compose files
- change firewall rules
- delete files on VPS
- overwrite backups
- run `DROP`, `TRUNCATE`, `DELETE`, `ALTER`, or `RENAME` commands
- assume a database/server is disposable

Any write/destructive/server-changing operation requires:

1. explicit user approval
2. target confirmation
3. backup check
4. rollback plan
5. command preview
6. verification plan

Do not expose secret values in reports. Report variable names, file paths, command previews, and risk categories only.
