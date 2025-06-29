#!/bin/bash

# Run script for Angular Interview Guide
# Usage: ./scripts/run.sh [environment] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="production"
DETACHED=true
REBUILD=false
CLEAN=false

# Function to display usage
show_usage() {
    echo -e "${BLUE}Angular Interview Guide Run Script${NC}"
    echo ""
    echo "Usage: $0 [environment] [options]"
    echo ""
    echo "Environments:"
    echo "  production (default) - Run production container"
    echo "  development         - Run development container"
    echo ""
    echo "Options:"
    echo "  --foreground       - Run in foreground (default: detached)"
    echo "  --rebuild          - Rebuild image before running"
    echo "  --clean            - Clean and rebuild everything"
    echo "  --logs             - Show container logs"
    echo "  --stop             - Stop running containers"
    echo "  --help             - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                     # Run production in detached mode"
    echo "  $0 development         # Run development in detached mode"
    echo "  $0 --foreground        # Run production in foreground"
    echo "  $0 --rebuild           # Rebuild and run production"
    echo "  $0 --stop              # Stop all containers"
    echo "  $0 --logs              # Show logs for running containers"
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
        --foreground|-f)
            DETACHED=false
            shift
            ;;
        --rebuild)
            REBUILD=true
            shift
            ;;
        --clean)
            CLEAN=true
            REBUILD=true
            shift
            ;;
        --logs)
            echo -e "${BLUE}Showing container logs...${NC}"
            docker-compose logs -f
            exit 0
            ;;
        --stop)
            echo -e "${YELLOW}Stopping all containers...${NC}"
            docker-compose down
            echo -e "${GREEN}✓ All containers stopped${NC}"
            exit 0
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

# Set configuration based on environment
if [[ "$ENVIRONMENT" == "development" ]]; then
    SERVICE_NAME="interview-guide-dev"
    PORT="3000"
    PROFILE="--profile development"
else
    SERVICE_NAME="interview-guide"
    PORT="8080"
    PROFILE=""
fi

echo -e "${BLUE}Running Angular Interview Guide${NC}"
echo -e "Environment: ${YELLOW}$ENVIRONMENT${NC}"
echo -e "Service: ${YELLOW}$SERVICE_NAME${NC}"
echo -e "Port: ${YELLOW}$PORT${NC}"
echo ""

# Clean if requested
if [[ "$CLEAN" == true ]]; then
    echo -e "${YELLOW}Cleaning existing containers and images...${NC}"
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
fi

# Rebuild if requested
if [[ "$REBUILD" == true ]]; then
    echo -e "${YELLOW}Rebuilding images...${NC}"
    docker-compose build $PROFILE $SERVICE_NAME
fi

# Stop existing containers
echo -e "${YELLOW}Stopping existing containers...${NC}"
docker-compose down

# Start the service
if [[ "$DETACHED" == true ]]; then
    echo -e "${YELLOW}Starting container in detached mode...${NC}"
    docker-compose $PROFILE up -d $SERVICE_NAME
    
    # Wait a moment for the container to start
    sleep 3
    
    # Check if container is running
    if docker-compose ps $SERVICE_NAME | grep -q "Up"; then
        echo -e "${GREEN}✓ Container started successfully${NC}"
        echo -e "${BLUE}Application available at: http://localhost:$PORT${NC}"
        echo -e "${BLUE}Health check: http://localhost:$PORT/health${NC}"
        
        # Test health endpoint
        echo -e "${YELLOW}Testing health endpoint...${NC}"
        sleep 2
        if curl -f "http://localhost:$PORT/health" >/dev/null 2>&1; then
            echo -e "${GREEN}✓ Health check passed${NC}"
        else
            echo -e "${RED}✗ Health check failed${NC}"
            echo -e "${YELLOW}Container logs:${NC}"
            docker-compose logs --tail=20 $SERVICE_NAME
        fi
        
        echo ""
        echo -e "${BLUE}Useful commands:${NC}"
        echo -e "  View logs: ${YELLOW}docker-compose logs -f $SERVICE_NAME${NC}"
        echo -e "  Stop container: ${YELLOW}docker-compose down${NC}"
        echo -e "  Restart: ${YELLOW}$0 $ENVIRONMENT${NC}"
    else
        echo -e "${RED}✗ Container failed to start${NC}"
        echo -e "${YELLOW}Container logs:${NC}"
        docker-compose logs $SERVICE_NAME
        exit 1
    fi
else
    echo -e "${YELLOW}Starting container in foreground mode...${NC}"
    echo -e "${BLUE}Press Ctrl+C to stop${NC}"
    docker-compose $PROFILE up $SERVICE_NAME
fi