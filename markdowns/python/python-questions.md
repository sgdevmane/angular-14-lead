# Python & Django Interview Questions

## Table of Contents
1. [Python Fundamentals](#python-fundamentals)
2. [Object-Oriented Programming](#object-oriented-programming)
3. [Data Structures and Algorithms](#data-structures-and-algorithms)
4. [Django Framework](#django-framework)
5. [Django REST Framework](#django-rest-framework)
6. [Database Integration](#database-integration)
7. [Testing and Debugging](#testing-and-debugging)
8. [Performance and Optimization](#performance-and-optimization)

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