import httpx
from app.core.config import settings


def process_input(payload: dict) -> dict:
    with httpx.Client(timeout=settings.request_timeout_seconds) as client:
        response = client.post(f"{settings.processing_service_url}/v1/process", json=payload)
        response.raise_for_status()
        return response.json()


def get_run(run_id: str) -> dict:
    with httpx.Client(timeout=settings.request_timeout_seconds) as client:
        response = client.get(f"{settings.processing_service_url}/v1/runs/{run_id}")
        response.raise_for_status()
        return response.json()


def store_pipeline_output(run_id: str, payload: dict) -> dict:
    with httpx.Client(timeout=settings.request_timeout_seconds) as client:
        response = client.post(
            f"{settings.processing_service_url}/v1/runs/{run_id}/outputs",
            json=payload,
        )
        response.raise_for_status()
        return response.json()
