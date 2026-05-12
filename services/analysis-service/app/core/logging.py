from shared.observability.logger import configure_logging

from app.core.config import settings


configure_logging(service_name=settings.service_name, level=settings.log_level)
