# Use official lightweight Python image
FROM python:3.13-slim

# Set working directory
WORKDIR /workspace

# Install system dependencies required for psycopg2, spatial geo tools, and building wheels
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirement files from both backend and ai_ml (since backend runs ai_ml models directly)
COPY backend/requirements.txt /workspace/backend/requirements.txt
COPY ai_ml/requirements.txt /workspace/ai_ml/requirements.txt

# Install dependencies with robust timeout and retries
RUN pip install --no-cache-dir --upgrade pip && \
    (pip install --no-cache-dir --default-timeout=100 --retries 5 -r backend/requirements.txt -r ai_ml/requirements.txt || \
     pip install --no-cache-dir --default-timeout=200 --retries 10 -r backend/requirements.txt -r ai_ml/requirements.txt)

# Copy entire backend, ai_ml, and data directories so imports and scripts run cleanly
COPY backend /workspace/backend
COPY ai_ml /workspace/ai_ml

# Set PYTHONPATH so python -m uvicorn and ai_ml imports resolve immediately
ENV PYTHONPATH=/workspace

# Expose FastAPI port
EXPOSE 8000

# Run Uvicorn server bound to 0.0.0.0
CMD ["python", "-m", "uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
