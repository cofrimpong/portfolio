import httpx
from app.core.config import settings


def analyze(payload: dict) -> dict:
    with httpx.Client(timeout=settings.request_timeout_seconds) as client:
        response = client.post(f"{settings.analysis_service_url}/v1/analyze", json=payload)
        response.raise_for_status()
        return response.json()
