# Evdance — Testing Standards

## Goal

Tests protect business rules, tenant isolation and future refactoring.

Testing should focus on meaningful behavior rather than chasing arbitrary coverage numbers.

## Test Types

Use appropriate combinations of:

```text
Unit
Integration
E2E
```

## Unit Tests

Useful for isolated logic such as:

* calculations
* validators
* permission policies
* reusable helpers
* domain rules

## Integration Tests

Use for behavior involving multiple application/database components.

Examples:

* repositories
* enrollment workflows
* campus transfers
* fee operations

## E2E Tests

Protect important API workflows.

Critical examples:

```text
authentication
tenant isolation
authorization
student creation
campus transfer
financial operations
```

## Tenant Isolation Tests

These are mandatory for sensitive tenant-owned resources.

Example scenario:

```text
User belongs to School A
Student belongs to School B
User requests Student B
→ Access must fail
```

Also test campus scope where applicable.

## Authorization Tests

Test:

```text
allowed permission
missing permission
wrong scope
wrong campus
wrong tenant
inactive assignment
```

## Regression Tests

When fixing a bug, add a test reproducing the bug where practical.

The test should fail before the fix and pass after it.

## Shared Helpers

Reusable helpers should test:

* defaults
* optional configuration
* edge cases
* backward-compatible behavior

## Database Tests

Important database rules should verify:

* constraints
* relationships
* tenant ownership
* transactions
* uniqueness

## Financial Tests

Financial calculations require strong deterministic testing.

Test:

* rounding
* discounts
* adjustments
* partial payments
* duplicate processing
* boundary cases

## Test Data

Use factories/builders where repetition becomes significant.

Do not create giant shared fixtures that make tests difficult to understand.

## Independence

Tests should not depend on execution order.

## External Services

Mock external services at appropriate boundaries.

Do not send real SMS/email/payment requests during normal automated tests.

## AI Rule

An AI agent must not:

* delete a failing test to pass CI
* weaken assertions without reason
* bypass security in test configuration to make implementation easier

Fix the implementation or update the test only when the documented requirement has genuinely changed.
