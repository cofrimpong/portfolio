from contextvars import ContextVar

_trace_id: ContextVar[str | None] = ContextVar("trace_id", default=None)


def set_trace_id(trace_id: str) -> None:
    _trace_id.set(trace_id)


def get_trace_id() -> str | None:
    return _trace_id.get()
