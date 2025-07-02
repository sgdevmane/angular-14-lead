# Tailwind CSS & Bootstrap Interview Questions

A comprehensive collection of interview questions covering Tailwind CSS, Bootstrap, and their comparison for modern web development.

## Table of Contents

1. [What is Tailwind CSS and how does it differ from traditional CSS frameworks?](#1-what-is-tailwind-css-and-how-does-it-differ-from-traditional-css-frameworks)
2. [How do you implement responsive design with Tailwind CSS?](#2-how-do-you-implement-responsive-design-with-tailwind-css)
3. [How do you create custom components and reusable styles in Tailwind?](#3-how-do-you-create-custom-components-and-reusable-styles-in-tailwind)
4. [What is Bootstrap and what are its key features?](#4-what-is-bootstrap-and-what-are-its-key-features)
5. [How do you create responsive layouts with Bootstrap's grid system?](#5-how-do-you-create-responsive-layouts-with-bootstraps-grid-system)
6. [How do you customize Bootstrap components and themes?](#6-how-do-you-customize-bootstrap-components-and-themes)
7. [When should you choose Tailwind CSS over Bootstrap and vice versa?](#7-when-should-you-choose-tailwind-css-over-bootstrap-and-vice-versa)
8. [How do you migrate from Bootstrap to Tailwind CSS?](#8-how-do-you-migrate-from-bootstrap-to-tailwind-css)
9. [How do you optimize performance in Tailwind CSS and Bootstrap?](#9-how-do-you-optimize-performance-in-tailwind-css-and-bootstrap)

---

## Tailwind CSS Fundamentals

### 1. What is Tailwind CSS and how does it differ from traditional CSS frameworks?

**Answer:**
Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup, rather than providing pre-designed components.

**Key Differences:**
- **Utility-first approach**: Instead of semantic class names, uses utility classes
- **No pre-designed components**: Provides building blocks rather than finished components
- **Highly customizable**: Easy to customize through configuration
- **Smaller bundle sizes**: Only includes used utilities in production
- **Design consistency**: Enforces design system through predefined values

```html
<!-- Traditional CSS approach -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">User Profile</h3>
  </div>
  <div class="card-body">
    <p class="card-text">User information goes here</p>
    <button class="btn btn-primary">Edit Profile</button>
  </div>
</div>

<!-- Tailwind CSS approach -->
<div class="bg-white rounded-lg shadow-md overflow-hidden">
  <div class="px-6 py-4 bg-gray-50 border-b">
    <h3 class="text-lg font-semibold text-gray-900">User Profile</h3>
  </div>
  <div class="px-6 py-4">
    <p class="text-gray-600 mb-4">User information goes here</p>
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
      Edit Profile
    </button>
  </div>
</div>
```

**Tailwind Configuration:**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        },
        secondary: {
          500: '#6b7280',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}

// Custom animations
// In your CSS file
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 2. How do you implement responsive design with Tailwind CSS?

**Answer:**
Tailwind uses a mobile-first responsive design approach with breakpoint prefixes.

```html
<!-- Responsive Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold mb-2">Card 1</h3>
    <p class="text-gray-600">Content goes here</p>
  </div>
  <!-- More cards... -->
</div>

<!-- Responsive Typography -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
  Responsive Heading
</h1>

<!-- Responsive Spacing -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  <div class="space-y-4 sm:space-y-6 md:space-y-8">
    <!-- Content with responsive spacing -->
  </div>
</div>

<!-- Responsive Flexbox -->
<div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
  <div class="w-full sm:w-auto">
    <h2 class="text-xl font-semibold">Title</h2>
    <p class="text-gray-600">Description</p>
  </div>
  <button class="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded">
    Action
  </button>
</div>

<!-- Complex Responsive Layout -->
<div class="min-h-screen bg-gray-100">
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <img class="h-8 w-8" src="logo.svg" alt="Logo">
          <span class="ml-2 text-xl font-semibold">Brand</span>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" class="text-gray-700 hover:text-blue-600">About</a>
          <a href="#" class="text-gray-700 hover:text-blue-600">Services</a>
          <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2">
          <svg class="h-6 w-6" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Content Area -->
      <div class="lg:col-span-2">
        <article class="bg-white rounded-lg shadow p-6">
          <h1 class="text-3xl font-bold mb-4">Article Title</h1>
          <p class="text-gray-600 mb-6">Article content...</p>
        </article>
      </div>
      
      <!-- Sidebar -->
      <aside class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Sidebar</h2>
          <p class="text-gray-600">Sidebar content...</p>
        </div>
      </aside>
    </div>
  </main>
</div>
```

**Custom Breakpoints:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px'
    }
  }
}
```

### 3. How do you create custom components and reusable styles in Tailwind?

**Answer:**
Tailwind provides several approaches for creating reusable components and custom styles.

**1. Using @apply Directive:**

```css
/* styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn {
    @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
  }
  
  .btn-secondary {
    @apply bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500;
  }
  
  .btn-outline {
    @apply bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md overflow-hidden;
  }
  
  .card-header {
    @apply px-6 py-4 bg-gray-50 border-b border-gray-200;
  }
  
  .card-body {
    @apply px-6 py-4;
  }
  
  .form-input {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500;
  }
  
  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }
}

@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .backdrop-blur-xs {
    backdrop-filter: blur(2px);
  }
}
```

**2. React Component Patterns:**

```jsx
// Button.jsx
import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary'
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { Button, buttonVariants }

// Usage
<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="outline" size="sm">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

**3. Card Component System:**

```jsx
// Card.jsx
const Card = ({ children, className, ...props }) => (
  <div className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4 bg-gray-50 border-b border-gray-200', className)} {...props}>
    {children}
  </div>
)

const CardBody = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4', className)} {...props}>
    {children}
  </div>
)

const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4 bg-gray-50 border-t border-gray-200', className)} {...props}>
    {children}
  </div>
)

// Usage
<Card>
  <CardHeader>
    <h3 className="text-lg font-semibold">Card Title</h3>
  </CardHeader>
  <CardBody>
    <p className="text-gray-600">Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**4. Form Components:**

```jsx
// Form.jsx
const FormField = ({ label, error, children, required, ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    {children}
    {error && (
      <p className="text-sm text-red-600">{error}</p>
    )}
  </div>
)

const Input = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <input
      className={cn(
        'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
        error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

const Select = React.forwardRef(({ className, children, error, ...props }, ref) => {
  return (
    <select
      className={cn(
        'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
        error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})

// Usage
<form className="space-y-6">
  <FormField label="Email" required>
    <Input type="email" placeholder="Enter your email" />
  </FormField>
  
  <FormField label="Country">
    <Select>
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
    </Select>
  </FormField>
  
  <Button type="submit" className="w-full">
    Submit
  </Button>
</form>
```

---

## Bootstrap Fundamentals

### 4. What is Bootstrap and what are its key features?

**Answer:**
Bootstrap is a popular CSS framework that provides pre-designed components, responsive grid system, and utility classes for rapid web development.

**Key Features:**
- **Responsive Grid System**: 12-column flexible grid
- **Pre-built Components**: Buttons, forms, navigation, modals, etc.
- **Utility Classes**: Spacing, typography, colors
- **JavaScript Components**: Interactive elements
- **Customizable**: Sass variables and mixins
- **Browser Compatibility**: Works across modern browsers

```html
<!-- Bootstrap Grid System -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Card Title</h5>
        </div>
        <div class="card-body">
          <p class="card-text">Some quick example text to build on the card title.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Another card -->
    </div>
    <div class="col-12 col-md-12 col-lg-4">
      <!-- Third card -->
    </div>
  </div>
</div>

<!-- Bootstrap Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">Brand</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
            Services
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Web Design</a></li>
            <li><a class="dropdown-item" href="#">Development</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Consulting</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Bootstrap Form -->
<form class="needs-validation" novalidate>
  <div class="row g-3">
    <div class="col-md-6">
      <label for="firstName" class="form-label">First name</label>
      <input type="text" class="form-control" id="firstName" required>
      <div class="invalid-feedback">
        Please provide a valid first name.
      </div>
    </div>
    <div class="col-md-6">
      <label for="lastName" class="form-label">Last name</label>
      <input type="text" class="form-control" id="lastName" required>
      <div class="invalid-feedback">
        Please provide a valid last name.
      </div>
    </div>
    <div class="col-12">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" required>
      <div class="invalid-feedback">
        Please provide a valid email.
      </div>
    </div>
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="terms" required>
        <label class="form-check-label" for="terms">
          Agree to terms and conditions
        </label>
        <div class="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Submit form</button>
    </div>
  </div>
</form>
```

**Bootstrap Customization with Sass:**

```scss
// custom.scss

// 1. Include functions first (so you can manipulate colors, SVGs, calc, etc)
@import "../node_modules/bootstrap/scss/functions";

// 2. Include any default variable overrides here
$primary: #007bff;
$secondary: #6c757d;
$success: #28a745;
$info: #17a2b8;
$warning: #ffc107;
$danger: #dc3545;
$light: #f8f9fa;
$dark: #343a40;

// Custom colors
$custom-colors: (
  "brand": #5e72e4,
  "accent": #f5365c
);

// Merge with Bootstrap's default colors
$theme-colors: map-merge($theme-colors, $custom-colors);

// Typography
$font-family-sans-serif: 'Inter', system-ui, -apple-system, sans-serif;
$font-size-base: 1rem;
$line-height-base: 1.6;

// Spacing
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
  6: $spacer * 4,
  7: $spacer * 5
);

// Grid breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

// 3. Include remainder of required Bootstrap stylesheets
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/root";

// 4. Include any optional Bootstrap CSS as needed
@import "../node_modules/bootstrap/scss/utilities";
@import "../node_modules/bootstrap/scss/reboot";
@import "../node_modules/bootstrap/scss/type";
@import "../node_modules/bootstrap/scss/images";
@import "../node_modules/bootstrap/scss/containers";
@import "../node_modules/bootstrap/scss/grid";
@import "../node_modules/bootstrap/scss/helpers";
@import "../node_modules/bootstrap/scss/utilities/api";

// 5. Add additional custom code here
.custom-component {
  background: linear-gradient(135deg, $primary, $secondary);
  border-radius: 0.5rem;
  padding: 2rem;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba($primary, 0.3);
  }
}

// Custom utilities
.text-brand {
  color: map-get($custom-colors, "brand") !important;
}

.bg-brand {
  background-color: map-get($custom-colors, "brand") !important;
}
```

### 5. How do you create responsive layouts with Bootstrap's grid system?

**Answer:**
Bootstrap's grid system uses a 12-column layout with containers, rows, and columns that automatically adjust based on screen size.

```html
<!-- Basic Grid Structure -->
<div class="container">
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <!-- Content adapts: 
           - 12 columns (full width) on extra small screens
           - 6 columns (half width) on small screens and up
           - 4 columns (third width) on medium screens and up
           - 3 columns (quarter width) on large screens and up
      -->
    </div>
  </div>
</div>

<!-- Complex Responsive Layout -->
<div class="container-fluid">
  <!-- Header -->
  <div class="row">
    <div class="col-12">
      <header class="bg-primary text-white p-3">
        <h1>Website Header</h1>
      </header>
    </div>
  </div>
  
  <!-- Main Content Area -->
  <div class="row">
    <!-- Sidebar - Hidden on mobile, visible on tablet+ -->
    <div class="col-md-3 col-lg-2 d-none d-md-block">
      <nav class="bg-light p-3 min-vh-100">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" href="#">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Users</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Settings</a>
          </li>
        </ul>
      </nav>
    </div>
    
    <!-- Main Content -->
    <div class="col-12 col-md-9 col-lg-10">
      <main class="p-3">
        <!-- Content Cards -->
        <div class="row g-4">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Card 1</h5>
                <p class="card-text">Some content here</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Card 2</h5>
                <p class="card-text">Some content here</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Card 3</h5>
                <p class="card-text">Some content here</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Data Table -->
        <div class="row mt-4">
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead class="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th class="d-none d-md-table-cell">Email</th>
                    <th class="d-none d-lg-table-cell">Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td class="d-none d-md-table-cell">john@example.com</td>
                    <td class="d-none d-lg-table-cell">Engineering</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Edit</button>
                      <button class="btn btn-sm btn-danger d-none d-sm-inline-block">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>

<!-- Advanced Grid Features -->
<div class="container">
  <!-- Offset Columns -->
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <!-- Centered column -->
    </div>
  </div>
  
  <!-- Nested Grids -->
  <div class="row">
    <div class="col-12 col-lg-8">
      <div class="row">
        <div class="col-6">
          <!-- Nested column 1 -->
        </div>
        <div class="col-6">
          <!-- Nested column 2 -->
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-4">
      <!-- Sidebar -->
    </div>
  </div>
  
  <!-- Auto-width Columns -->
  <div class="row">
    <div class="col">
      <!-- Auto-width column 1 -->
    </div>
    <div class="col">
      <!-- Auto-width column 2 -->
    </div>
    <div class="col">
      <!-- Auto-width column 3 -->
    </div>
  </div>
  
  <!-- Variable Width Content -->
  <div class="row justify-content-md-center">
    <div class="col col-lg-2">
      <!-- Auto-width -->
    </div>
    <div class="col-md-auto">
      <!-- Variable width content -->
    </div>
    <div class="col col-lg-2">
      <!-- Auto-width -->
    </div>
  </div>
</div>
```

**Bootstrap Flexbox Utilities:**

```html
<!-- Flexbox Layout Examples -->
<div class="d-flex justify-content-between align-items-center p-3 bg-light">
  <div>Left content</div>
  <div>Center content</div>
  <div>Right content</div>
</div>

<!-- Responsive Flexbox -->
<div class="d-flex flex-column flex-md-row">
  <div class="flex-fill p-3 bg-primary text-white">
    Flexible content 1
  </div>
  <div class="flex-fill p-3 bg-secondary text-white">
    Flexible content 2
  </div>
</div>

<!-- Flex Order -->
<div class="d-flex flex-column flex-md-row">
  <div class="order-2 order-md-1 p-3 bg-info">
    First on desktop, second on mobile
  </div>
  <div class="order-1 order-md-2 p-3 bg-warning">
    Second on desktop, first on mobile
  </div>
</div>
```

### 6. How do you customize Bootstrap components and themes?

**Answer:**
Bootstrap can be customized through Sass variables, custom CSS, and by creating custom component variants.

**1. Sass Variable Customization:**

```scss
// _variables.scss

// Color system
$white:    #fff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;
$black:    #000;

// Theme colors
$primary:   #007bff;
$secondary: #6c757d;
$success:   #28a745;
$info:      #17a2b8;
$warning:   #ffc107;
$danger:    #dc3545;
$light:     $gray-100;
$dark:      $gray-800;

// Custom theme colors
$theme-colors: (
  "primary":   $primary,
  "secondary": $secondary,
  "success":   $success,
  "info":      $info,
  "warning":   $warning,
  "danger":    $danger,
  "light":     $light,
  "dark":      $dark,
  "brand":     #5e72e4,
  "accent":    #f5365c
);

// Typography
$font-family-sans-serif: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-family-monospace:  'Fira Code', SFMono-Regular, Menlo, Monaco, Consolas, monospace;

$font-size-base: 1rem;
$font-size-lg:   $font-size-base * 1.25;
$font-size-sm:   $font-size-base * 0.875;

$font-weight-lighter: lighter;
$font-weight-light:   300;
$font-weight-normal:  400;
$font-weight-bold:    700;
$font-weight-bolder:  bolder;

$line-height-base: 1.6;
$line-height-sm:   1.25;
$line-height-lg:   2;

// Spacing
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
  6: $spacer * 4,
  7: $spacer * 5,
  8: $spacer * 6
);

// Border radius
$border-radius:    0.375rem;
$border-radius-sm: 0.25rem;
$border-radius-lg: 0.5rem;
$border-radius-xl: 1rem;

// Shadows
$box-shadow-sm:    0 0.125rem 0.25rem rgba($black, 0.075);
$box-shadow:       0 0.5rem 1rem rgba($black, 0.15);
$box-shadow-lg:    0 1rem 3rem rgba($black, 0.175);

// Component specific variables
$btn-padding-y:         0.5rem;
$btn-padding-x:         1rem;
$btn-font-family:       null;
$btn-font-size:         $font-size-base;
$btn-line-height:       $line-height-base;
$btn-white-space:       null;
$btn-padding-y-sm:      0.25rem;
$btn-padding-x-sm:      0.5rem;
$btn-font-size-sm:      $font-size-sm;
$btn-padding-y-lg:      0.75rem;
$btn-padding-x-lg:      1.5rem;
$btn-font-size-lg:      $font-size-lg;
$btn-border-width:      1px;
$btn-font-weight:       $font-weight-normal;
$btn-box-shadow:        inset 0 1px 0 rgba($white, 0.15), 0 1px 1px rgba($black, 0.075);
$btn-focus-width:       0.2rem;
$btn-focus-box-shadow:  0 0 0 $btn-focus-width rgba(mix(color-contrast($primary), $primary, 15%), 0.5);
$btn-disabled-opacity:  0.65;
$btn-active-box-shadow: inset 0 3px 5px rgba($black, 0.125);

$btn-link-color:              $link-color;
$btn-link-hover-color:        $link-hover-color;
$btn-link-disabled-color:     $gray-600;

// Card
$card-spacer-y:                     1rem;
$card-spacer-x:                     1rem;
$card-title-spacer-y:               0.5rem;
$card-border-width:                 1px;
$card-border-color:                 rgba($black, 0.125);
$card-border-radius:                $border-radius;
$card-box-shadow:                   null;
$card-inner-border-radius:          subtract($card-border-radius, $card-border-width);
$card-cap-padding-y:                $card-spacer-y * 0.5;
$card-cap-padding-x:                $card-spacer-x;
$card-cap-bg:                       rgba($black, 0.03);
$card-cap-color:                    null;
$card-height:                       null;
$card-color:                        null;
$card-bg:                           $white;
$card-img-overlay-padding:          1.25rem;
$card-group-margin:                 $grid-gutter-width * 0.5;
```

**2. Custom Component Creation:**

```scss
// custom-components.scss

// Custom Button Variants
.btn-gradient {
  background: linear-gradient(135deg, $primary, $info);
  border: none;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, darken($primary, 10%), darken($info, 10%));
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba($primary, 0.3);
    color: white;
  }
  
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba($primary, 0.5);
  }
}

.btn-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
}

// Custom Card Variants
.card-hover {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba($black, 0.1);
  }
}

.card-gradient {
  background: linear-gradient(135deg, $primary, $secondary);
  color: white;
  border: none;
  
  .card-header {
    background: rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
}

// Custom Form Styles
.form-floating-custom {
  position: relative;
  
  .form-control {
    height: calc(3.5rem + 2px);
    padding: 1rem 0.75rem;
    
    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      opacity: 0.65;
      transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
    }
  }
  
  label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 1rem 0.75rem;
    pointer-events: none;
    border: 1px solid transparent;
    transform-origin: 0 0;
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }
}

// Custom Navigation
.navbar-glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  .navbar-brand {
    font-weight: 700;
    font-size: 1.5rem;
  }
  
  .nav-link {
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: $primary;
    }
  }
}

// Custom Utilities
.text-gradient {
  background: linear-gradient(135deg, $primary, $info);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shadow-colored {
  box-shadow: 0 10px 25px rgba($primary, 0.3);
}

.border-gradient {
  border: 2px solid;
  border-image: linear-gradient(135deg, $primary, $info) 1;
}
```

**3. JavaScript Component Customization:**

```javascript
// custom-bootstrap.js

// Custom Modal with Animation
class CustomModal {
  constructor(element, options = {}) {
    this.element = element
    this.options = {
      backdrop: true,
      keyboard: true,
      focus: true,
      animation: 'fadeIn',
      ...options
    }
    this.init()
  }
  
  init() {
    this.element.addEventListener('show.bs.modal', (e) => {
      this.element.classList.add(`animate-${this.options.animation}`)
    })
    
    this.element.addEventListener('hide.bs.modal', (e) => {
      this.element.classList.add('animate-fadeOut')
    })
  }
  
  show() {
    const modal = new bootstrap.Modal(this.element, this.options)
    modal.show()
  }
  
  hide() {
    const modal = bootstrap.Modal.getInstance(this.element)
    modal.hide()
  }
}

// Custom Toast Notifications
class ToastManager {
  constructor() {
    this.container = this.createContainer()
    document.body.appendChild(this.container)
  }
  
  createContainer() {
    const container = document.createElement('div')
    container.className = 'toast-container position-fixed top-0 end-0 p-3'
    container.style.zIndex = '1055'
    return container
  }
  
  show(message, type = 'info', options = {}) {
    const toast = this.createToast(message, type, options)
    this.container.appendChild(toast)
    
    const bsToast = new bootstrap.Toast(toast, {
      autohide: options.autohide !== false,
      delay: options.delay || 5000
    })
    
    bsToast.show()
    
    toast.addEventListener('hidden.bs.toast', () => {
      toast.remove()
    })
    
    return bsToast
  }
  
  createToast(message, type, options) {
    const toast = document.createElement('div')
    toast.className = `toast align-items-center text-white bg-${type} border-0`
    toast.setAttribute('role', 'alert')
    
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `
    
    return toast
  }
}

// Usage
const toastManager = new ToastManager()

// Show different types of toasts
toastManager.show('Success! Your changes have been saved.', 'success')
toastManager.show('Warning: Please check your input.', 'warning')
toastManager.show('Error: Something went wrong.', 'danger')
toastManager.show('Info: New features are available.', 'info')

// Custom Carousel with Advanced Features
class AdvancedCarousel {
  constructor(element, options = {}) {
    this.element = element
    this.options = {
      interval: 5000,
      pause: 'hover',
      wrap: true,
      keyboard: true,
      touch: true,
      indicators: true,
      controls: true,
      autoplay: true,
      ...options
    }
    
    this.init()
  }
  
  init() {
    if (this.options.indicators) {
      this.createIndicators()
    }
    
    if (this.options.controls) {
      this.createControls()
    }
    
    if (this.options.touch) {
      this.addTouchSupport()
    }
    
    this.carousel = new bootstrap.Carousel(this.element, this.options)
    
    if (this.options.autoplay) {
      this.startAutoplay()
    }
  }
  
  createIndicators() {
    const slides = this.element.querySelectorAll('.carousel-item')
    const indicatorsContainer = document.createElement('div')
    indicatorsContainer.className = 'carousel-indicators'
    
    slides.forEach((slide, index) => {
      const indicator = document.createElement('button')
      indicator.type = 'button'
      indicator.setAttribute('data-bs-target', `#${this.element.id}`)
      indicator.setAttribute('data-bs-slide-to', index)
      if (index === 0) indicator.className = 'active'
      indicatorsContainer.appendChild(indicator)
    })
    
    this.element.appendChild(indicatorsContainer)
  }
  
  createControls() {
    const prevControl = document.createElement('button')
    prevControl.className = 'carousel-control-prev'
    prevControl.type = 'button'
    prevControl.setAttribute('data-bs-target', `#${this.element.id}`)
    prevControl.setAttribute('data-bs-slide', 'prev')
    prevControl.innerHTML = `
      <span class="carousel-control-prev-icon"></span>
      <span class="visually-hidden">Previous</span>
    `
    
    const nextControl = document.createElement('button')
    nextControl.className = 'carousel-control-next'
    nextControl.type = 'button'
    nextControl.setAttribute('data-bs-target', `#${this.element.id}`)
    nextControl.setAttribute('data-bs-slide', 'next')
    nextControl.innerHTML = `
      <span class="carousel-control-next-icon"></span>
      <span class="visually-hidden">Next</span>
    `
    
    this.element.appendChild(prevControl)
    this.element.appendChild(nextControl)
  }
  
  addTouchSupport() {
    let startX = 0
    let endX = 0
    
    this.element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX
    })
    
    this.element.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX
      this.handleSwipe()
    })
  }
  
  handleSwipe() {
    const threshold = 50
    const diff = startX - endX
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.carousel.next()
      } else {
        this.carousel.prev()
      }
    }
  }
  
  startAutoplay() {
    this.element.addEventListener('mouseenter', () => {
      this.carousel.pause()
    })
    
    this.element.addEventListener('mouseleave', () => {
      this.carousel.cycle()
    })
  }
}

// Initialize custom components
document.addEventListener('DOMContentLoaded', () => {
  // Initialize custom modals
  document.querySelectorAll('.modal-custom').forEach(modal => {
    new CustomModal(modal)
  })
  
  // Initialize advanced carousels
  document.querySelectorAll('.carousel-advanced').forEach(carousel => {
    new AdvancedCarousel(carousel)
  })
})
```

These examples show how to extensively customize Bootstrap through Sass variables, custom CSS classes, and enhanced JavaScript functionality while maintaining Bootstrap's core functionality and accessibility features.

---

## Framework Comparison

### 7. When should you choose Tailwind CSS over Bootstrap and vice versa?

**Answer:**
The choice between Tailwind CSS and Bootstrap depends on project requirements, team preferences, and development approach.

**Choose Tailwind CSS when:**
- You want complete design control and customization
- Building unique, custom designs
- Team prefers utility-first approach
- Bundle size optimization is important
- Working with modern build tools
- Long-term maintainability is a priority

**Choose Bootstrap when:**
- Rapid prototyping is needed
- Team prefers component-based approach
- Working with existing Bootstrap ecosystem
- Need pre-built JavaScript components
- Limited design resources
- Consistent, professional look is sufficient

```html
<!-- Same design implemented in both frameworks -->

<!-- Bootstrap Implementation -->
<div class="container mt-5">
  <div class="row">
    <div class="col-md-8 mx-auto">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h4 class="card-title mb-0">Contact Form</h4>
        </div>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Message</label>
              <textarea class="form-control" id="message" rows="4" required></textarea>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Tailwind CSS Implementation -->
<div class="max-w-2xl mx-auto mt-8 px-4">
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="bg-blue-600 text-white px-6 py-4">
      <h4 class="text-xl font-semibold">Contact Form</h4>
    </div>
    <div class="px-6 py-6">
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input 
            type="text" 
            id="name" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            required
          >
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            required
          >
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea 
            id="message" 
            rows="4" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</div>
```

**Comparison Table:**

| Aspect | Tailwind CSS | Bootstrap |
|--------|-------------|----------|
| **Approach** | Utility-first | Component-first |
| **Bundle Size** | Smaller (purged) | Larger (full framework) |
| **Customization** | Highly customizable | Moderate customization |
| **Learning Curve** | Steeper initially | Gentler |
| **Design Flexibility** | Maximum flexibility | Predefined patterns |
| **Development Speed** | Slower initially, faster long-term | Faster initially |
| **Maintenance** | Easier to maintain | Can become complex |
| **JavaScript** | CSS-only (separate JS) | Includes JS components |
| **File Size** | ~10KB (purged) | ~150KB+ (full) |
| **Browser Support** | Modern browsers | Wider browser support |

### 8. How do you migrate from Bootstrap to Tailwind CSS?

**Answer:**
Migrating from Bootstrap to Tailwind requires a systematic approach to replace component-based classes with utility classes.

**Migration Strategy:**

```javascript
// 1. Create a mapping guide
const bootstrapToTailwindMapping = {
  // Layout
  'container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  'container-fluid': 'w-full px-4',
  'row': 'flex flex-wrap -mx-4',
  'col': 'flex-1 px-4',
  'col-12': 'w-full px-4',
  'col-md-6': 'w-full md:w-1/2 px-4',
  'col-lg-4': 'w-full lg:w-1/3 px-4',
  'col-lg-8': 'w-full lg:w-2/3 px-4',
  
  // Display
  'd-none': 'hidden',
  'd-block': 'block',
  'd-flex': 'flex',
  'd-inline': 'inline',
  'd-inline-block': 'inline-block',
  'd-md-block': 'hidden md:block',
  'd-lg-flex': 'hidden lg:flex',
  
  // Flexbox
  'justify-content-center': 'justify-center',
  'justify-content-between': 'justify-between',
  'justify-content-around': 'justify-around',
  'align-items-center': 'items-center',
  'align-items-start': 'items-start',
  'align-items-end': 'items-end',
  'flex-column': 'flex-col',
  'flex-row': 'flex-row',
  
  // Spacing
  'm-0': 'm-0',
  'm-1': 'm-1',
  'm-2': 'm-2',
  'm-3': 'm-3',
  'm-4': 'm-4',
  'm-5': 'm-5',
  'mt-3': 'mt-3',
  'mb-4': 'mb-4',
  'p-3': 'p-3',
  'px-4': 'px-4',
  'py-2': 'py-2',
  
  // Text
  'text-center': 'text-center',
  'text-left': 'text-left',
  'text-right': 'text-right',
  'text-primary': 'text-blue-600',
  'text-secondary': 'text-gray-600',
  'text-success': 'text-green-600',
  'text-danger': 'text-red-600',
  'text-warning': 'text-yellow-600',
  'text-info': 'text-blue-500',
  'text-muted': 'text-gray-500',
  'font-weight-bold': 'font-bold',
  'font-weight-normal': 'font-normal',
  
  // Background
  'bg-primary': 'bg-blue-600',
  'bg-secondary': 'bg-gray-600',
  'bg-success': 'bg-green-600',
  'bg-danger': 'bg-red-600',
  'bg-warning': 'bg-yellow-500',
  'bg-info': 'bg-blue-500',
  'bg-light': 'bg-gray-100',
  'bg-dark': 'bg-gray-800',
  'bg-white': 'bg-white',
  
  // Borders
  'border': 'border',
  'border-0': 'border-0',
  'border-primary': 'border-blue-600',
  'border-secondary': 'border-gray-600',
  'rounded': 'rounded',
  'rounded-0': 'rounded-none',
  'rounded-circle': 'rounded-full',
  
  // Shadows
  'shadow-sm': 'shadow-sm',
  'shadow': 'shadow',
  'shadow-lg': 'shadow-lg'
}

// 2. Automated migration script
function migrateBootstrapToTailwind(htmlContent) {
  let migratedContent = htmlContent
  
  // Replace Bootstrap classes with Tailwind equivalents
  Object.entries(bootstrapToTailwindMapping).forEach(([bootstrap, tailwind]) => {
    const regex = new RegExp(`\\b${bootstrap}\\b`, 'g')
    migratedContent = migratedContent.replace(regex, tailwind)
  })
  
  // Handle complex component migrations
  migratedContent = migrateBootstrapComponents(migratedContent)
  
  return migratedContent
}

function migrateBootstrapComponents(content) {
  // Migrate Bootstrap cards
  content = content.replace(
    /<div class="card">/g,
    '<div class="bg-white rounded-lg shadow-md overflow-hidden">'
  )
  
  content = content.replace(
    /<div class="card-header">/g,
    '<div class="px-6 py-4 bg-gray-50 border-b border-gray-200">'
  )
  
  content = content.replace(
    /<div class="card-body">/g,
    '<div class="px-6 py-4">'
  )
  
  // Migrate Bootstrap buttons
  content = content.replace(
    /class="btn btn-primary"/g,
    'class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"'
  )
  
  content = content.replace(
    /class="btn btn-secondary"/g,
    'class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"'
  )
  
  // Migrate Bootstrap forms
  content = content.replace(
    /class="form-control"/g,
    'class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"'
  )
  
  content = content.replace(
    /class="form-label"/g,
    'class="block text-sm font-medium text-gray-700 mb-1"'
  )
  
  // Migrate Bootstrap alerts
  content = content.replace(
    /class="alert alert-success"/g,
    'class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"'
  )
  
  content = content.replace(
    /class="alert alert-danger"/g,
    'class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"'
  )
  
  return content
}
```

**Step-by-Step Migration Process:**

```html
<!-- Step 1: Original Bootstrap Component -->
<div class="container mt-5">
  <div class="row">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">User Profile</h5>
        </div>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary ms-2">Cancel</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="alert alert-info">
        <strong>Info:</strong> Please fill out all required fields.
      </div>
    </div>
  </div>
</div>

<!-- Step 2: Migrated to Tailwind CSS -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
  <div class="flex flex-wrap -mx-4">
    <div class="w-full md:w-2/3 px-4">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h5 class="text-lg font-semibold">User Profile</h5>
        </div>
        <div class="px-6 py-4">
          <form class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input 
                type="text" 
                id="name" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div class="flex space-x-3">
              <button 
                type="submit" 
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Save
              </button>
              <button 
                type="button" 
                class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-4">
      <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        <strong>Info:</strong> Please fill out all required fields.
      </div>
    </div>
  </div>
</div>

<!-- Step 3: Optimized Tailwind with Custom Components -->
<div class="container mt-8">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="md:col-span-2">
      <div class="card">
        <div class="card-header">
          <h5 class="text-lg font-semibold">User Profile</h5>
        </div>
        <div class="card-body">
          <form class="form">
            <div class="form-field">
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" class="form-input">
            </div>
            <div class="form-field">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" class="form-input">
            </div>
            <div class="flex space-x-3">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="md:col-span-1">
      <div class="alert alert-info">
        <strong>Info:</strong> Please fill out all required fields.
      </div>
    </div>
  </div>
</div>
```

**Migration Utilities:**

```css
/* Custom Tailwind components for easier migration */
@layer components {
  .container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md overflow-hidden;
  }
  
  .card-header {
    @apply px-6 py-4 bg-gray-50 border-b border-gray-200;
  }
  
  .card-body {
    @apply px-6 py-4;
  }
  
  .btn {
    @apply font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500;
  }
  
  .btn-secondary {
    @apply bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500;
  }
  
  .form {
    @apply space-y-6;
  }
  
  .form-field {
    @apply space-y-1;
  }
  
  .form-label {
    @apply block text-sm font-medium text-gray-700;
  }
  
  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  }
  
  .alert {
    @apply px-4 py-3 rounded border;
  }
  
  .alert-info {
    @apply bg-blue-100 border-blue-400 text-blue-700;
  }
  
  .alert-success {
    @apply bg-green-100 border-green-400 text-green-700;
  }
  
  .alert-warning {
    @apply bg-yellow-100 border-yellow-400 text-yellow-700;
  }
  
  .alert-danger {
    @apply bg-red-100 border-red-400 text-red-700;
  }
}
```

### 9. How do you optimize performance in Tailwind CSS and Bootstrap?

**Answer:**
Both frameworks offer different approaches to performance optimization, focusing on bundle size reduction and efficient CSS delivery.

**Tailwind CSS Performance Optimization:**

```javascript
// 1. Tailwind CSS Purging Configuration
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './public/index.html',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  // Enable JIT mode for faster builds
  mode: 'jit'
}

// 2. PostCSS Configuration for optimization
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      '@fullhuman/postcss-purgecss': {
        content: [
          './src/**/*.{html,js,jsx,ts,tsx}',
          './public/index.html'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          /^bg-/,
          /^text-/,
          /^border-/,
          'active',
          'disabled'
        ]
      },
      cssnano: {
        preset: 'default'
      }
    } : {})
  }
}

// 3. Webpack optimization for Tailwind
// webpack.config.js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}

// 4. Critical CSS extraction
// critical-css.js
const critical = require('critical')
const path = require('path')

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  dest: 'index-critical.html',
  width: 1300,
  height: 900,
  minify: true,
  extract: true,
  ignore: {
    atrule: ['@font-face'],
    rule: [/\.sr-only/]
  }
})
```

**Bootstrap Performance Optimization:**

```scss
// 1. Custom Bootstrap build - only import needed components
// custom-bootstrap.scss

// Required
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/root";

// Optional - only include what you need
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/images";
@import "~bootstrap/scss/containers";
@import "~bootstrap/scss/grid";
@import "~bootstrap/scss/tables";
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/buttons";
@import "~bootstrap/scss/transitions";
@import "~bootstrap/scss/dropdown";
@import "~bootstrap/scss/button-group";
@import "~bootstrap/scss/nav";
@import "~bootstrap/scss/navbar";
@import "~bootstrap/scss/card";
@import "~bootstrap/scss/accordion";
@import "~bootstrap/scss/breadcrumb";
@import "~bootstrap/scss/pagination";
@import "~bootstrap/scss/badge";
@import "~bootstrap/scss/alert";
@import "~bootstrap/scss/progress";
@import "~bootstrap/scss/list-group";
@import "~bootstrap/scss/close";
@import "~bootstrap/scss/toasts";
@import "~bootstrap/scss/modal";
@import "~bootstrap/scss/tooltip";
@import "~bootstrap/scss/popover";
@import "~bootstrap/scss/carousel";
@import "~bootstrap/scss/spinners";
@import "~bootstrap/scss/offcanvas";
@import "~bootstrap/scss/placeholders";

// Helpers
@import "~bootstrap/scss/helpers";

// Utilities
@import "~bootstrap/scss/utilities/api";

// 2. Tree-shaking Bootstrap JavaScript
// main.js

// Import only needed Bootstrap JS components
import { Modal } from 'bootstrap/js/dist/modal'
import { Dropdown } from 'bootstrap/js/dist/dropdown'
import { Collapse } from 'bootstrap/js/dist/collapse'
import { Toast } from 'bootstrap/js/dist/toast'

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modals
  const modals = document.querySelectorAll('.modal')
  modals.forEach(modal => new Modal(modal))
  
  // Initialize dropdowns
  const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]')
  dropdowns.forEach(dropdown => new Dropdown(dropdown))
  
  // Initialize toasts
  const toasts = document.querySelectorAll('.toast')
  toasts.forEach(toast => new Toast(toast))
})

// 3. Webpack configuration for Bootstrap optimization
// webpack.config.js
const webpack = require('webpack')

module.exports = {
  // ... other config
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        bootstrap: {
          test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
          name: 'bootstrap',
          chunks: 'all',
          priority: 10
        }
      }
    }
  }
}
```

**Performance Comparison and Best Practices:**

```html
<!-- Performance-optimized HTML structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Optimized Page</title>
  
  <!-- Critical CSS inlined -->
  <style>
    /* Critical above-the-fold styles */
    .hero { /* critical styles */ }
    .nav { /* critical styles */ }
  </style>
  
  <!-- Preload important resources -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/css/main.css" as="style">
  
  <!-- Load non-critical CSS asynchronously -->
  <link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
</head>
<body>
  <!-- Content -->
  
  <!-- Load JavaScript at the end -->
  <script src="/js/main.js" defer></script>
</body>
</html>
```

**Bundle Size Comparison:**

```javascript
// Bundle size analysis
const bundleAnalysis = {
  tailwindCSS: {
    development: '3.2MB (full)',
    production: '8-15KB (purged)',
    gzipped: '3-6KB'
  },
  bootstrap: {
    development: '200KB (CSS) + 60KB (JS)',
    production: '150KB (CSS) + 45KB (JS)',
    gzipped: '25KB (CSS) + 15KB (JS)',
    customBuild: '50-100KB (CSS) + 20-30KB (JS)'
  }
}

// Performance monitoring
function measurePerformance() {
  // Measure CSS load time
  const cssLoadTime = performance.getEntriesByType('resource')
    .filter(entry => entry.name.includes('.css'))
    .reduce((total, entry) => total + entry.duration, 0)
  
  // Measure JavaScript load time
  const jsLoadTime = performance.getEntriesByType('resource')
    .filter(entry => entry.name.includes('.js'))
    .reduce((total, entry) => total + entry.duration, 0)
  
  // Measure First Contentful Paint
  const fcp = performance.getEntriesByType('paint')
    .find(entry => entry.name === 'first-contentful-paint')
  
  console.log('Performance Metrics:', {
    cssLoadTime: `${cssLoadTime.toFixed(2)}ms`,
    jsLoadTime: `${jsLoadTime.toFixed(2)}ms`,
    firstContentfulPaint: `${fcp?.startTime.toFixed(2)}ms`
  })
}

// Call after page load
window.addEventListener('load', measurePerformance)
```

**Optimization Checklist:**

```markdown
## Tailwind CSS Optimization
- ✅ Enable JIT mode
- ✅ Configure content paths correctly
- ✅ Use PurgeCSS in production
- ✅ Minimize custom CSS
- ✅ Use CSS-in-JS for dynamic styles
- ✅ Implement critical CSS extraction
- ✅ Enable gzip compression
- ✅ Use CDN for static assets

## Bootstrap Optimization
- ✅ Create custom builds with only needed components
- ✅ Tree-shake JavaScript modules
- ✅ Use Sass variables for customization
- ✅ Minimize custom overrides
- ✅ Implement code splitting
- ✅ Use Bootstrap's utility classes
- ✅ Optimize images and fonts
- ✅ Enable browser caching
```

These optimization strategies can significantly reduce bundle sizes and improve page load times for both frameworks.