# Reference Analysis

## Reference Repository Used
- Source: https://github.com/kaw393939/designsystem
- Local clone path: `references/designsystem`
- Repo type: Next.js documentation-first product system (not a Python microservices backend)

## Scope of This Analysis
- We are reusing engineering process patterns (spec discipline, QA gates, repo organization hygiene, CI quality checks, deployment conventions).
- We are adapting those patterns to a FastAPI service-oriented simulation pipeline.
- We are not copying frontend implementation patterns as-is.

## Patterns Worth Reusing

### 1. Documentation-First Execution Model
- The reference repo makes specs and process docs first-class artifacts with clear read order and authoritative sources (`README.md`, `docs/README.md`, `docs/_specs/README.md`).
- Reuse: keep our `docs/` authoritative, with product spec, technical spec, and sprint docs required before implementation.

### 2. Explicit Planning to Implementation Gating
- The reference defines an operating loop: spec update -> planning QA -> implementation -> implementation QA -> release QA.
- Reuse: create explicit acceptance criteria and definition-of-done per sprint before coding and verify outcomes against those docs.

### 3. Strong Folder-by-Responsibility Organization
- The reference separates runtime code, content/data, scripts, docs, and tests into predictable top-level directories.
- Reuse: mirror this clarity in microservices form with top-level `services/`, `shared/`, `infra/`, `docs/`, and `tests/`.

### 4. Quality Gates in CI
- The reference `quality.yml` runs type checks, linting, validation, unit tests, browser tests, and Lighthouse.
- Reuse: pipeline-quality mindset for backend services:
  - lint + format checks
  - unit tests
  - integration tests
  - health/smoke checks
  - contract validation where possible

### 5. Environment-Driven Configuration
- The reference uses `.env.example` and workflow environment variables to control behavior across local and CI modes.
- Reuse: consistent env-variable contracts per service (`PORT`, service URLs, queue URL, database URL, log level, timeouts).

### 6. Deployment as Code
- The reference has explicit GitHub Actions deployment workflow (`deploy-pages.yml`) with deterministic build/deploy steps.
- Reuse: codify deployment and run strategy through `infra/` definitions and CI workflows from the start.

## Patterns to Adapt (Not Copy Blindly)

### 1. Framework and Runtime Stack
- Reference runtime is Next.js/TypeScript frontend-first.
- Adaptation: our implementation will be FastAPI/Python service-first with staged pipeline services and async worker flows.

### 2. Validation Surface
- Reference validation includes site schema/workflow/release checks for static publishing.
- Adaptation: replace with API schema validation, pipeline stage contract checks, and job lifecycle invariants.

### 3. QA Artifact Density
- Reference repo maintains extensive planning/implementation/release QA artifacts for long-running content workflows.
- Adaptation: keep QA discipline, but use lighter-weight artifacts suitable for a portfolio microservices scope.

## Patterns Intentionally Not Using
- Next.js app router, React UI components, and static-export specific route/test patterns.
- Frontend-centric browser testing as a primary quality gate for this backend-focused project.
- Content-production-specific docs taxonomy (`docs/_content`, `docs/_research`, etc.) as-is.
- Any domain-specific educational content and release semantics from the reference repository.

## How References Influence This Project Structure
- Root-level separation by domain:
  - `services/` for independently deployable components
  - `shared/` for cross-service, low-coupling utilities/schemas
  - `infra/` for container and runtime configuration
  - `tests/` for cross-service integration tests
  - `docs/` for product, technical, and sprint planning artifacts
- Each service follows a consistent skeleton:
  - `app/main.py` entrypoint
  - `app/routes/` API definitions
  - `app/schemas/` request/response contracts
  - `app/core/` config/logging
  - `app/services/` business logic
  - `tests/` service-level tests
- Technical decisions prioritize interview clarity:
  - why each service exists
  - how data moves through the pipeline
  - how async tasks are isolated
  - where processing, simulation, and analysis boundaries sit

## Naming and Organization Conventions We Will Mirror
- Clear, descriptive file names over clever abstractions.
- Readme-style index documents for navigation when docs grow.
- Explicit script/command naming for repeatable local workflows.
- Consistent test folder strategy separating unit and integration concerns.

## Upload and Portfolio Guidance Taken from Reference Style
- Keep repository root clean and intentional (clear docs, reproducible commands, CI workflows, deployment definition).
- Ensure project can be evaluated from repository artifacts alone (without chat history).
- Maintain stable documentation that explains what is implemented now vs planned next.

## Project-Specific Decisions Triggered by This Analysis
- Preserve strict spec-first development for all service work.
- Add quality gate scripts and CI early (Sprint 1) instead of late.
- Keep explicit sprint documents with acceptance criteria and risk notes.
- Keep stage boundaries and contracts easy to explain in interviews.
