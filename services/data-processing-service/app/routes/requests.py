from app.schemas.requests import ProcessRequest, ProcessedRunRecord
from app.services.request_service import get_processed_run, process_input
from fastapi import APIRouter, HTTPException

from shared.utils.ids import new_trace_id

router = APIRouter(prefix="/v1")


@router.post("/process", response_model=ProcessedRunRecord)
def post_request(payload: ProcessRequest) -> ProcessedRunRecord:
    run_id = new_trace_id()
    return ProcessedRunRecord(**process_input(run_id, payload.model_dump()))


@router.get("/runs/{run_id}/processed", response_model=ProcessedRunRecord)
def get_request_by_id(run_id: str) -> ProcessedRunRecord:
    found = get_processed_run(run_id)
    if not found:
        raise HTTPException(status_code=404, detail="run not found")
    return ProcessedRunRecord(**found)
