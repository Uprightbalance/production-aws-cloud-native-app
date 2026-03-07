from fastapi import APIRouter
from app.services.meta_service import MetaService
from app.utils.responses import success_response

router = APIRouter(tags=["Business"])

meta_service = MetaService()


@router.get("/services")
async def get_services():
    services = meta_service.get_services()

    return success_response(
        data=services,
        message="Services retrieved successfully",
    )


@router.get("/areas")
async def get_areas():
    areas = meta_service.get_areas()

    return success_response(
        data=areas,
        message="Service areas retrieved successfully",
    )
