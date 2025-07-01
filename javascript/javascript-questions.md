# JavaScript Interview Questions - Lead Software Engineer

## Table of Contents
1. [Fundamentals](#fundamentals)
2. [Functions and Scope](#functions-and-scope)
3. [Asynchronous Programming](#asynchronous-programming)
4. [ES6+ Features](#es6-features)
5. [Advanced Concepts](#advanced-concepts)
6. [Event Handling](#event-handling)
7. [Performance and Optimization](#performance-and-optimization)
8. [Design Patterns](#design-patterns)
9. [Memory Management](#memory-management)
10. [Browser APIs](#browser-apis)
11. [Security](#security)
12. [Guess the Output](#guess-the-output)

---

## Fundamentals

### Q1: What are the different data types in JavaScript? Explain with examples.
**Difficulty: Easy**

**Answer:**
JavaScript has 8 data types, divided into two categories:

**Primitive Types:**
1. **Number** - Represents both integers and floating-point numbers
2. **String** - Represents text data
3. **Boolean** - Represents true/false values
4. **Undefined** - Represents a variable that has been declared but not assigned
5. **Null** - Represents an intentional absence of value
6. **Symbol** - Represents a unique identifier (ES6+)
7. **BigInt** - Represents integers with arbitrary precision (ES2020)

**Non-Primitive Type:**
8. **Object** - Represents complex data structures

```javascript
// Number
let age = 25;
let price = 99.99;
let infinity = Infinity;
let notANumber = NaN;

// String
let name = "John Doe";
let template = `Hello, ${name}!`;

// Boolean
let isActive = true;
let isCompleted = false;

// Undefined
let undefinedVar;
console.log(undefinedVar); // undefined

// Null
let emptyValue = null;

// Symbol
let sym1 = Symbol('id');
let sym2 = Symbol('id');
console.log(sym1 === sym2); // false

// BigInt
let bigNumber = 1234567890123456789012345678901234567890n;

// Object
let person = {
    name: "Alice",
    age: 30
};
let numbers = [1, 2, 3, 4, 5];
let func = function() { return "Hello"; };
```

**Type Checking:**
```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (this is a known quirk)
console.log(typeof Symbol());    // "symbol"
console.log(typeof 123n);        // "bigint"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"
```

---

### Q2: Explain the difference between `==` and `===` operators with examples.
**Difficulty: Easy**

**Answer:**
The main difference lies in type coercion:

**`==` (Loose Equality):**
- Performs type coercion before comparison
- Converts operands to the same type, then compares
- Can lead to unexpected results

**`===` (Strict Equality):**
- No type coercion
- Compares both value and type
- Recommended for most comparisons

```javascript
// Loose Equality (==)
console.log(5 == "5");        // true (string "5" converted to number)
console.log(true == 1);       // true (boolean converted to number)
console.log(false == 0);      // true
console.log(null == undefined); // true (special case)
console.log("" == 0);         // true (empty string converted to 0)
console.log([] == 0);         // true (array converted to primitive)

// Strict Equality (===)
console.log(5 === "5");       // false (different types)
console.log(true === 1);      // false
console.log(false === 0);     // false
console.log(null === undefined); // false
console.log("" === 0);        // false
console.log([] === 0);        // false

// Same type comparisons work the same
console.log(5 == 5);          // true
console.log(5 === 5);         // true
console.log("hello" == "hello"); // true
console.log("hello" === "hello"); // true
```

**Type Coercion Examples:**
```javascript
// Complex coercion scenarios
console.log("2" + 1);         // "21" (string concatenation)
console.log("2" - 1);         // 1 (numeric subtraction)
console.log("2" * "3");       // 6 (both converted to numbers)
console.log(true + true);     // 2 (booleans converted to numbers)
console.log([1,2] + [3,4]);   // "1,23,4" (arrays converted to strings)
```

**Best Practice:**
Always use `===` and `!==` unless you specifically need type coercion.

---

### Q3: What is hoisting in JavaScript? Explain with examples.
**Difficulty: Medium**

**Answer:**
Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their containing scope during the compilation phase. However, only declarations are hoisted, not initializations.

**Variable Hoisting:**

```javascript
// What you write:
console.log(x); // undefined (not ReferenceError)
var x = 5;
console.log(x); // 5

// How JavaScript interprets it:
var x; // declaration hoisted
console.log(x); // undefined
x = 5; // initialization stays in place
console.log(x); // 5
```

**Function Hoisting:**

```javascript
// Function declarations are fully hoisted
console.log(sayHello()); // "Hello!" - works before declaration

function sayHello() {
    return "Hello!";
}

// Function expressions are not hoisted
console.log(sayGoodbye()); // TypeError: sayGoodbye is not a function

var sayGoodbye = function() {
    return "Goodbye!";
};
```

**Let and Const Hoisting:**

```javascript
// let and const are hoisted but in "temporal dead zone"
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
const b = 20;

// Temporal Dead Zone example
function example() {
    console.log(temp); // ReferenceError
    let temp = "I'm in TDZ";
}
```

**Complex Hoisting Scenarios:**

```javascript
var name = "Global";

function outer() {
    console.log(name); // undefined (not "Global")
    
    if (false) {
        var name = "Local"; // This declaration is hoisted
    }
    
    console.log(name); // undefined
}

outer();

// Equivalent to:
function outer() {
    var name; // hoisted declaration
    console.log(name); // undefined
    
    if (false) {
        name = "Local"; // assignment (never executed)
    }
    
    console.log(name); // undefined
}
```

**Function vs Variable Hoisting Priority:**

```javascript
console.log(typeof foo); // "function"

var foo = "I'm a variable";

function foo() {
    return "I'm a function";
}

console.log(typeof foo); // "string"

// Functions are hoisted before variables
```

---

### Q4: Explain the concept of scope in JavaScript.
**Difficulty: Medium**

**Answer:**
Scope determines the accessibility of variables, functions, and objects in different parts of your code. JavaScript has several types of scope:

**1. Global Scope:**
Variables declared outside any function or block have global scope.

```javascript
var globalVar = "I'm global";
let globalLet = "I'm also global";

function testGlobal() {
    console.log(globalVar); // Accessible
    console.log(globalLet); // Accessible
}

// Accessible from anywhere
console.log(globalVar);
console.log(globalLet);
```

**2. Function Scope:**
Variables declared inside a function are only accessible within that function.

```javascript
function functionScope() {
    var functionVar = "I'm function scoped";
    let functionLet = "I'm also function scoped";
    
    console.log(functionVar); // Accessible
    console.log(functionLet); // Accessible
}

functionScope();
// console.log(functionVar); // ReferenceError
// console.log(functionLet); // ReferenceError
```

**3. Block Scope (ES6+):**
`let` and `const` have block scope, `var` does not.

```javascript
if (true) {
    var varVariable = "I'm var";
    let letVariable = "I'm let";
    const constVariable = "I'm const";
}

console.log(varVariable); // "I'm var" - accessible
// console.log(letVariable); // ReferenceError
// console.log(constVariable); // ReferenceError

// Loop example
for (var i = 0; i < 3; i++) {
    // var i is function/global scoped
}
console.log(i); // 3

for (let j = 0; j < 3; j++) {
    // let j is block scoped
}
// console.log(j); // ReferenceError
```

**4. Lexical Scope:**
Inner functions have access to variables in their outer scope.

```javascript
function outerFunction(x) {
    let outerVariable = x;
    
    function innerFunction(y) {
        let innerVariable = y;
        console.log(outerVariable); // Accessible
        console.log(innerVariable); // Accessible
    }
    
    return innerFunction;
}

const inner = outerFunction(10);
inner(20); // Can access outerVariable even after outerFunction returns
```

**5. Module Scope:**
Variables declared at the top level of a module.

```javascript
// module.js
const moduleVariable = "I'm module scoped";
let anotherModuleVar = "Me too";

export function getModuleVar() {
    return moduleVariable; // Accessible within module
}

// Not accessible from outside unless exported
```

**Scope Chain:**

```javascript
let global = "global";

function level1() {
    let level1Var = "level1";
    
    function level2() {
        let level2Var = "level2";
        
        function level3() {
            let level3Var = "level3";
            
            // Can access all outer scopes
            console.log(global);     // "global"
            console.log(level1Var);  // "level1"
            console.log(level2Var);  // "level2"
            console.log(level3Var);  // "level3"
        }
        
        return level3;
    }
    
    return level2;
}

const func = level1()();
func();
```

---

### Q5: What is the difference between `var`, `let`, and `const`?
**Difficulty: Medium**

**Answer:**
These are three ways to declare variables in JavaScript, each with different characteristics:

**Comparison Table:**

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function/Global | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declaration | Allowed | Not allowed | Not allowed |
| Re-assignment | Allowed | Allowed | Not allowed |
| Temporal Dead Zone | No | Yes | Yes |
| Initialization | Optional | Optional | Required |

**1. Scope Differences:**

```javascript
function scopeExample() {
    if (true) {
        var varVariable = "var";
        let letVariable = "let";
        const constVariable = "const";
    }
    
    console.log(varVariable);    // "var" - function scoped
    // console.log(letVariable);    // ReferenceError - block scoped
    // console.log(constVariable);  // ReferenceError - block scoped
}

// Loop example
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100); // 3, 3, 3
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 100); // 0, 1, 2
}
```

**2. Hoisting Differences:**

```javascript
console.log(varVariable);    // undefined
console.log(letVariable);    // ReferenceError
console.log(constVariable);  // ReferenceError

var varVariable = "var";
let letVariable = "let";
const constVariable = "const";
```

**3. Re-declaration:**

```javascript
// var allows re-declaration
var name = "John";
var name = "Jane"; // No error
console.log(name); // "Jane"

// let and const don't allow re-declaration
let age = 25;
// let age = 30; // SyntaxError

const city = "New York";
// const city = "Boston"; // SyntaxError
```

**4. Re-assignment:**

```javascript
// var and let allow re-assignment
var varNum = 10;
varNum = 20; // OK

let letNum = 10;
letNum = 20; // OK

// const doesn't allow re-assignment
const constNum = 10;
// constNum = 20; // TypeError

// But object properties can be modified
const obj = { name: "John" };
obj.name = "Jane"; // OK
obj.age = 25;      // OK
// obj = {};       // TypeError
```

**5. Temporal Dead Zone:**

```javascript
function temporalDeadZone() {
    console.log(varVar);   // undefined
    // console.log(letVar);   // ReferenceError
    // console.log(constVar); // ReferenceError
    
    var varVar = "var";
    let letVar = "let";
    const constVar = "const";
}
```

**6. Best Practices:**

```javascript
// Use const by default
const PI = 3.14159;
const users = [];
const config = { api: "https://api.example.com" };

// Use let when you need to reassign
let counter = 0;
let currentUser = null;

for (let i = 0; i < 10; i++) {
    counter += i;
}

// Avoid var in modern JavaScript
// Only use var if you specifically need function scoping
```

---

## Functions and Scope

### Q6: Explain closures in JavaScript with practical examples.
**Difficulty: Hard**

**Answer:**
A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. Closures are created every time a function is created.

**Basic Closure Example:**

```javascript
function outerFunction(x) {
    // Outer function's variable
    let outerVariable = x;
    
    // Inner function (closure)
    function innerFunction(y) {
        console.log(outerVariable + y); // Accesses outer variable
    }
    
    return innerFunction;
}

const addFive = outerFunction(5);
addFive(10); // 15 - outerVariable (5) is still accessible
```

**Practical Example 1: Data Privacy**

```javascript
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.decrement()); // 1

// count is not directly accessible
console.log(counter.count); // undefined
```

**Practical Example 2: Function Factory**

```javascript
function createMultiplier(multiplier) {
    return function(x) {
        return x * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**Practical Example 3: Module Pattern**

```javascript
const userModule = (function() {
    let users = [];
    let currentId = 1;
    
    return {
        addUser: function(name, email) {
            const user = {
                id: currentId++,
                name: name,
                email: email
            };
            users.push(user);
            return user;
        },
        
        getUser: function(id) {
            return users.find(user => user.id === id);
        },
        
        getAllUsers: function() {
            return [...users]; // Return copy to prevent mutation
        },
        
        removeUser: function(id) {
            const index = users.findIndex(user => user.id === id);
            if (index !== -1) {
                return users.splice(index, 1)[0];
            }
            return null;
        }
    };
})();

// Usage
const user1 = userModule.addUser("John", "john@example.com");
const user2 = userModule.addUser("Jane", "jane@example.com");
console.log(userModule.getAllUsers());
```

**Common Closure Pitfall - Loop Problem:**

```javascript
// Problem: All functions log 3
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 3, 3, 3
    }, 100);
}

// Solution 1: Use let (block scope)
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 0, 1, 2
    }, 100);
}

// Solution 2: Use closure with IIFE
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index); // 0, 1, 2
        }, 100);
    })(i);
}

// Solution 3: Use bind
for (var i = 0; i < 3; i++) {
    setTimeout(function(index) {
        console.log(index); // 0, 1, 2
    }.bind(null, i), 100);
}
```

**Memory Considerations:**

```javascript
function createHeavyClosure() {
    const heavyData = new Array(1000000).fill('data');
    
    return function(index) {
        return heavyData[index]; // heavyData is kept in memory
    };
}

// Better approach if you don't need all the data
function createLightClosure() {
    return function(size, index) {
        const data = new Array(size).fill('data');
        return data[index];
    };
}
```

**Advanced Closure Pattern - Memoization:**

```javascript
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Cache hit');
            return cache.get(key);
        }
        
        console.log('Computing...');
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveFunction = memoize(function(n) {
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    return result;
});

console.log(expensiveFunction(1000)); // Computing... then result
console.log(expensiveFunction(1000)); // Cache hit, then result
```

---

### Q7: What are arrow functions and how do they differ from regular functions?
**Difficulty: Medium**

**Answer:**
Arrow functions are a concise way to write functions introduced in ES6. They have several key differences from regular functions:

**Syntax Comparison:**

```javascript
// Regular function
function regularFunction(a, b) {
    return a + b;
}

// Arrow function
const arrowFunction = (a, b) => a + b;

// Various arrow function syntaxes
const noParams = () => "Hello";
const oneParam = x => x * 2;           // Parentheses optional for single param
const multipleParams = (x, y) => x + y;
const multipleLines = (x, y) => {
    const sum = x + y;
    return sum * 2;
};
```

**Key Differences:**

**1. `this` Binding:**

```javascript
const obj = {
    name: "John",
    
    // Regular function - 'this' refers to obj
    regularMethod: function() {
        console.log("Regular:", this.name); // "John"
        
        setTimeout(function() {
            console.log("Regular setTimeout:", this.name); // undefined (global this)
        }, 100);
    },
    
    // Arrow function - 'this' is lexically bound
    arrowMethod: () => {
        console.log("Arrow:", this.name); // undefined (global this)
    },
    
    // Mixed approach
    mixedMethod: function() {
        console.log("Mixed outer:", this.name); // "John"
        
        setTimeout(() => {
            console.log("Mixed arrow setTimeout:", this.name); // "John"
        }, 100);
    }
};

obj.regularMethod();
obj.arrowMethod();
obj.mixedMethod();
```

**2. Arguments Object:**

```javascript
// Regular function has 'arguments' object
function regularFunc() {
    console.log(arguments); // Arguments object
    console.log(Array.from(arguments));
}

// Arrow function doesn't have 'arguments'
const arrowFunc = () => {
    // console.log(arguments); // ReferenceError
};

// Use rest parameters instead
const arrowWithRest = (...args) => {
    console.log(args); // Array
};

regularFunc(1, 2, 3);
arrowWithRest(1, 2, 3);
```

**3. Constructor Usage:**

```javascript
// Regular function can be used as constructor
function RegularConstructor(name) {
    this.name = name;
}

const instance1 = new RegularConstructor("John"); // Works

// Arrow function cannot be used as constructor
const ArrowConstructor = (name) => {
    this.name = name;
};

// const instance2 = new ArrowConstructor("Jane"); // TypeError
```

**4. Hoisting:**

```javascript
// Regular function declarations are hoisted
console.log(hoistedFunction()); // "I'm hoisted!"

function hoistedFunction() {
    return "I'm hoisted!";
}

// Arrow functions are not hoisted (they're expressions)
// console.log(notHoisted()); // ReferenceError

const notHoisted = () => "I'm not hoisted!";
```

**5. Method Definitions:**

```javascript
class MyClass {
    constructor(name) {
        this.name = name;
    }
    
    // Regular method
    regularMethod() {
        return `Hello, ${this.name}`;
    }
    
    // Arrow function as property (not recommended for methods)
    arrowMethod = () => {
        return `Hi, ${this.name}`;
    }
    
    // Event handler example
    setupEventListener() {
        const button = document.getElementById('myButton');
        
        // Regular function - need to bind 'this'
        button.addEventListener('click', function() {
            console.log(this.name); // undefined
        }.bind(this));
        
        // Arrow function - 'this' is automatically bound
        button.addEventListener('click', () => {
            console.log(this.name); // Works correctly
        });
    }
}
```

**When to Use Each:**

**Use Arrow Functions:**
- Short, simple functions
- Callbacks where you want to preserve `this`
- Functional programming patterns
- Event handlers in classes

```javascript
// Good use cases for arrow functions
const numbers = [1, 2, 3, 4, 5];

// Array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Promise chains
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

**Use Regular Functions:**
- Object methods
- Constructor functions
- When you need `arguments` object
- When you need dynamic `this` binding

```javascript
// Good use cases for regular functions
const calculator = {
    value: 0,
    
    add: function(n) {
        this.value += n;
        return this;
    },
    
    multiply: function(n) {
        this.value *= n;
        return this;
    },
    
    getValue: function() {
        return this.value;
    }
};

// Method chaining works because 'this' refers to calculator
calculator.add(5).multiply(2).getValue(); // 10
```

**Performance Considerations:**

```javascript
// Arrow functions in object literals create new functions each time
const createUser = (name) => ({
    name,
    greet: () => `Hello, ${name}` // New function created each time
});

// Better approach
const createUserBetter = (name) => ({
    name,
    greet() {
        return `Hello, ${this.name}`;
    }
});
```

---

## Asynchronous Programming

### Q8: Explain the event loop in JavaScript.
**Difficulty: Hard**

**Answer:**
The event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It manages the execution of code, collection of events, and execution of queued sub-tasks.

**JavaScript Runtime Components:**

```javascript
// 1. Call Stack - LIFO (Last In, First Out)
// 2. Web APIs (Browser) / C++ APIs (Node.js)
// 3. Callback Queue (Task Queue)
// 4. Microtask Queue (Job Queue)
// 5. Event Loop
```

**Call Stack Example:**

```javascript
function first() {
    console.log('First');
    second();
    console.log('First again');
}

function second() {
    console.log('Second');
    third();
    console.log('Second again');
}

function third() {
    console.log('Third');
}

first();

// Call Stack execution:
// 1. first() pushed
// 2. console.log('First') executed
// 3. second() pushed
// 4. console.log('Second') executed
// 5. third() pushed
// 6. console.log('Third') executed
// 7. third() popped
// 8. console.log('Second again') executed
// 9. second() popped
// 10. console.log('First again') executed
// 11. first() popped
```

**Asynchronous Operations:**

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
}, 0);

setTimeout(() => {
    console.log('Timeout 2');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise 1');
});

Promise.resolve().then(() => {
    console.log('Promise 2');
});

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Timeout 2
```

**Detailed Event Loop Process:**

```javascript
// Step-by-step execution
function eventLoopExample() {
    console.log('1: Synchronous');
    
    // Macro task (goes to callback queue)
    setTimeout(() => {
        console.log('4: setTimeout');
    }, 0);
    
    // Microtask (goes to microtask queue)
    Promise.resolve().then(() => {
        console.log('3: Promise');
    });
    
    console.log('2: Synchronous');
}

eventLoopExample();

// Execution order:
// 1. Call stack: console.log('1: Synchronous')
// 2. setTimeout callback goes to Web API, then callback queue
// 3. Promise.then goes to microtask queue
// 4. Call stack: console.log('2: Synchronous')
// 5. Call stack empty, event loop checks microtask queue first
// 6. Execute Promise callback: console.log('3: Promise')
// 7. Microtask queue empty, check callback queue
// 8. Execute setTimeout callback: console.log('4: setTimeout')
```

**Microtasks vs Macrotasks:**

```javascript
// Microtasks (higher priority):
// - Promise.then/catch/finally
// - queueMicrotask()
// - MutationObserver

// Macrotasks (lower priority):
// - setTimeout/setInterval
// - setImmediate (Node.js)
// - I/O operations
// - UI events

console.log('Start');

// Macrotask
setTimeout(() => console.log('Macro 1'), 0);

// Microtask
Promise.resolve().then(() => console.log('Micro 1'));

// Macrotask
setTimeout(() => console.log('Macro 2'), 0);

// Microtask
Promise.resolve().then(() => console.log('Micro 2'));

console.log('End');

// Output:
// Start
// End
// Micro 1
// Micro 2
// Macro 1
// Macro 2
```

**Complex Example with Nested Callbacks:**

```javascript
function complexEventLoop() {
    console.log('1');
    
    setTimeout(() => {
        console.log('2');
        Promise.resolve().then(() => console.log('3'));
    }, 0);
    
    Promise.resolve().then(() => {
        console.log('4');
        setTimeout(() => console.log('5'), 0);
    });
    
    setTimeout(() => {
        console.log('6');
    }, 0);
    
    console.log('7');
}

complexEventLoop();

// Output:
// 1
// 7
// 4
// 2
// 3
// 6
// 5
```

**Event Loop Phases (Node.js):**

```javascript
// Node.js event loop has 6 phases:
// 1. Timer phase (setTimeout, setInterval)
// 2. Pending callbacks phase
// 3. Idle, prepare phase
// 4. Poll phase (I/O operations)
// 5. Check phase (setImmediate)
// 6. Close callbacks phase

// Node.js specific example
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0);
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('Promise'));

// Output in Node.js:
// nextTick
// Promise
// setTimeout (or setImmediate, order may vary)
// setImmediate (or setTimeout, order may vary)
```

**Blocking the Event Loop:**

```javascript
// Bad: Blocking the event loop
function blockingOperation() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // Blocking for 3 seconds
    }
    console.log('Blocking operation complete');
}

console.log('Before blocking');
blockingOperation();
console.log('After blocking');

// Better: Non-blocking approach
function nonBlockingOperation() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Non-blocking operation complete');
            resolve();
        }, 3000);
    });
}

console.log('Before non-blocking');
nonBlockingOperation().then(() => {
    console.log('After non-blocking');
});
console.log('This runs immediately');
```

**Practical Implications:**

```javascript
// Understanding event loop helps with:

// 1. Avoiding callback hell
function callbackHell() {
    setTimeout(() => {
        console.log('1');
        setTimeout(() => {
            console.log('2');
            setTimeout(() => {
                console.log('3');
            }, 100);
        }, 100);
    }, 100);
}

// 2. Using Promises effectively
function promiseChain() {
    return Promise.resolve()
        .then(() => {
            console.log('1');
            return new Promise(resolve => setTimeout(resolve, 100));
        })
        .then(() => {
            console.log('2');
            return new Promise(resolve => setTimeout(resolve, 100));
        })
        .then(() => {
            console.log('3');
        });
}

// 3. Optimizing performance
function optimizedBatchUpdate() {
    // Batch DOM updates using microtasks
    Promise.resolve().then(() => {
        // All DOM updates happen together
        document.getElementById('element1').textContent = 'Updated 1';
        document.getElementById('element2').textContent = 'Updated 2';
        document.getElementById('element3').textContent = 'Updated 3';
    });
}
```

---

### Q9: What are Promises? Explain with examples including error handling.
**Difficulty: Medium**

**Answer:**
Promises are objects representing the eventual completion or failure of an asynchronous operation. They provide a cleaner alternative to callbacks for handling asynchronous code.

**Promise States:**
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

**Basic Promise Creation:**

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    
    setTimeout(() => {
        if (success) {
            resolve('Operation successful!');
        } else {
            reject(new Error('Operation failed!'));
        }
    }, 1000);
});

// Consuming the Promise
myPromise
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.log('Error:', error.message);
    })
    .finally(() => {
        console.log('Operation completed');
    });
```

**Promise Methods:**

```javascript
// Promise.resolve() - Creates a resolved promise
const resolvedPromise = Promise.resolve('Immediate success');
resolvedPromise.then(value => console.log(value));

// Promise.reject() - Creates a rejected promise
const rejectedPromise = Promise.reject(new Error('Immediate failure'));
rejectedPromise.catch(error => console.log(error.message));

// Promise.all() - Waits for all promises to resolve
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log('All resolved:', values); // [1, 2, 3]
    })
    .catch(error => {
        console.log('One or more failed:', error);
    });

// Promise.allSettled() - Waits for all promises to settle
const mixedPromises = [
    Promise.resolve('Success'),
    Promise.reject(new Error('Failure')),
    Promise.resolve('Another success')
];

Promise.allSettled(mixedPromises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} succeeded:`, result.value);
            } else {
                console.log(`Promise ${index} failed:`, result.reason.message);
            }
        });
    });

// Promise.race() - Resolves with the first settled promise
const fastPromise = new Promise(resolve => setTimeout(() => resolve('Fast'), 100));
const slowPromise = new Promise(resolve => setTimeout(() => resolve('Slow'), 500));

Promise.race([fastPromise, slowPromise])
    .then(result => {
        console.log('First to complete:', result); // 'Fast'
    });

// Promise.any() - Resolves with the first fulfilled promise
const failingPromise = Promise.reject(new Error('Failed'));
const succeedingPromise = new Promise(resolve => 
    setTimeout(() => resolve('Success'), 200)
);

Promise.any([failingPromise, succeedingPromise])
    .then(result => {
        console.log('First success:', result); // 'Success'
    })
    .catch(error => {
        console.log('All failed:', error);
    });
```

**Chaining Promises:**

```javascript
// Sequential execution
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            console.log('User fetched:', user);
            return fetch(`/api/users/${userId}/posts`);
        })
        .then(response => response.json())
        .then(posts => {
            console.log('Posts fetched:', posts);
            return { user, posts };
        })
        .catch(error => {
            console.error('Error in chain:', error);
            throw error; // Re-throw to propagate
        });
}

// Usage
fetchUserData(123)
    .then(data => {
        console.log('Complete data:', data);
    })
    .catch(error => {
        console.log('Final error handler:', error.message);
    });
```

**Error Handling Patterns:**

```javascript
// 1. Basic error handling
function basicErrorHandling() {
    return fetch('/api/data')
        .then(response => response.json())
        .catch(error => {
            console.error('Network error:', error);
            return { error: 'Failed to fetch data' }; // Fallback value
        });
}

// 2. Specific error handling
function specificErrorHandling() {
    return fetch('/api/data')
        .then(response => {
            if (response.status === 404) {
                throw new Error('Data not found');
            }
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            if (error.message === 'Data not found') {
                return null; // Handle 404 specifically
            }
            if (error.message === 'Unauthorized') {
                // Redirect to login
                window.location.href = '/login';
                return;
            }
            throw error; // Re-throw other errors
        });
}

// 3. Error recovery
function errorRecovery() {
    let retryCount = 0;
    const maxRetries = 3;
    
    function attemptFetch() {
        return fetch('/api/unreliable-endpoint')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                retryCount++;
                if (retryCount <= maxRetries) {
                    console.log(`Retry ${retryCount}/${maxRetries}`);
                    return new Promise(resolve => {
                        setTimeout(() => resolve(attemptFetch()), 1000 * retryCount);
                    });
                }
                throw new Error(`Failed after ${maxRetries} retries: ${error.message}`);
            });
    }
    
    return attemptFetch();
}
```

**Advanced Promise Patterns:**

```javascript
// 1. Promise timeout
function withTimeout(promise, timeoutMs) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Operation timed out after ${timeoutMs}ms`));
        }, timeoutMs);
    });
    
    return Promise.race([promise, timeout]);
}

// Usage
const slowOperation = new Promise(resolve => 
    setTimeout(() => resolve('Done'), 5000)
);

withTimeout(slowOperation, 3000)
    .then(result => console.log(result))
    .catch(error => console.log(error.message)); // "Operation timed out after 3000ms"

// 2. Promise queue (sequential execution)
class PromiseQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }
    
    add(promiseFunction) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promiseFunction,
                resolve,
                reject
            });
            this.process();
        });
    }
    
    async process() {
        if (this.running || this.queue.length === 0) {
            return;
        }
        
        this.running = true;
        
        while (this.queue.length > 0) {
            const { promiseFunction, resolve, reject } = this.queue.shift();
            
            try {
                const result = await promiseFunction();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }
        
        this.running = false;
    }
}

// Usage
const queue = new PromiseQueue();

queue.add(() => fetch('/api/data1').then(r => r.json()));
queue.add(() => fetch('/api/data2').then(r => r.json()));
queue.add(() => fetch('/api/data3').then(r => r.json()));

// 3. Promise memoization
function memoizePromise(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const promise = fn.apply(this, args)
            .catch(error => {
                cache.delete(key); // Remove failed promises from cache
                throw error;
            });
        
        cache.set(key, promise);
        return promise;
    };
}

const memoizedFetch = memoizePromise(url => fetch(url).then(r => r.json()));

// First call makes HTTP request
memoizedFetch('/api/data').then(data => console.log('First:', data));

// Second call returns cached promise
memoizedFetch('/api/data').then(data => console.log('Second:', data));
```

**Converting Callbacks to Promises:**

```javascript
// Promisifying callback-based functions
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

// Example: Promisifying setTimeout
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Example: Promisifying Node.js fs.readFile
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

readFileAsync('file.txt', 'utf8')
    .then(content => console.log(content))
    .catch(error => console.error(error));
```

---

### Q10: Explain async/await and how it relates to Promises.
**Difficulty: Medium**

**Answer:**
Async/await is syntactic sugar built on top of Promises, introduced in ES2017. It allows you to write asynchronous code that looks and behaves more like synchronous code, making it easier to read and maintain.

**Basic Syntax:**

```javascript
// Promise-based approach
function fetchDataWithPromises() {
    return fetch('/api/user/1')
        .then(response => response.json())
        .then(user => {
            console.log('User:', user);
            return fetch(`/api/user/${user.id}/posts`);
        })
        .then(response => response.json())
        .then(posts => {
            console.log('Posts:', posts);
            return { user, posts };
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Async/await approach
async function fetchDataWithAsyncAwait() {
    try {
        const userResponse = await fetch('/api/user/1');
        const user = await userResponse.json();
        console.log('User:', user);
        
        const postsResponse = await fetch(`/api/user/${user.id}/posts`);
        const posts = await postsResponse.json();
        console.log('Posts:', posts);
        
        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

**Key Concepts:**

**1. Async Functions Always Return Promises:**

```javascript
async function simpleAsync() {
    return 'Hello World';
}

// Equivalent to:
function simplePromise() {
    return Promise.resolve('Hello World');
}

// Both return a Promise
console.log(simpleAsync()); // Promise { 'Hello World' }
console.log(simplePromise()); // Promise { 'Hello World' }

// To get the value:
simpleAsync().then(value => console.log(value)); // 'Hello World'
```

**2. Await Can Only Be Used Inside Async Functions:**

```javascript
// ❌ This will cause a SyntaxError
function regularFunction() {
    const result = await fetch('/api/data'); // SyntaxError
    return result;
}

// ✅ Correct usage
async function asyncFunction() {
    const result = await fetch('/api/data');
    return result;
}

// ✅ Top-level await (ES2022 in modules)
// In a module file:
const data = await fetch('/api/data');
```

**Error Handling:**

```javascript
// 1. Try-catch for error handling
async function handleErrors() {
    try {
        const response = await fetch('/api/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error.message);
        
        // You can return a default value or re-throw
        return { error: 'Failed to fetch data' };
    }
}

// 2. Multiple try-catch blocks
async function multipleErrorHandling() {
    let user, posts;
    
    try {
        const userResponse = await fetch('/api/user/1');
        user = await userResponse.json();
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return { error: 'User fetch failed' };
    }
    
    try {
        const postsResponse = await fetch(`/api/user/${user.id}/posts`);
        posts = await postsResponse.json();
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        // Continue with just user data
        posts = [];
    }
    
    return { user, posts };
}

// 3. Catching specific errors
async function specificErrorHandling() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof TypeError) {
            console.error('Network error:', error.message);
        } else if (error instanceof SyntaxError) {
            console.error('JSON parsing error:', error.message);
        } else {
            console.error('Unknown error:', error.message);
        }
        throw error;
    }
}
```

**Parallel vs Sequential Execution:**

```javascript
// ❌ Sequential execution (slower)
async function sequentialExecution() {
    const start = Date.now();
    
    const user = await fetch('/api/user/1').then(r => r.json());
    const posts = await fetch('/api/posts').then(r => r.json());
    const comments = await fetch('/api/comments').then(r => r.json());
    
    console.log(`Sequential took: ${Date.now() - start}ms`);
    return { user, posts, comments };
}

// ✅ Parallel execution (faster)
async function parallelExecution() {
    const start = Date.now();
    
    // Start all requests simultaneously
    const userPromise = fetch('/api/user/1').then(r => r.json());
    const postsPromise = fetch('/api/posts').then(r => r.json());
    const commentsPromise = fetch('/api/comments').then(r => r.json());
    
    // Wait for all to complete
    const [user, posts, comments] = await Promise.all([
        userPromise,
        postsPromise,
        commentsPromise
    ]);
    
    console.log(`Parallel took: ${Date.now() - start}ms`);
    return { user, posts, comments };
}

// ✅ Alternative parallel syntax
async function parallelExecutionAlt() {
    const start = Date.now();
    
    const [user, posts, comments] = await Promise.all([
        fetch('/api/user/1').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/comments').then(r => r.json())
    ]);
    
    console.log(`Parallel alt took: ${Date.now() - start}ms`);
    return { user, posts, comments };
}
```

**Advanced Patterns:**

**1. Async Iteration:**

```javascript
// Processing arrays with async/await
async function processUsers(userIds) {
    const users = [];
    
    // ❌ Sequential processing
    for (const id of userIds) {
        const user = await fetch(`/api/users/${id}`).then(r => r.json());
        users.push(user);
    }
    
    return users;
}

// ✅ Parallel processing
async function processUsersParallel(userIds) {
    const userPromises = userIds.map(id => 
        fetch(`/api/users/${id}`).then(r => r.json())
    );
    
    return await Promise.all(userPromises);
}

// ✅ Controlled concurrency
async function processUsersWithLimit(userIds, limit = 3) {
    const results = [];
    
    for (let i = 0; i < userIds.length; i += limit) {
        const batch = userIds.slice(i, i + limit);
        const batchPromises = batch.map(id => 
            fetch(`/api/users/${id}`).then(r => r.json())
        );
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
    }
    
    return results;
}
```

**2. Async Generators:**

```javascript
async function* fetchPages(baseUrl) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        const response = await fetch(`${baseUrl}?page=${page}`);
        const data = await response.json();
        
        yield data.items;
        
        hasMore = data.hasMore;
        page++;
    }
}

// Usage
async function processAllPages() {
    for await (const pageItems of fetchPages('/api/items')) {
        console.log('Processing page with', pageItems.length, 'items');
        // Process each page as it arrives
    }
}
```

**3. Timeout and Cancellation:**

```javascript
// Timeout wrapper
function withTimeout(promise, timeoutMs) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeoutMs)
        )
    ]);
}

async function fetchWithTimeout(url, timeoutMs = 5000) {
    try {
        const response = await withTimeout(fetch(url), timeoutMs);
        return await response.json();
    } catch (error) {
        if (error.message === 'Timeout') {
            console.error(`Request to ${url} timed out`);
        }
        throw error;
    }
}

// AbortController for cancellation
async function fetchWithCancellation(url, signal) {
    try {
        const response = await fetch(url, { signal });
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request was cancelled');
        }
        throw error;
    }
}

// Usage
const controller = new AbortController();
fetchWithCancellation('/api/data', controller.signal);

// Cancel after 3 seconds
setTimeout(() => controller.abort(), 3000);
```

**4. Retry Logic:**

```javascript
async function retryAsync(fn, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            
            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
            }
            
            console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Exponential backoff
            delay *= 2;
        }
    }
}

// Usage
async function unreliableOperation() {
    if (Math.random() < 0.7) {
        throw new Error('Random failure');
    }
    return 'Success!';
}

retryAsync(unreliableOperation)
    .then(result => console.log(result))
    .catch(error => console.error(error.message));
```

**Common Pitfalls:**

```javascript
// ❌ Forgetting to await
async function forgettingAwait() {
    const promise = fetch('/api/data'); // Returns Promise, not data
    console.log(promise); // Promise object, not the actual data
    return promise;
}

// ✅ Correct usage
async function correctAwait() {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data); // Actual data
    return data;
}

// ❌ Mixing async/await with .then()
async function mixingPatterns() {
    const data = await fetch('/api/data')
        .then(response => response.json()) // Unnecessary .then()
        .then(data => data);
    return data;
}

// ✅ Pure async/await
async function pureAsyncAwait() {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
}
```

---

## ES6+ Features

### Q11: Explain destructuring assignment with examples.
**Difficulty: Medium**

**Answer:**
Destructuring assignment allows you to extract values from arrays or properties from objects into distinct variables using a syntax that mirrors the construction of array and object literals.

**Array Destructuring:**

```javascript
// Basic array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, third] = numbers;
console.log(first);  // 1
console.log(second); // 2
console.log(third);  // 3

// Skipping elements
const [a, , c, , e] = numbers;
console.log(a, c, e); // 1, 3, 5

// Rest operator
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20, z = 30] = [1, 2];
console.log(x, y, z); // 1, 2, 30

// Swapping variables
let var1 = 'a';
let var2 = 'b';
[var1, var2] = [var2, var1];
console.log(var1, var2); // 'b', 'a'

// Nested arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const [[a1, a2], [b1, b2]] = nested;
console.log(a1, a2, b1, b2); // 1, 2, 3, 4
```

**Object Destructuring:**

```javascript
// Basic object destructuring
const person = {
    name: 'John Doe',
    age: 30,
    city: 'New York',
    country: 'USA'
};

const { name, age, city } = person;
console.log(name, age, city); // 'John Doe', 30, 'New York'

// Renaming variables
const { name: fullName, age: years } = person;
console.log(fullName, years); // 'John Doe', 30

// Default values
const { name, age, salary = 50000 } = person;
console.log(salary); // 50000

// Rest operator
const { name, ...rest } = person;
console.log(name); // 'John Doe'
console.log(rest); // { age: 30, city: 'New York', country: 'USA' }

// Nested objects
const user = {
    id: 1,
    profile: {
        name: 'Jane',
        contact: {
            email: 'jane@example.com',
            phone: '123-456-7890'
        }
    }
};

const {
    id,
    profile: {
        name,
        contact: { email, phone }
    }
} = user;

console.log(id, name, email, phone);
```

**Function Parameter Destructuring:**

```javascript
// Object parameter destructuring
function createUser({ name, age, email, role = 'user' }) {
    return {
        id: Date.now(),
        name,
        age,
        email,
        role,
        createdAt: new Date()
    };
}

const newUser = createUser({
    name: 'Alice',
    age: 25,
    email: 'alice@example.com'
});

// Array parameter destructuring
function calculateDistance([x1, y1], [x2, y2]) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

const distance = calculateDistance([0, 0], [3, 4]); // 5

// Mixed destructuring
function processOrder({ items, customer: { name, address } }) {
    console.log(`Processing order for ${name}`);
    console.log(`Shipping to: ${address}`);
    console.log(`Items: ${items.length}`);
}

processOrder({
    items: ['item1', 'item2'],
    customer: {
        name: 'Bob',
        address: '123 Main St'
    }
});
```

**Advanced Destructuring Patterns:**

```javascript
// Dynamic property names
const key = 'dynamicKey';
const obj = { dynamicKey: 'value' };
const { [key]: dynamicValue } = obj;
console.log(dynamicValue); // 'value'

// Destructuring in loops
const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

for (const { name, age } of users) {
    console.log(`${name} is ${age} years old`);
}

// Destructuring with Map
const userMap = new Map([
    ['john', { name: 'John', age: 30 }],
    ['jane', { name: 'Jane', age: 25 }]
]);

for (const [key, { name, age }] of userMap) {
    console.log(`${key}: ${name} (${age})`);
}
```

---

### Q12: What are template literals and their advanced features?
**Difficulty: Medium**

**Answer:**
Template literals are string literals that allow embedded expressions and multi-line strings, enclosed by backticks (`) instead of quotes.

**Basic Template Literals:**

```javascript
// Basic interpolation
const name = 'John';
const age = 30;
const message = `Hello, my name is ${name} and I am ${age} years old.`;
console.log(message);

// Multi-line strings
const multiLine = `
    This is a multi-line string.
    It preserves line breaks
    and indentation.
`;

// Expression evaluation
const a = 5;
const b = 10;
const result = `The sum of ${a} and ${b} is ${a + b}.`;
console.log(result); // "The sum of 5 and 10 is 15."

// Function calls in templates
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

const price = 19.99;
const productInfo = `Price: ${formatCurrency(price)}`;
console.log(productInfo); // "Price: $19.99"
```

**Tagged Template Literals:**

```javascript
// Basic tagged template
function highlight(strings, ...values) {
    console.log('Strings:', strings);
    console.log('Values:', values);
    
    return strings.reduce((result, string, i) => {
        const value = values[i] ? `<mark>${values[i]}</mark>` : '';
        return result + string + value;
    }, '');
}

const name = 'JavaScript';
const type = 'programming language';
const highlighted = highlight`${name} is a ${type}!`;
console.log(highlighted);
// "<mark>JavaScript</mark> is a <mark>programming language</mark>!"

// SQL query builder
function sql(strings, ...values) {
    return {
        query: strings.join('?'),
        values: values
    };
}

const userId = 123;
const status = 'active';
const query = sql`SELECT * FROM users WHERE id = ${userId} AND status = ${status}`;
console.log(query);
// { query: "SELECT * FROM users WHERE id = ? AND status = ?", values: [123, "active"] }

// HTML template with escaping
function html(strings, ...values) {
    const escape = (str) => {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };
    
    return strings.reduce((result, string, i) => {
        const value = values[i] ? escape(values[i]) : '';
        return result + string + value;
    }, '');
}

const userInput = '<script>alert("XSS")</script>';
const safeHTML = html`<div>User input: ${userInput}</div>`;
console.log(safeHTML);
// "<div>User input: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>"
```

**Advanced Use Cases:**

```javascript
// Internationalization
function i18n(strings, ...values) {
    const translations = {
        'Hello, my name is': 'Hola, mi nombre es',
        'and I am': 'y tengo',
        'years old': 'años'
    };
    
    return strings.reduce((result, string, i) => {
        const translatedString = translations[string.trim()] || string;
        const value = values[i] || '';
        return result + translatedString + value;
    }, '');
}

const greeting = i18n`Hello, my name is ${'Juan'} and I am ${25} years old`;

// CSS-in-JS
function css(strings, ...values) {
    const className = 'css-' + Math.random().toString(36).substr(2, 9);
    const cssRule = strings.reduce((result, string, i) => {
        return result + string + (values[i] || '');
    }, '');
    
    // In a real implementation, this would inject CSS into the document
    console.log(`.${className} { ${cssRule} }`);
    return className;
}

const primaryColor = '#007bff';
const buttonClass = css`
    background-color: ${primaryColor};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
`;

// GraphQL queries
function gql(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] || '');
    }, '');
}

const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            name
            email
            posts {
                title
                content
            }
        }
    }
`;
```

---

### Q13: Explain the spread operator and rest parameters.
**Difficulty: Medium**

**Answer:**
The spread operator (...) and rest parameters use the same syntax but serve different purposes. Spread "spreads" elements, while rest "collects" them.

**Spread Operator:**

**1. Array Spreading:**

```javascript
// Copying arrays
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]
console.log(copy === original); // false (different references)

// Concatenating arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Adding elements
const numbers = [2, 3, 4];
const withMore = [1, ...numbers, 5, 6];
console.log(withMore); // [1, 2, 3, 4, 5, 6]

// Converting NodeList to Array
const elements = document.querySelectorAll('div');
const elementsArray = [...elements];

// Finding max/min
const scores = [85, 92, 78, 96, 88];
const maxScore = Math.max(...scores);
const minScore = Math.min(...scores);
console.log(maxScore, minScore); // 96, 78
```

**2. Object Spreading:**

```javascript
// Copying objects
const person = { name: 'John', age: 30 };
const personCopy = { ...person };
console.log(personCopy); // { name: 'John', age: 30 }

// Merging objects
const defaults = { theme: 'light', language: 'en' };
const userPrefs = { theme: 'dark', fontSize: 14 };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: 'dark', language: 'en', fontSize: 14 }

// Adding/updating properties
const user = { id: 1, name: 'Alice' };
const updatedUser = { ...user, age: 25, name: 'Alice Smith' };
console.log(updatedUser); // { id: 1, name: 'Alice Smith', age: 25 }

// Conditional spreading
const includeAge = true;
const userProfile = {
    name: 'Bob',
    email: 'bob@example.com',
    ...(includeAge && { age: 30 })
};
console.log(userProfile);
```

**3. Function Call Spreading:**

```javascript
// Passing array elements as arguments
function greet(first, last, title) {
    return `Hello, ${title} ${first} ${last}!`;
}

const nameArray = ['John', 'Doe', 'Mr.'];
const greeting = greet(...nameArray);
console.log(greeting); // "Hello, Mr. John Doe!"

// Date constructor
const dateArray = [2023, 11, 25]; // Year, Month (0-indexed), Day
const date = new Date(...dateArray);
console.log(date);
```

**Rest Parameters:**

**1. Function Parameters:**

```javascript
// Collecting remaining arguments
function sum(first, second, ...rest) {
    console.log('First:', first);
    console.log('Second:', second);
    console.log('Rest:', rest);
    
    return first + second + rest.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // First: 1, Second: 2, Rest: [3, 4, 5], Result: 15

// Variable number of arguments
function createMessage(template, ...values) {
    return template.replace(/{(\d+)}/g, (match, index) => {
        return values[index] || match;
    });
}

const message = createMessage('Hello {0}, you have {1} messages', 'John', 5);
console.log(message); // "Hello John, you have 5 messages"

// Array-like operations on rest parameters
function processNumbers(...numbers) {
    const doubled = numbers.map(n => n * 2);
    const filtered = numbers.filter(n => n > 10);
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    
    return { doubled, filtered, sum };
}

const result = processNumbers(5, 15, 8, 20, 3);
console.log(result);
```

**2. Destructuring with Rest:**

```javascript
// Array destructuring with rest
const [first, second, ...remaining] = [1, 2, 3, 4, 5];
console.log(first);     // 1
console.log(second);    // 2
console.log(remaining); // [3, 4, 5]

// Object destructuring with rest
const { name, age, ...otherProps } = {
    name: 'Alice',
    age: 30,
    city: 'New York',
    country: 'USA',
    occupation: 'Developer'
};

console.log(name);       // 'Alice'
console.log(age);        // 30
console.log(otherProps); // { city: 'New York', country: 'USA', occupation: 'Developer' }
```

**Advanced Patterns:**

```javascript
// Partial application with spread
function multiply(a, b, c) {
    return a * b * c;
}

const multiplyBy2And3 = (...args) => multiply(2, 3, ...args);
console.log(multiplyBy2And3(4)); // 24

// Cloning nested objects (shallow)
const original = {
    user: { name: 'John', age: 30 },
    settings: { theme: 'dark' }
};

const clone = {
    ...original,
    user: { ...original.user },
    settings: { ...original.settings }
};

// Function composition with rest/spread
function compose(...functions) {
    return (value) => {
        return functions.reduceRight((acc, fn) => fn(acc), value);
    };
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(square, double, addOne);
console.log(composed(3)); // ((3 + 1) * 2)^2 = 64

// Merging arrays with conditions
function mergeArrays(...arrays) {
    return arrays.reduce((merged, array) => {
        return [...merged, ...array.filter(item => !merged.includes(item))];
    }, []);
}

const unique = mergeArrays([1, 2, 3], [3, 4, 5], [5, 6, 7]);
console.log(unique); // [1, 2, 3, 4, 5, 6, 7]
```

---

## Advanced Concepts

### Q14: What is currying in JavaScript? Provide practical examples.
**Difficulty: Hard**

**Answer:**
Currying is a functional programming technique that transforms a function with multiple arguments into a sequence of functions, each taking a single argument. It's named after mathematician Haskell Curry.

**Basic Currying:**

```javascript
// Regular function
function add(a, b, c) {
    return a + b + c;
}

console.log(add(1, 2, 3)); // 6

// Curried version
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function version
const curriedAddArrow = a => b => c => a + b + c;
console.log(curriedAddArrow(1)(2)(3)); // 6

// Partial application
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3)); // 6

// Reusable functions
const add5 = curriedAdd(5);
console.log(add5(3)(2)); // 10
console.log(add5(1)(4)); // 10
```

**Automatic Currying Function:**

```javascript
// Generic curry function
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

// Usage
function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24
console.log(curriedMultiply(2, 3, 4)); // 24
```

**Practical Examples:**

```javascript
// 1. Event handling
const addEventListener = curry((event, element, handler) => {
    element.addEventListener(event, handler);
});

const addClickListener = addEventListener('click');
const addMouseoverListener = addEventListener('mouseover');

// Usage
const button = document.getElementById('myButton');
addClickListener(button, () => console.log('Clicked!'));
addMouseoverListener(button, () => console.log('Hovered!'));

// 2. API requests
const makeRequest = curry((method, url, data) => {
    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined
    });
});

const get = makeRequest('GET');
const post = makeRequest('POST');
const put = makeRequest('PUT');

// Usage
get('/api/users').then(response => response.json());
post('/api/users', { name: 'John', email: 'john@example.com' });

// 3. Validation
const validate = curry((validator, message, value) => {
    return validator(value) ? { valid: true } : { valid: false, message };
});

const isRequired = value => value != null && value !== '';
const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const minLength = min => value => value && value.length >= min;

const validateRequired = validate(isRequired, 'This field is required');
const validateEmail = validate(isEmail, 'Please enter a valid email');
const validateMinLength8 = validate(minLength(8), 'Minimum 8 characters required');

// Usage
console.log(validateRequired('John')); // { valid: true }
console.log(validateEmail('invalid-email')); // { valid: false, message: '...' }
```

---

### Q15: Explain generators in JavaScript with practical use cases.
**Difficulty: Hard**

**Answer:**
Generators are special functions that can be paused and resumed, allowing you to produce a sequence of values over time. They're defined using `function*` syntax and use the `yield` keyword.

**Basic Generator Syntax:**

```javascript
// Generator function
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
    return 'done';
}

// Creating generator object
const gen = simpleGenerator();

// Calling next() method
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 'done', done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

**Generator with Parameters:**

```javascript
function* parameterGenerator() {
    const first = yield 'First yield';
    console.log('Received:', first);
    
    const second = yield 'Second yield';
    console.log('Received:', second);
    
    return 'Final value';
}

const gen = parameterGenerator();
console.log(gen.next());           // { value: 'First yield', done: false }
console.log(gen.next('Hello'));    // Logs: 'Received: Hello', returns { value: 'Second yield', done: false }
console.log(gen.next('World'));    // Logs: 'Received: World', returns { value: 'Final value', done: true }
```

**Infinite Sequences:**

```javascript
// Infinite number sequence
function* infiniteNumbers() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

const numbers = infiniteNumbers();
console.log(numbers.next().value); // 0
console.log(numbers.next().value); // 1
console.log(numbers.next().value); // 2

// Fibonacci sequence
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
    console.log(fib.next().value);
}
// Output: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

// Random number generator
function* randomGenerator(min = 0, max = 100) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const random = randomGenerator(1, 10);
console.log(random.next().value); // Random number between 1-10
```

**Practical Use Cases:**

**1. Pagination:**

```javascript
function* paginate(data, pageSize) {
    for (let i = 0; i < data.length; i += pageSize) {
        yield data.slice(i, i + pageSize);
    }
}

const data = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);
const pages = paginate(data, 5);

for (const page of pages) {
    console.log('Page:', page);
}

// Or manually
const pageGen = paginate(data, 5);
console.log(pageGen.next().value); // ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
console.log(pageGen.next().value); // ['Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']
```

**2. Async Data Processing:**

```javascript
function* processDataBatches(data, batchSize) {
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        yield batch.map(item => {
            // Simulate processing
            return { ...item, processed: true, timestamp: Date.now() };
        });
    }
}

async function processBatchesAsync(data, batchSize, delay = 100) {
    const generator = processDataBatches(data, batchSize);
    const results = [];
    
    for (const batch of generator) {
        console.log(`Processing batch of ${batch.length} items`);
        results.push(...batch);
        
        // Add delay between batches to prevent blocking
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    return results;
}

// Usage
const largeDataset = Array.from({ length: 1000 }, (_, i) => ({ id: i, data: `Item ${i}` }));
processBatchesAsync(largeDataset, 50).then(results => {
    console.log(`Processed ${results.length} items`);
});
```

**3. State Machine:**

```javascript
function* stateMachine() {
    let state = 'idle';
    let action;
    
    while (true) {
        switch (state) {
            case 'idle':
                action = yield 'System is idle';
                if (action === 'start') {
                    state = 'running';
                } else if (action === 'shutdown') {
                    state = 'stopped';
                }
                break;
                
            case 'running':
                action = yield 'System is running';
                if (action === 'pause') {
                    state = 'paused';
                } else if (action === 'stop') {
                    state = 'idle';
                }
                break;
                
            case 'paused':
                action = yield 'System is paused';
                if (action === 'resume') {
                    state = 'running';
                } else if (action === 'stop') {
                    state = 'idle';
                }
                break;
                
            case 'stopped':
                yield 'System is stopped';
                return 'System shutdown complete';
        }
    }
}

const machine = stateMachine();
console.log(machine.next().value);        // 'System is idle'
console.log(machine.next('start').value); // 'System is running'
console.log(machine.next('pause').value); // 'System is paused'
console.log(machine.next('resume').value);// 'System is running'
console.log(machine.next('stop').value);  // 'System is idle'
```

**4. Iterator Protocol:**

```javascript
// Custom iterable object
class Range {
    constructor(start, end, step = 1) {
        this.start = start;
        this.end = end;
        this.step = step;
    }
    
    *[Symbol.iterator]() {
        for (let value = this.start; value <= this.end; value += this.step) {
            yield value;
        }
    }
}

const range = new Range(1, 10, 2);

// Can be used with for...of
for (const num of range) {
    console.log(num); // 1, 3, 5, 7, 9
}

// Can be spread
const numbers = [...range];
console.log(numbers); // [1, 3, 5, 7, 9]

// Can use array methods
const doubled = Array.from(range, x => x * 2);
console.log(doubled); // [2, 6, 10, 14, 18]
```

**5. Lazy Evaluation:**

```javascript
function* lazyMap(iterable, transform) {
    for (const item of iterable) {
        yield transform(item);
    }
}

function* lazyFilter(iterable, predicate) {
    for (const item of iterable) {
        if (predicate(item)) {
            yield item;
        }
    }
}

function* take(iterable, count) {
    let taken = 0;
    for (const item of iterable) {
        if (taken >= count) break;
        yield item;
        taken++;
    }
}

// Chain operations without creating intermediate arrays
const numbers = function* () {
    for (let i = 1; i <= 1000000; i++) {
        yield i;
    }
};

const result = take(
    lazyFilter(
        lazyMap(numbers(), x => x * x),
        x => x % 2 === 0
    ),
    5
);

console.log([...result]); // First 5 even squares: [4, 16, 36, 64, 100]
```

**Generator Delegation:**

```javascript
function* generator1() {
    yield 1;
    yield 2;
}

function* generator2() {
    yield 3;
    yield 4;
}

function* combinedGenerator() {
    yield* generator1(); // Delegate to generator1
    yield* generator2(); // Delegate to generator2
    yield 5;
}

const combined = combinedGenerator();
for (const value of combined) {
    console.log(value); // 1, 2, 3, 4, 5
}
```

---

## Event Handling

### Q16: Explain event delegation and its benefits.
**Difficulty: Medium**

**Answer:**
Event delegation is a technique where you attach a single event listener to a parent element to handle events for multiple child elements, taking advantage of event bubbling.

**Basic Event Delegation:**

```javascript
// Without delegation (inefficient)
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        console.log('Button clicked:', e.target.textContent);
    });
});

// With delegation (efficient)
const container = document.getElementById('button-container');
container.addEventListener('click', function(e) {
    if (e.target.classList.contains('button')) {
        console.log('Button clicked:', e.target.textContent);
    }
});
```

**Advanced Event Delegation:**

```javascript
// Generic delegation function
function delegate(parent, selector, event, handler) {
    parent.addEventListener(event, function(e) {
        const target = e.target.closest(selector);
        if (target && parent.contains(target)) {
            handler.call(target, e);
        }
    });
}

// Usage
const todoList = document.getElementById('todo-list');

// Handle delete button clicks
delegate(todoList, '.delete-btn', 'click', function(e) {
    e.preventDefault();
    this.closest('.todo-item').remove();
});

// Handle edit button clicks
delegate(todoList, '.edit-btn', 'click', function(e) {
    e.preventDefault();
    const todoItem = this.closest('.todo-item');
    const textElement = todoItem.querySelector('.todo-text');
    const currentText = textElement.textContent;
    
    const input = document.createElement('input');
    input.value = currentText;
    input.className = 'edit-input';
    
    textElement.replaceWith(input);
    input.focus();
});

// Handle checkbox changes
delegate(todoList, '.todo-checkbox', 'change', function(e) {
    const todoItem = this.closest('.todo-item');
    todoItem.classList.toggle('completed', this.checked);
});
```

**Benefits of Event Delegation:**

1. **Memory Efficiency**: Only one event listener instead of many
2. **Dynamic Content**: Works with elements added after page load
3. **Performance**: Fewer event listeners to manage
4. **Cleaner Code**: Centralized event handling logic

**Real-world Example - Dynamic Table:**

```javascript
class DataTable {
    constructor(container) {
        this.container = container;
        this.data = [];
        this.setupEventDelegation();
    }
    
    setupEventDelegation() {
        // Single event listener handles all table interactions
        this.container.addEventListener('click', (e) => {
            const target = e.target;
            const row = target.closest('tr');
            
            if (!row) return;
            
            const rowIndex = parseInt(row.dataset.index);
            
            if (target.classList.contains('edit-btn')) {
                this.editRow(rowIndex);
            } else if (target.classList.contains('delete-btn')) {
                this.deleteRow(rowIndex);
            } else if (target.classList.contains('save-btn')) {
                this.saveRow(rowIndex);
            } else if (target.classList.contains('cancel-btn')) {
                this.cancelEdit(rowIndex);
            }
        });
        
        // Handle input changes in edit mode
        this.container.addEventListener('input', (e) => {
            if (e.target.classList.contains('edit-input')) {
                const row = e.target.closest('tr');
                const field = e.target.dataset.field;
                const rowIndex = parseInt(row.dataset.index);
                
                // Update temporary data
                this.updateTempData(rowIndex, field, e.target.value);
            }
        });
    }
    
    addRow(data) {
        this.data.push(data);
        this.render();
    }
    
    deleteRow(index) {
        if (confirm('Are you sure you want to delete this row?')) {
            this.data.splice(index, 1);
            this.render();
        }
    }
    
    editRow(index) {
        const row = this.container.querySelector(`tr[data-index="${index}"]`);
        row.classList.add('editing');
        
        // Replace text with inputs
        const cells = row.querySelectorAll('td:not(.actions)');
        cells.forEach(cell => {
            const field = cell.dataset.field;
            const value = cell.textContent;
            cell.innerHTML = `<input type="text" class="edit-input" data-field="${field}" value="${value}">`;
        });
        
        // Update action buttons
        const actionsCell = row.querySelector('.actions');
        actionsCell.innerHTML = `
            <button class="save-btn">Save</button>
            <button class="cancel-btn">Cancel</button>
        `;
    }
    
    render() {
        const html = this.data.map((item, index) => `
            <tr data-index="${index}">
                <td data-field="name">${item.name}</td>
                <td data-field="email">${item.email}</td>
                <td data-field="role">${item.role}</td>
                <td class="actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
        
        this.container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>${html}</tbody>
            </table>
        `;
    }
}

// Usage
const table = new DataTable(document.getElementById('data-table'));
table.addRow({ name: 'John Doe', email: 'john@example.com', role: 'Developer' });
table.addRow({ name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' });
```

---

### Q17: Explain the JavaScript Event Loop in detail.
**Difficulty: Hard**

**Answer:**
The Event Loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It manages the execution of code, collection of events, and execution of queued sub-tasks.

**Event Loop Components:**

1. **Call Stack**: Where function calls are stored
2. **Web APIs**: Browser-provided APIs (setTimeout, DOM events, HTTP requests)
3. **Callback Queue (Task Queue)**: Where callbacks wait to be executed
4. **Microtask Queue**: Higher priority queue for Promises, queueMicrotask
5. **Event Loop**: Monitors and manages the execution

**Visual Representation:**

```javascript
// Call Stack Example
function first() {
    console.log('First');
    second();
    console.log('First End');
}

function second() {
    console.log('Second');
    third();
    console.log('Second End');
}

function third() {
    console.log('Third');
}

first();

// Call Stack execution:
// 1. first() pushed to stack
// 2. console.log('First') executed
// 3. second() pushed to stack
// 4. console.log('Second') executed
// 5. third() pushed to stack
// 6. console.log('Third') executed
// 7. third() popped from stack
// 8. console.log('Second End') executed
// 9. second() popped from stack
// 10. console.log('First End') executed
// 11. first() popped from stack

// Output:
// First
// Second
// Third
// Second End
// First End
```

**Asynchronous Operations:**

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
}, 0);

setTimeout(() => {
    console.log('Timeout 2');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise 1');
});

Promise.resolve().then(() => {
    console.log('Promise 2');
});

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Timeout 2

// Explanation:
// 1. 'Start' - synchronous, executed immediately
// 2. setTimeout callbacks go to Web API, then to Callback Queue
// 3. Promise.then callbacks go to Microtask Queue
// 4. 'End' - synchronous, executed immediately
// 5. Call stack is empty, Event Loop checks Microtask Queue first
// 6. Promise callbacks executed (higher priority)
// 7. Then Callback Queue callbacks executed
```

**Complex Event Loop Example:**

```javascript
function complexEventLoopExample() {
    console.log('1: Start');
    
    // Immediate execution
    setTimeout(() => console.log('2: setTimeout 0ms'), 0);
    
    // Microtask
    Promise.resolve().then(() => {
        console.log('3: Promise 1');
        
        // Nested microtask
        Promise.resolve().then(() => {
            console.log('4: Nested Promise');
        });
        
        // Another setTimeout from within Promise
        setTimeout(() => console.log('5: setTimeout from Promise'), 0);
    });
    
    // Another microtask
    Promise.resolve().then(() => {
        console.log('6: Promise 2');
    });
    
    // queueMicrotask
    queueMicrotask(() => {
        console.log('7: queueMicrotask');
    });
    
    // Immediate execution
    console.log('8: End');
}

complexEventLoopExample();

// Output:
// 1: Start
// 8: End
// 3: Promise 1
// 6: Promise 2
// 7: queueMicrotask
// 4: Nested Promise
// 2: setTimeout 0ms
// 5: setTimeout from Promise
```

**Event Loop Phases (Node.js):**

```javascript
// Node.js has additional phases
const fs = require('fs');

console.log('Start');

// Timer phase
setTimeout(() => console.log('Timer'), 0);
setImmediate(() => console.log('Immediate'));

// I/O phase
fs.readFile(__filename, () => {
    console.log('File read');
    
    setTimeout(() => console.log('Timer in I/O'), 0);
    setImmediate(() => console.log('Immediate in I/O'));
});

// Microtasks
Promise.resolve().then(() => console.log('Promise'));
process.nextTick(() => console.log('nextTick'));

console.log('End');

// Typical output (order may vary for Timer vs Immediate):
// Start
// End
// nextTick
// Promise
// Timer
// Immediate
// File read
// Immediate in I/O
// Timer in I/O
```

**Practical Implications:**

```javascript
// 1. Blocking the Event Loop
function blockingOperation() {
    console.log('Start blocking operation');
    
    // This blocks the event loop
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // Busy wait for 3 seconds
    }
    
    console.log('Blocking operation complete');
}

// This will prevent other operations from executing
setTimeout(() => console.log('This will be delayed'), 100);
blockingOperation();

// 2. Non-blocking alternative
function nonBlockingOperation(duration, callback) {
    const start = Date.now();
    
    function check() {
        if (Date.now() - start >= duration) {
            callback();
        } else {
            setTimeout(check, 0); // Yield control back to event loop
        }
    }
    
    check();
}

// This allows other operations to execute
setTimeout(() => console.log('This will execute on time'), 100);
nonBlockingOperation(3000, () => console.log('Non-blocking operation complete'));

// 3. Breaking up heavy computations
function processLargeArray(array, chunkSize = 1000) {
    return new Promise((resolve) => {
        const result = [];
        let index = 0;
        
        function processChunk() {
            const endIndex = Math.min(index + chunkSize, array.length);
            
            // Process chunk
            for (let i = index; i < endIndex; i++) {
                result.push(array[i] * 2); // Some processing
            }
            
            index = endIndex;
            
            if (index < array.length) {
                // Yield control and continue processing
                setTimeout(processChunk, 0);
            } else {
                resolve(result);
            }
        }
        
        processChunk();
    });
}

// Usage
const largeArray = Array.from({ length: 1000000 }, (_, i) => i);
processLargeArray(largeArray).then(result => {
    console.log('Processing complete:', result.length);
});

// Other operations can run while processing
setTimeout(() => console.log('Other operation'), 50);
```

**Event Loop Debugging:**

```javascript
// Measuring event loop lag
function measureEventLoopLag() {
    const start = process.hrtime.bigint();
    
    setImmediate(() => {
        const lag = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
        console.log(`Event loop lag: ${lag.toFixed(2)}ms`);
        
        // Continue monitoring
        setTimeout(measureEventLoopLag, 1000);
    });
}

// Start monitoring
measureEventLoopLag();

// Simulate some load
setInterval(() => {
    const start = Date.now();
    while (Date.now() - start < 10) {
        // Simulate 10ms of blocking work
    }
}, 100);
```

---

### Q18: What are JavaScript Modules (ES6 Modules) and how do they work?
**Difficulty: Medium**

**Answer:**
ES6 Modules provide a standardized way to organize and share code between files. They use `import` and `export` statements and are statically analyzable.

**Basic Module Syntax:**

```javascript
// math.js - Named exports
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export const PI = 3.14159;

// Alternative syntax
function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

export { multiply, divide };

// Default export
export default function calculator(operation, a, b) {
    switch (operation) {
        case 'add': return add(a, b);
        case 'subtract': return subtract(a, b);
        case 'multiply': return multiply(a, b);
        case 'divide': return divide(a, b);
        default: throw new Error('Unknown operation');
    }
}
```

---

## Advanced JavaScript Patterns and Modern Features

### Q50: What are JavaScript Generators and how do they work? Provide advanced examples.
**Difficulty: Hard**

**Answer:**
Generators are special functions that can be paused and resumed, allowing you to create iterators with custom behavior. They're defined using `function*` syntax and use the `yield` keyword.

**Basic Generator:**

```javascript
// Basic generator function
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
    return 'done';
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 'done', done: true }

// Using for...of loop
for (const value of numberGenerator()) {
    console.log(value); // 1, 2, 3 (return value is ignored)
}
```

**Advanced Generator Patterns:**

```javascript
// 1. Infinite sequence generator
function* fibonacciGenerator() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacciGenerator();
const first10Fib = [];
for (let i = 0; i < 10; i++) {
    first10Fib.push(fib.next().value);
}
console.log(first10Fib); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// 2. Generator with parameters and two-way communication
function* dataProcessor() {
    let data = yield 'Ready to receive data';
    while (data !== 'stop') {
        const processed = data.toUpperCase();
        data = yield `Processed: ${processed}`;
    }
    return 'Processing stopped';
}

const processor = dataProcessor();
console.log(processor.next()); // { value: 'Ready to receive data', done: false }
console.log(processor.next('hello')); // { value: 'Processed: HELLO', done: false }
console.log(processor.next('world')); // { value: 'Processed: WORLD', done: false }
console.log(processor.next('stop')); // { value: 'Processing stopped', done: true }

// 3. Async generator for handling streams
async function* asyncDataGenerator() {
    const urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2',
        'https://api.example.com/data3'
    ];
    
    for (const url of urls) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            yield data;
        } catch (error) {
            yield { error: error.message };
        }
    }
}

// Usage with for await...of
async function processAsyncData() {
    for await (const data of asyncDataGenerator()) {
        console.log('Received:', data);
    }
}

// 4. Generator for tree traversal
class TreeNode {
    constructor(value, children = []) {
        this.value = value;
        this.children = children;
    }
    
    *depthFirstTraversal() {
        yield this.value;
        for (const child of this.children) {
            yield* child.depthFirstTraversal();
        }
    }
    
    *breadthFirstTraversal() {
        const queue = [this];
        while (queue.length > 0) {
            const node = queue.shift();
            yield node.value;
            queue.push(...node.children);
        }
    }
}

const tree = new TreeNode('root', [
    new TreeNode('child1', [
        new TreeNode('grandchild1'),
        new TreeNode('grandchild2')
    ]),
    new TreeNode('child2')
]);

console.log('DFS:', [...tree.depthFirstTraversal()]);
// ['root', 'child1', 'grandchild1', 'grandchild2', 'child2']

console.log('BFS:', [...tree.breadthFirstTraversal()]);
// ['root', 'child1', 'child2', 'grandchild1', 'grandchild2']
```

---

### Q51: Explain Proxy and Reflect in JavaScript with practical examples.
**Difficulty: Hard**

**Answer:**
Proxy allows you to intercept and customize operations performed on objects (property lookup, assignment, enumeration, function invocation, etc.). Reflect provides methods for interceptable JavaScript operations.

**Basic Proxy Usage:**

```javascript
// Basic proxy with get and set traps
const target = {
    name: 'John',
    age: 30
};

const proxy = new Proxy(target, {
    get(target, property, receiver) {
        console.log(`Getting property: ${property}`);
        return Reflect.get(target, property, receiver);
    },
    
    set(target, property, value, receiver) {
        console.log(`Setting property: ${property} = ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
});

console.log(proxy.name); // Getting property: name -> 'John'
proxy.age = 31; // Setting property: age = 31
```

**Advanced Proxy Patterns:**

```javascript
// 1. Validation proxy
function createValidatedObject(schema) {
    return new Proxy({}, {
        set(target, property, value, receiver) {
            const validator = schema[property];
            if (validator && !validator(value)) {
                throw new Error(`Invalid value for ${property}: ${value}`);
            }
            return Reflect.set(target, property, value, receiver);
        },
        
        get(target, property, receiver) {
            if (!(property in target) && property in schema) {
                throw new Error(`Property ${property} is required but not set`);
            }
            return Reflect.get(target, property, receiver);
        }
    });
}

const userSchema = {
    name: value => typeof value === 'string' && value.length > 0,
    age: value => typeof value === 'number' && value >= 0 && value <= 150,
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
};

const user = createValidatedObject(userSchema);
user.name = 'John Doe'; // OK
user.age = 25; // OK
user.email = 'john@example.com'; // OK
// user.age = -5; // Error: Invalid value for age: -5

// 2. Observable object with change tracking
function createObservable(target, onChange) {
    return new Proxy(target, {
        set(target, property, value, receiver) {
            const oldValue = target[property];
            const result = Reflect.set(target, property, value, receiver);
            if (oldValue !== value) {
                onChange(property, oldValue, value);
            }
            return result;
        },
        
        deleteProperty(target, property) {
            const oldValue = target[property];
            const result = Reflect.deleteProperty(target, property);
            if (result) {
                onChange(property, oldValue, undefined);
            }
            return result;
        }
    });
}

const data = createObservable(
    { count: 0 },
    (property, oldValue, newValue) => {
        console.log(`${property} changed from ${oldValue} to ${newValue}`);
    }
);

data.count = 1; // count changed from 0 to 1
data.name = 'test'; // name changed from undefined to test
delete data.name; // name changed from test to undefined

// 3. Virtual properties and computed values
function createComputedProxy(target, computedProps) {
    return new Proxy(target, {
        get(target, property, receiver) {
            if (property in computedProps) {
                return computedProps[property].call(receiver);
            }
            return Reflect.get(target, property, receiver);
        },
        
        has(target, property) {
            return property in computedProps || Reflect.has(target, property);
        },
        
        ownKeys(target) {
            return [...Reflect.ownKeys(target), ...Object.keys(computedProps)];
        }
    });
}

const person = createComputedProxy(
    { firstName: 'John', lastName: 'Doe', birthYear: 1990 },
    {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        age() {
            return new Date().getFullYear() - this.birthYear;
        }
    }
);

console.log(person.fullName); // 'John Doe'
console.log(person.age); // Current age based on birth year
console.log('fullName' in person); // true
console.log(Object.keys(person)); // ['firstName', 'lastName', 'birthYear', 'fullName', 'age']

// 4. Method interception and logging
function createLoggingProxy(target, className = 'Object') {
    return new Proxy(target, {
        get(target, property, receiver) {
            const value = Reflect.get(target, property, receiver);
            
            if (typeof value === 'function') {
                return function(...args) {
                    console.log(`[${className}] Calling ${property} with args:`, args);
                    const startTime = performance.now();
                    
                    try {
                        const result = value.apply(this, args);
                        const endTime = performance.now();
                        console.log(`[${className}] ${property} completed in ${endTime - startTime}ms`);
                        return result;
                    } catch (error) {
                        console.error(`[${className}] ${property} threw error:`, error);
                        throw error;
                    }
                };
            }
            
            return value;
        }
    });
}

class Calculator {
    add(a, b) {
        return a + b;
    }
    
    divide(a, b) {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
    }
}

const loggedCalculator = createLoggingProxy(new Calculator(), 'Calculator');
console.log(loggedCalculator.add(5, 3)); // Logs method call and execution time
// loggedCalculator.divide(10, 0); // Logs error
```

---

### Q52: What are WeakMap and WeakSet? When should you use them?
**Difficulty: Medium-Hard**

**Answer:**
WeakMap and WeakSet are collections that hold "weak" references to their keys/values, meaning they don't prevent garbage collection of their contents when there are no other references.

**WeakMap Characteristics:**
- Keys must be objects (not primitives)
- Keys are held weakly (garbage collected when no other references exist)
- Not enumerable (no iteration methods)
- No size property

**WeakSet Characteristics:**
- Values must be objects (not primitives)
- Values are held weakly
- Not enumerable
- No size property

**Practical Examples:**

```javascript
// 1. Private data storage using WeakMap
const privateData = new WeakMap();

class User {
    constructor(name, email) {
        // Store private data
        privateData.set(this, {
            email: email,
            createdAt: new Date(),
            loginAttempts: 0
        });
        
        this.name = name;
    }
    
    getEmail() {
        return privateData.get(this).email;
    }
    
    incrementLoginAttempts() {
        const data = privateData.get(this);
        data.loginAttempts++;
    }
    
    getLoginAttempts() {
        return privateData.get(this).loginAttempts;
    }
}

const user = new User('John', 'john@example.com');
console.log(user.name); // 'John' (public)
console.log(user.getEmail()); // 'john@example.com' (private)
user.incrementLoginAttempts();
console.log(user.getLoginAttempts()); // 1

// Private data is automatically cleaned up when user is garbage collected

// 2. Metadata and annotations
const elementMetadata = new WeakMap();

function addMetadata(element, metadata) {
    elementMetadata.set(element, metadata);
}

function getMetadata(element) {
    return elementMetadata.get(element);
}

// Usage with DOM elements
const button = document.createElement('button');
addMetadata(button, {
    component: 'SubmitButton',
    version: '1.2.0',
    analytics: { trackClicks: true }
});

console.log(getMetadata(button));
// When button is removed from DOM and no other references exist,
// metadata is automatically cleaned up

// 3. Caching with automatic cleanup
class APICache {
    constructor() {
        this.cache = new WeakMap();
    }
    
    async getData(requestObject) {
        if (this.cache.has(requestObject)) {
            console.log('Cache hit');
            return this.cache.get(requestObject);
        }
        
        console.log('Cache miss - fetching data');
        const data = await this.fetchData(requestObject);
        this.cache.set(requestObject, data);
        return data;
    }
    
    async fetchData(requestObject) {
        // Simulate API call
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ data: `Data for ${requestObject.id}` });
            }, 100);
        });
    }
}

const cache = new APICache();
const request1 = { id: 'user123', type: 'user' };
const request2 = { id: 'user456', type: 'user' };

// First call - cache miss
cache.getData(request1).then(console.log);
// Second call with same object - cache hit
cache.getData(request1).then(console.log);
// Different object - cache miss
cache.getData(request2).then(console.log);

// 4. WeakSet for tracking objects
const processedElements = new WeakSet();

function processElement(element) {
    if (processedElements.has(element)) {
        console.log('Element already processed');
        return;
    }
    
    // Process the element
    console.log('Processing element:', element.id);
    element.classList.add('processed');
    
    // Mark as processed
    processedElements.add(element);
}

// Usage
const div1 = document.createElement('div');
div1.id = 'div1';
const div2 = document.createElement('div');
div2.id = 'div2';

processElement(div1); // Processing element: div1
processElement(div1); // Element already processed
processElement(div2); // Processing element: div2

// 5. Observer pattern with automatic cleanup
class EventEmitter {
    constructor() {
        this.listeners = new WeakMap();
    }
    
    addListener(target, event, callback) {
        if (!this.listeners.has(target)) {
            this.listeners.set(target, new Map());
        }
        
        const targetListeners = this.listeners.get(target);
        if (!targetListeners.has(event)) {
            targetListeners.set(event, new Set());
        }
        
        targetListeners.get(event).add(callback);
    }
    
    emit(target, event, data) {
        const targetListeners = this.listeners.get(target);
        if (targetListeners && targetListeners.has(event)) {
            targetListeners.get(event).forEach(callback => {
                callback(data);
            });
        }
    }
    
    removeListener(target, event, callback) {
        const targetListeners = this.listeners.get(target);
        if (targetListeners && targetListeners.has(event)) {
            targetListeners.get(event).delete(callback);
        }
    }
}

const emitter = new EventEmitter();
const component = { name: 'MyComponent' };

emitter.addListener(component, 'update', data => {
    console.log('Component updated:', data);
});

emitter.emit(component, 'update', { value: 42 });
// When component is garbage collected, listeners are automatically cleaned up
```

**When to use WeakMap/WeakSet:**
- **WeakMap**: Private data storage, metadata, caching, object annotations
- **WeakSet**: Tracking processed objects, marking objects, avoiding memory leaks
- **Both**: When you need automatic cleanup and don't want to prevent garbage collection

---

### Q53: Explain Symbol and its use cases in JavaScript.
**Difficulty: Medium-Hard**

**Answer:**
Symbol is a primitive data type introduced in ES6 that represents a unique identifier. Every Symbol value is unique, even if they have the same description.

**Basic Symbol Usage:**

```javascript
// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description');

console.log(sym1 === sym2); // false
console.log(sym2 === sym3); // false (even with same description)
console.log(typeof sym1); // 'symbol'

// Symbol description
console.log(sym2.toString()); // 'Symbol(description)'
console.log(sym2.description); // 'description'
```

**Advanced Symbol Patterns:**

```javascript
// 1. Private object properties
const _id = Symbol('id');
const _secret = Symbol('secret');

class User {
    constructor(name, id, secret) {
        this.name = name;
        this[_id] = id;
        this[_secret] = secret;
    }
    
    getId() {
        return this[_id];
    }
    
    authenticate(secret) {
        return this[_secret] === secret;
    }
}

const user = new User('John', 123, 'password123');
console.log(user.name); // 'John'
console.log(user.getId()); // 123
console.log(user[_id]); // undefined (symbol not accessible without reference)

// Symbol properties are not enumerable
console.log(Object.keys(user)); // ['name']
console.log(Object.getOwnPropertyNames(user)); // ['name']
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id), Symbol(secret)]

// 2. Global Symbol Registry
const globalSym1 = Symbol.for('app.config');
const globalSym2 = Symbol.for('app.config');

console.log(globalSym1 === globalSym2); // true
console.log(Symbol.keyFor(globalSym1)); // 'app.config'

// Cross-module symbol sharing
// module1.js
const CONFIG_KEY = Symbol.for('app.config');
export { CONFIG_KEY };

// module2.js
const CONFIG_KEY = Symbol.for('app.config'); // Same symbol

// 3. Well-known symbols for custom behavior
class Collection {
    constructor(items = []) {
        this.items = items;
    }
    
    // Custom iterator
    *[Symbol.iterator]() {
        for (const item of this.items) {
            yield item;
        }
    }
    
    // Custom string conversion
    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return this.items.length;
        }
        if (hint === 'string') {
            return this.items.join(', ');
        }
        return this.items.length;
    }
    
    // Custom toString
    [Symbol.toStringTag]() {
        return 'Collection';
    }
    
    // Custom species for subclassing
    static get [Symbol.species]() {
        return this;
    }
}

const collection = new Collection(['a', 'b', 'c']);

// Using custom iterator
for (const item of collection) {
    console.log(item); // 'a', 'b', 'c'
}

// Using custom primitive conversion
console.log(+collection); // 3 (number hint)
console.log(`${collection}`); // 'a, b, c' (string hint)
console.log(collection + 0); // 3 (default hint)

// 4. Metadata and configuration system
class MetadataManager {
    constructor() {
        this.metadata = new WeakMap();
    }
    
    define(target, key, value) {
        if (!this.metadata.has(target)) {
            this.metadata.set(target, new Map());
        }
        this.metadata.get(target).set(key, value);
    }
    
    get(target, key) {
        const targetMetadata = this.metadata.get(target);
        return targetMetadata ? targetMetadata.get(key) : undefined;
    }
    
    has(target, key) {
        const targetMetadata = this.metadata.get(target);
        return targetMetadata ? targetMetadata.has(key) : false;
    }
}

// Metadata keys as symbols
const VALIDATION_RULES = Symbol('validationRules');
const SERIALIZATION_CONFIG = Symbol('serializationConfig');
const CACHE_CONFIG = Symbol('cacheConfig');

const metadata = new MetadataManager();

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Define metadata
metadata.define(Product, VALIDATION_RULES, {
    name: { required: true, type: 'string' },
    price: { required: true, type: 'number', min: 0 }
});

metadata.define(Product, SERIALIZATION_CONFIG, {
    exclude: ['_internal'],
    transform: { price: value => `$${value.toFixed(2)}` }
});

metadata.define(Product, CACHE_CONFIG, {
    ttl: 3600,
    key: 'product:{{id}}'
});

// Use metadata
const validationRules = metadata.get(Product, VALIDATION_RULES);
const serializationConfig = metadata.get(Product, SERIALIZATION_CONFIG);

console.log(validationRules);
console.log(serializationConfig);

// 5. Plugin system with symbol-based hooks
class PluginSystem {
    constructor() {
        this.plugins = [];
        this.hooks = new Map();
    }
    
    registerHook(hookSymbol, description) {
        this.hooks.set(hookSymbol, {
            description,
            handlers: []
        });
    }
    
    addPlugin(plugin) {
        this.plugins.push(plugin);
        
        // Register plugin hooks
        for (const [hookSymbol, hook] of this.hooks) {
            if (typeof plugin[hookSymbol] === 'function') {
                hook.handlers.push(plugin[hookSymbol].bind(plugin));
            }
        }
    }
    
    async executeHook(hookSymbol, ...args) {
        const hook = this.hooks.get(hookSymbol);
        if (!hook) return;
        
        const results = [];
        for (const handler of hook.handlers) {
            try {
                const result = await handler(...args);
                results.push(result);
            } catch (error) {
                console.error(`Hook ${hookSymbol.description} failed:`, error);
            }
        }
        return results;
    }
}

// Define hook symbols
const BEFORE_SAVE = Symbol('beforeSave');
const AFTER_SAVE = Symbol('afterSave');
const VALIDATE = Symbol('validate');

const pluginSystem = new PluginSystem();

// Register hooks
pluginSystem.registerHook(BEFORE_SAVE, 'Before saving entity');
pluginSystem.registerHook(AFTER_SAVE, 'After saving entity');
pluginSystem.registerHook(VALIDATE, 'Validate entity');

// Create plugins
class AuditPlugin {
    [BEFORE_SAVE](entity) {
        entity.updatedAt = new Date();
        console.log('Audit: Setting updatedAt');
    }
    
    [AFTER_SAVE](entity) {
        console.log(`Audit: Entity ${entity.id} saved`);
    }
}

class ValidationPlugin {
    [VALIDATE](entity) {
        if (!entity.name) {
            throw new Error('Name is required');
        }
        console.log('Validation: Entity is valid');
    }
}

// Register plugins
pluginSystem.addPlugin(new AuditPlugin());
pluginSystem.addPlugin(new ValidationPlugin());

// Use the system
async function saveEntity(entity) {
    await pluginSystem.executeHook(VALIDATE, entity);
    await pluginSystem.executeHook(BEFORE_SAVE, entity);
    
    // Simulate save
    console.log('Saving entity:', entity);
    
    await pluginSystem.executeHook(AFTER_SAVE, entity);
}

const entity = { id: 1, name: 'Test Entity' };
saveEntity(entity);
```

**Symbol Use Cases:**
1. **Private Properties**: Create truly private object properties
2. **Global Registry**: Share symbols across modules using `Symbol.for()`
3. **Well-known Symbols**: Customize object behavior (iterator, toPrimitive, etc.)
4. **Metadata Systems**: Store metadata without property name conflicts
5. **Plugin Systems**: Define extensible hook points
6. **Constants**: Create unique constants that can't be accidentally duplicated

---

## Modern JavaScript Best Practices and Patterns

### Q54: What are the best practices for error handling in modern JavaScript?
**Difficulty: Medium-Hard**

**Answer:**
Modern JavaScript error handling involves multiple strategies and patterns to create robust, maintainable applications.

**1. Structured Error Handling:**

```javascript
// Custom error classes
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, status, url) {
        super(message);
        this.name = 'NetworkError';
        this.status = status;
        this.url = url;
    }
}

class BusinessLogicError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'BusinessLogicError';
        this.code = code;
    }
}

// Error factory
class ErrorFactory {
    static createValidationError(field, value) {
        return new ValidationError(
            `Invalid value '${value}' for field '${field}'`,
            field
        );
    }
    
    static createNetworkError(response) {
        return new NetworkError(
            `Network request failed: ${response.statusText}`,
            response.status,
            response.url
        );
    }
    
    static createBusinessLogicError(code, message) {
        return new BusinessLogicError(message, code);
    }
}
```

**2. Async Error Handling Patterns:**

```javascript
// Result pattern for error handling
class Result {
    constructor(value, error) {
        this.value = value;
        this.error = error;
        this.isSuccess = !error;
        this.isFailure = !!error;
    }
    
    static success(value) {
        return new Result(value, null);
    }
    
    static failure(error) {
        return new Result(null, error);
    }
    
    map(fn) {
        if (this.isFailure) return this;
        try {
            return Result.success(fn(this.value));
        } catch (error) {
            return Result.failure(error);
        }
    }
    
    flatMap(fn) {
        if (this.isFailure) return this;
        try {
            return fn(this.value);
        } catch (error) {
            return Result.failure(error);
        }
    }
    
    catch(fn) {
        if (this.isSuccess) return this;
        try {
            return Result.success(fn(this.error));
        } catch (error) {
            return Result.failure(error);
        }
    }
}

// Safe async operations
async function safeAsync(asyncFn) {
    try {
        const result = await asyncFn();
        return Result.success(result);
    } catch (error) {
        return Result.failure(error);
    }
}

// Usage example
async function fetchUserData(userId) {
    const result = await safeAsync(() => fetch(`/api/users/${userId}`));
    
    return result
        .flatMap(response => {
            if (!response.ok) {
                return Result.failure(ErrorFactory.createNetworkError(response));
            }
            return safeAsync(() => response.json());
        })
        .map(userData => {
            if (!userData.id) {
                throw ErrorFactory.createValidationError('id', userData.id);
            }
            return userData;
        });
}

// Using the result
fetchUserData(123).then(result => {
    if (result.isSuccess) {
        console.log('User data:', result.value);
    } else {
        console.error('Error:', result.error);
    }
});
```

**3. Global Error Handling:**

```javascript
// Global error handler
class GlobalErrorHandler {
    constructor() {
        this.errorReporters = [];
        this.setupGlobalHandlers();
    }
    
    addReporter(reporter) {
        this.errorReporters.push(reporter);
    }
    
    setupGlobalHandlers() {
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', event => {
            this.handleError(event.reason, 'unhandledrejection');
            event.preventDefault(); // Prevent console error
        });
        
        // Global JavaScript errors
        window.addEventListener('error', event => {
            this.handleError(event.error, 'javascript');
        });
        
        // Resource loading errors
        window.addEventListener('error', event => {
            if (event.target !== window) {
                this.handleError(
                    new Error(`Failed to load resource: ${event.target.src || event.target.href}`),
                    'resource'
                );
            }
        }, true);
    }
    
    handleError(error, context) {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Report to all registered reporters
        this.errorReporters.forEach(reporter => {
            try {
                reporter.report(errorInfo);
            } catch (reporterError) {
                console.error('Error reporter failed:', reporterError);
            }
        });
    }
}

// Error reporters
class ConsoleErrorReporter {
    report(errorInfo) {
        console.group(`🚨 Error [${errorInfo.context}]`);
        console.error(errorInfo.message);
        console.error(errorInfo.stack);
        console.log('Context:', errorInfo);
        console.groupEnd();
    }
}

class RemoteErrorReporter {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.queue = [];
        this.isOnline = navigator.onLine;
        
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.flushQueue();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }
    
    report(errorInfo) {
        if (this.isOnline) {
            this.sendError(errorInfo);
        } else {
            this.queue.push(errorInfo);
        }
    }
    
    async sendError(errorInfo) {
        try {
            await fetch(this.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(errorInfo)
            });
        } catch (error) {
            this.queue.push(errorInfo);
        }
    }
    
    flushQueue() {
        while (this.queue.length > 0) {
            const errorInfo = this.queue.shift();
            this.sendError(errorInfo);
        }
    }
}

// Setup global error handling
const errorHandler = new GlobalErrorHandler();
errorHandler.addReporter(new ConsoleErrorReporter());
errorHandler.addReporter(new RemoteErrorReporter('/api/errors'));
```

**4. Retry and Circuit Breaker Patterns:**

```javascript
// Retry with exponential backoff
class RetryManager {
    static async withRetry(fn, options = {}) {
        const {
            maxAttempts = 3,
            baseDelay = 1000,
            maxDelay = 10000,
            backoffFactor = 2,
            retryCondition = () => true
        } = options;
        
        let lastError;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                
                if (attempt === maxAttempts || !retryCondition(error)) {
                    throw error;
                }
                
                const delay = Math.min(
                    baseDelay * Math.pow(backoffFactor, attempt - 1),
                    maxDelay
                );
                
                console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        throw lastError;
    }
}

// Circuit breaker pattern
class CircuitBreaker {
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold || 5;
        this.resetTimeout = options.resetTimeout || 60000;
        this.monitoringPeriod = options.monitoringPeriod || 10000;
        
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.successCount = 0;
    }
    
    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
                this.state = 'HALF_OPEN';
                this.successCount = 0;
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        
        if (this.state === 'HALF_OPEN') {
            this.successCount++;
            if (this.successCount >= 3) {
                this.state = 'CLOSED';
            }
        }
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.failureThreshold) {
            this.state = 'OPEN';
        }
    }
    
    getState() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            lastFailureTime: this.lastFailureTime
        };
    }
}

// Usage example
const apiCircuitBreaker = new CircuitBreaker({
    failureThreshold: 3,
    resetTimeout: 30000
});

async function callExternalAPI() {
    return await apiCircuitBreaker.execute(async () => {
        return await RetryManager.withRetry(
            () => fetch('/api/external-service'),
            {
                maxAttempts: 3,
                retryCondition: error => error.status >= 500
            }
        );
    });
}
```

**Best Practices Summary:**
1. **Use custom error classes** for different error types
2. **Implement Result pattern** for functional error handling
3. **Set up global error handlers** for unhandled errors
4. **Use retry mechanisms** with exponential backoff
5. **Implement circuit breakers** for external service calls
6. **Log errors appropriately** with context information
7. **Handle offline scenarios** gracefully
8. **Validate inputs** early and provide meaningful error messages
9. **Use TypeScript** for better error prevention
10. **Test error scenarios** thoroughly

```javascript
// main.js - Importing
import calculator, { add, subtract, PI } from './math.js';
import { multiply, divide } from './math.js';

// Using imports
console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
console.log(PI); // 3.14159
console.log(calculator('multiply', 4, 5)); // 20

// Import all as namespace
import * as MathUtils from './math.js';
console.log(MathUtils.add(2, 3)); // 5
console.log(MathUtils.default('divide', 10, 2)); // 5

// Renaming imports
import { add as sum, subtract as diff } from './math.js';
console.log(sum(1, 2)); // 3
console.log(diff(5, 2)); // 3
```

**Advanced Module Patterns:**

```javascript
// config.js - Configuration module
const config = {
    apiUrl: process.env.NODE_ENV === 'production' 
        ? 'https://api.production.com' 
        : 'https://api.development.com',
    timeout: 5000,
    retries: 3
};

export default config;
export const { apiUrl, timeout, retries } = config;

// utils.js - Utility functions
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
};

// api.js - API module
import config from './config.js';
import { debounce } from './utils.js';

class ApiClient {
    constructor(baseUrl = config.apiUrl) {
        this.baseUrl = baseUrl;
        this.timeout = config.timeout;
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const controller = new AbortController();
        
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, this.timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Create debounced search function
export const debouncedSearch = debounce(async (query) => {
    const api = new ApiClient();
    return await api.get(`/search?q=${encodeURIComponent(query)}`);
}, 300);

export default ApiClient;
```

**Dynamic Imports:**

```javascript
// Dynamic imports for code splitting
async function loadModule() {
    try {
        // Dynamic import returns a promise
        const module = await import('./heavy-module.js');
        
        // Use default export
        const result = module.default();
        
        // Use named exports
        const { utilityFunction } = module;
        utilityFunction();
        
    } catch (error) {
        console.error('Failed to load module:', error);
    }
}

// Conditional loading
if (someCondition) {
    import('./feature-module.js').then(module => {
        module.initializeFeature();
    });
}

// Loading modules based on user interaction
document.getElementById('load-chart').addEventListener('click', async () => {
    const { Chart } = await import('./chart-library.js');
    new Chart(document.getElementById('chart-container'));
});

// Module factory pattern
const moduleCache = new Map();

async function getModule(moduleName) {
    if (moduleCache.has(moduleName)) {
        return moduleCache.get(moduleName);
    }
    
    const module = await import(`./modules/${moduleName}.js`);
    moduleCache.set(moduleName, module);
    return module;
}
```

**Module Re-exports:**

```javascript
// index.js - Barrel exports
export { add, subtract, multiply, divide } from './math.js';
export { debounce, throttle, deepClone } from './utils.js';
export { default as ApiClient } from './api.js';
export { default as config } from './config.js';

// Re-export with renaming
export { default as MathCalculator } from './math.js';
export { PI as MATH_PI } from './math.js';

// Conditional exports
if (process.env.NODE_ENV === 'development') {
    export { debugUtils } from './debug.js';
}
```

---

### Q19: Explain error handling in JavaScript with try-catch, custom errors, and async error handling.
**Difficulty: Medium**

**Answer:**
JavaScript provides several mechanisms for handling errors: try-catch blocks, custom error types, and specialized handling for asynchronous operations.

**Basic Error Handling:**

```javascript
// Basic try-catch
try {
    const result = riskyOperation();
    console.log('Success:', result);
} catch (error) {
    console.error('Error occurred:', error.message);
} finally {
    console.log('This always executes');
}

// Catching specific error types
try {
    JSON.parse('invalid json');
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error('JSON parsing failed:', error.message);
    } else if (error instanceof ReferenceError) {
        console.error('Reference error:', error.message);
    } else {
        console.error('Unknown error:', error);
    }
}

// Nested try-catch
try {
    try {
        const data = JSON.parse(jsonString);
        processData(data);
    } catch (parseError) {
        console.error('Parse error:', parseError.message);
        throw new Error('Data processing failed due to invalid JSON');
    }
} catch (processingError) {
    console.error('Processing error:', processingError.message);
    // Handle or re-throw
}
```

**Custom Error Classes:**

```javascript
// Custom error classes
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.timestamp = new Date().toISOString();
    }
}

class NetworkError extends Error {
    constructor(message, statusCode, url) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
        this.url = url;
        this.retryable = statusCode >= 500;
    }
}

class BusinessLogicError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = 'BusinessLogicError';
        this.code = code;
        this.details = details;
        this.severity = 'high';
    }
}

// Usage of custom errors
function validateUser(user) {
    if (!user.email) {
        throw new ValidationError('Email is required', 'email');
    }
    
    if (!user.email.includes('@')) {
        throw new ValidationError('Invalid email format', 'email');
    }
    
    if (user.age < 18) {
        throw new BusinessLogicError(
            'User must be 18 or older',
            'AGE_RESTRICTION',
            { minAge: 18, providedAge: user.age }
        );
    }
}

// Error handling with custom errors
try {
    validateUser({ email: 'invalid-email', age: 16 });
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(`Validation failed for ${error.field}: ${error.message}`);
        // Show field-specific error in UI
    } else if (error instanceof BusinessLogicError) {
        console.error(`Business rule violation [${error.code}]: ${error.message}`);
        console.error('Details:', error.details);
        // Handle business logic errors
    } else {
        console.error('Unexpected error:', error);
        // Handle unexpected errors
    }
}
```

**Async Error Handling:**

```javascript
// Promise error handling
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new NetworkError(
                    `Failed to fetch user data`,
                    response.status,
                    response.url
                );
            }
            return response.json();
        })
        .then(data => {
            if (!data.id) {
                throw new ValidationError('Invalid user data: missing ID', 'id');
            }
            return data;
        })
        .catch(error => {
            if (error instanceof NetworkError && error.retryable) {
                console.log('Retrying request...');
                // Implement retry logic
                return retryRequest(() => fetchUserData(userId));
            }
            throw error; // Re-throw if not retryable
        });
}

// Async/await error handling
async function processUserData(userId) {
    try {
        const userData = await fetchUserData(userId);
        const processedData = await processData(userData);
        const savedData = await saveData(processedData);
        
        return savedData;
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error('Network issue:', error.message);
            // Maybe show offline message
            throw new Error('Service temporarily unavailable');
        } else if (error instanceof ValidationError) {
            console.error('Data validation failed:', error.message);
            // Show user-friendly validation message
            throw new Error('Invalid data provided');
        } else {
            console.error('Unexpected error:', error);
            // Log to error reporting service
            logError(error);
            throw new Error('An unexpected error occurred');
        }
    }
}

// Multiple async operations with error handling
async function batchProcessUsers(userIds) {
    const results = [];
    const errors = [];
    
    for (const userId of userIds) {
        try {
            const result = await processUserData(userId);
            results.push({ userId, result, status: 'success' });
        } catch (error) {
            errors.push({ userId, error: error.message, status: 'error' });
        }
    }
    
    return { results, errors };
}

// Promise.allSettled for handling multiple promises
async function fetchMultipleUsers(userIds) {
    const promises = userIds.map(id => fetchUserData(id));
    const results = await Promise.allSettled(promises);
    
    const successful = [];
    const failed = [];
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            successful.push({ userId: userIds[index], data: result.value });
        } else {
            failed.push({ userId: userIds[index], error: result.reason.message });
        }
    });
    
    return { successful, failed };
}
```

**Error Handling Utilities:**

```javascript
// Retry utility with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Circuit breaker pattern
class CircuitBreaker {
    constructor(fn, threshold = 5, timeout = 60000) {
        this.fn = fn;
        this.threshold = threshold;
        this.timeout = timeout;
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    }
    
    async call(...args) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.timeout) {
                this.state = 'HALF_OPEN';
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await this.fn(...args);
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
        }
    }
}

// Usage
const protectedApiCall = new CircuitBreaker(fetchUserData, 3, 30000);

try {
    const userData = await protectedApiCall.call(userId);
    console.log('Data fetched:', userData);
} catch (error) {
    console.error('Protected call failed:', error.message);
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    logError({
        message: event.error.message,
        stack: event.error.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    logError({
        type: 'unhandledrejection',
        reason: event.reason,
        promise: event.promise
    });
    
    // Prevent the default behavior (logging to console)
    event.preventDefault();
});

// Error logging utility
function logError(error) {
    const errorData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: getCurrentUserId(),
        sessionId: getSessionId(),
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
            ...error
        }
    };
    
    // Send to error reporting service
    fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
    }).catch(err => {
        console.error('Failed to log error:', err);
        // Fallback: store in localStorage for later retry
        const errors = JSON.parse(localStorage.getItem('pendingErrors') || '[]');
        errors.push(errorData);
        localStorage.setItem('pendingErrors', JSON.stringify(errors));
    });
}
```

---

### Q20: What is the difference between `call`, `apply`, and `bind` methods?
**Difficulty: Medium**

**Answer:**
These methods are used to control the `this` context and pass arguments to functions. They provide different ways to invoke functions with a specific `this` value.

**Basic Differences:**

```javascript
const person = {
    name: 'John',
    greet: function(greeting, punctuation) {
        return `${greeting}, I'm ${this.name}${punctuation}`;
    }
};

const anotherPerson = { name: 'Jane' };

// call() - invokes immediately with individual arguments
const result1 = person.greet.call(anotherPerson, 'Hello', '!');
console.log(result1); // "Hello, I'm Jane!"

// apply() - invokes immediately with arguments array
const result2 = person.greet.apply(anotherPerson, ['Hi', '.']);
console.log(result2); // "Hi, I'm Jane."

// bind() - returns a new function with bound context
const boundGreet = person.greet.bind(anotherPerson, 'Hey');
const result3 = boundGreet('?');
console.log(result3); // "Hey, I'm Jane?"
```

**Detailed Examples:**

```javascript
// 1. Using call()
function introduce(age, city) {
    return `Hi, I'm ${this.name}, ${age} years old from ${city}`;
}

const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

// Call with different contexts
console.log(introduce.call(person1, 25, 'New York'));
// "Hi, I'm Alice, 25 years old from New York"

console.log(introduce.call(person2, 30, 'London'));
// "Hi, I'm Bob, 30 years old from London"

// 2. Using apply()
const numbers = [1, 2, 3, 4, 5];

// Find max using apply
const max = Math.max.apply(null, numbers);
console.log(max); // 5

// Modern alternative with spread operator
const maxModern = Math.max(...numbers);
console.log(maxModern); // 5

// Array concatenation with apply
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]

// 3. Using bind()
const calculator = {
    value: 0,
    add: function(num) {
        this.value += num;
        return this;
    },
    multiply: function(num) {
        this.value *= num;
        return this;
    },
    getValue: function() {
        return this.value;
    }
};

// Create bound methods
const boundAdd = calculator.add.bind(calculator);
const boundMultiply = calculator.multiply.bind(calculator);

// Use bound methods
boundAdd(5);
boundMultiply(3);
console.log(calculator.getValue()); // 15

// Partial application with bind
function multiply(a, b, c) {
    return a * b * c;
}

const multiplyByTwo = multiply.bind(null, 2);
const multiplyByTwoAndThree = multiply.bind(null, 2, 3);

console.log(multiplyByTwo(5, 10)); // 100 (2 * 5 * 10)
console.log(multiplyByTwoAndThree(4)); // 24 (2 * 3 * 4)
```

**Practical Use Cases:**

```javascript
// 1. Event handling with proper context
class Button {
    constructor(element) {
        this.element = element;
        this.clickCount = 0;
        
        // Bind method to maintain context
        this.handleClick = this.handleClick.bind(this);
        this.element.addEventListener('click', this.handleClick);
    }
    
    handleClick(event) {
        this.clickCount++;
        console.log(`Button clicked ${this.clickCount} times`);
    }
    
    destroy() {
        this.element.removeEventListener('click', this.handleClick);
    }
}

// 2. Method borrowing
const arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};

// Borrow array methods
const realArray = Array.prototype.slice.call(arrayLike);
console.log(realArray); // ['a', 'b', 'c']

// Convert NodeList to Array
const divs = document.querySelectorAll('div');
const divArray = Array.prototype.slice.call(divs);

// Modern alternative
const divArrayModern = Array.from(divs);
const divArraySpread = [...divs];

// 3. Function composition and currying
function compose(f, g) {
    return function(x) {
        return f.call(this, g.call(this, x));
    };
}

function addOne(x) {
    return x + 1;
}

function double(x) {
    return x * 2;
}

const addOneThenDouble = compose(double, addOne);
console.log(addOneThenDouble(3)); // 8 ((3 + 1) * 2)

// 4. Creating utility functions
function createLogger(prefix) {
    return console.log.bind(console, `[${prefix}]`);
}

const errorLogger = createLogger('ERROR');
const infoLogger = createLogger('INFO');

errorLogger('Something went wrong'); // [ERROR] Something went wrong
infoLogger('Process completed'); // [INFO] Process completed

// 5. Implementing inheritance patterns
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

function Dog(name, breed) {
    // Call parent constructor
    Animal.call(this, name);
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    // Call parent method
    const parentResult = Animal.prototype.speak.call(this);
    return `${parentResult} - Woof!`;
};

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak()); // "Buddy makes a sound - Woof!"

// 6. Debouncing with proper context
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

class SearchBox {
    constructor(input) {
        this.input = input;
        this.results = [];
        
        // Create debounced search method
        this.debouncedSearch = debounce(this.search, 300);
        this.input.addEventListener('input', this.debouncedSearch.bind(this));
    }
    
    search(event) {
        const query = event.target.value;
        console.log(`Searching for: ${query}`);
        // Perform search logic
    }
}
```

**Performance Considerations:**

```javascript
// bind() creates a new function each time
class Component {
    constructor() {
        this.state = { count: 0 };
    }
    
    // Bad: creates new function on each render
    render() {
        return {
            onClick: this.handleClick.bind(this) // New function each time
        };
    }
    
    // Good: bind once in constructor
    constructor() {
        this.state = { count: 0 };
        this.handleClick = this.handleClick.bind(this);
    }
    
    // Alternative: arrow function (lexically bound)
    handleClick = (event) => {
        this.setState({ count: this.state.count + 1 });
    }
    
    handleClick(event) {
        this.setState({ count: this.state.count + 1 });
    }
}

// Comparing performance
function testFunction() {
    return 'test';
}

const obj = { name: 'test' };

// call/apply are generally faster for one-time use
console.time('call');
for (let i = 0; i < 1000000; i++) {
    testFunction.call(obj);
}
console.timeEnd('call');

// bind is better for reuse
console.time('bind');
const boundFunction = testFunction.bind(obj);
for (let i = 0; i < 1000000; i++) {
    boundFunction();
}
console.timeEnd('bind');
```

---

## Advanced JavaScript Concepts

### Q1: Explain JavaScript Design Patterns with practical examples.
**Difficulty: Hard**

**Answer:**
Design patterns are reusable solutions to common programming problems.

**1. Module Pattern:**
```javascript
const UserModule = (function() {
  // Private variables and functions
  let users = [];
  let currentId = 0;
  
  function validateUser(user) {
    return user.name && user.email;
  }
  
  // Public API
  return {
    addUser(user) {
      if (validateUser(user)) {
        user.id = ++currentId;
        users.push(user);
        return user;
      }
      throw new Error('Invalid user data');
    },
    
    getUser(id) {
      return users.find(user => user.id === id);
    },
    
    getAllUsers() {
      return [...users]; // Return copy to prevent mutation
    },
    
    removeUser(id) {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        return users.splice(index, 1)[0];
      }
      return null;
    }
  };
})();

// Usage
const user = UserModule.addUser({ name: 'John', email: 'john@example.com' });
console.log(UserModule.getUser(user.id));
```

**2. Observer Pattern:**
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  once(event, callback) {
    const unsubscribe = this.on(event, (data) => {
      callback(data);
      unsubscribe();
    });
    return unsubscribe;
  }
}

// Usage
const emitter = new EventEmitter();

const unsubscribe = emitter.on('user-login', (user) => {
  console.log(`User ${user.name} logged in`);
});

emitter.emit('user-login', { name: 'John', id: 1 });
unsubscribe(); // Stop listening
```

**3. Singleton Pattern:**
```javascript
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connection = null;
    this.isConnected = false;
    DatabaseConnection.instance = this;
  }
  
  connect() {
    if (!this.isConnected) {
      this.connection = 'Connected to database';
      this.isConnected = true;
      console.log('Database connected');
    }
    return this.connection;
  }
  
  disconnect() {
    if (this.isConnected) {
      this.connection = null;
      this.isConnected = false;
      console.log('Database disconnected');
    }
  }
  
  query(sql) {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    return `Executing: ${sql}`;
  }
}

// Usage
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true - same instance
```

**4. Factory Pattern:**
```javascript
class User {
  constructor(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
  
  getPermissions() {
    return this.role.permissions;
  }
}

class AdminRole {
  constructor() {
    this.permissions = ['read', 'write', 'delete', 'admin'];
  }
}

class UserRole {
  constructor() {
    this.permissions = ['read'];
  }
}

class ModeratorRole {
  constructor() {
    this.permissions = ['read', 'write'];
  }
}

class UserFactory {
  static createUser(name, email, roleType) {
    let role;
    
    switch (roleType) {
      case 'admin':
        role = new AdminRole();
        break;
      case 'moderator':
        role = new ModeratorRole();
        break;
      case 'user':
      default:
        role = new UserRole();
        break;
    }
    
    return new User(name, email, role);
  }
}

// Usage
const admin = UserFactory.createUser('John', 'john@example.com', 'admin');
const user = UserFactory.createUser('Jane', 'jane@example.com', 'user');
console.log(admin.getPermissions()); // ['read', 'write', 'delete', 'admin']
```

---

### Q2: Explain JavaScript Prototypes and Prototype Chain in detail.
**Difficulty: Medium**

**Answer:**
Every JavaScript object has a prototype, which is another object from which it inherits properties and methods.

```javascript
// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding methods to prototype
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
};

Person.prototype.getAgeGroup = function() {
  if (this.age < 18) return 'Minor';
  if (this.age < 65) return 'Adult';
  return 'Senior';
};

// Creating instances
const john = new Person('John', 30);
const jane = new Person('Jane', 25);

console.log(john.greet()); // "Hello, I'm John and I'm 30 years old"
console.log(jane.getAgeGroup()); // "Adult"

// Prototype chain demonstration
console.log(john.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null

// Adding properties to prototype affects all instances
Person.prototype.species = 'Homo sapiens';
console.log(john.species); // "Homo sapiens"
console.log(jane.species); // "Homo sapiens"

// Inheritance with prototypes
function Employee(name, age, jobTitle) {
  Person.call(this, name, age); // Call parent constructor
  this.jobTitle = jobTitle;
}

// Set up inheritance
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Add Employee-specific methods
Employee.prototype.work = function() {
  return `${this.name} is working as a ${this.jobTitle}`;
};

// Override parent method
Employee.prototype.greet = function() {
  return `Hello, I'm ${this.name}, a ${this.jobTitle}`;
};

const developer = new Employee('Alice', 28, 'Developer');
console.log(developer.greet()); // "Hello, I'm Alice, a Developer"
console.log(developer.work()); // "Alice is working as a Developer"
console.log(developer.getAgeGroup()); // "Adult" (inherited from Person)
```

**Modern ES6 Class Syntax:**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
  }
  
  getAgeGroup() {
    if (this.age < 18) return 'Minor';
    if (this.age < 65) return 'Adult';
    return 'Senior';
  }
  
  static getSpecies() {
    return 'Homo sapiens';
  }
}

class Employee extends Person {
  constructor(name, age, jobTitle) {
    super(name, age);
    this.jobTitle = jobTitle;
  }
  
  greet() {
    return `Hello, I'm ${this.name}, a ${this.jobTitle}`;
  }
  
  work() {
    return `${this.name} is working as a ${this.jobTitle}`;
  }
}

const developer = new Employee('Bob', 32, 'Developer');
console.log(developer.greet());
console.log(developer.getAgeGroup()); // Inherited method
```

---

### Q3: Explain Advanced Array Methods and their practical use cases.
**Difficulty: Medium**

**Answer:**
JavaScript provides powerful array methods for functional programming.

**1. Map, Filter, Reduce:**
```javascript
const users = [
  { id: 1, name: 'John', age: 30, salary: 50000, department: 'IT' },
  { id: 2, name: 'Jane', age: 25, salary: 60000, department: 'HR' },
  { id: 3, name: 'Bob', age: 35, salary: 70000, department: 'IT' },
  { id: 4, name: 'Alice', age: 28, salary: 55000, department: 'Finance' }
];

// Map - transform each element
const userNames = users.map(user => user.name);
const userSummaries = users.map(user => ({
  id: user.id,
  name: user.name,
  summary: `${user.name} (${user.age}) - ${user.department}`
}));

// Filter - select elements based on condition
const itUsers = users.filter(user => user.department === 'IT');
const highEarners = users.filter(user => user.salary > 55000);
const youngHighEarners = users.filter(user => user.age < 30 && user.salary > 55000);

// Reduce - accumulate values
const totalSalary = users.reduce((sum, user) => sum + user.salary, 0);
const averageSalary = totalSalary / users.length;

// Group by department
const usersByDepartment = users.reduce((groups, user) => {
  const dept = user.department;
  if (!groups[dept]) {
    groups[dept] = [];
  }
  groups[dept].push(user);
  return groups;
}, {});

// Find min/max salary
const salaries = users.map(user => user.salary);
const maxSalary = Math.max(...salaries);
const minSalary = Math.min(...salaries);

// Complex reduce example - department statistics
const departmentStats = users.reduce((stats, user) => {
  const dept = user.department;
  if (!stats[dept]) {
    stats[dept] = {
      count: 0,
      totalSalary: 0,
      employees: []
    };
  }
  
  stats[dept].count++;
  stats[dept].totalSalary += user.salary;
  stats[dept].employees.push(user.name);
  stats[dept].averageSalary = stats[dept].totalSalary / stats[dept].count;
  
  return stats;
}, {});

console.log(departmentStats);
```

**2. Advanced Array Methods:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// find - returns first element that matches
const firstEven = numbers.find(n => n % 2 === 0); // 2
const firstGreaterThan5 = numbers.find(n => n > 5); // 6

// findIndex - returns index of first matching element
const firstEvenIndex = numbers.findIndex(n => n % 2 === 0); // 1

// some - returns true if at least one element matches
const hasEvenNumbers = numbers.some(n => n % 2 === 0); // true
const hasNegativeNumbers = numbers.some(n => n < 0); // false

// every - returns true if all elements match
const allPositive = numbers.every(n => n > 0); // true
const allEven = numbers.every(n => n % 2 === 0); // false

// includes - checks if array contains a value
const hasNumber5 = numbers.includes(5); // true
const hasNumber15 = numbers.includes(15); // false

// flatMap - maps and flattens result
const words = ['hello', 'world'];
const letters = words.flatMap(word => word.split(''));
console.log(letters); // ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// Complex example: nested array processing
const orders = [
  { id: 1, items: [{ name: 'laptop', price: 1000 }, { name: 'mouse', price: 20 }] },
  { id: 2, items: [{ name: 'keyboard', price: 50 }, { name: 'monitor', price: 300 }] }
];

// Get all items with flatMap
const allItems = orders.flatMap(order => order.items);

// Calculate total value
const totalValue = allItems.reduce((sum, item) => sum + item.price, 0);

// Group items by price range
const itemsByPriceRange = allItems.reduce((groups, item) => {
  let range;
  if (item.price < 50) range = 'low';
  else if (item.price < 500) range = 'medium';
  else range = 'high';
  
  if (!groups[range]) groups[range] = [];
  groups[range].push(item);
  return groups;
}, {});
```

**3. Array Sorting and Searching:**
```javascript
const products = [
  { name: 'Laptop', price: 1000, category: 'Electronics', rating: 4.5 },
  { name: 'Book', price: 15, category: 'Education', rating: 4.8 },
  { name: 'Phone', price: 800, category: 'Electronics', rating: 4.2 },
  { name: 'Desk', price: 200, category: 'Furniture', rating: 4.0 }
];

// Sort by price (ascending)
const sortedByPrice = [...products].sort((a, b) => a.price - b.price);

// Sort by price (descending)
const sortedByPriceDesc = [...products].sort((a, b) => b.price - a.price);

// Sort by name (alphabetical)
const sortedByName = [...products].sort((a, b) => a.name.localeCompare(b.name));

// Multi-level sorting: category first, then price
const sortedMultiple = [...products].sort((a, b) => {
  if (a.category !== b.category) {
    return a.category.localeCompare(b.category);
  }
  return a.price - b.price;
});

// Custom search function
function searchProducts(products, query) {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}

// Advanced filtering with multiple criteria
function filterProducts(products, criteria) {
  return products.filter(product => {
    if (criteria.minPrice && product.price < criteria.minPrice) return false;
    if (criteria.maxPrice && product.price > criteria.maxPrice) return false;
    if (criteria.category && product.category !== criteria.category) return false;
    if (criteria.minRating && product.rating < criteria.minRating) return false;
    return true;
  });
}

// Usage
const expensiveElectronics = filterProducts(products, {
  category: 'Electronics',
  minPrice: 500,
  minRating: 4.0
});
```

---

### Q4: Explain Web APIs and Browser Features with practical examples.
**Difficulty: Medium**

**Answer:**
Modern browsers provide numerous APIs for enhanced functionality.

**1. Fetch API and HTTP Requests:**
```javascript
// Basic fetch usage
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}

// POST request with JSON data
async function createUser(userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

// File upload with FormData
async function uploadFile(file, metadata = {}) {
  const formData = new FormData();
  formData.append('file', file);
  
  Object.entries(metadata).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    return await response.json();
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

// Request with timeout and abort
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  return fetch(url, {
    ...options,
    signal: controller.signal
  }).finally(() => {
    clearTimeout(timeoutId);
  });
}
```

**2. Local Storage and Session Storage:**
```javascript
class StorageManager {
  // Local Storage methods
  static setLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }
  
  static getLocal(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return defaultValue;
    }
  }
  
  static removeLocal(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }
  
  // Session Storage methods
  static setSession(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to sessionStorage:', error);
    }
  }
  
  static getSession(key, defaultValue = null) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to read from sessionStorage:', error);
      return defaultValue;
    }
  }
  
  // Storage with expiration
  static setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    };
    this.setLocal(key, item);
  }
  
  static getWithExpiry(key) {
    const item = this.getLocal(key);
    if (!item) return null;
    
    const now = new Date();
    if (now.getTime() > item.expiry) {
      this.removeLocal(key);
      return null;
    }
    
    return item.value;
  }
}

// Usage
StorageManager.setLocal('user', { id: 1, name: 'John' });
const user = StorageManager.getLocal('user');

// Set data with 1 hour expiry
StorageManager.setWithExpiry('tempData', { token: 'abc123' }, 3600000);
```

**3. Geolocation API:**
```javascript
class LocationService {
  static async getCurrentPosition(options = {}) {
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        (error) => {
          let message;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out';
              break;
            default:
              message = 'Unknown location error';
              break;
          }
          reject(new Error(message));
        },
        finalOptions
      );
    });
  }
  
  static watchPosition(callback, errorCallback, options = {}) {
    if (!navigator.geolocation) {
      errorCallback(new Error('Geolocation is not supported'));
      return null;
    }
    
    return navigator.geolocation.watchPosition(
      callback,
      errorCallback,
      options
    );
  }
  
  static clearWatch(watchId) {
    if (navigator.geolocation && watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
  }
}

// Usage
try {
  const location = await LocationService.getCurrentPosition();
  console.log(`Lat: ${location.latitude}, Lng: ${location.longitude}`);
} catch (error) {
  console.error('Location error:', error.message);
}
```

**4. Notification API:**
```javascript
class NotificationService {
  static async requestPermission() {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }
    
    if (Notification.permission === 'granted') {
      return true;
    }
    
    if (Notification.permission === 'denied') {
      throw new Error('Notification permission denied');
    }
    
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  static async showNotification(title, options = {}) {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        throw new Error('Notification permission not granted');
      }
      
      const defaultOptions = {
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [200, 100, 200],
        requireInteraction: false
      };
      
      const notification = new Notification(title, {
        ...defaultOptions,
        ...options
      });
      
      // Auto-close after 5 seconds if not requiring interaction
      if (!options.requireInteraction) {
        setTimeout(() => notification.close(), 5000);
      }
      
      return notification;
    } catch (error) {
      console.error('Failed to show notification:', error);
      throw error;
    }
  }
}

// Usage
NotificationService.showNotification('New Message', {
  body: 'You have received a new message',
  icon: '/message-icon.png',
  tag: 'message-notification',
  data: { messageId: 123 }
});
```

---

### Q5: Explain Modern JavaScript Features (ES2020+) with examples.
**Difficulty: Medium**

**Answer:**
Modern JavaScript includes powerful features for better code organization and functionality.

**1. Optional Chaining (?.):**
```javascript
const user = {
  id: 1,
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'New York',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  preferences: {
    theme: 'dark',
    notifications: {
      email: true,
      push: false
    }
  }
};

// Without optional chaining (risky)
// const lat = user.address.coordinates.lat; // Could throw error

// With optional chaining (safe)
const lat = user.address?.coordinates?.lat; // 40.7128
const phone = user.contact?.phone; // undefined (no error)
const emailNotif = user.preferences?.notifications?.email; // true

// Optional chaining with arrays
const users = [
  { name: 'John', posts: [{ title: 'Hello' }] },
  { name: 'Jane' } // No posts property
];

const firstPostTitle = users[0]?.posts?.[0]?.title; // 'Hello'
const secondUserFirstPost = users[1]?.posts?.[0]?.title; // undefined

// Optional chaining with function calls
const api = {
  user: {
    getData: () => ({ name: 'John', age: 30 })
  }
};

const userData = api.user?.getData?.(); // Calls function if it exists
const nonExistentData = api.admin?.getData?.(); // undefined (no error)
```

**2. Nullish Coalescing (??):**
```javascript
// Nullish coalescing vs logical OR
const config = {
  timeout: 0,
  retries: null,
  debug: false,
  apiUrl: undefined
};

// Using logical OR (problematic with falsy values)
const timeoutOR = config.timeout || 5000; // 5000 (wrong! 0 is falsy)
const debugOR = config.debug || true; // true (wrong! false is falsy)

// Using nullish coalescing (only null/undefined trigger default)
const timeoutNC = config.timeout ?? 5000; // 0 (correct!)
const debugNC = config.debug ?? true; // false (correct!)
const retriesNC = config.retries ?? 3; // 3 (correct, null triggers default)
const apiUrlNC = config.apiUrl ?? 'https://api.example.com'; // default URL

// Practical example: user preferences
function getUserPreferences(user) {
  return {
    theme: user.preferences?.theme ?? 'light',
    language: user.preferences?.language ?? 'en',
    notifications: user.preferences?.notifications ?? true,
    autoSave: user.preferences?.autoSave ?? false // false is valid preference
  };
}

// Assignment with nullish coalescing
let userTheme;
userTheme ??= 'light'; // Assign only if userTheme is null/undefined
console.log(userTheme); // 'light'

userTheme = 'dark';
userTheme ??= 'light'; // No assignment, userTheme is already 'dark'
console.log(userTheme); // 'dark'
```

**3. BigInt for Large Numbers:**
```javascript
// Regular numbers have precision limits
const maxSafeInteger = Number.MAX_SAFE_INTEGER; // 9007199254740991
const beyondSafe = maxSafeInteger + 1; // 9007199254740992
const beyondSafe2 = maxSafeInteger + 2; // 9007199254740992 (same as above!)

console.log(beyondSafe === beyondSafe2); // true (precision lost)

// BigInt for arbitrary precision
const bigNum1 = BigInt(maxSafeInteger) + 1n; // 9007199254740992n
const bigNum2 = BigInt(maxSafeInteger) + 2n; // 9007199254740993n

console.log(bigNum1 === bigNum2); // false (precision maintained)

// BigInt operations
const a = 123456789012345678901234567890n;
const b = 987654321098765432109876543210n;

const sum = a + b;
const product = a * b;
const power = a ** 2n;

// Converting between BigInt and Number
const regularNum = 42;
const bigIntNum = BigInt(regularNum); // 42n
const backToNum = Number(bigIntNum); // 42

// Practical example: cryptocurrency calculations
class CryptoWallet {
  constructor() {
    this.balance = 0n; // Store as BigInt for precision
  }
  
  deposit(amount) {
    // Convert string/number to BigInt
    const amountBigInt = typeof amount === 'string' ? 
      BigInt(amount) : BigInt(Math.floor(amount));
    this.balance += amountBigInt;
  }
  
  withdraw(amount) {
    const amountBigInt = typeof amount === 'string' ? 
      BigInt(amount) : BigInt(Math.floor(amount));
    
    if (this.balance >= amountBigInt) {
      this.balance -= amountBigInt;
      return true;
    }
    return false;
  }
  
  getBalance() {
    return this.balance.toString(); // Convert to string for display
  }
}

const wallet = new CryptoWallet();
wallet.deposit('1000000000000000000000'); // Very large number
console.log(wallet.getBalance());
```

**4. Dynamic Imports:**
```javascript
// Static imports (traditional)
// import { utils } from './utils.js'; // Loaded at compile time

// Dynamic imports (ES2020)
async function loadUtilsWhenNeeded() {
  try {
    const { utils, helpers } = await import('./utils.js');
    return utils.processData(data);
  } catch (error) {
    console.error('Failed to load utils:', error);
  }
}

// Conditional loading
async function loadFeature(featureName) {
  let module;
  
  switch (featureName) {
    case 'charts':
      module = await import('./charts.js');
      break;
    case 'analytics':
      module = await import('./analytics.js');
      break;
    case 'reporting':
      module = await import('./reporting.js');
      break;
    default:
      throw new Error(`Unknown feature: ${featureName}`);
  }
  
  return module.default || module;
}

// Lazy loading with user interaction
class AdvancedEditor {
  constructor() {
    this.basicEditor = new BasicEditor();
    this.advancedFeatures = null;
  }
  
  async enableAdvancedMode() {
    if (!this.advancedFeatures) {
      try {
        const module = await import('./advanced-editor-features.js');
        this.advancedFeatures = new module.AdvancedFeatures();
      } catch (error) {
        console.error('Failed to load advanced features:', error);
        return false;
      }
    }
    
    this.advancedFeatures.activate();
    return true;
  }
}

// Dynamic import with error handling and fallback
async function loadWithFallback(primaryModule, fallbackModule) {
  try {
    return await import(primaryModule);
  } catch (error) {
    console.warn(`Failed to load ${primaryModule}, using fallback`);
    return await import(fallbackModule);
  }
}
```

**5. Promise.allSettled():**
```javascript
// Promise.all vs Promise.allSettled
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments'),
  fetch('/api/invalid-endpoint') // This will fail
];

// Promise.all - fails if any promise rejects
try {
  const results = await Promise.all(promises);
  // This won't execute because one promise failed
} catch (error) {
  console.error('One or more requests failed:', error);
}

// Promise.allSettled - waits for all promises regardless of outcome
const results = await Promise.allSettled(promises);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`Request ${index} succeeded:`, result.value);
  } else {
    console.log(`Request ${index} failed:`, result.reason);
  }
});

// Practical example: loading multiple data sources
async function loadDashboardData() {
  const dataPromises = [
    fetchUserStats(),
    fetchSalesData(),
    fetchAnalytics(),
    fetchNotifications()
  ];
  
  const results = await Promise.allSettled(dataPromises);
  
  const dashboard = {
    userStats: null,
    salesData: null,
    analytics: null,
    notifications: []
  };
  
  results.forEach((result, index) => {
    const keys = ['userStats', 'salesData', 'analytics', 'notifications'];
    
    if (result.status === 'fulfilled') {
      dashboard[keys[index]] = result.value;
    } else {
      console.warn(`Failed to load ${keys[index]}:`, result.reason);
      // Set default values or show error state
    }
  });
  
  return dashboard;
}
```

**6. String.prototype.matchAll():**
```javascript
// Traditional approach with regex.exec()
function findAllMatches(text, regex) {
  const matches = [];
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    matches.push(match);
    if (!regex.global) break; // Prevent infinite loop
  }
  
  return matches;
}

// Modern approach with matchAll()
const text = 'The price is $25.99 and the tax is $3.50, total: $29.49';
const priceRegex = /\$(\d+\.\d{2})/g;

// Using matchAll
const matches = [...text.matchAll(priceRegex)];
matches.forEach((match, index) => {
  console.log(`Match ${index}: ${match[0]}, Amount: ${match[1]}`);
});

// Practical example: parsing structured data
function parseLogEntries(logText) {
  const logRegex = /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+): (.+)/g;
  const entries = [];
  
  for (const match of logText.matchAll(logRegex)) {
    entries.push({
      timestamp: new Date(match[1]),
      level: match[2],
      message: match[3]
    });
  }
  
  return entries;
}

const logText = `
[2023-01-01 10:30:15] INFO: Application started
[2023-01-01 10:30:16] DEBUG: Loading configuration
[2023-01-01 10:30:20] ERROR: Database connection failed
`;

const logEntries = parseLogEntries(logText);
console.log(logEntries);
```

---

## Modern JavaScript Features (ES2020-2023+)

### Q1: What are the latest JavaScript features and how do you use them?
**Difficulty: Advanced**

**Answer:**
Modern JavaScript includes many powerful features that improve code readability, performance, and developer experience.

**1. Top-level await (ES2022):**
```javascript
// Before: Had to wrap in async function
(async () => {
  const data = await fetch('/api/data');
  const json = await data.json();
  console.log(json);
})();

// Now: Can use await at module level
const data = await fetch('/api/data');
const json = await data.json();
console.log(json);

// Practical example: Module initialization
const config = await import('./config.js');
const db = await connectToDatabase(config.default.dbUrl);
export { db };
```

**2. Private class fields and methods (ES2022):**
```javascript
class BankAccount {
  // Private fields
  #balance = 0;
  #accountNumber;
  
  // Private method
  #validateAmount(amount) {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    if (typeof amount !== 'number') {
      throw new Error('Amount must be a number');
    }
  }
  
  constructor(accountNumber, initialBalance = 0) {
    this.#accountNumber = accountNumber;
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    this.#validateAmount(amount);
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    this.#validateAmount(amount);
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    this.#balance -= amount;
    return this.#balance;
  }
  
  get balance() {
    return this.#balance;
  }
  
  // Static private method
  static #generateAccountNumber() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  
  static createAccount(initialBalance = 0) {
    const accountNumber = this.#generateAccountNumber();
    return new BankAccount(accountNumber, initialBalance);
  }
}

const account = BankAccount.createAccount(1000);
console.log(account.balance); // 1000
// console.log(account.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

**3. Array.prototype.at() (ES2022):**
```javascript
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

// Traditional way to get last element
console.log(fruits[fruits.length - 1]); // 'elderberry'

// Modern way with at()
console.log(fruits.at(-1)); // 'elderberry'
console.log(fruits.at(-2)); // 'date'
console.log(fruits.at(0));  // 'apple'
console.log(fruits.at(1));  // 'banana'

// Works with strings too
const text = 'Hello World';
console.log(text.at(-1)); // 'd'
console.log(text.at(-6)); // ' '

// Practical example: Safe array access
function getLastNItems(array, n) {
  return Array.from({ length: n }, (_, i) => array.at(-(i + 1))).reverse();
}

console.log(getLastNItems(fruits, 3)); // ['cherry', 'date', 'elderberry']
```

**4. Object.hasOwn() (ES2022):**
```javascript
const obj = {
  name: 'John',
  age: 30
};

// Traditional way (can be problematic)
console.log(obj.hasOwnProperty('name')); // true

// Modern way (safer)
console.log(Object.hasOwn(obj, 'name')); // true
console.log(Object.hasOwn(obj, 'toString')); // false

// Why Object.hasOwn is better
const objWithoutPrototype = Object.create(null);
objWithoutPrototype.name = 'Jane';

// This would throw an error
// console.log(objWithoutPrototype.hasOwnProperty('name')); // TypeError

// This works fine
console.log(Object.hasOwn(objWithoutPrototype, 'name')); // true

// Practical example: Safe property checking
function safePropertyCheck(obj, prop) {
  return Object.hasOwn(obj, prop) ? obj[prop] : undefined;
}
```

**5. Error.cause (ES2022):**
```javascript
// Enhanced error handling with cause
class DatabaseError extends Error {
  constructor(message, cause) {
    super(message, { cause });
    this.name = 'DatabaseError';
  }
}

class UserService {
  async getUser(id) {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (originalError) {
      // Wrap the original error with more context
      throw new DatabaseError(
        `Failed to fetch user with id ${id}`,
        originalError
      );
    }
  }
}

// Usage
try {
  const user = await userService.getUser(123);
} catch (error) {
  console.log(error.message); // "Failed to fetch user with id 123"
  console.log(error.cause);   // Original fetch error
  
  // Can trace the full error chain
  let currentError = error;
  while (currentError) {
    console.log(`Error: ${currentError.message}`);
    currentError = currentError.cause;
  }
}
```

**6. Array.prototype.findLast() and findLastIndex() (ES2023):**
```javascript
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// Find last even number
const lastEven = numbers.findLast(n => n % 2 === 0);
console.log(lastEven); // 2

// Find index of last even number
const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIndex); // 7

// Practical example: Finding latest log entry
const logs = [
  { level: 'info', message: 'App started', timestamp: 1000 },
  { level: 'error', message: 'Connection failed', timestamp: 2000 },
  { level: 'info', message: 'Retrying...', timestamp: 3000 },
  { level: 'error', message: 'Still failing', timestamp: 4000 },
  { level: 'info', message: 'Connected', timestamp: 5000 }
];

const lastError = logs.findLast(log => log.level === 'error');
console.log(lastError); // { level: 'error', message: 'Still failing', timestamp: 4000 }
```

**7. Array.prototype.toReversed(), toSorted(), toSpliced(), with() (ES2023):**
```javascript
const original = [3, 1, 4, 1, 5, 9, 2, 6];

// Non-mutating array methods
const reversed = original.toReversed();
console.log(original); // [3, 1, 4, 1, 5, 9, 2, 6] (unchanged)
console.log(reversed); // [6, 2, 9, 5, 1, 4, 1, 3]

const sorted = original.toSorted();
console.log(sorted); // [1, 1, 2, 3, 4, 5, 6, 9]

const spliced = original.toSpliced(2, 2, 'a', 'b');
console.log(spliced); // [3, 1, 'a', 'b', 5, 9, 2, 6]

const modified = original.with(0, 'first');
console.log(modified); // ['first', 1, 4, 1, 5, 9, 2, 6]

// Practical example: Immutable state updates
class TodoList {
  constructor(todos = []) {
    this.todos = todos;
  }
  
  addTodo(todo) {
    return new TodoList([...this.todos, todo]);
  }
  
  removeTodo(index) {
    return new TodoList(this.todos.toSpliced(index, 1));
  }
  
  updateTodo(index, newTodo) {
    return new TodoList(this.todos.with(index, newTodo));
  }
  
  sortTodos() {
    return new TodoList(this.todos.toSorted((a, b) => a.priority - b.priority));
  }
}
```

---

## Advanced JavaScript Patterns

### Q2: What are some advanced JavaScript design patterns and when should you use them?
**Difficulty: Advanced**

**Answer:**
Advanced JavaScript patterns help solve complex problems and improve code organization.

**1. Module Pattern with Namespace:**
```javascript
const AppModule = (() => {
  // Private variables and functions
  let config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
  };
  
  const cache = new Map();
  
  function validateConfig(newConfig) {
    if (!newConfig.apiUrl) {
      throw new Error('API URL is required');
    }
  }
  
  // Public API
  return {
    // Configuration management
    configure(newConfig) {
      validateConfig(newConfig);
      config = { ...config, ...newConfig };
    },
    
    getConfig() {
      return { ...config }; // Return copy to prevent mutation
    },
    
    // HTTP utilities
    async request(endpoint, options = {}) {
      const url = `${config.apiUrl}${endpoint}`;
      const cacheKey = `${url}:${JSON.stringify(options)}`;
      
      // Check cache for GET requests
      if (!options.method || options.method === 'GET') {
        if (cache.has(cacheKey)) {
          return cache.get(cacheKey);
        }
      }
      
      try {
        const response = await fetch(url, {
          timeout: config.timeout,
          ...options
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Cache successful GET requests
        if (!options.method || options.method === 'GET') {
          cache.set(cacheKey, data);
        }
        
        return data;
      } catch (error) {
        console.error('Request failed:', error);
        throw error;
      }
    },
    
    // Cache management
    clearCache() {
      cache.clear();
    }
  };
})();

// Usage
AppModule.configure({ apiUrl: 'https://my-api.com' });
const users = await AppModule.request('/users');
```

**2. Observer Pattern with Event Emitter:**
```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
    
    // Return unsubscribe function
    return () => this.off(event, listener);
  }
  
  once(event, listener) {
    const unsubscribe = this.on(event, (...args) => {
      unsubscribe();
      listener(...args);
    });
    return unsubscribe;
  }
  
  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
      if (this.events.get(event).size === 0) {
        this.events.delete(event);
      }
    }
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => {
        try {
          listener(...args);
        } catch (error) {
          console.error(`Error in event listener for '${event}':`, error);
        }
      });
    }
  }
  
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

// Application state management using Observer pattern
class StateManager extends EventEmitter {
  constructor(initialState = {}) {
    super();
    this.state = { ...initialState };
  }
  
  getState() {
    return { ...this.state };
  }
  
  setState(updates) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...updates };
    
    this.emit('stateChange', {
      prevState,
      newState: { ...this.state },
      updates
    });
  }
  
  subscribe(listener) {
    return this.on('stateChange', listener);
  }
}

// Usage
const stateManager = new StateManager({ count: 0, user: null });

const unsubscribe = stateManager.subscribe(({ prevState, newState, updates }) => {
  console.log('State changed:', { prevState, newState, updates });
});

stateManager.setState({ count: 1 });
stateManager.setState({ user: { name: 'John', id: 123 } });
```

**3. Command Pattern for Undo/Redo:**
```javascript
class Command {
  execute() {
    throw new Error('Execute method must be implemented');
  }
  
  undo() {
    throw new Error('Undo method must be implemented');
  }
}

class AddItemCommand extends Command {
  constructor(list, item) {
    super();
    this.list = list;
    this.item = item;
  }
  
  execute() {
    this.list.push(this.item);
  }
  
  undo() {
    const index = this.list.indexOf(this.item);
    if (index > -1) {
      this.list.splice(index, 1);
    }
  }
}

class RemoveItemCommand extends Command {
  constructor(list, index) {
    super();
    this.list = list;
    this.index = index;
    this.removedItem = null;
  }
  
  execute() {
    this.removedItem = this.list.splice(this.index, 1)[0];
  }
  
  undo() {
    if (this.removedItem !== null) {
      this.list.splice(this.index, 0, this.removedItem);
    }
  }
}

class CommandManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  
  execute(command) {
    // Remove any commands after current index (for redo scenarios)
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    command.execute();
    this.history.push(command);
    this.currentIndex++;
  }
  
  undo() {
    if (this.canUndo()) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
    }
  }
  
  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
    }
  }
  
  canUndo() {
    return this.currentIndex >= 0;
  }
  
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }
}

// Usage
const list = [];
const commandManager = new CommandManager();

// Execute commands
commandManager.execute(new AddItemCommand(list, 'Item 1'));
commandManager.execute(new AddItemCommand(list, 'Item 2'));
commandManager.execute(new RemoveItemCommand(list, 0));

console.log(list); // ['Item 2']

// Undo operations
commandManager.undo(); // Undoes remove
console.log(list); // ['Item 1', 'Item 2']

commandManager.undo(); // Undoes add Item 2
console.log(list); // ['Item 1']

// Redo operations
commandManager.redo(); // Redoes add Item 2
console.log(list); // ['Item 1', 'Item 2']
```

**4. Strategy Pattern for Algorithm Selection:**
```javascript
class SortingStrategy {
  sort(array) {
    throw new Error('Sort method must be implemented');
  }
}

class BubbleSortStrategy extends SortingStrategy {
  sort(array) {
    const arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    
    return arr;
  }
}

class QuickSortStrategy extends SortingStrategy {
  sort(array) {
    if (array.length <= 1) return [...array];
    
    const pivot = array[Math.floor(array.length / 2)];
    const left = array.filter(x => x < pivot);
    const middle = array.filter(x => x === pivot);
    const right = array.filter(x => x > pivot);
    
    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

class NativeSortStrategy extends SortingStrategy {
  sort(array) {
    return [...array].sort((a, b) => a - b);
  }
}

class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  sort(array) {
    const startTime = performance.now();
    const result = this.strategy.sort(array);
    const endTime = performance.now();
    
    return {
      result,
      executionTime: endTime - startTime,
      strategy: this.strategy.constructor.name
    };
  }
}

// Usage
const data = [64, 34, 25, 12, 22, 11, 90];
const sorter = new Sorter(new QuickSortStrategy());

let result = sorter.sort(data);
console.log(result);

// Switch strategy based on data size
if (data.length < 10) {
  sorter.setStrategy(new BubbleSortStrategy());
} else if (data.length < 1000) {
  sorter.setStrategy(new QuickSortStrategy());
} else {
  sorter.setStrategy(new NativeSortStrategy());
}

result = sorter.sort(data);
console.log(result);
```

---

## Memory Management

### Q1: Explain JavaScript memory management and garbage collection. How can you prevent memory leaks?
**Difficulty: Hard**

**Answer:**
JavaScript memory management is handled automatically through garbage collection, but understanding how it works is crucial for writing efficient applications.

**Memory Lifecycle:**
1. **Allocation** - JavaScript automatically allocates memory when objects are created
2. **Usage** - Reading and writing to allocated memory
3. **Release** - Garbage collector frees memory when objects are no longer needed

**Garbage Collection Algorithms:**

1. **Reference Counting:**
   - Counts references to each object
   - When count reaches zero, memory is freed
   - Problem: Cannot handle circular references

```javascript
function referenceCountingIssue() {
    let obj1 = {};
    let obj2 = {};
    
    // Circular reference
    obj1.ref = obj2;
    obj2.ref = obj1;
    
    // Both objects go out of scope but won't be collected
    // if using only reference counting
    return "done";
}
```

2. **Mark and Sweep:**
   - Modern browsers use this algorithm
   - Starts from "roots" (global objects)
   - Marks all reachable objects
   - Sweeps and frees unmarked objects
   - Can handle circular references

**Common Memory Leak Causes:**

1. **Accidental Global Variables:**
```javascript
function leakyFunction() {
    notDeclared = "I'm a global variable"; // Missing 'let/const/var'
    this.anotherGlobal = []; // 'this' refers to window in non-strict mode
}
```

2. **Forgotten Timers and Callbacks:**
```javascript
function setupLeakyTimer() {
    const largeData = new Array(1000000).fill('x');
    
    setInterval(() => {
        // This reference prevents largeData from being garbage collected
        console.log(largeData.length);
    }, 1000);
}
```

3. **Closures Capturing Variables:**
```javascript
function createLeak() {
    const largeData = new Array(1000000).fill('x');
    
    return function() {
        // Closure keeps reference to largeData even if only length is needed
        console.log(largeData.length);
    };
}

const leakyFunction = createLeak(); // largeData stays in memory
```

4. **DOM References Outside of DOM:**
```javascript
let elements = [];

function cacheElements() {
    // Store DOM elements
    elements.push(document.getElementById('element'));
    
    // Even if element is removed from DOM, it stays in memory
    document.body.removeChild(document.getElementById('element'));
}
```

5. **Event Listeners Not Removed:**
```javascript
function addLeakyListener() {
    const element = document.getElementById('button');
    const largeData = new Array(1000000).fill('x');
    
    element.addEventListener('click', function() {
        // This function captures largeData
        console.log(largeData.length);
    });
    
    // If element is removed without removing listener, leak occurs
}
```

**Preventing Memory Leaks:**

1. **Use Block Scope and Strict Mode:**
```javascript
'use strict';

function safeFunction() {
    let localVar = "I'm properly scoped";
    // localVar is garbage collected when function exits
}
```

2. **Clear Timers and Event Listeners:**
```javascript
function safeTimerUsage() {
    const largeData = new Array(1000000).fill('x');
    
    const timerId = setInterval(() => {
        console.log('Processing...');
    }, 1000);
    
    // Later, when done:
    clearInterval(timerId);
    // Now largeData can be garbage collected
}

function safeEventListener() {
    const element = document.getElementById('button');
    const largeData = new Array(1000000).fill('x');
    
    const clickHandler = function() {
        console.log(largeData.length);
    };
    
    element.addEventListener('click', clickHandler);
    
    // When done:
    element.removeEventListener('click', clickHandler);
    // Now largeData can be garbage collected
}
```

3. **Nullify References:**
```javascript
function processData() {
    let largeData = new Array(1000000).fill('x');
    
    // Process data...
    
    // When done, explicitly nullify
    largeData = null;
}
```

4. **Use WeakMap and WeakSet:**
```javascript
// Regular Map keeps strong references
const regularMap = new Map();
let obj = { data: "some data" };
regularMap.set(obj, "metadata");

// obj reference is maintained by regularMap
obj = null; // Original reference removed, but object still in memory

// WeakMap allows garbage collection of keys
const weakMap = new WeakMap();
let obj2 = { data: "some data" };
weakMap.set(obj2, "metadata");

// When obj2 has no other references, it can be garbage collected
// along with its associated data in weakMap
obj2 = null;
```

5. **Avoid Circular References or Break Them:**
```javascript
function handleCircularReferences() {
    let parent = { name: 'parent' };
    let child = { name: 'child' };
    
    // Create circular reference
    parent.child = child;
    child.parent = parent;
    
    // Use the objects...
    
    // Break circular reference when done
    child.parent = null;
    // Now both objects can be garbage collected when they go out of scope
}
```

6. **Use Chrome DevTools Memory Profiler:**
   - Take heap snapshots
   - Compare snapshots to find memory growth
   - Analyze retention paths

**Advanced Memory Management Techniques:**

1. **Object Pooling for Frequent Allocations:**
```javascript
class ObjectPool {
    constructor(createFn, initialSize = 10) {
        this.createFn = createFn;
        this.pool = Array(initialSize).fill().map(() => createFn());
    }
    
    acquire() {
        return this.pool.pop() || this.createFn();
    }
    
    release(obj) {
        this.pool.push(obj);
    }
}

// Usage for expensive objects
const vectorPool = new ObjectPool(() => ({ x: 0, y: 0 }));

function processVectors() {
    const v = vectorPool.acquire();
    v.x = 10;
    v.y = 20;
    
    // Use vector...
    
    // Return to pool instead of letting GC handle it
    vectorPool.release(v);
}
```

2. **Incremental Processing for Large Data:**
```javascript
function processLargeDataIncrementally(data, chunkSize = 1000) {
    let index = 0;
    
    function processChunk() {
        const chunk = data.slice(index, index + chunkSize);
        
        // Process chunk
        chunk.forEach(item => {
            // Do something with item
        });
        
        index += chunkSize;
        
        // Continue processing if more data
        if (index < data.length) {
            // Use setTimeout to avoid blocking the main thread
            setTimeout(processChunk, 0);
        }
    }
    
    processChunk();
}
```

**Memory Leak Detection Tools:**

1. Chrome DevTools Memory Panel
2. Heap Snapshot Comparison
3. Allocation Timeline
4. `performance.memory` API (Chrome only)
5. Node.js `--inspect` flag with Chrome DevTools

**Best Practices Summary:**

1. Understand the memory lifecycle and garbage collection mechanisms
2. Use appropriate data structures (WeakMap/WeakSet when needed)
3. Clean up event listeners, timers, and references
4. Avoid accidental globals with strict mode
5. Profile memory usage regularly
6. Consider object pooling for performance-critical code
7. Break circular references when no longer needed
8. Use incremental processing for large datasets

---

## Performance Optimization

### Q3: How do you optimize JavaScript performance and manage memory effectively?
**Difficulty: Advanced**

**Answer:**
JavaScript performance optimization involves understanding the event loop, memory management, and efficient coding patterns.

**1. Memory Management and Garbage Collection:**
```javascript
// Memory-efficient object pooling
class ObjectPool {
  constructor(createFn, resetFn, initialSize = 10) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    
    // Pre-populate pool
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }
  
  acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return this.createFn();
  }
  
  release(obj) {
    this.resetFn(obj);
    this.pool.push(obj);
  }
  
  get size() {
    return this.pool.length;
  }
}

// Example: Particle system with object pooling
class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.life = 1.0;
    this.active = false;
  }
  
  update(deltaTime) {
    if (!this.active) return;
    
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.life -= deltaTime;
    
    if (this.life <= 0) {
      this.active = false;
    }
  }
}

const particlePool = new ObjectPool(
  () => new Particle(),
  (particle) => {
    particle.x = 0;
    particle.y = 0;
    particle.vx = 0;
    particle.vy = 0;
    particle.life = 1.0;
    particle.active = false;
  },
  100
);

class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  emit(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      const particle = particlePool.acquire();
      particle.x = x;
      particle.y = y;
      particle.vx = (Math.random() - 0.5) * 200;
      particle.vy = (Math.random() - 0.5) * 200;
      particle.life = Math.random() * 2 + 1;
      particle.active = true;
      
      this.particles.push(particle);
    }
  }
  
  update(deltaTime) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update(deltaTime);
      
      if (!particle.active) {
        // Return to pool instead of creating garbage
        particlePool.release(particle);
        this.particles.splice(i, 1);
      }
    }
  }
}
```

**2. Efficient DOM Manipulation:**
```javascript
// Batch DOM operations to minimize reflows
class DOMBatcher {
  constructor() {
    this.operations = [];
    this.scheduled = false;
  }
  
  add(operation) {
    this.operations.push(operation);
    this.schedule();
  }
  
  schedule() {
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }
  
  flush() {
    // Batch read operations first
    const reads = this.operations.filter(op => op.type === 'read');
    const writes = this.operations.filter(op => op.type === 'write');
    
    // Execute all reads first
    reads.forEach(op => op.execute());
    
    // Then execute all writes
    writes.forEach(op => op.execute());
    
    this.operations = [];
    this.scheduled = false;
  }
}

const domBatcher = new DOMBatcher();

// Usage
function updateElements(elements, data) {
  elements.forEach((element, index) => {
    // Batch read operations
    domBatcher.add({
      type: 'read',
      execute: () => {
        const rect = element.getBoundingClientRect();
        data[index].width = rect.width;
      }
    });
    
    // Batch write operations
    domBatcher.add({
      type: 'write',
      execute: () => {
        element.style.transform = `translateX(${data[index].x}px)`;
        element.textContent = data[index].text;
      }
    });
  });
}

// Virtual scrolling for large lists
class VirtualList {
  constructor(container, itemHeight, renderItem) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    this.items = [];
    this.visibleItems = new Map();
    
    this.container.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('resize', () => this.onResize());
  }
  
  setItems(items) {
    this.items = items;
    this.container.style.height = `${items.length * this.itemHeight}px`;
    this.render();
  }
  
  onScroll() {
    this.render();
  }
  
  onResize() {
    this.render();
  }
  
  render() {
    const scrollTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight;
    
    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / this.itemHeight) + 1,
      this.items.length
    );
    
    // Remove items that are no longer visible
    for (const [index, element] of this.visibleItems) {
      if (index < startIndex || index >= endIndex) {
        element.remove();
        this.visibleItems.delete(index);
      }
    }
    
    // Add new visible items
    for (let i = startIndex; i < endIndex; i++) {
      if (!this.visibleItems.has(i)) {
        const element = this.renderItem(this.items[i], i);
        element.style.position = 'absolute';
        element.style.top = `${i * this.itemHeight}px`;
        element.style.height = `${this.itemHeight}px`;
        
        this.container.appendChild(element);
        this.visibleItems.set(i, element);
      }
    }
  }
}
```

**3. Advanced Async Patterns:**
```javascript
// Async queue with concurrency control
class AsyncQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  
  async add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        resolve,
        reject
      });
      
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { task, resolve, reject } = this.queue.shift();
    
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
  
  get pending() {
    return this.queue.length;
  }
  
  get active() {
    return this.running;
  }
}

// Retry mechanism with exponential backoff
class RetryableOperation {
  constructor(operation, options = {}) {
    this.operation = operation;
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.maxDelay = options.maxDelay || 30000;
    this.backoffFactor = options.backoffFactor || 2;
  }
  
  async execute() {
    let lastError;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await this.operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === this.maxRetries) {
          throw error;
        }
        
        const delay = Math.min(
          this.baseDelay * Math.pow(this.backoffFactor, attempt),
          this.maxDelay
        );
        
        console.warn(`Operation failed (attempt ${attempt + 1}), retrying in ${delay}ms:`, error.message);
        await this.delay(delay);
      }
    }
    
    throw lastError;
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Circuit breaker pattern
class CircuitBreaker {
  constructor(operation, options = {}) {
    this.operation = operation;
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 60000;
    this.monitoringPeriod = options.monitoringPeriod || 10000;
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }
  
  async execute(...args) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime >= this.timeout) {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await this.operation(...args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= 3) {
        this.state = 'CLOSED';
      }
    }
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
  
  get isOpen() {
    return this.state === 'OPEN';
  }
  
  reset() {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }
}

// Usage examples
const queue = new AsyncQueue(2);

// Add multiple async operations
const results = await Promise.all([
  queue.add(() => fetch('/api/data1').then(r => r.json())),
  queue.add(() => fetch('/api/data2').then(r => r.json())),
  queue.add(() => fetch('/api/data3').then(r => r.json())),
  queue.add(() => fetch('/api/data4').then(r => r.json()))
]);

// Retryable operation
const retryableRequest = new RetryableOperation(
  () => fetch('/api/unreliable-endpoint').then(r => r.json()),
  { maxRetries: 3, baseDelay: 1000 }
);

try {
  const data = await retryableRequest.execute();
  console.log('Data received:', data);
} catch (error) {
  console.error('Operation failed after retries:', error);
}

// Circuit breaker
const circuitBreaker = new CircuitBreaker(
  (url) => fetch(url).then(r => r.json()),
  { failureThreshold: 3, timeout: 30000 }
);

try {
  const data = await circuitBreaker.execute('/api/protected-endpoint');
  console.log('Data received:', data);
} catch (error) {
  if (circuitBreaker.isOpen) {
    console.log('Circuit breaker is open, using fallback');
    // Use cached data or alternative service
  } else {
    console.error('Request failed:', error);
  }
}
```

**4. Performance Monitoring and Optimization:**
```javascript
// Performance monitoring utility
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
  }
  
  // Measure function execution time
  measure(name, fn) {
    return async (...args) => {
      const start = performance.now();
      
      try {
        const result = await fn(...args);
        const duration = performance.now() - start;
        this.recordMetric(name, duration);
        return result;
      } catch (error) {
        const duration = performance.now() - start;
        this.recordMetric(`${name}_error`, duration);
        throw error;
      }
    };
  }
  
  // Record custom metrics
  recordMetric(name, value) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name);
    values.push({
      value,
      timestamp: Date.now()
    });
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
    
    this.notifyObservers(name, value);
  }
  
  // Get metric statistics
  getStats(name) {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) {
      return null;
    }
    
    const nums = values.map(v => v.value);
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    
    // Calculate percentiles
    const sorted = [...nums].sort((a, b) => a - b);
    const p50 = sorted[Math.floor(sorted.length * 0.5)];
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    const p99 = sorted[Math.floor(sorted.length * 0.99)];
    
    return {
      count: nums.length,
      sum,
      avg,
      min,
      max,
      p50,
      p95,
      p99
    };
  }
  
  // Subscribe to metric updates
  subscribe(callback) {
    this.observers.push(callback);
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }
  
  notifyObservers(name, value) {
    this.observers.forEach(callback => {
      try {
        callback(name, value);
      } catch (error) {
        console.error('Error in performance monitor observer:', error);
      }
    });
  }
  
  // Monitor Core Web Vitals
  monitorWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        this.recordMetric('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.recordMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

// Usage
const monitor = new PerformanceMonitor();

// Monitor web vitals
monitor.monitorWebVitals();

// Wrap functions for automatic measurement
const measuredFetch = monitor.measure('api_request', fetch);
const measuredProcessData = monitor.measure('data_processing', processData);

// Subscribe to performance updates
monitor.subscribe((name, value) => {
  if (value > 1000) { // Alert if operation takes more than 1 second
    console.warn(`Performance alert: ${name} took ${value}ms`);
  }
});

// Get performance statistics
setInterval(() => {
  const apiStats = monitor.getStats('api_request');
  if (apiStats) {
    console.log('API Request Performance:', apiStats);
  }
}, 30000);
```

This comprehensive JavaScript guide now covers modern ES2020-2023+ features, advanced design patterns, performance optimization, memory management, and sophisticated async patterns. Each section provides practical, production-ready examples that demonstrate real-world usage patterns for building high-performance JavaScript applications.

---

## Browser APIs

### Q1: Explain the Intersection Observer API and how it can be used for performance optimization.
**Difficulty: Hard**

**Answer:**
The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with the document's viewport. It's particularly useful for implementing lazy loading, infinite scrolling, and performance optimizations.

**Basic Usage:**

```javascript
const options = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin around the root
  threshold: 0.1 // Trigger when 10% of the target is visible
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is now visible in the viewport!');
      // Do something with the visible element
      const element = entry.target;
      
      // Example: Lazy load an image
      if (element.dataset.src) {
        element.src = element.dataset.src;
        // Stop observing after loading
        observer.unobserve(element);
      }
    }
  });
};

const observer = new IntersectionObserver(callback, options);

// Start observing elements
const elements = document.querySelectorAll('.lazy-load');
elements.forEach(element => observer.observe(element));
```

**Configuration Options Explained:**

1. **root**: The element that is used as the viewport for checking visibility
   - `null` means use the browser viewport
   - Can be any ancestor element of the targets

2. **rootMargin**: Margin around the root, specified as CSS margin property
   - Expands or shrinks the effective size of the root element
   - Example: '50px 0px' creates a 50px margin at top and bottom

3. **threshold**: Percentage of the target's visibility needed to trigger the callback
   - 0.0 means as soon as even one pixel is visible
   - 1.0 means the entire element must be visible
   - Can be an array like [0, 0.25, 0.5, 0.75, 1] for multiple triggers

**Advanced Use Cases:**

1. **Lazy Loading Images:**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.onload = () => {
            img.classList.add('loaded');
          };
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '200px 0px', // Start loading 200px before the image enters viewport
    threshold: 0.01
  });
  
  // Select all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
});
```

2. **Infinite Scrolling:**

```javascript
function createInfiniteScroll() {
  let page = 1;
  let loading = false;
  const contentContainer = document.getElementById('content');
  const loadingIndicator = document.getElementById('loading');
  
  const loadMoreContent = async () => {
    if (loading) return;
    
    loading = true;
    loadingIndicator.style.display = 'block';
    
    try {
      const response = await fetch(`/api/content?page=${page}`);
      const data = await response.json();
      
      if (data.items.length === 0) {
        // No more content to load
        observer.unobserve(loadingIndicator);
        loadingIndicator.textContent = 'No more content';
        return;
      }
      
      // Append new content
      data.items.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('content-item');
        element.textContent = item.title;
        contentContainer.appendChild(element);
      });
      
      page++;
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      loading = false;
      loadingIndicator.style.display = 'none';
    }
  };
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreContent();
    }
  }, {
    rootMargin: '100px 0px'
  });
  
  observer.observe(loadingIndicator);
  
  return {
    destroy: () => observer.disconnect()
  };
}

// Initialize infinite scroll
const infiniteScroll = createInfiniteScroll();

// Clean up when needed
// infiniteScroll.destroy();
```

3. **Animation Triggers:**

```javascript
function setupAnimationObserver() {
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Optional: run the animation only once
        if (entry.target.dataset.animateOnce === 'true') {
          animationObserver.unobserve(entry.target);
        }
      } else if (!entry.target.dataset.animateOnce) {
        // Remove animation class when element leaves viewport
        // unless it's set to animate only once
        entry.target.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.2 // Element must be 20% visible before animating
  });
  
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => animationObserver.observe(el));
  
  return animationObserver;
}
```

4. **Viewport Analytics:**

```javascript
function trackElementVisibility() {
  const analyticsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const elementId = entry.target.id;
      
      if (entry.isIntersecting) {
        // Element entered viewport
        const visibleTime = Date.now();
        entry.target.dataset.visibleSince = visibleTime;
        
        console.log(`Element ${elementId} became visible at ${new Date(visibleTime).toISOString()}`);
        // Send analytics event: element visible
        sendAnalyticsEvent('element_visible', { elementId });
      } else if (entry.target.dataset.visibleSince) {
        // Element left viewport
        const visibleSince = parseInt(entry.target.dataset.visibleSince);
        const visibleDuration = Date.now() - visibleSince;
        
        console.log(`Element ${elementId} was visible for ${visibleDuration}ms`);
        // Send analytics event: element hidden with duration
        sendAnalyticsEvent('element_hidden', { elementId, visibleDuration });
        
        delete entry.target.dataset.visibleSince;
      }
    });
  }, {
    threshold: [0, 0.5, 1.0] // Track at different visibility thresholds
  });
  
  const trackedElements = document.querySelectorAll('[data-track-visibility]');
  trackedElements.forEach(el => analyticsObserver.observe(el));
  
  function sendAnalyticsEvent(eventName, data) {
    // Implementation would depend on your analytics provider
    console.log('Analytics event:', eventName, data);
    // Example: gtag('event', eventName, data);
  }
  
  return analyticsObserver;
}
```

5. **Performance Optimization with Disconnection:**

```javascript
class ViewportManager {
  constructor() {
    this.observers = new Map();
    this.visibleElements = new Set();
  }
  
  observe(elements, options = {}, callback) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      once: false
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    const { once, ...observerOptions } = mergedOptions;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
          this.visibleElements.add(element);
          callback(element, true);
          
          if (once) {
            observer.unobserve(element);
          }
        } else if (this.visibleElements.has(element)) {
          this.visibleElements.delete(element);
          callback(element, false);
        }
      });
    }, observerOptions);
    
    // Store observer reference for cleanup
    const id = Symbol('observer');
    this.observers.set(id, { observer, elements: new Set(elements) });
    
    // Start observing elements
    elements.forEach(element => observer.observe(element));
    
    // Return id for later reference
    return id;
  }
  
  unobserve(id) {
    if (!this.observers.has(id)) return false;
    
    const { observer, elements } = this.observers.get(id);
    elements.forEach(element => {
      observer.unobserve(element);
      this.visibleElements.delete(element);
    });
    
    this.observers.delete(id);
    return true;
  }
  
  disconnect() {
    this.observers.forEach(({ observer }) => observer.disconnect());
    this.observers.clear();
    this.visibleElements.clear();
  }
}

// Usage
const viewportManager = new ViewportManager();

const lazyLoadId = viewportManager.observe(
  document.querySelectorAll('.lazy-image'),
  { rootMargin: '200px', once: true },
  (element, isVisible) => {
    if (isVisible && element.dataset.src) {
      element.src = element.dataset.src;
    }
  }
);

// Later, when no longer needed
// viewportManager.unobserve(lazyLoadId);

// When page changes or component unmounts
// viewportManager.disconnect();
```

**Browser Compatibility and Polyfills:**

The Intersection Observer API is supported in all modern browsers, but for older browsers like IE, you may need a polyfill:

```javascript
// Check if IntersectionObserver is supported
if (!('IntersectionObserver' in window)) {
  // Load polyfill
  const script = document.createElement('script');
  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
  document.head.appendChild(script);
}
```

**Performance Benefits:**

1. **Reduced DOM Operations**: Only process elements when they become visible
2. **Efficient Event Handling**: No need for scroll event listeners which can cause performance issues
3. **Optimized Resource Loading**: Load resources only when needed
4. **Smoother User Experience**: Prevent layout thrashing and jank
5. **Battery Efficiency**: Especially important for mobile devices

**Best Practices:**

1. Always unobserve elements when you're done with them to prevent memory leaks
2. Use appropriate thresholds based on your use case
3. Consider using rootMargin to load content before it's visible for smoother experience
4. Implement error handling for resources that fail to load
5. Use a polyfill for older browsers if needed
6. Combine with other performance techniques like debouncing and throttling for optimal results

### Q2: Explain Web Workers in JavaScript and how they can improve application performance.
**Difficulty: Hard**

**Answer:**
Web Workers provide a way to run JavaScript code in background threads, separate from the main execution thread of a web application. This enables true multi-threading in JavaScript, allowing CPU-intensive tasks to run without blocking the user interface.

**Basic Concepts:**

1. **Types of Web Workers:**
   - **Dedicated Workers**: Used by a single script
   - **Shared Workers**: Can be shared between multiple scripts or windows
   - **Service Workers**: Act as proxy servers that sit between web applications, the browser, and the network

2. **Limitations:**
   - No direct access to the DOM, window, or parent objects
   - Limited access to browser APIs
   - Communication only through messaging
   - Cannot use certain methods like `alert()` or `confirm()`

**Creating and Using a Dedicated Worker:**

```javascript
// main.js - Main thread code
function startWorker() {
  // Create a new worker
  const worker = new Worker('worker.js');
  
  // Send data to the worker
  worker.postMessage({
    command: 'calculate',
    data: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
  });
  
  // Listen for messages from the worker
  worker.onmessage = function(event) {
    console.log('Result received from worker:', event.data);
    document.getElementById('result').textContent = event.data.result;
  };
  
  // Handle errors
  worker.onerror = function(error) {
    console.error('Worker error:', error.message);
  };
  
  return worker;
}

// Terminate worker when done
function stopWorker(worker) {
  worker.terminate();
  console.log('Worker terminated');
}

// Usage
const myWorker = startWorker();
// Later when done
// stopWorker(myWorker);
```

```javascript
// worker.js - Worker thread code
self.onmessage = function(event) {
  const { command, data } = event.data;
  
  if (command === 'calculate') {
    // CPU-intensive task
    const result = performComplexCalculation(data.numbers);
    
    // Send the result back to the main thread
    self.postMessage({
      result: result
    });
  }
};

function performComplexCalculation(numbers) {
  // Simulate a CPU-intensive task
  let result = 0;
  
  // Fibonacci calculation as an example of CPU-intensive work
  for (const num of numbers) {
    result += fibonacci(num);
  }
  
  return result;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**Transferable Objects for Better Performance:**

When passing large data between the main thread and workers, you can use transferable objects to avoid the cost of copying:

```javascript
// In main thread
const hugeArray = new Uint8Array(100 * 1024 * 1024); // 100MB array
fillWithData(hugeArray); // Fill with some data

// Transfer ownership to worker (much faster than copying)
worker.postMessage({ data: hugeArray }, [hugeArray.buffer]);

// hugeArray is now neutered/emptied in the main thread
console.log(hugeArray.length); // 0
```

**Shared Workers:**

Shared Workers allow multiple scripts to share the same worker instance:

```javascript
// In multiple scripts/windows
const sharedWorker = new SharedWorker('shared-worker.js');

// Communication happens through a port object
sharedWorker.port.start();
sharedWorker.port.postMessage('Hello from script A');

sharedWorker.port.onmessage = function(event) {
  console.log('Message received from shared worker:', event.data);
};
```

```javascript
// shared-worker.js
const connections = new Set();

// Handle connections from different scripts
self.onconnect = function(event) {
  const port = event.ports[0];
  connections.add(port);
  
  port.start();
  
  port.onmessage = function(event) {
    console.log('Shared worker received:', event.data);
    
    // Broadcast to all connected ports
    for (const connection of connections) {
      connection.postMessage('Broadcasting: ' + event.data);
    }
  };
  
  port.postMessage('Connected to shared worker');
};
```

**Worker Pools for Task Management:**

For managing multiple workers efficiently:

```javascript
class WorkerPool {
  constructor(workerScript, numWorkers = navigator.hardwareConcurrency || 4) {
    this.workerScript = workerScript;
    this.workers = [];
    this.taskQueue = [];
    this.activeWorkers = 0;
    
    // Create worker pool
    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(workerScript);
      
      worker.onmessage = (event) => {
        // Get the callback for this task
        const callback = worker.currentCallback;
        delete worker.currentCallback;
        
        // Mark worker as free
        worker.busy = false;
        this.activeWorkers--;
        
        // Execute callback with result
        if (callback) {
          callback(null, event.data);
        }
        
        // Process next task if any
        this.processQueue();
      };
      
      worker.onerror = (error) => {
        const callback = worker.currentCallback;
        delete worker.currentCallback;
        
        worker.busy = false;
        this.activeWorkers--;
        
        if (callback) {
          callback(error, null);
        }
        
        this.processQueue();
      };
      
      worker.busy = false;
      this.workers.push(worker);
    }
  }
  
  processQueue() {
    // If no tasks or all workers busy, return
    if (this.taskQueue.length === 0) return;
    
    // Find a free worker
    const freeWorker = this.workers.find(worker => !worker.busy);
    if (!freeWorker) return;
    
    // Get next task
    const task = this.taskQueue.shift();
    const { data, callback, transferables } = task;
    
    // Assign task to worker
    freeWorker.busy = true;
    freeWorker.currentCallback = callback;
    this.activeWorkers++;
    
    // Execute task
    if (transferables) {
      freeWorker.postMessage(data, transferables);
    } else {
      freeWorker.postMessage(data);
    }
  }
  
  addTask(data, callback, transferables = null) {
    this.taskQueue.push({ data, callback, transferables });
    this.processQueue();
    
    return this.taskQueue.length + this.activeWorkers;
  }
  
  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.taskQueue = [];
    this.activeWorkers = 0;
  }
}

// Usage
const pool = new WorkerPool('calculation-worker.js', 4);

pool.addTask({ type: 'fibonacci', n: 40 }, (error, result) => {
  if (error) {
    console.error('Task failed:', error);
  } else {
    console.log('Task completed with result:', result);
  }
});

// Add more tasks as needed
for (let i = 0; i < 10; i++) {
  pool.addTask({ type: 'complex-math', value: i * 1000 }, (err, result) => {
    console.log(`Task ${i} result:`, result);
  });
}

// When completely done
// pool.terminate();
```

**Web Worker Use Cases:**

1. **Data Processing and Analysis:**
   - Parsing large JSON/XML files
   - Processing images or video frames
   - Analyzing datasets for visualization

2. **Computation-Heavy Tasks:**
   - Complex mathematical calculations
   - Cryptography and encryption
   - Physics simulations

3. **Background Synchronization:**
   - Syncing local data with servers
   - Periodic data fetching and processing

4. **Real-time Data Processing:**
   - Processing WebSocket streams
   - Handling high-frequency updates

**Advanced Patterns:**

1. **Comlink Library for Easier Communication:**

```javascript
// Using Comlink to simplify worker communication
import * as Comlink from 'comlink';

// In worker.js
const api = {
  calculateFibonacci(n) {
    // Complex calculation
    return fibonacci(n);
  },
  
  processData(data) {
    // Process data
    return transformedData;
  }
};

Comlink.expose(api);

// In main.js
async function init() {
  const worker = new Worker('worker.js');
  const api = Comlink.wrap(worker);
  
  // Use worker functions as if they were local
  const result = await api.calculateFibonacci(40);
  console.log('Fibonacci result:', result);
}
```

2. **Workbox for Service Worker Management:**

```javascript
// Using Workbox for service worker management
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
```

**Performance Considerations:**

1. **When to Use Web Workers:**
   - Tasks taking more than 100ms
   - CPU-intensive operations
   - Tasks that would otherwise freeze the UI

2. **When NOT to Use Web Workers:**
   - Simple, quick calculations
   - DOM manipulation (must be done on main thread)
   - Tasks requiring frequent small data exchanges

3. **Measuring Performance Gains:**

```javascript
function measurePerformance(withWorker = false) {
  const startTime = performance.now();
  
  if (withWorker) {
    const worker = new Worker('heavy-task.js');
    
    return new Promise((resolve) => {
      worker.onmessage = function(event) {
        const endTime = performance.now();
        worker.terminate();
        resolve({
          result: event.data,
          time: endTime - startTime,
          uiBlocked: false
        });
      };
      
      worker.postMessage({ command: 'start' });
    });
  } else {
    // Run on main thread
    const result = performHeavyTask();
    const endTime = performance.now();
    
    return Promise.resolve({
      result,
      time: endTime - startTime,
      uiBlocked: true
    });
  }
}

// Compare performance
async function comparePerformance() {
  console.log('Running on main thread...');
  const mainThreadResult = await measurePerformance(false);
  
  console.log('Running in worker...');
  const workerResult = await measurePerformance(true);
  
  console.log(`Main thread: ${mainThreadResult.time.toFixed(2)}ms (UI Blocked)`); 
  console.log(`Worker: ${workerResult.time.toFixed(2)}ms (UI Responsive)`);
  console.log(`Performance difference: ${(mainThreadResult.time / workerResult.time).toFixed(2)}x`);
}
```

**Browser Compatibility and Fallbacks:**

```javascript
function createWorkerFallback(workerScript) {
  if (typeof Worker !== 'undefined') {
    // Browsers that support Web Workers
    return new Worker(workerScript);
  } else {
    // Fallback for browsers without Web Worker support
    return {
      postMessage: function(data) {
        setTimeout(() => {
          // Execute the worker code in the main thread
          // This is a simplified fallback
          const result = performTaskSynchronously(data);
          if (this.onmessage) {
            this.onmessage({ data: result });
          }
        }, 0);
      },
      terminate: function() {
        // Nothing to terminate in the fallback
      }
    };
  }
}

// Usage with fallback
const worker = createWorkerFallback('worker.js');
worker.postMessage({ data: [1, 2, 3, 4, 5] });
```

**Best Practices:**

1. **Optimize Communication:**
   - Batch messages to reduce overhead
   - Use transferable objects for large data
   - Keep message frequency reasonable

2. **Error Handling:**
   - Always implement error handlers
   - Gracefully recover from worker failures
   - Consider restarting crashed workers

3. **Resource Management:**
   - Terminate workers when no longer needed
   - Limit the number of concurrent workers
   - Consider device capabilities when creating workers

4. **Testing and Debugging:**
   - Use `console.log()` inside workers for debugging
   - Chrome DevTools has dedicated Workers panel
   - Test on various devices with different CPU capabilities

5. **Security Considerations:**
   - Workers follow same-origin policy
   - Be cautious with data passed to workers
   - Validate all messages between threads

### Q3: Explain the Fetch API and how it compares to XMLHttpRequest.
**Difficulty: Medium**

**Answer:**
The Fetch API provides a modern, promise-based interface for making HTTP requests in JavaScript. It offers a more powerful and flexible feature set compared to the older XMLHttpRequest (XHR) object.

**Basic Usage:**

```javascript
// Simple GET request
fetch('https://api.example.com/data')
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse JSON response
  })
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

**Advanced Configuration:**

```javascript
// POST request with various options
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  }),
  credentials: 'include', // Include cookies
  mode: 'cors', // Cross-origin resource sharing mode
  cache: 'no-cache', // Cache control
  redirect: 'follow', // Handle redirects
  referrerPolicy: 'no-referrer', // Control the Referer header
  signal: abortController.signal // For request cancellation
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

**Working with Response Objects:**

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // Response properties
    console.log('Status:', response.status); // HTTP status code
    console.log('OK?', response.ok); // true if status is 200-299
    console.log('Status text:', response.statusText);
    console.log('Headers:', response.headers);
    console.log('URL:', response.url);
    console.log('Type:', response.type); // basic, cors, etc.
    
    // Response methods (each returns a Promise)
    // Choose ONE of these methods to read the body
    return response.json(); // Parse as JSON
    // return response.text(); // Read as text
    // return response.blob(); // Read as binary data
    // return response.formData(); // Parse as FormData
    // return response.arrayBuffer(); // Read as ArrayBuffer
  })
  .then(data => {
    // Process the data
  });
```

**Handling Different Response Types:**

```javascript
// Function to handle different response types
async function fetchData(url, responseType = 'json') {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    switch (responseType) {
      case 'json':
        return await response.json();
      case 'text':
        return await response.text();
      case 'blob':
        return await response.blob();
      case 'formData':
        return await response.formData();
      case 'arrayBuffer':
        return await response.arrayBuffer();
      default:
        return await response.json();
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Usage
async function loadImage() {
  try {
    const imageBlob = await fetchData('https://example.com/image.jpg', 'blob');
    const imageUrl = URL.createObjectURL(imageBlob);
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    document.body.appendChild(imgElement);
  } catch (error) {
    console.error('Failed to load image:', error);
  }
}
```

**Request Cancellation with AbortController:**

```javascript
function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const { signal } = controller;
  
  // Set up timeout
  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  return fetch(url, { ...options, signal })
    .then(response => {
      clearTimeout(timeout);
      return response;
    })
    .catch(error => {
      clearTimeout(timeout);
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeoutMs}ms`);
      }
      throw error;
    });
}

// Usage
fetchWithTimeout('https://api.example.com/data', {}, 3000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Streaming Responses:**

```javascript
async function streamResponse() {
  try {
    const response = await fetch('https://api.example.com/large-data');
    
    // Get a reader from the response body stream
    const reader = response.body.getReader();
    
    // Read the stream
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        console.log('Stream complete');
        break;
      }
      
      // value is a Uint8Array
      console.log('Received chunk of data:', value.length);
      processChunk(value);
    }
  } catch (error) {
    console.error('Stream error:', error);
  }
}

function processChunk(chunk) {
  // Process each chunk of data as it arrives
  // For example, update a progress bar or display partial results
}
```

**Uploading Files:**

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  
  try {
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

// Usage with file input
document.getElementById('fileInput').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const result = await uploadFile(file);
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }
});
```

**Comparison with XMLHttpRequest:**

| Feature | Fetch API | XMLHttpRequest |
|---------|-----------|----------------|
| **API Design** | Promise-based, modern | Callback-based, older |
| **Syntax** | Clean, concise | More verbose |
| **Error Handling** | Promise catch blocks | onerror callbacks |
| **Streaming** | Supports streaming | Limited support |
| **Progress Events** | Limited built-in support | Built-in progress events |
| **Request Cancellation** | Via AbortController | Via xhr.abort() |
| **CORS** | More seamless handling | Requires more configuration |
| **Timeout Control** | Manual implementation | Built-in xhr.timeout |
| **Synchronous Requests** | Not supported | Supported (but discouraged) |
| **Browser Support** | Modern browsers | All browsers including legacy |

**XMLHttpRequest Example (for comparison):**

```javascript
// Equivalent XMLHttpRequest code
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open(method, url);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(`HTTP error! Status: ${xhr.status}`));
      }
    };
    
    xhr.onerror = function() {
      reject(new Error('Network error'));
    };
    
    xhr.ontimeout = function() {
      reject(new Error('Request timed out'));
    };
    
    xhr.timeout = 5000; // 5 seconds
    
    // Progress tracking (not available in Fetch)
    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log(`Upload progress: ${percentComplete.toFixed(2)}%`);
      }
    };
    
    if (data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}

// Usage
makeRequest('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**When to Use Fetch vs. XMLHttpRequest:**

**Use Fetch when:**
- Building modern applications
- Working with promises and async/await
- Need for a cleaner API with less code
- Streaming responses is important
- Working with service workers

**Use XMLHttpRequest when:**
- Need to support older browsers without polyfills
- Detailed progress monitoring is required
- Need for synchronous requests (though rarely recommended)
- Working with existing code that uses XHR

**Best Practices with Fetch API:**

1. **Always check response.ok:**
```javascript
fetch('/api/data')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => console.log(data));
```

2. **Handle network errors properly:**
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.error('Fetch error:', error);
    // Show user-friendly error message
    displayErrorMessage('Failed to load data. Please try again later.');
  });
```

3. **Set appropriate request timeouts:**
```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

fetch('/api/data', { signal: controller.signal })
  .then(response => {
    clearTimeout(timeoutId);
    return response.json();
  })
  .catch(error => {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.log('Request timed out');
    } else {
      console.error('Fetch error:', error);
    }
  });
```

4. **Create reusable fetch utilities:**
```javascript
const api = {
  async request(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      credentials: 'include'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    if (options.body && typeof options.body === 'object') {
      mergedOptions.body = JSON.stringify(options.body);
    }
    
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      const error = new Error(`HTTP error! Status: ${response.status}`);
      error.response = response;
      throw error;
    }
    
    return response.json();
  },
  
  get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  },
  
  post(url, data, options = {}) {
    return this.request(url, { ...options, method: 'POST', body: data });
  },
  
  put(url, data, options = {}) {
    return this.request(url, { ...options, method: 'PUT', body: data });
  },
  
  delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
};

// Usage
async function getUserData(userId) {
  try {
    return await api.get(`/api/users/${userId}`);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
```

### Q4: Explain Service Workers and how they enable Progressive Web Applications (PWAs).
**Difficulty: Hard**

**Answer:**
Service Workers are a type of web worker that act as a programmable network proxy, allowing you to control how network requests from your page are handled. They run in a separate thread from the main JavaScript execution, enabling powerful features like offline functionality, background sync, push notifications, and resource caching—all essential components of Progressive Web Applications (PWAs).

**Service Worker Lifecycle:**

1. **Registration:**
```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
```

2. **Installation:**
```javascript
// Inside service-worker.js
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  
  // Optional: Force activation without waiting for existing instances to be closed
  // self.skipWaiting();
});
```

3. **Activation:**
```javascript
self.addEventListener('activate', event => {
  const cacheWhitelist = ['my-site-cache-v1'];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches that are not in the whitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Optional: Claim clients so the service worker takes control immediately
  // self.clients.claim();
});
```

4. **Fetch Handling:**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        
        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        });
      })
  );
});
```

**Caching Strategies:**

1. **Cache First (Offline First):**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
```

2. **Network First (Stale While Revalidate):**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response to store in cache
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
          
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
```

3. **Stale While Revalidate:**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        
        // Return the cached response if available, otherwise wait for the network response
        return response || fetchPromise;
      });
    })
  );
});
```

4. **Cache with Network Fallback (with timeout):**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    Promise.race([
      // Try network and set a timeout
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('timeout')), 3000);
        fetch(event.request).then(resolve, reject);
      }),
      // Try cache
      caches.match(event.request)
    ])
    .catch(() => {
      // If both fail, show offline page
      return caches.match('/offline.html');
    })
  );
});
```

**Background Sync:**

```javascript
// In your web app
document.querySelector('#submit-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.target);
  
  if (navigator.serviceWorker && 'SyncManager' in window) {
    navigator.serviceWorker.ready
      .then(registration => {
        // Store the form data in IndexedDB
        return saveFormDataToIndexedDB(data)
          .then(() => {
            // Register a sync event
            return registration.sync.register('submit-form');
          });
      })
      .then(() => {
        console.log('Form queued for background sync');
        showSuccessMessage('Your form will be submitted when you go online');
      })
      .catch(error => {
        console.error('Background sync registration failed:', error);
        // Fall back to regular form submission
        submitFormImmediately(data);
      });
  } else {
    // No service worker or sync support, submit immediately
    submitFormImmediately(data);
  }
});

// In your service worker
self.addEventListener('sync', event => {
  if (event.tag === 'submit-form') {
    event.waitUntil(
      getFormDataFromIndexedDB()
        .then(dataArray => {
          return Promise.all(
            dataArray.map(data => {
              return fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(response => {
                if (response.ok) {
                  // Remove from IndexedDB if successful
                  return removeFormDataFromIndexedDB(data.id);
                }
                throw new Error('Network response was not ok');
              });
            })
          );
        })
    );
  }
});
```

**Push Notifications:**

```javascript
// In your web app
function subscribeToPushNotifications() {
  navigator.serviceWorker.ready
    .then(registration => {
      // Check if subscription already exists
      return registration.pushManager.getSubscription()
        .then(subscription => {
          if (subscription) {
            return subscription;
          }
          
          // Get the server's public key
          return fetch('/api/vapid-public-key')
            .then(response => response.json())
            .then(data => {
              const vapidPublicKey = urlBase64ToUint8Array(data.publicKey);
              
              // Subscribe the user
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: vapidPublicKey
              });
            });
        });
    })
    .then(subscription => {
      // Send the subscription to your server
      return fetch('/api/save-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });
    })
    .then(response => {
      if (response.ok) {
        console.log('Push notification subscription saved');
      }
    })
    .catch(error => {
      console.error('Error subscribing to push notifications:', error);
    });
}

// Helper function to convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

// In your service worker
self.addEventListener('push', event => {
  let notificationData = {};
  
  try {
    notificationData = event.data.json();
  } catch (e) {
    notificationData = {
      title: 'New Notification',
      body: event.data ? event.data.text() : 'No payload',
      icon: '/images/icon.png'
    };
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: '/images/badge.png',
      data: notificationData.data || {},
      actions: notificationData.actions || []
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  const urlToOpen = event.notification.data.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        // Check if a window is already open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
```

**Service Worker Precaching with Workbox:**

Workbox is a set of libraries that simplifies service worker implementation:

```javascript
// service-worker.js using Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.setConfig({ debug: false });

// Cache page navigations
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
);

// Cache images with a Cache First strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
);

// Cache the Google Fonts stylesheets with a Stale While Revalidate strategy
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);

// Cache the Google Fonts webfont files with a Cache First strategy for 1 year
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30
      })
    ]
  })
);

// Background sync for form submissions
workbox.routing.registerRoute(
  ({ url }) => url.pathname === '/api/submit',
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.BackgroundSyncPlugin('formQueue', {
        maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
      })
    ]
  }),
  'POST'
);

// Precache static assets
workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/styles/main.css', revision: '1' },
  { url: '/scripts/main.js', revision: '1' },
  { url: '/images/logo.png', revision: '1' },
  { url: '/offline.html', revision: '1' }
]);
```

**Progressive Web App Features Enabled by Service Workers:**

1. **Offline Functionality:**
   - Caching critical assets during installation
   - Serving cached content when offline
   - Providing custom offline pages

2. **Improved Performance:**
   - Serving cached resources instantly
   - Implementing various caching strategies based on resource type
   - Precaching important resources

3. **Background Processing:**
   - Performing tasks in the background
   - Syncing data when connectivity is restored
   - Processing large data sets without blocking the main thread

4. **Push Notifications:**
   - Receiving push messages from a server
   - Displaying notifications to users
   - Handling notification clicks

5. **App-like Experience:**
   - Fast loading times from cache
   - Reliable performance regardless of network conditions
   - Smooth transitions between pages

**Web App Manifest for PWAs:**

A Web App Manifest is a JSON file that provides information about a web application, allowing it to be installed on a user's device:

```json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A fully featured Progressive Web Application",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196f3",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/images/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/images/screenshots/screenshot1.png",
      "sizes": "1280x720",
      "type": "image/png"
    },
    {
      "src": "/images/screenshots/screenshot2.png",
      "sizes": "1280x720",
      "type": "image/png"
    }
  ],
  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=com.example.app",
      "id": "com.example.app"
    }
  ],
  "prefer_related_applications": false,
  "shortcuts": [
    {
      "name": "Start New Chat",
      "short_name": "New Chat",
      "description": "Start a new conversation",
      "url": "/chat/new",
      "icons": [{ "src": "/images/icons/chat.png", "sizes": "192x192" }]
    },
    {
      "name": "View Profile",
      "short_name": "Profile",
      "description": "View your user profile",
      "url": "/profile",
      "icons": [{ "src": "/images/icons/profile.png", "sizes": "192x192" }]
    }
  ],
  "categories": ["productivity", "utilities"],
  "lang": "en-US",
  "dir": "ltr"
}
```

**Best Practices for Service Workers:**

1. **Progressive Enhancement:**
   - Always check for service worker support before registering
   - Provide fallbacks for browsers that don't support service workers

2. **Versioning:**
   - Version your cache names
   - Implement a strategy to clean up old caches during activation

3. **Scope Management:**
   - Be mindful of the service worker scope (determined by its location)
   - Place the service worker file at the root to control the entire site

4. **Performance Considerations:**
   - Don't cache everything—be strategic
   - Use different caching strategies for different types of resources
   - Implement cache size and age limits

5. **Debugging:**
   - Use Chrome DevTools' Application tab for debugging
   - Implement logging in development mode
   - Use `skipWaiting()` and `clients.claim()` during development for faster updates

6. **Security:**
   - Always serve service workers over HTTPS
   - Validate data received in push notifications
   - Be careful with caching sensitive information

7. **Testing:**
   - Test offline functionality regularly
   - Test on various devices and browsers
   - Use Lighthouse to audit your PWA

**Limitations of Service Workers:**

1. **Browser Support:**
   - Not supported in all browsers (particularly older versions)
   - Features like Background Sync and Push have varying support

2. **Scope Restrictions:**
   - Service workers can only control pages within their scope
   - Cannot access DOM directly

3. **No Access to:**
   - `window` object
   - `document` object
   - Synchronous XHR
   - `localStorage`

4. **Lifecycle Complexity:**
   - Understanding the installation, activation, and update processes
   - Managing version transitions

5. **Debugging Challenges:**
   - Running in a separate thread makes debugging more complex
   - Cache-related issues can be difficult to diagnose

### Q5: Explain the History API and how it enables client-side routing in single-page applications.
**Difficulty: Medium**

**Answer:**
The History API provides methods to manipulate the browser's session history stack, allowing developers to change the URL displayed in the browser without triggering a full page reload. This capability is fundamental to modern single-page applications (SPAs), enabling client-side routing that creates a smoother, more app-like user experience.

**Core Methods of the History API:**

1. **history.pushState():**
```javascript
history.pushState(stateObj, title, url);
```
- Adds a new entry to the browser's history stack
- `stateObj`: JavaScript object associated with the new history entry
- `title`: Currently ignored by most browsers (use empty string or document title)
- `url`: The new URL to display in the address bar (must be same-origin)

2. **history.replaceState():**
```javascript
history.replaceState(stateObj, title, url);
```
- Similar to pushState, but replaces the current history entry instead of adding a new one
- Useful for updating the URL without creating a new history entry

3. **history.state:**
```javascript
const currentState = history.state;
```
- Returns the current state object

4. **Navigation Methods:**
```javascript
history.back();     // Equivalent to clicking the browser's back button
history.forward();  // Equivalent to clicking the browser's forward button
history.go(-2);     // Navigate back 2 pages
history.go(1);      // Navigate forward 1 page
```

**The popstate Event:**

```javascript
window.addEventListener('popstate', event => {
  // event.state contains the state object passed to pushState or replaceState
  console.log('Navigation occurred, new state:', event.state);
  
  // Handle the navigation (e.g., render the appropriate view)
  if (event.state && event.state.page) {
    renderPage(event.state.page);
  }
});
```

**Important:** The `popstate` event is only triggered when navigating through history (back/forward buttons) or using `history.back()`, `history.forward()`, or `history.go()`. It is **not** triggered by `pushState()` or `replaceState()`.

**Basic Client-Side Router Implementation:**

```javascript
class Router {
  constructor(routes) {
    this.routes = routes;
    
    // Handle initial route
    this.handleLocation();
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', this.handleLocation.bind(this));
    
    // Intercept link clicks for client-side routing
    document.addEventListener('click', e => {
      if (e.target.matches('a')) {
        const href = e.target.getAttribute('href');
        
        // Only handle internal links
        if (href.startsWith('/')) {
          e.preventDefault();
          this.navigate(href);
        }
      }
    });
  }
  
  handleLocation() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['404'];
    
    // Render the appropriate component/view
    const mainContent = document.getElementById('app');
    mainContent.innerHTML = '';
    mainContent.appendChild(route());
    
    // Update page title if needed
    document.title = route.title || 'My SPA';
  }
  
  navigate(path) {
    // Update the URL
    history.pushState({ path }, '', path);
    
    // Render the new route
    this.handleLocation();
  }
}

// Usage
const routes = {
  '/': () => {
    const element = document.createElement('div');
    element.innerHTML = '<h1>Home Page</h1><p>Welcome to our SPA!</p>';
    return element;
  },
  '/about': () => {
    const element = document.createElement('div');
    element.innerHTML = '<h1>About Us</h1><p>Learn about our company.</p>';
    return element;
  },
  '/contact': () => {
    const element = document.createElement('div');
    element.innerHTML = '<h1>Contact</h1><p>Get in touch with us.</p>';
    return element;
  },
  '404': () => {
    const element = document.createElement('div');
    element.innerHTML = '<h1>404</h1><p>Page not found.</p>';
    return element;
  }
};

// Initialize the router
const router = new Router(routes);

// Navigation buttons
document.getElementById('home-btn').addEventListener('click', () => router.navigate('/'));
document.getElementById('about-btn').addEventListener('click', () => router.navigate('/about'));
document.getElementById('contact-btn').addEventListener('click', () => router.navigate('/contact'));
```

**More Advanced Router with Parameters:**

```javascript
class AdvancedRouter {
  constructor() {
    this.routes = [];
    this.notFoundHandler = () => {
      const element = document.createElement('div');
      element.innerHTML = '<h1>404</h1><p>Page not found.</p>';
      return element;
    };
    
    // Handle initial route
    window.addEventListener('DOMContentLoaded', () => this.handleLocation());
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => this.handleLocation());
  }
  
  addRoute(path, handler) {
    // Convert path pattern to regex for parameter matching
    const paramNames = [];
    const pattern = path
      .replace(/\/\//g, '\/')
      .replace(/:(\w+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '([^\\/]+)';
      });
    
    const regex = new RegExp(`^${pattern}$`);
    
    this.routes.push({
      regex,
      paramNames,
      handler
    });
    
    return this;
  }
  
  setNotFound(handler) {
    this.notFoundHandler = handler;
    return this;
  }
  
  handleLocation() {
    const path = window.location.pathname;
    
    // Find matching route
    for (const route of this.routes) {
      const match = path.match(route.regex);
      
      if (match) {
        // Extract parameters
        const params = {};
        match.slice(1).forEach((value, i) => {
          params[route.paramNames[i]] = value;
        });
        
        // Get state from history API
        const state = history.state || {};
        
        // Render the route with parameters
        const mainContent = document.getElementById('app');
        mainContent.innerHTML = '';
        mainContent.appendChild(route.handler(params, state));
        return;
      }
    }
    
    // No route matched, show 404
    const mainContent = document.getElementById('app');
    mainContent.innerHTML = '';
    mainContent.appendChild(this.notFoundHandler());
  }
  
  navigate(path, state = {}) {
    history.pushState(state, '', path);
    this.handleLocation();
  }
  
  replace(path, state = {}) {
    history.replaceState(state, '', path);
    this.handleLocation();
  }
}

// Usage
const router = new AdvancedRouter();

router
  .addRoute('/', () => {
    const element = document.createElement('div');
    element.innerHTML = '<h1>Home</h1><p>Welcome to our SPA!</p>';
    return element;
  })
  .addRoute('/users/:id', (params, state) => {
    const element = document.createElement('div');
    element.innerHTML = `<h1>User Profile</h1><p>Viewing user ${params.id}</p>`;
    
    if (state.userData) {
      element.innerHTML += `<p>Name: ${state.userData.name}</p>`;
    }
    
    return element;
  })
  .addRoute('/products/:category/:id', (params) => {
    const element = document.createElement('div');
    element.innerHTML = `
      <h1>Product Details</h1>
      <p>Category: ${params.category}</p>
      <p>Product ID: ${params.id}</p>
    `;
    return element;
  })
  .setNotFound(() => {
    const element = document.createElement('div');
    element.innerHTML = '<h1>404</h1><p>Page not found.</p>';
    return element;
  });

// Navigate with parameters and state
document.getElementById('view-user').addEventListener('click', () => {
  router.navigate('/users/123', {
    userData: { name: 'John Doe', email: 'john@example.com' }
  });
});

document.getElementById('view-product').addEventListener('click', () => {
  router.navigate('/products/electronics/456');
});
```

**Integration with Popular Frontend Frameworks:**

1. **React Router (React):**
```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/123">User Profile</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}
```

2. **Vue Router (Vue.js):**
```javascript
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users/:id', component: UserProfile, props: true },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// In UserProfile.vue component
export default {
  props: ['id'],
  methods: {
    goHome() {
      this.$router.push('/');
    }
  },
  template: `
    <div>
      <h1>User Profile</h1>
      <p>User ID: {{ id }}</p>
      <button @click="goHome">Go Home</button>
    </div>
  `
};
```

3. **Angular Router (Angular):**
```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  template: `
    <h1>User Profile</h1>
    <p>User ID: {{ userId }}</p>
    <button (click)="goHome()">Go Home</button>
  `
})
export class UserProfileComponent implements OnInit {
  userId: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
  
  goHome() {
    this.router.navigate(['/']);
  }
}
```

**Server-Side Considerations:**

When using the History API for client-side routing, the server must be configured to handle all routes properly:

1. **The server should serve the same HTML file for all routes:**
   - For Apache, use an .htaccess file:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   - For Nginx:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

   - For Express.js:
   ```javascript
   const express = require('express');
   const path = require('path');
   const app = express();
   
   // Serve static files
   app.use(express.static(path.join(__dirname, 'public')));
   
   // Handle all routes
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
   });
   
   app.listen(3000);
   ```

2. **Handling 404s:**
   - With client-side routing, 404 errors are typically handled by the client-side router
   - The server returns the main HTML file for all routes, and the client-side router determines if the route exists

**Best Practices:**

1. **Always provide fallbacks for browsers that don't support the History API:**
   ```javascript
   if (!window.history || !window.history.pushState) {
     // Use hash-based routing or full page reloads as fallback
   }
   ```

2. **Handle initial page load correctly:**
   - Ensure your router correctly handles the initial URL when the page first loads
   - Consider server-side rendering for better SEO and initial load performance

3. **Manage scroll position:**
   ```javascript
   // Scroll to top on navigation
   function navigate(path) {
     history.pushState(null, '', path);
     window.scrollTo(0, 0);
     renderRoute(path);
   }
   
   // Or restore scroll position for back/forward navigation
   window.addEventListener('popstate', (event) => {
     if (event.state && event.state.scrollY) {
       setTimeout(() => {
         window.scrollTo(0, event.state.scrollY);
       }, 0);
     } else {
       window.scrollTo(0, 0);
     }
     renderRoute(window.location.pathname);
   });
   
   // Save scroll position before navigation
   function navigateWithScroll(path) {
     const currentScroll = window.scrollY;
     history.pushState({ scrollY: currentScroll }, '', path);
     window.scrollTo(0, 0);
     renderRoute(path);
   }
   ```

4. **Handle browser refresh properly:**
   - Ensure your application state can be reconstructed from the URL
   - Consider storing additional state in localStorage if needed

5. **Use canonical URLs:**
   ```html
   <link rel="canonical" href="https://example.com/current-page" />
   ```

**Comparison with Hash-Based Routing:**

| Feature | History API Routing | Hash-Based Routing |
|---------|--------------------|-----------------|
| URL Format | `/users/123` | `/#/users/123` |
| Server Configuration | Requires special configuration | Works without server changes |
| SEO | Better (clean URLs) | Worse (hash fragments aren't sent to server) |
| Browser Support | Modern browsers only | All browsers |
| Server Requests | Server receives the full path | Server only receives the part before the hash |
| Bookmarking | Works normally | Works, but URLs are less clean |
| Analytics | Standard tracking works | Requires custom tracking setup |

**Limitations and Considerations:**

1. **Same-Origin Restriction:**
   - `pushState()` and `replaceState()` can only modify URLs within the same origin
   - Attempting to navigate to a different domain will cause an error

2. **SEO Challenges:**
   - Search engines have improved at handling SPAs, but server-side rendering or pre-rendering is still recommended for optimal SEO

3. **Initial Load Performance:**
   - SPAs may have longer initial load times as they need to load the entire application before rendering
   - Consider code splitting and lazy loading to improve performance

4. **Accessibility:**
   - Ensure proper focus management during navigation
   - Announce route changes for screen readers
   ```javascript
   function announceRouteChange(newPageTitle) {
     const announcer = document.getElementById('route-announcer');
     announcer.textContent = `Navigated to ${newPageTitle}`;
   }
   ```

### Q6: Explain the Geolocation API and how to implement location-based features in web applications.
**Difficulty: Medium**

**Answer:**
The Geolocation API allows web applications to access a user's geographical location information. This browser API provides methods to determine the device's position (latitude, longitude, altitude, etc.) and can be used to create location-aware web applications such as maps, local search, and location-based services.

**Basic Usage:**

```javascript
// Check if Geolocation API is supported
if ('geolocation' in navigator) {
  // Get current position
  navigator.geolocation.getCurrentPosition(
    // Success callback
    position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Location: ${latitude}, ${longitude}`);
      
      // Do something with the location data
      displayMap(latitude, longitude);
    },
    // Error callback
    error => {
      console.error('Error getting location:', error.message);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error('User denied the request for geolocation');
          break;
        case error.POSITION_UNAVAILABLE:
          console.error('Location information is unavailable');
          break;
        case error.TIMEOUT:
          console.error('The request to get user location timed out');
          break;
        case error.UNKNOWN_ERROR:
          console.error('An unknown error occurred');
          break;
      }
    },
    // Options
    {
      enableHighAccuracy: true, // Use GPS if available
      timeout: 5000,           // Time to wait for location (ms)
      maximumAge: 0            // Don't use cached position
    }
  );
} else {
  console.error('Geolocation is not supported by this browser');
}
```

**Continuous Location Tracking:**

```javascript
// Watch position (continuous tracking)
const watchId = navigator.geolocation.watchPosition(
  // Success callback
  position => {
    const { latitude, longitude, accuracy } = position.coords;
    console.log(`Updated location: ${latitude}, ${longitude} (accuracy: ${accuracy} meters)`);
    
    // Update map or other UI elements
    updateUserMarker(latitude, longitude);
  },
  // Error callback
  error => {
    console.error('Error tracking location:', error.message);
  },
  // Options
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
);

// Stop watching location when no longer needed
function stopTracking() {
  navigator.geolocation.clearWatch(watchId);
  console.log('Location tracking stopped');
}

// Example: Stop tracking after 5 minutes
setTimeout(stopTracking, 5 * 60 * 1000);
```

**Accessing Additional Geolocation Data:**

```javascript
navigator.geolocation.getCurrentPosition(position => {
  // Basic coordinates
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  // Additional data (may not be available on all devices)
  const accuracy = position.coords.accuracy;       // Accuracy in meters
  const altitude = position.coords.altitude;       // Height in meters (null if unavailable)
  const altitudeAccuracy = position.coords.altitudeAccuracy; // Accuracy of altitude
  const heading = position.coords.heading;         // Direction in degrees (0-360)
  const speed = position.coords.speed;             // Speed in meters/second
  
  // Timestamp of when the position was acquired
  const timestamp = position.timestamp;
  const positionTime = new Date(timestamp).toLocaleTimeString();
  
  console.log(`Position acquired at ${positionTime}`);
  console.log(`Coordinates: ${latitude}, ${longitude} (±${accuracy}m)`);
  
  if (altitude !== null) {
    console.log(`Altitude: ${altitude}m (±${altitudeAccuracy}m)`);
  }
  
  if (heading !== null) {
    console.log(`Heading: ${heading}° from North`);
  }
  
  if (speed !== null) {
    console.log(`Speed: ${speed} m/s (${(speed * 3.6).toFixed(1)} km/h)`);
  }
});
```

**Handling Permissions:**

```javascript
async function checkGeolocationPermission() {
  // For browsers that support the Permissions API
  if ('permissions' in navigator) {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      
      switch (permissionStatus.state) {
        case 'granted':
          console.log('Permission to use geolocation has been granted');
          return true;
        case 'prompt':
          console.log('Permission to use geolocation will be requested');
          return 'prompt';
        case 'denied':
          console.log('Permission to use geolocation has been denied');
          return false;
      }
      
      // Listen for permission changes
      permissionStatus.addEventListener('change', () => {
        console.log(`Geolocation permission changed to: ${permissionStatus.state}`);
      });
      
    } catch (error) {
      console.error('Error checking geolocation permission:', error);
      return 'unknown';
    }
  } else {
    // Fallback for browsers without Permissions API
    return 'unknown';
  }
}

// Usage
async function initializeGeolocation() {
  const permission = await checkGeolocationPermission();
  
  if (permission === true) {
    // Permission already granted, get location
    getLocation();
  } else if (permission === 'prompt') {
    // Show UI explaining why we need location
    showLocationExplanation();
  } else if (permission === false) {
    // Show instructions on how to enable location
    showEnableLocationInstructions();
  } else {
    // Unknown permission state, try getting location anyway
    getLocation();
  }
}

function showLocationExplanation() {
  const explanation = document.getElementById('location-explanation');
  explanation.style.display = 'block';
  
  document.getElementById('allow-location-btn').addEventListener('click', () => {
    explanation.style.display = 'none';
    getLocation();
  });
}

function showEnableLocationInstructions() {
  document.getElementById('enable-location-instructions').style.display = 'block';
}
```

**Implementing a Distance Calculator:**

```javascript
// Calculate distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
           Math.cos(φ1) * Math.cos(φ2) *
           Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance; // Distance in meters
}

// Example: Calculate distance between user and a point of interest
function distanceToPointOfInterest(poiLat, poiLon) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        
        const distance = calculateDistance(userLat, userLon, poiLat, poiLon);
        
        // Format the distance for display
        let formattedDistance;
        if (distance < 1000) {
          formattedDistance = `${Math.round(distance)} meters`;
        } else {
          formattedDistance = `${(distance / 1000).toFixed(2)} km`;
        }
        
        resolve({
          distance,
          formattedDistance,
          userLocation: { lat: userLat, lon: userLon }
        });
      },
      error => {
        reject(error);
      }
    );
  });
}

// Usage
async function showNearbyPlaces() {
  const coffeeShop = { name: 'Coffee Shop', lat: 40.7128, lon: -74.0060 };
  
  try {
    const result = await distanceToPointOfInterest(coffeeShop.lat, coffeeShop.lon);
    console.log(`${coffeeShop.name} is ${result.formattedDistance} away from you`);
    
    // Check if within 1km
    if (result.distance < 1000) {
      showSpecialOffer(coffeeShop.name);
    }
  } catch (error) {
    console.error('Could not calculate distance:', error);
  }
}
```

**Integrating with Mapping Libraries:**

```javascript
// Using Leaflet.js as an example
function initMap() {
  // Create a map centered at a default location
  const map = L.map('map').setView([51.505, -0.09], 13);
  
  // Add tile layer (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Get user's location and center the map
  navigator.geolocation.getCurrentPosition(
    position => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      
      // Center map on user's location
      map.setView([userLat, userLon], 15);
      
      // Add a marker for the user's location
      const userMarker = L.marker([userLat, userLon])
        .addTo(map)
        .bindPopup('You are here')
        .openPopup();
      
      // Add accuracy circle
      const accuracyCircle = L.circle([userLat, userLon], {
        radius: position.coords.accuracy,
        color: 'blue',
        fillColor: '#3388ff',
        fillOpacity: 0.2
      }).addTo(map);
      
      // Find nearby points of interest
      fetchNearbyPlaces(userLat, userLon)
        .then(places => {
          places.forEach(place => {
            L.marker([place.lat, place.lon])
              .addTo(map)
              .bindPopup(`<b>${place.name}</b><br>${place.description}`);
          });
        });
    },
    error => {
      console.error('Error getting location:', error);
      alert('Could not get your location. Using default location instead.');
    }
  );
  
  return map;
}

// Simulate fetching nearby places from an API
function fetchNearbyPlaces(lat, lon) {
  // In a real app, this would be an API call
  return Promise.resolve([
    { name: 'Coffee Shop', description: 'Great coffee', lat: lat + 0.002, lon: lon + 0.001 },
    { name: 'Restaurant', description: 'Delicious food', lat: lat - 0.001, lon: lon + 0.003 },
    { name: 'Park', description: 'Beautiful park', lat: lat + 0.003, lon: lon - 0.002 }
  ]);
}
```

**Implementing Geofencing:**

```javascript
class Geofence {
  constructor(name, centerLat, centerLon, radiusMeters, onEnter, onExit) {
    this.name = name;
    this.center = { lat: centerLat, lon: centerLon };
    this.radius = radiusMeters;
    this.onEnter = onEnter;
    this.onExit = onExit;
    this.isInside = false;
    this.watchId = null;
  }
  
  start() {
    if (this.watchId !== null) {
      console.warn('Geofence already started');
      return;
    }
    
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          this.center.lat,
          this.center.lon
        );
        
        const wasInside = this.isInside;
        this.isInside = distance <= this.radius;
        
        // Trigger events if state changed
        if (this.isInside && !wasInside) {
          this.onEnter(this.name, distance);
        } else if (!this.isInside && wasInside) {
          this.onExit(this.name, distance);
        }
      },
      error => {
        console.error('Geofence error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
    
    console.log(`Geofence "${this.name}" started`);
    return this;
  }
  
  stop() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      console.log(`Geofence "${this.name}" stopped`);
    }
    return this;
  }
}

// Usage
const storeGeofence = new Geofence(
  'Downtown Store',
  40.7128,  // latitude
  -74.0060, // longitude
  100,      // radius in meters
  (name, distance) => {
    console.log(`Welcome to ${name}!`);
    showWelcomeNotification();
  },
  (name, distance) => {
    console.log(`You left ${name}. Hope to see you again soon!`);
    sendFeedbackRequest();
  }
).start();

// Stop geofence when no longer needed
// storeGeofence.stop();
```

**Privacy and Best Practices:**

1. **Always request location only when necessary:**
```javascript
document.getElementById('find-nearby-btn').addEventListener('click', () => {
  // Only request location when user explicitly asks for it
  getLocation();
});
```

2. **Clearly communicate why you need location:**
```html
<div class="location-explanation">
  <p>We need your location to show you nearby stores and provide directions.</p>
  <p>Your location data is only used while you're using the app and is never stored on our servers.</p>
  <button id="allow-location-btn">Allow Location Access</button>
</div>
```

3. **Provide fallbacks for users who deny location access:**
```javascript
function handleLocationDenied() {
  // Show manual location input
  document.getElementById('manual-location-input').style.display = 'block';
  
  // Or use IP-based geolocation as a less accurate fallback
  fetchIPBasedLocation()
    .then(location => {
      console.log('Using approximate location from IP:', location);
      showApproximateLocationNotice();
      initializeWithLocation(location);
    });
}
```

4. **Respect battery life with appropriate settings:**
```javascript
// For high-precision but battery-intensive tracking
const highPrecisionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// For battery-friendly tracking
const batterySavingOptions = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 60000 // Accept positions up to 1 minute old
};

// Adjust based on application needs
const trackingOptions = isHighPrecisionRequired() ? 
  highPrecisionOptions : batterySavingOptions;
```

**Browser Compatibility and Limitations:**

1. **Feature Detection:**
```javascript
function getLocationSupport() {
  const support = {
    basic: 'geolocation' in navigator,
    permissions: 'permissions' in navigator,
    highAccuracy: false, // Will be determined by testing
    secure: window.isSecureContext
  };
  
  // Geolocation API requires a secure context (HTTPS)
  if (!support.secure) {
    console.warn('Geolocation API requires a secure context (HTTPS)');
  }
  
  return support;
}
```

2. **Mobile vs. Desktop Differences:**
   - Mobile devices typically provide more accurate GPS-based locations
   - Desktop browsers often rely on IP-based or Wi-Fi-based location
   - Mobile devices may have additional battery considerations

3. **Accuracy Limitations:**
   - Indoor locations may have reduced accuracy
   - Urban environments with tall buildings can cause GPS reflections
   - Network-based geolocation can be very imprecise (city-level only)

**Real-World Applications:**

1. **Store Locator:**
```javascript
async function findNearestStores() {
  try {
    const position = await getCurrentPositionPromise();
    const { latitude, longitude } = position.coords;
    
    const stores = await fetchStoresFromAPI(latitude, longitude, 10); // 10km radius
    
    // Sort stores by distance
    stores.sort((a, b) => a.distance - b.distance);
    
    // Display stores
    displayStoresList(stores);
    displayStoresOnMap(stores, { lat: latitude, lon: longitude });
    
  } catch (error) {
    console.error('Error finding stores:', error);
    showLocationErrorMessage();
  }
}

// Helper function to promisify getCurrentPosition
function getCurrentPositionPromise(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
```

2. **Weather Application:**
```javascript
async function getLocalWeather() {
  try {
    const position = await getCurrentPositionPromise();
    const { latitude, longitude } = position.coords;
    
    const weatherData = await fetch(
      `https://api.weather.example/forecast?lat=${latitude}&lon=${longitude}&units=metric`
    ).then(response => response.json());
    
    displayWeather(weatherData);
    
  } catch (error) {
    console.error('Error getting weather:', error);
    showWeatherFallback();
  }
}
```

3. **Fitness Tracking:**
```javascript
class RunTracker {
  constructor() {
    this.isTracking = false;
    this.watchId = null;
    this.startTime = null;
    this.distance = 0;
    this.path = [];
    this.lastPosition = null;
  }
  
  start() {
    if (this.isTracking) return;
    
    this.isTracking = true;
    this.startTime = new Date();
    this.distance = 0;
    this.path = [];
    
    this.watchId = navigator.geolocation.watchPosition(
      this.handlePosition.bind(this),
      this.handleError.bind(this),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    
    // Keep screen on if possible
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen')
        .then(lock => this.wakeLock = lock)
        .catch(err => console.warn('Wake Lock not available', err));
    }
  }
  
  handlePosition(position) {
    const { latitude, longitude, accuracy } = position.coords;
    const timestamp = position.timestamp;
    
    // Only use positions with reasonable accuracy
    if (accuracy > 20) return; // Ignore if accuracy worse than 20 meters
    
    const newPosition = { lat: latitude, lon: longitude, time: timestamp };
    
    // Calculate distance if we have a previous position
    if (this.lastPosition) {
      const segmentDistance = calculateDistance(
        this.lastPosition.lat, this.lastPosition.lon,
        newPosition.lat, newPosition.lon
      );
      
      // Ignore unrealistic movements (potential GPS errors)
      const timeDiff = (timestamp - this.lastPosition.time) / 1000; // seconds
      const speed = segmentDistance / timeDiff; // m/s
      
      if (speed < 10) { // Less than 36 km/h, reasonable for running/biking
        this.distance += segmentDistance;
        this.path.push(newPosition);
        this.updateUI();
      }
    } else {
      // First position
      this.path.push(newPosition);
    }
    
    this.lastPosition = newPosition;
  }
  
  handleError(error) {
    console.error('Tracking error:', error);
    alert('There was a problem tracking your location. Please check your GPS settings.');
  }
  
  stop() {
    if (!this.isTracking) return;
    
    navigator.geolocation.clearWatch(this.watchId);
    this.isTracking = false;
    this.watchId = null;
    
    const duration = (new Date() - this.startTime) / 1000; // seconds
    const result = {
      distance: this.distance,
      duration: duration,
      averageSpeed: this.distance / duration,
      path: this.path
    };
    
    // Release wake lock if we have one
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
    }
    
    return result;
  }
  
  updateUI() {
    const durationSeconds = (new Date() - this.startTime) / 1000;
    const durationFormatted = formatDuration(durationSeconds);
    const distanceKm = (this.distance / 1000).toFixed(2);
    const paceMinPerKm = durationSeconds / 60 / (this.distance / 1000);
    
    document.getElementById('tracking-distance').textContent = `${distanceKm} km`;
    document.getElementById('tracking-duration').textContent = durationFormatted;
    document.getElementById('tracking-pace').textContent = `${formatPace(paceMinPerKm)} min/km`;
  }
}

function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatPace(minPerKm) {
  const mins = Math.floor(minPerKm);
  const secs = Math.floor((minPerKm - mins) * 60);
  
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
```

### Q7: Explain WebRTC (Web Real-Time Communication) and how to implement peer-to-peer communication in web applications.
**Difficulty: Hard**

**Answer:**
WebRTC (Web Real-Time Communication) is an open-source project and collection of APIs that enables real-time communication directly between browsers without requiring plugins or native apps. It allows web applications to establish peer-to-peer connections for sharing audio, video, and data directly between clients, reducing latency and server load.

**Core Components of WebRTC:**

1. **MediaStream (getUserMedia)**: Accesses the user's camera and microphone
2. **RTCPeerConnection**: Establishes and manages the peer-to-peer connection
3. **RTCDataChannel**: Enables bidirectional data transfer between peers

**Basic WebRTC Architecture:**

```
┌────────────┐                                  ┌────────────┐
│            │                                  │            │
│  Browser A │                                  │  Browser B │
│            │                                  │            │
└─────┬──────┘                                  └──────┬─────┘
      │                                                │
      │  ┌────────────────────────────────────┐       │
      │  │                                    │       │
      └──┤  Signaling Server (e.g., WebSocket)├───────┘
         │                                    │
         └────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │                                    │
         │  STUN/TURN Servers (NAT traversal) │
         │                                    │
         └────────────────────────────────────┘
```

**Basic Implementation Steps:**

1. **Setting Up a Simple Video Call:**

```javascript
// 1. Access media devices
async function startVideoCall() {
  try {
    // Get local media stream (camera and microphone)
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    
    // Display local video
    const localVideo = document.getElementById('localVideo');
    localVideo.srcObject = localStream;
    
    // Initialize peer connection
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // Free public STUN server
        // Add TURN servers for production environments
      ]
    });
    
    // Add local tracks to the peer connection
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });
    
    // Handle incoming remote tracks
    peerConnection.ontrack = event => {
      const remoteVideo = document.getElementById('remoteVideo');
      if (remoteVideo.srcObject !== event.streams[0]) {
        remoteVideo.srcObject = event.streams[0];
        console.log('Received remote stream');
      }
    };
    
    // Handle ICE candidates
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        // Send the candidate to the remote peer via signaling server
        sendToSignalingServer({
          type: 'ice-candidate',
          candidate: event.candidate
        });
      }
    };
    
    // Connection state changes
    peerConnection.onconnectionstatechange = event => {
      console.log('Connection state:', peerConnection.connectionState);
      switch(peerConnection.connectionState) {
        case 'connected':
          console.log('Peers connected!');
          break;
        case 'disconnected':
        case 'failed':
          console.log('Connection lost or failed');
          break;
        case 'closed':
          console.log('Connection closed');
          break;
      }
    };
    
    return peerConnection;
    
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
}

// 2. Create and send offer (caller)
async function createOffer(peerConnection) {
  try {
    // Create offer
    const offer = await peerConnection.createOffer();
    
    // Set local description
    await peerConnection.setLocalDescription(offer);
    
    // Send offer to remote peer via signaling server
    sendToSignalingServer({
      type: 'offer',
      offer: peerConnection.localDescription
    });
    
  } catch (error) {
    console.error('Error creating offer:', error);
  }
}

// 3. Handle offer and create answer (callee)
async function handleOfferAndCreateAnswer(peerConnection, offer) {
  try {
    // Set remote description based on received offer
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    
    // Create answer
    const answer = await peerConnection.createAnswer();
    
    // Set local description
    await peerConnection.setLocalDescription(answer);
    
    // Send answer to remote peer via signaling server
    sendToSignalingServer({
      type: 'answer',
      answer: peerConnection.localDescription
    });
    
  } catch (error) {
    console.error('Error creating answer:', error);
  }
}

// 4. Handle answer (caller)
async function handleAnswer(peerConnection, answer) {
  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  } catch (error) {
    console.error('Error handling answer:', error);
  }
}

// 5. Handle ICE candidate
async function handleIceCandidate(peerConnection, candidate) {
  try {
    if (candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  } catch (error) {
    console.error('Error adding ICE candidate:', error);
  }
}

// Placeholder for signaling server communication
function sendToSignalingServer(message) {
  // In a real implementation, this would send the message to a signaling server
  // For example, using WebSockets:
  // signalingSocket.send(JSON.stringify(message));
  console.log('Sending to signaling server:', message);
}
```

**Implementing a Signaling Server:**

WebRTC requires a signaling mechanism to exchange session information. Here's a simple implementation using Node.js and WebSockets:

```javascript
// server.js (Node.js with Express and Socket.io)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Store connected users
const users = {};

io.on('connection', socket => {
  console.log('User connected:', socket.id);
  
  // User joins a room
  socket.on('join-room', roomId => {
    socket.join(roomId);
    users[socket.id] = { roomId };
    
    // Notify others in the room
    socket.to(roomId).emit('user-connected', socket.id);
    
    console.log(`User ${socket.id} joined room ${roomId}`);
  });
  
  // Handle WebRTC signaling
  socket.on('offer', payload => {
    const { target, offer } = payload;
    socket.to(target).emit('offer', {
      from: socket.id,
      offer
    });
  });
  
  socket.on('answer', payload => {
    const { target, answer } = payload;
    socket.to(target).emit('answer', {
      from: socket.id,
      answer
    });
  });
  
  socket.on('ice-candidate', payload => {
    const { target, candidate } = payload;
    socket.to(target).emit('ice-candidate', {
      from: socket.id,
      candidate
    });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    const roomId = users[socket.id]?.roomId;
    if (roomId) {
      socket.to(roomId).emit('user-disconnected', socket.id);
      delete users[socket.id];
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Client-Side Integration with Signaling Server:**

```javascript
// client.js
const socket = io('/');
let peerConnection;
let localStream;
let remoteStream;

// Join a room
const roomId = 'room-123'; // In a real app, this could be from URL parameters
socket.emit('join-room', roomId);

// Initialize WebRTC
async function init() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    
    document.getElementById('localVideo').srcObject = localStream;
    
    // Create peer connection with STUN/TURN servers
    peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        // Add TURN servers for production
      ]
    });
    
    // Add local tracks to peer connection
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });
    
    // Handle remote tracks
    peerConnection.ontrack = event => {
      document.getElementById('remoteVideo').srcObject = event.streams[0];
      remoteStream = event.streams[0];
    };
    
    // Handle ICE candidates
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          target: remoteUserId, // This would be set when a user connects
          candidate: event.candidate
        });
      }
    };
    
  } catch (error) {
    console.error('Error initializing:', error);
  }
}

// Handle new user connection
socket.on('user-connected', userId => {
  console.log('New user connected:', userId);
  remoteUserId = userId;
  
  // Create and send offer
  createAndSendOffer(userId);
});

// Create and send offer
async function createAndSendOffer(targetUserId) {
  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    socket.emit('offer', {
      target: targetUserId,
      offer: peerConnection.localDescription
    });
    
  } catch (error) {
    console.error('Error creating offer:', error);
  }
}

// Handle incoming offer
socket.on('offer', async ({ from, offer }) => {
  try {
    remoteUserId = from;
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    
    socket.emit('answer', {
      target: from,
      answer: peerConnection.localDescription
    });
    
  } catch (error) {
    console.error('Error handling offer:', error);
  }
});

// Handle incoming answer
socket.on('answer', async ({ from, answer }) => {
  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  } catch (error) {
    console.error('Error handling answer:', error);
  }
});

// Handle ICE candidates
socket.on('ice-candidate', async ({ from, candidate }) => {
  try {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (error) {
    console.error('Error adding ICE candidate:', error);
  }
});

// Handle user disconnection
socket.on('user-disconnected', userId => {
  console.log('User disconnected:', userId);
  // Clean up resources if needed
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
```

**Implementing Data Channels for Text Chat:**

```javascript
let dataChannel;

// Create data channel (caller)
function createDataChannel(peerConnection) {
  dataChannel = peerConnection.createDataChannel('chat');
  setupDataChannel(dataChannel);
}

// Handle data channel (callee)
peerConnection.ondatachannel = event => {
  dataChannel = event.channel;
  setupDataChannel(dataChannel);
};

// Setup data channel event handlers
function setupDataChannel(channel) {
  channel.onopen = () => {
    console.log('Data channel is open');
    document.getElementById('chat-input').disabled = false;
  };
  
  channel.onclose = () => {
    console.log('Data channel is closed');
    document.getElementById('chat-input').disabled = true;
  };
  
  channel.onmessage = event => {
    // Display received message
    const message = event.data;
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'received-message';
    messageElement.textContent = `Peer: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  };
}

// Send message through data channel
function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (message && dataChannel && dataChannel.readyState === 'open') {
    // Send the message
    dataChannel.send(message);
    
    // Display sent message
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'sent-message';
    messageElement.textContent = `You: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Clear input
    input.value = '';
  }
}

// Add event listener to send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Add event listener for Enter key
document.getElementById('chat-input').addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
```

**File Sharing with WebRTC Data Channels:**

```javascript
// Send a file through data channel
async function sendFile() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a file');
    return;
  }
  
  if (!dataChannel || dataChannel.readyState !== 'open') {
    alert('Data channel is not open');
    return;
  }
  
  // Send file metadata first
  dataChannel.send(JSON.stringify({
    type: 'file-metadata',
    name: file.name,
    size: file.size,
    mimeType: file.type
  }));
  
  // Read and send the file in chunks
  const chunkSize = 16384; // 16KB chunks
  const reader = new FileReader();
  let offset = 0;
  
  reader.onload = event => {
    if (dataChannel.readyState === 'open') {
      dataChannel.send(event.target.result);
      offset += event.target.result.byteLength;
      
      // Update progress
      const progress = Math.min(100, Math.floor((offset / file.size) * 100));
      document.getElementById('send-progress').style.width = `${progress}%`;
      document.getElementById('send-progress-text').textContent = `${progress}%`;
      
      // Check if file has been completely sent
      if (offset < file.size) {
        readSlice(offset);
      } else {
        console.log('File sent successfully');
        // Send end of file marker
        dataChannel.send(JSON.stringify({ type: 'file-complete' }));
      }
    }
  };
  
  function readSlice(o) {
    const slice = file.slice(o, o + chunkSize);
    reader.readAsArrayBuffer(slice);
  }
  
  // Start reading the first slice
  readSlice(0);
}

// Handle receiving files
let receiveBuffer = [];
let receivedSize = 0;
let fileInfo = null;

// Update data channel message handler for file reception
channel.onmessage = event => {
  const data = event.data;
  
  // Check if the message is text or file data
  if (typeof data === 'string') {
    try {
      const message = JSON.parse(data);
      
      // Handle file metadata
      if (message.type === 'file-metadata') {
        console.log('Receiving file:', message.name);
        fileInfo = message;
        receiveBuffer = [];
        receivedSize = 0;
        
        // Show file reception UI
        document.getElementById('file-receive-name').textContent = message.name;
        document.getElementById('file-receive-container').style.display = 'block';
      }
      
      // Handle file completion
      else if (message.type === 'file-complete') {
        // Combine chunks into a single buffer
        const received = new Blob(receiveBuffer, { type: fileInfo.mimeType });
        receiveBuffer = [];
        
        // Create download link
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = URL.createObjectURL(received);
        downloadLink.download = fileInfo.name;
        downloadLink.textContent = `Download ${fileInfo.name}`;
        downloadLink.style.display = 'block';
        
        console.log(`File received successfully: ${fileInfo.name}`);
      }
      
      // Handle regular chat messages
      else {
        displayChatMessage(message, false);
      }
    } catch (e) {
      // Not JSON, treat as regular chat message
      displayChatMessage(data, false);
    }
  }
  // Handle binary data (file chunks)
  else {
    if (fileInfo) {
      receiveBuffer.push(data);
      receivedSize += data.byteLength;
      
      // Update progress
      const progress = Math.min(100, Math.floor((receivedSize / fileInfo.size) * 100));
      document.getElementById('receive-progress').style.width = `${progress}%`;
      document.getElementById('receive-progress-text').textContent = `${progress}%`;
    }
  }
};
```

**Advanced WebRTC Features:**

1. **Screen Sharing:**

```javascript
async function startScreenSharing() {
  try {
    // Get screen sharing stream
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    });
    
    // Replace video track
    const videoTrack = screenStream.getVideoTracks()[0];
    
    // Find the video sender in the peer connection
    const senders = peerConnection.getSenders();
    const videoSender = senders.find(sender => 
      sender.track && sender.track.kind === 'video'
    );
    
    if (videoSender) {
      await videoSender.replaceTrack(videoTrack);
    }
    
    // Update local video display
    document.getElementById('localVideo').srcObject = screenStream;
    
    // Handle the end of screen sharing
    videoTrack.onended = async () => {
      // Revert to camera
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const cameraTrack = cameraStream.getVideoTracks()[0];
      
      await videoSender.replaceTrack(cameraTrack);
      document.getElementById('localVideo').srcObject = cameraStream;
    };
    
  } catch (error) {
    console.error('Error starting screen sharing:', error);
  }
}
```

2. **Multi-Party Conferencing (Mesh Architecture):**

```javascript
// Simplified multi-party WebRTC (mesh architecture)
const peers = {};

// Handle new user connection
socket.on('user-connected', userId => {
  console.log('New user connected:', userId);
  
  // Create a new peer connection for this user
  const peerConnection = createPeerConnection(userId);
  peers[userId] = peerConnection;
  
  // Create and send offer
  createAndSendOffer(userId, peerConnection);
});

// Create peer connection for a specific user
function createPeerConnection(userId) {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  });
  
  // Add local tracks
  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });
  
  // Handle ICE candidates
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit('ice-candidate', {
        target: userId,
        candidate: event.candidate
      });
    }
  };
  
  // Create video element for this peer
  const videoElement = document.createElement('video');
  videoElement.id = `video-${userId}`;
  videoElement.autoplay = true;
  videoElement.playsInline = true;
  document.getElementById('videos-container').appendChild(videoElement);
  
  // Handle remote tracks
  peerConnection.ontrack = event => {
    videoElement.srcObject = event.streams[0];
  };
  
  return peerConnection;
}

// Handle user disconnection
socket.on('user-disconnected', userId => {
  console.log('User disconnected:', userId);
  
  // Close peer connection
  if (peers[userId]) {
    peers[userId].close();
    delete peers[userId];
  }
  
  // Remove video element
  const videoElement = document.getElementById(`video-${userId}`);
  if (videoElement) {
    videoElement.remove();
  }
});
```

**WebRTC Security Considerations:**

1. **Encryption:**
   - WebRTC media is encrypted by default using DTLS-SRTP
   - Data channels are encrypted using DTLS

2. **Permission Model:**
   - Access to camera and microphone requires explicit user permission
   - Screen sharing requires additional permission

3. **Best Practices:**
   - Always use HTTPS for your signaling server
   - Implement proper authentication for your signaling mechanism
   - Consider using a TURN server with authentication
   - Validate all signaling messages before processing

```javascript
// Example of validating signaling messages
socket.on('offer', async ({ from, offer }) => {
  // Validate the offer structure before processing
  if (!offer || !offer.type || !offer.sdp) {
    console.error('Invalid offer received');
    return;
  }
  
  // Validate the sender identity (in a real app, this would be more robust)
  if (!isValidUser(from)) {
    console.error('Offer received from unknown user');
    return;
  }
  
  // Process the offer
  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    // ... rest of the handler
  } catch (error) {
    console.error('Error handling offer:', error);
  }
});

// Example function to validate user
function isValidUser(userId) {
  // In a real app, this would check against authenticated users
  return Boolean(userId && typeof userId === 'string');
}
```

**Browser Compatibility and Limitations:**

1. **Feature Detection:**

```javascript
function checkWebRTCSupport() {
  const support = {
    webRTC: Boolean(window.RTCPeerConnection),
    getUserMedia: Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    screen: Boolean(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia),
    dataChannel: Boolean(window.RTCPeerConnection && 'createDataChannel' in RTCPeerConnection.prototype)
  };
  
  return support;
}

// Usage
const rtcSupport = checkWebRTCSupport();
if (!rtcSupport.webRTC) {
  showFallbackInterface('Your browser does not support WebRTC');
}
```

2. **Mobile Considerations:**
   - Battery usage can be high with continuous video streaming
   - Network transitions (WiFi to cellular) can disrupt connections
   - Implement bandwidth adaptation for varying network conditions

```javascript
// Example of setting bandwidth constraints
function limitBandwidth(peerConnection) {
  // Get the video sender
  const sender = peerConnection.getSenders().find(s => 
    s.track && s.track.kind === 'video'
  );
  
  if (sender) {
    const parameters = sender.getParameters();
    
    // Check if encodings array exists
    if (!parameters.encodings) {
      parameters.encodings = [{}];
    }
    
    // Set maximum bitrate (1.5 Mbps)
    parameters.encodings[0].maxBitrate = 1500000;
    
    // Apply the changes
    return sender.setParameters(parameters);
  }
  
  return Promise.resolve();
}
```

**Best Practices for WebRTC Applications:**

1. **Connection Management:**
   - Implement reconnection logic for dropped connections
   - Handle ICE failures gracefully
   - Monitor connection quality and adapt accordingly

2. **User Experience:**
   - Provide clear feedback on connection status
   - Implement mute/unmute and video on/off controls
   - Show network quality indicators

```javascript
// Example of connection quality monitoring
peerConnection.oniceconnectionstatechange = () => {
  const state = peerConnection.iceConnectionState;
  const qualityIndicator = document.getElementById('connection-quality');
  
  switch (state) {
    case 'checking':
      qualityIndicator.className = 'quality-connecting';
      qualityIndicator.textContent = 'Connecting...';
      break;
    case 'connected':
    case 'completed':
      qualityIndicator.className = 'quality-good';
      qualityIndicator.textContent = 'Good Connection';
      break;
    case 'disconnected':
      qualityIndicator.className = 'quality-poor';
      qualityIndicator.textContent = 'Poor Connection';
      attemptReconnection();
      break;
    case 'failed':
      qualityIndicator.className = 'quality-failed';
      qualityIndicator.textContent = 'Connection Failed';
      handleConnectionFailure();
      break;
    case 'closed':
      qualityIndicator.className = 'quality-closed';
      qualityIndicator.textContent = 'Connection Closed';
      break;
  }
};

// Monitor media statistics
function monitorConnectionStats() {
  const statsInterval = setInterval(async () => {
    if (!peerConnection) {
      clearInterval(statsInterval);
      return;
    }
    
    try {
      const stats = await peerConnection.getStats();
      let videoBitrate = 0;
      let videoPacketLoss = 0;
      let audioPacketLoss = 0;
      
      stats.forEach(report => {
        if (report.type === 'inbound-rtp' && report.kind === 'video') {
          // Calculate video bitrate
          if (report.bytesReceived && lastVideoStats && lastVideoStats.bytesReceived) {
            const bitrate = 8 * (report.bytesReceived - lastVideoStats.bytesReceived) / 
                           (report.timestamp - lastVideoStats.timestamp) * 1000;
            videoBitrate = Math.round(bitrate);
          }
          
          // Get packet loss
          if (report.packetsLost !== undefined) {
            videoPacketLoss = report.packetsLost;
          }
          
          lastVideoStats = report;
        }
        
        if (report.type === 'inbound-rtp' && report.kind === 'audio') {
          // Get audio packet loss
          if (report.packetsLost !== undefined) {
            audioPacketLoss = report.packetsLost;
          }
        }
      });
      
      // Update UI with stats
      document.getElementById('video-bitrate').textContent = `${videoBitrate} kbps`;
      document.getElementById('video-packet-loss').textContent = videoPacketLoss;
      document.getElementById('audio-packet-loss').textContent = audioPacketLoss;
      
    } catch (error) {
      console.error('Error getting stats:', error);
    }
  }, 1000);
}
```

3. **Fallback Mechanisms:**
   - Provide alternative communication methods when WebRTC fails
   - Consider using a relay server for challenging network environments

```javascript
function handleConnectionFailure() {
  // Show fallback UI
  document.getElementById('webrtc-container').style.display = 'none';
  document.getElementById('fallback-container').style.display = 'block';
  
  // Offer alternative communication method
  document.getElementById('fallback-button').addEventListener('click', () => {
    // Example: Redirect to a server-relayed video solution
    window.location.href = `/fallback-video-chat?room=${roomId}&user=${userId}`;
  });
}
```

**Real-World Applications of WebRTC:**

1. **Video Conferencing Systems**
2. **Live Streaming Platforms**
3. **Remote Assistance Applications**
4. **Gaming and Interactive Entertainment**
5. **IoT Device Communication**
6. **Remote Healthcare Consultations**

**Conclusion:**
WebRTC represents a powerful technology for building real-time communication applications directly in the browser. By understanding its core components, signaling requirements, and best practices, developers can create robust peer-to-peer applications that deliver high-quality audio, video, and data sharing experiences with minimal latency.

### Q8: Explain the Web Audio API and how to create advanced audio applications in the browser.
**Difficulty: Hard**

**Answer:**
The Web Audio API is a powerful, high-level JavaScript API for processing and synthesizing audio in web applications. It provides a flexible system for controlling audio on the web, enabling developers to create complex audio applications like music synthesizers, audio visualizers, spatial audio systems, and sound effects processors directly in the browser.

**Core Concepts of the Web Audio API:**

1. **Audio Context**: The central object that manages and processes all audio operations
2. **Audio Nodes**: Building blocks that process audio data (sources, effects, analyzers, destinations)
3. **Audio Routing**: Connecting nodes together to create an audio processing graph
4. **Modular Design**: Allows for complex audio processing chains with precise timing

**Basic Audio Graph Architecture:**

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │     │             │
│  Source     │────▶│  Effect     │────▶│  Analyzer   │────▶│ Destination │
│  Nodes      │     │  Nodes      │     │  Nodes      │     │ (Speakers)  │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Creating a Basic Audio Application:**

```javascript
// 1. Create an Audio Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// 2. Create a simple oscillator (sound source)
function playTone(frequency = 440, type = 'sine') {
  // Create an oscillator node
  const oscillator = audioContext.createOscillator();
  
  // Configure the oscillator
  oscillator.type = type; // 'sine', 'square', 'sawtooth', 'triangle'
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  // Create a gain node for volume control
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start silent
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1); // Fade in
  
  // Connect the nodes: oscillator -> gain -> destination
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Start the oscillator
  oscillator.start();
  
  // Stop the oscillator after 1 second with a fade out
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
  oscillator.stop(audioContext.currentTime + 1.1);
  
  return { oscillator, gainNode };
}

// Usage
document.getElementById('play-button').addEventListener('click', () => {
  // Resume audio context if it's suspended (needed for Chrome's autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Play an A note (440Hz)
  playTone(440, 'sine');
});
```

**Loading and Playing Audio Files:**

```javascript
async function loadAndPlayAudio(url) {
  try {
    // Fetch the audio file
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    
    // Decode the audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Create a buffer source node
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Create a gain node for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5; // 50% volume
    
    // Connect the nodes
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Play the audio
    source.start();
    
    return { source, gainNode };
    
  } catch (error) {
    console.error('Error loading audio:', error);
  }
}

// Usage
document.getElementById('play-sample').addEventListener('click', () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  loadAndPlayAudio('path/to/audio/file.mp3');
});
```

**Creating an Audio Visualizer:**

```javascript
function createAudioVisualizer(audioElement) {
  // Create an audio source from the HTML audio element
  const source = audioContext.createMediaElementSource(audioElement);
  
  // Create an analyzer node
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048; // Must be a power of 2
  const bufferLength = analyser.frequencyBinCount; // Half of fftSize
  const dataArray = new Uint8Array(bufferLength);
  
  // Connect the source to the analyzer and the destination
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  
  // Get the canvas and its context
  const canvas = document.getElementById('visualizer');
  const canvasCtx = canvas.getContext('2d');
  
  // Function to draw the visualization
  function draw() {
    // Request next animation frame
    requestAnimationFrame(draw);
    
    // Get the frequency data
    analyser.getByteFrequencyData(dataArray);
    
    // Clear the canvas
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the frequency bars
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] / 2;
      
      // Use the frequency data to determine color
      const r = dataArray[i] + 25;
      const g = 250 - dataArray[i];
      const b = 50;
      
      canvasCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      
      x += barWidth + 1;
    }
  }
  
  // Start the visualization
  draw();
  
  return { source, analyser };
}

// Usage
const audioElement = document.getElementById('audio-player');
document.getElementById('start-visualizer').addEventListener('click', () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  createAudioVisualizer(audioElement);
  audioElement.play();
});
```

**Creating a Simple Synthesizer:**

```javascript
class Synthesizer {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.7;
    this.masterGain.connect(this.audioContext.destination);
    
    // Add effects chain
    this.compressor = this.audioContext.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 30;
    this.compressor.ratio.value = 12;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;
    this.compressor.connect(this.masterGain);
    
    this.activeOscillators = {};
  }
  
  playNote(note, octave = 4) {
    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    // Calculate frequency using equal temperament
    // A4 = 440Hz, each semitone is a factor of 2^(1/12)
    const notes = { 'C': -9, 'C#': -8, 'D': -7, 'D#': -6, 'E': -5, 'F': -4, 'F#': -3, 'G': -2, 'G#': -1, 'A': 0, 'A#': 1, 'B': 2 };
    const semitoneOffset = notes[note];
    const octaveOffset = octave - 4; // A4 is the reference
    const frequency = 440 * Math.pow(2, (semitoneOffset / 12) + octaveOffset);
    
    // Create unique ID for this note
    const noteId = `${note}${octave}`;
    
    // Create oscillator
    const osc = this.audioContext.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    // Create envelope
    const envelope = this.audioContext.createGain();
    envelope.gain.setValueAtTime(0, this.audioContext.currentTime);
    envelope.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.05); // Attack
    
    // Create filter
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1500;
    filter.Q.value = 5;
    
    // Connect nodes: oscillator -> envelope -> filter -> compressor -> master
    osc.connect(envelope);
    envelope.connect(filter);
    filter.connect(this.compressor);
    
    // Start oscillator
    osc.start();
    
    // Store active oscillator and its envelope
    this.activeOscillators[noteId] = { osc, envelope, filter };
    
    return noteId;
  }
  
  releaseNote(noteId) {
    if (this.activeOscillators[noteId]) {
      const { osc, envelope } = this.activeOscillators[noteId];
      
      // Release envelope
      const now = this.audioContext.currentTime;
      envelope.gain.cancelScheduledValues(now);
      envelope.gain.setValueAtTime(envelope.gain.value, now);
      envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.5); // Release time
      
      // Stop oscillator after release
      osc.stop(now + 0.5);
      
      // Remove from active oscillators after release
      setTimeout(() => {
        delete this.activeOscillators[noteId];
      }, 500);
    }
  }
  
  setFilterFrequency(value) {
    // Update filter frequency for all active notes
    const minFreq = 50;
    const maxFreq = 15000;
    const frequency = minFreq * Math.pow(maxFreq / minFreq, value);
    
    Object.values(this.activeOscillators).forEach(({ filter }) => {
      filter.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    });
  }
  
  setFilterResonance(value) {
    // Update filter Q for all active notes
    const q = value * 30;
    
    Object.values(this.activeOscillators).forEach(({ filter }) => {
      filter.Q.setValueAtTime(q, this.audioContext.currentTime);
    });
  }
}

// Usage
const synth = new Synthesizer();

// Map keyboard keys to notes
const keyboardMapping = {
  'a': { note: 'C', octave: 4 },
  'w': { note: 'C#', octave: 4 },
  's': { note: 'D', octave: 4 },
  'e': { note: 'D#', octave: 4 },
  'd': { note: 'E', octave: 4 },
  'f': { note: 'F', octave: 4 },
  't': { note: 'F#', octave: 4 },
  'g': { note: 'G', octave: 4 },
  'y': { note: 'G#', octave: 4 },
  'h': { note: 'A', octave: 4 },
  'u': { note: 'A#', octave: 4 },
  'j': { note: 'B', octave: 4 },
  'k': { note: 'C', octave: 5 },
};

// Keep track of pressed keys
const pressedKeys = {};

// Add event listeners for keyboard
window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  
  // Check if key is mapped and not already pressed
  if (keyboardMapping[key] && !pressedKeys[key]) {
    const { note, octave } = keyboardMapping[key];
    const noteId = synth.playNote(note, octave);
    pressedKeys[key] = noteId;
    
    // Highlight the key on the virtual keyboard
    document.querySelector(`[data-note="${note}${octave}"]`)?.classList.add('active');
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  
  // Check if key is mapped and currently pressed
  if (keyboardMapping[key] && pressedKeys[key]) {
    const noteId = pressedKeys[key];
    synth.releaseNote(noteId);
    delete pressedKeys[key];
    
    // Remove highlight from the virtual keyboard
    const { note, octave } = keyboardMapping[key];
    document.querySelector(`[data-note="${note}${octave}"]`)?.classList.remove('active');
  }
});

// Add event listeners for filter controls
document.getElementById('filter-cutoff').addEventListener('input', (event) => {
  synth.setFilterFrequency(event.target.value);
});

document.getElementById('filter-resonance').addEventListener('input', (event) => {
  synth.setFilterResonance(event.target.value);
});
```

**Creating 3D Spatial Audio:**

```javascript
function createSpatialAudio(audioUrl) {
  // Create a listener (represents the user's position and orientation)
  const listener = audioContext.listener;
  
  // Set listener position (if using an older browser API)
  if (listener.positionX) {
    listener.positionX.value = 0;
    listener.positionY.value = 0;
    listener.positionZ.value = 0;
  } else {
    listener.setPosition(0, 0, 0);
  }
  
  // Set listener orientation (forward and up vectors)
  if (listener.forwardX) {
    listener.forwardX.value = 0;
    listener.forwardY.value = 0;
    listener.forwardZ.value = -1;
    listener.upX.value = 0;
    listener.upY.value = 1;
    listener.upZ.value = 0;
  } else {
    listener.setOrientation(0, 0, -1, 0, 1, 0);
  }
  
  // Load audio
  return fetch(audioUrl)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      // Create a panner node for 3D positioning
      const panner = audioContext.createPanner();
      panner.panningModel = 'HRTF'; // Head-related transfer function for realistic 3D audio
      panner.distanceModel = 'inverse';
      panner.refDistance = 1;
      panner.maxDistance = 10000;
      panner.rolloffFactor = 1;
      
      // Set initial position
      if (panner.positionX) {
        panner.positionX.value = 0;
        panner.positionY.value = 0;
        panner.positionZ.value = 0;
      } else {
        panner.setPosition(0, 0, 0);
      }
      
      // Create a buffer source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      // Connect nodes: source -> panner -> destination
      source.connect(panner);
      panner.connect(audioContext.destination);
      
      return { source, panner };
    });
}

// Usage: Create a sound that moves in 3D space
let soundObject;

document.getElementById('start-spatial').addEventListener('click', async () => {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  
  soundObject = await createSpatialAudio('path/to/sound.mp3');
  soundObject.source.loop = true;
  soundObject.source.start();
  
  // Animate the sound position in a circle around the listener
  let angle = 0;
  function animateSound() {
    // Calculate position on a circle
    const radius = 5;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    // Update panner position
    if (soundObject.panner.positionX) {
      soundObject.panner.positionX.value = x;
      soundObject.panner.positionZ.value = z;
    } else {
      soundObject.panner.setPosition(x, 0, z);
    }
    
    // Increment angle
    angle += 0.01;
    
    // Continue animation
    requestAnimationFrame(animateSound);
  }
  
  animateSound();
});
```

**Creating an Audio Worklet for Custom Audio Processing:**

Audio Worklets allow you to run custom audio processing code in a separate thread, providing low-latency audio processing capabilities.

1. First, create a worklet processor file (e.g., `noise-processor.js`):

```javascript
// noise-processor.js
class NoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.phase = 0;
    this.phaseIncrement = 0.01;
  }
  
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    
    for (let channel = 0; channel < output.length; ++channel) {
      const outputChannel = output[channel];
      
      for (let i = 0; i < outputChannel.length; ++i) {
        // Generate white noise
        outputChannel[i] = Math.random() * 2 - 1;
      }
    }
    
    // Return true to keep the processor alive
    return true;
  }
}

registerProcessor('noise-processor', NoiseProcessor);
```

2. Then, use the worklet in your main code:

```javascript
async function setupNoiseGenerator() {
  // Load and register the audio worklet
  await audioContext.audioWorklet.addModule('noise-processor.js');
  
  // Create a worklet node
  const noiseGenerator = new AudioWorkletNode(audioContext, 'noise-processor');
  
  // Create a gain node for volume control
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.1; // Low volume
  
  // Connect nodes
  noiseGenerator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  return { noiseGenerator, gainNode };
}

// Usage
document.getElementById('start-noise').addEventListener('click', async () => {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  
  const { gainNode } = await setupNoiseGenerator();
  
  // Add volume control
  document.getElementById('noise-volume').addEventListener('input', (event) => {
    gainNode.gain.value = event.target.value;
  });
});
```

**Creating a Multi-Track Recorder:**

```javascript
class AudioRecorder {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.tracks = [];
    this.isRecording = false;
    this.startTime = 0;
  }
  
  async createNewTrack() {
    try {
      // Get user media stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create a media stream source
      const source = this.audioContext.createMediaStreamSource(stream);
      
      // Create a recorder using MediaRecorder API
      const mediaRecorder = new MediaRecorder(stream);
      
      // Create an analyzer for visualization
      const analyzer = this.audioContext.createAnalyser();
      analyzer.fftSize = 2048;
      source.connect(analyzer);
      
      // Create a gain node for this track
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 1.0;
      
      // Store recorded chunks
      const audioChunks = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        // Create a blob from the recorded chunks
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        
        // Create an object URL for the blob
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Fetch and decode the audio data
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        
        // Update the track with the recorded buffer
        const trackIndex = this.tracks.findIndex(t => t.mediaRecorder === mediaRecorder);
        if (trackIndex !== -1) {
          this.tracks[trackIndex].buffer = audioBuffer;
          this.tracks[trackIndex].url = audioUrl;
        }
        
        // Notify that recording is complete
        this.onTrackRecorded && this.onTrackRecorded(trackIndex);
      };
      
      // Create a new track object
      const track = {
        source,
        mediaRecorder,
        analyzer,
        gainNode,
        buffer: null,
        url: null,
        stream,
        muted: false
      };
      
      // Add the track to the tracks array
      this.tracks.push(track);
      
      return this.tracks.length - 1; // Return the track index
      
    } catch (error) {
      console.error('Error creating track:', error);
      return -1;
    }
  }
  
  startRecording() {
    if (this.isRecording) return;
    
    this.isRecording = true;
    this.startTime = this.audioContext.currentTime;
    
    // Start recording on all tracks
    this.tracks.forEach(track => {
      if (track.mediaRecorder.state === 'inactive') {
        track.mediaRecorder.start();
      }
    });
  }
  
  stopRecording() {
    if (!this.isRecording) return;
    
    this.isRecording = false;
    
    // Stop recording on all tracks
    this.tracks.forEach(track => {
      if (track.mediaRecorder.state === 'recording') {
        track.mediaRecorder.stop();
      }
    });
  }
  
  playAllTracks() {
    // Create buffer sources for all tracks that have recorded audio
    const currentTime = this.audioContext.currentTime;
    
    this.tracks.forEach(track => {
      if (track.buffer) {
        // Create a buffer source
        const source = this.audioContext.createBufferSource();
        source.buffer = track.buffer;
        
        // Connect through the track's gain node
        source.connect(track.gainNode);
        track.gainNode.connect(this.audioContext.destination);
        
        // Start playback
        source.start(currentTime);
        
        // Store the source for potential stopping
        track.playbackSource = source;
      }
    });
  }
  
  stopAllPlayback() {
    this.tracks.forEach(track => {
      if (track.playbackSource) {
        track.playbackSource.stop();
        track.playbackSource = null;
      }
    });
  }
  
  muteTrack(trackIndex, mute) {
    if (trackIndex >= 0 && trackIndex < this.tracks.length) {
      const track = this.tracks[trackIndex];
      track.muted = mute;
      track.gainNode.gain.value = mute ? 0 : 1;
    }
  }
  
  setTrackVolume(trackIndex, volume) {
    if (trackIndex >= 0 && trackIndex < this.tracks.length) {
      const track = this.tracks[trackIndex];
      if (!track.muted) {
        track.gainNode.gain.value = volume;
      }
    }
  }
  
  exportMix() {
    // Create an offline audio context for rendering
    let maxDuration = 0;
    
    // Find the longest track duration
    this.tracks.forEach(track => {
      if (track.buffer && track.buffer.duration > maxDuration) {
        maxDuration = track.buffer.duration;
      }
    });
    
    if (maxDuration === 0) return null;
    
    // Create an offline context with the max duration
    const offlineContext = new OfflineAudioContext(
      2, // stereo output
      this.audioContext.sampleRate * maxDuration,
      this.audioContext.sampleRate
    );
    
    // Add all tracks to the offline context
    this.tracks.forEach(track => {
      if (track.buffer && !track.muted) {
        const source = offlineContext.createBufferSource();
        source.buffer = track.buffer;
        
        const gain = offlineContext.createGain();
        gain.gain.value = track.gainNode.gain.value;
        
        source.connect(gain);
        gain.connect(offlineContext.destination);
        
        source.start(0);
      }
    });
    
    // Render the audio
    return offlineContext.startRendering().then(renderedBuffer => {
      // Convert the rendered buffer to a WAV file
      const wavBlob = this.bufferToWave(renderedBuffer);
      return URL.createObjectURL(wavBlob);
    });
  }
  
  // Helper function to convert AudioBuffer to WAV Blob
  bufferToWave(buffer) {
    const numOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numOfChannels * 2;
    const sampleRate = buffer.sampleRate;
    
    // Create the buffer for the WAV file
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);
    
    // RIFF chunk descriptor
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    this.writeString(view, 8, 'WAVE');
    
    // FMT sub-chunk
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // subchunk1size
    view.setUint16(20, 1, true); // audio format (1 for PCM)
    view.setUint16(22, numOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numOfChannels * 2, true); // byte rate
    view.setUint16(32, numOfChannels * 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    
    // Data sub-chunk
    this.writeString(view, 36, 'data');
    view.setUint32(40, length, true);
    
    // Write the PCM samples
    const offset = 44;
    let pos = 0;
    
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset + pos, int16, true);
        pos += 2;
      }
    }
    
    return new Blob([view], { type: 'audio/wav' });
  }
  
  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
}

// Usage
const recorder = new AudioRecorder(audioContext);

// Create a new track
document.getElementById('add-track').addEventListener('click', async () => {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  
  const trackIndex = await recorder.createNewTrack();
  if (trackIndex !== -1) {
    // Create UI for the new track
    createTrackUI(trackIndex);
  }
});

// Start recording
document.getElementById('start-recording').addEventListener('click', () => {
  recorder.startRecording();
  document.getElementById('start-recording').disabled = true;
  document.getElementById('stop-recording').disabled = false;
});

// Stop recording
document.getElementById('stop-recording').addEventListener('click', () => {
  recorder.stopRecording();
  document.getElementById('start-recording').disabled = false;
  document.getElementById('stop-recording').disabled = true;
});

// Play all tracks
document.getElementById('play-all').addEventListener('click', () => {
  recorder.playAllTracks();
});

// Export mix
document.getElementById('export-mix').addEventListener('click', async () => {
  const mixUrl = await recorder.exportMix();
  if (mixUrl) {
    const downloadLink = document.getElementById('download-mix');
    downloadLink.href = mixUrl;
    downloadLink.download = 'mix.wav';
    downloadLink.style.display = 'block';
  }
});

// Helper function to create UI for a track
function createTrackUI(trackIndex) {
  const tracksContainer = document.getElementById('tracks-container');
  
  const trackDiv = document.createElement('div');
  trackDiv.className = 'track';
  trackDiv.dataset.trackIndex = trackIndex;
  
  // Create track controls
  const muteButton = document.createElement('button');
  muteButton.textContent = 'Mute';
  muteButton.addEventListener('click', () => {
    const isMuted = muteButton.classList.toggle('muted');
    recorder.muteTrack(trackIndex, isMuted);
    muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
  });
  
  const volumeSlider = document.createElement('input');
  volumeSlider.type = 'range';
  volumeSlider.min = '0';
  volumeSlider.max = '1';
  volumeSlider.step = '0.01';
  volumeSlider.value = '1';
  volumeSlider.addEventListener('input', () => {
    recorder.setTrackVolume(trackIndex, parseFloat(volumeSlider.value));
  });
  
  // Create canvas for visualization
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 50;
  
  // Add elements to track div
  trackDiv.appendChild(document.createTextNode(`Track ${trackIndex + 1}`));
  trackDiv.appendChild(muteButton);
  trackDiv.appendChild(volumeSlider);
  trackDiv.appendChild(canvas);
  
  // Add track div to container
  tracksContainer.appendChild(trackDiv);
  
  // Set up visualization
  const canvasCtx = canvas.getContext('2d');
  const analyzer = recorder.tracks[trackIndex].analyzer;
  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    
    analyzer.getByteTimeDomainData(dataArray);
    
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();
    
    const sliceWidth = canvas.width / bufferLength;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;
      
      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }
  
  drawVisualization();
}

// Set callback for when a track is recorded
recorder.onTrackRecorded = (trackIndex) => {
  console.log(`Track ${trackIndex + 1} recording complete`);
};
```

**Advanced Audio Processing with Convolution Reverb:**

```javascript
async function createReverbEffect(impulseResponseUrl) {
  // Fetch the impulse response file
  const response = await fetch(impulseResponseUrl);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  // Create a convolver node
  const convolver = audioContext.createConvolver();
  convolver.buffer = audioBuffer;
  
  // Create a dry/wet mix control
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();
  
  dryGain.gain.value = 0.5; // 50% dry signal
  wetGain.gain.value = 0.5; // 50% wet (reverb) signal
  
  // Create input and output gain nodes
  const inputGain = audioContext.createGain();
  const outputGain = audioContext.createGain();
  
  // Connect the nodes
  // Input -> inputGain -> [dryGain, convolver -> wetGain] -> outputGain -> Output
  inputGain.connect(dryGain);
  inputGain.connect(convolver);
  convolver.connect(wetGain);
  dryGain.connect(outputGain);
  wetGain.connect(outputGain);
  
  return {
    input: inputGain,
    output: outputGain,
    setDryWetRatio(dryWet) { // 0 = all dry, 1 = all wet
      dryGain.gain.value = 1 - dryWet;
      wetGain.gain.value = dryWet;
    }
  };
}

// Usage
async function setupReverbDemo() {
  // Create an oscillator for testing
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 220; // A3
  
  // Create an envelope
  const envelope = audioContext.createGain();
  envelope.gain.value = 0;
  
  // Create the reverb effect
  const reverb = await createReverbEffect('path/to/concert-hall.wav');
  
  // Connect the nodes
  oscillator.connect(envelope);
  envelope.connect(reverb.input);
  reverb.output.connect(audioContext.destination);
  
  // Start the oscillator
  oscillator.start();
  
  // Function to trigger a note with reverb
  function playNote() {
    const now = audioContext.currentTime;
    
    // Attack
    envelope.gain.cancelScheduledValues(now);
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.5, now + 0.01);
    
    // Decay and sustain
    envelope.gain.linearRampToValueAtTime(0.3, now + 0.3);
    
    // Release
    envelope.gain.linearRampToValueAtTime(0, now + 2);
  }
  
  // Add event listeners
  document.getElementById('play-reverb').addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    playNote();
  });
  
  document.getElementById('reverb-amount').addEventListener('input', (event) => {
    reverb.setDryWetRatio(parseFloat(event.target.value));
  });
  
  return { oscillator, envelope, reverb };
}

// Initialize the reverb demo
setupReverbDemo();
```

**Browser Compatibility and Limitations:**

1. **Feature Detection:**

```javascript
function checkWebAudioSupport() {
  const support = {
    webAudio: Boolean(window.AudioContext || window.webkitAudioContext),
    audioWorklet: Boolean(window.AudioContext && AudioContext.prototype.audioWorklet),
    mediaRecorder: Boolean(window.MediaRecorder),
    getUserMedia: Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  };
  
  return support;
}

// Usage
const audioSupport = checkWebAudioSupport();
if (!audioSupport.webAudio) {
  showFallbackInterface('Your browser does not support Web Audio API');
}
```

2. **Mobile Considerations:**
   - Audio playback may require user interaction first (autoplay restrictions)
   - Limited background audio processing on some mobile browsers
   - Performance considerations for complex audio graphs

```javascript
// Example of handling autoplay restrictions
document.addEventListener('click', function initAudioContext() {
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log('Audio context resumed successfully');
    });
  }
  document.removeEventListener('click', initAudioContext);
}, { once: true });
```

**Best Practices for Web Audio Applications:**

1. **Performance Optimization:**
   - Reuse audio nodes when possible instead of creating new ones
   - Disconnect unused nodes to free up resources
   - Use appropriate buffer sizes for different use cases
   - Consider using AudioWorklet for intensive processing

2. **User Experience:**
   - Always provide visual feedback for audio operations
   - Handle autoplay restrictions gracefully
   - Implement proper volume controls and mute options
   - Provide fallbacks for unsupported features

3. **Memory Management:**

```javascript
function cleanupAudioResources() {
  // Disconnect all nodes
  source.disconnect();
  gainNode.disconnect();
  analyser.disconnect();
  
  // Release references
  source = null;
  gainNode = null;
  analyser = null;
  
  // If you have any AudioBuffers, you can help GC by clearing references
  audioBuffer = null;
}
```

**Real-World Applications of Web Audio API:**

1. **Music Production Applications**
2. **Interactive Sound Installations**
3. **Audio Visualization Tools**
4. **Game Sound Engines**
5. **Speech Recognition and Processing**
6. **Virtual Instruments and Synthesizers**
7. **Audio Editing and Mixing Tools**

**Conclusion:**
The Web Audio API provides a powerful platform for creating sophisticated audio applications directly in the browser. By understanding its core concepts, node-based architecture, and advanced features, developers can create immersive audio experiences ranging from simple sound players to complex digital audio workstations, all running natively in modern web browsers.

### Q9: Explain IndexedDB and how to use it for client-side storage in web applications.
**Difficulty: Medium**

**Answer:**
IndexedDB is a low-level, transactional, client-side storage API that allows web applications to store and retrieve significant amounts of structured data, including files and blobs. Unlike localStorage, which is limited to storing simple key-value pairs, IndexedDB provides a robust solution for storing complex data structures and performing advanced queries.

**Core Concepts of IndexedDB:**

1. **Object Store-Based**: Similar to tables in relational databases, but stores JavaScript objects
2. **Schema-Free**: No predefined schema required, though you define object stores and indexes
3. **Transactional**: All operations are part of a transaction, ensuring data integrity
4. **Asynchronous API**: Non-blocking operations using promises or event callbacks
5. **Same-Origin Policy**: Data is restricted to the domain that created it
6. **Significant Storage Capacity**: Much larger than localStorage (typically several GB vs 5-10MB)

**Basic IndexedDB Operations:**

1. **Opening a Database:**

```javascript
function openDatabase() {
  return new Promise((resolve, reject) => {
    // Open (or create) the database
    const request = indexedDB.open('MyAppDatabase', 1);
    
    // Handle database upgrade (runs if database doesn't exist or version changes)
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create an object store (similar to a table)
      // If you want auto-incrementing IDs, pass { autoIncrement: true }
      const store = db.createObjectStore('users', { keyPath: 'id' });
      
      // Create indexes for searching
      store.createIndex('email', 'email', { unique: true });
      store.createIndex('name', 'name', { unique: false });
      
      console.log('Database setup complete');
    };
    
    // Handle success
    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
    
    // Handle errors
    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject('Error opening database');
    };
  });
}
```

2. **Adding Data:**

```javascript
async function addUser(user) {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      // Start a transaction
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      
      // Add the user object to the store
      const request = store.add(user);
      
      request.onsuccess = () => {
        resolve(request.result); // Returns the key of the added object
      };
      
      request.onerror = () => {
        reject('Error adding user: ' + request.error);
      };
      
      // Close the database when the transaction is complete
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
}

// Usage
addUser({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
}).then(key => {
  console.log('User added with key:', key);
}).catch(error => {
  console.error(error);
});
```

3. **Retrieving Data:**

```javascript
async function getUser(id) {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      
      // Get the user with the specified ID
      const request = store.get(id);
      
      request.onsuccess = () => {
        resolve(request.result); // Returns the user object or undefined
      };
      
      request.onerror = () => {
        reject('Error getting user: ' + request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in getUser:', error);
    throw error;
  }
}

// Usage
getUser(1).then(user => {
  if (user) {
    console.log('Found user:', user);
  } else {
    console.log('User not found');
  }
}).catch(error => {
  console.error(error);
});
```

4. **Updating Data:**

```javascript
async function updateUser(user) {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      
      // Put will add the object if it doesn't exist, or update it if it does
      const request = store.put(user);
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = () => {
        reject('Error updating user: ' + request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
}

// Usage
updateUser({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  age: 31 // Updated age
}).then(() => {
  console.log('User updated successfully');
}).catch(error => {
  console.error(error);
});
```

5. **Deleting Data:**

```javascript
async function deleteUser(id) {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      
      // Delete the user with the specified ID
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = () => {
        reject('Error deleting user: ' + request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
}

// Usage
deleteUser(1).then(() => {
  console.log('User deleted successfully');
}).catch(error => {
  console.error(error);
});
```

6. **Querying with Indexes:**

```javascript
async function getUserByEmail(email) {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      
      // Use the email index to find the user
      const index = store.index('email');
      const request = index.get(email);
      
      request.onsuccess = () => {
        resolve(request.result); // Returns the user object or undefined
      };
      
      request.onerror = () => {
        reject('Error getting user by email: ' + request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw error;
  }
}

// Usage
getUserByEmail('john@example.com').then(user => {
  if (user) {
    console.log('Found user:', user);
  } else {
    console.log('User not found');
  }
}).catch(error => {
  console.error(error);
});
```

7. **Getting All Records:**

```javascript
async function getAllUsers() {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      
      // Open a cursor to iterate through all records
      const request = store.openCursor();
      const users = [];
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        
        if (cursor) {
          // Add the current user to our array
          users.push(cursor.value);
          
          // Move to the next record
          cursor.continue();
        } else {
          // No more records, resolve with the array of users
          resolve(users);
        }
      };
      
      request.onerror = () => {
        reject('Error getting all users: ' + request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw error;
  }
}

// Usage
getAllUsers().then(users => {
  console.log('All users:', users);
}).catch(error => {
  console.error(error);
});
```

8. **Using Range Queries:**

```javascript
async function getUsersByAgeRange(minAge, maxAge) {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      
      // Ensure we have an index on the age property
      // This should be created in the onupgradeneeded event handler
      // store.createIndex('age', 'age', { unique: false });
      const index = store.index('age');
      
      // Create a range for the query
      const range = IDBKeyRange.bound(minAge, maxAge);
      
      // Open a cursor with the range
      const request = index.openCursor(range);
      const users = [];
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        
        if (cursor) {
          users.push(cursor.value);
          cursor.continue();
        } else {
          resolve(users);
        }
      };
      
      request.onerror = () => {
        reject('Error getting users by age range: ' + request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in getUsersByAgeRange:', error);
    throw error;
  }
}

// Usage
getUsersByAgeRange(25, 35).then(users => {
  console.log('Users between 25 and 35:', users);
}).catch(error => {
  console.error(error);
});
```

**Advanced IndexedDB Patterns:**

1. **Using Promises with IndexedDB:**

Creating a wrapper to make IndexedDB more ergonomic with Promises:

```javascript
class IndexedDBWrapper {
  constructor(dbName, version) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }
  
  async open() {
    if (this.db) return this.db;
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        this.setupDatabase(db);
      };
      
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };
      
      request.onerror = (event) => {
        reject('Error opening database: ' + event.target.error);
      };
    });
  }
  
  setupDatabase(db) {
    // This method should be overridden by subclasses
    // to define the database schema
  }
  
  async transaction(storeNames, mode) {
    const db = await this.open();
    return db.transaction(storeNames, mode);
  }
  
  async add(storeName, item) {
    const tx = await this.transaction([storeName], 'readwrite');
    const store = tx.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.add(item);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      
      tx.oncomplete = () => this.db.close();
    });
  }
  
  async get(storeName, key) {
    const tx = await this.transaction([storeName], 'readonly');
    const store = tx.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      
      tx.oncomplete = () => this.db.close();
    });
  }
  
  async getAll(storeName) {
    const tx = await this.transaction([storeName], 'readonly');
    const store = tx.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      
      tx.oncomplete = () => this.db.close();
    });
  }
  
  async put(storeName, item) {
    const tx = await this.transaction([storeName], 'readwrite');
    const store = tx.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      
      tx.oncomplete = () => this.db.close();
    });
  }
  
  async delete(storeName, key) {
    const tx = await this.transaction([storeName], 'readwrite');
    const store = tx.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      
      tx.oncomplete = () => this.db.close();
    });
  }
  
  async clear(storeName) {
    const tx = await this.transaction([storeName], 'readwrite');
    const store = tx.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.clear();
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      
      tx.oncomplete = () => this.db.close();
    });
  }
}

// Usage example
class UserDatabase extends IndexedDBWrapper {
  constructor() {
    super('UserDB', 1);
  }
  
  setupDatabase(db) {
    const store = db.createObjectStore('users', { keyPath: 'id' });
    store.createIndex('email', 'email', { unique: true });
    store.createIndex('name', 'name', { unique: false });
    store.createIndex('age', 'age', { unique: false });
  }
  
  async addUser(user) {
    return this.add('users', user);
  }
  
  async getUser(id) {
    return this.get('users', id);
  }
  
  async getAllUsers() {
    return this.getAll('users');
  }
  
  async updateUser(user) {
    return this.put('users', user);
  }
  
  async deleteUser(id) {
    return this.delete('users', id);
  }
}

// Using the wrapper
const userDB = new UserDatabase();

// Add a user
userDB.addUser({
  id: 1,
  name: 'Jane Smith',
  email: 'jane@example.com',
  age: 28
}).then(id => {
  console.log('Added user with ID:', id);
  
  // Get all users
  return userDB.getAllUsers();
}).then(users => {
  console.log('All users:', users);
}).catch(error => {
  console.error('Error:', error);
});
```

2. **Storing and Retrieving Binary Data (Blobs/Files):**

```javascript
async function storeFile(file) {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      
      // Create a file object with metadata
      const fileObj = {
        id: Date.now(), // Using timestamp as ID
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        content: file // Store the actual File/Blob object
      };
      
      const request = store.add(fileObj);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject('Error storing file: ' + request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in storeFile:', error);
    throw error;
  }
}

async function retrieveFile(id) {
  try {
    const db = await openDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');
      
      const request = store.get(id);
      
      request.onsuccess = () => {
        if (request.result) {
          // Create a URL for the blob that can be used in an <img>, <audio>, etc.
          const url = URL.createObjectURL(request.result.content);
          resolve({
            metadata: {
              name: request.result.name,
              type: request.result.type,
              size: request.result.size,
              lastModified: request.result.lastModified
            },
            blob: request.result.content,
            url: url
          });
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => {
        reject('Error retrieving file: ' + request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in retrieveFile:', error);
    throw error;
  }
}

// Usage with file input
document.getElementById('fileInput').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const fileId = await storeFile(file);
      console.log('File stored with ID:', fileId);
      
      // Retrieve and display the file
      const fileData = await retrieveFile(fileId);
      
      if (fileData) {
        // Display image if it's an image
        if (fileData.metadata.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = fileData.url;
          document.body.appendChild(img);
        }
        
        // Create download link
        const link = document.createElement('a');
        link.href = fileData.url;
        link.download = fileData.metadata.name;
        link.textContent = `Download ${fileData.metadata.name}`;
        document.body.appendChild(link);
      }
    } catch (error) {
      console.error('Error handling file:', error);
    }
  }
});
```

3. **Implementing Versioned Database Migrations:**

```javascript
class DatabaseMigration {
  constructor() {
    this.dbName = 'AppDatabase';
    this.migrations = [
      // Version 1: Initial schema
      {
        version: 1,
        migrate: (db) => {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
        }
      },
      // Version 2: Add tasks store
      {
        version: 2,
        migrate: (db) => {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
          taskStore.createIndex('userId', 'userId', { unique: false });
          taskStore.createIndex('completed', 'completed', { unique: false });
        }
      },
      // Version 3: Add name index to users
      {
        version: 3,
        migrate: (db) => {
          const userStore = db.transaction.objectStore('users');
          userStore.createIndex('name', 'name', { unique: false });
        }
      },
      // Version 4: Add settings store
      {
        version: 4,
        migrate: (db) => {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      }
    ];
  }
  
  get currentVersion() {
    return this.migrations.length;
  }
  
  async openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.currentVersion);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const oldVersion = event.oldVersion;
        
        // Apply all migrations that are newer than the old version
        for (const migration of this.migrations) {
          if (migration.version > oldVersion) {
            console.log(`Applying migration to version ${migration.version}`);
            migration.migrate(db);
          }
        }
      };
      
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      
      request.onerror = (event) => {
        reject('Error opening database: ' + event.target.error);
      };
    });
  }
}

// Usage
const dbMigration = new DatabaseMigration();
dbMigration.openDatabase().then(db => {
  console.log('Database opened successfully with version:', db.version);
  // Use the database...
}).catch(error => {
  console.error('Error opening database:', error);
});
```

**Practical Use Cases for IndexedDB:**

1. **Offline Web Applications:**
   - Store application data locally for offline use
   - Sync with server when connection is restored

2. **Caching API Responses:**
   - Store API responses to reduce network requests
   - Implement a cache-first strategy for faster loading

3. **Large Dataset Management:**
   - Handle datasets too large for memory or localStorage
   - Implement pagination and filtering on client-side data

4. **File Storage and Management:**
   - Store user-uploaded files before sending to server
   - Create browser-based file managers or media libraries

5. **Progressive Web Apps (PWAs):**
   - Store application state and user data
   - Enable full offline functionality

**Example: Building a Simple Offline-Capable Todo App:**

```javascript
class TodoApp {
  constructor() {
    this.dbName = 'TodoApp';
    this.dbVersion = 1;
    this.db = null;
    this.initUI();
    this.openDatabase().then(() => {
      this.loadTodos();
    });
  }
  
  async openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create todos store with auto-incrementing ID
        const store = db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
        store.createIndex('completed', 'completed', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      };
      
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };
      
      request.onerror = (event) => {
        console.error('Error opening database:', event.target.error);
        reject(event.target.error);
      };
    });
  }
  
  initUI() {
    // Create UI elements
    this.todoList = document.getElementById('todo-list');
    this.todoForm = document.getElementById('todo-form');
    this.todoInput = document.getElementById('todo-input');
    
    // Add event listeners
    this.todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo();
    });
    
    // Add sync status indicator
    this.syncStatus = document.getElementById('sync-status');
    window.addEventListener('online', () => this.updateSyncStatus());
    window.addEventListener('offline', () => this.updateSyncStatus());
    this.updateSyncStatus();
  }
  
  updateSyncStatus() {
    if (navigator.onLine) {
      this.syncStatus.textContent = 'Online - Changes will sync';
      this.syncStatus.className = 'online';
      this.syncWithServer();
    } else {
      this.syncStatus.textContent = 'Offline - Changes saved locally';
      this.syncStatus.className = 'offline';
    }
  }
  
  async addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;
    
    const todo = {
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
      synced: false
    };
    
    try {
      const id = await this.saveTodo(todo);
      todo.id = id;
      this.renderTodo(todo);
      this.todoInput.value = '';
      
      // Try to sync if online
      if (navigator.onLine) {
        this.syncWithServer();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
  
  async saveTodo(todo) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['todos'], 'readwrite');
      const store = transaction.objectStore('todos');
      
      const request = store.add(todo);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  
  async updateTodo(id, updates) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['todos'], 'readwrite');
      const store = transaction.objectStore('todos');
      
      // First get the current todo
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        const todo = getRequest.result;
        if (!todo) {
          reject(new Error('Todo not found'));
          return;
        }
        
        // Apply updates
        Object.assign(todo, updates, { synced: false });
        
        // Save the updated todo
        const updateRequest = store.put(todo);
        
        updateRequest.onsuccess = () => {
          resolve(todo);
        };
        
        updateRequest.onerror = () => {
          reject(updateRequest.error);
        };
      };
      
      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    });
  }
  
  async deleteTodo(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['todos'], 'readwrite');
      const store = transaction.objectStore('todos');
      
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  
  async loadTodos() {
    try {
      const todos = await this.getAllTodos();
      this.todoList.innerHTML = '';
      todos.forEach(todo => {
        this.renderTodo(todo);
      });
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  }
  
  async getAllTodos() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['todos'], 'readonly');
      const store = transaction.objectStore('todos');
      const index = store.index('createdAt');
      
      const request = index.openCursor(null, 'prev'); // Get newest first
      const todos = [];
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          todos.push(cursor.value);
          cursor.continue();
        } else {
          resolve(todos);
        }
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  
  renderTodo(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = todo.completed ? 'completed' : '';
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      this.toggleTodoCompleted(todo.id, checkbox.checked);
    });
    
    // Create text span
    const span = document.createElement('span');
    span.textContent = todo.text;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      this.removeTodo(todo.id);
    });
    
    // Create sync indicator
    const syncIndicator = document.createElement('span');
    syncIndicator.className = `sync-indicator ${todo.synced ? 'synced' : 'not-synced'}`;
    syncIndicator.title = todo.synced ? 'Synced with server' : 'Not yet synced';
    
    // Append elements
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(syncIndicator);
    
    this.todoList.appendChild(li);
  }
  
  async toggleTodoCompleted(id, completed) {
    try {
      const todo = await this.updateTodo(id, { completed });
      
      // Update UI
      const li = this.todoList.querySelector(`li[data-id="${id}"]`);
      if (li) {
        li.className = completed ? 'completed' : '';
        const syncIndicator = li.querySelector('.sync-indicator');
        syncIndicator.className = 'sync-indicator not-synced';
        syncIndicator.title = 'Not yet synced';
      }
      
      // Try to sync if online
      if (navigator.onLine) {
        this.syncWithServer();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  }
  
  async removeTodo(id) {
    try {
      await this.deleteTodo(id);
      
      // Update UI
      const li = this.todoList.querySelector(`li[data-id="${id}"]`);
      if (li) {
        li.remove();
      }
      
      // If online, sync the deletion with server
      if (navigator.onLine) {
        // In a real app, you would send a DELETE request to the server
        console.log('Syncing deletion with server for todo ID:', id);
      }
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  }
  
  async syncWithServer() {
    try {
      // Get all unsynced todos
      const unsyncedTodos = await this.getUnsyncedTodos();
      
      if (unsyncedTodos.length === 0) return;
      
      console.log('Syncing todos with server:', unsyncedTodos);
      
      // In a real app, you would send these to your server API
      // For this example, we'll simulate a successful sync
      for (const todo of unsyncedTodos) {
        // Simulate API call
        await this.simulateApiSync(todo);
        
        // Mark as synced in local DB
        await this.updateTodo(todo.id, { synced: true });
        
        // Update UI
        const li = this.todoList.querySelector(`li[data-id="${todo.id}"]`);
        if (li) {
          const syncIndicator = li.querySelector('.sync-indicator');
          syncIndicator.className = 'sync-indicator synced';
          syncIndicator.title = 'Synced with server';
        }
      }
      
      console.log('Sync complete');
    } catch (error) {
      console.error('Error syncing with server:', error);
    }
  }
  
  async getUnsyncedTodos() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['todos'], 'readonly');
      const store = transaction.objectStore('todos');
      
      const request = store.openCursor();
      const unsyncedTodos = [];
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (!cursor.value.synced) {
            unsyncedTodos.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(unsyncedTodos);
        }
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  
  // Simulate API call to sync a todo
  async simulateApiSync(todo) {
    return new Promise(resolve => {
      // Simulate network delay
      setTimeout(() => {
        console.log('Todo synced with server:', todo);
        resolve({ success: true });
      }, 500);
    });
  }
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});
```

**Browser Compatibility and Limitations:**

1. **Browser Support:**
   - Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
   - Limited support in older browsers
   - Mobile browsers generally have good support

2. **Storage Limits:**
   - Storage limits vary by browser and device
   - Chrome and Firefox typically allow several GB per origin
   - Safari has stricter limits (often around 1GB)
   - Mobile browsers may have lower limits

3. **Performance Considerations:**
   - Avoid storing very large objects in a single record
   - Use indexes for frequently queried properties
   - Be mindful of transaction scope and duration
   - Consider using web workers for intensive operations

**Best Practices for Using IndexedDB:**

1. **Error Handling:**
   - Always implement proper error handling for all database operations
   - Provide fallbacks for browsers that don't support IndexedDB

2. **Transaction Management:**
   - Keep transactions short-lived
   - Don't mix async operations with transactions
   - Use separate transactions for unrelated operations

3. **Schema Design:**
   - Plan for future schema migrations
   - Use appropriate indexes for query patterns
   - Consider data access patterns when designing object stores

4. **Security Considerations:**
   - Never store sensitive data unencrypted
   - Remember that IndexedDB is subject to same-origin policy
   - Clear sensitive data when no longer needed

5. **Offline Synchronization:**
   - Implement a robust sync strategy for offline-first applications
   - Use a queue for pending server operations
   - Handle conflict resolution between local and server data

**Conclusion:**
IndexedDB provides a powerful solution for client-side storage in web applications, enabling complex data management, offline capabilities, and improved performance. By understanding its asynchronous nature, transaction model, and proper usage patterns, developers can create robust web applications that work reliably regardless of network connectivity.

---

## Security

### Q1: Explain common JavaScript security vulnerabilities and how to prevent them.
**Difficulty: Hard**

**Answer:**
JavaScript security is critical for protecting web applications from various attacks. Understanding common vulnerabilities and implementing proper defenses is essential for any senior developer.

**1. Cross-Site Scripting (XSS):**

XSS attacks occur when attackers inject malicious scripts into web pages viewed by other users.

**Types of XSS:**
- **Reflected XSS**: Malicious script comes from the current HTTP request
- **Stored XSS**: Malicious script is stored on the server and delivered later
- **DOM-based XSS**: Vulnerability exists in client-side code

**Example Vulnerability:**
```javascript
// Dangerous: Directly inserting user input into the DOM
function displayComment(comment) {
  const commentSection = document.getElementById('comments');
  commentSection.innerHTML += `<div class="comment">${comment}</div>`; // Vulnerable to XSS
}

// User input: <img src="x" onerror="alert(document.cookie)">
```

**Prevention:**
```javascript
// 1. Output Encoding
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function displayComment(comment) {
  const commentSection = document.getElementById('comments');
  commentSection.innerHTML += `<div class="comment">${escapeHTML(comment)}</div>`;
}

// 2. Using safe DOM methods instead of innerHTML
function displayCommentSafely(comment) {
  const commentSection = document.getElementById('comments');
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';
  commentDiv.textContent = comment; // Automatically escapes HTML
  commentSection.appendChild(commentDiv);
}

// 3. Using DOMPurify library for sanitization
import DOMPurify from 'dompurify';

function displayFormattedComment(comment) {
  const commentSection = document.getElementById('comments');
  // Sanitize HTML but allow some formatting
  const sanitized = DOMPurify.sanitize(comment, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  });
  commentSection.innerHTML += `<div class="comment">${sanitized}</div>`;
}
```

**2. Cross-Site Request Forgery (CSRF):**

CSRF attacks trick users into performing unwanted actions on a site they're authenticated to.

**Example Vulnerability:**
```html
<!-- Malicious site with hidden form -->
<form id="csrf-form" action="https://bank.com/transfer" method="POST" style="display:none">
  <input type="hidden" name="recipient" value="attacker" />
  <input type="hidden" name="amount" value="1000" />
</form>
<script>
  document.getElementById('csrf-form').submit();
</script>
```

**Prevention:**
```javascript
// 1. CSRF Tokens
function setupCSRFProtection() {
  // Get CSRF token from meta tag
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
  // Add to all fetch/XHR requests
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    options.headers = options.headers || {};
    options.headers['X-CSRF-Token'] = csrfToken;
    return originalFetch(url, options);
  };
  
  // For XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    const method = arguments[0];
    const xhr = this;
    
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 1) { // OPENED
          xhr.setRequestHeader('X-CSRF-Token', csrfToken);
        }
      });
    }
    
    return originalOpen.apply(this, arguments);
  };
}

// 2. SameSite Cookies
// Set in your server response headers:
// Set-Cookie: sessionid=abc123; SameSite=Strict; Secure; HttpOnly
```

**3. Content Security Policy (CSP):**

CSP helps prevent XSS and data injection attacks by controlling which resources can be loaded.

**Implementation:**
```javascript
// Add CSP meta tag
function addCSPMetaTag() {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' https://trusted-cdn.com; img-src 'self' https://trusted-images.com data:; connect-src 'self' https://api.myservice.com;";
  document.head.appendChild(meta);
}

// Better approach: Set CSP via HTTP header on the server
// Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com;
```

**4. JSON Injection:**

**Example Vulnerability:**
```javascript
// Dangerous: Parsing JSON with embedded JavaScript
function processUserData(jsonString) {
  const userData = eval('(' + jsonString + ')'); // Extremely dangerous!
  return userData;
}
```

**Prevention:**
```javascript
// Always use JSON.parse instead of eval
function processUserData(jsonString) {
  try {
    const userData = JSON.parse(jsonString);
    return userData;
  } catch (e) {
    console.error('Invalid JSON:', e);
    return null;
  }
}
```

**5. Prototype Pollution:**

Prototype pollution occurs when an attacker is able to modify JavaScript's Object prototype.

**Example Vulnerability:**
```javascript
function mergeDeep(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      if (!target[key]) target[key] = {};
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Attacker input: { "__proto__": { "isAdmin": true } }
// Now every object will have isAdmin=true!
```

**Prevention:**
```javascript
function mergeDeepSafely(target, source) {
  for (const key in source) {
    // Prevent prototype pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    
    if (source[key] && typeof source[key] === 'object') {
      if (!target[key]) target[key] = {};
      mergeDeepSafely(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Using Object.create(null) for safer objects
function createSafeObject() {
  return Object.create(null); // No prototype, no pollution
}
```

**6. Insecure Direct Object References (IDOR):**

**Example Vulnerability:**
```javascript
// Client-side code that doesn't validate authorization
async function getUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

// Attacker can simply change userId to access other users' data
```

**Prevention:**
```javascript
// Always validate on the server side
// Client-side should also implement checks
async function getUserData(userId) {
  // Ensure userId belongs to current user
  if (userId !== currentUser.id && !currentUser.isAdmin) {
    throw new Error('Unauthorized access attempt');
  }
  
  const response = await fetch(`/api/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Access denied');
  }
  
  return response.json();
}
```

**7. Sensitive Data Exposure:**

**Example Vulnerability:**
```javascript
// Logging sensitive data
function processPayment(creditCard) {
  console.log('Processing payment for card:', creditCard);
  // Card number now in browser logs, network logs, etc.
}

// Storing sensitive data in localStorage
localStorage.setItem('authToken', token);
localStorage.setItem('userDetails', JSON.stringify(userDetails));
```

**Prevention:**
```javascript
// Mask sensitive data before logging
function processPayment(creditCard) {
  const maskedCard = maskCreditCard(creditCard);
  console.log('Processing payment for card:', maskedCard);
}

function maskCreditCard(cardNumber) {
  return cardNumber.slice(-4).padStart(cardNumber.length, '*');
}

// Use secure storage options
function storeAuthData(token, expiry) {
  // Use sessionStorage for short-lived sensitive data
  sessionStorage.setItem('authToken', token);
  
  // Set expiry
  const expiryTime = expiry || Date.now() + 3600000; // 1 hour default
  sessionStorage.setItem('tokenExpiry', expiryTime);
  
  // For longer sessions, consider httpOnly cookies set by the server
}
```

**8. Insecure Randomness:**

**Example Vulnerability:**
```javascript
// Using Math.random() for security purposes
function generateSessionId() {
  return Math.random().toString(36).substring(2);
}
```

**Prevention:**
```javascript
// Use Crypto API for secure random values
function generateSecureToken(length = 32) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
```

**9. Third-Party Library Vulnerabilities:**

**Prevention:**
```javascript
// Regular security audits
function auditDependencies() {
  // Use tools like npm audit, Snyk, or OWASP Dependency Check
  const { execSync } = require('child_process');
  try {
    const output = execSync('npm audit --json');
    const results = JSON.parse(output);
    return results;
  } catch (e) {
    console.error('Dependency audit failed:', e);
    return null;
  }
}

// Subresource Integrity for CDN resources
function addScriptWithIntegrity(url, integrity) {
  const script = document.createElement('script');
  script.src = url;
  script.integrity = integrity;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}
```

**10. Server-Side JavaScript Injection (for Node.js):**

**Example Vulnerability:**
```javascript
// Using eval with user input in Node.js
app.get('/calculate', (req, res) => {
  const { formula } = req.query;
  try {
    const result = eval(formula); // Extremely dangerous!
    res.send({ result });
  } catch (e) {
    res.status(400).send({ error: 'Invalid formula' });
  }
});
```

**Prevention:**
```javascript
// Use a safe math evaluation library
const { evaluate } = require('mathjs');

app.get('/calculate', (req, res) => {
  const { formula } = req.query;
  try {
    // Configure mathjs for safety
    const safeEvaluate = evaluate.limited({
      upper: 1000000 // Limit computation size
    });
    
    const result = safeEvaluate(formula);
    res.send({ result });
  } catch (e) {
    res.status(400).send({ error: 'Invalid formula' });
  }
});
```

**Security Best Practices Summary:**

1. **Input Validation**: Validate all input on both client and server sides
2. **Output Encoding**: Always encode output when displaying user-generated content
3. **Use Safe Methods**: Prefer `textContent` over `innerHTML`
4. **Content Security Policy**: Implement strict CSP headers
5. **HTTPS Everywhere**: Use secure connections for all traffic
6. **Secure Cookies**: Use `Secure`, `HttpOnly`, and `SameSite` flags
7. **Principle of Least Privilege**: Limit what your JavaScript can access
8. **Keep Dependencies Updated**: Regularly audit and update libraries
9. **Implement CSRF Protection**: Use tokens and SameSite cookies
10. **Avoid Dangerous Functions**: Never use `eval()`, `Function()`, `document.write()`, etc.
11. **Sanitize HTML**: Use libraries like DOMPurify for user-generated HTML
12. **Secure Storage**: Be careful what you store in localStorage/sessionStorage
13. **Use Modern APIs**: Prefer modern, secure APIs like Fetch over older alternatives
14. **Error Handling**: Don't expose sensitive information in error messages
15. **Regular Security Testing**: Perform security audits and penetration testing

---

## Modern JavaScript ES2024+ Features and Advanced Patterns

### Q1: How do you implement advanced functional programming patterns in modern JavaScript?
**Difficulty: Expert**

**Answer:**
Modern JavaScript supports sophisticated functional programming patterns that enable elegant, composable, and maintainable code.

**1. Advanced Function Composition and Currying:**
```javascript
// Advanced function composition with type safety
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

// Currying with automatic arity detection
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
};

// Partial application with placeholders
const _ = Symbol('placeholder');
const partial = (fn, ...partialArgs) => {
  return (...args) => {
    const finalArgs = [];
    let argIndex = 0;
    
    for (let i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === _) {
        finalArgs[i] = args[argIndex++];
      } else {
        finalArgs[i] = partialArgs[i];
      }
    }
    
    return fn(...finalArgs, ...args.slice(argIndex));
  };
};

// Advanced memoization with cache strategies
const memoize = (fn, options = {}) => {
  const {
    maxSize = 100,
    ttl = Infinity,
    keyGenerator = (...args) => JSON.stringify(args),
    onEvict = () => {}
  } = options;
  
  const cache = new Map();
  const timestamps = new Map();
  
  return function memoized(...args) {
    const key = keyGenerator(...args);
    const now = Date.now();
    
    // Check if cached value exists and is not expired
    if (cache.has(key)) {
      const timestamp = timestamps.get(key);
      if (now - timestamp < ttl) {
        return cache.get(key);
      } else {
        cache.delete(key);
        timestamps.delete(key);
      }
    }
    
    // Evict oldest entries if cache is full
    if (cache.size >= maxSize) {
      const oldestKey = cache.keys().next().value;
      const evictedValue = cache.get(oldestKey);
      cache.delete(oldestKey);
      timestamps.delete(oldestKey);
      onEvict(oldestKey, evictedValue);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    timestamps.set(key, now);
    
    return result;
  };
};

// Usage examples
const add = curry((a, b, c) => a + b + c);
const addFive = add(5);
const addFiveAndTen = addFive(10);
console.log(addFiveAndTen(3)); // 18

const multiply = (a, b) => a * b;
const double = partial(multiply, 2, _);
console.log(double(5)); // 10

// Function composition for data transformation
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

const getActiveUsers = (users) => users.filter(user => user.active);
const getUserNames = (users) => users.map(user => user.name);
const sortNames = (names) => names.sort();
const joinNames = (names) => names.join(', ');

const getActiveUserNames = pipe(
  getActiveUsers,
  getUserNames,
  sortNames,
  joinNames
);

console.log(getActiveUserNames(users)); // "Alice, Charlie"
```

**2. Advanced Monadic Patterns:**
```javascript
// Maybe Monad for null safety
class Maybe {
  constructor(value) {
    this.value = value;
  }
  
  static of(value) {
    return new Maybe(value);
  }
  
  static none() {
    return new Maybe(null);
  }
  
  isNone() {
    return this.value === null || this.value === undefined;
  }
  
  map(fn) {
    return this.isNone() ? Maybe.none() : Maybe.of(fn(this.value));
  }
  
  flatMap(fn) {
    return this.isNone() ? Maybe.none() : fn(this.value);
  }
  
  filter(predicate) {
    return this.isNone() || !predicate(this.value) ? Maybe.none() : this;
  }
  
  getOrElse(defaultValue) {
    return this.isNone() ? defaultValue : this.value;
  }
  
  fold(onNone, onSome) {
    return this.isNone() ? onNone() : onSome(this.value);
  }
}

// Either Monad for error handling
class Either {
  constructor(value, isLeft = false) {
    this.value = value;
    this.isLeft = isLeft;
  }
  
  static left(value) {
    return new Either(value, true);
  }
  
  static right(value) {
    return new Either(value, false);
  }
  
  map(fn) {
    return this.isLeft ? this : Either.right(fn(this.value));
  }
  
  flatMap(fn) {
    return this.isLeft ? this : fn(this.value);
  }
  
  mapLeft(fn) {
    return this.isLeft ? Either.left(fn(this.value)) : this;
  }
  
  fold(onLeft, onRight) {
    return this.isLeft ? onLeft(this.value) : onRight(this.value);
  }
  
  getOrElse(defaultValue) {
    return this.isLeft ? defaultValue : this.value;
  }
}

// IO Monad for side effects
class IO {
  constructor(effect) {
    this.effect = effect;
  }
  
  static of(value) {
    return new IO(() => value);
  }
  
  map(fn) {
    return new IO(() => fn(this.effect()));
  }
  
  flatMap(fn) {
    return new IO(() => fn(this.effect()).effect());
  }
  
  run() {
    return this.effect();
  }
}

// Usage examples
const safeParseInt = (str) => {
  const parsed = parseInt(str, 10);
  return isNaN(parsed) ? Maybe.none() : Maybe.of(parsed);
};

const safeDivide = (a, b) => {
  return b === 0 ? Either.left('Division by zero') : Either.right(a / b);
};

// Chaining operations safely
const result = Maybe.of('42')
  .map(str => parseInt(str, 10))
  .filter(num => num > 0)
  .map(num => num * 2)
  .getOrElse(0);

console.log(result); // 84

// Error handling with Either
const calculation = Either.right(10)
  .flatMap(x => safeDivide(x, 2))
  .flatMap(x => safeDivide(x, 0)) // This will fail
  .map(x => x * 2);

calculation.fold(
  error => console.error('Error:', error),
  value => console.log('Result:', value)
); // Error: Division by zero

// IO for side effects
const readFile = (filename) => new IO(() => {
  // Simulate file reading
  return `Contents of ${filename}`;
});

const processFile = readFile('data.txt')
  .map(content => content.toUpperCase())
  .map(content => content.split(' '));

console.log(processFile.run()); // ["CONTENTS", "OF", "DATA.TXT"]
```

**3. Advanced Async Patterns and Reactive Programming:**
```javascript
// Observable implementation with operators
class Observable {
  constructor(subscribe) {
    this.subscribe = subscribe;
  }
  
  static of(...values) {
    return new Observable(observer => {
      values.forEach(value => observer.next(value));
      observer.complete();
    });
  }
  
  static fromEvent(element, eventName) {
    return new Observable(observer => {
      const handler = event => observer.next(event);
      element.addEventListener(eventName, handler);
      return () => element.removeEventListener(eventName, handler);
    });
  }
  
  static interval(ms) {
    return new Observable(observer => {
      let count = 0;
      const id = setInterval(() => observer.next(count++), ms);
      return () => clearInterval(id);
    });
  }
  
  static merge(...observables) {
    return new Observable(observer => {
      const subscriptions = observables.map(obs => 
        obs.subscribe({
          next: value => observer.next(value),
          error: error => observer.error(error),
          complete: () => {
            // Complete only when all observables complete
            if (subscriptions.every(sub => sub.closed)) {
              observer.complete();
            }
          }
        })
      );
      
      return () => subscriptions.forEach(sub => sub.unsubscribe());
    });
  }
  
  map(fn) {
    return new Observable(observer => {
      return this.subscribe({
        next: value => observer.next(fn(value)),
        error: error => observer.error(error),
        complete: () => observer.complete()
      });
    });
  }
  
  filter(predicate) {
    return new Observable(observer => {
      return this.subscribe({
        next: value => predicate(value) && observer.next(value),
        error: error => observer.error(error),
        complete: () => observer.complete()
      });
    });
  }
  
  debounce(ms) {
    return new Observable(observer => {
      let timeoutId;
      return this.subscribe({
        next: value => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => observer.next(value), ms);
        },
        error: error => observer.error(error),
        complete: () => observer.complete()
      });
    });
  }
  
  throttle(ms) {
    return new Observable(observer => {
      let lastEmit = 0;
      return this.subscribe({
        next: value => {
          const now = Date.now();
          if (now - lastEmit >= ms) {
            lastEmit = now;
            observer.next(value);
          }
        },
        error: error => observer.error(error),
        complete: () => observer.complete()
      });
    });
  }
  
  scan(accumulator, seed) {
    return new Observable(observer => {
      let acc = seed;
      return this.subscribe({
        next: value => {
          acc = accumulator(acc, value);
          observer.next(acc);
        },
        error: error => observer.error(error),
        complete: () => observer.complete()
      });
    });
  }
  
  switchMap(fn) {
    return new Observable(observer => {
      let innerSubscription;
      return this.subscribe({
        next: value => {
          if (innerSubscription) {
            innerSubscription.unsubscribe();
          }
          innerSubscription = fn(value).subscribe(observer);
        },
        error: error => observer.error(error),
        complete: () => observer.complete()
      });
    });
  }
}

// Advanced async utilities
class AsyncUtils {
  // Retry with exponential backoff
  static async retry(fn, options = {}) {
    const {
      maxAttempts = 3,
      baseDelay = 1000,
      maxDelay = 30000,
      backoffFactor = 2,
      jitter = true
    } = options;
    
    let attempt = 0;
    
    while (attempt < maxAttempts) {
      try {
        return await fn();
      } catch (error) {
        attempt++;
        
        if (attempt >= maxAttempts) {
          throw error;
        }
        
        let delay = Math.min(baseDelay * Math.pow(backoffFactor, attempt - 1), maxDelay);
        
        if (jitter) {
          delay *= (0.5 + Math.random() * 0.5); // Add jitter
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // Circuit breaker pattern
  static createCircuitBreaker(fn, options = {}) {
    const {
      failureThreshold = 5,
      resetTimeout = 60000,
      monitoringPeriod = 10000
    } = options;
    
    let state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    let failureCount = 0;
    let lastFailureTime = null;
    let successCount = 0;
    
    return async (...args) => {
      if (state === 'OPEN') {
        if (Date.now() - lastFailureTime >= resetTimeout) {
          state = 'HALF_OPEN';
          successCount = 0;
        } else {
          throw new Error('Circuit breaker is OPEN');
        }
      }
      
      try {
        const result = await fn(...args);
        
        if (state === 'HALF_OPEN') {
          successCount++;
          if (successCount >= 3) {
            state = 'CLOSED';
            failureCount = 0;
          }
        } else {
          failureCount = 0;
        }
        
        return result;
      } catch (error) {
        failureCount++;
        lastFailureTime = Date.now();
        
        if (failureCount >= failureThreshold) {
          state = 'OPEN';
        }
        
        throw error;
      }
    };
  }
  
  // Rate limiter
  static createRateLimiter(maxRequests, windowMs) {
    const requests = [];
    
    return async (fn) => {
      const now = Date.now();
      
      // Remove old requests outside the window
      while (requests.length > 0 && now - requests[0] >= windowMs) {
        requests.shift();
      }
      
      if (requests.length >= maxRequests) {
        const oldestRequest = requests[0];
        const waitTime = windowMs - (now - oldestRequest);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return this.createRateLimiter(maxRequests, windowMs)(fn);
      }
      
      requests.push(now);
      return fn();
    };
  }
}

// Usage examples
// Observable usage
const searchInput = document.getElementById('search');
const search$ = Observable.fromEvent(searchInput, 'input')
  .map(event => event.target.value)
  .filter(text => text.length > 2)
  .debounce(300)
  .switchMap(query => 
    new Observable(observer => {
      fetch(`/api/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error(error));
    })
  );

search$.subscribe({
  next: results => console.log('Search results:', results),
  error: error => console.error('Search error:', error)
});

// Async utilities usage
const unreliableAPI = async () => {
  if (Math.random() < 0.7) {
    throw new Error('API failed');
  }
  return { data: 'success' };
};

const reliableAPI = AsyncUtils.createCircuitBreaker(
  () => AsyncUtils.retry(unreliableAPI, { maxAttempts: 3 }),
  { failureThreshold: 3 }
);

const rateLimitedAPI = AsyncUtils.createRateLimiter(5, 1000);

// Usage
rateLimitedAPI(() => reliableAPI())
  .then(result => console.log('API result:', result))
  .catch(error => console.error('API error:', error));
```

### Q2: How do you implement advanced state management patterns in vanilla JavaScript?
**Difficulty: Expert**

**Answer:**
Modern JavaScript applications require sophisticated state management patterns that provide predictability, debugging capabilities, and performance optimization.

**1. Advanced State Machine Implementation:**
```javascript
// Finite State Machine with guards and actions
class StateMachine {
  constructor(config) {
    this.states = config.states;
    this.initialState = config.initialState;
    this.context = config.context || {};
    this.currentState = this.initialState;
    this.listeners = [];
    this.history = [];
    this.maxHistorySize = config.maxHistorySize || 100;
  }
  
  // Transition to a new state
  transition(event, payload = {}) {
    const currentStateConfig = this.states[this.currentState];
    const transition = currentStateConfig.on?.[event];
    
    if (!transition) {
      console.warn(`No transition for event '${event}' in state '${this.currentState}'`);
      return false;
    }
    
    const { target, guard, actions } = transition;
    
    // Check guard condition
    if (guard && !guard(this.context, payload)) {
      console.warn(`Guard condition failed for transition '${event}'`);
      return false;
    }
    
    // Store previous state in history
    this.history.push({
      state: this.currentState,
      event,
      payload,
      timestamp: Date.now(),
      context: { ...this.context }
    });
    
    // Limit history size
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
    
    // Execute exit actions
    if (currentStateConfig.exit) {
      currentStateConfig.exit(this.context, payload);
    }
    
    // Execute transition actions
    if (actions) {
      actions.forEach(action => action(this.context, payload));
    }
    
    // Change state
    const previousState = this.currentState;
    this.currentState = target;
    
    // Execute entry actions
    const newStateConfig = this.states[this.currentState];
    if (newStateConfig.entry) {
      newStateConfig.entry(this.context, payload);
    }
    
    // Notify listeners
    this.notifyListeners({
      type: 'STATE_CHANGE',
      previousState,
      currentState: this.currentState,
      event,
      payload,
      context: this.context
    });
    
    return true;
  }
  
  // Get current state
  getState() {
    return {
      state: this.currentState,
      context: { ...this.context },
      canTransition: (event) => {
        const currentStateConfig = this.states[this.currentState];
        return !!currentStateConfig.on?.[event];
      }
    };
  }
  
  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
  
  notifyListeners(event) {
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in state machine listener:', error);
      }
    });
  }
  
  // Get state history
  getHistory() {
    return [...this.history];
  }
  
  // Reset to initial state
  reset() {
    this.currentState = this.initialState;
    this.context = {};
    this.history = [];
    this.notifyListeners({
      type: 'RESET',
      currentState: this.currentState
    });
  }
}

// Usage example: User authentication state machine
const authStateMachine = new StateMachine({
  initialState: 'idle',
  context: {
    user: null,
    token: null,
    loginAttempts: 0
  },
  states: {
    idle: {
      on: {
        LOGIN_START: {
          target: 'authenticating',
          actions: [(context, payload) => {
            context.loginAttempts++;
          }]
        },
        CHECK_AUTH: {
          target: 'authenticated',
          guard: (context) => !!context.token
        }
      }
    },
    authenticating: {
      entry: (context, payload) => {
        console.log('Starting authentication...');
      },
      on: {
        LOGIN_SUCCESS: {
          target: 'authenticated',
          actions: [(context, payload) => {
            context.user = payload.user;
            context.token = payload.token;
            context.loginAttempts = 0;
          }]
        },
        LOGIN_FAILURE: {
          target: 'idle',
          guard: (context) => context.loginAttempts < 3,
          actions: [(context, payload) => {
            console.error('Login failed:', payload.error);
          }]
        },
        LOGIN_FAILURE: {
          target: 'locked',
          guard: (context) => context.loginAttempts >= 3
        }
      }
    },
    authenticated: {
      entry: (context) => {
        console.log('User authenticated:', context.user);
      },
      on: {
        LOGOUT: {
          target: 'idle',
          actions: [(context) => {
            context.user = null;
            context.token = null;
          }]
        },
        TOKEN_EXPIRED: {
          target: 'idle',
          actions: [(context) => {
            context.token = null;
          }]
        }
      }
    },
    locked: {
      entry: (context) => {
        console.log('Account locked due to too many failed attempts');
      },
      on: {
        UNLOCK: {
          target: 'idle',
          actions: [(context) => {
            context.loginAttempts = 0;
          }]
        }
      }
    }
  }
});
```

**2. Advanced Store Pattern with Time Travel:**
```javascript
// Advanced store with time travel debugging
class TimeravelStore {
  constructor(initialState = {}, options = {}) {
    this.state = initialState;
    this.history = [{ state: initialState, action: { type: '@@INIT' }, timestamp: Date.now() }];
    this.currentIndex = 0;
    this.maxHistorySize = options.maxHistorySize || 50;
    this.middleware = [];
    this.subscribers = [];
    this.devMode = options.devMode || false;
  }
  
  // Add middleware
  use(middleware) {
    this.middleware.push(middleware);
  }
  
  // Dispatch action
  dispatch(action) {
    // Apply middleware
    let processedAction = action;
    for (const middleware of this.middleware) {
      processedAction = middleware(this.state, processedAction) || processedAction;
    }
    
    // Create new state
    const newState = this.reduce(this.state, processedAction);
    
    // Add to history
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push({
      state: newState,
      action: processedAction,
      timestamp: Date.now()
    });
    
    // Limit history size
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
    
    this.state = newState;
    
    // Notify subscribers
    this.notifySubscribers();
    
    if (this.devMode) {
      console.group(`Action: ${processedAction.type}`);
      console.log('Previous State:', this.history[this.currentIndex - 1]?.state);
      console.log('Action:', processedAction);
      console.log('New State:', newState);
      console.groupEnd();
    }
  }
  
  // Reducer function (to be overridden)
  reduce(state, action) {
    return state;
  }
  
  // Get current state
  getState() {
    return this.state;
  }
  
  // Subscribe to state changes
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }
  
  notifySubscribers() {
    this.subscribers.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        console.error('Error in store subscriber:', error);
      }
    });
  }
  
  // Time travel methods
  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.state = this.history[this.currentIndex].state;
      this.notifySubscribers();
      return true;
    }
    return false;
  }
  
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.state = this.history[this.currentIndex].state;
      this.notifySubscribers();
      return true;
    }
    return false;
  }
  
  jumpToState(index) {
    if (index >= 0 && index < this.history.length) {
      this.currentIndex = index;
      this.state = this.history[index].state;
      this.notifySubscribers();
      return true;
    }
    return false;
  }
  
  // Get history for debugging
  getHistory() {
    return this.history.map((entry, index) => ({
      ...entry,
      isCurrent: index === this.currentIndex
    }));
  }
  
  // Export/import state for persistence
  exportState() {
    return {
      state: this.state,
      history: this.history,
      currentIndex: this.currentIndex
    };
  }
  
  importState(exportedState) {
    this.state = exportedState.state;
    this.history = exportedState.history;
    this.currentIndex = exportedState.currentIndex;
    this.notifySubscribers();
  }
}

// Example store implementation
class TodoStore extends TimeravelStore {
  constructor() {
    super({
      todos: [],
      filter: 'all',
      nextId: 1
    }, { devMode: true });
    
    // Add logging middleware
    this.use((state, action) => {
      console.log(`[${new Date().toISOString()}] ${action.type}`);
      return action;
    });
    
    // Add validation middleware
    this.use((state, action) => {
      if (action.type === 'ADD_TODO' && !action.payload.text) {
        console.warn('Cannot add todo without text');
        return null; // Cancel action
      }
      return action;
    });
  }
  
  reduce(state, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, {
            id: state.nextId,
            text: action.payload.text,
            completed: false,
            createdAt: Date.now()
          }],
          nextId: state.nextId + 1
        };
        
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        };
        
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload.id)
        };
        
      case 'SET_FILTER':
        return {
          ...state,
          filter: action.payload.filter
        };
        
      default:
        return state;
    }
  }
  
  // Action creators
  addTodo(text) {
    this.dispatch({ type: 'ADD_TODO', payload: { text } });
  }
  
  toggleTodo(id) {
    this.dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  }
  
  deleteTodo(id) {
    this.dispatch({ type: 'DELETE_TODO', payload: { id } });
  }
  
  setFilter(filter) {
    this.dispatch({ type: 'SET_FILTER', payload: { filter } });
  }
  
  // Selectors
  getTodos() {
    const state = this.getState();
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  }
  
  getStats() {
    const state = this.getState();
    return {
      total: state.todos.length,
      completed: state.todos.filter(todo => todo.completed).length,
      active: state.todos.filter(todo => !todo.completed).length
    };
  }
}

// Usage
const todoStore = new TodoStore();

// Subscribe to changes
todoStore.subscribe(state => {
  console.log('State updated:', state);
  updateUI();
});

// Add todos
todoStore.addTodo('Learn JavaScript');
todoStore.addTodo('Build awesome apps');

// Toggle completion
todoStore.toggleTodo(1);

// Time travel
console.log('Undoing last action...');
todoStore.undo();

console.log('Redoing action...');
todoStore.redo();

// Export state for persistence
const savedState = todoStore.exportState();
localStorage.setItem('todoState', JSON.stringify(savedState));

// Import state on app load
const loadedState = JSON.parse(localStorage.getItem('todoState') || '{}');
if (loadedState.state) {
  todoStore.importState(loadedState);
}

function updateUI() {
  const todos = todoStore.getTodos();
  const stats = todoStore.getStats();
  
  // Update DOM
  document.getElementById('todo-list').innerHTML = todos
    .map(todo => `
      <li class="${todo.completed ? 'completed' : ''}">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} 
               onchange="todoStore.toggleTodo(${todo.id})">
        <span>${todo.text}</span>
        <button onclick="todoStore.deleteTodo(${todo.id})">Delete</button>
      </li>
    `).join('');
    
  document.getElementById('stats').textContent = 
    `Total: ${stats.total}, Active: ${stats.active}, Completed: ${stats.completed}`;
}
```

---

### Q3: How do you implement advanced JavaScript metaprogramming and reflection patterns?
**Difficulty: Expert**

**Answer:**
Advanced metaprogramming in JavaScript involves dynamic code generation, reflection, and runtime manipulation of objects and functions.

**1. Advanced Proxy Patterns:**
```javascript
// Dynamic API client with automatic method generation
class DynamicAPIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.options = options;
    
    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        }
        
        // Generate API methods dynamically
        if (typeof prop === 'string') {
          return target.createAPIMethod(prop);
        }
      }
    });
  }
  
  createAPIMethod(endpoint) {
    return new Proxy(() => {}, {
      apply: (target, thisArg, args) => {
        const [method = 'GET', data, config = {}] = args;
        return this.request(endpoint, method, data, config);
      },
      
      get: (target, prop) => {
        if (prop === 'get') return (config) => this.request(endpoint, 'GET', null, config);
        if (prop === 'post') return (data, config) => this.request(endpoint, 'POST', data, config);
        if (prop === 'put') return (data, config) => this.request(endpoint, 'PUT', data, config);
        if (prop === 'delete') return (config) => this.request(endpoint, 'DELETE', null, config);
        
        // Nested endpoints
        return this.createAPIMethod(`${endpoint}/${prop}`);
      }
    });
  }
  
  async request(endpoint, method, data, config) {
    const url = `${this.baseURL}/${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...this.options.headers,
        ...config.headers
      },
      ...config
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);
    return response.json();
  }
}

// Usage
const api = new DynamicAPIClient('https://api.example.com');

// All these work dynamically
const users = await api.users.get();
const user = await api.users(1).get();
const newUser = await api.users.post({ name: 'John' });
const posts = await api.users(1).posts.get();
```

**2. Advanced Reflection and Metadata:**
```javascript
// Metadata system with decorators
const MetadataStore = new WeakMap();

function getMetadata(target, key) {
  if (!MetadataStore.has(target)) {
    MetadataStore.set(target, new Map());
  }
  return MetadataStore.get(target).get(key);
}

function setMetadata(target, key, value) {
  if (!MetadataStore.has(target)) {
    MetadataStore.set(target, new Map());
  }
  MetadataStore.get(target).set(key, value);
}

// Validation decorator
function validate(schema) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
      // Validate arguments
      const errors = validateArgs(args, schema);
      if (errors.length > 0) {
        throw new ValidationError(errors);
      }
      
      return originalMethod.apply(this, args);
    };
    
    // Store validation metadata
    setMetadata(target.constructor, `validation:${propertyKey}`, schema);
  };
}

// Cache decorator with TTL
function cache(ttl = 60000) {
  const cacheStore = new Map();
  
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
      const key = `${propertyKey}:${JSON.stringify(args)}`;
      const cached = cacheStore.get(key);
      
      if (cached && Date.now() - cached.timestamp < ttl) {
        return cached.value;
      }
      
      const result = originalMethod.apply(this, args);
      cacheStore.set(key, { value: result, timestamp: Date.now() });
      
      return result;
    };
  };
}

// Usage
class UserService {
  @validate({
    id: { type: 'number', required: true },
    options: { type: 'object', default: {} }
  })
  @cache(30000)
  async getUser(id, options = {}) {
    // Fetch user logic
    return { id, name: 'John Doe', ...options };
  }
}
```

---

### Q4: How do you implement advanced JavaScript performance optimization and memory management?
**Difficulty: Expert**

**Answer:**
Advanced performance optimization involves sophisticated techniques for memory management, execution optimization, and resource efficiency.

**1. Advanced Memory Management:**
```javascript
// Object pool for reducing GC pressure
class ObjectPool {
  constructor(createFn, resetFn, maxSize = 100) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.maxSize = maxSize;
    this.pool = [];
    this.activeObjects = new Set();
  }
  
  acquire() {
    let obj;
    
    if (this.pool.length > 0) {
      obj = this.pool.pop();
    } else {
      obj = this.createFn();
    }
    
    this.activeObjects.add(obj);
    return obj;
  }
  
  release(obj) {
    if (!this.activeObjects.has(obj)) {
      return false;
    }
    
    this.activeObjects.delete(obj);
    
    if (this.pool.length < this.maxSize) {
      this.resetFn(obj);
      this.pool.push(obj);
    }
    
    return true;
  }
  
  clear() {
    this.pool.length = 0;
    this.activeObjects.clear();
  }
  
  getStats() {
    return {
      poolSize: this.pool.length,
      activeCount: this.activeObjects.size,
      totalCreated: this.pool.length + this.activeObjects.size
    };
  }
}

// Usage for expensive objects
const vectorPool = new ObjectPool(
  () => ({ x: 0, y: 0, z: 0 }),
  (obj) => { obj.x = obj.y = obj.z = 0; }
);

function performCalculations() {
  const vectors = [];
  
  // Acquire objects from pool
  for (let i = 0; i < 1000; i++) {
    const vector = vectorPool.acquire();
    vector.x = Math.random();
    vector.y = Math.random();
    vector.z = Math.random();
    vectors.push(vector);
  }
  
  // Perform calculations...
  
  // Release objects back to pool
  vectors.forEach(vector => vectorPool.release(vector));
}
```

**2. Advanced Execution Optimization:**
```javascript
// Memoization with LRU cache and weak references
class AdvancedMemoizer {
  constructor(maxSize = 1000, ttl = 300000) {
    this.maxSize = maxSize;
    this.ttl = ttl;
    this.cache = new Map();
    this.accessOrder = new Map();
    this.timers = new Map();
  }
  
  memoize(fn) {
    return (...args) => {
      const key = this.createKey(args);
      
      if (this.cache.has(key)) {
        this.updateAccess(key);
        return this.cache.get(key).value;
      }
      
      const result = fn.apply(this, args);
      this.set(key, result);
      
      return result;
    };
  }
  
  createKey(args) {
    return JSON.stringify(args, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        return Object.keys(value)
          .sort()
          .reduce((sorted, key) => {
            sorted[key] = value[key];
            return sorted;
          }, {});
      }
      return value;
    });
  }
  
  set(key, value) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.accessOrder.keys().next().value;
      this.delete(oldestKey);
    }
    
    const entry = { value, timestamp: Date.now() };
    this.cache.set(key, entry);
    this.updateAccess(key);
    
    // Set TTL timer
    if (this.ttl > 0) {
      const timer = setTimeout(() => this.delete(key), this.ttl);
      this.timers.set(key, timer);
    }
  }
  
  updateAccess(key) {
    this.accessOrder.delete(key);
    this.accessOrder.set(key, Date.now());
  }
  
  delete(key) {
    this.cache.delete(key);
    this.accessOrder.delete(key);
    
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }
  
  clear() {
    this.cache.clear();
    this.accessOrder.clear();
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
  
  getStats() {
    return {
      size: this.cache.size,
      hitRate: this.hitCount / (this.hitCount + this.missCount) || 0,
      memoryUsage: this.estimateMemoryUsage()
    };
  }
  
  estimateMemoryUsage() {
    let size = 0;
    for (const [key, value] of this.cache) {
      size += key.length * 2; // Rough string size
      size += JSON.stringify(value).length * 2;
    }
    return size;
  }
}

// Usage
const memoizer = new AdvancedMemoizer(500, 60000);

const expensiveCalculation = memoizer.memoize((x, y, options) => {
  // Simulate expensive calculation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sin(x * i) * Math.cos(y * i);
  }
  return result * (options.multiplier || 1);
});
```

---

### Q15: How do you implement advanced JavaScript ES2024+ features including Records, Tuples, and Pattern Matching?

**Answer:**
ES2024+ introduces powerful new features like Records and Tuples for immutable data structures, pattern matching for complex conditional logic, and enhanced temporal APIs for better date/time handling.

**Records and Tuples (Immutable Data Structures):**
```javascript
// Records - Immutable objects with value semantics
const userRecord = #{ 
  id: 1, 
  name: "John Doe", 
  email: "john@example.com",
  preferences: #{
    theme: "dark",
    notifications: true
  }
};

// Tuples - Immutable arrays with value semantics
const coordinates = #[40.7128, -74.0060, "New York"];
const rgbColor = #[255, 128, 0];

// Advanced Record manipulation
class UserManager {
  constructor() {
    this.users = new Map();
    this.userHistory = new Map();
  }
  
  createUser(userData) {
    const user = #{
      id: this.generateId(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    };
    
    this.users.set(user.id, user);
    this.userHistory.set(user.id, #[user]);
    return user;
  }
  
  updateUser(id, updates) {
    const currentUser = this.users.get(id);
    if (!currentUser) {
      throw new Error(`User ${id} not found`);
    }
    
    // Create new immutable user record
    const updatedUser = #{
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString(),
      version: currentUser.version + 1
    };
    
    // Update user and maintain history
    this.users.set(id, updatedUser);
    const history = this.userHistory.get(id);
    this.userHistory.set(id, #[...history, updatedUser]);
    
    return updatedUser;
  }
  
  getUserHistory(id) {
    return this.userHistory.get(id) || #[];
  }
  
  // Advanced querying with Records
  findUsers(predicate) {
    const results = #[];
    for (const user of this.users.values()) {
      if (predicate(user)) {
        results = #[...results, user];
      }
    }
    return results;
  }
  
  // Batch operations with immutable data
  batchUpdate(updates) {
    const results = #{};
    const errors = #{};
    
    for (const [id, updateData] of Object.entries(updates)) {
      try {
        const updated = this.updateUser(id, updateData);
        results = #{...results, [id]: updated};
      } catch (error) {
        errors = #{...errors, [id]: error.message};
      }
    }
    
    return #{ results, errors };
  }
  
  private generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
}

// Advanced Tuple operations
class GeometryCalculator {
  static distance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  
  static midpoint(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return #[(x1 + x2) / 2, (y1 + y2) / 2];
  }
  
  static translatePoint(point, vector) {
    const [x, y] = point;
    const [dx, dy] = vector;
    return #[x + dx, y + dy];
  }
  
  static rotatePoint(point, angle, origin = #[0, 0]) {
    const [x, y] = point;
    const [ox, oy] = origin;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    const translatedX = x - ox;
    const translatedY = y - oy;
    
    const rotatedX = translatedX * cos - translatedY * sin;
    const rotatedY = translatedX * sin + translatedY * cos;
    
    return #[rotatedX + ox, rotatedY + oy];
  }
  
  // Advanced polygon operations
  static calculatePolygonArea(vertices) {
    let area = 0;
    const n = vertices.length;
    
    for (let i = 0; i < n; i++) {
      const [x1, y1] = vertices[i];
      const [x2, y2] = vertices[(i + 1) % n];
      area += x1 * y2 - x2 * y1;
    }
    
    return Math.abs(area) / 2;
  }
}

// Color manipulation with Tuples
class ColorUtils {
  static rgbToHsl(rgb) {
    const [r, g, b] = rgb.map(c => c / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    let h = 0;
    if (diff !== 0) {
      switch (max) {
        case r: h = ((g - b) / diff) % 6; break;
        case g: h = (b - r) / diff + 2; break;
        case b: h = (r - g) / diff + 4; break;
      }
    }
    
    const l = (max + min) / 2;
    const s = diff === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));
    
    return #[Math.round(h * 60), Math.round(s * 100), Math.round(l * 100)];
  }
  
  static blendColors(color1, color2, ratio = 0.5) {
    const [r1, g1, b1] = color1;
    const [r2, g2, b2] = color2;
    
    return #[
      Math.round(r1 * (1 - ratio) + r2 * ratio),
      Math.round(g1 * (1 - ratio) + g2 * ratio),
      Math.round(b1 * (1 - ratio) + b2 * ratio)
    ];
  }
  
  static generatePalette(baseColor, count = 5) {
    const palette = #[baseColor];
    const [h, s, l] = this.rgbToHsl(baseColor);
    
    for (let i = 1; i < count; i++) {
      const newH = (h + (360 / count) * i) % 360;
      const newColor = this.hslToRgb(#[newH, s, l]);
      palette = #[...palette, newColor];
    }
    
    return palette;
  }
  
  static hslToRgb(hsl) {
    const [h, s, l] = [hsl[0] / 360, hsl[1] / 100, hsl[2] / 100];
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    
    if (h < 1/6) [r, g, b] = [c, x, 0];
    else if (h < 2/6) [r, g, b] = [x, c, 0];
    else if (h < 3/6) [r, g, b] = [0, c, x];
    else if (h < 4/6) [r, g, b] = [0, x, c];
    else if (h < 5/6) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    
    return #[
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }
}
```

**Pattern Matching (Proposed Feature):**
```javascript
// Advanced pattern matching for complex data structures
class DataProcessor {
  static processApiResponse(response) {
    return match (response) {
      when ({ status: 200, data: { users: Array } }) => {
        return this.processUsers(response.data.users);
      }
      when ({ status: 200, data: { user: Object } }) => {
        return this.processSingleUser(response.data.user);
      }
      when ({ status: 404 }) => {
        throw new Error('Resource not found');
      }
      when ({ status: Number if status >= 400 && status < 500 }) => {
        throw new Error(`Client error: ${response.message}`);
      }
      when ({ status: Number if status >= 500 }) => {
        throw new Error(`Server error: ${response.message}`);
      }
      default => {
        throw new Error('Unknown response format');
      }
    };
  }
  
  static processEvent(event) {
    return match (event) {
      when ({ type: 'user:created', payload: { id: String, email: String } }) => {
        return this.handleUserCreated(event.payload);
      }
      when ({ type: 'user:updated', payload: { id: String, changes: Object } }) => {
        return this.handleUserUpdated(event.payload);
      }
      when ({ type: 'user:deleted', payload: { id: String } }) => {
        return this.handleUserDeleted(event.payload);
      }
      when ({ type: String if type.startsWith('order:') }) => {
        return this.handleOrderEvent(event);
      }
      when ({ type: String if type.startsWith('payment:') }) => {
        return this.handlePaymentEvent(event);
      }
      default => {
        console.warn('Unhandled event type:', event.type);
      }
    };
  }
  
  // Advanced pattern matching with destructuring
  static analyzeUserBehavior(actions) {
    return match (actions) {
      when ([{ type: 'login' }, ...rest] if rest.length === 0) => {
        return 'single_login';
      }
      when ([{ type: 'login' }, { type: 'view_product' }, { type: 'purchase' }]) => {
        return 'quick_purchase';
      }
      when ([{ type: 'login' }, ...middle, { type: 'logout' }] if middle.every(a => a.type !== 'purchase')) => {
        return 'browsing_session';
      }
      when (Array if actions.filter(a => a.type === 'purchase').length > 3) => {
        return 'power_shopper';
      }
      when (Array if actions.length > 50) => {
        return 'heavy_user';
      }
      default => {
        return 'normal_user';
      }
    };
  }
  
  // Pattern matching with complex conditions
  static calculateShipping(order) {
    return match (order) {
      when ({ 
        items: Array if items.length > 0,
        total: Number if total > 100,
        destination: { country: 'US' }
      }) => {
        return { cost: 0, method: 'free_shipping' };
      }
      when ({ 
        items: Array if items.some(item => item.category === 'electronics'),
        destination: { country: String if ['US', 'CA'].includes(country) }
      }) => {
        return { cost: 15, method: 'express' };
      }
      when ({ 
        total: Number if total < 25,
        destination: { country: 'US' }
      }) => {
        return { cost: 5, method: 'standard' };
      }
      when ({ destination: { country: String if !['US', 'CA'].includes(country) } }) => {
        return { cost: 25, method: 'international' };
      }
      default => {
        return { cost: 10, method: 'standard' };
      }
    };
  }
}

// State machine with pattern matching
class OrderStateMachine {
  constructor(initialState = 'pending') {
    this.state = initialState;
    this.history = [initialState];
  }
  
  transition(event) {
    const newState = match ([this.state, event]) {
      when (['pending', { type: 'payment_received' }]) => 'processing';
      when (['pending', { type: 'cancel' }]) => 'cancelled';
      when (['processing', { type: 'items_shipped' }]) => 'shipped';
      when (['processing', { type: 'payment_failed' }]) => 'payment_failed';
      when (['shipped', { type: 'delivered' }]) => 'completed';
      when (['shipped', { type: 'return_requested' }]) => 'return_pending';
      when (['payment_failed', { type: 'payment_retry_success' }]) => 'processing';
      when (['return_pending', { type: 'return_approved' }]) => 'returned';
      when (['return_pending', { type: 'return_denied' }]) => 'completed';
      default => {
        throw new Error(`Invalid transition from ${this.state} with event ${event.type}`);
      }
    };
    
    this.state = newState;
    this.history.push(newState);
    return newState;
  }
  
  canTransition(eventType) {
    try {
      match ([this.state, { type: eventType }]) {
        when (['pending', { type: 'payment_received' }]) => true;
        when (['pending', { type: 'cancel' }]) => true;
        when (['processing', { type: 'items_shipped' }]) => true;
        when (['processing', { type: 'payment_failed' }]) => true;
        when (['shipped', { type: 'delivered' }]) => true;
        when (['shipped', { type: 'return_requested' }]) => true;
        when (['payment_failed', { type: 'payment_retry_success' }]) => true;
        when (['return_pending', { type: 'return_approved' }]) => true;
        when (['return_pending', { type: 'return_denied' }]) => true;
        default => false;
      };
      return true;
    } catch {
      return false;
    }
  }
}
```

---

### Q16: How do you implement advanced JavaScript temporal APIs and modern asynchronous patterns with AbortController and Structured Concurrency?

**Answer:**
Modern JavaScript provides powerful temporal APIs for precise date/time handling and advanced asynchronous patterns with AbortController for cancellation and structured concurrency for better async flow control.

**Advanced Temporal API Usage:**
```javascript
// Advanced date/time operations with Temporal API
class AdvancedScheduler {
  constructor() {
    this.events = new Map();
    this.timezones = new Map();
    this.recurringEvents = new Map();
  }
  
  // Create timezone-aware events
  createEvent(eventData) {
    const event = {
      id: this.generateId(),
      title: eventData.title,
      startTime: Temporal.ZonedDateTime.from(eventData.startTime),
      endTime: Temporal.ZonedDateTime.from(eventData.endTime),
      timezone: eventData.timezone,
      recurrence: eventData.recurrence,
      attendees: eventData.attendees || [],
      created: Temporal.Now.zonedDateTimeISO()
    };
    
    this.events.set(event.id, event);
    
    if (event.recurrence) {
      this.setupRecurringEvent(event);
    }
    
    return event;
  }
  
  // Advanced timezone conversions
  convertEventToTimezone(eventId, targetTimezone) {
    const event = this.events.get(eventId);
    if (!event) throw new Error('Event not found');
    
    return {
      ...event,
      startTime: event.startTime.withTimeZone(targetTimezone),
      endTime: event.endTime.withTimeZone(targetTimezone),
      originalTimezone: event.timezone,
      convertedTo: targetTimezone
    };
  }
  
  // Find optimal meeting times across timezones
  findOptimalMeetingTime(attendees, duration, dateRange) {
    const startDate = Temporal.PlainDate.from(dateRange.start);
    const endDate = Temporal.PlainDate.from(dateRange.end);
    const durationObj = Temporal.Duration.from(duration);
    
    const candidates = [];
    
    for (let date = startDate; Temporal.PlainDate.compare(date, endDate) <= 0; date = date.add({ days: 1 })) {
      // Check business hours (9 AM - 6 PM) for each timezone
      for (let hour = 9; hour <= 18 - durationObj.hours; hour++) {
        const timeSlots = attendees.map(attendee => {
          const localTime = date.toZonedDateTime({
            timeZone: attendee.timezone,
            plainTime: Temporal.PlainTime.from({ hour })
          });
          
          return {
            attendee: attendee.name,
            localTime,
            businessHours: this.isBusinessHours(localTime),
            conflicts: this.checkConflicts(attendee.id, localTime, durationObj)
          };
        });
        
        const viableSlot = timeSlots.every(slot => 
          slot.businessHours && slot.conflicts.length === 0
        );
        
        if (viableSlot) {
          candidates.push({
            utcTime: timeSlots[0].localTime.withTimeZone('UTC'),
            localTimes: timeSlots,
            score: this.calculateTimeSlotScore(timeSlots)
          });
        }
      }
    }
    
    return candidates.sort((a, b) => b.score - a.score);
  }
  
  // Advanced recurring event handling
  setupRecurringEvent(event) {
    const recurrence = event.recurrence;
    const instances = [];
    
    let currentDate = event.startTime.toPlainDate();
    const endDate = Temporal.PlainDate.from(recurrence.until || '2025-12-31');
    
    while (Temporal.PlainDate.compare(currentDate, endDate) <= 0) {
      if (this.matchesRecurrencePattern(currentDate, recurrence)) {
        const instanceStart = currentDate.toZonedDateTime({
          timeZone: event.timezone,
          plainTime: event.startTime.toPlainTime()
        });
        
        const instanceEnd = instanceStart.add(
          event.endTime.since(event.startTime)
        );
        
        instances.push({
          ...event,
          id: `${event.id}_${currentDate.toString()}`,
          startTime: instanceStart,
          endTime: instanceEnd,
          isRecurring: true,
          parentEventId: event.id
        });
      }
      
      currentDate = this.getNextRecurrenceDate(currentDate, recurrence);
    }
    
    this.recurringEvents.set(event.id, instances);
    return instances;
  }
  
  // Business logic helpers
  isBusinessHours(zonedDateTime) {
    const hour = zonedDateTime.hour;
    const dayOfWeek = zonedDateTime.dayOfWeek;
    return dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 17;
  }
  
  calculateTimeSlotScore(timeSlots) {
    // Score based on how close to preferred times (10 AM - 2 PM)
    const preferredStart = 10;
    const preferredEnd = 14;
    
    return timeSlots.reduce((score, slot) => {
      const hour = slot.localTime.hour;
      if (hour >= preferredStart && hour <= preferredEnd) {
        return score + 10;
      } else if (hour >= 9 && hour <= 17) {
        return score + 5;
      }
      return score;
    }, 0);
  }
  
  // Duration calculations and comparisons
  calculateEventDuration(eventId) {
    const event = this.events.get(eventId);
    if (!event) throw new Error('Event not found');
    
    return event.endTime.since(event.startTime);
  }
  
  findLongestEvents(limit = 10) {
    return Array.from(this.events.values())
      .map(event => ({
        ...event,
        duration: this.calculateEventDuration(event.id)
      }))
      .sort((a, b) => Temporal.Duration.compare(b.duration, a.duration))
      .slice(0, limit);
  }
  
  private generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
  
  private matchesRecurrencePattern(date, recurrence) {
    switch (recurrence.frequency) {
      case 'daily':
        return true;
      case 'weekly':
        return recurrence.daysOfWeek?.includes(date.dayOfWeek) ?? true;
      case 'monthly':
        return date.day === recurrence.dayOfMonth;
      case 'yearly':
        return date.month === recurrence.month && date.day === recurrence.dayOfMonth;
      default:
        return false;
    }
  }
  
  private getNextRecurrenceDate(currentDate, recurrence) {
    switch (recurrence.frequency) {
      case 'daily':
        return currentDate.add({ days: recurrence.interval || 1 });
      case 'weekly':
        return currentDate.add({ weeks: recurrence.interval || 1 });
      case 'monthly':
        return currentDate.add({ months: recurrence.interval || 1 });
      case 'yearly':
        return currentDate.add({ years: recurrence.interval || 1 });
      default:
        return currentDate.add({ days: 1 });
    }
  }
}

// Advanced AbortController patterns
class AdvancedAsyncManager {
  constructor() {
    this.activeOperations = new Map();
    this.operationGroups = new Map();
  }
  
  // Structured concurrency with automatic cleanup
  async withConcurrencyScope(operations, options = {}) {
    const { timeout, maxConcurrency = Infinity, failFast = true } = options;
    const controller = new AbortController();
    const scopeId = this.generateId();
    
    // Setup timeout if specified
    let timeoutId;
    if (timeout) {
      timeoutId = setTimeout(() => {
        controller.abort(new Error(`Operation timed out after ${timeout}ms`));
      }, timeout);
    }
    
    try {
      // Limit concurrency using semaphore pattern
      const semaphore = new Semaphore(maxConcurrency);
      const results = [];
      const errors = [];
      
      const wrappedOperations = operations.map(async (operation, index) => {
        await semaphore.acquire();
        
        try {
          if (controller.signal.aborted) {
            throw new Error('Operation aborted');
          }
          
          const result = await operation(controller.signal);
          results[index] = result;
          return result;
        } catch (error) {
          errors[index] = error;
          
          if (failFast) {
            controller.abort(error);
          }
          
          throw error;
        } finally {
          semaphore.release();
        }
      });
      
      if (failFast) {
        await Promise.all(wrappedOperations);
      } else {
        await Promise.allSettled(wrappedOperations);
      }
      
      return { results, errors };
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Cleanup any remaining operations
      controller.abort(new Error('Scope cleanup'));
      this.operationGroups.delete(scopeId);
    }
  }
  
  // Advanced retry with exponential backoff and jitter
  async retryWithBackoff(operation, options = {}) {
    const {
      maxRetries = 3,
      baseDelay = 1000,
      maxDelay = 30000,
      backoffFactor = 2,
      jitter = true,
      retryCondition = () => true
    } = options;
    
    const controller = new AbortController();
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation(controller.signal, attempt);
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries || !retryCondition(error, attempt)) {
          throw error;
        }
        
        // Calculate delay with exponential backoff and optional jitter
        let delay = Math.min(baseDelay * Math.pow(backoffFactor, attempt), maxDelay);
        
        if (jitter) {
          delay = delay * (0.5 + Math.random() * 0.5); // Add 0-50% jitter
        }
        
        await this.delay(delay, controller.signal);
      }
    }
    
    throw lastError;
  }
  
  // Advanced timeout with custom cleanup
  async withTimeout(operation, timeoutMs, cleanup) {
    const controller = new AbortController();
    
    const timeoutPromise = new Promise((_, reject) => {
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject(new Error(`Operation timed out after ${timeoutMs}ms`));
      }, timeoutMs);
      
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
      });
    });
    
    try {
      return await Promise.race([
        operation(controller.signal),
        timeoutPromise
      ]);
    } catch (error) {
      if (cleanup) {
        await cleanup(error);
      }
      throw error;
    }
  }
  
  // Cancellable fetch with progress tracking
  async fetchWithProgress(url, options = {}) {
    const controller = new AbortController();
    const { onProgress, ...fetchOptions } = options;
    
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      if (!onProgress || !response.body) {
        return response;
      }
      
      const contentLength = parseInt(response.headers.get('content-length') || '0');
      let receivedLength = 0;
      
      const reader = response.body.getReader();
      const chunks = [];
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        receivedLength += value.length;
        
        onProgress({
          loaded: receivedLength,
          total: contentLength,
          percentage: contentLength ? (receivedLength / contentLength) * 100 : 0
        });
      }
      
      // Create new response with collected chunks
      const allChunks = new Uint8Array(receivedLength);
      let position = 0;
      
      for (const chunk of chunks) {
        allChunks.set(chunk, position);
        position += chunk.length;
      }
      
      return new Response(allChunks, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request was cancelled');
      }
      throw error;
    }
  }
  
  private async delay(ms, signal) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(resolve, ms);
      
      signal?.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new Error('Delay aborted'));
      });
    });
  }
  
  private generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
}

// Semaphore for concurrency control
class Semaphore {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.currentConcurrency = 0;
    this.waitingQueue = [];
  }
  
  async acquire() {
    if (this.currentConcurrency < this.maxConcurrency) {
      this.currentConcurrency++;
      return;
    }
    
    return new Promise(resolve => {
      this.waitingQueue.push(resolve);
    });
  }
  
  release() {
    this.currentConcurrency--;
    
    if (this.waitingQueue.length > 0) {
      const next = this.waitingQueue.shift();
      this.currentConcurrency++;
      next();
    }
  }
}

// Usage examples
const scheduler = new AdvancedScheduler();
const asyncManager = new AdvancedAsyncManager();

// Create timezone-aware events
const meeting = scheduler.createEvent({
  title: 'Global Team Standup',
  startTime: '2024-03-15T09:00:00[America/New_York]',
  endTime: '2024-03-15T10:00:00[America/New_York]',
  timezone: 'America/New_York',
  attendees: [
    { id: '1', name: 'Alice', timezone: 'America/New_York' },
    { id: '2', name: 'Bob', timezone: 'Europe/London' },
    { id: '3', name: 'Charlie', timezone: 'Asia/Tokyo' }
  ]
});

// Advanced async operations with structured concurrency
async function processDataPipeline() {
  const operations = [
    signal => fetchData('/api/users', { signal }),
    signal => fetchData('/api/orders', { signal }),
    signal => fetchData('/api/products', { signal })
  ];
  
  const { results, errors } = await asyncManager.withConcurrencyScope(operations, {
    timeout: 30000,
    maxConcurrency: 2,
    failFast: false
  });
  
  return { results, errors };
}
```

This enhanced JavaScript guide now includes cutting-edge functional programming patterns, advanced monadic structures, sophisticated reactive programming with custom Observable implementations, state machines, time-travel debugging capabilities, advanced metaprogramming, reflection patterns, ES2024+ features including Records and Tuples, pattern matching, advanced temporal APIs, modern asynchronous patterns with AbortController and structured concurrency, and performance optimization techniques essential for building modern, maintainable JavaScript applications.