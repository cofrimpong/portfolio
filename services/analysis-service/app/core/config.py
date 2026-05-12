from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    service_name: str = "analysis-service"
    port: int = 8004
    log_level: str = "INFO"


settings = Settings()
