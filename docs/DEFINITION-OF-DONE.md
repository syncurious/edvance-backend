# Evdance — Definition of Done

A task is not complete merely because the feature appears to work.

## Feature Complete

Applicable requirements must be satisfied:

* Business requirement implemented
* Correct architecture followed
* Existing functionality reused where appropriate
* Input validated
* Authentication enforced
* Permission enforced
* Tenant isolation enforced
* Scope/campus restrictions enforced
* Errors follow project standards
* Database integrity maintained
* Transactions used where necessary
* Tests added
* Typecheck passes
* Lint passes
* Build passes
* API documentation updated
* Relevant MD documentation synchronized

## Database Changes

Also require:

* migration created
* migration reviewed
* backwards impact considered
* constraints considered
* indexes considered
* tenant safety verified

## Shared Code Changes

Also verify existing consumers continue working.

## Security Changes

Test both:

```text
Allowed access
AND
Denied access
```

## Requirement Changes

If the user changed an existing project decision:

```text
Implementation updated
+
Tests updated
+
Documentation updated
+
Old decision handled
```

are all required.

## Final Rule

A task is done when another developer or AI agent can continue from the repository without needing hidden knowledge from previous conversations.
