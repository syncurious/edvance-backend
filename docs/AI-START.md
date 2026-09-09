# Evdance — AI Agent Start Instructions

You are working on the Evdance School Management System.

Do not treat this repository as a blank project.

## Mandatory First Step

Before substantial implementation, read:

```text
AGENTS.md
DOCS.md
```

Then use `DOCS.md` to locate documentation relevant to your current task.

Do not read unrelated documents unnecessarily.

## Source of Truth

Project documentation defines intended architecture and business behavior.

Existing code defines the current implementation.

If they conflict, do not silently choose one.

Determine the latest intended decision and synchronize the affected implementation/documentation.

## Implementation Philosophy

Always follow:

```text
Understand
   ↓
Search existing code
   ↓
Reuse
   ↓
Extend
   ↓
Generalize
   ↓
Create new
```

Never create duplicate functionality merely because it is quicker.

## Before Creating Anything

Search for existing:

* modules
* services
* functions
* helpers
* utilities
* components
* hooks
* DTOs
* types
* schemas
* validators
* constants
* repositories
* endpoints
* tests

Reuse or safely extend them where semantically appropriate.

## Architecture

Do not invent new architecture, dependencies, patterns, database strategies or authorization mechanisms during feature implementation.

Follow documented decisions.

## Security

Evdance is multi-tenant.

School is the primary tenant.

Never trust client-supplied identifiers as proof of authorization.

Always consider:

```text
authentication
school
permission
scope
campus
resource ownership
```

## Changes in Requirements

The project owner may change previous decisions.

When this happens:

1. Identify the old requirement.
2. Find affected documentation.
3. Determine implementation impact.
4. Update documentation.
5. Update code.
6. Update tests.
7. Verify no obsolete rule remains.

Follow `docs/CHANGE-MANAGEMENT.md`.

## Quality

Never fix problems by:

* disabling security
* removing validation
* swallowing errors
* deleting tests
* globally weakening TypeScript
* creating duplicate implementations
* exposing secrets

## Completion

Before reporting completion:

```text
Typecheck
Lint
Tests
Build
Security review
Documentation synchronization
```

must be considered where applicable.

Your goal is not to generate the most code.

Your goal is to make the **smallest correct, reusable, secure and maintainable change consistent with Evdance architecture**.
