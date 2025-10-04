# ADR-005: Contact Form Architecture and Delivery Modes

## Status
Accepted

## Context
The contact form must function reliably during local development and in production. Local developers currently encounter opaque errors because the API worker expects Resend credentials that are not available in development. We also lacked automated coverage for the contact flow, making regressions easy. We need an architecture that:

- Keeps the Astro site and Hono worker decoupled while supporting a smooth developer experience.
- Surfaces actionable error messaging to the React client.
- Provides a safe default behaviour when email delivery secrets are not configured.
- Enables automated testing across both the worker and client layers.

## Decision
We introduced a three-tier contact form architecture with explicit delivery modes:

1. **React `ContactForm` component** – Handles validation, submission status, and displays API-supplied feedback. Client logic now parses API responses, surfaces error details, and differentiates between stub and live delivery states.
2. **Astro `/api/contact` proxy** – Continues to proxy requests during development so the UI can talk to the worker using same-origin relative URLs.
3. **Hono worker `/contact/submit` endpoint** – Owns validation (Zod), rate limiting, and email dispatch via Resend. The worker now honours a `CONTACT_FORM_MODE` environment variable:
   - `stub` (default) captures submissions, logs sanitized payloads, and returns a success response without sending email.
   - `live` requires `RESEND_API_KEY` and `CONTACT_EMAIL`, then delivers notifications via Resend.

Automated tests cover both layers: Vitest exercises worker behaviour for stub and live modes, and React Testing Library verifies that the client surfaces success and failure messages.

## Rationale
- **Developer Experience**: Stub mode removes the dependency on third-party secrets while still confirming the end-to-end flow. Developers receive clear feedback instead of opaque 500 errors.
- **Safety**: Live mode is opt-in and explicitly guarded by environment configuration, preventing accidental email sends from local machines.
- **Observability**: The worker logs masked submission metadata in both modes, aiding troubleshooting without exposing sensitive data.
- **Testability**: Dedicated test suites for the worker and client catch regressions in validation, messaging, and integration logic.

## Consequences
### Positive
- Local development works out-of-the-box with meaningful UI feedback.
- Production can switch to real email delivery by setting `CONTACT_FORM_MODE=live` alongside Resend secrets.
- Automated tests establish a baseline safety net for both API and client behaviour.
- Documentation now captures the delivery-mode contract for future collaborators.

### Negative
- Additional environment management is required; deployments must ensure `CONTACT_FORM_MODE` is correct per environment.
- Worker logic is slightly more complex due to dual-mode handling.

## Follow-Up Actions
- Configure deployment pipelines to set `CONTACT_FORM_MODE=live` in production and stage environments once secrets are available.
- Implement integration tests (Playwright) to exercise the full browser-to-worker flow.
- Add monitoring/alerting around contact form failures once deployed.

---
**Date**: 2025-02-03  **Author**: Codex Agent  **Decision Drivers**: Developer experience, reliability, testability
