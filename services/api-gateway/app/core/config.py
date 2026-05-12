from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    service_name: str = "api-gateway"
    port: int = 8000
    log_level: str = "INFO"
    processing_service_url: str = "http://localhost:8002"
    simulation_service_url: str = "http://localhost:8001"
    analysis_service_url: str = "http://localhost:8004"
    request_timeout_seconds: int = 10


settings = Settings()
