# Evdance — Before Coding Checklist

> AI agents must run this mental checklist before implementation.

## Understand

* What exactly is being requested?
* Which domain owns it?
* What existing behavior could be affected?

## Read

Read:

```text id="j8x4bi"
AGENTS.md
PROJECT.md
ARCHITECTURE.md
```

Then read relevant:

```text id="01duyj"
DATABASE.md
AUTH-RBAC.md
API-STANDARDS.md
feature specification
```

## Search

Search repository for related:

* modules
* functions
* services
* repositories
* DTOs
* validators
* types
* constants
* components
* hooks
* APIs
* tests

## Reuse Decision

Follow:

```text id="p8yrz3"
Reuse
 ↓
Extend
 ↓
Generalize
 ↓
Create
```

Do not duplicate functionality merely to finish faster.

## Database Check

Ask:

* Schema change required?
* Existing model sufficient?
* Tenant ownership preserved?
* History affected?
* Migration required?
* Index required?
* Transaction required?

## Authorization Check

Determine:

```text id="evvkzs"
required permission
tenant
scope
campus
resource ownership
```

## API Check

Ask:

* Existing endpoint?
* Can it be extended?
* Is this actually a new resource/workflow?
* Will it break existing consumers?

## Compatibility

Identify existing callers before changing shared functionality.

Preserve existing defaults where practical.

## Tests

Define required tests before declaring work complete.

## Documentation

If the change modifies a documented contract, update documentation.

## Stop Conditions

Do not make an assumption without surfacing it when it materially affects:

* tenant security
* authorization
* financial records
* historical records
* destructive behavior
* major architecture
