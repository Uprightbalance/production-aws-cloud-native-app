from typing import List

from fastapi import APIRouter, Depends, status

from app.core.dependencies import (
    get_contact_service,
    get_meta_service,
    get_pickup_service,
)
from app.schemas.common import ApiResponse, ResponseMeta
from app.schemas.contact_request import ContactRequestCreate, ContactRequestRead
from app.schemas.meta import AreaItem, ServiceItem
from app.schemas.pickup_request import PickupRequestCreate, PickupRequestRead
from app.services.contact_service import ContactService
from app.services.meta_service import MetaService
from app.services.pickup_service import PickupService
from app.utils.responses import success_response

router = APIRouter(tags=["business"])


@router.get(
    "/services",
    response_model=ApiResponse[List[ServiceItem]],
    status_code=status.HTTP_200_OK,
)
def list_services(
    meta_service: MetaService = Depends(get_meta_service),
) -> ApiResponse[list[ServiceItem]]:
    """Return the list of available services."""
    data = meta_service.services
    meta = ResponseMeta(success=True, message="Available services retrieved.")
    return success_response(data, meta=meta)


@router.get(
    "/areas",
    response_model=ApiResponse[List[AreaItem]],
    status_code=status.HTTP_200_OK,
)
def list_areas(
    meta_service: MetaService = Depends(get_meta_service),
) -> ApiResponse[list[AreaItem]]:
    """Return the list of supported service areas."""
    data = meta_service.areas
    meta = ResponseMeta(success=True, message="Service areas retrieved.")
    return success_response(data, meta=meta)


@router.post(
    "/contact",
    response_model=ApiResponse[ContactRequestRead],
    status_code=status.HTTP_201_CREATED,
)
def create_contact_request(
    payload: ContactRequestCreate,
    service: ContactService = Depends(get_contact_service),
) -> ApiResponse[ContactRequestRead]:
    """Create a new contact request."""
    created = service.create_contact_request(payload)
    meta = ResponseMeta(success=True, message="Contact request created.")
    return success_response(created, meta=meta)


@router.post(
    "/pickup-request",
    response_model=ApiResponse[PickupRequestRead],
    status_code=status.HTTP_201_CREATED,
)
def create_pickup_request(
    payload: PickupRequestCreate,
    service: PickupService = Depends(get_pickup_service),
) -> ApiResponse[PickupRequestRead]:
    """Create a new pickup request."""
    created = service.create_pickup_request(payload)
    meta = ResponseMeta(success=True, message="Pickup request created.")
    return success_response(created, meta=meta)
