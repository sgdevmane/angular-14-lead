# Multi-stage build for Angular 14 Lead Developer Interview Guide
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

# Create custom nginx configuration
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle markdown files with proper MIME type
    location ~* \.md$ {
        add_header Content-Type "text/plain; charset=utf-8";
        add_header Access-Control-Allow-Origin "*";
        add_header Access-Control-Allow-Methods "GET, OPTIONS";
        add_header Access-Control-Allow-Headers "Content-Type";
    }
    
    # Handle main routes
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
    
    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /index.html;
}
EOF

# Create startup script
RUN cat > /docker-entrypoint.sh << 'EOF'
#!/bin/bash
set -e

echo "Starting Angular 14 Lead Developer Interview Guide..."
echo "Application will be available at http://localhost:80"
echo "Health check available at http://localhost:80/health"

# Start nginx
exec nginx -g "daemon off;"
EOF

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
LABEL maintainer="Angular 14 Lead Developer" \
      description="Comprehensive Angular 14 Lead Developer Interview Guide" \
      version="1.0.0" \
      org.opencontainers.image.title="Angular 14 Interview Guide" \
      org.opencontainers.image.description="Interactive web application with Angular 14, JavaScript, HTML5, CSS3, NgRx, Performance, and Security interview questions" \
      org.opencontainers.image.vendor="Interview Guide Project" \
      org.opencontainers.image.version="1.0.0"