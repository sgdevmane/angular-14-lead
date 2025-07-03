# Java Interview Questions

## Table of Contents
- [Java Interview Questions](#java-interview-questions)
  - [Table of Contents](#table-of-contents)
    - [Q1: What is the difference between the Java Development Kit (JDK), Java Runtime Environment (JRE), and Java Virtual Machine (JVM)?](#q1-what-is-the-difference-between-the-java-development-kit-jdk-java-runtime-environment-jre-and-java-virtual-machine-jvm)
    - [Q2: What is the difference between `==` and `.equals()`?](#q2-what-is-the-difference-between--and-equals)
    - [Q3: What are the main principles of Object-Oriented Programming (OOP)?](#q3-what-are-the-main-principles-of-object-oriented-programming-oop)
    - [Q4: What is the difference between an `abstract class` and an `interface`?](#q4-what-is-the-difference-between-an-abstract-class-and-an-interface)
    - [Q5: What is the `final` keyword in Java?](#q5-what-is-the-final-keyword-in-java)
    - [Q6: What is the `static` keyword in Java?](#q6-what-is-the-static-keyword-in-java)
    - [Q7: What is method overloading and method overriding?](#q7-what-is-method-overloading-and-method-overriding)
    - [Q8: What is the Java Collections Framework?](#q8-what-is-the-java-collections-framework)
    - [Q9: What is the difference between `ArrayList` and `LinkedList`?](#q9-what-is-the-difference-between-arraylist-and-linkedlist)
    - [Q10: What is the difference between `HashMap` and `HashTable`?](#q10-what-is-the-difference-between-hashmap-and-hashtable)
    - [Q11: What is exception handling in Java?](#q11-what-is-exception-handling-in-java)
    - [Q12: What is the difference between checked and unchecked exceptions?](#q12-what-is-the-difference-between-checked-and-unchecked-exceptions)
    - [Q13: What is garbage collection in Java?](#q13-what-is-garbage-collection-in-java)
    - [Q14: What is multithreading in Java?](#q14-what-is-multithreading-in-java)
    - [Q15: What is the difference between `Runnable` and `Thread`?](#q15-what-is-the-difference-between-runnable-and-thread)
    - [Q16: What are generics in Java?](#q16-what-are-generics-in-java)
    - [Q17: What are lambda expressions in Java?](#q17-what-are-lambda-expressions-in-java)
    - [Q18: What is the Stream API?](#q18-what-is-the-stream-api)
    - [Q19: What is the `Optional` class?](#q19-what-is-the-optional-class)
    - [Q20: What is dependency injection?](#q20-what-is-dependency-injection)

---
### Q1: What is the difference between the Java Development Kit (JDK), Java Runtime Environment (JRE), and Java Virtual Machine (JVM)?

**Answer:**
These three components are fundamental to the Java platform, and understanding their roles is essential for any Java developer.

**Java Virtual Machine (JVM)**
-   **Role:** The JVM is an abstract machine that provides a runtime environment in which Java bytecode can be executed.
-   **Function:**
    -   Loads code
    -   Verifies code
    -   Executes code
    -   Provides runtime environment
-   **Key Concept:** The JVM is platform-dependent, meaning there are different implementations for different operating systems. This is what makes Java a "write once, run anywhere" language.

**Java Runtime Environment (JRE)**
-   **Role:** The JRE is a software package that contains what is required to run a Java program. It includes the JVM, along with the Java Class Library (JCL) and other supporting files.
-   **Components:**
    -   JVM
    -   Java Class Library (core classes like `java.lang`, `java.util`, etc.)
-   **Use Case:** You need the JRE to run Java applications, but not to develop them.

**Java Development Kit (JDK)**
-   **Role:** The JDK is a full-featured software development kit for Java. It includes everything in the JRE, plus tools for developing, debugging, and monitoring Java applications.
-   **Components:**
    -   JRE (which includes the JVM)
    -   Development tools (e.g., `javac` compiler, `java` launcher, `jar` archiver, `javadoc` documentation generator)
-   **Use Case:** You need the JDK to develop Java applications.

**Relationship:**

`JDK = JRE + Development Tools`
`JRE = JVM + Java Class Library`

**Analogy:**
-   **JVM:** The engine of a car.
-   **JRE:** The car itself (you can drive it, but you can't build a new one with it).
-   **JDK:** A car factory (you have everything you need to build and drive cars).

**Diagram:**

```
+-------------------------------------------+
|                  JDK                      |
|  +-----------------------------------+    |
|  |                JRE                |    |
|  |  +---------------------------+    |    |
|  |  |            JVM            |    |    |
|  |  +---------------------------+    |    |
|  |                                   |    |
|  |      Java Class Library           |    |
|  +-----------------------------------+    |
|                                           |
|         Development Tools                 |
| (javac, jar, javadoc, etc.)               |
+-------------------------------------------+
```

### Q2: What is the difference between `==` and `.equals()`?

**Answer:**
-   `==`: A reference comparison, i.e., it checks if both objects point to the same memory location.
-   `.equals()`: A value comparison, i.e., it checks if the values in the objects are the same. By default, it behaves like `==`, but it's often overridden in classes to provide a meaningful comparison.

### Q3: What are the main principles of Object-Oriented Programming (OOP)?

**Answer:**
-   **Encapsulation:** Bundling of data with the methods that operate on that data.
-   **Abstraction:** Hiding the complex implementation details and showing only the essential features of the object.
-   **Inheritance:** A mechanism wherein a new class derives from an existing class.
-   **Polymorphism:** The ability of an object to take on many forms.

### Q4: What is the difference between an `abstract class` and an `interface`?

**Answer:**

| Feature | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Methods** | Can have both abstract and concrete methods. | Can only have abstract methods (before Java 8). | 
| **Variables** | Can have final, non-final, static, and non-static variables. | Can only have static and final variables. |
| **Inheritance** | A class can inherit only one abstract class. | A class can implement multiple interfaces. |

### Q5: What is the `final` keyword in Java?

**Answer:**
-   **Final variable:** The value cannot be changed.
-   **Final method:** Cannot be overridden by a subclass.
-   **Final class:** Cannot be inherited.

### Q6: What is the `static` keyword in Java?

**Answer:**
-   **Static variable:** Belongs to the class rather than an instance of the class. Shared among all instances.
-   **Static method:** Belongs to the class and can be called without creating an instance.

### Q7: What is method overloading and method overriding?

**Answer:**
-   **Overloading:** When two or more methods in the same class have the same name but different parameters.
-   **Overriding:** When a method in a subclass has the same name and parameters as a method in its superclass.

### Q8: What is the Java Collections Framework?

**Answer:**
The Java Collections Framework is a set of classes and interfaces that implement commonly reusable collection data structures like `List`, `Set`, and `Map`.

### Q9: What is the difference between `ArrayList` and `LinkedList`?

**Answer:**
-   `ArrayList`: Implemented as a dynamic array. Better for storing and accessing data.
-   `LinkedList`: Implemented as a doubly-linked list. Better for manipulating data (insertion and deletion).

### Q10: What is the difference between `HashMap` and `HashTable`?

**Answer:**
-   `HashMap`: Not synchronized, allows one null key and multiple null values.
-   `HashTable`: Synchronized, does not allow null keys or values.

### Q11: What is exception handling in Java?

**Answer:**
Exception handling is a mechanism to handle runtime errors such as `ClassNotFoundException`, `IOException`, `SQLException`, etc. It uses `try`, `catch`, `finally`, `throw`, and `throws` keywords.

### Q12: What is the difference between checked and unchecked exceptions?

**Answer:**
-   **Checked exceptions:** Exceptions that are checked at compile-time. The programmer must handle them using `try-catch` or declare them with `throws`.
-   **Unchecked exceptions:** Exceptions that are not checked at compile-time. They are subclasses of `RuntimeException`.

### Q13: What is garbage collection in Java?

**Answer:**
Garbage collection is the process of automatically freeing up memory that is no longer in use by the program. The JVM's garbage collector runs in the background to reclaim memory.

### Q14: What is multithreading in Java?

**Answer:**
Multithreading is a process of executing multiple threads simultaneously. It allows a program to be more efficient by doing multiple things at the same time.

### Q15: What is the difference between `Runnable` and `Thread`?

**Answer:**
-   `Thread`: A class that you can extend to create a thread.
-   `Runnable`: An interface that you can implement to create a thread. Implementing `Runnable` is generally preferred as it allows the class to extend other classes.

### Q16: What are generics in Java?

**Answer:**
Generics enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods. This provides compile-time type safety and avoids the need for casting.

### Q17: What are lambda expressions in Java?

**Answer:**
Lambda expressions, introduced in Java 8, provide a clear and concise way to represent one method interface using an expression. They are often used with functional interfaces.

### Q18: What is the Stream API?

**Answer:**
The Stream API, also introduced in Java 8, is used to process collections of objects. A stream is a sequence of objects that supports various methods which can be pipelined to produce the desired result.

### Q19: What is the `Optional` class?

**Answer:**
`Optional` is a container object which may or may not contain a non-null value. It's used to represent the absence of a value, as an alternative to `null` references.

### Q20: What is dependency injection?

**Answer:**
Dependency Injection is a design pattern in which an object receives other objects that it depends on. This pattern is often used in frameworks like Spring to achieve Inversion of Control.