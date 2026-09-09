# Evdance — Database Tooling

## Database

Supabase-hosted PostgreSQL.

## ORM

Use Drizzle ORM.

## Structure

Conceptually:

```text id="s7c2pa"
infrastructure/database/
├── schema/
├── migrations/
├── database.module.ts
├── database.service.ts
└── repositories/
```

Schema may be split by domain as it grows.

Example:

```text id="l3q8mk"
schema/
├── schools.ts
├── campuses.ts
├── users.ts
├── students.ts
├── guardians.ts
└── relations.ts
```

Avoid one enormous schema file.

## Schema Ownership

Database schemas should reflect domain ownership.

Shared relationships must be clearly defined.

## Migrations

Workflow:

```text id="10wd42"
Modify schema
   ↓
Generate migration
   ↓
Review SQL
   ↓
Test locally
   ↓
Commit migration
```

Never blindly apply generated migrations without reviewing them.

## Production

Never use destructive schema synchronization against production.

Production database evolution must use reviewed migrations.

## Transactions

Use PostgreSQL transactions through the database layer for atomic workflows.

## Raw SQL

Raw SQL is allowed when it provides a legitimate advantage.

Examples:

* advanced PostgreSQL capabilities
* performance-critical queries
* constraints difficult to express cleanly

Raw SQL must still:

* use parameterization
* enforce tenant context
* be testable
* remain understandable

## Supabase

Do not use Supabase client queries throughout business modules as a replacement for the application's database layer.

Supabase Auth and Storage remain Supabase integrations.

Primary application persistence goes through the approved database architecture.

## RLS

PostgreSQL/Supabase Row Level Security may be used as defense-in-depth where appropriate.

NestJS authorization remains mandatory.

RLS must not become an excuse to remove application-level permission checks.
