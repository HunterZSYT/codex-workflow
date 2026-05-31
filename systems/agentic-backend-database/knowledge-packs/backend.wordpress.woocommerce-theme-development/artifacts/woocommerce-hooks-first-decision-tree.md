# WooCommerce Hooks-First Decision Tree

1. Can a WooCommerce block setting or template solve it?
   - Use that first for block themes.
2. Can an action/filter hook solve it?
   - Prefer hooks. They avoid copied templates and upgrade drift.
3. Does the markup structure itself need to change?
   - Use a child-theme template override.
4. Is the change inside WooCommerce plugin files?
   - Stop. Do not edit plugin templates directly.
5. Is the site live?
   - Require backup/rollback and checkout verification.
