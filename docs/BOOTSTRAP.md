# Evdance — Repository Bootstrap

> Use this document when initializing the Evdance repository.

## Target Structure

```text
Edvance-backend/
├── AGENTS.md
├── src/
├── test/
├── drizzle/
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
├── tsconfig.json
├── .gitignore
└── yarn.lock
```

## Bootstrap Order

Initialize in this order:

```text
1. Git repository
2. Yarn package configuration
3. TypeScript configuration
4. ESLint
5. Prettier
6. NestJS application
7. environment validation
8. logging
9. error handling
10. database + Drizzle
11. Supabase integration
12. authentication foundation
13. authorization foundation
14. Swagger/OpenAPI
15. health checks
16. testing infrastructure
17. CI quality commands
```

Do not generate all business modules during bootstrap.

## Root Commands

The repository should eventually support consistent commands such as:

```bash
yarn dev
yarn build
yarn lint
yarn typecheck
yarn test
yarn format
```

Database commands should also be standardized.

## Environment

Create safe `.env.example` files.

Never create or commit real credentials.

## Initial Verification

Before feature development begins, verify:

```text
yarn install        ✓
yarn build          ✓
yarn typecheck      ✓
yarn lint           ✓
yarn test           ✓
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
