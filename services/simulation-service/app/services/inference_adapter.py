from app.schemas.requests import SimulateRequest
from app.schemas.responses import SimulateResponse


def run_inference(payload: SimulateRequest) -> SimulateResponse:
    projected_values = [round(value * payload.simulation_factor, 2) for value in payload.cleaned_values]
    projected_average = round(sum(projected_values) / len(projected_values), 2)
    projected_max = round(max(projected_values), 2)
    return SimulateResponse(
        run_id=payload.run_id,
        projected_values=projected_values,
        projected_average=projected_average,
        projected_max=projected_max,
        model_name="deterministic-simulation-v1",
    )
