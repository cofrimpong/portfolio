from pydantic import BaseModel


class JobCreate(BaseModel):
    request_id: str
    status: str = "queued"


class JobUpdate(BaseModel):
    status: str
