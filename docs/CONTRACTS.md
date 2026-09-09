# Evdance — Shared Contract Strategy

## Goal

Clients and backend should agree on contracts without manually recreating the same definitions everywhere.

## Shared Contracts

Use shared packages for genuinely cross-application contracts.

Conceptually:

```text id="xbn5dp"
packages/
├── types/
├── validation/
└── constants/
```

## API Contracts

The backend remains authoritative for API behavior.

OpenAPI should describe HTTP contracts.

Shared TypeScript types may be generated or maintained where they provide real value.

Do not manually create slightly different versions of the same API model in every application.

## Domain vs API Types

Do not assume:

```text id="5kv6ke"
Database Row
=
Domain Model
=
API Response
=
UI Model
```

They may differ intentionally.

Do not expose database models directly simply to avoid mapping.

## Constants

Cross-application constants may include stable concepts such as approved status values where genuinely shared.

Permission identifiers should have one authoritative definition.

## Validation

Share validation only when the exact rule is valid in all consuming environments.

Backend validation remains authoritative for security.

Client validation improves UX but does not replace backend validation.

## Versioning

Changes to shared contracts must consider all consumers.

Do not make a breaking shared-package change without checking dependent applications.
