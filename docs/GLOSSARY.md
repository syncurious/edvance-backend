# Evdance — Domain Glossary

> **Phase:** 1 — Project Foundation
> **Purpose:** Ensure developers and AI agents use consistent terminology.

## Platform

**Evdance**

The SaaS platform itself.

**Super Admin**

An authorized Evdance platform-level user responsible for platform operations rather than administration of a single school.

---

## Tenant

**School**

The primary Evdance tenant.

Data belonging to one school must remain isolated from other schools.

**Campus**

A branch/location belonging to a school.

A school can have one or many campuses.

Campus is subordinate to School and is not an independent tenant.

---

## People

**User**

An authenticated or potentially authenticatable system identity.

A user is not automatically equivalent to a Student, Guardian, Teacher, or Employee domain record.

**Student**

A learner registered within a school tenant.

The student's identity continues when transferring between campuses of the same school.

**Guardian**

A person related to one or more students within a school.

A student may have multiple guardians and a guardian may have multiple students within the same school.

**Employee**

A person working for a school.

Employee describes the person's relationship with the school and should not automatically determine authorization.

**Teacher**

An employee/person assigned teaching responsibilities.

**Staff**

A general human/business term for people working at a school.

Do not assume `Staff` must exist as a database entity or authorization role unless architecture explicitly defines it.

---

## Authentication & Authorization

**Authentication**

The process of determining who a user is.

**Authorization**

The process of determining what an authenticated user is allowed to do.

**Role**

A named collection or grouping of permissions.

**Custom Role**

A school-defined role with its own name and permissions.

**Permission**

Authorization to perform a specific action against a resource/capability.

Examples conceptually:

```text
student.read
student.create
student.update
attendance.mark
fee.collect
```

Actual permission naming will be defined by the authorization specification.

**Scope**

The boundary within which a permission is valid.

Possible scopes include:

* Platform
* School
* Campus
* Resource/context-specific scope

**RBAC**

Role-Based Access Control.

Evdance uses RBAC together with scope/context rather than relying only on role names.

---

## Academic

**Academic Year**

A defined school academic period.

**Class / Grade**

An academic level.

Exact naming may vary between schools.

**Section**

A subdivision of a class/grade.

Example:

```text
Grade 8
├── Section A
├── Section B
└── Section C
```

**Enrollment**

The relationship representing a student's participation in an academic structure/period.

**Promotion**

Moving a student to the next applicable academic level.

**Campus Transfer**

Moving a student from one campus to another campus within the same school.

A campus transfer does not create a new school-level student identity.

**School Transfer**

A student leaving one independent school tenant and joining another.

Evdance treats the student in the receiving school as a new tenant-scoped student entity rather than automatically transferring the original school's record.

---

## Finance

**Fee Structure**

Rules defining applicable school charges.

**Invoice / Challan**

A payable financial demand issued for a student/account according to the applicable feature design.

**Payment**

Money recorded against an applicable financial obligation.

**Adjustment**

An authorized change affecting a financial amount or balance.

---

## System Concepts

**Tenant Isolation**

The guarantee that one school's users cannot access another school's tenant-owned information.

**Business Rule**

A domain requirement enforced consistently regardless of which client application initiated the operation.

**API Contract**

The documented structure and behavior expected from an API endpoint.

**Audit Log**

An immutable or appropriately protected record describing an important system action.

**Source of Truth**

The authoritative location for a piece of information or project decision.

**Reusable Abstraction**

A helper, service, module, component, or other implementation designed to solve a defined responsibility across multiple valid use cases.

**Backward Compatibility**

Maintaining existing expected behavior while extending functionality unless a deliberate breaking change has been approved.

---

## Terminology Rule

Developers and AI agents should use terminology from this glossary.

Do not introduce alternative names for established domain concepts without a valid reason.

If a new important domain term is introduced, update this glossary.

If terminology becomes ambiguous during implementation, clarify the domain meaning before designing database tables, APIs, or authorization around it.
