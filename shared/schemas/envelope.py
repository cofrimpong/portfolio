from typing import Any

from pydantic import BaseModel, Field


class ErrorPayload(BaseModel):
    code: str
    message: str
    details: dict[str, Any] | None = None


class ResponseEnvelope(BaseModel):
    status: str = Field(description="success or error")
    data: dict[str, Any] | None = None
    error: ErrorPayload | None = None
    trace_id: str | None = None

    @classmethod
    def success(cls, data: dict[str, Any], trace_id: str | None = None) -> "ResponseEnvelope":
        return cls(status="success", data=data, trace_id=trace_id)

    @classmethod
    def failure(
        cls,
        code: str,
        message: str,
        details: dict[str, Any] | None = None,
        trace_id: str | None = None,
    ) -> "ResponseEnvelope":
        return cls(
            status="error",
            error=ErrorPayload(code=code, message=message, details=details),
            trace_id=trace_id,
        )
