JOBS: dict[str, dict] = {}


def create_job(job_id: str, payload: dict) -> dict:
    JOBS[job_id] = payload
    return {"job_id": job_id, **payload}


def update_job(job_id: str, payload: dict) -> dict | None:
    if job_id not in JOBS:
        return None
    JOBS[job_id].update(payload)
    return {"job_id": job_id, **JOBS[job_id]}


def get_job(job_id: str) -> dict | None:
    return JOBS.get(job_id)
