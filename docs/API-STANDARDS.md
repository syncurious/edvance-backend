# Evdance — API Standards

> **Backend:** NestJS
> **Style:** REST-first
> **Base:** `/api/v1`

## Purpose

Every Evdance API should behave consistently regardless of which developer or AI agent created it.

## URL Convention

```text
/api/v1/{resource}
```

Examples:

```text
GET    /api/v1/students
POST   /api/v1/students
GET    /api/v1/students/:studentId
PATCH  /api/v1/students/:studentId
```

Use nouns for resources.

Avoid:

```text
/createStudent
/getStudents
/deleteStudent
```

## HTTP Methods

```text
GET     Read
POST    Create / command when appropriate
PATCH   Partial update
PUT     Full replacement when genuinely applicable
DELETE  Delete/remove where domain permits
```

## Controllers

Controllers should handle:

* routing
* request DTOs
* authorization declarations
* calling application services
* response mapping where needed

Controllers should not contain substantial business logic.

## DTOs

Requests must use explicit DTOs.

Never directly trust arbitrary request bodies.

DTO validation should reject unexpected/invalid input according to project validation policy.

## Response Structure

Use a predictable response contract.

Successful single-resource example:

```json
{
  "data": {
    "id": "..."
  }
}
```

Collection example:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

Avoid returning unrelated shapes from different modules without a reason.

## Error Structure

Errors should follow one standard contract.

Example:

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

`code` is intended for programmatic handling.

`message` is intended for understandable presentation/logging.

Internal implementation details must not leak to clients.

## HTTP Status Codes

Use meaningful HTTP statuses.

Common examples:

```text
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity

500 Internal Server Error
```

Do not return `200` for failed operations.

## Pagination

List endpoints expected to grow must support pagination.

Conceptual query:

```text
?page=1&limit=20
```

Limits should have a safe maximum.

Do not allow clients to accidentally request unbounded large datasets.

## Filtering

Use query parameters.

Example:

```text
GET /api/v1/students?campusId=...&status=active
```

Filters must still respect authorization scope.

A user cannot escape campus restrictions by changing filter parameters.

## Sorting

Use a consistent convention.

Example:

```text
?sortBy=createdAt&sortOrder=desc
```

Only approved sortable fields should be accepted.

Do not directly inject client-provided field names into SQL.

## Search

Search should use a consistent parameter where applicable:

```text
?search=ali
```

Module-specific advanced search can be introduced when justified.

## Resource IDs

Use explicit parameter names where clarity helps:

```text
:studentId
:campusId
:guardianId
```

rather than using generic `:id` everywhere.

## Tenant IDs

Do not trust tenant ownership simply because the client supplied:

```text
schoolId
campusId
```

The backend must resolve and validate authorization context.

Where the school can be derived from authentication/context, avoid requiring clients to control it unnecessarily.

## Validation

Validate:

* body
* route parameters
* query parameters

Validation rules belong as close as practical to their responsible domain/contracts.

## API Business Errors

Expected business conflicts should use stable application error codes.

Examples conceptually:

```text
STUDENT_NOT_FOUND
STUDENT_ALREADY_ENROLLED
CAMPUS_ACCESS_DENIED
GUARDIAN_RELATION_NOT_FOUND
```

Do not scatter hard-coded error strings throughout the project.

## Bulk Operations

Bulk APIs should be explicitly designed.

Do not implement:

```text
loop over single endpoint 10,000 times
```

when a proper bulk operation is required.

Bulk operations must define:

* limits
* validation behavior
* transaction behavior
* partial failure behavior
* authorization
* audit behavior

## Idempotency

Operations vulnerable to accidental duplicate execution should support idempotent designs where appropriate.

Especially consider this for:

* payments
* external webhooks
* imports
* retryable commands

## Dates

API date/time contracts must be consistent.

Prefer ISO 8601 for date/time values.

Example:

```text
2026-09-07T09:30:00Z
```

Do not introduce arbitrary date formats per endpoint.

Formatting for humans belongs primarily in presentation layers.

## Money

Financial APIs must use the project's approved money representation consistently.

Never use floating-point calculations for financial business logic.

## Versioning

Current base:

```text
/api/v1
```

Do not create `/v2` merely because an endpoint changes internally.

A new API version is for incompatible external contract changes that cannot reasonably maintain compatibility.

## Documentation

API endpoints should be documented through the project's NestJS/OpenAPI strategy.

Documentation must accurately represent:

* request
* response
* authentication
* parameters
* validation
* important errors

## API Change Rule

Before creating or changing an endpoint:

```text
Search existing APIs
      ↓
Can existing API handle it?
      ↓
Can existing contract be safely extended?
      ↓
Would extension remain semantically correct?
      ↓
Extend or create new endpoint
```

Never create duplicate APIs simply because doing so is faster.

## API Completion Checklist

Before considering an endpoint complete:

* Authentication handled
* Permission defined
* Tenant scope enforced
* Campus/resource scope enforced if applicable
* DTO validation implemented
* Business validation implemented
* Consistent response contract
* Consistent errors
* Pagination where necessary
* Transaction considered
* Audit requirement considered
* Tests added
* API documentation updated
