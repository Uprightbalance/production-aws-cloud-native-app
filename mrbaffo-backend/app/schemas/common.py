from typing import Any, Generic, List, Optional, TypeVar

from pydantic import BaseModel, Field
from pydantic.generics import GenericModel

T = TypeVar("T")


class ResponseMeta(BaseModel):
    """Metadata for API responses."""

    success: bool = Field(..., description="Indicates if the request was successful.")
    message: Optional[str] = Field(
        default=None, description="Optional human-readable message."
    )


class ApiResponse(GenericModel, Generic[T]):
    """Standard API response envelope."""

    meta: ResponseMeta = Field(..., description="Response metadata.")
    data: Optional[T] = Field(default=None, description="Response payload.")


class PaginatedMeta(ResponseMeta):
    """Metadata for paginated responses."""

    total: int = Field(..., description="Total number of items available.")
    limit: int = Field(..., description="Maximum number of items returned.")
    offset: int = Field(..., description="Offset of the first item returned.")


class PaginatedResponse(GenericModel, Generic[T]):
    """Standard paginated API response."""

    meta: PaginatedMeta
    data: List[T]


class HealthStatus(BaseModel):
    """Health status payload."""

    status: str = Field(..., description="Overall API status.")
    database: str = Field(..., description="Database connectivity status.")
