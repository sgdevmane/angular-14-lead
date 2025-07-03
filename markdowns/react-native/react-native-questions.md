# React Native Interview Questions and Answers

## Table of Contents
- [React Native Interview Questions and Answers](#react-native-interview-questions-and-answers)
  - [Table of Contents](#table-of-contents)
  - [React Native Fundamentals](#react-native-fundamentals)
    - [1. What is React Native and how does it differ from React?](#1-what-is-react-native-and-how-does-it-differ-from-react)
    - [2. How do you handle styling in React Native?](#2-how-do-you-handle-styling-in-react-native)
    - [3. How do you manage component lifecycle in React Native?](#3-how-do-you-manage-component-lifecycle-in-react-native)
    - [4. How do you handle forms and user input in React Native?](#4-how-do-you-handle-forms-and-user-input-in-react-native)
  - [Navigation](#navigation)
    - [5. How do you implement navigation in React Native?](#5-how-do-you-implement-navigation-in-react-native)
  - [State Management](#state-management)
    - [6. How do you manage state in React Native applications?](#6-how-do-you-manage-state-in-react-native-applications)
    - [7. How do you handle data persistence in React Native?](#7-how-do-you-handle-data-persistence-in-react-native)
  - [Native Modules and APIs](#native-modules-and-apis)
    - [8. How do you access native device features in React Native?](#8-how-do-you-access-native-device-features-in-react-native)
  - [Performance Optimization](#performance-optimization)
    - [9. How do you optimize performance in React Native applications?](#9-how-do-you-optimize-performance-in-react-native-applications)
    - [10. How do you test React Native applications?](#10-how-do-you-test-react-native-applications)
  - [Deployment and Build Configuration](#deployment-and-build-configuration)
    - [11. How do you configure and deploy React Native applications for different platforms?](#11-how-do-you-configure-and-deploy-react-native-applications-for-different-platforms)
    - [12. How do you handle different screen sizes and orientations in React Native?](#12-how-do-you-handle-different-screen-sizes-and-orientations-in-react-native)
  - [Animation and Gestures](#animation-and-gestures)
    - [13. How do you implement complex animations and gesture handling in React Native?](#13-how-do-you-implement-complex-animations-and-gesture-handling-in-react-native)
  - [Offline Capabilities and Caching](#offline-capabilities-and-caching)
    - [14. How do you implement offline capabilities and advanced caching strategies in React Native?](#14-how-do-you-implement-offline-capabilities-and-advanced-caching-strategies-in-react-native)
  - [Security and Authentication](#security-and-authentication)
    - [15. How do you implement comprehensive security and authentication in React Native?](#15-how-do-you-implement-comprehensive-security-and-authentication-in-react-native)
  - [Code Splitting and Lazy Loading](#code-splitting-and-lazy-loading)
    - [16. How do you implement code splitting and lazy loading in React Native?](#16-how-do-you-implement-code-splitting-and-lazy-loading-in-react-native)
  - [Accessibility (a11y)](#accessibility-a11y)
    - [17. How do you implement comprehensive accessibility features in React Native?](#17-how-do-you-implement-comprehensive-accessibility-features-in-react-native)
  - [Background Tasks and Services](#background-tasks-and-services)
    - [18. How do you implement background tasks and services in React Native?](#18-how-do-you-implement-background-tasks-and-services-in-react-native)
  - [Camera and Media](#camera-and-media)
    - [19. How do you implement advanced camera and media features in React Native?](#19-how-do-you-implement-advanced-camera-and-media-features-in-react-native)
  - [Maps and Location Services](#maps-and-location-services)
    - [20. How do you implement advanced maps and location services in React Native?](#20-how-do-you-implement-advanced-maps-and-location-services-in-react-native)

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

## Animation and Gestures

### 13. How do you implement complex animations and gesture handling in React Native?

**Answer:**
React Native provides multiple animation APIs including Animated API, LayoutAnimation, and react-native-reanimated for complex animations and gesture handling.

**1. Animated API - Basic Animations:**

```javascript
import React, { useRef, useEffect } from 'react'
import { View, Animated, TouchableOpacity, StyleSheet, Easing } from 'react-native'

// Basic Animated Value
const BasicAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  const startAnimation = () => {
    // Parallel animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        friction: 3,
        tension: 40,
        useNativeDriver: true
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ]).start()
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedBox,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { rotate: spin }
            ]
          }
        ]}
      />
      <TouchableOpacity style={styles.button} onPress={startAnimation}>
        <Animated.Text>Start Animation</Animated.Text>
      </TouchableOpacity>
    </View>
  )
}

// Complex Animation Sequences
const ComplexAnimationSequence = () => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const opacity = useRef(new Animated.Value(1)).current
  const scale = useRef(new Animated.Value(1)).current

  const animateSequence = () => {
    Animated.sequence([
      // Move right
      Animated.timing(position, {
        toValue: { x: 100, y: 0 },
        duration: 500,
        useNativeDriver: true
      }),
      // Scale up while moving down
      Animated.parallel([
        Animated.timing(position, {
          toValue: { x: 100, y: 100 },
          duration: 500,
          useNativeDriver: true
        }),
        Animated.spring(scale, {
          toValue: 1.5,
          useNativeDriver: true
        })
      ]),
      // Fade out while moving back
      Animated.parallel([
        Animated.timing(position, {
          toValue: { x: 0, y: 0 },
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true
        })
      ]),
      // Reset
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedBox,
          {
            opacity,
            transform: [
              ...position.getTranslateTransform(),
              { scale }
            ]
          }
        ]}
      />
      <TouchableOpacity style={styles.button} onPress={animateSequence}>
        <Animated.Text>Start Sequence</Animated.Text>
      </TouchableOpacity>
    </View>
  )
}
```

**2. React Native Reanimated - Advanced Animations:**

```javascript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  runOnJS,
  interpolate,
  Extrapolate
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

// Reanimated Hook-based Animation
const ReanimatedComponent = () => {
  const translateX = useSharedValue(0)
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ]
    }
  })

  const startComplexAnimation = () => {
    // Sequence of animations
    translateX.value = withSequence(
      withTiming(100, { duration: 500 }),
      withSpring(0, { damping: 10 })
    )
    
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 250 }),
        withTiming(1, { duration: 250 })
      ),
      3,
      false
    )
    
    rotation.value = withTiming(360, { duration: 1000 })
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedBox, animatedStyle]} />
      <TouchableOpacity style={styles.button} onPress={startComplexAnimation}>
        <Text>Start Reanimated</Text>
      </TouchableOpacity>
    </View>
  )
}

// Advanced Gesture Handling
const GestureAnimationComponent = () => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)
  const opacity = useSharedValue(1)

  // Pan Gesture
  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.1)
      opacity.value = withTiming(0.8)
    })
    .onUpdate((event) => {
      translateX.value = event.translationX
      translateY.value = event.translationY
    })
    .onEnd((event) => {
      // Snap back with physics
      translateX.value = withSpring(0)
      translateY.value = withSpring(0)
      scale.value = withSpring(1)
      opacity.value = withTiming(1)
      
      // Add velocity-based animation
      if (Math.abs(event.velocityX) > 500) {
        translateX.value = withSequence(
          withTiming(event.velocityX > 0 ? 200 : -200, { duration: 200 }),
          withSpring(0)
        )
      }
    })

  // Pinch Gesture
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.max(0.5, Math.min(event.scale, 3))
    })
    .onEnd(() => {
      scale.value = withSpring(1)
    })

  // Rotation Gesture
  const rotationGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = (event.rotation * 180) / Math.PI
    })
    .onEnd(() => {
      rotation.value = withSpring(0)
    })

  // Simultaneous gestures
  const simultaneousGesture = Gesture.Simultaneous(
    panGesture,
    pinchGesture,
    rotationGesture
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
      opacity: opacity.value
    }
  })

  return (
    <View style={styles.container}>
      <GestureDetector gesture={simultaneousGesture}>
        <Animated.View style={[styles.gestureBox, animatedStyle]} />
      </GestureDetector>
    </View>
  )
}
```

**3. Custom Animation Hooks:**

```javascript
// Custom Animation Hooks
const useSpringAnimation = (initialValue = 0) => {
  const value = useSharedValue(initialValue)
  
  const animateTo = (toValue, config = {}) => {
    value.value = withSpring(toValue, {
      damping: 15,
      stiffness: 150,
      ...config
    })
  }
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: value.value }]
  }))
  
  return { value, animateTo, animatedStyle }
}

const useSlideAnimation = (direction = 'horizontal') => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  
  const slideIn = (distance = 100) => {
    if (direction === 'horizontal') {
      translateX.value = withSpring(0, { damping: 20 })
    } else {
      translateY.value = withSpring(0, { damping: 20 })
    }
  }
  
  const slideOut = (distance = 100) => {
    if (direction === 'horizontal') {
      translateX.value = withTiming(distance, { duration: 300 })
    } else {
      translateY.value = withTiming(distance, { duration: 300 })
    }
  }
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ]
  }))
  
  return { slideIn, slideOut, animatedStyle }
}

// Morphing Animation Hook
const useMorphAnimation = () => {
  const progress = useSharedValue(0)
  
  const morph = (toValue = 1) => {
    progress.value = withTiming(toValue, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    })
  }
  
  const createMorphStyle = (fromStyle, toStyle) => {
    return useAnimatedStyle(() => {
      const interpolatedStyle = {}
      
      Object.keys(fromStyle).forEach(key => {
        if (typeof fromStyle[key] === 'number' && typeof toStyle[key] === 'number') {
          interpolatedStyle[key] = interpolate(
            progress.value,
            [0, 1],
            [fromStyle[key], toStyle[key]],
            Extrapolate.CLAMP
          )
        }
      })
      
      return interpolatedStyle
    })
  }
  
  return { progress, morph, createMorphStyle }
}
```

**4. Advanced Animation Patterns:**

```javascript
// Staggered Animation
const StaggeredAnimation = ({ items }) => {
  const animations = items.map(() => useSharedValue(0))
  
  const startStaggered = () => {
    animations.forEach((anim, index) => {
      anim.value = withDelay(
        index * 100, // Stagger delay
        withSpring(1, { damping: 15 })
      )
    })
  }
  
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          opacity: animations[index].value,
          transform: [
            {
              translateY: interpolate(
                animations[index].value,
                [0, 1],
                [50, 0],
                Extrapolate.CLAMP
              )
            }
          ]
        }))
        
        return (
          <Animated.View key={index} style={[styles.item, animatedStyle]}>
            <Text>{item}</Text>
          </Animated.View>
        )
      })}
      <TouchableOpacity onPress={startStaggered}>
        <Text>Start Staggered</Text>
      </TouchableOpacity>
    </View>
  )
}

// Physics-based Animation
const PhysicsAnimation = () => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const velocityX = useSharedValue(0)
  const velocityY = useSharedValue(0)
  
  const startPhysics = () => {
    // Initial velocity
    velocityX.value = 500
    velocityY.value = -800
    
    // Physics simulation
    const gravity = 980 // pixels/second²
    const friction = 0.98
    const bounce = 0.8
    
    const animate = () => {
      'worklet'
      
      // Apply gravity
      velocityY.value += gravity * 0.016 // 60fps
      
      // Apply friction
      velocityX.value *= friction
      velocityY.value *= friction
      
      // Update position
      translateX.value += velocityX.value * 0.016
      translateY.value += velocityY.value * 0.016
      
      // Boundary collision
      if (translateY.value > 300) {
        translateY.value = 300
        velocityY.value *= -bounce
      }
      
      if (translateX.value > 200 || translateX.value < -200) {
        velocityX.value *= -bounce
        translateX.value = translateX.value > 0 ? 200 : -200
      }
      
      // Continue animation if still moving
      if (Math.abs(velocityX.value) > 10 || Math.abs(velocityY.value) > 10) {
        requestAnimationFrame(animate)
      }
    }
    
    animate()
  }
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ]
  }))
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, animatedStyle]} />
      <TouchableOpacity onPress={startPhysics}>
        <Text>Start Physics</Text>
      </TouchableOpacity>
    </View>
  )
}
```

**5. Performance Optimization:**

```javascript
// Animation Performance Manager
class AnimationPerformanceManager {
  static optimizeForPerformance() {
    return {
      // Always use native driver when possible
      useNativeDriver: true,
      
      // Reduce animation complexity
      reduceMotion: {
        duration: 200,
        easing: Easing.ease
      },
      
      // Batch animations
      batchAnimations: (animations) => {
        return Animated.parallel(animations)
      },
      
      // Memory management
      cleanup: (animatedValues) => {
        animatedValues.forEach(value => {
          if (value.removeAllListeners) {
            value.removeAllListeners()
          }
        })
      }
    }
  }
  
  static createOptimizedAnimation(config) {
    return {
      ...config,
      useNativeDriver: config.useNativeDriver !== false,
      isInteraction: false, // Don't delay other interactions
    }
  }
}

// Animation Best Practices
const AnimationBestPractices = {
  // 1. Use native driver for transform and opacity
  nativeDriverProps: ['transform', 'opacity'],
  
  // 2. Avoid animating layout properties
  avoidLayoutProps: ['width', 'height', 'padding', 'margin'],
  
  // 3. Use InteractionManager for complex animations
  deferAnimation: (animation) => {
    InteractionManager.runAfterInteractions(() => {
      animation.start()
    })
  },
  
  // 4. Optimize gesture handling
  optimizeGestures: {
    shouldCancelWhenOutside: true,
    activeOffsetX: [-10, 10],
    activeOffsetY: [-10, 10]
  }
}
```

This comprehensive guide covers basic to advanced animation techniques, gesture handling, custom hooks, physics-based animations, and performance optimization strategies for React Native applications.

---

## Offline Capabilities and Caching

### 14. How do you implement offline capabilities and advanced caching strategies in React Native?

**Answer:**
Implementing offline capabilities requires network detection, data synchronization, local storage, and cache management strategies.

**1. Network State Management:**

```javascript
import NetInfo from '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Network State Store
const useNetworkStore = create((set, get) => ({
  isConnected: true,
  connectionType: 'unknown',
  isInternetReachable: true,
  
  setNetworkState: (state) => set(state),
  
  // Check if device can make network requests
  canMakeRequests: () => {
    const { isConnected, isInternetReachable } = get()
    return isConnected && isInternetReachable
  }
}))

// Network Monitor Hook
const useNetworkMonitor = () => {
  const { setNetworkState, canMakeRequests } = useNetworkStore()
  
  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState({
        isConnected: state.isConnected,
        connectionType: state.type,
        isInternetReachable: state.isInternetReachable
      })
    })
    
    // Initial network state
    NetInfo.fetch().then(state => {
      setNetworkState({
        isConnected: state.isConnected,
        connectionType: state.type,
        isInternetReachable: state.isInternetReachable
      })
    })
    
    return unsubscribe
  }, [])
  
  return { canMakeRequests: canMakeRequests() }
}

// Network-aware API Client
class NetworkAwareApiClient {
  constructor() {
    this.baseURL = 'https://api.example.com'
    this.requestQueue = []
    this.retryAttempts = 3
    this.retryDelay = 1000
  }
  
  async request(endpoint, options = {}) {
    const { canMakeRequests } = useNetworkStore.getState()
    
    if (!canMakeRequests()) {
      // Queue request for later
      return this.queueRequest(endpoint, options)
    }
    
    try {
      const response = await this.makeRequest(endpoint, options)
      await this.processQueuedRequests()
      return response
    } catch (error) {
      if (this.isNetworkError(error)) {
        return this.queueRequest(endpoint, options)
      }
      throw error
    }
  }
  
  async makeRequest(endpoint, options) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      timeout: 10000,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }
    
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return response.json()
  }
  
  queueRequest(endpoint, options) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({
        endpoint,
        options,
        resolve,
        reject,
        timestamp: Date.now()
      })
    })
  }
  
  async processQueuedRequests() {
    const { canMakeRequests } = useNetworkStore.getState()
    
    if (!canMakeRequests() || this.requestQueue.length === 0) {
      return
    }
    
    const requests = [...this.requestQueue]
    this.requestQueue = []
    
    for (const request of requests) {
      try {
        const response = await this.makeRequest(request.endpoint, request.options)
        request.resolve(response)
      } catch (error) {
        if (this.isNetworkError(error)) {
          this.requestQueue.push(request)
        } else {
          request.reject(error)
        }
      }
    }
  }
  
  isNetworkError(error) {
    return error.message.includes('Network') || 
           error.message.includes('timeout') ||
           error.message.includes('Failed to fetch')
  }
}
```

**2. Advanced Caching System:**

```javascript
// Cache Manager with TTL and LRU
class CacheManager {
  constructor(maxSize = 100, defaultTTL = 3600000) { // 1 hour default TTL
    this.cache = new Map()
    this.accessOrder = new Map()
    this.maxSize = maxSize
    this.defaultTTL = defaultTTL
  }
  
  async set(key, value, ttl = this.defaultTTL) {
    // Remove oldest if cache is full
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU()
    }
    
    const expiresAt = Date.now() + ttl
    const cacheEntry = {
      value,
      expiresAt,
      createdAt: Date.now(),
      accessCount: 0
    }
    
    this.cache.set(key, cacheEntry)
    this.updateAccessOrder(key)
    
    // Persist to AsyncStorage for critical data
    if (this.isPersistentKey(key)) {
      await AsyncStorage.setItem(
        `cache_${key}`,
        JSON.stringify(cacheEntry)
      )
    }
  }
  
  async get(key) {
    let cacheEntry = this.cache.get(key)
    
    // Try to load from persistent storage if not in memory
    if (!cacheEntry && this.isPersistentKey(key)) {
      try {
        const stored = await AsyncStorage.getItem(`cache_${key}`)
        if (stored) {
          cacheEntry = JSON.parse(stored)
          this.cache.set(key, cacheEntry)
        }
      } catch (error) {
        console.warn('Failed to load from persistent cache:', error)
      }
    }
    
    if (!cacheEntry) {
      return null
    }
    
    // Check if expired
    if (Date.now() > cacheEntry.expiresAt) {
      this.delete(key)
      return null
    }
    
    // Update access statistics
    cacheEntry.accessCount++
    cacheEntry.lastAccessed = Date.now()
    this.updateAccessOrder(key)
    
    return cacheEntry.value
  }
  
  async delete(key) {
    this.cache.delete(key)
    this.accessOrder.delete(key)
    
    if (this.isPersistentKey(key)) {
      await AsyncStorage.removeItem(`cache_${key}`)
    }
  }
  
  evictLRU() {
    const oldestKey = this.accessOrder.keys().next().value
    if (oldestKey) {
      this.delete(oldestKey)
    }
  }
  
  updateAccessOrder(key) {
    this.accessOrder.delete(key)
    this.accessOrder.set(key, Date.now())
  }
  
  isPersistentKey(key) {
    // Define which keys should be persisted
    return key.startsWith('user_') || 
           key.startsWith('settings_') ||
           key.startsWith('critical_')
  }
  
  // Cache statistics
  getStats() {
    const entries = Array.from(this.cache.entries())
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate(),
      oldestEntry: Math.min(...entries.map(([, entry]) => entry.createdAt)),
      newestEntry: Math.max(...entries.map(([, entry]) => entry.createdAt)),
      totalAccessCount: entries.reduce((sum, [, entry]) => sum + entry.accessCount, 0)
    }
  }
  
  calculateHitRate() {
    // Implementation depends on tracking hits/misses
    return 0.85 // Placeholder
  }
}

// Global cache instance
const globalCache = new CacheManager()
```

**3. Offline Data Synchronization:**

```javascript
// Offline Data Store with Sync
const useOfflineStore = create(
  persist(
    (set, get) => ({
      // Offline data
      offlineData: {},
      pendingActions: [],
      lastSyncTimestamp: null,
      syncInProgress: false,
      
      // Add data to offline store
      addOfflineData: (key, data) => {
        set(state => ({
          offlineData: {
            ...state.offlineData,
            [key]: {
              ...data,
              timestamp: Date.now(),
              synced: false
            }
          }
        }))
      },
      
      // Queue action for sync
      queueAction: (action) => {
        set(state => ({
          pendingActions: [
            ...state.pendingActions,
            {
              ...action,
              id: Date.now().toString(),
              timestamp: Date.now(),
              retryCount: 0
            }
          ]
        }))
      },
      
      // Sync with server
      syncData: async () => {
        const { pendingActions, offlineData } = get()
        
        if (get().syncInProgress) {
          return
        }
        
        set({ syncInProgress: true })
        
        try {
          // Sync pending actions
          for (const action of pendingActions) {
            await get().processPendingAction(action)
          }
          
          // Sync offline data
          await get().syncOfflineData()
          
          set({
            lastSyncTimestamp: Date.now(),
            syncInProgress: false
          })
        } catch (error) {
          console.error('Sync failed:', error)
          set({ syncInProgress: false })
        }
      },
      
      processPendingAction: async (action) => {
        try {
          const apiClient = new NetworkAwareApiClient()
          await apiClient.request(action.endpoint, action.options)
          
          // Remove successful action
          set(state => ({
            pendingActions: state.pendingActions.filter(a => a.id !== action.id)
          }))
        } catch (error) {
          // Increment retry count
          set(state => ({
            pendingActions: state.pendingActions.map(a => 
              a.id === action.id 
                ? { ...a, retryCount: a.retryCount + 1 }
                : a
            )
          }))
          
          // Remove if max retries exceeded
          if (action.retryCount >= 3) {
            set(state => ({
              pendingActions: state.pendingActions.filter(a => a.id !== action.id)
            }))
          }
        }
      },
      
      syncOfflineData: async () => {
        const { offlineData } = get()
        const apiClient = new NetworkAwareApiClient()
        
        for (const [key, data] of Object.entries(offlineData)) {
          if (!data.synced) {
            try {
              await apiClient.request('/sync', {
                method: 'POST',
                body: JSON.stringify({ key, data })
              })
              
              // Mark as synced
              set(state => ({
                offlineData: {
                  ...state.offlineData,
                  [key]: { ...data, synced: true }
                }
              }))
            } catch (error) {
              console.error(`Failed to sync ${key}:`, error)
            }
          }
        }
      }
    }),
    {
      name: 'offline-store',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name)
        }
      }
    }
  )
)
```

**4. Offline-First Data Layer:**

```javascript
// Offline-First Data Manager
class OfflineFirstDataManager {
  constructor() {
    this.cache = globalCache
    this.apiClient = new NetworkAwareApiClient()
    this.offlineStore = useOfflineStore
  }
  
  async getData(endpoint, options = {}) {
    const cacheKey = this.generateCacheKey(endpoint, options)
    const { forceRefresh = false, cacheFirst = true } = options
    
    // Try cache first (if not forcing refresh)
    if (!forceRefresh && cacheFirst) {
      const cachedData = await this.cache.get(cacheKey)
      if (cachedData) {
        // Optionally fetch fresh data in background
        if (options.backgroundRefresh) {
          this.refreshInBackground(endpoint, options, cacheKey)
        }
        return cachedData
      }
    }
    
    // Try network
    try {
      const data = await this.apiClient.request(endpoint, options)
      await this.cache.set(cacheKey, data, options.ttl)
      return data
    } catch (error) {
      // Fallback to cache if network fails
      const cachedData = await this.cache.get(cacheKey)
      if (cachedData) {
        console.warn('Network failed, using cached data:', error)
        return cachedData
      }
      
      // Fallback to offline store
      const offlineData = this.offlineStore.getState().offlineData[cacheKey]
      if (offlineData) {
        console.warn('Using offline data:', error)
        return offlineData
      }
      
      throw error
    }
  }
  
  async setData(endpoint, data, options = {}) {
    const cacheKey = this.generateCacheKey(endpoint, options)
    
    // Always cache locally first
    await this.cache.set(cacheKey, data, options.ttl)
    this.offlineStore.getState().addOfflineData(cacheKey, data)
    
    // Try to sync with server
    try {
      const response = await this.apiClient.request(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options
      })
      
      // Update cache with server response
      await this.cache.set(cacheKey, response, options.ttl)
      return response
    } catch (error) {
      // Queue for later sync
      this.offlineStore.getState().queueAction({
        endpoint,
        options: {
          method: 'POST',
          body: JSON.stringify(data),
          ...options
        }
      })
      
      console.warn('Queued for later sync:', error)
      return data // Return local data
    }
  }
  
  async refreshInBackground(endpoint, options, cacheKey) {
    try {
      const data = await this.apiClient.request(endpoint, options)
      await this.cache.set(cacheKey, data, options.ttl)
    } catch (error) {
      console.warn('Background refresh failed:', error)
    }
  }
  
  generateCacheKey(endpoint, options) {
    const params = options.params || {}
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')
    
    return `${endpoint}${sortedParams ? '?' + sortedParams : ''}`
  }
}

// Hook for offline-first data fetching
const useOfflineFirstData = (endpoint, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dataManager = useRef(new OfflineFirstDataManager()).current
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await dataManager.getData(endpoint, options)
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [endpoint, JSON.stringify(options)])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  const refetch = useCallback(() => {
    return fetchData()
  }, [fetchData])
  
  const updateData = useCallback(async (newData) => {
    try {
      const result = await dataManager.setData(endpoint, newData, options)
      setData(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    }
  }, [endpoint, JSON.stringify(options)])
  
  return { data, loading, error, refetch, updateData }
}
```

**5. Offline UI Components:**

```javascript
// Offline Indicator Component
const OfflineIndicator = () => {
  const { isConnected } = useNetworkStore()
  const { pendingActions } = useOfflineStore()
  
  if (isConnected && pendingActions.length === 0) {
    return null
  }
  
  return (
    <View style={styles.offlineIndicator}>
      <Icon name={isConnected ? 'sync' : 'wifi-off'} size={16} color="white" />
      <Text style={styles.offlineText}>
        {isConnected 
          ? `${pendingActions.length} pending sync${pendingActions.length !== 1 ? 's' : ''}`
          : 'Offline mode'
        }
      </Text>
    </View>
  )
}

// Sync Button Component
const SyncButton = () => {
  const { syncData, syncInProgress, pendingActions } = useOfflineStore()
  const { canMakeRequests } = useNetworkMonitor()
  
  const handleSync = async () => {
    if (canMakeRequests && !syncInProgress) {
      await syncData()
    }
  }
  
  return (
    <TouchableOpacity 
      style={[
        styles.syncButton,
        (!canMakeRequests || syncInProgress) && styles.syncButtonDisabled
      ]}
      onPress={handleSync}
      disabled={!canMakeRequests || syncInProgress}
    >
      {syncInProgress ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Icon name="sync" size={20} color="white" />
      )}
      <Text style={styles.syncButtonText}>
        Sync ({pendingActions.length})
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20
  },
  offlineText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '600'
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8
  },
  syncButtonDisabled: {
    backgroundColor: '#ccc'
  },
  syncButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '600'
  }
})
```

This comprehensive guide covers network monitoring, advanced caching with TTL and LRU, offline data synchronization, offline-first data management, and UI components for handling offline scenarios in React Native applications.

---

## Security and Authentication

### 15. How do you implement comprehensive security and authentication in React Native?

**Answer:**
Security in React Native involves secure storage, authentication flows, API security, biometric authentication, and protection against common vulnerabilities.

**1. Secure Storage and Keychain:**

```javascript
import * as Keychain from 'react-native-keychain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CryptoJS from 'crypto-js'
import { MMKV } from 'react-native-mmkv'

// Secure Storage Manager
class SecureStorageManager {
  constructor() {
    this.storage = new MMKV({
      id: 'secure-storage',
      encryptionKey: 'your-encryption-key'
    })
  }
  
  // Store sensitive data in Keychain
  async storeSecureData(key, data) {
    try {
      await Keychain.setInternetCredentials(
        key,
        JSON.stringify(data),
        '', // No password needed
        {
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
          authenticationType: Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
          accessGroup: 'your.app.bundle.id',
          storage: Keychain.STORAGE_TYPE.KC
        }
      )
      return true
    } catch (error) {
      console.error('Failed to store secure data:', error)
      return false
    }
  }
  
  // Retrieve sensitive data from Keychain
  async getSecureData(key) {
    try {
      const credentials = await Keychain.getInternetCredentials(key)
      if (credentials) {
        return JSON.parse(credentials.username)
      }
      return null
    } catch (error) {
      console.error('Failed to retrieve secure data:', error)
      return null
    }
  }
  
  // Store encrypted data in MMKV
  storeEncryptedData(key, data, encryptionKey) {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        encryptionKey
      ).toString()
      this.storage.set(key, encrypted)
      return true
    } catch (error) {
      console.error('Failed to store encrypted data:', error)
      return false
    }
  }
  
  // Retrieve encrypted data from MMKV
  getEncryptedData(key, encryptionKey) {
    try {
      const encrypted = this.storage.getString(key)
      if (encrypted) {
        const decrypted = CryptoJS.AES.decrypt(encrypted, encryptionKey)
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
      }
      return null
    } catch (error) {
      console.error('Failed to retrieve encrypted data:', error)
      return null
    }
  }
  
  // Clear all secure data
  async clearSecureData() {
    try {
      await Keychain.resetInternetCredentials()
      this.storage.clearAll()
      return true
    } catch (error) {
      console.error('Failed to clear secure data:', error)
      return false
    }
  }
}

// Token Manager with automatic refresh
class TokenManager {
  constructor() {
    this.secureStorage = new SecureStorageManager()
    this.refreshPromise = null
  }
  
  async storeTokens(accessToken, refreshToken) {
    const tokenData = {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + (15 * 60 * 1000), // 15 minutes
      createdAt: Date.now()
    }
    
    return await this.secureStorage.storeSecureData('auth_tokens', tokenData)
  }
  
  async getAccessToken() {
    const tokenData = await this.secureStorage.getSecureData('auth_tokens')
    
    if (!tokenData) {
      return null
    }
    
    // Check if token is expired
    if (Date.now() >= tokenData.expiresAt) {
      return await this.refreshAccessToken()
    }
    
    return tokenData.accessToken
  }
  
  async refreshAccessToken() {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return await this.refreshPromise
    }
    
    this.refreshPromise = this.performTokenRefresh()
    const result = await this.refreshPromise
    this.refreshPromise = null
    
    return result
  }
  
  async performTokenRefresh() {
    try {
      const tokenData = await this.secureStorage.getSecureData('auth_tokens')
      
      if (!tokenData?.refreshToken) {
        throw new Error('No refresh token available')
      }
      
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: tokenData.refreshToken
        })
      })
      
      if (!response.ok) {
        throw new Error('Token refresh failed')
      }
      
      const { accessToken, refreshToken } = await response.json()
      await this.storeTokens(accessToken, refreshToken)
      
      return accessToken
    } catch (error) {
      console.error('Token refresh failed:', error)
      await this.clearTokens()
      throw error
    }
  }
  
  async clearTokens() {
    return await this.secureStorage.clearSecureData()
  }
}
```

**2. Biometric Authentication:**

```javascript
import TouchID from 'react-native-touch-id'
import FingerprintScanner from 'react-native-fingerprint-scanner'

// Biometric Authentication Manager
class BiometricAuthManager {
  constructor() {
    this.isSupported = false
    this.biometryType = null
    this.init()
  }
  
  async init() {
    try {
      // Check TouchID/FaceID support
      this.biometryType = await TouchID.isSupported()
      this.isSupported = true
    } catch (error) {
      try {
        // Fallback to fingerprint scanner
        this.isSupported = await FingerprintScanner.isSensorAvailable()
        this.biometryType = 'Fingerprint'
      } catch (fingerprintError) {
        console.warn('Biometric authentication not supported')
        this.isSupported = false
      }
    }
  }
  
  async authenticate(reason = 'Please authenticate to continue') {
    if (!this.isSupported) {
      throw new Error('Biometric authentication not supported')
    }
    
    try {
      if (this.biometryType === 'Fingerprint') {
        return await this.authenticateWithFingerprint(reason)
      } else {
        return await this.authenticateWithTouchID(reason)
      }
    } catch (error) {
      throw this.handleBiometricError(error)
    }
  }
  
  async authenticateWithTouchID(reason) {
    const optionalConfigObject = {
      title: 'Authentication Required',
      subtitle: reason,
      imageColor: '#e00606',
      imageErrorColor: '#ff0000',
      sensorDescription: 'Touch sensor',
      sensorErrorDescription: 'Failed',
      cancelText: 'Cancel',
      fallbackLabel: 'Show Passcode',
      unifiedErrors: false,
      passcodeFallback: true
    }
    
    return await TouchID.authenticate(reason, optionalConfigObject)
  }
  
  async authenticateWithFingerprint(reason) {
    return new Promise((resolve, reject) => {
      FingerprintScanner
        .authenticate({
          description: reason,
          fallbackEnabled: true
        })
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  
  handleBiometricError(error) {
    const errorMap = {
      'LAErrorUserCancel': 'User cancelled authentication',
      'LAErrorUserFallback': 'User chose to enter passcode',
      'LAErrorSystemCancel': 'System cancelled authentication',
      'LAErrorPasscodeNotSet': 'Passcode not set on device',
      'LAErrorTouchIDNotAvailable': 'Touch ID not available',
      'LAErrorTouchIDNotEnrolled': 'Touch ID not enrolled',
      'LAErrorTouchIDLockout': 'Touch ID locked out',
      'RNFingerprintScannerNotSupported': 'Fingerprint scanner not supported',
      'RNFingerprintScannerNotEnrolled': 'No fingerprints enrolled',
      'RNFingerprintScannerNotAvailable': 'Fingerprint scanner not available'
    }
    
    const message = errorMap[error.name] || error.message || 'Authentication failed'
    return new Error(message)
  }
  
  getBiometryType() {
    return this.biometryType
  }
  
  isAvailable() {
    return this.isSupported
  }
}
```

**3. Authentication Flow Management:**

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Authentication Store
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      authError: null,
      biometricEnabled: false,
      
      // Initialize authentication
      initAuth: async () => {
        set({ isLoading: true })
        
        try {
          const tokenManager = new TokenManager()
          const accessToken = await tokenManager.getAccessToken()
          
          if (accessToken) {
            const user = await get().validateToken(accessToken)
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false,
              authError: null 
            })
          } else {
            set({ isLoading: false })
          }
        } catch (error) {
          console.error('Auth initialization failed:', error)
          set({ 
            isLoading: false, 
            authError: error.message 
          })
        }
      },
      
      // Login with credentials
      login: async (email, password, rememberMe = false) => {
        set({ isLoading: true, authError: null })
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })
          
          if (!response.ok) {
            throw new Error('Invalid credentials')
          }
          
          const { user, accessToken, refreshToken } = await response.json()
          
          // Store tokens securely
          const tokenManager = new TokenManager()
          await tokenManager.storeTokens(accessToken, refreshToken)
          
          // Store user data
          if (rememberMe) {
            const secureStorage = new SecureStorageManager()
            await secureStorage.storeSecureData('user_data', user)
          }
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            authError: null 
          })
          
          return { success: true, user }
        } catch (error) {
          set({ 
            isLoading: false, 
            authError: error.message 
          })
          return { success: false, error: error.message }
        }
      },
      
      // Biometric login
      biometricLogin: async () => {
        set({ isLoading: true, authError: null })
        
        try {
          const biometricAuth = new BiometricAuthManager()
          
          if (!biometricAuth.isAvailable()) {
            throw new Error('Biometric authentication not available')
          }
          
          await biometricAuth.authenticate('Login with biometrics')
          
          // Retrieve stored user data
          const secureStorage = new SecureStorageManager()
          const userData = await secureStorage.getSecureData('user_data')
          
          if (!userData) {
            throw new Error('No biometric login data found')
          }
          
          // Validate with server
          const tokenManager = new TokenManager()
          const accessToken = await tokenManager.getAccessToken()
          
          if (!accessToken) {
            throw new Error('No valid session found')
          }
          
          const user = await get().validateToken(accessToken)
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            authError: null 
          })
          
          return { success: true, user }
        } catch (error) {
          set({ 
            isLoading: false, 
            authError: error.message 
          })
          return { success: false, error: error.message }
        }
      },
      
      // Validate token with server
      validateToken: async (token) => {
        const response = await fetch('/api/auth/validate', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Token validation failed')
        }
        
        return await response.json()
      },
      
      // Logout
      logout: async () => {
        set({ isLoading: true })
        
        try {
          // Clear tokens
          const tokenManager = new TokenManager()
          await tokenManager.clearTokens()
          
          // Clear secure storage
          const secureStorage = new SecureStorageManager()
          await secureStorage.clearSecureData()
          
          // Notify server
          try {
            await fetch('/api/auth/logout', {
              method: 'POST'
            })
          } catch (error) {
            console.warn('Server logout failed:', error)
          }
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            authError: null 
          })
        } catch (error) {
          console.error('Logout failed:', error)
          set({ isLoading: false })
        }
      },
      
      // Enable/disable biometric authentication
      toggleBiometric: async (enabled) => {
        try {
          if (enabled) {
            const biometricAuth = new BiometricAuthManager()
            
            if (!biometricAuth.isAvailable()) {
              throw new Error('Biometric authentication not available')
            }
            
            await biometricAuth.authenticate('Enable biometric login')
            
            // Store user data for biometric login
            const secureStorage = new SecureStorageManager()
            await secureStorage.storeSecureData('user_data', get().user)
          } else {
            // Clear biometric data
            const secureStorage = new SecureStorageManager()
            await secureStorage.clearSecureData()
          }
          
          set({ biometricEnabled: enabled })
        } catch (error) {
          throw new Error(`Failed to ${enabled ? 'enable' : 'disable'} biometric authentication: ${error.message}`)
        }
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        biometricEnabled: state.biometricEnabled
      })
    }
  )
)
```

**4. API Security and Request Interceptors:**

```javascript
// Secure API Client
class SecureApiClient {
  constructor() {
    this.baseURL = 'https://api.example.com'
    this.tokenManager = new TokenManager()
    this.requestQueue = []
    this.isRefreshing = false
  }
  
  async request(endpoint, options = {}) {
    const config = await this.prepareRequest(endpoint, options)
    
    try {
      const response = await fetch(config.url, config.options)
      return await this.handleResponse(response, endpoint, options)
    } catch (error) {
      throw this.handleError(error)
    }
  }
  
  async prepareRequest(endpoint, options) {
    const url = `${this.baseURL}${endpoint}`
    
    // Get access token
    const accessToken = await this.tokenManager.getAccessToken()
    
    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Client-Version': '1.0.0',
      ...options.headers
    }
    
    // Add authorization header
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }
    
    // Add CSRF protection
    if (options.method && ['POST', 'PUT', 'DELETE'].includes(options.method.toUpperCase())) {
      headers['X-CSRF-Token'] = await this.getCSRFToken()
    }
    
    return {
      url,
      options: {
        ...options,
        headers,
        timeout: options.timeout || 30000
      }
    }
  }
  
  async handleResponse(response, endpoint, originalOptions) {
    // Handle 401 Unauthorized
    if (response.status === 401) {
      return await this.handleUnauthorized(endpoint, originalOptions)
    }
    
    // Handle other HTTP errors
    if (!response.ok) {
      const error = await this.parseErrorResponse(response)
      throw error
    }
    
    // Parse successful response
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }
    
    return await response.text()
  }
  
  async handleUnauthorized(endpoint, originalOptions) {
    // Add request to queue if token refresh is in progress
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.requestQueue.push({ resolve, reject, endpoint, options: originalOptions })
      })
    }
    
    this.isRefreshing = true
    
    try {
      // Attempt token refresh
      await this.tokenManager.refreshAccessToken()
      
      // Process queued requests
      this.processRequestQueue()
      
      // Retry original request
      return await this.request(endpoint, originalOptions)
    } catch (error) {
      // Token refresh failed, logout user
      this.processRequestQueue(error)
      useAuthStore.getState().logout()
      throw new Error('Session expired. Please login again.')
    } finally {
      this.isRefreshing = false
    }
  }
  
  processRequestQueue(error = null) {
    this.requestQueue.forEach(({ resolve, reject, endpoint, options }) => {
      if (error) {
        reject(error)
      } else {
        resolve(this.request(endpoint, options))
      }
    })
    
    this.requestQueue = []
  }
  
  async parseErrorResponse(response) {
    try {
      const errorData = await response.json()
      return new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    } catch (parseError) {
      return new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
  }
  
  async getCSRFToken() {
    // Implement CSRF token retrieval
    try {
      const response = await fetch(`${this.baseURL}/csrf-token`)
      const { token } = await response.json()
      return token
    } catch (error) {
      console.warn('Failed to get CSRF token:', error)
      return null
    }
  }
  
  handleError(error) {
    if (error.name === 'AbortError') {
      return new Error('Request timeout')
    }
    
    if (error.message.includes('Network')) {
      return new Error('Network error. Please check your connection.')
    }
    
    return error
  }
}
```

**5. Security Best Practices and Validation:**

```javascript
// Input Validation and Sanitization
class SecurityValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  static validatePassword(password) {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: [
        password.length < minLength && 'Password must be at least 8 characters long',
        !hasUpperCase && 'Password must contain at least one uppercase letter',
        !hasLowerCase && 'Password must contain at least one lowercase letter',
        !hasNumbers && 'Password must contain at least one number',
        !hasSpecialChar && 'Password must contain at least one special character'
      ].filter(Boolean)
    }
  }
  
  static sanitizeInput(input) {
    if (typeof input !== 'string') {
      return input
    }
    
    // Remove potentially dangerous characters
    return input
      .replace(/[<>"'&]/g, '')
      .trim()
      .substring(0, 1000) // Limit length
  }
  
  static validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone.replace(/[\s-()]/g, ''))
  }
  
  static isSecureUrl(url) {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'https:'
    } catch (error) {
      return false
    }
  }
}

// Security Headers and Protection
class SecurityManager {
  static setupSecurityHeaders() {
    // Configure security headers for WebView
    return {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    }
  }
  
  static detectJailbreak() {
    // Basic jailbreak/root detection
    const suspiciousApps = [
      'cydia://',
      'sileo://',
      'zbra://',
      'undecimus://',
      'checkra1n://'
    ]
    
    return suspiciousApps.some(app => {
      try {
        // This would need native module implementation
        return false // Placeholder
      } catch (error) {
        return false
      }
    })
  }
  
  static enableCertificatePinning() {
    // Certificate pinning configuration
    return {
      hostname: 'api.example.com',
      sslPinningEnabled: true,
      publicKeyHashes: [
        'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
        'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB='
      ]
    }
  }
}

// Global security instance
const secureApiClient = new SecureApiClient()
const biometricAuth = new BiometricAuthManager()
const secureStorage = new SecureStorageManager()

export {
  SecureStorageManager,
  TokenManager,
  BiometricAuthManager,
  useAuthStore,
  SecureApiClient,
  SecurityValidator,
  SecurityManager,
  secureApiClient,
  biometricAuth,
  secureStorage
}
```

This comprehensive guide covers secure storage with Keychain and encryption, biometric authentication, complete authentication flows, secure API communication with automatic token refresh, and security best practices including input validation and protection against common vulnerabilities.

---

## Code Splitting and Lazy Loading

### 16. How do you implement code splitting and lazy loading in React Native?

**Answer:**
Code splitting and lazy loading in React Native help reduce bundle size, improve app startup time, and optimize memory usage through dynamic imports and component-level splitting.

**1. React.lazy and Suspense for Component Splitting:**

```javascript
import React, { Suspense, lazy, useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Lazy load components
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'))
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'))
const ChatScreen = lazy(() => import('./screens/ChatScreen'))
const MediaGallery = lazy(() => import('./components/MediaGallery'))

// Loading component
const LoadingFallback = ({ message = 'Loading...' }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
)

// Enhanced Suspense wrapper with error boundary
class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load component</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    }
    
    return this.props.children
  }
}

// Lazy component wrapper
const LazyComponent = ({ component: Component, fallback, ...props }) => (
  <LazyLoadErrorBoundary>
    <Suspense fallback={fallback || <LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  </LazyLoadErrorBoundary>
)

// Navigation with lazy loading
const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Profile"
          children={(props) => (
            <LazyComponent 
              component={ProfileScreen} 
              fallback={<LoadingFallback message="Loading Profile..." />}
              {...props} 
            />
          )}
        />
        <Stack.Screen 
          name="Settings"
          children={(props) => (
            <LazyComponent 
              component={SettingsScreen} 
              fallback={<LoadingFallback message="Loading Settings..." />}
              {...props} 
            />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
```

**2. Dynamic Import Manager:**

```javascript
// Dynamic import manager with caching
class DynamicImportManager {
  constructor() {
    this.cache = new Map()
    this.loadingPromises = new Map()
  }
  
  async loadComponent(importFunction, componentName) {
    // Return cached component if available
    if (this.cache.has(componentName)) {
      return this.cache.get(componentName)
    }
    
    // Return existing loading promise if component is being loaded
    if (this.loadingPromises.has(componentName)) {
      return this.loadingPromises.get(componentName)
    }
    
    // Create loading promise
    const loadingPromise = this.performImport(importFunction, componentName)
    this.loadingPromises.set(componentName, loadingPromise)
    
    try {
      const component = await loadingPromise
      this.cache.set(componentName, component)
      this.loadingPromises.delete(componentName)
      return component
    } catch (error) {
      this.loadingPromises.delete(componentName)
      throw error
    }
  }
  
  async performImport(importFunction, componentName) {
    try {
      console.log(`Loading component: ${componentName}`)
      const startTime = Date.now()
      
      const module = await importFunction()
      const component = module.default || module
      
      const loadTime = Date.now() - startTime
      console.log(`Component ${componentName} loaded in ${loadTime}ms`)
      
      return component
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error)
      throw new Error(`Failed to load ${componentName}: ${error.message}`)
    }
  }
  
  preloadComponent(importFunction, componentName) {
    // Preload component without waiting
    if (!this.cache.has(componentName) && !this.loadingPromises.has(componentName)) {
      this.loadComponent(importFunction, componentName).catch(error => {
        console.warn(`Preload failed for ${componentName}:`, error)
      })
    }
  }
  
  clearCache() {
    this.cache.clear()
    this.loadingPromises.clear()
  }
  
  getCacheSize() {
    return this.cache.size
  }
  
  getCachedComponents() {
    return Array.from(this.cache.keys())
  }
}

// Global instance
const importManager = new DynamicImportManager()

// Hook for dynamic imports
const useDynamicImport = (importFunction, componentName) => {
  const [component, setComponent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let isMounted = true
    
    const loadComponent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const loadedComponent = await importManager.loadComponent(
          importFunction, 
          componentName
        )
        
        if (isMounted) {
          setComponent(() => loadedComponent)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
          setLoading(false)
        }
      }
    }
    
    loadComponent()
    
    return () => {
      isMounted = false
    }
  }, [importFunction, componentName])
  
  return { component, loading, error }
}
```

**3. Bundle Splitting with Metro Configuration:**

```javascript
// metro.config.js
const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
    transformer,
    ...config
  } = await getDefaultConfig()
  
  return {
    ...config,
    resolver: {
      ...config.resolver,
      sourceExts,
      assetExts,
    },
    transformer: {
      ...transformer,
      // Enable bundle splitting
      minifierConfig: {
        mangle: {
          keep_fnames: true,
        },
        output: {
          ascii_only: true,
          quote_keys: true,
          wrap_iife: true,
        },
        sourceMap: {
          includeSources: false,
        },
        toplevel: false,
        compress: {
          reduce_funcs: false,
        },
      },
    },
    serializer: {
      // Custom serializer for code splitting
      createModuleIdFactory: () => {
        const fileToIdMap = new Map()
        let nextId = 0
        
        return (path) => {
          if (!fileToIdMap.has(path)) {
            fileToIdMap.set(path, nextId++)
          }
          return fileToIdMap.get(path)
        }
      },
      // Split bundles by feature
      processModuleFilter: (module) => {
        // Exclude dev tools and test files from production bundle
        if (module.path.includes('__tests__') || 
            module.path.includes('__mocks__') ||
            module.path.includes('.test.') ||
            module.path.includes('.spec.')) {
          return false
        }
        return true
      },
    },
  }
})()

// Bundle analyzer configuration
const bundleAnalyzer = {
  enabled: process.env.ANALYZE_BUNDLE === 'true',
  openAnalyzer: true,
  analyzerMode: 'server',
  analyzerPort: 8888,
}
```

**4. Feature-Based Code Splitting:**

```javascript
// Feature loader with lazy loading
class FeatureLoader {
  constructor() {
    this.features = new Map()
    this.loadingFeatures = new Set()
  }
  
  // Register feature modules
  registerFeature(featureName, importFunction) {
    this.features.set(featureName, {
      importFunction,
      loaded: false,
      module: null
    })
  }
  
  // Load feature on demand
  async loadFeature(featureName) {
    const feature = this.features.get(featureName)
    
    if (!feature) {
      throw new Error(`Feature '${featureName}' not registered`)
    }
    
    if (feature.loaded) {
      return feature.module
    }
    
    if (this.loadingFeatures.has(featureName)) {
      // Wait for existing load to complete
      return new Promise((resolve, reject) => {
        const checkLoaded = () => {
          if (feature.loaded) {
            resolve(feature.module)
          } else if (!this.loadingFeatures.has(featureName)) {
            reject(new Error(`Failed to load feature '${featureName}'`))
          } else {
            setTimeout(checkLoaded, 100)
          }
        }
        checkLoaded()
      })
    }
    
    this.loadingFeatures.add(featureName)
    
    try {
      console.log(`Loading feature: ${featureName}`)
      const startTime = Date.now()
      
      const module = await feature.importFunction()
      
      feature.module = module.default || module
      feature.loaded = true
      
      const loadTime = Date.now() - startTime
      console.log(`Feature '${featureName}' loaded in ${loadTime}ms`)
      
      return feature.module
    } catch (error) {
      console.error(`Failed to load feature '${featureName}':`, error)
      throw error
    } finally {
      this.loadingFeatures.delete(featureName)
    }
  }
  
  // Preload features
  async preloadFeatures(featureNames) {
    const preloadPromises = featureNames.map(featureName => 
      this.loadFeature(featureName).catch(error => {
        console.warn(`Preload failed for feature '${featureName}':`, error)
      })
    )
    
    await Promise.allSettled(preloadPromises)
  }
  
  // Check if feature is loaded
  isFeatureLoaded(featureName) {
    const feature = this.features.get(featureName)
    return feature ? feature.loaded : false
  }
  
  // Get loaded features
  getLoadedFeatures() {
    return Array.from(this.features.entries())
      .filter(([, feature]) => feature.loaded)
      .map(([name]) => name)
  }
}

// Global feature loader
const featureLoader = new FeatureLoader()

// Register features
featureLoader.registerFeature('chat', () => import('./features/chat'))
featureLoader.registerFeature('media', () => import('./features/media'))
featureLoader.registerFeature('payments', () => import('./features/payments'))
featureLoader.registerFeature('analytics', () => import('./features/analytics'))

// Feature component wrapper
const FeatureComponent = ({ featureName, componentName, fallback, ...props }) => {
  const [FeatureModule, setFeatureModule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let isMounted = true
    
    const loadFeature = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const module = await featureLoader.loadFeature(featureName)
        
        if (isMounted) {
          setFeatureModule(module)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
          setLoading(false)
        }
      }
    }
    
    loadFeature()
    
    return () => {
      isMounted = false
    }
  }, [featureName])
  
  if (loading) {
    return fallback || <LoadingFallback message={`Loading ${featureName}...`} />
  }
  
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load {featureName}</Text>
        <Text style={styles.errorDetails}>{error.message}</Text>
      </View>
    )
  }
  
  if (!FeatureModule || !FeatureModule[componentName]) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Component {componentName} not found in {featureName}</Text>
      </View>
    )
  }
  
  const Component = FeatureModule[componentName]
  return <Component {...props} />
}
```

**5. Performance Monitoring and Optimization:**

```javascript
// Bundle performance monitor
class BundlePerformanceMonitor {
  constructor() {
    this.metrics = {
      bundleSize: 0,
      loadTimes: new Map(),
      memoryUsage: [],
      componentCounts: new Map()
    }
    
    this.startTime = Date.now()
    this.initializeMonitoring()
  }
  
  initializeMonitoring() {
    // Monitor memory usage
    setInterval(() => {
      if (global.performance && global.performance.memory) {
        this.metrics.memoryUsage.push({
          timestamp: Date.now(),
          used: global.performance.memory.usedJSHeapSize,
          total: global.performance.memory.totalJSHeapSize,
          limit: global.performance.memory.jsHeapSizeLimit
        })
        
        // Keep only last 100 measurements
        if (this.metrics.memoryUsage.length > 100) {
          this.metrics.memoryUsage.shift()
        }
      }
    }, 5000)
  }
  
  recordComponentLoad(componentName, loadTime) {
    this.metrics.loadTimes.set(componentName, loadTime)
    
    const count = this.metrics.componentCounts.get(componentName) || 0
    this.metrics.componentCounts.set(componentName, count + 1)
  }
  
  getPerformanceReport() {
    const currentTime = Date.now()
    const uptime = currentTime - this.startTime
    
    const avgLoadTime = Array.from(this.metrics.loadTimes.values())
      .reduce((sum, time) => sum + time, 0) / this.metrics.loadTimes.size || 0
    
    const currentMemory = this.metrics.memoryUsage.length > 0 
      ? this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1]
      : null
    
    return {
      uptime,
      loadedComponents: this.metrics.loadTimes.size,
      averageLoadTime: Math.round(avgLoadTime),
      totalComponentLoads: Array.from(this.metrics.componentCounts.values())
        .reduce((sum, count) => sum + count, 0),
      memoryUsage: currentMemory ? {
        used: Math.round(currentMemory.used / 1024 / 1024), // MB
        total: Math.round(currentMemory.total / 1024 / 1024), // MB
        percentage: Math.round((currentMemory.used / currentMemory.total) * 100)
      } : null,
      slowestComponents: Array.from(this.metrics.loadTimes.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, time]) => ({ name, time: Math.round(time) }))
    }
  }
  
  exportMetrics() {
    return {
      ...this.metrics,
      report: this.getPerformanceReport()
    }
  }
}

// Global performance monitor
const performanceMonitor = new BundlePerformanceMonitor()

// Enhanced lazy loading hook with performance tracking
const useLazyComponent = (importFunction, componentName) => {
  const [component, setComponent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let isMounted = true
    
    const loadComponent = async () => {
      const startTime = Date.now()
      
      try {
        setLoading(true)
        setError(null)
        
        const loadedComponent = await importFunction()
        const loadTime = Date.now() - startTime
        
        performanceMonitor.recordComponentLoad(componentName, loadTime)
        
        if (isMounted) {
          setComponent(() => loadedComponent.default || loadedComponent)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
          setLoading(false)
        }
      }
    }
    
    loadComponent()
    
    return () => {
      isMounted = false
    }
  }, [importFunction, componentName])
  
  return { component, loading, error }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 8
  },
  errorDetails: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})

export {
  LazyComponent,
  DynamicImportManager,
  FeatureLoader,
  FeatureComponent,
  BundlePerformanceMonitor,
  useDynamicImport,
  useLazyComponent,
  importManager,
  featureLoader,
  performanceMonitor
}
```

This comprehensive guide covers React.lazy and Suspense implementation, dynamic import management with caching, Metro configuration for bundle splitting, feature-based code splitting, and performance monitoring for optimized lazy loading in React Native applications.

---

## Accessibility (a11y)

### 17. How do you implement comprehensive accessibility features in React Native?

**Answer:**
Accessibility in React Native ensures your app is usable by people with disabilities through screen readers, voice control, and other assistive technologies.

**1. Basic Accessibility Props and Screen Reader Support:**

```javascript
import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  AccessibilityInfo,
  findNodeHandle,
  Platform
} from 'react-native'

// Accessible Button Component
const AccessibleButton = ({ 
  onPress, 
  title, 
  disabled = false, 
  variant = 'primary',
  accessibilityHint,
  children 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        disabled && styles.buttonDisabled
      ]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled,
        selected: variant === 'selected'
      }}
      // Announce state changes
      accessibilityLiveRegion={variant === 'loading' ? 'polite' : 'none'}
    >
      {children || <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  )
}

// Accessible Form Input
const AccessibleTextInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  error,
  required = false,
  secureTextEntry = false,
  keyboardType = 'default',
  ...props 
}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`
  
  return (
    <View style={styles.inputContainer}>
      <Text 
        style={[
          styles.inputLabel,
          error && styles.inputLabelError,
          isFocused && styles.inputLabelFocused
        ]}
        accessibilityRole="text"
        nativeID={`${inputId}-label`}
      >
        {label}
        {required && (
          <Text 
            style={styles.requiredIndicator}
            accessibilityLabel="required"
          >
            {' *'}
          </Text>
        )}
      </Text>
      
      <TextInput
        ref={inputRef}
        style={[
          styles.textInput,
          error && styles.textInputError,
          isFocused && styles.textInputFocused
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={placeholder}
        accessibilityRequired={required}
        accessibilityInvalidated={!!error}
        accessibilityLabelledBy={`${inputId}-label`}
        accessibilityDescribedBy={error ? errorId : hintId}
        nativeID={inputId}
        {...props}
      />
      
      {error && (
        <Text 
          style={styles.errorText}
          accessibilityRole="alert"
          accessibilityLiveRegion="assertive"
          nativeID={errorId}
        >
          {error}
        </Text>
      )}
    </View>
  )
}

// Accessible List Component
const AccessibleList = ({ data, renderItem, keyExtractor, title }) => {
  return (
    <View>
      {title && (
        <Text 
          style={styles.listTitle}
          accessibilityRole="header"
          accessibilityLevel={2}
        >
          {title}
        </Text>
      )}
      <ScrollView
        accessible={true}
        accessibilityRole="list"
        accessibilityLabel={`${title || 'List'} with ${data.length} items`}
      >
        {data.map((item, index) => (
          <View
            key={keyExtractor(item, index)}
            accessible={true}
            accessibilityRole="listitem"
            accessibilityLabel={`Item ${index + 1} of ${data.length}`}
          >
            {renderItem({ item, index })}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
```

**2. Advanced Accessibility Features:**

```javascript
// Accessibility Manager
class AccessibilityManager {
  constructor() {
    this.isScreenReaderEnabled = false
    this.isReduceMotionEnabled = false
    this.isReduceTransparencyEnabled = false
    this.preferredContentSizeCategory = 'medium'
    
    this.init()
  }
  
  async init() {
    try {
      // Check screen reader status
      this.isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled()
      
      // Check reduce motion preference
      if (Platform.OS === 'ios') {
        this.isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled()
        this.isReduceTransparencyEnabled = await AccessibilityInfo.isReduceTransparencyEnabled()
      }
      
      // Listen for accessibility changes
      AccessibilityInfo.addEventListener(
        'screenReaderChanged',
        this.handleScreenReaderChange.bind(this)
      )
      
      if (Platform.OS === 'ios') {
        AccessibilityInfo.addEventListener(
          'reduceMotionChanged',
          this.handleReduceMotionChange.bind(this)
        )
        
        AccessibilityInfo.addEventListener(
          'reduceTransparencyChanged',
          this.handleReduceTransparencyChange.bind(this)
        )
      }
    } catch (error) {
      console.error('Failed to initialize accessibility manager:', error)
    }
  }
  
  handleScreenReaderChange(isEnabled) {
    this.isScreenReaderEnabled = isEnabled
    console.log('Screen reader changed:', isEnabled)
  }
  
  handleReduceMotionChange(isEnabled) {
    this.isReduceMotionEnabled = isEnabled
    console.log('Reduce motion changed:', isEnabled)
  }
  
  handleReduceTransparencyChange(isEnabled) {
    this.isReduceTransparencyEnabled = isEnabled
    console.log('Reduce transparency changed:', isEnabled)
  }
  
  // Announce message to screen reader
  announceForAccessibility(message, priority = 'polite') {
    if (this.isScreenReaderEnabled) {
      AccessibilityInfo.announceForAccessibility(message)
    }
  }
  
  // Set accessibility focus
  setAccessibilityFocus(reactTag) {
    if (this.isScreenReaderEnabled && reactTag) {
      AccessibilityInfo.setAccessibilityFocus(reactTag)
    }
  }
  
  // Get accessibility preferences
  getAccessibilityPreferences() {
    return {
      screenReaderEnabled: this.isScreenReaderEnabled,
      reduceMotionEnabled: this.isReduceMotionEnabled,
      reduceTransparencyEnabled: this.isReduceTransparencyEnabled,
      preferredContentSizeCategory: this.preferredContentSizeCategory
    }
  }
  
  cleanup() {
    AccessibilityInfo.removeEventListener('screenReaderChanged', this.handleScreenReaderChange)
    if (Platform.OS === 'ios') {
      AccessibilityInfo.removeEventListener('reduceMotionChanged', this.handleReduceMotionChange)
      AccessibilityInfo.removeEventListener('reduceTransparencyChanged', this.handleReduceTransparencyChange)
    }
  }
}

// Global accessibility manager
const accessibilityManager = new AccessibilityManager()

// Accessible Modal Component
const AccessibleModal = ({ 
  visible, 
  onClose, 
  title, 
  children, 
  closeButtonLabel = 'Close modal' 
}) => {
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  
  useEffect(() => {
    if (visible && modalRef.current) {
      // Focus on modal when it opens
      const reactTag = findNodeHandle(modalRef.current)
      if (reactTag) {
        setTimeout(() => {
          accessibilityManager.setAccessibilityFocus(reactTag)
        }, 100)
      }
      
      // Announce modal opening
      accessibilityManager.announceForAccessibility(`${title} modal opened`)
    }
  }, [visible, title])
  
  if (!visible) return null
  
  return (
    <View style={styles.modalOverlay}>
      <View 
        ref={modalRef}
        style={styles.modalContent}
        accessible={true}
        accessibilityRole="dialog"
        accessibilityLabel={title}
        accessibilityModal={true}
        accessibilityViewIsModal={true}
      >
        <View style={styles.modalHeader}>
          <Text 
            style={styles.modalTitle}
            accessibilityRole="header"
            accessibilityLevel={1}
          >
            {title}
          </Text>
          <TouchableOpacity
            ref={closeButtonRef}
            style={styles.closeButton}
            onPress={onClose}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={closeButtonLabel}
            accessibilityHint="Closes the modal dialog"
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.modalBody}
          accessible={true}
          accessibilityRole="scrollbar"
        >
          {children}
        </ScrollView>
      </View>
    </View>
  )
}
```

**3. Accessibility Testing and Validation:**

```javascript
// Accessibility testing utilities
class AccessibilityTester {
  constructor() {
    this.violations = []
    this.warnings = []
  }
  
  // Test component accessibility
  testComponent(component, testName) {
    const violations = []
    const warnings = []
    
    // Check for accessibility label
    if (component.props.accessible && !component.props.accessibilityLabel) {
      violations.push({
        test: testName,
        rule: 'accessibility-label-required',
        message: 'Accessible elements must have accessibilityLabel',
        severity: 'error'
      })
    }
    
    // Check for proper roles
    if (component.props.onPress && !component.props.accessibilityRole) {
      warnings.push({
        test: testName,
        rule: 'accessibility-role-recommended',
        message: 'Interactive elements should have accessibilityRole',
        severity: 'warning'
      })
    }
    
    // Check for minimum touch target size
    if (component.props.onPress && component.props.style) {
      const style = StyleSheet.flatten(component.props.style)
      const minSize = 44 // iOS HIG minimum
      
      if ((style.width && style.width < minSize) || 
          (style.height && style.height < minSize)) {
        violations.push({
          test: testName,
          rule: 'minimum-touch-target',
          message: `Touch targets should be at least ${minSize}x${minSize} points`,
          severity: 'error'
        })
      }
    }
    
    // Check color contrast (simplified)
    if (component.props.style) {
      const style = StyleSheet.flatten(component.props.style)
      if (style.color && style.backgroundColor) {
        const contrast = this.calculateContrast(style.color, style.backgroundColor)
        if (contrast < 4.5) {
          violations.push({
            test: testName,
            rule: 'color-contrast',
            message: 'Text color contrast ratio should be at least 4.5:1',
            severity: 'error'
          })
        }
      }
    }
    
    this.violations.push(...violations)
    this.warnings.push(...warnings)
    
    return { violations, warnings }
  }
  
  // Simplified contrast calculation
  calculateContrast(color1, color2) {
    // This is a simplified version - in practice, you'd use a proper color library
    // Returns a mock value for demonstration
    return 5.2
  }
  
  // Generate accessibility report
  generateReport() {
    return {
      summary: {
        totalViolations: this.violations.length,
        totalWarnings: this.warnings.length,
        passed: this.violations.length === 0
      },
      violations: this.violations,
      warnings: this.warnings,
      recommendations: this.generateRecommendations()
    }
  }
  
  generateRecommendations() {
    const recommendations = []
    
    if (this.violations.some(v => v.rule === 'accessibility-label-required')) {
      recommendations.push({
        title: 'Add Accessibility Labels',
        description: 'Ensure all interactive elements have descriptive accessibility labels',
        priority: 'high'
      })
    }
    
    if (this.violations.some(v => v.rule === 'minimum-touch-target')) {
      recommendations.push({
        title: 'Increase Touch Target Size',
        description: 'Make sure all touch targets are at least 44x44 points',
        priority: 'high'
      })
    }
    
    if (this.violations.some(v => v.rule === 'color-contrast')) {
      recommendations.push({
        title: 'Improve Color Contrast',
        description: 'Ensure text has sufficient contrast against background colors',
        priority: 'medium'
      })
    }
    
    return recommendations
  }
  
  reset() {
    this.violations = []
    this.warnings = []
  }
}
```

**4. Accessibility Hooks and Utilities:**

```javascript
// Custom accessibility hooks
const useAccessibility = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false)
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState(false)
  
  useEffect(() => {
    const checkAccessibilityStatus = async () => {
      try {
        const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled()
        setIsScreenReaderEnabled(screenReaderEnabled)
        
        if (Platform.OS === 'ios') {
          const reduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled()
          setIsReduceMotionEnabled(reduceMotionEnabled)
        }
      } catch (error) {
        console.error('Failed to check accessibility status:', error)
      }
    }
    
    checkAccessibilityStatus()
    
    const screenReaderListener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsScreenReaderEnabled
    )
    
    let reduceMotionListener
    if (Platform.OS === 'ios') {
      reduceMotionListener = AccessibilityInfo.addEventListener(
        'reduceMotionChanged',
        setIsReduceMotionEnabled
      )
    }
    
    return () => {
      screenReaderListener?.remove()
      reduceMotionListener?.remove()
    }
  }, [])
  
  const announceForAccessibility = (message) => {
    if (isScreenReaderEnabled) {
      AccessibilityInfo.announceForAccessibility(message)
    }
  }
  
  const setAccessibilityFocus = (ref) => {
    if (isScreenReaderEnabled && ref.current) {
      const reactTag = findNodeHandle(ref.current)
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag)
      }
    }
  }
  
  return {
    isScreenReaderEnabled,
    isReduceMotionEnabled,
    announceForAccessibility,
    setAccessibilityFocus
  }
}

// Focus management hook
const useFocusManagement = () => {
  const { setAccessibilityFocus } = useAccessibility()
  const focusQueue = useRef([])
  
  const addToFocusQueue = (ref, delay = 0) => {
    focusQueue.current.push({ ref, delay })
  }
  
  const processFocusQueue = () => {
    focusQueue.current.forEach(({ ref, delay }) => {
      setTimeout(() => {
        setAccessibilityFocus(ref)
      }, delay)
    })
    focusQueue.current = []
  }
  
  const focusElement = (ref, delay = 100) => {
    setTimeout(() => {
      setAccessibilityFocus(ref)
    }, delay)
  }
  
  return {
    addToFocusQueue,
    processFocusQueue,
    focusElement
  }
}

// Accessible navigation hook
const useAccessibleNavigation = () => {
  const { announceForAccessibility } = useAccessibility()
  
  const announceScreenChange = (screenName, description) => {
    const message = description 
      ? `Navigated to ${screenName}. ${description}`
      : `Navigated to ${screenName}`
    
    announceForAccessibility(message)
  }
  
  const announceRouteChange = (routeName) => {
    announceForAccessibility(`Current page: ${routeName}`)
  }
  
  return {
    announceScreenChange,
    announceRouteChange
  }
}
```

**5. Accessibility Styles and Theming:**

```javascript
const styles = StyleSheet.create({
  // Button styles
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44, // Minimum touch target
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPrimary: {
    backgroundColor: '#007AFF'
  },
  buttonSecondary: {
    backgroundColor: '#8E8E93',
    borderWidth: 1,
    borderColor: '#C7C7CC'
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
    opacity: 0.6
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  
  // Input styles
  inputContainer: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000'
  },
  inputLabelError: {
    color: '#FF3B30'
  },
  inputLabelFocused: {
    color: '#007AFF'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 44,
    backgroundColor: 'white'
  },
  textInputError: {
    borderColor: '#FF3B30'
  },
  textInputFocused: {
    borderColor: '#007AFF',
    borderWidth: 2
  },
  requiredIndicator: {
    color: '#FF3B30'
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4
  },
  
  // List styles
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000'
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxWidth: '90%',
    maxHeight: '80%',
    minWidth: 300
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22
  },
  closeButtonText: {
    fontSize: 24,
    color: '#8E8E93'
  },
  modalBody: {
    flex: 1
  }
})

export {
  AccessibleButton,
  AccessibleTextInput,
  AccessibleList,
  AccessibleModal,
  AccessibilityManager,
  AccessibilityTester,
  useAccessibility,
  useFocusManagement,
  useAccessibleNavigation,
  accessibilityManager
}
```

This comprehensive guide covers basic accessibility props, advanced accessibility features with screen reader support, accessibility testing and validation, custom accessibility hooks, and proper styling for accessible React Native applications.

---

## Background Tasks and Services

### 18. How do you implement background tasks and services in React Native?

**Answer:**
Background tasks in React Native allow your app to perform operations when it's not in the foreground, such as data synchronization, location tracking, or push notifications.

**1. Background App State and App State Management:**

```javascript
import React, { useState, useEffect, useRef } from 'react'
import {
  AppState,
  Platform,
  Alert,
  BackgroundTimer
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BackgroundJob from 'react-native-background-job'
import PushNotification from 'react-native-push-notification'

// Background Task Manager
class BackgroundTaskManager {
  constructor() {
    this.appState = AppState.currentState
    this.backgroundTasks = new Map()
    this.timers = new Map()
    this.isBackgroundJobRunning = false
    
    this.init()
  }
  
  init() {
    // Listen to app state changes
    AppState.addEventListener('change', this.handleAppStateChange.bind(this))
    
    // Configure background job
    this.configureBackgroundJob()
    
    // Setup push notifications
    this.setupPushNotifications()
  }
  
  handleAppStateChange(nextAppState) {
    console.log('App state changed from', this.appState, 'to', nextAppState)
    
    if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to the foreground
      this.onAppForeground()
    } else if (this.appState === 'active' && nextAppState.match(/inactive|background/)) {
      // App has gone to the background
      this.onAppBackground()
    }
    
    this.appState = nextAppState
  }
  
  onAppForeground() {
    console.log('App came to foreground')
    
    // Stop background tasks
    this.stopBackgroundTasks()
    
    // Sync data when app becomes active
    this.syncDataOnForeground()
    
    // Clear background notifications
    PushNotification.cancelAllLocalNotifications()
  }
  
  onAppBackground() {
    console.log('App went to background')
    
    // Start background tasks
    this.startBackgroundTasks()
    
    // Save app state
    this.saveAppState()
    
    // Schedule background sync
    this.scheduleBackgroundSync()
  }
  
  // Register a background task
  registerTask(taskId, taskFunction, interval = 30000) {
    this.backgroundTasks.set(taskId, {
      function: taskFunction,
      interval,
      isRunning: false
    })
  }
  
  // Start background tasks
  startBackgroundTasks() {
    if (Platform.OS === 'ios') {
      // iOS background execution time is limited
      this.startIOSBackgroundTasks()
    } else {
      // Android allows more background processing
      this.startAndroidBackgroundTasks()
    }
  }
  
  startIOSBackgroundTasks() {
    // iOS background app refresh (limited time)
    this.backgroundTasks.forEach((task, taskId) => {
      if (!task.isRunning) {
        const timer = BackgroundTimer.setTimeout(() => {
          task.function()
          task.isRunning = false
        }, 1000) // Execute immediately, then stop
        
        this.timers.set(taskId, timer)
        task.isRunning = true
      }
    })
  }
  
  startAndroidBackgroundTasks() {
    // Android background service
    if (!this.isBackgroundJobRunning) {
      BackgroundJob.start({
        jobKey: 'myJob',
        period: 15000, // 15 seconds
        requiredNetworkType: 'UNMETERED', // WiFi only
        persistAcrossReboot: true
      })
      
      this.isBackgroundJobRunning = true
    }
    
    // Start periodic tasks
    this.backgroundTasks.forEach((task, taskId) => {
      if (!task.isRunning) {
        const timer = setInterval(() => {
          if (AppState.currentState.match(/inactive|background/)) {
            task.function()
          }
        }, task.interval)
        
        this.timers.set(taskId, timer)
        task.isRunning = true
      }
    })
  }
  
  // Stop background tasks
  stopBackgroundTasks() {
    // Clear all timers
    this.timers.forEach((timer, taskId) => {
      if (Platform.OS === 'ios') {
        BackgroundTimer.clearTimeout(timer)
      } else {
        clearInterval(timer)
      }
      
      const task = this.backgroundTasks.get(taskId)
      if (task) {
        task.isRunning = false
      }
    })
    
    this.timers.clear()
    
    // Stop background job (Android)
    if (this.isBackgroundJobRunning) {
      BackgroundJob.stop()
      this.isBackgroundJobRunning = false
    }
  }
  
  // Configure background job for Android
  configureBackgroundJob() {
    BackgroundJob.register({
      jobKey: 'myJob',
      job: () => {
        console.log('Background job executed')
        
        // Perform background tasks
        this.backgroundTasks.forEach((task) => {
          try {
            task.function()
          } catch (error) {
            console.error('Background task error:', error)
          }
        })
      }
    })
  }
  
  // Setup push notifications
  setupPushNotifications() {
    PushNotification.configure({
      onRegister: (token) => {
        console.log('Push notification token:', token)
      },
      
      onNotification: (notification) => {
        console.log('Notification received:', notification)
        
        if (notification.userInteraction) {
          // User tapped on notification
          this.handleNotificationTap(notification)
        }
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
  
  // Schedule background sync
  scheduleBackgroundSync() {
    // Schedule a local notification for background sync reminder
    PushNotification.localNotificationSchedule({
      title: 'Background Sync',
      message: 'Syncing data in background...',
      date: new Date(Date.now() + 60 * 1000), // 1 minute from now
      allowWhileIdle: true,
      repeatType: 'minute',
      repeatTime: 5 // Every 5 minutes
    })
  }
  
  // Save app state
  async saveAppState() {
    try {
      const appState = {
        lastBackgroundTime: Date.now(),
        appVersion: '1.0.0',
        userSession: 'active'
      }
      
      await AsyncStorage.setItem('appState', JSON.stringify(appState))
    } catch (error) {
      console.error('Failed to save app state:', error)
    }
  }
  
  // Sync data when app comes to foreground
  async syncDataOnForeground() {
    try {
      const savedState = await AsyncStorage.getItem('appState')
      if (savedState) {
        const appState = JSON.parse(savedState)
        const timeDiff = Date.now() - appState.lastBackgroundTime
        
        // If app was in background for more than 5 minutes, sync data
        if (timeDiff > 5 * 60 * 1000) {
          console.log('App was in background for', timeDiff / 1000, 'seconds. Syncing data...')
          await this.performDataSync()
        }
      }
    } catch (error) {
      console.error('Failed to sync data on foreground:', error)
    }
  }
  
  // Perform data synchronization
  async performDataSync() {
    try {
      // Simulate API call for data sync
      const response = await fetch('https://api.example.com/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lastSync: Date.now(),
          deviceId: 'device123'
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Data sync successful:', data)
        
        // Update local storage with synced data
        await AsyncStorage.setItem('lastSyncTime', Date.now().toString())
      }
    } catch (error) {
      console.error('Data sync failed:', error)
    }
  }
  
  // Handle notification tap
  handleNotificationTap(notification) {
    console.log('User tapped notification:', notification)
    
    // Navigate to specific screen based on notification
    if (notification.data && notification.data.screen) {
      // Use your navigation library to navigate
      // NavigationService.navigate(notification.data.screen)
    }
  }
  
  cleanup() {
    AppState.removeEventListener('change', this.handleAppStateChange)
    this.stopBackgroundTasks()
  }
}

// Global background task manager
const backgroundTaskManager = new BackgroundTaskManager()
```

**2. Background Location Tracking:**

```javascript
import Geolocation from '@react-native-community/geolocation'
import BackgroundGeolocation from 'react-native-background-geolocation'

// Background Location Manager
class BackgroundLocationManager {
  constructor() {
    this.isTracking = false
    this.locationHistory = []
    this.watchId = null
    
    this.init()
  }
  
  async init() {
    try {
      // Configure background geolocation
      await BackgroundGeolocation.ready({
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10, // meters
        
        // Activity Recognition
        stopTimeout: 1, // minutes
        
        // Application config
        debug: __DEV__, // Enable debug sounds in development
        logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
        enableHeadless: true,
        
        // HTTP / SQLite config
        url: 'https://api.example.com/locations',
        batchSync: false,
        autoSync: true,
        
        // iOS specific
        preventSuspend: true,
        heartbeatInterval: 60,
        
        // Android specific
        locationUpdateInterval: 1000,
        fastestLocationUpdateInterval: 5000,
        
        // Permissions
        locationAuthorizationRequest: 'Always',
        backgroundPermissionRationale: {
          title: "Allow location access",
          message: "This app needs background location access for tracking",
          positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
          negativeAction: 'Cancel'
        }
      })
      
      // Event listeners
      this.setupEventListeners()
      
    } catch (error) {
      console.error('Failed to initialize background location:', error)
    }
  }
  
  setupEventListeners() {
    // Location event
    BackgroundGeolocation.onLocation(this.onLocation.bind(this), this.onLocationError.bind(this))
    
    // Motion change event
    BackgroundGeolocation.onMotionChange(this.onMotionChange.bind(this))
    
    // Activity change event
    BackgroundGeolocation.onActivityChange(this.onActivityChange.bind(this))
    
    // Provider change event
    BackgroundGeolocation.onProviderChange(this.onProviderChange.bind(this))
    
    // Heartbeat event
    BackgroundGeolocation.onHeartbeat(this.onHeartbeat.bind(this))
  }
  
  onLocation(location) {
    console.log('Background location:', location)
    
    // Store location in history
    this.locationHistory.push({
      ...location,
      timestamp: Date.now()
    })
    
    // Keep only last 100 locations
    if (this.locationHistory.length > 100) {
      this.locationHistory = this.locationHistory.slice(-100)
    }
    
    // Save to local storage
    this.saveLocationHistory()
    
    // Send to server if needed
    this.uploadLocation(location)
  }
  
  onLocationError(error) {
    console.error('Background location error:', error)
  }
  
  onMotionChange(event) {
    console.log('Motion change:', event)
    
    if (event.isMoving) {
      console.log('Device started moving')
    } else {
      console.log('Device stopped moving')
    }
  }
  
  onActivityChange(event) {
    console.log('Activity change:', event)
    // Activities: still, on_foot, walking, running, on_bicycle, in_vehicle
  }
  
  onProviderChange(event) {
    console.log('Provider change:', event)
    
    if (!event.enabled) {
      Alert.alert(
        'Location Services Disabled',
        'Please enable location services to continue tracking.',
        [
          { text: 'Settings', onPress: () => BackgroundGeolocation.showSettings() },
          { text: 'Cancel', style: 'cancel' }
        ]
      )
    }
  }
  
  onHeartbeat(params) {
    console.log('Heartbeat:', params)
    
    // Perform periodic tasks during heartbeat
    this.performPeriodicTasks()
  }
  
  // Start location tracking
  async startTracking() {
    try {
      if (!this.isTracking) {
        await BackgroundGeolocation.start()
        this.isTracking = true
        console.log('Background location tracking started')
      }
    } catch (error) {
      console.error('Failed to start location tracking:', error)
    }
  }
  
  // Stop location tracking
  async stopTracking() {
    try {
      if (this.isTracking) {
        await BackgroundGeolocation.stop()
        this.isTracking = false
        console.log('Background location tracking stopped')
      }
    } catch (error) {
      console.error('Failed to stop location tracking:', error)
    }
  }
  
  // Get current location
  async getCurrentLocation() {
    try {
      const location = await BackgroundGeolocation.getCurrentPosition({
        timeout: 30,
        maximumAge: 5000,
        enableHighAccuracy: true
      })
      
      return location
    } catch (error) {
      console.error('Failed to get current location:', error)
      return null
    }
  }
  
  // Save location history to local storage
  async saveLocationHistory() {
    try {
      await AsyncStorage.setItem(
        'locationHistory',
        JSON.stringify(this.locationHistory)
      )
    } catch (error) {
      console.error('Failed to save location history:', error)
    }
  }
  
  // Upload location to server
  async uploadLocation(location) {
    try {
      const response = await fetch('https://api.example.com/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
          timestamp: location.timestamp,
          speed: location.coords.speed,
          heading: location.coords.heading
        })
      })
      
      if (response.ok) {
        console.log('Location uploaded successfully')
      }
    } catch (error) {
      console.error('Failed to upload location:', error)
    }
  }
  
  // Perform periodic tasks
  performPeriodicTasks() {
    // Check battery level
    this.checkBatteryLevel()
    
    // Clean old location data
    this.cleanOldLocationData()
    
    // Sync pending data
    this.syncPendingData()
  }
  
  checkBatteryLevel() {
    // Check if battery is low and adjust tracking accordingly
    // This would require react-native-device-info or similar
  }
  
  cleanOldLocationData() {
    // Remove location data older than 7 days
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
    this.locationHistory = this.locationHistory.filter(
      location => location.timestamp > sevenDaysAgo
    )
  }
  
  async syncPendingData() {
    // Sync any pending location data that failed to upload
    try {
      const pendingData = await AsyncStorage.getItem('pendingLocationData')
      if (pendingData) {
        const locations = JSON.parse(pendingData)
        
        for (const location of locations) {
          await this.uploadLocation(location)
        }
        
        // Clear pending data after successful sync
        await AsyncStorage.removeItem('pendingLocationData')
      }
    } catch (error) {
      console.error('Failed to sync pending data:', error)
    }
  }
  
  // Get location history
  getLocationHistory() {
    return this.locationHistory
  }
  
  // Check if tracking is active
  isTrackingActive() {
    return this.isTracking
  }
  
  cleanup() {
    this.stopTracking()
    BackgroundGeolocation.removeAllListeners()
  }
}

// Global location manager
const backgroundLocationManager = new BackgroundLocationManager()
```

**3. Background Data Synchronization:**

```javascript
// Background Sync Manager
class BackgroundSyncManager {
  constructor() {
    this.syncQueue = []
    this.isSyncing = false
    this.syncInterval = null
    this.retryAttempts = 3
    this.retryDelay = 5000 // 5 seconds
    
    this.init()
  }
  
  init() {
    // Register background sync task
    backgroundTaskManager.registerTask(
      'dataSync',
      this.performBackgroundSync.bind(this),
      60000 // Every minute
    )
    
    // Load pending sync items
    this.loadPendingSyncItems()
  }
  
  // Add item to sync queue
  addToSyncQueue(item) {
    const syncItem = {
      id: Date.now().toString(),
      data: item,
      timestamp: Date.now(),
      attempts: 0,
      status: 'pending'
    }
    
    this.syncQueue.push(syncItem)
    this.saveSyncQueue()
    
    // Try to sync immediately if app is active
    if (AppState.currentState === 'active') {
      this.performSync()
    }
  }
  
  // Perform background sync
  async performBackgroundSync() {
    if (this.isSyncing || this.syncQueue.length === 0) {
      return
    }
    
    console.log('Performing background sync...')
    await this.performSync()
  }
  
  // Perform sync operation
  async performSync() {
    if (this.isSyncing) {
      return
    }
    
    this.isSyncing = true
    
    try {
      const pendingItems = this.syncQueue.filter(item => 
        item.status === 'pending' && item.attempts < this.retryAttempts
      )
      
      for (const item of pendingItems) {
        try {
          await this.syncItem(item)
          item.status = 'completed'
          console.log('Sync completed for item:', item.id)
        } catch (error) {
          item.attempts++
          item.lastError = error.message
          
          if (item.attempts >= this.retryAttempts) {
            item.status = 'failed'
            console.error('Sync failed permanently for item:', item.id, error)
          } else {
            console.warn('Sync failed, will retry:', item.id, error)
          }
        }
      }
      
      // Remove completed items
      this.syncQueue = this.syncQueue.filter(item => 
        item.status !== 'completed'
      )
      
      this.saveSyncQueue()
      
    } finally {
      this.isSyncing = false
    }
  }
  
  // Sync individual item
  async syncItem(item) {
    const response = await fetch('https://api.example.com/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token'
      },
      body: JSON.stringify({
        id: item.id,
        data: item.data,
        timestamp: item.timestamp
      })
    })
    
    if (!response.ok) {
      throw new Error(`Sync failed: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  }
  
  // Save sync queue to storage
  async saveSyncQueue() {
    try {
      await AsyncStorage.setItem('syncQueue', JSON.stringify(this.syncQueue))
    } catch (error) {
      console.error('Failed to save sync queue:', error)
    }
  }
  
  // Load pending sync items
  async loadPendingSyncItems() {
    try {
      const savedQueue = await AsyncStorage.getItem('syncQueue')
      if (savedQueue) {
        this.syncQueue = JSON.parse(savedQueue)
        console.log('Loaded', this.syncQueue.length, 'pending sync items')
      }
    } catch (error) {
      console.error('Failed to load sync queue:', error)
    }
  }
  
  // Get sync status
  getSyncStatus() {
    const pending = this.syncQueue.filter(item => item.status === 'pending').length
    const failed = this.syncQueue.filter(item => item.status === 'failed').length
    
    return {
      pending,
      failed,
      isSyncing: this.isSyncing,
      totalItems: this.syncQueue.length
    }
  }
  
  // Retry failed items
  retryFailedItems() {
    this.syncQueue.forEach(item => {
      if (item.status === 'failed') {
        item.status = 'pending'
        item.attempts = 0
        delete item.lastError
      }
    })
    
    this.saveSyncQueue()
    this.performSync()
  }
  
  // Clear completed items
  clearCompletedItems() {
    this.syncQueue = this.syncQueue.filter(item => 
      item.status !== 'completed'
    )
    this.saveSyncQueue()
  }
}

// Global sync manager
const backgroundSyncManager = new BackgroundSyncManager()

export {
  BackgroundTaskManager,
  BackgroundLocationManager,
  BackgroundSyncManager,
  backgroundTaskManager,
  backgroundLocationManager,
  backgroundSyncManager
}
```

**4. Background Task Hooks:**

```javascript
// Custom hooks for background tasks
const useBackgroundTasks = () => {
  const [appState, setAppState] = useState(AppState.currentState)
  const [isInBackground, setIsInBackground] = useState(false)
  
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setAppState(nextAppState)
      setIsInBackground(nextAppState.match(/inactive|background/))
    }
    
    const subscription = AppState.addEventListener('change', handleAppStateChange)
    
    return () => {
      subscription?.remove()
    }
  }, [])
  
  const registerBackgroundTask = (taskId, taskFunction, interval) => {
    backgroundTaskManager.registerTask(taskId, taskFunction, interval)
  }
  
  const addToSyncQueue = (data) => {
    backgroundSyncManager.addToSyncQueue(data)
  }
  
  const getSyncStatus = () => {
    return backgroundSyncManager.getSyncStatus()
  }
  
  return {
    appState,
    isInBackground,
    registerBackgroundTask,
    addToSyncQueue,
    getSyncStatus
  }
}

// Location tracking hook
const useLocationTracking = () => {
  const [isTracking, setIsTracking] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [locationHistory, setLocationHistory] = useState([])
  
  useEffect(() => {
    setIsTracking(backgroundLocationManager.isTrackingActive())
    setLocationHistory(backgroundLocationManager.getLocationHistory())
  }, [])
  
  const startTracking = async () => {
    await backgroundLocationManager.startTracking()
    setIsTracking(true)
  }
  
  const stopTracking = async () => {
    await backgroundLocationManager.stopTracking()
    setIsTracking(false)
  }
  
  const getCurrentLocation = async () => {
    const location = await backgroundLocationManager.getCurrentLocation()
    setCurrentLocation(location)
    return location
  }
  
  return {
    isTracking,
    currentLocation,
    locationHistory,
    startTracking,
    stopTracking,
    getCurrentLocation
  }
}
```

This comprehensive guide covers app state management, background location tracking, data synchronization, and custom hooks for implementing robust background tasks and services in React Native applications.

---

## Camera and Media

### 19. How do you implement advanced camera and media features in React Native?

**Answer:**
Advanced camera and media features in React Native include camera capture, video recording, image processing, media gallery access, and real-time filters.

**1. Advanced Camera Implementation with react-native-vision-camera:**

```javascript
import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  PermissionsAndroid
} from 'react-native'
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
  runOnJS
} from 'react-native-vision-camera'
import { useSharedValue } from 'react-native-reanimated'
import RNFS from 'react-native-fs'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-crop-picker'

// Advanced Camera Component
const AdvancedCamera = ({ onMediaCaptured, onClose }) => {
  const camera = useRef(null)
  const devices = useCameraDevices()
  const device = devices.back
  
  const [cameraPermission, setCameraPermission] = useState('not-determined')
  const [microphonePermission, setMicrophonePermission] = useState('not-determined')
  const [isRecording, setIsRecording] = useState(false)
  const [flash, setFlash] = useState('off')
  const [cameraType, setCameraType] = useState('back')
  const [zoom, setZoom] = useState(1)
  const [focusPoint, setFocusPoint] = useState(null)
  
  // Shared values for frame processor
  const frameCount = useSharedValue(0)
  const faceDetected = useSharedValue(false)
  
  useEffect(() => {
    checkPermissions()
  }, [])
  
  const checkPermissions = async () => {
    const cameraPermissionStatus = await Camera.getCameraPermissionStatus()
    const microphonePermissionStatus = await Camera.getMicrophonePermissionStatus()
    
    setCameraPermission(cameraPermissionStatus)
    setMicrophonePermission(microphonePermissionStatus)
    
    if (cameraPermissionStatus !== 'authorized') {
      const newCameraPermission = await Camera.requestCameraPermission()
      setCameraPermission(newCameraPermission)
    }
    
    if (microphonePermissionStatus !== 'authorized') {
      const newMicrophonePermission = await Camera.requestMicrophonePermission()
      setMicrophonePermission(newMicrophonePermission)
    }
  }
  
  // Frame processor for real-time analysis
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    
    frameCount.value += 1
    
    // Example: Face detection (requires additional setup)
    // const faces = detectFaces(frame)
    // faceDetected.value = faces.length > 0
    
    // Run JavaScript function from worklet
    if (frameCount.value % 30 === 0) { // Every 30 frames
      runOnJS(onFrameProcessed)(frame)
    }
  }, [frameCount, faceDetected])
  
  const onFrameProcessed = useCallback((frame) => {
    // Process frame data in JavaScript thread
    console.log('Frame processed:', frame.width, 'x', frame.height)
  }, [])
  
  // Take photo with advanced options
  const takePhoto = async () => {
    try {
      if (!camera.current) return
      
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: flash,
        enableAutoRedEyeReduction: true,
        enableAutoStabilization: true,
        enableShutterSound: true
      })
      
      // Process the captured photo
      const processedPhoto = await processPhoto(photo)
      onMediaCaptured(processedPhoto)
      
    } catch (error) {
      console.error('Failed to take photo:', error)
      Alert.alert('Error', 'Failed to take photo')
    }
  }
  
  // Record video with advanced options
  const startVideoRecording = async () => {
    try {
      if (!camera.current || isRecording) return
      
      setIsRecording(true)
      
      camera.current.startRecording({
        flash: flash,
        onRecordingFinished: async (video) => {
          setIsRecording(false)
          const processedVideo = await processVideo(video)
          onMediaCaptured(processedVideo)
        },
        onRecordingError: (error) => {
          setIsRecording(false)
          console.error('Recording error:', error)
          Alert.alert('Error', 'Failed to record video')
        },
        videoBitRate: 'high',
        videoCodec: 'h264'
      })
      
    } catch (error) {
      setIsRecording(false)
      console.error('Failed to start recording:', error)
    }
  }
  
  const stopVideoRecording = async () => {
    try {
      if (!camera.current || !isRecording) return
      await camera.current.stopRecording()
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }
  
  // Process captured photo
  const processPhoto = async (photo) => {
    try {
      // Resize image for optimization
      const resizedImage = await ImageResizer.createResizedImage(
        photo.path,
        1920, // max width
        1080, // max height
        'JPEG',
        80, // quality
        0, // rotation
        undefined, // output path
        false, // keep metadata
        {
          mode: 'contain',
          onlyScaleDown: true
        }
      )
      
      // Add metadata
      const processedPhoto = {
        ...photo,
        resized: resizedImage,
        metadata: {
          capturedAt: new Date().toISOString(),
          device: Platform.OS,
          flash: flash,
          zoom: zoom,
          cameraType: cameraType
        }
      }
      
      return processedPhoto
      
    } catch (error) {
      console.error('Failed to process photo:', error)
      return photo
    }
  }
  
  // Process captured video
  const processVideo = async (video) => {
    try {
      // Get video info
      const videoInfo = await RNFS.stat(video.path)
      
      const processedVideo = {
        ...video,
        metadata: {
          capturedAt: new Date().toISOString(),
          device: Platform.OS,
          flash: flash,
          zoom: zoom,
          cameraType: cameraType,
          fileSize: videoInfo.size,
          duration: video.duration
        }
      }
      
      return processedVideo
      
    } catch (error) {
      console.error('Failed to process video:', error)
      return video
    }
  }
  
  // Handle focus tap
  const onFocusTap = (event) => {
    const { locationX, locationY } = event.nativeEvent
    setFocusPoint({ x: locationX, y: locationY })
    
    // Focus camera at tapped point
    if (camera.current) {
      camera.current.focus({ x: locationX, y: locationY })
    }
    
    // Clear focus point after 2 seconds
    setTimeout(() => setFocusPoint(null), 2000)
  }
  
  // Toggle camera type
  const toggleCameraType = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back')
  }
  
  // Toggle flash
  const toggleFlash = () => {
    const flashModes = ['off', 'on', 'auto']
    const currentIndex = flashModes.indexOf(flash)
    const nextIndex = (currentIndex + 1) % flashModes.length
    setFlash(flashModes[nextIndex])
  }
  
  // Handle zoom
  const handleZoom = (zoomValue) => {
    const clampedZoom = Math.max(1, Math.min(zoomValue, device?.maxZoom || 10))
    setZoom(clampedZoom)
  }
  
  if (cameraPermission !== 'authorized') {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera permission is required to use this feature
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={checkPermissions}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={devices[cameraType]}
        isActive={true}
        photo={true}
        video={true}
        audio={microphonePermission === 'authorized'}
        frameProcessor={frameProcessor}
        zoom={zoom}
        onTouchEnd={onFocusTap}
      />
      
      {/* Focus indicator */}
      {focusPoint && (
        <View
          style={[
            styles.focusIndicator,
            {
              left: focusPoint.x - 25,
              top: focusPoint.y - 25
            }
          ]}
        />
      )}
      
      {/* Camera controls */}
      <View style={styles.controls}>
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={onClose}>
            <Text style={styles.controlButtonText}>✕</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
            <Text style={styles.controlButtonText}>
              {flash === 'off' ? '⚡' : flash === 'on' ? '⚡' : 'A⚡'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
            <Text style={styles.controlButtonText}>🔄</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomControls}>
          <TouchableOpacity
            style={[styles.captureButton, isRecording && styles.recordingButton]}
            onPress={isRecording ? stopVideoRecording : takePhoto}
            onLongPress={startVideoRecording}
          >
            <View style={[styles.captureButtonInner, isRecording && styles.recordingButtonInner]} />
          </TouchableOpacity>
        </View>
        
        {/* Zoom slider */}
        <View style={styles.zoomContainer}>
          <Text style={styles.zoomText}>{zoom.toFixed(1)}x</Text>
        </View>
      </View>
    </View>
  )
}
```

**2. Media Gallery and Image Processing:**

```javascript
// Media Gallery Manager
class MediaGalleryManager {
  constructor() {
    this.mediaCache = new Map()
    this.thumbnailCache = new Map()
  }
  
  // Open image picker with advanced options
  async openImagePicker(options = {}) {
    try {
      const defaultOptions = {
        mediaType: 'photo',
        multiple: false,
        includeBase64: false,
        maxWidth: 2048,
        maxHeight: 2048,
        quality: 0.8,
        cropping: false,
        cropperCircleOverlay: false,
        freeStyleCropEnabled: true,
        showCropGuidelines: true,
        hideBottomControls: false,
        enableRotationGesture: true,
        compressImageMaxWidth: 1920,
        compressImageMaxHeight: 1080,
        compressImageQuality: 0.8
      }
      
      const mergedOptions = { ...defaultOptions, ...options }
      
      const result = await ImagePicker.openPicker(mergedOptions)
      
      if (mergedOptions.multiple) {
        return await Promise.all(result.map(item => this.processMediaItem(item)))
      } else {
        return await this.processMediaItem(result)
      }
      
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.error('Image picker error:', error)
        throw error
      }
      return null
    }
  }
  
  // Open camera with picker
  async openCamera(options = {}) {
    try {
      const defaultOptions = {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 2048,
        maxHeight: 2048,
        quality: 0.8,
        useFrontCamera: false,
        cropping: false
      }
      
      const mergedOptions = { ...defaultOptions, ...options }
      
      const result = await ImagePicker.openCamera(mergedOptions)
      return await this.processMediaItem(result)
      
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.error('Camera error:', error)
        throw error
      }
      return null
    }
  }
  
  // Process media item
  async processMediaItem(item) {
    try {
      const processedItem = {
        ...item,
        id: this.generateMediaId(),
        processedAt: new Date().toISOString(),
        thumbnail: null,
        metadata: await this.extractMetadata(item)
      }
      
      // Generate thumbnail
      if (item.mime.startsWith('image/')) {
        processedItem.thumbnail = await this.generateThumbnail(item.path)
      }
      
      // Cache the processed item
      this.mediaCache.set(processedItem.id, processedItem)
      
      return processedItem
      
    } catch (error) {
      console.error('Failed to process media item:', error)
      return item
    }
  }
  
  // Generate thumbnail
  async generateThumbnail(imagePath, size = 200) {
    try {
      const cacheKey = `${imagePath}_${size}`
      
      if (this.thumbnailCache.has(cacheKey)) {
        return this.thumbnailCache.get(cacheKey)
      }
      
      const thumbnail = await ImageResizer.createResizedImage(
        imagePath,
        size,
        size,
        'JPEG',
        70,
        0,
        undefined,
        false,
        {
          mode: 'cover'
        }
      )
      
      this.thumbnailCache.set(cacheKey, thumbnail)
      return thumbnail
      
    } catch (error) {
      console.error('Failed to generate thumbnail:', error)
      return null
    }
  }
  
  // Extract metadata
  async extractMetadata(item) {
    try {
      const fileStats = await RNFS.stat(item.path)
      
      return {
        fileSize: fileStats.size,
        fileName: item.filename || item.path.split('/').pop(),
        mimeType: item.mime,
        width: item.width,
        height: item.height,
        creationDate: item.creationDate,
        modificationDate: item.modificationDate,
        duration: item.duration, // for videos
        exif: item.exif || {}
      }
    } catch (error) {
      console.error('Failed to extract metadata:', error)
      return {}
    }
  }
  
  // Apply image filters
  async applyImageFilter(imagePath, filterType) {
    try {
      switch (filterType) {
        case 'grayscale':
          return await this.applyGrayscaleFilter(imagePath)
        case 'sepia':
          return await this.applySepiaFilter(imagePath)
        case 'blur':
          return await this.applyBlurFilter(imagePath)
        case 'sharpen':
          return await this.applySharpenFilter(imagePath)
        default:
          return imagePath
      }
    } catch (error) {
      console.error('Failed to apply filter:', error)
      return imagePath
    }
  }
  
  // Grayscale filter
  async applyGrayscaleFilter(imagePath) {
    // This would require a native image processing library
    // For demonstration, we'll just return the original path
    console.log('Applying grayscale filter to:', imagePath)
    return imagePath
  }
  
  // Sepia filter
  async applySepiaFilter(imagePath) {
    console.log('Applying sepia filter to:', imagePath)
    return imagePath
  }
  
  // Blur filter
  async applyBlurFilter(imagePath) {
    console.log('Applying blur filter to:', imagePath)
    return imagePath
  }
  
  // Sharpen filter
  async applySharpenFilter(imagePath) {
    console.log('Applying sharpen filter to:', imagePath)
    return imagePath
  }
  
  // Compress image
  async compressImage(imagePath, quality = 0.8, maxWidth = 1920, maxHeight = 1080) {
    try {
      const compressedImage = await ImageResizer.createResizedImage(
        imagePath,
        maxWidth,
        maxHeight,
        'JPEG',
        quality * 100,
        0,
        undefined,
        false,
        {
          mode: 'contain',
          onlyScaleDown: true
        }
      )
      
      return compressedImage
    } catch (error) {
      console.error('Failed to compress image:', error)
      throw error
    }
  }
  
  // Crop image
  async cropImage(imagePath, cropData) {
    try {
      const croppedImage = await ImagePicker.openCropper({
        path: imagePath,
        width: cropData.width,
        height: cropData.height,
        cropperToolbarTitle: 'Crop Image',
        cropperActiveWidgetColor: '#007AFF',
        cropperStatusBarColor: '#007AFF',
        cropperToolbarColor: '#007AFF',
        cropperToolbarWidgetColor: '#FFFFFF'
      })
      
      return croppedImage
    } catch (error) {
      console.error('Failed to crop image:', error)
      throw error
    }
  }
  
  // Generate media ID
  generateMediaId() {
    return `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  // Get cached media
  getCachedMedia(mediaId) {
    return this.mediaCache.get(mediaId)
  }
  
  // Clear cache
  clearCache() {
    this.mediaCache.clear()
    this.thumbnailCache.clear()
  }
}

// Global media gallery manager
const mediaGalleryManager = new MediaGalleryManager()
```

**3. Video Processing and Playback:**

```javascript
import Video from 'react-native-video'
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native'

// Video Player Component
const AdvancedVideoPlayer = ({ source, onProgress, onEnd, style }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1.0)
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [showControls, setShowControls] = useState(true)
  
  const videoRef = useRef(null)
  const controlsTimeoutRef = useRef(null)
  
  const onLoad = (data) => {
    setDuration(data.duration)
  }
  
  const onProgressUpdate = (data) => {
    setCurrentTime(data.currentTime)
    onProgress?.(data)
  }
  
  const onVideoEnd = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    onEnd?.()
  }
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    showControlsTemporarily()
  }
  
  const seekTo = (time) => {
    videoRef.current?.seek(time)
    setCurrentTime(time)
  }
  
  const showControlsTemporarily = () => {
    setShowControls(true)
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <View style={[styles.videoContainer, style]}>
      <Video
        ref={videoRef}
        source={source}
        style={styles.video}
        paused={!isPlaying}
        volume={volume}
        rate={playbackRate}
        resizeMode="contain"
        onLoad={onLoad}
        onProgress={onProgressUpdate}
        onEnd={onVideoEnd}
        onTouchStart={showControlsTemporarily}
      />
      
      {showControls && (
        <View style={styles.videoControls}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={togglePlayPause}
          >
            <Text style={styles.playButtonText}>
              {isPlaying ? '⏸️' : '▶️'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.progressContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentTime / duration) * 100}%` }
                ]}
              />
            </View>
            
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

// Video Processing Manager
class VideoProcessingManager {
  constructor() {
    this.processingQueue = []
    this.isProcessing = false
  }
  
  // Compress video
  async compressVideo(inputPath, outputPath, quality = 'medium') {
    try {
      const qualitySettings = {
        low: '-crf 32 -preset fast',
        medium: '-crf 28 -preset medium',
        high: '-crf 24 -preset slow'
      }
      
      const command = `-i ${inputPath} ${qualitySettings[quality]} -movflags +faststart ${outputPath}`
      
      const session = await FFmpegKit.execute(command)
      const returnCode = await session.getReturnCode()
      
      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Video compression successful')
        return outputPath
      } else {
        throw new Error('Video compression failed')
      }
    } catch (error) {
      console.error('Video compression error:', error)
      throw error
    }
  }
  
  // Extract video thumbnail
  async extractThumbnail(videoPath, outputPath, timeOffset = '00:00:01') {
    try {
      const command = `-i ${videoPath} -ss ${timeOffset} -vframes 1 -q:v 2 ${outputPath}`
      
      const session = await FFmpegKit.execute(command)
      const returnCode = await session.getReturnCode()
      
      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Thumbnail extraction successful')
        return outputPath
      } else {
        throw new Error('Thumbnail extraction failed')
      }
    } catch (error) {
      console.error('Thumbnail extraction error:', error)
      throw error
    }
  }
  
  // Trim video
  async trimVideo(inputPath, outputPath, startTime, duration) {
    try {
      const command = `-i ${inputPath} -ss ${startTime} -t ${duration} -c copy ${outputPath}`
      
      const session = await FFmpegKit.execute(command)
      const returnCode = await session.getReturnCode()
      
      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Video trimming successful')
        return outputPath
      } else {
        throw new Error('Video trimming failed')
      }
    } catch (error) {
      console.error('Video trimming error:', error)
      throw error
    }
  }
  
  // Add watermark to video
  async addWatermark(inputPath, watermarkPath, outputPath, position = 'bottom-right') {
    try {
      const positions = {
        'top-left': '10:10',
        'top-right': 'W-w-10:10',
        'bottom-left': '10:H-h-10',
        'bottom-right': 'W-w-10:H-h-10',
        'center': '(W-w)/2:(H-h)/2'
      }
      
      const overlayPosition = positions[position] || positions['bottom-right']
      
      const command = `-i ${inputPath} -i ${watermarkPath} -filter_complex "[1:v]scale=100:100[watermark];[0:v][watermark]overlay=${overlayPosition}" -c:a copy ${outputPath}`
      
      const session = await FFmpegKit.execute(command)
      const returnCode = await session.getReturnCode()
      
      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Watermark addition successful')
        return outputPath
      } else {
        throw new Error('Watermark addition failed')
      }
    } catch (error) {
      console.error('Watermark addition error:', error)
      throw error
    }
  }
  
  // Convert video format
  async convertVideoFormat(inputPath, outputPath, format = 'mp4') {
    try {
      const command = `-i ${inputPath} -c:v libx264 -c:a aac -movflags +faststart ${outputPath}`
      
      const session = await FFmpegKit.execute(command)
      const returnCode = await session.getReturnCode()
      
      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Video format conversion successful')
        return outputPath
      } else {
        throw new Error('Video format conversion failed')
      }
    } catch (error) {
      console.error('Video format conversion error:', error)
      throw error
    }
  }
}

// Global video processing manager
const videoProcessingManager = new VideoProcessingManager()

export {
  AdvancedCamera,
  MediaGalleryManager,
  AdvancedVideoPlayer,
  VideoProcessingManager,
  mediaGalleryManager,
  videoProcessingManager
}
```

**4. Camera and Media Hooks:**

```javascript
// Custom hooks for camera and media
const useCamera = () => {
  const [hasPermission, setHasPermission] = useState(false)
  const [isActive, setIsActive] = useState(false)
  
  useEffect(() => {
    checkCameraPermission()
  }, [])
  
  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus()
    setHasPermission(status === 'authorized')
    
    if (status !== 'authorized') {
      const newStatus = await Camera.requestCameraPermission()
      setHasPermission(newStatus === 'authorized')
    }
  }
  
  const activateCamera = () => setIsActive(true)
  const deactivateCamera = () => setIsActive(false)
  
  return {
    hasPermission,
    isActive,
    activateCamera,
    deactivateCamera,
    checkCameraPermission
  }
}

// Media picker hook
const useMediaPicker = () => {
  const [selectedMedia, setSelectedMedia] = useState([])
  
  const pickImage = async (options) => {
    const result = await mediaGalleryManager.openImagePicker(options)
    if (result) {
      setSelectedMedia(prev => [...prev, result])
    }
    return result
  }
  
  const pickMultipleImages = async (options) => {
    const results = await mediaGalleryManager.openImagePicker({
      ...options,
      multiple: true
    })
    if (results) {
      setSelectedMedia(prev => [...prev, ...results])
    }
    return results
  }
  
  const takePhoto = async (options) => {
    const result = await mediaGalleryManager.openCamera(options)
    if (result) {
      setSelectedMedia(prev => [...prev, result])
    }
    return result
  }
  
  const removeMedia = (mediaId) => {
    setSelectedMedia(prev => prev.filter(item => item.id !== mediaId))
  }
  
  const clearSelection = () => {
    setSelectedMedia([])
  }
  
  return {
    selectedMedia,
    pickImage,
    pickMultipleImages,
    takePhoto,
    removeMedia,
    clearSelection
  }
}
```

This comprehensive guide covers advanced camera implementation, media gallery management, video processing, and custom hooks for implementing robust camera and media features in React Native applications.

---

## Maps and Location Services

### 20. How do you implement advanced maps and location services in React Native?

**Answer:**
Advanced maps and location services in React Native include interactive maps, real-time location tracking, geofencing, route planning, and custom map overlays.

**1. Advanced Map Implementation with react-native-maps:**

```javascript
import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid
} from 'react-native'
import MapView, {
  Marker,
  Polyline,
  Polygon,
  Circle,
  Callout,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT
} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Advanced Map Component
const AdvancedMap = ({ 
  initialRegion,
  markers = [],
  routes = [],
  onLocationChange,
  onMarkerPress,
  showUserLocation = true,
  followUserLocation = false,
  customMapStyle = null
}) => {
  const mapRef = useRef(null)
  const [region, setRegion] = useState(initialRegion)
  const [userLocation, setUserLocation] = useState(null)
  const [locationPermission, setLocationPermission] = useState(false)
  const [mapType, setMapType] = useState('standard')
  const [showTraffic, setShowTraffic] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [locationHistory, setLocationHistory] = useState([])
  const [geofences, setGeofences] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)
  
  const watchId = useRef(null)
  
  useEffect(() => {
    requestLocationPermission()
    loadSavedPreferences()
    
    return () => {
      if (watchId.current) {
        Geolocation.clearWatch(watchId.current)
      }
    }
  }, [])
  
  useEffect(() => {
    if (locationPermission && showUserLocation) {
      getCurrentLocation()
    }
  }, [locationPermission, showUserLocation])
  
  useEffect(() => {
    if (followUserLocation && userLocation) {
      animateToLocation(userLocation)
    }
  }, [userLocation, followUserLocation])
  
  // Request location permission
  const requestLocationPermission = async () => {
    try {
      let permission
      
      if (Platform.OS === 'ios') {
        permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      } else {
        permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      }
      
      const granted = permission === RESULTS.GRANTED
      setLocationPermission(granted)
      
      if (!granted) {
        Alert.alert(
          'Location Permission',
          'Location permission is required for this feature',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openSettings() }
          ]
        )
      }
    } catch (error) {
      console.error('Location permission error:', error)
    }
  }
  
  // Get current location
  const getCurrentLocation = () => {
    if (!locationPermission) return
    
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const newLocation = {
          latitude,
          longitude,
          timestamp: Date.now(),
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          heading: position.coords.heading,
          speed: position.coords.speed
        }
        
        setUserLocation(newLocation)
        onLocationChange?.(newLocation)
        
        // Add to location history
        setLocationHistory(prev => {
          const updated = [...prev, newLocation]
          // Keep only last 100 locations
          return updated.slice(-100)
        })
        
        // Check geofences
        checkGeofences(newLocation)
      },
      (error) => {
        console.error('Location error:', error)
        Alert.alert('Location Error', 'Failed to get current location')
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
    )
  }
  
  // Start location tracking
  const startLocationTracking = () => {
    if (!locationPermission || isTracking) return
    
    setIsTracking(true)
    
    watchId.current = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const newLocation = {
          latitude,
          longitude,
          timestamp: Date.now(),
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          heading: position.coords.heading,
          speed: position.coords.speed
        }
        
        setUserLocation(newLocation)
        onLocationChange?.(newLocation)
        
        // Add to location history
        setLocationHistory(prev => {
          const updated = [...prev, newLocation]
          return updated.slice(-100)
        })
        
        // Check geofences
        checkGeofences(newLocation)
      },
      (error) => {
        console.error('Location tracking error:', error)
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update every 10 meters
        interval: 5000, // Update every 5 seconds
        fastestInterval: 2000
      }
    )
  }
  
  // Stop location tracking
  const stopLocationTracking = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current)
      watchId.current = null
    }
    setIsTracking(false)
  }
  
  // Animate to location
  const animateToLocation = (location, duration = 1000) => {
    if (!mapRef.current) return
    
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }, duration)
  }
  
  // Fit to coordinates
  const fitToCoordinates = (coordinates, padding = 50) => {
    if (!mapRef.current || coordinates.length === 0) return
    
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding
      },
      animated: true
    })
  }
  
  // Check geofences
  const checkGeofences = (location) => {
    geofences.forEach(geofence => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        geofence.latitude,
        geofence.longitude
      )
      
      const isInside = distance <= geofence.radius
      const wasInside = geofence.isInside || false
      
      if (isInside && !wasInside) {
        // Entered geofence
        geofence.isInside = true
        geofence.onEnter?.(geofence, location)
      } else if (!isInside && wasInside) {
        // Exited geofence
        geofence.isInside = false
        geofence.onExit?.(geofence, location)
      }
    })
  }
  
  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    
    return R * c
  }
  
  // Add geofence
  const addGeofence = (geofence) => {
    setGeofences(prev => [...prev, {
      ...geofence,
      id: geofence.id || `geofence_${Date.now()}`,
      isInside: false
    }])
  }
  
  // Remove geofence
  const removeGeofence = (geofenceId) => {
    setGeofences(prev => prev.filter(g => g.id !== geofenceId))
  }
  
  // Handle marker press
  const handleMarkerPress = (marker, event) => {
    setSelectedMarker(marker)
    onMarkerPress?.(marker, event)
  }
  
  // Handle map press
  const handleMapPress = (event) => {
    setSelectedMarker(null)
  }
  
  // Toggle map type
  const toggleMapType = () => {
    const types = ['standard', 'satellite', 'hybrid', 'terrain']
    const currentIndex = types.indexOf(mapType)
    const nextIndex = (currentIndex + 1) % types.length
    setMapType(types[nextIndex])
  }
  
  // Toggle traffic
  const toggleTraffic = () => {
    setShowTraffic(!showTraffic)
  }
  
  // Save preferences
  const savePreferences = async () => {
    try {
      const preferences = {
        mapType,
        showTraffic,
        lastRegion: region
      }
      await AsyncStorage.setItem('mapPreferences', JSON.stringify(preferences))
    } catch (error) {
      console.error('Failed to save preferences:', error)
    }
  }
  
  // Load saved preferences
  const loadSavedPreferences = async () => {
    try {
      const saved = await AsyncStorage.getItem('mapPreferences')
      if (saved) {
        const preferences = JSON.parse(saved)
        setMapType(preferences.mapType || 'standard')
        setShowTraffic(preferences.showTraffic || false)
        if (preferences.lastRegion && !initialRegion) {
          setRegion(preferences.lastRegion)
        }
      }
    } catch (error) {
      console.error('Failed to load preferences:', error)
    }
  }
  
  // Handle region change
  const handleRegionChangeComplete = (newRegion) => {
    setRegion(newRegion)
    savePreferences()
  }
  
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        mapType={mapType}
        showsUserLocation={showUserLocation && locationPermission}
        followsUserLocation={followUserLocation}
        showsMyLocationButton={false}
        showsTraffic={showTraffic}
        showsBuildings={true}
        showsIndoors={true}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={handleMapPress}
        customMapStyle={customMapStyle}
      >
        {/* Markers */}
        {markers.map((marker, index) => (
          <Marker
            key={marker.id || index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            image={marker.image}
            onPress={(event) => handleMarkerPress(marker, event)}
          >
            {marker.customCallout && (
              <Callout>
                {marker.customCallout}
              </Callout>
            )}
          </Marker>
        ))}
        
        {/* Routes */}
        {routes.map((route, index) => (
          <Polyline
            key={route.id || index}
            coordinates={route.coordinates}
            strokeColor={route.color || '#007AFF'}
            strokeWidth={route.width || 3}
            lineDashPattern={route.dashed ? [5, 5] : undefined}
          />
        ))}
        
        {/* Location history trail */}
        {locationHistory.length > 1 && (
          <Polyline
            coordinates={locationHistory}
            strokeColor="#FF6B6B"
            strokeWidth={2}
            lineDashPattern={[2, 2]}
          />
        )}
        
        {/* Geofences */}
        {geofences.map((geofence) => (
          <Circle
            key={geofence.id}
            center={{
              latitude: geofence.latitude,
              longitude: geofence.longitude
            }}
            radius={geofence.radius}
            fillColor={geofence.fillColor || 'rgba(0, 122, 255, 0.2)'}
            strokeColor={geofence.strokeColor || '#007AFF'}
            strokeWidth={2}
          />
        ))}
      </MapView>
      
      {/* Map controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={toggleMapType}
        >
          <Text style={styles.controlButtonText}>🗺️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={toggleTraffic}
        >
          <Text style={styles.controlButtonText}>🚦</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={getCurrentLocation}
        >
          <Text style={styles.controlButtonText}>📍</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.controlButton, isTracking && styles.activeButton]}
          onPress={isTracking ? stopLocationTracking : startLocationTracking}
        >
          <Text style={styles.controlButtonText}>
            {isTracking ? '⏹️' : '▶️'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Location info */}
      {userLocation && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>
            Lat: {userLocation.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Lng: {userLocation.longitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Accuracy: {userLocation.accuracy?.toFixed(0)}m
          </Text>
          {userLocation.speed && (
            <Text style={styles.locationText}>
              Speed: {(userLocation.speed * 3.6).toFixed(1)} km/h
            </Text>
          )}
        </View>
      )}
    </View>
  )
}
```

**2. Location Services Manager:**

```javascript
// Location Services Manager
class LocationServicesManager {
  constructor() {
    this.watchId = null
    this.isTracking = false
    this.locationHistory = []
    this.geofences = new Map()
    this.subscribers = new Set()
  }
  
  // Subscribe to location updates
  subscribe(callback) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }
  
  // Notify subscribers
  notifySubscribers(location) {
    this.subscribers.forEach(callback => {
      try {
        callback(location)
      } catch (error) {
        console.error('Subscriber callback error:', error)
      }
    })
  }
  
  // Start location tracking
  async startTracking(options = {}) {
    try {
      if (this.isTracking) {
        console.warn('Location tracking is already active')
        return
      }
      
      const defaultOptions = {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
        saveHistory: true,
        maxHistorySize: 1000
      }
      
      const trackingOptions = { ...defaultOptions, ...options }
      
      this.isTracking = true
      
      this.watchId = Geolocation.watchPosition(
        (position) => {
          const location = this.processLocationUpdate(position, trackingOptions)
          this.notifySubscribers(location)
        },
        (error) => {
          console.error('Location tracking error:', error)
          this.handleLocationError(error)
        },
        {
          enableHighAccuracy: trackingOptions.enableHighAccuracy,
          distanceFilter: trackingOptions.distanceFilter,
          interval: trackingOptions.interval,
          fastestInterval: trackingOptions.fastestInterval
        }
      )
      
      console.log('Location tracking started')
      
    } catch (error) {
      console.error('Failed to start location tracking:', error)
      this.isTracking = false
      throw error
    }
  }
  
  // Stop location tracking
  stopTracking() {
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId)
      this.watchId = null
    }
    this.isTracking = false
    console.log('Location tracking stopped')
  }
  
  // Process location update
  processLocationUpdate(position, options) {
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      accuracy: position.coords.accuracy,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
      timestamp: position.timestamp || Date.now()
    }
    
    // Add to history
    if (options.saveHistory) {
      this.addToHistory(location, options.maxHistorySize)
    }
    
    // Check geofences
    this.checkGeofences(location)
    
    return location
  }
  
  // Add location to history
  addToHistory(location, maxSize = 1000) {
    this.locationHistory.push(location)
    
    // Trim history if it exceeds max size
    if (this.locationHistory.length > maxSize) {
      this.locationHistory = this.locationHistory.slice(-maxSize)
    }
  }
  
  // Get current location (one-time)
  async getCurrentLocation(options = {}) {
    return new Promise((resolve, reject) => {
      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
      
      const locationOptions = { ...defaultOptions, ...options }
      
      Geolocation.getCurrentPosition(
        (position) => {
          const location = this.processLocationUpdate(position, { saveHistory: false })
          resolve(location)
        },
        (error) => {
          this.handleLocationError(error)
          reject(error)
        },
        locationOptions
      )
    })
  }
  
  // Handle location errors
  handleLocationError(error) {
    switch (error.code) {
      case 1: // PERMISSION_DENIED
        console.error('Location permission denied')
        break
      case 2: // POSITION_UNAVAILABLE
        console.error('Location position unavailable')
        break
      case 3: // TIMEOUT
        console.error('Location request timeout')
        break
      default:
        console.error('Unknown location error:', error)
    }
  }
  
  // Add geofence
  addGeofence(geofence) {
    const id = geofence.id || `geofence_${Date.now()}`
    
    const geofenceData = {
      ...geofence,
      id,
      isInside: false,
      entryTime: null,
      exitTime: null
    }
    
    this.geofences.set(id, geofenceData)
    console.log(`Geofence added: ${id}`)
    
    return id
  }
  
  // Remove geofence
  removeGeofence(geofenceId) {
    const removed = this.geofences.delete(geofenceId)
    if (removed) {
      console.log(`Geofence removed: ${geofenceId}`)
    }
    return removed
  }
  
  // Check geofences
  checkGeofences(location) {
    this.geofences.forEach((geofence, id) => {
      const distance = this.calculateDistance(
        location.latitude,
        location.longitude,
        geofence.latitude,
        geofence.longitude
      )
      
      const isInside = distance <= geofence.radius
      const wasInside = geofence.isInside
      
      if (isInside && !wasInside) {
        // Entered geofence
        geofence.isInside = true
        geofence.entryTime = Date.now()
        
        console.log(`Entered geofence: ${id}`)
        
        if (geofence.onEnter) {
          geofence.onEnter(geofence, location)
        }
        
        // Trigger notification if configured
        if (geofence.notification?.onEnter) {
          this.triggerNotification(geofence.notification.onEnter)
        }
        
      } else if (!isInside && wasInside) {
        // Exited geofence
        geofence.isInside = false
        geofence.exitTime = Date.now()
        
        console.log(`Exited geofence: ${id}`)
        
        if (geofence.onExit) {
          geofence.onExit(geofence, location)
        }
        
        // Trigger notification if configured
        if (geofence.notification?.onExit) {
          this.triggerNotification(geofence.notification.onExit)
        }
      }
    })
  }
  
  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    
    return R * c
  }
  
  // Calculate bearing between two points
  calculateBearing(lat1, lon1, lat2, lon2) {
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180
    
    const y = Math.sin(Δλ) * Math.cos(φ2)
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
    
    const θ = Math.atan2(y, x)
    
    return (θ * 180 / Math.PI + 360) % 360 // Convert to degrees
  }
  
  // Get location history
  getLocationHistory(limit = null) {
    if (limit) {
      return this.locationHistory.slice(-limit)
    }
    return [...this.locationHistory]
  }
  
  // Clear location history
  clearLocationHistory() {
    this.locationHistory = []
    console.log('Location history cleared')
  }
  
  // Get geofences
  getGeofences() {
    return Array.from(this.geofences.values())
  }
  
  // Trigger notification
  triggerNotification(notification) {
    // This would integrate with a notification service
    console.log('Triggering notification:', notification)
  }
  
  // Get tracking status
  getTrackingStatus() {
    return {
      isTracking: this.isTracking,
      watchId: this.watchId,
      historyCount: this.locationHistory.length,
      geofenceCount: this.geofences.size,
      subscriberCount: this.subscribers.size
    }
  }
}

// Global location services manager
const locationServicesManager = new LocationServicesManager()
```

**3. Route Planning and Navigation:**

```javascript
// Route Planning Manager
class RoutePlanningManager {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.routeCache = new Map()
  }
  
  // Get route between two points
  async getRoute(origin, destination, options = {}) {
    try {
      const cacheKey = this.generateCacheKey(origin, destination, options)
      
      // Check cache first
      if (this.routeCache.has(cacheKey)) {
        console.log('Returning cached route')
        return this.routeCache.get(cacheKey)
      }
      
      const defaultOptions = {
        mode: 'driving', // driving, walking, bicycling, transit
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
        optimize: false,
        alternatives: false
      }
      
      const routeOptions = { ...defaultOptions, ...options }
      
      // Build Google Directions API URL
      const params = new URLSearchParams({
        origin: `${origin.latitude},${origin.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
        mode: routeOptions.mode,
        avoid: this.buildAvoidParams(routeOptions),
        alternatives: routeOptions.alternatives,
        key: this.apiKey
      })
      
      const url = `https://maps.googleapis.com/maps/api/directions/json?${params}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.status !== 'OK') {
        throw new Error(`Route planning failed: ${data.status}`)
      }
      
      const processedRoute = this.processRouteData(data)
      
      // Cache the result
      this.routeCache.set(cacheKey, processedRoute)
      
      return processedRoute
      
    } catch (error) {
      console.error('Route planning error:', error)
      throw error
    }
  }
  
  // Get multiple routes with waypoints
  async getRouteWithWaypoints(origin, destination, waypoints = [], options = {}) {
    try {
      const waypointString = waypoints
        .map(wp => `${wp.latitude},${wp.longitude}`)
        .join('|')
      
      const params = new URLSearchParams({
        origin: `${origin.latitude},${origin.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
        waypoints: waypointString,
        mode: options.mode || 'driving',
        optimize: options.optimize || false,
        key: this.apiKey
      })
      
      const url = `https://maps.googleapis.com/maps/api/directions/json?${params}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.status !== 'OK') {
        throw new Error(`Route planning failed: ${data.status}`)
      }
      
      return this.processRouteData(data)
      
    } catch (error) {
      console.error('Waypoint route planning error:', error)
      throw error
    }
  }
  
  // Process route data from API
  processRouteData(data) {
    const route = data.routes[0]
    const leg = route.legs[0]
    
    // Decode polyline
    const coordinates = this.decodePolyline(route.overview_polyline.points)
    
    return {
      coordinates,
      distance: leg.distance,
      duration: leg.duration,
      steps: leg.steps.map(step => ({
        instruction: step.html_instructions.replace(/<[^>]*>/g, ''), // Remove HTML tags
        distance: step.distance,
        duration: step.duration,
        startLocation: step.start_location,
        endLocation: step.end_location,
        maneuver: step.maneuver
      })),
      bounds: route.bounds,
      copyrights: route.copyrights,
      warnings: route.warnings
    }
  }
  
  // Decode Google polyline
  decodePolyline(encoded) {
    const coordinates = []
    let index = 0
    let lat = 0
    let lng = 0
    
    while (index < encoded.length) {
      let b, shift = 0, result = 0
      
      do {
        b = encoded.charCodeAt(index++) - 63
        result |= (b & 0x1f) << shift
        shift += 5
      } while (b >= 0x20)
      
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1))
      lat += dlat
      
      shift = 0
      result = 0
      
      do {
        b = encoded.charCodeAt(index++) - 63
        result |= (b & 0x1f) << shift
        shift += 5
      } while (b >= 0x20)
      
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1))
      lng += dlng
      
      coordinates.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5
      })
    }
    
    return coordinates
  }
  
  // Build avoid parameters
  buildAvoidParams(options) {
    const avoid = []
    if (options.avoidTolls) avoid.push('tolls')
    if (options.avoidHighways) avoid.push('highways')
    if (options.avoidFerries) avoid.push('ferries')
    return avoid.join('|')
  }
  
  // Generate cache key
  generateCacheKey(origin, destination, options) {
    return `${origin.latitude},${origin.longitude}_${destination.latitude},${destination.longitude}_${JSON.stringify(options)}`
  }
  
  // Clear route cache
  clearCache() {
    this.routeCache.clear()
    console.log('Route cache cleared')
  }
  
  // Get estimated travel time
  async getTravelTime(origin, destination, mode = 'driving') {
    try {
      const route = await this.getRoute(origin, destination, { mode })
      return route.duration
    } catch (error) {
      console.error('Travel time estimation error:', error)
      throw error
    }
  }
  
  // Get distance matrix
  async getDistanceMatrix(origins, destinations, options = {}) {
    try {
      const originsString = origins
        .map(o => `${o.latitude},${o.longitude}`)
        .join('|')
      
      const destinationsString = destinations
        .map(d => `${d.latitude},${d.longitude}`)
        .join('|')
      
      const params = new URLSearchParams({
        origins: originsString,
        destinations: destinationsString,
        mode: options.mode || 'driving',
        units: options.units || 'metric',
        key: this.apiKey
      })
      
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.status !== 'OK') {
        throw new Error(`Distance matrix failed: ${data.status}`)
      }
      
      return data
      
    } catch (error) {
      console.error('Distance matrix error:', error)
      throw error
    }
  }
}
```

**4. Location and Map Hooks:**

```javascript
// Custom hooks for location and maps
const useLocation = (options = {}) => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [permission, setPermission] = useState(null)
  
  useEffect(() => {
    checkPermission()
  }, [])
  
  const checkPermission = async () => {
    try {
      let result
      
      if (Platform.OS === 'ios') {
        result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      } else {
        result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      }
      
      setPermission(result)
      
      if (result === RESULTS.GRANTED && options.autoStart) {
        getCurrentLocation()
      }
    } catch (err) {
      setError(err)
    }
  }
  
  const getCurrentLocation = useCallback(async () => {
    if (permission !== RESULTS.GRANTED) {
      setError(new Error('Location permission not granted'))
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const position = await locationServicesManager.getCurrentLocation(options)
      setLocation(position)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [permission, options])
  
  const startTracking = useCallback(() => {
    if (permission !== RESULTS.GRANTED) {
      setError(new Error('Location permission not granted'))
      return
    }
    
    const unsubscribe = locationServicesManager.subscribe(setLocation)
    locationServicesManager.startTracking(options)
    
    return () => {
      unsubscribe()
      locationServicesManager.stopTracking()
    }
  }, [permission, options])
  
  return {
    location,
    error,
    isLoading,
    permission,
    getCurrentLocation,
    startTracking,
    checkPermission
  }
}

// Geofencing hook
const useGeofencing = () => {
  const [geofences, setGeofences] = useState([])
  const [events, setEvents] = useState([])
  
  const addGeofence = useCallback((geofence) => {
    const id = locationServicesManager.addGeofence({
      ...geofence,
      onEnter: (gf, location) => {
        setEvents(prev => [...prev, {
          type: 'enter',
          geofence: gf,
          location,
          timestamp: Date.now()
        }])
        geofence.onEnter?.(gf, location)
      },
      onExit: (gf, location) => {
        setEvents(prev => [...prev, {
          type: 'exit',
          geofence: gf,
          location,
          timestamp: Date.now()
        }])
        geofence.onExit?.(gf, location)
      }
    })
    
    setGeofences(prev => [...prev, { ...geofence, id }])
    return id
  }, [])
  
  const removeGeofence = useCallback((geofenceId) => {
    locationServicesManager.removeGeofence(geofenceId)
    setGeofences(prev => prev.filter(gf => gf.id !== geofenceId))
  }, [])
  
  const clearEvents = useCallback(() => {
    setEvents([])
  }, [])
  
  return {
    geofences,
    events,
    addGeofence,
    removeGeofence,
    clearEvents
  }
}

// Route planning hook
const useRoutePlanning = (apiKey) => {
  const [routePlanner] = useState(() => new RoutePlanningManager(apiKey))
  const [route, setRoute] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const planRoute = useCallback(async (origin, destination, options) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const routeData = await routePlanner.getRoute(origin, destination, options)
      setRoute(routeData)
      return routeData
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [routePlanner])
  
  const clearRoute = useCallback(() => {
    setRoute(null)
    setError(null)
  }, [])
  
  return {
    route,
    isLoading,
    error,
    planRoute,
    clearRoute,
    routePlanner
  }
}

export {
  AdvancedMap,
  LocationServicesManager,
  RoutePlanningManager,
  locationServicesManager,
  useLocation,
  useGeofencing,
  useRoutePlanning
}
```

This comprehensive guide covers advanced map implementation, location services management, route planning, geofencing, and custom hooks for implementing robust maps and location services in React Native applications.

---