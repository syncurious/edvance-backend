# Evdance — Technical Stack Decisions

> **Status:** Accepted
> AI agents must not replace these technologies without an explicit architecture decision.

## Repository Scope

This repository is the Evdance NestJS backend. The repository root is the
backend application; it is not a monorepo. Web, desktop and mobile clients are
separate consumers of the versioned API and are not implemented here.

Use Yarn directly for dependency management and project commands.

## Database

```text id="87m4kp"
Supabase PostgreSQL
```

## Database Access

Use:

```text id="4c0x2v"
Drizzle ORM
```

Drizzle is preferred because Evdance requires strong PostgreSQL control, type safety, explicit schemas and predictable SQL behavior.

Do not introduce Prisma/TypeORM alongside Drizzle.

## Migrations

Use:

```text id="k4vn5s"
Drizzle Kit
```

All database changes require migrations.

## Authentication

```text id="up0fhx"
Supabase Auth
```

NestJS verifies authentication and resolves Evdance authorization context.

## Storage

```text id="q8c9za"
Supabase Storage
```

Use through Evdance storage abstractions where appropriate.

## Runtime Validation

Backend DTO/request validation:

```text id="r6z3qn"
NestJS validation pipeline
```

Shared/config/schema validation may use:

```text id="d7o2px"
Zod
```

Do not create multiple competing validation strategies without reason.

## Logging

Use:

```text id="2b0a8q"
Pino
```

NestJS integration should provide structured logging and request correlation.

## Testing

Backend:

```text id="4qv1rx"
Jest
+
NestJS Testing Utilities
+
Supertest
```

Use integration/E2E testing where required.

## API Documentation

```text id="3j21tc"
OpenAPI / Swagger
```

generated from the NestJS API.

## Formatting

```text id="e9h41y"
Prettier
```

## Linting

```text id="zt47nd"
ESLint
+
TypeScript ESLint
```

## TypeScript

Use strict TypeScript configuration.

Avoid weakening strictness globally to fix individual typing problems.

## Node.js

Use an active Node.js LTS version supported by all selected frameworks.

Pin the version at repository level.

## Package Manager

Only:

```text id="73h2ua"
Yarn Classic (v1)
```

Commit:

```text id="a1lm8k"
yarn.lock
```

Do not generate npm/pnpm/bun lockfiles.

## Dependency Rule

Before installing anything new:

```text id="d6a7qs"
Check existing dependency
→ check platform capability
→ justify package
→ install centrally/appropriately
```
