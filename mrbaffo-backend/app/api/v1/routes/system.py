from fastapi import APIRouter, Depends, status
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.common import ApiResponse, HealthStatus, ResponseMeta
from app.utils.responses import success_response

router = APIRouter(tags=["system"])


@router.get(
    "/health",
    response_model=ApiResponse[HealthStatus],
    status_code=status.HTTP_200_OK,
)
def health_check(db: Session = Depends(get_db)) -> ApiResponse[HealthStatus]:
    """Health check endpoint verifying API and database connectivity."""
    try:
        db.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception:
        db_status = "unavailable"

    payload = HealthStatus(status="ok", database=db_status)
    meta = ResponseMeta(success=True, message="Health check successful.")
    return success_response(payload, meta=meta)
