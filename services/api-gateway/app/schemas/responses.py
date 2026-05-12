from pydantic import BaseModel


class PipelineJobResponse(BaseModel):
    job_id: str
    run_id: str
    status: str
