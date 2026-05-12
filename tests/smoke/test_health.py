from fastapi.testclient import TestClient

from tests.helpers.service_loader import load_service_app

SERVICE_NAMES = [
    "api-gateway",
    "data-processing-service",
    "simulation-service",
    "analysis-service",
    "worker",
]


def test_all_service_health_endpoints() -> None:
    for service_name in SERVICE_NAMES:
        app = load_service_app(service_name)
        client = TestClient(app)
        response = client.get("/health")

        assert response.status_code == 200
        payload = response.json()
        assert payload["status"] == "success"
        assert payload["data"]["service"] == service_name
        assert payload["data"]["healthy"] is True
