# Sprint 04: Integration and Hardening

## Sprint Goal
Raise reliability and interview readiness with integrated tests, stronger observability, and polished documentation/demo assets.

## Backlog Items
1. Add cross-service integration test suite for sync and async paths.
2. Add resilience tests for dependency timeout/failure conditions.
3. Improve structured logging fields and correlation ID propagation.
4. Add health/readiness checks that validate dependencies.
5. Harden internal client retry/timeouts and error categorization.
6. Prepare demo seed/sample data for repeatable walkthrough.
7. Update architecture documentation with sequence diagrams and tradeoffs.
8. Add interview notes: scaling strategy, bottlenecks, and future enhancements.
9. Finalize developer runbook for setup, tests, and troubleshooting.

## Acceptance Criteria
- Integration tests cover critical flows and pass consistently.
- Failure paths return deterministic, documented responses.
- Correlation IDs visible across gateway, worker, AI, and data logs.
- Demo walkthrough can be executed from clean environment using docs only.

## Risks
- Flaky integration tests due to startup timing and async processing.
- Last-minute contract changes breaking downstream services.
- Documentation lag behind implementation changes.

## Dependencies
- Sprint 03 async pipeline complete and stable.
- CI/test execution strategy agreed for integration suite.

## Definition of Done
- System is demo-ready with reliable local run instructions.
- Hardening work validated by tests and smoke checks.
- Docs reflect final behavior and architecture decisions.
