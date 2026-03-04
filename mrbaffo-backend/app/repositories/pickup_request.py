from app.models.pickup_request import PickupRequest
from app.repositories.base import BaseRepository


class PickupRequestRepository(BaseRepository[PickupRequest]):
    """Repository for pickup requests."""

    def __init__(self, db):
        super().__init__(db, PickupRequest)
