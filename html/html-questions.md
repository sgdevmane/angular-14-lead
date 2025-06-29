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

---

## Advanced HTML Concepts

### Q1: Explain HTML5 Web Components and their implementation.
**Difficulty: Hard**

**Answer:**
Web Components are a set of web platform APIs that allow you to create custom, reusable HTML elements.

**Custom Elements:**
```javascript
// Define a custom element
class CustomButton extends HTMLElement {
  constructor() {
    super();
    
    // Create shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Create template
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          --button-color: #007bff;
          --button-hover-color: #0056b3;
        }
        
        button {
          background: var(--button-color);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          transition: background-color 0.15s;
        }
        
        button:hover {
          background: var(--button-hover-color);
        }
        
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .icon {
          margin-right: 0.5rem;
        }
      </style>
      <button>
        <span class="icon"></span>
        <slot></slot>
      </button>
    `;
    
    this.button = this.shadowRoot.querySelector('button');
    this.iconSpan = this.shadowRoot.querySelector('.icon');
  }
  
  // Observed attributes
  static get observedAttributes() {
    return ['disabled', 'type', 'icon'];
  }
  
  // Lifecycle callbacks
  connectedCallback() {
    this.button.addEventListener('click', this.handleClick.bind(this));
    this.updateIcon();
  }
  
  disconnectedCallback() {
    this.button.removeEventListener('click', this.handleClick.bind(this));
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'disabled':
        this.button.disabled = newValue !== null;
        break;
      case 'type':
        this.button.type = newValue || 'button';
        break;
      case 'icon':
        this.updateIcon();
        break;
    }
  }
  
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('custom-click', {
      detail: { originalEvent: event },
      bubbles: true,
      cancelable: true
    }));
  }
  
  updateIcon() {
    const icon = this.getAttribute('icon');
    if (icon) {
      this.iconSpan.innerHTML = `<i class="${icon}"></i>`;
      this.iconSpan.style.display = 'inline';
    } else {
      this.iconSpan.style.display = 'none';
    }
  }
  
  // Public methods
  focus() {
    this.button.focus();
  }
  
  blur() {
    this.button.blur();
  }
  
  // Properties
  get disabled() {
    return this.hasAttribute('disabled');
  }
  
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
}

// Register the custom element
customElements.define('custom-button', CustomButton);

// Advanced custom element with form integration
class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 1rem;
        }
        
        .form-group {
          position: relative;
        }
        
        label {
          display: block;
          margin-bottom: 0.25rem;
          font-weight: 600;
          color: #333;
        }
        
        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          font-size: 1rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        
        input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        
        input:invalid {
          border-color: #dc3545;
        }
        
        .error-message {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: none;
        }
        
        :host([invalid]) .error-message {
          display: block;
        }
        
        :host([invalid]) input {
          border-color: #dc3545;
        }
      </style>
      <div class="form-group">
        <label></label>
        <input />
        <div class="error-message"></div>
      </div>
    `;
    
    this.label = this.shadowRoot.querySelector('label');
    this.input = this.shadowRoot.querySelector('input');
    this.errorMessage = this.shadowRoot.querySelector('.error-message');
  }
  
  static get observedAttributes() {
    return ['label', 'type', 'placeholder', 'required', 'pattern', 'error-message'];
  }
  
  connectedCallback() {
    this.input.addEventListener('input', this.handleInput.bind(this));
    this.input.addEventListener('blur', this.handleBlur.bind(this));
    this.updateAttributes();
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    this.updateAttributes();
  }
  
  updateAttributes() {
    this.label.textContent = this.getAttribute('label') || '';
    this.input.type = this.getAttribute('type') || 'text';
    this.input.placeholder = this.getAttribute('placeholder') || '';
    this.input.required = this.hasAttribute('required');
    this.input.pattern = this.getAttribute('pattern') || '';
    this.errorMessage.textContent = this.getAttribute('error-message') || 'Invalid input';
  }
  
  handleInput(event) {
    this.removeAttribute('invalid');
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.input.value },
      bubbles: true
    }));
  }
  
  handleBlur(event) {
    this.validate();
  }
  
  validate() {
    const isValid = this.input.checkValidity();
    if (!isValid) {
      this.setAttribute('invalid', '');
    } else {
      this.removeAttribute('invalid');
    }
    return isValid;
  }
  
  get value() {
    return this.input.value;
  }
  
  set value(val) {
    this.input.value = val;
  }
  
  get validity() {
    return this.input.validity;
  }
  
  get validationMessage() {
    return this.input.validationMessage;
  }
}

customElements.define('custom-input', CustomInput);
```

**Usage:**
```html
<!-- Custom button usage -->
<custom-button icon="fas fa-save">Save Document</custom-button>
<custom-button disabled>Disabled Button</custom-button>

<!-- Custom input usage -->
<custom-input 
  label="Email Address" 
  type="email" 
  placeholder="Enter your email"
  required
  error-message="Please enter a valid email address">
</custom-input>

<script>
// Using custom elements
const button = document.querySelector('custom-button');
button.addEventListener('custom-click', (event) => {
  console.log('Custom button clicked!', event.detail);
});

const input = document.querySelector('custom-input');
input.addEventListener('input', (event) => {
  console.log('Input value:', event.detail.value);
});
</script>
```

---

### Q2: Explain HTML5 Performance Optimization techniques.
**Difficulty: Medium**

**Answer:**
HTML5 performance optimization involves reducing load times, improving rendering, and optimizing resource delivery.

**1. Resource Loading Optimization:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- DNS prefetch for external domains -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//api.example.com">
  
  <!-- Preconnect for critical third-party origins -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/css/critical.css" as="style">
  <link rel="preload" href="/js/main.js" as="script">
  
  <!-- Critical CSS inlined -->
  <style>
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: Arial, sans-serif; }
    .header { background: #333; color: white; padding: 1rem; }
    .hero { height: 100vh; background: #f0f0f0; }
  </style>
  
  <!-- Non-critical CSS loaded asynchronously -->
  <link rel="preload" href="/css/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/styles.css"></noscript>
  
  <title>Optimized Page</title>
</head>
<body>
  <!-- Content here -->
  
  <!-- Scripts at the end of body -->
  <script src="/js/main.js" defer></script>
  
  <!-- Non-critical scripts loaded asynchronously -->
  <script>
    // Load analytics asynchronously
    (function() {
      const script = document.createElement('script');
      script.src = '/js/analytics.js';
      script.async = true;
      document.head.appendChild(script);
    })();
  </script>
</body>
</html>
```

**2. Image Optimization:**
```html
<!-- Responsive images with srcset -->
<img src="image-800w.jpg"
     srcset="image-400w.jpg 400w,
             image-800w.jpg 800w,
             image-1200w.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1000px) 800px,
            1200px"
     alt="Descriptive alt text"
     loading="lazy"
     decoding="async">

<!-- Modern image formats with fallbacks -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback image" loading="lazy">
</picture>

<!-- Hero images with priority loading -->
<img src="hero.jpg" 
     alt="Hero image" 
     fetchpriority="high"
     decoding="sync">

<!-- Background images with intersection observer -->
<div class="lazy-bg" data-bg="background-image.jpg">
  Content here
</div>

<script>
// Lazy load background images
const lazyBgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const bgImage = element.dataset.bg;
      element.style.backgroundImage = `url(${bgImage})`;
      lazyBgObserver.unobserve(element);
    }
  });
});

document.querySelectorAll('.lazy-bg').forEach(el => {
  lazyBgObserver.observe(el);
});
</script>
```

**3. Script Loading Optimization:**
```html
<!-- Critical scripts with high priority -->
<script src="/js/critical.js" fetchpriority="high"></script>

<!-- Deferred scripts for non-critical functionality -->
<script src="/js/non-critical.js" defer></script>

<!-- Async scripts for independent functionality -->
<script src="/js/analytics.js" async></script>

<!-- Module scripts for modern browsers -->
<script type="module" src="/js/modern.js"></script>
<script nomodule src="/js/legacy.js"></script>

<!-- Dynamic imports for code splitting -->
<script>
async function loadFeature() {
  const { feature } = await import('/js/feature.js');
  feature.init();
}

// Load on user interaction
document.getElementById('feature-button').addEventListener('click', loadFeature);
</script>

<!-- Service worker registration -->
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
</script>
```

**4. HTML Structure Optimization:**
```html
<!-- Semantic HTML for better parsing -->
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2023-12-01">December 1, 2023</time>
  </header>
  
  <section>
    <h2>Section Title</h2>
    <p>Content here...</p>
  </section>
  
  <aside>
    <h3>Related Links</h3>
    <nav>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
      </ul>
    </nav>
  </aside>
</article>

<!-- Minimize DOM depth -->
<!-- BAD: Deep nesting -->
<div class="wrapper">
  <div class="container">
    <div class="content">
      <div class="article">
        <div class="text">
          <p>Content</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- GOOD: Flatter structure -->
<article class="article">
  <p>Content</p>
</article>

<!-- Efficient form structure -->
<form>
  <fieldset>
    <legend>Personal Information</legend>
    
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required autocomplete="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required autocomplete="email">
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
```

**5. Performance Monitoring:**
```html
<script>
// Performance monitoring
function measurePerformance() {
  // Core Web Vitals
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
      }
    }
  }).observe({ entryTypes: ['paint'] });
  
  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // Cumulative Layout Shift
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
  
  // First Input Delay
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('FID:', entry.processingStart - entry.startTime);
    }
  }).observe({ entryTypes: ['first-input'] });
}

// Resource timing
function analyzeResources() {
  const resources = performance.getEntriesByType('resource');
  resources.forEach(resource => {
    console.log(`${resource.name}: ${resource.duration}ms`);
  });
}

window.addEventListener('load', () => {
  measurePerformance();
  analyzeResources();
});
</script>
```

---

### Q3: Explain HTML5 Accessibility (a11y) best practices.
**Difficulty: Medium**

**Answer:**
HTML5 accessibility ensures web content is usable by people with disabilities through proper semantic markup and ARIA attributes.

**1. Semantic HTML Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Page Title</title>
</head>
<body>
  <!-- Skip navigation for screen readers -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main id="main-content" role="main">
    <article>
      <header>
        <h1>Article Title</h1>
        <p>Published on <time datetime="2023-12-01">December 1, 2023</time></p>
      </header>
      
      <section>
        <h2>Section Heading</h2>
        <p>Content with proper heading hierarchy...</p>
        
        <h3>Subsection</h3>
        <p>More content...</p>
      </section>
    </article>
    
    <aside role="complementary" aria-labelledby="sidebar-heading">
      <h2 id="sidebar-heading">Related Information</h2>
      <nav aria-label="Related links">
        <ul>
          <li><a href="#">Related Article 1</a></li>
          <li><a href="#">Related Article 2</a></li>
        </ul>
      </nav>
    </aside>
  </main>
  
  <footer role="contentinfo">
    <p>&copy; 2023 Company Name. All rights reserved.</p>
  </footer>
</body>
</html>
```

**2. Form Accessibility:**
```html
<form>
  <fieldset>
    <legend>Personal Information</legend>
    
    <!-- Proper label association -->
    <div class="form-group">
      <label for="full-name">Full Name *</label>
      <input type="text" 
             id="full-name" 
             name="fullName" 
             required 
             aria-describedby="name-help name-error"
             autocomplete="name">
      <div id="name-help" class="help-text">
        Enter your first and last name
      </div>
      <div id="name-error" class="error-message" aria-live="polite">
        <!-- Error message will be inserted here -->
      </div>
    </div>
    
    <!-- Email with validation -->
    <div class="form-group">
      <label for="email">Email Address *</label>
      <input type="email" 
             id="email" 
             name="email" 
             required 
             aria-describedby="email-help"
             autocomplete="email">
      <div id="email-help" class="help-text">
        We'll use this to send you updates
      </div>
    </div>
    
    <!-- Radio buttons with fieldset -->
    <fieldset>
      <legend>Preferred Contact Method</legend>
      <div class="radio-group">
        <input type="radio" id="contact-email" name="contact" value="email">
        <label for="contact-email">Email</label>
      </div>
      <div class="radio-group">
        <input type="radio" id="contact-phone" name="contact" value="phone">
        <label for="contact-phone">Phone</label>
      </div>
    </fieldset>
    
    <!-- Checkbox with proper labeling -->
    <div class="form-group">
      <input type="checkbox" 
             id="newsletter" 
             name="newsletter" 
             aria-describedby="newsletter-desc">
      <label for="newsletter">Subscribe to newsletter</label>
      <div id="newsletter-desc" class="help-text">
        Receive monthly updates about our products
      </div>
    </div>
    
    <!-- Select with proper labeling -->
    <div class="form-group">
      <label for="country">Country</label>
      <select id="country" name="country" required>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
      </select>
    </div>
  </fieldset>
  
  <button type="submit" aria-describedby="submit-help">
    Submit Form
  </button>
  <div id="submit-help" class="help-text">
    All required fields must be completed
  </div>
</form>

<script>
// Form validation with accessibility
function validateForm() {
  const form = document.querySelector('form');
  const nameInput = document.getElementById('full-name');
  const nameError = document.getElementById('name-error');
  
  form.addEventListener('submit', (e) => {
    let isValid = true;
    
    // Validate name
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Full name is required';
      nameInput.setAttribute('aria-invalid', 'true');
      nameInput.focus();
      isValid = false;
    } else {
      nameError.textContent = '';
      nameInput.removeAttribute('aria-invalid');
    }
    
    if (!isValid) {
      e.preventDefault();
    }
  });
  
  // Clear errors on input
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
      nameError.textContent = '';
      nameInput.removeAttribute('aria-invalid');
    }
  });
}

validateForm();
</script>
```

**3. Interactive Elements Accessibility:**
```html
<!-- Accessible button -->
<button type="button" 
        aria-expanded="false" 
        aria-controls="dropdown-menu"
        id="dropdown-button">
  Options
  <span aria-hidden="true">▼</span>
</button>

<ul id="dropdown-menu" 
    role="menu" 
    aria-labelledby="dropdown-button"
    hidden>
  <li role="menuitem"><a href="#">Option 1</a></li>
  <li role="menuitem"><a href="#">Option 2</a></li>
  <li role="menuitem"><a href="#">Option 3</a></li>
</ul>

<!-- Accessible modal dialog -->
<div id="modal" 
     role="dialog" 
     aria-labelledby="modal-title"
     aria-describedby="modal-description"
     aria-modal="true"
     hidden>
  <div class="modal-content">
    <header>
      <h2 id="modal-title">Confirm Action</h2>
      <button type="button" 
              class="close-button"
              aria-label="Close dialog">
        <span aria-hidden="true">&times;</span>
      </button>
    </header>
    
    <div id="modal-description">
      <p>Are you sure you want to delete this item?</p>
    </div>
    
    <footer>
      <button type="button" class="cancel-button">Cancel</button>
      <button type="button" class="confirm-button">Delete</button>
    </footer>
  </div>
</div>

<!-- Accessible tabs -->
<div class="tabs">
  <div role="tablist" aria-label="Content sections">
    <button role="tab" 
            aria-selected="true" 
            aria-controls="panel1" 
            id="tab1"
            tabindex="0">
      Tab 1
    </button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="panel2" 
            id="tab2"
            tabindex="-1">
      Tab 2
    </button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="panel3" 
            id="tab3"
            tabindex="-1">
      Tab 3
    </button>
  </div>
  
  <div id="panel1" 
       role="tabpanel" 
       aria-labelledby="tab1" 
       tabindex="0">
    <h3>Panel 1 Content</h3>
    <p>Content for the first tab...</p>
  </div>
  
  <div id="panel2" 
       role="tabpanel" 
       aria-labelledby="tab2" 
       tabindex="0" 
       hidden>
    <h3>Panel 2 Content</h3>
    <p>Content for the second tab...</p>
  </div>
  
  <div id="panel3" 
       role="tabpanel" 
       aria-labelledby="tab3" 
       tabindex="0" 
       hidden>
    <h3>Panel 3 Content</h3>
    <p>Content for the third tab...</p>
  </div>
</div>

<script>
// Accessible tabs implementation
class AccessibleTabs {
  constructor(tabsContainer) {
    this.tabsContainer = tabsContainer;
    this.tabs = tabsContainer.querySelectorAll('[role="tab"]');
    this.panels = tabsContainer.querySelectorAll('[role="tabpanel"]');
    
    this.init();
  }
  
  init() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.selectTab(index));
      tab.addEventListener('keydown', (e) => this.handleKeydown(e, index));
    });
  }
  
  selectTab(selectedIndex) {
    this.tabs.forEach((tab, index) => {
      const isSelected = index === selectedIndex;
      tab.setAttribute('aria-selected', isSelected);
      tab.tabIndex = isSelected ? 0 : -1;
      
      this.panels[index].hidden = !isSelected;
    });
    
    this.tabs[selectedIndex].focus();
  }
  
  handleKeydown(event, currentIndex) {
    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = this.tabs.length - 1;
        break;
      default:
        return;
    }
    
    event.preventDefault();
    this.selectTab(newIndex);
  }
}

// Initialize accessible tabs
document.querySelectorAll('.tabs').forEach(tabs => {
  new AccessibleTabs(tabs);
});
</script>
```

**4. Media Accessibility:**
```html
<!-- Images with proper alt text -->
<img src="chart.png" 
     alt="Sales increased 25% from Q1 to Q2, with highest growth in mobile devices">

<!-- Decorative images -->
<img src="decoration.png" alt="" role="presentation">

<!-- Complex images with long descriptions -->
<figure>
  <img src="complex-chart.png" 
       alt="Quarterly sales data" 
       aria-describedby="chart-description">
  <figcaption id="chart-description">
    Detailed description: Q1 sales were $100k, Q2 increased to $125k, 
    Q3 reached $150k, and Q4 peaked at $175k. Mobile sales accounted 
    for 60% of total revenue in Q4.
  </figcaption>
</figure>

<!-- Video with captions and transcripts -->
<video controls 
       aria-labelledby="video-title"
       aria-describedby="video-description">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track kind="captions" 
         src="captions-en.vtt" 
         srclang="en" 
         label="English captions" 
         default>
  <track kind="subtitles" 
         src="subtitles-es.vtt" 
         srclang="es" 
         label="Spanish subtitles">
  <p>Your browser doesn't support video. 
     <a href="video.mp4">Download the video</a> instead.</p>
</video>

<h3 id="video-title">Product Demo Video</h3>
<p id="video-description">
  This video demonstrates the key features of our product, 
  including setup, basic usage, and advanced features.
</p>

<details>
  <summary>Video Transcript</summary>
  <div>
    <p><strong>0:00</strong> Welcome to our product demo...</p>
    <p><strong>0:15</strong> First, let's look at the setup process...</p>
    <!-- Full transcript here -->
  </div>
</details>

<!-- Audio with transcript -->
<audio controls aria-labelledby="audio-title">
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  <p>Your browser doesn't support audio. 
     <a href="podcast.mp3">Download the audio</a> instead.</p>
</audio>

<h3 id="audio-title">Weekly Podcast Episode</h3>
<details>
  <summary>Podcast Transcript</summary>
  <div>
    <!-- Full transcript here -->
  </div>
</details>
```

---

### Q4: Explain HTML5 Progressive Web App (PWA) implementation.
**Difficulty: Hard**

**Answer:**
Progressive Web Apps use HTML5 features to create app-like experiences that work offline and can be installed on devices.

**1. Web App Manifest:**
```json
// manifest.json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A comprehensive PWA example",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007bff",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "en",
  "dir": "ltr",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "shortcuts": [
    {
      "name": "New Document",
      "short_name": "New",
      "description": "Create a new document",
      "url": "/new",
      "icons": [{ "src": "/icons/new.png", "sizes": "192x192" }]
    },
    {
      "name": "Recent Documents",
      "short_name": "Recent",
      "description": "View recent documents",
      "url": "/recent",
      "icons": [{ "src": "/icons/recent.png", "sizes": "192x192" }]
    }
  ],
  "categories": ["productivity", "utilities"],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

**2. HTML with PWA Meta Tags:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- PWA Meta Tags -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#007bff">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="MyPWA">
  
  <!-- Apple Touch Icons -->
  <link rel="apple-touch-icon" href="/icons/icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png">
  
  <!-- Microsoft Tiles -->
  <meta name="msapplication-TileImage" content="/icons/icon-144x144.png">
  <meta name="msapplication-TileColor" content="#007bff">
  
  <title>My Progressive Web App</title>
</head>
<body>
  <!-- App Shell -->
  <div id="app">
    <header class="app-header">
      <h1>My PWA</h1>
      <button id="install-button" hidden>Install App</button>
    </header>
    
    <nav class="app-nav">
      <ul>
        <li><a href="/" data-route="home">Home</a></li>
        <li><a href="/about" data-route="about">About</a></li>
        <li><a href="/contact" data-route="contact">Contact</a></li>
      </ul>
    </nav>
    
    <main id="main-content" class="app-main">
      <!-- Dynamic content loaded here -->
    </main>
    
    <div id="offline-indicator" class="offline-indicator" hidden>
      <p>You're currently offline. Some features may be limited.</p>
    </div>
  </div>
  
  <!-- Loading indicator -->
  <div id="loading" class="loading-indicator">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
  
  <script>
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('SW registered: ', registration);
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available
                showUpdateNotification();
              }
            });
          });
        } catch (registrationError) {
          console.log('SW registration failed: ', registrationError);
        }
      });
    }
    
    // Install prompt
    let deferredPrompt;
    const installButton = document.getElementById('install-button');
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installButton.hidden = false;
    });
    
    installButton.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        installButton.hidden = true;
      }
    });
    
    // Handle app installation
    window.addEventListener('appinstalled', (evt) => {
      console.log('App was installed');
      installButton.hidden = true;
    });
    
    // Network status
    function updateOnlineStatus() {
      const offlineIndicator = document.getElementById('offline-indicator');
      offlineIndicator.hidden = navigator.onLine;
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
    
    // Update notification
    function showUpdateNotification() {
      if (confirm('New version available! Reload to update?')) {
        window.location.reload();
      }
    }
  </script>
</body>
</html>
```

**3. Service Worker (sw.js):**
```javascript
const CACHE_NAME = 'my-pwa-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/app.js',
  '/icons/icon-192x192.png',
  '/offline.html'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).catch(() => {
          // If both cache and network fail, show offline page
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('PWA Notification', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/explore')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

function doBackgroundSync() {
  // Perform background sync operations
  return fetch('/api/sync')
    .then(response => response.json())
    .then(data => {
      console.log('Background sync completed:', data);
    })
    .catch(error => {
      console.error('Background sync failed:', error);
    });
}
```

---

### Q5: Explain HTML5 Security best practices.
**Difficulty: Medium**

**Answer:**
HTML5 security involves protecting against various attacks and implementing secure coding practices.

**1. Content Security Policy (CSP):**
```html
<!-- CSP via meta tag -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://trusted-cdn.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               img-src 'self' data: https:; 
               font-src 'self' https://fonts.gstatic.com; 
               connect-src 'self' https://api.example.com; 
               frame-src 'none'; 
               object-src 'none'; 
               base-uri 'self'; 
               form-action 'self';">

<!-- Better: CSP via HTTP header (server-side) -->
<!-- Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123'; style-src 'self' 'nonce-def456' -->

<!-- Using nonces for inline scripts -->
<script nonce="abc123">
  // Inline script with nonce
  console.log('This script is allowed by CSP');
</script>

<!-- Using nonces for inline styles -->
<style nonce="def456">
  /* Inline styles with nonce */
  .secure-style { color: blue; }
</style>
```

**2. Input Validation and Sanitization:**
```html
<!-- Secure form inputs -->
<form id="secure-form">
  <!-- Input validation -->
  <label for="username">Username:</label>
  <input type="text" 
         id="username" 
         name="username" 
         pattern="[a-zA-Z0-9_]{3,20}" 
         maxlength="20" 
         required 
         autocomplete="username">
  
  <!-- Email validation -->
  <label for="email">Email:</label>
  <input type="email" 
         id="email" 
         name="email" 
         maxlength="254" 
         required 
         autocomplete="email">
  
  <!-- Password with requirements -->
  <label for="password">Password:</label>
  <input type="password" 
         id="password" 
         name="password" 
         minlength="8" 
         maxlength="128" 
         pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" 
         required 
         autocomplete="new-password">
  
  <!-- URL validation -->
  <label for="website">Website:</label>
  <input type="url" 
         id="website" 
         name="website" 
         maxlength="2048">
  
  <!-- Number validation -->
  <label for="age">Age:</label>
  <input type="number" 
         id="age" 
         name="age" 
         min="13" 
         max="120" 
         required>
  
  <!-- File upload with restrictions -->
  <label for="avatar">Avatar:</label>
  <input type="file" 
         id="avatar" 
         name="avatar" 
         accept="image/jpeg,image/png,image/webp" 
         maxlength="5242880"> <!-- 5MB -->
  
  <button type="submit">Submit</button>
</form>

<script>
// Client-side validation and sanitization
class SecureForm {
  constructor(formElement) {
    this.form = formElement;
    this.init();
  }
  
  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Real-time validation
    this.form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', this.validateInput.bind(this));
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    if (this.validateForm()) {
      const formData = this.sanitizeFormData();
      this.submitSecurely(formData);
    }
  }
  
  validateForm() {
    let isValid = true;
    const inputs = this.form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
      if (!this.validateInput({ target: input })) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  validateInput(event) {
    const input = event.target;
    const value = input.value;
    let isValid = true;
    let errorMessage = '';
    
    // Basic validation
    if (input.required && !value.trim()) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (input.pattern && !new RegExp(input.pattern).test(value)) {
      isValid = false;
      errorMessage = 'Invalid format';
    } else if (input.type === 'email' && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Invalid email address';
    } else if (input.type === 'url' && value && !this.isValidURL(value)) {
      isValid = false;
      errorMessage = 'Invalid URL';
    }
    
    // Custom validation
    switch (input.name) {
      case 'username':
        if (value && !this.isValidUsername(value)) {
          isValid = false;
          errorMessage = 'Username can only contain letters, numbers, and underscores';
        }
        break;
      case 'password':
        if (value && !this.isStrongPassword(value)) {
          isValid = false;
          errorMessage = 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character';
        }
        break;
    }
    
    this.showValidationMessage(input, isValid, errorMessage);
    return isValid;
  }
  
  sanitizeFormData() {
    const formData = new FormData(this.form);
    const sanitizedData = {};
    
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        // Basic HTML sanitization
        sanitizedData[key] = this.sanitizeHTML(value);
      } else {
        sanitizedData[key] = value;
      }
    }
    
    return sanitizedData;
  }
  
  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  }
  
  isStrongPassword(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }
  
  showValidationMessage(input, isValid, message) {
    const errorElement = input.parentNode.querySelector('.error-message') || 
                        this.createErrorElement(input);
    
    if (isValid) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      input.classList.remove('invalid');
    } else {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      input.classList.add('invalid');
    }
  }
  
  createErrorElement(input) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.875rem';
    input.parentNode.appendChild(errorElement);
    return errorElement;
  }
  
  async submitSecurely(data) {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // CSRF protection
          'X-CSRF-Token': this.getCSRFToken()
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  }
  
  getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  }
}

// Initialize secure form
const secureForm = new SecureForm(document.getElementById('secure-form'));
</script>
```

**3. Secure Headers and Meta Tags:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Security headers via meta tags -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-Frame-Options" content="DENY">
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
  
  <!-- CSRF token -->
  <meta name="csrf-token" content="abc123def456">
  
  <!-- Permissions Policy -->
  <meta http-equiv="Permissions-Policy" 
        content="geolocation=(), microphone=(), camera=()">
  
  <title>Secure Page</title>
</head>
<body>
  <!-- Content here -->
  
  <script>
    // Secure JavaScript practices
    
    // Avoid eval and similar functions
    // BAD: eval(userInput);
    // GOOD: Use JSON.parse for data, proper parsing for code
    
    // Secure DOM manipulation
    function securelyUpdateContent(element, content) {
      // Use textContent for plain text
      element.textContent = content;
      
      // Or sanitize HTML if needed
      element.innerHTML = sanitizeHTML(content);
    }
    
    function sanitizeHTML(html) {
      const div = document.createElement('div');
      div.textContent = html;
      return div.innerHTML;
    }
    
    // Secure event handling
    document.addEventListener('click', (event) => {
      // Validate event target
      if (event.target.matches('.safe-button')) {
        handleSafeButtonClick(event);
      }
    });
    
    // Secure AJAX requests
    async function secureAjaxRequest(url, data) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': getCSRFToken()
          },
          credentials: 'same-origin', // Include cookies for same-origin requests
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Request failed:', error);
        throw error;
      }
    }
    
    function getCSRFToken() {
      return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    }
  </script>
</body>
</html>
```

This comprehensive HTML guide now covers fundamental concepts through advanced modern features, providing practical examples for interview preparation and real-world development with a strong focus on security, accessibility, performance, and modern web standards.

---

## Modern HTML Features and Web Standards

### Q11: What are the latest HTML features and how do you implement modern web standards?
**Difficulty: Advanced**

**Answer:**
Modern HTML includes new elements, attributes, and APIs that enhance functionality, accessibility, and user experience.

**1. Modern HTML Elements and Attributes:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern HTML Features</title>
  
  <!-- Modern meta tags -->
  <meta name="theme-color" content="#2196F3">
  <meta name="color-scheme" content="light dark">
  <link rel="manifest" href="/manifest.json">
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/css/critical.css" as="style">
  <link rel="preload" href="/js/main.js" as="script">
  
  <!-- Module preloading -->
  <link rel="modulepreload" href="/js/modules/core.js">
  
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="preconnect" href="https://api.example.com" crossorigin>
</head>
<body>
  <!-- Modern semantic elements -->
  <header>
    <nav>
      <ul>
        <li><a href="#home" aria-current="page">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <!-- Search element -->
    <search>
      <form role="search" action="/search" method="get">
        <label for="search-input">Search:</label>
        <input type="search" id="search-input" name="q" 
               placeholder="Search products..." 
               autocomplete="off"
               spellcheck="false"
               enterkeyhint="search">
        <button type="submit">Search</button>
      </form>
    </search>
    
    <!-- Details and summary for collapsible content -->
    <details open>
      <summary>Product Features</summary>
      <ul>
        <li>Feature 1: Advanced functionality</li>
        <li>Feature 2: Enhanced performance</li>
        <li>Feature 3: Better user experience</li>
      </ul>
    </details>
    
    <!-- Dialog element for modals -->
    <dialog id="product-modal" aria-labelledby="modal-title">
      <header>
        <h2 id="modal-title">Product Details</h2>
        <button type="button" onclick="closeModal()" aria-label="Close modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </header>
      <main>
        <p>Detailed product information goes here.</p>
      </main>
      <footer>
        <button type="button" onclick="closeModal()">Close</button>
        <button type="button" class="primary">Add to Cart</button>
      </footer>
    </dialog>
    
    <!-- Modern form elements -->
    <form>
      <!-- Color picker -->
      <label for="theme-color">Choose theme color:</label>
      <input type="color" id="theme-color" name="color" value="#2196F3">
      
      <!-- Date and time inputs -->
      <label for="appointment-date">Appointment date:</label>
      <input type="date" id="appointment-date" name="date" 
             min="2024-01-01" max="2024-12-31">
      
      <label for="appointment-time">Appointment time:</label>
      <input type="time" id="appointment-time" name="time" 
             min="09:00" max="17:00" step="1800">
      
      <!-- Range slider -->
      <label for="price-range">Price range: $<span id="price-value">500</span></label>
      <input type="range" id="price-range" name="price" 
             min="0" max="1000" value="500" step="50"
             oninput="document.getElementById('price-value').textContent = this.value">
      
      <!-- File input with multiple and accept -->
      <label for="product-images">Upload product images:</label>
      <input type="file" id="product-images" name="images" 
             multiple accept="image/*" capture="environment">
      
      <!-- Datalist for autocomplete -->
      <label for="product-category">Product category:</label>
      <input type="text" id="product-category" name="category" 
             list="categories" autocomplete="off">
      <datalist id="categories">
        <option value="Electronics">
        <option value="Clothing">
        <option value="Books">
        <option value="Home & Garden">
        <option value="Sports">
      </datalist>
      
      <!-- Output element for calculations -->
      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" name="quantity" value="1" min="1" max="10"
             oninput="calculateTotal()">
      
      <label for="price">Price per item:</label>
      <input type="number" id="price" name="price" value="29.99" step="0.01"
             oninput="calculateTotal()">
      
      <label>Total: $<output id="total" for="quantity price">29.99</output></label>
      
      <!-- Progress element -->
      <label for="completion">Task completion:</label>
      <progress id="completion" value="75" max="100">75%</progress>
      
      <!-- Meter element -->
      <label for="disk-usage">Disk usage:</label>
      <meter id="disk-usage" value="0.6" min="0" max="1" 
             low="0.5" high="0.8" optimum="0.3">60%</meter>
    </form>
    
    <!-- Picture element for responsive images -->
    <picture>
      <source media="(min-width: 800px)" 
              srcset="hero-large.webp 1x, hero-large-2x.webp 2x" 
              type="image/webp">
      <source media="(min-width: 400px)" 
              srcset="hero-medium.webp 1x, hero-medium-2x.webp 2x" 
              type="image/webp">
      <source srcset="hero-small.webp 1x, hero-small-2x.webp 2x" 
              type="image/webp">
      <img src="hero-fallback.jpg" 
           alt="Hero image description" 
           loading="lazy" 
           decoding="async"
           width="800" 
           height="400">
    </picture>
    
    <!-- Template element -->
    <template id="product-card-template">
      <article class="product-card">
        <img src="" alt="" loading="lazy">
        <h3></h3>
        <p class="price"></p>
        <button type="button">Add to Cart</button>
      </article>
    </template>
  </main>
  
  <script>
    // Modern JavaScript for HTML features
    
    // Dialog API
    function openModal() {
      const modal = document.getElementById('product-modal');
      modal.showModal();
      
      // Trap focus within modal
      modal.addEventListener('keydown', handleModalKeydown);
    }
    
    function closeModal() {
      const modal = document.getElementById('product-modal');
      modal.close();
      modal.removeEventListener('keydown', handleModalKeydown);
    }
    
    function handleModalKeydown(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }
    
    // Form calculations
    function calculateTotal() {
      const quantity = document.getElementById('quantity').value;
      const price = document.getElementById('price').value;
      const total = (quantity * price).toFixed(2);
      document.getElementById('total').value = total;
    }
    
    // Template usage
    function createProductCard(product) {
      const template = document.getElementById('product-card-template');
      const clone = template.content.cloneNode(true);
      
      clone.querySelector('img').src = product.image;
      clone.querySelector('img').alt = product.name;
      clone.querySelector('h3').textContent = product.name;
      clone.querySelector('.price').textContent = `$${product.price}`;
      
      return clone;
    }
    
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  </script>
</body>
</html>
```

**2. Web Components:**
```html
<!-- Custom Elements -->
<script>
  // Define a custom element
  class ProductCard extends HTMLElement {
    constructor() {
      super();
      
      // Create shadow DOM
      this.attachShadow({ mode: 'open' });
      
      // Define template
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            margin: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          :host([featured]) {
            border-color: #2196F3;
            box-shadow: 0 4px 8px rgba(33,150,243,0.2);
          }
          
          .image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 4px;
          }
          
          .title {
            font-size: 1.2em;
            font-weight: bold;
            margin: 8px 0;
          }
          
          .price {
            color: #2196F3;
            font-size: 1.1em;
            font-weight: bold;
          }
          
          .button {
            background: #2196F3;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 8px;
          }
          
          .button:hover {
            background: #1976D2;
          }
        </style>
        
        <img class="image" alt="">
        <div class="title"></div>
        <div class="price"></div>
        <button class="button" type="button">Add to Cart</button>
      `;
    }
    
    static get observedAttributes() {
      return ['name', 'price', 'image', 'featured'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'name':
          this.shadowRoot.querySelector('.title').textContent = newValue;
          break;
        case 'price':
          this.shadowRoot.querySelector('.price').textContent = `$${newValue}`;
          break;
        case 'image':
          const img = this.shadowRoot.querySelector('.image');
          img.src = newValue;
          img.alt = this.getAttribute('name') || 'Product image';
          break;
      }
    }
    
    connectedCallback() {
      // Set up event listeners
      this.shadowRoot.querySelector('.button').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('add-to-cart', {
          detail: {
            name: this.getAttribute('name'),
            price: this.getAttribute('price')
          },
          bubbles: true
        }));
      });
    }
  }
  
  // Register the custom element
  customElements.define('product-card', ProductCard);
  
  // Usage event listener
  document.addEventListener('add-to-cart', (event) => {
    console.log('Product added to cart:', event.detail);
  });
</script>

<!-- Use the custom element -->
<product-card 
  name="Wireless Headphones" 
  price="99.99" 
  image="headphones.jpg"
  featured>
</product-card>

<product-card 
  name="Smartphone" 
  price="599.99" 
  image="phone.jpg">
</product-card>
```

**3. Progressive Web App Features:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PWA Example</title>
  
  <!-- PWA meta tags -->
  <meta name="theme-color" content="#2196F3">
  <meta name="background-color" content="#ffffff">
  <meta name="display" content="standalone">
  <meta name="orientation" content="portrait">
  
  <!-- App manifest -->
  <link rel="manifest" href="/manifest.json">
  
  <!-- iOS specific -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="My PWA">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  
  <!-- Service Worker registration -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  </script>
</head>
<body>
  <!-- Install prompt -->
  <div id="install-prompt" style="display: none;">
    <p>Install this app for a better experience!</p>
    <button id="install-button">Install</button>
    <button id="dismiss-button">Dismiss</button>
  </div>
  
  <!-- Offline indicator -->
  <div id="offline-indicator" style="display: none;">
    <p>You're currently offline. Some features may not be available.</p>
  </div>
  
  <main>
    <h1>Progressive Web App</h1>
    <p>This app works offline and can be installed!</p>
    
    <!-- Push notification subscription -->
    <button id="subscribe-notifications">Enable Notifications</button>
  </main>
  
  <script>
    // Install prompt handling
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      const installPrompt = document.getElementById('install-prompt');
      installPrompt.style.display = 'block';
    });
    
    document.getElementById('install-button').addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          }
          deferredPrompt = null;
          document.getElementById('install-prompt').style.display = 'none';
        });
      }
    });
    
    document.getElementById('dismiss-button').addEventListener('click', () => {
      document.getElementById('install-prompt').style.display = 'none';
    });
    
    // Online/offline detection
    function updateOnlineStatus() {
      const offlineIndicator = document.getElementById('offline-indicator');
      if (navigator.onLine) {
        offlineIndicator.style.display = 'none';
      } else {
        offlineIndicator.style.display = 'block';
      }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
    
    // Push notifications
    document.getElementById('subscribe-notifications').addEventListener('click', async () => {
      if ('Notification' in window && 'serviceWorker' in navigator) {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
          });
          
          // Send subscription to server
          await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
          });
          
          console.log('Push notification subscription successful');
        }
      }
    });
  </script>
</body>
</html>
```

**4. Advanced Accessibility Patterns:**
```html
<!-- ARIA Live Regions -->
<div aria-live="polite" aria-atomic="true" id="status-message" class="sr-only"></div>
<div aria-live="assertive" id="error-message" class="sr-only"></div>

<!-- Complex Navigation with ARIA -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false">
        Products
      </a>
      <ul role="menu" aria-label="Products submenu">
        <li role="none">
          <a href="#" role="menuitem">Laptops</a>
        </li>
        <li role="none">
          <a href="#" role="menuitem">Phones</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>

<!-- Accessible Data Table -->
<table role="table" aria-label="Sales data">
  <caption>Quarterly Sales Report 2024</caption>
  <thead>
    <tr>
      <th scope="col" id="quarter">Quarter</th>
      <th scope="col" id="revenue">Revenue</th>
      <th scope="col" id="growth">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" headers="quarter">Q1</th>
      <td headers="revenue quarter">$1.2M</td>
      <td headers="growth quarter">+15%</td>
    </tr>
    <tr>
      <th scope="row" headers="quarter">Q2</th>
      <td headers="revenue quarter">$1.4M</td>
      <td headers="growth quarter">+18%</td>
    </tr>
  </tbody>
</table>

<!-- Accessible Form with Error Handling -->
<form novalidate>
  <fieldset>
    <legend>Personal Information</legend>
    
    <div class="form-group">
      <label for="email">Email Address *</label>
      <input type="email" id="email" name="email" 
             required aria-describedby="email-error email-help"
             aria-invalid="false">
      <div id="email-help" class="help-text">
        We'll never share your email with anyone else.
      </div>
      <div id="email-error" class="error-message" aria-live="polite"></div>
    </div>
    
    <div class="form-group">
      <fieldset>
        <legend>Preferred Contact Method</legend>
        <div>
          <input type="radio" id="contact-email" name="contact" value="email">
          <label for="contact-email">Email</label>
        </div>
        <div>
          <input type="radio" id="contact-phone" name="contact" value="phone">
          <label for="contact-phone">Phone</label>
        </div>
      </fieldset>
    </div>
  </fieldset>
  
  <button type="submit" aria-describedby="submit-help">
    Submit Form
  </button>
  <div id="submit-help" class="help-text">
    All required fields must be completed before submission.
  </div>
</form>

<script>
  // Accessible form validation
  function validateForm() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    
    if (!emailInput.validity.valid) {
      emailInput.setAttribute('aria-invalid', 'true');
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return false;
    } else {
      emailInput.setAttribute('aria-invalid', 'false');
      emailError.textContent = '';
    }
    
    return true;
  }
  
  // Announce status updates
  function announceStatus(message, isError = false) {
    const statusElement = isError ? 
      document.getElementById('error-message') : 
      document.getElementById('status-message');
    
    statusElement.textContent = message;
    
    // Clear message after a delay
    setTimeout(() => {
      statusElement.textContent = '';
    }, 5000);
  }
</script>
```

This enhanced HTML guide now includes cutting-edge web standards, modern HTML features, web components, PWA capabilities, and advanced accessibility patterns that represent the current state of web development.

---

## Modern HTML5 Advanced Features and Web Components

### Q1: How do you create and implement custom Web Components?
**Difficulty: Expert**

**Answer:**
Web Components provide a way to create reusable, encapsulated HTML elements with custom functionality using native browser APIs.

**1. Custom Elements with Shadow DOM:**
```html
<!-- Custom Button Component -->
<script>
class CustomButton extends HTMLElement {
  constructor() {
    super();
    
    // Create shadow root for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Define component state
    this.state = {
      loading: false,
      disabled: false,
      variant: 'primary'
    };
    
    this.render();
    this.setupEventListeners();
  }
  
  // Define observed attributes
  static get observedAttributes() {
    return ['variant', 'disabled', 'loading', 'size', 'icon'];
  }
  
  // Lifecycle callback when attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.state[name] = newValue;
      this.render();
    }
  }
  
  // Lifecycle callback when element is connected to DOM
  connectedCallback() {
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    
    // Handle accessibility
    if (!this.hasAttribute('aria-label') && !this.textContent.trim()) {
      console.warn('Custom button should have aria-label or text content');
    }
  }
  
  // Lifecycle callback when element is disconnected
  disconnectedCallback() {
    this.removeEventListeners();
  }
  
  render() {
    const { variant, loading, disabled, size, icon } = this.state;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          --primary-color: #007bff;
          --secondary-color: #6c757d;
          --success-color: #28a745;
          --danger-color: #dc3545;
          --warning-color: #ffc107;
          --info-color: #17a2b8;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.375rem;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.5;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          position: relative;
          overflow: hidden;
        }
        
        .btn:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
        }
        
        /* Variants */
        .btn--primary {
          background-color: var(--primary-color);
          color: white;
        }
        
        .btn--primary:hover:not(:disabled) {
          background-color: #0056b3;
          transform: translateY(-1px);
        }
        
        .btn--secondary {
          background-color: var(--secondary-color);
          color: white;
        }
        
        .btn--outline {
          background-color: transparent;
          color: var(--primary-color);
          border: 2px solid var(--primary-color);
        }
        
        .btn--ghost {
          background-color: transparent;
          color: var(--primary-color);
        }
        
        .btn--ghost:hover:not(:disabled) {
          background-color: rgba(0, 123, 255, 0.1);
        }
        
        /* Sizes */
        .btn--small {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
        
        .btn--large {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }
        
        /* Loading state */
        .btn--loading {
          color: transparent;
        }
        
        .spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .icon {
          width: 1em;
          height: 1em;
          fill: currentColor;
        }
        
        /* Ripple effect */
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      </style>
      
      <button 
        class="btn btn--${variant} ${size ? `btn--${size}` : ''} ${loading === 'true' ? 'btn--loading' : ''}"
        ${disabled === 'true' ? 'disabled' : ''}
        aria-label="${this.getAttribute('aria-label') || ''}"
      >
        ${loading === 'true' ? '<div class="spinner"></div>' : ''}
        ${icon ? `<svg class="icon"><use href="#${icon}"></use></svg>` : ''}
        <slot></slot>
      </button>
    `;
  }
  
  setupEventListeners() {
    this.addEventListener('click', this.handleClick.bind(this));
    this.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  
  removeEventListeners() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeydown);
  }
  
  handleClick(event) {
    if (this.state.disabled === 'true' || this.state.loading === 'true') {
      event.preventDefault();
      return;
    }
    
    // Create ripple effect
    this.createRipple(event);
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('custom-click', {
      detail: { originalEvent: event },
      bubbles: true
    }));
  }
  
  handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  }
  
  createRipple(event) {
    const button = this.shadowRoot.querySelector('.btn');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Public methods
  setLoading(loading) {
    this.setAttribute('loading', loading);
  }
  
  setDisabled(disabled) {
    this.setAttribute('disabled', disabled);
  }
}

// Register the custom element
customElements.define('custom-button', CustomButton);
</script>

<!-- Usage Examples -->
<custom-button variant="primary">Primary Button</custom-button>
<custom-button variant="secondary" size="large">Large Secondary</custom-button>
<custom-button variant="outline" icon="star">Starred</custom-button>
<custom-button variant="ghost" loading="true">Loading...</custom-button>
<custom-button disabled="true">Disabled</custom-button>
```

**2. Advanced Data Table Component:**
```html
<script>
class DataTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.state = {
      data: [],
      columns: [],
      sortColumn: null,
      sortDirection: 'asc',
      currentPage: 1,
      pageSize: 10,
      searchTerm: '',
      selectedRows: new Set()
    };
    
    this.render();
  }
  
  static get observedAttributes() {
    return ['data', 'columns', 'page-size', 'searchable', 'sortable', 'selectable'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'data':
        try {
          this.state.data = JSON.parse(newValue);
        } catch (e) {
          console.error('Invalid JSON data:', e);
        }
        break;
      case 'columns':
        try {
          this.state.columns = JSON.parse(newValue);
        } catch (e) {
          console.error('Invalid JSON columns:', e);
        }
        break;
      case 'page-size':
        this.state.pageSize = parseInt(newValue) || 10;
        break;
    }
    this.render();
  }
  
  connectedCallback() {
    this.setAttribute('role', 'region');
    this.setAttribute('aria-label', 'Data table');
  }
  
  render() {
    const filteredData = this.getFilteredData();
    const sortedData = this.getSortedData(filteredData);
    const paginatedData = this.getPaginatedData(sortedData);
    const totalPages = Math.ceil(filteredData.length / this.state.pageSize);
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .table-container {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }
        
        .table-header {
          padding: 1rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .search-input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 0.875rem;
        }
        
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .table th,
        .table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .table th {
          background: #f8f9fa;
          font-weight: 600;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        
        .sortable {
          cursor: pointer;
          user-select: none;
          position: relative;
        }
        
        .sortable:hover {
          background: #e9ecef;
        }
        
        .sort-indicator {
          margin-left: 0.5rem;
          opacity: 0.5;
        }
        
        .sort-indicator.active {
          opacity: 1;
        }
        
        .table tbody tr:hover {
          background: #f8f9fa;
        }
        
        .table tbody tr.selected {
          background: #e3f2fd;
        }
        
        .checkbox {
          margin: 0;
        }
        
        .pagination {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }
        
        .pagination-info {
          font-size: 0.875rem;
          color: #6c757d;
        }
        
        .pagination-controls {
          display: flex;
          gap: 0.5rem;
        }
        
        .pagination-btn {
          padding: 0.5rem 0.75rem;
          border: 1px solid #ccc;
          background: white;
          cursor: pointer;
          border-radius: 4px;
          font-size: 0.875rem;
        }
        
        .pagination-btn:hover:not(:disabled) {
          background: #f8f9fa;
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pagination-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
        
        .no-data {
          text-align: center;
          padding: 2rem;
          color: #6c757d;
        }
      </style>
      
      <div class="table-container">
        ${this.hasAttribute('searchable') ? `
          <div class="table-header">
            <h3>Data Table</h3>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search..."
              value="${this.state.searchTerm}"
            >
          </div>
        ` : ''}
        
        <table class="table" role="table">
          <thead>
            <tr role="row">
              ${this.hasAttribute('selectable') ? '<th><input type="checkbox" class="checkbox select-all"></th>' : ''}
              ${this.state.columns.map(col => `
                <th 
                  role="columnheader"
                  class="${this.hasAttribute('sortable') ? 'sortable' : ''}"
                  data-column="${col.key}"
                  aria-sort="${this.getSortAriaValue(col.key)}"
                >
                  ${col.label}
                  ${this.hasAttribute('sortable') ? `
                    <span class="sort-indicator ${this.state.sortColumn === col.key ? 'active' : ''}">
                      ${this.getSortIcon(col.key)}
                    </span>
                  ` : ''}
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${paginatedData.length > 0 ? paginatedData.map((row, index) => `
              <tr role="row" data-index="${index}" class="${this.state.selectedRows.has(index) ? 'selected' : ''}">
                ${this.hasAttribute('selectable') ? `<td><input type="checkbox" class="checkbox row-select" ${this.state.selectedRows.has(index) ? 'checked' : ''}></td>` : ''}
                ${this.state.columns.map(col => `
                  <td role="gridcell">${this.formatCellValue(row[col.key], col)}</td>
                `).join('')}
              </tr>
            `).join('') : `
              <tr>
                <td colspan="${this.state.columns.length + (this.hasAttribute('selectable') ? 1 : 0)}" class="no-data">
                  No data available
                </td>
              </tr>
            `}
          </tbody>
        </table>
        
        ${filteredData.length > this.state.pageSize ? `
          <div class="pagination">
            <div class="pagination-info">
              Showing ${(this.state.currentPage - 1) * this.state.pageSize + 1} to 
              ${Math.min(this.state.currentPage * this.state.pageSize, filteredData.length)} 
              of ${filteredData.length} entries
            </div>
            <div class="pagination-controls">
              <button class="pagination-btn" ${this.state.currentPage === 1 ? 'disabled' : ''} data-page="prev">
                Previous
              </button>
              ${this.getPaginationNumbers(totalPages).map(page => `
                <button 
                  class="pagination-btn ${page === this.state.currentPage ? 'active' : ''}"
                  data-page="${page}"
                >
                  ${page}
                </button>
              `).join('')}
              <button class="pagination-btn" ${this.state.currentPage === totalPages ? 'disabled' : ''} data-page="next">
                Next
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Search functionality
    const searchInput = this.shadowRoot.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.searchTerm = e.target.value;
        this.state.currentPage = 1;
        this.render();
      });
    }
    
    // Sorting functionality
    this.shadowRoot.querySelectorAll('.sortable').forEach(header => {
      header.addEventListener('click', () => {
        const column = header.dataset.column;
        if (this.state.sortColumn === column) {
          this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.state.sortColumn = column;
          this.state.sortDirection = 'asc';
        }
        this.render();
      });
    });
    
    // Selection functionality
    const selectAll = this.shadowRoot.querySelector('.select-all');
    if (selectAll) {
      selectAll.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.state.data.forEach((_, index) => this.state.selectedRows.add(index));
        } else {
          this.state.selectedRows.clear();
        }
        this.render();
        this.dispatchSelectionEvent();
      });
    }
    
    this.shadowRoot.querySelectorAll('.row-select').forEach((checkbox, index) => {
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.state.selectedRows.add(index);
        } else {
          this.state.selectedRows.delete(index);
        }
        this.render();
        this.dispatchSelectionEvent();
      });
    });
    
    // Pagination functionality
    this.shadowRoot.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page === 'prev') {
          this.state.currentPage = Math.max(1, this.state.currentPage - 1);
        } else if (page === 'next') {
          const totalPages = Math.ceil(this.getFilteredData().length / this.state.pageSize);
          this.state.currentPage = Math.min(totalPages, this.state.currentPage + 1);
        } else {
          this.state.currentPage = parseInt(page);
        }
        this.render();
      });
    });
  }
  
  getFilteredData() {
    if (!this.state.searchTerm) return this.state.data;
    
    return this.state.data.filter(row => 
      this.state.columns.some(col => 
        String(row[col.key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
      )
    );
  }
  
  getSortedData(data) {
    if (!this.state.sortColumn) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[this.state.sortColumn];
      const bVal = b[this.state.sortColumn];
      
      if (aVal < bVal) return this.state.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  getPaginatedData(data) {
    const start = (this.state.currentPage - 1) * this.state.pageSize;
    const end = start + this.state.pageSize;
    return data.slice(start, end);
  }
  
  getPaginationNumbers(totalPages) {
    const pages = [];
    const current = this.state.currentPage;
    const delta = 2;
    
    for (let i = Math.max(1, current - delta); i <= Math.min(totalPages, current + delta); i++) {
      pages.push(i);
    }
    
    return pages;
  }
  
  getSortIcon(column) {
    if (this.state.sortColumn !== column) return '↕️';
    return this.state.sortDirection === 'asc' ? '↑' : '↓';
  }
  
  getSortAriaValue(column) {
    if (this.state.sortColumn !== column) return 'none';
    return this.state.sortDirection === 'asc' ? 'ascending' : 'descending';
  }
  
  formatCellValue(value, column) {
    if (column.formatter) {
      return column.formatter(value);
    }
    return value;
  }
  
  dispatchSelectionEvent() {
    this.dispatchEvent(new CustomEvent('selection-change', {
      detail: {
        selectedRows: Array.from(this.state.selectedRows),
        selectedData: Array.from(this.state.selectedRows).map(index => this.state.data[index])
      },
      bubbles: true
    }));
  }
  
  // Public API
  setData(data) {
    this.state.data = data;
    this.render();
  }
  
  getSelectedRows() {
    return Array.from(this.state.selectedRows).map(index => this.state.data[index]);
  }
  
  clearSelection() {
    this.state.selectedRows.clear();
    this.render();
  }
}

customElements.define('data-table', DataTable);
</script>

<!-- Usage Example -->
<data-table 
  searchable 
  sortable 
  selectable 
  page-size="5"
  columns='[
    {"key": "name", "label": "Name"},
    {"key": "email", "label": "Email"},
    {"key": "role", "label": "Role"},
    {"key": "status", "label": "Status"}
  ]'
  data='[
    {"name": "John Doe", "email": "john@example.com", "role": "Admin", "status": "Active"},
    {"name": "Jane Smith", "email": "jane@example.com", "role": "User", "status": "Active"},
    {"name": "Bob Johnson", "email": "bob@example.com", "role": "User", "status": "Inactive"}
  ]'
></data-table>
```

### Q2: How do you implement advanced Progressive Web App (PWA) features?
**Difficulty: Expert**

**Answer:**
Modern PWAs require sophisticated service workers, offline capabilities, push notifications, and native-like experiences.

**1. Advanced Service Worker with Caching Strategies:**
```html
<!-- manifest.json -->
<script>
// Advanced PWA Manifest
const manifest = {
  "name": "Advanced PWA Application",
  "short_name": "AdvancedPWA",
  "description": "A comprehensive Progressive Web Application",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#007bff",
  "background_color": "#ffffff",
  "categories": ["productivity", "utilities"],
  "lang": "en",
  "dir": "ltr",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "shortcuts": [
    {
      "name": "New Document",
      "short_name": "New Doc",
      "description": "Create a new document",
      "url": "/new",
      "icons": [{ "src": "/icons/new-doc.png", "sizes": "96x96" }]
    },
    {
      "name": "Dashboard",
      "short_name": "Dashboard",
      "description": "View dashboard",
      "url": "/dashboard",
      "icons": [{ "src": "/icons/dashboard.png", "sizes": "96x96" }]
    }
  ],
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [
        {
          "name": "file",
          "accept": ["image/*", "text/*"]
        }
      ]
    }
  },
  "protocol_handlers": [
    {
      "protocol": "web+pwa",
      "url": "/handle?url=%s"
    }
  ]
};

// Write manifest to file
const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], {
  type: 'application/json'
});
</script>

<!-- Advanced Service Worker -->
<script>
// sw.js - Advanced Service Worker
const CACHE_NAME = 'advanced-pwa-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';
const OFFLINE_CACHE = 'offline-cache-v1';

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Route configurations
const ROUTE_CONFIG = [
  {
    pattern: /\.(js|css|woff2?)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: CACHE_NAME,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  {
    pattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: 'images-cache',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  {
    pattern: /\/api\//,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cacheName: 'api-cache',
    maxAge: 5 * 60 * 1000 // 5 minutes
  },
  {
    pattern: /\/(dashboard|profile|settings)/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: RUNTIME_CACHE
  }
];

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache essential resources
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles/main.css',
          '/scripts/main.js',
          '/offline.html'
        ]);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName !== CACHE_NAME && 
                     cacheName !== RUNTIME_CACHE && 
                     cacheName !== OFFLINE_CACHE;
            })
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      // Claim all clients
      self.clients.claim()
    ])
  );
});

// Fetch event with advanced caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Find matching route configuration
  const routeConfig = ROUTE_CONFIG.find(config => 
    config.pattern.test(url.pathname + url.search)
  );
  
  if (routeConfig) {
    event.respondWith(handleRequest(request, routeConfig));
  } else {
    // Default strategy for unmatched routes
    event.respondWith(
      handleRequest(request, {
        strategy: CACHE_STRATEGIES.NETWORK_FIRST,
        cacheName: RUNTIME_CACHE
      })
    );
  }
});

// Advanced request handling
async function handleRequest(request, config) {
  const { strategy, cacheName, maxAge } = config;
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cacheName, maxAge);
    
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cacheName, maxAge);
    
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cacheName);
    
    case CACHE_STRATEGIES.NETWORK_ONLY:
      return fetch(request);
    
    case CACHE_STRATEGIES.CACHE_ONLY:
      return caches.match(request);
    
    default:
      return networkFirst(request, cacheName, maxAge);
  }
}

// Cache-first strategy
async function cacheFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Check if cache is expired
    if (maxAge && isCacheExpired(cachedResponse, maxAge)) {
      // Try to update cache in background
      updateCacheInBackground(request, cache);
    }
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return getOfflineFallback(request);
  }
}

// Network-first strategy
async function networkFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return getOfflineFallback(request);
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Update cache in background
  const networkPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  return cachedResponse || networkPromise;
}

// Utility functions
function isCacheExpired(response, maxAge) {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;
  
  const cacheDate = new Date(dateHeader);
  const now = new Date();
  return (now.getTime() - cacheDate.getTime()) > maxAge;
}

async function updateCacheInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response);
    }
  } catch (error) {
    console.log('Background cache update failed:', error);
  }
}

async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  if (request.destination === 'document') {
    return caches.match('/offline.html');
  }
  
  if (request.destination === 'image') {
    return caches.match('/images/offline-image.svg');
  }
  
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic
  console.log('Performing background sync...');
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('PWA Notification', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/explore')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
</script>

<!-- PWA Installation and Management -->
<script>
class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.registration = null;
    
    this.init();
  }
  
  async init() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', this.registration);
        
        // Listen for updates
        this.registration.addEventListener('updatefound', () => {
          this.handleServiceWorkerUpdate();
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
    
    // Handle install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });
    
    // Check if already installed
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.hideInstallButton();
      this.trackInstallation();
    });
    
    // Handle online/offline status
    window.addEventListener('online', () => this.handleOnlineStatus(true));
    window.addEventListener('offline', () => this.handleOnlineStatus(false));
    
    // Request notification permission
    this.requestNotificationPermission();
    
    // Setup push notifications
    this.setupPushNotifications();
  }
  
  async installApp() {
    if (!this.deferredPrompt) {
      console.log('Install prompt not available');
      return;
    }
    
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      this.trackInstallation();
    } else {
      console.log('User dismissed the install prompt');
    }
    
    this.deferredPrompt = null;
  }
  
  showInstallButton() {
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.addEventListener('click', () => this.installApp());
    }
  }
  
  hideInstallButton() {
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }
  
  handleServiceWorkerUpdate() {
    const newWorker = this.registration.installing;
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        this.showUpdateAvailable();
      }
    });
  }
  
  showUpdateAvailable() {
    const updateBanner = document.createElement('div');
    updateBanner.className = 'update-banner';
    updateBanner.innerHTML = `
      <div class="update-content">
        <span>A new version is available!</span>
        <button id="update-button">Update</button>
        <button id="dismiss-update">Dismiss</button>
      </div>
    `;
    
    document.body.appendChild(updateBanner);
    
    document.getElementById('update-button').addEventListener('click', () => {
      this.applyUpdate();
    });
    
    document.getElementById('dismiss-update').addEventListener('click', () => {
      updateBanner.remove();
    });
  }
  
  async applyUpdate() {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }
  
  handleOnlineStatus(isOnline) {
    const statusIndicator = document.getElementById('connection-status');
    if (statusIndicator) {
      statusIndicator.textContent = isOnline ? 'Online' : 'Offline';
      statusIndicator.className = isOnline ? 'status-online' : 'status-offline';
    }
    
    // Show/hide offline banner
    const offlineBanner = document.getElementById('offline-banner');
    if (offlineBanner) {
      offlineBanner.style.display = isOnline ? 'none' : 'block';
    }
  }
  
  async requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      return permission === 'granted';
    }
    return false;
  }
  
  async setupPushNotifications() {
    if (!this.registration || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      return;
    }
    
    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY')
      });
      
      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  }
  
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  }
  
  async sendSubscriptionToServer(subscription) {
    try {
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
    }
  }
  
  trackInstallation() {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install', {
        event_category: 'PWA',
        event_label: 'App Installed'
      });
    }
  }
  
  // Share API
  async shareContent(data) {
    if (navigator.share) {
      try {
        await navigator.share(data);
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
        this.fallbackShare(data);
      }
    } else {
      this.fallbackShare(data);
    }
  }
  
  fallbackShare(data) {
    // Implement fallback sharing (copy to clipboard, social media links, etc.)
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.url || data.text);
      this.showToast('Link copied to clipboard!');
    }
  }
  
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

// Initialize PWA Manager
const pwaManager = new PWAManager();

// Export for global use
window.pwaManager = pwaManager;
</script>

<!-- PWA HTML Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced PWA</title>
  
  <!-- PWA Meta Tags -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#007bff">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Advanced PWA">
  
  <!-- iOS Icons -->
  <link rel="apple-touch-icon" href="/icons/icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png">
  
  <!-- Windows Tiles -->
  <meta name="msapplication-TileImage" content="/icons/icon-144x144.png">
  <meta name="msapplication-TileColor" content="#007bff">
  
  <style>
    .update-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #007bff;
      color: white;
      padding: 1rem;
      z-index: 1000;
      text-align: center;
    }
    
    .update-content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    
    .update-content button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    #update-button {
      background: white;
      color: #007bff;
    }
    
    #dismiss-update {
      background: transparent;
      color: white;
      border: 1px solid white;
    }
    
    .status-online {
      color: green;
    }
    
    .status-offline {
      color: red;
    }
    
    #offline-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #dc3545;
      color: white;
      padding: 0.5rem;
      text-align: center;
      display: none;
    }
    
    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 1rem 2rem;
      border-radius: 4px;
      z-index: 1000;
    }
    
    #install-button {
      display: none;
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #007bff;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
  </style>
</head>
<body>
  <header>
    <h1>Advanced PWA</h1>
    <div id="connection-status" class="status-online">Online</div>
  </header>
  
  <main>
    <section>
      <h2>PWA Features</h2>
      <button onclick="pwaManager.shareContent({title: 'Advanced PWA', text: 'Check out this amazing PWA!', url: window.location.href})">
        Share App
      </button>
    </section>
  </main>
  
  <button id="install-button">Install App</button>
  
  <div id="offline-banner">
    You are currently offline. Some features may not be available.
  </div>
  
  <script src="/js/pwa-manager.js"></script>
</body>
</html>
```

---

### Q3: How do you implement advanced HTML5 Web APIs and modern browser features?
**Difficulty: Expert**

**Answer:**
Modern HTML5 applications leverage sophisticated Web APIs for enhanced user experiences, performance optimization, and native-like functionality.

**1. Advanced Intersection Observer and Performance APIs:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Web APIs Demo</title>
</head>
<body>
  <!-- Lazy loading with advanced intersection observer -->
  <div class="image-container" data-src="/images/hero-large.webp" data-srcset="/images/hero-small.webp 480w, /images/hero-medium.webp 768w, /images/hero-large.webp 1200w">
    <div class="placeholder"></div>
  </div>
  
  <!-- Performance monitoring elements -->
  <div id="performance-metrics"></div>
  
  <script>
    // Advanced Intersection Observer with performance monitoring
    class AdvancedLazyLoader {
      constructor() {
        this.imageObserver = null;
        this.performanceObserver = null;
        this.loadedImages = new Set();
        this.init();
      }
      
      init() {
        this.setupImageObserver();
        this.setupPerformanceObserver();
        this.observeImages();
      }
      
      setupImageObserver() {
        const options = {
          root: null,
          rootMargin: '50px 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1]
        };
        
        this.imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
              this.loadImage(entry.target);
            }
          });
        }, options);
      }
      
      setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
          this.performanceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'largest-contentful-paint') {
                this.reportLCP(entry);
              }
              if (entry.entryType === 'layout-shift') {
                this.reportCLS(entry);
              }
              if (entry.entryType === 'first-input') {
                this.reportFID(entry);
              }
            }
          });
          
          this.performanceObserver.observe({
            entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input']
          });
        }
      }
      
      async loadImage(container) {
        if (this.loadedImages.has(container)) return;
        
        const src = container.dataset.src;
        const srcset = container.dataset.srcset;
        
        if (!src) return;
        
        this.loadedImages.add(container);
        
        try {
          const img = new Image();
          
          // Progressive loading with WebP support
          const supportsWebP = await this.checkWebPSupport();
          const finalSrc = supportsWebP ? src.replace(/\.(jpg|jpeg|png)$/, '.webp') : src;
          
          img.onload = () => {
            const imgElement = document.createElement('img');
            imgElement.src = finalSrc;
            if (srcset) imgElement.srcset = srcset;
            imgElement.alt = container.dataset.alt || '';
            imgElement.loading = 'lazy';
            
            // Smooth transition
            imgElement.style.opacity = '0';
            imgElement.style.transition = 'opacity 0.3s ease-in-out';
            
            container.appendChild(imgElement);
            
            requestAnimationFrame(() => {
              imgElement.style.opacity = '1';
              container.querySelector('.placeholder')?.remove();
            });
            
            this.imageObserver.unobserve(container);
          };
          
          img.onerror = () => {
            console.error('Failed to load image:', finalSrc);
            this.loadedImages.delete(container);
          };
          
          img.src = finalSrc;
          
        } catch (error) {
          console.error('Error loading image:', error);
          this.loadedImages.delete(container);
        }
      }
      
      async checkWebPSupport() {
        return new Promise((resolve) => {
          const webP = new Image();
          webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
          };
          webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
      }
      
      observeImages() {
        const imageContainers = document.querySelectorAll('.image-container[data-src]');
        imageContainers.forEach(container => {
          this.imageObserver.observe(container);
        });
      }
      
      reportLCP(entry) {
        console.log('Largest Contentful Paint:', entry.startTime);
        this.sendMetric('lcp', entry.startTime);
      }
      
      reportCLS(entry) {
        if (!entry.hadRecentInput) {
          console.log('Cumulative Layout Shift:', entry.value);
          this.sendMetric('cls', entry.value);
        }
      }
      
      reportFID(entry) {
        console.log('First Input Delay:', entry.processingStart - entry.startTime);
        this.sendMetric('fid', entry.processingStart - entry.startTime);
      }
      
      sendMetric(name, value) {
        // Send to analytics service
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: name,
            value: Math.round(value)
          });
        }
      }
    }
    
    // Initialize lazy loader
    const lazyLoader = new AdvancedLazyLoader();
  </script>
</body>
</html>
```

**2. Advanced Web Workers and Background Sync:**
```html
<!-- Main HTML -->
<script>
  // Advanced Web Worker implementation
  class AdvancedWorkerManager {
    constructor() {
      this.workers = new Map();
      this.taskQueue = [];
      this.maxWorkers = navigator.hardwareConcurrency || 4;
      this.init();
    }
    
    init() {
      this.setupBackgroundSync();
      this.setupPeriodicBackgroundSync();
    }
    
    async createWorker(name, script) {
      if (this.workers.has(name)) {
        return this.workers.get(name);
      }
      
      const worker = new Worker(script);
      const workerProxy = {
        worker,
        busy: false,
        postMessage: (data) => {
          return new Promise((resolve, reject) => {
            const id = Math.random().toString(36).substr(2, 9);
            
            const messageHandler = (event) => {
              if (event.data.id === id) {
                worker.removeEventListener('message', messageHandler);
                worker.removeEventListener('error', errorHandler);
                
                if (event.data.error) {
                  reject(new Error(event.data.error));
                } else {
                  resolve(event.data.result);
                }
              }
            };
            
            const errorHandler = (error) => {
              worker.removeEventListener('message', messageHandler);
              worker.removeEventListener('error', errorHandler);
              reject(error);
            };
            
            worker.addEventListener('message', messageHandler);
            worker.addEventListener('error', errorHandler);
            
            worker.postMessage({ id, ...data });
          });
        }
      };
      
      this.workers.set(name, workerProxy);
      return workerProxy;
    }
    
    async executeTask(workerName, script, data) {
      const worker = await this.createWorker(workerName, script);
      
      if (worker.busy) {
        return new Promise((resolve, reject) => {
          this.taskQueue.push({ workerName, script, data, resolve, reject });
        });
      }
      
      worker.busy = true;
      
      try {
        const result = await worker.postMessage(data);
        return result;
      } finally {
        worker.busy = false;
        this.processQueue();
      }
    }
    
    processQueue() {
      if (this.taskQueue.length === 0) return;
      
      const availableWorker = Array.from(this.workers.values())
        .find(worker => !worker.busy);
      
      if (availableWorker) {
        const task = this.taskQueue.shift();
        this.executeTask(task.workerName, task.script, task.data)
          .then(task.resolve)
          .catch(task.reject);
      }
    }
    
    async setupBackgroundSync() {
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready;
        
        // Register background sync
        await registration.sync.register('background-data-sync');
        
        console.log('Background sync registered');
      }
    }
    
    async setupPeriodicBackgroundSync() {
      if ('serviceWorker' in navigator && 'periodicSync' in window.ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready;
        
        // Request permission for periodic background sync
        const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
        
        if (status.state === 'granted') {
          await registration.periodicSync.register('periodic-data-update', {
            minInterval: 24 * 60 * 60 * 1000 // 24 hours
          });
          
          console.log('Periodic background sync registered');
        }
      }
    }
  }
  
  // Usage example
  const workerManager = new AdvancedWorkerManager();
  
  // Heavy computation in worker
  async function processLargeDataset(data) {
    const result = await workerManager.executeTask(
      'data-processor',
      '/workers/data-processor.js',
      { action: 'process', data }
    );
    
    return result;
  }
  
  // Image processing in worker
  async function processImage(imageData) {
    const result = await workerManager.executeTask(
      'image-processor',
      '/workers/image-processor.js',
      { action: 'filter', imageData, filter: 'blur' }
    );
    
    return result;
  }
</script>
```

---

### Q4: How do you implement advanced HTML5 accessibility and inclusive design patterns?
**Difficulty: Expert**

**Answer:**
Advanced accessibility involves sophisticated ARIA patterns, inclusive design principles, and comprehensive support for assistive technologies.

**1. Advanced ARIA Patterns and Live Regions:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Accessibility Patterns</title>
  <style>
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .button {
        border: 2px solid;
      }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    /* Focus management */
    .skip-link {
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
    }
    
    .skip-link:focus {
      top: 6px;
    }
    
    /* Screen reader only content */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  </style>
</head>
<body>
  <!-- Skip navigation -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <!-- Live regions for dynamic content -->
  <div aria-live="polite" aria-atomic="true" id="status-messages" class="sr-only"></div>
  <div aria-live="assertive" aria-atomic="true" id="error-messages" class="sr-only"></div>
  
  <!-- Advanced combobox with autocomplete -->
  <div class="combobox-container">
    <label for="country-input">Country</label>
    <div class="combobox" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-owns="country-listbox">
      <input
        type="text"
        id="country-input"
        aria-autocomplete="list"
        aria-describedby="country-help"
        autocomplete="country"
      >
      <button type="button" aria-label="Show countries" tabindex="-1">
        <span aria-hidden="true">▼</span>
      </button>
    </div>
    <div id="country-help" class="help-text">
      Type to search for a country or use arrow keys to browse
    </div>
    <ul id="country-listbox" role="listbox" aria-label="Countries" hidden>
      <!-- Options populated dynamically -->
    </ul>
  </div>
  
  <!-- Advanced data table with sorting and filtering -->
  <div class="table-container">
    <div class="table-controls">
      <label for="table-filter">Filter table:</label>
      <input type="text" id="table-filter" aria-describedby="filter-help">
      <div id="filter-help" class="help-text">
        Filter results by typing. <span id="result-count" aria-live="polite"></span>
      </div>
    </div>
    
    <table role="table" aria-label="Employee data">
      <caption>
        Employee Information
        <span class="sr-only">Use arrow keys to navigate. Press Enter to sort by column.</span>
      </caption>
      <thead>
        <tr role="row">
          <th role="columnheader" aria-sort="none" tabindex="0">
            <button type="button" aria-describedby="name-sort-help">
              Name
              <span aria-hidden="true" class="sort-indicator"></span>
            </button>
            <div id="name-sort-help" class="sr-only">
              Click to sort by name
            </div>
          </th>
          <th role="columnheader" aria-sort="none" tabindex="0">
            <button type="button" aria-describedby="role-sort-help">
              Role
              <span aria-hidden="true" class="sort-indicator"></span>
            </button>
            <div id="role-sort-help" class="sr-only">
              Click to sort by role
            </div>
          </th>
          <th role="columnheader" aria-sort="none" tabindex="0">
            <button type="button" aria-describedby="status-sort-help">
              Status
              <span aria-hidden="true" class="sort-indicator"></span>
            </button>
            <div id="status-sort-help" class="sr-only">
              Click to sort by status
            </div>
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        <!-- Rows populated dynamically -->
      </tbody>
    </table>
  </div>
  
  <!-- Advanced modal dialog -->
  <div id="modal-overlay" class="modal-overlay" hidden>
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      class="modal"
    >
      <div class="modal-header">
        <h2 id="modal-title">Confirmation Required</h2>
        <button
          type="button"
          aria-label="Close dialog"
          class="modal-close"
          data-action="close-modal"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <p id="modal-description">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" data-action="cancel" class="button button-secondary">
          Cancel
        </button>
        <button type="button" data-action="confirm" class="button button-danger">
          Delete
        </button>
      </div>
    </div>
  </div>
  
  <script>
    // Advanced accessibility manager
    class AccessibilityManager {
      constructor() {
        this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        this.init();
      }
      
      init() {
        this.setupKeyboardNavigation();
        this.setupLiveRegions();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
      }
      
      setupKeyboardNavigation() {
        // Global keyboard event handler
        document.addEventListener('keydown', (event) => {
          // Escape key handling
          if (event.key === 'Escape') {
            this.handleEscape();
          }
          
          // Tab trapping in modals
          if (event.key === 'Tab') {
            this.handleTabTrapping(event);
          }
          
          // Arrow key navigation for custom components
          if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            this.handleArrowNavigation(event);
          }
        });
      }
      
      setupLiveRegions() {
        this.statusRegion = document.getElementById('status-messages');
        this.errorRegion = document.getElementById('error-messages');
      }
      
      announceToScreenReader(message, type = 'status') {
        const region = type === 'error' ? this.errorRegion : this.statusRegion;
        
        // Clear previous message
        region.textContent = '';
        
        // Add new message with slight delay to ensure it's announced
        setTimeout(() => {
          region.textContent = message;
        }, 100);
        
        // Clear message after announcement
        setTimeout(() => {
          region.textContent = '';
        }, 5000);
      }
      
      setupFocusManagement() {
        // Focus management for dynamic content
        this.focusStack = [];
        
        // Store focus before opening modal
        document.addEventListener('modal-open', (event) => {
          this.focusStack.push(document.activeElement);
          this.trapFocus(event.detail.modal);
        });
        
        // Restore focus after closing modal
        document.addEventListener('modal-close', () => {
          const previousFocus = this.focusStack.pop();
          if (previousFocus) {
            previousFocus.focus();
          }
        });
      }
      
      trapFocus(container) {
        const focusableElements = container.querySelectorAll(this.focusableElements);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Focus first element
        firstElement?.focus();
        
        // Set up tab trapping
        container.addEventListener('keydown', (event) => {
          if (event.key === 'Tab') {
            if (event.shiftKey) {
              if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement?.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement?.focus();
              }
            }
          }
        });
      }
      
      handleEscape() {
        // Close any open modals or dropdowns
        const openModal = document.querySelector('[role="dialog"]:not([hidden])');
        if (openModal) {
          this.closeModal(openModal);
        }
        
        const openDropdown = document.querySelector('[aria-expanded="true"]');
        if (openDropdown) {
          this.closeDropdown(openDropdown);
        }
      }
      
      handleTabTrapping(event) {
        const modal = document.querySelector('[role="dialog"]:not([hidden])');
        if (modal) {
          const focusableElements = modal.querySelectorAll(this.focusableElements);
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement?.focus();
            }
          }
        }
      }
      
      setupScreenReaderSupport() {
        // Detect screen reader usage
        this.isScreenReaderActive = this.detectScreenReader();
        
        if (this.isScreenReaderActive) {
          document.body.classList.add('screen-reader-active');
        }
      }
      
      detectScreenReader() {
        // Various methods to detect screen reader
        return (
          navigator.userAgent.includes('NVDA') ||
          navigator.userAgent.includes('JAWS') ||
          navigator.userAgent.includes('VoiceOver') ||
          window.speechSynthesis?.getVoices().length > 0
        );
      }
    }
    
    // Initialize accessibility manager
    const a11yManager = new AccessibilityManager();
  </script>
</body>
</html>
```

---

### Q11: How do you implement advanced Web Components with Shadow DOM and modern HTML5 features?

**Answer:**
Web Components provide a way to create reusable, encapsulated HTML elements using native browser APIs. They combine Custom Elements, Shadow DOM, HTML Templates, and ES Modules for powerful component architecture.

**Advanced Web Components Implementation:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Web Components</title>
    <style>
        /* Global styles */
        :root {
            --primary-color: #007bff;
            --secondary-color: #6c757d;
            --success-color: #28a745;
            --danger-color: #dc3545;
            --warning-color: #ffc107;
            --info-color: #17a2b8;
            --light-color: #f8f9fa;
            --dark-color: #343a40;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 2rem;
            background-color: var(--light-color);
        }
    </style>
</head>
<body>
    <!-- Advanced Card Component -->
    <advanced-card 
        title="Product Card"
        subtitle="Premium Quality"
        image="https://via.placeholder.com/300x200"
        price="$99.99"
        rating="4.5"
        theme="primary">
        <p slot="description">
            This is a high-quality product with excellent features and outstanding performance.
        </p>
        <div slot="actions">
            <button class="btn btn-primary">Add to Cart</button>
            <button class="btn btn-secondary">Wishlist</button>
        </div>
    </advanced-card>
    
    <!-- Advanced Form Component -->
    <advanced-form 
        action="/api/submit"
        method="POST"
        validation="strict"
        auto-save="true">
        <form-field 
            type="text"
            name="fullName"
            label="Full Name"
            required
            pattern="[A-Za-z\s]+"
            error-message="Please enter a valid name">
        </form-field>
        
        <form-field 
            type="email"
            name="email"
            label="Email Address"
            required
            error-message="Please enter a valid email">
        </form-field>
        
        <form-field 
            type="tel"
            name="phone"
            label="Phone Number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            error-message="Please enter phone in format: 123-456-7890">
        </form-field>
        
        <form-field 
            type="select"
            name="country"
            label="Country"
            required
            options='[{"value":"us","label":"United States"},{"value":"ca","label":"Canada"},{"value":"uk","label":"United Kingdom"}]'
            error-message="Please select a country">
        </form-field>
        
        <form-field 
            type="textarea"
            name="message"
            label="Message"
            rows="4"
            maxlength="500"
            error-message="Message is required">
        </form-field>
    </advanced-form>
    
    <!-- Advanced Data Table Component -->
    <data-table 
        endpoint="/api/users"
        sortable="true"
        filterable="true"
        paginated="true"
        page-size="10"
        columns='[
            {"key":"id","label":"ID","sortable":true,"width":"80px"},
            {"key":"name","label":"Name","sortable":true,"filterable":true},
            {"key":"email","label":"Email","sortable":true,"filterable":true},
            {"key":"role","label":"Role","sortable":true,"filterable":true},
            {"key":"status","label":"Status","sortable":true,"type":"badge"},
            {"key":"actions","label":"Actions","type":"actions"}
        ]'>
    </data-table>
    
    <!-- Advanced Modal Component -->
    <advanced-modal 
        id="confirmModal"
        size="medium"
        backdrop="static"
        keyboard="false">
        <div slot="header">
            <h3>Confirm Action</h3>
        </div>
        <div slot="body">
            <p>Are you sure you want to proceed with this action?</p>
        </div>
        <div slot="footer">
            <button class="btn btn-secondary" onclick="closeModal('confirmModal')">Cancel</button>
            <button class="btn btn-danger" onclick="confirmAction()">Confirm</button>
        </div>
    </advanced-modal>
    
    <!-- Advanced Notification System -->
    <notification-system 
        position="top-right"
        auto-dismiss="5000"
        max-notifications="5">
    </notification-system>
    
    <script type="module">
        // Advanced Card Component
        class AdvancedCard extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.render();
            }
            
            static get observedAttributes() {
                return ['title', 'subtitle', 'image', 'price', 'rating', 'theme'];
            }
            
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                    this.render();
                }
            }
            
            render() {
                const title = this.getAttribute('title') || '';
                const subtitle = this.getAttribute('subtitle') || '';
                const image = this.getAttribute('image') || '';
                const price = this.getAttribute('price') || '';
                const rating = parseFloat(this.getAttribute('rating')) || 0;
                const theme = this.getAttribute('theme') || 'primary';
                
                this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            margin: 1rem 0;
                            font-family: inherit;
                        }
                        
                        .card {
                            background: white;
                            border-radius: 12px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                            transition: transform 0.2s ease, box-shadow 0.2s ease;
                            max-width: 400px;
                        }
                        
                        .card:hover {
                            transform: translateY(-4px);
                            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                        }
                        
                        .card-image {
                            width: 100%;
                            height: 200px;
                            object-fit: cover;
                            background: #f0f0f0;
                        }
                        
                        .card-content {
                            padding: 1.5rem;
                        }
                        
                        .card-header {
                            margin-bottom: 1rem;
                        }
                        
                        .card-title {
                            font-size: 1.5rem;
                            font-weight: 600;
                            margin: 0 0 0.5rem 0;
                            color: var(--${theme}-color, #333);
                        }
                        
                        .card-subtitle {
                            font-size: 0.9rem;
                            color: #666;
                            margin: 0;
                        }
                        
                        .card-meta {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin: 1rem 0;
                        }
                        
                        .price {
                            font-size: 1.25rem;
                            font-weight: 700;
                            color: var(--success-color);
                        }
                        
                        .rating {
                            display: flex;
                            align-items: center;
                            gap: 0.25rem;
                        }
                        
                        .star {
                            color: #ffc107;
                            font-size: 1rem;
                        }
                        
                        .star.empty {
                            color: #e0e0e0;
                        }
                        
                        .card-description {
                            margin: 1rem 0;
                        }
                        
                        .card-actions {
                            margin-top: 1.5rem;
                        }
                        
                        ::slotted(.btn) {
                            padding: 0.5rem 1rem;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 500;
                            margin-right: 0.5rem;
                            transition: all 0.2s ease;
                        }
                        
                        ::slotted(.btn-primary) {
                            background: var(--primary-color);
                            color: white;
                        }
                        
                        ::slotted(.btn-secondary) {
                            background: var(--secondary-color);
                            color: white;
                        }
                        
                        ::slotted(.btn:hover) {
                            transform: translateY(-1px);
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                        }
                    </style>
                    
                    <div class="card">
                        ${image ? `<img src="${image}" alt="${title}" class="card-image">` : ''}
                        <div class="card-content">
                            <div class="card-header">
                                <h3 class="card-title">${title}</h3>
                                ${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}
                            </div>
                            
                            <div class="card-meta">
                                ${price ? `<span class="price">${price}</span>` : ''}
                                ${rating > 0 ? `
                                    <div class="rating">
                                        ${this.generateStars(rating)}
                                        <span>(${rating})</span>
                                    </div>
                                ` : ''}
                            </div>
                            
                            <div class="card-description">
                                <slot name="description"></slot>
                            </div>
                            
                            <div class="card-actions">
                                <slot name="actions"></slot>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            generateStars(rating) {
                const fullStars = Math.floor(rating);
                const hasHalfStar = rating % 1 !== 0;
                const emptyStars = 5 - Math.ceil(rating);
                
                let stars = '';
                
                for (let i = 0; i < fullStars; i++) {
                    stars += '<span class="star">★</span>';
                }
                
                if (hasHalfStar) {
                    stars += '<span class="star">☆</span>';
                }
                
                for (let i = 0; i < emptyStars; i++) {
                    stars += '<span class="star empty">☆</span>';
                }
                
                return stars;
            }
        }
        
        // Advanced Form Component
        class AdvancedForm extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.formData = new Map();
                this.validators = new Map();
                this.render();
                this.setupEventListeners();
            }
            
            static get observedAttributes() {
                return ['action', 'method', 'validation', 'auto-save'];
            }
            
            render() {
                this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            margin: 2rem 0;
                        }
                        
                        .form-container {
                            background: white;
                            padding: 2rem;
                            border-radius: 12px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            max-width: 600px;
                        }
                        
                        .form-title {
                            font-size: 1.5rem;
                            font-weight: 600;
                            margin-bottom: 1.5rem;
                            color: #333;
                        }
                        
                        .form-actions {
                            margin-top: 2rem;
                            display: flex;
                            gap: 1rem;
                        }
                        
                        .btn {
                            padding: 0.75rem 1.5rem;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 500;
                            transition: all 0.2s ease;
                        }
                        
                        .btn-primary {
                            background: var(--primary-color);
                            color: white;
                        }
                        
                        .btn-secondary {
                            background: var(--secondary-color);
                            color: white;
                        }
                        
                        .btn:hover {
                            transform: translateY(-1px);
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                        }
                        
                        .btn:disabled {
                            opacity: 0.6;
                            cursor: not-allowed;
                            transform: none;
                            box-shadow: none;
                        }
                        
                        .form-status {
                            margin-top: 1rem;
                            padding: 0.75rem;
                            border-radius: 6px;
                            display: none;
                        }
                        
                        .form-status.success {
                            background: #d4edda;
                            color: #155724;
                            border: 1px solid #c3e6cb;
                        }
                        
                        .form-status.error {
                            background: #f8d7da;
                            color: #721c24;
                            border: 1px solid #f5c6cb;
                        }
                    </style>
                    
                    <div class="form-container">
                        <h2 class="form-title">Contact Form</h2>
                        <form id="advancedForm">
                            <slot></slot>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <button type="reset" class="btn btn-secondary">Reset</button>
                            </div>
                        </form>
                        <div class="form-status" id="formStatus"></div>
                    </div>
                `;
            }
            
            setupEventListeners() {
                const form = this.shadowRoot.getElementById('advancedForm');
                const statusDiv = this.shadowRoot.getElementById('formStatus');
                
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    if (this.validateForm()) {
                        await this.submitForm();
                    }
                });
                
                form.addEventListener('reset', () => {
                    this.resetForm();
                });
                
                // Auto-save functionality
                if (this.getAttribute('auto-save') === 'true') {
                    form.addEventListener('input', this.debounce(() => {
                        this.autoSave();
                    }, 1000));
                }
            }
            
            validateForm() {
                const fields = this.querySelectorAll('form-field');
                let isValid = true;
                
                fields.forEach(field => {
                    if (!field.validate()) {
                        isValid = false;
                    }
                });
                
                return isValid;
            }
            
            async submitForm() {
                const formData = this.getFormData();
                const action = this.getAttribute('action');
                const method = this.getAttribute('method') || 'POST';
                
                try {
                    const response = await fetch(action, {
                        method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    if (response.ok) {
                        this.showStatus('Form submitted successfully!', 'success');
                        this.dispatchEvent(new CustomEvent('form-submitted', {
                            detail: { data: formData, response }
                        }));
                    } else {
                        throw new Error('Submission failed');
                    }
                } catch (error) {
                    this.showStatus('Error submitting form. Please try again.', 'error');
                }
            }
            
            getFormData() {
                const fields = this.querySelectorAll('form-field');
                const data = {};
                
                fields.forEach(field => {
                    const name = field.getAttribute('name');
                    const value = field.getValue();
                    if (name && value !== null) {
                        data[name] = value;
                    }
                });
                
                return data;
            }
            
            showStatus(message, type) {
                const statusDiv = this.shadowRoot.getElementById('formStatus');
                statusDiv.textContent = message;
                statusDiv.className = `form-status ${type}`;
                statusDiv.style.display = 'block';
                
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 5000);
            }
            
            autoSave() {
                const data = this.getFormData();
                localStorage.setItem('form-auto-save', JSON.stringify(data));
            }
            
            resetForm() {
                const fields = this.querySelectorAll('form-field');
                fields.forEach(field => field.reset());
                localStorage.removeItem('form-auto-save');
            }
            
            debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }
        }
        
        // Form Field Component
        class FormField extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.render();
                this.setupValidation();
            }
            
            static get observedAttributes() {
                return ['type', 'name', 'label', 'required', 'pattern', 'error-message', 'options'];
            }
            
            render() {
                const type = this.getAttribute('type') || 'text';
                const name = this.getAttribute('name') || '';
                const label = this.getAttribute('label') || '';
                const required = this.hasAttribute('required');
                const placeholder = this.getAttribute('placeholder') || '';
                const pattern = this.getAttribute('pattern') || '';
                const maxlength = this.getAttribute('maxlength') || '';
                const rows = this.getAttribute('rows') || '3';
                const options = this.getAttribute('options') ? JSON.parse(this.getAttribute('options')) : [];
                
                let inputHTML = '';
                
                switch (type) {
                    case 'textarea':
                        inputHTML = `<textarea 
                            id="${name}" 
                            name="${name}" 
                            placeholder="${placeholder}"
                            rows="${rows}"
                            ${maxlength ? `maxlength="${maxlength}"` : ''}
                            ${required ? 'required' : ''}></textarea>`;
                        break;
                    case 'select':
                        inputHTML = `<select id="${name}" name="${name}" ${required ? 'required' : ''}>
                            <option value="">Select ${label}</option>
                            ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                        </select>`;
                        break;
                    default:
                        inputHTML = `<input 
                            type="${type}" 
                            id="${name}" 
                            name="${name}" 
                            placeholder="${placeholder}"
                            ${pattern ? `pattern="${pattern}"` : ''}
                            ${maxlength ? `maxlength="${maxlength}"` : ''}
                            ${required ? 'required' : ''}>`;
                }
                
                this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            margin-bottom: 1.5rem;
                        }
                        
                        .field-group {
                            display: flex;
                            flex-direction: column;
                        }
                        
                        label {
                            font-weight: 500;
                            margin-bottom: 0.5rem;
                            color: #333;
                        }
                        
                        .required {
                            color: #dc3545;
                        }
                        
                        input, textarea, select {
                            padding: 0.75rem;
                            border: 2px solid #e0e0e0;
                            border-radius: 6px;
                            font-size: 1rem;
                            transition: border-color 0.2s ease, box-shadow 0.2s ease;
                            font-family: inherit;
                        }
                        
                        input:focus, textarea:focus, select:focus {
                            outline: none;
                            border-color: var(--primary-color);
                            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                        }
                        
                        input:invalid, textarea:invalid, select:invalid {
                            border-color: var(--danger-color);
                        }
                        
                        .error-message {
                            color: var(--danger-color);
                            font-size: 0.875rem;
                            margin-top: 0.25rem;
                            display: none;
                        }
                        
                        .field-group.error .error-message {
                            display: block;
                        }
                        
                        .field-group.error input,
                        .field-group.error textarea,
                        .field-group.error select {
                            border-color: var(--danger-color);
                        }
                        
                        textarea {
                            resize: vertical;
                            min-height: 100px;
                        }
                        
                        select {
                            cursor: pointer;
                        }
                    </style>
                    
                    <div class="field-group">
                        <label for="${name}">
                            ${label}
                            ${required ? '<span class="required">*</span>' : ''}
                        </label>
                        ${inputHTML}
                        <div class="error-message">${this.getAttribute('error-message') || 'This field is invalid'}</div>
                    </div>
                `;
            }
            
            setupValidation() {
                const input = this.shadowRoot.querySelector('input, textarea, select');
                const fieldGroup = this.shadowRoot.querySelector('.field-group');
                
                if (input) {
                    input.addEventListener('blur', () => {
                        this.validate();
                    });
                    
                    input.addEventListener('input', () => {
                        if (fieldGroup.classList.contains('error')) {
                            this.validate();
                        }
                    });
                }
            }
            
            validate() {
                const input = this.shadowRoot.querySelector('input, textarea, select');
                const fieldGroup = this.shadowRoot.querySelector('.field-group');
                const isValid = input.checkValidity();
                
                if (isValid) {
                    fieldGroup.classList.remove('error');
                } else {
                    fieldGroup.classList.add('error');
                }
                
                return isValid;
            }
            
            getValue() {
                const input = this.shadowRoot.querySelector('input, textarea, select');
                return input ? input.value : null;
            }
            
            setValue(value) {
                const input = this.shadowRoot.querySelector('input, textarea, select');
                if (input) {
                    input.value = value;
                }
            }
            
            reset() {
                const input = this.shadowRoot.querySelector('input, textarea, select');
                const fieldGroup = this.shadowRoot.querySelector('.field-group');
                
                if (input) {
                    input.value = '';
                    fieldGroup.classList.remove('error');
                }
            }
        }
        
        // Register components
        customElements.define('advanced-card', AdvancedCard);
        customElements.define('advanced-form', AdvancedForm);
        customElements.define('form-field', FormField);
        
        // Demo functionality
        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        };
        
        window.confirmAction = function() {
            alert('Action confirmed!');
            closeModal('confirmModal');
        };
    </script>
</body>
</html>
```

---

### Q12: How do you implement Progressive Web App (PWA) features with advanced caching strategies and offline functionality?

**Answer:**
Progressive Web Apps combine the best of web and mobile apps, providing app-like experiences with advanced caching, offline functionality, push notifications, and native device integration.

**Complete PWA Implementation:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced PWA</title>
    
    <!-- PWA Meta Tags -->
    <meta name="description" content="Advanced Progressive Web App with offline capabilities">
    <meta name="theme-color" content="#007bff">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Advanced PWA">
    <meta name="msapplication-TileColor" content="#007bff">
    <meta name="msapplication-config" content="/browserconfig.xml">
    
    <!-- PWA Icons -->
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#007bff">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="/manifest.json">
    
    <!-- Preload Critical Resources -->
    <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/critical.css" as="style">
    <link rel="preload" href="/js/app.js" as="script">
    
    <!-- Critical CSS -->
    <style>
        /* Critical above-the-fold styles */
        :root {
            --primary-color: #007bff;
            --secondary-color: #6c757d;
            --success-color: #28a745;
            --danger-color: #dc3545;
            --warning-color: #ffc107;
            --info-color: #17a2b8;
            --light-color: #f8f9fa;
            --dark-color: #343a40;
            --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        * {
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            font-family: var(--font-family);
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .app-header {
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .app-title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .main-content {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .offline-indicator {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--warning-color);
            color: #333;
            padding: 0.5rem;
            text-align: center;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 2000;
        }
        
        .offline-indicator.show {
            transform: translateY(0);
        }
        
        .install-prompt {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 1rem;
            display: none;
            z-index: 1500;
        }
        
        .install-prompt.show {
            display: block;
        }
        
        .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            text-decoration: none;
            display: inline-block;
            transition: all 0.2s ease;
        }
        
        .btn-primary {
            background: var(--primary-color);
            color: white;
        }
        
        .btn-secondary {
            background: var(--secondary-color);
            color: white;
        }
        
        .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <!-- Offline Indicator -->
    <div id="offlineIndicator" class="offline-indicator">
        <span>You're currently offline. Some features may be limited.</span>
    </div>
    
    <!-- App Header -->
    <header class="app-header">
        <h1 class="app-title">Advanced PWA</h1>
        <div class="header-actions">
            <button id="syncBtn" class="btn btn-secondary">Sync Data</button>
            <button id="notificationBtn" class="btn btn-secondary">Enable Notifications</button>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="main-content">
        <section id="appContent">
            <div class="loading">
                <div class="spinner"></div>
            </div>
        </section>
        
        <!-- Data Display -->
        <section id="dataSection" style="display: none;">
            <h2>Data Management</h2>
            <div id="dataList"></div>
            <button id="addDataBtn" class="btn btn-primary">Add New Item</button>
        </section>
        
        <!-- Sync Status -->
        <section id="syncStatus">
            <h3>Sync Status</h3>
            <div id="syncInfo"></div>
        </section>
    </main>
    
    <!-- Install Prompt -->
    <div id="installPrompt" class="install-prompt">
        <h3>Install App</h3>
        <p>Install this app on your device for a better experience!</p>
        <button id="installBtn" class="btn btn-primary">Install</button>
        <button id="dismissBtn" class="btn btn-secondary">Maybe Later</button>
    </div>
    
    <!-- Service Worker Registration -->
    <script>
        // Service Worker Registration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    console.log('SW registered: ', registration);
                    
                    // Handle service worker updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content is available
                                showUpdateNotification();
                            }
                        });
                    });
                } catch (error) {
                    console.log('SW registration failed: ', error);
                }
            });
        }
        
        // PWA Install Prompt
        let deferredPrompt;
        const installPrompt = document.getElementById('installPrompt');
        const installBtn = document.getElementById('installBtn');
        const dismissBtn = document.getElementById('dismissBtn');
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installPrompt.classList.add('show');
        });
        
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installPrompt.classList.remove('show');
            }
        });
        
        dismissBtn.addEventListener('click', () => {
            installPrompt.classList.remove('show');
        });
        
        // Network Status Management
        const offlineIndicator = document.getElementById('offlineIndicator');
        
        function updateOnlineStatus() {
            if (navigator.onLine) {
                offlineIndicator.classList.remove('show');
                syncPendingData();
            } else {
                offlineIndicator.classList.add('show');
            }
        }
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        
        // Initialize app
        updateOnlineStatus();
        
        // Advanced Data Management with IndexedDB
        class DataManager {
            constructor() {
                this.dbName = 'AdvancedPWADB';
                this.dbVersion = 1;
                this.db = null;
                this.init();
            }
            
            async init() {
                return new Promise((resolve, reject) => {
                    const request = indexedDB.open(this.dbName, this.dbVersion);
                    
                    request.onerror = () => reject(request.error);
                    request.onsuccess = () => {
                        this.db = request.result;
                        resolve(this.db);
                    };
                    
                    request.onupgradeneeded = (event) => {
                        const db = event.target.result;
                        
                        // Create object stores
                        if (!db.objectStoreNames.contains('items')) {
                            const itemStore = db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
                            itemStore.createIndex('timestamp', 'timestamp', { unique: false });
                            itemStore.createIndex('synced', 'synced', { unique: false });
                        }
                        
                        if (!db.objectStoreNames.contains('syncQueue')) {
                            const syncStore = db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
                            syncStore.createIndex('action', 'action', { unique: false });
                            syncStore.createIndex('timestamp', 'timestamp', { unique: false });
                        }
                    };
                });
            }
            
            async addItem(data) {
                const transaction = this.db.transaction(['items', 'syncQueue'], 'readwrite');
                const itemStore = transaction.objectStore('items');
                const syncStore = transaction.objectStore('syncQueue');
                
                const item = {
                    ...data,
                    timestamp: Date.now(),
                    synced: navigator.onLine
                };
                
                const result = await this.promisifyRequest(itemStore.add(item));
                
                // Add to sync queue if offline
                if (!navigator.onLine) {
                    await this.promisifyRequest(syncStore.add({
                        action: 'create',
                        itemId: result,
                        data: item,
                        timestamp: Date.now()
                    }));
                }
                
                return result;
            }
            
            async getItems() {
                const transaction = this.db.transaction(['items'], 'readonly');
                const store = transaction.objectStore('items');
                return this.promisifyRequest(store.getAll());
            }
            
            async syncPendingItems() {
                const transaction = this.db.transaction(['syncQueue'], 'readonly');
                const store = transaction.objectStore('syncQueue');
                const pendingItems = await this.promisifyRequest(store.getAll());
                
                for (const item of pendingItems) {
                    try {
                        await this.syncItem(item);
                        await this.removeSyncItem(item.id);
                    } catch (error) {
                        console.error('Sync failed for item:', item, error);
                    }
                }
            }
            
            async syncItem(syncItem) {
                const response = await fetch('/api/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(syncItem.data)
                });
                
                if (!response.ok) {
                    throw new Error('Sync failed');
                }
                
                // Update item as synced
                const transaction = this.db.transaction(['items'], 'readwrite');
                const store = transaction.objectStore('items');
                const item = await this.promisifyRequest(store.get(syncItem.itemId));
                item.synced = true;
                await this.promisifyRequest(store.put(item));
            }
            
            async removeSyncItem(id) {
                const transaction = this.db.transaction(['syncQueue'], 'readwrite');
                const store = transaction.objectStore('syncQueue');
                return this.promisifyRequest(store.delete(id));
            }
            
            promisifyRequest(request) {
                return new Promise((resolve, reject) => {
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            }
        }
        
        // Initialize Data Manager
        const dataManager = new DataManager();
        
        // Push Notifications
        class NotificationManager {
            constructor() {
                this.vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY';
            }
            
            async requestPermission() {
                if (!('Notification' in window)) {
                    console.log('This browser does not support notifications');
                    return false;
                }
                
                const permission = await Notification.requestPermission();
                return permission === 'granted';
            }
            
            async subscribeToPush() {
                if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
                    console.log('Push messaging is not supported');
                    return null;
                }
                
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
                });
                
                // Send subscription to server
                await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subscription)
                });
                
                return subscription;
            }
            
            urlBase64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                    .replace(/-/g, '+')
                    .replace(/_/g, '/');
                
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                
                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            }
            
            showNotification(title, options) {
                if (Notification.permission === 'granted') {
                    new Notification(title, options);
                }
            }
        }
        
        // Initialize Notification Manager
        const notificationManager = new NotificationManager();
        
        // Event Listeners
        document.getElementById('notificationBtn').addEventListener('click', async () => {
            const granted = await notificationManager.requestPermission();
            if (granted) {
                await notificationManager.subscribeToPush();
                notificationManager.showNotification('Notifications Enabled', {
                    body: 'You will now receive push notifications',
                    icon: '/icons/icon-192x192.png'
                });
            }
        });
        
        document.getElementById('syncBtn').addEventListener('click', async () => {
            await syncPendingData();
        });
        
        document.getElementById('addDataBtn').addEventListener('click', async () => {
            const data = {
                title: `Item ${Date.now()}`,
                description: 'Sample item description',
                category: 'general'
            };
            
            await dataManager.addItem(data);
            await loadData();
        });
        
        // Utility Functions
        async function syncPendingData() {
            if (navigator.onLine) {
                try {
                    await dataManager.syncPendingItems();
                    updateSyncStatus('All data synced successfully');
                } catch (error) {
                    updateSyncStatus('Sync failed: ' + error.message);
                }
            } else {
                updateSyncStatus('Cannot sync while offline');
            }
        }
        
        async function loadData() {
            const items = await dataManager.getItems();
            const dataList = document.getElementById('dataList');
            
            dataList.innerHTML = items.map(item => `
                <div class="data-item" style="padding: 1rem; margin: 0.5rem 0; background: white; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <small>Created: ${new Date(item.timestamp).toLocaleString()} | Synced: ${item.synced ? 'Yes' : 'No'}</small>
                </div>
            `).join('');
        }
        
        function updateSyncStatus(message) {
            document.getElementById('syncInfo').textContent = message;
        }
        
        function showUpdateNotification() {
            notificationManager.showNotification('App Updated', {
                body: 'A new version is available. Refresh to update.',
                icon: '/icons/icon-192x192.png',
                actions: [{
                    action: 'refresh',
                    title: 'Refresh Now'
                }]
            });
        }
        
        // Initialize app content
        setTimeout(async () => {
            document.getElementById('appContent').innerHTML = '<h2>Welcome to Advanced PWA</h2><p>This app works offline and provides native app-like experience.</p>';
            document.getElementById('dataSection').style.display = 'block';
            await loadData();
            updateSyncStatus('Ready');
        }, 1000);
    </script>
</body>
</html>
```

**Service Worker (sw.js):**
```javascript
const CACHE_NAME = 'advanced-pwa-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const API_CACHE = 'api-v1';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/manifest.json'
];

// API endpoints to cache
const API_ENDPOINTS = [
    '/api/items',
    '/api/user'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(STATIC_FILES))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            return cacheName !== STATIC_CACHE && 
                                   cacheName !== DYNAMIC_CACHE && 
                                   cacheName !== API_CACHE;
                        })
                        .map(cacheName => caches.delete(cacheName))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(handleApiRequest(request));
        return;
    }
    
    // Handle static files
    if (STATIC_FILES.includes(url.pathname)) {
        event.respondWith(handleStaticRequest(request));
        return;
    }
    
    // Handle other requests
    event.respondWith(handleDynamicRequest(request));
});

// Cache-first strategy for static files
async function handleStaticRequest(request) {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        // Return offline fallback if available
        return cache.match('/offline.html');
    }
}

// Network-first strategy for API requests
async function handleApiRequest(request) {
    const cache = await caches.open(API_CACHE);
    
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful GET requests
        if (request.method === 'GET' && networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Return cached response for GET requests
        if (request.method === 'GET') {
            const cachedResponse = await cache.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
        }
        
        // Return offline response
        return new Response(
            JSON.stringify({ error: 'Offline', cached: false }),
            {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Stale-while-revalidate strategy for dynamic content
async function handleDynamicRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request)
        .then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
        })
        .catch(() => cachedResponse);
    
    return cachedResponse || fetchPromise;
}

// Background sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Implement background sync logic
    console.log('Background sync triggered');
}

// Push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('PWA Notification', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
```

**PWA Manifest (manifest.json):**
```json
{
    "name": "Advanced Progressive Web App",
    "short_name": "Advanced PWA",
    "description": "A comprehensive PWA with offline capabilities and native features",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#007bff",
    "orientation": "portrait-primary",
    "scope": "/",
    "lang": "en",
    "categories": ["productivity", "utilities"],
    "screenshots": [
        {
            "src": "/screenshots/desktop.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide"
        },
        {
            "src": "/screenshots/mobile.png",
            "sizes": "750x1334",
            "type": "image/png",
            "form_factor": "narrow"
        }
    ],
    "icons": [
        {
            "src": "/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "/icons/maskable-icon.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    "shortcuts": [
        {
            "name": "Add New Item",
            "short_name": "Add Item",
            "description": "Quickly add a new item",
            "url": "/add",
            "icons": [
                {
                    "src": "/icons/add-icon.png",
                    "sizes": "192x192"
                }
            ]
        },
        {
            "name": "View Dashboard",
            "short_name": "Dashboard",
            "description": "View your dashboard",
            "url": "/dashboard",
            "icons": [
                {
                    "src": "/icons/dashboard-icon.png",
                    "sizes": "192x192"
                }
            ]
        }
    ],
    "related_applications": [
        {
            "platform": "play",
            "url": "https://play.google.com/store/apps/details?id=com.example.app",
            "id": "com.example.app"
        }
    ],
    "prefer_related_applications": false
}
```

This comprehensive enhancement adds cutting-edge web components, advanced PWA capabilities, sophisticated caching strategies, push notifications, offline functionality, modern web standards, advanced Web APIs, performance monitoring, accessibility patterns, and inclusive design principles that represent the current state of HTML5 and web development.