# Evdance — Technical Stack Decisions

> **Status:** Accepted
> AI agents must not replace these technologies without an explicit architecture decision.

## Monorepo

```text id="x2k91a"
pnpm workspaces
+
Turborepo
```

Reasons:

* fast package management
* workspace dependency management
* shared packages
* build/test caching
* good fit for multiple JS/TS applications

## Applications

```text id="p8e2mn"
apps/
├── backend       NestJS
├── admin         Next.js
├── super-admin   Next.js
├── desktop       Electron + Next.js
└── mobile        React Native CLI
```

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
pnpm
```

Commit:

```text id="a1lm8k"
pnpm-lock.yaml
```

Do not generate npm/yarn/bun lockfiles.

## Dependency Rule

Before installing anything new:

```text id="d6a7qs"
Check existing dependency
→ check platform capability
→ justify package
→ install centrally/appropriately
```
