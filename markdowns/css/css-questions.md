# CSS Interview Questions

## Table of Contents
1. [Q1: What is CSS and how does it work?](#q1-what-is-css-and-how-does-it-work)
2. [Q2: Explain CSS specificity and how it's calculated](#q2-explain-css-specificity-and-how-its-calculated)
3. [Q3: Explain the CSS Box Model](#q3-explain-the-css-box-model)
4. [Q4: How does CSS Flexbox work?](#q4-how-does-css-flexbox-work)
5. [Q5: How does CSS Grid work?](#q5-how-does-css-grid-work)
6. [Q6: What are CSS Media Queries and how do you use them?](#q6-what-are-css-media-queries-and-how-do-you-use-them)
7. [Q7: How do CSS transitions and animations work?](#q7-how-do-css-transitions-and-animations-work)
8. [Q8: What are CSS preprocessors and their benefits?](#q8-what-are-css-preprocessors-and-their-benefits)
9. [Q9: What are CSS methodologies like BEM, OOCSS, and SMACSS?](#q9-what-are-css-methodologies-like-bem-oocss-and-smacss)
10. [Q10: How do you optimize CSS performance?](#q10-how-do-you-optimize-css-performance)
11. [Q11: What are some modern CSS features?](#q11-what-are-some-modern-css-features)
12. [Q12: Explain CSS Grid Layout in detail with practical examples.](#q12-explain-css-grid-layout-in-detail-with-practical-examples)
13. [Q13: Explain CSS Custom Properties (Variables) and their advanced usage.](#q13-explain-css-custom-properties-variables-and-their-advanced-usage)
14. [Q14: Explain CSS Container Queries and their practical applications.](#q14-explain-css-container-queries-and-their-practical-applications)
15. [Q15: Explain CSS Performance Optimization techniques.](#q15-explain-css-performance-optimization-techniques)
16. [Q16: Explain CSS Logical Properties and their benefits.](#q16-explain-css-logical-properties-and-their-benefits)
17. [Q17: How do you implement advanced CSS Grid and Flexbox layouts?](#q17-how-do-you-implement-advanced-css-grid-and-flexbox-layouts)
18. [Q18: How do you implement advanced CSS animations and transitions?](#q18-how-do-you-implement-advanced-css-animations-and-transitions)
19. [Q19: How do you implement modern CSS features and best practices?](#q19-how-do-you-implement-modern-css-features-and-best-practices)
20. [Q20: How do you implement CSS Container Queries for responsive components?](#q20-how-do-you-implement-css-container-queries-for-responsive-components)
21. [Q21: How do you use CSS Cascade Layers for better style organization?](#q21-how-do-you-use-css-cascade-layers-for-better-style-organization)
22. [Q22: How do you implement advanced CSS custom properties and functions?](#q22-how-do-you-implement-advanced-css-custom-properties-and-functions)
23. [Q23: How do you implement modern CSS layout techniques?](#q23-how-do-you-implement-modern-css-layout-techniques)
24. [Q24: How do you implement advanced CSS animations and micro-interactions?](#q24-how-do-you-implement-advanced-css-animations-and-micro-interactions)
25. [Q25: How do you implement CSS-in-JS patterns and component-scoped styling?](#q25-how-do-you-implement-css-in-js-patterns-and-component-scoped-styling)
26. [Q26: How do you implement advanced CSS custom properties and design systems?](#q26-how-do-you-implement-advanced-css-custom-properties-and-design-systems)
27. [Q27: How do you implement CSS Houdini and advanced CSS features?](#q27-how-do-you-implement-css-houdini-and-advanced-css-features)
28. [Q28: How do you implement modern CSS framework integration and performance optimization?](#q28-how-do-you-implement-modern-css-framework-integration-and-performance-optimization)
29. [Q29: How do you implement advanced CSS architecture patterns and design systems?](#q29-how-do-you-implement-advanced-css-architecture-patterns-and-design-systems)
30. [Q30: How do you implement advanced CSS performance optimization and critical rendering path?](#q30-how-do-you-implement-advanced-css-performance-optimization-and-critical-rendering-path)
31. [Q31: How do you implement advanced CSS Container Queries and modern layout techniques for responsive design?](#q31-how-do-you-implement-advanced-css-container-queries-and-modern-layout-techniques-for-responsive-design)
32. [Q32: How do you implement advanced CSS architecture with CSS Layers, Scope, and modern design systems?](#q32-how-do-you-implement-advanced-css-architecture-with-css-layers-scope-and-modern-design-systems)

---

## CSS Fundamentals

### Q1: What is CSS and how does it work?

**Answer:**
CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of HTML documents. It controls the visual appearance of web pages.

**Key Concepts:**
- **Cascade**: Styles flow from parent to child elements
- **Inheritance**: Child elements inherit certain properties from parents
- **Specificity**: Determines which styles take precedence

```css
/* Basic CSS syntax */
selector {
    property: value;
    property: value;
}

/* Example */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
```

**CSS Loading Methods:**
```html
<!-- External stylesheet -->
<link rel="stylesheet" href="styles.css">

<!-- Internal stylesheet -->
<style>
    body { font-family: Arial, sans-serif; }
</style>

<!-- Inline styles -->
<div style="color: red; font-size: 16px;">Content</div>
```

---

## Selectors and Specificity

### Q2: Explain CSS specificity and how it's calculated

**Answer:**
CSS specificity determines which styles are applied when multiple rules target the same element.

**Specificity Hierarchy (highest to lowest):**
1. Inline styles (1000)
2. IDs (100)
3. Classes, attributes, pseudo-classes (10)
4. Elements and pseudo-elements (1)

```css
/* Specificity examples */

/* Specificity: 1 (element) */
p { color: blue; }

/* Specificity: 10 (class) */
.text { color: red; }

/* Specificity: 100 (ID) */
#header { color: green; }

/* Specificity: 111 (ID + class + element) */
#header .nav p { color: purple; }

/* Specificity: 21 (2 classes + 1 element) */
.container .content p { color: orange; }
```

**Advanced Selectors:**
```css
/* Attribute selectors */
input[type="text"] { border: 1px solid #ccc; }
input[placeholder*="search"] { background: #f0f0f0; }

/* Pseudo-classes */
a:hover { color: #007bff; }
li:nth-child(odd) { background: #f9f9f9; }
input:focus { outline: 2px solid #007bff; }

/* Pseudo-elements */
p::before { content: "→ "; }
p::after { content: " ←"; }
::selection { background: #007bff; color: white; }

/* Combinators */
.parent > .child { /* Direct child */ }
.sibling + .next { /* Adjacent sibling */ }
.sibling ~ .general { /* General sibling */ }
```

---

## Box Model and Layout

### Q3: Explain the CSS Box Model

**Answer:**
The CSS Box Model describes how elements are structured and how their dimensions are calculated.

**Box Model Components:**
1. **Content**: The actual content area
2. **Padding**: Space between content and border
3. **Border**: The border around the element
4. **Margin**: Space outside the border

```css
/* Box model example */
.box {
    width: 200px;           /* Content width */
    height: 100px;          /* Content height */
    padding: 20px;          /* All sides */
    border: 5px solid #333; /* Border width */
    margin: 10px;           /* All sides */
}

/* Total width = width + padding-left + padding-right + border-left + border-right */
/* Total width = 200 + 20 + 20 + 5 + 5 = 250px */

/* Box-sizing property */
.border-box {
    box-sizing: border-box; /* Width includes padding and border */
    width: 200px;
    padding: 20px;
    border: 5px solid #333;
    /* Total width = 200px (padding and border included) */
}

.content-box {
    box-sizing: content-box; /* Default - width is content only */
    width: 200px;
    padding: 20px;
    border: 5px solid #333;
    /* Total width = 200 + 40 + 10 = 250px */
}
```

**Display Properties:**
```css
/* Block elements */
.block {
    display: block;
    width: 100%;
    margin: 10px 0;
}

/* Inline elements */
.inline {
    display: inline;
    /* Width and height have no effect */
    /* Vertical margins have no effect */
}

/* Inline-block elements */
.inline-block {
    display: inline-block;
    width: 200px;
    height: 100px;
    vertical-align: top;
}

/* None - removes element from document flow */
.hidden {
    display: none;
}
```

---

## Flexbox and Grid

### Q4: How does CSS Flexbox work?

**Answer:**
Flexbox is a one-dimensional layout method for arranging items in rows or columns.

**Flex Container Properties:**
```css
.flex-container {
    display: flex;
    
    /* Direction */
    flex-direction: row | row-reverse | column | column-reverse;
    
    /* Wrapping */
    flex-wrap: nowrap | wrap | wrap-reverse;
    
    /* Shorthand */
    flex-flow: row wrap;
    
    /* Main axis alignment */
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
    
    /* Cross axis alignment */
    align-items: stretch | flex-start | flex-end | center | baseline;
    
    /* Multi-line cross axis */
    align-content: stretch | flex-start | flex-end | center | space-between | space-around;
}
```

**Flex Item Properties:**
```css
.flex-item {
    /* Growth factor */
    flex-grow: 1;
    
    /* Shrink factor */
    flex-shrink: 1;
    
    /* Initial size */
    flex-basis: auto | 200px | 50%;
    
    /* Shorthand */
    flex: 1 1 auto; /* grow shrink basis */
    
    /* Individual alignment */
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
    
    /* Order */
    order: 0;
}
```

**Practical Examples:**
```css
/* Centering content */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Equal width columns */
.columns {
    display: flex;
}
.column {
    flex: 1;
    padding: 20px;
}

/* Responsive navigation */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav-links {
    display: flex;
    gap: 20px;
}
```

### Q5: How does CSS Grid work?

**Answer:**
CSS Grid is a two-dimensional layout system for creating complex layouts with rows and columns.

**Grid Container Properties:**
```css
.grid-container {
    display: grid;
    
    /* Define columns */
    grid-template-columns: 200px 1fr 100px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: minmax(200px, 1fr) 2fr;
    
    /* Define rows */
    grid-template-rows: 100px auto 50px;
    grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
    
    /* Gap between items */
    gap: 20px;
    grid-gap: 10px 20px; /* row-gap column-gap */
    
    /* Named grid areas */
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
}
```

**Grid Item Properties:**
```css
.grid-item {
    /* Position by line numbers */
    grid-column: 1 / 3;
    grid-row: 2 / 4;
    
    /* Shorthand */
    grid-area: 2 / 1 / 4 / 3; /* row-start / col-start / row-end / col-end */
    
    /* Named areas */
    grid-area: header;
    
    /* Span multiple tracks */
    grid-column: span 2;
    grid-row: span 3;
}
```

**Advanced Grid Examples:**
```css
/* Responsive grid */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

/* Complex layout */
.layout {
    display: grid;
    grid-template-columns: 250px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

---

## Responsive Design

### Q6: What are CSS Media Queries and how do you use them?

**Answer:**
Media queries allow you to apply CSS styles based on device characteristics like screen size, orientation, and resolution.

**Basic Syntax:**
```css
/* Basic media query */
@media screen and (max-width: 768px) {
    .container {
        padding: 10px;
    }
}

/* Multiple conditions */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .sidebar {
        width: 200px;
    }
}

/* Orientation */
@media (orientation: landscape) {
    .hero {
        height: 50vh;
    }
}

@media (orientation: portrait) {
    .hero {
        height: 80vh;
    }
}
```

**Common Breakpoints:**
```css
/* Mobile first approach */
/* Base styles for mobile */
.container {
    width: 100%;
    padding: 15px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        padding: 30px;
    }
}

/* Large desktop */
@media (min-width: 1440px) {
    .container {
        max-width: 1400px;
    }
}
```

**Advanced Media Features:**
```css
/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .logo {
        background-image: url('logo@2x.png');
        background-size: 100px 50px;
    }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
    body {
        background-color: #1a1a1a;
        color: #ffffff;
    }
}

/* Print styles */
@media print {
    .no-print {
        display: none;
    }
    
    body {
        font-size: 12pt;
        color: black;
    }
}
```

---

## CSS Animations and Transitions

### Q7: How do CSS transitions and animations work?

**Answer:**
Transitions and animations add motion and interactivity to web pages.

**CSS Transitions:**
```css
/* Basic transition */
.button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}

/* Multiple properties */
.card {
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

/* All properties */
.element {
    transition: all 0.3s ease-in-out;
}
```

**CSS Animations:**
```css
/* Keyframe definition */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Using percentages */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

/* Apply animation */
.fade-in {
    animation: fadeIn 0.6s ease-out;
}

.bounce {
    animation: bounce 2s infinite;
}

/* Complex animation */
.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

**Animation Properties:**
```css
.animated-element {
    animation-name: slideIn;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    /* Shorthand */
    animation: slideIn 1s ease-in-out 0.5s infinite alternate forwards;
}
```

---

## CSS Preprocessors

### Q8: What are CSS preprocessors and their benefits?

**Answer:**
CSS preprocessors extend CSS with features like variables, nesting, mixins, and functions.

**SCSS/Sass Example:**
```scss
// Variables
$primary-color: #007bff;
$secondary-color: #6c757d;
$border-radius: 4px;
$font-stack: 'Helvetica Neue', Arial, sans-serif;

// Mixins
@mixin button-style($bg-color, $text-color: white) {
    background-color: $bg-color;
    color: $text-color;
    padding: 10px 20px;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    
    &:hover {
        background-color: darken($bg-color, 10%);
    }
}

// Nesting
.navigation {
    background-color: $primary-color;
    padding: 1rem;
    
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        
        li {
            display: inline-block;
            margin-right: 1rem;
            
            a {
                color: white;
                text-decoration: none;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

// Using mixins
.btn-primary {
    @include button-style($primary-color);
}

.btn-secondary {
    @include button-style($secondary-color);
}

// Functions
@function calculate-rem($size) {
    @return $size / 16px * 1rem;
}

.heading {
    font-size: calculate-rem(24px);
}
```

**Less Example:**
```less
// Variables
@primary-color: #007bff;
@secondary-color: #6c757d;
@base-font-size: 16px;

// Mixins
.border-radius(@radius: 4px) {
    border-radius: @radius;
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
}

.button-style(@bg-color; @text-color: white) {
    background-color: @bg-color;
    color: @text-color;
    padding: 10px 20px;
    border: none;
    .border-radius(4px);
    
    &:hover {
        background-color: darken(@bg-color, 10%);
    }
}

// Usage
.btn {
    .button-style(@primary-color);
}

// Nesting and operations
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    
    .content {
        padding: @base-font-size * 1.5;
        
        h1 {
            font-size: @base-font-size * 2;
            color: @primary-color;
        }
    }
}
```

---

## CSS Architecture and Methodologies

### Q9: What are CSS methodologies like BEM, OOCSS, and SMACSS?

**Answer:**
CSS methodologies provide structured approaches to writing maintainable and scalable CSS.

**BEM (Block Element Modifier):**
```css
/* Block */
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Element */
.card__header {
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.card__title {
    font-size: 1.5rem;
    margin: 0;
}

.card__content {
    padding: 20px;
}

.card__footer {
    padding: 20px;
    background: #f8f9fa;
}

/* Modifier */
.card--featured {
    border: 2px solid #007bff;
}

.card--large {
    max-width: 800px;
}

.card__title--highlighted {
    color: #007bff;
}
```

**OOCSS (Object-Oriented CSS):**
```css
/* Separate structure from skin */

/* Structure */
.btn {
    display: inline-block;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
}

/* Skin */
.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-large {
    padding: 15px 30px;
    font-size: 1.2rem;
}

/* Separate container from content */
.media {
    display: flex;
    align-items: flex-start;
}

.media__object {
    flex-shrink: 0;
    margin-right: 15px;
}

.media__body {
    flex: 1;
}
```

**SMACSS (Scalable and Modular Architecture):**
```css
/* Base rules */
html, body {
    margin: 0;
    padding: 0;
}

/* Layout rules */
.l-header {
    position: fixed;
    top: 0;
    width: 100%;
}

.l-sidebar {
    width: 250px;
    float: left;
}

.l-main {
    margin-left: 250px;
}

/* Module rules */
.module {
    background: white;
    border: 1px solid #ccc;
}

.module-header {
    background: #f5f5f5;
    padding: 10px;
}

/* State rules */
.is-hidden {
    display: none;
}

.is-active {
    background: #007bff;
    color: white;
}

.is-disabled {
    opacity: 0.5;
    pointer-events: none;
}

/* Theme rules */
.theme-dark .module {
    background: #333;
    color: white;
}
```

---

## Performance Optimization

### Q10: How do you optimize CSS performance?

**Answer:**
CSS performance optimization involves reducing file size, improving rendering speed, and minimizing layout thrashing.

**File Size Optimization:**
```css
/* Minification - remove unnecessary characters */
/* Before */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* After minification */
.container{width:100%;max-width:1200px;margin:0 auto;padding:20px}

/* Use shorthand properties */
/* Instead of */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;

/* Use */
margin: 10px 20px;

/* Combine selectors */
/* Instead of */
.header { color: #333; }
.footer { color: #333; }
.sidebar { color: #333; }

/* Use */
.header, .footer, .sidebar { color: #333; }
```

**Rendering Performance:**
```css
/* Use efficient selectors */
/* Avoid universal selectors */
* { margin: 0; } /* Slow */

/* Avoid deep nesting */
.nav ul li a span { } /* Slow */

/* Use class selectors */
.nav-link { } /* Fast */

/* Optimize animations */
/* Use transform and opacity for animations */
.element {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.element:hover {
    transform: translateX(10px); /* GPU accelerated */
    opacity: 0.8;
}

/* Avoid animating layout properties */
/* Slow - triggers layout */
.slow {
    transition: width 0.3s ease;
}

/* Fast - only triggers composite */
.fast {
    transition: transform 0.3s ease;
}
```

**Critical CSS:**
```css
/* Inline critical CSS for above-the-fold content */
/* Critical styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.header {
    background: #007bff;
    color: white;
    padding: 1rem;
}

.hero {
    height: 100vh;
    background: linear-gradient(45deg, #007bff, #0056b3);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Load non-critical CSS asynchronously */
```

**CSS Loading Strategies:**
```html
<!-- Critical CSS inline -->
<style>
    /* Critical styles here */
</style>

<!-- Non-critical CSS with media attribute -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- Font loading optimization -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

---

## Modern CSS Features

### Q11: What are some modern CSS features?

**Answer:**
Modern CSS includes many powerful features that improve development experience and capabilities.

**CSS Custom Properties (Variables):**
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-size-base: 1rem;
    --spacing-unit: 8px;
    --border-radius: 4px;
}

.component {
    background-color: var(--primary-color);
    font-size: var(--font-size-base);
    padding: calc(var(--spacing-unit) * 2);
    border-radius: var(--border-radius);
}

/* Dynamic theming */
[data-theme="dark"] {
    --primary-color: #0d6efd;
    --background-color: #1a1a1a;
    --text-color: #ffffff;
}

/* Responsive variables */
@media (min-width: 768px) {
    :root {
        --font-size-base: 1.125rem;
        --spacing-unit: 12px;
    }
}
```

**Container Queries:**
```css
/* Container queries allow styling based on container size */
.card-container {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 400px) {
    .card {
        display: flex;
        flex-direction: row;
    }
    
    .card__image {
        width: 200px;
    }
}

@container card (max-width: 399px) {
    .card {
        display: block;
    }
    
    .card__image {
        width: 100%;
    }
}
```

**CSS Logical Properties:**
```css
/* Traditional physical properties */
.element {
    margin-left: 20px;
    margin-right: 20px;
    border-left: 1px solid #ccc;
}

/* Logical properties (RTL/LTR aware) */
.element {
    margin-inline-start: 20px;
    margin-inline-end: 20px;
    border-inline-start: 1px solid #ccc;
}

/* Block and inline directions */
.container {
    padding-block: 20px;    /* top and bottom */
    padding-inline: 30px;   /* left and right */
    border-block-start: 1px solid #ccc; /* top border */
    border-inline-end: 1px solid #ccc;  /* right border in LTR */
}
```

**CSS Subgrid:**
```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.grid-item {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
}

/* Subgrid inherits parent grid tracks */
.nested-item {
    grid-column: 1 / -1;
}
```

**CSS Cascade Layers:**
```css
/* Define layer order */
@layer reset, base, components, utilities;

/* Reset layer */
@layer reset {
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
}

/* Base layer */
@layer base {
    body {
        font-family: system-ui, sans-serif;
        line-height: 1.6;
    }
}

/* Components layer */
@layer components {
    .button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
    }
}

/* Utilities layer (highest priority) */
@layer utilities {
    .text-center {
        text-align: center !important;
    }
}
```

**CSS Color Functions:**
```css
.element {
    /* Modern color functions */
    background: oklch(70% 0.15 180); /* OKLCH color space */
    border: 1px solid color-mix(in srgb, blue 50%, red 50%);
    
    /* Relative colors */
    --base-color: #007bff;
    color: color-mix(in srgb, var(--base-color) 80%, white 20%);
    
    /* Color contrast */
    background: color-contrast(#007bff vs white, black);
}
```

**Best Practices:**
- Use CSS custom properties for consistent theming
- Implement proper fallbacks for older browsers
- Consider performance implications of complex animations
- Use semantic class names and maintain organized stylesheets
- Test across different devices and browsers
- Optimize for accessibility and user preferences

---

## Advanced CSS Concepts

### Q12: Explain CSS Grid Layout in detail with practical examples.
**Difficulty: Medium**

**Answer:**
CSS Grid is a powerful 2D layout system that allows you to create complex layouts with rows and columns.

**Basic Grid Setup:**
```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Three columns */
  grid-template-rows: auto 1fr auto; /* Three rows */
  gap: 20px;
  height: 100vh;
}

.header {
  grid-column: 1 / -1; /* Span all columns */
  background: #333;
  color: white;
  padding: 1rem;
}

.sidebar {
  grid-column: 1;
  grid-row: 2;
  background: #f0f0f0;
  padding: 1rem;
}

.main-content {
  grid-column: 2;
  grid-row: 2;
  background: white;
  padding: 1rem;
}

.aside {
  grid-column: 3;
  grid-row: 2;
  background: #e0e0e0;
  padding: 1rem;
}

.footer {
  grid-column: 1 / -1; /* Span all columns */
  background: #333;
  color: white;
  padding: 1rem;
}
```

**Advanced Grid Techniques:**
```css
/* Named Grid Lines */
.advanced-grid {
  display: grid;
  grid-template-columns: 
    [sidebar-start] 250px 
    [sidebar-end main-start] 1fr 
    [main-end aside-start] 300px 
    [aside-end];
  grid-template-rows: 
    [header-start] 80px 
    [header-end content-start] 1fr 
    [content-end footer-start] 60px 
    [footer-end];
}

.header {
  grid-column: sidebar-start / aside-end;
  grid-row: header-start / header-end;
}

.main {
  grid-column: main-start / main-end;
  grid-row: content-start / content-end;
}

/* Grid Template Areas */
.layout-grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive Grid */
@media (max-width: 768px) {
  .layout-grid {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}

/* Auto-fit and Auto-fill */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card-grid-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

/* Subgrid (when supported) */
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.subgrid-item {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}

/* Grid Alignment */
.alignment-grid {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  
  /* Align the entire grid */
  justify-content: center; /* horizontal */
  align-content: center; /* vertical */
  
  /* Align items within their cells */
  justify-items: center; /* horizontal */
  align-items: center; /* vertical */
}

.grid-item {
  background: #007bff;
  color: white;
  
  /* Override alignment for specific items */
  justify-self: start;
  align-self: end;
}
```

**Complex Grid Layout Example:**
```css
.magazine-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 100px);
  gap: 1rem;
  padding: 1rem;
}

.hero-article {
  grid-column: 1 / 8;
  grid-row: 1 / 5;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('hero.jpg');
  background-size: cover;
  display: flex;
  align-items: end;
  padding: 2rem;
  color: white;
}

.featured-article {
  grid-column: 8 / 13;
  grid-row: 1 / 3;
  background: #f8f9fa;
  padding: 1rem;
}

.secondary-article {
  grid-column: 8 / 13;
  grid-row: 3 / 5;
  background: #e9ecef;
  padding: 1rem;
}

.news-feed {
  grid-column: 1 / 5;
  grid-row: 5 / 9;
  background: white;
  border: 1px solid #dee2e6;
  padding: 1rem;
}

.sidebar-ads {
  grid-column: 5 / 9;
  grid-row: 5 / 7;
  background: #fff3cd;
  padding: 1rem;
}

.trending {
  grid-column: 5 / 9;
  grid-row: 7 / 9;
  background: #d1ecf1;
  padding: 1rem;
}

.social-feed {
  grid-column: 9 / 13;
  grid-row: 5 / 9;
  background: #f8d7da;
  padding: 1rem;
}
```

---

### Q13: Explain CSS Custom Properties (Variables) and their advanced usage.
**Difficulty: Medium**

**Answer:**
CSS Custom Properties provide a way to store and reuse values throughout your stylesheet.

**Basic Usage:**
```css
:root {
  /* Global custom properties */
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  
  --font-family-base: 'Helvetica Neue', Arial, sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.5;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 3rem;
  
  --border-radius: 0.375rem;
  --box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  --transition: all 0.15s ease-in-out;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius);
  font-family: var(--font-family-base);
  transition: var(--transition);
}

.button:hover {
  background-color: var(--primary-color, #0056b3); /* Fallback value */
  box-shadow: var(--box-shadow);
}
```

**Advanced Techniques:**
```css
/* Theme Switching */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --border-color: #404040;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

/* Component-scoped variables */
.card {
  --card-bg: #ffffff;
  --card-border: #e0e0e0;
  --card-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
}

.card--highlighted {
  --card-bg: #f8f9fa;
  --card-border: var(--primary-color);
  --card-shadow: 0 4px 8px rgba(0,123,255,0.15);
}

/* Responsive variables */
:root {
  --container-width: 1200px;
  --grid-columns: 12;
  --grid-gap: 2rem;
}

@media (max-width: 768px) {
  :root {
    --container-width: 100%;
    --grid-columns: 1;
    --grid-gap: 1rem;
  }
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Mathematical operations with calc() */
:root {
  --base-size: 16px;
  --scale-ratio: 1.25;
}

.text-sm { font-size: calc(var(--base-size) / var(--scale-ratio)); }
.text-base { font-size: var(--base-size); }
.text-lg { font-size: calc(var(--base-size) * var(--scale-ratio)); }
.text-xl { font-size: calc(var(--base-size) * var(--scale-ratio) * var(--scale-ratio)); }

/* Dynamic color variations */
:root {
  --hue: 210;
  --saturation: 100%;
  --lightness: 50%;
}

.color-primary {
  background-color: hsl(var(--hue), var(--saturation), var(--lightness));
}

.color-primary-light {
  background-color: hsl(var(--hue), var(--saturation), calc(var(--lightness) + 20%));
}

.color-primary-dark {
  background-color: hsl(var(--hue), var(--saturation), calc(var(--lightness) - 20%));
}

/* Animation with custom properties */
@keyframes pulse {
  0% {
    transform: scale(var(--scale-start, 1));
  }
  50% {
    transform: scale(var(--scale-end, 1.05));
  }
  100% {
    transform: scale(var(--scale-start, 1));
  }
}

.pulse-animation {
  --scale-start: 1;
  --scale-end: 1.1;
  animation: pulse 2s infinite;
}

.pulse-animation--subtle {
  --scale-end: 1.02;
}
```

**JavaScript Integration:**
```javascript
// Reading CSS custom properties
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

// Setting CSS custom properties
document.documentElement.style.setProperty('--primary-color', '#ff6b6b');

// Theme switching
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Dynamic color generation
function generateColorScheme(baseHue) {
  document.documentElement.style.setProperty('--hue', baseHue);
  
  // Generate complementary colors
  const complementaryHue = (baseHue + 180) % 360;
  document.documentElement.style.setProperty('--complementary-hue', complementaryHue);
  
  // Generate triadic colors
  const triadic1 = (baseHue + 120) % 360;
  const triadic2 = (baseHue + 240) % 360;
  document.documentElement.style.setProperty('--triadic-1', triadic1);
  document.documentElement.style.setProperty('--triadic-2', triadic2);
}
```

---

### Q14: Explain CSS Container Queries and their practical applications.
**Difficulty: Hard**

**Answer:**
Container Queries allow you to apply styles based on the size of a containing element rather than the viewport.

**Basic Container Query Setup:**
```css
/* Define a containment context */
.card-container {
  container-type: inline-size; /* or 'size' for both dimensions */
  container-name: card; /* optional name */
}

/* Alternative shorthand */
.sidebar {
  container: sidebar / inline-size;
}

/* Apply styles based on container size */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
  }
  
  .card__image {
    grid-row: 1 / -1;
  }
}

@container card (max-width: 399px) {
  .card {
    display: block;
  }
  
  .card__image {
    width: 100%;
    margin-bottom: 1rem;
  }
}
```

**Advanced Container Query Patterns:**
```css
/* Responsive component library */
.component-grid {
  container-type: inline-size;
  display: grid;
  gap: 1rem;
}

/* Small container: single column */
@container (max-width: 300px) {
  .component-grid {
    grid-template-columns: 1fr;
  }
  
  .component-card {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}

/* Medium container: two columns */
@container (min-width: 301px) and (max-width: 600px) {
  .component-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .component-card {
    padding: 1rem;
    font-size: 1rem;
  }
}

/* Large container: three columns */
@container (min-width: 601px) {
  .component-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .component-card {
    padding: 1.5rem;
    font-size: 1.125rem;
  }
}

/* Navigation component adaptation */
.navigation {
  container-type: inline-size;
}

/* Horizontal navigation for wide containers */
@container (min-width: 600px) {
  .nav-list {
    display: flex;
    justify-content: space-between;
  }
  
  .nav-item {
    margin-right: 2rem;
  }
  
  .nav-toggle {
    display: none;
  }
}

/* Collapsed navigation for narrow containers */
@container (max-width: 599px) {
  .nav-list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .nav-list.is-open {
    display: block;
  }
  
  .nav-item {
    display: block;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .nav-toggle {
    display: block;
  }
}

/* Data visualization adaptation */
.chart-container {
  container-type: size;
}

@container (min-width: 800px) and (min-height: 400px) {
  .chart {
    display: grid;
    grid-template-columns: 1fr 200px;
    grid-template-rows: auto 1fr auto;
  }
  
  .chart__legend {
    grid-column: 2;
    grid-row: 1 / -1;
  }
  
  .chart__title {
    font-size: 1.5rem;
  }
}

@container (max-width: 799px) or (max-height: 399px) {
  .chart {
    display: block;
  }
  
  .chart__legend {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .chart__title {
    font-size: 1.125rem;
  }
}
```

**Container Query Units:**
```css
.responsive-text {
  container-type: inline-size;
}

@container (min-width: 200px) {
  .text {
    /* Container query units */
    font-size: 4cqw; /* 4% of container width */
    padding: 2cqh 3cqw; /* 2% of container height, 3% of container width */
    margin: 1cqi; /* 1% of container inline size */
    border-radius: 2cqb; /* 2% of container block size */
    
    /* Minimum and maximum with container units */
    font-size: clamp(1rem, 4cqw, 2rem);
  }
}

/* Combining with CSS custom properties */
.adaptive-component {
  container-type: inline-size;
  --base-padding: 1rem;
  --scale-factor: 1;
}

@container (min-width: 400px) {
  .adaptive-component {
    --scale-factor: 1.2;
  }
}

@container (min-width: 600px) {
  .adaptive-component {
    --scale-factor: 1.5;
  }
}

.component-content {
  padding: calc(var(--base-padding) * var(--scale-factor));
  font-size: calc(1rem * var(--scale-factor));
}
```

---

### Q15: Explain CSS Performance Optimization techniques.
**Difficulty: Medium**

**Answer:**
CSS performance optimization involves reducing file sizes, minimizing render-blocking, and optimizing rendering performance.

**1. CSS Loading Optimization:**
```html
<!-- Critical CSS inlined in head -->
<style>
  /* Above-the-fold styles */
  body { font-family: Arial, sans-serif; margin: 0; }
  .header { background: #333; color: white; padding: 1rem; }
  .hero { height: 100vh; background: #f0f0f0; }
</style>

<!-- Non-critical CSS loaded asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- Preload important fonts -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

**2. Efficient CSS Selectors:**
```css
/* Avoid expensive selectors */
/* BAD: Universal selector */
* {
  box-sizing: border-box;
}

/* BETTER: Specific reset */
html, body, div, span, h1, h2, h3, p {
  box-sizing: border-box;
}

/* BAD: Deep nesting */
.sidebar .widget .list .item .link:hover {
  color: blue;
}

/* BETTER: Flatter structure */
.widget-link:hover {
  color: blue;
}

/* BAD: Attribute selectors on large sets */
input[type="text"] {
  border: 1px solid #ccc;
}

/* BETTER: Class-based */
.text-input {
  border: 1px solid #ccc;
}

/* Efficient use of pseudo-selectors */
.list-item:nth-child(odd) {
  background: #f9f9f9;
}

/* More efficient for large lists */
.list-item--odd {
  background: #f9f9f9;
}
```

**3. CSS Architecture for Performance:**
```css
/* Component-based architecture */
/* Base styles */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s;
}

/* Modifier classes */
.btn--primary { background-color: #007bff; color: white; }
.btn--secondary { background-color: #6c757d; color: white; }
.btn--large { padding: 0.75rem 1.5rem; font-size: 1.125rem; }
.btn--small { padding: 0.25rem 0.5rem; font-size: 0.875rem; }

/* Utility classes for common patterns */
.u-margin-bottom-sm { margin-bottom: 0.5rem !important; }
.u-margin-bottom-md { margin-bottom: 1rem !important; }
.u-margin-bottom-lg { margin-bottom: 1.5rem !important; }

.u-text-center { text-align: center !important; }
.u-text-left { text-align: left !important; }
.u-text-right { text-align: right !important; }

/* Responsive utilities */
@media (min-width: 768px) {
  .u-md-text-center { text-align: center !important; }
  .u-md-margin-bottom-lg { margin-bottom: 1.5rem !important; }
}
```

**4. Animation Performance:**
```css
/* Use transform and opacity for animations */
/* BAD: Animating layout properties */
.slide-bad {
  transition: left 0.3s, width 0.3s, height 0.3s;
}

.slide-bad:hover {
  left: 100px;
  width: 200px;
  height: 200px;
}

/* GOOD: Animating composite properties */
.slide-good {
  transition: transform 0.3s, opacity 0.3s;
  will-change: transform, opacity;
}

.slide-good:hover {
  transform: translateX(100px) scale(1.2);
  opacity: 0.8;
}

/* Optimize for 60fps animations */
@keyframes optimized-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: optimized-fade 0.3s ease-out;
  will-change: transform, opacity;
}

/* Remove will-change after animation */
.fade-in.animation-complete {
  will-change: auto;
}

/* Use contain for isolated components */
.isolated-component {
  contain: layout style paint;
}

.strict-containment {
  contain: strict;
}
```

**5. CSS Minification and Optimization:**
```css
/* Before minification */
.navigation {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
}

.navigation .nav-item {
  display: inline-block;
  margin-right: 1rem;
}

.navigation .nav-item:last-child {
  margin-right: 0;
}

/* After minification (automated) */
.navigation{background-color:#fff;border:1px solid #e0e0e0;padding:1rem 2rem;margin-bottom:2rem}.navigation .nav-item{display:inline-block;margin-right:1rem}.navigation .nav-item:last-child{margin-right:0}

/* CSS custom properties for repeated values */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --spacing-unit: 0.5rem;
  --border-radius: 0.25rem;
}

/* Reduces repetition and file size */
.btn {
  background: var(--color-primary);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
}

.card {
  border: 1px solid var(--color-secondary);
  padding: calc(var(--spacing-unit) * 4);
  border-radius: var(--border-radius);
}
```

**6. Critical CSS Extraction:**
```javascript
// Example build process for critical CSS
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  dest: 'index-critical.html',
  width: 1300,
  height: 900,
  minify: true,
  extract: true, // Extract critical CSS to separate file
  ignore: {
    atrule: ['@font-face'],
    rule: [/\.non-critical/],
    decl: (node, value) => /url\(/.test(value)
  }
});
```

**Performance Monitoring:**
```javascript
// Measure CSS performance
function measureCSSPerformance() {
  // Measure First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
      }
    }
  });
  observer.observe({ entryTypes: ['paint'] });
  
  // Measure layout thrashing
  let layoutCount = 0;
  const layoutObserver = new PerformanceObserver((list) => {
    layoutCount += list.getEntries().length;
    console.log('Layout operations:', layoutCount);
  });
  layoutObserver.observe({ entryTypes: ['measure'] });
}
```

---

### Q16: Explain CSS Logical Properties and their benefits.
**Difficulty: Medium**

**Answer:**
CSS Logical Properties provide a way to control layout through logical, rather than physical, direction and dimension mappings.

**Physical vs Logical Properties:**
```css
/* Physical properties (traditional) */
.card-physical {
  margin-top: 1rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  margin-left: 0;
  
  border-top: 1px solid #ccc;
  border-right: none;
  border-bottom: 1px solid #ccc;
  border-left: 3px solid #007bff;
  
  padding-top: 1rem;
  padding-right: 1.5rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
}

/* Logical properties (modern) */
.card-logical {
  margin-block-start: 1rem;
  margin-inline-end: 2rem;
  margin-block-end: 1rem;
  margin-inline-start: 0;
  
  border-block-start: 1px solid #ccc;
  border-inline-end: none;
  border-block-end: 1px solid #ccc;
  border-inline-start: 3px solid #007bff;
  
  padding-block: 1rem;
  padding-inline: 1.5rem;
}

/* Shorthand logical properties */
.card-shorthand {
  margin-block: 1rem 1rem; /* start end */
  margin-inline: 0 2rem; /* start end */
  
  border-block: 1px solid #ccc;
  border-inline-start: 3px solid #007bff;
  
  padding-block: 1rem;
  padding-inline: 1.5rem;
}
```

**Internationalization Benefits:**
```css
/* Works for both LTR and RTL languages */
.navigation {
  padding-inline-start: 2rem; /* Left in LTR, Right in RTL */
  padding-inline-end: 1rem; /* Right in LTR, Left in RTL */
  border-inline-start: 3px solid #007bff;
}

.article {
  text-align: start; /* Left in LTR, Right in RTL */
  margin-inline-end: 2rem; /* Right margin in LTR, Left in RTL */
}

.sidebar {
  float: inline-start; /* Left in LTR, Right in RTL */
  margin-inline-end: 1rem;
}

/* RTL-specific adjustments when needed */
[dir="rtl"] .special-case {
  /* Only when logical properties aren't sufficient */
  transform: scaleX(-1);
}
```

**Logical Sizing Properties:**
```css
.container {
  /* Logical dimensions */
  inline-size: 100%; /* Width in horizontal writing mode */
  block-size: 50vh; /* Height in horizontal writing mode */
  
  min-inline-size: 300px;
  max-inline-size: 1200px;
  min-block-size: 200px;
  max-block-size: 80vh;
}

/* Responsive design with logical properties */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding-inline: 1rem;
  margin-block: 2rem;
}

@media (min-inline-size: 768px) {
  .responsive-grid {
    padding-inline: 2rem;
    gap: 2rem;
  }
}
```

**Writing Mode Integration:**
```css
/* Horizontal writing mode (default) */
.horizontal-text {
  writing-mode: horizontal-tb;
  text-orientation: mixed;
}

/* Vertical writing mode */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  
  /* Logical properties adapt automatically */
  padding-block: 1rem;
  padding-inline: 2rem;
  margin-block-end: 1rem;
}

/* Mixed writing modes in same layout */
.mixed-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
}

.sidebar-vertical {
  writing-mode: vertical-rl;
  padding-block: 1rem;
  padding-inline: 0.5rem;
  border-inline-end: 1px solid #ccc;
}

.content-horizontal {
  writing-mode: horizontal-tb;
  padding-block: 1rem;
  padding-inline: 1rem;
}
```

**Logical Properties with Flexbox and Grid:**
```css
.flex-container {
  display: flex;
  flex-direction: row; /* or column */
  gap: 1rem;
  
  /* Logical alignment */
  justify-content: start; /* flex-start equivalent */
  align-items: start;
  
  padding-inline: 1rem;
  margin-block: 2rem;
}

.flex-item {
  margin-inline-end: auto; /* Push to end */
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  /* Logical grid positioning */
  justify-items: start;
  align-items: start;
  
  padding-inline: 1rem;
  margin-block: 2rem;
}

.grid-item {
  justify-self: end;
  align-self: center;
  
  padding-block: 1rem;
  padding-inline: 1rem;
  border-inline-start: 3px solid #007bff;
}
```

**Practical Implementation:**
```css
/* Component library with logical properties */
.button {
  display: inline-block;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-decoration: none;
  text-align: center;
  
  margin-inline-end: 0.5rem;
  margin-block-end: 0.5rem;
}

.button--icon {
  padding-inline-start: 0.75rem;
}

.button--icon::before {
  content: "";
  display: inline-block;
  inline-size: 1rem;
  block-size: 1rem;
  margin-inline-end: 0.5rem;
  background: url('icon.svg') no-repeat center;
  background-size: contain;
}

/* Form layouts */
.form-group {
  margin-block-end: 1rem;
}

.form-label {
  display: block;
  margin-block-end: 0.25rem;
  font-weight: 600;
}

.form-input {
  inline-size: 100%;
  padding-block: 0.5rem;
  padding-inline: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.form-help {
  margin-block-start: 0.25rem;
  font-size: 0.875rem;
  color: #666;
}

/* Error states */
.form-input--error {
  border-color: #dc3545;
  border-inline-start-width: 3px;
}

.form-error {
  margin-block-start: 0.25rem;
  color: #dc3545;
  font-size: 0.875rem;
}
```

### Q17: How do you implement advanced CSS Grid and Flexbox layouts?

**Answer:**
Advanced CSS Grid and Flexbox techniques enable complex, responsive layouts with minimal code.

**1. Advanced CSS Grid Patterns:**
```css
/* Complex Grid Layout with Named Areas */
.dashboard {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive Grid with Auto-fit and Minmax */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

/* Advanced Grid with Subgrid */
.article-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 2rem;
}

.article-content {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}

/* Dynamic Grid with CSS Custom Properties */
.dynamic-grid {
  --columns: 3;
  --gap: 1rem;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
}

@media (max-width: 768px) {
  .dynamic-grid {
    --columns: 2;
  }
}

@media (max-width: 480px) {
  .dynamic-grid {
    --columns: 1;
  }
}

/* Grid with Masonry-like Layout */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
  gap: 1rem;
}

.masonry-item {
  grid-row-end: span var(--row-span);
}

.masonry-item:nth-child(1) { --row-span: 20; }
.masonry-item:nth-child(2) { --row-span: 15; }
.masonry-item:nth-child(3) { --row-span: 25; }
```

**2. Advanced Flexbox Patterns:**
```css
/* Holy Grail Layout with Flexbox */
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.holy-grail-body {
  display: flex;
  flex: 1;
}

.holy-grail-content {
  flex: 1;
  order: 2;
}

.holy-grail-nav {
  width: 200px;
  order: 1;
}

.holy-grail-ads {
  width: 150px;
  order: 3;
}

/* Responsive Navigation with Flexbox */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
  }
  
  .nav-links {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
}

/* Advanced Card Layout with Flexbox */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
}

.card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.card-content {
  flex: 1;
  padding: 1rem;
}

.card-actions {
  padding: 1rem;
  border-top: 1px solid #eee;
  margin-top: auto;
}

/* Centering Techniques */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.center-grid {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**3. Container Queries and Modern Layout:**
```css
/* Container Queries for Component-based Responsive Design */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

@container card (min-width: 600px) {
  .card {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* Intrinsic Web Design */
.intrinsic-layout {
  display: grid;
  grid-template-columns: 
    minmax(1rem, 1fr)
    minmax(0, 60ch)
    minmax(1rem, 1fr);
}

.intrinsic-content {
  grid-column: 2;
}

/* Modern Stack Layout */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--space, 1rem);
}

.stack > * {
  margin-block: 0;
}

/* Sidebar Layout Pattern */
.sidebar-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.sidebar {
  flex-basis: 250px;
  flex-grow: 1;
}

.main-content {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: 50%;
}
```

### Q18: How do you implement advanced CSS animations and transitions?

**Answer:**
Advanced CSS animations involve complex keyframes, custom timing functions, and performance optimization.

**1. Complex Keyframe Animations:**
```css
/* Multi-stage Loading Animation */
@keyframes complexLoader {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
    border-radius: 50%;
  }
  25% {
    transform: scale(0.5) rotate(90deg);
    opacity: 0.5;
    border-radius: 25%;
  }
  50% {
    transform: scale(1) rotate(180deg);
    opacity: 1;
    border-radius: 0%;
  }
  75% {
    transform: scale(1.2) rotate(270deg);
    opacity: 0.8;
    border-radius: 25%;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
    border-radius: 50%;
  }
}

.complex-loader {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  animation: complexLoader 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

/* Staggered Animation System */
@keyframes slideInUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.stagger-container .item {
  animation: slideInUp 0.6s ease-out both;
}

.stagger-container .item:nth-child(1) { animation-delay: 0.1s; }
.stagger-container .item:nth-child(2) { animation-delay: 0.2s; }
.stagger-container .item:nth-child(3) { animation-delay: 0.3s; }
.stagger-container .item:nth-child(4) { animation-delay: 0.4s; }
.stagger-container .item:nth-child(5) { animation-delay: 0.5s; }

/* Morphing Shape Animation */
@keyframes morphShape {
  0% {
    border-radius: 50% 50% 50% 50%;
    transform: rotate(0deg);
  }
  25% {
    border-radius: 60% 40% 60% 40%;
    transform: rotate(90deg);
  }
  50% {
    border-radius: 40% 60% 40% 60%;
    transform: rotate(180deg);
  }
  75% {
    border-radius: 30% 70% 30% 70%;
    transform: rotate(270deg);
  }
  100% {
    border-radius: 50% 50% 50% 50%;
    transform: rotate(360deg);
  }
}

.morphing-shape {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  animation: morphShape 4s ease-in-out infinite;
}

/* Text Animation Effects */
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blinkCursor {
  from, to { border-color: transparent; }
  50% { border-color: #333; }
}

.typewriter {
  overflow: hidden;
  border-right: 2px solid #333;
  white-space: nowrap;
  margin: 0 auto;
  animation: 
    typewriter 3s steps(40, end),
    blinkCursor 0.75s step-end infinite;
}

/* Parallax Scroll Animation */
@keyframes parallaxMove {
  to {
    transform: translateY(var(--parallax-speed, -50px));
  }
}

.parallax-element {
  animation: parallaxMove linear;
  animation-timeline: scroll();
}

.parallax-slow { --parallax-speed: -20px; }
.parallax-medium { --parallax-speed: -40px; }
.parallax-fast { --parallax-speed: -80px; }
```

**2. Advanced Transition Techniques:**
```css
/* Custom Cubic Bezier Transitions */
.smooth-bounce {
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.elastic {
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.anticipate {
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Multi-property Transitions */
.complex-hover {
  transition: 
    transform 0.3s ease-out,
    box-shadow 0.3s ease-out,
    background-color 0.2s ease-in,
    border-radius 0.4s ease-in-out;
}

.complex-hover:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  background-color: #f0f0f0;
  border-radius: 15px;
}

/* State-based Transitions */
.modal {
  opacity: 0;
  visibility: hidden;
  transform: scale(0.8) translateY(-50px);
  transition: 
    opacity 0.3s ease-out,
    visibility 0.3s ease-out,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal.is-open {
  opacity: 1;
  visibility: visible;
  transform: scale(1) translateY(0);
}

/* Performance-optimized Animations */
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU layer */
}

.optimized-animation {
  animation: slideIn 0.3s ease-out;
  /* Use transform and opacity for best performance */
}

@keyframes slideIn {
  from {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
```

**3. Interactive Animation States:**
```css
/* Button with Multiple States */
.interactive-button {
  position: relative;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.interactive-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.interactive-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.interactive-button:hover::before {
  left: 100%;
}

.interactive-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* Loading State Animation */
.button-loading {
  position: relative;
  color: transparent;
}

.button-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Card Flip Animation */
.flip-card {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flip-card-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

### Q19: How do you implement modern CSS features and best practices?

**Answer:**
Modern CSS includes cutting-edge features like custom properties, logical properties, and advanced selectors.

**1. CSS Custom Properties (Variables) Advanced Usage:**
```css
/* Dynamic Theme System */
:root {
  /* Color Palette */
  --primary-hue: 220;
  --primary-saturation: 70%;
  --primary-lightness: 50%;
  
  --primary: hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness));
  --primary-light: hsl(var(--primary-hue), var(--primary-saturation), calc(var(--primary-lightness) + 20%));
  --primary-dark: hsl(var(--primary-hue), var(--primary-saturation), calc(var(--primary-lightness) - 20%));
  
  /* Spacing Scale */
  --space-unit: 1rem;
  --space-xs: calc(var(--space-unit) * 0.25);
  --space-sm: calc(var(--space-unit) * 0.5);
  --space-md: var(--space-unit);
  --space-lg: calc(var(--space-unit) * 2);
  --space-xl: calc(var(--space-unit) * 4);
  
  /* Typography Scale */
  --font-size-base: 1rem;
  --font-size-sm: calc(var(--font-size-base) * 0.875);
  --font-size-lg: calc(var(--font-size-base) * 1.125);
  --font-size-xl: calc(var(--font-size-base) * 1.25);
  --font-size-2xl: calc(var(--font-size-base) * 1.5);
  
  /* Component-specific variables */
  --button-padding: var(--space-sm) var(--space-md);
  --button-radius: 6px;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Dark theme override */
[data-theme="dark"] {
  --primary-lightness: 60%;
  --background: #1a1a1a;
  --text: #ffffff;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Component using custom properties */
.button {
  padding: var(--button-padding);
  border-radius: var(--button-radius);
  background: var(--primary);
  color: white;
  border: none;
  font-size: var(--font-size-base);
  transition: background-color 0.2s ease;
}

.button:hover {
  background: var(--primary-dark);
}

/* Responsive custom properties */
@media (min-width: 768px) {
  :root {
    --space-unit: 1.25rem;
    --font-size-base: 1.125rem;
  }
}

/* Context-aware variables */
.card {
  --card-padding: var(--space-md);
  --card-gap: var(--space-sm);
  
  padding: var(--card-padding);
  gap: var(--card-gap);
  box-shadow: var(--card-shadow);
}

.card.large {
  --card-padding: var(--space-lg);
  --card-gap: var(--space-md);
}
```

**2. Logical Properties and Modern Layout:**
```css
/* Logical Properties for Internationalization */
.content {
  margin-inline-start: var(--space-md);
  margin-inline-end: var(--space-md);
  padding-block-start: var(--space-lg);
  padding-block-end: var(--space-lg);
  border-inline-start: 3px solid var(--primary);
}

/* Equivalent to margin-left/right and padding-top/bottom in LTR */
/* But adapts automatically for RTL languages */

.sidebar {
  inline-size: 250px; /* width in LTR, height in vertical writing modes */
  block-size: 100vh; /* height in LTR, width in vertical writing modes */
}

/* Modern CSS Functions */
.responsive-container {
  width: min(90vw, 1200px);
  margin-inline: auto;
  padding-inline: max(1rem, 5vw);
}

.flexible-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(250px, 30vw, 350px), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
}

/* Advanced Selectors */
/* :is() pseudo-class */
:is(h1, h2, h3, h4, h5, h6) {
  font-family: var(--heading-font);
  line-height: 1.2;
  margin-block-end: var(--space-sm);
}

/* :where() pseudo-class (lower specificity) */
:where(ul, ol) :where(ul, ol) {
  margin-block: 0;
}

/* :has() pseudo-class (when supported) */
.card:has(img) {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-md);
}

.form-group:has(input:invalid) {
  border-color: red;
}

/* Container queries */
@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
}
```

**3. Performance and Accessibility Best Practices:**
```css
/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High Contrast Support */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
  
  .card {
    border: 1px solid currentColor;
  }
}

/* Color Scheme Support */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a1a1a;
    --text: #ffffff;
    --primary: hsl(220, 70%, 60%);
  }
}

/* Focus Management */
.focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 6px;
}

/* Performance Optimizations */
.will-change-transform {
  will-change: transform;
}

.will-change-auto {
  will-change: auto;
}

/* Use containment for performance */
.isolated-component {
  contain: layout style paint;
}

/* Critical CSS patterns */
.above-fold {
  /* Inline critical styles for above-the-fold content */
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #333;
}

/* Lazy-loaded styles */
.below-fold {
  /* Non-critical styles loaded asynchronously */
  font-feature-settings: "liga" 1, "kern" 1;
  text-rendering: optimizeLegibility;
}

/* Modern CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* Utility Classes */
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

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

### Q20: How do you implement CSS Container Queries for responsive components?

**Answer:**
CSS Container Queries allow components to respond to their container's size rather than the viewport, enabling true component-based responsive design.

**Container Query Implementation:**
```css
/* Define container context */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Alternative shorthand */
.sidebar {
  container: sidebar / inline-size;
}

/* Container queries */
@container card (min-width: 300px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
  
  .card__image {
    aspect-ratio: 16/9;
    object-fit: cover;
  }
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
  }
  
  .card__title {
    font-size: clamp(1.5rem, 4cqw, 2.5rem);
  }
}

/* Named container queries */
@container sidebar (max-width: 250px) {
  .nav-item {
    flex-direction: column;
    text-align: center;
  }
  
  .nav-icon {
    margin-bottom: 0.5rem;
  }
}

/* Container query units */
.responsive-text {
  /* cqw: 1% of container's width */
  font-size: clamp(1rem, 3cqw, 2rem);
  
  /* cqh: 1% of container's height */
  line-height: calc(1.5 + 0.5cqh);
  
  /* cqi: 1% of container's inline size */
  padding: 1cqi;
  
  /* cqb: 1% of container's block size */
  margin-block: 2cqb;
  
  /* cqmin: smaller of cqi or cqb */
  border-radius: 1cqmin;
  
  /* cqmax: larger of cqi or cqb */
  max-width: 50cqmax;
}

/* Advanced container patterns */
.adaptive-layout {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .adaptive-layout {
    display: grid;
    grid-template-areas: 
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 200px 1fr;
  }
}

@container (min-width: 800px) {
  .adaptive-layout {
    grid-template-areas: 
      "header header header"
      "sidebar main aside"
      "footer footer footer";
    grid-template-columns: 200px 1fr 150px;
  }
}

/* Container query with style queries (future) */
@container style(--theme: dark) {
  .card {
    background: #1a1a1a;
    color: #ffffff;
    border: 1px solid #333;
  }
}
```

### Q21: How do you use CSS Cascade Layers for better style organization?

**Answer:**
CSS Cascade Layers provide explicit control over the cascade, allowing you to organize styles into layers with defined precedence.

**Cascade Layers Implementation:**
```css
/* Define layer order (lowest to highest priority) */
@layer reset, base, components, utilities, overrides;

/* Reset layer */
@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
}

/* Base layer */
@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    color: #333;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }
  
  a {
    color: #0066cc;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
}

/* Components layer */
@layer components {
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .button--primary {
    background: #0066cc;
    color: white;
  }
  
  .button--primary:hover {
    background: #0052a3;
  }
  
  .card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }
  
  .modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal__content {
    background: white;
    border-radius: 0.5rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }
}

/* Utilities layer */
@layer utilities {
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  .hidden { display: none; }
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
  
  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-8 { margin-top: 2rem; }
  
  .p-0 { padding: 0; }
  .p-1 { padding: 0.25rem; }
  .p-2 { padding: 0.5rem; }
  .p-4 { padding: 1rem; }
  .p-8 { padding: 2rem; }
}

/* Overrides layer */
@layer overrides {
  .force-dark {
    background: #1a1a1a !important;
    color: #ffffff !important;
  }
  
  .force-hidden {
    display: none !important;
  }
}

/* Nested layers */
@layer components {
  @layer base, variants, states;
  
  @layer base {
    .input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
    }
  }
  
  @layer variants {
    .input--large {
      padding: 0.75rem;
      font-size: 1.125rem;
    }
    
    .input--small {
      padding: 0.25rem;
      font-size: 0.875rem;
    }
  }
  
  @layer states {
    .input:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }
    
    .input:invalid {
      border-color: #dc2626;
    }
  }
}

/* Anonymous layers */
@layer {
  .temporary-styles {
    /* These styles are in an anonymous layer */
    background: yellow;
  }
}

/* Import with layers */
@import url("reset.css") layer(reset);
@import url("components.css") layer(components);
```

### Q22: How do you implement advanced CSS custom properties and functions?

**Answer:**
Modern CSS custom properties support complex data types, calculations, and dynamic behavior for sophisticated design systems.

**Advanced Custom Properties:**
```css
/* Complex custom property patterns */
:root {
  /* Color system with HSL */
  --primary-h: 220;
  --primary-s: 100%;
  --primary-l: 50%;
  --primary: hsl(var(--primary-h) var(--primary-s) var(--primary-l));
  
  /* Dynamic color variations */
  --primary-50: hsl(var(--primary-h) var(--primary-s) 95%);
  --primary-100: hsl(var(--primary-h) var(--primary-s) 90%);
  --primary-200: hsl(var(--primary-h) var(--primary-s) 80%);
  --primary-500: var(--primary);
  --primary-700: hsl(var(--primary-h) var(--primary-s) 35%);
  --primary-900: hsl(var(--primary-h) var(--primary-s) 15%);
  
  /* Spacing scale */
  --space-unit: 0.25rem;
  --space-xs: calc(var(--space-unit) * 1); /* 4px */
  --space-sm: calc(var(--space-unit) * 2); /* 8px */
  --space-md: calc(var(--space-unit) * 4); /* 16px */
  --space-lg: calc(var(--space-unit) * 6); /* 24px */
  --space-xl: calc(var(--space-unit) * 8); /* 32px */
  
  /* Typography scale */
  --font-size-ratio: 1.25;
  --font-size-base: 1rem;
  --font-size-sm: calc(var(--font-size-base) / var(--font-size-ratio));
  --font-size-lg: calc(var(--font-size-base) * var(--font-size-ratio));
  --font-size-xl: calc(var(--font-size-lg) * var(--font-size-ratio));
  --font-size-2xl: calc(var(--font-size-xl) * var(--font-size-ratio));
  
  /* Animation timing */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --easing-ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Layout breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  
  /* Component-specific properties */
  --button-padding-x: var(--space-md);
  --button-padding-y: var(--space-sm);
  --button-border-radius: 0.375rem;
  --button-font-weight: 500;
  
  /* Complex calculations */
  --golden-ratio: 1.618;
  --content-width: 65ch;
  --sidebar-width: calc(var(--content-width) / var(--golden-ratio));
}

/* Theme switching with custom properties */
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --border-color: #e2e8f0;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #cbd5e0;
  --border-color: #4a5568;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Advanced CSS functions */
.advanced-functions {
  /* Modern color functions */
  background: color-mix(in srgb, var(--primary) 80%, white);
  border-color: color-contrast(var(--bg-primary) vs white, black);
  
  /* Advanced math functions */
  width: clamp(300px, 50vw, 800px);
  font-size: clamp(1rem, 2.5vw, 2rem);
  
  /* Trigonometric functions */
  transform: rotate(calc(sin(var(--angle)) * 45deg));
  
  /* Container query length units */
  padding: max(1rem, 5cqw);
  margin: min(2rem, 10cqh);
  
  /* Dynamic viewport units */
  height: 100dvh; /* Dynamic viewport height */
  width: 100dvw;  /* Dynamic viewport width */
  
  /* Logical properties with custom properties */
  margin-inline: var(--space-md);
  padding-block: var(--space-lg);
  border-inline-start: 3px solid var(--primary);
}

/* Custom property inheritance patterns */
.component {
  --local-spacing: var(--space-md);
  --local-color: var(--primary);
  
  padding: var(--local-spacing);
  border-left: 3px solid var(--local-color);
}

.component--large {
  --local-spacing: var(--space-lg);
}

.component--accent {
  --local-color: var(--accent);
}

/* Conditional custom properties with @supports */
@supports (color: color-mix(in srgb, red, blue)) {
  :root {
    --mixed-color: color-mix(in srgb, var(--primary) 70%, white);
  }
}

@supports not (color: color-mix(in srgb, red, blue)) {
  :root {
    --mixed-color: var(--primary-200);
  }
}

/* Custom property animations */
@keyframes color-shift {
  0% { --hue: 0; }
  100% { --hue: 360; }
}

.animated-background {
  --hue: 220;
  background: hsl(var(--hue) 70% 50%);
  animation: color-shift 3s infinite linear;
}

/* Property registration (when supported) */
@property --rotation {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@property --progress {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.progress-indicator {
  --progress: 0%;
  background: conic-gradient(
    var(--primary) var(--progress),
    var(--bg-secondary) var(--progress)
  );
  transition: --progress 0.3s ease;
}

.progress-indicator[data-progress="50"] {
  --progress: 50%;
}
```

### Q23: How do you implement modern CSS layout techniques?

**Answer:**
Modern CSS provides powerful layout methods including Subgrid, advanced Grid features, and sophisticated Flexbox patterns.

**Advanced Layout Techniques:**
```css
/* CSS Subgrid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  /* Inherit parent grid for alignment */
  grid-row: span 3;
}

.card-content {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  gap: inherit;
}

/* Advanced Grid patterns */
.magazine-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 100px);
  gap: 1rem;
}

.hero-article {
  grid-column: 1 / 8;
  grid-row: 1 / 5;
}

.featured-article {
  grid-column: 8 / 13;
  grid-row: 1 / 3;
}

.sidebar {
  grid-column: 8 / 13;
  grid-row: 3 / 9;
}

.article-grid {
  grid-column: 1 / 8;
  grid-row: 5 / 9;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  gap: inherit;
}

/* Intrinsic web design patterns */
.flexible-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
}

/* Advanced Flexbox patterns */
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.holy-grail__header,
.holy-grail__footer {
  flex-shrink: 0;
}

.holy-grail__body {
  display: flex;
  flex: 1;
}

.holy-grail__content {
  flex: 1;
  min-width: 0; /* Prevent flex item overflow */
}

.holy-grail__sidebar {
  flex: 0 0 250px;
}

/* Aspect ratio containers */
.aspect-ratio-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.aspect-ratio-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Multi-column layout */
.article-columns {
  columns: 3;
  column-gap: 2rem;
  column-rule: 1px solid #e2e8f0;
  column-fill: balance;
}

.article-columns h2 {
  column-span: all;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-columns .pull-quote {
  column-span: all;
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background: var(--bg-secondary);
}

/* Advanced positioning */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

/* Modern centering techniques */
.center-content {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.center-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* Responsive typography with container queries */
.responsive-text {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .responsive-text h1 {
    font-size: clamp(2rem, 5cqw, 4rem);
  }
}

/* Advanced grid alignment */
.complex-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 1rem;
}

.grid-item-1 {
  grid-area: 1 / 1 / 3 / 3;
  align-self: stretch;
  justify-self: stretch;
}

.grid-item-2 {
  grid-area: 1 / 3 / 2 / 5;
  align-self: center;
  justify-self: end;
}

/* Masonry-like layout with CSS Grid */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
  gap: 1rem;
}

.masonry-item {
  grid-row-end: span var(--row-span, 10);
}

/* Dynamic grid with CSS custom properties */
.dynamic-grid {
  --columns: 3;
  --gap: 1rem;
  
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
}

@media (max-width: 768px) {
  .dynamic-grid {
    --columns: 2;
  }
}

@media (max-width: 480px) {
  .dynamic-grid {
    --columns: 1;
  }
}
```

### Q24: How do you implement advanced CSS animations and micro-interactions?

**Answer:**
Modern CSS animations enable sophisticated micro-interactions, performance-optimized animations, and complex motion design.

**Advanced Animation Techniques:**
```css
/* Complex keyframe animations */
@keyframes morphing-blob {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  25% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: translate3d(10px, -10px, 0) rotate(90deg);
  }
  50% {
    border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
    transform: translate3d(-10px, 10px, 0) rotate(180deg);
  }
  75% {
    border-radius: 60% 40% 60% 30% / 70% 30% 60% 40%;
    transform: translate3d(-10px, -10px, 0) rotate(270deg);
  }
}

.morphing-element {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, var(--primary), var(--accent));
  animation: morphing-blob 8s ease-in-out infinite;
  will-change: transform, border-radius;
}

/* Scroll-triggered animations */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-on-scroll {
  opacity: 0;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-on-scroll.slide-in-left {
  animation-name: slide-in-left;
}

.animate-on-scroll.slide-in-right {
  animation-name: slide-in-right;
}

/* Staggered animations */
.stagger-container .item {
  opacity: 0;
  transform: translateY(20px);
  animation: fade-in-up 0.6s ease forwards;
}

.stagger-container .item:nth-child(1) { animation-delay: 0.1s; }
.stagger-container .item:nth-child(2) { animation-delay: 0.2s; }
.stagger-container .item:nth-child(3) { animation-delay: 0.3s; }
.stagger-container .item:nth-child(4) { animation-delay: 0.4s; }
.stagger-container .item:nth-child(5) { animation-delay: 0.5s; }

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Interactive button animations */
.interactive-button {
  position: relative;
  padding: 1rem 2rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.interactive-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.interactive-button:hover::before {
  left: 100%;
}

.interactive-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.interactive-button:active {
  transform: translateY(0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Ripple effect */
.ripple-button {
  position: relative;
  overflow: hidden;
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.ripple-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ripple-button:active::after {
  width: 300px;
  height: 300px;
}

/* Loading animations */
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s infinite;
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Bounce animation */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.bounce {
  animation: bounce 1s infinite;
}

/* Advanced hover effects */
.card-hover {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.card-hover:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
}

/* Text animations */
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: var(--primary);
  }
}

.typewriter {
  overflow: hidden;
  border-right: 2px solid var(--primary);
  white-space: nowrap;
  margin: 0 auto;
  animation: 
    typewriter 3.5s steps(40, end),
    blink-caret 0.75s step-end infinite;
}

/* Performance-optimized animations */
.optimized-animation {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force hardware acceleration */
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* View transitions (when supported) */
@supports (view-transition-name: none) {
  .page-transition {
    view-transition-name: page-content;
  }
  
  ::view-transition-old(page-content) {
    animation: slide-out-left 0.3s ease-in;
  }
  
  ::view-transition-new(page-content) {
    animation: slide-in-right 0.3s ease-out;
  }
}

@keyframes slide-out-left {
  to {
    transform: translateX(-100%);
  }
}
```

This comprehensive CSS guide now covers advanced layout techniques, modern animation patterns, cutting-edge CSS features like Container Queries and Cascade Layers, sophisticated custom properties usage, and performance optimization strategies essential for modern web development.

---

## Advanced CSS Architecture and Modern Patterns

### Q25: How do you implement CSS-in-JS patterns and component-scoped styling?
**Difficulty: Advanced**

**Answer:**
CSS-in-JS allows you to write CSS directly in JavaScript, providing component-scoped styling, dynamic styling based on props, and better maintainability in component-based architectures.

**1. Styled Components Pattern:**
```typescript
// styled-components approach
import styled, { css, keyframes, ThemeProvider } from 'styled-components';

// Basic styled component
const Button = styled.button<{ variant?: 'primary' | 'secondary'; size?: 'sm' | 'md' | 'lg' }>`
  padding: ${props => {
    switch (props.size) {
      case 'sm': return '8px 16px';
      case 'lg': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' && css`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  `}
  
  ${props => props.variant === 'secondary' && css`
    background: transparent;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primary};
      color: white;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Complex component with animations
const Card = styled.div<{ isVisible?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  ${props => props.isVisible && css`
    animation: ${fadeInUp} 0.6s ease-out;
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    margin: 8px;
  }
`;

// Theme provider setup
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};

// Usage with theme
const App = () => (
  <ThemeProvider theme={theme}>
    <Card isVisible>
      <Button variant="primary" size="lg">
        Click me
      </Button>
    </Card>
  </ThemeProvider>
);
```

**2. CSS Modules with TypeScript:**
```typescript
// styles.module.css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.button {
  composes: baseButton from './base.module.css';
  background: var(--color-primary);
  color: white;
}

.button:hover {
  background: var(--color-primary-dark);
}

.buttonSecondary {
  composes: button;
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

// Component with CSS Modules
import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick
}) => {
  const buttonClass = classNames(
    styles.button,
    {
      [styles.buttonSecondary]: variant === 'secondary',
      [styles.buttonSmall]: size === 'sm',
      [styles.buttonLarge]: size === 'lg',
      [styles.disabled]: disabled
    }
  );
  
  return (
    <button 
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

**3. Emotion CSS-in-JS:**
```typescript
// Using Emotion
import { css, jsx, Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

// Global styles
const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
  }
`;

// Dynamic styling with props
const DynamicButton = styled.button<{
  bgColor: string;
  textColor: string;
  isLoading?: boolean;
}>`
  background: ${props => props.bgColor};
  color: ${props => props.textColor};
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.isLoading ? 0.7 : 1};
  transition: all 0.2s ease;
  
  ${props => props.isLoading && css`
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  `}
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// CSS prop usage
const Component = () => (
  <div>
    <Global styles={globalStyles} />
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        padding: 24px;
        
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          padding: 16px;
        }
      `}
    >
      <DynamicButton
        bgColor="#667eea"
        textColor="white"
        isLoading={false}
      >
        Dynamic Button
      </DynamicButton>
    </div>
  </div>
);
```

### Q26: How do you implement advanced CSS custom properties and design systems?
**Difficulty: Expert**

**Answer:**
Advanced CSS custom properties enable sophisticated design systems with dynamic theming, component variants, and responsive design patterns.

**1. Advanced Design System with Custom Properties:**
```css
/* Design system foundation */
:root {
  /* Color system with semantic naming */
  --color-primary-50: hsl(231, 48%, 95%);
  --color-primary-100: hsl(231, 48%, 90%);
  --color-primary-200: hsl(231, 48%, 80%);
  --color-primary-300: hsl(231, 48%, 70%);
  --color-primary-400: hsl(231, 48%, 60%);
  --color-primary-500: hsl(231, 48%, 50%);
  --color-primary-600: hsl(231, 48%, 40%);
  --color-primary-700: hsl(231, 48%, 30%);
  --color-primary-800: hsl(231, 48%, 20%);
  --color-primary-900: hsl(231, 48%, 10%);
  
  /* Semantic color tokens */
  --color-bg-primary: var(--color-primary-50);
  --color-bg-secondary: var(--color-primary-100);
  --color-text-primary: var(--color-primary-900);
  --color-text-secondary: var(--color-primary-700);
  --color-border: var(--color-primary-200);
  
  /* Spacing system */
  --space-unit: 4px;
  --space-xs: calc(var(--space-unit) * 1); /* 4px */
  --space-sm: calc(var(--space-unit) * 2); /* 8px */
  --space-md: calc(var(--space-unit) * 4); /* 16px */
  --space-lg: calc(var(--space-unit) * 6); /* 24px */
  --space-xl: calc(var(--space-unit) * 8); /* 32px */
  --space-2xl: calc(var(--space-unit) * 12); /* 48px */
  --space-3xl: calc(var(--space-unit) * 16); /* 64px */
  
  /* Typography system */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Border radius system */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadow system */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Animation system */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  --easing-linear: linear;
  --easing-ease: ease;
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Breakpoints as custom properties */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Dark theme */
[data-theme="dark"] {
  --color-bg-primary: var(--color-primary-900);
  --color-bg-secondary: var(--color-primary-800);
  --color-text-primary: var(--color-primary-50);
  --color-text-secondary: var(--color-primary-200);
  --color-border: var(--color-primary-700);
}

/* High contrast theme */
[data-theme="high-contrast"] {
  --color-bg-primary: #000000;
  --color-bg-secondary: #1a1a1a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #cccccc;
  --color-border: #666666;
}

/* Component system using custom properties */
.btn {
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  
  padding: var(--btn-padding-y, var(--space-md)) var(--btn-padding-x, var(--space-lg));
  
  font-family: var(--font-family-sans);
  font-size: var(--btn-font-size, var(--font-size-base));
  font-weight: 600;
  line-height: var(--line-height-tight);
  
  background: var(--btn-bg, var(--color-primary-500));
  color: var(--btn-color, white);
  border: var(--btn-border-width, 1px) solid var(--btn-border-color, transparent);
  border-radius: var(--btn-radius, var(--radius-md));
  
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-ease-out);
  
  &:hover {
    background: var(--btn-bg-hover, var(--color-primary-600));
    transform: var(--btn-transform-hover, translateY(-1px));
    box-shadow: var(--btn-shadow-hover, var(--shadow-md));
  }
  
  &:active {
    transform: var(--btn-transform-active, translateY(0));
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

/* Button variants using custom property overrides */
.btn--secondary {
  --btn-bg: transparent;
  --btn-color: var(--color-primary-600);
  --btn-border-color: var(--color-primary-300);
  --btn-bg-hover: var(--color-primary-50);
}

.btn--outline {
  --btn-bg: transparent;
  --btn-color: var(--color-primary-600);
  --btn-border-color: var(--color-primary-600);
  --btn-bg-hover: var(--color-primary-600);
  --btn-color-hover: white;
}

.btn--ghost {
  --btn-bg: transparent;
  --btn-color: var(--color-primary-600);
  --btn-border-color: transparent;
  --btn-bg-hover: var(--color-primary-100);
}

/* Size variants */
.btn--sm {
  --btn-padding-y: var(--space-sm);
  --btn-padding-x: var(--space-md);
  --btn-font-size: var(--font-size-sm);
}

.btn--lg {
  --btn-padding-y: var(--space-lg);
  --btn-padding-x: var(--space-xl);
  --btn-font-size: var(--font-size-lg);
}

/* Responsive custom properties */
@media (max-width: 768px) {
  :root {
    --space-unit: 3px;
    --font-size-base: 0.9rem;
  }
}

/* Advanced card component with custom properties */
.card {
  --card-bg: var(--color-bg-primary);
  --card-border: var(--color-border);
  --card-shadow: var(--shadow-md);
  --card-radius: var(--radius-lg);
  --card-padding: var(--space-lg);
  
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  padding: var(--card-padding);
  
  transition: all var(--duration-normal) var(--easing-ease-out);
}

.card:hover {
  --card-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card--elevated {
  --card-shadow: var(--shadow-xl);
}

.card--flat {
  --card-shadow: none;
  --card-border: var(--color-border);
}
```

**2. Dynamic Theme Switching:**
```typescript
// Theme management system
interface Theme {
  name: string;
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
}

class ThemeManager {
  private currentTheme: string = 'light';
  private themes: Map<string, Theme> = new Map();
  
  constructor() {
    this.loadThemes();
    this.applyTheme(this.currentTheme);
  }
  
  private loadThemes() {
    const lightTheme: Theme = {
      name: 'light',
      colors: {
        'color-bg-primary': '#ffffff',
        'color-bg-secondary': '#f8fafc',
        'color-text-primary': '#1e293b',
        'color-text-secondary': '#64748b',
        'color-primary-500': '#3b82f6'
      },
      spacing: {
        'space-unit': '4px'
      },
      typography: {
        'font-size-base': '1rem'
      }
    };
    
    const darkTheme: Theme = {
      name: 'dark',
      colors: {
        'color-bg-primary': '#0f172a',
        'color-bg-secondary': '#1e293b',
        'color-text-primary': '#f1f5f9',
        'color-text-secondary': '#cbd5e1',
        'color-primary-500': '#60a5fa'
      },
      spacing: {
        'space-unit': '4px'
      },
      typography: {
        'font-size-base': '1rem'
      }
    };
    
    this.themes.set('light', lightTheme);
    this.themes.set('dark', darkTheme);
  }
  
  applyTheme(themeName: string) {
    const theme = this.themes.get(themeName);
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply spacing variables
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply typography variables
    Object.entries(theme.typography).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Update data attribute
    root.setAttribute('data-theme', themeName);
    this.currentTheme = themeName;
    
    // Store preference
    localStorage.setItem('theme', themeName);
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }
  
  getCurrentTheme(): string {
    return this.currentTheme;
  }
  
  // Dynamic color generation
  generateColorScale(baseColor: string, name: string) {
    const hsl = this.hexToHsl(baseColor);
    const scale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    
    scale.forEach((weight, index) => {
      const lightness = 95 - (index * 10);
      const color = `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`;
      document.documentElement.style.setProperty(`--color-${name}-${weight}`, color);
    });
  }
  
  private hexToHsl(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
}

// Usage
const themeManager = new ThemeManager();

// Theme toggle component
const ThemeToggle = () => {
  const [theme, setTheme] = useState(themeManager.getCurrentTheme());
  
  const handleToggle = () => {
    themeManager.toggleTheme();
    setTheme(themeManager.getCurrentTheme());
  };
  
  return (
    <button 
      className="btn btn--ghost"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

This enhanced CSS guide now includes advanced CSS-in-JS patterns, sophisticated design system implementation with custom properties, dynamic theming capabilities, and modern CSS architecture patterns essential for scalable web applications.

### Q27: How do you implement CSS Houdini and advanced CSS features?
**Difficulty: Expert**

**Answer:**
CSS Houdini provides low-level APIs that allow developers to extend CSS with custom properties, paint worklets, and layout algorithms.

**1. CSS Paint API (Custom Paint Worklets):**
```javascript
// paint-worklet.js
class CircularProgressPainter {
  static get inputProperties() {
    return ['--progress', '--color', '--bg-color', '--thickness'];
  }
  
  paint(ctx, size, properties) {
    const progress = parseFloat(properties.get('--progress')) || 0;
    const color = properties.get('--color').toString() || '#3b82f6';
    const bgColor = properties.get('--bg-color').toString() || '#e5e7eb';
    const thickness = parseFloat(properties.get('--thickness')) || 8;
    
    const centerX = size.width / 2;
    const centerY = size.height / 2;
    const radius = Math.min(centerX, centerY) - thickness / 2;
    
    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = thickness;
    ctx.stroke();
    
    // Progress arc
    if (progress > 0) {
      ctx.beginPath();
      ctx.arc(
        centerX, 
        centerY, 
        radius, 
        -Math.PI / 2, 
        -Math.PI / 2 + (2 * Math.PI * progress / 100)
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }
}

registerPaint('circular-progress', CircularProgressPainter);

// Animated gradient painter
class AnimatedGradientPainter {
  static get inputProperties() {
    return ['--time', '--color1', '--color2', '--speed'];
  }
  
  paint(ctx, size, properties) {
    const time = parseFloat(properties.get('--time')) || 0;
    const color1 = properties.get('--color1').toString() || '#ff6b6b';
    const color2 = properties.get('--color2').toString() || '#4ecdc4';
    const speed = parseFloat(properties.get('--speed')) || 1;
    
    const gradient = ctx.createLinearGradient(
      0, 0, 
      size.width, size.height
    );
    
    const offset = (Math.sin(time * speed) + 1) / 2;
    gradient.addColorStop(0, color1);
    gradient.addColorStop(offset, color2);
    gradient.addColorStop(1, color1);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);
  }
}

registerPaint('animated-gradient', AnimatedGradientPainter);
```

```css
/* Register and use paint worklets */
@supports (background: paint(circular-progress)) {
  .progress-circle {
    width: 100px;
    height: 100px;
    background: paint(circular-progress);
    --progress: 75;
    --color: #10b981;
    --bg-color: #f3f4f6;
    --thickness: 8;
    transition: --progress 0.3s ease;
  }
  
  .animated-bg {
    background: paint(animated-gradient);
    --color1: #667eea;
    --color2: #764ba2;
    --speed: 0.02;
    --time: 0;
    animation: updateTime 10s linear infinite;
  }
}

@keyframes updateTime {
  to {
    --time: 100;
  }
}

/* Fallback for browsers without paint API support */
@supports not (background: paint(circular-progress)) {
  .progress-circle {
    border: 8px solid #f3f4f6;
    border-top: 8px solid #10b981;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}
```

**2. CSS Typed OM and Properties & Values API:**
```javascript
// Register custom properties with types
if ('registerProperty' in CSS) {
  CSS.registerProperty({
    name: '--progress',
    syntax: '<number>',
    initialValue: 0,
    inherits: false
  });
  
  CSS.registerProperty({
    name: '--rotation',
    syntax: '<angle>',
    initialValue: '0deg',
    inherits: false
  });
  
  CSS.registerProperty({
    name: '--scale',
    syntax: '<number>',
    initialValue: 1,
    inherits: false
  });
  
  CSS.registerProperty({
    name: '--color-stop',
    syntax: '<percentage>',
    initialValue: '50%',
    inherits: false
  });
}

// Advanced animation with typed custom properties
class AdvancedAnimationController {
  constructor(element) {
    this.element = element;
    this.setupAnimations();
  }
  
  setupAnimations() {
    // Smooth progress animation
    this.element.style.setProperty('--progress', '0');
    this.element.style.transition = '--progress 2s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Complex rotation with easing
    this.element.style.setProperty('--rotation', '0deg');
    this.element.style.transition += ', --rotation 1s ease-in-out';
    
    // Scale animation
    this.element.style.setProperty('--scale', '1');
    this.element.style.transition += ', --scale 0.3s ease-out';
  }
  
  animateProgress(value) {
    this.element.style.setProperty('--progress', value.toString());
  }
  
  rotate(degrees) {
    this.element.style.setProperty('--rotation', `${degrees}deg`);
  }
  
  scale(factor) {
    this.element.style.setProperty('--scale', factor.toString());
  }
}
```

```css
/* Advanced animations with registered properties */
.advanced-card {
  transform: 
    rotate(var(--rotation)) 
    scale(var(--scale));
  background: linear-gradient(
    45deg,
    #667eea 0%,
    #764ba2 var(--color-stop),
    #667eea 100%
  );
  transition: 
    --rotation 0.5s ease,
    --scale 0.3s ease,
    --color-stop 1s ease;
}

.advanced-card:hover {
  --rotation: 5deg;
  --scale: 1.05;
  --color-stop: 70%;
}
```

**3. Advanced CSS Selectors and Modern Features:**
```css
/* :is() and :where() selectors */
:is(h1, h2, h3, h4, h5, h6) {
  font-family: var(--font-family-heading);
  line-height: var(--line-height-tight);
}

/* :where() has 0 specificity */
:where(.btn) {
  display: inline-flex;
  align-items: center;
}

/* :has() relational selector */
.card:has(.card__image) {
  display: grid;
  grid-template-rows: auto 1fr;
}

.form-group:has(input:invalid) {
  --border-color: var(--color-error);
}

.article:has(> .article__video) {
  container-type: inline-size;
}

/* Advanced attribute selectors */
[data-theme="dark"] .icon[data-variant*="outline"] {
  stroke: var(--color-text-primary);
}

input[type="email" i]:invalid {
  border-color: var(--color-error);
}

/* CSS Nesting */
.navigation {
  display: flex;
  gap: var(--space-md);
  
  & .nav-item {
    position: relative;
    
    & .nav-link {
      padding: var(--space-sm) var(--space-md);
      text-decoration: none;
      transition: color var(--duration-fast);
      
      &:hover {
        color: var(--color-primary-600);
      }
      
      &[aria-current="page"] {
        color: var(--color-primary-700);
        font-weight: 600;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-primary-600);
        }
      }
    }
    
    & .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all var(--duration-fast);
      
      .nav-item:hover & {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
  }
}

/* Advanced pseudo-selectors */
.list-item:nth-child(odd of .featured) {
  background: var(--color-bg-secondary);
}

.grid-item:nth-child(3n + 1) {
  grid-column: span 2;
}

/* CSS Cascade Layers for architecture */
@layer reset, base, components, utilities;

@layer reset {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

@layer base {
  body {
    font-family: var(--font-family-sans);
    line-height: var(--line-height-normal);
    color: var(--color-text-primary);
    background: var(--color-bg-primary);
  }
}

@layer components {
  .btn {
    /* Component styles */
  }
  
  .card {
    /* Component styles */
  }
}

@layer utilities {
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
}
```

### Q28: How do you implement modern CSS framework integration and performance optimization?
**Difficulty: Expert**

**Answer:**
Modern CSS frameworks require sophisticated integration strategies, performance optimization, and maintainable architecture patterns.

**1. Tailwind CSS with Custom Design System Integration:**
```javascript
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(var(--color-primary-50) / <alpha-value>)',
          100: 'hsl(var(--color-primary-100) / <alpha-value>)',
          200: 'hsl(var(--color-primary-200) / <alpha-value>)',
          300: 'hsl(var(--color-primary-300) / <alpha-value>)',
          400: 'hsl(var(--color-primary-400) / <alpha-value>)',
          500: 'hsl(var(--color-primary-500) / <alpha-value>)',
          600: 'hsl(var(--color-primary-600) / <alpha-value>)',
          700: 'hsl(var(--color-primary-700) / <alpha-value>)',
          800: 'hsl(var(--color-primary-800) / <alpha-value>)',
          900: 'hsl(var(--color-primary-900) / <alpha-value>)',
        },
        gray: {
          50: 'hsl(var(--color-gray-50) / <alpha-value>)',
          // ... rest of gray scale
        }
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Custom plugin for design system components
    function({ addComponents, theme }) {
      addComponents({
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.none'),
          borderRadius: theme('borderRadius.md'),
          transition: 'all 150ms ease',
          cursor: 'pointer',
          '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed',
          },
        },
        '.btn-primary': {
          backgroundColor: theme('colors.primary.600'),
          color: theme('colors.white'),
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.primary.700'),
            transform: 'translateY(-1px)',
          },
        },
        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.primary.600'),
          border: `1px solid ${theme('colors.primary.300')}`,
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.primary.50'),
          },
        },
      });
    },
  ],
};
```

**2. CSS Performance Optimization Strategies:**
```css
/* Critical CSS extraction and optimization */
@layer critical {
  /* Above-the-fold styles */
  body {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #1a202c;
  }
  
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Optimized CSS with containment */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  contain: layout style;
}

.card {
  contain: layout style paint;
  will-change: transform;
  transform: translateZ(0); /* Force hardware acceleration */
}

/* Efficient animations */
@media (prefers-reduced-motion: no-preference) {
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: 
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .animate-on-scroll.in-view {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CSS-only loading states */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Optimized font loading */
@font-face {
  font-family: 'Inter var';
  src: url('/fonts/Inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}

/* Resource hints in CSS */
@supports (font-display: optional) {
  @font-face {
    font-family: 'Inter var';
    src: url('/fonts/Inter-var.woff2') format('woff2');
    font-display: optional;
  }
}
```

**3. Advanced CSS Architecture with PostCSS:**
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-custom-properties')({
      preserve: false,
      importFrom: 'src/styles/design-tokens.css'
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: ['advanced', {
        discardComments: { removeAll: true },
        reduceIdents: false,
        zindex: false,
      }]
    }),
    // Custom PostCSS plugin for design system validation
    function designSystemValidator() {
      return {
        postcssPlugin: 'design-system-validator',
        Declaration(decl) {
          // Validate spacing values
          if (decl.prop.includes('margin') || decl.prop.includes('padding')) {
            if (!decl.value.includes('var(--space-') && !decl.value.includes('0')) {
              console.warn(`Non-standard spacing value: ${decl.value} in ${decl.prop}`);
            }
          }
          
          // Validate color values
          if (decl.prop.includes('color') || decl.prop.includes('background')) {
            if (decl.value.includes('#') && !decl.value.includes('var(--color-')) {
              console.warn(`Hardcoded color value: ${decl.value} in ${decl.prop}`);
            }
          }
        }
      };
    }
  ]
};
```

**4. Performance Monitoring and Optimization:**
```typescript
// CSS performance monitoring
class CSSPerformanceMonitor {
  private observer: PerformanceObserver;
  
  constructor() {
    this.setupObserver();
    this.monitorCSSLoading();
  }
  
  private setupObserver() {
    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource' && entry.name.endsWith('.css')) {
          this.logCSSMetrics(entry as PerformanceResourceTiming);
        }
      }
    });
    
    this.observer.observe({ entryTypes: ['resource'] });
  }
  
  private logCSSMetrics(entry: PerformanceResourceTiming) {
    const metrics = {
      name: entry.name,
      loadTime: entry.loadEventEnd - entry.loadEventStart,
      downloadTime: entry.responseEnd - entry.responseStart,
      size: entry.transferSize,
      cached: entry.transferSize === 0
    };
    
    console.log('CSS Performance:', metrics);
    
    // Send to analytics
    this.sendToAnalytics('css_performance', metrics);
  }
  
  private monitorCSSLoading() {
    // Monitor critical CSS rendering
    const criticalCSS = document.querySelector('style[data-critical]');
    if (criticalCSS) {
      const startTime = performance.now();
      
      requestAnimationFrame(() => {
        const renderTime = performance.now() - startTime;
        console.log('Critical CSS render time:', renderTime);
      });
    }
  }
  
  // Monitor layout shifts caused by CSS
  monitorLayoutShifts() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as any;
        if (layoutShift.hadRecentInput) continue;
        
        console.log('Layout shift detected:', {
          value: layoutShift.value,
          sources: layoutShift.sources
        });
      }
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
  }
  
  private sendToAnalytics(event: string, data: any) {
    // Implementation for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event, data);
    }
  }
}

// Initialize performance monitoring
const cssMonitor = new CSSPerformanceMonitor();
cssMonitor.monitorLayoutShifts();
```

---

### Q29: How do you implement advanced CSS architecture patterns and design systems?
**Difficulty: Expert**

**Answer:**
Advanced CSS architecture involves sophisticated patterns for scalability, maintainability, and design system integration.

**1. Advanced CSS Architecture with ITCSS and BEM:**
```scss
// ITCSS (Inverted Triangle CSS) Architecture
// 1. Settings - Global variables and config
:root {
  // Design tokens
  --space-unit: 0.25rem;
  --space-xs: calc(var(--space-unit) * 1); // 4px
  --space-sm: calc(var(--space-unit) * 2); // 8px
  --space-md: calc(var(--space-unit) * 4); // 16px
  --space-lg: calc(var(--space-unit) * 6); // 24px
  --space-xl: calc(var(--space-unit) * 8); // 32px
  
  // Typography scale
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  
  // Color system with semantic naming
  --color-primary-50: 240 249 255;
  --color-primary-500: 59 130 246;
  --color-primary-900: 30 58 138;
  
  --color-semantic-success: 34 197 94;
  --color-semantic-warning: 251 191 36;
  --color-semantic-error: 239 68 68;
  --color-semantic-info: 59 130 246;
}

// 2. Tools - Mixins and functions
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'small' {
    @media (min-width: 640px) { @content; }
  }
  @if $breakpoint == 'medium' {
    @media (min-width: 768px) { @content; }
  }
  @if $breakpoint == 'large' {
    @media (min-width: 1024px) { @content; }
  }
}

@mixin visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

// 3. Generic - Reset and normalize
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

// 4. Elements - Bare HTML elements
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: hsl(var(--color-gray-900));
  background-color: hsl(var(--color-gray-50));
}

// 5. Objects - Design patterns (OOCSS)
.o-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
  
  &--fluid {
    max-width: none;
  }
  
  &--narrow {
    max-width: 800px;
  }
}

.o-grid {
  display: grid;
  gap: var(--space-md);
  
  &--auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  &--auto-fill {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

// 6. Components - UI components (BEM)
.c-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: var(--font-size-sm);
  font-weight: 500;
  line-height: 1.5;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: 2px solid hsl(var(--color-primary-500));
    outline-offset: 2px;
  }
  
  &--primary {
    color: white;
    background-color: hsl(var(--color-primary-500));
    border-color: hsl(var(--color-primary-500));
    
    &:hover {
      background-color: hsl(var(--color-primary-600));
      border-color: hsl(var(--color-primary-600));
    }
  }
  
  &--secondary {
    color: hsl(var(--color-primary-700));
    background-color: transparent;
    border-color: hsl(var(--color-primary-300));
    
    &:hover {
      background-color: hsl(var(--color-primary-50));
    }
  }
  
  &--size-sm {
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-xs);
  }
  
  &--size-lg {
    padding: var(--space-md) var(--space-lg);
    font-size: var(--font-size-lg);
  }
  
  &__icon {
    margin-right: var(--space-xs);
    
    &--only {
      margin: 0;
    }
  }
}

// 7. Utilities - Helper classes
.u-sr-only {
  @include visually-hidden;
}

.u-text-center { text-align: center; }
.u-text-left { text-align: left; }
.u-text-right { text-align: right; }

.u-mb-0 { margin-bottom: 0; }
.u-mb-xs { margin-bottom: var(--space-xs); }
.u-mb-sm { margin-bottom: var(--space-sm); }
.u-mb-md { margin-bottom: var(--space-md); }
.u-mb-lg { margin-bottom: var(--space-lg); }
.u-mb-xl { margin-bottom: var(--space-xl); }
```

**2. Design System Integration with CSS-in-JS:**
```typescript
// Design system tokens
export const tokens = {
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
};

// Styled component with design system
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: ${tokens.borderRadius.md};
  
  &:focus {
    outline: 2px solid ${tokens.colors.primary[500]};
    outline-offset: 2px;
  }
  
  ${({ size = 'md' }) => {
    const sizeMap = {
      sm: css`
        padding: ${tokens.space.xs} ${tokens.space.sm};
        font-size: ${tokens.typography.fontSize.xs};
      `,
      md: css`
        padding: ${tokens.space.sm} ${tokens.space.md};
        font-size: ${tokens.typography.fontSize.sm};
      `,
      lg: css`
        padding: ${tokens.space.md} ${tokens.space.lg};
        font-size: ${tokens.typography.fontSize.lg};
      `,
    };
    return sizeMap[size];
  }}
  
  ${({ variant = 'primary' }) => {
    const variantMap = {
      primary: css`
        color: white;
        background-color: ${tokens.colors.primary[500]};
        border-color: ${tokens.colors.primary[500]};
        
        &:hover {
          background-color: ${tokens.colors.primary[600]};
          border-color: ${tokens.colors.primary[600]};
        }
      `,
      secondary: css`
        color: ${tokens.colors.primary[700]};
        background-color: transparent;
        border-color: ${tokens.colors.primary[300]};
        
        &:hover {
          background-color: ${tokens.colors.primary[50]};
        }
      `,
      ghost: css`
        color: ${tokens.colors.primary[600]};
        background-color: transparent;
        border-color: transparent;
        
        &:hover {
          background-color: ${tokens.colors.primary[50]};
        }
      `,
    };
    return variantMap[variant];
  }}
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
`;
```

---

### Q30: How do you implement advanced CSS performance optimization and critical rendering path?
**Difficulty: Expert**

**Answer:**
Advanced CSS performance optimization involves sophisticated techniques for critical rendering path optimization, resource loading strategies, and runtime performance.

**1. Critical CSS Extraction and Inlining:**
```javascript
// Critical CSS extraction tool
const critical = require('critical');
const path = require('path');

class CriticalCSSExtractor {
  constructor(options = {}) {
    this.options = {
      base: 'dist/',
      width: 1300,
      height: 900,
      timeout: 30000,
      penthouse: {
        blockJSRequests: false,
      },
      ...options
    };
  }
  
  async extractCritical(pages) {
    const results = [];
    
    for (const page of pages) {
      try {
        const result = await critical.generate({
          ...this.options,
          src: page.url,
          dest: page.output,
          css: page.css,
          dimensions: [
            { width: 320, height: 568 },   // Mobile
            { width: 768, height: 1024 },  // Tablet
            { width: 1300, height: 900 }   // Desktop
          ],
          ignore: {
            atrule: ['@font-face'],
            rule: [/\.sr-only/],
            decl: (node, value) => {
              // Ignore print styles
              return /print/.test(value);
            }
          }
        });
        
        results.push({
          page: page.url,
          criticalCSS: result.css,
          size: Buffer.byteLength(result.css, 'utf8')
        });
        
      } catch (error) {
        console.error(`Failed to extract critical CSS for ${page.url}:`, error);
      }
    }
    
    return results;
  }
  
  // Generate critical CSS for different viewport sizes
  async generateResponsiveCritical(url, css) {
    const viewports = [
      { width: 320, height: 568, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1200, height: 800, name: 'desktop' }
    ];
    
    const criticalCSS = {};
    
    for (const viewport of viewports) {
      const result = await critical.generate({
        ...this.options,
        src: url,
        css: css,
        width: viewport.width,
        height: viewport.height
      });
      
      criticalCSS[viewport.name] = result.css;
    }
    
    return criticalCSS;
  }
}

// Usage
const extractor = new CriticalCSSExtractor();

const pages = [
  { url: 'index.html', css: ['styles/main.css'], output: 'critical/home.css' },
  { url: 'about.html', css: ['styles/main.css'], output: 'critical/about.css' }
];

extractor.extractCritical(pages).then(results => {
  console.log('Critical CSS extracted:', results);
});
```

**2. Advanced CSS Loading Strategies:**
```html
<!-- Critical CSS inlined in head -->
<style>
  /* Critical above-the-fold styles */
  body { font-family: system-ui; margin: 0; }
  .header { background: #fff; padding: 1rem; }
  .hero { min-height: 60vh; display: flex; align-items: center; }
</style>

<!-- Preload key resources -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/styles/main.css" as="style">
<link rel="preload" href="/images/hero.webp" as="image">

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/styles/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/non-critical.css"></noscript>

<!-- Progressive enhancement with CSS -->
<script>
  // Load CSS based on device capabilities
  function loadConditionalCSS() {
    const supportsGrid = CSS.supports('display', 'grid');
    const supportsCustomProps = CSS.supports('color', 'var(--test)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (supportsGrid) {
      loadCSS('/styles/grid-layout.css');
    } else {
      loadCSS('/styles/flexbox-fallback.css');
    }
    
    if (!prefersReducedMotion) {
      loadCSS('/styles/animations.css');
    }
    
    if (supportsCustomProps) {
      loadCSS('/styles/custom-properties.css');
    }
  }
  
  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
  
  // Load conditional CSS after critical rendering
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConditionalCSS);
  } else {
    loadConditionalCSS();
  }
</script>
```

---

### Q31: How do you implement advanced CSS Container Queries and modern layout techniques for responsive design?

**Answer:**
Container Queries represent a paradigm shift in responsive design, allowing components to respond to their container's size rather than the viewport. Combined with modern layout techniques, they enable truly modular and adaptive designs.

**Container Queries Implementation:**
```css
/* Container query setup */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Advanced container queries with multiple breakpoints */
@container card (min-width: 300px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
  
  .card__image {
    aspect-ratio: 16/9;
    object-fit: cover;
  }
  
  .card__content {
    padding: 1.5rem;
  }
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
  }
  
  .card__title {
    font-size: clamp(1.5rem, 4cqi, 2.5rem);
    line-height: 1.2;
  }
  
  .card__description {
    font-size: clamp(1rem, 2.5cqi, 1.25rem);
    line-height: 1.6;
  }
}

@container card (min-width: 700px) {
  .card {
    grid-template-areas: 
      "image title"
      "image meta"
      "image description"
      "image actions";
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto auto 1fr auto;
  }
  
  .card__image { grid-area: image; }
  .card__title { grid-area: title; }
  .card__meta { grid-area: meta; }
  .card__description { grid-area: description; }
  .card__actions { grid-area: actions; }
}

/* Advanced container query units */
.responsive-component {
  container-type: size;
  
  /* Container query units:
     cqw: 1% of container width
     cqh: 1% of container height
     cqi: 1% of container inline size
     cqb: 1% of container block size
     cqmin: smaller of cqi or cqb
     cqmax: larger of cqi or cqb */
}

@container (min-width: 400px) {
  .responsive-text {
    font-size: clamp(1rem, 5cqi, 3rem);
    padding: clamp(0.5rem, 3cqi, 2rem);
    margin-block: clamp(0.25rem, 2cqb, 1rem);
  }
}

/* Multi-dimensional container queries */
@container (min-width: 300px) and (min-height: 200px) {
  .complex-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: clamp(0.5rem, 2cqi, 2rem);
  }
}

/* Container queries with logical properties */
@container (min-inline-size: 400px) {
  .logical-layout {
    padding-inline: clamp(1rem, 5cqi, 3rem);
    padding-block: clamp(0.5rem, 3cqb, 2rem);
    margin-inline: auto;
  }
}
```

**Advanced Grid and Subgrid Techniques:**
```css
/* Advanced CSS Grid with subgrid */
.main-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 2rem;
  min-height: 100vh;
}

.content-area {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  gap: inherit;
}

.article-grid {
  grid-column: 2 / 12;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-areas:
    "title title title title"
    "meta meta meta meta"
    "content content sidebar sidebar";
}

/* Advanced grid functions */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      clamp(250px, 30vw, 400px),
      1fr
    )
  );
  gap: clamp(1rem, 3vw, 3rem);
}

/* Masonry-style layout with CSS Grid */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: masonry; /* Future CSS feature */
  gap: 1rem;
}

/* Fallback for masonry using CSS Grid */
.masonry-fallback {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 10px;
  gap: 1rem;
}

.masonry-item {
  grid-row-end: span var(--row-span, 10);
}

/* Dynamic grid with CSS custom properties */
.dynamic-grid {
  --min-column-width: 250px;
  --gap: 2rem;
  --columns: max(1, floor((100% + var(--gap)) / (var(--min-column-width) + var(--gap))));
  
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
}
```

**Advanced Flexbox Patterns:**
```css
/* Advanced flexbox with gap and logical properties */
.flex-container {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);
  padding-inline: clamp(1rem, 5vw, 3rem);
  padding-block: clamp(2rem, 5vh, 4rem);
}

/* Flexible sidebar layout */
.sidebar-layout {
  display: flex;
  gap: 2rem;
  align-items: stretch;
}

.sidebar {
  flex: 0 0 clamp(200px, 25vw, 300px);
  container-type: inline-size;
}

.main-content {
  flex: 1;
  min-width: 0; /* Prevent flex item overflow */
  container-type: inline-size;
}

/* Advanced flex item control */
.flex-item {
  flex: 1 1 auto;
  min-width: min-content;
  max-width: max-content;
}

.flex-item--grow {
  flex-grow: 2;
}

.flex-item--shrink {
  flex-shrink: 0;
}

/* Responsive flex direction with container queries */
.responsive-flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  container-type: inline-size;
}

@container (min-width: 600px) {
  .responsive-flex {
    flex-direction: row;
    align-items: center;
  }
}
```

**Modern Layout Utilities:**
```css
/* Intrinsic web design patterns */
.intrinsic-layout {
  --min-width: 300px;
  --max-width: 1200px;
  --gap: 2rem;
  
  display: grid;
  grid-template-columns: 
    repeat(
      auto-fit,
      minmax(
        min(var(--min-width), 100%),
        1fr
      )
    );
  gap: var(--gap);
  padding-inline: var(--gap);
  max-width: var(--max-width);
  margin-inline: auto;
}

/* Advanced aspect ratio control */
.aspect-ratio-container {
  aspect-ratio: 16/9;
  container-type: size;
  overflow: hidden;
}

@container (max-aspect-ratio: 1/1) {
  .aspect-ratio-content {
    object-fit: cover;
    object-position: center top;
  }
}

@container (min-aspect-ratio: 2/1) {
  .aspect-ratio-content {
    object-fit: contain;
  }
}

/* Advanced positioning with modern CSS */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgb(255 255 255 / 0.8);
  border-block-end: 1px solid rgb(0 0 0 / 0.1);
}

/* Advanced scroll-driven animations */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    to right,
    hsl(200 100% 50%),
    hsl(280 100% 50%)
  );
  transform-origin: left;
  animation: scroll-progress linear;
  animation-timeline: scroll();
}

@keyframes scroll-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

**Component-Based Responsive Design:**
```css
/* Self-contained responsive component */
.card-component {
  container-type: inline-size;
  container-name: card;
  
  /* Base styles */
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.card-component:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.15);
}

/* Small container styles */
@container card (max-width: 299px) {
  .card-component {
    text-align: center;
  }
  
  .card__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card__content {
    padding: 1rem;
  }
  
  .card__title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .card__actions {
    margin-top: 1rem;
  }
}

/* Medium container styles */
@container card (min-width: 300px) and (max-width: 499px) {
  .card-component {
    display: flex;
    align-items: stretch;
  }
  
  .card__image {
    width: 120px;
    height: auto;
    object-fit: cover;
    flex-shrink: 0;
  }
  
  .card__content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .card__actions {
    margin-top: auto;
  }
}

/* Large container styles */
@container card (min-width: 500px) {
  .card-component {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "image header"
      "image content"
      "image actions";
  }
  
  .card__image {
    grid-area: image;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card__header {
    grid-area: header;
    padding: 1.5rem 1.5rem 0;
  }
  
  .card__content {
    grid-area: content;
    padding: 0 1.5rem;
  }
  
  .card__actions {
    grid-area: actions;
    padding: 0 1.5rem 1.5rem;
  }
}
```

---

### Q32: How do you implement advanced CSS architecture with CSS Layers, Scope, and modern design systems?

**Answer:**
Modern CSS architecture leverages CSS Layers for cascade control, CSS Scope for component isolation, and systematic approaches to design tokens and component libraries for scalable, maintainable stylesheets.

**CSS Layers Implementation:**
```css
/* Define layer order at the top of your stylesheet */
@layer reset, base, tokens, components, utilities, overrides;

/* Reset layer - lowest priority */
@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
  }
  
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
}

/* Base layer - fundamental styles */
@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 2rem;
  }
  
  body {
    line-height: 1.6;
    color: var(--color-text-primary);
    background-color: var(--color-background);
  }
  
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-heading);
  }
  
  a {
    color: var(--color-link);
    text-decoration: none;
  }
  
  a:hover {
    color: var(--color-link-hover);
    text-decoration: underline;
  }
}

/* Design tokens layer */
@layer tokens {
  :root {
    /* Color system */
    --color-primary-50: hsl(210 100% 98%);
    --color-primary-100: hsl(210 100% 95%);
    --color-primary-200: hsl(210 100% 90%);
    --color-primary-300: hsl(210 100% 80%);
    --color-primary-400: hsl(210 100% 70%);
    --color-primary-500: hsl(210 100% 60%);
    --color-primary-600: hsl(210 100% 50%);
    --color-primary-700: hsl(210 100% 40%);
    --color-primary-800: hsl(210 100% 30%);
    --color-primary-900: hsl(210 100% 20%);
    --color-primary-950: hsl(210 100% 10%);
    
    /* Semantic color tokens */
    --color-background: var(--color-primary-50);
    --color-surface: white;
    --color-text-primary: var(--color-primary-900);
    --color-text-secondary: var(--color-primary-700);
    --color-text-heading: var(--color-primary-950);
    --color-link: var(--color-primary-600);
    --color-link-hover: var(--color-primary-700);
    --color-border: var(--color-primary-200);
    
    /* Typography system */
    --font-family-sans: 'Inter', system-ui, sans-serif;
    --font-family-serif: 'Crimson Pro', Georgia, serif;
    --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
    
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    
    --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
    --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
    --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
    --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
    --font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
    --font-size-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
    --font-size-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem);
    --font-size-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
    
    /* Spacing system */
    --space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem);
    --space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
    --space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
    --space-lg: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
    --space-xl: clamp(2rem, 1.6rem + 2vw, 3rem);
    --space-2xl: clamp(3rem, 2.4rem + 3vw, 4.5rem);
    --space-3xl: clamp(4rem, 3.2rem + 4vw, 6rem);
    
    /* Border radius system */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;
    
    /* Shadow system */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    
    /* Animation tokens */
    --duration-fast: 150ms;
    --duration-normal: 250ms;
    --duration-slow: 350ms;
    --easing-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
    --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
    --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  /* Dark mode tokens */
  @media (prefers-color-scheme: dark) {
    :root {
      --color-background: var(--color-primary-950);
      --color-surface: var(--color-primary-900);
      --color-text-primary: var(--color-primary-100);
      --color-text-secondary: var(--color-primary-300);
      --color-text-heading: var(--color-primary-50);
      --color-link: var(--color-primary-400);
      --color-link-hover: var(--color-primary-300);
      --color-border: var(--color-primary-800);
    }
  }
}

/* Components layer */
@layer components {
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    line-height: 1;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--duration-fast) var(--easing-ease);
    text-decoration: none;
    
    &:focus-visible {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .button--primary {
    background-color: var(--color-primary-600);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-700);
    }
    
    &:active {
      background-color: var(--color-primary-800);
    }
  }
  
  .button--secondary {
    background-color: transparent;
    color: var(--color-primary-600);
    border-color: var(--color-primary-600);
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-50);
    }
    
    &:active {
      background-color: var(--color-primary-100);
    }
  }
  
  .card {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    transition: box-shadow var(--duration-normal) var(--easing-ease);
    container-type: inline-size;
    
    &:hover {
      box-shadow: var(--shadow-md);
    }
  }
  
  .card__header {
    padding: var(--space-lg);
    border-bottom: 1px solid var(--color-border);
  }
  
  .card__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-xs);
  }
  
  .card__content {
    padding: var(--space-lg);
  }
  
  .card__footer {
    padding: var(--space-lg);
    border-top: 1px solid var(--color-border);
    background-color: var(--color-primary-25);
  }
}

/* Utilities layer - highest priority */
@layer utilities {
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
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: var(--space-md);
  }
  
  .flow > * + * {
    margin-top: var(--flow-space, var(--space-md));
  }
  
  .cluster {
    display: flex;
    flex-wrap: wrap;
    gap: var(--cluster-space, var(--space-md));
    align-items: var(--cluster-align, center);
    justify-content: var(--cluster-justify, flex-start);
  }
  
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-space, var(--space-md));
  }
  
  .grid {
    display: grid;
    gap: var(--grid-gap, var(--space-md));
    grid-template-columns: repeat(
      var(--grid-columns, auto-fit),
      minmax(
        var(--grid-min-width, 250px),
        1fr
      )
    );
  }
}

/* Overrides layer - for exceptions and third-party overrides */
@layer overrides {
  .force-dark {
    color-scheme: dark;
    --color-background: var(--color-primary-950) !important;
    --color-surface: var(--color-primary-900) !important;
    --color-text-primary: var(--color-primary-100) !important;
  }
  
  .force-light {
    color-scheme: light;
    --color-background: var(--color-primary-50) !important;
    --color-surface: white !important;
    --color-text-primary: var(--color-primary-900) !important;
  }
}
```

**CSS Scope Implementation:**
```css
/* CSS Scope for component isolation */
@scope (.modal) {
  /* Styles only apply within .modal */
  .header {
    background: var(--color-primary-600);
    color: white;
    padding: var(--space-md);
  }
  
  .content {
    padding: var(--space-lg);
    max-height: 60vh;
    overflow-y: auto;
  }
  
  .footer {
    padding: var(--space-md);
    border-top: 1px solid var(--color-border);
    display: flex;
    gap: var(--space-sm);
    justify-content: flex-end;
  }
}

/* Scope with exclusions */
@scope (.card) to (.nested-card) {
  /* Styles apply to .card but not to .nested-card */
  .title {
    font-size: var(--font-size-xl);
    color: var(--color-text-heading);
  }
  
  .content {
    color: var(--color-text-secondary);
  }
}

/* Advanced scope patterns */
@scope (.theme-provider) {
  /* Component-specific design tokens */
  :scope {
    --component-bg: var(--color-surface);
    --component-border: var(--color-border);
    --component-text: var(--color-text-primary);
  }
  
  .component {
    background: var(--component-bg);
    border: 1px solid var(--component-border);
    color: var(--component-text);
  }
}

/* Scope for state management */
@scope (.form) {
  .field {
    margin-bottom: var(--space-md);
  }
  
  .input {
    width: 100%;
    padding: var(--space-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    
    &:focus {
      outline: 2px solid var(--color-primary-500);
      outline-offset: -1px;
    }
    
    &:invalid {
      border-color: var(--color-error);
    }
  }
  
  .error-message {
    color: var(--color-error);
    font-size: var(--font-size-sm);
    margin-top: var(--space-xs);
  }
}
```

**Advanced Design System Architecture:**
```css
/* Design system foundation */
@import url('tokens/colors.css') layer(tokens);
@import url('tokens/typography.css') layer(tokens);
@import url('tokens/spacing.css') layer(tokens);
@import url('tokens/shadows.css') layer(tokens);

@import url('base/reset.css') layer(reset);
@import url('base/typography.css') layer(base);
@import url('base/forms.css') layer(base);

@import url('components/button.css') layer(components);
@import url('components/card.css') layer(components);
@import url('components/modal.css') layer(components);
@import url('components/navigation.css') layer(components);

@import url('utilities/layout.css') layer(utilities);
@import url('utilities/spacing.css') layer(utilities);
@import url('utilities/typography.css') layer(utilities);

/* Component composition patterns */
.design-system {
  /* Logical property system */
  --inline-start: left;
  --inline-end: right;
  --block-start: top;
  --block-end: bottom;
  
  /* Responsive design tokens */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* Container query breakpoints */
  --container-xs: 320px;
  --container-sm: 480px;
  --container-md: 640px;
  --container-lg: 800px;
  --container-xl: 1024px;
}

/* Advanced component patterns */
.composite-component {
  container-type: inline-size;
  
  /* Base component styles */
  display: grid;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

@container (min-width: 400px) {
  .composite-component {
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }
}

@container (min-width: 600px) {
  .composite-component {
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas:
      "sidebar content actions";
  }
  
  .composite-component__sidebar {
    grid-area: sidebar;
  }
  
  .composite-component__content {
    grid-area: content;
  }
  
  .composite-component__actions {
    grid-area: actions;
  }
}

/* Theme system with CSS custom properties */
.theme-system {
  /* Light theme (default) */
  --theme-bg-primary: hsl(0 0% 100%);
  --theme-bg-secondary: hsl(0 0% 98%);
  --theme-text-primary: hsl(0 0% 9%);
  --theme-text-secondary: hsl(0 0% 45%);
  --theme-border: hsl(0 0% 89%);
  
  /* Component-specific tokens */
  --button-bg: var(--theme-bg-primary);
  --button-text: var(--theme-text-primary);
  --button-border: var(--theme-border);
  
  --card-bg: var(--theme-bg-primary);
  --card-border: var(--theme-border);
  --card-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
}

[data-theme="dark"] .theme-system {
  /* Dark theme overrides */
  --theme-bg-primary: hsl(0 0% 9%);
  --theme-bg-secondary: hsl(0 0% 11%);
  --theme-text-primary: hsl(0 0% 98%);
  --theme-text-secondary: hsl(0 0% 65%);
  --theme-border: hsl(0 0% 20%);
  
  --card-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
}

/* High contrast theme */
@media (prefers-contrast: high) {
  .theme-system {
    --theme-border: hsl(0 0% 0%);
    --button-border: hsl(0 0% 0%);
    --card-border: hsl(0 0% 0%);
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .theme-system {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This comprehensive CSS guide now covers the complete spectrum of modern CSS development, from basic concepts to cutting-edge features like CSS Houdini, advanced selectors, framework integration, performance optimization strategies, advanced architecture patterns with CSS Layers and Scope, container queries, modern layout techniques, design systems, and critical rendering path optimization essential for building scalable, maintainable, and performant web applications.