from app.worker.consumer import dequeue


def process_next_job() -> dict:
    job = dequeue()
    if not job:
        return {"status": "idle"}
    return {"status": "processed", "job": job}
