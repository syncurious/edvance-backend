# Evdance — Error Handling Standards

## Goal

Errors must be:

* predictable
* secure
* debuggable
* machine-readable
* consistent across modules

## API Error Contract

Preferred structure:

```json
{
  "error": {
    "code": "STUDENT_NOT_FOUND",
    "message": "Student was not found.",
    "details": null,
    "requestId": "..."
  }
}
```

## Error Code

`code` is stable and intended for application logic.

Example:

```text
STUDENT_NOT_FOUND
CAMPUS_ACCESS_DENIED
STUDENT_ALREADY_ENROLLED
PAYMENT_ALREADY_PROCESSED
```

Do not make clients depend on parsing human-readable messages.

## Error Message

Messages should be understandable but must not expose sensitive internal information.

Never expose:

* SQL errors
* stack traces
* secrets
* internal paths
* database credentials
* security implementation details

## Error Categories

### Validation

Invalid input.

Usually:

```text
400 / 422
```

### Authentication

Identity missing/invalid.

```text
401
```

### Authorization

Authenticated but not permitted.

```text
403
```

### Not Found

Authorized context cannot locate applicable resource.

```text
404
```

### Conflict

Operation conflicts with current state.

```text
409
```

Examples:

* duplicate enrollment
* already processed payment

### Internal

Unexpected server failure.

```text
500
```

Internal failures must be logged with sufficient debugging context while returning a safe client response.

## Domain Errors

Expected business failures should use explicit domain/application errors rather than generic exceptions.

Conceptually:

```ts
throw new StudentAlreadyEnrolledError(...)
```

These should map centrally to API error contracts.

## Global Handling

NestJS should use centralized exception/error handling.

Do not manually construct inconsistent error responses in every controller.

## Validation Errors

Validation responses should identify invalid fields safely.

Example:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed.",
    "details": {
      "fields": {
        "email": ["Invalid email address"]
      }
    },
    "requestId": "..."
  }
}
```

## Database Errors

Translate known database failures into meaningful application errors where appropriate.

Do not expose raw PostgreSQL errors directly.

## External Services

External integration failures should be handled explicitly.

Examples:

* SMS provider unavailable
* storage upload failure
* payment provider timeout

Do not assume external calls always succeed.

## Transactions

If an operation fails during an atomic workflow, rollback the transaction.

Never return success for partially completed critical operations.

## Logging

Unexpected errors should include useful server-side context such as:

* request ID
* operation
* module
* relevant safe identifiers

Avoid logging sensitive payloads unnecessarily.

## Request Correlation

Requests should have a correlation/request ID.

The ID should appear in applicable error responses and logs to simplify debugging.

## Retry

Do not retry operations blindly.

Retries are appropriate only when:

* operation is safe/idempotent
* failure is transient
* retry policy is controlled

Be especially careful with:

* payments
* notifications
* record creation

## Client Behavior

Clients should primarily react to stable error codes rather than matching message strings.

## Security Rule

Sometimes revealing whether a resource exists can itself leak information.

Authorization/resource lookup behavior should be designed to avoid cross-tenant information disclosure.

## AI Agent Rule

Never "fix" an error by:

* swallowing the exception
* returning success anyway
* removing validation
* disabling authorization
* deleting failing tests

Fix the underlying cause.
