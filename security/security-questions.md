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
```

This security guide provides comprehensive protection against XSS and other common web vulnerabilities with practical implementation examples.