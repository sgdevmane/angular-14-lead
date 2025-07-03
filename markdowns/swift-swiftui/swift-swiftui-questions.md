# Swift & SwiftUI Interview Questions

## Table of Contents
- [Swift \& SwiftUI Interview Questions](#swift--swiftui-interview-questions)
  - [Table of Contents](#table-of-contents)
    - [Q1: What is the difference between a class and a struct in Swift?](#q1-what-is-the-difference-between-a-class-and-a-struct-in-swift)
    - [Q2: Explain optionals in Swift and how to safely unwrap them.](#q2-explain-optionals-in-swift-and-how-to-safely-unwrap-them)
    - [Q3: What is Automatic Reference Counting (ARC) in Swift?](#q3-what-is-automatic-reference-counting-arc-in-swift)
    - [Q4: Explain closures in Swift. What are trailing closures?](#q4-explain-closures-in-swift-what-are-trailing-closures)
    - [Q5: What are protocols and delegates in Swift?](#q5-what-are-protocols-and-delegates-in-swift)
    - [Q6: What are generics in Swift?](#q6-what-are-generics-in-swift)
    - [Q7: Explain error handling in Swift (try, catch, throw).](#q7-explain-error-handling-in-swift-try-catch-throw)
    - [Q8: What is the difference between `let` and `var`?](#q8-what-is-the-difference-between-let-and-var)
    - [Q9: What is Grand Central Dispatch (GCD)?](#q9-what-is-grand-central-dispatch-gcd)
    - [Q10: What is Swift Concurrency (async/await)?](#q10-what-is-swift-concurrency-asyncawait)
    - [Q11: What is a View in SwiftUI?](#q11-what-is-a-view-in-swiftui)
    - [Q12: What are modifiers in SwiftUI?](#q12-what-are-modifiers-in-swiftui)
    - [Q13: Explain the difference between @State, @Binding, @ObservedObject, and @EnvironmentObject.](#q13-explain-the-difference-between-state-binding-observedobject-and-environmentobject)
    - [Q14: What is the Combine framework?](#q14-what-is-the-combine-framework)
    - [Q15: How do you handle navigation in SwiftUI?](#q15-how-do-you-handle-navigation-in-swiftui)
    - [Q16: What is the purpose of the `Identifiable` protocol?](#q16-what-is-the-purpose-of-the-identifiable-protocol)
    - [Q17: What are property wrappers in Swift?](#q17-what-are-property-wrappers-in-swift)
    - [Q18: What is the difference between `Any` and `AnyObject`?](#q18-what-is-the-difference-between-any-and-anyobject)
    - [Q19: What is a result type in Swift?](#q19-what-is-a-result-type-in-swift)
    - [Q20: What is the purpose of the `Codable` protocol?](#q20-what-is-the-purpose-of-the-codable-protocol)

---

### Q1: What is the difference between a class and a struct in Swift?

**Answer:**
The main differences between classes and structs in Swift revolve around their underlying implementation (reference vs. value types), which has significant implications for memory management, performance, and data integrity.

| Feature | Class | Struct |
| :--- | :--- | :--- |
| **Type** | Reference Type | Value Type |
| **Memory Management** | Stored in the heap, managed by ARC | Stored on the stack (usually) |
| **Assignment** | Copies a reference to the same instance | Creates a new copy of the instance |
| **Inheritance** | Can inherit from other classes | Cannot inherit |
| **Mutability** | `let` constant can have mutable properties | `let` constant is fully immutable |
| **Deinitializers** | Can have `deinit` | Cannot have `deinit` |

**Choosing Between Class and Struct:**

Use a **struct** when:
- The primary purpose is to encapsulate a few simple data values.
- You expect instances to be copied rather than referenced.
- You don't need inheritance from a base type.
- You want to ensure data immutability and thread safety.

Use a **class** when:
- You need Objective-C interoperability.
- You need to control the identity of an instance (e.g., a shared resource).
- You require inheritance to model a hierarchy of objects.
- You need a deinitializer to clean up resources.

**Code Example:**

```swift
// Struct Example (Value Type)
struct Point {
    var x: Int
    var y: Int
}

var p1 = Point(x: 10, y: 20)
var p2 = p1 // p2 is a new copy of p1
p2.x = 100

print("p1.x: \(p1.x)") // Output: p1.x: 10
print("p2.x: \(p2.x)") // Output: p2.x: 100

// Class Example (Reference Type)
class View {
    var width: Int
    var height: Int

    init(width: Int, height: Int) {
        self.width = width
        self.height = height
    }
}

var v1 = View(width: 300, height: 200)
var v2 = v1 // v2 is a reference to the same instance as v1
v2.width = 600

print("v1.width: \(v1.width)") // Output: v1.width: 600
print("v2.width: \(v2.width)") // Output: v2.width: 600
```



### Q2: Explain optionals in Swift and how to safely unwrap them.

**Answer:**
Optionals are a core feature of Swift designed to handle the absence of a value. An optional is a type that can either hold a value or be `nil`.

**Safe Unwrapping Techniques:**

1.  **Optional Binding (`if let` and `guard let`):**
    ```swift
    var optionalName: String? = "John"

    if let name = optionalName {
        print("Hello, \(name)")
    } else {
        print("No name provided")
    }

    func greet(name: String?) {
        guard let unwrappedName = name else {
            print("Name is nil")
            return
        }
        print("Welcome, \(unwrappedName)")
    }
    ```

2.  **Nil-Coalescing Operator (`??`):**
    ```swift
    let name = optionalName ?? "Guest"
    print("User: \(name)")
    ```

3.  **Optional Chaining (`?.`):**
    ```swift
    struct Person {
        var address: Address?
    }
    struct Address {
        var street: String?
    }
    let person = Person()
    let streetName = person.address?.street?.uppercased() // Returns nil without crashing
    ```

4.  **Force Unwrapping (`!`):** (Use with caution)
    ```swift
    let forcedName = optionalName!
    ```

### Q3: What is Automatic Reference Counting (ARC) in Swift?

**Answer:**
ARC is Swift's memory management system. It automatically tracks and manages the memory usage of your app. When an instance of a class is no longer needed, ARC deallocates the memory used by that instance.

### Q4: Explain closures in Swift. What are trailing closures?

**Answer:**
Closures are self-contained blocks of functionality that can be passed around and used in your code. They can capture and store references to any constants and variables from the context in which they are defined.

**Trailing Closures:**
If a closure is the last argument to a function, you can write it after the function's parentheses. This leads to cleaner, more readable code.

```swift
func performAction(action: () -> Void) {
    action()
}

// Using a trailing closure
performAction { 
    print("Action performed!")
}
```

### Q5: What are protocols and delegates in Swift?

**Answer:**
-   **Protocols:** A protocol defines a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. Classes, structs, and enums can then adopt the protocol to provide an actual implementation of those requirements.
-   **Delegation:** A design pattern that enables a class or struct to hand off (or delegate) some of its responsibilities to an instance of another type. This is often implemented using protocols.

### Q6: What are generics in Swift?

**Answer:**
Generics allow you to write flexible, reusable functions and types that can work with any type, subject to requirements that you define.

```swift
func swapValues<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}
```

### Q7: Explain error handling in Swift (try, catch, throw).

**Answer:**
Swift provides a powerful error handling model that allows you to represent and handle errors in your code. It uses the `try`, `catch`, and `throw` keywords.

```swift
enum MyError: Error {
    case someError
}

func mightThrow() throws {
    throw MyError.someError
}

do {
    try mightThrow()
} catch {
    print("An error occurred: \(error)")
}
```

### Q8: What is the difference between `let` and `var`?

**Answer:**
-   `let` is used to declare a constant (immutable).
-   `var` is used to declare a variable (mutable).

### Q9: What is Grand Central Dispatch (GCD)?

**Answer:**
GCD is a low-level API for managing concurrent operations. It helps you improve your app's responsiveness by deferring computationally expensive tasks to the background.

### Q10: What is Swift Concurrency (async/await)?

**Answer:**
Introduced in Swift 5.5, `async/await` provides a structured way to write asynchronous code that is easier to read and understand than traditional completion handlers or GCD.

```swift
func fetchData() async -> Data? {
    // ... asynchronous network call
}

Task {
    if let data = await fetchData() {
        // ... process data
    }
}
```

### Q11: What is a View in SwiftUI?

**Answer:**
A `View` in SwiftUI is a protocol that describes a piece of your app's UI. Views are lightweight, value-type structs that you compose to build your UI.

### Q12: What are modifiers in SwiftUI?

**Answer:**
Modifiers are methods that you call on a view to configure its properties (e.g., `font`, `padding`, `foregroundColor`). Each modifier returns a new view with the modification applied.

### Q13: Explain the difference between @State, @Binding, @ObservedObject, and @EnvironmentObject.

**Answer:**
These are property wrappers used for data flow in SwiftUI:
-   `@State`: For simple value types that are owned and managed by a single view.
-   `@Binding`: Creates a two-way connection to a `@State` variable owned by another view.
-   `@ObservedObject`: For complex reference types (classes that conform to `ObservableObject`) that are owned and managed by a view.
-   `@EnvironmentObject`: Allows you to share an `ObservableObject` with all views in a hierarchy.

### Q14: What is the Combine framework?

**Answer:**
Combine is a declarative Swift API for processing values over time. It provides a unified way to handle asynchronous events, such as network responses and user interface events.

### Q15: How do you handle navigation in SwiftUI?

**Answer:**
Navigation in SwiftUI is typically handled using `NavigationView` and `NavigationLink` for push-style navigation, or by presenting views modally with the `.sheet` modifier.

### Q16: What is the purpose of the `Identifiable` protocol?

**Answer:**
The `Identifiable` protocol is used to uniquely identify elements in a collection, which is often required by SwiftUI views like `List` and `ForEach`.

### Q17: What are property wrappers in Swift?

**Answer:**
Property wrappers are a feature that adds a layer of separation between the code that manages how a property is stored and the code that defines a property.

### Q18: What is the difference between `Any` and `AnyObject`?

**Answer:**
-   `Any`: Can represent an instance of any type at all, including function types.
-   `AnyObject`: Can represent an instance of any class type.

### Q19: What is a result type in Swift?

**Answer:**
The `Result` type is an enum with two cases: `success` and `failure`. It's a convenient way to handle operations that can either succeed with a value or fail with an error.

### Q20: What is the purpose of the `Codable` protocol?

**Answer:**
The `Codable` protocol is a type alias for the `Encodable` and `Decodable` protocols. It allows you to easily encode and decode your custom data types to and from external representations like JSON or property lists.


**Answer:**
The main differences between classes and structs in Swift revolve around their underlying implementation (reference vs. value types), which has significant implications for memory management, performance, and data integrity.

| Feature | Class | Struct |
| :--- | :--- | :--- |
| **Type** | Reference Type | Value Type |
| **Memory Management** | Stored in the heap, managed by ARC | Stored on the stack (usually) |
| **Assignment** | Copies a reference to the same instance | Creates a new copy of the instance |
| **Inheritance** | Can inherit from other classes | Cannot inherit |
| **Mutability** | `let` constant can have mutable properties | `let` constant is fully immutable |
| **Deinitializers** | Can have `deinit` | Cannot have `deinit` |

**Choosing Between Class and Struct:**

Use a **struct** when:
- The primary purpose is to encapsulate a few simple data values.
- You expect instances to be copied rather than referenced.
- You don't need inheritance from a base type.
- You want to ensure data immutability and thread safety.

Use a **class** when:
- You need Objective-C interoperability.
- You need to control the identity of an instance (e.g., a shared resource).
- You require inheritance to model a hierarchy of objects.
- You need a deinitializer to clean up resources.

**Code Example:**

```swift
// Struct Example (Value Type)
struct Point {
    var x: Int
    var y: Int
}

var p1 = Point(x: 10, y: 20)
var p2 = p1 // p2 is a new copy of p1
p2.x = 100

print("p1.x: \(p1.x)") // Output: p1.x: 10
print("p2.x: \(p2.x)") // Output: p2.x: 100

// Class Example (Reference Type)
class View {
    var width: Int
    var height: Int

    init(width: Int, height: Int) {
        self.width = width
        self.height = height
    }
}

var v1 = View(width: 300, height: 200)
var v2 = v1 // v2 is a reference to the same instance as v1
v2.width = 600

print("v1.width: \(v1.width)") // Output: v1.width: 600
print("v2.width: \(v2.width)") // Output: v2.width: 600
```