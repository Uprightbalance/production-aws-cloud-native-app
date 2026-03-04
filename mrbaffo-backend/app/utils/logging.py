import logging
from typing import Any, Dict

from app.core.config import Settings


def configure_logging(settings: Settings) -> None:
    """Configure application-wide structured logging using the standard library."""
    log_level = logging.INFO if settings.environment == "production" else logging.DEBUG

    logging.basicConfig(
        level=log_level,
        format=(
            '{"level":"%(levelname)s","logger":"%(name)s",'
            '"message":"%(message)s","time":"%(asctime)s"}'
        ),
    )


def get_logger(name: str) -> logging.Logger:
    """Get a logger instance by name."""
    return logging.getLogger(name)


def log_exception(logger: logging.Logger, message: str, extra: Dict[str, Any] | None = None) -> None:
    """Log an exception with optional structured context."""
    logger.exception(message, extra=extra or {})
