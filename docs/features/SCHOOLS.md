# Feature — Schools

## Purpose

School represents the primary Evdance tenant.

Everything tenant-owned must ultimately belong to a school.

## Business Rules

A school:

* can have multiple campuses
* has its own users/domain identities
* has isolated data
* can have configuration and branding
* can be activated/deactivated
* may have subscription/package configuration

School A data must never become accessible to School B.

## Creation

School creation is a platform-level operation.

Creating a school should eventually initialize required tenant defaults through a controlled onboarding workflow.

## Status

Initial lifecycle should support at least:

```text id="3zhkfq"
active
inactive
```

Additional states such as onboarding/suspended may be introduced when subscription/platform requirements are finalized.

## Permissions

School creation and platform-level school administration require platform permissions.

School administrators may only manage settings explicitly exposed to their tenant.

## API

Conceptually:

```text id="os14si"
POST  /api/v1/schools
GET   /api/v1/schools
GET   /api/v1/schools/:schoolId
PATCH /api/v1/schools/:schoolId
```

Platform and tenant-facing APIs may require separation as architecture becomes concrete.

## Tenant Rule

Never authorize school access because the client supplied `schoolId`.

The authenticated authorization context must prove access.

## Audit

Audit important actions:

* school creation
* activation/deactivation
* important configuration changes
* ownership/admin changes
* subscription changes
