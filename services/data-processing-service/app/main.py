from contextlib import asynccontextmanager

from app.core import logging as _logging  # noqa: F401
from app.db.database import init_db
from app.routes.health import router as health_router
from app.routes.jobs import router as jobs_router
from app.routes.requests import router as requests_router
from app.routes.results import router as results_router
from fastapi import FastAPI


@asynccontextmanager
async def lifespan(_: FastAPI):
	init_db()
	yield


app = FastAPI(title="Data Processing Service", lifespan=lifespan)

app.include_router(health_router)
app.include_router(requests_router)
app.include_router(jobs_router)
app.include_router(results_router)
