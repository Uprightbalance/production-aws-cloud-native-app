from collections.abc import Generator

from fastapi import Depends

from app.core.database import SessionLocal
from app.repositories.contact_request import ContactRequestRepository
from app.repositories.pickup_request import PickupRequestRepository
from app.services.contact_service import ContactService
from app.services.meta_service import MetaService
from app.services.pickup_service import PickupService


def get_db() -> Generator:
    """Provide a transactional SQLAlchemy session."""
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


def get_contact_request_repository(db=Depends(get_db)) -> ContactRequestRepository:
    """Dependency injection for ContactRequestRepository."""
    return ContactRequestRepository(db)


def get_pickup_request_repository(db=Depends(get_db)) -> PickupRequestRepository:
    """Dependency injection for PickupRequestRepository."""
    return PickupRequestRepository(db)


def get_contact_service(
    contact_repo: ContactRequestRepository = Depends(get_contact_request_repository),
) -> ContactService:
    """Dependency injection for ContactService."""
    return ContactService(contact_repo)


def get_pickup_service(
    pickup_repo: PickupRequestRepository = Depends(get_pickup_request_repository),
) -> PickupService:
    """Dependency injection for PickupService."""
    return PickupService(pickup_repo)


def get_meta_service() -> MetaService:
    """Dependency injection for MetaService (stateless)."""
    return MetaService()
