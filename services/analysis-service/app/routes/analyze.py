from fastapi import APIRouter

from app.schemas.requests import AnalyzeSimulationRequest
from app.schemas.responses import AnalysisResponse
from app.services.report_builder import build_report

router = APIRouter(prefix="/v1")


@router.post("/analyze", response_model=AnalysisResponse)
def analyze(payload: AnalyzeSimulationRequest) -> AnalysisResponse:
    return build_report(payload.simulation_output)
