# Evdance — Database Standards

> **Database:** PostgreSQL via Supabase
> **Status:** Source of Truth for database conventions

## Core Principle

The database must prioritize:

1. Tenant isolation
2. Data integrity
3. Historical accuracy
4. Query performance
5. Maintainability
6. Extensibility

## Primary Tenant

`school_id` represents the primary tenant boundary.

Tenant-owned data must always have a reliable ownership path to a school.

Cross-school relationships are prohibited unless explicitly designed as platform-level functionality.

## Identifiers

Use UUIDs for primary identifiers unless a documented reason requires otherwise.

Conceptually:

```text
id UUID PRIMARY KEY
```

Do not expose sequential database IDs as the basis of security.

## Standard Columns

Most persistent business entities should consider:

```text
id
school_id
created_at
updated_at
created_by
updated_by
```

Where applicable:

```text
campus_id
status
deleted_at
```

Not every table requires every field.

Fields should exist because they have domain or operational value—not because of blind boilerplate.

## Timestamps

Store timestamps consistently.

Prefer UTC for system timestamps.

Timezone conversion belongs at application/presentation boundaries.

School-specific timezone configuration may be introduced where required.

## Soft Deletion

Important historical/business records should generally not be physically deleted without a clear reason.

Where appropriate:

```text
deleted_at
deleted_by
```

Soft deletion must not be blindly added to every table.

Transaction/history records may instead require immutable or status-based designs.

## Historical Data

Do not overwrite historically meaningful relationships when history matters.

For example, campus transfers should preserve history rather than simply replacing:

```text
student.campus_id
```

when the product requires knowing previous campuses.

History may require dedicated records such as:

```text
student_enrollments
student_campus_history
```

Exact tables are defined by the approved schema.

## Relationships

Foreign keys should be enforced wherever practical.

Application validation does not replace database referential integrity.

Important uniqueness rules should also be enforced at database level.

## Tenant-Safe Relationships

Relationships between tenant-owned records must belong to the same tenant.

Example:

A guardian from School A must never be associated with a student from School B.

This should be protected at multiple layers where practical:

```text
API authorization
+
business validation
+
database constraints/design
```

## Authentication

Supabase:

```text
auth.users
```

contains authentication identities.

Application/domain data must remain in application-owned tables.

Do not overload `auth.users` with Evdance domain responsibilities.

## Domain Identity

Authentication identity and domain entity are separate concepts.

For example:

```text
auth.users
     │
     ▼
application user/account
     │
     ├── student
     ├── guardian
     └── employee
```

Exact mappings must follow the approved schema.

## Student Identity

A student belongs to a school tenant.

Campus transfer within the same school:

```text
same student
+
preserved history
+
new campus context
```

Transfer to another independent school:

```text
new tenant-scoped student entity
```

No automatic cross-school student data transfer.

## Guardian Relationships

Student ↔ Guardian is many-to-many.

Conceptually:

```text
students
    │
student_guardians
    │
guardians
```

Relationship-specific information belongs on the relationship where appropriate.

Examples:

* relationship type
* primary guardian
* pickup authorization
* communication preference

## Status vs Deletion

Use explicit status where business lifecycle matters.

Examples:

```text
active
inactive
graduated
withdrawn
suspended
```

Do not represent meaningful business state merely by deleting records.

## Money

Never use floating-point values for financial amounts.

Use PostgreSQL numeric/decimal or an agreed integer-minor-unit strategy.

One consistent money strategy must be used throughout the project.

## Indexing

Indexes should be designed around real query patterns.

Common candidates include:

```text
school_id
campus_id
status
created_at
foreign keys
```

Composite indexes should be considered for frequent tenant-scoped queries.

Example:

```text
(school_id, campus_id, status)
```

Do not add indexes blindly.

## Migrations

All schema changes must use migrations.

Never rely on manually changing production database structure.

A migration must be reproducible across:

```text
local
development
staging
production
```

## Constraints

Prefer database constraints for invariants the database can reliably enforce.

Examples:

* foreign keys
* uniqueness
* non-null requirements
* valid ranges
* appropriate check constraints

## Transactions

Multi-step state changes requiring all-or-nothing behavior must use transactions.

## Query Rules

Tenant queries must include tenant scope.

Unsafe:

```ts
findStudent(studentId)
```

Preferred concept:

```ts
findStudent({
  studentId,
  schoolId,
  scope
})
```

The exact repository API may differ, but tenant ownership must always be enforced.

## Schema Changes

Before changing database structure, check:

1. Can an existing column/model support the requirement?
2. Does extending it preserve its meaning?
3. Is migration required?
4. Will existing data remain valid?
5. Does it affect tenant isolation?
6. Does it affect indexes?
7. Does it affect API contracts?
8. Does documentation need updating?

Database design must not be changed casually during feature implementation.
