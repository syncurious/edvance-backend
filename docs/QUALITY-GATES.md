# Evdance — Quality Gates

Code should not be considered ready when it merely runs locally.

## Required Checks

Before merging:

```text id="e7p2ms"
Typecheck
Lint
Tests
Build
```

Relevant applications/packages must pass.

## Backend Changes

Also verify where applicable:

```text id="d3apv8"
Unit tests
Integration tests
E2E tests
Migration validity
Swagger/API contract
```

## Database Changes

Must include:

* reviewed migration
* backwards impact considered
* tenant isolation checked
* indexes considered
* constraints considered

## Security-Sensitive Changes

Require tests for denied access.

Do not test only successful authorization.

## Shared Package Changes

When changing shared code, test affected consumers.

Example:

```text id="q2ox8f"
packages/utils changed
      ↓
admin
desktop
mobile
backend

Check applicable consumers.
```

## No Shortcut Rule

Never solve CI failure by:

* disabling TypeScript strictness
* disabling ESLint rules globally
* deleting tests
* weakening assertions
* using `any` everywhere
* ignoring errors
* bypassing validation

Fix the underlying issue.

## Merge Standard

A change is ready when:

```text id="p2ah71"
Correct
+
Secure
+
Tested
+
Maintainable
+
Documented where necessary
```
