# Performance Optimization Interview Questions

## Table of Contents

- [Performance Optimization Interview Questions](#performance-optimization-interview-questions)
  - [Table of Contents](#table-of-contents)
    - [Q14: How do you optimize images and implement lazy loading for better performance?](#q14-how-do-you-optimize-images-and-implement-lazy-loading-for-better-performance)
    - [Q15: How do you optimize JavaScript performance and bundle size?](#q15-how-do-you-optimize-javascript-performance-and-bundle-size)
    - [Q16: How do you implement Web Workers for performance optimization?](#q16-how-do-you-implement-web-workers-for-performance-optimization)
    - [Q17: How do you implement comprehensive performance monitoring and analytics?](#q17-how-do-you-implement-comprehensive-performance-monitoring-and-analytics)
    - [Q18: What are advanced performance optimization techniques and best practices?](#q18-what-are-advanced-performance-optimization-techniques-and-best-practices)
    - [Q19: How do you implement comprehensive performance testing and measurement strategies?](#q19-how-do-you-implement-comprehensive-performance-testing-and-measurement-strategies)
    - [Q20: How do you optimize performance for mobile devices and Progressive Web Apps (PWAs)?](#q20-how-do-you-optimize-performance-for-mobile-devices-and-progressive-web-apps-pwas)
  - [Web Performance Fundamentals](#web-performance-fundamentals)
    - [Q1: What are the key metrics for measuring web performance?](#q1-what-are-the-key-metrics-for-measuring-web-performance)
  - [Core Web Vitals](#core-web-vitals)
    - [Q2: How do you optimize Core Web Vitals?](#q2-how-do-you-optimize-core-web-vitals)
    - [Q13: How do you implement effective caching strategies for frontend performance?](#q13-how-do-you-implement-effective-caching-strategies-for-frontend-performance)
  - [Loading Performance](#loading-performance)
    - [Q3: How do you optimize page loading performance?](#q3-how-do-you-optimize-page-loading-performance)
  - [Runtime Performance](#runtime-performance)
    - [Q4: How do you optimize JavaScript runtime performance?](#q4-how-do-you-optimize-javascript-runtime-performance)
  - [Memory Management](#memory-management)
    - [Q5: How do you prevent memory leaks in web applications?](#q5-how-do-you-prevent-memory-leaks-in-web-applications)
  - [Advanced Performance Optimization](#advanced-performance-optimization)
    - [Q6: How do you implement advanced performance optimization strategies?](#q6-how-do-you-implement-advanced-performance-optimization-strategies)
    - [Q7: How do you implement advanced performance monitoring and real-time optimization?](#q7-how-do-you-implement-advanced-performance-monitoring-and-real-time-optimization)
    - [Q8: How do you implement comprehensive performance monitoring and analytics?](#q8-how-do-you-implement-comprehensive-performance-monitoring-and-analytics)
    - [Q9: How do you implement advanced performance optimization for modern web applications?](#q9-how-do-you-implement-advanced-performance-optimization-for-modern-web-applications)
    - [Q10: How do you implement advanced caching strategies and service worker optimization?](#q10-how-do-you-implement-advanced-caching-strategies-and-service-worker-optimization)
    - [Q11: How would you implement advanced performance monitoring and optimization for modern web applications?](#q11-how-would-you-implement-advanced-performance-monitoring-and-optimization-for-modern-web-applications)
    - [Q12: How would you implement advanced caching strategies and edge optimization for global performance?](#q12-how-would-you-implement-advanced-caching-strategies-and-edge-optimization-for-global-performance)

---

### Q14: How do you optimize images and implement lazy loading for better performance?

**Answer:**
Image optimization and lazy loading are critical for reducing initial page load times and improving Core Web Vitals, especially LCP (Largest Contentful Paint).

**Modern Image Optimization:**

```javascript
// Advanced image optimization manager
class ImageOptimizer {
  constructor() {
    this.supportedFormats = this.detectSupportedFormats();
    this.intersectionObserver = null;
    this.loadingImages = new Set();
    this.imageCache = new Map();

    this.setupIntersectionObserver();
    this.setupPreloadHints();
  }

  detectSupportedFormats() {
    const formats = {
      webp: false,
      avif: false,
      jxl: false,
    };

    // Check WebP support
    const webpCanvas = document.createElement("canvas");
    webpCanvas.width = 1;
    webpCanvas.height = 1;
    formats.webp =
      webpCanvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;

    // Check AVIF support
    const avifImg = new Image();
    avifImg.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    formats.avif = avifImg.complete && avifImg.naturalWidth > 0;

    return formats;
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "50px 0px", // Start loading 50px before entering viewport
      threshold: 0.01,
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.intersectionObserver.unobserve(entry.target);
        }
      });
    }, options);
  }

  setupPreloadHints() {
    // Add preload hints for critical images
    const criticalImages = document.querySelectorAll('[data-critical="true"]');
    criticalImages.forEach((img) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = this.getOptimalImageSrc(img);
      document.head.appendChild(link);
    });
  }

  getOptimalImageSrc(img) {
    const baseSrc = img.dataset.src || img.src;
    const width = img.dataset.width || img.clientWidth || 300;
    const height = img.dataset.height || img.clientHeight || 200;
    const quality = img.dataset.quality || 80;

    // Determine best format
    let format = "jpg";
    if (this.supportedFormats.avif) {
      format = "avif";
    } else if (this.supportedFormats.webp) {
      format = "webp";
    }

    // Generate optimized URL (assuming a service like Cloudinary or custom service)
    return this.buildOptimizedUrl(baseSrc, {
      width: Math.ceil(width * window.devicePixelRatio),
      height: Math.ceil(height * window.devicePixelRatio),
      format,
      quality,
    });
  }

  buildOptimizedUrl(src, options) {
    // Example for Cloudinary-style URL transformation
    const { width, height, format, quality } = options;

    // If using a CDN service
    if (src.includes("cloudinary.com")) {
      const transformations = `w_${width},h_${height},c_fill,f_${format},q_${quality}`;
      return src.replace("/upload/", `/upload/${transformations}/`);
    }

    // For custom image service
    const url = new URL(src, window.location.origin);
    url.searchParams.set("w", width);
    url.searchParams.set("h", height);
    url.searchParams.set("f", format);
    url.searchParams.set("q", quality);

    return url.toString();
  }

  async loadImage(img) {
    if (this.loadingImages.has(img) || img.dataset.loaded === "true") {
      return;
    }

    this.loadingImages.add(img);

    try {
      const src = this.getOptimalImageSrc(img);

      // Check cache first
      if (this.imageCache.has(src)) {
        this.applyImage(img, src);
        return;
      }

      // Preload image
      const imageLoader = new Image();

      await new Promise((resolve, reject) => {
        imageLoader.onload = () => {
          this.imageCache.set(src, true);
          resolve();
        };
        imageLoader.onerror = reject;
        imageLoader.src = src;
      });

      this.applyImage(img, src);
    } catch (error) {
      console.error("Failed to load image:", error);
      this.handleImageError(img);
    } finally {
      this.loadingImages.delete(img);
    }
  }

  applyImage(img, src) {
    // Fade in effect
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";

    if (img.tagName === "IMG") {
      img.src = src;
    } else {
      img.style.backgroundImage = `url(${src})`;
    }

    img.dataset.loaded = "true";

    // Trigger fade in
    requestAnimationFrame(() => {
      img.style.opacity = "1";
    });

    // Remove placeholder
    const placeholder = img.previousElementSibling;
    if (placeholder && placeholder.classList.contains("image-placeholder")) {
      placeholder.remove();
    }
  }

  handleImageError(img) {
    // Show fallback image or placeholder
    const fallbackSrc = img.dataset.fallback || "/images/placeholder.svg";

    if (img.tagName === "IMG") {
      img.src = fallbackSrc;
    } else {
      img.style.backgroundImage = `url(${fallbackSrc})`;
    }

    img.dataset.loaded = "error";
  }

  // Progressive image loading
  setupProgressiveLoading(img) {
    const lowQualitySrc = this.buildOptimizedUrl(img.dataset.src, {
      width: 50,
      height: 50,
      format: "jpg",
      quality: 20,
    });

    // Load low quality first
    const placeholder = new Image();
    placeholder.onload = () => {
      img.style.backgroundImage = `url(${lowQualitySrc})`;
      img.style.filter = "blur(5px)";
      img.style.transition = "filter 0.3s ease";

      // Then load high quality
      this.loadImage(img).then(() => {
        img.style.filter = "none";
      });
    };
    placeholder.src = lowQualitySrc;
  }

  // Responsive images with srcset
  generateSrcSet(baseSrc, sizes = [400, 800, 1200, 1600]) {
    const srcSet = sizes
      .map((size) => {
        const optimizedSrc = this.buildOptimizedUrl(baseSrc, {
          width: size,
          height: Math.round(size * 0.75), // 4:3 aspect ratio
          format: this.supportedFormats.avif
            ? "avif"
            : this.supportedFormats.webp
            ? "webp"
            : "jpg",
          quality: 80,
        });
        return `${optimizedSrc} ${size}w`;
      })
      .join(", ");

    return srcSet;
  }

  // Batch observe multiple images
  observeImages(selector = "[data-src]") {
    const images = document.querySelectorAll(selector);

    images.forEach((img) => {
      // Add placeholder
      this.addPlaceholder(img);

      // Setup progressive loading for large images
      if (img.dataset.progressive === "true") {
        this.setupProgressiveLoading(img);
      } else {
        this.intersectionObserver.observe(img);
      }
    });
  }

  addPlaceholder(img) {
    const placeholder = document.createElement("div");
    placeholder.className = "image-placeholder";
    placeholder.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    `;

    // Add loading animation CSS if not exists
    if (!document.querySelector("#image-loading-styles")) {
      const style = document.createElement("style");
      style.id = "image-loading-styles";
      style.textContent = `
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `;
      document.head.appendChild(style);
    }

    img.parentNode.insertBefore(placeholder, img);
  }

  // Performance monitoring
  getPerformanceMetrics() {
    return {
      totalImages: document.querySelectorAll("img").length,
      lazyImages: document.querySelectorAll("[data-src]").length,
      loadedImages: document.querySelectorAll('[data-loaded="true"]').length,
      errorImages: document.querySelectorAll('[data-loaded="error"]').length,
      cacheSize: this.imageCache.size,
      supportedFormats: this.supportedFormats,
    };
  }
}

// Advanced lazy loading with Intersection Observer v2
class AdvancedLazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: "50px 0px",
      threshold: 0.01,
      enableAutoRetry: true,
      retryDelay: 2000,
      maxRetries: 3,
      ...options,
    };

    this.retryCount = new Map();
    this.loadingQueue = [];
    this.isProcessingQueue = false;

    this.setupObserver();
    this.setupNetworkListener();
  }

  setupObserver() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          root: this.options.root,
          rootMargin: this.options.rootMargin,
          threshold: this.options.threshold,
        }
      );
    }
  }

  setupNetworkListener() {
    if ("connection" in navigator) {
      navigator.connection.addEventListener("change", () => {
        this.handleNetworkChange();
      });
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.queueForLoading(entry.target);
        this.observer.unobserve(entry.target);
      }
    });

    this.processLoadingQueue();
  }

  queueForLoading(element) {
    this.loadingQueue.push(element);
  }

  async processLoadingQueue() {
    if (this.isProcessingQueue || this.loadingQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    // Process based on network conditions
    const connectionSpeed = this.getConnectionSpeed();
    const batchSize = this.getBatchSize(connectionSpeed);

    while (this.loadingQueue.length > 0) {
      const batch = this.loadingQueue.splice(0, batchSize);

      await Promise.allSettled(
        batch.map((element) => this.loadElement(element))
      );

      // Add delay for slow connections
      if (connectionSpeed === "slow") {
        await this.delay(500);
      }
    }

    this.isProcessingQueue = false;
  }

  getConnectionSpeed() {
    if ("connection" in navigator) {
      const connection = navigator.connection;

      if (connection.effectiveType === "4g") {
        return "fast";
      } else if (connection.effectiveType === "3g") {
        return "medium";
      } else {
        return "slow";
      }
    }

    return "medium"; // Default assumption
  }

  getBatchSize(connectionSpeed) {
    switch (connectionSpeed) {
      case "fast":
        return 6;
      case "medium":
        return 3;
      case "slow":
        return 1;
      default:
        return 3;
    }
  }

  async loadElement(element) {
    try {
      if (element.tagName === "IMG") {
        await this.loadImage(element);
      } else if (element.tagName === "VIDEO") {
        await this.loadVideo(element);
      } else if (element.tagName === "IFRAME") {
        await this.loadIframe(element);
      } else {
        await this.loadBackgroundImage(element);
      }

      this.retryCount.delete(element);
    } catch (error) {
      console.error("Failed to load element:", error);

      if (this.options.enableAutoRetry) {
        await this.retryLoad(element);
      }
    }
  }

  async loadImage(img) {
    return new Promise((resolve, reject) => {
      const src = img.dataset.src;

      if (!src) {
        reject(new Error("No data-src attribute found"));
        return;
      }

      const imageLoader = new Image();

      imageLoader.onload = () => {
        img.src = src;
        img.classList.add("loaded");

        // Handle srcset if present
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }

        // Handle sizes if present
        if (img.dataset.sizes) {
          img.sizes = img.dataset.sizes;
        }

        resolve();
      };

      imageLoader.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };

      imageLoader.src = src;
    });
  }

  async loadVideo(video) {
    return new Promise((resolve, reject) => {
      const src = video.dataset.src;

      if (!src) {
        reject(new Error("No data-src attribute found"));
        return;
      }

      video.onloadeddata = () => {
        video.classList.add("loaded");
        resolve();
      };

      video.onerror = () => {
        reject(new Error(`Failed to load video: ${src}`));
      };

      video.src = src;
    });
  }

  async loadIframe(iframe) {
    return new Promise((resolve, reject) => {
      const src = iframe.dataset.src;

      if (!src) {
        reject(new Error("No data-src attribute found"));
        return;
      }

      iframe.onload = () => {
        iframe.classList.add("loaded");
        resolve();
      };

      iframe.onerror = () => {
        reject(new Error(`Failed to load iframe: ${src}`));
      };

      iframe.src = src;
    });
  }

  async loadBackgroundImage(element) {
    return new Promise((resolve, reject) => {
      const src = element.dataset.src;

      if (!src) {
        reject(new Error("No data-src attribute found"));
        return;
      }

      const img = new Image();

      img.onload = () => {
        element.style.backgroundImage = `url(${src})`;
        element.classList.add("loaded");
        resolve();
      };

      img.onerror = () => {
        reject(new Error(`Failed to load background image: ${src}`));
      };

      img.src = src;
    });
  }

  async retryLoad(element) {
    const currentRetries = this.retryCount.get(element) || 0;

    if (currentRetries >= this.options.maxRetries) {
      console.error("Max retries reached for element:", element);
      return;
    }

    this.retryCount.set(element, currentRetries + 1);

    await this.delay(this.options.retryDelay * (currentRetries + 1));

    try {
      await this.loadElement(element);
    } catch (error) {
      console.error(`Retry ${currentRetries + 1} failed:`, error);
    }
  }

  handleNetworkChange() {
    const connectionSpeed = this.getConnectionSpeed();

    if (connectionSpeed === "slow") {
      // Pause loading for slow connections
      this.pauseLoading();
    } else {
      // Resume loading
      this.resumeLoading();
    }
  }

  pauseLoading() {
    this.isPaused = true;
  }

  resumeLoading() {
    this.isPaused = false;
    this.processLoadingQueue();
  }

  observe(element) {
    if (this.observer) {
      this.observer.observe(element);
    } else {
      // Fallback for browsers without IntersectionObserver
      this.fallbackObserve(element);
    }
  }

  fallbackObserve(element) {
    // Simple scroll-based lazy loading fallback
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        this.loadElement(element);
        window.removeEventListener("scroll", checkVisibility);
        window.removeEventListener("resize", checkVisibility);
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    // Check immediately
    checkVisibility();
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Usage examples
const imageOptimizer = new ImageOptimizer();
const lazyLoader = new AdvancedLazyLoader({
  rootMargin: "100px 0px",
  threshold: 0.1,
  enableAutoRetry: true,
  maxRetries: 3,
});

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", () => {
  // Observe all lazy images
  imageOptimizer.observeImages("[data-src]");

  // Observe videos and iframes
  document
    .querySelectorAll("video[data-src], iframe[data-src]")
    .forEach((element) => {
      lazyLoader.observe(element);
    });
});

// Performance monitoring
setInterval(() => {
  const metrics = imageOptimizer.getPerformanceMetrics();
  console.log("Image Performance Metrics:", metrics);
}, 30000); // Log every 30 seconds
```

**CSS for Image Optimization:**

```css
/* Responsive image containers */
.image-container {
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

/* Aspect ratio containers */
.aspect-ratio-16-9 {
  aspect-ratio: 16 / 9;
}

.aspect-ratio-4-3 {
  aspect-ratio: 4 / 3;
}

.aspect-ratio-1-1 {
  aspect-ratio: 1 / 1;
}

/* Lazy loaded images */
img[data-src] {
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: #f0f0f0;
}

img[data-src].loaded {
  opacity: 1;
}

/* Progressive loading blur effect */
img[data-progressive] {
  filter: blur(5px);
  transition: filter 0.3s ease;
}

img[data-progressive].loaded {
  filter: none;
}

/* Skeleton loading animation */
.image-placeholder {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Responsive images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Critical images (above the fold) */
img[data-critical="true"] {
  opacity: 1; /* No fade-in for critical images */
}

/* Error state */
img[data-loaded="error"] {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 48px 48px;
}

/* Video lazy loading */
video[data-src] {
  background-color: #000;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fff"><path d="M8 5v14l11-7z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 48px 48px;
}

video[data-src].loaded {
  background-image: none;
}

/* Iframe lazy loading */
iframe[data-src] {
  background-color: #f5f5f5;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 48px 48px;
}

iframe[data-src].loaded {
  background-image: none;
}

/* Print styles */
@media print {
  img[data-src] {
    opacity: 1;
  }

  .image-placeholder {
    display: none;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  img[data-src],
  .image-placeholder {
    transition: none;
    animation: none;
  }
}
```

**HTML Implementation:**

```html
<!-- Basic lazy loading -->
<img data-src="/images/photo.jpg" alt="Description" class="lazy-image" />

<!-- Responsive lazy loading with srcset -->
<img
  data-src="/images/photo-800.jpg"
  data-srcset="/images/photo-400.jpg 400w,
                  /images/photo-800.jpg 800w,
                  /images/photo-1200.jpg 1200w"
  data-sizes="(max-width: 600px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
  alt="Responsive image"
  class="lazy-image"
/>

<!-- Critical image (above the fold) -->
<img
  src="/images/hero.jpg"
  data-critical="true"
  alt="Hero image"
  class="hero-image"
/>

<!-- Progressive loading -->
<div class="image-container aspect-ratio-16-9">
  <img
    data-src="/images/large-photo.jpg"
    data-progressive="true"
    alt="Large photo"
    class="lazy-image"
  />
</div>

<!-- Video lazy loading -->
<video
  data-src="/videos/demo.mp4"
  poster="/images/video-poster.jpg"
  controls
  class="lazy-video"
>
  Your browser does not support the video tag.
</video>

<!-- Iframe lazy loading -->
<iframe
  data-src="https://www.youtube.com/embed/VIDEO_ID"
  width="560"
  height="315"
  frameborder="0"
  class="lazy-iframe"
>
</iframe>
```

---

### Q15: How do you optimize JavaScript performance and bundle size?

**Answer:**
JavaScript optimization involves reducing bundle sizes, improving execution performance, and implementing efficient loading strategies to enhance overall application performance.

**Bundle Optimization Strategies:**

```javascript
// Advanced bundle analyzer and optimizer
class BundleOptimizer {
  constructor() {
    this.bundleStats = new Map();
    this.loadedModules = new Set();
    this.criticalModules = new Set();
    this.deferredModules = new Set();

    this.setupPerformanceObserver();
    this.analyzeDependencies();
  }

  setupPerformanceObserver() {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "resource" && entry.name.includes(".js")) {
            this.trackBundleLoad(entry);
          }
        }
      });

      observer.observe({ entryTypes: ["resource"] });
    }
  }

  trackBundleLoad(entry) {
    const bundleName = this.extractBundleName(entry.name);

    this.bundleStats.set(bundleName, {
      name: bundleName,
      size: entry.transferSize,
      loadTime: entry.duration,
      startTime: entry.startTime,
      cached: entry.transferSize === 0,
      compressed: entry.encodedBodySize < entry.decodedBodySize,
    });
  }

  extractBundleName(url) {
    const parts = url.split("/");
    return parts[parts.length - 1].split("?")[0];
  }

  analyzeDependencies() {
    // Analyze module dependencies for optimization opportunities
    if (typeof __webpack_require__ !== "undefined") {
      this.analyzeWebpackModules();
    }
  }

  analyzeWebpackModules() {
    const modules = __webpack_require__.cache;
    const moduleGraph = new Map();

    Object.keys(modules).forEach((moduleId) => {
      const module = modules[moduleId];
      if (module && module.exports) {
        const dependencies = this.extractDependencies(module);
        moduleGraph.set(moduleId, {
          id: moduleId,
          size: this.estimateModuleSize(module),
          dependencies,
          exports: Object.keys(module.exports || {}),
        });
      }
    });

    this.identifyOptimizationOpportunities(moduleGraph);
  }

  extractDependencies(module) {
    const dependencies = [];

    if (module.children) {
      dependencies.push(...module.children);
    }

    return dependencies;
  }

  estimateModuleSize(module) {
    try {
      return JSON.stringify(module.exports).length;
    } catch {
      return 0;
    }
  }

  identifyOptimizationOpportunities(moduleGraph) {
    const opportunities = {
      duplicateModules: this.findDuplicateModules(moduleGraph),
      unusedExports: this.findUnusedExports(moduleGraph),
      heavyModules: this.findHeavyModules(moduleGraph),
      circularDependencies: this.findCircularDependencies(moduleGraph),
    };

    console.log("Bundle Optimization Opportunities:", opportunities);
    return opportunities;
  }

  findDuplicateModules(moduleGraph) {
    const modulesByContent = new Map();
    const duplicates = [];

    for (const [id, module] of moduleGraph) {
      const contentHash = this.hashModuleContent(module);

      if (modulesByContent.has(contentHash)) {
        duplicates.push({
          original: modulesByContent.get(contentHash),
          duplicate: id,
          size: module.size,
        });
      } else {
        modulesByContent.set(contentHash, id);
      }
    }

    return duplicates;
  }

  findUnusedExports(moduleGraph) {
    const exportUsage = new Map();
    const unusedExports = [];

    // Track export usage across modules
    for (const [id, module] of moduleGraph) {
      module.exports.forEach((exportName) => {
        if (!exportUsage.has(`${id}:${exportName}`)) {
          exportUsage.set(`${id}:${exportName}`, 0);
        }
      });

      // Check dependencies for import usage
      module.dependencies.forEach((depId) => {
        const depModule = moduleGraph.get(depId);
        if (depModule) {
          // This is a simplified check - real implementation would parse AST
          depModule.exports.forEach((exportName) => {
            const key = `${depId}:${exportName}`;
            exportUsage.set(key, (exportUsage.get(key) || 0) + 1);
          });
        }
      });
    }

    // Find unused exports
    for (const [key, usage] of exportUsage) {
      if (usage === 0) {
        const [moduleId, exportName] = key.split(":");
        unusedExports.push({ moduleId, exportName });
      }
    }

    return unusedExports;
  }

  findHeavyModules(moduleGraph) {
    const heavyModules = [];
    const sizeThreshold = 50000; // 50KB

    for (const [id, module] of moduleGraph) {
      if (module.size > sizeThreshold) {
        heavyModules.push({
          id,
          size: module.size,
          sizeFormatted: this.formatBytes(module.size),
        });
      }
    }

    return heavyModules.sort((a, b) => b.size - a.size);
  }

  findCircularDependencies(moduleGraph) {
    const visited = new Set();
    const recursionStack = new Set();
    const circularDeps = [];

    const dfs = (moduleId, path = []) => {
      if (recursionStack.has(moduleId)) {
        const cycleStart = path.indexOf(moduleId);
        circularDeps.push(path.slice(cycleStart).concat(moduleId));
        return;
      }

      if (visited.has(moduleId)) {
        return;
      }

      visited.add(moduleId);
      recursionStack.add(moduleId);

      const module = moduleGraph.get(moduleId);
      if (module) {
        module.dependencies.forEach((depId) => {
          dfs(depId, [...path, moduleId]);
        });
      }

      recursionStack.delete(moduleId);
    };

    for (const moduleId of moduleGraph.keys()) {
      if (!visited.has(moduleId)) {
        dfs(moduleId);
      }
    }

    return circularDeps;
  }

  hashModuleContent(module) {
    // Simple hash function for module content comparison
    const content = JSON.stringify({
      exports: module.exports,
      size: module.size,
    });

    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return hash;
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  getBundleReport() {
    const totalSize = Array.from(this.bundleStats.values()).reduce(
      (sum, bundle) => sum + bundle.size,
      0
    );

    const totalLoadTime = Array.from(this.bundleStats.values()).reduce(
      (sum, bundle) => sum + bundle.loadTime,
      0
    );

    return {
      totalBundles: this.bundleStats.size,
      totalSize: this.formatBytes(totalSize),
      totalLoadTime: Math.round(totalLoadTime),
      bundles: Array.from(this.bundleStats.values()),
      recommendations: this.generateRecommendations(),
    };
  }

  generateRecommendations() {
    const recommendations = [];
    const bundles = Array.from(this.bundleStats.values());

    // Large bundle recommendation
    const largeBundles = bundles.filter((b) => b.size > 250000); // 250KB
    if (largeBundles.length > 0) {
      recommendations.push({
        type: "bundle-size",
        severity: "high",
        message: `${largeBundles.length} bundle(s) exceed 250KB. Consider code splitting.`,
        bundles: largeBundles.map((b) => b.name),
      });
    }

    // Slow loading bundles
    const slowBundles = bundles.filter((b) => b.loadTime > 1000); // 1 second
    if (slowBundles.length > 0) {
      recommendations.push({
        type: "load-time",
        severity: "medium",
        message: `${slowBundles.length} bundle(s) take over 1 second to load.`,
        bundles: slowBundles.map((b) => b.name),
      });
    }

    // Uncompressed bundles
    const uncompressedBundles = bundles.filter((b) => !b.compressed);
    if (uncompressedBundles.length > 0) {
      recommendations.push({
        type: "compression",
        severity: "medium",
        message: `${uncompressedBundles.length} bundle(s) are not compressed.`,
        bundles: uncompressedBundles.map((b) => b.name),
      });
    }

    return recommendations;
  }
}

// JavaScript execution performance optimizer
class JSPerformanceOptimizer {
  constructor() {
    this.performanceMetrics = new Map();
    this.optimizationStrategies = new Map();

    this.setupPerformanceMonitoring();
    this.initializeOptimizations();
  }

  setupPerformanceMonitoring() {
    // Monitor long tasks
    if ("PerformanceObserver" in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackLongTask(entry);
        }
      });

      try {
        longTaskObserver.observe({ entryTypes: ["longtask"] });
      } catch (e) {
        console.warn("Long task monitoring not supported");
      }
    }
  }

  trackLongTask(entry) {
    const taskInfo = {
      duration: entry.duration,
      startTime: entry.startTime,
      attribution: entry.attribution || [],
    };

    this.performanceMetrics.set(`longtask-${Date.now()}`, taskInfo);

    // Suggest optimization if task is too long
    if (entry.duration > 50) {
      // 50ms threshold
      this.suggestTaskOptimization(taskInfo);
    }
  }

  suggestTaskOptimization(taskInfo) {
    console.warn(
      `Long task detected: ${taskInfo.duration}ms. Consider breaking into smaller chunks.`
    );

    // Provide specific optimization suggestions
    const suggestions = [
      "Use requestIdleCallback for non-critical work",
      "Implement time-slicing for large data processing",
      "Use Web Workers for CPU-intensive tasks",
      "Break up synchronous loops with setTimeout",
    ];

    console.log("Optimization suggestions:", suggestions);
  }

  initializeOptimizations() {
    // Debounce utility
    this.optimizationStrategies.set("debounce", this.createDebounce());

    // Throttle utility
    this.optimizationStrategies.set("throttle", this.createThrottle());

    // Memoization utility
    this.optimizationStrategies.set("memoize", this.createMemoize());

    // Object pooling
    this.optimizationStrategies.set("objectPool", this.createObjectPool());
  }

  createDebounce() {
    return (func, delay) => {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    };
  }

  createThrottle() {
    return (func, limit) => {
      let inThrottle;
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };
  }

  createMemoize() {
    return (func, keyGenerator) => {
      const cache = new Map();

      return function (...args) {
        const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

        if (cache.has(key)) {
          return cache.get(key);
        }

        const result = func.apply(this, args);
        cache.set(key, result);

        // Prevent memory leaks by limiting cache size
        if (cache.size > 100) {
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }

        return result;
      };
    };
  }

  createObjectPool() {
    return class ObjectPool {
      constructor(createFn, resetFn, initialSize = 10) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];

        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
          this.pool.push(this.createFn());
        }
      }

      acquire() {
        if (this.pool.length > 0) {
          return this.pool.pop();
        }
        return this.createFn();
      }

      release(obj) {
        if (this.resetFn) {
          this.resetFn(obj);
        }
        this.pool.push(obj);
      }

      size() {
        return this.pool.length;
      }
    };
  }

  // Efficient DOM manipulation utilities
  optimizeDOMOperations() {
    return {
      // Batch DOM updates
      batchUpdate: (element, updates) => {
        const fragment = document.createDocumentFragment();

        updates.forEach((update) => {
          if (update.type === "add") {
            fragment.appendChild(update.element);
          }
        });

        element.appendChild(fragment);
      },

      // Virtual scrolling for large lists
      createVirtualScroller: (container, itemHeight, renderItem) => {
        let startIndex = 0;
        let endIndex = 0;
        const visibleItems = new Map();

        const updateVisibleItems = () => {
          const containerHeight = container.clientHeight;
          const scrollTop = container.scrollTop;

          const newStartIndex = Math.floor(scrollTop / itemHeight);
          const visibleCount = Math.ceil(containerHeight / itemHeight) + 1;
          const newEndIndex = newStartIndex + visibleCount;

          // Remove items that are no longer visible
          for (let i = startIndex; i < newStartIndex; i++) {
            if (visibleItems.has(i)) {
              container.removeChild(visibleItems.get(i));
              visibleItems.delete(i);
            }
          }

          for (let i = newEndIndex; i <= endIndex; i++) {
            if (visibleItems.has(i)) {
              container.removeChild(visibleItems.get(i));
              visibleItems.delete(i);
            }
          }

          // Add new visible items
          for (let i = newStartIndex; i < newEndIndex; i++) {
            if (!visibleItems.has(i)) {
              const item = renderItem(i);
              item.style.position = "absolute";
              item.style.top = `${i * itemHeight}px`;
              container.appendChild(item);
              visibleItems.set(i, item);
            }
          }

          startIndex = newStartIndex;
          endIndex = newEndIndex;
        };

        container.addEventListener("scroll", updateVisibleItems, {
          passive: true,
        });
        updateVisibleItems(); // Initial render

        return { updateVisibleItems };
      },

      // Efficient event delegation
      delegateEvent: (container, selector, eventType, handler) => {
        container.addEventListener(eventType, (event) => {
          const target = event.target.closest(selector);
          if (target) {
            handler.call(target, event);
          }
        });
      },
    };
  }

  // Memory optimization utilities
  optimizeMemoryUsage() {
    return {
      // Weak references for caching
      createWeakCache: () => {
        const cache = new WeakMap();

        return {
          get: (key) => cache.get(key),
          set: (key, value) => cache.set(key, value),
          has: (key) => cache.has(key),
          delete: (key) => cache.delete(key),
        };
      },

      // Memory usage monitoring
      monitorMemoryUsage: () => {
        if ("memory" in performance) {
          const memInfo = performance.memory;
          return {
            used: memInfo.usedJSHeapSize,
            total: memInfo.totalJSHeapSize,
            limit: memInfo.jsHeapSizeLimit,
            usedFormatted: this.formatBytes(memInfo.usedJSHeapSize),
            totalFormatted: this.formatBytes(memInfo.totalJSHeapSize),
          };
        }
        return null;
      },

      // Cleanup utilities
      createCleanupManager: () => {
        const cleanupTasks = new Set();

        return {
          add: (cleanupFn) => cleanupTasks.add(cleanupFn),
          remove: (cleanupFn) => cleanupTasks.delete(cleanupFn),
          cleanup: () => {
            cleanupTasks.forEach((fn) => {
              try {
                fn();
              } catch (error) {
                console.error("Cleanup error:", error);
              }
            });
            cleanupTasks.clear();
          },
        };
      },
    };
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  getPerformanceReport() {
    const longTasks = Array.from(this.performanceMetrics.entries())
      .filter(([key]) => key.startsWith("longtask"))
      .map(([, value]) => value);

    const memoryInfo = this.optimizeMemoryUsage().monitorMemoryUsage();

    return {
      longTasks: {
        count: longTasks.length,
        totalDuration: longTasks.reduce((sum, task) => sum + task.duration, 0),
        averageDuration:
          longTasks.length > 0
            ? longTasks.reduce((sum, task) => sum + task.duration, 0) /
              longTasks.length
            : 0,
      },
      memory: memoryInfo,
      recommendations: this.generatePerformanceRecommendations(
        longTasks,
        memoryInfo
      ),
    };
  }

  generatePerformanceRecommendations(longTasks, memoryInfo) {
    const recommendations = [];

    if (longTasks.length > 5) {
      recommendations.push({
        type: "long-tasks",
        severity: "high",
        message: `${longTasks.length} long tasks detected. Consider code splitting or using Web Workers.`,
      });
    }

    if (memoryInfo && memoryInfo.used > memoryInfo.limit * 0.8) {
      recommendations.push({
        type: "memory",
        severity: "high",
        message:
          "High memory usage detected. Check for memory leaks and optimize data structures.",
      });
    }

    return recommendations;
  }
}

// Usage examples
const bundleOptimizer = new BundleOptimizer();
const jsOptimizer = new JSPerformanceOptimizer();

// Get optimization utilities
const debounce = jsOptimizer.optimizationStrategies.get("debounce");
const throttle = jsOptimizer.optimizationStrategies.get("throttle");
const memoize = jsOptimizer.optimizationStrategies.get("memoize");

// Example usage of optimization utilities
const optimizedSearchHandler = debounce((query) => {
  // Expensive search operation
  console.log("Searching for:", query);
}, 300);

const optimizedScrollHandler = throttle(() => {
  // Expensive scroll operation
  console.log("Handling scroll");
}, 16); // ~60fps

const memoizedCalculation = memoize((a, b) => {
  // Expensive calculation
  return Math.pow(a, b);
});

// Performance monitoring
setInterval(() => {
  const bundleReport = bundleOptimizer.getBundleReport();
  const performanceReport = jsOptimizer.getPerformanceReport();

  console.log("Bundle Report:", bundleReport);
  console.log("Performance Report:", performanceReport);
}, 60000); // Every minute
```

**Webpack Configuration for Optimization:**

```javascript
// webpack.config.js
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
    vendor: ["react", "react-dom", "lodash"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log", "console.info"],
          },
          mangle: {
            safari10: true,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 10,
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
    usedExports: true,
    sideEffects: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 0.25%, not dead",
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? "server" : "disabled",
    }),
  ],
};
```

---

### Q16: How do you implement Web Workers for performance optimization?

**Answer:**
Web Workers enable running JavaScript in background threads, preventing main thread blocking and improving application responsiveness for CPU-intensive tasks.

**Advanced Web Worker Implementation:**

```javascript
// Main thread - Advanced Worker Manager
class AdvancedWorkerManager {
  constructor() {
    this.workers = new Map();
    this.taskQueue = [];
    this.activeWorkers = new Set();
    this.workerPool = [];
    this.maxWorkers = navigator.hardwareConcurrency || 4;
    this.taskId = 0;

    this.initializeWorkerPool();
    this.setupPerformanceMonitoring();
  }

  initializeWorkerPool() {
    // Create initial worker pool
    for (let i = 0; i < Math.min(2, this.maxWorkers); i++) {
      this.createWorker();
    }
  }

  createWorker() {
    const worker = new Worker("/js/performance-worker.js");
    const workerId = `worker-${Date.now()}-${Math.random()}`;

    const workerInfo = {
      id: workerId,
      worker,
      busy: false,
      tasksCompleted: 0,
      totalProcessingTime: 0,
      createdAt: Date.now(),
      lastUsed: Date.now(),
    };

    worker.onmessage = (event) => {
      this.handleWorkerMessage(workerId, event);
    };

    worker.onerror = (error) => {
      this.handleWorkerError(workerId, error);
    };

    this.workers.set(workerId, workerInfo);
    this.workerPool.push(workerId);

    return workerId;
  }

  handleWorkerMessage(workerId, event) {
    const { taskId, result, error, type, processingTime } = event.data;
    const workerInfo = this.workers.get(workerId);

    if (workerInfo) {
      workerInfo.busy = false;
      workerInfo.tasksCompleted++;
      workerInfo.totalProcessingTime += processingTime || 0;
      workerInfo.lastUsed = Date.now();

      this.activeWorkers.delete(workerId);
    }

    if (type === "task-complete") {
      this.resolveTask(taskId, result, error);
    } else if (type === "progress") {
      this.handleTaskProgress(taskId, result);
    }

    // Process next task in queue
    this.processNextTask();
  }

  handleWorkerError(workerId, error) {
    console.error(`Worker ${workerId} error:`, error);

    const workerInfo = this.workers.get(workerId);
    if (workerInfo) {
      workerInfo.busy = false;
      this.activeWorkers.delete(workerId);
    }

    // Recreate worker if it failed
    this.recreateWorker(workerId);
  }

  recreateWorker(workerId) {
    const workerInfo = this.workers.get(workerId);
    if (workerInfo) {
      workerInfo.worker.terminate();
      this.workers.delete(workerId);

      const index = this.workerPool.indexOf(workerId);
      if (index > -1) {
        this.workerPool.splice(index, 1);
      }
    }

    // Create new worker
    this.createWorker();
  }

  async executeTask(taskType, data, options = {}) {
    const taskId = ++this.taskId;
    const { priority = 0, timeout = 30000, transferable = [] } = options;

    return new Promise((resolve, reject) => {
      const task = {
        id: taskId,
        type: taskType,
        data,
        priority,
        timeout,
        transferable,
        resolve,
        reject,
        createdAt: Date.now(),
        startedAt: null,
      };

      // Add to queue with priority sorting
      this.taskQueue.push(task);
      this.taskQueue.sort((a, b) => b.priority - a.priority);

      // Set timeout
      if (timeout > 0) {
        setTimeout(() => {
          this.timeoutTask(taskId);
        }, timeout);
      }

      // Try to process immediately
      this.processNextTask();
    });
  }

  processNextTask() {
    if (this.taskQueue.length === 0) {
      return;
    }

    const availableWorker = this.getAvailableWorker();
    if (!availableWorker) {
      // Try to create new worker if under limit
      if (this.workers.size < this.maxWorkers) {
        this.createWorker();
        setTimeout(() => this.processNextTask(), 10);
      }
      return;
    }

    const task = this.taskQueue.shift();
    const workerInfo = this.workers.get(availableWorker);

    if (workerInfo && task) {
      workerInfo.busy = true;
      task.startedAt = Date.now();
      this.activeWorkers.add(availableWorker);

      // Send task to worker
      const message = {
        taskId: task.id,
        type: task.type,
        data: task.data,
      };

      if (task.transferable.length > 0) {
        workerInfo.worker.postMessage(message, task.transferable);
      } else {
        workerInfo.worker.postMessage(message);
      }
    }
  }

  getAvailableWorker() {
    for (const workerId of this.workerPool) {
      const workerInfo = this.workers.get(workerId);
      if (workerInfo && !workerInfo.busy) {
        return workerId;
      }
    }
    return null;
  }

  resolveTask(taskId, result, error) {
    // Find and resolve the task
    const task = this.findTaskById(taskId);
    if (task) {
      if (error) {
        task.reject(new Error(error));
      } else {
        task.resolve(result);
      }
    }
  }

  handleTaskProgress(taskId, progress) {
    const task = this.findTaskById(taskId);
    if (task && task.onProgress) {
      task.onProgress(progress);
    }
  }

  timeoutTask(taskId) {
    const task = this.findTaskById(taskId);
    if (task) {
      task.reject(new Error(`Task ${taskId} timed out`));
    }
  }

  findTaskById(taskId) {
    // This is a simplified implementation
    // In practice, you'd maintain a separate task registry
    return null;
  }

  setupPerformanceMonitoring() {
    // Monitor worker performance
    setInterval(() => {
      this.cleanupIdleWorkers();
      this.logPerformanceMetrics();
    }, 30000); // Every 30 seconds
  }

  cleanupIdleWorkers() {
    const now = Date.now();
    const idleThreshold = 60000; // 1 minute
    const minWorkers = 1;

    for (const [workerId, workerInfo] of this.workers) {
      if (
        !workerInfo.busy &&
        now - workerInfo.lastUsed > idleThreshold &&
        this.workers.size > minWorkers
      ) {
        workerInfo.worker.terminate();
        this.workers.delete(workerId);

        const index = this.workerPool.indexOf(workerId);
        if (index > -1) {
          this.workerPool.splice(index, 1);
        }

        console.log(`Terminated idle worker: ${workerId}`);
      }
    }
  }

  logPerformanceMetrics() {
    const metrics = this.getPerformanceMetrics();
    console.log("Worker Performance Metrics:", metrics);
  }

  getPerformanceMetrics() {
    const totalWorkers = this.workers.size;
    const activeWorkers = this.activeWorkers.size;
    const queueLength = this.taskQueue.length;

    let totalTasksCompleted = 0;
    let totalProcessingTime = 0;

    for (const workerInfo of this.workers.values()) {
      totalTasksCompleted += workerInfo.tasksCompleted;
      totalProcessingTime += workerInfo.totalProcessingTime;
    }

    const averageProcessingTime =
      totalTasksCompleted > 0 ? totalProcessingTime / totalTasksCompleted : 0;

    return {
      totalWorkers,
      activeWorkers,
      queueLength,
      totalTasksCompleted,
      averageProcessingTime: Math.round(averageProcessingTime),
      efficiency: totalWorkers > 0 ? (activeWorkers / totalWorkers) * 100 : 0,
    };
  }

  // Specialized task methods
  async processLargeDataset(data, chunkSize = 1000) {
    const chunks = this.chunkArray(data, chunkSize);
    const promises = chunks.map((chunk, index) =>
      this.executeTask(
        "process-data-chunk",
        {
          chunk,
          index,
          total: chunks.length,
        },
        { priority: chunks.length - index }
      )
    );

    const results = await Promise.all(promises);
    return results.flat();
  }

  async performComplexCalculation(params) {
    return this.executeTask("complex-calculation", params, {
      priority: 10,
      timeout: 60000,
    });
  }

  async processImage(imageData, operations) {
    const transferable = [imageData.data.buffer];

    return this.executeTask(
      "image-processing",
      {
        imageData,
        operations,
      },
      {
        priority: 5,
        transferable,
      }
    );
  }

  chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  terminate() {
    // Terminate all workers
    for (const workerInfo of this.workers.values()) {
      workerInfo.worker.terminate();
    }

    this.workers.clear();
    this.workerPool.length = 0;
    this.taskQueue.length = 0;
    this.activeWorkers.clear();
  }
}

// Specialized worker for different task types
class TaskSpecificWorkerManager {
  constructor() {
    this.workerTypes = new Map();
    this.initializeWorkerTypes();
  }

  initializeWorkerTypes() {
    // Image processing workers
    this.workerTypes.set("image", {
      script: "/js/image-worker.js",
      maxInstances: 2,
      instances: [],
    });

    // Data processing workers
    this.workerTypes.set("data", {
      script: "/js/data-worker.js",
      maxInstances: 4,
      instances: [],
    });

    // Calculation workers
    this.workerTypes.set("calculation", {
      script: "/js/calculation-worker.js",
      maxInstances: 2,
      instances: [],
    });
  }

  async executeTaskByType(workerType, taskType, data, options = {}) {
    const workerConfig = this.workerTypes.get(workerType);
    if (!workerConfig) {
      throw new Error(`Unknown worker type: ${workerType}`);
    }

    let worker = this.getAvailableWorkerOfType(workerType);
    if (!worker) {
      worker = await this.createWorkerOfType(workerType);
    }

    return new Promise((resolve, reject) => {
      const taskId = Date.now() + Math.random();

      const handleMessage = (event) => {
        if (event.data.taskId === taskId) {
          worker.removeEventListener("message", handleMessage);
          worker.removeEventListener("error", handleError);

          if (event.data.error) {
            reject(new Error(event.data.error));
          } else {
            resolve(event.data.result);
          }

          this.releaseWorker(workerType, worker);
        }
      };

      const handleError = (error) => {
        worker.removeEventListener("message", handleMessage);
        worker.removeEventListener("error", handleError);
        reject(error);
        this.releaseWorker(workerType, worker);
      };

      worker.addEventListener("message", handleMessage);
      worker.addEventListener("error", handleError);

      worker.postMessage({
        taskId,
        type: taskType,
        data,
      });
    });
  }

  getAvailableWorkerOfType(workerType) {
    const workerConfig = this.workerTypes.get(workerType);
    return workerConfig.instances.find((w) => !w.busy);
  }

  async createWorkerOfType(workerType) {
    const workerConfig = this.workerTypes.get(workerType);

    if (workerConfig.instances.length >= workerConfig.maxInstances) {
      // Wait for available worker
      return new Promise((resolve) => {
        const checkForWorker = () => {
          const availableWorker = this.getAvailableWorkerOfType(workerType);
          if (availableWorker) {
            resolve(availableWorker);
          } else {
            setTimeout(checkForWorker, 10);
          }
        };
        checkForWorker();
      });
    }

    const worker = new Worker(workerConfig.script);
    const workerInstance = {
      worker,
      busy: false,
      createdAt: Date.now(),
    };

    workerConfig.instances.push(workerInstance);
    return workerInstance;
  }

  releaseWorker(workerType, workerInstance) {
    workerInstance.busy = false;
  }
}

// Usage examples
const workerManager = new AdvancedWorkerManager();
const taskWorkerManager = new TaskSpecificWorkerManager();

// Example: Process large dataset
async function processLargeDataset() {
  const largeData = new Array(100000)
    .fill(0)
    .map((_, i) => ({ id: i, value: Math.random() }));

  try {
    const results = await workerManager.processLargeDataset(largeData, 5000);
    console.log("Processed results:", results.length);
  } catch (error) {
    console.error("Processing failed:", error);
  }
}

// Example: Complex mathematical calculation
async function performCalculation() {
  try {
    const result = await workerManager.performComplexCalculation({
      operation: "fibonacci",
      n: 40,
    });
    console.log("Calculation result:", result);
  } catch (error) {
    console.error("Calculation failed:", error);
  }
}

// Example: Image processing
async function processImage(imageData) {
  try {
    const result = await taskWorkerManager.executeTaskByType(
      "image",
      "filter",
      {
        imageData,
        filter: "blur",
        intensity: 5,
      }
    );
    console.log("Image processed:", result);
  } catch (error) {
    console.error("Image processing failed:", error);
  }
}

// Performance monitoring
setInterval(() => {
  const metrics = workerManager.getPerformanceMetrics();
  console.log("Worker Performance:", metrics);
}, 10000);
```

**Worker Script Example (performance-worker.js):**

```javascript
// performance-worker.js
class PerformanceWorker {
  constructor() {
    this.taskHandlers = new Map();
    this.initializeHandlers();

    self.onmessage = (event) => {
      this.handleMessage(event);
    };
  }

  initializeHandlers() {
    this.taskHandlers.set(
      "process-data-chunk",
      this.processDataChunk.bind(this)
    );
    this.taskHandlers.set(
      "complex-calculation",
      this.performComplexCalculation.bind(this)
    );
    this.taskHandlers.set("image-processing", this.processImage.bind(this));
    this.taskHandlers.set("sort-data", this.sortData.bind(this));
    this.taskHandlers.set("filter-data", this.filterData.bind(this));
  }

  async handleMessage(event) {
    const { taskId, type, data } = event.data;
    const startTime = performance.now();

    try {
      const handler = this.taskHandlers.get(type);
      if (!handler) {
        throw new Error(`Unknown task type: ${type}`);
      }

      const result = await handler(data, (progress) => {
        this.sendProgress(taskId, progress);
      });

      const processingTime = performance.now() - startTime;

      self.postMessage({
        taskId,
        type: "task-complete",
        result,
        processingTime,
      });
    } catch (error) {
      const processingTime = performance.now() - startTime;

      self.postMessage({
        taskId,
        type: "task-complete",
        error: error.message,
        processingTime,
      });
    }
  }

  sendProgress(taskId, progress) {
    self.postMessage({
      taskId,
      type: "progress",
      result: progress,
    });
  }

  async processDataChunk(data, onProgress) {
    const { chunk, index, total } = data;
    const results = [];

    for (let i = 0; i < chunk.length; i++) {
      // Simulate processing
      const item = chunk[i];
      const processed = {
        ...item,
        processed: true,
        processedAt: Date.now(),
        squared: item.value * item.value,
      };

      results.push(processed);

      // Report progress
      if (i % 100 === 0) {
        onProgress({
          chunk: index,
          total: total,
          processed: i,
          chunkSize: chunk.length,
        });
      }
    }

    return results;
  }

  async performComplexCalculation(data, onProgress) {
    const { operation, n } = data;

    switch (operation) {
      case "fibonacci":
        return this.calculateFibonacci(n, onProgress);
      case "prime-factors":
        return this.calculatePrimeFactors(n, onProgress);
      case "matrix-multiply":
        return this.multiplyMatrices(data.matrixA, data.matrixB, onProgress);
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  calculateFibonacci(n, onProgress) {
    if (n <= 1) return n;

    let a = 0,
      b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;

      if (i % 1000 === 0) {
        onProgress({ current: i, total: n });
      }
    }

    return b;
  }

  calculatePrimeFactors(n, onProgress) {
    const factors = [];
    let divisor = 2;

    while (divisor * divisor <= n) {
      while (n % divisor === 0) {
        factors.push(divisor);
        n /= divisor;
      }
      divisor++;

      if (divisor % 1000 === 0) {
        onProgress({ divisor, remaining: n });
      }
    }

    if (n > 1) {
      factors.push(n);
    }

    return factors;
  }

  multiplyMatrices(matrixA, matrixB, onProgress) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;

    const result = Array(rowsA)
      .fill()
      .map(() => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        for (let k = 0; k < colsA; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }

      if (i % 10 === 0) {
        onProgress({ row: i, totalRows: rowsA });
      }
    }

    return result;
  }

  async processImage(data, onProgress) {
    const { imageData, operations } = data;
    let currentImageData = imageData;

    for (let i = 0; i < operations.length; i++) {
      const operation = operations[i];
      currentImageData = await this.applyImageOperation(
        currentImageData,
        operation
      );

      onProgress({
        operation: i + 1,
        total: operations.length,
        currentOperation: operation.type,
      });
    }

    return currentImageData;
  }

  async applyImageOperation(imageData, operation) {
    const { width, height, data } = imageData;
    const newData = new Uint8ClampedArray(data);

    switch (operation.type) {
      case "blur":
        return this.applyBlur(newData, width, height, operation.radius || 1);
      case "brightness":
        return this.adjustBrightness(newData, operation.value || 0);
      case "contrast":
        return this.adjustContrast(newData, operation.value || 1);
      default:
        return imageData;
    }
  }

  applyBlur(data, width, height, radius) {
    // Simplified blur implementation
    const newData = new Uint8ClampedArray(data);

    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4;
            r += data[idx];
            g += data[idx + 1];
            b += data[idx + 2];
            count++;
          }
        }

        const idx = (y * width + x) * 4;
        newData[idx] = r / count;
        newData[idx + 1] = g / count;
        newData[idx + 2] = b / count;
      }
    }

    return { data: newData, width, height };
  }

  adjustBrightness(data, value) {
    const newData = new Uint8ClampedArray(data);

    for (let i = 0; i < data.length; i += 4) {
      newData[i] = Math.max(0, Math.min(255, data[i] + value)); // R
      newData[i + 1] = Math.max(0, Math.min(255, data[i + 1] + value)); // G
      newData[i + 2] = Math.max(0, Math.min(255, data[i + 2] + value)); // B
      newData[i + 3] = data[i + 3]; // A
    }

    return newData;
  }

  adjustContrast(data, value) {
    const newData = new Uint8ClampedArray(data);
    const factor = (259 * (value + 255)) / (255 * (259 - value));

    for (let i = 0; i < data.length; i += 4) {
      newData[i] = Math.max(0, Math.min(255, factor * (data[i] - 128) + 128)); // R
      newData[i + 1] = Math.max(
        0,
        Math.min(255, factor * (data[i + 1] - 128) + 128)
      ); // G
      newData[i + 2] = Math.max(
        0,
        Math.min(255, factor * (data[i + 2] - 128) + 128)
      ); // B
      newData[i + 3] = data[i + 3]; // A
    }

    return newData;
  }

  sortData(data) {
    const { array, algorithm = "quicksort" } = data;

    switch (algorithm) {
      case "quicksort":
        return this.quickSort([...array]);
      case "mergesort":
        return this.mergeSort([...array]);
      default:
        return [...array].sort((a, b) => a - b);
    }
  }

  quickSort(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter((x) => x < pivot);
    const middle = arr.filter((x) => x === pivot);
    const right = arr.filter((x) => x > pivot);

    return [...this.quickSort(left), ...middle, ...this.quickSort(right)];
  }

  mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid));
    const right = this.mergeSort(arr.slice(mid));

    return this.merge(left, right);
  }

  merge(left, right) {
    const result = [];
    let leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  filterData(data) {
    const { array, condition } = data;

    // Safely evaluate condition
    const filterFn = new Function("item", `return ${condition}`);
    return array.filter(filterFn);
  }
}

// Initialize worker
new PerformanceWorker();
```

---

### Q17: How do you implement comprehensive performance monitoring and analytics?

**Answer:**
Comprehensive performance monitoring involves tracking multiple metrics, analyzing user experience patterns, and implementing real-time alerting systems to maintain optimal application performance.

**Advanced Performance Monitoring System:**

```javascript
// Comprehensive Performance Monitor
class AdvancedPerformanceMonitor {
  constructor(config = {}) {
    this.config = {
      sampleRate: 0.1, // 10% sampling
      bufferSize: 100,
      flushInterval: 30000, // 30 seconds
      endpoint: "/api/performance",
      enableRealTimeAlerts: true,
      thresholds: {
        lcp: 2500,
        fid: 100,
        cls: 0.1,
        ttfb: 600,
        fcp: 1800,
      },
      ...config,
    };

    this.metrics = new Map();
    this.buffer = [];
    this.observers = new Map();
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();

    this.initializeMonitoring();
    this.setupPerformanceObservers();
    this.startPeriodicReporting();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getUserId() {
    // Get user ID from localStorage, cookies, or authentication system
    return localStorage.getItem("userId") || "anonymous";
  }

  initializeMonitoring() {
    // Initialize core metrics tracking
    this.trackNavigationTiming();
    this.trackResourceTiming();
    this.trackUserTiming();
    this.trackCustomMetrics();
    this.setupErrorTracking();
    this.trackUserInteractions();
  }

  setupPerformanceObservers() {
    // Core Web Vitals Observer
    if ("PerformanceObserver" in window) {
      this.setupCoreWebVitalsObserver();
      this.setupLongTaskObserver();
      this.setupLayoutShiftObserver();
      this.setupLargestContentfulPaintObserver();
      this.setupFirstInputDelayObserver();
    }

    // Custom observers
    this.setupMemoryObserver();
    this.setupNetworkObserver();
    this.setupFrameRateObserver();
  }

  setupCoreWebVitalsObserver() {
    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      this.recordMetric("lcp", {
        value: lastEntry.startTime,
        element: lastEntry.element?.tagName || "unknown",
        url: lastEntry.url || "",
        timestamp: Date.now(),
      });
    });

    try {
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.set("lcp", lcpObserver);
    } catch (e) {
      console.warn("LCP observer not supported");
    }
  }

  setupLongTaskObserver() {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordMetric("longtask", {
          duration: entry.duration,
          startTime: entry.startTime,
          attribution:
            entry.attribution?.map((attr) => ({
              name: attr.name,
              entryType: attr.entryType,
              startTime: attr.startTime,
              duration: attr.duration,
            })) || [],
          timestamp: Date.now(),
        });

        // Real-time alert for long tasks
        if (this.config.enableRealTimeAlerts && entry.duration > 50) {
          this.triggerAlert("longtask", {
            duration: entry.duration,
            severity: entry.duration > 100 ? "high" : "medium",
          });
        }
      }
    });

    try {
      longTaskObserver.observe({ entryTypes: ["longtask"] });
      this.observers.set("longtask", longTaskObserver);
    } catch (e) {
      console.warn("Long task observer not supported");
    }
  }

  setupLayoutShiftObserver() {
    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries = [];

    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          if (
            sessionValue &&
            entry.startTime - lastSessionEntry.startTime < 1000 &&
            entry.startTime - firstSessionEntry.startTime < 5000
          ) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;

            this.recordMetric("cls", {
              value: clsValue,
              entries: sessionEntries.map((e) => ({
                value: e.value,
                startTime: e.startTime,
                sources:
                  e.sources?.map((source) => ({
                    node: source.node?.tagName || "unknown",
                    previousRect: source.previousRect,
                    currentRect: source.currentRect,
                  })) || [],
              })),
              timestamp: Date.now(),
            });
          }
        }
      }
    });

    try {
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.set("cls", clsObserver);
    } catch (e) {
      console.warn("CLS observer not supported");
    }
  }

  setupFirstInputDelayObserver() {
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordMetric("fid", {
          value: entry.processingStart - entry.startTime,
          startTime: entry.startTime,
          processingStart: entry.processingStart,
          processingEnd: entry.processingEnd,
          duration: entry.duration,
          name: entry.name,
          timestamp: Date.now(),
        });
      }
    });

    try {
      fidObserver.observe({ entryTypes: ["first-input"] });
      this.observers.set("fid", fidObserver);
    } catch (e) {
      console.warn("FID observer not supported");
    }
  }

  setupMemoryObserver() {
    if ("memory" in performance) {
      setInterval(() => {
        const memInfo = performance.memory;
        this.recordMetric("memory", {
          used: memInfo.usedJSHeapSize,
          total: memInfo.totalJSHeapSize,
          limit: memInfo.jsHeapSizeLimit,
          usagePercentage:
            (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100,
          timestamp: Date.now(),
        });
      }, 5000); // Every 5 seconds
    }
  }

  setupNetworkObserver() {
    if ("connection" in navigator) {
      const connection = navigator.connection;

      const recordNetworkInfo = () => {
        this.recordMetric("network", {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
          timestamp: Date.now(),
        });
      };

      recordNetworkInfo();
      connection.addEventListener("change", recordNetworkInfo);
    }
  }

  setupFrameRateObserver() {
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 0;

    const measureFPS = (currentTime) => {
      frameCount++;

      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        this.recordMetric("fps", {
          value: fps,
          timestamp: Date.now(),
        });

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  trackNavigationTiming() {
    if ("performance" in window && "getEntriesByType" in performance) {
      const navEntries = performance.getEntriesByType("navigation");

      if (navEntries.length > 0) {
        const nav = navEntries[0];

        this.recordMetric("navigation", {
          dns: nav.domainLookupEnd - nav.domainLookupStart,
          tcp: nav.connectEnd - nav.connectStart,
          ssl:
            nav.secureConnectionStart > 0
              ? nav.connectEnd - nav.secureConnectionStart
              : 0,
          ttfb: nav.responseStart - nav.requestStart,
          download: nav.responseEnd - nav.responseStart,
          domInteractive: nav.domInteractive - nav.navigationStart,
          domComplete: nav.domComplete - nav.navigationStart,
          loadComplete: nav.loadEventEnd - nav.navigationStart,
          timestamp: Date.now(),
        });
      }
    }
  }

  trackResourceTiming() {
    if ("PerformanceObserver" in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric("resource", {
            name: entry.name,
            type: this.getResourceType(entry.name),
            duration: entry.duration,
            size: entry.transferSize,
            cached: entry.transferSize === 0,
            protocol: entry.nextHopProtocol,
            timestamp: Date.now(),
          });
        }
      });

      resourceObserver.observe({ entryTypes: ["resource"] });
      this.observers.set("resource", resourceObserver);
    }
  }

  getResourceType(url) {
    if (url.match(/\.(js)$/)) return "script";
    if (url.match(/\.(css)$/)) return "stylesheet";
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return "image";
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return "font";
    return "other";
  }

  trackUserTiming() {
    if ("PerformanceObserver" in window) {
      const userTimingObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric("usertiming", {
            name: entry.name,
            entryType: entry.entryType,
            startTime: entry.startTime,
            duration: entry.duration || 0,
            timestamp: Date.now(),
          });
        }
      });

      userTimingObserver.observe({ entryTypes: ["mark", "measure"] });
      this.observers.set("usertiming", userTimingObserver);
    }
  }

  trackCustomMetrics() {
    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      this.recordMetric("visibility", {
        state: document.visibilityState,
        timestamp: Date.now(),
      });
    });

    // Track page unload
    window.addEventListener("beforeunload", () => {
      this.flush();
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener(
      "scroll",
      this.throttle(() => {
        const scrollDepth = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100
        );

        if (scrollDepth > maxScrollDepth) {
          maxScrollDepth = scrollDepth;
          this.recordMetric("scroll", {
            depth: scrollDepth,
            timestamp: Date.now(),
          });
        }
      }, 1000)
    );
  }

  setupErrorTracking() {
    // JavaScript errors
    window.addEventListener("error", (event) => {
      this.recordMetric("error", {
        type: "javascript",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now(),
      });
    });

    // Unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.recordMetric("error", {
        type: "unhandled-promise",
        reason: event.reason?.toString(),
        stack: event.reason?.stack,
        timestamp: Date.now(),
      });
    });

    // Resource loading errors
    window.addEventListener(
      "error",
      (event) => {
        if (event.target !== window) {
          this.recordMetric("error", {
            type: "resource",
            element: event.target.tagName,
            source: event.target.src || event.target.href,
            timestamp: Date.now(),
          });
        }
      },
      true
    );
  }

  trackUserInteractions() {
    const interactionTypes = ["click", "keydown", "scroll", "touchstart"];

    interactionTypes.forEach((type) => {
      document.addEventListener(
        type,
        this.throttle((event) => {
          this.recordMetric("interaction", {
            type,
            target: event.target.tagName,
            timestamp: Date.now(),
          });
        }, 1000),
        { passive: true }
      );
    });
  }

  recordMetric(type, data) {
    if (Math.random() > this.config.sampleRate) {
      return; // Skip based on sampling rate
    }

    const metric = {
      type,
      data,
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    this.buffer.push(metric);

    // Check thresholds for real-time alerts
    this.checkThresholds(type, data);

    // Flush buffer if it's full
    if (this.buffer.length >= this.config.bufferSize) {
      this.flush();
    }
  }

  checkThresholds(type, data) {
    if (!this.config.enableRealTimeAlerts) return;

    const threshold = this.config.thresholds[type];
    if (threshold && data.value > threshold) {
      this.triggerAlert(type, {
        value: data.value,
        threshold,
        severity: data.value > threshold * 1.5 ? "high" : "medium",
      });
    }
  }

  triggerAlert(type, details) {
    console.warn(`Performance Alert: ${type}`, details);

    // Send immediate alert to monitoring service
    if (this.config.alertEndpoint) {
      fetch(this.config.alertEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "performance-alert",
          metric: type,
          details,
          sessionId: this.sessionId,
          timestamp: Date.now(),
        }),
      }).catch((err) => console.error("Failed to send alert:", err));
    }
  }

  startPeriodicReporting() {
    setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  async flush() {
    if (this.buffer.length === 0) return;

    const data = [...this.buffer];
    this.buffer.length = 0;

    try {
      await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metrics: data,
          sessionId: this.sessionId,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.error("Failed to send performance metrics:", error);
      // Re-add failed metrics to buffer for retry
      this.buffer.unshift(...data.slice(0, 10)); // Keep only recent metrics
    }
  }

  // Utility methods
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Public API methods
  mark(name) {
    if ("performance" in window && "mark" in performance) {
      performance.mark(name);
    }
  }

  measure(name, startMark, endMark) {
    if ("performance" in window && "measure" in performance) {
      performance.measure(name, startMark, endMark);
    }
  }

  trackCustomEvent(name, data) {
    this.recordMetric("custom", {
      name,
      ...data,
      timestamp: Date.now(),
    });
  }

  getMetrics() {
    return {
      buffer: [...this.buffer],
      sessionId: this.sessionId,
      config: this.config,
    };
  }

  destroy() {
    // Clean up observers
    for (const observer of this.observers.values()) {
      observer.disconnect();
    }

    // Final flush
    this.flush();

    this.observers.clear();
    this.buffer.length = 0;
  }
}

// Performance Analytics Dashboard
class PerformanceAnalytics {
  constructor(monitor) {
    this.monitor = monitor;
    this.analytics = new Map();
    this.trends = new Map();

    this.initializeAnalytics();
  }

  initializeAnalytics() {
    setInterval(() => {
      this.analyzeMetrics();
      this.detectAnomalies();
      this.updateTrends();
    }, 60000); // Every minute
  }

  analyzeMetrics() {
    const metrics = this.monitor.getMetrics();

    // Group metrics by type
    const groupedMetrics = this.groupMetricsByType(metrics.buffer);

    // Calculate statistics for each metric type
    for (const [type, typeMetrics] of groupedMetrics) {
      const stats = this.calculateStatistics(typeMetrics);
      this.analytics.set(type, stats);
    }
  }

  groupMetricsByType(metrics) {
    const grouped = new Map();

    for (const metric of metrics) {
      if (!grouped.has(metric.type)) {
        grouped.set(metric.type, []);
      }
      grouped.get(metric.type).push(metric);
    }

    return grouped;
  }

  calculateStatistics(metrics) {
    if (metrics.length === 0) return null;

    const values = metrics
      .map((m) => m.data.value)
      .filter((v) => typeof v === "number");

    if (values.length === 0) return null;

    values.sort((a, b) => a - b);

    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const median = values[Math.floor(values.length / 2)];
    const p95 = values[Math.floor(values.length * 0.95)];
    const p99 = values[Math.floor(values.length * 0.99)];

    return {
      count: values.length,
      min: values[0],
      max: values[values.length - 1],
      mean: Math.round(mean * 100) / 100,
      median,
      p95,
      p99,
      timestamp: Date.now(),
    };
  }

  detectAnomalies() {
    for (const [type, stats] of this.analytics) {
      if (!stats) continue;

      const historical = this.trends.get(type) || [];

      if (historical.length >= 5) {
        const recentMean =
          historical.slice(-5).reduce((sum, s) => sum + s.mean, 0) / 5;
        const deviation = Math.abs(stats.mean - recentMean) / recentMean;

        if (deviation > 0.5) {
          // 50% deviation
          console.warn(`Performance anomaly detected for ${type}:`, {
            current: stats.mean,
            expected: recentMean,
            deviation: Math.round(deviation * 100),
          });
        }
      }
    }
  }

  updateTrends() {
    for (const [type, stats] of this.analytics) {
      if (!stats) continue;

      if (!this.trends.has(type)) {
        this.trends.set(type, []);
      }

      const trend = this.trends.get(type);
      trend.push(stats);

      // Keep only last 100 data points
      if (trend.length > 100) {
        trend.shift();
      }
    }
  }

  getAnalytics() {
    return {
      current: Object.fromEntries(this.analytics),
      trends: Object.fromEntries(this.trends),
    };
  }

  generateReport() {
    const analytics = this.getAnalytics();

    return {
      summary: this.generateSummary(analytics.current),
      recommendations: this.generateRecommendations(analytics.current),
      trends: analytics.trends,
      timestamp: Date.now(),
    };
  }

  generateSummary(current) {
    const summary = {};

    for (const [type, stats] of Object.entries(current)) {
      if (stats) {
        summary[type] = {
          average: stats.mean,
          p95: stats.p95,
          samples: stats.count,
        };
      }
    }

    return summary;
  }

  generateRecommendations(current) {
    const recommendations = [];

    // LCP recommendations
    if (current.lcp && current.lcp.mean > 2500) {
      recommendations.push({
        metric: "lcp",
        severity: current.lcp.mean > 4000 ? "high" : "medium",
        message:
          "Largest Contentful Paint is slow. Consider optimizing images and critical resources.",
        suggestions: [
          "Optimize and compress images",
          "Use modern image formats (WebP, AVIF)",
          "Implement lazy loading",
          "Optimize server response times",
        ],
      });
    }

    // FID recommendations
    if (current.fid && current.fid.mean > 100) {
      recommendations.push({
        metric: "fid",
        severity: current.fid.mean > 300 ? "high" : "medium",
        message:
          "First Input Delay is high. Consider reducing JavaScript execution time.",
        suggestions: [
          "Break up long-running JavaScript tasks",
          "Use code splitting and lazy loading",
          "Optimize third-party scripts",
          "Use Web Workers for heavy computations",
        ],
      });
    }

    // CLS recommendations
    if (current.cls && current.cls.mean > 0.1) {
      recommendations.push({
        metric: "cls",
        severity: current.cls.mean > 0.25 ? "high" : "medium",
        message: "Cumulative Layout Shift is high. Ensure stable page layouts.",
        suggestions: [
          "Set explicit dimensions for images and videos",
          "Reserve space for dynamic content",
          "Avoid inserting content above existing content",
          "Use CSS transforms for animations",
        ],
      });
    }

    return recommendations;
  }
}

// Usage example
const performanceMonitor = new AdvancedPerformanceMonitor({
  sampleRate: 0.1,
  endpoint: "/api/performance-metrics",
  alertEndpoint: "/api/performance-alerts",
  enableRealTimeAlerts: true,
  thresholds: {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    ttfb: 600,
  },
});

const analytics = new PerformanceAnalytics(performanceMonitor);

// Custom performance tracking
performanceMonitor.mark("app-start");

// Track custom events
performanceMonitor.trackCustomEvent("user-signup", {
  method: "email",
  duration: 1500,
});

// Generate performance report
setInterval(() => {
  const report = analytics.generateReport();
  console.log("Performance Report:", report);
}, 300000); // Every 5 minutes

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  performanceMonitor.destroy();
});
```

---

### Q18: What are advanced performance optimization techniques and best practices?

**Answer:**
Advanced performance optimization involves implementing sophisticated techniques like resource prioritization, critical path optimization, advanced caching strategies, and performance budgets to achieve optimal user experience.

**Advanced Performance Optimization Framework:**

```javascript
// Advanced Performance Optimizer
class AdvancedPerformanceOptimizer {
  constructor(config = {}) {
    this.config = {
      performanceBudget: {
        lcp: 2500,
        fid: 100,
        cls: 0.1,
        ttfb: 600,
        fcp: 1800,
        bundleSize: 250000, // 250KB
        imageSize: 500000, // 500KB
      },
      criticalResourcesTimeout: 3000,
      enableResourceHints: true,
      enableCriticalCSS: true,
      enableServiceWorker: true,
      ...config,
    };

    this.resourcePriorities = new Map();
    this.criticalResources = new Set();
    this.performanceObserver = null;
    this.resourceObserver = null;

    this.initialize();
  }

  initialize() {
    this.setupResourcePrioritization();
    this.implementCriticalPathOptimization();
    this.setupAdvancedCaching();
    this.implementResourceHints();
    this.setupPerformanceBudgetMonitoring();
    this.optimizeRenderingPerformance();
    this.implementProgressiveEnhancement();
  }

  setupResourcePrioritization() {
    // Define resource priorities
    const priorities = {
      "critical-css": "high",
      "critical-js": "high",
      "hero-images": "high",
      fonts: "medium",
      "non-critical-css": "low",
      analytics: "low",
      "social-widgets": "low",
    };

    // Apply resource priorities
    Object.entries(priorities).forEach(([type, priority]) => {
      this.resourcePriorities.set(type, priority);
    });

    // Implement resource loading strategy
    this.implementResourceLoadingStrategy();
  }

  implementResourceLoadingStrategy() {
    // Critical resource loader
    const criticalResourceLoader = {
      loadCriticalCSS: () => {
        const criticalCSS = document.querySelector("style[data-critical]");
        if (criticalCSS) {
          // Inline critical CSS is already loaded
          this.markResourceLoaded("critical-css");
        }

        // Load non-critical CSS asynchronously
        this.loadNonCriticalCSS();
      },

      loadCriticalJS: () => {
        // Load critical JavaScript with high priority
        const criticalScripts = document.querySelectorAll(
          "script[data-critical]"
        );

        criticalScripts.forEach((script) => {
          if (script.src) {
            this.loadScriptWithPriority(script.src, "high");
          }
        });
      },

      loadHeroImages: () => {
        // Preload hero images
        const heroImages = document.querySelectorAll("img[data-hero]");

        heroImages.forEach((img) => {
          if (img.dataset.src) {
            this.preloadImage(img.dataset.src, "high");
          }
        });
      },
    };

    // Execute critical resource loading
    Object.values(criticalResourceLoader).forEach((loader) => loader());
  }

  loadNonCriticalCSS() {
    const nonCriticalCSS = document.querySelectorAll("link[data-non-critical]");

    // Load non-critical CSS after critical resources
    requestIdleCallback(() => {
      nonCriticalCSS.forEach((link) => {
        link.rel = "stylesheet";
        link.removeAttribute("data-non-critical");
      });
    });
  }

  loadScriptWithPriority(src, priority) {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    // Set fetch priority if supported
    if ("fetchPriority" in script) {
      script.fetchPriority = priority;
    }

    document.head.appendChild(script);

    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  }

  preloadImage(src, priority = "auto") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;

    if ("fetchPriority" in link) {
      link.fetchPriority = priority;
    }

    document.head.appendChild(link);
  }

  implementCriticalPathOptimization() {
    // Critical path analyzer
    const criticalPathAnalyzer = {
      identifyCriticalResources: () => {
        // Identify resources needed for above-the-fold content
        const criticalSelectors = [
          "header",
          ".hero",
          ".above-fold",
          "[data-critical]",
        ];

        criticalSelectors.forEach((selector) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el) => this.analyzeCriticalElement(el));
        });
      },

      optimizeCriticalPath: () => {
        // Remove render-blocking resources
        this.removeRenderBlockingResources();

        // Inline critical CSS
        this.inlineCriticalCSS();

        // Defer non-critical JavaScript
        this.deferNonCriticalJS();
      },
    };

    criticalPathAnalyzer.identifyCriticalResources();
    criticalPathAnalyzer.optimizeCriticalPath();
  }

  analyzeCriticalElement(element) {
    // Analyze element for critical resources
    const computedStyle = window.getComputedStyle(element);

    // Check for background images
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage && backgroundImage !== "none") {
      const imageUrl = this.extractImageUrl(backgroundImage);
      if (imageUrl) {
        this.criticalResources.add(imageUrl);
        this.preloadImage(imageUrl, "high");
      }
    }

    // Check for custom fonts
    const fontFamily = computedStyle.fontFamily;
    if (fontFamily && this.isCustomFont(fontFamily)) {
      this.preloadFont(fontFamily);
    }
  }

  extractImageUrl(backgroundImage) {
    const match = backgroundImage.match(/url\(["']?([^"'\)]+)["']?\)/);
    return match ? match[1] : null;
  }

  isCustomFont(fontFamily) {
    const systemFonts = [
      "Arial",
      "Helvetica",
      "Times",
      "Georgia",
      "Verdana",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
    ];

    return !systemFonts.some((font) =>
      fontFamily.toLowerCase().includes(font.toLowerCase())
    );
  }

  preloadFont(fontFamily) {
    // This would typically involve preloading font files
    // Implementation depends on your font loading strategy
    console.log(`Preloading font: ${fontFamily}`);
  }

  removeRenderBlockingResources() {
    // Convert render-blocking CSS to non-blocking
    const stylesheets = document.querySelectorAll(
      'link[rel="stylesheet"]:not([data-critical])'
    );

    stylesheets.forEach((link) => {
      // Make stylesheet non-blocking
      link.media = "print";
      link.onload = function () {
        this.media = "all";
      };
    });
  }

  inlineCriticalCSS() {
    // This would typically be done during build time
    // Here we simulate the process
    const criticalCSS = this.extractCriticalCSS();

    if (criticalCSS) {
      const style = document.createElement("style");
      style.textContent = criticalCSS;
      style.setAttribute("data-critical", "true");
      document.head.insertBefore(style, document.head.firstChild);
    }
  }

  extractCriticalCSS() {
    // Simulate critical CSS extraction
    // In practice, this would be done by tools like Critical or Penthouse
    return `
      /* Critical CSS for above-the-fold content */
      body { margin: 0; font-family: system-ui, sans-serif; }
      .hero { min-height: 100vh; display: flex; align-items: center; }
      header { position: fixed; top: 0; width: 100%; z-index: 1000; }
    `;
  }

  deferNonCriticalJS() {
    const scripts = document.querySelectorAll(
      "script[src]:not([data-critical])"
    );

    scripts.forEach((script) => {
      if (!script.async && !script.defer) {
        script.defer = true;
      }
    });
  }

  setupAdvancedCaching() {
    if (!this.config.enableServiceWorker || !("serviceWorker" in navigator)) {
      return;
    }

    // Advanced Service Worker caching strategy
    const cachingStrategy = {
      registerServiceWorker: async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker registered:", registration);

          // Update service worker
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker available
                this.notifyServiceWorkerUpdate();
              }
            });
          });
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      },

      implementCacheStrategies: () => {
        // Send cache strategy configuration to service worker
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: "CACHE_STRATEGIES",
            strategies: {
              static: "cache-first",
              api: "network-first",
              images: "cache-first",
              fonts: "cache-first",
              analytics: "network-only",
            },
          });
        }
      },
    };

    cachingStrategy.registerServiceWorker();

    // Wait for service worker to be ready
    navigator.serviceWorker.ready.then(() => {
      cachingStrategy.implementCacheStrategies();
    });
  }

  notifyServiceWorkerUpdate() {
    // Notify user about service worker update
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("App Update Available", {
        body: "A new version of the app is available. Refresh to update.",
        icon: "/icon-192.png",
      });
    }
  }

  implementResourceHints() {
    if (!this.config.enableResourceHints) return;

    const resourceHints = {
      // DNS prefetch for external domains
      dnsPrefetch: [
        "//fonts.googleapis.com",
        "//cdn.jsdelivr.net",
        "//api.example.com",
      ],

      // Preconnect to critical third-party origins
      preconnect: ["https://fonts.gstatic.com", "https://api.example.com"],

      // Prefetch likely next pages
      prefetch: ["/about", "/contact", "/products"],
    };

    // Apply DNS prefetch
    resourceHints.dnsPrefetch.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = domain;
      document.head.appendChild(link);
    });

    // Apply preconnect
    resourceHints.preconnect.forEach((origin) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = origin;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });

    // Apply prefetch on user interaction
    this.setupIntelligentPrefetch(resourceHints.prefetch);
  }

  setupIntelligentPrefetch(urls) {
    // Prefetch on hover with delay
    const prefetchOnHover = (event) => {
      const link = event.target.closest("a");
      if (!link || link.dataset.prefetched) return;

      const href = link.getAttribute("href");
      if (urls.includes(href)) {
        setTimeout(() => {
          if (link.matches(":hover")) {
            this.prefetchPage(href);
            link.dataset.prefetched = "true";
          }
        }, 100);
      }
    };

    document.addEventListener("mouseover", prefetchOnHover);

    // Prefetch on intersection (for visible links)
    if ("IntersectionObserver" in window) {
      const linkObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target;
            const href = link.getAttribute("href");

            if (urls.includes(href) && !link.dataset.prefetched) {
              // Delay prefetch to avoid unnecessary requests
              setTimeout(() => {
                this.prefetchPage(href);
                link.dataset.prefetched = "true";
              }, 2000);
            }

            linkObserver.unobserve(link);
          }
        });
      });

      // Observe all internal links
      document.querySelectorAll('a[href^="/"]').forEach((link) => {
        linkObserver.observe(link);
      });
    }
  }

  prefetchPage(url) {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    document.head.appendChild(link);
  }

  setupPerformanceBudgetMonitoring() {
    const budgetMonitor = {
      checkBundleSize: () => {
        if ("PerformanceObserver" in window) {
          const observer = new PerformanceObserver((list) => {
            let totalSize = 0;

            list.getEntries().forEach((entry) => {
              if (entry.transferSize) {
                totalSize += entry.transferSize;
              }
            });

            if (totalSize > this.config.performanceBudget.bundleSize) {
              console.warn(`Bundle size exceeded: ${totalSize} bytes`);
              this.triggerBudgetAlert("bundle-size", totalSize);
            }
          });

          observer.observe({ entryTypes: ["resource"] });
        }
      },

      checkCoreWebVitals: () => {
        // Monitor Core Web Vitals against budget
        if ("PerformanceObserver" in window) {
          const vitalsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              const metric = entry.entryType;
              const value = entry.startTime || entry.value;
              const budget = this.config.performanceBudget[metric];

              if (budget && value > budget) {
                console.warn(
                  `${metric.toUpperCase()} budget exceeded: ${value}ms`
                );
                this.triggerBudgetAlert(metric, value);
              }
            });
          });

          vitalsObserver.observe({
            entryTypes: [
              "largest-contentful-paint",
              "first-input",
              "layout-shift",
            ],
          });
        }
      },
    };

    budgetMonitor.checkBundleSize();
    budgetMonitor.checkCoreWebVitals();
  }

  triggerBudgetAlert(metric, value) {
    // Send budget violation alert
    const alert = {
      type: "performance-budget-violation",
      metric,
      value,
      budget: this.config.performanceBudget[metric],
      timestamp: Date.now(),
      url: window.location.href,
    };

    // Log to console
    console.warn("Performance Budget Violation:", alert);

    // Send to monitoring service
    if (this.config.budgetAlertEndpoint) {
      fetch(this.config.budgetAlertEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alert),
      }).catch((err) => console.error("Failed to send budget alert:", err));
    }
  }

  optimizeRenderingPerformance() {
    const renderingOptimizer = {
      enableGPUAcceleration: () => {
        // Add CSS for GPU acceleration to critical elements
        const criticalElements = document.querySelectorAll(
          ".hero, .header, .animated"
        );

        criticalElements.forEach((el) => {
          el.style.transform = "translateZ(0)";
          el.style.willChange = "transform";
        });
      },

      optimizeAnimations: () => {
        // Use requestAnimationFrame for smooth animations
        const animatedElements = document.querySelectorAll("[data-animate]");

        animatedElements.forEach((el) => {
          this.setupOptimizedAnimation(el);
        });
      },

      implementVirtualScrolling: () => {
        // Implement virtual scrolling for large lists
        const largeLists = document.querySelectorAll("[data-virtual-scroll]");

        largeLists.forEach((list) => {
          this.setupVirtualScrolling(list);
        });
      },
    };

    renderingOptimizer.enableGPUAcceleration();
    renderingOptimizer.optimizeAnimations();
    renderingOptimizer.implementVirtualScrolling();
  }

  setupOptimizedAnimation(element) {
    let animationId;

    const animate = () => {
      // Perform animation logic here
      // Use transform and opacity for better performance

      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Cleanup on element removal
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.removedNodes.forEach((node) => {
            if (node === element) {
              cancelAnimationFrame(animationId);
              observer.disconnect();
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  setupVirtualScrolling(listElement) {
    // Simplified virtual scrolling implementation
    const itemHeight = 50; // Assume fixed item height
    const containerHeight = listElement.clientHeight;
    const visibleItems = Math.ceil(containerHeight / itemHeight);
    const buffer = 5; // Extra items for smooth scrolling

    let scrollTop = 0;
    let startIndex = 0;
    let endIndex = visibleItems + buffer;

    const updateVisibleItems = () => {
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      const newEndIndex = Math.min(
        newStartIndex + visibleItems + buffer,
        listElement.children.length
      );

      if (newStartIndex !== startIndex || newEndIndex !== endIndex) {
        startIndex = newStartIndex;
        endIndex = newEndIndex;

        // Hide non-visible items
        Array.from(listElement.children).forEach((item, index) => {
          if (index < startIndex || index > endIndex) {
            item.style.display = "none";
          } else {
            item.style.display = "block";
          }
        });
      }
    };

    listElement.addEventListener("scroll", () => {
      scrollTop = listElement.scrollTop;
      requestAnimationFrame(updateVisibleItems);
    });

    // Initial update
    updateVisibleItems();
  }

  implementProgressiveEnhancement() {
    const progressiveEnhancer = {
      loadEnhancementsOnIdle: () => {
        if ("requestIdleCallback" in window) {
          requestIdleCallback(() => {
            this.loadNonEssentialFeatures();
          });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            this.loadNonEssentialFeatures();
          }, 2000);
        }
      },

      adaptToNetworkConditions: () => {
        if ("connection" in navigator) {
          const connection = navigator.connection;

          if (
            connection.effectiveType === "slow-2g" ||
            connection.effectiveType === "2g"
          ) {
            // Disable non-essential features for slow connections
            this.disableHeavyFeatures();
          } else if (connection.effectiveType === "4g") {
            // Enable all features for fast connections
            this.enableAllFeatures();
          }
        }
      },
    };

    progressiveEnhancer.loadEnhancementsOnIdle();
    progressiveEnhancer.adaptToNetworkConditions();
  }

  loadNonEssentialFeatures() {
    // Load features that enhance UX but aren't critical
    const features = [
      "analytics",
      "social-widgets",
      "chat-widget",
      "recommendation-engine",
    ];

    features.forEach((feature) => {
      this.loadFeature(feature);
    });
  }

  loadFeature(featureName) {
    // Dynamically load feature modules
    import(`/features/${featureName}.js`)
      .then((module) => {
        module.initialize();
        console.log(`Feature loaded: ${featureName}`);
      })
      .catch((err) => {
        console.warn(`Failed to load feature ${featureName}:`, err);
      });
  }

  disableHeavyFeatures() {
    // Disable features that consume significant resources
    document.querySelectorAll("[data-heavy-feature]").forEach((el) => {
      el.style.display = "none";
    });

    // Disable animations
    document.body.classList.add("reduce-motion");
  }

  enableAllFeatures() {
    // Enable all features for fast connections
    document.querySelectorAll("[data-heavy-feature]").forEach((el) => {
      el.style.display = "";
    });

    document.body.classList.remove("reduce-motion");
  }

  markResourceLoaded(resourceType) {
    console.log(`Resource loaded: ${resourceType}`);

    // Track resource loading for performance monitoring
    if (this.performanceObserver) {
      this.performanceObserver.recordMetric("resource-loaded", {
        type: resourceType,
        timestamp: Date.now(),
      });
    }
  }

  // Public API
  getOptimizationReport() {
    return {
      criticalResources: Array.from(this.criticalResources),
      resourcePriorities: Object.fromEntries(this.resourcePriorities),
      performanceBudget: this.config.performanceBudget,
      optimizationsApplied: {
        resourcePrioritization: true,
        criticalPathOptimization: true,
        advancedCaching: this.config.enableServiceWorker,
        resourceHints: this.config.enableResourceHints,
        renderingOptimization: true,
        progressiveEnhancement: true,
      },
    };
  }

  destroy() {
    // Cleanup observers and event listeners
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }

    if (this.resourceObserver) {
      this.resourceObserver.disconnect();
    }

    // Clear resource priorities
    this.resourcePriorities.clear();
    this.criticalResources.clear();
  }
}

// Performance Budget Manager
class PerformanceBudgetManager {
  constructor(budgets) {
    this.budgets = budgets;
    this.violations = [];
    this.observers = new Map();

    this.setupBudgetMonitoring();
  }

  setupBudgetMonitoring() {
    // Monitor different types of budgets
    this.monitorTimingBudgets();
    this.monitorResourceBudgets();
    this.monitorMetricBudgets();
  }

  monitorTimingBudgets() {
    if ("PerformanceObserver" in window) {
      const timingObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.checkTimingBudget(entry);
        });
      });

      timingObserver.observe({
        entryTypes: ["navigation", "resource", "measure"],
      });

      this.observers.set("timing", timingObserver);
    }
  }

  monitorResourceBudgets() {
    if ("PerformanceObserver" in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        let totalSize = 0;
        const resourceTypes = {};

        list.getEntries().forEach((entry) => {
          if (entry.transferSize) {
            totalSize += entry.transferSize;

            const type = this.getResourceType(entry.name);
            resourceTypes[type] =
              (resourceTypes[type] || 0) + entry.transferSize;
          }
        });

        this.checkResourceBudgets(totalSize, resourceTypes);
      });

      resourceObserver.observe({ entryTypes: ["resource"] });
      this.observers.set("resource", resourceObserver);
    }
  }

  monitorMetricBudgets() {
    // Monitor Core Web Vitals budgets
    const metricsToMonitor = ["lcp", "fid", "cls", "fcp", "ttfb"];

    metricsToMonitor.forEach((metric) => {
      this.setupMetricMonitoring(metric);
    });
  }

  setupMetricMonitoring(metric) {
    const entryTypes = {
      lcp: "largest-contentful-paint",
      fid: "first-input",
      cls: "layout-shift",
      fcp: "paint",
      ttfb: "navigation",
    };

    const entryType = entryTypes[metric];
    if (!entryType) return;

    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          let value;

          switch (metric) {
            case "lcp":
              value = entry.startTime;
              break;
            case "fid":
              value = entry.processingStart - entry.startTime;
              break;
            case "cls":
              value = entry.value;
              break;
            case "fcp":
              if (entry.name === "first-contentful-paint") {
                value = entry.startTime;
              }
              break;
            case "ttfb":
              value = entry.responseStart - entry.requestStart;
              break;
          }

          if (value !== undefined) {
            this.checkMetricBudget(metric, value);
          }
        });
      });

      observer.observe({ entryTypes: [entryType] });
      this.observers.set(metric, observer);
    }
  }

  checkTimingBudget(entry) {
    const budget = this.budgets.timing?.[entry.entryType];
    if (budget && entry.duration > budget) {
      this.recordViolation("timing", entry.entryType, entry.duration, budget);
    }
  }

  checkResourceBudgets(totalSize, resourceTypes) {
    // Check total size budget
    if (this.budgets.totalSize && totalSize > this.budgets.totalSize) {
      this.recordViolation(
        "resource",
        "total-size",
        totalSize,
        this.budgets.totalSize
      );
    }

    // Check individual resource type budgets
    Object.entries(resourceTypes).forEach(([type, size]) => {
      const budget = this.budgets.resourceTypes?.[type];
      if (budget && size > budget) {
        this.recordViolation("resource", type, size, budget);
      }
    });
  }

  checkMetricBudget(metric, value) {
    const budget = this.budgets.metrics?.[metric];
    if (budget && value > budget) {
      this.recordViolation("metric", metric, value, budget);
    }
  }

  recordViolation(category, type, actual, budget) {
    const violation = {
      category,
      type,
      actual,
      budget,
      severity: this.calculateSeverity(actual, budget),
      timestamp: Date.now(),
      url: window.location.href,
    };

    this.violations.push(violation);

    // Log violation
    console.warn(
      `Performance Budget Violation [${category}/${type}]:`,
      violation
    );

    // Trigger alert if severe
    if (violation.severity === "high") {
      this.triggerAlert(violation);
    }
  }

  calculateSeverity(actual, budget) {
    const ratio = actual / budget;

    if (ratio > 2) return "high";
    if (ratio > 1.5) return "medium";
    return "low";
  }

  triggerAlert(violation) {
    // Send alert to monitoring system
    console.error("High Severity Performance Budget Violation:", violation);

    // Could integrate with alerting services here
  }

  getResourceType(url) {
    if (url.match(/\.(js)$/)) return "javascript";
    if (url.match(/\.(css)$/)) return "stylesheet";
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return "image";
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return "font";
    return "other";
  }

  getViolations() {
    return [...this.violations];
  }

  getBudgetStatus() {
    const status = {
      totalViolations: this.violations.length,
      violationsByCategory: {},
      violationsBySeverity: { high: 0, medium: 0, low: 0 },
    };

    this.violations.forEach((violation) => {
      // Count by category
      status.violationsByCategory[violation.category] =
        (status.violationsByCategory[violation.category] || 0) + 1;

      // Count by severity
      status.violationsBySeverity[violation.severity]++;
    });

    return status;
  }

  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.violations.length = 0;
  }
}

// Usage example
const performanceOptimizer = new AdvancedPerformanceOptimizer({
  performanceBudget: {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    ttfb: 600,
    fcp: 1800,
    bundleSize: 250000,
    imageSize: 500000,
  },
  enableResourceHints: true,
  enableCriticalCSS: true,
  enableServiceWorker: true,
  budgetAlertEndpoint: "/api/performance-budget-alerts",
});

const budgetManager = new PerformanceBudgetManager({
  metrics: {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    fcp: 1800,
    ttfb: 600,
  },
  totalSize: 2000000, // 2MB
  resourceTypes: {
    javascript: 500000, // 500KB
    stylesheet: 100000, // 100KB
    image: 1000000, // 1MB
    font: 200000, // 200KB
  },
  timing: {
    navigation: 3000,
    resource: 1000,
  },
});

// Monitor performance budget status
setInterval(() => {
  const status = budgetManager.getBudgetStatus();
  console.log("Performance Budget Status:", status);
}, 60000); // Every minute

// Get optimization report
const report = performanceOptimizer.getOptimizationReport();
console.log("Performance Optimization Report:", report);
```

---

### Q19: How do you implement comprehensive performance testing and measurement strategies?

**Answer:**
Comprehensive performance testing involves automated testing, continuous monitoring, synthetic testing, real user monitoring (RUM), and performance regression detection to ensure optimal application performance across different conditions.

**Advanced Performance Testing Framework:**

```javascript
// Performance Testing Suite
class PerformanceTestingSuite {
  constructor(config = {}) {
    this.config = {
      testEnvironments: ["development", "staging", "production"],
      testTypes: ["synthetic", "real-user", "load", "stress"],
      metrics: ["lcp", "fid", "cls", "ttfb", "fcp", "si", "tbt"],
      thresholds: {
        lcp: { good: 2500, poor: 4000 },
        fid: { good: 100, poor: 300 },
        cls: { good: 0.1, poor: 0.25 },
        ttfb: { good: 600, poor: 1500 },
        fcp: { good: 1800, poor: 3000 },
        si: { good: 3400, poor: 5800 },
        tbt: { good: 200, poor: 600 },
      },
      reportingEndpoint: "/api/performance-reports",
      alertEndpoint: "/api/performance-alerts",
      ...config,
    };

    this.testResults = new Map();
    this.testHistory = [];
    this.regressionDetector = new PerformanceRegressionDetector();
    this.syntheticTester = new SyntheticPerformanceTester(this.config);
    this.rumCollector = new RealUserMonitoring(this.config);

    this.initialize();
  }

  initialize() {
    this.setupTestScheduler();
    this.setupRegressionMonitoring();
    this.setupAlertSystem();
  }

  async runComprehensiveTest(url, options = {}) {
    const testId = this.generateTestId();
    const testConfig = {
      url,
      timestamp: Date.now(),
      environment: options.environment || "production",
      device: options.device || "desktop",
      network: options.network || "4g",
      location: options.location || "us-east-1",
      ...options,
    };

    console.log(`Starting comprehensive performance test: ${testId}`);

    try {
      // Run multiple test types in parallel
      const [syntheticResults, lighthouseResults, webVitalsResults] =
        await Promise.all([
          this.runSyntheticTest(testConfig),
          this.runLighthouseTest(testConfig),
          this.collectWebVitals(testConfig),
        ]);

      // Combine results
      const combinedResults = {
        testId,
        config: testConfig,
        synthetic: syntheticResults,
        lighthouse: lighthouseResults,
        webVitals: webVitalsResults,
        timestamp: Date.now(),
      };

      // Analyze results
      const analysis = this.analyzeResults(combinedResults);

      // Store results
      this.storeTestResults(testId, combinedResults, analysis);

      // Check for regressions
      const regressions = await this.checkForRegressions(combinedResults);

      // Generate report
      const report = this.generateTestReport(
        combinedResults,
        analysis,
        regressions
      );

      // Send alerts if necessary
      if (regressions.length > 0 || analysis.criticalIssues.length > 0) {
        await this.sendAlert(report);
      }

      return report;
    } catch (error) {
      console.error(`Performance test failed: ${testId}`, error);
      throw error;
    }
  }

  async runSyntheticTest(config) {
    return await this.syntheticTester.runTest(config);
  }

  async runLighthouseTest(config) {
    // Simulate Lighthouse test (in practice, you'd use the Lighthouse API)
    const lighthouseConfig = {
      extends: "lighthouse:default",
      settings: {
        onlyCategories: ["performance"],
        throttlingMethod: "simulate",
        throttling: {
          rttMs: config.network === "3g" ? 150 : 40,
          throughputKbps: config.network === "3g" ? 1600 : 10000,
          cpuSlowdownMultiplier: config.device === "mobile" ? 4 : 1,
        },
      },
    };

    // Mock Lighthouse results
    return {
      performance: {
        score: Math.random() * 0.4 + 0.6, // 60-100
        metrics: {
          "first-contentful-paint": Math.random() * 1000 + 1000,
          "largest-contentful-paint": Math.random() * 1500 + 2000,
          "first-input-delay": Math.random() * 50 + 50,
          "cumulative-layout-shift": Math.random() * 0.1,
          "speed-index": Math.random() * 2000 + 3000,
          "total-blocking-time": Math.random() * 300 + 100,
        },
      },
      opportunities: this.generateOptimizationOpportunities(),
      diagnostics: this.generateDiagnostics(),
    };
  }

  generateOptimizationOpportunities() {
    const opportunities = [
      {
        id: "unused-css-rules",
        title: "Remove unused CSS",
        description: "Remove dead rules from stylesheets",
        score: Math.random(),
        numericValue: Math.random() * 500 + 100,
      },
      {
        id: "unused-javascript",
        title: "Remove unused JavaScript",
        description: "Remove unused JavaScript to reduce bytes",
        score: Math.random(),
        numericValue: Math.random() * 1000 + 200,
      },
      {
        id: "modern-image-formats",
        title: "Serve images in next-gen formats",
        description: "Use WebP or AVIF for better compression",
        score: Math.random(),
        numericValue: Math.random() * 800 + 300,
      },
    ];

    return opportunities.filter(() => Math.random() > 0.5);
  }

  generateDiagnostics() {
    return [
      {
        id: "mainthread-work-breakdown",
        title: "Minimize main-thread work",
        description:
          "Consider reducing the time spent parsing, compiling and executing JS",
        score: Math.random(),
        numericValue: Math.random() * 2000 + 1000,
      },
      {
        id: "third-party-summary",
        title: "Reduce the impact of third-party code",
        description: "Third-party code blocked the main thread",
        score: Math.random(),
        numericValue: Math.random() * 1500 + 500,
      },
    ];
  }

  async collectWebVitals(config) {
    // Simulate Web Vitals collection
    return {
      lcp: Math.random() * 1500 + 2000,
      fid: Math.random() * 50 + 50,
      cls: Math.random() * 0.1,
      fcp: Math.random() * 800 + 1200,
      ttfb: Math.random() * 400 + 400,
    };
  }

  analyzeResults(results) {
    const analysis = {
      overallScore: 0,
      metricScores: {},
      criticalIssues: [],
      warnings: [],
      recommendations: [],
      performanceGrade: "A",
    };

    // Analyze each metric
    Object.entries(results.webVitals).forEach(([metric, value]) => {
      const thresholds = this.config.thresholds[metric];
      if (!thresholds) return;

      let score = 100;
      let status = "good";

      if (value > thresholds.poor) {
        score = 0;
        status = "poor";
        analysis.criticalIssues.push({
          metric,
          value,
          threshold: thresholds.poor,
          severity: "high",
          message: `${metric.toUpperCase()} is ${value}ms, which exceeds the poor threshold of ${
            thresholds.poor
          }ms`,
        });
      } else if (value > thresholds.good) {
        score = 50;
        status = "needs-improvement";
        analysis.warnings.push({
          metric,
          value,
          threshold: thresholds.good,
          severity: "medium",
          message: `${metric.toUpperCase()} is ${value}ms, which exceeds the good threshold of ${
            thresholds.good
          }ms`,
        });
      }

      analysis.metricScores[metric] = { score, status, value };
    });

    // Calculate overall score
    const scores = Object.values(analysis.metricScores).map((m) => m.score);
    analysis.overallScore =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Determine performance grade
    if (analysis.overallScore >= 90) analysis.performanceGrade = "A";
    else if (analysis.overallScore >= 80) analysis.performanceGrade = "B";
    else if (analysis.overallScore >= 70) analysis.performanceGrade = "C";
    else if (analysis.overallScore >= 60) analysis.performanceGrade = "D";
    else analysis.performanceGrade = "F";

    // Generate recommendations
    analysis.recommendations = this.generateRecommendations(results, analysis);

    return analysis;
  }

  generateRecommendations(results, analysis) {
    const recommendations = [];

    // LCP recommendations
    if (analysis.metricScores.lcp?.status !== "good") {
      recommendations.push({
        metric: "lcp",
        priority: "high",
        title: "Optimize Largest Contentful Paint",
        actions: [
          "Optimize and compress hero images",
          "Use modern image formats (WebP, AVIF)",
          "Implement critical CSS inlining",
          "Optimize server response times",
          "Use CDN for static assets",
        ],
      });
    }

    // FID recommendations
    if (analysis.metricScores.fid?.status !== "good") {
      recommendations.push({
        metric: "fid",
        priority: "high",
        title: "Improve First Input Delay",
        actions: [
          "Break up long-running JavaScript tasks",
          "Use code splitting and lazy loading",
          "Optimize third-party scripts",
          "Use Web Workers for heavy computations",
          "Defer non-critical JavaScript",
        ],
      });
    }

    // CLS recommendations
    if (analysis.metricScores.cls?.status !== "good") {
      recommendations.push({
        metric: "cls",
        priority: "medium",
        title: "Reduce Cumulative Layout Shift",
        actions: [
          "Set explicit dimensions for images and videos",
          "Reserve space for dynamic content",
          "Avoid inserting content above existing content",
          "Use CSS transforms for animations",
          "Preload custom fonts",
        ],
      });
    }

    return recommendations;
  }

  async checkForRegressions(currentResults) {
    return await this.regressionDetector.detectRegressions(
      currentResults,
      this.getHistoricalResults(5) // Last 5 test results
    );
  }

  getHistoricalResults(count) {
    return this.testHistory.slice(-count).map((result) => result.webVitals);
  }

  storeTestResults(testId, results, analysis) {
    const testRecord = {
      testId,
      results,
      analysis,
      timestamp: Date.now(),
    };

    this.testResults.set(testId, testRecord);
    this.testHistory.push(testRecord);

    // Keep only last 100 test results
    if (this.testHistory.length > 100) {
      this.testHistory.shift();
    }
  }

  generateTestReport(results, analysis, regressions) {
    return {
      testId: results.testId,
      timestamp: results.timestamp,
      url: results.config.url,
      environment: results.config.environment,
      summary: {
        overallScore: analysis.overallScore,
        performanceGrade: analysis.performanceGrade,
        criticalIssues: analysis.criticalIssues.length,
        warnings: analysis.warnings.length,
        regressions: regressions.length,
      },
      metrics: analysis.metricScores,
      issues: {
        critical: analysis.criticalIssues,
        warnings: analysis.warnings,
        regressions,
      },
      recommendations: analysis.recommendations,
      lighthouse: results.lighthouse,
      rawData: results,
    };
  }

  async sendAlert(report) {
    const alert = {
      type: "performance-test-alert",
      severity: report.issues.critical.length > 0 ? "high" : "medium",
      testId: report.testId,
      url: report.url,
      environment: report.environment,
      summary: report.summary,
      issues: report.issues,
      timestamp: Date.now(),
    };

    try {
      await fetch(this.config.alertEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alert),
      });
    } catch (error) {
      console.error("Failed to send performance alert:", error);
    }
  }

  setupTestScheduler() {
    // Schedule regular performance tests
    setInterval(() => {
      this.runScheduledTests();
    }, 3600000); // Every hour
  }

  async runScheduledTests() {
    const testUrls = this.config.testUrls || [window.location.origin];

    for (const url of testUrls) {
      try {
        await this.runComprehensiveTest(url, {
          environment: "production",
          automated: true,
        });
      } catch (error) {
        console.error(`Scheduled test failed for ${url}:`, error);
      }
    }
  }

  setupRegressionMonitoring() {
    // Monitor for performance regressions
    this.regressionDetector.onRegression((regression) => {
      console.warn("Performance regression detected:", regression);
      this.sendRegressionAlert(regression);
    });
  }

  async sendRegressionAlert(regression) {
    const alert = {
      type: "performance-regression",
      severity: "high",
      metric: regression.metric,
      change: regression.change,
      threshold: regression.threshold,
      timestamp: Date.now(),
    };

    try {
      await fetch(this.config.alertEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alert),
      });
    } catch (error) {
      console.error("Failed to send regression alert:", error);
    }
  }

  setupAlertSystem() {
    // Setup various alert conditions
    this.alertConditions = {
      criticalPerformance: (analysis) => analysis.criticalIssues.length > 0,
      performanceGrade: (analysis) =>
        ["D", "F"].includes(analysis.performanceGrade),
      multipleWarnings: (analysis) => analysis.warnings.length >= 3,
      significantRegression: (regressions) =>
        regressions.some((r) => r.severity === "high"),
    };
  }

  generateTestId() {
    return `perf_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public API methods
  getTestResults(testId) {
    return this.testResults.get(testId);
  }

  getTestHistory(limit = 10) {
    return this.testHistory.slice(-limit);
  }

  getPerformanceTrends(metric, days = 7) {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

    return this.testHistory
      .filter((result) => result.timestamp > cutoff)
      .map((result) => ({
        timestamp: result.timestamp,
        value: result.results.webVitals[metric],
        score: result.analysis.metricScores[metric]?.score,
      }));
  }

  generatePerformanceReport(timeframe = "7d") {
    const days = parseInt(timeframe.replace("d", ""));
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

    const recentTests = this.testHistory.filter(
      (result) => result.timestamp > cutoff
    );

    if (recentTests.length === 0) {
      return { error: "No test data available for the specified timeframe" };
    }

    const report = {
      timeframe,
      totalTests: recentTests.length,
      averageScores: {},
      trends: {},
      issues: {
        critical: 0,
        warnings: 0,
        regressions: 0,
      },
      recommendations: new Set(),
    };

    // Calculate averages and trends
    this.config.metrics.forEach((metric) => {
      const values = recentTests
        .map((test) => test.results.webVitals[metric])
        .filter((v) => v != null);

      if (values.length > 0) {
        report.averageScores[metric] = {
          average: values.reduce((sum, val) => sum + val, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          trend: this.calculateTrend(values),
        };
      }
    });

    // Count issues
    recentTests.forEach((test) => {
      report.issues.critical += test.analysis.criticalIssues.length;
      report.issues.warnings += test.analysis.warnings.length;

      // Collect unique recommendations
      test.analysis.recommendations.forEach((rec) => {
        report.recommendations.add(rec.title);
      });
    });

    report.recommendations = Array.from(report.recommendations);

    return report;
  }

  calculateTrend(values) {
    if (values.length < 2) return "stable";

    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));

    const firstAvg =
      firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg =
      secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;

    const change = ((secondAvg - firstAvg) / firstAvg) * 100;

    if (Math.abs(change) < 5) return "stable";
    return change > 0 ? "degrading" : "improving";
  }
}

// Performance Regression Detector
class PerformanceRegressionDetector {
  constructor(config = {}) {
    this.config = {
      regressionThreshold: 0.1, // 10% degradation
      minSamples: 3,
      ...config,
    };

    this.regressionCallbacks = [];
  }

  async detectRegressions(currentResults, historicalResults) {
    if (historicalResults.length < this.config.minSamples) {
      return [];
    }

    const regressions = [];
    const currentMetrics = currentResults.webVitals;

    // Calculate historical baselines
    const baselines = this.calculateBaselines(historicalResults);

    // Check each metric for regressions
    Object.entries(currentMetrics).forEach(([metric, currentValue]) => {
      const baseline = baselines[metric];
      if (!baseline) return;

      const regression = this.checkMetricRegression(
        metric,
        currentValue,
        baseline
      );
      if (regression) {
        regressions.push(regression);
        this.triggerRegressionCallback(regression);
      }
    });

    return regressions;
  }

  calculateBaselines(historicalResults) {
    const baselines = {};

    // Get all metrics from historical data
    const allMetrics = new Set();
    historicalResults.forEach((result) => {
      Object.keys(result).forEach((metric) => allMetrics.add(metric));
    });

    // Calculate baseline for each metric
    allMetrics.forEach((metric) => {
      const values = historicalResults
        .map((result) => result[metric])
        .filter((value) => value != null);

      if (values.length >= this.config.minSamples) {
        baselines[metric] = {
          mean: values.reduce((sum, val) => sum + val, 0) / values.length,
          median: this.calculateMedian(values),
          p95: this.calculatePercentile(values, 95),
          stdDev: this.calculateStandardDeviation(values),
        };
      }
    });

    return baselines;
  }

  checkMetricRegression(metric, currentValue, baseline) {
    // Use median as the baseline for comparison
    const baselineValue = baseline.median;
    const change = (currentValue - baselineValue) / baselineValue;

    // Check if change exceeds threshold (positive change is bad for performance metrics)
    if (change > this.config.regressionThreshold) {
      const severity = this.calculateRegressionSeverity(change);

      return {
        metric,
        currentValue,
        baselineValue,
        change: Math.round(change * 100),
        changePercent: `${Math.round(change * 100)}%`,
        severity,
        threshold: this.config.regressionThreshold * 100,
        timestamp: Date.now(),
      };
    }

    return null;
  }

  calculateRegressionSeverity(change) {
    if (change > 0.5) return "critical"; // 50%+ degradation
    if (change > 0.25) return "high"; // 25%+ degradation
    if (change > 0.1) return "medium"; // 10%+ degradation
    return "low";
  }

  calculateMedian(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  calculatePercentile(values, percentile) {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }

  calculateStandardDeviation(values) {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
    const avgSquaredDiff =
      squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.sqrt(avgSquaredDiff);
  }

  onRegression(callback) {
    this.regressionCallbacks.push(callback);
  }

  triggerRegressionCallback(regression) {
    this.regressionCallbacks.forEach((callback) => {
      try {
        callback(regression);
      } catch (error) {
        console.error("Regression callback error:", error);
      }
    });
  }
}

// Synthetic Performance Tester
class SyntheticPerformanceTester {
  constructor(config) {
    this.config = config;
  }

  async runTest(testConfig) {
    // Simulate synthetic testing (in practice, you'd use tools like Puppeteer)
    const results = {
      navigationTiming: await this.measureNavigationTiming(testConfig.url),
      resourceTiming: await this.measureResourceTiming(testConfig.url),
      customMetrics: await this.measureCustomMetrics(testConfig.url),
      networkConditions: testConfig.network,
      deviceType: testConfig.device,
    };

    return results;
  }

  async measureNavigationTiming(url) {
    // Mock navigation timing measurements
    return {
      dns: Math.random() * 50 + 10,
      tcp: Math.random() * 100 + 50,
      ssl: Math.random() * 200 + 100,
      ttfb: Math.random() * 400 + 200,
      download: Math.random() * 300 + 100,
      domInteractive: Math.random() * 1000 + 1000,
      domComplete: Math.random() * 500 + 2000,
      loadComplete: Math.random() * 200 + 2500,
    };
  }

  async measureResourceTiming(url) {
    // Mock resource timing measurements
    const resourceTypes = ["script", "stylesheet", "image", "font", "xhr"];
    const resources = [];

    for (let i = 0; i < 10; i++) {
      resources.push({
        name: `resource-${i}`,
        type: resourceTypes[Math.floor(Math.random() * resourceTypes.length)],
        duration: Math.random() * 500 + 100,
        size: Math.random() * 100000 + 10000,
        cached: Math.random() > 0.7,
      });
    }

    return resources;
  }

  async measureCustomMetrics(url) {
    // Mock custom performance metrics
    return {
      timeToInteractive: Math.random() * 2000 + 2000,
      speedIndex: Math.random() * 2000 + 3000,
      totalBlockingTime: Math.random() * 300 + 100,
      maxPotentialFID: Math.random() * 200 + 100,
    };
  }
}

// Real User Monitoring (RUM)
class RealUserMonitoring {
  constructor(config) {
    this.config = config;
    this.metrics = new Map();
    this.sessionData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      pageViews: 0,
      interactions: 0,
    };

    this.setupRUM();
  }

  setupRUM() {
    // Setup real user monitoring
    this.collectNavigationMetrics();
    this.collectWebVitals();
    this.collectUserInteractions();
    this.collectErrorMetrics();
    this.setupPeriodicReporting();
  }

  collectNavigationMetrics() {
    if ("performance" in window && "getEntriesByType" in performance) {
      const navEntries = performance.getEntriesByType("navigation");

      if (navEntries.length > 0) {
        const nav = navEntries[0];

        this.recordMetric("navigation", {
          dns: nav.domainLookupEnd - nav.domainLookupStart,
          tcp: nav.connectEnd - nav.connectStart,
          ssl:
            nav.secureConnectionStart > 0
              ? nav.connectEnd - nav.secureConnectionStart
              : 0,
          ttfb: nav.responseStart - nav.requestStart,
          download: nav.responseEnd - nav.responseStart,
          domInteractive: nav.domInteractive - nav.navigationStart,
          domComplete: nav.domComplete - nav.navigationStart,
          loadComplete: nav.loadEventEnd - nav.navigationStart,
        });
      }
    }
  }

  collectWebVitals() {
    // Collect Core Web Vitals from real users
    if ("PerformanceObserver" in window) {
      // LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric("lcp", { value: lastEntry.startTime });
      });

      try {
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        console.warn("LCP observer not supported");
      }

      // FID
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric("fid", {
            value: entry.processingStart - entry.startTime,
          });
        });
      });

      try {
        fidObserver.observe({ entryTypes: ["first-input"] });
      } catch (e) {
        console.warn("FID observer not supported");
      }

      // CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordMetric("cls", { value: clsValue });
          }
        });
      });

      try {
        clsObserver.observe({ entryTypes: ["layout-shift"] });
      } catch (e) {
        console.warn("CLS observer not supported");
      }
    }
  }

  collectUserInteractions() {
    // Track user interactions
    const interactionTypes = ["click", "keydown", "scroll", "touchstart"];

    interactionTypes.forEach((type) => {
      document.addEventListener(
        type,
        () => {
          this.sessionData.interactions++;
          this.recordMetric("interaction", {
            type,
            timestamp: Date.now(),
          });
        },
        { passive: true }
      );
    });
  }

  collectErrorMetrics() {
    // Track JavaScript errors
    window.addEventListener("error", (event) => {
      this.recordMetric("error", {
        type: "javascript",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Track unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.recordMetric("error", {
        type: "unhandled-promise",
        reason: event.reason?.toString(),
      });
    });
  }

  recordMetric(type, data) {
    const metric = {
      type,
      data,
      sessionId: this.sessionData.sessionId,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    if (!this.metrics.has(type)) {
      this.metrics.set(type, []);
    }

    this.metrics.get(type).push(metric);
  }

  setupPeriodicReporting() {
    // Send metrics periodically
    setInterval(() => {
      this.sendMetrics();
    }, 30000); // Every 30 seconds

    // Send metrics on page unload
    window.addEventListener("beforeunload", () => {
      this.sendMetrics();
    });
  }

  async sendMetrics() {
    if (this.metrics.size === 0) return;

    const payload = {
      sessionData: this.sessionData,
      metrics: Object.fromEntries(this.metrics),
      timestamp: Date.now(),
    };

    try {
      await fetch(this.config.reportingEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Clear sent metrics
      this.metrics.clear();
    } catch (error) {
      console.error("Failed to send RUM metrics:", error);
    }
  }

  generateSessionId() {
    return `rum_session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }
}

// Usage example
const performanceTestingSuite = new PerformanceTestingSuite({
  testUrls: [
    "https://example.com",
    "https://example.com/products",
    "https://example.com/about",
  ],
  thresholds: {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    ttfb: { good: 600, poor: 1500 },
  },
  reportingEndpoint: "/api/performance-reports",
  alertEndpoint: "/api/performance-alerts",
});

// Run comprehensive test
performanceTestingSuite
  .runComprehensiveTest("https://example.com", {
    environment: "production",
    device: "mobile",
    network: "3g",
    location: "us-west-1",
  })
  .then((report) => {
    console.log("Performance Test Report:", report);
  })
  .catch((error) => {
    console.error("Performance test failed:", error);
  });

// Generate performance trends report
const trendsReport = performanceTestingSuite.generatePerformanceReport("30d");
console.log("Performance Trends (30 days):", trendsReport);

// Get specific metric trends
const lcpTrends = performanceTestingSuite.getPerformanceTrends("lcp", 14);
console.log("LCP Trends (14 days):", lcpTrends);
```

---

### Q20: How do you optimize performance for mobile devices and Progressive Web Apps (PWAs)?

**Answer:**
Mobile performance optimization requires specific strategies for limited resources, network conditions, and PWA features like service workers, offline functionality, and app-like experiences while maintaining optimal performance.

**Mobile Performance Optimization Framework:**

```javascript
// Mobile Performance Optimizer
class MobilePerformanceOptimizer {
  constructor(config = {}) {
    this.config = {
      deviceTypes: ["mobile", "tablet", "desktop"],
      networkTypes: ["slow-2g", "2g", "3g", "4g", "5g"],
      optimizationStrategies: {
        images: ["webp", "avif", "lazy-loading", "responsive"],
        javascript: ["code-splitting", "tree-shaking", "minification"],
        css: ["critical-css", "unused-css-removal", "minification"],
        fonts: ["font-display-swap", "preload", "subset"],
        caching: ["service-worker", "http-cache", "browser-cache"],
      },
      performanceTargets: {
        mobile: {
          lcp: 2500,
          fid: 100,
          cls: 0.1,
          ttfb: 600,
          fcp: 1800,
        },
        tablet: {
          lcp: 2000,
          fid: 80,
          cls: 0.1,
          ttfb: 500,
          fcp: 1500,
        },
      },
      ...config,
    };

    this.deviceDetector = new DeviceDetector();
    this.networkDetector = new NetworkDetector();
    this.imageOptimizer = new MobileImageOptimizer();
    this.resourceOptimizer = new MobileResourceOptimizer();
    this.pwaOptimizer = new PWAOptimizer();

    this.initialize();
  }

  initialize() {
    this.detectDeviceCapabilities();
    this.setupAdaptiveLoading();
    this.setupNetworkAwareOptimizations();
    this.setupPerformanceMonitoring();
  }

  async detectDeviceCapabilities() {
    const capabilities = {
      deviceType: this.deviceDetector.getDeviceType(),
      screenSize: {
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio || 1,
      },
      memory: navigator.deviceMemory || 4, // GB
      cores: navigator.hardwareConcurrency || 4,
      connection: this.networkDetector.getConnectionInfo(),
      battery: await this.getBatteryInfo(),
      touchSupport: "ontouchstart" in window,
      orientation: screen.orientation?.type || "portrait-primary",
    };

    this.deviceCapabilities = capabilities;
    this.adaptOptimizationsToDevice(capabilities);

    return capabilities;
  }

  async getBatteryInfo() {
    if ("getBattery" in navigator) {
      try {
        const battery = await navigator.getBattery();
        return {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };
      } catch (error) {
        console.warn("Battery API not available:", error);
      }
    }
    return null;
  }

  adaptOptimizationsToDevice(capabilities) {
    const optimizations = {
      imageQuality: this.calculateOptimalImageQuality(capabilities),
      jsExecutionStrategy: this.determineJSExecutionStrategy(capabilities),
      cacheStrategy: this.determineCacheStrategy(capabilities),
      prefetchStrategy: this.determinePrefetchStrategy(capabilities),
      animationStrategy: this.determineAnimationStrategy(capabilities),
    };

    this.applyOptimizations(optimizations);
  }

  calculateOptimalImageQuality(capabilities) {
    let quality = 80; // Default quality

    // Adjust based on device memory
    if (capabilities.memory < 2) quality = 60;
    else if (capabilities.memory < 4) quality = 70;
    else if (capabilities.memory >= 8) quality = 90;

    // Adjust based on network speed
    const connection = capabilities.connection;
    if (connection.effectiveType === "slow-2g") quality = 40;
    else if (connection.effectiveType === "2g") quality = 50;
    else if (connection.effectiveType === "3g") quality = 65;

    // Adjust based on battery level
    if (capabilities.battery && capabilities.battery.level < 0.2) {
      quality = Math.min(quality, 60); // Reduce quality when battery is low
    }

    return quality;
  }

  determineJSExecutionStrategy(capabilities) {
    const strategy = {
      chunkSize: 50000, // Default chunk size in bytes
      executionDelay: 0,
      useWebWorkers: false,
      prioritizeInteraction: true,
    };

    // Adjust based on CPU cores
    if (capabilities.cores >= 8) {
      strategy.chunkSize = 100000;
      strategy.useWebWorkers = true;
    } else if (capabilities.cores <= 2) {
      strategy.chunkSize = 25000;
      strategy.executionDelay = 16; // One frame delay
    }

    // Adjust based on memory
    if (capabilities.memory < 2) {
      strategy.chunkSize = Math.min(strategy.chunkSize, 20000);
      strategy.prioritizeInteraction = true;
    }

    return strategy;
  }

  determineCacheStrategy(capabilities) {
    const strategy = {
      maxCacheSize: 50 * 1024 * 1024, // 50MB default
      cacheTypes: ["essential", "images", "scripts", "styles"],
      offlineStrategy: "cache-first",
      updateStrategy: "background-sync",
    };

    // Adjust based on storage availability
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage.estimate().then((estimate) => {
        const availableSpace = estimate.quota - estimate.usage;

        if (availableSpace < 100 * 1024 * 1024) {
          // Less than 100MB
          strategy.maxCacheSize = 20 * 1024 * 1024; // 20MB
          strategy.cacheTypes = ["essential", "critical-images"];
        } else if (availableSpace > 1024 * 1024 * 1024) {
          // More than 1GB
          strategy.maxCacheSize = 200 * 1024 * 1024; // 200MB
        }
      });
    }

    return strategy;
  }

  determinePrefetchStrategy(capabilities) {
    const strategy = {
      enabled: true,
      maxConcurrentRequests: 2,
      prefetchOnIdle: true,
      respectDataSaver: true,
      batteryAware: true,
    };

    // Disable prefetch on slow connections
    const connection = capabilities.connection;
    if (["slow-2g", "2g"].includes(connection.effectiveType)) {
      strategy.enabled = false;
    } else if (connection.effectiveType === "3g") {
      strategy.maxConcurrentRequests = 1;
    }

    // Disable prefetch on low battery
    if (capabilities.battery && capabilities.battery.level < 0.2) {
      strategy.enabled = false;
    }

    // Respect data saver mode
    if (connection.saveData) {
      strategy.enabled = false;
    }

    return strategy;
  }

  determineAnimationStrategy(capabilities) {
    const strategy = {
      enableAnimations: true,
      useGPUAcceleration: true,
      maxAnimationDuration: 300,
      respectReducedMotion: true,
      batteryOptimized: false,
    };

    // Disable animations on low-end devices
    if (capabilities.memory < 2 || capabilities.cores <= 2) {
      strategy.enableAnimations = false;
    }

    // Optimize for battery
    if (capabilities.battery && capabilities.battery.level < 0.3) {
      strategy.batteryOptimized = true;
      strategy.maxAnimationDuration = 150;
    }

    // Respect user preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      strategy.enableAnimations = false;
    }

    return strategy;
  }

  applyOptimizations(optimizations) {
    // Apply image optimizations
    this.imageOptimizer.setQuality(optimizations.imageQuality);

    // Apply JavaScript optimizations
    this.resourceOptimizer.configureJSExecution(
      optimizations.jsExecutionStrategy
    );

    // Apply caching optimizations
    this.pwaOptimizer.configureCaching(optimizations.cacheStrategy);

    // Apply prefetch optimizations
    this.configurePrefetching(optimizations.prefetchStrategy);

    // Apply animation optimizations
    this.configureAnimations(optimizations.animationStrategy);
  }

  setupAdaptiveLoading() {
    // Implement adaptive loading based on device capabilities
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadResourceAdaptively(entry.target);
          }
        });
      },
      {
        rootMargin: this.calculateOptimalRootMargin(),
      }
    );

    // Observe all lazy-loadable elements
    document.querySelectorAll("[data-lazy]").forEach((el) => {
      observer.observe(el);
    });
  }

  calculateOptimalRootMargin() {
    const connection = this.deviceCapabilities.connection;

    // Adjust root margin based on connection speed
    if (connection.effectiveType === "slow-2g") return "50px";
    if (connection.effectiveType === "2g") return "100px";
    if (connection.effectiveType === "3g") return "200px";
    return "300px"; // 4G and above
  }

  async loadResourceAdaptively(element) {
    const resourceType = element.dataset.type;
    const priority = element.dataset.priority || "normal";

    switch (resourceType) {
      case "image":
        await this.loadImageAdaptively(element);
        break;
      case "script":
        await this.loadScriptAdaptively(element);
        break;
      case "style":
        await this.loadStyleAdaptively(element);
        break;
      default:
        await this.loadGenericResourceAdaptively(element);
    }
  }

  async loadImageAdaptively(img) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    // Generate optimized image URLs based on device capabilities
    const optimizedSrc = this.imageOptimizer.generateOptimizedUrl(src, {
      quality: this.calculateOptimalImageQuality(this.deviceCapabilities),
      format: this.imageOptimizer.getBestFormat(),
      width: this.calculateOptimalImageWidth(img),
      height: this.calculateOptimalImageHeight(img),
    });

    // Load image with error handling
    try {
      await this.loadImageWithFallback(img, optimizedSrc, src);
    } catch (error) {
      console.error("Failed to load image:", error);
      this.handleImageLoadError(img, error);
    }
  }

  async loadImageWithFallback(img, primarySrc, fallbackSrc) {
    return new Promise((resolve, reject) => {
      const tempImg = new Image();

      tempImg.onload = () => {
        img.src = primarySrc;
        img.classList.add("loaded");
        resolve();
      };

      tempImg.onerror = () => {
        // Try fallback
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          img.src = fallbackSrc;
          img.classList.add("loaded");
          resolve();
        };
        fallbackImg.onerror = reject;
        fallbackImg.src = fallbackSrc;
      };

      tempImg.src = primarySrc;
    });
  }

  setupNetworkAwareOptimizations() {
    // Monitor network changes
    if ("connection" in navigator) {
      navigator.connection.addEventListener("change", () => {
        this.handleNetworkChange();
      });
    }

    // Setup network-aware resource loading
    this.setupNetworkAwareResourceLoading();
  }

  handleNetworkChange() {
    const connection = navigator.connection;
    const newCapabilities = {
      ...this.deviceCapabilities,
      connection: {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      },
    };

    this.deviceCapabilities = newCapabilities;
    this.adaptOptimizationsToDevice(newCapabilities);
  }

  setupNetworkAwareResourceLoading() {
    // Intercept fetch requests and apply network-aware optimizations
    const originalFetch = window.fetch;

    window.fetch = async (resource, options = {}) => {
      const optimizedOptions = this.optimizeFetchOptions(resource, options);
      return originalFetch(resource, optimizedOptions);
    };
  }

  optimizeFetchOptions(resource, options) {
    const connection = this.deviceCapabilities.connection;
    const optimizedOptions = { ...options };

    // Add appropriate headers based on network conditions
    if (!optimizedOptions.headers) {
      optimizedOptions.headers = {};
    }

    // Request compressed responses on slow networks
    if (["slow-2g", "2g", "3g"].includes(connection.effectiveType)) {
      optimizedOptions.headers["Accept-Encoding"] = "gzip, deflate, br";
    }

    // Set appropriate cache headers
    if (connection.saveData) {
      optimizedOptions.headers["Save-Data"] = "on";
    }

    // Set timeout based on network speed
    if (!optimizedOptions.signal) {
      const controller = new AbortController();
      const timeout = this.calculateOptimalTimeout(connection.effectiveType);

      setTimeout(() => controller.abort(), timeout);
      optimizedOptions.signal = controller.signal;
    }

    return optimizedOptions;
  }

  calculateOptimalTimeout(effectiveType) {
    const timeouts = {
      "slow-2g": 30000, // 30 seconds
      "2g": 20000, // 20 seconds
      "3g": 15000, // 15 seconds
      "4g": 10000, // 10 seconds
      "5g": 5000, // 5 seconds
    };

    return timeouts[effectiveType] || 10000;
  }

  setupPerformanceMonitoring() {
    // Monitor mobile-specific performance metrics
    this.performanceMonitor = new MobilePerformanceMonitor({
      deviceCapabilities: this.deviceCapabilities,
      reportingEndpoint: "/api/mobile-performance",
    });

    this.performanceMonitor.startMonitoring();
  }

  // Public API methods
  getCurrentOptimizations() {
    return {
      deviceCapabilities: this.deviceCapabilities,
      imageQuality: this.imageOptimizer.getCurrentQuality(),
      cacheStrategy: this.pwaOptimizer.getCurrentCacheStrategy(),
      networkConditions: this.networkDetector.getConnectionInfo(),
    };
  }

  async optimizeForCurrentConditions() {
    const capabilities = await this.detectDeviceCapabilities();
    this.adaptOptimizationsToDevice(capabilities);
    return this.getCurrentOptimizations();
  }

  generatePerformanceReport() {
    return this.performanceMonitor.generateReport();
  }
}

// PWA Optimizer
class PWAOptimizer {
  constructor(config = {}) {
    this.config = {
      cacheStrategies: [
        "cache-first",
        "network-first",
        "stale-while-revalidate",
      ],
      maxCacheAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      offlinePages: ["/offline.html"],
      criticalResources: [],
      ...config,
    };

    this.serviceWorker = null;
    this.cacheManager = new PWACacheManager(this.config);
    this.offlineManager = new OfflineManager(this.config);

    this.initialize();
  }

  async initialize() {
    if ("serviceWorker" in navigator) {
      try {
        this.serviceWorker = await navigator.serviceWorker.register("/sw.js");
        this.setupServiceWorkerCommunication();
        await this.setupCaching();
        this.setupOfflineSupport();
        this.setupBackgroundSync();
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }
  }

  setupServiceWorkerCommunication() {
    // Setup communication with service worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      this.handleServiceWorkerMessage(event.data);
    });
  }

  handleServiceWorkerMessage(data) {
    switch (data.type) {
      case "CACHE_UPDATED":
        this.handleCacheUpdate(data.payload);
        break;
      case "OFFLINE_READY":
        this.handleOfflineReady();
        break;
      case "BACKGROUND_SYNC":
        this.handleBackgroundSync(data.payload);
        break;
    }
  }

  async setupCaching() {
    // Configure caching strategies for different resource types
    const cacheConfig = {
      static: {
        strategy: "cache-first",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        maxEntries: 100,
      },
      api: {
        strategy: "network-first",
        maxAge: 5 * 60 * 1000, // 5 minutes
        maxEntries: 50,
      },
      images: {
        strategy: "cache-first",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        maxEntries: 200,
      },
      documents: {
        strategy: "stale-while-revalidate",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        maxEntries: 30,
      },
    };

    await this.cacheManager.configureCaching(cacheConfig);
  }

  setupOfflineSupport() {
    // Setup offline page and functionality
    this.offlineManager.setupOfflineDetection();
    this.offlineManager.setupOfflineUI();
    this.offlineManager.preloadOfflineResources();
  }

  setupBackgroundSync() {
    // Setup background sync for offline actions
    if (
      "serviceWorker" in navigator &&
      "sync" in window.ServiceWorkerRegistration.prototype
    ) {
      this.backgroundSync = new BackgroundSyncManager();
      this.backgroundSync.initialize();
    }
  }

  configureCaching(strategy) {
    this.cacheManager.updateStrategy(strategy);
  }

  getCurrentCacheStrategy() {
    return this.cacheManager.getCurrentStrategy();
  }

  async precacheResources(resources) {
    return await this.cacheManager.precacheResources(resources);
  }

  async clearCache(cacheNames = []) {
    return await this.cacheManager.clearCache(cacheNames);
  }
}

// Mobile Image Optimizer
class MobileImageOptimizer {
  constructor(config = {}) {
    this.config = {
      formats: ["avif", "webp", "jpeg"],
      qualities: {
        high: 90,
        medium: 75,
        low: 60,
      },
      breakpoints: [320, 480, 768, 1024, 1200],
      ...config,
    };

    this.currentQuality = this.config.qualities.medium;
    this.supportedFormats = this.detectSupportedFormats();
  }

  detectSupportedFormats() {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");

    const formats = {
      webp: canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0,
      avif: canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0,
    };

    return formats;
  }

  getBestFormat() {
    if (this.supportedFormats.avif) return "avif";
    if (this.supportedFormats.webp) return "webp";
    return "jpeg";
  }

  generateOptimizedUrl(originalUrl, options = {}) {
    const {
      quality = this.currentQuality,
      format = this.getBestFormat(),
      width,
      height,
    } = options;

    // Generate optimized image URL (this would typically call an image service)
    const params = new URLSearchParams();
    params.set("q", quality);
    params.set("f", format);
    if (width) params.set("w", width);
    if (height) params.set("h", height);

    return `${originalUrl}?${params.toString()}`;
  }

  setQuality(quality) {
    this.currentQuality = quality;
  }

  getCurrentQuality() {
    return this.currentQuality;
  }

  generateResponsiveImageSet(baseUrl, options = {}) {
    const { format = this.getBestFormat(), quality = this.currentQuality } =
      options;

    return this.config.breakpoints
      .map((width) => {
        const url = this.generateOptimizedUrl(baseUrl, {
          width,
          format,
          quality,
        });
        return `${url} ${width}w`;
      })
      .join(", ");
  }
}

// Device Detector
class DeviceDetector {
  getDeviceType() {
    const userAgent = navigator.userAgent;

    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return "tablet";
    }

    if (
      /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
        userAgent
      )
    ) {
      return "mobile";
    }

    return "desktop";
  }

  getScreenInfo() {
    return {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      pixelRatio: window.devicePixelRatio || 1,
      orientation: screen.orientation?.type || "portrait-primary",
    };
  }

  getTouchCapabilities() {
    return {
      touchSupport: "ontouchstart" in window,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      touchEvents: "TouchEvent" in window,
    };
  }
}

// Network Detector
class NetworkDetector {
  getConnectionInfo() {
    if ("connection" in navigator) {
      const connection = navigator.connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
        type: connection.type,
      };
    }

    // Fallback for browsers without Network Information API
    return {
      effectiveType: "4g",
      downlink: 10,
      rtt: 100,
      saveData: false,
      type: "unknown",
    };
  }

  isSlowConnection() {
    const connection = this.getConnectionInfo();
    return (
      ["slow-2g", "2g"].includes(connection.effectiveType) ||
      connection.saveData
    );
  }

  isFastConnection() {
    const connection = this.getConnectionInfo();
    return (
      ["4g", "5g"].includes(connection.effectiveType) && connection.downlink > 5
    );
  }
}

// Mobile Performance Monitor
class MobilePerformanceMonitor {
  constructor(config = {}) {
    this.config = {
      reportingInterval: 30000, // 30 seconds
      metricsToTrack: ["lcp", "fid", "cls", "ttfb", "fcp", "memory", "battery"],
      ...config,
    };

    this.metrics = new Map();
    this.deviceCapabilities = config.deviceCapabilities;
    this.isMonitoring = false;
  }

  startMonitoring() {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.setupPerformanceObservers();
    this.setupMemoryMonitoring();
    this.setupBatteryMonitoring();
    this.setupNetworkMonitoring();
    this.setupPeriodicReporting();
  }

  setupPerformanceObservers() {
    if ("PerformanceObserver" in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric(entry.entryType, {
            name: entry.name,
            value: entry.value || entry.startTime,
            timestamp: Date.now(),
          });
        });
      });

      try {
        observer.observe({
          entryTypes: [
            "largest-contentful-paint",
            "first-input",
            "layout-shift",
          ],
        });
      } catch (error) {
        console.warn("Performance Observer not fully supported:", error);
      }
    }
  }

  setupMemoryMonitoring() {
    if ("memory" in performance) {
      setInterval(() => {
        const memInfo = performance.memory;
        this.recordMetric("memory", {
          used: memInfo.usedJSHeapSize,
          total: memInfo.totalJSHeapSize,
          limit: memInfo.jsHeapSizeLimit,
          timestamp: Date.now(),
        });
      }, 10000); // Every 10 seconds
    }
  }

  setupBatteryMonitoring() {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        const recordBatteryInfo = () => {
          this.recordMetric("battery", {
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
            timestamp: Date.now(),
          });
        };

        recordBatteryInfo();

        battery.addEventListener("chargingchange", recordBatteryInfo);
        battery.addEventListener("levelchange", recordBatteryInfo);
      });
    }
  }

  setupNetworkMonitoring() {
    if ("connection" in navigator) {
      const recordNetworkInfo = () => {
        const connection = navigator.connection;
        this.recordMetric("network", {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
          timestamp: Date.now(),
        });
      };

      recordNetworkInfo();
      navigator.connection.addEventListener("change", recordNetworkInfo);
    }
  }

  recordMetric(type, data) {
    if (!this.metrics.has(type)) {
      this.metrics.set(type, []);
    }

    this.metrics.get(type).push(data);

    // Keep only last 100 entries per metric type
    const entries = this.metrics.get(type);
    if (entries.length > 100) {
      entries.shift();
    }
  }

  setupPeriodicReporting() {
    setInterval(() => {
      this.sendReport();
    }, this.config.reportingInterval);
  }

  async sendReport() {
    const report = this.generateReport();

    try {
      await fetch(this.config.reportingEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
    } catch (error) {
      console.error("Failed to send mobile performance report:", error);
    }
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      deviceCapabilities: this.deviceCapabilities,
      metrics: {},
      summary: {
        performanceScore: this.calculatePerformanceScore(),
        criticalIssues: this.identifyCriticalIssues(),
        recommendations: this.generateRecommendations(),
      },
    };

    // Include latest metrics
    this.metrics.forEach((entries, type) => {
      if (entries.length > 0) {
        report.metrics[type] = entries.slice(-10); // Last 10 entries
      }
    });

    return report;
  }

  calculatePerformanceScore() {
    // Calculate a performance score based on mobile-specific metrics
    let score = 100;

    // Check LCP
    const lcpEntries = this.metrics.get("largest-contentful-paint") || [];
    if (lcpEntries.length > 0) {
      const avgLCP =
        lcpEntries.reduce((sum, entry) => sum + entry.value, 0) /
        lcpEntries.length;
      if (avgLCP > 4000) score -= 30;
      else if (avgLCP > 2500) score -= 15;
    }

    // Check memory usage
    const memoryEntries = this.metrics.get("memory") || [];
    if (memoryEntries.length > 0) {
      const latestMemory = memoryEntries[memoryEntries.length - 1];
      const memoryUsage = latestMemory.used / latestMemory.limit;
      if (memoryUsage > 0.9) score -= 20;
      else if (memoryUsage > 0.7) score -= 10;
    }

    return Math.max(0, score);
  }

  identifyCriticalIssues() {
    const issues = [];

    // Check for memory leaks
    const memoryEntries = this.metrics.get("memory") || [];
    if (memoryEntries.length >= 5) {
      const recentEntries = memoryEntries.slice(-5);
      const memoryTrend = recentEntries[4].used - recentEntries[0].used;

      if (memoryTrend > 10 * 1024 * 1024) {
        // 10MB increase
        issues.push({
          type: "memory-leak",
          severity: "high",
          message: "Potential memory leak detected",
          data: { memoryIncrease: memoryTrend },
        });
      }
    }

    // Check battery drain
    const batteryEntries = this.metrics.get("battery") || [];
    if (batteryEntries.length >= 2) {
      const recent = batteryEntries[batteryEntries.length - 1];
      const previous = batteryEntries[batteryEntries.length - 2];

      if (!recent.charging && previous.level - recent.level > 0.05) {
        issues.push({
          type: "battery-drain",
          severity: "medium",
          message: "High battery consumption detected",
          data: { batteryDrop: previous.level - recent.level },
        });
      }
    }

    return issues;
  }

  generateRecommendations() {
    const recommendations = [];

    // Network-based recommendations
    const networkEntries = this.metrics.get("network") || [];
    if (networkEntries.length > 0) {
      const latestNetwork = networkEntries[networkEntries.length - 1];

      if (["slow-2g", "2g"].includes(latestNetwork.effectiveType)) {
        recommendations.push({
          type: "network-optimization",
          priority: "high",
          message: "Optimize for slow network conditions",
          actions: [
            "Reduce image quality",
            "Enable aggressive caching",
            "Minimize JavaScript execution",
            "Use text compression",
          ],
        });
      }
    }

    return recommendations;
  }

  stopMonitoring() {
    this.isMonitoring = false;
  }
}

// Usage example
const mobileOptimizer = new MobilePerformanceOptimizer({
  performanceTargets: {
    mobile: {
      lcp: 2500,
      fid: 100,
      cls: 0.1,
    },
  },
  optimizationStrategies: {
    images: ["webp", "lazy-loading", "responsive"],
    javascript: ["code-splitting", "tree-shaking"],
    caching: ["service-worker", "http-cache"],
  },
});

// Get current optimizations
const currentOptimizations = mobileOptimizer.getCurrentOptimizations();
console.log("Current Mobile Optimizations:", currentOptimizations);

// Optimize for current conditions
mobileOptimizer.optimizeForCurrentConditions().then((optimizations) => {
  console.log("Updated Optimizations:", optimizations);
});

// Generate performance report
const performanceReport = mobileOptimizer.generatePerformanceReport();
console.log("Mobile Performance Report:", performanceReport);
```

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

observer.observe({
  entryTypes: ["navigation", "paint", "largest-contentful-paint"],
});

// Web Vitals library
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// Custom performance measurement
function measurePerformance() {
  const navigation = performance.getEntriesByType("navigation")[0];

  const metrics = {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ssl: navigation.connectEnd - navigation.secureConnectionStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domParsing: navigation.domContentLoadedEventStart - navigation.responseEnd,
    resourceLoading:
      navigation.loadEventStart - navigation.domContentLoadedEventStart,
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
    const navigation = performance.getEntriesByType("navigation")[0];

    // Check load time budget
    if (navigation.loadEventEnd > this.budgets.loadTime) {
      this.violations.push({
        metric: "Load Time",
        actual: navigation.loadEventEnd,
        budget: this.budgets.loadTime,
      });
    }

    // Check resource count budget
    const resources = performance.getEntriesByType("resource");
    if (resources.length > this.budgets.resourceCount) {
      this.violations.push({
        metric: "Resource Count",
        actual: resources.length,
        budget: this.budgets.resourceCount,
      });
    }

    // Check total resource size budget
    const totalSize = resources.reduce((sum, resource) => {
      return sum + (resource.transferSize || 0);
    }, 0);

    if (totalSize > this.budgets.totalSize) {
      this.violations.push({
        metric: "Total Size",
        actual: totalSize,
        budget: this.budgets.totalSize,
      });
    }

    return this.violations;
  }
}

// Usage
const budget = new PerformanceBudget({
  loadTime: 3000, // 3 seconds
  resourceCount: 50,
  totalSize: 2 * 1024 * 1024, // 2MB
});

window.addEventListener("load", () => {
  setTimeout(() => {
    const violations = budget.check();
    if (violations.length > 0) {
      console.warn("Performance budget violations:", violations);
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
    <link rel="preload" href="hero-image.webp" as="image" />
    <link
      rel="preload"
      href="critical-font.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <!-- Critical CSS inline -->
    <style>
      .hero {
        width: 100%;
        height: 60vh;
        background-image: url("hero-image.webp");
        background-size: cover;
        background-position: center;
      }

      .hero-text {
        font-family: "CriticalFont", sans-serif;
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
    <link
      rel="preload"
      href="non-critical.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript><link rel="stylesheet" href="non-critical.css" /></noscript>
  </body>
</html>
```

**Optimizing First Input Delay (FID):**

```javascript
// Code splitting for better FID
// main.js
async function loadFeature() {
  const { FeatureModule } = await import("./feature.js");
  return new FeatureModule();
}

// Break up long tasks
function processLargeDataset(data) {
  const CHUNK_SIZE = 1000;
  let index = 0;

  function processChunk() {
    const chunk = data.slice(index, index + CHUNK_SIZE);

    // Process chunk
    chunk.forEach((item) => {
      // Heavy processing
      processItem(item);
    });

    index += CHUNK_SIZE;

    if (index < data.length) {
      // Use scheduler.postTask or setTimeout for better FID
      if ("scheduler" in window && "postTask" in scheduler) {
        scheduler.postTask(processChunk, { priority: "user-blocking" });
      } else {
        setTimeout(processChunk, 0);
      }
    }
  }

  processChunk();
}

// Optimize event handlers
class OptimizedEventHandler {
  constructor() {
    this.isProcessing = false;
  }

  handleClick = (event) => {
    if (this.isProcessing) return;

    this.isProcessing = true;

    // Use requestIdleCallback for non-urgent work
    requestIdleCallback(() => {
      this.performNonUrgentWork();
      this.isProcessing = false;
    });

    // Handle urgent work immediately
    this.performUrgentWork(event);
  };

  performUrgentWork(event) {
    // Critical UI updates
    event.target.classList.add("clicked");
  }

  performNonUrgentWork() {
    // Analytics, logging, etc.
    this.sendAnalytics();
  }
}
```

**Optimizing Cumulative Layout Shift (CLS):**

```css
/* Reserve space for dynamic content */
.image-container {
  width: 100%;
  aspect-ratio: 16 / 9; /* Prevents layout shift */
  background-color: #f0f0f0;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Use transform for animations instead of layout properties */
.animated-element {
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.animated-element.moved {
  transform: translateX(100px); /* No layout shift */
}

/* Avoid layout-triggering properties */
.avoid {
  /* Don't animate these properties */
  /* width, height, top, left, margin, padding */
}

.prefer {
  /* Animate these instead */
  transform: scale(1.1);
  opacity: 0.8;
}
```

```javascript
// Prevent layout shifts from dynamic content
class LayoutStabilizer {
  constructor() {
    this.observer = new ResizeObserver(this.handleResize.bind(this));
  }

  // Reserve space before loading content
  reserveSpace(element, expectedDimensions) {
    element.style.minHeight = `${expectedDimensions.height}px`;
    element.style.minWidth = `${expectedDimensions.width}px`;
  }

  // Load images with size attributes
  loadImageWithDimensions(src, width, height) {
    const img = new Image();
    img.width = width;
    img.height = height;
    img.src = src;

    return img;
  }

  // Handle dynamic content insertion
  insertContentSafely(container, content) {
    // Measure content first
    const measurer = document.createElement("div");
    measurer.style.position = "absolute";
    measurer.style.visibility = "hidden";
    measurer.innerHTML = content;
    document.body.appendChild(measurer);

    const dimensions = {
      width: measurer.offsetWidth,
      height: measurer.offsetHeight,
    };

    document.body.removeChild(measurer);

    // Reserve space
    this.reserveSpace(container, dimensions);

    // Insert content
    container.innerHTML = content;
  }

  handleResize(entries) {
    for (const entry of entries) {
      // Monitor for unexpected layout shifts
      console.log("Element resized:", entry.target, entry.contentRect);
    }
  }
}
```

---

### Q13: How do you implement effective caching strategies for frontend performance?

**Answer:**
Caching strategies are crucial for improving load times, reducing server load, and enhancing user experience through faster subsequent visits.

**Browser Caching Implementation:**

```javascript
// Service Worker for advanced caching
class AdvancedCacheManager {
  constructor() {
    this.CACHE_NAME = "app-cache-v1";
    this.STATIC_CACHE = "static-cache-v1";
    this.DYNAMIC_CACHE = "dynamic-cache-v1";
    this.API_CACHE = "api-cache-v1";

    this.CACHE_STRATEGIES = {
      CACHE_FIRST: "cache-first",
      NETWORK_FIRST: "network-first",
      STALE_WHILE_REVALIDATE: "stale-while-revalidate",
      NETWORK_ONLY: "network-only",
      CACHE_ONLY: "cache-only",
    };

    this.setupCacheStrategies();
  }

  setupCacheStrategies() {
    // Define caching rules for different resource types
    this.cacheRules = [
      {
        pattern: /\.(js|css|woff2|woff|ttf)$/,
        strategy: this.CACHE_STRATEGIES.CACHE_FIRST,
        cacheName: this.STATIC_CACHE,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        maxEntries: 100,
      },
      {
        pattern: /\.(png|jpg|jpeg|webp|svg|gif)$/,
        strategy: this.CACHE_STRATEGIES.CACHE_FIRST,
        cacheName: this.STATIC_CACHE,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        maxEntries: 200,
      },
      {
        pattern: /\/api\//,
        strategy: this.CACHE_STRATEGIES.NETWORK_FIRST,
        cacheName: this.API_CACHE,
        maxAge: 5 * 60 * 1000, // 5 minutes
        maxEntries: 50,
      },
      {
        pattern: /\.(html)$/,
        strategy: this.CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
        cacheName: this.DYNAMIC_CACHE,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        maxEntries: 30,
      },
    ];
  }

  async handleRequest(request) {
    const rule = this.findMatchingRule(request.url);

    if (!rule) {
      return fetch(request);
    }

    switch (rule.strategy) {
      case this.CACHE_STRATEGIES.CACHE_FIRST:
        return this.cacheFirst(request, rule);
      case this.CACHE_STRATEGIES.NETWORK_FIRST:
        return this.networkFirst(request, rule);
      case this.CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
        return this.staleWhileRevalidate(request, rule);
      case this.CACHE_STRATEGIES.NETWORK_ONLY:
        return fetch(request);
      case this.CACHE_STRATEGIES.CACHE_ONLY:
        return this.cacheOnly(request, rule);
      default:
        return fetch(request);
    }
  }

  findMatchingRule(url) {
    return this.cacheRules.find((rule) => rule.pattern.test(url));
  }

  async cacheFirst(request, rule) {
    try {
      const cache = await caches.open(rule.cacheName);
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        // Check if cache is still valid
        const cacheTime = new Date(cachedResponse.headers.get("sw-cache-time"));
        const now = new Date();

        if (now - cacheTime < rule.maxAge) {
          return cachedResponse;
        }
      }

      // Fetch from network and cache
      const networkResponse = await fetch(request);

      if (networkResponse.ok) {
        await this.cacheResponse(cache, request, networkResponse.clone(), rule);
      }

      return networkResponse;
    } catch (error) {
      console.error("Cache first strategy failed:", error);
      return new Response("Network error", { status: 408 });
    }
  }

  async networkFirst(request, rule) {
    try {
      const networkResponse = await fetch(request);

      if (networkResponse.ok) {
        const cache = await caches.open(rule.cacheName);
        await this.cacheResponse(cache, request, networkResponse.clone(), rule);
      }

      return networkResponse;
    } catch (error) {
      // Fallback to cache
      const cache = await caches.open(rule.cacheName);
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      return new Response("Network error and no cache available", {
        status: 408,
      });
    }
  }

  async staleWhileRevalidate(request, rule) {
    const cache = await caches.open(rule.cacheName);
    const cachedResponse = await cache.match(request);

    // Start network request in background
    const networkPromise = fetch(request)
      .then((response) => {
        if (response.ok) {
          this.cacheResponse(cache, request, response.clone(), rule);
        }
        return response;
      })
      .catch((error) => {
        console.error("Background fetch failed:", error);
      });

    // Return cached response immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }

    // Wait for network if no cache
    return networkPromise;
  }

  async cacheOnly(request, rule) {
    const cache = await caches.open(rule.cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response("Not found in cache", { status: 404 });
  }

  async cacheResponse(cache, request, response, rule) {
    // Add timestamp for cache validation
    const responseToCache = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        "sw-cache-time": new Date().toISOString(),
      },
    });

    await cache.put(request, responseToCache);

    // Cleanup old entries if needed
    await this.cleanupCache(cache, rule);
  }

  async cleanupCache(cache, rule) {
    const keys = await cache.keys();

    if (keys.length > rule.maxEntries) {
      // Remove oldest entries
      const entriesToDelete = keys.length - rule.maxEntries;
      const keysToDelete = keys.slice(0, entriesToDelete);

      await Promise.all(keysToDelete.map((key) => cache.delete(key)));
    }
  }

  // Cache management utilities
  async clearCache(cacheName) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    await Promise.all(keys.map((key) => cache.delete(key)));
  }

  async getCacheSize(cacheName) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    let totalSize = 0;

    for (const key of keys) {
      const response = await cache.match(key);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }

    return totalSize;
  }

  async getCacheStats() {
    const cacheNames = await caches.keys();
    const stats = {};

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      const size = await this.getCacheSize(cacheName);

      stats[cacheName] = {
        entries: keys.length,
        size: size,
        sizeFormatted: this.formatBytes(size),
      };
    }

    return stats;
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}

// Memory-based caching for API responses
class MemoryCache {
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
    // 5 minutes default TTL
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
    this.accessOrder = [];
  }

  set(key, value, customTTL) {
    const now = Date.now();
    const expiresAt = now + (customTTL || this.ttl);

    // Remove expired entries
    this.cleanup();

    // Implement LRU eviction
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.accessOrder.shift();
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expiresAt,
      createdAt: now,
    });

    // Update access order
    this.updateAccessOrder(key);
  }

  get(key) {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.removeFromAccessOrder(key);
      return null;
    }

    // Update access order
    this.updateAccessOrder(key);

    return entry.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    this.cache.delete(key);
    this.removeFromAccessOrder(key);
  }

  clear() {
    this.cache.clear();
    this.accessOrder = [];
  }

  cleanup() {
    const now = Date.now();
    const expiredKeys = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach((key) => {
      this.cache.delete(key);
      this.removeFromAccessOrder(key);
    });
  }

  updateAccessOrder(key) {
    this.removeFromAccessOrder(key);
    this.accessOrder.push(key);
  }

  removeFromAccessOrder(key) {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  getStats() {
    this.cleanup();

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate(),
      memoryUsage: this.estimateMemoryUsage(),
    };
  }

  calculateHitRate() {
    // This would need to be tracked separately
    return 0; // Placeholder
  }

  estimateMemoryUsage() {
    let totalSize = 0;

    for (const [key, entry] of this.cache.entries()) {
      totalSize +=
        this.estimateObjectSize(key) + this.estimateObjectSize(entry);
    }

    return totalSize;
  }

  estimateObjectSize(obj) {
    // Rough estimation
    return JSON.stringify(obj).length * 2; // 2 bytes per character
  }
}

// HTTP caching headers management
class HTTPCacheManager {
  static generateCacheHeaders(type, maxAge) {
    const headers = {};

    switch (type) {
      case "static":
        headers["Cache-Control"] = `public, max-age=${maxAge}, immutable`;
        headers["ETag"] = this.generateETag();
        break;

      case "dynamic":
        headers[
          "Cache-Control"
        ] = `private, max-age=${maxAge}, must-revalidate`;
        headers["Last-Modified"] = new Date().toUTCString();
        break;

      case "no-cache":
        headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
        headers["Pragma"] = "no-cache";
        headers["Expires"] = "0";
        break;

      case "api":
        headers["Cache-Control"] = `private, max-age=${maxAge}`;
        headers["Vary"] = "Accept, Authorization";
        break;
    }

    return headers;
  }

  static generateETag() {
    return `"${Date.now()}-${Math.random().toString(36).substr(2, 9)}"`;
  }

  static isModified(request, lastModified, etag) {
    const ifModifiedSince = request.headers.get("If-Modified-Since");
    const ifNoneMatch = request.headers.get("If-None-Match");

    if (ifNoneMatch && ifNoneMatch === etag) {
      return false;
    }

    if (
      ifModifiedSince &&
      new Date(ifModifiedSince) >= new Date(lastModified)
    ) {
      return false;
    }

    return true;
  }
}

// Usage example
const cacheManager = new AdvancedCacheManager();
const memoryCache = new MemoryCache(50, 10 * 60 * 1000); // 50 items, 10 minutes TTL

// In service worker
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheManager.handleRequest(event.request));
});

// In main application
class APIClient {
  constructor() {
    this.cache = new MemoryCache();
  }

  async get(url, options = {}) {
    const cacheKey = `${url}${JSON.stringify(options)}`;

    // Check memory cache first
    const cachedResponse = this.cache.get(cacheKey);
    if (cachedResponse && !options.bypassCache) {
      return cachedResponse;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      // Cache successful responses
      if (response.ok) {
        this.cache.set(cacheKey, data, options.cacheTTL);
      }

      return data;
    } catch (error) {
      // Return cached data if network fails
      if (cachedResponse) {
        console.warn("Network failed, returning cached data:", error);
        return cachedResponse;
      }
      throw error;
    }
  }
}
```

**Local Storage Caching:**

```javascript
// Persistent local storage cache with compression
class PersistentCache {
  constructor(prefix = "app_cache_", compressionEnabled = true) {
    this.prefix = prefix;
    this.compressionEnabled = compressionEnabled;
    this.storage = this.getAvailableStorage();
  }

  getAvailableStorage() {
    // Try IndexedDB first, fallback to localStorage
    if ("indexedDB" in window) {
      return new IndexedDBStorage();
    } else if ("localStorage" in window) {
      return new LocalStorageWrapper();
    } else {
      return new MemoryStorage();
    }
  }

  async set(key, data, options = {}) {
    const cacheEntry = {
      data: this.compressionEnabled ? await this.compress(data) : data,
      timestamp: Date.now(),
      ttl: options.ttl || 24 * 60 * 60 * 1000, // 24 hours default
      compressed: this.compressionEnabled,
      version: options.version || 1,
    };

    await this.storage.setItem(this.prefix + key, cacheEntry);
  }

  async get(key) {
    try {
      const cacheEntry = await this.storage.getItem(this.prefix + key);

      if (!cacheEntry) {
        return null;
      }

      // Check if expired
      if (Date.now() - cacheEntry.timestamp > cacheEntry.ttl) {
        await this.delete(key);
        return null;
      }

      // Decompress if needed
      const data = cacheEntry.compressed
        ? await this.decompress(cacheEntry.data)
        : cacheEntry.data;

      return data;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  }

  async delete(key) {
    await this.storage.removeItem(this.prefix + key);
  }

  async clear() {
    const keys = await this.storage.keys();
    const cacheKeys = keys.filter((key) => key.startsWith(this.prefix));

    await Promise.all(cacheKeys.map((key) => this.storage.removeItem(key)));
  }

  async compress(data) {
    if (!("CompressionStream" in window)) {
      return data; // Fallback to uncompressed
    }

    const stream = new CompressionStream("gzip");
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();

    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();

    writer.write(encoder.encode(jsonString));
    writer.close();

    const chunks = [];
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        chunks.push(value);
      }
    }

    return new Uint8Array(
      chunks.reduce((acc, chunk) => [...acc, ...chunk], [])
    );
  }

  async decompress(compressedData) {
    if (!("DecompressionStream" in window)) {
      return compressedData; // Fallback
    }

    const stream = new DecompressionStream("gzip");
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();

    writer.write(compressedData);
    writer.close();

    const chunks = [];
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        chunks.push(value);
      }
    }

    const decompressed = new Uint8Array(
      chunks.reduce((acc, chunk) => [...acc, ...chunk], [])
    );
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decompressed);

    return JSON.parse(jsonString);
  }

  async getStats() {
    const keys = await this.storage.keys();
    const cacheKeys = keys.filter((key) => key.startsWith(this.prefix));

    let totalSize = 0;
    let validEntries = 0;
    let expiredEntries = 0;

    for (const key of cacheKeys) {
      const entry = await this.storage.getItem(key);
      if (entry) {
        totalSize += JSON.stringify(entry).length;

        if (Date.now() - entry.timestamp > entry.ttl) {
          expiredEntries++;
        } else {
          validEntries++;
        }
      }
    }

    return {
      totalEntries: cacheKeys.length,
      validEntries,
      expiredEntries,
      totalSize,
      totalSizeFormatted: this.formatBytes(totalSize),
    };
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}

// IndexedDB storage implementation
class IndexedDBStorage {
  constructor(dbName = "CacheDB", version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  async init() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("cache")) {
          db.createObjectStore("cache", { keyPath: "key" });
        }
      };
    });
  }

  async setItem(key, value) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["cache"], "readwrite");
      const store = transaction.objectStore("cache");
      const request = store.put({ key, value });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getItem(key) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["cache"], "readonly");
      const store = transaction.objectStore("cache");
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.value : null);
      };
    });
  }

  async removeItem(key) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["cache"], "readwrite");
      const store = transaction.objectStore("cache");
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async keys() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["cache"], "readonly");
      const store = transaction.objectStore("cache");
      const request = store.getAllKeys();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }
}
```

---

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

````

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
````

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
      element.style.transition = "width 0.3s ease, height 0.3s ease";
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
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- DNS prefetch for external domains -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//api.example.com" />

    <!-- Preconnect to critical third-party origins -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Preload critical resources -->
    <link rel="preload" href="critical.css" as="style" />
    <link rel="preload" href="hero-image.webp" as="image" />
    <link rel="preload" href="app.js" as="script" />

    <!-- Critical CSS inline -->
    <style>
      /* Above-the-fold styles */
      body {
        margin: 0;
        font-family: system-ui;
      }
      .header {
        height: 60px;
        background: #007bff;
      }
      .hero {
        height: 50vh;
        background: url("hero-image.webp");
      }
    </style>

    <!-- Non-critical CSS with media trick -->
    <link
      rel="preload"
      href="styles.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript><link rel="stylesheet" href="styles.css" /></noscript>

    <!-- Prefetch next page resources -->
    <link rel="prefetch" href="/next-page.html" />
    <link rel="prefetch" href="next-page-image.webp" />
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
    document.getElementById("loading").style.display = "block";
  }

  hideLoading() {
    document.getElementById("loading").style.display = "none";
  }

  showError(error) {
    console.error("Failed to load module:", error);
  }
}

// Usage
const router = new AppRouter();

router.addRoute("/dashboard", () => import("./dashboard.js"));
router.addRoute("/profile", () => import("./profile.js"));
router.addRoute("/settings", () => import("./settings.js"));

// Intersection Observer for lazy loading
class LazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: "50px",
      threshold: 0.1,
      ...options,
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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  async loadElement(element) {
    const type = element.dataset.lazyType;

    switch (type) {
      case "image":
        await this.loadImage(element);
        break;
      case "component":
        await this.loadComponent(element);
        break;
      case "iframe":
        this.loadIframe(element);
        break;
    }
  }

  loadImage(img) {
    return new Promise((resolve, reject) => {
      const actualImg = new Image();

      actualImg.onload = () => {
        img.src = actualImg.src;
        img.classList.add("loaded");
        resolve();
      };

      actualImg.onerror = reject;
      actualImg.src = img.dataset.src;
    });
  }

  async loadComponent(element) {
    const componentName = element.dataset.component;

    try {
      const { default: Component } = await import(
        `./components/${componentName}.js`
      );
      const component = new Component(element);
      component.render();
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error);
    }
  }

  loadIframe(element) {
    const iframe = document.createElement("iframe");
    iframe.src = element.dataset.src;
    iframe.width = element.dataset.width || "100%";
    iframe.height = element.dataset.height || "400";
    element.appendChild(iframe);
  }
}

// Initialize lazy loader
const lazyLoader = new LazyLoader();

// Observe lazy elements
document.querySelectorAll("[data-lazy-type]").forEach((element) => {
  lazyLoader.observe(element);
});
```

**Resource Bundling and Optimization:**

```javascript
// Webpack configuration for performance
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          enforce: true,
        },
      },
    },
    usedExports: true,
    sideEffects: false,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Inline small images
              name: "[name].[hash:8].[ext]",
              outputPath: "images/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: { progressive: true, quality: 85 },
              optipng: { enabled: true },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 85 },
            },
          },
        ],
      },
    ],
  },
};

// Service Worker for caching
class CacheStrategy {
  constructor() {
    this.CACHE_NAME = "app-cache-v1";
    this.STATIC_ASSETS = ["/", "/styles.css", "/app.js", "/manifest.json"];
  }

  async install() {
    const cache = await caches.open(this.CACHE_NAME);
    return cache.addAll(this.STATIC_ASSETS);
  }

  async handleFetch(event) {
    const request = event.request;

    // Network first for API calls
    if (request.url.includes("/api/")) {
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
      return cachedResponse || new Response("Offline", { status: 503 });
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

    const fetchPromise = fetch(request).then((response) => {
      if (response.ok) {
        const cache = caches.open(this.CACHE_NAME);
        cache.then((c) => c.put(request, response.clone()));
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
    const reads = this.operations.filter((op) => op.type === "read");
    reads.forEach((op) => op.execute());

    // Then batch writes
    const writes = this.operations.filter((op) => op.type === "write");
    writes.forEach((op) => op.execute());

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
      type: "read",
      execute: () => {
        const rect = element.getBoundingClientRect();
        data[index].width = rect.width;
      },
    });

    // Write operations
    batcher.add({
      type: "write",
      execute: () => {
        element.style.height = `${data[index].width * 0.6}px`;
        element.textContent = data[index].text;
      },
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

    this.container.addEventListener("scroll", () => {
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
    this.container.innerHTML = "";

    // Create spacer for items above viewport
    if (startIndex > 0) {
      const topSpacer = document.createElement("div");
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
      const bottomSpacer = document.createElement("div");
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

    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static rafThrottle(func) {
    let ticking = false;

    return function (...args) {
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
    this.container.addEventListener("click", this.handleEvent.bind(this));
    this.container.addEventListener("change", this.handleEvent.bind(this));
    this.container.addEventListener("input", this.handleEvent.bind(this));
  }

  handleEvent(event) {
    const target = event.target;

    this.handlers.forEach((handlers, key) => {
      const [eventType, selector] = key.split(":");

      if (event.type === eventType && target.matches(selector)) {
        handlers.forEach((handler) => handler(event, target));
      }
    });
  }
}

// Usage
const delegator = new EventDelegator(document.body);

delegator.on(".button", "click", (event, target) => {
  console.log("Button clicked:", target);
});

delegator.on(
  ".input",
  "input",
  PerformanceUtils.debounce((event, target) => {
    console.log("Input changed:", target.value);
  }, 300)
);
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
    this.element.addEventListener("click", this.boundHandleClick);
    window.addEventListener("resize", this.boundHandleResize);
  }

  handleClick(event) {
    console.log("Clicked:", event.target);
  }

  handleResize(event) {
    console.log("Resized:", window.innerWidth);
  }

  destroy() {
    // Clean up event listeners
    this.element.removeEventListener("click", this.boundHandleClick);
    window.removeEventListener("resize", this.boundHandleResize);

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
    this.timers.forEach((timerId) => clearTimeout(timerId));
    this.intervals.forEach((intervalId) => clearInterval(intervalId));

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
    this.observers.forEach((observer) => observer.disconnect());
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
    return function (input) {
      // This closure holds reference to entire largeData
      return largeData.process(input);
    };
  }

  // GOOD: Extract only needed data
  createProcessorGood(largeData) {
    const processMethod = largeData.process.bind(largeData);

    return function (input) {
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
      options.observers.forEach((observer) => {
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
      cleanup.forEach((task) => task());
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
    if ("memory" in performance) {
      const memory = performance.memory;
      const measurement = {
        timestamp: Date.now(),
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
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
    const trend = this.calculateTrend(recent.map((m) => m.usedJSHeapSize));

    if (trend > 1024 * 1024) {
      // 1MB increase trend
      console.warn("Potential memory leak detected:", {
        trend: `${(trend / 1024 / 1024).toFixed(2)}MB increase`,
        current: `${(current.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      });
    }
  }

  calculateTrend(values) {
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, i) => sum + i * val, 0);
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
        limit: `${(latest.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`,
      },
      change: {
        used: `${(
          (latest.usedJSHeapSize - oldest.usedJSHeapSize) /
          1024 /
          1024
        ).toFixed(2)}MB`,
        duration: `${((latest.timestamp - oldest.timestamp) / 1000).toFixed(
          1
        )}s`,
      },
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
    console.log("Memory Report:", report);
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
    LOW: 3,
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
      cacheKey,
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
    const sortedRequests = Array.from(this.loadQueue.values()).sort((a, b) => {
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
      case "image":
        return this.loadImage(url, adaptedOptions);
      case "script":
        return this.loadScript(url, adaptedOptions);
      case "style":
        return this.loadStylesheet(url, adaptedOptions);
      case "json":
        return this.loadJSON(url, adaptedOptions);
      default:
        return this.loadGeneric(url, adaptedOptions);
    }
  }

  private async loadImage(
    url: string,
    options: AdaptedOptions
  ): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      // Progressive loading for large images
      if (options.progressive) {
        img.loading = "lazy";
        img.decoding = "async";
      }

      // Responsive image selection
      if (options.srcSet) {
        img.srcset = options.srcSet;
        img.sizes = options.sizes || "100vw";
      }

      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  private setupIntersectionObserver(): void {
    if (!("IntersectionObserver" in window)) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const url = element.dataset.src;
            if (url) {
              this.loadResource(url, {
                type: "image",
                priority: this.priorityLevels.HIGH,
              });
            }
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.1,
      }
    );
  }

  private getNetworkInfo(): NetworkInfo {
    const connection = (navigator as any).connection;
    if (!connection) {
      return { effectiveType: "4g", downlink: 10, rtt: 100 };
    }

    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }

  private adaptOptionsForNetwork(
    options: LoadOptions,
    network: NetworkInfo
  ): AdaptedOptions {
    const adapted = { ...options };

    // Reduce quality for slow connections
    if (network.effectiveType === "slow-2g" || network.effectiveType === "2g") {
      adapted.quality = "low";
      adapted.timeout = 30000;
    } else if (network.effectiveType === "3g") {
      adapted.quality = "medium";
      adapted.timeout = 15000;
    } else {
      adapted.quality = "high";
      adapted.timeout = 10000;
    }

    // Honor data saver preference
    if (network.saveData) {
      adapted.quality = "low";
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
        entries.forEach((entry) => {
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
    this.container.addEventListener("scroll", () => {
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
      end: Math.min(this.items.length - 1, end + this.renderBuffer),
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
    this.container.innerHTML = "";

    // Create spacer for items before visible range
    const topSpacer = document.createElement("div");
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
    const bottomSpacerHeight =
      this.totalHeight - this.getOffsetTop(this.visibleRange.end + 1);
    const bottomSpacer = document.createElement("div");
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
      priority: options.priority || 1,
    };

    // Check if we need to evict items
    if (this.cache.size >= this.maxSize) {
      await this.evictLeastUseful();
    }

    this.cache.set(key, entry);
    this.updateAccessLog(key, "write");
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

    this.updateAccessLog(key, "read");

    return entry.compressed ? await this.decompress(entry.value) : entry.value;
  }

  private updateAccessLog(key: string, operation: "read" | "write"): void {
    const existing = this.accessLog.get(key) || {
      reads: 0,
      writes: 0,
      lastAccess: 0,
      frequency: 0,
    };

    existing[operation === "read" ? "reads" : "writes"]++;
    existing.lastAccess = Date.now();
    existing.frequency = this.calculateFrequency(existing);

    this.accessLog.set(key, existing);
  }

  private calculateFrequency(access: AccessInfo): number {
    const totalAccess = access.reads + access.writes;
    const timeSinceFirst =
      Date.now() - (access.lastAccess - totalAccess * 1000);
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
    if (!("CompressionStream" in window)) {
      return JSON.stringify(data);
    }

    const stream = new CompressionStream("gzip");
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

    const compressed = new Uint8Array(
      chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    );
    let offset = 0;

    for (const chunk of chunks) {
      compressed.set(chunk, offset);
      offset += chunk.length;
    }

    return btoa(String.fromCharCode(...compressed));
  }

  private async decompress(compressedData: string): Promise<any> {
    if (!("DecompressionStream" in window)) {
      return JSON.parse(compressedData);
    }

    const compressed = Uint8Array.from(atob(compressedData), (c) =>
      c.charCodeAt(0)
    );

    const stream = new DecompressionStream("gzip");
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

    const decompressed = new Uint8Array(
      chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    );
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
    const totalSize = Array.from(this.cache.values()).reduce(
      (sum, entry) => sum + entry.size,
      0
    );

    const hitRate =
      Array.from(this.accessLog.values()).reduce(
        (sum, access) => sum + access.reads,
        0
      ) /
      Array.from(this.accessLog.values()).reduce(
        (sum, access) => sum + access.reads + access.writes,
        0
      );

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      totalSize,
      hitRate,
      averageFrequency:
        Array.from(this.accessLog.values()).reduce(
          (sum, access) => sum + access.frequency,
          0
        ) / this.accessLog.size,
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
    this.createObserver("navigation", ["navigation"]);

    // Paint timing
    this.createObserver("paint", ["paint"]);

    // Largest Contentful Paint
    this.createObserver("lcp", ["largest-contentful-paint"]);

    // First Input Delay
    this.createObserver("fid", ["first-input"]);

    // Layout Shift
    this.createObserver("cls", ["layout-shift"]);

    // Resource timing
    this.createObserver("resource", ["resource"]);

    // User timing
    this.createObserver("user", ["measure"]);
  }

  private createObserver(name: string, entryTypes: string[]): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(name, {
            name: entry.name,
            value: this.extractValue(entry),
            timestamp: entry.startTime,
            details: this.extractDetails(entry),
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
    if ("value" in entry) return (entry as any).value;
    if ("duration" in entry) return entry.duration;
    if ("startTime" in entry) return entry.startTime;
    return 0;
  }

  private extractDetails(entry: PerformanceEntry): any {
    const details: any = {
      entryType: entry.entryType,
      name: entry.name,
    };

    // Add specific details based on entry type
    if (entry.entryType === "navigation") {
      const nav = entry as PerformanceNavigationTiming;
      details.transferSize = nav.transferSize;
      details.encodedBodySize = nav.encodedBodySize;
      details.decodedBodySize = nav.decodedBodySize;
    } else if (entry.entryType === "resource") {
      const resource = entry as PerformanceResourceTiming;
      details.transferSize = resource.transferSize;
      details.initiatorType = resource.initiatorType;
    } else if (entry.entryType === "largest-contentful-paint") {
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

      this.recordMetric("custom", {
        name,
        value: duration,
        timestamp: startTime,
        details: { duration },
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
      case "gt":
        return value > alert.threshold;
      case "lt":
        return value < alert.threshold;
      case "eq":
        return value === alert.threshold;
      case "gte":
        return value >= alert.threshold;
      case "lte":
        return value <= alert.threshold;
      default:
        return false;
    }
  }

  private async triggerAlert(
    alert: AlertConfig,
    data: MetricData
  ): Promise<void> {
    const alertData = {
      alert: alert.name,
      category: alert.category,
      metric: data.name,
      value: data.value,
      threshold: alert.threshold,
      timestamp: Date.now(),
      severity: alert.severity || "warning",
    };

    // Send to reporting endpoint
    try {
      await fetch(`${this.reportingEndpoint}/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alertData),
      });
    } catch (error) {
      console.error("Failed to send alert:", error);
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(report),
        });
      } catch (error) {
        console.error("Failed to send performance report:", error);
      }
    }, interval);
  }

  generateReport(): PerformanceReport {
    const report: PerformanceReport = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: {},
    };

    // Aggregate metrics by category
    for (const [category, metrics] of this.metrics.entries()) {
      if (metrics.length === 0) continue;

      const values = metrics.map((m) => m.value);
      const recent = metrics.filter((m) => Date.now() - m.timestamp < 300000); // Last 5 minutes

      report.metrics[category] = {
        count: metrics.length,
        average: values.reduce((sum, val) => sum + val, 0) / values.length,
        median: this.calculateMedian(values),
        p95: this.calculatePercentile(values, 95),
        min: Math.min(...values),
        max: Math.max(...values),
        recent: recent.length,
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
      return categoryMetrics
        ? new Map([[category, categoryMetrics]])
        : new Map();
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
  type?: "image" | "script" | "style" | "json" | "generic";
  priority?: number;
  progressive?: boolean;
  srcSet?: string;
  sizes?: string;
  timeout?: number;
}

interface AdaptedOptions extends LoadOptions {
  quality?: "low" | "medium" | "high";
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
  operator: "gt" | "lt" | "eq" | "gte" | "lte";
  severity?: "info" | "warning" | "error" | "critical";
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
  enableProgressiveLoading: true,
});

// Load critical resources with high priority
resourceLoader.loadResource("/api/critical-data.json", {
  type: "json",
  priority: 0, // CRITICAL
});

// Load images with lazy loading
resourceLoader.loadResource("/images/hero.jpg", {
  type: "image",
  priority: 1, // HIGH
  progressive: true,
  srcSet:
    "/images/hero-320.jpg 320w, /images/hero-640.jpg 640w, /images/hero-1280.jpg 1280w",
  sizes: "(max-width: 320px) 280px, (max-width: 640px) 600px, 1200px",
});

// Virtual scrolling for large lists
const virtualScroller = new AdvancedVirtualScroller(
  document.getElementById("list-container")!,
  largeDataArray,
  (item, index) => {
    const element = document.createElement("div");
    element.className = "list-item";
    element.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
    return element;
  },
  80 // estimated item height
);

// Intelligent caching
const cache = new IntelligentCache({
  maxSize: 200,
  ttl: 3600000, // 1 hour
  compression: true,
});

// Performance analytics
const analytics = new PerformanceAnalytics({
  endpoint: "/api/performance",
  reportingInterval: 30000,
});

// Add performance alerts
analytics.addAlert({
  name: "High LCP",
  category: "lcp",
  metric: "largest-contentful-paint",
  threshold: 2500,
  operator: "gt",
  severity: "warning",
  callback: (alert) => {
    console.warn("LCP threshold exceeded:", alert);
  },
});

// Custom performance measurement
const apiTimer = analytics.startTimer("api.user.profile");
fetch("/api/user/profile")
  .then((response) => response.json())
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
    console.warn("Resource pool exhausted, creating temporary object");
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
      available: this.pool.length,
    };
  }
}

// DOM Element Pool for Virtual Scrolling
class DOMElementPool {
  private elementPools = new Map<string, ResourcePool<HTMLElement>>();

  getElement(tagName: string, className?: string): HTMLElement {
    const key = `${tagName}:${className || ""}`;

    if (!this.elementPools.has(key)) {
      this.elementPools.set(
        key,
        new ResourcePool(
          () => {
            const element = document.createElement(tagName);
            if (className) {
              element.className = className;
            }
            return element;
          },
          (element) => {
            element.innerHTML = "";
            element.removeAttribute("style");
            // Reset other attributes as needed
            Array.from(element.attributes).forEach((attr) => {
              if (attr.name !== "class") {
                element.removeAttribute(attr.name);
              }
            });
          },
          100
        )
      );
    }

    return this.elementPools.get(key)!.acquire();
  }

  releaseElement(
    element: HTMLElement,
    tagName: string,
    className?: string
  ): void {
    const key = `${tagName}:${className || ""}`;
    const pool = this.elementPools.get(key);
    if (pool) {
      pool.release(element);
    }
  }

  clearAll(): void {
    this.elementPools.forEach((pool) => pool.clear());
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

    this.container.addEventListener("scroll", () => {
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

    const start = Math.max(
      0,
      Math.floor(scrollTop / this.itemHeight) - this.bufferSize
    );
    const end = Math.min(
      this.data.length - 1,
      Math.ceil((scrollTop + containerHeight) / this.itemHeight) +
        this.bufferSize
    );

    this.visibleRange = { start, end };
  }

  private renderVisibleItems(): void {
    // Remove items that are no longer visible
    for (const [index, element] of this.renderedItems) {
      if (index < this.visibleRange.start || index > this.visibleRange.end) {
        this.container.removeChild(element);
        this.elementPool.releaseElement(element, "div", "virtual-item");
        this.renderedItems.delete(index);
      }
    }

    // Add new visible items
    for (let i = this.visibleRange.start; i <= this.visibleRange.end; i++) {
      if (!this.renderedItems.has(i) && this.data[i]) {
        const element = this.elementPool.getElement("div", "virtual-item");
        element.style.position = "absolute";
        element.style.top = `${i * this.itemHeight}px`;
        element.style.height = `${this.itemHeight}px`;
        element.style.width = "100%";

        this.renderItem(this.data[i], element);
        this.container.appendChild(element);
        this.renderedItems.set(i, element);
      }
    }

    // Update container height
    this.container.style.height = `${this.data.length * this.itemHeight}px`;
  }

  destroy(): void {
    this.renderedItems.forEach((element) => {
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
      const request = indexedDB.open("AdvancedCache", 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.persistentCache = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("cache")) {
          const store = db.createObjectStore("cache", { keyPath: "key" });
          store.createIndex("expiry", "expiry", { unique: false });
          store.createIndex("priority", "priority", { unique: false });
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
      compressed: this.compressionEnabled,
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

    const transaction = this.persistentCache.transaction(
      ["cache"],
      "readwrite"
    );
    const store = transaction.objectStore("cache");

    return new Promise((resolve, reject) => {
      const request = store.put(entry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async getFromPersistent(key: string): Promise<CacheEntry | null> {
    if (!this.persistentCache) return null;

    const transaction = this.persistentCache.transaction(["cache"], "readonly");
    const store = transaction.objectStore("cache");

    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  private async evictLRU(): Promise<void> {
    let oldestEntry: CacheEntry | null = null;
    let oldestKey = "";

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
    if (typeof CompressionStream !== "undefined") {
      const stream = new CompressionStream("gzip");
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

      const compressed = new Uint8Array(
        chunks.reduce((acc, chunk) => acc + chunk.length, 0)
      );
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
    if (typeof DecompressionStream !== "undefined") {
      try {
        const binaryString = atob(compressedData);
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }

        const stream = new DecompressionStream("gzip");
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

        const decompressed = new Uint8Array(
          chunks.reduce((acc, chunk) => acc + chunk.length, 0)
        );
        let offset = 0;
        for (const chunk of chunks) {
          decompressed.set(chunk, offset);
          offset += chunk.length;
        }

        const decoder = new TextDecoder();
        const jsonString = decoder.decode(decompressed);
        return JSON.parse(jsonString);
      } catch (error) {
        console.warn(
          "Decompression failed, falling back to JSON parse:",
          error
        );
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
      const transaction = this.persistentCache.transaction(
        ["cache"],
        "readwrite"
      );
      const store = transaction.objectStore("cache");
      store.delete(key);
    }
  }

  async clear(): Promise<void> {
    this.memoryCache.clear();
    this.currentMemorySize = 0;

    if (this.persistentCache) {
      const transaction = this.persistentCache.transaction(
        ["cache"],
        "readwrite"
      );
      const store = transaction.objectStore("cache");
      store.clear();
    }
  }

  getStats(): CacheStats {
    return {
      memoryEntries: this.memoryCache.size,
      memorySize: this.currentMemorySize,
      maxMemorySize: this.maxMemorySize,
      memoryUtilization: (this.currentMemorySize / this.maxMemorySize) * 100,
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
    if ("PerformanceObserver" in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            this.recordNavigationMetrics(entry as PerformanceNavigationTiming);
          }
        }
      });
      navObserver.observe({ entryTypes: ["navigation"] });
      this.observers.set("navigation", navObserver);

      // Resource Timing
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordResourceMetrics(entry as PerformanceResourceTiming);
        }
      });
      resourceObserver.observe({ entryTypes: ["resource"] });
      this.observers.set("resource", resourceObserver);

      // Paint Timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordPaintMetrics(entry);
        }
      });
      paintObserver.observe({ entryTypes: ["paint"] });
      this.observers.set("paint", paintObserver);

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric("lcp", lastEntry.startTime, {
          element: (lastEntry as any).element?.tagName,
          url: (lastEntry as any).url,
        });
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.set("lcp", lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(
            "fid",
            (entry as any).processingStart - entry.startTime,
            {
              eventType: (entry as any).name,
            }
          );
        }
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
      this.observers.set("fid", fidObserver);

      // Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        if (clsValue > 0) {
          this.recordMetric("cls", clsValue);
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.set("cls", clsObserver);
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
      ssl:
        entry.secureConnectionStart > 0
          ? entry.connectEnd - entry.secureConnectionStart
          : 0,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domParse: entry.domContentLoadedEventStart - entry.responseEnd,
      domReady:
        entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart,
      totalTime: entry.loadEventEnd - entry.navigationStart,
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
      size,
    });

    this.recordMetric(`resource.${resourceType}.size`, size, {
      url: entry.name,
    });

    // Check for slow resources
    if (duration > 1000) {
      // > 1 second
      this.recordMetric("resource.slow", duration, {
        url: entry.name,
        type: resourceType,
        size,
      });
    }
  }

  private recordPaintMetrics(entry: PerformanceEntry): void {
    this.recordMetric(entry.name.replace("-", "_"), entry.startTime);
  }

  private setupMemoryMonitoring(): void {
    if ("memory" in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.recordMetric("memory.used", memory.usedJSHeapSize);
        this.recordMetric("memory.total", memory.totalJSHeapSize);
        this.recordMetric("memory.limit", memory.jsHeapSizeLimit);
        this.recordMetric(
          "memory.utilization",
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
        this.recordMetric("fps", fps);

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFrameRate);
    };

    requestAnimationFrame(measureFrameRate);
  }

  private setupNetworkMonitoring(): void {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;

      const recordNetworkInfo = () => {
        this.recordMetric("network.downlink", connection.downlink);
        this.recordMetric("network.rtt", connection.rtt);
        this.recordMetric("network.effectiveType", connection.effectiveType, {
          type: "categorical",
        });
      };

      recordNetworkInfo();
      connection.addEventListener("change", recordNetworkInfo);
    }
  }

  private setupCustomObservers(): void {
    // User Timing
    if ("PerformanceObserver" in window) {
      const userTimingObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(
            `user.${entry.name}`,
            entry.duration || entry.startTime,
            {
              type: entry.entryType,
            }
          );
        }
      });
      userTimingObserver.observe({ entryTypes: ["measure", "mark"] });
      this.observers.set("userTiming", userTimingObserver);
    }
  }

  recordMetric(name: string, value: number, metadata?: any): void {
    const timestamp = Date.now();
    const metric: MetricData = {
      name,
      value,
      timestamp,
      metadata,
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

  recordCustomMetric(
    name: string,
    value: number,
    type: MetricType = "gauge"
  ): void {
    const customMetric: CustomMetric = {
      name,
      value,
      type,
      timestamp: Date.now(),
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

  private checkAlertThresholds(
    name: string,
    value: number,
    metadata?: any
  ): void {
    const threshold = this.alertThresholds.get(name);
    if (!threshold) return;

    let triggered = false;
    let severity: "warning" | "critical" = "warning";

    if (threshold.critical !== undefined) {
      if (threshold.operator === "gt" && value > threshold.critical) {
        triggered = true;
        severity = "critical";
      } else if (threshold.operator === "lt" && value < threshold.critical) {
        triggered = true;
        severity = "critical";
      }
    }

    if (!triggered && threshold.warning !== undefined) {
      if (threshold.operator === "gt" && value > threshold.warning) {
        triggered = true;
        severity = "warning";
      } else if (threshold.operator === "lt" && value < threshold.warning) {
        triggered = true;
        severity = "warning";
      }
    }

    if (triggered) {
      this.reporter.reportAlert({
        metric: name,
        value,
        threshold: threshold[severity]!,
        severity,
        timestamp: Date.now(),
        metadata,
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
      summary: this.generateSummary(),
    };

    this.reporter.sendReport(report);
  }

  private aggregateMetrics(): AggregatedMetrics {
    const aggregated: AggregatedMetrics = {};

    for (const [name, values] of this.metrics) {
      if (values.length === 0) continue;

      const numericValues = values
        .map((v) => v.value)
        .filter((v) => typeof v === "number");
      if (numericValues.length === 0) continue;

      aggregated[name] = {
        count: numericValues.length,
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        avg: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
        p50: this.percentile(numericValues, 0.5),
        p90: this.percentile(numericValues, 0.9),
        p95: this.percentile(numericValues, 0.95),
        p99: this.percentile(numericValues, 0.99),
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
        lcp: metrics["lcp"]?.p75 || 0,
        fid: metrics["fid"]?.p75 || 0,
        cls: metrics["cls"]?.avg || 0,
      },
      loadTimes: {
        ttfb: metrics["navigation.ttfb"]?.avg || 0,
        domReady: metrics["navigation.domReady"]?.avg || 0,
        loadComplete: metrics["navigation.loadComplete"]?.avg || 0,
      },
      resources: {
        totalRequests: metrics["resource.total"]?.count || 0,
        slowRequests: metrics["resource.slow"]?.count || 0,
        averageSize: metrics["resource.size"]?.avg || 0,
      },
      performance: {
        averageFPS: metrics["fps"]?.avg || 0,
        memoryUsage: metrics["memory.utilization"]?.avg || 0,
      },
    };
  }

  private getResourceType(url: string): string {
    const extension = url.split(".").pop()?.toLowerCase();

    if (["js", "mjs"].includes(extension || "")) return "script";
    if (["css"].includes(extension || "")) return "stylesheet";
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || ""))
      return "image";
    if (["woff", "woff2", "ttf", "otf"].includes(extension || ""))
      return "font";
    if (["mp4", "webm", "ogg"].includes(extension || "")) return "video";
    if (["mp3", "wav", "ogg"].includes(extension || "")) return "audio";

    return "other";
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

type MetricType = "counter" | "gauge" | "histogram" | "timer";

interface AlertThreshold {
  warning?: number;
  critical?: number;
  operator: "gt" | "lt";
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
  severity: "warning" | "critical";
  timestamp: number;
  metadata?: any;
}

// Metrics Reporter
class MetricsReporter {
  constructor(private endpoint: string, private apiKey: string) {}

  async sendReport(report: PerformanceReport): Promise<void> {
    try {
      await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(report),
      });
    } catch (error) {
      console.error("Failed to send performance report:", error);
    }
  }

  async reportAlert(alert: Alert): Promise<void> {
    try {
      await fetch(`${this.endpoint}/alerts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(alert),
      });
    } catch (error) {
      console.error("Failed to send alert:", error);
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
    enableNetworkMonitoring: true,
  },
  new MetricsReporter("/api/metrics", "your-api-key")
);

// Set alert thresholds
performanceMonitor.setAlertThreshold("lcp", {
  warning: 2500,
  critical: 4000,
  operator: "gt",
});

performanceMonitor.setAlertThreshold("fid", {
  warning: 100,
  critical: 300,
  operator: "gt",
});

performanceMonitor.setAlertThreshold("cls", {
  warning: 0.1,
  critical: 0.25,
  operator: "gt",
});

// Record custom metrics
const apiTimer = performanceMonitor.startTimer("api.user.fetch");
// ... API call
apiTimer();

performanceMonitor.recordCustomMetric("user.actions", 1, "counter");
```

---

### Q9: How do you implement advanced performance optimization for modern web applications?

**Difficulty: Expert**

**Answer:**
Modern web applications require sophisticated performance optimization strategies that leverage cutting-edge browser APIs, advanced bundling techniques, and intelligent resource management.

**1. Advanced Bundle Optimization and Code Splitting:**

```javascript
// Advanced Webpack configuration for optimal performance
const path = require("path");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
    vendor: ["react", "react-dom"],
    polyfills: "./src/polyfills.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
    publicPath: "/",
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log", "console.info"],
          },
          mangle: {
            safari10: true,
          },
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
    ],

    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 10,
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 5,
          reuseExistingChunk: true,
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },

    runtimeChunk: {
      name: "runtime",
    },

    moduleIds: "deterministic",
    chunkIds: "deterministic",
  },

  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),

    new CompressionPlugin({
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 8192,
      minRatio: 0.8,
      filename: "[path][base].br",
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
    }),
  ],
};

// Advanced dynamic import with intelligent preloading
class IntelligentModuleLoader {
  constructor() {
    this.loadedModules = new Map();
    this.preloadQueue = new Set();
    this.loadingPromises = new Map();
    this.userBehaviorTracker = new UserBehaviorTracker();
  }

  async loadModule(moduleName, priority = "normal") {
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
      dashboard: () =>
        import(/* webpackChunkName: "dashboard" */ "./components/Dashboard"),
      analytics: () =>
        import(/* webpackChunkName: "analytics" */ "./components/Analytics"),
      settings: () =>
        import(/* webpackChunkName: "settings" */ "./components/Settings"),
      reports: () =>
        import(/* webpackChunkName: "reports" */ "./components/Reports"),
    };

    if (!moduleMap[moduleName]) {
      throw new Error(`Module ${moduleName} not found`);
    }

    // Implement priority-based loading
    if (priority === "high") {
      return moduleMap[moduleName]();
    }

    // For normal priority, check network conditions
    const connection = navigator.connection;
    if (connection && connection.effectiveType === "slow-2g") {
      // Defer loading on slow connections
      await this.waitForBetterConnection();
    }

    return moduleMap[moduleName]();
  }

  preloadModule(moduleName) {
    if (
      !this.loadedModules.has(moduleName) &&
      !this.preloadQueue.has(moduleName)
    ) {
      this.preloadQueue.add(moduleName);

      // Use requestIdleCallback for non-critical preloading
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          this.loadModule(moduleName, "low");
        });
      } else {
        setTimeout(() => {
          this.loadModule(moduleName, "low");
        }, 100);
      }
    }
  }

  async waitForBetterConnection() {
    return new Promise((resolve) => {
      const checkConnection = () => {
        const connection = navigator.connection;
        if (!connection || connection.effectiveType !== "slow-2g") {
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
      likelyNextModules.forEach((module) => this.preloadModule(module));
    });
  }

  predictNextModules(pattern) {
    // Simple prediction logic - can be enhanced with ML
    const predictions = {
      "dashboard->analytics": ["reports"],
      "analytics->reports": ["dashboard"],
      "settings->dashboard": ["analytics"],
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
        this.callbacks.forEach((callback) => callback(pattern));
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
      chunkSize: 50,
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
      entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
    });

    // Long task observer
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.handleLongTask(entry);
      }
    });

    longTaskObserver.observe({ entryTypes: ["longtask"] });

    this.observers.push(vitalsObserver, longTaskObserver);
  }

  processVitalMetric(entry) {
    const metricName = entry.entryType;
    const value = entry.value || entry.startTime;

    this.metrics.set(metricName, value);

    // Trigger optimizations based on thresholds
    if (metricName === "largest-contentful-paint" && value > 2500) {
      this.optimizeLCP();
    }

    if (metricName === "first-input" && value > 100) {
      this.optimizeFID();
    }

    if (metricName === "layout-shift" && value > 0.1) {
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
    this.adaptiveSettings.imageQuality = Math.max(
      0.6,
      this.adaptiveSettings.imageQuality - 0.1
    );

    // Preload critical resources
    this.preloadCriticalResources();

    // Optimize font loading
    this.optimizeFontLoading();
  }

  optimizeFID() {
    // Increase debounce delays
    this.adaptiveSettings.debounceDelay = Math.min(
      200,
      this.adaptiveSettings.debounceDelay + 20
    );

    // Reduce animation complexity
    this.adaptiveSettings.animationDuration = Math.max(
      150,
      this.adaptiveSettings.animationDuration - 50
    );

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
        if ("scheduler" in window && "postTask" in window.scheduler) {
          return window.scheduler.postTask(callback, options);
        }

        // Fallback to setTimeout with priority simulation
        const delay = options.priority === "user-blocking" ? 0 : 5;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(callback());
          }, delay);
        });
      },
    };

    // Break heavy tasks into smaller chunks
    this.optimizations.set("taskBreaking", scheduler);
  }

  setupNetworkObserver() {
    if ("connection" in navigator) {
      const connection = navigator.connection;

      const updateNetworkOptimizations = () => {
        const effectiveType = connection.effectiveType;

        switch (effectiveType) {
          case "slow-2g":
          case "2g":
            this.adaptiveSettings.imageQuality = 0.5;
            this.adaptiveSettings.chunkSize = 20;
            break;
          case "3g":
            this.adaptiveSettings.imageQuality = 0.7;
            this.adaptiveSettings.chunkSize = 35;
            break;
          case "4g":
            this.adaptiveSettings.imageQuality = 0.9;
            this.adaptiveSettings.chunkSize = 100;
            break;
        }
      };

      connection.addEventListener("change", updateNetworkOptimizations);
      updateNetworkOptimizations();
    }
  }

  setupMemoryMonitoring() {
    if ("memory" in performance) {
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
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          if (name.includes("old-") || name.includes("temp-")) {
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
    this.observers.forEach((observer) => observer.disconnect());
  }
}

// Usage example
const performanceOptimizer = new AdvancedPerformanceOptimizer();
const moduleLoader = new IntelligentModuleLoader();

// Enable predictive preloading
moduleLoader.enablePredictivePreloading();

// Get adaptive settings for components
const settings = performanceOptimizer.getOptimizedSettings();
console.log("Current adaptive settings:", settings);
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
    this.CACHE_VERSION = "v2.1.0";
    this.STATIC_CACHE = `static-${this.CACHE_VERSION}`;
    this.DYNAMIC_CACHE = `dynamic-${this.CACHE_VERSION}`;
    this.API_CACHE = `api-${this.CACHE_VERSION}`;
    this.IMAGE_CACHE = `images-${this.CACHE_VERSION}`;

    this.CACHE_STRATEGIES = {
      CACHE_FIRST: "cache-first",
      NETWORK_FIRST: "network-first",
      STALE_WHILE_REVALIDATE: "stale-while-revalidate",
      NETWORK_ONLY: "network-only",
      CACHE_ONLY: "cache-only",
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
      maxEntries: 100,
    });

    // API calls - Network First with fallback
    this.routeStrategies.set(/\/api\//, {
      strategy: this.CACHE_STRATEGIES.NETWORK_FIRST,
      cacheName: this.API_CACHE,
      maxAge: 5 * 60 * 1000, // 5 minutes
      maxEntries: 50,
      networkTimeout: 3000,
    });

    // Images - Stale While Revalidate
    this.routeStrategies.set(/\.(webp|avif|png|jpg|jpeg|gif)$/, {
      strategy: this.CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
      cacheName: this.IMAGE_CACHE,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      maxEntries: 200,
    });

    // HTML pages - Network First
    this.routeStrategies.set(/\.html$|\/$/, {
      strategy: this.CACHE_STRATEGIES.NETWORK_FIRST,
      cacheName: this.DYNAMIC_CACHE,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      maxEntries: 30,
      networkTimeout: 2000,
    });
  }

  async handleFetch(event) {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== "GET") {
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
      const cacheDate = new Date(cachedResponse.headers.get("sw-cache-date"));
      const isExpired = Date.now() - cacheDate.getTime() > config.maxAge;

      if (!isExpired) {
        this.updateCacheMetrics(config.cacheName, "hit");
        return cachedResponse;
      }
    }

    try {
      const networkResponse = await fetch(request);

      if (networkResponse.ok) {
        await this.putInCache(request, networkResponse.clone(), config);
        this.updateCacheMetrics(config.cacheName, "miss");
      }

      return networkResponse;
    } catch (error) {
      // Return stale cache if network fails
      if (cachedResponse) {
        this.updateCacheMetrics(config.cacheName, "stale");
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
          setTimeout(
            () => reject(new Error("Network timeout")),
            config.networkTimeout
          )
        ),
      ]);

      if (networkResponse.ok) {
        await this.putInCache(request, networkResponse.clone(), config);
        this.updateCacheMetrics(config.cacheName, "network");
      }

      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);

      if (cachedResponse) {
        this.updateCacheMetrics(config.cacheName, "fallback");
        return cachedResponse;
      }

      throw error;
    }
  }

  async staleWhileRevalidate(request, config) {
    const cachedResponse = await caches.match(request);

    // Always try to fetch from network in background
    const networkResponsePromise = fetch(request)
      .then((response) => {
        if (response.ok) {
          this.putInCache(request, response.clone(), config);
        }
        return response;
      })
      .catch(() => null);

    // Return cached response immediately if available
    if (cachedResponse) {
      this.updateCacheMetrics(config.cacheName, "stale");
      return cachedResponse;
    }

    // Wait for network response if no cache
    const networkResponse = await networkResponsePromise;
    if (networkResponse) {
      this.updateCacheMetrics(config.cacheName, "network");
      return networkResponse;
    }

    throw new Error("No cached response and network failed");
  }

  async putInCache(request, response, config) {
    const cache = await caches.open(config.cacheName);

    // Add cache metadata
    const responseWithMetadata = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        "sw-cache-date": new Date().toISOString(),
        "sw-cache-strategy": config.strategy,
      },
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
      await Promise.all(entriesToDelete.map((key) => cache.delete(key)));
    }
  }

  updateCacheMetrics(cacheName, type) {
    const metrics = this.cacheMetrics.get(cacheName) || {
      hits: 0,
      misses: 0,
      stale: 0,
      network: 0,
      fallback: 0,
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
      this.IMAGE_CACHE,
    ];

    const oldCaches = cacheNames.filter(
      (name) => !currentCaches.includes(name)
    );

    await Promise.all(oldCaches.map((name) => caches.delete(name)));
  }
}

// Service worker registration and lifecycle
self.addEventListener("install", (event) => {
  const sw = new AdvancedServiceWorker();

  event.waitUntil(
    (async () => {
      // Pre-cache critical resources
      const cache = await caches.open(sw.STATIC_CACHE);
      await cache.addAll([
        "/",
        "/manifest.json",
        "/offline.html",
        "/css/critical.css",
        "/js/app.js",
      ]);

      // Skip waiting to activate immediately
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
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

self.addEventListener("fetch", (event) => {
  const sw = new AdvancedServiceWorker();
  event.respondWith(sw.handleFetch(event));
});

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Process queued actions when back online
  const db = await openDB("offline-actions", 1);
  const actions = await db.getAll("actions");

  for (const action of actions) {
    try {
      await fetch(action.url, action.options);
      await db.delete("actions", action.id);
    } catch (error) {
      console.error("Failed to sync action:", error);
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
@Injectable({ providedIn: "root" })
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
      onCLS: (metric) => this.handleMetric("CLS", metric),
      onFID: (metric) => this.handleMetric("FID", metric),
      onFCP: (metric) => this.handleMetric("FCP", metric),
      onLCP: (metric) => this.handleMetric("LCP", metric),
      onTTFB: (metric) => this.handleMetric("TTFB", metric),
      onINP: (metric) => this.handleMetric("INP", metric),
    });

    // Performance Observer for detailed metrics
    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.processPerformanceEntry(entry);
      }
    });

    this.observer.observe({
      entryTypes: [
        "navigation",
        "resource",
        "paint",
        "largest-contentful-paint",
        "layout-shift",
        "long-animation-frame",
        "user-timing",
        "measure",
      ],
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
      hardwareConcurrency: navigator.hardwareConcurrency,
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
      TTFB: { warning: 800, critical: 1800 },
    };

    const threshold = thresholds[metric.name];
    if (threshold) {
      if (metric.value > threshold.critical) {
        this.alerting.sendAlert({
          level: "critical",
          metric: metric.name,
          value: metric.value,
          threshold: threshold.critical,
          url: metric.url,
        });
      } else if (metric.value > threshold.warning) {
        this.alerting.sendAlert({
          level: "warning",
          metric: metric.name,
          value: metric.value,
          threshold: threshold.warning,
          url: metric.url,
        });
      }
    }
  }

  private monitorMemoryUsage() {
    if ("memory" in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const memoryMetric = {
          name: "Memory",
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          timestamp: Date.now(),
        };

        // Alert if memory usage is high
        const memoryUsagePercent =
          (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

        if (memoryUsagePercent > 80) {
          this.alerting.sendAlert({
            level: "warning",
            metric: "Memory Usage",
            value: memoryUsagePercent,
            threshold: 80,
          });
        }

        this.analytics.track("memory-usage", memoryMetric);
      }, 30000); // Check every 30 seconds
    }
  }

  private monitorNetworkQuality() {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;

      const networkMetric = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      };

      this.analytics.track("network-quality", networkMetric);

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

        this.analytics.track("frame-rate", { fps, timestamp: currentTime });

        // Alert if FPS is consistently low
        if (fps < 30) {
          this.alerting.sendAlert({
            level: "warning",
            metric: "Frame Rate",
            value: fps,
            threshold: 30,
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
@Injectable({ providedIn: "root" })
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
    this.optimizationStrategies.set("images", {
      analyze: () => this.analyzeImagePerformance(),
      optimize: (data) => this.optimizeImages(data),
      priority: "high",
    });

    // JavaScript bundle optimization
    this.optimizationStrategies.set("bundles", {
      analyze: () => this.analyzeBundlePerformance(),
      optimize: (data) => this.optimizeBundles(data),
      priority: "high",
    });

    // CSS optimization strategy
    this.optimizationStrategies.set("css", {
      analyze: () => this.analyzeCSSPerformance(),
      optimize: (data) => this.optimizeCSS(data),
      priority: "medium",
    });

    // Font optimization strategy
    this.optimizationStrategies.set("fonts", {
      analyze: () => this.analyzeFontPerformance(),
      optimize: (data) => this.optimizeFonts(data),
      priority: "medium",
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
      if (priority > 0.7) {
        // High priority threshold
        await this.executeOptimization(strategy);
      }
    }
  }

  private async optimizeImages(analysisData: any) {
    // Implement intelligent image optimization
    const images = document.querySelectorAll("img");

    for (const img of images) {
      // Check if image is in viewport
      if (this.isInViewport(img)) {
        // Apply immediate optimizations
        await this.applyImageOptimizations(img, "immediate");
      } else {
        // Apply lazy loading optimizations
        await this.applyImageOptimizations(img, "lazy");
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
@Injectable({ providedIn: "root" })
export class PerformancePredictor {
  private model: TensorFlowModel;
  private trainingData: PerformanceDataPoint[] = [];

  constructor() {
    this.initializeModel();
  }

  private async initializeModel() {
    // Load pre-trained model or create new one
    try {
      this.model = await tf.loadLayersModel(
        "/assets/models/performance-model.json"
      );
    } catch {
      this.model = this.createNewModel();
    }
  }

  private createNewModel(): tf.Sequential {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [10], units: 64, activation: "relu" }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: "relu" }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 16, activation: "relu" }),
        tf.layers.dense({ units: 1, activation: "linear" }),
      ],
    });

    model.compile({
      optimizer: "adam",
      loss: "meanSquaredError",
      metrics: ["mae"],
    });

    return model;
  }

  async predictPerformance(
    context: PerformanceContext
  ): Promise<PerformancePrediction> {
    const features = this.extractFeatures(context);
    const prediction = this.model.predict(tf.tensor2d([features])) as tf.Tensor;
    const result = await prediction.data();

    return {
      expectedLCP: result[0],
      confidence: this.calculateConfidence(features),
      recommendations: this.generateRecommendations(features, result[0]),
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
      context.viewportHeight,
    ];
  }

  private generateRecommendations(
    features: number[],
    predictedLCP: number
  ): PerformanceRecommendation[] {
    const recommendations: PerformanceRecommendation[] = [];

    if (predictedLCP > 2500) {
      if (features[1] > 1000000) {
        // Large total resource size
        recommendations.push({
          type: "resource-optimization",
          priority: "high",
          description: "Reduce total resource size",
          expectedImprovement: 800,
        });
      }

      if (features[2] > 10) {
        // Many images
        recommendations.push({
          type: "image-optimization",
          priority: "high",
          description: "Optimize images and implement lazy loading",
          expectedImprovement: 600,
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
    this.cacheStrategies.set("critical", {
      strategy: "cache-first",
      maxAge: 86400000, // 24 hours
      updateStrategy: "background-sync",
      priority: "high",
    });

    // API responses - Stale While Revalidate
    this.cacheStrategies.set("api", {
      strategy: "stale-while-revalidate",
      maxAge: 300000, // 5 minutes
      updateStrategy: "immediate",
      priority: "medium",
    });

    // Static assets - Cache First with versioning
    this.cacheStrategies.set("static", {
      strategy: "cache-first",
      maxAge: 31536000000, // 1 year
      updateStrategy: "version-based",
      priority: "low",
    });

    // Dynamic content - Network First with Cache Fallback
    this.cacheStrategies.set("dynamic", {
      strategy: "network-first",
      maxAge: 60000, // 1 minute
      updateStrategy: "conditional",
      priority: "medium",
    });
  }

  async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const cacheKey = this.generateCacheKey(request);
    const strategy = this.determineCacheStrategy(url);

    // Track request for analytics
    this.performanceMetrics.trackRequest(request);

    switch (strategy.strategy) {
      case "cache-first":
        return this.cacheFirstStrategy(request, cacheKey, strategy);
      case "network-first":
        return this.networkFirstStrategy(request, cacheKey, strategy);
      case "stale-while-revalidate":
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
    const cache = await caches.open("intelligent-cache-v1");
    const cachedResponse = await cache.match(cacheKey);

    if (
      cachedResponse &&
      !this.isCacheExpired(cachedResponse, strategy.maxAge)
    ) {
      // Update cache in background if needed
      if (strategy.updateStrategy === "background-sync") {
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
    const cache = await caches.open("intelligent-cache-v1");
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
    const relevantParams = ["version", "locale", "theme"];
    const params = new URLSearchParams();

    for (const param of relevantParams) {
      if (url.searchParams.has(param)) {
        params.set(param, url.searchParams.get(param)!);
      }
    }

    return `${url.pathname}${params.toString() ? "?" + params.toString() : ""}`;
  }

  private enhanceResponseWithMetadata(
    response: Response,
    strategy: CacheStrategy
  ): Response {
    const headers = new Headers(response.headers);
    headers.set("sw-cached-at", Date.now().toString());
    headers.set("sw-cache-strategy", strategy.strategy);
    headers.set("sw-max-age", strategy.maxAge.toString());

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }
}
```

2. **Edge Computing Optimization:**

```typescript
// Edge computing service for global performance
@Injectable({ providedIn: "root" })
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
    this.edgeNodes.set("us-east-1", {
      region: "us-east-1",
      capabilities: ["image-optimization", "html-minification", "gzip"],
      latency: 50,
      load: 0.3,
    });

    this.edgeNodes.set("eu-west-1", {
      region: "eu-west-1",
      capabilities: ["image-optimization", "css-optimization", "brotli"],
      latency: 45,
      load: 0.2,
    });

    this.edgeNodes.set("ap-southeast-1", {
      region: "ap-southeast-1",
      capabilities: ["image-optimization", "js-minification"],
      latency: 60,
      load: 0.4,
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
      estimatedImprovement: this.calculateExpectedImprovement(optimizations),
    };
  }

  private selectOptimalEdgeNode(userLocation: UserLocation): EdgeNode {
    let bestNode: EdgeNode | null = null;
    let bestScore = Infinity;

    for (const [_, node] of this.edgeNodes) {
      // Calculate distance-based latency
      const distance = this.calculateDistance(userLocation, node.region);
      const estimatedLatency = node.latency + distance * 0.1;

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
      if (edgeNode.capabilities.includes("image-optimization")) {
        optimizations.push({
          type: "image-optimization",
          parameters: {
            format: "webp",
            quality: 85,
            progressive: true,
          },
          expectedSavings: 0.4, // 40% size reduction
        });
      }
    }

    // JavaScript optimization
    if (url.pathname.match(/\.js$/i)) {
      if (edgeNode.capabilities.includes("js-minification")) {
        optimizations.push({
          type: "js-minification",
          parameters: {
            removeComments: true,
            removeWhitespace: true,
            mangleNames: true,
          },
          expectedSavings: 0.3,
        });
      }
    }

    // CSS optimization
    if (url.pathname.match(/\.css$/i)) {
      if (edgeNode.capabilities.includes("css-optimization")) {
        optimizations.push({
          type: "css-optimization",
          parameters: {
            removeUnusedRules: true,
            minify: true,
            autoprefixer: true,
          },
          expectedSavings: 0.25,
        });
      }
    }

    // Compression optimization
    if (edgeNode.capabilities.includes("brotli")) {
      optimizations.push({
        type: "compression",
        parameters: {
          algorithm: "brotli",
          level: 6,
        },
        expectedSavings: 0.2,
      });
    } else if (edgeNode.capabilities.includes("gzip")) {
      optimizations.push({
        type: "compression",
        parameters: {
          algorithm: "gzip",
          level: 6,
        },
        expectedSavings: 0.15,
      });
    }

    return optimizations;
  }
}
```

3. **Adaptive Performance Strategies:**

```typescript
// Adaptive performance manager
@Injectable({ providedIn: "root" })
export class AdaptivePerformanceManager {
  private currentStrategy: PerformanceStrategy = "balanced";
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
      connection: (navigator as any).connection?.effectiveType || "4g",
    };

    // Adapt strategy based on capabilities
    this.adaptStrategy();

    // Listen for network changes
    if ("connection" in navigator) {
      (navigator as any).connection.addEventListener("change", () => {
        this.adaptStrategy();
      });
    }
  }

  private adaptStrategy() {
    const score = this.calculateDeviceScore();

    if (score >= 8) {
      this.currentStrategy = "aggressive";
      this.applyAggressiveOptimizations();
    } else if (score >= 5) {
      this.currentStrategy = "balanced";
      this.applyBalancedOptimizations();
    } else {
      this.currentStrategy = "conservative";
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
    const networkScores = { "slow-2g": 0, "2g": 1, "3g": 2, "4g": 3, "5g": 4 };
    score += networkScores[this.deviceCapabilities.connection] || 2;

    return score;
  }

  private applyAggressiveOptimizations() {
    // Enable all optimizations for high-end devices
    this.enableFeature("predictive-preloading");
    this.enableFeature("advanced-image-optimization");
    this.enableFeature("background-processing");
    this.enableFeature("advanced-caching");
    this.enableFeature("real-time-analytics");
  }

  private applyBalancedOptimizations() {
    // Enable moderate optimizations
    this.enableFeature("basic-preloading");
    this.enableFeature("standard-image-optimization");
    this.enableFeature("standard-caching");
    this.disableFeature("background-processing");
    this.enableFeature("basic-analytics");
  }

  private applyConservativeOptimizations() {
    // Minimal optimizations for low-end devices
    this.disableFeature("predictive-preloading");
    this.enableFeature("basic-image-optimization");
    this.disableFeature("background-processing");
    this.enableFeature("minimal-caching");
    this.disableFeature("real-time-analytics");
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
