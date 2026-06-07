# Decisions

1. Name the workflow `Cloud/VPS Deployment Inspection Operations`, not test-domain workflow.
2. Keep the workflow dynamic across domains, VPS hosts, staging/live URLs, panels, CMSs, and web stacks.
3. Make the pack active because it only orchestrates existing safe tools and approval gates.
4. Treat URL-only tasks as public URL inspection mode.
5. Treat SSH-only tasks as SSH read-only inspection mode.
6. Treat URL plus SSH/VPS context as full cloud/VPS deployment inspection workflow.
7. Treat production or unknown environment as production-safe mode.
8. Keep implementation, deployment, restarts, SQL, migrations, firewall, cache clears, and config edits approval-gated.
9. Use Headroom for huge logs/context only when secret safety is satisfied.
10. Use last30days only for current external tool/source research.
