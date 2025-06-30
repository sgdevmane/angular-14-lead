# React Native Interview Questions and Answers

## Table of Contents
1. [React Native Fundamentals](#react-native-fundamentals)
2. [Navigation](#navigation)
3. [State Management](#state-management)
4. [Native Modules and APIs](#native-modules-and-apis)
5. [Performance Optimization](#performance-optimization)
6. [Platform-Specific Development](#platform-specific-development)
7. [Testing](#testing)
8. [Deployment and Distribution](#deployment-and-distribution)
9. [Advanced Patterns](#advanced-patterns)

---

## React Native Fundamentals

### 1. What is React Native and how does it differ from React?

**Answer:**
React Native is a framework for building mobile applications using React and JavaScript. It allows developers to create native mobile apps for iOS and Android using a single codebase.

**Key Differences:**

| Aspect | React | React Native |
|--------|-------|-------------|
| **Platform** | Web browsers | iOS and Android |
| **Rendering** | DOM elements | Native components |
| **Styling** | CSS | StyleSheet API |
| **Navigation** | React Router | React Navigation |
| **APIs** | Web APIs | Native device APIs |
| **Build Output** | Web bundle | Native app bundle |

```javascript
// React (Web) Component
import React from 'react'

function WebComponent() {
  return (
    <div className="container">
      <h1>Hello Web</h1>
      <button onClick={() => alert('Clicked!')}>Click me</button>
    </div>
  )
}

// React Native Component
import React from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'

function NativeComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Mobile</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => Alert.alert('Clicked!')}
      >
        <Text style={styles.buttonText}>Click me</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})
```

**Architecture Comparison:**

```javascript
// React Native Architecture
const ReactNativeArchitecture = {
  // JavaScript Thread
  jsThread: {
    components: 'React Components',
    businessLogic: 'Application Logic',
    stateManagement: 'Redux/Context/Zustand'
  },
  
  // Bridge (Communication Layer)
  bridge: {
    serialization: 'JSON serialization',
    asynchronous: 'Async communication',
    batching: 'Event batching'
  },
  
  // Native Thread
  nativeThread: {
    rendering: 'Native UI components',
    apis: 'Platform-specific APIs',
    performance: 'Native performance'
  }
}

// New Architecture (Fabric + TurboModules)
const NewArchitecture = {
  fabric: {
    description: 'New rendering system',
    benefits: ['Synchronous layout', 'Better performance', 'Type safety']
  },
  turboModules: {
    description: 'New native module system',
    benefits: ['Lazy loading', 'Type safety', 'Better performance']
  },
  jsi: {
    description: 'JavaScript Interface',
    benefits: ['Direct JS-Native communication', 'No bridge serialization']
  }
}
```

### 2. How do you handle styling in React Native?

**Answer:**
React Native uses a StyleSheet API that's similar to CSS but with some differences. Styles are written in JavaScript objects and use camelCase property names.

```javascript
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

// 1. Basic StyleSheet usage
const BasicStyling = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Styled Component</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Card Content</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5 // Android shadow
  },
  cardText: {
    fontSize: 16,
    color: '#666'
  }
})

// 2. Dynamic styling
const DynamicStyling = ({ isActive, theme }) => {
  const dynamicStyles = StyleSheet.create({
    button: {
      backgroundColor: isActive ? theme.primary : theme.secondary,
      padding: 12,
      borderRadius: 6,
      opacity: isActive ? 1 : 0.7
    },
    text: {
      color: isActive ? 'white' : theme.textColor,
      fontWeight: isActive ? 'bold' : 'normal'
    }
  })

  return (
    <View style={dynamicStyles.button}>
      <Text style={dynamicStyles.text}>Dynamic Button</Text>
    </View>
  )
}

// 3. Responsive styling
const { width, height } = Dimensions.get('window')

const ResponsiveStyling = () => {
  const isTablet = width > 768
  const isLandscape = width > height

  return (
    <View style={[
      responsiveStyles.container,
      isTablet && responsiveStyles.tabletContainer,
      isLandscape && responsiveStyles.landscapeContainer
    ]}>
      <Text style={[
        responsiveStyles.text,
        isTablet && responsiveStyles.tabletText
      ]}>
        Responsive Text
      </Text>
    </View>
  )
}

const responsiveStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // 5% of screen width
    justifyContent: 'center'
  },
  tabletContainer: {
    padding: 40,
    maxWidth: 600,
    alignSelf: 'center'
  },
  landscapeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: width * 0.04, // 4% of screen width
    lineHeight: width * 0.06
  },
  tabletText: {
    fontSize: 18,
    lineHeight: 24
  }
})

// 4. Platform-specific styling
import { Platform } from 'react-native'

const PlatformStyling = () => {
  return (
    <View style={platformStyles.container}>
      <Text style={platformStyles.text}>Platform Specific</Text>
    </View>
  )
}

const platformStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : 0, // iOS status bar
    ...Platform.select({
      ios: {
        backgroundColor: '#f8f8f8'
      },
      android: {
        backgroundColor: '#ffffff'
      }
    })
  },
  text: {
    ...Platform.select({
      ios: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16
      },
      android: {
        fontFamily: 'Roboto',
        fontSize: 14
      }
    })
  }
})

// 5. Styled components pattern
const createStyledComponent = (baseStyle, variants = {}) => {
  return ({ variant, style, ...props }) => {
    const combinedStyle = [
      baseStyle,
      variants[variant],
      style
    ].filter(Boolean)

    return <View style={combinedStyle} {...props} />
  }
}

const StyledCard = createStyledComponent(
  {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8
  },
  {
    elevated: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    outlined: {
      borderWidth: 1,
      borderColor: '#e0e0e0'
    }
  }
)

// Usage
const StyledComponentExample = () => {
  return (
    <View>
      <StyledCard variant="elevated">
        <Text>Elevated Card</Text>
      </StyledCard>
      <StyledCard variant="outlined">
        <Text>Outlined Card</Text>
      </StyledCard>
    </View>
  )
}
```

### 3. How do you manage component lifecycle in React Native?

**Answer:**
React Native uses the same lifecycle methods as React, but with additional considerations for mobile app states and native events.

```javascript
import React, { Component, useEffect, useState } from 'react'
import { View, Text, AppState, BackHandler } from 'react-native'

// 1. Class Component Lifecycle
class LifecycleExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      appState: AppState.currentState
    }
    console.log('Constructor: Component initialized')
  }

  componentDidMount() {
    console.log('ComponentDidMount: Component mounted')
    
    // Subscribe to app state changes
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange
    )
    
    // Subscribe to back button (Android)
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    )
    
    // Fetch initial data
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('ComponentDidUpdate: Component updated')
    
    // Check if important props changed
    if (prevProps.userId !== this.props.userId) {
      this.fetchData()
    }
    
    // Check if app became active
    if (prevState.appState !== 'active' && this.state.appState === 'active') {
      this.refreshData()
    }
  }

  componentWillUnmount() {
    console.log('ComponentWillUnmount: Cleanup')
    
    // Remove event listeners
    this.appStateSubscription?.remove()
    this.backHandler?.remove()
    
    // Cancel any pending requests
    this.cancelPendingRequests()
  }

  handleAppStateChange = (nextAppState) => {
    console.log('App state changed:', nextAppState)
    this.setState({ appState: nextAppState })
  }

  handleBackPress = () => {
    // Handle back button press
    console.log('Back button pressed')
    return true // Prevent default behavior
  }

  fetchData = async () => {
    try {
      const response = await fetch(`/api/users/${this.props.userId}`)
      const data = await response.json()
      this.setState({ data })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  refreshData = () => {
    console.log('Refreshing data after app became active')
    this.fetchData()
  }

  cancelPendingRequests = () => {
    // Cancel any ongoing network requests
    console.log('Cancelling pending requests')
  }

  render() {
    console.log('Render: Component rendering')
    
    return (
      <View>
        <Text>App State: {this.state.appState}</Text>
        <Text>Data: {JSON.stringify(this.state.data)}</Text>
      </View>
    )
  }
}

// 2. Functional Component with Hooks
const FunctionalLifecycleExample = ({ userId }) => {
  const [data, setData] = useState(null)
  const [appState, setAppState] = useState(AppState.currentState)
  const [isLoading, setIsLoading] = useState(false)

  // Equivalent to componentDidMount
  useEffect(() => {
    console.log('Component mounted')
    
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )
    
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    )
    
    // Cleanup function (equivalent to componentWillUnmount)
    return () => {
      console.log('Component unmounting')
      appStateSubscription?.remove()
      backHandler?.remove()
    }
  }, [])

  // Equivalent to componentDidUpdate for userId changes
  useEffect(() => {
    if (userId) {
      fetchData(userId)
    }
  }, [userId])

  // Handle app state changes
  useEffect(() => {
    if (appState === 'active') {
      console.log('App became active, refreshing data')
      if (userId) {
        fetchData(userId)
      }
    }
  }, [appState, userId])

  const handleAppStateChange = (nextAppState) => {
    console.log('App state changed:', nextAppState)
    setAppState(nextAppState)
  }

  const handleBackPress = () => {
    console.log('Back button pressed')
    return true
  }

  const fetchData = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/users/${id}`)
      const userData = await response.json()
      setData(userData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View>
      <Text>App State: {appState}</Text>
      <Text>Loading: {isLoading ? 'Yes' : 'No'}</Text>
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  )
}

// 3. Custom Hook for App Lifecycle
const useAppLifecycle = () => {
  const [appState, setAppState] = useState(AppState.currentState)
  const [isAppActive, setIsAppActive] = useState(true)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppState(nextAppState)
      setIsAppActive(nextAppState === 'active')
    })

    return () => subscription?.remove()
  }, [])

  return { appState, isAppActive }
}

// 4. Custom Hook for Back Handler
const useBackHandler = (handler) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handler)
    return () => backHandler.remove()
  }, [handler])
}

// 5. Component using custom hooks
const OptimizedComponent = ({ userId }) => {
  const [data, setData] = useState(null)
  const { isAppActive } = useAppLifecycle()
  
  useBackHandler(() => {
    console.log('Back pressed in optimized component')
    return false // Allow default behavior
  })

  useEffect(() => {
    if (isAppActive && userId) {
      fetchUserData(userId)
    }
  }, [isAppActive, userId])

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`)
      const userData = await response.json()
      setData(userData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <View>
      <Text>App Active: {isAppActive ? 'Yes' : 'No'}</Text>
      <Text>User Data: {JSON.stringify(data)}</Text>
    </View>
  )
}
```

**Mobile-Specific Lifecycle Considerations:**

```javascript
// App state management for mobile
const AppStateManager = {
  // App states
  states: {
    active: 'App is running in the foreground',
    background: 'App is running in the background',
    inactive: 'App is transitioning between states'
  },
  
  // Best practices
  bestPractices: {
    onActive: [
      'Refresh data',
      'Resume timers',
      'Resume animations',
      'Check for updates'
    ],
    onBackground: [
      'Save user data',
      'Pause timers',
      'Pause animations',
      'Clear sensitive data'
    ],
    onInactive: [
      'Prepare for state change',
      'Save current state'
    ]
  }
}
```

### 4. How do you handle forms and user input in React Native?

**Answer:**
React Native provides several components for handling user input, with TextInput being the primary component for text-based input.

```javascript
import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet
} from 'react-native'

// 1. Basic Form with Validation
const BasicForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs for input focus management
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      Alert.alert('Success', 'Form submitted successfully!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      Alert.alert('Error', 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign Up</Text>
        
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Enter your name"
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            ref={emailRef}
            style={[styles.input, errors.email && styles.inputError]}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            ref={passwordRef}
            style={[styles.input, errors.password && styles.inputError]}
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            placeholder="Enter your password"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            blurOnSubmit={false}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            ref={confirmPasswordRef}
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            placeholder="Confirm your password"
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

// 2. Advanced Form with Custom Components
const CustomInput = ({ 
  label, 
  error, 
  value, 
  onChangeText, 
  inputRef,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles.customInputContainer}>
      <Text style={[styles.customLabel, isFocused && styles.labelFocused]}>
        {label}
      </Text>
      <TextInput
        ref={inputRef}
        style={[
          styles.customInput,
          isFocused && styles.inputFocused,
          error && styles.inputError
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

// 3. Form Hook for Reusability
const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const setValue = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const setFieldTouched = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const validate = () => {
    const newErrors = {}
    
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field]
      const value = values[field]
      
      if (rule.required && (!value || !value.toString().trim())) {
        newErrors[field] = rule.required
      } else if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = rule.patternMessage
      } else if (rule.minLength && value.length < rule.minLength) {
        newErrors[field] = `Minimum ${rule.minLength} characters required`
      } else if (rule.custom) {
        const customError = rule.custom(value, values)
        if (customError) {
          newErrors[field] = customError
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0
  }
}

// 4. Using the Form Hook
const AdvancedForm = () => {
  const validationRules = {
    email: {
      required: 'Email is required',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMessage: 'Please enter a valid email'
    },
    password: {
      required: 'Password is required',
      minLength: 8
    },
    confirmPassword: {
      required: 'Please confirm your password',
      custom: (value, allValues) => {
        if (value !== allValues.password) {
          return 'Passwords do not match'
        }
        return null
      }
    }
  }

  const form = useForm(
    { email: '', password: '', confirmPassword: '' },
    validationRules
  )

  const handleSubmit = () => {
    if (form.validate()) {
      console.log('Form is valid:', form.values)
      // Submit form
      form.reset()
    }
  }

  return (
    <View style={styles.container}>
      <CustomInput
        label="Email"
        value={form.values.email}
        onChangeText={(value) => form.setValue('email', value)}
        onBlur={() => form.setFieldTouched('email')}
        error={form.touched.email && form.errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <CustomInput
        label="Password"
        value={form.values.password}
        onChangeText={(value) => form.setValue('password', value)}
        onBlur={() => form.setFieldTouched('password')}
        error={form.touched.password && form.errors.password}
        secureTextEntry
      />
      
      <CustomInput
        label="Confirm Password"
        value={form.values.confirmPassword}
        onChangeText={(value) => form.setValue('confirmPassword', value)}
        onBlur={() => form.setFieldTouched('confirmPassword')}
        error={form.touched.confirmPassword && form.errors.confirmPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={[styles.button, !form.isValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!form.isValid}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333'
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white'
  },
  inputError: {
    borderColor: '#ff4444'
  },
  inputFocused: {
    borderColor: '#007AFF',
    borderWidth: 2
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonDisabled: {
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  customInputContainer: {
    marginBottom: 20
  },
  customLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#666'
  },
  labelFocused: {
    color: '#007AFF'
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white'
  }
})
```

This comprehensive form handling example demonstrates validation, focus management, custom components, and reusable form logic that's essential for React Native development.

---

## Navigation

### 5. How do you implement navigation in React Native?

**Answer:**
React Native uses React Navigation library for handling navigation between screens. It provides various navigation patterns including stack, tab, and drawer navigation.

```javascript
// Installation and setup
// npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer
// npm install react-native-screens react-native-safe-area-context react-native-gesture-handler

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

// 1. Basic Stack Navigation
const Stack = createStackNavigator()

const HomeScreen = ({ navigation, route }) => {
  const { userName } = route.params || {}
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Home Screen</Text>
      {userName && <Text>Welcome, {userName}!</Text>}
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          itemTitle: 'Sample Item'
        })}
      >
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile', {
          userId: 123,
          userName: 'John Doe'
        })}
      >
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

const DetailsScreen = ({ navigation, route }) => {
  const { itemId, itemTitle } = route.params
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Item Title: {itemTitle}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home', {
          userName: 'Updated User'
        })}
      >
        <Text style={styles.buttonText}>Back to Home with Data</Text>
      </TouchableOpacity>
    </View>
  )
}

const ProfileScreen = ({ navigation, route }) => {
  const { userId, userName } = route.params
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text>User ID: {userId}</Text>
      <Text>User Name: {userName}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

// Stack Navigator
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'My Home',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => Alert.alert('Info', 'This is the home screen')}
              style={{ marginRight: 15 }}
            >
              <Icon name="information-circle" size={24} color="white" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.itemTitle || 'Details'
        })}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'User Profile',
          headerBackTitle: 'Back'
        }}
      />
    </Stack.Navigator>
  )
}

// 2. Tab Navigation
const Tab = createBottomTabNavigator()

const FeedScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Feed Screen</Text>
  </View>
)

const SearchScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Search Screen</Text>
  </View>
)

const NotificationsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Notifications Screen</Text>
  </View>
)

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          
          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline'
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline'
          }
          
          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60
        }
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          tabBarBadge: 3
        }}
      />
    </Tab.Navigator>
  )
}

// 3. Drawer Navigation
const Drawer = createDrawerNavigator()

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>
      
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={20} color="#333" />
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="settings" size={20} color="#333" />
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => Alert.alert('Logout', 'Are you sure?')}
      >
        <Icon name="log-out" size={20} color="#ff4444" />
        <Text style={[styles.drawerItemText, { color: '#ff4444' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Settings Screen</Text>
  </View>
)

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 240
        },
        headerStyle: {
          backgroundColor: '#007AFF'
        },
        headerTintColor: '#fff'
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  )
}

// 4. Nested Navigation
const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeStack" 
        component={StackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

// 5. Navigation with Authentication
const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Simulate login
    navigation.replace('App')
  }
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Login Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Main" component={MainTabNavigator} />
    </AppStack.Navigator>
  )
}

// 6. Root Navigator with Authentication State
const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

// 7. Navigation Hooks and Utilities
const useNavigationHelpers = () => {
  const navigation = useNavigation()
  
  const navigateWithReset = (routeName, params = {}) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routeName, params }]
    })
  }
  
  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('Home')
    }
  }
  
  const navigateWithDelay = (routeName, params = {}, delay = 1000) => {
    setTimeout(() => {
      navigation.navigate(routeName, params)
    }, delay)
  }
  
  return {
    navigateWithReset,
    navigateBack,
    navigateWithDelay
  }
}

// 8. Deep Linking Configuration
const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: 'home',
      Details: 'details/:itemId',
      Profile: 'profile/:userId'
    }
  }
}

// Main App Component
const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 16
  }
})

export default App
```

This comprehensive navigation example covers stack navigation, tab navigation, drawer navigation, nested navigation, authentication flows, and advanced navigation patterns commonly used in React Native applications.

---

## State Management

### 6. How do you manage state in React Native applications?

**Answer:**
React Native applications can use various state management solutions depending on the complexity and requirements. Here are the most common approaches:

```javascript
// 1. Local State with useState
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

const LocalStateExample = () => {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: `Todo ${todos.length + 1}`,
      completed: false
    }
    setTodos(prev => [...prev, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Count: {count}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCount(prev => prev + 1)}
      >
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTodo(item.id)}>
            <Text style={[
              styles.todoItem,
              item.completed && styles.completedTodo
            ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

// 2. Context API for Global State
import React, { createContext, useContext, useReducer } from 'react'

// User Context
const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    isAuthenticated: false,
    loading: false
  })

  const login = async (credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Simulate API call
      const user = await authenticateUser(credentials)
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const updateProfile = (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData })
  }

  return (
    <UserContext.Provider value={{
      ...state,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

// Using the Context
const ProfileScreen = () => {
  const { user, updateProfile, logout } = useUser()

  const handleUpdateProfile = () => {
    updateProfile({ name: 'Updated Name' })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name}</Text>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

// 3. Redux with Redux Toolkit
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

// Async thunk for API calls
const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/todos/${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Todo slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      })
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    isAuthenticated: false,
    preferences: {
      theme: 'light',
      notifications: true
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.profile = null
      state.isAuthenticated = false
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload }
    }
  }
})

// Store configuration
const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

// Redux component
const ReduxTodoList = () => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.todos)
  const { profile } = useSelector(state => state.user)

  useEffect(() => {
    if (profile?.id) {
      dispatch(fetchTodos(profile.id))
    }
  }, [dispatch, profile?.id])

  const handleAddTodo = () => {
    dispatch(todoSlice.actions.addTodo('New Todo'))
  }

  const handleToggleTodo = (id) => {
    dispatch(todoSlice.actions.toggleTodo(id))
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(todoSlice.actions.clearError())}
        >
          <Text style={styles.buttonText}>Clear Error</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleToggleTodo(item.id)}>
            <Text style={[
              styles.todoItem,
              item.completed && styles.completedTodo
            ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

// 4. Zustand (Lightweight State Management)
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Zustand store
const useAppStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      todos: [],
      theme: 'light',
      loading: false,
      
      // Actions
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      
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
      
      removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),
      
      setTheme: (theme) => set({ theme }),
      setLoading: (loading) => set({ loading }),
      
      // Async actions
      fetchTodos: async () => {
        set({ loading: true })
        try {
          const response = await fetch('/api/todos')
          const todos = await response.json()
          set({ todos, loading: false })
        } catch (error) {
          console.error('Failed to fetch todos:', error)
          set({ loading: false })
        }
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user, 
        theme: state.theme 
      })
    }
  )
)

// Using Zustand store
const ZustandExample = () => {
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    removeTodo, 
    fetchTodos, 
    loading 
  } = useAppStore()

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleAddTodo = () => {
    addTodo(`Todo ${todos.length + 1}`)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      
      {loading && <Text>Loading...</Text>}
      
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <Text style={[
                styles.todoItem,
                item.completed && styles.completedTodo
              ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTodo(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

// 5. Custom Hooks for State Management
const useAsyncState = (initialState) => {
  const [state, setState] = useState({
    data: initialState,
    loading: false,
    error: null
  })

  const setAsyncState = useCallback(async (asyncFunction) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const result = await asyncFunction()
      setState({ data: result, loading: false, error: null })
      return result
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: error.message }))
      throw error
    }
  }, [])

  const resetState = useCallback(() => {
    setState({ data: initialState, loading: false, error: null })
  }, [initialState])

  return { ...state, setAsyncState, resetState }
}

// Usage of custom hook
const AsyncStateExample = () => {
  const { data, loading, error, setAsyncState } = useAsyncState([])

  const fetchData = () => {
    setAsyncState(async () => {
      const response = await fetch('/api/data')
      return await response.json()
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.dataItem}>{JSON.stringify(item)}</Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 8
  },
  todoItem: {
    fontSize: 16,
    flex: 1
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#888'
  },
  deleteButton: {
    color: '#ff4444',
    fontWeight: '600'
  },
  error: {
    color: '#ff4444',
    textAlign: 'center',
    marginVertical: 10
  },
  dataItem: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 8
  }
})

// Helper function for authentication
const authenticateUser = async (credentials) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'John Doe',
        email: credentials.email
      })
    }, 1000)
  })
}
```

### 7. How do you handle data persistence in React Native?

**Answer:**
Data persistence in React Native can be achieved through various storage solutions depending on the type and complexity of data.

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MMKV } from 'react-native-mmkv'
import SQLite from 'react-native-sqlite-storage'
import Realm from 'realm'

// 1. AsyncStorage (Key-Value Storage)
class AsyncStorageManager {
  // Store simple data
  static async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
      console.error('Error storing data:', error)
    }
  }

  // Retrieve data
  static async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.error('Error retrieving data:', error)
      return null
    }
  }

  // Remove data
  static async removeData(key) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing data:', error)
    }
  }

  // Store multiple items
  static async storeMultiple(keyValuePairs) {
    try {
      const pairs = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value)
      ])
      await AsyncStorage.multiSet(pairs)
    } catch (error) {
      console.error('Error storing multiple items:', error)
    }
  }

  // Get multiple items
  static async getMultiple(keys) {
    try {
      const values = await AsyncStorage.multiGet(keys)
      return values.reduce((acc, [key, value]) => {
        acc[key] = value ? JSON.parse(value) : null
        return acc
      }, {})
    } catch (error) {
      console.error('Error getting multiple items:', error)
      return {}
    }
  }

  // Clear all data
  static async clearAll() {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }
}

// Usage example
const AsyncStorageExample = () => {
  const [userData, setUserData] = useState(null)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    loadStoredData()
  }, [])

  const loadStoredData = async () => {
    const data = await AsyncStorageManager.getMultiple([
      'userData',
      'appSettings'
    ])
    setUserData(data.userData)
    setSettings(data.appSettings)
  }

  const saveUserData = async (data) => {
    await AsyncStorageManager.storeData('userData', data)
    setUserData(data)
  }

  const updateSettings = async (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings }
    await AsyncStorageManager.storeData('appSettings', updatedSettings)
    setSettings(updatedSettings)
  }

  return (
    <View style={styles.container}>
      <Text>User: {userData?.name || 'Not logged in'}</Text>
      <Text>Theme: {settings?.theme || 'Default'}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => saveUserData({ name: 'John Doe', id: 1 })}
      >
        <Text style={styles.buttonText}>Save User Data</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => updateSettings({ theme: 'dark' })}
      >
        <Text style={styles.buttonText}>Set Dark Theme</Text>
      </TouchableOpacity>
    </View>
  )
}

// 2. MMKV (High Performance Key-Value Storage)
const storage = new MMKV()

class MMKVManager {
  static set(key, value) {
    if (typeof value === 'object') {
      storage.set(key, JSON.stringify(value))
    } else {
      storage.set(key, value)
    }
  }

  static get(key) {
    const value = storage.getString(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    }
    return null
  }

  static getBoolean(key) {
    return storage.getBoolean(key)
  }

  static getNumber(key) {
    return storage.getNumber(key)
  }

  static delete(key) {
    storage.delete(key)
  }

  static getAllKeys() {
    return storage.getAllKeys()
  }

  static clearAll() {
    storage.clearAll()
  }
}

// 3. SQLite Database
class SQLiteManager {
  static db = null

  static async initDatabase() {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase(
        {
          name: 'AppDatabase.db',
          location: 'default'
        },
        (database) => {
          this.db = database
          this.createTables()
          resolve(database)
        },
        (error) => {
          console.error('Error opening database:', error)
          reject(error)
        }
      )
    })
  }

  static createTables() {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `

    const createPostsTable = `
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `

    this.db.transaction((tx) => {
      tx.executeSql(createUsersTable)
      tx.executeSql(createPostsTable)
    })
  }

  static async insertUser(name, email) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO users (name, email) VALUES (?, ?)',
          [name, email],
          (tx, result) => {
            resolve(result.insertId)
          },
          (tx, error) => {
            reject(error)
          }
        )
      })
    })
  }

  static async getUsers() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users ORDER BY created_at DESC',
          [],
          (tx, result) => {
            const users = []
            for (let i = 0; i < result.rows.length; i++) {
              users.push(result.rows.item(i))
            }
            resolve(users)
          },
          (tx, error) => {
            reject(error)
          }
        )
      })
    })
  }

  static async insertPost(userId, title, content) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
          [userId, title, content],
          (tx, result) => {
            resolve(result.insertId)
          },
          (tx, error) => {
            reject(error)
          }
        )
      })
    })
  }

  static async getPostsWithUsers() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `SELECT p.*, u.name as user_name, u.email as user_email 
           FROM posts p 
           JOIN users u ON p.user_id = u.id 
           ORDER BY p.created_at DESC`,
          [],
          (tx, result) => {
            const posts = []
            for (let i = 0; i < result.rows.length; i++) {
              posts.push(result.rows.item(i))
            }
            resolve(posts)
          },
          (tx, error) => {
            reject(error)
          }
        )
      })
    })
  }
}

// 4. Realm Database (Object Database)
const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    email: 'string',
    createdAt: 'date'
  }
}

const PostSchema = {
  name: 'Post',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    content: 'string',
    author: 'User',
    createdAt: 'date'
  }
}

class RealmManager {
  static realm = null

  static async initRealm() {
    try {
      this.realm = await Realm.open({
        schema: [UserSchema, PostSchema],
        schemaVersion: 1
      })
    } catch (error) {
      console.error('Error initializing Realm:', error)
    }
  }

  static createUser(id, name, email) {
    this.realm.write(() => {
      this.realm.create('User', {
        id,
        name,
        email,
        createdAt: new Date()
      })
    })
  }

  static getUsers() {
    return this.realm.objects('User').sorted('createdAt', true)
  }

  static createPost(id, title, content, userId) {
    const user = this.realm.objectForPrimaryKey('User', userId)
    if (user) {
      this.realm.write(() => {
        this.realm.create('Post', {
          id,
          title,
          content,
          author: user,
          createdAt: new Date()
        })
      })
    }
  }

  static getPosts() {
    return this.realm.objects('Post').sorted('createdAt', true)
  }

  static deleteUser(userId) {
    const user = this.realm.objectForPrimaryKey('User', userId)
    if (user) {
      this.realm.write(() => {
        this.realm.delete(user)
      })
    }
  }

  static close() {
    if (this.realm) {
      this.realm.close()
    }
  }
}

// 5. Custom Storage Hook
const useStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStoredValue()
  }, [key])

  const loadStoredValue = async () => {
    try {
      const value = await AsyncStorageManager.getData(key)
      setStoredValue(value !== null ? value : initialValue)
    } catch (error) {
      console.error('Error loading stored value:', error)
      setStoredValue(initialValue)
    } finally {
      setLoading(false)
    }
  }

  const setValue = async (value) => {
    try {
      setStoredValue(value)
      await AsyncStorageManager.storeData(key, value)
    } catch (error) {
      console.error('Error storing value:', error)
    }
  }

  const removeValue = async () => {
    try {
      setStoredValue(initialValue)
      await AsyncStorageManager.removeData(key)
    } catch (error) {
      console.error('Error removing value:', error)
    }
  }

  return [storedValue, setValue, removeValue, loading]
}

// Usage of custom storage hook
const StorageHookExample = () => {
  const [userPreferences, setUserPreferences, removePreferences, loading] = 
    useStorage('userPreferences', { theme: 'light', notifications: true })

  const toggleTheme = () => {
    setUserPreferences({
      ...userPreferences,
      theme: userPreferences.theme === 'light' ? 'dark' : 'light'
    })
  }

  const toggleNotifications = () => {
    setUserPreferences({
      ...userPreferences,
      notifications: !userPreferences.notifications
    })
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading preferences...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Theme: {userPreferences.theme}</Text>
      <Text>Notifications: {userPreferences.notifications ? 'On' : 'Off'}</Text>
      
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={toggleNotifications}>
        <Text style={styles.buttonText}>Toggle Notifications</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={removePreferences}>
        <Text style={styles.buttonText}>Reset Preferences</Text>
      </TouchableOpacity>
    </View>
  )
}
```

---

## Native Modules and APIs

### 8. How do you access native device features in React Native?

**Answer:**
React Native provides built-in APIs for common device features and allows creating custom native modules for platform-specific functionality.

```javascript
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
  StyleSheet
} from 'react-native'

// Camera and Image Picker
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'

// Location
import Geolocation from '@react-native-community/geolocation'

// Contacts
import { getAll, getContactById } from 'react-native-contacts'

// Device Info
import DeviceInfo from 'react-native-device-info'

// Biometric Authentication
import TouchID from 'react-native-touch-id'

// Push Notifications
import PushNotification from 'react-native-push-notification'

// 1. Camera and Photo Library Access
const CameraExample = () => {
  const [imageUri, setImageUri] = useState(null)

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    }
    return true
  }

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Camera permission is required')
      return
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8
    }

    launchCamera(options, (response) => {
      if (response.didCancel || response.error) {
        console.log('Camera cancelled or error:', response.error)
      } else if (response.assets && response.assets[0]) {
        setImageUri(response.assets[0].uri)
      }
    })
  }

  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        console.log('Image library cancelled or error:', response.error)
      } else if (response.assets && response.assets[0]) {
        setImageUri(response.assets[0].uri)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Example</Text>
      
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={openImageLibrary}>
        <Text style={styles.buttonText}>Choose from Library</Text>
      </TouchableOpacity>
    </View>
  )
}

// 2. Location Services
const LocationExample = () => {
  const [location, setLocation] = useState(null)
  const [watching, setWatching] = useState(false)
  const [watchId, setWatchId] = useState(null)

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs location permission to get your position',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    }
    return true
  }

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission()
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Location permission is required')
      return
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        })
      },
      (error) => {
        console.error('Location error:', error)
        Alert.alert('Error', 'Failed to get location')
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
    )
  }

  const startWatchingLocation = async () => {
    const hasPermission = await requestLocationPermission()
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Location permission is required')
      return
    }

    const id = Geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        })
      },
      (error) => {
        console.error('Watch location error:', error)
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10
      }
    )

    setWatchId(id)
    setWatching(true)
  }

  const stopWatchingLocation = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId)
      setWatchId(null)
      setWatching(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Example</Text>
      
      {location && (
        <View style={styles.locationInfo}>
          <Text>Latitude: {location.latitude.toFixed(6)}</Text>
          <Text>Longitude: {location.longitude.toFixed(6)}</Text>
          <Text>Accuracy: {location.accuracy.toFixed(2)}m</Text>
          <Text>Time: {new Date(location.timestamp).toLocaleTimeString()}</Text>
        </View>
      )}
      
      <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>Get Current Location</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={watching ? stopWatchingLocation : startWatchingLocation}
      >
        <Text style={styles.buttonText}>
          {watching ? 'Stop Watching' : 'Start Watching'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

// 3. Contacts Access
const ContactsExample = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)

  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'App needs contacts permission to read your contacts',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    }
    return true
  }

  const loadContacts = async () => {
    const hasPermission = await requestContactsPermission()
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Contacts permission is required')
      return
    }

    setLoading(true)
    try {
      const contactsList = await getAll()
      setContacts(contactsList.slice(0, 10)) // Limit to first 10 contacts
    } catch (error) {
      console.error('Error loading contacts:', error)
      Alert.alert('Error', 'Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts Example</Text>
      
      <TouchableOpacity style={styles.button} onPress={loadContacts}>
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Load Contacts'}
        </Text>
      </TouchableOpacity>
      
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>
              {item.givenName} {item.familyName}
            </Text>
            {item.phoneNumbers.length > 0 && (
              <Text style={styles.contactPhone}>
                {item.phoneNumbers[0].number}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  )
}

// 4. Device Information
const DeviceInfoExample = () => {
  const [deviceInfo, setDeviceInfo] = useState({})

  useEffect(() => {
    loadDeviceInfo()
  }, [])

  const loadDeviceInfo = async () => {
    try {
      const info = {
        deviceId: await DeviceInfo.getUniqueId(),
        deviceName: await DeviceInfo.getDeviceName(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        appVersion: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
        bundleId: DeviceInfo.getBundleId(),
        brand: DeviceInfo.getBrand(),
        model: DeviceInfo.getModel(),
        isEmulator: await DeviceInfo.isEmulator(),
        hasNotch: DeviceInfo.hasNotch(),
        batteryLevel: await DeviceInfo.getBatteryLevel(),
        totalMemory: await DeviceInfo.getTotalMemory(),
        usedMemory: await DeviceInfo.getUsedMemory()
      }
      setDeviceInfo(info)
    } catch (error) {
      console.error('Error getting device info:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Information</Text>
      
      <ScrollView style={styles.deviceInfoContainer}>
        {Object.entries(deviceInfo).map(([key, value]) => (
          <View key={key} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{key}:</Text>
            <Text style={styles.infoValue}>{String(value)}</Text>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.button} onPress={loadDeviceInfo}>
        <Text style={styles.buttonText}>Refresh Info</Text>
      </TouchableOpacity>
    </View>
  )
}

// 5. Biometric Authentication
const BiometricExample = () => {
  const [biometricType, setBiometricType] = useState(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    checkBiometricSupport()
  }, [])

  const checkBiometricSupport = () => {
    TouchID.isSupported()
      .then(biometryType => {
        setIsSupported(true)
        setBiometricType(biometryType)
      })
      .catch(error => {
        setIsSupported(false)
        console.log('Biometric not supported:', error)
      })
  }

  const authenticateWithBiometric = () => {
    const optionalConfigObject = {
      title: 'Authentication Required',
      subtitle: 'Please verify your identity',
      description: 'Use your biometric to authenticate',
      fallbackLabel: 'Use Passcode',
      cancelLabel: 'Cancel'
    }

    TouchID.authenticate('Authenticate to access the app', optionalConfigObject)
      .then(success => {
        Alert.alert('Success', 'Authentication successful!')
      })
      .catch(error => {
        console.log('Authentication failed:', error)
        Alert.alert('Authentication Failed', error.message)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biometric Authentication</Text>
      
      <Text style={styles.infoText}>
        Supported: {isSupported ? 'Yes' : 'No'}
      </Text>
      
      {biometricType && (
        <Text style={styles.infoText}>
          Type: {biometricType}
        </Text>
      )}
      
      {isSupported && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={authenticateWithBiometric}
        >
          <Text style={styles.buttonText}>Authenticate</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

// 6. Push Notifications
const NotificationExample = () => {
  useEffect(() => {
    configurePushNotifications()
  }, [])

  const configurePushNotifications = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token)
      },
      
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification)
        
        if (notification.userInteraction) {
          // User tapped on notification
          console.log('User tapped notification')
        }
      },
      
      onAction: function (notification) {
        console.log('ACTION:', notification.action)
      },
      
      onRegistrationError: function(err) {
        console.error(err.message, err)
      },
      
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios'
    })
  }

  const scheduleLocalNotification = () => {
    PushNotification.localNotificationSchedule({
      title: 'Scheduled Notification',
      message: 'This is a scheduled notification!',
      date: new Date(Date.now() + 5 * 1000), // 5 seconds from now
      allowWhileIdle: false
    })
    
    Alert.alert('Scheduled', 'Notification will appear in 5 seconds')
  }

  const sendImmediateNotification = () => {
    PushNotification.localNotification({
      title: 'Immediate Notification',
      message: 'This notification appears immediately!',
      playSound: true,
      soundName: 'default'
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notifications</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={sendImmediateNotification}
      >
        <Text style={styles.buttonText}>Send Immediate</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={scheduleLocalNotification}
      >
        <Text style={styles.buttonText}>Schedule Notification</Text>
      </TouchableOpacity>
    </View>
  )
}

// 7. Deep Linking
const DeepLinkingExample = () => {
  const [initialUrl, setInitialUrl] = useState(null)
  const [currentUrl, setCurrentUrl] = useState(null)

  useEffect(() => {
    // Get initial URL if app was opened via deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        setInitialUrl(url)
        handleDeepLink(url)
      }
    })

    // Listen for deep links while app is running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      setCurrentUrl(url)
      handleDeepLink(url)
    })

    return () => subscription?.remove()
  }, [])

  const handleDeepLink = (url) => {
    console.log('Deep link received:', url)
    
    // Parse URL and navigate accordingly
    if (url.includes('/profile/')) {
      const userId = url.split('/profile/')[1]
      Alert.alert('Deep Link', `Navigate to profile: ${userId}`)
    } else if (url.includes('/product/')) {
      const productId = url.split('/product/')[1]
      Alert.alert('Deep Link', `Navigate to product: ${productId}`)
    }
  }

  const openExternalLink = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        Alert.alert('Error', `Cannot open URL: ${url}`)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deep Linking</Text>
      
      {initialUrl && (
        <Text style={styles.infoText}>Initial URL: {initialUrl}</Text>
      )}
      
      {currentUrl && (
        <Text style={styles.infoText}>Current URL: {currentUrl}</Text>
      )}
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => openExternalLink('https://google.com')}
      >
        <Text style={styles.buttonText}>Open Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => openExternalLink('mailto:test@example.com')}
      >
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => openExternalLink('tel:+1234567890')}
      >
        <Text style={styles.buttonText}>Make Call</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: 'center'
  },
  locationInfo: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10
  },
  contactItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600'
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  deviceInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    maxHeight: 300
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  infoLabel: {
    fontWeight: '600',
    flex: 1
  },
  infoValue: {
    flex: 2,
    textAlign: 'right'
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center'
  }
})
```

This comprehensive example demonstrates how to access various native device features including camera, location, contacts, device information, biometric authentication, push notifications, and deep linking in React Native applications.

---

## Performance Optimization

### 9. How do you optimize performance in React Native applications?

**Answer:**
Performance optimization in React Native involves multiple strategies including component optimization, memory management, bundle optimization, and native performance improvements.

```javascript
import React, { useState, useEffect, useMemo, useCallback, memo } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  InteractionManager,
  StyleSheet
} from 'react-native'
import { getItemLayout } from 'react-native-super-grid'

// 1. Component Memoization
const ExpensiveComponent = memo(({ data, onPress }) => {
  // Expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2 + Math.random()
    }))
  }, [data])

  // Memoized callbacks
  const handlePress = useCallback((id) => {
    onPress(id)
  }, [onPress])

  return (
    <View style={styles.expensiveContainer}>
      {processedData.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handlePress(item.id)}
          style={styles.item}
        >
          <Text>{item.processed}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
})

// 2. Optimized FlatList Implementation
const OptimizedList = ({ data }) => {
  const [refreshing, setRefreshing] = useState(false)

  // Fixed item height for better performance
  const ITEM_HEIGHT = 80

  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  }), [])

  const keyExtractor = useCallback((item) => item.id.toString(), [])

  const renderItem = useCallback(({ item, index }) => (
    <ListItem item={item} index={index} />
  ), [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }, [])

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      windowSize={10}
      onRefresh={onRefresh}
      refreshing={refreshing}
      // Performance optimizations
      disableVirtualization={false}
      legacyImplementation={false}
    />
  )
}

// Memoized list item
const ListItem = memo(({ item, index }) => {
  return (
    <View style={[styles.listItem, { height: 80 }]}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  )
})

// 3. Image Optimization
const OptimizedImage = ({ source, style, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <View style={[style, styles.imageContainer]}>
      <Image
        {...props}
        source={source}
        style={[style, { opacity: loading ? 0 : 1 }]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setError(true)
          setLoading(false)
        }}
        // Performance optimizations
        resizeMode="cover"
        blurRadius={loading ? 1 : 0}
        // Cache images
        cache="force-cache"
      />
      {loading && (
        <View style={styles.imagePlaceholder}>
          <Text>Loading...</Text>
        </View>
      )}
      {error && (
        <View style={styles.imageError}>
          <Text>Failed to load</Text>
        </View>
      )}
    </View>
  )
}

// 4. Lazy Loading and Code Splitting
const LazyComponent = React.lazy(() => import('./HeavyComponent'))

const LazyLoadingExample = () => {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false)

  const loadHeavyComponent = useCallback(() => {
    // Use InteractionManager to defer heavy operations
    InteractionManager.runAfterInteractions(() => {
      setShowHeavyComponent(true)
    })
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={loadHeavyComponent}
      >
        <Text style={styles.buttonText}>Load Heavy Component</Text>
      </TouchableOpacity>
      
      {showHeavyComponent && (
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <LazyComponent />
        </React.Suspense>
      )}
    </View>
  )
}

// 5. Memory Management
class MemoryOptimizedComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      timers: []
    }
  }

  componentDidMount() {
    // Set up timers and listeners
    const timer = setInterval(() => {
      this.updateData()
    }, 1000)

    this.setState({ timers: [timer] })
  }

  componentWillUnmount() {
    // Clean up timers and listeners
    this.state.timers.forEach(timer => {
      clearInterval(timer)
    })

    // Cancel any pending async operations
    this.cancelled = true
  }

  updateData = async () => {
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      
      // Check if component is still mounted
      if (!this.cancelled) {
        this.setState({ data })
      }
    } catch (error) {
      if (!this.cancelled) {
        console.error('Error updating data:', error)
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Memory Optimized Component</Text>
        <Text>Data count: {this.state.data.length}</Text>
      </View>
    )
  }
}

// 6. Bundle Size Optimization
// Use dynamic imports for large libraries
const loadLargeLibrary = async () => {
  const { default: LargeLibrary } = await import('large-library')
  return new LargeLibrary()
}

// Tree shaking example
import { debounce } from 'lodash/debounce' // Import only what you need
// Instead of: import _ from 'lodash'

// 7. Native Performance Optimizations
const NativeOptimizedComponent = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true)

  // Disable scroll during animations for better performance
  const handleAnimationStart = useCallback(() => {
    setScrollEnabled(false)
  }, [])

  const handleAnimationEnd = useCallback(() => {
    setScrollEnabled(true)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      scrollEnabled={scrollEnabled}
      // Performance optimizations
      removeClippedSubviews={true}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Content */}
    </ScrollView>
  )
}

// 8. State Management Optimization
const useOptimizedState = (initialState) => {
  const [state, setState] = useState(initialState)

  // Batch state updates
  const batchedSetState = useCallback((updates) => {
    setState(prevState => ({ ...prevState, ...updates }))
  }, [])

  // Debounced state updates
  const debouncedSetState = useMemo(
    () => debounce((updates) => {
      setState(prevState => ({ ...prevState, ...updates }))
    }, 300),
    []
  )

  return [state, batchedSetState, debouncedSetState]
}

// 9. Animation Performance
const AnimationOptimizedComponent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true // Use native driver for better performance
    }).start()
  }, [fadeAnim])

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }, [fadeAnim])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedBox,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1]
                })
              }
            ]
          }
        ]}
      >
        <Text>Animated Content</Text>
      </Animated.View>
      
      <TouchableOpacity style={styles.button} onPress={fadeIn}>
        <Text style={styles.buttonText}>Fade In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={fadeOut}>
        <Text style={styles.buttonText}>Fade Out</Text>
      </TouchableOpacity>
    </View>
  )
}

// 10. Performance Monitoring
const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor JavaScript thread performance
    const startTime = Date.now()
    
    const checkPerformance = () => {
      const endTime = Date.now()
      const executionTime = endTime - startTime
      
      if (executionTime > 16) { // 60fps = 16ms per frame
        console.warn(`Slow operation detected: ${executionTime}ms`)
      }
    }

    // Use requestAnimationFrame for performance monitoring
    const rafId = requestAnimationFrame(checkPerformance)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  expensiveContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 8
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666'
  },
  imageContainer: {
    position: 'relative'
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  imageError: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebee'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  animatedBox: {
    width: 100,
    height: 100,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  }
})
```

### 10. How do you test React Native applications?

**Answer:**
Testing React Native applications involves unit testing, integration testing, component testing, and end-to-end testing using various tools and frameworks.

```javascript
// 1. Unit Testing with Jest
// utils/mathUtils.js
export const add = (a, b) => a + b
export const multiply = (a, b) => a * b
export const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Division by zero')
  }
  return a / b
}

// __tests__/mathUtils.test.js
import { add, multiply, divide } from '../utils/mathUtils'

describe('Math Utils', () => {
  test('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(-1, 1)).toBe(0)
    expect(add(0, 0)).toBe(0)
  })

  test('should multiply two numbers correctly', () => {
    expect(multiply(3, 4)).toBe(12)
    expect(multiply(-2, 3)).toBe(-6)
    expect(multiply(0, 5)).toBe(0)
  })

  test('should divide two numbers correctly', () => {
    expect(divide(10, 2)).toBe(5)
    expect(divide(7, 2)).toBe(3.5)
  })

  test('should throw error when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero')
  })
})

// 2. Component Testing with React Native Testing Library
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { Alert } from 'react-native'
import LoginForm from '../components/LoginForm'

// Mock Alert
jest.spyOn(Alert, 'alert')

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />)
    
    expect(getByPlaceholderText('Email')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
    expect(getByText('Login')).toBeTruthy()
  })

  test('should show validation errors for empty fields', async () => {
    const { getByText, getByTestId } = render(<LoginForm />)
    
    const loginButton = getByText('Login')
    fireEvent.press(loginButton)
    
    await waitFor(() => {
      expect(getByTestId('email-error')).toBeTruthy()
      expect(getByTestId('password-error')).toBeTruthy()
    })
  })

  test('should call onLogin with correct credentials', async () => {
    const mockOnLogin = jest.fn()
    const { getByPlaceholderText, getByText } = render(
      <LoginForm onLogin={mockOnLogin} />
    )
    
    const emailInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')
    const loginButton = getByText('Login')
    
    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')
    fireEvent.press(loginButton)
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  test('should show loading state during login', async () => {
    const mockOnLogin = jest.fn(() => 
      new Promise(resolve => setTimeout(resolve, 1000))
    )
    
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <LoginForm onLogin={mockOnLogin} />
    )
    
    const emailInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')
    const loginButton = getByText('Login')
    
    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')
    fireEvent.press(loginButton)
    
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })
})

// 3. Hook Testing
import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from '../hooks/useCounter'

describe('useCounter', () => {
  test('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter())
    
    expect(result.current.count).toBe(0)
  })

  test('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10))
    
    expect(result.current.count).toBe(10)
  })

  test('should increment count', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })

  test('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5))
    
    act(() => {
      result.current.decrement()
    })
    
    expect(result.current.count).toBe(4)
  })

  test('should reset count', () => {
    const { result } = renderHook(() => useCounter(10))
    
    act(() => {
      result.current.increment()
      result.current.increment()
      result.current.reset()
    })
    
    expect(result.current.count).toBe(10)
  })
})

// 4. API Testing with Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fetchUserProfile } from '../services/userService'

const server = setupServer(
  rest.get('/api/user/:id', (req, res, ctx) => {
    const { id } = req.params
    
    if (id === '1') {
      return res(
        ctx.json({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com'
        })
      )
    }
    
    return res(
      ctx.status(404),
      ctx.json({ error: 'User not found' })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('User Service', () => {
  test('should fetch user profile successfully', async () => {
    const user = await fetchUserProfile('1')
    
    expect(user).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    })
  })

  test('should handle user not found error', async () => {
    await expect(fetchUserProfile('999')).rejects.toThrow('User not found')
  })

  test('should handle network error', async () => {
    server.use(
      rest.get('/api/user/:id', (req, res, ctx) => {
        return res.networkError('Failed to connect')
      })
    )
    
    await expect(fetchUserProfile('1')).rejects.toThrow()
  })
})

// 5. Redux Testing
import { configureStore } from '@reduxjs/toolkit'
import userReducer, { 
  loginUser, 
  logoutUser, 
  updateProfile 
} from '../store/userSlice'

describe('User Slice', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    })
  })

  test('should handle initial state', () => {
    const state = store.getState().user
    
    expect(state).toEqual({
      currentUser: null,
      isAuthenticated: false,
      loading: false,
      error: null
    })
  })

  test('should handle login user', () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' }
    
    store.dispatch(loginUser(user))
    const state = store.getState().user
    
    expect(state.currentUser).toEqual(user)
    expect(state.isAuthenticated).toBe(true)
  })

  test('should handle logout user', () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' }
    
    store.dispatch(loginUser(user))
    store.dispatch(logoutUser())
    
    const state = store.getState().user
    
    expect(state.currentUser).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  test('should handle update profile', () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' }
    const updates = { name: 'Jane Doe' }
    
    store.dispatch(loginUser(user))
    store.dispatch(updateProfile(updates))
    
    const state = store.getState().user
    
    expect(state.currentUser.name).toBe('Jane Doe')
    expect(state.currentUser.email).toBe('john@example.com')
  })
})

// 6. Snapshot Testing
import React from 'react'
import renderer from 'react-test-renderer'
import UserCard from '../components/UserCard'

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg'
  }

  test('should render correctly', () => {
    const tree = renderer
      .create(<UserCard user={mockUser} />)
      .toJSON()
    
    expect(tree).toMatchSnapshot()
  })

  test('should render correctly without avatar', () => {
    const userWithoutAvatar = { ...mockUser, avatar: null }
    
    const tree = renderer
      .create(<UserCard user={userWithoutAvatar} />)
      .toJSON()
    
    expect(tree).toMatchSnapshot()
  })
})

// 7. Integration Testing
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from '../App'
import userReducer from '../store/userSlice'

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer
    },
    preloadedState: initialState
  })
}

describe('App Integration', () => {
  test('should show login screen when not authenticated', () => {
    const store = createTestStore()
    
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    
    expect(getByText('Login')).toBeTruthy()
  })

  test('should show home screen when authenticated', () => {
    const store = createTestStore({
      user: {
        currentUser: { id: '1', name: 'John Doe' },
        isAuthenticated: true,
        loading: false,
        error: null
      }
    })
    
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    
    expect(getByText('Welcome, John Doe')).toBeTruthy()
  })

  test('should navigate from login to home after successful login', async () => {
    const store = createTestStore()
    
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    
    // Fill login form
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123')
    fireEvent.press(getByText('Login'))
    
    // Wait for navigation to home screen
    await waitFor(() => {
      expect(getByText('Welcome')).toBeTruthy()
    })
  })
})

// 8. E2E Testing with Detox (Configuration)
// detox.config.js
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  configurations: {
    'ios.sim.debug': {
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/YourApp.app',
      build: 'xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
      type: 'ios.simulator',
      device: {
        type: 'iPhone 12'
      }
    },
    'android.emu.debug': {
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3_API_29'
      }
    }
  }
}

// e2e/loginFlow.e2e.js
describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should show login screen on app launch', async () => {
    await expect(element(by.id('login-screen'))).toBeVisible()
    await expect(element(by.id('email-input'))).toBeVisible()
    await expect(element(by.id('password-input'))).toBeVisible()
    await expect(element(by.id('login-button'))).toBeVisible()
  })

  it('should login successfully with valid credentials', async () => {
    await element(by.id('email-input')).typeText('test@example.com')
    await element(by.id('password-input')).typeText('password123')
    await element(by.id('login-button')).tap()
    
    await expect(element(by.id('home-screen'))).toBeVisible()
    await expect(element(by.text('Welcome'))).toBeVisible()
  })

  it('should show error for invalid credentials', async () => {
    await element(by.id('email-input')).typeText('invalid@example.com')
    await element(by.id('password-input')).typeText('wrongpassword')
    await element(by.id('login-button')).tap()
    
    await expect(element(by.text('Invalid credentials'))).toBeVisible()
  })
})

// 9. Performance Testing
import { performance } from 'perf_hooks'

describe('Performance Tests', () => {
  test('should render large list within acceptable time', async () => {
    const largeData = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      title: `Item ${i}`,
      subtitle: `Subtitle ${i}`
    }))
    
    const startTime = performance.now()
    
    const { getByTestId } = render(
      <OptimizedList data={largeData} />
    )
    
    await waitFor(() => {
      expect(getByTestId('list-container')).toBeTruthy()
    })
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Should render within 100ms
    expect(renderTime).toBeLessThan(100)
  })

  test('should handle rapid state updates efficiently', async () => {
    const { result } = renderHook(() => useCounter())
    
    const startTime = performance.now()
    
    // Perform 100 rapid updates
    act(() => {
      for (let i = 0; i < 100; i++) {
        result.current.increment()
      }
    })
    
    const endTime = performance.now()
    const updateTime = endTime - startTime
    
    expect(result.current.count).toBe(100)
    expect(updateTime).toBeLessThan(50) // Should complete within 50ms
  })
})

// 10. Test Utilities
// testUtils.js
import React from 'react'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../store/userSlice'

export const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer
    },
    preloadedState: initialState
  })
}

export const renderWithProviders = (
  ui,
  {
    initialState = {},
    store = createTestStore(initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

// Custom matchers
export const customMatchers = {
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false
      }
    }
  }
}

// Setup file (jest.setup.js)
import 'react-native-gesture-handler/jestSetup'
import { customMatchers } from './testUtils'

// Mock react-native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// Mock react-navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn()
    })
  }
})

// Extend Jest matchers
expect.extend(customMatchers)

// Global test timeout
jest.setTimeout(10000)
```

This comprehensive testing setup covers unit testing, component testing, integration testing, and end-to-end testing for React Native applications, providing a robust foundation for ensuring code quality and reliability.

---

## Deployment and Build Configuration

### 11. How do you configure and deploy React Native applications for different platforms?

**Answer:**
Deploying React Native applications involves configuring build settings, managing certificates, setting up CI/CD pipelines, and distributing to app stores.

```javascript
// 1. Environment Configuration
// config/environments.js
const environments = {
  development: {
    API_URL: 'http://localhost:3000/api',
    DEBUG_MODE: true,
    ANALYTICS_ENABLED: false,
    LOG_LEVEL: 'debug'
  },
  staging: {
    API_URL: 'https://staging-api.example.com/api',
    DEBUG_MODE: true,
    ANALYTICS_ENABLED: true,
    LOG_LEVEL: 'info'
  },
  production: {
    API_URL: 'https://api.example.com/api',
    DEBUG_MODE: false,
    ANALYTICS_ENABLED: true,
    LOG_LEVEL: 'error'
  }
}

const getEnvironment = () => {
  if (__DEV__) {
    return environments.development
  }
  
  // Check for staging build
  if (process.env.NODE_ENV === 'staging') {
    return environments.staging
  }
  
  return environments.production
}

export default getEnvironment()

// 2. Build Configuration for iOS
// ios/YourApp/Info.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDisplayName</key>
  <string>Your App</string>
  <key>CFBundleIdentifier</key>
  <string>com.yourcompany.yourapp</string>
  <key>CFBundleVersion</key>
  <string>1.0.0</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0.0</string>
  
  <!-- App Transport Security -->
  <key>NSAppTransportSecurity</key>
  <dict>
    <key>NSExceptionDomains</key>
    <dict>
      <key>localhost</key>
      <dict>
        <key>NSExceptionAllowsInsecureHTTPLoads</key>
        <true/>
      </dict>
    </dict>
  </dict>
  
  <!-- Permissions -->
  <key>NSCameraUsageDescription</key>
  <string>This app needs access to camera to take photos</string>
  <key>NSPhotoLibraryUsageDescription</key>
  <string>This app needs access to photo library to select images</string>
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>This app needs location access to provide location-based features</string>
  
  <!-- URL Schemes -->
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>com.yourcompany.yourapp</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>yourapp</string>
      </array>
    </dict>
  </array>
</dict>
</plist>

// 3. Build Configuration for Android
// android/app/build.gradle
apply plugin: "com.android.application"
apply plugin: "com.facebook.react"

android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    
    defaultConfig {
        applicationId "com.yourcompany.yourapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0.0"
        
        // Enable multidex for large apps
        multiDexEnabled true
        
        // Build config fields
        buildConfigField "String", "API_URL", '"https://api.example.com"'
        buildConfigField "boolean", "DEBUG_MODE", "false"
    }
    
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
            buildConfigField "String", "API_URL", '"http://localhost:3000"'
            buildConfigField "boolean", "DEBUG_MODE", "true"
        }
        staging {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            buildConfigField "String", "API_URL", '"https://staging-api.example.com"'
            buildConfigField "boolean", "DEBUG_MODE", "true"
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            buildConfigField "String", "API_URL", '"https://api.example.com"'
            buildConfigField "boolean", "DEBUG_MODE", "false"
        }
    }
    
    // Bundle configuration
    bundle {
        language {
            enableSplit = false
        }
        density {
            enableSplit = true
        }
        abi {
            enableSplit = true
        }
    }
}

// 4. Fastlane Configuration for iOS
// ios/fastlane/Fastfile
default_platform(:ios)

platform :ios do
  before_all do
    setup_circle_ci
  end

  desc "Build and upload to TestFlight"
  lane :beta do
    # Increment build number
    increment_build_number(xcodeproj: "YourApp.xcodeproj")
    
    # Build the app
    build_app(
      scheme: "YourApp",
      workspace: "YourApp.xcworkspace",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: {
          "com.yourcompany.yourapp" => "YourApp AppStore"
        }
      }
    )
    
    # Upload to TestFlight
    upload_to_testflight(
      skip_waiting_for_build_processing: true,
      skip_submission: true
    )
    
    # Send notification
    slack(
      message: "Successfully uploaded new build to TestFlight! 🚀",
      channel: "#mobile-releases"
    )
  end

  desc "Deploy to App Store"
  lane :release do
    # Increment version
    increment_version_number(xcodeproj: "YourApp.xcodeproj")
    
    # Build and upload
    build_app(
      scheme: "YourApp",
      workspace: "YourApp.xcworkspace",
      export_method: "app-store"
    )
    
    upload_to_app_store(
      force: true,
      submit_for_review: true,
      automatic_release: false,
      submission_information: {
        add_id_info_uses_idfa: false,
        add_id_info_serves_ads: false,
        add_id_info_tracks_install: false,
        add_id_info_tracks_action: false,
        add_id_info_limits_tracking: false
      }
    )
  end
end

// 5. Fastlane Configuration for Android
// android/fastlane/Fastfile
default_platform(:android)

platform :android do
  desc "Build and upload to Play Console Internal Testing"
  lane :beta do
    # Clean and build
    gradle(
      task: "clean assembleRelease",
      project_dir: "android/"
    )
    
    # Upload to Play Console
    upload_to_play_store(
      track: "internal",
      aab: "android/app/build/outputs/bundle/release/app-release.aab",
      skip_upload_metadata: true,
      skip_upload_images: true,
      skip_upload_screenshots: true
    )
    
    # Send notification
    slack(
      message: "Successfully uploaded new build to Play Console Internal Testing! 🚀",
      channel: "#mobile-releases"
    )
  end

  desc "Deploy to Play Store"
  lane :release do
    # Build release
    gradle(
      task: "clean bundleRelease",
      project_dir: "android/"
    )
    
    # Upload to Play Store
    upload_to_play_store(
      track: "production",
      aab: "android/app/build/outputs/bundle/release/app-release.aab",
      release_status: "draft"
    )
  end
end

// 6. GitHub Actions CI/CD Pipeline
// .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage --watchAll=false
      
      - name: Run linting
        run: npm run lint
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  build-ios:
    runs-on: macos-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          working-directory: ios
      
      - name: Install CocoaPods
        run: cd ios && pod install
      
      - name: Build iOS app
        run: cd ios && bundle exec fastlane beta
        env:
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD: ${{ secrets.FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD }}

  build-android:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'
      
      - name: Setup Android SDK
        uses: android-actions/setup-android@v2
      
      - name: Install dependencies
        run: npm ci
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          working-directory: android
      
      - name: Build Android app
        run: cd android && bundle exec fastlane beta
        env:
          PLAY_STORE_JSON_KEY: ${{ secrets.PLAY_STORE_JSON_KEY }}

// 7. Code Signing and Security
// scripts/setup-keystore.sh
#!/bin/bash

# Generate Android keystore
keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Move keystore to android/app directory
mv my-upload-key.keystore android/app/

# Create gradle.properties with signing config
echo "MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore" >> android/gradle.properties
echo "MYAPP_UPLOAD_KEY_ALIAS=my-key-alias" >> android/gradle.properties
echo "MYAPP_UPLOAD_STORE_PASSWORD=your-keystore-password" >> android/gradle.properties
echo "MYAPP_UPLOAD_KEY_PASSWORD=your-key-password" >> android/gradle.properties

// 8. App Center Integration
// App Center configuration
import { AppCenter, Analytics, Crashes } from 'appcenter'
import { AppCenterReactNative } from 'appcenter-react-native'

class AppCenterService {
  static initialize() {
    if (!__DEV__) {
      AppCenter.start({
        appSecret: {
          ios: 'your-ios-app-secret',
          android: 'your-android-app-secret'
        },
        services: [Analytics, Crashes]
      })
    }
  }

  static trackEvent(eventName, properties = {}) {
    if (!__DEV__) {
      Analytics.trackEvent(eventName, properties)
    }
  }

  static trackError(error, properties = {}) {
    if (!__DEV__) {
      Crashes.trackError(error, properties)
    }
  }

  static setUserId(userId) {
    if (!__DEV__) {
      AppCenter.setUserId(userId)
    }
  }
}

export default AppCenterService

// 9. Over-the-Air Updates with CodePush
import CodePush from 'react-native-code-push'

class CodePushService {
  static checkForUpdate() {
    return CodePush.checkForUpdate()
  }

  static sync(options = {}) {
    const defaultOptions = {
      updateDialog: {
        title: 'Update Available',
        optionalUpdateMessage: 'An update is available. Would you like to install it?',
        optionalIgnoreButtonLabel: 'Later',
        optionalInstallButtonLabel: 'Install'
      },
      installMode: CodePush.InstallMode.ON_NEXT_RESTART
    }

    return CodePush.sync({ ...defaultOptions, ...options })
  }

  static getUpdateMetadata() {
    return CodePush.getUpdateMetadata()
  }
}

// HOC for CodePush
const withCodePush = (WrappedComponent) => {
  const CodePushComponent = (props) => {
    useEffect(() => {
      // Check for updates on app start
      CodePushService.sync()
    }, [])

    return <WrappedComponent {...props} />
  }

  return CodePush({
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.ON_NEXT_RESTART
  })(CodePushComponent)
}

export { CodePushService, withCodePush }

// 10. Performance Monitoring
import Flipper from 'react-native-flipper'
import { Performance } from 'react-native-performance'

class PerformanceMonitor {
  static initialize() {
    if (__DEV__) {
      // Flipper integration for development
      Flipper.addPlugin({
        getId() { return 'PerformanceMonitor' },
        onConnect(connection) {
          // Send performance data to Flipper
          Performance.setResourceLoggingEnabled(true)
        },
        onDisconnect() {
          Performance.setResourceLoggingEnabled(false)
        },
        runInBackground() {
          return false
        }
      })
    }
  }

  static measureRender(componentName, renderFunction) {
    const startTime = Performance.now()
    const result = renderFunction()
    const endTime = Performance.now()
    
    const duration = endTime - startTime
    
    if (duration > 16) { // 60fps threshold
      console.warn(`Slow render detected in ${componentName}: ${duration}ms`)
    }
    
    return result
  }

  static trackNavigation(routeName, params = {}) {
    Performance.mark(`navigation_${routeName}_start`)
    
    // Track navigation performance
    setTimeout(() => {
      Performance.mark(`navigation_${routeName}_end`)
      Performance.measure(
        `navigation_${routeName}`,
        `navigation_${routeName}_start`,
        `navigation_${routeName}_end`
      )
    }, 0)
  }
}

export default PerformanceMonitor
```

### 12. How do you handle different screen sizes and orientations in React Native?

**Answer:**
Handling different screen sizes and orientations requires responsive design techniques, dimension detection, and adaptive layouts.

```javascript
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DeviceInfo from 'react-native-device-info'

// 1. Responsive Dimensions Hook
const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))
  const [orientation, setOrientation] = useState(
    dimensions.width > dimensions.height ? 'landscape' : 'portrait'
  )

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
      setOrientation(window.width > window.height ? 'landscape' : 'portrait')
    })

    return () => subscription?.remove()
  }, [])

  const isTablet = dimensions.width >= 768
  const isSmallScreen = dimensions.width < 375
  const isLargeScreen = dimensions.width > 414

  return {
    width: dimensions.width,
    height: dimensions.height,
    orientation,
    isTablet,
    isSmallScreen,
    isLargeScreen,
    isLandscape: orientation === 'landscape',
    isPortrait: orientation === 'portrait'
  }
}

// 2. Responsive Text Component
const ResponsiveText = ({ children, style, ...props }) => {
  const { width, isTablet } = useResponsiveDimensions()
  
  const getFontSize = (baseSize) => {
    const scale = width / 375 // iPhone 6/7/8 as base
    const newSize = baseSize * scale
    
    if (isTablet) {
      return Math.max(newSize * 1.2, baseSize)
    }
    
    return Math.max(Math.min(newSize, baseSize * 1.3), baseSize * 0.8)
  }
  
  const responsiveStyle = {
    fontSize: style?.fontSize ? getFontSize(style.fontSize) : 16
  }
  
  return (
    <Text style={[style, responsiveStyle]} {...props}>
      {children}
    </Text>
  )
}

// 3. Adaptive Layout Component
const AdaptiveLayout = ({ children }) => {
  const { width, height, orientation, isTablet } = useResponsiveDimensions()
  const insets = useSafeAreaInsets()
  
  const getLayoutStyle = () => {
    if (isTablet) {
      return orientation === 'landscape' 
        ? styles.tabletLandscape 
        : styles.tabletPortrait
    }
    
    return orientation === 'landscape' 
      ? styles.phoneLandscape 
      : styles.phonePortrait
  }
  
  return (
    <SafeAreaView style={[styles.container, getLayoutStyle()]}>
      <View style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1
      }}>
        {children}
      </View>
    </SafeAreaView>
  )
}

// 4. Responsive Grid Component
const ResponsiveGrid = ({ data, renderItem, minItemWidth = 150 }) => {
  const { width } = useResponsiveDimensions()
  
  const getNumColumns = () => {
    const availableWidth = width - 40 // Account for padding
    return Math.floor(availableWidth / minItemWidth)
  }
  
  const numColumns = getNumColumns()
  const itemWidth = (width - 40 - (numColumns - 1) * 10) / numColumns
  
  return (
    <FlatList
      data={data}
      numColumns={numColumns}
      key={numColumns} // Force re-render when columns change
      renderItem={({ item, index }) => (
        <View style={[styles.gridItem, { width: itemWidth }]}>
          {renderItem({ item, index, itemWidth })}
        </View>
      )}
      contentContainerStyle={styles.gridContainer}
    />
  )
}

// 5. Breakpoint-based Styling
const createResponsiveStyles = (styles) => {
  const { width } = Dimensions.get('window')
  
  const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
  
  const getCurrentBreakpoint = () => {
    if (width >= breakpoints.xl) return 'xl'
    if (width >= breakpoints.lg) return 'lg'
    if (width >= breakpoints.md) return 'md'
    if (width >= breakpoints.sm) return 'sm'
    return 'xs'
  }
  
  const currentBreakpoint = getCurrentBreakpoint()
  
  const processStyles = (styleObj) => {
    const processedStyles = {}
    
    Object.keys(styleObj).forEach(key => {
      if (typeof styleObj[key] === 'object' && styleObj[key] !== null) {
        // Check if it's a breakpoint object
        const breakpointKeys = Object.keys(styleObj[key])
        const isBreakpointObject = breakpointKeys.some(k => 
          Object.keys(breakpoints).includes(k)
        )
        
        if (isBreakpointObject) {
          // Apply styles based on current breakpoint
          const applicableStyles = {}
          
          Object.keys(breakpoints).forEach(bp => {
            if (width >= breakpoints[bp] && styleObj[key][bp]) {
              Object.assign(applicableStyles, styleObj[key][bp])
            }
          })
          
          processedStyles[key] = applicableStyles
        } else {
          processedStyles[key] = processStyles(styleObj[key])
        }
      } else {
        processedStyles[key] = styleObj[key]
      }
    })
    
    return processedStyles
  }
  
  return StyleSheet.create(processStyles(styles))
}

// Usage example
const responsiveStyles = createResponsiveStyles({
  container: {
    xs: { padding: 10 },
    sm: { padding: 15 },
    md: { padding: 20 },
    lg: { padding: 25 }
  },
  text: {
    xs: { fontSize: 14 },
    sm: { fontSize: 16 },
    md: { fontSize: 18 },
    lg: { fontSize: 20 }
  }
})

// 6. Orientation-specific Components
const OrientationAwareComponent = () => {
  const { orientation, width, height } = useResponsiveDimensions()
  
  if (orientation === 'landscape') {
    return (
      <View style={styles.landscapeContainer}>
        <View style={styles.landscapeLeft}>
          <Text>Left Panel</Text>
        </View>
        <View style={styles.landscapeRight}>
          <Text>Right Panel</Text>
        </View>
      </View>
    )
  }
  
  return (
    <View style={styles.portraitContainer}>
      <View style={styles.portraitTop}>
        <Text>Top Section</Text>
      </View>
      <View style={styles.portraitBottom}>
        <Text>Bottom Section</Text>
      </View>
    </View>
  )
}

// 7. Device-specific Adaptations
const DeviceAdaptiveComponent = () => {
  const [deviceInfo, setDeviceInfo] = useState({})
  const { isTablet } = useResponsiveDimensions()
  
  useEffect(() => {
    const getDeviceInfo = async () => {
      const info = {
        isTablet: await DeviceInfo.isTablet(),
        hasNotch: DeviceInfo.hasNotch(),
        brand: DeviceInfo.getBrand(),
        model: DeviceInfo.getModel()
      }
      setDeviceInfo(info)
    }
    
    getDeviceInfo()
  }, [])
  
  const getDeviceSpecificStyles = () => {
    if (deviceInfo.hasNotch) {
      return styles.notchDevice
    }
    
    if (isTablet) {
      return styles.tabletDevice
    }
    
    return styles.phoneDevice
  }
  
  return (
    <View style={[styles.deviceContainer, getDeviceSpecificStyles()]}>
      <Text>Device: {deviceInfo.brand} {deviceInfo.model}</Text>
      <Text>Type: {isTablet ? 'Tablet' : 'Phone'}</Text>
      <Text>Has Notch: {deviceInfo.hasNotch ? 'Yes' : 'No'}</Text>
    </View>
  )
}

// 8. Responsive Image Component
const ResponsiveImage = ({ source, aspectRatio = 1, style, ...props }) => {
  const { width } = useResponsiveDimensions()
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    if (source.uri) {
      Image.getSize(source.uri, (imgWidth, imgHeight) => {
        const maxWidth = width - 40 // Account for padding
        const scaleFactor = maxWidth / imgWidth
        
        setImageSize({
          width: maxWidth,
          height: imgHeight * scaleFactor
        })
      })
    }
  }, [source, width])
  
  return (
    <Image
      source={source}
      style={[
        {
          width: imageSize.width,
          height: imageSize.height
        },
        style
      ]}
      {...props}
    />
  )
}

// 9. Responsive Modal Component
const ResponsiveModal = ({ visible, onClose, children }) => {
  const { width, height, isTablet, orientation } = useResponsiveDimensions()
  
  const getModalStyle = () => {
    if (isTablet) {
      return {
        width: orientation === 'landscape' ? width * 0.6 : width * 0.8,
        height: orientation === 'landscape' ? height * 0.8 : height * 0.7,
        maxWidth: 600,
        maxHeight: 800
      }
    }
    
    return {
      width: width * 0.9,
      height: height * 0.8
    }
  }
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, getModalStyle()]}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

// 10. Responsive Navigation
const ResponsiveNavigation = () => {
  const { isTablet, orientation } = useResponsiveDimensions()
  
  if (isTablet && orientation === 'landscape') {
    // Use drawer navigation for tablet landscape
    return (
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerType: 'permanent',
            drawerStyle: {
              width: 250
            }
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
  
  // Use tab navigation for phones and tablet portrait
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: isTablet ? 70 : 60
          },
          tabBarLabelStyle: {
            fontSize: isTablet ? 14 : 12
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  phonePortrait: {
    padding: 15
  },
  phoneLandscape: {
    padding: 10,
    flexDirection: 'row'
  },
  tabletPortrait: {
    padding: 25
  },
  tabletLandscape: {
    padding: 30,
    flexDirection: 'row'
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  landscapeLeft: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8
  },
  landscapeRight: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8
  },
  portraitContainer: {
    flex: 1
  },
  portraitTop: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8
  },
  portraitBottom: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8
  },
  gridContainer: {
    padding: 20
  },
  gridItem: {
    marginBottom: 10,
    marginRight: 10
  },
  deviceContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 15
  },
  notchDevice: {
    paddingTop: 44 // Additional padding for notch
  },
  tabletDevice: {
    padding: 30
  },
  phoneDevice: {
    padding: 15
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20
  }
})

export {
  useResponsiveDimensions,
  ResponsiveText,
  AdaptiveLayout,
  ResponsiveGrid,
  createResponsiveStyles,
  OrientationAwareComponent,
  DeviceAdaptiveComponent,
  ResponsiveImage,
  ResponsiveModal,
  ResponsiveNavigation
}
```

This comprehensive guide covers deployment configuration, build processes, CI/CD pipelines, and responsive design techniques for React Native applications, ensuring they work seamlessly across different devices, screen sizes, and deployment environments.

---