from pydantic import BaseModel


class AnalyzeSimulationRequest(BaseModel):
    run_id: str
    simulation_output: dict
