import httpx
from app.core.config import settings


def run_simulation(payload: dict) -> dict:
    with httpx.Client(timeout=settings.request_timeout_seconds) as client:
        response = client.post(f"{settings.simulation_service_url}/v1/simulate", json=payload)
        response.raise_for_status()
        return response.json()
