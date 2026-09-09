# Evdance — Coding Standards

## Language

Use TypeScript across applicable Evdance projects.

Prefer strict typing.

Avoid `any` unless there is a documented reason.

## Naming

Use descriptive names.

Good:

```ts
studentEnrollment
getStudentById()
hasCampusAccess()
calculateOutstandingBalance()
```

Avoid:

```ts
data
obj
temp
x
doStuff()
```

except for obvious local contexts.

## Boolean Naming

Prefer:

```ts
isActive
hasPermission
canEdit
shouldNotify
```

## Functions

Functions should have one clear responsibility.

Prefer early returns over deeply nested conditions.

Avoid excessive parameter lists. Use typed option objects when parameters represent configuration.

Example:

```ts
formatDate(date, {
  format,
  timezone,
})
```

## Constants

Do not scatter magic strings/numbers.

Centralize meaningful:

* permission names
* statuses
* limits
* event names
* configuration keys

when they are shared domain/system concepts.

## Enums

Do not automatically create enums for everything.

Use the representation that provides the best TypeScript/database compatibility and maintainability.

Keep values centrally defined when they represent shared contracts.

## Imports

Use consistent project aliases where configured.

Avoid fragile deep relative imports such as:

```ts
../../../../common/utils
```

## NestJS

Controllers:

* routing
* DTO handling
* authorization metadata
* service calls

Services/use cases:

* business workflows
* orchestration

Repositories/data layer:

* persistence concerns

Guards/policies:

* authorization

DTOs:

* transport validation/contracts

Do not place SQL/database implementation directly inside controllers.

## DTO Naming

Examples:

```text
CreateStudentDto
UpdateStudentDto
StudentQueryDto
TransferStudentDto
```

Avoid one giant DTO reused for unrelated operations.

## Types

Do not duplicate the same domain type in many files.

Reuse shared contracts where ownership and coupling make sense.

Do not create global types simply to avoid small local definitions.

## Comments

Comment **why**, not obvious **what**.

Bad:

```ts
// increment count
count++;
```

Useful:

```ts
// Preserve the previous enrollment because transfers require historical reporting.
```

## Error Handling

Never silently swallow errors.

Follow `ERROR-HANDLING.md`.

## Logging

Do not use random `console.log()` calls in production code.

Use the approved logger.

Never log secrets, tokens, passwords, or unnecessary personal information.

## Async Code

Use `async/await` consistently where appropriate.

Handle failures intentionally.

Avoid fire-and-forget promises unless explicitly designed.

## Configuration

Do not directly read environment variables throughout business code.

Use centralized validated configuration.

## Database

Avoid unnecessary query loops.

Watch for N+1 queries.

Fetch only data required by the operation.

Use transactions when consistency requires them.

## Formatting

Use project-wide formatter/linter configuration.

Do not manually introduce conflicting formatting conventions.

## File Size

Do not split files solely because of arbitrary line counts.

Split when responsibilities become distinct.

Likewise, do not allow files to accumulate unrelated responsibilities.

## Dead Code

Do not leave:

* commented-out implementations
* unused imports
* abandoned helpers
* duplicate legacy functions

without a documented migration reason.

## TODOs

A TODO must explain what remains and why.

Avoid vague:

```ts
// TODO fix later
```

## Dependency Rule

Before adding an npm package ask:

1. Can the platform/framework already do this?
2. Do we already have a dependency providing it?
3. Is the package maintained?
4. Does its value justify another dependency?

Do not add packages for trivial functionality.

## Consistency Rule

When implementing something already represented elsewhere in Evdance, follow the established project pattern unless there is a strong reason to improve the pattern globally.
