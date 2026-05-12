from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    summary: str
    insights: list[str]
    risk_level: str
    recommendation: str
