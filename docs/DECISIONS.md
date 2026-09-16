# Evdance — Architecture Decisions

> Record important technical/product decisions here.

## Decision Format

Every important decision should use:

```text id="oyc10e"
### [Decision]

Status: Proposed | Accepted | Superseded
Date:
Reason:
Decision:
Consequences:
```

---

## Multi-Tenant Boundary

**Status:** Accepted

**Decision:** School is the primary tenant. Campus exists below School.

**Consequence:** Tenant-owned resources must always have a reliable ownership path to School.

---

## Cross-School Student Transfer

**Status:** Accepted

**Decision:** Students moving to another independent Evdance school are created as new tenant-scoped students.

No automatic data transfer occurs between schools.

---

## Campus Transfer

**Status:** Accepted

**Decision:** Campus transfers within the same school preserve the same student identity and applicable history.

---

## Guardian Identity

**Status:** Accepted

**Decision:** Guardian identity is school-scoped.

The same real-world guardian across different schools is treated independently by each school.

---

## Authentication

**Status:** Accepted

**Decision:** Supabase Auth provides authentication.

Domain identities and authorization remain controlled by Evdance.

---

## Authorization

**Status:** Accepted

**Decision:** Use RBAC + scope.

Authorization must consider:

```text id="vq03cx"
permission
school
campus
resource context
```

Role-name checks must not become the primary authorization mechanism.

---

## Backend

**Status:** Accepted

**Decision:** NestJS is the primary business-logic/API layer.

Important client operations must not bypass backend business rules.

---

## API Style

**Status:** Accepted

**Decision:** REST-first API using:

```text id="2c2y5i"
/api/v1
```

---

## Repository

**Status:** Superseded

**Decision:** Prefer a monorepo containing backend, web applications, desktop, mobile and appropriate shared packages.

**Superseded by:** Backend-only Repository (2026-09-16).

---

## Database

**Status:** Accepted

**Decision:** PostgreSQL through Supabase.

Schema changes must use migrations.

---

## Database Tooling

**Status:** Accepted

**Decision:** Use Drizzle ORM and Drizzle Kit for application persistence and reviewed PostgreSQL migrations.

**Consequence:** Feature modules use repository abstractions over Drizzle, and schema changes are committed as reviewed migrations.

---

## Repository Tooling

**Status:** Superseded

**Decision:** Use pnpm workspaces and Turborepo for the monorepo.

**Consequence:** Applications live under `apps/`, shared packages under `packages/`, and root quality commands run through Turborepo.

**Superseded by:** Backend-only Repository (2026-09-16).

---

## Backend-only Repository

**Status:** Accepted

**Date:** 2026-09-16

**Decision:** `Edvance-backend` is a single NestJS backend repository. The
repository root contains `src`, `test`, Drizzle configuration and migrations.
It uses direct package-manager commands rather than workspace filters or
Turborepo.
Frontend applications are external API consumers and are not part of this
repository.

**Consequence:** Backend domain types remain within the backend. OpenAPI is the
authoritative contract for clients.

---

## Package Manager

**Status:** Accepted

**Date:** 2026-09-16

**Decision:** Use Yarn Classic (v1) for dependency management and repository
commands.

**Consequence:** Commit `yarn.lock`; do not maintain pnpm workspace or lockfile
configuration in this backend repository.

---

## Pending Decisions

The following must be decided before relevant implementation:

* Money representation
* Queue/background job technology
* Caching strategy
* Logging implementation
* API contract sharing strategy
* Notification providers
* SMS provider
* Deployment architecture

Do not silently select major dependencies during unrelated feature work.
