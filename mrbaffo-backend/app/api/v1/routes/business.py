from typing import List

from fastapi import APIRouter, Depends

from app.schemas.meta import ServiceItem, AreaItem
from app.services.meta_service import MetaService
from app.utils.responses import success_response

router = APIRouter(
    prefix="",
    tags=["Business"],
)

# Service dependency
def get_meta_service() -> MetaService:
    return MetaService()


@router.get(
    "/services",
    summary="Get available services",
    description="Returns all laundry services offered by the business",
)
async def get_services(
    service: MetaService = Depends(get_meta_service),
):
    services: List[ServiceItem] = service.get_services()

    return success_response(
        data=services,
        message="Services retrieved successfully",
    )


@router.get(
    "/areas",
    summary="Get service areas",
    description="Returns geographical areas where the business operates",
)
async def get_areas(
    service: MetaService = Depends(get_meta_service),
):
    areas: List[AreaItem] = service.get_areas()

    return success_response(
        data=areas,
        message="Service areas retrieved successfully",
    )
