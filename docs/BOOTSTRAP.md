# Evdance — Repository Bootstrap

> Use this document when initializing the Evdance repository.

## Target Structure

```text
evdance/
├── AGENTS.md
├── DOCS.md
├── BOOTSTRAP.md
│
├── apps/
│   ├── backend/
│   ├── admin/
│   ├── super-admin/
│   ├── desktop/
│   └── mobile/
│
├── packages/
│   ├── types/
│   ├── constants/
│   ├── validation/
│   ├── utils/
│   └── config/
│
├── docs/
│   ├── PROJECT.md
│   ├── PRD.md
│   ├── GLOSSARY.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── DATABASE-TOOLING.md
│   ├── AUTH-RBAC.md
│   ├── API-STANDARDS.md
│   ├── SECURITY.md
│   ├── CONTRACTS.md
│   ├── CODING-STANDARDS.md
│   ├── REUSABILITY.md
│   ├── ERROR-HANDLING.md
│   ├── PROJECT-STRUCTURE.md
│   ├── SHARED-FOUNDATION.md
│   ├── TECH-STACK.md
│   ├── DEPENDENCIES.md
│   ├── ENVIRONMENT.md
│   ├── TESTING.md
│   ├── OBSERVABILITY.md
│   ├── GIT-WORKFLOW.md
│   ├── QUALITY-GATES.md
│   ├── DECISIONS.md
│   ├── BEFORE-CODING.md
│   ├── AI-WORKFLOW.md
│   ├── REVIEW-CHECKLIST.md
│   ├── CHANGE-MANAGEMENT.md
│   ├── FEATURES.md
│   └── features/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
├── .gitignore
└── pnpm-lock.yaml
```

## Bootstrap Order

Initialize in this order:

```text
1. Git repository
2. pnpm workspace
3. Turborepo
4. shared TypeScript configuration
5. ESLint
6. Prettier
7. backend NestJS application
8. environment validation
9. logging
10. error handling
11. database + Drizzle
12. Supabase integration
13. authentication foundation
14. authorization foundation
15. Swagger/OpenAPI
16. health checks
17. testing infrastructure
18. CI quality commands
```

Do not generate all business modules during bootstrap.

## Root Commands

The repository should eventually support consistent commands such as:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm format
```

Database commands should also be standardized.

## Environment

Create safe `.env.example` files.

Never create or commit real credentials.

## Initial Verification

Before feature development begins, verify:

```text
pnpm install        ✓
pnpm build          ✓
pnpm typecheck      ✓
pnpm lint           ✓
pnpm test           ✓
backend starts      ✓
health endpoint     ✓
Swagger works       ✓
database connects   ✓
configuration validates ✓
```

## Do Not Bootstrap Prematurely

Do not create empty implementations for:

* students
* fees
* attendance
* exams
* timetable
* notifications

Their modules should be introduced when their implementation begins.

Build the foundation first.
