# Evdance — AI Agent Instructions

> **MANDATORY:** Read this file before modifying the project.

## Core Rule

Never immediately create code.

Before implementation:

```text
Understand → Search → Reuse → Extend → Generalize → Create
```

## Before Coding

Always:

1. Read relevant `/docs`.
2. Understand the requested behavior.
3. Search the existing codebase.
4. Find related modules, services, helpers, DTOs, types, constants and components.
5. Determine whether existing code can be reused.
6. Check database implications.
7. Check authentication/RBAC implications.
8. Check API compatibility.
9. Then implement.

## Reuse First

Do not create duplicate functionality because it is faster.

Before creating:

```text
helper
service
component
hook
DTO
type
interface
constant
validator
repository method
API endpoint
```

search for an existing equivalent.

Preferred order:

```text
REUSE
 ↓
EXTEND
 ↓
GENERALIZE
 ↓
CREATE
```

## Extend Safely

Example:

Existing:

```ts
formatDate(date)
```

New requirement needs custom formatting.

Prefer:

```ts
formatDate(date, options?)
```

instead of:

```ts
formatCustomDate()
formatShortDate()
formatStudentDate()
```

provided the original responsibility remains clear.

Never break existing callers just to support a new requirement.

## Avoid Over-Generalization

Do not turn helpers/services into "god" abstractions.

If requirements represent genuinely different responsibilities, create separate abstractions.

Reuse does not mean forcing unrelated logic together.

## Architecture

Follow:

`/docs/ARCHITECTURE.md`

Do not introduce new architectural patterns during feature implementation without justification.

## Database

Follow:

`/docs/DATABASE.md`

Never:

* bypass tenant isolation
* manually modify production schema
* create cross-school relationships accidentally
* trust client tenant IDs
* use floating point for money

## Authorization

Follow:

`/docs/AUTH-RBAC.md`

Every protected operation must consider:

```text
User
School
Permission
Scope
Campus
Resource ownership
```

Never rely solely on role names.

## APIs

Follow:

`/docs/API-STANDARDS.md`

Before creating an endpoint, check whether an existing endpoint can safely support the requirement.

## Business Logic

Business rules belong primarily in backend domain/application services.

Do not duplicate important business rules independently across Next.js, Electron and React Native.

## Changes

Prefer the smallest clean change that solves the requirement.

Do not perform unrelated refactoring while implementing a feature unless required for correctness.

## Breaking Changes

Before changing existing behavior, identify:

* callers
* API consumers
* database impact
* tests
* types
* documentation

Backward compatibility should be preserved where practical.

## Security

Never expose:

* service-role keys
* secrets
* credentials
* internal security information

Never trust client input for authorization.

## Tests

New behavior requires appropriate tests.

Bug fixes should include a regression test where practical.

Do not delete failing tests simply to make the suite pass.

## Documentation

Update documentation when changing:

* architecture
* API contracts
* database design
* permissions
* important business rules
* shared conventions

## Unknown Requirements

Do not invent critical business rules.

If a decision materially affects:

* tenant isolation
* financial behavior
* student history
* authorization
* destructive operations
* architecture

and documentation does not answer it, surface the missing decision before making an irreversible assumption.

## Final Self-Review

Before completing work ask:

* Did I duplicate existing functionality?
* Could I reuse something?
* Did I accidentally break existing behavior?
* Is tenant isolation enforced?
* Is authorization enforced?
* Is validation present?
* Are errors consistent?
* Are tests sufficient?
* Did I introduce unnecessary complexity?
* Does documentation need updating?

## Definition of Done

Code compiling is not enough.

A task is complete only when its implementation, security, validation, tests, contracts and relevant documentation are consistent.

## Requirement & Decision Changes

The user may change previous decisions at any point.

When a new instruction changes an existing requirement, business rule, architecture decision, API contract, database model, permission model, technology choice, or project convention:

**Do not update only the code.**

Follow `DOCS.md` and `docs/CHANGE-MANAGEMENT.md`.

Identify and update every affected source-of-truth document.

If an accepted decision is replaced, preserve its history in `DECISIONS.md` by marking it `Superseded` and recording the replacement decision.

A task is not complete while project documentation knowingly describes obsolete behavior.

The latest explicit user decision takes precedence, but all affected documentation must then be synchronized with that decision.
