# Feature — Schools

## Purpose

School is the platform-level tenant registry. Every tenant-owned Evdance record
must have an unambiguous ownership path to one School.

## Database Model

The School model follows the approved backend blueprint. `schools` is not
itself tenant-scoped; it establishes the tenant boundary for subsequent
tenant-owned tables.

| Field | Type | Rules |
| --- | --- | --- |
| `id` | UUID | Server-generated primary key. |
| `code` | case-insensitive text | Globally unique, non-blank School code. |
| `legalName`, `displayName` | text | Required, non-blank legal and user-facing names. |
| `ownershipType` | enum | `private`, `public`, `trust`, `ngo`, or `other`. |
| `educationSystem` | enum | `sindh_board`, `cambridge`, `ib`, `edexcel`, `mixed`, or `other`. |
| `educationLevels` | enum array | Non-empty subset of the approved education levels. |
| `genderType` | enum | `coeducation`, `boys`, or `girls`. |
| `primaryEmail` | case-insensitive text | Required and globally unique contact email. |
| `primaryPhone` | varchar(16) | Required E.164 contact number. |
| `websiteUrl`, `logoFileId` | optional | Website must use HTTPS; logo storage integration is introduced separately. |
| `timezone`, `locale`, `currency` | text | Default to `Asia/Karachi`, `en-PK`, and `PKR`. |
| `status` | enum | `trial`, `active`, `past_due`, `suspended`, or `closed`; defaults to `trial`. |
| `onboardedAt` | timestamp | Set only after controlled onboarding completes. |
| audit columns | timestamps, actor IDs, row version | `createdAt`, `updatedAt`, optional actor IDs, and `rowVersion`. |

`citext` is enabled by the migration for case-insensitive `code` and
`primaryEmail` uniqueness. The migration also preserves legacy School rows by
backfilling their names and deterministic placeholder code/contact values;
those placeholders must be corrected through the School administration flow.

## Business Rules

- School creation and administration are platform-level operations.
- School A data must never be accessible to School B.
- School lifecycle is represented by `status`; this iteration has no delete
  endpoint.
- A School may have multiple campuses, user identities, configuration, and
  subscriptions as later modules are introduced.

## API

Base URL: `/api/v1`.

School endpoints are platform-level APIs. They require a Supabase bearer token
and platform Super Admin authorization. During bootstrap, this is resolved by
the server-only `SUPER_ADMIN_USER_IDS` allowlist; it will be replaced by the
Evdance RBAC permission model.

### School Resource

```json
{
  "id": "0b3cda2e-0cdc-4c8f-9856-468c0f82c4b4",
  "code": "evdance-grammar",
  "legalName": "Evdance Grammar School (Private) Limited",
  "displayName": "Evdance Grammar School",
  "ownershipType": "private",
  "educationSystem": "sindh_board",
  "educationLevels": ["primary", "secondary"],
  "genderType": "coeducation",
  "primaryEmail": "admin@evdance.edu.pk",
  "primaryPhone": "+923001234567",
  "websiteUrl": "https://www.evdance.edu.pk",
  "logoFileId": null,
  "timezone": "Asia/Karachi",
  "locale": "en-PK",
  "currency": "PKR",
  "status": "trial",
  "onboardedAt": null,
  "createdAt": "2026-09-17T08:00:00.000Z",
  "updatedAt": "2026-09-17T08:00:00.000Z",
  "rowVersion": 1
}
```

### Create School

```http
POST /api/v1/schools
Content-Type: application/json
```

Required request fields are `code`, `legalName`, `displayName`,
`ownershipType`, `educationSystem`, `educationLevels`, `genderType`,
`primaryEmail`, and `primaryPhone`. `websiteUrl`, `logoFileId`, `timezone`,
`locale`, `currency`, and `status` are optional. The server defaults status to
`trial`.

### List Schools

```http
GET /api/v1/schools?page=1&limit=20&search=grammar&status=active
```

`page` defaults to `1`; `limit` defaults to `20` and is capped at `100`.
`search` is a case-insensitive display-name search. Responses contain `data`
and pagination metadata (`page`, `limit`, `total`, `totalPages`).

### Get and Update School

```http
GET /api/v1/schools/:schoolId
PATCH /api/v1/schools/:schoolId
```

`schoolId` is a UUID. `PATCH` accepts any subset of the mutable create fields. The
server trims non-blank text values before persistence.

### Errors

Validation failures return `VALIDATION_ERROR`; malformed route UUIDs return
`BAD_REQUEST`; unavailable School IDs return `SCHOOL_NOT_FOUND`. Authentication
and authorization failures return `UNAUTHORIZED` or `FORBIDDEN`. Errors use the
standard API error envelope and include `X-Request-Id`.
