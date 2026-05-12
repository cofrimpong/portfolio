from pydantic import BaseModel


class PipelineOutputCreate(BaseModel):
    simulation_output: dict
    analysis_output: dict


class PipelineOutputRecord(PipelineOutputCreate):
    run_id: str
    updated_at: str


class PipelineRunRecord(BaseModel):
    run_id: str
    cleaned_values: list[float]
    statistics: dict
    simulation_factor: float
    created_at: str
    simulation_output: dict | None = None
    analysis_output: dict | None = None
    updated_at: str | None = None
