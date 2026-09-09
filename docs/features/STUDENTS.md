# Feature — Students

## Purpose

Student represents a learner belonging to a school tenant.

## Identity Rule

Student identity is school-scoped.

### Same School / Different Campus

Preserve:

* student identity
* applicable history

### Different School

Create a new tenant-scoped student entity.

Do not automatically transfer data between independent schools.

## Student Information

The data model should be capable of supporting:

* identity/profile information
* admission information
* contact information
* campus
* enrollment
* guardians
* documents
* status
* academic history

Exact fields belong to the approved database schema.

## Guardians

Student ↔ Guardian is many-to-many.

A student may have multiple guardians.

## Authentication

Every student is expected to be capable of having an associated Supabase Auth identity/account according to the finalized account provisioning workflow.

Domain student records and authentication records remain separate.

## API

Conceptually:

```text id="5cnr14"
GET    /api/v1/students
POST   /api/v1/students
GET    /api/v1/students/:studentId
PATCH  /api/v1/students/:studentId
```

Workflow endpoints may exist for operations such as transfer/promotion rather than forcing them into generic updates.

## Permissions

Conceptually:

```text id="onv4ja"
student.read
student.create
student.update
student.transfer
```

## Security

Every student operation must verify:

```text id="xw7yts"
school
+
permission
+
scope
+
campus/resource access
```

## History

Do not overwrite historically meaningful information when the product requires history.

Examples:

* enrollment
* campus transfer
* class changes
* status changes

## Audit

Important actions include:

* student creation
* sensitive profile changes
* transfer
* withdrawal/status changes
* guardian relationship changes
