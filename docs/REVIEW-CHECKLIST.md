# Evdance — Code Review Checklist

Use this before considering substantial work complete.

## Architecture

* Correct module owns the logic
* No unnecessary dependency introduced
* No circular dependency
* Controllers remain thin
* Business logic is not duplicated across clients

## Reusability

* Existing implementation searched
* Existing abstraction reused where appropriate
* No duplicate helper/service/API
* Shared abstraction has clear responsibility
* Existing callers remain compatible

## Database

* Tenant ownership enforced
* Foreign keys/constraints considered
* Historical information preserved
* Migration included if required
* Transaction used where atomicity matters
* Index impact considered

## Security

* Authentication required where appropriate
* Permission checked
* Scope checked
* Campus checked where applicable
* Resource ownership checked
* Client identifiers are not trusted for authorization
* No secret exposed/logged

## API

* Follows API standards
* DTO validation exists
* Correct status codes
* Stable errors
* Pagination where needed
* Swagger/API documentation updated

## Tests

* Happy path
* Validation failures
* Authorization failures
* Wrong tenant
* Wrong scope/campus
* Important edge cases
* Regression coverage where applicable

## Quality

* No unnecessary `any`
* No dead code
* No random `console.log`
* No unexplained magic values
* Naming follows domain terminology
* Errors are not swallowed

## Documentation

Relevant documentation updated when behavior/contracts changed.

## Final Question

Could another developer or AI agent extend this implementation six months from now without needing to rewrite it?

If not, identify why before marking the task complete.
