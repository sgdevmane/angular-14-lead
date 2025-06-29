# JavaScript Interview Questions - Lead Software Engineer

## Table of Contents
1. [Fundamentals](#fundamentals)
2. [Functions and Scope](#functions-and-scope)
3. [Asynchronous Programming](#asynchronous-programming)
4. [ES6+ Features](#es6-features)
5. [Advanced Concepts](#advanced-concepts)
6. [Event Handling](#event-handling)
7. [Performance and Optimization](#performance-and-optimization)
8. [Guess the Output](#guess-the-output)

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
```