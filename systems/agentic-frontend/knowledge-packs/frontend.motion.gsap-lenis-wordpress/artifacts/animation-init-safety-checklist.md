# Animation Init Safety Checklist

- [ ] Init runs after DOM targets exist.
- [ ] Init is scoped to a root/container when possible.
- [ ] Re-init is blocked or old instances are killed.
- [ ] Event listeners are removed if the environment does partial navigation.
- [ ] ScrollTrigger instances are cleaned up when replacing page content.
- [ ] Custom code does not assume React cleanup unless React is actually used.
