from app.models.contact_request import ContactRequest
from app.repositories.base import BaseRepository


class ContactRequestRepository(BaseRepository[ContactRequest]):
    """Repository for contact requests."""

    def __init__(self, db):
        super().__init__(db, ContactRequest)
