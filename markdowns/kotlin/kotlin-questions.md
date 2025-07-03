# Kotlin Interview Questions

## Table of Contents
1. [What are the key features of Kotlin that make it a preferred language over Java for Android development?](#q1-what-are-the-key-features-of-kotlin-that-make-it-a-preferred-language-over-java-for-android-development)
2. [What are coroutines in Kotlin and how do they compare to traditional threads?](#q2-what-are-coroutines-in-kotlin-and-how-do-they-compare-to-traditional-threads)
3. [Explain extension functions in Kotlin.](#q3-explain-extension-functions-in-kotlin)
4. [What are data classes in Kotlin?](#q4-what-are-data-classes-in-kotlin)
5. [What is null safety in Kotlin?](#q5-what-is-null-safety-in-kotlin)
6. [What are sealed classes in Kotlin?](#q6-what-are-sealed-classes-in-kotlin)
7. [Explain the difference between `val` and `var`.](#q7-explain-the-difference-between-val-and-var)
8. [What are higher-order functions in Kotlin?](#q8-what-are-higher-order-functions-in-kotlin)
9. [What is the `lateinit` keyword used for?](#q9-what-is-the-lateinit-keyword-used-for)
10. [What is the difference between `lazy` and `lateinit`?](#q10-what-is-the-difference-between-lazy-and-lateinit)
11. [What are inline functions in Kotlin?](#q11-what-are-inline-functions-in-kotlin)
12. [What is the `when` expression in Kotlin?](#q12-what-is-the-when-expression-in-kotlin)
13. [What are companion objects?](#q13-what-are-companion-objects)
14. [What is the Elvis operator (`?:`)?](#q14-what-is-the-elvis-operator-)
15. [What are destructuring declarations?](#q15-what-are-destructuring-declarations)
16. [What is the difference between `==` and `===`?](#q16-what-is-the-difference-between--and-)
17. [What are type aliases in Kotlin?](#q17-what-are-type-aliases-in-kotlin)
18. [What is the `Unit` type in Kotlin?](#q18-what-is-the-unit-type-in-kotlin)
19. [What are backing properties?](#q19-what-are-backing-properties)
20. [What is the difference between `List` and `MutableList`?](#q20-what-is-the-difference-between-list-and-mutablelist)

---

### Q1: What are the key features of Kotlin that make it a preferred language over Java for Android development?

**Answer:**
Kotlin offers several features that address common Java pain points, leading to more concise, safer, and more readable code. These features make it a modern and powerful alternative for Android development.

**Key Features:**

1.  **Null Safety:** Kotlin's type system is designed to eliminate `NullPointerException` by distinguishing between nullable and non-nullable references.

    ```kotlin
    // Non-nullable (cannot be null)
    var a: String = "abc"
    // a = null // Compilation error

    // Nullable (can be null)
    var b: String? = "xyz"
    b = null // OK

    // Safe calls
    val length = b?.length // Returns length or null

    // Elvis operator
    val len = b?.length ?: -1 // Returns length or -1 if b is null
    ```

2.  **Coroutines:** Kotlin provides built-in support for asynchronous programming with coroutines, which simplifies non-blocking code and improves app responsiveness.

    ```kotlin
    import kotlinx.coroutines.*

    fun main() = runBlocking {
        launch {
            delay(1000L)
            println("World!")
        }
        println("Hello,")
    }
    ```

3.  **Extension Functions:** You can extend existing classes with new functionality without inheriting from them.

    ```kotlin
    fun String.addExclamation(): String {
        return this + "!"
    }

    val message = "Hello"
    println(message.addExclamation()) // Output: Hello!
    ```

4.  **Data Classes:** Kotlin's `data` classes automatically generate boilerplate code for `equals()`, `hashCode()`, `toString()`, and `copy()`.

    ```kotlin
    data class User(val name: String, val age: Int)

    val user1 = User("Alice", 30)
    val user2 = user1.copy(name = "Bob")

    println(user1) // Output: User(name=Alice, age=30)
    println(user2) // Output: User(name=Bob, age=30)
    ```

5.  **Smart Casts:** The compiler automatically casts variables after a type check, reducing redundant casting.

    ```kotlin
    fun process(obj: Any) {
        if (obj is String) {
            // obj is automatically cast to String
            println("Length: ${obj.length}")
        }
    }
    ```

6.  **Interoperability with Java:** Kotlin is 100% interoperable with Java, allowing you to use existing Java libraries and frameworks seamlessly.

### Q2: What are coroutines in Kotlin and how do they compare to traditional threads?

**Answer:**
Coroutines are a concurrency design pattern that you can use in Kotlin to simplify code that executes asynchronously. They are lightweight threads, but not threads themselves. They run on top of threads but are much more efficient in terms of memory and context switching.

| Feature | Coroutines | Threads |
| :--- | :--- | :--- |
| **Resource Usage** | Lightweight, share a pool of threads. | Heavyweight, each has its own stack. |
| **Context Switching** | Fast, managed by the Kotlin runtime. | Slow, managed by the OS. |
| **Programming Model** | Structured concurrency, easier to manage. | Prone to race conditions and deadlocks. |

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    print("Hello, ")
}
```

### Q3: Explain extension functions in Kotlin.

**Answer:**
Extension functions allow you to add new functions to existing classes without having to inherit from them. This is a powerful feature for code organization and readability.

```kotlin
fun String.addExclamation(): String {
    return this + "!"
}

val greeting = "Hello"
println(greeting.addExclamation()) // Prints "Hello!"
```

### Q4: What are data classes in Kotlin?

**Answer:**
Data classes are a concise way to create classes that are primarily used to hold data. The compiler automatically generates useful methods like `equals()`, `hashCode()`, `toString()`, `copy()`, and `componentN()` functions.

```kotlin
data class User(val name: String, val age: Int)
```

### Q5: What is null safety in Kotlin?

**Answer:**
Kotlin's type system is designed to eliminate the danger of null references, also known as the "billion-dollar mistake." It distinguishes between nullable and non-nullable types.

-   **Non-nullable types:** `String` (cannot hold `null`)
-   **Nullable types:** `String?` (can hold `null`)

### Q6: What are sealed classes in Kotlin?

**Answer:**
Sealed classes are used for representing restricted class hierarchies, when a value can have one of the types from a limited set, but cannot have any other type. They are often used in `when` expressions for exhaustive checks.

### Q7: Explain the difference between `val` and `var`.

**Answer:**
-   `val` is used for read-only (immutable) variables.
-   `var` is used for mutable variables.

### Q8: What are higher-order functions in Kotlin?

**Answer:**
Higher-order functions are functions that take other functions as parameters or return them.

```kotlin
fun operate(x: Int, y: Int, operation: (Int, Int) -> Int): Int {
    return operation(x, y)
}

val sum = operate(2, 3) { a, b -> a + b }
```

### Q9: What is the `lateinit` keyword used for?

**Answer:**
`lateinit` is used for non-null properties that are initialized after the object's construction. It's a promise to the compiler that the property will be initialized before it's accessed.

### Q10: What is the difference between `lazy` and `lateinit`?

**Answer:**
-   `lateinit`: For mutable properties (`var`), can be initialized multiple times.
-   `lazy`: For immutable properties (`val`), initialized only once when first accessed.

### Q11: What are inline functions in Kotlin?

**Answer:**
Inline functions are a feature that can improve the performance of higher-order functions by avoiding the overhead of creating function objects. The compiler copies the code of the inline function to the call site.

### Q12: What is the `when` expression in Kotlin?

**Answer:**
The `when` expression is a more powerful and flexible replacement for the traditional `switch` statement. It can be used as either a statement or an expression.

### Q13: What are companion objects?

**Answer:**
A companion object is an object that is common to all instances of a class. It's similar to static members in Java.

### Q14: What is the Elvis operator (`?:`)?

**Answer:**
The Elvis operator is used to provide a default value for a nullable type if it's `null`.

```kotlin
val name: String? = null
val displayName = name ?: "Guest"
```

### Q15: What are destructuring declarations?

**Answer:**
Destructuring declarations allow you to unpack a single object into multiple variables.

```kotlin
val (name, age) = User("Alice", 30)
```

### Q16: What is the difference between `==` and `===`?

**Answer:**
-   `==`: Checks for structural equality (calls `equals()`).
-   `===`: Checks for referential equality (checks if two references point to the same object).

### Q17: What are type aliases in Kotlin?

**Answer:**
Type aliases provide alternative names for existing types. They are useful for shortening long generic types or for giving more descriptive names.

### Q18: What is the `Unit` type in Kotlin?

**Answer:**
`Unit` is a type that corresponds to `void` in Java. It indicates that a function does not return any value.

### Q19: What are backing properties?

**Answer:**
Backing properties are a way to provide a private property that is exposed as a read-only public property.

```kotlin
private val _items = mutableListOf<String>()
val items: List<String> = _items
```

### Q20: What is the difference between `List` and `MutableList`?

**Answer:**
-   `List`: An immutable, read-only list.
-   `MutableList`: A list that can be modified (add, remove, update elements).