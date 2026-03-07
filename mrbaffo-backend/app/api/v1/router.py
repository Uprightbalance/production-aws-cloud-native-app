from fastapi import APIRouter

from app.api.v1.routes import business, system

api_router = APIRouter()

api_router.include_router(system.router)
api_router.include_router(business.router)
