# Evdance — Security Standards

## Primary Rule

Every request is untrusted until authenticated, validated and authorized.

## Tenant Isolation

Cross-school data leakage is a critical security defect.

Every tenant-owned resource must be verified against authenticated school context.

## Authorization

Never trust:

```text id="azr2nw"
schoolId
campusId
studentId
guardianId
role
permissions
```

merely because the client sent them.

Verify ownership and scope server-side.

## Authentication Tokens

Tokens must:

* be transmitted securely
* never be logged
* never be committed
* never be exposed unnecessarily

## Supabase Service Role

Service-role credentials are backend-only.

Never expose them to:

* Next.js browser code
* Electron renderer
* React Native
* public environment variables

## Passwords

Evdance must never store plaintext passwords.

Authentication credentials belong to the authentication provider.

## Input

Validate all external input.

This includes:

* body
* query
* URL parameters
* headers where applicable
* uploaded files
* webhook payloads

## SQL

Always parameterize queries.

Never concatenate untrusted input into SQL.

## Files

Uploads must eventually validate:

* size
* MIME/type
* authorization
* storage location

File names supplied by users must not directly control unsafe filesystem/storage paths.

## Rate Limiting

Authentication and abuse-sensitive APIs should support rate limiting.

Exact limits can be configured later.

## Sensitive Operations

Important operations may require stronger safeguards.

Examples:

* permission changes
* financial adjustments
* account changes
* destructive operations

## Secrets

Secrets belong in secure environment/deployment configuration.

Never commit them.

## Errors

Do not expose internal stack traces, SQL errors or security implementation details to clients.

## Logs

Avoid unnecessary personal/sensitive information.

Never log credentials or tokens.

## Dependencies

Review security implications of major dependencies.

Keep critical dependencies reasonably current.

## Security Rule for AI

When convenience conflicts with security:

```text id="51mbmu"
Security wins.
```

AI must not weaken authentication, authorization, validation or tenant isolation to make a feature easier to implement.
