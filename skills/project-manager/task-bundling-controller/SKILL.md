---
name: task-bundling-controller
description: Use to decide what can be bundled and what must be isolated. Bundles same-type low-risk work with the same files and verification, and isolates visual/backend/database/security/server/deployment tasks with different risk or verification methods.
---

# Task Bundling Controller

Bundle only when same work type, same files/area, same verification method, low risk, and easy rollback. Do not bundle visual with backend/database, screenshot tasks with API test tasks, security/database/server/deployment tasks, shared component changes, exact single-issue requests, or tasks with different risk levels.
