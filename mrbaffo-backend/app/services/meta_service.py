from app.schemas.meta import ServiceItem, AreaItem


class MetaService:

    def get_services(self):
        return [
            ServiceItem(
                name="Dry Cleaning",
                description="Professional dry cleaning services"
            ),
            ServiceItem(
                name="Wash & Fold",
                description="Laundry washed and folded for you"
            )
        ]

    def get_areas(self):
        return [
            AreaItem(
                name="Downtown Toronto",
                description="Core downtown Toronto service area"
            ),
            AreaItem(
                name="North York",
                description="North York residential service area"
            )
        ]
