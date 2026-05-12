from app.schemas.jobs import JobCreate, JobUpdate
from app.services.job_service import create_job, get_job, update_job
from fastapi import APIRouter, HTTPException

from shared.utils.ids import new_trace_id

router = APIRouter(prefix="/v1/jobs")


@router.post("")
def post_job(payload: JobCreate) -> dict:
    job_id = new_trace_id()
    return create_job(job_id, payload.model_dump())


@router.patch("/{job_id}")
def patch_job(job_id: str, payload: JobUpdate) -> dict:
    updated = update_job(job_id, payload.model_dump())
    if not updated:
        raise HTTPException(status_code=404, detail="job not found")
    return updated


@router.get("/{job_id}")
def get_job_by_id(job_id: str) -> dict:
    found = get_job(job_id)
    if not found:
        raise HTTPException(status_code=404, detail="job not found")
    return {"job_id": job_id, **found}
