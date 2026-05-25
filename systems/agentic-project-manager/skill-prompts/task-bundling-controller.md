# Task Bundling Controller

Purpose: decide what can be bundled and what must be isolated.

Bundle when tasks have the same work type, same files/area, same verification method, low risk, and easy rollback.

Do not bundle when one task is visual and another backend/database; one task needs screenshot and another needs API test; one task is security/database/server/deployment; shared components are affected; user asked for one exact issue; or tasks have different risk levels.
