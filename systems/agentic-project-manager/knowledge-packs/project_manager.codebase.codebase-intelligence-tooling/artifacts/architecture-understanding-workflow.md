# Architecture Understanding Workflow

1. Run local retrieval for existing architecture/codebase routing.
2. If the question is precise, use CodeGraph or direct file reads.
3. If the question is broad, use Understand Anything or existing Understand skills.
4. Preserve generated outputs as local-only.
5. Summarize architecture with source file references.
6. Use task-appropriate verification before implementation.
