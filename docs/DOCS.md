# Evdance — Documentation Map

> **This is the entry point for project documentation.**
> AI agents must read `AGENTS.md` and this file before substantial work.

## Documentation Authority

Documentation represents the current intended state of Evdance.

If the user changes a requirement, architecture decision, business rule, technology, API behavior, or convention, documentation must be updated as part of that change.

**Old documentation must never knowingly remain as the source of truth after a decision changes.**
Root Documentation
├── AI-START.md    → New AI agent entry point
├── AGENTS.md      → Mandatory AI development rules
├── DOCS.md        → Master documentation map (this file)
└── BOOTSTRAP.md   → Repository initialization guide

## Core

| File               | Purpose                |
| ------------------ | ---------------------- |
| `AGENTS.md`        | Master AI instructions |
| `docs/PROJECT.md`  | Product overview       |
| `docs/PRD.md`      | Product requirements   |
| `docs/GLOSSARY.md` | Domain terminology     |

## Architecture

| File                       | Purpose                        |
| -------------------------- | ------------------------------ |
| `docs/ARCHITECTURE.md`     | System architecture            |
| `docs/DATABASE.md`         | Database standards             |
| `docs/DATABASE-TOOLING.md` | Drizzle/database tooling       |
| `docs/AUTH-RBAC.md`        | Authentication & authorization |
| `docs/API-STANDARDS.md`    | API conventions                |
| `docs/SECURITY.md`         | Security requirements          |
| `docs/CONTRACTS.md`        | Shared contracts               |

## Engineering

| File                        | Purpose                   |
| --------------------------- | ------------------------- |
| `docs/CODING-STANDARDS.md`  | Coding conventions        |
| `docs/REUSABILITY.md`       | Reuse/extension rules     |
| `docs/ERROR-HANDLING.md`    | Error architecture        |
| `docs/PROJECT-STRUCTURE.md` | Repository structure      |
| `docs/SHARED-FOUNDATION.md` | Shared infrastructure     |
| `docs/TECH-STACK.md`        | Approved technologies     |
| `docs/DEPENDENCIES.md`      | Dependency rules          |
| `docs/ENVIRONMENT.md`       | Environment configuration |

## Development Process

| File                         | Purpose                            |
| ------------------------------| ------------------------------------|
| `docs/AI-WORKFLOW.md`        | AI implementation workflow         |
| `docs/BEFORE-CODING.md`      | Pre-development checklist          |
| `docs/REVIEW-CHECKLIST.md`   | Review requirements                |
| `docs/QUALITY-GATES.md`      | Merge requirements                 |
| `docs/TESTING.md`            | Testing strategy                   |
| `docs/GIT-WORKFLOW.md`       | Git conventions                    |
| `docs/OBSERVABILITY.md`      | Logging/monitoring                 |
| `docs/DECISIONS.md`          | Architecture decisions             |
| `docs/CHANGE-MANAGEMENT.md`  | Requirement/change synchronization |
| `docs/DEFINITION-OF-DONE.md` | Universal completion requirements  |

## Features

```text
docs/features/
├── FEATURE-TEMPLATE.md
├── SCHOOLS.md
├── CAMPUSES.md
├── STUDENTS.md
├── GUARDIANS.md
├── EMPLOYEES.md
└── ACADEMICS.md
```

`docs/FEATURES.md` is the feature registry.

## Reading Strategy

AI does **not** need to read every document for every tiny task.

Always read:

```text
AGENTS.md
DOCS.md
```

Then read only documents relevant to the task.

Example:

```text
Student transfer request

→ STUDENTS.md
→ ACADEMICS.md
→ DATABASE.md
→ AUTH-RBAC.md
→ API-STANDARDS.md
```

## Conflict Priority

When documentation conflicts:

```text
Latest explicit user decision
        ↓
DECISIONS.md
        ↓
Feature specification
        ↓
Architecture/security documents
        ↓
General engineering standards
```

The conflict must then be fixed in documentation.

Never knowingly leave contradictory documentation behind.
