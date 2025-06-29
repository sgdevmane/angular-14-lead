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

## Performance Optimization and Memory Management

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