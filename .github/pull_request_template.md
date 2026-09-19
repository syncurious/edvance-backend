# <Concise PR title>

<!--
Write for a reviewer who has not followed the branch. Replace every placeholder.
Use "Not applicable" or "Not run" instead of leaving a section ambiguous.
Never include credentials, access tokens, database URLs, or other secrets.
-->

## Goal

<!-- What problem does this solve, and why now? -->

## Ticket / reference

<!-- Link ticket, issue, decision, or write "Not provided". -->

## What changed

<!-- Summarize the meaningful implementation changes. -->

-

## Impact

<!-- Describe user, client, operational, compatibility, and deployment impact. -->

### API and contract details

<!--
List added, changed, or removed endpoints. Include request/response examples or
link the relevant OpenAPI/Swagger contract. State validation and error behavior.
Call out breaking changes and backward compatibility explicitly.
-->

```text
Method/path: Not applicable
Authentication: Not applicable
Request: Not applicable
Response: Not applicable
Errors: Not applicable
Compatibility: Not applicable
```

### Data and migration details

<!--
For database changes, include migration order, affected tables/data, backfill,
rollback approach, and deployment dependencies. Do not claim a migration ran
unless it was actually run.
-->

- Migration order: Not applicable.
- Data impact: Not applicable.
- Backfill: Not applicable.
- Rollback: Not applicable.
- Deployment dependencies: Not applicable.

### Security and authorization details

<!--
Describe authentication, authorization, roles, permissions, scope, tenant
isolation, and sensitive-data implications. Frontend checks are never a
substitute for backend enforcement.
-->

- Authentication: Not applicable.
- Authorization / roles / permissions: Not applicable.
- Tenant isolation / resource ownership: Not applicable.
- Sensitive data / secrets: Not applicable.

## Affected areas

- API / controllers
  - Not applicable.
- Business logic / services
  - Not applicable.
- Database / migrations / backfills
  - Not applicable.
- Authentication, authorization, roles, or tenant isolation
  - Not applicable.
- Integrations, queues, events, scheduled jobs, or notifications
  - Not applicable.
- Performance, caching, observability, or infrastructure
  - Not applicable.
- Tests, configuration, or documentation
  - Not applicable.

## Reviewer guide

<!-- List the files, flows, decisions, and edge cases most worth reviewing. -->

1.

## Validation

<!-- Replace with exact commands and their actual outcomes. Leave unchecked if not run. -->

- [ ] `yarn typecheck` — Not run.
- [ ] `yarn lint` — Not run.
- [ ] `yarn test` — Not run.
- [ ] `yarn test:e2e` — Not run.
- [ ] `yarn build` — Not run.
- [ ] Migration validation / application — Not applicable.
- [ ] Manual verification — Not applicable.

## Risks and rollout

<!--
Include environment variables, feature flags, external services, deployment
sequencing, monitoring, rollback triggers, and known limitations. Do not put
secret values here.
-->

- Required environment variables / secrets: Not applicable.
- Feature flags: Not applicable.
- External services: Not applicable.
- Deployment sequence: Not applicable.
- Rollback: Not applicable.

## Follow-ups / out of scope

<!-- State intentionally deferred work and any known gaps. -->

- Not applicable.
