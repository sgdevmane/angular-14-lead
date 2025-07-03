# .NET Interview Questions

## Table of Contents
- [.NET Interview Questions](#net-interview-questions)
  - [Table of Contents](#table-of-contents)
    - [Q1: What is the difference between the .NET Framework, .NET Core, and .NET 5/6/7+? Explain the evolution of the .NET platform.](#q1-what-is-the-difference-between-the-net-framework-net-core-and-net-567-explain-the-evolution-of-the-net-platform)
    - [Q2: What is the Common Language Runtime (CLR)?](#q2-what-is-the-common-language-runtime-clr)
    - [Q3: Explain the difference between managed and unmanaged code.](#q3-explain-the-difference-between-managed-and-unmanaged-code)
    - [Q4: What is the Global Assembly Cache (GAC)?](#q4-what-is-the-global-assembly-cache-gac)
    - [Q5: What is LINQ (Language Integrated Query)?](#q5-what-is-linq-language-integrated-query)
    - [Q6: What is ASP.NET Core?](#q6-what-is-aspnet-core)
    - [Q7: Explain middleware in ASP.NET Core.](#q7-explain-middleware-in-aspnet-core)
    - [Q8: What is dependency injection in .NET?](#q8-what-is-dependency-injection-in-net)
    - [Q9: What is Entity Framework Core?](#q9-what-is-entity-framework-core)
    - [Q10: What is the difference between `IQueryable` and `IEnumerable`?](#q10-what-is-the-difference-between-iqueryable-and-ienumerable)
    - [Q11: What is Razor Pages?](#q11-what-is-razor-pages)
    - [Q12: What is Blazor?](#q12-what-is-blazor)
    - [Q13: What is SignalR?](#q13-what-is-signalr)
    - [Q14: What is a `Task` in .NET?](#q14-what-is-a-task-in-net)
    - [Q15: What is the purpose of the `using` statement in C#?](#q15-what-is-the-purpose-of-the-using-statement-in-c)
    - [Q16: What are delegates in C#?](#q16-what-are-delegates-in-c)
    - [Q17: What are extension methods in C#?](#q17-what-are-extension-methods-in-c)
    - [Q18: What is the difference between `struct` and `class` in C#?](#q18-what-is-the-difference-between-struct-and-class-in-c)
    - [Q19: What is boxing and unboxing?](#q19-what-is-boxing-and-unboxing)
    - [Q20: What is NuGet?](#q20-what-is-nuget)

---

### Q1: What is the difference between the .NET Framework, .NET Core, and .NET 5/6/7+? Explain the evolution of the .NET platform.

**Answer:**
Understanding the evolution of .NET is crucial for any .NET developer. The platform has undergone significant changes, moving from a Windows-only framework to a cross-platform, open-source ecosystem.

**.NET Framework**
- **Initial Release:** 2002
- **Platform:** Windows-only
- **Key Features:**
    - **Common Language Runtime (CLR):** The execution engine that manages memory, security, and other system services.
    - **Framework Class Library (FCL):** A comprehensive library of reusable classes, interfaces, and value types.
    - **Windows-specific APIs:** Deep integration with Windows, including WPF, Windows Forms, and ASP.NET (System.Web).
- **Use Case:** Primarily for building Windows desktop and web applications.

**.NET Core**
- **Initial Release:** 2016
- **Platform:** Cross-platform (Windows, macOS, Linux)
- **Key Features:**
    - **Open Source:** Developed as an open-source project on GitHub.
    - **High Performance:** Optimized for performance and scalability.
    - **Modular:** Built with a modular architecture, allowing you to include only the necessary components.
    - **Side-by-side Installation:** Different versions can run on the same machine without conflicts.
- **Use Case:** For building modern, cross-platform web apps, microservices, and console applications.

**.NET (5/6/7+): The Unification**
- **Initial Release:** .NET 5 in 2020
- **Concept:** A single, unified platform that combines the best of .NET Framework and .NET Core.
- **Key Features:**
    - **Single BCL (Base Class Library):** One set of APIs that works across all application types.
    - **Unified Toolchain:** A single SDK and command-line interface (CLI) for all .NET projects.
    - **Support for a wide range of application models:** Web, mobile (via .NET MAUI), desktop, cloud, and IoT.
    - **Regular Release Cadence:** A new major version is released annually in November.

**Evolution Summary:**

| Platform | Key Characteristic | Primary Focus |
| :--- | :--- | :--- |
| **.NET Framework** | Windows-only, monolithic | Windows desktop and web apps |
| **.NET Core** | Cross-platform, open-source, modular | Modern web apps and microservices |
| **.NET 5+** | Unified, single platform | All application types (web, mobile, desktop, etc.) |

**Code Example (Illustrating cross-platform nature of .NET Core/5+):**

This simple console application can be built and run on Windows, macOS, or Linux without any code changes.

```csharp
// Program.cs
using System;
using System.Runtime.InteropServices;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("Hello from .NET!");
        Console.WriteLine($"Operating System: {RuntimeInformation.OSDescription}");
        Console.WriteLine($"OS Architecture: {RuntimeInformation.OSArchitecture}");
        Console.WriteLine($"Framework: {RuntimeInformation.FrameworkDescription}");
    }
}
```
### Q2: What is the Common Language Runtime (CLR)?

**Answer:**
The CLR is the virtual machine component of Microsoft's .NET framework. It manages the execution of .NET programs by handling memory management, garbage collection, type safety, and exception handling.

### Q3: Explain the difference between managed and unmanaged code.

**Answer:**
-   **Managed Code:** Code that is executed by the CLR. It benefits from services like garbage collection and security.
-   **Unmanaged Code:** Code that is executed directly by the operating system, outside the .NET environment. It requires manual memory management.

### Q4: What is the Global Assembly Cache (GAC)?

**Answer:**
The GAC is a machine-wide code cache that stores assemblies specifically designated to be shared by several applications on the computer.

### Q5: What is LINQ (Language Integrated Query)?

**Answer:**
LINQ is a set of features that extends powerful query capabilities to the language syntax of C# and VB.NET. It provides a consistent way to query data from different sources like databases, XML documents, and in-memory collections.

```csharp
var evenNumbers = from num in numbers
                  where num % 2 == 0
                  select num;
```

### Q6: What is ASP.NET Core?

**Answer:**
ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-based, internet-connected applications.

### Q7: Explain middleware in ASP.NET Core.

**Answer:**
Middleware is software that's assembled into an application pipeline to handle requests and responses. Each component chooses whether to pass the request on to the next component in the pipeline, and can perform work before and after the next component is invoked.

### Q8: What is dependency injection in .NET?

**Answer:**
Dependency Injection (DI) is a design pattern used to implement Inversion of Control (IoC). It allows the creation of dependent objects outside of a class and provides those objects to the class through different ways.

### Q9: What is Entity Framework Core?

**Answer:**
Entity Framework (EF) Core is a modern object-database mapper for .NET. It supports LINQ queries, change tracking, updates, and schema migrations.

### Q10: What is the difference between `IQueryable` and `IEnumerable`?

**Answer:**
-   `IEnumerable`: Represents a forward-only cursor of a collection. When you query an `IEnumerable`, it loads the entire collection into memory before filtering.
-   `IQueryable`: Represents a query that can be executed against a specific data source. It builds a query expression tree that is executed on the server side, resulting in a more efficient query.

### Q11: What is Razor Pages?

**Answer:**
Razor Pages is a page-based programming model in ASP.NET Core that makes building web UI easier and more productive. It's a simpler alternative to the Model-View-Controller (MVC) pattern.

### Q12: What is Blazor?

**Answer:**
Blazor is a framework for building interactive client-side web UI with .NET. It allows you to build reusable UI components using C# and Razor syntax.

### Q13: What is SignalR?

**Answer:**
SignalR is a library for ASP.NET developers that simplifies the process of adding real-time web functionality to applications. Real-time web functionality is the ability to have server code push content to connected clients instantly as it becomes available.

### Q14: What is a `Task` in .NET?

**Answer:**
A `Task` represents an asynchronous operation. It's the core of the Task-based Asynchronous Pattern (TAP) in .NET, used with `async` and `await` keywords.

### Q15: What is the purpose of the `using` statement in C#?

**Answer:**
The `using` statement provides a convenient syntax that ensures the correct use of `IDisposable` objects. When the control leaves the `using` block, the `Dispose` method is called on the object.

### Q16: What are delegates in C#?

**Answer:**
A delegate is a type that represents references to methods with a particular parameter list and return type. They are similar to function pointers in C++.

### Q17: What are extension methods in C#?

**Answer:**
Extension methods enable you to "add" methods to existing types without creating a new derived type, recompiling, or otherwise modifying the original type.

### Q18: What is the difference between `struct` and `class` in C#?

**Answer:**
-   `class`: Reference type, stored on the heap.
-   `struct`: Value type, stored on the stack.

### Q19: What is boxing and unboxing?

**Answer:**
-   **Boxing:** The process of converting a value type to the type `object` or to any interface type implemented by this value type.
-   **Unboxing:** The process of converting an `object` type back to a value type.

### Q20: What is NuGet?

**Answer:**
NuGet is the package manager for .NET. It enables developers to create, share, and consume useful .NET libraries.