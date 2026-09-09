# Evdance — Authentication & Authorization

> **Authentication:** Supabase Auth
> **Authorization:** Evdance Backend
> **Model:** RBAC + Scope

## Fundamental Rule

Authentication and authorization are separate.

```text
Authentication
"Who are you?"

Authorization
"What are you allowed to do here?"
```

Supabase Auth proves identity.

NestJS determines access.

## Authentication Flow

Conceptually:

```text
Client
  ↓
Supabase Authentication
  ↓
Access Token
  ↓
NestJS API
  ↓
Verify Token
  ↓
Resolve Evdance identity
  ↓
Resolve School
  ↓
Resolve Role + Permissions + Scope
  ↓
Authorize Request
```

A valid JWT does **not** automatically mean the request is authorized.

## Tenant Context

Authorization must resolve:

```text
user
school
role/membership
scope
permissions
```

Where applicable:

```text
campus
resource ownership
```

## School Isolation

A school user must never access another school's resources by changing an ID in:

* URL
* query parameters
* body
* headers

Resource ownership must be independently verified.

## Roles

Roles group permissions.

Example roles may include:

```text
School Owner
Administrator
Principal
Teacher
Accountant
Custom Role
```

Role names must not become the primary authorization logic.

Avoid:

```ts
if (user.role === 'principal')
```

Prefer:

```ts
requirePermission('student.update')
```

combined with applicable scope.

## Permissions

Permissions represent capabilities.

Conceptual convention:

```text
resource.action
```

Examples:

```text
student.read
student.create
student.update

attendance.read
attendance.mark
attendance.update

fee.read
fee.collect
fee.adjust
```

The final permission catalog must be centrally defined.

Do not invent permission strings independently throughout modules.

## Scope

Permission alone is insufficient.

Authorization evaluates:

```text
permission + scope + resource context
```

Example:

A user may have:

```text
student.read
```

but only for:

```text
Campus A
```

That user must not automatically read Campus B students.

## Scope Levels

Evdance may support:

```text
PLATFORM
SCHOOL
CAMPUS
```

Additional resource/context-specific restrictions can be introduced where required.

## Platform Scope

Reserved for authorized Evdance platform operations.

Platform privileges must not accidentally flow into ordinary school APIs.

## School Scope

Permission applies across the authorized school.

## Campus Scope

Permission applies only to one or more authorized campuses.

A user may have multiple campus assignments.

## Custom Roles

Schools may create custom roles.

A custom role should be able to define:

```text
name
permissions
scope behavior
status
```

Users can then receive applicable role assignments.

## Role Assignment

Role assignment must retain enough context to answer:

```text
Which user?
Which school?
Which role?
Which scope?
Which campuses if applicable?
Is the assignment active?
```

## Students

Student permissions must be constrained to the authenticated student's own permitted resources unless explicitly authorized otherwise.

## Guardians

Guardian access must be based on explicit guardian ↔ student relationships.

Never trust a student ID supplied by the guardian client without checking that relationship.

## Teachers

Teacher access should be based on permissions plus relevant academic assignments when required.

Being a teacher does not automatically grant access to every student in a school.

## Backend Enforcement

Authorization belongs in backend enforcement.

Possible NestJS pattern:

```ts
@RequirePermissions('student.update')
@Scope(...)
```

followed by guards/policies.

Controllers should declare authorization requirements.

Central guards/policy services should evaluate them consistently.

## Defense in Depth

Where useful, security should exist at multiple layers:

```text
NestJS Authorization
        +
Database constraints
        +
Supabase/PostgreSQL security controls
```

No single client-side check is considered security.

## Service Role

Supabase service-role credentials are server-only.

They must never be exposed to:

* browser
* Electron renderer
* React Native
* public configuration

## Permission Changes

Sensitive authorization changes should be audited.

Examples:

* role created
* role deleted
* permission added
* permission removed
* role assigned
* role revoked
* scope changed

## Deny by Default

When authorization cannot confidently determine that an operation is allowed:

```text
DENY
```

Missing scope, unknown permission, invalid tenant context, or inconsistent ownership must not result in access.

## Authorization Checklist

Every protected endpoint must answer:

```text
Who is the user?
Which school?
What permission is required?
What scope does the user have?
Which resource is being accessed?
Does the resource belong to the school?
Does campus/resource scope permit access?
```

If any required answer fails, reject the operation.
