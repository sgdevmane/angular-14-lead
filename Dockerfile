# Multi-stage build for Lead Developer Interview Guide
# Stage 1: Build stage (if needed for any build processes)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files if they exist (for future extensibility)
COPY package*.json ./

# Install dependencies if package.json exists
RUN if [ -f package.json ]; then npm ci --only=production; fi

# Copy source files
COPY . .

# Stage 2: Production stage with Nginx
FROM nginx:alpine AS production

# Install additional tools for better functionality
RUN apk add --no-cache \
    curl \
    bash

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy application files
COPY --from=builder /app /usr/share/nginx/html

# Copy nginx configuration based on environment
# Default to production configuration
ARG NGINX_CONFIG=nginx-prod.conf
COPY docker/${NGINX_CONFIG} /etc/nginx/conf.d/default.conf

# Ensure proper permissions
RUN chmod 644 /etc/nginx/conf.d/default.conf

# Create startup script
RUN echo '#!/bin/bash' > /docker-entrypoint.sh && \
    echo 'set -e' >> /docker-entrypoint.sh && \
    echo '' >> /docker-entrypoint.sh && \
    echo 'echo "Starting Lead Developer Interview Guide..."' >> /docker-entrypoint.sh && \
    echo 'echo "Application will be available at http://localhost:80"' >> /docker-entrypoint.sh && \
    echo 'echo "Health check available at http://localhost:80/health"' >> /docker-entrypoint.sh && \
    echo '' >> /docker-entrypoint.sh && \
    echo '# Start nginx' >> /docker-entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Set working directory
WORKDIR /usr/share/nginx/html

# Start the application
CMD ["/docker-entrypoint.sh"]

# Labels for better container management
LABEL maintainer="Lead Developer Guide" \
      description="Comprehensive Lead Developer Interview Guide" \
      version="1.0.0" \
      org.opencontainers.image.title="Angular 14 Interview Guide" \
      org.opencontainers.image.description="Interactive web application with Angular 14, JavaScript, HTML5, CSS3, NgRx, Performance, and Security interview questions" \
      org.opencontainers.image.vendor="Interview Guide Project" \
      org.opencontainers.image.version="1.0.0"