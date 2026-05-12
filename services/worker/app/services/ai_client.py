def call_ai(payload: dict) -> dict:
    return {"summary": payload.get("text", "")[:150], "sentiment": "neutral"}
