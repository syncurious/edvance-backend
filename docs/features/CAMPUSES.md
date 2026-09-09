# Feature — Campuses

## Purpose

Campus represents a branch/location belonging to a school.

## Relationship

```text id="dp4ly8"
School
 ├── Campus
 ├── Campus
 └── Campus
```

Campus is not an independent tenant.

## Business Rules

Every campus belongs to exactly one school.

Campus resources cannot be associated across schools.

Users may have:

* school-wide access
* selected campus access

## Student Transfer

Moving a student between campuses of the same school must preserve the student's school-level identity and applicable history.

Conceptually:

```text id="xb1hsq"
Student
Campus A
   ↓ transfer
Campus B

Same student identity
```

Transfer should be treated as a business workflow rather than blindly updating a campus ID when historical information is required.

## API

Conceptually:

```text id="tqufbj"
GET    /api/v1/campuses
POST   /api/v1/campuses
GET    /api/v1/campuses/:campusId
PATCH  /api/v1/campuses/:campusId
```

## Permissions

Conceptually:

```text id="7l9hzg"
campus.read
campus.create
campus.update
campus.manage
```

Final permission catalog must remain centralized.

## Validation

Campus must belong to the authenticated school context.

Campus codes/names may require tenant-level uniqueness depending on finalized schema.

## Audit

Audit:

* creation
* important updates
* activation/deactivation
* relevant campus transfer operations
