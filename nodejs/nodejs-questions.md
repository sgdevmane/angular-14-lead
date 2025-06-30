# Node.js Interview Questions

## Table of Contents
1. [Node.js Fundamentals](#nodejs-fundamentals)
2. [Event Loop and Asynchronous Programming](#event-loop-and-asynchronous-programming)
3. [Modules and NPM](#modules-and-npm)
4. [Express.js Framework](#expressjs-framework)
5. [Database Integration](#database-integration)
6. [Authentication and Security](#authentication-and-security)
7. [Performance and Optimization](#performance-and-optimization)
8. [Testing and Deployment](#testing-and-deployment)

---

## Node.js Fundamentals

### Q1: What is Node.js and what are its key features?
**Difficulty: Easy**

**Answer:**
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript on the server-side. It enables developers to use JavaScript for both frontend and backend development.

**Key Features:**

1. **Non-blocking I/O**: Asynchronous, event-driven architecture
2. **Single-threaded Event Loop**: Handles multiple concurrent operations efficiently
3. **Cross-platform**: Runs on Windows, macOS, and Linux
4. **NPM Ecosystem**: Largest package repository in the world
5. **Fast Execution**: Built on Google's V8 engine
6. **Scalable**: Ideal for building scalable network applications
7. **Real-time Applications**: Perfect for chat apps, gaming, collaboration tools

```javascript
// Basic Node.js HTTP Server
const http = require('http');
const url = require('url');
const querystring = require('querystring');

/**
 * Creates a simple HTTP server that handles different routes
 * and demonstrates basic Node.js concepts
 */
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  const query = parsedUrl.query;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Route handling
  switch (path) {
    case '/':
      handleHome(req, res);
      break;
    case '/api/users':
      handleUsers(req, res, method);
      break;
    case '/api/health':
      handleHealthCheck(req, res);
      break;
    default:
      handle404(req, res);
  }
});

/**
 * Handles the home route
 */
function handleHome(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Welcome to Node.js API',
    version: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  }));
}

/**
 * Handles user-related operations
 */
function handleUsers(req, res, method) {
  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator' }
  ];
  
  switch (method) {
    case 'GET':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        data: users,
        count: users.length
      }));
      break;
      
    case 'POST':
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const userData = JSON.parse(body);
          const newUser = {
            id: users.length + 1,
            ...userData,
            createdAt: new Date().toISOString()
          };
          
          users.push(newUser);
          
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: 'User created successfully',
            data: newUser
          }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            error: 'Invalid JSON data'
          }));
        }
      });
      break;
      
    default:
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Method not allowed'
      }));
  }
}

/**
 * Handles health check endpoint
 */
function handleHealthCheck(req, res) {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    version: process.version,
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(healthData));
}

/**
 * Handles 404 errors
 */
function handle404(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    error: 'Route not found',
    path: req.url,
    method: req.method
  }));
}

// Server configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  console.log(`📊 Process ID: ${process.pid}`);
  console.log(`🔧 Node.js Version: ${process.version}`);
  console.log(`💻 Platform: ${process.platform}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = server;
```

**Advantages of Node.js:**
- **JavaScript Everywhere**: Same language for frontend and backend
- **High Performance**: Non-blocking I/O operations
- **Rapid Development**: Large ecosystem and active community
- **Scalability**: Handles thousands of concurrent connections
- **Real-time Applications**: WebSocket support, event-driven architecture
- **Microservices**: Lightweight and modular architecture

**Use Cases:**
- REST APIs and GraphQL servers
- Real-time applications (chat, gaming, collaboration)
- Microservices architecture
- IoT applications
- Command-line tools
- Desktop applications (with Electron)

---

### Q2: Explain the difference between Node.js and traditional server-side technologies.
**Difficulty: Medium**

**Answer:**
Node.js differs significantly from traditional server-side technologies in its architecture, execution model, and approach to handling concurrent requests.

**Traditional Server-Side Technologies (PHP, Java, .NET, Python):**

```php
<?php
// Traditional PHP approach - blocking I/O
function getUserData($userId) {
    // Database query - blocks until complete
    $user = mysqli_query($connection, "SELECT * FROM users WHERE id = $userId");
    
    // File read - blocks until complete
    $userPrefs = file_get_contents("/data/user_$userId.json");
    
    // API call - blocks until complete
    $userStats = file_get_contents("https://api.example.com/stats/$userId");
    
    return [
        'user' => $user,
        'preferences' => json_decode($userPrefs),
        'stats' => json_decode($userStats)
    ];
}

// Each request creates a new thread/process
// Memory usage: ~2-8MB per request
// Concurrent requests limited by available threads
?>
```

**Node.js Approach:**

```javascript
const fs = require('fs').promises;
const mysql = require('mysql2/promise');
const axios = require('axios');

/**
 * Node.js approach - non-blocking I/O with async/await
 * All operations run concurrently without blocking the event loop
 */
async function getUserData(userId) {
  try {
    // All operations start simultaneously (non-blocking)
    const [user, userPrefs, userStats] = await Promise.all([
      // Database query - non-blocking
      getUserFromDatabase(userId),
      
      // File read - non-blocking
      fs.readFile(`/data/user_${userId}.json`, 'utf8'),
      
      // API call - non-blocking
      axios.get(`https://api.example.com/stats/${userId}`)
    ]);
    
    return {
      user: user[0],
      preferences: JSON.parse(userPrefs),
      stats: userStats.data
    };
  } catch (error) {
    throw new Error(`Failed to get user data: ${error.message}`);
  }
}

/**
 * Database connection with connection pooling
 */
const dbPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Non-blocking database query
 */
async function getUserFromDatabase(userId) {
  const connection = await dbPool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [userId]
    );
    return rows;
  } finally {
    connection.release();
  }
}

/**
 * Express.js server handling concurrent requests
 */
const express = require('express');
const app = express();

app.use(express.json());

// Middleware for request logging
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📥 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`📤 ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// Non-blocking route handler
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // This doesn't block other requests
    const userData = await getUserData(userId);
    
    res.json({
      success: true,
      data: userData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Simulate CPU-intensive task (should be avoided or offloaded)
app.get('/api/heavy-computation/:number', (req, res) => {
  const number = parseInt(req.params.number);
  
  // Bad: This blocks the event loop
  // const result = fibonacci(number);
  
  // Good: Use worker threads for CPU-intensive tasks
  const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
  
  if (isMainThread) {
    const worker = new Worker(__filename, {
      workerData: { number }
    });
    
    worker.on('message', (result) => {
      res.json({
        success: true,
        input: number,
        result: result,
        computedAt: new Date().toISOString()
      });
    });
    
    worker.on('error', (error) => {
      res.status(500).json({
        success: false,
        error: error.message
      });
    });
  } else {
    // Worker thread computation
    const fibonacci = (n) => {
      if (n < 2) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };
    
    const result = fibonacci(workerData.number);
    parentPort.postMessage(result);
  }
});

// Memory usage: ~10-20MB total for entire application
// Can handle thousands of concurrent connections
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Node.js server running on port ${PORT}`);
  console.log(`💾 Memory usage: ${JSON.stringify(process.memoryUsage(), null, 2)}`);
});
```

**Key Differences:**

| Aspect | Traditional (PHP/Java/.NET) | Node.js |
|--------|----------------------------|----------|
| **Threading Model** | Multi-threaded (one thread per request) | Single-threaded with event loop |
| **I/O Operations** | Blocking (synchronous) | Non-blocking (asynchronous) |
| **Memory Usage** | High (2-8MB per request) | Low (10-20MB total) |
| **Concurrency** | Limited by thread pool | Thousands of connections |
| **CPU-Intensive Tasks** | Handled well | Blocks event loop (use workers) |
| **Scalability** | Vertical scaling preferred | Horizontal scaling natural |
| **Development Speed** | Moderate | Fast (JavaScript everywhere) |

**Performance Comparison Example:**

```javascript
// Performance testing script
const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`🎯 Master process ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`💀 Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart worker
  });
} else {
  // Worker process
  const server = http.createServer(async (req, res) => {
    const start = process.hrtime.bigint();
    
    // Simulate database query (non-blocking)
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Simulate file I/O (non-blocking)
    await new Promise(resolve => setTimeout(resolve, 5));
    
    // Simulate API call (non-blocking)
    await new Promise(resolve => setTimeout(resolve, 15));
    
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1000000; // Convert to milliseconds
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Request processed',
      worker: process.pid,
      duration: `${duration.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    }));
  });
  
  server.listen(3000, () => {
    console.log(`🔧 Worker ${process.pid} started`);
  });
}

// Load testing with autocannon:
// npm install -g autocannon
// autocannon -c 100 -d 30 http://localhost:3000
// Results: ~50,000+ requests/second with minimal memory usage
```

**When to Choose Node.js:**
- **I/O-intensive applications**: APIs, real-time apps, microservices
- **Rapid prototyping**: Quick development cycles
- **JavaScript team**: Leverage existing JS skills
- **Real-time features**: WebSockets, Server-Sent Events
- **Microservices**: Lightweight, fast startup

**When to Choose Traditional Technologies:**
- **CPU-intensive applications**: Complex calculations, data processing
- **Enterprise applications**: Mature ecosystems, enterprise support
- **Team expertise**: Existing knowledge in specific technologies
- **Regulatory requirements**: Specific compliance needs
- **Legacy system integration**: Existing infrastructure

**Best Practices for Node.js:**
- Use async/await for cleaner asynchronous code
- Implement proper error handling and logging
- Use clustering for CPU-bound tasks
- Monitor memory usage and prevent leaks
- Implement graceful shutdown procedures
- Use worker threads for CPU-intensive operations
- Implement proper security measures
- Use connection pooling for databases

---

## Event Loop and Asynchronous Programming

### Q3: Explain the Node.js Event Loop and how it works.
**Difficulty: Hard**

**Answer:**
The Event Loop is the heart of Node.js's non-blocking I/O model. It's a single-threaded loop that handles asynchronous operations by delegating them to the system and processing their callbacks when they complete.

**Event Loop Architecture:**

```javascript
/**
 * Event Loop Phases Demonstration
 * This example shows how different types of operations are handled
 * in different phases of the event loop
 */

const fs = require('fs');
const crypto = require('crypto');

console.log('🚀 Script start');

// 1. Timer Phase - setTimeout/setInterval callbacks
setTimeout(() => {
  console.log('⏰ Timer 1 (0ms)');
}, 0);

setTimeout(() => {
  console.log('⏰ Timer 2 (1ms)');
}, 1);

// 2. I/O Phase - File system, network operations
fs.readFile(__filename, () => {
  console.log('📁 File read complete');
  
  // These will be executed in the next iteration
  setTimeout(() => {
    console.log('⏰ Timer inside I/O callback');
  }, 0);
  
  setImmediate(() => {
    console.log('⚡ setImmediate inside I/O callback');
  });
});

// 3. Check Phase - setImmediate callbacks
setImmediate(() => {
  console.log('⚡ setImmediate 1');
});

setImmediate(() => {
  console.log('⚡ setImmediate 2');
});

// 4. Process.nextTick - Highest priority
process.nextTick(() => {
  console.log('🔄 nextTick 1');
  
  // nextTick callbacks can add more nextTick callbacks
  process.nextTick(() => {
    console.log('🔄 nextTick inside nextTick');
  });
});

process.nextTick(() => {
  console.log('🔄 nextTick 2');
});

// 5. Promise microtasks - High priority
Promise.resolve().then(() => {
  console.log('✅ Promise 1');
  return Promise.resolve();
}).then(() => {
  console.log('✅ Promise 2');
});

Promise.resolve().then(() => {
  console.log('✅ Promise 3');
});

console.log('📝 Script end');

/**
 * Expected Output Order:
 * 🚀 Script start
 * 📝 Script end
 * 🔄 nextTick 1
 * 🔄 nextTick 2
 * 🔄 nextTick inside nextTick
 * ✅ Promise 1
 * ✅ Promise 3
 * ✅ Promise 2
 * ⏰ Timer 1 (0ms)
 * ⚡ setImmediate 1
 * ⚡ setImmediate 2
 * ⏰ Timer 2 (1ms)
 * 📁 File read complete
 * ⚡ setImmediate inside I/O callback
 * ⏰ Timer inside I/O callback
 */
```

**Detailed Event Loop Implementation:**

```javascript
/**
 * Event Loop Simulator - Educational purposes
 * This demonstrates how the event loop processes different types of callbacks
 */
class EventLoopSimulator {
  constructor() {
    this.timerQueue = [];
    this.ioQueue = [];
    this.immediateQueue = [];
    this.nextTickQueue = [];
    this.promiseQueue = [];
    this.isRunning = false;
  }
  
  /**
   * Simulates setTimeout
   */
  setTimeout(callback, delay) {
    const executeAt = Date.now() + delay;
    this.timerQueue.push({ callback, executeAt });
    this.timerQueue.sort((a, b) => a.executeAt - b.executeAt);
  }
  
  /**
   * Simulates setImmediate
   */
  setImmediate(callback) {
    this.immediateQueue.push(callback);
  }
  
  /**
   * Simulates process.nextTick
   */
  nextTick(callback) {
    this.nextTickQueue.push(callback);
  }
  
  /**
   * Simulates Promise resolution
   */
  resolvePromise(callback) {
    this.promiseQueue.push(callback);
  }
  
  /**
   * Simulates I/O operation completion
   */
  completeIO(callback) {
    this.ioQueue.push(callback);
  }
  
  /**
   * Processes microtasks (nextTick and Promises)
   */
  processMicrotasks() {
    // Process all nextTick callbacks first
    while (this.nextTickQueue.length > 0) {
      const callback = this.nextTickQueue.shift();
      try {
        callback();
      } catch (error) {
        console.error('Error in nextTick callback:', error);
      }
    }
    
    // Process all Promise callbacks
    while (this.promiseQueue.length > 0) {
      const callback = this.promiseQueue.shift();
      try {
        callback();
      } catch (error) {
        console.error('Error in Promise callback:', error);
      }
    }
  }
  
  /**
   * Main event loop iteration
   */
  tick() {
    const now = Date.now();
    
    // 1. Timer Phase
    while (this.timerQueue.length > 0 && this.timerQueue[0].executeAt <= now) {
      const { callback } = this.timerQueue.shift();
      try {
        callback();
      } catch (error) {
        console.error('Error in timer callback:', error);
      }
      this.processMicrotasks();
    }
    
    // 2. I/O Phase
    const ioCallbacksToProcess = this.ioQueue.splice(0);
    for (const callback of ioCallbacksToProcess) {
      try {
        callback();
      } catch (error) {
        console.error('Error in I/O callback:', error);
      }
      this.processMicrotasks();
    }
    
    // 3. Check Phase (setImmediate)
    const immediateCallbacksToProcess = this.immediateQueue.splice(0);
    for (const callback of immediateCallbacksToProcess) {
      try {
        callback();
      } catch (error) {
        console.error('Error in immediate callback:', error);
      }
      this.processMicrotasks();
    }
  }
  
  /**
   * Starts the event loop
   */
  start() {
    this.isRunning = true;
    
    const loop = () => {
      if (!this.isRunning) return;
      
      this.tick();
      
      // Schedule next iteration
      if (this.hasWork()) {
        setImmediate(loop);
      } else {
        this.isRunning = false;
        console.log('Event loop finished - no more work');
      }
    };
    
    // Process initial microtasks
    this.processMicrotasks();
    
    // Start the loop
    setImmediate(loop);
  }
  
  /**
   * Checks if there's work to be done
   */
  hasWork() {
    return this.timerQueue.length > 0 ||
           this.ioQueue.length > 0 ||
           this.immediateQueue.length > 0 ||
           this.nextTickQueue.length > 0 ||
           this.promiseQueue.length > 0;
  }
  
  /**
   * Stops the event loop
   */
  stop() {
    this.isRunning = false;
  }
}

// Example usage of the simulator
const simulator = new EventLoopSimulator();

console.log('🎬 Starting event loop simulation');

simulator.setTimeout(() => console.log('⏰ Timer 1'), 10);
simulator.setTimeout(() => console.log('⏰ Timer 2'), 5);
simulator.setImmediate(() => console.log('⚡ Immediate 1'));
simulator.nextTick(() => console.log('🔄 NextTick 1'));
simulator.resolvePromise(() => console.log('✅ Promise 1'));
simulator.completeIO(() => console.log('📁 I/O 1'));

simulator.start();
```

**Real-world Event Loop Monitoring:**

```javascript
/**
 * Event Loop Monitoring and Performance Analysis
 */
const EventEmitter = require('events');
const perf_hooks = require('perf_hooks');

class EventLoopMonitor extends EventEmitter {
  constructor(options = {}) {
    super();
    this.sampleInterval = options.sampleInterval || 1000;
    this.lagThreshold = options.lagThreshold || 10;
    this.isMonitoring = false;
    this.stats = {
      samples: 0,
      totalLag: 0,
      maxLag: 0,
      minLag: Infinity,
      avgLag: 0
    };
  }
  
  /**
   * Starts monitoring the event loop lag
   */
  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    console.log('📊 Starting event loop monitoring...');
    
    this.monitorLoop();
  }
  
  /**
   * Monitors event loop lag
   */
  monitorLoop() {
    if (!this.isMonitoring) return;
    
    const start = process.hrtime.bigint();
    
    setImmediate(() => {
      const lag = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
      
      this.updateStats(lag);
      
      if (lag > this.lagThreshold) {
        this.emit('lag', {
          lag,
          timestamp: new Date().toISOString(),
          memoryUsage: process.memoryUsage(),
          cpuUsage: process.cpuUsage()
        });
      }
      
      // Schedule next measurement
      setTimeout(() => this.monitorLoop(), this.sampleInterval);
    });
  }
  
  /**
   * Updates lag statistics
   */
  updateStats(lag) {
    this.stats.samples++;
    this.stats.totalLag += lag;
    this.stats.maxLag = Math.max(this.stats.maxLag, lag);
    this.stats.minLag = Math.min(this.stats.minLag, lag);
    this.stats.avgLag = this.stats.totalLag / this.stats.samples;
  }
  
  /**
   * Gets current statistics
   */
  getStats() {
    return {
      ...this.stats,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage()
    };
  }
  
  /**
   * Stops monitoring
   */
  stop() {
    this.isMonitoring = false;
    console.log('🛑 Event loop monitoring stopped');
  }
}

// Usage example
const monitor = new EventLoopMonitor({ lagThreshold: 5 });

monitor.on('lag', (data) => {
  console.warn(`⚠️  Event loop lag detected: ${data.lag.toFixed(2)}ms`);
  console.warn(`   Memory: ${JSON.stringify(data.memoryUsage)}`);
});

monitor.start();

// Simulate some work that might block the event loop
function simulateWork() {
  console.log('💼 Starting work simulation...');
  
  // Good: Non-blocking I/O
  fs.readFile(__filename, (err, data) => {
    if (err) throw err;
    console.log('📖 File read completed (non-blocking)');
  });
  
  // Good: Asynchronous operation
  setTimeout(() => {
    console.log('⏰ Async timer completed');
  }, 100);
  
  // Bad: CPU-intensive synchronous operation (blocks event loop)
  setTimeout(() => {
    console.log('🔥 Starting CPU-intensive task...');
    const start = Date.now();
    
    // This will block the event loop
    while (Date.now() - start < 50) {
      // Simulate CPU work
      Math.random();
    }
    
    console.log('✅ CPU-intensive task completed');
  }, 2000);
  
  // Better: Use worker threads for CPU-intensive tasks
  setTimeout(() => {
    const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
    
    if (isMainThread) {
      console.log('🧵 Starting worker thread for CPU task...');
      
      const worker = new Worker(__filename, {
        workerData: { task: 'cpu-intensive' }
      });
      
      worker.on('message', (result) => {
        console.log('✅ Worker thread completed:', result);
      });
      
      worker.on('error', (error) => {
        console.error('❌ Worker thread error:', error);
      });
    } else {
      // Worker thread code
      if (workerData.task === 'cpu-intensive') {
        const start = Date.now();
        
        // CPU-intensive work in worker thread
        while (Date.now() - start < 100) {
          Math.random();
        }
        
        parentPort.postMessage({
          duration: Date.now() - start,
          result: 'CPU task completed in worker'
        });
      }
    }
  }, 4000);
}

// Start the simulation
setTimeout(simulateWork, 1000);

// Display stats every 5 seconds
setInterval(() => {
  const stats = monitor.getStats();
  console.log('\n📈 Event Loop Stats:');
  console.log(`   Samples: ${stats.samples}`);
  console.log(`   Avg Lag: ${stats.avgLag.toFixed(2)}ms`);
  console.log(`   Max Lag: ${stats.maxLag.toFixed(2)}ms`);
  console.log(`   Min Lag: ${stats.minLag.toFixed(2)}ms`);
  console.log(`   Memory RSS: ${(stats.memoryUsage.rss / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Uptime: ${stats.uptime.toFixed(2)}s\n`);
}, 5000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  monitor.stop();
  process.exit(0);
});
```

**Event Loop Best Practices:**

```javascript
/**
 * Best Practices for Event Loop Optimization
 */

// 1. Avoid blocking the event loop with synchronous operations
class EventLoopBestPractices {
  
  /**
   * BAD: Synchronous file operations block the event loop
   */
  static badFileHandling() {
    const fs = require('fs');
    
    try {
      // This blocks the event loop
      const data = fs.readFileSync('large-file.txt', 'utf8');
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * GOOD: Asynchronous file operations don't block
   */
  static async goodFileHandling() {
    const fs = require('fs').promises;
    
    try {
      // This doesn't block the event loop
      const data = await fs.readFile('large-file.txt', 'utf8');
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * BAD: Large synchronous loops block the event loop
   */
  static badLargeLoop() {
    const results = [];
    
    // This blocks the event loop
    for (let i = 0; i < 10000000; i++) {
      results.push(Math.random() * i);
    }
    
    return results;
  }
  
  /**
   * GOOD: Break large operations into chunks
   */
  static async goodLargeLoop() {
    const results = [];
    const chunkSize = 10000;
    const totalItems = 10000000;
    
    for (let i = 0; i < totalItems; i += chunkSize) {
      const chunk = [];
      const end = Math.min(i + chunkSize, totalItems);
      
      // Process chunk
      for (let j = i; j < end; j++) {
        chunk.push(Math.random() * j);
      }
      
      results.push(...chunk);
      
      // Yield control back to event loop
      await new Promise(resolve => setImmediate(resolve));
    }
    
    return results;
  }
  
  /**
   * GOOD: Use worker threads for CPU-intensive tasks
   */
  static async cpuIntensiveWithWorker(data) {
    const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
    
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { task: 'process-data', data }
      });
      
      worker.on('message', resolve);
      worker.on('error', reject);
      
      setTimeout(() => {
        worker.terminate();
        reject(new Error('Worker timeout'));
      }, 30000); // 30 second timeout
    });
  }
  
  /**
   * GOOD: Proper error handling doesn't crash the event loop
   */
  static async safeAsyncOperation() {
    try {
      const result = await this.riskyOperation();
      return result;
    } catch (error) {
      console.error('Operation failed:', error.message);
      // Log error but don't crash
      return null;
    }
  }
  
  static async riskyOperation() {
    // Simulate an operation that might fail
    if (Math.random() < 0.3) {
      throw new Error('Random failure');
    }
    return 'Success';
  }
  
  /**
   * GOOD: Implement backpressure for high-load scenarios
   */
  static createRateLimitedProcessor(maxConcurrent = 10) {
    let activeOperations = 0;
    const queue = [];
    
    return async function processWithLimit(operation) {
      return new Promise((resolve, reject) => {
        queue.push({ operation, resolve, reject });
        processQueue();
      });
    };
    
    async function processQueue() {
      if (activeOperations >= maxConcurrent || queue.length === 0) {
        return;
      }
      
      activeOperations++;
      const { operation, resolve, reject } = queue.shift();
      
      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        activeOperations--;
        // Process next item in queue
        setImmediate(processQueue);
      }
    }
  }
}

// Example usage
async function demonstrateBestPractices() {
  console.log('🎯 Demonstrating Event Loop Best Practices\n');
  
  // 1. Asynchronous file handling
  console.log('📁 Testing file operations...');
  const start1 = Date.now();
  await EventLoopBestPractices.goodFileHandling().catch(() => {
    console.log('File not found, but event loop not blocked');
  });
  console.log(`   Async file operation: ${Date.now() - start1}ms\n`);
  
  // 2. Chunked processing
  console.log('🔄 Testing large loop processing...');
  const start2 = Date.now();
  await EventLoopBestPractices.goodLargeLoop();
  console.log(`   Chunked processing: ${Date.now() - start2}ms\n`);
  
  // 3. Rate-limited processing
  console.log('⚡ Testing rate-limited processing...');
  const processor = EventLoopBestPractices.createRateLimitedProcessor(5);
  
  const operations = Array.from({ length: 20 }, (_, i) => 
    () => new Promise(resolve => 
      setTimeout(() => resolve(`Operation ${i + 1}`), Math.random() * 100)
    )
  );
  
  const start3 = Date.now();
  const results = await Promise.all(
    operations.map(op => processor(op))
  );
  console.log(`   Rate-limited processing (20 ops, max 5 concurrent): ${Date.now() - start3}ms`);
  console.log(`   Results: ${results.slice(0, 3).join(', ')}...\n`);
}

// Run the demonstration
demonstrateBestPractices().catch(console.error);
```

**Key Takeaways:**
- The event loop is single-threaded but handles concurrency through non-blocking I/O
- Microtasks (nextTick, Promises) have higher priority than macrotasks (timers, I/O)
- Blocking operations should be avoided or moved to worker threads
- Monitor event loop lag in production applications
- Use proper error handling to prevent crashes
- Implement backpressure for high-load scenarios

---

This comprehensive Node.js guide covers fundamental concepts with detailed explanations and practical examples, focusing on real-world scenarios and best practices for building scalable server-side applications.