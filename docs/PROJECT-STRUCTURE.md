# Evdance — Project Structure

## Repository Strategy

This is a backend-only repository. Its root is the NestJS application; clients
consume its API from their own repositories.

Use workspace tooling selected during initial repository setup.

## Backend

```text
src/
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   └── exceptions/
├── config/
├── infrastructure/
│   ├── database/
│   ├── supabase/
│   ├── storage/
│   └── integrations/
├── modules/
├── app.module.ts
└── main.ts
```

Each business module should own its relevant:

```text
controller
service/use-cases
DTOs
entities/models
repository contracts/implementation
errors
tests
```

Do not create folders merely for symmetry when they contain nothing.

## Reusable Backend Code

Keep reusable backend infrastructure under `src/common` or
`src/infrastructure`, with clear responsibilities. Do not create packages only
to share code with future clients; OpenAPI is the authoritative HTTP contract.

## Domain Ownership

Business logic should have an obvious owner.

Example:

```text
Student transfer → students/enrollment domain
Fee calculation → finance domain
Permission evaluation → authorization domain
```

Do not place domain logic in generic utilities.

## Naming

Use consistent names across database, API, backend and clients wherever practical.

Terminology must follow `GLOSSARY.md`.
