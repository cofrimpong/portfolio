from fastapi import APIRouter

from shared.schemas.envelope import ResponseEnvelope

router = APIRouter()


@router.get("/health")
def health() -> ResponseEnvelope:
    return ResponseEnvelope.success(data={"service": "data-processing-service", "healthy": True})
