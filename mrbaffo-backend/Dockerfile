# =========================
# Stage 1 — Builder
# =========================
FROM python:3.11-slim AS builder

WORKDIR /install

# Prevent Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip

# Copy only requirements first (better caching)
COPY requirements.txt .

# Install dependencies into a separate directory
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt


# =========================
# Stage 2 — Runtime
# =========================
FROM python:3.11-slim

WORKDIR /app

# Security best practices
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy installed dependencies from builder stage
COPY --from=builder /install /usr/local

# Copy application code
COPY app ./app

# Set ownership
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
