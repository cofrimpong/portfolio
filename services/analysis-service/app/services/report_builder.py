from app.schemas.responses import AnalysisResponse
from app.services.insight_rules import build_insights


def build_report(simulation_output: dict) -> AnalysisResponse:
    insights, risk_level, recommendation = build_insights(simulation_output)
    summary = (
        "Simulation output was interpreted using deterministic analysis rules to produce "
        "a concise engineering-style report."
    )
    return AnalysisResponse(
        summary=summary,
        insights=insights,
        risk_level=risk_level,
        recommendation=recommendation,
    )
