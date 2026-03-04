from typing import Optional

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class ContactRequest(Base):
    """Contact request submitted via the website."""

    __tablename__ = "contact_requests"

    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    email: Mapped[str] = mapped_column(String(length=255), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(length=50), nullable=True)
    message: Mapped[str] = mapped_column(String(length=2000), nullable=False)
