# WordPress Theme Current Signal: June 2026

Date checked: 2026-06-07

## Current Signal

The most useful recent community signal came from a 2026-05-31 r/Wordpress thread about agency WordPress development in 2026. The thread is not technical authority, but it is a useful workflow signal: agencies are trying to move old MAMP/FTP/live-staging habits toward Local/DDEV/wp-env, Git, PRs, CI checks, staging-to-production deploys, and Roots/Sage-style modern stacks when the team can handle the complexity.

The `last30days` runs for WooCommerce theme development were low-quality for this exact query. The engine had Reddit/Hacker News only, Reddit public search returned 403 and fell back to RSS, and most returned items were unrelated. Treat those outputs as negative/weak signal, not evidence against the domain.

## GitHub Activity Leads

GitHub API snapshot saved at `.ai-task/official-wordpress-ecommerce/github-repo-activity.json`.

- `WordPress/wordpress-develop`: active, pushed 2026-06-06.
- `WordPress/gutenberg`: active, pushed 2026-06-07.
- `WordPress/create-block-theme`: active, pushed 2026-06-05.
- `roots/sage`, `roots/bedrock`, `roots/trellis`: active, pushed 2026-06-01.
- `Automattic/_s`: known classic reference, but its own repo description says inactive; do not recommend it as the default starter for new builds.

## Knowledgebase Decision

Keep the existing pack active. Add this operational preference:

1. For new custom themes, choose block-theme/FSE or Sage-style modern workflow deliberately; do not default to legacy starter patterns.
2. For existing agency/theme estates, prioritize safer workflow upgrades first: local dev, Git, staging, deploy automation, backups, and source-controlled theme assets.
3. Do not rewrite an existing revenue site just because block themes are current; inspect the active theme, WooCommerce usage, database/content ownership, and deployment constraints first.
