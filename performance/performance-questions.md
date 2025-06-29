# Performance Optimization Interview Questions

## Table of Contents
1. [Web Performance Fundamentals](#web-performance-fundamentals)
2. [Core Web Vitals](#core-web-vitals)
3. [Loading Performance](#loading-performance)
4. [Runtime Performance](#runtime-performance)
5. [Memory Management](#memory-management)
6. [Network Optimization](#network-optimization)
7. [Image and Media Optimization](#image-and-media-optimization)
8. [JavaScript Performance](#javascript-performance)
9. [CSS Performance](#css-performance)
10. [Angular Performance](#angular-performance)

---

## Web Performance Fundamentals

### Q1: What are the key metrics for measuring web performance?

**Answer:**
Web performance is measured through various metrics that assess different aspects of user experience.

**Core Performance Metrics:**

1. **First Contentful Paint (FCP)**
   - Time when first text/image appears
   - Good: < 1.8s, Needs Improvement: 1.8s-3s, Poor: > 3s

2. **Largest Contentful Paint (LCP)**
   - Time when largest content element appears
   - Good: < 2.5s, Needs Improvement: 2.5s-4s, Poor: > 4s

3. **First Input Delay (FID)**
   - Time from first user interaction to browser response
   - Good: < 100ms, Needs Improvement: 100ms-300ms, Poor: > 300ms

4. **Cumulative Layout Shift (CLS)**
   - Visual stability of page elements
   - Good: < 0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25

5. **Time to Interactive (TTI)**
   - Time when page becomes fully interactive
   - Good: < 3.8s, Needs Improvement: 3.8s-7.3s, Poor: > 7.3s

**Measuring Performance:**
```javascript
// Performance Observer API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.startTime}ms`);
  }
});

observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

// Web Vitals library
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// Custom performance measurement
function measurePerformance() {
  const navigation = performance.getEntriesByType('navigation')[0];
  
  const metrics = {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ssl: navigation.connectEnd - navigation.secureConnectionStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domParsing: navigation.domContentLoadedEventStart - navigation.responseEnd,
    resourceLoading: navigation.loadEventStart - navigation.domContentLoadedEventStart
  };
  
  console.table(metrics);
  return metrics;
}

// Performance budget monitoring
class PerformanceBudget {
  constructor(budgets) {
    this.budgets = budgets;
    this.violations = [];
  }
  
  check() {
    const navigation = performance.getEntriesByType('navigation')[0];
    
    // Check load time budget
    if (navigation.loadEventEnd > this.budgets.loadTime) {
      this.violations.push({
        metric: 'Load Time',
        actual: navigation.loadEventEnd,
        budget: this.budgets.loadTime
      });
    }
    
    // Check resource count budget
    const resources = performance.getEntriesByType('resource');
    if (resources.length > this.budgets.resourceCount) {
      this.violations.push({
        metric: 'Resource Count',
        actual: resources.length,
        budget: this.budgets.resourceCount
      });
    }
    
    // Check total resource size budget
    const totalSize = resources.reduce((sum, resource) => {
      return sum + (resource.transferSize || 0);
    }, 0);
    
    if (totalSize > this.budgets.totalSize) {
      this.violations.push({
        metric: 'Total Size',
        actual: totalSize,
        budget: this.budgets.totalSize
      });
    }
    
    return this.violations;
  }
}

// Usage
const budget = new PerformanceBudget({
  loadTime: 3000, // 3 seconds
  resourceCount: 50,
  totalSize: 2 * 1024 * 1024 // 2MB
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const violations = budget.check();
    if (violations.length > 0) {
      console.warn('Performance budget violations:', violations);
    }
  }, 1000);
});
```

---

## Core Web Vitals

### Q2: How do you optimize Core Web Vitals?

**Answer:**
Core Web Vitals are essential metrics that measure real-world user experience.

**Optimizing Largest Contentful Paint (LCP):**
```html
<!-- Optimize LCP element loading -->
<!DOCTYPE html>
<html>
<head>
    <!-- Preload critical resources -->
    <link rel="preload" href="hero-image.webp" as="image">
    <link rel="preload" href="critical-font.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- Critical CSS inline -->
    <style>
        .hero {
            width: 100%;
            height: 60vh;
            background-image: url('hero-image.webp');
            background-size: cover;
            background-position: center;
        }
        
        .hero-text {
            font-family: 'CriticalFont', sans-serif;
            font-size: 3rem;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <!-- LCP element optimized -->
    <div class="hero">
        <h1 class="hero-text">Main Heading</h1>
    </div>
    
    <!-- Defer non-critical resources -->
    <link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="non-critical.css"></noscript>
</body>
</html>
```

**Optimizing First Input Delay (FID):**
```javascript
// Code splitting for better FID
// main.js
async function loadFeature() {
  const { FeatureModule } = await import('./feature.js');
  return new FeatureModule();
}

// Break up long tasks
function processLargeDataset(data) {
  return new Promise((resolve) => {
    const chunks = chunkArray(data, 100);
    let processedData = [];
    
    function processChunk(index) {
      if (index >= chunks.length) {
        resolve(processedData);
        return;
      }
      
      // Process chunk
      const processed = chunks[index].map(item => processItem(item));
      processedData = processedData.concat(processed);
      
      // Yield to main thread
      setTimeout(() => processChunk(index + 1), 0);
    }
    
    processChunk(0);
  });
}

// Use requestIdleCallback for non-critical work
function scheduleWork(task) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback((deadline) => {
      while (deadline.timeRemaining() > 0 && tasks.length > 0) {
        const task = tasks.shift();
        task();
      }
    });
  } else {
    setTimeout(task, 0);
  }
}

// Optimize event handlers
class OptimizedEventHandler {
  constructor() {
    this.isProcessing = false;
    this.pendingWork = [];
  }
  
  handleClick(event) {
    if (this.isProcessing) {
      this.pendingWork.push(() => this.processClick(event));
      return;
    }
    
    this.isProcessing = true;
    
    // Immediate feedback
    this.showLoadingState();
    
    // Defer heavy work
    setTimeout(() => {
      this.processClick(event);
      this.isProcessing = false;
      
      // Process pending work
      if (this.pendingWork.length > 0) {
        const nextWork = this.pendingWork.shift();
        nextWork();
      }
    }, 0);
  }
  
  showLoadingState() {
    // Immediate visual feedback
    document.getElementById('button').classList.add('loading');
  }
  
  processClick(event) {
    // Heavy processing here
    console.log('Processing click:', event);
    document.getElementById('button').classList.remove('loading');
  }
}
```

**Optimizing Cumulative Layout Shift (CLS):**
```css
/* Reserve space for dynamic content */
.image-container {
    width: 100%;
    height: 400px; /* Reserve height */
    background-color: #f0f0f0;
    position: relative;
}

.image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Use aspect-ratio for responsive images */
.responsive-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

/* Skeleton loading to prevent layout shift */
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Font loading optimization */
@font-face {
    font-family: 'WebFont';
    src: url('font.woff2') format('woff2');
    font-display: swap; /* Prevent invisible text during font load */
}

/* Prevent layout shift from ads */
.ad-container {
    width: 300px;
    height: 250px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

```javascript
// Prevent layout shift with JavaScript
class LayoutStabilizer {
  constructor() {
    this.observer = new ResizeObserver(this.handleResize.bind(this));
  }
  
  stabilizeElement(element) {
    // Measure current dimensions
    const rect = element.getBoundingClientRect();
    
    // Set explicit dimensions
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
    
    // Observe for changes
    this.observer.observe(element);
  }
  
  handleResize(entries) {
    for (const entry of entries) {
      const element = entry.target;
      const newRect = entry.contentRect;
      
      // Animate size changes to prevent jarring shifts
      element.style.transition = 'width 0.3s ease, height 0.3s ease';
      element.style.width = `${newRect.width}px`;
      element.style.height = `${newRect.height}px`;
    }
  }
}

// Image loading with size reservation
function loadImageWithoutShift(src, container) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Calculate aspect ratio
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      
      // Set container height based on width and aspect ratio
      const containerWidth = container.offsetWidth;
      container.style.height = `${containerWidth * aspectRatio}px`;
      
      // Add image to container
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      container.appendChild(img);
      
      resolve(img);
    };
    
    img.onerror = reject;
    img.src = src;
  });
}
```

---

## Loading Performance

### Q3: How do you optimize page loading performance?

**Answer:**
Loading performance optimization involves reducing the time it takes for a page to become usable.

**Resource Loading Optimization:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- DNS prefetch for external domains -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//api.example.com">
    
    <!-- Preconnect to critical third-party origins -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="critical.css" as="style">
    <link rel="preload" href="hero-image.webp" as="image">
    <link rel="preload" href="app.js" as="script">
    
    <!-- Critical CSS inline -->
    <style>
        /* Above-the-fold styles */
        body { margin: 0; font-family: system-ui; }
        .header { height: 60px; background: #007bff; }
        .hero { height: 50vh; background: url('hero-image.webp'); }
    </style>
    
    <!-- Non-critical CSS with media trick -->
    <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles.css"></noscript>
    
    <!-- Prefetch next page resources -->
    <link rel="prefetch" href="/next-page.html">
    <link rel="prefetch" href="next-page-image.webp">
</head>
<body>
    <!-- Content here -->
    
    <!-- Scripts at end of body -->
    <script src="critical.js"></script>
    <script src="app.js" defer></script>
    <script src="analytics.js" async></script>
</body>
</html>
```

**Code Splitting and Lazy Loading:**
```javascript
// Dynamic imports for code splitting
class AppRouter {
  constructor() {
    this.routes = new Map();
    this.loadedModules = new Map();
  }
  
  addRoute(path, moduleLoader) {
    this.routes.set(path, moduleLoader);
  }
  
  async navigate(path) {
    if (this.loadedModules.has(path)) {
      return this.loadedModules.get(path);
    }
    
    const moduleLoader = this.routes.get(path);
    if (!moduleLoader) {
      throw new Error(`Route not found: ${path}`);
    }
    
    // Show loading indicator
    this.showLoading();
    
    try {
      const module = await moduleLoader();
      this.loadedModules.set(path, module);
      this.hideLoading();
      return module;
    } catch (error) {
      this.hideLoading();
      this.showError(error);
      throw error;
    }
  }
  
  showLoading() {
    document.getElementById('loading').style.display = 'block';
  }
  
  hideLoading() {
    document.getElementById('loading').style.display = 'none';
  }
  
  showError(error) {
    console.error('Failed to load module:', error);
  }
}

// Usage
const router = new AppRouter();

router.addRoute('/dashboard', () => import('./dashboard.js'));
router.addRoute('/profile', () => import('./profile.js'));
router.addRoute('/settings', () => import('./settings.js'));

// Intersection Observer for lazy loading
class LazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
  }
  
  observe(element) {
    this.observer.observe(element);
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
  
  async loadElement(element) {
    const type = element.dataset.lazyType;
    
    switch (type) {
      case 'image':
        await this.loadImage(element);
        break;
      case 'component':
        await this.loadComponent(element);
        break;
      case 'iframe':
        this.loadIframe(element);
        break;
    }
  }
  
  loadImage(img) {
    return new Promise((resolve, reject) => {
      const actualImg = new Image();
      
      actualImg.onload = () => {
        img.src = actualImg.src;
        img.classList.add('loaded');
        resolve();
      };
      
      actualImg.onerror = reject;
      actualImg.src = img.dataset.src;
    });
  }
  
  async loadComponent(element) {
    const componentName = element.dataset.component;
    
    try {
      const { default: Component } = await import(`./components/${componentName}.js`);
      const component = new Component(element);
      component.render();
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error);
    }
  }
  
  loadIframe(element) {
    const iframe = document.createElement('iframe');
    iframe.src = element.dataset.src;
    iframe.width = element.dataset.width || '100%';
    iframe.height = element.dataset.height || '400';
    element.appendChild(iframe);
  }
}

// Initialize lazy loader
const lazyLoader = new LazyLoader();

// Observe lazy elements
document.querySelectorAll('[data-lazy-type]').forEach(element => {
  lazyLoader.observe(element);
});
```

**Resource Bundling and Optimization:**
```javascript
// Webpack configuration for performance
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    },
    usedExports: true,
    sideEffects: false
  },
  
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Inline small images
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 85 },
              optipng: { enabled: true },
              pngquant: { quality: [0.65, 0.90], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 85 }
            }
          }
        ]
      }
    ]
  }
};

// Service Worker for caching
class CacheStrategy {
  constructor() {
    this.CACHE_NAME = 'app-cache-v1';
    this.STATIC_ASSETS = [
      '/',
      '/styles.css',
      '/app.js',
      '/manifest.json'
    ];
  }
  
  async install() {
    const cache = await caches.open(this.CACHE_NAME);
    return cache.addAll(this.STATIC_ASSETS);
  }
  
  async handleFetch(event) {
    const request = event.request;
    
    // Network first for API calls
    if (request.url.includes('/api/')) {
      return this.networkFirst(request);
    }
    
    // Cache first for static assets
    if (this.isStaticAsset(request.url)) {
      return this.cacheFirst(request);
    }
    
    // Stale while revalidate for pages
    return this.staleWhileRevalidate(request);
  }
  
  async networkFirst(request) {
    try {
      const response = await fetch(request);
      
      if (response.ok) {
        const cache = await caches.open(this.CACHE_NAME);
        cache.put(request, response.clone());
      }
      
      return response;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      return cachedResponse || new Response('Offline', { status: 503 });
    }
  }
  
  async cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(this.CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  }
  
  async staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        const cache = caches.open(this.CACHE_NAME);
        cache.then(c => c.put(request, response.clone()));
      }
      return response;
    });
    
    return cachedResponse || fetchPromise;
  }
  
  isStaticAsset(url) {
    return /\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$/.test(url);
  }
}
```

---

## Runtime Performance

### Q4: How do you optimize JavaScript runtime performance?

**Answer:**
Runtime performance optimization focuses on making the application responsive during user interactions.

**Efficient DOM Manipulation:**
```javascript
// Batch DOM operations
class DOMBatcher {
  constructor() {
    this.operations = [];
    this.scheduled = false;
  }
  
  add(operation) {
    this.operations.push(operation);
    this.schedule();
  }
  
  schedule() {
    if (this.scheduled) return;
    
    this.scheduled = true;
    requestAnimationFrame(() => {
      this.flush();
    });
  }
  
  flush() {
    // Batch reads first
    const reads = this.operations.filter(op => op.type === 'read');
    reads.forEach(op => op.execute());
    
    // Then batch writes
    const writes = this.operations.filter(op => op.type === 'write');
    writes.forEach(op => op.execute());
    
    this.operations = [];
    this.scheduled = false;
  }
}

// Usage
const batcher = new DOMBatcher();

function updateElements(elements, data) {
  elements.forEach((element, index) => {
    // Read operations
    batcher.add({
      type: 'read',
      execute: () => {
        const rect = element.getBoundingClientRect();
        data[index].width = rect.width;
      }
    });
    
    // Write operations
    batcher.add({
      type: 'write',
      execute: () => {
        element.style.height = `${data[index].width * 0.6}px`;
        element.textContent = data[index].text;
      }
    });
  });
}

// Virtual scrolling for large lists
class VirtualList {
  constructor(container, itemHeight, renderItem) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    this.scrollTop = 0;
    this.containerHeight = container.offsetHeight;
    this.visibleCount = Math.ceil(this.containerHeight / itemHeight) + 2;
    
    this.setupScrollListener();
  }
  
  setData(data) {
    this.data = data;
    this.totalHeight = data.length * this.itemHeight;
    this.render();
  }
  
  setupScrollListener() {
    let ticking = false;
    
    this.container.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.scrollTop = this.container.scrollTop;
          this.render();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(startIndex + this.visibleCount, this.data.length);
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create spacer for items above viewport
    if (startIndex > 0) {
      const topSpacer = document.createElement('div');
      topSpacer.style.height = `${startIndex * this.itemHeight}px`;
      this.container.appendChild(topSpacer);
    }
    
    // Render visible items
    for (let i = startIndex; i < endIndex; i++) {
      const item = this.renderItem(this.data[i], i);
      item.style.height = `${this.itemHeight}px`;
      this.container.appendChild(item);
    }
    
    // Create spacer for items below viewport
    const remainingItems = this.data.length - endIndex;
    if (remainingItems > 0) {
      const bottomSpacer = document.createElement('div');
      bottomSpacer.style.height = `${remainingItems * this.itemHeight}px`;
      this.container.appendChild(bottomSpacer);
    }
  }
}

// Debouncing and throttling
class PerformanceUtils {
  static debounce(func, wait, immediate = false) {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(this, args);
    };
  }
  
  static throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  static rafThrottle(func) {
    let ticking = false;
    
    return function(...args) {
      if (!ticking) {
        requestAnimationFrame(() => {
          func.apply(this, args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }
}

// Efficient event delegation
class EventDelegator {
  constructor(container) {
    this.container = container;
    this.handlers = new Map();
    this.setupDelegation();
  }
  
  on(selector, event, handler) {
    const key = `${event}:${selector}`;
    
    if (!this.handlers.has(key)) {
      this.handlers.set(key, []);
    }
    
    this.handlers.get(key).push(handler);
  }
  
  setupDelegation() {
    this.container.addEventListener('click', this.handleEvent.bind(this));
    this.container.addEventListener('change', this.handleEvent.bind(this));
    this.container.addEventListener('input', this.handleEvent.bind(this));
  }
  
  handleEvent(event) {
    const target = event.target;
    
    this.handlers.forEach((handlers, key) => {
      const [eventType, selector] = key.split(':');
      
      if (event.type === eventType && target.matches(selector)) {
        handlers.forEach(handler => handler(event, target));
      }
    });
  }
}

// Usage
const delegator = new EventDelegator(document.body);

delegator.on('.button', 'click', (event, target) => {
  console.log('Button clicked:', target);
});

delegator.on('.input', 'input', PerformanceUtils.debounce((event, target) => {
  console.log('Input changed:', target.value);
}, 300));
```

---

## Memory Management

### Q5: How do you prevent memory leaks in web applications?

**Answer:**
Memory leaks can cause performance degradation and crashes. Proper memory management is crucial.

**Common Memory Leak Patterns and Solutions:**
```javascript
// 1. Event Listener Leaks
class ComponentWithListeners {
  constructor(element) {
    this.element = element;
    this.handlers = new Map();
    
    // Store bound handlers for cleanup
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleResize = this.handleResize.bind(this);
    
    this.setupListeners();
  }
  
  setupListeners() {
    this.element.addEventListener('click', this.boundHandleClick);
    window.addEventListener('resize', this.boundHandleResize);
  }
  
  handleClick(event) {
    console.log('Clicked:', event.target);
  }
  
  handleResize(event) {
    console.log('Resized:', window.innerWidth);
  }
  
  destroy() {
    // Clean up event listeners
    this.element.removeEventListener('click', this.boundHandleClick);
    window.removeEventListener('resize', this.boundHandleResize);
    
    // Clear references
    this.element = null;
    this.handlers.clear();
  }
}

// 2. Timer and Interval Leaks
class TimerManager {
  constructor() {
    this.timers = new Set();
    this.intervals = new Set();
  }
  
  setTimeout(callback, delay) {
    const timerId = setTimeout(() => {
      callback();
      this.timers.delete(timerId);
    }, delay);
    
    this.timers.add(timerId);
    return timerId;
  }
  
  setInterval(callback, delay) {
    const intervalId = setInterval(callback, delay);
    this.intervals.add(intervalId);
    return intervalId;
  }
  
  clearTimeout(timerId) {
    clearTimeout(timerId);
    this.timers.delete(timerId);
  }
  
  clearInterval(intervalId) {
    clearInterval(intervalId);
    this.intervals.delete(intervalId);
  }
  
  clearAll() {
    this.timers.forEach(timerId => clearTimeout(timerId));
    this.intervals.forEach(intervalId => clearInterval(intervalId));
    
    this.timers.clear();
    this.intervals.clear();
  }
}

// 3. Observer Leaks
class ObserverManager {
  constructor() {
    this.observers = new Set();
  }
  
  createIntersectionObserver(callback, options) {
    const observer = new IntersectionObserver(callback, options);
    this.observers.add(observer);
    return observer;
  }
  
  createMutationObserver(callback) {
    const observer = new MutationObserver(callback);
    this.observers.add(observer);
    return observer;
  }
  
  createResizeObserver(callback) {
    const observer = new ResizeObserver(callback);
    this.observers.add(observer);
    return observer;
  }
  
  disconnect(observer) {
    observer.disconnect();
    this.observers.delete(observer);
  }
  
  disconnectAll() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// 4. Closure Leaks
class DataProcessor {
  constructor() {
    this.cache = new Map();
    this.processors = new Map();
  }
  
  // BAD: Creates closure that holds reference to large data
  createProcessorBad(largeData) {
    return function(input) {
      // This closure holds reference to entire largeData
      return largeData.process(input);
    };
  }
  
  // GOOD: Extract only needed data
  createProcessorGood(largeData) {
    const processMethod = largeData.process.bind(largeData);
    
    return function(input) {
      return processMethod(input);
    };
  }
  
  // GOOD: Use WeakMap for automatic cleanup
  createProcessorWithWeakMap(largeData) {
    const processors = new WeakMap();
    
    if (!processors.has(largeData)) {
      processors.set(largeData, largeData.process.bind(largeData));
    }
    
    return processors.get(largeData);
  }
}

// 5. DOM Reference Leaks
class DOMManager {
  constructor() {
    this.elementRefs = new WeakMap();
    this.cleanupTasks = new Map();
  }
  
  createElement(tag, options = {}) {
    const element = document.createElement(tag);
    
    // Store cleanup tasks
    const cleanup = [];
    
    if (options.listeners) {
      Object.entries(options.listeners).forEach(([event, handler]) => {
        element.addEventListener(event, handler);
        cleanup.push(() => element.removeEventListener(event, handler));
      });
    }
    
    if (options.observers) {
      options.observers.forEach(observer => {
        observer.observe(element);
        cleanup.push(() => observer.unobserve(element));
      });
    }
    
    this.cleanupTasks.set(element, cleanup);
    return element;
  }
  
  removeElement(element) {
    // Run cleanup tasks
    const cleanup = this.cleanupTasks.get(element);
    if (cleanup) {
      cleanup.forEach(task => task());
      this.cleanupTasks.delete(element);
    }
    
    // Remove from DOM
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

// Memory monitoring
class MemoryMonitor {
  constructor() {
    this.measurements = [];
    this.isMonitoring = false;
  }
  
  start(interval = 5000) {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.intervalId = setInterval(() => {
      this.measure();
    }, interval);
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isMonitoring = false;
  }
  
  measure() {
    if ('memory' in performance) {
      const memory = performance.memory;
      const measurement = {
        timestamp: Date.now(),
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
      
      this.measurements.push(measurement);
      
      // Keep only last 100 measurements
      if (this.measurements.length > 100) {
        this.measurements.shift();
      }
      
      this.checkForLeaks(measurement);
    }
  }
  
  checkForLeaks(current) {
    if (this.measurements.length < 10) return;
    
    const recent = this.measurements.slice(-10);
    const trend = this.calculateTrend(recent.map(m => m.usedJSHeapSize));
    
    if (trend > 1024 * 1024) { // 1MB increase trend
      console.warn('Potential memory leak detected:', {
        trend: `${(trend / 1024 / 1024).toFixed(2)}MB increase`,
        current: `${(current.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`
      });
    }
  }
  
  calculateTrend(values) {
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, i) => sum + (i * val), 0);
    const sumXX = (n * (n - 1) * (2 * n - 1)) / 6;
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  }
  
  getReport() {
    if (this.measurements.length === 0) return null;
    
    const latest = this.measurements[this.measurements.length - 1];
    const oldest = this.measurements[0];
    
    return {
      current: {
        used: `${(latest.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        total: `${(latest.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        limit: `${(latest.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`
      },
      change: {
        used: `${((latest.usedJSHeapSize - oldest.usedJSHeapSize) / 1024 / 1024).toFixed(2)}MB`,
        duration: `${((latest.timestamp - oldest.timestamp) / 1000).toFixed(1)}s`
      }
    };
  }
}

// Usage
const memoryMonitor = new MemoryMonitor();
memoryMonitor.start();

// Check memory usage
setInterval(() => {
  const report = memoryMonitor.getReport();
  if (report) {
    console.log('Memory Report:', report);
  }
}, 30000);
```

This comprehensive performance guide covers all essential optimization techniques from Core Web Vitals to memory management, providing practical examples for building high-performance web applications.