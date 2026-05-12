def build_insights(simulation_output: dict) -> tuple[list[str], str, str]:
    projected_average = float(simulation_output.get("projected_average", 0.0))
    projected_max = float(simulation_output.get("projected_max", 0.0))

    insights = [
        f"Projected average value is {projected_average:.2f}.",
        f"Projected max value is {projected_max:.2f}.",
    ]

    if projected_average >= 75:
        risk_level = "high"
        recommendation = "Review the input assumptions before using this run for decisions."
        insights.append("The scenario trends toward an elevated outcome range.")
    elif projected_average >= 40:
        risk_level = "moderate"
        recommendation = "Use the result as directional guidance, then compare against alternate scenarios."
        insights.append("The scenario is stable but sensitive to parameter changes.")
    else:
        risk_level = "low"
        recommendation = "This scenario looks stable for baseline comparisons."
        insights.append("The scenario remains within a low-range output band.")

    return insights, risk_level, recommendation
