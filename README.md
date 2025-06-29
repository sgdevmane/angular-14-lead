# Angular 14 Lead Engineer Interview Preparation

A comprehensive collection of interview questions and answers for Angular 14 Lead Engineer positions, featuring both Angular-specific topics and JavaScript fundamentals.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Content Coverage](#content-coverage)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This repository contains meticulously crafted interview preparation materials specifically designed for Angular 14 Lead Engineer positions. The content covers both Angular-specific concepts and essential JavaScript fundamentals that every senior developer should master.

### Key Highlights

- **Comprehensive Coverage**: 25+ detailed questions across Angular and JavaScript
- **Production-Ready Examples**: Real-world code snippets and best practices
- **Interactive HTML Format**: Beautiful, responsive design with syntax highlighting
- **Markdown Source**: Easy-to-read and edit source files
- **Print-Friendly**: Optimized for both screen and print viewing

## 📁 Project Structure

```
angular-14-lead/
├── angular/
│   ├── angular-questions.md          # Angular questions in Markdown
│   └── angular-questions.html        # Angular questions in HTML format
├── javascript/
│   ├── javascript-questions.md       # JavaScript questions in Markdown
│   └── javascript-questions.html     # JavaScript questions in HTML format
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

## ✨ Features

### Angular Questions Coverage
- **Fundamentals**: Core concepts, architecture, and components
- **Advanced Topics**: Change detection, performance optimization
- **Angular 14 Features**: Standalone components, functional guards, strict typed forms
- **Best Practices**: Testing strategies, security, state management (NgRx)
- **Real-World Examples**: HTTP services, routing, form handling

### JavaScript Questions Coverage
- **Core Concepts**: Data types, scope, hoisting, closures
- **Modern JavaScript**: ES6+ features, async/await, modules
- **Advanced Topics**: Event loop, performance optimization
- **Practical Examples**: Code snippets with expected outputs
- **Best Practices**: Memory management, error handling

### HTML Format Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Syntax Highlighting**: Powered by Prism.js for beautiful code display
- **Smooth Navigation**: Table of contents with smooth scrolling
- **Print Optimization**: Clean printing with proper page breaks
- **Modern UI**: Professional styling with CSS Grid and Flexbox

## 🚀 Getting Started

### Prerequisites

- **Docker & Docker Compose** (recommended for production deployment)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.) for editing

### Quick Start with Docker (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/angular-14-lead.git
   cd angular-14-lead
   ```

2. **Run with Docker Compose** (easiest method):
   ```bash
   # Production mode (optimized for performance)
   docker-compose up -d
   # Access at: http://localhost:8080
   
   # Development mode (with live reload)
   docker-compose --profile development up -d interview-guide-dev
   # Access at: http://localhost:3000
   ```

3. **Or use the convenience scripts**:
   ```bash
   # Build and run production
   ./scripts/run.sh production
   
   # Build and run development
   ./scripts/run.sh development
   
   # Build only
   ./scripts/build.sh production --clean
   
   # Stop all containers
   ./scripts/run.sh --stop
   ```

### Alternative: Local Development Server

1. **Open HTML files directly in browser**:
   ```bash
   # For Angular questions
   open angular/angular-questions.html
   
   # For JavaScript questions
   open javascript/javascript-questions.html
   ```

2. **Or serve with a local server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

   Then navigate to:
   - Angular: `http://localhost:8000/angular/angular-questions.html`
   - JavaScript: `http://localhost:8000/javascript/javascript-questions.html`

## 🐳 Docker Deployment

### Docker Architecture

The application uses a multi-stage Docker build with Nginx for optimal performance:

- **Stage 1**: Node.js builder (for future extensibility)
- **Stage 2**: Nginx production server with optimized configuration

### Configuration Files

```
docker/
├── nginx-prod.conf     # Production Nginx configuration
└── nginx-dev.conf      # Development Nginx configuration
```

### Environment-Specific Configurations

#### Production Configuration (`nginx-prod.conf`)
- **Optimized for performance**: Gzip compression, caching headers
- **Security headers**: XSS protection, content type options, CSP
- **Static asset caching**: 1-year cache for JS/CSS/images
- **Health check endpoint**: `/health`
- **API info endpoint**: `/api/info`

#### Development Configuration (`nginx-dev.conf`)
- **Development-friendly**: No caching, CORS enabled
- **Live reload support**: Disabled sendfile for file watching
- **Debug logging**: Detailed error and access logs
- **Dev info endpoint**: `/dev-info`

### Docker Commands

#### Using Docker Compose (Recommended)

```bash
# Production deployment
docker-compose up -d

# Development with live reload
docker-compose --profile development up -d interview-guide-dev

# With monitoring stack
docker-compose --profile monitoring up -d

# With Traefik reverse proxy
docker-compose --profile traefik up -d

# Full stack (dev + monitoring + traefik)
docker-compose --profile development --profile monitoring --profile traefik up -d

# View logs
docker-compose logs -f interview-guide

# Stop all services
docker-compose down
```

#### Using Docker Build Directly

```bash
# Build production image
docker build --build-arg NGINX_CONFIG=nginx-prod.conf -t angular-interview-guide:latest .

# Build development image
docker build --build-arg NGINX_CONFIG=nginx-dev.conf -t angular-interview-guide:dev .

# Run production container
docker run -d --name interview-guide -p 8080:80 angular-interview-guide:latest

# Run development container
docker run -d --name interview-guide-dev -p 3000:80 angular-interview-guide:dev
```

### Convenience Scripts

#### Build Script (`./scripts/build.sh`)

```bash
# Build production image
./scripts/build.sh production

# Build development image
./scripts/build.sh development

# Clean build with run
./scripts/build.sh production --clean --run

# Build and push to registry
./scripts/build.sh production --push
```

#### Run Script (`./scripts/run.sh`)

```bash
# Run production (detached)
./scripts/run.sh production

# Run development (detached)
./scripts/run.sh development

# Run in foreground
./scripts/run.sh --foreground

# Rebuild and run
./scripts/run.sh --rebuild

# Clean rebuild
./scripts/run.sh --clean

# Stop all containers
./scripts/run.sh --stop

# Show logs
./scripts/run.sh --logs
```

### Health Monitoring

#### Health Check Endpoints

- **Production**: `http://localhost:8080/health`
- **Development**: `http://localhost:3000/health`
- **API Info**: `http://localhost:8080/api/info`
- **Dev Info**: `http://localhost:3000/dev-info`

#### Docker Health Checks

```bash
# Check container health
docker ps

# View health check logs
docker inspect interview-guide --format='{{.State.Health}}'

# Manual health check
curl -f http://localhost:8080/health
```

### Production Deployment

#### Cloud Deployment

```bash
# Build for production
docker build --build-arg NGINX_CONFIG=nginx-prod.conf -t your-registry/angular-interview-guide:latest .

# Push to registry
docker push your-registry/angular-interview-guide:latest

# Deploy to cloud (example for AWS ECS, GCP Cloud Run, etc.)
# Follow your cloud provider's container deployment guide
```

#### Kubernetes Deployment

```yaml
# Example Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: angular-interview-guide
spec:
  replicas: 3
  selector:
    matchLabels:
      app: angular-interview-guide
  template:
    metadata:
      labels:
        app: angular-interview-guide
    spec:
      containers:
      - name: app
        image: your-registry/angular-interview-guide:latest
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
```

### Troubleshooting

#### Common Issues

1. **"Server isn't available" error**:
   ```bash
   # Check if container is running
   docker ps
   
   # Check container logs
   docker logs interview-guide
   
   # Restart container
   docker restart interview-guide
   ```

2. **Port conflicts**:
   ```bash
   # Use different ports
   docker run -p 8081:80 angular-interview-guide:latest
   ```

3. **Configuration issues**:
   ```bash
   # Rebuild with clean slate
   ./scripts/run.sh --clean
   ```

4. **Permission issues**:
   ```bash
   # Make scripts executable
   chmod +x scripts/*.sh
   ```

#### Debug Mode

```bash
# Run in development mode for debugging
docker-compose --profile development up interview-guide-dev

# Check nginx configuration
docker exec interview-guide nginx -t

# View nginx error logs
docker exec interview-guide tail -f /var/log/nginx/error.log
```

## 📚 Content Coverage

### Angular Questions (12 Topics)

1. **Angular Fundamentals** - Core concepts and architecture
2. **Architecture & Components** - Component lifecycle and communication
3. **Routing & Navigation** - Advanced routing techniques
4. **Forms & Validation** - Template-driven vs Reactive forms
5. **HTTP Client & Services** - API integration and interceptors
6. **Change Detection** - OnPush strategy and optimization
7. **Pipes & Transformations** - Custom pipes and data transformation
8. **Testing Strategies** - Unit and integration testing
9. **Security Best Practices** - XSS prevention and authentication
10. **State Management (NgRx)** - Complete NgRx implementation
11. **Angular 14 Features** - Latest features and improvements
12. **Performance Optimization** - Advanced optimization techniques

### JavaScript Questions (13 Topics)

1. **Data Types** - Primitive and reference types
2. **Operators** - Equality operators and type coercion
3. **Hoisting** - Variable and function hoisting
4. **Variables** - var, let, const differences
5. **Closures** - Scope and closure patterns
6. **Async Programming** - Promises and async/await
7. **Destructuring** - Array and object destructuring
8. **Template Literals** - String interpolation and tagged templates
9. **Event Loop** - Asynchronous execution model
10. **ES6 Modules** - Import/export patterns
11. **Event Delegation** - Efficient event handling
12. **Performance Optimization** - Code and memory optimization
13. **Guess the Output** - Challenging code snippets

## 💡 Usage

### Interactive Web Interface
The project includes a modern, interactive web interface (`index.html`) that provides:

**🚀 Getting Started:**
```bash
# Clone the repository
git clone <repository-url>
cd angular-14-lead

# Start a local server
python3 -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000

# Open in browser
open http://localhost:8000
```

**✨ Features:**
- **Dynamic Content Loading**: All markdown files are loaded dynamically
- **Syntax Highlighting**: Code examples with Prism.js highlighting
- **Search Functionality**: Find topics across all files
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Print Support**: Print individual sections
- **Dark/Light Theme**: Toggle between themes
- **Table of Contents**: Auto-generated for each topic
- **Copy Code**: One-click code copying
- **Keyboard Shortcuts**: Ctrl+P (print), Ctrl+F (search)

### For Interview Preparation
- Browse questions by topic using the sidebar navigation
- Use the search box to find specific concepts quickly
- Practice coding examples with syntax highlighting
- Print sections for offline study
- Toggle between light and dark themes for comfortable reading

### For Interviewers
- Select appropriate questions based on candidate level
- Use interactive code examples to assess practical skills
- Reference detailed explanations for evaluation
- Print specific sections for interview sessions

### Customization

- **Add new markdown files to any topic directory**
- **Update `index.html` navigation to include new files**
- **Modify styling using CSS custom properties**
- **Extend functionality with additional JavaScript features**

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript**: Interactive features and smooth scrolling
- **Prism.js**: Syntax highlighting for code blocks

### Content Format
- **Markdown**: Source content in readable format
- **HTML**: Presentation layer with enhanced styling

### Development Tools
- **Git**: Version control
- **VS Code**: Recommended editor with Markdown preview

## 🤝 Contributing

We welcome contributions to improve the interview preparation materials!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-question`
3. **Add your content**: Follow existing format and style
4. **Test your changes**: Ensure HTML renders correctly
5. **Commit your changes**: `git commit -m "Add new Angular question about..."`
6. **Push to branch**: `git push origin feature/new-question`
7. **Create Pull Request**: Describe your changes clearly

### Contribution Guidelines

- **Quality**: Ensure accuracy and clarity of content
- **Format**: Follow existing markdown and HTML structure
- **Examples**: Include practical code examples
- **Testing**: Verify all code examples work correctly
- **Documentation**: Update README if adding new sections

### Areas for Contribution

- Additional Angular questions (RxJS, Testing, Performance)
- More JavaScript advanced topics (Web APIs, Design Patterns)
- TypeScript-specific questions
- Code review and fact-checking
- UI/UX improvements
- Mobile responsiveness enhancements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Angular Team**: For the amazing framework and documentation
- **JavaScript Community**: For continuous innovation and best practices
- **Prism.js**: For beautiful syntax highlighting
- **Contributors**: Everyone who helps improve this resource

## 📞 Support

If you find this resource helpful, please:

- ⭐ Star the repository
- 🐛 Report issues or bugs
- 💡 Suggest improvements
- 🤝 Contribute new content

---

**Good luck with your Angular 14 Lead Engineer interview preparation!** 🚀

*Last updated: 2024*