# Sprint 03: AI and Worker

## Sprint Goal
Deliver asynchronous job processing with worker execution, status tracking, and resilient retry behavior.

## Backlog Items
1. Implement `POST /v1/analyze/async` in Gateway to create job and enqueue message.
2. Implement queue producer/consumer adapters.
3. Implement Worker polling/consumption loop with graceful shutdown.
4. Add job status transitions (`queued` -> `processing` -> `completed|failed`).
5. Implement Worker-to-AI-Service inference call path.
6. Implement Worker persistence updates to Data Service.
7. Add retry/backoff handling and terminal failure states.
8. Add job status retrieval endpoint in Gateway.
9. Add tests for queue handling, retries, and async lifecycle.

## Acceptance Criteria
- Async request returns `job_id` immediately.
- Worker processes jobs and updates statuses correctly.
- Failed jobs retry up to configured limit then mark `failed`.
- Job results become retrievable via Gateway status/result routes.
- Logs include `job_id`, attempt count, and terminal outcome.

## Risks
- Queue implementation mismatch across local/dev environments.
- Duplicate processing without idempotency guards.
- Transient AI failures causing noisy retries.

## Dependencies
- Stable contracts from Sprint 02.
- Queue backend availability in Docker Compose.

## Definition of Done
- Async flow works end-to-end in local stack.
- Retry and failure behavior validated by tests.
- Worker architecture and job lifecycle documented clearly.
