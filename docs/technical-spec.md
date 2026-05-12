# Technical Spec: Simulation Pipeline System (v1)

## 1. Architecture Overview
The system is composed of five services with explicit pipeline boundaries:
- API Gateway
- Data Processing Service
- Simulation Service
- Analysis Service
- Worker

### Architecture Diagram (ASCII)
```text
        +-------------------+
        |      Client       |
        +---------+---------+
                  |
                  v
        +---------+---------+
        |    API Gateway    |
        | validation +      |
        | orchestration     |
        +---------+---------+
                  |
          +-------+--------+
          |                |
       sync path        async path
          |                |
          v                v
 +--------+---------+   +--+----------------+
 | Data Processing  |   | Worker            |
 | Service          |   | background runner |
 +--------+---------+   +--+----------------+
          |                |
          v                v
 +--------+---------+   +--+----------------+
 | Simulation       |   | pipeline stages   |
 | Service          |   | executed off-path |
 +--------+---------+   +--+----------------+
          |
          v
 +--------+---------+
 | Analysis         |
 | Service          |
 +--------+---------+
          |
          v
   Structured pipeline output
```

## 2. Service Definitions

## 2.1 API Gateway
Responsibility:
- Public entrypoint for uploads or API-submitted payloads.
- Validate incoming requests.
- Orchestrate synchronous or asynchronous pipeline execution.
- Return pipeline status and final output.

Endpoints:
- `GET /health`
- `POST /v1/pipeline/run-sync`
- `POST /v1/pipeline/run-async`
- `GET /v1/pipeline/jobs/{job_id}`
- `GET /v1/pipeline/runs/{run_id}`

Inputs/Outputs:
- Input: raw data payload plus optional simulation parameters.
- Output: response envelope with run metadata, stage outputs, and final report when available.

Dependencies:
- Data Processing Service client.
- Simulation Service client.
- Analysis Service client.
- Worker/queue client.

Failure Cases:
- Invalid user input.
- Upstream service timeouts.
- Partial pipeline stage failure.
- Queue publish failure for async requests.

## 2.2 Data Processing Service
Responsibility:
- Validate raw input schema.
- Clean, normalize, and transform data into simulation-ready form.
- Persist processed runs or intermediate payloads when required.

Endpoints:
- `GET /health`
- `POST /v1/process`
- `GET /v1/runs/{run_id}/processed`

Inputs/Outputs:
- Input: raw dataset or structured payload.
- Output: cleaned and normalized payload with metadata.

Dependencies:
- Storage layer for pipeline runs.

Failure Cases:
- Invalid schema.
- Unsupported field combinations.
- Transformation errors.
- Storage failures.

## 2.3 Simulation Service
Responsibility:
- Run deterministic simulation logic over processed input.
- Generate structured simulation outputs suitable for downstream analysis.

Endpoints:
- `GET /health`
- `POST /v1/simulate`

Inputs/Outputs:
- Input: processed data and simulation parameters.
- Output: simulation output, summary metrics, and run metadata.

Dependencies:
- Internal simulation engine modules.

Failure Cases:
- Invalid parameter set.
- Computational or rule-evaluation failure.
- Output schema mismatch.

## 2.4 Analysis Service
Responsibility:
- Interpret simulation outputs.
- Generate insights, summaries, and structured report sections.
- Optionally use AI later without changing the service boundary.

Endpoints:
- `GET /health`
- `POST /v1/analyze`

Inputs/Outputs:
- Input: simulation outputs and analysis preferences.
- Output: insights, warnings, key takeaways, and report payload.

Dependencies:
- Rule-based analysis engine for v1.
- Optional AI adapter later.

Failure Cases:
- Missing required simulation fields.
- Unsupported report mode.
- Analysis formatting failure.

## 2.5 Worker
Responsibility:
- Execute longer-running pipeline jobs asynchronously.
- Coordinate stage progression for background requests.
- Update job status and store final outputs.

Endpoints:
- `GET /health`
- Optional internal/admin endpoint: `POST /v1/worker/tick`

Inputs/Outputs:
- Input: queued job with run ID, raw data, and parameters.
- Output: job state transitions and stored pipeline output.

Dependencies:
- Queue adapter.
- Gateway-visible persistence store.
- Processing, Simulation, and Analysis service clients.

Failure Cases:
- Poison jobs.
- Stage-level failure in background execution.
- Retry exhaustion.

## 3. System Design

### Data Flow Across Pipeline
1. Gateway receives raw input.
2. Data Processing Service transforms the input into a simulation-ready format.
3. Simulation Service runs the computation over processed data.
4. Analysis Service interprets the result.
5. Gateway returns or stores structured output.

### Sync vs Async Tasks
- Sync path: small inputs and fast simulation runs.
- Async path: larger inputs, slower simulation runs, or demo scenarios that need background processing.

### Background Processing
- Worker consumes jobs from a queue-like adapter.
- Job status lifecycle: `queued`, `processing`, `completed`, `failed`.
- Retry policy: limited retries with terminal failure state.

### Storage Approach
- v1 default: SQLite for local development and simple persistence.
- Store:
  - pipeline runs
  - processed payloads
  - simulation outputs
  - analysis outputs
  - job states

### Logging Strategy
- Structured logs at every stage.
- Correlation ID or `trace_id` propagated across service calls.
- Log stage transitions, duration, and terminal outcome.

### Config / Environment Variables
- Common keys:
  - `SERVICE_NAME`
  - `PORT`
  - `LOG_LEVEL`
  - `DATABASE_URL`
  - `REQUEST_TIMEOUT_SECONDS`
  - `PROCESSING_SERVICE_URL`
  - `SIMULATION_SERVICE_URL`
  - `ANALYSIS_SERVICE_URL`
  - `QUEUE_URL`

### Docker Strategy
- One Dockerfile per service.
- Docker Compose for local orchestration.
- Gateway exposed publicly; internal services stay on the local network.

## 4. Testing Strategy
- Unit tests:
  - input validation
  - transformation logic
  - simulation engine behavior
  - analysis rules
- Integration tests:
  - Gateway -> Processing -> Simulation -> Analysis flow
  - async worker job lifecycle
  - selected dependency failure paths
- Smoke tests:
  - `/health` on every service

## 5. Open Decisions
- SQLite vs PostgreSQL for the first full pipeline milestone.
- Queue simulation vs Redis-backed job queue for async work.
- Rule-based only analysis vs optional AI augmentation in Sprint 4.

Decision rule: keep the first version deterministic, modular, and interview-explainable before adding complexity.
