# Evdance — Shared Foundation

## Purpose

Define reusable foundations before feature development so agents do not repeatedly invent their own implementations.

## Date/Time

Provide one shared date/time strategy.

Capabilities should eventually include:

* parsing
* formatting
* timezone conversion
* date-only handling
* comparisons

Prefer configurable functions over many narrowly named duplicate helpers.

System timestamps should use UTC.

Presentation formatting can respect school/user timezone requirements.

## Pagination

Create one standard pagination contract.

Conceptually:

```ts
type PaginationInput = {
  page: number;
  limit: number;
};
```

and:

```ts
type PaginatedResult<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
```

Do not reimplement pagination independently in every module.

## API Responses

Centralize standard response/error contracts.

Feature modules should provide their domain data, not reinvent response envelopes.

## Errors

Create reusable base application/domain errors and centralized NestJS mapping.

Follow `ERROR-HANDLING.md`.

## Authorization

Create centralized:

* authenticated-user decorator/context
* permission decorator
* authorization guard/policy
* scope resolver
* tenant-context handling

Feature modules must consume these rather than implementing custom authentication logic.

## Validation

Use one validation strategy consistently.

Reusable validation rules may include:

* UUID
* phone number
* email
* pagination
* dates
* identifiers

Domain-specific validation stays with its domain.

## Phone Numbers

Phone handling should eventually support normalization because Pakistani numbers may arrive in forms such as:

```text
03XXXXXXXXX
+923XXXXXXXXX
```

Store/compare phone numbers using one approved normalized strategy.

Do not let individual modules invent phone normalization.

## Money

Create one money strategy before finance development.

It must define:

* storage representation
* calculations
* rounding
* API representation
* formatting

Never use JavaScript floating-point arithmetic directly for critical monetary calculations.

## Logging

Provide one application logger.

It should support:

* structured context
* request IDs
* severity levels
* safe metadata

Never create module-specific random logging systems.

## IDs

Provide common validation/parsing patterns for identifiers where useful.

Do not create unnecessary ID wrapper abstractions unless they provide actual domain value.

## Constants

Centralize genuinely shared values such as:

* permission identifiers
* platform limits
* event names

Domain constants should remain owned by their module when not globally relevant.

## File Uploads

Provide one upload abstraction when storage features begin.

It should eventually handle:

* allowed types
* size limits
* storage paths
* access rules
* metadata

Feature modules should configure the capability rather than independently implementing uploads.

## Configuration

Environment/config access must use one validated configuration system.

Business code should consume typed configuration rather than directly accessing `process.env`.

## Principle

Shared foundations should make the correct implementation easier than creating a duplicate one.
