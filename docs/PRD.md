# Evdance — Product Requirements Document

> **Phase:** 1 — Project Foundation
> **Status:** Living Product Specification

## 1. Product

**Name:** Evdance

**Type:** Multi-tenant SaaS School Management System

**Initial Market:** Karachi, Pakistan

Evdance provides schools with centralized software for managing administrative, academic, financial, and communication workflows.

---

## 2. Primary Goals

Evdance should:

1. Reduce manual school administration.
2. Centralize school information.
3. Support schools with multiple campuses.
4. Provide secure role-based access.
5. Provide students and guardians access to relevant information.
6. Support school-specific branding and experiences.
7. Maintain accurate historical records.
8. Provide reusable infrastructure for future school-management modules.
9. Prevent data leakage between schools.
10. Scale from smaller schools to larger multi-campus institutions.

---

## 3. Primary Actors

### Platform

* Evdance Super Admin
* Future Evdance operational/support roles

### School

Potential school-side actors include:

* School Owner
* Administrator
* Principal
* Teacher
* Accountant
* Other employees/custom roles

### Academic Users

* Student
* Guardian

Roles must not be assumed to be permanently hard-coded.

---

## 4. School Management

The platform must support:

* Creating schools
* Updating school information
* Activating/deactivating schools
* School branding
* School configuration
* Multiple campuses
* Subscription/package association
* Future configurable modules/features

---

## 5. Campus Management

A school can operate multiple campuses.

Campus-related requirements include:

* Campus information
* Campus-specific configuration where applicable
* Campus-scoped employees
* Campus-scoped academic structures
* Campus-level permissions
* Student campus transfers
* Historical campus association

A student's movement between campuses within the same school must not create a new student identity.

---

## 6. Academic Structure

The system should eventually support concepts including:

* Academic years/sessions
* Classes/grades
* Sections
* Subjects
* Class assignments
* Teacher assignments
* Student enrollment
* Promotion
* Transfer
* Graduation/completion
* Historical academic records

Exact data structures will be defined in the database and feature specifications.

---

## 7. Student Management

Student management should eventually support:

* Admission
* Student profile
* School identity/admission information
* Campus
* Academic enrollment
* Class/section
* Guardians
* Contact information
* Documents
* Status
* Attendance
* Fees
* Examination/results
* Academic history
* Campus transfer history

Students should be designed as long-lived entities inside their school tenant.

---

## 8. Guardian Management

Requirements include:

* Multiple guardians per student
* Multiple students per guardian within the same school
* Relationship type
* Contact information
* Authentication
* Appropriate student access
* Communication preferences where applicable

Guardian access must only expose students explicitly related to that guardian.

---

## 9. Employee Management

The system should support different kinds of school employees without forcing all employees into one simplistic permission model.

Possible employees include:

* Teachers
* Administrators
* Principals
* Accountants
* Receptionists
* Other school-defined roles

Employment/domain information and authorization roles should remain conceptually separate.

---

## 10. Attendance

The platform should eventually support:

* Student attendance
* Employee attendance where required
* Daily attendance
* Attendance statuses
* Corrections
* Attendance history
* Reports
* Permission-controlled modifications

Detailed behavior will be defined in the Attendance feature specification.

---

## 11. Fees and Finance

Expected capabilities include:

* Fee structures
* Student fee assignment
* Discounts/concessions
* Invoices/challans where applicable
* Payments
* Outstanding balances
* Payment history
* Receipts
* Financial reports
* Adjustments
* Audit trails

Financial records require strict authorization and auditability.

---

## 12. Examinations

Expected capabilities include:

* Examination definitions
* Exam schedules
* Subjects
* Marks
* Grades
* Results
* Report cards
* Historical results

---

## 13. Timetable

Expected capabilities include:

* Class timetable
* Teacher timetable
* Subject allocation
* Period configuration
* Conflict prevention/detection where applicable

---

## 14. Communication

The system may support:

* Announcements
* Notices
* Push notifications
* In-app notifications
* SMS
* Email

Communication architecture should allow additional delivery channels later.

---

## 15. Branding

Schools may receive school-branded experiences.

Configurable branding may include:

* Logo
* Colors
* School name
* Application assets
* Other theme configuration

Most application functionality and components should remain shared.

Brand differences must not create unnecessary duplicated application logic.

---

## 16. Authentication

Supabase Auth will provide authentication infrastructure.

Users may have separate authentication/account contexts for different school tenants where required by the product model.

Authentication does not itself grant access to school resources.

Every protected operation must also pass authorization checks.

---

## 17. Authorization

The system requires RBAC with scope.

Permissions should answer:

```text
Can USER
perform ACTION
on RESOURCE
inside SCHOOL
and, where applicable, CAMPUS?
```

Custom roles must be supported.

Detailed authorization architecture belongs in `04-AUTH-RBAC.md`.

---

## 18. Data Isolation

This is a critical product requirement.

Every tenant-owned record must have a clear ownership path back to its school.

Queries and operations involving tenant-owned resources must enforce tenant context.

Client-provided identifiers alone must never be trusted as proof of tenant access.

Cross-school data leakage is considered a critical security defect.

---

## 19. History

Important historical information should be preserved where business requirements require it.

Examples:

* Campus transfers
* Enrollment history
* Academic years
* Class changes
* Results
* Fee transactions
* Important status changes

The system should avoid overwriting historically meaningful information when a historical record is required.

---

## 20. Auditability

Sensitive operations should support audit trails.

Examples:

* Permission changes
* Role changes
* Student transfers
* Fee adjustments
* Payment changes
* Result changes
* Important configuration changes

An audit record should eventually be able to answer:

* Who performed the action?
* What action occurred?
* Which resource was affected?
* When?
* In which school/campus context?
* What meaningful values changed?

---

## 21. Non-Functional Requirements

### Security

Tenant isolation and authorization are mandatory.

### Maintainability

Code should be modular, documented, typed, and testable.

### Performance

Common school workflows should avoid unnecessary database/API work.

### Scalability

Architecture must support growth in:

* Schools
* Campuses
* Students
* Users
* Transactions
* Features

### Reliability

Critical operations should avoid partial or inconsistent state.

### Observability

Backend operations should support appropriate logging and monitoring.

---

## 22. Future Scope

Potential future capabilities may include:

* Payroll
* HR
* Library
* Transport
* Inventory
* Admissions portal
* Learning management
* Homework
* Parent-teacher communication
* Online payments
* Biometric integrations
* Advanced analytics
* Additional third-party integrations

Future scope should influence extensibility but should **not** cause unnecessary premature complexity.

---

## 23. Feature Specification Rule

This PRD defines product-level requirements.

Detailed features must later be documented under:

```text
/docs/features/
```

Feature specifications should define:

* Purpose
* Actors
* Business rules
* Permissions
* Data requirements
* APIs
* Validation
* Edge cases
* Events
* Audit requirements
* Testing requirements

The PRD should not become a replacement for detailed feature specifications.
