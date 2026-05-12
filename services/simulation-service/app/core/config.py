from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    service_name: str = "simulation-service"
    port: int = 8001
    log_level: str = "INFO"
    model_provider: str = "deterministic"
    request_timeout_seconds: int = 20


settings = Settings()
