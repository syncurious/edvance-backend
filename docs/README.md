# Evdance Documentation

> Master index and source-of-truth map for the Evdance project.

AI agents must use this file to determine which documentation applies to their task.

## Start Here

For a new AI/development session:

```text id="0y48tb"
/AGENTS.md
    ↓
/docs/README.md
    ↓
/docs/AI-START.md
    ↓
Relevant documentation
```

Do not read every document unnecessarily. Read the documents relevant to the current task.

---

## Project

| Document      | Purpose                                          |
| ------------- | ------------------------------------------------ |
| `PROJECT.md`  | Project vision and high-level product definition |
| `PRD.md`      | Product requirements                             |
| `GLOSSARY.md` | Official domain terminology                      |
| `FEATURES.md` | Feature registry                                 |

## Architecture

| Document              | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `ARCHITECTURE.md`     | Overall system architecture                |
| `DATABASE.md`         | Database design standards                  |
| `DATABASE-TOOLING.md` | Drizzle and database tooling               |
| `AUTH-RBAC.md`        | Authentication, permissions and scope      |
| `API-STANDARDS.md`    | REST API standards                         |
| `SECURITY.md`         | Security and tenant-isolation requirements |
| `CONTRACTS.md`        | Shared/API contract strategy               |
| `TECH-STACK.md`       | Approved technologies                      |
| `DECISIONS.md`        | Architectural decision history             |

## Engineering

| Document               | Purpose                              |
| ---------------------- | ------------------------------------ |
| `CODING-STANDARDS.md`  | TypeScript and coding conventions    |
| `REUSABILITY.md`       | Reuse → Extend → Generalize → Create |
| `ERROR-HANDLING.md`    | Error architecture                   |
| `PROJECT-STRUCTURE.md` | Repository organization              |
| `SHARED-FOUNDATION.md` | Shared infrastructure strategy       |
| `DEPENDENCIES.md`      | Dependency rules                     |
| `ENVIRONMENT.md`       | Environment configuration            |
| `OBSERVABILITY.md`     | Logging and monitoring               |

## Development Process

| Document                | Purpose                                                 |
| ----------------------- | ------------------------------------------------------- |
| `AI-START.md`           | Instructions for new AI agents                          |
| `BOOTSTRAP.md`          | Repository initialization                               |
| `AI-WORKFLOW.md`        | AI task workflow                                        |
| `BEFORE-CODING.md`      | Pre-coding checklist                                    |
| `CHANGE-MANAGEMENT.md`  | Keeping code/docs synchronized when requirements change |
| `REVIEW-CHECKLIST.md`   | Code review checklist                                   |
| `DEFINITION-OF-DONE.md` | Universal completion requirements                       |
| `QUALITY-GATES.md`      | Required quality checks                                 |
| `TESTING.md`            | Testing strategy                                        |
| `GIT-WORKFLOW.md`       | Git conventions                                         |

## Feature Specifications

Located under:

```text id="t4lrlj"
docs/features/
```

Current specifications:

| Document              | Domain                                  |
| --------------------- | --------------------------------------- |
| `FEATURE-TEMPLATE.md` | Template for new feature specifications |
| `SCHOOLS.md`          | Schools / tenant management             |
| `CAMPUSES.md`         | Campus management                       |
| `STUDENTS.md`         | Student management                      |
| `GUARDIANS.md`        | Guardian management                     |
| `EMPLOYEES.md`        | Employee management                     |
| `ACADEMICS.md`        | Academic structure                      |

---

# Which Documents Should AI Read?

## Database Work

Read:

```text id="rvpckq"
DATABASE.md
DATABASE-TOOLING.md
SECURITY.md
relevant feature specification
```

## API Work

Read:

```text id="m1k1mh"
API-STANDARDS.md
AUTH-RBAC.md
SECURITY.md
relevant feature specification
```

## Authentication / Permissions

Read:

```text id="dl7xwc"
AUTH-RBAC.md
SECURITY.md
DATABASE.md
```

## New Feature

Read:

```text id="a2ec3x"
PRD.md
relevant feature specification
ARCHITECTURE.md
DATABASE.md
AUTH-RBAC.md
API-STANDARDS.md
```

## Shared Utility / Infrastructure

Read:

```text id="qgj35n"
ARCHITECTURE.md
SHARED-FOUNDATION.md
REUSABILITY.md
CODING-STANDARDS.md
```

## Requirement Changed

Read:

```text id="42lv1o"
CHANGE-MANAGEMENT.md
DECISIONS.md
relevant feature specification
```

Then update every affected source-of-truth document.

---

# Source-of-Truth Priority

When information conflicts:

```text id="0tdgbh"
Latest explicit project-owner decision
            ↓
DECISIONS.md
            ↓
Feature specification
            ↓
Architecture / Security documentation
            ↓
General engineering standards
            ↓
Existing implementation
```

A conflict must not simply be ignored.

After determining the correct requirement, synchronize affected documentation and implementation.

---

# Documentation Maintenance

Documentation is part of the project.

When a persistent requirement changes, update affected documentation in the same task.

Do not knowingly leave obsolete rules in MD files.

Follow:

```text id="h3k4ck"
CHANGE-MANAGEMENT.md
```

for the complete process.

---

# Documentation Structure Rule

`AGENTS.md` is the only project-governance Markdown file intentionally kept at repository root.

All other Evdance documentation belongs under:

```text id="hfg2hd"
/docs
```

When creating new documentation, update this `README.md` if the document becomes part of the project's permanent documentation system.
