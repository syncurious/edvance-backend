# Frontend Authentication and RBAC Integration

## Status

Backend foundation implemented. The frontend must not be changed until product
approval is given for its login, route, and workspace behavior.

## Login flow

The frontend authenticates with Supabase Auth. It sends the resulting access
token to the backend on every protected request:

```http
Authorization: Bearer <supabase-access-token>
```

Immediately after a successful Supabase session restore or login, call:

```http
GET /api/v1/auth/session
```

The API returns the verified identity plus database-backed platform roles,
permissions, and active school memberships. A browser must treat this response
as the source for interface selection; it must never infer access from email,
URL parameters, or locally stored role data.

## Session contract

```json
{
  "data": {
    "user": { "id": "uuid", "email": "admin@example.com" },
    "platform": {
      "roles": ["platform_super_admin"],
      "permissions": ["platform.manage"]
    },
    "memberships": [
      {
        "id": "uuid",
        "scope": "school",
        "school": { "id": "uuid", "displayName": "Example School" },
        "roles": ["school_admin"],
        "permissions": ["school.manage"]
      }
    ]
  }
}
```

An authenticated user with no active membership receives empty arrays. The
frontend should show an access-pending state, not a dashboard.

## Intended frontend behavior (not yet implemented)

1. Restore the Supabase session when the application starts.
2. If no session exists, redirect to the shared login page.
3. Fetch `/auth/session` with the Supabase access token.
4. A user with `platform.manage` enters the platform workspace.
5. A user with one school membership enters that school workspace.
6. A user with several school memberships must choose an active school; keep
   the chosen school only as UI state and validate every action through the API.
7. Hide unavailable navigation items based on permissions, but rely on backend
   `403` responses for actual enforcement.
8. Clear session context and cached tenant data on sign-out or token refresh
   failure.

## Initial provisioning API

Only a Platform Super Admin can call:

```http
POST /api/v1/auth/system-role-assignments
```

Payload for a School Admin:

```json
{
  "userId": "Supabase user UUID",
  "email": "admin@example.com",
  "roleCode": "school_admin",
  "schoolId": "Evdance school UUID"
}
```

Payload for a Platform Super Admin omits `schoolId` and uses
`platform_super_admin`. Assignment is idempotent.

## Bootstrap and security

The `SUPER_ADMIN_USER_IDS` environment setting remains a temporary bootstrap
escape hatch so the first Platform Super Admin can assign the database role.
After that user has the `platform_super_admin` role, remove the environment
setting. The backend continues to verify role membership in the database on
each protected platform request.

School selection in the frontend is never authorization. Future school APIs
must derive tenant context from the authenticated membership and independently
verify school and campus ownership.
