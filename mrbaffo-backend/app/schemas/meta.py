from typing import List

from pydantic import BaseModel, EmailStr, Field


class ServiceItem(BaseModel):
    """Represents a service offered by MR. BAFFO."""

    name: str = Field(..., description="Service name.")
    description: str = Field(..., description="Short description of the service.")


class AreaItem(BaseModel):
    """Represents a supported service area."""

    name: str = Field(..., description="Area name.")
    description: str = Field(..., description="Short description of the area.")


class CompanyInfo(BaseModel):
    """Public company information for the root endpoint."""

    name: str
    description: str
    services: List[str]
    service_areas: List[str]
    phone: str
    email: EmailStr
