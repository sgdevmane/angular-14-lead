# TypeScript Interview Questions & Answers

## Table of Contents

1. [Q1: What is TypeScript and what are its key benefits?](#q1-what-is-typescript-and-what-are-its-key-benefits)
2. [Q2: Explain TypeScript's type inference and when to use explicit typing.](#q2-explain-typescripts-type-inference-and-when-to-use-explicit-typing)
3. [Q3: Explain TypeScript's structural typing system.](#q3-explain-typescripts-structural-typing-system)
4. [Q4: What are union types, intersection types, and discriminated unions?](#q4-what-are-union-types-intersection-types-and-discriminated-unions)
5. [Q5: Explain conditional types and their practical applications.](#q5-explain-conditional-types-and-their-practical-applications)
6. [Q6: What are mapped types and how do you create custom utility types?](#q6-what-are-mapped-types-and-how-do-you-create-custom-utility-types)
7. [Q7: Explain the built-in utility types and create advanced custom ones.](#q7-explain-the-built-in-utility-types-and-create-advanced-custom-ones)
8. [Q8: Explain TypeScript generics with advanced patterns and constraints.](#q8-explain-typescript-generics-with-advanced-patterns-and-constraints)
9. [Q9: Explain template literal types and their advanced use cases.](#q9-explain-template-literal-types-and-their-advanced-use-cases)
10. [Q10: Explain TypeScript decorators and their practical applications.](#q10-explain-typescript-decorators-and-their-practical-applications)
11. [Q11: What are TypeScript best practices for large-scale applications?](#q11-what-are-typescript-best-practices-for-large-scale-applications)
12. [Q12: How do you optimize TypeScript compilation and runtime performance?](#q12-how-do-you-optimize-typescript-compilation-and-runtime-performance)
13. [Q13: What are the latest TypeScript features and how do you use them?](#q13-what-are-the-latest-typescript-features-and-how-do-you-use-them)
14. [Q14: How do you implement advanced type manipulation and metaprogramming in TypeScript?](#q14-how-do-you-implement-advanced-type-manipulation-and-metaprogramming-in-typescript)
15. [Q15: How do you implement advanced type-safe patterns for modern applications?](#q15-how-do-you-implement-advanced-type-safe-patterns-for-modern-applications)
16. [Q16: How do you implement TypeScript 5.0+ decorators and metadata reflection?](#q16-how-do-you-implement-typescript-50-decorators-and-metadata-reflection)
17. [Q17: How do you implement advanced TypeScript patterns for reactive programming?](#q17-how-do-you-implement-advanced-typescript-patterns-for-reactive-programming)
18. [Q18: How do you implement TypeScript 5.0+ const assertions and satisfies operator for advanced type safety?](#q18-how-do-you-implement-typescript-50-const-assertions-and-satisfies-operator-for-advanced-type-safety)
19. [Q19: How do you implement advanced TypeScript 5.0+ decorators and metadata reflection for enterprise applications?](#q19-how-do-you-implement-advanced-typescript-50-decorators-and-metadata-reflection-for-enterprise-applications)
20. [Q20: How do you use TypeScript with React for type-safe component development?](#q20-how-do-you-use-typescript-with-react-for-type-safe-component-development)

---

## TypeScript Fundamentals

### Q1: What is TypeScript and what are its key benefits?

**Answer:**
TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and modern ECMAScript features to JavaScript.

**Key Benefits:**

```typescript
// 1. Static Type Checking
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function createUser(userData: User): User {
  // TypeScript catches type errors at compile time
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    isActive: userData.isActive
  };
}

// 2. Enhanced IDE Support
class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user); // Auto-completion and IntelliSense
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}

// 3. Modern JavaScript Features
class ApiClient {
  async fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }

  // Optional chaining and nullish coalescing
  getUserName(user?: User): string {
    return user?.name ?? 'Unknown User';
  }
}

// 4. Better Refactoring and Maintenance
type UserRole = 'admin' | 'user' | 'moderator';

interface ExtendedUser extends User {
  role: UserRole;
  permissions: string[];
}

// 5. Compile-time Error Detection
function processUser(user: ExtendedUser): void {
  // TypeScript prevents runtime errors
  if (user.role === 'admin') {
    console.log(`Admin user: ${user.name}`);
  }
  // TypeScript error if we try to access non-existent property
  // console.log(user.nonExistentProperty); // Error!
}
```

### Q2: Explain TypeScript's type inference and when to use explicit typing.

**Answer:**
TypeScript can automatically infer types based on the assigned values, but explicit typing is beneficial for function parameters, return types, and complex objects.

```typescript
// Type Inference Examples
let message = "Hello"; // inferred as string
let count = 42; // inferred as number
let isActive = true; // inferred as boolean

// Array inference
let numbers = [1, 2, 3]; // inferred as number[]
let mixed = [1, "hello", true]; // inferred as (string | number | boolean)[]

// Object inference
let user = {
  id: 1,
  name: "John",
  email: "john@example.com"
}; // inferred type: { id: number; name: string; email: string; }

// Function return type inference
function add(a: number, b: number) {
  return a + b; // return type inferred as number
}

// When to use explicit typing

// 1. Function parameters (always recommended)
function processUserData(userData: User, options: ProcessingOptions): ProcessedUser {
  // Implementation
  return {
    id: userData.id,
    processedAt: new Date(),
    status: 'processed'
  };
}

// 2. Complex return types
function createApiResponse<T>(data: T, success: boolean): ApiResponse<T> {
  return {
    data,
    success,
    timestamp: Date.now(),
    errors: []
  };
}

// 3. When inference might be wrong or unclear
let userInput: string | null = getUserInput(); // Could return null
let config: Partial<Configuration> = {}; // Start with empty config

// 4. Union types that need to be explicit
type Status = 'loading' | 'success' | 'error';
let currentStatus: Status = 'loading';

// 5. Generic constraints
function updateEntity<T extends { id: number }>(entity: T, updates: Partial<T>): T {
  return { ...entity, ...updates };
}

// Advanced inference patterns
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  // Return type inferred from generic
  getById(id: number): T | undefined {
    return this.items.find(item => 
      (item as any).id === id
    );
  }

  // Complex inference with mapped types
  update<K extends keyof T>(id: number, field: K, value: T[K]): boolean {
    const item = this.getById(id);
    if (item) {
      item[field] = value;
      return true;
    }
    return false;
  }
}

interface ProcessingOptions {
  validateInput: boolean;
  sanitizeOutput: boolean;
  logActivity: boolean;
}

interface ProcessedUser {
  id: number;
  processedAt: Date;
  status: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: number;
  errors: string[];
}

interface Configuration {
  apiUrl: string;
  timeout: number;
  retries: number;
}
```

---

## Type System

### Q3: Explain TypeScript's structural typing system.

**Answer:**
TypeScript uses structural typing (duck typing) where type compatibility is determined by the structure of types rather than their names.

```typescript
// Structural Typing Examples

interface Point2D {
  x: number;
  y: number;
}

interface Vector2D {
  x: number;
  y: number;
}

// These are structurally compatible
let point: Point2D = { x: 1, y: 2 };
let vector: Vector2D = point; // No error - same structure

// Excess property checking
function drawPoint(point: Point2D): void {
  console.log(`Drawing point at (${point.x}, ${point.y})`);
}

// Direct object literal - excess property checking applies
// drawPoint({ x: 1, y: 2, z: 3 }); // Error: excess property 'z'

// Variable assignment - no excess property checking
let point3D = { x: 1, y: 2, z: 3 };
drawPoint(point3D); // OK - point3D has required properties

// Structural typing with functions
type EventHandler = (event: { type: string; timestamp: number }) => void;

function addEventListener(handler: EventHandler): void {
  // Implementation
}

// Compatible function types
const clickHandler = (event: { type: string; timestamp: number; target: Element }) => {
  console.log(`Event: ${event.type}`);
};

addEventListener(clickHandler); // OK - compatible structure

// Advanced structural typing
class DatabaseConnection {
  connect(): Promise<void> {
    return Promise.resolve();
  }

  query(sql: string): Promise<any[]> {
    return Promise.resolve([]);
  }

  close(): Promise<void> {
    return Promise.resolve();
  }
}

class MockConnection {
  connect(): Promise<void> {
    return Promise.resolve();
  }

  query(sql: string): Promise<any[]> {
    return Promise.resolve([{ id: 1, name: 'test' }]);
  }

  close(): Promise<void> {
    return Promise.resolve();
  }
}

// Structural compatibility allows substitution
function useDatabase(db: DatabaseConnection): void {
  db.connect().then(() => {
    return db.query('SELECT * FROM users');
  });
}

useDatabase(new MockConnection()); // OK - same structure

// Branded types for nominal typing
type UserId = number & { readonly brand: unique symbol };
type ProductId = number & { readonly brand: unique symbol };

function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

function getUserById(id: UserId): User | undefined {
  // Implementation
  return undefined;
}

const userId = createUserId(123);
const productId = createProductId(456);

getUserById(userId); // OK
// getUserById(productId); // Error - different branded types
// getUserById(123); // Error - plain number not assignable
```

### Q4: What are union types, intersection types, and discriminated unions?

**Answer:**
Union types represent values that can be one of several types, intersection types combine multiple types, and discriminated unions use a common property to distinguish between union members.

```typescript
// Union Types
type StringOrNumber = string | number;
type Status = 'loading' | 'success' | 'error';

function formatValue(value: StringOrNumber): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toString();
}

// Intersection Types
interface Timestamped {
  timestamp: Date;
}

interface Tagged {
  tags: string[];
}

type TimestampedAndTagged = Timestamped & Tagged;

const item: TimestampedAndTagged = {
  timestamp: new Date(),
  tags: ['important', 'urgent']
};

// Discriminated Unions (Tagged Unions)
interface LoadingState {
  status: 'loading';
}

interface SuccessState {
  status: 'success';
  data: any;
}

interface ErrorState {
  status: 'error';
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

// Type guards with discriminated unions
function handleAsyncState(state: AsyncState): string {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Data: ${JSON.stringify(state.data)}`;
    case 'error':
      return `Error: ${state.error}`;
    default:
      // Exhaustiveness checking
      const _exhaustive: never = state;
      return _exhaustive;
  }
}

// Advanced Union Types
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code: number };

function processApiResponse<T>(response: ApiResponse<T>): T | null {
  if (response.success) {
    return response.data; // TypeScript knows this is the success case
  } else {
    console.error(`API Error ${response.code}: ${response.error}`);
    return null;
  }
}

// Complex Intersection Types
interface Serializable {
  serialize(): string;
}

interface Cacheable {
  getCacheKey(): string;
  getExpiry(): Date;
}

interface Validatable {
  validate(): boolean;
  getValidationErrors(): string[];
}

class User implements Serializable & Cacheable & Validatable {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}

  serialize(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      email: this.email
    });
  }

  getCacheKey(): string {
    return `user:${this.id}`;
  }

  getExpiry(): Date {
    return new Date(Date.now() + 3600000); // 1 hour
  }

  validate(): boolean {
    return this.name.length > 0 && this.email.includes('@');
  }

  getValidationErrors(): string[] {
    const errors: string[] = [];
    if (this.name.length === 0) errors.push('Name is required');
    if (!this.email.includes('@')) errors.push('Invalid email format');
    return errors;
  }
}

// Conditional types with unions
type NonNullable<T> = T extends null | undefined ? never : T;
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type StringArray = string[];
type StringType = ExtractArrayType<StringArray>; // string

// Mapped types with unions
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface UserProfile {
  id: number;
  name?: string;
  email?: string;
  avatar?: string;
}

type UserWithRequiredEmail = RequiredFields<UserProfile, 'email'>;
// Result: { id: number; name?: string; email: string; avatar?: string; }
```

---

## Advanced Types

### Q5: Explain conditional types and their practical applications.

**Answer:**
Conditional types allow you to create types that depend on a condition, enabling powerful type-level programming.

```typescript
// Basic Conditional Types
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// Practical Applications

// 1. API Response Types
type ApiResult<T, E = string> = T extends null 
  ? { success: false; error: E }
  : { success: true; data: T };

type UserResult = ApiResult<User>; // { success: true; data: User }
type ErrorResult = ApiResult<null>; // { success: false; error: string }

// 2. Function Overload Resolution
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string { return ''; }
function getNumber(): number { return 0; }

type StringReturn = ReturnType<typeof getString>; // string
type NumberReturn = ReturnType<typeof getNumber>; // number

// 3. Deep Property Access
type DeepPropertyType<T, K extends string> = 
  K extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? DeepPropertyType<T[Key], Rest>
      : never
    : K extends keyof T
      ? T[K]
      : never;

interface NestedObject {
  user: {
    profile: {
      name: string;
      age: number;
    };
    settings: {
      theme: 'light' | 'dark';
    };
  };
}

type UserName = DeepPropertyType<NestedObject, 'user.profile.name'>; // string
type Theme = DeepPropertyType<NestedObject, 'user.settings.theme'>; // 'light' | 'dark'

// 4. Conditional Utility Types
type NonNullable<T> = T extends null | undefined ? never : T;
type Flatten<T> = T extends (infer U)[] ? U : T;
type Awaited<T> = T extends Promise<infer U> ? U : T;

// 5. Advanced Conditional Types with Distributive Properties
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// 6. Recursive Conditional Types
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

interface MutableUser {
  id: number;
  profile: {
    name: string;
    settings: {
      notifications: boolean;
    };
  };
}

type ReadonlyUser = DeepReadonly<MutableUser>;
// All properties and nested properties become readonly

// 7. Template Literal Types with Conditionals
type EventName<T extends string> = `on${Capitalize<T>}`;
type EventHandler<T extends string> = T extends `on${infer E}` 
  ? `handle${Capitalize<E>}` 
  : never;

type ClickEvent = EventName<'click'>; // 'onClick'
type ClickHandler = EventHandler<'onClick'>; // 'handleClick'

// 8. Complex Conditional Type Chains
type SmartPick<T, K> = {
  [P in keyof T as P extends K 
    ? K extends string 
      ? P extends `${K}${string}` 
        ? P 
        : never
      : P extends K 
        ? P 
        : never
    : never]: T[P];
};

interface UserData {
  userId: number;
  userName: string;
  userEmail: string;
  profileId: number;
  profileName: string;
}

type UserFields = SmartPick<UserData, 'user'>;
// Result: { userId: number; userName: string; userEmail: string; }

// 9. Conditional Types for Error Handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

type UnwrapResult<T> = T extends Result<infer U, any> ? U : never;

type UserDataType = UnwrapResult<Result<User>>; // User

// 10. Advanced Type Guards with Conditionals
function isResult<T>(value: any): value is Result<T> {
  return typeof value === 'object' && 
         value !== null && 
         'success' in value;
}

function unwrapResult<T>(result: Result<T>): T {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}
```

### Q6: What are mapped types and how do you create custom utility types?

**Answer:**
Mapped types allow you to create new types by transforming properties of existing types. They're the foundation for many utility types.

```typescript
// Basic Mapped Types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P]; // Remove optional modifier
};

// Custom Utility Types

// 1. Nullable - Make all properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface User {
  id: number;
  name: string;
  email: string;
}

type NullableUser = Nullable<User>;
// Result: { id: number | null; name: string | null; email: string | null; }

// 2. DeepPartial - Make all properties and nested properties optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface UserProfile {
  personal: {
    name: string;
    age: number;
  };
  settings: {
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
}

type PartialUserProfile = DeepPartial<UserProfile>;
// All properties become optional recursively

// 3. Mutable - Remove readonly modifiers
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

interface ReadonlyConfig {
  readonly apiUrl: string;
  readonly timeout: number;
}

type MutableConfig = Mutable<ReadonlyConfig>;
// Result: { apiUrl: string; timeout: number; }

// 4. PickByType - Pick properties by their type
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

interface MixedTypes {
  id: number;
  name: string;
  isActive: boolean;
  tags: string[];
  count: number;
}

type StringProperties = PickByType<MixedTypes, string>;
// Result: { name: string; }

type NumberProperties = PickByType<MixedTypes, number>;
// Result: { id: number; count: number; }

// 5. OmitByType - Omit properties by their type
type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

type NonStringProperties = OmitByType<MixedTypes, string>;
// Result: { id: number; isActive: boolean; tags: string[]; count: number; }

// 6. KeysOfType - Get keys of properties with specific type
type KeysOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

type StringKeys = KeysOfType<MixedTypes, string>; // 'name'
type NumberKeys = KeysOfType<MixedTypes, number>; // 'id' | 'count'

// 7. FunctionPropertyNames - Get names of function properties
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

class UserService {
  id: number = 1;
  name: string = 'service';
  
  getUser(): User { return {} as User; }
  updateUser(user: User): void {}
  deleteUser(id: number): boolean { return true; }
}

type ServiceMethods = FunctionPropertyNames<UserService>;
// Result: 'getUser' | 'updateUser' | 'deleteUser'

type ServiceProperties = NonFunctionPropertyNames<UserService>;
// Result: 'id' | 'name'

// 8. StrictPick - Pick with compile-time key validation
type StrictPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 9. RenameKeys - Rename object keys
type RenameKeys<T, R extends Record<keyof T, string>> = {
  [P in keyof T as P extends keyof R ? R[P] : P]: T[P];
};

type RenamedUser = RenameKeys<User, {
  id: 'userId';
  name: 'fullName';
}>;
// Result: { userId: number; fullName: string; email: string; }

// 10. ConditionalKeys - Get keys based on condition
type ConditionalKeys<Base, Condition> = NonNullable<{
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
}[keyof Base]>;

type OptionalKeys<T> = ConditionalKeys<T, T[keyof T] | undefined>;
type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

interface PartialUser {
  id: number;
  name?: string;
  email?: string;
  isActive: boolean;
}

type OptionalUserKeys = OptionalKeys<PartialUser>; // 'name' | 'email'
type RequiredUserKeys = RequiredKeys<PartialUser>; // 'id' | 'isActive'

// 11. Advanced Mapped Type with Template Literals
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type Setters<T> = {
  [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
};

type UserGetters = Getters<User>;
// Result: { getId(): number; getName(): string; getEmail(): string; }

type UserSetters = Setters<User>;
// Result: { setId(value: number): void; setName(value: string): void; setEmail(value: string): void; }

// 12. Proxy Type for Dynamic Properties
type ProxyType<T> = {
  [P in keyof T]: T[P];
} & {
  [K: string]: any; // Allow additional dynamic properties
};

// 13. Builder Pattern Type
type Builder<T> = {
  [P in keyof T as `with${Capitalize<string & P>}`]: (value: T[P]) => Builder<T>;
} & {
  build(): T;
};

class UserBuilder implements Builder<User> {
  private user: Partial<User> = {};

  withId(value: number): Builder<User> {
    this.user.id = value;
    return this;
  }

  withName(value: string): Builder<User> {
    this.user.name = value;
    return this;
  }

  withEmail(value: string): Builder<User> {
    this.user.email = value;
    return this;
  }

  build(): User {
    if (!this.user.id || !this.user.name || !this.user.email) {
      throw new Error('Missing required user properties');
    }
    return this.user as User;
  }
}
```

---

## Utility Types

### Q7: Explain the built-in utility types and create advanced custom ones.

**Answer:**
TypeScript provides many built-in utility types for common type transformations. Understanding these enables creating more sophisticated custom utilities.

```typescript
// Built-in Utility Types Overview

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
}

// 1. Partial<T> - Make all properties optional
type PartialUser = Partial<User>;
// Result: { id?: number; name?: string; email?: string; age?: number; isActive?: boolean; }

// 2. Required<T> - Make all properties required
type RequiredUser = Required<User>;
// Result: { id: number; name: string; email: string; age: number; isActive: boolean; }

// 3. Readonly<T> - Make all properties readonly
type ReadonlyUser = Readonly<User>;

// 4. Pick<T, K> - Pick specific properties
type UserSummary = Pick<User, 'id' | 'name'>;
// Result: { id: number; name: string; }

// 5. Omit<T, K> - Omit specific properties
type UserWithoutId = Omit<User, 'id'>;
// Result: { name: string; email: string; age?: number; isActive: boolean; }

// 6. Record<K, T> - Create object type with specific keys and value type
type UserRoles = Record<'admin' | 'user' | 'guest', string[]>;
// Result: { admin: string[]; user: string[]; guest: string[]; }

// 7. Exclude<T, U> - Exclude types from union
type Status = 'pending' | 'approved' | 'rejected' | 'cancelled';
type ActiveStatus = Exclude<Status, 'cancelled'>;
// Result: 'pending' | 'approved' | 'rejected'

// 8. Extract<T, U> - Extract types from union
type CompletedStatus = Extract<Status, 'approved' | 'rejected'>;
// Result: 'approved' | 'rejected'

// 9. NonNullable<T> - Remove null and undefined
type NonNullableString = NonNullable<string | null | undefined>;
// Result: string

// 10. ReturnType<T> - Get function return type
function getUser(): User { return {} as User; }
type GetUserReturn = ReturnType<typeof getUser>; // User

// 11. Parameters<T> - Get function parameter types
function updateUser(id: number, data: Partial<User>): void {}
type UpdateUserParams = Parameters<typeof updateUser>;
// Result: [number, Partial<User>]

// Advanced Custom Utility Types

// 1. DeepRequired - Make all properties required recursively
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object 
    ? DeepRequired<T[P]> 
    : T[P];
};

interface NestedOptional {
  user?: {
    profile?: {
      name?: string;
      settings?: {
        theme?: string;
      };
    };
  };
}

type FullyRequired = DeepRequired<NestedOptional>;
// All optional properties become required

// 2. PickByValueType - Pick properties by their value type
type PickByValueType<T, ValueType> = Pick<T, {
  [Key in keyof T]: T[Key] extends ValueType ? Key : never;
}[keyof T]>;

type StringFields = PickByValueType<User, string>;
// Result: { name: string; email: string; }

// 3. OptionalKeys and RequiredKeys
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type UserOptionalKeys = OptionalKeys<User>; // 'age'
type UserRequiredKeys = RequiredKeys<User>; // 'id' | 'name' | 'email' | 'isActive'

// 4. Merge - Merge two types with second overriding first
type Merge<T, U> = Omit<T, keyof U> & U;

interface UserBase {
  id: number;
  name: string;
  email: string;
}

interface UserExtension {
  email: string; // Override type
  role: string; // Add new property
}

type MergedUser = Merge<UserBase, UserExtension>;
// Result: { id: number; name: string; email: string; role: string; }

// 5. PartialBy - Make specific keys optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalEmail = PartialBy<User, 'email' | 'isActive'>;
// Result: { id: number; name: string; age?: number; email?: string; isActive?: boolean; }

// 6. RequiredBy - Make specific keys required
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type UserWithRequiredAge = RequiredBy<User, 'age'>;
// Result: { id: number; name: string; email: string; isActive: boolean; age: number; }

// 7. Mutable - Remove readonly modifiers
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// 8. DeepMutable - Remove readonly modifiers recursively
type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

// 9. FunctionKeys - Get keys of function properties
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// 10. NonFunctionKeys - Get keys of non-function properties
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

class ApiService {
  baseUrl: string = '';
  timeout: number = 5000;
  
  get<T>(url: string): Promise<T> { return Promise.resolve({} as T); }
  post<T>(url: string, data: any): Promise<T> { return Promise.resolve({} as T); }
}

type ServiceMethods = FunctionKeys<ApiService>; // 'get' | 'post'
type ServiceProperties = NonFunctionKeys<ApiService>; // 'baseUrl' | 'timeout'

// 11. Promisify - Convert function return types to promises
type Promisify<T> = T extends (...args: infer A) => infer R 
  ? (...args: A) => Promise<R>
  : never;

type SyncFunction = (x: number, y: string) => boolean;
type AsyncFunction = Promisify<SyncFunction>;
// Result: (x: number, y: string) => Promise<boolean>

// 12. UnionToIntersection - Convert union to intersection
type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>;
// Result: { a: string } & { b: number }

// 13. TupleToUnion - Convert tuple to union
type TupleToUnion<T extends readonly any[]> = T[number];

type Colors = ['red', 'green', 'blue'] as const;
type ColorUnion = TupleToUnion<Colors>; // 'red' | 'green' | 'blue'

// 14. DeepPick - Pick nested properties
type DeepPick<T, K extends string> = 
  K extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? { [P in Key]: DeepPick<T[Key], Rest> }
      : never
    : K extends keyof T
      ? { [P in K]: T[K] }
      : never;

interface DeepObject {
  user: {
    profile: {
      name: string;
      age: number;
    };
    settings: {
      theme: string;
    };
  };
  app: {
    version: string;
  };
}

type UserName = DeepPick<DeepObject, 'user.profile.name'>;
// Result: { user: { profile: { name: string } } }

// 15. Branded Types for Type Safety
type Brand<T, B> = T & { readonly __brand: B };

type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;

function createUserId(id: number): UserId {
  return id as UserId;
}

function getUserById(id: UserId): User | undefined {
  // Implementation
  return undefined;
}

const userId = createUserId(123);
const productId = 456 as ProductId;

getUserById(userId); // OK
// getUserById(productId); // Error - different branded types
// getUserById(123); // Error - plain number not assignable
```

---

## Generics

### Q8: Explain TypeScript generics with advanced patterns and constraints.

**Answer:**
Generics provide a way to create reusable components that work with multiple types while maintaining type safety.

```typescript
// Basic Generics
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>('hello'); // string
const numberResult = identity(42); // Type inferred as number

// Generic Interfaces
interface Repository<T> {
  findById(id: number): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<boolean>;
  findAll(): Promise<T[]>;
}

class UserRepository implements Repository<User> {
  async findById(id: number): Promise<User | null> {
    // Implementation
    return null;
  }

  async save(user: User): Promise<User> {
    // Implementation
    return user;
  }

  async delete(id: number): Promise<boolean> {
    // Implementation
    return true;
  }

  async findAll(): Promise<User[]> {
    // Implementation
    return [];
  }
}

// Generic Classes with Constraints
interface Identifiable {
  id: number;
}

class BaseService<T extends Identifiable> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  update(id: number, updates: Partial<T>): T | null {
    const item = this.findById(id);
    if (item) {
      Object.assign(item, updates);
      return item;
    }
    return null;
  }

  remove(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Advanced Generic Constraints
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Versioned {
  version: number;
}

// Multiple constraints
class AuditableService<T extends Identifiable & Timestamped & Versioned> 
  extends BaseService<T> {
  
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'version'>): T {
    const now = new Date();
    const item = {
      ...data,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
      version: 1
    } as T;
    
    this.add(item);
    return item;
  }

  update(id: number, updates: Partial<Omit<T, 'id' | 'createdAt'>>): T | null {
    const item = this.findById(id);
    if (item) {
      const updatedItem = {
        ...item,
        ...updates,
        updatedAt: new Date(),
        version: item.version + 1
      };
      
      const index = this.items.findIndex(i => i.id === id);
      this.items[index] = updatedItem;
      return updatedItem;
    }
    return null;
  }

  private generateId(): number {
    return Math.max(0, ...this.items.map(item => item.id)) + 1;
  }
}

// Conditional Types with Generics
type ApiResponse<T> = T extends string 
  ? { message: T }
  : T extends number 
    ? { count: T }
    : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type NumberResponse = ApiResponse<number>; // { count: number }
type ObjectResponse = ApiResponse<User>; // { data: User }

// Generic Utility Functions
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

// Advanced Generic Patterns

// 1. Generic Factory Pattern
interface Factory<T> {
  create(...args: any[]): T;
}

class UserFactory implements Factory<User> {
  create(name: string, email: string): User {
    return {
      id: Math.random(),
      name,
      email,
      isActive: true
    };
  }
}

// 2. Generic Builder Pattern
class QueryBuilder<T> {
  private conditions: string[] = [];
  private selectFields: (keyof T)[] = [];
  private orderByField?: keyof T;
  private limitValue?: number;

  select(...fields: (keyof T)[]): QueryBuilder<T> {
    this.selectFields = fields;
    return this;
  }

  where(field: keyof T, operator: string, value: any): QueryBuilder<T> {
    this.conditions.push(`${String(field)} ${operator} ${value}`);
    return this;
  }

  orderBy(field: keyof T): QueryBuilder<T> {
    this.orderByField = field;
    return this;
  }

  limit(count: number): QueryBuilder<T> {
    this.limitValue = count;
    return this;
  }

  build(): string {
    let query = 'SELECT ';
    
    if (this.selectFields.length > 0) {
      query += this.selectFields.map(f => String(f)).join(', ');
    } else {
      query += '*';
    }
    
    query += ' FROM table';
    
    if (this.conditions.length > 0) {
      query += ' WHERE ' + this.conditions.join(' AND ');
    }
    
    if (this.orderByField) {
      query += ` ORDER BY ${String(this.orderByField)}`;
    }
    
    if (this.limitValue) {
      query += ` LIMIT ${this.limitValue}`;
    }
    
    return query;
  }
}

// Usage
const userQuery = new QueryBuilder<User>()
  .select('id', 'name', 'email')
  .where('isActive', '=', true)
  .orderBy('name')
  .limit(10)
  .build();

// 3. Generic Event System
interface EventMap {
  'user:created': { user: User };
  'user:updated': { user: User; changes: Partial<User> };
  'user:deleted': { userId: number };
}

class EventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }

  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

const eventEmitter = new EventEmitter<EventMap>();

eventEmitter.on('user:created', ({ user }) => {
  console.log(`User created: ${user.name}`);
});

eventEmitter.emit('user:created', { user: { id: 1, name: 'John', email: 'john@example.com', isActive: true } });

// 4. Generic State Management
interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type StateUpdater<T> = (prevState: T) => T;

class StateManager<T> {
  private state: T;
  private listeners: Array<(state: T) => void> = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(updater: Partial<T> | StateUpdater<T>): void {
    if (typeof updater === 'function') {
      this.state = (updater as StateUpdater<T>)(this.state);
    } else {
      this.state = { ...this.state, ...updater };
    }
    
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: (state: T) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Generic selector
  select<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  // Computed values
  compute<R>(selector: (state: T) => R): R {
    return selector(this.state);
  }
}

const stateManager = new StateManager<State>({
  user: null,
  loading: false,
  error: null
});

// 5. Generic Validation System
type ValidationRule<T> = (value: T) => string | null;

class Validator<T> {
  private rules: ValidationRule<T>[] = [];

  addRule(rule: ValidationRule<T>): Validator<T> {
    this.rules.push(rule);
    return this;
  }

  validate(value: T): string[] {
    const errors: string[] = [];
    
    for (const rule of this.rules) {
      const error = rule(value);
      if (error) {
        errors.push(error);
      }
    }
    
    return errors;
  }

  isValid(value: T): boolean {
    return this.validate(value).length === 0;
  }
}

// Usage
const emailValidator = new Validator<string>()
  .addRule(value => value.length === 0 ? 'Email is required' : null)
  .addRule(value => !value.includes('@') ? 'Invalid email format' : null)
  .addRule(value => value.length > 100 ? 'Email too long' : null);

const errors = emailValidator.validate('invalid-email');
console.log(errors); // ['Invalid email format']
```

---

## Modern TypeScript Features

### Q9: Explain template literal types and their advanced use cases.

**Answer:**
Template literal types allow you to create types based on string patterns, enabling powerful type-level string manipulation.

```typescript
// Basic Template Literal Types
type Greeting = `Hello, ${string}!`;
type PersonalGreeting = `Hello, ${'John' | 'Jane'}!`;
// Result: 'Hello, John!' | 'Hello, Jane!'

// Advanced Template Literal Patterns

// 1. Event System with Type Safety
type EventType = 'click' | 'hover' | 'focus';
type ElementType = 'button' | 'input' | 'div';

type EventHandler = `on${Capitalize<EventType>}`;
// Result: 'onClick' | 'onHover' | 'onFocus'

type ElementEvent = `${ElementType}:${EventType}`;
// Result: 'button:click' | 'button:hover' | 'button:focus' | 'input:click' | ...

interface EventMap {
  'button:click': { target: HTMLButtonElement; x: number; y: number };
  'button:hover': { target: HTMLButtonElement };
  'input:focus': { target: HTMLInputElement; value: string };
  'input:blur': { target: HTMLInputElement; value: string };
}

class TypedEventEmitter {
  private listeners: Map<string, Function[]> = new Map();

  on<K extends keyof EventMap>(event: K, handler: (data: EventMap[K]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }
}

// 2. API Route Type Generation
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiVersion = 'v1' | 'v2';
type Resource = 'users' | 'products' | 'orders';

type ApiRoute = `/api/${ApiVersion}/${Resource}`;
// Result: '/api/v1/users' | '/api/v1/products' | '/api/v1/orders' | '/api/v2/users' | ...

type ApiEndpoint<T extends Resource> = `/api/${ApiVersion}/${T}/${string}`;

class ApiClient {
  async get<T extends Resource>(endpoint: ApiRoute): Promise<any> {
    return fetch(endpoint).then(res => res.json());
  }

  async getById<T extends Resource>(resource: T, id: string): Promise<any> {
    const endpoint: ApiEndpoint<T> = `/api/v1/${resource}/${id}`;
    return fetch(endpoint).then(res => res.json());
  }
}

// 3. CSS-in-JS Type Safety
type CSSProperty = 
  | 'color' 
  | 'backgroundColor' 
  | 'fontSize' 
  | 'margin' 
  | 'padding'
  | 'border'
  | 'borderRadius';

type CSSValue = string | number;

type CSSRule = `${CSSProperty}: ${string}`;

type StyledComponent<T extends string> = {
  [K in T as `${K}Styled`]: (styles: Record<CSSProperty, CSSValue>) => string;
};

type ComponentNames = 'Button' | 'Input' | 'Card';
type StyledComponents = StyledComponent<ComponentNames>;
// Result: { ButtonStyled: ..., InputStyled: ..., CardStyled: ... }

// 4. Database Query Builder with Template Literals
type TableName = 'users' | 'products' | 'orders';
type Operation = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';

type SQLQuery<T extends TableName, O extends Operation> = 
  `${O} ${O extends 'SELECT' ? '*' : ''} FROM ${T}`;

class QueryBuilder {
  select<T extends TableName>(table: T): SQLQuery<T, 'SELECT'> {
    return `SELECT * FROM ${table}`;
  }

  insert<T extends TableName>(table: T): SQLQuery<T, 'INSERT'> {
    return `INSERT  FROM ${table}`;
  }
}

// 5. Form Field Validation with Template Literals
type ValidationRule = 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
type FieldName = string;

type ValidationKey<F extends FieldName, R extends ValidationRule> = 
  `${F}.${R}`;

type FormValidation<T extends Record<string, any>> = {
  [K in keyof T as ValidationKey<string & K, ValidationRule>]?: string;
};

interface UserForm {
  name: string;
  email: string;
  password: string;
}

type UserFormValidation = FormValidation<UserForm>;
// Result includes: 'name.required', 'name.minLength', 'email.email', etc.

const validationMessages: Partial<UserFormValidation> = {
  'name.required': 'Name is required',
  'name.minLength': 'Name must be at least 2 characters',
  'email.required': 'Email is required',
  'email.email': 'Invalid email format',
  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 8 characters'
};

// 6. Advanced Path Manipulation
type Split<S extends string, D extends string> = 
  S extends `${infer T}${D}${infer U}` 
    ? [T, ...Split<U, D>] 
    : [S];

type Join<T extends readonly string[], D extends string> = 
  T extends readonly [infer F, ...infer R]
    ? F extends string
      ? R extends readonly string[]
        ? R['length'] extends 0
          ? F
          : `${F}${D}${Join<R, D>}`
        : never
      : never
    : '';

type PathSegments = Split<'user/profile/settings', '/'>;
// Result: ['user', 'profile', 'settings']

type ReconstructedPath = Join<['api', 'v1', 'users'], '/'>;
// Result: 'api/v1/users'

// 7. Type-safe Environment Variables
type EnvPrefix = 'REACT_APP_' | 'NEXT_PUBLIC_' | 'VITE_';
type EnvVarName = 'API_URL' | 'DEBUG' | 'VERSION';

type EnvVar<P extends EnvPrefix, N extends EnvVarName> = `${P}${N}`;

type ReactEnvVars = EnvVar<'REACT_APP_', EnvVarName>;
// Result: 'REACT_APP_API_URL' | 'REACT_APP_DEBUG' | 'REACT_APP_VERSION'

class EnvironmentConfig {
  private static getValue<T extends string>(key: T): string | undefined {
    return process.env[key];
  }

  static getReactAppVar<N extends EnvVarName>(name: N): string | undefined {
    const key: EnvVar<'REACT_APP_', N> = `REACT_APP_${name}`;
    return this.getValue(key);
  }

  static getViteVar<N extends EnvVarName>(name: N): string | undefined {
    const key: EnvVar<'VITE_', N> = `VITE_${name}`;
    return this.getValue(key);
  }
}

// 8. Advanced String Manipulation Types
type Reverse<S extends string> = 
  S extends `${infer First}${infer Rest}` 
    ? `${Reverse<Rest>}${First}` 
    : '';

type PascalCase<S extends string> = 
  S extends `${infer First}_${infer Rest}`
    ? `${Capitalize<First>}${PascalCase<Rest>}`
    : Capitalize<S>;

type CamelCase<S extends string> = 
  S extends `${infer First}_${infer Rest}`
    ? `${Lowercase<First>}${PascalCase<Rest>}`
    : Lowercase<S>;

type SnakeCase<S extends string> = 
  S extends `${infer First}${infer Rest}`
    ? First extends Uppercase<First>
      ? `_${Lowercase<First>}${SnakeCase<Rest>}`
      : `${First}${SnakeCase<Rest>}`
    : '';

type TestReverse = Reverse<'hello'>; // 'olleh'
type TestPascal = PascalCase<'user_profile_settings'>; // 'UserProfileSettings'
type TestCamel = CamelCase<'user_profile_settings'>; // 'userProfileSettings'
type TestSnake = SnakeCase<'UserProfileSettings'>; // '_user_profile_settings'

// 9. URL Parameter Extraction
type ExtractParams<T extends string> = 
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<Rest>
    : T extends `${infer _Start}:${infer Param}`
      ? Param
      : never;

type RouteParams = ExtractParams<'/users/:userId/posts/:postId'>;
// Result: 'userId' | 'postId'

type RouteParamsObject<T extends string> = {
  [K in ExtractParams<T>]: string;
};

type UserPostParams = RouteParamsObject<'/users/:userId/posts/:postId'>;
// Result: { userId: string; postId: string; }

// 10. Advanced Type Branding with Template Literals
type BrandedId<T extends string> = string & { readonly __brand: T };

type UserId = BrandedId<'User'>;
type ProductId = BrandedId<'Product'>;
type OrderId = BrandedId<'Order'>;

function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

// Type-safe ID operations
function getUserById(id: UserId): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}

// This prevents mixing up different ID types
const userId = createUserId('user_123');
const productId = createProductId('prod_456');

getUserById(userId); // OK
// getUserById(productId); // Error - ProductId not assignable to UserId
```

---

## Decorators

### Q10: Explain TypeScript decorators and their practical applications.

**Answer:**
Decorators provide a way to add metadata and modify classes, methods, properties, and parameters at design time.

```typescript
// Enable decorators in tsconfig.json:
// "experimentalDecorators": true,
// "emitDecoratorMetadata": true

// Class Decorators
function Entity(tableName: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      tableName = tableName;
      
      save() {
        console.log(`Saving to table: ${tableName}`);
      }
    };
  };
}

@Entity('users')
class User {
  constructor(public name: string, public email: string) {}
}

const user = new User('John', 'john@example.com');
(user as any).save(); // "Saving to table: users"

// Method Decorators
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with arguments:`, args);
    const result = method.apply(this, args);
    console.log(`${propertyName} returned:`, result);
    return result;
  };
}

function Measure(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = method.apply(this, args);
    const end = performance.now();
    console.log(`${propertyName} took ${end - start} milliseconds`);
    return result;
  };
}

class Calculator {
  @Log
  @Measure
  add(a: number, b: number): number {
    return a + b;
  }
  
  @Log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// Property Decorators
function Required(target: any, propertyName: string) {
  let value: any;
  
  const getter = () => {
    return value;
  };
  
  const setter = (newValue: any) => {
    if (newValue === null || newValue === undefined) {
      throw new Error(`${propertyName} is required`);
    }
    value = newValue;
  };
  
  Object.defineProperty(target, propertyName, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

function MinLength(length: number) {
  return function (target: any, propertyName: string) {
    let value: string;
    
    const getter = () => value;
    const setter = (newValue: string) => {
      if (newValue.length < length) {
        throw new Error(`${propertyName} must be at least ${length} characters`);
      }
      value = newValue;
    };
    
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class UserModel {
  @Required
  @MinLength(2)
  name!: string;
  
  @Required
  email!: string;
  
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

// Parameter Decorators
function Validate(target: any, propertyName: string, parameterIndex: number) {
  const existingValidators = Reflect.getMetadata('validators', target, propertyName) || [];
  existingValidators.push(parameterIndex);
  Reflect.defineMetadata('validators', existingValidators, target, propertyName);
}

function ValidateEmail(target: any, propertyName: string, parameterIndex: number) {
  const existingEmailValidators = Reflect.getMetadata('emailValidators', target, propertyName) || [];
  existingEmailValidators.push(parameterIndex);
  Reflect.defineMetadata('emailValidators', existingEmailValidators, target, propertyName);
}

// Advanced Decorator Patterns

// 1. Caching Decorator
function Cache(ttl: number = 60000) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const cache = new Map<string, { value: any; timestamp: number }>();
    
    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      
      if (cached && Date.now() - cached.timestamp < ttl) {
        console.log(`Cache hit for ${propertyName}`);
        return cached.value;
      }
      
      const result = method.apply(this, args);
      cache.set(key, { value: result, timestamp: Date.now() });
      console.log(`Cache miss for ${propertyName}`);
      return result;
    };
  };
}

// 2. Retry Decorator
function Retry(attempts: number = 3, delay: number = 1000) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      let lastError: any;
      
      for (let i = 0; i < attempts; i++) {
        try {
          return await method.apply(this, args);
        } catch (error) {
          lastError = error;
          console.log(`Attempt ${i + 1} failed for ${propertyName}:`, error.message);
          
          if (i < attempts - 1) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      throw lastError;
    };
  };
}

// 3. Rate Limiting Decorator
function RateLimit(maxCalls: number, windowMs: number) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const calls: number[] = [];
    
    descriptor.value = function (...args: any[]) {
      const now = Date.now();
      
      // Remove old calls outside the window
      while (calls.length > 0 && now - calls[0] > windowMs) {
        calls.shift();
      }
      
      if (calls.length >= maxCalls) {
        throw new Error(`Rate limit exceeded for ${propertyName}`);
      }
      
      calls.push(now);
      return method.apply(this, args);
    };
  };
}

class ApiService {
  @Cache(30000) // Cache for 30 seconds
  @Retry(3, 1000) // Retry 3 times with 1 second delay
  async fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    return response.json();
  }
  
  @RateLimit(10, 60000) // Max 10 calls per minute
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Email sending logic
    console.log(`Sending email to ${to}`);
  }
}

// 4. Validation Decorator Factory
function ValidateParams(...validators: Array<(value: any) => boolean>) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      args.forEach((arg, index) => {
        if (validators[index] && !validators[index](arg)) {
          throw new Error(`Invalid parameter at index ${index} for ${propertyName}`);
        }
      });
      
      return method.apply(this, args);
    };
  };
}

// Validation functions
const isString = (value: any): boolean => typeof value === 'string';
const isNumber = (value: any): boolean => typeof value === 'number';
const isEmail = (value: any): boolean => 
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

class UserService {
  @ValidateParams(isNumber)
  getUserById(id: number): User | null {
    // Implementation
    return null;
  }
  
  @ValidateParams(isString, isEmail)
  createUser(name: string, email: string): User {
    return { id: Math.random(), name, email, isActive: true };
  }
}
```

---

## Best Practices

### Q11: What are TypeScript best practices for large-scale applications?

**Answer:**
Large-scale TypeScript applications require careful consideration of type safety, maintainability, and performance.

```typescript
// 1. Strict TypeScript Configuration
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}

// 2. Proper Type Definitions
// Define clear interfaces for all data structures
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  metadata?: {
    page: number;
    limit: number;
    total: number;
  };
}

interface User {
  readonly id: number;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  profile: UserProfile;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

// 3. Use Enums for Constants
enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest'
}

enum Permission {
  READ_USERS = 'read:users',
  WRITE_USERS = 'write:users',
  DELETE_USERS = 'delete:users',
  MANAGE_SYSTEM = 'manage:system'
}

// 4. Type Guards for Runtime Safety
function isUser(obj: any): obj is User {
  return obj &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    Object.values(UserRole).includes(obj.role);
}

function isApiResponse<T>(obj: any, dataValidator: (data: any) => data is T): obj is ApiResponse<T> {
  return obj &&
    typeof obj.success === 'boolean' &&
    (obj.data === undefined || dataValidator(obj.data));
}

// 5. Generic Repository Pattern
interface Repository<T, K = number> {
  findById(id: K): Promise<T | null>;
  findAll(filters?: Partial<T>): Promise<T[]>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: K, updates: Partial<T>): Promise<T | null>;
  delete(id: K): Promise<boolean>;
}

abstract class BaseRepository<T extends { id: K }, K = number> implements Repository<T, K> {
  protected abstract tableName: string;
  
  async findById(id: K): Promise<T | null> {
    // Implementation with proper error handling
    try {
      const result = await this.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
      return result[0] || null;
    } catch (error) {
      console.error(`Error finding ${this.tableName} by id:`, error);
      return null;
    }
  }
  
  async findAll(filters?: Partial<T>): Promise<T[]> {
    // Implementation
    return [];
  }
  
  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    // Implementation
    return {} as T;
  }
  
  async update(id: K, updates: Partial<T>): Promise<T | null> {
    // Implementation
    return null;
  }
  
  async delete(id: K): Promise<boolean> {
    // Implementation
    return false;
  }
  
  protected abstract query(sql: string, params: any[]): Promise<any[]>;
}

class UserRepository extends BaseRepository<User> {
  protected tableName = 'users';
  
  protected async query(sql: string, params: any[]): Promise<any[]> {
    // Database query implementation
    return [];
  }
  
  // User-specific methods
  async findByEmail(email: string): Promise<User | null> {
    const results = await this.query('SELECT * FROM users WHERE email = ?', [email]);
    return results[0] || null;
  }
  
  async findByRole(role: UserRole): Promise<User[]> {
    return this.query('SELECT * FROM users WHERE role = ?', [role]);
  }
}

// 6. Service Layer with Dependency Injection
interface UserService {
  getUser(id: number): Promise<User | null>;
  createUser(userData: CreateUserRequest): Promise<User>;
  updateUser(id: number, updates: UpdateUserRequest): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;
}

interface CreateUserRequest {
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  permissions?: Permission[];
}

class UserServiceImpl implements UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private auditService: AuditService
  ) {}
  
  async getUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    
    if (user) {
      await this.auditService.log('user_accessed', { userId: id });
    }
    
    return user;
  }
  
  async createUser(userData: CreateUserRequest): Promise<User> {
    // Validation
    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Check for existing user
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create user
    const user = await this.userRepository.create({
      ...userData,
      profile: this.createDefaultProfile(),
      settings: this.createDefaultSettings()
    });
    
    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email, user.name);
    
    // Audit log
    await this.auditService.log('user_created', { userId: user.id });
    
    return user;
  }
  
  async updateUser(id: number, updates: UpdateUserRequest): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }
    
    // Validate updates
    if (updates.email && !this.isValidEmail(updates.email)) {
      throw new Error('Invalid email format');
    }
    
    const updatedUser = await this.userRepository.update(id, updates);
    
    if (updatedUser) {
      await this.auditService.log('user_updated', { 
        userId: id, 
        changes: updates 
      });
    }
    
    return updatedUser;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    const success = await this.userRepository.delete(id);
    
    if (success) {
      await this.auditService.log('user_deleted', { userId: id });
    }
    
    return success;
  }
  
  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  private createDefaultProfile(): UserProfile {
    return {
      avatar: null,
      bio: '',
      location: '',
      website: ''
    };
  }
  
  private createDefaultSettings(): UserSettings {
    return {
      theme: 'light',
      notifications: {
        email: true,
        push: false,
        sms: false
      },
      privacy: {
        profileVisible: true,
        emailVisible: false
      }
    };
  }
}

// 7. Error Handling with Custom Error Types
abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly isOperational: boolean;
  
  constructor(message: string, public readonly context?: Record<string, any>) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly isOperational = true;
  
  constructor(message: string, public readonly field: string, context?: Record<string, any>) {
    super(message, context);
  }
}

class NotFoundError extends AppError {
  readonly statusCode = 404;
  readonly isOperational = true;
  
  constructor(resource: string, id: string | number) {
    super(`${resource} with id ${id} not found`);
  }
}

class DatabaseError extends AppError {
  readonly statusCode = 500;
  readonly isOperational = false;
  
  constructor(message: string, public readonly query?: string) {
    super(message);
  }
}

// 8. Result Pattern for Error Handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function createSuccess<T>(data: T): Result<T> {
  return { success: true, data };
}

function createError<E>(error: E): Result<never, E> {
  return { success: false, error };
}

class SafeUserService {
  constructor(private userService: UserService) {}
  
  async getUser(id: number): Promise<Result<User, NotFoundError | DatabaseError>> {
    try {
      const user = await this.userService.getUser(id);
      
      if (!user) {
        return createError(new NotFoundError('User', id));
      }
      
      return createSuccess(user);
    } catch (error) {
      if (error instanceof AppError) {
        return createError(error as NotFoundError | DatabaseError);
      }
      
      return createError(new DatabaseError('Unexpected error occurred'));
    }
  }
}

// Supporting interfaces
interface UserProfile {
  avatar: string | null;
  bio: string;
  location: string;
  website: string;
}

interface UserSettings {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    emailVisible: boolean;
  };
}

interface EmailService {
  sendWelcomeEmail(email: string, name: string): Promise<void>;
}

interface AuditService {
  log(action: string, context: Record<string, any>): Promise<void>;
}
```

---

## Performance Optimization

### Q12: How do you optimize TypeScript compilation and runtime performance?

**Answer:**
TypeScript performance optimization involves both compile-time and runtime considerations.

```typescript
// 1. Compilation Performance Optimization
// tsconfig.json for better compilation performance
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo",
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "isolatedModules": true,
    "noEmitOnError": false,
    "preserveWatchOutput": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}

// 2. Lazy Loading with Dynamic Imports
class ModuleLoader {
  private moduleCache = new Map<string, any>();
  
  async loadModule<T>(moduleName: string): Promise<T> {
    if (this.moduleCache.has(moduleName)) {
      return this.moduleCache.get(moduleName);
    }
    
    let module: T;
    
    switch (moduleName) {
      case 'analytics':
        module = await import('./analytics/analytics.module');
        break;
      case 'charts':
        module = await import('./charts/charts.module');
        break;
      case 'reports':
        module = await import('./reports/reports.module');
        break;
      default:
        throw new Error(`Unknown module: ${moduleName}`);
    }
    
    this.moduleCache.set(moduleName, module);
    return module;
  }
  
  clearCache(): void {
    this.moduleCache.clear();
  }
}

// 3. Efficient Type Definitions
// Use const assertions for better performance
const API_ENDPOINTS = {
  users: '/api/users',
  posts: '/api/posts',
  comments: '/api/comments'
} as const;

type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

// Use template literal types efficiently
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiRoute<T extends string> = `${HttpMethod} ${T}`;

type UserRoutes = 
  | ApiRoute<'/api/users'>
  | ApiRoute<'/api/users/:id'>
  | ApiRoute<'/api/users/:id/posts'>;

// 4. Memory-Efficient Data Structures
class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private readonly maxSize: number;
  
  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }
  
  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  get size(): number {
    return this.cache.size;
  }
}

// 5. Optimized Event Handling
class EventEmitter<T extends Record<string, any[]>> {
  private listeners = new Map<keyof T, Set<(...args: any[]) => void>>();
  
  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    const eventListeners = this.listeners.get(event)!;
    eventListeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      eventListeners.delete(listener);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    };
  }
  
  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      // Create array once for better performance
      const listenersArray = Array.from(eventListeners);
      for (const listener of listenersArray) {
        try {
          listener(...args);
        } catch (error) {
          console.error(`Error in event listener for ${String(event)}:`, error);
        }
      }
    }
  }
  
  removeAllListeners(event?: keyof T): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

// Usage
interface AppEvents {
  'user:login': [user: User];
  'user:logout': [];
  'data:updated': [data: any, timestamp: number];
}

const eventEmitter = new EventEmitter<AppEvents>();

// 6. Efficient Async Operations
class AsyncQueue {
  private queue: Array<() => Promise<any>> = [];
  private running = false;
  private concurrency: number;
  private activeCount = 0;
  
  constructor(concurrency: number = 3) {
    this.concurrency = concurrency;
  }
  
  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.process();
    });
  }
  
  private async process(): Promise<void> {
    if (this.activeCount >= this.concurrency || this.queue.length === 0) {
      return;
    }
    
    this.activeCount++;
    const task = this.queue.shift()!;
    
    try {
      await task();
    } finally {
      this.activeCount--;
      this.process(); // Process next task
    }
  }
  
  get pending(): number {
    return this.queue.length;
  }
  
  get active(): number {
    return this.activeCount;
  }
}

// 7. Optimized Data Processing
class DataProcessor<T> {
  private batchSize: number;
  private processingDelay: number;
  
  constructor(batchSize: number = 100, processingDelay: number = 0) {
    this.batchSize = batchSize;
    this.processingDelay = processingDelay;
  }
  
  async processBatch(
    data: T[], 
    processor: (batch: T[]) => Promise<void>
  ): Promise<void> {
    for (let i = 0; i < data.length; i += this.batchSize) {
      const batch = data.slice(i, i + this.batchSize);
      await processor(batch);
      
      // Allow other tasks to run
      if (this.processingDelay > 0) {
        await this.delay(this.processingDelay);
      }
    }
  }
  
  async processParallel(
    data: T[],
    processor: (item: T) => Promise<void>,
    concurrency: number = 5
  ): Promise<void> {
    const queue = new AsyncQueue(concurrency);
    
    const promises = data.map(item => 
      queue.add(() => processor(item))
    );
    
    await Promise.all(promises);
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

---

## Modern TypeScript Features

### Q13: What are the latest TypeScript features and how do you use them?

**Answer:**
Modern TypeScript includes many powerful features for better type safety and developer experience.

```typescript
// 1. Template Literal Types (4.1+)
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'
type HoverEvent = EventName<'hover'>; // 'onHover'

// Advanced template literal patterns
type CSSProperty = 
  | 'margin' | 'padding' | 'border'
  | 'margin-top' | 'margin-bottom' | 'margin-left' | 'margin-right'
  | 'padding-top' | 'padding-bottom' | 'padding-left' | 'padding-right';

type CSSValue = string | number;
type CSSDeclaration = {
  [K in CSSProperty]: CSSValue;
};

// URL pattern matching
type ApiVersion = 'v1' | 'v2' | 'v3';
type ResourceType = 'users' | 'posts' | 'comments';
type ApiUrl = `/api/${ApiVersion}/${ResourceType}`;
type UserApiUrl = `/api/${ApiVersion}/users`;

// 2. Key Remapping in Mapped Types (4.1+)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type AccessorMethods<T> = Getters<T> & Setters<T>;

interface Person {
  name: string;
  age: number;
  email: string;
}

type PersonAccessors = AccessorMethods<Person>;
// Result:
// {
//   getName(): string;
//   setName(value: string): void;
//   getAge(): number;
//   setAge(value: number): void;
//   getEmail(): string;
//   setEmail(value: string): void;
// }

// 3. Recursive Conditional Types (4.1+)
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Flatten nested objects
type Flatten<T> = T extends any[] 
  ? T[0] 
  : T extends object 
    ? { [K in keyof T]: Flatten<T[K]> }
    : T;

// 4. Variadic Tuple Types (4.0+)
type Head<T extends readonly any[]> = T extends readonly [any, ...any[]] ? T[0] : never;
type Tail<T extends readonly any[]> = T extends readonly [any, ...infer U] ? U : [];
type Last<T extends readonly any[]> = T extends readonly [...any[], infer U] ? U : never;
type Init<T extends readonly any[]> = T extends readonly [...infer U, any] ? U : [];

// Function composition with proper typing
type Fn<A, B> = (a: A) => B;

type Compose<F extends readonly Fn<any, any>[]> = 
  F extends readonly [Fn<infer A, infer B>]
    ? Fn<A, B>
    : F extends readonly [Fn<infer A, infer B>, ...infer Rest]
      ? Rest extends readonly Fn<any, any>[]
        ? Fn<A, ReturnType<Compose<Rest>>> extends Fn<A, infer C>
          ? B extends Parameters<Compose<Rest>>[0]
            ? Fn<A, C>
            : never
          : never
        : never
      : never;

function compose<F extends readonly Fn<any, any>[]>(...fns: F): Compose<F> {
  return ((x: any) => fns.reduceRight((acc, fn) => fn(acc), x)) as Compose<F>;
}

// Usage
const addOne = (x: number) => x + 1;
const toString = (x: number) => x.toString();
const addExclamation = (x: string) => x + '!';

const composed = compose(addExclamation, toString, addOne);
const result = composed(5); // "6!"

// 5. Const Assertions and as const (3.4+)
const colors = ['red', 'green', 'blue'] as const;
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} as const;

type Config = typeof config;
// {
//   readonly apiUrl: "https://api.example.com";
//   readonly timeout: 5000;
//   readonly retries: 3;
// }

// 6. Assertion Functions (3.7+)
function assertIsNumber(value: any): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Expected number');
  }
}

function assertIsString(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected string');
  }
}

function processValue(value: unknown) {
  assertIsNumber(value);
  // TypeScript now knows value is number
  console.log(value.toFixed(2));
}

// 7. Satisfies Operator (4.9+)
type RGB = [red: number, green: number, blue: number];
type Color2 = RGB | string;

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255]
} satisfies Record<string, Color2>;

// TypeScript knows the exact types
const redValue = palette.red[0]; // number (not Color2)
const greenValue = palette.green.toUpperCase(); // string method available

// 8. Override Modifier (4.3+)
class Animal {
  move(): void {
    console.log('Moving...');
  }
}

class Dog extends Animal {
  override move(): void {
    console.log('Running...');
  }
  
  // This would cause an error if the base method doesn't exist
  // override fly(): void { } // Error!
}

// 9. Import Type (3.8+)
// Only import types, not runtime values
import type { User, UserRole } from './types';
import type * as Types from './all-types';

// Regular import for runtime values
import { createUser, validateUser } from './user-utils';

// 10. Branded Types for Type Safety
type UserId = string & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };
type Password = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  // Validation logic here
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email format');
  }
  return email as Email;
}

function createPassword(password: string): Password {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  return password as Password;
}

// Usage - prevents mixing up different string types
function getUserById(id: UserId): User | null {
  // Implementation
  return null;
}

function sendEmail(to: Email, subject: string, body: string): void {
  // Implementation
}

const userId = createUserId('user123');
const userEmail = createEmail('user@example.com');

// This works
getUserById(userId);
sendEmail(userEmail, 'Hello', 'World');

// This would cause type errors
// getUserById(userEmail); // Error!
// sendEmail(userId, 'Hello', 'World'); // Error!
```

This comprehensive TypeScript guide covers all essential concepts from basic types to advanced patterns, decorators, best practices, performance optimization, and modern features. Each section includes practical examples that demonstrate real-world usage patterns for building robust, type-safe applications.

---

## Advanced TypeScript 5.0+ Features and Patterns

### Q14: How do you implement advanced type manipulation and metaprogramming in TypeScript?
**Difficulty: Expert**

**Answer:**
TypeScript 5.0+ introduces powerful type manipulation capabilities that enable sophisticated metaprogramming patterns and type-level computations.

**1. Advanced Template Literal Types and String Manipulation:**
```typescript
// String manipulation at the type level
type Capitalize<S extends string> = S extends `${infer F}${infer R}` 
  ? `${Uppercase<F>}${R}` 
  : S;

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${P1}${Capitalize<CamelCase<`${P2}${P3}`>>}`
  : S;

type KebabToCamel<S extends string> = S extends `${infer P1}-${infer P2}${infer P3}`
  ? `${P1}${Capitalize<KebabToCamel<`${P2}${P3}`>>}`
  : S;

// Advanced path parsing
type ParsePath<T extends string> = T extends `${infer Segment}/${infer Rest}`
  ? [Segment, ...ParsePath<Rest>]
  : T extends ''
  ? []
  : [T];

type JoinPath<T extends readonly string[]> = T extends readonly [infer First, ...infer Rest]
  ? First extends string
    ? Rest extends readonly string[]
      ? Rest['length'] extends 0
        ? First
        : `${First}/${JoinPath<Rest>}`
      : never
    : never
  : '';

// SQL-like query builder types
type SQLOperator = 'SELECT' | 'FROM' | 'WHERE' | 'ORDER BY' | 'GROUP BY';

type ParseSQL<T extends string> = T extends `${infer Op extends SQLOperator} ${infer Rest}`
  ? { operator: Op; expression: Rest }
  : never;

// Usage examples
type Example1 = CamelCase<'user_name_field'>; // 'userNameField'
type Example2 = KebabToCamel<'user-profile-data'>; // 'userProfileData'
type Example3 = ParsePath<'api/users/123/profile'>; // ['api', 'users', '123', 'profile']
type Example4 = JoinPath<['api', 'users', 'profile']>; // 'api/users/profile'
type Example5 = ParseSQL<'SELECT name FROM users'>; // { operator: 'SELECT'; expression: 'name FROM users' }
```

**2. Advanced Conditional Types and Type-Level Programming:**
```typescript
// Type-level arithmetic
type Length<T extends readonly unknown[]> = T['length'];

type Add<A extends number, B extends number> = 
  [...Array<A>, ...Array<B>]['length'] extends number ? 
  [...Array<A>, ...Array<B>]['length'] : never;

type Subtract<A extends number, B extends number> = 
  Array<A> extends [...infer U, ...Array<B>] ? U['length'] : never;

// Type-level comparison
type IsEqual<T, U> = T extends U ? U extends T ? true : false : false;
type IsGreater<A extends number, B extends number> = 
  A extends B ? false : 
  B extends 0 ? true :
  A extends 0 ? false :
  IsGreater<Subtract<A, 1>, Subtract<B, 1>>;

// Advanced object manipulation
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? T[P] extends Function 
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object 
    ? T[P] extends Function 
      ? T[P]
      : DeepPartial<T[P]>
    : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object 
    ? T[P] extends Function 
      ? T[P]
      : DeepRequired<T[P]>
    : T[P];
};

// Path-based property access
type PathKeys<T, K extends keyof T = keyof T> = 
  K extends string | number ?
    T[K] extends Record<string, any> ?
      T[K] extends ArrayLike<any> ?
        K | `${K}.${PathKeys<T[K], Exclude<keyof T[K], keyof any[]>>}`
        : K | `${K}.${PathKeys<T[K], keyof T[K]>}`
      : K
    : never;

type PathValue<T, P extends PathKeys<T>> = 
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? Rest extends PathKeys<T[K]>
        ? PathValue<T[K], Rest>
        : never
      : never
    : P extends keyof T
      ? T[P]
      : never;

// Advanced function type manipulation
type Curry<T> = T extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Rest]
    ? (arg: First) => Rest extends []
      ? R
      : Curry<(...args: Rest) => R>
    : () => R
  : never;

type Pipe<T extends readonly unknown[], R = unknown> = 
  T extends readonly [(...args: any[]) => infer U, ...infer Rest]
    ? Rest extends readonly []
      ? U
      : Rest extends readonly [(...args: [U]) => any, ...unknown[]]
        ? Pipe<Rest, R>
        : never
    : never;

// Usage examples
interface User {
  id: number;
  profile: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
  posts: Array<{ title: string; content: string }>;
}

type UserPaths = PathKeys<User>; // 'id' | 'profile' | 'profile.name' | 'profile.address' | etc.
type UserName = PathValue<User, 'profile.name'>; // string
type UserCity = PathValue<User, 'profile.address.city'>; // string

// Function currying example
type AddFunction = (a: number, b: number, c: number) => number;
type CurriedAdd = Curry<AddFunction>; // (arg: number) => (arg: number) => (arg: number) => number
```

**3. Advanced Decorator Patterns and Metadata:**
```typescript
// Advanced decorator factory with metadata
type DecoratorMetadata = {
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
  serialization?: {
    name?: string;
    transform?: (value: any) => any;
  };
  caching?: {
    ttl?: number;
    key?: string;
  };
};

const METADATA_KEY = Symbol('metadata');

function createPropertyDecorator<T extends DecoratorMetadata>(metadata: T) {
  return function <K extends string | symbol>(
    target: any,
    propertyKey: K
  ): void {
    const existingMetadata = Reflect.getMetadata(METADATA_KEY, target) || {};
    existingMetadata[propertyKey] = { ...existingMetadata[propertyKey], ...metadata };
    Reflect.defineMetadata(METADATA_KEY, existingMetadata, target);
  };
}

// Validation decorators
const Required = createPropertyDecorator({ validation: { required: true } });
const Min = (value: number) => createPropertyDecorator({ validation: { min: value } });
const Max = (value: number) => createPropertyDecorator({ validation: { max: value } });
const Pattern = (regex: RegExp) => createPropertyDecorator({ validation: { pattern: regex } });

// Serialization decorators
const SerializeName = (name: string) => createPropertyDecorator({ serialization: { name } });
const Transform = (fn: (value: any) => any) => createPropertyDecorator({ serialization: { transform: fn } });

// Caching decorators
const Cache = (ttl: number) => createPropertyDecorator({ caching: { ttl } });

// Advanced method decorator with type safety
function Memoize<T extends (...args: any[]) => any>(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
  const originalMethod = descriptor.value!;
  const cache = new Map<string, ReturnType<T>>();

  descriptor.value = ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = originalMethod.apply(target, args);
    cache.set(key, result);
    return result;
  }) as T;

  return descriptor;
}

// Performance monitoring decorator
function Monitor<T extends (...args: any[]) => any>(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
  const originalMethod = descriptor.value!;

  descriptor.value = (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const start = performance.now();
    try {
      const result = await originalMethod.apply(target, args);
      const end = performance.now();
      console.log(`${propertyName} executed in ${end - start}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`${propertyName} failed after ${end - start}ms:`, error);
      throw error;
    }
  }) as T;

  return descriptor;
}

// Usage example
class UserModel {
  @Required
  @SerializeName('user_id')
  id: number;

  @Required
  @Pattern(/^[a-zA-Z\s]+$/)
  name: string;

  @Min(0)
  @Max(120)
  age: number;

  @Transform((email: string) => email.toLowerCase())
  email: string;

  @Memoize
  @Monitor
  async fetchUserData(id: number): Promise<any> {
    // Expensive operation
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }

  @Cache(300) // 5 minutes
  getFullName(): string {
    return `${this.name} (${this.age})`;
  }
}
```

### Q15: How do you implement advanced type-safe patterns for modern applications?
**Difficulty: Expert**

**Answer:**
Modern TypeScript applications require sophisticated patterns for state management, API integration, and type-safe architectures.

**1. Advanced State Management with Type Safety:**
```typescript
// Type-safe Redux-like state management
type ActionType = string;

interface Action<T extends ActionType = ActionType, P = any> {
  type: T;
  payload: P;
}

type ActionCreator<T extends ActionType, P = void> = P extends void
  ? () => Action<T, undefined>
  : (payload: P) => Action<T, P>;

// Advanced action creator factory
function createAction<T extends ActionType>(type: T): ActionCreator<T, void>;
function createAction<T extends ActionType, P>(
  type: T,
  payloadCreator: (payload: P) => P
): ActionCreator<T, P>;
function createAction<T extends ActionType, P = any>(
  type: T,
  payloadCreator?: (payload: P) => P
): ActionCreator<T, P> {
  return ((payload?: P) => ({
    type,
    payload: payloadCreator ? payloadCreator(payload!) : payload,
  })) as ActionCreator<T, P>;
}

// Type-safe reducer with exhaustive checking
type Reducer<S, A extends Action> = (state: S, action: A) => S;

function createReducer<S, A extends Action>(
  initialState: S,
  handlers: {
    [K in A['type']]?: Reducer<S, Extract<A, { type: K }>>;
  }
): Reducer<S, A> {
  return (state = initialState, action) => {
    const handler = handlers[action.type as A['type']];
    return handler ? handler(state, action as any) : state;
  };
}

// Advanced selector patterns
type Selector<S, R> = (state: S) => R;
type ParametricSelector<S, P, R> = (state: S, props: P) => R;

function createSelector<S, R1, R>(
  selector1: Selector<S, R1>,
  combiner: (res1: R1) => R
): Selector<S, R>;
function createSelector<S, R1, R2, R>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  combiner: (res1: R1, res2: R2) => R
): Selector<S, R>;
function createSelector<S, R1, R2, R3, R>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => R
): Selector<S, R>;
function createSelector(...args: any[]): any {
  const selectors = args.slice(0, -1);
  const combiner = args[args.length - 1];
  
  return (state: any) => {
    const results = selectors.map(selector => selector(state));
    return combiner(...results);
  };
}

// Usage example
interface AppState {
  users: {
    byId: Record<string, User>;
    allIds: string[];
    loading: boolean;
  };
  posts: {
    byId: Record<string, Post>;
    allIds: string[];
  };
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Post {
  id: string;
  title: string;
  authorId: string;
  content: string;
}

// Action creators
const loadUsersStart = createAction('LOAD_USERS_START');
const loadUsersSuccess = createAction('LOAD_USERS_SUCCESS', (users: User[]) => users);
const loadUsersFailure = createAction('LOAD_USERS_FAILURE', (error: string) => error);

type UserActions = 
  | ReturnType<typeof loadUsersStart>
  | ReturnType<typeof loadUsersSuccess>
  | ReturnType<typeof loadUsersFailure>;

// Type-safe reducer
const usersReducer = createReducer<AppState['users'], UserActions>(
  { byId: {}, allIds: [], loading: false },
  {
    LOAD_USERS_START: (state) => ({ ...state, loading: true }),
    LOAD_USERS_SUCCESS: (state, action) => ({
      byId: action.payload.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
      allIds: action.payload.map(user => user.id),
      loading: false,
    }),
    LOAD_USERS_FAILURE: (state) => ({ ...state, loading: false }),
  }
);

// Advanced selectors
const selectUsers = (state: AppState) => state.users;
const selectPosts = (state: AppState) => state.posts;

const selectAllUsers = createSelector(
  selectUsers,
  (users) => users.allIds.map(id => users.byId[id])
);

const selectUserById = (id: string): Selector<AppState, User | undefined> =>
  createSelector(
    selectUsers,
    (users) => users.byId[id]
  );

const selectPostsWithAuthors = createSelector(
  selectPosts,
  selectUsers,
  (posts, users) => 
    posts.allIds.map(id => ({
      ...posts.byId[id],
      author: users.byId[posts.byId[id].authorId]
    }))
);
```

**2. Advanced API Integration with Type Safety:**
```typescript
// Type-safe API client with automatic type inference
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface APIEndpoint<TParams = void, TResponse = unknown, TBody = void> {
  method: HTTPMethod;
  path: string;
  params?: TParams;
  response: TResponse;
  body?: TBody;
}

// API endpoint definitions
const API_ENDPOINTS = {
  getUser: {
    method: 'GET' as const,
    path: '/users/:id',
    params: {} as { id: string },
    response: {} as User,
  },
  createUser: {
    method: 'POST' as const,
    path: '/users',
    body: {} as Omit<User, 'id'>,
    response: {} as User,
  },
  updateUser: {
    method: 'PUT' as const,
    path: '/users/:id',
    params: {} as { id: string },
    body: {} as Partial<User>,
    response: {} as User,
  },
  deleteUser: {
    method: 'DELETE' as const,
    path: '/users/:id',
    params: {} as { id: string },
    response: {} as { success: boolean },
  },
  getUsers: {
    method: 'GET' as const,
    path: '/users',
    params: {} as { page?: number; limit?: number; search?: string },
    response: {} as { users: User[]; total: number; page: number },
  },
} as const;

type APIEndpoints = typeof API_ENDPOINTS;

// Advanced API client with type inference
class TypeSafeAPIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  async request<K extends keyof APIEndpoints>(
    endpoint: K,
    ...args: APIEndpoints[K]['params'] extends void
      ? APIEndpoints[K]['body'] extends void
        ? []
        : [body: APIEndpoints[K]['body']]
      : APIEndpoints[K]['body'] extends void
      ? [params: APIEndpoints[K]['params']]
      : [params: APIEndpoints[K]['params'], body: APIEndpoints[K]['body']]
  ): Promise<APIEndpoints[K]['response']> {
    const config = API_ENDPOINTS[endpoint];
    const [params, body] = args as [any, any];

    let url = this.baseURL + config.path;
    
    // Replace path parameters
    if (params && config.params) {
      Object.entries(params).forEach(([key, value]) => {
        if (url.includes(`:${key}`)) {
          url = url.replace(`:${key}`, String(value));
          delete params[key];
        }
      });
    }

    // Add query parameters
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
      method: config.method,
      headers: {
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

// Usage with full type safety
const apiClient = new TypeSafeAPIClient('https://api.example.com');

// All these calls are fully type-safe
async function examples() {
  // GET /users/123
  const user = await apiClient.request('getUser', { id: '123' });
  console.log(user.name); // TypeScript knows this is a string

  // POST /users
  const newUser = await apiClient.request('createUser', {
    name: 'John Doe',
    email: 'john@example.com'
  });

  // PUT /users/123
  const updatedUser = await apiClient.request('updateUser', 
    { id: '123' }, 
    { name: 'Jane Doe' }
  );

  // GET /users?page=1&limit=10
  const usersPage = await apiClient.request('getUsers', {
    page: 1,
    limit: 10,
    search: 'john'
  });

  // DELETE /users/123
  const result = await apiClient.request('deleteUser', { id: '123' });
  console.log(result.success); // TypeScript knows this is a boolean
}
```

**3. Advanced Error Handling and Result Types:**
```typescript
// Result type for error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Utility functions for Result type
const Ok = <T>(data: T): Result<T, never> => ({ success: true, data });
const Err = <E>(error: E): Result<never, E> => ({ success: false, error });

// Advanced async result handling
class AsyncResult<T, E = Error> {
  constructor(private promise: Promise<Result<T, E>>) {}

  static async fromPromise<T>(
    promise: Promise<T>,
    errorHandler?: (error: unknown) => Error
  ): Promise<AsyncResult<T, Error>> {
    try {
      const data = await promise;
      return new AsyncResult(Promise.resolve(Ok(data)));
    } catch (error) {
      const handledError = errorHandler ? errorHandler(error) : error as Error;
      return new AsyncResult(Promise.resolve(Err(handledError)));
    }
  }

  async map<U>(fn: (data: T) => U): Promise<AsyncResult<U, E>> {
    const result = await this.promise;
    if (result.success) {
      return new AsyncResult(Promise.resolve(Ok(fn(result.data))));
    }
    return new AsyncResult(Promise.resolve(result));
  }

  async flatMap<U>(fn: (data: T) => AsyncResult<U, E>): Promise<AsyncResult<U, E>> {
    const result = await this.promise;
    if (result.success) {
      return fn(result.data);
    }
    return new AsyncResult(Promise.resolve(result));
  }

  async mapError<F>(fn: (error: E) => F): Promise<AsyncResult<T, F>> {
    const result = await this.promise;
    if (!result.success) {
      return new AsyncResult(Promise.resolve(Err(fn(result.error))));
    }
    return new AsyncResult(Promise.resolve(result));
  }

  async unwrap(): Promise<T> {
    const result = await this.promise;
    if (result.success) {
      return result.data;
    }
    throw result.error;
  }

  async unwrapOr(defaultValue: T): Promise<T> {
    const result = await this.promise;
    return result.success ? result.data : defaultValue;
  }

  async match<U>(
    onSuccess: (data: T) => U,
    onError: (error: E) => U
  ): Promise<U> {
    const result = await this.promise;
    return result.success ? onSuccess(result.data) : onError(result.error);
  }
}

// Usage example with type-safe error handling
class UserService {
  async getUser(id: string): Promise<AsyncResult<User, string>> {
    return AsyncResult.fromPromise(
      fetch(`/api/users/${id}`).then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.statusText}`);
        }
        return res.json();
      }),
      (error) => error instanceof Error ? error.message : 'Unknown error'
    );
  }

  async createUser(userData: Omit<User, 'id'>): Promise<AsyncResult<User, string>> {
    return AsyncResult.fromPromise(
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(res => res.json()),
      (error) => `Failed to create user: ${error}`
    );
  }
}

// Usage with comprehensive error handling
async function handleUserOperations() {
  const userService = new UserService();

  // Chain operations with error handling
  const result = await userService
    .getUser('123')
    .then(result => result.flatMap(user => 
      userService.createUser({ 
        name: `Copy of ${user.name}`, 
        email: `copy.${user.email}` 
      })
    ));

  await result.match(
    (newUser) => console.log('Created user:', newUser),
    (error) => console.error('Operation failed:', error)
  );
}
```

---

### Q16: How do you implement TypeScript 5.0+ decorators and metadata reflection?
**Difficulty: Expert**

**Answer:**
TypeScript 5.0+ introduces the new decorators proposal with enhanced metadata capabilities and better performance.

**1. Modern Decorator Syntax:**
```typescript
// Class decorator with metadata
function Entity(tableName: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      static tableName = tableName;
      static getMetadata() {
        return {
          tableName,
          fields: Reflect.getMetadata('fields', constructor) || []
        };
      }
    };
  };
}

// Property decorator
function Column(options: { type: string; nullable?: boolean }) {
  return function (target: any, propertyKey: string) {
    const fields = Reflect.getMetadata('fields', target.constructor) || [];
    fields.push({
      name: propertyKey,
      ...options
    });
    Reflect.defineMetadata('fields', fields, target.constructor);
  };
}

// Method decorator with parameter validation
function Validate(schema: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      // Validate arguments against schema
      const errors = validateSchema(args, schema);
      if (errors.length > 0) {
        throw new ValidationError(errors);
      }
      return originalMethod.apply(this, args);
    };
  };
}

// Usage
@Entity('users')
class User {
  @Column({ type: 'varchar', nullable: false })
  name!: string;
  
  @Column({ type: 'varchar', nullable: true })
  email?: string;
  
  @Validate({
    name: { required: true, minLength: 2 },
    email: { format: 'email' }
  })
  updateProfile(name: string, email?: string) {
    this.name = name;
    this.email = email;
  }
}
```

**2. Advanced Metadata System:**
```typescript
// Metadata registry
class MetadataRegistry {
  private static metadata = new WeakMap<any, Map<string, any>>();
  
  static define<T>(target: any, key: string, value: T): void {
    if (!this.metadata.has(target)) {
      this.metadata.set(target, new Map());
    }
    this.metadata.get(target)!.set(key, value);
  }
  
  static get<T>(target: any, key: string): T | undefined {
    return this.metadata.get(target)?.get(key);
  }
  
  static getAll(target: any): Map<string, any> | undefined {
    return this.metadata.get(target);
  }
}

// Type-safe decorator factory
function createDecorator<T extends Record<string, any>>() {
  return function (metadata: T) {
    return function <TTarget>(target: TTarget, context: ClassDecoratorContext<TTarget>) {
      MetadataRegistry.define(target, 'decorator-metadata', metadata);
      
      // Add metadata to class prototype
      (target as any).getDecoratorMetadata = () => metadata;
      
      return target;
    };
  };
}

// Usage with type safety
interface ApiMetadata {
  version: string;
  deprecated?: boolean;
  rateLimit?: number;
}

const ApiController = createDecorator<ApiMetadata>();

@ApiController({
  version: 'v1',
  rateLimit: 100
})
class UserController {
  // Implementation
}
```

---

### Q17: How do you implement advanced TypeScript patterns for reactive programming?
**Difficulty: Expert**

**Answer:**
Advanced TypeScript patterns for reactive programming involve sophisticated type manipulation for observables, signals, and async operations.

**1. Type-Safe Observable Operators:**
```typescript
// Advanced observable type definitions
type ObservableInput<T> = Observable<T> | Promise<T> | ArrayLike<T>;

type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

type MonoTypeOperatorFunction<T> = OperatorFunction<T, T>;

// Custom operator with type inference
function mapWithIndex<T, R>(
  project: (value: T, index: number) => R
): OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    return new Observable<R>(subscriber => {
      let index = 0;
      return source.subscribe({
        next: value => {
          try {
            const result = project(value, index++);
            subscriber.next(result);
          } catch (error) {
            subscriber.error(error);
          }
        },
        error: err => subscriber.error(err),
        complete: () => subscriber.complete()
      });
    });
  };
}

// Type-safe combineLatest with tuple inference
function combineLatestTyped<T extends readonly Observable<any>[]>(
  sources: [...T]
): Observable<{ [K in keyof T]: T[K] extends Observable<infer U> ? U : never }> {
  return combineLatest(sources) as any;
}

// Usage
const user$ = of({ id: 1, name: 'John' });
const posts$ = of([{ id: 1, title: 'Post 1' }]);
const settings$ = of({ theme: 'dark' });

const combined$ = combineLatestTyped([user$, posts$, settings$]);
// Type: Observable<[{ id: number; name: string }, { id: number; title: string }[], { theme: string }]>
```

**2. Advanced Signal Patterns:**
```typescript
// Signal with computed dependencies
class SignalStore<T> {
  private _value: T;
  private _subscribers = new Set<(value: T) => void>();
  private _computedCache = new WeakMap();
  
  constructor(initialValue: T) {
    this._value = initialValue;
  }
  
  get value(): T {
    return this._value;
  }
  
  set(value: T): void {
    if (this._value !== value) {
      this._value = value;
      this._notify();
    }
  }
  
  update(updater: (current: T) => T): void {
    this.set(updater(this._value));
  }
  
  subscribe(callback: (value: T) => void): () => void {
    this._subscribers.add(callback);
    return () => this._subscribers.delete(callback);
  }
  
  computed<R>(selector: (value: T) => R): SignalStore<R> {
    if (this._computedCache.has(selector)) {
      return this._computedCache.get(selector);
    }
    
    const computed = new SignalStore(selector(this._value));
    
    this.subscribe(value => {
      computed.set(selector(value));
    });
    
    this._computedCache.set(selector, computed);
    return computed;
  }
  
  private _notify(): void {
    this._subscribers.forEach(callback => callback(this._value));
  }
}

// Type-safe state management
interface AppState {
  user: { id: number; name: string } | null;
  posts: Array<{ id: number; title: string; authorId: number }>;
  loading: boolean;
}

class AppStore {
  private store = new SignalStore<AppState>({
    user: null,
    posts: [],
    loading: false
  });
  
  // Computed selectors with type safety
  user = this.store.computed(state => state.user);
  posts = this.store.computed(state => state.posts);
  loading = this.store.computed(state => state.loading);
  
  userPosts = this.store.computed(state => {
    if (!state.user) return [];
    return state.posts.filter(post => post.authorId === state.user!.id);
  });
  
  // Type-safe actions
  setUser(user: AppState['user']): void {
    this.store.update(state => ({ ...state, user }));
  }
  
  addPost(post: AppState['posts'][0]): void {
    this.store.update(state => ({
      ...state,
      posts: [...state.posts, post]
    }));
  }
  
  setLoading(loading: boolean): void {
    this.store.update(state => ({ ...state, loading }));
  }
}
```

---

### Q18: How do you implement TypeScript 5.0+ const assertions and satisfies operator for advanced type safety?

**Answer:**
TypeScript 5.0+ introduces powerful features like const assertions, the satisfies operator, and improved type inference for enhanced type safety and developer experience.

**Const Assertions and Satisfies Operator:**
```typescript
// Advanced const assertions with satisfies
const API_ENDPOINTS = {
  users: '/api/users',
  posts: '/api/posts',
  comments: '/api/comments',
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh'
  }
} as const satisfies Record<string, string | Record<string, string>>;

// Type-safe endpoint access
type ApiEndpoint = typeof API_ENDPOINTS;
type FlatEndpoints = {
  [K in keyof ApiEndpoint]: ApiEndpoint[K] extends string 
    ? ApiEndpoint[K]
    : ApiEndpoint[K] extends Record<string, infer V>
    ? V
    : never;
}[keyof ApiEndpoint];

// Advanced configuration with const assertions
interface DatabaseConfig {
  host: string;
  port: number;
  ssl: boolean;
  poolSize: number;
  timeout: number;
}

interface CacheConfig {
  provider: 'redis' | 'memory' | 'memcached';
  ttl: number;
  maxSize: number;
}

interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'json' | 'text';
  outputs: readonly ('console' | 'file' | 'syslog')[];
}

interface AppConfig {
  database: DatabaseConfig;
  cache: CacheConfig;
  logging: LoggingConfig;
  features: Record<string, boolean>;
}

// Type-safe configuration with satisfies
const CONFIG = {
  database: {
    host: 'localhost',
    port: 5432,
    ssl: false,
    poolSize: 10,
    timeout: 30000
  },
  cache: {
    provider: 'redis',
    ttl: 3600,
    maxSize: 1000
  },
  logging: {
    level: 'info',
    format: 'json',
    outputs: ['console', 'file']
  },
  features: {
    enableNewUI: true,
    enableAnalytics: false,
    enableBetaFeatures: false
  }
} as const satisfies AppConfig;

// Advanced type manipulation with const assertions
type ConfigKeys = keyof typeof CONFIG;
type DatabaseKeys = keyof typeof CONFIG.database;
type FeatureFlags = keyof typeof CONFIG.features;

// Type-safe feature flag checker
class FeatureManager {
  private config = CONFIG;
  
  isEnabled<K extends FeatureFlags>(feature: K): boolean {
    return this.config.features[feature];
  }
  
  getConfig<K extends ConfigKeys>(section: K): typeof CONFIG[K] {
    return this.config[section];
  }
  
  // Type-safe environment override
  withOverrides<T extends Partial<AppConfig>>(overrides: T): AppConfig & T {
    return { ...this.config, ...overrides } satisfies AppConfig & T;
  }
}

// Advanced tuple manipulation with const assertions
const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;
type HttpMethod = typeof HTTP_METHODS[number];

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const satisfies Record<string, number>;

type StatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];
type StatusName = keyof typeof STATUS_CODES;

// Type-safe API response builder
class ApiResponseBuilder {
  static success<T>(data: T, status: StatusCode = STATUS_CODES.OK) {
    return {
      success: true,
      data,
      status,
      timestamp: new Date().toISOString()
    } as const;
  }
  
  static error(message: string, status: StatusCode, details?: unknown) {
    return {
      success: false,
      error: {
        message,
        details
      },
      status,
      timestamp: new Date().toISOString()
    } as const;
  }
}

// Advanced pattern matching with satisfies
type EventType = 'user_created' | 'user_updated' | 'user_deleted' | 'post_created' | 'post_updated';

interface BaseEvent {
  id: string;
  timestamp: Date;
  userId: string;
}

interface UserEvent extends BaseEvent {
  type: 'user_created' | 'user_updated' | 'user_deleted';
  userData: {
    id: string;
    name: string;
    email: string;
  };
}

interface PostEvent extends BaseEvent {
  type: 'post_created' | 'post_updated';
  postData: {
    id: string;
    title: string;
    content: string;
  };
}

type DomainEvent = UserEvent | PostEvent;

// Type-safe event handlers with satisfies
const EVENT_HANDLERS = {
  user_created: (event: Extract<DomainEvent, { type: 'user_created' }>) => {
    console.log(`User created: ${event.userData.name}`);
    // Send welcome email
  },
  user_updated: (event: Extract<DomainEvent, { type: 'user_updated' }>) => {
    console.log(`User updated: ${event.userData.name}`);
    // Update search index
  },
  user_deleted: (event: Extract<DomainEvent, { type: 'user_deleted' }>) => {
    console.log(`User deleted: ${event.userData.id}`);
    // Cleanup user data
  },
  post_created: (event: Extract<DomainEvent, { type: 'post_created' }>) => {
    console.log(`Post created: ${event.postData.title}`);
    // Update feed
  },
  post_updated: (event: Extract<DomainEvent, { type: 'post_updated' }>) => {
    console.log(`Post updated: ${event.postData.title}`);
    // Invalidate cache
  }
} as const satisfies Record<EventType, (event: any) => void>;

// Type-safe event dispatcher
class EventDispatcher {
  dispatch<T extends DomainEvent>(event: T): void {
    const handler = EVENT_HANDLERS[event.type];
    if (handler) {
      handler(event as any); // Type assertion needed due to complex union types
    }
  }
  
  // Batch event processing with type safety
  dispatchBatch(events: readonly DomainEvent[]): void {
    events.forEach(event => this.dispatch(event));
  }
}
```

**Advanced Type Guards with Satisfies:**
```typescript
// Type-safe validation schemas
interface ValidationRule<T> {
  validate: (value: unknown) => value is T;
  message: string;
}

const VALIDATION_RULES = {
  string: {
    validate: (value: unknown): value is string => typeof value === 'string',
    message: 'Must be a string'
  },
  number: {
    validate: (value: unknown): value is number => typeof value === 'number' && !isNaN(value),
    message: 'Must be a valid number'
  },
  email: {
    validate: (value: unknown): value is string => {
      return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    message: 'Must be a valid email address'
  },
  positiveNumber: {
    validate: (value: unknown): value is number => {
      return typeof value === 'number' && !isNaN(value) && value > 0;
    },
    message: 'Must be a positive number'
  }
} as const satisfies Record<string, ValidationRule<any>>;

type ValidationRuleName = keyof typeof VALIDATION_RULES;

// Type-safe form validation
interface FormField<T> {
  name: string;
  rules: readonly ValidationRuleName[];
  transform?: (value: unknown) => T;
}

interface UserForm {
  name: string;
  email: string;
  age: number;
}

const USER_FORM_SCHEMA = {
  name: {
    name: 'name',
    rules: ['string'],
    transform: (value: unknown) => String(value).trim()
  },
  email: {
    name: 'email',
    rules: ['string', 'email'],
    transform: (value: unknown) => String(value).toLowerCase().trim()
  },
  age: {
    name: 'age',
    rules: ['number', 'positiveNumber'],
    transform: (value: unknown) => Number(value)
  }
} as const satisfies Record<keyof UserForm, FormField<any>>;

// Type-safe validator
class FormValidator {
  validate<T extends Record<string, any>>(
    data: Record<string, unknown>,
    schema: Record<keyof T, FormField<any>>
  ): { isValid: boolean; errors: Record<string, string[]>; data?: T } {
    const errors: Record<string, string[]> = {};
    const validatedData: Record<string, any> = {};
    
    for (const [fieldName, field] of Object.entries(schema)) {
      const value = data[fieldName];
      const fieldErrors: string[] = [];
      
      for (const ruleName of field.rules) {
        const rule = VALIDATION_RULES[ruleName];
        if (!rule.validate(value)) {
          fieldErrors.push(rule.message);
        }
      }
      
      if (fieldErrors.length === 0) {
        validatedData[fieldName] = field.transform ? field.transform(value) : value;
      } else {
        errors[fieldName] = fieldErrors;
      }
    }
    
    const isValid = Object.keys(errors).length === 0;
    return isValid 
      ? { isValid: true, errors: {}, data: validatedData as T }
      : { isValid: false, errors };
  }
}
```

---

### Q19: How do you implement advanced TypeScript 5.0+ decorators and metadata reflection for enterprise applications?

**Answer:**
TypeScript 5.0+ introduces stage 3 decorators with improved metadata reflection capabilities, enabling powerful enterprise patterns for dependency injection, validation, and aspect-oriented programming.

**Advanced Decorator Implementation:**
```typescript
// Advanced metadata reflection system
interface MetadataKey<T = any> {
  readonly symbol: symbol;
  readonly description: string;
}

function createMetadataKey<T>(description: string): MetadataKey<T> {
  return {
    symbol: Symbol(description),
    description
  };
}

// Metadata storage
class MetadataStorage {
  private static metadata = new WeakMap<object, Map<symbol, any>>();
  
  static set<T>(target: object, key: MetadataKey<T>, value: T): void {
    if (!this.metadata.has(target)) {
      this.metadata.set(target, new Map());
    }
    this.metadata.get(target)!.set(key.symbol, value);
  }
  
  static get<T>(target: object, key: MetadataKey<T>): T | undefined {
    return this.metadata.get(target)?.get(key.symbol);
  }
  
  static has(target: object, key: MetadataKey): boolean {
    return this.metadata.get(target)?.has(key.symbol) ?? false;
  }
  
  static getAll(target: object): Map<symbol, any> | undefined {
    return this.metadata.get(target);
  }
}

// Metadata keys for different concerns
const INJECTABLE_KEY = createMetadataKey<{ singleton?: boolean; scope?: string }>('injectable');
const DEPENDENCIES_KEY = createMetadataKey<Array<{ index: number; token: any }>>('dependencies');
const VALIDATION_KEY = createMetadataKey<Array<{ property: string; rules: ValidationRule[] }>>('validation');
const ROUTE_KEY = createMetadataKey<{ path: string; method: string; middleware?: Function[] }>('route');
const CACHE_KEY = createMetadataKey<{ ttl: number; key?: string }>('cache');
const AUDIT_KEY = createMetadataKey<{ action: string; sensitive?: boolean }>('audit');

// Advanced dependency injection decorators
function Injectable(options: { singleton?: boolean; scope?: string } = {}) {
  return function <T extends abstract new (...args: any[]) => any>(target: T, context: ClassDecoratorContext) {
    MetadataStorage.set(target, INJECTABLE_KEY, options);
    
    // Register with DI container
    DIContainer.register(target, options);
    
    return target;
  };
}

function Inject(token: any) {
  return function (target: any, context: ClassFieldDecoratorContext | ClassMethodDecoratorContext) {
    if (context.kind === 'field') {
      // Property injection
      return function (this: any, initialValue: any) {
        return DIContainer.resolve(token);
      };
    } else if (context.kind === 'method') {
      // Parameter injection for constructor
      const parameterIndex = (context as any).metadata?.parameterIndex ?? 0;
      const existing = MetadataStorage.get(target, DEPENDENCIES_KEY) || [];
      existing.push({ index: parameterIndex, token });
      MetadataStorage.set(target, DEPENDENCIES_KEY, existing);
    }
  };
}

// Advanced validation decorators
interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message?: string;
  validator?: (value: any) => boolean;
}

function Validate(rules: ValidationRule[]) {
  return function (target: any, context: ClassFieldDecoratorContext) {
    const existing = MetadataStorage.get(target.constructor, VALIDATION_KEY) || [];
    existing.push({ property: context.name as string, rules });
    MetadataStorage.set(target.constructor, VALIDATION_KEY, existing);
  };
}

function Required(message?: string) {
  return Validate([{ type: 'required', message: message || 'Field is required' }]);
}

function MinLength(length: number, message?: string) {
  return Validate([{ 
    type: 'minLength', 
    value: length, 
    message: message || `Minimum length is ${length}` 
  }]);
}

function Pattern(regex: RegExp, message?: string) {
  return Validate([{ 
    type: 'pattern', 
    value: regex, 
    message: message || 'Invalid format' 
  }]);
}

// Advanced HTTP route decorators
function Controller(basePath: string = '') {
  return function <T extends abstract new (...args: any[]) => any>(target: T, context: ClassDecoratorContext) {
    MetadataStorage.set(target, createMetadataKey('controller'), { basePath });
    return target;
  };
}

function Route(method: string, path: string, middleware: Function[] = []) {
  return function (target: any, context: ClassMethodDecoratorContext) {
    MetadataStorage.set(target, ROUTE_KEY, { method, path, middleware });
  };
}

function Get(path: string, middleware?: Function[]) {
  return Route('GET', path, middleware);
}

function Post(path: string, middleware?: Function[]) {
  return Route('POST', path, middleware);
}

// Advanced caching decorator
function Cache(ttl: number, keyGenerator?: (args: any[]) => string) {
  return function (target: any, context: ClassMethodDecoratorContext) {
    const originalMethod = target;
    
    return function (this: any, ...args: any[]) {
      const cacheKey = keyGenerator ? keyGenerator(args) : `${context.name as string}:${JSON.stringify(args)}`;
      
      // Check cache
      const cached = CacheManager.get(cacheKey);
      if (cached) {
        return cached;
      }
      
      // Execute method and cache result
      const result = originalMethod.apply(this, args);
      
      if (result instanceof Promise) {
        return result.then(value => {
          CacheManager.set(cacheKey, value, ttl);
          return value;
        });
      } else {
        CacheManager.set(cacheKey, result, ttl);
        return result;
      }
    };
  };
}

// Advanced audit logging decorator
function Audit(action: string, options: { sensitive?: boolean; includeArgs?: boolean } = {}) {
  return function (target: any, context: ClassMethodDecoratorContext) {
    const originalMethod = target;
    
    return function (this: any, ...args: any[]) {
      const startTime = Date.now();
      const auditData = {
        action,
        timestamp: new Date().toISOString(),
        user: this.getCurrentUser?.() || 'system',
        args: options.includeArgs && !options.sensitive ? args : undefined,
        className: this.constructor.name,
        methodName: context.name as string
      };
      
      try {
        const result = originalMethod.apply(this, args);
        
        if (result instanceof Promise) {
          return result
            .then(value => {
              AuditLogger.log({ ...auditData, success: true, duration: Date.now() - startTime });
              return value;
            })
            .catch(error => {
              AuditLogger.log({ 
                ...auditData, 
                success: false, 
                error: error.message, 
                duration: Date.now() - startTime 
              });
              throw error;
            });
        } else {
          AuditLogger.log({ ...auditData, success: true, duration: Date.now() - startTime });
          return result;
        }
      } catch (error) {
        AuditLogger.log({ 
          ...auditData, 
          success: false, 
          error: (error as Error).message, 
          duration: Date.now() - startTime 
        });
        throw error;
      }
    };
  };
}

// Enterprise service example
@Injectable({ singleton: true })
@Controller('/api/users')
class UserService {
  constructor(
    @Inject('UserRepository') private userRepo: UserRepository,
    @Inject('EmailService') private emailService: EmailService,
    @Inject('Logger') private logger: Logger
  ) {}
  
  @Get('/:id')
  @Cache(300, args => `user:${args[0]}`)
  @Audit('get_user')
  async getUser(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }
  
  @Post('/')
  @Audit('create_user', { includeArgs: true })
  async createUser(userData: CreateUserDto): Promise<User> {
    const user = await this.userRepo.create(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    return user;
  }
  
  @Post('/:id/reset-password')
  @Audit('reset_password', { sensitive: true })
  async resetPassword(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const resetToken = this.generateResetToken();
    await this.userRepo.updateResetToken(id, resetToken);
    await this.emailService.sendPasswordResetEmail(user.email, resetToken);
  }
  
  private generateResetToken(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

// Data Transfer Object with validation
class CreateUserDto {
  @Required('Name is required')
  @MinLength(2, 'Name must be at least 2 characters')
  name!: string;
  
  @Required('Email is required')
  @Pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
  email!: string;
  
  @Required('Password is required')
  @MinLength(8, 'Password must be at least 8 characters')
  @Pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number')
  password!: string;
}

// Advanced DI Container
class DIContainer {
  private static instances = new Map<any, any>();
  private static registrations = new Map<any, { factory: Function; options: any }>();
  
  static register<T>(token: any, options: { singleton?: boolean } = {}) {
    this.registrations.set(token, {
      factory: () => new token(),
      options
    });
  }
  
  static resolve<T>(token: any): T {
    const registration = this.registrations.get(token);
    if (!registration) {
      throw new Error(`No registration found for ${token.name || token}`);
    }
    
    if (registration.options.singleton) {
      if (!this.instances.has(token)) {
        this.instances.set(token, this.createInstance(token));
      }
      return this.instances.get(token);
    }
    
    return this.createInstance(token);
  }
  
  private static createInstance(token: any): any {
    const dependencies = MetadataStorage.get(token, DEPENDENCIES_KEY) || [];
    const args = dependencies
      .sort((a, b) => a.index - b.index)
      .map(dep => this.resolve(dep.token));
    
    return new token(...args);
  }
}

// Supporting services
class CacheManager {
  private static cache = new Map<string, { value: any; expiry: number }>();
  
  static get(key: string): any {
    const item = this.cache.get(key);
    if (item && item.expiry > Date.now()) {
      return item.value;
    }
    this.cache.delete(key);
    return null;
  }
  
  static set(key: string, value: any, ttlSeconds: number): void {
    this.cache.set(key, {
      value,
      expiry: Date.now() + (ttlSeconds * 1000)
    });
  }
}

class AuditLogger {
  static log(data: any): void {
    console.log('[AUDIT]', JSON.stringify(data, null, 2));
    // In real implementation, send to audit service
  }
}
```

This enhanced TypeScript guide now includes cutting-edge type manipulation techniques, advanced metaprogramming patterns, sophisticated state management solutions, type-safe API integration, robust error handling patterns, modern decorators with metadata reflection, TypeScript 5.0+ const assertions and satisfies operator, advanced dependency injection patterns, and reactive programming patterns essential for building enterprise-grade TypeScript applications.

### Q20: How do you use TypeScript with React for type-safe component development?
**Difficulty: Medium**

**Answer:**
TypeScript provides excellent integration with React, enabling type-safe component development, props validation, state management, and hooks usage. Here's a comprehensive guide to using TypeScript with React effectively:

**1. Setting Up a TypeScript React Project:**

```bash
# Using Create React App
npx create-react-app my-app --template typescript

# Using Vite
npm create vite@latest my-app -- --template react-ts
```

**2. Typing Component Props:**

```tsx
// Using interfaces (preferred for public APIs)
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Using type aliases (good for unions or more complex types)
type ButtonSize = 'small' | 'medium' | 'large';

type ExtendedButtonProps = ButtonProps & {
  size?: ButtonSize;
  isLoading?: boolean;
};

// Function component with typed props
const Button: React.FC<ExtendedButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  disabled = false,
  size = 'medium',
  isLoading = false,
  className = '',
  children
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : text}
      {children}
    </button>
  );
};

// Usage
<Button 
  text="Submit" 
  onClick={() => console.log('clicked')} 
  variant="primary" 
  size="large" 
/>
```

**3. Typing Component State:**

```tsx
interface UserState {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const UserProfile: React.FC = () => {
  const [state, setState] = React.useState<UserState>({
    user: null,
    isLoading: true,
    error: null
  });
  
  // Type-safe state updates
  const updateUser = (userData: UserState['user']) => {
    setState(prevState => ({
      ...prevState,
      user: userData,
      isLoading: false
    }));
  };
  
  // Rest of component
  return (
    <div>
      {state.isLoading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      {state.user && (
        <div>
          <h2>{state.user.name}</h2>
          <p>{state.user.email}</p>
        </div>
      )}
    </div>
  );
};
```

**4. Typing React Hooks:**

```tsx
// useState with type inference
const [count, setCount] = useState(0); // inferred as number
const [user, setUser] = useState<User | null>(null); // explicit type

// useReducer with typed actions
type CounterAction = 
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'RESET' };

interface CounterState {
  count: number;
  lastAction: string | null;
}

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload, lastAction: 'increment' };
    case 'DECREMENT':
      return { count: state.count - action.payload, lastAction: 'decrement' };
    case 'RESET':
      return { count: 0, lastAction: 'reset' };
    default:
      return state;
  }
};

const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, lastAction: null });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Last action: {state.lastAction || 'none'}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}>-1</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
};

// useRef with TypeScript
const inputRef = useRef<HTMLInputElement>(null);

// useEffect with proper typing
useEffect(() => {
  // Type-safe DOM access
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);
```

**5. Creating Custom Hooks:**

```tsx
// Custom hook with TypeScript
interface UseApiOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function useApi<T>(url: string, options: UseApiOptions<T> = {}): UseApiResult<T> {
  const [data, setData] = useState<T | null>(options.initialData || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const result = await response.json() as T;
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options.onError?.(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [url]);
  
  return { data, loading, error, refetch: fetchData };
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

const UserComponent: React.FC = () => {
  const { data, loading, error } = useApi<User[]>('/api/users');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
};
```

**6. Type-Safe Event Handling:**

```tsx
// Form events
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Form submission logic
};

// Input events with typed target
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  // Type-safe access to input properties
};

// Mouse events
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Access to mouse coordinates and button properties
  console.log(`Clicked at: ${event.clientX}, ${event.clientY}`);
};

// Keyboard events
const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    // Handle enter key
  }
};
```

**7. Working with Context API:**

```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create context with a default value
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

// Provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming the context
const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Usage
const ThemedButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{ 
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Toggle Theme
    </button>
  );
};
```

**8. Advanced Component Patterns:**

```tsx
// Generic components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={[{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]}
  renderItem={item => <span>{item.name}</span>}
  keyExtractor={item => item.id}
/>

// Render props with TypeScript
interface DataFetcherProps<T> {
  url: string;
  children: (state: {
    data: T | null;
    loading: boolean;
    error: Error | null;
  }) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // Fetch logic
  }, [url]);
  
  return <>{children({ data, loading, error })}</>;
}

// Usage
<DataFetcher<User[]> url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
      <ul>
        {data?.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    );
  }}
</DataFetcher>
```

**9. Type-Safe Redux with TypeScript:**

```tsx
// Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: {
    text: string;
  };
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: {
    id: number;
  };
}

type TodoActionTypes = AddTodoAction | ToggleTodoAction;

// Action creators
const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: { text }
});

const toggleTodo = (id: number): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: { id }
});

// State type
interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: []
};

// Reducer
const todoReducer = (state = initialState, action: TodoActionTypes): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload.text,
            completed: false
          }
        ]
      };
    case TOGGLE_TODO:
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
};
```

**10. Best Practices for TypeScript with React:**

- Use interfaces for props and state definitions
- Leverage TypeScript's type inference when possible
- Create reusable type definitions in separate files
- Use discriminated unions for complex state management
- Properly type event handlers and callbacks
- Use generics for reusable components
- Add proper return types for functions and components
- Use the `as const` assertion for literal values
- Avoid using `any` type; use `unknown` when type is truly unknown
- Use type guards for runtime type checking

By following these patterns and practices, you can build robust, type-safe React applications that leverage TypeScript's powerful type system to catch errors at compile time rather than runtime.