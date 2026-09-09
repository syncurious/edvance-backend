# Evdance — Project Structure

## Repository Strategy

Prefer a monorepo so applications can share contracts, configuration and reusable packages.

```text
evdance/
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
├── AGENTS.md
└── package.json
```

Use workspace tooling selected during initial repository setup.

## Backend

```text
apps/backend/src/
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

## Frontend Applications

Organize primarily around features/domain ownership.

Conceptually:

```text
src/
├── app/
├── features/
├── components/
├── hooks/
├── lib/
├── services/
├── stores/
└── types/
```

Feature-specific components stay inside their feature.

Only genuinely reusable components belong in shared component directories.

## Shared Packages

Shared packages must have clear ownership.

### `types`

Cross-application contracts that genuinely need sharing.

### `constants`

Stable shared constants.

### `validation`

Validation schemas/rules that can safely be shared between environments.

### `utils`

Pure generic utilities.

### `config`

Shared tooling/build configuration where appropriate.

## Important Rule

Do not move code into `/packages` simply because two files look similar.

Shared code creates coupling.

Share only when the underlying responsibility and contract are genuinely common.

## Dependency Direction

Applications may depend on packages.

Packages must not depend on applications.

```text
apps → packages

NOT

packages → apps
```

Avoid circular dependencies.

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
