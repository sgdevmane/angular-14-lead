# HTML Interview Questions

## Table of Contents
1. [HTML Fundamentals](#html-fundamentals)
2. [HTML5 Semantic Elements](#html5-semantic-elements)
3. [Forms and Input Elements](#forms-and-input-elements)
4. [HTML5 APIs](#html5-apis)
5. [Accessibility (a11y)](#accessibility-a11y)
6. [SEO and Meta Tags](#seo-and-meta-tags)
7. [HTML Performance](#html-performance)
8. [HTML Best Practices](#html-best-practices)
9. [HTML5 Media Elements](#html5-media-elements)
10. [HTML Validation and Standards](#html-validation-and-standards)

---

## HTML Fundamentals

### Q1: What is HTML and how does it work?

**Answer:**
HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure and content of web documents using elements and tags.

**Basic HTML Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
    <meta name="description" content="Page description">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Main Heading</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>Section Heading</h2>
            <p>Paragraph content with <strong>strong text</strong> and <em>emphasized text</em>.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Company Name</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>
```

**HTML Element Anatomy:**
```html
<!-- Element with attributes -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Link text
</a>

<!-- Self-closing elements -->
<img src="image.jpg" alt="Description" width="300" height="200">
<br>
<hr>
<input type="text" name="username" required>

<!-- Nested elements -->
<div class="container">
    <p>This is a <span class="highlight">highlighted</span> word.</p>
</div>
```

---

## HTML5 Semantic Elements

### Q2: What are HTML5 semantic elements and why are they important?

**Answer:**
Semantic elements provide meaning to the structure of web content, making it more accessible and SEO-friendly.

**Semantic Layout Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Semantic HTML Example</title>
</head>
<body>
    <!-- Page header -->
    <header>
        <h1>Website Title</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>
    
    <!-- Main content area -->
    <main>
        <!-- Hero section -->
        <section class="hero">
            <h2>Welcome to Our Website</h2>
            <p>This is the main content area.</p>
        </section>
        
        <!-- Article content -->
        <article>
            <header>
                <h2>Article Title</h2>
                <p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
                <address>By <a href="mailto:author@example.com">John Doe</a></address>
            </header>
            
            <section>
                <h3>Article Section</h3>
                <p>Article content goes here...</p>
                
                <figure>
                    <img src="chart.png" alt="Sales data chart">
                    <figcaption>Sales performance for Q4 2023</figcaption>
                </figure>
            </section>
            
            <aside>
                <h4>Related Links</h4>
                <ul>
                    <li><a href="#related1">Related Article 1</a></li>
                    <li><a href="#related2">Related Article 2</a></li>
                </ul>
            </aside>
        </article>
    </main>
    
    <!-- Sidebar content -->
    <aside class="sidebar">
        <section>
            <h3>Latest News</h3>
            <ul>
                <li><a href="#news1">News Item 1</a></li>
                <li><a href="#news2">News Item 2</a></li>
            </ul>
        </section>
    </aside>
    
    <!-- Page footer -->
    <footer>
        <section>
            <h3>Contact Information</h3>
            <address>
                123 Main Street<br>
                City, State 12345<br>
                <a href="tel:+1234567890">Phone: (123) 456-7890</a><br>
                <a href="mailto:info@example.com">Email: info@example.com</a>
            </address>
        </section>
        
        <small>&copy; 2024 Company Name. All rights reserved.</small>
    </footer>
</body>
</html>
```

**Content Sectioning Elements:**
```html
<!-- Details and Summary -->
<details>
    <summary>Click to expand</summary>
    <p>This content is hidden by default and can be toggled.</p>
</details>

<!-- Mark element for highlighting -->
<p>Search results for <mark>"HTML5"</mark> found 42 matches.</p>

<!-- Progress and Meter -->
<label for="progress">Download progress:</label>
<progress id="progress" value="70" max="100">70%</progress>

<label for="disk-usage">Disk usage:</label>
<meter id="disk-usage" value="0.6" min="0" max="1">60%</meter>

<!-- Dialog element -->
<dialog id="modal">
    <h2>Modal Title</h2>
    <p>Modal content goes here.</p>
    <button onclick="document.getElementById('modal').close()">Close</button>
</dialog>
```

---

## Forms and Input Elements

### Q3: What are the different HTML5 input types and form elements?

**Answer:**
HTML5 introduced many new input types and form features for better user experience and validation.

**HTML5 Input Types:**
```html
<form action="/submit" method="POST" novalidate>
    <!-- Text inputs -->
    <label for="text">Text:</label>
    <input type="text" id="text" name="text" placeholder="Enter text" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="user@example.com" required>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" minlength="8" required>
    
    <label for="tel">Phone:</label>
    <input type="tel" id="tel" name="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890">
    
    <label for="url">Website:</label>
    <input type="url" id="url" name="url" placeholder="https://example.com">
    
    <!-- Number inputs -->
    <label for="number">Number:</label>
    <input type="number" id="number" name="number" min="1" max="100" step="1">
    
    <label for="range">Range:</label>
    <input type="range" id="range" name="range" min="0" max="100" value="50">
    
    <!-- Date and time inputs -->
    <label for="date">Date:</label>
    <input type="date" id="date" name="date" min="2024-01-01" max="2024-12-31">
    
    <label for="time">Time:</label>
    <input type="time" id="time" name="time">
    
    <label for="datetime-local">Date and Time:</label>
    <input type="datetime-local" id="datetime-local" name="datetime-local">
    
    <label for="month">Month:</label>
    <input type="month" id="month" name="month">
    
    <label for="week">Week:</label>
    <input type="week" id="week" name="week">
    
    <!-- File and color inputs -->
    <label for="file">File:</label>
    <input type="file" id="file" name="file" accept=".pdf,.doc,.docx" multiple>
    
    <label for="color">Color:</label>
    <input type="color" id="color" name="color" value="#ff0000">
    
    <!-- Search input -->
    <label for="search">Search:</label>
    <input type="search" id="search" name="search" placeholder="Search...">
    
    <!-- Hidden input -->
    <input type="hidden" name="csrf_token" value="abc123">
    
    <!-- Checkboxes and radio buttons -->
    <fieldset>
        <legend>Preferences</legend>
        
        <input type="checkbox" id="newsletter" name="newsletter" value="yes">
        <label for="newsletter">Subscribe to newsletter</label>
        
        <input type="radio" id="size-small" name="size" value="small">
        <label for="size-small">Small</label>
        
        <input type="radio" id="size-medium" name="size" value="medium" checked>
        <label for="size-medium">Medium</label>
        
        <input type="radio" id="size-large" name="size" value="large">
        <label for="size-large">Large</label>
    </fieldset>
    
    <!-- Select dropdown -->
    <label for="country">Country:</label>
    <select id="country" name="country" required>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
    </select>
    
    <!-- Multi-select -->
    <label for="skills">Skills:</label>
    <select id="skills" name="skills" multiple size="4">
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JavaScript</option>
        <option value="react">React</option>
    </select>
    
    <!-- Textarea -->
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" cols="50" placeholder="Enter your message" maxlength="500"></textarea>
    
    <!-- Datalist for autocomplete -->
    <label for="browser">Choose a browser:</label>
    <input list="browsers" id="browser" name="browser">
    <datalist id="browsers">
        <option value="Chrome">
        <option value="Firefox">
        <option value="Safari">
        <option value="Edge">
    </datalist>
    
    <!-- Submit buttons -->
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
    <input type="submit" value="Submit Form">
</form>
```

**Form Validation:**
```html
<form>
    <!-- Required field -->
    <input type="text" name="username" required>
    
    <!-- Pattern validation -->
    <input type="text" name="zipcode" pattern="[0-9]{5}" title="5-digit zip code">
    
    <!-- Length validation -->
    <input type="password" name="password" minlength="8" maxlength="20">
    
    <!-- Custom validation message -->
    <input type="email" name="email" required 
           oninvalid="this.setCustomValidity('Please enter a valid email address')"
           oninput="this.setCustomValidity('')">
    
    <!-- Numeric validation -->
    <input type="number" name="age" min="18" max="100" step="1">
    
    <button type="submit">Submit</button>
</form>
```

---

## HTML5 APIs

### Q4: What are some important HTML5 APIs?

**Answer:**
HTML5 introduced many powerful APIs for enhanced web functionality.

**Geolocation API:**
```html
<button onclick="getLocation()">Get Location</button>
<div id="location"></div>

<script>
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                document.getElementById('location').innerHTML = 
                    `Latitude: ${lat}<br>Longitude: ${lon}`;
            },
            function(error) {
                document.getElementById('location').innerHTML = 
                    'Error: ' + error.message;
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        document.getElementById('location').innerHTML = 
            'Geolocation is not supported by this browser.';
    }
}
</script>
```

**Local Storage API:**
```html
<input type="text" id="dataInput" placeholder="Enter data">
<button onclick="saveData()">Save</button>
<button onclick="loadData()">Load</button>
<button onclick="clearData()">Clear</button>
<div id="output"></div>

<script>
function saveData() {
    const data = document.getElementById('dataInput').value;
    localStorage.setItem('userData', data);
    document.getElementById('output').innerHTML = 'Data saved!';
}

function loadData() {
    const data = localStorage.getItem('userData');
    if (data) {
        document.getElementById('dataInput').value = data;
        document.getElementById('output').innerHTML = 'Data loaded!';
    } else {
        document.getElementById('output').innerHTML = 'No data found!';
    }
}

function clearData() {
    localStorage.removeItem('userData');
    document.getElementById('dataInput').value = '';
    document.getElementById('output').innerHTML = 'Data cleared!';
}
</script>
```

**Canvas API:**
```html
<canvas id="myCanvas" width="400" height="200" style="border: 1px solid #000;"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = '#007bff';
ctx.fillRect(10, 10, 100, 50);

// Draw circle
ctx.beginPath();
ctx.arc(200, 50, 30, 0, 2 * Math.PI);
ctx.fillStyle = '#28a745';
ctx.fill();

// Draw text
ctx.font = '20px Arial';
ctx.fillStyle = '#dc3545';
ctx.fillText('Hello Canvas!', 10, 100);

// Draw line
ctx.beginPath();
ctx.moveTo(10, 150);
ctx.lineTo(390, 150);
ctx.strokeStyle = '#6c757d';
ctx.lineWidth = 3;
ctx.stroke();
</script>
```

**Drag and Drop API:**
```html
<div class="drag-container">
    <div class="drag-item" draggable="true" ondragstart="drag(event)" id="item1">
        Drag me!
    </div>
</div>

<div class="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    Drop here
</div>

<script>
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);
    ev.target.appendChild(draggedElement);
}
</script>

<style>
.drag-item {
    width: 100px;
    height: 50px;
    background: #007bff;
    color: white;
    text-align: center;
    line-height: 50px;
    cursor: move;
    margin: 10px;
}

.drop-zone {
    width: 200px;
    height: 100px;
    border: 2px dashed #ccc;
    text-align: center;
    line-height: 100px;
    margin: 10px;
}

.drop-zone:hover {
    border-color: #007bff;
}
</style>
```

---

## Accessibility (a11y)

### Q5: How do you make HTML accessible?

**Answer:**
Accessibility ensures web content is usable by people with disabilities.

**Semantic HTML and ARIA:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Accessible Web Page</title>
</head>
<body>
    <!-- Skip navigation link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Accessible navigation -->
    <nav role="navigation" aria-label="Main navigation">
        <ul>
            <li><a href="#home" aria-current="page">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    
    <!-- Main content with proper heading hierarchy -->
    <main id="main-content">
        <h1>Page Title</h1>
        
        <section>
            <h2>Section Title</h2>
            
            <!-- Accessible form -->
            <form>
                <fieldset>
                    <legend>Personal Information</legend>
                    
                    <label for="firstName">First Name (required):</label>
                    <input type="text" id="firstName" name="firstName" 
                           required aria-describedby="firstName-help">
                    <div id="firstName-help" class="help-text">
                        Enter your first name as it appears on your ID
                    </div>
                    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" 
                           aria-describedby="email-error">
                    <div id="email-error" class="error" aria-live="polite"></div>
                </fieldset>
                
                <!-- Accessible button -->
                <button type="submit" aria-describedby="submit-help">
                    Submit Form
                </button>
                <div id="submit-help" class="help-text">
                    Click to submit your information
                </div>
            </form>
            
            <!-- Accessible table -->
            <table>
                <caption>Sales Data for Q4 2023</caption>
                <thead>
                    <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Sales ($)</th>
                        <th scope="col">Growth (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">October</th>
                        <td>$50,000</td>
                        <td>+5%</td>
                    </tr>
                    <tr>
                        <th scope="row">November</th>
                        <td>$55,000</td>
                        <td>+10%</td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Accessible images -->
            <img src="chart.png" alt="Bar chart showing 15% increase in sales from Q3 to Q4">
            
            <!-- Decorative image -->
            <img src="decoration.png" alt="" role="presentation">
            
            <!-- Complex image with long description -->
            <img src="complex-chart.png" alt="Sales performance chart" 
                 aria-describedby="chart-description">
            <div id="chart-description">
                This chart shows sales performance across four quarters...
            </div>
        </section>
        
        <!-- Accessible modal -->
        <button onclick="openModal()" aria-haspopup="dialog">
            Open Modal
        </button>
        
        <div id="modal" role="dialog" aria-labelledby="modal-title" 
             aria-describedby="modal-description" aria-hidden="true">
            <h2 id="modal-title">Modal Title</h2>
            <p id="modal-description">Modal content description</p>
            <button onclick="closeModal()" aria-label="Close modal">
                ×
            </button>
        </div>
    </main>
    
    <!-- Accessible footer -->
    <footer role="contentinfo">
        <p>&copy; 2024 Company Name</p>
    </footer>
</body>
</html>
```

**ARIA Attributes:**
```html
<!-- Live regions for dynamic content -->
<div aria-live="polite" id="status"></div>
<div aria-live="assertive" id="errors"></div>

<!-- Expandable content -->
<button aria-expanded="false" aria-controls="content" onclick="toggle()">
    Show Details
</button>
<div id="content" aria-hidden="true">
    Hidden content that can be toggled
</div>

<!-- Tab interface -->
<div role="tablist" aria-label="Content tabs">
    <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">
        Tab 1
    </button>
    <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">
        Tab 2
    </button>
</div>

<div role="tabpanel" id="panel1" aria-labelledby="tab1">
    Content for tab 1
</div>

<div role="tabpanel" id="panel2" aria-labelledby="tab2" hidden>
    Content for tab 2
</div>

<!-- Progress indicator -->
<div role="progressbar" aria-valuenow="70" aria-valuemin="0" 
     aria-valuemax="100" aria-label="Loading progress">
    70% complete
</div>
```

---

## SEO and Meta Tags

### Q6: What are important HTML elements for SEO?

**Answer:**
Proper HTML structure and meta tags are crucial for search engine optimization.

**Essential SEO Meta Tags:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Basic meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Title tag (most important for SEO) -->
    <title>Page Title - Brand Name | 50-60 characters</title>
    
    <!-- Meta description -->
    <meta name="description" content="Compelling description of the page content in 150-160 characters that encourages clicks from search results.">
    
    <!-- Keywords (less important now) -->
    <meta name="keywords" content="keyword1, keyword2, keyword3">
    
    <!-- Author and copyright -->
    <meta name="author" content="Author Name">
    <meta name="copyright" content="Company Name">
    
    <!-- Robots meta tag -->
    <meta name="robots" content="index, follow">
    <!-- Other options: noindex, nofollow, noarchive, nosnippet -->
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://example.com/page">
    
    <!-- Open Graph meta tags for social media -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description for social sharing">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/page">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Site Name">
    
    <!-- Twitter Card meta tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@username">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Page description for Twitter">
    <meta name="twitter:image" content="https://example.com/image.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    
    <!-- Structured data (JSON-LD) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Company Name",
        "url": "https://example.com",
        "logo": "https://example.com/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-234-567-8900",
            "contactType": "customer service"
        }
    }
    </script>
</head>
<body>
    <!-- Proper heading hierarchy -->
    <h1>Main Page Heading (only one H1 per page)</h1>
    
    <h2>Section Heading</h2>
    <h3>Subsection Heading</h3>
    
    <!-- Semantic HTML structure -->
    <nav>
        <ul>
            <li><a href="/" title="Home page">Home</a></li>
            <li><a href="/about" title="About us">About</a></li>
            <li><a href="/services" title="Our services">Services</a></li>
        </ul>
    </nav>
    
    <main>
        <article>
            <header>
                <h1>Article Title</h1>
                <time datetime="2024-01-15">January 15, 2024</time>
            </header>
            
            <p>Article content with <strong>important keywords</strong> naturally integrated.</p>
            
            <!-- Optimized images -->
            <img src="optimized-image.webp" 
                 alt="Descriptive alt text with keywords" 
                 width="800" height="600"
                 loading="lazy">
        </article>
    </main>
    
    <!-- Breadcrumb navigation -->
    <nav aria-label="Breadcrumb">
        <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/category">Category</a></li>
            <li aria-current="page">Current Page</li>
        </ol>
    </nav>
</body>
</html>
```

**Structured Data Examples:**
```html
<!-- Article structured data -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "author": {
        "@type": "Person",
        "name": "Author Name"
    },
    "datePublished": "2024-01-15",
    "dateModified": "2024-01-16",
    "image": "https://example.com/article-image.jpg",
    "publisher": {
        "@type": "Organization",
        "name": "Publisher Name",
        "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png"
        }
    }
}
</script>

<!-- Local business structured data -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Business Name",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "12345"
    },
    "telephone": "+1-234-567-8900",
    "openingHours": "Mo-Fr 09:00-17:00"
}
</script>
```

---

## HTML Performance

### Q7: How do you optimize HTML for performance?

**Answer:**
HTML performance optimization involves reducing load times and improving rendering speed.

**Resource Loading Optimization:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Optimized Page</title>
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://cdn.example.com">
    
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//analytics.google.com">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="critical.css" as="style">
    <link rel="preload" href="hero-image.webp" as="image">
    <link rel="preload" href="critical.js" as="script">
    
    <!-- Critical CSS inline -->
    <style>
        /* Critical above-the-fold styles */
        body { margin: 0; font-family: system-ui; }
        .hero { height: 100vh; background: #007bff; }
    </style>
    
    <!-- Non-critical CSS with media attribute trick -->
    <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
<body>
    <!-- Optimized images -->
    <picture>
        <source media="(min-width: 800px)" srcset="hero-large.webp">
        <source media="(min-width: 400px)" srcset="hero-medium.webp">
        <img src="hero-small.webp" alt="Hero image" 
             width="800" height="600" 
             loading="eager" 
             decoding="async">
    </picture>
    
    <!-- Lazy loaded images -->
    <img src="placeholder.jpg" 
         data-src="actual-image.webp" 
         alt="Description" 
         loading="lazy" 
         decoding="async"
         width="400" height="300">
    
    <!-- Responsive images with srcset -->
    <img srcset="image-320w.webp 320w,
                 image-480w.webp 480w,
                 image-800w.webp 800w"
         sizes="(max-width: 320px) 280px,
                (max-width: 480px) 440px,
                800px"
         src="image-800w.webp"
         alt="Responsive image"
         loading="lazy">
    
    <!-- Optimized video -->
    <video width="800" height="450" 
           poster="video-poster.webp" 
           preload="metadata"
           controls>
        <source src="video.webm" type="video/webm">
        <source src="video.mp4" type="video/mp4">
        Your browser doesn't support video.
    </video>
    
    <!-- Defer non-critical JavaScript -->
    <script src="analytics.js" defer></script>
    <script src="non-critical.js" async></script>
    
    <!-- Critical JavaScript inline -->
    <script>
        // Critical JavaScript here
        console.log('Page loaded');
    </script>
</body>
</html>
```

**HTML Minification and Compression:**
```html
<!-- Before minification -->
<div class="container">
    <h1>Title</h1>
    <p>Paragraph with some text.</p>
</div>

<!-- After minification -->
<div class="container"><h1>Title</h1><p>Paragraph with some text.</p></div>

<!-- Gzip compression headers (server configuration) -->
<!-- 
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
-->
```

---

## HTML5 Media Elements

### Q8: How do you work with HTML5 audio and video elements?

**Answer:**
HTML5 provides native support for audio and video without plugins.

**Video Element:**
```html
<!-- Basic video -->
<video width="800" height="450" controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    <source src="movie.ogg" type="video/ogg">
    Your browser does not support the video tag.
</video>

<!-- Advanced video with attributes -->
<video width="800" height="450" 
       controls 
       autoplay 
       muted 
       loop 
       poster="video-thumbnail.jpg"
       preload="metadata"
       crossorigin="anonymous">
    <source src="movie-hd.mp4" type="video/mp4" media="(min-width: 1024px)">
    <source src="movie-sd.mp4" type="video/mp4">
    <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">
    <track kind="subtitles" src="subtitles-es.vtt" srclang="es" label="Spanish">
    <track kind="captions" src="captions.vtt" srclang="en" label="English Captions">
    <p>Your browser doesn't support HTML5 video. 
       <a href="movie.mp4">Download the video</a> instead.</p>
</video>

<!-- Responsive video -->
<div class="video-container">
    <video width="100%" height="auto" controls>
        <source src="responsive-video.mp4" type="video/mp4">
    </video>
</div>

<style>
.video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
```

**Audio Element:**
```html
<!-- Basic audio -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <source src="audio.wav" type="audio/wav">
    Your browser does not support the audio element.
</audio>

<!-- Audio with attributes -->
<audio controls 
       autoplay 
       loop 
       muted 
       preload="auto">
    <source src="background-music.mp3" type="audio/mpeg">
    <source src="background-music.ogg" type="audio/ogg">
</audio>

<!-- Audio playlist -->
<div class="audio-playlist">
    <audio id="audioPlayer" controls>
        <source id="audioSource" src="" type="audio/mpeg">
    </audio>
    
    <ul class="playlist">
        <li><button onclick="playTrack('song1.mp3')">Song 1</button></li>
        <li><button onclick="playTrack('song2.mp3')">Song 2</button></li>
        <li><button onclick="playTrack('song3.mp3')">Song 3</button></li>
    </ul>
</div>

<script>
function playTrack(src) {
    const audio = document.getElementById('audioPlayer');
    const source = document.getElementById('audioSource');
    source.src = src;
    audio.load();
    audio.play();
}
</script>
```

**Media API JavaScript:**
```html
<video id="myVideo" width="800" height="450">
    <source src="movie.mp4" type="video/mp4">
</video>

<div class="controls">
    <button onclick="playPause()">Play/Pause</button>
    <button onclick="makeBig()">Big</button>
    <button onclick="makeSmall()">Small</button>
    <button onclick="makeNormal()">Normal</button>
    <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="1" onchange="setVolume()">
</div>

<script>
const video = document.getElementById('myVideo');

function playPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function makeBig() {
    video.width = 1200;
    video.height = 675;
}

function makeSmall() {
    video.width = 400;
    video.height = 225;
}

function makeNormal() {
    video.width = 800;
    video.height = 450;
}

function setVolume() {
    const slider = document.getElementById('volumeSlider');
    video.volume = slider.value;
}

// Event listeners
video.addEventListener('loadstart', () => console.log('Started loading'));
video.addEventListener('loadeddata', () => console.log('Data loaded'));
video.addEventListener('canplay', () => console.log('Can start playing'));
video.addEventListener('play', () => console.log('Started playing'));
video.addEventListener('pause', () => console.log('Paused'));
video.addEventListener('ended', () => console.log('Ended'));
video.addEventListener('timeupdate', () => {
    console.log('Current time:', video.currentTime);
});
</script>
```

---

## HTML Best Practices

### Q9: What are HTML coding best practices?

**Answer:**
Following best practices ensures maintainable, accessible, and performant HTML.

**Code Structure and Organization:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags first -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Title and description -->
    <title>Page Title</title>
    <meta name="description" content="Page description">
    
    <!-- External resources -->
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
<body>
    <!-- Use semantic HTML -->
    <header>
        <nav>
            <!-- Use proper list structure for navigation -->
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <!-- Use proper heading hierarchy -->
        <h1>Main Page Title</h1>
        
        <section>
            <h2>Section Title</h2>
            
            <!-- Use meaningful class names -->
            <div class="card-container">
                <article class="card">
                    <h3 class="card__title">Card Title</h3>
                    <p class="card__content">Card content</p>
                </article>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Company Name</p>
    </footer>
    
    <!-- Scripts at the end of body -->
    <script src="script.js"></script>
</body>
</html>
```

**Validation and Standards:**
```html
<!-- Always include DOCTYPE -->
<!DOCTYPE html>

<!-- Use valid HTML -->
<!-- GOOD -->
<img src="image.jpg" alt="Description">
<input type="text" name="username" id="username">

<!-- BAD -->
<img src="image.jpg"> <!-- Missing alt attribute -->
<input type="text" name="username"> <!-- Missing id for label association -->

<!-- Close all tags properly -->
<!-- GOOD -->
<p>Paragraph content</p>
<br>
<img src="image.jpg" alt="Description">

<!-- BAD -->
<p>Paragraph content
<br>
<img src="image.jpg" alt="Description">

<!-- Use lowercase for tags and attributes -->
<!-- GOOD -->
<div class="container" id="main">

<!-- BAD -->
<DIV CLASS="container" ID="main">

<!-- Quote attribute values -->
<!-- GOOD -->
<div class="container" data-value="123">

<!-- BAD -->
<div class=container data-value=123>
```

**Performance Best Practices:**
```html
<!-- Optimize images -->
<img src="optimized-image.webp" 
     alt="Description" 
     width="400" 
     height="300" 
     loading="lazy" 
     decoding="async">

<!-- Use appropriate input types -->
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="url" name="website">

<!-- Minimize HTTP requests -->
<link rel="stylesheet" href="combined-styles.css">
<script src="combined-scripts.js"></script>

<!-- Use CDN for common libraries -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<!-- Enable compression -->
<!-- Server configuration for gzip/brotli compression -->
```

This comprehensive HTML guide covers all essential topics from basic structure to advanced APIs and best practices, providing practical examples for interview preparation and development work.