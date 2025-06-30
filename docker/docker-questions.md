# Docker & DevOps Interview Questions

## Table of Contents
1. [Docker Fundamentals](#docker-fundamentals)
2. [Docker Images and Containers](#docker-images-and-containers)
3. [Dockerfile Best Practices](#dockerfile-best-practices)
4. [Docker Compose](#docker-compose)
5. [Container Orchestration](#container-orchestration)
6. [Docker Networking](#docker-networking)
7. [Security and Production](#security-and-production)
8. [CI/CD Integration](#cicd-integration)

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
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Redis connection using container name
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'redis',  // Container name
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || 'secret',
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('Redis server connection refused');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Redis retry time exhausted');
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  }
});

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

This comprehensive Docker guide covers fundamental concepts, practical examples, and real-world scenarios for containerization and orchestration in modern web development.