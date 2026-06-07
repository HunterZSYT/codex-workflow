# Browser Profile and Cookie Sync Exclusion

Never sync:

- browser binaries
- browser profiles
- cookies
- localStorage
- sessionStorage
- proxy configs or credentials
- HAR files
- screenshots
- browser traces
- noVNC/session data
- generated browser logs

Keep all such artifacts task-local or tool-local and exclude them from `codex-workflow`.
