from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.meta import ServiceItem, AreaItem
from app.services.meta_service import MetaService
from app.utils.responses import success_response

router = APIRouter(tags=["Business"])

meta_service = MetaService()


@router.get(
    "/services",
    response_model=dict,
    summary="Get available services",
    description="Returns a list of laundry services offered by the company.",
)
async def get_services(db: Session = Depends(get_db)):
    """
    Retrieve all services offered by the business.
    """
    services = meta_service.get_services(db)

    return success_response(
        data=services,
        message="Services retrieved successfully"
    )


@router.get(
    "/areas",
    response_model=dict,
    summary="Get service areas",
    description="Returns a list of geographical areas where services are available.",
)
async def get_areas(db: Session = Depends(get_db)):
    """
    Retrieve service coverage areas.
    """
    areas = meta_service.get_areas(db)

    return success_response(
        data=areas,
        message="Service areas retrieved successfully"
    )
