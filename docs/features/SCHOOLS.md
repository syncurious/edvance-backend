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

Base URL:

```text
/api/v1
```

All School endpoints are platform-level APIs. They require a Supabase access token in the request header:

```http
Authorization: Bearer <supabase-access-token>
```

The backend verifies the token and requires the authenticated user to have platform Super Admin access. During the bootstrap phase, this access is resolved from the server-only `SUPER_ADMIN_USER_IDS` allowlist; it will be replaced by the Evdance RBAC platform-permission model when that module is implemented.

### School Resource

```json
{
  "id": "0b3cda2e-0cdc-4c8f-9856-468c0f82c4b4",
  "name": "Evdance Grammar School",
  "status": "active",
  "createdAt": "2026-09-15T08:00:00.000Z",
  "updatedAt": "2026-09-15T08:00:00.000Z"
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `id` | UUID | Server-generated School identifier. |
| `name` | string | 1–160 characters and must contain a non-whitespace character. Leading/trailing whitespace is removed. |
| `status` | `active` \| `inactive` | Defaults to `active` when creating a School. |
| `createdAt` | ISO 8601 timestamp | Server-generated UTC timestamp. |
| `updatedAt` | ISO 8601 timestamp | Server-generated UTC timestamp. |

### Create School

```http
POST /api/v1/schools
Content-Type: application/json
```

Request body:

```json
{
  "name": "Evdance Grammar School",
  "status": "active"
}
```

`status` is optional. No additional fields are accepted.

Success response — `201 Created`:

```json
{
  "data": {
    "id": "0b3cda2e-0cdc-4c8f-9856-468c0f82c4b4",
    "name": "Evdance Grammar School",
    "status": "active",
    "createdAt": "2026-09-15T08:00:00.000Z",
    "updatedAt": "2026-09-15T08:00:00.000Z"
  }
}
```

### List Schools

```http
GET /api/v1/schools?page=1&limit=20&search=grammar&status=active
```

All query parameters are optional:

| Parameter | Type | Default / limits | Meaning |
| --- | --- | --- | --- |
| `page` | integer | Default `1`; minimum `1` | One-based result page. |
| `limit` | integer | Default `20`; `1`–`100` | Maximum records in the page. |
| `search` | string | — | Case-insensitive School-name search. |
| `status` | `active` \| `inactive` | — | Filters by lifecycle status. |

Success response — `200 OK`:

```json
{
  "data": [
    {
      "id": "0b3cda2e-0cdc-4c8f-9856-468c0f82c4b4",
      "name": "Evdance Grammar School",
      "status": "active",
      "createdAt": "2026-09-15T08:00:00.000Z",
      "updatedAt": "2026-09-15T08:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

### Get School

```http
GET /api/v1/schools/:schoolId
```

`schoolId` must be a UUID.

Success response — `200 OK`:

```json
{
  "data": {
    "id": "0b3cda2e-0cdc-4c8f-9856-468c0f82c4b4",
    "name": "Evdance Grammar School",
    "status": "active",
    "createdAt": "2026-09-15T08:00:00.000Z",
    "updatedAt": "2026-09-15T08:00:00.000Z"
  }
}
```

### Update School

```http
PATCH /api/v1/schools/:schoolId
Content-Type: application/json
```

`schoolId` must be a UUID. Send one or both mutable fields:

```json
{
  "name": "Evdance Grammar School — North",
  "status": "inactive"
}
```

Success response — `200 OK`:

```json
{
  "data": {
    "id": "0b3cda2e-0cdc-4c8f-9856-468c0f82c4b4",
    "name": "Evdance Grammar School — North",
    "status": "inactive",
    "createdAt": "2026-09-15T08:00:00.000Z",
    "updatedAt": "2026-09-15T09:00:00.000Z"
  }
}
```

There is intentionally no `DELETE /schools/:schoolId` endpoint in this iteration. School lifecycle is managed through `status`; deletion and its historical/audit policy require a separate approved decision.

### Error Responses

All errors return the standard error envelope and include `X-Request-Id` in the response header:

```json
{
  "error": {
    "code": "SCHOOL_NOT_FOUND",
    "message": "School was not found.",
    "details": null,
    "requestId": "2ee5e882-c67b-4e5e-a447-b0b1b90aa7cc"
  }
}
```

| Status | Code | When it occurs |
| --- | --- | --- |
| `400` | `VALIDATION_ERROR` | A body/query DTO is invalid or contains an unexpected field. `details.fields` identifies failed fields. |
| `400` | `BAD_REQUEST` | `schoolId` is not a UUID. |
| `401` | `UNAUTHORIZED` | The bearer token is missing or invalid. |
| `403` | `FORBIDDEN` | The authenticated user is not an authorized platform Super Admin. |
| `404` | `SCHOOL_NOT_FOUND` | The requested School does not exist. |
| `500` | `INTERNAL_ERROR` | An unexpected server failure occurred; no implementation details are exposed. |

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
