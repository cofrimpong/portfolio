import sys

from fastapi.testclient import TestClient

from tests.helpers.service_loader import load_service_app


def test_sync_pipeline_returns_processed_simulated_and_analyzed_output(monkeypatch) -> None:
    data_app = load_service_app("data-processing-service")
    simulation_app = load_service_app("simulation-service")
    analysis_app = load_service_app("analysis-service")
    gateway_app = load_service_app("api-gateway")

    with TestClient(data_app) as data_client, TestClient(simulation_app) as simulation_client, TestClient(
        analysis_app
    ) as analysis_client, TestClient(gateway_app) as gateway_client:
        gateway_data_client = sys.modules["app.services.data_client"]
        gateway_ai_client = sys.modules["app.services.ai_client"]
        gateway_analysis_client = sys.modules["app.services.analysis_client"]

        monkeypatch.setattr(
            gateway_data_client,
            "process_input",
            lambda payload: data_client.post("/v1/process", json=payload).json(),
        )
        monkeypatch.setattr(
            gateway_data_client,
            "store_pipeline_output",
            lambda run_id, payload: data_client.post(f"/v1/runs/{run_id}/outputs", json=payload).json(),
        )
        monkeypatch.setattr(
            gateway_data_client,
            "get_run",
            lambda run_id: data_client.get(f"/v1/runs/{run_id}").json(),
        )
        monkeypatch.setattr(
            gateway_ai_client,
            "run_simulation",
            lambda payload: simulation_client.post("/v1/simulate", json=payload).json(),
        )
        monkeypatch.setattr(
            gateway_analysis_client,
            "analyze",
            lambda payload: analysis_client.post("/v1/analyze", json=payload).json(),
        )

        response = gateway_client.post(
            "/v1/pipeline/run-sync",
            json={
                "input_data": [10, 20, 30],
                "simulation_factor": 1.5,
                "label": "baseline",
            },
        )

        assert response.status_code == 200
        payload = response.json()
        assert payload["status"] == "success"

        run_record = payload["data"]["run"]
        processed_record = payload["data"]["processed"]
        simulation_record = payload["data"]["simulation"]
        analysis_record = payload["data"]["analysis"]

        assert processed_record["cleaned_values"] == [10.0, 20.0, 30.0]
        assert simulation_record["projected_average"] == 30.0
        assert analysis_record["summary"]
        assert run_record["run_id"] == processed_record["run_id"]

        follow_up = gateway_client.get(f"/v1/pipeline/runs/{run_record['run_id']}")
        assert follow_up.status_code == 200
        follow_up_payload = follow_up.json()
        assert follow_up_payload["data"]["run"]["run_id"] == run_record["run_id"]
