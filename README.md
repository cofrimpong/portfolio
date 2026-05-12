# Christabel Portfolio Workspace

This repository now holds two connected parts of the same body of work:

- a spec-driven microservices backend for a staged simulation and analysis pipeline
- a public-facing portfolio site that presents Christabel O Frimpong's AI, UX/UI, and product work through a scrollytelling narrative

## What Is In This Repo

### Portfolio site
- Location: `portfolio-site/`
- Stack: Next.js, React, TypeScript
- Purpose: public portfolio with a story-driven homepage, project proof cards, internal detail pages, and generated visual assets

### Backend services
- Location: `services/`
- Stack: FastAPI-based microservices
- Services: API Gateway, Data Processing Service, Simulation Service, Analysis Service, Worker
- Purpose: spec-driven pipeline for processing, simulation, analysis, and asynchronous orchestration

### Shared project assets
- `docs/`: product, technical, sprint, and reference analysis documents
- `shared/`: shared schemas, ids, logging, and tracing helpers
- `infra/`: Docker Compose and environment scaffolding
- `tests/`: smoke and integration tests for the backend workflow
- `_corpus/`: supporting project content assets

## Portfolio Commands
1. `cd portfolio-site`
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`
5. Run `npm run build` for a production check

## Backend Commands
1. Create or activate the local virtual environment
2. Install dependencies from the service requirements files as needed
3. Run `pytest`
4. Run `ruff check .`
5. Run `black .`

## Local Backend Stack
1. Review service environment files in `infra/env/`
2. Start the stack with `docker compose -f infra/docker-compose.yml up --build`
3. Verify the gateway health endpoint on port `8000`
4. Exercise the synchronous pipeline flow through the gateway

## Current Direction
- The portfolio site is the main presentation layer for current work and recent shipped proof
- The services and sprint docs continue to document the simulation pipeline system work
- Generated portfolio images live under `portfolio-site/public/generated/`

Implementation details and milestones are tracked in `docs/` and `docs/sprints/`.
