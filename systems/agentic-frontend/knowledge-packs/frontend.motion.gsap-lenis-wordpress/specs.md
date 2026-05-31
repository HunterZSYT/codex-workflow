# Specs

Status: candidate.

## WordPress Asset Shape

- Source JS may live in theme source assets if a build pipeline exists.
- Output JS should be compiled to a theme asset path.
- Enqueue compiled output with a stable handle.
- Declare dependencies where relevant.
- Use version/filemtime cache busting where project style supports it.

## Init Safety

- Guard if target selectors are absent.
- Avoid duplicate initialization on repeated partial loads.
- Register GSAP plugins once.
- Refresh ScrollTrigger after dynamic content/layout changes.
- Disable or simplify motion under `prefers-reduced-motion`.

## Lenis Sync Pattern

- Listen to Lenis scroll and call `ScrollTrigger.update`.
- Drive Lenis RAF through GSAP ticker if using the official integration pattern.
- Disable GSAP ticker lag smoothing if needed by the integration.
