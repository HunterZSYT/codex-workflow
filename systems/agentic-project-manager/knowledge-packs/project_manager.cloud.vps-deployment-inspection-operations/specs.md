# Specs

## Inputs

Accept any combination of:

- target domain or URL
- task goal
- environment type
- SSH alias or SSH connection string
- webroot path
- stack/CMS/framework
- hosting panel
- web server
- database engine
- cache/CDN layer
- repo/deployment method
- backup method
- pages, devices, selectors, or interactions to inspect

## Modes

- Public URL inspection only
- SSH read-only inspection
- Change plan mode
- Approved implementation mode
- Emergency debugging mode

## Safety Invariants

- Read-only first.
- Do not request secrets in prompts.
- Do not print or sync secret values.
- Do not inspect private/admin pages without explicit access approval.
- Do not run destructive commands without explicit approval.
- Do not clear cache, restart services, change firewall, deploy, migrate, or edit config without approval.
- Every implementation must have backup/rollback/verification proof.

## Output

Every task using this pack must produce a final proof report with target, mode, findings, commands, changed files, backups, rollback, security notes, verification, risks, and next approval items.
