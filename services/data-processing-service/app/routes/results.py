from app.schemas.results import PipelineOutputCreate, PipelineOutputRecord, PipelineRunRecord
from app.services.result_service import get_pipeline_run, store_pipeline_output
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/v1")


@router.post("/runs/{run_id}/outputs", response_model=PipelineOutputRecord)
def post_result(run_id: str, payload: PipelineOutputCreate) -> PipelineOutputRecord:
    return PipelineOutputRecord(**store_pipeline_output(run_id, payload.model_dump()))


@router.get("/runs/{run_id}", response_model=PipelineRunRecord)
def get_result_by_id(run_id: str) -> PipelineRunRecord:
    found = get_pipeline_run(run_id)
    if not found:
        raise HTTPException(status_code=404, detail="run not found")
    return PipelineRunRecord(**found)
