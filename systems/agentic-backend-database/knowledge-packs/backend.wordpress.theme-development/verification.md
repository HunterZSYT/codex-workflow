# Verification

For a real WordPress theme task:

- Confirm project type: block theme, classic theme, child theme, Sage/other framework, or hybrid.
- Check changed PHP with `php -l` when PHP is touched.
- Confirm assets are enqueued through `wp_enqueue_scripts` or relevant WordPress enqueue hooks.
- Confirm no copied raw third-party theme/plugin files were added without approval.
- Inspect WordPress debug logs if available.
- Verify rendered front-end state in browser.
- For block themes, compare Site Editor output with front-end output.
- For production/live sites, use backend/VPS deployment gates, backup, rollback plan, and explicit approval.
