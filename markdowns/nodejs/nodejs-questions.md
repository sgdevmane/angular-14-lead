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

### Q4: What are Streams in Node.js and how do you use them?
**Difficulty: Medium**

**Answer:**
Streams are one of the fundamental concepts in Node.js that allow you to process data piece by piece (chunks), without loading the entire data into memory. This makes streams highly memory-efficient when working with large amounts of data.

**Types of Streams:**

1. **Readable Streams**: Sources from which data can be consumed
2. **Writable Streams**: Destinations to which data can be written
3. **Duplex Streams**: Both readable and writable
4. **Transform Streams**: Duplex streams that can modify or transform data

```javascript
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const { pipeline } = require('stream');

/**
 * Example 1: Basic file reading with streams
 */
function basicReadStream() {
  const readStream = fs.createReadStream('large-file.txt', {
    encoding: 'utf8',
    highWaterMark: 64 * 1024 // 64KB chunks
  });
  
  let dataSize = 0;
  
  readStream.on('data', (chunk) => {
    dataSize += chunk.length;
    console.log(`Received ${chunk.length} bytes of data`);
    // Process chunk here
  });
  
  readStream.on('end', () => {
    console.log(`Finished reading ${dataSize} bytes of data`);
  });
  
  readStream.on('error', (err) => {
    console.error('Error reading file:', err);
  });
}

/**
 * Example 2: File copy with streams
 */
function copyFileWithStreams(source, destination) {
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);
  
  // Pipe automatically handles backpressure
  readStream.pipe(writeStream);
  
  writeStream.on('finish', () => {
    console.log(`File copied from ${source} to ${destination}`);
  });
  
  writeStream.on('error', (err) => {
    console.error('Error writing file:', err);
  });
}

/**
 * Example 3: Chaining streams for complex operations
 */
function compressAndEncryptFile(inputFile, outputFile, password) {
  const readStream = fs.createReadStream(inputFile);
  const gzipStream = zlib.createGzip();
  const encryptStream = crypto.createCipheriv('aes-256-gcm', password, crypto.randomBytes(16));
  const writeStream = fs.createWriteStream(outputFile);
  
  // Using pipeline for better error handling
  pipeline(
    readStream,
    gzipStream,
    encryptStream,
    writeStream,
    (err) => {
      if (err) {
        console.error('Pipeline failed:', err);
      } else {
        console.log('Pipeline succeeded');
      }
    }
  );
}

/**
 * Example 4: Creating a custom transform stream
 */
function createCustomTransform() {
  const { Transform } = require('stream');
  
  class UppercaseTransform extends Transform {
    constructor(options) {
      super(options);
    }
    
    _transform(chunk, encoding, callback) {
      // Convert chunk to uppercase
      const upperChunk = chunk.toString().toUpperCase();
      this.push(upperChunk);
      callback();
    }
  }
  
  const uppercaseTransform = new UppercaseTransform();
  
  process.stdin
    .pipe(uppercaseTransform)
    .pipe(process.stdout);
}

/**
 * Example 5: Handling backpressure
 */
function handleBackpressure() {
  const readStream = fs.createReadStream('large-file.txt');
  const writeStream = fs.createWriteStream('output.txt');
  
  readStream.on('data', (chunk) => {
    // Check if the internal buffer is full
    const canContinue = writeStream.write(chunk);
    
    if (!canContinue) {
      console.log('Backpressure! Pausing reading');
      readStream.pause();
      
      writeStream.once('drain', () => {
        console.log('Buffer drained, resuming reading');
        readStream.resume();
      });
    }
  });
  
  readStream.on('end', () => {
    writeStream.end();
    console.log('Reading and writing complete');
  });
}
```

**Stream Events:**

- **data**: Emitted when data is available to be read
- **end**: Emitted when there is no more data to be read
- **error**: Emitted when an error occurs
- **finish**: Emitted when all data has been flushed to the underlying system (Writable)
- **drain**: Emitted when the write buffer becomes empty (Writable)
- **pipe**: Emitted when the stream.pipe() method is called (Readable)

**Benefits of Streams:**

1. **Memory Efficiency**: Process large files without loading them entirely into memory
2. **Time Efficiency**: Start processing data as soon as it's available
3. **Composability**: Chain multiple stream operations together
4. **Backpressure Handling**: Automatic throttling when the consumer is slower than the producer

**Common Use Cases:**

- File operations (reading/writing large files)
- Network communications (HTTP requests/responses)
- Data compression/decompression
- Image/video processing
- Real-time data processing

**Best Practices:**

1. Always handle error events
2. Use pipeline() or pump() for proper error handling and resource cleanup
3. Consider backpressure in high-throughput applications
4. Set appropriate highWaterMark values for performance tuning
5. Use objectMode: true when working with JavaScript objects instead of buffers
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

### Q5: How do you implement security best practices in Node.js applications?
**Difficulty: Hard**

**Answer:**
Security is a critical aspect of Node.js application development. Implementing robust security measures helps protect against common vulnerabilities and attacks. Here's a comprehensive approach to securing Node.js applications:

**1. Dependency Management:**

```javascript
// Use npm audit to check for vulnerabilities
// $ npm audit
// $ npm audit fix

// Package.json with version pinning
{
  "name": "secure-nodejs-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "4.18.2",
    "helmet": "7.0.0",
    "jsonwebtoken": "9.0.0"
  },
  "scripts": {
    "audit": "npm audit --audit-level=moderate",
    "outdated": "npm outdated",
    "update": "npm update"
  }
}
```

**2. Input Validation and Sanitization:**

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const app = express();

app.use(express.json());

// Input validation middleware
const validateUserInput = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).trim(),
  body('name').trim().escape(),
  body('role').isIn(['user', 'admin']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Content sanitization
app.post('/content', (req, res) => {
  const rawHtml = req.body.content;
  
  const sanitizedHtml = sanitizeHtml(rawHtml, {
    allowedTags: ['h1', 'h2', 'h3', 'p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
    allowedAttributes: {
      'a': ['href', 'target']
    },
    allowedIframeHostnames: []
  });
  
  // Store or process sanitized content
  res.json({ success: true, content: sanitizedHtml });
});

app.post('/users', validateUserInput, (req, res) => {
  // Input is validated and sanitized
  const user = req.body;
  // Process user registration
});
```

**3. Authentication and Authorization:**

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Environment variables for secrets
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

// Password hashing
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT authentication
function generateToken(user) {
  const payload = {
    sub: user.id,
    name: user.name,
    role: user.role,
    iat: Math.floor(Date.now() / 1000)
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Role-based authorization middleware
function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Get user from database (pseudocode)
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isPasswordValid = await verifyPassword(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    
    // Set HTTP-only cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });
    
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected route
app.get('/admin/dashboard', authenticate, authorize(['admin']), (req, res) => {
  res.json({ data: 'Admin dashboard data' });
});
```

**4. Security Headers and Protection Middleware:**

```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Apply security middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(cookieParser()); // Parse cookies

// Configure CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Prevent parameter pollution
app.use(hpp());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// More strict rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 attempts per hour
  message: { error: 'Too many login attempts, please try again later.' }
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

**5. Secure Database Operations:**

```javascript
const { Pool } = require('pg');

// Database connection with environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
});

// Parameterized queries to prevent SQL injection
async function getUserByEmail(email) {
  try {
    // GOOD: Using parameterized query
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Database error');
  }
}

// BAD: Vulnerable to SQL injection
// function getUserByEmail(email) {
//   const query = `SELECT * FROM users WHERE email = '${email}'`;
//   return pool.query(query);
// }

// Using an ORM like Sequelize for additional security
const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
  }
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
});

// Secure ORM operations
async function findUserByEmail(email) {
  return await User.findOne({
    where: { email },
    attributes: ['id', 'name', 'email', 'password', 'role'] // Explicitly define returned fields
  });
}
```

**6. Error Handling and Logging:**

```javascript
const winston = require('winston');
const { createLogger, format, transports } = winston;

// Create secure logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
    // Sanitize sensitive data
    format((info) => {
      if (info.password) info.password = '[REDACTED]';
      if (info.token) info.token = '[REDACTED]';
      if (info.creditCard) info.creditCard = '[REDACTED]';
      return info;
    })()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

// Global error handler
app.use((err, req, res, next) => {
  // Log error details securely
  logger.error({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id
  });
  
  // Don't expose error details to client in production
  const statusCode = err.statusCode || 500;
  const errorMessage = process.env.NODE_ENV === 'production' && statusCode === 500
    ? 'Internal server error'
    : err.message;
  
  res.status(statusCode).json({
    error: errorMessage
  });
});

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Route with proper error handling
app.get('/api/users/:id', authenticate, async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    // Validate ID format
    if (!isValidUUID(userId)) {
      throw new AppError('Invalid user ID format', 400);
    }
    
    const user = await getUserById(userId);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Check authorization
    if (req.user.id !== userId && req.user.role !== 'admin') {
      throw new AppError('Not authorized to access this resource', 403);
    }
    
    res.json({ user });
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

**7. Secure File Uploads:**

```javascript
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs').promises;

// Configure storage with security measures
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate random filename to prevent path traversal attacks
    crypto.randomBytes(16, (err, raw) => {
      if (err) return cb(err);
      
      // Preserve file extension but sanitize it
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, raw.toString('hex') + ext);
    });
  }
});

// File filter for security
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed.', 400), false);
  }
};

// Configure multer with limits
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // Max 5 files
  }
});

// Secure file upload route
app.post('/api/upload', authenticate, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }
    
    // Scan file for viruses (pseudocode)
    // await scanFile(req.file.path);
    
    // Process file securely
    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.user.id
    };
    
    // Save file metadata to database
    // await saveFileMetadata(fileInfo);
    
    res.json({
      success: true,
      file: {
        filename: fileInfo.filename,
        originalName: fileInfo.originalName,
        size: fileInfo.size
      }
    });
  } catch (error) {
    // Clean up file if there was an error
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
});
```

**8. HTTPS and TLS Configuration:**

```javascript
const https = require('https');
const fs = require('fs');

// Only in production
if (process.env.NODE_ENV === 'production') {
  // Load SSL certificates
  const privateKey = fs.readFileSync('/path/to/private.key', 'utf8');
  const certificate = fs.readFileSync('/path/to/certificate.crt', 'utf8');
  const ca = fs.readFileSync('/path/to/ca_bundle.crt', 'utf8');
  
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
    // Modern, secure TLS configuration
    secureOptions: require('constants').SSL_OP_NO_TLSv1 | require('constants').SSL_OP_NO_TLSv1_1,
    ciphers: [
      'ECDHE-ECDSA-AES128-GCM-SHA256',
      'ECDHE-RSA-AES128-GCM-SHA256',
      'ECDHE-ECDSA-AES256-GCM-SHA384',
      'ECDHE-RSA-AES256-GCM-SHA384',
      'DHE-RSA-AES128-GCM-SHA256',
      'ECDHE-ECDSA-CHACHA20-POLY1305',
      'ECDHE-RSA-CHACHA20-POLY1305',
      'DHE-RSA-AES256-GCM-SHA384'
    ].join(':'),
    honorCipherOrder: true
  };
  
  // Create HTTPS server
  const httpsServer = https.createServer(credentials, app);
  
  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
  
  // Redirect HTTP to HTTPS
  const http = require('http');
  http.createServer((req, res) => {
    res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(80);
} else {
  // Development server
  app.listen(3000, () => {
    console.log('Development server running on port 3000');
  });
}
```

**9. Security Testing and Auditing:**

```javascript
// package.json security scripts
{
  "scripts": {
    "audit": "npm audit --audit-level=moderate",
    "audit:fix": "npm audit fix",
    "snyk": "snyk test",
    "lint:security": "eslint . --config .eslintrc-security.js",
    "test:security": "jest --testMatch='**/*.security.test.js'"
  },
  "devDependencies": {
    "eslint": "^8.40.0",
    "eslint-plugin-security": "^1.7.1",
    "jest": "^29.5.0",
    "snyk": "^1.1130.0"
  }
}

// .eslintrc-security.js
module.exports = {
  "plugins": ["security"],
  "extends": ["plugin:security/recommended"]
};

// Example security test
// auth.security.test.js
const request = require('supertest');
const app = require('../app');

describe('Authentication Security', () => {
  test('Should rate limit login attempts', async () => {
    // Make 11 login attempts
    for (let i = 0; i < 11; i++) {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      
      // The 11th request should be rate limited
      if (i === 10) {
        expect(response.status).toBe(429);
        expect(response.body).toHaveProperty('error');
      }
    }
  });
  
  test('Should prevent brute force attacks', async () => {
    // Test account lockout after multiple failed attempts
  });
  
  test('Should validate password strength', async () => {
    const weakPasswords = [
      'password',
      '12345678',
      'qwerty',
      'letmein'
    ];
    
    for (const password of weakPasswords) {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password
        });
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    }
  });
});
```

**10. Security Monitoring and Incident Response:**

```javascript
const express = require('express');
const app = express();
const { createLogger } = require('winston');
const { SeqTransport } = require('@datalust/winston-seq');

// Advanced security logging
const securityLogger = createLogger({
  level: 'info',
  transports: [
    new SeqTransport({
      serverUrl: process.env.SEQ_SERVER_URL,
      apiKey: process.env.SEQ_API_KEY,
      onError: (e => { console.error(e) }),
      handleExceptions: true,
      handleRejections: true
    })
  ]
});

// Security event logging middleware
app.use((req, res, next) => {
  // Log all requests
  const requestData = {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  };
  
  // Log authentication attempts
  if (req.path === '/api/auth/login') {
    securityLogger.info('Authentication attempt', {
      ...requestData,
      email: req.body.email,
      success: false // Will be updated after authentication
    });
  }
  
  // Log response
  const originalSend = res.send;
  res.send = function(body) {
    const responseTime = Date.now() - req._startTime;
    
    // Log security-relevant responses
    if (res.statusCode >= 400) {
      securityLogger.warn('Security event', {
        ...requestData,
        statusCode: res.statusCode,
        responseTime,
        userId: req.user?.id
      });
    }
    
    // Log successful authentication
    if (req.path === '/api/auth/login' && res.statusCode === 200) {
      securityLogger.info('Authentication success', {
        ...requestData,
        email: req.body.email,
        success: true,
        userId: JSON.parse(body).user.id
      });
    }
    
    return originalSend.call(this, body);
  };
  
  req._startTime = Date.now();
  next();
});

// Suspicious activity detection
const loginAttempts = {};
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

app.use('/api/auth/login', (req, res, next) => {
  const ip = req.ip;
  const email = req.body.email;
  const key = `${ip}:${email}`;
  
  // Check if IP is locked out
  if (loginAttempts[key] && loginAttempts[key].count >= MAX_ATTEMPTS) {
    const timeElapsed = Date.now() - loginAttempts[key].timestamp;
    
    if (timeElapsed < LOCKOUT_TIME) {
      securityLogger.warn('Blocked login attempt during lockout', {
        ip,
        email,
        attempts: loginAttempts[key].count
      });
      
      return res.status(429).json({
        error: 'Too many failed login attempts. Please try again later.'
      });
    } else {
      // Reset after lockout period
      delete loginAttempts[key];
    }
  }
  
  next();
});

// Track failed login attempts
function trackFailedLogin(ip, email) {
  const key = `${ip}:${email}`;
  
  if (!loginAttempts[key]) {
    loginAttempts[key] = {
      count: 0,
      timestamp: Date.now()
    };
  }
  
  loginAttempts[key].count++;
  loginAttempts[key].timestamp = Date.now();
  
  // Alert on suspicious activity
  if (loginAttempts[key].count >= MAX_ATTEMPTS) {
    securityLogger.error('Possible brute force attack detected', {
      ip,
      email,
      attempts: loginAttempts[key].count
    });
    
    // Here you could trigger additional alerts or countermeasures
    // sendSecurityAlert('Possible brute force attack', { ip, email });
  }
}

// Reset successful login
function resetLoginAttempts(ip, email) {
  const key = `${ip}:${email}`;
  delete loginAttempts[key];
}
```

**Security Best Practices Summary:**

1. **Keep Dependencies Updated**: Regularly audit and update dependencies
2. **Input Validation**: Validate and sanitize all user inputs
3. **Authentication**: Implement secure authentication with password hashing
4. **Authorization**: Use role-based access control
5. **Security Headers**: Set appropriate security headers with Helmet
6. **Rate Limiting**: Prevent brute force and DoS attacks
7. **Database Security**: Use parameterized queries or ORMs
8. **Error Handling**: Implement secure error handling and logging
9. **File Uploads**: Validate file types, scan for malware
10. **HTTPS**: Use TLS with secure configuration
11. **Security Testing**: Regular security audits and penetration testing
12. **Monitoring**: Implement security monitoring and incident response
13. **Environment Variables**: Store secrets in environment variables
14. **CORS**: Configure proper CORS policies
15. **Content Security Policy**: Implement CSP headers

By implementing these security measures, you can significantly reduce the risk of common vulnerabilities in your Node.js applications.

---

### Q6: How do you design and implement a microservices architecture with Node.js?
**Difficulty: Hard**

**Answer:**
Microservices architecture is a design approach where an application is built as a collection of loosely coupled, independently deployable services. Node.js is particularly well-suited for microservices due to its lightweight nature, non-blocking I/O, and efficient handling of concurrent requests. Here's a comprehensive guide to designing and implementing microservices with Node.js:

**1. Microservices Architecture Design Principles:**

```javascript
// Key principles of microservices architecture:
// 1. Single Responsibility: Each service handles one business capability
// 2. Autonomy: Services can be developed, deployed, and scaled independently
// 3. Resilience: Failure in one service doesn't cascade to others
// 4. Decentralization: Each service manages its own data
// 5. Observability: Comprehensive monitoring and logging
```

**2. Service Communication Patterns:**

```javascript
// Example of synchronous communication using HTTP/REST
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Order service calling the inventory service
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    // Call inventory service to check product availability
    const inventoryResponse = await axios.get(
      `${process.env.INVENTORY_SERVICE_URL}/api/inventory/${productId}`,
      {
        headers: {
          'Authorization': req.headers.authorization,
          'X-Correlation-ID': req.headers['x-correlation-id'] || generateCorrelationId()
        },
        timeout: 5000 // 5 second timeout
      }
    );
    
    const { available } = inventoryResponse.data;
    
    if (!available || available < quantity) {
      return res.status(400).json({ error: 'Insufficient inventory' });
    }
    
    // Reserve inventory
    await axios.post(
      `${process.env.INVENTORY_SERVICE_URL}/api/inventory/reserve`,
      { productId, quantity },
      {
        headers: {
          'Authorization': req.headers.authorization,
          'X-Correlation-ID': req.headers['x-correlation-id']
        }
      }
    );
    
    // Create order record
    const order = {
      id: generateOrderId(),
      userId,
      productId,
      quantity,
      status: 'created',
      createdAt: new Date()
    };
    
    // Save order to database
    // await saveOrder(order);
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation failed:', error.message);
    
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return res.status(error.response.status).json({
        error: 'Inventory service error',
        details: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      return res.status(503).json({
        error: 'Inventory service unavailable',
        details: 'Service timeout or connection refused'
      });
    } else {
      // Something happened in setting up the request
      return res.status(500).json({
        error: 'Internal server error',
        details: error.message
      });
    }
  }
});

function generateCorrelationId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

function generateOrderId() {
  return `order-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

app.listen(3000, () => {
  console.log('Order service running on port 3000');
});
```

**3. Asynchronous Communication with Message Queues:**

```javascript
// Example using RabbitMQ for asynchronous communication
const amqp = require('amqplib');

// Connection URL from environment variables with fallback
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

// Producer service (Order Service)
async function publishOrderCreatedEvent(order) {
  let connection;
  try {
    // Connect to RabbitMQ
    connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    // Ensure exchange exists
    const exchange = 'order_events';
    await channel.assertExchange(exchange, 'topic', { durable: true });
    
    // Create message with correlation ID and timestamp
    const message = {
      orderId: order.id,
      userId: order.userId,
      productId: order.productId,
      quantity: order.quantity,
      status: order.status,
      timestamp: new Date().toISOString(),
      correlationId: order.correlationId
    };
    
    // Publish message with routing key
    const routingKey = 'order.created';
    channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true, // Message will survive broker restart
        messageId: `msg-${Date.now()}`,
        timestamp: Date.now(),
        contentType: 'application/json',
        headers: {
          'x-correlation-id': order.correlationId
        }
      }
    );
    
    console.log(`[x] Published 'order.created' event for order ${order.id}`);
    
    // Close the channel and connection
    await channel.close();
  } catch (error) {
    console.error('Error publishing message:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Consumer service (Inventory Service)
async function setupOrderEventsConsumer() {
  let connection;
  let channel;
  
  try {
    // Connect to RabbitMQ with retry logic
    connection = await connectWithRetry();
    channel = await connection.createChannel();
    
    // Setup exchange and queue
    const exchange = 'order_events';
    const queue = 'inventory_order_events';
    const routingKey = 'order.created';
    
    await channel.assertExchange(exchange, 'topic', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    
    // Set prefetch to avoid overwhelming the service
    await channel.prefetch(1);
    
    console.log(`[*] Waiting for order events. To exit press CTRL+C`);
    
    // Consume messages
    await channel.consume(queue, async (msg) => {
      if (!msg) return;
      
      try {
        const content = JSON.parse(msg.content.toString());
        const correlationId = msg.properties.headers['x-correlation-id'];
        
        console.log(`[x] Received order.created event: ${content.orderId}`);
        console.log(`[x] Correlation ID: ${correlationId}`);
        
        // Process the order - update inventory
        await updateInventory(content.productId, content.quantity);
        
        // Acknowledge the message - remove from queue
        channel.ack(msg);
        
        // Publish a confirmation event
        await publishInventoryUpdatedEvent({
          orderId: content.orderId,
          productId: content.productId,
          reserved: true,
          correlationId
        });
      } catch (error) {
        console.error('Error processing message:', error);
        
        // Negative acknowledgment - requeue if it's a transient error
        // Don't requeue if it's a permanent error (e.g., parsing error)
        const requeue = isTransientError(error);
        channel.nack(msg, false, requeue);
        
        if (!requeue) {
          // Move to dead letter queue for later inspection
          await moveToDeadLetterQueue(msg, error);
        }
      }
    });
    
    // Handle connection errors
    connection.on('error', (err) => {
      console.error('Connection error:', err);
      setTimeout(setupOrderEventsConsumer, 5000); // Reconnect after 5 seconds
    });
    
    connection.on('close', () => {
      console.log('Connection closed, reconnecting...');
      setTimeout(setupOrderEventsConsumer, 5000);
    });
  } catch (error) {
    console.error('Setup consumer error:', error);
    setTimeout(setupOrderEventsConsumer, 5000);
  }
}

async function connectWithRetry(retries = 5, interval = 5000) {
  let lastError;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await amqp.connect(RABBITMQ_URL);
    } catch (error) {
      console.error(`Connection attempt ${attempt} failed:`, error.message);
      lastError = error;
      
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
  }
  
  throw new Error(`Failed to connect after ${retries} attempts: ${lastError.message}`);
}

function isTransientError(error) {
  // Determine if error is transient (network issue, temporary DB unavailability)
  // or permanent (parsing error, validation error)
  return error.name === 'NetworkError' || error.name === 'TimeoutError';
}

async function moveToDeadLetterQueue(msg, error) {
  // Implementation to move message to dead letter queue
  // with error information for later analysis
}

async function updateInventory(productId, quantity) {
  // Implementation to update inventory in database
  console.log(`Updating inventory for product ${productId}, reducing by ${quantity}`);
  // await db.collection('inventory').updateOne(
  //   { productId },
  //   { $inc: { quantity: -quantity } }
  // );
}

async function publishInventoryUpdatedEvent(data) {
  // Implementation to publish inventory updated event
  console.log(`Publishing inventory updated event for order ${data.orderId}`);
}

// Start the consumer
setupOrderEventsConsumer().catch(console.error);
```

**4. API Gateway Pattern:**

```javascript
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Apply security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(apiLimiter);

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Add user info to headers for downstream services
    req.headers['x-user-id'] = decoded.sub;
    req.headers['x-user-role'] = decoded.role;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Request logging and correlation ID
app.use((req, res, next) => {
  // Add correlation ID for request tracing
  req.headers['x-correlation-id'] = req.headers['x-correlation-id'] || 
    `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  
  console.log(`[${req.headers['x-correlation-id']}] ${req.method} ${req.path}`);
  next();
});

// Service discovery (simplified with environment variables)
const SERVICES = {
  users: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  orders: process.env.ORDER_SERVICE_URL || 'http://localhost:3002',
  products: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003',
  inventory: process.env.INVENTORY_SERVICE_URL || 'http://localhost:3004'
};

// Proxy middleware options
const proxyOptions = {
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api',
    '^/api/orders': '/api',
    '^/api/products': '/api',
    '^/api/inventory': '/api'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Forward correlation ID
    proxyReq.setHeader('x-correlation-id', req.headers['x-correlation-id']);
    
    // Log proxy request
    console.log(`[${req.headers['x-correlation-id']}] Proxying to ${proxyReq.path}`);
  },
  onError: (err, req, res) => {
    console.error(`[${req.headers['x-correlation-id']}] Proxy error:`, err);
    res.status(500).json({ error: 'Service unavailable' });
  }
};

// Setup routes to microservices
app.use('/api/users', authenticate, createProxyMiddleware({ ...proxyOptions, target: SERVICES.users }));
app.use('/api/orders', authenticate, createProxyMiddleware({ ...proxyOptions, target: SERVICES.orders }));
app.use('/api/products', createProxyMiddleware({ ...proxyOptions, target: SERVICES.products }));

// Protected inventory endpoints
app.use('/api/inventory', authenticate, (req, res, next) => {
  // Additional authorization for inventory service
  if (req.user.role !== 'admin' && req.method !== 'GET') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}, createProxyMiddleware({ ...proxyOptions, target: SERVICES.inventory }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP', services: Object.keys(SERVICES) });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`[${req.headers['x-correlation-id']}] Error:`, err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
```

**5. Service Discovery and Registration:**

```javascript
// Using Consul for service discovery
const Consul = require('consul');
const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const SERVICE_NAME = process.env.SERVICE_NAME || 'order-service';
const SERVICE_ID = `${SERVICE_NAME}-${os.hostname()}-${PORT}`;

// Initialize Consul client
const consul = new Consul({
  host: process.env.CONSUL_HOST || 'localhost',
  port: process.env.CONSUL_PORT || 8500
});

// Register service with Consul
async function registerService() {
  try {
    // Get IP address
    const networkInterfaces = os.networkInterfaces();
    const ip = networkInterfaces.eth0?.[0].address || 
               networkInterfaces.en0?.[0].address || 
               'localhost';
    
    const serviceDefinition = {
      id: SERVICE_ID,
      name: SERVICE_NAME,
      address: ip,
      port: parseInt(PORT),
      tags: ['node', 'microservice'],
      check: {
        http: `http://${ip}:${PORT}/health`,
        interval: '15s',
        timeout: '5s'
      }
    };
    
    await consul.agent.service.register(serviceDefinition);
    console.log(`Service registered with Consul: ${SERVICE_ID}`);
  } catch (error) {
    console.error('Error registering service:', error);
    // Continue running even if registration fails
  }
}

// Deregister service when shutting down
async function deregisterService() {
  try {
    await consul.agent.service.deregister(SERVICE_ID);
    console.log(`Service deregistered from Consul: ${SERVICE_ID}`);
  } catch (error) {
    console.error('Error deregistering service:', error);
  }
}

// Discover other services
async function discoverService(serviceName) {
  try {
    const result = await consul.catalog.service.nodes(serviceName);
    
    if (!result || result.length === 0) {
      throw new Error(`Service ${serviceName} not found`);
    }
    
    // Simple round-robin load balancing
    const serviceIndex = Date.now() % result.length;
    const service = result[serviceIndex];
    
    return {
      address: service.ServiceAddress,
      port: service.ServicePort
    };
  } catch (error) {
    console.error(`Error discovering service ${serviceName}:`, error);
    throw error;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: SERVICE_NAME, id: SERVICE_ID });
});

// Example endpoint that calls another service
app.get('/api/products/:id', async (req, res) => {
  try {
    // Discover product service
    const productService = await discoverService('product-service');
    const productUrl = `http://${productService.address}:${productService.port}/api/products/${req.params.id}`;
    
    // Call product service
    const response = await fetch(productUrl);
    const product = await response.json();
    
    res.json(product);
  } catch (error) {
    console.error('Error calling product service:', error);
    res.status(500).json({ error: 'Service unavailable' });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`);
  await registerService();
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await deregisterService();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await deregisterService();
  process.exit(0);
});
```

**6. Circuit Breaker Pattern:**

```javascript
const express = require('express');
const axios = require('axios');

class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000; // 30 seconds
    this.timeout = options.timeout || 5000; // 5 seconds
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF-OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successThreshold = options.successThreshold || 2;
    this.successCount = 0;
    
    this.services = {};
  }
  
  registerService(serviceName, fallbackFunction) {
    this.services[serviceName] = {
      state: 'CLOSED',
      failureCount: 0,
      lastFailureTime: null,
      successCount: 0,
      fallback: fallbackFunction
    };
    
    console.log(`Service registered: ${serviceName}`);
  }
  
  async executeRequest(serviceName, requestFn) {
    const service = this.services[serviceName];
    
    if (!service) {
      throw new Error(`Service ${serviceName} not registered`);
    }
    
    // Check if circuit is OPEN
    if (service.state === 'OPEN') {
      // Check if reset timeout has elapsed
      if (Date.now() - service.lastFailureTime > this.resetTimeout) {
        console.log(`Circuit for ${serviceName} transitioning from OPEN to HALF-OPEN`);
        service.state = 'HALF-OPEN';
      } else {
        console.log(`Circuit for ${serviceName} is OPEN, using fallback`);
        return service.fallback();
      }
    }
    
    try {
      // Execute request with timeout
      const response = await Promise.race([
        requestFn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), this.timeout)
        )
      ]);
      
      // Request succeeded
      this.handleSuccess(serviceName);
      return response;
    } catch (error) {
      // Request failed
      return this.handleFailure(serviceName, error);
    }
  }
  
  handleSuccess(serviceName) {
    const service = this.services[serviceName];
    
    if (service.state === 'HALF-OPEN') {
      service.successCount++;
      
      if (service.successCount >= this.successThreshold) {
        console.log(`Circuit for ${serviceName} transitioning from HALF-OPEN to CLOSED`);
        service.state = 'CLOSED';
        service.failureCount = 0;
        service.successCount = 0;
      }
    } else if (service.state === 'CLOSED') {
      // Reset failure count on success in closed state
      service.failureCount = 0;
    }
  }
  
  handleFailure(serviceName, error) {
    const service = this.services[serviceName];
    
    service.failureCount++;
    service.lastFailureTime = Date.now();
    
    console.log(`Request to ${serviceName} failed: ${error.message}`);
    console.log(`Failure count for ${serviceName}: ${service.failureCount}`);
    
    if (service.state === 'CLOSED' && service.failureCount >= this.failureThreshold) {
      console.log(`Circuit for ${serviceName} transitioning from CLOSED to OPEN`);
      service.state = 'OPEN';
    } else if (service.state === 'HALF-OPEN') {
      console.log(`Circuit for ${serviceName} transitioning from HALF-OPEN to OPEN`);
      service.state = 'OPEN';
    }
    
    // Use fallback
    return service.fallback();
  }
}

// Example usage in Express app
const app = express();
const circuitBreaker = new CircuitBreaker();

// Register services with fallbacks
circuitBreaker.registerService('inventory-service', () => {
  console.log('Using inventory fallback');
  return { available: 0, fallback: true };
});

circuitBreaker.registerService('payment-service', () => {
  console.log('Using payment fallback');
  return { status: 'pending', message: 'Payment service unavailable', fallback: true };
});

// Endpoint using circuit breaker
app.get('/api/products/:id/inventory', async (req, res) => {
  try {
    const productId = req.params.id;
    
    const inventoryData = await circuitBreaker.executeRequest(
      'inventory-service',
      async () => {
        const response = await axios.get(
          `${process.env.INVENTORY_SERVICE_URL}/api/inventory/${productId}`,
          { timeout: 3000 }
        );
        return response.data;
      }
    );
    
    res.json(inventoryData);
  } catch (error) {
    console.error('Error in inventory endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/orders/:id/payment', async (req, res) => {
  try {
    const orderId = req.params.id;
    const paymentDetails = req.body;
    
    const paymentResult = await circuitBreaker.executeRequest(
      'payment-service',
      async () => {
        const response = await axios.post(
          `${process.env.PAYMENT_SERVICE_URL}/api/payments`,
          { orderId, ...paymentDetails },
          { timeout: 3000 }
        );
        return response.data;
      }
    );
    
    res.json(paymentResult);
  } catch (error) {
    console.error('Error in payment endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Service with circuit breaker running on port 3000');
});
```

**7. Distributed Tracing:**

```javascript
const express = require('express');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const axios = require('axios');

// Initialize tracer
function initTracer() {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME || 'order-service',
      [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION || '1.0.0',
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development'
    })
  });

  // Configure span processor and exporter
  const jaegerExporter = new JaegerExporter({
    endpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
  provider.register();

  // Register instrumentations
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation()
    ],
  });

  return provider.getTracer('default');
}

const tracer = initTracer();
const app = express();

app.use(express.json());

// Custom middleware for manual span creation
app.use((req, res, next) => {
  const span = tracer.startSpan('process_request');
  
  // Add custom attributes
  span.setAttribute('http.method', req.method);
  span.setAttribute('http.url', req.url);
  span.setAttribute('user.id', req.headers['x-user-id'] || 'anonymous');
  
  // Store span in request for later use
  req.span = span;
  
  // End span when response is sent
  const originalEnd = res.end;
  res.end = function(...args) {
    span.setAttribute('http.status_code', res.statusCode);
    span.end();
    return originalEnd.apply(this, args);
  };
  
  next();
});

// Example endpoint with custom spans
app.post('/api/orders', async (req, res) => {
  // Get parent span from request
  const parentSpan = req.span;
  
  try {
    const { userId, items } = req.body;
    
    // Create child span for order validation
    const validateSpan = tracer.startSpan('validate_order', {
      parent: parentSpan
    });
    
    // Validate order
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      validateSpan.setAttribute('error', true);
      validateSpan.setAttribute('error.message', 'Invalid order data');
      validateSpan.end();
      
      return res.status(400).json({ error: 'Invalid order data' });
    }
    
    validateSpan.end();
    
    // Create child span for inventory check
    const inventorySpan = tracer.startSpan('check_inventory', {
      parent: parentSpan
    });
    
    // Check inventory for each item
    try {
      for (const item of items) {
        const itemSpan = tracer.startSpan(`check_item_${item.productId}`, {
          parent: inventorySpan
        });
        
        itemSpan.setAttribute('product.id', item.productId);
        itemSpan.setAttribute('product.quantity', item.quantity);
        
        try {
          // Call inventory service
          const response = await axios.get(
            `${process.env.INVENTORY_SERVICE_URL}/api/inventory/${item.productId}`,
            {
              headers: {
                'x-correlation-id': req.headers['x-correlation-id'],
                'x-user-id': req.headers['x-user-id']
              }
            }
          );
          
          const { available } = response.data;
          
          itemSpan.setAttribute('inventory.available', available);
          
          if (available < item.quantity) {
            itemSpan.setAttribute('error', true);
            itemSpan.setAttribute('error.message', 'Insufficient inventory');
            itemSpan.end();
            
            inventorySpan.setAttribute('error', true);
            inventorySpan.setAttribute('error.message', 'Insufficient inventory');
            inventorySpan.end();
            
            return res.status(400).json({
              error: 'Insufficient inventory',
              productId: item.productId,
              requested: item.quantity,
              available
            });
          }
          
          itemSpan.end();
        } catch (error) {
          itemSpan.setAttribute('error', true);
          itemSpan.setAttribute('error.message', error.message);
          itemSpan.end();
          throw error;
        }
      }
      
      inventorySpan.end();
    } catch (error) {
      inventorySpan.setAttribute('error', true);
      inventorySpan.setAttribute('error.message', error.message);
      inventorySpan.end();
      throw error;
    }
    
    // Create child span for order creation
    const createOrderSpan = tracer.startSpan('create_order', {
      parent: parentSpan
    });
    
    // Create order
    const order = {
      id: `order-${Date.now()}`,
      userId,
      items,
      status: 'created',
      createdAt: new Date().toISOString()
    };
    
    // Save order to database (simulated)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    createOrderSpan.setAttribute('order.id', order.id);
    createOrderSpan.end();
    
    // Return response
    res.status(201).json(order);
  } catch (error) {
    parentSpan.setAttribute('error', true);
    parentSpan.setAttribute('error.message', error.message);
    
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Order service with distributed tracing running on port 3000');
});
```

**8. Database Per Service Pattern:**

```javascript
// User Service with its own database
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to service-specific database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// User service endpoints
app.post('/api/users', async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Create new user
    const user = new User({
      email,
      name,
      password, // In a real app, hash the password
      role
    });
    
    await user.save();
    
    // Publish user created event (implementation omitted)
    // await publishUserCreatedEvent(user);
    
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('User service running on port 3001');
});

// Order Service with its own database
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();

app.use(express.json());

// Connect to service-specific database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/order-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Order schema and model
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['created', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'created'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// User data cache (in a real app, use Redis)
const userCache = new Map();

// Get user data from User service
async function getUserData(userId) {
  // Check cache first
  if (userCache.has(userId)) {
    return userCache.get(userId);
  }
  
  try {
    const response = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/users/${userId}`
    );
    
    const userData = response.data;
    
    // Cache user data with TTL
    userCache.set(userId, userData);
    setTimeout(() => userCache.delete(userId), 60000); // 1 minute TTL
    
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

// Order service endpoints
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, shippingAddress } = req.body;
    
    // Validate user exists
    try {
      await getUserData(userId);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid user' });
    }
    
    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.price * item.quantity;
    }
    
    // Create order
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      status: 'created'
    });
    
    await order.save();
    
    // Publish order created event (implementation omitted)
    // await publishOrderCreatedEvent(order);
    
    res.status(201).json({
      id: order._id,
      userId: order.userId,
      items: order.items,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Enrich with user data
    let userData = null;
    try {
      userData = await getUserData(order.userId);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Continue without user data
    }
    
    res.json({
      id: order._id,
      userId: order.userId,
      user: userData,
      items: order.items,
      totalAmount: order.totalAmount,
      status: order.status,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3002, () => {
  console.log('Order service running on port 3002');
});
```

**9. Containerization with Docker:**

```dockerfile
# Base Node.js image for microservices
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Development image
FROM base AS development
RUN npm install --only=development
CMD ["npm", "run", "dev"]

# Production image
FROM base AS production
ENV NODE_ENV=production
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  api-gateway:
    build:
      context: ./api-gateway
      target: ${NODE_ENV:-development}
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - USER_SERVICE_URL=http://user-service:3001
      - ORDER_SERVICE_URL=http://order-service:3002
      - PRODUCT_SERVICE_URL=http://product-service:3003
      - INVENTORY_SERVICE_URL=http://inventory-service:3004
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - user-service
      - order-service
      - product-service
      - inventory-service
    networks:
      - microservices-net

  user-service:
    build:
      context: ./user-service
      target: ${NODE_ENV:-development}
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - MONGODB_URI=mongodb://mongo-user:27017/user-service
      - RABBITMQ_URL=amqp://rabbitmq
    depends_on:
      - mongo-user
      - rabbitmq
    networks:
      - microservices-net

  order-service:
    build:
      context: ./order-service
      target: ${NODE_ENV:-development}
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - MONGODB_URI=mongodb://mongo-order:27017/order-service
      - RABBITMQ_URL=amqp://rabbitmq
      - USER_SERVICE_URL=http://user-service:3001
      - PRODUCT_SERVICE_URL=http://product-service:3003
    depends_on:
      - mongo-order
      - rabbitmq
      - user-service
      - product-service
    networks:
      - microservices-net

  product-service:
    build:
      context: ./product-service
      target: ${NODE_ENV:-development}
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - MONGODB_URI=mongodb://mongo-product:27017/product-service
      - RABBITMQ_URL=amqp://rabbitmq
    depends_on:
      - mongo-product
      - rabbitmq
    networks:
      - microservices-net

  inventory-service:
    build:
      context: ./inventory-service
      target: ${NODE_ENV:-development}
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - MONGODB_URI=mongodb://mongo-inventory:27017/inventory-service
      - RABBITMQ_URL=amqp://rabbitmq
      - PRODUCT_SERVICE_URL=http://product-service:3003
    depends_on:
      - mongo-inventory
      - rabbitmq
      - product-service
    networks:
      - microservices-net

  # Databases - one per service
  mongo-user:
    image: mongo:5
    volumes:
      - mongo-user-data:/data/db
    networks:
      - microservices-net

  mongo-order:
    image: mongo:5
    volumes:
      - mongo-order-data:/data/db
    networks:
      - microservices-net

  mongo-product:
    image: mongo:5
    volumes:
      - mongo-product-data:/data/db
    networks:
      - microservices-net

  mongo-inventory:
    image: mongo:5
    volumes:
      - mongo-inventory-data:/data/db
    networks:
      - microservices-net

  # Message broker
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"   # AMQP
      - "15672:15672" # Management UI
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    networks:
      - microservices-net

  # Monitoring and tracing
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "5775:5775/udp"
      - "6831:6831/udp"
      - "6832:6832/udp"
      - "5778:5778"
      - "16686:16686" # UI
      - "14268:14268"
      - "14250:14250"
    networks:
      - microservices-net

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - microservices-net

  grafana:
    image: grafana/grafana
    volumes:
      - grafana-data:/var/lib/grafana
    ports:
      - "3100:3000"
    depends_on:
      - prometheus
    networks:
      - microservices-net

volumes:
  mongo-user-data:
  mongo-order-data:
  mongo-product-data:
  mongo-inventory-data:
  rabbitmq-data:
  prometheus-data:
  grafana-data:

networks:
  microservices-net:
    driver: bridge
```

**10. Deployment with Kubernetes:**

```yaml
# user-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  replicas: 2
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: ${DOCKER_REGISTRY}/user-service:${VERSION}
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: user-service-secrets
              key: mongodb-uri
        - name: RABBITMQ_URL
          valueFrom:
            configMapKeyRef:
              name: microservices-config
              key: rabbitmq-url
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"
        readinessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 3001
    targetPort: 3001
  type: ClusterIP
```

```yaml
# api-gateway.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  labels:
    app: api-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      containers:
      - name: api-gateway
        image: ${DOCKER_REGISTRY}/api-gateway:${VERSION}
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: USER_SERVICE_URL
          value: "http://user-service:3001"
        - name: ORDER_SERVICE_URL
          value: "http://order-service:3002"
        - name: PRODUCT_SERVICE_URL
          value: "http://product-service:3003"
        - name: INVENTORY_SERVICE_URL
          value: "http://inventory-service:3004"
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: api-gateway-secrets
              key: jwt-secret
        resources:
          limits:
            cpu: "1000m"
            memory: "1Gi"
          requests:
            cpu: "500m"
            memory: "512Mi"
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: api-gateway
spec:
  selector:
    app: api-gateway
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-gateway-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "60"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "60"
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "X-Frame-Options: DENY";
      more_set_headers "X-Content-Type-Options: nosniff";
      more_set_headers "X-XSS-Protection: 1; mode=block";
      more_set_headers "Referrer-Policy: strict-origin-when-cross-origin";
      more_set_headers "Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'";
      more_set_headers "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload";
      more_set_headers "Cache-Control: no-store";
      more_set_headers "Pragma: no-cache";
      more_set_headers "X-Robots-Tag: noindex, nofollow";
spec:
  tls:
  - hosts:
    - api.example.com
    secretName: api-tls-secret
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-gateway
            port:
              number: 80
```

**11. Monitoring and Alerting:**

```javascript
const express = require('express');
const promClient = require('prom-client');
const app = express();

// Create a Registry to register metrics
const register = new promClient.Registry();

// Add default metrics (GC, memory usage, etc.)
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10]
});

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new promClient.Gauge({
  name: 'http_active_connections',
  help: 'Number of active HTTP connections'
});

const businessMetrics = new promClient.Counter({
  name: 'business_operations_total',
  help: 'Total number of business operations',
  labelNames: ['operation', 'status']
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestCounter);
register.registerMetric(activeConnections);
register.registerMetric(businessMetrics);

app.use(express.json());

// Middleware to track HTTP metrics
app.use((req, res, next) => {
  // Increment active connections
  activeConnections.inc();
  
  // Track request duration
  const start = Date.now();
  
  // Record path without params for better aggregation
  const route = req.path.split('/').slice(0, 3).join('/') + (req.path.split('/').length > 3 ? '/:param' : '');
  
  // Add response hook to record metrics
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    // Record request duration
    httpRequestDurationMicroseconds.labels(req.method, route, res.statusCode).observe(duration);
    
    // Increment request counter
    httpRequestCounter.labels(req.method, route, res.statusCode).inc();
    
    // Decrement active connections
    activeConnections.dec();
  });
  
  next();
});

// Expose metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Business endpoints
app.post('/api/orders', (req, res) => {
  try {
    // Process order
    const order = processOrder(req.body);
    
    // Record business metric
    businessMetrics.labels('create_order', 'success').inc();
    
    res.status(201).json(order);
  } catch (error) {
    // Record business metric for failure
    businessMetrics.labels('create_order', 'failure').inc();
    
    res.status(500).json({ error: 'Order creation failed' });
  }
});

function processOrder(orderData) {
  // Simulate order processing
  return {
    id: `order-${Date.now()}`,
    ...orderData,
    status: 'created',
    createdAt: new Date().toISOString()
  };
}

app.listen(3000, () => {
  console.log('Service with metrics running on port 3000');
});
```

**Key Benefits of Microservices Architecture with Node.js:**

1. **Scalability**: Each service can be scaled independently based on its specific resource requirements.

2. **Technology Flexibility**: Different services can use different technologies, frameworks, or even programming languages.

3. **Resilience**: Failure in one service doesn't bring down the entire application.

4. **Development Velocity**: Smaller, focused teams can work on individual services independently.

5. **Deployment Independence**: Services can be deployed independently, enabling continuous delivery.

6. **Maintainability**: Smaller codebases are easier to understand and maintain.

**Challenges and Best Practices:**

1. **Distributed System Complexity**: Implement proper monitoring, tracing, and logging.

2. **Data Consistency**: Use event sourcing or saga patterns for distributed transactions.

3. **Service Discovery**: Implement service registry and discovery mechanisms.

4. **Network Latency**: Design with network failures in mind, implement timeouts and circuit breakers.

5. **Testing**: Implement comprehensive testing strategies including contract testing and integration testing.

6. **Deployment Complexity**: Use containerization and orchestration tools like Docker and Kubernetes.

7. **Security**: Implement proper authentication and authorization across services.

By following these patterns and best practices, you can build robust, scalable, and maintainable microservices architectures with Node.js.

---

This comprehensive Node.js guide covers fundamental concepts with detailed explanations and practical examples, focusing on real-world scenarios and best practices for building scalable server-side applications.

### Q7: How do you implement a GraphQL API with Node.js?
**Difficulty: Medium**

**Answer:**
GraphQL is a query language for APIs and a runtime for executing those queries against your data. It provides a more efficient, powerful, and flexible alternative to REST. Here's a comprehensive guide to implementing a GraphQL API with Node.js:

**1. Basic GraphQL Server Setup with Apollo Server:**

```javascript
// Import required packages
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Define GraphQL schema using SDL (Schema Definition Language)
const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post!]
    createdAt: String!
    updatedAt: String
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]
    createdAt: String!
    updatedAt: String
  }
  
  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String
  }
  
  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
    comments: [Comment!]!
    comment(id: ID!): Comment
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(id: ID!, username: String, email: String): User!
    deleteUser(id: ID!): Boolean!
    
    createPost(title: String!, content: String!, authorId: ID!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): Boolean!
    
    createComment(content: String!, authorId: ID!, postId: ID!): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.userAPI.getUsers();
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id);
    },
    posts: async (_, __, { dataSources }) => {
      return dataSources.postAPI.getPosts();
    },
    post: async (_, { id }, { dataSources }) => {
      return dataSources.postAPI.getPostById(id);
    },
    comments: async (_, __, { dataSources }) => {
      return dataSources.commentAPI.getComments();
    },
    comment: async (_, { id }, { dataSources }) => {
      return dataSources.commentAPI.getCommentById(id);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }, { dataSources }) => {
      return dataSources.userAPI.createUser({ username, email, password });
    },
    updateUser: async (_, { id, username, email }, { dataSources }) => {
      return dataSources.userAPI.updateUser(id, { username, email });
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.deleteUser(id);
    },
    createPost: async (_, { title, content, authorId }, { dataSources }) => {
      return dataSources.postAPI.createPost({ title, content, authorId });
    },
    updatePost: async (_, { id, title, content }, { dataSources }) => {
      return dataSources.postAPI.updatePost(id, { title, content });
    },
    deletePost: async (_, { id }, { dataSources }) => {
      return dataSources.postAPI.deletePost(id);
    },
    createComment: async (_, { content, authorId, postId }, { dataSources }) => {
      return dataSources.commentAPI.createComment({ content, authorId, postId });
    },
    updateComment: async (_, { id, content }, { dataSources }) => {
      return dataSources.commentAPI.updateComment(id, { content });
    },
    deleteComment: async (_, { id }, { dataSources }) => {
      return dataSources.commentAPI.deleteComment(id);
    },
  },
  User: {
    posts: async (parent, _, { dataSources }) => {
      return dataSources.postAPI.getPostsByAuthorId(parent.id);
    },
  },
  Post: {
    author: async (parent, _, { dataSources }) => {
      return dataSources.userAPI.getUserById(parent.authorId);
    },
    comments: async (parent, _, { dataSources }) => {
      return dataSources.commentAPI.getCommentsByPostId(parent.id);
    },
  },
  Comment: {
    author: async (parent, _, { dataSources }) => {
      return dataSources.userAPI.getUserById(parent.authorId);
    },
    post: async (parent, _, { dataSources }) => {
      return dataSources.postAPI.getPostById(parent.postId);
    },
  },
};

// Create schema by combining type definitions and resolvers
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create data sources
class UserAPI {
  constructor(db) {
    this.db = db;
  }
  
  async getUsers() {
    return this.db.users.findAll();
  }
  
  async getUserById(id) {
    return this.db.users.findById(id);
  }
  
  async createUser({ username, email, password }) {
    // Hash password and validate input in a real implementation
    return this.db.users.create({
      username,
      email,
      password, // Should be hashed
      createdAt: new Date().toISOString(),
    });
  }
  
  async updateUser(id, updates) {
    return this.db.users.update(id, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  }
  
  async deleteUser(id) {
    return this.db.users.delete(id);
  }
}

// Similar classes for PostAPI and CommentAPI would be implemented

// Initialize Express and Apollo Server
async function startApolloServer() {
  // Create Express app and HTTP server
  const app = express();
  const httpServer = http.createServer(app);
  
  // Initialize database connection (simplified)
  const db = await initializeDatabase();
  
  // Create data sources
  const dataSources = () => ({
    userAPI: new UserAPI(db),
    // Initialize other data sources
  });
  
  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    dataSources,
    context: async ({ req }) => {
      // Extract auth token from request headers
      const token = req.headers.authorization || '';
      
      // Verify token and get user (simplified)
      const user = token ? await getUserFromToken(token) : null;
      
      return { user };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  // Start Apollo Server
  await server.start();
  
  // Apply middleware to Express app
  server.applyMiddleware({ app });
  
  // Start HTTP server
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  
  return { server, app, httpServer };
}

// Start server
startApolloServer().catch(console.error);

// Helper functions (simplified)
async function initializeDatabase() {
  // Initialize and return database connection
  return {
    users: {
      findAll: async () => { /* Implementation */ },
      findById: async (id) => { /* Implementation */ },
      create: async (data) => { /* Implementation */ },
      update: async (id, data) => { /* Implementation */ },
      delete: async (id) => { /* Implementation */ },
    },
    // Similar implementations for posts and comments
  };
}

async function getUserFromToken(token) {
  // Verify token and return user
  // Implementation depends on your authentication strategy
}
```

**2. GraphQL with MongoDB Integration:**

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schemas and models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Update UserAPI to use MongoDB models
class UserAPI {
  async getUsers() {
    return User.find({}).lean();
  }
  
  async getUserById(id) {
    return User.findById(id).lean();
  }
  
  async createUser({ username, email, password }) {
    // Hash password in a real implementation
    const user = new User({
      username,
      email,
      password, // Should be hashed
    });
    
    await user.save();
    return user.toObject();
  }
  
  async updateUser(id, updates) {
    const user = await User.findByIdAndUpdate(
      id,
      {
        ...updates,
        updatedAt: new Date(),
      },
      { new: true }
    );
    
    return user ? user.toObject() : null;
  }
  
  async deleteUser(id) {
    const result = await User.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}

// Similar implementations for PostAPI and CommentAPI
```

**3. Authentication and Authorization:**

```javascript
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Add authentication mutations to schema
const authTypeDefs = `
  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(username: String!, email: String!, password: String!): AuthPayload!
  }
  
  type AuthPayload {
    token: String!
    user: User!
  }
`;

// Add authentication resolvers
const authResolvers = {
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      // Find user by email
      const user = await dataSources.userAPI.getUserByEmail(email);
      
      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }
      
      // Compare passwords
      const valid = await bcrypt.compare(password, user.password);
      
      if (!valid) {
        throw new AuthenticationError('Invalid email or password');
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      return {
        token,
        user,
      };
    },
    register: async (_, { username, email, password }, { dataSources }) => {
      // Check if user already exists
      const existingUser = await dataSources.userAPI.getUserByEmail(email);
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await dataSources.userAPI.createUser({
        username,
        email,
        password: hashedPassword,
      });
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      return {
        token,
        user,
      };
    },
  },
};

// Authentication middleware
const authenticate = async (req) => {
  const token = req.headers.authorization?.split(' ')[1] || '';
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Authorization helper
const checkAuth = (user) => {
  if (!user) {
    throw new AuthenticationError('You must be logged in');
  }
};

// Example of protected resolver
const protectedResolvers = {
  Mutation: {
    createPost: async (_, { title, content }, { dataSources, user }) => {
      // Check if user is authenticated
      checkAuth(user);
      
      return dataSources.postAPI.createPost({
        title,
        content,
        authorId: user.id,
      });
    },
    updatePost: async (_, { id, title, content }, { dataSources, user }) => {
      // Check if user is authenticated
      checkAuth(user);
      
      // Get post
      const post = await dataSources.postAPI.getPostById(id);
      
      if (!post) {
        throw new Error('Post not found');
      }
      
      // Check if user is the author
      if (post.authorId.toString() !== user.id.toString()) {
        throw new ForbiddenError('You are not authorized to update this post');
      }
      
      return dataSources.postAPI.updatePost(id, { title, content });
    },
  },
};

// Update context function in Apollo Server
context: async ({ req }) => {
  const user = await authenticate(req);
  return { user };
},
```

**4. GraphQL Subscriptions for Real-time Updates:**

```javascript
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { PubSub } = require('graphql-subscriptions');

// Create PubSub instance
const pubsub = new PubSub();

// Define subscription events
const EVENTS = {
  POST_CREATED: 'POST_CREATED',
  POST_UPDATED: 'POST_UPDATED',
  POST_DELETED: 'POST_DELETED',
  COMMENT_CREATED: 'COMMENT_CREATED',
};

// Add subscriptions to schema
const subscriptionTypeDefs = `
  type Subscription {
    postCreated: Post!
    postUpdated: Post!
    postDeleted: ID!
    commentCreated(postId: ID): Comment!
  }
`;

// Add subscription resolvers
const subscriptionResolvers = {
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.POST_CREATED]),
    },
    postUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.POST_UPDATED]),
    },
    postDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.POST_DELETED]),
    },
    commentCreated: {
      subscribe: (_, { postId }) => {
        // Filter comments by postId if provided
        if (postId) {
          return {
            async *[Symbol.asyncIterator]() {
              const asyncIterator = pubsub.asyncIterator([EVENTS.COMMENT_CREATED]);
              
              for await (const value of asyncIterator) {
                if (value.commentCreated.postId.toString() === postId.toString()) {
                  yield value;
                }
              }
            },
          };
        }
        
        return pubsub.asyncIterator([EVENTS.COMMENT_CREATED]);
      },
    },
  },
};

// Update mutation resolvers to publish events
const mutationResolvers = {
  Mutation: {
    createPost: async (_, { title, content }, { dataSources, user }) => {
      checkAuth(user);
      
      const post = await dataSources.postAPI.createPost({
        title,
        content,
        authorId: user.id,
      });
      
      // Publish post created event
      pubsub.publish(EVENTS.POST_CREATED, { postCreated: post });
      
      return post;
    },
    // Similar updates for other mutations
  },
};

// Setup Apollo Server with subscriptions
async function startApolloServer() {
  const app = express();
  const httpServer = createServer(app);
  
  // Combine all type definitions and resolvers
  const typeDefs = [
    baseTypeDefs,
    authTypeDefs,
    subscriptionTypeDefs,
  ];
  
  const resolvers = [
    baseResolvers,
    authResolvers,
    protectedResolvers,
    subscriptionResolvers,
    mutationResolvers,
  ];
  
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  
  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    dataSources,
    context: async ({ req }) => {
      const user = req ? await authenticate(req) : null;
      return { user };
    },
  });
  
  await server.start();
  server.applyMiddleware({ app });
  
  // Create subscription server
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async (connectionParams) => {
        const token = connectionParams.authorization;
        if (token) {
          const user = await authenticate({ headers: { authorization: token } });
          return { user };
        }
        return {};
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );
  
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.graphqlPath}`);
  
  return { server, app, httpServer };
}
```

**5. GraphQL API Testing:**

```javascript
const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Create in-memory MongoDB server for testing
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GraphQL API', () => {
  let server;
  let query;
  let mutate;
  
  beforeEach(async () => {
    // Clear database collections
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    
    // Create test server
    server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({
        userAPI: new UserAPI(),
        postAPI: new PostAPI(),
        commentAPI: new CommentAPI(),
      }),
      context: () => ({ user: null }), // Unauthenticated by default
    });
    
    // Create test client
    const testClient = createTestClient(server);
    query = testClient.query;
    mutate = testClient.mutate;
  });
  
  test('should create a user', async () => {
    const CREATE_USER = gql`
      mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
          id
          username
          email
          createdAt
        }
      }
    `;
    
    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      },
    });
    
    expect(res.errors).toBeUndefined();
    expect(res.data.createUser).toMatchObject({
      username: 'testuser',
      email: 'test@example.com',
    });
    expect(res.data.createUser.id).toBeDefined();
    expect(res.data.createUser.createdAt).toBeDefined();
    
    // Verify user was created in database
    const user = await User.findOne({ email: 'test@example.com' });
    expect(user).toBeDefined();
    expect(user.username).toBe('testuser');
  });
  
  test('should query users', async () => {
    // Create test users
    await User.create([
      { username: 'user1', email: 'user1@example.com', password: 'password' },
      { username: 'user2', email: 'user2@example.com', password: 'password' },
    ]);
    
    const GET_USERS = gql`
      query GetUsers {
        users {
          id
          username
          email
        }
      }
    `;
    
    const res = await query({ query: GET_USERS });
    
    expect(res.errors).toBeUndefined();
    expect(res.data.users).toHaveLength(2);
    expect(res.data.users[0].username).toBe('user1');
    expect(res.data.users[1].username).toBe('user2');
  });
  
  // Additional tests for authentication, authorization, and other functionality
});
```

**6. GraphQL API Performance Optimization:**

```javascript
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginCacheControl } = require('apollo-server-core');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const DataLoader = require('dataloader');

// Create DataLoader for batching database queries
function createLoaders(db) {
  return {
    userLoader: new DataLoader(async (userIds) => {
      const users = await User.find({ _id: { $in: userIds } }).lean();
      
      // Return users in the same order as the keys
      return userIds.map(id => 
        users.find(user => user._id.toString() === id.toString()) || null
      );
    }),
    
    postsByAuthorLoader: new DataLoader(async (authorIds) => {
      const posts = await Post.find({ authorId: { $in: authorIds } }).lean();
      
      // Group posts by author ID
      const postsByAuthor = authorIds.map(authorId => 
        posts.filter(post => post.authorId.toString() === authorId.toString())
      );
      
      return postsByAuthor;
    }),
    
    commentsByPostLoader: new DataLoader(async (postIds) => {
      const comments = await Comment.find({ postId: { $in: postIds } }).lean();
      
      // Group comments by post ID
      const commentsByPost = postIds.map(postId => 
        comments.filter(comment => comment.postId.toString() === postId.toString())
      );
      
      return commentsByPost;
    }),
  };
}

// Update resolvers to use DataLoader
const optimizedResolvers = {
  User: {
    posts: async (parent, _, { loaders }) => {
      return loaders.postsByAuthorLoader.load(parent.id);
    },
  },
  Post: {
    author: async (parent, _, { loaders }) => {
      return loaders.userLoader.load(parent.authorId);
    },
    comments: async (parent, _, { loaders }) => {
      return loaders.commentsByPostLoader.load(parent.id);
    },
  },
  Comment: {
    author: async (parent, _, { loaders }) => {
      return loaders.userLoader.load(parent.authorId);
    },
    post: async (parent, _, { loaders }) => {
      return loaders.postLoader.load(parent.postId);
    },
  },
};

// Add cache control directives to schema
const typeDefs = `
  type User @cacheControl(maxAge: 3600) {
    id: ID!
    username: String!
    email: String!
    posts: [Post!] @cacheControl(maxAge: 600)
    createdAt: String!
    updatedAt: String
  }
  
  type Post @cacheControl(maxAge: 1800) {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]
    createdAt: String!
    updatedAt: String
  }
  
  type Comment @cacheControl(maxAge: 1200) {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String
  }
  
  type Query {
    users: [User!]! @cacheControl(maxAge: 600)
    user(id: ID!): User @cacheControl(maxAge: 600)
    posts: [Post!]! @cacheControl(maxAge: 300)
    post(id: ID!): Post @cacheControl(maxAge: 300)
    comments: [Comment!]! @cacheControl(maxAge: 300)
    comment(id: ID!): Comment @cacheControl(maxAge: 300)
  }
`;

// Configure Apollo Server with caching
const server = new ApolloServer({
  schema,
  dataSources,
  context: async ({ req }) => {
    const user = await authenticate(req);
    const loaders = createLoaders();
    
    return { user, loaders };
  },
  plugins: [
    ApolloServerPluginCacheControl({ defaultMaxAge: 300 }), // 5 minutes default
    responseCachePlugin({
      sessionId: ({ req }) => (req.headers.authorization || ''),
    }),
  ],
  cache: 'bounded',
});
```

**7. GraphQL API Documentation and Playground:**

```javascript
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} = require('apollo-server-core');

// Add descriptions to schema for documentation
const documentedTypeDefs = `
  """
  A user in the system
  """
  type User {
    """Unique identifier"""
    id: ID!
    """Username for display"""
    username: String!
    """Email address"""
    email: String!
    """Posts created by this user"""
    posts: [Post!]
    """When the user was created"""
    createdAt: String!
    """When the user was last updated"""
    updatedAt: String
  }
  
  """
  A blog post
  """
  type Post {
    """Unique identifier"""
    id: ID!
    """Post title"""
    title: String!
    """Post content"""
    content: String!
    """User who created the post"""
    author: User!
    """Comments on this post"""
    comments: [Comment!]
    """When the post was created"""
    createdAt: String!
    """When the post was last updated"""
    updatedAt: String
  }
  
  # Similar documentation for other types and fields
`;

// Configure Apollo Server with GraphQL Playground
const server = new ApolloServer({
  schema,
  dataSources,
  context,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            'editor.theme': 'dark',
            'editor.cursorShape': 'line',
            'editor.reuseHeaders': true,
            'tracing.hideTracingResponse': false,
            'queryPlan.hideQueryPlanResponse': false,
            'editor.fontSize': 14,
            'editor.fontFamily': '"Source Code Pro", "Consolas", monospace',
            'request.credentials': 'include',
          },
        }),
  ],
  introspection: process.env.NODE_ENV !== 'production',
});
```

**Key Benefits of GraphQL in Node.js Applications:**

1. **Efficient Data Fetching**: Clients can request exactly what they need, reducing over-fetching and under-fetching of data.

2. **Single Endpoint**: All data operations go through a single endpoint, simplifying API management.

3. **Strong Typing**: GraphQL's schema provides a contract between client and server, enabling better tooling and validation.

4. **Real-time Updates**: Subscriptions enable real-time data updates without complex WebSocket implementation.

5. **Versioning**: GraphQL APIs can evolve without versioning by adding new fields and types while maintaining backward compatibility.

6. **Introspection**: GraphQL APIs are self-documenting, making it easier for developers to understand and use them.

**Challenges and Best Practices:**

1. **N+1 Query Problem**: Use DataLoader for batching and caching database queries.

2. **Authorization**: Implement field-level and type-level authorization.

3. **Rate Limiting**: Implement complexity analysis and rate limiting to prevent abuse.

4. **Caching**: Use response caching and cache control directives for better performance.

5. **Error Handling**: Provide meaningful error messages while protecting sensitive information.

6. **File Uploads**: Use libraries like graphql-upload for handling file uploads.

7. **Monitoring**: Implement proper logging and monitoring for GraphQL operations.

By following these patterns and best practices, you can build robust, efficient, and maintainable GraphQL APIs with Node.js.

### Q8: How do you optimize and monitor a Node.js application for production?
**Difficulty: Hard**

**Answer:**
Optimizing and monitoring Node.js applications for production environments is crucial for ensuring reliability, performance, and scalability. Here's a comprehensive guide covering key aspects of Node.js optimization and monitoring:

**1. Performance Optimization Techniques:**

**Memory Management:**
```javascript
// Monitor memory usage in your application
const memoryUsage = () => {
  const used = process.memoryUsage();
  const messages = [];
  
  for (const key in used) {
    messages.push(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  
  console.log('Memory usage:', messages.join(', '));
};

// Call periodically to track memory usage
setInterval(memoryUsage, 30000);

// Handle memory leaks with heap snapshots
const heapdump = require('heapdump');

// Generate heap snapshot on SIGUSR2 signal
process.on('SIGUSR2', () => {
  console.log('Generating heap snapshot...');
  const filename = `/tmp/heapdump-${Date.now()}.heapsnapshot`;
  heapdump.writeSnapshot(filename, (err) => {
    if (err) console.error('Failed to generate heap snapshot:', err);
    else console.log(`Heap snapshot written to ${filename}`);
  });
});
```

**CPU Profiling:**
```javascript
const v8Profiler = require('v8-profiler-next');
const fs = require('fs');

// Start CPU profiling on demand
function startCpuProfiling(duration = 30000) {
  const profileName = `cpu-profile-${Date.now()}`;
  console.log(`Starting CPU profile: ${profileName}`);
  
  // Start profiling
  v8Profiler.startProfiling(profileName, true);
  
  // Stop profiling after duration
  setTimeout(() => {
    const profile = v8Profiler.stopProfiling(profileName);
    
    // Save profile to file
    fs.writeFileSync(`./profiles/${profileName}.cpuprofile`, JSON.stringify(profile));
    profile.delete();
    
    console.log(`CPU profile saved to ./profiles/${profileName}.cpuprofile`);
  }, duration);
}

// Example: Start profiling on SIGUSR1 signal
process.on('SIGUSR1', () => startCpuProfiling());
```

**Caching Strategies:**
```javascript
const NodeCache = require('node-cache');
const Redis = require('ioredis');

// In-memory caching for frequently accessed data
class CacheService {
  constructor(ttlSeconds = 60) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }
  
  get(key) {
    return this.cache.get(key);
  }
  
  set(key, value, ttl = null) {
    return this.cache.set(key, value, ttl);
  }
  
  delete(key) {
    return this.cache.del(key);
  }
  
  flush() {
    return this.cache.flushAll();
  }
}

// Redis caching for distributed systems
class RedisCacheService {
  constructor(redisUrl = 'redis://localhost:6379') {
    this.redis = new Redis(redisUrl);
  }
  
  async get(key) {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }
  
  async set(key, value, ttlSeconds = 60) {
    return await this.redis.set(
      key,
      JSON.stringify(value),
      'EX',
      ttlSeconds
    );
  }
  
  async delete(key) {
    return await this.redis.del(key);
  }
}

// Example usage in Express route
const express = require('express');
const app = express();
const cacheService = new CacheService(300); // 5 minutes TTL

app.get('/api/products', async (req, res) => {
  const cacheKey = 'products';
  
  // Try to get from cache first
  const cachedData = cacheService.get(cacheKey);
  
  if (cachedData) {
    console.log('Cache hit for products');
    return res.json(cachedData);
  }
  
  // If not in cache, fetch from database
  try {
    console.log('Cache miss for products, fetching from DB');
    const products = await db.products.findAll();
    
    // Store in cache for future requests
    cacheService.set(cacheKey, products);
    
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});
```

**Database Query Optimization:**
```javascript
const { Pool } = require('pg');

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // Connection pool settings
  max: 20, // Maximum number of clients
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection not established
});

// Optimize query execution
async function getProductsWithCategories() {
  // Use a single query with JOIN instead of multiple queries
  const query = `
    SELECT p.id, p.name, p.price, c.name as category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.active = true
    ORDER BY p.created_at DESC
    LIMIT 100
  `;
  
  const client = await pool.connect();
  
  try {
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

// Monitor database performance
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

pool.on('connect', () => {
  console.log('New client connected to database');
});
```

**2. Scaling Strategies:**

**Cluster Module for Multi-Core Processing:**
```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers based on CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Handle worker exit and restart
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
  
  // Log when a worker comes online
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}\n`);
  }).listen(8000);
  
  console.log(`Worker ${process.pid} started`);
}
```

**PM2 Process Manager Configuration:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api-service',
    script: './src/server.js',
    instances: 'max', // Use maximum number of CPU cores
    exec_mode: 'cluster', // Run in cluster mode
    watch: false, // Watch for file changes
    max_memory_restart: '1G', // Restart if memory exceeds 1GB
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Log configuration
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    merge_logs: true,
    // Graceful shutdown
    kill_timeout: 5000, // Wait 5 seconds before forcing shutdown
    listen_timeout: 3000, // Wait 3 seconds for app to listen
  }]
};
```

**Load Balancing with Nginx:**
```nginx
# /etc/nginx/conf.d/nodejs-app.conf
upstream nodejs_app {
  least_conn; # Use least connections algorithm
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
  server 127.0.0.1:3002;
  server 127.0.0.1:3003;
  keepalive 64;
}

server {
  listen 80;
  server_name example.com;
  
  # Redirect HTTP to HTTPS
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name example.com;
  
  # SSL configuration
  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  
  # Enable OCSP stapling
  ssl_stapling on;
  ssl_stapling_verify on;
  
  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-XSS-Protection "1; mode=block" always;
  
  # Proxy settings
  location / {
    proxy_pass http://nodejs_app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # Timeouts
    proxy_connect_timeout 10s;
    proxy_send_timeout 30s;
    proxy_read_timeout 30s;
  }
  
  # Static files
  location /static/ {
    alias /var/www/example.com/static/;
    expires 30d;
    add_header Cache-Control "public, max-age=2592000";
  }
  
  # Gzip compression
  gzip on;
  gzip_comp_level 5;
  gzip_min_length 256;
  gzip_proxied any;
  gzip_types
    application/javascript
    application/json
    application/xml
    text/css
    text/plain
    text/xml;
}
```

**3. Monitoring and Logging:**

**Application Monitoring with Prometheus and Express:**
```javascript
const express = require('express');
const client = require('prom-client');
const responseTime = require('response-time');

// Create Express app
const app = express();

// Create a Registry to register metrics
const register = new client.Registry();

// Add default metrics (GC, memory, event loop, etc.)
client.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10], // in seconds
});

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestCounter);

// Middleware to measure response time and record metrics
app.use(responseTime((req, res, time) => {
  const route = req.route ? req.route.path : req.path;
  const method = req.method;
  const statusCode = res.statusCode;
  
  // Record request duration
  httpRequestDurationMicroseconds
    .labels(method, route, statusCode)
    .observe(time / 1000); // Convert to seconds
  
  // Increment request counter
  httpRequestCounter
    .labels(method, route, statusCode)
    .inc();
}));

// Expose metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Example route
app.get('/api/users', (req, res) => {
  // Simulate processing time
  setTimeout(() => {
    res.json({ users: ['user1', 'user2', 'user3'] });
  }, Math.random() * 100);
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

**Structured Logging with Winston and Morgan:**
```javascript
const express = require('express');
const winston = require('winston');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

// Create Express app
const app = express();

// Create Winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-service' },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // File transport for production
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
});

// Add request ID middleware
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
});

// Morgan middleware for HTTP request logging
morgan.token('id', (req) => req.id);
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(
  ':id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms :body',
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    error: err,
    requestId: req.id,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });
  
  res.status(500).json({
    error: 'Internal Server Error',
    requestId: req.id,
  });
});

// Example route
app.get('/api/test', (req, res) => {
  logger.info('Test endpoint called', {
    requestId: req.id,
    user: req.user?.id || 'anonymous',
  });
  
  res.json({ message: 'Success', requestId: req.id });
});

// Start server
app.listen(3000, () => {
  logger.info('Server started on port 3000');
});
```

**Distributed Tracing with OpenTelemetry:**
```javascript
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// Configure Jaeger exporter
const jaegerExporter = new JaegerExporter({
  endpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
});

// Configure OpenTelemetry SDK
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'api-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  }),
  traceExporter: jaegerExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

// Initialize the SDK and register with the OpenTelemetry API
sdk.start()
  .then(() => console.log('OpenTelemetry initialized'))
  .catch((error) => console.error('Error initializing OpenTelemetry', error));

// Gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down'))
    .catch((error) => console.error('Error shutting down OpenTelemetry SDK', error))
    .finally(() => process.exit(0));
});

// After OpenTelemetry is initialized, import and start your application
const express = require('express');
const app = express();

// Example route with manual span creation
app.get('/api/orders/:id', async (req, res) => {
  const { trace } = require('@opentelemetry/api');
  const tracer = trace.getTracer('order-service');
  
  // Create a custom span for business logic
  const span = tracer.startSpan('get-order-details');
  span.setAttribute('order.id', req.params.id);
  
  try {
    // Simulate database query
    const orderDetails = await getOrderDetails(req.params.id);
    span.setAttribute('order.customer_id', orderDetails.customerId);
    
    // Simulate external service call
    const customerDetails = await getCustomerDetails(orderDetails.customerId);
    
    res.json({
      order: orderDetails,
      customer: customerDetails,
    });
    
    span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
  } catch (error) {
    span.setStatus({
      code: opentelemetry.SpanStatusCode.ERROR,
      message: error.message,
    });
    span.recordException(error);
    
    res.status(500).json({ error: 'Failed to fetch order details' });
  } finally {
    span.end();
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Mock functions
async function getOrderDetails(orderId) {
  return { id: orderId, customerId: 'cust-123', total: 99.99 };
}

async function getCustomerDetails(customerId) {
  return { id: customerId, name: 'John Doe', email: 'john@example.com' };
}
```

**4. Error Handling and Resilience:**

**Global Error Handler:**
```javascript
const express = require('express');
const app = express();

// Custom error classes
class ValidationError extends Error {
  constructor(message, validationErrors = {}) {
    super(message);
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

// Example route that throws errors
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    // Validate input
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new ValidationError('Invalid user ID format');
    }
    
    // Check authentication
    if (!req.headers.authorization) {
      throw new UnauthorizedError('Authentication required');
    }
    
    // Simulate database query
    const user = await findUserById(userId);
    
    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }
    
    res.json(user);
  } catch (error) {
    next(error); // Pass error to error handler
  }
});

// Global error handling middleware (must be defined last)
app.use((err, req, res, next) => {
  // Log error
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    requestId: req.id,
    path: req.path,
  });
  
  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Prepare error response
  const errorResponse = {
    error: {
      type: err.name || 'Error',
      message: err.message || 'An unexpected error occurred',
      requestId: req.id,
    },
  };
  
  // Add validation errors if present
  if (err.validationErrors) {
    errorResponse.error.validationErrors = err.validationErrors;
  }
  
  // Don't expose stack trace in production
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    errorResponse.error.stack = err.stack;
  }
  
  res.status(statusCode).json(errorResponse);
});

// Mock function
async function findUserById(id) {
  // Simulate user not found
  return null;
}

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

**Circuit Breaker Pattern:**
```javascript
const axios = require('axios');

class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000; // 30 seconds
    this.timeoutDuration = options.timeoutDuration || 5000; // 5 seconds
    
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
  }
  
  async exec(fn, fallback) {
    if (this.state === 'OPEN') {
      // Check if reset timeout has elapsed
      if (Date.now() > this.nextAttemptTime) {
        this.state = 'HALF-OPEN';
        console.log('Circuit breaker state: HALF-OPEN');
      } else {
        console.log('Circuit breaker is OPEN, using fallback');
        return fallback();
      }
    }
    
    try {
      // Set timeout for the function call
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), this.timeoutDuration);
      });
      
      // Execute the function with timeout
      const result = await Promise.race([fn(), timeoutPromise]);
      
      // If successful in HALF-OPEN state, reset the circuit breaker
      if (this.state === 'HALF-OPEN') {
        this.reset();
        console.log('Circuit breaker reset: CLOSED');
      }
      
      return result;
    } catch (error) {
      // Handle failure
      this.recordFailure();
      console.error('Circuit breaker recorded failure:', error.message);
      
      // If failure threshold reached, open the circuit
      if (this.state === 'CLOSED' && this.failureCount >= this.failureThreshold) {
        this.trip();
        console.log('Circuit breaker tripped: OPEN');
      }
      
      // If in HALF-OPEN state and failed, open the circuit again
      if (this.state === 'HALF-OPEN') {
        this.trip();
        console.log('Circuit breaker re-opened after failed recovery attempt');
      }
      
      // Use fallback if provided
      if (typeof fallback === 'function') {
        return fallback(error);
      }
      
      throw error;
    }
  }
  
  recordFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
  }
  
  trip() {
    this.state = 'OPEN';
    this.nextAttemptTime = Date.now() + this.resetTimeout;
  }
  
  reset() {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
  }
}

// Example usage with external API call
const paymentServiceBreaker = new CircuitBreaker({
  failureThreshold: 3,
  resetTimeout: 10000, // 10 seconds
  timeoutDuration: 2000, // 2 seconds
});

async function processPayment(orderId, amount) {
  return paymentServiceBreaker.exec(
    // Main function
    async () => {
      console.log(`Processing payment for order ${orderId}`);
      const response = await axios.post('https://payment-service.example.com/api/payments', {
        orderId,
        amount,
      });
      return response.data;
    },
    // Fallback function
    () => {
      console.log(`Using fallback for payment processing (order ${orderId})`);
      return {
        success: false,
        message: 'Payment service unavailable, payment queued for processing',
        orderId,
        status: 'QUEUED',
      };
    }
  );
}

// Example Express route using circuit breaker
app.post('/api/orders/:id/payment', async (req, res) => {
  try {
    const result = await processPayment(req.params.id, req.body.amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Payment processing failed',
      message: error.message,
    });
  }
});
```

**5. Security Hardening:**

**Security Middleware Configuration:**
```javascript
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const cors = require('cors');
const hpp = require('hpp');

const app = express();

// Basic security headers with Helmet
app.use(helmet());

// Configure Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
      imgSrc: ["'self'", 'data:', 'cdn.example.com'],
      connectSrc: ["'self'", 'api.example.com'],
      fontSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
      ? ['https://example.com', 'https://www.example.com']
      : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

// Parse JSON body with size limit
app.use(express.json({ limit: '100kb' }));

// Prevent parameter pollution
app.use(hpp());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: '15 minutes',
  },
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Speed limiter for login attempts
const loginLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // Allow 5 requests per 15 minutes, then...
  delayMs: (hits) => hits * 500, // Add 500ms delay per hit above threshold
  maxDelayMs: 10000, // Maximum delay of 10 seconds
});

app.use('/api/auth/login', loginLimiter);

// Trust proxy if behind load balancer
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Example protected route
app.get('/api/protected', (req, res) => {
  res.json({ message: 'This is a protected endpoint' });
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

**6. Containerization and Deployment:**

**Dockerfile with Multi-stage Build:**
```dockerfile
# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application (if needed)
RUN npm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy built application from build stage
COPY --from=build --chown=nodejs:nodejs /app/package*.json ./
COPY --from=build --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist

# Create necessary directories with proper permissions
RUN mkdir -p /app/logs && chown -R nodejs:nodejs /app/logs

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/server.js"]
```

**Docker Compose for Local Development:**
```yaml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=appdb
      - DB_USER=appuser
      - DB_PASSWORD=apppassword
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    networks:
      - app-network
    restart: unless-stopped

  postgres:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    environment:
      - POSTGRES_USER=appuser
      - POSTGRES_PASSWORD=apppassword
      - POSTGRES_DB=appdb
    networks:
      - app-network
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network
    restart: unless-stopped

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    networks:
      - app-network
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
    depends_on:
      - prometheus
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
  prometheus-data:
  grafana-data:
```

**Kubernetes Deployment:**
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
  namespace: production
  labels:
    app: api-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-service
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: api-service
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/path: "/metrics"
        prometheus.io/port: "3000"
    spec:
      containers:
      - name: api-service
        image: example.com/api-service:1.0.0
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: db-host
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: db-user
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: db-password
        - name: DB_NAME
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: db-name
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: redis-url
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /health/ready
            port: http
          initialDelaySeconds: 5
          periodSeconds: 10
          timeoutSeconds: 3
          successThreshold: 1
          failureThreshold: 3
        volumeMounts:
        - name: logs
          mountPath: /app/logs
      volumes:
      - name: logs
        emptyDir: {}
      securityContext:
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
      terminationGracePeriodSeconds: 60

---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
  namespace: production
  labels:
    app: api-service
spec:
  selector:
    app: api-service
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
  type: ClusterIP

---
# horizontal pod autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-service-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-service
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
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 60
      - type: Pods
        value: 4
        periodSeconds: 60
      selectPolicy: Max
```

**7. Health Checks and Graceful Shutdown:**

```javascript
const express = require('express');
const http = require('http');

const app = express();
let server;

// Track connections
const connections = new Set();

// Track service health
const serviceHealth = {
  status: 'starting',
  uptime: 0,
  startTime: Date.now(),
  checks: {
    database: { status: 'unknown' },
    redis: { status: 'unknown' },
    externalApi: { status: 'unknown' },
  },
};

// Update health status periodically
setInterval(() => {
  serviceHealth.uptime = Math.floor((Date.now() - serviceHealth.startTime) / 1000);
}, 1000);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: serviceHealth.status,
    uptime: serviceHealth.uptime,
    timestamp: new Date().toISOString(),
  });
});

// Detailed readiness check
app.get('/health/ready', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = await checkDatabaseConnection();
    serviceHealth.checks.database = dbStatus;
    
    // Check Redis connection
    const redisStatus = await checkRedisConnection();
    serviceHealth.checks.redis = redisStatus;
    
    // Check external API
    const apiStatus = await checkExternalApi();
    serviceHealth.checks.externalApi = apiStatus;
    
    // Determine overall status
    const allChecksOk = Object.values(serviceHealth.checks)
      .every(check => check.status === 'ok');
    
    serviceHealth.status = allChecksOk ? 'ok' : 'degraded';
    
    const statusCode = allChecksOk ? 200 : 503;
    
    res.status(statusCode).json({
      status: serviceHealth.status,
      uptime: serviceHealth.uptime,
      checks: serviceHealth.checks,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check error:', error);
    serviceHealth.status = 'error';
    
    res.status(500).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Example route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start server
server = http.createServer(app);

// Track connections
server.on('connection', (connection) => {
  connections.add(connection);
  connection.on('close', () => {
    connections.delete(connection);
  });
});

server.listen(3000, () => {
  serviceHealth.status = 'ok';
  console.log('Server listening on port 3000');
});

// Graceful shutdown
function gracefulShutdown(signal) {
  console.log(`Received ${signal}, starting graceful shutdown...`);
  
  // Update service status
  serviceHealth.status = 'shutting_down';
  
  // Stop accepting new connections
  server.close(() => {
    console.log('HTTP server closed');
    
    // Close database connections, etc.
    Promise.all([
      closeDatabaseConnection(),
      closeRedisConnection(),
      // Other cleanup tasks
    ])
      .then(() => {
        console.log('All connections closed successfully');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error during shutdown:', err);
        process.exit(1);
      });
  });
  
  // Force close if graceful shutdown takes too long
  setTimeout(() => {
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 30000); // 30 seconds
  
  // Close existing connections if they don't finish in 10 seconds
  setTimeout(() => {
    console.log(`Destroying ${connections.size} open connections`);
    connections.forEach((connection) => {
      connection.destroy();
    });
  }, 10000);
}

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Mock health check functions
async function checkDatabaseConnection() {
  // Implement actual database connection check
  return { status: 'ok', responseTime: 15 };
}

async function checkRedisConnection() {
  // Implement actual Redis connection check
  return { status: 'ok', responseTime: 5 };
}

async function checkExternalApi() {
  // Implement actual external API check
  return { status: 'ok', responseTime: 120 };
}

async function closeDatabaseConnection() {
  // Implement actual database connection closing
  console.log('Database connection closed');
}

async function closeRedisConnection() {
  // Implement actual Redis connection closing
  console.log('Redis connection closed');
}
```

**Key Takeaways for Node.js Production Optimization:**

1. **Performance Optimization:**
   - Use clustering to leverage multi-core systems
   - Implement caching strategies for frequently accessed data
   - Optimize database queries and connection pooling
   - Use streaming for handling large data sets
   - Profile memory usage and fix leaks

2. **Monitoring and Observability:**
   - Implement structured logging with correlation IDs
   - Set up metrics collection with Prometheus
   - Use distributed tracing for complex systems
   - Monitor event loop delays and garbage collection
   - Create comprehensive health check endpoints

3. **Error Handling and Resilience:**
   - Implement global error handling middleware
   - Use circuit breakers for external service calls
   - Add retry mechanisms with exponential backoff
   - Implement graceful shutdown procedures
   - Handle uncaught exceptions and unhandled rejections

4. **Security:**
   - Keep dependencies updated
   - Implement rate limiting and throttling
   - Use security headers with Helmet
   - Configure proper CORS settings
   - Run as non-root user in containers

5. **Deployment and Scaling:**
   - Use containerization with Docker
   - Implement horizontal scaling with Kubernetes
   - Configure auto-scaling based on metrics
   - Use rolling updates for zero-downtime deployments
   - Implement proper resource limits and requests

By implementing these optimization and monitoring strategies, you can ensure your Node.js applications are production-ready, performant, and resilient under load.

### Q9: How do you work with streams in Node.js?
**Difficulty: Medium**

**Answer:**
Streams are one of Node.js's most powerful features, allowing you to process data piece by piece without loading the entire dataset into memory. This makes streams ideal for handling large files, network communications, and other I/O operations efficiently.

**1. Understanding Node.js Streams:**

Streams are instances of EventEmitter that implement additional methods for data flow control. There are four fundamental types of streams in Node.js:

- **Readable**: Sources of data (e.g., reading from a file)
- **Writable**: Destinations for data (e.g., writing to a file)
- **Duplex**: Both readable and writable (e.g., TCP sockets)
- **Transform**: Duplex streams that can modify data as it's read or written (e.g., compression/decompression)

**2. Working with Readable Streams:**

```javascript
const fs = require('fs');

// Create a readable stream from a large file
const readableStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024, // 64KB chunks
});

// Event-based approach
readableStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data`);
  // Process the chunk
});

readableStream.on('end', () => {
  console.log('Finished reading the file');
});

readableStream.on('error', (error) => {
  console.error('Error reading the file:', error);
});

// Pause/resume to control flow
process.stdin.on('data', (input) => {
  if (input.toString().trim() === 'pause') {
    console.log('Pausing the stream');
    readableStream.pause();
  } else if (input.toString().trim() === 'resume') {
    console.log('Resuming the stream');
    readableStream.resume();
  }
});
```

**3. Working with Writable Streams:**

```javascript
const fs = require('fs');

// Create a writable stream to a file
const writableStream = fs.createWriteStream('output-file.txt', {
  flags: 'w',
  encoding: 'utf8',
});

// Write data to the stream
for (let i = 0; i < 100; i++) {
  const data = `Line ${i}: ${new Date().toISOString()}\n`;
  
  // Check if we should continue writing
  const canContinue = writableStream.write(data);
  
  if (!canContinue) {
    console.log('Backpressure detected, waiting for drain event');
    // Wait for the 'drain' event before writing more data
    await new Promise(resolve => writableStream.once('drain', resolve));
    console.log('Drain event received, continuing to write');
  }
}

// End the stream when done
writableStream.end('\nEnd of file\n', () => {
  console.log('Finished writing to the file');
});

writableStream.on('error', (error) => {
  console.error('Error writing to the file:', error);
});
```

**4. Piping Streams:**

Piping is a mechanism to connect a readable stream's output to a writable stream's input automatically.

```javascript
const fs = require('fs');
const zlib = require('zlib');

// Create a file compression pipeline
const sourceFile = fs.createReadStream('large-file.txt');
const destinationFile = fs.createWriteStream('large-file.txt.gz');
const gzipStream = zlib.createGzip();

// Pipe the streams together
sourceFile
  .pipe(gzipStream)
  .pipe(destinationFile);

// Handle events
sourceFile.on('error', (err) => {
  console.error('Error reading source file:', err);
});

gzipStream.on('error', (err) => {
  console.error('Error compressing data:', err);
});

destinationFile.on('error', (err) => {
  console.error('Error writing to destination file:', err);
});

destinationFile.on('finish', () => {
  console.log('File successfully compressed');
});
```

**5. Creating Custom Streams:**

**Custom Readable Stream:**
```javascript
const { Readable } = require('stream');

class CounterStream extends Readable {
  constructor(max) {
    super();
    this.max = max;
    this.counter = 0;
  }
  
  _read() {
    this.counter++;
    
    if (this.counter <= this.max) {
      const data = `${this.counter}\n`;
      // Use setTimeout to avoid stack overflow for large numbers
      setTimeout(() => {
        this.push(data);
      }, 0);
    } else {
      // Signal the end of the stream
      this.push(null);
    }
  }
}

// Usage
const counterStream = new CounterStream(1000000);
counterStream.pipe(process.stdout);
```

**Custom Writable Stream:**
```javascript
const { Writable } = require('stream');

class ConsoleLogStream extends Writable {
  constructor(options) {
    super(options);
    this.count = 0;
  }
  
  _write(chunk, encoding, callback) {
    this.count++;
    console.log(`[${this.count}] ${chunk.toString().trim()}`);
    callback();
  }
}

// Usage
const logger = new ConsoleLogStream();
process.stdin.pipe(logger);
```

**Custom Transform Stream:**
```javascript
const { Transform } = require('stream');

class UppercaseTransform extends Transform {
  constructor(options) {
    super(options);
  }
  
  _transform(chunk, encoding, callback) {
    // Convert the chunk to uppercase
    const upperCaseChunk = chunk.toString().toUpperCase();
    this.push(upperCaseChunk);
    callback();
  }
}

// Usage
const uppercaser = new UppercaseTransform();
process.stdin
  .pipe(uppercaser)
  .pipe(process.stdout);
```

**6. Stream Error Handling:**

```javascript
const fs = require('fs');
const { pipeline } = require('stream');
const zlib = require('zlib');

// Using pipeline for better error handling
pipeline(
  fs.createReadStream('source-file.txt'),
  zlib.createGzip(),
  fs.createWriteStream('destination-file.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed:', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);

// With async/await
async function compressFile(source, destination) {
  const { pipeline } = require('stream/promises');
  
  try {
    await pipeline(
      fs.createReadStream(source),
      zlib.createGzip(),
      fs.createWriteStream(destination)
    );
    console.log(`${source} was compressed to ${destination}`);
  } catch (err) {
    console.error('Pipeline failed:', err);
  }
}

compressFile('large-file.txt', 'large-file.txt.gz');
```

**7. Handling Backpressure:**

Backpressure occurs when a writable stream's receiving end can't keep up with the readable stream's data production rate.

```javascript
const fs = require('fs');
const { PassThrough } = require('stream');

// Create a throttled stream to demonstrate backpressure handling
class ThrottledStream extends PassThrough {
  constructor(options) {
    super(options);
    this.delay = options?.delay || 100; // ms
  }
  
  _write(chunk, encoding, callback) {
    // Simulate slow processing
    setTimeout(() => {
      super._write(chunk, encoding, callback);
    }, this.delay);
  }
}

async function copyFileWithThrottling(source, destination) {
  const readStream = fs.createReadStream(source, { highWaterMark: 64 * 1024 }); // 64KB chunks
  const throttledStream = new ThrottledStream({ delay: 50 });
  const writeStream = fs.createWriteStream(destination);
  
  // Monitor backpressure
  let backpressureCount = 0;
  
  readStream.on('data', (chunk) => {
    // Check if the throttled stream is applying backpressure
    const canContinue = throttledStream.write(chunk);
    
    if (!canContinue) {
      backpressureCount++;
      console.log(`Backpressure detected (${backpressureCount} times), pausing read stream`);
      readStream.pause();
      
      // Resume reading when the throttled stream drains
      throttledStream.once('drain', () => {
        console.log('Backpressure relieved, resuming read stream');
        readStream.resume();
      });
    }
  });
  
  // Connect the throttled stream to the write stream
  throttledStream.pipe(writeStream);
  
  // Handle events
  readStream.on('end', () => {
    console.log('Read stream ended');
    throttledStream.end();
  });
  
  writeStream.on('finish', () => {
    console.log(`File copied to ${destination} with ${backpressureCount} backpressure events`);
  });
  
  // Handle errors
  readStream.on('error', (err) => console.error('Read error:', err));
  throttledStream.on('error', (err) => console.error('Throttle error:', err));
  writeStream.on('error', (err) => console.error('Write error:', err));
}

copyFileWithThrottling('large-video.mp4', 'copy-video.mp4');
```

**8. Working with Object Mode Streams:**

Object mode streams can process JavaScript objects instead of just buffers and strings.

```javascript
const { Transform } = require('stream');

// Create a transform stream that works with objects
class ObjectTransformer extends Transform {
  constructor(options) {
    // Enable object mode
    super({ objectMode: true, ...options });
  }
  
  _transform(chunk, encoding, callback) {
    // Process the object
    if (typeof chunk === 'object') {
      // Add a timestamp to each object
      chunk.processedAt = new Date().toISOString();
      
      // Filter out objects with score less than 50
      if (chunk.score >= 50) {
        this.push(chunk);
      }
    }
    callback();
  }
}

// Example usage with an array of objects
const { Readable, Writable } = require('stream');

// Create a readable stream from an array of objects
function createObjectStream(array) {
  const readableStream = new Readable({
    objectMode: true,
    read() {
      if (array.length === 0) {
        this.push(null);
        return;
      }
      const item = array.shift();
      this.push(item);
    }
  });
  return readableStream;
}

// Create a writable stream that logs objects
const objectLogger = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    console.log('Processed object:', JSON.stringify(chunk, null, 2));
    callback();
  }
});

// Sample data
const data = [
  { id: 1, name: 'Item 1', score: 75 },
  { id: 2, name: 'Item 2', score: 30 },
  { id: 3, name: 'Item 3', score: 95 },
  { id: 4, name: 'Item 4', score: 45 },
  { id: 5, name: 'Item 5', score: 60 }
];

// Process the data through the pipeline
const objectStream = createObjectStream(data);
const transformer = new ObjectTransformer();

objectStream
  .pipe(transformer)
  .pipe(objectLogger);
```

**9. Stream Utilities and Best Practices:**

**Using stream.finished() for Cleanup:**
```javascript
const fs = require('fs');
const { finished } = require('stream');

const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('copy-file.txt');

readStream.pipe(writeStream);

// Use finished to handle completion or errors
finished(writeStream, (err) => {
  if (err) {
    console.error('Stream failed:', err);
  } else {
    console.log('Stream completed successfully');
    // Perform cleanup operations
  }
});
```

**Using stream.Readable.from() for Iterables:**
```javascript
const { Readable } = require('stream');

async function* generateData() {
  for (let i = 0; i < 100; i++) {
    // Simulate async data generation
    await new Promise(resolve => setTimeout(resolve, 100));
    yield `Item ${i}\n`;
  }
}

// Create a readable stream from an async generator
const readableFromGenerator = Readable.from(generateData());
readableFromGenerator.pipe(process.stdout);
```

**10. Real-world Examples:**

**CSV Processing with Streams:**
```javascript
const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');

// Create a transform stream to filter and transform CSV data
class DataTransformer extends Transform {
  constructor(options) {
    super({ objectMode: true, ...options });
    this.totalRows = 0;
    this.passedRows = 0;
  }
  
  _transform(row, encoding, callback) {
    this.totalRows++;
    
    // Filter rows based on a condition
    if (parseFloat(row.amount) > 1000) {
      this.passedRows++;
      
      // Transform the data
      const transformedRow = {
        customerName: `${row.first_name} ${row.last_name}`,
        amount: parseFloat(row.amount),
        date: new Date(row.date).toISOString().split('T')[0],
        category: row.category.toUpperCase(),
      };
      
      this.push(transformedRow);
    }
    
    callback();
  }
  
  _flush(callback) {
    console.log(`Processed ${this.totalRows} rows, ${this.passedRows} passed the filter`);
    callback();
  }
}

// Create a writable stream to output JSON
const outputStream = fs.createWriteStream('large-transactions.json');

// Write the opening bracket for the JSON array
outputStream.write('[\n');

let isFirstItem = true;

// Process the CSV file
fs.createReadStream('transactions.csv')
  .pipe(csv())
  .pipe(new DataTransformer())
  .on('data', (data) => {
    // Add comma between items, but not before the first item
    const prefix = isFirstItem ? '' : ',\n';
    isFirstItem = false;
    
    // Write each item as JSON
    outputStream.write(`${prefix}  ${JSON.stringify(data)}`);
  })
  .on('end', () => {
    // Write the closing bracket for the JSON array
    outputStream.write('\n]\n');
    outputStream.end();
    console.log('CSV processing completed');
  });
```

**HTTP File Upload with Progress:**
```javascript
const http = require('http');
const fs = require('fs');
const { PassThrough } = require('stream');

// Create a server to handle file uploads
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    // Get the content length if available
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    let bytesReceived = 0;
    
    // Create a pass-through stream to track progress
    const progressStream = new PassThrough();
    
    // Track upload progress
    progressStream.on('data', (chunk) => {
      bytesReceived += chunk.length;
      
      if (contentLength) {
        const progress = Math.round((bytesReceived / contentLength) * 100);
        console.log(`Upload progress: ${progress}%`);
      } else {
        console.log(`Received ${bytesReceived} bytes`);
      }
    });
    
    // Create a write stream to save the file
    const fileStream = fs.createWriteStream(`upload-${Date.now()}.dat`);
    
    // Pipe the request through the progress stream to the file
    req
      .pipe(progressStream)
      .pipe(fileStream);
    
    // Handle completion
    fileStream.on('finish', () => {
      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        message: 'File uploaded successfully',
        size: bytesReceived
      }));
    });
    
    // Handle errors
    req.on('error', (err) => {
      console.error('Upload error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ success: false, error: 'Upload failed' }));
    });
    
    fileStream.on('error', (err) => {
      console.error('File write error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ success: false, error: 'Failed to save file' }));
    });
  } else {
    // Handle other requests
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

**Key Benefits of Using Streams in Node.js:**

1. **Memory Efficiency**: Process large datasets without loading everything into memory
2. **Time Efficiency**: Start processing data as soon as it's available
3. **Composability**: Chain multiple stream operations together
4. **Backpressure Handling**: Automatically manage the flow of data between fast and slow components
5. **Abstraction**: Work with data regardless of its source or destination

**Best Practices for Working with Streams:**

1. **Always handle errors**: Attach error listeners to all streams in your pipeline
2. **Use pipeline() or stream.pipeline()**: For proper error propagation and resource cleanup
3. **Implement backpressure handling**: Respect the return value of write() and pause/resume as needed
4. **Set appropriate highWaterMark**: Tune buffer sizes based on your application's needs
5. **Avoid mixing synchronous and asynchronous operations**: Keep stream processing asynchronous
6. **Close streams properly**: Call end() on writable streams when done
7. **Use object mode when appropriate**: For processing JavaScript objects instead of binary data
8. **Consider stream libraries**: Use established packages like 'through2' or 'split2' for common operations

Streams are a fundamental concept in Node.js that enable efficient data processing across various domains, from file systems to network communications. By understanding and properly implementing streams, you can build highly performant and resource-efficient Node.js applications.

### Q10: What are the common design patterns used in Node.js applications?
**Difficulty: Hard**

**Answer:**
Design patterns are proven solutions to recurring problems in software design. In Node.js applications, several design patterns are commonly used to solve specific challenges related to asynchronous programming, scalability, and maintainability.

**1. Singleton Pattern:**

The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for shared resources like database connections, configuration managers, or logging services.

```javascript
// database.js - Singleton pattern for database connection
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = null;
    this.connectionString = process.env.DB_CONNECTION_STRING;
    Database.instance = this;
  }

  connect() {
    if (this.connection) {
      return Promise.resolve(this.connection);
    }
    
    // Simulate database connection
    return new Promise((resolve, reject) => {
      console.log('Connecting to database...');
      setTimeout(() => {
        this.connection = { id: Math.random().toString(36).substr(2, 9) };
        console.log(`Connected to database with connection id: ${this.connection.id}`);
        resolve(this.connection);
      }, 100);
    });
  }
  
  query(sql) {
    if (!this.connection) {
      throw new Error('Database not connected. Call connect() first.');
    }
    
    return new Promise((resolve) => {
      console.log(`Executing query: ${sql}`);
      setTimeout(() => {
        resolve([{ id: 1, name: 'Sample data' }]);
      }, 50);
    });
  }
}

// Usage
module.exports = new Database();
```

```javascript
// Usage in different files
const db = require('./database');

async function main() {
  await db.connect();
  const users = await db.query('SELECT * FROM users');
  console.log(users);
}

main().catch(console.error);
```

**2. Factory Pattern:**

The Factory pattern provides an interface for creating objects without specifying their concrete classes, allowing for flexibility in object creation.

```javascript
// logger-factory.js
class ConsoleLogger {
  log(message) {
    console.log(`[Console]: ${message}`);
  }
  
  error(message) {
    console.error(`[Console ERROR]: ${message}`);
  }
}

class FileLogger {
  constructor(filename) {
    this.filename = filename;
    console.log(`File logger initialized with file: ${filename}`);
  }
  
  log(message) {
    console.log(`[File ${this.filename}]: ${message}`);
    // In a real implementation, would write to the file
  }
  
  error(message) {
    console.error(`[File ${this.filename} ERROR]: ${message}`);
    // In a real implementation, would write to the file
  }
}

class CloudLogger {
  constructor(endpoint) {
    this.endpoint = endpoint;
    console.log(`Cloud logger initialized with endpoint: ${endpoint}`);
  }
  
  log(message) {
    console.log(`[Cloud ${this.endpoint}]: ${message}`);
    // In a real implementation, would send to cloud service
  }
  
  error(message) {
    console.error(`[Cloud ${this.endpoint} ERROR]: ${message}`);
    // In a real implementation, would send to cloud service
  }
}

class LoggerFactory {
  static createLogger(type, options = {}) {
    switch (type.toLowerCase()) {
      case 'console':
        return new ConsoleLogger();
      case 'file':
        if (!options.filename) {
          throw new Error('Filename is required for file logger');
        }
        return new FileLogger(options.filename);
      case 'cloud':
        if (!options.endpoint) {
          throw new Error('Endpoint is required for cloud logger');
        }
        return new CloudLogger(options.endpoint);
      default:
        throw new Error(`Logger type '${type}' not supported`);
    }
  }
}

module.exports = LoggerFactory;
```

```javascript
// Usage
const LoggerFactory = require('./logger-factory');

// Create different types of loggers
const consoleLogger = LoggerFactory.createLogger('console');
const fileLogger = LoggerFactory.createLogger('file', { filename: 'app.log' });
const cloudLogger = LoggerFactory.createLogger('cloud', { endpoint: 'https://logging-service.example.com' });

// Use the loggers
consoleLogger.log('This is a console log message');
fileLogger.error('This is a file error message');
cloudLogger.log('This is a cloud log message');
```

**3. Module Pattern:**

The Module pattern encapsulates private functionality while exposing a public API. Node.js's CommonJS module system inherently supports this pattern.

```javascript
// user-service.js
const crypto = require('crypto');
const db = require('./database'); // Our singleton database

// Private functions
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, storedHash) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return storedHash === hash;
}

// Public API
module.exports = {
  async createUser(username, password) {
    const connection = await db.connect();
    const { salt, hash } = hashPassword(password);
    
    // In a real app, would insert into database
    console.log(`Creating user: ${username} with hashed password`);
    return { id: Date.now(), username, created: new Date() };
  },
  
  async authenticateUser(username, password) {
    const connection = await db.connect();
    
    // In a real app, would fetch from database
    console.log(`Authenticating user: ${username}`);
    
    // Simulate fetching user from database
    const mockSalt = 'abc123';
    const mockHash = crypto.pbkdf2Sync(password, mockSalt, 1000, 64, 'sha512').toString('hex');
    
    if (verifyPassword(password, mockSalt, mockHash)) {
      return { id: 1, username, role: 'user' };
    }
    
    return null;
  }
};
```

**4. Observer Pattern:**

The Observer pattern allows objects to subscribe to events and be notified when those events occur. Node.js's EventEmitter is an implementation of this pattern.

```javascript
const EventEmitter = require('events');

// Order processing system with events
class OrderProcessor extends EventEmitter {
  constructor() {
    super();
    this.orders = new Map();
  }
  
  placeOrder(userId, products) {
    const orderId = Date.now().toString();
    const order = {
      id: orderId,
      userId,
      products,
      status: 'placed',
      createdAt: new Date()
    };
    
    this.orders.set(orderId, order);
    
    // Emit event that a new order was placed
    this.emit('orderPlaced', order);
    
    return orderId;
  }
  
  updateOrderStatus(orderId, status) {
    if (!this.orders.has(orderId)) {
      throw new Error(`Order ${orderId} not found`);
    }
    
    const order = this.orders.get(orderId);
    const oldStatus = order.status;
    order.status = status;
    order.updatedAt = new Date();
    
    // Emit event that order status changed
    this.emit('statusChanged', { orderId, oldStatus, newStatus: status, order });
    
    // Emit specific events based on status
    if (status === 'shipped') {
      this.emit('orderShipped', order);
    } else if (status === 'delivered') {
      this.emit('orderDelivered', order);
    } else if (status === 'cancelled') {
      this.emit('orderCancelled', order);
    }
    
    return order;
  }
}

// Usage
const processor = new OrderProcessor();

// Register observers (event listeners)
processor.on('orderPlaced', (order) => {
  console.log(`New order placed: ${order.id} by user ${order.userId}`);
  // Notify inventory system
});

processor.on('statusChanged', ({ orderId, oldStatus, newStatus }) => {
  console.log(`Order ${orderId} status changed from ${oldStatus} to ${newStatus}`);
  // Update order history
});

processor.on('orderShipped', (order) => {
  console.log(`Order ${order.id} has been shipped! Notifying customer...`);
  // Send shipping notification email
});

processor.on('orderDelivered', (order) => {
  console.log(`Order ${order.id} has been delivered! Requesting feedback...`);
  // Send delivery confirmation and feedback request
});

// Place an order
const orderId = processor.placeOrder('user123', [
  { id: 'prod1', name: 'Product 1', price: 29.99, quantity: 2 },
  { id: 'prod2', name: 'Product 2', price: 49.99, quantity: 1 }
]);

// Update order status (this will trigger events)
setTimeout(() => {
  processor.updateOrderStatus(orderId, 'processing');
}, 1000);

setTimeout(() => {
  processor.updateOrderStatus(orderId, 'shipped');
}, 2000);

setTimeout(() => {
  processor.updateOrderStatus(orderId, 'delivered');
}, 3000);
```

**5. Middleware Pattern:**

The Middleware pattern allows you to process requests through a chain of functions. Express.js heavily uses this pattern.

```javascript
class MiddlewareManager {
  constructor() {
    this.middlewares = [];
  }
  
  use(middleware) {
    this.middlewares.push(middleware);
    return this; // For chaining
  }
  
  async execute(context) {
    let index = 0;
    
    const next = async () => {
      // If we've run out of middleware, just return
      if (index >= this.middlewares.length) {
        return;
      }
      
      // Get the current middleware and increment the index
      const middleware = this.middlewares[index++];
      
      // Execute the middleware with the context and next function
      await middleware(context, next);
    };
    
    // Start the middleware chain
    await next();
    
    return context;
  }
}

// Usage example - Request processing pipeline
async function main() {
  const pipeline = new MiddlewareManager();
  
  // Add authentication middleware
  pipeline.use(async (context, next) => {
    console.log('Authenticating request...');
    context.user = { id: 123, name: 'John Doe', role: 'admin' };
    await next(); // Continue to next middleware
  });
  
  // Add authorization middleware
  pipeline.use(async (context, next) => {
    console.log('Checking authorization...');
    if (context.user.role !== 'admin') {
      context.error = 'Unauthorized';
      return; // Stop the pipeline if unauthorized
    }
    await next(); // Continue to next middleware
  });
  
  // Add logging middleware
  pipeline.use(async (context, next) => {
    console.log(`Request received: ${context.path}`);
    const startTime = Date.now();
    
    await next(); // Continue to next middleware
    
    const duration = Date.now() - startTime;
    console.log(`Request completed in ${duration}ms`);
  });
  
  // Add business logic middleware
  pipeline.use(async (context, next) => {
    console.log('Processing request...');
    context.result = { success: true, data: { message: 'Hello, world!' } };
    await next();
  });
  
  // Execute the pipeline with a request context
  const context = { path: '/api/data', method: 'GET' };
  const result = await pipeline.execute(context);
  
  console.log('Final context:', result);
}

main().catch(console.error);
```

**6. Repository Pattern:**

The Repository pattern abstracts the data layer, providing a clean API for data access regardless of the underlying data source.

```javascript
// user-repository.js
class UserRepository {
  constructor(db) {
    this.db = db;
    this.collection = 'users';
  }
  
  async findById(id) {
    await this.db.connect();
    return this.db.query(`SELECT * FROM ${this.collection} WHERE id = ${id}`);
  }
  
  async findByEmail(email) {
    await this.db.connect();
    return this.db.query(`SELECT * FROM ${this.collection} WHERE email = '${email}'`);
  }
  
  async create(userData) {
    await this.db.connect();
    const id = Date.now();
    console.log(`Creating user with id ${id}:`, userData);
    return { id, ...userData, createdAt: new Date() };
  }
  
  async update(id, userData) {
    await this.db.connect();
    console.log(`Updating user ${id} with:`, userData);
    return { id, ...userData, updatedAt: new Date() };
  }
  
  async delete(id) {
    await this.db.connect();
    console.log(`Deleting user ${id}`);
    return { success: true };
  }
}

// order-repository.js
class OrderRepository {
  constructor(db) {
    this.db = db;
    this.collection = 'orders';
  }
  
  async findById(id) {
    await this.db.connect();
    return this.db.query(`SELECT * FROM ${this.collection} WHERE id = ${id}`);
  }
  
  async findByUserId(userId) {
    await this.db.connect();
    return this.db.query(`SELECT * FROM ${this.collection} WHERE userId = ${userId}`);
  }
  
  async create(orderData) {
    await this.db.connect();
    const id = Date.now();
    console.log(`Creating order with id ${id}:`, orderData);
    return { id, ...orderData, createdAt: new Date() };
  }
  
  // Other methods...
}

// Usage
const db = require('./database'); // Our singleton database
const userRepo = new UserRepository(db);
const orderRepo = new OrderRepository(db);

async function main() {
  // Create a user
  const user = await userRepo.create({
    name: 'Jane Doe',
    email: 'jane@example.com'
  });
  
  // Create an order for the user
  const order = await orderRepo.create({
    userId: user.id,
    products: [
      { id: 'prod1', quantity: 2, price: 29.99 }
    ],
    total: 59.98
  });
  
  // Find user's orders
  const userOrders = await orderRepo.findByUserId(user.id);
  console.log(`Found ${userOrders.length} orders for user ${user.id}`);
}

main().catch(console.error);
```

**7. Dependency Injection Pattern:**

The Dependency Injection pattern provides components with their dependencies rather than having components create or find dependencies themselves.

```javascript
// services/email-service.js
class EmailService {
  async sendEmail(to, subject, body) {
    console.log(`Sending email to ${to} with subject: ${subject}`);
    // Implementation would use a real email provider
    return { success: true, messageId: `msg_${Date.now()}` };
  }
}

// services/notification-service.js
class NotificationService {
  constructor(emailService) {
    this.emailService = emailService;
  }
  
  async notifyUser(user, message) {
    console.log(`Notifying user ${user.id} with message: ${message}`);
    return this.emailService.sendEmail(
      user.email,
      'New Notification',
      `Hello ${user.name},\n\n${message}\n\nRegards,\nThe Team`
    );
  }
}

// services/user-service.js
class UserService {
  constructor(userRepository, notificationService) {
    this.userRepository = userRepository;
    this.notificationService = notificationService;
  }
  
  async createUser(userData) {
    const user = await this.userRepository.create(userData);
    
    // Notify about account creation
    await this.notificationService.notifyUser(
      user,
      'Your account has been created successfully!'
    );
    
    return user;
  }
  
  async getUserById(id) {
    return this.userRepository.findById(id);
  }
}

// Container for dependency injection
class Container {
  constructor() {
    this.services = new Map();
    this.factories = new Map();
  }
  
  register(name, instance) {
    this.services.set(name, instance);
    return this;
  }
  
  factory(name, factory) {
    this.factories.set(name, factory);
    return this;
  }
  
  get(name) {
    // Return existing instance if available
    if (this.services.has(name)) {
      return this.services.get(name);
    }
    
    // Create new instance using factory if available
    if (this.factories.has(name)) {
      const factory = this.factories.get(name);
      const instance = factory(this);
      this.services.set(name, instance);
      return instance;
    }
    
    throw new Error(`Service '${name}' not registered`);
  }
}

// Usage
const db = require('./database'); // Our singleton database
const UserRepository = require('./user-repository');

// Set up the container
const container = new Container();

// Register services
container.register('db', db);
container.register('emailService', new EmailService());

// Register factories for services that need dependencies
container.factory('userRepository', (c) => new UserRepository(c.get('db')));
container.factory('notificationService', (c) => new NotificationService(c.get('emailService')));
container.factory('userService', (c) => new UserService(
  c.get('userRepository'),
  c.get('notificationService')
));

// Use the services
async function main() {
  const userService = container.get('userService');
  
  const user = await userService.createUser({
    name: 'Alice Smith',
    email: 'alice@example.com'
  });
  
  console.log('Created user:', user);
}

main().catch(console.error);
```

**8. Strategy Pattern:**

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

```javascript
// Payment processor with different strategies

// Payment strategy interface
class PaymentStrategy {
  async processPayment(amount, currency) {
    throw new Error('processPayment method must be implemented');
  }
}

// Credit card payment strategy
class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber, cardholderName, expiryDate, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.cardholderName = cardholderName;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
  }
  
  async processPayment(amount, currency) {
    console.log(`Processing credit card payment of ${amount} ${currency}`);
    console.log(`Using card ending with ${this.cardNumber.slice(-4)}`);
    
    // In a real implementation, would call a payment gateway
    return {
      success: true,
      transactionId: `cc_${Date.now()}`,
      amount,
      currency,
      timestamp: new Date()
    };
  }
}

// PayPal payment strategy
class PayPalStrategy extends PaymentStrategy {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
  
  async processPayment(amount, currency) {
    console.log(`Processing PayPal payment of ${amount} ${currency}`);
    console.log(`Using PayPal account: ${this.email}`);
    
    // In a real implementation, would call PayPal API
    return {
      success: true,
      transactionId: `pp_${Date.now()}`,
      amount,
      currency,
      timestamp: new Date()
    };
  }
}

// Cryptocurrency payment strategy
class CryptoStrategy extends PaymentStrategy {
  constructor(walletAddress, currency) {
    super();
    this.walletAddress = walletAddress;
    this.cryptoCurrency = currency;
  }
  
  async processPayment(amount, currency) {
    console.log(`Processing ${this.cryptoCurrency} payment equivalent to ${amount} ${currency}`);
    console.log(`Using wallet: ${this.walletAddress}`);
    
    // In a real implementation, would call crypto payment processor
    return {
      success: true,
      transactionId: `crypto_${Date.now()}`,
      amount,
      currency,
      cryptoAmount: amount * 0.000023, // Example conversion
      cryptoCurrency: this.cryptoCurrency,
      timestamp: new Date()
    };
  }
}

// Payment processor that uses strategies
class PaymentProcessor {
  constructor() {
    this.strategy = null;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  async processPayment(amount, currency = 'USD') {
    if (!this.strategy) {
      throw new Error('Payment strategy not set');
    }
    
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    return this.strategy.processPayment(amount, currency);
  }
}

// Usage
async function main() {
  const processor = new PaymentProcessor();
  
  // Process payment with credit card
  processor.setStrategy(new CreditCardStrategy(
    '4111111111111111',
    'John Doe',
    '12/2025',
    '123'
  ));
  
  let result = await processor.processPayment(99.99);
  console.log('Credit card payment result:', result);
  
  // Process payment with PayPal
  processor.setStrategy(new PayPalStrategy(
    'john.doe@example.com',
    'password123'
  ));
  
  result = await processor.processPayment(59.99, 'EUR');
  console.log('PayPal payment result:', result);
  
  // Process payment with cryptocurrency
  processor.setStrategy(new CryptoStrategy(
    '0x1234567890abcdef1234567890abcdef12345678',
    'ETH'
  ));
  
  result = await processor.processPayment(199.99);
  console.log('Crypto payment result:', result);
}

main().catch(console.error);
```

**9. Proxy Pattern:**

The Proxy pattern provides a surrogate or placeholder for another object to control access to it.

```javascript
// API service with caching proxy
class ApiService {
  async fetchData(endpoint) {
    console.log(`Making API request to ${endpoint}...`);
    
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          id: Math.floor(Math.random() * 1000),
          endpoint,
          timestamp: Date.now(),
          data: { message: 'Data from API' }
        };
        resolve(data);
      }, 1000); // Simulate 1 second API delay
    });
  }
}

// Caching proxy for API service
class CachingApiServiceProxy {
  constructor(apiService, ttlMs = 60000) { // Default TTL: 1 minute
    this.apiService = apiService;
    this.cache = new Map();
    this.ttlMs = ttlMs;
  }
  
  async fetchData(endpoint) {
    const cacheKey = endpoint;
    
    // Check if we have a cached response that hasn't expired
    if (this.cache.has(cacheKey)) {
      const { data, timestamp } = this.cache.get(cacheKey);
      const age = Date.now() - timestamp;
      
      if (age < this.ttlMs) {
        console.log(`Cache hit for ${endpoint} (age: ${age}ms)`);
        return data;
      } else {
        console.log(`Cache expired for ${endpoint} (age: ${age}ms)`);
        this.cache.delete(cacheKey);
      }
    }
    
    // Cache miss or expired, make the actual API call
    console.log(`Cache miss for ${endpoint}, fetching fresh data`);
    const data = await this.apiService.fetchData(endpoint);
    
    // Store in cache
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  clearCache() {
    console.log('Clearing entire cache');
    this.cache.clear();
  }
  
  invalidate(endpoint) {
    console.log(`Invalidating cache for ${endpoint}`);
    this.cache.delete(endpoint);
  }
}

// Usage
async function main() {
  const apiService = new ApiService();
  const cachedApiService = new CachingApiServiceProxy(apiService, 5000); // 5 second TTL
  
  console.log('First request (cache miss):');
  await cachedApiService.fetchData('/users');
  
  console.log('\nSecond request (should be cached):');
  await cachedApiService.fetchData('/users');
  
  console.log('\nThird request to different endpoint (cache miss):');
  await cachedApiService.fetchData('/products');
  
  console.log('\nWaiting for cache to expire...');
  await new Promise(resolve => setTimeout(resolve, 6000)); // Wait longer than TTL
  
  console.log('\nRequest after expiry (should be cache miss):');
  await cachedApiService.fetchData('/users');
}

main().catch(console.error);
```

**10. Chain of Responsibility Pattern:**

The Chain of Responsibility pattern passes a request along a chain of handlers, with each handler deciding whether to process the request or pass it to the next handler.

```javascript
// Request validation chain

// Base handler class
class ValidationHandler {
  constructor() {
    this.nextHandler = null;
  }
  
  setNext(handler) {
    this.nextHandler = handler;
    return handler; // Return for chaining
  }
  
  async validate(request) {
    if (this.nextHandler) {
      return this.nextHandler.validate(request);
    }
    
    return true; // End of chain, validation passed
  }
}

// Required fields validator
class RequiredFieldsValidator extends ValidationHandler {
  constructor(requiredFields) {
    super();
    this.requiredFields = requiredFields;
  }
  
  async validate(request) {
    console.log('Validating required fields...');
    
    for (const field of this.requiredFields) {
      if (!request[field]) {
        throw new Error(`Validation failed: Missing required field '${field}'`);
      }
    }
    
    return super.validate(request);
  }
}

// Type validator
class TypeValidator extends ValidationHandler {
  constructor(fieldTypes) {
    super();
    this.fieldTypes = fieldTypes;
  }
  
  async validate(request) {
    console.log('Validating field types...');
    
    for (const [field, expectedType] of Object.entries(this.fieldTypes)) {
      if (field in request) {
        const value = request[field];
        let valid = false;
        
        switch (expectedType) {
          case 'string':
            valid = typeof value === 'string';
            break;
          case 'number':
            valid = typeof value === 'number' && !isNaN(value);
            break;
          case 'boolean':
            valid = typeof value === 'boolean';
            break;
          case 'array':
            valid = Array.isArray(value);
            break;
          case 'object':
            valid = typeof value === 'object' && value !== null && !Array.isArray(value);
            break;
          case 'email':
            valid = typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
          default:
            throw new Error(`Unknown type: ${expectedType}`);
        }
        
        if (!valid) {
          throw new Error(`Validation failed: Field '${field}' should be of type '${expectedType}'`);
        }
      }
    }
    
    return super.validate(request);
  }
}

// Range validator
class RangeValidator extends ValidationHandler {
  constructor(fieldRanges) {
    super();
    this.fieldRanges = fieldRanges;
  }
  
  async validate(request) {
    console.log('Validating value ranges...');
    
    for (const [field, range] of Object.entries(this.fieldRanges)) {
      if (field in request) {
        const value = request[field];
        
        if (typeof value === 'number') {
          if (range.min !== undefined && value < range.min) {
            throw new Error(`Validation failed: Field '${field}' should be at least ${range.min}`);
          }
          
          if (range.max !== undefined && value > range.max) {
            throw new Error(`Validation failed: Field '${field}' should be at most ${range.max}`);
          }
        } else if (typeof value === 'string') {
          if (range.minLength !== undefined && value.length < range.minLength) {
            throw new Error(`Validation failed: Field '${field}' should have at least ${range.minLength} characters`);
          }
          
          if (range.maxLength !== undefined && value.length > range.maxLength) {
            throw new Error(`Validation failed: Field '${field}' should have at most ${range.maxLength} characters`);
          }
        } else if (Array.isArray(value)) {
          if (range.minItems !== undefined && value.length < range.minItems) {
            throw new Error(`Validation failed: Field '${field}' should have at least ${range.minItems} items`);
          }
          
          if (range.maxItems !== undefined && value.length > range.maxItems) {
            throw new Error(`Validation failed: Field '${field}' should have at most ${range.maxItems} items`);
          }
        }
      }
    }
    
    return super.validate(request);
  }
}

// Custom business rule validator
class BusinessRuleValidator extends ValidationHandler {
  constructor(rules) {
    super();
    this.rules = rules;
  }
  
  async validate(request) {
    console.log('Validating business rules...');
    
    for (const rule of this.rules) {
      const { name, validate } = rule;
      const valid = await validate(request);
      
      if (!valid) {
        throw new Error(`Business rule validation failed: ${name}`);
      }
    }
    
    return super.validate(request);
  }
}

// Usage
async function main() {
  // Create validation chain
  const requiredValidator = new RequiredFieldsValidator(['username', 'email', 'age']);
  const typeValidator = new TypeValidator({
    username: 'string',
    email: 'email',
    age: 'number',
    isActive: 'boolean',
    tags: 'array'
  });
  const rangeValidator = new RangeValidator({
    username: { minLength: 3, maxLength: 50 },
    age: { min: 18, max: 120 },
    tags: { maxItems: 5 }
  });
  const businessRuleValidator = new BusinessRuleValidator([
    {
      name: 'Username cannot contain spaces',
      validate: (request) => !request.username.includes(' ')
    },
    {
      name: 'Email domain must be allowed',
      validate: (request) => {
        const domain = request.email.split('@')[1];
        const allowedDomains = ['example.com', 'gmail.com', 'outlook.com'];
        return allowedDomains.includes(domain);
      }
    }
  ]);
  
  // Set up the chain
  requiredValidator
    .setNext(typeValidator)
    .setNext(rangeValidator)
    .setNext(businessRuleValidator);
  
  // Valid request
  const validRequest = {
    username: 'johndoe',
    email: 'john@example.com',
    age: 30,
    isActive: true,
    tags: ['user', 'premium']
  };
  
  try {
    console.log('Validating valid request:');
    await requiredValidator.validate(validRequest);
    console.log('Validation passed!\n');
  } catch (error) {
    console.error(`Validation error: ${error.message}\n`);
  }
  
  // Invalid request - missing field
  const invalidRequest1 = {
    username: 'janedoe',
    // email is missing
    age: 25
  };
  
  try {
    console.log('Validating request with missing field:');
    await requiredValidator.validate(invalidRequest1);
    console.log('Validation passed!\n');
  } catch (error) {
    console.error(`Validation error: ${error.message}\n`);
  }
  
  // Invalid request - wrong type
  const invalidRequest2 = {
    username: 'bobsmith',
    email: 'bob@example.com',
    age: 'twenty-eight' // Should be a number
  };
  
  try {
    console.log('Validating request with wrong type:');
    await requiredValidator.validate(invalidRequest2);
    console.log('Validation passed!\n');
  } catch (error) {
    console.error(`Validation error: ${error.message}\n`);
  }
  
  // Invalid request - out of range
  const invalidRequest3 = {
    username: 'al',  // Too short
    email: 'al@example.com',
    age: 150  // Too old
  };
  
  try {
    console.log('Validating request with out-of-range values:');
    await requiredValidator.validate(invalidRequest3);
    console.log('Validation passed!\n');
  } catch (error) {
    console.error(`Validation error: ${error.message}\n`);
  }
  
  // Invalid request - business rule violation
  const invalidRequest4 = {
    username: 'sarah doe',  // Contains space
    email: 'sarah@example.com',
    age: 35
  };
  
  try {
    console.log('Validating request with business rule violation:');
    await requiredValidator.validate(invalidRequest4);
    console.log('Validation passed!\n');
  } catch (error) {
    console.error(`Validation error: ${error.message}\n`);
  }
}

main().catch(console.error);
```

**Key Benefits of Using Design Patterns in Node.js:**

1. **Code Reusability**: Patterns provide proven solutions that can be reused across projects
2. **Maintainability**: Well-structured code following established patterns is easier to maintain
3. **Scalability**: Patterns like Singleton and Repository help manage resources as applications scale
4. **Testability**: Patterns like Dependency Injection make unit testing much easier
5. **Flexibility**: Patterns like Strategy and Factory allow for changing implementations without modifying client code
6. **Communication**: Patterns provide a common vocabulary for developers to discuss architecture

**Best Practices for Implementing Design Patterns:**

1. **Don't Over-Engineer**: Use patterns only when they solve a specific problem, not just for the sake of using them
2. **Understand the Context**: Consider the specific requirements of your Node.js application before applying a pattern
3. **Combine Patterns**: Often, the best solutions involve multiple patterns working together
4. **Keep It Simple**: Start with the simplest solution and introduce patterns as complexity grows
5. **Document Your Patterns**: Make sure other developers understand why and how patterns are used in your codebase
6. **Consider Performance**: Some patterns introduce overhead that may impact performance in high-load scenarios

By understanding and appropriately applying these design patterns, you can build Node.js applications that are more maintainable, scalable, and robust.