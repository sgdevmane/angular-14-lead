# React.js Interview Questions

## Table of Contents
1. [React Fundamentals](#react-fundamentals)
2. [Components and JSX](#components-and-jsx)
3. [State Management](#state-management)
4. [Hooks](#hooks)
5. [Performance Optimization](#performance-optimization)
6. [Advanced React Patterns](#advanced-react-patterns)
7. [Testing](#testing)
8. [Modern React Features](#modern-react-features)

---

## React Fundamentals

### Q1: What is React and what are its key features?
**Difficulty: Easy**

**Answer:**
React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Meta and the open-source community.

**Key Features:**

1. **Virtual DOM**: React creates a virtual representation of the DOM in memory, which allows for efficient updates by comparing (diffing) the virtual DOM with the actual DOM and updating only the parts that have changed.

2. **Component-Based Architecture**: React applications are built using reusable components that encapsulate their own state and logic.

3. **Unidirectional Data Flow**: Data flows down from parent to child components through props, making the application predictable and easier to debug.

4. **JSX Syntax**: JavaScript XML allows you to write HTML-like syntax within JavaScript, making component creation more intuitive.

5. **Declarative Programming**: You describe what the UI should look like for any given state, and React handles the how.

```jsx
// Example of a simple React component
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;
```

**Benefits:**
- **Reusability**: Components can be reused across different parts of the application
- **Maintainability**: Clear separation of concerns and modular structure
- **Performance**: Virtual DOM and efficient reconciliation algorithm
- **Developer Experience**: Rich ecosystem, excellent tooling, and strong community support
- **SEO-Friendly**: Server-side rendering capabilities with Next.js

---

### Q2: Explain the difference between functional and class components.
**Difficulty: Medium**

**Answer:**
React components can be written as either functional components or class components, each with their own characteristics and use cases.

**Functional Components:**
Functional components are JavaScript functions that return JSX. With the introduction of Hooks in React 16.8, they can now manage state and lifecycle methods.

```jsx
// Functional Component with Hooks
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserProfile;
```

**Class Components:**
Class components are ES6 classes that extend React.Component and must have a render method.

```jsx
// Class Component
import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/api/users/${this.props.userId}`);
      const userData = await response.json();
      this.setState({ user: userData, loading: false });
    } catch (error) {
      console.error('Error fetching user:', error);
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ loading: true });
      try {
        const response = await fetch(`/api/users/${this.props.userId}`);
        const userData = await response.json();
        this.setState({ user: userData, loading: false });
      } catch (error) {
        console.error('Error fetching user:', error);
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return (
      <div className="user-profile">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  }
}

export default UserProfile;
```

**Key Differences:**

| Aspect | Functional Components | Class Components |
|--------|----------------------|------------------|
| **Syntax** | Function declaration | ES6 Class |
| **State Management** | useState Hook | this.state |
| **Lifecycle Methods** | useEffect Hook | componentDidMount, etc. |
| **Performance** | Generally better (less overhead) | Slightly more overhead |
| **Code Length** | More concise | More verbose |
| **Learning Curve** | Easier for beginners | Requires understanding of classes |
| **Modern Preference** | Recommended approach | Legacy approach |

**When to Use:**
- **Functional Components**: Preferred for new development, simpler syntax, better performance
- **Class Components**: Legacy codebases, when you need error boundaries (though functional error boundaries are coming)

---

### Q3: What is JSX and how does it work?
**Difficulty: Easy**

**Answer:**
JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It makes React components more readable and easier to write.

**How JSX Works:**
JSX is not valid JavaScript by itself. It gets transpiled by tools like Babel into regular JavaScript function calls.

```jsx
// JSX Code
const element = (
  <div className="greeting">
    <h1>Hello, {name}!</h1>
    <p>Welcome to our application.</p>
  </div>
);

// Transpiled JavaScript (what Babel produces)
const element = React.createElement(
  'div',
  { className: 'greeting' },
  React.createElement('h1', null, 'Hello, ', name, '!'),
  React.createElement('p', null, 'Welcome to our application.')
);
```

**JSX Rules and Best Practices:**

1. **Single Parent Element**: JSX expressions must have one parent element
```jsx
// ❌ Invalid - Multiple parent elements
return (
  <h1>Title</h1>
  <p>Content</p>
);

// ✅ Valid - Single parent element
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// ✅ Valid - React Fragment
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

2. **JavaScript Expressions**: Use curly braces for JavaScript expressions
```jsx
function WelcomeMessage({ user, isLoggedIn }) {
  const currentTime = new Date().toLocaleTimeString();
  
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
      <p>Current time: {currentTime}</p>
      <p>You have {user.notifications?.length || 0} notifications</p>
    </div>
  );
}
```

3. **Attribute Naming**: Use camelCase for attributes
```jsx
// ❌ HTML attributes
<div class="container" onclick="handleClick()">

// ✅ JSX attributes
<div className="container" onClick={handleClick}>
```

4. **Self-Closing Tags**: All tags must be properly closed
```jsx
// ❌ Invalid
<img src="image.jpg">
<input type="text">

// ✅ Valid
<img src="image.jpg" />
<input type="text" />
```

**Advanced JSX Patterns:**

```jsx
function ProductList({ products, onProductSelect }) {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <div 
            key={product.id} 
            className={`product-item ${product.featured ? 'featured' : ''}`}
            onClick={() => onProductSelect(product)}
          >
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
            />
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            {product.discount && (
              <span className="discount">-{product.discount}%</span>
            )}
          </div>
        ))
      ) : (
        <div className="empty-state">
          <p>No products available</p>
        </div>
      )}
    </div>
  );
}
```

**Benefits of JSX:**
- **Familiar Syntax**: HTML-like syntax is familiar to web developers
- **Type Safety**: When used with TypeScript, provides compile-time type checking
- **Developer Experience**: Better IDE support with syntax highlighting and autocomplete
- **Expressiveness**: Allows embedding JavaScript expressions seamlessly

---

## Components and JSX

### Q4: How do you pass data between components?
**Difficulty: Medium**

**Answer:**
React provides several ways to pass data between components, each suitable for different scenarios.

**1. Props (Parent to Child)**
Props are the primary way to pass data from parent to child components.

```jsx
// Parent Component
function App() {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg'
  };

  const handleUserUpdate = (updatedUser) => {
    console.log('User updated:', updatedUser);
    // Update user in state or send to API
  };

  return (
    <div>
      <Header title="User Dashboard" />
      <UserProfile 
        user={user}
        onUserUpdate={handleUserUpdate}
        isEditable={true}
      />
    </div>
  );
}

// Child Component
function UserProfile({ user, onUserUpdate, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {isEditable && (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
}
```

**2. Callback Functions (Child to Parent)**
Pass functions as props to allow child components to communicate back to parents.

```jsx
// Parent Component
function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <TodoForm onAddTodo={addTodo} />
      <TodoList 
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
}

// Child Components
function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
          onDelete={() => onDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}
```

**3. Context API (Global State)**
For data that needs to be accessed by many components at different nesting levels.

```jsx
// Create Context
const ThemeContext = createContext();
const UserContext = createContext();

// Context Provider
function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// Custom Hooks for Context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within AppProvider');
  }
  return context;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within AppProvider');
  }
  return context;
}

// Using Context in Components
function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();

  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>
      <div>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
        {user ? (
          <div>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
```

**4. State Management Libraries**
For complex applications, consider using Redux, Zustand, or Jotai.

```jsx
// Using Zustand for state management
import { create } from 'zustand';

const useStore = create((set, get) => ({
  // State
  user: null,
  todos: [],
  loading: false,
  
  // Actions
  setUser: (user) => set({ user }),
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {
      id: Date.now(),
      text,
      completed: false
    }]
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  fetchTodos: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      set({ todos, loading: false });
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      set({ loading: false });
    }
  }
}));

// Using the store in components
function TodoComponent() {
  const { todos, addTodo, toggleTodo, fetchTodos, loading } = useStore();
  
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}
```

**Best Practices:**
- Use props for direct parent-child communication
- Use callback functions for child-to-parent communication
- Use Context for global state that many components need
- Consider state management libraries for complex applications
- Keep state as close to where it's needed as possible
- Avoid prop drilling by using Context or state management libraries

---

## State Management

### Q5: Explain useState and how to manage state in functional components.
**Difficulty: Medium**

**Answer:**
The `useState` hook is the primary way to manage state in functional components. It allows you to add state variables to functional components and provides a way to update them.

**Basic useState Syntax:**
```jsx
const [state, setState] = useState(initialValue);
```

**Simple State Management:**
```jsx
import React, { useState } from 'react';

function Counter() {
  // Simple state with primitive value
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Content
      </button>
      
      {isVisible && <p>Hello, {name || 'Anonymous'}!</p>}
    </div>
  );
}
```

**Complex State Management:**
```jsx
function UserForm() {
  // Object state
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    preferences: {
      newsletter: false,
      notifications: true
    }
  });

  // Array state
  const [hobbies, setHobbies] = useState([]);
  const [errors, setErrors] = useState({});

  // Update object state - always create new object
  const updateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  // Update nested object state
  const updatePreference = (preference, value) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        [preference]: value
      }
    }));
  };

  // Add to array
  const addHobby = (hobby) => {
    if (hobby && !hobbies.includes(hobby)) {
      setHobbies(prevHobbies => [...prevHobbies, hobby]);
    }
  };

  // Remove from array
  const removeHobby = (hobbyToRemove) => {
    setHobbies(prevHobbies => 
      prevHobbies.filter(hobby => hobby !== hobbyToRemove)
    );
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!user.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!user.age || user.age < 18) {
      newErrors.age = 'Must be 18 or older';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', { user, hobbies });
      // Reset form
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        preferences: {
          newsletter: false,
          notifications: true
        }
      });
      setHobbies([]);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={user.firstName}
          onChange={(e) => updateUser('firstName', e.target.value)}
          placeholder="First Name"
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      
      <div>
        <input
          value={user.lastName}
          onChange={(e) => updateUser('lastName', e.target.value)}
          placeholder="Last Name"
        />
      </div>
      
      <div>
        <input
          type="email"
          value={user.email}
          onChange={(e) => updateUser('email', e.target.value)}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="number"
          value={user.age}
          onChange={(e) => updateUser('age', parseInt(e.target.value))}
          placeholder="Age"
        />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            checked={user.preferences.newsletter}
            onChange={(e) => updatePreference('newsletter', e.target.checked)}
          />
          Subscribe to newsletter
        </label>
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            checked={user.preferences.notifications}
            onChange={(e) => updatePreference('notifications', e.target.checked)}
          />
          Enable notifications
        </label>
      </div>
      
      <div>
        <h3>Hobbies:</h3>
        {hobbies.map(hobby => (
          <span key={hobby} className="hobby-tag">
            {hobby}
            <button type="button" onClick={() => removeHobby(hobby)}>×</button>
          </span>
        ))}
        <input
          type="text"
          placeholder="Add hobby"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addHobby(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Advanced State Patterns:**

1. **Functional Updates:**
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  // When new state depends on previous state, use functional update
  const addTodo = (text) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date()
      }
    ]);
  };
  
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  // Batch multiple state updates
  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

2. **Lazy Initial State:**
```jsx
function ExpensiveComponent() {
  // Expensive computation only runs once
  const [data, setData] = useState(() => {
    console.log('Computing initial state...');
    return processLargeDataSet();
  });
  
  // Alternative: using useEffect for async initialization
  const [asyncData, setAsyncData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchDataFromAPI();
        setAsyncData(result);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {/* Render data */}
    </div>
  );
}
```

3. **Custom Hooks for State Logic:**
```jsx
// Custom hook for form handling
function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const setValue = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const setTouched = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const validate = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field];
      const value = values[field];
      
      if (rule.required && !value) {
        newErrors[field] = `${field} is required`;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = rule.message;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validate,
    reset
  };
}

// Using the custom hook
function LoginForm() {
  const {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validate,
    reset
  } = useForm(
    { email: '', password: '' },
    {
      email: {
        required: true,
        pattern: /\S+@\S+\.\S+/,
        message: 'Please enter a valid email'
      },
      password: {
        required: true,
        pattern: /.{6,}/,
        message: 'Password must be at least 6 characters'
      }
    }
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login:', values);
      reset();
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={values.email}
        onChange={(e) => setValue('email', e.target.value)}
        onBlur={() => setTouched('email')}
        placeholder="Email"
      />
      {touched.email && errors.email && (
        <span className="error">{errors.email}</span>
      )}
      
      <input
        type="password"
        value={values.password}
        onChange={(e) => setValue('password', e.target.value)}
        onBlur={() => setTouched('password')}
        placeholder="Password"
      />
      {touched.password && errors.password && (
        <span className="error">{errors.password}</span>
      )}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

**Best Practices:**
- Always use functional updates when new state depends on previous state
- Don't mutate state directly - always create new objects/arrays
- Use lazy initial state for expensive computations
- Consider custom hooks for reusable state logic
- Keep state as local as possible
- Use multiple useState calls for unrelated state variables
- Validate and sanitize user input
- Handle loading and error states appropriately

---

## Hooks

### Q6: Explain useEffect and its use cases.
**Difficulty: Medium**

**Answer:**
The `useEffect` hook allows you to perform side effects in functional components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined in class components.

**Basic useEffect Syntax:**
```jsx
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]); // Dependencies array (optional)
```

**1. Component Mount (componentDidMount equivalent):**
```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs once after component mounts
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []); // Empty dependency array = run once on mount

  if (loading) return <div className="loading">Loading user...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
    </div>
  );
}
```

**2. Dependency-based Updates (componentDidUpdate equivalent):**
```jsx
function SearchResults({ query, filters }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Runs when query or filters change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    async function searchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: query,
          page: 1,
          ...filters
        });
        
        const response = await fetch(`/api/search?${params}`);
        const data = await response.json();
        
        setResults(data.results);
        setPage(1);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(searchProducts, 300);
    
    return () => clearTimeout(timeoutId);
  }, [query, filters]); // Runs when query or filters change

  // Load more results when page changes
  useEffect(() => {
    if (page === 1) return; // Skip first page (already loaded)

    async function loadMoreResults() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: query,
          page,
          ...filters
        });
        
        const response = await fetch(`/api/search?${params}`);
        const data = await response.json();
        
        setResults(prev => [...prev, ...data.results]);
      } catch (error) {
        console.error('Failed to load more results:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMoreResults();
  }, [page, query, filters]);

  return (
    <div>
      {loading && <div>Searching...</div>}
      <div className="results">
        {results.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {results.length > 0 && (
        <button onClick={() => setPage(prev => prev + 1)}>
          Load More
        </button>
      )}
    </div>
  );
}
```

**3. Cleanup (componentWillUnmount equivalent):**
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // Cleanup function - runs when component unmounts or dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); // Runs when isRunning changes

  return (
    <div>
      <h2>Timer: {seconds}s</h2>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => {
        setSeconds(0);
        setIsRunning(false);
      }}>
        Reset
      </button>
    </div>
  );
}
```

**4. Event Listeners and DOM Manipulation:**
```jsx
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array = setup once, cleanup on unmount

  return (
    <div>
      <p>Window size: {windowSize.width} x {windowSize.height}</p>
    </div>
  );
}

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowButton(window.pageYOffset > 300);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    showButton && (
      <button 
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    )
  );
}
```

**5. Multiple useEffect Hooks:**
```jsx
function BlogPost({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch main post
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [postId]);

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();
  }, [postId]);

  // Fetch related posts (depends on post category)
  useEffect(() => {
    if (!post?.category) return;

    async function fetchRelatedPosts() {
      try {
        const response = await fetch(`/api/posts?category=${post.category}&exclude=${postId}`);
        const relatedData = await response.json();
        setRelatedPosts(relatedData.slice(0, 5)); // Limit to 5 related posts
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    }

    fetchRelatedPosts();
  }, [post?.category, postId]);

  // Update document title
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - My Blog`;
    }

    // Cleanup: reset title when component unmounts
    return () => {
      document.title = 'My Blog';
    };
  }, [post?.title]);

  // Track page view analytics
  useEffect(() => {
    if (post) {
      // Analytics tracking
      analytics.track('Page View', {
        page: 'Blog Post',
        postId: post.id,
        title: post.title,
        category: post.category
      });
    }
  }, [post]);

  if (loading && !post) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <section>
        <h3>Comments ({comments.length})</h3>
        {comments.map(comment => (
          <div key={comment.id}>
            <strong>{comment.author}</strong>
            <p>{comment.content}</p>
          </div>
        ))}
      </section>
      
      {relatedPosts.length > 0 && (
        <section>
          <h3>Related Posts</h3>
          {relatedPosts.map(relatedPost => (
            <a key={relatedPost.id} href={`/posts/${relatedPost.id}`}>
              {relatedPost.title}
            </a>
          ))}
        </section>
      )}
    </article>
  );
}
```

**6. Custom Hooks with useEffect:**
```jsx
// Custom hook for API calls
function useApi(url, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, ...dependencies]);

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes in other tabs
  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error);
        }
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

// Using custom hooks
function UserDashboard() {
  const { data: user, loading, error } = useApi('/api/user/profile');
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    language: 'en'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`dashboard ${preferences.theme}`}>
      <h1>Welcome, {user.name}!</h1>
      <button 
        onClick={() => setPreferences({
          ...preferences,
          theme: preferences.theme === 'light' ? 'dark' : 'light'
        })}
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

**Common useEffect Patterns and Best Practices:**

1. **Dependency Array Guidelines:**
   - No dependency array: runs after every render
   - Empty array `[]`: runs once after mount
   - With dependencies `[dep1, dep2]`: runs when dependencies change

2. **Cleanup is Important:**
   - Always cleanup subscriptions, timers, and event listeners
   - Prevent memory leaks and unexpected behavior

3. **Avoid Infinite Loops:**
   - Be careful with object/array dependencies
   - Use useCallback and useMemo when necessary

4. **Separate Concerns:**
   - Use multiple useEffect hooks for different concerns
   - Each effect should have a single responsibility

5. **Handle Race Conditions:**
   - Use cleanup functions to cancel ongoing requests
   - Check if component is still mounted before setting state

**Common Mistakes to Avoid:**
- Missing dependencies in the dependency array
- Not cleaning up side effects
- Putting objects/arrays directly in dependency arrays without memoization
- Using useEffect for derived state (use useMemo instead)
- Not handling loading and error states properly

---

This comprehensive guide covers the fundamental concepts of React.js with detailed explanations and practical examples. Each answer includes real-world scenarios and best practices to help developers understand not just the "how" but also the "why" behind React patterns.