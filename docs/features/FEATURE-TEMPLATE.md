# Feature — [NAME]

## Status

```text id="vy8ngj"
PLANNED
```

## Purpose

Why does this feature exist?

## Actors

Who interacts with it?

## Business Rules

Define authoritative domain behavior.

## Permissions

Define required capabilities.

Example:

```text id="iqav7f"
resource.read
resource.create
resource.update
resource.delete
```

Also define applicable scope.

## Data Model

List required entities and relationships.

Do not invent final tables here without checking `DATABASE.md` and approved schema.

## API

Define required endpoints.

Example:

```text id="oj0o5n"
GET    /api/v1/resources
POST   /api/v1/resources
GET    /api/v1/resources/:resourceId
PATCH  /api/v1/resources/:resourceId
```

## Validation

Define:

* required fields
* formats
* limits
* uniqueness
* cross-field rules

## Business Workflows

Describe important workflows step-by-step.

## State / Lifecycle

Define applicable statuses and valid transitions.

## Tenant Rules

Define:

* school ownership
* campus ownership
* cross-tenant restrictions

## Edge Cases

Explicitly document unusual but valid/invalid situations.

## Audit

Define actions requiring audit records.

## Notifications / Events

Define domain events and user notifications if applicable.

## Errors

Define stable feature-specific error codes.

## Testing

Minimum scenarios:

* success
* validation failure
* authorization failure
* wrong tenant
* wrong campus/scope
* business conflicts
* important edge cases

## Open Decisions

Record unresolved requirements here.

AI agents must not silently decide high-impact open decisions.

## Definition of Done

Feature is complete only when:

* business rules implemented
* authorization implemented
* validation implemented
* APIs documented
* tests pass
* audit/events implemented where required
* documentation reflects final behavior
