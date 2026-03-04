from typing import Any, Dict

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request

from app.api.v1.router import api_v1_router
from app.core.config import get_settings
from app.core.database import init_db
from app.schemas.common import ApiResponse, ResponseMeta
from app.schemas.meta import CompanyInfo
from app.services.meta_service import MetaService
from app.utils.exceptions import (
    http_exception_handler,
    unhandled_exception_handler,
    validation_exception_handler,
)
from app.utils.logging import configure_logging, get_logger

from fastapi.exceptions import RequestValidationError
from fastapi import HTTPException

settings = get_settings()
configure_logging(settings)
logger = get_logger(__name__)

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handlers
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)


# Routers
app.include_router(api_v1_router)


@app.on_event("startup")
def on_startup() -> None:
    """Application startup hook."""
    logger.info("Starting MR. BAFFO API.")
    # Optionally initialize database schema (primarily for local development).
    init_db()


@app.get("/", response_model=ApiResponse[CompanyInfo])
def read_root(meta_service: MetaService = Depends(MetaService)) -> ApiResponse[CompanyInfo]:
    """Root endpoint returning company information."""
    company_info = meta_service.get_company_info()
    meta = ResponseMeta(success=True, message="Company information retrieved.")
    return ApiResponse[CompanyInfo](meta=meta, data=company_info)


@app.get("/health/raw")
def raw_health() -> Dict[str, Any]:
    """Simple raw health endpoint without database check, mainly for debugging."""
    return {"status": "ok"}
