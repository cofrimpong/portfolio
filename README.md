# Project 2: Simulation Pipeline System

This repository contains a spec-driven microservices backend for a staged engineering workflow with five services:

- API Gateway
- Data Processing Service
- Simulation Service
- Analysis Service
- Worker

## Status
- Documentation and sprint plans are aligned to the simulation pipeline under `docs/`.
- The synchronous pipeline path is implemented locally across processing, simulation, and analysis, with smoke and integration tests passing.

## Repository Layout
- `services/`: independently deployable service apps
- `shared/`: low-coupling shared schemas and helpers
- `infra/`: local environment and Docker Compose orchestration
- `tests/`: integration and smoke tests
- `docs/`: product, technical, sprint, and reference analysis docs

## Foundation Commands
1. Install dependencies into the local virtual environment.
2. Run tests with `pytest`.
3. Run lint checks with `ruff check .`.
4. Run formatting with `black .`.

## Local Stack
1. Review service environment files in `infra/env/`.
2. Start the stack with `docker compose -f infra/docker-compose.yml up --build`.
3. Verify the exposed Gateway health endpoint at `/health` on port `8000`.
4. Exercise the synchronous run endpoint at `/v1/pipeline/run-sync` on port `8000`.

## Current Foundation Scope
- Each service has a dedicated FastAPI entrypoint.
- Health endpoints use a shared response envelope.
- The Gateway orchestrates processing, simulation, and analysis for synchronous runs.
- Data Processing persists run inputs and outputs in SQLite for local development.
- Root smoke and integration tests validate that the pipeline apps load and that the sync path works end to end.

Implementation work follows the sprint documents in `docs/sprints/`.
