from typing import Generic, Optional, TypeVar

from app.schemas.common import ApiResponse, ResponseMeta

T = TypeVar("T")


def success_response(
    data: Optional[T],
    meta: Optional[ResponseMeta] = None,
) -> ApiResponse[T]:
    """Create a standardized success response."""
    meta = meta or ResponseMeta(success=True, message=None)
    return ApiResponse[T](meta=meta, data=data)
