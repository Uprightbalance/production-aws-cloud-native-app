from collections.abc import Sequence
from typing import Generic, Optional, Type, TypeVar

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from app.models.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """Generic repository providing basic CRUD and pagination-ready access."""

    def __init__(self, db: Session, model: Type[ModelType]):
        self.db = db
        self.model = model

    def _base_query(self) -> Select:
        return select(self.model)

    def get(self, object_id: int) -> Optional[ModelType]:
        """Retrieve a single object by primary key."""
        return self.db.get(self.model, object_id)

    def list(self, offset: int = 0, limit: int = 100) -> Sequence[ModelType]:
        """Retrieve multiple objects with pagination support."""
        stmt = self._base_query().offset(offset).limit(limit)
        return self.db.execute(stmt).scalars().all()

    def count(self) -> int:
        """Return the total number of records for this model."""
        stmt = select(self.model)
        return self.db.execute(stmt).scalars().count()

    def create(self, obj_in: dict) -> ModelType:
        """Create a new object from a dict of attributes."""
        db_obj = self.model(**obj_in)
        self.db.add(db_obj)
        self.db.flush()
        self.db.refresh(db_obj)
        return db_obj
