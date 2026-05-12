from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    service_name: str = "worker"
    port: int = 8003
    log_level: str = "INFO"
    simulation_service_url: str = "http://localhost:8001"
    processing_service_url: str = "http://localhost:8002"
    analysis_service_url: str = "http://localhost:8004"
    queue_url: str = "memory://local"


settings = Settings()
