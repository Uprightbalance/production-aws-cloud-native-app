from typing import List

from app.schemas.meta import AreaItem, CompanyInfo, ServiceItem


class MetaService:
    """Business logic for static business metadata."""

    @property
    def services(self) -> List[ServiceItem]:
        """Return the list of available services."""
        return [
            ServiceItem(
                name="Dry cleaning",
                description="Professional dry cleaning for garments and fabrics.",
            ),
            ServiceItem(
                name="Laundry",
                description="Wash-and-fold laundry services for everyday clothing.",
            ),
            ServiceItem(
                name="Alterations",
                description="Tailoring and alterations for a perfect fit.",
            ),
            ServiceItem(
                name="Shoe care",
                description="Cleaning and maintenance for shoes and boots.",
            ),
            ServiceItem(
                name="Wedding gown cleaning & preservation",
                description="Specialized care for wedding gowns and delicate dresses.",
            ),
            ServiceItem(
                name="Rug cleaning",
                description="Cleaning services for rugs and carpets.",
            ),
            ServiceItem(
                name="Leather & fur cleaning",
                description="Care for leather and fur garments and accessories.",
            ),
        ]

    @property
    def areas(self) -> List[AreaItem]:
        """Return the list of supported service areas."""
        return [
            AreaItem(
                name="Downtown Toronto",
                description="Core downtown Toronto service area.",
            ),
            AreaItem(
                name="East York",
                description="Coverage across East York neighborhoods.",
            ),
            AreaItem(
                name="North York",
                description="Service available across North York.",
            ),
            AreaItem(
                name="Scarborough",
                description="Coverage throughout Scarborough.",
            ),
        ]

    def get_company_info(self) -> CompanyInfo:
        """Return company information for the root endpoint."""
        return CompanyInfo(
            name="MR. BAFFO Dry Cleaning – Toronto",
            description=(
                "Premium dry cleaning, laundry, alterations, and specialty garment "
                "care serving Toronto and surrounding areas."
            ),
            services=[service.name for service in self.services],
            service_areas=[area.name for area in self.areas],
            phone="+1 647 575 7404",
            email="uprightwitdbalance@gmail.com",
        )
