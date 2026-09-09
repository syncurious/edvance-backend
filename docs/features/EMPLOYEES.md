# Feature — Employees

## Purpose

Employee represents a person's employment relationship with a school.

## Important Distinction

```text id="zpqcku"
Employee ≠ Role
```

Examples:

```text id="zok0kn"
Teacher → employment/domain responsibility
Accountant → employment/domain responsibility

Role/Permission → authorization
```

Do not tightly couple employee type with permissions.

## Roles

Employees may receive predefined or custom authorization roles.

Changing someone's job information should not implicitly grant permissions unless an explicit business workflow defines that behavior.

## Campus

Employees may:

* belong primarily to a campus
* work across campuses
* have school-wide responsibilities

Exact assignment model belongs to the approved schema.

## Authentication

Employees requiring system access can have Supabase Auth identities.

Not every future employee record necessarily has to imply application access unless product requirements require it.

## API

Conceptually:

```text id="60jdsh"
GET    /api/v1/employees
POST   /api/v1/employees
GET    /api/v1/employees/:employeeId
PATCH  /api/v1/employees/:employeeId
```

## Audit

Important actions:

* employee creation
* employment status changes
* campus assignment changes
* account/access changes

Role/permission changes must additionally follow authorization audit requirements.
