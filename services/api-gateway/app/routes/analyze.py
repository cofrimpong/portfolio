import httpx
from app.schemas.requests import PipelineRunRequest
from app.services import ai_client, analysis_client, data_client
from fastapi import APIRouter, HTTPException

from shared.schemas.envelope import ResponseEnvelope
from shared.utils.ids import new_trace_id

router = APIRouter(prefix="/v1")


@router.post("/pipeline/run-sync", response_model=ResponseEnvelope)
def analyze_sync(payload: PipelineRunRequest) -> ResponseEnvelope:
    try:
        processed_run = data_client.process_input(payload.model_dump())
        simulation_output = ai_client.run_simulation(
            {
                "run_id": processed_run["run_id"],
                "cleaned_values": processed_run["cleaned_values"],
                "statistics": processed_run["statistics"],
                "simulation_factor": processed_run["simulation_factor"],
            }
        )
        analysis_output = analysis_client.analyze(
            {
                "run_id": processed_run["run_id"],
                "simulation_output": simulation_output,
            }
        )
        run_record = data_client.store_pipeline_output(
            processed_run["run_id"],
            {
                "simulation_output": simulation_output,
                "analysis_output": analysis_output,
            },
        )
    except httpx.HTTPStatusError as exc:
        detail = f"dependency returned {exc.response.status_code}"
        raise HTTPException(status_code=502, detail=detail) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="dependency unavailable") from exc

    return ResponseEnvelope.success(
        data={
            "run": run_record,
            "processed": processed_run,
            "simulation": simulation_output,
            "analysis": analysis_output,
        },
        trace_id=new_trace_id(),
    )


@router.post("/pipeline/run-async", response_model=ResponseEnvelope)
def analyze_async(_: PipelineRunRequest) -> ResponseEnvelope:
    run_id = new_trace_id()
    return ResponseEnvelope.success(
        data={"mode": "async", "run_id": run_id, "job_id": new_trace_id(), "status": "queued"},
        trace_id=new_trace_id(),
    )


@router.get("/pipeline/jobs/{job_id}", response_model=ResponseEnvelope)
def get_job_status(job_id: str) -> ResponseEnvelope:
    return ResponseEnvelope.success(
        data={"job_id": job_id, "status": "queued"},
        trace_id=new_trace_id(),
    )


@router.get("/pipeline/runs/{run_id}", response_model=ResponseEnvelope)
def get_request_by_id(run_id: str) -> ResponseEnvelope:
    try:
        run_record = data_client.get_run(run_id)
    except httpx.HTTPStatusError as exc:
        if exc.response.status_code == 404:
            raise HTTPException(status_code=404, detail="run not found") from exc
        detail = f"dependency returned {exc.response.status_code}"
        raise HTTPException(status_code=502, detail=detail) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="dependency unavailable") from exc

    return ResponseEnvelope.success(data={"run": run_record}, trace_id=new_trace_id())
