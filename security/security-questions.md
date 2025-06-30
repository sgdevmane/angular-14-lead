# Web Security Interview Questions

## Table of Contents
1. [Security Fundamentals](#security-fundamentals)
2. [Authentication & Authorization](#authentication--authorization)
3. [Cross-Site Scripting (XSS)](#cross-site-scripting-xss)
4. [Cross-Site Request Forgery (CSRF)](#cross-site-request-forgery-csrf)
5. [Content Security Policy (CSP)](#content-security-policy-csp)
6. [HTTPS & TLS](#https--tls)
7. [Input Validation & Sanitization](#input-validation--sanitization)
8. [Session Management](#session-management)
9. [API Security](#api-security)
10. [Security Headers](#security-headers)

---

## Security Fundamentals

### Q1: What are the OWASP Top 10 security vulnerabilities?

**Answer:**
The OWASP Top 10 represents the most critical web application security risks.

**OWASP Top 10 (2021):**

1. **A01:2021 – Broken Access Control**
   - Unauthorized access to resources
   - Privilege escalation
   - Missing authorization checks

2. **A02:2021 – Cryptographic Failures**
   - Weak encryption algorithms
   - Poor key management
   - Unencrypted sensitive data

3. **A03:2021 – Injection**
   - SQL injection
   - NoSQL injection
   - Command injection
   - LDAP injection

4. **A04:2021 – Insecure Design**
   - Missing security controls
   - Threat modeling failures
   - Insecure design patterns

5. **A05:2021 – Security Misconfiguration**
   - Default configurations
   - Incomplete configurations
   - Open cloud storage

6. **A06:2021 – Vulnerable and Outdated Components**
   - Outdated libraries
   - Unsupported software
   - Unknown component vulnerabilities

7. **A07:2021 – Identification and Authentication Failures**
   - Weak passwords
   - Session management flaws
   - Credential stuffing

8. **A08:2021 – Software and Data Integrity Failures**
   - Unsigned updates
   - Insecure CI/CD pipelines
   - Auto-update without verification

9. **A09:2021 – Security Logging and Monitoring Failures**
   - Insufficient logging
   - Missing monitoring
   - Inadequate incident response

10. **A10:2021 – Server-Side Request Forgery (SSRF)**
    - Unvalidated URLs
    - Internal network access
    - Cloud metadata access

**Security Assessment Framework:**
```javascript
class SecurityAssessment {
  constructor() {
    this.vulnerabilities = [];
    this.securityChecks = new Map();
    this.initializeChecks();
  }
  
  initializeChecks() {
    // A01: Broken Access Control
    this.securityChecks.set('access-control', {
      name: 'Access Control',
      checks: [
        () => this.checkAuthorizationBypass(),
        () => this.checkPrivilegeEscalation(),
        () => this.checkDirectObjectReferences()
      ]
    });
    
    // A02: Cryptographic Failures
    this.securityChecks.set('crypto', {
      name: 'Cryptographic Security',
      checks: [
        () => this.checkEncryptionStrength(),
        () => this.checkKeyManagement(),
        () => this.checkDataInTransit()
      ]
    });
    
    // A03: Injection
    this.securityChecks.set('injection', {
      name: 'Injection Vulnerabilities',
      checks: [
        () => this.checkSQLInjection(),
        () => this.checkXSSVulnerabilities(),
        () => this.checkCommandInjection()
      ]
    });
  }
  
  async runAssessment() {
    const results = [];
    
    for (const [key, check] of this.securityChecks) {
      const checkResults = await Promise.all(
        check.checks.map(fn => this.safeExecute(fn))
      );
      
      results.push({
        category: check.name,
        results: checkResults,
        passed: checkResults.every(r => r.passed),
        critical: checkResults.some(r => r.severity === 'critical')
      });
    }
    
    return this.generateReport(results);
  }
  
  async safeExecute(checkFunction) {
    try {
      return await checkFunction();
    } catch (error) {
      return {
        passed: false,
        severity: 'error',
        message: `Check failed: ${error.message}`
      };
    }
  }
  
  checkAuthorizationBypass() {
    // Check for missing authorization
    const protectedRoutes = document.querySelectorAll('[data-protected]');
    const unauthorizedAccess = [];
    
    protectedRoutes.forEach(route => {
      if (!this.hasValidAuthorization(route)) {
        unauthorizedAccess.push(route.getAttribute('data-route'));
      }
    });
    
    return {
      passed: unauthorizedAccess.length === 0,
      severity: unauthorizedAccess.length > 0 ? 'critical' : 'info',
      message: unauthorizedAccess.length > 0 
        ? `Unauthorized access possible: ${unauthorizedAccess.join(', ')}`
        : 'Authorization checks passed'
    };
  }
  
  checkEncryptionStrength() {
    // Check for weak encryption
    const weakPatterns = [
      /md5/i,
      /sha1/i,
      /des/i,
      /rc4/i
    ];
    
    const scripts = Array.from(document.scripts);
    const weakCrypto = [];
    
    scripts.forEach(script => {
      if (script.src) {
        weakPatterns.forEach(pattern => {
          if (pattern.test(script.src)) {
            weakCrypto.push(script.src);
          }
        });
      }
    });
    
    return {
      passed: weakCrypto.length === 0,
      severity: weakCrypto.length > 0 ? 'high' : 'info',
      message: weakCrypto.length > 0
        ? `Weak cryptography detected: ${weakCrypto.join(', ')}`
        : 'Cryptography checks passed'
    };
  }
  
  checkXSSVulnerabilities() {
    // Check for XSS vulnerabilities
    const userInputs = document.querySelectorAll('input, textarea, [contenteditable]');
    const vulnerableInputs = [];
    
    userInputs.forEach(input => {
      if (!this.hasXSSProtection(input)) {
        vulnerableInputs.push(input.name || input.id || 'unnamed');
      }
    });
    
    return {
      passed: vulnerableInputs.length === 0,
      severity: vulnerableInputs.length > 0 ? 'critical' : 'info',
      message: vulnerableInputs.length > 0
        ? `XSS vulnerable inputs: ${vulnerableInputs.join(', ')}`
        : 'XSS protection checks passed'
    };
  }
  
  hasValidAuthorization(element) {
    // Check if element has proper authorization
    return element.hasAttribute('data-auth-checked') ||
           element.hasAttribute('data-role-required');
  }
  
  hasXSSProtection(input) {
    // Check if input has XSS protection
    return input.hasAttribute('data-sanitized') ||
           input.hasAttribute('data-validated');
  }
  
  generateReport(results) {
    const critical = results.filter(r => r.critical).length;
    const failed = results.filter(r => !r.passed).length;
    
    return {
      timestamp: new Date().toISOString(),
      summary: {
        total: results.length,
        passed: results.length - failed,
        failed: failed,
        critical: critical
      },
      results: results,
      recommendations: this.generateRecommendations(results)
    };
  }
  
  generateRecommendations(results) {
    const recommendations = [];
    
    results.forEach(result => {
      if (!result.passed) {
        recommendations.push({
          category: result.category,
          priority: result.critical ? 'critical' : 'high',
          action: this.getRecommendation(result.category)
        });
      }
    });
    
    return recommendations;
  }
  
  getRecommendation(category) {
    const recommendations = {
      'Access Control': 'Implement proper authorization checks and role-based access control',
      'Cryptographic Security': 'Use strong encryption algorithms and proper key management',
      'Injection Vulnerabilities': 'Implement input validation and parameterized queries'
    };
    
    return recommendations[category] || 'Review security implementation';
  }
}

// Usage
const assessment = new SecurityAssessment();
assessment.runAssessment().then(report => {
  console.log('Security Assessment Report:', report);
});
```

---

## Authentication & Authorization

### Q2: How do you implement secure authentication and authorization?

**Answer:**
Secure authentication and authorization are fundamental to web application security.

**JWT Implementation with Security Best Practices:**
```javascript
class SecureAuthManager {
  constructor(options = {}) {
    this.options = {
      tokenExpiry: 15 * 60 * 1000, // 15 minutes
      refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
      maxLoginAttempts: 5,
      lockoutDuration: 30 * 60 * 1000, // 30 minutes
      ...options
    };
    
    this.loginAttempts = new Map();
    this.refreshTokens = new Set();
  }
  
  async login(credentials) {
    const { username, password } = credentials;
    
    // Check for account lockout
    if (this.isAccountLocked(username)) {
      throw new Error('Account temporarily locked due to multiple failed attempts');
    }
    
    try {
      // Validate credentials (with rate limiting)
      const user = await this.validateCredentials(username, password);
      
      if (!user) {
        this.recordFailedAttempt(username);
        throw new Error('Invalid credentials');
      }
      
      // Clear failed attempts on successful login
      this.loginAttempts.delete(username);
      
      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);
      
      // Store refresh token securely
      this.refreshTokens.add(refreshToken);
      
      // Log successful login
      this.logSecurityEvent('LOGIN_SUCCESS', { userId: user.id, username });
      
      return {
        accessToken,
        refreshToken,
        user: this.sanitizeUser(user),
        expiresIn: this.options.tokenExpiry
      };
    } catch (error) {
      this.logSecurityEvent('LOGIN_FAILURE', { username, error: error.message });
      throw error;
    }
  }
  
  generateAccessToken(user) {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
      permissions: user.permissions,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor((Date.now() + this.options.tokenExpiry) / 1000),
      iss: 'your-app',
      aud: 'your-app-users'
    };
    
    // In real implementation, use proper JWT library with strong secret
    return this.signJWT(payload);
  }
  
  generateRefreshToken(user) {
    const payload = {
      sub: user.id,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor((Date.now() + this.options.refreshTokenExpiry) / 1000)
    };
    
    return this.signJWT(payload);
  }
  
  async refreshAccessToken(refreshToken) {
    try {
      // Verify refresh token
      if (!this.refreshTokens.has(refreshToken)) {
        throw new Error('Invalid refresh token');
      }
      
      const payload = this.verifyJWT(refreshToken);
      
      if (payload.type !== 'refresh') {
        throw new Error('Invalid token type');
      }
      
      // Get user data
      const user = await this.getUserById(payload.sub);
      
      if (!user || !user.active) {
        throw new Error('User not found or inactive');
      }
      
      // Generate new access token
      const newAccessToken = this.generateAccessToken(user);
      
      this.logSecurityEvent('TOKEN_REFRESH', { userId: user.id });
      
      return {
        accessToken: newAccessToken,
        expiresIn: this.options.tokenExpiry
      };
    } catch (error) {
      this.logSecurityEvent('TOKEN_REFRESH_FAILURE', { error: error.message });
      throw error;
    }
  }
  
  logout(refreshToken) {
    // Invalidate refresh token
    this.refreshTokens.delete(refreshToken);
    
    // In production, also add access token to blacklist
    // until its natural expiration
    
    this.logSecurityEvent('LOGOUT', { timestamp: Date.now() });
  }
  
  isAccountLocked(username) {
    const attempts = this.loginAttempts.get(username);
    
    if (!attempts) return false;
    
    const { count, lastAttempt } = attempts;
    const timeSinceLastAttempt = Date.now() - lastAttempt;
    
    // Reset attempts if lockout period has passed
    if (timeSinceLastAttempt > this.options.lockoutDuration) {
      this.loginAttempts.delete(username);
      return false;
    }
    
    return count >= this.options.maxLoginAttempts;
  }
  
  recordFailedAttempt(username) {
    const attempts = this.loginAttempts.get(username) || { count: 0, lastAttempt: 0 };
    
    attempts.count++;
    attempts.lastAttempt = Date.now();
    
    this.loginAttempts.set(username, attempts);
  }
  
  sanitizeUser(user) {
    const { password, salt, ...sanitized } = user;
    return sanitized;
  }
  
  logSecurityEvent(event, data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      data,
      ip: this.getClientIP(),
      userAgent: navigator.userAgent
    };
    
    // Send to security logging service
    console.log('Security Event:', logEntry);
  }
  
  getClientIP() {
    // In real implementation, get from server
    return 'client-ip';
  }
}

// Role-Based Access Control (RBAC)
class RBACManager {
  constructor() {
    this.roles = new Map();
    this.permissions = new Map();
    this.userRoles = new Map();
  }
  
  defineRole(roleName, permissions) {
    this.roles.set(roleName, new Set(permissions));
  }
  
  definePermission(permissionName, description) {
    this.permissions.set(permissionName, { description });
  }
  
  assignRole(userId, roleName) {
    if (!this.roles.has(roleName)) {
      throw new Error(`Role ${roleName} does not exist`);
    }
    
    if (!this.userRoles.has(userId)) {
      this.userRoles.set(userId, new Set());
    }
    
    this.userRoles.get(userId).add(roleName);
  }
  
  revokeRole(userId, roleName) {
    const userRoles = this.userRoles.get(userId);
    if (userRoles) {
      userRoles.delete(roleName);
    }
  }
  
  hasPermission(userId, permission) {
    const userRoles = this.userRoles.get(userId);
    
    if (!userRoles) return false;
    
    for (const roleName of userRoles) {
      const rolePermissions = this.roles.get(roleName);
      if (rolePermissions && rolePermissions.has(permission)) {
        return true;
      }
    }
    
    return false;
  }
  
  getUserPermissions(userId) {
    const userRoles = this.userRoles.get(userId);
    const permissions = new Set();
    
    if (userRoles) {
      for (const roleName of userRoles) {
        const rolePermissions = this.roles.get(roleName);
        if (rolePermissions) {
          rolePermissions.forEach(permission => permissions.add(permission));
        }
      }
    }
    
    return Array.from(permissions);
  }
}

// Authorization Middleware
class AuthorizationMiddleware {
  constructor(rbacManager) {
    this.rbac = rbacManager;
  }
  
  requirePermission(permission) {
    return (req, res, next) => {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      if (!this.rbac.hasPermission(user.id, permission)) {
        return res.status(403).json({ 
          error: 'Insufficient permissions',
          required: permission
        });
      }
      
      next();
    };
  }
  
  requireRole(roleName) {
    return (req, res, next) => {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userRoles = this.rbac.userRoles.get(user.id);
      
      if (!userRoles || !userRoles.has(roleName)) {
        return res.status(403).json({ 
          error: 'Insufficient role',
          required: roleName
        });
      }
      
      next();
    };
  }
  
  requireAnyRole(roleNames) {
    return (req, res, next) => {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userRoles = this.rbac.userRoles.get(user.id);
      
      if (!userRoles) {
        return res.status(403).json({ error: 'No roles assigned' });
      }
      
      const hasRequiredRole = roleNames.some(role => userRoles.has(role));
      
      if (!hasRequiredRole) {
        return res.status(403).json({ 
          error: 'Insufficient role',
          required: `One of: ${roleNames.join(', ')}`
        });
      }
      
      next();
    };
  }
}

// Setup RBAC
const rbac = new RBACManager();

// Define permissions
rbac.definePermission('read:users', 'Read user data');
rbac.definePermission('write:users', 'Create/update user data');
rbac.definePermission('delete:users', 'Delete user data');
rbac.definePermission('read:admin', 'Read admin data');
rbac.definePermission('write:admin', 'Admin operations');

// Define roles
rbac.defineRole('user', ['read:users']);
rbac.defineRole('moderator', ['read:users', 'write:users']);
rbac.defineRole('admin', ['read:users', 'write:users', 'delete:users', 'read:admin', 'write:admin']);

// Usage
const authManager = new SecureAuthManager();
const authMiddleware = new AuthorizationMiddleware(rbac);

// Assign roles to users
rbac.assignRole('user123', 'user');
rbac.assignRole('mod456', 'moderator');
rbac.assignRole('admin789', 'admin');
```

---

## Cross-Site Scripting (XSS)

### Q3: How do you prevent XSS attacks?

**Answer:**
XSS prevention requires multiple layers of defense including input validation, output encoding, and Content Security Policy.

**XSS Prevention Strategies:**
```javascript
// 1. Input Sanitization
class XSSProtection {
  constructor() {
    this.htmlEntities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };
    
    this.dangerousPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<object[^>]*>.*?<\/object>/gi,
      /<embed[^>]*>/gi,
      /<link[^>]*>/gi,
      /<meta[^>]*>/gi
    ];
  }
  
  // HTML Entity Encoding
  escapeHtml(text) {
    if (typeof text !== 'string') {
      return text;
    }
    
    return text.replace(/[&<>"'\/]/g, (match) => {
      return this.htmlEntities[match];
    });
  }
  
  // Attribute Encoding
  escapeAttribute(text) {
    if (typeof text !== 'string') {
      return text;
    }
    
    return text.replace(/[^\w\s-_\.]/g, (match) => {
      const code = match.charCodeAt(0);
      return `&#${code};`;
    });
  }
  
  // JavaScript Encoding
  escapeJavaScript(text) {
    if (typeof text !== 'string') {
      return text;
    }
    
    return text.replace(/[\\"'\r\n\t\b\f]/g, (match) => {
      const escapes = {
        '\\': '\\\\',
        '"': '\\"',
        "'": "\\\'',
        '\r': '\\r',
        '\n': '\\n',
        '\t': '\\t',
        '\b': '\\b',
        '\f': '\\f'
      };
      return escapes[match] || match;
    });
  }
  
  // URL Encoding
  escapeUrl(url) {
    if (typeof url !== 'string') {
      return url;
    }
    
    // Check for dangerous protocols
    const dangerousProtocols = /^(javascript|data|vbscript):/i;
    if (dangerousProtocols.test(url)) {
      return '#';
    }
    
    return encodeURIComponent(url);
  }
  
  // CSS Encoding
  escapeCSS(text) {
    if (typeof text !== 'string') {
      return text;
    }
    
    return text.replace(/[^\w\s-]/g, (match) => {
      const code = match.charCodeAt(0);
      return `\\${code.toString(16)} `;
    });
  }
  
  // Comprehensive sanitization
  sanitizeInput(input, context = 'html') {
    if (typeof input !== 'string') {
      return input;
    }
    
    // Remove dangerous patterns
    let sanitized = input;
    this.dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });
    
    // Apply context-specific encoding
    switch (context) {
      case 'html':
        return this.escapeHtml(sanitized);
      case 'attribute':
        return this.escapeAttribute(sanitized);
      case 'javascript':
        return this.escapeJavaScript(sanitized);
      case 'url':
        return this.escapeUrl(sanitized);
      case 'css':
        return this.escapeCSS(sanitized);
      default:
        return this.escapeHtml(sanitized);
    }
  }
  
  // Validate and sanitize form data
  sanitizeFormData(formData) {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeInput(value);
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item => 
          typeof item === 'string' ? this.sanitizeInput(item) : item
        );
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
}

// 2. Safe DOM Manipulation
class SafeDOMManipulator {
  constructor() {
    this.xssProtection = new XSSProtection();
  }
  
  // Safe text content setting
  setTextContent(element, text) {
    if (element && typeof text === 'string') {
      element.textContent = text; // textContent is XSS-safe
    }
  }
  
  // Safe HTML setting with sanitization
  setInnerHTML(element, html) {
    if (!element) return;
    
    const sanitizedHTML = this.sanitizeHTML(html);
    element.innerHTML = sanitizedHTML;
  }
  
  // Safe attribute setting
  setAttribute(element, name, value) {
    if (!element || !name) return;
    
    // Dangerous attributes that can execute JavaScript
    const dangerousAttributes = [
      'onclick', 'onload', 'onerror', 'onmouseover',
      'onfocus', 'onblur', 'onchange', 'onsubmit'
    ];
    
    if (dangerousAttributes.includes(name.toLowerCase())) {
      console.warn(`Blocked dangerous attribute: ${name}`);
      return;
    }
    
    // Special handling for href and src
    if (name === 'href' || name === 'src') {
      value = this.xssProtection.escapeUrl(value);
    } else {
      value = this.xssProtection.escapeAttribute(value);
    }
    
    element.setAttribute(name, value);
  }
  
  // HTML sanitization using DOMParser
  sanitizeHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Remove dangerous elements
    const dangerousElements = [
      'script', 'object', 'embed', 'link', 'meta',
      'iframe', 'frame', 'frameset', 'applet'
    ];
    
    dangerousElements.forEach(tagName => {
      const elements = doc.querySelectorAll(tagName);
      elements.forEach(el => el.remove());
    });
    
    // Remove dangerous attributes
    const allElements = doc.querySelectorAll('*');
    allElements.forEach(element => {
      const attributes = Array.from(element.attributes);
      attributes.forEach(attr => {
        if (attr.name.startsWith('on') || 
            attr.value.toLowerCase().includes('javascript:')) {
          element.removeAttribute(attr.name);
        }
      });
    });
    
    return doc.body.innerHTML;
  }
  
  // Safe element creation
  createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);
    
    // Set attributes safely
    Object.entries(attributes).forEach(([name, value]) => {
      this.setAttribute(element, name, value);
    });
    
    // Set text content safely
    if (textContent) {
      this.setTextContent(element, textContent);
    }
    
    return element;
  }
}

// 3. Template Security
class SecureTemplateEngine {
  constructor() {
    this.xssProtection = new XSSProtection();
    this.domManipulator = new SafeDOMManipulator();
  }
  
  // Safe template rendering
  render(template, data) {
    let rendered = template;
    
    // Replace placeholders with escaped data
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      const escapedValue = this.xssProtection.escapeHtml(String(value));
      rendered = rendered.replace(placeholder, escapedValue);
    });
    
    // Handle unescaped placeholders (use with extreme caution)
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{{\\s*${key}\\s*}}}`, 'g');
      const sanitizedValue = this.domManipulator.sanitizeHTML(String(value));
      rendered = rendered.replace(placeholder, sanitizedValue);
    });
    
    return rendered;
  }
  
  // Compile template with security checks
  compile(template) {
    // Check for dangerous patterns in template
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i
    ];
    
    const hasDangerousContent = dangerousPatterns.some(pattern => 
      pattern.test(template)
    );
    
    if (hasDangerousContent) {
      throw new Error('Template contains potentially dangerous content');
    }
    
    return (data) => this.render(template, data);
  }
}

// 4. Input Validation
class InputValidator {
  constructor() {
    this.patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phone: /^[\d\s\-\+\(\)]+$/,
      alphanumeric: /^[a-zA-Z0-9]+$/,
      url: /^https?:\/\/[^\s]+$/
    };
  }
  
  validate(input, rules) {
    const errors = [];
    
    // Required check
    if (rules.required && (!input || input.trim() === '')) {
      errors.push('This field is required');
      return { valid: false, errors };
    }
    
    if (!input) {
      return { valid: true, errors: [] };
    }
    
    // Length checks
    if (rules.minLength && input.length < rules.minLength) {
      errors.push(`Minimum length is ${rules.minLength}`);
    }
    
    if (rules.maxLength && input.length > rules.maxLength) {
      errors.push(`Maximum length is ${rules.maxLength}`);
    }
    
    // Pattern checks
    if (rules.pattern) {
      const pattern = typeof rules.pattern === 'string' 
        ? this.patterns[rules.pattern] 
        : rules.pattern;
      
      if (pattern && !pattern.test(input)) {
        errors.push(rules.patternMessage || 'Invalid format');
      }
    }
    
    // XSS check
    if (rules.xssCheck !== false) {
      const xssProtection = new XSSProtection();
      const sanitized = xssProtection.sanitizeInput(input);
      
      if (sanitized !== input) {
        errors.push('Input contains potentially dangerous content');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      sanitized: input
    };
  }
  
  validateForm(formData, rules) {
    const results = {};
    let isValid = true;
    
    Object.entries(rules).forEach(([field, fieldRules]) => {
      const result = this.validate(formData[field], fieldRules);
      results[field] = result;
      
      if (!result.valid) {
        isValid = false;
      }
    });
    
    return {
      valid: isValid,
      fields: results
    };
  }
}

// Usage Examples
const xssProtection = new XSSProtection();
const domManipulator = new SafeDOMManipulator();
const templateEngine = new SecureTemplateEngine();
const validator = new InputValidator();

// Safe user input handling
function handleUserInput(userInput) {
  // Validate input
  const validation = validator.validate(userInput, {
    required: true,
    maxLength: 1000,
    xssCheck: true
  });
  
  if (!validation.valid) {
    console.error('Validation errors:', validation.errors);
    return;
  }
  
  // Sanitize and display
  const sanitized = xssProtection.sanitizeInput(userInput);
  const outputElement = document.getElementById('output');
  domManipulator.setTextContent(outputElement, sanitized);
}

// Safe template rendering
const template = '<div>Hello {{name}}! Your email is {{email}}</div>';
const compiledTemplate = templateEngine.compile(template);

const userData = {
  name: '<script>alert("XSS")</script>John',
  email: 'john@example.com'
};

const safeHTML = compiledTemplate(userData);
console.log(safeHTML); // XSS content will be escaped
This security guide provides comprehensive protection against XSS and other common web vulnerabilities with practical implementation examples.

---

## Advanced Security Patterns

### Q4: How do you implement advanced authentication and authorization patterns?

**Answer:**
Advanced authentication and authorization require sophisticated patterns including multi-factor authentication, role-based access control, and secure session management.

**Advanced Authentication System:**
```typescript
// Multi-Factor Authentication Manager
class MFAManager {
  private totpSecrets = new Map<string, string>();
  private backupCodes = new Map<string, string[]>();
  private trustedDevices = new Map<string, Set<string>>();
  private rateLimiter: RateLimiter;
  
  constructor() {
    this.rateLimiter = new RateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxAttempts: 5
    });
  }
  
  async generateTOTPSecret(userId: string): Promise<{ secret: string; qrCode: string }> {
    const secret = this.generateRandomSecret();
    this.totpSecrets.set(userId, secret);
    
    const qrCode = await this.generateQRCode(userId, secret);
    
    return { secret, qrCode };
  }
  
  async verifyTOTP(userId: string, token: string, deviceId?: string): Promise<boolean> {
    // Rate limiting
    if (!this.rateLimiter.isAllowed(userId)) {
      throw new Error('Too many authentication attempts');
    }
    
    const secret = this.totpSecrets.get(userId);
    if (!secret) {
      return false;
    }
    
    const isValid = this.validateTOTPToken(secret, token);
    
    if (isValid && deviceId) {
      this.addTrustedDevice(userId, deviceId);
    }
    
    return isValid;
  }
  
  async generateBackupCodes(userId: string): Promise<string[]> {
    const codes = Array.from({ length: 10 }, () => this.generateBackupCode());
    this.backupCodes.set(userId, codes);
    return codes;
  }
  
  async verifyBackupCode(userId: string, code: string): Promise<boolean> {
    const codes = this.backupCodes.get(userId);
    if (!codes) {
      return false;
    }
    
    const index = codes.indexOf(code);
    if (index === -1) {
      return false;
    }
    
    // Remove used backup code
    codes.splice(index, 1);
    this.backupCodes.set(userId, codes);
    
    return true;
  }
  
  isDeviceTrusted(userId: string, deviceId: string): boolean {
    const devices = this.trustedDevices.get(userId);
    return devices ? devices.has(deviceId) : false;
  }
  
  private addTrustedDevice(userId: string, deviceId: string): void {
    if (!this.trustedDevices.has(userId)) {
      this.trustedDevices.set(userId, new Set());
    }
    this.trustedDevices.get(userId)!.add(deviceId);
  }
  
  private generateRandomSecret(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  }
  
  private generateBackupCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  
  private async generateQRCode(userId: string, secret: string): Promise<string> {
    const issuer = 'YourApp';
    const otpauth = `otpauth://totp/${issuer}:${userId}?secret=${secret}&issuer=${issuer}`;
    
    // In a real implementation, use a QR code library
    return `data:image/svg+xml;base64,${btoa(this.generateQRCodeSVG(otpauth))}`;
  }
  
  private generateQRCodeSVG(data: string): string {
    // Simplified QR code generation - use a proper library in production
    return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="200" height="200" fill="white"/>
      <text x="100" y="100" text-anchor="middle" font-size="12">${data}</text>
    </svg>`;
  }
  
  private validateTOTPToken(secret: string, token: string): boolean {
    const window = 1; // Allow 1 time step before/after
    const timeStep = 30; // 30 seconds
    const currentTime = Math.floor(Date.now() / 1000 / timeStep);
    
    for (let i = -window; i <= window; i++) {
      const time = currentTime + i;
      const expectedToken = this.generateTOTPToken(secret, time);
      if (expectedToken === token) {
        return true;
      }
    }
    
    return false;
  }
  
  private generateTOTPToken(secret: string, time: number): string {
    // Simplified TOTP implementation - use a proper library in production
    const hash = this.hmacSHA1(secret, time.toString());
    const offset = hash.charCodeAt(hash.length - 1) & 0xf;
    const code = ((hash.charCodeAt(offset) & 0x7f) << 24) |
                 ((hash.charCodeAt(offset + 1) & 0xff) << 16) |
                 ((hash.charCodeAt(offset + 2) & 0xff) << 8) |
                 (hash.charCodeAt(offset + 3) & 0xff);
    
    return (code % 1000000).toString().padStart(6, '0');
  }
  
  private hmacSHA1(key: string, data: string): string {
    // Simplified HMAC-SHA1 - use crypto library in production
    return btoa(key + data).substring(0, 20);
  }
}

// Role-Based Access Control (RBAC)
class RBACManager {
  private roles = new Map<string, Role>();
  private userRoles = new Map<string, Set<string>>();
  private permissions = new Map<string, Permission>();
  private roleHierarchy = new Map<string, Set<string>>();
  
  constructor() {
    this.initializeDefaultRoles();
  }
  
  private initializeDefaultRoles(): void {
    // Define permissions
    this.permissions.set('user:read', { id: 'user:read', resource: 'user', action: 'read' });
    this.permissions.set('user:write', { id: 'user:write', resource: 'user', action: 'write' });
    this.permissions.set('user:delete', { id: 'user:delete', resource: 'user', action: 'delete' });
    this.permissions.set('admin:all', { id: 'admin:all', resource: '*', action: '*' });
    
    // Define roles
    this.roles.set('guest', {
      id: 'guest',
      name: 'Guest',
      permissions: new Set(['user:read'])
    });
    
    this.roles.set('user', {
      id: 'user',
      name: 'User',
      permissions: new Set(['user:read', 'user:write'])
    });
    
    this.roles.set('admin', {
      id: 'admin',
      name: 'Administrator',
      permissions: new Set(['admin:all'])
    });
    
    // Define role hierarchy
    this.roleHierarchy.set('admin', new Set(['user', 'guest']));
    this.roleHierarchy.set('user', new Set(['guest']));
  }
  
  assignRole(userId: string, roleId: string): void {
    if (!this.roles.has(roleId)) {
      throw new Error(`Role ${roleId} does not exist`);
    }
    
    if (!this.userRoles.has(userId)) {
      this.userRoles.set(userId, new Set());
    }
    
    this.userRoles.get(userId)!.add(roleId);
  }
  
  revokeRole(userId: string, roleId: string): void {
    const roles = this.userRoles.get(userId);
    if (roles) {
      roles.delete(roleId);
    }
  }
  
  hasPermission(userId: string, permissionId: string): boolean {
    const userRoles = this.userRoles.get(userId);
    if (!userRoles) {
      return false;
    }
    
    // Check direct permissions
    for (const roleId of userRoles) {
      if (this.roleHasPermission(roleId, permissionId)) {
        return true;
      }
    }
    
    return false;
  }
  
  hasRole(userId: string, roleId: string): boolean {
    const userRoles = this.userRoles.get(userId);
    if (!userRoles) {
      return false;
    }
    
    // Check direct role
    if (userRoles.has(roleId)) {
      return true;
    }
    
    // Check inherited roles
    for (const userRole of userRoles) {
      if (this.isRoleInherited(userRole, roleId)) {
        return true;
      }
    }
    
    return false;
  }
  
  private roleHasPermission(roleId: string, permissionId: string): boolean {
    const role = this.roles.get(roleId);
    if (!role) {
      return false;
    }
    
    // Check direct permission
    if (role.permissions.has(permissionId)) {
      return true;
    }
    
    // Check wildcard permissions
    if (role.permissions.has('admin:all')) {
      return true;
    }
    
    // Check inherited permissions from role hierarchy
    const inheritedRoles = this.roleHierarchy.get(roleId);
    if (inheritedRoles) {
      for (const inheritedRole of inheritedRoles) {
        if (this.roleHasPermission(inheritedRole, permissionId)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  private isRoleInherited(parentRole: string, targetRole: string): boolean {
    const inheritedRoles = this.roleHierarchy.get(parentRole);
    if (!inheritedRoles) {
      return false;
    }
    
    if (inheritedRoles.has(targetRole)) {
      return true;
    }
    
    // Check nested inheritance
    for (const inheritedRole of inheritedRoles) {
      if (this.isRoleInherited(inheritedRole, targetRole)) {
        return true;
      }
    }
    
    return false;
  }
  
  getUserPermissions(userId: string): Set<string> {
    const permissions = new Set<string>();
    const userRoles = this.userRoles.get(userId);
    
    if (!userRoles) {
      return permissions;
    }
    
    for (const roleId of userRoles) {
      const rolePermissions = this.getRolePermissions(roleId);
      rolePermissions.forEach(permission => permissions.add(permission));
    }
    
    return permissions;
  }
  
  private getRolePermissions(roleId: string): Set<string> {
    const permissions = new Set<string>();
    const role = this.roles.get(roleId);
    
    if (!role) {
      return permissions;
    }
    
    // Add direct permissions
    role.permissions.forEach(permission => permissions.add(permission));
    
    // Add inherited permissions
    const inheritedRoles = this.roleHierarchy.get(roleId);
    if (inheritedRoles) {
      for (const inheritedRole of inheritedRoles) {
        const inheritedPermissions = this.getRolePermissions(inheritedRole);
        inheritedPermissions.forEach(permission => permissions.add(permission));
      }
    }
    
    return permissions;
  }
}

// Secure Session Manager
class SecureSessionManager {
  private sessions = new Map<string, SessionData>();
  private sessionTimeout: number;
  private maxSessions: number;
  private encryptionKey: string;
  
  constructor(options: SessionOptions = {}) {
    this.sessionTimeout = options.timeout || 30 * 60 * 1000; // 30 minutes
    this.maxSessions = options.maxSessions || 5;
    this.encryptionKey = options.encryptionKey || this.generateEncryptionKey();
    
    // Cleanup expired sessions
    setInterval(() => this.cleanupExpiredSessions(), 5 * 60 * 1000); // 5 minutes
  }
  
  async createSession(userId: string, deviceInfo: DeviceInfo): Promise<string> {
    // Limit concurrent sessions
    this.limitUserSessions(userId);
    
    const sessionId = this.generateSessionId();
    const sessionData: SessionData = {
      id: sessionId,
      userId,
      deviceInfo,
      createdAt: Date.now(),
      lastAccessedAt: Date.now(),
      expiresAt: Date.now() + this.sessionTimeout,
      isActive: true,
      ipAddress: deviceInfo.ipAddress,
      userAgent: deviceInfo.userAgent
    };
    
    this.sessions.set(sessionId, sessionData);
    
    // Create secure session token
    const token = await this.createSessionToken(sessionData);
    
    return token;
  }
  
  async validateSession(token: string): Promise<SessionData | null> {
    try {
      const sessionData = await this.decryptSessionToken(token);
      const session = this.sessions.get(sessionData.id);
      
      if (!session || !session.isActive) {
        return null;
      }
      
      // Check expiration
      if (Date.now() > session.expiresAt) {
        this.invalidateSession(session.id);
        return null;
      }
      
      // Update last accessed time
      session.lastAccessedAt = Date.now();
      session.expiresAt = Date.now() + this.sessionTimeout;
      
      return session;
    } catch (error) {
      return null;
    }
  }
  
  invalidateSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
    }
  }
  
  invalidateAllUserSessions(userId: string): void {
    for (const session of this.sessions.values()) {
      if (session.userId === userId) {
        session.isActive = false;
      }
    }
  }
  
  getUserSessions(userId: string): SessionData[] {
    return Array.from(this.sessions.values())
      .filter(session => session.userId === userId && session.isActive);
  }
  
  private limitUserSessions(userId: string): void {
    const userSessions = this.getUserSessions(userId);
    
    if (userSessions.length >= this.maxSessions) {
      // Remove oldest session
      const oldestSession = userSessions
        .sort((a, b) => a.lastAccessedAt - b.lastAccessedAt)[0];
      
      this.invalidateSession(oldestSession.id);
    }
  }
  
  private cleanupExpiredSessions(): void {
    const now = Date.now();
    const expiredSessions = Array.from(this.sessions.entries())
      .filter(([_, session]) => now > session.expiresAt || !session.isActive);
    
    expiredSessions.forEach(([sessionId]) => {
      this.sessions.delete(sessionId);
    });
  }
  
  private generateSessionId(): string {
    return crypto.getRandomValues(new Uint8Array(32))
      .reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  }
  
  private generateEncryptionKey(): string {
    return crypto.getRandomValues(new Uint8Array(32))
      .reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  }
  
  private async createSessionToken(sessionData: SessionData): Promise<string> {
    const payload = {
      id: sessionData.id,
      userId: sessionData.userId,
      exp: sessionData.expiresAt
    };
    
    // In production, use proper JWT library with encryption
    const token = btoa(JSON.stringify(payload));
    return this.encrypt(token);
  }
  
  private async decryptSessionToken(token: string): Promise<{ id: string; userId: string; exp: number }> {
    const decrypted = this.decrypt(token);
    return JSON.parse(atob(decrypted));
  }
  
  private encrypt(data: string): string {
    // Simplified encryption - use proper crypto library in production
    return btoa(data + this.encryptionKey);
  }
  
  private decrypt(encryptedData: string): string {
    // Simplified decryption - use proper crypto library in production
    const decoded = atob(encryptedData);
    return decoded.substring(0, decoded.length - this.encryptionKey.length);
  }
}

// Rate Limiter
class RateLimiter {
  private attempts = new Map<string, AttemptRecord[]>();
  private windowMs: number;
  private maxAttempts: number;
  
  constructor(options: RateLimitOptions) {
    this.windowMs = options.windowMs;
    this.maxAttempts = options.maxAttempts;
    
    // Cleanup old records
    setInterval(() => this.cleanup(), this.windowMs);
  }
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(attempt => 
      now - attempt.timestamp < this.windowMs
    );
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Record this attempt
    validAttempts.push({ timestamp: now });
    this.attempts.set(identifier, validAttempts);
    
    return true;
  }
  
  getRemainingAttempts(identifier: string): number {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    const validAttempts = attempts.filter(attempt => 
      now - attempt.timestamp < this.windowMs
    );
    
    return Math.max(0, this.maxAttempts - validAttempts.length);
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
  
  private cleanup(): void {
    const now = Date.now();
    
    for (const [identifier, attempts] of this.attempts.entries()) {
      const validAttempts = attempts.filter(attempt => 
        now - attempt.timestamp < this.windowMs
      );
      
      if (validAttempts.length === 0) {
        this.attempts.delete(identifier);
      } else {
        this.attempts.set(identifier, validAttempts);
      }
    }
  }
}

// Interfaces
interface Role {
  id: string;
  name: string;
  permissions: Set<string>;
}

interface Permission {
  id: string;
  resource: string;
  action: string;
}

interface SessionData {
  id: string;
  userId: string;
  deviceInfo: DeviceInfo;
  createdAt: number;
  lastAccessedAt: number;
  expiresAt: number;
  isActive: boolean;
  ipAddress: string;
  userAgent: string;
}

interface DeviceInfo {
  ipAddress: string;
  userAgent: string;
  deviceId?: string;
  location?: string;
}

interface SessionOptions {
  timeout?: number;
  maxSessions?: number;
  encryptionKey?: string;
}

interface RateLimitOptions {
  windowMs: number;
  maxAttempts: number;
}

interface AttemptRecord {
  timestamp: number;
}
```

### Q5: How do you implement advanced threat detection and security monitoring?

**Answer:**
Advanced threat detection requires real-time monitoring, anomaly detection, and automated response systems to identify and mitigate security threats.

**Advanced Security Monitoring System:**
```typescript
// Security Event Monitor
class SecurityEventMonitor {
  private eventStore: SecurityEvent[] = [];
  private alertThresholds = new Map<string, AlertThreshold>();
  private anomalyDetector: AnomalyDetector;
  private responseSystem: SecurityResponseSystem;
  private maxEvents: number;
  
  constructor(
    private config: SecurityMonitorConfig,
    responseSystem: SecurityResponseSystem
  ) {
    this.maxEvents = config.maxEvents || 10000;
    this.anomalyDetector = new AnomalyDetector(config.anomalyConfig);
    this.responseSystem = responseSystem;
    
    this.setupDefaultThresholds();
    this.startMonitoring();
  }
  
  private setupDefaultThresholds(): void {
    this.alertThresholds.set('failed_login', {
      count: 5,
      timeWindow: 5 * 60 * 1000, // 5 minutes
      severity: 'medium'
    });
    
    this.alertThresholds.set('suspicious_activity', {
      count: 3,
      timeWindow: 10 * 60 * 1000, // 10 minutes
      severity: 'high'
    });
    
    this.alertThresholds.set('data_breach_attempt', {
      count: 1,
      timeWindow: 60 * 1000, // 1 minute
      severity: 'critical'
    });
  }
  
  recordEvent(event: Partial<SecurityEvent>): void {
    const securityEvent: SecurityEvent = {
      id: this.generateEventId(),
      timestamp: Date.now(),
      type: event.type || 'unknown',
      severity: event.severity || 'low',
      source: event.source || 'unknown',
      userId: event.userId,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      details: event.details || {},
      location: event.location
    };
    
    this.eventStore.push(securityEvent);
    
    // Maintain event store size
    if (this.eventStore.length > this.maxEvents) {
      this.eventStore.shift();
    }
    
    // Check for immediate threats
    this.analyzeEvent(securityEvent);
    
    // Check for patterns and anomalies
    this.checkForAnomalies(securityEvent);
    
    // Check alert thresholds
    this.checkAlertThresholds(securityEvent);
  }
  
  private analyzeEvent(event: SecurityEvent): void {
    // Immediate threat detection
    const threats = this.detectImmediateThreats(event);
    
    threats.forEach(threat => {
      this.responseSystem.handleThreat(threat);
    });
  }
  
  private detectImmediateThreats(event: SecurityEvent): SecurityThreat[] {
    const threats: SecurityThreat[] = [];
    
    // SQL Injection detection
    if (event.type === 'request' && event.details.query) {
      const sqlPatterns = [
        /('|(\-\-)|(;)|(\||\|)|(\*|\*))/i,
        /(union|select|insert|delete|update|drop|create|alter|exec|execute)/i
      ];
      
      if (sqlPatterns.some(pattern => pattern.test(event.details.query))) {
        threats.push({
          id: this.generateThreatId(),
          type: 'sql_injection',
          severity: 'high',
          event,
          description: 'Potential SQL injection attempt detected',
          timestamp: Date.now()
        });
      }
    }
    
    // XSS detection
    if (event.type === 'input' && event.details.value) {
      const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi
      ];
      
      if (xssPatterns.some(pattern => pattern.test(event.details.value))) {
        threats.push({
          id: this.generateThreatId(),
          type: 'xss_attempt',
          severity: 'high',
          event,
          description: 'Potential XSS attempt detected',
          timestamp: Date.now()
        });
      }
    }
    
    // Brute force detection
    if (event.type === 'failed_login') {
      const recentFailures = this.getRecentEvents('failed_login', event.ipAddress, 5 * 60 * 1000);
      
      if (recentFailures.length >= 5) {
        threats.push({
          id: this.generateThreatId(),
          type: 'brute_force',
          severity: 'medium',
          event,
          description: 'Brute force attack detected',
          timestamp: Date.now()
        });
      }
    }
    
    // Privilege escalation detection
    if (event.type === 'permission_change' && event.details.newRole) {
      const isEscalation = this.isPrivilegeEscalation(
        event.details.oldRole,
        event.details.newRole
      );
      
      if (isEscalation) {
        threats.push({
          id: this.generateThreatId(),
          type: 'privilege_escalation',
          severity: 'critical',
          event,
          description: 'Unauthorized privilege escalation detected',
          timestamp: Date.now()
        });
      }
    }
    
    return threats;
  }
  
  private checkForAnomalies(event: SecurityEvent): void {
    const anomalies = this.anomalyDetector.detectAnomalies(event, this.eventStore);
    
    anomalies.forEach(anomaly => {
      const threat: SecurityThreat = {
        id: this.generateThreatId(),
        type: 'anomaly',
        severity: anomaly.severity,
        event,
        description: anomaly.description,
        timestamp: Date.now(),
        metadata: anomaly.metadata
      };
      
      this.responseSystem.handleThreat(threat);
    });
  }
  
  private checkAlertThresholds(event: SecurityEvent): void {
    const threshold = this.alertThresholds.get(event.type);
    if (!threshold) return;
    
    const recentEvents = this.getRecentEvents(event.type, event.ipAddress, threshold.timeWindow);
    
    if (recentEvents.length >= threshold.count) {
      const alert: SecurityAlert = {
        id: this.generateAlertId(),
        type: event.type,
        severity: threshold.severity,
        count: recentEvents.length,
        timeWindow: threshold.timeWindow,
        events: recentEvents,
        timestamp: Date.now()
      };
      
      this.responseSystem.handleAlert(alert);
    }
  }
  
  private getRecentEvents(
    type: string,
    ipAddress?: string,
    timeWindow: number = 5 * 60 * 1000
  ): SecurityEvent[] {
    const cutoff = Date.now() - timeWindow;
    
    return this.eventStore.filter(event => 
      event.timestamp > cutoff &&
      event.type === type &&
      (!ipAddress || event.ipAddress === ipAddress)
    );
  }
  
  private isPrivilegeEscalation(oldRole: string, newRole: string): boolean {
    const roleHierarchy = {
      'guest': 0,
      'user': 1,
      'moderator': 2,
      'admin': 3,
      'superadmin': 4
    };
    
    const oldLevel = roleHierarchy[oldRole as keyof typeof roleHierarchy] || 0;
    const newLevel = roleHierarchy[newRole as keyof typeof roleHierarchy] || 0;
    
    return newLevel > oldLevel + 1; // More than one level jump is suspicious
  }
  
  private startMonitoring(): void {
    // Real-time monitoring
    setInterval(() => {
      this.performPeriodicAnalysis();
    }, 60 * 1000); // Every minute
    
    // Cleanup old events
    setInterval(() => {
      this.cleanupOldEvents();
    }, 60 * 60 * 1000); // Every hour
  }
  
  private performPeriodicAnalysis(): void {
    // Analyze patterns over time
    const patterns = this.analyzePatterns();
    
    patterns.forEach(pattern => {
      if (pattern.riskScore > 0.7) {
        const threat: SecurityThreat = {
          id: this.generateThreatId(),
          type: 'pattern_analysis',
          severity: pattern.riskScore > 0.9 ? 'critical' : 'high',
          event: pattern.events[0], // Representative event
          description: pattern.description,
          timestamp: Date.now(),
          metadata: { pattern, riskScore: pattern.riskScore }
        };
        
        this.responseSystem.handleThreat(threat);
      }
    });
  }
  
  private analyzePatterns(): SecurityPattern[] {
    const patterns: SecurityPattern[] = [];
    
    // Analyze IP-based patterns
    const ipGroups = this.groupEventsByIP();
    
    for (const [ip, events] of ipGroups) {
      const pattern = this.analyzeIPPattern(ip, events);
      if (pattern) {
        patterns.push(pattern);
      }
    }
    
    // Analyze user-based patterns
    const userGroups = this.groupEventsByUser();
    
    for (const [userId, events] of userGroups) {
      const pattern = this.analyzeUserPattern(userId, events);
      if (pattern) {
        patterns.push(pattern);
      }
    }
    
    return patterns;
  }
  
  private groupEventsByIP(): Map<string, SecurityEvent[]> {
    const groups = new Map<string, SecurityEvent[]>();
    
    this.eventStore.forEach(event => {
      if (event.ipAddress) {
        if (!groups.has(event.ipAddress)) {
          groups.set(event.ipAddress, []);
        }
        groups.get(event.ipAddress)!.push(event);
      }
    });
    
    return groups;
  }
  
  private groupEventsByUser(): Map<string, SecurityEvent[]> {
    const groups = new Map<string, SecurityEvent[]>();
    
    this.eventStore.forEach(event => {
      if (event.userId) {
        if (!groups.has(event.userId)) {
          groups.set(event.userId, []);
        }
        groups.get(event.userId)!.push(event);
      }
    });
    
    return groups;
  }
  
  private analyzeIPPattern(ip: string, events: SecurityEvent[]): SecurityPattern | null {
    if (events.length < 10) return null;
    
    const recentEvents = events.filter(e => Date.now() - e.timestamp < 60 * 60 * 1000); // Last hour
    
    if (recentEvents.length < 5) return null;
    
    let riskScore = 0;
    let description = '';
    
    // High frequency of events
    if (recentEvents.length > 50) {
      riskScore += 0.3;
      description += 'High frequency of events. ';
    }
    
    // Multiple failed logins
    const failedLogins = recentEvents.filter(e => e.type === 'failed_login');
    if (failedLogins.length > 10) {
      riskScore += 0.4;
      description += 'Multiple failed login attempts. ';
    }
    
    // Diverse attack types
    const attackTypes = new Set(recentEvents.map(e => e.type));
    if (attackTypes.size > 3) {
      riskScore += 0.3;
      description += 'Multiple attack vectors. ';
    }
    
    if (riskScore > 0.5) {
      return {
        id: this.generatePatternId(),
        type: 'ip_analysis',
        riskScore,
        description: `Suspicious activity from IP ${ip}: ${description}`,
        events: recentEvents,
        metadata: { ip, eventCount: recentEvents.length }
      };
    }
    
    return null;
  }
  
  private analyzeUserPattern(userId: string, events: SecurityEvent[]): SecurityPattern | null {
    if (events.length < 5) return null;
    
    const recentEvents = events.filter(e => Date.now() - e.timestamp < 24 * 60 * 60 * 1000); // Last 24 hours
    
    if (recentEvents.length < 3) return null;
    
    let riskScore = 0;
    let description = '';
    
    // Unusual login times
    const loginTimes = recentEvents
      .filter(e => e.type === 'login')
      .map(e => new Date(e.timestamp).getHours());
    
    const unusualHours = loginTimes.filter(hour => hour < 6 || hour > 22);
    if (unusualHours.length > 2) {
      riskScore += 0.2;
      description += 'Unusual login times. ';
    }
    
    // Multiple IP addresses
    const ipAddresses = new Set(recentEvents.map(e => e.ipAddress));
    if (ipAddresses.size > 3) {
      riskScore += 0.3;
      description += 'Multiple IP addresses. ';
    }
    
    // Permission changes
    const permissionChanges = recentEvents.filter(e => e.type === 'permission_change');
    if (permissionChanges.length > 1) {
      riskScore += 0.4;
      description += 'Multiple permission changes. ';
    }
    
    if (riskScore > 0.4) {
      return {
        id: this.generatePatternId(),
        type: 'user_analysis',
        riskScore,
        description: `Suspicious activity for user ${userId}: ${description}`,
        events: recentEvents,
        metadata: { userId, ipCount: ipAddresses.size }
      };
    }
    
    return null;
  }
  
  private cleanupOldEvents(): void {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours
    this.eventStore = this.eventStore.filter(event => event.timestamp > cutoff);
  }
  
  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  private generateThreatId(): string {
    return `thr_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  private generateAlertId(): string {
    return `alt_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  private generatePatternId(): string {
    return `pat_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  getSecurityReport(timeRange: number = 24 * 60 * 60 * 1000): SecurityReport {
    const cutoff = Date.now() - timeRange;
    const recentEvents = this.eventStore.filter(event => event.timestamp > cutoff);
    
    const eventsByType = new Map<string, number>();
    const eventsBySeverity = new Map<string, number>();
    const topIPs = new Map<string, number>();
    
    recentEvents.forEach(event => {
      // Count by type
      eventsByType.set(event.type, (eventsByType.get(event.type) || 0) + 1);
      
      // Count by severity
      eventsBySeverity.set(event.severity, (eventsBySeverity.get(event.severity) || 0) + 1);
      
      // Count by IP
      if (event.ipAddress) {
        topIPs.set(event.ipAddress, (topIPs.get(event.ipAddress) || 0) + 1);
      }
    });
    
    return {
      timeRange,
      totalEvents: recentEvents.length,
      eventsByType: Object.fromEntries(eventsByType),
      eventsBySeverity: Object.fromEntries(eventsBySeverity),
      topIPs: Object.fromEntries(
        Array.from(topIPs.entries())
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
      ),
      generatedAt: Date.now()
    };
  }
}

// Anomaly Detector
class AnomalyDetector {
  private baselines = new Map<string, Baseline>();
  
  constructor(private config: AnomalyConfig) {
    this.initializeBaselines();
  }
  
  private initializeBaselines(): void {
    // Initialize baseline patterns for normal behavior
    this.baselines.set('login_frequency', {
      metric: 'login_frequency',
      mean: 5, // Average logins per hour
      stdDev: 2,
      threshold: 3 // 3 standard deviations
    });
    
    this.baselines.set('request_rate', {
      metric: 'request_rate',
      mean: 100, // Average requests per minute
      stdDev: 20,
      threshold: 2.5
    });
  }
  
  detectAnomalies(event: SecurityEvent, eventHistory: SecurityEvent[]): Anomaly[] {
    const anomalies: Anomaly[] = [];
    
    // Detect frequency anomalies
    const frequencyAnomaly = this.detectFrequencyAnomaly(event, eventHistory);
    if (frequencyAnomaly) {
      anomalies.push(frequencyAnomaly);
    }
    
    // Detect geographic anomalies
    const geoAnomaly = this.detectGeographicAnomaly(event, eventHistory);
    if (geoAnomaly) {
      anomalies.push(geoAnomaly);
    }
    
    // Detect behavioral anomalies
    const behaviorAnomaly = this.detectBehavioralAnomaly(event, eventHistory);
    if (behaviorAnomaly) {
      anomalies.push(behaviorAnomaly);
    }
    
    return anomalies;
  }
  
  private detectFrequencyAnomaly(event: SecurityEvent, eventHistory: SecurityEvent[]): Anomaly | null {
    if (!event.userId) return null;
    
    const userEvents = eventHistory.filter(e => 
      e.userId === event.userId && 
      e.type === event.type &&
      Date.now() - e.timestamp < 60 * 60 * 1000 // Last hour
    );
    
    const baseline = this.baselines.get('login_frequency');
    if (!baseline) return null;
    
    const frequency = userEvents.length;
    const zScore = Math.abs(frequency - baseline.mean) / baseline.stdDev;
    
    if (zScore > baseline.threshold) {
      return {
        id: this.generateAnomalyId(),
        type: 'frequency',
        severity: zScore > baseline.threshold * 1.5 ? 'high' : 'medium',
        description: `Unusual ${event.type} frequency for user ${event.userId}`,
        metadata: {
          frequency,
          expected: baseline.mean,
          zScore
        }
      };
    }
    
    return null;
  }
  
  private detectGeographicAnomaly(event: SecurityEvent, eventHistory: SecurityEvent[]): Anomaly | null {
    if (!event.userId || !event.location) return null;
    
    const userEvents = eventHistory.filter(e => 
      e.userId === event.userId && 
      e.location &&
      Date.now() - e.timestamp < 7 * 24 * 60 * 60 * 1000 // Last week
    );
    
    if (userEvents.length < 5) return null;
    
    const locations = userEvents.map(e => e.location!);
    const uniqueLocations = new Set(locations);
    
    // Check if current location is significantly different
    if (!uniqueLocations.has(event.location) && uniqueLocations.size < 3) {
      return {
        id: this.generateAnomalyId(),
        type: 'geographic',
        severity: 'medium',
        description: `Unusual login location for user ${event.userId}`,
        metadata: {
          currentLocation: event.location,
          usualLocations: Array.from(uniqueLocations)
        }
      };
    }
    
    return null;
  }
  
  private detectBehavioralAnomaly(event: SecurityEvent, eventHistory: SecurityEvent[]): Anomaly | null {
    if (!event.userId) return null;
    
    const userEvents = eventHistory.filter(e => 
      e.userId === event.userId &&
      Date.now() - e.timestamp < 30 * 24 * 60 * 60 * 1000 // Last 30 days
    );
    
    if (userEvents.length < 20) return null;
    
    // Analyze typical behavior patterns
    const typicalHours = this.getTypicalActiveHours(userEvents);
    const currentHour = new Date(event.timestamp).getHours();
    
    if (!typicalHours.includes(currentHour)) {
      return {
        id: this.generateAnomalyId(),
        type: 'behavioral',
        severity: 'low',
        description: `Unusual activity time for user ${event.userId}`,
        metadata: {
          currentHour,
          typicalHours
        }
      };
    }
    
    return null;
  }
  
  private getTypicalActiveHours(events: SecurityEvent[]): number[] {
    const hourCounts = new Map<number, number>();
    
    events.forEach(event => {
      const hour = new Date(event.timestamp).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });
    
    const totalEvents = events.length;
    const threshold = totalEvents * 0.05; // 5% threshold
    
    return Array.from(hourCounts.entries())
      .filter(([_, count]) => count > threshold)
      .map(([hour]) => hour);
  }
  
  private generateAnomalyId(): string {
    return `ano_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
}

// Security Response System
class SecurityResponseSystem {
  private responseActions = new Map<string, ResponseAction[]>();
  private blockedIPs = new Set<string>();
  private suspendedUsers = new Set<string>();
  
  constructor() {
    this.initializeResponseActions();
  }
  
  private initializeResponseActions(): void {
    this.responseActions.set('brute_force', [
      { type: 'block_ip', duration: 60 * 60 * 1000 }, // 1 hour
      { type: 'alert_admin', priority: 'medium' }
    ]);
    
    this.responseActions.set('sql_injection', [
      { type: 'block_ip', duration: 24 * 60 * 60 * 1000 }, // 24 hours
      { type: 'alert_admin', priority: 'high' },
      { type: 'log_incident', severity: 'high' }
    ]);
    
    this.responseActions.set('privilege_escalation', [
      { type: 'suspend_user', duration: 24 * 60 * 60 * 1000 },
      { type: 'alert_admin', priority: 'critical' },
      { type: 'log_incident', severity: 'critical' }
    ]);
  }
  
  handleThreat(threat: SecurityThreat): void {
    const actions = this.responseActions.get(threat.type) || [];
    
    actions.forEach(action => {
      this.executeAction(action, threat);
    });
  }
  
  handleAlert(alert: SecurityAlert): void {
    // Log alert
    console.warn('Security Alert:', alert);
    
    // Execute appropriate response based on severity
    if (alert.severity === 'critical') {
      this.executeAction({ type: 'alert_admin', priority: 'critical' }, null);
    }
  }
  
  private executeAction(action: ResponseAction, threat: SecurityThreat | null): void {
    switch (action.type) {
      case 'block_ip':
        if (threat?.event.ipAddress) {
          this.blockIP(threat.event.ipAddress, action.duration || 60 * 60 * 1000);
        }
        break;
        
      case 'suspend_user':
        if (threat?.event.userId) {
          this.suspendUser(threat.event.userId, action.duration || 24 * 60 * 60 * 1000);
        }
        break;
        
      case 'alert_admin':
        this.alertAdmin(threat, action.priority || 'medium');
        break;
        
      case 'log_incident':
        this.logIncident(threat, action.severity || 'medium');
        break;
    }
  }
  
  private blockIP(ipAddress: string, duration: number): void {
    this.blockedIPs.add(ipAddress);
    
    setTimeout(() => {
      this.blockedIPs.delete(ipAddress);
    }, duration);
    
    console.log(`Blocked IP ${ipAddress} for ${duration}ms`);
  }
  
  private suspendUser(userId: string, duration: number): void {
    this.suspendedUsers.add(userId);
    
    setTimeout(() => {
      this.suspendedUsers.delete(userId);
    }, duration);
    
    console.log(`Suspended user ${userId} for ${duration}ms`);
  }
  
  private alertAdmin(threat: SecurityThreat | null, priority: string): void {
    // In production, send email/SMS/Slack notification
    console.error(`ADMIN ALERT [${priority.toUpperCase()}]:`, threat);
  }
  
  private logIncident(threat: SecurityThreat | null, severity: string): void {
    // In production, log to security incident management system
    console.log(`SECURITY INCIDENT [${severity.toUpperCase()}]:`, threat);
  }
  
  isIPBlocked(ipAddress: string): boolean {
    return this.blockedIPs.has(ipAddress);
  }
  
  isUserSuspended(userId: string): boolean {
    return this.suspendedUsers.has(userId);
  }
}

// Interfaces
interface SecurityEvent {
  id: string;
  timestamp: number;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details: Record<string, any>;
  location?: string;
}

interface SecurityThreat {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  event: SecurityEvent;
  description: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface SecurityAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  count: number;
  timeWindow: number;
  events: SecurityEvent[];
  timestamp: number;
}

interface SecurityPattern {
  id: string;
  type: string;
  riskScore: number;
  description: string;
  events: SecurityEvent[];
  metadata: Record<string, any>;
}

interface Anomaly {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  metadata: Record<string, any>;
}

interface Baseline {
  metric: string;
  mean: number;
  stdDev: number;
  threshold: number;
}

interface ResponseAction {
  type: 'block_ip' | 'suspend_user' | 'alert_admin' | 'log_incident';
  duration?: number;
  priority?: string;
  severity?: string;
}

interface SecurityMonitorConfig {
  maxEvents?: number;
  anomalyConfig?: AnomalyConfig;
}

interface AnomalyConfig {
  enableFrequencyDetection?: boolean;
  enableGeographicDetection?: boolean;
  enableBehavioralDetection?: boolean;
}

interface AlertThreshold {
  count: number;
  timeWindow: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface SecurityReport {
  timeRange: number;
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsBySeverity: Record<string, number>;
  topIPs: Record<string, number>;
  generatedAt: number;
}

// Usage Example
const responseSystem = new SecurityResponseSystem();
const securityMonitor = new SecurityEventMonitor(
  {
    maxEvents: 10000,
    anomalyConfig: {
      enableFrequencyDetection: true,
      enableGeographicDetection: true,
      enableBehavioralDetection: true
    }
  },
  responseSystem
);

// Record security events
securityMonitor.recordEvent({
  type: 'failed_login',
  severity: 'medium',
  source: 'web_app',
  userId: 'user123',
  ipAddress: '192.168.1.100',
  userAgent: 'Mozilla/5.0...',
  details: { username: 'admin', reason: 'invalid_password' }
});

// Generate security report
const report = securityMonitor.getSecurityReport(24 * 60 * 60 * 1000); // Last 24 hours
console.log('Security Report:', report);
```

---

### Q6: How do you implement advanced security monitoring and incident response automation?

**Answer:**
Advanced security monitoring requires real-time threat detection, automated incident response, and comprehensive security analytics with machine learning capabilities.

**Security Operations Center (SOC) Implementation:**
```typescript
// security-operations.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, interval } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

interface SecurityIncident {
  id: string;
  type: IncidentType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  timestamp: number;
  source: string;
  description: string;
  indicators: SecurityIndicator[];
  response: IncidentResponse;
  metadata: Record<string, any>;
}

interface SecurityIndicator {
  type: 'ip' | 'domain' | 'hash' | 'user_agent' | 'pattern';
  value: string;
  confidence: number;
  source: string;
}

interface IncidentResponse {
  actions: ResponseAction[];
  assignee?: string;
  escalationLevel: number;
  timeline: ResponseTimeline[];
}

interface ResponseTimeline {
  timestamp: number;
  action: string;
  actor: string;
  details: string;
}

type IncidentType = 
  | 'brute_force_attack'
  | 'sql_injection'
  | 'xss_attempt'
  | 'privilege_escalation'
  | 'data_exfiltration'
  | 'malware_detection'
  | 'anomalous_behavior'
  | 'policy_violation';

@Injectable({
  providedIn: 'root'
})
export class SecurityOperationsService {
  private incidents$ = new BehaviorSubject<SecurityIncident[]>([]);
  private realTimeAlerts$ = new Subject<SecurityAlert>();
  private wsConnection: WebSocketSubject<any>;
  private threatIntelligence = new Map<string, ThreatIntelData>();
  
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private mlService: MachineLearningService
  ) {
    this.initializeWebSocket();
    this.startThreatIntelligenceSync();
  }
  
  private initializeWebSocket(): void {
    this.wsConnection = new WebSocketSubject({
      url: 'wss://security-api.company.com/incidents',
      openObserver: {
        next: () => console.log('Security WebSocket connected')
      },
      closeObserver: {
        next: () => console.log('Security WebSocket disconnected')
      }
    });
    
    this.wsConnection.subscribe({
      next: (message) => this.handleRealTimeSecurityEvent(message),
      error: (error) => console.error('Security WebSocket error:', error)
    });
  }
  
  private handleRealTimeSecurityEvent(event: any): void {
    switch (event.type) {
      case 'new_incident':
        this.processNewIncident(event.data);
        break;
      case 'incident_update':
        this.updateIncident(event.data);
        break;
      case 'threat_intelligence_update':
        this.updateThreatIntelligence(event.data);
        break;
      case 'security_alert':
        this.processSecurityAlert(event.data);
        break;
    }
  }
  
  private processNewIncident(incidentData: any): void {
    const incident: SecurityIncident = {
      ...incidentData,
      response: {
        actions: [],
        escalationLevel: 0,
        timeline: [{
          timestamp: Date.now(),
          action: 'incident_created',
          actor: 'system',
          details: 'Incident automatically created by security monitoring'
        }]
      }
    };
    
    // Enrich incident with threat intelligence
    this.enrichIncidentWithThreatIntel(incident);
    
    // Apply automated response rules
    this.applyAutomatedResponse(incident);
    
    // Update incidents list
    const currentIncidents = this.incidents$.value;
    this.incidents$.next([...currentIncidents, incident]);
    
    // Trigger real-time alert
    this.realTimeAlerts$.next({
      type: 'new_incident',
      severity: incident.severity,
      message: `New ${incident.severity} severity incident: ${incident.description}`,
      timestamp: Date.now()
    });
  }
  
  private enrichIncidentWithThreatIntel(incident: SecurityIncident): void {
    incident.indicators.forEach(indicator => {
      const threatData = this.threatIntelligence.get(indicator.value);
      if (threatData) {
        indicator.confidence = Math.max(indicator.confidence, threatData.confidence);
        incident.metadata.threatIntelligence = {
          ...incident.metadata.threatIntelligence,
          [indicator.value]: threatData
        };
      }
    });
  }
  
  private applyAutomatedResponse(incident: SecurityIncident): void {
    const responseRules = this.getResponseRules(incident.type, incident.severity);
    
    responseRules.forEach(rule => {
      if (this.evaluateRuleConditions(rule, incident)) {
        const action = this.executeResponseAction(rule.action, incident);
        incident.response.actions.push(action);
        incident.response.timeline.push({
          timestamp: Date.now(),
          action: rule.action.type,
          actor: 'automated_response',
          details: `Executed ${rule.action.type} based on rule: ${rule.name}`
        });
      }
    });
  }
  
  private getResponseRules(type: IncidentType, severity: string): ResponseRule[] {
    const rules: ResponseRule[] = [
      {
        name: 'Block Malicious IP',
        conditions: {
          types: ['brute_force_attack', 'sql_injection'],
          minSeverity: 'medium',
          indicators: ['ip']
        },
        action: {
          type: 'block_ip',
          duration: 3600000, // 1 hour
          priority: 'high'
        }
      },
      {
        name: 'Suspend Compromised User',
        conditions: {
          types: ['privilege_escalation', 'anomalous_behavior'],
          minSeverity: 'high',
          indicators: ['user_id']
        },
        action: {
          type: 'suspend_user',
          duration: 86400000, // 24 hours
          priority: 'critical'
        }
      },
      {
        name: 'Escalate Critical Incidents',
        conditions: {
          types: ['data_exfiltration', 'malware_detection'],
          minSeverity: 'critical'
        },
        action: {
          type: 'escalate_to_soc',
          priority: 'immediate'
        }
      }
    ];
    
    return rules.filter(rule => 
      rule.conditions.types.includes(type) &&
      this.compareSeverity(severity, rule.conditions.minSeverity) >= 0
    );
  }
  
  // Security Analytics Dashboard
  getSecurityMetrics(timeRange: number): Observable<SecurityMetrics> {
    return this.http.get<SecurityMetrics>(
      `/api/security/metrics?timeRange=${timeRange}`
    ).pipe(
      map(metrics => ({
        ...metrics,
        riskScore: this.calculateRiskScore(metrics),
        trends: this.analyzeTrends(metrics)
      }))
    );
  }
  
  private calculateRiskScore(metrics: SecurityMetrics): number {
    const weights = {
      criticalIncidents: 0.4,
      highIncidents: 0.3,
      mediumIncidents: 0.2,
      lowIncidents: 0.1
    };
    
    return (
      metrics.incidents.critical * weights.criticalIncidents +
      metrics.incidents.high * weights.highIncidents +
      metrics.incidents.medium * weights.mediumIncidents +
      metrics.incidents.low * weights.lowIncidents
    ) / metrics.totalIncidents * 100;
  }
  
  // Machine Learning Integration
  async detectAnomalies(userBehavior: UserBehaviorData): Promise<AnomalyDetectionResult> {
    const features = this.extractBehaviorFeatures(userBehavior);
    const prediction = await this.mlService.predict('anomaly_detection', features);
    
    return {
      isAnomalous: prediction.anomaly_score > 0.7,
      confidence: prediction.confidence,
      anomalyScore: prediction.anomaly_score,
      factors: prediction.contributing_factors,
      recommendations: this.generateRecommendations(prediction)
    };
  }
  
  private extractBehaviorFeatures(behavior: UserBehaviorData): number[] {
    return [
      behavior.loginFrequency,
      behavior.sessionDuration,
      behavior.geographicVariance,
      behavior.deviceVariance,
      behavior.accessPatternVariance,
      behavior.timeOfDayVariance,
      behavior.dataAccessVolume,
      behavior.privilegeUsage
    ];
  }
}
```

**Advanced Threat Detection Engine:**
```typescript
// threat-detection.service.ts
@Injectable({
  providedIn: 'root'
})
export class ThreatDetectionService {
  private detectionRules = new Map<string, DetectionRule>();
  private behaviorBaselines = new Map<string, UserBaseline>();
  private threatSignatures = new Map<string, ThreatSignature>();
  
  constructor(
    private mlService: MachineLearningService,
    private geoService: GeolocationService,
    private deviceService: DeviceFingerprintService
  ) {
    this.initializeDetectionRules();
    this.loadThreatSignatures();
  }
  
  async analyzeSecurityEvent(event: SecurityEvent): Promise<ThreatAnalysisResult> {
    const analyses = await Promise.all([
      this.performSignatureAnalysis(event),
      this.performBehavioralAnalysis(event),
      this.performGeographicAnalysis(event),
      this.performFrequencyAnalysis(event),
      this.performMLAnalysis(event)
    ]);
    
    return this.aggregateAnalysisResults(analyses, event);
  }
  
  private async performSignatureAnalysis(event: SecurityEvent): Promise<AnalysisResult> {
    const matchedSignatures: ThreatSignature[] = [];
    
    for (const [id, signature] of this.threatSignatures) {
      if (this.matchesSignature(event, signature)) {
        matchedSignatures.push(signature);
      }
    }
    
    const maxSeverity = matchedSignatures.reduce((max, sig) => 
      this.compareSeverity(sig.severity, max) > 0 ? sig.severity : max, 'low'
    );
    
    return {
      type: 'signature',
      confidence: matchedSignatures.length > 0 ? 0.9 : 0.1,
      severity: maxSeverity,
      details: {
        matchedSignatures: matchedSignatures.map(s => s.name),
        signatureCount: matchedSignatures.length
      }
    };
  }
  
  private async performBehavioralAnalysis(event: SecurityEvent): Promise<AnalysisResult> {
    if (!event.userId) {
      return { type: 'behavioral', confidence: 0, severity: 'low', details: {} };
    }
    
    const baseline = this.behaviorBaselines.get(event.userId);
    if (!baseline) {
      // Create new baseline
      this.createUserBaseline(event.userId, event);
      return { type: 'behavioral', confidence: 0.1, severity: 'low', details: {} };
    }
    
    const deviations = this.calculateBehavioralDeviations(event, baseline);
    const anomalyScore = this.calculateAnomalyScore(deviations);
    
    return {
      type: 'behavioral',
      confidence: anomalyScore,
      severity: this.mapAnomalyScoreToSeverity(anomalyScore),
      details: {
        deviations,
        anomalyScore,
        baseline: baseline.summary
      }
    };
  }
  
  private async performGeographicAnalysis(event: SecurityEvent): Promise<AnalysisResult> {
    if (!event.ipAddress) {
      return { type: 'geographic', confidence: 0, severity: 'low', details: {} };
    }
    
    const geoData = await this.geoService.getLocationData(event.ipAddress);
    const userHistory = await this.getUserLocationHistory(event.userId);
    
    const isUnusualLocation = this.isUnusualLocation(geoData, userHistory);
    const isSuspiciousCountry = this.isSuspiciousCountry(geoData.country);
    const travelTime = this.calculateMinimumTravelTime(geoData, userHistory);
    
    let confidence = 0;
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    
    if (isUnusualLocation) confidence += 0.3;
    if (isSuspiciousCountry) confidence += 0.4;
    if (travelTime < 3600000) confidence += 0.5; // Less than 1 hour travel time
    
    if (confidence > 0.7) severity = 'high';
    else if (confidence > 0.4) severity = 'medium';
    
    return {
      type: 'geographic',
      confidence,
      severity,
      details: {
        location: geoData,
        isUnusualLocation,
        isSuspiciousCountry,
        minimumTravelTime: travelTime
      }
    };
  }
  
  private async performMLAnalysis(event: SecurityEvent): Promise<AnalysisResult> {
    const features = this.extractEventFeatures(event);
    const predictions = await Promise.all([
      this.mlService.predict('threat_classification', features),
      this.mlService.predict('anomaly_detection', features),
      this.mlService.predict('attack_prediction', features)
    ]);
    
    const [threatClass, anomaly, attack] = predictions;
    
    const confidence = Math.max(
      threatClass.confidence,
      anomaly.confidence,
      attack.confidence
    );
    
    return {
      type: 'machine_learning',
      confidence,
      severity: this.mapMLPredictionToSeverity(predictions),
      details: {
        threatClassification: threatClass,
        anomalyDetection: anomaly,
        attackPrediction: attack
      }
    };
  }
  
  private aggregateAnalysisResults(
    analyses: AnalysisResult[], 
    event: SecurityEvent
  ): ThreatAnalysisResult {
    const weightedConfidence = analyses.reduce((sum, analysis) => {
      const weight = this.getAnalysisWeight(analysis.type);
      return sum + (analysis.confidence * weight);
    }, 0);
    
    const maxSeverity = analyses.reduce((max, analysis) => 
      this.compareSeverity(analysis.severity, max) > 0 ? analysis.severity : max, 'low'
    );
    
    const riskScore = this.calculateRiskScore(weightedConfidence, maxSeverity, event);
    
    return {
      eventId: event.id,
      overallConfidence: weightedConfidence,
      severity: maxSeverity,
      riskScore,
      analyses,
      recommendations: this.generateThreatRecommendations(analyses, riskScore),
      timestamp: Date.now()
    };
  }
  
  private generateThreatRecommendations(
    analyses: AnalysisResult[], 
    riskScore: number
  ): ThreatRecommendation[] {
    const recommendations: ThreatRecommendation[] = [];
    
    if (riskScore > 80) {
      recommendations.push({
        action: 'immediate_investigation',
        priority: 'critical',
        description: 'High-risk threat detected - immediate investigation required'
      });
    }
    
    analyses.forEach(analysis => {
      switch (analysis.type) {
        case 'signature':
          if (analysis.confidence > 0.8) {
            recommendations.push({
              action: 'block_source',
              priority: 'high',
              description: 'Known threat signature detected - consider blocking source'
            });
          }
          break;
        case 'behavioral':
          if (analysis.confidence > 0.7) {
            recommendations.push({
              action: 'verify_user_identity',
              priority: 'medium',
              description: 'Unusual user behavior detected - verify identity'
            });
          }
          break;
        case 'geographic':
          if (analysis.confidence > 0.6) {
            recommendations.push({
              action: 'additional_authentication',
              priority: 'medium',
              description: 'Unusual geographic access - require additional authentication'
            });
          }
          break;
      }
    });
    
    return recommendations;
  }
}
```

---

### Q7: How do you implement comprehensive security compliance and audit frameworks?

**Answer:**
Implementing comprehensive security compliance requires automated compliance monitoring, audit trail management, and regulatory framework adherence with continuous assessment capabilities.

**Compliance Framework Implementation:**
```typescript
// compliance.service.ts
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';

interface ComplianceFramework {
  name: string;
  version: string;
  controls: ComplianceControl[];
  assessmentFrequency: number;
  lastAssessment?: number;
  status: 'compliant' | 'non_compliant' | 'partial' | 'unknown';
}

interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  implementation: ControlImplementation;
  evidence: ComplianceEvidence[];
  status: 'implemented' | 'partial' | 'not_implemented' | 'not_applicable';
  lastAssessed: number;
  nextAssessment: number;
}

interface ControlImplementation {
  type: 'automated' | 'manual' | 'hybrid';
  automatedChecks: AutomatedCheck[];
  manualProcedures: ManualProcedure[];
  documentation: string[];
}

interface ComplianceEvidence {
  id: string;
  type: 'document' | 'screenshot' | 'log' | 'certificate' | 'report';
  description: string;
  filePath?: string;
  hash?: string;
  timestamp: number;
  validUntil?: number;
}

interface AuditTrail {
  id: string;
  timestamp: number;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  outcome: 'success' | 'failure' | 'partial';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {
  private frameworks = new Map<string, ComplianceFramework>();
  private auditTrail$ = new BehaviorSubject<AuditTrail[]>([]);
  private complianceStatus$ = new BehaviorSubject<ComplianceStatus>({});
  
  constructor(
    private http: HttpClient,
    private cryptoService: CryptographyService,
    private documentService: DocumentService
  ) {
    this.initializeFrameworks();
    this.startContinuousMonitoring();
  }
  
  private initializeFrameworks(): void {
    // SOC 2 Type II Framework
    this.frameworks.set('soc2', {
      name: 'SOC 2 Type II',
      version: '2017',
      controls: this.getSOC2Controls(),
      assessmentFrequency: 86400000, // Daily
      status: 'unknown'
    });
    
    // ISO 27001 Framework
    this.frameworks.set('iso27001', {
      name: 'ISO 27001',
      version: '2013',
      controls: this.getISO27001Controls(),
      assessmentFrequency: 604800000, // Weekly
      status: 'unknown'
    });
    
    // GDPR Compliance
    this.frameworks.set('gdpr', {
      name: 'GDPR',
      version: '2018',
      controls: this.getGDPRControls(),
      assessmentFrequency: 86400000, // Daily
      status: 'unknown'
    });
    
    // HIPAA Compliance
    this.frameworks.set('hipaa', {
      name: 'HIPAA',
      version: '2013',
      controls: this.getHIPAAControls(),
      assessmentFrequency: 86400000, // Daily
      status: 'unknown'
    });
  }
  
  private getSOC2Controls(): ComplianceControl[] {
    return [
      {
        id: 'CC6.1',
        name: 'Logical and Physical Access Controls',
        description: 'The entity implements logical and physical access controls to protect against threats from sources outside its system boundaries.',
        category: 'Common Criteria',
        severity: 'high',
        implementation: {
          type: 'automated',
          automatedChecks: [
            {
              name: 'Multi-Factor Authentication Check',
              frequency: 3600000, // Hourly
              script: 'check_mfa_enforcement.js',
              expectedResult: 'all_users_mfa_enabled'
            },
            {
              name: 'Access Control Matrix Validation',
              frequency: 86400000, // Daily
              script: 'validate_access_matrix.js',
              expectedResult: 'rbac_properly_configured'
            }
          ],
          manualProcedures: [
            {
              name: 'Physical Access Review',
              frequency: 2592000000, // Monthly
              description: 'Review physical access logs and badge access records',
              responsible: 'security_team'
            }
          ],
          documentation: [
            'access_control_policy.pdf',
            'mfa_implementation_guide.pdf'
          ]
        },
        evidence: [],
        status: 'not_implemented',
        lastAssessed: 0,
        nextAssessment: Date.now()
      },
      {
        id: 'CC6.2',
        name: 'System Access Monitoring',
        description: 'The entity monitors system components and the operation of controls.',
        category: 'Common Criteria',
        severity: 'high',
        implementation: {
          type: 'automated',
          automatedChecks: [
            {
              name: 'Security Event Monitoring',
              frequency: 300000, // 5 minutes
              script: 'check_security_monitoring.js',
              expectedResult: 'monitoring_active'
            },
            {
              name: 'Audit Log Integrity',
              frequency: 3600000, // Hourly
              script: 'verify_audit_logs.js',
              expectedResult: 'logs_intact_and_complete'
            }
          ],
          manualProcedures: [],
          documentation: [
            'monitoring_procedures.pdf',
            'incident_response_plan.pdf'
          ]
        },
        evidence: [],
        status: 'not_implemented',
        lastAssessed: 0,
        nextAssessment: Date.now()
      }
    ];
  }
  
  async performComplianceAssessment(frameworkId: string): Promise<ComplianceAssessmentResult> {
    const framework = this.frameworks.get(frameworkId);
    if (!framework) {
      throw new Error(`Framework ${frameworkId} not found`);
    }
    
    const controlResults: ControlAssessmentResult[] = [];
    
    for (const control of framework.controls) {
      const result = await this.assessControl(control);
      controlResults.push(result);
      
      // Update control status
      control.status = result.status;
      control.lastAssessed = Date.now();
      control.nextAssessment = Date.now() + this.getAssessmentInterval(control);
      
      // Collect evidence
      if (result.evidence) {
        control.evidence.push(...result.evidence);
      }
    }
    
    // Calculate overall compliance score
    const complianceScore = this.calculateComplianceScore(controlResults);
    framework.status = this.determineFrameworkStatus(complianceScore);
    framework.lastAssessment = Date.now();
    
    const assessmentResult: ComplianceAssessmentResult = {
      frameworkId,
      frameworkName: framework.name,
      assessmentDate: Date.now(),
      overallScore: complianceScore,
      status: framework.status,
      controlResults,
      recommendations: this.generateComplianceRecommendations(controlResults),
      nextAssessment: Date.now() + framework.assessmentFrequency
    };
    
    // Store assessment result
    await this.storeAssessmentResult(assessmentResult);
    
    return assessmentResult;
  }
  
  private async assessControl(control: ComplianceControl): Promise<ControlAssessmentResult> {
    const automatedResults: AutomatedCheckResult[] = [];
    const manualResults: ManualCheckResult[] = [];
    
    // Run automated checks
    for (const check of control.implementation.automatedChecks) {
      try {
        const result = await this.runAutomatedCheck(check);
        automatedResults.push(result);
      } catch (error) {
        automatedResults.push({
          checkName: check.name,
          status: 'failed',
          error: error.message,
          timestamp: Date.now()
        });
      }
    }
    
    // Check manual procedures
    for (const procedure of control.implementation.manualProcedures) {
      const result = await this.checkManualProcedure(procedure);
      manualResults.push(result);
    }
    
    // Determine overall control status
    const overallStatus = this.determineControlStatus(automatedResults, manualResults);
    
    return {
      controlId: control.id,
      controlName: control.name,
      status: overallStatus,
      automatedResults,
      manualResults,
      evidence: await this.collectControlEvidence(control),
      assessmentDate: Date.now(),
      nextAssessment: Date.now() + this.getAssessmentInterval(control)
    };
  }
  
  // Audit Trail Management
  async recordAuditEvent(event: Partial<AuditTrail>): Promise<void> {
    const auditEntry: AuditTrail = {
      id: this.generateAuditId(),
      timestamp: Date.now(),
      userId: event.userId || 'system',
      action: event.action || 'unknown',
      resource: event.resource || 'unknown',
      details: event.details || {},
      ipAddress: event.ipAddress || 'unknown',
      userAgent: event.userAgent || 'unknown',
      sessionId: event.sessionId || 'unknown',
      outcome: event.outcome || 'success',
      riskLevel: event.riskLevel || 'low'
    };
    
    // Encrypt sensitive audit data
    const encryptedEntry = await this.encryptAuditEntry(auditEntry);
    
    // Store in secure audit log
    await this.storeAuditEntry(encryptedEntry);
    
    // Update real-time audit trail
    const currentTrail = this.auditTrail$.value;
    this.auditTrail$.next([encryptedEntry, ...currentTrail.slice(0, 999)]); // Keep last 1000 entries
    
    // Check for suspicious patterns
    await this.analyzeSuspiciousPatterns(auditEntry);
  }
  
  private async analyzeSuspiciousPatterns(entry: AuditTrail): Promise<void> {
    const recentEntries = await this.getRecentAuditEntries(entry.userId, 3600000); // Last hour
    
    // Check for unusual activity patterns
    const patterns = [
      this.checkFailedLoginPattern(recentEntries),
      this.checkPrivilegeEscalationPattern(recentEntries),
      this.checkDataAccessPattern(recentEntries),
      this.checkGeographicAnomalies(recentEntries)
    ];
    
    const suspiciousPatterns = patterns.filter(pattern => pattern.isSuspicious);
    
    if (suspiciousPatterns.length > 0) {
      await this.triggerSecurityAlert({
        type: 'suspicious_audit_pattern',
        severity: 'medium',
        userId: entry.userId,
        patterns: suspiciousPatterns,
        timestamp: Date.now()
      });
    }
  }
  
  // Compliance Reporting
  async generateComplianceReport(
    frameworkId: string, 
    timeRange: { start: number; end: number }
  ): Promise<ComplianceReport> {
    const framework = this.frameworks.get(frameworkId);
    if (!framework) {
      throw new Error(`Framework ${frameworkId} not found`);
    }
    
    const assessments = await this.getAssessmentHistory(frameworkId, timeRange);
    const auditEvents = await this.getAuditEvents(timeRange);
    const securityIncidents = await this.getSecurityIncidents(timeRange);
    
    return {
      frameworkId,
      frameworkName: framework.name,
      reportPeriod: timeRange,
      generatedAt: Date.now(),
      overallCompliance: this.calculateOverallCompliance(assessments),
      controlCompliance: this.calculateControlCompliance(framework.controls),
      trendAnalysis: this.analyzeTrends(assessments),
      riskAssessment: this.assessComplianceRisks(framework, securityIncidents),
      recommendations: this.generateDetailedRecommendations(framework, assessments),
      auditSummary: this.summarizeAuditActivity(auditEvents),
      executiveSummary: this.generateExecutiveSummary(framework, assessments)
    };
  }
}
```

This advanced security guide now includes sophisticated authentication patterns with MFA, comprehensive RBAC, secure session management, intelligent threat detection with automated response capabilities, advanced security monitoring and incident response automation, and comprehensive security compliance and audit frameworks.
```