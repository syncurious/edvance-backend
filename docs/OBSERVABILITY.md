# Evdance — Logging & Observability

## Logging

Use structured application logging.

Each applicable request should support a request/correlation ID.

Useful context may include:

```text
requestId
module
operation
schoolId
campusId
userId
```

Only include identifiers when safe and useful.

## Never Log

Do not log:

* passwords
* JWTs
* refresh tokens
* service-role keys
* database credentials
* full sensitive payloads
* unnecessary personal information

## Log Levels

Use meaningful levels:

```text
debug
info
warn
error
```

Do not classify ordinary successful operations as errors.

## Error Tracking

Unexpected server failures should be observable and traceable through request IDs.

## Health

Backend should expose appropriate health/readiness checks for deployment infrastructure.

Health checks should not expose sensitive configuration.

## Audit Logs

Application logs and audit logs are different.

Application logs:

> Help operate/debug the system.

Audit logs:

> Record important business/security actions.

Do not treat ordinary server logs as the permanent audit system.

## Metrics

Architecture should allow future metrics such as:

* API latency
* error rates
* queue failures
* database performance
* external provider failures

Introduce specific monitoring infrastructure when operational requirements justify it.
