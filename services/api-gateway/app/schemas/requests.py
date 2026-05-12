from pydantic import BaseModel, Field


class PipelineRunRequest(BaseModel):
    input_data: list[float] = Field(min_length=1)
    simulation_factor: float = 1.15
    label: str | None = None
