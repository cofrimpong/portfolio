from app.core import logging as _logging  # noqa: F401
from app.routes.analyze import router as analyze_router
from app.routes.health import router as health_router
from fastapi import FastAPI

app = FastAPI(title="API Gateway")

app.include_router(health_router)
app.include_router(analyze_router)
