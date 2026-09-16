# Evdance — Backend Setup Specification

> This document defines the expected NestJS foundation before business feature development.

## Application

Location:

```text id="9dwb3x"
Edvance-backend/
```

## Required Foundation

Backend bootstrap should provide:

* configuration validation
* API versioning
* request validation
* global error handling
* structured logging
* request/correlation IDs
* Swagger/OpenAPI
* security headers
* CORS configuration
* graceful shutdown
* health endpoint

## API Prefix

```text id="6dmy9i"
/api/v1
```

## Validation

Enable global request validation.

Expected behavior:

* reject invalid input
* transform supported DTO values safely
* reject unexpected fields according to project policy

Do not rely only on TypeScript types because types do not validate runtime requests.

## Configuration

Create centralized typed configuration.

Conceptually:

```text id="0u1u5m"
src/config/
├── configuration.ts
├── validation.ts
└── config.module.ts
```

Business modules should not directly access `process.env`.

## Database

Database infrastructure belongs under:

```text id="pld7tr"
src/infrastructure/database/
```

The selected ORM/query builder must remain replaceable enough that business services are not unnecessarily coupled to raw database implementation.

## Supabase

Supabase infrastructure belongs under:

```text id="8hqqfd"
src/infrastructure/supabase/
```

Responsibilities may include:

* server Supabase client
* Auth integration
* Storage integration

Service-role credentials must remain server-only.

## Authentication

Create centralized authentication infrastructure.

Feature modules should receive an authenticated application context rather than manually parsing JWTs.

## Request Context

Authenticated requests should make relevant context available consistently:

```ts id="cn7nmf"
{
  requestId,
  userId,
  schoolId,
  permissions,
  scope,
  campusIds
}
```

Exact implementation may evolve.

Do not trust these values directly from client payloads.

## Authorization

Create reusable:

```text id="71vkuf"
RequirePermissions decorator
Authorization guard/policy
Tenant resolver
Scope evaluator
```

Do not implement authorization separately in every controller.

## Errors

Create centralized application/domain error handling according to `ERROR-HANDLING.md`.

## Logging

Use one logger abstraction/implementation.

Request logging should support correlation IDs.

## Swagger

Expose development/staging API documentation.

Production exposure should be configurable.

## Security

Backend setup should include appropriate:

* security headers
* payload limits
* CORS
* input validation
* rate limiting strategy

Security-sensitive defaults should fail safely.

## Health

Provide:

```text id="58i6cg"
GET /health
```

or infrastructure-equivalent health endpoint.

It should verify application health without exposing sensitive details.

## Graceful Shutdown

Enable NestJS shutdown hooks so connections/resources can close safely during deployment.

## Testing Foundation

Backend setup should establish:

```text id="i4p1hq"
unit testing
integration testing
E2E testing
```

before feature modules become large.

## Module Creation Rule

Do not pre-generate dozens of empty NestJS modules.

Create modules when their feature implementation begins.

Shared infrastructure should be established first.
