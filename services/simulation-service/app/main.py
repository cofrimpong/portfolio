from app.core import logging as _logging  # noqa: F401
from app.routes.health import router as health_router
from app.routes.infer import router as infer_router
from fastapi import FastAPI

app = FastAPI(title="Simulation Service")

app.include_router(health_router)
app.include_router(infer_router)
