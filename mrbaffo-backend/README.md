## MR. BAFFO Dry Cleaning API

Backend API for **MR. BAFFO Dry Cleaning – Toronto**, built with **FastAPI**, **PostgreSQL**, and **SQLAlchemy 2.0**.  
This backend is designed for cloud projects and is production-ready from an application-architecture standpoint.

---

## Architecture Overview

- **Framework**: FastAPI
- **Database**: PostgreSQL (AWS RDS compatible)
- **ORM**: SQLAlchemy 2.0 (sync)
- **Validation**: Pydantic v2
- **Settings**: pydantic-settings
- **Server**: Uvicorn

### Directory Structure

```bash
app/
├── main.py                  # FastAPI application entrypoint
├── core/
│   ├── config.py            # Environment-driven configuration
│   ├── database.py          # SQLAlchemy engine and session factory
│   └── dependencies.py      # Dependency injection wiring
├── models/                  # SQLAlchemy models
├── schemas/                 # Pydantic request/response schemas
├── repositories/            # Repository layer (DB access)
├── services/                # Business logic layer
├── api/
│   └── v1/
│       ├── routes/          # Versioned route handlers
│       └── router.py        # API v1 router
└── utils/                   # Logging, responses, exception helpers
```
