# CSS Interview Questions

## Table of Contents
1. [CSS Fundamentals](#css-fundamentals)
2. [Selectors and Specificity](#selectors-and-specificity)
3. [Box Model and Layout](#box-model-and-layout)
4. [Flexbox and Grid](#flexbox-and-grid)
5. [Responsive Design](#responsive-design)
6. [CSS Animations and Transitions](#css-animations-and-transitions)
7. [CSS Preprocessors](#css-preprocessors)
8. [CSS Architecture and Methodologies](#css-architecture-and-methodologies)
9. [Performance Optimization](#performance-optimization)
10. [Modern CSS Features](#modern-css-features)

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

This comprehensive CSS guide covers fundamental concepts through advanced modern features, providing practical examples for interview preparation and real-world development.