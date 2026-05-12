from collections import deque

QUEUE: deque[dict] = deque()


def enqueue(payload: dict) -> None:
    QUEUE.append(payload)


def dequeue() -> dict | None:
    if not QUEUE:
        return None
    return QUEUE.popleft()
