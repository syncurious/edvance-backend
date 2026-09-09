# Evdance — Reusability & Extensibility Rules

## Philosophy

Reusable code should solve a **responsibility**, not a single screen's immediate requirement.

However, premature abstraction is also undesirable.

The goal is:

```text
Reusable + Clear + Extensible
```

not:

```text
Generic at any cost
```

## Mandatory Search

Before creating a reusable abstraction, search for:

* helpers
* utilities
* services
* hooks
* components
* validators
* DTOs
* types
* constants
* repository methods
* API endpoints

that already solve all or part of the requirement.

## Decision Order

```text
Does it already exist?
      │
     YES → REUSE
      │
     NO
      ↓
Can an existing abstraction naturally support it?
      │
     YES → EXTEND
      │
     NO
      ↓
Is existing code too specific but conceptually identical?
      │
     YES → GENERALIZE
      │
     NO
      ↓
CREATE
```

## Example — Date

Bad evolution:

```ts
formatDate()
formatShortDate()
formatAttendanceDate()
formatFeeDate()
formatExamDate()
```

Better:

```ts
formatDate(date, options)
```

with sensible defaults.

But if a function performs actual academic calendar calculations, that is not merely date formatting and may deserve a separate abstraction.

## Example — API

Before:

```text
GET /students
```

New requirement: filter by campus.

Do not immediately create:

```text
GET /students-by-campus
```

Prefer extending:

```text
GET /students?campusId=...
```

if semantically correct.

## Example — Service

Do not create:

```text
StudentCreationService
StudentCreationFromAdmissionService
StudentCreationFromImportService
```

if they duplicate the same student-creation business rules.

Extract/reuse the core student creation capability and let workflows orchestrate it.

## Shared Logic

If multiple modules require identical domain behavior, identify the correct owner.

Do not automatically move everything into:

```text
common/utils
```

Domain-specific reusable logic should usually remain owned by its domain.

## Utilities

`utils` should contain genuinely generic operations.

Good candidates:

* date formatting
* safe string normalization
* generic pagination calculations

Poor candidates:

```text
calculateStudentFee()
promoteStudent()
transferCampus()
```

Those are domain operations and belong in appropriate modules/services.

## Components

Frontend components should be reusable when UI responsibility is genuinely shared.

Prefer configuration/props over cloning components for small variations.

Do not create massive components with dozens of flags merely to claim reuse.

## Configuration Over Duplication

When behavior varies predictably, consider configuration.

Example:

```ts
formatDate(date, {
  format: 'DD/MM/YYYY'
})
```

instead of duplicating implementation.

## Backward Compatibility

When extending shared functionality:

* preserve existing defaults
* preserve existing callers where possible
* add tests for old + new behavior
* avoid unexpected semantic changes

## Duplication Rule

A small amount of temporary duplication can sometimes be safer than a bad abstraction.

Do not generalize unrelated code simply because two implementations currently look similar.

Abstraction should follow shared **meaning**, not merely similar syntax.

## Refactoring

When an existing abstraction is insufficient:

1. Understand all callers.
2. Add tests around current behavior.
3. Extend/generalize safely.
4. Migrate callers if necessary.
5. Remove obsolete duplication.
6. Update documentation/contracts where required.

## AI Agent Rule

AI agents must never justify duplicate code with:

> "It was easier to create a new function."

Ease of generation is not an architectural reason.
