# Vue.js Interview Questions

## Table of Contents
1. [Q1: What is Vue.js and what are its key features?](#q1-what-is-vuejs-and-what-are-its-key-features)
2. [Q2: Explain the difference between Options API and Composition API.](#q2-explain-the-difference-between-options-api-and-composition-api)
3. [Q3: What are Vue directives and how do you create custom directives?](#q3-what-are-vue-directives-and-how-do-you-create-custom-directives)
4. [Q4: How do you implement Vue 3 reactivity system and what are the key differences from Vue 2?](#q4-how-do-you-implement-vue-3-reactivity-system-and-what-are-the-key-differences-from-vue-2)
5. [Q5: How do you implement Vue Router for SPA navigation and what are the advanced routing patterns?](#q5-how-do-you-implement-vue-router-for-spa-navigation-and-what-are-the-advanced-routing-patterns)
6. [Q6: How do you implement state management with Pinia (Vue 3) and what are the differences from Vuex?](#q6-how-do-you-implement-state-management-with-pinia-vue-3-and-what-are-the-differences-from-vuex)
7. [Q7: How do you implement component communication in Vue.js?](#q7-how-do-you-implement-component-communication-in-vuejs)
8. [Q8: How do you implement Vue.js performance optimization techniques?](#q8-how-do-you-implement-vuejs-performance-optimization-techniques)
9. [Q9: How do you implement testing in Vue.js applications?](#q9-how-do-you-implement-testing-in-vuejs-applications)
10. [Q10: How do you implement Vue 3 Teleport and Suspense features?](#q10-how-do-you-implement-vue-3-teleport-and-suspense-features)
11. [Q11: How do you implement Server-Side Rendering (SSR) with Vue.js?](#q11-how-do-you-implement-server-side-rendering-ssr-with-vuejs)
12. [Q12: How do you implement advanced Vue.js patterns and best practices?](#q12-how-do-you-implement-advanced-vuejs-patterns-and-best-practices)
13. [Q13: How do you implement Vue.js with TypeScript?](#q13-how-do-you-implement-vuejs-with-typescript)
14. [Q14: How do you deploy Vue.js applications?](#q14-how-do-you-deploy-vuejs-applications)
15. [Q15: How do you migrate from Vue 2 to Vue 3?](#q15-how-do-you-migrate-from-vue-2-to-vue-3)
16. [Q16: How do you implement micro-frontends with Vue.js?](#q16-how-do-you-implement-micro-frontends-with-vuejs)
17. [Q17: How do you implement advanced Vue.js patterns and best practices?](#q17-how-do-you-implement-advanced-vuejs-patterns-and-best-practices)
18. [Q18: How do you implement Vue.js with modern development tools and workflows?](#q18-how-do-you-implement-vuejs-with-modern-development-tools-and-workflows)
19. [Q19: How do you implement Vue.js with internationalization (i18n) and accessibility?](#q19-how-do-you-implement-vuejs-with-internationalization-i18n-and-accessibility)
20. [Q20: How do you implement Vue.js enterprise patterns and architecture?](#q20-how-do-you-implement-vuejs-enterprise-patterns-and-architecture)

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

## Components and Templates

### Q3: What are Vue directives and how do you create custom directives?
**Difficulty: Medium**

**Answer:**
Vue directives are special attributes with the `v-` prefix that apply reactive behavior to DOM elements. They can manipulate the DOM, handle events, and bind data.

**Built-in Directives:**

```vue
<template>
  <div class="directive-examples">
    <!-- v-if/v-else-if/v-else: Conditional rendering -->
    <div v-if="user.role === 'admin'">Admin Panel</div>
    <div v-else-if="user.role === 'moderator'">Moderator Panel</div>
    <div v-else>User Panel</div>
    
    <!-- v-show: Toggle visibility -->
    <div v-show="isVisible">This can be hidden</div>
    
    <!-- v-for: List rendering -->
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index + 1 }}. {{ item.name }}
      </li>
    </ul>
    
    <!-- v-model: Two-way data binding -->
    <input v-model="message" placeholder="Type something..." />
    <p>Message: {{ message }}</p>
    
    <!-- v-bind: Attribute binding (shorthand :) -->
    <img :src="imageUrl" :alt="imageAlt" :class="{ active: isActive }" />
    
    <!-- v-on: Event handling (shorthand @) -->
    <button @click="handleClick" @mouseover="handleHover">Click me</button>
    
    <!-- v-slot: Named slots -->
    <BaseCard>
      <template v-slot:header>
        <h3>Card Title</h3>
      </template>
      <template v-slot:default>
        <p>Card content</p>
      </template>
    </BaseCard>
    
    <!-- v-pre: Skip compilation -->
    <span v-pre>{{ this will not be compiled }}</span>
    
    <!-- v-once: Render once -->
    <div v-once>{{ expensiveCalculation() }}</div>
    
    <!-- v-memo: Memoize template (Vue 3.2+) -->
    <div v-memo="[valueA, valueB]">
      <ExpensiveComponent :value-a="valueA" :value-b="valueB" />
    </div>
  </div>
</template>
```

**Custom Directives:**

Directives have several lifecycle hooks:
- `created`: Before element's attributes or event listeners are applied
- `beforeMount`: Before element is inserted into DOM
- `mounted`: After element is inserted into DOM
- `beforeUpdate`: Before element is updated
- `updated`: After element is updated
- `beforeUnmount`: Before element is removed
- `unmounted`: After element is removed

```javascript
// Global custom directive
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// Advanced custom directive with all hooks
app.directive('highlight', {
  created(el, binding, vnode, prevVnode) {
    console.log('Directive created')
  },
  beforeMount(el, binding) {
    console.log('Before mount')
    el.style.background = binding.value || 'yellow'
  },
  mounted(el, binding) {
    console.log('Mounted')
    if (binding.modifiers.bold) {
      el.style.fontWeight = 'bold'
    }
    if (binding.modifiers.italic) {
      el.style.fontStyle = 'italic'
    }
  },
  beforeUpdate(el, binding) {
    console.log('Before update')
  },
  updated(el, binding) {
    console.log('Updated')
    el.style.background = binding.value || 'yellow'
  },
  beforeUnmount(el) {
    console.log('Before unmount')
  },
  unmounted(el) {
    console.log('Unmounted')
  }
})

// Usage: <p v-highlight.bold.italic="'lightblue'">Highlighted text</p>
```

**Practical Custom Directives:**

```javascript
// 1. Click Outside Directive
app.directive('click-outside', {
  beforeMount(el, binding) {
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

// 2. Intersection Observer Directive
app.directive('intersect', {
  mounted(el, binding) {
    const options = {
      threshold: binding.arg || 0.1,
      rootMargin: binding.modifiers.margin || '0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          binding.value(entry)
        }
      })
    }, options)
    
    observer.observe(el)
    el._observer = observer
  },
  unmounted(el) {
    if (el._observer) {
      el._observer.disconnect()
      delete el._observer
    }
  }
})

// 3. Tooltip Directive
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
    
    const showTooltip = (e) => {
      tooltip.style.left = e.pageX + 10 + 'px'
      tooltip.style.top = e.pageY + 10 + 'px'
      tooltip.style.opacity = '1'
    }
    
    const hideTooltip = () => {
      tooltip.style.opacity = '0'
    }
    
    el.addEventListener('mouseenter', showTooltip)
    el.addEventListener('mouseleave', hideTooltip)
    el.addEventListener('mousemove', showTooltip)
    
    el._tooltip = tooltip
    el._showTooltip = showTooltip
    el._hideTooltip = hideTooltip
  },
  updated(el, binding) {
    if (el._tooltip) {
      el._tooltip.textContent = binding.value
    }
  },
  unmounted(el) {
    if (el._tooltip) {
      el.removeEventListener('mouseenter', el._showTooltip)
      el.removeEventListener('mouseleave', el._hideTooltip)
      el.removeEventListener('mousemove', el._showTooltip)
      document.body.removeChild(el._tooltip)
      delete el._tooltip
      delete el._showTooltip
      delete el._hideTooltip
    }
  }
})

// 4. Lazy Loading Directive
app.directive('lazy', {
  mounted(el, binding) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = binding.value
          img.classList.remove('lazy')
          imageObserver.unobserve(img)
        }
      })
    })
    
    el.classList.add('lazy')
    imageObserver.observe(el)
    el._imageObserver = imageObserver
  },
  unmounted(el) {
    if (el._imageObserver) {
      el._imageObserver.disconnect()
      delete el._imageObserver
    }
  }
})

// 5. Permission Directive
app.directive('permission', {
  mounted(el, binding) {
    const { value: permission } = binding
    const userPermissions = store.getters.userPermissions
    
    if (!userPermissions.includes(permission)) {
      el.style.display = 'none'
      // Or remove element completely
      // el.parentNode?.removeChild(el)
    }
  },
  updated(el, binding) {
    const { value: permission } = binding
    const userPermissions = store.getters.userPermissions
    
    if (userPermissions.includes(permission)) {
      el.style.display = ''
    } else {
      el.style.display = 'none'
    }
  }
})
```

**Usage Examples:**

```vue
<template>
  <div class="app">
    <!-- Focus directive -->
    <input v-focus placeholder="Auto-focused" />
    
    <!-- Click outside directive -->
    <div v-click-outside="closeModal" class="modal" v-if="showModal">
      <p>Click outside to close</p>
    </div>
    
    <!-- Intersection observer -->
    <div v-intersect:0.5.margin="onIntersect" class="lazy-section">
      <p>This will trigger when 50% visible</p>
    </div>
    
    <!-- Tooltip directive -->
    <button v-tooltip="'This is a helpful tooltip'">Hover me</button>
    
    <!-- Lazy loading -->
    <img v-lazy="imageUrl" alt="Lazy loaded image" class="lazy-image" />
    
    <!-- Permission directive -->
    <button v-permission="'admin'" @click="deleteUser">Delete User</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      imageUrl: 'https://example.com/large-image.jpg'
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    onIntersect(entry) {
      console.log('Element is visible:', entry.intersectionRatio)
    },
    deleteUser() {
      // Delete user logic
    }
  }
}
</script>

<style>
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy-image:not(.lazy) {
  opacity: 1;
}
</style>
```

**Local Component Directives:**

```vue
<script>
export default {
  directives: {
    // Local directive only available in this component
    'color': {
      mounted(el, binding) {
        el.style.color = binding.value
      },
      updated(el, binding) {
        el.style.color = binding.value
      }
    }
  }
}
</script>
```

**Directive Arguments and Modifiers:**

```javascript
// v-my-directive:arg.modifier1.modifier2="value"
app.directive('my-directive', {
  mounted(el, binding) {
    console.log(binding.arg)        // "arg"
    console.log(binding.modifiers)  // { modifier1: true, modifier2: true }
    console.log(binding.value)      // value of expression
    console.log(binding.oldValue)   // previous value (only in updated)
  }
})
```

---

## Reactivity System

### Q4: How do you implement Vue 3 reactivity system and what are the key differences from Vue 2?
**Difficulty: Medium**

**Answer:**
Vue 3 introduced a completely rewritten reactivity system based on ES6 Proxies, providing better performance and more powerful reactive capabilities.

**Vue 2 vs Vue 3 Reactivity:**

| Aspect | Vue 2 | Vue 3 |
|--------|-------|-------|
| **Implementation** | Object.defineProperty | ES6 Proxy |
| **Array Detection** | Method patching | Native support |
| **Property Addition** | Vue.set() required | Automatic |
| **Property Deletion** | Vue.delete() required | Automatic |
| **Performance** | O(n) for objects | O(1) for most operations |
| **Browser Support** | IE8+ | IE11+ (Proxy limitation) |

**Vue 3 Reactivity APIs:**

```javascript
import { 
  ref, 
  reactive, 
  computed, 
  watch, 
  watchEffect,
  readonly,
  shallowRef,
  shallowReactive,
  toRef,
  toRefs,
  unref,
  isRef,
  isReactive,
  isReadonly,
  isProxy
} from 'vue'

// 1. ref() - Creates reactive reference for primitives
const count = ref(0)
const message = ref('Hello')
const user = ref({ name: 'John', age: 30 })

console.log(count.value) // 0
count.value++ // Triggers reactivity

// 2. reactive() - Creates reactive proxy for objects
const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 30,
    preferences: {
      theme: 'dark'
    }
  },
  items: []
})

// Direct property access (no .value needed)
state.count++
state.user.name = 'Jane'
state.items.push('new item')

// 3. computed() - Computed properties
const doubleCount = computed(() => count.value * 2)
const fullName = computed({
  get: () => `${state.user.firstName} ${state.user.lastName}`,
  set: (value) => {
    const [first, last] = value.split(' ')
    state.user.firstName = first
    state.user.lastName = last
  }
})

// 4. watch() - Watch specific reactive sources
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// Watch multiple sources
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('Multiple values changed')
})

// Watch object properties
watch(
  () => state.user.name,
  (newName, oldName) => {
    console.log(`Name changed from ${oldName} to ${newName}`)
  }
)

// Deep watch
watch(
  state,
  (newState, oldState) => {
    console.log('State changed deeply')
  },
  { deep: true }
)

// 5. watchEffect() - Automatically track dependencies
watchEffect(() => {
  console.log(`Count is ${count.value}, message is ${message.value}`)
  // Automatically re-runs when count or message changes
})

// Stop watcher
const stopWatcher = watchEffect(() => {
  console.log(count.value)
})
stopWatcher() // Stop watching
```

**Advanced Reactivity Patterns:**

```javascript
// 1. Shallow reactivity
const shallowState = shallowReactive({
  count: 0,
  nested: { value: 1 } // This won't be reactive
})

const shallowCount = shallowRef({ value: 0 })
// Only .value assignment triggers reactivity, not nested properties

// 2. Readonly
const readonlyState = readonly(state)
// readonlyState.count++ // Warning: cannot mutate readonly

// 3. toRef and toRefs
const userAge = toRef(state.user, 'age')
const { name, age } = toRefs(state.user)

// 4. Utility functions
console.log(isRef(count))           // true
console.log(isReactive(state))      // true
console.log(isReadonly(readonlyState)) // true
console.log(isProxy(state))         // true

// 5. unref - Get value whether ref or not
function useValue(value) {
  return unref(value) // Returns .value if ref, otherwise returns value
}
```

**Custom Reactivity with Composition Functions:**

```javascript
// Custom reactive composable
function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  // Watch for specific values
  watch(count, (newValue) => {
    if (newValue === 10) {
      console.log('Counter reached 10!')
    }
  })
  
  return {
    count: readonly(count), // Expose as readonly
    doubleCount,
    increment,
    decrement,
    reset
  }
}

// Advanced reactive store
function createReactiveStore(initialState) {
  const state = reactive(initialState)
  const mutations = new Map()
  const actions = new Map()
  
  const commit = (type, payload) => {
    const mutation = mutations.get(type)
    if (mutation) {
      mutation(state, payload)
    }
  }
  
  const dispatch = async (type, payload) => {
    const action = actions.get(type)
    if (action) {
      return await action({ state, commit, dispatch }, payload)
    }
  }
  
  const registerMutation = (type, handler) => {
    mutations.set(type, handler)
  }
  
  const registerAction = (type, handler) => {
    actions.set(type, handler)
  }
  
  return {
    state: readonly(state),
    commit,
    dispatch,
    registerMutation,
    registerAction
  }
}

// Usage
const store = createReactiveStore({
  user: null,
  loading: false,
  error: null
})

store.registerMutation('SET_USER', (state, user) => {
  state.user = user
})

store.registerMutation('SET_LOADING', (state, loading) => {
  state.loading = loading
})

store.registerAction('fetchUser', async ({ commit }, userId) => {
  commit('SET_LOADING', true)
  try {
    const user = await api.getUser(userId)
    commit('SET_USER', user)
  } catch (error) {
    commit('SET_ERROR', error.message)
  } finally {
    commit('SET_LOADING', false)
  }
})
```

**Reactivity Transform (Experimental):**

```javascript
// With reactivity transform, you can use refs without .value
let count = $ref(0)
let message = $ref('Hello')

// Compiles to:
// let count = ref(0)
// let message = ref('Hello')

// Direct assignment
count++ // Compiles to: count.value++
message = 'World' // Compiles to: message.value = 'World'

// In computed
const doubleCount = $computed(() => count * 2)
// Compiles to: const doubleCount = computed(() => count.value * 2)
```

**Performance Optimizations:**

```javascript
// 1. Use shallowRef for large objects that don't need deep reactivity
const largeDataset = shallowRef({
  items: new Array(10000).fill(0).map((_, i) => ({ id: i, value: i }))
})

// 2. Use markRaw for non-reactive objects
import { markRaw } from 'vue'

const nonReactiveObject = markRaw({
  someLibraryInstance: new SomeLibrary(),
  config: { /* large config object */ }
})

// 3. Use triggerRef for manual triggering
const manualRef = shallowRef({ count: 0 })
manualRef.value.count++ // Won't trigger reactivity
triggerRef(manualRef) // Manually trigger

// 4. Batch updates with nextTick
import { nextTick } from 'vue'

const updateMultiple = async () => {
  state.a = 1
  state.b = 2
  state.c = 3
  // All updates are batched
  await nextTick()
  // DOM is updated once
}
```

---

## Vue Router

### Q5: How do you implement Vue Router for SPA navigation and what are the advanced routing patterns?
**Difficulty: Medium**

**Answer:**
Vue Router is the official routing library for Vue.js applications, enabling navigation between different views in single-page applications.

**Basic Router Setup:**

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home Page' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About Us', requiresAuth: false }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact Us' }
  },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile.vue'), // Lazy loading
    props: true, // Pass route params as props
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id/posts/:postId',
    name: 'UserPost',
    component: () => import('@/views/UserPost.vue'),
    props: route => ({ 
      userId: parseInt(route.params.id),
      postId: parseInt(route.params.postId),
      tab: route.query.tab || 'content'
    })
  },
  // Redirect
  {
    path: '/home',
    redirect: '/'
  },
  // Alias
  {
    path: '/dashboard',
    alias: '/admin',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  // Catch all 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  }
})

export default router
```

**Navigation Guards:**

```javascript
// Global guards
router.beforeEach(async (to, from, next) => {
  // Set page title
  document.title = to.meta.title || 'My App'
  
  // Check authentication
  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }
    
    // Check roles
    if (to.meta.roles) {
      const userRoles = await getUserRoles()
      const hasRequiredRole = to.meta.roles.some(role => userRoles.includes(role))
      if (!hasRequiredRole) {
        next({ name: 'Forbidden' })
        return
      }
    }
  }
  
  next()
})

router.beforeResolve((to, from, next) => {
  // Show loading indicator
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Hide loading indicator
  NProgress.done()
  
  // Analytics
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_path: to.path
  })
})

// Per-route guards
const routes = [
  {
    path: '/admin',
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      // Route-specific guard
      if (store.getters.isAdmin) {
        next()
      } else {
        next('/forbidden')
      }
    }
  }
]
```

**Component Guards:**

```vue
<template>
  <div class="user-profile">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: null,
      loading: false
    }
  },
  async beforeRouteEnter(to, from, next) {
    // Called before route is confirmed
    // No access to `this` yet
    try {
      const user = await fetchUser(to.params.id)
      next(vm => {
        vm.user = user
      })
    } catch (error) {
      next({ name: 'NotFound' })
    }
  },
  async beforeRouteUpdate(to, from) {
    // Called when route changes but component is reused
    // Has access to `this`
    if (to.params.id !== from.params.id) {
      this.loading = true
      try {
        this.user = await fetchUser(to.params.id)
      } catch (error) {
        this.$router.push({ name: 'NotFound' })
      } finally {
        this.loading = false
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // Called when navigating away
    if (this.hasUnsavedChanges) {
      const answer = window.confirm('You have unsaved changes. Are you sure you want to leave?')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>
```

**Advanced Routing Patterns:**

```javascript
// 1. Nested Routes
const routes = [
  {
    path: '/users/:id',
    component: UserLayout,
    children: [
      {
        path: '', // Empty path means default child route
        component: UserProfile
      },
      {
        path: 'posts',
        component: UserPosts,
        children: [
          {
            path: ':postId',
            component: PostDetail,
            props: true
          }
        ]
      },
      {
        path: 'settings',
        component: UserSettings,
        meta: { requiresOwnership: true }
      }
    ]
  }
]

// 2. Dynamic Route Matching
const routes = [
  {
    path: '/articles/:category/:slug',
    component: Article,
    props: route => ({
      category: route.params.category,
      slug: route.params.slug,
      page: parseInt(route.query.page) || 1
    })
  },
  {
    path: '/search/:query(.*)',
    component: SearchResults,
    props: route => ({
      query: route.params.query,
      filters: route.query
    })
  }
]

// 3. Route Meta Fields and Guards
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      roles: ['admin', 'moderator'],
      layout: 'admin',
      breadcrumb: 'Dashboard'
    }
  }
]

// 4. Programmatic Navigation
export default {
  methods: {
    navigateToUser(userId) {
      // Push new route
      this.$router.push({ name: 'UserProfile', params: { id: userId } })
    },
    
    replaceRoute() {
      // Replace current route (no history entry)
      this.$router.replace({ path: '/new-path' })
    },
    
    goBack() {
      // Go back in history
      this.$router.go(-1)
    },
    
    navigateWithQuery() {
      this.$router.push({
        name: 'Search',
        query: { q: 'vue', category: 'tutorials' },
        hash: '#results'
      })
    }
  }
}
```

**Route Composition with Composition API:**

```javascript
// composables/useRouter.js
import { useRouter, useRoute } from 'vue-router'
import { computed, watch } from 'vue'

export function useRouterHelpers() {
  const router = useRouter()
  const route = useRoute()
  
  const currentPath = computed(() => route.path)
  const currentParams = computed(() => route.params)
  const currentQuery = computed(() => route.query)
  
  const navigateTo = (name, params = {}, query = {}) => {
    router.push({ name, params, query })
  }
  
  const navigateBack = () => {
    router.go(-1)
  }
  
  const updateQuery = (newQuery) => {
    router.replace({ query: { ...route.query, ...newQuery } })
  }
  
  return {
    route,
    router,
    currentPath,
    currentParams,
    currentQuery,
    navigateTo,
    navigateBack,
    updateQuery
  }
}

// Component using the composable
export default {
  setup() {
    const { route, navigateTo, updateQuery } = useRouterHelpers()
    
    // Watch route changes
    watch(
      () => route.params.id,
      (newId, oldId) => {
        if (newId !== oldId) {
          fetchUserData(newId)
        }
      },
      { immediate: true }
    )
    
    const searchUsers = (query) => {
      updateQuery({ search: query })
    }
    
    return {
      searchUsers,
      navigateTo
    }
  }
}
```

**Route Transitions:**

```vue
<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="route.meta.transition || 'fade'"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
    >
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script>
export default {
  methods: {
    onBeforeEnter() {
      // Animation start
      document.body.classList.add('page-transitioning')
    },
    onAfterEnter() {
      // Animation complete
      document.body.classList.remove('page-transitioning')
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
```

**Route-based Code Splitting:**

```javascript
// Lazy loading with webpack comments
const routes = [
  {
    path: '/admin',
    component: () => import(
      /* webpackChunkName: "admin" */ 
      '@/views/admin/Dashboard.vue'
    )
  },
  {
    path: '/reports',
    component: () => import(
      /* webpackChunkName: "reports" */
      /* webpackPrefetch: true */
      '@/views/Reports.vue'
    )
  }
]

// Dynamic imports with error handling
const loadComponent = (componentPath) => {
  return () => import(componentPath)
    .catch(() => import('@/views/ErrorLoading.vue'))
}

const routes = [
  {
    path: '/heavy-component',
    component: loadComponent('@/views/HeavyComponent.vue')
  }
]
```

---

## State Management

### Q6: How do you implement state management with Pinia (Vue 3) and what are the differences from Vuex?
**Difficulty: Medium**

**Answer:**
Pinia is the official state management library for Vue 3, designed to be more intuitive and TypeScript-friendly than Vuex.

**Pinia vs Vuex Comparison:**

| Feature | Vuex 4 | Pinia |
|---------|--------|-------|
| **API Style** | Options-based | Composition-based |
| **TypeScript** | Complex setup | Built-in support |
| **Mutations** | Required | Not needed |
| **Modules** | Nested modules | Flat stores |
| **DevTools** | Good support | Excellent support |
| **Bundle Size** | Larger | Smaller |
| **Learning Curve** | Steeper | Gentler |

**Basic Pinia Setup:**

```javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

---

### Q7: How do you implement component communication in Vue.js?
**Difficulty: Medium**

**Answer:**
Vue.js provides multiple ways for components to communicate with each other, each suitable for different scenarios.

**1. Props (Parent to Child):**

```vue
<!-- Parent Component -->
<template>
  <div class="parent">
    <ChildComponent 
      :user="currentUser" 
      :settings="appSettings"
      :is-loading="loading"
      @user-updated="handleUserUpdate"
    />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  name: 'ParentComponent',
  components: {
    ChildComponent
  },
  data() {
    return {
      currentUser: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      },
      appSettings: {
        theme: 'dark',
        language: 'en'
      },
      loading: false
    }
  },
  methods: {
    handleUserUpdate(updatedUser) {
      this.currentUser = { ...this.currentUser, ...updatedUser }
    }
  }
}
</script>
```

```vue
<!-- Child Component -->
<template>
  <div class="child">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else class="user-profile">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <button @click="updateUser">Update Profile</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  props: {
    user: {
      type: Object,
      required: true,
      validator(value) {
        return value && typeof value.id === 'number' && typeof value.name === 'string'
      }
    },
    settings: {
      type: Object,
      default: () => ({})
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['user-updated'],
  methods: {
    updateUser() {
      const updatedData = {
        name: 'Jane Doe',
        email: 'jane@example.com'
      }
      this.$emit('user-updated', updatedData)
    }
  }
}
</script>
```

**2. Events (Child to Parent):**

```vue
<!-- Child Component -->
<template>
  <div class="form-component">
    <form @submit.prevent="submitForm">
      <input v-model="formData.name" placeholder="Name" />
      <input v-model="formData.email" placeholder="Email" />
      <button type="submit">Submit</button>
      <button type="button" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormComponent',
  emits: {
    // Validate event payload
    'form-submit': (payload) => {
      return payload && typeof payload.name === 'string' && typeof payload.email === 'string'
    },
    'form-cancel': null // No payload validation
  },
  data() {
    return {
      formData: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    submitForm() {
      if (this.formData.name && this.formData.email) {
        this.$emit('form-submit', { ...this.formData })
        this.resetForm()
      }
    },
    cancel() {
      this.$emit('form-cancel')
      this.resetForm()
    },
    resetForm() {
      this.formData = { name: '', email: '' }
    }
  }
}
</script>
```

**3. Provide/Inject (Ancestor to Descendant):**

```vue
<!-- Ancestor Component -->
<template>
  <div class="app">
    <UserDashboard />
  </div>
</template>

<script>
import { provide, ref, reactive } from 'vue'
import UserDashboard from './UserDashboard.vue'

export default {
  name: 'App',
  components: {
    UserDashboard
  },
  setup() {
    const theme = ref('light')
    const user = reactive({
      id: 1,
      name: 'John Doe',
      permissions: ['read', 'write']
    })
    
    const api = {
      async fetchData(endpoint) {
        const response = await fetch(`/api/${endpoint}`)
        return response.json()
      },
      async postData(endpoint, data) {
        const response = await fetch(`/api/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        return response.json()
      }
    }
    
    // Provide data to all descendants
    provide('theme', theme)
    provide('currentUser', user)
    provide('api', api)
    
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    
    provide('toggleTheme', toggleTheme)
    
    return {
      theme,
      user,
      toggleTheme
    }
  }
}
</script>
```

```vue
<!-- Descendant Component (any level deep) -->
<template>
  <div class="user-profile" :class="`theme-${theme}`">
    <h1>{{ currentUser.name }}</h1>
    <button @click="toggleTheme">Toggle Theme</button>
    <button @click="loadUserData" :disabled="loading">Load Data</button>
    <div v-if="userData">
      <pre>{{ userData }}</pre>
    </div>
  </div>
</template>

<script>
import { inject, ref } from 'vue'

export default {
  name: 'UserProfile',
  setup() {
    // Inject provided data
    const theme = inject('theme')
    const currentUser = inject('currentUser')
    const api = inject('api')
    const toggleTheme = inject('toggleTheme')
    
    const loading = ref(false)
    const userData = ref(null)
    
    const loadUserData = async () => {
      loading.value = true
      try {
        userData.value = await api.fetchData(`users/${currentUser.id}`)
      } catch (error) {
        console.error('Failed to load user data:', error)
      } finally {
        loading.value = false
      }
    }
    
    return {
      theme,
      currentUser,
      toggleTheme,
      loading,
      userData,
      loadUserData
    }
  }
}
</script>
```

**4. Event Bus (Global Communication):**

```javascript
// eventBus.js
import { reactive } from 'vue'

class EventBus {
  constructor() {
    this.events = {}
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
  }
  
  once(event, callback) {
    const onceCallback = (data) => {
      callback(data)
      this.off(event, onceCallback)
    }
    this.on(event, onceCallback)
  }
}

export const eventBus = new EventBus()

// Alternative: Using mitt library
// npm install mitt
// import mitt from 'mitt'
// export const eventBus = mitt()
```

```vue
<!-- Component A -->
<template>
  <div class="component-a">
    <button @click="sendMessage">Send Message to Component B</button>
    <p v-if="receivedMessage">Received: {{ receivedMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { eventBus } from '@/utils/eventBus'

export default {
  name: 'ComponentA',
  setup() {
    const receivedMessage = ref('')
    
    const sendMessage = () => {
      eventBus.emit('message-from-a', {
        text: 'Hello from Component A!',
        timestamp: new Date().toISOString()
      })
    }
    
    const handleMessageFromB = (data) => {
      receivedMessage.value = data.text
    }
    
    onMounted(() => {
      eventBus.on('message-from-b', handleMessageFromB)
    })
    
    onUnmounted(() => {
      eventBus.off('message-from-b', handleMessageFromB)
    })
    
    return {
      sendMessage,
      receivedMessage
    }
  }
}
</script>
```

**5. Vuex/Pinia Store (Global State):**

```javascript
// stores/notifications.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])
  
  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.read).length
  })
  
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      read: false,
      createdAt: new Date(),
      ...notification
    }
    notifications.value.unshift(newNotification)
  }
  
  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }
  
  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }
  
  const clearAll = () => {
    notifications.value = []
  }
  
  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    removeNotification,
    clearAll
  }
})
```

**6. Composables for Shared Logic:**

```javascript
// composables/useWebSocket.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useWebSocket(url) {
  const socket = ref(null)
  const isConnected = ref(false)
  const messages = ref([])
  const error = ref(null)
  
  const connect = () => {
    try {
      socket.value = new WebSocket(url)
      
      socket.value.onopen = () => {
        isConnected.value = true
        error.value = null
      }
      
      socket.value.onmessage = (event) => {
        const message = JSON.parse(event.data)
        messages.value.push({
          ...message,
          timestamp: new Date()
        })
      }
      
      socket.value.onclose = () => {
        isConnected.value = false
      }
      
      socket.value.onerror = (err) => {
        error.value = err
        isConnected.value = false
      }
    } catch (err) {
      error.value = err
    }
  }
  
  const disconnect = () => {
    if (socket.value) {
      socket.value.close()
    }
  }
  
  const sendMessage = (message) => {
    if (socket.value && isConnected.value) {
      socket.value.send(JSON.stringify(message))
    }
  }
  
  onMounted(() => {
    connect()
  })
  
  onUnmounted(() => {
    disconnect()
  })
  
  return {
    isConnected,
    messages,
    error,
    sendMessage,
    connect,
    disconnect
  }
}
```

**Communication Pattern Guidelines:**

| Pattern | Use Case | Pros | Cons |
|---------|----------|------|------|
| **Props/Events** | Parent-child communication | Simple, explicit | Limited to direct relationships |
| **Provide/Inject** | Ancestor-descendant data sharing | Avoids prop drilling | Can make dependencies unclear |
| **Event Bus** | Sibling component communication | Flexible, decoupled | Can become hard to track |
| **Store (Pinia/Vuex)** | Global state management | Centralized, predictable | Overkill for simple apps |
| **Composables** | Shared reactive logic | Reusable, testable | Requires good organization |

---

## Performance Optimization

### Q8: How do you implement Vue.js performance optimization techniques?
**Difficulty: Hard**

**Answer:**
Vue.js performance optimization involves multiple strategies to improve rendering speed, reduce bundle size, and enhance user experience.

**1. Component Optimization:**

```vue
<!-- Optimized List Component -->
<template>
  <div class="optimized-list">
    <!-- Use v-show for frequently toggled elements -->
    <div v-show="showFilters" class="filters">
      <input v-model="searchTerm" placeholder="Search..." />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
    
    <!-- Virtual scrolling for large lists -->
    <RecycleScroller
      class="scroller"
      :items="filteredItems"
      :item-size="60"
      key-field="id"
      v-slot="{ item }"
    >
      <ListItem :item="item" :key="item.id" />
    </RecycleScroller>
    
    <!-- Lazy loading with Intersection Observer -->
    <div ref="loadTrigger" class="load-trigger"></div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import ListItem from './ListItem.vue'
import { debounce } from 'lodash-es'

export default {
  name: 'OptimizedList',
  components: {
    RecycleScroller,
    ListItem
  },
  setup() {
    const items = ref([])
    const searchTerm = ref('')
    const selectedCategory = ref('')
    const showFilters = ref(true)
    const loadTrigger = ref(null)
    const loading = ref(false)
    const page = ref(1)
    
    // Debounced search to avoid excessive API calls
    const debouncedSearch = debounce((term) => {
      // Perform search
      performSearch(term)
    }, 300)
    
    // Computed property with memoization
    const filteredItems = computed(() => {
      let result = items.value
      
      if (searchTerm.value) {
        result = result.filter(item => 
          item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      }
      
      if (selectedCategory.value) {
        result = result.filter(item => item.category === selectedCategory.value)
      }
      
      return result
    })
    
    const categories = computed(() => {
      return [...new Set(items.value.map(item => item.category))]
    })
    
    // Watch with immediate: false to avoid initial trigger
    watch(searchTerm, (newTerm) => {
      debouncedSearch(newTerm)
    })
    
    // Intersection Observer for infinite scrolling
    let observer = null
    
    const setupIntersectionObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading.value) {
            loadMoreItems()
          }
        },
        { threshold: 0.1 }
      )
      
      if (loadTrigger.value) {
        observer.observe(loadTrigger.value)
      }
    }
    
    const loadMoreItems = async () => {
      loading.value = true
      try {
        const newItems = await fetchItems(page.value)
        items.value.push(...newItems)
        page.value++
      } catch (error) {
        console.error('Failed to load items:', error)
      } finally {
        loading.value = false
      }
    }
    
    const performSearch = async (term) => {
      // Reset pagination on search
      page.value = 1
      items.value = []
      
      try {
        const searchResults = await searchItems(term)
        items.value = searchResults
      } catch (error) {
        console.error('Search failed:', error)
      }
    }
    
    onMounted(() => {
      setupIntersectionObserver()
      loadMoreItems() // Initial load
    })
    
    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
      debouncedSearch.cancel()
    })
    
    return {
      items,
      filteredItems,
      categories,
      searchTerm,
      selectedCategory,
      showFilters,
      loadTrigger,
      loading
    }
  }
}
</script>
```

**2. Lazy Loading and Code Splitting:**

```javascript
// router/index.js - Route-based code splitting
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
    children: [
      {
        path: 'analytics',
        component: () => import(/* webpackChunkName: "analytics" */ '@/views/Analytics.vue')
      },
      {
        path: 'reports',
        component: () => import(/* webpackChunkName: "reports" */ '@/views/Reports.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'users',
        component: () => import(/* webpackChunkName: "admin-users" */ '@/views/admin/Users.vue')
      },
      {
        path: 'settings',
        component: () => import(/* webpackChunkName: "admin-settings" */ '@/views/admin/Settings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

```vue
<!-- Dynamic component loading -->
<template>
  <div class="dynamic-components">
    <Suspense>
      <template #default>
        <component :is="currentComponent" v-bind="componentProps" />
      </template>
      <template #fallback>
        <div class="loading-spinner">
          <LoadingSpinner />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref, computed, defineAsyncComponent } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'DynamicComponents',
  components: {
    LoadingSpinner
  },
  setup() {
    const activeTab = ref('chart')
    const componentProps = ref({})
    
    // Lazy load components based on user interaction
    const components = {
      chart: defineAsyncComponent({
        loader: () => import('@/components/ChartComponent.vue'),
        loadingComponent: LoadingSpinner,
        errorComponent: () => import('@/components/ErrorComponent.vue'),
        delay: 200,
        timeout: 3000
      }),
      table: defineAsyncComponent(() => import('@/components/TableComponent.vue')),
      map: defineAsyncComponent(() => import('@/components/MapComponent.vue'))
    }
    
    const currentComponent = computed(() => {
      return components[activeTab.value]
    })
    
    return {
      activeTab,
      currentComponent,
      componentProps
    }
  }
}
</script>
```

**3. Memory Management and Cleanup:**

```vue
<template>
  <div class="memory-optimized">
    <canvas ref="canvas" @mousemove="handleMouseMove"></canvas>
    <div class="stats">
      <p>FPS: {{ fps }}</p>
      <p>Memory Usage: {{ memoryUsage }}MB</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  name: 'MemoryOptimized',
  setup() {
    const canvas = ref(null)
    const fps = ref(0)
    const memoryUsage = ref(0)
    
    let animationId = null
    let lastTime = 0
    let frameCount = 0
    let eventListeners = []
    let intervals = []
    let timeouts = []
    
    // Throttled mouse handler
    const handleMouseMove = throttle((event) => {
      // Handle mouse movement
      updateCanvasInteraction(event)
    }, 16) // ~60fps
    
    // Animation loop with proper cleanup
    const animate = (currentTime) => {
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        fps.value = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime
        
        // Monitor memory usage
        if (performance.memory) {
          memoryUsage.value = Math.round(performance.memory.usedJSHeapSize / 1048576)
        }
      }
      
      // Render frame
      renderFrame()
      
      animationId = requestAnimationFrame(animate)
    }
    
    const renderFrame = () => {
      if (!canvas.value) return
      
      const ctx = canvas.value.getContext('2d')
      // Clear and redraw
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
      // Render logic here
    }
    
    const updateCanvasInteraction = (event) => {
      // Update interaction state
    }
    
    // Utility function for throttling
    function throttle(func, limit) {
      let inThrottle
      return function() {
        const args = arguments
        const context = this
        if (!inThrottle) {
          func.apply(context, args)
          inThrottle = true
          setTimeout(() => inThrottle = false, limit)
        }
      }
    }
    
    // Setup event listeners with cleanup tracking
    const addEventListener = (element, event, handler, options) => {
      element.addEventListener(event, handler, options)
      eventListeners.push({ element, event, handler, options })
    }
    
    const setIntervalWithCleanup = (callback, delay) => {
      const id = setInterval(callback, delay)
      intervals.push(id)
      return id
    }
    
    const setTimeoutWithCleanup = (callback, delay) => {
      const id = setTimeout(callback, delay)
      timeouts.push(id)
      return id
    }
    
    onMounted(async () => {
      await nextTick()
      
      if (canvas.value) {
        // Setup canvas
        canvas.value.width = canvas.value.offsetWidth
        canvas.value.height = canvas.value.offsetHeight
        
        // Start animation
        animationId = requestAnimationFrame(animate)
        
        // Setup resize observer
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            canvas.value.width = entry.contentRect.width
            canvas.value.height = entry.contentRect.height
          }
        })
        resizeObserver.observe(canvas.value)
        
        // Track for cleanup
        eventListeners.push({ 
          element: resizeObserver, 
          cleanup: () => resizeObserver.disconnect() 
        })
      }
    })
    
    onUnmounted(() => {
      // Cancel animation frame
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      
      // Clean up event listeners
      eventListeners.forEach(({ element, event, handler, cleanup }) => {
        if (cleanup) {
          cleanup()
        } else {
          element.removeEventListener(event, handler)
        }
      })
      
      // Clear intervals
      intervals.forEach(id => clearInterval(id))
      
      // Clear timeouts
      timeouts.forEach(id => clearTimeout(id))
      
      // Reset arrays
      eventListeners.length = 0
      intervals.length = 0
      timeouts.length = 0
    })
    
    return {
      canvas,
      fps,
      memoryUsage,
      handleMouseMove
    }
  }
}
</script>
```

**4. Bundle Optimization:**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    // Bundle analyzer
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vue-vendor': ['vue', 'vue-router'],
          'ui-vendor': ['element-plus', '@element-plus/icons-vue'],
          'utils-vendor': ['lodash-es', 'axios', 'dayjs'],
          
          // Feature-based chunks
          'admin': [
            './src/views/admin/Users.vue',
            './src/views/admin/Settings.vue'
          ],
          'dashboard': [
            './src/views/Dashboard.vue',
            './src/views/Analytics.vue'
          ]
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            const fileName = facadeModuleId.split('/').pop().replace('.vue', '')
            return `js/${fileName}-[hash].js`
          }
          return 'js/[name]-[hash].js'
        }
      }
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Source maps for production debugging
    sourcemap: process.env.NODE_ENV === 'development'
  },
  // Development optimizations
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: ['@vueuse/core']
  }
})
```

**5. Runtime Performance Monitoring:**

```javascript
// composables/usePerformanceMonitor.js
import { ref, onMounted, onUnmounted } from 'vue'

export function usePerformanceMonitor() {
  const metrics = ref({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    componentCount: 0
  })
  
  let observer = null
  let frameCount = 0
  let lastTime = performance.now()
  
  const measureRenderTime = (callback) => {
    const start = performance.now()
    const result = callback()
    const end = performance.now()
    metrics.value.renderTime = end - start
    return result
  }
  
  const trackFPS = () => {
    const now = performance.now()
    frameCount++
    
    if (now - lastTime >= 1000) {
      metrics.value.fps = Math.round((frameCount * 1000) / (now - lastTime))
      frameCount = 0
      lastTime = now
    }
    
    requestAnimationFrame(trackFPS)
  }
  
  const trackMemoryUsage = () => {
    if (performance.memory) {
      metrics.value.memoryUsage = Math.round(
        performance.memory.usedJSHeapSize / 1048576
      )
    }
  }
  
  const trackComponentCount = () => {
    // Count Vue components in DOM
    const vueComponents = document.querySelectorAll('[data-v-]')
    metrics.value.componentCount = vueComponents.length
  }
  
  const startMonitoring = () => {
    // Start FPS tracking
    requestAnimationFrame(trackFPS)
    
    // Track memory and components periodically
    const interval = setInterval(() => {
      trackMemoryUsage()
      trackComponentCount()
    }, 1000)
    
    return () => clearInterval(interval)
  }
  
  onMounted(() => {
    const cleanup = startMonitoring()
    
    onUnmounted(() => {
      cleanup()
    })
  })
  
  return {
    metrics,
    measureRenderTime
  }
}
```

**Performance Best Practices:**

1. **Use `v-show` vs `v-if`** appropriately
2. **Implement virtual scrolling** for large lists
3. **Debounce/throttle** user input handlers
4. **Use `shallowRef`** for large objects that don't need deep reactivity
5. **Implement proper cleanup** in `onUnmounted`
6. **Use `Suspense`** for async components
7. **Optimize bundle size** with code splitting
8. **Monitor performance** in production
9. **Use Web Workers** for heavy computations
10. **Implement caching strategies** for API calls

---

## Testing

### Q9: How do you implement testing in Vue.js applications?
**Difficulty: Medium**

**Answer:**
Vue.js testing involves unit testing components, integration testing, and end-to-end testing using various tools and strategies.

**1. Unit Testing with Vue Test Utils and Vitest:**

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

```javascript
// src/test/setup.js
import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

// Global test configuration
config.global.plugins = [createTestingPinia()]

// Mock global properties
config.global.mocks = {
  $t: (key) => key, // Mock i18n
  $route: {
    path: '/',
    params: {},
    query: {}
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn()
  }
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null }
  disconnect() { return null }
  unobserve() { return null }
}
```

**Component Testing Examples:**

```vue
<!-- UserProfile.vue -->
<template>
  <div class="user-profile">
    <div v-if="loading" class="loading" data-testid="loading">Loading...</div>
    <div v-else-if="error" class="error" data-testid="error">{{ error }}</div>
    <div v-else class="profile" data-testid="profile">
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
      <button @click="updateProfile" :disabled="updating" data-testid="update-btn">
        {{ updating ? 'Updating...' : 'Update Profile' }}
      </button>
      <button @click="deleteProfile" data-testid="delete-btn">Delete Profile</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'UserProfile',
  props: {
    userId: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['profile-updated', 'profile-deleted'],
  setup(props, { emit }) {
    const userStore = useUserStore()
    const loading = ref(false)
    const updating = ref(false)
    const error = ref(null)
    const user = ref(null)
    
    const fetchUser = async () => {
      loading.value = true
      error.value = null
      
      try {
        user.value = await userStore.fetchUser(props.userId)
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }
    
    const updateProfile = async () => {
      updating.value = true
      try {
        const updatedUser = await userStore.updateUser(props.userId, {
          name: 'Updated Name'
        })
        user.value = updatedUser
        emit('profile-updated', updatedUser)
      } catch (err) {
        error.value = err.message
      } finally {
        updating.value = false
      }
    }
    
    const deleteProfile = async () => {
      if (confirm('Are you sure you want to delete this profile?')) {
        try {
          await userStore.deleteUser(props.userId)
          emit('profile-deleted', props.userId)
        } catch (err) {
          error.value = err.message
        }
      }
    }
    
    onMounted(() => {
      fetchUser()
    })
    
    return {
      loading,
      updating,
      error,
      user,
      updateProfile,
      deleteProfile
    }
  }
}
</script>
```

```javascript
// UserProfile.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import UserProfile from '@/components/UserProfile.vue'
import { useUserStore } from '@/stores/user'

// Mock the confirm dialog
Object.defineProperty(window, 'confirm', {
  writable: true,
  value: vi.fn()
})

describe('UserProfile', () => {
  let wrapper
  let userStore
  
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  }
  
  beforeEach(() => {
    wrapper = mount(UserProfile, {
      props: {
        userId: 1
      },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn
        })]
      }
    })
    
    userStore = useUserStore()
    userStore.fetchUser.mockResolvedValue(mockUser)
    userStore.updateUser.mockResolvedValue({ ...mockUser, name: 'Updated Name' })
    userStore.deleteUser.mockResolvedValue()
  })
  
  it('renders loading state initially', () => {
    expect(wrapper.find('[data-testid="loading"]').exists()).toBe(true)
  })
  
  it('displays user profile after loading', async () => {
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0)) // Wait for async operations
    
    expect(wrapper.find('[data-testid="profile"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
  })
  
  it('handles fetch error', async () => {
    userStore.fetchUser.mockRejectedValue(new Error('Failed to fetch user'))
    
    await wrapper.vm.fetchUser()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('[data-testid="error"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Failed to fetch user')
  })
  
  it('updates profile when update button is clicked', async () => {
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const updateBtn = wrapper.find('[data-testid="update-btn"]')
    await updateBtn.trigger('click')
    
    expect(userStore.updateUser).toHaveBeenCalledWith(1, { name: 'Updated Name' })
    expect(wrapper.emitted('profile-updated')).toBeTruthy()
  })
  
  it('deletes profile when delete button is clicked and confirmed', async () => {
    window.confirm.mockReturnValue(true)
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const deleteBtn = wrapper.find('[data-testid="delete-btn"]')
    await deleteBtn.trigger('click')
    
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this profile?')
    expect(userStore.deleteUser).toHaveBeenCalledWith(1)
    expect(wrapper.emitted('profile-deleted')).toBeTruthy()
  })
  
  it('does not delete profile when not confirmed', async () => {
    window.confirm.mockReturnValue(false)
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const deleteBtn = wrapper.find('[data-testid="delete-btn"]')
    await deleteBtn.trigger('click')
    
    expect(userStore.deleteUser).not.toHaveBeenCalled()
    expect(wrapper.emitted('profile-deleted')).toBeFalsy()
  })
  
  it('disables update button while updating', async () => {
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    wrapper.vm.updating = true
    await wrapper.vm.$nextTick()
    
    const updateBtn = wrapper.find('[data-testid="update-btn"]')
    expect(updateBtn.attributes('disabled')).toBeDefined()
    expect(updateBtn.text()).toBe('Updating...')
  })
})
```

**2. Testing Composables:**

```javascript
// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}
```

```javascript
// useCounter.test.js
import { describe, it, expect } from 'vitest'
import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { count, doubleCount } = useCounter()
    
    expect(count.value).toBe(0)
    expect(doubleCount.value).toBe(0)
  })
  
  it('initializes with custom value', () => {
    const { count, doubleCount } = useCounter(10)
    
    expect(count.value).toBe(10)
    expect(doubleCount.value).toBe(20)
  })
  
  it('increments count', () => {
    const { count, increment } = useCounter(5)
    
    increment()
    expect(count.value).toBe(6)
  })
  
  it('decrements count', () => {
    const { count, decrement } = useCounter(5)
    
    decrement()
    expect(count.value).toBe(4)
  })
  
  it('resets to initial value', () => {
    const { count, increment, reset } = useCounter(3)
    
    increment()
    increment()
    expect(count.value).toBe(5)
    
    reset()
    expect(count.value).toBe(3)
  })
  
  it('updates computed value when count changes', () => {
    const { count, doubleCount, increment } = useCounter(2)
    
    expect(doubleCount.value).toBe(4)
    
    increment()
    expect(doubleCount.value).toBe(6)
  })
})
```

**3. Testing Pinia Stores:**

```javascript
// stores/user.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'

// Mock API
vi.mock('@/api/users', () => ({
  fetchUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn()
}))

import * as userApi from '@/api/users'

describe('User Store', () => {
  let store
  
  beforeEach(() => {
    setActivePinia(createPinia())
    store = useUserStore()
    vi.clearAllMocks()
  })
  
  it('initializes with empty state', () => {
    expect(store.users).toEqual([])
    expect(store.currentUser).toBeNull()
    expect(store.loading).toBe(false)
  })
  
  it('fetches user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' }
    userApi.fetchUser.mockResolvedValue(mockUser)
    
    const result = await store.fetchUser(1)
    
    expect(userApi.fetchUser).toHaveBeenCalledWith(1)
    expect(result).toEqual(mockUser)
    expect(store.currentUser).toEqual(mockUser)
  })
  
  it('handles fetch user error', async () => {
    const error = new Error('User not found')
    userApi.fetchUser.mockRejectedValue(error)
    
    await expect(store.fetchUser(1)).rejects.toThrow('User not found')
    expect(store.currentUser).toBeNull()
  })
  
  it('updates user successfully', async () => {
    const updatedUser = { id: 1, name: 'Jane Doe' }
    userApi.updateUser.mockResolvedValue(updatedUser)
    
    store.currentUser = { id: 1, name: 'John Doe' }
    
    const result = await store.updateUser(1, { name: 'Jane Doe' })
    
    expect(userApi.updateUser).toHaveBeenCalledWith(1, { name: 'Jane Doe' })
    expect(result).toEqual(updatedUser)
    expect(store.currentUser).toEqual(updatedUser)
  })
  
  it('computes user count correctly', () => {
    store.users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
    
    expect(store.userCount).toBe(2)
  })
})
```

**4. Integration Testing:**

```javascript
// integration/UserManagement.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import UserManagement from '@/views/UserManagement.vue'
import UserProfile from '@/components/UserProfile.vue'
import UserList from '@/components/UserList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/users', component: UserManagement },
    { path: '/users/:id', component: UserProfile }
  ]
})

describe('User Management Integration', () => {
  let wrapper
  
  beforeEach(async () => {
    await router.push('/users')
    
    wrapper = mount(UserManagement, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: {
                users: [
                  { id: 1, name: 'John Doe', email: 'john@example.com' },
                  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
                ]
              }
            }
          })
        ]
      }
    })
  })
  
  it('displays user list', () => {
    const userList = wrapper.findComponent(UserList)
    expect(userList.exists()).toBe(true)
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Jane Smith')
  })
  
  it('navigates to user profile when user is clicked', async () => {
    const userLinks = wrapper.findAll('[data-testid="user-link"]')
    await userLinks[0].trigger('click')
    
    expect(router.currentRoute.value.path).toBe('/users/1')
  })
  
  it('updates user list when user is deleted', async () => {
    const deleteButtons = wrapper.findAll('[data-testid="delete-user"]')
    await deleteButtons[0].trigger('click')
    
    // Simulate confirmation
    window.confirm = vi.fn(() => true)
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).not.toContain('John Doe')
    expect(wrapper.text()).toContain('Jane Smith')
  })
})
```

**5. E2E Testing with Playwright:**

```javascript
// e2e/user-management.spec.js
import { test, expect } from '@playwright/test'

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users')
  })
  
  test('should display user list', async ({ page }) => {
    await expect(page.locator('[data-testid="user-list"]')).toBeVisible()
    await expect(page.locator('.user-item')).toHaveCount(2)
  })
  
  test('should navigate to user profile', async ({ page }) => {
    await page.click('[data-testid="user-link"]:first-child')
    await expect(page).toHaveURL(/\/users\/\d+/)
    await expect(page.locator('[data-testid="profile"]')).toBeVisible()
  })
  
  test('should update user profile', async ({ page }) => {
    await page.click('[data-testid="user-link"]:first-child')
    await page.click('[data-testid="update-btn"]')
    
    await expect(page.locator('.success-message')).toBeVisible()
    await expect(page.locator('.success-message')).toContainText('Profile updated successfully')
  })
  
  test('should delete user with confirmation', async ({ page }) => {
    const initialUserCount = await page.locator('.user-item').count()
    
    page.on('dialog', dialog => dialog.accept())
    await page.click('[data-testid="delete-user"]:first-child')
    
    await expect(page.locator('.user-item')).toHaveCount(initialUserCount - 1)
  })
  
  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network failure
    await page.route('**/api/users/**', route => {
      route.abort('failed')
    })
    
    await page.reload()
    await expect(page.locator('[data-testid="error"]')).toBeVisible()
    await expect(page.locator('[data-testid="error"]')).toContainText('Failed to load users')
  })
})
```

**Testing Best Practices:**

1. **Use data-testid attributes** for reliable element selection
2. **Mock external dependencies** (APIs, third-party libraries)
3. **Test user interactions** rather than implementation details
4. **Use async/await** properly for asynchronous operations
5. **Test error scenarios** and edge cases
6. **Keep tests isolated** and independent
7. **Use descriptive test names** that explain the expected behavior
8. **Test accessibility** with screen readers and keyboard navigation
9. **Use visual regression testing** for UI components
10. **Implement continuous integration** with automated test runs

---

## Advanced Vue Features

### Q10: How do you implement Vue 3 Teleport and Suspense features?
**Difficulty: Medium**

**Answer:**
Vue 3 introduced Teleport and Suspense as built-in components to handle advanced rendering scenarios.

**1. Teleport for Portal-like Functionality:**

Teleport allows you to render a component's template in a different part of the DOM tree.

```vue
<!-- Modal Component -->
<template>
  <div class="modal-wrapper">
    <!-- Teleport modal to body -->
    <Teleport to="body">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <header class="modal-header">
            <h2>{{ title }}</h2>
            <button @click="closeModal" class="close-btn">&times;</button>
          </header>
          <main class="modal-body">
            <slot></slot>
          </main>
          <footer class="modal-footer">
            <slot name="footer">
              <button @click="closeModal">Close</button>
            </slot>
          </footer>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal'
    },
    closeOnEscape: {
      type: Boolean,
      default: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const isOpen = ref(props.modelValue)
    
    const closeModal = () => {
      isOpen.value = false
      emit('update:modelValue', false)
      emit('close')
    }
    
    const handleEscape = (event) => {
      if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
        closeModal()
      }
    }
    
    // Prevent body scroll when modal is open
    const toggleBodyScroll = (disable) => {
      document.body.style.overflow = disable ? 'hidden' : ''
    }
    
    watch(() => props.modelValue, (newValue) => {
      isOpen.value = newValue
      toggleBodyScroll(newValue)
    })
    
    watch(isOpen, (newValue) => {
      toggleBodyScroll(newValue)
    })
    
    onMounted(() => {
      document.addEventListener('keydown', handleEscape)
      if (isOpen.value) {
        toggleBodyScroll(true)
      }
    })
    
    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape)
      toggleBodyScroll(false)
    })
    
    return {
      isOpen,
      closeModal
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

**Advanced Teleport Usage:**

```vue
<!-- Notification System -->
<template>
  <div class="notification-manager">
    <!-- Teleport notifications to a specific container -->
    <Teleport to="#notification-container" :disabled="!teleportEnabled">
      <TransitionGroup name="notification" tag="div" class="notifications">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification', `notification--${notification.type}`]"
        >
          <div class="notification__content">
            <component 
              :is="notification.icon" 
              v-if="notification.icon" 
              class="notification__icon"
            />
            <div class="notification__text">
              <h4 v-if="notification.title">{{ notification.title }}</h4>
              <p>{{ notification.message }}</p>
            </div>
          </div>
          <button 
            @click="removeNotification(notification.id)"
            class="notification__close"
          >
            &times;
          </button>
        </div>
      </TransitionGroup>
    </Teleport>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notifications'

export default {
  name: 'NotificationManager',
  setup() {
    const notificationStore = useNotificationStore()
    const teleportEnabled = ref(false)
    
    // Ensure the target container exists
    onMounted(() => {
      let container = document.getElementById('notification-container')
      if (!container) {
        container = document.createElement('div')
        container.id = 'notification-container'
        container.className = 'notification-container'
        document.body.appendChild(container)
      }
      teleportEnabled.value = true
    })
    
    const removeNotification = (id) => {
      notificationStore.removeNotification(id)
    }
    
    return {
      notifications: notificationStore.notifications,
      teleportEnabled,
      removeNotification
    }
  }
}
</script>

<style>
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  pointer-events: none;
}

.notifications {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.notification {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  pointer-events: auto;
  max-width: 400px;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.notification--success {
  border-left-color: #10b981;
}

.notification--error {
  border-left-color: #ef4444;
}

.notification--warning {
  border-left-color: #f59e0b;
}

.notification--info {
  border-left-color: #3b82f6;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
```

**2. Suspense for Async Components:**

Suspense handles loading states for async components and async setup functions.

```vue
<!-- App.vue -->
<template>
  <div class="app">
    <Suspense>
      <template #default>
        <AsyncDashboard />
      </template>
      <template #fallback>
        <div class="loading-container">
          <LoadingSpinner />
          <p>Loading dashboard...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const AsyncDashboard = defineAsyncComponent(() => 
  import('@/views/Dashboard.vue')
)

export default {
  name: 'App',
  components: {
    AsyncDashboard,
    LoadingSpinner
  }
}
</script>
```

**Async Setup with Suspense:**

```vue
<!-- UserDashboard.vue -->
<template>
  <div class="user-dashboard">
    <div class="dashboard-header">
      <h1>Welcome, {{ user.name }}!</h1>
      <p>Last login: {{ formatDate(user.lastLogin) }}</p>
    </div>
    
    <div class="dashboard-content">
      <div class="stats-grid">
        <StatCard 
          v-for="stat in stats" 
          :key="stat.id"
          :title="stat.title"
          :value="stat.value"
          :trend="stat.trend"
        />
      </div>
      
      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <ActivityList :activities="activities" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAsyncData } from '@/composables/useAsyncData'
import { userApi } from '@/api/users'
import { statsApi } from '@/api/stats'
import { activityApi } from '@/api/activity'
import StatCard from '@/components/StatCard.vue'
import ActivityList from '@/components/ActivityList.vue'

export default {
  name: 'UserDashboard',
  components: {
    StatCard,
    ActivityList
  },
  async setup() {
    // These async calls will be handled by Suspense
    const [user, stats, activities] = await Promise.all([
      userApi.getCurrentUser(),
      statsApi.getUserStats(),
      activityApi.getRecentActivity()
    ])
    
    const formatDate = (date) => {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(date))
    }
    
    return {
      user,
      stats,
      activities,
      formatDate
    }
  }
}
</script>
```

**Advanced Suspense with Error Handling:**

```vue
<!-- DataVisualization.vue -->
<template>
  <div class="data-visualization">
    <Suspense>
      <template #default>
        <ChartContainer />
      </template>
      <template #fallback>
        <div class="loading-state">
          <div class="skeleton-chart"></div>
          <div class="skeleton-legend"></div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineComponent, onErrorCaptured, ref } from 'vue'
import ChartContainer from '@/components/ChartContainer.vue'

export default defineComponent({
  name: 'DataVisualization',
  components: {
    ChartContainer
  },
  setup() {
    const error = ref(null)
    
    onErrorCaptured((err) => {
      error.value = err
      return false // Prevent error from propagating
    })
    
    return {
      error
    }
  }
})
</script>
```

**Nested Suspense:**

```vue
<!-- NestedSuspenseExample.vue -->
<template>
  <div class="nested-suspense">
    <Suspense>
      <template #default>
        <div class="main-content">
          <UserProfile />
          
          <!-- Nested Suspense for independent loading -->
          <Suspense>
            <template #default>
              <UserPosts />
            </template>
            <template #fallback>
              <div class="posts-loading">
                <div class="skeleton-post" v-for="n in 3" :key="n"></div>
              </div>
            </template>
          </Suspense>
          
          <Suspense>
            <template #default>
              <UserAnalytics />
            </template>
            <template #fallback>
              <div class="analytics-loading">
                <div class="skeleton-chart"></div>
              </div>
            </template>
          </Suspense>
        </div>
      </template>
      <template #fallback>
        <div class="main-loading">
          <LoadingSpinner size="large" />
          <p>Loading user data...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const UserProfile = defineAsyncComponent(() => import('@/components/UserProfile.vue'))
const UserPosts = defineAsyncComponent(() => import('@/components/UserPosts.vue'))
const UserAnalytics = defineAsyncComponent(() => import('@/components/UserAnalytics.vue'))

export default {
  name: 'NestedSuspenseExample',
  components: {
    UserProfile,
    UserPosts,
    UserAnalytics,
    LoadingSpinner
  }
}
</script>
```

**Composable for Async Data with Suspense:**

```javascript
// composables/useAsyncData.js
import { ref, onServerPrefetch } from 'vue'

export function useAsyncData(key, fetcher) {
  const data = ref(null)
  const error = ref(null)
  const pending = ref(true)
  
  const execute = async () => {
    try {
      pending.value = true
      error.value = null
      data.value = await fetcher()
    } catch (err) {
      error.value = err
      throw err // Re-throw for Suspense to catch
    } finally {
      pending.value = false
    }
  }
  
  // For SSR support
  onServerPrefetch(execute)
  
  // Execute immediately for client-side
  if (typeof window !== 'undefined') {
    execute()
  }
  
  return {
    data,
    error,
    pending,
    refresh: execute
  }
}
```

**Best Practices:**

1. **Use Teleport for modals, tooltips, and overlays** that need to escape their parent's styling context
2. **Combine Suspense with error boundaries** for robust error handling
3. **Use nested Suspense** for independent loading states
4. **Provide meaningful fallback content** that matches the expected layout
5. **Handle SSR considerations** when using async setup
6. **Use skeleton screens** instead of generic loading spinners
7. **Consider accessibility** when teleporting content
8. **Test async components** thoroughly with different loading states

---

## Server-Side Rendering

### Q11: How do you implement Server-Side Rendering (SSR) with Vue.js?
**Difficulty: Advanced**

**Answer:**
Vue.js SSR can be implemented using Nuxt.js (recommended) or custom SSR setup with Vue's server renderer.

**1. Nuxt.js SSR Implementation:**

```javascript
// nuxt.config.js
export default {
  // Global page headers
  head: {
    title: 'Vue SSR App',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vue SSR Application' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page
  plugins: [
    '@/plugins/api.js',
    { src: '@/plugins/localStorage.js', mode: 'client' }
  ],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  // Modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@pinia/nuxt'
  ],

  // Axios module configuration
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3001/api'
  },

  // PWA module configuration
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration
  build: {
    transpile: ['@headlessui/vue']
  },

  // Server configuration
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: process.env.API_SECRET,
    // Public keys (exposed to client-side)
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001/api'
    }
  }
}
```

**SSR Page with Data Fetching:**

```vue
<!-- pages/products/[id].vue -->
<template>
  <div class="product-page">
    <div v-if="pending" class="loading">
      <ProductSkeleton />
    </div>
    <div v-else-if="error" class="error">
      <ErrorMessage :error="error" />
    </div>
    <div v-else class="product-content">
      <ProductHeader :product="product" />
      <ProductDetails :product="product" />
      <ProductReviews :reviews="reviews" />
      <RelatedProducts :products="relatedProducts" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Define page meta
definePageMeta({
  layout: 'product',
  middleware: 'auth'
})

// Get route params
const route = useRoute()
const productId = computed(() => route.params.id)

// Server-side data fetching
const { data: product, pending, error } = await useFetch(`/products/${productId.value}`, {
  key: `product-${productId.value}`,
  server: true,
  transform: (data) => {
    // Transform data if needed
    return {
      ...data,
      formattedPrice: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(data.price)
    }
  }
})

// Parallel data fetching
const [{ data: reviews }, { data: relatedProducts }] = await Promise.all([
  useFetch(`/products/${productId.value}/reviews`, {
    key: `reviews-${productId.value}`,
    server: true
  }),
  useFetch(`/products/${productId.value}/related`, {
    key: `related-${productId.value}`,
    server: true
  })
])

// SEO and meta tags
useSeoMeta({
  title: () => product.value?.name || 'Product',
  ogTitle: () => product.value?.name,
  description: () => product.value?.description,
  ogDescription: () => product.value?.description,
  ogImage: () => product.value?.image,
  twitterCard: 'summary_large_image'
})

// Structured data for SEO
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: () => product.value?.name,
  description: () => product.value?.description,
  image: () => product.value?.image,
  offers: {
    '@type': 'Offer',
    price: () => product.value?.price,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock'
  }
})
</script>
```

**2. Custom SSR Setup:**

```javascript
// server.js
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './src/App.vue'
import { routes } from './src/router'
import { createHead } from '@unhead/vue'

const server = express()

// Serve static files
server.use('/dist', express.static('dist'))

// SSR handler
server.get('*', async (req, res) => {
  try {
    // Create app instance
    const app = createSSRApp(App)
    
    // Create router with memory history
    const router = createRouter({
      history: createMemoryHistory(),
      routes
    })
    
    // Create Pinia store
    const pinia = createPinia()
    
    // Create head manager
    const head = createHead()
    
    // Install plugins
    app.use(router)
    app.use(pinia)
    app.use(head)
    
    // Navigate to the requested route
    await router.push(req.url)
    await router.isReady()
    
    // Get the matched route component
    const matchedComponents = router.currentRoute.value.matched
    
    // Pre-fetch data for matched components
    const asyncDataPromises = matchedComponents.map(route => {
      const component = route.components?.default
      if (component && component.asyncData) {
        return component.asyncData({
          route: router.currentRoute.value,
          store: pinia
        })
      }
      return Promise.resolve()
    })
    
    await Promise.all(asyncDataPromises)
    
    // Render app to string
    const appHtml = await renderToString(app)
    
    // Get head tags
    const { headTags, htmlAttrs, bodyAttrs } = await head.resolveTags()
    
    // Get initial state
    const initialState = JSON.stringify(pinia.state.value)
    
    // Generate HTML
    const html = `
      <!DOCTYPE html>
      <html${htmlAttrs}>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${headTags}
          <link rel="stylesheet" href="/dist/style.css">
        </head>
        <body${bodyAttrs}>
          <div id="app">${appHtml}</div>
          <script>
            window.__INITIAL_STATE__ = ${initialState}
          </script>
          <script src="/dist/client.js"></script>
        </body>
      </html>
    `
    
    res.send(html)
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

**Client-side Hydration:**

```javascript
// client.js
import { createSSRApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router'
import { createHead } from '@unhead/vue'

// Create app instance
const app = createSSRApp(App)

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create Pinia store
const pinia = createPinia()

// Restore initial state
if (window.__INITIAL_STATE__) {
  pinia.state.value = window.__INITIAL_STATE__
}

// Create head manager
const head = createHead()

// Install plugins
app.use(router)
app.use(pinia)
app.use(head)

// Wait for router to be ready
router.isReady().then(() => {
  // Hydrate the app
  app.mount('#app')
})
```

**3. Universal Component with SSR Support:**

```vue
<!-- components/ProductList.vue -->
<template>
  <div class="product-list">
    <div v-if="loading" class="loading">
      <ProductSkeleton v-for="n in 6" :key="n" />
    </div>
    <div v-else-if="error" class="error">
      <p>Failed to load products: {{ error.message }}</p>
      <button @click="fetchProducts">Retry</button>
    </div>
    <div v-else class="products-grid">
      <ProductCard 
        v-for="product in products" 
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
    
    <!-- Pagination -->
    <Pagination 
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductCard from './ProductCard.vue'
import ProductSkeleton from './ProductSkeleton.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard,
    ProductSkeleton,
    Pagination
  },
  props: {
    category: {
      type: String,
      default: null
    },
    limit: {
      type: Number,
      default: 12
    }
  },
  // SSR async data fetching
  async asyncData({ route, store }) {
    const productStore = useProductStore(store)
    const page = parseInt(route.query.page) || 1
    const category = route.params.category || null
    
    await productStore.fetchProducts({
      category,
      page,
      limit: 12
    })
    
    return {
      initialProducts: productStore.products,
      initialTotalPages: productStore.totalPages
    }
  },
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()
    const cartStore = useCartStore()
    
    const loading = ref(false)
    const error = ref(null)
    
    const currentPage = computed(() => parseInt(route.query.page) || 1)
    const products = computed(() => productStore.products)
    const totalPages = computed(() => productStore.totalPages)
    
    const fetchProducts = async () => {
      loading.value = true
      error.value = null
      
      try {
        await productStore.fetchProducts({
          category: props.category,
          page: currentPage.value,
          limit: props.limit
        })
      } catch (err) {
        error.value = err
      } finally {
        loading.value = false
      }
    }
    
    const handlePageChange = (page) => {
      router.push({
        query: { ...route.query, page }
      })
    }
    
    const handleAddToCart = (product) => {
      cartStore.addItem(product)
      emit('product-added', product)
    }
    
    // Watch for route changes
    watch(
      () => [route.query.page, props.category],
      () => {
        if (process.client) {
          fetchProducts()
        }
      }
    )
    
    // Client-side only
    onMounted(() => {
      // Only fetch if we don't have initial data
      if (!products.value.length) {
        fetchProducts()
      }
    })
    
    return {
      loading,
      error,
      products,
      currentPage,
      totalPages,
      fetchProducts,
      handlePageChange,
      handleAddToCart
    }
  }
}
</script>
```

**4. SSR-Compatible Store:**

```javascript
// stores/products.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const totalPages = ref(0)
  const currentPage = ref(1)
  const loading = ref(false)
  const error = ref(null)
  
  const productById = computed(() => {
    return (id) => products.value.find(p => p.id === id)
  })
  
  const fetchProducts = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch('/api/products', {
        params,
        // SSR-compatible fetch
        server: true
      })
      
      products.value = response.data
      totalPages.value = response.totalPages
      currentPage.value = params.page || 1
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const fetchProduct = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const product = await $fetch(`/api/products/${id}`, {
        server: true
      })
      
      // Update products array if product exists
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = product
      } else {
        products.value.push(product)
      }
      
      return product
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const clearProducts = () => {
    products.value = []
    totalPages.value = 0
    currentPage.value = 1
  }
  
  return {
    products,
    totalPages,
    currentPage,
    loading,
    error,
    productById,
    fetchProducts,
    fetchProduct,
    clearProducts
  }
})
```

**SSR Best Practices:**

1. **Use `process.client` and `process.server`** to conditionally run code
2. **Implement proper error handling** for both server and client
3. **Optimize data fetching** to avoid waterfalls
4. **Use proper caching strategies** for API calls
5. **Handle hydration mismatches** carefully
6. **Implement proper SEO meta tags** and structured data
7. **Use lazy loading** for non-critical components
8. **Monitor performance** and Core Web Vitals
9. **Implement proper state management** for SSR
10. **Test thoroughly** on both server and client

---

## Advanced Vue Patterns

### Q12: How do you implement advanced Vue.js patterns and best practices?
**Difficulty: Advanced**

**Answer:**
Advanced Vue.js patterns help create maintainable, scalable, and performant applications.

**1. Render Functions and JSX:**

```javascript
// DynamicComponent.js
import { h, resolveComponent } from 'vue'

export default {
  name: 'DynamicComponent',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, attrs, emit }) {
    const getClasses = () => {
      return [
        'dynamic-component',
        `dynamic-component--${props.variant}`,
        `dynamic-component--${props.size}`,
        {
          'dynamic-component--disabled': props.disabled
        }
      ]
    }
    
    const handleClick = (event) => {
      if (!props.disabled) {
        emit('click', event)
      }
    }
    
    return () => {
      const children = []
      
      // Add icon if provided
      if (slots.icon) {
        children.push(
          h('span', { class: 'dynamic-component__icon' }, slots.icon())
        )
      }
      
      // Add main content
      if (slots.default) {
        children.push(
          h('span', { class: 'dynamic-component__content' }, slots.default())
        )
      }
      
      // Add suffix if provided
      if (slots.suffix) {
        children.push(
          h('span', { class: 'dynamic-component__suffix' }, slots.suffix())
        )
      }
      
      return h(
        props.tag,
        {
          class: getClasses(),
          onClick: handleClick,
          disabled: props.disabled,
          ...attrs
        },
        children
      )
    }
  }
}
```

**JSX Alternative:**

```jsx
// DynamicComponent.jsx
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DynamicComponent',
  props: {
    tag: { type: String, default: 'div' },
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'medium' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const getClasses = () => ([
      'dynamic-component',
      `dynamic-component--${props.variant}`,
      `dynamic-component--${props.size}`,
      { 'dynamic-component--disabled': props.disabled }
    ])
    
    const handleClick = (event) => {
      if (!props.disabled) {
        emit('click', event)
      }
    }
    
    return () => {
      const Tag = props.tag
      
      return (
        <Tag
          class={getClasses()}
          onClick={handleClick}
          disabled={props.disabled}
        >
          {slots.icon && (
            <span class="dynamic-component__icon">
              {slots.icon()}
            </span>
          )}
          {slots.default && (
            <span class="dynamic-component__content">
              {slots.default()}
            </span>
          )}
          {slots.suffix && (
            <span class="dynamic-component__suffix">
              {slots.suffix()}
            </span>
          )}
        </Tag>
      )
    }
  }
})
```

**2. Higher-Order Components (HOCs):**

```javascript
// withLoading.js
import { h, ref, computed } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export function withLoading(WrappedComponent, options = {}) {
  return {
    name: `WithLoading(${WrappedComponent.name || 'Component'})`,
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: options.defaultLoadingText || 'Loading...'
      },
      ...WrappedComponent.props
    },
    setup(props, context) {
      const isLoading = computed(() => props.loading)
      
      return () => {
        if (isLoading.value) {
          return h('div', { class: 'loading-wrapper' }, [
            h(LoadingSpinner),
            h('p', { class: 'loading-text' }, props.loadingText)
          ])
        }
        
        return h(WrappedComponent, {
          ...props,
          ...context.attrs
        }, context.slots)
      }
    }
  }
}

// Usage
import UserProfile from '@/components/UserProfile.vue'
import { withLoading } from '@/hocs/withLoading'

const UserProfileWithLoading = withLoading(UserProfile, {
  defaultLoadingText: 'Loading user profile...'
})

export default UserProfileWithLoading
```

**3. Compound Components Pattern:**

```vue
<!-- Accordion.vue -->
<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<script>
import { provide, ref, reactive } from 'vue'

export default {
  name: 'Accordion',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    defaultOpen: {
      type: [String, Array],
      default: null
    }
  },
  setup(props) {
    const openItems = ref(new Set(
      Array.isArray(props.defaultOpen) 
        ? props.defaultOpen 
        : props.defaultOpen ? [props.defaultOpen] : []
    ))
    
    const accordionContext = reactive({
      multiple: props.multiple,
      openItems,
      toggle: (itemId) => {
        if (openItems.value.has(itemId)) {
          openItems.value.delete(itemId)
        } else {
          if (!props.multiple) {
            openItems.value.clear()
          }
          openItems.value.add(itemId)
        }
      },
      isOpen: (itemId) => openItems.value.has(itemId)
    })
    
    provide('accordionContext', accordionContext)
    
    return {}
  }
}
</script>
```

```vue
<!-- AccordionItem.vue -->
<template>
  <div class="accordion-item" :class="{ 'accordion-item--open': isOpen }">
    <slot></slot>
  </div>
</template>

<script>
import { inject, computed, provide } from 'vue'

export default {
  name: 'AccordionItem',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const accordionContext = inject('accordionContext')
    
    if (!accordionContext) {
      throw new Error('AccordionItem must be used within an Accordion')
    }
    
    const isOpen = computed(() => accordionContext.isOpen(props.id))
    
    const itemContext = {
      id: props.id,
      isOpen,
      toggle: () => accordionContext.toggle(props.id)
    }
    
    provide('accordionItemContext', itemContext)
    
    return {
      isOpen
    }
  }
}
</script>
```

```vue
<!-- AccordionTrigger.vue -->
<template>
  <button 
    class="accordion-trigger"
    :aria-expanded="isOpen"
    :aria-controls="`accordion-content-${id}`"
    @click="toggle"
  >
    <slot></slot>
    <ChevronIcon 
      class="accordion-trigger__icon"
      :class="{ 'accordion-trigger__icon--rotated': isOpen }"
    />
  </button>
</template>

<script>
import { inject } from 'vue'
import ChevronIcon from '@/components/icons/ChevronIcon.vue'

export default {
  name: 'AccordionTrigger',
  components: {
    ChevronIcon
  },
  setup() {
    const itemContext = inject('accordionItemContext')
    
    if (!itemContext) {
      throw new Error('AccordionTrigger must be used within an AccordionItem')
    }
    
    return {
      id: itemContext.id,
      isOpen: itemContext.isOpen,
      toggle: itemContext.toggle
    }
  }
}
</script>
```

```vue
<!-- AccordionContent.vue -->
<template>
  <div 
    v-show="isOpen"
    :id="`accordion-content-${id}`"
    class="accordion-content"
    role="region"
  >
    <div class="accordion-content__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'AccordionContent',
  setup() {
    const itemContext = inject('accordionItemContext')
    
    if (!itemContext) {
      throw new Error('AccordionContent must be used within an AccordionItem')
    }
    
    return {
      id: itemContext.id,
      isOpen: itemContext.isOpen
    }
  }
}
</script>
```

**Usage:**

```vue
<template>
  <Accordion :multiple="true" :default-open="['item1']">
    <AccordionItem id="item1">
      <AccordionTrigger>What is Vue.js?</AccordionTrigger>
      <AccordionContent>
        Vue.js is a progressive JavaScript framework for building user interfaces.
      </AccordionContent>
    </AccordionItem>
    
    <AccordionItem id="item2">
      <AccordionTrigger>How does reactivity work?</AccordionTrigger>
      <AccordionContent>
        Vue 3 uses Proxy-based reactivity system for efficient change detection.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

**4. Plugin Development:**

```javascript
// plugins/toast.js
import { createApp, h } from 'vue'
import ToastContainer from '@/components/ToastContainer.vue'

class ToastManager {
  constructor() {
    this.toasts = []
    this.container = null
    this.app = null
  }
  
  init() {
    if (typeof window === 'undefined') return
    
    // Create container element
    this.container = document.createElement('div')
    this.container.id = 'toast-container'
    document.body.appendChild(this.container)
    
    // Create Vue app for toasts
    this.app = createApp({
      render: () => h(ToastContainer, {
        toasts: this.toasts,
        onRemove: this.remove.bind(this)
      })
    })
    
    this.app.mount(this.container)
  }
  
  add(toast) {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast
    }
    
    this.toasts.push(newToast)
    
    if (newToast.duration > 0) {
      setTimeout(() => {
        this.remove(id)
      }, newToast.duration)
    }
    
    return id
  }
  
  remove(id) {
    const index = this.toasts.findIndex(toast => toast.id === id)
    if (index > -1) {
      this.toasts.splice(index, 1)
    }
  }
  
  success(message, options = {}) {
    return this.add({ ...options, message, type: 'success' })
  }
  
  error(message, options = {}) {
    return this.add({ ...options, message, type: 'error' })
  }
  
  warning(message, options = {}) {
    return this.add({ ...options, message, type: 'warning' })
  }
  
  info(message, options = {}) {
    return this.add({ ...options, message, type: 'info' })
  }
  
  clear() {
    this.toasts.splice(0)
  }
}

const toastManager = new ToastManager()

export default {
  install(app, options = {}) {
    // Initialize toast manager
    toastManager.init()
    
    // Add global properties
    app.config.globalProperties.$toast = toastManager
    
    // Provide for composition API
    app.provide('toast', toastManager)
  }
}

// Composable for using toast
export function useToast() {
  const toast = inject('toast')
  if (!toast) {
    throw new Error('useToast must be used within a Vue app with toast plugin installed')
  }
  return toast
}
```

**5. Advanced Composable Patterns:**

```javascript
// composables/useAsyncState.js
import { ref, computed, watchEffect } from 'vue'

export function useAsyncState(promise, defaultValue = null, options = {}) {
  const {
    immediate = true,
    resetOnExecute = true,
    shallow = true
  } = options
  
  const state = shallow ? shallowRef(defaultValue) : ref(defaultValue)
  const isReady = ref(false)
  const isLoading = ref(false)
  const error = ref(null)
  
  const execute = async (delay = 0) => {
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
    
    error.value = null
    isLoading.value = true
    
    if (resetOnExecute) {
      state.value = defaultValue
    }
    
    try {
      const result = await promise()
      state.value = result
      isReady.value = true
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }
  
  if (immediate) {
    execute()
  }
  
  const status = computed(() => {
    if (isLoading.value) return 'loading'
    if (error.value) return 'error'
    if (isReady.value) return 'success'
    return 'idle'
  })
  
  return {
    state,
    isReady,
    isLoading,
    error,
    status,
    execute
  }
}

// Usage
const { state: users, isLoading, error, execute: refetchUsers } = useAsyncState(
  () => fetch('/api/users').then(r => r.json()),
  [],
  { immediate: true }
)
```

**Advanced Patterns Best Practices:**

1. **Use render functions** for highly dynamic components
2. **Implement compound components** for complex UI patterns
3. **Create reusable HOCs** for cross-cutting concerns
4. **Develop custom plugins** for global functionality
5. **Use advanced composables** for complex state logic
6. **Implement proper TypeScript support** for better DX
7. **Follow Vue 3 composition patterns** consistently
8. **Use provide/inject** for deep component communication
9. **Implement proper error boundaries** for robust apps
10. **Test advanced patterns** thoroughly

---

## TypeScript Integration

### Q13: How do you implement Vue.js with TypeScript?
**Difficulty: Intermediate**

**Answer:**
Vue 3 has excellent TypeScript support with proper type inference and type safety.

**1. Project Setup with TypeScript:**

```bash
# Create Vue project with TypeScript
npm create vue@latest my-vue-app
# Select TypeScript: Yes

# Or with Vite
npm create vite@latest my-vue-app -- --template vue-ts

# Manual setup
npm install typescript @vue/tsconfig vue-tsc
```

**TypeScript Configuration:**

```json
// tsconfig.json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue"
  ],
  "exclude": [
    "src/**/__tests__/*"
  ],
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": [
      "node",
      "vite/client"
    ],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

**2. Vue Components with TypeScript:**

```vue
<!-- UserProfile.vue -->
<template>
  <div class="user-profile">
    <div class="user-header">
      <img :src="user.avatar" :alt="user.name" class="avatar" />
      <div class="user-info">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <span class="role" :class="`role--${user.role}`">{{ user.role }}</span>
      </div>
    </div>
    
    <div class="user-stats">
      <StatCard 
        v-for="stat in userStats" 
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :trend="stat.trend"
      />
    </div>
    
    <div class="user-actions">
      <Button 
        variant="primary" 
        @click="handleEdit"
        :disabled="!canEdit"
      >
        Edit Profile
      </Button>
      <Button 
        variant="secondary" 
        @click="handleMessage"
      >
        Send Message
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import Button from '@/components/Button.vue'
import StatCard from '@/components/StatCard.vue'

// Type definitions
interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user' | 'moderator'
  createdAt: Date
  lastLogin?: Date
}

interface UserStat {
  label: string
  value: number | string
  trend?: 'up' | 'down' | 'neutral'
}

interface UserProfileEmits {
  edit: [user: User]
  message: [userId: number]
}

// Props with TypeScript
const props = defineProps<{
  user: User
  canEdit?: boolean
  showStats?: boolean
}>()

// Alternative props definition with defaults
// const props = withDefaults(defineProps<{
//   user: User
//   canEdit?: boolean
//   showStats?: boolean
// }>(), {
//   canEdit: false,
//   showStats: true
// })

// Emits with TypeScript
const emit = defineEmits<UserProfileEmits>()

// Reactive data
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

// Computed properties with type inference
const userStats = computed<UserStat[]>(() => {
  if (!props.showStats) return []
  
  return [
    {
      label: 'Member Since',
      value: props.user.createdAt.getFullYear().toString(),
      trend: 'neutral'
    },
    {
      label: 'Last Login',
      value: props.user.lastLogin 
        ? formatDate(props.user.lastLogin)
        : 'Never',
      trend: props.user.lastLogin ? 'up' : 'down'
    },
    {
      label: 'Role',
      value: props.user.role.charAt(0).toUpperCase() + props.user.role.slice(1),
      trend: 'neutral'
    }
  ]
})

// Methods with proper typing
const handleEdit = (): void => {
  if (props.canEdit) {
    emit('edit', props.user)
  }
}

const handleMessage = (): void => {
  emit('message', props.user.id)
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Expose methods for template refs
defineExpose({
  handleEdit,
  handleMessage
})
</script>
```

**3. Composables with TypeScript:**

```typescript
// composables/useApi.ts
import { ref, computed, type Ref } from 'vue'

// Generic API response type
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// API error type
interface ApiError {
  message: string
  code: number
  details?: Record<string, any>
}

// Hook return type
interface UseApiReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<ApiError | null>
  execute: (url: string, options?: RequestInit) => Promise<T>
  reset: () => void
}

export function useApi<T = any>(): UseApiReturn<T> {
  const data = ref<T | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<ApiError | null>(null)
  
  const execute = async (url: string, options: RequestInit = {}): Promise<T> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: ApiResponse<T> = await response.json()
      
      if (!result.success) {
        throw new Error(result.message)
      }
      
      data.value = result.data
      return result.data
    } catch (err) {
      const apiError: ApiError = {
        message: err instanceof Error ? err.message : 'Unknown error',
        code: err instanceof Error && 'status' in err ? (err as any).status : 500
      }
      error.value = apiError
      throw apiError
    } finally {
      loading.value = false
    }
  }
  
  const reset = (): void => {
    data.value = null
    loading.value = false
    error.value = null
  }
  
  return {
    data,
    loading,
    error,
    execute,
    reset
  }
}

// Usage with specific types
export function useUsers() {
  return useApi<User[]>()
}

export function useUser() {
  return useApi<User>()
}
```

**4. Pinia Store with TypeScript:**

```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import type { User, CreateUserData, UpdateUserData } from '@/types/user'

// Store state interface
interface UserState {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
}

// Store actions interface
interface UserActions {
  fetchUsers(): Promise<void>
  fetchUser(id: number): Promise<User>
  createUser(userData: CreateUserData): Promise<User>
  updateUser(id: number, userData: UpdateUserData): Promise<User>
  deleteUser(id: number): Promise<void>
  setCurrentUser(user: User | null): void
  clearError(): void
}

// Store getters interface
interface UserGetters {
  getUserById: (id: number) => User | undefined
  activeUsers: User[]
  userCount: number
  isLoading: boolean
}

export const useUserStore = defineStore('user', (): UserState & UserActions & UserGetters => {
  // State
  const users: Ref<User[]> = ref([])
  const currentUser: Ref<User | null> = ref(null)
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  
  // Getters
  const getUserById = computed(() => {
    return (id: number): User | undefined => {
      return users.value.find(user => user.id === id)
    }
  })
  
  const activeUsers = computed((): User[] => {
    return users.value.filter(user => user.isActive)
  })
  
  const userCount = computed((): number => users.value.length)
  const isLoading = computed((): boolean => loading.value)
  
  // Actions
  const fetchUsers = async (): Promise<void> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`)
      }
      const data: User[] = await response.json()
      users.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const fetchUser = async (id: number): Promise<User> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/users/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`)
      }
      const user: User = await response.json()
      
      // Update users array if user exists
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = user
      } else {
        users.value.push(user)
      }
      
      return user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const createUser = async (userData: CreateUserData): Promise<User> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.statusText}`)
      }
      
      const newUser: User = await response.json()
      users.value.push(newUser)
      
      return newUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const updateUser = async (id: number, userData: UpdateUserData): Promise<User> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`)
      }
      
      const updatedUser: User = await response.json()
      
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      
      return updatedUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const deleteUser = async (id: number): Promise<void> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`)
      }
      
      users.value = users.value.filter(u => u.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const setCurrentUser = (user: User | null): void => {
    currentUser.value = user
  }
  
  const clearError = (): void => {
    error.value = null
  }
  
  return {
    // State
    users,
    currentUser,
    loading,
    error,
    // Getters
    getUserById,
    activeUsers,
    userCount,
    isLoading,
    // Actions
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    setCurrentUser,
    clearError
  }
})
```

**5. Type Definitions:**

```typescript
// types/user.ts
export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  preferences: UserPreferences
}

export type UserRole = 'admin' | 'user' | 'moderator'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    showEmail: boolean
    showLastLogin: boolean
  }
}

export interface CreateUserData {
  name: string
  email: string
  password: string
  role?: UserRole
  preferences?: Partial<UserPreferences>
}

export interface UpdateUserData {
  name?: string
  email?: string
  avatar?: string
  role?: UserRole
  isActive?: boolean
  preferences?: Partial<UserPreferences>
}

// API types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code: number
  field?: string
  details?: Record<string, any>
}
```

**6. Vue Router with TypeScript:**

```typescript
// router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { User } from '@/types/user'

// Extend route meta interface
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: string[]
    title?: string
    description?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
      description: 'Welcome to our application'
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin', 'moderator'],
      title: 'User Management'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true,
      title: 'My Profile'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard with TypeScript
router.beforeEach((to, from, next) => {
  const user: User | null = getCurrentUser() // Your auth logic
  
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' })
    return
  }
  
  if (to.meta.roles && user && !to.meta.roles.includes(user.role)) {
    next({ name: 'Unauthorized' })
    return
  }
  
  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - My App`
  }
  
  next()
})

function getCurrentUser(): User | null {
  // Your authentication logic here
  return null
}

export default router
```

**TypeScript Best Practices:**

1. **Use strict TypeScript configuration** for better type safety
2. **Define interfaces for all data structures** and API responses
3. **Use generic types** for reusable composables and utilities
4. **Leverage Vue 3's built-in TypeScript support** with `<script setup lang="ts">`
5. **Type your props, emits, and expose** properly
6. **Use type guards** for runtime type checking
7. **Create utility types** for common patterns
8. **Document complex types** with JSDoc comments
9. **Use enums or union types** for constrained values
10. **Test TypeScript integration** thoroughly

---

## Deployment

### Q14: How do you deploy Vue.js applications?
**Difficulty: Intermediate**

**Answer:**
Vue.js applications can be deployed to various platforms using different strategies.

**1. Build Process:**

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Build with custom configuration
vite build --mode production
```

**Vite Configuration for Production:**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // Output directory
    outDir: 'dist',
    // Generate source maps for production
    sourcemap: true,
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@headlessui/vue', '@heroicons/vue']
        }
      }
    },
    // Asset handling
    assetsDir: 'assets',
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  // Server configuration for preview
  preview: {
    port: 4173,
    host: true
  }
})
```

**2. Static Hosting (Netlify, Vercel, GitHub Pages):**

**Netlify Deployment:**

```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

# Redirect rules for SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers for security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"

# Cache static assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Vercel Deployment:**

```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**GitHub Actions for Deployment:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm run test:unit
      
    - name: Build
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

**3. Docker Deployment:**

```dockerfile
# Dockerfile
# Build stage
FROM node:18-alpine as build-stage

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine as production-stage

# Copy built application
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Nginx Configuration:**

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
        
        # Cache static assets
        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

**Docker Compose for Development:**

```yaml
# docker-compose.yml
version: '3.8'

services:
  vue-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  # Optional: Add a reverse proxy
  nginx-proxy:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx-proxy.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - vue-app
    restart: unless-stopped
```

**4. AWS S3 + CloudFront Deployment:**

```bash
#!/bin/bash
# deploy-aws.sh

# Build the application
npm run build

# Sync to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment completed!"
```

**AWS CLI Configuration:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

**5. Environment Configuration:**

```javascript
// .env.production
VITE_API_URL=https://api.yourapp.com
VITE_APP_NAME=Your App
VITE_APP_VERSION=1.0.0
VITE_SENTRY_DSN=your-sentry-dsn
VITE_ANALYTICS_ID=your-analytics-id

// .env.staging
VITE_API_URL=https://staging-api.yourapp.com
VITE_APP_NAME=Your App (Staging)
VITE_APP_VERSION=1.0.0-staging
```

**Environment-specific Build:**

```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "deploy:staging": "npm run build:staging && ./deploy-staging.sh",
    "deploy:production": "npm run build:production && ./deploy-production.sh"
  }
}
```

**6. Performance Optimization for Production:**

```javascript
// vite.config.js - Performance optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vue-vendor'
            }
            if (id.includes('lodash') || id.includes('date-fns')) {
              return 'utils-vendor'
            }
            return 'vendor'
          }
          
          // Feature-based chunks
          if (id.includes('/src/views/')) {
            return 'views'
          }
          if (id.includes('/src/components/')) {
            return 'components'
          }
        }
      }
    }
  },
  // Enable tree shaking
  esbuild: {
    drop: ['console', 'debugger']
  }
})
```

**Deployment Best Practices:**

1. **Use environment variables** for configuration
2. **Implement proper caching strategies** for static assets
3. **Enable gzip compression** for better performance
4. **Set up proper security headers** and CSP
5. **Use CDN** for global content delivery
6. **Implement health checks** for monitoring
7. **Set up automated deployments** with CI/CD
8. **Monitor application performance** and errors
9. **Use HTTPS** for all production deployments
10. **Implement proper error pages** and fallbacks

---

## Vue 3 Migration

### Q15: How do you migrate from Vue 2 to Vue 3?
**Difficulty: Advanced**

**Answer:**
Migrating from Vue 2 to Vue 3 requires careful planning and understanding of breaking changes.

**1. Migration Strategy:**

```bash
# Install Vue 3 migration build (compatibility layer)
npm install vue@next @vue/compat
npm install --save-dev @vue/compiler-sfc

# Update build tools
npm install --save-dev vite @vitejs/plugin-vue
# or for webpack
npm install --save-dev vue-loader@next
```

**Migration Build Configuration:**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2 // Vue 2 compatibility mode
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      vue: '@vue/compat'
    }
  }
})
```

**2. Breaking Changes and Solutions:**

**Global API Changes:**

```javascript
// Vue 2
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Vue 3
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
```

**Component API Migration:**

```vue
<!-- Vue 2 Component -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
    <user-list :users="users" @user-selected="onUserSelected" />
  </div>
</template>

<script>
import UserList from './UserList.vue'

export default {
  name: 'MyComponent',
  components: {
    UserList
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      count: 0,
      users: []
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  watch: {
    count(newVal, oldVal) {
      console.log(`Count changed from ${oldVal} to ${newVal}`)
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    increment() {
      this.count++
    },
    async fetchUsers() {
      try {
        const response = await fetch('/api/users')
        this.users = await response.json()
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    },
    onUserSelected(user) {
      this.$emit('user-selected', user)
    }
  }
}
</script>
```

```vue
<!-- Vue 3 Component (Composition API) -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
    <user-list :users="users" @user-selected="onUserSelected" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import UserList from './UserList.vue'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

// Emits
const emit = defineEmits(['user-selected'])

// Reactive state
const count = ref(0)
const users = ref([])

// Computed
const doubleCount = computed(() => count.value * 2)

// Watchers
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})

// Methods
const increment = () => {
  count.value++
}

const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users')
    users.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

const onUserSelected = (user) => {
  emit('user-selected', user)
}

// Lifecycle
onMounted(() => {
  fetchUsers()
})
</script>
```

**3. Router Migration (Vue Router 4):**

```javascript
// Vue Router 3 (Vue 2)
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// Vue Router 4 (Vue 3)
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

**4. State Management Migration (Vuex to Pinia):**

```javascript
// Vuex 3 (Vue 2)
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    users: []
  },
  getters: {
    doubleCount: state => state.count * 2,
    userCount: state => state.users.length
  },
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    SET_USERS(state, users) {
      state.users = users
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await fetch('/api/users')
        const users = await response.json()
        commit('SET_USERS', users)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
  }
})

// Pinia (Vue 3)
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
    users: []
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    userCount: (state) => state.users.length
  },
  actions: {
    increment() {
      this.count++
    },
    async fetchUsers() {
      try {
        const response = await fetch('/api/users')
        this.users = await response.json()
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
  }
})
```

**5. Event Bus Migration:**

```javascript
// Vue 2 - Event Bus
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()

// Component A
import { EventBus } from '@/event-bus'

export default {
  methods: {
    sendMessage() {
      EventBus.$emit('message-sent', 'Hello from Component A')
    }
  }
}

// Component B
import { EventBus } from '@/event-bus'

export default {
  created() {
    EventBus.$on('message-sent', this.handleMessage)
  },
  beforeDestroy() {
    EventBus.$off('message-sent', this.handleMessage)
  },
  methods: {
    handleMessage(message) {
      console.log('Received:', message)
    }
  }
}

// Vue 3 - Mitt (Event Emitter)
// event-bus.js
import mitt from 'mitt'
export const emitter = mitt()

// Component A
import { emitter } from '@/event-bus'

export default {
  setup() {
    const sendMessage = () => {
      emitter.emit('message-sent', 'Hello from Component A')
    }
    
    return { sendMessage }
  }
}

// Component B
import { onMounted, onUnmounted } from 'vue'
import { emitter } from '@/event-bus'

export default {
  setup() {
    const handleMessage = (message) => {
      console.log('Received:', message)
    }
    
    onMounted(() => {
      emitter.on('message-sent', handleMessage)
    })
    
    onUnmounted(() => {
      emitter.off('message-sent', handleMessage)
    })
  }
}
```

**6. Filter Migration:**

```javascript
// Vue 2 - Filters
Vue.filter('currency', (value) => {
  if (!value) return ''
  return '$' + value.toFixed(2)
})

// Template
// {{ price | currency }}

// Vue 3 - Computed Properties or Methods
// composables/useFilters.js
export function useFilters() {
  const currency = (value) => {
    if (!value) return ''
    return '$' + value.toFixed(2)
  }
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(date))
  }
  
  return {
    currency,
    formatDate
  }
}

// Component
<template>
  <div>{{ currency(price) }}</div>
</template>

<script setup>
import { useFilters } from '@/composables/useFilters'

const { currency } = useFilters()
const price = ref(29.99)
</script>
```

**7. Migration Checklist:**

```markdown
## Vue 3 Migration Checklist

### Dependencies
- [ ] Update Vue to 3.x
- [ ] Update Vue Router to 4.x
- [ ] Replace Vuex with Pinia (recommended)
- [ ] Update build tools (Vite recommended)
- [ ] Update testing libraries
- [ ] Update ESLint/TypeScript configs

### Breaking Changes
- [ ] Replace `new Vue()` with `createApp()`
- [ ] Update global API usage
- [ ] Replace filters with computed properties/methods
- [ ] Update event bus implementation
- [ ] Fix `$children` usage (removed)
- [ ] Update custom directive API
- [ ] Fix functional component syntax
- [ ] Update transition class names

### Component Updates
- [ ] Migrate to Composition API (optional but recommended)
- [ ] Update `$attrs` and `$listeners` usage
- [ ] Fix `v-model` custom components
- [ ] Update slot syntax
- [ ] Fix `$scopedSlots` usage

### Router Updates
- [ ] Update router creation syntax
- [ ] Fix navigation guard signatures
- [ ] Update `router.push` error handling
- [ ] Fix dynamic route matching

### Testing
- [ ] Update component tests
- [ ] Test all critical user flows
- [ ] Performance testing
- [ ] Cross-browser testing
```

**8. Gradual Migration Strategy:**

```javascript
// Step 1: Use migration build
// package.json
{
  "dependencies": {
    "vue": "^3.0.0",
    "@vue/compat": "^3.0.0"
  }
}

// Step 2: Configure compatibility mode
// vite.config.js
export default {
  resolve: {
    alias: {
      vue: '@vue/compat'
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    })
  ]
}

// Step 3: Gradually disable compatibility features
// Per-component compatibility
export default {
  compatConfig: {
    MODE: 3, // Vue 3 mode for this component
    FEATURE_X: false // Disable specific compatibility feature
  }
}

// Step 4: Remove compatibility build
// After all components are migrated
// package.json
{
  "dependencies": {
    "vue": "^3.0.0"
    // Remove @vue/compat
  }
}
```

**Migration Best Practices:**

1. **Start with the migration build** for gradual transition
2. **Update dependencies incrementally** to avoid conflicts
3. **Migrate leaf components first** (components with no children)
4. **Use TypeScript** for better migration safety
5. **Write comprehensive tests** before and after migration
6. **Consider Composition API** for new components
7. **Update build tools** to latest versions
8. **Monitor performance** during and after migration
9. **Train team members** on Vue 3 concepts
10. **Plan for rollback strategy** in case of issues

---

## Micro-frontends

### Q16: How do you implement micro-frontends with Vue.js?
**Difficulty: Advanced**

**Answer:**
Micro-frontends allow you to break down a large frontend application into smaller, manageable pieces that can be developed and deployed independently.

**1. Module Federation with Webpack:**

**Host Application Configuration:**

```javascript
// webpack.config.js (Host)
const ModuleFederationPlugin = require('@module-federation/webpack')

module.exports = {
  mode: 'development',
  devServer: {
    port: 3000
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        userModule: 'userModule@http://localhost:3001/remoteEntry.js',
        productModule: 'productModule@http://localhost:3002/remoteEntry.js',
        orderModule: 'orderModule@http://localhost:3003/remoteEntry.js'
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.0.0'
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '^4.0.0'
        },
        pinia: {
          singleton: true,
          requiredVersion: '^2.0.0'
        }
      }
    })
  ]
}
```

**Remote Application Configuration:**

```javascript
// webpack.config.js (User Module)
const ModuleFederationPlugin = require('@module-federation/webpack')

module.exports = {
  mode: 'development',
  devServer: {
    port: 3001
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'userModule',
      filename: 'remoteEntry.js',
      exposes: {
        './UserApp': './src/App.vue',
        './UserRoutes': './src/routes.js',
        './UserStore': './src/store.js'
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.0.0'
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '^4.0.0'
        },
        pinia: {
          singleton: true,
          requiredVersion: '^2.0.0'
        }
      }
    })
  ]
}
```

**2. Host Application Implementation:**

```vue
<!-- Host App.vue -->
<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/users">Users</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/orders">Orders</router-link>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
    
    <footer class="main-footer">
      <p>&copy; 2024 Micro-Frontend App</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMicroFrontendStore } from '@/stores/microfrontend'

const router = useRouter()
const microfrontendStore = useMicroFrontendStore()

onMounted(async () => {
  // Load micro-frontends dynamically
  await microfrontendStore.loadMicroFrontends()
  
  // Register routes from micro-frontends
  microfrontendStore.microFrontends.forEach(mf => {
    if (mf.routes) {
      mf.routes.forEach(route => {
        router.addRoute(route)
      })
    }
  })
})
</script>
```

**Host Router Configuration:**

```javascript
// router/index.js (Host)
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import MicroFrontendWrapper from '@/components/MicroFrontendWrapper.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users/:pathMatch(.*)*',
    name: 'Users',
    component: MicroFrontendWrapper,
    props: {
      microFrontendName: 'userModule',
      componentName: 'UserApp'
    }
  },
  {
    path: '/products/:pathMatch(.*)*',
    name: 'Products',
    component: MicroFrontendWrapper,
    props: {
      microFrontendName: 'productModule',
      componentName: 'ProductApp'
    }
  },
  {
    path: '/orders/:pathMatch(.*)*',
    name: 'Orders',
    component: MicroFrontendWrapper,
    props: {
      microFrontendName: 'orderModule',
      componentName: 'OrderApp'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

**3. Micro-Frontend Wrapper Component:**

```vue
<!-- MicroFrontendWrapper.vue -->
<template>
  <div class="microfrontend-wrapper">
    <div v-if="loading" class="loading">
      Loading {{ microFrontendName }}...
    </div>
    <div v-else-if="error" class="error">
      Failed to load {{ microFrontendName }}: {{ error }}
    </div>
    <component 
      v-else-if="component" 
      :is="component" 
      v-bind="componentProps"
      @navigate="handleNavigation"
      @error="handleError"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMicroFrontendStore } from '@/stores/microfrontend'

const props = defineProps({
  microFrontendName: {
    type: String,
    required: true
  },
  componentName: {
    type: String,
    required: true
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

const router = useRouter()
const route = useRoute()
const microfrontendStore = useMicroFrontendStore()

const component = ref(null)
const loading = ref(true)
const error = ref(null)

const loadComponent = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Dynamic import of micro-frontend component
    const module = await import(
      /* webpackIgnore: true */
      `${props.microFrontendName}/${props.componentName}`
    )
    
    component.value = defineAsyncComponent(() => 
      Promise.resolve(module.default || module)
    )
    
    // Register micro-frontend in store
    microfrontendStore.registerMicroFrontend({
      name: props.microFrontendName,
      component: component.value,
      loaded: true
    })
    
  } catch (err) {
    console.error(`Failed to load ${props.microFrontendName}:`, err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const handleNavigation = (path) => {
  router.push(path)
}

const handleError = (errorInfo) => {
  console.error('Micro-frontend error:', errorInfo)
  error.value = errorInfo.message
}

onMounted(() => {
  loadComponent()
})

watch(
  () => [props.microFrontendName, props.componentName],
  () => {
    loadComponent()
  }
)
</script>

<style scoped>
.microfrontend-wrapper {
  width: 100%;
  height: 100%;
}

.loading, .error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
  background-color: #fdf2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  padding: 1rem;
}
</style>
```

**4. Micro-Frontend Store:**

```javascript
// stores/microfrontend.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMicroFrontendStore = defineStore('microfrontend', () => {
  const microFrontends = ref(new Map())
  const loadingStates = ref(new Map())
  const errors = ref(new Map())
  
  const registeredMicroFrontends = computed(() => 
    Array.from(microFrontends.value.values())
  )
  
  const isLoading = computed(() => 
    Array.from(loadingStates.value.values()).some(loading => loading)
  )
  
  const registerMicroFrontend = (config) => {
    microFrontends.value.set(config.name, {
      ...config,
      registeredAt: new Date()
    })
    loadingStates.value.set(config.name, false)
    errors.value.delete(config.name)
  }
  
  const unregisterMicroFrontend = (name) => {
    microFrontends.value.delete(name)
    loadingStates.value.delete(name)
    errors.value.delete(name)
  }
  
  const setLoading = (name, loading) => {
    loadingStates.value.set(name, loading)
  }
  
  const setError = (name, error) => {
    errors.value.set(name, error)
    loadingStates.value.set(name, false)
  }
  
  const getMicroFrontend = (name) => {
    return microFrontends.value.get(name)
  }
  
  const isRegistered = (name) => {
    return microFrontends.value.has(name)
  }
  
  const loadMicroFrontends = async () => {
    // Load micro-frontend configurations from API or config
    const configs = await fetchMicroFrontendConfigs()
    
    for (const config of configs) {
      if (!isRegistered(config.name)) {
        setLoading(config.name, true)
        try {
          // Pre-load micro-frontend if needed
          await preloadMicroFrontend(config)
          registerMicroFrontend(config)
        } catch (error) {
          setError(config.name, error)
        }
      }
    }
  }
  
  const preloadMicroFrontend = async (config) => {
    // Optional: Pre-load micro-frontend resources
    if (config.preload) {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = config.remoteEntry
      document.head.appendChild(link)
    }
  }
  
  const fetchMicroFrontendConfigs = async () => {
    // In a real app, this would come from an API or configuration service
    return [
      {
        name: 'userModule',
        remoteEntry: 'http://localhost:3001/remoteEntry.js',
        routes: [
          {
            path: '/users',
            component: 'UserApp'
          }
        ],
        preload: true
      },
      {
        name: 'productModule',
        remoteEntry: 'http://localhost:3002/remoteEntry.js',
        routes: [
          {
            path: '/products',
            component: 'ProductApp'
          }
        ],
        preload: false
      }
    ]
  }
  
  return {
    microFrontends: registeredMicroFrontends,
    isLoading,
    registerMicroFrontend,
    unregisterMicroFrontend,
    setLoading,
    setError,
    getMicroFrontend,
    isRegistered,
    loadMicroFrontends
  }
})
```

**5. Remote Application (User Module):**

```vue
<!-- User Module App.vue -->
<template>
  <div class="user-module">
    <header class="module-header">
      <h1>User Management</h1>
      <nav class="module-nav">
        <router-link to="/users">List</router-link>
        <router-link to="/users/create">Create</router-link>
      </nav>
    </header>
    
    <main class="module-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

// Emit events to host application
const emit = defineEmits(['navigate', 'error'])

onMounted(async () => {
  try {
    await userStore.fetchUsers()
  } catch (error) {
    emit('error', { message: error.message, module: 'userModule' })
  }
})

// Handle navigation to other modules
const handleExternalNavigation = (path) => {
  emit('navigate', path)
}

// Expose methods for host application
defineExpose({
  navigateToUser: (userId) => {
    emit('navigate', `/users/${userId}`)
  },
  refreshData: () => {
    userStore.fetchUsers()
  }
})
</script>
```

**6. Communication Between Micro-Frontends:**

```javascript
// shared/eventBus.js
import mitt from 'mitt'

// Global event bus for micro-frontend communication
export const globalEventBus = mitt()

// Event types
export const EVENTS = {
  USER_CREATED: 'user:created',
  USER_UPDATED: 'user:updated',
  USER_DELETED: 'user:deleted',
  PRODUCT_SELECTED: 'product:selected',
  ORDER_PLACED: 'order:placed',
  NAVIGATION_REQUEST: 'navigation:request'
}

// Helper functions
export const emitGlobalEvent = (event, data) => {
  globalEventBus.emit(event, {
    ...data,
    timestamp: new Date().toISOString(),
    source: window.location.origin
  })
}

export const subscribeToGlobalEvent = (event, handler) => {
  globalEventBus.on(event, handler)
  
  // Return unsubscribe function
  return () => globalEventBus.off(event, handler)
}
```

**7. Shared State Management:**

```javascript
// shared/sharedStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSharedStore = defineStore('shared', () => {
  const currentUser = ref(null)
  const theme = ref('light')
  const notifications = ref([])
  
  const isAuthenticated = computed(() => !!currentUser.value)
  
  const setCurrentUser = (user) => {
    currentUser.value = user
    // Broadcast to other micro-frontends
    window.postMessage({
      type: 'USER_CHANGED',
      payload: user
    }, '*')
  }
  
  const setTheme = (newTheme) => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }
  
  const addNotification = (notification) => {
    notifications.value.push({
      id: Date.now(),
      ...notification,
      timestamp: new Date()
    })
  }
  
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  // Listen for messages from other micro-frontends
  window.addEventListener('message', (event) => {
    if (event.data.type === 'USER_CHANGED') {
      currentUser.value = event.data.payload
    }
  })
  
  return {
    currentUser,
    theme,
    notifications,
    isAuthenticated,
    setCurrentUser,
    setTheme,
    addNotification,
    removeNotification
  }
})
```

**Micro-Frontend Best Practices:**

1. **Keep micro-frontends independent** - minimize shared dependencies
2. **Use consistent design systems** across all micro-frontends
3. **Implement proper error boundaries** to prevent cascade failures
4. **Share common libraries** (Vue, Router, etc.) to reduce bundle size
5. **Use semantic versioning** for micro-frontend releases
6. **Implement health checks** for each micro-frontend
7. **Monitor performance** and loading times
8. **Use feature flags** for gradual rollouts
9. **Implement proper authentication** and authorization
10. **Document communication contracts** between micro-frontends

---

### Q17: How do you implement advanced Vue.js patterns and best practices?
**Difficulty: Advanced**

**Answer:**
Advanced Vue.js patterns help create maintainable, scalable, and performant applications.

**1. Compound Components Pattern:**

```vue
<!-- Accordion.vue (Parent Component) -->
<template>
  <div class="accordion" :class="{ 'accordion--multiple': multiple }">
    <slot />
  </div>
</template>

<script setup>
import { provide, ref, computed } from 'vue'

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  defaultOpen: {
    type: [String, Array],
    default: () => []
  }
})

const openItems = ref(
  Array.isArray(props.defaultOpen) 
    ? props.defaultOpen 
    : [props.defaultOpen]
)

const isOpen = (id) => openItems.value.includes(id)

const toggle = (id) => {
  if (props.multiple) {
    const index = openItems.value.indexOf(id)
    if (index > -1) {
      openItems.value.splice(index, 1)
    } else {
      openItems.value.push(id)
    }
  } else {
    openItems.value = isOpen(id) ? [] : [id]
  }
}

// Provide context to child components
provide('accordion', {
  isOpen,
  toggle,
  multiple: computed(() => props.multiple)
})
</script>
```

```vue
<!-- AccordionItem.vue (Child Component) -->
<template>
  <div class="accordion-item" :class="{ 'accordion-item--open': isItemOpen }">
    <slot 
      name="header" 
      :is-open="isItemOpen" 
      :toggle="toggleItem"
    >
      <button 
        class="accordion-header" 
        @click="toggleItem"
        :aria-expanded="isItemOpen"
      >
        {{ title }}
        <span class="accordion-icon" :class="{ 'rotated': isItemOpen }">
          ▼
        </span>
      </button>
    </slot>
    
    <transition name="accordion-content">
      <div v-show="isItemOpen" class="accordion-content">
        <div class="accordion-body">
          <slot :is-open="isItemOpen" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const accordion = inject('accordion')

const isItemOpen = computed(() => accordion.isOpen(props.id))
const toggleItem = () => accordion.toggle(props.id)
</script>

<style scoped>
.accordion-item {
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}

.accordion-header {
  width: 100%;
  padding: 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}

.accordion-icon {
  transition: transform 0.2s ease;
}

.accordion-icon.rotated {
  transform: rotate(180deg);
}

.accordion-content-enter-active,
.accordion-content-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-content-enter-from,
.accordion-content-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-content-enter-to,
.accordion-content-leave-from {
  max-height: 500px;
  opacity: 1;
}

.accordion-body {
  padding: 1rem;
}
</style>
```

**Usage:**

```vue
<template>
  <Accordion :multiple="true" :default-open="['item1']">
    <AccordionItem id="item1" title="First Item">
      <p>Content for first item</p>
    </AccordionItem>
    
    <AccordionItem id="item2" title="Second Item">
      <template #header="{ isOpen, toggle }">
        <button @click="toggle" class="custom-header">
          Custom Header {{ isOpen ? '−' : '+' }}
        </button>
      </template>
      <p>Content for second item</p>
    </AccordionItem>
    
    <AccordionItem id="item3" title="Third Item">
      <p>Content for third item</p>
    </AccordionItem>
  </Accordion>
</template>
```

**2. Higher-Order Components (HOCs):**

```javascript
// hocs/withLoading.js
import { defineComponent, ref, onMounted } from 'vue'

export function withLoading(WrappedComponent, loadingOptions = {}) {
  return defineComponent({
    name: `WithLoading(${WrappedComponent.name || 'Component'})`,
    props: {
      ...WrappedComponent.props,
      loadingDelay: {
        type: Number,
        default: loadingOptions.delay || 200
      }
    },
    setup(props, { slots, attrs, emit }) {
      const isLoading = ref(true)
      const showLoading = ref(false)
      const error = ref(null)
      
      let loadingTimer = null
      
      const startLoading = () => {
        isLoading.value = true
        error.value = null
        
        // Delay showing loading indicator to prevent flashing
        loadingTimer = setTimeout(() => {
          showLoading.value = true
        }, props.loadingDelay)
      }
      
      const stopLoading = () => {
        isLoading.value = false
        showLoading.value = false
        if (loadingTimer) {
          clearTimeout(loadingTimer)
          loadingTimer = null
        }
      }
      
      const setError = (err) => {
        error.value = err
        stopLoading()
      }
      
      onMounted(() => {
        // Auto-stop loading after component mounts
        setTimeout(stopLoading, 100)
      })
      
      return () => {
        if (showLoading.value) {
          return slots.loading?.() || (
            <div class="loading-wrapper">
              <div class="loading-spinner"></div>
              <p>Loading...</p>
            </div>
          )
        }
        
        if (error.value) {
          return slots.error?.({ error: error.value, retry: startLoading }) || (
            <div class="error-wrapper">
              <p>Error: {error.value.message}</p>
              <button onClick={startLoading}>Retry</button>
            </div>
          )
        }
        
        return (
          <WrappedComponent
            {...props}
            {...attrs}
            onStartLoading={startLoading}
            onStopLoading={stopLoading}
            onError={setError}
            v-slots={slots}
          />
        )
      }
    }
  })
}

// Usage
import UserList from './UserList.vue'
import { withLoading } from '@/hocs/withLoading'

const UserListWithLoading = withLoading(UserList, { delay: 300 })

export default UserListWithLoading
```

**3. Render Functions and JSX:**

```javascript
// components/DynamicList.js
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'DynamicList',
  props: {
    items: {
      type: Array,
      required: true
    },
    renderItem: {
      type: Function,
      required: true
    },
    keyField: {
      type: String,
      default: 'id'
    },
    emptyMessage: {
      type: String,
      default: 'No items found'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['item-click', 'item-select'],
  setup(props, { emit, slots }) {
    const selectedItems = ref(new Set())
    
    const isSelected = (item) => {
      return selectedItems.value.has(item[props.keyField])
    }
    
    const toggleSelection = (item) => {
      const key = item[props.keyField]
      if (selectedItems.value.has(key)) {
        selectedItems.value.delete(key)
      } else {
        selectedItems.value.add(key)
      }
      emit('item-select', {
        item,
        selected: selectedItems.value.has(key),
        selectedItems: Array.from(selectedItems.value)
      })
    }
    
    const handleItemClick = (item, event) => {
      emit('item-click', { item, event })
    }
    
    return () => {
      if (props.loading) {
        return (
          <div class="dynamic-list dynamic-list--loading">
            {slots.loading?.() || <div class="loading-spinner">Loading...</div>}
          </div>
        )
      }
      
      if (!props.items.length) {
        return (
          <div class="dynamic-list dynamic-list--empty">
            {slots.empty?.() || <p class="empty-message">{props.emptyMessage}</p>}
          </div>
        )
      }
      
      return (
        <div class="dynamic-list">
          {slots.header?.({ 
            itemCount: props.items.length,
            selectedCount: selectedItems.value.size 
          })}
          
          <ul class="dynamic-list__items">
            {props.items.map((item, index) => {
              const key = item[props.keyField]
              const selected = isSelected(item)
              
              return (
                <li 
                  key={key}
                  class={[
                    'dynamic-list__item',
                    { 'dynamic-list__item--selected': selected }
                  ]}
                  onClick={(event) => handleItemClick(item, event)}
                >
                  {props.renderItem({
                    item,
                    index,
                    selected,
                    toggleSelection: () => toggleSelection(item)
                  })}
                </li>
              )
            })}
          </ul>
          
          {slots.footer?.({ 
            itemCount: props.items.length,
            selectedCount: selectedItems.value.size 
          })}
        </div>
      )
    }
  }
})
```

**Usage:**

```vue
<template>
  <DynamicList
    :items="users"
    :render-item="renderUser"
    :loading="loading"
    key-field="id"
    @item-click="handleUserClick"
    @item-select="handleUserSelect"
  >
    <template #header="{ itemCount, selectedCount }">
      <div class="list-header">
        <h3>Users ({{ itemCount }})</h3>
        <p v-if="selectedCount">{{ selectedCount }} selected</p>
      </div>
    </template>
    
    <template #footer="{ selectedCount }">
      <div class="list-footer" v-if="selectedCount">
        <button @click="deleteSelected">Delete Selected</button>
      </div>
    </template>
  </DynamicList>
</template>

<script setup>
import { ref } from 'vue'
import DynamicList from '@/components/DynamicList'

const users = ref([])
const loading = ref(false)

const renderUser = ({ item: user, selected, toggleSelection }) => (
  <div class="user-item">
    <input 
      type="checkbox" 
      checked={selected}
      onChange={toggleSelection}
    />
    <img src={user.avatar} alt={user.name} class="user-avatar" />
    <div class="user-info">
      <h4>{user.name}</h4>
      <p>{user.email}</p>
    </div>
    <span class={`user-status user-status--${user.status}`}>
      {user.status}
    </span>
  </div>
)

const handleUserClick = ({ item, event }) => {
  console.log('User clicked:', item)
}

const handleUserSelect = ({ item, selected, selectedItems }) => {
  console.log('User selection changed:', { item, selected, selectedItems })
}

const deleteSelected = () => {
  // Handle bulk delete
}
</script>
```

**4. Advanced Composables Pattern:**

```javascript
// composables/useAsyncOperation.js
import { ref, computed, watch } from 'vue'

export function useAsyncOperation(operation, options = {}) {
  const {
    immediate = false,
    resetOnExecute = true,
    throwOnError = false,
    onSuccess,
    onError
  } = options
  
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const isFinished = ref(false)
  
  const isSuccess = computed(() => isFinished.value && !error.value)
  const isError = computed(() => isFinished.value && !!error.value)
  
  const execute = async (...args) => {
    if (resetOnExecute) {
      data.value = null
      error.value = null
    }
    
    isLoading.value = true
    isFinished.value = false
    
    try {
      const result = await operation(...args)
      data.value = result
      onSuccess?.(result)
      return result
    } catch (err) {
      error.value = err
      onError?.(err)
      if (throwOnError) {
        throw err
      }
    } finally {
      isLoading.value = false
      isFinished.value = true
    }
  }
  
  const reset = () => {
    data.value = null
    error.value = null
    isLoading.value = false
    isFinished.value = false
  }
  
  if (immediate) {
    execute()
  }
  
  return {
    data,
    error,
    isLoading,
    isFinished,
    isSuccess,
    isError,
    execute,
    reset
  }
}

// composables/useInfiniteScroll.js
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAsyncOperation } from './useAsyncOperation'

export function useInfiniteScroll(fetchFunction, options = {}) {
  const {
    threshold = 100,
    pageSize = 20,
    initialPage = 1,
    enabled = true
  } = options
  
  const items = ref([])
  const currentPage = ref(initialPage)
  const hasMore = ref(true)
  const container = ref(null)
  
  const {
    isLoading,
    error,
    execute: fetchPage
  } = useAsyncOperation(
    async (page) => {
      const response = await fetchFunction({
        page,
        pageSize,
        offset: (page - 1) * pageSize
      })
      return response
    },
    {
      onSuccess: (response) => {
        if (currentPage.value === 1) {
          items.value = response.data
        } else {
          items.value.push(...response.data)
        }
        
        hasMore.value = response.hasMore || response.data.length === pageSize
        currentPage.value++
      },
      onError: (err) => {
        console.error('Failed to fetch page:', err)
      }
    }
  )
  
  const loadMore = () => {
    if (!isLoading.value && hasMore.value && enabled) {
      fetchPage(currentPage.value)
    }
  }
  
  const reset = () => {
    items.value = []
    currentPage.value = initialPage
    hasMore.value = true
    fetchPage(initialPage)
  }
  
  const handleScroll = () => {
    if (!container.value || !enabled) return
    
    const { scrollTop, scrollHeight, clientHeight } = container.value
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    
    if (distanceFromBottom < threshold) {
      loadMore()
    }
  }
  
  onMounted(() => {
    if (container.value) {
      container.value.addEventListener('scroll', handleScroll)
    }
    
    // Load initial data
    fetchPage(initialPage)
  })
  
  onUnmounted(() => {
    if (container.value) {
      container.value.removeEventListener('scroll', handleScroll)
    }
  })
  
  return {
    items,
    isLoading,
    error,
    hasMore,
    container,
    loadMore,
    reset,
    currentPage: computed(() => currentPage.value)
  }
}

// composables/useFormValidation.js
import { ref, computed, watch } from 'vue'

export function useFormValidation(schema, options = {}) {
  const { validateOnChange = true, debounceMs = 300 } = options
  
  const formData = ref({})
  const errors = ref({})
  const touched = ref({})
  const isValidating = ref(false)
  
  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0
  })
  
  const isDirty = computed(() => {
    return Object.keys(touched.value).some(key => touched.value[key])
  })
  
  const validateField = async (fieldName, value) => {
    const fieldSchema = schema[fieldName]
    if (!fieldSchema) return
    
    isValidating.value = true
    
    try {
      const rules = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema]
      
      for (const rule of rules) {
        if (typeof rule === 'function') {
          const result = await rule(value, formData.value)
          if (result !== true) {
            errors.value[fieldName] = result
            return
          }
        } else if (rule.validator) {
          const result = await rule.validator(value, formData.value)
          if (result !== true) {
            errors.value[fieldName] = rule.message || result
            return
          }
        }
      }
      
      // If we get here, validation passed
      delete errors.value[fieldName]
    } catch (error) {
      errors.value[fieldName] = error.message
    } finally {
      isValidating.value = false
    }
  }
  
  const validateForm = async () => {
    const validationPromises = Object.keys(schema).map(fieldName => 
      validateField(fieldName, formData.value[fieldName])
    )
    
    await Promise.all(validationPromises)
    return isValid.value
  }
  
  const setFieldValue = (fieldName, value) => {
    formData.value[fieldName] = value
    touched.value[fieldName] = true
    
    if (validateOnChange) {
      // Debounce validation
      clearTimeout(setFieldValue.timer)
      setFieldValue.timer = setTimeout(() => {
        validateField(fieldName, value)
      }, debounceMs)
    }
  }
  
  const setFieldError = (fieldName, error) => {
    errors.value[fieldName] = error
  }
  
  const clearFieldError = (fieldName) => {
    delete errors.value[fieldName]
  }
  
  const reset = () => {
    formData.value = {}
    errors.value = {}
    touched.value = {}
  }
  
  return {
    formData,
    errors,
    touched,
    isValid,
    isDirty,
    isValidating,
    validateField,
    validateForm,
    setFieldValue,
    setFieldError,
    clearFieldError,
    reset
  }
}
```

**5. Plugin Development:**

```javascript
// plugins/toast.js
import { createApp, ref, reactive } from 'vue'
import ToastContainer from './ToastContainer.vue'

class ToastManager {
  constructor() {
    this.toasts = reactive([])
    this.container = null
    this.mounted = false
  }
  
  mount() {
    if (this.mounted) return
    
    const container = document.createElement('div')
    container.id = 'toast-container'
    document.body.appendChild(container)
    
    const app = createApp(ToastContainer, {
      toasts: this.toasts
    })
    
    app.mount(container)
    this.mounted = true
  }
  
  show(message, options = {}) {
    this.mount()
    
    const toast = {
      id: Date.now() + Math.random(),
      message,
      type: options.type || 'info',
      duration: options.duration || 3000,
      persistent: options.persistent || false,
      actions: options.actions || [],
      ...options
    }
    
    this.toasts.push(toast)
    
    if (!toast.persistent && toast.duration > 0) {
      setTimeout(() => {
        this.remove(toast.id)
      }, toast.duration)
    }
    
    return toast.id
  }
  
  remove(id) {
    const index = this.toasts.findIndex(toast => toast.id === id)
    if (index > -1) {
      this.toasts.splice(index, 1)
    }
  }
  
  clear() {
    this.toasts.splice(0)
  }
  
  success(message, options = {}) {
    return this.show(message, { ...options, type: 'success' })
  }
  
  error(message, options = {}) {
    return this.show(message, { ...options, type: 'error', duration: 5000 })
  }
  
  warning(message, options = {}) {
    return this.show(message, { ...options, type: 'warning' })
  }
  
  info(message, options = {}) {
    return this.show(message, { ...options, type: 'info' })
  }
}

const toastManager = new ToastManager()

export default {
  install(app, options = {}) {
    // Global properties
    app.config.globalProperties.$toast = toastManager
    
    // Provide/inject
    app.provide('toast', toastManager)
    
    // Global method
    app.config.globalProperties.$showToast = toastManager.show.bind(toastManager)
  }
}

export { toastManager as toast }

// Composable
export function useToast() {
  return toastManager
}
```

**Advanced Vue.js Best Practices:**

1. **Component Design Principles:**
   - Single Responsibility Principle
   - Composition over inheritance
   - Prop validation and defaults
   - Proper event naming conventions
   - Slot-first design for flexibility

2. **Performance Optimization:**
   - Use `v-memo` for expensive computations
   - Implement virtual scrolling for large lists
   - Lazy load components and routes
   - Optimize bundle splitting
   - Use `shallowRef` and `shallowReactive` when appropriate

3. **Code Organization:**
   - Feature-based folder structure
   - Composable-first approach
   - Consistent naming conventions
   - Proper TypeScript integration
   - Comprehensive testing strategy

4. **State Management:**
   - Use local state when possible
   - Pinia for global state
   - Proper state normalization
   - Optimistic updates
   - Error boundary patterns

5. **Developer Experience:**
   - ESLint and Prettier configuration
   - Vue DevTools integration
   - Hot module replacement
   - Comprehensive documentation
   - Automated testing pipeline

---

## Modern Development Tools

### Q18: How do you implement Vue.js with modern development tools and workflows?
**Difficulty: Advanced**

**Answer:**
Modern Vue.js development involves integrating various tools and workflows for optimal developer experience and production readiness.

**1. Vite Configuration for Vue.js:**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig as defineVitestConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      },
      template: {
        compilerOptions: {
          // Custom element support
          isCustomElement: (tag) => tag.startsWith('custom-')
        }
      }
    }),
    // Bundle analyzer
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@composables': resolve(__dirname, 'src/composables'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `
      }
    },
    modules: {
      localsConvention: 'camelCase'
    }
  },
  
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@headlessui/vue', '@heroicons/vue'],
          utils: ['lodash-es', 'date-fns']
        }
      }
    },
    sourcemap: true
  },
  
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js']
  },
  
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  }
})
```

**2. TypeScript Configuration:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@composables/*": ["./src/composables/*"],
      "@stores/*": ["./src/stores/*"],
      "@utils/*": ["./src/utils/*"],
      "@assets/*": ["./src/assets/*"]
    },
    "types": ["vite/client", "vitest/globals"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "references": [
    { "path": "./tsconfig.node.json" }
  ]
}
```

**3. ESLint and Prettier Configuration:**

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Vue-specific rules
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'error',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/define-macros-order': ['error', {
      'order': ['defineProps', 'defineEmits', 'defineExpose']
    }],
    'vue/no-undef-components': 'error',
    'vue/no-unused-components': 'error',
    'vue/prefer-import-from-vue': 'error',
    'vue/prefer-separate-static-class': 'error',
    
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // General rules
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 'error',
    'no-var': 'error'
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.{test,spec}.*'],
      env: {
        jest: true
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "vueIndentScriptAndStyle": true
}
```

**4. Testing Setup with Vitest and Vue Test Utils:**

```javascript
// src/test/setup.js
import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Global test setup
config.global.mocks = {
  $t: (key) => key, // Mock i18n
  $route: {
    path: '/',
    params: {},
    query: {}
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  }
}

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn()
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn()
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})
```

**5. GitHub Actions CI/CD Pipeline:**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
  
  build:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
  
  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Deploy to production
        run: |
          # Add your deployment script here
          echo "Deploying to production..."
```

**6. Package.json Scripts:**

```json
{
  "name": "vue-modern-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "lint:check": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/",
    "test:unit": "vitest",
    "test:unit:ui": "vitest --ui",
    "test:unit:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "analyze": "vite build --mode analyze",
    "prepare": "husky install"
  },
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "@vueuse/core": "^10.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.0",
    "@vue/test-utils": "^2.4.0",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^11.0.0",
    "eslint": "^8.45.0",
    "eslint-plugin-vue": "^9.15.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "vitest": "^0.34.0",
    "vue-tsc": "^1.8.0",
    "@playwright/test": "^1.36.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.2.0",
    "rollup-plugin-visualizer": "^5.9.0"
  },
  "lint-staged": {
    "*.{vue,js,ts}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

**7. Environment Configuration:**

```typescript
// src/config/env.ts
interface AppConfig {
  apiUrl: string
  appName: string
  version: string
  environment: 'development' | 'staging' | 'production'
  features: {
    analytics: boolean
    debugging: boolean
    mockApi: boolean
  }
}

const config: AppConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  appName: import.meta.env.VITE_APP_NAME || 'Vue App',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: (import.meta.env.VITE_ENVIRONMENT as AppConfig['environment']) || 'development',
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debugging: import.meta.env.VITE_ENABLE_DEBUGGING === 'true',
    mockApi: import.meta.env.VITE_MOCK_API === 'true'
  }
}

export default config
```

```bash
# .env.development
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Vue App (Dev)
VITE_ENVIRONMENT=development
VITE_ENABLE_DEBUGGING=true
VITE_MOCK_API=true
VITE_ENABLE_ANALYTICS=false

# .env.production
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Vue App
VITE_ENVIRONMENT=production
VITE_ENABLE_DEBUGGING=false
VITE_MOCK_API=false
VITE_ENABLE_ANALYTICS=true
```

**Modern Development Workflow Best Practices:**

1. **Development Environment:**
   - Hot Module Replacement (HMR)
   - TypeScript integration
   - ESLint + Prettier automation
   - Git hooks with Husky
   - VS Code extensions and settings

2. **Testing Strategy:**
   - Unit tests with Vitest
   - Component testing with Vue Test Utils
   - E2E testing with Playwright
   - Visual regression testing
   - Coverage reporting

3. **Build Optimization:**
   - Tree shaking
   - Code splitting
   - Bundle analysis
   - Asset optimization
   - Progressive Web App features

4. **Deployment:**
   - Environment-specific builds
   - Automated CI/CD pipelines
   - Docker containerization
   - CDN integration
   - Monitoring and analytics

5. **Code Quality:**
   - Consistent code formatting
   - Type safety with TypeScript
   - Automated linting
   - Pre-commit hooks
   - Code review processes

---

## Internationalization and Accessibility

### Q19: How do you implement Vue.js with internationalization (i18n) and accessibility?
**Difficulty: Advanced**

**Answer:**
Implementing internationalization and accessibility in Vue.js applications ensures your app reaches a global audience and is usable by everyone.

**1. Vue I18n Setup and Configuration:**

```javascript
// src/i18n/index.js
import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'

// Import locale messages
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

const SUPPORT_LOCALES = ['en', 'es', 'fr', 'de']
const DEFAULT_LOCALE = 'en'

// Get saved locale from localStorage or browser preference
function getStartingLocale() {
  const saved = localStorage.getItem('user-locale')
  if (saved && SUPPORT_LOCALES.includes(saved)) {
    return saved
  }
  
  // Check browser language
  const browserLocale = navigator.language.split('-')[0]
  if (SUPPORT_LOCALES.includes(browserLocale)) {
    return browserLocale
  }
  
  return DEFAULT_LOCALE
}

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getStartingLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  globalInjection: true,
  messages: {
    en,
    es,
    fr,
    de
  },
  // Number formats
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    },
    es: {
      currency: {
        style: 'currency',
        currency: 'EUR',
        notation: 'standard'
      }
    },
    fr: {
      currency: {
        style: 'currency',
        currency: 'EUR',
        notation: 'standard'
      }
    },
    de: {
      currency: {
        style: 'currency',
        currency: 'EUR',
        notation: 'standard'
      }
    }
  },
  // Date time formats
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    es: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }
    }
  }
})

// Async locale loading
export async function loadLocaleMessages(locale) {
  if (i18n.global.availableLocales.includes(locale)) {
    return nextTick()
  }
  
  try {
    const messages = await import(`./locales/${locale}.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
    return nextTick()
  } catch (error) {
    console.error(`Failed to load locale ${locale}:`, error)
    throw error
  }
}

// Set locale with persistence
export async function setI18nLanguage(locale) {
  await loadLocaleMessages(locale)
  i18n.global.locale.value = locale
  localStorage.setItem('user-locale', locale)
  document.querySelector('html').setAttribute('lang', locale)
  document.querySelector('html').setAttribute('dir', getTextDirection(locale))
}

// Get text direction for RTL languages
function getTextDirection(locale) {
  const rtlLocales = ['ar', 'he', 'fa', 'ur']
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}

export { SUPPORT_LOCALES }
export default i18n
```

**2. Locale Files Structure:**

```json
// src/i18n/locales/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "search": "Search",
    "filter": "Filter",
    "sort": "Sort",
    "actions": "Actions"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "profile": "Profile",
    "settings": "Settings",
    "logout": "Logout"
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "forgotPassword": "Forgot Password?",
    "rememberMe": "Remember me",
    "loginSuccess": "Login successful",
    "loginError": "Invalid credentials",
    "validation": {
      "required": "This field is required",
      "email": "Please enter a valid email",
      "minLength": "Minimum {min} characters required",
      "passwordMatch": "Passwords do not match"
    }
  },
  "user": {
    "profile": {
      "title": "User Profile",
      "firstName": "First Name",
      "lastName": "Last Name",
      "bio": "Biography",
      "avatar": "Profile Picture",
      "updateSuccess": "Profile updated successfully"
    },
    "preferences": {
      "language": "Language",
      "theme": "Theme",
      "notifications": "Notifications",
      "privacy": "Privacy Settings"
    }
  },
  "products": {
    "title": "Products",
    "addToCart": "Add to Cart",
    "outOfStock": "Out of Stock",
    "price": "Price",
    "description": "Description",
    "reviews": {
      "title": "Reviews",
      "count": "No reviews | {count} review | {count} reviews",
      "average": "Average rating: {rating} stars"
    }
  },
  "cart": {
    "title": "Shopping Cart",
    "empty": "Your cart is empty",
    "total": "Total: {amount}",
    "checkout": "Proceed to Checkout",
    "items": {
      "quantity": "Quantity",
      "remove": "Remove item",
      "update": "Update quantity"
    }
  },
  "dates": {
    "today": "Today",
    "yesterday": "Yesterday",
    "tomorrow": "Tomorrow",
    "lastWeek": "Last week",
    "nextWeek": "Next week",
    "relative": {
      "justNow": "Just now",
      "minutesAgo": "{minutes} minute ago | {minutes} minutes ago",
      "hoursAgo": "{hours} hour ago | {hours} hours ago",
      "daysAgo": "{days} day ago | {days} days ago"
    }
  }
}
```

**3. Vue Components with I18n:**

```vue
<!-- components/LanguageSwitcher.vue -->
<template>
  <div class="language-switcher">
    <label for="language-select" class="sr-only">
      {{ $t('user.preferences.language') }}
    </label>
    <select
      id="language-select"
      v-model="currentLocale"
      @change="changeLanguage"
      class="language-select"
      :aria-label="$t('user.preferences.language')"
    >
      <option
        v-for="locale in supportedLocales"
        :key="locale.code"
        :value="locale.code"
      >
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setI18nLanguage, SUPPORT_LOCALES } from '@/i18n'

const { locale } = useI18n()

const supportedLocales = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }
]

const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value
  }
})

const changeLanguage = async (event) => {
  const newLocale = event.target.value
  try {
    await setI18nLanguage(newLocale)
    // Announce language change to screen readers
    announceToScreenReader(`Language changed to ${newLocale}`)
  } catch (error) {
    console.error('Failed to change language:', error)
  }
}

const announceToScreenReader = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.language-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  cursor: pointer;
}

.language-select:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

**4. Accessibility Implementation:**

```vue
<!-- components/AccessibleModal.vue -->
<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="modal-overlay"
      @click="closeOnOverlay && close()"
      @keydown.esc="close"
    >
      <div
        ref="modalRef"
        class="modal"
        role="dialog"
        :aria-labelledby="titleId"
        :aria-describedby="descriptionId"
        aria-modal="true"
        tabindex="-1"
        @click.stop
      >
        <div class="modal-header">
          <h2 :id="titleId" class="modal-title">
            <slot name="title">{{ title }}</slot>
          </h2>
          <button
            class="modal-close"
            @click="close"
            :aria-label="$t('common.close')"
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        
        <div :id="descriptionId" class="modal-body">
          <slot />
        </div>
        
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFocusTrap } from '@/composables/useFocusTrap'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const { t } = useI18n()
const modalRef = ref(null)
const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`
const descriptionId = `modal-desc-${Math.random().toString(36).substr(2, 9)}`

let previousActiveElement = null

// Focus trap composable
const { trapFocus, releaseFocus } = useFocusTrap()

const close = () => {
  emit('close')
}

// Handle modal opening
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    // Store the previously focused element
    previousActiveElement = document.activeElement
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    
    await nextTick()
    
    // Focus the modal and trap focus
    if (modalRef.value) {
      modalRef.value.focus()
      trapFocus(modalRef.value)
    }
    
    // Announce modal opening to screen readers
    announceToScreenReader(t('common.modalOpened'))
  } else {
    // Restore body scroll
    document.body.style.overflow = ''
    
    // Release focus trap
    releaseFocus()
    
    // Restore focus to previously focused element
    if (previousActiveElement) {
      previousActiveElement.focus()
      previousActiveElement = null
    }
  }
})

// Handle escape key globally
const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  // Cleanup on unmount
  if (props.isOpen) {
    document.body.style.overflow = ''
    releaseFocus()
  }
})

const announceToScreenReader = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'assertive')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  outline: none;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: #6b7280;
  transition: all 0.2s;
}

.modal-close:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-close:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

**5. Focus Trap Composable:**

```javascript
// composables/useFocusTrap.js
import { ref } from 'vue'

export function useFocusTrap() {
  const trapElement = ref(null)
  let firstFocusableElement = null
  let lastFocusableElement = null
  
  const focusableSelectors = [
    'button',
    '[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ')
  
  const trapFocus = (element) => {
    trapElement.value = element
    
    const focusableElements = element.querySelectorAll(focusableSelectors)
    const visibleFocusableElements = Array.from(focusableElements).filter(
      el => {
        const style = window.getComputedStyle(el)
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               !el.disabled
      }
    )
    
    firstFocusableElement = visibleFocusableElements[0]
    lastFocusableElement = visibleFocusableElements[visibleFocusableElements.length - 1]
    
    element.addEventListener('keydown', handleTabKey)
    
    // Focus first element
    if (firstFocusableElement) {
      firstFocusableElement.focus()
    }
  }
  
  const releaseFocus = () => {
    if (trapElement.value) {
      trapElement.value.removeEventListener('keydown', handleTabKey)
      trapElement.value = null
    }
    firstFocusableElement = null
    lastFocusableElement = null
  }
  
  const handleTabKey = (event) => {
    if (event.key !== 'Tab') return
    
    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        event.preventDefault()
        lastFocusableElement?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableElement) {
        event.preventDefault()
        firstFocusableElement?.focus()
      }
    }
  }
  
  return {
    trapFocus,
    releaseFocus
  }
}
```

**6. Accessible Form Component:**

```vue
<!-- components/AccessibleForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <fieldset>
      <legend class="form-legend">{{ $t('auth.login') }}</legend>
      
      <div class="form-group">
        <label for="email" class="form-label">
          {{ $t('auth.email') }}
          <span class="required" aria-label="required">*</span>
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="form-input"
          :class="{ 'error': errors.email }"
          :aria-describedby="errors.email ? 'email-error' : undefined"
          :aria-invalid="!!errors.email"
          autocomplete="email"
          required
        />
        <div
          v-if="errors.email"
          id="email-error"
          class="error-message"
          role="alert"
          aria-live="polite"
        >
          {{ errors.email }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="password" class="form-label">
          {{ $t('auth.password') }}
          <span class="required" aria-label="required">*</span>
        </label>
        <div class="password-input-wrapper">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            class="form-input"
            :class="{ 'error': errors.password }"
            :aria-describedby="errors.password ? 'password-error' : 'password-help'"
            :aria-invalid="!!errors.password"
            autocomplete="current-password"
            required
          />
          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? $t('auth.hidePassword') : $t('auth.showPassword')"
          >
            <span aria-hidden="true">{{ showPassword ? '🙈' : '👁️' }}</span>
          </button>
        </div>
        <div
          id="password-help"
          class="help-text"
          v-if="!errors.password"
        >
          {{ $t('auth.passwordHelp') }}
        </div>
        <div
          v-if="errors.password"
          id="password-error"
          class="error-message"
          role="alert"
          aria-live="polite"
        >
          {{ errors.password }}
        </div>
      </div>
      
      <div class="form-group">
        <label class="checkbox-label">
          <input
            v-model="form.rememberMe"
            type="checkbox"
            class="checkbox-input"
          />
          <span class="checkbox-text">{{ $t('auth.rememberMe') }}</span>
        </label>
      </div>
      
      <div class="form-actions">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitting"
          :aria-describedby="isSubmitting ? 'loading-message' : undefined"
        >
          <span v-if="isSubmitting" id="loading-message" aria-live="polite">
            {{ $t('common.loading') }}
          </span>
          <span v-else>{{ $t('auth.login') }}</span>
        </button>
        
        <a href="#" class="forgot-password-link">
          {{ $t('auth.forgotPassword') }}
        </a>
      </div>
    </fieldset>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = ref({})
const isSubmitting = ref(false)
const showPassword = ref(false)

const validateForm = () => {
  const newErrors = {}
  
  if (!form.email) {
    newErrors.email = t('auth.validation.required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = t('auth.validation.email')
  }
  
  if (!form.password) {
    newErrors.password = t('auth.validation.required')
  } else if (form.password.length < 8) {
    newErrors.password = t('auth.validation.minLength', { min: 8 })
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    // Announce validation errors to screen readers
    const errorCount = Object.keys(errors.value).length
    announceToScreenReader(t('auth.validation.errorsFound', { count: errorCount }))
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    announceToScreenReader(t('auth.loginSuccess'))
  } catch (error) {
    announceToScreenReader(t('auth.loginError'))
  } finally {
    isSubmitting.value = false
  }
}

const announceToScreenReader = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'assertive')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
</script>

<style scoped>
.form-legend {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.required {
  color: #dc2626;
  margin-left: 0.25rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error {
  border-color: #dc2626;
}

.form-input.error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
}

.password-toggle:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.help-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.error-message {
  font-size: 0.875rem;
  color: #dc2626;
  margin-top: 0.25rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-input {
  margin-right: 0.5rem;
}

.checkbox-input:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.forgot-password-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: center;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

.forgot-password-link:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 0.25rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

**I18n and Accessibility Best Practices:**

1. **Internationalization:**
   - Use semantic keys for translations
   - Support pluralization and interpolation
   - Implement lazy loading for locale files
   - Handle RTL languages properly
   - Format numbers, dates, and currencies correctly
   - Provide fallback languages

2. **Accessibility:**
   - Use semantic HTML elements
   - Provide proper ARIA labels and descriptions
   - Implement focus management
   - Support keyboard navigation
   - Use proper color contrast ratios
   - Provide alternative text for images
   - Announce dynamic content changes
   - Support screen readers

3. **Testing:**
   - Test with screen readers
   - Validate HTML semantics
   - Check color contrast
   - Test keyboard navigation
   - Verify ARIA attributes
   - Test with different languages

---

## Enterprise Patterns

### Q20: How do you implement Vue.js enterprise patterns and architecture?
**Difficulty: Expert**

**Answer:**
Enterprise Vue.js applications require robust architecture patterns, scalable code organization, and comprehensive development practices.

**1. Enterprise Project Structure:**

```
src/
├── api/                    # API layer
│   ├── clients/           # HTTP clients
│   ├── endpoints/         # API endpoints
│   ├── interceptors/      # Request/response interceptors
│   ├── types/            # API type definitions
│   └── index.js
├── assets/                # Static assets
│   ├── images/
│   ├── icons/
│   └── styles/
├── components/            # Reusable components
│   ├── base/             # Base components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── composables/           # Composition functions
│   ├── api/              # API composables
│   ├── business/         # Business logic composables
│   └── ui/               # UI composables
├── constants/             # Application constants
├── directives/            # Custom directives
├── features/              # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   └── index.js
│   ├── dashboard/
│   └── user-management/
├── guards/                # Route guards
├── i18n/                  # Internationalization
├── layouts/               # Page layouts
├── middleware/            # Application middleware
├── plugins/               # Vue plugins
├── router/                # Routing configuration
├── stores/                # Global state management
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── views/                 # Page components
└── main.js
```

**2. API Layer Architecture:**

```typescript
// api/clients/httpClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import config from '@/config'

interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  errors?: Record<string, string[]>
}

class HttpClient {
  private client: AxiosInstance
  private authStore = useAuthStore()
  private notificationStore = useNotificationStore()

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token
        const token = this.authStore.token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId()

        // Add tenant ID for multi-tenant apps
        const tenantId = this.authStore.currentTenant?.id
        if (tenantId) {
          config.headers['X-Tenant-ID'] = tenantId
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // Handle successful responses
        if (response.data.message) {
          this.notificationStore.addNotification({
            type: 'success',
            message: response.data.message
          })
        }
        return response
      },
      async (error) => {
        // Handle errors
        if (error.response?.status === 401) {
          await this.authStore.logout()
          window.location.href = '/login'
          return Promise.reject(error)
        }

        if (error.response?.status === 403) {
          this.notificationStore.addNotification({
            type: 'error',
            message: 'You do not have permission to perform this action'
          })
        }

        if (error.response?.status >= 500) {
          this.notificationStore.addNotification({
            type: 'error',
            message: 'A server error occurred. Please try again later.'
          })
        }

        return Promise.reject(error)
      }
    )
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, config)
    return response.data.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url, config)
    return response.data.data
  }

  // File upload with progress
  async uploadFile<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(progress)
        }
      }
    })

    return response.data.data
  }
}

export const httpClient = new HttpClient(config.apiUrl)
export default httpClient
```

**3. Feature-Based Architecture:**

```typescript
// features/user-management/stores/userStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '../api/userApi'
import type { User, CreateUserRequest, UpdateUserRequest, UserFilters } from '../types'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })
  const filters = ref<UserFilters>({})

  // Getters
  const activeUsers = computed(() => 
    users.value.filter(user => user.status === 'active')
  )
  
  const usersByRole = computed(() => {
    const grouped: Record<string, User[]> = {}
    users.value.forEach(user => {
      if (!grouped[user.role]) {
        grouped[user.role] = []
      }
      grouped[user.role].push(user)
    })
    return grouped
  })

  // Actions
  const fetchUsers = async (page = 1, limit = 20, userFilters: UserFilters = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await userApi.getUsers({
        page,
        limit,
        ...userFilters
      })

      users.value = response.data
      pagination.value = {
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages
      }
      filters.value = userFilters
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch users'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const user = await userApi.getUser(id)
      currentUser.value = user
      return user
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData: CreateUserRequest) => {
    loading.value = true
    error.value = null

    try {
      const newUser = await userApi.createUser(userData)
      users.value.unshift(newUser)
      pagination.value.total++
      return newUser
    } catch (err: any) {
      error.value = err.message || 'Failed to create user'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id: string, userData: UpdateUserRequest) => {
    loading.value = true
    error.value = null

    try {
      const updatedUser = await userApi.updateUser(id, userData)
      const index = users.value.findIndex(user => user.id === id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      if (currentUser.value?.id === id) {
        currentUser.value = updatedUser
      }
      return updatedUser
    } catch (err: any) {
      error.value = err.message || 'Failed to update user'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await userApi.deleteUser(id)
      users.value = users.value.filter(user => user.id !== id)
      pagination.value.total--
      if (currentUser.value?.id === id) {
        currentUser.value = null
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to delete user'
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkUpdateUsers = async (userIds: string[], updates: Partial<User>) => {
    loading.value = true
    error.value = null

    try {
      const updatedUsers = await userApi.bulkUpdateUsers(userIds, updates)
      
      // Update local state
      updatedUsers.forEach(updatedUser => {
        const index = users.value.findIndex(user => user.id === updatedUser.id)
        if (index !== -1) {
          users.value[index] = updatedUser
        }
      })
      
      return updatedUsers
    } catch (err: any) {
      error.value = err.message || 'Failed to update users'
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      return await fetchUsers()
    }

    return await fetchUsers(1, 20, { search: query })
  }

  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    users.value = []
    currentUser.value = null
    loading.value = false
    error.value = null
    pagination.value = {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0
    }
    filters.value = {}
  }

  return {
    // State
    users,
    currentUser,
    loading,
    error,
    pagination,
    filters,
    
    // Getters
    activeUsers,
    usersByRole,
    
    // Actions
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    bulkUpdateUsers,
    searchUsers,
    clearError,
    resetState
  }
})
```

**4. Enterprise Composables:**

```typescript
// composables/business/useDataTable.ts
import { ref, computed, watch } from 'vue'
import { debounce } from 'lodash-es'

interface DataTableOptions<T> {
  fetchData: (params: any) => Promise<{ data: T[], total: number }>
  pageSize?: number
  searchDebounce?: number
  sortable?: boolean
  filterable?: boolean
}

interface SortConfig {
  field: string
  direction: 'asc' | 'desc'
}

export function useDataTable<T>(options: DataTableOptions<T>) {
  const {
    fetchData,
    pageSize = 20,
    searchDebounce = 300,
    sortable = true,
    filterable = true
  } = options

  // State
  const data = ref<T[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalItems = ref(0)
  const searchQuery = ref('')
  const sortConfig = ref<SortConfig | null>(null)
  const filters = ref<Record<string, any>>({})
  const selectedItems = ref<Set<string>>(new Set())

  // Computed
  const totalPages = computed(() => Math.ceil(totalItems.value / pageSize))
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPreviousPage = computed(() => currentPage.value > 1)
  const selectedCount = computed(() => selectedItems.value.size)
  const isAllSelected = computed(() => {
    return data.value.length > 0 && selectedItems.value.size === data.value.length
  })
  const isPartiallySelected = computed(() => {
    return selectedItems.value.size > 0 && selectedItems.value.size < data.value.length
  })

  // Methods
  const loadData = async () => {
    loading.value = true
    error.value = null

    try {
      const params = {
        page: currentPage.value,
        limit: pageSize,
        search: searchQuery.value,
        sort: sortConfig.value,
        filters: filters.value
      }

      const response = await fetchData(params)
      data.value = response.data
      totalItems.value = response.total
    } catch (err: any) {
      error.value = err.message || 'Failed to load data'
      data.value = []
      totalItems.value = 0
    } finally {
      loading.value = false
    }
  }

  const refresh = () => {
    loadData()
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (hasPreviousPage.value) {
      currentPage.value--
    }
  }

  const sort = (field: string) => {
    if (!sortable) return

    if (sortConfig.value?.field === field) {
      // Toggle direction
      sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc'
    } else {
      // New sort field
      sortConfig.value = { field, direction: 'asc' }
    }
  }

  const clearSort = () => {
    sortConfig.value = null
  }

  const setFilter = (key: string, value: any) => {
    if (!filterable) return

    if (value === null || value === undefined || value === '') {
      delete filters.value[key]
    } else {
      filters.value[key] = value
    }
    currentPage.value = 1 // Reset to first page when filtering
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
  }

  const search = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1 // Reset to first page when searching
  }

  const selectItem = (id: string) => {
    selectedItems.value.add(id)
  }

  const deselectItem = (id: string) => {
    selectedItems.value.delete(id)
  }

  const toggleItem = (id: string) => {
    if (selectedItems.value.has(id)) {
      deselectItem(id)
    } else {
      selectItem(id)
    }
  }

  const selectAll = () => {
    data.value.forEach((item: any) => {
      selectedItems.value.add(item.id)
    })
  }

  const deselectAll = () => {
    selectedItems.value.clear()
  }

  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      deselectAll()
    } else {
      selectAll()
    }
  }

  const getSelectedItems = () => {
    return data.value.filter((item: any) => selectedItems.value.has(item.id))
  }

  // Debounced search
  const debouncedSearch = debounce((query: string) => {
    search(query)
  }, searchDebounce)

  // Watchers
  watch([currentPage, sortConfig, filters], () => {
    loadData()
  }, { deep: true })

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery)
  })

  // Initial load
  loadData()

  return {
    // State
    data,
    loading,
    error,
    currentPage,
    totalItems,
    searchQuery,
    sortConfig,
    filters,
    selectedItems,

    // Computed
    totalPages,
    hasNextPage,
    hasPreviousPage,
    selectedCount,
    isAllSelected,
    isPartiallySelected,

    // Methods
    loadData,
    refresh,
    goToPage,
    nextPage,
    previousPage,
    sort,
    clearSort,
    setFilter,
    clearFilters,
    search,
    selectItem,
    deselectItem,
    toggleItem,
    selectAll,
    deselectAll,
    toggleSelectAll,
    getSelectedItems
  }
}
```

**5. Error Boundary and Monitoring:**

```typescript
// composables/useErrorBoundary.ts
import { ref, onErrorCaptured } from 'vue'
import { useNotificationStore } from '@/stores/notifications'
import { errorReportingService } from '@/services/errorReporting'

interface ErrorInfo {
  error: Error
  timestamp: Date
  component?: string
  route?: string
  userId?: string
  sessionId?: string
}

export function useErrorBoundary() {
  const hasError = ref(false)
  const errorInfo = ref<ErrorInfo | null>(null)
  const notificationStore = useNotificationStore()

  const captureError = (error: Error, component?: string) => {
    const info: ErrorInfo = {
      error,
      timestamp: new Date(),
      component,
      route: window.location.pathname,
      userId: getCurrentUserId(),
      sessionId: getSessionId()
    }

    errorInfo.value = info
    hasError.value = true

    // Report to monitoring service
    errorReportingService.reportError(info)

    // Show user notification
    notificationStore.addNotification({
      type: 'error',
      title: 'An error occurred',
      message: 'Something went wrong. Our team has been notified.',
      persistent: true
    })

    console.error('Error captured:', error)
  }

  const resetError = () => {
    hasError.value = false
    errorInfo.value = null
  }

  const retry = () => {
    resetError()
    // Trigger component re-render or action retry
  }

  // Capture Vue component errors
  onErrorCaptured((error, instance, info) => {
    captureError(error, instance?.$options.name || 'Unknown')
    return false // Prevent error from propagating
  })

  // Capture global JavaScript errors
  window.addEventListener('error', (event) => {
    captureError(event.error)
  })

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureError(new Error(event.reason))
  })

  return {
    hasError,
    errorInfo,
    captureError,
    resetError,
    retry
  }
}

function getCurrentUserId(): string | undefined {
  // Get current user ID from auth store
  return undefined
}

function getSessionId(): string {
  // Get or generate session ID
  return 'session-id'
}
```

**Enterprise Vue.js Best Practices:**

1. **Architecture Principles:**
   - Feature-based organization
   - Separation of concerns
   - Dependency injection
   - SOLID principles
   - Domain-driven design

2. **Code Quality:**
   - TypeScript for type safety
   - Comprehensive testing strategy
   - Code review processes
   - Automated quality gates
   - Documentation standards

3. **Performance:**
   - Lazy loading strategies
   - Bundle optimization
   - Caching mechanisms
   - Performance monitoring
   - Memory leak prevention

4. **Security:**
   - Input validation
   - XSS prevention
   - CSRF protection
   - Secure authentication
   - Role-based access control

5. **Monitoring:**
   - Error tracking
   - Performance metrics
   - User analytics
   - Application logs
   - Health checks

---

**Defining Stores:**

```javascript
// stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '@/api/user'

// Option 1: Setup Stores (Composition API style)
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const preferences = ref({
    theme: 'light',
    language: 'en',
    notifications: true
  })
  
  // Getters (computed)
  const isAuthenticated = computed(() => !!user.value)
  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // Actions
  const login = async (credentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await userApi.login(credentials)
      user.value = response.user
      localStorage.setItem('token', response.token)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const logout = async () => {
    try {
      await userApi.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      localStorage.removeItem('token')
    }
  }
  
  const updateProfile = async (profileData) => {
    loading.value = true
    try {
      const updatedUser = await userApi.updateProfile(profileData)
      user.value = { ...user.value, ...updatedUser }
      return updatedUser
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const updatePreferences = (newPreferences) => {
    preferences.value = { ...preferences.value, ...newPreferences }
    localStorage.setItem('userPreferences', JSON.stringify(preferences.value))
  }
  
  const loadPreferences = () => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      preferences.value = JSON.parse(saved)
    }
  }
  
  const resetError = () => {
    error.value = null
  }
  
  return {
    // State
    user,
    loading,
    error,
    preferences,
    // Getters
    isAuthenticated,
    fullName,
    isAdmin,
    // Actions
    login,
    logout,
    updateProfile,
    updatePreferences,
    loadPreferences,
    resetError
  }
})

// Option 2: Options Stores (Options API style)
export const useUserStoreOptions = defineStore('userOptions', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: true
    }
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName}`
    },
    isAdmin: (state) => state.user?.role === 'admin'
  },
  
  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        const response = await userApi.login(credentials)
        this.user = response.user
        localStorage.setItem('token', response.token)
        return response
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      try {
        await userApi.logout()
      } catch (err) {
        console.error('Logout error:', err)
      } finally {
        this.user = null
        localStorage.removeItem('token')
      }
    }
  }
})
```

**Using Stores in Components:**

```vue
<template>
  <div class="user-dashboard">
    <div v-if="userStore.loading" class="loading">
      Loading...
    </div>
    
    <div v-else-if="userStore.error" class="error">
      {{ userStore.error }}
      <button @click="userStore.resetError">Dismiss</button>
    </div>
    
    <div v-else-if="userStore.isAuthenticated" class="dashboard">
      <h1>Welcome, {{ userStore.fullName }}!</h1>
      
      <div class="user-info">
        <img :src="userStore.user.avatar" :alt="userStore.fullName" />
        <p>Email: {{ userStore.user.email }}</p>
        <p>Role: {{ userStore.user.role }}</p>
        <button v-if="userStore.isAdmin" @click="goToAdmin">
          Admin Panel
        </button>
      </div>
      
      <div class="preferences">
        <h3>Preferences</h3>
        <label>
          Theme:
          <select 
            :value="userStore.preferences.theme" 
            @change="updateTheme($event.target.value)"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        
        <label>
          <input 
            type="checkbox" 
            :checked="userStore.preferences.notifications"
            @change="toggleNotifications"
          />
          Enable Notifications
        </label>
      </div>
      
      <button @click="userStore.logout">Logout</button>
    </div>
    
    <LoginForm v-else @login="handleLogin" />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'UserDashboard',
  components: {
    LoginForm
  },
  setup() {
    const userStore = useUserStore()
    
    // Load preferences on mount
    userStore.loadPreferences()
    
    const handleLogin = async (credentials) => {
      try {
        await userStore.login(credentials)
      } catch (error) {
        // Error is already handled in store
        console.error('Login failed:', error)
      }
    }
    
    const updateTheme = (theme) => {
      userStore.updatePreferences({ theme })
      document.body.className = `theme-${theme}`
    }
    
    const toggleNotifications = () => {
      userStore.updatePreferences({
        notifications: !userStore.preferences.notifications
      })
    }
    
    const goToAdmin = () => {
      // Navigation logic
    }
    
    return {
      userStore,
      handleLogin,
      updateTheme,
      toggleNotifications,
      goToAdmin
    }
  }
}
</script>
```

**Advanced Pinia Patterns:**

```javascript
// stores/todos.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])
  const filter = ref('all') // 'all', 'active', 'completed'
  const loading = ref(false)
  
  // Using other stores
  const userStore = useUserStore()
  
  // Getters
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })
  
  const completedCount = computed(() => {
    return todos.value.filter(todo => todo.completed).length
  })
  
  const activeCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length
  })
  
  const allCompleted = computed(() => {
    return todos.value.length > 0 && todos.value.every(todo => todo.completed)
  })
  
  // Actions
  const addTodo = async (text) => {
    if (!userStore.isAuthenticated) {
      throw new Error('Must be logged in to add todos')
    }
    
    const todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      userId: userStore.user.id,
      createdAt: new Date().toISOString()
    }
    
    todos.value.push(todo)
    
    try {
      const savedTodo = await todosApi.create(todo)
      // Update with server response
      const index = todos.value.findIndex(t => t.id === todo.id)
      if (index > -1) {
        todos.value[index] = savedTodo
      }
    } catch (error) {
      // Remove optimistic update on error
      todos.value = todos.value.filter(t => t.id !== todo.id)
      throw error
    }
  }
  
  const toggleTodo = async (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (!todo) return
    
    // Optimistic update
    todo.completed = !todo.completed
    
    try {
      await todosApi.update(id, { completed: todo.completed })
    } catch (error) {
      // Revert on error
      todo.completed = !todo.completed
      throw error
    }
  }
  
  const deleteTodo = async (id) => {
    const index = todos.value.findIndex(t => t.id === id)
    if (index === -1) return
    
    // Store for potential rollback
    const deletedTodo = todos.value[index]
    
    // Optimistic delete
    todos.value.splice(index, 1)
    
    try {
      await todosApi.delete(id)
    } catch (error) {
      // Restore on error
      todos.value.splice(index, 0, deletedTodo)
      throw error
    }
  }
  
  const loadTodos = async () => {
    if (!userStore.isAuthenticated) return
    
    loading.value = true
    try {
      const userTodos = await todosApi.getByUser(userStore.user.id)
      todos.value = userTodos
    } catch (error) {
      console.error('Failed to load todos:', error)
    } finally {
      loading.value = false
    }
  }
  
  const clearCompleted = async () => {
    const completedTodos = todos.value.filter(todo => todo.completed)
    const completedIds = completedTodos.map(todo => todo.id)
    
    // Optimistic update
    todos.value = todos.value.filter(todo => !todo.completed)
    
    try {
      await Promise.all(completedIds.map(id => todosApi.delete(id)))
    } catch (error) {
      // Restore on error
      todos.value = [...todos.value, ...completedTodos]
      throw error
    }
  }
  
  const toggleAll = async () => {
    const shouldComplete = !allCompleted.value
    const originalTodos = [...todos.value]
    
    // Optimistic update
    todos.value.forEach(todo => {
      todo.completed = shouldComplete
    })
    
    try {
      await Promise.all(
        todos.value.map(todo => 
          todosApi.update(todo.id, { completed: shouldComplete })
        )
      )
    } catch (error) {
      // Restore on error
      todos.value = originalTodos
      throw error
    }
  }
  
  const setFilter = (newFilter) => {
    filter.value = newFilter
  }
  
  // Reset store
  const $reset = () => {
    todos.value = []
    filter.value = 'all'
    loading.value = false
  }
  
  return {
    // State
    todos,
    filter,
    loading,
    // Getters
    filteredTodos,
    completedCount,
    activeCount,
    allCompleted,
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    loadTodos,
    clearCompleted,
    toggleAll,
    setFilter,
    $reset
  }
})
```

**Store Composition and Plugins:**

```javascript
// plugins/persistence.js
export function createPersistedState(options = {}) {
  return (context) => {
    const { store } = context
    const key = options.key || store.$id
    
    // Load initial state
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        store.$patch(parsed)
      } catch (error) {
        console.error('Failed to parse saved state:', error)
      }
    }
    
    // Save on state changes
    store.$subscribe((mutation, state) => {
      localStorage.setItem(key, JSON.stringify(state))
    })
  }
}

// Apply plugin
const pinia = createPinia()
pinia.use(createPersistedState())

// Store with plugin
export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('light')
  const language = ref('en')
  
  return { theme, language }
}, {
  persist: true // Custom option for plugin
})
```

**Testing Pinia Stores:**

```javascript
// tests/stores/user.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import { userApi } from '@/api/user'

// Mock API
vi.mock('@/api/user')

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('should login successfully', async () => {
    const store = useUserStore()
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' }
    const mockResponse = { user: mockUser, token: 'mock-token' }
    
    userApi.login.mockResolvedValue(mockResponse)
    
    await store.login({ email: 'john@example.com', password: 'password' })
    
    expect(store.user).toEqual(mockUser)
    expect(store.isAuthenticated).toBe(true)
    expect(localStorage.getItem('token')).toBe('mock-token')
  })
  
  it('should handle login error', async () => {
    const store = useUserStore()
    const error = new Error('Invalid credentials')
    
    userApi.login.mockRejectedValue(error)
    
    await expect(store.login({ email: 'wrong@example.com', password: 'wrong' }))
      .rejects.toThrow('Invalid credentials')
    
    expect(store.user).toBeNull()
    expect(store.error).toBe('Invalid credentials')
    expect(store.isAuthenticated).toBe(false)
  })
  
  it('should logout successfully', async () => {
    const store = useUserStore()
    store.user = { id: 1, name: 'John Doe' }
    
    await store.logout()
    
    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
  })
})
```

---vue
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