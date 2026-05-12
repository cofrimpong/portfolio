from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    service_name: str = "data-processing-service"
    port: int = 8002
    log_level: str = "INFO"
    database_url: str = "sqlite:///./data.db"


settings = Settings()
