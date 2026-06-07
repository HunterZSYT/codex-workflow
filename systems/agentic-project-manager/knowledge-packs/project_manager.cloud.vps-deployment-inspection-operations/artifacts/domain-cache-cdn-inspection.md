# Domain, Cache, and CDN Inspection

## Checks

- DNS basics if public.
- Final URL and redirect chain.
- SSL certificate basics.
- Cloudflare/CDN presence if detectable.
- Cache headers.
- Browser cache behavior.
- WordPress cache plugin clues.
- Server cache.
- Object cache.
- Page cache.

## Cache Clear Rule

Cache clearing changes runtime behavior. Do not clear Cloudflare/CDN, LiteSpeed, Redis, object cache, page cache, plugin cache, or server cache without approval.

## When Cache Clearing May Be Needed

- Public URL still shows old assets after deployment.
- CSS/JS fixes do not appear after confirmed file change.
- CDN serves stale 4xx/5xx assets.
- WooCommerce cart/checkout behavior suggests bad page cache rules.

## Verification After Cache Clear

- Re-run public URL inspection.
- Confirm final URL and cache headers.
- Confirm expected asset versions.
- Check logs if available.
