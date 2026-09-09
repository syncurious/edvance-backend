# Feature — Academic Structure

## Purpose

Define the reusable academic foundation used by enrollment, attendance, timetable and examinations.

## Core Concepts

```text id="49s0a6"
Academic Year
Class / Grade
Section
Subject
Enrollment
```

Conceptually:

```text id="xd66cc"
School
└── Academic Year
    └── Campus
        └── Class
            └── Section
                └── Students
```

The final schema may normalize these relationships differently.

## Academic Year

Academic records should be tied to the relevant academic period where required.

Historical academic years must remain queryable.

## Classes

Class represents an academic level.

Examples:

```text id="pqbg9j"
Grade 1
Grade 8
Matric
```

School-specific naming should be supported.

## Sections

Sections divide classes into groups.

Example:

```text id="b90ki3"
Grade 8
 ├── A
 ├── B
 └── C
```

## Enrollment

Student academic placement should be represented historically.

Do not rely only on mutable fields such as:

```text id="sn63xb"
student.class_id
student.section_id
```

if doing so destroys previous academic history.

## Promotion

Promotion is a workflow.

Conceptually:

```text id="59ebtx"
Academic Year 2026
Grade 7

        ↓ promotion

Academic Year 2027
Grade 8
```

Promotion should preserve previous enrollment.

## Subjects

Subjects should support association with relevant academic structures and later teacher/timetable/examination assignments.

## Historical Rule

Academic structure must allow answering:

> Which class, section and campus was this student enrolled in during a particular academic year?

## Dependencies

This foundation will later support:

* Attendance
* Timetable
* Exams
* Results
* Promotion
* Reporting
