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

---

## Advanced Performance Optimization

### Q6: How do you implement advanced performance optimization strategies?

**Answer:**
Advanced performance optimization involves sophisticated techniques for resource management, rendering optimization, and intelligent caching strategies.

**Advanced Resource Management:**
```typescript
// Advanced Resource Loader with Priority Queue
class AdvancedResourceLoader {
  private loadQueue: Map<string, ResourceRequest> = new Map();
  private activeLoads: Set<string> = new Set();
  private cache: Map<string, CachedResource> = new Map();
  private maxConcurrentLoads = 6;
  private priorityLevels = {
    CRITICAL: 0,
    HIGH: 1,
    NORMAL: 2,
    LOW: 3
  };

  constructor(private config: ResourceLoaderConfig) {
    this.setupIntersectionObserver();
    this.setupNetworkObserver();
  }

  async loadResource(url: string, options: LoadOptions = {}): Promise<any> {
    const cacheKey = this.getCacheKey(url, options);
    
    // Check cache first
    const cached = this.getCachedResource(cacheKey);
    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }

    // Add to queue with priority
    const request: ResourceRequest = {
      url,
      options,
      priority: options.priority || this.priorityLevels.NORMAL,
      timestamp: Date.now(),
      retries: 0,
      cacheKey
    };

    return this.enqueueRequest(request);
  }

  private async enqueueRequest(request: ResourceRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      request.resolve = resolve;
      request.reject = reject;
      
      this.loadQueue.set(request.cacheKey, request);
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.activeLoads.size >= this.maxConcurrentLoads) {
      return;
    }

    // Sort by priority and timestamp
    const sortedRequests = Array.from(this.loadQueue.values())
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.timestamp - b.timestamp;
      });

    const request = sortedRequests[0];
    if (!request) return;

    this.loadQueue.delete(request.cacheKey);
    this.activeLoads.add(request.cacheKey);

    try {
      const data = await this.executeLoad(request);
      this.cacheResource(request.cacheKey, data, request.options);
      request.resolve!(data);
    } catch (error) {
      if (request.retries < 3) {
        request.retries++;
        request.timestamp = Date.now();
        this.loadQueue.set(request.cacheKey, request);
      } else {
        request.reject!(error);
      }
    } finally {
      this.activeLoads.delete(request.cacheKey);
      this.processQueue(); // Process next in queue
    }
  }

  private async executeLoad(request: ResourceRequest): Promise<any> {
    const { url, options } = request;
    
    // Adaptive loading based on network conditions
    const networkInfo = this.getNetworkInfo();
    const adaptedOptions = this.adaptOptionsForNetwork(options, networkInfo);

    switch (options.type) {
      case 'image':
        return this.loadImage(url, adaptedOptions);
      case 'script':
        return this.loadScript(url, adaptedOptions);
      case 'style':
        return this.loadStylesheet(url, adaptedOptions);
      case 'json':
        return this.loadJSON(url, adaptedOptions);
      default:
        return this.loadGeneric(url, adaptedOptions);
    }
  }

  private async loadImage(url: string, options: AdaptedOptions): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      // Progressive loading for large images
      if (options.progressive) {
        img.loading = 'lazy';
        img.decoding = 'async';
      }

      // Responsive image selection
      if (options.srcSet) {
        img.srcset = options.srcSet;
        img.sizes = options.sizes || '100vw';
      }

      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const url = element.dataset.src;
            if (url) {
              this.loadResource(url, {
                type: 'image',
                priority: this.priorityLevels.HIGH
              });
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );
  }

  private getNetworkInfo(): NetworkInfo {
    const connection = (navigator as any).connection;
    if (!connection) {
      return { effectiveType: '4g', downlink: 10, rtt: 100 };
    }

    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }

  private adaptOptionsForNetwork(options: LoadOptions, network: NetworkInfo): AdaptedOptions {
    const adapted = { ...options };

    // Reduce quality for slow connections
    if (network.effectiveType === 'slow-2g' || network.effectiveType === '2g') {
      adapted.quality = 'low';
      adapted.timeout = 30000;
    } else if (network.effectiveType === '3g') {
      adapted.quality = 'medium';
      adapted.timeout = 15000;
    } else {
      adapted.quality = 'high';
      adapted.timeout = 10000;
    }

    // Honor data saver preference
    if (network.saveData) {
      adapted.quality = 'low';
      adapted.compress = true;
    }

    return adapted;
  }
}

// Advanced Virtual Scrolling with Dynamic Heights
class AdvancedVirtualScroller {
  private container: HTMLElement;
  private items: any[];
  private itemHeights: Map<number, number> = new Map();
  private estimatedItemHeight: number;
  private visibleRange: { start: number; end: number } = { start: 0, end: 0 };
  private scrollTop = 0;
  private containerHeight = 0;
  private totalHeight = 0;
  private renderBuffer = 5;
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;

  constructor(
    container: HTMLElement,
    items: any[],
    private renderItem: (item: any, index: number) => HTMLElement,
    estimatedItemHeight = 50
  ) {
    this.container = container;
    this.items = items;
    this.estimatedItemHeight = estimatedItemHeight;
    this.setupObservers();
    this.render();
  }

  private setupObservers(): void {
    // Observe container size changes
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.containerHeight = entry.contentRect.height;
        this.updateVisibleRange();
        this.render();
      }
    });
    this.resizeObserver.observe(this.container);

    // Observe item size changes
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          const index = parseInt(element.dataset.index!, 10);
          const height = element.offsetHeight;
          
          if (this.itemHeights.get(index) !== height) {
            this.itemHeights.set(index, height);
            this.updateTotalHeight();
            this.render();
          }
        });
      },
      { root: this.container }
    );

    // Handle scroll events with throttling
    let scrollTimeout: number;
    this.container.addEventListener('scroll', () => {
      this.scrollTop = this.container.scrollTop;
      
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = requestAnimationFrame(() => {
        this.updateVisibleRange();
        this.render();
      });
    });
  }

  private updateVisibleRange(): void {
    const start = this.findStartIndex();
    const end = this.findEndIndex(start);
    
    this.visibleRange = {
      start: Math.max(0, start - this.renderBuffer),
      end: Math.min(this.items.length - 1, end + this.renderBuffer)
    };
  }

  private findStartIndex(): number {
    let accumulatedHeight = 0;
    
    for (let i = 0; i < this.items.length; i++) {
      const itemHeight = this.itemHeights.get(i) || this.estimatedItemHeight;
      
      if (accumulatedHeight + itemHeight > this.scrollTop) {
        return i;
      }
      
      accumulatedHeight += itemHeight;
    }
    
    return this.items.length - 1;
  }

  private findEndIndex(startIndex: number): number {
    let accumulatedHeight = this.getOffsetTop(startIndex);
    
    for (let i = startIndex; i < this.items.length; i++) {
      const itemHeight = this.itemHeights.get(i) || this.estimatedItemHeight;
      
      if (accumulatedHeight > this.scrollTop + this.containerHeight) {
        return i;
      }
      
      accumulatedHeight += itemHeight;
    }
    
    return this.items.length - 1;
  }

  private getOffsetTop(index: number): number {
    let offset = 0;
    
    for (let i = 0; i < index; i++) {
      offset += this.itemHeights.get(i) || this.estimatedItemHeight;
    }
    
    return offset;
  }

  private updateTotalHeight(): void {
    this.totalHeight = 0;
    
    for (let i = 0; i < this.items.length; i++) {
      this.totalHeight += this.itemHeights.get(i) || this.estimatedItemHeight;
    }
  }

  private render(): void {
    // Clear existing content
    this.container.innerHTML = '';
    
    // Create spacer for items before visible range
    const topSpacer = document.createElement('div');
    topSpacer.style.height = `${this.getOffsetTop(this.visibleRange.start)}px`;
    this.container.appendChild(topSpacer);
    
    // Render visible items
    for (let i = this.visibleRange.start; i <= this.visibleRange.end; i++) {
      const item = this.items[i];
      const element = this.renderItem(item, i);
      element.dataset.index = i.toString();
      
      this.container.appendChild(element);
      this.intersectionObserver.observe(element);
    }
    
    // Create spacer for items after visible range
    const bottomSpacerHeight = this.totalHeight - this.getOffsetTop(this.visibleRange.end + 1);
    const bottomSpacer = document.createElement('div');
    bottomSpacer.style.height = `${bottomSpacerHeight}px`;
    this.container.appendChild(bottomSpacer);
  }

  updateItems(newItems: any[]): void {
    this.items = newItems;
    this.itemHeights.clear();
    this.updateTotalHeight();
    this.updateVisibleRange();
    this.render();
  }

  scrollToIndex(index: number): void {
    const offset = this.getOffsetTop(index);
    this.container.scrollTop = offset;
  }

  destroy(): void {
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
  }
}

// Intelligent Caching System
class IntelligentCache {
  private cache: Map<string, CacheEntry> = new Map();
  private accessLog: Map<string, AccessInfo> = new Map();
  private maxSize: number;
  private ttl: number;
  private compressionEnabled: boolean;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 100;
    this.ttl = options.ttl || 3600000; // 1 hour
    this.compressionEnabled = options.compression || false;
    
    this.startCleanupInterval();
  }

  async set(key: string, value: any, options: SetOptions = {}): Promise<void> {
    const entry: CacheEntry = {
      value: this.compressionEnabled ? await this.compress(value) : value,
      timestamp: Date.now(),
      ttl: options.ttl || this.ttl,
      size: this.calculateSize(value),
      compressed: this.compressionEnabled,
      priority: options.priority || 1
    };

    // Check if we need to evict items
    if (this.cache.size >= this.maxSize) {
      await this.evictLeastUseful();
    }

    this.cache.set(key, entry);
    this.updateAccessLog(key, 'write');
  }

  async get(key: string): Promise<any> {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.accessLog.delete(key);
      return null;
    }

    this.updateAccessLog(key, 'read');
    
    return entry.compressed ? await this.decompress(entry.value) : entry.value;
  }

  private updateAccessLog(key: string, operation: 'read' | 'write'): void {
    const existing = this.accessLog.get(key) || {
      reads: 0,
      writes: 0,
      lastAccess: 0,
      frequency: 0
    };

    existing[operation === 'read' ? 'reads' : 'writes']++;
    existing.lastAccess = Date.now();
    existing.frequency = this.calculateFrequency(existing);
    
    this.accessLog.set(key, existing);
  }

  private calculateFrequency(access: AccessInfo): number {
    const totalAccess = access.reads + access.writes;
    const timeSinceFirst = Date.now() - (access.lastAccess - (totalAccess * 1000));
    return totalAccess / (timeSinceFirst / 1000 / 60); // accesses per minute
  }

  private async evictLeastUseful(): Promise<void> {
    const entries = Array.from(this.cache.entries());
    
    // Calculate usefulness score for each entry
    const scored = entries.map(([key, entry]) => {
      const access = this.accessLog.get(key);
      const age = Date.now() - entry.timestamp;
      const frequency = access?.frequency || 0;
      const recency = 1 / (age + 1);
      
      // Usefulness = frequency * recency * priority / size
      const usefulness = (frequency * recency * entry.priority) / entry.size;
      
      return { key, usefulness };
    });

    // Sort by usefulness (ascending) and remove least useful
    scored.sort((a, b) => a.usefulness - b.usefulness);
    
    const toEvict = scored.slice(0, Math.ceil(this.maxSize * 0.1)); // Evict 10%
    
    for (const { key } of toEvict) {
      this.cache.delete(key);
      this.accessLog.delete(key);
    }
  }

  private async compress(data: any): Promise<string> {
    if (!('CompressionStream' in window)) {
      return JSON.stringify(data);
    }

    const stream = new CompressionStream('gzip');
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();
    
    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();
    
    writer.write(encoder.encode(jsonString));
    writer.close();
    
    const chunks: Uint8Array[] = [];
    let done = false;
    
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) chunks.push(value);
    }
    
    const compressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
    let offset = 0;
    
    for (const chunk of chunks) {
      compressed.set(chunk, offset);
      offset += chunk.length;
    }
    
    return btoa(String.fromCharCode(...compressed));
  }

  private async decompress(compressedData: string): Promise<any> {
    if (!('DecompressionStream' in window)) {
      return JSON.parse(compressedData);
    }

    const compressed = Uint8Array.from(atob(compressedData), c => c.charCodeAt(0));
    
    const stream = new DecompressionStream('gzip');
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();
    
    writer.write(compressed);
    writer.close();
    
    const chunks: Uint8Array[] = [];
    let done = false;
    
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) chunks.push(value);
    }
    
    const decompressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
    let offset = 0;
    
    for (const chunk of chunks) {
      decompressed.set(chunk, offset);
      offset += chunk.length;
    }
    
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decompressed);
    
    return JSON.parse(jsonString);
  }

  private calculateSize(data: any): number {
    return new Blob([JSON.stringify(data)]).size;
  }

  private startCleanupInterval(): void {
    setInterval(() => {
      const now = Date.now();
      
      for (const [key, entry] of this.cache.entries()) {
        if (now - entry.timestamp > entry.ttl) {
          this.cache.delete(key);
          this.accessLog.delete(key);
        }
      }
    }, 60000); // Cleanup every minute
  }

  getStats(): CacheStats {
    const totalSize = Array.from(this.cache.values())
      .reduce((sum, entry) => sum + entry.size, 0);
    
    const hitRate = Array.from(this.accessLog.values())
      .reduce((sum, access) => sum + access.reads, 0) / 
      Array.from(this.accessLog.values())
        .reduce((sum, access) => sum + access.reads + access.writes, 0);

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      totalSize,
      hitRate,
      averageFrequency: Array.from(this.accessLog.values())
        .reduce((sum, access) => sum + access.frequency, 0) / this.accessLog.size
    };
  }

  clear(): void {
    this.cache.clear();
    this.accessLog.clear();
  }
}

// Performance Monitoring and Analytics
class PerformanceAnalytics {
  private metrics: Map<string, MetricData[]> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();
  private customTimers: Map<string, number> = new Map();
  private alerts: AlertConfig[] = [];
  private reportingEndpoint: string;

  constructor(config: AnalyticsConfig) {
    this.reportingEndpoint = config.endpoint;
    this.setupCoreObservers();
    this.startReporting(config.reportingInterval || 30000);
  }

  private setupCoreObservers(): void {
    // Navigation timing
    this.createObserver('navigation', ['navigation']);
    
    // Paint timing
    this.createObserver('paint', ['paint']);
    
    // Largest Contentful Paint
    this.createObserver('lcp', ['largest-contentful-paint']);
    
    // First Input Delay
    this.createObserver('fid', ['first-input']);
    
    // Layout Shift
    this.createObserver('cls', ['layout-shift']);
    
    // Resource timing
    this.createObserver('resource', ['resource']);
    
    // User timing
    this.createObserver('user', ['measure']);
  }

  private createObserver(name: string, entryTypes: string[]): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(name, {
            name: entry.name,
            value: this.extractValue(entry),
            timestamp: entry.startTime,
            details: this.extractDetails(entry)
          });
        }
      });
      
      observer.observe({ entryTypes });
      this.observers.set(name, observer);
    } catch (error) {
      console.warn(`Failed to create observer for ${name}:`, error);
    }
  }

  private extractValue(entry: PerformanceEntry): number {
    if ('value' in entry) return (entry as any).value;
    if ('duration' in entry) return entry.duration;
    if ('startTime' in entry) return entry.startTime;
    return 0;
  }

  private extractDetails(entry: PerformanceEntry): any {
    const details: any = {
      entryType: entry.entryType,
      name: entry.name
    };

    // Add specific details based on entry type
    if (entry.entryType === 'navigation') {
      const nav = entry as PerformanceNavigationTiming;
      details.transferSize = nav.transferSize;
      details.encodedBodySize = nav.encodedBodySize;
      details.decodedBodySize = nav.decodedBodySize;
    } else if (entry.entryType === 'resource') {
      const resource = entry as PerformanceResourceTiming;
      details.transferSize = resource.transferSize;
      details.initiatorType = resource.initiatorType;
    } else if (entry.entryType === 'largest-contentful-paint') {
      const lcp = entry as any;
      details.element = lcp.element?.tagName;
      details.url = lcp.url;
    }

    return details;
  }

  recordMetric(category: string, data: MetricData): void {
    if (!this.metrics.has(category)) {
      this.metrics.set(category, []);
    }
    
    const metrics = this.metrics.get(category)!;
    metrics.push(data);
    
    // Keep only last 1000 metrics per category
    if (metrics.length > 1000) {
      metrics.shift();
    }
    
    this.checkAlerts(category, data);
  }

  startTimer(name: string): () => void {
    const startTime = performance.now();
    this.customTimers.set(name, startTime);
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.recordMetric('custom', {
        name,
        value: duration,
        timestamp: startTime,
        details: { duration }
      });
      
      this.customTimers.delete(name);
    };
  }

  addAlert(config: AlertConfig): void {
    this.alerts.push(config);
  }

  private checkAlerts(category: string, data: MetricData): void {
    for (const alert of this.alerts) {
      if (alert.category === category && alert.metric === data.name) {
        const triggered = this.evaluateAlert(alert, data.value);
        
        if (triggered) {
          this.triggerAlert(alert, data);
        }
      }
    }
  }

  private evaluateAlert(alert: AlertConfig, value: number): boolean {
    switch (alert.operator) {
      case 'gt': return value > alert.threshold;
      case 'lt': return value < alert.threshold;
      case 'eq': return value === alert.threshold;
      case 'gte': return value >= alert.threshold;
      case 'lte': return value <= alert.threshold;
      default: return false;
    }
  }

  private async triggerAlert(alert: AlertConfig, data: MetricData): Promise<void> {
    const alertData = {
      alert: alert.name,
      category: alert.category,
      metric: data.name,
      value: data.value,
      threshold: alert.threshold,
      timestamp: Date.now(),
      severity: alert.severity || 'warning'
    };

    // Send to reporting endpoint
    try {
      await fetch(`${this.reportingEndpoint}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData)
      });
    } catch (error) {
      console.error('Failed to send alert:', error);
    }

    // Trigger callback if provided
    if (alert.callback) {
      alert.callback(alertData);
    }
  }

  private startReporting(interval: number): void {
    setInterval(async () => {
      const report = this.generateReport();
      
      try {
        await fetch(this.reportingEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report)
        });
      } catch (error) {
        console.error('Failed to send performance report:', error);
      }
    }, interval);
  }

  generateReport(): PerformanceReport {
    const report: PerformanceReport = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: {}
    };

    // Aggregate metrics by category
    for (const [category, metrics] of this.metrics.entries()) {
      if (metrics.length === 0) continue;
      
      const values = metrics.map(m => m.value);
      const recent = metrics.filter(m => Date.now() - m.timestamp < 300000); // Last 5 minutes
      
      report.metrics[category] = {
        count: metrics.length,
        average: values.reduce((sum, val) => sum + val, 0) / values.length,
        median: this.calculateMedian(values),
        p95: this.calculatePercentile(values, 95),
        min: Math.min(...values),
        max: Math.max(...values),
        recent: recent.length
      };
    }

    return report;
  }

  private calculateMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  private calculatePercentile(values: number[], percentile: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }

  getMetrics(category?: string): Map<string, MetricData[]> {
    if (category) {
      const categoryMetrics = this.metrics.get(category);
      return categoryMetrics ? new Map([[category, categoryMetrics]]) : new Map();
    }
    return new Map(this.metrics);
  }

  destroy(): void {
    for (const observer of this.observers.values()) {
      observer.disconnect();
    }
    this.observers.clear();
    this.metrics.clear();
    this.customTimers.clear();
  }
}

// Type definitions
interface ResourceRequest {
  url: string;
  options: LoadOptions;
  priority: number;
  timestamp: number;
  retries: number;
  cacheKey: string;
  resolve?: (value: any) => void;
  reject?: (error: any) => void;
}

interface LoadOptions {
  type?: 'image' | 'script' | 'style' | 'json' | 'generic';
  priority?: number;
  progressive?: boolean;
  srcSet?: string;
  sizes?: string;
  timeout?: number;
}

interface AdaptedOptions extends LoadOptions {
  quality?: 'low' | 'medium' | 'high';
  compress?: boolean;
}

interface NetworkInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData?: boolean;
}

interface CacheEntry {
  value: any;
  timestamp: number;
  ttl: number;
  size: number;
  compressed: boolean;
  priority: number;
}

interface AccessInfo {
  reads: number;
  writes: number;
  lastAccess: number;
  frequency: number;
}

interface CacheOptions {
  maxSize?: number;
  ttl?: number;
  compression?: boolean;
}

interface SetOptions {
  ttl?: number;
  priority?: number;
}

interface CacheStats {
  size: number;
  maxSize: number;
  totalSize: number;
  hitRate: number;
  averageFrequency: number;
}

interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  details: any;
}

interface AlertConfig {
  name: string;
  category: string;
  metric: string;
  threshold: number;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  severity?: 'info' | 'warning' | 'error' | 'critical';
  callback?: (alert: any) => void;
}

interface AnalyticsConfig {
  endpoint: string;
  reportingInterval?: number;
}

interface PerformanceReport {
  timestamp: number;
  url: string;
  userAgent: string;
  metrics: Record<string, any>;
}

// Usage Examples
const resourceLoader = new AdvancedResourceLoader({
  maxConcurrentLoads: 6,
  enableNetworkAdaptation: true,
  enableProgressiveLoading: true
});

// Load critical resources with high priority
resourceLoader.loadResource('/api/critical-data.json', {
  type: 'json',
  priority: 0 // CRITICAL
});

// Load images with lazy loading
resourceLoader.loadResource('/images/hero.jpg', {
  type: 'image',
  priority: 1, // HIGH
  progressive: true,
  srcSet: '/images/hero-320.jpg 320w, /images/hero-640.jpg 640w, /images/hero-1280.jpg 1280w',
  sizes: '(max-width: 320px) 280px, (max-width: 640px) 600px, 1200px'
});

// Virtual scrolling for large lists
const virtualScroller = new AdvancedVirtualScroller(
  document.getElementById('list-container')!,
  largeDataArray,
  (item, index) => {
    const element = document.createElement('div');
    element.className = 'list-item';
    element.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
    return element;
  },
  80 // estimated item height
);

// Intelligent caching
const cache = new IntelligentCache({
  maxSize: 200,
  ttl: 3600000, // 1 hour
  compression: true
});

// Performance analytics
const analytics = new PerformanceAnalytics({
  endpoint: '/api/performance',
  reportingInterval: 30000
});

// Add performance alerts
analytics.addAlert({
  name: 'High LCP',
  category: 'lcp',
  metric: 'largest-contentful-paint',
  threshold: 2500,
  operator: 'gt',
  severity: 'warning',
  callback: (alert) => {
    console.warn('LCP threshold exceeded:', alert);
  }
});

// Custom performance measurement
const apiTimer = analytics.startTimer('api.user.profile');
fetch('/api/user/profile')
  .then(response => response.json())
  .finally(() => apiTimer());
```

### Q7: How do you implement advanced performance monitoring and real-time optimization?

**Answer:**
Advanced performance monitoring involves real-time metrics collection, intelligent alerting, and automatic optimization based on performance data.

**Real-time Performance Monitoring System:**
```typescript
// Resource Pool Management
class ResourcePool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private reset: (item: T) => void;
  private maxSize: number;
  private created = 0;
  
  constructor(
    factory: () => T,
    reset: (item: T) => void,
    maxSize: number = 50
  ) {
    this.factory = factory;
    this.reset = reset;
    this.maxSize = maxSize;
  }
  
  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    
    if (this.created < this.maxSize) {
      this.created++;
      return this.factory();
    }
    
    // Pool exhausted, create temporary object
    console.warn('Resource pool exhausted, creating temporary object');
    return this.factory();
  }
  
  release(item: T): void {
    if (this.pool.length < this.maxSize) {
      this.reset(item);
      this.pool.push(item);
    }
  }
  
  clear(): void {
    this.pool.length = 0;
    this.created = 0;
  }
  
  getStats(): { poolSize: number; created: number; available: number } {
    return {
      poolSize: this.maxSize,
      created: this.created,
      available: this.pool.length
    };
  }
}

// DOM Element Pool for Virtual Scrolling
class DOMElementPool {
  private elementPools = new Map<string, ResourcePool<HTMLElement>>();
  
  getElement(tagName: string, className?: string): HTMLElement {
    const key = `${tagName}:${className || ''}`;
    
    if (!this.elementPools.has(key)) {
      this.elementPools.set(key, new ResourcePool(
        () => {
          const element = document.createElement(tagName);
          if (className) {
            element.className = className;
          }
          return element;
        },
        (element) => {
          element.innerHTML = '';
          element.removeAttribute('style');
          // Reset other attributes as needed
          Array.from(element.attributes).forEach(attr => {
            if (attr.name !== 'class') {
              element.removeAttribute(attr.name);
            }
          });
        },
        100
      ));
    }
    
    return this.elementPools.get(key)!.acquire();
  }
  
  releaseElement(element: HTMLElement, tagName: string, className?: string): void {
    const key = `${tagName}:${className || ''}`;
    const pool = this.elementPools.get(key);
    if (pool) {
      pool.release(element);
    }
  }
  
  clearAll(): void {
    this.elementPools.forEach(pool => pool.clear());
    this.elementPools.clear();
  }
}

// Advanced Virtual Scrolling Implementation
class VirtualScrollManager {
  private container: HTMLElement;
  private itemHeight: number;
  private bufferSize: number;
  private visibleRange = { start: 0, end: 0 };
  private renderedItems = new Map<number, HTMLElement>();
  private elementPool: DOMElementPool;
  private data: any[] = [];
  private renderItem: (item: any, element: HTMLElement) => void;
  
  constructor(
    container: HTMLElement,
    itemHeight: number,
    renderItem: (item: any, element: HTMLElement) => void,
    bufferSize: number = 5
  ) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    this.bufferSize = bufferSize;
    this.elementPool = new DOMElementPool();
    
    this.setupScrollListener();
  }
  
  setData(data: any[]): void {
    this.data = data;
    this.updateVisibleRange();
    this.renderVisibleItems();
  }
  
  private setupScrollListener(): void {
    let ticking = false;
    
    this.container.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateVisibleRange();
          this.renderVisibleItems();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  private updateVisibleRange(): void {
    const scrollTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight;
    
    const start = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.bufferSize);
    const end = Math.min(
      this.data.length - 1,
      Math.ceil((scrollTop + containerHeight) / this.itemHeight) + this.bufferSize
    );
    
    this.visibleRange = { start, end };
  }
  
  private renderVisibleItems(): void {
    // Remove items that are no longer visible
    for (const [index, element] of this.renderedItems) {
      if (index < this.visibleRange.start || index > this.visibleRange.end) {
        this.container.removeChild(element);
        this.elementPool.releaseElement(element, 'div', 'virtual-item');
        this.renderedItems.delete(index);
      }
    }
    
    // Add new visible items
    for (let i = this.visibleRange.start; i <= this.visibleRange.end; i++) {
      if (!this.renderedItems.has(i) && this.data[i]) {
        const element = this.elementPool.getElement('div', 'virtual-item');
        element.style.position = 'absolute';
        element.style.top = `${i * this.itemHeight}px`;
        element.style.height = `${this.itemHeight}px`;
        element.style.width = '100%';
        
        this.renderItem(this.data[i], element);
        this.container.appendChild(element);
        this.renderedItems.set(i, element);
      }
    }
    
    // Update container height
    this.container.style.height = `${this.data.length * this.itemHeight}px`;
  }
  
  destroy(): void {
    this.renderedItems.forEach(element => {
      this.container.removeChild(element);
    });
    this.renderedItems.clear();
    this.elementPool.clearAll();
  }
}

// Advanced Caching Strategy
class AdvancedCacheManager {
  private memoryCache = new Map<string, CacheEntry>();
  private persistentCache: IDBDatabase | null = null;
  private maxMemorySize: number;
  private currentMemorySize = 0;
  private compressionEnabled: boolean;
  
  constructor(
    maxMemorySize: number = 50 * 1024 * 1024, // 50MB
    compressionEnabled: boolean = true
  ) {
    this.maxMemorySize = maxMemorySize;
    this.compressionEnabled = compressionEnabled;
    this.initPersistentCache();
  }
  
  private async initPersistentCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('AdvancedCache', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.persistentCache = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('cache')) {
          const store = db.createObjectStore('cache', { keyPath: 'key' });
          store.createIndex('expiry', 'expiry', { unique: false });
          store.createIndex('priority', 'priority', { unique: false });
        }
      };
    });
  }
  
  async set(
    key: string,
    value: any,
    options: CacheOptions = {}
  ): Promise<void> {
    const entry: CacheEntry = {
      key,
      value: this.compressionEnabled ? await this.compress(value) : value,
      timestamp: Date.now(),
      expiry: options.ttl ? Date.now() + options.ttl : null,
      size: this.calculateSize(value),
      priority: options.priority || 1,
      compressed: this.compressionEnabled
    };
    
    // Store in memory cache
    await this.setInMemory(entry);
    
    // Store in persistent cache if enabled
    if (options.persistent && this.persistentCache) {
      await this.setInPersistent(entry);
    }
  }
  
  async get(key: string): Promise<any> {
    // Try memory cache first
    let entry = this.memoryCache.get(key);
    
    if (!entry && this.persistentCache) {
      // Try persistent cache
      entry = await this.getFromPersistent(key);
      if (entry) {
        // Promote to memory cache
        await this.setInMemory(entry);
      }
    }
    
    if (!entry) {
      return null;
    }
    
    // Check expiry
    if (entry.expiry && Date.now() > entry.expiry) {
      await this.delete(key);
      return null;
    }
    
    // Update access time for LRU
    entry.timestamp = Date.now();
    
    return entry.compressed ? await this.decompress(entry.value) : entry.value;
  }
  
  private async setInMemory(entry: CacheEntry): Promise<void> {
    // Check if we need to evict items
    while (this.currentMemorySize + entry.size > this.maxMemorySize) {
      await this.evictLRU();
    }
    
    const existing = this.memoryCache.get(entry.key);
    if (existing) {
      this.currentMemorySize -= existing.size;
    }
    
    this.memoryCache.set(entry.key, entry);
    this.currentMemorySize += entry.size;
  }
  
  private async setInPersistent(entry: CacheEntry): Promise<void> {
    if (!this.persistentCache) return;
    
    const transaction = this.persistentCache.transaction(['cache'], 'readwrite');
    const store = transaction.objectStore('cache');
    
    return new Promise((resolve, reject) => {
      const request = store.put(entry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  private async getFromPersistent(key: string): Promise<CacheEntry | null> {
    if (!this.persistentCache) return null;
    
    const transaction = this.persistentCache.transaction(['cache'], 'readonly');
    const store = transaction.objectStore('cache');
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }
  
  private async evictLRU(): Promise<void> {
    let oldestEntry: CacheEntry | null = null;
    let oldestKey = '';
    
    for (const [key, entry] of this.memoryCache) {
      if (!oldestEntry || entry.timestamp < oldestEntry.timestamp) {
        oldestEntry = entry;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.memoryCache.delete(oldestKey);
      if (oldestEntry) {
        this.currentMemorySize -= oldestEntry.size;
      }
    }
  }
  
  private async compress(data: any): Promise<string> {
    if (typeof CompressionStream !== 'undefined') {
      const stream = new CompressionStream('gzip');
      const writer = stream.writable.getWriter();
      const reader = stream.readable.getReader();
      
      const jsonString = JSON.stringify(data);
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(jsonString);
      
      writer.write(uint8Array);
      writer.close();
      
      const chunks: Uint8Array[] = [];
      let done = false;
      
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          chunks.push(value);
        }
      }
      
      const compressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        compressed.set(chunk, offset);
        offset += chunk.length;
      }
      
      return btoa(String.fromCharCode(...compressed));
    }
    
    // Fallback to JSON string if compression not available
    return JSON.stringify(data);
  }
  
  private async decompress(compressedData: string): Promise<any> {
    if (typeof DecompressionStream !== 'undefined') {
      try {
        const binaryString = atob(compressedData);
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }
        
        const stream = new DecompressionStream('gzip');
        const writer = stream.writable.getWriter();
        const reader = stream.readable.getReader();
        
        writer.write(uint8Array);
        writer.close();
        
        const chunks: Uint8Array[] = [];
        let done = false;
        
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            chunks.push(value);
          }
        }
        
        const decompressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
        let offset = 0;
        for (const chunk of chunks) {
          decompressed.set(chunk, offset);
          offset += chunk.length;
        }
        
        const decoder = new TextDecoder();
        const jsonString = decoder.decode(decompressed);
        return JSON.parse(jsonString);
      } catch (error) {
        console.warn('Decompression failed, falling back to JSON parse:', error);
      }
    }
    
    // Fallback to JSON parse
    return JSON.parse(compressedData);
  }
  
  private calculateSize(value: any): number {
    return new Blob([JSON.stringify(value)]).size;
  }
  
  async delete(key: string): Promise<void> {
    const entry = this.memoryCache.get(key);
    if (entry) {
      this.memoryCache.delete(key);
      this.currentMemorySize -= entry.size;
    }
    
    if (this.persistentCache) {
      const transaction = this.persistentCache.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      store.delete(key);
    }
  }
  
  async clear(): Promise<void> {
    this.memoryCache.clear();
    this.currentMemorySize = 0;
    
    if (this.persistentCache) {
      const transaction = this.persistentCache.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      store.clear();
    }
  }
  
  getStats(): CacheStats {
    return {
      memoryEntries: this.memoryCache.size,
      memorySize: this.currentMemorySize,
      maxMemorySize: this.maxMemorySize,
      memoryUtilization: (this.currentMemorySize / this.maxMemorySize) * 100
    };
  }
}

interface CacheEntry {
  key: string;
  value: any;
  timestamp: number;
  expiry: number | null;
  size: number;
  priority: number;
  compressed: boolean;
}

interface CacheOptions {
  ttl?: number;
  priority?: number;
  persistent?: boolean;
}

interface CacheStats {
  memoryEntries: number;
  memorySize: number;
  maxMemorySize: number;
  memoryUtilization: number;
}
```

### Q8: How do you implement comprehensive performance monitoring and analytics?

**Answer:**
Comprehensive performance monitoring requires real-time metrics collection, intelligent alerting, and detailed analytics for optimization insights.

**Advanced Performance Monitoring System:**
```typescript
// Performance Metrics Collector
class PerformanceMetricsCollector {
  private metrics: Map<string, MetricData[]> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();
  private customMetrics: Map<string, CustomMetric> = new Map();
  private alertThresholds: Map<string, AlertThreshold> = new Map();
  private reportingInterval: number;
  private reportingTimer: number | null = null;
  
  constructor(
    private config: MonitoringConfig,
    private reporter: MetricsReporter
  ) {
    this.reportingInterval = config.reportingInterval || 30000; // 30 seconds
    this.setupCoreMetrics();
    this.setupCustomObservers();
    this.startReporting();
  }
  
  private setupCoreMetrics(): void {
    // Navigation Timing
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            this.recordNavigationMetrics(entry as PerformanceNavigationTiming);
          }
        }
      });
      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.set('navigation', navObserver);
      
      // Resource Timing
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordResourceMetrics(entry as PerformanceResourceTiming);
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', resourceObserver);
      
      // Paint Timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordPaintMetrics(entry);
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('paint', paintObserver);
      
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('lcp', lastEntry.startTime, {
          element: (lastEntry as any).element?.tagName,
          url: (lastEntry as any).url
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);
      
      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric('fid', (entry as any).processingStart - entry.startTime, {
            eventType: (entry as any).name
          });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);
      
      // Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        if (clsValue > 0) {
          this.recordMetric('cls', clsValue);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    }
    
    // Memory Usage
    this.setupMemoryMonitoring();
    
    // Frame Rate
    this.setupFrameRateMonitoring();
    
    // Network Information
    this.setupNetworkMonitoring();
  }
  
  private recordNavigationMetrics(entry: PerformanceNavigationTiming): void {
    const metrics = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ssl: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domParse: entry.domContentLoadedEventStart - entry.responseEnd,
      domReady: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart,
      totalTime: entry.loadEventEnd - entry.navigationStart
    };
    
    Object.entries(metrics).forEach(([key, value]) => {
      this.recordMetric(`navigation.${key}`, value);
    });
  }
  
  private recordResourceMetrics(entry: PerformanceResourceTiming): void {
    const resourceType = this.getResourceType(entry.name);
    const size = entry.transferSize || entry.encodedBodySize || 0;
    const duration = entry.responseEnd - entry.startTime;
    
    this.recordMetric(`resource.${resourceType}.duration`, duration, {
      url: entry.name,
      size
    });
    
    this.recordMetric(`resource.${resourceType}.size`, size, {
      url: entry.name
    });
    
    // Check for slow resources
    if (duration > 1000) { // > 1 second
      this.recordMetric('resource.slow', duration, {
        url: entry.name,
        type: resourceType,
        size
      });
    }
  }
  
  private recordPaintMetrics(entry: PerformanceEntry): void {
    this.recordMetric(entry.name.replace('-', '_'), entry.startTime);
  }
  
  private setupMemoryMonitoring(): void {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.recordMetric('memory.used', memory.usedJSHeapSize);
        this.recordMetric('memory.total', memory.totalJSHeapSize);
        this.recordMetric('memory.limit', memory.jsHeapSizeLimit);
        this.recordMetric('memory.utilization', 
          (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        );
      }, 5000);
    }
  }
  
  private setupFrameRateMonitoring(): void {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measureFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.recordMetric('fps', fps);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrameRate);
    };
    
    requestAnimationFrame(measureFrameRate);
  }
  
  private setupNetworkMonitoring(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const recordNetworkInfo = () => {
        this.recordMetric('network.downlink', connection.downlink);
        this.recordMetric('network.rtt', connection.rtt);
        this.recordMetric('network.effectiveType', connection.effectiveType, {
          type: 'categorical'
        });
      };
      
      recordNetworkInfo();
      connection.addEventListener('change', recordNetworkInfo);
    }
  }
  
  private setupCustomObservers(): void {
    // User Timing
    if ('PerformanceObserver' in window) {
      const userTimingObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(`user.${entry.name}`, entry.duration || entry.startTime, {
            type: entry.entryType
          });
        }
      });
      userTimingObserver.observe({ entryTypes: ['measure', 'mark'] });
      this.observers.set('userTiming', userTimingObserver);
    }
  }
  
  recordMetric(name: string, value: number, metadata?: any): void {
    const timestamp = Date.now();
    const metric: MetricData = {
      name,
      value,
      timestamp,
      metadata
    };
    
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const metricArray = this.metrics.get(name)!;
    metricArray.push(metric);
    
    // Keep only last 1000 entries per metric
    if (metricArray.length > 1000) {
      metricArray.shift();
    }
    
    // Check alert thresholds
    this.checkAlertThresholds(name, value, metadata);
  }
  
  recordCustomMetric(name: string, value: number, type: MetricType = 'gauge'): void {
    const customMetric: CustomMetric = {
      name,
      value,
      type,
      timestamp: Date.now()
    };
    
    this.customMetrics.set(name, customMetric);
    this.recordMetric(`custom.${name}`, value);
  }
  
  startTimer(name: string): () => void {
    const startTime = performance.now();
    return () => {
      const duration = performance.now() - startTime;
      this.recordMetric(`timer.${name}`, duration);
    };
  }
  
  setAlertThreshold(metricName: string, threshold: AlertThreshold): void {
    this.alertThresholds.set(metricName, threshold);
  }
  
  private checkAlertThresholds(name: string, value: number, metadata?: any): void {
    const threshold = this.alertThresholds.get(name);
    if (!threshold) return;
    
    let triggered = false;
    let severity: 'warning' | 'critical' = 'warning';
    
    if (threshold.critical !== undefined) {
      if (threshold.operator === 'gt' && value > threshold.critical) {
        triggered = true;
        severity = 'critical';
      } else if (threshold.operator === 'lt' && value < threshold.critical) {
        triggered = true;
        severity = 'critical';
      }
    }
    
    if (!triggered && threshold.warning !== undefined) {
      if (threshold.operator === 'gt' && value > threshold.warning) {
        triggered = true;
        severity = 'warning';
      } else if (threshold.operator === 'lt' && value < threshold.warning) {
        triggered = true;
        severity = 'warning';
      }
    }
    
    if (triggered) {
      this.reporter.reportAlert({
        metric: name,
        value,
        threshold: threshold[severity]!,
        severity,
        timestamp: Date.now(),
        metadata
      });
    }
  }
  
  private startReporting(): void {
    this.reportingTimer = window.setInterval(() => {
      this.generateReport();
    }, this.reportingInterval);
  }
  
  private generateReport(): void {
    const report: PerformanceReport = {
      timestamp: Date.now(),
      metrics: this.aggregateMetrics(),
      customMetrics: Array.from(this.customMetrics.values()),
      summary: this.generateSummary()
    };
    
    this.reporter.sendReport(report);
  }
  
  private aggregateMetrics(): AggregatedMetrics {
    const aggregated: AggregatedMetrics = {};
    
    for (const [name, values] of this.metrics) {
      if (values.length === 0) continue;
      
      const numericValues = values.map(v => v.value).filter(v => typeof v === 'number');
      if (numericValues.length === 0) continue;
      
      aggregated[name] = {
        count: numericValues.length,
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        avg: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
        p50: this.percentile(numericValues, 0.5),
        p90: this.percentile(numericValues, 0.9),
        p95: this.percentile(numericValues, 0.95),
        p99: this.percentile(numericValues, 0.99)
      };
    }
    
    return aggregated;
  }
  
  private percentile(values: number[], p: number): number {
    const sorted = values.slice().sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * p) - 1;
    return sorted[Math.max(0, index)];
  }
  
  private generateSummary(): PerformanceSummary {
    const metrics = this.aggregateMetrics();
    
    return {
      coreWebVitals: {
        lcp: metrics['lcp']?.p75 || 0,
        fid: metrics['fid']?.p75 || 0,
        cls: metrics['cls']?.avg || 0
      },
      loadTimes: {
        ttfb: metrics['navigation.ttfb']?.avg || 0,
        domReady: metrics['navigation.domReady']?.avg || 0,
        loadComplete: metrics['navigation.loadComplete']?.avg || 0
      },
      resources: {
        totalRequests: metrics['resource.total']?.count || 0,
        slowRequests: metrics['resource.slow']?.count || 0,
        averageSize: metrics['resource.size']?.avg || 0
      },
      performance: {
        averageFPS: metrics['fps']?.avg || 0,
        memoryUsage: metrics['memory.utilization']?.avg || 0
      }
    };
  }
  
  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    if (['js', 'mjs'].includes(extension || '')) return 'script';
    if (['css'].includes(extension || '')) return 'stylesheet';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) return 'image';
    if (['woff', 'woff2', 'ttf', 'otf'].includes(extension || '')) return 'font';
    if (['mp4', 'webm', 'ogg'].includes(extension || '')) return 'video';
    if (['mp3', 'wav', 'ogg'].includes(extension || '')) return 'audio';
    
    return 'other';
  }
  
  getMetrics(metricName?: string): MetricData[] {
    if (metricName) {
      return this.metrics.get(metricName) || [];
    }
    
    const allMetrics: MetricData[] = [];
    for (const metrics of this.metrics.values()) {
      allMetrics.push(...metrics);
    }
    return allMetrics;
  }
  
  destroy(): void {
    if (this.reportingTimer) {
      clearInterval(this.reportingTimer);
    }
    
    for (const observer of this.observers.values()) {
      observer.disconnect();
    }
    
    this.metrics.clear();
    this.customMetrics.clear();
    this.observers.clear();
  }
}

// Interfaces
interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  metadata?: any;
}

interface CustomMetric {
  name: string;
  value: number;
  type: MetricType;
  timestamp: number;
}

type MetricType = 'counter' | 'gauge' | 'histogram' | 'timer';

interface AlertThreshold {
  warning?: number;
  critical?: number;
  operator: 'gt' | 'lt';
}

interface MonitoringConfig {
  reportingInterval?: number;
  enableResourceTiming?: boolean;
  enableUserTiming?: boolean;
  enableMemoryMonitoring?: boolean;
  enableNetworkMonitoring?: boolean;
}

interface AggregatedMetrics {
  [key: string]: {
    count: number;
    min: number;
    max: number;
    avg: number;
    p50: number;
    p90: number;
    p95: number;
    p99: number;
  };
}

interface PerformanceReport {
  timestamp: number;
  metrics: AggregatedMetrics;
  customMetrics: CustomMetric[];
  summary: PerformanceSummary;
}

interface PerformanceSummary {
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
  loadTimes: {
    ttfb: number;
    domReady: number;
    loadComplete: number;
  };
  resources: {
    totalRequests: number;
    slowRequests: number;
    averageSize: number;
  };
  performance: {
    averageFPS: number;
    memoryUsage: number;
  };
}

interface Alert {
  metric: string;
  value: number;
  threshold: number;
  severity: 'warning' | 'critical';
  timestamp: number;
  metadata?: any;
}

// Metrics Reporter
class MetricsReporter {
  constructor(
    private endpoint: string,
    private apiKey: string
  ) {}
  
  async sendReport(report: PerformanceReport): Promise<void> {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(report)
      });
    } catch (error) {
      console.error('Failed to send performance report:', error);
    }
  }
  
  async reportAlert(alert: Alert): Promise<void> {
    try {
      await fetch(`${this.endpoint}/alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(alert)
      });
    } catch (error) {
      console.error('Failed to send alert:', error);
    }
  }
}

// Usage Example
const performanceMonitor = new PerformanceMetricsCollector(
  {
    reportingInterval: 30000,
    enableResourceTiming: true,
    enableUserTiming: true,
    enableMemoryMonitoring: true,
    enableNetworkMonitoring: true
  },
  new MetricsReporter('/api/metrics', 'your-api-key')
);

// Set alert thresholds
performanceMonitor.setAlertThreshold('lcp', {
  warning: 2500,
  critical: 4000,
  operator: 'gt'
});

performanceMonitor.setAlertThreshold('fid', {
  warning: 100,
  critical: 300,
  operator: 'gt'
});

performanceMonitor.setAlertThreshold('cls', {
  warning: 0.1,
  critical: 0.25,
  operator: 'gt'
});

// Record custom metrics
const apiTimer = performanceMonitor.startTimer('api.user.fetch');
// ... API call
apiTimer();

performanceMonitor.recordCustomMetric('user.actions', 1, 'counter');
```

---

### Q9: How do you implement advanced performance optimization for modern web applications?
**Difficulty: Expert**

**Answer:**
Modern web applications require sophisticated performance optimization strategies that leverage cutting-edge browser APIs, advanced bundling techniques, and intelligent resource management.

**1. Advanced Bundle Optimization and Code Splitting:**
```javascript
// Advanced Webpack configuration for optimal performance
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    vendor: ['react', 'react-dom'],
    polyfills: './src/polyfills.js'
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: '/'
  },
  
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info']
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false,
            ascii_only: true
          }
        },
        extractComments: false
      })
    ],
    
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    
    runtimeChunk: {
      name: 'runtime'
    },
    
    moduleIds: 'deterministic',
    chunkIds: 'deterministic'
  },
  
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11
      },
      threshold: 8192,
      minRatio: 0.8,
      filename: '[path][base].br'
    }),
    
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
};

// Advanced dynamic import with intelligent preloading
class IntelligentModuleLoader {
  constructor() {
    this.loadedModules = new Map();
    this.preloadQueue = new Set();
    this.loadingPromises = new Map();
    this.userBehaviorTracker = new UserBehaviorTracker();
  }
  
  async loadModule(moduleName, priority = 'normal') {
    if (this.loadedModules.has(moduleName)) {
      return this.loadedModules.get(moduleName);
    }
    
    if (this.loadingPromises.has(moduleName)) {
      return this.loadingPromises.get(moduleName);
    }
    
    const loadPromise = this.performLoad(moduleName, priority);
    this.loadingPromises.set(moduleName, loadPromise);
    
    try {
      const module = await loadPromise;
      this.loadedModules.set(moduleName, module);
      this.loadingPromises.delete(moduleName);
      return module;
    } catch (error) {
      this.loadingPromises.delete(moduleName);
      throw error;
    }
  }
  
  async performLoad(moduleName, priority) {
    const moduleMap = {
      'dashboard': () => import(/* webpackChunkName: "dashboard" */ './components/Dashboard'),
      'analytics': () => import(/* webpackChunkName: "analytics" */ './components/Analytics'),
      'settings': () => import(/* webpackChunkName: "settings" */ './components/Settings'),
      'reports': () => import(/* webpackChunkName: "reports" */ './components/Reports')
    };
    
    if (!moduleMap[moduleName]) {
      throw new Error(`Module ${moduleName} not found`);
    }
    
    // Implement priority-based loading
    if (priority === 'high') {
      return moduleMap[moduleName]();
    }
    
    // For normal priority, check network conditions
    const connection = navigator.connection;
    if (connection && connection.effectiveType === 'slow-2g') {
      // Defer loading on slow connections
      await this.waitForBetterConnection();
    }
    
    return moduleMap[moduleName]();
  }
  
  preloadModule(moduleName) {
    if (!this.loadedModules.has(moduleName) && !this.preloadQueue.has(moduleName)) {
      this.preloadQueue.add(moduleName);
      
      // Use requestIdleCallback for non-critical preloading
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          this.loadModule(moduleName, 'low');
        });
      } else {
        setTimeout(() => {
          this.loadModule(moduleName, 'low');
        }, 100);
      }
    }
  }
  
  async waitForBetterConnection() {
    return new Promise((resolve) => {
      const checkConnection = () => {
        const connection = navigator.connection;
        if (!connection || connection.effectiveType !== 'slow-2g') {
          resolve();
        } else {
          setTimeout(checkConnection, 1000);
        }
      };
      checkConnection();
    });
  }
  
  // Predictive preloading based on user behavior
  enablePredictivePreloading() {
    this.userBehaviorTracker.onPatternDetected((pattern) => {
      const likelyNextModules = this.predictNextModules(pattern);
      likelyNextModules.forEach(module => this.preloadModule(module));
    });
  }
  
  predictNextModules(pattern) {
    // Simple prediction logic - can be enhanced with ML
    const predictions = {
      'dashboard->analytics': ['reports'],
      'analytics->reports': ['dashboard'],
      'settings->dashboard': ['analytics']
    };
    
    return predictions[pattern] || [];
  }
}

// User behavior tracking for predictive loading
class UserBehaviorTracker {
  constructor() {
    this.navigationHistory = [];
    this.patterns = new Map();
    this.callbacks = [];
  }
  
  trackNavigation(from, to) {
    this.navigationHistory.push({ from, to, timestamp: Date.now() });
    
    // Keep only recent history
    if (this.navigationHistory.length > 50) {
      this.navigationHistory = this.navigationHistory.slice(-50);
    }
    
    this.analyzePatterns();
  }
  
  analyzePatterns() {
    const recentHistory = this.navigationHistory.slice(-10);
    
    for (let i = 0; i < recentHistory.length - 1; i++) {
      const pattern = `${recentHistory[i].from}->${recentHistory[i].to}`;
      const count = this.patterns.get(pattern) || 0;
      this.patterns.set(pattern, count + 1);
      
      // Trigger callbacks for frequent patterns
      if (count > 2) {
        this.callbacks.forEach(callback => callback(pattern));
      }
    }
  }
  
  onPatternDetected(callback) {
    this.callbacks.push(callback);
  }
}
```

**2. Advanced Performance Monitoring and Optimization:**
```javascript
// Real-time performance optimization system
class AdvancedPerformanceOptimizer {
  constructor() {
    this.metrics = new Map();
    this.optimizations = new Map();
    this.observers = [];
    this.adaptiveSettings = {
      imageQuality: 0.8,
      animationDuration: 300,
      debounceDelay: 100,
      chunkSize: 50
    };
    
    this.init();
  }
  
  init() {
    this.setupPerformanceObservers();
    this.setupNetworkObserver();
    this.setupMemoryMonitoring();
    this.setupAdaptiveOptimizations();
  }
  
  setupPerformanceObservers() {
    // Core Web Vitals observer
    const vitalsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.processVitalMetric(entry);
      }
    });
    
    vitalsObserver.observe({
      entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']
    });
    
    // Long task observer
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.handleLongTask(entry);
      }
    });
    
    longTaskObserver.observe({ entryTypes: ['longtask'] });
    
    this.observers.push(vitalsObserver, longTaskObserver);
  }
  
  processVitalMetric(entry) {
    const metricName = entry.entryType;
    const value = entry.value || entry.startTime;
    
    this.metrics.set(metricName, value);
    
    // Trigger optimizations based on thresholds
    if (metricName === 'largest-contentful-paint' && value > 2500) {
      this.optimizeLCP();
    }
    
    if (metricName === 'first-input' && value > 100) {
      this.optimizeFID();
    }
    
    if (metricName === 'layout-shift' && value > 0.1) {
      this.optimizeCLS();
    }
  }
  
  handleLongTask(entry) {
    console.warn(`Long task detected: ${entry.duration}ms`);
    
    // Break up long tasks
    if (entry.duration > 50) {
      this.scheduleTaskBreaking();
    }
  }
  
  optimizeLCP() {
    // Reduce image quality for faster loading
    this.adaptiveSettings.imageQuality = Math.max(0.6, this.adaptiveSettings.imageQuality - 0.1);
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Optimize font loading
    this.optimizeFontLoading();
  }
  
  optimizeFID() {
    // Increase debounce delays
    this.adaptiveSettings.debounceDelay = Math.min(200, this.adaptiveSettings.debounceDelay + 20);
    
    // Reduce animation complexity
    this.adaptiveSettings.animationDuration = Math.max(150, this.adaptiveSettings.animationDuration - 50);
    
    // Break up heavy computations
    this.scheduleTaskBreaking();
  }
  
  optimizeCLS() {
    // Reserve space for dynamic content
    this.reserveContentSpace();
    
    // Optimize image loading
    this.optimizeImageLoading();
  }
  
  scheduleTaskBreaking() {
    // Implement task scheduling for better responsiveness
    const scheduler = {
      postTask: (callback, options = {}) => {
        if ('scheduler' in window && 'postTask' in window.scheduler) {
          return window.scheduler.postTask(callback, options);
        }
        
        // Fallback to setTimeout with priority simulation
        const delay = options.priority === 'user-blocking' ? 0 : 5;
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(callback());
          }, delay);
        });
      }
    };
    
    // Break heavy tasks into smaller chunks
    this.optimizations.set('taskBreaking', scheduler);
  }
  
  setupNetworkObserver() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      const updateNetworkOptimizations = () => {
        const effectiveType = connection.effectiveType;
        
        switch (effectiveType) {
          case 'slow-2g':
          case '2g':
            this.adaptiveSettings.imageQuality = 0.5;
            this.adaptiveSettings.chunkSize = 20;
            break;
          case '3g':
            this.adaptiveSettings.imageQuality = 0.7;
            this.adaptiveSettings.chunkSize = 35;
            break;
          case '4g':
            this.adaptiveSettings.imageQuality = 0.9;
            this.adaptiveSettings.chunkSize = 100;
            break;
        }
      };
      
      connection.addEventListener('change', updateNetworkOptimizations);
      updateNetworkOptimizations();
    }
  }
  
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        
        if (memoryUsage > 0.8) {
          this.triggerMemoryOptimization();
        }
      }, 10000);
    }
  }
  
  triggerMemoryOptimization() {
    // Clear caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('old-') || name.includes('temp-')) {
            caches.delete(name);
          }
        });
      });
    }
    
    // Trigger garbage collection hints
    if (window.gc) {
      window.gc();
    }
  }
  
  getOptimizedSettings() {
    return { ...this.adaptiveSettings };
  }
  
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// Usage example
const performanceOptimizer = new AdvancedPerformanceOptimizer();
const moduleLoader = new IntelligentModuleLoader();

// Enable predictive preloading
moduleLoader.enablePredictivePreloading();

// Get adaptive settings for components
const settings = performanceOptimizer.getOptimizedSettings();
console.log('Current adaptive settings:', settings);
```

---

### Q10: How do you implement advanced caching strategies and service worker optimization?
**Difficulty: Expert**

**Answer:**
Advanced caching strategies involve sophisticated service worker implementations, intelligent cache management, and adaptive caching based on user behavior and network conditions.

**1. Advanced Service Worker with Intelligent Caching:**
```javascript
// Advanced service worker implementation
class AdvancedServiceWorker {
  constructor() {
    this.CACHE_VERSION = 'v2.1.0';
    this.STATIC_CACHE = `static-${this.CACHE_VERSION}`;
    this.DYNAMIC_CACHE = `dynamic-${this.CACHE_VERSION}`;
    this.API_CACHE = `api-${this.CACHE_VERSION}`;
    this.IMAGE_CACHE = `images-${this.CACHE_VERSION}`;
    
    this.CACHE_STRATEGIES = {
      CACHE_FIRST: 'cache-first',
      NETWORK_FIRST: 'network-first',
      STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
      NETWORK_ONLY: 'network-only',
      CACHE_ONLY: 'cache-only'
    };
    
    this.routeStrategies = new Map();
    this.cacheMetrics = new Map();
    this.setupRouteStrategies();
  }
  
  setupRouteStrategies() {
    // Static assets - Cache First
    this.routeStrategies.set(/\.(js|css|woff2?|png|jpg|jpeg|svg|ico)$/, {
      strategy: this.CACHE_STRATEGIES.CACHE_FIRST,
      cacheName: this.STATIC_CACHE,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      maxEntries: 100
    });
    
    // API calls - Network First with fallback
    this.routeStrategies.set(/\/api\//, {
      strategy: this.CACHE_STRATEGIES.NETWORK_FIRST,
      cacheName: this.API_CACHE,
      maxAge: 5 * 60 * 1000, // 5 minutes
      maxEntries: 50,
      networkTimeout: 3000
    });
    
    // Images - Stale While Revalidate
    this.routeStrategies.set(/\.(webp|avif|png|jpg|jpeg|gif)$/, {
      strategy: this.CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
      cacheName: this.IMAGE_CACHE,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      maxEntries: 200
    });
    
    // HTML pages - Network First
    this.routeStrategies.set(/\.html$|\/$/, {
      strategy: this.CACHE_STRATEGIES.NETWORK_FIRST,
      cacheName: this.DYNAMIC_CACHE,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      maxEntries: 30,
      networkTimeout: 2000
    });
  }
  
  async handleFetch(event) {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
      return fetch(request);
    }
    
    // Find matching route strategy
    const routeConfig = this.findRouteStrategy(url.pathname + url.search);
    
    if (!routeConfig) {
      return fetch(request);
    }
    
    // Apply caching strategy
    switch (routeConfig.strategy) {
      case this.CACHE_STRATEGIES.CACHE_FIRST:
        return this.cacheFirst(request, routeConfig);
      case this.CACHE_STRATEGIES.NETWORK_FIRST:
        return this.networkFirst(request, routeConfig);
      case this.CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
        return this.staleWhileRevalidate(request, routeConfig);
      case this.CACHE_STRATEGIES.NETWORK_ONLY:
        return fetch(request);
      case this.CACHE_STRATEGIES.CACHE_ONLY:
        return caches.match(request);
      default:
        return fetch(request);
    }
  }
  
  findRouteStrategy(path) {
    for (const [pattern, config] of this.routeStrategies) {
      if (pattern.test(path)) {
        return config;
      }
    }
    return null;
  }
  
  async cacheFirst(request, config) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Check if cache entry is still valid
      const cacheDate = new Date(cachedResponse.headers.get('sw-cache-date'));
      const isExpired = Date.now() - cacheDate.getTime() > config.maxAge;
      
      if (!isExpired) {
        this.updateCacheMetrics(config.cacheName, 'hit');
        return cachedResponse;
      }
    }
    
    try {
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        await this.putInCache(request, networkResponse.clone(), config);
        this.updateCacheMetrics(config.cacheName, 'miss');
      }
      
      return networkResponse;
    } catch (error) {
      // Return stale cache if network fails
      if (cachedResponse) {
        this.updateCacheMetrics(config.cacheName, 'stale');
        return cachedResponse;
      }
      throw error;
    }
  }
  
  async networkFirst(request, config) {
    try {
      const networkResponse = await Promise.race([
        fetch(request),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Network timeout')), config.networkTimeout)
        )
      ]);
      
      if (networkResponse.ok) {
        await this.putInCache(request, networkResponse.clone(), config);
        this.updateCacheMetrics(config.cacheName, 'network');
      }
      
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      
      if (cachedResponse) {
        this.updateCacheMetrics(config.cacheName, 'fallback');
        return cachedResponse;
      }
      
      throw error;
    }
  }
  
  async staleWhileRevalidate(request, config) {
    const cachedResponse = await caches.match(request);
    
    // Always try to fetch from network in background
    const networkResponsePromise = fetch(request).then(response => {
      if (response.ok) {
        this.putInCache(request, response.clone(), config);
      }
      return response;
    }).catch(() => null);
    
    // Return cached response immediately if available
    if (cachedResponse) {
      this.updateCacheMetrics(config.cacheName, 'stale');
      return cachedResponse;
    }
    
    // Wait for network response if no cache
    const networkResponse = await networkResponsePromise;
    if (networkResponse) {
      this.updateCacheMetrics(config.cacheName, 'network');
      return networkResponse;
    }
    
    throw new Error('No cached response and network failed');
  }
  
  async putInCache(request, response, config) {
    const cache = await caches.open(config.cacheName);
    
    // Add cache metadata
    const responseWithMetadata = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        'sw-cache-date': new Date().toISOString(),
        'sw-cache-strategy': config.strategy
      }
    });
    
    await cache.put(request, responseWithMetadata);
    
    // Enforce cache size limits
    await this.enforceCacheLimit(config.cacheName, config.maxEntries);
  }
  
  async enforceCacheLimit(cacheName, maxEntries) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxEntries) {
      // Remove oldest entries (FIFO)
      const entriesToDelete = keys.slice(0, keys.length - maxEntries);
      await Promise.all(entriesToDelete.map(key => cache.delete(key)));
    }
  }
  
  updateCacheMetrics(cacheName, type) {
    const metrics = this.cacheMetrics.get(cacheName) || {
      hits: 0,
      misses: 0,
      stale: 0,
      network: 0,
      fallback: 0
    };
    
    metrics[type] = (metrics[type] || 0) + 1;
    this.cacheMetrics.set(cacheName, metrics);
  }
  
  async getCacheMetrics() {
    return Object.fromEntries(this.cacheMetrics);
  }
  
  async clearOldCaches() {
    const cacheNames = await caches.keys();
    const currentCaches = [
      this.STATIC_CACHE,
      this.DYNAMIC_CACHE,
      this.API_CACHE,
      this.IMAGE_CACHE
    ];
    
    const oldCaches = cacheNames.filter(name => !currentCaches.includes(name));
    
    await Promise.all(oldCaches.map(name => caches.delete(name)));
  }
}

// Service worker registration and lifecycle
self.addEventListener('install', (event) => {
  const sw = new AdvancedServiceWorker();
  
  event.waitUntil(
    (async () => {
      // Pre-cache critical resources
      const cache = await caches.open(sw.STATIC_CACHE);
      await cache.addAll([
        '/',
        '/manifest.json',
        '/offline.html',
        '/css/critical.css',
        '/js/app.js'
      ]);
      
      // Skip waiting to activate immediately
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  const sw = new AdvancedServiceWorker();
  
  event.waitUntil(
    (async () => {
      // Clear old caches
      await sw.clearOldCaches();
      
      // Claim all clients
      await clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const sw = new AdvancedServiceWorker();
  event.respondWith(sw.handleFetch(event));
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Process queued actions when back online
  const db = await openDB('offline-actions', 1);
  const actions = await db.getAll('actions');
  
  for (const action of actions) {
    try {
      await fetch(action.url, action.options);
      await db.delete('actions', action.id);
    } catch (error) {
      console.error('Failed to sync action:', error);
    }
  }
}
```

### Q11: How would you implement advanced performance monitoring and optimization for modern web applications?

**Answer:**
Advanced performance monitoring involves real-time tracking, automated optimization, and predictive performance management to ensure optimal user experience.

**Comprehensive Performance Monitoring System:**

1. **Real-time Performance Analytics:**
```typescript
// Advanced performance monitoring service
@Injectable({ providedIn: 'root' })
export class AdvancedPerformanceMonitor {
  private metricsBuffer: PerformanceMetric[] = [];
  private observer: PerformanceObserver;
  private vitalsCollector: WebVitalsCollector;
  
  constructor(
    private analytics: AnalyticsService,
    private alerting: AlertingService
  ) {
    this.initializeMonitoring();
  }
  
  private initializeMonitoring() {
    // Core Web Vitals monitoring
    this.vitalsCollector = new WebVitalsCollector({
      onCLS: (metric) => this.handleMetric('CLS', metric),
      onFID: (metric) => this.handleMetric('FID', metric),
      onFCP: (metric) => this.handleMetric('FCP', metric),
      onLCP: (metric) => this.handleMetric('LCP', metric),
      onTTFB: (metric) => this.handleMetric('TTFB', metric),
      onINP: (metric) => this.handleMetric('INP', metric)
    });
    
    // Performance Observer for detailed metrics
    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.processPerformanceEntry(entry);
      }
    });
    
    this.observer.observe({
      entryTypes: [
        'navigation',
        'resource',
        'paint',
        'largest-contentful-paint',
        'layout-shift',
        'long-animation-frame',
        'user-timing',
        'measure'
      ]
    });
    
    // Memory usage monitoring
    this.monitorMemoryUsage();
    
    // Network quality monitoring
    this.monitorNetworkQuality();
    
    // Frame rate monitoring
    this.monitorFrameRate();
  }
  
  private handleMetric(name: string, metric: any) {
    const performanceMetric: PerformanceMetric = {
      name,
      value: metric.value,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connectionType: this.getConnectionType(),
      deviceMemory: (navigator as any).deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency
    };
    
    this.metricsBuffer.push(performanceMetric);
    
    // Check for performance violations
    this.checkPerformanceThresholds(performanceMetric);
    
    // Batch send metrics
    if (this.metricsBuffer.length >= 10) {
      this.sendMetrics();
    }
  }
  
  private checkPerformanceThresholds(metric: PerformanceMetric) {
    const thresholds = {
      CLS: { warning: 0.1, critical: 0.25 },
      FID: { warning: 100, critical: 300 },
      LCP: { warning: 2500, critical: 4000 },
      FCP: { warning: 1800, critical: 3000 },
      TTFB: { warning: 800, critical: 1800 }
    };
    
    const threshold = thresholds[metric.name];
    if (threshold) {
      if (metric.value > threshold.critical) {
        this.alerting.sendAlert({
          level: 'critical',
          metric: metric.name,
          value: metric.value,
          threshold: threshold.critical,
          url: metric.url
        });
      } else if (metric.value > threshold.warning) {
        this.alerting.sendAlert({
          level: 'warning',
          metric: metric.name,
          value: metric.value,
          threshold: threshold.warning,
          url: metric.url
        });
      }
    }
  }
  
  private monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const memoryMetric = {
          name: 'Memory',
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          timestamp: Date.now()
        };
        
        // Alert if memory usage is high
        const memoryUsagePercent = 
          (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        
        if (memoryUsagePercent > 80) {
          this.alerting.sendAlert({
            level: 'warning',
            metric: 'Memory Usage',
            value: memoryUsagePercent,
            threshold: 80
          });
        }
        
        this.analytics.track('memory-usage', memoryMetric);
      }, 30000); // Check every 30 seconds
    }
  }
  
  private monitorNetworkQuality() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const networkMetric = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
      
      this.analytics.track('network-quality', networkMetric);
      
      // Adjust performance strategies based on network
      this.adaptToNetworkConditions(networkMetric);
    }
  }
  
  private monitorFrameRate() {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        this.analytics.track('frame-rate', { fps, timestamp: currentTime });
        
        // Alert if FPS is consistently low
        if (fps < 30) {
          this.alerting.sendAlert({
            level: 'warning',
            metric: 'Frame Rate',
            value: fps,
            threshold: 30
          });
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }
}
```

2. **Automated Performance Optimization:**
```typescript
// Intelligent resource optimization service
@Injectable({ providedIn: 'root' })
export class IntelligentOptimizer {
  private optimizationStrategies: Map<string, OptimizationStrategy> = new Map();
  private performanceHistory: PerformanceSnapshot[] = [];
  
  constructor(
    private monitor: AdvancedPerformanceMonitor,
    private resourceLoader: ResourceLoaderService
  ) {
    this.initializeStrategies();
  }
  
  private initializeStrategies() {
    // Image optimization strategy
    this.optimizationStrategies.set('images', {
      analyze: () => this.analyzeImagePerformance(),
      optimize: (data) => this.optimizeImages(data),
      priority: 'high'
    });
    
    // JavaScript bundle optimization
    this.optimizationStrategies.set('bundles', {
      analyze: () => this.analyzeBundlePerformance(),
      optimize: (data) => this.optimizeBundles(data),
      priority: 'high'
    });
    
    // CSS optimization strategy
    this.optimizationStrategies.set('css', {
      analyze: () => this.analyzeCSSPerformance(),
      optimize: (data) => this.optimizeCSS(data),
      priority: 'medium'
    });
    
    // Font optimization strategy
    this.optimizationStrategies.set('fonts', {
      analyze: () => this.analyzeFontPerformance(),
      optimize: (data) => this.optimizeFonts(data),
      priority: 'medium'
    });
  }
  
  async performIntelligentOptimization() {
    const currentSnapshot = await this.capturePerformanceSnapshot();
    this.performanceHistory.push(currentSnapshot);
    
    // Analyze trends
    const trends = this.analyzeTrends();
    
    // Determine optimization priorities
    const priorities = this.calculateOptimizationPriorities(trends);
    
    // Execute optimizations
    for (const [strategy, priority] of priorities) {
      if (priority > 0.7) { // High priority threshold
        await this.executeOptimization(strategy);
      }
    }
  }
  
  private async optimizeImages(analysisData: any) {
    // Implement intelligent image optimization
    const images = document.querySelectorAll('img');
    
    for (const img of images) {
      // Check if image is in viewport
      if (this.isInViewport(img)) {
        // Apply immediate optimizations
        await this.applyImageOptimizations(img, 'immediate');
      } else {
        // Apply lazy loading optimizations
        await this.applyImageOptimizations(img, 'lazy');
      }
    }
  }
  
  private async optimizeBundles(analysisData: any) {
    // Dynamic bundle splitting based on usage patterns
    const unusedModules = await this.identifyUnusedModules();
    
    // Remove unused code
    for (const module of unusedModules) {
      await this.removeUnusedModule(module);
    }
    
    // Implement predictive preloading
    const predictedModules = await this.predictNextModules();
    
    for (const module of predictedModules) {
      this.resourceLoader.preloadModule(module);
    }
  }
}
```

3. **Predictive Performance Management:**
```typescript
// Machine learning-based performance predictor
@Injectable({ providedIn: 'root' })
export class PerformancePredictor {
  private model: TensorFlowModel;
  private trainingData: PerformanceDataPoint[] = [];
  
  constructor() {
    this.initializeModel();
  }
  
  private async initializeModel() {
    // Load pre-trained model or create new one
    try {
      this.model = await tf.loadLayersModel('/assets/models/performance-model.json');
    } catch {
      this.model = this.createNewModel();
    }
  }
  
  private createNewModel(): tf.Sequential {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [10], units: 64, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'linear' })
      ]
    });
    
    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['mae']
    });
    
    return model;
  }
  
  async predictPerformance(context: PerformanceContext): Promise<PerformancePrediction> {
    const features = this.extractFeatures(context);
    const prediction = this.model.predict(tf.tensor2d([features])) as tf.Tensor;
    const result = await prediction.data();
    
    return {
      expectedLCP: result[0],
      confidence: this.calculateConfidence(features),
      recommendations: this.generateRecommendations(features, result[0])
    };
  }
  
  private extractFeatures(context: PerformanceContext): number[] {
    return [
      context.resourceCount,
      context.totalResourceSize,
      context.imageCount,
      context.scriptCount,
      context.cssCount,
      context.networkSpeed,
      context.deviceMemory,
      context.cpuCores,
      context.viewportWidth,
      context.viewportHeight
    ];
  }
  
  private generateRecommendations(
    features: number[], 
    predictedLCP: number
  ): PerformanceRecommendation[] {
    const recommendations: PerformanceRecommendation[] = [];
    
    if (predictedLCP > 2500) {
      if (features[1] > 1000000) { // Large total resource size
        recommendations.push({
          type: 'resource-optimization',
          priority: 'high',
          description: 'Reduce total resource size',
          expectedImprovement: 800
        });
      }
      
      if (features[2] > 10) { // Many images
        recommendations.push({
          type: 'image-optimization',
          priority: 'high',
          description: 'Optimize images and implement lazy loading',
          expectedImprovement: 600
        });
      }
    }
    
    return recommendations;
  }
}
```

### Q12: How would you implement advanced caching strategies and edge optimization for global performance?

**Answer:**
Advanced caching strategies involve multi-layered caching, intelligent cache invalidation, and edge computing optimization to deliver optimal performance globally.

**Multi-layered Caching Architecture:**

1. **Intelligent Service Worker Caching:**
```typescript
// Advanced service worker with intelligent caching
class IntelligentServiceWorker {
  private cacheStrategies: Map<string, CacheStrategy> = new Map();
  private performanceMetrics: PerformanceTracker;
  private networkAnalyzer: NetworkAnalyzer;
  
  constructor() {
    this.initializeCacheStrategies();
    this.performanceMetrics = new PerformanceTracker();
    this.networkAnalyzer = new NetworkAnalyzer();
  }
  
  private initializeCacheStrategies() {
    // Critical resources - Cache First with Network Fallback
    this.cacheStrategies.set('critical', {
      strategy: 'cache-first',
      maxAge: 86400000, // 24 hours
      updateStrategy: 'background-sync',
      priority: 'high'
    });
    
    // API responses - Stale While Revalidate
    this.cacheStrategies.set('api', {
      strategy: 'stale-while-revalidate',
      maxAge: 300000, // 5 minutes
      updateStrategy: 'immediate',
      priority: 'medium'
    });
    
    // Static assets - Cache First with versioning
    this.cacheStrategies.set('static', {
      strategy: 'cache-first',
      maxAge: 31536000000, // 1 year
      updateStrategy: 'version-based',
      priority: 'low'
    });
    
    // Dynamic content - Network First with Cache Fallback
    this.cacheStrategies.set('dynamic', {
      strategy: 'network-first',
      maxAge: 60000, // 1 minute
      updateStrategy: 'conditional',
      priority: 'medium'
    });
  }
  
  async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const cacheKey = this.generateCacheKey(request);
    const strategy = this.determineCacheStrategy(url);
    
    // Track request for analytics
    this.performanceMetrics.trackRequest(request);
    
    switch (strategy.strategy) {
      case 'cache-first':
        return this.cacheFirstStrategy(request, cacheKey, strategy);
      case 'network-first':
        return this.networkFirstStrategy(request, cacheKey, strategy);
      case 'stale-while-revalidate':
        return this.staleWhileRevalidateStrategy(request, cacheKey, strategy);
      default:
        return fetch(request);
    }
  }
  
  private async cacheFirstStrategy(
    request: Request, 
    cacheKey: string, 
    strategy: CacheStrategy
  ): Promise<Response> {
    const cache = await caches.open('intelligent-cache-v1');
    const cachedResponse = await cache.match(cacheKey);
    
    if (cachedResponse && !this.isCacheExpired(cachedResponse, strategy.maxAge)) {
      // Update cache in background if needed
      if (strategy.updateStrategy === 'background-sync') {
        this.backgroundUpdate(request, cacheKey);
      }
      
      return cachedResponse;
    }
    
    try {
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        // Clone response for caching
        const responseToCache = networkResponse.clone();
        
        // Add metadata for intelligent caching
        const enhancedResponse = this.enhanceResponseWithMetadata(
          responseToCache, 
          strategy
        );
        
        await cache.put(cacheKey, enhancedResponse);
      }
      
      return networkResponse;
    } catch (error) {
      // Return stale cache if available
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }
  
  private async staleWhileRevalidateStrategy(
    request: Request,
    cacheKey: string,
    strategy: CacheStrategy
  ): Promise<Response> {
    const cache = await caches.open('intelligent-cache-v1');
    const cachedResponse = await cache.match(cacheKey);
    
    // Always try to update cache in background
    const networkPromise = fetch(request).then(async (response) => {
      if (response.ok) {
        const responseToCache = response.clone();
        const enhancedResponse = this.enhanceResponseWithMetadata(
          responseToCache,
          strategy
        );
        await cache.put(cacheKey, enhancedResponse);
      }
      return response;
    });
    
    // Return cached version immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Otherwise wait for network
    return networkPromise;
  }
  
  private generateCacheKey(request: Request): string {
    const url = new URL(request.url);
    
    // Include relevant parameters in cache key
    const relevantParams = ['version', 'locale', 'theme'];
    const params = new URLSearchParams();
    
    for (const param of relevantParams) {
      if (url.searchParams.has(param)) {
        params.set(param, url.searchParams.get(param)!);
      }
    }
    
    return `${url.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  }
  
  private enhanceResponseWithMetadata(
    response: Response,
    strategy: CacheStrategy
  ): Response {
    const headers = new Headers(response.headers);
    headers.set('sw-cached-at', Date.now().toString());
    headers.set('sw-cache-strategy', strategy.strategy);
    headers.set('sw-max-age', strategy.maxAge.toString());
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
}
```

2. **Edge Computing Optimization:**
```typescript
// Edge computing service for global performance
@Injectable({ providedIn: 'root' })
export class EdgeOptimizationService {
  private edgeNodes: Map<string, EdgeNode> = new Map();
  private geolocationService: GeolocationService;
  private performanceAnalyzer: PerformanceAnalyzer;
  
  constructor() {
    this.initializeEdgeNodes();
    this.geolocationService = new GeolocationService();
    this.performanceAnalyzer = new PerformanceAnalyzer();
  }
  
  private initializeEdgeNodes() {
    // Define edge nodes with their capabilities
    this.edgeNodes.set('us-east-1', {
      region: 'us-east-1',
      capabilities: ['image-optimization', 'html-minification', 'gzip'],
      latency: 50,
      load: 0.3
    });
    
    this.edgeNodes.set('eu-west-1', {
      region: 'eu-west-1',
      capabilities: ['image-optimization', 'css-optimization', 'brotli'],
      latency: 45,
      load: 0.2
    });
    
    this.edgeNodes.set('ap-southeast-1', {
      region: 'ap-southeast-1',
      capabilities: ['image-optimization', 'js-minification'],
      latency: 60,
      load: 0.4
    });
  }
  
  async optimizeRequest(request: Request): Promise<OptimizedRequest> {
    const userLocation = await this.geolocationService.getUserLocation();
    const optimalEdge = this.selectOptimalEdgeNode(userLocation);
    
    // Determine optimization strategies based on request type
    const optimizations = this.determineOptimizations(request, optimalEdge);
    
    return {
      edgeNode: optimalEdge,
      optimizations,
      estimatedImprovement: this.calculateExpectedImprovement(optimizations)
    };
  }
  
  private selectOptimalEdgeNode(userLocation: UserLocation): EdgeNode {
    let bestNode: EdgeNode | null = null;
    let bestScore = Infinity;
    
    for (const [_, node] of this.edgeNodes) {
      // Calculate distance-based latency
      const distance = this.calculateDistance(userLocation, node.region);
      const estimatedLatency = node.latency + (distance * 0.1);
      
      // Factor in current load
      const loadPenalty = node.load * 100;
      
      // Calculate overall score
      const score = estimatedLatency + loadPenalty;
      
      if (score < bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }
    
    return bestNode!;
  }
  
  private determineOptimizations(
    request: Request,
    edgeNode: EdgeNode
  ): EdgeOptimization[] {
    const optimizations: EdgeOptimization[] = [];
    const url = new URL(request.url);
    
    // Image optimization
    if (url.pathname.match(/\.(jpg|jpeg|png|webp)$/i)) {
      if (edgeNode.capabilities.includes('image-optimization')) {
        optimizations.push({
          type: 'image-optimization',
          parameters: {
            format: 'webp',
            quality: 85,
            progressive: true
          },
          expectedSavings: 0.4 // 40% size reduction
        });
      }
    }
    
    // JavaScript optimization
    if (url.pathname.match(/\.js$/i)) {
      if (edgeNode.capabilities.includes('js-minification')) {
        optimizations.push({
          type: 'js-minification',
          parameters: {
            removeComments: true,
            removeWhitespace: true,
            mangleNames: true
          },
          expectedSavings: 0.3
        });
      }
    }
    
    // CSS optimization
    if (url.pathname.match(/\.css$/i)) {
      if (edgeNode.capabilities.includes('css-optimization')) {
        optimizations.push({
          type: 'css-optimization',
          parameters: {
            removeUnusedRules: true,
            minify: true,
            autoprefixer: true
          },
          expectedSavings: 0.25
        });
      }
    }
    
    // Compression optimization
    if (edgeNode.capabilities.includes('brotli')) {
      optimizations.push({
        type: 'compression',
        parameters: {
          algorithm: 'brotli',
          level: 6
        },
        expectedSavings: 0.2
      });
    } else if (edgeNode.capabilities.includes('gzip')) {
      optimizations.push({
        type: 'compression',
        parameters: {
          algorithm: 'gzip',
          level: 6
        },
        expectedSavings: 0.15
      });
    }
    
    return optimizations;
  }
}
```

3. **Adaptive Performance Strategies:**
```typescript
// Adaptive performance manager
@Injectable({ providedIn: 'root' })
export class AdaptivePerformanceManager {
  private currentStrategy: PerformanceStrategy = 'balanced';
  private deviceCapabilities: DeviceCapabilities;
  private networkConditions: NetworkConditions;
  
  constructor(
    private monitor: AdvancedPerformanceMonitor,
    private optimizer: IntelligentOptimizer
  ) {
    this.initializeAdaptiveStrategies();
  }
  
  private initializeAdaptiveStrategies() {
    // Monitor device capabilities
    this.deviceCapabilities = {
      memory: (navigator as any).deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4,
      connection: (navigator as any).connection?.effectiveType || '4g'
    };
    
    // Adapt strategy based on capabilities
    this.adaptStrategy();
    
    // Listen for network changes
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', () => {
        this.adaptStrategy();
      });
    }
  }
  
  private adaptStrategy() {
    const score = this.calculateDeviceScore();
    
    if (score >= 8) {
      this.currentStrategy = 'aggressive';
      this.applyAggressiveOptimizations();
    } else if (score >= 5) {
      this.currentStrategy = 'balanced';
      this.applyBalancedOptimizations();
    } else {
      this.currentStrategy = 'conservative';
      this.applyConservativeOptimizations();
    }
  }
  
  private calculateDeviceScore(): number {
    let score = 0;
    
    // Memory score (0-3)
    score += Math.min(this.deviceCapabilities.memory / 2, 3);
    
    // CPU score (0-3)
    score += Math.min(this.deviceCapabilities.cores / 2, 3);
    
    // Network score (0-4)
    const networkScores = { 'slow-2g': 0, '2g': 1, '3g': 2, '4g': 3, '5g': 4 };
    score += networkScores[this.deviceCapabilities.connection] || 2;
    
    return score;
  }
  
  private applyAggressiveOptimizations() {
    // Enable all optimizations for high-end devices
    this.enableFeature('predictive-preloading');
    this.enableFeature('advanced-image-optimization');
    this.enableFeature('background-processing');
    this.enableFeature('advanced-caching');
    this.enableFeature('real-time-analytics');
  }
  
  private applyBalancedOptimizations() {
    // Enable moderate optimizations
    this.enableFeature('basic-preloading');
    this.enableFeature('standard-image-optimization');
    this.enableFeature('standard-caching');
    this.disableFeature('background-processing');
    this.enableFeature('basic-analytics');
  }
  
  private applyConservativeOptimizations() {
    // Minimal optimizations for low-end devices
    this.disableFeature('predictive-preloading');
    this.enableFeature('basic-image-optimization');
    this.disableFeature('background-processing');
    this.enableFeature('minimal-caching');
    this.disableFeature('real-time-analytics');
  }
  
  private enableFeature(feature: string) {
    // Implementation for enabling specific features
    console.log(`Enabling feature: ${feature}`);
  }
  
  private disableFeature(feature: string) {
    // Implementation for disabling specific features
    console.log(`Disabling feature: ${feature}`);
  }
}
```

This advanced performance guide now includes sophisticated resource management, virtual scrolling, intelligent caching strategies, comprehensive performance monitoring with real-time analytics and alerting capabilities, advanced bundle optimization, predictive module loading, intelligent service worker caching strategies, edge computing optimization, and adaptive performance management based on device capabilities and network conditions.