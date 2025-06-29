#!/bin/bash

# Build script for Angular Interview Guide
# Usage: ./scripts/build.sh [environment] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="production"
CLEAN=false
PUSH=false
RUN=false

# Function to display usage
show_usage() {
    echo -e "${BLUE}Angular Interview Guide Build Script${NC}"
    echo ""
    echo "Usage: $0 [environment] [options]"
    echo ""
    echo "Environments:"
    echo "  production (default) - Build with production nginx config"
    echo "  development         - Build with development nginx config"
    echo ""
    echo "Options:"
    echo "  --clean            - Clean existing images before building"
    echo "  --push             - Push image to registry after building"
    echo "  --run              - Run the container after building"
    echo "  --help             - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                           # Build production image"
    echo "  $0 development               # Build development image"
    echo "  $0 production --clean --run  # Clean, build, and run production"
    echo "  $0 development --run         # Build and run development"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        production|prod)
            ENVIRONMENT="production"
            shift
            ;;
        development|dev)
            ENVIRONMENT="development"
            shift
            ;;
        --clean)
            CLEAN=true
            shift
            ;;
        --push)
            PUSH=true
            shift
            ;;
        --run)
            RUN=true
            shift
            ;;
        --help|-h)
            show_usage
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            show_usage
            exit 1
            ;;
    esac
done

# Set nginx config based on environment
if [[ "$ENVIRONMENT" == "development" ]]; then
    NGINX_CONFIG="nginx-dev.conf"
    IMAGE_TAG="angular-interview-guide:dev"
    CONTAINER_NAME="angular-interview-guide-dev"
    PORT="3000"
else
    NGINX_CONFIG="nginx-prod.conf"
    IMAGE_TAG="angular-interview-guide:latest"
    CONTAINER_NAME="angular-interview-guide"
    PORT="8080"
fi

echo -e "${BLUE}Building Angular Interview Guide${NC}"
echo -e "Environment: ${YELLOW}$ENVIRONMENT${NC}"
echo -e "Nginx Config: ${YELLOW}$NGINX_CONFIG${NC}"
echo -e "Image Tag: ${YELLOW}$IMAGE_TAG${NC}"
echo ""

# Clean existing images if requested
if [[ "$CLEAN" == true ]]; then
    echo -e "${YELLOW}Cleaning existing images...${NC}"
    docker rmi "$IMAGE_TAG" 2>/dev/null || true
    docker system prune -f
fi

# Build the image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build \
    --build-arg NGINX_CONFIG="$NGINX_CONFIG" \
    --tag "$IMAGE_TAG" \
    --file Dockerfile \
    .

if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✓ Build completed successfully${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

# Push to registry if requested
if [[ "$PUSH" == true ]]; then
    echo -e "${YELLOW}Pushing image to registry...${NC}"
    docker push "$IMAGE_TAG"
fi

# Run the container if requested
if [[ "$RUN" == true ]]; then
    echo -e "${YELLOW}Stopping existing container...${NC}"
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
    
    echo -e "${YELLOW}Starting new container...${NC}"
    docker run -d \
        --name "$CONTAINER_NAME" \
        --port "$PORT:80" \
        --restart unless-stopped \
        "$IMAGE_TAG"
    
    echo -e "${GREEN}✓ Container started successfully${NC}"
    echo -e "${BLUE}Application available at: http://localhost:$PORT${NC}"
    echo -e "${BLUE}Health check: http://localhost:$PORT/health${NC}"
fi

echo -e "${GREEN}✓ All operations completed successfully${NC}"