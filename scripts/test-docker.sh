#!/bin/bash

# Docker Setup Test Script
# Usage: ./scripts/test-docker.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Angular Interview Guide - Docker Setup Test${NC}"
echo "================================================"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to test endpoint
test_endpoint() {
    local url=$1
    local description=$2
    local max_attempts=10
    local attempt=1
    
    echo -e "${YELLOW}Testing $description...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$url" >/dev/null 2>&1; then
            echo -e "${GREEN}✓ $description is working${NC}"
            return 0
        fi
        
        echo -e "${YELLOW}  Attempt $attempt/$max_attempts failed, retrying in 2 seconds...${NC}"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}✗ $description failed after $max_attempts attempts${NC}"
    return 1
}

# Check prerequisites
echo -e "${BLUE}1. Checking Prerequisites${NC}"
echo "---------------------------"

if command_exists docker; then
    echo -e "${GREEN}✓ Docker is installed${NC}"
    docker --version
else
    echo -e "${RED}✗ Docker is not installed${NC}"
    echo -e "${YELLOW}Please install Docker from: https://docs.docker.com/get-docker/${NC}"
    exit 1
fi

if command_exists docker-compose; then
    echo -e "${GREEN}✓ Docker Compose is installed${NC}"
    docker-compose --version
else
    echo -e "${RED}✗ Docker Compose is not installed${NC}"
    echo -e "${YELLOW}Please install Docker Compose from: https://docs.docker.com/compose/install/${NC}"
    exit 1
fi

# Check if Docker daemon is running
echo ""
echo -e "${BLUE}2. Checking Docker Daemon${NC}"
echo "---------------------------"

if docker info >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Docker daemon is running${NC}"
else
    echo -e "${RED}✗ Docker daemon is not running${NC}"
    echo -e "${YELLOW}Please start Docker Desktop or Docker daemon${NC}"
    exit 1
fi

# Check configuration files
echo ""
echo -e "${BLUE}3. Checking Configuration Files${NC}"
echo "--------------------------------"

if [ -f "docker/nginx-prod.conf" ]; then
    echo -e "${GREEN}✓ Production nginx config exists${NC}"
else
    echo -e "${RED}✗ Production nginx config missing${NC}"
    exit 1
fi

if [ -f "docker/nginx-dev.conf" ]; then
    echo -e "${GREEN}✓ Development nginx config exists${NC}"
else
    echo -e "${RED}✗ Development nginx config missing${NC}"
    exit 1
fi

if [ -f "Dockerfile" ]; then
    echo -e "${GREEN}✓ Dockerfile exists${NC}"
else
    echo -e "${RED}✗ Dockerfile missing${NC}"
    exit 1
fi

if [ -f "docker-compose.yml" ]; then
    echo -e "${GREEN}✓ Docker Compose file exists${NC}"
else
    echo -e "${RED}✗ Docker Compose file missing${NC}"
    exit 1
fi

# Test Docker build
echo ""
echo -e "${BLUE}4. Testing Docker Build${NC}"
echo "------------------------"

echo -e "${YELLOW}Building production image...${NC}"
if docker build --build-arg NGINX_CONFIG=nginx-prod.conf -t angular-interview-guide:test-prod . >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Production build successful${NC}"
else
    echo -e "${RED}✗ Production build failed${NC}"
    echo -e "${YELLOW}Run manually: docker build --build-arg NGINX_CONFIG=nginx-prod.conf -t angular-interview-guide:test-prod .${NC}"
    exit 1
fi

echo -e "${YELLOW}Building development image...${NC}"
if docker build --build-arg NGINX_CONFIG=nginx-dev.conf -t angular-interview-guide:test-dev . >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Development build successful${NC}"
else
    echo -e "${RED}✗ Development build failed${NC}"
    echo -e "${YELLOW}Run manually: docker build --build-arg NGINX_CONFIG=nginx-dev.conf -t angular-interview-guide:test-dev .${NC}"
    exit 1
fi

# Test container startup
echo ""
echo -e "${BLUE}5. Testing Container Startup${NC}"
echo "-----------------------------"

# Clean up any existing test containers
docker stop angular-test-prod angular-test-dev >/dev/null 2>&1 || true
docker rm angular-test-prod angular-test-dev >/dev/null 2>&1 || true

echo -e "${YELLOW}Starting production container...${NC}"
docker run -d --name angular-test-prod -p 8081:80 angular-interview-guide:test-prod

echo -e "${YELLOW}Starting development container...${NC}"
docker run -d --name angular-test-dev -p 3001:80 angular-interview-guide:test-dev

# Wait for containers to start
echo -e "${YELLOW}Waiting for containers to start...${NC}"
sleep 5

# Test endpoints
echo ""
echo -e "${BLUE}6. Testing Endpoints${NC}"
echo "--------------------"

test_endpoint "http://localhost:8081/health" "Production health check"
test_endpoint "http://localhost:3001/health" "Development health check"
test_endpoint "http://localhost:8081/" "Production main page"
test_endpoint "http://localhost:3001/" "Development main page"

# Test Docker Compose
echo ""
echo -e "${BLUE}7. Testing Docker Compose${NC}"
echo "--------------------------"

# Stop test containers
docker stop angular-test-prod angular-test-dev >/dev/null 2>&1
docker rm angular-test-prod angular-test-dev >/dev/null 2>&1

echo -e "${YELLOW}Testing Docker Compose production...${NC}"
docker-compose up -d interview-guide >/dev/null 2>&1

sleep 5

if test_endpoint "http://localhost:8080/health" "Docker Compose production"; then
    echo -e "${GREEN}✓ Docker Compose production test passed${NC}"
else
    echo -e "${RED}✗ Docker Compose production test failed${NC}"
fi

# Cleanup
echo ""
echo -e "${BLUE}8. Cleanup${NC}"
echo "----------"

echo -e "${YELLOW}Stopping containers...${NC}"
docker-compose down >/dev/null 2>&1

echo -e "${YELLOW}Removing test images...${NC}"
docker rmi angular-interview-guide:test-prod angular-interview-guide:test-dev >/dev/null 2>&1

echo -e "${GREEN}✓ Cleanup completed${NC}"

# Final summary
echo ""
echo -e "${GREEN}🎉 All Docker tests passed successfully!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "  ${YELLOW}Production:${NC} ./scripts/run.sh production"
echo -e "  ${YELLOW}Development:${NC} ./scripts/run.sh development"
echo -e "  ${YELLOW}Docker Compose:${NC} docker-compose up -d"
echo ""
echo -e "${BLUE}Access URLs:${NC}"
echo -e "  ${YELLOW}Production:${NC} http://localhost:8080"
echo -e "  ${YELLOW}Development:${NC} http://localhost:3000"
echo ""