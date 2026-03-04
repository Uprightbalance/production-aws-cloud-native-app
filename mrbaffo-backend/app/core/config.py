from functools import lru_cache
from typing import List

from pydantic import Field, ValidationError, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    app_name: str = Field(..., alias="APP_NAME")
    environment: str = Field(..., alias="ENVIRONMENT")
    database_url: str = Field(..., alias="DATABASE_URL")
    cors_origins: List[str] = Field(default_factory=list, alias="CORS_ORIGINS")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: str | List[str]) -> List[str]:
        """Parse CORS origins from a comma-separated string or list."""
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        if isinstance(value, list):
            return value
        return []

    @field_validator("database_url")
    @classmethod
    def ensure_database_url_present(cls, value: str) -> str:
        """Ensure DATABASE_URL is provided; fail fast if missing."""
        if not value or not value.strip():
            raise ValueError("DATABASE_URL environment variable must be set.")
        return value


@lru_cache
def get_settings() -> Settings:
    """Return cached application settings instance."""
    try:
        return Settings()
    except ValidationError as exc:
        # Fail fast with a clear error if configuration is invalid.
        # Allow the exception to propagate and stop application startup.
        raise RuntimeError(f"Configuration error: {exc}") from exc
