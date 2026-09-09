# Evdance — Git Workflow

## Main Branches

```text id="8lqn6s"
main
develop
```

`main` represents production-ready code.

`develop` represents integrated development work.

## Feature Branches

Examples:

```text id="9r6dvc"
feature/student-admission
feature/attendance
fix/guardian-access
refactor/date-utils
```

Use descriptive branch names.

## Commits

Prefer small, meaningful commits.

Suggested convention:

```text id="35ka0z"
feat:
fix:
refactor:
docs:
test:
chore:
```

Examples:

```text id="3v94kg"
feat: add student campus transfer workflow

fix: enforce guardian student ownership

refactor: extend shared date formatter
```

## Commit Scope

Do not mix:

```text id="ghd80d"
new feature
+
unrelated refactor
+
dependency upgrades
```

without a valid reason.

## Generated Files

Commit required generated artifacts such as database migrations.

Do not commit:

* build output
* local environment files
* secrets
* temporary AI files
* editor-specific garbage

## Pull Requests

Substantial PRs should explain:

```text id="ndx4lf"
What changed
Why
Database changes
API changes
Permission changes
Testing performed
```

## AI Commits

AI-generated changes follow exactly the same standards as human changes.

Never commit automatically generated code without reviewing whether it follows Evdance architecture.
