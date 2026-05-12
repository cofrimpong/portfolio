from app.schemas.requests import SimulateRequest
from app.schemas.responses import SimulateResponse
from app.services.inference_adapter import run_inference
from fastapi import APIRouter

router = APIRouter(prefix="/v1")


@router.post("/simulate", response_model=SimulateResponse)
def infer(payload: SimulateRequest) -> SimulateResponse:
    return run_inference(payload)
