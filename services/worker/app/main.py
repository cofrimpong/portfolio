from app.core import logging as _logging  # noqa: F401
from app.routes.health import router as health_router
from app.worker.processor import process_next_job
from fastapi import FastAPI

app = FastAPI(title="Worker")

app.include_router(health_router)


@app.post("/v1/worker/tick")
def tick() -> dict:
    return process_next_job()
