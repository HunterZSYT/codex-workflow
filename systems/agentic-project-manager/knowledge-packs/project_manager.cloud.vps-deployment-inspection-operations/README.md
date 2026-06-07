# Cloud/VPS Deployment Inspection Operations

Reusable active workflow for working safely with cloud/VPS-hosted websites and apps when the user provides a domain, public URL, SSH target, VPS details, webroot path, stack/CMS info, or deployment/debugging/security/performance/visual QA goal.

This is not a single-domain workflow. It is dynamic and applies to any domain, VPS, staging/live URL, cloud server, hosting panel, CMS, framework, or web stack.

## Core Rule

Read-only inspection first. Any write/server-changing action requires target confirmation, backup or snapshot check, command preview, rollback plan, verification plan, and explicit user approval.

## Use This Pack When

- A task mentions a public URL, staging URL, live domain, hosted website, VPS, cloud server, SSH, webroot, Nginx, Apache, OpenLiteSpeed, SSL, DNS, CDN, cache, server logs, deployment, rollback, or production-safe mode.
- A WordPress/WooCommerce/PHP/Laravel/Node/Next/static site is hosted on a VPS or cloud server.
- The user asks for public URL visual QA, mobile overflow debugging, performance review, security hardening, deployment debugging, or server log analysis.

## Do Not Use This Pack To

- Run SSH commands against a real server during knowledge setup.
- Authorize changes on a server without approval.
- Store or print secrets.
- Run intrusive/offensive security scans.
- Sync screenshots, logs, private URLs, admin pages, or server output unless sanitized and explicitly approved.
