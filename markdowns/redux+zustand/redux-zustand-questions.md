# Redux + Zustand Interview Questions and Answers

A comprehensive guide covering Redux and Zustand state management libraries, their differences, use cases, and implementation patterns.

## Table of Contents

- [Redux + Zustand Interview Questions and Answers](#redux--zustand-interview-questions-and-answers)
  - [Table of Contents](#table-of-contents)
    - [Q1: What are the key differences between Redux and Zustand, and when should you use each?](#q1-what-are-the-key-differences-between-redux-and-zustand-and-when-should-you-use-each)
  - [Q2: How do you implement middleware in Redux and Zustand?](#q2-how-do-you-implement-middleware-in-redux-and-zustand)
  - [Q3: How do you handle async operations and side effects in Redux vs Zustand?](#q3-how-do-you-handle-async-operations-and-side-effects-in-redux-vs-zustand)
  - [Q4: How do you implement testing strategies for Redux and Zustand stores?](#q4-how-do-you-implement-testing-strategies-for-redux-and-zustand-stores)
  - [Q5: How do you optimize performance in Redux and Zustand applications?](#q5-how-do-you-optimize-performance-in-redux-and-zustand-applications)
  - [Q6: How do you integrate Redux and Zustand with DevTools and debugging?](#q6-how-do-you-integrate-redux-and-zustand-with-devtools-and-debugging)
  - [Q8: How do you implement real-time updates and synchronization in Redux and Zustand?](#q8-how-do-you-implement-real-time-updates-and-synchronization-in-redux-and-zustand)
  - [Q9: How do you implement undo/redo functionality in Redux and Zustand?](#q9-how-do-you-implement-undoredo-functionality-in-redux-and-zustand)
  - [Q10: How do you implement data persistence and hydration in Redux and Zustand?](#q10-how-do-you-implement-data-persistence-and-hydration-in-redux-and-zustand)

---

### Q1: What are the key differences between Redux and Zustand, and when should you use each?

**Answer:**
Redux and Zustand are both state management libraries, but they differ significantly in philosophy, complexity, and use cases.

**Key Differences:**

**1. Boilerplate and Setup:**

*Redux:*
```javascript
// Redux requires multiple files and setup
// actions/userActions.js
export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';

export const loadUsers = () => ({ type: LOAD_USERS });
export const loadUsersSuccess = (users) => ({
  type: LOAD_USERS_SUCCESS,
  payload: users
});
export const loadUsersFailure = (error) => ({
  type: LOAD_USERS_FAILURE,
  payload: error
});

// reducers/userReducer.js
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from '../actions/userActions';

const initialState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// store/index.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from '../reducers/userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  users: userReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
```

*Zustand:*
```javascript
// Single file store definition
import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,
  
  loadUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  addUser: (user) => set((state) => ({
    users: [...state.users, user]
  })),
  
  updateUser: (id, updates) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updates } : user
    )
  })),
  
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  
  clearError: () => set({ error: null })
}));
```

**2. Component Usage:**

*Redux:*
```javascript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers, addUser } from '../actions/userActions';

const UserList = () => {
  const { users, loading, error } = useSelector(state => state.users);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  
  const handleAddUser = (userData) => {
    dispatch(addUser(userData));
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => handleAddUser({ name: 'New User' })}>
        Add User
      </button>
    </div>
  );
};
```

*Zustand:*
```javascript
import React, { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';

const UserList = () => {
  const { 
    users, 
    loading, 
    error, 
    loadUsers, 
    addUser 
  } = useUserStore();
  
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  
  const handleAddUser = () => {
    addUser({ id: Date.now(), name: 'New User' });
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={handleAddUser}>
        Add User
      </button>
    </div>
  );
};
```

**3. Advanced Patterns:**

*Redux with Redux Toolkit:*
```javascript
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

// Async thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      const user = state.users.find(u => u.id === id);
      if (user) Object.assign(user, updates);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

// Store
export const store = configureStore({
  reducer: {
    users: userSlice.reducer
  }
});
```

*Zustand with Middleware:*
```javascript
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  filter: string;
  
  // Actions
  loadUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setFilter: (filter: string) => void;
  clearError: () => void;
  
  // Computed
  filteredUsers: () => User[];
}

export const useUserStore = create<UserState>()()
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          users: [],
          loading: false,
          error: null,
          filter: '',
          
          loadUsers: async () => {
            set((state) => {
              state.loading = true;
              state.error = null;
            });
            
            try {
              const response = await fetch('/api/users');
              if (!response.ok) throw new Error('Failed to fetch users');
              const users = await response.json();
              
              set((state) => {
                state.users = users;
                state.loading = false;
              });
            } catch (error) {
              set((state) => {
                state.error = error.message;
                state.loading = false;
              });
            }
          },
          
          addUser: (userData) => set((state) => {
            const newUser = {
              ...userData,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString()
            };
            state.users.push(newUser);
          }),
          
          updateUser: (id, updates) => set((state) => {
            const userIndex = state.users.findIndex(u => u.id === id);
            if (userIndex !== -1) {
              Object.assign(state.users[userIndex], updates);
            }
          }),
          
          deleteUser: (id) => set((state) => {
            state.users = state.users.filter(u => u.id !== id);
          }),
          
          setFilter: (filter) => set((state) => {
            state.filter = filter;
          }),
          
          clearError: () => set((state) => {
            state.error = null;
          }),
          
          filteredUsers: () => {
            const { users, filter } = get();
            if (!filter) return users;
            return users.filter(user => 
              user.name.toLowerCase().includes(filter.toLowerCase()) ||
              user.email.toLowerCase().includes(filter.toLowerCase())
            );
          }
        }))
      ),
      {
        name: 'user-store',
        partialize: (state) => ({ users: state.users, filter: state.filter })
      }
    ),
    { name: 'UserStore' }
  )
);

// Subscribe to changes
useUserStore.subscribe(
  (state) => state.users,
  (users) => {
    console.log('Users updated:', users.length);
  }
);
```

**When to Use Each:**

**Use Redux when:**
- Building large, complex applications with multiple teams
- Need predictable state updates with time-travel debugging
- Require extensive middleware ecosystem (sagas, observables)
- Need strict patterns and conventions across the team
- Building applications with complex async flows
- Need hot reloading and advanced debugging capabilities
- Working with legacy codebases already using Redux

**Use Zustand when:**
- Building small to medium-sized applications
- Want minimal boilerplate and faster development
- Need simple, intuitive API with TypeScript support
- Prefer co-locating state logic with business logic
- Want built-in async support without additional middleware
- Need selective subscriptions for performance optimization
- Building modern React applications with hooks-first approach
- Want easy integration with existing codebases

**Performance Comparison:**

Redux typically has more overhead due to its architecture, while Zustand offers better performance out of the box with selective subscriptions and minimal re-renders.

---

## Q2: How do you implement middleware in Redux and Zustand?
**Difficulty: Medium**

**Answer:**

Middleware in both Redux and Zustand allows you to extend functionality and handle cross-cutting concerns like logging, persistence, and async operations.

**Redux Middleware:**

```javascript
// Custom Redux middleware
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(`Action: ${action.type}`);
  console.log('Previous State:', store.getState());
  console.log('Action:', action);
  
  const result = next(action);
  
  console.log('Next State:', store.getState());
  console.groupEnd();
  
  return result;
};

// API middleware for handling async actions
const apiMiddleware = (store) => (next) => (action) => {
  if (action.type?.endsWith('/pending')) {
    // Show loading indicator
    store.dispatch({ type: 'ui/setLoading', payload: true });
  }
  
  if (action.type?.endsWith('/fulfilled') || action.type?.endsWith('/rejected')) {
    // Hide loading indicator
    store.dispatch({ type: 'ui/setLoading', payload: false });
  }
  
  return next(action);
};

// Error handling middleware
const errorMiddleware = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error('Redux Error:', error);
    store.dispatch({
      type: 'error/setError',
      payload: { message: error.message, timestamp: Date.now() }
    });
    throw error;
  }
};

// Store configuration with middleware
import { configureStore } from '@reduxjs/toolkit';
import { createListenerMiddleware } from '@reduxjs/toolkit';

const listenerMiddleware = createListenerMiddleware();

// Add listeners for side effects
listenerMiddleware.startListening({
  actionCreator: userSlice.actions.addUser,
  effect: async (action, listenerApi) => {
    // Analytics tracking
    analytics.track('user_added', {
      userId: action.payload.id,
      timestamp: Date.now()
    });
    
    // Auto-save to server
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload)
      });
    } catch (error) {
      listenerApi.dispatch(userSlice.actions.deleteUser(action.payload.id));
      listenerApi.dispatch(setError('Failed to save user'));
    }
  }
});

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    ui: uiSlice.reducer,
    error: errorSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
    .concat(loggerMiddleware)
    .concat(apiMiddleware)
    .concat(errorMiddleware)
    .concat(listenerMiddleware.middleware)
});
```

**Zustand Middleware:**

```javascript
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Custom logging middleware
const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('Previous state:', get());
      set(...args);
      console.log('New state:', get());
    },
    get,
    api
  );

// Custom analytics middleware
const analytics = (config) => (set, get, api) => {
  const originalSet = set;
  const wrappedSet = (...args) => {
    const prevState = get();
    originalSet(...args);
    const newState = get();
    
    // Track state changes
    if (prevState.users.length !== newState.users.length) {
      window.gtag?.('event', 'state_change', {
        category: 'users',
        action: newState.users.length > prevState.users.length ? 'add' : 'remove',
        value: Math.abs(newState.users.length - prevState.users.length)
      });
    }
  };
  
  return config(wrappedSet, get, api);
};

// Custom persistence middleware
const customPersist = (config, options) => (set, get, api) => {
  const { name, storage = localStorage, serialize = JSON.stringify, deserialize = JSON.parse } = options;
  
  // Load initial state
  try {
    const stored = storage.getItem(name);
    if (stored) {
      const parsedState = deserialize(stored);
      set(parsedState);
    }
  } catch (error) {
    console.error('Failed to load persisted state:', error);
  }
  
  const originalSet = set;
  const wrappedSet = (...args) => {
    originalSet(...args);
    
    // Save state after each update
    try {
      const state = get();
      storage.setItem(name, serialize(state));
    } catch (error) {
      console.error('Failed to persist state:', error);
    }
  };
  
  return config(wrappedSet, get, api);
};

// Store with multiple middleware
interface AppState {
  users: User[];
  settings: Settings;
  ui: UIState;
  
  // Actions
  addUser: (user: User) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  toggleTheme: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()()
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          logger(
            analytics(
              (set, get) => ({
                users: [],
                settings: { theme: 'light', notifications: true },
                ui: { loading: false, error: null },
                
                addUser: (user) => set((state) => {
                  state.users.push(user);
                  
                  // Side effect: send notification
                  if (state.settings.notifications) {
                    new Notification(`User ${user.name} added`);
                  }
                }),
                
                updateSettings: (newSettings) => set((state) => {
                  Object.assign(state.settings, newSettings);
                }),
                
                toggleTheme: () => set((state) => {
                  state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light';
                  document.body.className = state.settings.theme;
                }),
                
                reset: () => set(() => ({
                  users: [],
                  settings: { theme: 'light', notifications: true },
                  ui: { loading: false, error: null }
                }))
              })
            )
          )
        )
      ),
      {
        name: 'app-store',
        partialize: (state) => ({
          users: state.users,
          settings: state.settings
        })
      }
    ),
    { name: 'AppStore' }
  )
);

// Advanced subscription patterns
const unsubscribeUsers = useAppStore.subscribe(
  (state) => state.users,
  (users, prevUsers) => {
    console.log('Users changed from', prevUsers.length, 'to', users.length);
  },
  {
    equalityFn: (a, b) => a.length === b.length,
    fireImmediately: false
  }
);

// Cleanup subscription
// unsubscribeUsers();
```

**Middleware Comparison:**

| Feature | Redux | Zustand |
|---------|-------|----------|
| **Setup Complexity** | High (requires store configuration) | Low (inline with store creation) |
| **Type Safety** | Good (with TypeScript) | Excellent (built-in TypeScript) |
| **Performance** | Moderate (all middleware runs) | High (selective middleware) |
| **Ecosystem** | Extensive (redux-saga, redux-observable) | Growing (community middleware) |
| **Debugging** | Excellent (Redux DevTools) | Good (Zustand DevTools) |
| **Learning Curve** | Steep | Gentle |

---

## Q3: How do you handle async operations and side effects in Redux vs Zustand?
**Difficulty: Medium**

**Answer:**

Both Redux and Zustand provide different approaches for handling asynchronous operations and side effects.

**Redux Async Patterns:**

*1. Redux Toolkit Query (RTK Query):*
```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API slice
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['User']
    }),
    
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }]
    }),
    
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser
      }),
      invalidatesTags: ['User']
    }),
    
    updateUser: builder.mutation<User, { id: string; updates: Partial<User> }>({
      query: ({ id, updates }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: updates
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }]
    }),
    
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    })
  })
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;

// Usage in component
function UserList() {
  const {
    data: users,
    error,
    isLoading,
    refetch
  } = useGetUsersQuery();
  
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  
  const handleCreateUser = async (userData: Partial<User>) => {
    try {
      await createUser(userData).unwrap();
      toast.success('User created successfully');
    } catch (error) {
      toast.error('Failed to create user');
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {users?.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
      <CreateUserForm onSubmit={handleCreateUser} isLoading={isCreating} />
    </div>
  );
}
```

*2. Redux Toolkit createAsyncThunk:*
```javascript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string, { getState, rejectWithValue, signal }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal // For request cancellation
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        return rejectWithValue('Request was cancelled');
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (userId, { getState }) => {
      const state = getState() as RootState;
      // Don't fetch if already loading
      return !state.user.loading;
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, updates }: { userId: string; updates: Partial<User> }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) throw new Error('Update failed');
      
      const updatedUser = await response.json();
      
      // Dispatch additional actions
      dispatch(addNotification({
        type: 'success',
        message: 'Profile updated successfully'
      }));
      
      return updatedUser;
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.message
      }));
      return rejectWithValue(error.message);
    }
  }
);

// Slice with async handling
const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetProfile: (state) => {
      state.profile = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.lastUpdated = Date.now();
      });
  }
});
```

**Zustand Async Patterns:**

```javascript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Zustand store with async operations
interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  
  // Async actions
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<User | null>;
  createUser: (userData: Partial<User>) => Promise<User>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  
  // Sync actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUsers: () => void;
}

export const useUserStore = create<UserState>()()
  devtools(
    persist(
      immer((set, get) => ({
        users: [],
        currentUser: null,
        loading: false,
        error: null,
        
        fetchUsers: async () => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          
          try {
            const response = await fetch('/api/users');
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const users = await response.json();
            
            set((state) => {
              state.users = users;
              state.loading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
            throw error;
          }
        },
        
        fetchUserById: async (id: string) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          
          try {
            const response = await fetch(`/api/users/${id}`);
            if (!response.ok) {
              throw new Error('User not found');
            }
            
            const user = await response.json();
            
            set((state) => {
              state.currentUser = user;
              state.loading = false;
              
              // Update user in list if exists
              const userIndex = state.users.findIndex(u => u.id === id);
              if (userIndex !== -1) {
                state.users[userIndex] = user;
              }
            });
            
            return user;
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
            return null;
          }
        },
        
        createUser: async (userData: Partial<User>) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          
          try {
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
              throw new Error('Failed to create user');
            }
            
            const newUser = await response.json();
            
            set((state) => {
              state.users.push(newUser);
              state.loading = false;
            });
            
            // Side effects
            get().sendNotification('User created successfully');
            
            return newUser;
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
            throw error;
          }
        },
        
        updateUser: async (id: string, updates: Partial<User>) => {
          const originalUser = get().users.find(u => u.id === id);
          
          // Optimistic update
          set((state) => {
            const userIndex = state.users.findIndex(u => u.id === id);
            if (userIndex !== -1) {
              Object.assign(state.users[userIndex], updates);
            }
          });
          
          try {
            const response = await fetch(`/api/users/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates)
            });
            
            if (!response.ok) {
              throw new Error('Failed to update user');
            }
            
            const updatedUser = await response.json();
            
            set((state) => {
              const userIndex = state.users.findIndex(u => u.id === id);
              if (userIndex !== -1) {
                state.users[userIndex] = updatedUser;
              }
              if (state.currentUser?.id === id) {
                state.currentUser = updatedUser;
              }
            });
          } catch (error) {
            // Revert optimistic update
            if (originalUser) {
              set((state) => {
                const userIndex = state.users.findIndex(u => u.id === id);
                if (userIndex !== -1) {
                  state.users[userIndex] = originalUser;
                }
              });
            }
            
            set((state) => {
              state.error = error.message;
            });
            throw error;
          }
        },
        
        deleteUser: async (id: string) => {
          const originalUsers = get().users;
          
          // Optimistic delete
          set((state) => {
            state.users = state.users.filter(u => u.id !== id);
            if (state.currentUser?.id === id) {
              state.currentUser = null;
            }
          });
          
          try {
            const response = await fetch(`/api/users/${id}`, {
              method: 'DELETE'
            });
            
            if (!response.ok) {
              throw new Error('Failed to delete user');
            }
          } catch (error) {
            // Revert optimistic delete
            set((state) => {
              state.users = originalUsers;
              state.error = error.message;
            });
            throw error;
          }
        },
        
        setLoading: (loading: boolean) => set((state) => {
          state.loading = loading;
        }),
        
        setError: (error: string | null) => set((state) => {
          state.error = error;
        }),
        
        clearUsers: () => set((state) => {
          state.users = [];
          state.currentUser = null;
          state.error = null;
        }),
        
        // Helper method for notifications
        sendNotification: (message: string) => {
          // This could dispatch to a notification store
          console.log('Notification:', message);
        }
      })),
      {
        name: 'user-store',
        partialize: (state) => ({ users: state.users })
      }
    ),
    { name: 'UserStore' }
  )
);

// Advanced async patterns with Zustand
export const useAdvancedUserStore = create<UserState>()()
  devtools((set, get) => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    
    // Debounced search
    searchUsers: debounce(async (query: string) => {
      if (!query.trim()) {
        set({ users: [] });
        return;
      }
      
      set({ loading: true, error: null });
      
      try {
        const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
        const users = await response.json();
        set({ users, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    }, 300),
    
    // Batch operations
    batchUpdateUsers: async (updates: Array<{ id: string; data: Partial<User> }>) => {
      set({ loading: true });
      
      try {
        const promises = updates.map(({ id, data }) =>
          fetch(`/api/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
        );
        
        const responses = await Promise.allSettled(promises);
        const results = await Promise.all(
          responses.map(async (response, index) => {
            if (response.status === 'fulfilled' && response.value.ok) {
              return await response.value.json();
            }
            throw new Error(`Failed to update user ${updates[index].id}`);
          })
        );
        
        set((state) => ({
          users: state.users.map(user => {
            const updatedUser = results.find(result => result.id === user.id);
            return updatedUser || user;
          }),
          loading: false
        }));
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
    
    // Infinite loading with pagination
    loadMoreUsers: async (page: number = 1) => {
      const currentUsers = get().users;
      set({ loading: true });
      
      try {
        const response = await fetch(`/api/users?page=${page}&limit=20`);
        const { users: newUsers, hasMore } = await response.json();
        
        set({
          users: page === 1 ? newUsers : [...currentUsers, ...newUsers],
          loading: false,
          hasMore
        });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
    
    // Real-time updates with WebSocket
    subscribeToUpdates: () => {
      const ws = new WebSocket('/api/users/subscribe');
      
      ws.onmessage = (event) => {
        const { type, data } = JSON.parse(event.data);
        
        set((state) => {
          switch (type) {
            case 'USER_CREATED':
              return { users: [...state.users, data] };
            case 'USER_UPDATED':
              return {
                users: state.users.map(user => 
                  user.id === data.id ? { ...user, ...data } : user
                )
              };
            case 'USER_DELETED':
              return {
                users: state.users.filter(user => user.id !== data.id)
              };
            default:
              return state;
          }
        });
      };
      
      return () => ws.close();
    }
  }))
);

// Usage in React components
function UserManagement() {
  const {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  } = useUserStore();
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const handleCreateUser = async (userData: Partial<User>) => {
    try {
      await createUser(userData);
      toast.success('User created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div>
      <UserForm onSubmit={handleCreateUser} />
      <UserList 
        users={users}
        onUpdate={updateUser}
        onDelete={deleteUser}
      />
    </div>
  );
}
```

**Comparison of Async Handling:**

| Feature | Redux | Zustand |
|---------|-------|----------|
| **Setup Complexity** | High (thunks, RTK Query) | Low (built into actions) |
| **Error Handling** | Structured (pending/fulfilled/rejected) | Manual but flexible |
| **Optimistic Updates** | Manual implementation | Easy with get() access |
| **Request Cancellation** | Built-in with RTK Query | Manual with AbortController |
| **Caching** | Excellent (RTK Query) | Manual implementation |
| **Real-time Updates** | Requires middleware | Direct WebSocket integration |
| **Type Safety** | Good with proper typing | Excellent with TypeScript |

---

## Q4: How do you implement testing strategies for Redux and Zustand stores?
**Difficulty: Medium**

**Answer:**

Testing state management is crucial for maintaining reliable applications. Both Redux and Zustand require different testing approaches.

**Redux Testing Strategies:**

*1. Testing Reducers:*
```javascript
import { userSlice, addUser, updateUser, deleteUser } from './userSlice';

describe('userSlice', () => {
  const initialState = {
    users: [],
    loading: false,
    error: null
  };
  
  it('should handle addUser', () => {
    const newUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    const action = addUser(newUser);
    const state = userSlice.reducer(initialState, action);
    
    expect(state.users).toHaveLength(1);
    expect(state.users[0]).toEqual(newUser);
  });
  
  it('should handle updateUser', () => {
    const existingState = {
      ...initialState,
      users: [{ id: '1', name: 'John Doe', email: 'john@example.com' }]
    };
    
    const updates = { name: 'Jane Doe' };
    const action = updateUser({ id: '1', updates });
    const state = userSlice.reducer(existingState, action);
    
    expect(state.users[0].name).toBe('Jane Doe');
    expect(state.users[0].email).toBe('john@example.com');
  });
  
  it('should handle deleteUser', () => {
    const existingState = {
      ...initialState,
      users: [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
      ]
    };
    
    const action = deleteUser('1');
    const state = userSlice.reducer(existingState, action);
    
    expect(state.users).toHaveLength(1);
    expect(state.users[0].id).toBe('2');
  });
});
```

*2. Testing Async Thunks:*
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { fetchUsers, userSlice } from './userSlice';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock server setup
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
      ])
    );
  }),
  
  rest.get('/api/users/error', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Server error' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchUsers async thunk', () => {
  let store;
  
  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: userSlice.reducer
      }
    });
  });
  
  it('should fetch users successfully', async () => {
    const result = await store.dispatch(fetchUsers());
    
    expect(result.type).toBe('users/fetchUsers/fulfilled');
    expect(result.payload).toHaveLength(2);
    
    const state = store.getState();
    expect(state.users.users).toHaveLength(2);
    expect(state.users.loading).toBe(false);
    expect(state.users.error).toBeNull();
  });
  
  it('should handle fetch error', async () => {
    // Override the handler for this test
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );
    
    const result = await store.dispatch(fetchUsers());
    
    expect(result.type).toBe('users/fetchUsers/rejected');
    
    const state = store.getState();
    expect(state.users.loading).toBe(false);
    expect(state.users.error).toBeTruthy();
  });
});
```

*3. Testing RTK Query:*
```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';

const createWrapper = () => {
  const store = configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware)
  });
  
  return ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
};

describe('userApi', () => {
  it('should fetch users', async () => {
    const { result } = renderHook(() => userApi.useGetUsersQuery(), {
      wrapper: createWrapper()
    });
    
    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeUndefined();
  });
});
```

**Zustand Testing Strategies:**

*1. Testing Store Actions:*
```javascript
import { act, renderHook } from '@testing-library/react';
import { useUserStore } from './userStore';

// Reset store before each test
beforeEach(() => {
  useUserStore.setState({
    users: [],
    currentUser: null,
    loading: false,
    error: null
  });
});

describe('useUserStore', () => {
  it('should add user', () => {
    const { result } = renderHook(() => useUserStore());
    const newUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    
    act(() => {
      result.current.addUser(newUser);
    });
    
    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0]).toEqual(newUser);
  });
  
  it('should update user', () => {
    const { result } = renderHook(() => useUserStore());
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
    
    // Add user first
    act(() => {
      result.current.addUser(user);
    });
    
    // Update user
    act(() => {
      result.current.updateUser('1', { name: 'Jane Doe' });
    });
    
    expect(result.current.users[0].name).toBe('Jane Doe');
    expect(result.current.users[0].email).toBe('john@example.com');
  });
  
  it('should delete user', () => {
    const { result } = renderHook(() => useUserStore());
    const users = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
    ];
    
    // Add users first
    act(() => {
      users.forEach(user => result.current.addUser(user));
    });
    
    // Delete user
    act(() => {
      result.current.deleteUser('1');
    });
    
    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].id).toBe('2');
  });
});
```

*2. Testing Async Operations:*
```javascript
import { act, renderHook, waitFor } from '@testing-library/react';
import { useUserStore } from './userStore';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useUserStore async operations', () => {
  beforeEach(() => {
    useUserStore.setState({
      users: [],
      loading: false,
      error: null
    });
  });
  
  it('should fetch users successfully', async () => {
    const { result } = renderHook(() => useUserStore());
    
    await act(async () => {
      await result.current.fetchUsers();
    });
    
    expect(result.current.users).toHaveLength(2);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
  
  it('should handle fetch error', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );
    
    const { result } = renderHook(() => useUserStore());
    
    await act(async () => {
      try {
        await result.current.fetchUsers();
      } catch (error) {
        // Expected to throw
      }
    });
    
    expect(result.current.users).toHaveLength(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
  
  it('should handle optimistic updates', async () => {
    const { result } = renderHook(() => useUserStore());
    
    // Add initial user
    act(() => {
      result.current.addUser({ id: '1', name: 'John Doe', email: 'john@example.com' });
    });
    
    // Mock successful update
    server.use(
      rest.patch('/api/users/1', (req, res, ctx) => {
        return res(ctx.json({ id: '1', name: 'Jane Doe', email: 'john@example.com' }));
      })
    );
    
    await act(async () => {
      await result.current.updateUser('1', { name: 'Jane Doe' });
    });
    
    expect(result.current.users[0].name).toBe('Jane Doe');
  });
});
```

*3. Testing with React Components:*
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useUserStore } from './userStore';
import UserList from './UserList';

// Mock the store
jest.mock('./userStore');

const mockUseUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>;

describe('UserList Component', () => {
  const mockStore = {
    users: [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
    ],
    loading: false,
    error: null,
    deleteUser: jest.fn(),
    updateUser: jest.fn()
  };
  
  beforeEach(() => {
    mockUseUserStore.mockReturnValue(mockStore);
  });
  
  it('should render users', () => {
    render(<UserList />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
  
  it('should call deleteUser when delete button is clicked', async () => {
    render(<UserList />);
    
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(mockStore.deleteUser).toHaveBeenCalledWith('1');
    });
  });
});
```

**Testing Best Practices:**

1. **Isolation**: Test each piece in isolation (reducers, actions, selectors)
2. **Mocking**: Use MSW for API mocking, jest.mock for dependencies
3. **State Reset**: Reset store state between tests
4. **Async Testing**: Use proper async testing utilities
5. **Error Cases**: Test both success and error scenarios
6. **Integration**: Test component integration with stores
7. **Performance**: Test for unnecessary re-renders and memory leaks

## Q5: How do you optimize performance in Redux and Zustand applications?
**Difficulty: Advanced**

**Answer:**

Performance optimization is crucial for scalable state management. Both Redux and Zustand offer different strategies for optimization.

**Redux Performance Optimization:**

*1. Selector Optimization with Reselect:*
```javascript
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// Basic selectors
const selectUsers = (state: RootState) => state.users.users;
const selectFilter = (state: RootState) => state.users.filter;
const selectSortBy = (state: RootState) => state.users.sortBy;

// Memoized selectors
export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilter],
  (users, filter) => {
    if (!filter) return users;
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const selectSortedUsers = createSelector(
  [selectFilteredUsers, selectSortBy],
  (users, sortBy) => {
    return [...users].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }
);

// Complex computed selector
export const selectUserStats = createSelector(
  [selectUsers],
  (users) => {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.isActive).length;
    const usersByRole = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      usersByRole,
      averageAge: users.reduce((sum, user) => sum + user.age, 0) / totalUsers
    };
  }
);

// Parametric selectors
export const makeSelectUserById = () => createSelector(
  [selectUsers, (state: RootState, userId: string) => userId],
  (users, userId) => users.find(user => user.id === userId)
);

// Usage in components
function UserList() {
  const sortedUsers = useSelector(selectSortedUsers);
  const userStats = useSelector(selectUserStats);
  
  return (
    <div>
      <div>Total: {userStats.totalUsers}, Active: {userStats.activeUsers}</div>
      {sortedUsers.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```

*2. Component Optimization with React.memo:*
```javascript
import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser } from './userSlice';

// Memoized component
const UserCard = memo(({ user }: { user: User }) => {
  const dispatch = useDispatch();
  
  const handleToggleActive = useCallback(() => {
    dispatch(updateUser({ 
      id: user.id, 
      updates: { isActive: !user.isActive } 
    }));
  }, [dispatch, user.id, user.isActive]);
  
  const handleDelete = useCallback(() => {
    dispatch(deleteUser(user.id));
  }, [dispatch, user.id]);
  
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={handleToggleActive}>
        {user.isActive ? 'Deactivate' : 'Activate'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
});

// Optimized list component
const UserList = memo(() => {
  const users = useSelector(selectSortedUsers);
  const dispatch = useDispatch();
  
  const handleBulkAction = useCallback((action: string, userIds: string[]) => {
    switch (action) {
      case 'activate':
        userIds.forEach(id => 
          dispatch(updateUser({ id, updates: { isActive: true } }))
        );
        break;
      case 'deactivate':
        userIds.forEach(id => 
          dispatch(updateUser({ id, updates: { isActive: false } }))
        );
        break;
      case 'delete':
        userIds.forEach(id => dispatch(deleteUser(id)));
        break;
    }
  }, [dispatch]);
  
  return (
    <div>
      <BulkActions onAction={handleBulkAction} />
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
});
```

*3. RTK Query Optimization:*
```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], { page?: number; limit?: number }>{
      query: ({ page = 1, limit = 20 } = {}) => `users?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
      // Keep cached data for 5 minutes
      keepUnusedDataFor: 300,
      // Transform response
      transformResponse: (response: { users: User[]; total: number }) => {
        return response.users.map(user => ({
          ...user,
          fullName: `${user.firstName} ${user.lastName}`
        }));
      }
    }),
    
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
      // Keep individual user data longer
      keepUnusedDataFor: 600
    }),
    
    updateUser: builder.mutation<User, { id: string; updates: Partial<User> }>({
      query: ({ id, updates }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
      // Optimistic update
      async onQueryStarted({ id, updates }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUserById', id, (draft) => {
            Object.assign(draft, updates);
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    
    // Infinite query for large datasets
    getInfiniteUsers: builder.query<
      { users: User[]; nextCursor?: string },
      { cursor?: string; limit?: number }
    >({
      query: ({ cursor, limit = 20 }) => 
        `users/infinite?${cursor ? `cursor=${cursor}&` : ''}limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.users.push(...newItems.users);
        currentCache.nextCursor = newItems.nextCursor;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor;
      },
    })
  })
});

// Usage with automatic background refetching
function UserDashboard() {
  const {
    data: users,
    error,
    isLoading,
    isFetching,
    refetch
  } = userApi.useGetUsersQuery(
    { page: 1, limit: 50 },
    {
      // Refetch every 30 seconds
      pollingInterval: 30000,
      // Skip if user is not focused
      skipPollingIfUnfocused: true,
      // Refetch on window focus
      refetchOnFocus: true,
      // Refetch on network reconnect
      refetchOnReconnect: true
    }
  );
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  
  return (
    <div>
      {isFetching && <div className="fetching-indicator">Updating...</div>}
      <UserList users={users} />
    </div>
  );
}
```

**Zustand Performance Optimization:**

*1. Selective Subscriptions:*
```javascript
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

interface UserState {
  users: User[];
  filter: string;
  sortBy: string;
  selectedIds: Set<string>;
  
  // Actions
  setFilter: (filter: string) => void;
  setSortBy: (sortBy: string) => void;
  toggleSelection: (id: string) => void;
  
  // Computed values
  filteredUsers: User[];
  selectedUsers: User[];
  userStats: {
    total: number;
    active: number;
    selected: number;
  };
}

export const useUserStore = create<UserState>()()
  subscribeWithSelector((set, get) => ({
    users: [],
    filter: '',
    sortBy: 'name',
    selectedIds: new Set(),
    
    setFilter: (filter) => set({ filter }),
    setSortBy: (sortBy) => set({ sortBy }),
    
    toggleSelection: (id) => set((state) => {
      const newSelectedIds = new Set(state.selectedIds);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      return { selectedIds: newSelectedIds };
    }),
    
    // Computed properties
    get filteredUsers() {
      const { users, filter } = get();
      if (!filter) return users;
      return users.filter(user => 
        user.name.toLowerCase().includes(filter.toLowerCase())
      );
    },
    
    get selectedUsers() {
      const { users, selectedIds } = get();
      return users.filter(user => selectedIds.has(user.id));
    },
    
    get userStats() {
      const { users, selectedIds } = get();
      return {
        total: users.length,
        active: users.filter(user => user.isActive).length,
        selected: selectedIds.size
      };
    }
  }))
);

// Optimized component subscriptions
function UserList() {
  // Only subscribe to filteredUsers
  const filteredUsers = useUserStore(state => state.filteredUsers);
  
  return (
    <div>
      {filteredUsers.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}

function UserStats() {
  // Only subscribe to stats
  const stats = useUserStore(state => state.userStats);
  
  return (
    <div>
      <span>Total: {stats.total}</span>
      <span>Active: {stats.active}</span>
      <span>Selected: {stats.selected}</span>
    </div>
  );
}

function UserFilters() {
  // Subscribe to multiple values with shallow comparison
  const { filter, sortBy, setFilter, setSortBy } = useUserStore(
    state => ({
      filter: state.filter,
      sortBy: state.sortBy,
      setFilter: state.setFilter,
      setSortBy: state.setSortBy
    }),
    shallow
  );
  
  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter users..."
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="createdAt">Created</option>
      </select>
    </div>
  );
}
```

*2. Store Slicing and Composition:*
```javascript
// Separate stores for different concerns
interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

interface UIStore {
  filter: string;
  sortBy: string;
  selectedIds: Set<string>;
  setFilter: (filter: string) => void;
  setSortBy: (sortBy: string) => void;
  toggleSelection: (id: string) => void;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

// Create separate stores
export const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updates) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updates } : user
    )
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  }))
}));

export const useUIStore = create<UIStore>((set) => ({
  filter: '',
  sortBy: 'name',
  selectedIds: new Set(),
  setFilter: (filter) => set({ filter }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleSelection: (id) => set((state) => {
    const newSelectedIds = new Set(state.selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    return { selectedIds: newSelectedIds };
  })
}));

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}));

// Composed hook for complex operations
export const useUserManagement = () => {
  const { users, addUser, updateUser, deleteUser } = useUserStore();
  const { filter, sortBy } = useUIStore();
  const { addNotification } = useNotificationStore();
  
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;
    
    if (filter) {
      filtered = users.filter(user => 
        user.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });
  }, [users, filter, sortBy]);
  
  const handleAddUser = useCallback(async (userData: Partial<User>) => {
    try {
      const newUser = await createUserAPI(userData);
      addUser(newUser);
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        message: 'User created successfully'
      });
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: 'Failed to create user'
      });
    }
  }, [addUser, addNotification]);
  
  return {
    users: filteredAndSortedUsers,
    addUser: handleAddUser,
    updateUser,
    deleteUser
  };
};
```

**Performance Comparison:**

| Aspect | Redux | Zustand |
|--------|-------|----------|
| **Bundle Size** | Larger (RTK ~13kb) | Smaller (~2kb) |
| **Selector Memoization** | Built-in with reselect | Manual with useMemo |
| **Component Re-renders** | Optimized with React.memo | Selective subscriptions |
| **DevTools** | Excellent time-travel | Basic state inspection |
| **Code Splitting** | Good with lazy loading | Excellent with store slicing |
| **Memory Usage** | Higher due to immutability | Lower with direct mutations |
| **Learning Curve** | Steeper | Gentler |

---

## Q6: How do you integrate Redux and Zustand with DevTools and debugging?
**Difficulty: Medium**

**Answer:**

Debugging state management is essential for development productivity. Both Redux and Zustand offer different debugging capabilities.

**Redux DevTools Integration:**

*1. Basic Redux DevTools Setup:*
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { postSlice } from './postSlice';

// Enhanced store configuration for debugging
export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    posts: postSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Enable additional checks in development
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register']
      },
      immutableCheck: {
        ignoredPaths: ['register']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production' && {
    // Custom DevTools configuration
    name: 'MyApp Store',
    trace: true,
    traceLimit: 25,
    actionSanitizer: (action) => ({
      ...action,
      // Sanitize sensitive data
      payload: action.type.includes('password') 
        ? { ...action.payload, password: '***' }
        : action.payload
    }),
    stateSanitizer: (state) => ({
      ...state,
      // Hide sensitive state
      auth: {
        ...state.auth,
        token: state.auth.token ? '***' : null
      }
    })
  }
});

// Type definitions for better debugging
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

*2. Custom Middleware for Debugging:*
```javascript
import { Middleware } from '@reduxjs/toolkit';

// Logger middleware
const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();
  
  console.group(`Action: ${action.type}`);
  console.log('Previous State:', prevState);
  console.log('Action:', action);
  console.log('Next State:', nextState);
  console.groupEnd();
  
  return result;
};

// Performance monitoring middleware
const performanceMiddleware: Middleware = (store) => (next) => (action) => {
  const start = performance.now();
  const result = next(action);
  const end = performance.now();
  
  if (end - start > 10) {
    console.warn(`Slow action detected: ${action.type} took ${end - start}ms`);
  }
  
  return result;
};

// Error tracking middleware
const errorTrackingMiddleware: Middleware = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error('Action failed:', action.type, error);
    
    // Send to error tracking service
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        tags: {
          actionType: action.type
        },
        extra: {
          action,
          state: store.getState()
        }
      });
    }
    
    throw error;
  }
};

// Add middleware to store
export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    posts: postSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loggerMiddleware)
      .concat(performanceMiddleware)
      .concat(errorTrackingMiddleware)
});
```

*3. RTK Query DevTools:*
```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    // Add request/response logging
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      // Log outgoing requests in development
      if (process.env.NODE_ENV === 'development') {
        console.log('API Request Headers:', Object.fromEntries(headers.entries()));
      }
      
      return headers;
    },
    // Custom fetch function for debugging
    fetchFn: async (...args) => {
      const start = performance.now();
      const response = await fetch(...args);
      const end = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`API ${args[0]} took ${end - start}ms`);
      }
      
      return response;
    }
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      // Transform error for better debugging
      transformErrorResponse: (response) => {
        console.error('API Error:', response);
        return {
          status: response.status,
          message: response.data?.message || 'Unknown error',
          details: response.data
        };
      }
    })
  })
});
```

**Zustand DevTools Integration:**

*1. Basic Zustand DevTools:*
```javascript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>()()
  devtools(
    persist(
      immer((set, get) => ({
        users: [],
        loading: false,
        error: null,
        
        addUser: (user) => set((state) => {
          state.users.push(user);
        }, false, 'addUser'),
        
        updateUser: (id, updates) => set((state) => {
          const userIndex = state.users.findIndex(u => u.id === id);
          if (userIndex !== -1) {
            Object.assign(state.users[userIndex], updates);
          }
        }, false, { type: 'updateUser', id, updates }),
        
        deleteUser: (id) => set((state) => {
          state.users = state.users.filter(u => u.id !== id);
        }, false, { type: 'deleteUser', id }),
        
        setLoading: (loading) => set({ loading }, false, 'setLoading'),
        setError: (error) => set({ error }, false, 'setError')
      })),
      {
        name: 'user-store',
        // Customize what gets persisted
        partialize: (state) => ({ users: state.users }),
        // Version for migration
        version: 1,
        migrate: (persistedState: any, version: number) => {
          if (version === 0) {
            // Migration logic for version 0 to 1
            return {
              ...persistedState,
              users: persistedState.users || []
            };
          }
          return persistedState;
        }
      }
    ),
    {
      name: 'UserStore',
      // Enable action logging
      enabled: process.env.NODE_ENV === 'development',
      // Serialize state for DevTools
      serialize: {
        options: {
          undefined: true,
          function: true,
          symbol: true
        }
      }
    }
  )
);
```

*2. Custom Debugging Middleware:*
```javascript
import { StateCreator, StoreMutatorIdentifier } from 'zustand';

// Logger middleware
type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    const prevState = get();
    set(...a);
    const nextState = get();
    
    console.group(`${name || 'Store'} Update`);
    console.log('Previous State:', prevState);
    console.log('Next State:', nextState);
    console.groupEnd();
  };
  
  store.setState = loggedSet;
  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

// Performance monitoring middleware
type PerformanceMonitor = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>

const performanceMonitorImpl = <T>(
  f: StateCreator<T, [], []>
) => (set, get, store) => {
  const monitoredSet: typeof set = (...a) => {
    const start = performance.now();
    set(...a);
    const end = performance.now();
    
    if (end - start > 5) {
      console.warn(`Slow state update detected: ${end - start}ms`);
    }
  };
  
  store.setState = monitoredSet;
  return f(monitoredSet, get, store);
};

export const performanceMonitor = performanceMonitorImpl as unknown as PerformanceMonitor;

// Usage with custom middleware
export const useUserStore = create<UserState>()()
  logger(
    performanceMonitor(
      devtools(
        (set, get) => ({
          users: [],
          loading: false,
          error: null,
          
          addUser: (user) => set(
            (state) => ({ users: [...state.users, user] }),
            false,
            'addUser'
          ),
          
          // ... other actions
        }),
        { name: 'UserStore' }
      )
    ),
    'UserStore'
  )
);
```

*3. Advanced Debugging Utilities:*
```javascript
// State inspector utility
export const createStateInspector = <T>(store: any) => {
  const inspector = {
    getState: () => store.getState(),
    
    subscribe: (listener: (state: T) => void) => {
      return store.subscribe(listener);
    },
    
    // Get state diff
    getDiff: (prevState: T, nextState: T) => {
      const diff: any = {};
      
      Object.keys(nextState as any).forEach(key => {
        if ((prevState as any)[key] !== (nextState as any)[key]) {
          diff[key] = {
            from: (prevState as any)[key],
            to: (nextState as any)[key]
          };
        }
      });
      
      return diff;
    },
    
    // Track state changes
    trackChanges: () => {
      let prevState = store.getState();
      
      return store.subscribe((nextState: T) => {
        const diff = inspector.getDiff(prevState, nextState);
        
        if (Object.keys(diff).length > 0) {
          console.log('State changes:', diff);
        }
        
        prevState = nextState;
      });
    },
    
    // Performance profiler
    profile: (actionName: string, action: () => void) => {
      const start = performance.now();
      action();
      const end = performance.now();
      
      console.log(`${actionName} took ${end - start}ms`);
    }
  };
  
  return inspector;
};

// Usage
const userStoreInspector = createStateInspector(useUserStore);

// Track all changes
const unsubscribe = userStoreInspector.trackChanges();

// Profile an action
userStoreInspector.profile('Add 100 users', () => {
  for (let i = 0; i < 100; i++) {
    useUserStore.getState().addUser({
      id: i.toString(),
      name: `User ${i}`,
      email: `user${i}@example.com`
    });
  }
});
```

**Debugging Best Practices:**

1. **Use DevTools**: Always enable DevTools in development
2. **Action Naming**: Use descriptive action names for better debugging
3. **State Sanitization**: Hide sensitive data in DevTools
4. **Performance Monitoring**: Track slow actions and state updates
5. **Error Boundaries**: Implement proper error handling
6. **Logging**: Add strategic console logs for complex operations
7. **Testing**: Write tests to catch state management bugs early

---

 const UserProfile = () => {
   // Only re-renders when user.name changes
  const userName = useUserStore(state => state.user.name);
  return <div>{userName}</div>;
};

// Redux - Requires manual optimization
const UserProfile = React.memo(() => {
  const userName = useSelector(state => state.user.name);
  return <div>{userName}</div>;
});
```

**Bundle Size:**
- Redux + React-Redux + Redux Toolkit: ~47KB
- Zustand: ~8KB

Both libraries are excellent choices, but Zustand offers a more modern, lightweight approach while Redux provides battle-tested patterns for complex applications.

---

## Q7: How do you handle complex state normalization in Redux and Zustand?
**Difficulty: Advanced**

**Answer:**

State normalization is crucial for managing relational data efficiently. Both Redux and Zustand offer different approaches to handle normalized state.

**Redux State Normalization:**

*1. Using RTK's createEntityAdapter:*
```javascript
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

// User entity adapter
const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

// Post entity adapter
const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
});

// Users slice
const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null
  }),
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne,
    setUsers: usersAdapter.setAll,
    
    // Custom reducers
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Posts slice with user relationships
const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    loading: false,
    error: null
  }),
  reducers: {
    addPost: postsAdapter.addOne,
    addPosts: postsAdapter.addMany,
    updatePost: postsAdapter.updateOne,
    removePost: (state, action) => {
      postsAdapter.removeOne(state, action.payload);
    },
    
    // Handle user deletion
    removeUserPosts: (state, action) => {
      const userId = action.payload;
      const postsToRemove = Object.values(state.entities)
        .filter(post => post?.authorId === userId)
        .map(post => post!.id);
      
      postsAdapter.removeMany(state, postsToRemove);
    }
  }
});

// Selectors
const selectUsersState = (state: RootState) => state.users;
const selectPostsState = (state: RootState) => state.posts;

// Entity selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectTotal: selectUsersTotal
} = usersAdapter.getSelectors(selectUsersState);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities
} = postsAdapter.getSelectors(selectPostsState);

// Complex selectors with relationships
export const selectPostWithAuthor = createSelector(
  [selectPostById, selectUserEntities],
  (post, userEntities) => {
    if (!post) return null;
    return {
      ...post,
      author: userEntities[post.authorId]
    };
  }
);

export const selectUserWithPosts = createSelector(
  [selectUserById, selectAllPosts],
  (user, posts) => {
    if (!user) return null;
    return {
      ...user,
      posts: posts.filter(post => post.authorId === user.id)
    };
  }
);
```

**Zustand State Normalization:**

*1. Manual Normalization with Zustand:*
```javascript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

interface NormalizedStore {
  // Entities
  users: Record<string, User>;
  posts: Record<string, Post>;
  comments: Record<string, Comment>;
  
  // Indexes
  userIds: string[];
  postIds: string[];
  commentIds: string[];
  
  // Relationships
  userPosts: Record<string, string[]>;
  postComments: Record<string, string[]>;
  
  // Actions
  addUser: (user: User) => void;
  addPost: (post: Post) => void;
  addComment: (comment: Comment) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  removeUser: (id: string) => void;
  
  // Computed getters
  getUserById: (id: string) => User | undefined;
  getUserPosts: (userId: string) => Post[];
  getPostWithAuthor: (postId: string) => (Post & { author: User }) | null;
}

export const useNormalizedStore = create<NormalizedStore>()()
  devtools(
    immer((set, get) => ({
      // Initial state
      users: {},
      posts: {},
      comments: {},
      userIds: [],
      postIds: [],
      commentIds: [],
      userPosts: {},
      postComments: {},
      
      // Actions
      addUser: (user) => set((state) => {
        if (!state.users[user.id]) {
          state.users[user.id] = user;
          state.userIds.push(user.id);
          state.userPosts[user.id] = [];
        }
      }),
      
      addPost: (post) => set((state) => {
        if (!state.posts[post.id]) {
          state.posts[post.id] = post;
          state.postIds.push(post.id);
          
          // Update relationships
          if (!state.userPosts[post.authorId]) {
            state.userPosts[post.authorId] = [];
          }
          state.userPosts[post.authorId].push(post.id);
          state.postComments[post.id] = [];
        }
      }),
      
      addComment: (comment) => set((state) => {
        if (!state.comments[comment.id]) {
          state.comments[comment.id] = comment;
          state.commentIds.push(comment.id);
          
          // Update relationships
          if (!state.postComments[comment.postId]) {
            state.postComments[comment.postId] = [];
          }
          state.postComments[comment.postId].push(comment.id);
        }
      }),
      
      updateUser: (id, updates) => set((state) => {
        if (state.users[id]) {
          Object.assign(state.users[id], updates);
        }
      }),
      
      removeUser: (id) => set((state) => {
        if (!state.users[id]) return;
        
        // Remove user's posts and their comments
        const userPostIds = state.userPosts[id] || [];
        userPostIds.forEach(postId => {
          const postCommentIds = state.postComments[postId] || [];
          
          // Remove comments
          postCommentIds.forEach(commentId => {
            delete state.comments[commentId];
            state.commentIds = state.commentIds.filter(cId => cId !== commentId);
          });
          
          // Remove post
          delete state.posts[postId];
          state.postIds = state.postIds.filter(pId => pId !== postId);
          delete state.postComments[postId];
        });
        
        // Remove user
        delete state.users[id];
        state.userIds = state.userIds.filter(uId => uId !== id);
        delete state.userPosts[id];
      }),
      
      // Computed getters
      getUserById: (id) => get().users[id],
      
      getUserPosts: (userId) => {
        const state = get();
        const postIds = state.userPosts[userId] || [];
        return postIds.map(id => state.posts[id]).filter(Boolean);
      },
      
      getPostWithAuthor: (postId) => {
        const state = get();
        const post = state.posts[postId];
        if (!post) return null;
        
        const author = state.users[post.authorId];
        return { ...post, author };
      }
    })),
    { name: 'NormalizedStore' }
  )
);

// Custom hooks for specific data access patterns
export const useUserWithPosts = (userId: string) => {
  return useNormalizedStore(state => {
    const user = state.users[userId];
    const posts = state.getUserPosts(userId);
    return user ? { ...user, posts } : null;
  });
};

export const usePostWithDetails = (postId: string) => {
  return useNormalizedStore(state => state.getPostWithAuthor(postId));
};
```

**Best Practices for State Normalization:**

1. **Use Entity Adapters**: Leverage RTK's createEntityAdapter for Redux
2. **Maintain Relationships**: Keep track of entity relationships separately
3. **Cascade Operations**: Handle cascading deletes properly
4. **Optimize Selectors**: Use memoized selectors for complex queries
5. **Batch Updates**: Group related updates together
6. **Consistent IDs**: Use consistent ID strategies across entities

---

## Q8: How do you implement real-time updates and synchronization in Redux and Zustand?
**Difficulty: Advanced**

**Answer:**

Real-time updates are essential for modern applications. Both Redux and Zustand can handle WebSocket connections, Server-Sent Events, and other real-time data sources.

**Redux Real-time Implementation:**

*1. WebSocket Middleware for Redux:*
```javascript
import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

// WebSocket middleware
interface WebSocketAction {
  type: string;
  websocket?: {
    connect?: string;
    disconnect?: boolean;
    send?: {
      event: string;
      data: any;
    };
  };
}

const websocketMiddleware: Middleware = (store) => {
  let socket: Socket | null = null;
  
  return (next) => (action: WebSocketAction) => {
    const { websocket } = action;
    
    if (websocket?.connect) {
      // Connect to WebSocket
      socket = io(websocket.connect, {
        transports: ['websocket'],
        upgrade: false
      });
      
      // Set up event listeners
      socket.on('connect', () => {
        store.dispatch({ type: 'websocket/connected' });
      });
      
      socket.on('disconnect', () => {
        store.dispatch({ type: 'websocket/disconnected' });
      });
      
      // Listen for real-time updates
      socket.on('user:created', (user) => {
        store.dispatch({ type: 'users/addUser', payload: user });
      });
      
      socket.on('user:updated', (user) => {
        store.dispatch({ type: 'users/updateUser', payload: { id: user.id, changes: user } });
      });
      
      socket.on('post:created', (post) => {
        store.dispatch({ type: 'posts/addPost', payload: post });
      });
    }
    
    if (websocket?.disconnect && socket) {
      socket.disconnect();
      socket = null;
    }
    
    if (websocket?.send && socket) {
      socket.emit(websocket.send.event, websocket.send.data);
    }
    
    return next(action);
  };
};

// Store configuration
export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
    websocket: websocketSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware)
});
```

**Zustand Real-time Implementation:**

*1. WebSocket Integration with Zustand:*
```javascript
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { io, Socket } from 'socket.io-client';

interface RealtimeStore {
  // Connection state
  socket: Socket | null;
  connected: boolean;
  
  // Data
  users: User[];
  posts: Post[];
  
  // Actions
  connect: (url: string) => void;
  disconnect: () => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  addPost: (post: Post) => void;
  sendMessage: (event: string, data: any) => void;
}

export const useRealtimeStore = create<RealtimeStore>()()
  devtools(
    subscribeWithSelector((set, get) => ({
      socket: null,
      connected: false,
      users: [],
      posts: [],
      
      connect: (url: string) => {
        const socket = io(url);
        
        socket.on('connect', () => {
          set({ connected: true });
        });
        
        socket.on('disconnect', () => {
          set({ connected: false });
        });
        
        socket.on('user:created', (user: User) => {
          set((state) => ({
            users: [...state.users, user]
          }));
        });
        
        socket.on('user:updated', (user: User) => {
          set((state) => ({
            users: state.users.map(u => u.id === user.id ? user : u)
          }));
        });
        
        socket.on('post:created', (post: Post) => {
          set((state) => ({
            posts: [post, ...state.posts]
          }));
        });
        
        set({ socket });
      },
      
      disconnect: () => {
        const { socket } = get();
        if (socket) {
          socket.disconnect();
          set({ socket: null, connected: false });
        }
      },
      
      addUser: (user) => set((state) => ({
        users: [...state.users, user]
      })),
      
      updateUser: (user) => set((state) => ({
        users: state.users.map(u => u.id === user.id ? user : u)
      })),
      
      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts]
      })),
      
      sendMessage: (event, data) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit(event, data);
        }
      }
    })),
    { name: 'RealtimeStore' }
  )
);

// Custom hook for connection management
export const useRealtimeConnection = () => {
  const { connect, disconnect, connected } = useRealtimeStore();
  
  useEffect(() => {
    connect('ws://localhost:3001');
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  
  return { connected };
};
```

**Real-time Best Practices:**

1. **Connection Management**: Handle reconnection logic properly
2. **Event Namespacing**: Use clear event naming conventions
3. **Optimistic Updates**: Update UI immediately, revert on failure
4. **Conflict Resolution**: Handle concurrent updates gracefully
5. **Rate Limiting**: Implement client-side rate limiting for events
6. **Error Handling**: Gracefully handle connection failures
7. **Memory Management**: Clean up event listeners and subscriptions

---

## Q9: How do you implement undo/redo functionality in Redux and Zustand?
**Difficulty: Advanced**

**Answer:**

Undo/redo functionality is crucial for many applications. Both Redux and Zustand can implement this pattern with different approaches.

**Redux Undo/Redo Implementation:**

*1. Using Redux-Undo Library:*
```javascript
import undoable, { includeAction, excludeAction } from 'redux-undo';
import { createSlice } from '@reduxjs/toolkit';

// Regular slice
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all'
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

// Make the reducer undoable
const undoableTodos = undoable(todosSlice.reducer, {
  limit: 10, // Limit history to 10 states
  filter: includeAction(['todos/addTodo', 'todos/toggleTodo', 'todos/deleteTodo']),
  // Exclude filter changes from undo history
  undoType: 'UNDO_TODO',
  redoType: 'REDO_TODO',
  clearHistoryType: 'CLEAR_TODO_HISTORY'
});

// Store configuration
export const store = configureStore({
  reducer: {
    todos: undoableTodos
  }
});

// Selectors
export const selectTodos = (state: RootState) => state.todos.present.items;
export const selectFilter = (state: RootState) => state.todos.present.filter;
export const selectCanUndo = (state: RootState) => state.todos.past.length > 0;
export const selectCanRedo = (state: RootState) => state.todos.future.length > 0;

// Action creators
export const { addTodo, toggleTodo, deleteTodo, setFilter } = todosSlice.actions;
```

*2. Custom Undo/Redo Implementation:*
```javascript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UndoableState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface EditorState {
  content: string;
  cursor: number;
  selection: { start: number; end: number } | null;
}

const initialEditorState: EditorState = {
  content: '',
  cursor: 0,
  selection: null
};

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    past: [] as EditorState[],
    present: initialEditorState,
    future: [] as EditorState[]
  } as UndoableState<EditorState>,
  reducers: {
    // Undoable actions
    insertText: (state, action: PayloadAction<{ text: string; position: number }>) => {
      // Save current state to history
      state.past.push(state.present);
      if (state.past.length > 50) {
        state.past.shift(); // Limit history size
      }
      
      // Clear future when new action is performed
      state.future = [];
      
      // Update present state
      const { text, position } = action.payload;
      const content = state.present.content;
      state.present = {
        content: content.slice(0, position) + text + content.slice(position),
        cursor: position + text.length,
        selection: null
      };
    },
    
    deleteText: (state, action: PayloadAction<{ start: number; end: number }>) => {
      state.past.push(state.present);
      if (state.past.length > 50) {
        state.past.shift();
      }
      
      state.future = [];
      
      const { start, end } = action.payload;
      const content = state.present.content;
      state.present = {
        content: content.slice(0, start) + content.slice(end),
        cursor: start,
        selection: null
      };
    },
    
    // Non-undoable actions
    setCursor: (state, action: PayloadAction<number>) => {
      state.present.cursor = action.payload;
    },
    
    setSelection: (state, action: PayloadAction<{ start: number; end: number } | null>) => {
      state.present.selection = action.payload;
    },
    
    // Undo/Redo actions
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past.pop()!;
        state.future.unshift(state.present);
        state.present = previous;
      }
    },
    
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future.shift()!;
        state.past.push(state.present);
        state.present = next;
      }
    },
    
    clearHistory: (state) => {
      state.past = [];
      state.future = [];
    }
  }
});

export const {
  insertText,
  deleteText,
  setCursor,
  setSelection,
  undo,
  redo,
  clearHistory
} = editorSlice.actions;

export default editorSlice.reducer;
```

**Zustand Undo/Redo Implementation:**

*1. Custom Undo/Redo with Zustand:*
```javascript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UndoableStore<T> {
  past: T[];
  present: T;
  future: T[];
  
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

// Generic undoable store creator
function createUndoableStore<T>(initialState: T, maxHistorySize = 50) {
  return create<UndoableStore<T>>()()
    devtools((set, get) => ({
      past: [],
      present: initialState,
      future: [],
      
      undo: () => {
        const { past, present, future } = get();
        if (past.length > 0) {
          const previous = past[past.length - 1];
          const newPast = past.slice(0, -1);
          
          set({
            past: newPast,
            present: previous,
            future: [present, ...future]
          });
        }
      },
      
      redo: () => {
        const { past, present, future } = get();
        if (future.length > 0) {
          const next = future[0];
          const newFuture = future.slice(1);
          
          set({
            past: [...past, present],
            present: next,
            future: newFuture
          });
        }
      },
      
      clearHistory: () => {
        set({ past: [], future: [] });
      },
      
      canUndo: () => get().past.length > 0,
      canRedo: () => get().future.length > 0
    }), { name: 'UndoableStore' })
  );
}

// Specific implementation for a drawing app
interface DrawingState {
  shapes: Shape[];
  selectedShapeId: string | null;
  tool: 'select' | 'rectangle' | 'circle' | 'line';
}

interface DrawingStore extends UndoableStore<DrawingState> {
  // Actions that should be undoable
  addShape: (shape: Shape) => void;
  updateShape: (id: string, updates: Partial<Shape>) => void;
  deleteShape: (id: string) => void;
  
  // Actions that shouldn't be undoable
  selectShape: (id: string | null) => void;
  setTool: (tool: DrawingState['tool']) => void;
}

const useDrawingStore = create<DrawingStore>()()
  devtools((set, get) => {
    const initialState: DrawingState = {
      shapes: [],
      selectedShapeId: null,
      tool: 'select'
    };
    
    // Helper function to save state to history
    const saveToHistory = () => {
      const { past, present } = get();
      const newPast = [...past, present];
      
      // Limit history size
      if (newPast.length > 50) {
        newPast.shift();
      }
      
      return { past: newPast, future: [] };
    };
    
    return {
      past: [],
      present: initialState,
      future: [],
      
      // Undoable actions
      addShape: (shape) => {
        const historyUpdate = saveToHistory();
        set({
          ...historyUpdate,
          present: {
            ...get().present,
            shapes: [...get().present.shapes, shape]
          }
        });
      },
      
      updateShape: (id, updates) => {
        const historyUpdate = saveToHistory();
        set({
          ...historyUpdate,
          present: {
            ...get().present,
            shapes: get().present.shapes.map(shape =>
              shape.id === id ? { ...shape, ...updates } : shape
            )
          }
        });
      },
      
      deleteShape: (id) => {
        const historyUpdate = saveToHistory();
        set({
          ...historyUpdate,
          present: {
            ...get().present,
            shapes: get().present.shapes.filter(shape => shape.id !== id),
            selectedShapeId: get().present.selectedShapeId === id ? null : get().present.selectedShapeId
          }
        });
      },
      
      // Non-undoable actions
      selectShape: (id) => {
        set({
          present: {
            ...get().present,
            selectedShapeId: id
          }
        });
      },
      
      setTool: (tool) => {
        set({
          present: {
            ...get().present,
            tool
          }
        });
      },
      
      // Undo/Redo functionality
      undo: () => {
        const { past, present, future } = get();
        if (past.length > 0) {
          const previous = past[past.length - 1];
          const newPast = past.slice(0, -1);
          
          set({
            past: newPast,
            present: previous,
            future: [present, ...future]
          });
        }
      },
      
      redo: () => {
        const { past, present, future } = get();
        if (future.length > 0) {
          const next = future[0];
          const newFuture = future.slice(1);
          
          set({
            past: [...past, present],
            present: next,
            future: newFuture
          });
        }
      },
      
      clearHistory: () => {
        set({ past: [], future: [] });
      },
      
      canUndo: () => get().past.length > 0,
      canRedo: () => get().future.length > 0
    };
  }, { name: 'DrawingStore' })
);
```

**Undo/Redo Best Practices:**

1. **Selective History**: Only track undoable actions
2. **Memory Management**: Limit history size to prevent memory leaks
3. **Granular Actions**: Design actions to be meaningful undo units
4. **State Snapshots**: Store complete state snapshots for complex undo operations
5. **User Feedback**: Provide clear indicators for undo/redo availability
6. **Keyboard Shortcuts**: Implement standard Ctrl+Z/Ctrl+Y shortcuts

---

## Q10: How do you implement data persistence and hydration in Redux and Zustand?
**Difficulty: Intermediate**

**Answer:**

Data persistence allows applications to maintain state across browser sessions. Both Redux and Zustand offer solutions for persisting and rehydrating state.

**Redux Persistence Implementation:**

*1. Using Redux-Persist:*
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import sessionStorage from 'redux-persist/lib/storage/session'; // sessionStorage

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'settings'], // Only persist these reducers
  blacklist: ['ui', 'temp'], // Don't persist these reducers
  transforms: [
    // Custom transform to exclude sensitive data
    {
      in: (inboundState: any, key: string) => {
        if (key === 'user') {
          const { password, ...safeState } = inboundState;
          return safeState;
        }
        return inboundState;
      },
      out: (outboundState: any, key: string) => {
        return outboundState;
      }
    }
  ]
};

// Nested persist configuration
const userPersistConfig = {
  key: 'user',
  storage: sessionStorage,
  whitelist: ['profile', 'preferences']
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
  blacklist: ['temporarySettings']
};

// Apply persistence to reducers
const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsSlice.reducer);

const rootReducer = combineReducers({
  user: persistedUserReducer,
  settings: persistedSettingsReducer,
  ui: uiSlice.reducer, // Not persisted
  temp: tempSlice.reducer // Not persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

// App component with PersistGate
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          <Routes>
            {/* Your routes */}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}
```

**Zustand Persistence Implementation:**

*1. Using Zustand Persist Middleware:*
```javascript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  preferences: UserPreferences;
  theme: 'light' | 'dark';
  
  setUser: (user: User | null) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  logout: () => void;
}

// Basic persistence
export const useUserStore = create<UserStore>()()
  devtools(
    persist(
      (set, get) => ({
        user: null,
        preferences: {
          notifications: true,
          language: 'en',
          timezone: 'UTC'
        },
        theme: 'light',
        
        setUser: (user) => set({ user }),
        
        updatePreferences: (newPreferences) => set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        })),
        
        setTheme: (theme) => set({ theme }),
        
        logout: () => set({ user: null })
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          preferences: state.preferences,
          theme: state.theme
        })
      }
    ),
    { name: 'UserStore' }
  )
);

// Advanced persistence with custom storage
interface ShoppingCartStore {
  items: CartItem[];
  total: number;
  
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Custom storage implementation
const customStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      // Could be IndexedDB, AsyncStorage, etc.
      const value = localStorage.getItem(name);
      return value;
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error('Error removing item from storage:', error);
    }
  }
};

export const useShoppingCartStore = create<ShoppingCartStore>()()
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          };
        }
        return { items: [...state.items, item] };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      })),
      
      clearCart: () => set({ items: [], total: 0 })
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => customStorage),
      
      // Custom serialization
      serialize: (state) => {
        return JSON.stringify({
          ...state,
          timestamp: Date.now()
        });
      },
      
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        const { timestamp, ...state } = parsed;
        
        // Check if data is too old (e.g., 7 days)
        const isExpired = Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000;
        
        if (isExpired) {
          return { items: [], total: 0 };
        }
        
        return state;
      },
      
      // Migration for version changes
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migrate from version 0 to 1
          return {
            ...persistedState,
            total: 0 // Add new field
          };
        }
        return persistedState;
      }
    }
  )
);
```

**Persistence Best Practices:**

1. **Selective Persistence**: Only persist necessary data
2. **Data Validation**: Validate persisted data on rehydration
3. **Version Management**: Handle schema migrations gracefully
4. **Error Handling**: Gracefully handle storage failures
5. **Security**: Never persist sensitive data like passwords
6. **Performance**: Consider storage size and serialization cost
7. **Expiration**: Implement data expiration for temporary data