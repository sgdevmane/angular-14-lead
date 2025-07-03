# C++ Interview Questions

## Table of Contents
- [C++ Interview Questions](#c-interview-questions)
  - [Table of Contents](#table-of-contents)
    - [Q1: What are smart pointers in C++? Explain the different types and their use cases.](#q1-what-are-smart-pointers-in-c-explain-the-different-types-and-their-use-cases)
    - [Q2: What is the difference between a pointer and a reference in C++?](#q2-what-is-the-difference-between-a-pointer-and-a-reference-in-c)
    - [Q3: What is RAII (Resource Acquisition Is Initialization)?](#q3-what-is-raii-resource-acquisition-is-initialization)
    - [Q4: Explain virtual functions and polymorphism.](#q4-explain-virtual-functions-and-polymorphism)
    - [Q5: What is the difference between `new`/`delete` and `malloc`/`free`?](#q5-what-is-the-difference-between-newdelete-and-mallocfree)
    - [Q6: What is the rule of three/five/zero?](#q6-what-is-the-rule-of-threefivezero)
    - [Q7: What are templates in C++?](#q7-what-are-templates-in-c)
    - [Q8: What is the Standard Template Library (STL)?](#q8-what-is-the-standard-template-library-stl)
    - [Q9: What is the difference between `std::vector` and `std::list`?](#q9-what-is-the-difference-between-stdvector-and-stdlist)
    - [Q10: What are lambda expressions in C++?](#q10-what-are-lambda-expressions-in-c)
    - [Q11: What is `const` correctness?](#q11-what-is-const-correctness)
    - [Q12: What is the `volatile` keyword used for?](#q12-what-is-the-volatile-keyword-used-for)
    - [Q13: What is name mangling in C++?](#q13-what-is-name-mangling-in-c)
    - [Q14: What is the diamond problem?](#q14-what-is-the-diamond-problem)
    - [Q15: What is `static` in C++?](#q15-what-is-static-in-c)
    - [Q16: What is the difference between `struct` and `class` in C++?](#q16-what-is-the-difference-between-struct-and-class-in-c)
    - [Q17: What is an lvalue and an rvalue?](#q17-what-is-an-lvalue-and-an-rvalue)
    - [Q18: What is move semantics?](#q18-what-is-move-semantics)
    - [Q19: What is perfect forwarding?](#q19-what-is-perfect-forwarding)
    - [Q20: What is SFINAE (Substitution Failure Is Not An Error)?](#q20-what-is-sfinae-substitution-failure-is-not-an-error)

---

### Q1: What are smart pointers in C++? Explain the different types and their use cases.
**Answer:**
Smart pointers are objects that act like pointers but provide automatic memory management. They help prevent memory leaks by ensuring that the memory an object points to is deallocated when the smart pointer goes out of scope.

**Types of Smart Pointers (introduced in C++11):**

1.  **`std::unique_ptr`**
    -   **Ownership:** Represents exclusive ownership of a resource.
    -   **Behavior:** Only one `unique_ptr` can point to an object at a time. It cannot be copied, but it can be moved.
    -   **Use Case:** When you need a single owner for a dynamically allocated object. It's the most lightweight smart pointer.

    ```cpp
    #include <iostream>
    #include <memory>

    class MyClass {
    public:
        MyClass() { std::cout << "MyClass created\n"; }
        ~MyClass() { std::cout << "MyClass destroyed\n"; }
    };

    void process_ptr(std::unique_ptr<MyClass> ptr) {
        std::cout << "Processing pointer in function\n";
    }

    int main() {
        std::unique_ptr<MyClass> p1 = std::make_unique<MyClass>();
        // std::unique_ptr<MyClass> p2 = p1; // Compilation error: cannot copy

        // Transfer ownership
        process_ptr(std::move(p1));
        // p1 is now null

        return 0; // Memory is automatically deallocated
    }
    ```

2.  **`std::shared_ptr`**
    -   **Ownership:** Represents shared ownership of a resource.
    -   **Behavior:** Multiple `shared_ptr` instances can point to the same object. It maintains a reference count, and the object is deleted only when the last `shared_ptr` is destroyed.
    -   **Use Case:** When multiple parts of your code need to share and manage the lifetime of an object.

    ```cpp
    #include <iostream>
    #include <memory>

    void use_ptr(std::shared_ptr<MyClass> ptr) {
        std::cout << "Using pointer, count: " << ptr.use_count() << std::endl;
    }

    int main() {
        std::shared_ptr<MyClass> sp1 = std::make_shared<MyClass>();
        std::cout << "Initial count: " << sp1.use_count() << std::endl; // 1

        std::shared_ptr<MyClass> sp2 = sp1; // Copy, increments count
        std::cout << "After copy, count: " << sp1.use_count() << std::endl; // 2

        use_ptr(sp1);

        return 0; // Object destroyed when both sp1 and sp2 are out of scope
    }
    ```

3.  **`std::weak_ptr`**
    -   **Ownership:** A non-owning smart pointer that holds a weak reference to an object managed by a `std::shared_ptr`.
    -   **Behavior:** It does not affect the reference count. To access the object, you must convert it to a `std::shared_ptr` using the `lock()` method.
    -   **Use Case:** To break circular references between `std::shared_ptr` instances.

    ```cpp
    #include <iostream>
    #include <memory>

    struct B;

    struct A {
        std::shared_ptr<B> b_ptr;
        ~A() { std::cout << "A destroyed\n"; }
    };

    struct B {
        std::weak_ptr<A> a_ptr; // Use weak_ptr to break the cycle
        ~B() { std::cout << "B destroyed\n"; }
    };

    int main() {
        auto a = std::make_shared<A>();
        auto b = std::make_shared<B>();
        a->b_ptr = b;
        b->a_ptr = a;

        return 0; // Both A and B are destroyed correctly
    }
    ```
### Q2: What is the difference between a pointer and a reference in C++?

**Answer:**

| Feature | Pointer | Reference |
| :--- | :--- | :--- |
| **Can be null?** | Yes | No |
| **Can be reassigned?** | Yes | No |
| **Memory Address** | Has its own memory address. | Shares the same memory address as the original variable. |
| **Syntax** | `*` and `&` | `&` |

### Q3: What is RAII (Resource Acquisition Is Initialization)?

**Answer:**
RAII is a C++ programming technique which binds the life cycle of a resource that must be acquired before use (e.g., allocated memory, open file) to the lifetime of an object. This ensures that resources are properly released when the object goes out of scope.

### Q4: Explain virtual functions and polymorphism.

**Answer:**
-   **Virtual Functions:** A virtual function is a member function in a base class that you redefine in a derived class. It is declared using the `virtual` keyword.
-   **Polymorphism:** Allows objects of different classes to be treated as objects of a common base class. Virtual functions are the mechanism for achieving runtime polymorphism.

### Q5: What is the difference between `new`/`delete` and `malloc`/`free`?

**Answer:**
-   `new`/`delete`: C++ operators that allocate and deallocate memory. They call constructors and destructors.
-   `malloc`/`free`: C functions for memory allocation and deallocation. They do not call constructors or destructors.

### Q6: What is the rule of three/five/zero?

**Answer:**
-   **Rule of Three:** If a class defines any of the following, it should probably explicitly define all three: destructor, copy constructor, copy assignment operator.
-   **Rule of Five:** With the addition of move semantics in C++11, the rule is extended to include the move constructor and move assignment operator.
-   **Rule of Zero:** A class should not have to define any of the special member functions if it uses RAII and smart pointers to manage resources.

### Q7: What are templates in C++?

**Answer:**
Templates allow you to write generic programs. You can create a single function or a class to work with different data types.

### Q8: What is the Standard Template Library (STL)?

**Answer:**
The STL is a set of C++ template classes to provide common programming data structures and functions such as lists, stacks, arrays, etc. It is a library of container classes, algorithms, and iterators.

### Q9: What is the difference between `std::vector` and `std::list`?

**Answer:**
-   `std::vector`: Implemented as a dynamic array. Fast random access, but slow insertion/deletion in the middle.
-   `std::list`: Implemented as a doubly-linked list. Slow random access, but fast insertion/deletion anywhere.

### Q10: What are lambda expressions in C++?

**Answer:**
Lambda expressions, introduced in C++11, provide a convenient way to define anonymous function objects right at the location where they are invoked or passed as an argument to a function.

### Q11: What is `const` correctness?

**Answer:**
`const` correctness is the practice of using the `const` keyword to prevent objects from being modified. It helps the compiler to enforce design decisions and can lead to more robust code.

### Q12: What is the `volatile` keyword used for?

**Answer:**
The `volatile` keyword tells the compiler that a variable's value may be changed at any time by some external means (e.g., another thread or a hardware device). This prevents the compiler from applying optimizations that could lead to incorrect behavior.

### Q13: What is name mangling in C++?

**Answer:**
Name mangling is a technique used by C++ compilers to give a unique name to each function or variable. This is necessary to support function overloading, where multiple functions can have the same name but different parameters.

### Q14: What is the diamond problem?

**Answer:**
The diamond problem is an ambiguity that arises when two classes B and C inherit from a superclass A, and another class D inherits from both B and C. If there is a method in A that B and C have overridden, then D inherits two versions of that method. This can be solved using virtual inheritance.

### Q15: What is `static` in C++?

**Answer:**
The `static` keyword can be used in several contexts:
-   **Static variable in a function:** Retains its value between function calls.
-   **Static member variable in a class:** Shared by all instances of the class.
-   **Static member function in a class:** Can be called without creating an instance of the class.
-   **Static global variable/function:** Visible only within the file it is declared.

### Q16: What is the difference between `struct` and `class` in C++?

**Answer:**
The only difference is the default access specifier. Members of a `struct` are public by default, while members of a `class` are private by default.

### Q17: What is an lvalue and an rvalue?

**Answer:**
-   **lvalue:** An expression that refers to a memory location and can appear on the left-hand side of an assignment.
-   **rvalue:** A temporary value that does not persist beyond the expression that uses it.

### Q18: What is move semantics?

**Answer:**
Move semantics, introduced in C++11, allows resources to be transferred from one object to another instead of being copied. This can provide significant performance improvements for expensive-to-copy objects.

### Q19: What is perfect forwarding?

**Answer:**
Perfect forwarding is a technique that allows you to write a single function template that can take any number of arguments and forward them to another function, preserving their lvalue/rvalue nature.

### Q20: What is SFINAE (Substitution Failure Is Not An Error)?

**Answer:**
SFINAE is a C++ template metaprogramming technique. It refers to a situation where an invalid substitution of template parameters is not an error, but rather results in the compiler discarding that overload from the set of candidate functions.