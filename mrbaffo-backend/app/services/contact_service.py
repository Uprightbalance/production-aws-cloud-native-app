from app.repositories.contact_request import ContactRequestRepository
from app.schemas.contact_request import ContactRequestCreate, ContactRequestRead


class ContactService:
    """Business logic for handling contact requests."""

    def __init__(self, contact_repository: ContactRequestRepository):
        self._contact_repository = contact_repository

    def create_contact_request(self, payload: ContactRequestCreate) -> ContactRequestRead:
        """Create a new contact request."""
        db_obj = self._contact_repository.create(payload.model_dump())
        return ContactRequestRead.model_validate(db_obj)
