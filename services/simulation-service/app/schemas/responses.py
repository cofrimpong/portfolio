from pydantic import BaseModel


class SimulateResponse(BaseModel):
    run_id: str
    projected_values: list[float]
    projected_average: float
    projected_max: float
    model_name: str
