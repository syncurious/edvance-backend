# Evdance — Dependency Rules

## Principle

Dependencies have long-term maintenance cost.

Do not install a package simply because it saves a few lines of code.

## Before Adding a Dependency

Check:

1. Is equivalent functionality already available?
2. Does the framework/platform provide it?
3. Do we already have a dependency solving it?
4. Is the library maintained?
5. Is TypeScript support good?
6. Is it compatible with our environments?
7. Is its security history acceptable?
8. Is the dependency worth its maintenance cost?

## Versions

Maintain a single, reviewed dependency set and lockfile for this backend.

## Major Dependencies

Major architectural dependencies require deliberate selection.

Examples:

* ORM/query builder
* validation library
* logger
* queue system
* state management
* API contract strategy

Do not let individual feature agents independently choose competing libraries.

## Lockfile

Commit and maintain the repository lockfile.

CI/deployment should use deterministic installs.

## Upgrades

Major upgrades should:

* review breaking changes
* run tests
* verify builds
* verify migrations when applicable

Do not combine major dependency upgrades with unrelated feature work without a reason.

## Removal

Remove dependencies that are genuinely unused.

Verify repository-wide usage before removal.

## AI Rule

AI agents must search `package.json` and the existing codebase before installing a new package.
