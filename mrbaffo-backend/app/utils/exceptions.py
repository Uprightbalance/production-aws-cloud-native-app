from typing import Any, Dict

from fastapi import HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.schemas.common import ApiResponse, ResponseMeta
from app.utils.logging import get_logger

logger = get_logger(__name__)


def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    """Handle FastAPI HTTPException instances."""
    meta = ResponseMeta(success=False, message=exc.detail)
    response = ApiResponse[Any](meta=meta, data=None)
    logger.warning(
        "HTTP exception",
        extra={"path": request.url.path, "status_code": exc.status_code},
    )
    return JSONResponse(
        status_code=exc.status_code,
        content=response.model_dump(),
    )


def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    """Handle validation errors raised by FastAPI/Pydantic."""
    meta = ResponseMeta(success=False, message="Validation error.")
    response = ApiResponse[Any](meta=meta, data=exc.errors())
    logger.info(
        "Validation error",
        extra={"path": request.url.path},
    )
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=response.model_dump(),
    )


def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle unexpected server-side exceptions."""
    meta = ResponseMeta(success=False, message="Internal server error.")
    response = ApiResponse[Any](meta=meta, data=None)
    logger.exception(
        "Unhandled exception",
        extra={"path": request.url.path},
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=response.model_dump(),
    )
