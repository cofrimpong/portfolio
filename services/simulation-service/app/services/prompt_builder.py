from app.schemas.requests import InferRequest


def build_prompt(payload: InferRequest) -> str:
    return f"Task: {payload.task_type}\nText:\n{payload.text}"
