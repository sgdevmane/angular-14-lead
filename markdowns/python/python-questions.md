# Python & Django Interview Questions

## Table of Contents

1. [Q1: Explain Python's key features and why it's popular for web development.](#q1-explain-pythons-key-features-and-why-its-popular-for-web-development)
2. [Q2: What are Python decorators and how are they used in web development?](#q2-what-are-python-decorators-and-how-are-they-used-in-web-development)
3. [Q3: Explain Python's memory management and garbage collection.](#q3-explain-pythons-memory-management-and-garbage-collection)
4. [Q4: What are Python context managers and how do you implement them?](#q4-what-are-python-context-managers-and-how-do-you-implement-them)
5. [Q5: Explain Python's asyncio and asynchronous programming for web development.](#q5-explain-pythons-asyncio-and-asynchronous-programming-for-web-development)
6. [Q6: How do you implement custom Django middleware and what are common use cases?](#q6-how-do-you-implement-custom-django-middleware-and-what-are-common-use-cases)
7. [Q7: Explain Python's ORM patterns and Django model relationships.](#q7-explain-pythons-orm-patterns-and-django-model-relationships)
8. [Q8: How do you implement comprehensive testing in Python web applications?](#q8-how-do-you-implement-comprehensive-testing-in-python-web-applications)
9. [Q9: Explain Python web security best practices and common vulnerabilities.](#q9-explain-python-web-security-best-practices-and-common-vulnerabilities)
10. [Q10: How do you implement caching strategies in Python web applications?](#q10-how-do-you-implement-caching-strategies-in-python-web-applications)
11. [Q11: Explain Python's Global Interpreter Lock (GIL) and its impact on web applications.](#q11-explain-pythons-global-interpreter-lock-gil-and-its-impact-on-web-applications)
12. [Q12: How do you implement proper logging and monitoring in Python web applications?](#q12-how-do-you-implement-proper-logging-and-monitoring-in-python-web-applications)
13. [Q13: Explain Python's data structures and their performance characteristics for web applications.](#q13-explain-pythons-data-structures-and-their-performance-characteristics-for-web-applications)
14. [Q14: How do you implement effective error handling and exception management in Python web applications?](#q14-how-do-you-implement-effective-error-handling-and-exception-management-in-python-web-applications)
15. [Q15: Explain Python deployment strategies and containerization for web applications.](#q15-explain-python-deployment-strategies-and-containerization-for-web-applications)
16. [Q16: How do you implement performance optimization and profiling in Python web applications?](#q16-how-do-you-implement-performance-optimization-and-profiling-in-python-web-applications)

---

## Python Fundamentals

### Q1: Explain Python's key features and why it's popular for web development.

**Difficulty: Easy**

**Answer:**
Python is a high-level, interpreted programming language known for its simplicity, readability, and versatility. It has become extremely popular for web development due to several key features.

**Key Features:**

1. **Simple and Readable Syntax**: Easy to learn and maintain
2. **Interpreted Language**: No compilation step required
3. **Dynamic Typing**: Variables don't need explicit type declarations
4. **Cross-platform**: Runs on Windows, macOS, Linux, and more
5. **Extensive Standard Library**: "Batteries included" philosophy
6. **Large Ecosystem**: Rich third-party packages via PyPI
7. **Multiple Programming Paradigms**: Supports OOP, functional, and procedural programming
8. **Memory Management**: Automatic garbage collection

```python
#!/usr/bin/env python3
"""
Python Web Development Fundamentals
Demonstrating key Python features for web development
"""

import os
import sys
import json
import datetime
from typing import List, Dict, Optional, Union
from dataclasses import dataclass, field
from functools import wraps, lru_cache
from collections import defaultdict, Counter
import asyncio
import aiohttp
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


@dataclass
class User:
    """User model demonstrating Python dataclasses"""
    id: int
    username: str
    email: str
    created_at: datetime.datetime = field(default_factory=datetime.datetime.now)
    is_active: bool = True
    roles: List[str] = field(default_factory=list)
    metadata: Dict[str, Union[str, int, bool]] = field(default_factory=dict)

    def __post_init__(self):
        """Validate user data after initialization"""
        if not self.username or len(self.username) < 3:
            raise ValueError("Username must be at least 3 characters long")

        if '@' not in self.email:
            raise ValueError("Invalid email format")

    @property
    def display_name(self) -> str:
        """Get user's display name"""
        return self.metadata.get('display_name', self.username)

    @property
    def is_admin(self) -> bool:
        """Check if user has admin privileges"""
        return 'admin' in self.roles

    def add_role(self, role: str) -> None:
        """Add a role to the user"""
        if role not in self.roles:
            self.roles.append(role)
            logger.info(f"Added role '{role}' to user {self.username}")

    def to_dict(self) -> Dict:
        """Convert user to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active,
            'roles': self.roles,
            'metadata': self.metadata,
            'display_name': self.display_name,
            'is_admin': self.is_admin
        }


class UserManager:
    """User management class demonstrating Python OOP concepts"""

    def __init__(self):
        self._users: Dict[int, User] = {}
        self._username_index: Dict[str, int] = {}
        self._email_index: Dict[str, int] = {}
        self._next_id = 1

    def create_user(self, username: str, email: str, **kwargs) -> User:
        """Create a new user with validation"""
        # Check for existing username
        if username in self._username_index:
            raise ValueError(f"Username '{username}' already exists")

        # Check for existing email
        if email in self._email_index:
            raise ValueError(f"Email '{email}' already exists")

        # Create user
        user = User(
            id=self._next_id,
            username=username,
            email=email,
            **kwargs
        )

        # Store user and update indices
        self._users[user.id] = user
        self._username_index[username] = user.id
        self._email_index[email] = user.id
        self._next_id += 1

        logger.info(f"Created user: {username} (ID: {user.id})")
        return user

    def get_user(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return self._users.get(user_id)

    def get_user_by_username(self, username: str) -> Optional[User]:
        """Get user by username"""
        user_id = self._username_index.get(username)
        return self._users.get(user_id) if user_id else None

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        user_id = self._email_index.get(email)
        return self._users.get(user_id) if user_id else None

    def list_users(self, active_only: bool = True) -> List[User]:
        """List all users with optional filtering"""
        users = list(self._users.values())
        if active_only:
            users = [user for user in users if user.is_active]
        return sorted(users, key=lambda u: u.created_at)

    def update_user(self, user_id: int, **kwargs) -> Optional[User]:
        """Update user attributes"""
        user = self.get_user(user_id)
        if not user:
            return None

        # Update allowed attributes
        allowed_attrs = {'email', 'is_active', 'roles', 'metadata'}
        for attr, value in kwargs.items():
            if attr in allowed_attrs:
                setattr(user, attr, value)
                logger.info(f"Updated {attr} for user {user.username}")

        return user

    def delete_user(self, user_id: int) -> bool:
        """Soft delete user (mark as inactive)"""
        user = self.get_user(user_id)
        if not user:
            return False

        user.is_active = False
        logger.info(f"Deactivated user: {user.username}")
        return True

    def get_stats(self) -> Dict[str, Union[int, Dict]]:
        """Get user statistics"""
        users = list(self._users.values())
        active_users = [u for u in users if u.is_active]

        # Role distribution
        role_counter = Counter()
        for user in active_users:
            role_counter.update(user.roles)

        # Registration timeline
        registration_by_date = defaultdict(int)
        for user in users:
            date_key = user.created_at.date().isoformat()
            registration_by_date[date_key] += 1

        return {
            'total_users': len(users),
            'active_users': len(active_users),
            'inactive_users': len(users) - len(active_users),
            'role_distribution': dict(role_counter),
            'registrations_by_date': dict(registration_by_date),
            'admin_count': len([u for u in active_users if u.is_admin])
        }


def timing_decorator(func):
    """Decorator to measure function execution time"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = datetime.datetime.now()
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            end_time = datetime.datetime.now()
            duration = (end_time - start_time).total_seconds()
            logger.info(f"{func.__name__} executed in {duration:.4f} seconds")
    return wrapper


def cache_result(ttl_seconds: int = 300):
    """Decorator for caching function results with TTL"""
    def decorator(func):
        cache = {}

        @wraps(func)
        def wrapper(*args, **kwargs):
            # Create cache key
            key = str(args) + str(sorted(kwargs.items()))
            current_time = datetime.datetime.now()

            # Check if cached result exists and is still valid
            if key in cache:
                result, timestamp = cache[key]
                if (current_time - timestamp).total_seconds() < ttl_seconds:
                    logger.debug(f"Cache hit for {func.__name__}")
                    return result

            # Execute function and cache result
            result = func(*args, **kwargs)
            cache[key] = (result, current_time)
            logger.debug(f"Cache miss for {func.__name__}, result cached")

            return result

        return wrapper
    return decorator


class APIClient:
    """Asynchronous API client demonstrating modern Python features"""

    def __init__(self, base_url: str, timeout: int = 30):
        self.base_url = base_url.rstrip('/')
        self.timeout = aiohttp.ClientTimeout(total=timeout)
        self.session: Optional[aiohttp.ClientSession] = None

    async def __aenter__(self):
        """Async context manager entry"""
        self.session = aiohttp.ClientSession(
            timeout=self.timeout,
            headers={'User-Agent': 'Python-APIClient/1.0'}
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self.session:
            await self.session.close()

    async def get(self, endpoint: str, params: Optional[Dict] = None) -> Dict:
        """Make GET request"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"

        async with self.session.get(url, params=params) as response:
            response.raise_for_status()
            return await response.json()

    async def post(self, endpoint: str, data: Optional[Dict] = None) -> Dict:
        """Make POST request"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"

        async with self.session.post(url, json=data) as response:
            response.raise_for_status()
            return await response.json()

    @timing_decorator
    @cache_result(ttl_seconds=60)
    async def get_user_data(self, user_id: int) -> Dict:
        """Get user data with caching and timing"""
        return await self.get(f'/users/{user_id}')


class ConfigManager:
    """Configuration management with environment variable support"""

    def __init__(self, config_file: Optional[str] = None):
        self.config = {}
        self.load_defaults()

        if config_file and os.path.exists(config_file):
            self.load_from_file(config_file)

        self.load_from_environment()

    def load_defaults(self):
        """Load default configuration"""
        self.config.update({
            'DEBUG': False,
            'HOST': 'localhost',
            'PORT': 8000,
            'DATABASE_URL': 'sqlite:///app.db',
            'SECRET_KEY': 'dev-secret-key',
            'LOG_LEVEL': 'INFO',
            'CACHE_TTL': 300,
            'MAX_CONNECTIONS': 100
        })

    def load_from_file(self, config_file: str):
        """Load configuration from JSON file"""
        try:
            with open(config_file, 'r') as f:
                file_config = json.load(f)
                self.config.update(file_config)
                logger.info(f"Loaded configuration from {config_file}")
        except Exception as e:
            logger.error(f"Failed to load config file {config_file}: {e}")

    def load_from_environment(self):
        """Load configuration from environment variables"""
        env_mapping = {
            'DEBUG': lambda x: x.lower() in ('true', '1', 'yes'),
            'PORT': int,
            'CACHE_TTL': int,
            'MAX_CONNECTIONS': int
        }

        for key in self.config.keys():
            env_value = os.getenv(key)
            if env_value is not None:
                try:
                    # Apply type conversion if specified
                    if key in env_mapping:
                        self.config[key] = env_mapping[key](env_value)
                    else:
                        self.config[key] = env_value
                    logger.debug(f"Loaded {key} from environment")
                except ValueError as e:
                    logger.error(f"Invalid environment value for {key}: {e}")

    def get(self, key: str, default=None):
        """Get configuration value"""
        return self.config.get(key, default)

    def set(self, key: str, value):
        """Set configuration value"""
        self.config[key] = value

    def to_dict(self) -> Dict:
        """Get all configuration as dictionary"""
        return self.config.copy()


async def demonstrate_python_features():
    """Demonstrate various Python features for web development"""
    logger.info("🐍 Starting Python features demonstration")

    # Configuration management
    config = ConfigManager()
    logger.info(f"Configuration loaded: {config.get('HOST')}:{config.get('PORT')}")

    # User management
    user_manager = UserManager()

    # Create sample users
    users_data = [
        {'username': 'alice', 'email': 'alice@example.com', 'roles': ['admin', 'user']},
        {'username': 'bob', 'email': 'bob@example.com', 'roles': ['user']},
        {'username': 'charlie', 'email': 'charlie@example.com', 'roles': ['moderator', 'user']}
    ]

    created_users = []
    for user_data in users_data:
        try:
            user = user_manager.create_user(**user_data)
            created_users.append(user)
            logger.info(f"Created user: {user.username}")
        except ValueError as e:
            logger.error(f"Failed to create user: {e}")

    # Demonstrate user operations
    alice = user_manager.get_user_by_username('alice')
    if alice:
        alice.metadata['last_login'] = datetime.datetime.now().isoformat()
        alice.metadata['login_count'] = 42
        logger.info(f"Alice is admin: {alice.is_admin}")

    # Get statistics
    stats = user_manager.get_stats()
    logger.info(f"User statistics: {json.dumps(stats, indent=2)}")

    # Demonstrate async API client (mock)
    try:
        async with APIClient('https://jsonplaceholder.typicode.com') as client:
            # This would work with a real API
            # user_data = await client.get_user_data(1)
            # logger.info(f"API user data: {user_data}")
            logger.info("API client initialized successfully")
    except Exception as e:
        logger.error(f"API client error: {e}")

    # Demonstrate list comprehensions and functional programming
    active_users = user_manager.list_users(active_only=True)
    admin_usernames = [user.username for user in active_users if user.is_admin]
    user_emails = {user.username: user.email for user in active_users}

    logger.info(f"Admin users: {admin_usernames}")
    logger.info(f"User emails: {user_emails}")

    # Demonstrate generator expressions for memory efficiency
    def user_summary_generator():
        for user in active_users:
            yield {
                'username': user.username,
                'role_count': len(user.roles),
                'days_since_creation': (datetime.datetime.now() - user.created_at).days
            }

    summaries = list(user_summary_generator())
    logger.info(f"User summaries: {summaries}")

    # Demonstrate error handling
    try:
        invalid_user = user_manager.create_user('ab', 'invalid-email')
    except ValueError as e:
        logger.warning(f"Expected validation error: {e}")

    logger.info("✅ Python features demonstration completed")


if __name__ == '__main__':
    # Run the demonstration
    asyncio.run(demonstrate_python_features())
```

**Why Python is Popular for Web Development:**

1. **Rapid Development**: Clean syntax allows faster coding
2. **Rich Ecosystem**: Django, Flask, FastAPI frameworks
3. **Scalability**: Handles growth from prototype to production
4. **Community Support**: Large, active developer community
5. **Integration**: Easy integration with databases, APIs, services
6. **Testing**: Excellent testing frameworks and tools
7. **Deployment**: Multiple deployment options and platforms
8. **Data Science Integration**: Seamless integration with ML/AI libraries

**Popular Python Web Frameworks:**

- **Django**: Full-featured, "batteries included" framework
- **Flask**: Lightweight, flexible microframework
- **FastAPI**: Modern, fast framework with automatic API documentation
- **Tornado**: Asynchronous networking library
- **Pyramid**: Flexible, minimalist framework

**Python Web Development Advantages:**

- **Readable Code**: Easy to maintain and debug
- **Rapid Prototyping**: Quick development cycles
- **Extensive Libraries**: Rich ecosystem for any need
- **Cross-platform**: Deploy anywhere
- **Strong Community**: Great documentation and support
- **Versatility**: Web, APIs, data processing, automation

---

## Object-Oriented Programming

### Q2: What are Python decorators and how are they used in web development?

**Difficulty: Medium**

**Answer:**
Decorators are a powerful Python feature that allows you to modify or extend the behavior of functions, methods, or classes without permanently modifying their code. They're extensively used in web development for cross-cutting concerns.

**Decorator Fundamentals:**

```python
#!/usr/bin/env python3
"""
Python Decorators for Web Development
Comprehensive examples of decorator patterns
"""

import time
import functools
import logging
import json
from typing import Any, Callable, Dict, List, Optional
from datetime import datetime, timedelta
from collections import defaultdict
import hashlib
import threading
from contextlib import contextmanager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# 1. Basic Function Decorator
def timing_decorator(func: Callable) -> Callable:
    """Basic decorator to measure function execution time"""
    @functools.wraps(func)  # Preserves original function metadata
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            end_time = time.time()
            duration = end_time - start_time
            logger.info(f"{func.__name__} executed in {duration:.4f} seconds")
    return wrapper


# 2. Parameterized Decorator
def retry(max_attempts: int = 3, delay: float = 1.0, exceptions: tuple = (Exception,)):
    """Decorator that retries function execution on failure"""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None

            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        logger.warning(
                            f"Attempt {attempt + 1} failed for {func.__name__}: {e}. "
                            f"Retrying in {delay} seconds..."
                        )
                        time.sleep(delay)
                    else:
                        logger.error(
                            f"All {max_attempts} attempts failed for {func.__name__}"
                        )

            raise last_exception
        return wrapper
    return decorator


# 3. Class-based Decorator
class RateLimiter:
    """Rate limiting decorator using token bucket algorithm"""

    def __init__(self, max_calls: int = 10, time_window: int = 60):
        self.max_calls = max_calls
        self.time_window = time_window
        self.calls = defaultdict(list)
        self.lock = threading.Lock()

    def __call__(self, func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Create a key based on function and arguments
            key = self._create_key(func, args, kwargs)

            with self.lock:
                now = datetime.now()

                # Remove old calls outside the time window
                self.calls[key] = [
                    call_time for call_time in self.calls[key]
                    if now - call_time < timedelta(seconds=self.time_window)
                ]

                # Check if rate limit exceeded
                if len(self.calls[key]) >= self.max_calls:
                    oldest_call = min(self.calls[key])
                    wait_time = self.time_window - (now - oldest_call).total_seconds()
                    raise Exception(
                        f"Rate limit exceeded. Try again in {wait_time:.1f} seconds"
                    )

                # Record this call
                self.calls[key].append(now)

            return func(*args, **kwargs)
        return wrapper

    def _create_key(self, func: Callable, args: tuple, kwargs: dict) -> str:
        """Create a unique key for rate limiting"""
        key_data = f"{func.__name__}:{str(args)}:{str(sorted(kwargs.items()))}"
        return hashlib.md5(key_data.encode()).hexdigest()


# 4. Authentication Decorator
class AuthenticationRequired:
    """Decorator for checking user authentication"""

    def __init__(self, roles: Optional[List[str]] = None):
        self.required_roles = roles or []

    def __call__(self, func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # In a real web app, you'd get user from request context
            user = kwargs.get('user') or (args[0] if args else None)

            if not user:
                raise PermissionError("Authentication required")

            if not hasattr(user, 'is_authenticated') or not user.is_authenticated:
                raise PermissionError("User not authenticated")

            # Check roles if specified
            if self.required_roles:
                user_roles = getattr(user, 'roles', [])
                if not any(role in user_roles for role in self.required_roles):
                    raise PermissionError(
                        f"Insufficient permissions. Required roles: {self.required_roles}"
                    )

            return func(*args, **kwargs)
        return wrapper


# 5. Caching Decorator with TTL
class CacheWithTTL:
    """Advanced caching decorator with time-to-live"""

    def __init__(self, ttl_seconds: int = 300, max_size: int = 128):
        self.ttl_seconds = ttl_seconds
        self.max_size = max_size
        self.cache = {}
        self.access_times = {}
        self.lock = threading.Lock()

    def __call__(self, func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Create cache key
            key = self._create_cache_key(func, args, kwargs)

            with self.lock:
                now = datetime.now()

                # Check if cached result exists and is still valid
                if key in self.cache:
                    result, timestamp = self.cache[key]
                    if (now - timestamp).total_seconds() < self.ttl_seconds:
                        self.access_times[key] = now
                        logger.debug(f"Cache hit for {func.__name__}")
                        return result
                    else:
                        # Remove expired entry
                        del self.cache[key]
                        del self.access_times[key]

                # Execute function
                result = func(*args, **kwargs)

                # Store in cache
                self._store_in_cache(key, result, now)

                logger.debug(f"Cache miss for {func.__name__}, result cached")
                return result

        return wrapper

    def _create_cache_key(self, func: Callable, args: tuple, kwargs: dict) -> str:
        """Create a unique cache key"""
        key_data = f"{func.__module__}.{func.__name__}:{str(args)}:{str(sorted(kwargs.items()))}"
        return hashlib.sha256(key_data.encode()).hexdigest()

    def _store_in_cache(self, key: str, result: Any, timestamp: datetime):
        """Store result in cache with LRU eviction if needed"""
        # Remove oldest entries if cache is full
        if len(self.cache) >= self.max_size:
            # Find least recently used key
            lru_key = min(self.access_times.keys(), key=lambda k: self.access_times[k])
            del self.cache[lru_key]
            del self.access_times[lru_key]

        self.cache[key] = (result, timestamp)
        self.access_times[key] = timestamp


# 6. Validation Decorator
def validate_input(**validators):
    """Decorator for input validation"""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Get function signature
            import inspect
            sig = inspect.signature(func)
            bound_args = sig.bind(*args, **kwargs)
            bound_args.apply_defaults()

            # Validate each parameter
            for param_name, validator in validators.items():
                if param_name in bound_args.arguments:
                    value = bound_args.arguments[param_name]
                    if not validator(value):
                        raise ValueError(
                            f"Validation failed for parameter '{param_name}' with value: {value}"
                        )

            return func(*args, **kwargs)
        return wrapper
    return decorator


# 7. Logging Decorator
def log_calls(level: int = logging.INFO, include_args: bool = True, include_result: bool = False):
    """Decorator for logging function calls"""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Prepare log message
            log_parts = [f"Calling {func.__name__}"]

            if include_args and (args or kwargs):
                args_str = ', '.join(repr(arg) for arg in args)
                kwargs_str = ', '.join(f"{k}={repr(v)}" for k, v in kwargs.items())
                all_args = ', '.join(filter(None, [args_str, kwargs_str]))
                log_parts.append(f"with args: ({all_args})")

            logger.log(level, ' '.join(log_parts))

            try:
                result = func(*args, **kwargs)

                if include_result:
                    logger.log(level, f"{func.__name__} returned: {repr(result)}")

                return result
            except Exception as e:
                logger.error(f"{func.__name__} raised {type(e).__name__}: {e}")
                raise

        return wrapper
    return decorator


# 8. Context Manager Decorator
@contextmanager
def database_transaction():
    """Context manager for database transactions"""
    logger.info("Starting database transaction")
    try:
        # In a real app, you'd start a database transaction here
        yield "mock_db_connection"
        logger.info("Committing transaction")
    except Exception as e:
        logger.error(f"Rolling back transaction due to error: {e}")
        raise
    finally:
        logger.info("Transaction completed")


def transactional(func: Callable) -> Callable:
    """Decorator to wrap function in database transaction"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        with database_transaction() as db:
            # Add database connection to kwargs
            kwargs['db'] = db
            return func(*args, **kwargs)
    return wrapper


# Example Models and Functions
class User:
    def __init__(self, username: str, roles: List[str] = None):
        self.username = username
        self.roles = roles or []
        self.is_authenticated = True


class WebService:
    """Example web service class demonstrating decorator usage"""

    def __init__(self):
        self.users = {
            'admin': User('admin', ['admin', 'user']),
            'user': User('user', ['user']),
            'guest': User('guest', [])
        }

    @timing_decorator
    @log_calls(include_args=True, include_result=True)
    @validate_input(
        username=lambda x: isinstance(x, str) and len(x) >= 3,
        email=lambda x: isinstance(x, str) and '@' in x
    )
    def create_user(self, username: str, email: str) -> Dict[str, Any]:
        """Create a new user with validation and logging"""
        time.sleep(0.1)  # Simulate some work

        user_data = {
            'username': username,
            'email': email,
            'created_at': datetime.now().isoformat(),
            'id': len(self.users) + 1
        }

        return user_data

    @AuthenticationRequired(roles=['admin'])
    @CacheWithTTL(ttl_seconds=60)
    @timing_decorator
    def get_all_users(self, user: User) -> List[Dict[str, Any]]:
        """Get all users - admin only, with caching"""
        time.sleep(0.2)  # Simulate database query

        return [
            {
                'username': username,
                'roles': user_obj.roles,
                'is_authenticated': user_obj.is_authenticated
            }
            for username, user_obj in self.users.items()
        ]

    @RateLimiter(max_calls=5, time_window=60)
    @retry(max_attempts=3, delay=0.5, exceptions=(ConnectionError, TimeoutError))
    def external_api_call(self, endpoint: str) -> Dict[str, Any]:
        """Make external API call with rate limiting and retry"""
        # Simulate potential failure
        import random
        if random.random() < 0.3:
            raise ConnectionError("Simulated connection error")

        return {
            'endpoint': endpoint,
            'status': 'success',
            'timestamp': datetime.now().isoformat()
        }

    @transactional
    @log_calls(level=logging.WARNING)
    def update_user_profile(self, username: str, profile_data: Dict[str, Any], db=None) -> bool:
        """Update user profile within a transaction"""
        logger.info(f"Updating profile for {username} using {db}")

        # Simulate database update
        time.sleep(0.1)

        return True


def demonstrate_decorators():
    """Demonstrate various decorator patterns"""
    logger.info("🎭 Starting decorator demonstration")

    service = WebService()

    # 1. Basic function with validation and timing
    try:
        user_data = service.create_user("john_doe", "john@example.com")
        logger.info(f"Created user: {user_data}")
    except ValueError as e:
        logger.error(f"Validation error: {e}")

    # 2. Authentication and caching
    admin_user = service.users['admin']
    try:
        users = service.get_all_users(user=admin_user)
        logger.info(f"Retrieved {len(users)} users")

        # Second call should hit cache
        users = service.get_all_users(user=admin_user)
        logger.info("Second call completed (should be cached)")
    except PermissionError as e:
        logger.error(f"Permission error: {e}")

    # 3. Rate limiting and retry
    try:
        for i in range(3):
            result = service.external_api_call(f"/api/endpoint/{i}")
            logger.info(f"API call {i + 1}: {result['status']}")
    except Exception as e:
        logger.error(f"API call failed: {e}")

    # 4. Transactional operation
    try:
        success = service.update_user_profile(
            "john_doe",
            {"bio": "Software developer", "location": "San Francisco"}
        )
        logger.info(f"Profile update success: {success}")
    except Exception as e:
        logger.error(f"Profile update failed: {e}")

    logger.info("✅ Decorator demonstration completed")


if __name__ == '__main__':
    demonstrate_decorators()
```

**Common Web Development Decorator Patterns:**

1. **Authentication/Authorization**: Check user permissions
2. **Rate Limiting**: Prevent API abuse
3. **Caching**: Store expensive computation results
4. **Logging**: Track function calls and performance
5. **Validation**: Ensure input data integrity
6. **Retry Logic**: Handle transient failures
7. **Database Transactions**: Ensure data consistency
8. **CORS Handling**: Manage cross-origin requests

**Django Decorator Examples:**

```python
# Django-specific decorators
from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.http import require_http_methods
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@login_required
@permission_required('myapp.can_edit')
@require_http_methods(["GET", "POST"])
@cache_page(60 * 15)  # Cache for 15 minutes
def my_view(request):
    return HttpResponse("Hello, authenticated user!")

# Class-based view decorators
@method_decorator(login_required, name='dispatch')
class MyView(View):
    def get(self, request):
        return HttpResponse("Hello from class-based view!")
```

**Best Practices:**

- Use `functools.wraps` to preserve function metadata
- Keep decorators focused on single responsibilities
- Make decorators configurable with parameters
- Handle exceptions gracefully
- Document decorator behavior clearly
- Consider performance implications
- Test decorators thoroughly

---

This comprehensive guide demonstrates how Python's decorator feature provides elegant solutions for common web development patterns, making code more modular, reusable, and maintainable.

---

## Data Structures and Algorithms

### Q3: Explain Python's memory management and garbage collection.

**Difficulty: Medium**

**Answer:**
Python's memory management is automatic and handles allocation/deallocation of memory for objects. Understanding this is crucial for writing efficient web applications.

**Memory Management Components:**

```python
#!/usr/bin/env python3
"""
Python Memory Management and Garbage Collection
Demonstrating memory concepts for web development
"""

import gc
import sys
import weakref
import tracemalloc
from typing import List, Dict, Any
import psutil
import os
from dataclasses import dataclass
from collections import defaultdict


class MemoryProfiler:
    """Memory profiling utility for web applications"""

    def __init__(self):
        self.snapshots = []
        tracemalloc.start()

    def take_snapshot(self, label: str = ""):
        """Take a memory snapshot"""
        snapshot = tracemalloc.take_snapshot()
        self.snapshots.append((label, snapshot))
        return snapshot

    def compare_snapshots(self, snapshot1_idx: int = 0, snapshot2_idx: int = -1):
        """Compare two memory snapshots"""
        if len(self.snapshots) < 2:
            return "Need at least 2 snapshots to compare"

        label1, snap1 = self.snapshots[snapshot1_idx]
        label2, snap2 = self.snapshots[snapshot2_idx]

        top_stats = snap2.compare_to(snap1, 'lineno')

        print(f"\nMemory comparison: {label1} -> {label2}")
        print("Top 10 differences:")
        for stat in top_stats[:10]:
            print(stat)

    def get_current_memory_usage(self) -> Dict[str, float]:
        """Get current memory usage statistics"""
        process = psutil.Process(os.getpid())
        memory_info = process.memory_info()

        return {
            'rss_mb': memory_info.rss / 1024 / 1024,  # Resident Set Size
            'vms_mb': memory_info.vms / 1024 / 1024,  # Virtual Memory Size
            'percent': process.memory_percent(),
            'available_mb': psutil.virtual_memory().available / 1024 / 1024
        }


@dataclass
class User:
    """User model for memory demonstration"""
    id: int
    name: str
    email: str
    metadata: Dict[str, Any] = None

    def __post_init__(self):
        if self.metadata is None:
            self.metadata = {}


class CircularReference:
    """Demonstrate circular reference issues"""

    def __init__(self, name: str):
        self.name = name
        self.children = []
        self.parent = None

    def add_child(self, child):
        """Add child creating circular reference"""
        child.parent = self
        self.children.append(child)

    def __del__(self):
        print(f"CircularReference {self.name} is being deleted")


class WeakReferenceExample:
    """Demonstrate weak references to avoid circular references"""

    def __init__(self, name: str):
        self.name = name
        self.children = []
        self._parent_ref = None

    @property
    def parent(self):
        """Get parent using weak reference"""
        if self._parent_ref is not None:
            return self._parent_ref()
        return None

    @parent.setter
    def parent(self, parent):
        """Set parent using weak reference"""
        if parent is not None:
            self._parent_ref = weakref.ref(parent)
        else:
            self._parent_ref = None

    def add_child(self, child):
        """Add child without creating circular reference"""
        child.parent = self
        self.children.append(child)

    def __del__(self):
        print(f"WeakReferenceExample {self.name} is being deleted")


class MemoryEfficientCache:
    """Memory-efficient cache using weak references"""

    def __init__(self, max_size: int = 1000):
        self.max_size = max_size
        self._cache = weakref.WeakValueDictionary()
        self._access_order = []

    def get(self, key: str):
        """Get item from cache"""
        item = self._cache.get(key)
        if item is not None:
            # Move to end (most recently used)
            if key in self._access_order:
                self._access_order.remove(key)
            self._access_order.append(key)
        return item

    def put(self, key: str, value):
        """Put item in cache"""
        # Remove oldest items if cache is full
        while len(self._access_order) >= self.max_size:
            oldest_key = self._access_order.pop(0)
            if oldest_key in self._cache:
                del self._cache[oldest_key]

        self._cache[key] = value
        if key in self._access_order:
            self._access_order.remove(key)
        self._access_order.append(key)

    def size(self) -> int:
        """Get current cache size"""
        return len(self._cache)

    def clear(self):
        """Clear the cache"""
        self._cache.clear()
        self._access_order.clear()


def demonstrate_memory_management():
    """Demonstrate Python memory management concepts"""
    print("🧠 Python Memory Management Demonstration")

    profiler = MemoryProfiler()
    profiler.take_snapshot("Initial")

    # 1. Object creation and reference counting
    print("\n1. Reference Counting:")
    users = []
    for i in range(1000):
        user = User(i, f"user_{i}", f"user_{i}@example.com")
        users.append(user)

    print(f"Created {len(users)} users")
    print(f"Reference count for first user: {sys.getrefcount(users[0])}")

    profiler.take_snapshot("After creating users")

    # 2. Demonstrate circular references
    print("\n2. Circular References (problematic):")
    circular_objects = []
    for i in range(100):
        parent = CircularReference(f"parent_{i}")
        child = CircularReference(f"child_{i}")
        parent.add_child(child)
        circular_objects.append(parent)

    profiler.take_snapshot("After circular references")

    # 3. Clean up circular references
    print("\n3. Cleaning up circular references:")
    del circular_objects
    gc.collect()  # Force garbage collection

    profiler.take_snapshot("After GC cleanup")

    # 4. Demonstrate weak references
    print("\n4. Weak References (better approach):")
    weak_objects = []
    for i in range(100):
        parent = WeakReferenceExample(f"parent_{i}")
        child = WeakReferenceExample(f"child_{i}")
        parent.add_child(child)
        weak_objects.append(parent)

    profiler.take_snapshot("After weak references")

    # 5. Memory-efficient cache demonstration
    print("\n5. Memory-Efficient Cache:")
    cache = MemoryEfficientCache(max_size=50)

    # Add items to cache
    for i in range(100):
        user = User(i, f"cached_user_{i}", f"cached_{i}@example.com")
        cache.put(f"user_{i}", user)

    print(f"Cache size after adding 100 items: {cache.size()}")

    # Access some items
    for i in range(0, 20, 2):
        user = cache.get(f"user_{i}")
        if user:
            print(f"Retrieved user: {user.name}")

    profiler.take_snapshot("After cache operations")

    # 6. Memory usage statistics
    print("\n6. Memory Usage Statistics:")
    memory_stats = profiler.get_current_memory_usage()
    for key, value in memory_stats.items():
        print(f"{key}: {value:.2f}")

    # 7. Garbage collection statistics
    print("\n7. Garbage Collection Statistics:")
    gc_stats = gc.get_stats()
    for i, stat in enumerate(gc_stats):
        print(f"Generation {i}: {stat}")

    print(f"Garbage collection counts: {gc.get_count()}")
    print(f"Garbage collection thresholds: {gc.get_threshold()}")

    # 8. Compare memory snapshots
    profiler.compare_snapshots(0, -1)

    # 9. Clean up
    del users
    del weak_objects
    cache.clear()
    gc.collect()

    profiler.take_snapshot("Final cleanup")
    final_memory = profiler.get_current_memory_usage()
    print(f"\nFinal memory usage: {final_memory['rss_mb']:.2f} MB")

    print("✅ Memory management demonstration completed")


if __name__ == '__main__':
    demonstrate_memory_management()
```

**Key Memory Management Concepts:**

1. **Reference Counting**: Python tracks object references
2. **Garbage Collection**: Handles circular references
3. **Memory Pools**: Efficient allocation for small objects
4. **Weak References**: Avoid circular reference issues
5. **Memory Profiling**: Monitor and optimize memory usage

**Best Practices for Web Applications:**

- Use weak references for parent-child relationships
- Implement proper cache eviction policies
- Monitor memory usage in production
- Avoid creating unnecessary object references
- Use generators for large datasets
- Profile memory usage regularly

---

## Django Framework

### Q4: What are Python context managers and how do you implement them?

**Difficulty: Medium**

**Answer:**
Context managers provide a way to allocate and release resources precisely when you want to. They're essential for managing database connections, file operations, and other resources in web applications.

**Context Manager Implementation:**

```python
#!/usr/bin/env python3
"""
Python Context Managers for Web Development
Comprehensive examples of context manager patterns
"""

import time
import logging
import threading
import sqlite3
from contextlib import contextmanager, ExitStack, closing
from typing import Any, Dict, List, Optional, Generator
import json
import tempfile
import os
from dataclasses import dataclass
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# 1. Class-based Context Manager
class DatabaseConnection:
    """Database connection context manager"""

    def __init__(self, db_path: str):
        self.db_path = db_path
        self.connection = None
        self.transaction_active = False

    def __enter__(self):
        """Enter the context - establish connection"""
        logger.info(f"Connecting to database: {self.db_path}")
        self.connection = sqlite3.connect(self.db_path)
        self.connection.row_factory = sqlite3.Row  # Enable dict-like access
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Exit the context - clean up connection"""
        if self.connection:
            if exc_type is not None:
                logger.error(f"Exception occurred: {exc_type.__name__}: {exc_val}")
                if self.transaction_active:
                    logger.info("Rolling back transaction")
                    self.connection.rollback()
            else:
                if self.transaction_active:
                    logger.info("Committing transaction")
                    self.connection.commit()

            logger.info("Closing database connection")
            self.connection.close()

        # Return False to propagate exceptions
        return False

    def execute(self, query: str, params: tuple = ()) -> sqlite3.Cursor:
        """Execute a query"""
        if not self.connection:
            raise RuntimeError("No active database connection")
        return self.connection.execute(query, params)

    def begin_transaction(self):
        """Begin a transaction"""
        if self.connection:
            self.connection.execute("BEGIN")
            self.transaction_active = True
            logger.info("Transaction started")


# 2. Function-based Context Manager using @contextmanager
@contextmanager
def timing_context(operation_name: str) -> Generator[Dict[str, Any], None, None]:
    """Context manager for timing operations"""
    start_time = time.time()
    timing_info = {'operation': operation_name, 'start_time': start_time}

    logger.info(f"Starting operation: {operation_name}")

    try:
        yield timing_info
    except Exception as e:
        timing_info['error'] = str(e)
        logger.error(f"Operation {operation_name} failed: {e}")
        raise
    finally:
        end_time = time.time()
        duration = end_time - start_time
        timing_info['end_time'] = end_time
        timing_info['duration'] = duration

        logger.info(f"Operation {operation_name} completed in {duration:.4f} seconds")


@contextmanager
def temporary_file_context(suffix: str = '.tmp', content: str = '') -> Generator[str, None, None]:
    """Context manager for temporary files"""
    temp_file = None
    try:
        # Create temporary file
        temp_file = tempfile.NamedTemporaryFile(mode='w', suffix=suffix, delete=False)
        if content:
            temp_file.write(content)
        temp_file.flush()

        logger.info(f"Created temporary file: {temp_file.name}")
        yield temp_file.name

    finally:
        # Clean up
        if temp_file:
            temp_file.close()
            if os.path.exists(temp_file.name):
                os.unlink(temp_file.name)
                logger.info(f"Deleted temporary file: {temp_file.name}")


# 3. Advanced Context Manager with Resource Pool
class ConnectionPool:
    """Database connection pool context manager"""

    def __init__(self, db_path: str, max_connections: int = 5):
        self.db_path = db_path
        self.max_connections = max_connections
        self._pool = []
        self._used = set()
        self._lock = threading.Lock()

    def _create_connection(self) -> sqlite3.Connection:
        """Create a new database connection"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    @contextmanager
    def get_connection(self) -> Generator[sqlite3.Connection, None, None]:
        """Get a connection from the pool"""
        connection = None

        with self._lock:
            # Try to get connection from pool
            if self._pool:
                connection = self._pool.pop()
                logger.debug("Reused connection from pool")
            elif len(self._used) < self.max_connections:
                connection = self._create_connection()
                logger.debug("Created new connection")
            else:
                raise RuntimeError("Connection pool exhausted")

            self._used.add(connection)

        try:
            yield connection
        finally:
            with self._lock:
                self._used.discard(connection)
                # Return connection to pool if it's still valid
                try:
                    connection.execute("SELECT 1")  # Test connection
                    self._pool.append(connection)
                    logger.debug("Returned connection to pool")
                except sqlite3.Error:
                    connection.close()
                    logger.debug("Closed invalid connection")

    def close_all(self):
        """Close all connections in the pool"""
        with self._lock:
            for conn in self._pool:
                conn.close()
            for conn in self._used:
                conn.close()
            self._pool.clear()
            self._used.clear()
            logger.info("Closed all connections in pool")


# 4. Nested Context Managers
class MultiResourceManager:
    """Manage multiple resources with proper cleanup"""

    def __init__(self):
        self.resources = []

    @contextmanager
    def managed_resources(self, *resource_factories):
        """Manage multiple resources with automatic cleanup"""
        resources = []

        try:
            # Acquire all resources
            for factory in resource_factories:
                resource = factory()
                resources.append(resource)
                logger.info(f"Acquired resource: {type(resource).__name__}")

            yield resources

        finally:
            # Clean up resources in reverse order
            for resource in reversed(resources):
                try:
                    if hasattr(resource, 'close'):
                        resource.close()
                    elif hasattr(resource, '__exit__'):
                        resource.__exit__(None, None, None)
                    logger.info(f"Released resource: {type(resource).__name__}")
                except Exception as e:
                    logger.error(f"Error releasing resource: {e}")


# 5. Context Manager for API Rate Limiting
class RateLimitContext:
    """Context manager for API rate limiting"""

    def __init__(self, max_calls: int = 10, time_window: int = 60):
        self.max_calls = max_calls
        self.time_window = time_window
        self.calls = []
        self._lock = threading.Lock()

    def __enter__(self):
        """Check rate limit before entering"""
        with self._lock:
            now = time.time()

            # Remove old calls outside the time window
            self.calls = [call_time for call_time in self.calls
                         if now - call_time < self.time_window]

            # Check if rate limit exceeded
            if len(self.calls) >= self.max_calls:
                oldest_call = min(self.calls)
                wait_time = self.time_window - (now - oldest_call)
                raise RuntimeError(f"Rate limit exceeded. Wait {wait_time:.1f} seconds")

            # Record this call
            self.calls.append(now)
            logger.debug(f"Rate limit check passed: {len(self.calls)}/{self.max_calls}")

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Clean up after API call"""
        if exc_type is not None:
            logger.warning(f"API call failed: {exc_type.__name__}: {exc_val}")
        return False


# Example Usage and Demonstrations
@dataclass
class User:
    id: int
    name: str
    email: str
    created_at: str = None

    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now().isoformat()


def demonstrate_context_managers():
    """Demonstrate various context manager patterns"""
    logger.info("🔧 Context Managers Demonstration")

    # 1. Basic database context manager
    print("\n1. Database Context Manager:")
    with DatabaseConnection(':memory:') as db:
        # Create table
        db.execute('''
            CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                created_at TEXT NOT NULL
            )
        ''')

        # Insert data
        db.begin_transaction()
        users_data = [
            ('Alice', 'alice@example.com'),
            ('Bob', 'bob@example.com'),
            ('Charlie', 'charlie@example.com')
        ]

        for name, email in users_data:
            db.execute(
                'INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)',
                (name, email, datetime.now().isoformat())
            )

        # Query data
        cursor = db.execute('SELECT * FROM users')
        users = cursor.fetchall()
        print(f"Created {len(users)} users")

    # 2. Timing context manager
    print("\n2. Timing Context Manager:")
    with timing_context("Data Processing") as timer:
        # Simulate some work
        time.sleep(0.1)
        data = [i**2 for i in range(1000)]
        timer['processed_items'] = len(data)

    # 3. Temporary file context manager
    print("\n3. Temporary File Context Manager:")
    with temporary_file_context('.json', json.dumps({'test': 'data'})) as temp_path:
        # Read the temporary file
        with open(temp_path, 'r') as f:
            data = json.load(f)
            print(f"Temporary file content: {data}")

    # 4. Connection pool context manager
    print("\n4. Connection Pool Context Manager:")
    pool = ConnectionPool(':memory:', max_connections=3)

    try:
        # Use multiple connections
        with pool.get_connection() as conn1:
            conn1.execute('CREATE TABLE test (id INTEGER, value TEXT)')

            with pool.get_connection() as conn2:
                conn2.execute('INSERT INTO test VALUES (1, "test1")')

                with pool.get_connection() as conn3:
                    cursor = conn3.execute('SELECT * FROM test')
                    results = cursor.fetchall()
                    print(f"Query results: {list(results)}")
    finally:
        pool.close_all()

    # 5. Rate limiting context manager
    print("\n5. Rate Limiting Context Manager:")
    rate_limiter = RateLimitContext(max_calls=3, time_window=5)

    for i in range(5):
        try:
            with rate_limiter:
                print(f"API call {i + 1} successful")
                time.sleep(0.1)
        except RuntimeError as e:
            print(f"API call {i + 1} failed: {e}")
            break

    # 6. Multiple resource management
    print("\n6. Multiple Resource Management:")
    manager = MultiResourceManager()

    def create_temp_file():
        return tempfile.NamedTemporaryFile(mode='w', delete=False)

    def create_db_connection():
        return sqlite3.connect(':memory:')

    with manager.managed_resources(create_temp_file, create_db_connection) as resources:
        temp_file, db_conn = resources
        temp_file.write("Test data")
        temp_file.flush()

        db_conn.execute('CREATE TABLE test (id INTEGER)')
        print("Successfully used multiple resources")

    # 7. ExitStack for dynamic context management
    print("\n7. ExitStack for Dynamic Context Management:")
    with ExitStack() as stack:
        # Dynamically add context managers
        files = []
        for i in range(3):
            temp_file = stack.enter_context(
                temporary_file_context(f'.temp_{i}', f'Content {i}')
            )
            files.append(temp_file)

        print(f"Created {len(files)} temporary files")

        # All files will be automatically cleaned up

    logger.info("✅ Context managers demonstration completed")


if __name__ == '__main__':
    demonstrate_context_managers()
```

**Key Context Manager Benefits:**

1. **Resource Management**: Automatic cleanup of resources
2. **Exception Safety**: Guaranteed cleanup even on errors
3. **Code Clarity**: Clear resource acquisition and release
4. **Reusability**: Encapsulate resource management logic
5. **Composability**: Combine multiple context managers

**Common Use Cases in Web Development:**

- Database connections and transactions
- File operations and temporary files
- API rate limiting and throttling
- Timing and performance monitoring
- Lock management for thread safety
- HTTP client sessions
- Cache management

---

## Django REST Framework

### Q5: Explain Python's asyncio and asynchronous programming for web development.

**Difficulty: Advanced**

**Answer:**
Asyncio enables writing concurrent code using async/await syntax, crucial for building high-performance web applications that handle many simultaneous connections.

**Asyncio Fundamentals:**

```python
#!/usr/bin/env python3
"""
Python Asyncio for Web Development
Comprehensive examples of asynchronous programming
"""

import asyncio
import aiohttp
import aiofiles
import time
import json
from typing import List, Dict, Any, Optional, Callable
from dataclasses import dataclass, field
from datetime import datetime
import logging
from contextlib import asynccontextmanager
import weakref
from collections import defaultdict
import ssl
import certifi

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class APIResponse:
    """Response model for API calls"""
    url: str
    status: int
    data: Dict[str, Any]
    duration: float
    timestamp: datetime = field(default_factory=datetime.now)
    error: Optional[str] = None


class AsyncHTTPClient:
    """Asynchronous HTTP client with connection pooling"""

    def __init__(self, timeout: int = 30, max_connections: int = 100):
        self.timeout = aiohttp.ClientTimeout(total=timeout)
        self.connector = aiohttp.TCPConnector(
            limit=max_connections,
            ssl=ssl.create_default_context(cafile=certifi.where())
        )
        self.session: Optional[aiohttp.ClientSession] = None
        self._closed = False

    async def __aenter__(self):
        """Async context manager entry"""
        self.session = aiohttp.ClientSession(
            connector=self.connector,
            timeout=self.timeout,
            headers={'User-Agent': 'AsyncPython/1.0'}
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        await self.close()

    async def close(self):
        """Close the HTTP session"""
        if self.session and not self._closed:
            await self.session.close()
            self._closed = True

    async def get(self, url: str, **kwargs) -> APIResponse:
        """Make async GET request"""
        start_time = time.time()

        try:
            async with self.session.get(url, **kwargs) as response:
                data = await response.json()
                duration = time.time() - start_time

                return APIResponse(
                    url=url,
                    status=response.status,
                    data=data,
                    duration=duration
                )
        except Exception as e:
            duration = time.time() - start_time
            return APIResponse(
                url=url,
                status=0,
                data={},
                duration=duration,
                error=str(e)
            )

    async def post(self, url: str, data: Dict = None, **kwargs) -> APIResponse:
        """Make async POST request"""
        start_time = time.time()

        try:
            async with self.session.post(url, json=data, **kwargs) as response:
                response_data = await response.json()
                duration = time.time() - start_time

                return APIResponse(
                    url=url,
                    status=response.status,
                    data=response_data,
                    duration=duration
                )
        except Exception as e:
            duration = time.time() - start_time
            return APIResponse(
                url=url,
                status=0,
                data={},
                duration=duration,
                error=str(e)
            )


class AsyncTaskManager:
    """Manage concurrent async tasks with rate limiting"""

    def __init__(self, max_concurrent: int = 10, rate_limit: float = 1.0):
        self.max_concurrent = max_concurrent
        self.rate_limit = rate_limit
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self.last_request_time = 0
        self._lock = asyncio.Lock()

    async def execute_with_limit(self, coro):
        """Execute coroutine with concurrency and rate limiting"""
        async with self.semaphore:
            # Rate limiting
            async with self._lock:
                now = time.time()
                time_since_last = now - self.last_request_time
                if time_since_last < self.rate_limit:
                    await asyncio.sleep(self.rate_limit - time_since_last)
                self.last_request_time = time.time()

            return await coro

    async def gather_with_limit(self, *coroutines):
        """Execute multiple coroutines with limits"""
        limited_coroutines = [
            self.execute_with_limit(coro) for coro in coroutines
        ]
        return await asyncio.gather(*limited_coroutines, return_exceptions=True)


class AsyncCache:
    """Asynchronous cache with TTL support"""

    def __init__(self, default_ttl: int = 300):
        self.default_ttl = default_ttl
        self._cache: Dict[str, tuple] = {}
        self._lock = asyncio.Lock()

    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        async with self._lock:
            if key in self._cache:
                value, expiry = self._cache[key]
                if time.time() < expiry:
                    return value
                else:
                    del self._cache[key]
            return None

    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        """Set value in cache with TTL"""
        ttl = ttl or self.default_ttl
        expiry = time.time() + ttl

        async with self._lock:
            self._cache[key] = (value, expiry)

    async def delete(self, key: str) -> bool:
        """Delete key from cache"""
        async with self._lock:
            if key in self._cache:
                del self._cache[key]
                return True
            return False

    async def clear_expired(self):
        """Remove expired entries"""
        now = time.time()
        async with self._lock:
            expired_keys = [
                key for key, (_, expiry) in self._cache.items()
                if now >= expiry
            ]
            for key in expired_keys:
                del self._cache[key]
            return len(expired_keys)


class AsyncWebScraper:
    """Asynchronous web scraper with concurrent processing"""

    def __init__(self, max_concurrent: int = 5, delay: float = 1.0):
        self.task_manager = AsyncTaskManager(max_concurrent, delay)
        self.cache = AsyncCache(ttl=3600)  # 1 hour cache
        self.results: List[APIResponse] = []

    async def scrape_url(self, client: AsyncHTTPClient, url: str) -> APIResponse:
        """Scrape a single URL with caching"""
        # Check cache first
        cached_result = await self.cache.get(url)
        if cached_result:
            logger.info(f"Cache hit for {url}")
            return cached_result

        # Fetch from web
        logger.info(f"Fetching {url}")
        response = await client.get(url)

        # Cache successful responses
        if response.status == 200:
            await self.cache.set(url, response)

        return response

    async def scrape_urls(self, urls: List[str]) -> List[APIResponse]:
        """Scrape multiple URLs concurrently"""
        async with AsyncHTTPClient() as client:
            # Create coroutines for all URLs
            coroutines = [
                self.scrape_url(client, url) for url in urls
            ]

            # Execute with rate limiting
            results = await self.task_manager.gather_with_limit(*coroutines)

            # Filter out exceptions and store results
            self.results = [
                result for result in results
                if isinstance(result, APIResponse)
            ]

            return self.results

    def get_statistics(self) -> Dict[str, Any]:
        """Get scraping statistics"""
        if not self.results:
            return {}

        successful = [r for r in self.results if r.status == 200]
        failed = [r for r in self.results if r.status != 200]

        durations = [r.duration for r in self.results]

        return {
            'total_requests': len(self.results),
            'successful': len(successful),
            'failed': len(failed),
            'success_rate': len(successful) / len(self.results) * 100,
            'avg_duration': sum(durations) / len(durations),
            'min_duration': min(durations),
            'max_duration': max(durations),
            'total_duration': sum(durations)
        }


class AsyncFileProcessor:
    """Asynchronous file processing"""

    @staticmethod
    async def read_file(file_path: str) -> str:
        """Read file asynchronously"""
        async with aiofiles.open(file_path, 'r') as file:
            content = await file.read()
            return content

    @staticmethod
    async def write_file(file_path: str, content: str) -> None:
        """Write file asynchronously"""
        async with aiofiles.open(file_path, 'w') as file:
            await file.write(content)

    @staticmethod
    async def process_json_file(file_path: str) -> Dict[str, Any]:
        """Process JSON file asynchronously"""
        content = await AsyncFileProcessor.read_file(file_path)
        return json.loads(content)

    @staticmethod
    async def save_json_file(file_path: str, data: Dict[str, Any]) -> None:
        """Save data to JSON file asynchronously"""
        content = json.dumps(data, indent=2)
        await AsyncFileProcessor.write_file(file_path, content)


class AsyncEventEmitter:
    """Asynchronous event emitter"""

    def __init__(self):
        self._listeners: Dict[str, List[Callable]] = defaultdict(list)

    def on(self, event: str, callback: Callable):
        """Register event listener"""
        self._listeners[event].append(callback)

    def off(self, event: str, callback: Callable):
        """Remove event listener"""
        if event in self._listeners:
            try:
                self._listeners[event].remove(callback)
            except ValueError:
                pass

    async def emit(self, event: str, *args, **kwargs):
        """Emit event to all listeners"""
        if event in self._listeners:
            tasks = []
            for callback in self._listeners[event]:
                if asyncio.iscoroutinefunction(callback):
                    tasks.append(callback(*args, **kwargs))
                else:
                    # Run sync function in executor
                    loop = asyncio.get_event_loop()
                    tasks.append(loop.run_in_executor(None, callback, *args, **kwargs))

            if tasks:
                await asyncio.gather(*tasks, return_exceptions=True)


async def demonstrate_asyncio():
    """Demonstrate asyncio patterns for web development"""
    logger.info("🚀 Asyncio Web Development Demonstration")

    # 1. Basic async/await
    print("\n1. Basic Async Operations:")

    async def fetch_data(delay: float, data_id: int) -> Dict[str, Any]:
        """Simulate async data fetching"""
        await asyncio.sleep(delay)
        return {
            'id': data_id,
            'data': f'Data for ID {data_id}',
            'timestamp': datetime.now().isoformat(),
            'delay': delay
        }

    # Sequential vs concurrent execution
    start_time = time.time()

    # Sequential (slow)
    sequential_results = []
    for i in range(3):
        result = await fetch_data(0.1, i)
        sequential_results.append(result)

    sequential_time = time.time() - start_time
    print(f"Sequential execution: {sequential_time:.2f}s")

    # Concurrent (fast)
    start_time = time.time()
    concurrent_tasks = [fetch_data(0.1, i) for i in range(3, 6)]
    concurrent_results = await asyncio.gather(*concurrent_tasks)
    concurrent_time = time.time() - start_time
    print(f"Concurrent execution: {concurrent_time:.2f}s")

    # 2. HTTP Client demonstration
    print("\n2. Async HTTP Client:")
    test_urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ]

    scraper = AsyncWebScraper(max_concurrent=2, delay=0.5)
    responses = await scraper.scrape_urls(test_urls)

    print(f"Scraped {len(responses)} URLs")
    stats = scraper.get_statistics()
    for key, value in stats.items():
        print(f"{key}: {value}")

    # 3. Async cache demonstration
    print("\n3. Async Cache:")
    cache = AsyncCache(default_ttl=2)

    # Set values
    await cache.set('key1', 'value1')
    await cache.set('key2', 'value2', ttl=1)

    # Get values
    value1 = await cache.get('key1')
    value2 = await cache.get('key2')
    print(f"Cached values: key1={value1}, key2={value2}")

    # Wait for expiry
    await asyncio.sleep(1.5)
    expired_count = await cache.clear_expired()
    print(f"Cleared {expired_count} expired entries")

    # 4. Event emitter demonstration
    print("\n4. Async Event Emitter:")
    emitter = AsyncEventEmitter()

    async def async_handler(message: str):
        await asyncio.sleep(0.1)
        print(f"Async handler received: {message}")

    def sync_handler(message: str):
        print(f"Sync handler received: {message}")

    emitter.on('test_event', async_handler)
    emitter.on('test_event', sync_handler)

    await emitter.emit('test_event', 'Hello from asyncio!')

    # 5. Task management with error handling
    print("\n5. Task Management with Error Handling:")

    async def task_with_error(task_id: int):
        await asyncio.sleep(0.1)
        if task_id == 2:
            raise ValueError(f"Simulated error in task {task_id}")
        return f"Task {task_id} completed"

    tasks = [task_with_error(i) for i in range(5)]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"Task {i} failed: {result}")
        else:
            print(f"Task {i} succeeded: {result}")

    logger.info("✅ Asyncio demonstration completed")


if __name__ == '__main__':
    # Run the async demonstration
    asyncio.run(demonstrate_asyncio())
```

**Key Asyncio Concepts:**

1. **Event Loop**: Core of asyncio, manages and executes coroutines
2. **Coroutines**: Functions defined with `async def`
3. **Tasks**: Wrapped coroutines that can be scheduled
4. **Futures**: Low-level awaitable objects
5. **Semaphores**: Control concurrent access to resources
6. **Locks**: Prevent race conditions in async code

**Best Practices for Web Development:**

- Use connection pooling for HTTP clients
- Implement proper error handling and timeouts
- Use semaphores to limit concurrent operations
- Cache frequently accessed data
- Handle exceptions in gather operations
- Use context managers for resource cleanup
- Monitor and profile async performance

---

## Database Integration

### Q6: How do you implement custom Django middleware and what are common use cases?

**Difficulty: Medium**

**Answer:**
Django middleware is a framework of hooks into Django's request/response processing. It's a light, low-level plugin system for globally altering Django's input or output.

**Custom Middleware Implementation:**

```python
#!/usr/bin/env python3
"""
Django Custom Middleware Examples
Comprehensive middleware implementations for web applications
"""

import time
import json
import logging
import uuid
from typing import Callable, Dict, Any, Optional
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.utils.deprecation import MiddlewareMixin
from django.core.cache import cache
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.utils import timezone
from django.db import connection
import threading
from collections import defaultdict
from datetime import datetime, timedelta
import hashlib

# Configure logging
logger = logging.getLogger(__name__)


class RequestLoggingMiddleware:
    """Middleware for comprehensive request logging"""

    def __init__(self, get_response: Callable):
        self.get_response = get_response
        self.logger = logging.getLogger('django.request')

    def __call__(self, request: HttpRequest) -> HttpResponse:
        # Generate unique request ID
        request.id = str(uuid.uuid4())
        start_time = time.time()

        # Log request details
        self.log_request(request)

        # Process request
        response = self.get_response(request)

        # Calculate processing time
        processing_time = time.time() - start_time

        # Log response details
        self.log_response(request, response, processing_time)

        return response

    def log_request(self, request: HttpRequest):
        """Log incoming request details"""
        user_info = 'Anonymous'
        if hasattr(request, 'user') and request.user.is_authenticated:
            user_info = f'{request.user.username} (ID: {request.user.id})'

        self.logger.info(
            f"[{request.id}] {request.method} {request.get_full_path()} "
            f"from {self.get_client_ip(request)} by {user_info}"
        )

        # Log request headers (excluding sensitive ones)
        safe_headers = self.get_safe_headers(request)
        if safe_headers:
            self.logger.debug(f"[{request.id}] Headers: {safe_headers}")

        # Log request body for POST/PUT/PATCH (with size limit)
        if request.method in ['POST', 'PUT', 'PATCH']:
            self.log_request_body(request)

    def log_response(self, request: HttpRequest, response: HttpResponse, processing_time: float):
        """Log response details"""
        self.logger.info(
            f"[{request.id}] Response {response.status_code} "
            f"in {processing_time:.3f}s"
        )

        # Log slow requests
        if processing_time > getattr(settings, 'SLOW_REQUEST_THRESHOLD', 1.0):
            self.logger.warning(
                f"[{request.id}] Slow request: {processing_time:.3f}s "
                f"for {request.method} {request.get_full_path()}"
            )

    def get_client_ip(self, request: HttpRequest) -> str:
        """Get client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def get_safe_headers(self, request: HttpRequest) -> Dict[str, str]:
        """Get request headers excluding sensitive ones"""
        sensitive_headers = {
            'HTTP_AUTHORIZATION', 'HTTP_COOKIE', 'HTTP_X_API_KEY',
            'HTTP_X_AUTH_TOKEN', 'HTTP_AUTHORIZATION'
        }

        safe_headers = {}
        for key, value in request.META.items():
            if key.startswith('HTTP_') and key not in sensitive_headers:
                header_name = key[5:].replace('_', '-').title()
                safe_headers[header_name] = value

        return safe_headers

    def log_request_body(self, request: HttpRequest):
        """Log request body with size limit"""
        try:
            max_body_size = getattr(settings, 'LOG_REQUEST_BODY_MAX_SIZE', 1024)
            if hasattr(request, 'body') and len(request.body) <= max_body_size:
                content_type = request.META.get('CONTENT_TYPE', '')
                if 'application/json' in content_type:
                    try:
                        body_data = json.loads(request.body)
                        # Remove sensitive fields
                        self.sanitize_body_data(body_data)
                        self.logger.debug(f"[{request.id}] Body: {body_data}")
                    except json.JSONDecodeError:
                        self.logger.debug(f"[{request.id}] Body: {request.body.decode('utf-8', errors='ignore')}")
        except Exception as e:
            self.logger.error(f"[{request.id}] Error logging request body: {e}")

    def sanitize_body_data(self, data: Dict[str, Any]):
        """Remove sensitive fields from body data"""
        sensitive_fields = {'password', 'token', 'secret', 'key', 'auth'}

        if isinstance(data, dict):
            for key in list(data.keys()):
                if any(sensitive in key.lower() for sensitive in sensitive_fields):
                    data[key] = '[REDACTED]'
                elif isinstance(data[key], dict):
                    self.sanitize_body_data(data[key])


class RateLimitMiddleware:
    """Rate limiting middleware with multiple strategies"""

    def __init__(self, get_response: Callable):
        self.get_response = get_response
        self.cache_prefix = 'rate_limit'
        self.default_limit = getattr(settings, 'RATE_LIMIT_DEFAULT', 100)
        self.default_window = getattr(settings, 'RATE_LIMIT_WINDOW', 3600)  # 1 hour

    def __call__(self, request: HttpRequest) -> HttpResponse:
        # Check rate limit
        if self.is_rate_limited(request):
            return self.rate_limit_exceeded_response(request)

        # Process request
        response = self.get_response(request)

        # Update rate limit counter
        self.update_rate_limit(request)

        return response

    def get_rate_limit_key(self, request: HttpRequest) -> str:
        """Generate rate limit key based on user/IP"""
        if hasattr(request, 'user') and request.user.is_authenticated:
            identifier = f'user_{request.user.id}'
        else:
            identifier = f'ip_{self.get_client_ip(request)}'

        endpoint = request.resolver_match.url_name if request.resolver_match else 'unknown'
        return f'{self.cache_prefix}_{identifier}_{endpoint}'

    def get_client_ip(self, request: HttpRequest) -> str:
        """Get client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR', 'unknown')

    def get_rate_limit_config(self, request: HttpRequest) -> tuple:
        """Get rate limit configuration for the request"""
        # You can customize this based on endpoint, user type, etc.
        endpoint_limits = getattr(settings, 'RATE_LIMIT_ENDPOINTS', {})

        if request.resolver_match and request.resolver_match.url_name:
            endpoint_config = endpoint_limits.get(request.resolver_match.url_name)
            if endpoint_config:
                return endpoint_config.get('limit', self.default_limit), \
                       endpoint_config.get('window', self.default_window)

        # Check for authenticated users vs anonymous
        if hasattr(request, 'user') and request.user.is_authenticated:
            if request.user.is_staff:
                return self.default_limit * 10, self.default_window  # Higher limit for staff

        return self.default_limit, self.default_window

    def is_rate_limited(self, request: HttpRequest) -> bool:
        """Check if request should be rate limited"""
        key = self.get_rate_limit_key(request)
        limit, window = self.get_rate_limit_config(request)

        # Get current count
        current_count = cache.get(key, 0)

        return current_count >= limit

    def update_rate_limit(self, request: HttpRequest):
        """Update rate limit counter"""
        key = self.get_rate_limit_key(request)
        limit, window = self.get_rate_limit_config(request)

        # Increment counter
        try:
            current_count = cache.get(key, 0)
            cache.set(key, current_count + 1, window)
        except Exception as e:
            logger.error(f"Error updating rate limit: {e}")

    def rate_limit_exceeded_response(self, request: HttpRequest) -> JsonResponse:
        """Return rate limit exceeded response"""
        key = self.get_rate_limit_key(request)
        limit, window = self.get_rate_limit_config(request)

        # Get time until reset
        ttl = cache.ttl(key) if hasattr(cache, 'ttl') else window

        response_data = {
            'error': 'Rate limit exceeded',
            'message': f'Too many requests. Limit: {limit} per {window} seconds',
            'retry_after': ttl
        }

        response = JsonResponse(response_data, status=429)
        response['Retry-After'] = str(ttl)
        response['X-RateLimit-Limit'] = str(limit)
        response['X-RateLimit-Remaining'] = '0'
        response['X-RateLimit-Reset'] = str(int(time.time()) + ttl)

        return response


class SecurityHeadersMiddleware:
    """Add security headers to responses"""

    def __init__(self, get_response: Callable):
        self.get_response = get_response
        self.security_headers = {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Content-Security-Policy': self.get_csp_header(),
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
        }

    def __call__(self, request: HttpRequest) -> HttpResponse:
        response = self.get_response(request)

        # Add security headers
        for header, value in self.security_headers.items():
            if header not in response:
                response[header] = value

        return response

    def get_csp_header(self) -> str:
        """Generate Content Security Policy header"""
        csp_config = getattr(settings, 'CSP_CONFIG', {})

        default_csp = {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:', 'https:'],
            'font-src': ["'self'"],
            'connect-src': ["'self'"],
            'frame-ancestors': ["'none'"]
        }

        # Merge with custom config
        csp_config = {**default_csp, **csp_config}

        # Build CSP string
        csp_parts = []
        for directive, sources in csp_config.items():
            if sources:
                sources_str = ' '.join(sources)
                csp_parts.append(f'{directive} {sources_str}')

        return '; '.join(csp_parts)


class PerformanceMonitoringMiddleware:
    """Monitor application performance metrics"""

    def __init__(self, get_response: Callable):
        self.get_response = get_response
        self.metrics = defaultdict(list)
        self.lock = threading.Lock()

    def __call__(self, request: HttpRequest) -> HttpResponse:
        start_time = time.time()
        start_queries = len(connection.queries)

        # Process request
        response = self.get_response(request)

        # Calculate metrics
        end_time = time.time()
        processing_time = end_time - start_time
        query_count = len(connection.queries) - start_queries

        # Store metrics
        self.record_metrics(request, response, processing_time, query_count)

        # Add performance headers
        response['X-Response-Time'] = f'{processing_time:.3f}s'
        response['X-DB-Queries'] = str(query_count)

        return response

    def record_metrics(self, request: HttpRequest, response: HttpResponse,
                      processing_time: float, query_count: int):
        """Record performance metrics"""
        endpoint = self.get_endpoint_name(request)

        metric_data = {
            'timestamp': datetime.now(),
            'endpoint': endpoint,
            'method': request.method,
            'status_code': response.status_code,
            'processing_time': processing_time,
            'query_count': query_count,
            'user_authenticated': hasattr(request, 'user') and request.user.is_authenticated
        }

        with self.lock:
            self.metrics[endpoint].append(metric_data)

            # Keep only recent metrics (last 1000 per endpoint)
            if len(self.metrics[endpoint]) > 1000:
                self.metrics[endpoint] = self.metrics[endpoint][-1000:]

    def get_endpoint_name(self, request: HttpRequest) -> str:
        """Get endpoint name for metrics"""
        if request.resolver_match:
            return f'{request.resolver_match.app_name}:{request.resolver_match.url_name}'
        return f'{request.method}:{request.path}'

    def get_metrics_summary(self, endpoint: str = None) -> Dict[str, Any]:
        """Get performance metrics summary"""
        with self.lock:
            if endpoint:
                metrics_data = self.metrics.get(endpoint, [])
            else:
                metrics_data = []
                for endpoint_metrics in self.metrics.values():
                    metrics_data.extend(endpoint_metrics)

        if not metrics_data:
            return {}

        processing_times = [m['processing_time'] for m in metrics_data]
        query_counts = [m['query_count'] for m in metrics_data]

        return {
            'total_requests': len(metrics_data),
            'avg_response_time': sum(processing_times) / len(processing_times),
            'min_response_time': min(processing_times),
            'max_response_time': max(processing_times),
            'avg_query_count': sum(query_counts) / len(query_counts),
            'max_query_count': max(query_counts),
            'status_codes': self.get_status_code_distribution(metrics_data),
            'endpoints': list(self.metrics.keys()) if not endpoint else [endpoint]
        }

    def get_status_code_distribution(self, metrics_data: list) -> Dict[int, int]:
        """Get distribution of status codes"""
        distribution = defaultdict(int)
        for metric in metrics_data:
            distribution[metric['status_code']] += 1
        return dict(distribution)


class CORSMiddleware:
    """Handle Cross-Origin Resource Sharing (CORS)"""

    def __init__(self, get_response: Callable):
        self.get_response = get_response
        self.allowed_origins = getattr(settings, 'CORS_ALLOWED_ORIGINS', ['*'])
        self.allowed_methods = getattr(settings, 'CORS_ALLOWED_METHODS',
                                     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])
        self.allowed_headers = getattr(settings, 'CORS_ALLOWED_HEADERS',
                                     ['Accept', 'Content-Type', 'Authorization'])
        self.max_age = getattr(settings, 'CORS_PREFLIGHT_MAX_AGE', 86400)

    def __call__(self, request: HttpRequest) -> HttpResponse:
        # Handle preflight requests
        if request.method == 'OPTIONS':
            return self.handle_preflight(request)

        # Process normal request
        response = self.get_response(request)

        # Add CORS headers
        self.add_cors_headers(request, response)

        return response

    def handle_preflight(self, request: HttpRequest) -> HttpResponse:
        """Handle CORS preflight requests"""
        response = HttpResponse()
        self.add_cors_headers(request, response)
        response['Access-Control-Max-Age'] = str(self.max_age)
        return response

    def add_cors_headers(self, request: HttpRequest, response: HttpResponse):
        """Add CORS headers to response"""
        origin = request.META.get('HTTP_ORIGIN')

        # Check if origin is allowed
        if self.is_origin_allowed(origin):
            response['Access-Control-Allow-Origin'] = origin
        elif '*' in self.allowed_origins:
            response['Access-Control-Allow-Origin'] = '*'

        response['Access-Control-Allow-Methods'] = ', '.join(self.allowed_methods)
        response['Access-Control-Allow-Headers'] = ', '.join(self.allowed_headers)
        response['Access-Control-Allow-Credentials'] = 'true'

    def is_origin_allowed(self, origin: str) -> bool:
        """Check if origin is in allowed list"""
        if not origin:
            return False

        return origin in self.allowed_origins or '*' in self.allowed_origins


# Example Django settings configuration
MIDDLEWARE_SETTINGS_EXAMPLE = """
# settings.py

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'myapp.middleware.SecurityHeadersMiddleware',
    'myapp.middleware.CORSMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'myapp.middleware.RateLimitMiddleware',
    'myapp.middleware.RequestLoggingMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'myapp.middleware.PerformanceMonitoringMiddleware',
]

# Rate limiting configuration
RATE_LIMIT_DEFAULT = 100  # requests per hour
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds
RATE_LIMIT_ENDPOINTS = {
    'api:login': {'limit': 5, 'window': 300},  # 5 attempts per 5 minutes
    'api:register': {'limit': 3, 'window': 3600},  # 3 attempts per hour
    'api:password_reset': {'limit': 3, 'window': 3600},
}

# CORS configuration
CORS_ALLOWED_ORIGINS = [
    'https://example.com',
    'https://app.example.com',
]
CORS_ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
CORS_ALLOWED_HEADERS = ['Accept', 'Content-Type', 'Authorization', 'X-Requested-With']

# CSP configuration
CSP_CONFIG = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://cdn.example.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'https:'],
}

# Performance monitoring
SLOW_REQUEST_THRESHOLD = 1.0  # seconds
LOG_REQUEST_BODY_MAX_SIZE = 1024  # bytes
"""
```

**Common Middleware Use Cases:**

1. **Authentication & Authorization**: User verification and permissions
2. **Rate Limiting**: Prevent API abuse and DoS attacks
3. **Security Headers**: Add security-related HTTP headers
4. **CORS Handling**: Manage cross-origin requests
5. **Request/Response Logging**: Track API usage and debugging
6. **Performance Monitoring**: Measure response times and database queries
7. **Caching**: Implement response caching strategies
8. **Request Modification**: Transform requests before processing
9. **Error Handling**: Centralized error processing
10. **Metrics Collection**: Gather application analytics

**Middleware Best Practices:**

- Keep middleware lightweight and fast
- Handle exceptions gracefully
- Use appropriate caching for expensive operations
- Consider middleware order carefully
- Make middleware configurable through settings
- Add comprehensive logging for debugging
- Test middleware thoroughly with edge cases

---

### Q7: Explain Python's ORM patterns and Django model relationships.

**Difficulty: Medium**

**Answer:**
Object-Relational Mapping (ORM) bridges the gap between object-oriented programming and relational databases. Django's ORM provides a powerful abstraction layer for database operations.

**Django Model Relationships and ORM Patterns:**

```python
#!/usr/bin/env python3
"""
Django ORM Patterns and Model Relationships
Comprehensive examples of database modeling and queries
"""

from django.db import models, transaction
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.db.models import Q, F, Count, Sum, Avg, Max, Min, Prefetch
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.cache import cache
from typing import List, Dict, Any, Optional
from decimal import Decimal
import uuid
from datetime import datetime, timedelta
import json


class TimestampedModel(models.Model):
    """Abstract base model with timestamp fields"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SoftDeleteManager(models.Manager):
    """Manager for soft delete functionality"""

    def get_queryset(self):
        return super().get_queryset().filter(deleted_at__isnull=True)

    def deleted(self):
        return super().get_queryset().filter(deleted_at__isnull=False)

    def with_deleted(self):
        return super().get_queryset()


class SoftDeleteModel(TimestampedModel):
    """Abstract model with soft delete functionality"""
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = SoftDeleteManager()
    all_objects = models.Manager()  # Access to all objects including deleted

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        """Soft delete implementation"""
        self.deleted_at = timezone.now()
        self.save(using=using)

    def hard_delete(self, using=None, keep_parents=False):
        """Actual delete from database"""
        super().delete(using=using, keep_parents=keep_parents)

    def restore(self):
        """Restore soft deleted object"""
        self.deleted_at = None
        self.save()


class User(AbstractUser, TimestampedModel):
    """Extended user model"""
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    last_login_ip = models.GenericIPAddressField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    class Meta:
        db_table = 'users'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['is_active', 'is_verified']),
        ]


class Category(SoftDeleteModel):
    """Product category with hierarchical structure"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
    )
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'categories'
        verbose_name_plural = 'Categories'
        ordering = ['sort_order', 'name']
        indexes = [
            models.Index(fields=['parent', 'is_active']),
            models.Index(fields=['slug']),
        ]

    def __str__(self):
        return self.name

    def get_ancestors(self):
        """Get all parent categories"""
        ancestors = []
        current = self.parent
        while current:
            ancestors.append(current)
            current = current.parent
        return ancestors[::-1]  # Reverse to get root first

    def get_descendants(self):
        """Get all child categories recursively"""
        descendants = []
        for child in self.children.all():
            descendants.append(child)
            descendants.extend(child.get_descendants())
        return descendants


class Brand(SoftDeleteModel):
    """Product brand"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)
    website = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'brands'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(SoftDeleteModel):
    """Product model with complex relationships"""
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True)
    sku = models.CharField(max_length=50, unique=True)

    # Relationships
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='products'
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.PROTECT,
        related_name='products'
    )

    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Inventory
    stock_quantity = models.PositiveIntegerField(default=0)
    low_stock_threshold = models.PositiveIntegerField(default=10)

    # Product attributes
    weight = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    dimensions = models.JSONField(default=dict, blank=True)  # {"length": 10, "width": 5, "height": 3}

    # Status
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    is_digital = models.BooleanField(default=False)

    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=500, blank=True)

    class Meta:
        db_table = 'products'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['brand', 'is_active']),
            models.Index(fields=['sku']),
            models.Index(fields=['is_featured', 'is_active']),
            models.Index(fields=['price']),
        ]

    def __str__(self):
        return self.name

    @property
    def effective_price(self):
        """Get the current selling price"""
        return self.sale_price if self.sale_price else self.price

    @property
    def is_low_stock(self):
        """Check if product is low in stock"""
        return self.stock_quantity <= self.low_stock_threshold

    @property
    def is_in_stock(self):
        """Check if product is in stock"""
        return self.stock_quantity > 0


class ProductImage(TimestampedModel):
    """Product images with ordering"""
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'product_images'
        ordering = ['sort_order']
        indexes = [
            models.Index(fields=['product', 'is_primary']),
        ]


class ProductAttribute(models.Model):
    """Product attribute definitions"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    attribute_type = models.CharField(
        max_length=20,
        choices=[
            ('text', 'Text'),
            ('number', 'Number'),
            ('boolean', 'Boolean'),
            ('select', 'Select'),
            ('multiselect', 'Multi-Select'),
        ]
    )
    is_required = models.BooleanField(default=False)
    is_filterable = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'product_attributes'
        ordering = ['sort_order', 'name']


class ProductAttributeValue(models.Model):
    """Product attribute values"""
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='attribute_values'
    )
    attribute = models.ForeignKey(
        ProductAttribute,
        on_delete=models.CASCADE
    )
    value = models.TextField()

    class Meta:
        db_table = 'product_attribute_values'
        unique_together = ['product', 'attribute']
        indexes = [
            models.Index(fields=['product', 'attribute']),
        ]


class Order(SoftDeleteModel):
    """Customer order"""
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]

    order_number = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='orders'
    )

    # Order details
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    # Addresses
    billing_address = models.JSONField()
    shipping_address = models.JSONField()

    # Timestamps
    confirmed_at = models.DateTimeField(null=True, blank=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    # Notes
    notes = models.TextField(blank=True)

    class Meta:
        db_table = 'orders'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['order_number']),
            models.Index(fields=['status', 'created_at']),
        ]

    def __str__(self):
        return f"Order {self.order_number}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = self.generate_order_number()
        super().save(*args, **kwargs)

    def generate_order_number(self):
        """Generate unique order number"""
        import random
        import string
        timestamp = timezone.now().strftime('%Y%m%d')
        random_part = ''.join(random.choices(string.digits, k=6))
        return f"ORD-{timestamp}-{random_part}"


class OrderItem(TimestampedModel):
    """Order line items"""
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    # Product snapshot at time of order
    product_name = models.CharField(max_length=200)
    product_sku = models.CharField(max_length=50)

    class Meta:
        db_table = 'order_items'
        indexes = [
            models.Index(fields=['order']),
            models.Index(fields=['product']),
        ]

    def save(self, *args, **kwargs):
        if not self.total_price:
            self.total_price = self.quantity * self.unit_price
        if not self.product_name:
            self.product_name = self.product.name
        if not self.product_sku:
            self.product_sku = self.product.sku
        super().save(*args, **kwargs)


class Cart(TimestampedModel):
    """Shopping cart"""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='cart'
    )
    session_key = models.CharField(max_length=40, blank=True)  # For anonymous users

    class Meta:
        db_table = 'carts'


class CartItem(TimestampedModel):
    """Cart items"""
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        db_table = 'cart_items'
        unique_together = ['cart', 'product']
        indexes = [
            models.Index(fields=['cart']),
        ]

    @property
    def total_price(self):
        return self.quantity * self.product.effective_price


class Review(SoftDeleteModel):
    """Product reviews"""
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    title = models.CharField(max_length=200)
    content = models.TextField()
    is_verified_purchase = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    helpful_count = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'reviews'
        unique_together = ['product', 'user']
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['product', 'is_approved']),
            models.Index(fields=['user']),
            models.Index(fields=['rating']),
        ]


class Wishlist(TimestampedModel):
    """User wishlist"""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='wishlists'
    )
    name = models.CharField(max_length=100, default='My Wishlist')
    is_public = models.BooleanField(default=False)

    class Meta:
        db_table = 'wishlists'
        unique_together = ['user', 'name']


class WishlistItem(TimestampedModel):
    """Wishlist items - Many-to-Many through model"""
    wishlist = models.ForeignKey(
        Wishlist,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    notes = models.TextField(blank=True)

    class Meta:
        db_table = 'wishlist_items'
        unique_together = ['wishlist', 'product']


# Advanced ORM Query Examples
class ProductQuerySet(models.QuerySet):
    """Custom QuerySet for Product model"""

    def active(self):
        return self.filter(is_active=True)

    def featured(self):
        return self.filter(is_featured=True, is_active=True)

    def in_stock(self):
        return self.filter(stock_quantity__gt=0)

    def low_stock(self):
        return self.filter(stock_quantity__lte=F('low_stock_threshold'))

    def by_category(self, category_slug):
        return self.filter(category__slug=category_slug)

    def by_brand(self, brand_slug):
        return self.filter(brand__slug=brand_slug)

    def price_range(self, min_price=None, max_price=None):
        queryset = self
        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)
        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)
        return queryset

    def with_reviews(self):
        return self.prefetch_related(
            Prefetch(
                'reviews',
                queryset=Review.objects.filter(is_approved=True).select_related('user')
            )
        )

    def with_images(self):
        return self.prefetch_related('images')

    def with_category_and_brand(self):
        return self.select_related('category', 'brand')


class ProductManager(models.Manager):
    """Custom Manager for Product model"""

    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)

    def active(self):
        return self.get_queryset().active()

    def featured(self):
        return self.get_queryset().featured()

    def search(self, query):
        """Full-text search across multiple fields"""
        return self.get_queryset().filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(sku__icontains=query) |
            Q(brand__name__icontains=query) |
            Q(category__name__icontains=query)
        ).distinct()


# Add custom manager to Product model
Product.add_to_class('objects', ProductManager())


# Signal handlers
@receiver(post_save, sender=User)
def create_user_cart(sender, instance, created, **kwargs):
    """Create cart when user is created"""
    if created:
        Cart.objects.create(user=instance)


@receiver(post_save, sender=OrderItem)
def update_product_stock(sender, instance, created, **kwargs):
    """Update product stock when order item is created"""
    if created and instance.order.status == 'confirmed':
        product = instance.product
        product.stock_quantity = F('stock_quantity') - instance.quantity
        product.save(update_fields=['stock_quantity'])


@receiver(pre_delete, sender=OrderItem)
def restore_product_stock(sender, instance, **kwargs):
    """Restore product stock when order item is deleted"""
    if instance.order.status == 'confirmed':
        product = instance.product
        product.stock_quantity = F('stock_quantity') + instance.quantity
        product.save(update_fields=['stock_quantity'])


# Advanced ORM Usage Examples
def demonstrate_orm_patterns():
    """Demonstrate various ORM patterns and queries"""

    # 1. Complex queries with annotations
    products_with_stats = Product.objects.active().annotate(
        review_count=Count('reviews', filter=Q(reviews__is_approved=True)),
        avg_rating=Avg('reviews__rating', filter=Q(reviews__is_approved=True)),
        total_sold=Sum('orderitem__quantity'),
        revenue=Sum(F('orderitem__quantity') * F('orderitem__unit_price'))
    ).filter(review_count__gt=0)

    # 2. Subqueries and Exists
    # Products that have been ordered in the last 30 days
    recent_date = timezone.now() - timedelta(days=30)
    recently_ordered_products = Product.objects.filter(
        models.Exists(
            OrderItem.objects.filter(
                product=models.OuterRef('pk'),
                order__created_at__gte=recent_date,
                order__status__in=['confirmed', 'shipped', 'delivered']
            )
        )
    )

    # 3. Window functions (Django 2.0+)
    from django.db.models import Window, RowNumber

    # Rank products by price within each category
    products_ranked = Product.objects.annotate(
        price_rank=Window(
            expression=RowNumber(),
            partition_by=[F('category')],
            order_by=F('price').desc()
        )
    )

    # 4. Conditional expressions
    from django.db.models import Case, When, Value, CharField

    products_with_status = Product.objects.annotate(
        stock_status=Case(
            When(stock_quantity=0, then=Value('Out of Stock')),
            When(stock_quantity__lte=F('low_stock_threshold'), then=Value('Low Stock')),
            default=Value('In Stock'),
            output_field=CharField()
        )
    )

    # 5. Bulk operations
    # Bulk create
    products_to_create = [
        Product(
            name=f'Product {i}',
            slug=f'product-{i}',
            sku=f'SKU{i:04d}',
            price=Decimal('10.00'),
            category_id=1,
            brand_id=1
        ) for i in range(1000)
    ]
    Product.objects.bulk_create(products_to_create, batch_size=100)

    # Bulk update
    Product.objects.filter(price__lt=5).update(
        price=F('price') * Decimal('1.1')  # 10% price increase
    )

    # 6. Raw SQL when needed
    products = Product.objects.raw(
        """
        SELECT p.*,
               AVG(r.rating) as avg_rating,
               COUNT(r.id) as review_count
        FROM products p
        LEFT JOIN reviews r ON p.id = r.product_id AND r.is_approved = true
        WHERE p.is_active = true
        GROUP BY p.id
        HAVING COUNT(r.id) > 5
        ORDER BY avg_rating DESC
        """
    )

    # 7. Transactions
    def create_order_with_items(user, items_data):
        with transaction.atomic():
            # Create order
            order = Order.objects.create(
                user=user,
                subtotal=Decimal('0'),
                total_amount=Decimal('0')
            )

            total = Decimal('0')
            for item_data in items_data:
                product = Product.objects.select_for_update().get(
                    id=item_data['product_id']
                )

                # Check stock
                if product.stock_quantity < item_data['quantity']:
                    raise ValueError(f'Insufficient stock for {product.name}')

                # Create order item
                order_item = OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item_data['quantity'],
                    unit_price=product.effective_price
                )

                total += order_item.total_price

                # Update stock
                product.stock_quantity -= item_data['quantity']
                product.save()

            # Update order total
            order.subtotal = total
            order.total_amount = total
            order.save()

            return order

    # 8. Caching with ORM
    def get_featured_products():
        cache_key = 'featured_products'
        products = cache.get(cache_key)

        if products is None:
            products = list(
                Product.objects.featured()
                .with_category_and_brand()
                .with_images()[:10]
            )
            cache.set(cache_key, products, 300)  # Cache for 5 minutes

        return products

    return {
        'products_with_stats': products_with_stats,
        'recently_ordered': recently_ordered_products,
        'products_ranked': products_ranked,
        'products_with_status': products_with_status,
        'featured_products': get_featured_products()
    }
```

**Key ORM Patterns and Best Practices:**

1. **Model Design**: Use abstract base classes, proper relationships, and indexes
2. **Custom Managers/QuerySets**: Encapsulate common queries
3. **Select/Prefetch Related**: Optimize database queries
4. **Annotations**: Add computed fields to queries
5. **F() Expressions**: Database-level operations
6. **Q() Objects**: Complex query conditions
7. **Transactions**: Ensure data consistency
8. **Bulk Operations**: Efficient mass data operations
9. **Signals**: React to model events
10. **Caching**: Improve performance for expensive queries

---

## Testing and Debugging

### Q8: How do you implement comprehensive testing in Python web applications?

**Difficulty: Advanced**

**Answer:**
Comprehensive testing ensures code quality, reliability, and maintainability. Python offers excellent testing frameworks and tools for different types of testing.

**Testing Implementation with pytest and Django:**

```python
#!/usr/bin/env python3
"""
Comprehensive Testing Patterns for Python Web Applications
Examples using pytest, Django, and various testing strategies
"""

import pytest
import json
from unittest.mock import Mock, patch, MagicMock
from django.test import TestCase, TransactionTestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core import mail
from django.conf import settings
from django.db import transaction
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from decimal import Decimal
from datetime import datetime, timedelta
from django.utils import timezone
import tempfile
import os
from PIL import Image
from io import BytesIO
from typing import Dict, Any, List
import factory
from factory.django import DjangoModelFactory
import faker

# Import models (assuming they exist)
# from myapp.models import User, Product, Category, Order, OrderItem
# from myapp.serializers import ProductSerializer, OrderSerializer
# from myapp.views import ProductViewSet, OrderViewSet
# from myapp.tasks import send_order_confirmation_email
# from myapp.utils import calculate_shipping_cost

User = get_user_model()
fake = faker.Faker()


# Factory classes for test data generation
class UserFactory(DjangoModelFactory):
    """Factory for creating test users"""
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f'user{n}')
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@example.com')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    is_active = True
    is_verified = True


class CategoryFactory(DjangoModelFactory):
    """Factory for creating test categories"""
    class Meta:
        model = 'myapp.Category'  # Use string reference

    name = factory.Faker('word')
    slug = factory.LazyAttribute(lambda obj: obj.name.lower())
    description = factory.Faker('text')
    is_active = True


class BrandFactory(DjangoModelFactory):
    """Factory for creating test brands"""
    class Meta:
        model = 'myapp.Brand'

    name = factory.Faker('company')
    slug = factory.LazyAttribute(lambda obj: obj.name.lower().replace(' ', '-'))
    is_active = True


class ProductFactory(DjangoModelFactory):
    """Factory for creating test products"""
    class Meta:
        model = 'myapp.Product'

    name = factory.Faker('catch_phrase')
    slug = factory.LazyAttribute(lambda obj: obj.name.lower().replace(' ', '-'))
    description = factory.Faker('text')
    sku = factory.Sequence(lambda n: f'SKU{n:06d}')
    price = factory.Faker('pydecimal', left_digits=3, right_digits=2, positive=True)
    stock_quantity = factory.Faker('random_int', min=0, max=100)
    category = factory.SubFactory(CategoryFactory)
    brand = factory.SubFactory(BrandFactory)
    is_active = True


class OrderFactory(DjangoModelFactory):
    """Factory for creating test orders"""
    class Meta:
        model = 'myapp.Order'

    user = factory.SubFactory(UserFactory)
    status = 'pending'
    subtotal = factory.Faker('pydecimal', left_digits=3, right_digits=2, positive=True)
    total_amount = factory.LazyAttribute(lambda obj: obj.subtotal)
    billing_address = factory.LazyFunction(
        lambda: {
            'street': fake.street_address(),
            'city': fake.city(),
            'state': fake.state(),
            'zip_code': fake.zipcode(),
            'country': 'US'
        }
    )
    shipping_address = factory.LazyAttribute(lambda obj: obj.billing_address)


# Pytest fixtures
@pytest.fixture
def api_client():
    """API client fixture"""
    return APIClient()


@pytest.fixture
def authenticated_user(db):
    """Create and return an authenticated user"""
    user = UserFactory()
    user.set_password('testpass123')
    user.save()
    return user


@pytest.fixture
def authenticated_api_client(api_client, authenticated_user):
    """API client with authenticated user"""
    api_client.force_authenticate(user=authenticated_user)
    return api_client


@pytest.fixture
def sample_product(db):
    """Create a sample product for testing"""
    return ProductFactory()


@pytest.fixture
def sample_products(db):
    """Create multiple sample products"""
    return ProductFactory.create_batch(5)


@pytest.fixture
def sample_order(db, authenticated_user):
    """Create a sample order"""
    return OrderFactory(user=authenticated_user)


@pytest.fixture
def temp_image():
    """Create a temporary image file for testing"""
    image = Image.new('RGB', (100, 100), color='red')
    temp_file = tempfile.NamedTemporaryFile(suffix='.jpg', delete=False)
    image.save(temp_file.name, 'JPEG')
    yield temp_file.name
    os.unlink(temp_file.name)


# Unit Tests
class TestProductModel(TestCase):
    """Unit tests for Product model"""

    def setUp(self):
        self.category = CategoryFactory()
        self.brand = BrandFactory()
        self.product = ProductFactory(
            category=self.category,
            brand=self.brand,
            price=Decimal('99.99'),
            sale_price=Decimal('79.99')
        )

    def test_product_creation(self):
        """Test product is created correctly"""
        self.assertTrue(isinstance(self.product, Product))
        self.assertEqual(self.product.category, self.category)
        self.assertEqual(self.product.brand, self.brand)

    def test_effective_price_with_sale(self):
        """Test effective price returns sale price when available"""
        self.assertEqual(self.product.effective_price, Decimal('79.99'))

    def test_effective_price_without_sale(self):
        """Test effective price returns regular price when no sale"""
        self.product.sale_price = None
        self.product.save()
        self.assertEqual(self.product.effective_price, Decimal('99.99'))

    def test_is_low_stock(self):
        """Test low stock detection"""
        self.product.stock_quantity = 5
        self.product.low_stock_threshold = 10
        self.product.save()
        self.assertTrue(self.product.is_low_stock)

    def test_is_in_stock(self):
        """Test stock availability"""
        self.product.stock_quantity = 10
        self.product.save()
        self.assertTrue(self.product.is_in_stock)

        self.product.stock_quantity = 0
        self.product.save()
        self.assertFalse(self.product.is_in_stock)

    def test_string_representation(self):
        """Test model string representation"""
        self.assertEqual(str(self.product), self.product.name)


class TestOrderModel(TestCase):
    """Unit tests for Order model"""

    def setUp(self):
        self.user = UserFactory()
        self.order = OrderFactory(user=self.user)

    def test_order_number_generation(self):
        """Test order number is generated automatically"""
        self.assertTrue(self.order.order_number.startswith('ORD-'))
        self.assertEqual(len(self.order.order_number), 19)  # ORD-YYYYMMDD-XXXXXX

    def test_order_string_representation(self):
        """Test order string representation"""
        expected = f"Order {self.order.order_number}"
        self.assertEqual(str(self.order), expected)


# Integration Tests
@pytest.mark.django_db
class TestProductAPI:
    """Integration tests for Product API"""

    def test_list_products(self, api_client, sample_products):
        """Test listing products"""
        url = reverse('product-list')
        response = api_client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 5

    def test_retrieve_product(self, api_client, sample_product):
        """Test retrieving a single product"""
        url = reverse('product-detail', kwargs={'pk': sample_product.pk})
        response = api_client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == sample_product.pk
        assert response.data['name'] == sample_product.name

    def test_create_product_authenticated(self, authenticated_api_client):
        """Test creating a product with authentication"""
        category = CategoryFactory()
        brand = BrandFactory()

        data = {
            'name': 'Test Product',
            'slug': 'test-product',
            'description': 'Test description',
            'sku': 'TEST001',
            'price': '99.99',
            'stock_quantity': 10,
            'category': category.pk,
            'brand': brand.pk
        }

        url = reverse('product-list')
        response = authenticated_api_client.post(url, data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['name'] == 'Test Product'

    def test_create_product_unauthenticated(self, api_client):
        """Test creating a product without authentication"""
        data = {'name': 'Test Product'}
        url = reverse('product-list')
        response = api_client.post(url, data)

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_filter_products_by_category(self, api_client, sample_products):
        """Test filtering products by category"""
        category = sample_products[0].category
        url = reverse('product-list')
        response = api_client.get(url, {'category': category.slug})

        assert response.status_code == status.HTTP_200_OK
        for product in response.data['results']:
            assert product['category']['slug'] == category.slug

    def test_search_products(self, api_client, sample_products):
        """Test searching products"""
        search_term = sample_products[0].name.split()[0]
        url = reverse('product-list')
        response = api_client.get(url, {'search': search_term})

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) >= 1


@pytest.mark.django_db
class TestOrderAPI:
    """Integration tests for Order API"""

    def test_create_order(self, authenticated_api_client, authenticated_user, sample_products):
        """Test creating an order"""
        products = sample_products[:2]

        data = {
            'items': [
                {
                    'product': products[0].pk,
                    'quantity': 2
                },
                {
                    'product': products[1].pk,
                    'quantity': 1
                }
            ],
            'billing_address': {
                'street': '123 Test St',
                'city': 'Test City',
                'state': 'TS',
                'zip_code': '12345',
                'country': 'US'
            },
            'shipping_address': {
                'street': '123 Test St',
                'city': 'Test City',
                'state': 'TS',
                'zip_code': '12345',
                'country': 'US'
            }
        }

        url = reverse('order-list')
        response = authenticated_api_client.post(url, data, format='json')

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['user'] == authenticated_user.pk
        assert len(response.data['items']) == 2

    def test_list_user_orders(self, authenticated_api_client, authenticated_user):
        """Test listing user's orders"""
        # Create some orders for the user
        OrderFactory.create_batch(3, user=authenticated_user)

        url = reverse('order-list')
        response = authenticated_api_client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 3

    def test_order_status_update(self, authenticated_api_client, sample_order):
        """Test updating order status"""
        url = reverse('order-detail', kwargs={'pk': sample_order.pk})
        data = {'status': 'confirmed'}

        response = authenticated_api_client.patch(url, data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 'confirmed'


# Mock Tests
class TestExternalServices(TestCase):
    """Tests for external service integrations"""

    @patch('myapp.services.payment_gateway.charge_card')
    def test_payment_processing(self, mock_charge):
        """Test payment processing with mocked gateway"""
        # Mock successful payment
        mock_charge.return_value = {
            'success': True,
            'transaction_id': 'txn_123456',
            'amount': Decimal('99.99')
        }

        # Test payment processing logic
        from myapp.services import PaymentService

        result = PaymentService.process_payment(
            amount=Decimal('99.99'),
            card_token='card_token_123'
        )

        self.assertTrue(result['success'])
        self.assertEqual(result['transaction_id'], 'txn_123456')
        mock_charge.assert_called_once_with(
            amount=Decimal('99.99'),
            card_token='card_token_123'
        )

    @patch('myapp.services.email_service.send_email')
    def test_order_confirmation_email(self, mock_send_email):
        """Test order confirmation email sending"""
        user = UserFactory()
        order = OrderFactory(user=user)

        # Mock email service
        mock_send_email.return_value = True

        from myapp.services import EmailService

        result = EmailService.send_order_confirmation(order)

        self.assertTrue(result)
        mock_send_email.assert_called_once()

        # Verify email content
        call_args = mock_send_email.call_args
        self.assertIn(order.order_number, call_args[1]['subject'])
        self.assertEqual(call_args[1]['to_email'], user.email)


# Performance Tests
@pytest.mark.django_db
class TestPerformance:
    """Performance tests"""

    def test_product_list_query_count(self, django_assert_num_queries, api_client):
        """Test that product list doesn't have N+1 query problems"""
        ProductFactory.create_batch(10)

        url = reverse('product-list')

        # Should use select_related/prefetch_related to minimize queries
        with django_assert_num_queries(5):  # Adjust based on actual optimization
            response = api_client.get(url)
            assert response.status_code == status.HTTP_200_OK

    @pytest.mark.slow
    def test_bulk_product_creation(self, authenticated_api_client):
        """Test bulk product creation performance"""
        import time

        category = CategoryFactory()
        brand = BrandFactory()

        products_data = []
        for i in range(100):
            products_data.append({
                'name': f'Product {i}',
                'slug': f'product-{i}',
                'sku': f'SKU{i:03d}',
                'price': '10.00',
                'category': category.pk,
                'brand': brand.pk
            })

        start_time = time.time()

        url = reverse('product-bulk-create')
        response = authenticated_api_client.post(
            url,
            {'products': products_data},
            format='json'
        )

        end_time = time.time()

        assert response.status_code == status.HTTP_201_CREATED
        assert end_time - start_time < 5.0  # Should complete within 5 seconds


# Functional Tests
class TestUserWorkflow(TestCase):
    """End-to-end user workflow tests"""

    def setUp(self):
        self.client = Client()
        self.user = UserFactory()
        self.user.set_password('testpass123')
        self.user.save()

        self.products = ProductFactory.create_batch(3)

    def test_complete_purchase_workflow(self):
        """Test complete user purchase workflow"""
        # 1. User logs in
        login_response = self.client.post('/api/auth/login/', {
            'email': self.user.email,
            'password': 'testpass123'
        })
        self.assertEqual(login_response.status_code, 200)

        # 2. User adds products to cart
        for product in self.products[:2]:
            cart_response = self.client.post('/api/cart/add/', {
                'product_id': product.pk,
                'quantity': 1
            })
            self.assertEqual(cart_response.status_code, 201)

        # 3. User views cart
        cart_response = self.client.get('/api/cart/')
        self.assertEqual(cart_response.status_code, 200)
        cart_data = cart_response.json()
        self.assertEqual(len(cart_data['items']), 2)

        # 4. User creates order
        order_data = {
            'billing_address': {
                'street': '123 Test St',
                'city': 'Test City',
                'state': 'TS',
                'zip_code': '12345',
                'country': 'US'
            },
            'shipping_address': {
                'street': '123 Test St',
                'city': 'Test City',
                'state': 'TS',
                'zip_code': '12345',
                'country': 'US'
            }
        }

        order_response = self.client.post(
            '/api/orders/create-from-cart/',
            json.dumps(order_data),
            content_type='application/json'
        )
        self.assertEqual(order_response.status_code, 201)

        # 5. Verify order was created
        order_data = order_response.json()
        self.assertTrue(order_data['order_number'])
        self.assertEqual(order_data['status'], 'pending')

        # 6. Verify cart is empty
        cart_response = self.client.get('/api/cart/')
        cart_data = cart_response.json()
        self.assertEqual(len(cart_data['items']), 0)


# Test Configuration
pytest_plugins = [
    'pytest_django',
    'pytest_mock',
    'pytest_cov',
]

# pytest.ini configuration
PYTEST_CONFIG = """
[tool:pytest]
DJANGO_SETTINGS_MODULE = myproject.settings.test
addopts =
    --verbose
    --tb=short
    --strict-markers
    --disable-warnings
    --cov=myapp
    --cov-report=html
    --cov-report=term-missing
    --cov-fail-under=80

markers =
    slow: marks tests as slow (deselect with '-m "not slow"')
    integration: marks tests as integration tests
    unit: marks tests as unit tests
    api: marks tests as API tests

testpaths = tests
python_files = test_*.py *_test.py
python_classes = Test*
python_functions = test_*
"""

# Coverage configuration
COVERAGE_CONFIG = """
# .coveragerc
[run]
source = .
omit =
    */venv/*
    */migrations/*
    */settings/*
    */tests/*
    manage.py
    */wsgi.py
    */asgi.py

[report]
exclude_lines =
    pragma: no cover
    def __repr__
    raise AssertionError
    raise NotImplementedError
    if __name__ == .__main__.:
    class .*\(Protocol\):
    @(abc\.)?abstractmethod

[html]
directory = htmlcov
"""

if __name__ == '__main__':
    # Run tests
    import subprocess
    import sys

    # Run pytest with coverage
    result = subprocess.run([
        sys.executable, '-m', 'pytest',
        '--cov=myapp',
        '--cov-report=html',
        '--cov-report=term-missing',
        '-v'
    ])

    sys.exit(result.returncode)
```

**Testing Best Practices:**

1. **Test Pyramid**: More unit tests, fewer integration tests, minimal E2E tests
2. **Factory Pattern**: Use factories for consistent test data
3. **Fixtures**: Reusable test setup and teardown
4. **Mocking**: Isolate units under test from external dependencies
5. **Coverage**: Aim for high code coverage (80%+)
6. **Performance Testing**: Test query counts and response times
7. **Functional Testing**: Test complete user workflows
8. **Continuous Integration**: Automated testing in CI/CD pipeline

---

## Performance and Optimization

### Q9: Explain Python web security best practices and common vulnerabilities.

**Difficulty: Advanced**

**Answer:**
Web security is crucial for protecting applications and user data. Python web applications face various security threats that must be addressed through proper implementation and best practices.

**Common Security Vulnerabilities and Mitigation:**

```python
#!/usr/bin/env python3
"""
Python Web Security Best Practices
Comprehensive security implementation examples
"""

import hashlib
import secrets
import hmac
import jwt
from datetime import datetime, timedelta
from django.contrib.auth.hashers import make_password, check_password
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.html import escape
from django.utils.safestring import mark_safe
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os
import re
from typing import Dict, Any, Optional, List
import logging
from functools import wraps
import time
from collections import defaultdict
from django.core.cache import cache
from django.http import HttpResponseForbidden
import bleach
from urllib.parse import urlparse

# Configure security logging
security_logger = logging.getLogger('security')


class SecurityConfig:
    """Security configuration constants"""

    # Password requirements
    MIN_PASSWORD_LENGTH = 12
    REQUIRE_UPPERCASE = True
    REQUIRE_LOWERCASE = True
    REQUIRE_DIGITS = True
    REQUIRE_SPECIAL_CHARS = True

    # Session security
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Strict'
    SESSION_EXPIRE_SECONDS = 3600  # 1 hour

    # CSRF protection
    CSRF_COOKIE_SECURE = True
    CSRF_COOKIE_HTTPONLY = True
    CSRF_COOKIE_SAMESITE = 'Strict'

    # Rate limiting
    MAX_LOGIN_ATTEMPTS = 5
    LOCKOUT_DURATION = 900  # 15 minutes

    # Content Security Policy
    CSP_DEFAULT_SRC = "'self'"
    CSP_SCRIPT_SRC = "'self' 'unsafe-inline'"
    CSP_STYLE_SRC = "'self' 'unsafe-inline'"
    CSP_IMG_SRC = "'self' data: https:"


class PasswordValidator:
    """Comprehensive password validation"""

    @staticmethod
    def validate_password(password: str) -> Dict[str, Any]:
        """Validate password strength"""
        errors = []

        if len(password) < SecurityConfig.MIN_PASSWORD_LENGTH:
            errors.append(f'Password must be at least {SecurityConfig.MIN_PASSWORD_LENGTH} characters long')

        if SecurityConfig.REQUIRE_UPPERCASE and not re.search(r'[A-Z]', password):
            errors.append('Password must contain at least one uppercase letter')

        if SecurityConfig.REQUIRE_LOWERCASE and not re.search(r'[a-z]', password):
            errors.append('Password must contain at least one lowercase letter')

        if SecurityConfig.REQUIRE_DIGITS and not re.search(r'\d', password):
            errors.append('Password must contain at least one digit')

        if SecurityConfig.REQUIRE_SPECIAL_CHARS and not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            errors.append('Password must contain at least one special character')

        # Check for common patterns
        common_patterns = [
            r'(.)\1{2,}',  # Repeated characters
            r'123456',     # Sequential numbers
            r'abcdef',     # Sequential letters
            r'qwerty',     # Keyboard patterns
        ]

        for pattern in common_patterns:
            if re.search(pattern, password.lower()):
                errors.append('Password contains common patterns')
                break

        return {
            'is_valid': len(errors) == 0,
            'errors': errors,
            'strength': PasswordValidator._calculate_strength(password)
        }

    @staticmethod
    def _calculate_strength(password: str) -> str:
        """Calculate password strength score"""
        score = 0

        # Length bonus
        score += min(len(password) * 2, 20)

        # Character variety bonus
        if re.search(r'[a-z]', password):
            score += 5
        if re.search(r'[A-Z]', password):
            score += 5
        if re.search(r'\d', password):
            score += 5
        if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            score += 10

        # Unique characters bonus
        unique_chars = len(set(password))
        score += unique_chars * 2

        if score >= 80:
            return 'Very Strong'
        elif score >= 60:
            return 'Strong'
        elif score >= 40:
            return 'Medium'
        elif score >= 20:
            return 'Weak'
        else:
            return 'Very Weak'


class SecurePasswordHasher:
    """Secure password hashing with salt"""

    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password with secure salt"""
        # Generate random salt
        salt = secrets.token_hex(32)

        # Use PBKDF2 with SHA-256
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt.encode(),
            iterations=100000,  # OWASP recommended minimum
        )

        key = base64.urlsafe_b64encode(kdf.derive(password.encode()))

        return f"{salt}${key.decode()}"

    @staticmethod
    def verify_password(password: str, hashed: str) -> bool:
        """Verify password against hash"""
        try:
            salt, key = hashed.split('$')

            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt.encode(),
                iterations=100000,
            )

            expected_key = base64.urlsafe_b64encode(kdf.derive(password.encode()))

            return hmac.compare_digest(key.encode(), expected_key)
        except Exception:
            return False


class RateLimiter:
    """Rate limiting for API endpoints"""

    def __init__(self, max_attempts: int = 10, window_seconds: int = 60):
        self.max_attempts = max_attempts
        self.window_seconds = window_seconds

    def is_allowed(self, identifier: str) -> bool:
        """Check if request is allowed"""
        cache_key = f"rate_limit:{identifier}"
        current_time = int(time.time())
        window_start = current_time - self.window_seconds

        # Get current attempts
        attempts = cache.get(cache_key, [])

        # Filter attempts within window
        attempts = [attempt for attempt in attempts if attempt > window_start]

        if len(attempts) >= self.max_attempts:
            return False

        # Add current attempt
        attempts.append(current_time)
        cache.set(cache_key, attempts, self.window_seconds)

        return True

    def get_remaining_attempts(self, identifier: str) -> int:
        """Get remaining attempts for identifier"""
        cache_key = f"rate_limit:{identifier}"
        current_time = int(time.time())
        window_start = current_time - self.window_seconds

        attempts = cache.get(cache_key, [])
        attempts = [attempt for attempt in attempts if attempt > window_start]

        return max(0, self.max_attempts - len(attempts))


def rate_limit(max_attempts: int = 10, window_seconds: int = 60):
    """Rate limiting decorator"""
    def decorator(func):
        limiter = RateLimiter(max_attempts, window_seconds)

        @wraps(func)
        def wrapper(request, *args, **kwargs):
            # Use IP address as identifier
            identifier = request.META.get('REMOTE_ADDR', 'unknown')

            if not limiter.is_allowed(identifier):
                security_logger.warning(
                    f"Rate limit exceeded for {identifier} on {request.path}"
                )
                return HttpResponseForbidden('Rate limit exceeded')

            return func(request, *args, **kwargs)

        return wrapper
    return decorator


class InputSanitizer:
    """Input sanitization and validation"""

    @staticmethod
    def sanitize_html(content: str, allowed_tags: List[str] = None) -> str:
        """Sanitize HTML content"""
        if allowed_tags is None:
            allowed_tags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li']

        allowed_attributes = {
            'a': ['href', 'title'],
            'img': ['src', 'alt', 'width', 'height'],
        }

        return bleach.clean(
            content,
            tags=allowed_tags,
            attributes=allowed_attributes,
            strip=True
        )

    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

    @staticmethod
    def validate_url(url: str, allowed_schemes: List[str] = None) -> bool:
        """Validate URL format and scheme"""
        if allowed_schemes is None:
            allowed_schemes = ['http', 'https']

        try:
            parsed = urlparse(url)
            return parsed.scheme in allowed_schemes and parsed.netloc
        except Exception:
            return False

    @staticmethod
    def sanitize_filename(filename: str) -> str:
        """Sanitize filename for safe storage"""
        # Remove path separators and dangerous characters
        filename = re.sub(r'[<>:"/\\|?*]', '', filename)

        # Remove leading/trailing dots and spaces
        filename = filename.strip('. ')

        # Limit length
        if len(filename) > 255:
            name, ext = os.path.splitext(filename)
            filename = name[:255-len(ext)] + ext

        return filename or 'unnamed'


class CSRFProtection:
    """Enhanced CSRF protection"""

    @staticmethod
    def generate_token(session_key: str) -> str:
        """Generate CSRF token"""
        secret = secrets.token_urlsafe(32)
        timestamp = str(int(time.time()))

        # Create token with timestamp
        token_data = f"{secret}:{timestamp}"

        # Sign with session key
        signature = hmac.new(
            session_key.encode(),
            token_data.encode(),
            hashlib.sha256
        ).hexdigest()

        return f"{token_data}:{signature}"

    @staticmethod
    def validate_token(token: str, session_key: str, max_age: int = 3600) -> bool:
        """Validate CSRF token"""
        try:
            parts = token.split(':')
            if len(parts) != 3:
                return False

            secret, timestamp, signature = parts
            token_data = f"{secret}:{timestamp}"

            # Verify signature
            expected_signature = hmac.new(
                session_key.encode(),
                token_data.encode(),
                hashlib.sha256
            ).hexdigest()

            if not hmac.compare_digest(signature, expected_signature):
                return False

            # Check timestamp
            token_time = int(timestamp)
            current_time = int(time.time())

            return current_time - token_time <= max_age

        except Exception:
            return False


class SecureFileUpload:
    """Secure file upload handling"""

    ALLOWED_EXTENSIONS = {
        'image': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
        'document': ['.pdf', '.doc', '.docx', '.txt'],
        'archive': ['.zip', '.tar', '.gz']
    }

    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

    @classmethod
    def validate_file(cls, file, file_type: str = 'image') -> Dict[str, Any]:
        """Validate uploaded file"""
        errors = []

        # Check file size
        if file.size > cls.MAX_FILE_SIZE:
            errors.append(f'File size exceeds {cls.MAX_FILE_SIZE // (1024*1024)}MB limit')

        # Check file extension
        filename = file.name.lower()
        allowed_extensions = cls.ALLOWED_EXTENSIONS.get(file_type, [])

        if not any(filename.endswith(ext) for ext in allowed_extensions):
            errors.append(f'File type not allowed. Allowed: {allowed_extensions}')

        # Check file content (magic bytes)
        if file_type == 'image':
            file.seek(0)
            header = file.read(10)
            file.seek(0)

            image_signatures = {
                b'\xff\xd8\xff': 'JPEG',
                b'\x89PNG\r\n\x1a\n': 'PNG',
                b'GIF87a': 'GIF',
                b'GIF89a': 'GIF',
            }

            is_valid_image = any(
                header.startswith(sig) for sig in image_signatures.keys()
            )

            if not is_valid_image:
                errors.append('File content does not match image format')

        return {
            'is_valid': len(errors) == 0,
            'errors': errors,
            'safe_filename': InputSanitizer.sanitize_filename(file.name)
        }


class SecurityHeaders:
    """Security headers middleware"""

    @staticmethod
    def add_security_headers(response):
        """Add security headers to response"""
        # Prevent clickjacking
        response['X-Frame-Options'] = 'DENY'

        # Prevent MIME type sniffing
        response['X-Content-Type-Options'] = 'nosniff'

        # XSS protection
        response['X-XSS-Protection'] = '1; mode=block'

        # Strict Transport Security
        response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'

        # Content Security Policy
        csp = (
            f"default-src {SecurityConfig.CSP_DEFAULT_SRC}; "
            f"script-src {SecurityConfig.CSP_SCRIPT_SRC}; "
            f"style-src {SecurityConfig.CSP_STYLE_SRC}; "
            f"img-src {SecurityConfig.CSP_IMG_SRC};"
        )
        response['Content-Security-Policy'] = csp

        # Referrer Policy
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        # Permissions Policy
        response['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'

        return response


class SQLInjectionPrevention:
    """SQL injection prevention examples"""

    @staticmethod
    def safe_query_example():
        """Example of safe database queries"""
        from django.db import connection

        # BAD: String concatenation (vulnerable to SQL injection)
        # user_id = request.GET.get('user_id')
        # query = f"SELECT * FROM users WHERE id = {user_id}"  # NEVER DO THIS

        # GOOD: Parameterized queries
        user_id = 123
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM users WHERE id = %s AND is_active = %s",
                [user_id, True]
            )
            results = cursor.fetchall()

        # BETTER: Use Django ORM (automatically parameterized)
        from django.contrib.auth.models import User
        user = User.objects.filter(id=user_id, is_active=True).first()

        return user


class SessionSecurity:
    """Secure session management"""

    @staticmethod
    def create_secure_session(request, user):
        """Create secure session for user"""
        # Regenerate session ID to prevent session fixation
        request.session.cycle_key()

        # Set session data
        request.session['user_id'] = user.id
        request.session['login_time'] = int(time.time())
        request.session['ip_address'] = request.META.get('REMOTE_ADDR')

        # Set session expiry
        request.session.set_expiry(SecurityConfig.SESSION_EXPIRE_SECONDS)

        # Log successful login
        security_logger.info(
            f"User {user.username} logged in from {request.META.get('REMOTE_ADDR')}"
        )

    @staticmethod
    def validate_session(request):
        """Validate session security"""
        if not request.session.get('user_id'):
            return False

        # Check session age
        login_time = request.session.get('login_time', 0)
        current_time = int(time.time())

        if current_time - login_time > SecurityConfig.SESSION_EXPIRE_SECONDS:
            request.session.flush()
            return False

        # Check IP address consistency (optional)
        session_ip = request.session.get('ip_address')
        current_ip = request.META.get('REMOTE_ADDR')

        if session_ip and session_ip != current_ip:
            security_logger.warning(
                f"IP address mismatch for user {request.session.get('user_id')}: "
                f"session={session_ip}, current={current_ip}"
            )
            # Optionally invalidate session
            # request.session.flush()
            # return False

        return True


# Security middleware example
class SecurityMiddleware:
    """Custom security middleware"""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Pre-process request
        self.process_request(request)

        response = self.get_response(request)

        # Post-process response
        response = SecurityHeaders.add_security_headers(response)

        return response

    def process_request(self, request):
        """Process incoming request for security"""
        # Log suspicious requests
        if self.is_suspicious_request(request):
            security_logger.warning(
                f"Suspicious request from {request.META.get('REMOTE_ADDR')}: "
                f"{request.method} {request.path}"
            )

        # Validate session
        if request.user.is_authenticated:
            if not SessionSecurity.validate_session(request):
                # Redirect to login
                pass

    def is_suspicious_request(self, request) -> bool:
        """Detect suspicious request patterns"""
        suspicious_patterns = [
            r'<script',
            r'javascript:',
            r'union.*select',
            r'drop.*table',
            r'../../../',
        ]

        query_string = request.META.get('QUERY_STRING', '').lower()
        path = request.path.lower()

        for pattern in suspicious_patterns:
            if re.search(pattern, query_string) or re.search(pattern, path):
                return True

        return False


# Usage examples
def secure_login_view(request):
    """Example of secure login implementation"""
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')

        # Rate limiting
        limiter = RateLimiter(max_attempts=5, window_seconds=300)
        if not limiter.is_allowed(f"login:{username}"):
            return HttpResponseForbidden('Too many login attempts')

        # Input validation
        if not username or not password:
            return JsonResponse({'error': 'Username and password required'})

        # Authenticate user
        try:
            user = User.objects.get(username=username, is_active=True)
            if SecurePasswordHasher.verify_password(password, user.password):
                # Create secure session
                SessionSecurity.create_secure_session(request, user)
                return JsonResponse({'success': True})
            else:
                security_logger.warning(f"Failed login attempt for {username}")
                return JsonResponse({'error': 'Invalid credentials'})

        except User.DoesNotExist:
            security_logger.warning(f"Login attempt for non-existent user: {username}")
            return JsonResponse({'error': 'Invalid credentials'})

    return JsonResponse({'error': 'Method not allowed'})


if __name__ == '__main__':
    # Example usage

    # Password validation
    password = "MySecureP@ssw0rd123!"
    validation_result = PasswordValidator.validate_password(password)
    print(f"Password validation: {validation_result}")

    # Password hashing
    hashed = SecurePasswordHasher.hash_password(password)
    is_valid = SecurePasswordHasher.verify_password(password, hashed)
    print(f"Password verification: {is_valid}")

    # Input sanitization
    html_content = "<script>alert('xss')</script><p>Safe content</p>"
    sanitized = InputSanitizer.sanitize_html(html_content)
    print(f"Sanitized HTML: {sanitized}")
```

**Security Best Practices:**

1. **Input Validation**: Validate and sanitize all user inputs
2. **Authentication**: Use strong password policies and secure hashing
3. **Authorization**: Implement proper access controls
4. **Session Management**: Secure session handling and expiration
5. **CSRF Protection**: Implement CSRF tokens for state-changing operations
6. **SQL Injection Prevention**: Use parameterized queries
7. **XSS Prevention**: Escape output and use Content Security Policy
8. **Security Headers**: Implement comprehensive security headers
9. **Rate Limiting**: Prevent abuse and brute force attacks
10. **Logging**: Monitor and log security events

---

### Q10: How do you implement caching strategies in Python web applications?

**Difficulty: Medium**

**Answer:**
Caching is essential for improving web application performance by storing frequently accessed data in fast storage layers. Python offers various caching strategies and tools.

**Comprehensive Caching Implementation:**

```python
#!/usr/bin/env python3
"""
Python Web Application Caching Strategies
Comprehensive examples of different caching approaches
"""

import redis
import memcache
from django.core.cache import cache
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.cache import cache_page, cache_control
from django.views.decorators.vary import vary_on_headers
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from functools import wraps, lru_cache
import hashlib
import json
import time
from typing import Any, Dict, List, Optional, Callable
from datetime import datetime, timedelta
import pickle
import threading
from collections import OrderedDict
import weakref
from dataclasses import dataclass
from enum import Enum
import logging

logger = logging.getLogger(__name__)


class CacheStrategy(Enum):
    """Cache strategy types"""
    LRU = "lru"
    LFU = "lfu"
    FIFO = "fifo"
    TTL = "ttl"


@dataclass
class CacheConfig:
    """Cache configuration"""
    default_timeout: int = 300  # 5 minutes
    max_entries: int = 1000
    strategy: CacheStrategy = CacheStrategy.LRU
    key_prefix: str = "app"
    version: int = 1


class InMemoryCache:
    """Thread-safe in-memory cache implementation"""

    def __init__(self, max_size: int = 1000, default_timeout: int = 300):
        self.max_size = max_size
        self.default_timeout = default_timeout
        self._cache = OrderedDict()
        self._lock = threading.RLock()

    def get(self, key: str, default=None):
        """Get value from cache"""
        with self._lock:
            if key not in self._cache:
                return default

            value, expiry = self._cache[key]

            # Check expiry
            if expiry and time.time() > expiry:
                del self._cache[key]
                return default

            # Move to end (LRU)
            self._cache.move_to_end(key)
            return value

    def set(self, key: str, value: Any, timeout: Optional[int] = None):
        """Set value in cache"""
        with self._lock:
            if timeout is None:
                timeout = self.default_timeout

            expiry = time.time() + timeout if timeout > 0 else None

            # Remove oldest entries if at capacity
            while len(self._cache) >= self.max_size:
                self._cache.popitem(last=False)

            self._cache[key] = (value, expiry)
            self._cache.move_to_end(key)

    def delete(self, key: str):
        """Delete key from cache"""
        with self._lock:
            self._cache.pop(key, None)

    def clear(self):
        """Clear all cache entries"""
        with self._lock:
            self._cache.clear()

    def keys(self):
        """Get all cache keys"""
        with self._lock:
            return list(self._cache.keys())


class RedisCache:
    """Redis-based cache implementation"""

    def __init__(self, host='localhost', port=6379, db=0, password=None):
        self.redis_client = redis.Redis(
            host=host,
            port=port,
            db=db,
            password=password,
            decode_responses=True
        )

    def get(self, key: str, default=None):
        """Get value from Redis cache"""
        try:
            value = self.redis_client.get(key)
            if value is None:
                return default
            return json.loads(value)
        except Exception as e:
            logger.error(f"Redis get error: {e}")
            return default

    def set(self, key: str, value: Any, timeout: int = 300):
        """Set value in Redis cache"""
        try:
            serialized_value = json.dumps(value, default=str)
            self.redis_client.setex(key, timeout, serialized_value)
        except Exception as e:
            logger.error(f"Redis set error: {e}")

    def delete(self, key: str):
        """Delete key from Redis cache"""
        try:
            self.redis_client.delete(key)
        except Exception as e:
            logger.error(f"Redis delete error: {e}")

    def clear_pattern(self, pattern: str):
        """Clear keys matching pattern"""
        try:
            keys = self.redis_client.keys(pattern)
            if keys:
                self.redis_client.delete(*keys)
        except Exception as e:
            logger.error(f"Redis clear pattern error: {e}")

    def increment(self, key: str, amount: int = 1) -> int:
        """Increment counter"""
        try:
            return self.redis_client.incr(key, amount)
        except Exception as e:
            logger.error(f"Redis increment error: {e}")
            return 0

    def expire(self, key: str, timeout: int):
        """Set expiration for key"""
        try:
            self.redis_client.expire(key, timeout)
        except Exception as e:
            logger.error(f"Redis expire error: {e}")


class CacheManager:
    """Unified cache manager supporting multiple backends"""

    def __init__(self, config: CacheConfig):
        self.config = config
        self.backends = {
            'memory': InMemoryCache(),
            'redis': RedisCache(),
        }
        self.default_backend = 'memory'

    def _make_key(self, key: str, version: Optional[int] = None) -> str:
        """Generate cache key with prefix and version"""
        if version is None:
            version = self.config.version

        return f"{self.config.key_prefix}:{version}:{key}"

    def get(self, key: str, default=None, backend: str = None):
        """Get value from cache"""
        backend = backend or self.default_backend
        cache_backend = self.backends.get(backend)

        if not cache_backend:
            return default

        cache_key = self._make_key(key)
        return cache_backend.get(cache_key, default)

    def set(self, key: str, value: Any, timeout: Optional[int] = None, backend: str = None):
        """Set value in cache"""
        backend = backend or self.default_backend
        cache_backend = self.backends.get(backend)

        if not cache_backend:
            return

        if timeout is None:
            timeout = self.config.default_timeout

        cache_key = self._make_key(key)
        cache_backend.set(cache_key, value, timeout)

    def delete(self, key: str, backend: str = None):
        """Delete key from cache"""
        backend = backend or self.default_backend
        cache_backend = self.backends.get(backend)

        if cache_backend:
            cache_key = self._make_key(key)
            cache_backend.delete(cache_key)

    def get_or_set(self, key: str, callable_func: Callable, timeout: Optional[int] = None, backend: str = None):
        """Get value from cache or set it using callable"""
        value = self.get(key, backend=backend)

        if value is None:
            value = callable_func()
            self.set(key, value, timeout, backend)

        return value


# Cache decorators
def cached(timeout: int = 300, key_func: Optional[Callable] = None, backend: str = 'memory'):
    """Function caching decorator"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Generate cache key
            if key_func:
                cache_key = key_func(*args, **kwargs)
            else:
                # Default key generation
                key_parts = [func.__name__]
                key_parts.extend(str(arg) for arg in args)
                key_parts.extend(f"{k}={v}" for k, v in sorted(kwargs.items()))
                cache_key = hashlib.md5(':'.join(key_parts).encode()).hexdigest()

            # Try to get from cache
            cache_manager = CacheManager(CacheConfig())
            result = cache_manager.get(cache_key, backend=backend)

            if result is None:
                # Execute function and cache result
                result = func(*args, **kwargs)
                cache_manager.set(cache_key, result, timeout, backend)

            return result

        return wrapper
    return decorator


def cache_result(timeout: int = 300, vary_on: List[str] = None):
    """Method result caching decorator"""
    def decorator(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            # Generate cache key based on class, method, and parameters
            key_parts = [
                self.__class__.__name__,
                func.__name__,
                str(hash(args)),
                str(hash(tuple(sorted(kwargs.items()))))
            ]

            # Add vary_on fields
            if vary_on:
                for field in vary_on:
                    if hasattr(self, field):
                        key_parts.append(f"{field}={getattr(self, field)}")

            cache_key = hashlib.md5(':'.join(key_parts).encode()).hexdigest()

            # Check cache
            result = cache.get(cache_key)
            if result is None:
                result = func(self, *args, **kwargs)
                cache.set(cache_key, result, timeout)

            return result

        return wrapper
    return decorator


class QueryCache:
    """Database query result caching"""

    def __init__(self, cache_manager: CacheManager):
        self.cache_manager = cache_manager

    def cache_queryset(self, queryset, timeout: int = 300, key_suffix: str = ""):
        """Cache Django queryset results"""
        # Generate cache key from query
        query_hash = hashlib.md5(str(queryset.query).encode()).hexdigest()
        cache_key = f"queryset:{query_hash}:{key_suffix}"

        # Try to get from cache
        cached_result = self.cache_manager.get(cache_key)

        if cached_result is None:
            # Execute query and cache results
            results = list(queryset)
            self.cache_manager.set(cache_key, results, timeout)
            return results

        return cached_result

    def invalidate_model_cache(self, model_class):
        """Invalidate cache for specific model"""
        pattern = f"*{model_class.__name__.lower()}*"
        if hasattr(self.cache_manager.backends['redis'], 'clear_pattern'):
            self.cache_manager.backends['redis'].clear_pattern(pattern)


class ViewCache:
    """View-level caching utilities"""

    @staticmethod
    def cache_view_response(timeout: int = 300, vary_on_headers: List[str] = None):
        """Cache entire view response"""
        def decorator(view_func):
            @cache_page(timeout)
            @vary_on_headers(*(vary_on_headers or []))
            @wraps(view_func)
            def wrapper(*args, **kwargs):
                return view_func(*args, **kwargs)
            return wrapper
        return decorator

    @staticmethod
    def cache_api_response(timeout: int = 300, key_func: Optional[Callable] = None):
        """Cache API response with custom key generation"""
        def decorator(view_func):
            @wraps(view_func)
            def wrapper(request, *args, **kwargs):
                # Generate cache key
                if key_func:
                    cache_key = key_func(request, *args, **kwargs)
                else:
                    key_parts = [
                        request.path,
                        request.method,
                        str(sorted(request.GET.items())),
                        str(getattr(request.user, 'id', 'anonymous'))
                    ]
                    cache_key = hashlib.md5(':'.join(key_parts).encode()).hexdigest()

                # Try cache first
                cached_response = cache.get(cache_key)
                if cached_response:
                    return JsonResponse(cached_response)

                # Execute view and cache response
                response = view_func(request, *args, **kwargs)

                if hasattr(response, 'data'):
                    cache.set(cache_key, response.data, timeout)

                return response

            return wrapper
        return decorator


class CacheWarming:
    """Cache warming utilities"""

    def __init__(self, cache_manager: CacheManager):
        self.cache_manager = cache_manager

    def warm_popular_content(self):
        """Pre-populate cache with popular content"""
        # Example: Cache popular products
        from myapp.models import Product

        popular_products = Product.objects.filter(
            is_active=True
        ).order_by('-view_count')[:100]

        for product in popular_products:
            cache_key = f"product:{product.id}"
            product_data = {
                'id': product.id,
                'name': product.name,
                'price': str(product.price),
                'description': product.description
            }
            self.cache_manager.set(cache_key, product_data, timeout=3600)

    def warm_user_specific_cache(self, user_id: int):
        """Pre-populate user-specific cache"""
        # Example: Cache user's recent orders
        from myapp.models import Order

        recent_orders = Order.objects.filter(
            user_id=user_id
        ).order_by('-created_at')[:10]

        cache_key = f"user_orders:{user_id}"
        orders_data = [
            {
                'id': order.id,
                'total': str(order.total_amount),
                'status': order.status,
                'created_at': order.created_at.isoformat()
            }
            for order in recent_orders
        ]

        self.cache_manager.set(cache_key, orders_data, timeout=1800)


class CacheInvalidation:
    """Cache invalidation strategies"""

    def __init__(self, cache_manager: CacheManager):
        self.cache_manager = cache_manager

    def invalidate_on_model_save(self, sender, instance, **kwargs):
        """Signal handler for model save"""
        model_name = sender.__name__.lower()

        # Invalidate specific instance cache
        instance_key = f"{model_name}:{instance.id}"
        self.cache_manager.delete(instance_key)

        # Invalidate related list caches
        list_key = f"{model_name}_list"
        self.cache_manager.delete(list_key)

    def invalidate_user_cache(self, user_id: int):
        """Invalidate all user-related cache"""
        patterns = [
            f"user:{user_id}:*",
            f"user_orders:{user_id}",
            f"user_profile:{user_id}",
            f"user_cart:{user_id}"
        ]

        for pattern in patterns:
            if hasattr(self.cache_manager.backends['redis'], 'clear_pattern'):
                self.cache_manager.backends['redis'].clear_pattern(pattern)


# Usage examples
class ProductService:
    """Example service with caching"""

    def __init__(self):
        self.cache_manager = CacheManager(CacheConfig())
        self.query_cache = QueryCache(self.cache_manager)

    @cached(timeout=600, backend='redis')
    def get_featured_products(self):
        """Get featured products with caching"""
        from myapp.models import Product

        return list(
            Product.objects.filter(
                is_featured=True,
                is_active=True
            ).values('id', 'name', 'price')[:10]
        )

    @cache_result(timeout=300, vary_on=['user_id'])
    def get_user_recommendations(self, user_id: int):
        """Get user recommendations with caching"""
        # Complex recommendation logic here
        recommendations = self._calculate_recommendations(user_id)
        return recommendations

    def _calculate_recommendations(self, user_id: int):
        """Calculate user recommendations (expensive operation)"""
        # Simulate expensive calculation
        time.sleep(0.1)
        return [{'id': i, 'score': i * 0.1} for i in range(1, 11)]

    def get_product_details(self, product_id: int):
        """Get product details with multi-level caching"""
        cache_key = f"product_details:{product_id}"

        # Try L1 cache (memory)
        result = self.cache_manager.get(cache_key, backend='memory')
        if result:
            return result

        # Try L2 cache (Redis)
        result = self.cache_manager.get(cache_key, backend='redis')
        if result:
            # Populate L1 cache
            self.cache_manager.set(cache_key, result, timeout=60, backend='memory')
            return result

        # Fetch from database
        from myapp.models import Product
        try:
            product = Product.objects.get(id=product_id)
            result = {
                'id': product.id,
                'name': product.name,
                'price': str(product.price),
                'description': product.description
            }

            # Cache in both levels
            self.cache_manager.set(cache_key, result, timeout=60, backend='memory')
            self.cache_manager.set(cache_key, result, timeout=3600, backend='redis')

            return result

        except Product.DoesNotExist:
            return None


if __name__ == '__main__':
    # Example usage

    # Initialize cache manager
    config = CacheConfig(default_timeout=600, max_entries=1000)
    cache_manager = CacheManager(config)

    # Basic caching
    cache_manager.set('test_key', {'data': 'test_value'}, timeout=300)
    result = cache_manager.get('test_key')
    print(f"Cached result: {result}")

    # Function caching
    @cached(timeout=300)
    def expensive_function(x, y):
        time.sleep(1)  # Simulate expensive operation
        return x * y + 42

    # First call - will be slow
    start_time = time.time()
    result1 = expensive_function(10, 20)
    print(f"First call took {time.time() - start_time:.2f}s: {result1}")

    # Second call - will be fast (cached)
    start_time = time.time()
    result2 = expensive_function(10, 20)
    print(f"Second call took {time.time() - start_time:.2f}s: {result2}")
```

**Caching Best Practices:**

1. **Cache Hierarchy**: Use multiple cache levels (L1: memory, L2: Redis)
2. **Cache Keys**: Use consistent, descriptive key naming conventions
3. **TTL Strategy**: Set appropriate expiration times based on data volatility
4. **Cache Invalidation**: Implement proper invalidation strategies
5. **Cache Warming**: Pre-populate cache with frequently accessed data
6. **Monitoring**: Track cache hit rates and performance metrics
7. **Fallback**: Always have fallback mechanisms when cache fails
8. **Security**: Don't cache sensitive data without encryption

---

### Q11: Explain Python's Global Interpreter Lock (GIL) and its impact on web applications.

**Difficulty: Advanced**

**Answer:**
The Global Interpreter Lock (GIL) is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes simultaneously. Understanding the GIL is crucial for optimizing Python web application performance.

**GIL Impact and Workarounds:**

```python
#!/usr/bin/env python3
"""
Python GIL Understanding and Optimization Strategies
Comprehensive examples for handling GIL limitations
"""

import threading
import multiprocessing
import asyncio
import concurrent.futures
import time
import queue
from typing import List, Callable, Any
import os
import sys
from functools import wraps
import psutil
from dataclasses import dataclass
from enum import Enum
import logging
from contextlib import contextmanager
import signal
from multiprocessing import Pool, Process, Queue, Manager
from threading import Thread, Lock, RLock, Semaphore
from queue import Queue as ThreadQueue
import requests
import json
from datetime import datetime

logger = logging.getLogger(__name__)


class TaskType(Enum):
    """Task type classification"""
    CPU_BOUND = "cpu_bound"
    IO_BOUND = "io_bound"
    MIXED = "mixed"


@dataclass
class PerformanceMetrics:
    """Performance measurement data"""
    execution_time: float
    cpu_usage: float
    memory_usage: float
    thread_count: int
    process_count: int


class GILDemonstration:
    """Demonstrate GIL behavior and limitations"""

    @staticmethod
    def cpu_bound_task(n: int) -> int:
        """CPU-intensive task that's affected by GIL"""
        total = 0
        for i in range(n):
            total += i ** 2
        return total

    @staticmethod
    def io_bound_task(url: str, timeout: int = 5) -> dict:
        """I/O-bound task that releases GIL"""
        try:
            response = requests.get(url, timeout=timeout)
            return {
                'url': url,
                'status_code': response.status_code,
                'response_time': response.elapsed.total_seconds(),
                'content_length': len(response.content)
            }
        except Exception as e:
            return {
                'url': url,
                'error': str(e),
                'status_code': None
            }

    @staticmethod
    def measure_performance(func: Callable, *args, **kwargs) -> PerformanceMetrics:
        """Measure function performance"""
        process = psutil.Process()

        # Initial measurements
        start_time = time.time()
        start_cpu = process.cpu_percent()
        start_memory = process.memory_info().rss / 1024 / 1024  # MB
        start_threads = process.num_threads()

        # Execute function
        result = func(*args, **kwargs)

        # Final measurements
        end_time = time.time()
        end_cpu = process.cpu_percent()
        end_memory = process.memory_info().rss / 1024 / 1024  # MB
        end_threads = process.num_threads()

        return PerformanceMetrics(
            execution_time=end_time - start_time,
            cpu_usage=max(end_cpu - start_cpu, 0),
            memory_usage=end_memory - start_memory,
            thread_count=end_threads - start_threads,
            process_count=1
        )

    def compare_threading_vs_multiprocessing(self, task_count: int = 4, iterations: int = 1000000):
        """Compare threading vs multiprocessing for CPU-bound tasks"""
        print("=== GIL Impact Comparison ===")

        # Sequential execution
        print("\n1. Sequential Execution:")
        start_time = time.time()
        results_sequential = []
        for _ in range(task_count):
            result = self.cpu_bound_task(iterations)
            results_sequential.append(result)
        sequential_time = time.time() - start_time
        print(f"   Time: {sequential_time:.2f}s")

        # Threading (affected by GIL)
        print("\n2. Threading (GIL Limited):")
        start_time = time.time()
        threads = []
        results_threading = []

        def thread_worker(iterations, results_list, index):
            result = self.cpu_bound_task(iterations)
            results_list.append((index, result))

        for i in range(task_count):
            thread = Thread(target=thread_worker, args=(iterations, results_threading, i))
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

        threading_time = time.time() - start_time
        print(f"   Time: {threading_time:.2f}s")
        print(f"   Speedup: {sequential_time / threading_time:.2f}x")

        # Multiprocessing (bypasses GIL)
        print("\n3. Multiprocessing (GIL Bypass):")
        start_time = time.time()

        with Pool(processes=task_count) as pool:
            results_multiprocessing = pool.map(self.cpu_bound_task, [iterations] * task_count)

        multiprocessing_time = time.time() - start_time
        print(f"   Time: {multiprocessing_time:.2f}s")
        print(f"   Speedup: {sequential_time / multiprocessing_time:.2f}x")

        # I/O-bound comparison
        print("\n4. I/O-Bound Tasks (Threading Advantage):")
        urls = [
            'https://httpbin.org/delay/1',
            'https://httpbin.org/delay/1',
            'https://httpbin.org/delay/1',
            'https://httpbin.org/delay/1'
        ]

        # Sequential I/O
        start_time = time.time()
        io_results_sequential = []
        for url in urls:
            result = self.io_bound_task(url)
            io_results_sequential.append(result)
        io_sequential_time = time.time() - start_time
        print(f"   Sequential I/O: {io_sequential_time:.2f}s")

        # Threaded I/O
        start_time = time.time()
        io_threads = []
        io_results_threading = []

        def io_thread_worker(url, results_list):
            result = self.io_bound_task(url)
            results_list.append(result)

        for url in urls:
            thread = Thread(target=io_thread_worker, args=(url, io_results_threading))
            io_threads.append(thread)
            thread.start()

        for thread in io_threads:
            thread.join()

        io_threading_time = time.time() - start_time
        print(f"   Threaded I/O: {io_threading_time:.2f}s")
        print(f"   I/O Speedup: {io_sequential_time / io_threading_time:.2f}x")


class AsyncioOptimization:
    """Asyncio for handling I/O-bound operations efficiently"""

    async def async_http_request(self, session, url: str) -> dict:
        """Async HTTP request"""
        try:
            async with session.get(url) as response:
                content = await response.text()
                return {
                    'url': url,
                    'status': response.status,
                    'content_length': len(content),
                    'headers': dict(response.headers)
                }
        except Exception as e:
            return {
                'url': url,
                'error': str(e),
                'status': None
            }

    async def batch_http_requests(self, urls: List[str]) -> List[dict]:
        """Perform multiple HTTP requests concurrently"""
        import aiohttp

        async with aiohttp.ClientSession() as session:
            tasks = [self.async_http_request(session, url) for url in urls]
            results = await asyncio.gather(*tasks, return_exceptions=True)

            # Handle exceptions
            processed_results = []
            for result in results:
                if isinstance(result, Exception):
                    processed_results.append({'error': str(result)})
                else:
                    processed_results.append(result)

            return processed_results

    async def async_database_operations(self):
        """Example of async database operations"""
        # Simulated async database operations
        async def fetch_user(user_id: int):
            await asyncio.sleep(0.1)  # Simulate DB query
            return {'id': user_id, 'name': f'User {user_id}'}

        async def fetch_user_orders(user_id: int):
            await asyncio.sleep(0.15)  # Simulate DB query
            return [{'id': i, 'user_id': user_id, 'total': i * 10} for i in range(1, 4)]

        # Concurrent database operations
        user_id = 123
        user_task = fetch_user(user_id)
        orders_task = fetch_user_orders(user_id)

        user, orders = await asyncio.gather(user_task, orders_task)

        return {
            'user': user,
            'orders': orders
        }

    def compare_sync_vs_async_io(self):
        """Compare synchronous vs asynchronous I/O operations"""
        urls = [
            'https://httpbin.org/delay/0.5',
            'https://httpbin.org/delay/0.5',
            'https://httpbin.org/delay/0.5',
            'https://httpbin.org/delay/0.5',
            'https://httpbin.org/delay/0.5'
        ]

        print("=== Sync vs Async I/O Comparison ===")

        # Synchronous requests
        start_time = time.time()
        sync_results = []
        for url in urls:
            try:
                response = requests.get(url, timeout=10)
                sync_results.append({
                    'url': url,
                    'status': response.status_code,
                    'time': response.elapsed.total_seconds()
                })
            except Exception as e:
                sync_results.append({'url': url, 'error': str(e)})

        sync_time = time.time() - start_time
        print(f"Synchronous requests: {sync_time:.2f}s")

        # Asynchronous requests
        start_time = time.time()
        async_results = asyncio.run(self.batch_http_requests(urls))
        async_time = time.time() - start_time
        print(f"Asynchronous requests: {async_time:.2f}s")
        print(f"Async speedup: {sync_time / async_time:.2f}x")


class ProcessPoolOptimization:
    """Optimize CPU-bound tasks using process pools"""

    def __init__(self, max_workers: int = None):
        self.max_workers = max_workers or os.cpu_count()

    @staticmethod
    def cpu_intensive_task(data: dict) -> dict:
        """CPU-intensive task for process pool"""
        task_id = data['id']
        iterations = data['iterations']

        # Simulate CPU-intensive work
        result = 0
        for i in range(iterations):
            result += i ** 2 % 1000000

        return {
            'task_id': task_id,
            'result': result,
            'process_id': os.getpid(),
            'iterations': iterations
        }

    def process_data_batch(self, data_batch: List[dict]) -> List[dict]:
        """Process data batch using process pool"""
        with concurrent.futures.ProcessPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit all tasks
            future_to_data = {executor.submit(self.cpu_intensive_task, data): data for data in data_batch}

            results = []
            for future in concurrent.futures.as_completed(future_to_data):
                try:
                    result = future.result()
                    results.append(result)
                except Exception as e:
                    original_data = future_to_data[future]
                    results.append({
                        'task_id': original_data['id'],
                        'error': str(e),
                        'process_id': None
                    })

            return results

    def benchmark_process_pool(self, task_count: int = 8, iterations: int = 1000000):
        """Benchmark process pool performance"""
        data_batch = [
            {'id': i, 'iterations': iterations}
            for i in range(task_count)
        ]

        print(f"=== Process Pool Benchmark ({task_count} tasks, {iterations} iterations each) ===")

        # Sequential processing
        start_time = time.time()
        sequential_results = [self.cpu_intensive_task(data) for data in data_batch]
        sequential_time = time.time() - start_time
        print(f"Sequential: {sequential_time:.2f}s")

        # Process pool processing
        start_time = time.time()
        parallel_results = self.process_data_batch(data_batch)
        parallel_time = time.time() - start_time
        print(f"Process Pool: {parallel_time:.2f}s")
        print(f"Speedup: {sequential_time / parallel_time:.2f}x")

        # Show process distribution
        process_ids = set(result.get('process_id') for result in parallel_results if result.get('process_id'))
        print(f"Used {len(process_ids)} processes: {sorted(process_ids)}")


class ThreadPoolOptimization:
    """Optimize I/O-bound tasks using thread pools"""

    def __init__(self, max_workers: int = None):
        self.max_workers = max_workers or min(32, (os.cpu_count() or 1) + 4)

    @staticmethod
    def io_task(url: str, timeout: int = 10) -> dict:
        """I/O-bound task for thread pool"""
        thread_id = threading.get_ident()
        start_time = time.time()

        try:
            response = requests.get(url, timeout=timeout)
            return {
                'url': url,
                'status_code': response.status_code,
                'response_time': time.time() - start_time,
                'content_length': len(response.content),
                'thread_id': thread_id
            }
        except Exception as e:
            return {
                'url': url,
                'error': str(e),
                'response_time': time.time() - start_time,
                'thread_id': thread_id
            }

    def process_urls_batch(self, urls: List[str]) -> List[dict]:
        """Process URLs using thread pool"""
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit all tasks
            future_to_url = {executor.submit(self.io_task, url): url for url in urls}

            results = []
            for future in concurrent.futures.as_completed(future_to_url):
                try:
                    result = future.result()
                    results.append(result)
                except Exception as e:
                    url = future_to_url[future]
                    results.append({
                        'url': url,
                        'error': str(e),
                        'thread_id': threading.get_ident()
                    })

            return results

    def benchmark_thread_pool(self, url_count: int = 10):
        """Benchmark thread pool performance"""
        urls = [f'https://httpbin.org/delay/0.5?id={i}' for i in range(url_count)]

        print(f"=== Thread Pool Benchmark ({url_count} URLs) ===")

        # Sequential processing
        start_time = time.time()
        sequential_results = [self.io_task(url) for url in urls]
        sequential_time = time.time() - start_time
        print(f"Sequential: {sequential_time:.2f}s")

        # Thread pool processing
        start_time = time.time()
        parallel_results = self.process_urls_batch(urls)
        parallel_time = time.time() - start_time
        print(f"Thread Pool: {parallel_time:.2f}s")
        print(f"Speedup: {sequential_time / parallel_time:.2f}x")

        # Show thread distribution
        thread_ids = set(result.get('thread_id') for result in parallel_results if result.get('thread_id'))
        print(f"Used {len(thread_ids)} threads")


class GILWorkarounds:
    """Practical workarounds for GIL limitations"""

    @staticmethod
    def use_numpy_for_numerical_computation():
        """NumPy operations release GIL for better performance"""
        import numpy as np

        print("=== NumPy GIL Release Example ===")

        # Large array operations
        size = 10000000
        arr1 = np.random.random(size)
        arr2 = np.random.random(size)

        # NumPy operations release GIL
        start_time = time.time()
        result = np.dot(arr1, arr2)
        numpy_time = time.time() - start_time

        print(f"NumPy dot product ({size} elements): {numpy_time:.4f}s")
        print(f"Result: {result:.6f}")

        # Pure Python equivalent (much slower)
        start_time = time.time()
        python_result = sum(a * b for a, b in zip(arr1[:1000], arr2[:1000]))  # Smaller for demo
        python_time = time.time() - start_time

        print(f"Pure Python (1000 elements): {python_time:.4f}s")
        print(f"NumPy is ~{(python_time * size / 1000) / numpy_time:.0f}x faster")

    @staticmethod
    def use_cython_extensions():
        """Example of using Cython to bypass GIL"""
        # This would be in a .pyx file
        cython_code = '''
# cython: language_level=3
from cython.parallel import prange
from libc.math cimport sqrt
import numpy as np
cimport numpy as cnp

def parallel_computation(double[:] data):
    cdef int i
    cdef int n = data.shape[0]
    cdef double[:] result = np.empty(n)

    # This loop can run in parallel, releasing GIL
    with nogil:
        for i in prange(n):
            result[i] = sqrt(data[i] * data[i] + 1.0)

    return np.asarray(result)
'''

        print("=== Cython GIL Release Example ===")
        print("Cython code for parallel computation:")
        print(cython_code)
        print("\nCython allows releasing GIL for CPU-bound operations")
        print("Use 'with nogil:' blocks for parallel processing")

    @staticmethod
    def use_multiprocessing_queue():
        """Inter-process communication using queues"""
        def worker_process(input_queue: Queue, output_queue: Queue, worker_id: int):
            """Worker process function"""
            while True:
                try:
                    # Get task from input queue
                    task = input_queue.get(timeout=1)
                    if task is None:  # Poison pill
                        break

                    # Process task
                    task_id, data = task
                    result = sum(x ** 2 for x in data)  # CPU-bound work

                    # Put result in output queue
                    output_queue.put((task_id, result, worker_id))

                except queue.Empty:
                    continue
                except Exception as e:
                    output_queue.put((None, f"Error: {e}", worker_id))

        print("=== Multiprocessing Queue Example ===")

        # Create queues
        input_queue = Queue()
        output_queue = Queue()

        # Create tasks
        tasks = [(i, list(range(i * 1000, (i + 1) * 1000))) for i in range(8)]

        # Add tasks to input queue
        for task in tasks:
            input_queue.put(task)

        # Create worker processes
        num_workers = 4
        processes = []

        for worker_id in range(num_workers):
            p = Process(target=worker_process, args=(input_queue, output_queue, worker_id))
            p.start()
            processes.append(p)

        # Add poison pills
        for _ in range(num_workers):
            input_queue.put(None)

        # Collect results
        results = []
        for _ in range(len(tasks)):
            result = output_queue.get()
            results.append(result)

        # Wait for processes to finish
        for p in processes:
            p.join()

        print(f"Processed {len(results)} tasks using {num_workers} processes")
        for task_id, result, worker_id in sorted(results):
            print(f"Task {task_id}: {result} (Worker {worker_id})")


class WebApplicationOptimization:
    """GIL optimization strategies for web applications"""

    @staticmethod
    def async_view_example():
        """Example of async Django/FastAPI view"""
        # Django async view
        django_async_view = '''
from django.http import JsonResponse
from asgiref.sync import sync_to_async
import asyncio
import aiohttp

async def async_api_view(request):
    """Async Django view for I/O-bound operations"""

    async def fetch_external_data(url):
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                return await response.json()

    # Concurrent external API calls
    urls = [
        'https://api.example1.com/data',
        'https://api.example2.com/data',
        'https://api.example3.com/data'
    ]

    results = await asyncio.gather(
        *[fetch_external_data(url) for url in urls],
        return_exceptions=True
    )

    return JsonResponse({'results': results})
'''

        # FastAPI async view
        fastapi_async_view = '''
from fastapi import FastAPI
import asyncio
import aiohttp
from typing import List

app = FastAPI()

@app.get("/async-data")
async def get_async_data():
    """FastAPI async endpoint"""

    async def process_data_async(data_id: int):
        # Simulate async database operation
        await asyncio.sleep(0.1)
        return {"id": data_id, "processed": True}

    # Process multiple items concurrently
    data_ids = [1, 2, 3, 4, 5]
    results = await asyncio.gather(
        *[process_data_async(data_id) for data_id in data_ids]
    )

    return {"results": results}
'''

        print("=== Web Application Async Examples ===")
        print("Django Async View:")
        print(django_async_view)
        print("\nFastAPI Async View:")
        print(fastapi_async_view)

    @staticmethod
    def celery_task_example():
        """Example of using Celery for CPU-bound tasks"""
        celery_config = '''
# celery_app.py
from celery import Celery

app = Celery('myapp')
app.config_from_object('django.conf:settings', namespace='CELERY')

@app.task
def cpu_intensive_task(data):
    """CPU-bound task executed in separate process"""
    result = 0
    for i in range(data['iterations']):
        result += i ** 2
    return {
        'task_id': data['task_id'],
        'result': result,
        'status': 'completed'
    }

@app.task
def batch_process_data(data_list):
    """Process batch of data"""
    results = []
    for data in data_list:
        # CPU-intensive processing
        processed = process_single_item(data)
        results.append(processed)
    return results
'''

        django_view = '''
# views.py
from django.http import JsonResponse
from .celery_app import cpu_intensive_task

def trigger_background_task(request):
    """Trigger CPU-bound task in background"""
    task_data = {
        'task_id': 'task_123',
        'iterations': 1000000
    }

    # Execute in background worker
    task = cpu_intensive_task.delay(task_data)

    return JsonResponse({
        'task_id': task.id,
        'status': 'started',
        'message': 'Task submitted to background worker'
    })

def check_task_status(request, task_id):
    """Check background task status"""
    from celery.result import AsyncResult

    task = AsyncResult(task_id)

    return JsonResponse({
        'task_id': task_id,
        'status': task.status,
        'result': task.result if task.ready() else None
    })
'''

        print("=== Celery Background Tasks Example ===")
        print("Celery Configuration:")
        print(celery_config)
        print("\nDjango Views:")
        print(django_view)


if __name__ == '__main__':
    print("Python GIL Demonstration and Optimization Strategies")
    print("=" * 60)

    # Demonstrate GIL impact
    gil_demo = GILDemonstration()
    gil_demo.compare_threading_vs_multiprocessing()

    print("\n")

    # Async I/O optimization
    async_demo = AsyncioOptimization()
    async_demo.compare_sync_vs_async_io()

    print("\n")

    # Process pool optimization
    process_demo = ProcessPoolOptimization()
    process_demo.benchmark_process_pool()

    print("\n")

    # Thread pool optimization
    thread_demo = ThreadPoolOptimization()
    thread_demo.benchmark_thread_pool()

    print("\n")

    # GIL workarounds
    workarounds = GILWorkarounds()
    workarounds.use_numpy_for_numerical_computation()
    workarounds.use_cython_extensions()
    workarounds.use_multiprocessing_queue()

    print("\n")

    # Web application examples
    web_optimization = WebApplicationOptimization()
    web_optimization.async_view_example()
    web_optimization.celery_task_example()
```

**GIL Optimization Strategies:**

1. **Use Asyncio**: For I/O-bound operations
2. **Multiprocessing**: For CPU-bound tasks
3. **NumPy/SciPy**: Mathematical operations release GIL
4. **Cython**: Write performance-critical code in Cython
5. **Background Tasks**: Use Celery for heavy processing
6. **Thread Pools**: For I/O-bound concurrent operations
7. **Alternative Interpreters**: Consider PyPy or Jython

---

### Q12: How do you implement proper logging and monitoring in Python web applications?

**Difficulty: Medium**

**Answer:**
Proper logging and monitoring are essential for maintaining, debugging, and optimizing Python web applications in production environments.

**Comprehensive Logging and Monitoring Implementation:**

```python
#!/usr/bin/env python3
"""
Python Web Application Logging and Monitoring
Comprehensive logging, metrics, and monitoring implementation
"""

import logging
import logging.config
import logging.handlers
import json
import time
import os
import sys
from datetime import datetime, timezone
from typing import Dict, Any, Optional, List
from functools import wraps
from contextlib import contextmanager
import traceback
import threading
import queue
from dataclasses import dataclass, asdict
from enum import Enum
import psutil
import requests
from urllib.parse import urlparse
import hashlib
import uuid
from collections import defaultdict, deque
import weakref
import atexit
from pathlib import Path


class LogLevel(Enum):
    """Log level enumeration"""
    DEBUG = logging.DEBUG
    INFO = logging.INFO
    WARNING = logging.WARNING
    ERROR = logging.ERROR
    CRITICAL = logging.CRITICAL


class MetricType(Enum):
    """Metric type enumeration"""
    COUNTER = "counter"
    GAUGE = "gauge"
    HISTOGRAM = "histogram"
    TIMER = "timer"


@dataclass
class LogEntry:
    """Structured log entry"""
    timestamp: str
    level: str
    logger_name: str
    message: str
    module: str
    function: str
    line_number: int
    thread_id: int
    process_id: int
    request_id: Optional[str] = None
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    extra_data: Optional[Dict[str, Any]] = None
    exception_info: Optional[str] = None


@dataclass
class MetricEntry:
    """Metric entry for monitoring"""
    name: str
    value: float
    metric_type: MetricType
    timestamp: str
    tags: Dict[str, str]
    unit: Optional[str] = None


class StructuredLogger:
    """Enhanced structured logging implementation"""

    def __init__(self, name: str, level: LogLevel = LogLevel.INFO):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level.value)
        self._context = threading.local()
        self._setup_handlers()

    def _setup_handlers(self):
        """Setup logging handlers"""
        # Console handler with colored output
        console_handler = logging.StreamHandler(sys.stdout)
        console_formatter = ColoredFormatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        console_handler.setFormatter(console_formatter)

        # File handler with JSON format
        file_handler = logging.handlers.RotatingFileHandler(
            'app.log',
            maxBytes=10*1024*1024,  # 10MB
            backupCount=5
        )
        json_formatter = JSONFormatter()
        file_handler.setFormatter(json_formatter)

        # Error file handler
        error_handler = logging.handlers.RotatingFileHandler(
            'error.log',
            maxBytes=10*1024*1024,
            backupCount=5
        )
        error_handler.setLevel(logging.ERROR)
        error_handler.setFormatter(json_formatter)

        # Add handlers
        self.logger.addHandler(console_handler)
        self.logger.addHandler(file_handler)
        self.logger.addHandler(error_handler)

    def set_context(self, **kwargs):
        """Set logging context for current thread"""
        if not hasattr(self._context, 'data'):
            self._context.data = {}
        self._context.data.update(kwargs)

    def get_context(self) -> Dict[str, Any]:
        """Get current logging context"""
        return getattr(self._context, 'data', {})

    def clear_context(self):
        """Clear logging context"""
        if hasattr(self._context, 'data'):
            self._context.data.clear()

    def _create_log_entry(self, level: str, message: str, extra: Dict[str, Any] = None) -> LogEntry:
        """Create structured log entry"""
        frame = sys._getframe(3)  # Get caller's frame
        context = self.get_context()

        return LogEntry(
            timestamp=datetime.now(timezone.utc).isoformat(),
            level=level,
            logger_name=self.logger.name,
            message=message,
            module=frame.f_globals.get('__name__', 'unknown'),
            function=frame.f_code.co_name,
            line_number=frame.f_lineno,
            thread_id=threading.get_ident(),
            process_id=os.getpid(),
            request_id=context.get('request_id'),
            user_id=context.get('user_id'),
            session_id=context.get('session_id'),
            extra_data=extra,
            exception_info=traceback.format_exc() if sys.exc_info()[0] else None
        )

    def debug(self, message: str, **extra):
        """Log debug message"""
        entry = self._create_log_entry('DEBUG', message, extra)
        self.logger.debug(message, extra={'log_entry': entry})

    def info(self, message: str, **extra):
        """Log info message"""
        entry = self._create_log_entry('INFO', message, extra)
        self.logger.info(message, extra={'log_entry': entry})

    def warning(self, message: str, **extra):
        """Log warning message"""
        entry = self._create_log_entry('WARNING', message, extra)
        self.logger.warning(message, extra={'log_entry': entry})

    def error(self, message: str, **extra):
        """Log error message"""
        entry = self._create_log_entry('ERROR', message, extra)
        self.logger.error(message, extra={'log_entry': entry})

    def critical(self, message: str, **extra):
        """Log critical message"""
        entry = self._create_log_entry('CRITICAL', message, extra)
        self.logger.critical(message, extra={'log_entry': entry})


class ColoredFormatter(logging.Formatter):
    """Colored console log formatter"""

    COLORS = {
        'DEBUG': '\033[36m',     # Cyan
        'INFO': '\033[32m',      # Green
        'WARNING': '\033[33m',   # Yellow
        'ERROR': '\033[31m',     # Red
        'CRITICAL': '\033[35m',  # Magenta
    }
    RESET = '\033[0m'

    def format(self, record):
        log_color = self.COLORS.get(record.levelname, '')
        record.levelname = f"{log_color}{record.levelname}{self.RESET}"
        return super().format(record)


class JSONFormatter(logging.Formatter):
    """JSON log formatter for structured logging"""

    def format(self, record):
        log_entry = getattr(record, 'log_entry', None)

        if log_entry:
            return json.dumps(asdict(log_entry), ensure_ascii=False)
        else:
            # Fallback for non-structured logs
            log_data = {
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'level': record.levelname,
                'logger_name': record.name,
                'message': record.getMessage(),
                'module': record.module,
                'function': record.funcName,
                'line_number': record.lineno,
                'thread_id': threading.get_ident(),
                'process_id': os.getpid()
            }

            if record.exc_info:
                log_data['exception_info'] = self.formatException(record.exc_info)

            return json.dumps(log_data, ensure_ascii=False)


class MetricsCollector:
    """Application metrics collector"""

    def __init__(self):
        self.metrics = defaultdict(list)
        self.counters = defaultdict(float)
        self.gauges = defaultdict(float)
        self.histograms = defaultdict(list)
        self._lock = threading.Lock()

    def increment_counter(self, name: str, value: float = 1.0, tags: Dict[str, str] = None):
        """Increment counter metric"""
        with self._lock:
            key = self._make_key(name, tags or {})
            self.counters[key] += value

            metric = MetricEntry(
                name=name,
                value=value,
                metric_type=MetricType.COUNTER,
                timestamp=datetime.now(timezone.utc).isoformat(),
                tags=tags or {}
            )
            self.metrics[name].append(metric)

    def set_gauge(self, name: str, value: float, tags: Dict[str, str] = None):
        """Set gauge metric"""
        with self._lock:
            key = self._make_key(name, tags or {})
            self.gauges[key] = value

            metric = MetricEntry(
                name=name,
                value=value,
                metric_type=MetricType.GAUGE,
                timestamp=datetime.now(timezone.utc).isoformat(),
                tags=tags or {}
            )
            self.metrics[name].append(metric)

    def record_histogram(self, name: str, value: float, tags: Dict[str, str] = None):
        """Record histogram value"""
        with self._lock:
            key = self._make_key(name, tags or {})
            self.histograms[key].append(value)

            metric = MetricEntry(
                name=name,
                value=value,
                metric_type=MetricType.HISTOGRAM,
                timestamp=datetime.now(timezone.utc).isoformat(),
                tags=tags or {}
            )
            self.metrics[name].append(metric)

    def _make_key(self, name: str, tags: Dict[str, str]) -> str:
        """Create metric key from name and tags"""
        tag_string = ','.join(f"{k}={v}" for k, v in sorted(tags.items()))
        return f"{name}:{tag_string}" if tag_string else name

    def get_metrics_summary(self) -> Dict[str, Any]:
        """Get metrics summary"""
        with self._lock:
            summary = {
                'counters': dict(self.counters),
                'gauges': dict(self.gauges),
                'histograms': {
                    key: {
                        'count': len(values),
                        'min': min(values) if values else 0,
                        'max': max(values) if values else 0,
                        'avg': sum(values) / len(values) if values else 0
                    }
                    for key, values in self.histograms.items()
                }
            }
            return summary


class PerformanceMonitor:
    """Application performance monitoring"""

    def __init__(self, metrics_collector: MetricsCollector):
        self.metrics = metrics_collector
        self.start_time = time.time()
        self._monitoring = True
        self._monitor_thread = threading.Thread(target=self._monitor_system, daemon=True)
        self._monitor_thread.start()

    def _monitor_system(self):
        """Monitor system metrics"""
        while self._monitoring:
            try:
                # CPU usage
                cpu_percent = psutil.cpu_percent(interval=1)
                self.metrics.set_gauge('system.cpu.usage', cpu_percent, {'unit': 'percent'})

                # Memory usage
                memory = psutil.virtual_memory()
                self.metrics.set_gauge('system.memory.usage', memory.percent, {'unit': 'percent'})
                self.metrics.set_gauge('system.memory.available', memory.available, {'unit': 'bytes'})

                # Disk usage
                disk = psutil.disk_usage('/')
                self.metrics.set_gauge('system.disk.usage', disk.percent, {'unit': 'percent'})

                # Process info
                process = psutil.Process()
                self.metrics.set_gauge('process.memory.rss', process.memory_info().rss, {'unit': 'bytes'})
                self.metrics.set_gauge('process.cpu.percent', process.cpu_percent(), {'unit': 'percent'})
                self.metrics.set_gauge('process.threads', process.num_threads(), {'unit': 'count'})

                time.sleep(10)  # Monitor every 10 seconds

            except Exception as e:
                logger.error(f"Error monitoring system metrics: {e}")
                time.sleep(10)

    def stop_monitoring(self):
        """Stop system monitoring"""
        self._monitoring = False


def timing_decorator(metric_name: str = None, tags: Dict[str, str] = None):
    """Decorator to measure function execution time"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()

            try:
                result = func(*args, **kwargs)
                status = 'success'
            except Exception as e:
                status = 'error'
                logger.error(f"Error in {func.__name__}: {e}")
                raise
            finally:
                execution_time = time.time() - start_time

                # Record timing metric
                name = metric_name or f"function.{func.__name__}.duration"
                metric_tags = (tags or {}).copy()
                metric_tags.update({
                    'function': func.__name__,
                    'status': status
                })

                metrics_collector.record_histogram(name, execution_time, metric_tags)

                logger.info(
                    f"Function {func.__name__} executed",
                    execution_time=execution_time,
                    status=status
                )

            return result
        return wrapper
    return decorator


@contextmanager
def request_context(request_id: str = None, user_id: str = None, session_id: str = None):
    """Context manager for request-scoped logging"""
    request_id = request_id or str(uuid.uuid4())

    # Set context
    logger.set_context(
        request_id=request_id,
        user_id=user_id,
        session_id=session_id
    )

    start_time = time.time()

    try:
        logger.info("Request started", request_id=request_id)
        yield request_id
    except Exception as e:
        logger.error(f"Request failed: {e}", request_id=request_id)
        metrics_collector.increment_counter('requests.failed', tags={'request_id': request_id})
        raise
    finally:
        execution_time = time.time() - start_time
        logger.info(
            "Request completed",
            request_id=request_id,
            execution_time=execution_time
        )
        metrics_collector.record_histogram(
            'request.duration',
            execution_time,
            tags={'request_id': request_id}
        )

        # Clear context
        logger.clear_context()


class AlertManager:
    """Alert management system"""

    def __init__(self, webhook_url: str = None):
        self.webhook_url = webhook_url
        self.alert_history = deque(maxlen=1000)
        self.alert_rules = []

    def add_alert_rule(self, name: str, condition: callable, message: str, severity: str = 'warning'):
        """Add alert rule"""
        self.alert_rules.append({
            'name': name,
            'condition': condition,
            'message': message,
            'severity': severity
        })

    def check_alerts(self, metrics_summary: Dict[str, Any]):
        """Check alert conditions"""
        for rule in self.alert_rules:
            try:
                if rule['condition'](metrics_summary):
                    self._trigger_alert(rule, metrics_summary)
            except Exception as e:
                logger.error(f"Error checking alert rule {rule['name']}: {e}")

    def _trigger_alert(self, rule: Dict[str, Any], metrics: Dict[str, Any]):
        """Trigger alert"""
        alert = {
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'rule_name': rule['name'],
            'severity': rule['severity'],
            'message': rule['message'],
            'metrics': metrics
        }

        self.alert_history.append(alert)

        logger.critical(
            f"ALERT: {rule['name']}",
            alert_rule=rule['name'],
            severity=rule['severity'],
            message=rule['message']
        )

        # Send to webhook if configured
        if self.webhook_url:
            self._send_webhook_alert(alert)

    def _send_webhook_alert(self, alert: Dict[str, Any]):
        """Send alert to webhook"""
        try:
            response = requests.post(
                self.webhook_url,
                json=alert,
                timeout=10
            )
            response.raise_for_status()
        except Exception as e:
            logger.error(f"Failed to send webhook alert: {e}")


class LogAnalyzer:
    """Log analysis and insights"""

    def __init__(self, log_file_path: str):
        self.log_file_path = log_file_path

    def analyze_error_patterns(self, hours: int = 24) -> Dict[str, Any]:
        """Analyze error patterns in logs"""
        error_counts = defaultdict(int)
        error_details = defaultdict(list)

        cutoff_time = datetime.now(timezone.utc) - timedelta(hours=hours)

        try:
            with open(self.log_file_path, 'r') as f:
                for line in f:
                    try:
                        log_entry = json.loads(line.strip())

                        # Check if log is within time window
                        log_time = datetime.fromisoformat(log_entry['timestamp'])
                        if log_time < cutoff_time:
                            continue

                        # Analyze errors
                        if log_entry['level'] in ['ERROR', 'CRITICAL']:
                            error_key = f"{log_entry['module']}.{log_entry['function']}"
                            error_counts[error_key] += 1
                            error_details[error_key].append({
                                'timestamp': log_entry['timestamp'],
                                'message': log_entry['message'],
                                'exception': log_entry.get('exception_info')
                            })

                    except (json.JSONDecodeError, KeyError):
                        continue

        except FileNotFoundError:
            return {'error': 'Log file not found'}

        return {
            'analysis_period_hours': hours,
            'total_errors': sum(error_counts.values()),
            'error_counts': dict(error_counts),
            'top_errors': sorted(
                error_counts.items(),
                key=lambda x: x[1],
                reverse=True
            )[:10],
            'error_details': dict(error_details)
        }


# Global instances
logger = StructuredLogger('app')
metrics_collector = MetricsCollector()
performance_monitor = PerformanceMonitor(metrics_collector)
alert_manager = AlertManager()

# Setup alert rules
alert_manager.add_alert_rule(
    'high_cpu_usage',
    lambda m: m['gauges'].get('system.cpu.usage:unit=percent', 0) > 80,
    'CPU usage is above 80%',
    'warning'
)

alert_manager.add_alert_rule(
    'high_memory_usage',
    lambda m: m['gauges'].get('system.memory.usage:unit=percent', 0) > 90,
    'Memory usage is above 90%',
    'critical'
)


# Example usage in web application
def example_web_request_handler(request_data: Dict[str, Any]):
    """Example web request handler with logging and monitoring"""

    with request_context(
        user_id=request_data.get('user_id'),
        session_id=request_data.get('session_id')
    ) as request_id:

        logger.info("Processing request", request_data=request_data)

        try:
            # Simulate processing
            result = process_business_logic(request_data)

            metrics_collector.increment_counter(
                'requests.processed',
                tags={'status': 'success', 'endpoint': 'example'}
            )

            logger.info("Request processed successfully", result=result)
            return result

        except Exception as e:
            metrics_collector.increment_counter(
                'requests.failed',
                tags={'status': 'error', 'endpoint': 'example'}
            )

            logger.error(f"Request processing failed: {e}")
            raise


@timing_decorator('business_logic.duration')
def process_business_logic(data: Dict[str, Any]) -> Dict[str, Any]:
    """Example business logic with timing"""
    logger.debug("Starting business logic processing")

    # Simulate processing time
    time.sleep(0.1)

    result = {
        'processed_data': data,
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'status': 'completed'
    }

    logger.debug("Business logic processing completed")
    return result


if __name__ == '__main__':
    # Example usage

    # Test request processing
    test_request = {
        'user_id': '12345',
        'session_id': 'session_abc',
        'action': 'test_action',
        'data': {'key': 'value'}
    }

    result = example_web_request_handler(test_request)
    print(f"Request result: {result}")

    # Check metrics
    time.sleep(1)
    metrics_summary = metrics_collector.get_metrics_summary()
    print(f"\nMetrics summary: {json.dumps(metrics_summary, indent=2)}")

    # Check alerts
    alert_manager.check_alerts(metrics_summary)

    # Analyze logs
    log_analyzer = LogAnalyzer('app.log')
    error_analysis = log_analyzer.analyze_error_patterns(hours=1)
    print(f"\nError analysis: {json.dumps(error_analysis, indent=2)}")

    # Cleanup
    performance_monitor.stop_monitoring()
```

**Logging and Monitoring Best Practices:**

1. **Structured Logging**: Use consistent JSON format for logs
2. **Context Propagation**: Include request/user context in logs
3. **Log Levels**: Use appropriate log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
4. **Metrics Collection**: Track key performance indicators
5. **Alerting**: Set up automated alerts for critical issues
6. **Log Rotation**: Implement log rotation to manage disk space
7. **Centralized Logging**: Use tools like ELK stack or Fluentd
8. **Performance Monitoring**: Track system and application metrics

---

### Q13: Explain Python's data structures and their performance characteristics for web applications.

**Difficulty: Medium**

**Answer:**
Understanding Python's built-in data structures and their performance characteristics is crucial for building efficient web applications.

**Data Structures Performance Analysis:**

```python
#!/usr/bin/env python3
"""
Python Data Structures Performance Analysis
Comprehensive guide to choosing the right data structure
"""

import time
import sys
import random
from collections import deque, defaultdict, Counter, OrderedDict, namedtuple
from typing import List, Dict, Set, Tuple, Any
import bisect
import heapq
from dataclasses import dataclass
from enum import Enum
import json
from functools import lru_cache
import threading
from concurrent.futures import ThreadPoolExecutor
import memory_profiler
import cProfile
import pstats
from io import StringIO


class DataStructureType(Enum):
    """Data structure type enumeration"""
    LIST = "list"
    TUPLE = "tuple"
    SET = "set"
    DICT = "dict"
    DEQUE = "deque"
    DEFAULTDICT = "defaultdict"
    COUNTER = "counter"
    ORDEREDDICT = "ordereddict"


@dataclass
class PerformanceResult:
    """Performance measurement result"""
    operation: str
    data_structure: str
    size: int
    time_taken: float
    memory_usage: float
    complexity: str


class DataStructureAnalyzer:
    """Analyze performance of different data structures"""

    def __init__(self):
        self.results = []

    def measure_performance(self, func, *args, **kwargs) -> Tuple[Any, float, float]:
        """Measure execution time and memory usage"""
        # Memory before
        mem_before = memory_profiler.memory_usage()[0]

        # Time execution
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()

        # Memory after
        mem_after = memory_profiler.memory_usage()[0]

        execution_time = end_time - start_time
        memory_delta = mem_after - mem_before

        return result, execution_time, memory_delta

    def benchmark_list_operations(self, size: int = 10000):
        """Benchmark list operations"""
        print(f"=== List Operations Benchmark (size: {size}) ===")

        # List creation
        _, time_taken, memory_used = self.measure_performance(
            lambda: list(range(size))
        )
        print(f"List creation: {time_taken:.6f}s, Memory: {memory_used:.2f}MB")

        # List with data
        test_list = list(range(size))

        # Append operation - O(1) amortized
        _, time_taken, _ = self.measure_performance(
            lambda: [test_list.append(i) for i in range(100)]
        )
        print(f"List append (100 items): {time_taken:.6f}s - O(1) amortized")

        # Insert at beginning - O(n)
        test_list_copy = test_list.copy()
        _, time_taken, _ = self.measure_performance(
            lambda: test_list_copy.insert(0, -1)
        )
        print(f"List insert at beginning: {time_taken:.6f}s - O(n)")

        # Index access - O(1)
        _, time_taken, _ = self.measure_performance(
            lambda: [test_list[random.randint(0, len(test_list)-1)] for _ in range(1000)]
        )
        print(f"List random access (1000 times): {time_taken:.6f}s - O(1)")

        # Search - O(n)
        target = size // 2
        _, time_taken, _ = self.measure_performance(
            lambda: target in test_list
        )
        print(f"List search: {time_taken:.6f}s - O(n)")

        # Sort - O(n log n)
        test_list_unsorted = random.sample(range(size * 2), size)
        _, time_taken, _ = self.measure_performance(
            lambda: sorted(test_list_unsorted)
        )
        print(f"List sort: {time_taken:.6f}s - O(n log n)")

    def benchmark_dict_operations(self, size: int = 10000):
        """Benchmark dictionary operations"""
        print(f"\n=== Dictionary Operations Benchmark (size: {size}) ===")

        # Dict creation
        _, time_taken, memory_used = self.measure_performance(
            lambda: {i: f"value_{i}" for i in range(size)}
        )
        print(f"Dict creation: {time_taken:.6f}s, Memory: {memory_used:.2f}MB")

        test_dict = {i: f"value_{i}" for i in range(size)}

        # Key access - O(1) average
        _, time_taken, _ = self.measure_performance(
            lambda: [test_dict[random.randint(0, size-1)] for _ in range(1000)]
        )
        print(f"Dict key access (1000 times): {time_taken:.6f}s - O(1) average")

        # Key insertion - O(1) average
        _, time_taken, _ = self.measure_performance(
            lambda: [test_dict.update({size + i: f"new_value_{i}"}) for i in range(100)]
        )
        print(f"Dict insertion (100 items): {time_taken:.6f}s - O(1) average")

        # Key deletion - O(1) average
        keys_to_delete = list(range(size, size + 50))
        _, time_taken, _ = self.measure_performance(
            lambda: [test_dict.pop(key, None) for key in keys_to_delete]
        )
        print(f"Dict deletion (50 items): {time_taken:.6f}s - O(1) average")

        # Key search - O(1) average
        _, time_taken, _ = self.measure_performance(
            lambda: [random.randint(0, size-1) in test_dict for _ in range(1000)]
        )
        print(f"Dict key search (1000 times): {time_taken:.6f}s - O(1) average")

    def benchmark_set_operations(self, size: int = 10000):
        """Benchmark set operations"""
        print(f"\n=== Set Operations Benchmark (size: {size}) ===")

        # Set creation
        _, time_taken, memory_used = self.measure_performance(
            lambda: set(range(size))
        )
        print(f"Set creation: {time_taken:.6f}s, Memory: {memory_used:.2f}MB")

        test_set = set(range(size))
        test_set2 = set(range(size//2, size + size//2))

        # Membership test - O(1) average
        _, time_taken, _ = self.measure_performance(
            lambda: [random.randint(0, size-1) in test_set for _ in range(1000)]
        )
        print(f"Set membership test (1000 times): {time_taken:.6f}s - O(1) average")

        # Set addition - O(1) average
        _, time_taken, _ = self.measure_performance(
            lambda: [test_set.add(size + i) for i in range(100)]
        )
        print(f"Set addition (100 items): {time_taken:.6f}s - O(1) average")

        # Set intersection - O(min(len(s), len(t)))
        _, time_taken, _ = self.measure_performance(
            lambda: test_set & test_set2
        )
        print(f"Set intersection: {time_taken:.6f}s - O(min(len(s), len(t)))")

        # Set union - O(len(s) + len(t))
        _, time_taken, _ = self.measure_performance(
            lambda: test_set | test_set2
        )
        print(f"Set union: {time_taken:.6f}s - O(len(s) + len(t))")

    def benchmark_deque_operations(self, size: int = 10000):
        """Benchmark deque operations"""
        print(f"\n=== Deque Operations Benchmark (size: {size}) ===")

        # Deque creation
        _, time_taken, memory_used = self.measure_performance(
            lambda: deque(range(size))
        )
        print(f"Deque creation: {time_taken:.6f}s, Memory: {memory_used:.2f}MB")

        test_deque = deque(range(size))

        # Append left - O(1)
        _, time_taken, _ = self.measure_performance(
            lambda: [test_deque.appendleft(i) for i in range(100)]
        )
        print(f"Deque appendleft (100 items): {time_taken:.6f}s - O(1)")

        # Append right - O(1)
        _, time_taken, _ = self.measure_performance(
            lambda: [test_deque.append(i) for i in range(100)]
        )
        print(f"Deque append (100 items): {time_taken:.6f}s - O(1)")

        # Pop left - O(1)
        _, time_taken, _ = self.measure_performance(
            lambda: [test_deque.popleft() for _ in range(50)]
        )
        print(f"Deque popleft (50 items): {time_taken:.6f}s - O(1)")

        # Pop right - O(1)
        _, time_taken, _ = self.measure_performance(
            lambda: [test_deque.pop() for _ in range(50)]
        )
        print(f"Deque pop (50 items): {time_taken:.6f}s - O(1)")

    def compare_data_structures_for_common_operations(self):
        """Compare data structures for common web app operations"""
        print("\n=== Data Structure Comparison for Web Applications ===")

        size = 10000

        # Cache-like operations (key-value storage)
        print("\n1. Cache-like Operations:")

        # Dictionary
        cache_dict = {}
        _, time_dict, _ = self.measure_performance(
            lambda: [cache_dict.update({f"key_{i}": f"value_{i}"}) for i in range(size)]
        )
        print(f"   Dict cache operations: {time_dict:.6f}s")

        # OrderedDict (maintains insertion order)
        cache_ordered = OrderedDict()
        _, time_ordered, _ = self.measure_performance(
            lambda: [cache_ordered.update({f"key_{i}": f"value_{i}"}) for i in range(size)]
        )
        print(f"   OrderedDict cache operations: {time_ordered:.6f}s")

        # Queue operations
        print("\n2. Queue Operations:")

        # List as queue (inefficient)
        queue_list = []
        _, time_list_queue, _ = self.measure_performance(
            lambda: [queue_list.append(i) for i in range(1000)] +
                   [queue_list.pop(0) for _ in range(500)]
        )
        print(f"   List as queue: {time_list_queue:.6f}s (inefficient - O(n) for pop(0))")

        # Deque as queue (efficient)
        queue_deque = deque()
        _, time_deque_queue, _ = self.measure_performance(
            lambda: [queue_deque.append(i) for i in range(1000)] +
                   [queue_deque.popleft() for _ in range(500)]
        )
        print(f"   Deque as queue: {time_deque_queue:.6f}s (efficient - O(1) operations)")

        # Unique item tracking
        print("\n3. Unique Item Tracking:")

        items = [random.randint(0, size//2) for _ in range(size)]

        # Using list (inefficient)
        unique_list = []
        _, time_list_unique, _ = self.measure_performance(
            lambda: [unique_list.append(item) for item in items if item not in unique_list]
        )
        print(f"   List for unique items: {time_list_unique:.6f}s (O(n²) complexity)")

        # Using set (efficient)
        unique_set = set()
        _, time_set_unique, _ = self.measure_performance(
            lambda: [unique_set.add(item) for item in items]
        )
        print(f"   Set for unique items: {time_set_unique:.6f}s (O(n) complexity)")

        # Counting operations
        print("\n4. Counting Operations:")

        # Manual counting with dict
        count_dict = {}
        _, time_manual_count, _ = self.measure_performance(
            lambda: [count_dict.update({item: count_dict.get(item, 0) + 1}) for item in items]
        )
        print(f"   Manual dict counting: {time_manual_count:.6f}s")

        # Using defaultdict
        count_defaultdict = defaultdict(int)
        _, time_defaultdict_count, _ = self.measure_performance(
            lambda: [count_defaultdict.__setitem__(item, count_defaultdict[item] + 1) for item in items]
        )
        print(f"   defaultdict counting: {time_defaultdict_count:.6f}s")

        # Using Counter
        _, time_counter, _ = self.measure_performance(
            lambda: Counter(items)
        )
        print(f"   Counter counting: {time_counter:.6f}s")


class WebApplicationDataStructures:
    """Data structures optimized for web applications"""

    def __init__(self):
        self.user_sessions = {}  # Dict for O(1) session lookup
        self.active_connections = set()  # Set for O(1) connection tracking
        self.request_queue = deque()  # Deque for efficient queue operations
        self.user_activity = defaultdict(list)  # defaultdict for automatic list creation
        self.page_views = Counter()  # Counter for automatic counting
        self.recent_requests = deque(maxlen=1000)  # Fixed-size deque for recent items

    def add_user_session(self, user_id: str, session_data: dict):
        """Add user session - O(1)"""
        self.user_sessions[user_id] = {
            'data': session_data,
            'created_at': time.time(),
            'last_activity': time.time()
        }

    def get_user_session(self, user_id: str) -> dict:
        """Get user session - O(1)"""
        session = self.user_sessions.get(user_id)
        if session:
            session['last_activity'] = time.time()
        return session

    def add_active_connection(self, connection_id: str):
        """Track active connection - O(1)"""
        self.active_connections.add(connection_id)

    def remove_active_connection(self, connection_id: str):
        """Remove active connection - O(1)"""
        self.active_connections.discard(connection_id)

    def is_connection_active(self, connection_id: str) -> bool:
        """Check if connection is active - O(1)"""
        return connection_id in self.active_connections

    def enqueue_request(self, request_data: dict):
        """Add request to processing queue - O(1)"""
        self.request_queue.append({
            'data': request_data,
            'timestamp': time.time(),
            'id': f"req_{len(self.request_queue)}"
        })

    def dequeue_request(self) -> dict:
        """Get next request from queue - O(1)"""
        try:
            return self.request_queue.popleft()
        except IndexError:
            return None

    def log_user_activity(self, user_id: str, activity: str):
        """Log user activity - O(1)"""
        self.user_activity[user_id].append({
            'activity': activity,
            'timestamp': time.time()
        })

    def track_page_view(self, page_url: str):
        """Track page view - O(1)"""
        self.page_views[page_url] += 1

    def add_recent_request(self, request_info: dict):
        """Add to recent requests (auto-removes old ones) - O(1)"""
        self.recent_requests.append({
            'info': request_info,
            'timestamp': time.time()
        })

    def get_statistics(self) -> dict:
        """Get application statistics"""
        return {
            'active_sessions': len(self.user_sessions),
            'active_connections': len(self.active_connections),
            'pending_requests': len(self.request_queue),
            'total_users_with_activity': len(self.user_activity),
            'most_viewed_pages': self.page_views.most_common(10),
            'recent_requests_count': len(self.recent_requests)
        }


class AdvancedDataStructures:
    """Advanced data structures for specific use cases"""

    def __init__(self):
        self.priority_queue = []  # Heap for priority queue
        self.sorted_list = []  # Sorted list for binary search
        self.lru_cache = {}  # LRU cache implementation
        self.cache_order = deque()  # Track cache access order
        self.max_cache_size = 1000

    def add_priority_task(self, priority: int, task: dict):
        """Add task with priority - O(log n)"""
        heapq.heappush(self.priority_queue, (priority, time.time(), task))

    def get_highest_priority_task(self) -> dict:
        """Get highest priority task - O(log n)"""
        try:
            priority, timestamp, task = heapq.heappop(self.priority_queue)
            return {
                'priority': priority,
                'timestamp': timestamp,
                'task': task
            }
        except IndexError:
            return None

    def binary_search_insert(self, value: int):
        """Insert value maintaining sorted order - O(log n) for search, O(n) for insert"""
        pos = bisect.bisect_left(self.sorted_list, value)
        self.sorted_list.insert(pos, value)

    def binary_search_find(self, value: int) -> bool:
        """Find value using binary search - O(log n)"""
        pos = bisect.bisect_left(self.sorted_list, value)
        return pos < len(self.sorted_list) and self.sorted_list[pos] == value

    def lru_cache_get(self, key: str) -> Any:
        """Get from LRU cache - O(1)"""
        if key in self.lru_cache:
            # Move to end (most recently used)
            self.cache_order.remove(key)
            self.cache_order.append(key)
            return self.lru_cache[key]
        return None

    def lru_cache_put(self, key: str, value: Any):
        """Put in LRU cache - O(1)"""
        if key in self.lru_cache:
            # Update existing
            self.cache_order.remove(key)
        elif len(self.lru_cache) >= self.max_cache_size:
            # Remove least recently used
            oldest_key = self.cache_order.popleft()
            del self.lru_cache[oldest_key]

        self.lru_cache[key] = value
        self.cache_order.append(key)


class MemoryOptimization:
    """Memory optimization techniques for data structures"""

    def __init__(self):
        # Using __slots__ to reduce memory overhead
        pass

    @staticmethod
    def compare_memory_usage():
        """Compare memory usage of different approaches"""
        print("\n=== Memory Usage Comparison ===")

        # Regular class vs class with __slots__
        class RegularUser:
            def __init__(self, name, email, age):
                self.name = name
                self.email = email
                self.age = age

        class SlottedUser:
            __slots__ = ['name', 'email', 'age']
            def __init__(self, name, email, age):
                self.name = name
                self.email = email
                self.age = age

        # Named tuple (immutable, memory efficient)
        UserTuple = namedtuple('User', ['name', 'email', 'age'])

        # Dataclass
        @dataclass
        class DataclassUser:
            name: str
            email: str
            age: int

        # Memory usage comparison
        regular_users = [RegularUser(f"user_{i}", f"user_{i}@example.com", 25) for i in range(1000)]
        slotted_users = [SlottedUser(f"user_{i}", f"user_{i}@example.com", 25) for i in range(1000)]
        tuple_users = [UserTuple(f"user_{i}", f"user_{i}@example.com", 25) for i in range(1000)]
        dataclass_users = [DataclassUser(f"user_{i}", f"user_{i}@example.com", 25) for i in range(1000)]

        print(f"Regular class size: {sys.getsizeof(regular_users[0])} bytes")
        print(f"Slotted class size: {sys.getsizeof(slotted_users[0])} bytes")
        print(f"Named tuple size: {sys.getsizeof(tuple_users[0])} bytes")
        print(f"Dataclass size: {sys.getsizeof(dataclass_users[0])} bytes")

        # Generator vs list for large datasets
        def number_generator(n):
            for i in range(n):
                yield i ** 2

        # List comprehension (stores all in memory)
        list_squares = [i ** 2 for i in range(10000)]

        # Generator (lazy evaluation)
        gen_squares = number_generator(10000)

        print(f"\nList comprehension memory: {sys.getsizeof(list_squares)} bytes")
        print(f"Generator memory: {sys.getsizeof(gen_squares)} bytes")


if __name__ == '__main__':
    print("Python Data Structures Performance Analysis")
    print("=" * 50)

    # Run benchmarks
    analyzer = DataStructureAnalyzer()
    analyzer.benchmark_list_operations()
    analyzer.benchmark_dict_operations()
    analyzer.benchmark_set_operations()
    analyzer.benchmark_deque_operations()
    analyzer.compare_data_structures_for_common_operations()

    # Web application examples
    print("\n" + "=" * 50)
    print("Web Application Data Structure Usage")

    web_app = WebApplicationDataStructures()

    # Simulate web application operations
    for i in range(100):
        web_app.add_user_session(f"user_{i}", {'preferences': f"pref_{i}"})
        web_app.add_active_connection(f"conn_{i}")
        web_app.enqueue_request({'url': f'/api/endpoint_{i}', 'method': 'GET'})
        web_app.log_user_activity(f"user_{i}", f"action_{i}")
        web_app.track_page_view(f"/page_{i % 10}")
        web_app.add_recent_request({'user': f"user_{i}", 'endpoint': f"endpoint_{i}"})

    stats = web_app.get_statistics()
    print(f"\nWeb Application Statistics:")
    for key, value in stats.items():
        print(f"  {key}: {value}")

    # Advanced data structures
    print("\n" + "=" * 50)
    print("Advanced Data Structures")

    advanced = AdvancedDataStructures()

    # Priority queue example
    for i in range(10):
        advanced.add_priority_task(random.randint(1, 10), {'task_id': i})

    print("\nProcessing tasks by priority:")
    for _ in range(5):
        task = advanced.get_highest_priority_task()
        if task:
            print(f"  Priority {task['priority']}: Task {task['task']['task_id']}")

    # Memory optimization
    memory_opt = MemoryOptimization()
    memory_opt.compare_memory_usage()
```

**Data Structure Selection Guidelines:**

1. **Lists**: Use for ordered data, frequent appends, indexed access
2. **Dictionaries**: Use for key-value mapping, fast lookups, caching
3. **Sets**: Use for unique items, membership testing, set operations
4. **Deques**: Use for queues, stacks, sliding windows
5. **Counter**: Use for counting occurrences
6. **defaultdict**: Use when you need default values for missing keys
7. **OrderedDict**: Use when insertion order matters (Python 3.7+ dicts maintain order)
8. **Named Tuples**: Use for immutable records with named fields

---

### Q14: How do you implement effective error handling and exception management in Python web applications?

**Difficulty: Medium**

**Answer:**
Effective error handling is crucial for building robust Python web applications that gracefully handle failures and provide meaningful feedback to users and developers.

**Comprehensive Error Handling Implementation:**

```python
#!/usr/bin/env python3
"""
Python Web Application Error Handling
Comprehensive error handling and exception management
"""

import logging
import traceback
import sys
import json
import time
from datetime import datetime, timezone
from typing import Dict, Any, Optional, List, Union, Type
from functools import wraps
from contextlib import contextmanager
from enum import Enum
from dataclasses import dataclass, asdict
import uuid
import threading
from collections import defaultdict, deque
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests
import os
from pathlib import Path


class ErrorSeverity(Enum):
    """Error severity levels"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class ErrorCategory(Enum):
    """Error category classification"""
    VALIDATION = "validation"
    AUTHENTICATION = "authentication"
    AUTHORIZATION = "authorization"
    DATABASE = "database"
    EXTERNAL_API = "external_api"
    BUSINESS_LOGIC = "business_logic"
    SYSTEM = "system"
    NETWORK = "network"
    CONFIGURATION = "configuration"


@dataclass
class ErrorContext:
    """Error context information"""
    error_id: str
    timestamp: str
    severity: ErrorSeverity
    category: ErrorCategory
    message: str
    exception_type: str
    stack_trace: str
    user_id: Optional[str] = None
    request_id: Optional[str] = None
    endpoint: Optional[str] = None
    method: Optional[str] = None
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None
    additional_data: Optional[Dict[str, Any]] = None


class CustomException(Exception):
    """Base custom exception class"""

    def __init__(self, message: str, error_code: str = None,
                 severity: ErrorSeverity = ErrorSeverity.MEDIUM,
                 category: ErrorCategory = ErrorCategory.BUSINESS_LOGIC,
                 additional_data: Dict[str, Any] = None):
        super().__init__(message)
        self.message = message
        self.error_code = error_code or self.__class__.__name__
        self.severity = severity
        self.category = category
        self.additional_data = additional_data or {}
        self.timestamp = datetime.now(timezone.utc).isoformat()


class ValidationError(CustomException):
    """Validation error exception"""

    def __init__(self, message: str, field: str = None, value: Any = None, **kwargs):
        super().__init__(message, category=ErrorCategory.VALIDATION, **kwargs)
        self.field = field
        self.value = value
        if field:
            self.additional_data['field'] = field
        if value is not None:
            self.additional_data['value'] = str(value)


class AuthenticationError(CustomException):
    """Authentication error exception"""

    def __init__(self, message: str = "Authentication failed", **kwargs):
        super().__init__(message, category=ErrorCategory.AUTHENTICATION,
                        severity=ErrorSeverity.HIGH, **kwargs)


class AuthorizationError(CustomException):
    """Authorization error exception"""

    def __init__(self, message: str = "Access denied", resource: str = None, **kwargs):
        super().__init__(message, category=ErrorCategory.AUTHORIZATION,
                        severity=ErrorSeverity.HIGH, **kwargs)
        if resource:
            self.additional_data['resource'] = resource


class DatabaseError(CustomException):
    """Database error exception"""

    def __init__(self, message: str, operation: str = None, table: str = None, **kwargs):
        super().__init__(message, category=ErrorCategory.DATABASE,
                        severity=ErrorSeverity.HIGH, **kwargs)
        if operation:
            self.additional_data['operation'] = operation
        if table:
            self.additional_data['table'] = table


class ExternalAPIError(CustomException):
    """External API error exception"""

    def __init__(self, message: str, api_name: str = None, status_code: int = None,
                 response_body: str = None, **kwargs):
        super().__init__(message, category=ErrorCategory.EXTERNAL_API, **kwargs)
        if api_name:
            self.additional_data['api_name'] = api_name
        if status_code:
            self.additional_data['status_code'] = status_code
        if response_body:
            self.additional_data['response_body'] = response_body


class BusinessLogicError(CustomException):
    """Business logic error exception"""

    def __init__(self, message: str, business_rule: str = None, **kwargs):
        super().__init__(message, category=ErrorCategory.BUSINESS_LOGIC, **kwargs)
        if business_rule:
            self.additional_data['business_rule'] = business_rule


class ErrorHandler:
    """Centralized error handling system"""

    def __init__(self, logger: logging.Logger = None):
        self.logger = logger or logging.getLogger(__name__)
        self.error_history = deque(maxlen=10000)
        self.error_counts = defaultdict(int)
        self.notification_handlers = []
        self._context = threading.local()

    def set_context(self, **kwargs):
        """Set error context for current thread"""
        if not hasattr(self._context, 'data'):
            self._context.data = {}
        self._context.data.update(kwargs)

    def get_context(self) -> Dict[str, Any]:
        """Get current error context"""
        return getattr(self._context, 'data', {})

    def clear_context(self):
        """Clear error context"""
        if hasattr(self._context, 'data'):
            self._context.data.clear()

    def handle_exception(self, exception: Exception,
                        severity: ErrorSeverity = None,
                        category: ErrorCategory = None,
                        additional_data: Dict[str, Any] = None) -> ErrorContext:
        """Handle any exception and create error context"""

        # Determine severity and category
        if isinstance(exception, CustomException):
            severity = severity or exception.severity
            category = category or exception.category
            error_code = exception.error_code
            additional_data = {**(exception.additional_data or {}), **(additional_data or {})}
        else:
            severity = severity or ErrorSeverity.MEDIUM
            category = category or ErrorCategory.SYSTEM
            error_code = exception.__class__.__name__
            additional_data = additional_data or {}

        # Get current context
        context = self.get_context()

        # Create error context
        error_context = ErrorContext(
            error_id=str(uuid.uuid4()),
            timestamp=datetime.now(timezone.utc).isoformat(),
            severity=severity,
            category=category,
            message=str(exception),
            exception_type=exception.__class__.__name__,
            stack_trace=traceback.format_exc(),
            user_id=context.get('user_id'),
            request_id=context.get('request_id'),
            endpoint=context.get('endpoint'),
            method=context.get('method'),
            user_agent=context.get('user_agent'),
            ip_address=context.get('ip_address'),
            additional_data=additional_data
        )

        # Log error
        self._log_error(error_context)

        # Store error
        self.error_history.append(error_context)
        self.error_counts[f"{category.value}:{error_code}"] += 1

        # Send notifications if critical
        if severity == ErrorSeverity.CRITICAL:
            self._send_notifications(error_context)

        return error_context

    def _log_error(self, error_context: ErrorContext):
        """Log error with appropriate level"""
        log_data = asdict(error_context)

        if error_context.severity == ErrorSeverity.CRITICAL:
            self.logger.critical(f"CRITICAL ERROR: {error_context.message}", extra=log_data)
        elif error_context.severity == ErrorSeverity.HIGH:
            self.logger.error(f"HIGH SEVERITY: {error_context.message}", extra=log_data)
        elif error_context.severity == ErrorSeverity.MEDIUM:
            self.logger.warning(f"MEDIUM SEVERITY: {error_context.message}", extra=log_data)
        else:
            self.logger.info(f"LOW SEVERITY: {error_context.message}", extra=log_data)

    def add_notification_handler(self, handler: callable):
        """Add notification handler for critical errors"""
        self.notification_handlers.append(handler)

    def _send_notifications(self, error_context: ErrorContext):
        """Send notifications for critical errors"""
        for handler in self.notification_handlers:
            try:
                handler(error_context)
            except Exception as e:
                self.logger.error(f"Failed to send notification: {e}")

    def get_error_statistics(self) -> Dict[str, Any]:
        """Get error statistics"""
        total_errors = len(self.error_history)

        if total_errors == 0:
            return {'total_errors': 0}

        # Count by severity
        severity_counts = defaultdict(int)
        category_counts = defaultdict(int)
        recent_errors = []

        for error in self.error_history:
            severity_counts[error.severity.value] += 1
            category_counts[error.category.value] += 1

            # Get recent errors (last hour)
            error_time = datetime.fromisoformat(error.timestamp)
            if (datetime.now(timezone.utc) - error_time).total_seconds() < 3600:
                recent_errors.append(error)

        return {
            'total_errors': total_errors,
            'severity_breakdown': dict(severity_counts),
            'category_breakdown': dict(category_counts),
            'recent_errors_count': len(recent_errors),
            'error_rate_per_hour': len(recent_errors),
            'most_common_errors': sorted(
                self.error_counts.items(),
                key=lambda x: x[1],
                reverse=True
            )[:10]
        }


def error_handler_decorator(severity: ErrorSeverity = ErrorSeverity.MEDIUM,
                          category: ErrorCategory = ErrorCategory.BUSINESS_LOGIC,
                          reraise: bool = True,
                          default_return: Any = None):
    """Decorator for automatic error handling"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                error_context = error_handler.handle_exception(
                    e, severity=severity, category=category
                )

                if reraise:
                    raise
                else:
                    return default_return
        return wrapper
    return decorator


@contextmanager
def error_context(user_id: str = None, request_id: str = None,
                 endpoint: str = None, method: str = None,
                 user_agent: str = None, ip_address: str = None):
    """Context manager for error handling"""
    # Set context
    error_handler.set_context(
        user_id=user_id,
        request_id=request_id,
        endpoint=endpoint,
        method=method,
        user_agent=user_agent,
        ip_address=ip_address
    )

    try:
        yield
    except Exception as e:
        error_context = error_handler.handle_exception(e)
        raise
    finally:
        error_handler.clear_context()


class RetryHandler:
    """Retry mechanism for transient failures"""

    @staticmethod
    def retry_with_backoff(max_retries: int = 3, backoff_factor: float = 1.0,
                          exceptions: tuple = (Exception,)):
        """Retry decorator with exponential backoff"""
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                last_exception = None

                for attempt in range(max_retries + 1):
                    try:
                        return func(*args, **kwargs)
                    except exceptions as e:
                        last_exception = e

                        if attempt == max_retries:
                            # Log final failure
                            error_handler.handle_exception(
                                e,
                                severity=ErrorSeverity.HIGH,
                                additional_data={
                                    'max_retries_exceeded': True,
                                    'attempts': attempt + 1
                                }
                            )
                            raise

                        # Calculate backoff time
                        backoff_time = backoff_factor * (2 ** attempt)

                        # Log retry attempt
                        error_handler.handle_exception(
                            e,
                            severity=ErrorSeverity.LOW,
                            additional_data={
                                'retry_attempt': attempt + 1,
                                'backoff_time': backoff_time,
                                'max_retries': max_retries
                            }
                        )

                        time.sleep(backoff_time)

                raise last_exception
            return wrapper
        return decorator


class CircuitBreaker:
    """Circuit breaker pattern for external service calls"""

    def __init__(self, failure_threshold: int = 5, timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = 'CLOSED'  # CLOSED, OPEN, HALF_OPEN

    def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection"""
        if self.state == 'OPEN':
            if time.time() - self.last_failure_time > self.timeout:
                self.state = 'HALF_OPEN'
            else:
                raise ExternalAPIError(
                    "Circuit breaker is OPEN",
                    additional_data={
                        'circuit_breaker_state': self.state,
                        'failure_count': self.failure_count
                    }
                )

        try:
            result = func(*args, **kwargs)

            # Success - reset circuit breaker
            if self.state == 'HALF_OPEN':
                self.state = 'CLOSED'
                self.failure_count = 0

            return result

        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()

            if self.failure_count >= self.failure_threshold:
                self.state = 'OPEN'

            error_handler.handle_exception(
                e,
                severity=ErrorSeverity.HIGH,
                category=ErrorCategory.EXTERNAL_API,
                additional_data={
                    'circuit_breaker_state': self.state,
                    'failure_count': self.failure_count
                }
            )

            raise


class ValidationFramework:
    """Input validation framework"""

    @staticmethod
    def validate_required(value: Any, field_name: str):
        """Validate required field"""
        if value is None or (isinstance(value, str) and not value.strip()):
            raise ValidationError(f"{field_name} is required", field=field_name, value=value)

    @staticmethod
    def validate_email(email: str, field_name: str = "email"):
        """Validate email format"""
        import re

        if not email or not isinstance(email, str):
            raise ValidationError(f"Invalid {field_name} format", field=field_name, value=email)

        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            raise ValidationError(f"Invalid {field_name} format", field=field_name, value=email)

    @staticmethod
    def validate_range(value: Union[int, float], min_val: Union[int, float],
                      max_val: Union[int, float], field_name: str):
        """Validate numeric range"""
        if not isinstance(value, (int, float)):
            raise ValidationError(f"{field_name} must be a number", field=field_name, value=value)

        if value < min_val or value > max_val:
            raise ValidationError(
                f"{field_name} must be between {min_val} and {max_val}",
                field=field_name,
                value=value,
                additional_data={'min_value': min_val, 'max_value': max_val}
            )

    @staticmethod
    def validate_length(value: str, min_length: int, max_length: int, field_name: str):
        """Validate string length"""
        if not isinstance(value, str):
            raise ValidationError(f"{field_name} must be a string", field=field_name, value=value)

        if len(value) < min_length or len(value) > max_length:
            raise ValidationError(
                f"{field_name} length must be between {min_length} and {max_length}",
                field=field_name,
                value=value,
                additional_data={'min_length': min_length, 'max_length': max_length, 'actual_length': len(value)}
            )


class NotificationHandlers:
    """Notification handlers for critical errors"""

    @staticmethod
    def email_notification(error_context: ErrorContext,
                          smtp_server: str = "localhost",
                          smtp_port: int = 587,
                          username: str = None,
                          password: str = None,
                          to_emails: List[str] = None):
        """Send email notification for critical errors"""
        if not to_emails:
            return

        try:
            msg = MIMEMultipart()
            msg['From'] = username or "noreply@example.com"
            msg['To'] = ", ".join(to_emails)
            msg['Subject'] = f"CRITICAL ERROR: {error_context.error_id}"

            body = f"""
            Critical Error Alert

            Error ID: {error_context.error_id}
            Timestamp: {error_context.timestamp}
            Severity: {error_context.severity.value}
            Category: {error_context.category.value}
            Message: {error_context.message}

            Request Details:
            - Request ID: {error_context.request_id}
            - Endpoint: {error_context.endpoint}
            - Method: {error_context.method}
            - User ID: {error_context.user_id}
            - IP Address: {error_context.ip_address}

            Stack Trace:
            {error_context.stack_trace}

            Additional Data:
            {json.dumps(error_context.additional_data, indent=2)}
            """

            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP(smtp_server, smtp_port)
            if username and password:
                server.starttls()
                server.login(username, password)

            server.send_message(msg)
            server.quit()

        except Exception as e:
            logging.error(f"Failed to send email notification: {e}")

    @staticmethod
    def slack_notification(error_context: ErrorContext, webhook_url: str):
        """Send Slack notification for critical errors"""
        try:
            payload = {
                "text": f"🚨 CRITICAL ERROR: {error_context.message}",
                "attachments": [
                    {
                        "color": "danger",
                        "fields": [
                            {"title": "Error ID", "value": error_context.error_id, "short": True},
                            {"title": "Severity", "value": error_context.severity.value, "short": True},
                            {"title": "Category", "value": error_context.category.value, "short": True},
                            {"title": "Endpoint", "value": error_context.endpoint or "N/A", "short": True},
                            {"title": "User ID", "value": error_context.user_id or "N/A", "short": True},
                            {"title": "Request ID", "value": error_context.request_id or "N/A", "short": True}
                        ],
                        "ts": int(datetime.fromisoformat(error_context.timestamp).timestamp())
                    }
                ]
            }

            response = requests.post(webhook_url, json=payload, timeout=10)
            response.raise_for_status()

        except Exception as e:
            logging.error(f"Failed to send Slack notification: {e}")


# Global error handler instance
error_handler = ErrorHandler()

# Add notification handlers
error_handler.add_notification_handler(
    lambda error_ctx: NotificationHandlers.email_notification(
        error_ctx,
        to_emails=["admin@example.com"]
    )
)


# Example usage in web application
def example_web_endpoint(request_data: Dict[str, Any]):
    """Example web endpoint with comprehensive error handling"""

    with error_context(
        user_id=request_data.get('user_id'),
        request_id=request_data.get('request_id'),
        endpoint='/api/example',
        method='POST'
    ):
        try:
            # Input validation
            ValidationFramework.validate_required(request_data.get('email'), 'email')
            ValidationFramework.validate_email(request_data.get('email'))
            ValidationFramework.validate_required(request_data.get('age'), 'age')
            ValidationFramework.validate_range(request_data.get('age'), 18, 120, 'age')

            # Business logic
            result = process_user_data(request_data)

            return {'success': True, 'data': result}

        except ValidationError as e:
            # Validation errors are handled gracefully
            return {
                'success': False,
                'error': {
                    'type': 'validation_error',
                    'message': e.message,
                    'field': e.additional_data.get('field'),
                    'error_id': error_handler.handle_exception(e).error_id
                }
            }

        except AuthenticationError as e:
            return {
                'success': False,
                'error': {
                    'type': 'authentication_error',
                    'message': 'Authentication required',
                    'error_id': error_handler.handle_exception(e).error_id
                }
            }

        except Exception as e:
            # Unexpected errors
            error_context = error_handler.handle_exception(
                e,
                severity=ErrorSeverity.HIGH
            )

            return {
                'success': False,
                'error': {
                    'type': 'internal_error',
                    'message': 'An unexpected error occurred',
                    'error_id': error_context.error_id
                }
            }


@error_handler_decorator(severity=ErrorSeverity.MEDIUM, category=ErrorCategory.BUSINESS_LOGIC)
def process_user_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Process user data with automatic error handling"""

    # Simulate business logic that might fail
    if data.get('email') == 'test@error.com':
        raise BusinessLogicError(
            "Test email not allowed",
            business_rule="email_validation",
            additional_data={'rejected_email': data.get('email')}
        )

    return {
        'user_id': str(uuid.uuid4()),
        'email': data['email'],
        'age': data['age'],
        'processed_at': datetime.now(timezone.utc).isoformat()
    }


@RetryHandler.retry_with_backoff(max_retries=3, exceptions=(ExternalAPIError,))
def call_external_api(url: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """Call external API with retry logic"""
    try:
        response = requests.post(url, json=data, timeout=10)

        if response.status_code >= 400:
            raise ExternalAPIError(
                f"API call failed with status {response.status_code}",
                api_name="external_service",
                status_code=response.status_code,
                response_body=response.text
            )

        return response.json()

    except requests.RequestException as e:
        raise ExternalAPIError(
            f"Network error calling external API: {str(e)}",
            api_name="external_service"
        )


if __name__ == '__main__':
    # Example usage

    # Test validation errors
    try:
        example_web_endpoint({
            'user_id': '123',
            'request_id': 'req_456',
            'email': 'invalid-email',
            'age': 15
        })
    except Exception as e:
        print(f"Caught exception: {e}")

    # Test business logic error
    try:
        example_web_endpoint({
            'user_id': '123',
            'request_id': 'req_789',
            'email': 'test@error.com',
            'age': 25
        })
    except Exception as e:
        print(f"Caught exception: {e}")

    # Get error statistics
    stats = error_handler.get_error_statistics()
    print(f"\nError Statistics: {json.dumps(stats, indent=2)}")
```

**Error Handling Best Practices:**

1. **Use Custom Exceptions**: Create specific exception types for different error categories
2. **Centralized Error Handling**: Use a centralized error handler for consistent processing
3. **Context Preservation**: Maintain request context for better error tracking
4. **Graceful Degradation**: Handle errors gracefully without breaking the application
5. **Retry Logic**: Implement retry mechanisms for transient failures
6. **Circuit Breaker**: Use circuit breaker pattern for external service calls
7. **Comprehensive Logging**: Log errors with sufficient context for debugging
8. **User-Friendly Messages**: Provide meaningful error messages to users
9. **Monitoring and Alerting**: Set up monitoring and alerting for critical errors
10. **Error Recovery**: Implement error recovery strategies where possible

---

### Q15: Explain Python deployment strategies and containerization for web applications.

**Difficulty: Medium**

**Answer:**
Python web application deployment involves various strategies and tools to ensure reliable, scalable, and maintainable production environments.

**Comprehensive Deployment Implementation:**

```python
#!/usr/bin/env python3
"""
Python Web Application Deployment
Comprehensive deployment strategies and containerization
"""

import os
import sys
import json
import yaml
import subprocess
import shutil
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
from enum import Enum
import tempfile
import tarfile
import zipfile
from datetime import datetime
import logging
import configparser
from jinja2 import Template
import requests
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import base64


class DeploymentEnvironment(Enum):
    """Deployment environment types"""
    DEVELOPMENT = "development"
    STAGING = "staging"
    PRODUCTION = "production"
    TESTING = "testing"


class DeploymentStrategy(Enum):
    """Deployment strategy types"""
    BLUE_GREEN = "blue_green"
    ROLLING = "rolling"
    CANARY = "canary"
    RECREATE = "recreate"


@dataclass
class DeploymentConfig:
    """Deployment configuration"""
    app_name: str
    version: str
    environment: DeploymentEnvironment
    strategy: DeploymentStrategy
    replicas: int
    resources: Dict[str, Any]
    environment_variables: Dict[str, str]
    secrets: Dict[str, str]
    health_check: Dict[str, Any]
    rollback_enabled: bool = True
    auto_scaling: bool = False
    monitoring_enabled: bool = True


class DockerManager:
    """Docker container management"""

    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.dockerfile_path = self.project_path / "Dockerfile"
        self.dockerignore_path = self.project_path / ".dockerignore"
        self.compose_path = self.project_path / "docker-compose.yml"

    def generate_dockerfile(self, python_version: str = "3.11",
                           app_type: str = "web") -> str:
        """Generate optimized Dockerfile"""

        if app_type == "web":
            dockerfile_template = """
# Multi-stage build for Python web application
FROM python:{{ python_version }}-slim as builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Production stage
FROM python:{{ python_version }}-slim as production

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH"

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r appuser && useradd -r -g appuser appuser

# Copy virtual environment from builder stage
COPY --from=builder /opt/venv /opt/venv

# Set working directory
WORKDIR /app

# Copy application code
COPY . .

# Change ownership to appuser
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "main:app"]
            """

        elif app_type == "worker":
            dockerfile_template = """
# Worker application Dockerfile
FROM python:{{ python_version }}-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r worker && useradd -r -g worker worker

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy application code
COPY . .

# Change ownership
RUN chown -R worker:worker /app

# Switch to non-root user
USER worker

# Run worker
CMD ["celery", "worker", "-A", "app.celery", "--loglevel=info"]
            """

        template = Template(dockerfile_template)
        dockerfile_content = template.render(python_version=python_version)

        with open(self.dockerfile_path, 'w') as f:
            f.write(dockerfile_content)

        return dockerfile_content

    def generate_dockerignore(self) -> str:
        """Generate .dockerignore file"""
        dockerignore_content = """
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
PIPFILE.lock

# Virtual environments
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Git
.git/
.gitignore

# Documentation
*.md
docs/

# Testing
.pytest_cache/
.coverage
htmlcov/
.tox/

# Logs
*.log
logs/

# Environment files
.env
.env.local
.env.*.local

# Database
*.db
*.sqlite3

# Temporary files
tmp/
temp/
        """

        with open(self.dockerignore_path, 'w') as f:
            f.write(dockerignore_content)

        return dockerignore_content

    def generate_docker_compose(self, config: DeploymentConfig) -> str:
        """Generate docker-compose.yml"""
        compose_template = """
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    image: {{ config.app_name }}:{{ config.version }}
    container_name: {{ config.app_name }}_web
    ports:
      - "8000:8000"
    environment:
{% for key, value in config.environment_variables.items() %}
      - {{ key }}={{ value }}
{% endfor %}
    volumes:
      - ./logs:/app/logs
    depends_on:
      - redis
      - postgres
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '{{ config.resources.get("cpu_limit", "1.0") }}'
          memory: {{ config.resources.get("memory_limit", "512M") }}
        reservations:
          cpus: '{{ config.resources.get("cpu_request", "0.5") }}'
          memory: {{ config.resources.get("memory_request", "256M") }}

  worker:
    build:
      context: .
      dockerfile: Dockerfile.worker
    image: {{ config.app_name }}_worker:{{ config.version }}
    container_name: {{ config.app_name }}_worker
    environment:
{% for key, value in config.environment_variables.items() %}
      - {{ key }}={{ value }}
{% endfor %}
    volumes:
      - ./logs:/app/logs
    depends_on:
      - redis
      - postgres
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: {{ config.app_name }}_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    command: redis-server --appendonly yes

  postgres:
    image: postgres:15-alpine
    container_name: {{ config.app_name }}_postgres
    environment:
      - POSTGRES_DB={{ config.environment_variables.get("DATABASE_NAME", "app_db") }}
      - POSTGRES_USER={{ config.environment_variables.get("DATABASE_USER", "app_user") }}
      - POSTGRES_PASSWORD={{ config.secrets.get("DATABASE_PASSWORD", "changeme") }}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: {{ config.app_name }}_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    name: {{ config.app_name }}_network
        """

        template = Template(compose_template)
        compose_content = template.render(config=config)

        with open(self.compose_path, 'w') as f:
            f.write(compose_content)

        return compose_content

    def build_image(self, tag: str, build_args: Dict[str, str] = None) -> bool:
        """Build Docker image"""
        try:
            cmd = ["docker", "build", "-t", tag, "."]

            if build_args:
                for key, value in build_args.items():
                    cmd.extend(["--build-arg", f"{key}={value}"])

            result = subprocess.run(
                cmd,
                cwd=self.project_path,
                capture_output=True,
                text=True,
                check=True
            )

            logging.info(f"Successfully built image: {tag}")
            return True

        except subprocess.CalledProcessError as e:
            logging.error(f"Failed to build image: {e.stderr}")
            return False

    def push_image(self, tag: str, registry: str = None) -> bool:
        """Push Docker image to registry"""
        try:
            if registry:
                full_tag = f"{registry}/{tag}"
                # Tag for registry
                subprocess.run(
                    ["docker", "tag", tag, full_tag],
                    check=True
                )
                tag = full_tag

            # Push image
            subprocess.run(
                ["docker", "push", tag],
                check=True
            )

            logging.info(f"Successfully pushed image: {tag}")
            return True

        except subprocess.CalledProcessError as e:
            logging.error(f"Failed to push image: {e}")
            return False


class KubernetesManager:
    """Kubernetes deployment management"""

    def __init__(self, namespace: str = "default"):
        self.namespace = namespace

    def generate_deployment_yaml(self, config: DeploymentConfig) -> str:
        """Generate Kubernetes deployment YAML"""
        deployment_template = """
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ config.app_name }}
  namespace: {{ namespace }}
  labels:
    app: {{ config.app_name }}
    version: {{ config.version }}
    environment: {{ config.environment.value }}
spec:
  replicas: {{ config.replicas }}
  strategy:
    type: {{ "RollingUpdate" if config.strategy == DeploymentStrategy.ROLLING else "Recreate" }}
    {% if config.strategy == DeploymentStrategy.ROLLING %}
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
    {% endif %}
  selector:
    matchLabels:
      app: {{ config.app_name }}
  template:
    metadata:
      labels:
        app: {{ config.app_name }}
        version: {{ config.version }}
    spec:
      containers:
      - name: {{ config.app_name }}
        image: {{ config.app_name }}:{{ config.version }}
        ports:
        - containerPort: 8000
          name: http
        env:
        {% for key, value in config.environment_variables.items() %}
        - name: {{ key }}
          value: "{{ value }}"
        {% endfor %}
        {% for key, value in config.secrets.items() %}
        - name: {{ key }}
          valueFrom:
            secretKeyRef:
              name: {{ config.app_name }}-secrets
              key: {{ key }}
        {% endfor %}
        resources:
          limits:
            cpu: {{ config.resources.get("cpu_limit", "1000m") }}
            memory: {{ config.resources.get("memory_limit", "512Mi") }}
          requests:
            cpu: {{ config.resources.get("cpu_request", "500m") }}
            memory: {{ config.resources.get("memory_request", "256Mi") }}
        livenessProbe:
          httpGet:
            path: {{ config.health_check.get("path", "/health") }}
            port: 8000
          initialDelaySeconds: {{ config.health_check.get("initial_delay", 30) }}
          periodSeconds: {{ config.health_check.get("period", 10) }}
          timeoutSeconds: {{ config.health_check.get("timeout", 5) }}
          failureThreshold: {{ config.health_check.get("failure_threshold", 3) }}
        readinessProbe:
          httpGet:
            path: {{ config.health_check.get("path", "/health") }}
            port: 8000
          initialDelaySeconds: {{ config.health_check.get("initial_delay", 5) }}
          periodSeconds: {{ config.health_check.get("period", 5) }}
          timeoutSeconds: {{ config.health_check.get("timeout", 3) }}
          failureThreshold: {{ config.health_check.get("failure_threshold", 3) }}
        {% if config.environment == DeploymentEnvironment.PRODUCTION %}
        securityContext:
          runAsNonRoot: true
          runAsUser: 1000
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
        {% endif %}
      {% if config.environment == DeploymentEnvironment.PRODUCTION %}
      securityContext:
        fsGroup: 1000
      {% endif %}
---
apiVersion: v1
kind: Service
metadata:
  name: {{ config.app_name }}-service
  namespace: {{ namespace }}
  labels:
    app: {{ config.app_name }}
spec:
  selector:
    app: {{ config.app_name }}
  ports:
  - port: 80
    targetPort: 8000
    protocol: TCP
    name: http
  type: ClusterIP
{% if config.auto_scaling %}
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ config.app_name }}-hpa
  namespace: {{ namespace }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ config.app_name }}
  minReplicas: {{ config.replicas }}
  maxReplicas: {{ config.replicas * 3 }}
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
{% endif %}
        """

        template = Template(deployment_template)
        return template.render(
            config=config,
            namespace=self.namespace,
            DeploymentStrategy=DeploymentStrategy
        )

    def generate_secrets_yaml(self, config: DeploymentConfig) -> str:
        """Generate Kubernetes secrets YAML"""
        secrets_template = """
apiVersion: v1
kind: Secret
metadata:
  name: {{ config.app_name }}-secrets
  namespace: {{ namespace }}
type: Opaque
data:
{% for key, value in config.secrets.items() %}
  {{ key }}: {{ value | b64encode }}
{% endfor %}
        """

        template = Template(secrets_template)
        return template.render(
            config=config,
            namespace=self.namespace
        )

    def apply_manifests(self, manifests: List[str]) -> bool:
        """Apply Kubernetes manifests"""
        try:
            for manifest in manifests:
                with tempfile.NamedTemporaryFile(mode='w', suffix='.yaml', delete=False) as f:
                    f.write(manifest)
                    f.flush()

                    subprocess.run(
                        ["kubectl", "apply", "-f", f.name],
                        check=True
                    )

                    os.unlink(f.name)

            logging.info("Successfully applied Kubernetes manifests")
            return True

        except subprocess.CalledProcessError as e:
            logging.error(f"Failed to apply manifests: {e}")
            return False


class DeploymentManager:
    """Main deployment management class"""

    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.docker_manager = DockerManager(project_path)
        self.k8s_manager = KubernetesManager()
        self.deployment_history = []

    def prepare_deployment(self, config: DeploymentConfig) -> bool:
        """Prepare deployment artifacts"""
        try:
            # Generate Dockerfile
            self.docker_manager.generate_dockerfile()

            # Generate .dockerignore
            self.docker_manager.generate_dockerignore()

            # Generate docker-compose.yml
            self.docker_manager.generate_docker_compose(config)

            # Generate requirements.txt if not exists
            self._generate_requirements_file()

            # Generate configuration files
            self._generate_config_files(config)

            logging.info("Deployment preparation completed")
            return True

        except Exception as e:
            logging.error(f"Failed to prepare deployment: {e}")
            return False

    def deploy_to_docker(self, config: DeploymentConfig) -> bool:
        """Deploy using Docker Compose"""
        try:
            # Build image
            image_tag = f"{config.app_name}:{config.version}"
            if not self.docker_manager.build_image(image_tag):
                return False

            # Deploy with docker-compose
            subprocess.run(
                ["docker-compose", "up", "-d"],
                cwd=self.project_path,
                check=True
            )

            # Wait for health check
            if self._wait_for_health_check(config):
                logging.info("Docker deployment successful")
                self._record_deployment(config, "docker", True)
                return True
            else:
                logging.error("Health check failed")
                return False

        except subprocess.CalledProcessError as e:
            logging.error(f"Docker deployment failed: {e}")
            self._record_deployment(config, "docker", False)
            return False

    def deploy_to_kubernetes(self, config: DeploymentConfig) -> bool:
        """Deploy to Kubernetes"""
        try:
            # Generate manifests
            deployment_yaml = self.k8s_manager.generate_deployment_yaml(config)
            secrets_yaml = self.k8s_manager.generate_secrets_yaml(config)

            # Apply manifests
            if self.k8s_manager.apply_manifests([secrets_yaml, deployment_yaml]):
                # Wait for rollout
                if self._wait_for_k8s_rollout(config):
                    logging.info("Kubernetes deployment successful")
                    self._record_deployment(config, "kubernetes", True)
                    return True
                else:
                    logging.error("Kubernetes rollout failed")
                    return False
            else:
                return False

        except Exception as e:
            logging.error(f"Kubernetes deployment failed: {e}")
            self._record_deployment(config, "kubernetes", False)
            return False

    def rollback_deployment(self, target_version: str, platform: str = "kubernetes") -> bool:
        """Rollback to previous version"""
        try:
            if platform == "kubernetes":
                subprocess.run([
                    "kubectl", "rollout", "undo",
                    f"deployment/{target_version}",
                    f"--to-revision=1"
                ], check=True)

                logging.info(f"Rollback to {target_version} successful")
                return True

            elif platform == "docker":
                # Stop current containers
                subprocess.run([
                    "docker-compose", "down"
                ], cwd=self.project_path)

                # Start with previous version
                # This would require version management logic
                logging.info("Docker rollback completed")
                return True

        except subprocess.CalledProcessError as e:
            logging.error(f"Rollback failed: {e}")
            return False

    def _generate_requirements_file(self):
        """Generate requirements.txt if not exists"""
        req_file = self.project_path / "requirements.txt"
        if not req_file.exists():
            requirements = """
# Web framework
fastapi==0.104.1
uvicorn[standard]==0.24.0
gunicorn==21.2.0

# Database
sqlalchemy==2.0.23
alembic==1.12.1
psycopg2-binary==2.9.9

# Caching
redis==5.0.1

# Task queue
celery==5.3.4

# Monitoring
prometheus-client==0.19.0

# Logging
structlog==23.2.0

# Configuration
pydantic==2.5.0
pydantic-settings==2.1.0

# HTTP client
httpx==0.25.2

# Testing
pytest==7.4.3
pytest-asyncio==0.21.1

# Security
cryptography==41.0.7
pyjwt==2.8.0
            """

            with open(req_file, 'w') as f:
                f.write(requirements.strip())

    def _generate_config_files(self, config: DeploymentConfig):
        """Generate configuration files"""
        # Generate nginx.conf
        nginx_conf = self.project_path / "nginx.conf"
        nginx_config = """
events {
    worker_connections 1024;
}

http {
    upstream app {
        server web:8000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /health {
            access_log off;
            proxy_pass http://app/health;
        }
    }
}
        """

        with open(nginx_conf, 'w') as f:
            f.write(nginx_config)

    def _wait_for_health_check(self, config: DeploymentConfig, timeout: int = 300) -> bool:
        """Wait for application health check"""
        start_time = time.time()
        health_url = f"http://localhost:8000{config.health_check.get('path', '/health')}"

        while time.time() - start_time < timeout:
            try:
                response = requests.get(health_url, timeout=5)
                if response.status_code == 200:
                    return True
            except requests.RequestException:
                pass

            time.sleep(10)

        return False

    def _wait_for_k8s_rollout(self, config: DeploymentConfig, timeout: int = 600) -> bool:
        """Wait for Kubernetes rollout to complete"""
        try:
            subprocess.run([
                "kubectl", "rollout", "status",
                f"deployment/{config.app_name}",
                f"--timeout={timeout}s"
            ], check=True)
            return True
        except subprocess.CalledProcessError:
            return False

    def _record_deployment(self, config: DeploymentConfig, platform: str, success: bool):
        """Record deployment in history"""
        deployment_record = {
            'timestamp': datetime.now().isoformat(),
            'app_name': config.app_name,
            'version': config.version,
            'environment': config.environment.value,
            'platform': platform,
            'success': success,
            'strategy': config.strategy.value
        }

        self.deployment_history.append(deployment_record)

        # Save to file
        history_file = self.project_path / "deployment_history.json"
        with open(history_file, 'w') as f:
            json.dump(self.deployment_history, f, indent=2)


if __name__ == '__main__':
    # Example deployment configuration
    config = DeploymentConfig(
        app_name="my-python-app",
        version="1.0.0",
        environment=DeploymentEnvironment.PRODUCTION,
        strategy=DeploymentStrategy.ROLLING,
        replicas=3,
        resources={
            "cpu_limit": "1000m",
            "memory_limit": "512Mi",
            "cpu_request": "500m",
            "memory_request": "256Mi"
        },
        environment_variables={
            "ENVIRONMENT": "production",
            "DATABASE_URL": "postgresql://user:pass@postgres:5432/db",
            "REDIS_URL": "redis://redis:6379/0"
        },
        secrets={
            "SECRET_KEY": "your-secret-key",
            "DATABASE_PASSWORD": "secure-password"
        },
        health_check={
            "path": "/health",
            "initial_delay": 30,
            "period": 10,
            "timeout": 5,
            "failure_threshold": 3
        },
        auto_scaling=True,
        monitoring_enabled=True
    )

    # Initialize deployment manager
    deployment_manager = DeploymentManager("/path/to/project")

    # Prepare deployment
    if deployment_manager.prepare_deployment(config):
        print("Deployment preparation successful")

        # Deploy to Docker (for development/staging)
        if config.environment in [DeploymentEnvironment.DEVELOPMENT, DeploymentEnvironment.STAGING]:
            deployment_manager.deploy_to_docker(config)

        # Deploy to Kubernetes (for production)
        elif config.environment == DeploymentEnvironment.PRODUCTION:
            deployment_manager.deploy_to_kubernetes(config)

    else:
        print("Deployment preparation failed")
```

**Deployment Best Practices:**

1. **Multi-stage Docker builds** for optimized images
2. **Health checks** for reliable deployments
3. **Rolling updates** for zero-downtime deployments
4. **Resource limits** for predictable performance
5. **Security contexts** for production environments
6. **Auto-scaling** for handling traffic spikes
7. **Monitoring and logging** for observability
8. **Rollback strategies** for quick recovery
9. **Environment-specific configurations**
10. **CI/CD integration** for automated deployments

---

### Q16: How do you implement performance optimization and profiling in Python web applications?

**Difficulty: Advanced**

**Answer:**
Performance optimization in Python web applications involves profiling, identifying bottlenecks, and implementing various optimization strategies to improve response times and resource utilization.

**Comprehensive Performance Optimization Implementation:**

```python
#!/usr/bin/env python3
"""
Python Web Application Performance Optimization
Comprehensive profiling and optimization techniques
"""

import time
import cProfile
import pstats
import io
import sys
import gc
import psutil
import threading
import asyncio
import functools
from typing import Dict, List, Any, Optional, Callable, Union
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from collections import defaultdict, deque
from contextlib import contextmanager
import logging
import json
import pickle
import hashlib
import weakref
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import multiprocessing
import queue
import signal
from pathlib import Path
import tracemalloc
import linecache
import resource
from memory_profiler import profile as memory_profile
import line_profiler


@dataclass
class PerformanceMetrics:
    """Performance metrics data structure"""
    timestamp: datetime
    endpoint: str
    method: str
    response_time: float
    memory_usage: float
    cpu_usage: float
    database_queries: int
    cache_hits: int
    cache_misses: int
    status_code: int
    user_id: Optional[str] = None
    request_size: int = 0
    response_size: int = 0


@dataclass
class ProfileResult:
    """Profiling result data structure"""
    function_name: str
    filename: str
    line_number: int
    total_time: float
    cumulative_time: float
    call_count: int
    time_per_call: float


class PerformanceProfiler:
    """Comprehensive performance profiler"""

    def __init__(self, enable_memory_tracking: bool = True):
        self.enable_memory_tracking = enable_memory_tracking
        self.metrics_history = deque(maxlen=10000)
        self.active_requests = {}
        self.profiling_data = defaultdict(list)
        self.cache_stats = {'hits': 0, 'misses': 0}
        self.db_query_count = 0

        if enable_memory_tracking:
            tracemalloc.start()

    @contextmanager
    def profile_request(self, endpoint: str, method: str, user_id: str = None):
        """Profile a single request"""
        request_id = f"{endpoint}_{method}_{time.time()}"
        start_time = time.perf_counter()
        start_memory = self._get_memory_usage()
        start_cpu = psutil.cpu_percent()

        # Reset counters
        initial_db_queries = self.db_query_count
        initial_cache_hits = self.cache_stats['hits']
        initial_cache_misses = self.cache_stats['misses']

        self.active_requests[request_id] = {
            'start_time': start_time,
            'endpoint': endpoint,
            'method': method,
            'user_id': user_id
        }

        try:
            yield request_id
        finally:
            end_time = time.perf_counter()
            end_memory = self._get_memory_usage()
            end_cpu = psutil.cpu_percent()

            # Calculate metrics
            response_time = end_time - start_time
            memory_delta = end_memory - start_memory
            cpu_usage = (start_cpu + end_cpu) / 2

            db_queries = self.db_query_count - initial_db_queries
            cache_hits = self.cache_stats['hits'] - initial_cache_hits
            cache_misses = self.cache_stats['misses'] - initial_cache_misses

            # Create metrics
            metrics = PerformanceMetrics(
                timestamp=datetime.now(),
                endpoint=endpoint,
                method=method,
                response_time=response_time,
                memory_usage=memory_delta,
                cpu_usage=cpu_usage,
                database_queries=db_queries,
                cache_hits=cache_hits,
                cache_misses=cache_misses,
                status_code=200,  # Default, should be set by caller
                user_id=user_id
            )

            self.metrics_history.append(metrics)

            # Clean up
            if request_id in self.active_requests:
                del self.active_requests[request_id]

    def profile_function(self, func: Callable) -> Callable:
        """Decorator to profile individual functions"""
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            profiler = cProfile.Profile()
            profiler.enable()

            start_time = time.perf_counter()
            try:
                result = func(*args, **kwargs)
                return result
            finally:
                end_time = time.perf_counter()
                profiler.disable()

                # Store profiling data
                s = io.StringIO()
                ps = pstats.Stats(profiler, stream=s)
                ps.sort_stats('cumulative')
                ps.print_stats()

                profile_data = {
                    'function': func.__name__,
                    'execution_time': end_time - start_time,
                    'profile_output': s.getvalue(),
                    'timestamp': datetime.now().isoformat()
                }

                self.profiling_data[func.__name__].append(profile_data)

        return wrapper

    def memory_profile_function(self, func: Callable) -> Callable:
        """Decorator for memory profiling"""
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            if not self.enable_memory_tracking:
                return func(*args, **kwargs)

            # Take memory snapshot before
            snapshot_before = tracemalloc.take_snapshot()

            try:
                result = func(*args, **kwargs)
                return result
            finally:
                # Take memory snapshot after
                snapshot_after = tracemalloc.take_snapshot()

                # Compare snapshots
                top_stats = snapshot_after.compare_to(snapshot_before, 'lineno')

                memory_data = {
                    'function': func.__name__,
                    'timestamp': datetime.now().isoformat(),
                    'top_memory_usage': []
                }

                for stat in top_stats[:10]:  # Top 10 memory allocations
                    memory_data['top_memory_usage'].append({
                        'filename': stat.traceback.format()[0],
                        'size_diff': stat.size_diff,
                        'count_diff': stat.count_diff
                    })

                self.profiling_data[f"{func.__name__}_memory"].append(memory_data)

        return wrapper

    def _get_memory_usage(self) -> float:
        """Get current memory usage in MB"""
        process = psutil.Process()
        return process.memory_info().rss / 1024 / 1024

    def get_performance_summary(self, time_window: timedelta = None) -> Dict[str, Any]:
        """Get performance summary"""
        if time_window:
            cutoff_time = datetime.now() - time_window
            relevant_metrics = [
                m for m in self.metrics_history
                if m.timestamp >= cutoff_time
            ]
        else:
            relevant_metrics = list(self.metrics_history)

        if not relevant_metrics:
            return {'message': 'No metrics available'}

        # Calculate statistics
        response_times = [m.response_time for m in relevant_metrics]
        memory_usage = [m.memory_usage for m in relevant_metrics]

        # Group by endpoint
        endpoint_stats = defaultdict(list)
        for metric in relevant_metrics:
            endpoint_stats[f"{metric.method} {metric.endpoint}"].append(metric)

        endpoint_summary = {}
        for endpoint, metrics in endpoint_stats.items():
            times = [m.response_time for m in metrics]
            endpoint_summary[endpoint] = {
                'count': len(metrics),
                'avg_response_time': sum(times) / len(times),
                'min_response_time': min(times),
                'max_response_time': max(times),
                'p95_response_time': self._percentile(times, 95),
                'p99_response_time': self._percentile(times, 99),
                'total_db_queries': sum(m.database_queries for m in metrics),
                'cache_hit_rate': self._calculate_cache_hit_rate(metrics)
            }

        return {
            'total_requests': len(relevant_metrics),
            'avg_response_time': sum(response_times) / len(response_times),
            'p95_response_time': self._percentile(response_times, 95),
            'p99_response_time': self._percentile(response_times, 99),
            'avg_memory_usage': sum(memory_usage) / len(memory_usage),
            'total_db_queries': sum(m.database_queries for m in relevant_metrics),
            'cache_hit_rate': self._calculate_cache_hit_rate(relevant_metrics),
            'endpoint_breakdown': endpoint_summary,
            'slowest_endpoints': self._get_slowest_endpoints(endpoint_summary)
        }

    def _percentile(self, data: List[float], percentile: int) -> float:
        """Calculate percentile"""
        sorted_data = sorted(data)
        index = int(len(sorted_data) * percentile / 100)
        return sorted_data[min(index, len(sorted_data) - 1)]

    def _calculate_cache_hit_rate(self, metrics: List[PerformanceMetrics]) -> float:
        """Calculate cache hit rate"""
        total_hits = sum(m.cache_hits for m in metrics)
        total_misses = sum(m.cache_misses for m in metrics)
        total_requests = total_hits + total_misses

        if total_requests == 0:
            return 0.0

        return (total_hits / total_requests) * 100

    def _get_slowest_endpoints(self, endpoint_summary: Dict[str, Any], limit: int = 5) -> List[Dict[str, Any]]:
        """Get slowest endpoints"""
        sorted_endpoints = sorted(
            endpoint_summary.items(),
            key=lambda x: x[1]['avg_response_time'],
            reverse=True
        )

        return [
            {'endpoint': endpoint, **stats}
            for endpoint, stats in sorted_endpoints[:limit]
        ]


class CacheOptimizer:
    """Cache optimization utilities"""

    def __init__(self, max_size: int = 1000, ttl: int = 3600):
        self.max_size = max_size
        self.ttl = ttl
        self.cache = {}
        self.access_times = {}
        self.hit_count = 0
        self.miss_count = 0

    def cached_function(self, ttl: int = None):
        """Decorator for function caching with TTL"""
        def decorator(func: Callable) -> Callable:
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                # Create cache key
                cache_key = self._create_cache_key(func.__name__, args, kwargs)

                # Check if cached and not expired
                if self._is_cached_and_valid(cache_key, ttl or self.ttl):
                    self.hit_count += 1
                    return self.cache[cache_key]['value']

                # Execute function and cache result
                result = func(*args, **kwargs)
                self._cache_result(cache_key, result)
                self.miss_count += 1

                return result

            return wrapper
        return decorator

    def _create_cache_key(self, func_name: str, args: tuple, kwargs: dict) -> str:
        """Create cache key from function arguments"""
        key_data = {
            'function': func_name,
            'args': args,
            'kwargs': sorted(kwargs.items())
        }

        key_string = json.dumps(key_data, sort_keys=True, default=str)
        return hashlib.md5(key_string.encode()).hexdigest()

    def _is_cached_and_valid(self, cache_key: str, ttl: int) -> bool:
        """Check if key is cached and not expired"""
        if cache_key not in self.cache:
            return False

        cached_time = self.cache[cache_key]['timestamp']
        return (time.time() - cached_time) < ttl

    def _cache_result(self, cache_key: str, result: Any):
        """Cache function result"""
        # Implement LRU eviction if cache is full
        if len(self.cache) >= self.max_size:
            self._evict_lru()

        self.cache[cache_key] = {
            'value': result,
            'timestamp': time.time()
        }
        self.access_times[cache_key] = time.time()

    def _evict_lru(self):
        """Evict least recently used item"""
        if not self.access_times:
            return

        lru_key = min(self.access_times.items(), key=lambda x: x[1])[0]
        del self.cache[lru_key]
        del self.access_times[lru_key]

    def get_cache_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        total_requests = self.hit_count + self.miss_count
        hit_rate = (self.hit_count / total_requests * 100) if total_requests > 0 else 0

        return {
            'cache_size': len(self.cache),
            'max_size': self.max_size,
            'hit_count': self.hit_count,
            'miss_count': self.miss_count,
            'hit_rate': hit_rate,
            'utilization': (len(self.cache) / self.max_size * 100)
        }


class DatabaseOptimizer:
    """Database query optimization utilities"""

    def __init__(self):
        self.query_stats = defaultdict(list)
        self.slow_query_threshold = 1.0  # seconds

    def profile_query(self, query_name: str):
        """Decorator to profile database queries"""
        def decorator(func: Callable) -> Callable:
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                start_time = time.perf_counter()

                try:
                    result = func(*args, **kwargs)
                    return result
                finally:
                    end_time = time.perf_counter()
                    execution_time = end_time - start_time

                    query_data = {
                        'query_name': query_name,
                        'execution_time': execution_time,
                        'timestamp': datetime.now().isoformat(),
                        'is_slow': execution_time > self.slow_query_threshold
                    }

                    self.query_stats[query_name].append(query_data)

                    if execution_time > self.slow_query_threshold:
                        logging.warning(
                            f"Slow query detected: {query_name} took {execution_time:.3f}s"
                        )

            return wrapper
        return decorator

    def get_query_analysis(self) -> Dict[str, Any]:
        """Get database query analysis"""
        analysis = {}

        for query_name, executions in self.query_stats.items():
            times = [e['execution_time'] for e in executions]
            slow_queries = [e for e in executions if e['is_slow']]

            analysis[query_name] = {
                'total_executions': len(executions),
                'avg_execution_time': sum(times) / len(times),
                'min_execution_time': min(times),
                'max_execution_time': max(times),
                'slow_query_count': len(slow_queries),
                'slow_query_percentage': (len(slow_queries) / len(executions)) * 100
            }

        return analysis


class AsyncOptimizer:
    """Asynchronous operation optimization"""

    def __init__(self, max_concurrent_tasks: int = 100):
        self.max_concurrent_tasks = max_concurrent_tasks
        self.semaphore = asyncio.Semaphore(max_concurrent_tasks)
        self.task_stats = defaultdict(list)

    async def rate_limited_task(self, task_name: str):
        """Context manager for rate-limited async tasks"""
        async with self.semaphore:
            start_time = time.perf_counter()
            try:
                yield
            finally:
                end_time = time.perf_counter()
                execution_time = end_time - start_time

                self.task_stats[task_name].append({
                    'execution_time': execution_time,
                    'timestamp': datetime.now().isoformat()
                })

    async def batch_process(self, items: List[Any],
                          process_func: Callable,
                          batch_size: int = 10) -> List[Any]:
        """Process items in batches to optimize performance"""
        results = []

        for i in range(0, len(items), batch_size):
            batch = items[i:i + batch_size]

            # Process batch concurrently
            tasks = [process_func(item) for item in batch]
            batch_results = await asyncio.gather(*tasks, return_exceptions=True)

            results.extend(batch_results)

        return results

    def get_async_stats(self) -> Dict[str, Any]:
        """Get async operation statistics"""
        stats = {}

        for task_name, executions in self.task_stats.items():
            times = [e['execution_time'] for e in executions]

            stats[task_name] = {
                'total_executions': len(executions),
                'avg_execution_time': sum(times) / len(times),
                'min_execution_time': min(times),
                'max_execution_time': max(times)
            }

        return stats


class MemoryOptimizer:
    """Memory optimization utilities"""

    def __init__(self):
        self.object_pools = {}
        self.weak_references = weakref.WeakValueDictionary()

    def object_pool(self, obj_type: type, pool_size: int = 100):
        """Object pool for expensive-to-create objects"""
        if obj_type not in self.object_pools:
            self.object_pools[obj_type] = queue.Queue(maxsize=pool_size)

        @contextmanager
        def get_object(*args, **kwargs):
            pool = self.object_pools[obj_type]

            try:
                # Try to get from pool
                obj = pool.get_nowait()
            except queue.Empty:
                # Create new object if pool is empty
                obj = obj_type(*args, **kwargs)

            try:
                yield obj
            finally:
                # Return to pool if not full
                try:
                    pool.put_nowait(obj)
                except queue.Full:
                    # Pool is full, let object be garbage collected
                    pass

        return get_object

    def memory_efficient_generator(self, data_source: Callable, chunk_size: int = 1000):
        """Generator for memory-efficient data processing"""
        def generator():
            offset = 0
            while True:
                chunk = data_source(offset, chunk_size)
                if not chunk:
                    break

                for item in chunk:
                    yield item

                offset += chunk_size

        return generator()

    def force_garbage_collection(self):
        """Force garbage collection and return memory stats"""
        before_gc = self._get_memory_info()

        # Force garbage collection
        collected = gc.collect()

        after_gc = self._get_memory_info()

        return {
            'objects_collected': collected,
            'memory_before_mb': before_gc,
            'memory_after_mb': after_gc,
            'memory_freed_mb': before_gc - after_gc
        }

    def _get_memory_info(self) -> float:
        """Get current memory usage in MB"""
        process = psutil.Process()
        return process.memory_info().rss / 1024 / 1024


# Global instances
performance_profiler = PerformanceProfiler()
cache_optimizer = CacheOptimizer()
db_optimizer = DatabaseOptimizer()
async_optimizer = AsyncOptimizer()
memory_optimizer = MemoryOptimizer()


# Example usage decorators
def profile_endpoint(endpoint: str, method: str = "GET"):
    """Decorator for profiling web endpoints"""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            with performance_profiler.profile_request(endpoint, method):
                return func(*args, **kwargs)
        return wrapper
    return decorator


@cache_optimizer.cached_function(ttl=300)
def expensive_computation(data: str) -> str:
    """Example of cached expensive computation"""
    time.sleep(1)  # Simulate expensive operation
    return f"processed_{data}"


@db_optimizer.profile_query("user_lookup")
def get_user_by_id(user_id: int) -> dict:
    """Example of profiled database query"""
    time.sleep(0.1)  # Simulate database query
    return {'id': user_id, 'name': f'User {user_id}'}


@performance_profiler.profile_function
def complex_algorithm(data: List[int]) -> List[int]:
    """Example of profiled complex algorithm"""
    # Simulate complex processing
    result = []
    for i in data:
        for j in range(i):
            result.append(i * j)
    return result


if __name__ == '__main__':
    # Example performance testing

    # Test cached function
    print("Testing cached function...")
    start_time = time.time()
    result1 = expensive_computation("test_data")
    first_call_time = time.time() - start_time

    start_time = time.time()
    result2 = expensive_computation("test_data")  # Should be cached
    second_call_time = time.time() - start_time

    print(f"First call: {first_call_time:.3f}s")
    print(f"Second call (cached): {second_call_time:.3f}s")
    print(f"Cache stats: {cache_optimizer.get_cache_stats()}")

    # Test database profiling
    print("\nTesting database profiling...")
    for i in range(5):
        get_user_by_id(i)

    print(f"Query analysis: {db_optimizer.get_query_analysis()}")

    # Test function profiling
    print("\nTesting function profiling...")
    test_data = list(range(100))
    complex_algorithm(test_data)

    # Get performance summary
    print("\nPerformance Summary:")
    summary = performance_profiler.get_performance_summary()
    print(json.dumps(summary, indent=2, default=str))
```

**Performance Optimization Best Practices:**

1. **Profile Before Optimizing**: Always measure performance before making changes
2. **Cache Strategically**: Implement caching for expensive operations
3. **Optimize Database Queries**: Use query profiling and optimization
4. **Async Operations**: Use asynchronous programming for I/O-bound tasks
5. **Memory Management**: Implement object pooling and efficient data structures
6. **Batch Processing**: Process data in batches to reduce overhead
7. **Connection Pooling**: Reuse database and HTTP connections
8. **Lazy Loading**: Load data only when needed
9. **Compression**: Use compression for large data transfers
10. **Monitoring**: Continuously monitor performance in production

---

## Q17: Compare different Python web frameworks (Django, Flask, FastAPI) and when to use each?

**Difficulty: Medium**

**Answer:**

Python offers several excellent web frameworks, each with distinct strengths and use cases:

### Django - Full-Featured Framework

**Strengths:**

- Batteries-included approach with ORM, admin panel, authentication
- Excellent for rapid development of complex applications
- Strong security features built-in
- Mature ecosystem with extensive third-party packages

**Use Cases:**

- Large-scale web applications
- Content management systems
- E-commerce platforms
- Applications requiring admin interfaces

```python
# Django Model Example
from django.db import models
from django.contrib.auth.models import User

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

# Django View Example
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

@login_required
def blog_list(request):
    posts = BlogPost.objects.select_related('author').all()
    return render(request, 'blog/list.html', {'posts': posts})

@csrf_exempt
def api_create_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        post = BlogPost.objects.create(
            title=data['title'],
            content=data['content'],
            author=request.user
        )
        return JsonResponse({
            'id': post.id,
            'title': post.title,
            'created_at': post.created_at.isoformat()
        })
```

### Flask - Micro Framework

**Strengths:**

- Lightweight and flexible
- Easy to learn and get started
- Minimal boilerplate code
- Great for microservices and APIs

**Use Cases:**

- Small to medium applications
- Microservices architecture
- Prototyping and learning
- Custom applications with specific requirements

```python
# Flask Application Example
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)
login_manager = LoginManager(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Routes
@app.route('/api/posts', methods=['GET', 'POST'])
@login_required
def handle_posts():
    if request.method == 'GET':
        posts = Post.query.join(User).all()
        return jsonify([
            {
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'author': post.author.username,
                'created_at': post.created_at.isoformat()
            }
            for post in posts
        ])

    elif request.method == 'POST':
        data = request.get_json()
        post = Post(
            title=data['title'],
            content=data['content'],
            user_id=current_user.id
        )
        db.session.add(post)
        db.session.commit()
        return jsonify({'message': 'Post created successfully'}), 201

@app.route('/posts')
def posts_page():
    posts = Post.query.join(User).all()
    return render_template('posts.html', posts=posts)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

### FastAPI - Modern Async Framework

**Strengths:**

- High performance with async support
- Automatic API documentation (OpenAPI/Swagger)
- Type hints and data validation
- Modern Python features support

**Use Cases:**

- High-performance APIs
- Microservices with async operations
- Data science and ML model serving
- Modern web applications requiring speed

```python
# FastAPI Application Example
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from typing import List, Optional

app = FastAPI(title="Blog API", version="1.0.0")

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./blog.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    posts = relationship("PostDB", back_populates="author")

class PostDB(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    author_id = Column(Integer, ForeignKey("users.id"))
    author = relationship("UserDB", back_populates="posts")

Base.metadata.create_all(bind=engine)

# Pydantic models
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    author: UserResponse

    class Config:
        orm_mode = True

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(UserDB).filter(UserDB.username == username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# Routes
@app.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)
    db_user = UserDB(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/posts", response_model=List[PostResponse])
async def get_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = db.query(PostDB).offset(skip).limit(limit).all()
    return posts

@app.post("/posts", response_model=PostResponse)
async def create_post(
    post: PostCreate,
    current_user: UserDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_post = PostDB(**post.dict(), author_id=current_user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/posts/{post_id}", response_model=PostResponse)
async def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(PostDB).filter(PostDB.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post
```

### Framework Comparison Summary

| Feature               | Django        | Flask           | FastAPI     |
| --------------------- | ------------- | --------------- | ----------- |
| **Learning Curve**    | Steep         | Easy            | Moderate    |
| **Performance**       | Good          | Good            | Excellent   |
| **Async Support**     | Limited       | With extensions | Native      |
| **Built-in Features** | Extensive     | Minimal         | Moderate    |
| **API Documentation** | Manual        | Manual          | Automatic   |
| **Type Safety**       | Limited       | Limited         | Excellent   |
| **Community**         | Large         | Large           | Growing     |
| **Best For**          | Full web apps | Flexible apps   | Modern APIs |

### Decision Matrix

**Choose Django when:**

- Building complex web applications
- Need admin interface and user management
- Rapid development is priority
- Team prefers convention over configuration

**Choose Flask when:**

- Building microservices or small applications
- Need maximum flexibility and control
- Learning web development
- Integrating with existing systems

**Choose FastAPI when:**

- Building high-performance APIs
- Need automatic documentation
- Working with modern Python features
- Building data science or ML applications

---

## Q18: Explain Python package management, virtual environments, and dependency management best practices.

**Difficulty: Medium**

**Answer:**

Python package management and virtual environments are crucial for maintaining clean, reproducible development environments and managing project dependencies effectively.

### Virtual Environments

**Why Virtual Environments:**

- Isolate project dependencies
- Avoid version conflicts between projects
- Ensure reproducible environments
- Simplify deployment and distribution

```python
# Creating and managing virtual environments

# Using venv (Python 3.3+)
python -m venv myproject_env

# Activation
# On Windows:
myproject_env\Scripts\activate
# On macOS/Linux:
source myproject_env/bin/activate

# Deactivation
deactivate

# Using virtualenv (older approach)
pip install virtualenv
virtualenv myproject_env

# Using conda
conda create --name myproject python=3.11
conda activate myproject
conda deactivate
```

### Package Management Tools

#### pip - Standard Package Manager

```python
# Basic pip usage
pip install package_name
pip install package_name==1.2.3  # Specific version
pip install package_name>=1.2.0  # Minimum version
pip install -r requirements.txt  # Install from file
pip freeze > requirements.txt    # Export current packages
pip list                         # List installed packages
pip show package_name           # Show package info
pip uninstall package_name      # Remove package

# Advanced pip usage
pip install --upgrade package_name
pip install --user package_name     # User-level install
pip install -e .                    # Editable install
pip install git+https://github.com/user/repo.git  # From git
```

#### pipenv - Higher-level Package Management

```python
# Pipenv workflow
pip install pipenv

# Initialize project
pipenv install

# Install packages
pipenv install requests
pipenv install pytest --dev  # Development dependency

# Install from Pipfile
pipenv install

# Activate shell
pipenv shell

# Run commands in environment
pipenv run python script.py

# Generate requirements.txt
pipenv requirements > requirements.txt
```

#### Poetry - Modern Dependency Management

```python
# Poetry setup and usage
pip install poetry

# Initialize new project
poetry new myproject
cd myproject

# Initialize existing project
poetry init

# Add dependencies
poetry add requests
poetry add pytest --group dev

# Install dependencies
poetry install

# Activate virtual environment
poetry shell

# Run commands
poetry run python script.py

# Build and publish
poetry build
poetry publish
```

### Dependency Management Implementation

```python
#!/usr/bin/env python3
"""
Dependency Management Utilities
Tools for managing Python dependencies and environments
"""

import os
import sys
import subprocess
import json
import toml
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import pkg_resources
import importlib.util
from dataclasses import dataclass
from enum import Enum
import tempfile
import shutil
import venv
import site


class PackageManager(Enum):
    """Package manager types"""
    PIP = "pip"
    PIPENV = "pipenv"
    POETRY = "poetry"
    CONDA = "conda"


@dataclass
class Dependency:
    """Dependency specification"""
    name: str
    version: Optional[str] = None
    extras: Optional[List[str]] = None
    dev: bool = False
    optional: bool = False
    source: Optional[str] = None


class VirtualEnvironmentManager:
    """Virtual environment management"""

    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.venv_path = self.project_path / ".venv"

    def create_environment(self, python_version: Optional[str] = None) -> bool:
        """Create virtual environment"""
        try:
            if self.venv_path.exists():
                shutil.rmtree(self.venv_path)

            # Use specific Python version if provided
            python_executable = sys.executable
            if python_version:
                python_executable = f"python{python_version}"

            # Create virtual environment
            venv.create(self.venv_path, with_pip=True)

            return True

        except Exception as e:
            print(f"Failed to create virtual environment: {e}")
            return False

    def activate_environment(self) -> Dict[str, str]:
        """Get environment variables for activation"""
        if not self.venv_path.exists():
            raise RuntimeError("Virtual environment does not exist")

        if sys.platform == "win32":
            scripts_path = self.venv_path / "Scripts"
            python_path = scripts_path / "python.exe"
        else:
            scripts_path = self.venv_path / "bin"
            python_path = scripts_path / "python"

        env_vars = os.environ.copy()
        env_vars["VIRTUAL_ENV"] = str(self.venv_path)
        env_vars["PATH"] = f"{scripts_path}{os.pathsep}{env_vars['PATH']}"

        return env_vars

    def install_package(self, package: str, dev: bool = False) -> bool:
        """Install package in virtual environment"""
        try:
            env_vars = self.activate_environment()

            cmd = [str(self.get_python_executable()), "-m", "pip", "install", package]

            result = subprocess.run(
                cmd,
                env=env_vars,
                capture_output=True,
                text=True,
                check=True
            )

            return result.returncode == 0

        except subprocess.CalledProcessError as e:
            print(f"Failed to install {package}: {e}")
            return False

    def get_python_executable(self) -> Path:
        """Get Python executable path in virtual environment"""
        if sys.platform == "win32":
            return self.venv_path / "Scripts" / "python.exe"
        else:
            return self.venv_path / "bin" / "python"

    def list_packages(self) -> List[Dict[str, str]]:
        """List installed packages"""
        try:
            env_vars = self.activate_environment()

            result = subprocess.run(
                [str(self.get_python_executable()), "-m", "pip", "list", "--format=json"],
                env=env_vars,
                capture_output=True,
                text=True,
                check=True
            )

            return json.loads(result.stdout)

        except (subprocess.CalledProcessError, json.JSONDecodeError):
            return []


class DependencyResolver:
    """Dependency resolution and management"""

    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.requirements_file = self.project_path / "requirements.txt"
        self.dev_requirements_file = self.project_path / "requirements-dev.txt"
        self.pipfile = self.project_path / "Pipfile"
        self.pyproject_file = self.project_path / "pyproject.toml"

    def detect_package_manager(self) -> PackageManager:
        """Detect which package manager is being used"""
        if self.pyproject_file.exists():
            with open(self.pyproject_file, 'r') as f:
                content = toml.load(f)
                if 'tool' in content and 'poetry' in content['tool']:
                    return PackageManager.POETRY

        if self.pipfile.exists():
            return PackageManager.PIPENV

        if self.requirements_file.exists():
            return PackageManager.PIP

        return PackageManager.PIP  # Default

    def parse_requirements(self, file_path: Path) -> List[Dependency]:
        """Parse requirements.txt file"""
        dependencies = []

        if not file_path.exists():
            return dependencies

        with open(file_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    # Parse package specification
                    if '==' in line:
                        name, version = line.split('==', 1)
                    elif '>=' in line:
                        name, version = line.split('>=', 1)
                        version = f">={version}"
                    else:
                        name, version = line, None

                    dependencies.append(Dependency(name=name.strip(), version=version))

        return dependencies

    def generate_requirements(self, include_dev: bool = False) -> str:
        """Generate requirements.txt content"""
        try:
            # Get installed packages
            installed_packages = [d for d in pkg_resources.working_set]

            requirements = []
            for package in sorted(installed_packages, key=lambda x: x.project_name):
                requirements.append(f"{package.project_name}=={package.version}")

            return "\n".join(requirements)

        except Exception as e:
            print(f"Failed to generate requirements: {e}")
            return ""

    def check_security_vulnerabilities(self) -> List[Dict[str, str]]:
        """Check for security vulnerabilities in dependencies"""
        vulnerabilities = []

        try:
            # Use safety package if available
            result = subprocess.run(
                [sys.executable, "-m", "safety", "check", "--json"],
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                vulnerabilities = json.loads(result.stdout)

        except (subprocess.CalledProcessError, json.JSONDecodeError, FileNotFoundError):
            # safety not installed or other error
            pass

        return vulnerabilities

    def update_dependencies(self, package_manager: PackageManager) -> bool:
        """Update dependencies based on package manager"""
        try:
            if package_manager == PackageManager.POETRY:
                subprocess.run(["poetry", "update"], check=True)
            elif package_manager == PackageManager.PIPENV:
                subprocess.run(["pipenv", "update"], check=True)
            else:  # pip
                subprocess.run([sys.executable, "-m", "pip", "install", "--upgrade", "-r", "requirements.txt"], check=True)

            return True

        except subprocess.CalledProcessError:
            return False


class ProjectManager:
    """Complete project dependency management"""

    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.venv_manager = VirtualEnvironmentManager(project_path)
        self.dependency_resolver = DependencyResolver(project_path)

    def setup_project(self, python_version: Optional[str] = None) -> bool:
        """Set up complete project environment"""
        print("Setting up project environment...")

        # Create virtual environment
        if not self.venv_manager.create_environment(python_version):
            return False

        # Detect and install dependencies
        package_manager = self.dependency_resolver.detect_package_manager()
        print(f"Detected package manager: {package_manager.value}")

        # Install dependencies based on package manager
        if package_manager == PackageManager.PIP:
            requirements = self.dependency_resolver.parse_requirements(
                self.dependency_resolver.requirements_file
            )
            for dep in requirements:
                package_spec = dep.name
                if dep.version:
                    package_spec += dep.version

                if not self.venv_manager.install_package(package_spec):
                    print(f"Failed to install {package_spec}")
                    return False

        print("Project setup completed successfully!")
        return True

    def audit_dependencies(self) -> Dict[str, Any]:
        """Audit project dependencies"""
        audit_results = {
            'package_manager': self.dependency_resolver.detect_package_manager().value,
            'installed_packages': self.venv_manager.list_packages(),
            'vulnerabilities': self.dependency_resolver.check_security_vulnerabilities(),
            'outdated_packages': [],
            'recommendations': []
        }

        # Add recommendations
        if not self.dependency_resolver.requirements_file.exists():
            audit_results['recommendations'].append(
                "Create requirements.txt file for better dependency tracking"
            )

        if audit_results['vulnerabilities']:
            audit_results['recommendations'].append(
                "Update packages with security vulnerabilities"
            )

        return audit_results


if __name__ == '__main__':
    # Example usage
    project_path = "/path/to/your/project"

    # Initialize project manager
    project_manager = ProjectManager(project_path)

    # Set up project environment
    if project_manager.setup_project(python_version="3.11"):
        print("Project environment set up successfully!")

        # Audit dependencies
        audit_results = project_manager.audit_dependencies()
        print("\nDependency Audit Results:")
        print(json.dumps(audit_results, indent=2, default=str))
    else:
        print("Failed to set up project environment")
```

### Best Practices

**1. Always Use Virtual Environments:**

```bash
# Create project-specific environment
python -m venv project_env
source project_env/bin/activate  # or project_env\Scripts\activate on Windows
```

**2. Pin Dependencies:**

```txt
# requirements.txt - Pin exact versions for reproducibility
django==4.2.7
requests==2.31.0
psycopg2-binary==2.9.9
```

**3. Separate Development Dependencies:**

```txt
# requirements-dev.txt
pytest==7.4.3
black==23.11.0
flake8==6.1.0
mypy==1.7.1
```

**4. Use Lock Files:**

```toml
# pyproject.toml with Poetry
[tool.poetry.dependencies]
python = "^3.11"
django = "^4.2"
requests = "^2.31"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4"
black = "^23.11"
```

**5. Regular Security Audits:**

```bash
# Install and use safety
pip install safety
safety check

# Or use pip-audit
pip install pip-audit
pip-audit
```

**6. Environment Variables for Configuration:**

```python
# Use python-decouple or python-dotenv
from decouple import config

DATABASE_URL = config('DATABASE_URL')
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
```

### Common Workflows

**Starting a New Project:**

```bash
# Method 1: Using venv + pip
mkdir myproject && cd myproject
python -m venv .venv
source .venv/bin/activate
pip install django requests
pip freeze > requirements.txt

# Method 2: Using Poetry
poetry new myproject
cd myproject
poetry add django requests
poetry install

# Method 3: Using pipenv
mkdir myproject && cd myproject
pipenv install django requests
pipenv shell
```

**Collaborating on Existing Project:**

```bash
# Clone and set up
git clone <repository>
cd project

# With pip
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# With Poetry
poetry install

# With pipenv
pipenv install
```

---

## Q20: Explain Python web application architecture patterns including MVC, MVP, MVVM, and microservices architecture.

**Difficulty: Expert**

**Answer:**

Python web application architecture patterns provide structured approaches to organizing code, separating concerns, and building scalable applications. Understanding these patterns is crucial for designing maintainable and robust web applications.

### Architecture Patterns Overview

```python
#!/usr/bin/env python3
"""
Python Web Application Architecture Patterns
Implements MVC, MVP, MVVM, and Microservices patterns
"""

import abc
from typing import Dict, List, Any, Optional, Protocol, Callable
from dataclasses import dataclass, field
from datetime import datetime
import json
import asyncio
import aiohttp
from flask import Flask, request, jsonify, render_template
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import redis
import logging
from contextlib import contextmanager
import threading
from concurrent.futures import ThreadPoolExecutor
import time
from functools import wraps
import requests
from enum import Enum
import uuid


# =============================================================================
# MODEL-VIEW-CONTROLLER (MVC) PATTERN
# =============================================================================

# Models
Base = declarative_base()

class UserModel(Base):
    """User model for MVC pattern"""
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    def to_dict(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_active': self.is_active
        }


class PostModel(Base):
    """Post model for MVC pattern"""
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    content = Column(String, nullable=False)
    author_id = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    published = Column(Boolean, default=False)

    def to_dict(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'author_id': self.author_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'published': self.published
        }


# Controllers
class UserController:
    """User controller for MVC pattern"""

    def __init__(self, user_service):
        self.user_service = user_service

    def create_user(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle user creation request"""
        try:
            # Validate input
            required_fields = ['username', 'email', 'password']
            for field in required_fields:
                if field not in request_data:
                    return {'error': f'Missing required field: {field}', 'status': 400}

            # Create user through service
            user = self.user_service.create_user(
                request_data['username'],
                request_data['email'],
                request_data['password']
            )

            return {'user': user.to_dict(), 'status': 201}

        except ValueError as e:
            return {'error': str(e), 'status': 400}
        except Exception as e:
            logging.error(f"Error creating user: {e}")
            return {'error': 'Internal server error', 'status': 500}

    def get_user(self, user_id: int) -> Dict[str, Any]:
        """Handle get user request"""
        try:
            user = self.user_service.get_user_by_id(user_id)
            if user:
                return {'user': user.to_dict(), 'status': 200}
            else:
                return {'error': 'User not found', 'status': 404}
        except Exception as e:
            logging.error(f"Error getting user: {e}")
            return {'error': 'Internal server error', 'status': 500}

    def authenticate_user(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle user authentication request"""
        try:
            username = request_data.get('username')
            password = request_data.get('password')

            if not username or not password:
                return {'error': 'Username and password required', 'status': 400}

            user = self.user_service.authenticate_user(username, password)
            if user:
                return {'user': user.to_dict(), 'status': 200}
            else:
                return {'error': 'Invalid credentials', 'status': 401}

        except Exception as e:
            logging.error(f"Error authenticating user: {e}")
            return {'error': 'Internal server error', 'status': 500}


class PostController:
    """Post controller for MVC pattern"""

    def __init__(self, post_service):
        self.post_service = post_service

    def create_post(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle post creation request"""
        try:
            required_fields = ['title', 'content', 'author_id']
            for field in required_fields:
                if field not in request_data:
                    return {'error': f'Missing required field: {field}', 'status': 400}

            post = self.post_service.create_post(
                request_data['title'],
                request_data['content'],
                request_data['author_id']
            )

            return {'post': post.to_dict(), 'status': 201}

        except ValueError as e:
            return {'error': str(e), 'status': 400}
        except Exception as e:
            logging.error(f"Error creating post: {e}")
            return {'error': 'Internal server error', 'status': 500}

    def get_posts(self, filters: Dict[str, Any] = None) -> Dict[str, Any]:
        """Handle get posts request"""
        try:
            posts = self.post_service.get_posts(filters or {})
            return {
                'posts': [post.to_dict() for post in posts],
                'count': len(posts),
                'status': 200
            }
        except Exception as e:
            logging.error(f"Error getting posts: {e}")
            return {'error': 'Internal server error', 'status': 500}


# Views (Flask routes)
def create_mvc_app(user_controller, post_controller):
    """Create Flask app with MVC pattern"""
    app = Flask(__name__)

    @app.route('/api/users', methods=['POST'])
    def create_user():
        result = user_controller.create_user(request.get_json())
        return jsonify(result), result['status']

    @app.route('/api/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        result = user_controller.get_user(user_id)
        return jsonify(result), result['status']

    @app.route('/api/auth', methods=['POST'])
    def authenticate():
        result = user_controller.authenticate_user(request.get_json())
        return jsonify(result), result['status']

    @app.route('/api/posts', methods=['POST'])
    def create_post():
        result = post_controller.create_post(request.get_json())
        return jsonify(result), result['status']

    @app.route('/api/posts', methods=['GET'])
    def get_posts():
        filters = dict(request.args)
        result = post_controller.get_posts(filters)
        return jsonify(result), result['status']

    return app


# =============================================================================
# MODEL-VIEW-PRESENTER (MVP) PATTERN
# =============================================================================

class IUserView(Protocol):
    """Interface for user view in MVP pattern"""

    def display_user(self, user_data: Dict[str, Any]) -> None:
        ...

    def display_error(self, error_message: str) -> None:
        ...

    def display_success(self, message: str) -> None:
        ...

    def get_user_input(self) -> Dict[str, Any]:
        ...


class UserView:
    """User view implementation for MVP pattern"""

    def __init__(self):
        self.last_displayed_data = None
        self.last_error = None
        self.last_success = None

    def display_user(self, user_data: Dict[str, Any]) -> None:
        """Display user data"""
        self.last_displayed_data = user_data
        print(f"User: {user_data['username']} ({user_data['email']})")

    def display_error(self, error_message: str) -> None:
        """Display error message"""
        self.last_error = error_message
        print(f"Error: {error_message}")

    def display_success(self, message: str) -> None:
        """Display success message"""
        self.last_success = message
        print(f"Success: {message}")

    def get_user_input(self) -> Dict[str, Any]:
        """Get user input (simplified for demo)"""
        return {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'password123'
        }


class UserPresenter:
    """User presenter for MVP pattern"""

    def __init__(self, view: IUserView, user_service):
        self.view = view
        self.user_service = user_service

    def create_user(self) -> None:
        """Handle user creation presentation logic"""
        try:
            # Get input from view
            user_input = self.view.get_user_input()

            # Validate input
            if not self._validate_user_input(user_input):
                return

            # Create user through service
            user = self.user_service.create_user(
                user_input['username'],
                user_input['email'],
                user_input['password']
            )

            # Display success
            self.view.display_success("User created successfully")
            self.view.display_user(user.to_dict())

        except ValueError as e:
            self.view.display_error(str(e))
        except Exception as e:
            logging.error(f"Error in presenter: {e}")
            self.view.display_error("An unexpected error occurred")

    def get_user(self, user_id: int) -> None:
        """Handle get user presentation logic"""
        try:
            user = self.user_service.get_user_by_id(user_id)
            if user:
                self.view.display_user(user.to_dict())
            else:
                self.view.display_error("User not found")
        except Exception as e:
            logging.error(f"Error in presenter: {e}")
            self.view.display_error("An unexpected error occurred")

    def _validate_user_input(self, user_input: Dict[str, Any]) -> bool:
        """Validate user input"""
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in user_input or not user_input[field]:
                self.view.display_error(f"Missing required field: {field}")
                return False
        return True


# =============================================================================
# MODEL-VIEW-VIEWMODEL (MVVM) PATTERN
# =============================================================================

class Observable:
    """Observable base class for MVVM pattern"""

    def __init__(self):
        self._observers: List[Callable] = []

    def add_observer(self, observer: Callable) -> None:
        """Add observer"""
        self._observers.append(observer)

    def remove_observer(self, observer: Callable) -> None:
        """Remove observer"""
        if observer in self._observers:
            self._observers.remove(observer)

    def notify_observers(self, *args, **kwargs) -> None:
        """Notify all observers"""
        for observer in self._observers:
            observer(*args, **kwargs)


class UserViewModel(Observable):
    """User view model for MVVM pattern"""

    def __init__(self, user_service):
        super().__init__()
        self.user_service = user_service
        self._users: List[Dict[str, Any]] = []
        self._current_user: Optional[Dict[str, Any]] = None
        self._is_loading = False
        self._error_message: Optional[str] = None

    @property
    def users(self) -> List[Dict[str, Any]]:
        """Get users list"""
        return self._users

    @property
    def current_user(self) -> Optional[Dict[str, Any]]:
        """Get current user"""
        return self._current_user

    @property
    def is_loading(self) -> bool:
        """Get loading state"""
        return self._is_loading

    @property
    def error_message(self) -> Optional[str]:
        """Get error message"""
        return self._error_message

    def create_user(self, username: str, email: str, password: str) -> None:
        """Create user command"""
        self._set_loading(True)
        self._clear_error()

        try:
            user = self.user_service.create_user(username, email, password)
            user_dict = user.to_dict()
            self._users.append(user_dict)
            self._current_user = user_dict
            self.notify_observers('user_created', user_dict)

        except ValueError as e:
            self._set_error(str(e))
        except Exception as e:
            logging.error(f"Error in view model: {e}")
            self._set_error("An unexpected error occurred")
        finally:
            self._set_loading(False)

    def load_users(self) -> None:
        """Load users command"""
        self._set_loading(True)
        self._clear_error()

        try:
            users = self.user_service.get_all_users()
            self._users = [user.to_dict() for user in users]
            self.notify_observers('users_loaded', self._users)

        except Exception as e:
            logging.error(f"Error loading users: {e}")
            self._set_error("Failed to load users")
        finally:
            self._set_loading(False)

    def select_user(self, user_id: int) -> None:
        """Select user command"""
        try:
            user = self.user_service.get_user_by_id(user_id)
            if user:
                self._current_user = user.to_dict()
                self.notify_observers('user_selected', self._current_user)
            else:
                self._set_error("User not found")
        except Exception as e:
            logging.error(f"Error selecting user: {e}")
            self._set_error("Failed to select user")

    def _set_loading(self, loading: bool) -> None:
        """Set loading state"""
        self._is_loading = loading
        self.notify_observers('loading_changed', loading)

    def _set_error(self, error: str) -> None:
        """Set error message"""
        self._error_message = error
        self.notify_observers('error_occurred', error)

    def _clear_error(self) -> None:
        """Clear error message"""
        self._error_message = None
        self.notify_observers('error_cleared')


class UserViewMVVM:
    """User view for MVVM pattern"""

    def __init__(self, view_model: UserViewModel):
        self.view_model = view_model
        self.view_model.add_observer(self._on_view_model_changed)

        # UI state
        self.displayed_users = []
        self.displayed_current_user = None
        self.is_loading_displayed = False
        self.displayed_error = None

    def _on_view_model_changed(self, event_type: str, data: Any = None) -> None:
        """Handle view model changes"""
        if event_type == 'users_loaded':
            self.displayed_users = data
            self._render_users_list()
        elif event_type == 'user_created':
            self.displayed_current_user = data
            self._render_current_user()
        elif event_type == 'user_selected':
            self.displayed_current_user = data
            self._render_current_user()
        elif event_type == 'loading_changed':
            self.is_loading_displayed = data
            self._render_loading_state()
        elif event_type == 'error_occurred':
            self.displayed_error = data
            self._render_error()
        elif event_type == 'error_cleared':
            self.displayed_error = None
            self._clear_error_display()

    def _render_users_list(self) -> None:
        """Render users list"""
        print("Users List:")
        for user in self.displayed_users:
            print(f"  - {user['username']} ({user['email']})")

    def _render_current_user(self) -> None:
        """Render current user"""
        if self.displayed_current_user:
            print(f"Current User: {self.displayed_current_user['username']}")

    def _render_loading_state(self) -> None:
        """Render loading state"""
        if self.is_loading_displayed:
            print("Loading...")
        else:
            print("Loading complete.")

    def _render_error(self) -> None:
        """Render error"""
        if self.displayed_error:
            print(f"Error: {self.displayed_error}")

    def _clear_error_display(self) -> None:
        """Clear error display"""
        print("Error cleared.")


# =============================================================================
# MICROSERVICES ARCHITECTURE
# =============================================================================

class ServiceRegistry:
    """Service registry for microservices"""

    def __init__(self):
        self._services: Dict[str, Dict[str, Any]] = {}
        self._lock = threading.Lock()

    def register_service(self, name: str, host: str, port: int, health_check_url: str = None) -> None:
        """Register a service"""
        with self._lock:
            self._services[name] = {
                'host': host,
                'port': port,
                'health_check_url': health_check_url or f"http://{host}:{port}/health",
                'registered_at': datetime.utcnow(),
                'last_health_check': None,
                'is_healthy': True
            }

    def get_service(self, name: str) -> Optional[Dict[str, Any]]:
        """Get service information"""
        with self._lock:
            return self._services.get(name)

    def get_service_url(self, name: str) -> Optional[str]:
        """Get service URL"""
        service = self.get_service(name)
        if service and service['is_healthy']:
            return f"http://{service['host']}:{service['port']}"
        return None

    def unregister_service(self, name: str) -> None:
        """Unregister a service"""
        with self._lock:
            if name in self._services:
                del self._services[name]

    def health_check(self, name: str) -> bool:
        """Perform health check on service"""
        service = self.get_service(name)
        if not service:
            return False

        try:
            response = requests.get(service['health_check_url'], timeout=5)
            is_healthy = response.status_code == 200

            with self._lock:
                self._services[name]['last_health_check'] = datetime.utcnow()
                self._services[name]['is_healthy'] = is_healthy

            return is_healthy
        except Exception as e:
            logging.error(f"Health check failed for {name}: {e}")
            with self._lock:
                self._services[name]['is_healthy'] = False
            return False


class MessageBroker:
    """Simple message broker for microservices communication"""

    def __init__(self):
        self._subscribers: Dict[str, List[Callable]] = {}
        self._lock = threading.Lock()

    def subscribe(self, topic: str, callback: Callable) -> None:
        """Subscribe to a topic"""
        with self._lock:
            if topic not in self._subscribers:
                self._subscribers[topic] = []
            self._subscribers[topic].append(callback)

    def unsubscribe(self, topic: str, callback: Callable) -> None:
        """Unsubscribe from a topic"""
        with self._lock:
            if topic in self._subscribers and callback in self._subscribers[topic]:
                self._subscribers[topic].remove(callback)

    def publish(self, topic: str, message: Dict[str, Any]) -> None:
        """Publish message to topic"""
        with self._lock:
            subscribers = self._subscribers.get(topic, [])

        for callback in subscribers:
            try:
                callback(message)
            except Exception as e:
                logging.error(f"Error in subscriber callback: {e}")


class BaseService:
    """Base class for microservices"""

    def __init__(self, name: str, host: str, port: int, service_registry: ServiceRegistry, message_broker: MessageBroker):
        self.name = name
        self.host = host
        self.port = port
        self.service_registry = service_registry
        self.message_broker = message_broker
        self.app = Flask(name)
        self._setup_routes()

    def _setup_routes(self) -> None:
        """Setup common routes"""
        @self.app.route('/health', methods=['GET'])
        def health_check():
            return jsonify({'status': 'healthy', 'service': self.name}), 200

    def start(self) -> None:
        """Start the service"""
        # Register with service registry
        self.service_registry.register_service(self.name, self.host, self.port)

        # Start Flask app
        self.app.run(host=self.host, port=self.port, debug=False)

    def call_service(self, service_name: str, endpoint: str, method: str = 'GET', data: Dict[str, Any] = None) -> Optional[Dict[str, Any]]:
        """Call another service"""
        service_url = self.service_registry.get_service_url(service_name)
        if not service_url:
            logging.error(f"Service {service_name} not available")
            return None

        try:
            url = f"{service_url}{endpoint}"
            if method.upper() == 'GET':
                response = requests.get(url, timeout=10)
            elif method.upper() == 'POST':
                response = requests.post(url, json=data, timeout=10)
            elif method.upper() == 'PUT':
                response = requests.put(url, json=data, timeout=10)
            elif method.upper() == 'DELETE':
                response = requests.delete(url, timeout=10)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")

            if response.status_code < 400:
                return response.json()
            else:
                logging.error(f"Service call failed: {response.status_code} - {response.text}")
                return None

        except Exception as e:
            logging.error(f"Error calling service {service_name}: {e}")
            return None


class UserService(BaseService):
    """User microservice"""

    def __init__(self, host: str, port: int, service_registry: ServiceRegistry, message_broker: MessageBroker):
        super().__init__('user-service', host, port, service_registry, message_broker)
        self.users_db = {}  # Simplified in-memory storage
        self._setup_user_routes()

    def _setup_user_routes(self) -> None:
        """Setup user-specific routes"""
        @self.app.route('/users', methods=['POST'])
        def create_user():
            data = request.get_json()
            user_id = str(uuid.uuid4())
            user = {
                'id': user_id,
                'username': data['username'],
                'email': data['email'],
                'created_at': datetime.utcnow().isoformat()
            }
            self.users_db[user_id] = user

            # Publish user created event
            self.message_broker.publish('user.created', {
                'user_id': user_id,
                'username': data['username'],
                'email': data['email']
            })

            return jsonify(user), 201

        @self.app.route('/users/<user_id>', methods=['GET'])
        def get_user(user_id):
            user = self.users_db.get(user_id)
            if user:
                return jsonify(user), 200
            else:
                return jsonify({'error': 'User not found'}), 404

        @self.app.route('/users', methods=['GET'])
        def get_users():
            return jsonify(list(self.users_db.values())), 200


class PostService(BaseService):
    """Post microservice"""

    def __init__(self, host: str, port: int, service_registry: ServiceRegistry, message_broker: MessageBroker):
        super().__init__('post-service', host, port, service_registry, message_broker)
        self.posts_db = {}  # Simplified in-memory storage
        self._setup_post_routes()

        # Subscribe to user events
        self.message_broker.subscribe('user.created', self._on_user_created)

    def _setup_post_routes(self) -> None:
        """Setup post-specific routes"""
        @self.app.route('/posts', methods=['POST'])
        def create_post():
            data = request.get_json()

            # Verify user exists by calling user service
            user_data = self.call_service('user-service', f"/users/{data['author_id']}")
            if not user_data:
                return jsonify({'error': 'Author not found'}), 400

            post_id = str(uuid.uuid4())
            post = {
                'id': post_id,
                'title': data['title'],
                'content': data['content'],
                'author_id': data['author_id'],
                'author_username': user_data['username'],
                'created_at': datetime.utcnow().isoformat()
            }
            self.posts_db[post_id] = post

            # Publish post created event
            self.message_broker.publish('post.created', {
                'post_id': post_id,
                'title': data['title'],
                'author_id': data['author_id']
            })

            return jsonify(post), 201

        @self.app.route('/posts', methods=['GET'])
        def get_posts():
            return jsonify(list(self.posts_db.values())), 200

        @self.app.route('/posts/<post_id>', methods=['GET'])
        def get_post(post_id):
            post = self.posts_db.get(post_id)
            if post:
                return jsonify(post), 200
            else:
                return jsonify({'error': 'Post not found'}), 404

    def _on_user_created(self, message: Dict[str, Any]) -> None:
        """Handle user created event"""
        logging.info(f"User created: {message['username']} ({message['user_id']})")
        # Could perform additional actions like creating user profile, etc.


class APIGateway(BaseService):
    """API Gateway for microservices"""

    def __init__(self, host: str, port: int, service_registry: ServiceRegistry, message_broker: MessageBroker):
        super().__init__('api-gateway', host, port, service_registry, message_broker)
        self._setup_gateway_routes()

    def _setup_gateway_routes(self) -> None:
        """Setup gateway routes"""
        # User routes
        @self.app.route('/api/users', methods=['POST'])
        def create_user():
            result = self.call_service('user-service', '/users', 'POST', request.get_json())
            if result:
                return jsonify(result), 201
            else:
                return jsonify({'error': 'Service unavailable'}), 503

        @self.app.route('/api/users/<user_id>', methods=['GET'])
        def get_user(user_id):
            result = self.call_service('user-service', f'/users/{user_id}')
            if result:
                return jsonify(result), 200
            else:
                return jsonify({'error': 'Service unavailable'}), 503

        # Post routes
        @self.app.route('/api/posts', methods=['POST'])
        def create_post():
            result = self.call_service('post-service', '/posts', 'POST', request.get_json())
            if result:
                return jsonify(result), 201
            else:
                return jsonify({'error': 'Service unavailable'}), 503

        @self.app.route('/api/posts', methods=['GET'])
        def get_posts():
            result = self.call_service('post-service', '/posts')
            if result:
                return jsonify(result), 200
            else:
                return jsonify({'error': 'Service unavailable'}), 503


# =============================================================================
# ARCHITECTURE COMPARISON AND USAGE EXAMPLES
# =============================================================================

def demonstrate_mvc_pattern():
    """Demonstrate MVC pattern usage"""
    print("\n=== MVC Pattern Demo ===")

    # This would typically use real database and services
    # For demo purposes, we'll use mock objects
    class MockUserService:
        def create_user(self, username, email, password):
            return type('User', (), {
                'id': 1,
                'username': username,
                'email': email,
                'to_dict': lambda: {'id': 1, 'username': username, 'email': email}
            })()

    user_service = MockUserService()
    user_controller = UserController(user_service)

    # Simulate request
    request_data = {
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'password123'
    }

    result = user_controller.create_user(request_data)
    print(f"MVC Result: {result}")


def demonstrate_mvp_pattern():
    """Demonstrate MVP pattern usage"""
    print("\n=== MVP Pattern Demo ===")

    class MockUserService:
        def create_user(self, username, email, password):
            return type('User', (), {
                'id': 1,
                'username': username,
                'email': email,
                'to_dict': lambda: {'id': 1, 'username': username, 'email': email}
            })()

    user_service = MockUserService()
    view = UserView()
    presenter = UserPresenter(view, user_service)

    presenter.create_user()
    print(f"MVP View State - Last Success: {view.last_success}")
    print(f"MVP View State - Last Data: {view.last_displayed_data}")


def demonstrate_mvvm_pattern():
    """Demonstrate MVVM pattern usage"""
    print("\n=== MVVM Pattern Demo ===")

    class MockUserService:
        def create_user(self, username, email, password):
            return type('User', (), {
                'id': 1,
                'username': username,
                'email': email,
                'to_dict': lambda: {'id': 1, 'username': username, 'email': email}
            })()

        def get_all_users(self):
            return []

    user_service = MockUserService()
    view_model = UserViewModel(user_service)
    view = UserViewMVVM(view_model)

    view_model.create_user('testuser', 'test@example.com', 'password123')
    print(f"MVVM ViewModel State - Current User: {view_model.current_user}")
    print(f"MVVM View State - Displayed User: {view.displayed_current_user}")


def demonstrate_microservices_pattern():
    """Demonstrate microservices pattern usage"""
    print("\n=== Microservices Pattern Demo ===")

    # Create infrastructure
    service_registry = ServiceRegistry()
    message_broker = MessageBroker()

    # Register services (in real scenario, these would run on different processes/containers)
    service_registry.register_service('user-service', 'localhost', 5001)
    service_registry.register_service('post-service', 'localhost', 5002)
    service_registry.register_service('api-gateway', 'localhost', 5000)

    print(f"Registered services: {list(service_registry._services.keys())}")

    # Simulate service communication
    user_service_url = service_registry.get_service_url('user-service')
    post_service_url = service_registry.get_service_url('post-service')

    print(f"User Service URL: {user_service_url}")
    print(f"Post Service URL: {post_service_url}")

    # Simulate message publishing
    def user_created_handler(message):
        print(f"Received user created event: {message}")

    message_broker.subscribe('user.created', user_created_handler)
    message_broker.publish('user.created', {
        'user_id': '123',
        'username': 'testuser',
        'email': 'test@example.com'
    })


if __name__ == '__main__':
    # Demonstrate all patterns
    demonstrate_mvc_pattern()
    demonstrate_mvp_pattern()
    demonstrate_mvvm_pattern()
    demonstrate_microservices_pattern()
```

### Architecture Pattern Comparison

| Pattern           | Pros                                                   | Cons                                           | Best For                              |
| ----------------- | ------------------------------------------------------ | ---------------------------------------------- | ------------------------------------- |
| **MVC**           | Clear separation, familiar, testable                   | Can become complex, tight coupling             | Traditional web apps, CRUD operations |
| **MVP**           | Testable presenter, loose coupling                     | More boilerplate, complex for simple UIs       | Desktop apps, complex business logic  |
| **MVVM**          | Data binding, reactive UIs, testable                   | Learning curve, framework dependency           | Rich client apps, real-time UIs       |
| **Microservices** | Scalable, independent deployment, technology diversity | Complexity, network overhead, data consistency | Large systems, multiple teams         |

### Best Practices

**1. Choose the Right Pattern:**

```python
# For simple CRUD applications
use_mvc = True

# For complex business logic with rich UI
use_mvp = True

# For reactive, real-time applications
use_mvvm = True

# For large, distributed systems
use_microservices = True
```

**2. Maintain Separation of Concerns:**

```python
# Good: Clear responsibilities
class UserController:  # Handles HTTP requests
class UserService:     # Business logic
class UserRepository:  # Data access

# Bad: Mixed responsibilities
class UserController:
    def create_user(self):
        # HTTP handling + business logic + data access
        pass
```

**3. Use Dependency Injection:**

```python
class UserService:
    def __init__(self, user_repository: UserRepository, email_service: EmailService):
        self.user_repository = user_repository
        self.email_service = email_service
```

**4. Implement Proper Error Handling:**

```python
try:
    result = service.process_request(data)
except ValidationError as e:
    return {'error': str(e), 'status': 400}
except ServiceUnavailableError as e:
    return {'error': 'Service temporarily unavailable', 'status': 503}
except Exception as e:
    logger.error(f"Unexpected error: {e}")
    return {'error': 'Internal server error', 'status': 500}
```

---

## Q21: Explain comprehensive testing strategies for Python web applications including unit, integration, and end-to-end testing.

**Difficulty: Advanced**

**Answer:**

Comprehensive testing is essential for building reliable Python web applications. A well-structured testing strategy includes multiple levels of testing to ensure code quality, functionality, and user experience.

### Testing Pyramid Overview

```python
#!/usr/bin/env python3
"""
Comprehensive Testing Framework for Python Web Applications
Implements unit, integration, and end-to-end testing strategies
"""

import pytest
import unittest
from unittest.mock import Mock, patch, MagicMock
import requests
import json
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from datetime import datetime, timedelta
import asyncio
import aiohttp
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import os
import tempfile
import sqlite3
from contextlib import contextmanager
import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import factory
from factory.alchemy import SQLAlchemyModelFactory
import faker


# Test Configuration
@dataclass
class TestConfig:
    """Test configuration settings"""
    database_url: str = "sqlite:///:memory:"
    test_database_url: str = "sqlite:///test.db"
    api_base_url: str = "http://localhost:5000"
    selenium_driver: str = "chrome"
    headless: bool = True
    test_timeout: int = 30
    parallel_workers: int = 4


# Sample Application Models (for testing)
class User:
    """Sample user model"""
    def __init__(self, id: int, username: str, email: str, password_hash: str):
        self.id = id
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.created_at = datetime.utcnow()
        self.is_active = True

    def to_dict(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }


class Post:
    """Sample post model"""
    def __init__(self, id: int, title: str, content: str, author_id: int):
        self.id = id
        self.title = title
        self.content = content
        self.author_id = author_id
        self.created_at = datetime.utcnow()
        self.published = False

    def to_dict(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'author_id': self.author_id,
            'created_at': self.created_at.isoformat(),
            'published': self.published
        }


# Sample Service Layer (for testing)
class UserService:
    """User service with business logic"""

    def __init__(self, user_repository):
        self.user_repository = user_repository

    def create_user(self, username: str, email: str, password: str) -> User:
        """Create a new user with validation"""
        # Validation
        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters")

        if '@' not in email:
            raise ValueError("Invalid email format")

        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters")

        # Check if user exists
        if self.user_repository.get_by_username(username):
            raise ValueError("Username already exists")

        if self.user_repository.get_by_email(email):
            raise ValueError("Email already exists")

        # Create user
        password_hash = self._hash_password(password)
        user = User(
            id=self._generate_id(),
            username=username,
            email=email,
            password_hash=password_hash
        )

        return self.user_repository.save(user)

    def authenticate_user(self, username: str, password: str) -> Optional[User]:
        """Authenticate user credentials"""
        user = self.user_repository.get_by_username(username)
        if user and self._verify_password(password, user.password_hash):
            return user
        return None

    def _hash_password(self, password: str) -> str:
        """Hash password (simplified for testing)"""
        return f"hashed_{password}"

    def _verify_password(self, password: str, password_hash: str) -> bool:
        """Verify password against hash"""
        return password_hash == f"hashed_{password}"

    def _generate_id(self) -> int:
        """Generate unique ID"""
        return int(time.time() * 1000000) % 1000000


class UserRepository:
    """User repository for data access"""

    def __init__(self):
        self.users = {}
        self.next_id = 1

    def save(self, user: User) -> User:
        """Save user to storage"""
        if user.id is None:
            user.id = self.next_id
            self.next_id += 1
        self.users[user.id] = user
        return user

    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return self.users.get(user_id)

    def get_by_username(self, username: str) -> Optional[User]:
        """Get user by username"""
        for user in self.users.values():
            if user.username == username:
                return user
        return None

    def get_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        for user in self.users.values():
            if user.email == email:
                return user
        return None

    def get_all(self) -> List[User]:
        """Get all users"""
        return list(self.users.values())


# =============================================================================
# UNIT TESTS
# =============================================================================

class TestUserService(unittest.TestCase):
    """Unit tests for UserService"""

    def setUp(self):
        """Set up test fixtures"""
        self.user_repository = Mock(spec=UserRepository)
        self.user_service = UserService(self.user_repository)

    def test_create_user_success(self):
        """Test successful user creation"""
        # Arrange
        username = "testuser"
        email = "test@example.com"
        password = "password123"

        self.user_repository.get_by_username.return_value = None
        self.user_repository.get_by_email.return_value = None

        expected_user = User(1, username, email, "hashed_password123")
        self.user_repository.save.return_value = expected_user

        # Act
        result = self.user_service.create_user(username, email, password)

        # Assert
        self.assertEqual(result.username, username)
        self.assertEqual(result.email, email)
        self.user_repository.save.assert_called_once()
        self.user_repository.get_by_username.assert_called_once_with(username)
        self.user_repository.get_by_email.assert_called_once_with(email)

    def test_create_user_invalid_username(self):
        """Test user creation with invalid username"""
        # Arrange
        username = "ab"  # Too short
        email = "test@example.com"
        password = "password123"

        # Act & Assert
        with self.assertRaises(ValueError) as context:
            self.user_service.create_user(username, email, password)

        self.assertIn("Username must be at least 3 characters", str(context.exception))
        self.user_repository.save.assert_not_called()

    def test_create_user_duplicate_username(self):
        """Test user creation with duplicate username"""
        # Arrange
        username = "testuser"
        email = "test@example.com"
        password = "password123"

        existing_user = User(1, username, "other@example.com", "hash")
        self.user_repository.get_by_username.return_value = existing_user

        # Act & Assert
        with self.assertRaises(ValueError) as context:
            self.user_service.create_user(username, email, password)

        self.assertIn("Username already exists", str(context.exception))
        self.user_repository.save.assert_not_called()

    def test_authenticate_user_success(self):
        """Test successful user authentication"""
        # Arrange
        username = "testuser"
        password = "password123"

        user = User(1, username, "test@example.com", "hashed_password123")
        self.user_repository.get_by_username.return_value = user

        # Act
        result = self.user_service.authenticate_user(username, password)

        # Assert
        self.assertEqual(result, user)
        self.user_repository.get_by_username.assert_called_once_with(username)

    def test_authenticate_user_invalid_password(self):
        """Test authentication with invalid password"""
        # Arrange
        username = "testuser"
        password = "wrongpassword"

        user = User(1, username, "test@example.com", "hashed_password123")
        self.user_repository.get_by_username.return_value = user

        # Act
        result = self.user_service.authenticate_user(username, password)

        # Assert
        self.assertIsNone(result)

    def test_authenticate_user_not_found(self):
        """Test authentication with non-existent user"""
        # Arrange
        username = "nonexistent"
        password = "password123"

        self.user_repository.get_by_username.return_value = None

        # Act
        result = self.user_service.authenticate_user(username, password)

        # Assert
        self.assertIsNone(result)


# =============================================================================
# INTEGRATION TESTS
# =============================================================================

class TestUserIntegration(unittest.TestCase):
    """Integration tests for User functionality"""

    def setUp(self):
        """Set up test fixtures"""
        self.user_repository = UserRepository()
        self.user_service = UserService(self.user_repository)

    def test_user_lifecycle(self):
        """Test complete user lifecycle"""
        # Create user
        username = "testuser"
        email = "test@example.com"
        password = "password123"

        user = self.user_service.create_user(username, email, password)

        # Verify user was created
        self.assertIsNotNone(user.id)
        self.assertEqual(user.username, username)
        self.assertEqual(user.email, email)
        self.assertTrue(user.is_active)

        # Verify user can be retrieved
        retrieved_user = self.user_repository.get_by_id(user.id)
        self.assertEqual(retrieved_user.username, username)

        # Verify authentication works
        authenticated_user = self.user_service.authenticate_user(username, password)
        self.assertEqual(authenticated_user.id, user.id)

        # Verify wrong password fails
        failed_auth = self.user_service.authenticate_user(username, "wrongpassword")
        self.assertIsNone(failed_auth)

    def test_multiple_users(self):
        """Test creating multiple users"""
        users_data = [
            ("user1", "user1@example.com", "password123"),
            ("user2", "user2@example.com", "password456"),
            ("user3", "user3@example.com", "password789")
        ]

        created_users = []
        for username, email, password in users_data:
            user = self.user_service.create_user(username, email, password)
            created_users.append(user)

        # Verify all users were created
        all_users = self.user_repository.get_all()
        self.assertEqual(len(all_users), 3)

        # Verify each user can be authenticated
        for i, (username, email, password) in enumerate(users_data):
            authenticated_user = self.user_service.authenticate_user(username, password)
            self.assertEqual(authenticated_user.id, created_users[i].id)


# =============================================================================
# API TESTS
# =============================================================================

class TestUserAPI(unittest.TestCase):
    """API integration tests"""

    @classmethod
    def setUpClass(cls):
        """Set up test Flask application"""
        cls.app = Flask(__name__)
        cls.app.config['TESTING'] = True

        # Mock user service
        cls.user_service = Mock()

        @cls.app.route('/api/users', methods=['POST'])
        def create_user():
            data = request.get_json()
            try:
                user = cls.user_service.create_user(
                    data['username'],
                    data['email'],
                    data['password']
                )
                return jsonify(user.to_dict()), 201
            except ValueError as e:
                return jsonify({'error': str(e)}), 400

        @cls.app.route('/api/auth', methods=['POST'])
        def authenticate():
            data = request.get_json()
            user = cls.user_service.authenticate_user(
                data['username'],
                data['password']
            )
            if user:
                return jsonify(user.to_dict()), 200
            else:
                return jsonify({'error': 'Invalid credentials'}), 401

        cls.client = cls.app.test_client()

    def setUp(self):
        """Reset mocks before each test"""
        self.user_service.reset_mock()

    def test_create_user_api_success(self):
        """Test successful user creation via API"""
        # Arrange
        user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'password123'
        }

        expected_user = User(1, 'testuser', 'test@example.com', 'hashed_password123')
        self.user_service.create_user.return_value = expected_user

        # Act
        response = self.client.post('/api/users',
                                  data=json.dumps(user_data),
                                  content_type='application/json')

        # Assert
        self.assertEqual(response.status_code, 201)
        response_data = json.loads(response.data)
        self.assertEqual(response_data['username'], 'testuser')
        self.assertEqual(response_data['email'], 'test@example.com')

        self.user_service.create_user.assert_called_once_with(
            'testuser', 'test@example.com', 'password123'
        )

    def test_create_user_api_validation_error(self):
        """Test user creation with validation error"""
        # Arrange
        user_data = {
            'username': 'ab',  # Too short
            'email': 'test@example.com',
            'password': 'password123'
        }

        self.user_service.create_user.side_effect = ValueError("Username must be at least 3 characters")

        # Act
        response = self.client.post('/api/users',
                                  data=json.dumps(user_data),
                                  content_type='application/json')

        # Assert
        self.assertEqual(response.status_code, 400)
        response_data = json.loads(response.data)
        self.assertIn('Username must be at least 3 characters', response_data['error'])

    def test_authenticate_api_success(self):
        """Test successful authentication via API"""
        # Arrange
        auth_data = {
            'username': 'testuser',
            'password': 'password123'
        }

        expected_user = User(1, 'testuser', 'test@example.com', 'hashed_password123')
        self.user_service.authenticate_user.return_value = expected_user

        # Act
        response = self.client.post('/api/auth',
                                  data=json.dumps(auth_data),
                                  content_type='application/json')

        # Assert
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data)
        self.assertEqual(response_data['username'], 'testuser')

    def test_authenticate_api_invalid_credentials(self):
        """Test authentication with invalid credentials"""
        # Arrange
        auth_data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }

        self.user_service.authenticate_user.return_value = None

        # Act
        response = self.client.post('/api/auth',
                                  data=json.dumps(auth_data),
                                  content_type='application/json')

        # Assert
        self.assertEqual(response.status_code, 401)
        response_data = json.loads(response.data)
        self.assertIn('Invalid credentials', response_data['error'])


# =============================================================================
# END-TO-END TESTS
# =============================================================================

class TestUserE2E(unittest.TestCase):
    """End-to-end tests using Selenium"""

    @classmethod
    def setUpClass(cls):
        """Set up Selenium WebDriver"""
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        try:
            cls.driver = webdriver.Chrome(options=chrome_options)
            cls.driver.implicitly_wait(10)
        except Exception as e:
            raise unittest.SkipTest(f"Chrome WebDriver not available: {e}")

    @classmethod
    def tearDownClass(cls):
        """Clean up WebDriver"""
        if hasattr(cls, 'driver'):
            cls.driver.quit()

    def setUp(self):
        """Set up for each test"""
        # Assuming a test server is running on localhost:5000
        self.base_url = "http://localhost:5000"

    @unittest.skip("Requires running web server")
    def test_user_registration_flow(self):
        """Test complete user registration flow"""
        # Navigate to registration page
        self.driver.get(f"{self.base_url}/register")

        # Fill registration form
        username_field = self.driver.find_element(By.NAME, "username")
        email_field = self.driver.find_element(By.NAME, "email")
        password_field = self.driver.find_element(By.NAME, "password")
        submit_button = self.driver.find_element(By.TYPE, "submit")

        username_field.send_keys("testuser")
        email_field.send_keys("test@example.com")
        password_field.send_keys("password123")

        # Submit form
        submit_button.click()

        # Wait for success message
        success_message = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
        )

        self.assertIn("Registration successful", success_message.text)

    @unittest.skip("Requires running web server")
    def test_user_login_flow(self):
        """Test complete user login flow"""
        # Navigate to login page
        self.driver.get(f"{self.base_url}/login")

        # Fill login form
        username_field = self.driver.find_element(By.NAME, "username")
        password_field = self.driver.find_element(By.NAME, "password")
        submit_button = self.driver.find_element(By.TYPE, "submit")

        username_field.send_keys("testuser")
        password_field.send_keys("password123")

        # Submit form
        submit_button.click()

        # Wait for redirect to dashboard
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/dashboard")
        )

        # Verify user is logged in
        user_menu = self.driver.find_element(By.CLASS_NAME, "user-menu")
        self.assertIn("testuser", user_menu.text)


# =============================================================================
# PERFORMANCE TESTS
# =============================================================================

class TestPerformance(unittest.TestCase):
    """Performance and load tests"""

    def setUp(self):
        """Set up performance test fixtures"""
        self.user_repository = UserRepository()
        self.user_service = UserService(self.user_repository)

    def test_user_creation_performance(self):
        """Test user creation performance"""
        start_time = time.time()

        # Create 1000 users
        for i in range(1000):
            username = f"user{i}"
            email = f"user{i}@example.com"
            password = "password123"

            self.user_service.create_user(username, email, password)

        end_time = time.time()
        execution_time = end_time - start_time

        # Should create 1000 users in less than 1 second
        self.assertLess(execution_time, 1.0,
                       f"User creation took {execution_time:.2f}s, expected < 1.0s")

        # Verify all users were created
        all_users = self.user_repository.get_all()
        self.assertEqual(len(all_users), 1000)

    def test_concurrent_user_creation(self):
        """Test concurrent user creation"""
        import threading
        import queue

        results = queue.Queue()
        errors = queue.Queue()

        def create_user_worker(user_id):
            try:
                username = f"user{user_id}"
                email = f"user{user_id}@example.com"
                password = "password123"

                user = self.user_service.create_user(username, email, password)
                results.put(user)
            except Exception as e:
                errors.put(e)

        # Create 100 users concurrently
        threads = []
        for i in range(100):
            thread = threading.Thread(target=create_user_worker, args=(i,))
            threads.append(thread)
            thread.start()

        # Wait for all threads to complete
        for thread in threads:
            thread.join()

        # Verify results
        self.assertEqual(results.qsize(), 100, "Not all users were created")
        self.assertEqual(errors.qsize(), 0, f"Errors occurred: {list(errors.queue)}")


# =============================================================================
# TEST UTILITIES AND FIXTURES
# =============================================================================

class TestDataFactory:
    """Factory for creating test data"""

    @staticmethod
    def create_user(username: str = None, email: str = None) -> User:
        """Create a test user"""
        fake = faker.Faker()

        return User(
            id=fake.random_int(min=1, max=1000000),
            username=username or fake.user_name(),
            email=email or fake.email(),
            password_hash=fake.sha256()
        )

    @staticmethod
    def create_post(author_id: int = None, title: str = None) -> Post:
        """Create a test post"""
        fake = faker.Faker()

        return Post(
            id=fake.random_int(min=1, max=1000000),
            title=title or fake.sentence(),
            content=fake.text(),
            author_id=author_id or fake.random_int(min=1, max=100)
        )


@contextmanager
def temporary_database():
    """Context manager for temporary test database"""
    db_file = tempfile.NamedTemporaryFile(delete=False)
    db_file.close()

    try:
        # Create database connection
        conn = sqlite3.connect(db_file.name)

        # Create tables
        conn.execute("""
            CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT 1
            )
        """)

        conn.execute("""
            CREATE TABLE posts (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                author_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                published BOOLEAN DEFAULT 0,
                FOREIGN KEY (author_id) REFERENCES users (id)
            )
        """)

        conn.commit()
        yield conn

    finally:
        conn.close()
        os.unlink(db_file.name)


if __name__ == '__main__':
    # Run all tests
    unittest.main(verbosity=2)
```

### Testing Best Practices

**1. Test Structure (AAA Pattern):**

```python
def test_example(self):
    # Arrange - Set up test data and conditions
    user_data = {'username': 'test', 'email': 'test@example.com'}

    # Act - Execute the code being tested
    result = create_user(user_data)

    # Assert - Verify the results
    self.assertEqual(result.username, 'test')
```

**2. Test Isolation:**

```python
class TestUserService(unittest.TestCase):
    def setUp(self):
        """Run before each test method"""
        self.user_repository = Mock()
        self.user_service = UserService(self.user_repository)

    def tearDown(self):
        """Run after each test method"""
        # Clean up resources
        pass
```

**3. Parameterized Tests:**

```python
@pytest.mark.parametrize("username,email,password,expected_error", [
    ("ab", "test@example.com", "password123", "Username must be at least 3 characters"),
    ("testuser", "invalid-email", "password123", "Invalid email format"),
    ("testuser", "test@example.com", "123", "Password must be at least 8 characters"),
])
def test_user_validation_errors(username, email, password, expected_error):
    with pytest.raises(ValueError, match=expected_error):
        user_service.create_user(username, email, password)
```

**4. Test Configuration:**

```python
# conftest.py for pytest
import pytest
from myapp import create_app, db

@pytest.fixture
def app():
    app = create_app(testing=True)
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()
```

**5. Continuous Integration:**

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.8, 3.9, 3.10, 3.11]
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-test.txt
      - name: Run tests
        run: |
          pytest --cov=myapp --cov-report=xml
      - name: Upload coverage
        uses: codecov/codecov-action@v1
```

---
