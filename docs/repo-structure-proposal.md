# Proposed Repository Structure

This structure is designed for clear pipeline-stage boundaries, testability, and interview-ready explanations.

```text
.
├── docs/
│   ├── product-spec.md
│   ├── technical-spec.md
│   ├── reference-analysis.md
│   ├── repo-structure-proposal.md
│   └── sprints/
│       ├── sprint-01-foundation.md
│       ├── sprint-02-pipeline.md
│       ├── sprint-03-simulation.md
│       ├── sprint-04-analysis.md
│       └── sprint-05-integration.md
├── infra/
│   ├── docker-compose.yml
│   └── env/
│       ├── api-gateway.env
│       ├── data-processing-service.env
│       ├── simulation-service.env
│       ├── analysis-service.env
│       └── worker.env
├── services/
│   ├── api-gateway/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   └── logging.py
│   │   │   ├── routes/
│   │   │   │   ├── health.py
│   │   │   │   └── pipeline.py
│   │   │   ├── schemas/
│   │   │   │   ├── pipeline_requests.py
│   │   │   │   └── pipeline_responses.py
│   │   │   └── services/
│   │   │       ├── analysis_client.py
│   │   │       ├── processing_client.py
│   │   │       ├── simulation_client.py
│   │   │       └── queue_client.py
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── data-processing-service/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   └── logging.py
│   │   │   ├── routes/
│   │   │   │   ├── health.py
│   │   │   │   └── process.py
│   │   │   ├── schemas/
│   │   │   │   ├── inputs.py
│   │   │   │   └── outputs.py
│   │   │   └── services/
│   │   │       ├── cleaner.py
│   │   │       └── transformer.py
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── simulation-service/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   └── logging.py
│   │   │   ├── routes/
│   │   │   │   ├── health.py
│   │   │   │   └── simulate.py
│   │   │   ├── schemas/
│   │   │   │   ├── inputs.py
│   │   │   │   └── outputs.py
│   │   │   └── services/
│   │   │       ├── engine.py
│   │   │       └── metrics.py
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── analysis-service/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   └── logging.py
│   │   │   ├── routes/
│   │   │   │   ├── analyze.py
│   │   │   │   └── health.py
│   │   │   ├── schemas/
│   │   │   │   ├── inputs.py
│   │   │   │   └── outputs.py
│   │   │   └── services/
│   │   │       ├── insight_rules.py
│   │   │       └── report_builder.py
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   └── worker/
│       ├── app/
│       │   ├── main.py
│       │   ├── core/
│       │   │   ├── config.py
│       │   │   └── logging.py
│       │   ├── worker/
│       │   │   ├── consumer.py
│       │   │   ├── processor.py
│       │   │   └── retry.py
│       │   ├── services/
│       │   │   ├── analysis_client.py
│       │   │   ├── processing_client.py
│       │   │   ├── simulation_client.py
│       │   │   └── storage_client.py
│       │   └── routes/
│       │       └── health.py
│       ├── tests/
│       ├── Dockerfile
│       └── requirements.txt
├── shared/
│   ├── schemas/
│   │   ├── envelope.py
│   │   └── errors.py
│   ├── observability/
│   │   ├── logger.py
│   │   └── tracing.py
│   └── utils/
│       └── ids.py
├── tests/
│   ├── integration/
│   │   ├── test_pipeline_sync.py
│   │   └── test_pipeline_async.py
│   └── smoke/
│       └── test_health.py
├── .editorconfig
├── .gitignore
├── pyproject.toml
└── README.md
```

## Why This Structure
- Stage isolation: each service represents one pipeline responsibility and is independently runnable and testable.
- Consistency: each service uses the same internal layout for easier onboarding.
- Shared contracts without over-coupling: only minimal reusable components live in `shared`.
- Interview clarity: folder names map directly to pipeline stages.
- Growth path: easy to add alternate simulation engines, report exporters, or storage adapters later.

## Rules to Preserve During Implementation
- No giant files; split route, schema, and business logic layers.
- Avoid cross-importing service internals; communicate through APIs/contracts.
- Keep shared package lean and stable.
- Put cross-service tests at root `tests/integration`.
