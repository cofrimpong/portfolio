from app.core.config import settings

from shared.observability.logger import configure_logging

configure_logging(service_name=settings.service_name, level=settings.log_level)
