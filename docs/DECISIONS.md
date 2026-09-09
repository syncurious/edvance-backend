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

**Status:** Accepted

**Decision:** Prefer a monorepo containing backend, web applications, desktop, mobile and appropriate shared packages.

---

## Database

**Status:** Accepted

**Decision:** PostgreSQL through Supabase.

Schema changes must use migrations.

---

## Pending Decisions

The following must be decided before relevant implementation:

* ORM/query builder
* Monorepo package manager/tooling
* Money representation
* Queue/background job technology
* Caching strategy
* Logging implementation
* API contract sharing strategy
* Notification providers
* SMS provider
* Deployment architecture

Do not silently select major dependencies during unrelated feature work.
