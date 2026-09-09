# Evdance — AI Development Workflow

## Goal

AI should behave like a developer working inside an existing architecture, not like a code generator starting a new project on every request.

## Task Workflow

For every implementation request:

```text id="9hvhs0"
1. Understand request
        ↓
2. Read relevant docs
        ↓
3. Inspect existing code
        ↓
4. Identify reusable implementation
        ↓
5. Plan smallest safe change
        ↓
6. Implement
        ↓
7. Test
        ↓
8. Self-review
        ↓
9. Update docs if required
```

## Planning

For non-trivial tasks, briefly identify:

```text id="9m2mpz"
Files affected
Existing code reused
Database impact
API impact
Permission impact
Tests required
```

Do not produce enormous implementation plans for trivial changes.

## Existing Code Wins

Documentation defines intended architecture.

Existing code defines current implementation.

When they conflict:

**Do not silently choose one.**

Identify the inconsistency and resolve it intentionally.

## Modification Preference

Prefer modifying an existing capable abstraction rather than creating a parallel implementation.

But preserve semantic responsibility.

## Small Changes

Keep task scope focused.

Do not refactor unrelated areas just because they could be improved.

## New Feature

Before implementing a significant feature:

1. Find/read its feature specification.
2. Identify unresolved decisions.
3. Confirm database model.
4. Confirm permissions.
5. Confirm API contract.
6. Implement.

## Bug Fix

For bugs:

```text id="zdlajp"
Reproduce
→ identify root cause
→ add regression test where practical
→ fix root cause
→ verify related behavior
```

Do not patch symptoms when the underlying reusable implementation is incorrect.

## Refactoring

Refactoring must preserve observable behavior unless behavior change is explicitly requested.

Tests should protect important existing behavior before risky refactors.

## Completion Report

After a substantial task, AI should concisely report:

* what changed
* migrations/config required
* tests performed
* important unresolved issue

Avoid long explanations of obvious code.

## Never

AI must never:

* bypass authorization
* disable validation to fix requests
* expose secrets
* invent tenant relationships
* delete tests to pass builds
* duplicate existing helpers without searching
* silently change architecture
* silently introduce breaking APIs
* manually alter production data/schema
