# Docker & DevOps Interview Questions

## Table of Contents
1. [Q1: What is Docker and how does it differ from virtual machines?](#q1-what-is-docker-and-how-does-it-differ-from-virtual-machines)
2. [Q2: Explain Docker networking and how containers communicate.](#q2-explain-docker-networking-and-how-containers-communicate)
3. [Q3: How do you create and optimize Dockerfiles for production?](#q3-how-do-you-create-and-optimize-dockerfiles-for-production)
4. [Q4: How do you implement Docker Compose for multi-container applications?](#q4-how-do-you-implement-docker-compose-for-multi-container-applications)
5. [Q5: How do you implement Docker security best practices?](#q5-how-do-you-implement-docker-security-best-practices)
6. [Q6: How do you implement Docker container orchestration and scaling?](#q6-how-do-you-implement-docker-container-orchestration-and-scaling)
7. [Q7: How do you implement Docker monitoring and logging?](#q7-how-do-you-implement-docker-monitoring-and-logging)
8. [Q9: How do you troubleshoot Docker container issues?](#q9-how-do-you-troubleshoot-docker-container-issues)
9. [Q10: How do you optimize Docker performance and resource usage?](#q10-how-do-you-optimize-docker-performance-and-resource-usage)
10. [Q11: How do you implement Docker Swarm for container orchestration?](#q11-how-do-you-implement-docker-swarm-for-container-orchestration)
11. [Q12: How do you integrate Docker with Kubernetes?](#q12-how-do-you-integrate-docker-with-kubernetes)
12. [Q13: How do you implement Docker multi-platform builds and deployment?](#q13-how-do-you-implement-docker-multi-platform-builds-and-deployment)
13. [Q14: How do you implement Docker enterprise patterns and best practices?](#q14-how-do-you-implement-docker-enterprise-patterns-and-best-practices)
14. [Q15: How do you implement Docker development workflows and debugging?](#q15-how-do-you-implement-docker-development-workflows-and-debugging)
15. [Q16: How do you implement Docker container backup and disaster recovery?](#q16-how-do-you-implement-docker-container-backup-and-disaster-recovery)
16. [Q17: How do you implement Docker image optimization and security scanning?](#q17-how-do-you-implement-docker-image-optimization-and-security-scanning)
17. [Q15: How do you implement Docker CI/CD integration?](#q15-how-do-you-implement-docker-cicd-integration)
18. [Q18: How do you implement Docker in production environments with high availability and scalability?](#q18-how-do-you-implement-docker-in-production-environments-with-high-availability-and-scalability)
19. [Q19: How do you implement Docker registry management and image lifecycle?](#q19-how-do-you-implement-docker-registry-management-and-image-lifecycle)
20. [Q20: How do you implement Docker ecosystem integration with modern DevOps tools?](#q20-how-do-you-implement-docker-ecosystem-integration-with-modern-devops-tools)

---

## Docker Fundamentals

### Q1: What is Docker and how does it differ from virtual machines?
**Difficulty: Easy**

**Answer:**
Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers. Unlike virtual machines, Docker containers share the host OS kernel, making them more efficient and faster to start.

**Key Differences:**

| Aspect | Docker Containers | Virtual Machines |
|--------|------------------|------------------|
| **Resource Usage** | Lightweight (MBs) | Heavy (GBs) |
| **Startup Time** | Seconds | Minutes |
| **OS Overhead** | Shared kernel | Full OS per VM |
| **Isolation** | Process-level | Hardware-level |
| **Portability** | High | Medium |
| **Performance** | Near-native | Overhead from hypervisor |

```dockerfile
# Example: Multi-stage Dockerfile for a Node.js application
# This demonstrates Docker best practices and optimization

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]
```

**Docker Architecture Components:**

```yaml
# docker-compose.yml - Complete application stack
version: '3.8'

services:
  # Frontend Application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_URL=http://backend:5000
    depends_on:
      - backend
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@postgres:5432/myapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  # Redis Cache
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - nginx_logs:/var/log/nginx
    depends_on:
      - frontend
      - backend
    networks:
      - app-network
    restart: unless-stopped

  # Monitoring with Prometheus
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    networks:
      - app-network
    restart: unless-stopped

  # Grafana Dashboard
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  nginx_logs:
    driver: local
  prometheus_data:
    driver: local
  grafana_data:
    driver: local
```

**Docker Commands Reference:**

```bash
#!/bin/bash
# Docker Commands Cheat Sheet

# === IMAGE MANAGEMENT ===

# Build image from Dockerfile
docker build -t myapp:latest .
docker build -t myapp:v1.0 --target production .

# List images
docker images
docker image ls

# Remove images
docker rmi myapp:latest
docker image prune -f  # Remove dangling images
docker image prune -a  # Remove all unused images

# Pull/Push images
docker pull nginx:alpine
docker push myregistry.com/myapp:latest

# Tag images
docker tag myapp:latest myregistry.com/myapp:v1.0

# === CONTAINER MANAGEMENT ===

# Run containers
docker run -d --name myapp -p 3000:3000 myapp:latest
docker run -it --rm ubuntu:20.04 /bin/bash  # Interactive mode
docker run -d --restart unless-stopped nginx  # Auto-restart

# List containers
docker ps          # Running containers
docker ps -a       # All containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Container operations
docker start myapp
docker stop myapp
docker restart myapp
docker pause myapp
docker unpause myapp

# Execute commands in running containers
docker exec -it myapp /bin/bash
docker exec myapp ls -la /app

# View logs
docker logs myapp
docker logs -f myapp  # Follow logs
docker logs --tail 100 myapp  # Last 100 lines

# Copy files
docker cp myapp:/app/config.json ./config.json
docker cp ./new-config.json myapp:/app/config.json

# Container inspection
docker inspect myapp
docker stats myapp  # Resource usage
docker top myapp    # Running processes

# Remove containers
docker rm myapp
docker rm -f myapp  # Force remove running container
docker container prune  # Remove stopped containers

# === VOLUME MANAGEMENT ===

# Create and manage volumes
docker volume create mydata
docker volume ls
docker volume inspect mydata
docker volume rm mydata
docker volume prune  # Remove unused volumes

# Run with volumes
docker run -v mydata:/app/data myapp:latest
docker run -v $(pwd):/app/src myapp:latest  # Bind mount

# === NETWORK MANAGEMENT ===

# Create networks
docker network create mynetwork
docker network create --driver bridge --subnet 172.20.0.0/16 mynetwork

# List and inspect networks
docker network ls
docker network inspect mynetwork

# Connect containers to networks
docker network connect mynetwork myapp
docker network disconnect mynetwork myapp

# Run container with custom network
docker run --network mynetwork myapp:latest

# === DOCKER COMPOSE ===

# Start services
docker-compose up -d
docker-compose up --build  # Rebuild images
docker-compose up --scale backend=3  # Scale service

# Stop services
docker-compose down
docker-compose down -v  # Remove volumes
docker-compose down --rmi all  # Remove images

# View services
docker-compose ps
docker-compose logs backend
docker-compose logs -f  # Follow all logs

# Execute commands
docker-compose exec backend /bin/bash
docker-compose run --rm backend npm test

# === SYSTEM MANAGEMENT ===

# System information
docker version
docker info
docker system df  # Disk usage

# Clean up system
docker system prune     # Remove unused data
docker system prune -a  # Remove all unused data
docker system prune --volumes  # Include volumes

# === REGISTRY OPERATIONS ===

# Login to registry
docker login myregistry.com
docker login -u username -p password myregistry.com

# Search images
docker search nginx

# === DEBUGGING AND TROUBLESHOOTING ===

# Debug container startup issues
docker run --rm myapp:latest /bin/sh -c "ls -la && cat /app/package.json"

# Check container health
docker inspect --format='{{.State.Health.Status}}' myapp

# Monitor resource usage
docker stats --no-stream
watch docker stats --no-stream

# Export/Import containers
docker export myapp > myapp.tar
docker import myapp.tar myapp:backup

# Save/Load images
docker save myapp:latest > myapp-image.tar
docker load < myapp-image.tar
```

**Docker Benefits:**

1. **Consistency**: "Works on my machine" problem solved
2. **Portability**: Run anywhere Docker is supported
3. **Efficiency**: Lightweight compared to VMs
4. **Scalability**: Easy horizontal scaling
5. **Isolation**: Process and resource isolation
6. **Version Control**: Image versioning and rollbacks
7. **DevOps Integration**: CI/CD pipeline integration
8. **Microservices**: Perfect for microservice architecture

**Use Cases:**
- **Application Deployment**: Consistent deployment across environments
- **Development Environment**: Standardized dev setups
- **Microservices**: Container per service
- **CI/CD Pipelines**: Build, test, and deploy automation
- **Legacy Application Modernization**: Containerize existing apps
- **Cloud Migration**: Easier migration between cloud providers

---

### Q2: Explain Docker networking and how containers communicate.
**Difficulty: Medium**

**Answer:**
Docker networking enables communication between containers, between containers and the host, and between containers and external networks. Docker provides several network drivers to handle different networking scenarios.

**Docker Network Drivers:**

```bash
#!/bin/bash
# Docker Networking Comprehensive Guide

# === NETWORK DRIVERS ===

# 1. Bridge Network (Default)
# - Default network for containers
# - Provides isolation from host network
# - Containers can communicate via container names
docker network create --driver bridge my-bridge-network

# 2. Host Network
# - Container uses host's network stack
# - No network isolation
# - Better performance, less security
docker run --network host nginx

# 3. None Network
# - No network access
# - Complete network isolation
docker run --network none alpine

# 4. Overlay Network (Swarm mode)
# - Multi-host networking
# - Used in Docker Swarm clusters
docker network create --driver overlay --attachable my-overlay

# 5. Macvlan Network
# - Assign MAC address to container
# - Container appears as physical device
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 my-macvlan
```

**Network Configuration Examples:**

```yaml
# docker-compose.yml - Advanced networking scenarios
version: '3.8'

services:
  # Frontend in public network
  frontend:
    build: ./frontend
    networks:
      - public
      - internal
    ports:
      - "3000:3000"
    environment:
      - API_URL=http://backend:5000

  # Backend in internal network only
  backend:
    build: ./backend
    networks:
      - internal
      - database
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis

  # Database in isolated network
  postgres:
    image: postgres:15
    networks:
      - database
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Cache service
  redis:
    image: redis:alpine
    networks:
      - internal
    command: redis-server --requirepass secret

  # Load balancer with external access
  nginx:
    image: nginx:alpine
    networks:
      - public
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend

  # Monitoring service with access to all networks
  monitoring:
    image: prom/prometheus
    networks:
      - public
      - internal
      - database
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro

networks:
  # Public network - accessible from outside
  public:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24
          gateway: 172.20.0.1

  # Internal network - app communication
  internal:
    driver: bridge
    internal: true  # No external access
    ipam:
      config:
        - subnet: 172.21.0.0/24

  # Database network - isolated
  database:
    driver: bridge
    internal: true
    ipam:
      config:
        - subnet: 172.22.0.0/24

volumes:
  postgres_data:
```

**Container Communication Examples:**

```javascript
// Node.js application demonstrating container communication
const express = require('express');
const redis = require('redis');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
app.use(express.json());

// Database connection using container name
const pgPool = new Pool({
  host: process.env.DB_HOST || 'postgres',  // Container name
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'secret',
});

// Redis connection using container name
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || 'secret'
});

// Service discovery and communication
app.get('/api/users', async (req, res) => {
  try {
    // Database query
    const result = await pgPool.query('SELECT * FROM users');
    
    // Cache the result
    await redisClient.setex('users', 300, JSON.stringify(result.rows));
    
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Inter-service communication
app.get('/api/external-data', async (req, res) => {
  try {
    // Call another service using container name
    const response = await axios.get('http://external-api:3001/data');
    res.json(response.data);
  } catch (error) {
    console.error('Service communication error:', error);
    res.status(500).json({ error: 'Service unavailable' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Network Management Commands:**

```bash
# Network inspection and management

# List all networks
docker network ls

# Inspect network details
docker network inspect bridge
docker network inspect my-custom-network

# Create custom networks
docker network create --driver bridge \
  --subnet=172.30.0.0/24 \
  --gateway=172.30.0.1 \
  --ip-range=172.30.0.0/28 \
  my-custom-network

# Connect/disconnect containers to networks
docker network connect my-network my-container
docker network disconnect my-network my-container

# Run container with specific network
docker run --network my-network --name web nginx

# Run container with custom IP
docker run --network my-network --ip 172.30.0.10 nginx

# Port mapping and exposure
docker run -p 8080:80 nginx  # Host:Container
docker run -P nginx          # Random host ports
docker run --expose 3000 myapp  # Expose port to other containers

# Network troubleshooting
docker exec -it container_name ping other_container
docker exec -it container_name nslookup other_container
docker exec -it container_name netstat -tulpn
docker exec -it container_name ss -tulpn

# Clean up unused networks
docker network prune
```

**Advanced Networking Scenarios:**

```dockerfile
# Multi-stage build with networking considerations
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Expose port
EXPOSE 3000

# Switch to non-root user
USER nextjs

# Health check for load balancers
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
```

**Network Security Best Practices:**

1. **Network Segmentation**: Use multiple networks to isolate services
2. **Least Privilege**: Only expose necessary ports
3. **Internal Networks**: Use internal networks for backend services
4. **TLS Encryption**: Encrypt inter-service communication
5. **Network Policies**: Implement network access controls
6. **Monitoring**: Monitor network traffic and connections
7. **Firewall Rules**: Configure host firewall appropriately
8. **Service Mesh**: Consider service mesh for complex microservices

**Common Networking Issues and Solutions:**

```bash
# Issue: Container can't resolve other container names
# Solution: Ensure containers are on the same network
docker network create mynetwork
docker run --network mynetwork --name app1 myapp1
docker run --network mynetwork --name app2 myapp2

# Issue: Port conflicts
# Solution: Use different host ports or docker-compose
docker run -p 8081:80 nginx  # Instead of 8080:80

# Issue: Cannot access container from host
# Solution: Check port mapping and firewall
docker run -p 0.0.0.0:8080:80 nginx  # Bind to all interfaces

# Issue: Containers can't access internet
# Solution: Check DNS and routing
docker run --dns 8.8.8.8 myapp
```

---

### Q3: How do you create and optimize Dockerfiles for production?
**Difficulty: Medium**

**Answer:**
Creating optimized Dockerfiles is crucial for production deployments. This involves using multi-stage builds, minimizing image size, implementing security best practices, and ensuring efficient caching.

**Multi-Stage Dockerfile Example:**

```dockerfile
# Production-optimized Dockerfile for Node.js application

# Stage 1: Dependencies and build
FROM node:18-alpine AS dependencies
WORKDIR /app

# Copy package files first for better caching
COPY package*.json yarn.lock* ./

# Install all dependencies (including dev dependencies)
RUN npm ci --include=dev && npm cache clean --force

# Stage 2: Build application
FROM dependencies AS builder
WORKDIR /app

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 3: Production dependencies only
FROM node:18-alpine AS prod-deps
WORKDIR /app

# Copy package files
COPY package*.json yarn.lock* ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Stage 4: Final production image
FROM node:18-alpine AS production

# Install security updates and required packages
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init curl && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Set working directory
WORKDIR /app

# Copy production dependencies
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --chown=nextjs:nodejs package*.json ./

# Create necessary directories with correct permissions
RUN mkdir -p /app/logs /app/tmp && \
    chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

**Python Flask Application Dockerfile:**

```dockerfile
# Multi-stage Dockerfile for Python Flask application

# Stage 1: Build stage
FROM python:3.11-slim AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Stage 2: Production stage
FROM python:3.11-slim AS production

# Install runtime dependencies and security updates
RUN apt-get update && apt-get install -y \
    curl \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy virtual environment from builder stage
COPY --from=builder /opt/venv /opt/venv

# Set working directory
WORKDIR /app

# Copy application code
COPY --chown=appuser:appuser . .

# Create necessary directories
RUN mkdir -p /app/logs /app/uploads && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Set environment variables
ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1
ENV FLASK_ENV=production

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Run application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

**React Application Dockerfile:**

```dockerfile
# Multi-stage Dockerfile for React application with Nginx

# Stage 1: Build React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json yarn.lock* ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production

# Install security updates
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

# Copy built application
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Create non-root user for Nginx
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginx -u 1001 -G nginx

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Create PID directory
RUN mkdir -p /var/run/nginx && \
    chown -R nginx:nginx /var/run/nginx

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Dockerfile Optimization Best Practices:**

```dockerfile
# Best practices demonstration

# 1. Use specific base image versions
FROM node:18.17.0-alpine3.18

# 2. Combine RUN commands to reduce layers
RUN apk update && apk upgrade && \
    apk add --no-cache curl dumb-init && \
    rm -rf /var/cache/apk/*

# 3. Use .dockerignore to exclude unnecessary files
# .dockerignore content:
# node_modules
# npm-debug.log
# .git
# .gitignore
# README.md
# .env
# coverage
# .nyc_output

# 4. Order instructions by frequency of change
# (least frequently changed first)
WORKDIR /app

# Copy package files first (changes less frequently)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code last (changes most frequently)
COPY . .

# 5. Use multi-stage builds to reduce final image size
# 6. Run as non-root user
# 7. Use COPY instead of ADD unless you need ADD's features
# 8. Minimize the number of layers
# 9. Use specific COPY commands instead of COPY . .
# 10. Set appropriate labels for metadata

LABEL maintainer="team@company.com" \
      version="1.0.0" \
      description="Production Node.js application"
```

**Security Hardening:**

```dockerfile
# Security-hardened Dockerfile
FROM node:18-alpine

# Update packages and install security updates
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

# Create non-root user with specific UID/GID
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Set working directory
WORKDIR /app

# Copy and install dependencies as root
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Set ownership and permissions
RUN chown -R appuser:appgroup /app && \
    chmod -R 755 /app

# Switch to non-root user
USER appuser

# Remove unnecessary packages and files
RUN npm prune --production

# Set security-focused environment variables
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

---

### Q4: How do you implement Docker Compose for multi-container applications?
**Difficulty: Medium**

**Answer:**
Docker Compose allows you to define and run multi-container Docker applications using a YAML file. It's essential for orchestrating complex applications with multiple services, databases, and dependencies.

**Complete Docker Compose Example:**

```yaml
# docker-compose.yml - Full-stack application
version: '3.8'

services:
  # Frontend React Application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: production
    container_name: frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
      - REACT_APP_ENV=production
    networks:
      - frontend-network
    depends_on:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Backend API Service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      args:
        - NODE_ENV=production
    container_name: backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=${POSTGRES_DB}
      - DB_USER=${POSTGRES_USER}
      - DB_PASSWORD=${POSTGRES_PASSWORD}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=${JWT_SECRET}
    env_file:
      - .env
    networks:
      - frontend-network
      - backend-network
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./backend/uploads:/app/uploads
      - ./backend/logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: postgres
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_INITDB_ARGS=--encoding=UTF-8 --lc-collate=C --lc-ctype=C
    env_file:
      - .env
    networks:
      - backend-network
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
      - ./database/backups:/backups
    ports:
      - "5432:5432"  # Only for development
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: redis
    command: redis-server --requirepass ${REDIS_PASSWORD} --appendonly yes
    environment:
      - REDIS_PASSWORD=${REDIS_PASSWORD}
    env_file:
      - .env
    networks:
      - backend-network
    volumes:
      - redis_data:/data
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf
    ports:
      - "6379:6379"  # Only for development
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
      start_period: 30s

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/logs:/var/log/nginx
    networks:
      - frontend-network
    depends_on:
      - frontend
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/health"]
      interval: 30s
      timeout: 10s
      retries: 3

# Network definitions
networks:
  frontend-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24

  backend-network:
    driver: bridge
    internal: true
    ipam:
      config:
        - subnet: 172.21.0.0/24

# Volume definitions
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
```

**Environment Configuration (.env):**

```bash
# .env file for Docker Compose

# Database Configuration
POSTGRES_DB=myapp
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secure_password_123

# Redis Configuration
REDIS_PASSWORD=redis_password_123

# Application Configuration
JWT_SECRET=your_jwt_secret_key_here
API_KEY=your_api_key_here

# Environment
NODE_ENV=production
DEBUG=false
```

**Docker Compose Override Files:**

```yaml
# docker-compose.override.yml - Development overrides
version: '3.8'

services:
  backend:
    build:
      target: development
    environment:
      - NODE_ENV=development
      - DEBUG=true
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev

  frontend:
    build:
      target: development
    environment:
      - REACT_APP_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm start

  postgres:
    ports:
      - "5432:5432"  # Expose for development tools

  redis:
    ports:
      - "6379:6379"  # Expose for development tools
```

```yaml
# docker-compose.prod.yml - Production overrides
version: '3.8'

services:
  frontend:
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  backend:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  postgres:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 1G
    # Remove port exposure for security
    ports: []

  redis:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    # Remove port exposure for security
    ports: []
```

**Docker Compose Commands:**

```bash
#!/bin/bash
# Docker Compose management script

# Development environment
docker-compose up -d                    # Start all services
docker-compose up --build              # Rebuild and start
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

# Production environment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Service management
docker-compose start backend           # Start specific service
docker-compose stop backend            # Stop specific service
docker-compose restart backend         # Restart specific service
docker-compose pause backend           # Pause specific service
docker-compose unpause backend         # Unpause specific service

# Scaling services
docker-compose up -d --scale backend=3 # Scale backend to 3 instances
docker-compose up -d --scale frontend=2

# Logs and monitoring
docker-compose logs -f                 # Follow all logs
docker-compose logs -f backend         # Follow specific service logs
docker-compose logs --tail=100 backend # Last 100 lines
docker-compose top                      # Show running processes

# Health and status
docker-compose ps                       # Show service status
docker-compose ps --services           # List service names
docker-compose config                   # Validate and view config
docker-compose config --services       # List services

# Execution and debugging
docker-compose exec backend bash       # Execute command in running container
docker-compose run --rm backend npm test # Run one-off command
docker-compose run --rm --no-deps backend bash # Run without dependencies

# Data management
docker-compose down                     # Stop and remove containers
docker-compose down -v                 # Stop and remove containers + volumes
docker-compose down --rmi all          # Stop and remove containers + images

# Build management
docker-compose build                    # Build all services
docker-compose build --no-cache backend # Build specific service without cache
docker-compose build --parallel         # Build services in parallel

# Volume and network management
docker-compose volume ls               # List volumes
docker-compose network ls              # List networks

# Cleanup
docker-compose down --remove-orphans   # Remove orphaned containers
docker system prune -f                 # Clean up unused resources
```

---

### Q5: How do you implement Docker security best practices?
**Difficulty: Hard**

**Answer:**
Docker security involves multiple layers: image security, container runtime security, host security, and network security. Implementing comprehensive security measures is crucial for production deployments.

**Secure Dockerfile Practices:**

```dockerfile
# Security-hardened Dockerfile
FROM node:18-alpine AS base

# Update packages and install security updates
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init curl && \
    rm -rf /var/cache/apk/*

# Create non-root user with specific UID/GID
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Set working directory
WORKDIR /app

# Copy package files and install dependencies as root
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force && \
    npm audit fix

# Copy application code
COPY . .

# Set proper ownership and permissions
RUN chown -R appuser:appgroup /app && \
    chmod -R 755 /app && \
    chmod -R 644 /app/package*.json

# Remove unnecessary files and packages
RUN rm -rf /tmp/* /var/tmp/* && \
    find /app -name "*.md" -delete && \
    find /app -name ".git*" -delete

# Switch to non-root user
USER appuser

# Set security-focused environment variables
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_OPTIONS="--max-old-space-size=512"

# Expose port (use non-privileged port)
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

```

**Container Security Configuration:**

```yaml
# docker-compose.yml with security configurations
version: '3.8'

services:
  app:
    build: .
    container_name: secure-app
    
    # Security options
    security_opt:
      - no-new-privileges:true  # Prevent privilege escalation
      - apparmor:docker-default # Use AppArmor profile
      - seccomp:seccomp.json   # Custom seccomp profile
    
    # Read-only root filesystem
    read_only: true
    
    # Temporary filesystems for writable directories
    tmpfs:
      - /tmp:noexec,nosuid,size=100m
      - /var/tmp:noexec,nosuid,size=50m
      - /app/logs:noexec,nosuid,size=200m
    
    # Resource limits
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
          pids: 100
        reservations:
          cpus: '0.25'
          memory: 256M
    
    # Drop all capabilities and add only required ones
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    
    # User namespace remapping
    user: "1001:1001"
    
    # Network security
    networks:
      - app-network
    
    # Environment variables (use secrets for sensitive data)
    environment:
      - NODE_ENV=production
    
    # Mount secrets
    secrets:
      - db_password
      - api_key
    
    # Health check
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    
    # Restart policy
    restart: unless-stopped
    
    # Logging configuration
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

networks:
  app-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24
    driver_opts:
      com.docker.network.bridge.enable_icc: "false"
      com.docker.network.bridge.enable_ip_masquerade: "true"

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    file: ./secrets/api_key.txt
```

**Runtime Security Script:**

```bash
#!/bin/bash
# Docker security scanning and auditing script

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Docker Security Audit Script${NC}"
echo "=============================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 1. Image Security Scanning
echo -e "\n${YELLOW}1. Scanning Docker Images for Vulnerabilities${NC}"
if command_exists trivy; then
    echo "Scanning images with Trivy..."
    for image in $(docker images --format "{{.Repository}}:{{.Tag}}" | grep -v "<none>"); do
        echo "Scanning $image"
        trivy image --severity HIGH,CRITICAL "$image"
    done
else
    echo "Trivy not installed. Install with: brew install trivy"
fi

# 2. Container Runtime Security
echo -e "\n${YELLOW}2. Checking Container Runtime Security${NC}"

# Check for privileged containers
echo "Checking for privileged containers..."
privileged_containers=$(docker ps --filter "label=privileged=true" --format "{{.Names}}")
if [ -n "$privileged_containers" ]; then
    echo -e "${RED}WARNING: Privileged containers found:${NC}"
    echo "$privileged_containers"
else
    echo -e "${GREEN}No privileged containers found${NC}"
fi

# Check for containers running as root
echo "Checking for containers running as root..."
for container in $(docker ps --format "{{.Names}}"); do
    user=$(docker exec "$container" whoami 2>/dev/null || echo "unknown")
    if [ "$user" = "root" ]; then
        echo -e "${RED}WARNING: Container $container running as root${NC}"
    fi
done

# 3. Network Security
echo -e "\n${YELLOW}3. Checking Network Security${NC}"

# Check for containers with host networking
host_network_containers=$(docker ps --filter "network=host" --format "{{.Names}}")
if [ -n "$host_network_containers" ]; then
    echo -e "${RED}WARNING: Containers using host networking:${NC}"
    echo "$host_network_containers"
else
    echo -e "${GREEN}No containers using host networking${NC}"
fi

# 4. Volume Security
echo -e "\n${YELLOW}4. Checking Volume Security${NC}"

# Check for dangerous volume mounts
echo "Checking for dangerous volume mounts..."
docker ps --format "table {{.Names}}\t{{.Mounts}}" | while read -r line; do
    if echo "$line" | grep -E "(/etc|/proc|/sys|/dev|/var/run/docker.sock)"; then
        echo -e "${RED}WARNING: Dangerous volume mount detected:${NC}"
        echo "$line"
    fi
done

# 5. Secrets Management
echo -e "\n${YELLOW}5. Checking Secrets Management${NC}"

# Check for environment variables with sensitive data
echo "Checking for sensitive data in environment variables..."
for container in $(docker ps --format "{{.Names}}"); do
    env_vars=$(docker exec "$container" env 2>/dev/null || echo "")
    if echo "$env_vars" | grep -iE "(password|secret|key|token)=.*[^=]$"; then
        echo -e "${RED}WARNING: Potential secrets in environment variables for $container${NC}"
    fi
done

# 6. Docker Daemon Security
echo -e "\n${YELLOW}6. Checking Docker Daemon Security${NC}"

# Check Docker daemon configuration
if [ -f "/etc/docker/daemon.json" ]; then
    echo "Docker daemon configuration found:"
    cat /etc/docker/daemon.json
else
    echo -e "${YELLOW}No Docker daemon configuration found${NC}"
fi

# 7. Image Provenance
echo -e "\n${YELLOW}7. Checking Image Provenance${NC}"

# Check for unsigned images
echo "Checking for unsigned images..."
for image in $(docker images --format "{{.Repository}}:{{.Tag}}" | grep -v "<none>"); do
    if ! docker trust inspect "$image" >/dev/null 2>&1; then
        echo -e "${YELLOW}Image $image is not signed${NC}"
    fi
done

# 8. Resource Limits
echo -e "\n${YELLOW}8. Checking Resource Limits${NC}"

# Check for containers without resource limits
echo "Checking for containers without resource limits..."
for container in $(docker ps --format "{{.Names}}"); do
    memory_limit=$(docker inspect "$container" --format '{{.HostConfig.Memory}}')
    cpu_limit=$(docker inspect "$container" --format '{{.HostConfig.CpuQuota}}')
    
    if [ "$memory_limit" = "0" ]; then
        echo -e "${YELLOW}Container $container has no memory limit${NC}"
    fi
    
    if [ "$cpu_limit" = "0" ]; then
        echo -e "${YELLOW}Container $container has no CPU limit${NC}"
    fi
done

echo -e "\n${GREEN}Security audit completed${NC}"
```

**Security Checklist:**

```markdown
# Docker Security Checklist

## Image Security
- [ ] Use official base images from trusted registries
- [ ] Pin specific image versions (avoid 'latest' tag)
- [ ] Regularly update base images and dependencies
- [ ] Scan images for vulnerabilities (Trivy, Clair, Snyk)
- [ ] Use multi-stage builds to minimize attack surface
- [ ] Remove unnecessary packages and files
- [ ] Sign images with Docker Content Trust
- [ ] Use minimal base images (Alpine, Distroless)

## Container Security
- [ ] Run containers as non-root user
- [ ] Use read-only root filesystem
- [ ] Drop all capabilities and add only required ones
- [ ] Enable no-new-privileges flag
- [ ] Use security profiles (AppArmor, SELinux, seccomp)
- [ ] Set resource limits (CPU, memory, PIDs)
- [ ] Use user namespace remapping
- [ ] Implement proper health checks

## Network Security
- [ ] Use custom bridge networks instead of default
- [ ] Disable inter-container communication when not needed
- [ ] Use network segmentation
- [ ] Avoid host networking mode
- [ ] Implement network policies
- [ ] Use TLS for service communication
- [ ] Regularly audit network configurations

## Host Security
- [ ] Keep Docker daemon updated
- [ ] Configure Docker daemon securely
- [ ] Use TLS for Docker daemon API
- [ ] Implement proper logging and monitoring
- [ ] Secure Docker socket access
- [ ] Use rootless Docker when possible
- [ ] Regular security updates for host OS

## Secrets Management
- [ ] Never embed secrets in images
- [ ] Use Docker secrets or external secret management
- [ ] Rotate secrets regularly
- [ ] Audit secret access
- [ ] Use environment variables carefully
- [ ] Implement proper secret encryption

## Monitoring and Compliance
- [ ] Implement container runtime security monitoring
- [ ] Use security scanning in CI/CD pipeline
- [ ] Regular security audits and penetration testing
- [ ] Compliance with security standards (CIS, NIST)
- [ ] Incident response procedures
- [ ] Security training for development teams
```

---

### Q6: How do you implement Docker container orchestration and scaling?
**Difficulty: Hard**

**Answer:**
Container orchestration involves managing the lifecycle of containers in large, dynamic environments. This includes deployment, scaling, networking, and availability of containerized applications.

**Docker Swarm Implementation:**

```bash
#!/bin/bash
# Docker Swarm setup and management

# Initialize Docker Swarm
docker swarm init --advertise-addr $(hostname -I | awk '{print $1}')

# Get join tokens
MANAGER_TOKEN=$(docker swarm join-token manager -q)
WORKER_TOKEN=$(docker swarm join-token worker -q)

echo "Manager token: $MANAGER_TOKEN"
echo "Worker token: $WORKER_TOKEN"

# Join additional nodes (run on other machines)
# docker swarm join --token $WORKER_TOKEN <manager-ip>:2377

# Create overlay network
docker network create --driver overlay --attachable app-network

# Deploy stack
docker stack deploy -c docker-compose.swarm.yml myapp

# Scale services
docker service scale myapp_backend=5
docker service scale myapp_frontend=3

# Update services (rolling update)
docker service update --image myapp:v2 myapp_backend

# Monitor services
docker service ls
docker service ps myapp_backend
docker service logs myapp_backend
```

**Docker Swarm Compose File:**

```yaml
# docker-compose.swarm.yml
version: '3.8'

services:
  frontend:
    image: myapp/frontend:latest
    ports:
      - "80:80"
    networks:
      - app-network
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
        order: start-first
      rollback_config:
        parallelism: 1
        delay: 5s
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
      placement:
        constraints:
          - node.role == worker
        preferences:
          - spread: node.labels.zone
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  backend:
    image: myapp/backend:latest
    networks:
      - app-network
      - db-network
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
    secrets:
      - db_password
      - jwt_secret
    deploy:
      replicas: 5
      update_config:
        parallelism: 2
        delay: 10s
        failure_action: rollback
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      placement:
        constraints:
          - node.role == worker
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:15-alpine
    networks:
      - db-network
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=postgres
    secrets:
      - source: db_password
        target: POSTGRES_PASSWORD
    volumes:
      - postgres_data:/var/lib/postgresql/data
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      restart_policy:
        condition: on-failure
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    networks:
      - app-network
    configs:
      - source: nginx_config
        target: /etc/nginx/nginx.conf
    secrets:
      - source: ssl_cert
        target: /etc/nginx/ssl/cert.pem
      - source: ssl_key
        target: /etc/nginx/ssl/key.pem
    deploy:
      replicas: 2
      placement:
        constraints:
          - node.role == worker
      update_config:
        parallelism: 1
        delay: 30s

networks:
  app-network:
    driver: overlay
    attachable: true
  db-network:
    driver: overlay
    internal: true

volumes:
  postgres_data:
    driver: local

secrets:
  db_password:
    external: true
  jwt_secret:
    external: true
  ssl_cert:
    external: true
  ssl_key:
    external: true

configs:
  nginx_config:
    external: true
```

**Auto-scaling with Docker Swarm:**

```bash
#!/bin/bash
# Auto-scaling script for Docker Swarm

SERVICE_NAME="myapp_backend"
MIN_REPLICAS=2
MAX_REPLICAS=10
CPU_THRESHOLD=70
MEMORY_THRESHOLD=80

while true; do
    # Get current replica count
    CURRENT_REPLICAS=$(docker service inspect $SERVICE_NAME --format='{{.Spec.Replicas}}')
    
    # Get service stats
    STATS=$(docker service ps $SERVICE_NAME --format "table {{.Name}}\t{{.Node}}" --no-trunc | tail -n +2)
    
    TOTAL_CPU=0
    TOTAL_MEMORY=0
    CONTAINER_COUNT=0
    
    while IFS= read -r line; do
        CONTAINER_NAME=$(echo $line | awk '{print $1}')
        NODE_NAME=$(echo $line | awk '{print $2}')
        
        # Get container stats
        CONTAINER_STATS=$(docker -H $NODE_NAME stats --no-stream --format "table {{.CPUPerc}}\t{{.MemPerc}}" $CONTAINER_NAME 2>/dev/null)
        
        if [ $? -eq 0 ]; then
            CPU_PERC=$(echo $CONTAINER_STATS | tail -n +2 | awk '{print $1}' | sed 's/%//')
            MEM_PERC=$(echo $CONTAINER_STATS | tail -n +2 | awk '{print $2}' | sed 's/%//')
            
            TOTAL_CPU=$(echo "$TOTAL_CPU + $CPU_PERC" | bc)
            TOTAL_MEMORY=$(echo "$TOTAL_MEMORY + $MEM_PERC" | bc)
            CONTAINER_COUNT=$((CONTAINER_COUNT + 1))
        fi
    done <<< "$STATS"
    
    if [ $CONTAINER_COUNT -gt 0 ]; then
        AVG_CPU=$(echo "scale=2; $TOTAL_CPU / $CONTAINER_COUNT" | bc)
        AVG_MEMORY=$(echo "scale=2; $TOTAL_MEMORY / $CONTAINER_COUNT" | bc)
        
        echo "Current replicas: $CURRENT_REPLICAS"
        echo "Average CPU: $AVG_CPU%"
        echo "Average Memory: $AVG_MEMORY%"
        
        # Scale up if thresholds exceeded
        if (( $(echo "$AVG_CPU > $CPU_THRESHOLD" | bc -l) )) || (( $(echo "$AVG_MEMORY > $MEMORY_THRESHOLD" | bc -l) )); then
            if [ $CURRENT_REPLICAS -lt $MAX_REPLICAS ]; then
                NEW_REPLICAS=$((CURRENT_REPLICAS + 1))
                echo "Scaling up to $NEW_REPLICAS replicas"
                docker service scale $SERVICE_NAME=$NEW_REPLICAS
            fi
        # Scale down if usage is low
        elif (( $(echo "$AVG_CPU < 30" | bc -l) )) && (( $(echo "$AVG_MEMORY < 40" | bc -l) )); then
            if [ $CURRENT_REPLICAS -gt $MIN_REPLICAS ]; then
                NEW_REPLICAS=$((CURRENT_REPLICAS - 1))
                echo "Scaling down to $NEW_REPLICAS replicas"
                docker service scale $SERVICE_NAME=$NEW_REPLICAS
            fi
        fi
    fi
    
    sleep 60
done
```

```

**Kubernetes Integration:**

```yaml
# kubernetes-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-backend
  labels:
    app: myapp-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp-backend
  template:
    metadata:
      labels:
        app: myapp-backend
    spec:
      containers:
      - name: backend
        image: myapp/backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          value: "postgres-service"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-backend-service
spec:
  selector:
    app: myapp-backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp-backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

### Q7: How do you implement Docker monitoring and logging?
**Difficulty: Medium**

**Answer:**
Effective monitoring and logging are essential for maintaining containerized applications in production. This involves collecting metrics, logs, and implementing alerting systems.

**Complete Monitoring Stack with Docker Compose:**

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  # Application services
  app:
    image: myapp:latest
    container_name: myapp
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    networks:
      - app-network
      - monitoring-network
    logging:
      driver: "fluentd"
      options:
        fluentd-address: localhost:24224
        tag: myapp
    labels:
      - "prometheus.io/scrape=true"
      - "prometheus.io/port=3000"
      - "prometheus.io/path=/metrics"

  # Prometheus - Metrics collection
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./monitoring/rules:/etc/prometheus/rules
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'
    networks:
      - monitoring-network
    restart: unless-stopped

  # Grafana - Visualization
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards
    networks:
      - monitoring-network
    restart: unless-stopped

  # Node Exporter - Host metrics
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    networks:
      - monitoring-network
    restart: unless-stopped

  # cAdvisor - Container metrics
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    privileged: true
    devices:
      - /dev/kmsg
    networks:
      - monitoring-network
    restart: unless-stopped

  # Elasticsearch - Log storage
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    networks:
      - logging-network
    restart: unless-stopped

  # Logstash - Log processing
  logstash:
    image: docker.elastic.co/logstash/logstash:8.8.0
    container_name: logstash
    volumes:
      - ./logging/logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5044:5044"
      - "9600:9600"
    environment:
      - "LS_JAVA_OPTS=-Xmx256m -Xms256m"
    networks:
      - logging-network
    depends_on:
      - elasticsearch
    restart: unless-stopped

  # Kibana - Log visualization
  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    networks:
      - logging-network
    depends_on:
      - elasticsearch
    restart: unless-stopped

  # Fluentd - Log collection
  fluentd:
    build: ./logging/fluentd
    container_name: fluentd
    volumes:
      - ./logging/fluentd/conf:/fluentd/etc
      - /var/log:/var/log
    ports:
      - "24224:24224"
      - "24224:24224/udp"
    networks:
      - logging-network
      - app-network
    depends_on:
      - elasticsearch
    restart: unless-stopped

  # AlertManager - Alert handling
  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./monitoring/alertmanager.yml:/etc/alertmanager/alertmanager.yml
      - alertmanager_data:/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
      - '--storage.path=/alertmanager'
      - '--web.external-url=http://localhost:9093'
    networks:
      - monitoring-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge
  monitoring-network:
    driver: bridge
  logging-network:
    driver: bridge

volumes:
  prometheus_data:
  grafana_data:
  elasticsearch_data:
  alertmanager_data:
```

**Prometheus Configuration:**

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'myapp'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'docker-containers'
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: [__meta_docker_container_label_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_docker_container_label_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_docker_container_label_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__
```

**Alert Rules:**

```yaml
# monitoring/rules/alerts.yml
groups:
  - name: container_alerts
    rules:
      - alert: ContainerDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Container {{ $labels.instance }} is down"
          description: "Container {{ $labels.instance }} has been down for more than 1 minute."

      - alert: HighCPUUsage
        expr: (rate(container_cpu_usage_seconds_total[5m]) * 100) > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.name }}"
          description: "Container {{ $labels.name }} CPU usage is above 80% for more than 2 minutes."

      - alert: HighMemoryUsage
        expr: (container_memory_usage_bytes / container_spec_memory_limit_bytes) * 100 > 90
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High memory usage on {{ $labels.name }}"
          description: "Container {{ $labels.name }} memory usage is above 90% for more than 2 minutes."

      - alert: ContainerRestarts
        expr: increase(container_start_time_seconds[1h]) > 3
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: "Container {{ $labels.name }} restarting frequently"
          description: "Container {{ $labels.name }} has restarted more than 3 times in the last hour."

  - name: application_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is above 10% for more than 2 minutes."

      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is above 500ms for more than 2 minutes."
```

**Fluentd Configuration:**

```ruby
# logging/fluentd/conf/fluent.conf
<source>
  @type forward
  port 24224
  bind 0.0.0.0
</source>

<source>
  @type tail
  path /var/log/containers/*.log
  pos_file /var/log/fluentd-containers.log.pos
  tag kubernetes.*
  format json
  read_from_head true
</source>

<filter **>
  @type parser
  key_name log
  reserve_data true
  remove_key_name_field true
  <parse>
    @type json
  </parse>
</filter>

<filter **>
  @type record_transformer
  <record>
    hostname "#{Socket.gethostname}"
    timestamp ${time}
  </record>
</filter>

<match **>
  @type elasticsearch
  host elasticsearch
  port 9200
  logstash_format true
  logstash_prefix docker-logs
  logstash_dateformat %Y.%m.%d
  include_tag_key true
  type_name access_log
  tag_key @log_name
  <buffer>
    flush_interval 1s
    flush_thread_count 2
  </buffer>
</match>
```

**Application Metrics Integration:**

```javascript
// Node.js application with Prometheus metrics
const express = require('express');
const promClient = require('prom-client');
const app = express();

// Create a Registry
const register = new promClient.Registry();

// Add default metrics
promClient.collectDefaultMetrics({
  register,
  timeout: 5000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
});

// Custom metrics
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  registers: [register],
});

const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register],
});

// Middleware for metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status: res.statusCode,
    });
    
    httpRequestDuration.observe(
      {
        method: req.method,
        route: route,
        status: res.statusCode,
      },
      duration
    );
  });
  
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

**Health Check Script:**

```bash
#!/bin/bash
# scripts/health-check.sh

set -euo pipefail

ENVIRONMENT=$1
HOST=""

case $ENVIRONMENT in
  "staging")
    HOST="staging.myapp.com"
    ;;
  "production")
    HOST="myapp.com"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

echo "Running health checks for $ENVIRONMENT environment..."

# Health check endpoint
echo "Checking health endpoint..."
if ! curl -f "http://$HOST/health" > /dev/null 2>&1; then
  echo "Health check failed!"
  exit 1
fi

# Readiness check
echo "Checking readiness endpoint..."
if ! curl -f "http://$HOST/ready" > /dev/null 2>&1; then
  echo "Readiness check failed!"
  exit 1
fi

# Performance check
echo "Checking response time..."
RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' "http://$HOST/")
if (( $(echo "$RESPONSE_TIME > 2.0" | bc -l) )); then
  echo "Response time too slow: ${RESPONSE_TIME}s"
  exit 1
fi

echo "All health checks passed!"
```

---

### Q9: How do you troubleshoot Docker container issues?
**Difficulty: Medium**

**Answer:**
Troubleshooting Docker containers requires systematic approaches to identify and resolve issues related to container startup, networking, resource constraints, and application errors.

**Comprehensive Troubleshooting Guide:**

```bash
#!/bin/bash
# docker-troubleshoot.sh - Docker troubleshooting toolkit

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to check container status
check_container_status() {
    local container_name=$1
    print_header "Container Status Check: $container_name"
    
    if docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -q "$container_name"; then
        docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "$container_name"
        
        # Check if container is running
        if docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
            print_success "Container is running"
        else
            print_error "Container is not running"
            
            # Get exit code
            EXIT_CODE=$(docker inspect "$container_name" --format='{{.State.ExitCode}}')
            print_error "Exit code: $EXIT_CODE"
            
            # Show recent logs
            print_header "Recent Logs"
            docker logs --tail 50 "$container_name"
        fi
    else
        print_error "Container '$container_name' not found"
        echo "Available containers:"
        docker ps -a --format "table {{.Names}}\t{{.Status}}"
    fi
}

# Function to check container resources
check_container_resources() {
    local container_name=$1
    print_header "Resource Usage: $container_name"
    
    if docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
        # CPU and Memory usage
        docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.NetIO}}\t{{.BlockIO}}" "$container_name"
        
        # Check resource limits
        print_header "Resource Limits"
        MEMORY_LIMIT=$(docker inspect "$container_name" --format='{{.HostConfig.Memory}}')
        CPU_LIMIT=$(docker inspect "$container_name" --format='{{.HostConfig.CpuQuota}}')
        
        if [ "$MEMORY_LIMIT" != "0" ]; then
            echo "Memory limit: $(($MEMORY_LIMIT / 1024 / 1024))MB"
        else
            print_warning "No memory limit set"
        fi
        
        if [ "$CPU_LIMIT" != "0" ]; then
            echo "CPU limit: $CPU_LIMIT"
        else
            print_warning "No CPU limit set"
        fi
    else
        print_error "Container '$container_name' is not running"
    fi
}

# Function to check container networking
check_container_networking() {
    local container_name=$1
    print_header "Network Configuration: $container_name"
    
    if docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
        # Network settings
        docker inspect "$container_name" --format='{{range .NetworkSettings.Networks}}Network: {{.NetworkID}}{{"\n"}}IP: {{.IPAddress}}{{"\n"}}Gateway: {{.Gateway}}{{"\n"}}{{end}}'
        
        # Port mappings
        print_header "Port Mappings"
        docker port "$container_name" 2>/dev/null || echo "No port mappings"
        
        # Test connectivity
        print_header "Connectivity Tests"
        CONTAINER_IP=$(docker inspect "$container_name" --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}')
        
        if [ -n "$CONTAINER_IP" ]; then
            echo "Container IP: $CONTAINER_IP"
            
            # Test internal connectivity
            if docker exec "$container_name" ping -c 1 8.8.8.8 >/dev/null 2>&1; then
                print_success "External connectivity working"
            else
                print_error "External connectivity failed"
            fi
            
            # Test DNS resolution
            if docker exec "$container_name" nslookup google.com >/dev/null 2>&1; then
                print_success "DNS resolution working"
            else
                print_error "DNS resolution failed"
            fi
        fi
    else
        print_error "Container '$container_name' is not running"
    fi
}

# Function to check container volumes
check_container_volumes() {
    local container_name=$1
    print_header "Volume Mounts: $container_name"
    
    # Show volume mounts
    docker inspect "$container_name" --format='{{range .Mounts}}Type: {{.Type}}{{"\n"}}Source: {{.Source}}{{"\n"}}Destination: {{.Destination}}{{"\n"}}Mode: {{.Mode}}{{"\n"}}---{{"\n"}}{{end}}'
    
    # Check volume permissions
    print_header "Volume Permissions"
    docker exec "$container_name" ls -la / 2>/dev/null | grep -E "(app|data|logs|tmp)" || echo "No common volume directories found"
}

# Function to analyze container logs
analyze_container_logs() {
    local container_name=$1
    print_header "Log Analysis: $container_name"
    
    # Recent logs
    echo "Recent logs (last 100 lines):"
    docker logs --tail 100 "$container_name"
    
    # Error patterns
    print_header "Error Patterns"
    ERROR_COUNT=$(docker logs "$container_name" 2>&1 | grep -i "error\|exception\|failed\|fatal" | wc -l)
    WARNING_COUNT=$(docker logs "$container_name" 2>&1 | grep -i "warning\|warn" | wc -l)
    
    echo "Errors found: $ERROR_COUNT"
    echo "Warnings found: $WARNING_COUNT"
    
    if [ "$ERROR_COUNT" -gt 0 ]; then
        echo "Recent errors:"
        docker logs "$container_name" 2>&1 | grep -i "error\|exception\|failed\|fatal" | tail -10
    fi
}

# Function to check Docker daemon
check_docker_daemon() {
    print_header "Docker Daemon Status"
    
    # Docker version
    docker version --format '{{.Server.Version}}' 2>/dev/null && print_success "Docker daemon is running" || print_error "Docker daemon is not accessible"
    
    # Docker info
    print_header "Docker System Info"
    docker system df
    
    # Check for Docker daemon issues
    print_header "Docker Daemon Logs"
    if command -v journalctl >/dev/null 2>&1; then
        journalctl -u docker.service --no-pager -n 20 2>/dev/null || echo "Cannot access Docker daemon logs"
    else
        echo "journalctl not available"
    fi
}

# Function to check system resources
check_system_resources() {
    print_header "System Resources"
    
    # Disk space
    echo "Disk usage:"
    df -h | grep -E "(Filesystem|/dev/)"
    
    # Memory usage
    echo -e "\nMemory usage:"
    free -h
    
    # Docker disk usage
    echo -e "\nDocker disk usage:"
    docker system df
    
    # Check for low disk space
    DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$DISK_USAGE" -gt 90 ]; then
        print_error "Disk usage is high: ${DISK_USAGE}%"
    else
        print_success "Disk usage is acceptable: ${DISK_USAGE}%"
    fi
}

# Function to run comprehensive diagnostics
run_diagnostics() {
    local container_name=$1
    
    echo "Running comprehensive diagnostics for container: $container_name"
    echo "================================================"
    
    check_docker_daemon
    check_system_resources
    check_container_status "$container_name"
    check_container_resources "$container_name"
    check_container_networking "$container_name"
    check_container_volumes "$container_name"
    analyze_container_logs "$container_name"
    
    print_header "Troubleshooting Recommendations"
    
    # Generate recommendations based on findings
    if ! docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
        echo "1. Container is not running - check logs and restart if necessary"
        echo "2. Verify container configuration and dependencies"
        echo "3. Check if required environment variables are set"
    fi
    
    if [ "$DISK_USAGE" -gt 80 ]; then
        echo "4. Clean up Docker resources: docker system prune -a"
        echo "5. Remove unused volumes: docker volume prune"
    fi
    
    echo "6. Monitor container resources with: docker stats $container_name"
    echo "7. Check application-specific logs and metrics"
}

# Main script logic
if [ $# -eq 0 ]; then
    echo "Usage: $0 <container_name> [command]"
    echo "Commands:"
    echo "  status    - Check container status"
    echo "  resources - Check resource usage"
    echo "  network   - Check networking"
    echo "  volumes   - Check volume mounts"
    echo "  logs      - Analyze logs"
    echo "  system    - Check system resources"
    echo "  all       - Run all diagnostics (default)"
    exit 1
fi

CONTAINER_NAME=$1
COMMAND=${2:-all}

case $COMMAND in
    "status")
        check_container_status "$CONTAINER_NAME"
        ;;
    "resources")
        check_container_resources "$CONTAINER_NAME"
        ;;
    "network")
        check_container_networking "$CONTAINER_NAME"
        ;;
    "volumes")
        check_container_volumes "$CONTAINER_NAME"
        ;;
    "logs")
        analyze_container_logs "$CONTAINER_NAME"
        ;;
    "system")
        check_system_resources
        ;;
    "all")
        run_diagnostics "$CONTAINER_NAME"
        ;;
    *)
        echo "Unknown command: $COMMAND"
        exit 1
        ;;
esac
```

**Common Docker Issues and Solutions:**

```yaml
# docker-compose.debug.yml - Debug configuration
version: '3.8'

services:
  app-debug:
    build:
      context: .
      dockerfile: Dockerfile.debug
    ports:
      - "3000:3000"
      - "9229:9229"  # Node.js debug port
    environment:
      - NODE_ENV=development
      - DEBUG=*
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run debug
    stdin_open: true
    tty: true
    networks:
      - debug-network

  # Debug tools container
  debug-tools:
    image: nicolaka/netshoot
    command: sleep infinity
    networks:
      - debug-network
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

networks:
  debug-network:
    driver: bridge
```

**Debug Dockerfile:**

```dockerfile
# Dockerfile.debug
FROM node:18-alpine

WORKDIR /app

# Install debugging tools
RUN apk add --no-cache \
    curl \
    wget \
    netcat-openbsd \
    tcpdump \
    strace \
    htop \
    vim

COPY package*.json ./
RUN npm install

COPY . .

# Enable Node.js debugging
EXPOSE 3000 9229
CMD ["node", "--inspect=0.0.0.0:9229", "server.js"]
```

**Container Health Check Script:**

```bash
#!/bin/bash
# container-health-check.sh

CONTAINER_NAME=$1

if [ -z "$CONTAINER_NAME" ]; then
    echo "Usage: $0 <container_name>"
    exit 1
fi

# Check if container exists and is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo "Container $CONTAINER_NAME is not running"
    
    # Try to start the container
    echo "Attempting to start container..."
    if docker start "$CONTAINER_NAME" 2>/dev/null; then
        echo "Container started successfully"
        sleep 5
    else
        echo "Failed to start container"
        echo "Container logs:"
        docker logs --tail 20 "$CONTAINER_NAME"
        exit 1
    fi
fi

# Check container health
HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "no-healthcheck")

case $HEALTH_STATUS in
    "healthy")
        echo "✓ Container is healthy"
        ;;
    "unhealthy")
        echo "✗ Container is unhealthy"
        echo "Health check logs:"
        docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' "$CONTAINER_NAME"
        exit 1
        ;;
    "starting")
        echo "⏳ Container is starting up"
        ;;
    "no-healthcheck")
        echo "ℹ No health check configured"
        ;;
esac

# Check resource usage
echo "Resource usage:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" "$CONTAINER_NAME"

# Check recent logs for errors
ERROR_COUNT=$(docker logs --since 5m "$CONTAINER_NAME" 2>&1 | grep -i "error\|exception\|failed" | wc -l)
if [ "$ERROR_COUNT" -gt 0 ]; then
    echo "⚠ Found $ERROR_COUNT errors in recent logs"
    docker logs --since 5m "$CONTAINER_NAME" 2>&1 | grep -i "error\|exception\|failed" | tail -5
else
    echo "✓ No recent errors found"
fi
```

---

### Q10: How do you optimize Docker performance and resource usage?
**Difficulty: Advanced**

**Answer:**
Optimizing Docker performance involves image optimization, resource management, caching strategies, and runtime configurations to ensure efficient container operations.

**Multi-stage Dockerfile Optimization:**

```dockerfile
# Optimized multi-stage Dockerfile
FROM node:18-alpine AS base
# Use specific version and alpine for smaller size
WORKDIR /app

# Install only production dependencies first (better caching)
COPY package*.json ./
RUN npm ci --only=production --no-audit --no-fund && \
    npm cache clean --force

# Development stage
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM development AS builder
RUN npm run build && \
    npm prune --production

# Production stage - optimized for size and security
FROM node:18-alpine AS production

# Install security updates and minimal tools
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

WORKDIR /app

# Copy only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=base --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package*.json ./

# Switch to non-root user
USER nextjs

# Optimize Node.js for production
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=1024"

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

**Performance-Optimized Docker Compose:**

```yaml
# docker-compose.performance.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    image: myapp:latest
    container_name: myapp
    restart: unless-stopped
    
    # Resource limits and reservations
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
    
    # Security and performance settings
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=100m
      - /var/run:noexec,nosuid,size=50m
    
    # Optimized logging
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    
    # Environment optimization
    environment:
      - NODE_ENV=production
      - NODE_OPTIONS=--max-old-space-size=1024
      - UV_THREADPOOL_SIZE=4
    
    # Network optimization
    networks:
      - app-network
    
    # Volume optimization
    volumes:
      - app-data:/app/data:rw
      - app-logs:/app/logs:rw
    
    ports:
      - "3000:3000"
    
    depends_on:
      redis:
        condition: service_healthy
      postgres:
        condition: service_healthy

  # Optimized Redis configuration
  redis:
    image: redis:7-alpine
    container_name: redis
    restart: unless-stopped
    
    # Redis performance tuning
    command: >
      redis-server
      --maxmemory 256mb
      --maxmemory-policy allkeys-lru
      --save 900 1
      --save 300 10
      --save 60 10000
      --tcp-keepalive 60
      --timeout 300
    
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    
    volumes:
      - redis-data:/data
    
    networks:
      - app-network
    
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 10s

  # Optimized PostgreSQL configuration
  postgres:
    image: postgres:15-alpine
    container_name: postgres
    restart: unless-stopped
    
    # PostgreSQL performance tuning
    command: >
      postgres
      -c shared_buffers=256MB
      -c effective_cache_size=1GB
      -c maintenance_work_mem=64MB
      -c checkpoint_completion_target=0.9
      -c wal_buffers=16MB
      -c default_statistics_target=100
      -c random_page_cost=1.1
      -c effective_io_concurrency=200
      -c work_mem=4MB
      -c min_wal_size=1GB
      -c max_wal_size=4GB
    
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 1G
    
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=myapp
      - POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password
      - PGDATA=/var/lib/postgresql/data/pgdata
    
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./postgres/init:/docker-entrypoint-initdb.d:ro
    
    networks:
      - app-network
    
    secrets:
      - postgres_password
    
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  # Nginx reverse proxy with optimization
  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: unless-stopped
    
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M
        reservations:
          cpus: '0.25'
          memory: 128M
    
    ports:
      - "80:80"
      - "443:443"
    
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - nginx-cache:/var/cache/nginx
      - nginx-logs:/var/log/nginx
    
    networks:
      - app-network
    
    depends_on:
      - app

networks:
  app-network:
    driver: bridge
    driver_opts:
      com.docker.network.bridge.name: br-myapp
    ipam:
      config:
        - subnet: 172.20.0.0/16

volumes:
  app-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ./data
  app-logs:
    driver: local
  redis-data:
    driver: local
  postgres-data:
    driver: local
  nginx-cache:
    driver: local
  nginx-logs:
    driver: local

secrets:
  postgres_password:
    file: ./secrets/postgres_password.txt
```

**Optimized Nginx Configuration:**

```nginx
# nginx/nginx.conf - Performance optimized
user nginx;
worker_processes auto;
worker_rlimit_nofile 65535;

error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Logging format
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';
    
    access_log /var/log/nginx/access.log main;
    
    # Performance optimizations
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    keepalive_requests 1000;
    types_hash_max_size 2048;
    server_tokens off;
    
    # Buffer sizes
    client_body_buffer_size 128k;
    client_max_body_size 10m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 4k;
    output_buffers 1 32k;
    postpone_output 1460;
    
    # Gzip compression
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
    
    # Caching
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=app_cache:10m max_size=1g inactive=60m use_temp_path=off;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
    
    # Upstream configuration
    upstream app_backend {
        least_conn;
        server app:3000 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }
    
    include /etc/nginx/conf.d/*.conf;
}
```

**Application Server Configuration:**

```nginx
# nginx/conf.d/app.conf
server {
    listen 80;
    server_name localhost;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Static file caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|txt)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # API endpoints with rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        
        proxy_pass http://app_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Caching
        proxy_cache app_cache;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_lock on;
        
        add_header X-Cache-Status $upstream_cache_status;
    }
    
    # Login endpoint with stricter rate limiting
    location /api/auth/login {
        limit_req zone=login burst=5 nodelay;
        
        proxy_pass http://app_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        proxy_pass http://app_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
    
    # Default location
    location / {
        proxy_pass http://app_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Performance Monitoring Script:**

```javascript
// healthcheck.js - Node.js health check for Docker
const http = require('http');
const os = require('os');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    console.error(`Health check failed with status: ${res.statusCode}`);
    process.exit(1);
  }
});

req.on('error', (err) => {
  console.error(`Health check error: ${err.message}`);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('Health check timeout');
  req.destroy();
  process.exit(1);
});

req.end();
```

**Docker Performance Best Practices:**

1. **Image Optimization:**
   - Use multi-stage builds
   - Minimize layers
   - Use .dockerignore
   - Choose appropriate base images

2. **Resource Management:**
   - Set memory and CPU limits
   - Use resource reservations
   - Monitor resource usage

3. **Caching Strategies:**
   - Optimize layer caching
   - Use BuildKit for advanced caching
   - Implement application-level caching

4. **Network Optimization:**
   - Use custom networks
   - Optimize service discovery
   - Implement load balancing

---

### Q11: How do you implement Docker Swarm for container orchestration?
**Difficulty: Advanced**

**Answer:**
Docker Swarm provides native clustering and orchestration capabilities for Docker containers, enabling high availability, load balancing, and service scaling across multiple nodes.

**Docker Swarm Cluster Setup:**

```bash
#!/bin/bash
# swarm-setup.sh - Docker Swarm cluster initialization

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to initialize Swarm manager
init_swarm_manager() {
    local advertise_addr=$1
    
    print_header "Initializing Docker Swarm Manager"
    
    if docker info | grep -q "Swarm: active"; then
        print_warning "Swarm is already active"
        return 0
    fi
    
    # Initialize swarm
    SWARM_INIT_OUTPUT=$(docker swarm init --advertise-addr "$advertise_addr" 2>&1)
    
    if [ $? -eq 0 ]; then
        print_success "Swarm manager initialized successfully"
        
        # Extract join tokens
        WORKER_TOKEN=$(docker swarm join-token worker -q)
        MANAGER_TOKEN=$(docker swarm join-token manager -q)
        
        echo "Worker join command:"
        echo "docker swarm join --token $WORKER_TOKEN $advertise_addr:2377"
        echo ""
        echo "Manager join command:"
        echo "docker swarm join --token $MANAGER_TOKEN $advertise_addr:2377"
        
        # Save tokens to files
        echo "$WORKER_TOKEN" > worker-token.txt
        echo "$MANAGER_TOKEN" > manager-token.txt
        
        print_success "Join tokens saved to worker-token.txt and manager-token.txt"
    else
        print_error "Failed to initialize swarm: $SWARM_INIT_OUTPUT"
        exit 1
    fi
}

# Function to join swarm as worker
join_swarm_worker() {
    local manager_addr=$1
    local token=$2
    
    print_header "Joining Swarm as Worker"
    
    if docker info | grep -q "Swarm: active"; then
        print_warning "Node is already part of a swarm"
        return 0
    fi
    
    if docker swarm join --token "$token" "$manager_addr:2377"; then
        print_success "Successfully joined swarm as worker"
    else
        print_error "Failed to join swarm as worker"
        exit 1
    fi
}

# Function to join swarm as manager
join_swarm_manager() {
    local manager_addr=$1
    local token=$2
    
    print_header "Joining Swarm as Manager"
    
    if docker info | grep -q "Swarm: active"; then
        print_warning "Node is already part of a swarm"
        return 0
    fi
    
    if docker swarm join --token "$token" "$manager_addr:2377"; then
        print_success "Successfully joined swarm as manager"
    else
        print_error "Failed to join swarm as manager"
        exit 1
    fi
}

# Function to deploy stack
deploy_stack() {
    local stack_name=$1
    local compose_file=$2
    
    print_header "Deploying Stack: $stack_name"
    
    if [ ! -f "$compose_file" ]; then
        print_error "Compose file not found: $compose_file"
        exit 1
    fi
    
    if docker stack deploy -c "$compose_file" "$stack_name"; then
        print_success "Stack deployed successfully"
        
        # Show stack services
        echo ""
        print_header "Stack Services"
        docker stack services "$stack_name"
        
        echo ""
        print_header "Stack Tasks"
        docker stack ps "$stack_name"
    else
        print_error "Failed to deploy stack"
        exit 1
    fi
}

# Function to scale service
scale_service() {
    local service_name=$1
    local replicas=$2
    
    print_header "Scaling Service: $service_name to $replicas replicas"
    
    if docker service scale "$service_name=$replicas"; then
        print_success "Service scaled successfully"
        
        # Show service status
        docker service ps "$service_name"
    else
        print_error "Failed to scale service"
        exit 1
    fi
}

# Function to show cluster status
show_cluster_status() {
    print_header "Docker Swarm Cluster Status"
    
    # Show nodes
    echo "Cluster Nodes:"
    docker node ls
    
    echo ""
    echo "Services:"
    docker service ls
    
    echo ""
    echo "Stacks:"
    docker stack ls
    
    echo ""
    echo "Networks:"
    docker network ls --filter driver=overlay
}

# Function to perform health checks
health_check() {
    print_header "Swarm Health Check"
    
    # Check node status
    UNHEALTHY_NODES=$(docker node ls --filter "role=manager" --format "{{.Status}}" | grep -v "Ready" | wc -l)
    
    if [ "$UNHEALTHY_NODES" -eq 0 ]; then
        print_success "All manager nodes are healthy"
    else
        print_error "$UNHEALTHY_NODES manager nodes are unhealthy"
    fi
    
    # Check service health
    FAILED_SERVICES=$(docker service ls --format "{{.Name}} {{.Replicas}}" | grep "0/" | wc -l)
    
    if [ "$FAILED_SERVICES" -eq 0 ]; then
        print_success "All services are running"
    else
        print_error "$FAILED_SERVICES services have failed replicas"
        echo "Failed services:"
        docker service ls --format "{{.Name}} {{.Replicas}}" | grep "0/"
    fi
}

# Main script logic
case "${1:-help}" in
    "init")
        if [ $# -lt 2 ]; then
            echo "Usage: $0 init <advertise-addr>"
            exit 1
        fi
        init_swarm_manager "$2"
        ;;
    "join-worker")
        if [ $# -lt 3 ]; then
            echo "Usage: $0 join-worker <manager-addr> <token>"
            exit 1
        fi
        join_swarm_worker "$2" "$3"
        ;;
    "join-manager")
        if [ $# -lt 3 ]; then
            echo "Usage: $0 join-manager <manager-addr> <token>"
            exit 1
        fi
        join_swarm_manager "$2" "$3"
        ;;
    "deploy")
        if [ $# -lt 3 ]; then
            echo "Usage: $0 deploy <stack-name> <compose-file>"
            exit 1
        fi
        deploy_stack "$2" "$3"
        ;;
    "scale")
        if [ $# -lt 3 ]; then
            echo "Usage: $0 scale <service-name> <replicas>"
            exit 1
        fi
        scale_service "$2" "$3"
        ;;
    "status")
        show_cluster_status
        ;;
    "health")
        health_check
        ;;
    "help")
        echo "Docker Swarm Management Script"
        echo "Usage: $0 <command> [options]"
        echo ""
        echo "Commands:"
        echo "  init <advertise-addr>           - Initialize swarm manager"
        echo "  join-worker <manager> <token>   - Join as worker node"
        echo "  join-manager <manager> <token>  - Join as manager node"
        echo "  deploy <stack> <compose-file>   - Deploy application stack"
        echo "  scale <service> <replicas>      - Scale service replicas"
        echo "  status                          - Show cluster status"
        echo "  health                          - Perform health checks"
        echo "  help                            - Show this help"
        ;;
    *)
        echo "Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac
```

**Docker Swarm Stack Configuration:**

```yaml
# docker-stack.yml - Production-ready swarm stack
version: '3.8'

services:
  # Web application
  app:
    image: myapp:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
        order: start-first
      rollback_config:
        parallelism: 1
        delay: 5s
        failure_action: pause
        order: stop-first
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
      placement:
        constraints:
          - node.role == worker
        preferences:
          - spread: node.labels.zone
    environment:
      - NODE_ENV=production
      - DATABASE_URL_FILE=/run/secrets/database_url
      - REDIS_URL=redis://redis:6379
    secrets:
      - database_url
      - app_secret_key
    networks:
      - app-network
      - database-network
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Load balancer
  nginx:
    image: nginx:alpine
    deploy:
      replicas: 2
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
      resources:
        limits:
          cpus: '0.5'
          memory: 256M
        reservations:
          cpus: '0.25'
          memory: 128M
      placement:
        constraints:
          - node.role == worker
    configs:
      - source: nginx_config
        target: /etc/nginx/nginx.conf
      - source: nginx_app_config
        target: /etc/nginx/conf.d/app.conf
    networks:
      - app-network
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - app

  # Redis cache
  redis:
    image: redis:7-alpine
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
      placement:
        constraints:
          - node.labels.redis == true
    command: >
      redis-server
      --maxmemory 256mb
      --maxmemory-policy allkeys-lru
      --appendonly yes
      --appendfsync everysec
    volumes:
      - redis-data:/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # Database
  postgres:
    image: postgres:15-alpine
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
      resources:
        limits:
          cpus: '2.0'
          memory: 4G
        reservations:
          cpus: '1.0'
          memory: 2G
      placement:
        constraints:
          - node.labels.database == true
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=myapp
      - POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password
      - PGDATA=/var/lib/postgresql/data/pgdata
    secrets:
      - postgres_password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - database-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
      placement:
        constraints:
          - node.role == manager
    configs:
      - source: prometheus_config
        target: /etc/prometheus/prometheus.yml
    volumes:
      - prometheus-data:/prometheus
    networks:
      - monitoring-network
      - app-network
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  # Grafana
  grafana:
    image: grafana/grafana:latest
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
      placement:
        constraints:
          - node.role == manager
    environment:
      - GF_SECURITY_ADMIN_PASSWORD_FILE=/run/secrets/grafana_password
      - GF_USERS_ALLOW_SIGN_UP=false
    secrets:
      - grafana_password
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - monitoring-network
    ports:
      - "3001:3000"
    depends_on:
      - prometheus

  # Log aggregation
  fluentd:
    image: fluent/fluentd:v1.16-debian-1
    deploy:
      mode: global
      restart_policy:
        condition: on-failure
    configs:
      - source: fluentd_config
        target: /fluentd/etc/fluent.conf
    volumes:
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    networks:
      - monitoring-network
    ports:
      - "24224:24224"
      - "24224:24224/udp"

networks:
  app-network:
    driver: overlay
    attachable: true
    ipam:
      config:
        - subnet: 10.0.1.0/24
  
  database-network:
    driver: overlay
    internal: true
    ipam:
      config:
        - subnet: 10.0.2.0/24
  
  monitoring-network:
    driver: overlay
    ipam:
      config:
        - subnet: 10.0.3.0/24

volumes:
  redis-data:
    driver: local
  postgres-data:
    driver: local
  prometheus-data:
    driver: local
  grafana-data:
    driver: local

secrets:
  database_url:
    external: true
  app_secret_key:
    external: true
  postgres_password:
    external: true
  grafana_password:
    external: true

configs:
  nginx_config:
    external: true
  nginx_app_config:
    external: true
  prometheus_config:
    external: true
  fluentd_config:
    external: true
```

**Swarm Management Scripts:**

```bash
#!/bin/bash
# swarm-deploy.sh - Complete swarm deployment script

set -euo pipefail

STACK_NAME="myapp"
COMPOSE_FILE="docker-stack.yml"

# Create secrets
echo "Creating secrets..."
docker secret create database_url - <<< "postgresql://user:pass@postgres:5432/myapp"
docker secret create app_secret_key - <<< "$(openssl rand -base64 32)"
docker secret create postgres_password - <<< "$(openssl rand -base64 32)"
docker secret create grafana_password - <<< "admin123"

# Create configs
echo "Creating configs..."
docker config create nginx_config nginx/nginx.conf
docker config create nginx_app_config nginx/conf.d/app.conf
docker config create prometheus_config monitoring/prometheus.yml
docker config create fluentd_config logging/fluent.conf

# Label nodes for placement
echo "Labeling nodes..."
docker node update --label-add redis=true $(docker node ls -q | head -1)
docker node update --label-add database=true $(docker node ls -q | head -1)
docker node update --label-add zone=us-east-1a $(docker node ls -q | head -1)

# Deploy stack
echo "Deploying stack..."
docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME"

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 30

# Check deployment status
echo "Deployment status:"
docker stack services "$STACK_NAME"

echo "Stack deployed successfully!"
echo "Access the application at: http://localhost"
echo "Access Grafana at: http://localhost:3001"
echo "Access Prometheus at: http://localhost:9090"
```

---

### Q12: How do you integrate Docker with Kubernetes?
**Difficulty: Advanced**

**Answer:**
Integrating Docker with Kubernetes involves containerizing applications with Docker and orchestrating them using Kubernetes for advanced deployment, scaling, and management capabilities.

**Kubernetes Deployment Configuration:**

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myapp
  labels:
    name: myapp
    environment: production

---
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: myapp
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  REDIS_HOST: "redis-service"
  REDIS_PORT: "6379"
  DATABASE_HOST: "postgres-service"
  DATABASE_PORT: "5432"
  DATABASE_NAME: "myapp"

---
# k8s/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: myapp
type: Opaque
data:
  database-password: cG9zdGdyZXNfcGFzc3dvcmQ=  # base64 encoded
  app-secret-key: YXBwX3NlY3JldF9rZXk=        # base64 encoded
  redis-password: cmVkaXNfcGFzc3dvcmQ=          # base64 encoded

---
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
  namespace: myapp
  labels:
    app: myapp
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
        version: v1.0.0
    spec:
      containers:
      - name: app
        image: myapp:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: NODE_ENV
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-password
        - name: APP_SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: app-secret-key
        envFrom:
        - configMapRef:
            name: app-config
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        volumeMounts:
        - name: app-logs
          mountPath: /app/logs
        - name: tmp-volume
          mountPath: /tmp
      volumes:
      - name: app-logs
        emptyDir: {}
      - name: tmp-volume
        emptyDir: {}
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 1001
      restartPolicy: Always

---
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: app-service
  namespace: myapp
  labels:
    app: myapp
spec:
  selector:
    app: myapp
  ports:
  - name: http
    port: 80
    targetPort: 3000
    protocol: TCP
  type: ClusterIP

---
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: myapp
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: app-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app-service
            port:
              number: 80

---
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
  namespace: myapp
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-deployment
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
      - type: Pods
        value: 2
        periodSeconds: 60
```

**Redis Deployment:**

```yaml
# k8s/redis.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis
  namespace: myapp
spec:
  serviceName: redis-service
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
          name: redis
        command:
        - redis-server
        - --maxmemory
        - 256mb
        - --maxmemory-policy
        - allkeys-lru
        - --appendonly
        - "yes"
        - --requirepass
        - $(REDIS_PASSWORD)
        env:
        - name: REDIS_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: redis-password
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          exec:
            command:
            - redis-cli
            - ping
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - redis-cli
            - ping
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: redis-data
          mountPath: /data
  volumeClaimTemplates:
  - metadata:
      name: redis-data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi

---
apiVersion: v1
kind: Service
metadata:
  name: redis-service
  namespace: myapp
spec:
  selector:
    app: redis
  ports:
  - port: 6379
    targetPort: 6379
  type: ClusterIP
```

**PostgreSQL Deployment:**

```yaml
# k8s/postgres.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: myapp
spec:
  serviceName: postgres-service
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
          name: postgres
        env:
        - name: POSTGRES_DB
          value: myapp
        - name: POSTGRES_USER
          value: myapp
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-password
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          exec:
            command:
            - pg_isready
            - -U
            - myapp
            - -d
            - myapp
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - pg_isready
            - -U
            - myapp
            - -d
            - myapp
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 50Gi

---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  namespace: myapp
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
  type: ClusterIP
```

**Kubernetes Deployment Script:**

```bash
#!/bin/bash
# k8s-deploy.sh - Kubernetes deployment script

set -euo pipefail

NAMESPACE="myapp"
KUBECTL="kubectl"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to check if kubectl is available
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed or not in PATH"
        exit 1
    fi
    
    if ! kubectl cluster-info &> /dev/null; then
        print_error "Cannot connect to Kubernetes cluster"
        exit 1
    fi
    
    print_success "kubectl is available and connected to cluster"
}

# Function to create namespace
create_namespace() {
    print_header "Creating namespace: $NAMESPACE"
    
    if kubectl get namespace "$NAMESPACE" &> /dev/null; then
        print_warning "Namespace $NAMESPACE already exists"
    else
        kubectl apply -f k8s/namespace.yaml
        print_success "Namespace created"
    fi
}

# Function to create secrets
create_secrets() {
    print_header "Creating secrets"
    
    # Generate random passwords if they don't exist
    if ! kubectl get secret app-secrets -n "$NAMESPACE" &> /dev/null; then
        DB_PASSWORD=$(openssl rand -base64 32)
        APP_SECRET=$(openssl rand -base64 32)
        REDIS_PASSWORD=$(openssl rand -base64 32)
        
        kubectl create secret generic app-secrets \
            --from-literal=database-password="$DB_PASSWORD" \
            --from-literal=app-secret-key="$APP_SECRET" \
            --from-literal=redis-password="$REDIS_PASSWORD" \
            -n "$NAMESPACE"
        
        print_success "Secrets created"
    else
        print_warning "Secrets already exist"
    fi
}

# Function to deploy application
deploy_application() {
    print_header "Deploying application components"
    
    # Apply configurations in order
    kubectl apply -f k8s/configmap.yaml
    kubectl apply -f k8s/postgres.yaml
    kubectl apply -f k8s/redis.yaml
    
    # Wait for databases to be ready
    print_header "Waiting for databases to be ready"
    kubectl wait --for=condition=ready pod -l app=postgres -n "$NAMESPACE" --timeout=300s
    kubectl wait --for=condition=ready pod -l app=redis -n "$NAMESPACE" --timeout=300s
    
    # Deploy application
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    kubectl apply -f k8s/ingress.yaml
    kubectl apply -f k8s/hpa.yaml
    
    print_success "Application deployed"
}

# Function to check deployment status
check_deployment() {
    print_header "Checking deployment status"
    
    # Wait for deployment to be ready
    kubectl wait --for=condition=available deployment/app-deployment -n "$NAMESPACE" --timeout=300s
    
    # Show status
    echo "Pods:"
    kubectl get pods -n "$NAMESPACE"
    
    echo ""
    echo "Services:"
    kubectl get services -n "$NAMESPACE"
    
    echo ""
    echo "Ingress:"
    kubectl get ingress -n "$NAMESPACE"
    
    echo ""
    echo "HPA:"
    kubectl get hpa -n "$NAMESPACE"
}

# Function to show logs
show_logs() {
    local component=${1:-app}
    print_header "Showing logs for: $component"
    
    kubectl logs -l app="$component" -n "$NAMESPACE" --tail=50
}

# Function to scale deployment
scale_deployment() {
    local replicas=$1
    print_header "Scaling deployment to $replicas replicas"
    
    kubectl scale deployment app-deployment --replicas="$replicas" -n "$NAMESPACE"
    kubectl wait --for=condition=available deployment/app-deployment -n "$NAMESPACE" --timeout=300s
    
    print_success "Deployment scaled to $replicas replicas"
}

# Function to cleanup
cleanup() {
    print_header "Cleaning up resources"
    
    kubectl delete namespace "$NAMESPACE" --ignore-not-found=true
    
    print_success "Cleanup completed"
}

# Main script logic
case "${1:-help}" in
    "deploy")
        check_kubectl
        create_namespace
        create_secrets
        deploy_application
        check_deployment
        print_success "Deployment completed successfully!"
        ;;
    "status")
        check_deployment
        ;;
    "logs")
        show_logs "${2:-app}"
        ;;
    "scale")
        if [ $# -lt 2 ]; then
            echo "Usage: $0 scale <replicas>"
            exit 1
        fi
        scale_deployment "$2"
        ;;
    "cleanup")
        cleanup
        ;;
    "help")
        echo "Kubernetes Deployment Script"
        echo "Usage: $0 <command> [options]"
        echo ""
        echo "Commands:"
        echo "  deploy              - Deploy the complete application"
        echo "  status              - Check deployment status"
        echo "  logs [component]    - Show logs (default: app)"
        echo "  scale <replicas>    - Scale the application"
        echo "  cleanup             - Remove all resources"
        echo "  help                - Show this help"
        ;;
    *)
        echo "Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac
```

**Docker-Kubernetes Integration Best Practices:**

1. **Image Management:**
   - Use semantic versioning for images
   - Implement image scanning in CI/CD
   - Use multi-stage builds for optimization
   - Store images in secure registries

2. **Configuration Management:**
   - Use ConfigMaps for non-sensitive data
   - Use Secrets for sensitive information
   - Implement proper RBAC
   - Use namespaces for isolation

3. **Monitoring and Logging:**
   - Implement centralized logging
   - Use Prometheus for metrics
   - Set up proper health checks
   - Monitor resource usage

4. **Security:**
   - Run containers as non-root
   - Use security contexts
   - Implement network policies
   - Regular security scanning

---

### Q13: How do you implement Docker multi-platform builds and deployment?
**Difficulty: Advanced**

**Answer:**
Docker multi-platform builds enable creating container images that work across different architectures (AMD64, ARM64, etc.), essential for modern cloud-native applications and edge computing.

**Multi-Platform Dockerfile:**

```dockerfile
# Dockerfile.multiplatform - Multi-architecture optimized Dockerfile
FROM --platform=$BUILDPLATFORM node:18-alpine AS base

# Install dependencies for cross-compilation
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && ln -sf python3 /usr/bin/python

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with platform-specific optimizations
ARG TARGETPLATFORM
RUN if [ "$TARGETPLATFORM" = "linux/arm64" ]; then \
        npm config set target_arch arm64 && \
        npm config set target_platform linux && \
        npm config set cache /tmp/.npm; \
    fi && \
    npm ci --only=production && \
    npm cache clean --force

# Development stage
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
COPY . .
RUN npm ci && \
    npm run build && \
    npm prune --production

# Production stage with platform-specific optimizations
FROM --platform=$TARGETPLATFORM node:18-alpine AS production

# Install security updates
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist
COPY --from=build --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json

# Platform-specific optimizations
ARG TARGETPLATFORM
RUN if [ "$TARGETPLATFORM" = "linux/arm64" ]; then \
        echo "Optimizing for ARM64" && \
        # ARM64 specific optimizations
        echo 'export NODE_OPTIONS="--max-old-space-size=512"' >> /home/nextjs/.profile; \
    elif [ "$TARGETPLATFORM" = "linux/amd64" ]; then \
        echo "Optimizing for AMD64" && \
        # AMD64 specific optimizations
        echo 'export NODE_OPTIONS="--max-old-space-size=1024"' >> /home/nextjs/.profile; \
    fi

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Expose port
EXPOSE 3000

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

**Multi-Platform Build Script:**

```bash
#!/bin/bash
# multi-platform-build.sh - Advanced multi-platform Docker build script

set -euo pipefail

# Configuration
IMAGE_NAME="myapp"
REGISTRY="docker.io/myorg"
DOCKERFILE="Dockerfile.multiplatform"
PLATFORMS="linux/amd64,linux/arm64,linux/arm/v7"
BUILD_ARGS=""
TAGS=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Docker version
    if ! docker version &> /dev/null; then
        print_error "Docker is not running or not installed"
        exit 1
    fi
    
    # Check buildx
    if ! docker buildx version &> /dev/null; then
        print_error "Docker Buildx is not available"
        exit 1
    fi
    
    # Check if buildx instance exists
    if ! docker buildx ls | grep -q "multiplatform"; then
        print_warning "Creating new buildx instance"
        docker buildx create --name multiplatform --use
        docker buildx inspect --bootstrap
    else
        docker buildx use multiplatform
    fi
    
    print_success "Prerequisites checked"
}

# Function to generate tags
generate_tags() {
    local version=${1:-latest}
    local git_commit=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    local timestamp=$(date +%Y%m%d-%H%M%S)
    
    TAGS=""
    TAGS="$TAGS -t $REGISTRY/$IMAGE_NAME:$version"
    TAGS="$TAGS -t $REGISTRY/$IMAGE_NAME:$git_commit"
    TAGS="$TAGS -t $REGISTRY/$IMAGE_NAME:$timestamp"
    
    if [ "$version" != "latest" ]; then
        TAGS="$TAGS -t $REGISTRY/$IMAGE_NAME:latest"
    fi
    
    print_success "Generated tags: $TAGS"
}

# Function to build and push multi-platform image
build_multiplatform() {
    local push_flag=${1:-false}
    
    print_header "Building Multi-Platform Image"
    
    # Prepare build arguments
    local build_cmd="docker buildx build"
    build_cmd="$build_cmd --platform $PLATFORMS"
    build_cmd="$build_cmd --file $DOCKERFILE"
    build_cmd="$build_cmd $TAGS"
    
    # Add build arguments if provided
    if [ -n "$BUILD_ARGS" ]; then
        build_cmd="$build_cmd $BUILD_ARGS"
    fi
    
    # Add push flag if requested
    if [ "$push_flag" = "true" ]; then
        build_cmd="$build_cmd --push"
    else
        build_cmd="$build_cmd --load"
    fi
    
    # Add context
    build_cmd="$build_cmd ."
    
    echo "Executing: $build_cmd"
    eval $build_cmd
    
    if [ $? -eq 0 ]; then
        print_success "Multi-platform build completed"
    else
        print_error "Multi-platform build failed"
        exit 1
    fi
}

# Function to test images on different platforms
test_images() {
    print_header "Testing Images on Different Platforms"
    
    local test_platforms=("linux/amd64" "linux/arm64")
    
    for platform in "${test_platforms[@]}"; do
        print_header "Testing on $platform"
        
        # Run platform-specific container
        local container_name="test-${platform//\//-}"
        
        if docker run --rm --platform="$platform" \
            --name "$container_name" \
            -d "$REGISTRY/$IMAGE_NAME:latest" > /dev/null 2>&1; then
            
            # Wait for container to start
            sleep 5
            
            # Check if container is running
            if docker ps | grep -q "$container_name"; then
                print_success "Container running successfully on $platform"
                
                # Stop container
                docker stop "$container_name" > /dev/null 2>&1
            else
                print_error "Container failed to start on $platform"
            fi
        else
            print_error "Failed to run container on $platform"
        fi
    done
}

# Function to inspect multi-platform manifest
inspect_manifest() {
    print_header "Inspecting Multi-Platform Manifest"
    
    docker buildx imagetools inspect "$REGISTRY/$IMAGE_NAME:latest"
}

# Function to create and push manifest
create_manifest() {
    print_header "Creating Multi-Platform Manifest"
    
    # Enable experimental features
    export DOCKER_CLI_EXPERIMENTAL=enabled
    
    local manifest_name="$REGISTRY/$IMAGE_NAME:latest"
    
    # Create manifest list
    docker manifest create "$manifest_name" \
        "$REGISTRY/$IMAGE_NAME:latest-amd64" \
        "$REGISTRY/$IMAGE_NAME:latest-arm64" \
        "$REGISTRY/$IMAGE_NAME:latest-armv7"
    
    # Annotate architectures
    docker manifest annotate "$manifest_name" \
        "$REGISTRY/$IMAGE_NAME:latest-amd64" --arch amd64
    
    docker manifest annotate "$manifest_name" \
        "$REGISTRY/$IMAGE_NAME:latest-arm64" --arch arm64
    
    docker manifest annotate "$manifest_name" \
        "$REGISTRY/$IMAGE_NAME:latest-armv7" --arch arm --variant v7
    
    # Push manifest
    docker manifest push "$manifest_name"
    
    print_success "Multi-platform manifest created and pushed"
}

# Function to cleanup
cleanup() {
    print_header "Cleaning Up"
    
    # Remove buildx instance
    docker buildx rm multiplatform || true
    
    # Clean up build cache
    docker buildx prune -f
    
    print_success "Cleanup completed"
}

# Function to show usage
show_usage() {
    echo "Multi-Platform Docker Build Script"
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  build [version]     - Build multi-platform image (default: latest)"
    echo "  push [version]      - Build and push multi-platform image"
    echo "  test               - Test images on different platforms"
    echo "  inspect            - Inspect multi-platform manifest"
    echo "  manifest           - Create and push manifest manually"
    echo "  cleanup            - Clean up build resources"
    echo "  help               - Show this help"
    echo ""
    echo "Environment Variables:"
    echo "  IMAGE_NAME         - Image name (default: myapp)"
    echo "  REGISTRY           - Registry URL (default: docker.io/myorg)"
    echo "  PLATFORMS          - Target platforms (default: linux/amd64,linux/arm64,linux/arm/v7)"
    echo "  DOCKERFILE         - Dockerfile path (default: Dockerfile.multiplatform)"
    echo "  BUILD_ARGS         - Additional build arguments"
}

# Main script logic
case "${1:-help}" in
    "build")
        check_prerequisites
        generate_tags "${2:-latest}"
        build_multiplatform false
        print_success "Build completed successfully!"
        ;;
    "push")
        check_prerequisites
        generate_tags "${2:-latest}"
        build_multiplatform true
        print_success "Build and push completed successfully!"
        ;;
    "test")
        test_images
        ;;
    "inspect")
        inspect_manifest
        ;;
    "manifest")
        create_manifest
        ;;
    "cleanup")
        cleanup
        ;;
    "help")
        show_usage
        ;;
    *)
        echo "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac
```

**GitHub Actions Multi-Platform CI/CD:**

```yaml
# .github/workflows/multi-platform-build.yml
name: Multi-Platform Docker Build

on:
  push:
    branches: [ main, develop ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      security-events: write
    
    strategy:
      matrix:
        platform:
          - linux/amd64
          - linux/arm64
          - linux/arm/v7
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=semver,pattern={{version}}
          type=semver,pattern={{major}}.{{minor}}
          type=sha,prefix={{branch}}-
    
    - name: Build and push by digest
      id: build
      uses: docker/build-push-action@v5
      with:
        context: .
        file: ./Dockerfile.multiplatform
        platforms: ${{ matrix.platform }}
        labels: ${{ steps.meta.outputs.labels }}
        outputs: type=image,name=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }},push-by-digest=true,name-canonical=true,push=true
        cache-from: type=gha
        cache-to: type=gha,mode=max
        build-args: |
          BUILDTIME=${{ fromJSON(steps.meta.outputs.json).labels['org.opencontainers.image.created'] }}
          VERSION=${{ fromJSON(steps.meta.outputs.json).labels['org.opencontainers.image.version'] }}
          REVISION=${{ fromJSON(steps.meta.outputs.json).labels['org.opencontainers.image.revision'] }}
    
    - name: Export digest
      run: |
        mkdir -p /tmp/digests
        digest="${{ steps.build.outputs.digest }}"
        touch "/tmp/digests/${digest#sha256:}"
    
    - name: Upload digest
      uses: actions/upload-artifact@v3
      with:
        name: digests
        path: /tmp/digests/*
        if-no-files-found: error
        retention-days: 1
  
  merge:
    runs-on: ubuntu-latest
    needs:
      - build
    steps:
    - name: Download digests
      uses: actions/download-artifact@v3
      with:
        name: digests
        path: /tmp/digests
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Docker meta
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=semver,pattern={{version}}
          type=semver,pattern={{major}}.{{minor}}
          type=sha,prefix={{branch}}-
    
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Create manifest list and push
      working-directory: /tmp/digests
      run: |
        docker buildx imagetools create $(jq -cr '.tags | map("-t " + .) | join(" ")' <<< "$DOCKER_METADATA_OUTPUT_JSON") \
          $(printf '${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}@sha256:%s ' *)
    
    - name: Inspect image
      run: |
        docker buildx imagetools inspect ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.meta.outputs.version }}
  
  security-scan:
    runs-on: ubuntu-latest
    needs: merge
    if: github.event_name != 'pull_request'
    steps:
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: '${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ needs.merge.outputs.version }}'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results to GitHub Security tab
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
```

**Docker Compose Multi-Platform:**

```yaml
# docker-compose.multiplatform.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.multiplatform
      platforms:
        - linux/amd64
        - linux/arm64
      args:
        BUILDTIME: ${BUILDTIME:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}
        VERSION: ${VERSION:-latest}
    image: myapp:latest
    platform: ${DOCKER_DEFAULT_PLATFORM:-linux/amd64}
    environment:
      - NODE_ENV=production
      - PLATFORM=${DOCKER_DEFAULT_PLATFORM:-linux/amd64}
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    platform: ${DOCKER_DEFAULT_PLATFORM:-linux/amd64}
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app
    restart: unless-stopped

networks:
  default:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

---

### Q14: How do you implement Docker enterprise patterns and best practices?
**Difficulty: Expert**

**Answer:**
Docker enterprise patterns focus on scalability, security, governance, and operational excellence for production environments at scale.

**Enterprise Docker Architecture:**

```yaml
# enterprise-stack.yml - Enterprise-grade Docker stack
version: '3.8'

x-logging: &default-logging
  driver: "fluentd"
  options:
    fluentd-address: "fluentd:24224"
    tag: "docker.{{.Name}}"

x-deploy-policy: &default-deploy
  restart_policy:
    condition: on-failure
    delay: 5s
    max_attempts: 3
    window: 120s
  update_config:
    parallelism: 1
    delay: 10s
    failure_action: rollback
    order: start-first
  rollback_config:
    parallelism: 1
    delay: 5s
    failure_action: pause
    order: stop-first

x-security: &default-security
  read_only: true
  tmpfs:
    - /tmp:noexec,nosuid,size=100m
    - /var/run:noexec,nosuid,size=50m
  security_opt:
    - no-new-privileges:true
    - apparmor:docker-default
  cap_drop:
    - ALL
  cap_add:
    - NET_BIND_SERVICE

services:
  # Application tier
  app:
    image: ${REGISTRY}/myapp:${VERSION:-latest}
    <<: *default-security
    environment:
      - NODE_ENV=production
      - DATABASE_URL_FILE=/run/secrets/database_url
      - REDIS_URL_FILE=/run/secrets/redis_url
      - JWT_SECRET_FILE=/run/secrets/jwt_secret
      - ENCRYPTION_KEY_FILE=/run/secrets/encryption_key
    secrets:
      - database_url
      - redis_url
      - jwt_secret
      - encryption_key
    configs:
      - source: app_config
        target: /app/config/production.json
        mode: 0444
    networks:
      - app-tier
      - cache-tier
      - database-tier
    ports:
      - target: 3000
        published: 3000
        protocol: tcp
        mode: ingress
    volumes:
      - app-logs:/app/logs
      - app-uploads:/app/uploads
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging: *default-logging
    deploy:
      <<: *default-deploy
      replicas: 3
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G
      placement:
        constraints:
          - node.role == worker
          - node.labels.tier == application
        preferences:
          - spread: node.labels.zone
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.app.rule=Host(`app.example.com`)"
        - "traefik.http.routers.app.tls=true"
        - "traefik.http.routers.app.tls.certresolver=letsencrypt"
        - "traefik.http.services.app.loadbalancer.server.port=3000"
        - "traefik.http.services.app.loadbalancer.healthcheck.path=/health"

  # Load balancer
  traefik:
    image: traefik:v3.0
    command:
      - --api.dashboard=true
      - --api.insecure=false
      - --providers.docker=true
      - --providers.docker.swarmMode=true
      - --providers.docker.exposedbydefault=false
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencrypt.acme.tlschallenge=true
      - --certificatesresolvers.letsencrypt.acme.email=admin@example.com
      - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
      - --metrics.prometheus=true
      - --metrics.prometheus.addEntryPointsLabels=true
      - --metrics.prometheus.addServicesLabels=true
      - --accesslog=true
      - --log.level=INFO
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - traefik-certs:/letsencrypt
    networks:
      - app-tier
      - monitoring-tier
    logging: *default-logging
    deploy:
      <<: *default-deploy
      replicas: 2
      placement:
        constraints:
          - node.role == manager
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.dashboard.rule=Host(`traefik.example.com`)"
        - "traefik.http.routers.dashboard.tls=true"
        - "traefik.http.routers.dashboard.service=api@internal"
        - "traefik.http.routers.dashboard.middlewares=auth"
        - "traefik.http.middlewares.auth.basicauth.users=admin:$$2y$$10$$..."

  # Database tier
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=myapp
      - POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password
      - PGDATA=/var/lib/postgresql/data/pgdata
    secrets:
      - postgres_password
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - postgres-backups:/backups
    networks:
      - database-tier
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    logging: *default-logging
    deploy:
      <<: *default-deploy
      replicas: 1
      resources:
        limits:
          cpus: '4.0'
          memory: 8G
        reservations:
          cpus: '2.0'
          memory: 4G
      placement:
        constraints:
          - node.role == worker
          - node.labels.tier == database

  # Cache tier
  redis:
    image: redis:7-alpine
    command: >
      redis-server
      --requirepass $$(cat /run/secrets/redis_password)
      --maxmemory 1gb
      --maxmemory-policy allkeys-lru
      --appendonly yes
      --appendfsync everysec
      --save 900 1
      --save 300 10
      --save 60 10000
    secrets:
      - redis_password
    volumes:
      - redis-data:/data
    networks:
      - cache-tier
    healthcheck:
      test: ["CMD", "redis-cli", "--no-auth-warning", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3
    logging: *default-logging
    deploy:
      <<: *default-deploy
      replicas: 1
      resources:
        limits:
          cpus: '1.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 1G
      placement:
        constraints:
          - node.role == worker
          - node.labels.tier == cache

  # Monitoring stack
  prometheus:
    image: prom/prometheus:latest
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'
    configs:
      - source: prometheus_config
        target: /etc/prometheus/prometheus.yml
      - source: prometheus_rules
        target: /etc/prometheus/rules.yml
    volumes:
      - prometheus-data:/prometheus
    networks:
      - monitoring-tier
      - app-tier
    ports:
      - "9090:9090"
    logging: *default-logging
    deploy:
      <<: *default-deploy
      replicas: 1
      placement:
        constraints:
          - node.role == manager

  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD_FILE=/run/secrets/grafana_password
      - GF_USERS_ALLOW_SIGN_UP=false
      - GF_INSTALL_PLUGINS=grafana-piechart-panel,grafana-worldmap-panel
    secrets:
      - grafana_password
    configs:
      - source: grafana_datasources
        target: /etc/grafana/provisioning/datasources/datasources.yml
      - source: grafana_dashboards
        target: /etc/grafana/provisioning/dashboards/dashboards.yml
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - monitoring-tier
    ports:
      - "3001:3000"
    logging: *default-logging
    deploy:
      <<: *default-deploy
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      depends_on:
        - prometheus

  # Log aggregation
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
      - xpack.security.enabled=false
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    networks:
      - logging-tier
    deploy:
      <<: *default-deploy
      replicas: 1
      resources:
        limits:
          cpus: '2.0'
          memory: 4G
        reservations:
          cpus: '1.0'
          memory: 2G
      placement:
        constraints:
          - node.role == worker
          - node.labels.tier == logging

  fluentd:
    image: fluent/fluentd:v1.16-debian-1
    configs:
      - source: fluentd_config
        target: /fluentd/etc/fluent.conf
    volumes:
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    networks:
      - logging-tier
    ports:
      - "24224:24224"
      - "24224:24224/udp"
    deploy:
      mode: global
      restart_policy:
        condition: on-failure
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    networks:
      - logging-tier
    ports:
      - "5601:5601"
    deploy:
      <<: *default-deploy
      replicas: 1
      placement:
        constraints:
          - node.role == manager
    depends_on:
      - elasticsearch

# Network definitions
networks:
  app-tier:
    driver: overlay
    attachable: true
    ipam:
      config:
        - subnet: 10.0.1.0/24
  
  database-tier:
    driver: overlay
    internal: true
    ipam:
      config:
        - subnet: 10.0.2.0/24
  
  cache-tier:
    driver: overlay
    internal: true
    ipam:
      config:
        - subnet: 10.0.3.0/24
  
  monitoring-tier:
    driver: overlay
    ipam:
      config:
        - subnet: 10.0.4.0/24
  
  logging-tier:
    driver: overlay
    ipam:
      config:
        - subnet: 10.0.5.0/24

# Volume definitions
volumes:
  app-logs:
    driver: local
  app-uploads:
    driver: local
  postgres-data:
    driver: local
  postgres-backups:
    driver: local
  redis-data:
    driver: local
  prometheus-data:
    driver: local
  grafana-data:
    driver: local
  elasticsearch-data:
    driver: local
  traefik-certs:
    driver: local

# Secret definitions
secrets:
  database_url:
    external: true
  redis_url:
    external: true
  jwt_secret:
    external: true
  encryption_key:
    external: true
  postgres_password:
    external: true
  redis_password:
    external: true
  grafana_password:
    external: true

# Configuration definitions
configs:
  app_config:
    external: true
  prometheus_config:
    external: true
  prometheus_rules:
    external: true
  grafana_datasources:
    external: true
  grafana_dashboards:
    external: true
  fluentd_config:
    external: true
```

**Enterprise Deployment Script:**

```bash
#!/bin/bash
# enterprise-deploy.sh - Enterprise Docker deployment script

set -euo pipefail

# Configuration
STACK_NAME="enterprise-app"
COMPOSE_FILE="enterprise-stack.yml"
REGISTRY="registry.company.com"
VERSION="${VERSION:-latest}"
ENVIRONMENT="${ENVIRONMENT:-production}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Docker Swarm mode
    if ! docker info --format '{{.Swarm.LocalNodeState}}' | grep -q "active"; then
        print_error "Docker Swarm is not initialized"
        echo "Run: docker swarm init"
        exit 1
    fi
    
    # Check if compose file exists
    if [ ! -f "$COMPOSE_FILE" ]; then
        print_error "Compose file $COMPOSE_FILE not found"
        exit 1
    fi
    
    # Check registry access
    if ! docker login "$REGISTRY" --username "$REGISTRY_USER" --password "$REGISTRY_PASS" 2>/dev/null; then
        print_warning "Registry login failed, using cached credentials"
    fi
    
    print_success "Prerequisites checked"
}

# Function to create secrets
create_secrets() {
    print_header "Creating Secrets"
    
    local secrets=(
        "database_url:postgresql://user:pass@postgres:5432/myapp"
        "redis_url:redis://:password@redis:6379/0"
        "jwt_secret:$(openssl rand -base64 32)"
        "encryption_key:$(openssl rand -base64 32)"
        "postgres_password:$(openssl rand -base64 16)"
        "redis_password:$(openssl rand -base64 16)"
        "grafana_password:$(openssl rand -base64 16)"
    )
    
    for secret in "${secrets[@]}"; do
        local name="${secret%%:*}"
        local value="${secret#*:}"
        
        if docker secret ls --format "{{.Name}}" | grep -q "^${name}$"; then
            print_warning "Secret $name already exists, skipping"
        else
            echo "$value" | docker secret create "$name" -
            print_success "Created secret: $name"
        fi
    done
}

# Function to create configs
create_configs() {
    print_header "Creating Configs"
    
    # Application config
    cat > app-config.json << EOF
{
  "database": {
    "pool": {
      "min": 2,
      "max": 10
    },
    "ssl": true
  },
  "cache": {
    "ttl": 3600,
    "maxSize": "100mb"
  },
  "logging": {
    "level": "info",
    "format": "json"
  },
  "security": {
    "cors": {
      "origin": ["https://app.example.com"],
      "credentials": true
    },
    "rateLimit": {
      "windowMs": 900000,
      "max": 100
    }
  }
}
EOF
    
    if docker config ls --format "{{.Name}}" | grep -q "^app_config$"; then
        docker config rm app_config || true
    fi
    docker config create app_config app-config.json
    rm app-config.json
    
    # Prometheus config
    cat > prometheus.yml << EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'app'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/metrics'
    scrape_interval: 30s
  
  - job_name: 'traefik'
    static_configs:
      - targets: ['traefik:8080']
    metrics_path: '/metrics'
  
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
  
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
EOF
    
    if docker config ls --format "{{.Name}}" | grep -q "^prometheus_config$"; then
        docker config rm prometheus_config || true
    fi
    docker config create prometheus_config prometheus.yml
    rm prometheus.yml
    
    print_success "Configs created"
}

# Function to deploy stack
deploy_stack() {
    print_header "Deploying Stack"
    
    # Set environment variables
    export REGISTRY="$REGISTRY"
    export VERSION="$VERSION"
    
    # Deploy the stack
    docker stack deploy \
        --compose-file "$COMPOSE_FILE" \
        --with-registry-auth \
        "$STACK_NAME"
    
    print_success "Stack deployed: $STACK_NAME"
}

# Function to check deployment status
check_deployment() {
    print_header "Checking Deployment Status"
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        local running_services=$(docker stack services "$STACK_NAME" --format "{{.Replicas}}" | grep -c "/")
        local ready_services=$(docker stack services "$STACK_NAME" --format "{{.Replicas}}" | grep -c "^[0-9]*/[0-9]*$" | grep -v "0/")
        
        if [ "$running_services" -eq "$ready_services" ] && [ "$ready_services" -gt 0 ]; then
            print_success "All services are running"
            docker stack services "$STACK_NAME"
            return 0
        fi
        
        echo "Attempt $attempt/$max_attempts: $ready_services/$running_services services ready"
        sleep 10
        ((attempt++))
    done
    
    print_error "Deployment check timed out"
    docker stack services "$STACK_NAME"
    return 1
}

# Function to run health checks
run_health_checks() {
    print_header "Running Health Checks"
    
    local endpoints=(
        "http://localhost:3000/health:Application"
        "http://localhost:9090/-/healthy:Prometheus"
        "http://localhost:3001/api/health:Grafana"
        "http://localhost:5601/api/status:Kibana"
    )
    
    for endpoint in "${endpoints[@]}"; do
        local url="${endpoint%%:*}"
        local name="${endpoint#*:}"
        
        if curl -sf "$url" > /dev/null 2>&1; then
            print_success "$name health check passed"
        else
            print_error "$name health check failed"
        fi
    done
}

# Function to show logs
show_logs() {
    local service="${1:-}"
    
    if [ -n "$service" ]; then
        docker service logs "${STACK_NAME}_${service}" --tail 50 --follow
    else
        print_header "Available Services"
        docker stack services "$STACK_NAME" --format "table {{.Name}}\t{{.Replicas}}\t{{.Image}}"
    fi
}

# Function to scale services
scale_service() {
    local service="$1"
    local replicas="$2"
    
    print_header "Scaling Service: $service to $replicas replicas"
    
    docker service scale "${STACK_NAME}_${service}=${replicas}"
    
    print_success "Service scaled: $service"
}

# Function to update service
update_service() {
    local service="$1"
    local image="${2:-}"
    
    print_header "Updating Service: $service"
    
    if [ -n "$image" ]; then
        docker service update --image "$image" "${STACK_NAME}_${service}"
    else
        docker service update --force "${STACK_NAME}_${service}"
    fi
    
    print_success "Service updated: $service"
}

# Function to backup data
backup_data() {
    print_header "Backing Up Data"
    
    local backup_dir="./backups/$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$backup_dir"
    
    # Backup PostgreSQL
    docker exec "$(docker ps -q -f name=${STACK_NAME}_postgres)" \
        pg_dump -U myapp myapp > "$backup_dir/postgres.sql"
    
    # Backup Redis
    docker exec "$(docker ps -q -f name=${STACK_NAME}_redis)" \
        redis-cli --rdb - > "$backup_dir/redis.rdb"
    
    # Backup application uploads
    docker run --rm \
        -v "${STACK_NAME}_app-uploads:/data" \
        -v "$(pwd)/$backup_dir:/backup" \
        alpine tar czf /backup/uploads.tar.gz -C /data .
    
    print_success "Backup completed: $backup_dir"
}

# Function to cleanup
cleanup() {
    print_header "Cleaning Up"
    
    # Remove stack
    docker stack rm "$STACK_NAME"
    
    # Wait for stack removal
    while docker stack ls --format "{{.Name}}" | grep -q "^${STACK_NAME}$"; do
        echo "Waiting for stack removal..."
        sleep 5
    done
    
    # Remove secrets (optional)
    read -p "Remove secrets? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        local secrets=("database_url" "redis_url" "jwt_secret" "encryption_key" "postgres_password" "redis_password" "grafana_password")
        for secret in "${secrets[@]}"; do
            docker secret rm "$secret" 2>/dev/null || true
        done
    fi
    
    # Remove configs (optional)
    read -p "Remove configs? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        local configs=("app_config" "prometheus_config" "prometheus_rules" "grafana_datasources" "grafana_dashboards" "fluentd_config")
        for config in "${configs[@]}"; do
            docker config rm "$config" 2>/dev/null || true
        done
    fi
    
    print_success "Cleanup completed"
}

# Function to show usage
show_usage() {
    echo "Enterprise Docker Deployment Script"
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  deploy              - Deploy the enterprise stack"
    echo "  status              - Check deployment status"
    echo "  health              - Run health checks"
    echo "  logs [service]      - Show logs for service (or list services)"
    echo "  scale <service> <n> - Scale service to n replicas"
    echo "  update <service>    - Update service"
    echo "  backup              - Backup application data"
    echo "  cleanup             - Remove stack and optionally secrets/configs"
    echo "  help                - Show this help"
    echo ""
    echo "Environment Variables:"
    echo "  STACK_NAME          - Stack name (default: enterprise-app)"
    echo "  REGISTRY            - Registry URL (default: registry.company.com)"
    echo "  VERSION             - Image version (default: latest)"
    echo "  ENVIRONMENT         - Environment (default: production)"
    echo "  REGISTRY_USER       - Registry username"
    echo "  REGISTRY_PASS       - Registry password"
}

# Main script logic
case "${1:-help}" in
    "deploy")
        check_prerequisites
        create_secrets
        create_configs
        deploy_stack
        check_deployment
        run_health_checks
        print_success "Enterprise deployment completed successfully!"
        ;;
    "status")
        check_deployment
        ;;
    "health")
        run_health_checks
        ;;
    "logs")
        show_logs "${2:-}"
        ;;
    "scale")
        if [ $# -lt 3 ]; then
            echo "Usage: $0 scale <service> <replicas>"
            exit 1
        fi
        scale_service "$2" "$3"
        ;;
    "update")
        if [ $# -lt 2 ]; then
            echo "Usage: $0 update <service> [image]"
            exit 1
        fi
        update_service "$2" "${3:-}"
        ;;
    "backup")
        backup_data
        ;;
    "cleanup")
        cleanup
        ;;
    "help")
        show_usage
        ;;
    *)
        echo "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac
```

**Enterprise Best Practices:**

1. **Security:**
   - Use secrets for sensitive data
   - Implement least privilege access
   - Regular security scanning
   - Network segmentation
   - Read-only containers

2. **Scalability:**
   - Horizontal scaling with replicas
   - Load balancing with Traefik
   - Resource limits and reservations
   - Auto-scaling policies

3. **Monitoring:**
   - Comprehensive metrics collection
   - Centralized logging
   - Health checks and alerting
   - Performance monitoring

4. **Deployment:**
   - Blue-green deployments
   - Rolling updates
   - Rollback capabilities
   - Environment-specific configs

5. **Data Management:**
   - Regular backups
   - Data persistence
   - Database clustering
   - Disaster recovery

---

### Q15: How do you implement Docker development workflows and debugging?
**Difficulty: Advanced**

**Answer:**
Docker development workflows focus on creating efficient, reproducible development environments with effective debugging capabilities.

**Development Docker Compose:**

```yaml
# docker-compose.dev.yml - Development environment
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
      target: development
    volumes:
      # Hot reload for source code
      - ./src:/app/src:cached
      - ./public:/app/public:cached
      - ./package.json:/app/package.json:ro
      - ./package-lock.json:/app/package-lock.json:ro
      # Node modules volume for performance
      - node_modules:/app/node_modules
      # Development tools
      - ./.env.development:/app/.env:ro
    environment:
      - NODE_ENV=development
      - DEBUG=app:*
      - CHOKIDAR_USEPOLLING=true
      - WATCHPACK_POLLING=true
    ports:
      - "3000:3000"
      - "9229:9229"  # Node.js debugger
      - "9230:9230"  # Additional debug port
    command: npm run dev:debug
    depends_on:
      - postgres
      - redis
    networks:
      - dev-network
    stdin_open: true
    tty: true

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp_dev
      - POSTGRES_USER=dev
      - POSTGRES_PASSWORD=devpass
      - POSTGRES_HOST_AUTH_METHOD=trust
    ports:
      - "5432:5432"
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - dev-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_dev_data:/data
    networks:
      - dev-network

  # Development tools
  mailhog:
    image: mailhog/mailhog:latest
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI
    networks:
      - dev-network

  adminer:
    image: adminer:latest
    ports:
      - "8080:8080"
    environment:
      - ADMINER_DEFAULT_SERVER=postgres
    depends_on:
      - postgres
    networks:
      - dev-network

  redis-commander:
    image: rediscommander/redis-commander:latest
    environment:
      - REDIS_HOSTS=local:redis:6379
    ports:
      - "8081:8081"
    depends_on:
      - redis
    networks:
      - dev-network

volumes:
  node_modules:
  postgres_dev_data:
  redis_dev_data:

networks:
  dev-network:
    driver: bridge
```

**Development Dockerfile:**

```dockerfile
# Dockerfile.dev - Multi-stage development Dockerfile
FROM node:18-alpine AS base

# Install development dependencies
RUN apk add --no-cache \
    git \
    openssh-client \
    bash \
    curl \
    vim \
    htop \
    procps

# Install global development tools
RUN npm install -g \
    nodemon \
    ts-node \
    typescript \
    @types/node \
    eslint \
    prettier

WORKDIR /app

# Copy package files
COPY package*.json ./

# Development stage
FROM base AS development

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Create non-root user for development
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose ports
EXPOSE 3000 9229 9230

# Development command with debugging
CMD ["npm", "run", "dev:debug"]

# Testing stage
FROM development AS testing

# Run tests
RUN npm run test:ci
RUN npm run lint
RUN npm run type-check

# Production build stage
FROM base AS build

# Install only production dependencies
RUN npm ci --only=production

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

RUN apk add --no-cache dumb-init

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Copy built application
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist
COPY --from=build --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

**Development Scripts:**

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "dev:debug": "nodemon --exec 'node --inspect=0.0.0.0:9229 -r ts-node/register src/server.ts'",
    "dev:docker": "docker-compose -f docker-compose.dev.yml up",
    "dev:build": "docker-compose -f docker-compose.dev.yml up --build",
    "dev:down": "docker-compose -f docker-compose.dev.yml down",
    "dev:logs": "docker-compose -f docker-compose.dev.yml logs -f",
    "dev:shell": "docker-compose -f docker-compose.dev.yml exec app sh",
    "dev:db": "docker-compose -f docker-compose.dev.yml exec postgres psql -U dev -d myapp_dev",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "test:docker": "docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "build": "tsc && npm run build:assets",
    "build:assets": "webpack --mode production",
    "start": "node dist/server.js",
    "debug:container": "docker run -it --rm myapp:dev sh",
    "debug:logs": "docker logs -f $(docker ps -q -f name=myapp)",
    "debug:inspect": "docker exec -it $(docker ps -q -f name=myapp) sh"
  }
}
```

**Development Debugging Script:**

```bash
#!/bin/bash
# dev-debug.sh - Development debugging utilities

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to start development environment
start_dev() {
    print_header "Starting Development Environment"
    
    # Check if containers are already running
    if docker-compose -f docker-compose.dev.yml ps | grep -q "Up"; then
        print_warning "Development environment is already running"
        return 0
    fi
    
    # Start services
    docker-compose -f docker-compose.dev.yml up -d
    
    # Wait for services to be ready
    print_header "Waiting for services to be ready..."
    
    # Wait for PostgreSQL
    until docker-compose -f docker-compose.dev.yml exec -T postgres pg_isready -U dev -d myapp_dev; do
        echo "Waiting for PostgreSQL..."
        sleep 2
    done
    
    # Wait for Redis
    until docker-compose -f docker-compose.dev.yml exec -T redis redis-cli ping; do
        echo "Waiting for Redis..."
        sleep 2
    done
    
    # Wait for application
    until curl -sf http://localhost:3000/health > /dev/null 2>&1; do
        echo "Waiting for application..."
        sleep 2
    done
    
    print_success "Development environment is ready!"
    
    echo ""
    echo "Available services:"
    echo "  Application: http://localhost:3000"
    echo "  Database Admin: http://localhost:8080"
    echo "  Redis Admin: http://localhost:8081"
    echo "  Mail Catcher: http://localhost:8025"
    echo "  Debugger: chrome://inspect (localhost:9229)"
}

# Function to show logs
show_logs() {
    local service="${1:-}"
    
    if [ -n "$service" ]; then
        docker-compose -f docker-compose.dev.yml logs -f "$service"
    else
        docker-compose -f docker-compose.dev.yml logs -f
    fi
}

# Function to execute commands in container
exec_command() {
    local service="${1:-app}"
    shift
    local command="${*:-sh}"
    
    docker-compose -f docker-compose.dev.yml exec "$service" $command
}

# Function to debug container
debug_container() {
    local service="${1:-app}"
    
    print_header "Debugging Container: $service"
    
    echo "Container information:"
    docker-compose -f docker-compose.dev.yml ps "$service"
    
    echo ""
    echo "Container logs (last 50 lines):"
    docker-compose -f docker-compose.dev.yml logs --tail 50 "$service"
    
    echo ""
    echo "Container processes:"
    docker-compose -f docker-compose.dev.yml exec "$service" ps aux
    
    echo ""
    echo "Container environment:"
    docker-compose -f docker-compose.dev.yml exec "$service" env | sort
    
    echo ""
    echo "Container network:"
    docker-compose -f docker-compose.dev.yml exec "$service" netstat -tuln
}

# Function to run tests
run_tests() {
    local test_type="${1:-unit}"
    
    case "$test_type" in
        "unit")
            print_header "Running Unit Tests"
            docker-compose -f docker-compose.dev.yml exec app npm run test
            ;;
        "integration")
            print_header "Running Integration Tests"
            docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
            docker-compose -f docker-compose.test.yml down
            ;;
        "e2e")
            print_header "Running E2E Tests"
            docker-compose -f docker-compose.dev.yml exec app npm run test:e2e
            ;;
        "all")
            run_tests unit
            run_tests integration
            run_tests e2e
            ;;
        *)
            print_error "Unknown test type: $test_type"
            echo "Available types: unit, integration, e2e, all"
            exit 1
            ;;
    esac
}

# Function to reset development environment
reset_dev() {
    print_header "Resetting Development Environment"
    
    # Stop and remove containers
    docker-compose -f docker-compose.dev.yml down -v
    
    # Remove images
    docker-compose -f docker-compose.dev.yml down --rmi all
    
    # Clean up volumes
    docker volume prune -f
    
    # Rebuild and start
    docker-compose -f docker-compose.dev.yml up --build -d
    
    print_success "Development environment reset complete"
}

# Function to profile application
profile_app() {
    print_header "Profiling Application"
    
    # CPU profiling
    echo "Starting CPU profiling..."
    docker-compose -f docker-compose.dev.yml exec app node --prof src/server.js &
    local pid=$!
    
    # Let it run for 30 seconds
    sleep 30
    
    # Stop profiling
    kill $pid
    
    # Generate profile report
    docker-compose -f docker-compose.dev.yml exec app node --prof-process isolate-*.log > profile.txt
    
    print_success "CPU profile saved to profile.txt"
    
    # Memory profiling
    echo "Generating heap snapshot..."
    docker-compose -f docker-compose.dev.yml exec app node -e "
        const v8 = require('v8');
        const fs = require('fs');
        const snapshot = v8.writeHeapSnapshot();
        console.log('Heap snapshot written to', snapshot);
    "
    
    print_success "Heap snapshot generated"
}

# Function to monitor resources
monitor_resources() {
    print_header "Monitoring Container Resources"
    
    # Show container stats
    docker stats $(docker-compose -f docker-compose.dev.yml ps -q)
}

# Function to show usage
show_usage() {
    echo "Development Debugging Script"
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  start               - Start development environment"
    echo "  logs [service]      - Show logs for service (or all services)"
    echo "  exec <service> <cmd>- Execute command in service container"
    echo "  debug [service]     - Debug container (default: app)"
    echo "  test [type]         - Run tests (unit|integration|e2e|all)"
    echo "  reset               - Reset development environment"
    echo "  profile             - Profile application performance"
    echo "  monitor             - Monitor container resources"
    echo "  help                - Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 logs app"
    echo "  $0 exec app npm run lint"
    echo "  $0 debug postgres"
    echo "  $0 test integration"
}

# Main script logic
case "${1:-help}" in
    "start")
        start_dev
        ;;
    "logs")
        show_logs "${2:-}"
        ;;
    "exec")
        if [ $# -lt 2 ]; then
            echo "Usage: $0 exec <service> [command]"
            exit 1
        fi
        exec_command "$2" "${@:3}"
        ;;
    "debug")
        debug_container "${2:-app}"
        ;;
    "test")
        run_tests "${2:-unit}"
        ;;
    "reset")
        reset_dev
        ;;
    "profile")
        profile_app
        ;;
    "monitor")
        monitor_resources
        ;;
    "help")
        show_usage
        ;;
    *)
        echo "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac
```

**VS Code Debug Configuration:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker: Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}/src",
      "remoteRoot": "/app/src",
      "protocol": "inspector",
      "restart": true,
      "sourceMaps": true,
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    },
    {
      "name": "Docker: Launch Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--no-cache"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "env": {
        "NODE_ENV": "test"
      }
    }
  ]
}
```

**Development Best Practices:**

1. **Hot Reloading:**
   - Use volume mounts for source code
   - Configure file watchers properly
   - Handle file system events efficiently

2. **Debugging:**
   - Enable Node.js inspector
   - Use proper source maps
   - Configure IDE debugging

3. **Testing:**
   - Separate test environments
   - Use test databases
   - Implement CI/CD testing

4. **Performance:**
   - Monitor resource usage
   - Profile application performance
   - Optimize container startup time

5. **Developer Experience:**
   - Provide development scripts
   - Document setup procedures
   - Automate common tasks

    try {
        const dbStatus = await checkDatabase();
        const redisStatus = await checkRedis();
        const memoryUsage = process.memoryUsage();
        
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: {
                used: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
                total: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB'
            },
            services: {
                database: dbStatus,
                redis: redisStatus
            }
        });
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            error: error.message
        });
    }
});
```

---

### Q16: How do you implement Docker container backup and disaster recovery?
**Difficulty: Advanced**

**Answer:**
Docker container backup and disaster recovery involves comprehensive strategies for data protection, system recovery, and business continuity.

**Comprehensive Backup Script:**

```bash
#!/bin/bash
# docker-backup.sh - Comprehensive Docker backup solution

set -euo pipefail

# Configuration
BACKUP_DIR="${BACKUP_DIR:-/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
S3_BUCKET="${S3_BUCKET:-my-docker-backups}"
ENCRYPTION_KEY="${ENCRYPTION_KEY:-}"
NOTIFICATION_WEBHOOK="${NOTIFICATION_WEBHOOK:-}"
COMPRESSION_LEVEL="${COMPRESSION_LEVEL:-6}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to send notifications
send_notification() {
    local status="$1"
    local message="$2"
    
    if [ -n "$NOTIFICATION_WEBHOOK" ]; then
        curl -X POST "$NOTIFICATION_WEBHOOK" \
            -H "Content-Type: application/json" \
            -d "{
                \"text\": \"Docker Backup $status: $message\",
                \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
            }" || true
    fi
}

# Function to create backup directory
create_backup_dir() {
    local backup_timestamp=$(date +%Y%m%d-%H%M%S)
    local backup_path="$BACKUP_DIR/$backup_timestamp"
    
    mkdir -p "$backup_path"
    echo "$backup_path"
}

# Function to backup Docker volumes
backup_volumes() {
    local backup_path="$1"
    
    print_header "Backing up Docker Volumes"
    
    local volumes_dir="$backup_path/volumes"
    mkdir -p "$volumes_dir"
    
    # Get all volumes
    local volumes=$(docker volume ls --format "{{.Name}}")
    
    for volume in $volumes; do
        print_header "Backing up volume: $volume"
        
        # Create volume backup
        docker run --rm \
            -v "$volume:/data:ro" \
            -v "$volumes_dir:/backup" \
            alpine:latest \
            tar czf "/backup/${volume}.tar.gz" -C /data .
        
        # Verify backup
        if [ -f "$volumes_dir/${volume}.tar.gz" ]; then
            local size=$(du -h "$volumes_dir/${volume}.tar.gz" | cut -f1)
            print_success "Volume $volume backed up ($size)"
        else
            print_error "Failed to backup volume $volume"
        fi
    done
}

# Function to backup container configurations
backup_containers() {
    local backup_path="$1"
    
    print_header "Backing up Container Configurations"
    
    local containers_dir="$backup_path/containers"
    mkdir -p "$containers_dir"
    
    # Export running containers
    docker ps --format "{{.Names}}" | while read container; do
        if [ -n "$container" ]; then
            print_header "Backing up container: $container"
            
            # Export container configuration
            docker inspect "$container" > "$containers_dir/${container}.json"
            
            # Export container as image (optional)
            docker commit "$container" "backup-${container}:$(date +%Y%m%d)"
            docker save "backup-${container}:$(date +%Y%m%d)" | \
                gzip > "$containers_dir/${container}-image.tar.gz"
            
            print_success "Container $container backed up"
        fi
    done
}

# Function to backup Docker Compose stacks
backup_compose_stacks() {
    local backup_path="$1"
    
    print_header "Backing up Docker Compose Stacks"
    
    local compose_dir="$backup_path/compose"
    mkdir -p "$compose_dir"
    
    # Find docker-compose files
    find /opt /home -name "docker-compose*.yml" -o -name "docker-compose*.yaml" 2>/dev/null | \
    while read compose_file; do
        if [ -f "$compose_file" ]; then
            local stack_name=$(basename "$(dirname "$compose_file")")
            local stack_dir="$compose_dir/$stack_name"
            mkdir -p "$stack_dir"
            
            # Copy compose files
            cp "$compose_file" "$stack_dir/"
            
            # Copy .env files if they exist
            local env_file="$(dirname "$compose_file")/.env"
            if [ -f "$env_file" ]; then
                cp "$env_file" "$stack_dir/"
            fi
            
            # Export stack configuration
            if command -v docker-compose >/dev/null 2>&1; then
                cd "$(dirname "$compose_file")"
                docker-compose config > "$stack_dir/resolved-compose.yml" 2>/dev/null || true
            fi
            
            print_success "Stack $stack_name backed up"
        fi
    done
}

# Function to backup databases
backup_databases() {
    local backup_path="$1"
    
    print_header "Backing up Databases"
    
    local db_dir="$backup_path/databases"
    mkdir -p "$db_dir"
    
    # PostgreSQL backups
    docker ps --format "{{.Names}}" | grep -i postgres | while read container; do
        if [ -n "$container" ]; then
            print_header "Backing up PostgreSQL: $container"
            
            # Get database list
            local databases=$(docker exec "$container" psql -U postgres -t -c "SELECT datname FROM pg_database WHERE datistemplate = false;" | grep -v "^$" | tr -d ' ')
            
            for db in $databases; do
                if [ -n "$db" ] && [ "$db" != "postgres" ]; then
                    docker exec "$container" pg_dump -U postgres "$db" | \
                        gzip > "$db_dir/${container}-${db}.sql.gz"
                    print_success "PostgreSQL database $db backed up"
                fi
            done
        fi
    done
    
    # MySQL backups
    docker ps --format "{{.Names}}" | grep -i mysql | while read container; do
        if [ -n "$container" ]; then
            print_header "Backing up MySQL: $container"
            
            # Get database list
            local databases=$(docker exec "$container" mysql -u root -e "SHOW DATABASES;" | grep -v "Database\|information_schema\|performance_schema\|mysql\|sys")
            
            for db in $databases; do
                if [ -n "$db" ]; then
                    docker exec "$container" mysqldump -u root "$db" | \
                        gzip > "$db_dir/${container}-${db}.sql.gz"
                    print_success "MySQL database $db backed up"
                fi
            done
        fi
    done
    
    # MongoDB backups
    docker ps --format "{{.Names}}" | grep -i mongo | while read container; do
        if [ -n "$container" ]; then
            print_header "Backing up MongoDB: $container"
            
            docker exec "$container" mongodump --archive | \
                gzip > "$db_dir/${container}-mongodb.archive.gz"
            print_success "MongoDB $container backed up"
        fi
    done
    
    # Redis backups
    docker ps --format "{{.Names}}" | grep -i redis | while read container; do
        if [ -n "$container" ]; then
            print_header "Backing up Redis: $container"
            
            docker exec "$container" redis-cli --rdb - | \
                gzip > "$db_dir/${container}-redis.rdb.gz"
            print_success "Redis $container backed up"
        fi
    done
}

# Function to backup Docker system information
backup_system_info() {
    local backup_path="$1"
    
    print_header "Backing up Docker System Information"
    
    local system_dir="$backup_path/system"
    mkdir -p "$system_dir"
    
    # Docker system information
    docker system info > "$system_dir/docker-info.txt"
    docker version > "$system_dir/docker-version.txt"
    
    # Container list
    docker ps -a --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}" > "$system_dir/containers.txt"
    
    # Image list
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}" > "$system_dir/images.txt"
    
    # Volume list
    docker volume ls > "$system_dir/volumes.txt"
    
    # Network list
    docker network ls > "$system_dir/networks.txt"
    
    # Docker Compose projects
    if command -v docker-compose >/dev/null 2>&1; then
        docker-compose ls > "$system_dir/compose-projects.txt" 2>/dev/null || true
    fi
    
    print_success "System information backed up"
}

# Function to encrypt backup
encrypt_backup() {
    local backup_path="$1"
    
    if [ -n "$ENCRYPTION_KEY" ]; then
        print_header "Encrypting Backup"
        
        local encrypted_file="${backup_path}.tar.gz.enc"
        
        # Create compressed archive
        tar czf "${backup_path}.tar.gz" -C "$(dirname "$backup_path")" "$(basename "$backup_path")"
        
        # Encrypt the archive
        openssl enc -aes-256-cbc -salt -in "${backup_path}.tar.gz" -out "$encrypted_file" -k "$ENCRYPTION_KEY"
        
        # Remove unencrypted files
        rm -rf "$backup_path" "${backup_path}.tar.gz"
        
        print_success "Backup encrypted: $encrypted_file"
        echo "$encrypted_file"
    else
        # Just compress
        tar czf "${backup_path}.tar.gz" -C "$(dirname "$backup_path")" "$(basename "$backup_path")"
        rm -rf "$backup_path"
        
        print_success "Backup compressed: ${backup_path}.tar.gz"
        echo "${backup_path}.tar.gz"
    fi
}

# Function to upload to S3
upload_to_s3() {
    local backup_file="$1"
    
    if [ -n "$S3_BUCKET" ] && command -v aws >/dev/null 2>&1; then
        print_header "Uploading to S3"
        
        local s3_key="docker-backups/$(basename "$backup_file")"
        
        aws s3 cp "$backup_file" "s3://$S3_BUCKET/$s3_key" \
            --storage-class STANDARD_IA
        
        print_success "Backup uploaded to S3: s3://$S3_BUCKET/$s3_key"
    fi
}

# Function to cleanup old backups
cleanup_old_backups() {
    print_header "Cleaning up old backups"
    
    # Local cleanup
    find "$BACKUP_DIR" -name "*.tar.gz*" -mtime +"$RETENTION_DAYS" -delete
    
    # S3 cleanup
    if [ -n "$S3_BUCKET" ] && command -v aws >/dev/null 2>&1; then
        local cutoff_date=$(date -d "$RETENTION_DAYS days ago" +%Y-%m-%d)
        
        aws s3api list-objects-v2 --bucket "$S3_BUCKET" --prefix "docker-backups/" \
            --query "Contents[?LastModified<='$cutoff_date'].Key" --output text | \
        while read key; do
            if [ -n "$key" ] && [ "$key" != "None" ]; then
                aws s3 rm "s3://$S3_BUCKET/$key"
                print_success "Removed old S3 backup: $key"
            fi
        done
    fi
    
    print_success "Cleanup completed"
}

# Function to verify backup integrity
verify_backup() {
    local backup_file="$1"
    
    print_header "Verifying Backup Integrity"
    
    if [[ "$backup_file" == *.enc ]]; then
        # Verify encrypted backup
        if [ -n "$ENCRYPTION_KEY" ]; then
            openssl enc -aes-256-cbc -d -in "$backup_file" -k "$ENCRYPTION_KEY" | \
                tar tzf - > /dev/null
            print_success "Encrypted backup verification passed"
        else
            print_error "Cannot verify encrypted backup without encryption key"
            return 1
        fi
    else
        # Verify compressed backup
        tar tzf "$backup_file" > /dev/null
        print_success "Backup verification passed"
    fi
}

# Function to create full backup
create_full_backup() {
    local start_time=$(date +%s)
    
    print_header "Starting Full Docker Backup"
    
    # Create backup directory
    local backup_path=$(create_backup_dir)
    
    # Perform backups
    backup_volumes "$backup_path"
    backup_containers "$backup_path"
    backup_compose_stacks "$backup_path"
    backup_databases "$backup_path"
    backup_system_info "$backup_path"
    
    # Encrypt and compress
    local final_backup=$(encrypt_backup "$backup_path")
    
    # Verify backup
    verify_backup "$final_backup"
    
    # Upload to S3
    upload_to_s3 "$final_backup"
    
    # Cleanup old backups
    cleanup_old_backups
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    local backup_size=$(du -h "$final_backup" | cut -f1)
    
    print_success "Backup completed successfully!"
    echo "Duration: ${duration}s"
    echo "Size: $backup_size"
    echo "Location: $final_backup"
    
    # Send success notification
    send_notification "SUCCESS" "Backup completed in ${duration}s, size: $backup_size"
}

# Function to restore from backup
restore_from_backup() {
    local backup_file="$1"
    local restore_type="${2:-full}"
    
    print_header "Restoring from Backup: $backup_file"
    
    if [ ! -f "$backup_file" ]; then
        print_error "Backup file not found: $backup_file"
        exit 1
    fi
    
    # Create temporary restore directory
    local restore_dir="/tmp/docker-restore-$(date +%s)"
    mkdir -p "$restore_dir"
    
    # Extract backup
    if [[ "$backup_file" == *.enc ]]; then
        if [ -n "$ENCRYPTION_KEY" ]; then
            openssl enc -aes-256-cbc -d -in "$backup_file" -k "$ENCRYPTION_KEY" | \
                tar xzf - -C "$restore_dir"
        else
            print_error "Encryption key required for encrypted backup"
            exit 1
        fi
    else
        tar xzf "$backup_file" -C "$restore_dir"
    fi
    
    local backup_contents=$(find "$restore_dir" -mindepth 1 -maxdepth 1 -type d | head -1)
    
    case "$restore_type" in
        "volumes")
            restore_volumes "$backup_contents/volumes"
            ;;
        "databases")
            restore_databases "$backup_contents/databases"
            ;;
        "containers")
            restore_containers "$backup_contents/containers"
            ;;
        "compose")
            restore_compose_stacks "$backup_contents/compose"
            ;;
        "full")
            restore_volumes "$backup_contents/volumes"
            restore_databases "$backup_contents/databases"
            restore_containers "$backup_contents/containers"
            restore_compose_stacks "$backup_contents/compose"
            ;;
        *)
            print_error "Unknown restore type: $restore_type"
            exit 1
            ;;
    esac
    
    # Cleanup
    rm -rf "$restore_dir"
    
    print_success "Restore completed successfully!"
    send_notification "SUCCESS" "Restore completed for type: $restore_type"
}

# Function to restore volumes
restore_volumes() {
    local volumes_dir="$1"
    
    if [ ! -d "$volumes_dir" ]; then
        print_warning "No volumes backup found"
        return 0
    fi
    
    print_header "Restoring Docker Volumes"
    
    for volume_backup in "$volumes_dir"/*.tar.gz; do
        if [ -f "$volume_backup" ]; then
            local volume_name=$(basename "$volume_backup" .tar.gz)
            
            print_header "Restoring volume: $volume_name"
            
            # Create volume if it doesn't exist
            docker volume create "$volume_name" || true
            
            # Restore volume data
            docker run --rm \
                -v "$volume_name:/data" \
                -v "$volumes_dir:/backup:ro" \
                alpine:latest \
                sh -c "cd /data && tar xzf /backup/$(basename "$volume_backup")"
            
            print_success "Volume $volume_name restored"
        fi
    done
}

# Function to restore databases
restore_databases() {
    local db_dir="$1"
    
    if [ ! -d "$db_dir" ]; then
        print_warning "No database backups found"
        return 0
    fi
    
    print_header "Restoring Databases"
    
    # Restore PostgreSQL databases
    for db_backup in "$db_dir"/*-*.sql.gz; do
        if [ -f "$db_backup" ]; then
            local filename=$(basename "$db_backup")
            local container_name=$(echo "$filename" | cut -d'-' -f1)
            local db_name=$(echo "$filename" | cut -d'-' -f2 | sed 's/.sql.gz$//')
            
            if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
                print_header "Restoring PostgreSQL database: $db_name to $container_name"
                
                zcat "$db_backup" | docker exec -i "$container_name" psql -U postgres "$db_name"
                print_success "PostgreSQL database $db_name restored"
            fi
        fi
    done
    
    # Restore MongoDB databases
    for db_backup in "$db_dir"/*-mongodb.archive.gz; do
        if [ -f "$db_backup" ]; then
            local container_name=$(basename "$db_backup" | sed 's/-mongodb.archive.gz$//')
            
            if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
                print_header "Restoring MongoDB: $container_name"
                
                zcat "$db_backup" | docker exec -i "$container_name" mongorestore --archive
                print_success "MongoDB $container_name restored"
            fi
        fi
    done
    
    # Restore Redis databases
    for db_backup in "$db_dir"/*-redis.rdb.gz; do
        if [ -f "$db_backup" ]; then
            local container_name=$(basename "$db_backup" | sed 's/-redis.rdb.gz$//')
            
            if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
                print_header "Restoring Redis: $container_name"
                
                # Stop Redis, restore data, restart
                docker exec "$container_name" redis-cli SHUTDOWN NOSAVE || true
                sleep 2
                zcat "$db_backup" | docker exec -i "$container_name" sh -c 'cat > /data/dump.rdb'
                docker restart "$container_name"
                print_success "Redis $container_name restored"
            fi
        fi
    done
}

# Function to restore containers
restore_containers() {
    local containers_dir="$1"
    
    if [ ! -d "$containers_dir" ]; then
        print_warning "No container backups found"
        return 0
    fi
    
    print_header "Restoring Container Images"
    
    for image_backup in "$containers_dir"/*-image.tar.gz; do
        if [ -f "$image_backup" ]; then
            local container_name=$(basename "$image_backup" | sed 's/-image.tar.gz$//')
            
            print_header "Restoring container image: $container_name"
            
            zcat "$image_backup" | docker load
            print_success "Container image $container_name restored"
        fi
    done
}

# Function to restore compose stacks
restore_compose_stacks() {
    local compose_dir="$1"
    
    if [ ! -d "$compose_dir" ]; then
        print_warning "No compose stack backups found"
        return 0
    fi
    
    print_header "Restoring Docker Compose Stacks"
    
    for stack_dir in "$compose_dir"/*; do
        if [ -d "$stack_dir" ]; then
            local stack_name=$(basename "$stack_dir")
            local restore_path="/opt/restored-stacks/$stack_name"
            
            print_header "Restoring compose stack: $stack_name"
            
            mkdir -p "$restore_path"
            cp -r "$stack_dir"/* "$restore_path/"
            
            print_success "Compose stack $stack_name restored to $restore_path"
            print_warning "Manual intervention required to start the stack"
        fi
    done
}

# Function to show usage
show_usage() {
    echo "Docker Backup and Disaster Recovery Script"
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  backup              - Create full backup"
    echo "  restore <file> [type] - Restore from backup file"
    echo "                        Types: full, volumes, databases, containers, compose"
    echo "  verify <file>       - Verify backup integrity"
    echo "  cleanup             - Cleanup old backups"
    echo "  help                - Show this help"
    echo ""
    echo "Environment Variables:"
    echo "  BACKUP_DIR          - Backup directory (default: /backups)"
    echo "  RETENTION_DAYS      - Backup retention in days (default: 30)"
    echo "  S3_BUCKET           - S3 bucket for remote backup"
    echo "  ENCRYPTION_KEY      - Encryption key for backup files"
    echo "  NOTIFICATION_WEBHOOK - Webhook URL for notifications"
    echo "  COMPRESSION_LEVEL   - Compression level 1-9 (default: 6)"
    echo ""
    echo "Examples:"
    echo "  $0 backup"
    echo "  $0 restore /backups/20231201-120000.tar.gz.enc"
    echo "  $0 restore /backups/backup.tar.gz volumes"
    echo "  $0 verify /backups/backup.tar.gz"
}

# Main script logic
case "${1:-help}" in
    "backup")
        create_full_backup
        ;;
    "restore")
        if [ $# -lt 2 ]; then
            echo "Usage: $0 restore <backup_file> [restore_type]"
            exit 1
        fi
        restore_from_backup "$2" "${3:-full}"
        ;;
    "verify")
        if [ $# -lt 2 ]; then
            echo "Usage: $0 verify <backup_file>"
            exit 1
        fi
        verify_backup "$2"
        ;;
    "cleanup")
        cleanup_old_backups
        ;;
    "help")
        show_usage
        ;;
    *)
        echo "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac
```

**Disaster Recovery Docker Compose:**

```yaml
# docker-compose.dr.yml - Disaster Recovery Stack
version: '3.8'

services:
  # Backup service
  backup-service:
    build:
      context: .
      dockerfile: Dockerfile.backup
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - backup-data:/backups
      - /opt/docker-stacks:/opt/docker-stacks:ro
    environment:
      - BACKUP_SCHEDULE=0 2 * * *  # Daily at 2 AM
      - RETENTION_DAYS=30
      - S3_BUCKET=${S3_BUCKET}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - ENCRYPTION_KEY=${BACKUP_ENCRYPTION_KEY}
      - NOTIFICATION_WEBHOOK=${SLACK_WEBHOOK}
    restart: unless-stopped
    networks:
      - backup-network

  # Monitoring service
  backup-monitor:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./monitoring/rules:/etc/prometheus/rules:ro
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'
    restart: unless-stopped
    networks:
      - backup-network

  # Alerting service
  alertmanager:
    image: prom/alertmanager:latest
    ports:
      - "9093:9093"
    volumes:
      - ./monitoring/alertmanager.yml:/etc/alertmanager/alertmanager.yml:ro
      - alertmanager-data:/alertmanager
    restart: unless-stopped
    networks:
      - backup-network

  # Grafana for visualization
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
      - GF_INSTALL_PLUGINS=grafana-piechart-panel
    volumes:
      - grafana-data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards:ro
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources:ro
    restart: unless-stopped
    networks:
      - backup-network

  # Log aggregation
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./monitoring/loki.yml:/etc/loki/local-config.yaml:ro
      - loki-data:/loki
    command: -config.file=/etc/loki/local-config.yaml
    restart: unless-stopped
    networks:
      - backup-network

  # Log collection
  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - ./monitoring/promtail.yml:/etc/promtail/config.yml:ro
    command: -config.file=/etc/promtail/config.yml
    restart: unless-stopped
    networks:
      - backup-network

volumes:
  backup-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/backups
  prometheus-data:
  alertmanager-data:
  grafana-data:
  loki-data:

networks:
  backup-network:
    driver: bridge
```

**Disaster Recovery Best Practices:**

1. **Backup Strategy:**
   - Regular automated backups
   - Multiple backup locations
   - Encryption for sensitive data
   - Backup verification
   - Retention policies

2. **Recovery Planning:**
   - Documented recovery procedures
   - Recovery time objectives (RTO)
   - Recovery point objectives (RPO)
   - Regular disaster recovery testing
   - Automated recovery scripts

3. **Monitoring:**
   - Backup success/failure alerts
   - Storage capacity monitoring
   - Recovery testing results
   - Performance metrics

4. **Security:**
   - Encrypted backups
   - Secure backup storage
   - Access control
   - Audit trails

---

### Q17: How do you implement Docker image optimization and security scanning?
**Difficulty: Advanced**

**Answer:**
Docker image optimization and security scanning are crucial for production deployments, focusing on reducing image size, improving performance, and identifying security vulnerabilities.

**Optimized Multi-stage Dockerfile:**

```dockerfile
# Dockerfile.optimized - Highly optimized production Dockerfile
# Build arguments
ARG NODE_VERSION=18-alpine
ARG NGINX_VERSION=1.24-alpine
ARG APP_USER=appuser
ARG APP_UID=1001
ARG APP_GID=1001

# ============================================================================
# Base stage - Common dependencies
# ============================================================================
FROM node:${NODE_VERSION} AS base

# Install security updates and minimal dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache \
        dumb-init \
        ca-certificates \
        tzdata && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g ${APP_GID} -S ${APP_USER} && \
    adduser -u ${APP_UID} -S ${APP_USER} -G ${APP_USER}

# Set working directory
WORKDIR /app

# ============================================================================
# Dependencies stage - Install and cache dependencies
# ============================================================================
FROM base AS dependencies

# Copy package files
COPY package*.json ./

# Install dependencies with optimizations
RUN npm ci --only=production --no-audit --no-fund && \
    npm cache clean --force

# ============================================================================
# Build stage - Build the application
# ============================================================================
FROM base AS build

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build application
RUN npm run build && \
    npm run test:ci && \
    npm prune --production

# ============================================================================
# Security scanning stage
# ============================================================================
FROM build AS security-scan

# Install security scanning tools
RUN npm install -g audit-ci retire

# Run security scans
RUN npm audit --audit-level moderate
RUN retire --path ./node_modules

# ============================================================================
# Runtime stage - Final optimized image
# ============================================================================
FROM base AS runtime

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    NPM_CONFIG_LOGLEVEL=warn

# Copy production dependencies
COPY --from=dependencies --chown=${APP_USER}:${APP_USER} /app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=${APP_USER}:${APP_USER} /app/dist ./dist
COPY --from=build --chown=${APP_USER}:${APP_USER} /app/package.json ./package.json

# Create necessary directories
RUN mkdir -p /app/logs /app/tmp && \
    chown -R ${APP_USER}:${APP_USER} /app

# Switch to non-root user
USER ${APP_USER}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Expose port
EXPOSE ${PORT}

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]

# ============================================================================
# Static files stage - Nginx for serving static content
# ============================================================================
FROM nginx:${NGINX_VERSION} AS static

# Copy static files
COPY --from=build /app/dist/public /usr/share/nginx/html

# Copy optimized nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

# Create non-root user for nginx
RUN addgroup -g 101 -S nginx-user && \
    adduser -u 101 -S nginx-user -G nginx-user

# Set proper permissions
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    chown -R nginx-user:nginx-user /etc/nginx/conf.d

# Switch to non-root user
USER nginx-user

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Image Optimization Script:**

```bash
#!/bin/bash
# docker-optimize.sh - Docker image optimization and analysis

set -euo pipefail

# Configuration
IMAGE_NAME="${1:-}"
OPTIMIZATION_LEVEL="${OPTIMIZATION_LEVEL:-aggressive}"
SECURITY_SCAN="${SECURITY_SCAN:-true}"
PUSH_TO_REGISTRY="${PUSH_TO_REGISTRY:-false}"
REGISTRY="${REGISTRY:-}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to analyze image
analyze_image() {
    local image="$1"
    
    print_header "Analyzing Image: $image"
    
    # Basic image information
    echo "Image Information:"
    docker images "$image" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
    
    # Image layers
    echo ""
    echo "Image History:"
    docker history "$image" --format "table {{.CreatedBy}}\t{{.Size}}" | head -20
    
    # Image inspection
    echo ""
    echo "Image Details:"
    docker inspect "$image" --format '
    Architecture: {{.Architecture}}
    OS: {{.Os}}
    Size: {{.Size}} bytes
    Virtual Size: {{.VirtualSize}} bytes
    Created: {{.Created}}
    Author: {{.Author}}
    '
}

# Function to scan for vulnerabilities
security_scan() {
    local image="$1"
    
    print_header "Security Scanning: $image"
    
    # Trivy vulnerability scan
    if command -v trivy >/dev/null 2>&1; then
        echo "Running Trivy vulnerability scan..."
        trivy image --severity HIGH,CRITICAL "$image"
        
        # Generate detailed report
        trivy image --format json --output "security-report-$(date +%Y%m%d).json" "$image"
        print_success "Trivy scan completed"
    else
        print_warning "Trivy not installed, skipping vulnerability scan"
    fi
    
    # Grype vulnerability scan (alternative)
    if command -v grype >/dev/null 2>&1; then
        echo "Running Grype vulnerability scan..."
        grype "$image" -o json --file "grype-report-$(date +%Y%m%d).json"
        grype "$image" | grep -E "(HIGH|CRITICAL)"
        print_success "Grype scan completed"
    fi
    
    # Docker Scout (if available)
    if docker scout version >/dev/null 2>&1; then
        echo "Running Docker Scout scan..."
        docker scout cves "$image"
        print_success "Docker Scout scan completed"
    fi
    
    # CIS Docker Benchmark check
    if command -v docker-bench-security >/dev/null 2>&1; then
        echo "Running CIS Docker Benchmark..."
        docker-bench-security
        print_success "CIS benchmark completed"
    fi
}

# Function to optimize image with dive
optimize_with_dive() {
    local image="$1"
    
    if command -v dive >/dev/null 2>&1; then
        print_header "Analyzing with Dive: $image"
        
        # Generate dive analysis
        dive "$image" --ci --lowestEfficiency=0.95 --highestWastedBytes=20MB
        
        print_success "Dive analysis completed"
    else
        print_warning "Dive not installed, skipping layer analysis"
    fi
}

# Function to create optimized image
create_optimized_image() {
    local base_image="$1"
    local optimized_tag="${base_image}-optimized"
    
    print_header "Creating Optimized Image: $optimized_tag"
    
    # Create optimization Dockerfile
    cat > Dockerfile.optimize << EOF
FROM $base_image AS original

# Multi-stage optimization
FROM alpine:latest AS optimizer

# Install optimization tools
RUN apk add --no-cache upx binutils

# Copy binaries from original image
COPY --from=original /usr/local/bin/* /tmp/bins/

# Optimize binaries
RUN find /tmp/bins -type f -executable -exec upx --best {} \; || true

# Final optimized stage
FROM $base_image

# Copy optimized binaries
COPY --from=optimizer /tmp/bins/* /usr/local/bin/

# Remove unnecessary packages and files
RUN if command -v apk >/dev/null 2>&1; then \
        apk del --purge \$(apk info | grep -E '(doc|man|info)'); \
    elif command -v apt-get >/dev/null 2>&1; then \
        apt-get autoremove -y && apt-get autoclean; \
    fi && \
    rm -rf /var/cache/* /tmp/* /var/tmp/* /usr/share/doc/* /usr/share/man/* /usr/share/info/*

# Optimize file system
RUN find /usr -name "*.a" -delete && \
    find /usr -name "*.la" -delete && \
    find /usr -name "*.pyc" -delete && \
    find /usr -name "*.pyo" -delete && \
    find /usr -name "__pycache__" -type d -exec rm -rf {} + || true
EOF
    
    # Build optimized image
    docker build -f Dockerfile.optimize -t "$optimized_tag" .
    
    # Compare sizes
    local original_size=$(docker images "$base_image" --format "{{.Size}}")
    local optimized_size=$(docker images "$optimized_tag" --format "{{.Size}}")
    
    echo "Size Comparison:"
    echo "  Original: $original_size"
    echo "  Optimized: $optimized_size"
    
    # Cleanup
    rm -f Dockerfile.optimize
    
    print_success "Optimized image created: $optimized_tag"
}

# Function to create distroless image
create_distroless_image() {
    local base_image="$1"
    local distroless_tag="${base_image}-distroless"
    
    print_header "Creating Distroless Image: $distroless_tag"
    
    # Create distroless Dockerfile
    cat > Dockerfile.distroless << EOF
# Extract application from original image
FROM $base_image AS app

# Use distroless base
FROM gcr.io/distroless/nodejs18-debian11:nonroot

# Copy application
COPY --from=app /app /app
COPY --from=app /usr/local/bin/node /usr/local/bin/node

WORKDIR /app

EXPOSE 3000

CMD ["node", "dist/server.js"]
EOF
    
    # Build distroless image
    docker build -f Dockerfile.distroless -t "$distroless_tag" .
    
    # Compare sizes
    local original_size=$(docker images "$base_image" --format "{{.Size}}")
    local distroless_size=$(docker images "$distroless_tag" --format "{{.Size}}")
    
    echo "Size Comparison:"
    echo "  Original: $original_size"
    echo "  Distroless: $distroless_size"
    
    # Cleanup
    rm -f Dockerfile.distroless
    
    print_success "Distroless image created: $distroless_tag"
}

# Function to run performance tests
performance_test() {
    local image="$1"
    
    print_header "Performance Testing: $image"
    
    # Start container for testing
    local container_id=$(docker run -d -p 3000:3000 "$image")
    
    # Wait for container to be ready
    sleep 10
    
    # Basic performance test
    if command -v ab >/dev/null 2>&1; then
        echo "Running Apache Bench test..."
        ab -n 1000 -c 10 http://localhost:3000/health
    fi
    
    # Memory usage test
    echo "Memory usage:"
    docker stats "$container_id" --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"
    
    # Startup time test
    echo "Testing startup time..."
    local start_time=$(date +%s%N)
    docker stop "$container_id" >/dev/null
    docker start "$container_id" >/dev/null
    
    # Wait for health check
    until curl -sf http://localhost:3000/health >/dev/null 2>&1; do
        sleep 0.1
    done
    
    local end_time=$(date +%s%N)
    local startup_time=$(( (end_time - start_time) / 1000000 ))
    
    echo "Startup time: ${startup_time}ms"
    
    # Cleanup
    docker stop "$container_id" >/dev/null
    docker rm "$container_id" >/dev/null
    
    print_success "Performance testing completed"
}

# Function to generate optimization report
generate_report() {
    local image="$1"
    
    print_header "Generating Optimization Report"
    
    local report_file="optimization-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$report_file" << EOF
# Docker Image Optimization Report

**Image:** $image  
**Date:** $(date)  
**Optimization Level:** $OPTIMIZATION_LEVEL

## Image Analysis

\`\`\`
$(docker images "$image" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}")
\`\`\`

## Layer Analysis

\`\`\`
$(docker history "$image" --format "table {{.CreatedBy}}\t{{.Size}}" | head -10)
\`\`\`

## Security Scan Results

$(if [ -f "security-report-$(date +%Y%m%d).json" ]; then
    echo "Trivy scan results saved to: security-report-$(date +%Y%m%d).json"
else
    echo "No security scan results available"
fi)

## Optimization Recommendations

1. **Multi-stage builds**: Use multi-stage builds to reduce final image size
2. **Base image**: Consider using Alpine or distroless base images
3. **Dependencies**: Remove unnecessary packages and dependencies
4. **Layer optimization**: Combine RUN commands to reduce layers
5. **Security**: Regular security scanning and updates

## Performance Metrics

- **Image Size**: $(docker images "$image" --format "{{.Size}}")
- **Layers**: $(docker history "$image" --quiet | wc -l)
- **Vulnerabilities**: Check security scan results

EOF
    
    print_success "Report generated: $report_file"
}

# Function to push optimized images
push_images() {
    local base_image="$1"
    
    if [ "$PUSH_TO_REGISTRY" = "true" ] && [ -n "$REGISTRY" ]; then
        print_header "Pushing Optimized Images to Registry"
        
        # Tag and push optimized image
        if docker images "${base_image}-optimized" --format "{{.Repository}}" | grep -q "${base_image}-optimized"; then
            docker tag "${base_image}-optimized" "$REGISTRY/${base_image}-optimized:latest"
            docker push "$REGISTRY/${base_image}-optimized:latest"
            print_success "Pushed optimized image to registry"
        fi
        
        # Tag and push distroless image
        if docker images "${base_image}-distroless" --format "{{.Repository}}" | grep -q "${base_image}-distroless"; then
            docker tag "${base_image}-distroless" "$REGISTRY/${base_image}-distroless:latest"
            docker push "$REGISTRY/${base_image}-distroless:latest"
            print_success "Pushed distroless image to registry"
        fi
    fi
}

# Function to show usage
show_usage() {
    echo "Docker Image Optimization and Security Scanning"
    echo "Usage: $0 <image_name> [options]"
    echo ""
    echo "Options:"
    echo "  --analyze           - Analyze image only"
    echo "  --scan              - Security scan only"
    echo "  --optimize          - Create optimized variants"
    echo "  --performance       - Run performance tests"
    echo "  --report            - Generate optimization report"
    echo "  --all               - Run all operations (default)"
    echo ""
    echo "Environment Variables:"
    echo "  OPTIMIZATION_LEVEL  - Optimization level (basic|aggressive)"
    echo "  SECURITY_SCAN       - Enable security scanning (true|false)"
    echo "  PUSH_TO_REGISTRY    - Push optimized images (true|false)"
    echo "  REGISTRY            - Registry URL for pushing images"
    echo ""
    echo "Examples:"
    echo "  $0 myapp:latest --analyze"
    echo "  $0 myapp:latest --optimize"
    echo "  OPTIMIZATION_LEVEL=aggressive $0 myapp:latest"
}

# Main script logic
if [ -z "$IMAGE_NAME" ]; then
    show_usage
    exit 1
fi

# Check if image exists
if ! docker images "$IMAGE_NAME" --format "{{.Repository}}" | grep -q "$(echo "$IMAGE_NAME" | cut -d: -f1)"; then
    print_error "Image not found: $IMAGE_NAME"
    exit 1
fi

OPERATION="${2:-all}"

case "$OPERATION" in
    "--analyze")
        analyze_image "$IMAGE_NAME"
        ;;
    "--scan")
        security_scan "$IMAGE_NAME"
        ;;
    "--optimize")
        create_optimized_image "$IMAGE_NAME"
        create_distroless_image "$IMAGE_NAME"
        ;;
    "--performance")
        performance_test "$IMAGE_NAME"
        ;;
    "--report")
        generate_report "$IMAGE_NAME"
        ;;
    "--all"|"")
        analyze_image "$IMAGE_NAME"
        if [ "$SECURITY_SCAN" = "true" ]; then
            security_scan "$IMAGE_NAME"
        fi
        optimize_with_dive "$IMAGE_NAME"
        create_optimized_image "$IMAGE_NAME"
        create_distroless_image "$IMAGE_NAME"
        performance_test "$IMAGE_NAME"
        generate_report "$IMAGE_NAME"
        push_images "$IMAGE_NAME"
        ;;
    *)
        echo "Unknown operation: $OPERATION"
        show_usage
        exit 1
        ;;
esac

print_success "Docker optimization completed for: $IMAGE_NAME"
```

**Security Scanning CI/CD Integration:**

```yaml
# .github/workflows/security-scan.yml
name: Docker Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1'  # Weekly scan

jobs:
  security-scan:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Build image
      run: |
        docker build -t test-image:${{ github.sha }} .
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: 'test-image:${{ github.sha }}'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      if: always()
      with:
        sarif_file: 'trivy-results.sarif'
    
    - name: Run Grype vulnerability scanner
      uses: anchore/scan-action@v3
      with:
        image: 'test-image:${{ github.sha }}'
        fail-build: true
        severity-cutoff: high
    
    - name: Docker Scout scan
      uses: docker/scout-action@v1
      with:
        command: cves
        image: 'test-image:${{ github.sha }}'
        sarif-file: 'scout-results.sarif'
    
    - name: Hadolint Dockerfile scan
      uses: hadolint/hadolint-action@v3.1.0
      with:
        dockerfile: Dockerfile
        format: sarif
        output-file: hadolint-results.sarif
    
    - name: Upload Hadolint scan results
      uses: github/codeql-action/upload-sarif@v2
      if: always()
      with:
        sarif_file: 'hadolint-results.sarif'
    
    - name: Image optimization analysis
      run: |
        # Install dive
        wget https://github.com/wagoodman/dive/releases/download/v0.10.0/dive_0.10.0_linux_amd64.deb
        sudo apt install ./dive_0.10.0_linux_amd64.deb
        
        # Analyze image efficiency
        dive test-image:${{ github.sha }} --ci --lowestEfficiency=0.95
    
    - name: Generate security report
      run: |
        echo "# Security Scan Report" > security-report.md
        echo "**Image:** test-image:${{ github.sha }}" >> security-report.md
        echo "**Date:** $(date)" >> security-report.md
        echo "**Commit:** ${{ github.sha }}" >> security-report.md
        echo "" >> security-report.md
        echo "## Scan Results" >> security-report.md
        echo "- Trivy: See SARIF results" >> security-report.md
        echo "- Grype: See action results" >> security-report.md
        echo "- Docker Scout: See SARIF results" >> security-report.md
        echo "- Hadolint: See SARIF results" >> security-report.md
    
    - name: Upload security report
      uses: actions/upload-artifact@v3
      with:
        name: security-report
        path: security-report.md
```

**Image Optimization Best Practices:**

1. **Multi-stage Builds:**
   - Separate build and runtime stages
   - Copy only necessary artifacts
   - Use specific base images for each stage

2. **Base Image Selection:**
   - Use minimal base images (Alpine, distroless)
   - Keep base images updated
   - Consider security vs. functionality trade-offs

3. **Layer Optimization:**
   - Combine RUN commands
   - Clean up in the same layer
   - Use .dockerignore effectively

4. **Security Scanning:**
   - Regular vulnerability scans
   - Automated security testing in CI/CD
   - Monitor for new vulnerabilities

5. **Performance Monitoring:**
   - Track image sizes over time
   - Monitor startup times
   - Measure resource usage

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Perform health checks (database, external services, etc.)
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0',
    };
    
    res.status(200).json(healthStatus);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Readiness check endpoint
app.get('/ready', async (req, res) => {
  try {
    // Check if application is ready to serve traffic
    // (database connections, required services, etc.)
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Track active connections
server.on('connection', () => {
  activeConnections.inc();
});

server.on('close', () => {
  activeConnections.dec();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});
```

---

### Q15: How do you implement Docker CI/CD integration?
**Difficulty: Medium**

**Answer:**
Integrating Docker into CI/CD pipelines enables automated building, testing, and deployment of containerized applications. This involves creating efficient build processes, security scanning, and deployment strategies.

**GitHub Actions CI/CD Pipeline:**

```yaml
# .github/workflows/docker-ci-cd.yml
name: Docker CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  release:
    types: [ published ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests with Docker
        run: |
          docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
          docker-compose -f docker-compose.test.yml down

  security-scan:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Build Docker image for scanning
        run: |
          docker build -t ${{ env.IMAGE_NAME }}:scan .

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: '${{ env.IMAGE_NAME }}:scan'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run Hadolint Dockerfile linter
        uses: hadolint/hadolint-action@v3.1.0
        with:
          dockerfile: Dockerfile
          format: sarif
          output-file: hadolint-results.sarif
          no-fail: true

      - name: Upload Hadolint scan results
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: hadolint-results.sarif

  build-and-push:
    runs-on: ubuntu-latest
    needs: [test, security-scan]
    permissions:
      contents: read
      packages: write
    outputs:
      image-digest: ${{ steps.build.outputs.digest }}
      image-tag: ${{ steps.meta.outputs.tags }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            BUILD_DATE=${{ fromJSON(steps.meta.outputs.json).labels['org.opencontainers.image.created'] }}
            VCS_REF=${{ github.sha }}
            VERSION=${{ fromJSON(steps.meta.outputs.json).labels['org.opencontainers.image.version'] }}

      - name: Generate SBOM
        uses: anchore/sbom-action@v0
        with:
          image: ${{ steps.meta.outputs.tags }}
          format: spdx-json
          output-file: sbom.spdx.json

      - name: Upload SBOM
        uses: actions/upload-artifact@v3
        with:
          name: sbom
          path: sbom.spdx.json

  deploy-staging:
    runs-on: ubuntu-latest
    needs: build-and-push
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.myapp.com
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to staging
        run: |
          echo "Deploying to staging environment"
          # Replace with your deployment script
          ./scripts/deploy.sh staging ${{ needs.build-and-push.outputs.image-tag }}

      - name: Run smoke tests
        run: |
          echo "Running smoke tests against staging"
          npm run test:smoke -- --env=staging

  deploy-production:
    runs-on: ubuntu-latest
    needs: build-and-push
    if: github.event_name == 'release'
    environment:
      name: production
      url: https://myapp.com
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to production
        run: |
          echo "Deploying to production environment"
          ./scripts/deploy.sh production ${{ needs.build-and-push.outputs.image-tag }}

      - name: Run health checks
        run: |
          echo "Running health checks against production"
          ./scripts/health-check.sh production

      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

**Docker Compose for Testing:**

```yaml
# docker-compose.test.yml
version: '3.8'

services:
  app-test:
    build:
      context: .
      dockerfile: Dockerfile
      target: test
    environment:
      - NODE_ENV=test
      - DB_HOST=postgres-test
      - REDIS_HOST=redis-test
    depends_on:
      postgres-test:
        condition: service_healthy
      redis-test:
        condition: service_started
    networks:
      - test-network
    command: npm run test:integration

  postgres-test:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=testdb
      - POSTGRES_USER=testuser
      - POSTGRES_PASSWORD=testpass
    networks:
      - test-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U testuser -d testdb"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis-test:
    image: redis:7-alpine
    networks:
      - test-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

networks:
  test-network:
    driver: bridge
```

**Multi-stage Dockerfile for CI/CD:**

```dockerfile
# Multi-stage Dockerfile optimized for CI/CD
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development
RUN npm ci --include=dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Test stage
FROM development AS test
RUN npm run lint
RUN npm run test:unit
CMD ["npm", "run", "test:integration"]

# Build stage
FROM development AS builder
RUN npm run build

# Production stage
FROM base AS production

# Add build arguments for metadata
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

# Add labels for metadata
LABEL org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.version=$VERSION \
      org.opencontainers.image.title="MyApp" \
      org.opencontainers.image.description="Production Node.js application" \
      org.opencontainers.image.vendor="MyCompany"

# Install security updates
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init curl && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=base --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package*.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

**Deployment Script:**

```bash
#!/bin/bash
# scripts/deploy.sh

set -euo pipefail

ENVIRONMENT=$1
IMAGE_TAG=$2

echo "Deploying to $ENVIRONMENT environment with image $IMAGE_TAG"

case $ENVIRONMENT in
  "staging")
    COMPOSE_FILE="docker-compose.staging.yml"
    HOST="staging.myapp.com"
    ;;
  "production")
    COMPOSE_FILE="docker-compose.prod.yml"
    HOST="myapp.com"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

# Update image tag in compose file
sed -i "s|image: myapp:.*|image: $IMAGE_TAG|g" $COMPOSE_FILE

# Deploy using Docker Compose
echo "Pulling latest images..."
docker-compose -f $COMPOSE_FILE pull

echo "Starting deployment..."
docker-compose -f $COMPOSE_FILE up -d --remove-orphans

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
for i in {1..30}; do
  if curl -f http://$HOST/health > /dev/null 2>&1; then
    echo "Deployment successful!"
    exit 0
  fi
  echo "Waiting for service to be ready... ($i/30)"
  sleep 10
done

echo "Deployment failed - service not healthy"
exit 1
```

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await pgPool.query('SELECT 1');
    
    // Check Redis connection
    await redisClient.ping();
    
    // Check external service (if needed)
    const externalCheck = await axios.get('http://external-service:8080/health', {
      timeout: 5000
    }).catch(() => ({ status: 200, data: { status: 'external service unavailable' } }));
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        redis: 'connected',
        external: externalCheck.data.status
      },
      network: {
        hostname: require('os').hostname(),
        platform: require('os').platform(),
        networkInterfaces: require('os').networkInterfaces()
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// API endpoint demonstrating inter-service communication
app.get('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `data:${id}`;
  
  try {
    // Try cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json({
        data: JSON.parse(cachedData),
        source: 'cache',
        timestamp: new Date().toISOString()
      });
    }
    
    // Query database
    const result = await pgPool.query(
      'SELECT * FROM items WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const data = result.rows[0];
    
    // Cache the result
    await redisClient.setex(cacheKey, 300, JSON.stringify(data));
    
    // Call another microservice
    const enrichedData = await axios.post('http://enrichment-service:3001/enrich', {
      data: data
    }, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': req.headers['x-request-id'] || 'unknown'
      }
    }).catch(error => {
      console.warn('Enrichment service unavailable:', error.message);
      return { data: data };
    });
    
    res.json({
      data: enrichedData.data,
      source: 'database',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Network diagnostics endpoint
app.get('/network/diagnostics', async (req, res) => {
  const diagnostics = {
    hostname: require('os').hostname(),
    networkInterfaces: require('os').networkInterfaces(),
    dnsLookups: {},
    connectivity: {}
  };
  
  // Test DNS resolution for container names
  const services = ['postgres', 'redis', 'frontend', 'nginx'];
  
  for (const service of services) {
    try {
      const dns = require('dns').promises;
      const addresses = await dns.lookup(service, { all: true });
      diagnostics.dnsLookups[service] = addresses;
    } catch (error) {
      diagnostics.dnsLookups[service] = { error: error.message };
    }
  }
  
  // Test connectivity
  const connectivityTests = [
    { name: 'postgres', host: 'postgres', port: 5432 },
    { name: 'redis', host: 'redis', port: 6379 },
    { name: 'frontend', host: 'frontend', port: 3000 }
  ];
  
  for (const test of connectivityTests) {
    try {
      const net = require('net');
      const socket = new net.Socket();
      
      const connected = await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          socket.destroy();
          resolve(false);
        }, 3000);
        
        socket.connect(test.port, test.host, () => {
          clearTimeout(timeout);
          socket.destroy();
          resolve(true);
        });
        
        socket.on('error', () => {
          clearTimeout(timeout);
          resolve(false);
        });
      });
      
      diagnostics.connectivity[test.name] = {
        host: test.host,
        port: test.port,
        connected: connected
      };
    } catch (error) {
      diagnostics.connectivity[test.name] = {
        host: test.host,
        port: test.port,
        error: error.message
      };
    }
  }
  
  res.json(diagnostics);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend service running on port ${PORT}`);
  console.log(`📡 Network interfaces:`, require('os').networkInterfaces());
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  
  // Close database connections
  await pgPool.end();
  
  // Close Redis connection
  redisClient.quit();
  
  process.exit(0);
});
```

**Nginx Configuration for Container Communication:**

```nginx
# nginx.conf - Load balancing and reverse proxy
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000 max_fails=3 fail_timeout=30s;
        # Add more frontend instances for load balancing
        # server frontend-2:3000 max_fails=3 fail_timeout=30s;
        # server frontend-3:3000 max_fails=3 fail_timeout=30s;
    }
    
    upstream backend {
        server backend:5000 max_fails=3 fail_timeout=30s;
        # Add more backend instances for load balancing
        # server backend-2:5000 max_fails=3 fail_timeout=30s;
        # server backend-3:5000 max_fails=3 fail_timeout=30s;
    }
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
    
    server {
        listen 80;
        server_name localhost;
        
        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        
        # Frontend routes
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # WebSocket support
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
        
        # API routes with rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Timeouts
            proxy_connect_timeout 30s;
            proxy_send_timeout 30s;
            proxy_read_timeout 30s;
        }
        
        # Authentication endpoints with stricter rate limiting
        location /api/auth/ {
            limit_req zone=login burst=5 nodelay;
            
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # Health check endpoint
        location /health {
            access_log off;
            proxy_pass http://backend/health;
        }
        
        # Static files (if served by nginx)
        location /static/ {
            alias /var/www/static/;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

**Network Security Best Practices:**

```bash
#!/bin/bash
# Docker Network Security Script

# Create isolated networks for different tiers
docker network create --driver bridge \
  --subnet=172.20.0.0/24 \
  --ip-range=172.20.0.0/25 \
  --gateway=172.20.0.1 \
  frontend-network

docker network create --driver bridge \
  --internal \
  --subnet=172.21.0.0/24 \
  backend-network

docker network create --driver bridge \
  --internal \
  --subnet=172.22.0.0/24 \
  database-network

# Network segmentation example
docker run -d --name frontend \
  --network frontend-network \
  -p 3000:3000 \
  myapp/frontend:latest

docker run -d --name backend \
  --network backend-network \
  myapp/backend:latest

docker run -d --name database \
  --network database-network \
  postgres:15

# Connect backend to both networks
docker network connect frontend-network backend
docker network connect database-network backend

# Firewall rules (iptables)
# Block direct access to internal networks
iptables -A DOCKER-USER -s 172.21.0.0/24 -d 0.0.0.0/0 -j DROP
iptables -A DOCKER-USER -s 172.22.0.0/24 -d 0.0.0.0/0 -j DROP

# Allow specific communication
iptables -A DOCKER-USER -s 172.20.0.0/24 -d 172.21.0.0/24 -p tcp --dport 5000 -j ACCEPT
iptables -A DOCKER-USER -s 172.21.0.0/24 -d 172.22.0.0/24 -p tcp --dport 5432 -j ACCEPT
```

**Key Networking Concepts:**

1. **Container Name Resolution**: Containers can communicate using service names
2. **Port Mapping**: Expose container ports to host
3. **Network Isolation**: Separate networks for security
4. **Load Balancing**: Distribute traffic across multiple containers
5. **Service Discovery**: Automatic discovery of services
6. **DNS Resolution**: Built-in DNS for container communication
7. **Network Policies**: Control traffic flow between containers

**Best Practices:**
- Use custom networks instead of default bridge
- Implement network segmentation for security
- Use internal networks for backend services
- Implement proper load balancing
- Monitor network traffic and performance
- Use secrets management for sensitive data
- Implement proper logging and monitoring

---

### Q18: How do you implement Docker in production environments with high availability and scalability?
**Difficulty: Expert**

**Answer:**
Implementing Docker in production requires comprehensive strategies for high availability, scalability, monitoring, and operational excellence.

**Production Docker Architecture:**

```yaml
# docker-compose.production.yml
version: '3.8'

services:
  # Load Balancer
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - nginx_cache:/var/cache/nginx
    networks:
      - frontend
    deploy:
      replicas: 2
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Application Servers
  app:
    image: myapp:${APP_VERSION:-latest}
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
    networks:
      - frontend
      - backend
    deploy:
      replicas: 4
      update_config:
        parallelism: 2
        delay: 30s
        failure_action: rollback
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  # Database
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres/init:/docker-entrypoint-initdb.d:ro
    networks:
      - backend
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Redis Cache
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - backend
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    networks:
      - monitoring
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards:ro
    networks:
      - monitoring
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  prometheus_data:
    driver: local
  grafana_data:
    driver: local
  nginx_cache:
    driver: local

networks:
  frontend:
    driver: overlay
    attachable: true
  backend:
    driver: overlay
    internal: true
  monitoring:
    driver: overlay
    internal: true
```

**Production Deployment Script:**

```bash
#!/bin/bash
# deploy-production.sh

set -euo pipefail

# Configuration
APP_NAME="myapp"
REGISTRY="your-registry.com"
ENVIRONMENT="production"
BACKUP_RETENTION_DAYS=30

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Pre-deployment checks
pre_deployment_checks() {
    log "Running pre-deployment checks..."
    
    # Check Docker Swarm status
    if ! docker info | grep -q "Swarm: active"; then
        error "Docker Swarm is not active"
    fi
    
    # Check required environment variables
    required_vars=("DATABASE_URL" "REDIS_URL" "JWT_SECRET" "APP_VERSION")
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            error "Required environment variable $var is not set"
        fi
    done
    
    # Check disk space
    available_space=$(df / | awk 'NR==2 {print $4}')
    if [[ $available_space -lt 5242880 ]]; then # 5GB in KB
        warn "Low disk space: ${available_space}KB available"
    fi
    
    log "Pre-deployment checks passed"
}

# Backup current state
backup_current_state() {
    log "Creating backup of current state..."
    
    backup_dir="/backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    # Backup database
    docker exec $(docker ps -q -f name=postgres) pg_dump -U $POSTGRES_USER $POSTGRES_DB > "$backup_dir/database.sql"
    
    # Backup Redis
    docker exec $(docker ps -q -f name=redis) redis-cli --rdb - > "$backup_dir/redis.rdb"
    
    # Backup application configs
    cp -r ./configs "$backup_dir/"
    
    log "Backup created at $backup_dir"
}

# Deploy application
deploy_application() {
    log "Deploying application version $APP_VERSION..."
    
    # Pull latest images
    docker service update --image "$REGISTRY/$APP_NAME:$APP_VERSION" ${APP_NAME}_app
    
    # Wait for deployment to complete
    log "Waiting for deployment to complete..."
    timeout=300
    while [[ $timeout -gt 0 ]]; do
        if docker service ps ${APP_NAME}_app --filter "desired-state=running" --format "table {{.CurrentState}}" | grep -q "Running"; then
            log "Deployment completed successfully"
            break
        fi
        sleep 10
        ((timeout-=10))
    done
    
    if [[ $timeout -le 0 ]]; then
        error "Deployment timed out"
    fi
}

# Health checks
health_checks() {
    log "Running health checks..."
    
    # Check application health
    for i in {1..30}; do
        if curl -f http://localhost/health > /dev/null 2>&1; then
            log "Application health check passed"
            break
        fi
        if [[ $i -eq 30 ]]; then
            error "Application health check failed"
        fi
        sleep 10
    done
    
    # Check database connectivity
    if ! docker exec $(docker ps -q -f name=postgres) pg_isready -U $POSTGRES_USER > /dev/null 2>&1; then
        error "Database health check failed"
    fi
    
    # Check Redis connectivity
    if ! docker exec $(docker ps -q -f name=redis) redis-cli ping > /dev/null 2>&1; then
        error "Redis health check failed"
    fi
    
    log "All health checks passed"
}

# Cleanup old backups
cleanup_old_backups() {
    log "Cleaning up old backups..."
    find /backups -type d -mtime +$BACKUP_RETENTION_DAYS -exec rm -rf {} +
    log "Old backups cleaned up"
}

# Rollback function
rollback() {
    warn "Rolling back deployment..."
    
    # Get previous version
    previous_version=$(docker service inspect ${APP_NAME}_app --format '{{.PreviousSpec.TaskTemplate.ContainerSpec.Image}}' | cut -d':' -f2)
    
    if [[ -n "$previous_version" ]]; then
        docker service update --image "$REGISTRY/$APP_NAME:$previous_version" ${APP_NAME}_app
        log "Rollback to version $previous_version completed"
    else
        error "No previous version found for rollback"
    fi
}

# Main deployment process
main() {
    log "Starting production deployment for $APP_NAME version $APP_VERSION"
    
    # Trap errors and rollback
    trap 'error "Deployment failed. Initiating rollback..."; rollback' ERR
    
    pre_deployment_checks
    backup_current_state
    deploy_application
    health_checks
    cleanup_old_backups
    
    log "Production deployment completed successfully!"
}

# Script execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
```

**Production Monitoring Configuration:**

```yaml
# prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'docker'
    static_configs:
      - targets: ['docker-exporter:9323']

  - job_name: 'application'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:9113']
```

**Best Practices for Production:**

1. **High Availability:**
   - Use Docker Swarm or Kubernetes for orchestration
   - Implement load balancing and failover
   - Deploy across multiple availability zones
   - Use health checks and auto-restart policies

2. **Security:**
   - Use secrets management for sensitive data
   - Implement network segmentation
   - Regular security scanning and updates
   - Use non-root users in containers

3. **Monitoring and Logging:**
   - Comprehensive metrics collection
   - Centralized logging with ELK stack
   - Real-time alerting and notifications
   - Performance monitoring and profiling

4. **Backup and Recovery:**
   - Automated backup strategies
   - Regular disaster recovery testing
   - Point-in-time recovery capabilities
   - Cross-region backup replication

5. **Deployment Strategies:**
   - Blue-green deployments
   - Rolling updates with zero downtime
   - Automated rollback mechanisms
   - Canary deployments for risk mitigation

---

### Q19: How do you implement Docker registry management and image lifecycle?
**Difficulty: Expert**

**Answer:**
Docker registry management involves implementing secure, scalable image storage, distribution, and lifecycle management for enterprise environments.

**Private Docker Registry Setup:**

```yaml
# docker-compose.registry.yml
version: '3.8'

services:
  # Docker Registry
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    environment:
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /var/lib/registry
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: Registry Realm
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
      REGISTRY_HTTP_TLS_CERTIFICATE: /certs/domain.crt
      REGISTRY_HTTP_TLS_KEY: /certs/domain.key
      REGISTRY_STORAGE_DELETE_ENABLED: true
    volumes:
      - registry_data:/var/lib/registry
      - ./auth:/auth:ro
      - ./certs:/certs:ro
      - ./config.yml:/etc/docker/registry/config.yml:ro
    networks:
      - registry_network
    restart: unless-stopped

  # Registry UI
  registry-ui:
    image: joxit/docker-registry-ui:latest
    ports:
      - "8080:80"
    environment:
      REGISTRY_TITLE: Private Docker Registry
      REGISTRY_URL: https://registry:5000
      DELETE_IMAGES: true
      SHOW_CONTENT_DIGEST: true
      NGINX_PROXY_PASS_URL: https://registry:5000
      SINGLE_REGISTRY: true
    networks:
      - registry_network
    depends_on:
      - registry
    restart: unless-stopped

  # Registry Garbage Collector
  registry-gc:
    image: registry:2
    command: >
      sh -c '
        while true; do
          sleep 86400  # Run daily
          /bin/registry garbage-collect /etc/docker/registry/config.yml
        done
      '
    volumes:
      - registry_data:/var/lib/registry
      - ./config.yml:/etc/docker/registry/config.yml:ro
    networks:
      - registry_network
    depends_on:
      - registry
    restart: unless-stopped

  # Image Scanner (Trivy)
  trivy:
    image: aquasec/trivy:latest
    command: server --listen 0.0.0.0:4954
    ports:
      - "4954:4954"
    volumes:
      - trivy_cache:/root/.cache
    networks:
      - registry_network
    restart: unless-stopped

volumes:
  registry_data:
    driver: local
  trivy_cache:
    driver: local

networks:
  registry_network:
    driver: bridge
```

**Registry Configuration:**

```yaml
# config.yml
version: 0.1
log:
  fields:
    service: registry
storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
  delete:
    enabled: true
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
    Access-Control-Allow-Origin: ['*']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS', 'DELETE']
    Access-Control-Allow-Headers: ['Authorization', 'Accept', 'Cache-Control']
auth:
  htpasswd:
    realm: basic-realm
    path: /auth/htpasswd
health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
notifications:
  endpoints:
    - name: webhook
      url: http://webhook-service:8080/registry-webhook
      headers:
        Authorization: [Bearer <webhook-token>]
      events:
        - name: push
          mediatype: application/vnd.docker.distribution.manifest.v2+json
        - name: delete
          mediatype: application/vnd.docker.distribution.manifest.v2+json
```

**Image Lifecycle Management Script:**

```bash
#!/bin/bash
# image-lifecycle-manager.sh

set -euo pipefail

# Configuration
REGISTRY_URL="https://your-registry.com"
REGISTRY_USER="admin"
REGISTRY_PASS="password"
MAX_IMAGES_PER_REPO=10
MAX_AGE_DAYS=90
TRIVY_URL="http://trivy:4954"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging functions
log() { echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"; }
warn() { echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"; }
error() { echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"; }
info() { echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"; }

# Get registry token
get_registry_token() {
    local repo=$1
    curl -s -u "$REGISTRY_USER:$REGISTRY_PASS" \
        "$REGISTRY_URL/v2/token?service=registry&scope=repository:$repo:pull,push,delete" | \
        jq -r '.token'
}

# List all repositories
list_repositories() {
    curl -s -u "$REGISTRY_USER:$REGISTRY_PASS" \
        "$REGISTRY_URL/v2/_catalog" | \
        jq -r '.repositories[]'
}

# List tags for a repository
list_tags() {
    local repo=$1
    curl -s -u "$REGISTRY_USER:$REGISTRY_PASS" \
        "$REGISTRY_URL/v2/$repo/tags/list" | \
        jq -r '.tags[]? // empty'
}

# Get image manifest
get_manifest() {
    local repo=$1
    local tag=$2
    local token=$(get_registry_token "$repo")
    
    curl -s -H "Authorization: Bearer $token" \
        -H "Accept: application/vnd.docker.distribution.manifest.v2+json" \
        "$REGISTRY_URL/v2/$repo/manifests/$tag"
}

# Get image creation date
get_image_date() {
    local repo=$1
    local tag=$2
    local manifest=$(get_manifest "$repo" "$tag")
    local config_digest=$(echo "$manifest" | jq -r '.config.digest')
    local token=$(get_registry_token "$repo")
    
    curl -s -H "Authorization: Bearer $token" \
        "$REGISTRY_URL/v2/$repo/blobs/$config_digest" | \
        jq -r '.created'
}

# Delete image
delete_image() {
    local repo=$1
    local tag=$2
    local token=$(get_registry_token "$repo")
    local manifest=$(get_manifest "$repo" "$tag")
    local digest=$(echo "$manifest" | jq -r '.config.digest')
    
    curl -s -X DELETE \
        -H "Authorization: Bearer $token" \
        "$REGISTRY_URL/v2/$repo/manifests/$digest"
}

# Scan image for vulnerabilities
scan_image() {
    local image=$1
    local output_file="/tmp/scan_$(echo $image | tr '/' '_' | tr ':' '_').json"
    
    curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "{\"image\": \"$image\"}" \
        "$TRIVY_URL/scan" > "$output_file"
    
    # Parse scan results
    local critical=$(jq '.Results[]?.Vulnerabilities[]? | select(.Severity == "CRITICAL") | length' "$output_file" | wc -l)
    local high=$(jq '.Results[]?.Vulnerabilities[]? | select(.Severity == "HIGH") | length' "$output_file" | wc -l)
    
    echo "$critical,$high"
}

# Generate image report
generate_image_report() {
    local repo=$1
    local output_file="reports/image_report_$(date +%Y%m%d_%H%M%S).json"
    
    mkdir -p reports
    
    log "Generating image report for repository: $repo"
    
    local report='{
        "repository": "'$repo'",
        "scan_date": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
        "images": ['
    
    local first=true
    for tag in $(list_tags "$repo"); do
        if [[ "$first" == "false" ]]; then
            report="$report,"
        fi
        first=false
        
        local image="$REGISTRY_URL/$repo:$tag"
        local created=$(get_image_date "$repo" "$tag")
        local scan_result=$(scan_image "$image")
        local critical=$(echo "$scan_result" | cut -d',' -f1)
        local high=$(echo "$scan_result" | cut -d',' -f2)
        
        report="$report
            {
                \"tag\": \"$tag\",
                \"created\": \"$created\",
                \"vulnerabilities\": {
                    \"critical\": $critical,
                    \"high\": $high
                }
            }"
    done
    
    report="$report
        ]
    }"
    
    echo -e "$report" | jq '.' > "$output_file"
    log "Report generated: $output_file"
}

# Clean old images
clean_old_images() {
    local repo=$1
    
    log "Cleaning old images for repository: $repo"
    
    # Get all tags with creation dates
    declare -A image_dates
    for tag in $(list_tags "$repo"); do
        local created=$(get_image_date "$repo" "$tag")
        image_dates["$tag"]="$created"
    done
    
    # Sort by date and keep only recent images
    local sorted_tags=($(for tag in "${!image_dates[@]}"; do
        echo "${image_dates[$tag]} $tag"
    done | sort -r | head -n "$MAX_IMAGES_PER_REPO" | cut -d' ' -f2))
    
    # Delete old images
    for tag in $(list_tags "$repo"); do
        if [[ ! " ${sorted_tags[@]} " =~ " $tag " ]]; then
            warn "Deleting old image: $repo:$tag"
            delete_image "$repo" "$tag"
        fi
    done
    
    # Delete images older than MAX_AGE_DAYS
    local cutoff_date=$(date -d "$MAX_AGE_DAYS days ago" +%s)
    for tag in "${!image_dates[@]}"; do
        local image_date=$(date -d "${image_dates[$tag]}" +%s)
        if [[ $image_date -lt $cutoff_date ]]; then
            warn "Deleting expired image: $repo:$tag"
            delete_image "$repo" "$tag"
        fi
    done
}

# Main lifecycle management
manage_lifecycle() {
    log "Starting image lifecycle management"
    
    for repo in $(list_repositories); do
        info "Processing repository: $repo"
        
        # Generate report
        generate_image_report "$repo"
        
        # Clean old images
        clean_old_images "$repo"
        
        # Check for vulnerable images
        for tag in $(list_tags "$repo"); do
            local image="$REGISTRY_URL/$repo:$tag"
            local scan_result=$(scan_image "$image")
            local critical=$(echo "$scan_result" | cut -d',' -f1)
            
            if [[ $critical -gt 0 ]]; then
                error "Critical vulnerabilities found in $image"
                # Optionally delete or quarantine vulnerable images
                # delete_image "$repo" "$tag"
            fi
        done
    done
    
    # Run garbage collection
    log "Running registry garbage collection"
    docker exec registry_registry_1 /bin/registry garbage-collect /etc/docker/registry/config.yml
    
    log "Image lifecycle management completed"
}

# Script execution
case "${1:-}" in
    "lifecycle")
        manage_lifecycle
        ;;
    "report")
        if [[ -n "${2:-}" ]]; then
            generate_image_report "$2"
        else
            error "Repository name required for report generation"
        fi
        ;;
    "clean")
        if [[ -n "${2:-}" ]]; then
            clean_old_images "$2"
        else
            error "Repository name required for cleaning"
        fi
        ;;
    "scan")
        if [[ -n "${2:-}" ]]; then
            scan_image "$2"
        else
            error "Image name required for scanning"
        fi
        ;;
    *)
        echo "Usage: $0 {lifecycle|report <repo>|clean <repo>|scan <image>}"
        exit 1
        ;;
esac
```

**Registry Security and Best Practices:**

1. **Authentication and Authorization:**
   - Use strong authentication mechanisms
   - Implement role-based access control
   - Regular credential rotation
   - Integration with enterprise identity providers

2. **Image Security:**
   - Automated vulnerability scanning
   - Image signing and verification
   - Base image management
   - Security policy enforcement

3. **Storage and Performance:**
   - Efficient storage backends
   - Image layer caching
   - Content delivery networks
   - Storage optimization and cleanup

4. **Monitoring and Auditing:**
   - Registry access logging
   - Image pull/push metrics
   - Storage usage monitoring
   - Security event alerting

---

### Q20: How do you implement Docker ecosystem integration with modern DevOps tools?
**Difficulty: Expert**

**Answer:**
Docker ecosystem integration involves seamlessly connecting Docker with modern DevOps tools for comprehensive CI/CD, monitoring, security, and infrastructure management.

**Complete DevOps Integration Architecture:**

```yaml
# docker-compose.devops.yml
version: '3.8'

services:
  # GitLab CI/CD Runner
  gitlab-runner:
    image: gitlab/gitlab-runner:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - gitlab_runner_config:/etc/gitlab-runner
    environment:
      - DOCKER_HOST=unix:///var/run/docker.sock
    networks:
      - devops
    restart: unless-stopped

  # Jenkins with Docker
  jenkins:
    image: jenkins/jenkins:lts
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=false
    networks:
      - devops
    restart: unless-stopped

  # SonarQube for Code Quality
  sonarqube:
    image: sonarqube:community
    ports:
      - "9000:9000"
    environment:
      - SONAR_JDBC_URL=jdbc:postgresql://postgres:5432/sonar
      - SONAR_JDBC_USERNAME=sonar
      - SONAR_JDBC_PASSWORD=sonar
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_logs:/opt/sonarqube/logs
      - sonarqube_extensions:/opt/sonarqube/extensions
    networks:
      - devops
    depends_on:
      - postgres
    restart: unless-stopped

  # Nexus Repository Manager
  nexus:
    image: sonatype/nexus3:latest
    ports:
      - "8081:8081"
    volumes:
      - nexus_data:/nexus-data
    environment:
      - INSTALL4J_ADD_VM_PARAMS=-Xms2g -Xmx2g -XX:MaxDirectMemorySize=3g
    networks:
      - devops
    restart: unless-stopped

  # HashiCorp Vault for Secrets
  vault:
    image: vault:latest
    ports:
      - "8200:8200"
    environment:
      - VAULT_DEV_ROOT_TOKEN_ID=myroot
      - VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:8200
    cap_add:
      - IPC_LOCK
    volumes:
      - vault_data:/vault/data
    networks:
      - devops
    restart: unless-stopped

  # Terraform for Infrastructure
  terraform:
    image: hashicorp/terraform:latest
    volumes:
      - ./terraform:/workspace
      - terraform_cache:/tmp
    working_dir: /workspace
    networks:
      - devops
    command: tail -f /dev/null

  # Ansible for Configuration Management
  ansible:
    image: ansible/ansible:latest
    volumes:
      - ./ansible:/ansible
      - ansible_cache:/tmp
    working_dir: /ansible
    networks:
      - devops
    command: tail -f /dev/null

  # ELK Stack for Logging
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - devops
    restart: unless-stopped

  logstash:
    image: docker.elastic.co/logstash/logstash:8.8.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline:ro
    networks:
      - devops
    depends_on:
      - elasticsearch
    restart: unless-stopped

  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    networks:
      - devops
    depends_on:
      - elasticsearch
    restart: unless-stopped

  # Prometheus for Metrics
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    networks:
      - devops
    restart: unless-stopped

  # Grafana for Visualization
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - devops
    restart: unless-stopped

  # Jaeger for Distributed Tracing
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"
      - "14268:14268"
    environment:
      - COLLECTOR_OTLP_ENABLED=true
    networks:
      - devops
    restart: unless-stopped

  # PostgreSQL for DevOps Tools
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=devops
      - POSTGRES_USER=devops
      - POSTGRES_PASSWORD=devops
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres/init:/docker-entrypoint-initdb.d:ro
    networks:
      - devops
    restart: unless-stopped

volumes:
  gitlab_runner_config:
  jenkins_home:
  sonarqube_data:
  sonarqube_logs:
  sonarqube_extensions:
  nexus_data:
  vault_data:
  terraform_cache:
  ansible_cache:
  elasticsearch_data:
  prometheus_data:
  grafana_data:
  postgres_data:

networks:
  devops:
    driver: bridge
```

**GitLab CI/CD Pipeline Integration:**

```yaml
# .gitlab-ci.yml
stages:
  - test
  - security
  - build
  - deploy
  - monitor

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  REGISTRY: $CI_REGISTRY
  IMAGE_NAME: $CI_REGISTRY_IMAGE
  KUBECONFIG: /tmp/kubeconfig

services:
  - docker:dind

before_script:
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

# Unit Tests
unit-tests:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test:unit
    - npm run test:coverage
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
  only:
    - merge_requests
    - main

# Integration Tests
integration-tests:
  stage: test
  image: docker/compose:latest
  script:
    - docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
    - docker-compose -f docker-compose.test.yml down
  only:
    - merge_requests
    - main

# Security Scanning
security-scan:
  stage: security
  image: aquasec/trivy:latest
  script:
    - trivy fs --exit-code 1 --severity HIGH,CRITICAL .
    - trivy config --exit-code 1 .
  artifacts:
    reports:
      sast: trivy-results.json
  only:
    - merge_requests
    - main

# Code Quality
code-quality:
  stage: security
  image: sonarqube/sonar-scanner-cli:latest
  script:
    - sonar-scanner
      -Dsonar.projectKey=$CI_PROJECT_NAME
      -Dsonar.sources=.
      -Dsonar.host.url=$SONAR_HOST_URL
      -Dsonar.login=$SONAR_TOKEN
  only:
    - merge_requests
    - main

# Docker Build
build-image:
  stage: build
  image: docker:latest
  script:
    - docker build --target production -t $IMAGE_NAME:$CI_COMMIT_SHA .
    - docker tag $IMAGE_NAME:$CI_COMMIT_SHA $IMAGE_NAME:latest
    - docker push $IMAGE_NAME:$CI_COMMIT_SHA
    - docker push $IMAGE_NAME:latest
    # Scan built image
    - trivy image --exit-code 1 --severity HIGH,CRITICAL $IMAGE_NAME:$CI_COMMIT_SHA
  only:
    - main

# Deploy to Staging
deploy-staging:
  stage: deploy
  image: bitnami/kubectl:latest
  environment:
    name: staging
    url: https://staging.example.com
  script:
    - echo $KUBE_CONFIG | base64 -d > $KUBECONFIG
    - kubectl set image deployment/app app=$IMAGE_NAME:$CI_COMMIT_SHA -n staging
    - kubectl rollout status deployment/app -n staging
    # Run smoke tests
    - kubectl run smoke-test --image=curlimages/curl --rm -i --restart=Never -- curl -f http://app-service.staging.svc.cluster.local/health
  only:
    - main

# Deploy to Production
deploy-production:
  stage: deploy
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://production.example.com
  script:
    - echo $KUBE_CONFIG | base64 -d > $KUBECONFIG
    - kubectl set image deployment/app app=$IMAGE_NAME:$CI_COMMIT_SHA -n production
    - kubectl rollout status deployment/app -n production
    # Health check
    - kubectl run health-check --image=curlimages/curl --rm -i --restart=Never -- curl -f http://app-service.production.svc.cluster.local/health
  when: manual
  only:
    - main

# Post-deployment Monitoring
post-deploy-monitor:
  stage: monitor
  image: curlimages/curl:latest
  script:
    # Send deployment notification to Slack
    - |
      curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"Deployment completed: '$CI_PROJECT_NAME' version '$CI_COMMIT_SHA' to production"}' \
        $SLACK_WEBHOOK_URL
    # Trigger synthetic monitoring
    - |
      curl -X POST -H 'Content-type: application/json' \
        --data '{"deployment_id":"'$CI_COMMIT_SHA'","environment":"production"}' \
        $MONITORING_WEBHOOK_URL
  only:
    - main
  when: on_success
```

**Terraform Infrastructure as Code:**

```hcl
# terraform/main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
  
  backend "s3" {
    bucket = "terraform-state-bucket"
    key    = "docker-infrastructure/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
}

# EKS Cluster for Docker Workloads
module "eks" {
  source = "terraform-aws-modules/eks/aws"
  
  cluster_name    = var.cluster_name
  cluster_version = "1.27"
  
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  
  eks_managed_node_groups = {
    main = {
      desired_size = 3
      max_size     = 10
      min_size     = 1
      
      instance_types = ["t3.medium"]
      
      k8s_labels = {
        Environment = var.environment
        Application = "docker-workloads"
      }
    }
  }
  
  tags = {
    Environment = var.environment
    Terraform   = "true"
  }
}

# ECR Repository for Docker Images
resource "aws_ecr_repository" "app_repo" {
  name                 = var.app_name
  image_tag_mutability = "MUTABLE"
  
  image_scanning_configuration {
    scan_on_push = true
  }
  
  lifecycle_policy {
    policy = jsonencode({
      rules = [
        {
          rulePriority = 1
          description  = "Keep last 30 images"
          selection = {
            tagStatus     = "tagged"
            tagPrefixList = ["v"]
            countType     = "imageCountMoreThan"
            countNumber   = 30
          }
          action = {
            type = "expire"
          }
        }
      ]
    })
  }
}

# Application Load Balancer
resource "aws_lb" "app_lb" {
  name               = "${var.app_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets           = module.vpc.public_subnets
  
  enable_deletion_protection = false
  
  tags = {
    Environment = var.environment
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "app_logs" {
  name              = "/aws/eks/${var.cluster_name}/application"
  retention_in_days = 30
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
}

# Outputs
output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.app_repo.repository_url
}
```

**Ansible Configuration Management:**

```yaml
# ansible/docker-setup.yml
---
- name: Configure Docker Environment
  hosts: docker_hosts
  become: yes
  vars:
    docker_version: "24.0"
    docker_compose_version: "2.20.0"
    
  tasks:
    - name: Update system packages
      package:
        name: "*"
        state: latest
      when: ansible_os_family == "RedHat"
    
    - name: Install Docker dependencies
      package:
        name:
          - apt-transport-https
          - ca-certificates
          - curl
          - gnupg
          - lsb-release
        state: present
      when: ansible_os_family == "Debian"
    
    - name: Add Docker GPG key
      apt_key:
        url: https://download.docker.com/linux/ubuntu/gpg
        state: present
      when: ansible_os_family == "Debian"
    
    - name: Add Docker repository
      apt_repository:
        repo: "deb [arch=amd64] https://download.docker.com/linux/ubuntu {{ ansible_distribution_release }} stable"
        state: present
      when: ansible_os_family == "Debian"
    
    - name: Install Docker
      package:
        name: docker-ce
        state: present
    
    - name: Start and enable Docker service
      systemd:
        name: docker
        state: started
        enabled: yes
    
    - name: Install Docker Compose
      get_url:
        url: "https://github.com/docker/compose/releases/download/v{{ docker_compose_version }}/docker-compose-{{ ansible_system }}-{{ ansible_architecture }}"
        dest: /usr/local/bin/docker-compose
        mode: '0755'
    
    - name: Create docker group
      group:
        name: docker
        state: present
    
    - name: Add users to docker group
      user:
        name: "{{ item }}"
        groups: docker
        append: yes
      loop: "{{ docker_users | default([]) }}"
    
    - name: Configure Docker daemon
      template:
        src: daemon.json.j2
        dest: /etc/docker/daemon.json
        backup: yes
      notify: restart docker
    
    - name: Install monitoring agents
      docker_container:
        name: node-exporter
        image: prom/node-exporter:latest
        ports:
          - "9100:9100"
        restart_policy: unless-stopped
        volumes:
          - "/proc:/host/proc:ro"
          - "/sys:/host/sys:ro"
          - "/:/rootfs:ro"
        command: >
          --path.procfs=/host/proc
          --path.rootfs=/rootfs
          --path.sysfs=/host/sys
          --collector.filesystem.mount-points-exclude='^/(sys|proc|dev|host|etc)($$|/)'
  
  handlers:
    - name: restart docker
      systemd:
        name: docker
        state: restarted
```

**Integration Best Practices:**

1. **CI/CD Integration:**
   - Automated testing and security scanning
   - Multi-stage deployments with approval gates
   - Rollback mechanisms and canary deployments
   - Integration with multiple CI/CD platforms

2. **Infrastructure as Code:**
   - Version-controlled infrastructure definitions
   - Automated provisioning and scaling
   - Environment consistency and reproducibility
   - Cost optimization and resource management

3. **Monitoring and Observability:**
   - Comprehensive metrics collection
   - Distributed tracing and logging
   - Real-time alerting and incident response
   - Performance optimization and capacity planning

4. **Security Integration:**
   - Automated vulnerability scanning
   - Secrets management and rotation
   - Compliance monitoring and reporting
   - Zero-trust security architecture

5. **DevOps Culture:**
   - Collaboration between development and operations
   - Continuous improvement and learning
   - Automation and self-service capabilities
   - Standardization and best practices

---

This comprehensive Docker guide covers fundamental concepts, practical examples, and real-world scenarios for containerization and orchestration in modern web development.