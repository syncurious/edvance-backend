# Evdance — Project Overview

> **Phase:** 1 — Project Foundation
> **Status:** Source of Truth
> **Product:** Evdance School Management System
> **Primary Market:** Schools in Karachi, Pakistan

## 1. Product Vision

Evdance is a multi-tenant SaaS School Management System designed initially for schools in Karachi.

The platform should provide schools with one integrated system for managing their campuses, students, guardians, employees, academics, attendance, fees, examinations, communication, and other school operations.

The system must be designed for long-term growth. Features should not be implemented only for the immediate requirement when a clean, reusable solution can support future requirements without unnecessary complexity.

---

## 2. Technology Stack

The planned stack is:

* **Backend:** NestJS
* **Database:** Supabase PostgreSQL
* **Authentication:** Supabase Auth
* **Admin Web:** Next.js
* **Super Admin Web:** Next.js
* **Desktop:** Electron + Next.js
* **Mobile:** React Native CLI
* **Storage / Supabase Services:** Supabase where appropriate

Detailed implementation decisions belong in `02-ARCHITECTURE.md`.

---

## 3. Product Structure

Evdance consists of several client applications communicating with the central backend.

### Evdance Super Admin

Used by the Evdance platform team.

Responsibilities include:

* School management
* Subscription/package management
* Platform configuration
* School onboarding
* Platform-level monitoring
* Future SaaS administration capabilities

### School Admin Portal

Used by authorized school employees.

Responsibilities may include:

* Campus management
* Student management
* Guardian management
* Employee management
* Academic structure
* Attendance
* Fees
* Examinations
* Timetables
* Reports
* Communication
* School configuration

Access depends on permissions.

### Desktop Application

Electron + Next.js application for school operational workflows where desktop functionality is useful.

It shares the same business rules and backend APIs as other Evdance clients.

### Mobile Applications

React Native applications for applicable users such as:

* Students
* Guardians
* Teachers
* Employees

Available functionality depends on the authenticated user's role and permissions.

---

## 4. Multi-Tenant Model

A **School** is the primary tenant.

A school can contain multiple campuses.

Example:

```text
Evdance
└── School
    ├── Campus A
    ├── Campus B
    └── Campus C
```

School data must remain isolated from every other school.

Users belonging to School A must never gain access to School B data unless explicitly operating through an authorized Evdance platform-level capability.

Campus-level access may also be restricted.

---

## 5. School and Campus Identity

A student's identity belongs to a school.

Moving between campuses of the **same school** is considered an internal transfer.

The student's identity and relevant history should continue.

Moving to a **different school tenant** creates a new student entity within that school.

Student records must not automatically transfer between independent schools even when both schools use Evdance.

---

## 6. Guardian Identity

A student may have multiple guardians.

A guardian may have multiple students within the same school.

Guardian relationships are therefore many-to-many.

A guardian's identity is scoped to the school.

If the same physical person has children attending two different schools using Evdance, each school treats that guardian as its own tenant-scoped entity/account context.

---

## 7. Authentication Principle

Authentication accounts are backed by Supabase Auth.

Application/domain identities and authorization must remain controlled by Evdance's own data model.

Authentication answers:

> Who is this user?

Authorization answers:

> What can this user do, in which school/campus, and on which resources?

These concerns must remain separate.

---

## 8. Roles and Permissions

The system must support predefined and custom roles.

Examples may include:

* School Owner
* Administrator
* Principal
* Teacher
* Accountant
* Student
* Guardian

These are examples, not a permanent hard-coded role list.

A custom role can define:

* Role name
* Permissions
* Applicable scope

Authorization may operate at:

* Platform level
* School level
* Campus level
* Resource/context level where required

Detailed rules belong in `04-AUTH-RBAC.md`.

---

## 9. Core Product Principles

Evdance development should follow these principles:

### Tenant Safety

Tenant isolation is non-negotiable.

### Reusability

Existing abstractions should be reused or safely extended before duplicate implementations are introduced.

### Extensibility

Design APIs, helpers, modules, and domain models so reasonable future requirements can be added without unnecessary rewrites.

### Backward Compatibility

Existing behavior should not be broken simply to support a new requirement.

### Single Source of Truth

Business rules should have one authoritative implementation whenever practical.

### Auditability

Important administrative and financial actions should be traceable.

### Consistency

Web, desktop, and mobile clients must follow the same backend business rules.

---

## 10. Documentation Authority

The `/docs` directory is part of the project specification.

AI agents and developers must read relevant documentation before implementing or changing a feature.

When implementation requires changing an established contract, architecture decision, or business rule, the corresponding documentation must also be reviewed and updated.

Implementation must not silently contradict documented decisions.
