from pydantic import BaseModel, Field


class SimulateRequest(BaseModel):
    run_id: str
    cleaned_values: list[float] = Field(min_length=1)
    statistics: dict
    simulation_factor: float = 1.15
