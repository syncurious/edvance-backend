# Evdance — Environment & Configuration

## Environments

Plan for:

```text
local
development
staging
production
```

Production credentials/data must remain isolated from development.

## Environment Files

Never commit real secrets.

Provide `.env.example` files containing required variable names with safe placeholders.

Example categories:

```text
APP_ENV
PORT
DATABASE_URL

SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

LOG_LEVEL
```

For the initial School-management bootstrap, the backend also requires:

```text
SUPER_ADMIN_USER_IDS
```

This is a comma-separated allowlist of Supabase Auth user UUIDs. It is a temporary platform-access bridge while the documented Evdance domain identity and RBAC modules are introduced; it is server-only and deny-by-default when empty.

Actual variables may evolve with infrastructure.

## Validation

Every server application must validate required configuration during startup.

Missing/invalid critical configuration should fail fast.

Do not discover configuration problems during a user request.

## Public vs Private

Clearly distinguish browser-safe configuration from server-only secrets.

Server-only examples:

```text
DATABASE_URL
SUPABASE_SERVICE_ROLE_KEY
private provider secrets
```

These must never be bundled into frontend/mobile applications.

## Supabase

Use separate Supabase projects/environments where appropriate.

Never use production data as normal development data.

## Configuration Access

Avoid:

```ts
process.env.SOMETHING
```

throughout business code.

Prefer a centralized typed configuration service.

## Defaults

Safe non-sensitive defaults are acceptable.

Security-sensitive configuration should not silently fall back to insecure values.

## Secret Rotation

Design integrations so credentials can be changed without source-code changes.

## AI Rule

AI agents must never generate real credentials or commit secrets.

If credentials are required, add/document the environment variable and leave its value to deployment configuration.
