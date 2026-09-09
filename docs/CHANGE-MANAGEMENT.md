# Evdance — Change Management

> **Mandatory for developers and AI agents.**

## Core Rule

The project will evolve.

The user is allowed to change:

* requirements
* business rules
* architecture
* APIs
* database design
* technology choices
* naming
* workflows
* permissions
* UI behavior

When this happens, **do not only change the code.**

Update the project's source-of-truth documentation too.

## Change Workflow

Whenever a new request conflicts with or changes an existing decision:

```text
New Requirement
      ↓
Identify old decision
      ↓
Find affected documentation
      ↓
Determine impact
      ↓
Update documentation
      ↓
Update implementation
      ↓
Update tests/contracts
      ↓
Verify consistency
```

## Impact Search

Before implementing a changed requirement, search for impact across:

```text
Code
Database
APIs
Permissions
Types
Tests
Documentation
Feature specs
Architecture decisions
```

## Example

Existing requirement:

> Guardian belongs to one school context.

Later the user changes this to:

> Guardian should have one global identity across schools.

The AI must **not simply modify the guardian table**.

It must inspect/update applicable:

```text
PROJECT.md
PRD.md
DATABASE.md
AUTH-RBAC.md
GUARDIANS.md
DECISIONS.md
API contracts
tests
migrations
```

before considering the change complete.

## Decisions

If an accepted architecture decision changes, do not erase its history.

In `DECISIONS.md`, mark the old decision:

```text
Status: Superseded
```

and add the new decision.

This preserves why the architecture evolved.

## Contradictions

AI must actively detect contradictions.

If:

```text
Code says A
Feature spec says B
Architecture says C
```

do not silently choose whichever is easiest.

Determine the latest intended requirement and synchronize the affected sources.

## User Changes Mind During Implementation

If the user changes a requirement while work is underway:

1. Stop following the obsolete requirement.
2. Preserve already-useful work where appropriate.
3. Identify affected implementation.
4. Update relevant documentation.
5. Adjust implementation.
6. Adjust tests.
7. Remove obsolete code when safe.
8. Verify no old requirement remains incorrectly documented.

## Small Changes

Not every small request requires documentation.

Example:

```text
Button padding 12px → 14px
```

normally does not require architectural documentation.

Documentation updates are required when the change affects a persistent project rule, contract, architecture, domain behavior, or convention.

## Documentation Is Part of Done

For documentation-affecting work:

```text
Code complete
+
Tests complete
+
Docs synchronized
=
Task complete
```

Code being functional does not mean the task is complete if the source-of-truth documentation is now incorrect.

## AI Final Check

Before completing substantial work, ask:

> Did this task change something our documentation currently describes?

If yes, update it.

Then ask:

> Do any documents now contradict each other?

If yes, resolve them before completion.
