# Sprint 03: Simulation Engine

## Sprint Goal
Implement the Simulation Service and connect it to processed pipeline input.

## Tasks
1. Define simulation input and output schemas.
2. Implement deterministic simulation logic with configurable parameters.
3. Expose simulation endpoint in the Simulation Service.
4. Connect processed output from the Data Processing Service to the Simulation Service.
5. Persist simulation results and stage metadata.
6. Add unit tests for simulation logic and integration tests for the pipeline handoff.

## Acceptance Criteria
- Simulation Service accepts processed input and returns structured results.
- Simulation outputs are stored and linked to pipeline run IDs.
- Invalid parameters return clear errors.
- Integration tests cover Data Processing -> Simulation flow.

## Risks
- Simulation logic becoming too trivial to be interview-useful.
- Parameter handling becoming inconsistent across services.
- Output schema revisions breaking downstream analysis.

## Definition of Done
- Simulation stage is implemented, testable, and wired into the pipeline.
- Contracts are stable and documented.
- Simulation results are reproducible for the same input.