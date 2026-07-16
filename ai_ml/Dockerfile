# Use official lightweight Python image
FROM python:3.13-slim

# Set working directory
WORKDIR /workspace

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirement files
COPY ai_ml/requirements.txt /workspace/ai_ml/requirements.txt

# Install dependencies with robust timeout and retries
RUN pip install --no-cache-dir --upgrade pip && \
    (pip install --no-cache-dir --default-timeout=100 --retries 5 -r ai_ml/requirements.txt || \
     pip install --no-cache-dir --default-timeout=200 --retries 10 -r ai_ml/requirements.txt)

# Copy ai_ml directory
COPY ai_ml /workspace/ai_ml

# Set working directory to ai_ml where main.py resides
WORKDIR /workspace/ai_ml
ENV PYTHONPATH=/workspace

# Expose standalone ML API port
EXPOSE 8001

# Run Uvicorn server for standalone ML microservice bound to 0.0.0.0
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
