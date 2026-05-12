# Sprint 04: Analysis Layer

## Sprint Goal
Interpret simulation output and generate structured analysis and report content.

## Tasks
1. Define analysis input and output contracts.
2. Implement rule-based insight generation for v1.
3. Add optional AI adapter boundary without making AI mandatory.
4. Implement report formatting for summary, warnings, and recommendations.
5. Connect Simulation Service outputs to Analysis Service inputs.
6. Add unit tests for analysis rules and integration tests for Simulation -> Analysis flow.

## Acceptance Criteria
- Analysis Service accepts simulation output and returns structured insights.
- Report payload is consistent and easy to consume from the Gateway.
- Rule-based mode works without external AI dependencies.
- Integration tests cover Simulation -> Analysis handoff.

## Risks
- Analysis output becoming too vague or generic.
- AI adapter design leaking into the core v1 path.
- Report formatting changing late in the sprint.

## Definition of Done
- Analysis stage produces usable, deterministic report output.
- Optional AI boundary is documented but not required for baseline behavior.
- Downstream output contracts are stable.