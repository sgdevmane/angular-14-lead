# React.js Interview Questions

## Table of Contents
1. [Q1: What is React and what are its key features?](#q1-what-is-react-and-what-are-its-key-features)
2. [Q2: Explain the difference between functional and class components.](#q2-explain-the-difference-between-functional-and-class-components)
3. [Q3: What is JSX and how does it work?](#q3-what-is-jsx-and-how-does-it-work)
4. [Q4: How do you pass data between components?](#q4-how-do-you-pass-data-between-components)
5. [Q5: Explain useState and how to manage state in functional components.](#q5-explain-usestate-and-how-to-manage-state-in-functional-components)
6. [Q6: Explain useEffect and its use cases.](#q6-explain-useeffect-and-its-use-cases)
7. [Q7: Explain React Server Components and how they differ from traditional React components.](#q7-explain-react-server-components-and-how-they-differ-from-traditional-react-components)
8. [Q8: How do you optimize React application performance using React.memo, useMemo, and useCallback?](#q8-how-do-you-optimize-react-application-performance-using-reactmemo-usememo-and-usecallback)
9. [Q9: How do you implement error boundaries and error handling in React applications?](#q9-how-do-you-implement-error-boundaries-and-error-handling-in-react-applications)
10. [Q10: Explain React Context API and when to use it over prop drilling.](#q10-explain-react-context-api-and-when-to-use-it-over-prop-drilling)
11. [Q11: What are Higher-Order Components (HOCs) and how do you implement them?](#q11-what-are-higher-order-components-hocs-and-how-do-you-implement-them)
12. [Q12: How do you test React components using Jest and React Testing Library?](#q12-how-do-you-test-react-components-using-jest-and-react-testing-library)
13. [Q13: How do you implement and test React Router navigation?](#q13-how-do-you-implement-and-test-react-router-navigation)
14. [Q14: How do you implement React Suspense and Concurrent Features?](#q14-how-do-you-implement-react-suspense-and-concurrent-features)
15. [Q15: How do you implement custom React hooks for complex state management?](#q15-how-do-you-implement-custom-react-hooks-for-complex-state-management)
16. [Q16: How do you implement React Server Components and streaming SSR?](#q16-how-do-you-implement-react-server-components-and-streaming-ssr)
17. [Q17: How do you implement advanced React patterns like Compound Components and Render Props?](#q17-how-do-you-implement-advanced-react-patterns-like-compound-components-and-render-props)
18. [Q18: How do you implement micro-frontends with React and Module Federation?](#q18-how-do-you-implement-micro-frontends-with-react-and-module-federation)
19. [Q19: How do you implement advanced React performance optimization techniques?](#q19-how-do-you-implement-advanced-react-performance-optimization-techniques)
20. [Q20: How do you implement React 18+ concurrent features and automatic batching?](#q20-how-do-you-implement-react-18-concurrent-features-and-automatic-batching)
21. [Q21: How do you implement React Server Components and modern full-stack React architecture?](#q21-how-do-you-implement-react-server-components-and-modern-full-stack-react-architecture)

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
import React, { useState }
```

```jsx
// components/InteractiveButton.js (Client Component)
'use client';

import { useState, useTransition } from 'react';
import { followUser, unfollowUser } from '@/lib/actions';

export function InteractiveButton({ userId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const handleFollow = () => {
    startTransition(async () => {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
      } else {
        await followUser(userId);
        setIsFollowing(true);
      }
    });
  };
  
  return (
    <button 
      onClick={handleFollow}
      disabled={isPending}
      className={`follow-btn ${isFollowing ? 'following' : ''}`}
    >
      {isPending ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
```

```jsx
// components/InteractiveButton.js (Client Component)
'use client';

import { useState, useTransition } from 'react';
import { followUser, unfollowUser } from '@/lib/actions';

export function InteractiveButton({ userId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const handleFollow = () => {
    startTransition(async () => {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
      } else {
        await followUser(userId);
        setIsFollowing(true);
      }
    });
  };
  
  return (
    <button 
      onClick={handleFollow}
      disabled={isPending}
      className={`follow-btn ${isFollowing ? 'following' : ''}`}
    >
      {isPending ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
```

**3. Server Actions for Form Handling:**

```jsx
// lib/actions.js (Server Actions)
'use server';

import { db } from './database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const userId = formData.get('userId');
  
  // Validation
  if (!title || !content) {
    return { error: 'Title and content are required' };
  }
  
  try {
    const result = await db.query(
      'INSERT INTO posts (title, content, user_id, created_at) VALUES (?, ?, ?, NOW())',
      [title, content, userId]
    );
    
    // Revalidate the posts page to show new post
    revalidatePath('/posts');
    
    // Redirect to the new post
    redirect(`/posts/${result.insertId}`);
  } catch (error) {
    console.error('Failed to create post:', error);
    return { error: 'Failed to create post' };
  }
}

export async function updatePost(postId, formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  try {
    await db.query(
      'UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ?',
      [title, content, postId]
    );
    
    revalidatePath(`/posts/${postId}`);
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update post' };
  }
}
```

**4. Data Fetching and Caching Patterns:**

```jsx
// lib/data.js
import { cache } from 'react';
import { db } from './database';

// Cache function calls across the request
export const getUser = cache(async (userId) => {
  console.log('Fetching user:', userId); // Only logs once per request
  
  const user = await db.query(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  
  return user[0];
});

export const getUserPosts = cache(async (userId, limit = 10) => {
  const posts = await db.query(
    'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
    [userId, limit]
  );
  
  return posts;
});

// Parallel data fetching
export async function getUserDashboardData(userId) {
  const [user, posts, analytics] = await Promise.all([
    getUser(userId),
    getUserPosts(userId, 5),
    getUserAnalytics(userId)
  ]);
  
  return { user, posts, analytics };
}
```

**Best Practices:**

1. **Server vs Client Components**: Use Server Components by default, Client Components only when needed for interactivity
2. **Data Fetching**: Fetch data as close to where it's needed as possible
3. **Caching**: Use React's `cache` function to deduplicate requests
4. **Streaming**: Use Suspense boundaries to stream content progressively
5. **Error Handling**: Implement proper error boundaries and not-found pages
6. **Performance**: Optimize bundle size by keeping client components minimal
7. **SEO**: Leverage server-side rendering for better search engine optimization
8. **Security**: Never expose sensitive data in Client Components

React Server Components represent the future of React development, enabling better performance, SEO, and developer experience while maintaining the component-based architecture that makes React powerful.

**3. Server Actions for Form Handling:**

```jsx
// lib/actions.js (Server Actions)
'use server';

import { db } from './database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const userId = formData.get('userId');
  
  // Validation
  if (!title || !content) {
    return { error: 'Title and content are required' };
  }
  
  try {
    const result = await db.query(
      'INSERT INTO posts (title, content, user_id, created_at) VALUES (?, ?, ?, NOW())',
      [title, content, userId]
    );
    
    // Revalidate the posts page to show new post
    revalidatePath('/posts');
    
    // Redirect to the new post
    redirect(`/posts/${result.insertId}`);
  } catch (error) {
    console.error('Failed to create post:', error);
    return { error: 'Failed to create post' };
  }
}

export async function updatePost(postId, formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  try {
    await db.query(
      'UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ?',
      [title, content, postId]
    );
    
    revalidatePath(`/posts/${postId}`);
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update post' };
  }
}
```

**Best Practices:**

1. **Server vs Client Components**: Use Server Components by default, Client Components only when needed for interactivity
2. **Data Fetching**: Fetch data as close to where it's needed as possible
3. **Caching**: Use React's `cache` function to deduplicate requests
4. **Streaming**: Use Suspense boundaries to stream content progressively
5. **Error Handling**: Implement proper error boundaries and not-found pages
6. **Performance**: Optimize bundle size by keeping client components minimal
7. **SEO**: Leverage server-side rendering for better search engine optimization
8. **Security**: Never expose sensitive data in Client Components

React Server Components represent the future of React development, enabling better performance, SEO, and developer experience while maintaining the component-based architecture that makes React powerful. from 'react';

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

### Q7: Explain React Server Components and how they differ from traditional React components.
**Difficulty: Hard**

**Answer:**
React Server Components (RSC) represent a paradigm shift in how React applications are built, allowing components to render on the server without requiring JavaScript to be sent to the client. This feature was introduced as part of React 18 and is a key part of the React architecture moving forward, especially in frameworks like Next.js 13+ and Remix.

**Key Characteristics of Server Components:**

1. **Server-Only Rendering**: Server Components execute and render entirely on the server, with only their output HTML sent to the client.

2. **Zero JavaScript Footprint**: They don't increase your client-side JavaScript bundle size because they don't get shipped to the client.

3. **Direct Backend Access**: They can directly access backend resources like databases, file systems, and internal services without API layers.

4. **Automatic Code Splitting**: They naturally split your application code between server and client.

5. **Progressive Enhancement**: They work well with traditional client components for interactive features.

**Server Components vs. Client Components:**

```jsx
// Server Component (saved as Page.server.jsx in some implementations)
// or using the 'use server' directive in Next.js
import db from '../database'; // Direct database access

async function UserProfile({ userId }) {
  // Direct database query without an API layer
  const user = await db.users.findById(userId);
  const userPosts = await db.posts.findByAuthor(userId);
  
  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <ProfileDetails user={user} />
      <PostList posts={userPosts} />
    </div>
  );
}

// Client Component (saved as Counter.client.jsx in some implementations)
// or using the 'use client' directive in Next.js
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**How Server Components Work:**

1. **Initial Request**: When a user visits a page, the server renders the Server Components.

2. **Streaming HTML**: The server streams HTML to the client, which can be displayed immediately.

3. **Hydration**: Any Client Components within the page are then hydrated, making them interactive.

4. **Subsequent Updates**: When data changes, only the affected components are re-rendered, not the entire page.

**Benefits of Server Components:**

1. **Improved Performance**:
   - Reduced JavaScript bundle size
   - Faster initial page load
   - Improved Time to First Byte (TTFB)
   - Better Core Web Vitals scores

2. **Enhanced Developer Experience**:
   - Simplified data fetching
   - No need for separate API endpoints
   - Automatic code splitting
   - Reduced prop drilling

3. **Better Security**:
   - Sensitive code and data stays on the server
   - API keys and secrets never exposed to the client
   - Reduced attack surface

**Implementation in Next.js 13+:**

```jsx
// app/page.js - Server Component by default
async function HomePage() {
  const products = await fetchProducts(); // Direct server-side data fetching
  
  return (
    <main>
      <h1>Welcome to our store</h1>
      <ProductGrid products={products} />
      <ClientSideCart /> {/* This is a Client Component */}
    </main>
  );
}

export default HomePage;

// app/components/client-side-cart.js
'use client'; // This directive marks it as a Client Component

import { useState } from 'react';

export default function ClientSideCart() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="cart">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'} Cart
      </button>
      {isOpen && <CartContents />}
    </div>
  );
}
```

**Patterns and Best Practices:**

1. **Component Splitting Strategy**:
   - Use Server Components for data fetching, access control, and static content
   - Use Client Components for interactive elements, state management, and event handling

2. **Data Fetching Pattern**:
```jsx
// Server Component with parallel data fetching
async function Dashboard() {
  // These requests run in parallel
  const userPromise = fetchUser();
  const postsPromise = fetchPosts();
  const analyticsPromise = fetchAnalytics();
  
  // Wait for all data to be available
  const [user, posts, analytics] = await Promise.all([
    userPromise,
    postsPromise,
    analyticsPromise
  ]);
  
  return (
    <div>
      <UserHeader user={user} />
      <PostList posts={posts} />
      <AnalyticsDashboard data={analytics} />
    </div>
  );
}
```

3. **Interleaving Server and Client Components**:
```jsx
// Server Component
async function ProductPage({ productId }) {
  const product = await fetchProduct(productId);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <ProductDetails product={product} />
      {/* Client Component embedded within Server Component */}
      <AddToCartButton productId={product.id} /> 
      {/* Another Server Component */}
      <RelatedProducts categoryId={product.categoryId} />
    </div>
  );
}

// Client Component
'use client';
function AddToCartButton({ productId }) {
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAddToCart = async () => {
    await addToCart(productId);
    setIsAdded(true);
  };
  
  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdded}
    >
      {isAdded ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
}
```

4. **Progressive Loading with Suspense**:
```jsx
import { Suspense } from 'react';

function ProductPage({ productId }) {
  return (
    <div>
      <ProductHeader productId={productId} />
      <Suspense fallback={<p>Loading details...</p>}>
        <ProductDetails productId={productId} />
      </Suspense>
      <Suspense fallback={<p>Loading reviews...</p>}>
        <ProductReviews productId={productId} />
      </Suspense>
    </div>
  );
}
```

**Limitations and Considerations:**

1. **No Browser APIs**: Server Components cannot access browser-specific APIs like `window`, `document`, or browser events.

2. **No React Hooks**: Server Components cannot use React hooks like `useState` or `useEffect`.

3. **No Event Handlers**: Server Components cannot include event handlers like `onClick` or `onChange`.

4. **Framework Dependency**: Full RSC implementation currently requires a framework like Next.js or a specialized bundler setup.

5. **Learning Curve**: Developers need to understand the mental model of which code runs where and how to structure applications accordingly.

Server Components represent a significant evolution in React's architecture, enabling developers to build more performant applications with simplified data access patterns while maintaining React's component model and composition benefits.

---

## Performance Optimization

### Q8: How do you optimize React application performance using React.memo, useMemo, and useCallback?

**Difficulty: Medium**

**Answer:**
React provides several built-in optimization techniques to prevent unnecessary re-renders and expensive calculations. Understanding when and how to use these tools is crucial for building performant applications.

**1. React.memo - Component Memoization:**

React.memo is a higher-order component that memoizes the result of a component and only re-renders if its props change.

```jsx
import React, { memo, useState, useCallback } from 'react';

// Without memo - re-renders on every parent update
function ExpensiveChild({ name, count }) {
  console.log('ExpensiveChild rendered');
  
  // Simulate expensive calculation
  const expensiveValue = React.useMemo(() => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result + count;
  }, [count]);
  
  return (
    <div>
      <h3>{name}</h3>
      <p>Expensive calculation result: {expensiveValue}</p>
    </div>
  );
}

// With memo - only re-renders when props change
const MemoizedChild = memo(ExpensiveChild);

// Custom comparison function for complex props
const MemoizedChildWithCustomComparison = memo(ExpensiveChild, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name && prevProps.count === nextProps.count;
});
```

**2. useMemo - Value Memoization:**

useMemo memoizes expensive calculations and only recalculates when dependencies change.

```jsx
import React, { useState, useMemo } from 'react';

function ProductList({ products, searchTerm, sortBy }) {
  // Expensive filtering and sorting operation
  const processedProducts = useMemo(() => {
    console.log('Processing products...');
    
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [products, searchTerm, sortBy]);
  
  // Memoize derived statistics
  const statistics = useMemo(() => {
    return {
      totalProducts: processedProducts.length,
      averagePrice: processedProducts.reduce((sum, p) => sum + p.price, 0) / processedProducts.length,
      averageRating: processedProducts.reduce((sum, p) => sum + p.rating, 0) / processedProducts.length
    };
  }, [processedProducts]);
  
  return (
    <div>
      <div className="statistics">
        <p>Total: {statistics.totalProducts}</p>
        <p>Avg Price: ${statistics.averagePrice.toFixed(2)}</p>
        <p>Avg Rating: {statistics.averageRating.toFixed(1)}</p>
      </div>
      
      <div className="products">
        {processedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

**3. useCallback - Function Memoization:**

useCallback memoizes functions to prevent unnecessary re-renders of child components that depend on function props.

```jsx
import React, { useState, useCallback, memo } from 'react';

// Child component that receives callback props
const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }) => {
  console.log(`TodoItem ${todo.id} rendered`);
  
  return (
    <div className="todo-item">
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span 
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => onEdit(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: false }
  ]);
  const [filter, setFilter] = useState('all');
  
  // Without useCallback - new function on every render
  // const handleToggle = (id) => {
  //   setTodos(todos => todos.map(todo => 
  //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //   ));
  // };
  
  // With useCallback - function only changes when dependencies change
  const handleToggle = useCallback((id) => {
    setTodos(todos => todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []); // Empty dependency array since we use functional update
  
  const handleDelete = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);
  
  const handleEdit = useCallback((id) => {
    const newText = prompt('Edit todo:');
    if (newText) {
      setTodos(todos => todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      ));
    }
  }, []);
  
  // Memoize filtered todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  return (
    <div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      
      <div className="todos">
        {filteredTodos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
```

**4. Advanced Performance Optimization Patterns:**

```jsx
import React, { useState, useMemo, useCallback, memo, useRef } from 'react';

// Custom hook for debounced values
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Virtualized list component for large datasets
const VirtualizedList = memo(({ items, itemHeight = 50, containerHeight = 400 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef();
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index
    }));
  }, [items, scrollTop, itemHeight, containerHeight]);
  
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map(item => (
          <div 
            key={item.id}
            style={{
              position: 'absolute',
              top: item.index * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
});

// Performance monitoring component
function PerformanceMonitor({ children }) {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());
  
  React.useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    console.log(`Render #${renderCount.current} took ${endTime - startTime.current}ms`);
    startTime.current = endTime;
  });
  
  return children;
}
```

**Best Practices:**

1. **Use React.memo sparingly**: Only memoize components that actually have performance issues
2. **Avoid inline objects and functions**: They break memoization
3. **Use useCallback for event handlers**: Especially when passing to memoized child components
4. **Use useMemo for expensive calculations**: Not for simple operations
5. **Profile before optimizing**: Use React DevTools Profiler to identify actual bottlenecks
6. **Consider code splitting**: Use React.lazy and Suspense for large components
7. **Optimize bundle size**: Use tree shaking and analyze bundle composition

**Common Mistakes to Avoid:**
- Over-memoizing everything (can actually hurt performance)
- Forgetting dependencies in useMemo/useCallback
- Using useMemo for values that change frequently
- Not measuring performance impact of optimizations

---

### Q9: How do you implement error boundaries and error handling in React applications?

**Difficulty: Medium**

**Answer:**
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. They're essential for building robust React applications.

**1. Basic Error Boundary Implementation:**

```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }
  
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Report error to monitoring service
    this.reportError(error, errorInfo);
  }
  
  reportError = (error, errorInfo) => {
    // Example: Send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket, Bugsnag, etc.
      console.log('Reporting error to monitoring service:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }
  
  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error details (click to expand)</summary>
            <p><strong>Error:</strong> {this.state.error && this.state.error.toString()}</p>
            <p><strong>Component Stack:</strong></p>
            <pre>{this.state.errorInfo.componentStack}</pre>
          </details>
          <button onClick={this.handleRetry}>Try Again</button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

**2. Advanced Error Boundary with Different Fallback UIs:**

```jsx
import React, { Component } from 'react';

class AdvancedErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
      retryCount: 0
    };
  }
  
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }
  
  componentDidCatch(error, errorInfo) {
    const { onError, level = 'error' } = this.props;
    
    this.setState({ error });
    
    // Custom error handler
    if (onError) {
      onError(error, errorInfo, this.state.errorId);
    }
    
    // Log based on level
    this.logError(error, errorInfo, level);
  }
  
  logError = (error, errorInfo, level) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    switch (level) {
      case 'warning':
        console.warn('Warning caught by boundary:', errorData);
        break;
      case 'error':
        console.error('Error caught by boundary:', errorData);
        break;
      case 'critical':
        console.error('Critical error caught by boundary:', errorData);
        // Send to monitoring service immediately
        this.sendToMonitoring(errorData);
        break;
      default:
        console.log('Info caught by boundary:', errorData);
    }
  }
  
  sendToMonitoring = (errorData) => {
    // Example integration with monitoring service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(err => console.error('Failed to send error to monitoring:', err));
  }
  
  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorId: null,
      retryCount: prevState.retryCount + 1
    }));
  }
  
  render() {
    const { hasError, retryCount } = this.state;
    const { fallback: Fallback, level = 'error' } = this.props;
    
    if (hasError) {
      // Custom fallback component
      if (Fallback) {
        return (
          <Fallback 
            error={this.state.error}
            errorId={this.state.errorId}
            onRetry={this.handleRetry}
            retryCount={retryCount}
          />
        );
      }
      
      // Default fallback based on level
      switch (level) {
        case 'warning':
          return (
            <div className="error-warning">
              <p>⚠️ Something's not quite right, but you can continue.</p>
              <button onClick={this.handleRetry}>Refresh</button>
            </div>
          );
        case 'critical':
          return (
            <div className="error-critical">
              <h1>🚨 Critical Error</h1>
              <p>We're sorry, but something went seriously wrong.</p>
              <p>Error ID: {this.state.errorId}</p>
              <button onClick={() => window.location.reload()}>Reload Page</button>
            </div>
          );
        default:
          return (
            <div className="error-default">
              <h2>😕 Oops! Something went wrong</h2>
              <p>Don't worry, it's not your fault. Please try again.</p>
              <button onClick={this.handleRetry}>Try Again</button>
              {retryCount > 2 && (
                <button onClick={() => window.location.reload()}>Reload Page</button>
              )}
            </div>
          );
      }
    }
    
    return this.props.children;
  }
}
```

**3. Functional Error Boundary Hook (React 18+):**

```jsx
import React, { useState, useEffect } from 'react';

// Custom hook for error handling
function useErrorHandler() {
  const [error, setError] = useState(null);
  
  const resetError = () => setError(null);
  
  const captureError = (error, errorInfo) => {
    setError({ error, errorInfo });
    
    // Log error
    console.error('Error captured:', error, errorInfo);
    
    // Report to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service
    }
  };
  
  return { error, resetError, captureError };
}

// Functional component with error handling
function FunctionalErrorBoundary({ children, fallback }) {
  const { error, resetError, captureError } = useErrorHandler();
  
  useEffect(() => {
    const handleError = (event) => {
      captureError(event.error, { componentStack: 'Unknown' });
    };
    
    const handleUnhandledRejection = (event) => {
      captureError(new Error(event.reason), { componentStack: 'Promise rejection' });
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [captureError]);
  
  if (error) {
    if (fallback) {
      return fallback(error, resetError);
    }
    
    return (
      <div className="error-boundary">
        <h2>Something went wrong</h2>
        <button onClick={resetError}>Try Again</button>
      </div>
    );
  }
  
  return children;
}
```

**4. Async Error Handling:**

```jsx
import React, { useState, useEffect } from 'react';

// Custom hook for async operations with error handling
function useAsyncOperation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const execute = async (asyncFunction) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const reset = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };
  
  return { loading, error, data, execute, reset };
}

// Component using async error handling
function DataFetcher({ userId }) {
  const { loading, error, data, execute, reset } = useAsyncOperation();
  
  const fetchUserData = async () => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    return response.json();
  };
  
  useEffect(() => {
    execute(fetchUserData);
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  
  if (error) {
    return (
      <div className="error-state">
        <h3>Failed to load user data</h3>
        <p>{error.message}</p>
        <button onClick={() => execute(fetchUserData)}>Retry</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }
  
  return (
    <div>
      <h2>{data?.name}</h2>
      <p>{data?.email}</p>
    </div>
  );
}
```

**5. Usage Examples:**

```jsx
// App-level error boundary
function App() {
  return (
    <AdvancedErrorBoundary 
      level="critical"
      onError={(error, errorInfo, errorId) => {
        // Send to analytics
        analytics.track('Error Occurred', {
          errorId,
          message: error.message,
          component: errorInfo.componentStack
        });
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={
            <AdvancedErrorBoundary level="error">
              <HomePage />
            </AdvancedErrorBoundary>
          } />
          <Route path="/profile" element={
            <AdvancedErrorBoundary 
              level="warning"
              fallback={({ error, onRetry }) => (
                <div>
                  <p>Profile couldn't load: {error.message}</p>
                  <button onClick={onRetry}>Try Again</button>
                </div>
              )}
            >
              <ProfilePage />
            </AdvancedErrorBoundary>
          } />
        </Routes>
      </Router>
    </AdvancedErrorBoundary>
  );
}
```

**Best Practices:**

1. **Strategic Placement**: Place error boundaries at different levels of your component tree
2. **Granular Error Handling**: Use different error boundaries for different parts of your app
3. **User-Friendly Messages**: Provide clear, actionable error messages
4. **Error Reporting**: Always log errors to monitoring services in production
5. **Recovery Options**: Provide retry mechanisms and fallback UIs
6. **Testing**: Test error scenarios and error boundary behavior
7. **Performance**: Don't let error handling impact normal app performance

**What Error Boundaries Don't Catch:**
- Errors inside event handlers
- Errors in asynchronous code (setTimeout, promises)
- Errors during server-side rendering
- Errors thrown in the error boundary itself

For these cases, use try-catch blocks, promise .catch() methods, and proper async error handling patterns.

---

## Advanced React Patterns

### Q10: Explain React Context API and when to use it over prop drilling.

**Difficulty: Medium**

**Answer:**
The React Context API provides a way to share data between components without having to pass props down manually at every level. It's designed to solve the "prop drilling" problem where you need to pass data through many intermediate components.

**1. Basic Context Implementation:**

```jsx
import React, { createContext, useContext, useState, useReducer } from 'react';

// Create Context
const ThemeContext = createContext();
const UserContext = createContext();

// Theme Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Component using the context
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}

// Deeply nested component that needs theme
function Button({ children, onClick }) {
  const { theme } = useTheme();
  
  return (
    <button 
      className={`btn btn-${theme}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

**2. Advanced Context with useReducer:**

```jsx
import React, { createContext, useContext, useReducer } from 'react';

// User state management with reducer
const initialUserState = {
  user: null,
  loading: false,
  error: null,
  preferences: {
    notifications: true,
    theme: 'light',
    language: 'en'
  }
};

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...initialUserState
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return state;
  }
}

// User Context Provider
function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const user = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
    }
  };
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  
  const updatePreferences = (preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };
  
  const updateProfile = (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };
  
  const value = {
    ...state,
    login,
    logout,
    updatePreferences,
    updateProfile
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for user context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

**3. Multiple Context Providers Pattern:**

```jsx
// App Providers Composition
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

// Main App Component
function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </AppProviders>
  );
}
```

**4. Context with Performance Optimization:**

```jsx
import React, { createContext, useContext, useMemo, useCallback } from 'react';

// Separate contexts for different concerns to prevent unnecessary re-renders
const CartStateContext = createContext();
const CartActionsContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Memoize state to prevent unnecessary re-renders
  const state = useMemo(() => ({
    items,
    loading,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }), [items, loading]);
  
  // Memoize actions to prevent unnecessary re-renders
  const actions = useMemo(() => ({
    addItem: useCallback((product) => {
      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    }, []),
    
    removeItem: useCallback((productId) => {
      setItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []),
    
    updateQuantity: useCallback((productId, quantity) => {
      if (quantity <= 0) {
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
      } else {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
    }, []),
    
    clearCart: useCallback(() => {
      setItems([]);
    }, [])
  }), []);
  
  return (
    <CartStateContext.Provider value={state}>
      <CartActionsContext.Provider value={actions}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
}

// Separate hooks for state and actions
function useCartState() {
  const context = useContext(CartStateContext);
  if (!context) {
    throw new Error('useCartState must be used within a CartProvider');
  }
  return context;
}

function useCartActions() {
  const context = useContext(CartActionsContext);
  if (!context) {
    throw new Error('useCartActions must be used within a CartProvider');
  }
  return context;
}
```

**When to Use Context vs Prop Drilling:**

**Use Context When:**
- Data is needed by many components at different nesting levels
- You have global application state (user authentication, theme, language)
- Prop drilling becomes cumbersome (passing through 3+ levels)
- You need to avoid "threading" props through components that don't use them

**Use Prop Drilling When:**
- Data is only needed by a few closely related components
- The component tree is shallow (1-2 levels)
- You want explicit data flow that's easy to trace
- Performance is critical and you want to avoid context re-renders

**Best Practices:**
1. **Split contexts by concern**: Don't put everything in one context
2. **Use custom hooks**: Encapsulate context logic in custom hooks
3. **Optimize for performance**: Separate state and actions, use useMemo/useCallback
4. **Provide default values**: Always provide meaningful default values
5. **Error boundaries**: Wrap context providers with error boundaries
6. **TypeScript**: Use TypeScript for better type safety with contexts

---

### Q11: What are Higher-Order Components (HOCs) and how do you implement them?

**Difficulty: Medium-Hard**

**Answer:**
Higher-Order Components (HOCs) are a pattern in React for reusing component logic. An HOC is a function that takes a component and returns a new component with additional props or behavior. It's a way to share common functionality between components.

**1. Basic HOC Implementation:**

```jsx
import React, { useState, useEffect } from 'react';

// Basic HOC that adds loading state
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Simulate loading
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }, []);
    
    if (loading) {
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Usage
function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

const UserProfileWithLoading = withLoading(UserProfile);
```

**2. HOC with Authentication:**

```jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// HOC for authentication
function withAuth(WrappedComponent, options = {}) {
  return function WithAuthComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { redirectTo = '/login', requiredRoles = [] } = options;
    
    useEffect(() => {
      async function checkAuth() {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            throw new Error('No token found');
          }
          
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Token invalid');
          }
          
          const userData = await response.json();
          
          // Check if user has required roles
          if (requiredRoles.length > 0) {
            const hasRequiredRole = requiredRoles.some(role => 
              userData.roles.includes(role)
            );
            
            if (!hasRequiredRole) {
              throw new Error('Insufficient permissions');
            }
          }
          
          setUser(userData);
        } catch (error) {
          console.error('Authentication failed:', error);
          localStorage.removeItem('authToken');
          navigate(redirectTo);
        } finally {
          setLoading(false);
        }
      }
      
      checkAuth();
    }, [navigate, redirectTo]);
    
    if (loading) {
      return <div>Authenticating...</div>;
    }
    
    if (!user) {
      return null; // Will redirect
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
function AdminDashboard({ user }) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  );
}

const ProtectedAdminDashboard = withAuth(AdminDashboard, {
  redirectTo: '/login',
  requiredRoles: ['admin']
});
```

**3. HOC for Data Fetching:**

```jsx
import React, { useState, useEffect } from 'react';

// Generic data fetching HOC
function withDataFetching(WrappedComponent, config) {
  return function WithDataFetchingComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { 
      url, 
      propName = 'data',
      dependencies = [],
      transform = (data) => data,
      onError = (error) => console.error(error)
    } = typeof config === 'function' ? config(props) : config;
    
    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          setError(null);
          
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          const transformedData = transform(result);
          setData(transformedData);
        } catch (err) {
          setError(err);
          onError(err);
        } finally {
          setLoading(false);
        }
      }
      
      fetchData();
    }, dependencies);
    
    const enhancedProps = {
      ...props,
      [propName]: data,
      [`${propName}Loading`]: loading,
      [`${propName}Error`]: error
    };
    
    return <WrappedComponent {...enhancedProps} />;
  };
}

// Usage
function UserList({ users, usersLoading, usersError }) {
  if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <div>Error: {usersError.message}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}

const UserListWithData = withDataFetching(UserList, {
  url: '/api/users',
  propName: 'users',
  transform: (data) => data.users || [],
  onError: (error) => {
    console.error('Failed to fetch users:', error);
    // Could also send to error reporting service
  }
});

// Dynamic configuration based on props
function PostList({ posts, postsLoading, postsError }) {
  if (postsLoading) return <div>Loading posts...</div>;
  if (postsError) return <div>Error: {postsError.message}</div>;
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

const PostListWithData = withDataFetching(PostList, (props) => ({
  url: `/api/users/${props.userId}/posts`,
  propName: 'posts',
  dependencies: [props.userId],
  transform: (data) => data.posts || []
}));
```

**4. Composing Multiple HOCs:**

```jsx
import { compose } from 'redux'; // or create your own compose function

// Utility function to compose HOCs
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  
  if (funcs.length === 1) {
    return funcs[0];
  }
  
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// HOC for error boundary
function withErrorBoundary(WrappedComponent) {
  return class WithErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
      console.error('Error caught by HOC:', error, errorInfo);
    }
    
    render() {
      if (this.state.hasError) {
        return <div>Something went wrong.</div>;
      }
      
      return <WrappedComponent {...this.props} />;
    }
  };
}

// HOC for analytics tracking
function withAnalytics(WrappedComponent, eventName) {
  return function WithAnalyticsComponent(props) {
    useEffect(() => {
      // Track component mount
      analytics.track(`${eventName}_viewed`, {
        timestamp: new Date().toISOString(),
        props: Object.keys(props)
      });
      
      return () => {
        // Track component unmount
        analytics.track(`${eventName}_left`, {
          timestamp: new Date().toISOString()
        });
      };
    }, []);
    
    return <WrappedComponent {...props} />;
  };
}

// Compose multiple HOCs
const enhance = compose(
  withAuth({ requiredRoles: ['user'] }),
  withErrorBoundary,
  withLoading,
  withAnalytics('dashboard')
);

const EnhancedDashboard = enhance(Dashboard);
```

**5. Modern Alternative - Custom Hooks:**

```jsx
// Modern approach using custom hooks instead of HOCs
function useAuth(options = {}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Authentication logic here
  }, []);
  
  return { user, loading };
}

function useDataFetching(url, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Data fetching logic here
  }, dependencies);
  
  return { data, loading, error };
}

// Usage with hooks (preferred modern approach)
function Dashboard() {
  const { user, loading: authLoading } = useAuth({ requiredRoles: ['user'] });
  const { data: posts, loading: postsLoading } = useDataFetching('/api/posts');
  
  if (authLoading || postsLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {/* Render posts */}
    </div>
  );
}
```

**When to Use HOCs vs Hooks:**

**Use HOCs when:**
- You need to wrap components with additional JSX (error boundaries, providers)
- Working with class components
- You need to modify component behavior at the component level
- Legacy codebase that already uses HOCs

**Use Hooks when:**
- You want to share stateful logic between components
- Working with functional components
- You need more flexibility and composability
- Building new applications (modern React approach)

**Best Practices:**
1. **Don't mutate the original component**: Always return a new component
2. **Copy static methods**: Use `hoist-non-react-statics` library
3. **Pass through props**: Always spread props to the wrapped component
4. **Use display names**: Set meaningful display names for debugging
5. **Don't use HOCs inside render**: Create enhanced components outside render
6. **Consider hooks first**: For new code, prefer custom hooks over HOCs

---

## Testing

### Q12: How do you test React components using Jest and React Testing Library?

**Difficulty: Medium**

**Answer:**
Testing React components is crucial for maintaining code quality and preventing regressions. Jest and React Testing Library provide a powerful combination for testing React applications with a focus on testing behavior rather than implementation details.

**1. Basic Component Testing:**

```jsx
// Button.jsx
import React from 'react';

function Button({ children, onClick, disabled = false, variant = 'primary' }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      data-testid="button"
    >
      {children}
    </button>
  );
}

export default Button;
```

```jsx
// Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });
  
  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
  
  test('applies correct CSS class based on variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
  });
});
```

**2. Testing Components with State:**

```jsx
// Counter.jsx
import React, { useState } from 'react';

function Counter({ initialValue = 0, step = 1 }) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);
  
  return (
    <div>
      <h2 data-testid="count-display">Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
```

```jsx
// Counter.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
  test('displays initial count', () => {
    render(<Counter initialValue={5} />);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 5');
  });
  
  test('increments count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={2} />);
    
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await user.click(incrementButton);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 2');
  });
  
  test('decrements count when decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={10} />);
    
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    await user.click(decrementButton);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 9');
  });
  
  test('resets count to initial value when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    
    // First increment the counter
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await user.click(incrementButton);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 6');
    
    // Then reset
    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 5');
  });
});
```

**3. Testing Components with API Calls:**

```jsx
// UserProfile.jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      fetchUser();
    }
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserProfile;
```

```jsx
// UserProfile.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

// Mock fetch globally
global.fetch = jest.fn();

describe('UserProfile Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  
  test('displays loading state initially', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' })
    });
    
    render(<UserProfile userId={1} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  test('displays user data after successful fetch', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    });
    
    render(<UserProfile userId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role: admin')).toBeInTheDocument();
  });
  
  test('displays error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(<UserProfile userId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });
  
  test('displays error when API returns non-ok response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });
    
    render(<UserProfile userId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user')).toBeInTheDocument();
    });
  });
  
  test('makes correct API call with userId', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });
    
    render(<UserProfile userId={123} />);
    
    expect(fetch).toHaveBeenCalledWith('/api/users/123');
  });
});
```

**4. Testing Custom Hooks:**

```jsx
// useCounter.js
import { useState, useCallback } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}

export default useCounter;
```

```jsx
// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter Hook', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });
  
  test('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    expect(result.current.count).toBe(10);
  });
  
  test('increments count', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  test('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
  
  test('resets count to initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(12);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

**5. Testing Context Providers:**

```jsx
// ThemeContext.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeContext';

// Test component that uses the theme context
function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  test('provides default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });
  
  test('toggles theme when button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    
    // Initial theme should be light
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    
    // Click to toggle to dark
    await user.click(toggleButton);
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    
    // Click again to toggle back to light
    await user.click(toggleButton);
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });
});
```

**6. Setup and Configuration:**

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

**Best Practices:**

1. **Test behavior, not implementation**: Focus on what the user sees and does
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test user interactions**: Use `userEvent` for realistic user interactions
4. **Mock external dependencies**: Mock API calls, third-party libraries
5. **Test error states**: Don't forget to test error scenarios
6. **Keep tests isolated**: Each test should be independent
7. **Use descriptive test names**: Make it clear what each test is verifying
8. **Test accessibility**: Ensure your components are accessible

---

### Q13: How do you implement and test React Router navigation?

**Difficulty: Medium**

**Answer:**
React Router is the standard library for routing in React applications. Testing routing involves verifying navigation behavior, route parameters, and protected routes.

**1. Basic Router Setup:**

```jsx
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
```

```jsx
// components/Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav>
      <ul>
        <li>
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'active' : ''}
          >
            About
          </Link>
        </li>
        <li>
          <Link to="/users/123">User Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
```

**2. Testing Router Components:**

```jsx
// App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Helper function to render with router
function renderWithRouter(ui, { initialEntries = ['/'] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>
  );
}

describe('App Routing', () => {
  test('renders home page by default', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument();
  });
  
  test('navigates to about page when about link is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />);
    
    const aboutLink = screen.getByRole('link', { name: /about/i });
    await user.click(aboutLink);
    
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });
  
  test('renders user profile with correct user ID', () => {
    renderWithRouter(<App />, { initialEntries: ['/users/456'] });
    
    expect(screen.getByText('User ID: 456')).toBeInTheDocument();
  });
  
  test('redirects to 404 page for unknown routes', () => {
    renderWithRouter(<App />, { initialEntries: ['/unknown-route'] });
    
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
  
  test('highlights active navigation link', () => {
    renderWithRouter(<App />, { initialEntries: ['/about'] });
    
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active');
  });
});
```

**3. Testing Components with useNavigate:**

```jsx
// components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const { token } = await response.json();
      localStorage.setItem('authToken', token);
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          required
        />
      </div>
      {error && <div role="alert">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
```

```jsx
// LoginForm.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock fetch
global.fetch = jest.fn();

function renderWithRouter(ui) {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
}

describe('LoginForm', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
    localStorage.clear();
  });
  
  test('navigates to dashboard after successful login', async () => {
    const user = userEvent.setup();
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake-token' })
    });
    
    renderWithRouter(<LoginForm />);
    
    // Fill in the form
    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    // Wait for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
    
    // Check that token was stored
    expect(localStorage.getItem('authToken')).toBe('fake-token');
  });
  
  test('displays error message on failed login', async () => {
    const user = userEvent.setup();
    
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401
    });
    
    renderWithRouter(<LoginForm />);
    
    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
    });
    
    // Should not navigate on error
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
```

**4. Testing Protected Routes:**

```jsx
// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}

export default ProtectedRoute;
```

```jsx
// ProtectedRoute.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';

// Mock the auth context
const mockAuthContext = {
  user: null,
  loading: false
};

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }) => children
}));

function TestComponent() {
  return <div>Protected Content</div>;
}

function renderWithRouter(ui, { initialEntries = ['/'] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  test('redirects to login when user is not authenticated', () => {
    mockAuthContext.user = null;
    mockAuthContext.loading = false;
    
    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );
    
    // Should not render protected content
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
  
  test('renders children when user is authenticated', () => {
    mockAuthContext.user = { id: 1, name: 'John', roles: ['user'] };
    mockAuthContext.loading = false;
    
    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
  
  test('redirects to unauthorized when user lacks required role', () => {
    mockAuthContext.user = { id: 1, name: 'John', roles: ['user'] };
    mockAuthContext.loading = false;
    
    renderWithRouter(
      <ProtectedRoute requiredRole="admin">
        <TestComponent />
      </ProtectedRoute>
    );
    
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
  
  test('shows loading state while authentication is in progress', () => {
    mockAuthContext.user = null;
    mockAuthContext.loading = true;
    
    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
```

**5. Testing Route Parameters:**

```jsx
// pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        navigate('/404');
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId, navigate]);
  
  if (loading) return <div>Loading user...</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>User ID: {userId}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => navigate('/users')}>Back to Users</button>
    </div>
  );
}

export default UserProfile;
```

```jsx
// UserProfile.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import UserProfile from './UserProfile';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

global.fetch = jest.fn();

function renderWithRouter(ui, { route = '/users/123' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
}

describe('UserProfile', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
  });
  
  test('displays user information with correct user ID', async () => {
    const mockUser = {
      id: 123,
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    });
    
    renderWithRouter(<UserProfile />, { route: '/users/123' });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    expect(screen.getByText('User ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
  });
  
  test('navigates to 404 when user is not found', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });
    
    renderWithRouter(<UserProfile />, { route: '/users/999' });
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/404');
    });
  });
  
  test('navigates back to users list when back button is clicked', async () => {
    const user = userEvent.setup();
    const mockUser = { id: 123, name: 'John Doe', email: 'john@example.com' };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    });
    
    renderWithRouter(<UserProfile />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    const backButton = screen.getByRole('button', { name: /back to users/i });
    await user.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/users');
  });
});
```

**Best Practices for Testing React Router:**

1. **Use MemoryRouter for tests**: More predictable than BrowserRouter
2. **Test navigation behavior**: Verify that navigation happens correctly
3. **Test route parameters**: Ensure components handle params properly
4. **Mock useNavigate**: Control navigation in tests
5. **Test protected routes**: Verify authentication and authorization
6. **Test error scenarios**: Handle 404s and navigation errors
7. **Use helper functions**: Create reusable render functions with router
8. **Test active states**: Verify navigation highlighting works correctly

---

## Modern React Features

### Q14: How do you implement React Suspense and Concurrent Features?

**Difficulty: Advanced**

**Answer:**
React Suspense and Concurrent Features enable better user experiences through progressive loading, time slicing, and priority-based rendering. These features help create more responsive applications.

**1. Basic Suspense for Code Splitting:**

```jsx
// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <Router>
      <div className="app">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
```

```jsx
// components/LoadingSpinner.jsx
import React from 'react';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
```

**2. Suspense for Data Fetching:**

```jsx
// hooks/useSuspenseQuery.js
import { useMemo } from 'react';

// Simple cache for demonstration
const cache = new Map();

function createSuspenseResource(promise, key) {
  let status = 'pending';
  let result;
  
  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );
  
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}

export function useSuspenseQuery(url, options = {}) {
  const resource = useMemo(() => {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    
    const promise = fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      });
    
    const resource = createSuspenseResource(promise, cacheKey);
    cache.set(cacheKey, resource);
    
    return resource;
  }, [url, options]);
  
  return resource.read();
}
```

```jsx
// components/UserProfile.jsx
import React, { Suspense } from 'react';
import { useSuspenseQuery } from '../hooks/useSuspenseQuery';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

function UserProfileData({ userId }) {
  const user = useSuspenseQuery(`/api/users/${userId}`);
  const posts = useSuspenseQuery(`/api/users/${userId}/posts`);
  
  return (
    <div className="user-profile">
      <div className="user-info">
        <img src={user.avatar} alt={`${user.name}'s avatar`} />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="user-posts">
        <h2>Recent Posts ({posts.length})</h2>
        {posts.map(post => (
          <article key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          </article>
        ))}
      </div>
    </div>
  );
}

function UserProfile({ userId }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading user profile..." />}>
        <UserProfileData userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default UserProfile;
```

**3. Nested Suspense Boundaries:**

```jsx
// components/Dashboard.jsx
import React, { Suspense } from 'react';
import { useSuspenseQuery } from '../hooks/useSuspenseQuery';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

function UserStats({ userId }) {
  const stats = useSuspenseQuery(`/api/users/${userId}/stats`);
  
  return (
    <div className="user-stats">
      <div className="stat">
        <h3>Posts</h3>
        <span>{stats.postsCount}</span>
      </div>
      <div className="stat">
        <h3>Followers</h3>
        <span>{stats.followersCount}</span>
      </div>
      <div className="stat">
        <h3>Following</h3>
        <span>{stats.followingCount}</span>
      </div>
    </div>
  );
}

function RecentActivity({ userId }) {
  const activities = useSuspenseQuery(`/api/users/${userId}/activities`);
  
  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <span className="activity-type">{activity.type}</span>
            <span className="activity-description">{activity.description}</span>
            <time>{new Date(activity.timestamp).toLocaleString()}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Notifications({ userId }) {
  const notifications = useSuspenseQuery(`/api/users/${userId}/notifications`);
  
  return (
    <div className="notifications">
      <h3>Notifications ({notifications.unreadCount})</h3>
      <ul>
        {notifications.items.map(notification => (
          <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
            <p>{notification.message}</p>
            <time>{new Date(notification.createdAt).toLocaleString()}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Dashboard({ userId }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Fast-loading stats */}
      <ErrorBoundary>
        <Suspense fallback={<div className="stats-skeleton">Loading stats...</div>}>
          <UserStats userId={userId} />
        </Suspense>
      </ErrorBoundary>
      
      <div className="dashboard-content">
        {/* Medium-loading activity */}
        <ErrorBoundary>
          <Suspense fallback={<div className="activity-skeleton">Loading activity...</div>}>
            <RecentActivity userId={userId} />
          </Suspense>
        </ErrorBoundary>
        
        {/* Slow-loading notifications */}
        <ErrorBoundary>
          <Suspense fallback={<div className="notifications-skeleton">Loading notifications...</div>}>
            <Notifications userId={userId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Dashboard;
```

**4. Concurrent Features with useTransition:**

```jsx
// components/SearchableList.jsx
import React, { useState, useTransition, useDeferredValue, useMemo } from 'react';

function SearchableList({ items, searchFields = ['name'] }) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  
  // Expensive filtering operation
  const filteredItems = useMemo(() => {
    if (!deferredQuery) return items;
    
    return items.filter(item => 
      searchFields.some(field => 
        item[field]?.toLowerCase().includes(deferredQuery.toLowerCase())
      )
    );
  }, [items, deferredQuery, searchFields]);
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    
    // Update input immediately for responsiveness
    setQuery(value);
    
    // Defer the expensive filtering operation
    startTransition(() => {
      // This will trigger the useMemo recalculation
      // but won't block the input update
    });
  };
  
  return (
    <div className="searchable-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search items..."
          value={query}
          onChange={handleSearchChange}
          className="search-input"
        />
        {isPending && <span className="search-loading">Searching...</span>}
      </div>
      
      <div className="results-container">
        <p className="results-count">
          {filteredItems.length} of {items.length} items
          {isPending && ' (updating...)'}
        </p>
        
        <ul className={`items-list ${isPending ? 'updating' : ''}`}>
          {filteredItems.map(item => (
            <li key={item.id} className="item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="item-category">{item.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchableList;
```

**5. Advanced Concurrent Patterns:**

```jsx
// hooks/useConcurrentState.js
import { useState, useTransition, useCallback } from 'react';

export function useConcurrentState(initialState) {
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();
  
  const setConcurrentState = useCallback((newState) => {
    startTransition(() => {
      setState(newState);
    });
  }, []);
  
  return [state, setConcurrentState, isPending];
}
```

```jsx
// components/DataVisualization.jsx
import React, { useState, useMemo, useTransition } from 'react';
import { useConcurrentState } from '../hooks/useConcurrentState';

function DataVisualization({ data }) {
  const [viewType, setViewType] = useState('chart');
  const [filters, setFilters, isFiltersPending] = useConcurrentState({
    category: 'all',
    dateRange: 'last30days',
    sortBy: 'date'
  });
  const [isPending, startTransition] = useTransition();
  
  // Expensive data processing
  const processedData = useMemo(() => {
    console.log('Processing data...'); // This is expensive
    
    let filtered = data;
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }
    
    if (filters.dateRange !== 'all') {
      const days = parseInt(filters.dateRange.replace('last', '').replace('days', ''));
      const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(item => new Date(item.date) >= cutoff);
    }
    
    // Sort data
    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return b.value - a.value;
    });
    
    return filtered;
  }, [data, filters]);
  
  const handleViewChange = (newViewType) => {
    startTransition(() => {
      setViewType(newViewType);
    });
  };
  
  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };
  
  return (
    <div className="data-visualization">
      <div className="controls">
        <div className="view-controls">
          <button 
            onClick={() => handleViewChange('chart')}
            className={viewType === 'chart' ? 'active' : ''}
            disabled={isPending}
          >
            Chart View
          </button>
          <button 
            onClick={() => handleViewChange('table')}
            className={viewType === 'table' ? 'active' : ''}
            disabled={isPending}
          >
            Table View
          </button>
          <button 
            onClick={() => handleViewChange('grid')}
            className={viewType === 'grid' ? 'active' : ''}
            disabled={isPending}
          >
            Grid View
          </button>
        </div>
        
        <div className="filter-controls">
          <select 
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            disabled={isFiltersPending}
          >
            <option value="all">All Categories</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="support">Support</option>
          </select>
          
          <select 
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            disabled={isFiltersPending}
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
          
          <select 
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            disabled={isFiltersPending}
          >
            <option value="date">Sort by Date</option>
            <option value="value">Sort by Value</option>
          </select>
        </div>
        
        {(isPending || isFiltersPending) && (
          <div className="loading-indicator">Updating...</div>
        )}
      </div>
      
      <div className={`visualization-content ${isPending ? 'updating' : ''}`}>
        {viewType === 'chart' && <ChartView data={processedData} />}
        {viewType === 'table' && <TableView data={processedData} />}
        {viewType === 'grid' && <GridView data={processedData} />}
      </div>
      
      <div className="data-summary">
        <p>Showing {processedData.length} items</p>
        {isFiltersPending && <span>(filters updating...)</span>}
      </div>
    </div>
  );
}

// Placeholder components
function ChartView({ data }) {
  return <div className="chart-view">Chart with {data.length} items</div>;
}

function TableView({ data }) {
  return <div className="table-view">Table with {data.length} items</div>;
}

function GridView({ data }) {
  return <div className="grid-view">Grid with {data.length} items</div>;
}

export default DataVisualization;
```

**6. Suspense with Error Boundaries:**

```jsx
// components/SuspenseErrorBoundary.jsx
import React from 'react';

class SuspenseErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Suspense Error Boundary caught an error:', error, errorInfo);
    
    // Log to error reporting service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }
  
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error);
      }
      
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default SuspenseErrorBoundary;
```

**Best Practices:**

1. **Use Suspense boundaries strategically**: Place them where loading states make sense
2. **Combine with Error Boundaries**: Always wrap Suspense in error boundaries
3. **Optimize with useTransition**: Use for non-urgent updates
4. **Leverage useDeferredValue**: For expensive computations that can be delayed
5. **Progressive loading**: Load critical content first, defer secondary content
6. **Cache resources**: Implement proper caching to avoid redundant requests
7. **Provide meaningful fallbacks**: Show relevant loading states
8. **Test concurrent behavior**: Ensure your app works correctly with time slicing

---

### Q15: How do you implement custom React hooks for complex state management?

**Difficulty: Advanced**

**Answer:**
Custom hooks allow you to extract and reuse stateful logic across components. They're essential for managing complex state patterns, side effects, and creating reusable abstractions.

**1. Advanced State Management Hook:**

```jsx
// hooks/useAdvancedState.js
import { useReducer, useCallback, useMemo } from 'react';

// Action types
const ACTIONS = {
  SET: 'SET',
  UPDATE: 'UPDATE',
  RESET: 'RESET',
  MERGE: 'MERGE',
  DELETE_KEY: 'DELETE_KEY',
  UNDO: 'UNDO',
  REDO: 'REDO'
};

// Reducer function
function advancedStateReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET:
      return {
        ...state,
        present: action.payload,
        past: [...state.past, state.present],
        future: []
      };
      
    case ACTIONS.UPDATE:
      const newState = typeof action.payload === 'function' 
        ? action.payload(state.present)
        : action.payload;
      return {
        ...state,
        present: newState,
        past: [...state.past, state.present],
        future: []
      };
      
    case ACTIONS.MERGE:
      return {
        ...state,
        present: { ...state.present, ...action.payload },
        past: [...state.past, state.present],
        future: []
      };
      
    case ACTIONS.DELETE_KEY:
      const { [action.payload]: deleted, ...rest } = state.present;
      return {
        ...state,
        present: rest,
        past: [...state.past, state.present],
        future: []
      };
      
    case ACTIONS.RESET:
      return {
        present: action.payload || state.initial,
        past: [],
        future: [],
        initial: state.initial
      };
      
    case ACTIONS.UNDO:
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        ...state,
        present: previous,
        past: newPast,
        future: [state.present, ...state.future]
      };
      
    case ACTIONS.REDO:
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        ...state,
        present: next,
        past: [...state.past, state.present],
        future: newFuture
      };
      
    default:
      return state;
  }
}

export function useAdvancedState(initialState) {
  const [state, dispatch] = useReducer(advancedStateReducer, {
    present: initialState,
    past: [],
    future: [],
    initial: initialState
  });
  
  const actions = useMemo(() => ({
    set: (value) => dispatch({ type: ACTIONS.SET, payload: value }),
    update: (updater) => dispatch({ type: ACTIONS.UPDATE, payload: updater }),
    merge: (partial) => dispatch({ type: ACTIONS.MERGE, payload: partial }),
    deleteKey: (key) => dispatch({ type: ACTIONS.DELETE_KEY, payload: key }),
    reset: (newInitial) => dispatch({ type: ACTIONS.RESET, payload: newInitial }),
    undo: () => dispatch({ type: ACTIONS.UNDO }),
    redo: () => dispatch({ type: ACTIONS.REDO })
  }), []);
  
  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;
  
  return {
    state: state.present,
    actions,
    canUndo,
    canRedo,
    history: {
      past: state.past,
      future: state.future
    }
  };
}
```

**2. Async State Management Hook:**

```jsx
// hooks/useAsyncState.js
import { useReducer, useCallback, useRef, useEffect } from 'react';

const ASYNC_ACTIONS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  RESET: 'RESET'
};

function asyncStateReducer(state, action) {
  switch (action.type) {
    case ASYNC_ACTIONS.LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case ASYNC_ACTIONS.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        lastFetch: Date.now()
      };
      
    case ASYNC_ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: state.keepDataOnError ? state.data : null
      };
      
    case ASYNC_ACTIONS.RESET:
      return {
        data: null,
        loading: false,
        error: null,
        lastFetch: null,
        keepDataOnError: state.keepDataOnError
      };
      
    default:
      return state;
  }
}

export function useAsyncState(options = {}) {
  const {
    keepDataOnError = false,
    retryAttempts = 3,
    retryDelay = 1000,
    cacheTime = 5 * 60 * 1000 // 5 minutes
  } = options;
  
  const [state, dispatch] = useReducer(asyncStateReducer, {
    data: null,
    loading: false,
    error: null,
    lastFetch: null,
    keepDataOnError
  });
  
  const abortControllerRef = useRef(null);
  const retryCountRef = useRef(0);
  
  const execute = useCallback(async (asyncFunction, ...args) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    
    dispatch({ type: ASYNC_ACTIONS.LOADING });
    
    const attemptRequest = async (attempt = 0) => {
      try {
        const result = await asyncFunction(signal, ...args);
        
        if (!signal.aborted) {
          dispatch({ type: ASYNC_ACTIONS.SUCCESS, payload: result });
          retryCountRef.current = 0;
        }
        
        return result;
      } catch (error) {
        if (signal.aborted) {
          return;
        }
        
        if (attempt < retryAttempts && !error.name === 'AbortError') {
          retryCountRef.current = attempt + 1;
          
          // Wait before retrying
          await new Promise(resolve => 
            setTimeout(resolve, retryDelay * Math.pow(2, attempt))
          );
          
          if (!signal.aborted) {
            return attemptRequest(attempt + 1);
          }
        } else {
          dispatch({ type: ASYNC_ACTIONS.ERROR, payload: error });
          retryCountRef.current = 0;
          throw error;
        }
      }
    };
    
    return attemptRequest();
  }, [retryAttempts, retryDelay]);
  
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    dispatch({ type: ASYNC_ACTIONS.RESET });
    retryCountRef.current = 0;
  }, []);
  
  const isStale = useCallback(() => {
    if (!state.lastFetch) return true;
    return Date.now() - state.lastFetch > cacheTime;
  }, [state.lastFetch, cacheTime]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  return {
    ...state,
    execute,
    reset,
    isStale,
    retryCount: retryCountRef.current
  };
}
```

**3. Form Management Hook:**

```jsx
// hooks/useForm.js
import { useState, useCallback, useMemo } from 'react';

export function useForm(initialValues = {}, validationSchema = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validation function
  const validateField = useCallback((name, value) => {
    const validator = validationSchema[name];
    if (!validator) return null;
    
    if (typeof validator === 'function') {
      return validator(value, values);
    }
    
    if (validator.required && (!value || value.toString().trim() === '')) {
      return validator.message || `${name} is required`;
    }
    
    if (validator.minLength && value.length < validator.minLength) {
      return validator.message || `${name} must be at least ${validator.minLength} characters`;
    }
    
    if (validator.maxLength && value.length > validator.maxLength) {
      return validator.message || `${name} must be no more than ${validator.maxLength} characters`;
    }
    
    if (validator.pattern && !validator.pattern.test(value)) {
      return validator.message || `${name} format is invalid`;
    }
    
    if (validator.custom) {
      return validator.custom(value, values);
    }
    
    return null;
  }, [validationSchema, values]);
  
  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationSchema).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateField, values, validationSchema]);
  
  // Handle field change
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it's been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validateField, touched]);
  
  // Handle field blur
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField, values]);
  
  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    const isValid = validateAll();
    
    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
    return isValid;
  }, [values, validateAll, validationSchema]);
  
  // Reset form
  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  // Set field error manually
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);
  
  // Set multiple field errors
  const setFieldErrors = useCallback((errorObj) => {
    setErrors(prev => ({ ...prev, ...errorObj }));
  }, []);
  
  // Get field props for easy integration
  const getFieldProps = useCallback((name) => ({
    value: values[name] || '',
    onChange: (e) => handleChange(name, e.target.value),
    onBlur: () => handleBlur(name),
    error: errors[name],
    touched: touched[name]
  }), [values, handleChange, handleBlur, errors, touched]);
  
  // Computed properties
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  const isDirty = useMemo(() => 
    JSON.stringify(values) !== JSON.stringify(initialValues), 
    [values, initialValues]
  );
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldError,
    setFieldErrors,
    getFieldProps,
    validateAll
  };
}
```

**4. Local Storage Sync Hook:**

```jsx
// hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue, options = {}) {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    syncAcrossTabs = true
  } = options;
  
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // Update localStorage when state changes
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
      
      // Dispatch custom event for cross-tab synchronization
      if (syncAcrossTabs) {
        window.dispatchEvent(new CustomEvent('local-storage-change', {
          detail: { key, value: valueToStore }
        }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, serialize, storedValue, syncAcrossTabs]);
  
  // Listen for changes in localStorage (for cross-tab synchronization)
  useEffect(() => {
    if (!syncAcrossTabs) return;
    
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserialize(e.newValue));
        } catch (error) {
          console.warn(`Error deserializing localStorage key "${key}":`, error);
        }
      }
    };
    
    const handleCustomStorageChange = (e) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-change', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-change', handleCustomStorageChange);
    };
  }, [key, deserialize, syncAcrossTabs]);
  
  // Remove item from localStorage
  const removeValue = useCallback(() => {
    setValue(undefined);
  }, [setValue]);
  
  return [storedValue, setValue, removeValue];
}
```

**5. Debounced State Hook:**

```jsx
// hooks/useDebounce.js
import { useState, useEffect, useRef, useCallback } from 'react';

export function useDebounce(value, delay, options = {}) {
  const { leading = false, trailing = true, maxWait } = options;
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);
  const maxTimeoutRef = useRef(null);
  const lastCallTimeRef = useRef(null);
  const lastInvokeTimeRef = useRef(0);
  
  const invokeFunc = useCallback(() => {
    setDebouncedValue(value);
    lastInvokeTimeRef.current = Date.now();
  }, [value]);
  
  const leadingEdge = useCallback(() => {
    lastInvokeTimeRef.current = Date.now();
    if (leading) {
      invokeFunc();
    }
  }, [leading, invokeFunc]);
  
  const trailingEdge = useCallback(() => {
    timeoutRef.current = null;
    if (trailing && lastCallTimeRef.current) {
      invokeFunc();
    }
  }, [trailing, invokeFunc]);
  
  const timedOut = useCallback(() => {
    const timeSinceLastCall = Date.now() - lastCallTimeRef.current;
    
    if (timeSinceLastCall < delay) {
      timeoutRef.current = setTimeout(timedOut, delay - timeSinceLastCall);
    } else {
      trailingEdge();
    }
  }, [delay, trailingEdge]);
  
  useEffect(() => {
    lastCallTimeRef.current = Date.now();
    
    const timeSinceLastInvoke = lastCallTimeRef.current - lastInvokeTimeRef.current;
    
    if (!timeoutRef.current) {
      leadingEdge();
    }
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Clear max timeout
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(timedOut, delay);
    
    // Set max wait timeout if specified
    if (maxWait && timeSinceLastInvoke >= maxWait) {
      invokeFunc();
    } else if (maxWait) {
      maxTimeoutRef.current = setTimeout(invokeFunc, maxWait - timeSinceLastInvoke);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
    };
  }, [value, delay, maxWait, leadingEdge, timedOut, invokeFunc]);
  
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
    lastCallTimeRef.current = null;
  }, []);
  
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      trailingEdge();
    }
  }, [trailingEdge]);
  
  return {
    debouncedValue,
    cancel,
    flush
  };
}

// Simpler version for basic use cases
export function useSimpleDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

**6. Usage Examples:**

```jsx
// Example: Using the advanced state hook
function TodoApp() {
  const { state: todos, actions, canUndo, canRedo } = useAdvancedState([]);
  
  const addTodo = (text) => {
    actions.update(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  };
  
  const toggleTodo = (id) => {
    actions.update(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  return (
    <div>
      <div>
        <button onClick={actions.undo} disabled={!canUndo}>Undo</button>
        <button onClick={actions.redo} disabled={!canRedo}>Redo</button>
        <button onClick={() => actions.reset([])}>Clear All</button>
      </div>
      {/* Todo list implementation */}
    </div>
  );
}

// Example: Using the form hook
function ContactForm() {
  const form = useForm(
    { name: '', email: '', message: '' },
    {
      name: { required: true, minLength: 2 },
      email: { 
        required: true, 
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email'
      },
      message: { required: true, minLength: 10 }
    }
  );
  
  const handleSubmit = async (values) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
  };
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit(handleSubmit);
    }}>
      <input {...form.getFieldProps('name')} placeholder="Name" />
      <input {...form.getFieldProps('email')} placeholder="Email" />
      <textarea {...form.getFieldProps('message')} placeholder="Message" />
      <button type="submit" disabled={!form.isValid || form.isSubmitting}>
        {form.isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

**Best Practices:**

1. **Keep hooks focused**: Each hook should have a single responsibility
2. **Use useCallback and useMemo**: Optimize performance for complex hooks
3. **Handle cleanup**: Always clean up side effects in useEffect
4. **Provide good APIs**: Make hooks easy to use with clear return values
5. **Add TypeScript**: Type your hooks for better developer experience
6. **Test thoroughly**: Write comprehensive tests for custom hooks
7. **Document well**: Provide clear documentation and examples
8. **Consider composition**: Build complex hooks from simpler ones

---

### Q16: How do you implement React Server Components and streaming SSR?

**Difficulty: Expert**

**Answer:**
React Server Components (RSC) and streaming SSR represent the cutting edge of React performance optimization, enabling server-side rendering with component-level granularity and progressive hydration.

**1. Basic Server Component Setup:**

```jsx
// app/layout.js (App Router)
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'React Server Components Demo',
  description: 'Advanced SSR with streaming'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar">
          <h1>My App</h1>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

```jsx
// app/page.js (Server Component)
import { Suspense } from 'react';
import UserProfile from './components/UserProfile';
import PostsList from './components/PostsList';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';

// This is a Server Component by default
export default async function HomePage() {
  // Server-side data fetching
  const initialData = await fetch('https://api.example.com/initial-data', {
    cache: 'force-cache' // Next.js caching
  }).then(res => res.json());

  return (
    <div className="home-page">
      <div className="main-content">
        <h1>Welcome to {initialData.siteName}</h1>
        
        {/* Streaming different components */}
        <Suspense fallback={<LoadingSpinner message="Loading user profile..." />}>
          <UserProfile userId={initialData.userId} />
        </Suspense>
        
        <Suspense fallback={<div className="posts-skeleton">Loading posts...</div>}>
          <PostsList category={initialData.defaultCategory} />
        </Suspense>
      </div>
      
      <aside className="sidebar">
        <Suspense fallback={<div className="sidebar-skeleton">Loading sidebar...</div>}>
          <Sidebar userId={initialData.userId} />
        </Suspense>
      </aside>
    </div>
  );
}
```

**2. Server Components with Database Integration:**

```jsx
// app/components/UserProfile.js (Server Component)
import { db } from '../lib/database';
import { cache } from 'react';
import Image from 'next/image';

// Cache the database query
const getUser = cache(async (userId) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true
        }
      }
    }
  });
  
  return user;
});

const getUserStats = cache(async (userId) => {
  const stats = await db.userStats.findUnique({
    where: { userId },
    select: {
      totalViews: true,
      totalLikes: true,
      joinedAt: true,
      lastActive: true
    }
  });
  
  return stats;
});

export default async function UserProfile({ userId }) {
  // These run in parallel on the server
  const [user, stats] = await Promise.all([
    getUser(userId),
    getUserStats(userId)
  ]);
  
  if (!user) {
    return (
      <div className="user-profile-error">
        <h2>User not found</h2>
        <p>The requested user profile could not be loaded.</p>
      </div>
    );
  }
  
  return (
    <div className="user-profile">
      <div className="profile-header">
        <Image
          src={user.profile?.avatar || '/default-avatar.png'}
          alt={`${user.name}'s avatar`}
          width={120}
          height={120}
          className="avatar"
          priority
        />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="username">@{user.username}</p>
          <p className="bio">{user.profile?.bio}</p>
          <div className="profile-stats">
            <span>{user._count.posts} posts</span>
            <span>{user._count.followers} followers</span>
            <span>{user._count.following} following</span>
          </div>
        </div>
      </div>
      
      {stats && (
        <div className="user-stats">
          <div className="stat">
            <span className="stat-value">{stats.totalViews.toLocaleString()}</span>
            <span className="stat-label">Total Views</span>
          </div>
          <div className="stat">
            <span className="stat-value">{stats.totalLikes.toLocaleString()}</span>
            <span className="stat-label">Total Likes</span>
          </div>
          <div className="stat">
            <span className="stat-value">{new Date(stats.joinedAt).getFullYear()}</span>
            <span className="stat-label">Member Since</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {new Date(stats.lastActive).toLocaleDateString()}
            </span>
            <span className="stat-label">Last Active</span>
          </div>
        </div>
      )}
    </div>
  );
}
```

**3. Client Components for Interactivity:**

```jsx
// app/components/InteractiveButton.js (Client Component)
'use client';

import { useState, useTransition } from 'react';
import { followUser, unfollowUser } from '../actions/userActions';

export default function FollowButton({ userId, initialFollowState, currentUserId }) {
  const [isFollowing, setIsFollowing] = useState(initialFollowState);
  const [isPending, startTransition] = useTransition();
  
  const handleFollowToggle = () => {
    startTransition(async () => {
      try {
        if (isFollowing) {
          await unfollowUser(userId, currentUserId);
          setIsFollowing(false);
        } else {
          await followUser(userId, currentUserId);
          setIsFollowing(true);
        }
      } catch (error) {
        console.error('Follow action failed:', error);
        // Revert optimistic update
        setIsFollowing(!isFollowing);
      }
    });
  };
  
  return (
    <button
      onClick={handleFollowToggle}
      disabled={isPending}
      className={`follow-button ${
        isFollowing ? 'following' : 'not-following'
      } ${isPending ? 'pending' : ''}`}
    >
      {isPending ? (
        <span className="loading-spinner" />
      ) : isFollowing ? (
        'Unfollow'
      ) : (
        'Follow'
      )}
    </button>
  );
}
```

**4. Server Actions for Data Mutations:**

```jsx
// app/actions/userActions.js
'use server';

import { db } from '../lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '../lib/auth';

export async function followUser(targetUserId, currentUserId) {
  const session = await auth();
  
  if (!session || session.user.id !== currentUserId) {
    throw new Error('Unauthorized');
  }
  
  try {
    await db.follow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId
      }
    });
    
    // Revalidate relevant pages
    revalidateTag(`user-${targetUserId}`);
    revalidateTag(`user-${currentUserId}`);
    revalidatePath(`/users/${targetUserId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Follow user error:', error);
    throw new Error('Failed to follow user');
  }
}

export async function unfollowUser(targetUserId, currentUserId) {
  const session = await auth();
  
  if (!session || session.user.id !== currentUserId) {
    throw new Error('Unauthorized');
  }
  
  try {
    await db.follow.delete({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId
        }
      }
    });
    
    // Revalidate relevant pages
    revalidateTag(`user-${targetUserId}`);
    revalidateTag(`user-${currentUserId}`);
    revalidatePath(`/users/${targetUserId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Unfollow user error:', error);
    throw new Error('Failed to unfollow user');
  }
}

export async function createPost(formData) {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }
  
  const title = formData.get('title');
  const content = formData.get('content');
  const category = formData.get('category');
  
  if (!title || !content) {
    throw new Error('Title and content are required');
  }
  
  try {
    const post = await db.post.create({
      data: {
        title,
        content,
        category,
        authorId: session.user.id,
        published: true
      }
    });
    
    // Revalidate relevant pages
    revalidateTag('posts');
    revalidateTag(`user-${session.user.id}`);
    revalidatePath('/');
    revalidatePath('/posts');
    
    redirect(`/posts/${post.id}`);
  } catch (error) {
    console.error('Create post error:', error);
    throw new Error('Failed to create post');
  }
}
```

**5. Streaming with Loading UI:**

```jsx
// app/posts/loading.js
export default function PostsLoading() {
  return (
    <div className="posts-loading">
      <div className="posts-skeleton">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="post-skeleton">
            <div className="skeleton-avatar" />
            <div className="skeleton-content">
              <div className="skeleton-title" />
              <div className="skeleton-text" />
              <div className="skeleton-text short" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

```jsx
// app/posts/page.js
import { Suspense } from 'react';
import PostsList from '../components/PostsList';
import PostsFilter from '../components/PostsFilter';
import CreatePostForm from '../components/CreatePostForm';
import PostsLoading from './loading';

export default function PostsPage({ searchParams }) {
  const category = searchParams.category || 'all';
  const sort = searchParams.sort || 'recent';
  
  return (
    <div className="posts-page">
      <div className="posts-header">
        <h1>Posts</h1>
        <CreatePostForm />
      </div>
      
      <PostsFilter currentCategory={category} currentSort={sort} />
      
      <Suspense fallback={<PostsLoading />}>
        <PostsList category={category} sort={sort} />
      </Suspense>
    </div>
  );
}
```

**6. Advanced Caching and Revalidation:**

```jsx
// app/lib/cache.js
import { unstable_cache } from 'next/cache';

// Cache with tags for selective revalidation
export const getCachedPosts = unstable_cache(
  async (category, sort, limit = 20) => {
    const posts = await db.post.findMany({
      where: category !== 'all' ? { category } : {},
      orderBy: sort === 'recent' ? { createdAt: 'desc' } : { likes: 'desc' },
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profile: {
              select: { avatar: true }
            }
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });
    
    return posts;
  },
  ['posts'],
  {
    tags: ['posts'],
    revalidate: 60 // Revalidate every 60 seconds
  }
);

export const getCachedUser = unstable_cache(
  async (userId) => {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true
          }
        }
      }
    });
    
    return user;
  },
  ['user'],
  {
    tags: (userId) => [`user-${userId}`],
    revalidate: 300 // Revalidate every 5 minutes
  }
);
```

**7. Error Boundaries for Server Components:**

```jsx
// app/error.js
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error);
  }, [error]);
  
  return (
    <div className="error-page">
      <div className="error-content">
        <h2>Something went wrong!</h2>
        <p>We encountered an error while loading this page.</p>
        <details className="error-details">
          <summary>Error details</summary>
          <pre>{error.message}</pre>
        </details>
        <div className="error-actions">
          <button onClick={reset} className="retry-button">
            Try again
          </button>
          <a href="/" className="home-link">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
```

**8. Performance Monitoring:**

```jsx
// app/lib/performance.js
export function measureServerComponentPerformance(componentName) {
  return function decorator(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args) {
      const start = performance.now();
      
      try {
        const result = await originalMethod.apply(this, args);
        const end = performance.now();
        
        console.log(`${componentName} rendered in ${end - start}ms`);
        
        // Send to analytics
        if (typeof window === 'undefined') {
          // Server-side logging
          console.log(`Server Component ${componentName}: ${end - start}ms`);
        }
        
        return result;
      } catch (error) {
        const end = performance.now();
        console.error(`${componentName} failed after ${end - start}ms:`, error);
        throw error;
      }
    };
    
    return descriptor;
  };
}
```

**Best Practices:**

1. **Minimize Client Components**: Use server components by default, client components only for interactivity
2. **Optimize Data Fetching**: Use parallel fetching and caching strategies
3. **Strategic Suspense Boundaries**: Place them where loading states make sense
4. **Cache Appropriately**: Use Next.js caching features for performance
5. **Handle Errors Gracefully**: Implement proper error boundaries
6. **Monitor Performance**: Track server component render times
7. **Progressive Enhancement**: Ensure basic functionality works without JavaScript
8. **Security First**: Validate all server actions and protect sensitive operations

---

### Q17: How do you implement advanced React patterns like Compound Components and Render Props?

**Difficulty: Expert**

**Answer:**
Advanced React patterns provide powerful abstractions for building flexible, reusable components. These patterns help manage complex component relationships and provide elegant APIs for component composition.

**1. Compound Components Pattern:**

```jsx
// components/Tabs/Tabs.jsx
import React, { createContext, useContext, useState, Children, cloneElement } from 'react';

// Context for sharing state between compound components
const TabsContext = createContext();

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs');
  }
  return context;
}

// Main Tabs component
function Tabs({ children, defaultTab = 0, onChange, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };
  
  const contextValue = {
    activeTab,
    setActiveTab: handleTabChange
  };
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div className={`tabs ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// Tab List component
function TabList({ children, className = '' }) {
  const { activeTab, setActiveTab } = useTabsContext();
  
  const tabElements = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        index,
        isActive: index === activeTab,
        onClick: () => setActiveTab(index)
      });
    }
    return child;
  });
  
  return (
    <div className={`tab-list ${className}`} role="tablist">
      {tabElements}
    </div>
  );
}

// Individual Tab component
function Tab({ children, index, isActive, onClick, disabled = false, className = '' }) {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <button
      className={`tab ${
        isActive ? 'active' : ''
      } ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  );
}

// Tab Panels container
function TabPanels({ children, className = '' }) {
  const { activeTab } = useTabsContext();
  
  const panelElements = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        index,
        isActive: index === activeTab
      });
    }
    return child;
  });
  
  return (
    <div className={`tab-panels ${className}`}>
      {panelElements}
    </div>
  );
}

// Individual Tab Panel
function TabPanel({ children, index, isActive, className = '' }) {
  if (!isActive) return null;
  
  return (
    <div
      className={`tab-panel ${className}`}
      role="tabpanel"
      aria-labelledby={`tab-${index}`}
      id={`tabpanel-${index}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

// Attach compound components as static properties
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

export default Tabs;
```

**2. Advanced Compound Component with Flexible API:**

```jsx
// components/Modal/Modal.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ModalContext = createContext();

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within Modal');
  }
  return context;
}

// Main Modal component
function Modal({ children, isOpen: controlledIsOpen, onClose, closeOnOverlayClick = true, closeOnEscape = true }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  const openModal = () => {
    if (!isControlled) {
      setInternalIsOpen(true);
    }
  };
  
  const closeModal = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalIsOpen(false);
    }
  };
  
  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);
  
  // Escape key handler
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const contextValue = {
    isOpen,
    openModal,
    closeModal,
    closeOnOverlayClick,
    modalRef
  };
  
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

// Modal Trigger
function ModalTrigger({ children, asChild = false }) {
  const { openModal } = useModalContext();
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        openModal();
      }
    });
  }
  
  return (
    <button onClick={openModal} className="modal-trigger">
      {children}
    </button>
  );
}

// Modal Content
function ModalContent({ children, className = '' }) {
  const { isOpen, closeModal, closeOnOverlayClick, modalRef } = useModalContext();
  
  if (!isOpen) return null;
  
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      closeModal();
    }
  };
  
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  
  return createPortal(
    <div 
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={modalRef}
        className={`modal-content ${className}`}
        onClick={handleContentClick}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// Modal Header
function ModalHeader({ children, className = '' }) {
  return (
    <div className={`modal-header ${className}`}>
      {children}
    </div>
  );
}

// Modal Title
function ModalTitle({ children, className = '' }) {
  return (
    <h2 className={`modal-title ${className}`}>
      {children}
    </h2>
  );
}

// Modal Body
function ModalBody({ children, className = '' }) {
  return (
    <div className={`modal-body ${className}`}>
      {children}
    </div>
  );
}

// Modal Footer
function ModalFooter({ children, className = '' }) {
  return (
    <div className={`modal-footer ${className}`}>
      {children}
    </div>
  );
}

// Modal Close Button
function ModalClose({ children, asChild = false }) {
  const { closeModal } = useModalContext();
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        closeModal();
      }
    });
  }
  
  return (
    <button onClick={closeModal} className="modal-close">
      {children || '×'}
    </button>
  );
}

// Attach compound components
Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Close = ModalClose;

export default Modal;
```

**3. Render Props Pattern:**

```jsx
// components/DataFetcher/DataFetcher.jsx
import { useState, useEffect, useRef } from 'react';

function DataFetcher({ 
  url, 
  options = {}, 
  children, 
  onSuccess, 
  onError,
  retryAttempts = 3,
  retryDelay = 1000,
  cacheTime = 5 * 60 * 1000 // 5 minutes
}) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    lastFetch: null
  });
  
  const abortControllerRef = useRef(null);
  const retryCountRef = useRef(0);
  const cacheRef = useRef(new Map());
  
  const fetchData = async (forceRefresh = false) => {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const cachedData = cacheRef.current.get(cacheKey);
    
    // Return cached data if available and not stale
    if (!forceRefresh && cachedData && Date.now() - cachedData.timestamp < cacheTime) {
      setState({
        data: cachedData.data,
        loading: false,
        error: null,
        lastFetch: cachedData.timestamp
      });
      return;
    }
    
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const attemptFetch = async (attempt = 0) => {
      try {
        const response = await fetch(url, {
          ...options,
          signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!signal.aborted) {
          const timestamp = Date.now();
          
          // Cache the data
          cacheRef.current.set(cacheKey, { data, timestamp });
          
          setState({
            data,
            loading: false,
            error: null,
            lastFetch: timestamp
          });
          
          onSuccess?.(data);
          retryCountRef.current = 0;
        }
        
        return data;
      } catch (error) {
        if (signal.aborted) return;
        
        if (attempt < retryAttempts && error.name !== 'AbortError') {
          retryCountRef.current = attempt + 1;
          
          // Exponential backoff
          await new Promise(resolve => 
            setTimeout(resolve, retryDelay * Math.pow(2, attempt))
          );
          
          if (!signal.aborted) {
            return attemptFetch(attempt + 1);
          }
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            error
          }));
          
          onError?.(error);
          retryCountRef.current = 0;
        }
      }
    };
    
    return attemptFetch();
  };
  
  const refetch = () => fetchData(true);
  
  const reset = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState({
      data: null,
      loading: false,
      error: null,
      lastFetch: null
    });
    retryCountRef.current = 0;
  };
  
  // Initial fetch
  useEffect(() => {
    fetchData();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, JSON.stringify(options)]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  const isStale = state.lastFetch && Date.now() - state.lastFetch > cacheTime;
  
  return children({
    ...state,
    refetch,
    reset,
    isStale,
    retryCount: retryCountRef.current
  });
}

export default DataFetcher;
```

**4. Function as Children Pattern (Advanced Render Props):**

```jsx
// components/VirtualList/VirtualList.jsx
import { useState, useEffect, useRef, useMemo } from 'react';

function VirtualList({ 
  items, 
  itemHeight, 
  containerHeight, 
  overscan = 5,
  children 
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  
  const { visibleItems, totalHeight } = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );
    
    const visibleItems = [];
    for (let i = Math.max(0, startIndex - overscan); i < endIndex; i++) {
      visibleItems.push({
        index: i,
        item: items[i],
        style: {
          position: 'absolute',
          top: i * itemHeight,
          height: itemHeight,
          width: '100%'
        }
      });
    }
    
    return {
      visibleItems,
      totalHeight: items.length * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop, overscan]);
  
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };
  
  const scrollToIndex = (index) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  };
  
  const scrollToTop = () => scrollToIndex(0);
  const scrollToBottom = () => scrollToIndex(items.length - 1);
  
  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {children({
          visibleItems,
          scrollToIndex,
          scrollToTop,
          scrollToBottom,
          totalHeight,
          scrollTop
        })}
      </div>
    </div>
  );
}

export default VirtualList;
```

**5. Usage Examples:**

```jsx
// Using Compound Components
function TabsExample() {
  return (
    <Tabs defaultTab={0} onChange={(index) => console.log('Tab changed:', index)}>
      <Tabs.TabList>
        <Tabs.Tab>Profile</Tabs.Tab>
        <Tabs.Tab>Settings</Tabs.Tab>
        <Tabs.Tab disabled>Billing</Tabs.Tab>
      </Tabs.TabList>
      
      <Tabs.TabPanels>
        <Tabs.TabPanel>
          <h3>Profile Information</h3>
          <p>Manage your profile details here.</p>
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h3>Account Settings</h3>
          <p>Configure your account preferences.</p>
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h3>Billing Information</h3>
          <p>View and manage your billing details.</p>
        </Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  );
}

// Using Modal Compound Components
function ModalExample() {
  return (
    <Modal>
      <Modal.Trigger>
        Open Modal
      </Modal.Trigger>
      
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Confirm Action</Modal.Title>
          <Modal.Close asChild>
            <button aria-label="Close">×</button>
          </Modal.Close>
        </Modal.Header>
        
        <Modal.Body>
          <p>Are you sure you want to perform this action?</p>
        </Modal.Body>
        
        <Modal.Footer>
          <Modal.Close asChild>
            <button>Cancel</button>
          </Modal.Close>
          <button>Confirm</button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Using Render Props
function DataExample() {
  return (
    <DataFetcher 
      url="/api/users" 
      onSuccess={(data) => console.log('Data loaded:', data)}
      onError={(error) => console.error('Error:', error)}
    >
      {({ data, loading, error, refetch, isStale }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message} <button onClick={refetch}>Retry</button></div>;
        
        return (
          <div>
            {isStale && <div>Data is stale <button onClick={refetch}>Refresh</button></div>}
            <ul>
              {data?.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        );
      }}
    </DataFetcher>
  );
}

// Using Virtual List
function VirtualListExample() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  
  return (
    <VirtualList 
      items={items} 
      itemHeight={50} 
      containerHeight={400}
    >
      {({ visibleItems, scrollToTop, scrollToBottom }) => (
        <>
          <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1000 }}>
            <button onClick={scrollToTop}>Top</button>
            <button onClick={scrollToBottom}>Bottom</button>
          </div>
          {visibleItems.map(({ index, item, style }) => (
            <div key={index} style={style}>
              {item}
            </div>
          ))}
        </>
      )}
    </VirtualList>
  );
}
```

**Best Practices:**

1. **Use Compound Components for related UI elements**: Perfect for tabs, modals, accordions
2. **Render Props for data logic**: Great for sharing stateful logic without UI assumptions
3. **Provide flexible APIs**: Support both controlled and uncontrolled modes
4. **Handle accessibility**: Include proper ARIA attributes and keyboard navigation
5. **Optimize performance**: Use React.memo, useMemo, and useCallback appropriately
6. **Error boundaries**: Wrap complex patterns in error boundaries
7. **TypeScript support**: Provide proper type definitions for better DX
8. **Documentation**: Provide clear examples and API documentation

---

### Q18: How do you implement micro-frontends with React and Module Federation?

**Difficulty: Expert**

**Answer:**
Micro-frontends enable teams to develop, deploy, and scale frontend applications independently. Module Federation in Webpack 5 provides a powerful way to implement micro-frontends with React.

**1. Shell Application (Host) Setup:**

```javascript
// webpack.config.js (Shell/Host)
const ModuleFederationPlugin = require('@module-federation/webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        'user-management': 'userManagement@http://localhost:3001/remoteEntry.js',
        'product-catalog': 'productCatalog@http://localhost:3002/remoteEntry.js',
        'shopping-cart': 'shoppingCart@http://localhost:3003/remoteEntry.js',
        'analytics': 'analytics@http://localhost:3004/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
          eager: true,
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.0.0',
        },
        '@emotion/react': {
          singleton: true,
        },
        '@emotion/styled': {
          singleton: true,
        },
      },
    }),
  ],
};
```

```jsx
// src/App.jsx (Shell Application)
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Lazy load micro-frontends
const UserManagement = lazy(() => import('user-management/UserApp'));
const ProductCatalog = lazy(() => import('product-catalog/ProductApp'));
const ShoppingCart = lazy(() => import('shopping-cart/CartApp'));
const Analytics = lazy(() => import('analytics/AnalyticsApp'));

// Shared components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { GlobalStyles } from './styles/GlobalStyles';

// Create a single QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [microfrontendErrors, setMicrofrontendErrors] = useState({});

  // Global error handler for micro-frontends
  const handleMicrofrontendError = (microfrontendName, error) => {
    console.error(`Error in ${microfrontendName}:`, error);
    setMicrofrontendErrors(prev => ({
      ...prev,
      [microfrontendName]: error
    }));
  };

  // Clear error when navigating away
  const clearMicrofrontendError = (microfrontendName) => {
    setMicrofrontendErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[microfrontendName];
      return newErrors;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyles />
          <div className="app">
            <Header 
              user={user}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              onToggleTheme={toggleTheme}
              onLogout={logout}
            />
            
            <div className="app-body">
              <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
              />
              
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  
                  {/* User Management Micro-frontend */}
                  <Route 
                    path="/users/*" 
                    element={
                      <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onError={(error) => handleMicrofrontendError('user-management', error)}
                        onReset={() => clearMicrofrontendError('user-management')}
                      >
                        <Suspense fallback={<LoadingSpinner message="Loading User Management..." />}>
                          <UserManagement 
                            user={user}
                            theme={theme}
                            onError={(error) => handleMicrofrontendError('user-management', error)}
                          />
                        </Suspense>
                      </ErrorBoundary>
                    } 
                  />
                  
                  {/* Product Catalog Micro-frontend */}
                  <Route 
                    path="/products/*" 
                    element={
                      <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onError={(error) => handleMicrofrontendError('product-catalog', error)}
                        onReset={() => clearMicrofrontendError('product-catalog')}
                      >
                        <Suspense fallback={<LoadingSpinner message="Loading Product Catalog..." />}>
                          <ProductCatalog 
                            user={user}
                            theme={theme}
                            onError={(error) => handleMicrofrontendError('product-catalog', error)}
                          />
                        </Suspense>
                      </ErrorBoundary>
                    } 
                  />
                  
                  {/* Shopping Cart Micro-frontend */}
                  <Route 
                    path="/cart/*" 
                    element={
                      <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onError={(error) => handleMicrofrontendError('shopping-cart', error)}
                        onReset={() => clearMicrofrontendError('shopping-cart')}
                      >
                        <Suspense fallback={<LoadingSpinner message="Loading Shopping Cart..." />}>
                          <ShoppingCart 
                            user={user}
                            theme={theme}
                            onError={(error) => handleMicrofrontendError('shopping-cart', error)}
                          />
                        </Suspense>
                      </ErrorBoundary>
                    } 
                  />
                  
                  {/* Analytics Micro-frontend */}
                  <Route 
                    path="/analytics/*" 
                    element={
                      isAuthenticated && user?.role === 'admin' ? (
                        <ErrorBoundary
                          FallbackComponent={ErrorFallback}
                          onError={(error) => handleMicrofrontendError('analytics', error)}
                          onReset={() => clearMicrofrontendError('analytics')}
                        >
                          <Suspense fallback={<LoadingSpinner message="Loading Analytics..." />}>
                            <Analytics 
                              user={user}
                              theme={theme}
                              onError={(error) => handleMicrofrontendError('analytics', error)}
                            />
                          </Suspense>
                        </ErrorBoundary>
                      ) : (
                        <Navigate to="/unauthorized" replace />
                      )
                    } 
                  />
                  
                  <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
```

**2. Micro-frontend (Remote) Setup:**

```javascript
// webpack.config.js (Product Catalog Micro-frontend)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'productCatalog',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductApp': './src/ProductApp',
        './ProductList': './src/components/ProductList',
        './ProductDetail': './src/components/ProductDetail',
        './ProductSearch': './src/components/ProductSearch',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.0.0',
        },
        '@emotion/react': {
          singleton: true,
        },
        '@emotion/styled': {
          singleton: true,
        },
      },
    }),
  ],
};
```

```jsx
// src/ProductApp.jsx (Product Catalog Micro-frontend)
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';

import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductSearch from './components/ProductSearch';
import ProductCategories from './components/ProductCategories';
import { ProductProvider } from './context/ProductContext';
import { useProductAnalytics } from './hooks/useProductAnalytics';
import { productApi } from './api/productApi';

// Create isolated QueryClient for this micro-frontend
const productQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 2 * 60 * 1000, // 2 minutes
      cacheTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function ProductApp({ user, theme, onError }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { trackPageView, trackProductView } = useProductAnalytics();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize micro-frontend
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize product API with user context
        await productApi.initialize(user?.token);
        
        // Track initial page view
        trackPageView(location.pathname);
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Product Catalog:', error);
        onError?.(error);
      }
    };

    initializeApp();
  }, [user, onError]);

  // Track navigation changes
  useEffect(() => {
    if (isInitialized) {
      trackPageView(location.pathname);
    }
  }, [location.pathname, isInitialized]);

  // Error boundary for this micro-frontend
  const handleError = (error, errorInfo) => {
    console.error('Product Catalog Error:', error, errorInfo);
    onError?.(error);
  };

  if (!isInitialized) {
    return (
      <div className="product-app-loading">
        <div className="loading-spinner" />
        <p>Initializing Product Catalog...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={productQueryClient}>
      <ThemeProvider theme={theme}>
        <ProductProvider user={user} onError={handleError}>
          <div className="product-app">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/search" element={<ProductSearch />} />
              <Route path="/categories" element={<ProductCategories />} />
              <Route path="/categories/:categoryId" element={<ProductList />} />
              <Route path="/:productId" element={<ProductDetail />} />
            </Routes>
          </div>
        </ProductProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default ProductApp;
```

**3. Cross-Micro-frontend Communication:**

```jsx
// src/utils/eventBus.js (Shared Event System)
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // Return unsubscribe function
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      );
    };
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event handler for ${eventName}:`, error);
        }
      });
    }
  }

  once(eventName, callback) {
    const unsubscribe = this.subscribe(eventName, (data) => {
      callback(data);
      unsubscribe();
    });
    return unsubscribe;
  }

  clear(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
}

// Global event bus instance
window.__MICRO_FRONTEND_EVENT_BUS__ = window.__MICRO_FRONTEND_EVENT_BUS__ || new EventBus();

export const eventBus = window.__MICRO_FRONTEND_EVENT_BUS__;

// Predefined event types
export const EVENTS = {
  USER_LOGGED_IN: 'user:logged-in',
  USER_LOGGED_OUT: 'user:logged-out',
  CART_ITEM_ADDED: 'cart:item-added',
  CART_ITEM_REMOVED: 'cart:item-removed',
  CART_UPDATED: 'cart:updated',
  PRODUCT_VIEWED: 'product:viewed',
  PRODUCT_PURCHASED: 'product:purchased',
  THEME_CHANGED: 'theme:changed',
  NAVIGATION_CHANGED: 'navigation:changed',
};
```

```jsx
// src/hooks/useEventBus.js (React Hook for Event Bus)
import { useEffect, useRef, useCallback } from 'react';
import { eventBus } from '../utils/eventBus';

export function useEventBus() {
  const unsubscribersRef = useRef([]);

  const subscribe = useCallback((eventName, callback) => {
    const unsubscribe = eventBus.subscribe(eventName, callback);
    unsubscribersRef.current.push(unsubscribe);
    return unsubscribe;
  }, []);

  const emit = useCallback((eventName, data) => {
    eventBus.emit(eventName, data);
  }, []);

  const once = useCallback((eventName, callback) => {
    const unsubscribe = eventBus.once(eventName, callback);
    unsubscribersRef.current.push(unsubscribe);
    return unsubscribe;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unsubscribersRef.current.forEach(unsubscribe => unsubscribe());
      unsubscribersRef.current = [];
    };
  }, []);

  return { subscribe, emit, once };
}

// Specific hooks for common events
export function useCartEvents() {
  const { subscribe, emit } = useEventBus();

  const onCartUpdated = useCallback((callback) => {
    return subscribe(EVENTS.CART_UPDATED, callback);
  }, [subscribe]);

  const emitCartUpdated = useCallback((cartData) => {
    emit(EVENTS.CART_UPDATED, cartData);
  }, [emit]);

  const onItemAdded = useCallback((callback) => {
    return subscribe(EVENTS.CART_ITEM_ADDED, callback);
  }, [subscribe]);

  const emitItemAdded = useCallback((item) => {
    emit(EVENTS.CART_ITEM_ADDED, item);
  }, [emit]);

  return {
    onCartUpdated,
    emitCartUpdated,
    onItemAdded,
    emitItemAdded,
  };
}
```

**4. Shared State Management:**

```jsx
// src/store/globalStore.js (Shared State)
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { eventBus, EVENTS } from '../utils/eventBus';

// Global store shared across micro-frontends
const useGlobalStore = create(
  subscribeWithSelector((set, get) => ({
    // User state
    user: null,
    isAuthenticated: false,
    
    // Theme state
    theme: 'light',
    
    // Cart state
    cart: {
      items: [],
      total: 0,
      itemCount: 0,
    },
    
    // Notification state
    notifications: [],
    
    // Actions
    setUser: (user) => {
      set({ user, isAuthenticated: !!user });
      eventBus.emit(EVENTS.USER_LOGGED_IN, user);
    },
    
    clearUser: () => {
      set({ user: null, isAuthenticated: false });
      eventBus.emit(EVENTS.USER_LOGGED_OUT);
    },
    
    setTheme: (theme) => {
      set({ theme });
      eventBus.emit(EVENTS.THEME_CHANGED, theme);
    },
    
    updateCart: (cartData) => {
      set({ cart: cartData });
      eventBus.emit(EVENTS.CART_UPDATED, cartData);
    },
    
    addToCart: (item) => {
      const currentCart = get().cart;
      const existingItem = currentCart.items.find(i => i.id === item.id);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = currentCart.items.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        updatedItems = [...currentCart.items, { ...item, quantity: item.quantity || 1 }];
      }
      
      const updatedCart = {
        items: updatedItems,
        total: updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0),
        itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
      
      set({ cart: updatedCart });
      eventBus.emit(EVENTS.CART_ITEM_ADDED, item);
      eventBus.emit(EVENTS.CART_UPDATED, updatedCart);
    },
    
    removeFromCart: (itemId) => {
      const currentCart = get().cart;
      const updatedItems = currentCart.items.filter(i => i.id !== itemId);
      
      const updatedCart = {
        items: updatedItems,
        total: updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0),
        itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
      
      set({ cart: updatedCart });
      eventBus.emit(EVENTS.CART_ITEM_REMOVED, itemId);
      eventBus.emit(EVENTS.CART_UPDATED, updatedCart);
    },
    
    addNotification: (notification) => {
      const id = Date.now().toString();
      const newNotification = { ...notification, id, timestamp: Date.now() };
      set(state => ({
        notifications: [...state.notifications, newNotification]
      }));
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      }, 5000);
    },
    
    removeNotification: (id) => {
      set(state => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    },
  }))
);

// Make store globally available
window.__GLOBAL_STORE__ = useGlobalStore;

export default useGlobalStore;
```

**5. Dynamic Module Loading:**

```jsx
// src/components/DynamicMicrofrontend.jsx
import React, { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from './LoadingSpinner';
import ErrorFallback from './ErrorFallback';

const DynamicMicrofrontend = ({ 
  remoteName, 
  moduleName, 
  fallback, 
  props = {},
  onError,
  retryAttempts = 3 
}) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadComponent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Dynamic import with retry logic
      const module = await import(`${remoteName}/${moduleName}`);
      const LoadedComponent = module.default || module;
      
      setComponent(() => LoadedComponent);
      setRetryCount(0);
    } catch (err) {
      console.error(`Failed to load ${remoteName}/${moduleName}:`, err);
      
      if (retryCount < retryAttempts) {
        // Exponential backoff retry
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          loadComponent();
        }, Math.pow(2, retryCount) * 1000);
      } else {
        setError(err);
        onError?.(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComponent();
  }, [remoteName, moduleName]);

  if (loading) {
    return fallback || <LoadingSpinner message={`Loading ${remoteName}...`} />;
  }

  if (error) {
    return (
      <ErrorFallback 
        error={error} 
        resetErrorBoundary={() => {
          setRetryCount(0);
          loadComponent();
        }}
      />
    );
  }

  if (!Component) {
    return <div>Failed to load component</div>;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onError}
      onReset={() => {
        setComponent(null);
        setRetryCount(0);
        loadComponent();
      }}
    >
      <Suspense fallback={fallback || <LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default DynamicMicrofrontend;
```

**6. Testing Micro-frontends:**

```javascript
// tests/microfrontend.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DynamicMicrofrontend from '../components/DynamicMicrofrontend';

// Mock the module federation
jest.mock('user-management/UserApp', () => {
  return function MockUserApp(props) {
    return <div data-testid="user-app">User Management App {JSON.stringify(props)}</div>;
  };
});

describe('DynamicMicrofrontend', () => {
  it('should load and render micro-frontend successfully', async () => {
    const mockProps = { user: { id: 1, name: 'Test User' } };
    
    render(
      <BrowserRouter>
        <DynamicMicrofrontend
          remoteName="user-management"
          moduleName="UserApp"
          props={mockProps}
        />
      </BrowserRouter>
    );

    // Should show loading initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Should load the component
    await waitFor(() => {
      expect(screen.getByTestId('user-app')).toBeInTheDocument();
    });

    // Should pass props correctly
    expect(screen.getByText(/Test User/)).toBeInTheDocument();
  });

  it('should handle loading errors gracefully', async () => {
    const onError = jest.fn();
    
    render(
      <DynamicMicrofrontend
        remoteName="non-existent"
        moduleName="NonExistentApp"
        onError={onError}
        retryAttempts={1}
      />
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});
```

**Best Practices:**

1. **Independent Deployments**: Each micro-frontend should be deployable independently
2. **Shared Dependencies**: Use Module Federation's shared dependencies to avoid duplication
3. **Error Isolation**: Implement proper error boundaries to prevent cascading failures
4. **Communication Patterns**: Use event bus or shared state for cross-micro-frontend communication
5. **Performance**: Lazy load micro-frontends and implement proper caching strategies
6. **Testing**: Test micro-frontends both in isolation and integration
7. **Monitoring**: Implement comprehensive logging and monitoring for each micro-frontend
8. **Version Management**: Maintain compatibility between shell and micro-frontends

---

### Q19: How do you implement advanced React performance optimization techniques?

**Difficulty: Expert**

**Answer:**
Advanced React performance optimization involves multiple strategies including bundle optimization, runtime performance, memory management, and rendering optimization.

**1. Bundle Optimization and Code Splitting:**

```jsx
// src/utils/lazyWithRetry.js - Enhanced lazy loading with retry
import { lazy } from 'react';

const lazyWithRetry = (componentImport, retries = 3, delay = 1000) => {
  return lazy(async () => {
    let lastError;
    
    for (let i = 0; i <= retries; i++) {
      try {
        const component = await componentImport();
        return component;
      } catch (error) {
        lastError = error;
        
        if (i < retries) {
          // Exponential backoff
          await new Promise(resolve => 
            setTimeout(resolve, delay * Math.pow(2, i))
          );
        }
      }
    }
    
    throw lastError;
  });
};

export default lazyWithRetry;
```

```jsx
// src/components/RouteBasedSplitting.jsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import lazyWithRetry from '../utils/lazyWithRetry';
import LoadingSpinner from './LoadingSpinner';
import ErrorFallback from './ErrorFallback';

// Route-based code splitting with retry logic
const Dashboard = lazyWithRetry(() => import('../pages/Dashboard'));
const UserProfile = lazyWithRetry(() => import('../pages/UserProfile'));
const Settings = lazyWithRetry(() => import('../pages/Settings'));
const Analytics = lazyWithRetry(() => import('../pages/Analytics'));
const Reports = lazyWithRetry(() => import('../pages/Reports'));

// Component-based splitting for heavy components
const DataVisualization = lazyWithRetry(() => import('../components/DataVisualization'));
const AdvancedChart = lazyWithRetry(() => import('../components/AdvancedChart'));

function AppRoutes() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route 
            path="/analytics" 
            element={
              <Suspense fallback={<LoadingSpinner message="Loading Analytics..." />}>
                <Analytics />
              </Suspense>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <Suspense fallback={<LoadingSpinner message="Loading Reports..." />}>
                <Reports />
              </Suspense>
            } 
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRoutes;
```

**2. Advanced Memoization Strategies:**

```jsx
// src/hooks/useAdvancedMemo.js
import { useMemo, useRef, useCallback } from 'react';

// Deep comparison memoization
export function useDeepMemo(factory, deps) {
  const ref = useRef();
  
  if (!ref.current || !deepEqual(ref.current.deps, deps)) {
    ref.current = {
      deps,
      value: factory()
    };
  }
  
  return ref.current.value;
}

// Memoization with custom equality function
export function useMemoWithCustomEquality(factory, deps, equalityFn) {
  const ref = useRef();
  
  if (!ref.current || !equalityFn(ref.current.deps, deps)) {
    ref.current = {
      deps,
      value: factory()
    };
  }
  
  return ref.current.value;
}

// Stable callback with dependency tracking
export function useStableCallback(callback, deps) {
  const callbackRef = useRef(callback);
  const depsRef = useRef(deps);
  
  // Update callback if dependencies changed
  if (!shallowEqual(depsRef.current, deps)) {
    callbackRef.current = callback;
    depsRef.current = deps;
  }
  
  return useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}

// Memoization with size limit (LRU cache)
export function useLRUMemo(factory, deps, maxSize = 10) {
  const cacheRef = useRef(new Map());
  const keysRef = useRef([]);
  
  return useMemo(() => {
    const key = JSON.stringify(deps);
    const cache = cacheRef.current;
    const keys = keysRef.current;
    
    if (cache.has(key)) {
      // Move to end (most recently used)
      const index = keys.indexOf(key);
      keys.splice(index, 1);
      keys.push(key);
      return cache.get(key);
    }
    
    const value = factory();
    
    // Add to cache
    cache.set(key, value);
    keys.push(key);
    
    // Remove oldest if over limit
    if (keys.length > maxSize) {
      const oldestKey = keys.shift();
      cache.delete(oldestKey);
    }
    
    return value;
  }, deps);
}

// Utility functions
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
    
    return true;
  }
  
  return false;
}

function shallowEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  for (let key of keysA) {
    if (a[key] !== b[key]) return false;
  }
  
  return true;
}
```

**3. Virtual Scrolling and Windowing:**

```jsx
// src/components/VirtualizedList.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FixedSizeList as List, VariableSizeList } from 'react-window';
import { areEqual } from 'react-window';
import memoize from 'memoize-one';

// Fixed height virtual list
const VirtualizedFixedList = React.memo(({ 
  items, 
  itemHeight = 50, 
  containerHeight = 400,
  renderItem,
  onItemsRendered,
  overscanCount = 5
}) => {
  const listRef = useRef();
  
  const ItemRenderer = useCallback(({ index, style }) => {
    const item = items[index];
    return (
      <div style={style}>
        {renderItem({ item, index })}
      </div>
    );
  }, [items, renderItem]);
  
  const handleItemsRendered = useCallback(({ visibleStartIndex, visibleStopIndex }) => {
    onItemsRendered?.({ 
      startIndex: visibleStartIndex, 
      stopIndex: visibleStopIndex 
    });
  }, [onItemsRendered]);
  
  return (
    <List
      ref={listRef}
      height={containerHeight}
      itemCount={items.length}
      itemSize={itemHeight}
      onItemsRendered={handleItemsRendered}
      overscanCount={overscanCount}
    >
      {ItemRenderer}
    </List>
  );
});

// Variable height virtual list
const VirtualizedVariableList = React.memo(({ 
  items, 
  getItemHeight, 
  containerHeight = 400,
  renderItem,
  estimatedItemSize = 50,
  onItemsRendered
}) => {
  const listRef = useRef();
  const itemHeightCache = useRef(new Map());
  
  // Memoized height getter
  const getHeight = useMemo(() => 
    memoize((index) => {
      if (itemHeightCache.current.has(index)) {
        return itemHeightCache.current.get(index);
      }
      
      const height = getItemHeight(items[index], index);
      itemHeightCache.current.set(index, height);
      return height;
    }),
    [items, getItemHeight]
  );
  
  // Clear cache when items change
  useEffect(() => {
    itemHeightCache.current.clear();
    listRef.current?.resetAfterIndex(0);
  }, [items]);
  
  const ItemRenderer = useCallback(({ index, style }) => {
    const item = items[index];
    return (
      <div style={style}>
        {renderItem({ item, index })}
      </div>
    );
  }, [items, renderItem]);
  
  return (
    <VariableSizeList
      ref={listRef}
      height={containerHeight}
      itemCount={items.length}
      itemSize={getHeight}
      estimatedItemSize={estimatedItemSize}
      onItemsRendered={onItemsRendered}
    >
      {ItemRenderer}
    </VariableSizeList>
  );
});

// Grid virtualization for 2D data
const VirtualizedGrid = React.memo(({ 
  data, 
  columnCount,
  rowCount,
  columnWidth = 200,
  rowHeight = 50,
  containerWidth = 800,
  containerHeight = 400,
  renderCell
}) => {
  const gridRef = useRef();
  
  const CellRenderer = useCallback(({ columnIndex, rowIndex, style }) => {
    const cellData = data[rowIndex]?.[columnIndex];
    return (
      <div style={style}>
        {renderCell({ cellData, columnIndex, rowIndex })}
      </div>
    );
  }, [data, renderCell]);
  
  return (
    <FixedSizeGrid
      ref={gridRef}
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={containerHeight}
      rowCount={rowCount}
      rowHeight={rowHeight}
      width={containerWidth}
    >
      {CellRenderer}
    </FixedSizeGrid>
  );
});

export { VirtualizedFixedList, VirtualizedVariableList, VirtualizedGrid };
```

**4. Memory Management and Cleanup:**

```jsx
// src/hooks/useMemoryOptimization.js
import { useEffect, useRef, useCallback } from 'react';

// Automatic cleanup for event listeners
export function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();
  
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

// Intersection Observer with cleanup
export function useIntersectionObserver(callback, options = {}) {
  const observerRef = useRef();
  
  const observe = useCallback((element) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    if (element) {
      observerRef.current = new IntersectionObserver(callback, options);
      observerRef.current.observe(element);
    }
  }, [callback, options]);
  
  const unobserve = useCallback((element) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
    }
  }, []);
  
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  return { observe, unobserve };
}

// Memory-efficient image loading
export function useImagePreloader(imageSrcs, options = {}) {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const imageCache = useRef(new Map());
  
  const preloadImage = useCallback((src) => {
    if (imageCache.current.has(src)) {
      return imageCache.current.get(src);
    }
    
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve(img);
      };
      
      img.onerror = () => {
        setFailedImages(prev => new Set([...prev, src]));
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
      
      // Set loading timeout
      if (options.timeout) {
        setTimeout(() => {
          if (!loadedImages.has(src) && !failedImages.has(src)) {
            img.src = ''; // Cancel loading
            reject(new Error(`Image loading timeout: ${src}`));
          }
        }, options.timeout);
      }
    });
    
    imageCache.current.set(src, promise);
    return promise;
  }, [loadedImages, failedImages, options.timeout]);
  
  useEffect(() => {
    imageSrcs.forEach(src => {
      if (!loadedImages.has(src) && !failedImages.has(src)) {
        preloadImage(src).catch(() => {});
      }
    });
  }, [imageSrcs, preloadImage, loadedImages, failedImages]);
  
  // Cleanup cache on unmount
  useEffect(() => {
    return () => {
      imageCache.current.clear();
    };
  }, []);
  
  return {
    loadedImages,
    failedImages,
    preloadImage,
    isLoaded: (src) => loadedImages.has(src),
    isFailed: (src) => failedImages.has(src)
  };
}

// Debounced state updates
export function useDebouncedState(initialValue, delay = 300) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const timeoutRef = useRef();
  
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);
  
  return [debouncedValue, setValue];
}
```

**5. Performance Monitoring and Profiling:**

```jsx
// src/utils/performanceMonitor.js
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
  }
  
  // Measure component render time
  measureRender(componentName, renderFn) {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();
    
    this.recordMetric('render', componentName, end - start);
    return result;
  }
  
  // Measure async operations
  async measureAsync(operationName, asyncFn) {
    const start = performance.now();
    try {
      const result = await asyncFn();
      const end = performance.now();
      this.recordMetric('async', operationName, end - start);
      return result;
    } catch (error) {
      const end = performance.now();
      this.recordMetric('async-error', operationName, end - start);
      throw error;
    }
  }
  
  // Record custom metrics
  recordMetric(type, name, value, metadata = {}) {
    const key = `${type}:${name}`;
    if (!this.metrics.has(key)) {
      this.metrics.set(key, []);
    }
    
    this.metrics.get(key).push({
      value,
      timestamp: Date.now(),
      metadata
    });
    
    // Notify observers
    this.observers.forEach(observer => {
      observer({ type, name, value, metadata });
    });
    
    // Keep only last 100 measurements
    const measurements = this.metrics.get(key);
    if (measurements.length > 100) {
      measurements.splice(0, measurements.length - 100);
    }
  }
  
  // Get performance statistics
  getStats(type, name) {
    const key = `${type}:${name}`;
    const measurements = this.metrics.get(key) || [];
    
    if (measurements.length === 0) {
      return null;
    }
    
    const values = measurements.map(m => m.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Calculate percentiles
    const sorted = [...values].sort((a, b) => a - b);
    const p50 = sorted[Math.floor(sorted.length * 0.5)];
    const p90 = sorted[Math.floor(sorted.length * 0.9)];
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    
    return {
      count: measurements.length,
      avg,
      min,
      max,
      p50,
      p90,
      p95,
      recent: measurements.slice(-10).map(m => m.value)
    };
  }
  
  // Subscribe to metrics
  subscribe(observer) {
    this.observers.push(observer);
    return () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }
  
  // Clear all metrics
  clear() {
    this.metrics.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({});
  
  useEffect(() => {
    const unsubscribe = performanceMonitor.subscribe((metric) => {
      setMetrics(prev => ({
        ...prev,
        [`${metric.type}:${metric.name}`]: performanceMonitor.getStats(metric.type, metric.name)
      }));
    });
    
    return unsubscribe;
  }, []);
  
  return {
    metrics,
    measureRender: performanceMonitor.measureRender.bind(performanceMonitor),
    measureAsync: performanceMonitor.measureAsync.bind(performanceMonitor),
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor)
  };
}
```

**Best Practices:**

1. **Bundle Analysis**: Regularly analyze bundle size and eliminate unused code
2. **Lazy Loading**: Implement strategic code splitting and lazy loading
3. **Memoization**: Use React.memo, useMemo, and useCallback judiciously
4. **Virtual Scrolling**: Implement for large lists and grids
5. **Memory Management**: Clean up event listeners, timers, and subscriptions
6. **Performance Monitoring**: Track key metrics and identify bottlenecks
7. **Image Optimization**: Implement lazy loading and proper image formats
8. **State Management**: Optimize state updates and avoid unnecessary re-renders

### Q20: How do you implement React 18+ concurrent features and automatic batching?

**Answer:**

React 18 introduced several concurrent features that improve performance and user experience through automatic batching, concurrent rendering, and new APIs.

**1. Automatic Batching:**

```jsx
// Before React 18 - only batched in React event handlers
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // React 17: Only batched in React events
    setCount(c => c + 1);
    setFlag(f => !f);
    // Only one re-render
  }

  function handleTimeout() {
    // React 17: Not batched - causes two re-renders
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
    }, 1000);
  }

  function handlePromise() {
    // React 17: Not batched - causes two re-renders
    fetch('/api/data').then(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Sync Update</button>
      <button onClick={handleTimeout}>Async Update</button>
      <button onClick={handlePromise}>Promise Update</button>
      <p>Count: {count}, Flag: {flag.toString()}</p>
    </div>
  );
}

// React 18: All updates are automatically batched
// createRoot enables automatic batching
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
```

**2. Opt-out of Batching with flushSync:**

```jsx
import { flushSync } from 'react-dom';

function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // Force immediate update (opt-out of batching)
    flushSync(() => {
      setCount(c => c + 1);
    });
    // This will cause a separate re-render
    setFlag(f => !f);
  }

  return (
    <div>
      <button onClick={handleClick}>Force Separate Renders</button>
      <p>Count: {count}, Flag: {flag.toString()}</p>
    </div>
  );
}
```

**3. useTransition for Non-Urgent Updates:**

```jsx
import { useState, useTransition, useDeferredValue } from 'react';

function SearchApp() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  // Defer expensive computations
  const deferredQuery = useDeferredValue(query);

  function handleSearch(value) {
    // Urgent: Update input immediately
    setQuery(value);
    
    // Non-urgent: Update results with lower priority
    startTransition(() => {
      // Expensive search operation
      const searchResults = performExpensiveSearch(value);
      setResults(searchResults);
    });
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {isPending && <div>Searching...</div>}
      <SearchResults query={deferredQuery} results={results} />
    </div>
  );
}

function SearchResults({ query, results }) {
  // This component will re-render with lower priority
  return (
    <div>
      <h3>Results for: {query}</h3>
      {results.map(result => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}

function performExpensiveSearch(query) {
  // Simulate expensive operation
  const results = [];
  for (let i = 0; i < 10000; i++) {
    if (Math.random() > 0.7) {
      results.push({ id: i, title: `Result ${i} for ${query}` });
    }
  }
  return results.slice(0, 50);
}
```

**4. useDeferredValue for Expensive Renders:**

```jsx
import { useState, useDeferredValue, memo } from 'react';

function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to filter..."
      />
      {/* This component updates immediately */}
      <p>Typing: {text}</p>
      
      {/* This component updates with lower priority */}
      <ExpensiveList query={deferredText} />
    </div>
  );
}

const ExpensiveList = memo(function ExpensiveList({ query }) {
  const items = generateLargeList(query);
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <ExpensiveItem item={item} />
        </li>
      ))}
    </ul>
  );
});

const ExpensiveItem = memo(function ExpensiveItem({ item }) {
  // Simulate expensive rendering
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += Math.random();
  }
  
  return <div>{item.name} - {result.toFixed(2)}</div>;
});

function generateLargeList(query) {
  const items = [];
  for (let i = 0; i < 1000; i++) {
    const name = `Item ${i}`;
    if (!query || name.toLowerCase().includes(query.toLowerCase())) {
      items.push({ id: i, name });
    }
  }
  return items;
}
```

**5. Concurrent Rendering with Suspense:**

```jsx
import { Suspense, lazy, useState, useTransition } from 'react';

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
const AnotherComponent = lazy(() => import('./AnotherComponent'));

function App() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isPending, startTransition] = useTransition();

  function handleTabChange(tab) {
    startTransition(() => {
      setActiveTab(tab);
    });
  }

  return (
    <div>
      <nav>
        <button
          onClick={() => handleTabChange('tab1')}
          disabled={isPending && activeTab !== 'tab1'}
        >
          Tab 1 {isPending && activeTab === 'tab1' && '(Loading...)'}
        </button>
        <button
          onClick={() => handleTabChange('tab2')}
          disabled={isPending && activeTab !== 'tab2'}
        >
          Tab 2 {isPending && activeTab === 'tab2' && '(Loading...)'}
        </button>
      </nav>
      
      <Suspense fallback={<div>Loading tab content...</div>}>
        {activeTab === 'tab1' && <HeavyComponent />}
        {activeTab === 'tab2' && <AnotherComponent />}
      </Suspense>
    </div>
  );
}
```

**6. useId for Stable IDs:**

```jsx
import { useId } from 'react';

function FormField({ label, type = 'text' }) {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}

function ContactForm() {
  return (
    <form>
      <FormField label="Name" />
      <FormField label="Email" type="email" />
      <FormField label="Phone" type="tel" />
    </form>
  );
}
```

**7. useSyncExternalStore for External State:**

```jsx
import { useSyncExternalStore } from 'react';

// External store
class ThemeStore {
  constructor() {
    this.theme = 'light';
    this.listeners = new Set();
  }
  
  getSnapshot = () => {
    return this.theme;
  };
  
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  
  setTheme = (theme) => {
    this.theme = theme;
    this.listeners.forEach(listener => listener());
  };
}

const themeStore = new ThemeStore();

function useTheme() {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    () => 'light' // Server snapshot
  );
  
  return [theme, themeStore.setTheme];
}

function App() {
  const [theme, setTheme] = useTheme();
  
  return (
    <div className={`app ${theme}`}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme (Current: {theme})
      </button>
    </div>
  );
}
```

**8. Performance Monitoring with Concurrent Features:**

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  console.log('Profiler:', {
    id,
    phase, // 'mount' or 'update'
    actualDuration, // Time spent rendering
    baseDuration, // Estimated time without memoization
    startTime,
    commitTime
  });
  
  // Send to analytics
  if (actualDuration > 16) { // More than one frame
    analytics.track('slow-render', {
      component: id,
      duration: actualDuration,
      phase
    });
  }
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <Profiler id="MainContent" onRender={onRenderCallback}>
        <MainContent />
      </Profiler>
      <Footer />
    </Profiler>
  );
}
```

**Best Practices:**

1. **Use createRoot**: Always use `createRoot` instead of `ReactDOM.render` for React 18 features
2. **Embrace Automatic Batching**: Let React batch updates automatically, only use `flushSync` when necessary
3. **Use Transitions Wisely**: Mark non-urgent updates with `startTransition` to keep UI responsive
4. **Defer Expensive Operations**: Use `useDeferredValue` for expensive computations that can be delayed
5. **Combine with Suspense**: Use concurrent features with Suspense for better loading states
6. **Monitor Performance**: Use Profiler to identify performance bottlenecks
7. **Gradual Adoption**: You can adopt these features incrementally in existing applications
8. **Test Thoroughly**: Concurrent features can change timing, so test edge cases carefully

---

### Q21: How do you implement React Server Components and modern full-stack React architecture?
**Difficulty: Expert**

**Answer:**
React Server Components (RSC) represent a paradigm shift in React development, allowing components to run on the server and stream HTML to the client. This enables better performance, SEO, and developer experience.

**1. Basic Server Component Structure:**

```jsx
// app/page.js (Server Component by default in Next.js 13+)
import { Suspense } from 'react';
import { UserProfile } from './components/UserProfile';
import { PostsList } from './components/PostsList';
import { Sidebar } from './components/Sidebar';

// This runs on the server
export default async function HomePage() {
  // Direct database/API calls in Server Components
  const user = await fetch('https://api.example.com/user/1').then(res => res.json());
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return (
    <div className="homepage">
      <header>
        <h1>Welcome, {user.name}</h1>
      </header>
      
      <main className="main-content">
        <Suspense fallback={<div>Loading profile...</div>}>
          <UserProfile user={user} />
        </Suspense>
        
        <Suspense fallback={<div>Loading posts...</div>}>
          <PostsList posts={posts} />
        </Suspense>
      </main>
      
      <aside>
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <Sidebar userId={user.id} />
        </Suspense>
      </aside>
    </div>
  );
}
```

**2. Server vs Client Component Patterns:**

```jsx
// components/UserProfile.js (Server Component)
import { db } from '@/lib/database';
import { InteractiveButton } from './InteractiveButton';

export async function UserProfile({ user }) {
  // Server-side data fetching
  const userStats = await db.query(
    'SELECT post_count, follower_count FROM user_stats WHERE user_id = ?',
    [user.id]
  );
  
  const recentActivity = await db.query(
    'SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC LIMIT 5',
    [user.id]
  );
  
  return (
    <div className="user-profile">
      <div className="user-info">
        <img src={user.avatar} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        
        <div className="stats">
          <span>{userStats.post_count} Posts</span>
          <span>{userStats.follower_count} Followers</span>
        </div>
      </div>
      
      {/* Client Component for interactivity */}
      <InteractiveButton userId={user.id} />
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        {recentActivity.map(activity => (
          <div key={activity.id} className="activity-item">
            <span>{activity.type}</span>
            <time>{new Date(activity.created_at).toLocaleDateString()}</time>
          </div>
        ))}
      </div>
    </div>
  );
}
```