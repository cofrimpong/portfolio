from pydantic import BaseModel, Field


class ProcessRequest(BaseModel):
    input_data: list[float] = Field(min_length=1)
    simulation_factor: float = 1.15
    label: str | None = None


class ProcessedRunRecord(ProcessRequest):
    run_id: str
    cleaned_values: list[float]
    statistics: dict
    created_at: str
