from app.repositories.pickup_request import PickupRequestRepository
from app.schemas.pickup_request import PickupRequestCreate, PickupRequestRead


class PickupService:
    """Business logic for handling pickup requests."""

    def __init__(self, pickup_repository: PickupRequestRepository):
        self._pickup_repository = pickup_repository

    def create_pickup_request(self, payload: PickupRequestCreate) -> PickupRequestRead:
        """Create a new pickup request."""
        db_obj = self._pickup_repository.create(payload.model_dump())
        return PickupRequestRead.model_validate(db_obj)
