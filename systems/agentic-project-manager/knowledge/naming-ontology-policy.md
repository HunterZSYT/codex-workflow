# Naming and Ontology Policy

## Namespace Format

Use:

`domain.capability_class.specific_pattern`

Examples:

- `frontend.layout.swiss-editorial-grid`
- `frontend.layout.premium-agency-rhythm`
- `frontend.motion.gsap-react-scrolltrigger`
- `frontend.motion.lenis-scroll-sync`
- `frontend.components.shadcn-primitives`
- `backend.email.phpmailer-form-handler`
- `backend.database.sql-safety`
- `vps.webserver.nginx-edit-safety`
- `project_manager.retrieval.knowledge-index`

## Creation Gate

Before creating a new blob, pack, artifact, script, tool, doc, or skill:

1. Run retrieval search.
2. Run related lookup.
3. Run dedupe check when overlap is plausible.
4. Check candidate/stale entries.
5. Decide: update existing, merge/cross-reference, create candidate, create artifact, create new pack, or do nothing.

## Naming Rules

Names must include:

- domain
- capability class
- specific pattern

Avoid vague names:

- `modern-ui`
- `cool-layout`
- `premium-design`
- `best-system`

Use aliases for older or natural-language names instead of renaming stable IDs without review.
