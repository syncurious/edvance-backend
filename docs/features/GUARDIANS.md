# Feature — Guardians

## Purpose

Guardian represents a person responsible for or related to one or more students within a school.

## Relationship

```text id="r67cck"
Guardian
   │
   ├── Student A
   └── Student B
```

A student can also have multiple guardians.

Therefore the relationship is many-to-many.

## Tenant Rule

Guardian identity is school-scoped.

If the same real-world person has:

```text id="rqgtuk"
Child A → School 1
Child B → School 2
```

each school treats that guardian within its own tenant context.

No automatic cross-school guardian data sharing.

## Relationship Data

The student/guardian relationship may contain:

* relationship type
* primary guardian indicator
* emergency/contact preferences
* pickup authorization
* other future relationship metadata

Relationship-specific information should not be incorrectly stored directly on the guardian entity.

## Authentication

Guardian authentication uses Supabase Auth according to the finalized account provisioning flow.

Guardian domain records remain separate from authentication identity.

## Authorization

Guardian application access must only expose students explicitly related to that guardian.

Never authorize using a client-supplied student ID alone.

## API

Conceptually:

```text id="ft2fqy"
GET    /api/v1/guardians
POST   /api/v1/guardians
GET    /api/v1/guardians/:guardianId
PATCH  /api/v1/guardians/:guardianId
```

Student relationship operations should have explicit semantics.

## Audit

Audit important:

* guardian creation
* relationship creation/removal
* sensitive information changes
* account/access changes
