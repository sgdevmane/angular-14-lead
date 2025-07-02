# Redux + Zustand Interview Questions & Answers

## Table of Contents
1. [Redux Fundamentals](#redux-fundamentals)
2. [Redux Toolkit (RTK)](#redux-toolkit-rtk)
3. [Redux Middleware & Async](#redux-middleware--async)
4. [Zustand Fundamentals](#zustand-fundamentals)
5. [Advanced Zustand Patterns](#advanced-zustand-patterns)
6. [Redux vs Zustand Comparison](#redux-vs-zustand-comparison)
7. [Performance & Best Practices](#performance--best-practices)

---

## Redux Fundamentals

### 1. What is Redux and what are its core principles?

**Answer:**
Redux is a predictable state container for JavaScript applications, following three core principles:

**Core Principles:**
1. **Single Source of Truth**: The entire application state is stored in a single store
2. **State is Read-Only**: State can only be changed by dispatching actions
3. **Changes are Made with Pure Functions**: Reducers are pure functions that specify how state changes

```javascript
// Basic Redux setup
import { createStore } from 'redux'

// Action Types
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const SET_COUNT = 'SET_COUNT'

// Action Creators
export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
export const setCount = (count) => ({ type: SET_COUNT, payload: count })

// Initial State
const initialState = {
  count: 0,
  history: [],
  lastUpdated: null
}

// Reducer (Pure Function)
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, 'increment'],
        lastUpdated: new Date().toISOString()
      }
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, 'decrement'],
        lastUpdated: new Date().toISOString()
      }
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
        history: [...state.history, `set to ${action.payload}`],
        lastUpdated: new Date().toISOString()
      }
    default:
      return state
  }
}

// Store
const store = createStore(counterReducer)

// Usage
store.dispatch(increment()) // { count: 1, history: ['increment'], lastUpdated: '...' }
store.dispatch(setCount(10)) // { count: 10, history: ['increment', 'set to 10'], lastUpdated: '...' }
console.log(store.getState())
```

### 2. How do you handle complex state with multiple reducers?

**Answer:**
Use `combineReducers` to split state management into smaller, focused reducers.

```javascript
import { combineReducers, createStore } from 'redux'

// User Reducer
const userInitialState = {
  currentUser: null,
  isAuthenticated: false,
  profile: null,
  preferences: {
    theme: 'light',
    language: 'en'
  }
}

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: true,
        profile: action.payload.profile
      }
    case 'USER_LOGOUT':
      return {
        ...userInitialState
      }
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      }
    default:
      return state
  }
}

// Posts Reducer
const postsInitialState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
}

function postsReducer(state = postsInitialState, action) {
  switch (action.type) {
    case 'FETCH_POSTS_START':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.posts,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination
        }
      }
    case 'FETCH_POSTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case 'ADD_POST':
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
    case 'UPDATE_POST':
      return {
        ...state,
        items: state.items.map(post =>
          post.id === action.payload.id
            ? { ...post, ...action.payload.updates }
            : post
        )
      }
    case 'DELETE_POST':
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.payload.id)
      }
    default:
      return state
  }
}

// UI Reducer
const uiInitialState = {
  sidebarOpen: false,
  modals: {
    createPost: false,
    editProfile: false,
    confirmDelete: false
  },
  notifications: [],
  theme: 'light'
}

function uiReducer(state = uiInitialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modalName]: true
        }
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modalName]: false
        }
      }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            ...action.payload
          }
        ]
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload.id
        )
      }
    default:
      return state
  }
}

// Combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  ui: uiReducer
})

// Store
const store = createStore(rootReducer)

// Selectors
export const selectUser = (state) => state.user.currentUser
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export const selectPosts = (state) => state.posts.items
export const selectPostsLoading = (state) => state.posts.loading
export const selectSidebarOpen = (state) => state.ui.sidebarOpen
export const selectNotifications = (state) => state.ui.notifications

// Action Creators
export const loginSuccess = (user, profile) => ({
  type: 'USER_LOGIN_SUCCESS',
  payload: { user, profile }
})

export const logout = () => ({ type: 'USER_LOGOUT' })

export const fetchPostsStart = () => ({ type: 'FETCH_POSTS_START' })
export const fetchPostsSuccess = (posts, pagination) => ({
  type: 'FETCH_POSTS_SUCCESS',
  payload: { posts, pagination }
})

export const addNotification = (message, type = 'info') => ({
  type: 'ADD_NOTIFICATION',
  payload: { message, type, timestamp: new Date().toISOString() }
})
```

---

## Redux Toolkit (RTK)

### 3. How does Redux Toolkit simplify Redux development?

**Answer:**
Redux Toolkit (RTK) provides utilities to simplify common Redux patterns and reduce boilerplate code.

```javascript
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'

// Async Thunk for API calls
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts?page=${page}&limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      if (!response.ok) {
        throw new Error('Failed to create post')
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Posts Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    },
    filters: {
      category: 'all',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }
  },
  reducers: {
    // Synchronous actions
    updatePost: (state, action) => {
      const { id, updates } = action.payload
      const existingPost = state.items.find(post => post.id === id)
      if (existingPost) {
        Object.assign(existingPost, updates)
      }
    },
    deletePost: (state, action) => {
      state.items = state.items.filter(post => post.id !== action.payload)
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
    resetPosts: (state) => {
      state.items = []
      state.pagination = {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.posts
        state.pagination = action.payload.pagination
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.items.unshift(action.payload)
        state.pagination.total += 1
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

// User Slice with authentication
const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated: false,
    profile: null,
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: true
    },
    loading: false,
    error: null
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload.user
      state.profile = action.payload.profile
      state.isAuthenticated = true
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    logout: (state) => {
      state.currentUser = null
      state.profile = null
      state.isAuthenticated = false
      state.preferences = {
        theme: 'light',
        language: 'en',
        notifications: true
      }
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    updateProfile: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      }
    }
  }
})

// Configure Store
const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

// Export actions
export const { updatePost, deletePost, setFilters, clearError, resetPosts } = postsSlice.actions
export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updatePreferences, 
  updateProfile 
} = userSlice.actions

// Selectors
export const selectPosts = (state) => state.posts.items
export const selectPostsLoading = (state) => state.posts.loading
export const selectPostsError = (state) => state.posts.error
export const selectPostsPagination = (state) => state.posts.pagination
export const selectPostsFilters = (state) => state.posts.filters

export const selectCurrentUser = (state) => state.user.currentUser
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export const selectUserPreferences = (state) => state.user.preferences

// Memoized selectors
import { createSelector } from '@reduxjs/toolkit'

export const selectFilteredPosts = createSelector(
  [selectPosts, selectPostsFilters],
  (posts, filters) => {
    let filtered = posts

    if (filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      )
    }

    // Sort posts
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy]
      const bValue = b[filters.sortBy]
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }
)

export default store
```

### 4. How do you handle async operations with RTK Query?

**Answer:**
RTK Query provides powerful data fetching and caching capabilities built on top of Redux Toolkit.

```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Post', 'User', 'Comment'],
  endpoints: (builder) => ({
    // Posts endpoints
    getPosts: builder.query({
      query: ({ page = 1, limit = 10, category, search } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(category && { category }),
          ...(search && { search })
        })
        return `posts?${params}`
      },
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: 'Post', id })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }]
    }),
    
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }]
    }),
    
    createPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    
    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
    }),
    
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' }
      ]
    }),
    
    // Comments endpoints
    getComments: builder.query({
      query: (postId) => `posts/${postId}/comments`,
      providesTags: (result, error, postId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment', id })),
              { type: 'Comment', id: `LIST-${postId}` }
            ]
          : [{ type: 'Comment', id: `LIST-${postId}` }]
    }),
    
    addComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        body: { content }
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Comment', id: `LIST-${postId}` }
      ]
    }),
    
    // User endpoints
    getProfile: builder.query({
      query: () => 'user/profile',
      providesTags: ['User']
    }),
    
    updateProfile: builder.mutation({
      query: (updates) => ({
        url: 'user/profile',
        method: 'PATCH',
        body: updates
      }),
      invalidatesTags: ['User']
    })
  })
})

// Export hooks for usage in components
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useGetProfileQuery,
  useUpdateProfileMutation
} = apiSlice

// Usage in components
import React, { useState } from 'react'
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation
} from './apiSlice'

function PostsList() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ category: '', search: '' })
  
  const {
    data: postsData,
    error,
    isLoading,
    isFetching,
    refetch
  } = useGetPostsQuery({ page, ...filters })
  
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [deletePost] = useDeletePostMutation()
  
  const handleCreatePost = async (postData) => {
    try {
      await createPost(postData).unwrap()
      // Post created successfully
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }
  
  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deletePost(id).unwrap()
        // Post deleted successfully
      } catch (error) {
        console.error('Failed to delete post:', error)
      }
    }
  }
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2"
        >
          <option value="">All Categories</option>
          <option value="tech">Technology</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
        <button onClick={refetch} className="ml-2 px-4 py-2 bg-blue-500 text-white">
          Refresh
        </button>
      </div>
      
      {isFetching && <div>Updating...</div>}
      
      <div className="grid gap-4">
        {postsData?.posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-600">{post.excerpt}</p>
            <div className="mt-2">
              <button
                onClick={() => handleDeletePost(post.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!postsData?.pagination.hasNext}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PostsList
```

---

## Redux Middleware & Async

### 5. How do you create custom middleware in Redux?

**Answer:**
Middleware provides a way to extend Redux with custom functionality for logging, crash reporting, async actions, etc.

```javascript
// Custom logging middleware
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(`Action: ${action.type}`)
  console.log('Previous State:', store.getState())
  console.log('Action:', action)
  
  const result = next(action)
  
  console.log('Next State:', store.getState())
  console.groupEnd()
  
  return result
}

// Performance monitoring middleware
const performanceMiddleware = (store) => (next) => (action) => {
  const start = performance.now()
  
  const result = next(action)
  
  const end = performance.now()
  const duration = end - start
  
  if (duration > 10) { // Log slow actions
    console.warn(`Slow action detected: ${action.type} took ${duration.toFixed(2)}ms`)
  }
  
  return result
}

// Error handling middleware
const errorMiddleware = (store) => (next) => (action) => {
  try {
    return next(action)
  } catch (error) {
    console.error('Redux Error:', error)
    
    // Send error to monitoring service
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        extra: {
          action,
          state: store.getState()
        }
      })
    }
    
    // Dispatch error action
    store.dispatch({
      type: 'GLOBAL_ERROR',
      payload: {
        message: error.message,
        stack: error.stack,
        action
      }
    })
    
    throw error
  }
}

// API middleware for handling async actions
const apiMiddleware = (store) => (next) => (action) => {
  // Pass through non-API actions
  if (!action.meta || !action.meta.api) {
    return next(action)
  }
  
  const { endpoint, method = 'GET', body, headers = {} } = action.meta.api
  const { type } = action
  
  // Dispatch loading action
  store.dispatch({ type: `${type}_PENDING` })
  
  // Make API call
  return fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...(body && { body: JSON.stringify(body) })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .then(data => {
      // Dispatch success action
      store.dispatch({
        type: `${type}_FULFILLED`,
        payload: data
      })
      return data
    })
    .catch(error => {
      // Dispatch error action
      store.dispatch({
        type: `${type}_REJECTED`,
        payload: error.message,
        error: true
      })
      throw error
    })
}

// Debounce middleware for search actions
const debounceMiddleware = (store) => {
  const debounceTimers = new Map()
  
  return (next) => (action) => {
    if (action.meta && action.meta.debounce) {
      const { delay = 300, key = action.type } = action.meta.debounce
      
      // Clear existing timer
      if (debounceTimers.has(key)) {
        clearTimeout(debounceTimers.get(key))
      }
      
      // Set new timer
      const timer = setTimeout(() => {
        debounceTimers.delete(key)
        next(action)
      }, delay)
      
      debounceTimers.set(key, timer)
      
      return
    }
    
    return next(action)
  }
}

// Local storage persistence middleware
const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  
  // Persist specific state slices
  const stateToPersist = {
    user: store.getState().user,
    preferences: store.getState().preferences
  }
  
  try {
    localStorage.setItem('reduxState', JSON.stringify(stateToPersist))
  } catch (error) {
    console.warn('Failed to persist state:', error)
  }
  
  return result
}

// Configure store with middleware
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
      .concat(
        loggerMiddleware,
        performanceMiddleware,
        errorMiddleware,
        apiMiddleware,
        debounceMiddleware,
        persistenceMiddleware
      )
})

// Usage examples

// API action
const fetchUsers = () => ({
  type: 'FETCH_USERS',
  meta: {
    api: {
      endpoint: '/api/users',
      method: 'GET'
    }
  }
})

// Debounced search action
const searchPosts = (query) => ({
  type: 'SEARCH_POSTS',
  payload: query,
  meta: {
    debounce: {
      delay: 500,
      key: 'search'
    }
  }
})

// Usage in component
function SearchComponent() {
  const dispatch = useDispatch()
  
  const handleSearch = (query) => {
    dispatch(searchPosts(query))
  }
  
  const handleFetchUsers = () => {
    dispatch(fetchUsers())
  }
  
  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search posts..."
      />
      <button onClick={handleFetchUsers}>
        Fetch Users
      </button>
    </div>
  )
}
```

---

## Zustand Fundamentals

### 6. What is Zustand and how does it differ from Redux?

**Answer:**
Zustand is a lightweight state management library that provides a simpler alternative to Redux with less boilerplate and better TypeScript support.

**Key Differences:**
- **Less Boilerplate**: No actions, reducers, or providers needed
- **Simpler API**: Direct state mutations allowed
- **Better TypeScript**: Built-in TypeScript support
- **Smaller Bundle**: Much smaller than Redux
- **No Context**: Doesn't use React Context, avoiding re-render issues

```javascript
import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Basic Zustand store
const useCounterStore = create((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (value) => set((state) => ({ count: state.count + value })),
  // Computed values
  get doubled() {
    return get().count * 2
  },
  get isEven() {
    return get().count % 2 === 0
  }
}))

// Complex store with multiple slices
const useAppStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          // User slice
          user: {
            currentUser: null,
            isAuthenticated: false,
            preferences: {
              theme: 'light',
              language: 'en'
            }
          },
          
          // Posts slice
          posts: {
            items: [],
            loading: false,
            error: null,
            filters: {
              category: 'all',
              search: ''
            }
          },
          
          // UI slice
          ui: {
            sidebarOpen: false,
            modals: {
              createPost: false,
              editProfile: false
            },
            notifications: []
          },
          
          // User actions
          login: (user) => set((state) => {
            state.user.currentUser = user
            state.user.isAuthenticated = true
          }),
          
          logout: () => set((state) => {
            state.user.currentUser = null
            state.user.isAuthenticated = false
            state.user.preferences = {
              theme: 'light',
              language: 'en'
            }
          }),
          
          updatePreferences: (preferences) => set((state) => {
            Object.assign(state.user.preferences, preferences)
          }),
          
          // Posts actions
          setPosts: (posts) => set((state) => {
            state.posts.items = posts
            state.posts.loading = false
            state.posts.error = null
          }),
          
          addPost: (post) => set((state) => {
            state.posts.items.unshift(post)
          }),
          
          updatePost: (id, updates) => set((state) => {
            const post = state.posts.items.find(p => p.id === id)
            if (post) {
              Object.assign(post, updates)
            }
          }),
          
          deletePost: (id) => set((state) => {
            state.posts.items = state.posts.items.filter(p => p.id !== id)
          }),
          
          setPostsLoading: (loading) => set((state) => {
            state.posts.loading = loading
          }),
          
          setPostsError: (error) => set((state) => {
            state.posts.error = error
            state.posts.loading = false
          }),
          
          setPostsFilters: (filters) => set((state) => {
            Object.assign(state.posts.filters, filters)
          }),
          
          // Async actions
          fetchPosts: async () => {
            const { setPostsLoading, setPosts, setPostsError } = get()
            
            setPostsLoading(true)
            try {
              const response = await fetch('/api/posts')
              if (!response.ok) throw new Error('Failed to fetch posts')
              const posts = await response.json()
              setPosts(posts)
            } catch (error) {
              setPostsError(error.message)
            }
          },
          
          createPost: async (postData) => {
            const { addPost, setPostsError } = get()
            
            try {
              const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
              })
              if (!response.ok) throw new Error('Failed to create post')
              const newPost = await response.json()
              addPost(newPost)
              return newPost
            } catch (error) {
              setPostsError(error.message)
              throw error
            }
          },
          
          // UI actions
          toggleSidebar: () => set((state) => {
            state.ui.sidebarOpen = !state.ui.sidebarOpen
          }),
          
          openModal: (modalName) => set((state) => {
            state.ui.modals[modalName] = true
          }),
          
          closeModal: (modalName) => set((state) => {
            state.ui.modals[modalName] = false
          }),
          
          addNotification: (notification) => set((state) => {
            state.ui.notifications.push({
              id: Date.now(),
              timestamp: new Date().toISOString(),
              ...notification
            })
          }),
          
          removeNotification: (id) => set((state) => {
            state.ui.notifications = state.ui.notifications.filter(
              n => n.id !== id
            )
          }),
          
          // Computed selectors
          get filteredPosts() {
            const { posts } = get()
            let filtered = posts.items
            
            if (posts.filters.category !== 'all') {
              filtered = filtered.filter(post => post.category === posts.filters.category)
            }
            
            if (posts.filters.search) {
              const search = posts.filters.search.toLowerCase()
              filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(search) ||
                post.content.toLowerCase().includes(search)
              )
            }
            
            return filtered
          }
        }))
      ),
      {
        name: 'app-storage',
        partialize: (state) => ({
          user: {
            preferences: state.user.preferences
          }
        })
      }
    ),
    {
      name: 'app-store'
    }
  )
)

// Usage in components
function Counter() {
  const { count, increment, decrement, reset, doubled, isEven } = useCounterStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <p>Is Even: {isEven ? 'Yes' : 'No'}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

function PostsList() {
  const {
    posts,
    filteredPosts,
    fetchPosts,
    deletePost,
    setPostsFilters
  } = useAppStore()
  
  useEffect(() => {
    fetchPosts()
  }, [])
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        onChange={(e) => setPostsFilters({ search: e.target.value })}
      />
      
      {posts.loading && <div>Loading...</div>}
      {posts.error && <div>Error: {posts.error}</div>}
      
      <div>
        {filteredPosts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Selective subscriptions to avoid unnecessary re-renders
function UserProfile() {
  const user = useAppStore(state => state.user.currentUser)
  const updatePreferences = useAppStore(state => state.updatePreferences)
  
  // This component only re-renders when user.currentUser changes
  return (
    <div>
      <h2>{user?.name}</h2>
      <button onClick={() => updatePreferences({ theme: 'dark' })}>
        Switch to Dark Theme
      </button>
    </div>
  )
}

export { useCounterStore, useAppStore }
```

### 7. How do you implement middleware and persistence in Zustand?

**Answer:**
Zustand provides several built-in middleware for common patterns like persistence, devtools, and subscriptions.

```javascript
import { create } from 'zustand'
import {
  devtools,
  persist,
  subscribeWithSelector,
  createJSONStorage
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Custom middleware for logging
const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('Previous state:', get())
      set(...args)
      console.log('New state:', get())
    },
    get,
    api
  )

// Custom middleware for error handling
const errorHandler = (config) => (set, get, api) => {
  const wrappedSet = (...args) => {
    try {
      set(...args)
    } catch (error) {
      console.error('State update error:', error)
      // You could dispatch to an error store here
      api.setState({ error: error.message })
    }
  }
  
  return config(wrappedSet, get, api)
}

// Store with multiple middleware
const useAdvancedStore = create(
  logger(
    errorHandler(
      devtools(
        persist(
          subscribeWithSelector(
            immer((set, get) => ({
              // State
              user: null,
              posts: [],
              settings: {
                theme: 'light',
                notifications: true,
                autoSave: false
              },
              error: null,
              
              // Actions
              setUser: (user) => set((state) => {
                state.user = user
                state.error = null
              }),
              
              addPost: (post) => set((state) => {
                state.posts.push({
                  ...post,
                  id: Date.now(),
                  createdAt: new Date().toISOString()
                })
              }),
              
              updateSettings: (newSettings) => set((state) => {
                Object.assign(state.settings, newSettings)
              }),
              
              clearError: () => set((state) => {
                state.error = null
              })
            }))
          ),
          {
            name: 'advanced-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
              settings: state.settings,
              user: state.user ? { id: state.user.id, name: state.user.name } : null
            }),
            onRehydrateStorage: () => (state) => {
              console.log('Hydration finished', state)
            }
          }
        ),
        {
          name: 'advanced-store'
        }
      )
    )
  )
)

// Custom storage implementation
const customStorage = {
  getItem: async (name) => {
    try {
      const value = localStorage.getItem(name)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('Failed to get item from storage:', error)
      return null
    }
  },
  setItem: async (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to set item in storage:', error)
    }
  },
  removeItem: async (name) => {
    try {
      localStorage.removeItem(name)
    } catch (error) {
      console.error('Failed to remove item from storage:', error)
    }
  }
}

// Store with custom storage
const useCustomStorageStore = create(
  persist(
    (set, get) => ({
      data: [],
      addData: (item) => set((state) => ({ data: [...state.data, item] })),
      clearData: () => set({ data: [] })
    }),
    {
      name: 'custom-storage',
      storage: createJSONStorage(() => customStorage)
    }
  )
)

// Subscription example
const useSubscriptionStore = create(
  subscribeWithSelector((set, get) => ({
    count: 0,
    user: null,
    increment: () => set((state) => ({ count: state.count + 1 })),
    setUser: (user) => set({ user })
  }))
)

// Subscribe to specific state changes
useSubscriptionStore.subscribe(
  (state) => state.count,
  (count, previousCount) => {
    console.log('Count changed from', previousCount, 'to', count)
    
    // Trigger side effects
    if (count > 10) {
      console.log('Count exceeded 10!')
    }
  }
)

// Subscribe to user changes
useSubscriptionStore.subscribe(
  (state) => state.user,
  (user, previousUser) => {
    if (user && !previousUser) {
      console.log('User logged in:', user)
      // Track login event
    } else if (!user && previousUser) {
      console.log('User logged out')
      // Track logout event
    }
  }
)

// Async middleware for API calls
const asyncMiddleware = (config) => (set, get, api) => {
  const asyncActions = {
    async fetchUser(id) {
      set({ loading: true, error: null })
      try {
        const response = await fetch(`/api/users/${id}`)
        if (!response.ok) throw new Error('Failed to fetch user')
        const user = await response.json()
        set({ user, loading: false })
        return user
      } catch (error) {
        set({ error: error.message, loading: false })
        throw error
      }
    },
    
    async saveData(data) {
      set({ saving: true })
      try {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('Failed to save data')
        set({ saving: false, lastSaved: new Date().toISOString() })
      } catch (error) {
        set({ saving: false, error: error.message })
        throw error
      }
    }
  }
  
  return {
    ...config(set, get, api),
    ...asyncActions
  }
}

// Store with async middleware
const useAsyncStore = create(
  asyncMiddleware((set, get) => ({
    user: null,
    loading: false,
    saving: false,
    error: null,
    lastSaved: null,
    
    clearError: () => set({ error: null })
  }))
)

// Usage in components
function AsyncComponent() {
  const {
    user,
    loading,
    error,
    fetchUser,
    saveData,
    clearError
  } = useAsyncStore()
  
  const handleFetchUser = async () => {
    try {
      await fetchUser(123)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          Error: {error}
          <button onClick={clearError}>Clear</button>
        </div>
      )}
      {user && <div>User: {user.name}</div>}
      <button onClick={handleFetchUser}>Fetch User</button>
    </div>
  )
}

export {
  useAdvancedStore,
  useCustomStorageStore,
  useSubscriptionStore,
  useAsyncStore
}
```

---

## Advanced Zustand Patterns

### 8. How do you implement complex state patterns with Zustand?

**Answer:**
Zustand supports advanced patterns like slices, computed values, and state machines for complex applications.

```javascript
import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Slice pattern for modular state management
const createUserSlice = (set, get) => ({
  user: {
    currentUser: null,
    profile: null,
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: true
    },
    isAuthenticated: false,
    loading: false,
    error: null
  },
  
  // User actions
  loginUser: async (credentials) => {
    set((state) => {
      state.user.loading = true
      state.user.error = null
    })
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      if (!response.ok) throw new Error('Login failed')
      
      const { user, profile } = await response.json()
      
      set((state) => {
        state.user.currentUser = user
        state.user.profile = profile
        state.user.isAuthenticated = true
        state.user.loading = false
      })
      
      return user
    } catch (error) {
      set((state) => {
        state.user.error = error.message
        state.user.loading = false
      })
      throw error
    }
  },
  
  logoutUser: () => set((state) => {
    state.user.currentUser = null
    state.user.profile = null
    state.user.isAuthenticated = false
    state.user.preferences = {
      theme: 'light',
      language: 'en',
      notifications: true
    }
  }),
  
  updateUserPreferences: (preferences) => set((state) => {
    Object.assign(state.user.preferences, preferences)
  }),
  
  updateUserProfile: (updates) => set((state) => {
    if (state.user.profile) {
      Object.assign(state.user.profile, updates)
    }
  })
})

const createPostsSlice = (set, get) => ({
  posts: {
    items: [],
    categories: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      hasNext: false
    },
    filters: {
      category: 'all',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    },
    cache: new Map()
  },
  
  // Posts actions
  fetchPosts: async (options = {}) => {
    const { posts } = get()
    const params = { ...posts.filters, ...options }
    const cacheKey = JSON.stringify(params)
    
    // Check cache first
    if (posts.cache.has(cacheKey)) {
      const cachedData = posts.cache.get(cacheKey)
      set((state) => {
        state.posts.items = cachedData.items
        state.posts.pagination = cachedData.pagination
      })
      return
    }
    
    set((state) => {
      state.posts.loading = true
      state.posts.error = null
    })
    
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`/api/posts?${queryParams}`)
      
      if (!response.ok) throw new Error('Failed to fetch posts')
      
      const data = await response.json()
      
      set((state) => {
        state.posts.items = data.posts
        state.posts.pagination = data.pagination
        state.posts.loading = false
        
        // Cache the result
        state.posts.cache.set(cacheKey, {
          items: data.posts,
          pagination: data.pagination,
          timestamp: Date.now()
        })
      })
    } catch (error) {
      set((state) => {
        state.posts.error = error.message
        state.posts.loading = false
      })
    }
  },
  
  createPost: async (postData) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      
      if (!response.ok) throw new Error('Failed to create post')
      
      const newPost = await response.json()
      
      set((state) => {
        state.posts.items.unshift(newPost)
        state.posts.cache.clear() // Invalidate cache
      })
      
      return newPost
    } catch (error) {
      set((state) => {
        state.posts.error = error.message
      })
      throw error
    }
  },
  
  updatePost: async (id, updates) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) throw new Error('Failed to update post')
      
      const updatedPost = await response.json()
      
      set((state) => {
        const index = state.posts.items.findIndex(p => p.id === id)
        if (index !== -1) {
          state.posts.items[index] = updatedPost
        }
        state.posts.cache.clear() // Invalidate cache
      })
      
      return updatedPost
    } catch (error) {
      set((state) => {
        state.posts.error = error.message
      })
      throw error
    }
  },
  
  deletePost: async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete post')
      
      set((state) => {
        state.posts.items = state.posts.items.filter(p => p.id !== id)
        state.posts.cache.clear() // Invalidate cache
      })
    } catch (error) {
      set((state) => {
        state.posts.error = error.message
      })
      throw error
    }
  },
  
  setPostsFilters: (filters) => set((state) => {
    Object.assign(state.posts.filters, filters)
  }),
  
  clearPostsCache: () => set((state) => {
    state.posts.cache.clear()
  })
})

const createUISlice = (set, get) => ({
  ui: {
    theme: 'light',
    sidebarOpen: false,
    modals: {
      createPost: false,
      editProfile: false,
      confirmDelete: false
    },
    notifications: [],
    loading: {
      global: false,
      posts: false,
      user: false
    },
    errors: []
  },
  
  // UI actions
  setTheme: (theme) => set((state) => {
    state.ui.theme = theme
  }),
  
  toggleSidebar: () => set((state) => {
    state.ui.sidebarOpen = !state.ui.sidebarOpen
  }),
  
  openModal: (modalName) => set((state) => {
    state.ui.modals[modalName] = true
  }),
  
  closeModal: (modalName) => set((state) => {
    state.ui.modals[modalName] = false
  }),
  
  addNotification: (notification) => set((state) => {
    state.ui.notifications.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type: 'info',
      autoClose: true,
      duration: 5000,
      ...notification
    })
  }),
  
  removeNotification: (id) => set((state) => {
    state.ui.notifications = state.ui.notifications.filter(n => n.id !== id)
  }),
  
  setLoading: (key, loading) => set((state) => {
    state.ui.loading[key] = loading
  }),
  
  addError: (error) => set((state) => {
    state.ui.errors.push({
      id: Date.now(),
      message: error.message || error,
      timestamp: new Date().toISOString()
    })
  }),
  
  removeError: (id) => set((state) => {
    state.ui.errors = state.ui.errors.filter(e => e.id !== id)
  })
})

// Computed values slice
const createComputedSlice = (set, get) => ({
  // Computed getters
  get filteredPosts() {
    const { posts } = get()
    let filtered = posts.items
    
    if (posts.filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === posts.filters.category)
    }
    
    if (posts.filters.search) {
      const search = posts.filters.search.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search)
      )
    }
    
    // Sort posts
    filtered.sort((a, b) => {
      const aValue = a[posts.filters.sortBy]
      const bValue = b[posts.filters.sortBy]
      
      if (posts.filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
    
    return filtered
  },
  
  get userStats() {
    const { user, posts } = get()
    if (!user.currentUser) return null
    
    const userPosts = posts.items.filter(post => post.authorId === user.currentUser.id)
    
    return {
      totalPosts: userPosts.length,
      totalViews: userPosts.reduce((sum, post) => sum + (post.views || 0), 0),
      totalLikes: userPosts.reduce((sum, post) => sum + (post.likes || 0), 0),
      averageViews: userPosts.length > 0 ? 
        userPosts.reduce((sum, post) => sum + (post.views || 0), 0) / userPosts.length : 0
    }
  },
  
  get isLoading() {
    const { ui, user, posts } = get()
    return ui.loading.global || user.loading || posts.loading
  }
})

// Main store combining all slices
const useAppStore = create(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        ...createUserSlice(set, get),
        ...createPostsSlice(set, get),
        ...createUISlice(set, get),
        ...createComputedSlice(set, get)
      }))
    ),
    { name: 'app-store' }
  )
)

// State machine pattern for complex workflows
const createStateMachine = (initialState, transitions) => {
  return create((set, get) => ({
    currentState: initialState,
    context: {},
    
    transition: (event, payload = {}) => {
      const { currentState } = get()
      const stateConfig = transitions[currentState]
      
      if (!stateConfig || !stateConfig[event]) {
        console.warn(`Invalid transition: ${event} from ${currentState}`)
        return false
      }
      
      const transition = stateConfig[event]
      const nextState = typeof transition.target === 'function' 
        ? transition.target(get().context, payload)
        : transition.target
      
      set((state) => {
        state.currentState = nextState
        
        // Update context if action provided
        if (transition.action) {
          state.context = transition.action(state.context, payload)
        }
      })
      
      return true
    },
    
    can: (event) => {
      const { currentState } = get()
      const stateConfig = transitions[currentState]
      return stateConfig && stateConfig[event]
    },
    
    is: (state) => get().currentState === state
  }))
}

// Example: Post creation workflow state machine
const usePostCreationMachine = createStateMachine('idle', {
  idle: {
    START_CREATION: {
      target: 'editing',
      action: (context, payload) => ({
        ...context,
        draft: { title: '', content: '', category: '' }
      })
    }
  },
  editing: {
    UPDATE_DRAFT: {
      target: 'editing',
      action: (context, payload) => ({
        ...context,
        draft: { ...context.draft, ...payload }
      })
    },
    VALIDATE: {
      target: (context) => {
        const { title, content } = context.draft
        return title && content ? 'valid' : 'invalid'
      }
    },
    CANCEL: {
      target: 'idle',
      action: () => ({})
    }
  },
  valid: {
    SUBMIT: {
      target: 'submitting',
      action: (context) => ({ ...context, submittedAt: new Date().toISOString() })
    },
    EDIT: {
      target: 'editing'
    }
  },
  invalid: {
    EDIT: {
      target: 'editing'
    }
  },
  submitting: {
    SUCCESS: {
      target: 'success',
      action: (context, payload) => ({ ...context, result: payload })
    },
    ERROR: {
      target: 'error',
      action: (context, payload) => ({ ...context, error: payload })
    }
  },
  success: {
    RESET: {
      target: 'idle',
      action: () => ({})
    }
  },
  error: {
    RETRY: {
      target: 'submitting'
    },
    EDIT: {
      target: 'editing'
    },
    CANCEL: {
      target: 'idle',
      action: () => ({})
    }
  }
})

export {
  useAppStore,
  usePostCreationMachine,
  createStateMachine
}
```

---

## Redux vs Zustand Comparison

### 9. When should you choose Redux over Zustand and vice versa?

**Answer:**
The choice between Redux and Zustand depends on project requirements, team preferences, and application complexity.

**Choose Redux when:**
- Large, complex applications with many developers
- Need for time-travel debugging and extensive DevTools
- Strict patterns and predictability are required
- Heavy use of middleware ecosystem
- Team is already familiar with Redux patterns

**Choose Zustand when:**
- Smaller to medium-sized applications
- Want minimal boilerplate and faster development
- TypeScript-first development
- Need flexible state management without strict patterns
- Bundle size is a concern

```javascript
// Redux approach - More verbose but structured
// actions/userActions.js
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const loginRequest = () => ({ type: LOGIN_REQUEST })
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user })
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error })

export const login = (credentials) => async (dispatch) => {
  dispatch(loginRequest())
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    const user = await response.json()
    dispatch(loginSuccess(user))
  } catch (error) {
    dispatch(loginFailure(error.message))
  }
}

// reducers/userReducer.js
const initialState = {
  user: null,
  loading: false,
  error: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null }
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload }
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

// store.js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})

// Component usage
import { useSelector, useDispatch } from 'react-redux'
import { login } from './actions/userActions'

function LoginComponent() {
  const { user, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const handleLogin = (credentials) => {
    dispatch(login(credentials))
  }
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {user && <div>Welcome, {user.name}!</div>}
    </div>
  )
}

// Zustand approach - More concise and direct
import { create } from 'zustand'

const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  
  login: async (credentials) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const user = await response.json()
      set({ loading: false, user })
    } catch (error) {
      set({ loading: false, error: error.message })
    }
  },
  
  logout: () => set({ user: null, error: null })
}))

// Component usage
function LoginComponent() {
  const { user, loading, error, login } = useUserStore()
  
  const handleLogin = (credentials) => {
    login(credentials)
  }
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {user && <div>Welcome, {user.name}!</div>}
    </div>
  )
}
```

### 10. How do you migrate from Redux to Zustand?

**Answer:**
Migrating from Redux to Zustand can be done incrementally by replacing Redux slices with Zustand stores.

```javascript
// Step 1: Create equivalent Zustand stores for Redux slices

// Original Redux slice
// userSlice.js (Redux Toolkit)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}`)
    return response.json()
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { logout, clearError } = userSlice.actions
export default userSlice.reducer

// Equivalent Zustand store
// userStore.js (Zustand)
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useUserStore = create(
  devtools(
    (set, get) => ({
      currentUser: null,
      loading: false,
      error: null,
      
      fetchUser: async (userId) => {
        set({ loading: true, error: null })
        try {
          const response = await fetch(`/api/users/${userId}`)
          const user = await response.json()
          set({ loading: false, currentUser: user })
        } catch (error) {
          set({ loading: false, error: error.message })
        }
      },
      
      logout: () => set({ currentUser: null }),
      
      clearError: () => set({ error: null })
    }),
    { name: 'user-store' }
  )
)

// Step 2: Create a migration adapter for gradual transition
// migrationAdapter.js
import { useSelector, useDispatch } from 'react-redux'
import { useUserStore } from './userStore'
import { fetchUser, logout, clearError } from './userSlice'

// Adapter hook that provides the same interface as Redux
export const useUserMigration = (useZustand = false) => {
  const reduxUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const zustandUser = useUserStore()
  
  if (useZustand) {
    return {
      currentUser: zustandUser.currentUser,
      loading: zustandUser.loading,
      error: zustandUser.error,
      fetchUser: zustandUser.fetchUser,
      logout: zustandUser.logout,
      clearError: zustandUser.clearError
    }
  }
  
  return {
    currentUser: reduxUser.currentUser,
    loading: reduxUser.loading,
    error: reduxUser.error,
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError())
  }
}

// Step 3: Update components gradually
// UserProfile.js - Before migration
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, logout } from './userSlice'

function UserProfile({ userId }) {
  const { currentUser, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [userId, dispatch])
  
  const handleLogout = () => {
    dispatch(logout())
  }
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {currentUser && (
        <div>
          <h2>{currentUser.name}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

// UserProfile.js - During migration (using adapter)
import { useUserMigration } from './migrationAdapter'

function UserProfile({ userId }) {
  // Toggle this flag to switch between Redux and Zustand
  const useZustand = process.env.REACT_APP_USE_ZUSTAND === 'true'
  const { currentUser, loading, error, fetchUser, logout } = useUserMigration(useZustand)
  
  useEffect(() => {
    fetchUser(userId)
  }, [userId, fetchUser])
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {currentUser && (
        <div>
          <h2>{currentUser.name}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  )
}

// UserProfile.js - After migration (pure Zustand)
import { useUserStore } from './userStore'

function UserProfile({ userId }) {
  const { currentUser, loading, error, fetchUser, logout } = useUserStore()
  
  useEffect(() => {
    fetchUser(userId)
  }, [userId, fetchUser])
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {currentUser && (
        <div>
          <h2>{currentUser.name}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  )
}

// Step 4: Migration utilities
// migrationUtils.js
export const createMigrationStore = (reduxSlice, zustandStore) => {
  return {
    // Sync Redux state to Zustand
    syncToZustand: (reduxState) => {
      zustandStore.setState(reduxState)
    },
    
    // Sync Zustand state to Redux
    syncToRedux: (dispatch) => {
      const zustandState = zustandStore.getState()
      dispatch(reduxSlice.actions.setState(zustandState))
    },
    
    // Compare states for debugging
    compareStates: (reduxState) => {
      const zustandState = zustandStore.getState()
      console.log('Redux state:', reduxState)
      console.log('Zustand state:', zustandState)
      console.log('States match:', JSON.stringify(reduxState) === JSON.stringify(zustandState))
    }
  }
}

// Step 5: Testing utilities
// testUtils.js
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store'
import { useUserStore } from './userStore'

// Test both Redux and Zustand implementations
export const testBothImplementations = (testFn) => {
  describe('Redux implementation', () => {
    testFn('redux')
  })
  
  describe('Zustand implementation', () => {
    testFn('zustand')
  })
}

// Example test
testBothImplementations((implementation) => {
  it('should handle user login', async () => {
    if (implementation === 'redux') {
      // Test Redux implementation
      const wrapper = ({ children }) => (
        <Provider store={store}>{children}</Provider>
      )
      
      const { result } = renderHook(() => useSelector(state => state.user), { wrapper })
      // ... Redux-specific test logic
    } else {
      // Test Zustand implementation
      const { result } = renderHook(() => useUserStore())
      // ... Zustand-specific test logic
    }
  })
})
```

---

## Performance & Best Practices

### 11. How do you optimize performance in Redux and Zustand?

**Answer:**
Both Redux and Zustand offer different approaches to performance optimization.

**Redux Performance Optimization:**

```javascript
import { createSelector } from '@reduxjs/toolkit'
import { shallowEqual, useSelector } from 'react-redux'
import { memo, useMemo, useCallback } from 'react'

// 1. Use memoized selectors
const selectPosts = (state) => state.posts.items
const selectFilters = (state) => state.posts.filters

const selectFilteredPosts = createSelector(
  [selectPosts, selectFilters],
  (posts, filters) => {
    console.log('Recomputing filtered posts') // Only logs when inputs change
    
    let filtered = posts
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category)
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower)
      )
    }
    
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
)

// 2. Use shallow equality for object selections
function PostsList() {
  const { posts, loading, error } = useSelector(
    state => ({
      posts: selectFilteredPosts(state),
      loading: state.posts.loading,
      error: state.posts.error
    }),
    shallowEqual // Prevents re-renders when object shape is the same
  )
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

// 3. Memoize components
const PostItem = memo(({ post, onDelete, onEdit }) => {
  const handleDelete = useCallback(() => {
    onDelete(post.id)
  }, [post.id, onDelete])
  
  const handleEdit = useCallback(() => {
    onEdit(post)
  }, [post, onEdit])
  
  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
})

// 4. Normalize state structure
const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    loading: false,
    error: null
  }),
  reducers: {
    addPost: postsAdapter.addOne,
    updatePost: postsAdapter.updateOne,
    removePost: postsAdapter.removeOne,
    setPosts: postsAdapter.setAll
  }
})

// Optimized selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

// 5. Use RTK Query for automatic caching
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => `posts?${new URLSearchParams(params)}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post', id })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }],
      // Cache for 60 seconds
      keepUnusedDataFor: 60
    })
  })
})
```

**Zustand Performance Optimization:**

```javascript
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { memo, useMemo } from 'react'

// 1. Use selective subscriptions
const useAppStore = create(
  subscribeWithSelector((set, get) => ({
    posts: [],
    filters: { category: 'all', search: '' },
    user: null,
    ui: { theme: 'light', sidebarOpen: false },
    
    setPosts: (posts) => set({ posts }),
    setFilters: (filters) => set((state) => ({ 
      filters: { ...state.filters, ...filters } 
    })),
    setUser: (user) => set({ user }),
    toggleSidebar: () => set((state) => ({ 
      ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } 
    }))
  }))
)

// 2. Selective subscriptions to prevent unnecessary re-renders
function PostsList() {
  // Only re-render when posts or filters change
  const { posts, filters } = useAppStore(
    (state) => ({ posts: state.posts, filters: state.filters }),
    shallow
  )
  
  const filteredPosts = useMemo(() => {
    let filtered = posts
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category)
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower)
      )
    }
    
    return filtered
  }, [posts, filters])
  
  return (
    <div>
      {filteredPosts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

// 3. Use specific selectors for individual values
function UserProfile() {
  // Only re-render when user changes, not when other state changes
  const user = useAppStore(state => state.user)
  const setUser = useAppStore(state => state.setUser)
  
  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>Not logged in</div>
      )}
    </div>
  )
}

// 4. Optimize with computed values
const useOptimizedStore = create((set, get) => ({
  items: [],
  filters: { search: '', category: 'all' },
  
  // Computed getter - only recalculates when accessed
  get filteredItems() {
    const { items, filters } = get()
    console.log('Computing filtered items') // Only logs when accessed
    
    return items.filter(item => {
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false
      }
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      return true
    })
  },
  
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  }))
}))

// 5. Use subscriptions for side effects
const useStoreWithEffects = create(
  subscribeWithSelector((set, get) => ({
    user: null,
    posts: [],
    analytics: { pageViews: 0, userActions: 0 },
    
    setUser: (user) => set({ user }),
    addPost: (post) => set((state) => ({ 
      posts: [...state.posts, post],
      analytics: { 
        ...state.analytics, 
        userActions: state.analytics.userActions + 1 
      }
    })),
    incrementPageViews: () => set((state) => ({
      analytics: { 
        ...state.analytics, 
        pageViews: state.analytics.pageViews + 1 
      }
    }))
  }))
)

// Subscribe to user changes for analytics
useStoreWithEffects.subscribe(
  (state) => state.user,
  (user, previousUser) => {
    if (user && !previousUser) {
      // User logged in
      console.log('User logged in, tracking event')
      // Track login event
    }
  }
)

// 6. Memoized components with Zustand
const OptimizedPostItem = memo(({ postId }) => {
  // Only subscribe to the specific post
  const post = useAppStore(state => 
    state.posts.find(p => p.id === postId)
  )
  
  const updatePost = useAppStore(state => state.updatePost)
  
  if (!post) return null
  
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={() => updatePost(postId, { views: post.views + 1 })}>
        View ({post.views})
      </button>
    </div>
  )
})

// 7. Batch updates for better performance
const useBatchedStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,
  
  fetchItems: async () => {
    // Batch multiple state updates
    set({ loading: true, error: null })
    
    try {
      const response = await fetch('/api/items')
      const items = await response.json()
      
      // Single state update instead of multiple
      set({ 
        items, 
        loading: false, 
        error: null 
      })
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      })
    }
  },
  
  bulkUpdateItems: (updates) => {
    set((state) => ({
      items: state.items.map(item => {
        const update = updates.find(u => u.id === item.id)
        return update ? { ...item, ...update } : item
      })
    }))
  }
}))

export {
  useAppStore,
  useOptimizedStore,
  useStoreWithEffects,
  useBatchedStore
}
```

### 12. What are the best practices for testing Redux and Zustand stores?

**Answer:**
Testing state management requires different approaches for Redux and Zustand, focusing on actions, state changes, and component integration.

**Redux Testing:**

```javascript
// Redux testing with Jest and React Testing Library
import { configureStore } from '@reduxjs/toolkit'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import userSlice, { loginUser, logout } from './userSlice'

// Test reducer directly
describe('userSlice reducer', () => {
  const initialState = {
    currentUser: null,
    loading: false,
    error: null
  }
  
  it('should handle initial state', () => {
    expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })
  
  it('should handle logout', () => {
    const previousState = {
      currentUser: { id: 1, name: 'John' },
      loading: false,
      error: null
    }
    
    expect(userSlice.reducer(previousState, logout())).toEqual(initialState)
  })
})

// Test async thunks
describe('loginUser async thunk', () => {
  let store
  
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userSlice.reducer
      }
    })
    
    // Mock fetch
    global.fetch = jest.fn()
  })
  
  afterEach(() => {
    jest.resetAllMocks()
  })
  
  it('should handle successful login', async () => {
    const mockUser = { id: 1, name: 'John', email: 'john@example.com' }
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    })
    
    await store.dispatch(loginUser({ email: 'john@example.com', password: 'password' }))
    
    const state = store.getState().user
    expect(state.currentUser).toEqual(mockUser)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })
  
  it('should handle login failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Login failed'))
    
    await store.dispatch(loginUser({ email: 'john@example.com', password: 'wrong' }))
    
    const state = store.getState().user
    expect(state.currentUser).toBe(null)
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Login failed')
  })
})

// Test component integration
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'

const renderWithProvider = (component, initialState = {}) => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer
    },
    preloadedState: initialState
  })
  
  return {
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    ),
    store
  }
}

describe('LoginForm component', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })
  
  it('should display loading state during login', async () => {
    fetch.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: 'John' })
      }), 100)
    }))
    
    renderWithProvider(<LoginForm />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    
    expect(screen.getByText(/logging in/i)).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.queryByText(/logging in/i)).not.toBeInTheDocument()
    })
  })
})
```

**Zustand Testing:**

```javascript
// Zustand testing
import { renderHook, act } from '@testing-library/react'
import { useUserStore } from './userStore'

// Test store directly
describe('useUserStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useUserStore.setState({
      currentUser: null,
      loading: false,
      error: null
    })
    
    global.fetch = jest.fn()
  })
  
  afterEach(() => {
    jest.resetAllMocks()
  })
  
  it('should have initial state', () => {
    const { result } = renderHook(() => useUserStore())
    
    expect(result.current.currentUser).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })
  
  it('should handle logout', () => {
    const { result } = renderHook(() => useUserStore())
    
    // Set initial user
    act(() => {
      useUserStore.setState({ currentUser: { id: 1, name: 'John' } })
    })
    
    expect(result.current.currentUser).toEqual({ id: 1, name: 'John' })
    
    // Logout
    act(() => {
      result.current.logout()
    })
    
    expect(result.current.currentUser).toBe(null)
  })
  
  it('should handle successful login', async () => {
    const mockUser = { id: 1, name: 'John', email: 'john@example.com' }
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    })
    
    const { result } = renderHook(() => useUserStore())
    
    await act(async () => {
      await result.current.login({ email: 'john@example.com', password: 'password' })
    })
    
    expect(result.current.currentUser).toEqual(mockUser)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })
  
  it('should handle login failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Login failed'))
    
    const { result } = renderHook(() => useUserStore())
    
    await act(async () => {
      try {
        await result.current.login({ email: 'john@example.com', password: 'wrong' })
      } catch (error) {
        // Expected to throw
      }
    })
    
    expect(result.current.currentUser).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe('Login failed')
  })
})

// Test store subscriptions
describe('useUserStore subscriptions', () => {
  it('should notify subscribers of state changes', () => {
    const subscriber = jest.fn()
    
    const unsubscribe = useUserStore.subscribe(subscriber)
    
    act(() => {
      useUserStore.setState({ currentUser: { id: 1, name: 'John' } })
    })
    
    expect(subscriber).toHaveBeenCalledWith(
      expect.objectContaining({
        currentUser: { id: 1, name: 'John' }
      }),
      expect.objectContaining({
        currentUser: null
      })
    )
    
    unsubscribe()
  })
})

// Test component integration with Zustand
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('LoginForm with Zustand', () => {
  beforeEach(() => {
    // Reset store
    useUserStore.setState({
      currentUser: null,
      loading: false,
      error: null
    })
    
    global.fetch = jest.fn()
  })
  
  it('should display user after successful login', async () => {
    const mockUser = { id: 1, name: 'John' }
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    })
    
    render(<LoginForm />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/welcome, john/i)).toBeInTheDocument()
    })
  })
})

// Test utilities for Zustand
export const createTestStore = (initialState = {}) => {
  const store = useUserStore
  store.setState(initialState)
  return store
}

export const mockStoreActions = () => {
  const originalLogin = useUserStore.getState().login
  const originalLogout = useUserStore.getState().logout
  
  const mockLogin = jest.fn()
  const mockLogout = jest.fn()
  
  useUserStore.setState({
    login: mockLogin,
    logout: mockLogout
  })
  
  return {
    mockLogin,
    mockLogout,
    restore: () => {
      useUserStore.setState({
        login: originalLogin,
        logout: originalLogout
      })
    }
  }
}

// Integration test helper
export const testStoreIntegration = (Component, initialState = {}) => {
  beforeEach(() => {
    useUserStore.setState({
      currentUser: null,
      loading: false,
      error: null,
      ...initialState
    })
  })
  
  return render(<Component />)
}
```

These examples demonstrate comprehensive testing strategies for both Redux and Zustand, covering unit tests, integration tests, and testing utilities.