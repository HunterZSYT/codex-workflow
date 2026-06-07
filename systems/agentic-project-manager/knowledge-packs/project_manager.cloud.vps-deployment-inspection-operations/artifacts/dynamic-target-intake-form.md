# Dynamic Target Intake Form

Use this form for any hosted site, app, VPS, cloud server, staging URL, live domain, or public URL QA task.

## Required Fields

- Target domain or URL.
- Task goal.
- Environment type: production, staging, test, or unknown.
- SSH alias or SSH connection string if server work is needed.
- Approval level: inspect-only, prepare-plan, or execute-approved-changes.

## Optional Fields

- Webroot path.
- Stack: WordPress, WooCommerce, Laravel, Node, Next.js, PHP, static, unknown.
- Hosting panel: CyberPanel, cPanel, HestiaCP, Coolify, Docker, raw VPS, unknown.
- Web server: Nginx, Apache, OpenLiteSpeed, unknown.
- Database engine: MySQL/MariaDB/Postgres/SQLite/unknown.
- Cache/CDN: Cloudflare, LiteSpeed Cache, Redis, page cache, unknown.
- Repo/deployment method.
- Backup method.
- Admin credentials location if the user says credentials are available, but do not request secret values in the prompt.
- Pages to inspect.
- Devices/viewports to inspect.
- Selectors/interactions to inspect.

## Production-Safe Default

If the environment is production or unknown, treat it as production-safe mode until the user confirms otherwise.

## Secret Handling

Do not ask the user to paste passwords, tokens, private keys, cookies, database URLs, `.env` values, or admin secrets. Ask for where credentials are managed only when needed, and report names/locations without values.
