# Web Security Interview Questions

## Table of Contents

1. [What are the OWASP Top 10 security vulnerabilities?](#q1-what-are-the-owasp-top-10-security-vulnerabilities)
2. [How do you implement secure authentication and authorization?](#q2-how-do-you-implement-secure-authentication-and-authorization)
3. [How do you prevent XSS attacks?](#q3-how-do-you-prevent-xss-attacks)
4. [How do you implement advanced authentication and authorization patterns?](#q4-how-do-you-implement-advanced-authentication-and-authorization-patterns)
5. [How do you implement advanced threat detection and security monitoring?](#q5-how-do-you-implement-advanced-threat-detection-and-security-monitoring)
6. [How do you implement advanced security monitoring and incident response automation?](#q6-how-do-you-implement-advanced-security-monitoring-and-incident-response-automation)
7. [How do you implement comprehensive security compliance and audit frameworks?](#q7-how-do-you-implement-comprehensive-security-compliance-and-audit-frameworks)

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

---

### Q8: How do you implement secure frontend data handling and prevent client-side vulnerabilities?

**Answer:**
Secure frontend data handling involves protecting sensitive information, preventing data leaks, and implementing proper validation and sanitization.

**Client-Side Data Protection:**
```typescript
// Secure data storage utility
class SecureDataManager {
  private encryptionKey: CryptoKey | null = null;
  private readonly STORAGE_PREFIX = 'secure_';
  
  constructor() {
    this.initializeEncryption();
  }
  
  private async initializeEncryption(): Promise<void> {
    try {
      // Generate or retrieve encryption key
      this.encryptionKey = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256
        },
        false, // Not extractable
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Failed to initialize encryption:', error);
    }
  }
  
  async storeSecureData(key: string, data: any): Promise<void> {
    if (!this.encryptionKey) {
      throw new Error('Encryption not initialized');
    }
    
    try {
      const jsonData = JSON.stringify(data);
      const encodedData = new TextEncoder().encode(jsonData);
      
      // Generate random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      // Encrypt data
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        this.encryptionKey,
        encodedData
      );
      
      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedData.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedData), iv.length);
      
      // Store as base64
      const base64Data = btoa(String.fromCharCode(...combined));
      sessionStorage.setItem(this.STORAGE_PREFIX + key, base64Data);
      
    } catch (error) {
      console.error('Failed to store secure data:', error);
      throw new Error('Data encryption failed');
    }
  }
  
  async retrieveSecureData<T>(key: string): Promise<T | null> {
    if (!this.encryptionKey) {
      throw new Error('Encryption not initialized');
    }
    
    try {
      const storedData = sessionStorage.getItem(this.STORAGE_PREFIX + key);
      if (!storedData) return null;
      
      // Decode from base64
      const combined = new Uint8Array(
        atob(storedData).split('').map(char => char.charCodeAt(0))
      );
      
      // Extract IV and encrypted data
      const iv = combined.slice(0, 12);
      const encryptedData = combined.slice(12);
      
      // Decrypt data
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        this.encryptionKey,
        encryptedData
      );
      
      // Decode and parse
      const jsonData = new TextDecoder().decode(decryptedData);
      return JSON.parse(jsonData);
      
    } catch (error) {
      console.error('Failed to retrieve secure data:', error);
      return null;
    }
  }
  
  clearSecureData(key?: string): void {
    if (key) {
      sessionStorage.removeItem(this.STORAGE_PREFIX + key);
    } else {
      // Clear all secure data
      Object.keys(sessionStorage)
        .filter(k => k.startsWith(this.STORAGE_PREFIX))
        .forEach(k => sessionStorage.removeItem(k));
    }
  }
}

// Input sanitization and validation
class InputSanitizer {
  private static readonly XSS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>/gi,
    /<link[^>]*>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi
  ];
  
  private static readonly SQL_PATTERNS = [
    /('|(\-\-)|(;)|(\||\|)|(\*|\*))/gi,
    /(union|select|insert|delete|update|drop|create|alter|exec|execute)/gi
  ];
  
  static sanitizeHTML(input: string): string {
    if (!input) return '';
    
    let sanitized = input;
    
    // Remove XSS patterns
    this.XSS_PATTERNS.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });
    
    // Encode HTML entities
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
    
    return sanitized;
  }
  
  static validateInput(input: string, type: 'email' | 'url' | 'sql' | 'general'): boolean {
    if (!input) return false;
    
    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input) && !this.containsMaliciousPatterns(input);
      
      case 'url':
        try {
          const url = new URL(input);
          return ['http:', 'https:'].includes(url.protocol) && 
                 !this.containsMaliciousPatterns(input);
        } catch {
          return false;
        }
      
      case 'sql':
        return !this.SQL_PATTERNS.some(pattern => pattern.test(input));
      
      case 'general':
      default:
        return !this.containsMaliciousPatterns(input);
    }
  }
  
  private static containsMaliciousPatterns(input: string): boolean {
    return this.XSS_PATTERNS.some(pattern => pattern.test(input));
  }
}

// Secure form handling
class SecureFormHandler {
  private csrfToken: string = '';
  private formValidators: Map<string, (value: any) => boolean> = new Map();
  
  constructor() {
    this.initializeCSRFToken();
  }
  
  private async initializeCSRFToken(): Promise<void> {
    try {
      const response = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'same-origin'
      });
      
      if (response.ok) {
        const data = await response.json();
        this.csrfToken = data.token;
      }
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
    }
  }
  
  registerValidator(fieldName: string, validator: (value: any) => boolean): void {
    this.formValidators.set(fieldName, validator);
  }
  
  async submitSecureForm(formData: FormData, endpoint: string): Promise<Response> {
    // Validate all fields
    for (const [key, value] of formData.entries()) {
      const validator = this.formValidators.get(key);
      if (validator && !validator(value)) {
        throw new Error(`Invalid data for field: ${key}`);
      }
      
      // Sanitize string values
      if (typeof value === 'string') {
        const sanitized = InputSanitizer.sanitizeHTML(value);
        formData.set(key, sanitized);
      }
    }
    
    // Add CSRF token
    formData.append('_csrf', this.csrfToken);
    
    // Submit with security headers
    return fetch(endpoint, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.csrfToken
      }
    });
  }
}
```

**Data Masking and Privacy Protection:**
```typescript
// Data masking utility
class DataMasker {
  static maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    
    const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];
    return `${maskedUsername}@${domain}`;
  }
  
  static maskPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 4) return phone;
    
    return cleaned.replace(/.(?=.{4})/g, '*');
  }
  
  static maskCreditCard(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.length < 4) return cardNumber;
    
    return '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
  }
  
  static maskSSN(ssn: string): string {
    const cleaned = ssn.replace(/\D/g, '');
    if (cleaned.length !== 9) return ssn;
    
    return `***-**-${cleaned.slice(-4)}`;
  }
}

// Privacy-aware logging
class PrivacyLogger {
  private static readonly SENSITIVE_FIELDS = [
    'password', 'token', 'secret', 'key', 'ssn', 'creditcard', 'cvv'
  ];
  
  static log(level: 'info' | 'warn' | 'error', message: string, data?: any): void {
    const sanitizedData = data ? this.sanitizeLogData(data) : undefined;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data: sanitizedData,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Send to secure logging endpoint
    this.sendToSecureLogger(logEntry);
  }
  
  private static sanitizeLogData(data: any): any {
    if (typeof data !== 'object' || data === null) {
      return data;
    }
    
    const sanitized = { ...data };
    
    Object.keys(sanitized).forEach(key => {
      const lowerKey = key.toLowerCase();
      
      if (this.SENSITIVE_FIELDS.some(field => lowerKey.includes(field))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitizeLogData(sanitized[key]);
      }
    });
    
    return sanitized;
  }
  
  private static async sendToSecureLogger(logEntry: any): Promise<void> {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logEntry),
        credentials: 'same-origin'
      });
    } catch (error) {
      console.error('Failed to send log:', error);
    }
  }
}
```

### Q10: How do you implement secure file handling and upload security in web applications?

**Answer:**
Secure file handling involves validating file types, scanning for malware, implementing proper access controls, and preventing directory traversal attacks.

**Secure File Upload Implementation:**
```typescript
// Secure file upload handler
class SecureFileUploader {
  private readonly ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly UPLOAD_ENDPOINT = '/api/upload';
  
  async uploadFile(file: File, options?: {
    onProgress?: (progress: number) => void;
    onSuccess?: (response: any) => void;
    onError?: (error: Error) => void;
  }): Promise<any> {
    try {
      // Validate file
      const validation = await this.validateFile(file);
      if (!validation.valid) {
        throw new Error(`File validation failed: ${validation.errors.join(', ')}`);
      }
      
      // Create secure form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('checksum', await this.calculateChecksum(file));
      formData.append('timestamp', Date.now().toString());
      
      // Upload with progress tracking
      return await this.uploadWithProgress(formData, options);
      
    } catch (error) {
      options?.onError?.(error as Error);
      throw error;
    }
  }
  
  private async validateFile(file: File): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    
    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      errors.push(`File size exceeds maximum allowed size of ${this.MAX_FILE_SIZE / 1024 / 1024}MB`);
    }
    
    // Check file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      errors.push(`File type '${file.type}' is not allowed`);
    }
    
    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!this.isAllowedExtension(extension)) {
      errors.push(`File extension '${extension}' is not allowed`);
    }
    
    // Check file name for malicious patterns
    if (this.containsMaliciousFileName(file.name)) {
      errors.push('File name contains potentially malicious characters');
    }
    
    // Validate file content (basic magic number check)
    const contentValidation = await this.validateFileContent(file);
    if (!contentValidation.valid) {
      errors.push(...contentValidation.errors);
    }
    
    return { valid: errors.length === 0, errors };
  }
  
  private isAllowedExtension(extension?: string): boolean {
    if (!extension) return false;
    
    const allowedExtensions = [
      'jpg', 'jpeg', 'png', 'gif', 'webp',
      'pdf', 'txt', 'doc', 'docx'
    ];
    
    return allowedExtensions.includes(extension);
  }
  
  private containsMaliciousFileName(fileName: string): boolean {
    const maliciousPatterns = [
      /\.\./,  // Directory traversal
      /[<>:"|?*]/,  // Invalid characters
      /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i,  // Reserved names
      /\.(exe|bat|cmd|scr|pif|vbs|js)$/i  // Executable extensions
    ];
    
    return maliciousPatterns.some(pattern => pattern.test(fileName));
  }
  
  private async validateFileContent(file: File): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    
    try {
      // Read first few bytes to check magic numbers
      const buffer = await this.readFileBytes(file, 0, 16);
      const bytes = new Uint8Array(buffer);
      
      // Check magic numbers for common file types
      const magicNumbers = {
        'image/jpeg': [0xFF, 0xD8, 0xFF],
        'image/png': [0x89, 0x50, 0x4E, 0x47],
        'image/gif': [0x47, 0x49, 0x46],
        'application/pdf': [0x25, 0x50, 0x44, 0x46]
      };
      
      const expectedMagic = magicNumbers[file.type as keyof typeof magicNumbers];
      if (expectedMagic) {
        const actualMagic = Array.from(bytes.slice(0, expectedMagic.length));
        if (!this.arraysEqual(actualMagic, expectedMagic)) {
          errors.push('File content does not match declared file type');
        }
      }
      
      // Check for embedded scripts in images
      if (file.type.startsWith('image/')) {
        const content = await this.readFileAsText(file);
        if (this.containsEmbeddedScript(content)) {
          errors.push('Image contains potentially malicious embedded content');
        }
      }
      
    } catch (error) {
      errors.push('Failed to validate file content');
    }
    
    return { valid: errors.length === 0, errors };
  }
  
  private async readFileBytes(file: File, start: number, length: number): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file.slice(start, start + length));
    });
  }
  
  private async readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
  
  private arraysEqual(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }
  
  private containsEmbeddedScript(content: string): boolean {
    const scriptPatterns = [
      /<script[^>]*>/i,
      /javascript:/i,
      /vbscript:/i,
      /on\w+\s*=/i,
      /<iframe[^>]*>/i
    ];
    
    return scriptPatterns.some(pattern => pattern.test(content));
  }
  
  private async calculateChecksum(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  private async uploadWithProgress(
    formData: FormData,
    options?: {
      onProgress?: (progress: number) => void;
      onSuccess?: (response: any) => void;
      onError?: (error: Error) => void;
    }
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          options?.onProgress?.(progress);
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            options?.onSuccess?.(response);
            resolve(response);
          } catch (error) {
            const parseError = new Error('Invalid response format');
            options?.onError?.(parseError);
            reject(parseError);
          }
        } else {
          const error = new Error(`Upload failed with status ${xhr.status}`);
          options?.onError?.(error);
          reject(error);
        }
      });
      
      xhr.addEventListener('error', () => {
        const error = new Error('Upload failed due to network error');
        options?.onError?.(error);
        reject(error);
      });
      
      xhr.addEventListener('timeout', () => {
        const error = new Error('Upload timed out');
        options?.onError?.(error);
        reject(error);
      });
      
      // Set timeout
      xhr.timeout = 300000; // 5 minutes
      
      // Add security headers
      xhr.open('POST', this.UPLOAD_ENDPOINT);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
      // Send the request
      xhr.send(formData);
    });
  }
}
```

### Q11: How do you implement comprehensive security headers and Content Security Policy (CSP)?

**Answer:**
Security headers provide an additional layer of protection against various attacks by instructing browsers on how to handle content.

**Security Headers Implementation:**
```typescript
// Security headers manager
class SecurityHeadersManager {
  private static readonly SECURITY_HEADERS = {
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://trusted-cdn.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.example.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; '),
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // XSS protection
    'X-XSS-Protection': '1; mode=block',
    
    // Content type sniffing protection
    'X-Content-Type-Options': 'nosniff',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // HSTS (HTTPS only)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    
    // Feature policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=(self)',
      'payment=(self)'
    ].join(', ')
  };
  
  static applySecurityHeaders(): void {
    // This would typically be done on the server side
    // But we can validate and monitor on the client side
    this.validateCurrentHeaders();
    this.setupCSPViolationReporting();
  }
  
  private static validateCurrentHeaders(): void {
    const requiredHeaders = [
      'Content-Security-Policy',
      'X-Frame-Options',
      'X-Content-Type-Options'
    ];
    
    // Check if headers are present (this is a simulation)
    // In reality, you'd check server response headers
    const missingHeaders = requiredHeaders.filter(header => {
      return !this.isHeaderPresent(header);
    });
    
    if (missingHeaders.length > 0) {
      console.warn('Missing security headers:', missingHeaders);
      this.reportSecurityIssue('missing_headers', { headers: missingHeaders });
    }
  }
  
  private static isHeaderPresent(headerName: string): boolean {
    // Simulate header check - in real implementation,
    // you'd check the actual HTTP response headers
    return document.querySelector(`meta[http-equiv="${headerName}"]`) !== null;
  }
  
  private static setupCSPViolationReporting(): void {
    document.addEventListener('securitypolicyviolation', (event) => {
      const violation = {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        sourceFile: event.sourceFile,
        lineNumber: event.lineNumber,
        columnNumber: event.columnNumber,
        timestamp: new Date().toISOString()
      };
      
      this.reportCSPViolation(violation);
    });
  }
  
  private static async reportCSPViolation(violation: any): Promise<void> {
    try {
      await fetch('/api/security/csp-violation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(violation)
      });
    } catch (error) {
      console.error('Failed to report CSP violation:', error);
    }
  }
  
  private static async reportSecurityIssue(type: string, details: any): Promise<void> {
    try {
      await fetch('/api/security/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, details, timestamp: new Date().toISOString() })
      });
    } catch (error) {
      console.error('Failed to report security issue:', error);
    }
  }
}
```

---

### Q12: How do you implement secure session management and prevent session-based attacks?

**Answer:**
Secure session management involves proper session creation, storage, validation, and destruction to prevent hijacking and fixation attacks.

**Secure Session Management:**
```typescript
// Secure session manager
class SecureSessionManager {
  private static readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private static readonly IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  private static readonly SESSION_KEY = 'secure_session';
  
  private sessionData: any = null;
  private lastActivity: number = Date.now();
  private sessionTimer: NodeJS.Timeout | null = null;
  private idleTimer: NodeJS.Timeout | null = null;
  
  constructor() {
    this.setupSessionMonitoring();
    this.loadExistingSession();
  }
  
  async createSession(userData: any): Promise<string> {
    try {
      // Generate secure session ID
      const sessionId = await this.generateSecureSessionId();
      
      // Create session data
      this.sessionData = {
        id: sessionId,
        userId: userData.userId,
        username: userData.username,
        roles: userData.roles,
        createdAt: Date.now(),
        lastActivity: Date.now(),
        ipAddress: await this.getCurrentIP(),
        userAgent: navigator.userAgent,
        csrfToken: await this.generateCSRFToken()
      };
      
      // Store session securely
      await this.storeSession();
      
      // Start session timers
      this.startSessionTimers();
      
      return sessionId;
    } catch (error) {
      console.error('Failed to create session:', error);
      throw new Error('Session creation failed');
    }
  }
  
  async validateSession(): Promise<boolean> {
    if (!this.sessionData) {
      return false;
    }
    
    try {
      // Check session expiry
      if (this.isSessionExpired()) {
        await this.destroySession();
        return false;
      }
      
      // Check for session hijacking
      if (await this.detectSessionHijacking()) {
        await this.destroySession();
        return false;
      }
      
      // Update last activity
      this.updateActivity();
      
      return true;
    } catch (error) {
      console.error('Session validation failed:', error);
      return false;
    }
  }
  
  private async generateSecureSessionId(): Promise<string> {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  private async generateCSRFToken(): Promise<string> {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  private async getCurrentIP(): Promise<string> {
    try {
      const response = await fetch('/api/client-ip');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  }
  
  private async storeSession(): Promise<void> {
    const secureStorage = new SecureDataManager();
    await secureStorage.storeSecureData(this.SESSION_KEY, this.sessionData);
  }
  
  private async loadExistingSession(): Promise<void> {
    try {
      const secureStorage = new SecureDataManager();
      this.sessionData = await secureStorage.retrieveSecureData(this.SESSION_KEY);
      
      if (this.sessionData && !this.isSessionExpired()) {
        this.startSessionTimers();
      } else {
        this.sessionData = null;
      }
    } catch (error) {
      console.error('Failed to load session:', error);
      this.sessionData = null;
    }
  }
  
  private isSessionExpired(): boolean {
    if (!this.sessionData) return true;
    
    const now = Date.now();
    const sessionAge = now - this.sessionData.createdAt;
    const idleTime = now - this.sessionData.lastActivity;
    
    return sessionAge > this.SESSION_TIMEOUT || idleTime > this.IDLE_TIMEOUT;
  }
  
  private async detectSessionHijacking(): Promise<boolean> {
    if (!this.sessionData) return false;
    
    try {
      // Check IP address consistency
      const currentIP = await this.getCurrentIP();
      if (currentIP !== this.sessionData.ipAddress && currentIP !== 'unknown') {
        console.warn('Session IP mismatch detected');
        return true;
      }
      
      // Check User-Agent consistency
      if (navigator.userAgent !== this.sessionData.userAgent) {
        console.warn('Session User-Agent mismatch detected');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Hijacking detection failed:', error);
      return true; // Err on the side of caution
    }
  }
  
  private updateActivity(): void {
    this.lastActivity = Date.now();
    if (this.sessionData) {
      this.sessionData.lastActivity = this.lastActivity;
      this.storeSession();
    }
  }
  
  private startSessionTimers(): void {
    this.clearTimers();
    
    // Session timeout timer
    this.sessionTimer = setTimeout(() => {
      this.destroySession();
      this.notifySessionExpired('timeout');
    }, this.SESSION_TIMEOUT);
    
    // Idle timeout timer
    this.idleTimer = setTimeout(() => {
      this.destroySession();
      this.notifySessionExpired('idle');
    }, this.IDLE_TIMEOUT);
  }
  
  private clearTimers(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
    
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }
  
  private setupSessionMonitoring(): void {
    // Monitor user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => {
      document.addEventListener(event, () => {
        this.updateActivity();
      }, { passive: true });
    });
    
    // Monitor page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page is hidden, start idle countdown
      } else {
        // Page is visible, reset activity
        this.updateActivity();
      }
    });
  }
  
  async destroySession(): Promise<void> {
    try {
      // Clear client-side session data
      this.sessionData = null;
      this.clearTimers();
      
      // Clear secure storage
      const secureStorage = new SecureDataManager();
      secureStorage.clearSecureData(this.SESSION_KEY);
      
      // Notify server to invalidate session
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin'
      });
      
    } catch (error) {
      console.error('Failed to destroy session:', error);
    }
  }
  
  private notifySessionExpired(reason: 'timeout' | 'idle'): void {
    const event = new CustomEvent('sessionExpired', {
      detail: { reason }
    });
    document.dispatchEvent(event);
  }
  
  getSessionData(): any {
    return this.sessionData ? { ...this.sessionData } : null;
  }
  
  getCSRFToken(): string | null {
    return this.sessionData?.csrfToken || null;
  }
}
```

---

### Q13: How do you implement security testing and vulnerability scanning in frontend applications?

**Answer:**
Security testing involves automated scanning, penetration testing, and continuous monitoring to identify and fix vulnerabilities.

**Security Testing Framework:**
```typescript
// Automated security testing framework
class SecurityTestSuite {
  private testResults: Map<string, any> = new Map();
  private vulnerabilities: any[] = [];
  
  async runSecurityTests(): Promise<any> {
    console.log('Starting security test suite...');
    
    const tests = [
      () => this.testXSSVulnerabilities(),
      () => this.testCSRFProtection(),
      () => this.testInputValidation(),
      () => this.testAuthenticationSecurity(),
      () => this.testSessionSecurity(),
      () => this.testDataExposure(),
      () => this.testSecurityHeaders(),
      () => this.testHTTPSEnforcement(),
      () => this.testDependencyVulnerabilities(),
      () => this.testClientSideStorage()
    ];
    
    for (const test of tests) {
      try {
        await test();
      } catch (error) {
        console.error('Security test failed:', error);
      }
    }
    
    return this.generateSecurityReport();
  }
  
  private async testXSSVulnerabilities(): Promise<void> {
    const testName = 'XSS Vulnerabilities';
    const vulnerabilities = [];
    
    // Test for unescaped user input
    const userInputs = document.querySelectorAll('input, textarea, [contenteditable]');
    
    userInputs.forEach((input, index) => {
      const testPayload = '<script>alert("XSS")</script>';
      
      // Simulate input
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        const originalValue = input.value;
        input.value = testPayload;
        
        // Check if payload is reflected without escaping
        const reflectedElements = document.querySelectorAll('*');
        reflectedElements.forEach(el => {
          if (el.innerHTML.includes(testPayload)) {
            vulnerabilities.push({
              type: 'XSS',
              element: input.tagName,
              id: input.id || `input-${index}`,
              severity: 'high',
              description: 'Unescaped user input detected'
            });
          }
        });
        
        // Restore original value
        input.value = originalValue;
      }
    });
    
    this.testResults.set(testName, {
      passed: vulnerabilities.length === 0,
      vulnerabilities,
      testCount: userInputs.length
    });
  }
  
  private async testCSRFProtection(): Promise<void> {
    const testName = 'CSRF Protection';
    const issues = [];
    
    // Check for CSRF tokens in forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, index) => {
      const csrfToken = form.querySelector('input[name="_token"], input[name="csrf_token"], input[name="_csrf"]');
      
      if (!csrfToken && form.method.toLowerCase() === 'post') {
        issues.push({
          type: 'CSRF',
          element: 'form',
          id: form.id || `form-${index}`,
          severity: 'medium',
          description: 'POST form without CSRF token'
        });
      }
    });
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: forms.length
    });
  }
  
  private async testInputValidation(): Promise<void> {
    const testName = 'Input Validation';
    const issues = [];
    
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach((input, index) => {
      const hasValidation = input.hasAttribute('pattern') || 
                           input.hasAttribute('required') || 
                           input.hasAttribute('minlength') || 
                           input.hasAttribute('maxlength');
      
      if (!hasValidation && input.type !== 'hidden') {
        issues.push({
          type: 'Input Validation',
          element: 'input',
          id: input.id || `input-${index}`,
          severity: 'medium',
          description: 'Input without validation attributes'
        });
      }
    });
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: inputs.length
    });
  }
  
  private async testAuthenticationSecurity(): Promise<void> {
    const testName = 'Authentication Security';
    const issues = [];
    
    // Check for password fields without proper attributes
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach((field, index) => {
      if (!field.hasAttribute('autocomplete')) {
        issues.push({
          type: 'Authentication',
          element: 'password input',
          id: field.id || `password-${index}`,
          severity: 'low',
          description: 'Password field without autocomplete attribute'
        });
      }
    });
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: passwordFields.length
    });
  }
  
  private async testSessionSecurity(): Promise<void> {
    const testName = 'Session Security';
    const issues = [];
    
    // Check for session tokens in localStorage (should use secure storage)
    const localStorageKeys = Object.keys(localStorage);
    const sessionKeys = localStorageKeys.filter(key => 
      key.toLowerCase().includes('session') || 
      key.toLowerCase().includes('token') ||
      key.toLowerCase().includes('auth')
    );
    
    if (sessionKeys.length > 0) {
      issues.push({
        type: 'Session Security',
        element: 'localStorage',
        id: 'localStorage',
        severity: 'high',
        description: `Sensitive data in localStorage: ${sessionKeys.join(', ')}`
      });
    }
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: 1
    });
  }
  
  private async testDataExposure(): Promise<void> {
    const testName = 'Data Exposure';
    const issues = [];
    
    // Check for sensitive data in DOM
    const sensitivePatterns = [
      /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
      /\b(?:password|secret|key|token)\s*[:=]\s*['"]?[^\s'"]+/i // Secrets
    ];
    
    const bodyText = document.body.textContent || '';
    
    sensitivePatterns.forEach((pattern, index) => {
      if (pattern.test(bodyText)) {
        issues.push({
          type: 'Data Exposure',
          element: 'DOM content',
          id: `pattern-${index}`,
          severity: 'high',
          description: 'Potentially sensitive data exposed in DOM'
        });
      }
    });
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: sensitivePatterns.length
    });
  }
  
  private async testSecurityHeaders(): Promise<void> {
    const testName = 'Security Headers';
    const issues = [];
    
    const requiredHeaders = [
      'Content-Security-Policy',
      'X-Frame-Options',
      'X-Content-Type-Options',
      'Strict-Transport-Security'
    ];
    
    // This would typically check actual HTTP headers
    // For demo purposes, checking meta tags
    requiredHeaders.forEach(header => {
      const metaTag = document.querySelector(`meta[http-equiv="${header}"]`);
      if (!metaTag) {
        issues.push({
          type: 'Security Headers',
          element: 'HTTP headers',
          id: header,
          severity: 'medium',
          description: `Missing security header: ${header}`
        });
      }
    });
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: requiredHeaders.length
    });
  }
  
  private async testHTTPSEnforcement(): Promise<void> {
    const testName = 'HTTPS Enforcement';
    const issues = [];
    
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      issues.push({
        type: 'HTTPS',
        element: 'protocol',
        id: 'protocol',
        severity: 'critical',
        description: 'Application not served over HTTPS'
      });
    }
    
    // Check for mixed content
    const insecureResources = document.querySelectorAll('img[src^="http:"], script[src^="http:"], link[href^="http:"]');
    
    if (insecureResources.length > 0) {
      issues.push({
        type: 'Mixed Content',
        element: 'resources',
        id: 'mixed-content',
        severity: 'high',
        description: `${insecureResources.length} insecure resources detected`
      });
    }
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: 2
    });
  }
  
  private async testDependencyVulnerabilities(): Promise<void> {
    const testName = 'Dependency Vulnerabilities';
    const issues = [];
    
    // This would typically integrate with tools like npm audit
    // For demo purposes, checking for known vulnerable patterns
    const scripts = document.querySelectorAll('script[src]');
    const knownVulnerableLibraries = [
      'jquery-1.',
      'angular-1.0',
      'lodash-3.'
    ];
    
    scripts.forEach((script, index) => {
      const src = script.getAttribute('src') || '';
      knownVulnerableLibraries.forEach(vulnerable => {
        if (src.includes(vulnerable)) {
          issues.push({
            type: 'Vulnerable Dependency',
            element: 'script',
            id: `script-${index}`,
            severity: 'high',
            description: `Potentially vulnerable library: ${src}`
          });
        }
      });
    });
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: scripts.length
    });
  }
  
  private async testClientSideStorage(): Promise<void> {
    const testName = 'Client-Side Storage Security';
    const issues = [];
    
    // Check localStorage for sensitive data
    const localStorageData = { ...localStorage };
    const sessionStorageData = { ...sessionStorage };
    
    const sensitiveKeywords = ['password', 'secret', 'key', 'token', 'ssn', 'credit'];
    
    Object.keys(localStorageData).forEach(key => {
      if (sensitiveKeywords.some(keyword => key.toLowerCase().includes(keyword))) {
        issues.push({
          type: 'Insecure Storage',
          element: 'localStorage',
          id: key,
          severity: 'high',
          description: `Sensitive data in localStorage: ${key}`
        });
      }
    });
    
    Object.keys(sessionStorageData).forEach(key => {
      if (sensitiveKeywords.some(keyword => key.toLowerCase().includes(keyword))) {
        issues.push({
          type: 'Insecure Storage',
          element: 'sessionStorage',
          id: key,
          severity: 'medium',
          description: `Sensitive data in sessionStorage: ${key}`
        });
      }
    });
    
    this.testResults.set(testName, {
      passed: issues.length === 0,
      vulnerabilities: issues,
      testCount: Object.keys(localStorageData).length + Object.keys(sessionStorageData).length
    });
  }
  
  private generateSecurityReport(): any {
    const allVulnerabilities = [];
    let totalTests = 0;
    let passedTests = 0;
    
    for (const [testName, result] of this.testResults) {
      totalTests++;
      if (result.passed) passedTests++;
      
      allVulnerabilities.push(...result.vulnerabilities);
    }
    
    const severityCounts = {
      critical: allVulnerabilities.filter(v => v.severity === 'critical').length,
      high: allVulnerabilities.filter(v => v.severity === 'high').length,
      medium: allVulnerabilities.filter(v => v.severity === 'medium').length,
      low: allVulnerabilities.filter(v => v.severity === 'low').length
    };
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        passedTests,
        failedTests: totalTests - passedTests,
        totalVulnerabilities: allVulnerabilities.length,
        severityCounts
      },
      testResults: Object.fromEntries(this.testResults),
      vulnerabilities: allVulnerabilities,
      recommendations: this.generateRecommendations(allVulnerabilities)
    };
    
    console.log('Security Test Report:', report);
    return report;
  }
  
  private generateRecommendations(vulnerabilities: any[]): string[] {
    const recommendations = [];
    
    if (vulnerabilities.some(v => v.type === 'XSS')) {
      recommendations.push('Implement proper input sanitization and output encoding');
    }
    
    if (vulnerabilities.some(v => v.type === 'CSRF')) {
      recommendations.push('Add CSRF tokens to all state-changing forms');
    }
    
    if (vulnerabilities.some(v => v.severity === 'critical')) {
      recommendations.push('Address critical vulnerabilities immediately');
    }
    
    if (vulnerabilities.some(v => v.type === 'Security Headers')) {
      recommendations.push('Configure proper security headers on the server');
    }
    
    if (vulnerabilities.some(v => v.type === 'Insecure Storage')) {
      recommendations.push('Use secure storage mechanisms for sensitive data');
    }
    
    return recommendations;
  }
}
```

### Q14: How do you implement secure authentication mechanisms and multi-factor authentication (MFA)?

**Answer:**
Secure authentication involves implementing strong password policies, secure login flows, and multi-factor authentication to prevent unauthorized access.

**Secure Authentication Implementation:**
```typescript
// Secure authentication manager
class SecureAuthManager {
  private static readonly PASSWORD_REQUIREMENTS = {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    preventReuse: 12 // Last 12 passwords
  };
  
  private static readonly LOGIN_ATTEMPTS = {
    maxAttempts: 5,
    lockoutDuration: 30 * 60 * 1000, // 30 minutes
    progressiveDelay: true
  };
  
  private loginAttempts: Map<string, any> = new Map();
  private mfaProviders: Map<string, any> = new Map();
  
  constructor() {
    this.initializeMFAProviders();
  }
  
  async authenticateUser(credentials: any): Promise<any> {
    try {
      // Check for account lockout
      if (await this.isAccountLocked(credentials.username)) {
        throw new Error('Account temporarily locked due to multiple failed attempts');
      }
      
      // Validate credentials
      const user = await this.validateCredentials(credentials);
      
      if (!user) {
        await this.recordFailedAttempt(credentials.username);
        throw new Error('Invalid credentials');
      }
      
      // Check if MFA is required
      if (user.mfaEnabled) {
        const mfaChallenge = await this.initiateMFAChallenge(user);
        return {
          success: false,
          requiresMFA: true,
          challenge: mfaChallenge,
          tempToken: await this.generateTempToken(user.id)
        };
      }
      
      // Clear failed attempts on successful login
      this.clearFailedAttempts(credentials.username);
      
      // Generate session
      const sessionManager = new SecureSessionManager();
      const sessionId = await sessionManager.createSession(user);
      
      return {
        success: true,
        user: this.sanitizeUserData(user),
        sessionId,
        requiresPasswordChange: this.requiresPasswordChange(user)
      };
      
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }
  
  async validateMFA(tempToken: string, mfaCode: string, method: string): Promise<any> {
    try {
      // Validate temp token
      const userId = await this.validateTempToken(tempToken);
      if (!userId) {
        throw new Error('Invalid or expired MFA token');
      }
      
      // Validate MFA code
      const isValid = await this.validateMFACode(userId, mfaCode, method);
      
      if (!isValid) {
        throw new Error('Invalid MFA code');
      }
      
      // Get user data
      const user = await this.getUserById(userId);
      
      // Generate session
      const sessionManager = new SecureSessionManager();
      const sessionId = await sessionManager.createSession(user);
      
      return {
        success: true,
        user: this.sanitizeUserData(user),
        sessionId
      };
      
    } catch (error) {
      console.error('MFA validation failed:', error);
      throw error;
    }
  }
  
  validatePasswordStrength(password: string): any {
    const requirements = this.PASSWORD_REQUIREMENTS;
    const issues = [];
    
    if (password.length < requirements.minLength) {
      issues.push(`Password must be at least ${requirements.minLength} characters long`);
    }
    
    if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
      issues.push('Password must contain at least one uppercase letter');
    }
    
    if (requirements.requireLowercase && !/[a-z]/.test(password)) {
      issues.push('Password must contain at least one lowercase letter');
    }
    
    if (requirements.requireNumbers && !/\d/.test(password)) {
      issues.push('Password must contain at least one number');
    }
    
    if (requirements.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      issues.push('Password must contain at least one special character');
    }
    
    // Check for common patterns
    if (this.hasCommonPatterns(password)) {
      issues.push('Password contains common patterns and may be easily guessed');
    }
    
    return {
      isValid: issues.length === 0,
      issues,
      strength: this.calculatePasswordStrength(password)
    };
  }
  
  private async validateCredentials(credentials: any): Promise<any> {
    // This would typically validate against a secure backend
    // For demo purposes, simulating validation
    
    if (!credentials.username || !credentials.password) {
      return null;
    }
    
    // Hash password for comparison
    const hashedPassword = await this.hashPassword(credentials.password);
    
    // Simulate user lookup
    const user = await this.getUserByUsername(credentials.username);
    
    if (user && await this.verifyPassword(credentials.password, user.passwordHash)) {
      return user;
    }
    
    return null;
  }
  
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password);
    return passwordHash === hash;
  }
  
  private async isAccountLocked(username: string): Promise<boolean> {
    const attempts = this.loginAttempts.get(username);
    
    if (!attempts) return false;
    
    const now = Date.now();
    const lockoutEnd = attempts.lockoutStart + this.LOGIN_ATTEMPTS.lockoutDuration;
    
    return attempts.count >= this.LOGIN_ATTEMPTS.maxAttempts && now < lockoutEnd;
  }
  
  private async recordFailedAttempt(username: string): Promise<void> {
    const now = Date.now();
    const attempts = this.loginAttempts.get(username) || { count: 0, lastAttempt: now };
    
    attempts.count++;
    attempts.lastAttempt = now;
    
    if (attempts.count >= this.LOGIN_ATTEMPTS.maxAttempts) {
      attempts.lockoutStart = now;
    }
    
    this.loginAttempts.set(username, attempts);
    
    // Log security event
    await this.logSecurityEvent('failed_login', {
      username,
      attemptCount: attempts.count,
      timestamp: now,
      ip: await this.getCurrentIP()
    });
  }
  
  private clearFailedAttempts(username: string): void {
    this.loginAttempts.delete(username);
  }
  
  private async initiateMFAChallenge(user: any): Promise<any> {
    const availableMethods = user.mfaMethods || ['totp', 'sms'];
    
    const challenges = [];
    
    for (const method of availableMethods) {
      switch (method) {
        case 'totp':
          challenges.push({
            method: 'totp',
            description: 'Enter code from your authenticator app'
          });
          break;
          
        case 'sms':
          const maskedPhone = this.maskPhoneNumber(user.phoneNumber);
          await this.sendSMSCode(user.phoneNumber);
          challenges.push({
            method: 'sms',
            description: `Enter code sent to ${maskedPhone}`
          });
          break;
          
        case 'email':
          const maskedEmail = this.maskEmail(user.email);
          await this.sendEmailCode(user.email);
          challenges.push({
            method: 'email',
            description: `Enter code sent to ${maskedEmail}`
          });
          break;
      }
    }
    
    return {
      methods: challenges,
      expiresAt: Date.now() + (5 * 60 * 1000) // 5 minutes
    };
  }
  
  private async validateMFACode(userId: string, code: string, method: string): Promise<boolean> {
    switch (method) {
      case 'totp':
        return await this.validateTOTPCode(userId, code);
      case 'sms':
      case 'email':
        return await this.validateOTPCode(userId, code, method);
      default:
        return false;
    }
  }
  
  private async validateTOTPCode(userId: string, code: string): Promise<boolean> {
    // This would typically validate against a TOTP library
    // For demo purposes, simulating validation
    const user = await this.getUserById(userId);
    
    if (!user || !user.totpSecret) {
      return false;
    }
    
    // Simulate TOTP validation
    // In reality, you'd use a library like 'otplib'
    return code.length === 6 && /^\d{6}$/.test(code);
  }
  
  private async validateOTPCode(userId: string, code: string, method: string): Promise<boolean> {
    // This would typically validate against stored OTP codes
    // For demo purposes, simulating validation
    const storedCode = await this.getStoredOTPCode(userId, method);
    
    if (!storedCode || storedCode.expiresAt < Date.now()) {
      return false;
    }
    
    return storedCode.code === code;
  }
  
  private initializeMFAProviders(): void {
    // Initialize TOTP provider
    this.mfaProviders.set('totp', {
      name: 'Time-based OTP',
      setup: this.setupTOTP.bind(this),
      validate: this.validateTOTPCode.bind(this)
    });
    
    // Initialize SMS provider
    this.mfaProviders.set('sms', {
      name: 'SMS Code',
      setup: this.setupSMS.bind(this),
      validate: this.validateOTPCode.bind(this)
    });
    
    // Initialize Email provider
    this.mfaProviders.set('email', {
      name: 'Email Code',
      setup: this.setupEmail.bind(this),
      validate: this.validateOTPCode.bind(this)
    });
  }
  
  private hasCommonPatterns(password: string): boolean {
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /admin/i,
      /(.)\1{3,}/, // Repeated characters
      /^[a-zA-Z]+$/, // Only letters
      /^\d+$/ // Only numbers
    ];
    
    return commonPatterns.some(pattern => pattern.test(password));
  }
  
  private calculatePasswordStrength(password: string): string {
    let score = 0;
    
    // Length bonus
    score += Math.min(password.length * 2, 20);
    
    // Character variety bonus
    if (/[a-z]/.test(password)) score += 5;
    if (/[A-Z]/.test(password)) score += 5;
    if (/\d/.test(password)) score += 5;
    if (/[^a-zA-Z\d]/.test(password)) score += 10;
    
    // Penalty for common patterns
    if (this.hasCommonPatterns(password)) score -= 20;
    
    if (score < 30) return 'weak';
    if (score < 60) return 'medium';
    if (score < 80) return 'strong';
    return 'very-strong';
  }
  
  private sanitizeUserData(user: any): any {
    const { passwordHash, totpSecret, ...sanitizedUser } = user;
    return sanitizedUser;
  }
  
  private requiresPasswordChange(user: any): boolean {
    const passwordAge = Date.now() - user.passwordChangedAt;
    return passwordAge > this.PASSWORD_REQUIREMENTS.maxAge;
  }
  
  private maskPhoneNumber(phone: string): string {
    return phone.replace(/(\d{3})\d{3}(\d{4})/, '$1***$2');
  }
  
  private maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  }
  
  // Placeholder methods - would be implemented with actual services
  private async getCurrentIP(): Promise<string> { return 'unknown'; }
  private async getUserByUsername(username: string): Promise<any> { return null; }
  private async getUserById(id: string): Promise<any> { return null; }
  private async generateTempToken(userId: string): Promise<string> { return 'temp-token'; }
  private async validateTempToken(token: string): Promise<string | null> { return null; }
  private async sendSMSCode(phone: string): Promise<void> { }
  private async sendEmailCode(email: string): Promise<void> { }
  private async getStoredOTPCode(userId: string, method: string): Promise<any> { return null; }
  private async setupTOTP(userId: string): Promise<any> { return null; }
  private async setupSMS(userId: string): Promise<any> { return null; }
  private async setupEmail(userId: string): Promise<any> { return null; }
  private async logSecurityEvent(event: string, data: any): Promise<void> { }
}
```

---

### Q15: How do you implement secure coding practices and prevent common vulnerabilities?

**Answer:**
Secure coding involves following best practices, input validation, output encoding, and implementing security controls throughout the development lifecycle.

**Secure Coding Framework:**
```typescript
// Secure coding utilities and best practices
class SecureCodingUtils {
  // Input validation utilities
  static validateInput(input: any, rules: any): any {
    const errors = [];
    const sanitized = { ...input };
    
    for (const [field, rule] of Object.entries(rules)) {
      const value = input[field];
      
      // Required field validation
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field} is required`);
        continue;
      }
      
      if (value !== undefined && value !== null) {
        // Type validation
        if (rule.type && typeof value !== rule.type) {
          errors.push(`${field} must be of type ${rule.type}`);
          continue;
        }
        
        // String validations
        if (rule.type === 'string') {
          if (rule.minLength && value.length < rule.minLength) {
            errors.push(`${field} must be at least ${rule.minLength} characters`);
          }
          
          if (rule.maxLength && value.length > rule.maxLength) {
            errors.push(`${field} must not exceed ${rule.maxLength} characters`);
          }
          
          if (rule.pattern && !rule.pattern.test(value)) {
            errors.push(`${field} format is invalid`);
          }
          
          // Sanitize string input
          sanitized[field] = this.sanitizeString(value, rule.allowHtml || false);
        }
        
        // Number validations
        if (rule.type === 'number') {
          if (rule.min !== undefined && value < rule.min) {
            errors.push(`${field} must be at least ${rule.min}`);
          }
          
          if (rule.max !== undefined && value > rule.max) {
            errors.push(`${field} must not exceed ${rule.max}`);
          }
        }
        
        // Array validations
        if (rule.type === 'array') {
          if (rule.minItems && value.length < rule.minItems) {
            errors.push(`${field} must have at least ${rule.minItems} items`);
          }
          
          if (rule.maxItems && value.length > rule.maxItems) {
            errors.push(`${field} must not have more than ${rule.maxItems} items`);
          }
        }
        
        // Custom validation
        if (rule.custom && typeof rule.custom === 'function') {
          const customResult = rule.custom(value);
          if (customResult !== true) {
            errors.push(customResult || `${field} is invalid`);
          }
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitized
    };
  }
  
  // String sanitization
  static sanitizeString(input: string, allowHtml: boolean = false): string {
    if (!allowHtml) {
      // Remove all HTML tags and encode special characters
      return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    } else {
      // Allow specific safe HTML tags
      const allowedTags = ['b', 'i', 'em', 'strong', 'p', 'br'];
      const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
      
      return input.replace(tagRegex, (match, tagName) => {
        if (allowedTags.includes(tagName.toLowerCase())) {
          return match;
        }
        return '';
      });
    }
  }
  
  // SQL injection prevention
  static sanitizeForSQL(input: string): string {
    return input
      .replace(/'/g, "''")
      .replace(/"/g, '""')
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '');
  }
  
  // NoSQL injection prevention
  static sanitizeForNoSQL(input: any): any {
    if (typeof input === 'string') {
      // Remove MongoDB operators
      return input.replace(/\$[a-zA-Z]+/g, '');
    }
    
    if (typeof input === 'object' && input !== null) {
      const sanitized = {};
      for (const [key, value] of Object.entries(input)) {
        // Remove keys starting with $
        if (!key.startsWith('$')) {
          sanitized[key] = this.sanitizeForNoSQL(value);
        }
      }
      return sanitized;
    }
    
    return input;
  }
  
  // Command injection prevention
  static sanitizeForCommand(input: string): string {
    const dangerousChars = /[;&|`$(){}\[\]<>]/g;
    return input.replace(dangerousChars, '');
  }
  
  // Path traversal prevention
  static sanitizePath(path: string): string {
    return path
      .replace(/\.\./g, '') // Remove parent directory references
      .replace(/[^a-zA-Z0-9._\/-]/g, '') // Allow only safe characters
      .replace(/^\/+/, '') // Remove leading slashes
      .replace(/\/+/g, '/'); // Normalize multiple slashes
  }
  
  // Rate limiting implementation
  static createRateLimiter(options: any) {
    const requests = new Map();
    
    return {
      isAllowed: (identifier: string): boolean => {
        const now = Date.now();
        const windowStart = now - options.windowMs;
        
        // Clean old entries
        for (const [key, timestamps] of requests.entries()) {
          const filtered = timestamps.filter((time: number) => time > windowStart);
          if (filtered.length === 0) {
            requests.delete(key);
          } else {
            requests.set(key, filtered);
          }
        }
        
        // Check current identifier
        const userRequests = requests.get(identifier) || [];
        const recentRequests = userRequests.filter((time: number) => time > windowStart);
        
        if (recentRequests.length >= options.max) {
          return false;
        }
        
        // Add current request
        recentRequests.push(now);
        requests.set(identifier, recentRequests);
        
        return true;
      },
      
      getRemainingRequests: (identifier: string): number => {
        const now = Date.now();
        const windowStart = now - options.windowMs;
        const userRequests = requests.get(identifier) || [];
        const recentRequests = userRequests.filter((time: number) => time > windowStart);
        return Math.max(0, options.max - recentRequests.length);
      }
    };
  }
  
  // Secure random generation
  static generateSecureRandom(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Secure comparison (timing attack resistant)
  static secureCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }
    
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    
    return result === 0;
  }
  
  // Content Security Policy generator
  static generateCSP(options: any): string {
    const directives = [];
    
    // Default source
    if (options.defaultSrc) {
      directives.push(`default-src ${options.defaultSrc.join(' ')}`);
    }
    
    // Script source
    if (options.scriptSrc) {
      directives.push(`script-src ${options.scriptSrc.join(' ')}`);
    }
    
    // Style source
    if (options.styleSrc) {
      directives.push(`style-src ${options.styleSrc.join(' ')}`);
    }
    
    // Image source
    if (options.imgSrc) {
      directives.push(`img-src ${options.imgSrc.join(' ')}`);
    }
    
    // Connect source
    if (options.connectSrc) {
      directives.push(`connect-src ${options.connectSrc.join(' ')}`);
    }
    
    // Font source
    if (options.fontSrc) {
      directives.push(`font-src ${options.fontSrc.join(' ')}`);
    }
    
    // Frame source
    if (options.frameSrc) {
      directives.push(`frame-src ${options.frameSrc.join(' ')}`);
    }
    
    // Object source
    if (options.objectSrc) {
      directives.push(`object-src ${options.objectSrc.join(' ')}`);
    }
    
    // Base URI
    if (options.baseUri) {
      directives.push(`base-uri ${options.baseUri.join(' ')}`);
    }
    
    // Form action
    if (options.formAction) {
      directives.push(`form-action ${options.formAction.join(' ')}`);
    }
    
    // Upgrade insecure requests
    if (options.upgradeInsecureRequests) {
      directives.push('upgrade-insecure-requests');
    }
    
    return directives.join('; ');
  }
  
  // Security headers generator
  static generateSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
      'Content-Security-Policy': this.generateCSP({
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: true
      })
    };
  }
  
  // Vulnerability scanner
  static scanForVulnerabilities(code: string): any[] {
    const vulnerabilities = [];
    
    // Check for potential XSS
    if (/innerHTML\s*=/.test(code)) {
      vulnerabilities.push({
        type: 'XSS',
        severity: 'high',
        description: 'Potential XSS vulnerability: innerHTML assignment detected',
        recommendation: 'Use textContent or proper sanitization'
      });
    }
    
    // Check for eval usage
    if (/\beval\s*\(/.test(code)) {
      vulnerabilities.push({
        type: 'Code Injection',
        severity: 'critical',
        description: 'eval() usage detected',
        recommendation: 'Avoid eval() and use safer alternatives'
      });
    }
    
    // Check for document.write
    if (/document\.write\s*\(/.test(code)) {
      vulnerabilities.push({
        type: 'XSS',
        severity: 'medium',
        description: 'document.write() usage detected',
        recommendation: 'Use DOM manipulation methods instead'
      });
    }
    
    // Check for hardcoded secrets
    const secretPatterns = [
      /password\s*[:=]\s*['"][^'"]+['"]/i,
      /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/i,
      /secret\s*[:=]\s*['"][^'"]+['"]/i,
      /token\s*[:=]\s*['"][^'"]+['"]/i
    ];
    
    secretPatterns.forEach(pattern => {
      if (pattern.test(code)) {
        vulnerabilities.push({
          type: 'Information Disclosure',
          severity: 'high',
          description: 'Hardcoded secret detected',
          recommendation: 'Use environment variables or secure configuration'
        });
      }
    });
    
    // Check for SQL injection patterns
    if (/['"]\s*\+\s*\w+\s*\+\s*['"]/.test(code)) {
      vulnerabilities.push({
        type: 'SQL Injection',
        severity: 'high',
        description: 'Potential SQL injection: string concatenation in query',
        recommendation: 'Use parameterized queries or prepared statements'
      });
    }
    
    return vulnerabilities;
  }
}
```

### Q16: How do you implement security monitoring and incident response in frontend applications?

**Answer:**
Security monitoring involves real-time detection of threats, logging security events, and implementing automated response mechanisms.

**Security Monitoring Implementation:**
```typescript
// Security monitoring and incident response system
class SecurityMonitor {
  private eventQueue: any[] = [];
  private alertThresholds: Map<string, any> = new Map();
  private incidentHandlers: Map<string, Function> = new Map();
  private isMonitoring: boolean = false;
  
  constructor() {
    this.initializeThresholds();
    this.initializeHandlers();
    this.startMonitoring();
  }
  
  // Real-time security event monitoring
  startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    
    // Monitor DOM mutations for potential XSS
    this.setupDOMMonitoring();
    
    // Monitor network requests for suspicious activity
    this.setupNetworkMonitoring();
    
    // Monitor user behavior for anomalies
    this.setupBehaviorMonitoring();
    
    // Monitor console for security warnings
    this.setupConsoleMonitoring();
    
    // Process event queue
    this.processEventQueue();
    
    console.log('Security monitoring started');
  }
  
  stopMonitoring(): void {
    this.isMonitoring = false;
    console.log('Security monitoring stopped');
  }
  
  // Log security events
  logSecurityEvent(event: any): void {
    const securityEvent = {
      id: this.generateEventId(),
      timestamp: new Date().toISOString(),
      type: event.type,
      severity: event.severity || 'medium',
      source: event.source || 'unknown',
      details: event.details || {},
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getCurrentUserId(),
      sessionId: this.getCurrentSessionId()
    };
    
    // Add to event queue
    this.eventQueue.push(securityEvent);
    
    // Check for immediate threats
    this.evaluateEvent(securityEvent);
    
    // Send to backend if critical
    if (securityEvent.severity === 'critical' || securityEvent.severity === 'high') {
      this.sendEventToBackend(securityEvent);
    }
  }
  
  private setupDOMMonitoring(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Check for suspicious script injections
              if (element.tagName === 'SCRIPT') {
                this.logSecurityEvent({
                  type: 'script_injection',
                  severity: 'high',
                  source: 'dom_monitor',
                  details: {
                    src: element.getAttribute('src'),
                    content: element.textContent?.substring(0, 100)
                  }
                });
              }
              
              // Check for suspicious iframe injections
              if (element.tagName === 'IFRAME') {
                this.logSecurityEvent({
                  type: 'iframe_injection',
                  severity: 'medium',
                  source: 'dom_monitor',
                  details: {
                    src: element.getAttribute('src')
                  }
                });
              }
            }
          });
        }
        
        // Monitor attribute changes for potential XSS
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          const attributeName = mutation.attributeName;
          
          if (attributeName && ['onclick', 'onload', 'onerror'].includes(attributeName)) {
            this.logSecurityEvent({
              type: 'suspicious_attribute',
              severity: 'medium',
              source: 'dom_monitor',
              details: {
                element: target.tagName,
                attribute: attributeName,
                value: target.getAttribute(attributeName)
              }
            });
          }
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['onclick', 'onload', 'onerror', 'src', 'href']
    });
  }
  
  private setupNetworkMonitoring(): void {
    // Override fetch to monitor requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [resource, config] = args;
      const url = typeof resource === 'string' ? resource : resource.url;
      
      // Check for suspicious requests
      if (this.isSuspiciousRequest(url, config)) {
        this.logSecurityEvent({
          type: 'suspicious_request',
          severity: 'medium',
          source: 'network_monitor',
          details: {
            url,
            method: config?.method || 'GET',
            headers: config?.headers
          }
        });
      }
      
      try {
        const response = await originalFetch(...args);
        
        // Monitor response for security headers
        this.checkSecurityHeaders(response);
        
        return response;
      } catch (error) {
        this.logSecurityEvent({
          type: 'network_error',
          severity: 'low',
          source: 'network_monitor',
          details: {
            url,
            error: error.message
          }
        });
        throw error;
      }
    };
    
    // Override XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      if (this.isSuspiciousRequest(url, { method })) {
        this.logSecurityEvent({
          type: 'suspicious_xhr',
          severity: 'medium',
          source: 'network_monitor',
          details: { method, url }
        });
      }
      return originalXHROpen.call(this, method, url, ...args);
    }.bind(this);
  }
  
  private setupBehaviorMonitoring(): void {
    let clickCount = 0;
    let keyCount = 0;
    let lastActivity = Date.now();
    
    // Monitor rapid clicking (potential bot behavior)
    document.addEventListener('click', () => {
      clickCount++;
      const now = Date.now();
      
      if (now - lastActivity < 100) { // Less than 100ms between clicks
        if (clickCount > 10) {
          this.logSecurityEvent({
            type: 'rapid_clicking',
            severity: 'low',
            source: 'behavior_monitor',
            details: { clickCount, timeWindow: now - lastActivity }
          });
          clickCount = 0;
        }
      } else {
        clickCount = 1;
      }
      
      lastActivity = now;
    });
    
    // Monitor rapid key presses
    document.addEventListener('keydown', () => {
      keyCount++;
      const now = Date.now();
      
      if (now - lastActivity < 50) { // Less than 50ms between key presses
        if (keyCount > 20) {
          this.logSecurityEvent({
            type: 'rapid_typing',
            severity: 'low',
            source: 'behavior_monitor',
            details: { keyCount, timeWindow: now - lastActivity }
          });
          keyCount = 0;
        }
      } else {
        keyCount = 1;
      }
      
      lastActivity = now;
    });
    
    // Monitor page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.logSecurityEvent({
          type: 'page_hidden',
          severity: 'info',
          source: 'behavior_monitor',
          details: { timestamp: Date.now() }
        });
      }
    });
  }
  
  private setupConsoleMonitoring(): void {
    // Override console methods to catch security warnings
    const originalError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      
      // Check for security-related errors
      if (this.isSecurityRelatedError(message)) {
        this.logSecurityEvent({
          type: 'console_security_error',
          severity: 'medium',
          source: 'console_monitor',
          details: { message }
        });
      }
      
      return originalError.apply(console, args);
    };
    
    const originalWarn = console.warn;
    console.warn = (...args) => {
      const message = args.join(' ');
      
      if (this.isSecurityRelatedError(message)) {
        this.logSecurityEvent({
          type: 'console_security_warning',
          severity: 'low',
          source: 'console_monitor',
          details: { message }
        });
      }
      
      return originalWarn.apply(console, args);
    };
  }
  
  private evaluateEvent(event: any): void {
    const threshold = this.alertThresholds.get(event.type);
    
    if (threshold) {
      // Check if event exceeds threshold
      const recentEvents = this.eventQueue.filter(e => 
        e.type === event.type && 
        Date.now() - new Date(e.timestamp).getTime() < threshold.timeWindow
      );
      
      if (recentEvents.length >= threshold.count) {
        this.triggerIncident({
          type: `${event.type}_threshold_exceeded`,
          severity: 'high',
          events: recentEvents,
          threshold
        });
      }
    }
  }
  
  private triggerIncident(incident: any): void {
    const handler = this.incidentHandlers.get(incident.type);
    
    if (handler) {
      handler(incident);
    } else {
      this.defaultIncidentHandler(incident);
    }
  }
  
  private defaultIncidentHandler(incident: any): void {
    console.warn('Security incident detected:', incident);
    
    // Send alert to backend
    this.sendIncidentAlert(incident);
    
    // Take defensive actions based on severity
    if (incident.severity === 'critical') {
      this.lockdownMode();
    } else if (incident.severity === 'high') {
      this.enhancedSecurityMode();
    }
  }
  
  private lockdownMode(): void {
    console.warn('Entering security lockdown mode');
    
    // Disable certain features
    this.disableFileUploads();
    this.enableStrictCSP();
    this.logoutUser();
    
    // Show security warning to user
    this.showSecurityWarning('Critical security threat detected. Please contact support.');
  }
  
  private enhancedSecurityMode(): void {
    console.warn('Entering enhanced security mode');
    
    // Increase monitoring frequency
    this.increaseMonitoringFrequency();
    
    // Require additional authentication
    this.requireReAuthentication();
    
    // Show warning to user
    this.showSecurityWarning('Unusual activity detected. Enhanced security measures activated.');
  }
  
  private processEventQueue(): void {
    if (!this.isMonitoring) return;
    
    // Clean old events (older than 24 hours)
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);
    this.eventQueue = this.eventQueue.filter(event => 
      new Date(event.timestamp).getTime() > cutoff
    );
    
    // Send batch of events to backend
    if (this.eventQueue.length > 100) {
      this.sendEventBatch();
    }
    
    // Schedule next processing
    setTimeout(() => this.processEventQueue(), 60000); // Every minute
  }
  
  private initializeThresholds(): void {
    this.alertThresholds.set('script_injection', { count: 3, timeWindow: 300000 }); // 3 in 5 minutes
    this.alertThresholds.set('suspicious_request', { count: 10, timeWindow: 600000 }); // 10 in 10 minutes
    this.alertThresholds.set('rapid_clicking', { count: 5, timeWindow: 300000 }); // 5 in 5 minutes
    this.alertThresholds.set('failed_login', { count: 5, timeWindow: 900000 }); // 5 in 15 minutes
  }
  
  private initializeHandlers(): void {
    this.incidentHandlers.set('script_injection_threshold_exceeded', (incident) => {
      console.error('Multiple script injections detected:', incident);
      this.lockdownMode();
    });
    
    this.incidentHandlers.set('suspicious_request_threshold_exceeded', (incident) => {
      console.warn('Suspicious network activity detected:', incident);
      this.enhancedSecurityMode();
    });
  }
  
  // Utility methods
  private generateEventId(): string {
    return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  private getCurrentUserId(): string | null {
    // Get from session or authentication context
    return localStorage.getItem('userId') || null;
  }
  
  private getCurrentSessionId(): string | null {
    // Get from session manager
    return localStorage.getItem('sessionId') || null;
  }
  
  private isSuspiciousRequest(url: string, config?: any): boolean {
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /\.\.\//, // Path traversal
      /javascript:/i, // JavaScript protocol
      /data:.*script/i, // Data URL with script
      /eval\(/i, // Eval in URL
      /<script/i // Script tags in URL
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(url));
  }
  
  private checkSecurityHeaders(response: Response): void {
    const requiredHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'content-security-policy'
    ];
    
    const missingHeaders = requiredHeaders.filter(header => 
      !response.headers.has(header)
    );
    
    if (missingHeaders.length > 0) {
      this.logSecurityEvent({
        type: 'missing_security_headers',
        severity: 'medium',
        source: 'network_monitor',
        details: { missingHeaders, url: response.url }
      });
    }
  }
  
  private isSecurityRelatedError(message: string): boolean {
    const securityKeywords = [
      'content security policy',
      'mixed content',
      'cors',
      'cross-origin',
      'unsafe-eval',
      'unsafe-inline',
      'blocked by csp'
    ];
    
    return securityKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }
  
  // Placeholder methods for defensive actions
  private async sendEventToBackend(event: any): Promise<void> {
    try {
      await fetch('/api/security/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Failed to send security event:', error);
    }
  }
  
  private async sendEventBatch(): Promise<void> {
    const batch = this.eventQueue.splice(0, 100);
    try {
      await fetch('/api/security/events/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batch)
      });
    } catch (error) {
      console.error('Failed to send event batch:', error);
      // Put events back in queue
      this.eventQueue.unshift(...batch);
    }
  }
  
  private async sendIncidentAlert(incident: any): Promise<void> {
    try {
      await fetch('/api/security/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incident)
      });
    } catch (error) {
      console.error('Failed to send incident alert:', error);
    }
  }
  
  private disableFileUploads(): void {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      (input as HTMLInputElement).disabled = true;
    });
  }
  
  private enableStrictCSP(): void {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'none'; object-src 'none';";
    document.head.appendChild(meta);
  }
  
  private logoutUser(): void {
    // Clear session and redirect to login
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  }
  
  private showSecurityWarning(message: string): void {
    const warning = document.createElement('div');
    warning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ff4444;
      color: white;
      padding: 10px;
      text-align: center;
      z-index: 10000;
      font-weight: bold;
    `;
    warning.textContent = message;
    document.body.appendChild(warning);
  }
  
  private increaseMonitoringFrequency(): void {
    // Implement enhanced monitoring
  }
  
  private requireReAuthentication(): void {
    // Implement re-authentication flow
  }
}
```

---

### Q17: How do you implement secure deployment and DevSecOps practices for frontend applications?

**Answer:**
Secure deployment involves integrating security throughout the CI/CD pipeline, implementing secure build processes, and continuous security monitoring.

**Secure Deployment Framework:**
```typescript
// Secure deployment configuration and validation
class SecureDeploymentManager {
  private deploymentConfig: any;
  private securityChecks: Map<string, Function> = new Map();
  
  constructor(config: any) {
    this.deploymentConfig = config;
    this.initializeSecurityChecks();
  }
  
  // Pre-deployment security validation
  async validateDeployment(): Promise<any> {
    const results = {
      passed: true,
      checks: [],
      errors: [],
      warnings: []
    };
    
    console.log('Starting pre-deployment security validation...');
    
    for (const [checkName, checkFunction] of this.securityChecks) {
      try {
        const result = await checkFunction();
        results.checks.push({
          name: checkName,
          status: result.passed ? 'passed' : 'failed',
          details: result.details || {},
          recommendations: result.recommendations || []
        });
        
        if (!result.passed) {
          results.passed = false;
          if (result.severity === 'error') {
            results.errors.push(`${checkName}: ${result.message}`);
          } else {
            results.warnings.push(`${checkName}: ${result.message}`);
          }
        }
      } catch (error) {
        results.passed = false;
        results.errors.push(`${checkName}: Check failed - ${error.message}`);
      }
    }
    
    return results;
  }
  
  // Generate security configuration for deployment
  generateSecurityConfig(): any {
    return {
      // Content Security Policy
      csp: this.generateCSPConfig(),
      
      // Security headers
      headers: this.generateSecurityHeaders(),
      
      // HTTPS configuration
      https: this.generateHTTPSConfig(),
      
      // Environment variables
      environment: this.generateEnvironmentConfig(),
      
      // Build configuration
      build: this.generateBuildConfig(),
      
      // Monitoring configuration
      monitoring: this.generateMonitoringConfig()
    };
  }
  
  private initializeSecurityChecks(): void {
    // Dependency vulnerability check
    this.securityChecks.set('dependency_vulnerabilities', async () => {
      return await this.checkDependencyVulnerabilities();
    });
    
    // Source code security scan
    this.securityChecks.set('source_code_security', async () => {
      return await this.scanSourceCodeSecurity();
    });
    
    // Configuration security check
    this.securityChecks.set('configuration_security', async () => {
      return await this.validateConfigurationSecurity();
    });
    
    // Build artifacts security check
    this.securityChecks.set('build_artifacts_security', async () => {
      return await this.validateBuildArtifacts();
    });
    
    // Environment security check
    this.securityChecks.set('environment_security', async () => {
      return await this.validateEnvironmentSecurity();
    });
    
    // SSL/TLS configuration check
    this.securityChecks.set('ssl_tls_configuration', async () => {
      return await this.validateSSLTLSConfiguration();
    });
    
    // Access control check
    this.securityChecks.set('access_control', async () => {
      return await this.validateAccessControl();
    });
  }
  
  private async checkDependencyVulnerabilities(): Promise<any> {
    // Simulate npm audit or similar tool
    const vulnerabilities = {
      critical: 0,
      high: 2,
      medium: 5,
      low: 10
    };
    
    const hasCriticalVulns = vulnerabilities.critical > 0;
    const hasHighVulns = vulnerabilities.high > 0;
    
    return {
      passed: !hasCriticalVulns,
      severity: hasCriticalVulns ? 'error' : (hasHighVulns ? 'warning' : 'info'),
      message: hasCriticalVulns ? 
        `${vulnerabilities.critical} critical vulnerabilities found` :
        `${vulnerabilities.high} high vulnerabilities found`,
      details: vulnerabilities,
      recommendations: [
        'Run npm audit fix to resolve vulnerabilities',
        'Update dependencies to latest secure versions',
        'Consider alternative packages for vulnerable dependencies'
      ]
    };
  }
  
  private async scanSourceCodeSecurity(): Promise<any> {
    const securityIssues = [];
    
    // Simulate static code analysis
    const codePatterns = [
      {
        pattern: /console\.log\(/g,
        severity: 'low',
        message: 'Console.log statements found - may leak sensitive information'
      },
      {
        pattern: /eval\(/g,
        severity: 'high',
        message: 'eval() usage detected - potential code injection vulnerability'
      },
      {
        pattern: /innerHTML\s*=/g,
        severity: 'medium',
        message: 'innerHTML usage detected - potential XSS vulnerability'
      },
      {
        pattern: /document\.write\(/g,
        severity: 'medium',
        message: 'document.write() usage detected - potential XSS vulnerability'
      }
    ];
    
    // In a real implementation, you would scan actual source files
    // For demo purposes, simulating some issues
    securityIssues.push({
      file: 'src/utils/debug.ts',
      line: 15,
      severity: 'low',
      message: 'Console.log statements found'
    });
    
    const hasHighSeverity = securityIssues.some(issue => issue.severity === 'high');
    
    return {
      passed: !hasHighSeverity,
      severity: hasHighSeverity ? 'error' : 'warning',
      message: `${securityIssues.length} security issues found in source code`,
      details: { issues: securityIssues },
      recommendations: [
        'Remove console.log statements from production code',
        'Use safe DOM manipulation methods',
        'Implement proper input sanitization'
      ]
    };
  }
  
  private async validateConfigurationSecurity(): Promise<any> {
    const configIssues = [];
    
    // Check for hardcoded secrets
    if (this.deploymentConfig.apiKey && this.deploymentConfig.apiKey.includes('hardcoded')) {
      configIssues.push({
        type: 'hardcoded_secret',
        message: 'Hardcoded API key detected in configuration'
      });
    }
    
    // Check for insecure defaults
    if (this.deploymentConfig.debug === true) {
      configIssues.push({
        type: 'debug_enabled',
        message: 'Debug mode enabled in production configuration'
      });
    }
    
    // Check for missing security headers configuration
    if (!this.deploymentConfig.securityHeaders) {
      configIssues.push({
        type: 'missing_security_headers',
        message: 'Security headers not configured'
      });
    }
    
    return {
      passed: configIssues.length === 0,
      severity: configIssues.length > 0 ? 'error' : 'info',
      message: configIssues.length > 0 ? 
        `${configIssues.length} configuration security issues found` :
        'Configuration security validation passed',
      details: { issues: configIssues },
      recommendations: [
        'Use environment variables for sensitive configuration',
        'Disable debug mode in production',
        'Configure security headers'
      ]
    };
  }
  
  private async validateBuildArtifacts(): Promise<any> {
    const artifactIssues = [];
    
    // Check for source maps in production
    if (this.deploymentConfig.sourceMaps === true) {
      artifactIssues.push({
        type: 'source_maps_enabled',
        message: 'Source maps enabled in production build'
      });
    }
    
    // Check for unminified code
    if (this.deploymentConfig.minification === false) {
      artifactIssues.push({
        type: 'unminified_code',
        message: 'Code minification disabled'
      });
    }
    
    // Check for test files in build
    if (this.deploymentConfig.includeTests === true) {
      artifactIssues.push({
        type: 'test_files_included',
        message: 'Test files included in production build'
      });
    }
    
    return {
      passed: artifactIssues.length === 0,
      severity: artifactIssues.length > 0 ? 'warning' : 'info',
      message: artifactIssues.length > 0 ? 
        `${artifactIssues.length} build artifact issues found` :
        'Build artifacts validation passed',
      details: { issues: artifactIssues },
      recommendations: [
        'Disable source maps in production',
        'Enable code minification',
        'Exclude test files from production build'
      ]
    };
  }
  
  private async validateEnvironmentSecurity(): Promise<any> {
    const envIssues = [];
    
    // Check for required environment variables
    const requiredEnvVars = ['NODE_ENV', 'API_URL', 'APP_SECRET'];
    const missingEnvVars = requiredEnvVars.filter(envVar => 
      !process.env[envVar]
    );
    
    if (missingEnvVars.length > 0) {
      envIssues.push({
        type: 'missing_env_vars',
        message: `Missing required environment variables: ${missingEnvVars.join(', ')}`
      });
    }
    
    // Check for insecure environment settings
    if (process.env.NODE_ENV !== 'production') {
      envIssues.push({
        type: 'non_production_env',
        message: 'NODE_ENV is not set to production'
      });
    }
    
    return {
      passed: envIssues.length === 0,
      severity: envIssues.length > 0 ? 'error' : 'info',
      message: envIssues.length > 0 ? 
        `${envIssues.length} environment security issues found` :
        'Environment security validation passed',
      details: { issues: envIssues },
      recommendations: [
        'Set all required environment variables',
        'Set NODE_ENV to production',
        'Use secure environment variable management'
      ]
    };
  }
  
  private async validateSSLTLSConfiguration(): Promise<any> {
    const sslIssues = [];
    
    // Check SSL/TLS configuration
    if (!this.deploymentConfig.ssl?.enabled) {
      sslIssues.push({
        type: 'ssl_disabled',
        message: 'SSL/TLS not enabled'
      });
    }
    
    if (this.deploymentConfig.ssl?.version && this.deploymentConfig.ssl.version < 1.2) {
      sslIssues.push({
        type: 'outdated_tls_version',
        message: 'TLS version is outdated (< 1.2)'
      });
    }
    
    if (!this.deploymentConfig.ssl?.hsts) {
      sslIssues.push({
        type: 'hsts_disabled',
        message: 'HTTP Strict Transport Security (HSTS) not enabled'
      });
    }
    
    return {
      passed: sslIssues.length === 0,
      severity: sslIssues.length > 0 ? 'error' : 'info',
      message: sslIssues.length > 0 ? 
        `${sslIssues.length} SSL/TLS configuration issues found` :
        'SSL/TLS configuration validation passed',
      details: { issues: sslIssues },
      recommendations: [
        'Enable SSL/TLS encryption',
        'Use TLS 1.2 or higher',
        'Enable HSTS headers',
        'Use strong cipher suites'
      ]
    };
  }
  
  private async validateAccessControl(): Promise<any> {
    const accessIssues = [];
    
    // Check for proper access controls
    if (!this.deploymentConfig.authentication?.enabled) {
      accessIssues.push({
        type: 'authentication_disabled',
        message: 'Authentication not enabled'
      });
    }
    
    if (!this.deploymentConfig.authorization?.rbac) {
      accessIssues.push({
        type: 'rbac_disabled',
        message: 'Role-based access control not configured'
      });
    }
    
    if (this.deploymentConfig.cors?.allowAll) {
      accessIssues.push({
        type: 'permissive_cors',
        message: 'CORS configured to allow all origins'
      });
    }
    
    return {
      passed: accessIssues.length === 0,
      severity: accessIssues.length > 0 ? 'warning' : 'info',
      message: accessIssues.length > 0 ? 
        `${accessIssues.length} access control issues found` :
        'Access control validation passed',
      details: { issues: accessIssues },
      recommendations: [
        'Enable authentication for protected resources',
        'Implement role-based access control',
        'Configure CORS with specific allowed origins'
      ]
    };
  }
  
  private generateCSPConfig(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.example.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; ');
  }
  
  private generateSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)'
    };
  }
  
  private generateHTTPSConfig(): any {
    return {
      enabled: true,
      redirectHttp: true,
      hsts: {
        enabled: true,
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      },
      tlsVersion: '1.2+',
      cipherSuites: 'strong'
    };
  }
  
  private generateEnvironmentConfig(): any {
    return {
      NODE_ENV: 'production',
      DEBUG: false,
      LOG_LEVEL: 'warn',
      SECURE_COOKIES: true,
      SESSION_TIMEOUT: 1800000 // 30 minutes
    };
  }
  
  private generateBuildConfig(): any {
    return {
      minification: true,
      sourceMaps: false,
      removeComments: true,
      removeConsole: true,
      excludeTests: true,
      bundleAnalysis: true
    };
  }
  
  private generateMonitoringConfig(): any {
    return {
      securityEvents: {
        enabled: true,
        endpoint: '/api/security/events',
        batchSize: 100,
        flushInterval: 60000
      },
      errorTracking: {
        enabled: true,
        sanitizeData: true,
        excludePersonalData: true
      },
      performanceMonitoring: {
        enabled: true,
        sampleRate: 0.1
      }
    };
  }
}
```

### Q18: How do you implement secure client-side storage and data protection?

**Answer:**
Secure client-side storage involves protecting sensitive data stored in browsers using encryption, proper storage mechanisms, and data lifecycle management.

**Secure Storage Implementation:**
```typescript
// Secure client-side storage manager
class SecureStorageManager {
  private encryptionKey: string;
  private storagePrefix: string = 'secure_';
  private maxAge: number = 24 * 60 * 60 * 1000; // 24 hours
  
  constructor(encryptionKey?: string) {
    this.encryptionKey = encryptionKey || this.generateEncryptionKey();
    this.cleanupExpiredData();
  }
  
  // Secure data storage with encryption
  setSecureItem(key: string, value: any, options: any = {}): boolean {
    try {
      const data = {
        value: value,
        timestamp: Date.now(),
        expiresAt: options.expiresAt || (Date.now() + this.maxAge),
        encrypted: options.encrypt !== false,
        sensitive: options.sensitive || false
      };
      
      let serializedData = JSON.stringify(data);
      
      // Encrypt sensitive data
      if (data.encrypted) {
        serializedData = this.encrypt(serializedData);
      }
      
      // Choose appropriate storage mechanism
      const storageKey = this.storagePrefix + key;
      
      if (options.sessionOnly) {
        sessionStorage.setItem(storageKey, serializedData);
      } else {
        localStorage.setItem(storageKey, serializedData);
      }
      
      // Log storage event (without sensitive data)
      this.logStorageEvent('set', key, {
        encrypted: data.encrypted,
        sensitive: data.sensitive,
        sessionOnly: options.sessionOnly || false
      });
      
      return true;
    } catch (error) {
      console.error('Failed to store secure item:', error);
      return false;
    }
  }
  
  // Secure data retrieval with decryption
  getSecureItem(key: string): any {
    try {
      const storageKey = this.storagePrefix + key;
      
      // Try localStorage first, then sessionStorage
      let serializedData = localStorage.getItem(storageKey) || 
                          sessionStorage.getItem(storageKey);
      
      if (!serializedData) {
        return null;
      }
      
      // Try to decrypt if it looks encrypted
      if (this.isEncrypted(serializedData)) {
        serializedData = this.decrypt(serializedData);
      }
      
      const data = JSON.parse(serializedData);
      
      // Check expiration
      if (data.expiresAt && Date.now() > data.expiresAt) {
        this.removeSecureItem(key);
        return null;
      }
      
      // Log access event
      this.logStorageEvent('get', key, {
        encrypted: data.encrypted,
        sensitive: data.sensitive
      });
      
      return data.value;
    } catch (error) {
      console.error('Failed to retrieve secure item:', error);
      // Remove corrupted data
      this.removeSecureItem(key);
      return null;
    }
  }
  
  // Remove secure item
  removeSecureItem(key: string): boolean {
    try {
      const storageKey = this.storagePrefix + key;
      
      localStorage.removeItem(storageKey);
      sessionStorage.removeItem(storageKey);
      
      this.logStorageEvent('remove', key, {});
      
      return true;
    } catch (error) {
      console.error('Failed to remove secure item:', error);
      return false;
    }
  }
  
  // Clear all secure data
  clearAllSecureData(): void {
    try {
      // Clear localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear sessionStorage
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          sessionStorage.removeItem(key);
        }
      });
      
      this.logStorageEvent('clear_all', '', {});
    } catch (error) {
      console.error('Failed to clear secure data:', error);
    }
  }
  
  // Secure token management
  setAuthToken(token: string, refreshToken?: string): boolean {
    const success = this.setSecureItem('auth_token', token, {
      encrypt: true,
      sensitive: true,
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour
    });
    
    if (refreshToken) {
      this.setSecureItem('refresh_token', refreshToken, {
        encrypt: true,
        sensitive: true,
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      });
    }
    
    return success;
  }
  
  getAuthToken(): string | null {
    return this.getSecureItem('auth_token');
  }
  
  getRefreshToken(): string | null {
    return this.getSecureItem('refresh_token');
  }
  
  clearAuthTokens(): void {
    this.removeSecureItem('auth_token');
    this.removeSecureItem('refresh_token');
  }
  
  // User preferences with privacy protection
  setUserPreference(key: string, value: any, isPersonal: boolean = false): boolean {
    return this.setSecureItem(`pref_${key}`, value, {
      encrypt: isPersonal,
      sensitive: isPersonal,
      sessionOnly: false
    });
  }
  
  getUserPreference(key: string): any {
    return this.getSecureItem(`pref_${key}`);
  }
  
  // Secure form data temporary storage
  setFormData(formId: string, data: any, expiresInMinutes: number = 30): boolean {
    return this.setSecureItem(`form_${formId}`, data, {
      encrypt: true,
      sensitive: true,
      sessionOnly: true,
      expiresAt: Date.now() + (expiresInMinutes * 60 * 1000)
    });
  }
  
  getFormData(formId: string): any {
    return this.getSecureItem(`form_${formId}`);
  }
  
  clearFormData(formId: string): void {
    this.removeSecureItem(`form_${formId}`);
  }
  
  // Data encryption/decryption
  private encrypt(data: string): string {
    try {
      // Simple XOR encryption for demo (use proper encryption in production)
      let encrypted = '';
      for (let i = 0; i < data.length; i++) {
        const keyChar = this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
        const dataChar = data.charCodeAt(i);
        encrypted += String.fromCharCode(dataChar ^ keyChar);
      }
      return btoa(encrypted); // Base64 encode
    } catch (error) {
      console.error('Encryption failed:', error);
      return data; // Return original data if encryption fails
    }
  }
  
  private decrypt(encryptedData: string): string {
    try {
      const encrypted = atob(encryptedData); // Base64 decode
      let decrypted = '';
      for (let i = 0; i < encrypted.length; i++) {
        const keyChar = this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
        const encryptedChar = encrypted.charCodeAt(i);
        decrypted += String.fromCharCode(encryptedChar ^ keyChar);
      }
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }
  
  private isEncrypted(data: string): boolean {
    // Check if data looks like base64 encoded
    try {
      return btoa(atob(data)) === data;
    } catch {
      return false;
    }
  }
  
  private generateEncryptionKey(): string {
    // Generate a simple key based on browser fingerprint
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset().toString()
    ].join('|');
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }
  
  // Cleanup expired data
  private cleanupExpiredData(): void {
    const now = Date.now();
    
    // Cleanup localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.storagePrefix)) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            let data;
            if (this.isEncrypted(item)) {
              data = JSON.parse(this.decrypt(item));
            } else {
              data = JSON.parse(item);
            }
            
            if (data.expiresAt && now > data.expiresAt) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          // Remove corrupted data
          localStorage.removeItem(key);
        }
      }
    });
    
    // Cleanup sessionStorage
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith(this.storagePrefix)) {
        try {
          const item = sessionStorage.getItem(key);
          if (item) {
            let data;
            if (this.isEncrypted(item)) {
              data = JSON.parse(this.decrypt(item));
            } else {
              data = JSON.parse(item);
            }
            
            if (data.expiresAt && now > data.expiresAt) {
              sessionStorage.removeItem(key);
            }
          }
        } catch (error) {
          // Remove corrupted data
          sessionStorage.removeItem(key);
        }
      }
    });
  }
  
  // Storage event logging
  private logStorageEvent(action: string, key: string, metadata: any): void {
    const event = {
      action,
      key: key.replace(/sensitive|token|password/gi, '[REDACTED]'),
      timestamp: Date.now(),
      metadata: {
        ...metadata,
        userAgent: navigator.userAgent.substring(0, 50)
      }
    };
    
    // Send to monitoring system (without sensitive data)
    if (window.securityMonitor) {
      window.securityMonitor.logSecurityEvent({
        type: 'storage_access',
        severity: 'info',
        source: 'secure_storage',
        details: event
      });
    }
  }
  
  // Storage quota management
  getStorageQuota(): any {
    try {
      const used = new Blob(Object.values(localStorage)).size;
      const available = 5 * 1024 * 1024; // Approximate 5MB limit
      
      return {
        used,
        available,
        percentage: (used / available) * 100
      };
    } catch (error) {
      return { used: 0, available: 0, percentage: 0 };
    }
  }
  
  // Data export for compliance (GDPR, etc.)
  exportUserData(): any {
    const userData = {};
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.storagePrefix)) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            let data;
            if (this.isEncrypted(item)) {
              data = JSON.parse(this.decrypt(item));
            } else {
              data = JSON.parse(item);
            }
            
            // Only export non-sensitive data
            if (!data.sensitive) {
              userData[key.replace(this.storagePrefix, '')] = {
                value: data.value,
                timestamp: data.timestamp,
                expiresAt: data.expiresAt
              };
            }
          }
        } catch (error) {
          // Skip corrupted data
        }
      }
    });
    
    return userData;
  }
  
  // Data deletion for compliance
  deleteUserData(): void {
    this.clearAllSecureData();
    
    // Also clear any cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    
    this.logStorageEvent('delete_user_data', '', {});
  }
}
```

---

### Q19: How do you implement privacy compliance and data protection regulations (GDPR, CCPA) in frontend applications?

**Answer:**
Privacy compliance involves implementing consent management, data minimization, user rights, and transparent data handling practices.

**Privacy Compliance Framework:**
```typescript
// Privacy compliance and consent management system
class PrivacyComplianceManager {
  private consentData: Map<string, any> = new Map();
  private dataProcessingLog: any[] = [];
  private privacySettings: any = {};
  private userRights: string[] = ['access', 'rectification', 'erasure', 'portability', 'restriction'];
  
  constructor() {
    this.initializePrivacySettings();
    this.loadConsentData();
    this.setupPrivacyMonitoring();
  }
  
  // Consent management
  requestConsent(purpose: string, description: string, required: boolean = false): Promise<boolean> {
    return new Promise((resolve) => {
      const consentModal = this.createConsentModal(purpose, description, required);
      
      const handleConsent = (granted: boolean) => {
        this.recordConsent(purpose, granted, {
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          ipAddress: this.getClientIP(),
          required
        });
        
        document.body.removeChild(consentModal);
        resolve(granted);
      };
      
      consentModal.querySelector('.consent-accept')?.addEventListener('click', () => {
        handleConsent(true);
      });
      
      consentModal.querySelector('.consent-decline')?.addEventListener('click', () => {
        handleConsent(false);
      });
      
      document.body.appendChild(consentModal);
    });
  }
  
  // Record consent decision
  recordConsent(purpose: string, granted: boolean, metadata: any = {}): void {
    const consentRecord = {
      purpose,
      granted,
      timestamp: Date.now(),
      metadata,
      version: this.getPrivacyPolicyVersion()
    };
    
    this.consentData.set(purpose, consentRecord);
    this.saveConsentData();
    
    // Log consent event
    this.logDataProcessing('consent_recorded', {
      purpose,
      granted,
      timestamp: consentRecord.timestamp
    });
    
    // Update privacy settings based on consent
    this.updatePrivacySettings(purpose, granted);
  }
  
  // Check if consent is granted for a purpose
  hasConsent(purpose: string): boolean {
    const consent = this.consentData.get(purpose);
    
    if (!consent) {
      return false;
    }
    
    // Check if consent is still valid (not expired)
    const maxAge = 365 * 24 * 60 * 60 * 1000; // 1 year
    const isExpired = Date.now() - consent.timestamp > maxAge;
    
    if (isExpired) {
      this.consentData.delete(purpose);
      this.saveConsentData();
      return false;
    }
    
    return consent.granted;
  }
  
  // Withdraw consent
  withdrawConsent(purpose: string): void {
    const consent = this.consentData.get(purpose);
    
    if (consent) {
      consent.granted = false;
      consent.withdrawnAt = Date.now();
      
      this.consentData.set(purpose, consent);
      this.saveConsentData();
      
      // Log withdrawal
      this.logDataProcessing('consent_withdrawn', {
        purpose,
        timestamp: consent.withdrawnAt
      });
      
      // Update privacy settings
      this.updatePrivacySettings(purpose, false);
      
      // Clean up related data
      this.cleanupDataForPurpose(purpose);
    }
  }
  
  // Data processing logging
  logDataProcessing(activity: string, details: any): void {
    const logEntry = {
      id: this.generateLogId(),
      activity,
      details,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    this.dataProcessingLog.push(logEntry);
    
    // Keep only last 1000 entries
    if (this.dataProcessingLog.length > 1000) {
      this.dataProcessingLog = this.dataProcessingLog.slice(-1000);
    }
    
    // Save to storage
    this.saveProcessingLog();
  }
  
  // User rights implementation
  async exerciseUserRight(right: string, details: any = {}): Promise<any> {
    if (!this.userRights.includes(right)) {
      throw new Error(`Invalid user right: ${right}`);
    }
    
    this.logDataProcessing('user_right_exercised', {
      right,
      details,
      timestamp: Date.now()
    });
    
    switch (right) {
      case 'access':
        return this.provideDataAccess();
      
      case 'rectification':
        return this.rectifyData(details);
      
      case 'erasure':
        return this.eraseData(details);
      
      case 'portability':
        return this.exportData();
      
      case 'restriction':
        return this.restrictProcessing(details);
      
      default:
        throw new Error(`User right not implemented: ${right}`);
    }
  }
  
  // Right to access - provide user data
  private provideDataAccess(): any {
    const userData = {
      personalData: this.collectPersonalData(),
      consentHistory: Array.from(this.consentData.entries()),
      processingLog: this.dataProcessingLog.filter(entry => 
        entry.timestamp > Date.now() - (30 * 24 * 60 * 60 * 1000) // Last 30 days
      ),
      privacySettings: this.privacySettings,
      dataRetention: this.getDataRetentionInfo()
    };
    
    return userData;
  }
  
  // Right to rectification - update user data
  private async rectifyData(updates: any): Promise<boolean> {
    try {
      // Update local data
      Object.keys(updates).forEach(key => {
        if (this.isPersonalDataField(key)) {
          this.updatePersonalDataField(key, updates[key]);
        }
      });
      
      // Send updates to backend
      await this.sendDataUpdatesToBackend(updates);
      
      this.logDataProcessing('data_rectified', {
        fields: Object.keys(updates),
        timestamp: Date.now()
      });
      
      return true;
    } catch (error) {
      console.error('Data rectification failed:', error);
      return false;
    }
  }
  
  // Right to erasure - delete user data
  private async eraseData(options: any = {}): Promise<boolean> {
    try {
      // Clear local storage
      if (window.secureStorage) {
        window.secureStorage.deleteUserData();
      }
      
      // Clear cookies
      this.clearAllCookies();
      
      // Clear consent data
      this.consentData.clear();
      this.saveConsentData();
      
      // Clear processing log
      this.dataProcessingLog = [];
      this.saveProcessingLog();
      
      // Send erasure request to backend
      if (!options.localOnly) {
        await this.sendErasureRequestToBackend();
      }
      
      this.logDataProcessing('data_erased', {
        localOnly: options.localOnly || false,
        timestamp: Date.now()
      });
      
      return true;
    } catch (error) {
      console.error('Data erasure failed:', error);
      return false;
    }
  }
  
  // Right to data portability - export user data
  private exportData(): any {
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        format: 'JSON',
        version: '1.0'
      },
      personalData: this.collectPersonalData(),
      preferences: this.privacySettings,
      consentHistory: Array.from(this.consentData.entries()).map(([purpose, consent]) => ({
        purpose,
        granted: consent.granted,
        timestamp: new Date(consent.timestamp).toISOString(),
        version: consent.version
      })),
      activityLog: this.dataProcessingLog.map(entry => ({
        activity: entry.activity,
        timestamp: new Date(entry.timestamp).toISOString(),
        details: entry.details
      }))
    };
    
    // Create downloadable file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-data-export-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    return exportData;
  }
  
  // Right to restriction - limit data processing
  private restrictProcessing(restrictions: any): boolean {
    try {
      Object.keys(restrictions).forEach(purpose => {
        this.privacySettings[`restrict_${purpose}`] = restrictions[purpose];
      });
      
      this.savePrivacySettings();
      
      this.logDataProcessing('processing_restricted', {
        restrictions,
        timestamp: Date.now()
      });
      
      return true;
    } catch (error) {
      console.error('Processing restriction failed:', error);
      return false;
    }
  }
  
  // Cookie consent banner
  showCookieConsentBanner(): void {
    if (this.hasConsent('cookies')) {
      return; // Already consented
    }
    
    const banner = document.createElement('div');
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <p>We use cookies to improve your experience. By continuing to use this site, you consent to our use of cookies.</p>
        <div class="cookie-consent-buttons">
          <button class="cookie-accept">Accept All</button>
          <button class="cookie-customize">Customize</button>
          <button class="cookie-decline">Decline</button>
        </div>
      </div>
    `;
    
    banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #333;
      color: white;
      padding: 20px;
      z-index: 10000;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
    `;
    
    banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
      this.recordConsent('cookies', true);
      this.recordConsent('analytics', true);
      this.recordConsent('marketing', true);
      document.body.removeChild(banner);
    });
    
    banner.querySelector('.cookie-decline')?.addEventListener('click', () => {
      this.recordConsent('cookies', false);
      this.recordConsent('analytics', false);
      this.recordConsent('marketing', false);
      document.body.removeChild(banner);
    });
    
    banner.querySelector('.cookie-customize')?.addEventListener('click', () => {
      document.body.removeChild(banner);
      this.showCookieCustomization();
    });
    
    document.body.appendChild(banner);
  }
  
  // Cookie customization modal
  private showCookieCustomization(): void {
    const modal = this.createConsentModal('cookie_customization', 
      'Customize your cookie preferences', false);
    
    // Add customization content
    const customContent = document.createElement('div');
    customContent.innerHTML = `
      <div class="cookie-categories">
        <div class="cookie-category">
          <label>
            <input type="checkbox" checked disabled> Essential Cookies
            <span>Required for basic site functionality</span>
          </label>
        </div>
        <div class="cookie-category">
          <label>
            <input type="checkbox" id="analytics-cookies"> Analytics Cookies
            <span>Help us understand how visitors interact with our website</span>
          </label>
        </div>
        <div class="cookie-category">
          <label>
            <input type="checkbox" id="marketing-cookies"> Marketing Cookies
            <span>Used to deliver personalized advertisements</span>
          </label>
        </div>
      </div>
    `;
    
    modal.querySelector('.consent-content')?.appendChild(customContent);
    
    modal.querySelector('.consent-accept')?.addEventListener('click', () => {
      const analyticsConsent = (modal.querySelector('#analytics-cookies') as HTMLInputElement)?.checked || false;
      const marketingConsent = (modal.querySelector('#marketing-cookies') as HTMLInputElement)?.checked || false;
      
      this.recordConsent('cookies', true);
      this.recordConsent('analytics', analyticsConsent);
      this.recordConsent('marketing', marketingConsent);
      
      document.body.removeChild(modal);
    });
    
    document.body.appendChild(modal);
  }
  
  // Utility methods
  private createConsentModal(purpose: string, description: string, required: boolean): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'consent-modal';
    modal.innerHTML = `
      <div class="consent-overlay">
        <div class="consent-dialog">
          <div class="consent-header">
            <h3>Privacy Consent</h3>
          </div>
          <div class="consent-content">
            <p><strong>Purpose:</strong> ${purpose}</p>
            <p>${description}</p>
            ${required ? '<p><em>This consent is required for the service to function.</em></p>' : ''}
          </div>
          <div class="consent-actions">
            <button class="consent-accept">Accept</button>
            ${!required ? '<button class="consent-decline">Decline</button>' : ''}
          </div>
        </div>
      </div>
    `;
    
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    return modal;
  }
  
  private initializePrivacySettings(): void {
    this.privacySettings = {
      dataMinimization: true,
      anonymization: true,
      retentionPeriod: 365, // days
      thirdPartySharing: false,
      profileBuilding: false
    };
  }
  
  private loadConsentData(): void {
    try {
      const stored = localStorage.getItem('privacy_consent_data');
      if (stored) {
        const data = JSON.parse(stored);
        this.consentData = new Map(data);
      }
    } catch (error) {
      console.error('Failed to load consent data:', error);
    }
  }
  
  private saveConsentData(): void {
    try {
      const data = Array.from(this.consentData.entries());
      localStorage.setItem('privacy_consent_data', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save consent data:', error);
    }
  }
  
  private saveProcessingLog(): void {
    try {
      localStorage.setItem('privacy_processing_log', JSON.stringify(this.dataProcessingLog));
    } catch (error) {
      console.error('Failed to save processing log:', error);
    }
  }
  
  private savePrivacySettings(): void {
    try {
      localStorage.setItem('privacy_settings', JSON.stringify(this.privacySettings));
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
    }
  }
  
  private generateLogId(): string {
    return 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  private getPrivacyPolicyVersion(): string {
    return '1.0'; // Should be dynamically determined
  }
  
  private getClientIP(): string {
    // In a real implementation, this would be obtained from the server
    return 'client-side-unknown';
  }
  
  private updatePrivacySettings(purpose: string, granted: boolean): void {
    this.privacySettings[purpose] = granted;
    this.savePrivacySettings();
  }
  
  private cleanupDataForPurpose(purpose: string): void {
    // Implement purpose-specific data cleanup
    if (purpose === 'analytics') {
      // Clear analytics data
      this.clearAnalyticsData();
    } else if (purpose === 'marketing') {
      // Clear marketing data
      this.clearMarketingData();
    }
  }
  
  private clearAnalyticsData(): void {
    // Clear analytics cookies and local data
    const analyticsCookies = ['_ga', '_gid', '_gat', '_gtag'];
    analyticsCookies.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }
  
  private clearMarketingData(): void {
    // Clear marketing cookies and local data
    const marketingCookies = ['_fbp', '_fbc', '__utm'];
    marketingCookies.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }
  
  private collectPersonalData(): any {
    // Collect personal data from various sources
    return {
      profile: this.getUserProfile(),
      preferences: this.getUserPreferences(),
      activity: this.getUserActivity()
    };
  }
  
  private getUserProfile(): any {
    // Return user profile data
    return {};
  }
  
  private getUserPreferences(): any {
    // Return user preferences
    return this.privacySettings;
  }
  
  private getUserActivity(): any {
    // Return user activity data
    return this.dataProcessingLog.slice(-100); // Last 100 activities
  }
  
  private isPersonalDataField(field: string): boolean {
    const personalDataFields = ['name', 'email', 'phone', 'address', 'birthdate'];
    return personalDataFields.includes(field);
  }
  
  private updatePersonalDataField(field: string, value: any): void {
    // Update personal data field
    if (window.secureStorage) {
      window.secureStorage.setSecureItem(`profile_${field}`, value, {
        encrypt: true,
        sensitive: true
      });
    }
  }
  
  private async sendDataUpdatesToBackend(updates: any): Promise<void> {
    // Send data updates to backend
    await fetch('/api/user/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  }
  
  private async sendErasureRequestToBackend(): Promise<void> {
    // Send erasure request to backend
    await fetch('/api/user/erase', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  private clearAllCookies(): void {
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }
  
  private getDataRetentionInfo(): any {
    return {
      retentionPeriod: this.privacySettings.retentionPeriod,
      lastCleanup: localStorage.getItem('last_data_cleanup'),
      nextCleanup: new Date(Date.now() + (this.privacySettings.retentionPeriod * 24 * 60 * 60 * 1000)).toISOString()
    };
  }
  
  private setupPrivacyMonitoring(): void {
    // Monitor privacy-related events
    window.addEventListener('beforeunload', () => {
      this.logDataProcessing('session_ended', {
        timestamp: Date.now(),
        duration: Date.now() - (window.sessionStartTime || Date.now())
      });
    });
  }
}
```

### Q20: What are the essential security best practices and frameworks for frontend development?

**Answer:**
Security best practices involve implementing comprehensive security measures, following established frameworks, and maintaining security throughout the development lifecycle.

**Security Best Practices Framework:**
```typescript
// Comprehensive security best practices implementation
class SecurityBestPractices {
  private securityConfig: any = {};
  private securityChecklist: Map<string, boolean> = new Map();
  private vulnerabilityDatabase: any[] = [];
  private securityMetrics: any = {};
  
  constructor() {
    this.initializeSecurityConfig();
    this.loadSecurityChecklist();
    this.setupSecurityMonitoring();
  }
  
  // Security configuration management
  initializeSecurityConfig(): void {
    this.securityConfig = {
      // Content Security Policy
      csp: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      },
      
      // Security headers
      headers: {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
      },
      
      // Input validation rules
      validation: {
        maxInputLength: 1000,
        allowedCharacters: /^[a-zA-Z0-9\s\-_@.]+$/,
        forbiddenPatterns: [
          /<script[^>]*>.*?<\/script>/gi,
          /javascript:/gi,
          /on\w+\s*=/gi,
          /eval\s*\(/gi,
          /expression\s*\(/gi
        ]
      },
      
      // Authentication settings
      auth: {
        tokenExpiry: 3600, // 1 hour
        refreshTokenExpiry: 604800, // 7 days
        maxLoginAttempts: 5,
        lockoutDuration: 900, // 15 minutes
        passwordMinLength: 8,
        requireMFA: true
      },
      
      // Session management
      session: {
        timeout: 1800, // 30 minutes
        renewThreshold: 300, // 5 minutes
        secureCookies: true,
        sameSite: 'strict'
      }
    };
  }
  
  // Security checklist implementation
  loadSecurityChecklist(): void {
    const checklist = [
      'implement_https',
      'configure_csp',
      'set_security_headers',
      'validate_inputs',
      'sanitize_outputs',
      'implement_authentication',
      'setup_session_management',
      'enable_csrf_protection',
      'implement_rate_limiting',
      'setup_logging_monitoring',
      'conduct_security_testing',
      'implement_error_handling',
      'secure_data_storage',
      'implement_access_control',
      'setup_vulnerability_scanning',
      'implement_secure_communication',
      'setup_backup_recovery',
      'implement_privacy_controls',
      'conduct_security_training',
      'maintain_security_documentation'
    ];
    
    checklist.forEach(item => {
      this.securityChecklist.set(item, false);
    });
  }
  
  // OWASP Top 10 protection implementation
  implementOWASPProtection(): any {
    const owaspProtections = {
      // A01:2021 – Broken Access Control
      accessControl: {
        implementation: this.implementAccessControl(),
        status: 'implemented'
      },
      
      // A02:2021 – Cryptographic Failures
      cryptography: {
        implementation: this.implementCryptographicControls(),
        status: 'implemented'
      },
      
      // A03:2021 – Injection
      injection: {
        implementation: this.implementInjectionProtection(),
        status: 'implemented'
      },
      
      // A04:2021 – Insecure Design
      secureDesign: {
        implementation: this.implementSecureDesign(),
        status: 'implemented'
      },
      
      // A05:2021 – Security Misconfiguration
      configuration: {
        implementation: this.implementSecureConfiguration(),
        status: 'implemented'
      },
      
      // A06:2021 – Vulnerable and Outdated Components
      components: {
        implementation: this.implementComponentSecurity(),
        status: 'implemented'
      },
      
      // A07:2021 – Identification and Authentication Failures
      authentication: {
        implementation: this.implementAuthenticationSecurity(),
        status: 'implemented'
      },
      
      // A08:2021 – Software and Data Integrity Failures
      integrity: {
        implementation: this.implementIntegrityControls(),
        status: 'implemented'
      },
      
      // A09:2021 – Security Logging and Monitoring Failures
      logging: {
        implementation: this.implementSecurityLogging(),
        status: 'implemented'
      },
      
      // A10:2021 – Server-Side Request Forgery (SSRF)
      ssrf: {
        implementation: this.implementSSRFProtection(),
        status: 'implemented'
      }
    };
    
    return owaspProtections;
  }
  
  // Access control implementation
  private implementAccessControl(): any {
    return {
      roleBasedAccess: {
        roles: ['admin', 'user', 'guest'],
        permissions: {
          admin: ['read', 'write', 'delete', 'manage'],
          user: ['read', 'write'],
          guest: ['read']
        }
      },
      
      resourceProtection: {
        checkPermission: (resource: string, action: string, userRole: string): boolean => {
          const permissions = this.securityConfig.auth.permissions?.[userRole] || [];
          return permissions.includes(action);
        },
        
        enforceAccess: (element: HTMLElement, requiredRole: string): void => {
          const userRole = this.getCurrentUserRole();
          if (!this.hasRole(userRole, requiredRole)) {
            element.style.display = 'none';
            element.setAttribute('aria-hidden', 'true');
          }
        }
      },
      
      urlProtection: {
        protectedRoutes: ['/admin', '/settings', '/profile'],
        checkRouteAccess: (route: string): boolean => {
          const userRole = this.getCurrentUserRole();
          const routePermissions = this.getRoutePermissions(route);
          return routePermissions.includes(userRole);
        }
      }
    };
  }
  
  // Cryptographic controls
  private implementCryptographicControls(): any {
    return {
      encryption: {
        algorithm: 'AES-GCM',
        keyLength: 256,
        
        encryptData: async (data: string, key: CryptoKey): Promise<string> => {
          const encoder = new TextEncoder();
          const dataBuffer = encoder.encode(data);
          const iv = crypto.getRandomValues(new Uint8Array(12));
          
          const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            dataBuffer
          );
          
          const combined = new Uint8Array(iv.length + encrypted.byteLength);
          combined.set(iv);
          combined.set(new Uint8Array(encrypted), iv.length);
          
          return btoa(String.fromCharCode(...combined));
        },
        
        decryptData: async (encryptedData: string, key: CryptoKey): Promise<string> => {
          const combined = new Uint8Array(
            atob(encryptedData).split('').map(char => char.charCodeAt(0))
          );
          
          const iv = combined.slice(0, 12);
          const encrypted = combined.slice(12);
          
          const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            encrypted
          );
          
          return new TextDecoder().decode(decrypted);
        }
      },
      
      hashing: {
        algorithm: 'SHA-256',
        
        hashData: async (data: string): Promise<string> => {
          const encoder = new TextEncoder();
          const dataBuffer = encoder.encode(data);
          const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        },
        
        verifyHash: async (data: string, hash: string): Promise<boolean> => {
          const computedHash = await this.hashData(data);
          return computedHash === hash;
        }
      },
      
      keyManagement: {
        generateKey: async (): Promise<CryptoKey> => {
          return await crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
          );
        },
        
        exportKey: async (key: CryptoKey): Promise<string> => {
          const exported = await crypto.subtle.exportKey('raw', key);
          return btoa(String.fromCharCode(...new Uint8Array(exported)));
        },
        
        importKey: async (keyData: string): Promise<CryptoKey> => {
          const keyBuffer = new Uint8Array(
            atob(keyData).split('').map(char => char.charCodeAt(0))
          );
          
          return await crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'AES-GCM' },
            true,
            ['encrypt', 'decrypt']
          );
        }
      }
    };
  }
  
  // Injection protection
  private implementInjectionProtection(): any {
    return {
      xssProtection: {
        sanitizeHTML: (html: string): string => {
          const div = document.createElement('div');
          div.textContent = html;
          return div.innerHTML;
        },
        
        validateInput: (input: string): boolean => {
          const forbiddenPatterns = this.securityConfig.validation.forbiddenPatterns;
          return !forbiddenPatterns.some(pattern => pattern.test(input));
        },
        
        escapeHTML: (text: string): string => {
          const div = document.createElement('div');
          div.appendChild(document.createTextNode(text));
          return div.innerHTML;
        }
      },
      
      sqlInjectionProtection: {
        parameterizeQuery: (query: string, params: any[]): string => {
          // This would typically be handled by the backend
          // Frontend should validate and sanitize inputs
          return query.replace(/\?/g, () => {
            const param = params.shift();
            return typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` : param;
          });
        },
        
        validateSQLInput: (input: string): boolean => {
          const sqlPatterns = [
            /('|(\-\-)|(;)|(\||\|)|(\*|\*))/i,
            /(union|select|insert|delete|update|drop|create|alter|exec|execute)/i
          ];
          return !sqlPatterns.some(pattern => pattern.test(input));
        }
      },
      
      commandInjectionProtection: {
        validateCommand: (command: string): boolean => {
          const dangerousChars = /[;&|`$(){}\[\]<>]/;
          return !dangerousChars.test(command);
        },
        
        sanitizeCommand: (command: string): string => {
          return command.replace(/[;&|`$(){}\[\]<>]/g, '');
        }
      }
    };
  }
  
  // Secure design implementation
  private implementSecureDesign(): any {
    return {
      principleOfLeastPrivilege: {
        enforceMinimalPermissions: (user: any): any => {
          const basePermissions = ['read'];
          const rolePermissions = this.getRolePermissions(user.role);
          return [...basePermissions, ...rolePermissions];
        }
      },
      
      defenseInDepth: {
        layers: [
          'input_validation',
          'authentication',
          'authorization',
          'encryption',
          'logging',
          'monitoring'
        ],
        
        validateAllLayers: (): boolean => {
          return this.layers.every(layer => this.isLayerImplemented(layer));
        }
      },
      
      failSecure: {
        handleError: (error: Error): void => {
          // Log error securely
          this.logSecurityEvent({
            type: 'error',
            message: error.message,
            timestamp: Date.now()
          });
          
          // Fail to secure state
          this.redirectToSecurePage();
        }
      }
    };
  }
  
  // Security configuration
  private implementSecureConfiguration(): any {
    return {
      environmentConfiguration: {
        development: {
          debug: true,
          logging: 'verbose',
          security: 'relaxed'
        },
        production: {
          debug: false,
          logging: 'error',
          security: 'strict'
        }
      },
      
      securityHeaders: this.securityConfig.headers,
      
      contentSecurityPolicy: this.securityConfig.csp,
      
      configurationValidation: {
        validateConfig: (): boolean => {
          const requiredHeaders = Object.keys(this.securityConfig.headers);
          return requiredHeaders.every(header => 
            document.querySelector(`meta[http-equiv="${header}"]`) !== null
          );
        }
      }
    };
  }
  
  // Component security
  private implementComponentSecurity(): any {
    return {
      dependencyScanning: {
        scanDependencies: async (): Promise<any[]> => {
          // This would typically integrate with tools like npm audit
          const vulnerabilities = [];
          
          try {
            const response = await fetch('/api/security/dependencies');
            const data = await response.json();
            return data.vulnerabilities || [];
          } catch (error) {
            console.error('Dependency scan failed:', error);
            return vulnerabilities;
          }
        },
        
        updateDependencies: async (): Promise<boolean> => {
          try {
            // Trigger dependency update process
            const response = await fetch('/api/security/update-dependencies', {
              method: 'POST'
            });
            return response.ok;
          } catch (error) {
            console.error('Dependency update failed:', error);
            return false;
          }
        }
      },
      
      integrityChecking: {
        verifyIntegrity: (resource: string, expectedHash: string): Promise<boolean> => {
          return fetch(resource)
            .then(response => response.text())
            .then(content => this.hashData(content))
            .then(hash => hash === expectedHash)
            .catch(() => false);
        }
      }
    };
  }
  
  // Authentication security
  private implementAuthenticationSecurity(): any {
    return {
      passwordSecurity: {
        validatePassword: (password: string): any => {
          const requirements = {
            minLength: password.length >= this.securityConfig.auth.passwordMinLength,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumbers: /\d/.test(password),
            hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password)
          };
          
          const score = Object.values(requirements).filter(Boolean).length;
          
          return {
            isValid: score >= 4,
            score,
            requirements,
            strength: score < 3 ? 'weak' : score < 5 ? 'medium' : 'strong'
          };
        },
        
        generateSecurePassword: (length: number = 12): string => {
          const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
          let password = '';
          
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
          }
          
          return password;
        }
      },
      
      sessionSecurity: {
        generateSessionToken: (): string => {
          const array = new Uint8Array(32);
          crypto.getRandomValues(array);
          return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        },
        
        validateSession: (token: string): boolean => {
          // Validate session token format and expiry
          const sessionData = this.getSessionData(token);
          if (!sessionData) return false;
          
          const now = Date.now();
          const expiry = sessionData.timestamp + (this.securityConfig.session.timeout * 1000);
          
          return now < expiry;
        }
      }
    };
  }
  
  // Integrity controls
  private implementIntegrityControls(): any {
    return {
      codeIntegrity: {
        verifyScriptIntegrity: (scriptElement: HTMLScriptElement): boolean => {
          const integrity = scriptElement.getAttribute('integrity');
          if (!integrity) return false;
          
          // Verify SRI hash
          return this.verifySRIHash(scriptElement.src, integrity);
        }
      },
      
      dataIntegrity: {
        signData: async (data: any): Promise<string> => {
          const jsonData = JSON.stringify(data);
          return await this.hashData(jsonData);
        },
        
        verifyDataSignature: async (data: any, signature: string): Promise<boolean> => {
          const computedSignature = await this.signData(data);
          return computedSignature === signature;
        }
      }
    };
  }
  
  // Security logging
  private implementSecurityLogging(): any {
    return {
      eventLogging: {
        logSecurityEvent: (event: any): void => {
          const logEntry = {
            id: this.generateEventId(),
            timestamp: Date.now(),
            type: event.type,
            severity: event.severity || 'info',
            source: event.source || 'frontend',
            details: event.details,
            userAgent: navigator.userAgent,
            url: window.location.href
          };
          
          // Store locally
          this.storeLogEntry(logEntry);
          
          // Send to monitoring system
          this.sendToMonitoring(logEntry);
        }
      },
      
      auditTrail: {
        logUserAction: (action: string, details: any): void => {
          this.logSecurityEvent({
            type: 'user_action',
            severity: 'info',
            details: { action, ...details }
          });
        }
      }
    };
  }
  
  // SSRF protection
  private implementSSRFProtection(): any {
    return {
      urlValidation: {
        validateURL: (url: string): boolean => {
          try {
            const urlObj = new URL(url);
            
            // Check against allowed domains
            const allowedDomains = ['api.example.com', 'cdn.example.com'];
            if (!allowedDomains.includes(urlObj.hostname)) {
              return false;
            }
            
            // Check protocol
            if (!['https:', 'http:'].includes(urlObj.protocol)) {
              return false;
            }
            
            return true;
          } catch {
            return false;
          }
        }
      }
    };
  }
  
  // Security metrics and reporting
  generateSecurityReport(): any {
    const report = {
      timestamp: Date.now(),
      securityScore: this.calculateSecurityScore(),
      checklistCompletion: this.getChecklistCompletion(),
      vulnerabilities: this.getVulnerabilities(),
      recommendations: this.getSecurityRecommendations(),
      compliance: this.checkCompliance()
    };
    
    return report;
  }
  
  private calculateSecurityScore(): number {
    const completedChecks = Array.from(this.securityChecklist.values())
      .filter(Boolean).length;
    const totalChecks = this.securityChecklist.size;
    
    return Math.round((completedChecks / totalChecks) * 100);
  }
  
  private getChecklistCompletion(): any {
    const completion = {};
    this.securityChecklist.forEach((completed, item) => {
      completion[item] = completed;
    });
    return completion;
  }
  
  private getVulnerabilities(): any[] {
    return this.vulnerabilityDatabase.filter(vuln => 
      vuln.status === 'open' && vuln.severity === 'high'
    );
  }
  
  private getSecurityRecommendations(): string[] {
    const recommendations = [];
    
    if (!this.securityChecklist.get('implement_https')) {
      recommendations.push('Implement HTTPS across all pages');
    }
    
    if (!this.securityChecklist.get('configure_csp')) {
      recommendations.push('Configure Content Security Policy');
    }
    
    if (!this.securityChecklist.get('setup_logging_monitoring')) {
      recommendations.push('Set up comprehensive security logging and monitoring');
    }
    
    return recommendations;
  }
  
  private checkCompliance(): any {
    return {
      owasp: this.checkOWASPCompliance(),
      gdpr: this.checkGDPRCompliance(),
      pci: this.checkPCICompliance()
    };
  }
  
  // Utility methods
  private getCurrentUserRole(): string {
    // Get current user role from session/token
    return 'user'; // Placeholder
  }
  
  private hasRole(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = { admin: 3, user: 2, guest: 1 };
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }
  
  private getRoutePermissions(route: string): string[] {
    const routePermissions = {
      '/admin': ['admin'],
      '/settings': ['admin', 'user'],
      '/profile': ['admin', 'user']
    };
    return routePermissions[route] || ['guest', 'user', 'admin'];
  }
  
  private getRolePermissions(role: string): string[] {
    const permissions = {
      admin: ['read', 'write', 'delete', 'manage'],
      user: ['read', 'write'],
      guest: ['read']
    };
    return permissions[role] || [];
  }
  
  private isLayerImplemented(layer: string): boolean {
    return this.securityChecklist.get(layer) || false;
  }
  
  private redirectToSecurePage(): void {
    window.location.href = '/error?type=security';
  }
  
  private async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  private verifySRIHash(url: string, integrity: string): boolean {
    // Simplified SRI verification
    return integrity.startsWith('sha256-') || integrity.startsWith('sha384-') || integrity.startsWith('sha512-');
  }
  
  private generateEventId(): string {
    return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  private storeLogEntry(entry: any): void {
    const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    logs.push(entry);
    
    // Keep only last 1000 entries
    if (logs.length > 1000) {
      logs.splice(0, logs.length - 1000);
    }
    
    localStorage.setItem('security_logs', JSON.stringify(logs));
  }
  
  private sendToMonitoring(entry: any): void {
    // Send to external monitoring system
    if (window.securityMonitor) {
      window.securityMonitor.logSecurityEvent(entry);
    }
  }
  
  private getSessionData(token: string): any {
    // Get session data from storage or API
    const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
    return sessions[token];
  }
  
  private checkOWASPCompliance(): boolean {
    const owaspChecks = [
      'implement_access_control',
      'implement_cryptography',
      'prevent_injection',
      'secure_design',
      'secure_configuration',
      'component_security',
      'authentication_security',
      'integrity_controls',
      'security_logging',
      'ssrf_protection'
    ];
    
    return owaspChecks.every(check => this.securityChecklist.get(check));
  }
  
  private checkGDPRCompliance(): boolean {
    return this.securityChecklist.get('implement_privacy_controls') || false;
  }
  
  private checkPCICompliance(): boolean {
    const pciChecks = [
      'implement_encryption',
      'secure_data_storage',
      'implement_access_control',
      'security_logging'
    ];
    
    return pciChecks.every(check => this.securityChecklist.get(check));
  }
  
  private setupSecurityMonitoring(): void {
    // Set up real-time security monitoring
    window.addEventListener('error', (event) => {
      this.logSecurityEvent({
        type: 'javascript_error',
        severity: 'warning',
        details: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });
    
    // Monitor for suspicious activities
    let clickCount = 0;
    window.addEventListener('click', () => {
      clickCount++;
      if (clickCount > 100) { // Suspicious rapid clicking
        this.logSecurityEvent({
          type: 'suspicious_activity',
          severity: 'warning',
          details: { activity: 'rapid_clicking', count: clickCount }
        });
        clickCount = 0;
      }
    });
  }
}
```

---
```