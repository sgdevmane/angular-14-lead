# Vue.js Interview Questions

## Table of Contents
1. [Vue.js Fundamentals](#vuejs-fundamentals)
2. [Components and Templates](#components-and-templates)
3. [Reactivity System](#reactivity-system)
4. [Composition API](#composition-api)
5. [State Management](#state-management)
6. [Vue Router](#vue-router)
7. [Performance Optimization](#performance-optimization)
8. [Advanced Vue Patterns](#advanced-vue-patterns)

---

## Vue.js Fundamentals

### Q1: What is Vue.js and what are its key features?
**Difficulty: Easy**

**Answer:**
Vue.js is a progressive JavaScript framework for building user interfaces. It's designed to be incrementally adoptable, meaning you can use as much or as little of Vue as you need in your project.

**Key Features:**

1. **Progressive Framework**: Can be adopted incrementally, from a simple script tag to a full SPA
2. **Reactive Data Binding**: Automatic UI updates when data changes
3. **Component-Based Architecture**: Reusable, encapsulated components
4. **Virtual DOM**: Efficient rendering and updates
5. **Template Syntax**: Declarative rendering with familiar HTML-based templates
6. **Directives**: Special attributes that apply reactive behavior to DOM elements
7. **Single File Components**: HTML, CSS, and JavaScript in one file
8. **Composition API**: Advanced reactivity and logic composition

```vue
<!-- Simple Vue Component Example -->
<template>
  <div class="user-profile">
    <img :src="user.avatar" :alt="user.name" />
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <button @click="toggleEdit" :disabled="loading">
      {{ isEditing ? 'Save' : 'Edit' }}
    </button>
    
    <form v-if="isEditing" @submit.prevent="saveUser">
      <input v-model="editForm.name" placeholder="Name" required />
      <input v-model="editForm.email" type="email" placeholder="Email" required />
      <button type="submit" :disabled="!isFormValid">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'

export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['user-updated'],
  setup(props, { emit }) {
    const isEditing = ref(false)
    const loading = ref(false)
    
    const editForm = reactive({
      name: props.user.name,
      email: props.user.email
    })
    
    const isFormValid = computed(() => {
      return editForm.name.trim() && editForm.email.trim() && 
             editForm.email.includes('@')
    })
    
    const toggleEdit = () => {
      if (isEditing.value) {
        saveUser()
      } else {
        isEditing.value = true
        editForm.name = props.user.name
        editForm.email = props.user.email
      }
    }
    
    const saveUser = async () => {
      if (!isFormValid.value) return
      
      loading.value = true
      try {
        const updatedUser = {
          ...props.user,
          name: editForm.name,
          email: editForm.email
        }
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        emit('user-updated', updatedUser)
        isEditing.value = false
      } catch (error) {
        console.error('Failed to update user:', error)
      } finally {
        loading.value = false
      }
    }
    
    return {
      isEditing,
      loading,
      editForm,
      isFormValid,
      toggleEdit,
      saveUser
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.user-profile img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile form {
  margin-top: 15px;
}

.user-profile input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-profile button {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.user-profile button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
```

**Benefits:**
- **Easy Learning Curve**: Familiar template syntax and gradual adoption
- **Excellent Performance**: Optimized virtual DOM and reactivity system
- **Rich Ecosystem**: Vue Router, Vuex/Pinia, Vue CLI, Nuxt.js
- **Developer Experience**: Excellent tooling, debugging, and documentation
- **Flexibility**: Can be used for simple widgets or complex SPAs

---

### Q2: Explain the difference between Options API and Composition API.
**Difficulty: Medium**

**Answer:**
Vue 3 introduced the Composition API as an alternative to the traditional Options API, providing better logic composition and TypeScript support.

**Options API (Vue 2 style, still supported in Vue 3):**
Organizes component logic into option properties like `data`, `methods`, `computed`, etc.

```vue
<template>
  <div class="todo-app">
    <h1>Todo List ({{ completedCount }}/{{ todos.length }})</h1>
    
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add a todo..." />
      <button type="submit" :disabled="!newTodo.trim()">Add</button>
    </form>
    
    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter"
        @click="currentFilter = filter"
        :class="{ active: currentFilter === filter }"
      >
        {{ filter }}
      </button>
    </div>
    
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input 
          type="checkbox" 
          v-model="todo.completed"
          @change="updateTodo(todo)"
        />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoApp',
  data() {
    return {
      todos: [],
      newTodo: '',
      currentFilter: 'All',
      filters: ['All', 'Active', 'Completed']
    }
  },
  computed: {
    filteredTodos() {
      switch (this.currentFilter) {
        case 'Active':
          return this.todos.filter(todo => !todo.completed)
        case 'Completed':
          return this.todos.filter(todo => todo.completed)
        default:
          return this.todos
      }
    },
    completedCount() {
      return this.todos.filter(todo => todo.completed).length
    }
  },
  methods: {
    addTodo() {
      if (!this.newTodo.trim()) return
      
      const todo = {
        id: Date.now(),
        text: this.newTodo.trim(),
        completed: false,
        createdAt: new Date()
      }
      
      this.todos.push(todo)
      this.newTodo = ''
      this.saveTodos()
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.saveTodos()
    },
    updateTodo(todo) {
      // Todo is already updated by v-model
      this.saveTodos()
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    loadTodos() {
      const saved = localStorage.getItem('todos')
      if (saved) {
        this.todos = JSON.parse(saved)
      }
    }
  },
  mounted() {
    this.loadTodos()
  },
  watch: {
    todos: {
      handler() {
        this.saveTodos()
      },
      deep: true
    }
  }
}
</script>
```

**Composition API (Vue 3 recommended approach):**
Organizes logic by feature using composable functions.

```vue
<template>
  <div class="todo-app">
    <h1>Todo List ({{ completedCount }}/{{ todos.length }})</h1>
    
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add a todo..." />
      <button type="submit" :disabled="!newTodo.trim()">Add</button>
    </form>
    
    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter"
        @click="currentFilter = filter"
        :class="{ active: currentFilter === filter }"
      >
        {{ filter }}
      </button>
    </div>
    
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input 
          type="checkbox" 
          v-model="todo.completed"
          @change="updateTodo(todo)"
        />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useTodos } from '@/composables/useTodos'
import { useLocalStorage } from '@/composables/useLocalStorage'

export default {
  name: 'TodoApp',
  setup() {
    // Todo management logic
    const {
      todos,
      newTodo,
      addTodo,
      deleteTodo,
      updateTodo
    } = useTodos()
    
    // Filter logic
    const currentFilter = ref('All')
    const filters = ['All', 'Active', 'Completed']
    
    const filteredTodos = computed(() => {
      switch (currentFilter.value) {
        case 'Active':
          return todos.value.filter(todo => !todo.completed)
        case 'Completed':
          return todos.value.filter(todo => todo.completed)
        default:
          return todos.value
      }
    })
    
    const completedCount = computed(() => {
      return todos.value.filter(todo => todo.completed).length
    })
    
    // Local storage persistence
    const { save, load } = useLocalStorage('todos')
    
    // Save todos when they change
    watch(todos, (newTodos) => {
      save(newTodos)
    }, { deep: true })
    
    // Load todos on mount
    onMounted(() => {
      const savedTodos = load()
      if (savedTodos) {
        todos.value = savedTodos
      }
    })
    
    return {
      todos,
      newTodo,
      currentFilter,
      filters,
      filteredTodos,
      completedCount,
      addTodo,
      deleteTodo,
      updateTodo
    }
  }
}
</script>
```

**Composable Functions (Reusable Logic):**

```javascript
// composables/useTodos.js
import { ref } from 'vue'

export function useTodos() {
  const todos = ref([])
  const newTodo = ref('')
  
  const addTodo = () => {
    if (!newTodo.value.trim()) return
    
    const todo = {
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false,
      createdAt: new Date()
    }
    
    todos.value.push(todo)
    newTodo.value = ''
  }
  
  const deleteTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }
  
  const updateTodo = (updatedTodo) => {
    const index = todos.value.findIndex(todo => todo.id === updatedTodo.id)
    if (index > -1) {
      todos.value[index] = updatedTodo
    }
  }
  
  const toggleTodo = (id) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
  
  return {
    todos,
    newTodo,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo
  }
}

// composables/useLocalStorage.js
export function useLocalStorage(key) {
  const save = (data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(`Error saving to localStorage:`, error)
    }
  }
  
  const load = () => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error loading from localStorage:`, error)
      return null
    }
  }
  
  const remove = () => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing from localStorage:`, error)
    }
  }
  
  return { save, load, remove }
}
```

**Key Differences:**

| Aspect | Options API | Composition API |
|--------|-------------|----------------|
| **Organization** | By option type (data, methods, etc.) | By feature/logic |
| **Reusability** | Mixins (can cause conflicts) | Composable functions |
| **TypeScript** | Limited support | Excellent support |
| **Logic Sharing** | Difficult between components | Easy with composables |
| **Bundle Size** | Larger (all options included) | Smaller (tree-shakable) |
| **Learning Curve** | Easier for beginners | Requires understanding of reactivity |
| **Code Splitting** | By component | By feature |

**When to Use:**
- **Options API**: Simple components, team familiar with Vue 2, rapid prototyping
- **Composition API**: Complex logic, TypeScript projects, reusable logic, large applications

**Advanced Composition API Example:**

```vue
<template>
  <div class="user-dashboard">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <UserProfile :user="user" @update="updateUser" />
      <UserStats :stats="userStats" />
      <RecentActivity :activities="recentActivities" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useUser } from '@/composables/useUser'
import { useUserStats } from '@/composables/useUserStats'
import { useRecentActivity } from '@/composables/useRecentActivity'
import UserProfile from '@/components/UserProfile.vue'
import UserStats from '@/components/UserStats.vue'
import RecentActivity from '@/components/RecentActivity.vue'

export default {
  name: 'UserDashboard',
  components: {
    UserProfile,
    UserStats,
    RecentActivity
  },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // User data management
    const {
      user,
      loading: userLoading,
      error: userError,
      updateUser,
      refreshUser
    } = useUser(props.userId)
    
    // User statistics
    const {
      stats: userStats,
      loading: statsLoading
    } = useUserStats(props.userId)
    
    // Recent activity
    const {
      activities: recentActivities,
      loading: activitiesLoading
    } = useRecentActivity(props.userId)
    
    // Combined loading state
    const loading = computed(() => {
      return userLoading.value || statsLoading.value || activitiesLoading.value
    })
    
    // Combined error state
    const error = computed(() => {
      return userError.value
    })
    
    return {
      user,
      userStats,
      recentActivities,
      loading,
      error,
      updateUser
    }
  }
}
</script>
```

**Best Practices:**
- Use Composition API for new Vue 3 projects
- Create small, focused composable functions
- Use TypeScript with Composition API for better DX
- Keep Options API for simple components or Vue 2 migration
- Don't mix both APIs in the same component
- Use `<script setup>` syntax for even cleaner code

---

### Q3: What are Vue directives and how do you create custom directives?
**Difficulty: Medium**

**Answer:**
Vue directives are special attributes with the `v-` prefix that apply reactive behavior to DOM elements. They can manipulate the DOM, handle events, and bind data.

**Built-in Directives:**

```vue
<template>
  <div class="directive-examples">
    <!-- v-if/v-else-if/v-else: Conditional rendering -->
    <div v-if="user.role === 'admin'" class="admin-panel">
      Admin Panel
    </div>
    <div v-else-if="user.role === 'moderator'" class="mod-panel">
      Moderator Panel
    </div>
    <div v-else class="user-panel">
      User Panel
    </div>
    
    <!-- v-show: Toggle visibility (CSS display) -->
    <div v-show="showDetails" class="details">
      User details here...
    </div>
    
    <!-- v-for: List rendering -->
    <ul>
      <li 
        v-for="(item, index) in items" 
        :key="item.id"
        :class="{ active: item.active }"
      >
        {{ index + 1 }}. {{ item.name }} - {{ item.status }}
      </li>
    </ul>
    
    <!-- v-model: Two-way data binding -->
    <form @submit.prevent="submitForm">
      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.email" type="email" placeholder="Email" />
      <textarea v-model="form.message" placeholder="Message"></textarea>
      
      <select v-model="form.category">
        <option value="">Select category</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
      
      <label>
        <input type="checkbox" v-model="form.subscribe" />
        Subscribe to newsletter
      </label>
      
      <div>
        <label v-for="option in radioOptions" :key="option.value">
          <input 
            type="radio" 
            :value="option.value" 
            v-model="form.priority"
          />
          {{ option.label }}
        </label>
      </div>
    </form>
    
    <!-- v-bind: Attribute binding (shorthand :) -->
    <img 
      :src="user.avatar" 
      :alt="user.name"
      :class="{ rounded: roundedAvatar, large: largeAvatar }"
      :style="{ width: avatarSize + 'px', height: avatarSize + 'px' }"
    />
    
    <!-- v-on: Event handling (shorthand @) -->
    <button 
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @keydown.enter="handleEnterKey"
      @keydown.esc="handleEscapeKey"
    >
      Interactive Button
    </button>
    
    <!-- v-slot: Slot content -->
    <CustomCard>
      <template v-slot:header>
        <h3>Card Title</h3>
      </template>
      
      <template v-slot:default>
        <p>Card content goes here</p>
      </template>
      
      <template v-slot:footer="{ actions }">
        <button 
          v-for="action in actions" 
          :key="action.name"
          @click="action.handler"
        >
          {{ action.label }}
        </button>
      </template>
    </CustomCard>
    
    <!-- v-text and v-html -->
    <p v-text="plainTextContent"></p>
    <div v-html="htmlContent"></div>
    
    <!-- v-once: Render only once -->
    <div v-once>
      {{ expensiveCalculation() }}
    </div>
    
    <!-- v-pre: Skip compilation -->
    <span v-pre>{{ this will not be compiled }}</span>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import CustomCard from '@/components/CustomCard.vue'

export default {
  name: 'DirectiveExamples',
  components: {
    CustomCard
  },
  setup() {
    const user = reactive({
      role: 'admin',
      name: 'John Doe',
      avatar: '/avatars/john.jpg'
    })
    
    const showDetails = ref(false)
    const roundedAvatar = ref(true)
    const largeAvatar = ref(false)
    const avatarSize = ref(80)
    
    const items = ref([
      { id: 1, name: 'Item 1', status: 'active', active: true },
      { id: 2, name: 'Item 2', status: 'inactive', active: false },
      { id: 3, name: 'Item 3', status: 'pending', active: false }
    ])
    
    const form = reactive({
      name: '',
      email: '',
      message: '',
      category: '',
      subscribe: false,
      priority: 'medium'
    })
    
    const categories = ref([
      { id: 'tech', name: 'Technology' },
      { id: 'business', name: 'Business' },
      { id: 'personal', name: 'Personal' }
    ])
    
    const radioOptions = [
      { value: 'low', label: 'Low Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'high', label: 'High Priority' }
    ]
    
    const plainTextContent = ref('This is plain text')
    const htmlContent = ref('<strong>This is HTML content</strong>')
    
    const expensiveCalculation = () => {
      console.log('Expensive calculation running...')
      return 'Calculated result'
    }
    
    const handleClick = (event) => {
      console.log('Button clicked:', event)
    }
    
    const handleMouseEnter = () => {
      console.log('Mouse entered')
    }
    
    const handleMouseLeave = () => {
      console.log('Mouse left')
    }
    
    const handleEnterKey = () => {
      console.log('Enter key pressed')
    }
    
    const handleEscapeKey = () => {
      console.log('Escape key pressed')
    }
    
    const submitForm = () => {
      console.log('Form submitted:', form)
    }
    
    return {
      user,
      showDetails,
      roundedAvatar,
      largeAvatar,
      avatarSize,
      items,
      form,
      categories,
      radioOptions,
      plainTextContent,
      htmlContent,
      expensiveCalculation,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleEnterKey,
      handleEscapeKey,
      submitForm
    }
  }
}
</script>
```

**Custom Directives:**

Custom directives allow you to create reusable DOM manipulation logic.

**1. Global Custom Directives:**

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Focus directive
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// Click outside directive
app.directive('click-outside', {
  mounted(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
})

// Tooltip directive
app.directive('tooltip', {
  mounted(el, binding) {
    const tooltip = document.createElement('div')
    tooltip.textContent = binding.value
    tooltip.className = 'tooltip'
    tooltip.style.cssText = `
      position: absolute;
      background: #333;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1000;
    `
    
    document.body.appendChild(tooltip)
    
    el.addEventListener('mouseenter', () => {
      const rect = el.getBoundingClientRect()
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px'
      tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px'
      tooltip.style.opacity = '1'
    })
    
    el.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0'
    })
    
    el._tooltip = tooltip
  },
  updated(el, binding) {
    el._tooltip.textContent = binding.value
  },
  unmounted(el) {
    if (el._tooltip) {
      document.body.removeChild(el._tooltip)
    }
  }
})

// Lazy loading directive
app.directive('lazy', {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.src = binding.value
          observer.unobserve(el)
        }
      })
    })
    
    observer.observe(el)
    el._observer = observer
  },
  unmounted(el) {
    if (el._observer) {
      el._observer.disconnect()
    }
  }
})

app.mount('#app')
```

**2. Local Custom Directives:**

```vue
<template>
  <div class="custom-directive-demo">
    <!-- Auto-focus input -->
    <input v-focus placeholder="This input will be focused" />
    
    <!-- Click outside to close dropdown -->
    <div class="dropdown" v-click-outside="closeDropdown">
      <button @click="toggleDropdown">Toggle Dropdown</button>
      <ul v-show="isDropdownOpen" class="dropdown-menu">
        <li v-for="item in dropdownItems" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>
    
    <!-- Tooltip -->
    <button v-tooltip="'This is a helpful tooltip'">Hover for tooltip</button>
    
    <!-- Lazy loaded images -->
    <div class="image-gallery">
      <img 
        v-for="image in images" 
        :key="image.id"
        v-lazy="image.src"
        :alt="image.alt"
        class="lazy-image"
      />
    </div>
    
    <!-- Custom animation directive -->
    <div v-animate="{ animation: 'fadeIn', duration: 1000 }" class="animated-content">
      This content will fade in
    </div>
    
    <!-- Permission-based visibility -->
    <button v-permission="'admin'" @click="adminAction">Admin Only</button>
    <button v-permission="['admin', 'moderator']" @click="modAction">Admin/Mod Only</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CustomDirectiveDemo',
  directives: {
    // Local focus directive
    focus: {
      mounted(el) {
        el.focus()
      }
    },
    
    // Local click outside directive
    clickOutside: {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value()
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    },
    
    // Animation directive
    animate: {
      mounted(el, binding) {
        const { animation, duration = 500, delay = 0 } = binding.value
        
        el.style.animationName = animation
        el.style.animationDuration = duration + 'ms'
        el.style.animationDelay = delay + 'ms'
        el.style.animationFillMode = 'both'
      }
    },
    
    // Permission directive
    permission: {
      mounted(el, binding) {
        const userRole = 'user' // This would come from your auth system
        const requiredRoles = Array.isArray(binding.value) ? binding.value : [binding.value]
        
        if (!requiredRoles.includes(userRole)) {
          el.style.display = 'none'
          // Or remove the element entirely:
          // el.parentNode?.removeChild(el)
        }
      }
    }
  },
  setup() {
    const isDropdownOpen = ref(false)
    const dropdownItems = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ])
    
    const images = ref([
      { id: 1, src: '/images/image1.jpg', alt: 'Image 1' },
      { id: 2, src: '/images/image2.jpg', alt: 'Image 2' },
      { id: 3, src: '/images/image3.jpg', alt: 'Image 3' }
    ])
    
    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }
    
    const closeDropdown = () => {
      isDropdownOpen.value = false
    }
    
    const adminAction = () => {
      console.log('Admin action performed')
    }
    
    const modAction = () => {
      console.log('Moderator action performed')
    }
    
    return {
      isDropdownOpen,
      dropdownItems,
      images,
      toggleDropdown,
      closeDropdown,
      adminAction,
      modAction
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 150px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.dropdown-menu li {
  padding: 10px 15px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background: #f5f5f5;
}

.lazy-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin: 10px;
  background: #f0f0f0;
}

.animated-content {
  padding: 20px;
  background: #e3f2fd;
  border-radius: 4px;
  margin: 20px 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
```

**Advanced Custom Directive Example:**

```javascript
// directives/resizable.js
export const resizable = {
  mounted(el, binding) {
    const options = {
      minWidth: 100,
      minHeight: 100,
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
      handles: ['se'], // southeast corner
      ...binding.value
    }
    
    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    
    options.handles.forEach(handle => {
      const resizeHandle = document.createElement('div')
      resizeHandle.className = `resize-handle resize-${handle}`
      
      // Style the handle
      Object.assign(resizeHandle.style, {
        position: 'absolute',
        width: '10px',
        height: '10px',
        background: '#007bff',
        cursor: getResizeCursor(handle)
      })
      
      // Position the handle
      positionHandle(resizeHandle, handle)
      
      // Add resize functionality
      let isResizing = false
      let startX, startY, startWidth, startHeight
      
      resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true
        startX = e.clientX
        startY = e.clientY
        startWidth = parseInt(document.defaultView.getComputedStyle(el).width, 10)
        startHeight = parseInt(document.defaultView.getComputedStyle(el).height, 10)
        
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        e.preventDefault()
      })
      
      function handleMouseMove(e) {
        if (!isResizing) return
        
        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY
        
        let newWidth = startWidth
        let newHeight = startHeight
        
        if (handle.includes('e')) newWidth = startWidth + deltaX
        if (handle.includes('w')) newWidth = startWidth - deltaX
        if (handle.includes('s')) newHeight = startHeight + deltaY
        if (handle.includes('n')) newHeight = startHeight - deltaY
        
        // Apply constraints
        newWidth = Math.max(options.minWidth, Math.min(options.maxWidth, newWidth))
        newHeight = Math.max(options.minHeight, Math.min(options.maxHeight, newHeight))
        
        el.style.width = newWidth + 'px'
        el.style.height = newHeight + 'px'
        
        // Emit resize event
        if (binding.modifiers.emit && typeof binding.value.onResize === 'function') {
          binding.value.onResize({ width: newWidth, height: newHeight })
        }
      }
      
      function handleMouseUp() {
        isResizing = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      el.appendChild(resizeHandle)
    })
    
    function getResizeCursor(handle) {
      const cursors = {
        'n': 'n-resize',
        'ne': 'ne-resize',
        'e': 'e-resize',
        'se': 'se-resize',
        's': 's-resize',
        'sw': 'sw-resize',
        'w': 'w-resize',
        'nw': 'nw-resize'
      }
      return cursors[handle] || 'default'
    }
    
    function positionHandle(handle, position) {
      const positions = {
        'n': { top: '0', left: '50%', transform: 'translateX(-50%)' },
        'ne': { top: '0', right: '0' },
        'e': { top: '50%', right: '0', transform: 'translateY(-50%)' },
        'se': { bottom: '0', right: '0' },
        's': { bottom: '0', left: '50%', transform: 'translateX(-50%)' },
        'sw': { bottom: '0', left: '0' },
        'w': { top: '50%', left: '0', transform: 'translateY(-50%)' },
        'nw': { top: '0', left: '0' }
      }
      
      Object.assign(handle.style, positions[position])
    }
  },
  
  unmounted(el) {
    // Clean up resize handles
    const handles = el.querySelectorAll('.resize-handle')
    handles.forEach(handle => handle.remove())
  }
}
```

**Directive Lifecycle Hooks:**

```javascript
const myDirective = {
  // Called before bound element's attributes or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    console.log('Directive created')
  },
  
  // Called right before the element is inserted into the DOM
  beforeMount(el, binding, vnode, prevVnode) {
    console.log('Before mount')
  },
  
  // Called when the bound element's parent component and all its children are mounted
  mounted(el, binding, vnode, prevVnode) {
    console.log('Directive mounted')
  },
  
  // Called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {
    console.log('Before update')
  },
  
  // Called after the parent component and all of its children have updated
  updated(el, binding, vnode, prevVnode) {
    console.log('Directive updated')
  },
  
  // Called before the parent component is unmounted
  beforeUnmount(el, binding, vnode, prevVnode) {
    console.log('Before unmount')
  },
  
  // Called when the parent component is unmounted
  unmounted(el, binding, vnode, prevVnode) {
    console.log('Directive unmounted')
  }
}
```

**Best Practices:**
- Use directives for DOM manipulation, not business logic
- Always clean up event listeners and observers in unmounted hook
- Make directives reusable and configurable
- Use modifiers and arguments for flexibility
- Consider performance implications
- Test directives thoroughly across different browsers
- Document directive usage and options clearly

---

This comprehensive guide covers Vue.js fundamentals with detailed explanations and practical examples, focusing on real-world usage patterns and best practices.