from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class PickupRequestCreate(BaseModel):
    """Payload for creating a pickup request."""

    customer_name: str = Field(..., max_length=255)
    phone: str = Field(..., max_length=50)
    email: Optional[EmailStr] = Field(default=None)
    address: str = Field(..., max_length=500)
    service_type: str = Field(..., max_length=255)
    preferred_date: str = Field(
        ...,
        max_length=50,
        description="Preferred pickup date (free-form string, to be parsed by staff).",
    )
    notes: Optional[str] = Field(default=None, max_length=2000)


class PickupRequestRead(BaseModel):
    """Pickup request as returned by the API."""

    id: int
    customer_name: str
    phone: str
    email: Optional[EmailStr]
    address: str
    service_type: str
    preferred_date: str
    notes: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}
