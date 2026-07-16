# Use lightweight Node image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package descriptors first for optimal layer caching
COPY package.json package-lock.json* ./

# Install dependencies with robust network retry and lower socket concurrency to prevent ECONNRESET in Docker
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set maxsockets 2 && \
    (npm install --no-audit --no-fund || npm install --no-audit --no-fund --prefer-offline)

# Copy all frontend source files
COPY . .

# Set environment variable so client calls the backend API on localhost:8000
ENV VITE_API_BASE_URL=http://localhost:8000/api/v1
ENV HOST=0.0.0.0
ENV PORT=5173

# Expose Vite dev/preview port
EXPOSE 5173

# Run dev server bound to all interfaces so host browser can access http://localhost:5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
