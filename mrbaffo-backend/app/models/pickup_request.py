from typing import Optional

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class PickupRequest(Base):
    """Pickup request for dry cleaning or related services."""

    __tablename__ = "pickup_requests"

    customer_name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    phone: Mapped[str] = mapped_column(String(length=50), nullable=False)
    email: Mapped[Optional[str]] = mapped_column(String(length=255), nullable=True)
    address: Mapped[str] = mapped_column(String(length=500), nullable=False)
    service_type: Mapped[str] = mapped_column(String(length=255), nullable=False)
    preferred_date: Mapped[str] = mapped_column(String(length=50), nullable=False)
    notes: Mapped[Optional[str]] = mapped_column(String(length=2000), nullable=True)
