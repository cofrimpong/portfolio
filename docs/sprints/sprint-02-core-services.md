# Sprint 02: Core Services

## Sprint Goal
Implement service contracts and reliable synchronous data flow between Gateway, Data Service, and AI Service.

## Backlog Items
1. Define Pydantic schemas for request, job, result, and error models.
2. Implement Gateway routes for sync analyze and resource retrieval.
3. Implement Data Service endpoints for request/job/result CRUD operations needed by v1.
4. Add persistence layer and migrations for core entities.
5. Implement internal HTTP client wrappers with timeout/retry policies.
6. Standardize error mapping from internal failures to gateway responses.
7. Add request validation and explicit status codes for all endpoints.
8. Add unit tests for service logic and schema validation.
9. Add integration tests for Gateway -> Data/AI sync flow.

## Acceptance Criteria
- `POST /v1/analyze/sync` returns schema-valid result on valid input.
- Request and result records are persisted and retrievable.
- Internal communication failures produce predictable error envelopes.
- Integration tests pass for happy-path and selected failure scenarios.

## Risks
- Contract drift between services.
- AI response variability causing schema mismatch.
- Persistence schema revisions late in sprint.

## Dependencies
- Sprint 01 service scaffolding.
- DB connectivity and migration tooling available.

## Definition of Done
- Core sync flow implemented and tested end-to-end.
- Service contracts documented in technical spec/README.
- Error conventions consistent across all core endpoints.
