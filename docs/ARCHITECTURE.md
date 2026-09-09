# Evdance — System Architecture

> **Status:** Source of Truth
> **Scope:** High-level technical architecture

## Technology Stack

| Layer          | Technology          |
| -------------- | ------------------- |
| Backend        | NestJS              |
| Database       | Supabase PostgreSQL |
| Authentication | Supabase Auth       |
| Admin Portal   | Next.js             |
| Super Admin    | Next.js             |
| Desktop        | Electron + Next.js  |
| Mobile         | React Native CLI    |
| Storage        | Supabase Storage    |

## Architecture

```text
Mobile ──────────────┐
Desktop ─────────────┤
Admin Portal ────────┼──► NestJS API ───► PostgreSQL
Super Admin ─────────┘        │
                              ├── Supabase Auth
                              ├── Supabase Storage
                              └── External Services
```

NestJS is the primary business-logic boundary.

Clients must not bypass backend business rules for sensitive application operations.

## Backend Structure

Use a modular NestJS architecture.

```text
src/
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── pipes/
│   ├── exceptions/
│   ├── constants/
│   └── utils/
│
├── config/
├── infrastructure/
│   ├── database/
│   ├── supabase/
│   ├── storage/
│   └── integrations/
│
├── modules/
│   ├── auth/
│   ├── schools/
│   ├── campuses/
│   ├── users/
│   ├── roles/
│   ├── students/
│   ├── guardians/
│   └── ...
│
├── app.module.ts
└── main.ts
```

Modules should represent business domains rather than arbitrary technical groupings.

## Dependency Direction

Preferred flow:

```text
Controller
   ↓
Service / Use Case
   ↓
Repository / Domain Service
   ↓
Database / External Infrastructure
```

Controllers must remain thin.

Business rules must not live inside controllers.

Database-specific implementation should not leak unnecessarily throughout business logic.

## Multi-Tenancy

`School` is the primary tenant.

Most tenant-owned resources must have either:

```text
resource → school_id
```

or an unambiguous ownership path:

```text
resource → parent → school_id
```

Explicit `school_id` should be preferred where it improves security, query safety, indexing, or clarity.

Tenant context must be derived from authenticated authorization context—not trusted solely from request payloads.

## Campus Scope

Campus is below School.

```text
School
 └── Campus
```

A user may have:

* school-wide access
* access to selected campuses
* resource-specific access where required

Having access to a school does not automatically imply unrestricted access to every campus.

## Client Architecture

All clients should consume shared backend contracts.

Business rules must not be independently reimplemented differently across:

* Admin
* Desktop
* Mobile
* Super Admin

UI-specific behavior may differ.

Domain behavior should remain consistent.

## Shared Code

Reusable code should be shared when it represents the same responsibility.

Before creating something new:

```text
Search
  ↓
Reuse
  ↓
Extend
  ↓
Generalize
  ↓
Create new
```

Example:

Instead of:

```ts
formatDate()
formatShortDate()
formatInvoiceDate()
```

prefer a capable abstraction where appropriate:

```ts
formatDate(date, options)
```

However, do not turn unrelated responsibilities into large generic utilities.

## Configuration

Environment-specific values must use configuration/environment variables.

Never hard-code:

* credentials
* API secrets
* Supabase keys
* environment URLs
* signing secrets

Configuration must be validated during application startup.

## Transactions

Operations modifying multiple related records and requiring atomic consistency must use database transactions.

Examples:

* campus transfer
* fee/payment workflows
* enrollment changes
* promotion
* complex administrative workflows

Partial success must not leave invalid domain state.

## API Versioning

Public application APIs should be versioned.

Preferred convention:

```text
/api/v1/...
```

Breaking API changes require either migration strategy or a new API version.

## Background Processing

Slow/non-request-critical operations should be designed so they can move to background jobs when required.

Examples:

* bulk notifications
* report generation
* imports
* exports
* large batch operations

Do not introduce infrastructure before it is needed, but avoid designs that make background processing impossible later.

## Observability

Backend architecture must support:

* structured logging
* request correlation
* error tracking
* health checks
* audit logging where required

Sensitive information must never be unnecessarily logged.

## Architecture Rule

Do not introduce a new framework, architectural pattern, database abstraction, global dependency, or infrastructure service without documenting why it is required.

Major architectural decisions should be recorded in `DECISIONS.md`.
