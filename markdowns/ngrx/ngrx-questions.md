# NgRx Interview Questions

## Table of Contents
1. [NgRx Fundamentals](#ngrx-fundamentals)
2. [Store and State Management](#store-and-state-management)
3. [Actions and Action Creators](#actions-and-action-creators)
4. [Reducers](#reducers)
5. [Effects](#effects)
6. [Selectors](#selectors)
7. [Entity State Management](#entity-state-management)
8. [NgRx Router Store](#ngrx-router-store)
9. [Testing NgRx](#testing-ngrx)
10. [NgRx Best Practices](#ngrx-best-practices)
11. [NgRx Component Store](#ngrx-component-store)
12. [NgRx Data](#ngrx-data)
13. [NgRx Performance Optimization](#ngrx-performance-optimization)
14. [NgRx Advanced Patterns](#ngrx-advanced-patterns)
15. [NgRx Error Handling](#ngrx-error-handling)
16. [NgRx Real-time Updates](#ngrx-real-time-updates)
17. [NgRx Micro-frontends](#ngrx-micro-frontends)
18. [NgRx Migration Strategies](#ngrx-migration-strategies)
19. [NgRx DevTools and Debugging](#ngrx-devtools-and-debugging)
20. [NgRx Enterprise Patterns](#ngrx-enterprise-patterns)

---

## NgRx Fundamentals

### Q1: What is NgRx and why would you use it?

**Answer:**
NgRx is a reactive state management library for Angular applications, inspired by Redux. It provides a predictable state container using RxJS observables.

**Key Benefits:**
- **Predictable State**: Single source of truth
- **Immutability**: State changes are predictable
- **Time Travel Debugging**: Redux DevTools support
- **Testability**: Pure functions make testing easier
- **Performance**: OnPush change detection strategy

**Core Concepts:**
```typescript
// State - Single source of truth
interface AppState {
  users: UserState;
  products: ProductState;
  ui: UiState;
}

// Actions - Events that describe state changes
const loadUsers = createAction('[User] Load Users');
const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

// Reducers - Pure functions that handle state transitions
const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  }))
);

// Effects - Handle side effects
@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  );
}

// Selectors - Query the state
const selectUsers = (state: AppState) => state.users.users;
const selectUsersLoading = (state: AppState) => state.users.loading;
```

**When to Use NgRx:**
- Complex state management needs
- Multiple components sharing state
- Need for time-travel debugging
- Complex async operations
- Large team collaboration

---

## Store and State Management

### Q2: How do you set up NgRx Store in an Angular application?

**Answer:**
Setting up NgRx Store involves installing packages, defining state interfaces, and configuring the store module.

**Installation:**
```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
npm install @ngrx/entity @ngrx/router-store # Optional packages
```

**State Interface:**
```typescript
// models/user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// state/user.state.ts
export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null
};

// state/app.state.ts
export interface AppState {
  users: UserState;
  products: ProductState;
  ui: UiState;
}
```

**Store Configuration:**
```typescript
// app.module.ts
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './state/user.reducer';
import { UserEffects } from './state/user.effects';

@NgModule({
  imports: [
    // Store configuration
    StoreModule.forRoot({
      users: userReducer,
      // Add other reducers here
    }),
    
    // Effects configuration
    EffectsModule.forRoot([UserEffects]),
    
    // DevTools (only in development)
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
})
export class AppModule {}
```

**Feature Module Setup:**
```typescript
// feature/feature.module.ts
@NgModule({
  imports: [
    StoreModule.forFeature('featureName', featureReducer),
    EffectsModule.forFeature([FeatureEffects])
  ]
})
export class FeatureModule {}
```

**Lazy Loading with NgRx:**
```typescript
// lazy-feature/lazy-feature.module.ts
@NgModule({
  imports: [
    StoreModule.forFeature('lazyFeature', lazyFeatureReducer),
    EffectsModule.forFeature([LazyFeatureEffects])
  ]
})
export class LazyFeatureModule {}

// The state will be added when the module is loaded
```

---

## Actions and Action Creators

### Q3: How do you create and use actions in NgRx?

**Answer:**
Actions are payloads of information that send data from your application to the store.

**Creating Actions:**
```typescript
// state/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// Load Users Actions
export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

// Create User Actions
export const createUser = createAction(
  '[User] Create User',
  props<{ user: Omit<User, 'id'> }>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: User }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: string }>()
);

// Update User Actions
export const updateUser = createAction(
  '[User] Update User',
  props<{ id: string; changes: Partial<User> }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

// Delete User Actions
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: string }>()
);

// Select User Action
export const selectUser = createAction(
  '[User] Select User',
  props<{ user: User | null }>()
);

// Clear Error Action
export const clearUserError = createAction('[User] Clear Error');
```

**Action Naming Conventions:**
```typescript
// Good action naming
export const loadUsers = createAction('[User List] Load Users');
export const loadUsersSuccess = createAction('[User API] Load Users Success');
export const loadUsersFailure = createAction('[User API] Load Users Failure');

// Component-specific actions
export const userFormSubmitted = createAction(
  '[User Form] User Form Submitted',
  props<{ user: User }>()
);

// Page-specific actions
export const userPageEntered = createAction('[User Page] User Page Entered');
export const userPageLeft = createAction('[User Page] User Page Left');
```

**Dispatching Actions:**
```typescript
// user.component.ts
import { Store } from '@ngrx/store';
import * as UserActions from '../state/user.actions';

@Component({
  selector: 'app-user-list',
  template: `
    <div>
      <button (click)="loadUsers()">Load Users</button>
      <button (click)="createUser()">Create User</button>
      
      <div *ngFor="let user of users$ | async">
        <span>{{ user.name }}</span>
        <button (click)="editUser(user)">Edit</button>
        <button (click)="deleteUser(user.id)">Delete</button>
      </div>
    </div>
  `
})
export class UserListComponent {
  users$ = this.store.select(selectUsers);

  constructor(private store: Store) {}

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  createUser(): void {
    const newUser = {
      name: 'New User',
      email: 'new@example.com',
      role: 'user' as const
    };
    this.store.dispatch(UserActions.createUser({ user: newUser }));
  }

  editUser(user: User): void {
    this.store.dispatch(UserActions.selectUser({ user }));
  }

  deleteUser(id: string): void {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }
}
```

**Action Unions:**
```typescript
// state/user.actions.ts
import { createAction, union } from '@ngrx/store';

// Export all actions
export const UserActions = {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
  updateUser,
  updateUserSuccess,
  deleteUser,
  deleteUserSuccess,
  selectUser,
  clearUserError
};

// Create action union type
const all = union(UserActions);
export type UserActionsUnion = typeof all;
```

---

## Reducers

### Q4: How do you create reducers in NgRx?

**Answer:**
Reducers are pure functions that take the current state and an action, and return a new state.

**Creating Reducers:**
```typescript
// state/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState, initialUserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Create User
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
    error: null
  })),
  
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Update User
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser,
    loading: false,
    error: null
  })),
  
  // Delete User
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
    selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
    loading: false,
    error: null
  })),
  
  // Select User
  on(UserActions.selectUser, (state, { user }) => ({
    ...state,
    selectedUser: user
  })),
  
  // Clear Error
  on(UserActions.clearUserError, (state) => ({
    ...state,
    error: null
  }))
);
```

**Complex State Updates:**
```typescript
// state/shopping-cart.reducer.ts
interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  discountCode: string | null;
  discountAmount: number;
}

export const cartReducer = createReducer(
  initialCartState,
  
  on(CartActions.addToCart, (state, { productId, price }) => {
    const existingItem = state.items.find(item => item.productId === productId);
    
    if (existingItem) {
      // Update existing item
      const updatedItems = state.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems, state.discountAmount)
      };
    } else {
      // Add new item
      const newItems = [...state.items, { productId, quantity: 1, price }];
      
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems, state.discountAmount)
      };
    }
  }),
  
  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter(item => item.productId !== productId);
    
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems, state.discountAmount)
    };
  }),
  
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const updatedItems = state.items.filter(item => item.productId !== productId);
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems, state.discountAmount)
      };
    }
    
    const updatedItems = state.items.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    );
    
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems, state.discountAmount)
    };
  }),
  
  on(CartActions.applyDiscount, (state, { discountCode, discountAmount }) => ({
    ...state,
    discountCode,
    discountAmount,
    total: calculateTotal(state.items, discountAmount)
  }))
);

// Helper function
function calculateTotal(items: CartItem[], discountAmount: number): number {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return Math.max(0, subtotal - discountAmount);
}
```

**Reducer Composition:**
```typescript
// state/index.ts
import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { productReducer } from './product.reducer';
import { cartReducer } from './cart.reducer';

export interface AppState {
  users: UserState;
  products: ProductState;
  cart: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: userReducer,
  products: productReducer,
  cart: cartReducer
};
```

---

## Effects

### Q5: How do you handle side effects with NgRx Effects?

**Answer:**
Effects handle side effects like HTTP requests, routing, and other asynchronous operations.

**Basic Effects:**
```typescript
// state/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
  
  // Load Users Effect
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );
  
  // Create User Effect
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      exhaustMap(action =>
        this.userService.createUser(action.user).pipe(
          map(user => UserActions.createUserSuccess({ user })),
          catchError(error => of(UserActions.createUserFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );
  
  // Update User Effect
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(action =>
        this.userService.updateUser(action.id, action.changes).pipe(
          map(user => UserActions.updateUserSuccess({ user })),
          catchError(error => of(UserActions.updateUserFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );
  
  // Delete User Effect
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.id).pipe(
          map(() => UserActions.deleteUserSuccess({ id: action.id })),
          catchError(error => of(UserActions.deleteUserFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );
}
```

**Advanced Effects Patterns:**
```typescript
// Advanced effects with multiple actions and complex logic
@Injectable()
export class AdvancedUserEffects {
  
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private store: Store
  ) {}
  
  // Effect that triggers multiple actions
  createUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUserSuccess),
      map(action => {
        this.notificationService.showSuccess('User created successfully!');
        return UserActions.loadUsers(); // Reload users list
      })
    )
  );
  
  // Non-dispatching effect (for side effects only)
  navigateAfterUserCreation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUserSuccess),
      tap(action => {
        this.router.navigate(['/users', action.user.id]);
      })
    ),
    { dispatch: false }
  );
  
  // Effect with state access
  loadUserIfNotExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.selectUser),
      withLatestFrom(this.store.select(selectAllUsers)),
      filter(([action, users]) => {
        const userExists = users.some(user => user.id === action.user?.id);
        return action.user && !userExists;
      }),
      map(([action]) => UserActions.loadUser({ id: action.user!.id }))
    )
  );
  
  // Effect with debouncing for search
  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUsers),
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.query === curr.query),
      switchMap(action =>
        this.userService.searchUsers(action.query).pipe(
          map(users => UserActions.searchUsersSuccess({ users })),
          catchError(error => of(UserActions.searchUsersFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );
  
  // Effect with retry logic
  loadUsersWithRetry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          retry(3),
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => {
            console.error('Failed to load users after 3 retries:', error);
            return of(UserActions.loadUsersFailure({ 
              error: 'Failed to load users. Please try again.' 
            }));
          })
        )
      )
    )
  );
  
  // Effect that handles optimistic updates
  optimisticUpdateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserOptimistic),
      mergeMap(action => {
        // First dispatch optimistic update
        this.store.dispatch(UserActions.updateUserOptimisticSuccess({ 
          id: action.id, 
          changes: action.changes 
        }));
        
        // Then make API call
        return this.userService.updateUser(action.id, action.changes).pipe(
          map(user => UserActions.updateUserConfirmed({ user })),
          catchError(error => {
            // Revert optimistic update on error
            return of(UserActions.updateUserOptimisticFailure({ 
              id: action.id, 
              error: error.message 
            }));
          })
        );
      })
    )
  );
}
```

**Effect Testing:**
```typescript
// user.effects.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'createUser']);
    
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: spy }
      ]
    });
    
    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });
  
  describe('loadUsers$', () => {
    it('should return loadUsersSuccess action on success', () => {
      const users = [{ id: '1', name: 'John', email: 'john@example.com', role: 'user' }];
      const action = UserActions.loadUsers();
      const outcome = UserActions.loadUsersSuccess({ users });
      
      actions$ = of(action);
      userService.getUsers.and.returnValue(of(users));
      
      effects.loadUsers$.subscribe(result => {
        expect(result).toEqual(outcome);
      });
    });
    
    it('should return loadUsersFailure action on error', () => {
      const error = new Error('API Error');
      const action = UserActions.loadUsers();
      const outcome = UserActions.loadUsersFailure({ error: error.message });
      
      actions$ = of(action);
      userService.getUsers.and.returnValue(throwError(error));
      
      effects.loadUsers$.subscribe(result => {
        expect(result).toEqual(outcome);
      });
    });
  });
});
```

---

## Selectors

### Q6: How do you create and use selectors in NgRx?

**Answer:**
Selectors are pure functions used to obtain slices of store state and compute derived data.

**Basic Selectors:**
```typescript
// state/user.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { AppState } from './app.state';

// Feature selector
export const selectUserState = createFeatureSelector<UserState>('users');

// Basic selectors
export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);

// Parameterized selector
export const selectUserById = createSelector(
  selectAllUsers,
  (users: User[], props: { id: string }) => 
    users.find(user => user.id === props.id)
);

// Computed selectors
export const selectUserCount = createSelector(
  selectAllUsers,
  (users: User[]) => users.length
);

export const selectAdminUsers = createSelector(
  selectAllUsers,
  (users: User[]) => users.filter(user => user.role === 'admin')
);

export const selectRegularUsers = createSelector(
  selectAllUsers,
  (users: User[]) => users.filter(user => user.role === 'user')
);

// Complex computed selector
export const selectUserStatistics = createSelector(
  selectAllUsers,
  (users: User[]) => {
    const total = users.length;
    const admins = users.filter(user => user.role === 'admin').length;
    const regularUsers = users.filter(user => user.role === 'user').length;
    
    return {
      total,
      admins,
      regularUsers,
      adminPercentage: total > 0 ? (admins / total) * 100 : 0
    };
  }
);
```

**Advanced Selectors:**
```typescript
// Combining multiple feature selectors
export const selectProductState = createFeatureSelector<ProductState>('products');
export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

// Selector combining multiple states
export const selectCartWithProductDetails = createSelector(
  selectCartItems,
  selectAllProducts,
  (cartItems, products) => {
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        productName: product?.name || 'Unknown Product',
        productImage: product?.image || '',
        totalPrice: item.quantity * item.price
      };
    });
  }
);

// Memoized selector with complex computation
export const selectUserSearchResults = createSelector(
  selectAllUsers,
  (users: User[], props: { query: string; filters: UserFilters }) => {
    const { query, filters } = props;
    
    return users
      .filter(user => {
        // Text search
        const matchesQuery = !query || 
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase());
        
        // Role filter
        const matchesRole = !filters.role || user.role === filters.role;
        
        // Date filter
        const matchesDateRange = !filters.dateRange || 
          (new Date(user.createdAt) >= filters.dateRange.start &&
           new Date(user.createdAt) <= filters.dateRange.end);
        
        return matchesQuery && matchesRole && matchesDateRange;
      })
      .sort((a, b) => {
        // Sort by relevance
        if (query) {
          const aScore = calculateRelevanceScore(a, query);
          const bScore = calculateRelevanceScore(b, query);
          return bScore - aScore;
        }
        return a.name.localeCompare(b.name);
      });
  }
);

function calculateRelevanceScore(user: User, query: string): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;
  
  if (user.name.toLowerCase().startsWith(lowerQuery)) score += 10;
  if (user.name.toLowerCase().includes(lowerQuery)) score += 5;
  if (user.email.toLowerCase().includes(lowerQuery)) score += 3;
  
  return score;
}
```

**Using Selectors in Components:**
```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserSelectors from '../state/user.selectors';
import * as UserActions from '../state/user.actions';

@Component({
  selector: 'app-user-list',
  template: `
    <div>
      <h2>Users ({{ userCount$ | async }})</h2>
      
      <div *ngIf="loading$ | async">Loading...</div>
      <div *ngIf="error$ | async as error" class="error">{{ error }}</div>
      
      <div class="user-stats">
        <ng-container *ngIf="userStats$ | async as stats">
          <p>Total: {{ stats.total }}</p>
          <p>Admins: {{ stats.admins }} ({{ stats.adminPercentage | number:'1.1-1' }}%)</p>
          <p>Regular Users: {{ stats.regularUsers }}</p>
        </ng-container>
      </div>
      
      <div class="user-list">
        <div *ngFor="let user of users$ | async" 
             class="user-card"
             [class.selected]="(selectedUser$ | async)?.id === user.id"
             (click)="selectUser(user)">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
          <span class="role">{{ user.role }}</span>
        </div>
      </div>
      
      <div class="admin-section">
        <h3>Admin Users</h3>
        <div *ngFor="let admin of adminUsers$ | async">
          {{ admin.name }} - {{ admin.email }}
        </div>
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users$ = this.store.select(UserSelectors.selectAllUsers);
  loading$ = this.store.select(UserSelectors.selectUsersLoading);
  error$ = this.store.select(UserSelectors.selectUsersError);
  selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
  userCount$ = this.store.select(UserSelectors.selectUserCount);
  userStats$ = this.store.select(UserSelectors.selectUserStatistics);
  adminUsers$ = this.store.select(UserSelectors.selectAdminUsers);
  
  constructor(private store: Store) {}
  
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }
  
  selectUser(user: User): void {
    this.store.dispatch(UserActions.selectUser({ user }));
  }
}
```

**Selector Performance Optimization:**
```typescript
// Using memoization for expensive computations
export const selectExpensiveComputation = createSelector(
  selectAllUsers,
  selectAllProducts,
  (users, products) => {
    // This will only recompute when users or products change
    return users.map(user => {
      const userProducts = products.filter(p => p.ownerId === user.id);
      return {
        ...user,
        productCount: userProducts.length,
        totalProductValue: userProducts.reduce((sum, p) => sum + p.price, 0)
      };
    });
  }
);

// Selector with custom equality function
export const selectUsersSortedByName = createSelector(
  selectAllUsers,
  (users) => [...users].sort((a, b) => a.name.localeCompare(b.name)),
  {
    // Custom memoization - only recompute if array length or any name changes
    memoizeOptions: {
      resultEqualityCheck: (a, b) => 
        a.length === b.length && 
        a.every((user, index) => user.name === b[index].name)
    }
  }
);
```

This comprehensive NgRx guide covers all essential concepts from basic setup to advanced patterns, providing practical examples for state management in Angular applications.

---

## Advanced NgRx Patterns

### Q7: How do you implement advanced NgRx patterns for complex state management?

**Answer:**
Advanced NgRx patterns help manage complex state scenarios, including nested entities, optimistic updates, and real-time synchronization.

**Feature State Composition:**
```typescript
// Feature State Composition with Multiple Entities
import { createFeatureSelector, createSelector, combineReducers } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

// User Entity State
interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  departmentId: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: NotificationSettings;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface UserState extends EntityState<User> {
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
  filters: UserFilters;
  pagination: PaginationState;
}

interface UserFilters {
  search: string;
  role: string | null;
  department: string | null;
  status: 'active' | 'inactive' | 'all';
}

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// Role Entity State
interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
}

interface Permission {
  id: string;
  resource: string;
  actions: string[];
}

interface RoleState extends EntityState<Role> {
  loading: boolean;
  error: string | null;
}

// Department Entity State
interface Department {
  id: string;
  name: string;
  managerId: string;
  parentId: string | null;
  children: string[];
}

interface DepartmentState extends EntityState<Department> {
  loading: boolean;
  error: string | null;
  hierarchy: DepartmentHierarchy[];
}

interface DepartmentHierarchy {
  id: string;
  name: string;
  level: number;
  children: DepartmentHierarchy[];
}

// Combined Feature State
interface UserManagementState {
  users: UserState;
  roles: RoleState;
  departments: DepartmentState;
  ui: UserManagementUIState;
}

interface UserManagementUIState {
  activeTab: 'users' | 'roles' | 'departments';
  sidebarOpen: boolean;
  bulkActions: {
    selectedIds: string[];
    action: string | null;
    inProgress: boolean;
  };
  modals: {
    userForm: { open: boolean; mode: 'create' | 'edit'; userId?: string };
    roleForm: { open: boolean; mode: 'create' | 'edit'; roleId?: string };
    confirmDelete: { open: boolean; type: 'user' | 'role' | 'department'; id?: string };
  };
}

// Entity Adapters
const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: (a: User, b: User) => a.name.localeCompare(b.name)
});

const roleAdapter: EntityAdapter<Role> = createEntityAdapter<Role>({
  selectId: (role: Role) => role.id,
  sortComparer: (a: Role, b: Role) => a.name.localeCompare(b.name)
});

const departmentAdapter: EntityAdapter<Department> = createEntityAdapter<Department>({
  selectId: (dept: Department) => dept.id,
  sortComparer: (a: Department, b: Department) => a.name.localeCompare(b.name)
});

// Initial States
const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    role: null,
    department: null,
    status: 'all'
  },
  pagination: {
    page: 1,
    pageSize: 20,
    total: 0
  }
});

const initialRoleState: RoleState = roleAdapter.getInitialState({
  loading: false,
  error: null
});

const initialDepartmentState: DepartmentState = departmentAdapter.getInitialState({
  loading: false,
  error: null,
  hierarchy: []
});

const initialUIState: UserManagementUIState = {
  activeTab: 'users',
  sidebarOpen: true,
  bulkActions: {
    selectedIds: [],
    action: null,
    inProgress: false
  },
  modals: {
    userForm: { open: false, mode: 'create' },
    roleForm: { open: false, mode: 'create' },
    confirmDelete: { open: false, type: 'user' }
  }
};

// Feature Reducer
const userManagementReducer = combineReducers({
  users: userReducer,
  roles: roleReducer,
  departments: departmentReducer,
  ui: uiReducer
});

// Feature Selectors
const selectUserManagementState = createFeatureSelector<UserManagementState>('userManagement');

// Entity Selectors
const selectUserState = createSelector(selectUserManagementState, state => state.users);
const selectRoleState = createSelector(selectUserManagementState, state => state.roles);
const selectDepartmentState = createSelector(selectUserManagementState, state => state.departments);
const selectUIState = createSelector(selectUserManagementState, state => state.ui);

// User Selectors
const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = userAdapter.getSelectors(selectUserState);

const selectSelectedUser = createSelector(
  selectUserEntities,
  selectUserState,
  (entities, state) => state.selectedUserId ? entities[state.selectedUserId] : null
);

const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectUserState,
  (users, state) => {
    let filtered = users;
    
    // Apply search filter
    if (state.filters.search) {
      const search = state.filters.search.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }
    
    // Apply role filter
    if (state.filters.role) {
      filtered = filtered.filter(user => user.roleId === state.filters.role);
    }
    
    // Apply department filter
    if (state.filters.department) {
      filtered = filtered.filter(user => user.departmentId === state.filters.department);
    }
    
    // Apply status filter
    if (state.filters.status !== 'all') {
      // Assuming we have a status field or derive it from other properties
      // filtered = filtered.filter(user => user.status === state.filters.status);
    }
    
    return filtered;
  }
);

const selectPaginatedUsers = createSelector(
  selectFilteredUsers,
  selectUserState,
  (users, state) => {
    const start = (state.pagination.page - 1) * state.pagination.pageSize;
    const end = start + state.pagination.pageSize;
    return users.slice(start, end);
  }
);

// Complex Selectors with Joins
const selectUsersWithRolesAndDepartments = createSelector(
  selectAllUsers,
  selectRoleEntities,
  selectDepartmentEntities,
  (users, roles, departments) => {
    return users.map(user => ({
      ...user,
      role: roles[user.roleId],
      department: departments[user.departmentId]
    }));
  }
);

const selectDepartmentHierarchy = createSelector(
  selectAllDepartments,
  (departments) => {
    const buildHierarchy = (parentId: string | null, level: number = 0): DepartmentHierarchy[] => {
      return departments
        .filter(dept => dept.parentId === parentId)
        .map(dept => ({
          id: dept.id,
          name: dept.name,
          level,
          children: buildHierarchy(dept.id, level + 1)
        }));
    };
    
    return buildHierarchy(null);
  }
);

// Performance Optimized Selectors
const selectUserStatistics = createSelector(
  selectAllUsers,
  selectAllRoles,
  selectAllDepartments,
  (users, roles, departments) => {
    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => /* active condition */ true).length,
      usersByRole: new Map<string, number>(),
      usersByDepartment: new Map<string, number>(),
      averageUsersPerDepartment: 0
    };
    
    // Count users by role
    users.forEach(user => {
      const roleCount = stats.usersByRole.get(user.roleId) || 0;
      stats.usersByRole.set(user.roleId, roleCount + 1);
    });
    
    // Count users by department
    users.forEach(user => {
      const deptCount = stats.usersByDepartment.get(user.departmentId) || 0;
      stats.usersByDepartment.set(user.departmentId, deptCount + 1);
    });
    
    // Calculate average
    stats.averageUsersPerDepartment = departments.length > 0 
      ? users.length / departments.length 
      : 0;
    
    return stats;
  }
);
```

**Optimistic Updates Pattern:**
```typescript
// Optimistic Updates with Rollback
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

// Actions for Optimistic Updates
const updateUserOptimistic = createAction(
  '[User] Update User Optimistic',
  props<{ update: Update<User>; originalUser: User }>()
);

const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string; originalUser: User }>()
);

const deleteUserOptimistic = createAction(
  '[User] Delete User Optimistic',
  props<{ id: string; user: User }>()
);

const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: string }>()
);

const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string; user: User }>()
);

// Optimistic Update Reducer
const userReducer = createReducer(
  initialUserState,
  
  // Optimistic update
  on(updateUserOptimistic, (state, { update }) => {
    return userAdapter.updateOne(update, {
      ...state,
      loading: true
    });
  }),
  
  // Update success - just clear loading
  on(updateUserSuccess, (state, { user }) => {
    return userAdapter.upsertOne(user, {
      ...state,
      loading: false,
      error: null
    });
  }),
  
  // Update failure - rollback to original
  on(updateUserFailure, (state, { error, originalUser }) => {
    return userAdapter.upsertOne(originalUser, {
      ...state,
      loading: false,
      error
    });
  }),
  
  // Optimistic delete
  on(deleteUserOptimistic, (state, { id }) => {
    return userAdapter.removeOne(id, {
      ...state,
      loading: true
    });
  }),
  
  // Delete success - just clear loading
  on(deleteUserSuccess, (state) => ({
    ...state,
    loading: false,
    error: null
  })),
  
  // Delete failure - restore user
  on(deleteUserFailure, (state, { error, user }) => {
    return userAdapter.addOne(user, {
      ...state,
      loading: false,
      error
    });
  })
);

// Optimistic Update Effects
@Injectable()
export class OptimisticUserEffects {
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserOptimistic),
      switchMap(({ update, originalUser }) =>
        this.userService.updateUser(update.id as string, update.changes).pipe(
          map(user => updateUserSuccess({ user })),
          catchError(error => {
            console.error('Update failed, rolling back:', error);
            return of(updateUserFailure({ 
              error: error.message, 
              originalUser 
            }));
          })
        )
      )
    )
  );
  
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserOptimistic),
      switchMap(({ id, user }) =>
        this.userService.deleteUser(id).pipe(
          map(() => deleteUserSuccess({ id })),
          catchError(error => {
            console.error('Delete failed, restoring user:', error);
            return of(deleteUserFailure({ 
              error: error.message, 
              user 
            }));
          })
        )
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}

// Optimistic Update Service
@Injectable({
  providedIn: 'root'
})
export class OptimisticUpdateService {
  constructor(private store: Store) {}
  
  updateUserOptimistically(userId: string, changes: Partial<User>): void {
    // Get current user for rollback
    this.store.select(selectUserEntities).pipe(
      take(1),
      map(entities => entities[userId])
    ).subscribe(originalUser => {
      if (originalUser) {
        const update: Update<User> = {
          id: userId,
          changes
        };
        
        this.store.dispatch(updateUserOptimistic({ 
          update, 
          originalUser 
        }));
      }
    });
  }
  
  deleteUserOptimistically(userId: string): void {
    this.store.select(selectUserEntities).pipe(
      take(1),
      map(entities => entities[userId])
    ).subscribe(user => {
      if (user) {
        this.store.dispatch(deleteUserOptimistic({ 
          id: userId, 
          user 
        }));
      }
    });
  }
}
```

### Q8: How do you implement real-time state synchronization with NgRx?

**Answer:**
Real-time state synchronization requires WebSocket integration, conflict resolution, and optimistic updates with server reconciliation.

**Real-time State Synchronization:**
```typescript
// Real-time State Actions
const connectWebSocket = createAction(
  '[WebSocket] Connect',
  props<{ url: string }>()
);

const webSocketConnected = createAction('[WebSocket] Connected');
const webSocketDisconnected = createAction('[WebSocket] Disconnected');
const webSocketError = createAction(
  '[WebSocket] Error',
  props<{ error: string }>()
);

const receiveRealTimeUpdate = createAction(
  '[WebSocket] Receive Update',
  props<{ 
    type: string;
    payload: any;
    timestamp: number;
    source: string;
  }>()
);

const sendRealTimeUpdate = createAction(
  '[WebSocket] Send Update',
  props<{ 
    type: string;
    payload: any;
  }>()
);

// Real-time State Interface
interface RealTimeState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  lastUpdate: number;
  pendingUpdates: PendingUpdate[];
  conflictResolution: ConflictResolutionState;
}

interface PendingUpdate {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

interface ConflictResolutionState {
  conflicts: Conflict[];
  resolutionStrategy: 'client-wins' | 'server-wins' | 'merge' | 'manual';
}

interface Conflict {
  id: string;
  entityType: string;
  entityId: string;
  clientVersion: any;
  serverVersion: any;
  timestamp: number;
}

// Real-time Effects
@Injectable()
export class RealTimeEffects {
  private webSocket$: WebSocketSubject<any> | null = null;
  
  connectWebSocket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectWebSocket),
      switchMap(({ url }) => {
        this.webSocket$ = webSocket({
          url,
          openObserver: {
            next: () => this.store.dispatch(webSocketConnected())
          },
          closeObserver: {
            next: () => this.store.dispatch(webSocketDisconnected())
          }
        });
        
        return this.webSocket$.pipe(
          map(message => receiveRealTimeUpdate({
            type: message.type,
            payload: message.payload,
            timestamp: message.timestamp,
            source: message.source
          })),
          catchError(error => {
            console.error('WebSocket error:', error);
            return of(webSocketError({ error: error.message }));
          })
        );
      })
    )
  );
  
  sendRealTimeUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendRealTimeUpdate),
      tap(({ type, payload }) => {
        if (this.webSocket$) {
          this.webSocket$.next({
            type,
            payload,
            timestamp: Date.now(),
            source: this.getClientId()
          });
        }
      })
    ),
    { dispatch: false }
  );
  
  handleRealTimeUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(receiveRealTimeUpdate),
      switchMap(({ type, payload, timestamp, source }) => {
        // Don't process our own updates
        if (source === this.getClientId()) {
          return EMPTY;
        }
        
        return this.processRealTimeUpdate(type, payload, timestamp);
      })
    )
  );
  
  // Auto-reconnect on disconnect
  reconnectWebSocket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(webSocketDisconnected),
      delay(3000), // Wait 3 seconds before reconnecting
      switchMap(() => {
        // Get the last used URL from state or config
        return this.store.select(selectWebSocketUrl).pipe(
          take(1),
          filter(url => !!url),
          map(url => connectWebSocket({ url }))
        );
      })
    )
  );
  
  constructor(
    private actions$: Actions,
    private store: Store,
    private conflictResolver: ConflictResolutionService
  ) {}
  
  private processRealTimeUpdate(
    type: string, 
    payload: any, 
    timestamp: number
  ): Observable<Action> {
    switch (type) {
      case 'user-updated':
        return this.handleUserUpdate(payload, timestamp);
      case 'user-deleted':
        return this.handleUserDelete(payload, timestamp);
      case 'user-created':
        return this.handleUserCreate(payload, timestamp);
      default:
        return EMPTY;
    }
  }
  
  private handleUserUpdate(payload: any, timestamp: number): Observable<Action> {
    return this.store.select(selectUserEntities).pipe(
      take(1),
      switchMap(entities => {
        const existingUser = entities[payload.id];
        
        if (!existingUser) {
          // User doesn't exist locally, just add it
          return of(loadUsersSuccess({ users: [payload] }));
        }
        
        // Check for conflicts
        if (this.hasConflict(existingUser, payload, timestamp)) {
          return this.conflictResolver.resolveConflict(
            'user',
            existingUser,
            payload,
            timestamp
          ).pipe(
            map(resolvedUser => loadUsersSuccess({ users: [resolvedUser] }))
          );
        }
        
        // No conflict, apply update
        return of(loadUsersSuccess({ users: [payload] }));
      })
    );
  }
  
  private handleUserDelete(payload: any, timestamp: number): Observable<Action> {
    return of(deleteUserSuccess({ id: payload.id }));
  }
  
  private handleUserCreate(payload: any, timestamp: number): Observable<Action> {
    return of(loadUsersSuccess({ users: [payload] }));
  }
  
  private hasConflict(local: any, remote: any, timestamp: number): boolean {
    // Simple timestamp-based conflict detection
    return local.lastModified && local.lastModified > timestamp;
  }
  
  private getClientId(): string {
    return sessionStorage.getItem('clientId') || 'unknown';
  }
}

// Conflict Resolution Service
@Injectable({
  providedIn: 'root'
})
export class ConflictResolutionService {
  constructor(private store: Store) {}
  
  resolveConflict(
    entityType: string,
    localVersion: any,
    serverVersion: any,
    timestamp: number
  ): Observable<any> {
    return this.store.select(selectConflictResolutionStrategy).pipe(
      take(1),
      switchMap(strategy => {
        switch (strategy) {
          case 'client-wins':
            return of(localVersion);
          
          case 'server-wins':
            return of(serverVersion);
          
          case 'merge':
            return of(this.mergeVersions(localVersion, serverVersion));
          
          case 'manual':
            // Store conflict for manual resolution
            this.store.dispatch(addConflict({
              conflict: {
                id: `${entityType}-${localVersion.id}-${timestamp}`,
                entityType,
                entityId: localVersion.id,
                clientVersion: localVersion,
                serverVersion,
                timestamp
              }
            }));
            // Return local version for now
            return of(localVersion);
          
          default:
            return of(serverVersion);
        }
      })
    );
  }
  
  private mergeVersions(local: any, server: any): any {
    // Simple merge strategy - can be customized per entity type
    const merged = { ...server };
    
    // Keep local changes for specific fields
    const localOnlyFields = ['preferences', 'localSettings'];
    localOnlyFields.forEach(field => {
      if (local[field] !== undefined) {
        merged[field] = local[field];
      }
    });
    
    // Merge arrays
    Object.keys(local).forEach(key => {
      if (Array.isArray(local[key]) && Array.isArray(server[key])) {
        merged[key] = this.mergeArrays(local[key], server[key]);
      }
    });
    
    return merged;
  }
  
  private mergeArrays(localArray: any[], serverArray: any[]): any[] {
    const merged = [...serverArray];
    
    localArray.forEach(localItem => {
      const existingIndex = merged.findIndex(item => 
        item.id === localItem.id
      );
      
      if (existingIndex === -1) {
        // Local item doesn't exist on server, add it
        merged.push(localItem);
      } else {
        // Merge the items
        merged[existingIndex] = { ...merged[existingIndex], ...localItem };
      }
    });
    
    return merged;
  }
}

// Real-time Synchronization Service
@Injectable({
  providedIn: 'root'
})
export class RealTimeSyncService {
  private isConnected$ = this.store.select(selectWebSocketConnected);
  
  constructor(private store: Store) {
    this.setupAutoSync();
  }
  
  connect(url: string): void {
    this.store.dispatch(connectWebSocket({ url }));
  }
  
  disconnect(): void {
    this.store.dispatch(webSocketDisconnected());
  }
  
  syncUserUpdate(user: User): void {
    this.isConnected$.pipe(
      take(1),
      filter(connected => connected)
    ).subscribe(() => {
      this.store.dispatch(sendRealTimeUpdate({
        type: 'user-updated',
        payload: user
      }));
    });
  }
  
  syncUserDelete(userId: string): void {
    this.isConnected$.pipe(
      take(1),
      filter(connected => connected)
    ).subscribe(() => {
      this.store.dispatch(sendRealTimeUpdate({
        type: 'user-deleted',
        payload: { id: userId }
      }));
    });
  }
  
  private setupAutoSync(): void {
    // Auto-sync on connection
    this.store.select(selectWebSocketConnected).pipe(
      filter(connected => connected),
      switchMap(() => this.store.select(selectPendingUpdates)),
      take(1)
    ).subscribe(pendingUpdates => {
      // Send any pending updates
      pendingUpdates.forEach(update => {
        this.store.dispatch(sendRealTimeUpdate({
          type: update.type,
          payload: update.payload
        }));
      });
    });
  }
}
```

### Q9: How do you implement advanced NgRx patterns for enterprise applications?

**Answer:**
Enterprise NgRx applications require sophisticated patterns for scalability, maintainability, and performance optimization.

**Advanced State Architecture Patterns:**
```typescript
// Feature State Composition with Lazy Loading
interface FeatureState {
  core: CoreState;
  features: {
    [key: string]: any;
  };
}

// Dynamic Feature Registration
@Injectable()
export class FeatureStateManager {
  private registeredFeatures = new Set<string>();
  
  constructor(private store: Store) {}
  
  registerFeature<T>(featureName: string, reducer: ActionReducer<T>, initialState: T): void {
    if (this.registeredFeatures.has(featureName)) {
      return;
    }
    
    // Dynamically add feature reducer
    this.store.addReducer(featureName, reducer);
    
    // Initialize feature state
    this.store.dispatch({
      type: `[${featureName}] Initialize`,
      payload: initialState
    });
    
    this.registeredFeatures.add(featureName);
  }
  
  unregisterFeature(featureName: string): void {
    if (!this.registeredFeatures.has(featureName)) {
      return;
    }
    
    this.store.removeReducer(featureName);
    this.registeredFeatures.delete(featureName);
  }
  
  isFeatureRegistered(featureName: string): boolean {
    return this.registeredFeatures.has(featureName);
  }
}

// Advanced Selector Composition with Memoization
class AdvancedSelectors {
  // Parameterized selectors with caching
  static createParameterizedSelector<T, P, R>(
    selector: (state: T) => any,
    projector: (data: any, params: P) => R
  ) {
    const cache = new Map<string, R>();
    
    return (params: P) => createSelector(
      selector,
      (data) => {
        const cacheKey = JSON.stringify(params);
        
        if (cache.has(cacheKey)) {
          return cache.get(cacheKey)!;
        }
        
        const result = projector(data, params);
        cache.set(cacheKey, result);
        
        // Cleanup old cache entries
        if (cache.size > 100) {
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }
        
        return result;
      }
    );
  }
  
  // Complex data transformation selectors
  static createAggregateSelector<T>(
    selectors: { [K in keyof T]: MemoizedSelector<any, T[K]> }
  ): MemoizedSelector<any, T> {
    const selectorArray = Object.values(selectors) as MemoizedSelector<any, any>[];
    const keys = Object.keys(selectors) as (keyof T)[];
    
    return createSelector(
      ...selectorArray,
      (...values: any[]) => {
        const result = {} as T;
        keys.forEach((key, index) => {
          result[key] = values[index];
        });
        return result;
      }
    );
  }
  
  // Computed selectors with dependencies
  static createComputedSelector<T, R>(
    dependencies: MemoizedSelector<any, any>[],
    computer: (...deps: any[]) => R,
    options: { debounceTime?: number; distinctUntilChanged?: boolean } = {}
  ): Observable<R> {
    return combineLatest(dependencies.map(dep => this.store.select(dep))).pipe(
      ...(options.debounceTime ? [debounceTime(options.debounceTime)] : []),
      map(values => computer(...values)),
      ...(options.distinctUntilChanged ? [distinctUntilChanged()] : [])
    );
  }
}

// Advanced Effect Patterns
@Injectable()
export class AdvancedEffects {
  // Batch processing effect
  batchProcess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(batchProcessStart),
      bufferTime(1000), // Collect actions for 1 second
      filter(actions => actions.length > 0),
      mergeMap(actions => {
        const batches = this.createBatches(actions, 10); // Process in batches of 10
        
        return from(batches).pipe(
          concatMap(batch => this.processBatch(batch)),
          scan((acc, result) => [...acc, ...result], [] as any[]),
          map(results => batchProcessSuccess({ results }))
        );
      }),
      catchError(error => of(batchProcessFailure({ error })))
    );
  });
  
  // Retry with exponential backoff
  retryableEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(retryableAction),
      mergeMap(action => 
        this.apiService.performAction(action.payload).pipe(
          map(result => retryableActionSuccess({ result })),
          retryWhen(errors => 
            errors.pipe(
              scan((retryCount, error) => {
                if (retryCount >= 3) {
                  throw error;
                }
                return retryCount + 1;
              }, 0),
              delay(1000), // Exponential backoff: 1s, 2s, 4s
              tap(retryCount => console.log(`Retry attempt ${retryCount}`)),
              delayWhen(retryCount => timer(Math.pow(2, retryCount - 1) * 1000))
            )
          ),
          catchError(error => of(retryableActionFailure({ error })))
        )
      )
    );
  });
  
  // Conditional effect execution
  conditionalEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(conditionalAction),
      withLatestFrom(
        this.store.select(selectUserPermissions),
        this.store.select(selectFeatureFlags)
      ),
      filter(([action, permissions, flags]) => 
        this.hasPermission(permissions, action.requiredPermission) &&
        this.isFeatureEnabled(flags, action.featureFlag)
      ),
      map(([action]) => action),
      switchMap(action => 
        this.executeConditionalAction(action).pipe(
          map(result => conditionalActionSuccess({ result })),
          catchError(error => of(conditionalActionFailure({ error })))
        )
      )
    );
  });
  
  // Long-running process with progress tracking
  longRunningProcess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startLongProcess),
      switchMap(action => {
        return this.processService.startLongProcess(action.payload).pipe(
          // Emit progress updates
          tap(progress => {
            if (progress.type === 'progress') {
              this.store.dispatch(updateProcessProgress({ progress: progress.value }));
            }
          }),
          // Filter only completion events
          filter(event => event.type === 'complete'),
          map(result => longProcessComplete({ result: result.data })),
          catchError(error => {
            this.store.dispatch(updateProcessProgress({ progress: 0 }));
            return of(longProcessFailure({ error }));
          })
        );
      })
    );
  });
  
  constructor(
    private actions$: Actions,
    private store: Store,
    private apiService: ApiService,
    private processService: ProcessService
  ) {}
  
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }
  
  private processBatch(batch: any[]): Observable<any[]> {
    return this.apiService.processBatch(batch);
  }
  
  private hasPermission(permissions: string[], required: string): boolean {
    return permissions.includes(required);
  }
  
  private isFeatureEnabled(flags: Record<string, boolean>, flag: string): boolean {
    return flags[flag] === true;
  }
  
  private executeConditionalAction(action: any): Observable<any> {
    return this.apiService.executeAction(action.payload);
  }
}

// Performance Optimization Patterns
@Injectable()
export class PerformanceOptimizedStore {
  // Lazy selector creation
  private selectorCache = new Map<string, MemoizedSelector<any, any>>();
  
  createLazySelector<T, R>(
    key: string,
    selectorFn: () => MemoizedSelector<any, R>
  ): MemoizedSelector<any, R> {
    if (!this.selectorCache.has(key)) {
      this.selectorCache.set(key, selectorFn());
    }
    return this.selectorCache.get(key)!;
  }
  
  // Selective state updates
  updateStateSelectively<T>(
    state: T,
    updates: Partial<T>,
    changedFields: (keyof T)[]
  ): T {
    // Only update if specific fields changed
    const hasChanges = changedFields.some(field => 
      state[field] !== updates[field]
    );
    
    if (!hasChanges) {
      return state;
    }
    
    return {
      ...state,
      ...updates,
      lastUpdated: Date.now()
    };
  }
  
  // Memory-efficient state management
  createMemoryEfficientReducer<T>(
    initialState: T,
    maxHistorySize: number = 10
  ) {
    return createReducer(
      {
        ...initialState,
        history: [] as T[],
        historyIndex: -1
      },
      on(undoAction, (state) => {
        if (state.historyIndex > 0) {
          const previousState = state.history[state.historyIndex - 1];
          return {
            ...previousState,
            history: state.history,
            historyIndex: state.historyIndex - 1
          };
        }
        return state;
      }),
      on(redoAction, (state) => {
        if (state.historyIndex < state.history.length - 1) {
          const nextState = state.history[state.historyIndex + 1];
          return {
            ...nextState,
            history: state.history,
            historyIndex: state.historyIndex + 1
          };
        }
        return state;
      })
    );
  }
}

// Advanced Testing Patterns
class NgRxTestingUtils {
  // Mock store with realistic behavior
  static createMockStore<T>(initialState: T): MockStore<T> {
    const mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const state$ = new BehaviorSubject(initialState);
    
    mockStore.select.and.callFake((selector: any) => {
      if (typeof selector === 'function') {
        return state$.pipe(map(state => selector(state)));
      }
      return state$.asObservable();
    });
    
    mockStore.dispatch.and.callFake((action: any) => {
      // Simulate state changes for testing
      console.log('Dispatched action:', action);
    });
    
    return mockStore;
  }
  
  // Effect testing utilities
  static testEffect(
    effect: Observable<any>,
    actions: any[],
    expectedActions: any[]
  ): void {
    const actionsSubject = new Subject();
    const results: any[] = [];
    
    effect.subscribe(action => results.push(action));
    
    actions.forEach(action => actionsSubject.next(action));
    
    expect(results).toEqual(expectedActions);
  }
  
  // Selector testing with different state scenarios
  static testSelector<T, R>(
    selector: MemoizedSelector<T, R>,
    testCases: Array<{ state: T; expected: R; description: string }>
  ): void {
    testCases.forEach(({ state, expected, description }) => {
      it(description, () => {
        const result = selector.projector(state);
        expect(result).toEqual(expected);
      });
    });
  }
}

// State Persistence and Hydration
@Injectable()
export class StatePersistenceService {
  private readonly STORAGE_KEY = 'app_state';
  private readonly PERSIST_DEBOUNCE_TIME = 1000;
  
  constructor(private store: Store) {
    this.setupStatePersistence();
  }
  
  private setupStatePersistence(): void {
    // Persist state changes
    this.store.pipe(
      debounceTime(this.PERSIST_DEBOUNCE_TIME),
      map(state => this.serializeState(state))
    ).subscribe(serializedState => {
      this.saveToStorage(serializedState);
    });
  }
  
  hydrateState(): any {
    try {
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState) {
        return this.deserializeState(savedState);
      }
    } catch (error) {
      console.error('Failed to hydrate state:', error);
    }
    return null;
  }
  
  private serializeState(state: any): string {
    // Remove non-serializable data
    const cleanState = this.removeNonSerializable(state);
    return JSON.stringify(cleanState);
  }
  
  private deserializeState(serializedState: string): any {
    const state = JSON.parse(serializedState);
    // Restore any necessary object types
    return this.restoreObjectTypes(state);
  }
  
  private removeNonSerializable(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (obj instanceof Date) {
      return obj.toISOString();
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.removeNonSerializable(item));
    }
    
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'function') {
        continue; // Skip functions
      }
      cleaned[key] = this.removeNonSerializable(value);
    }
    
    return cleaned;
  }
  
  private restoreObjectTypes(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.restoreObjectTypes(item));
    }
    
    const restored: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && this.isISODateString(value)) {
        restored[key] = new Date(value);
      } else {
        restored[key] = this.restoreObjectTypes(value);
      }
    }
    
    return restored;
  }
  
  private isISODateString(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
  }
  
  private saveToStorage(serializedState: string): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, serializedState);
    } catch (error) {
      console.error('Failed to save state to storage:', error);
    }
  }
  
  clearPersistedState(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

// Usage Examples

// 1. Feature Registration
const featureManager = new FeatureStateManager(store);
featureManager.registerFeature('userManagement', userReducer, initialUserState);

// 2. Advanced Selectors
const selectUserById = AdvancedSelectors.createParameterizedSelector(
  selectUsers,
  (users, params: { id: string }) => users.find(user => user.id === params.id)
);

const selectUserByIdMemoized = selectUserById({ id: 'user123' });

// 3. Performance Optimized Store
const perfStore = new PerformanceOptimizedStore();
const lazyUserSelector = perfStore.createLazySelector(
  'users',
  () => createSelector(selectUserState, state => state.users)
);

// 4. State Persistence
const persistenceService = new StatePersistenceService(store);
const hydratedState = persistenceService.hydrateState();

if (hydratedState) {
  store.dispatch({ type: 'HYDRATE_STATE', payload: hydratedState });
}
```

### Q10: How do you implement NgRx with micro-frontend architecture?

**Answer:**
Integrating NgRx with micro-frontend architecture requires careful state isolation, cross-application communication, and shared state management strategies.

**Micro-frontend NgRx Architecture:**
```typescript
// Shared State Interface
interface SharedAppState {
  user: UserState;
  theme: ThemeState;
  notifications: NotificationState;
}

// Micro-frontend State Manager
@Injectable({
  providedIn: 'root'
})
export class MicroFrontendStateManager {
  private sharedStore: Store<SharedAppState>;
  private localStores = new Map<string, Store<any>>();
  private stateSync$ = new Subject<StateSync>();
  
  constructor(@Inject('SHARED_STORE') sharedStore: Store<SharedAppState>) {
    this.sharedStore = sharedStore;
    this.setupCrossAppCommunication();
  }
  
  // Register micro-frontend store
  registerMicroFrontend<T>(name: string, store: Store<T>): void {
    this.localStores.set(name, store);
    
    // Setup bidirectional state sync
    this.setupStateSync(name, store);
  }
  
  // Share state between micro-frontends
  shareState<T>(fromApp: string, toApp: string, selector: string, data: T): void {
    this.stateSync$.next({
      type: 'SHARE_STATE',
      fromApp,
      toApp,
      selector,
      data
    });
  }
  
  // Broadcast action to all micro-frontends
  broadcastAction(action: Action, excludeApps: string[] = []): void {
    this.localStores.forEach((store, appName) => {
      if (!excludeApps.includes(appName)) {
        store.dispatch(action);
      }
    });
  }
  
  // Get shared state observable
  getSharedState<T>(selector: MemoizedSelector<SharedAppState, T>): Observable<T> {
    return this.sharedStore.select(selector);
  }
  
  private setupCrossAppCommunication(): void {
    // Listen for cross-app state changes
    this.stateSync$.pipe(
      filter(sync => sync.type === 'SHARE_STATE')
    ).subscribe(sync => {
      const targetStore = this.localStores.get(sync.toApp);
      if (targetStore) {
        targetStore.dispatch({
          type: `[${sync.fromApp}] ${sync.selector}`,
          payload: sync.data
        });
      }
    });
    
    // Setup window message communication for cross-origin
    window.addEventListener('message', (event) => {
      if (event.data.type === 'MICRO_FRONTEND_STATE_SYNC') {
        this.handleCrossOriginStateSync(event.data);
      }
    });
  }
  
  private setupStateSync<T>(appName: string, store: Store<T>): void {
    // Sync specific state changes to shared store
    store.select(state => (state as any).shared).pipe(
      distinctUntilChanged(),
      filter(sharedState => sharedState !== undefined)
    ).subscribe(sharedState => {
      this.sharedStore.dispatch({
        type: `[${appName}] Update Shared State`,
        payload: sharedState
      });
    });
  }
  
  private handleCrossOriginStateSync(data: any): void {
    const { appName, action } = data;
    const targetStore = this.localStores.get(appName);
    
    if (targetStore) {
      targetStore.dispatch(action);
    }
  }
}

// Cross-App Communication Service
@Injectable()
export class CrossAppCommunicationService {
  private messageChannel = new BroadcastChannel('micro-frontend-state');
  
  constructor(private stateManager: MicroFrontendStateManager) {
    this.setupMessageHandling();
  }
  
  // Send state update to other micro-frontends
  sendStateUpdate(targetApp: string, state: any): void {
    this.messageChannel.postMessage({
      type: 'STATE_UPDATE',
      targetApp,
      state,
      timestamp: Date.now()
    });
  }
  
  // Send action to other micro-frontends
  sendAction(targetApp: string, action: Action): void {
    this.messageChannel.postMessage({
      type: 'ACTION_DISPATCH',
      targetApp,
      action,
      timestamp: Date.now()
    });
  }
  
  // Request state from another micro-frontend
  requestState(fromApp: string, selector: string): Observable<any> {
    const requestId = this.generateRequestId();
    
    this.messageChannel.postMessage({
      type: 'STATE_REQUEST',
      fromApp,
      selector,
      requestId,
      timestamp: Date.now()
    });
    
    return new Observable(observer => {
      const handler = (event: MessageEvent) => {
        if (event.data.type === 'STATE_RESPONSE' && 
            event.data.requestId === requestId) {
          observer.next(event.data.state);
          observer.complete();
          this.messageChannel.removeEventListener('message', handler);
        }
      };
      
      this.messageChannel.addEventListener('message', handler);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        observer.error(new Error('State request timeout'));
        this.messageChannel.removeEventListener('message', handler);
      }, 5000);
    });
  }
  
  private setupMessageHandling(): void {
    this.messageChannel.addEventListener('message', (event) => {
      const { type, targetApp, state, action, selector, requestId } = event.data;
      
      switch (type) {
        case 'STATE_UPDATE':
          this.handleStateUpdate(targetApp, state);
          break;
          
        case 'ACTION_DISPATCH':
          this.handleActionDispatch(targetApp, action);
          break;
          
        case 'STATE_REQUEST':
          this.handleStateRequest(selector, requestId);
          break;
      }
    });
  }
  
  private handleStateUpdate(targetApp: string, state: any): void {
    this.stateManager.shareState('external', targetApp, 'update', state);
  }
  
  private handleActionDispatch(targetApp: string, action: Action): void {
    this.stateManager.broadcastAction(action, [targetApp]);
  }
  
  private handleStateRequest(selector: string, requestId: string): void {
    // Get current state and respond
    // Implementation depends on specific selector logic
    const currentState = {}; // Get from store
    
    this.messageChannel.postMessage({
      type: 'STATE_RESPONSE',
      requestId,
      state: currentState,
      timestamp: Date.now()
    });
  }
  
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Federated State Module
@NgModule({
  providers: [
    {
      provide: 'SHARED_STORE',
      useFactory: () => {
        return new Store(sharedReducer, initialSharedState);
      }
    },
    MicroFrontendStateManager,
    CrossAppCommunicationService
  ]
})
export class FederatedStateModule {
  constructor(
    private stateManager: MicroFrontendStateManager,
    private store: Store
  ) {
    // Register this micro-frontend
    this.stateManager.registerMicroFrontend('main-app', this.store);
  }
}

// Usage in Micro-frontend
@Component({
  selector: 'app-micro-frontend',
  template: `
    <div class="micro-frontend">
      <h2>Micro Frontend Component</h2>
      <div *ngIf="sharedUser$ | async as user">
        Welcome, {{ user.name }}!
      </div>
      <button (click)="updateSharedTheme()">Change Theme</button>
      <button (click)="requestDataFromOtherApp()">Get Data from Other App</button>
    </div>
  `
})
export class MicroFrontendComponent {
  sharedUser$ = this.stateManager.getSharedState(selectSharedUser);
  
  constructor(
    private stateManager: MicroFrontendStateManager,
    private crossAppComm: CrossAppCommunicationService
  ) {}
  
  updateSharedTheme(): void {
    this.stateManager.broadcastAction({
      type: '[Theme] Toggle Dark Mode'
    });
  }
  
  requestDataFromOtherApp(): void {
    this.crossAppComm.requestState('dashboard-app', 'analytics').subscribe(
      data => console.log('Received data from dashboard:', data),
      error => console.error('Failed to get data:', error)
    );
  }
}

interface StateSync {
  type: string;
  fromApp: string;
  toApp: string;
  selector: string;
  data: any;
}
```

---

### Q11: How do you implement NgRx with Angular 15+ Standalone Components and modern architecture?

**Answer:**
Implementing NgRx with Angular 15+ standalone components requires adapting state management patterns to work without NgModules while maintaining type safety and performance.

**Standalone Component Store Setup:**
```typescript
// standalone-store.config.ts
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { isDevMode } from '@angular/core';

// Feature state interfaces
interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

interface ProductState {
  products: Product[];
  filters: ProductFilters;
  pagination: PaginationState;
  cache: Map<string, Product[]>;
}

// Root state
interface AppState {
  users: UserState;
  products: ProductState;
  router: RouterReducerState;
}

// Store providers for standalone bootstrap
export const storeProviders = [
  provideStore({
    users: userReducer,
    products: productReducer
  }),
  provideEffects([UserEffects, ProductEffects, RouterEffects]),
  provideRouterStore(),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75
  })
];

// Feature store providers
export const featureStoreProviders = [
  provideState('analytics', analyticsReducer),
  provideEffects([AnalyticsEffects])
];
```

**Standalone Component Integration:**
```typescript
// user-management.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="user-management">
      <div class="user-list">
        <div *ngFor="let user of users$ | async; trackBy: trackByUserId" 
             class="user-card"
             [class.selected]="(selectedUser$ | async)?.id === user.id"
             (click)="selectUser(user)">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
          <div class="user-actions">
            <button (click)="editUser(user); $event.stopPropagation()">
              Edit
            </button>
            <button (click)="deleteUser(user.id); $event.stopPropagation()" 
                    class="danger">
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <div class="user-details" *ngIf="selectedUser$ | async as user">
        <h2>User Details</h2>
        <form [formGroup]="userForm" (ngSubmit)="updateUser()">
          <input formControlName="name" placeholder="Name">
          <input formControlName="email" placeholder="Email">
          <button type="submit" [disabled]="userForm.invalid || (loading$ | async)">
            {{ (loading$ | async) ? 'Updating...' : 'Update User' }}
          </button>
        </form>
      </div>
      
      <div class="loading-overlay" *ngIf="loading$ | async">
        <div class="spinner"></div>
      </div>
    </div>
  `,
  styles: [`
    .user-management {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      padding: 1rem;
    }
    
    .user-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .user-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .user-card.selected {
      border-color: #007bff;
      background-color: #f8f9fa;
    }
    
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class UserManagementComponent implements OnInit {
  private store = inject(Store<AppState>);
  
  // Selectors with type safety
  users$ = this.store.select(selectAllUsers);
  selectedUser$ = this.store.select(selectSelectedUser);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);
  
  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    
    // Subscribe to selected user changes
    this.selectedUser$.pipe(
      filter(user => !!user),
      takeUntilDestroyed()
    ).subscribe(user => {
      this.userForm.patchValue({
        name: user!.name,
        email: user!.email
      });
    });
  }
  
  selectUser(user: User): void {
    this.store.dispatch(UserActions.selectUser({ userId: user.id }));
  }
  
  editUser(user: User): void {
    this.store.dispatch(UserActions.editUser({ user }));
  }
  
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UserActions.deleteUser({ userId }));
    }
  }
  
  updateUser(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      this.store.dispatch(UserActions.updateUser({ 
        user: { 
          ...formValue,
          id: this.selectedUser$.pipe(take(1)).subscribe(user => user?.id)
        } as User 
      }));
    }
  }
  
  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
```

**Advanced Selectors with Memoization:**
```typescript
// user.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// Feature selector
export const selectUserState = createFeatureSelector<UserState>('users');

// Basic selectors
export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);

// Advanced computed selectors
export const selectUserById = (userId: string) => createSelector(
  selectAllUsers,
  (users: User[]) => users.find(user => user.id === userId)
);

export const selectActiveUsers = createSelector(
  selectAllUsers,
  (users: User[]) => users.filter(user => user.isActive)
);

export const selectUsersByRole = (role: UserRole) => createSelector(
  selectAllUsers,
  (users: User[]) => users.filter(user => user.role === role)
);

export const selectUsersWithPagination = createSelector(
  selectAllUsers,
  selectUserState,
  (users: User[], state: UserState) => {
    const { page, pageSize } = state.pagination;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      users: users.slice(startIndex, endIndex),
      totalUsers: users.length,
      currentPage: page,
      totalPages: Math.ceil(users.length / pageSize),
      hasNextPage: endIndex < users.length,
      hasPreviousPage: page > 1
    };
  }
);

// Complex business logic selectors
export const selectUserStatistics = createSelector(
  selectAllUsers,
  (users: User[]) => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isActive).length;
    const usersByRole = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<UserRole, number>);
    
    return {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      usersByRole,
      averageAge: users.reduce((sum, u) => sum + u.age, 0) / totalUsers
    };
  }
);
```

**Component Store for Local State:**
```typescript
// user-form.component-store.ts
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap, catchError, EMPTY } from 'rxjs';

interface UserFormState {
  user: Partial<User>;
  isEditing: boolean;
  isDirty: boolean;
  validationErrors: Record<string, string[]>;
  isSubmitting: boolean;
}

const initialState: UserFormState = {
  user: {},
  isEditing: false,
  isDirty: false,
  validationErrors: {},
  isSubmitting: false
};

@Injectable()
export class UserFormComponentStore extends ComponentStore<UserFormState> {
  constructor(private userService: UserService) {
    super(initialState);
  }
  
  // Selectors
  readonly user$ = this.select(state => state.user);
  readonly isEditing$ = this.select(state => state.isEditing);
  readonly isDirty$ = this.select(state => state.isDirty);
  readonly validationErrors$ = this.select(state => state.validationErrors);
  readonly isSubmitting$ = this.select(state => state.isSubmitting);
  
  readonly canSave$ = this.select(
    this.isDirty$,
    this.validationErrors$,
    this.isSubmitting$,
    (isDirty, errors, isSubmitting) => 
      isDirty && Object.keys(errors).length === 0 && !isSubmitting
  );
  
  // Updaters
  readonly setUser = this.updater((state, user: Partial<User>) => ({
    ...state,
    user: { ...state.user, ...user },
    isDirty: true
  }));
  
  readonly setEditing = this.updater((state, isEditing: boolean) => ({
    ...state,
    isEditing
  }));
  
  readonly setValidationErrors = this.updater(
    (state, errors: Record<string, string[]>) => ({
      ...state,
      validationErrors: errors
    })
  );
  
  readonly resetForm = this.updater((state) => ({
    ...initialState,
    user: state.user
  }));
  
  // Effects
  readonly saveUser = this.effect((user$: Observable<User>) => {
    return user$.pipe(
      tap(() => this.patchState({ isSubmitting: true })),
      switchMap((user) => 
        this.userService.saveUser(user).pipe(
          tap((savedUser) => {
            this.patchState({ 
              user: savedUser, 
              isDirty: false, 
              isSubmitting: false,
              isEditing: false
            });
          }),
          catchError((error) => {
            this.patchState({ 
              isSubmitting: false,
              validationErrors: this.parseValidationErrors(error)
            });
            return EMPTY;
          })
        )
      )
    );
  });
  
  private parseValidationErrors(error: any): Record<string, string[]> {
    // Parse server validation errors
    return error.validationErrors || {};
  }
}
```

---

### Q12: How do you implement advanced NgRx testing strategies with modern Angular testing utilities?

**Answer:**
Advanced NgRx testing requires comprehensive strategies for testing actions, reducers, effects, selectors, and component integration with modern Angular testing utilities.

**Testing Actions:**
```typescript
// user.actions.spec.ts
import * as UserActions from './user.actions';
import { User } from '../models/user.model';

describe('User Actions', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    isActive: true,
    age: 30
  };
  
  describe('loadUsers', () => {
    it('should create an action', () => {
      const action = UserActions.loadUsers();
      expect(action.type).toBe('[User] Load Users');
    });
  });
  
  describe('loadUsersSuccess', () => {
    it('should create an action with users payload', () => {
      const users = [mockUser];
      const action = UserActions.loadUsersSuccess({ users });
      
      expect(action.type).toBe('[User] Load Users Success');
      expect(action.users).toEqual(users);
    });
  });
  
  describe('updateUser', () => {
    it('should create an action with user payload', () => {
      const action = UserActions.updateUser({ user: mockUser });
      
      expect(action.type).toBe('[User] Update User');
      expect(action.user).toEqual(mockUser);
    });
  });
});
```

**Testing Reducers:**
```typescript
// user.reducer.spec.ts
import { userReducer, initialState, UserState } from './user.reducer';
import * as UserActions from './user.actions';
import { User } from '../models/user.model';

describe('User Reducer', () => {
  const mockUsers: User[] = [
    { id: '1', name: 'John', email: 'john@test.com', role: 'admin', isActive: true, age: 30 },
    { id: '2', name: 'Jane', email: 'jane@test.com', role: 'user', isActive: true, age: 25 }
  ];
  
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = userReducer(initialState, action);
      
      expect(result).toBe(initialState);
    });
  });
  
  describe('loadUsers action', () => {
    it('should set loading to true', () => {
      const action = UserActions.loadUsers();
      const result = userReducer(initialState, action);
      
      expect(result.loading).toBe(true);
      expect(result.error).toBe(null);
    });
  });
  
  describe('loadUsersSuccess action', () => {
    it('should populate users and set loading to false', () => {
      const action = UserActions.loadUsersSuccess({ users: mockUsers });
      const result = userReducer(initialState, action);
      
      expect(result.users).toEqual(mockUsers);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(null);
    });
  });
  
  describe('updateUserSuccess action', () => {
    it('should update existing user', () => {
      const stateWithUsers: UserState = {
        ...initialState,
        users: mockUsers
      };
      
      const updatedUser = { ...mockUsers[0], name: 'John Updated' };
      const action = UserActions.updateUserSuccess({ user: updatedUser });
      const result = userReducer(stateWithUsers, action);
      
      expect(result.users[0]).toEqual(updatedUser);
      expect(result.users[1]).toEqual(mockUsers[1]);
    });
  });
  
  describe('deleteUserSuccess action', () => {
    it('should remove user from state', () => {
      const stateWithUsers: UserState = {
        ...initialState,
        users: mockUsers
      };
      
      const action = UserActions.deleteUserSuccess({ userId: '1' });
      const result = userReducer(stateWithUsers, action);
      
      expect(result.users).toHaveLength(1);
      expect(result.users[0].id).toBe('2');
    });
  });
});
```

**Testing Effects:**
```typescript
// user.effects.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';
import { hot, cold } from 'jasmine-marbles';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;
  
  const mockUsers = [
    { id: '1', name: 'John', email: 'john@test.com', role: 'admin', isActive: true, age: 30 }
  ];
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', [
      'getUsers', 'createUser', 'updateUser', 'deleteUser'
    ]);
    
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: spy }
      ]
    });
    
    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });
  
  describe('loadUsers$', () => {
    it('should return loadUsersSuccess action on successful API call', () => {
      const action = UserActions.loadUsers();
      const completion = UserActions.loadUsersSuccess({ users: mockUsers });
      
      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: mockUsers });
      userService.getUsers.and.returnValue(response);
      
      const expected = cold('--b', { b: completion });
      expect(effects.loadUsers$).toBeObservable(expected);
    });
    
    it('should return loadUsersFailure action on API error', () => {
      const action = UserActions.loadUsers();
      const error = new Error('API Error');
      const completion = UserActions.loadUsersFailure({ error: error.message });
      
      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      userService.getUsers.and.returnValue(response);
      
      const expected = cold('--b', { b: completion });
      expect(effects.loadUsers$).toBeObservable(expected);
    });
  });
  
  describe('createUser$', () => {
    it('should return createUserSuccess and show success message', () => {
      const user = mockUsers[0];
      const action = UserActions.createUser({ user });
      const completion = UserActions.createUserSuccess({ user });
      
      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: user });
      userService.createUser.and.returnValue(response);
      
      const expected = cold('--b', { b: completion });
      expect(effects.createUser$).toBeObservable(expected);
    });
  });
});
```

**Testing Selectors:**
```typescript
// user.selectors.spec.ts
import * as UserSelectors from './user.selectors';
import { UserState } from './user.reducer';
import { AppState } from '../app.state';

describe('User Selectors', () => {
  const mockUsers = [
    { id: '1', name: 'John', email: 'john@test.com', role: 'admin', isActive: true, age: 30 },
    { id: '2', name: 'Jane', email: 'jane@test.com', role: 'user', isActive: false, age: 25 },
    { id: '3', name: 'Bob', email: 'bob@test.com', role: 'user', isActive: true, age: 35 }
  ];
  
  const userState: UserState = {
    users: mockUsers,
    selectedUser: mockUsers[0],
    loading: false,
    error: null,
    pagination: { page: 1, pageSize: 10 }
  };
  
  const appState: AppState = {
    users: userState,
    products: {} as any,
    router: {} as any
  };
  
  describe('selectAllUsers', () => {
    it('should select all users', () => {
      const result = UserSelectors.selectAllUsers(appState);
      expect(result).toEqual(mockUsers);
    });
  });
  
  describe('selectActiveUsers', () => {
    it('should select only active users', () => {
      const result = UserSelectors.selectActiveUsers(appState);
      expect(result).toHaveLength(2);
      expect(result.every(user => user.isActive)).toBe(true);
    });
  });
  
  describe('selectUserById', () => {
    it('should select user by id', () => {
      const result = UserSelectors.selectUserById('1')(appState);
      expect(result).toEqual(mockUsers[0]);
    });
    
    it('should return undefined for non-existent user', () => {
      const result = UserSelectors.selectUserById('999')(appState);
      expect(result).toBeUndefined();
    });
  });
  
  describe('selectUserStatistics', () => {
    it('should calculate user statistics correctly', () => {
      const result = UserSelectors.selectUserStatistics(appState);
      
      expect(result.totalUsers).toBe(3);
      expect(result.activeUsers).toBe(2);
      expect(result.inactiveUsers).toBe(1);
      expect(result.usersByRole.admin).toBe(1);
      expect(result.usersByRole.user).toBe(2);
      expect(result.averageAge).toBe(30);
    });
  });
});
```

**Integration Testing with Components:**
```typescript
// user-management.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserManagementComponent } from './user-management.component';
import * as UserActions from '../store/user.actions';
import * as UserSelectors from '../store/user.selectors';
import { AppState } from '../store/app.state';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  
  const mockUsers = [
    { id: '1', name: 'John', email: 'john@test.com', role: 'admin', isActive: true, age: 30 },
    { id: '2', name: 'Jane', email: 'jane@test.com', role: 'user', isActive: true, age: 25 }
  ];
  
  const initialState: Partial<AppState> = {
    users: {
      users: mockUsers,
      selectedUser: null,
      loading: false,
      error: null,
      pagination: { page: 1, pageSize: 10 }
    }
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    
    // Override selectors
    store.overrideSelector(UserSelectors.selectAllUsers, mockUsers);
    store.overrideSelector(UserSelectors.selectUsersLoading, false);
    store.overrideSelector(UserSelectors.selectSelectedUser, null);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should dispatch loadUsers on init', () => {
    component.ngOnInit();
    
    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.loadUsers());
  });
  
  it('should display users in template', () => {
    fixture.detectChanges();
    
    const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(userCards).toHaveLength(2);
    
    const firstCard = userCards[0];
    expect(firstCard.nativeElement.textContent).toContain('John');
    expect(firstCard.nativeElement.textContent).toContain('john@test.com');
  });
  
  it('should dispatch selectUser when user card is clicked', () => {
    fixture.detectChanges();
    
    const firstUserCard = fixture.debugElement.query(By.css('.user-card'));
    firstUserCard.nativeElement.click();
    
    expect(dispatchSpy).toHaveBeenCalledWith(
      UserActions.selectUser({ userId: '1' })
    );
  });
  
  it('should show loading state', () => {
    store.overrideSelector(UserSelectors.selectUsersLoading, true);
    store.refreshState();
    fixture.detectChanges();
    
    const loadingOverlay = fixture.debugElement.query(By.css('.loading-overlay'));
    expect(loadingOverlay).toBeTruthy();
  });
  
  it('should handle user deletion with confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    fixture.detectChanges();
    
    const deleteButton = fixture.debugElement.query(
      By.css('.user-card .danger')
    );
    deleteButton.nativeElement.click();
    
    expect(window.confirm).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      UserActions.deleteUser({ userId: '1' })
    );
  });
});
```

## Advanced NgRx Patterns

### Q13: How would you implement NgRx Signal Store for modern Angular applications?

**Answer:**
NgRx Signal Store is a modern state management solution that leverages Angular's Signals API for reactive state management with reduced boilerplate compared to traditional NgRx.

**Key Concepts:**

1. **Signal-Based State Management:**
```typescript
// Setting up a Signal Store
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, map, tap } from 'rxjs';

// Define state interface
interface ProductsState {
  products: Product[];
  selectedProductId: string | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

// Create the store
export const ProductsStore = signalStore(
  // Initial state
  withState<ProductsState>({
    products: [],
    selectedProductId: null,
    status: 'idle',
    error: null
  }),
  
  // Computed values
  withComputed((state) => ({
    selectedProduct: computed(() => {
      const selectedId = state.selectedProductId();
      return selectedId ? state.products().find(p => p.id === selectedId) : null;
    }),
    productCount: computed(() => state.products().length),
    isLoading: computed(() => state.status() === 'loading')
  })),
  
  // Methods
  withMethods((state, productsService = inject(ProductsService)) => ({
    // Synchronous method
    selectProduct(productId: string) {
      patchState(state, { selectedProductId: productId });
    },
    
    // Asynchronous method using rxMethod
    loadProducts: rxMethod<void>(pipe(
      tap(() => patchState(state, { status: 'loading' })),
      switchMap(() => productsService.getProducts().pipe(
        map(products => {
          patchState(state, { 
            products, 
            status: 'loaded',
            error: null 
          });
        }),
        tap({
          error: (err) => patchState(state, { 
            status: 'error', 
            error: err.message 
          })
        })
      ))
    ))
  }))
);
```

2. **Using Signal Store in Components:**
```typescript
@Component({
  selector: 'app-products',
  template: `
    <div *ngIf="store.isLoading()" class="loading">Loading...</div>
    
    <div *ngIf="store.status() === 'error'" class="error">
      Error: {{ store.error() }}
    </div>
    
    <div *ngIf="store.status() === 'loaded'">
      <h2>Products ({{ store.productCount() }})</h2>
      
      <div class="product-list">
        <div 
          *ngFor="let product of store.products()"
          class="product-card"
          [class.selected]="product.id === store.selectedProductId()"
          (click)="store.selectProduct(product.id)">
          {{ product.name }} - ${{ product.price }}
        </div>
      </div>
      
      <div *ngIf="store.selectedProduct()" class="product-details">
        <h3>{{ store.selectedProduct()?.name }}</h3>
        <p>{{ store.selectedProduct()?.description }}</p>
        <p class="price">${{ store.selectedProduct()?.price }}</p>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  providers: [ProductsStore]
})
export class ProductsComponent implements OnInit {
  store = inject(ProductsStore);
  
  ngOnInit() {
    this.store.loadProducts();
  }
}
```

3. **Benefits of Signal Store:**
   - Reduced boilerplate compared to traditional NgRx
   - Leverages Angular's built-in Signals API
   - Improved performance with fine-grained reactivity
   - Better TypeScript support and type inference
   - Simpler testing with fewer abstractions
   - Seamless integration with standalone components

4. **Migration Strategy from Traditional NgRx:**
```typescript
// Step 1: Identify a feature module using traditional NgRx
// Step 2: Create equivalent Signal Store
// Step 3: Replace selectors with computed signals
// Step 4: Replace effects with rxMethods
// Step 5: Replace action dispatching with direct method calls

// Example migration of a selector
// Before: Traditional NgRx
const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

// After: Signal Store
const products = computed(() => state.products());

// Example migration of an effect
// Before: Traditional NgRx
loadProducts$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ProductActions.load),
    switchMap(() => this.productService.getAll().pipe(
      map(products => ProductActions.loadSuccess({ products })),
      catchError(error => of(ProductActions.loadFailure({ error })))
    ))
  )
);

// After: Signal Store
loadProducts: rxMethod<void>(pipe(
  tap(() => patchState(state, { status: 'loading' })),
  switchMap(() => this.productService.getAll().pipe(
    map(products => patchState(state, { products, status: 'loaded' })),
    catchError(error => of(patchState(state, { error, status: 'error' })))
  ))
))
```

### Q14: How would you implement advanced NgRx patterns for enterprise applications?

**Answer:**
Enterprise applications require sophisticated state management patterns to handle complex domains, scale effectively, and maintain performance.

**Advanced NgRx Patterns:**

1. **Domain-Driven State Composition:**
```typescript
// Core state interfaces organized by domain
export interface AppState {
  auth: AuthState;
  products: ProductsState;
  orders: OrdersState;
  customers: CustomersState;
  ui: UiState;
}

// Feature state with normalized entities
export interface ProductsState {
  entities: Record<string, Product>;
  ids: string[];
  selectedId: string | null;
  filters: ProductFilters;
  pagination: PaginationState;
  loadingStatus: LoadingStatus;
  error: ErrorState | null;
}

// Root store module with lazy-loaded feature states
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([CoreEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
})
export class AppStoreModule {}
```

2. **Advanced Optimistic Updates with Conflict Resolution:**
```typescript
// Action creators for optimistic updates
const updateProductOptimistic = createAction(
  '[Product] Update Optimistic',
  props<{ product: Product; originalProduct: Product }>()
);

const updateProductSuccess = createAction(
  '[Product] Update Success',
  props<{ product: Product }>()
);

const updateProductFailure = createAction(
  '[Product] Update Failure',
  props<{ error: any; originalProduct: Product }>()
);

// Reducer handling optimistic updates
const productReducer = createReducer(
  initialState,
  on(updateProductOptimistic, (state, { product }) => {
    return adapter.updateOne(
      { id: product.id, changes: product },
      { ...state, pendingUpdates: [...state.pendingUpdates, product.id] }
    );
  }),
  on(updateProductSuccess, (state, { product }) => {
    return {
      ...adapter.updateOne({ id: product.id, changes: product }, state),
      pendingUpdates: state.pendingUpdates.filter(id => id !== product.id),
      lastSyncedAt: new Date().toISOString()
    };
  }),
  on(updateProductFailure, (state, { originalProduct, error }) => {
    return {
      ...adapter.updateOne(
        { id: originalProduct.id, changes: originalProduct },
        state
      ),
      pendingUpdates: state.pendingUpdates.filter(id => id !== originalProduct.id),
      errors: [...state.errors, { entityId: originalProduct.id, error }]
    };
  })
);

// Effect for handling optimistic updates with conflict resolution
@Injectable()
export class ProductEffects {
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProductOptimistic),
      concatMap(({ product, originalProduct }) =>
        this.productService.update(product).pipe(
          map(updatedProduct => {
            // Check for conflicts (server might have newer version)
            if (updatedProduct.version !== product.version) {
              // Handle conflict - could show UI for conflict resolution
              this.conflictService.handleConflict({
                clientVersion: product,
                serverVersion: updatedProduct
              });
            }
            return updateProductSuccess({ product: updatedProduct });
          }),
          catchError(error => of(updateProductFailure({ 
            error, 
            originalProduct 
          })))
        )
      )
    )
  );
}
```

3. **Real-time State Synchronization:**
```typescript
@Injectable()
export class RealTimeEffects {
  private readonly websocket$ = this.websocketService.connect();

  // Listen for real-time updates and dispatch actions
  syncState$ = createEffect(() =>
    this.websocket$.pipe(
      filter(event => event.type === 'ENTITY_UPDATED'),
      map(event => {
        // Determine which entity was updated
        switch (event.entityType) {
          case 'product':
            return ProductActions.externalUpdate({ product: event.data });
          case 'order':
            return OrderActions.externalUpdate({ order: event.data });
          default:
            return { type: 'UNKNOWN_ENTITY_TYPE' };
        }
      })
    )
  );

  // Handle offline/online synchronization
  syncOfflineChanges$ = createEffect(() =>
    this.networkService.online$.pipe(
      filter(online => online), // Only when coming back online
      withLatestFrom(this.store.select(selectOfflineChanges)),
      switchMap(([_, offlineChanges]) =>
        this.syncService.batchSync(offlineChanges).pipe(
          map(results => SyncActions.syncComplete({ results })),
          catchError(error => of(SyncActions.syncError({ error })))
        )
      )
    )
  );
}
```

4. **Advanced Micro-frontend State Composition:**
```typescript
// Shell application state
export interface ShellState {
  auth: AuthState;
  navigation: NavigationState;
  sharedContext: SharedContextState;
}

// Micro-frontend state registration service
@Injectable({ providedIn: 'root' })
export class MicroFrontendStateRegistry {
  private registry = new Map<string, ActionReducerMap<any>>();

  constructor(private store: Store) {}

  // Register a micro-frontend's state
  registerState(microFrontendId: string, reducers: ActionReducerMap<any>) {
    if (!this.registry.has(microFrontendId)) {
      // Dynamically add feature state
      this.store.dispatch({
        type: '[Store] Register Dynamic Feature',
        feature: microFrontendId,
        reducers
      });
      this.registry.set(microFrontendId, reducers);
    }
    return this.registry.get(microFrontendId);
  }

  // Unregister when micro-frontend is unmounted
  unregisterState(microFrontendId: string) {
    if (this.registry.has(microFrontendId)) {
      this.store.dispatch({
        type: '[Store] Unregister Dynamic Feature',
        feature: microFrontendId
      });
      this.registry.delete(microFrontendId);
    }
  }
}

// Custom meta-reducer for handling dynamic features
export function dynamicFeaturesMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  const featureReducers = {};
  
  return (state, action) => {
    // Handle dynamic feature registration
    if (action.type === '[Store] Register Dynamic Feature') {
      featureReducers[action.feature] = action.reducers;
    }
    
    // Handle dynamic feature unregistration
    if (action.type === '[Store] Unregister Dynamic Feature') {
      const { [action.feature]: removed, ...remaining } = featureReducers;
      Object.assign(featureReducers, remaining);
    }
    
    // Apply the main reducer
    let newState = reducer(state, action);
    
    // Apply any dynamic feature reducers
    Object.keys(featureReducers).forEach(feature => {
      const featureReducer = combineReducers(featureReducers[feature]);
      newState = {
        ...newState,
        [feature]: featureReducer(newState[feature], action)
      };
    });
    
    return newState;
  };
}
```

5. **Performance Optimization Patterns:**
```typescript
// Memoized selectors with custom equality functions
export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectProductFilters,
  (products, filters) => {
    // Return same reference if filters haven't changed
    return products.filter(product => {
      return (!filters.category || product.category === filters.category) &&
             (!filters.minPrice || product.price >= filters.minPrice) &&
             (!filters.maxPrice || product.price <= filters.maxPrice) &&
             (!filters.searchTerm || 
               product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    });
  },
  {
    memoize: customMemoize,
    resultEqualityCheck: (a, b) => {
      if (a === b) return true;
      if (!a || !b) return false;
      if (a.length !== b.length) return false;
      return a.every((item, i) => item.id === b[i].id);
    }
  }
);

// Custom projection function for minimizing state changes
export const selectProductViewModel = createSelector(
  selectSelectedProduct,
  selectRelatedProducts,
  selectProductReviews,
  (product, relatedProducts, reviews) => {
    if (!product) return null;
    
    // Only include necessary fields to minimize object size
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      averageRating: calculateAverageRating(reviews),
      relatedProductIds: relatedProducts.map(p => p.id)
    };
  }
);

// State hydration and rehydration for performance
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'ui.preferences'],
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `app_state_${key}`,
    syncCondition: (state) => state.auth?.isAuthenticated
  })(reducer);
}
```

This advanced NgRx guide now includes complex state composition patterns, optimistic updates with rollback capabilities, real-time state synchronization with conflict resolution strategies, enterprise-level patterns for scalability, comprehensive micro-frontend integration strategies, modern standalone component integration with Signal Store, and comprehensive testing strategies with modern Angular testing utilities.

### Q15: How do you implement comprehensive testing strategies for NgRx applications?

**Answer:**
Testing NgRx applications requires a multi-layered approach covering actions, reducers, effects, selectors, and integration scenarios.

**1. Testing Actions:**
```typescript
// user.actions.spec.ts
import * as UserActions from './user.actions';
import { User } from '../models/user.model';

describe('User Actions', () => {
  describe('loadUsers', () => {
    it('should create an action', () => {
      const action = UserActions.loadUsers();
      expect(action.type).toBe('[User] Load Users');
    });
  });

  describe('loadUsersSuccess', () => {
    it('should create an action with users payload', () => {
      const users: User[] = [
        { id: '1', name: 'John', email: 'john@example.com', role: 'user' },
        { id: '2', name: 'Jane', email: 'jane@example.com', role: 'admin' }
      ];
      const action = UserActions.loadUsersSuccess({ users });
      
      expect(action.type).toBe('[User] Load Users Success');
      expect(action.users).toEqual(users);
    });
  });

  describe('updateUser', () => {
    it('should create an action with user update payload', () => {
      const user: User = { id: '1', name: 'John Updated', email: 'john@example.com', role: 'user' };
      const action = UserActions.updateUser({ user });
      
      expect(action.type).toBe('[User] Update User');
      expect(action.user).toEqual(user);
    });
  });

  describe('deleteUser', () => {
    it('should create an action with user id', () => {
      const id = '123';
      const action = UserActions.deleteUser({ id });
      
      expect(action.type).toBe('[User] Delete User');
      expect(action.id).toBe(id);
    });
  });
});
```

**2. Testing Reducers:**
```typescript
// user.reducer.spec.ts
import { userReducer, initialUserState } from './user.reducer';
import * as UserActions from './user.actions';
import { User } from '../models/user.model';

describe('User Reducer', () => {
  const mockUsers: User[] = [
    { id: '1', name: 'John', email: 'john@example.com', role: 'user' },
    { id: '2', name: 'Jane', email: 'jane@example.com', role: 'admin' }
  ];

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = userReducer(initialUserState, action);
      expect(result).toBe(initialUserState);
    });
  });

  describe('loadUsers action', () => {
    it('should set loading to true and clear error', () => {
      const action = UserActions.loadUsers();
      const result = userReducer(initialUserState, action);
      
      expect(result.loading).toBe(true);
      expect(result.error).toBe(null);
      expect(result.users).toEqual([]);
    });
  });

  describe('loadUsersSuccess action', () => {
    it('should populate users and set loading to false', () => {
      const action = UserActions.loadUsersSuccess({ users: mockUsers });
      const result = userReducer(initialUserState, action);
      
      expect(result.loading).toBe(false);
      expect(result.error).toBe(null);
      expect(result.users).toEqual(mockUsers);
    });
  });

  describe('loadUsersFailure action', () => {
    it('should set error and loading to false', () => {
      const error = 'Failed to load users';
      const action = UserActions.loadUsersFailure({ error });
      const result = userReducer(initialUserState, action);
      
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
      expect(result.users).toEqual([]);
    });
  });

  describe('updateUser action', () => {
    it('should update existing user', () => {
      const initialState = {
        ...initialUserState,
        users: mockUsers
      };
      
      const updatedUser = { ...mockUsers[0], name: 'John Updated' };
      const action = UserActions.updateUser({ user: updatedUser });
      const result = userReducer(initialState, action);
      
      expect(result.users[0]).toEqual(updatedUser);
      expect(result.users[1]).toEqual(mockUsers[1]);
    });
  });

  describe('deleteUser action', () => {
    it('should remove user from state', () => {
      const initialState = {
        ...initialUserState,
        users: mockUsers
      };
      
      const action = UserActions.deleteUser({ id: '1' });
      const result = userReducer(initialState, action);
      
      expect(result.users).toHaveLength(1);
      expect(result.users[0]).toEqual(mockUsers[1]);
    });
  });

  describe('selectUser action', () => {
    it('should set selected user', () => {
      const action = UserActions.selectUser({ user: mockUsers[0] });
      const result = userReducer(initialUserState, action);
      
      expect(result.selectedUser).toEqual(mockUsers[0]);
    });
  });
});
```

**3. Testing Effects:**
```typescript
// user.effects.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';
import { User } from '../models/user.model';
import { hot, cold } from 'jasmine-marbles';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    { id: '1', name: 'John', email: 'john@example.com', role: 'user' },
    { id: '2', name: 'Jane', email: 'jane@example.com', role: 'admin' }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', [
      'getUsers', 'createUser', 'updateUser', 'deleteUser'
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: spy }
      ]
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  describe('loadUsers$', () => {
    it('should return loadUsersSuccess action on successful API call', () => {
      const action = UserActions.loadUsers();
      const outcome = UserActions.loadUsersSuccess({ users: mockUsers });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: mockUsers });
      userService.getUsers.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.loadUsers$).toBeObservable(expected);
    });

    it('should return loadUsersFailure action on API error', () => {
      const action = UserActions.loadUsers();
      const error = new Error('API Error');
      const outcome = UserActions.loadUsersFailure({ error: error.message });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      userService.getUsers.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.loadUsers$).toBeObservable(expected);
    });
  });

  describe('createUser$', () => {
    it('should return createUserSuccess action on successful creation', () => {
      const user = mockUsers[0];
      const action = UserActions.createUser({ user });
      const outcome = UserActions.createUserSuccess({ user });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: user });
      userService.createUser.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.createUser$).toBeObservable(expected);
    });
  });

  describe('updateUser$', () => {
    it('should return updateUserSuccess action on successful update', () => {
      const user = { ...mockUsers[0], name: 'Updated Name' };
      const action = UserActions.updateUser({ user });
      const outcome = UserActions.updateUserSuccess({ user });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: user });
      userService.updateUser.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.updateUser$).toBeObservable(expected);
    });
  });

  describe('deleteUser$', () => {
    it('should return deleteUserSuccess action on successful deletion', () => {
      const id = '1';
      const action = UserActions.deleteUser({ id });
      const outcome = UserActions.deleteUserSuccess({ id });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: { success: true } });
      userService.deleteUser.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.deleteUser$).toBeObservable(expected);
    });
  });
});
```

**Best Practices for NgRx Testing:**

1. **Test in Isolation**: Test each layer (actions, reducers, effects, selectors) independently
2. **Use Marble Testing**: Leverage marble diagrams for testing complex async flows in effects
3. **Mock External Dependencies**: Always mock HTTP services and other external dependencies
4. **Test Error Scenarios**: Ensure error handling is properly tested
5. **Performance Testing**: Include performance tests for large datasets and complex operations
6. **Integration Testing**: Test the complete flow from component to store
7. **Use Testing Utilities**: Create reusable testing helpers and utilities
8. **Test Selectors Thoroughly**: Ensure selectors work correctly with various state combinations
9. **Snapshot Testing**: Use snapshot testing for complex state structures
10. **Test State Immutability**: Verify that reducers don't mutate the original state

This comprehensive testing strategy ensures robust, maintainable NgRx applications with high confidence in state management reliability.

---

## NgRx Component Store

### Q11: What is NgRx Component Store and how does it differ from the global store?

**Answer:**
NgRx Component Store is a standalone library that provides local state management for Angular components, offering an alternative to the global NgRx store for component-specific state.

**Key Differences:**

| Feature | Global Store | Component Store |
|---------|-------------|----------------|
| Scope | Application-wide | Component-specific |
| Lifecycle | Application lifetime | Component lifetime |
| Boilerplate | High (actions, reducers, effects) | Low (direct methods) |
| DevTools | Full support | Limited support |
| Testing | Complex setup | Simple testing |
| Performance | Global change detection | Local optimization |

**Component Store Implementation:**
```typescript
// user-component.store.ts
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface UserComponentState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    role: string | null;
  };
}

const initialState: UserComponentState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    role: null
  }
};

@Injectable()
export class UserComponentStore extends ComponentStore<UserComponentState> {
  constructor(private userService: UserService) {
    super(initialState);
  }

  // Selectors
  readonly users$ = this.select(state => state.users);
  readonly selectedUser$ = this.select(state => state.selectedUser);
  readonly loading$ = this.select(state => state.loading);
  readonly error$ = this.select(state => state.error);
  readonly filters$ = this.select(state => state.filters);
  
  // Computed selectors
  readonly filteredUsers$ = this.select(
    this.users$,
    this.filters$,
    (users, filters) => {
      return users.filter(user => {
        const matchesSearch = !filters.search || 
          user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchesRole = !filters.role || user.role === filters.role;
        
        return matchesSearch && matchesRole;
      });
    }
  );
  
  readonly userCount$ = this.select(
    this.filteredUsers$,
    users => users.length
  );
  
  readonly hasUsers$ = this.select(
    this.users$,
    users => users.length > 0
  );

  // Updaters (synchronous state updates)
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading
  }));
  
  readonly setError = this.updater((state, error: string | null) => ({
    ...state,
    error,
    loading: false
  }));
  
  readonly setUsers = this.updater((state, users: User[]) => ({
    ...state,
    users,
    loading: false,
    error: null
  }));
  
  readonly addUser = this.updater((state, user: User) => ({
    ...state,
    users: [...state.users, user]
  }));
  
  readonly updateUser = this.updater((state, updatedUser: User) => ({
    ...state,
    users: state.users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ),
    selectedUser: state.selectedUser?.id === updatedUser.id 
      ? updatedUser 
      : state.selectedUser
  }));
  
  readonly removeUser = this.updater((state, userId: string) => ({
    ...state,
    users: state.users.filter(user => user.id !== userId),
    selectedUser: state.selectedUser?.id === userId 
      ? null 
      : state.selectedUser
  }));
  
  readonly selectUser = this.updater((state, user: User | null) => ({
    ...state,
    selectedUser: user
  }));
  
  readonly updateFilters = this.updater((state, filters: Partial<UserComponentState['filters']>) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  }));
  
  readonly clearFilters = this.updater(state => ({
    ...state,
    filters: initialState.filters
  }));

  // Effects (asynchronous operations)
  readonly loadUsers = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.userService.getUsers().pipe(
          tap(users => this.setUsers(users)),
          catchError(error => {
            this.setError(error.message);
            return EMPTY;
          })
        )
      )
    );
  });
  
  readonly createUser = this.effect((user$: Observable<Omit<User, 'id'>>) => {
    return user$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(userData =>
        this.userService.createUser(userData).pipe(
          tap(user => {
            this.addUser(user);
            this.setLoading(false);
          }),
          catchError(error => {
            this.setError(error.message);
            return EMPTY;
          })
        )
      )
    );
  });
  
  readonly updateUserEffect = this.effect((user$: Observable<User>) => {
    return user$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(user =>
        this.userService.updateUser(user).pipe(
          tap(updatedUser => {
            this.updateUser(updatedUser);
            this.setLoading(false);
          }),
          catchError(error => {
            this.setError(error.message);
            return EMPTY;
          })
        )
      )
    );
  });
  
  readonly deleteUser = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(userId =>
        this.userService.deleteUser(userId).pipe(
          tap(() => {
            this.removeUser(userId);
            this.setLoading(false);
          }),
          catchError(error => {
            this.setError(error.message);
            return EMPTY;
          })
        )
      )
    );
  });
  
  readonly searchUsers = this.effect((searchTerm$: Observable<string>) => {
    return searchTerm$.pipe(
      tap(search => this.updateFilters({ search }))
    );
  });
}
```

**Component Usage:**
```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserComponentStore } from './user-component.store';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list-container">
      <!-- Search and Filters -->
      <div class="filters">
        <input 
          [formControl]="searchControl"
          placeholder="Search users..."
          class="search-input"
        >
        
        <select 
          [value]="(filters$ | async)?.role || ''"
          (change)="onRoleFilterChange($event)"
          class="role-filter"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        
        <button (click)="clearFilters()" class="clear-filters">
          Clear Filters
        </button>
      </div>
      
      <!-- User Count -->
      <div class="user-count">
        Total Users: {{ userCount$ | async }}
      </div>
      
      <!-- Loading State -->
      <div *ngIf="loading$ | async" class="loading">
        Loading users...
      </div>
      
      <!-- Error State -->
      <div *ngIf="error$ | async as error" class="error">
        Error: {{ error }}
        <button (click)="retry()">Retry</button>
      </div>
      
      <!-- User List -->
      <div *ngIf="!(loading$ | async) && !(error$ | async)" class="user-grid">
        <div 
          *ngFor="let user of filteredUsers$ | async; trackBy: trackByUserId"
          class="user-card"
          [class.selected]="(selectedUser$ | async)?.id === user.id"
          (click)="selectUser(user)"
        >
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
          <span class="role-badge" [class]="user.role">{{ user.role }}</span>
          
          <div class="user-actions">
            <button (click)="editUser(user); $event.stopPropagation()">
              Edit
            </button>
            <button 
              (click)="deleteUser(user.id); $event.stopPropagation()"
              class="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <!-- Add User Button -->
      <button (click)="addNewUser()" class="add-user-btn">
        Add New User
      </button>
      
      <!-- Selected User Details -->
      <div *ngIf="selectedUser$ | async as selectedUser" class="user-details">
        <h2>Selected User</h2>
        <p><strong>Name:</strong> {{ selectedUser.name }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        <p><strong>Role:</strong> {{ selectedUser.role }}</p>
      </div>
    </div>
  `,
  providers: [UserComponentStore],
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  // Component Store observables
  readonly users$ = this.userStore.users$;
  readonly filteredUsers$ = this.userStore.filteredUsers$;
  readonly selectedUser$ = this.userStore.selectedUser$;
  readonly loading$ = this.userStore.loading$;
  readonly error$ = this.userStore.error$;
  readonly filters$ = this.userStore.filters$;
  readonly userCount$ = this.userStore.userCount$;
  readonly hasUsers$ = this.userStore.hasUsers$;
  
  // Form controls
  searchControl = new FormControl('');
  
  constructor(private userStore: UserComponentStore) {}
  
  ngOnInit() {
    // Load initial data
    this.userStore.loadUsers();
    
    // Setup search functionality
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.userStore.searchUsers(searchTerm || '');
    });
  }
  
  selectUser(user: User) {
    this.userStore.selectUser(user);
  }
  
  editUser(user: User) {
    // Open edit dialog or navigate to edit page
    const updatedUser = { ...user, name: user.name + ' (Updated)' };
    this.userStore.updateUserEffect(updatedUser);
  }
  
  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userStore.deleteUser(userId);
    }
  }
  
  addNewUser() {
    const newUser = {
      name: 'New User',
      email: 'new@example.com',
      role: 'user' as const
    };
    this.userStore.createUser(newUser);
  }
  
  onRoleFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const role = target.value || null;
    this.userStore.updateFilters({ role });
  }
  
  clearFilters() {
    this.userStore.clearFilters();
    this.searchControl.setValue('');
  }
  
  retry() {
    this.userStore.loadUsers();
  }
  
  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
```

**Testing Component Store:**
```typescript
// user-component.store.spec.ts
import { TestBed } from '@angular/core/testing';
import { UserComponentStore } from './user-component.store';
import { UserService } from '../services/user.service';
import { of, throwError } from 'rxjs';
import { User } from './user-component.store';

describe('UserComponentStore', () => {
  let store: UserComponentStore;
  let userService: jasmine.SpyObj<UserService>;
  
  const mockUsers: User[] = [
    { id: '1', name: 'John', email: 'john@example.com', role: 'user' },
    { id: '2', name: 'Jane', email: 'jane@example.com', role: 'admin' }
  ];
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', [
      'getUsers', 'createUser', 'updateUser', 'deleteUser'
    ]);
    
    TestBed.configureTestingModule({
      providers: [
        UserComponentStore,
        { provide: UserService, useValue: spy }
      ]
    });
    
    store = TestBed.inject(UserComponentStore);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });
  
  it('should initialize with default state', () => {
    expect(store.get()).toEqual({
      users: [],
      selectedUser: null,
      loading: false,
      error: null,
      filters: { search: '', role: null }
    });
  });
  
  it('should load users successfully', () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    
    store.loadUsers();
    
    expect(store.get().users).toEqual(mockUsers);
    expect(store.get().loading).toBe(false);
    expect(store.get().error).toBe(null);
  });
  
  it('should handle load users error', () => {
    const error = new Error('Failed to load');
    userService.getUsers.and.returnValue(throwError(error));
    
    store.loadUsers();
    
    expect(store.get().error).toBe('Failed to load');
    expect(store.get().loading).toBe(false);
  });
  
  it('should filter users by search term', () => {
    store.setUsers(mockUsers);
    store.updateFilters({ search: 'john' });
    
    store.filteredUsers$.subscribe(filtered => {
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('John');
    });
  });
  
  it('should filter users by role', () => {
    store.setUsers(mockUsers);
    store.updateFilters({ role: 'admin' });
    
    store.filteredUsers$.subscribe(filtered => {
      expect(filtered).toHaveLength(1);
      expect(filtered[0].role).toBe('admin');
    });
  });
});
```

**When to Use Component Store:**

1. **Component-specific state**: State that doesn't need to be shared across the application
2. **Form management**: Complex forms with local validation and state
3. **UI state**: Modal states, accordion states, tab selections
4. **Local caching**: Component-level data caching
5. **Temporary state**: State that should be cleaned up when component is destroyed
6. **Performance optimization**: Avoiding global state updates for local changes
7. **Micro-frontends**: Isolated state management for independent components
8. **Prototyping**: Quick state management without global store setup

**Benefits of Component Store:**

- **Reduced boilerplate**: No need for actions, reducers, or effects setup
- **Better performance**: Local state changes don't trigger global change detection
- **Easier testing**: Simpler test setup and isolation
- **Automatic cleanup**: State is automatically cleaned up when component is destroyed
- **Type safety**: Full TypeScript support with strong typing
- **Reactive patterns**: Built on RxJS for powerful reactive programming
- **Selective subscriptions**: Components can subscribe to specific state slices

Component Store is ideal for local state management while the global store handles application-wide state, providing a balanced approach to state management in Angular applications.

---

## NgRx Data

### Q12: What is NgRx Data and how does it simplify entity management?

**Answer:**
NgRx Data is an extension library that provides automated entity management for NgRx applications, reducing boilerplate code for common CRUD operations and entity state management.

**Key Features:**

1. **Automatic Entity Collections**: Pre-built reducers, actions, and effects for entities
2. **EntityDataService**: HTTP operations with caching and optimistic updates
3. **EntityMetadata**: Configuration for entity behavior and relationships
4. **EntityCollectionService**: Simplified API for component interaction
5. **Automatic Change Tracking**: Built-in dirty checking and change detection

**Setup and Configuration:**
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { entityConfig } from './entity-metadata';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig)
  ]
})
export class AppModule {}
```

**Entity Metadata Configuration:**
```typescript
// entity-metadata.ts
import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  User: {
    selectId: (user: User) => user.id,
    sortComparer: (a: User, b: User) => a.name.localeCompare(b.name),
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticUpdate: true,
      optimisticDelete: false
    }
  },
  Product: {
    selectId: (product: Product) => product.id,
    sortComparer: (a: Product, b: Product) => a.name.localeCompare(b.name),
    filterFn: (entities: Product[], pattern: string) => {
      return entities.filter(product => 
        product.name.toLowerCase().includes(pattern.toLowerCase()) ||
        product.category.toLowerCase().includes(pattern.toLowerCase())
      );
    }
  },
  Order: {
    selectId: (order: Order) => order.id,
    sortComparer: (a: Order, b: Order) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    additionalCollectionState: {
      selectedOrderId: null as string | null,
      orderFilters: {
        status: null as string | null,
        dateRange: null as { start: Date; end: Date } | null
      }
    }
  }
};

const pluralNames = {
  User: 'Users',
  Product: 'Products', 
  Order: 'Orders'
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
```

**Entity Models:**
```typescript
// models/user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  department: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// models/product.model.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  quantity: number;
  imageUrl: string;
  tags: string[];
}

// models/order.model.ts
export interface Order {
  id: string;
  userId: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

**Custom EntityDataService:**
```typescript
// services/user-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class UserDataService extends DefaultDataService<User> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('User', http, httpUrlGenerator);
  }

  // Override default getAll to add custom filtering
  override getAll(): Observable<User[]> {
    return this.http.get<{ users: User[]; total: number }>(`${this.entityUrl}?include=department`)
      .pipe(
        map(response => response.users),
        catchError(this.handleError)
      );
  }

  // Custom method for getting users by department
  getUsersByDepartment(department: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.entityUrl}?department=${department}`);
  }

  // Custom method for bulk operations
  bulkUpdate(users: Partial<User>[]): Observable<User[]> {
    return this.http.put<User[]>(`${this.entityUrl}/bulk`, { users });
  }

  // Override add to include custom validation
  override add(user: User): Observable<User> {
    const userWithDefaults = {
      ...user,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return super.add(userWithDefaults);
  }

  // Custom search method
  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.entityUrl}/search?q=${encodeURIComponent(query)}`);
  }
}
```

**EntityCollectionService Usage:**
```typescript
// services/user.service.ts
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserDataService } from './user-data.service';

@Injectable({ providedIn: 'root' })
export class UserService extends EntityCollectionServiceBase<User> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private userDataService: UserDataService
  ) {
    super('User', serviceElementsFactory);
  }

  // Custom selectors
  get activeUsers$(): Observable<User[]> {
    return this.filteredEntities$.pipe(
      map(users => users.filter(user => user.isActive))
    );
  }

  get usersByDepartment$(): Observable<{ [department: string]: User[] }> {
    return this.entities$.pipe(
      map(users => 
        users.reduce((acc, user) => {
          if (!acc[user.department]) {
            acc[user.department] = [];
          }
          acc[user.department].push(user);
          return acc;
        }, {} as { [department: string]: User[] })
      )
    );
  }

  get adminUsers$(): Observable<User[]> {
    return this.filteredEntities$.pipe(
      map(users => users.filter(user => user.role === 'admin'))
    );
  }

  // Custom actions
  loadUsersByDepartment(department: string): Observable<User[]> {
    return this.userDataService.getUsersByDepartment(department);
  }

  searchUsers(query: string): void {
    this.userDataService.searchUsers(query).subscribe(users => {
      this.setFilter(user => 
        users.some(searchUser => searchUser.id === user.id)
      );
    });
  }

  bulkUpdateUsers(updates: Partial<User>[]): Observable<User[]> {
    return this.userDataService.bulkUpdate(updates);
  }

  activateUser(userId: string): void {
    const user = this.getByKey(userId);
    if (user) {
      this.update({ ...user, isActive: true, updatedAt: new Date() });
    }
  }

  deactivateUser(userId: string): void {
    const user = this.getByKey(userId);
    if (user) {
      this.update({ ...user, isActive: false, updatedAt: new Date() });
    }
  }

  // Batch operations
  addMultipleUsers(users: User[]): void {
    users.forEach(user => this.add(user));
  }

  deleteMultipleUsers(userIds: string[]): void {
    userIds.forEach(id => this.delete(id));
  }
}
```

**Component Implementation:**
```typescript
// components/user-management.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-management',
  template: `
    <div class="user-management">
      <!-- Search and Filters -->
      <div class="controls">
        <input 
          type="text"
          placeholder="Search users..."
          [formControl]="searchControl"
          class="search-input"
        >
        
        <select [formControl]="departmentFilter" class="department-filter">
          <option value="">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Sales</option>
          <option value="hr">HR</option>
        </select>
        
        <button (click)="loadUsers()" class="refresh-btn">
          Refresh
        </button>
        
        <button (click)="openAddUserModal()" class="add-btn">
          Add User
        </button>
      </div>
      
      <!-- Loading State -->
      <div *ngIf="loading$ | async" class="loading">
        Loading users...
      </div>
      
      <!-- Error State -->
      <div *ngIf="userService.errors$ | async as errors" class="errors">
        <div *ngFor="let error of errors" class="error">
          {{ error.message }}
        </div>
      </div>
      
      <!-- User Statistics -->
      <div class="stats">
        <div class="stat">
          <span class="label">Total Users:</span>
          <span class="value">{{ (users$ | async)?.length || 0 }}</span>
        </div>
        <div class="stat">
          <span class="label">Active Users:</span>
          <span class="value">{{ (activeUsers$ | async)?.length || 0 }}</span>
        </div>
        <div class="stat">
          <span class="label">Admin Users:</span>
          <span class="value">{{ (adminUsers$ | async)?.length || 0 }}</span>
        </div>
      </div>
      
      <!-- User List -->
      <div class="user-grid">
        <div 
          *ngFor="let user of filteredUsers$ | async; trackBy: trackByUserId"
          class="user-card"
          [class.inactive]="!user.isActive"
        >
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
            <span class="department">{{ user.department }}</span>
            <span class="role" [class]="user.role">{{ user.role }}</span>
            <span class="status" [class.active]="user.isActive">
              {{ user.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
          
          <div class="user-actions">
            <button (click)="editUser(user)" class="edit-btn">
              Edit
            </button>
            <button 
              (click)="toggleUserStatus(user)"
              [class]="user.isActive ? 'deactivate-btn' : 'activate-btn'"
            >
              {{ user.isActive ? 'Deactivate' : 'Activate' }}
            </button>
            <button (click)="deleteUser(user.id)" class="delete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <!-- Add/Edit User Modal -->
      <div *ngIf="showModal" class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h2>{{ editingUser ? 'Edit User' : 'Add User' }}</h2>
          
          <form [formGroup]="userForm" (ngSubmit)="saveUser()">
            <div class="form-group">
              <label for="name">Name:</label>
              <input id="name" formControlName="name" type="text">
            </div>
            
            <div class="form-group">
              <label for="email">Email:</label>
              <input id="email" formControlName="email" type="email">
            </div>
            
            <div class="form-group">
              <label for="role">Role:</label>
              <select id="role" formControlName="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="department">Department:</label>
              <select id="department" formControlName="department">
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">HR</option>
              </select>
            </div>
            
            <div class="form-actions">
              <button type="button" (click)="closeModal()">Cancel</button>
              <button type="submit" [disabled]="userForm.invalid">
                {{ editingUser ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Observables
  users$ = this.userService.entities$;
  activeUsers$ = this.userService.activeUsers$;
  adminUsers$ = this.userService.adminUsers$;
  loading$ = this.userService.loading$;
  filteredUsers$ = this.userService.filteredEntities$;
  
  // Form controls
  searchControl = this.fb.control('');
  departmentFilter = this.fb.control('');
  userForm: FormGroup;
  
  // Modal state
  showModal = false;
  editingUser: User | null = null;
  
  constructor(
    public userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.createUserForm();
  }
  
  ngOnInit() {
    this.loadUsers();
    this.setupFilters();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private createUserForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required],
      department: ['engineering', Validators.required]
    });
  }
  
  private setupFilters() {
    // Search filter
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      if (searchTerm) {
        this.userService.searchUsers(searchTerm);
      } else {
        this.userService.clearFilter();
      }
    });
    
    // Department filter
    this.departmentFilter.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(department => {
      if (department) {
        this.userService.setFilter(user => user.department === department);
      } else {
        this.userService.clearFilter();
      }
    });
  }
  
  loadUsers() {
    this.userService.getAll();
  }
  
  openAddUserModal() {
    this.editingUser = null;
    this.userForm.reset({
      role: 'user',
      department: 'engineering'
    });
    this.showModal = true;
  }
  
  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue(user);
    this.showModal = true;
  }
  
  saveUser() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      
      if (this.editingUser) {
        this.userService.update({
          ...this.editingUser,
          ...userData,
          updatedAt: new Date()
        });
      } else {
        this.userService.add({
          id: this.generateId(),
          ...userData,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      this.closeModal();
    }
  }
  
  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(userId);
    }
  }
  
  toggleUserStatus(user: User) {
    if (user.isActive) {
      this.userService.deactivateUser(user.id);
    } else {
      this.userService.activateUser(user.id);
    }
  }
  
  closeModal() {
    this.showModal = false;
    this.editingUser = null;
    this.userForm.reset();
  }
  
  trackByUserId(index: number, user: User): string {
    return user.id;
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
```

**Benefits of NgRx Data:**

1. **Reduced Boilerplate**: Eliminates need for manual actions, reducers, and effects
2. **Automatic CRUD Operations**: Built-in create, read, update, delete functionality
3. **Optimistic Updates**: Immediate UI updates with automatic rollback on errors
4. **Caching**: Intelligent caching with configurable cache strategies
5. **Change Tracking**: Automatic dirty checking and change detection
6. **Relationship Management**: Support for entity relationships and foreign keys
7. **Customizable**: Extensible with custom data services and metadata
8. **Type Safety**: Full TypeScript support with strong typing

**When to Use NgRx Data:**

- Applications with many entity types requiring CRUD operations
- RESTful APIs with standard HTTP patterns
- Need for automatic caching and optimistic updates
- Want to reduce NgRx boilerplate code
- Require entity relationship management
- Building data-driven applications with complex entity interactions

NgRx Data significantly simplifies entity management while maintaining the benefits of NgRx's reactive state management pattern.

---

## NgRx Performance Optimization

### Q13: How do you optimize NgRx performance and prevent common performance issues?

**Answer:**
NgRx performance optimization involves strategic selector design, efficient state structure, proper subscription management, and leveraging Angular's change detection optimizations.

**1. Selector Optimization:**

```typescript
// selectors/user.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import { User } from '../models/user.model';

// Feature selector
export const selectUserState = createFeatureSelector<UserState>('users');

// Basic selectors
export const selectAllUsers = createSelector(
  selectUserState,
  state => state.users
);

export const selectUserLoading = createSelector(
  selectUserState,
  state => state.loading
);

// Memoized computed selectors
export const selectActiveUsers = createSelector(
  selectAllUsers,
  users => users.filter(user => user.isActive) // Only recomputes when users array changes
);

// Parameterized selectors with proper memoization
export const selectUsersByDepartment = createSelector(
  selectAllUsers,
  (users: User[], props: { department: string }) => 
    users.filter(user => user.department === props.department)
);

// Complex computed selectors
export const selectUserStatistics = createSelector(
  selectAllUsers,
  users => {
    const stats = {
      total: users.length,
      active: 0,
      inactive: 0,
      byDepartment: {} as Record<string, number>,
      byRole: {} as Record<string, number>
    };
    
    users.forEach(user => {
      if (user.isActive) stats.active++;
      else stats.inactive++;
      
      stats.byDepartment[user.department] = 
        (stats.byDepartment[user.department] || 0) + 1;
      
      stats.byRole[user.role] = 
        (stats.byRole[user.role] || 0) + 1;
    });
    
    return stats;
  }
);

// Avoid creating objects in selectors - use factory pattern
export const createUserSelectorFactory = () => {
  const selectUserById = createSelector(
    selectAllUsers,
    (users: User[], props: { id: string }) => 
      users.find(user => user.id === props.id)
  );
  
  return selectUserById;
};

// Efficient filtering with indexes
export const selectUserLookup = createSelector(
  selectAllUsers,
  users => users.reduce((lookup, user) => {
    lookup[user.id] = user;
    return lookup;
  }, {} as Record<string, User>)
);

export const selectUserByIdOptimized = createSelector(
  selectUserLookup,
  (lookup: Record<string, User>, props: { id: string }) => lookup[props.id]
);
```

**2. State Structure Optimization:**

```typescript
// reducers/optimized-user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user.model';
import * as UserActions from '../actions/user.actions';

// Use Entity Adapter for normalized state
export interface UserState extends EntityState<User> {
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
  filters: {
    department: string | null;
    role: string | null;
    search: string;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
  // Separate UI state from entity state
  ui: {
    showInactive: boolean;
    sortBy: 'name' | 'email' | 'department';
    sortDirection: 'asc' | 'desc';
  };
}

// Entity adapter with custom sorting
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: (a: User, b: User) => a.name.localeCompare(b.name)
});

export const initialState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
  filters: {
    department: null,
    role: null,
    search: ''
  },
  pagination: {
    currentPage: 1,
    pageSize: 20,
    totalItems: 0
  },
  ui: {
    showInactive: false,
    sortBy: 'name',
    sortDirection: 'asc'
  }
});

export const userReducer = createReducer(
  initialState,
  
  // Efficient bulk operations
  on(UserActions.loadUsersSuccess, (state, { users, totalItems }) => 
    userAdapter.setAll(users, {
      ...state,
      loading: false,
      error: null,
      pagination: {
        ...state.pagination,
        totalItems
      }
    })
  ),
  
  // Optimistic updates
  on(UserActions.addUser, (state, { user }) => 
    userAdapter.addOne(user, {
      ...state,
      // Don't set loading for optimistic updates
    })
  ),
  
  on(UserActions.updateUser, (state, { update }) => 
    userAdapter.updateOne(update, state)
  ),
  
  on(UserActions.deleteUser, (state, { id }) => 
    userAdapter.removeOne(id, state)
  ),
  
  // Separate UI state updates
  on(UserActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),
  
  on(UserActions.setUiState, (state, { ui }) => ({
    ...state,
    ui: { ...state.ui, ...ui }
  }))
);

// Export entity selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = userAdapter.getSelectors();
```

**3. Component Optimization:**

```typescript
// components/optimized-user-list.component.ts
import { 
  Component, 
  OnInit, 
  OnDestroy, 
  ChangeDetectionStrategy,
  TrackByFunction 
} from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { User } from '../models/user.model';
import * as UserSelectors from '../selectors/user.selectors';
import * as UserActions from '../actions/user.actions';

@Component({
  selector: 'app-optimized-user-list',
  template: `
    <div class="user-list">
      <!-- Virtual scrolling for large lists -->
      <cdk-virtual-scroll-viewport itemSize="80" class="user-viewport">
        <div 
          *cdkVirtualFor="let user of filteredUsers$ | async; trackBy: trackByUserId"
          class="user-item"
          [class.selected]="(selectedUserId$ | async) === user.id"
        >
          <app-user-card 
            [user]="user"
            [selected]="(selectedUserId$ | async) === user.id"
            (select)="selectUser(user.id)"
            (edit)="editUser(user)"
            (delete)="deleteUser(user.id)"
          ></app-user-card>
        </div>
      </cdk-virtual-scroll-viewport>
      
      <!-- Pagination -->
      <app-pagination
        [currentPage]="(pagination$ | async)?.currentPage || 1"
        [pageSize]="(pagination$ | async)?.pageSize || 20"
        [totalItems]="(pagination$ | async)?.totalItems || 0"
        (pageChange)="onPageChange($event)"
      ></app-pagination>
    </div>
  `,
  styleUrls: ['./optimized-user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Optimize change detection
})
export class OptimizedUserListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Optimized observables
  users$ = this.store.select(UserSelectors.selectAllUsers);
  selectedUserId$ = this.store.select(UserSelectors.selectSelectedUserId);
  loading$ = this.store.select(UserSelectors.selectUserLoading);
  pagination$ = this.store.select(UserSelectors.selectPagination);
  filters$ = this.store.select(UserSelectors.selectFilters);
  
  // Computed observables
  filteredUsers$ = combineLatest([
    this.users$,
    this.filters$,
    this.store.select(UserSelectors.selectUiState)
  ]).pipe(
    map(([users, filters, ui]) => this.filterAndSortUsers(users, filters, ui))
  );
  
  // Form controls with debouncing
  searchControl = new FormControl('');
  departmentControl = new FormControl('');
  
  constructor(private store: Store) {}
  
  ngOnInit() {
    this.setupFilters();
    this.loadUsers();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // Efficient TrackBy function
  trackByUserId: TrackByFunction<User> = (index: number, user: User) => user.id;
  
  private setupFilters() {
    // Debounced search
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(search => {
      this.store.dispatch(UserActions.setFilters({ filters: { search } }));
    });
    
    // Department filter
    this.departmentControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(department => {
      this.store.dispatch(UserActions.setFilters({ 
        filters: { department: department || null } 
      }));
    });
  }
  
  private filterAndSortUsers(
    users: User[], 
    filters: any, 
    ui: any
  ): User[] {
    let filtered = users;
    
    // Apply filters
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }
    
    if (filters.department) {
      filtered = filtered.filter(user => user.department === filters.department);
    }
    
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }
    
    if (!ui.showInactive) {
      filtered = filtered.filter(user => user.isActive);
    }
    
    // Apply sorting
    return this.sortUsers(filtered, ui.sortBy, ui.sortDirection);
  }
  
  private sortUsers(users: User[], sortBy: string, direction: 'asc' | 'desc'): User[] {
    return [...users].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'department':
          comparison = a.department.localeCompare(b.department);
          break;
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
  }
  
  loadUsers() {
    this.store.dispatch(UserActions.loadUsers());
  }
  
  selectUser(userId: string) {
    this.store.dispatch(UserActions.selectUser({ userId }));
  }
  
  editUser(user: User) {
    this.store.dispatch(UserActions.editUser({ user }));
  }
  
  deleteUser(userId: string) {
    this.store.dispatch(UserActions.deleteUser({ id: userId }));
  }
  
  onPageChange(page: number) {
    this.store.dispatch(UserActions.setPage({ page }));
  }
}
```

**4. Subscription Management:**

```typescript
// services/subscription-manager.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class SubscriptionManager implements OnDestroy {
  private destroy$ = new Subject<void>();
  private subscriptions = new Set<Subscription>();
  
  // Automatic cleanup with takeUntil
  takeUntilDestroy<T>(source$: Observable<T>): Observable<T> {
    return source$.pipe(takeUntil(this.destroy$));
  }
  
  // Manual subscription management
  add(subscription: Subscription): void {
    this.subscriptions.add(subscription);
  }
  
  // Cleanup
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.clear();
  }
}

// Usage in components
@Component({
  providers: [SubscriptionManager]
})
export class MyComponent {
  constructor(private subManager: SubscriptionManager) {}
  
  ngOnInit() {
    // Automatic cleanup
    this.subManager.takeUntilDestroy(this.someObservable$)
      .subscribe(data => {
        // Handle data
      });
    
    // Manual subscription
    const sub = this.anotherObservable$.subscribe();
    this.subManager.add(sub);
  }
}
```

**5. Effect Optimization:**

```typescript
// effects/optimized-user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, EMPTY } from 'rxjs';
import { 
  switchMap, 
  map, 
  catchError, 
  debounceTime, 
  distinctUntilChanged,
  withLatestFrom,
  filter,
  concatMap,
  mergeMap
} from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import * as UserSelectors from '../selectors/user.selectors';
import { UserService } from '../services/user.service';

@Injectable()
export class OptimizedUserEffects {
  
  // Debounced search effect
  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUsers),
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.query === curr.query),
      switchMap(({ query }) => {
        if (!query.trim()) {
          return of(UserActions.clearSearch());
        }
        
        return this.userService.searchUsers(query).pipe(
          map(users => UserActions.searchUsersSuccess({ users })),
          catchError(error => of(UserActions.searchUsersFailure({ error: error.message })))
        );
      })
    )
  );
  
  // Optimized load with caching
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      withLatestFrom(
        this.store.select(UserSelectors.selectAllUsers),
        this.store.select(UserSelectors.selectLastUpdated)
      ),
      filter(([action, users, lastUpdated]) => {
        // Skip if data is fresh (less than 5 minutes old)
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
        return !lastUpdated || lastUpdated < fiveMinutesAgo || users.length === 0;
      }),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );
  
  // Batch operations for better performance
  batchUserUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.batchUpdateUsers),
      concatMap(({ updates }) =>
        this.userService.batchUpdate(updates).pipe(
          map(users => UserActions.batchUpdateUsersSuccess({ users })),
          catchError(error => of(UserActions.batchUpdateUsersFailure({ error: error.message })))
        )
      )
    )
  );
  
  // Optimistic updates with rollback
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserOptimistic),
      mergeMap(({ user, originalUser }) =>
        this.userService.updateUser(user).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => {
            // Rollback on error
            return of(
              UserActions.updateUserFailure({ error: error.message }),
              UserActions.rollbackUserUpdate({ user: originalUser })
            );
          })
        )
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private store: Store,
    private userService: UserService
  ) {}
}
```

**6. Performance Monitoring:**

```typescript
// utils/performance-monitor.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, timestamp, pairwise } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PerformanceMonitor {
  private metrics = new Map<string, number[]>();
  
  constructor(private store: Store) {}
  
  // Monitor selector performance
  monitorSelector<T>(selectorName: string, selector$: Observable<T>) {
    return selector$.pipe(
      timestamp(),
      pairwise(),
      tap(([prev, curr]) => {
        const timeDiff = curr.timestamp - prev.timestamp;
        this.recordMetric(selectorName, timeDiff);
        
        if (timeDiff > 100) { // Log slow selectors
          console.warn(`Slow selector ${selectorName}: ${timeDiff}ms`);
        }
      }),
      map(([prev, curr]) => curr.value)
    );
  }
  
  // Monitor action dispatch performance
  monitorAction(actionType: string) {
    const startTime = performance.now();
    
    return {
      complete: () => {
        const duration = performance.now() - startTime;
        this.recordMetric(`action_${actionType}`, duration);
        
        if (duration > 50) {
          console.warn(`Slow action ${actionType}: ${duration}ms`);
        }
      }
    };
  }
  
  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }
  
  getMetrics() {
    const report = new Map<string, any>();
    
    this.metrics.forEach((values, name) => {
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const max = Math.max(...values);
      const min = Math.min(...values);
      
      report.set(name, { avg, max, min, count: values.length });
    });
    
    return report;
  }
}
```

**Performance Best Practices:**

1. **Use OnPush Change Detection**: Reduces unnecessary change detection cycles
2. **Implement TrackBy Functions**: Optimizes *ngFor rendering
3. **Leverage Virtual Scrolling**: For large lists
4. **Normalize State Structure**: Use Entity adapters for flat, normalized state
5. **Memoize Selectors**: Prevent unnecessary recomputations
6. **Debounce User Input**: Reduce action dispatching frequency
7. **Use Lazy Loading**: Load features and state on demand
8. **Implement Pagination**: Limit data loaded at once
9. **Cache API Responses**: Avoid redundant HTTP requests
10. **Monitor Performance**: Track selector and action performance

These optimizations ensure NgRx applications remain performant even with complex state management requirements.

---

## NgRx Advanced Patterns

### Q14: What are advanced NgRx patterns for complex state management scenarios?

**Answer:**
Advanced NgRx patterns help manage complex state scenarios including feature composition, dynamic state, cross-feature communication, and sophisticated data flows.

**1. Feature State Composition:**

```typescript
// state/app.state.ts
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/state/auth.reducer';
import * as fromUser from '../user/state/user.reducer';
import * as fromProduct from '../product/state/product.reducer';
import * as fromCart from '../cart/state/cart.reducer';
import * as fromOrder from '../order/state/order.reducer';

// Root state interface
export interface AppState {
  auth: fromAuth.AuthState;
  user: fromUser.UserState;
  product: fromProduct.ProductState;
  cart: fromCart.CartState;
  order: fromOrder.OrderState;
}

// Root reducers
export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
  product: fromProduct.productReducer,
  cart: fromCart.cartReducer,
  order: fromOrder.orderReducer
};

// Meta reducers for cross-cutting concerns
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [hydrationMetaReducer];

// Logger meta reducer
function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

// Hydration meta reducer for persistence
function hydrationMetaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    if (action.type === '@ngrx/store/init') {
      const storageValue = localStorage.getItem('appState');
      if (storageValue) {
        try {
          const parsedState = JSON.parse(storageValue);
          return { ...state, ...parsedState };
        } catch {
          localStorage.removeItem('appState');
        }
      }
    }
    
    const nextState = reducer(state, action);
    
    // Persist specific slices
    const persistedState = {
      auth: nextState.auth,
      user: { ...nextState.user, selectedUser: null }, // Exclude UI state
      cart: nextState.cart
    };
    
    localStorage.setItem('appState', JSON.stringify(persistedState));
    return nextState;
  };
}
```

**2. Dynamic Feature Loading:**

```typescript
// services/dynamic-feature.service.ts
import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface FeatureConfig {
  name: string;
  reducerKey: string;
  effectsClass?: any;
  initialState?: any;
}

@Injectable({ providedIn: 'root' })
export class DynamicFeatureService {
  private loadedFeatures = new Set<string>();
  
  constructor(
    private store: Store,
    private injector: Injector
  ) {}
  
  loadFeature(config: FeatureConfig): Observable<boolean> {
    if (this.loadedFeatures.has(config.name)) {
      return of(true);
    }
    
    return this.loadFeatureModule(config.name).pipe(
      switchMap(module => {
        // Register reducer
        this.store.addReducer(config.reducerKey, module.reducer, config.initialState);
        
        // Register effects if provided
        if (config.effectsClass && module.effects) {
          const effects = this.injector.get(module.effects);
          this.store.dispatch({ type: '@ngrx/effects/init', effects });
        }
        
        this.loadedFeatures.add(config.name);
        return of(true);
      }),
      catchError(error => {
        console.error(`Failed to load feature ${config.name}:`, error);
        return of(false);
      })
    );
  }
  
  private loadFeatureModule(featureName: string): Observable<any> {
    // Dynamic import based on feature name
    switch (featureName) {
      case 'analytics':
        return import('../analytics/analytics.module').then(m => m.AnalyticsModule);
      case 'reporting':
        return import('../reporting/reporting.module').then(m => m.ReportingModule);
      default:
        throw new Error(`Unknown feature: ${featureName}`);
    }
  }
  
  unloadFeature(featureName: string, reducerKey: string): void {
    if (this.loadedFeatures.has(featureName)) {
      this.store.removeReducer(reducerKey);
      this.loadedFeatures.delete(featureName);
    }
  }
}

// Usage in route guards
@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(private dynamicFeature: DynamicFeatureService) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const featureName = route.data['feature'];
    const config: FeatureConfig = {
      name: featureName,
      reducerKey: featureName,
      effectsClass: route.data['effects']
    };
    
    return this.dynamicFeature.loadFeature(config);
  }
}
```

**3. Cross-Feature Communication:**

```typescript
// patterns/cross-feature-communication.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, withLatestFrom, filter, switchMap } from 'rxjs/operators';
import * as AuthActions from '../auth/state/auth.actions';
import * as UserActions from '../user/state/user.actions';
import * as CartActions from '../cart/state/cart.actions';
import * as NotificationActions from '../notification/state/notification.actions';

// Global event bus for cross-feature communication
export const GlobalEvents = {
  userLoggedIn: '[Global] User Logged In',
  userLoggedOut: '[Global] User Logged Out',
  orderCompleted: '[Global] Order Completed',
  paymentProcessed: '[Global] Payment Processed'
};

// Cross-feature effects
@Injectable()
export class CrossFeatureEffects {
  
  // When user logs in, load their profile and cart
  userLoggedIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(({ user }) => ({
        type: GlobalEvents.userLoggedIn,
        payload: { userId: user.id, user }
      }))
    )
  );
  
  // Load user data after login
  loadUserDataOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType({ type: GlobalEvents.userLoggedIn }),
      switchMap(({ payload }) => [
        UserActions.loadUserProfile({ userId: payload.userId }),
        CartActions.loadCart({ userId: payload.userId })
      ])
    )
  );
  
  // Clear data on logout
  userLoggedOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => ({ type: GlobalEvents.userLoggedOut }))
    )
  );
  
  clearDataOnLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType({ type: GlobalEvents.userLoggedOut }),
      switchMap(() => [
        UserActions.clearUserData(),
        CartActions.clearCart(),
        NotificationActions.clearNotifications()
      ])
    )
  );
  
  // Order completion workflow
  orderCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrderSuccess),
      withLatestFrom(this.store.select(selectCurrentUser)),
      filter(([action, user]) => !!user),
      switchMap(([{ order }, user]) => [
        CartActions.clearCart(),
        NotificationActions.showSuccess({
          message: `Order #${order.id} completed successfully!`
        }),
        UserActions.updateUserStats({
          userId: user.id,
          stats: { totalOrders: user.stats.totalOrders + 1 }
        }),
        { type: GlobalEvents.orderCompleted, payload: { order, user } }
      ])
    )
  );
  
  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}
```

**4. State Synchronization Patterns:**

```typescript
// patterns/state-synchronization.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, merge } from 'rxjs';
import { map, distinctUntilChanged, filter, debounceTime } from 'rxjs/operators';

// Derived state pattern
@Injectable({ providedIn: 'root' })
export class DerivedStateService {
  
  // Compute cart summary from cart items and products
  cartSummary$ = combineLatest([
    this.store.select(selectCartItems),
    this.store.select(selectProductEntities),
    this.store.select(selectTaxRate),
    this.store.select(selectShippingCost)
  ]).pipe(
    map(([cartItems, products, taxRate, shippingCost]) => {
      const subtotal = cartItems.reduce((sum, item) => {
        const product = products[item.productId];
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);
      
      const tax = subtotal * taxRate;
      const total = subtotal + tax + shippingCost;
      
      return {
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        shippingCost,
        total,
        items: cartItems.map(item => ({
          ...item,
          product: products[item.productId],
          lineTotal: products[item.productId] ? 
            products[item.productId].price * item.quantity : 0
        }))
      };
    }),
    distinctUntilChanged((prev, curr) => 
      JSON.stringify(prev) === JSON.stringify(curr)
    )
  );
  
  // User dashboard data aggregation
  userDashboard$ = combineLatest([
    this.store.select(selectCurrentUser),
    this.store.select(selectUserOrders),
    this.store.select(selectUserWishlist),
    this.store.select(selectUserReviews),
    this.store.select(selectUserRewards)
  ]).pipe(
    filter(([user]) => !!user),
    map(([user, orders, wishlist, reviews, rewards]) => ({
      user,
      stats: {
        totalOrders: orders.length,
        totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
        wishlistItems: wishlist.length,
        reviewsWritten: reviews.length,
        rewardPoints: rewards.totalPoints,
        memberSince: user.createdAt
      },
      recentActivity: [
        ...orders.slice(0, 3).map(order => ({
          type: 'order',
          date: order.createdAt,
          description: `Order #${order.id} - $${order.total}`
        })),
        ...reviews.slice(0, 2).map(review => ({
          type: 'review',
          date: review.createdAt,
          description: `Reviewed ${review.productName}`
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }))
  );
  
  constructor(private store: Store) {}
}
```

**5. Advanced Effect Patterns:**

```typescript
// effects/advanced-patterns.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer, EMPTY, race } from 'rxjs';
import { 
  switchMap, 
  map, 
  catchError, 
  withLatestFrom,
  takeUntil,
  retry,
  retryWhen,
  delay,
  concatMap,
  mergeMap,
  exhaustMap,
  bufferTime,
  filter
} from 'rxjs/operators';

@Injectable()
export class AdvancedEffects {
  
  // Retry with exponential backoff
  loadDataWithRetry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.loadData),
      switchMap(({ id }) =>
        this.dataService.getData(id).pipe(
          map(data => DataActions.loadDataSuccess({ data })),
          retryWhen(errors =>
            errors.pipe(
              concatMap((error, index) => {
                if (index >= 3) {
                  return throwError(error);
                }
                const delayTime = Math.pow(2, index) * 1000; // Exponential backoff
                return timer(delayTime);
              })
            )
          ),
          catchError(error => of(DataActions.loadDataFailure({ error: error.message })))
        )
      )
    )
  );
  
  // Timeout pattern
  loadWithTimeout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.loadWithTimeout),
      switchMap(({ id, timeout = 5000 }) =>
        race([
          this.dataService.getData(id).pipe(
            map(data => DataActions.loadDataSuccess({ data }))
          ),
          timer(timeout).pipe(
            map(() => DataActions.loadDataTimeout())
          )
        ]).pipe(
          catchError(error => of(DataActions.loadDataFailure({ error: error.message })))
        )
      )
    )
  );
  
  // Batch operations
  batchUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.queueUpdate),
      bufferTime(1000), // Collect updates for 1 second
      filter(actions => actions.length > 0),
      switchMap(actions => {
        const updates = actions.map(action => action.update);
        return this.dataService.batchUpdate(updates).pipe(
          map(results => DataActions.batchUpdateSuccess({ results })),
          catchError(error => of(DataActions.batchUpdateFailure({ error: error.message })))
        );
      })
    )
  );
  
  // Cancellable operations
  cancellableOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.startOperation),
      switchMap(({ operationId }) =>
        this.dataService.longRunningOperation(operationId).pipe(
          map(result => DataActions.operationSuccess({ result })),
          takeUntil(
            this.actions$.pipe(
              ofType(DataActions.cancelOperation),
              filter(action => action.operationId === operationId)
            )
          ),
          catchError(error => of(DataActions.operationFailure({ error: error.message })))
        )
      )
    )
  );
  
  // Conditional effects based on state
  conditionalLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.conditionalLoad),
      withLatestFrom(
        this.store.select(selectDataCache),
        this.store.select(selectUserPermissions)
      ),
      filter(([action, cache, permissions]) => {
        // Only proceed if user has permission and data is not cached
        return permissions.canRead && !cache[action.id];
      }),
      switchMap(([{ id }]) =>
        this.dataService.getData(id).pipe(
          map(data => DataActions.loadDataSuccess({ data })),
          catchError(error => of(DataActions.loadDataFailure({ error: error.message })))
        )
      )
    )
  );
  
  // Optimistic updates with rollback
  optimisticUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.optimisticUpdate),
      concatMap(({ id, update, originalData }) =>
        this.dataService.updateData(id, update).pipe(
          map(updatedData => DataActions.updateSuccess({ data: updatedData })),
          catchError(error => of(
            DataActions.updateFailure({ error: error.message }),
            DataActions.rollbackUpdate({ id, data: originalData })
          ))
        )
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private store: Store,
    private dataService: DataService
  ) {}
}
```

**6. State Machine Pattern:**

```typescript
// patterns/state-machine.ts
import { createReducer, on } from '@ngrx/store';

// Define states and transitions
export enum OrderState {
  DRAFT = 'draft',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export interface OrderStateMachine {
  currentState: OrderState;
  allowedTransitions: OrderState[];
  history: { state: OrderState; timestamp: Date; reason?: string }[];
}

// State transition rules
const stateTransitions: Record<OrderState, OrderState[]> = {
  [OrderState.DRAFT]: [OrderState.PENDING, OrderState.CANCELLED],
  [OrderState.PENDING]: [OrderState.CONFIRMED, OrderState.CANCELLED],
  [OrderState.CONFIRMED]: [OrderState.PROCESSING, OrderState.CANCELLED],
  [OrderState.PROCESSING]: [OrderState.SHIPPED, OrderState.CANCELLED],
  [OrderState.SHIPPED]: [OrderState.DELIVERED],
  [OrderState.DELIVERED]: [OrderState.REFUNDED],
  [OrderState.CANCELLED]: [],
  [OrderState.REFUNDED]: []
};

// State machine reducer
export const orderStateMachineReducer = createReducer(
  {
    currentState: OrderState.DRAFT,
    allowedTransitions: stateTransitions[OrderState.DRAFT],
    history: []
  } as OrderStateMachine,
  
  on(OrderActions.transitionState, (state, { newState, reason }) => {
    // Validate transition
    if (!state.allowedTransitions.includes(newState)) {
      console.error(`Invalid transition from ${state.currentState} to ${newState}`);
      return state;
    }
    
    return {
      currentState: newState,
      allowedTransitions: stateTransitions[newState],
      history: [
        ...state.history,
        {
          state: newState,
          timestamp: new Date(),
          reason
        }
      ]
    };
  })
);
```

These advanced patterns enable sophisticated state management for complex applications while maintaining clean architecture and predictable data flow.

---

## NgRx Error Handling and Resilience

### Q15: How do you implement comprehensive error handling and resilience patterns in NgRx?

**Answer:**
Robust error handling in NgRx involves multiple layers of error management, graceful degradation, retry mechanisms, and user-friendly error reporting.

**1. Centralized Error State Management:**

```typescript
// state/error.state.ts
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface AppError {
  id: string;
  type: 'network' | 'validation' | 'business' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details?: any;
  timestamp: Date;
  source: string; // Which feature/component caused the error
  userMessage?: string; // User-friendly message
  retryable: boolean;
  retryCount: number;
  maxRetries: number;
  resolved: boolean;
}

export interface ErrorState extends EntityState<AppError> {
  globalError: AppError | null;
  networkStatus: 'online' | 'offline' | 'slow';
  errorCounts: Record<string, number>;
  suppressedErrors: string[]; // Error types to suppress
}

export const errorAdapter: EntityAdapter<AppError> = createEntityAdapter<AppError>({
  selectId: (error: AppError) => error.id,
  sortComparer: (a: AppError, b: AppError) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
});

export const initialErrorState: ErrorState = errorAdapter.getInitialState({
  globalError: null,
  networkStatus: 'online',
  errorCounts: {},
  suppressedErrors: []
});

export const errorReducer = createReducer(
  initialErrorState,
  
  on(ErrorActions.addError, (state, { error }) => {
    const errorWithId = {
      ...error,
      id: error.id || generateErrorId(),
      timestamp: new Date(),
      retryCount: 0,
      resolved: false
    };
    
    return errorAdapter.addOne(errorWithId, {
      ...state,
      globalError: error.severity === 'critical' ? errorWithId : state.globalError,
      errorCounts: {
        ...state.errorCounts,
        [error.type]: (state.errorCounts[error.type] || 0) + 1
      }
    });
  }),
  
  on(ErrorActions.resolveError, (state, { errorId }) => 
    errorAdapter.updateOne(
      { id: errorId, changes: { resolved: true } },
      { ...state, globalError: state.globalError?.id === errorId ? null : state.globalError }
    )
  ),
  
  on(ErrorActions.retryError, (state, { errorId }) => 
    errorAdapter.updateOne(
      { id: errorId, changes: { retryCount: state.entities[errorId]!.retryCount + 1 } },
      state
    )
  ),
  
  on(ErrorActions.clearErrors, (state) => 
    errorAdapter.removeAll({ ...state, globalError: null, errorCounts: {} })
  ),
  
  on(ErrorActions.setNetworkStatus, (state, { status }) => ({
    ...state,
    networkStatus: status
  })),
  
  on(ErrorActions.suppressErrorType, (state, { errorType }) => ({
    ...state,
    suppressedErrors: [...state.suppressedErrors, errorType]
  }))
);

function generateErrorId(): string {
  return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
```

**2. Error Actions and Selectors:**

```typescript
// actions/error.actions.ts
import { createAction, props } from '@ngrx/store';
import { AppError } from '../state/error.state';

export const addError = createAction(
  '[Error] Add Error',
  props<{ error: Partial<AppError> }>()
);

export const resolveError = createAction(
  '[Error] Resolve Error',
  props<{ errorId: string }>()
);

export const retryError = createAction(
  '[Error] Retry Error',
  props<{ errorId: string }>()
);

export const clearErrors = createAction('[Error] Clear All Errors');

export const setNetworkStatus = createAction(
  '[Error] Set Network Status',
  props<{ status: 'online' | 'offline' | 'slow' }>()
);

export const suppressErrorType = createAction(
  '[Error] Suppress Error Type',
  props<{ errorType: string }>()
);

// selectors/error.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorState, errorAdapter } from '../state/error.state';

export const selectErrorState = createFeatureSelector<ErrorState>('errors');

export const {
  selectIds: selectErrorIds,
  selectEntities: selectErrorEntities,
  selectAll: selectAllErrors,
  selectTotal: selectTotalErrors
} = errorAdapter.getSelectors(selectErrorState);

export const selectGlobalError = createSelector(
  selectErrorState,
  state => state.globalError
);

export const selectNetworkStatus = createSelector(
  selectErrorState,
  state => state.networkStatus
);

export const selectUnresolvedErrors = createSelector(
  selectAllErrors,
  errors => errors.filter(error => !error.resolved)
);

export const selectErrorsByType = createSelector(
  selectAllErrors,
  (errors, props: { type: string }) => 
    errors.filter(error => error.type === props.type)
);

export const selectRetryableErrors = createSelector(
  selectUnresolvedErrors,
  errors => errors.filter(error => 
    error.retryable && error.retryCount < error.maxRetries
  )
);

export const selectErrorCounts = createSelector(
  selectErrorState,
  state => state.errorCounts
);
```

**3. Error Handling Effects:**

```typescript
// effects/error.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer, EMPTY } from 'rxjs';
import { 
  catchError, 
  map, 
  switchMap, 
  withLatestFrom,
  filter,
  delay,
  retryWhen,
  concatMap,
  tap
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as ErrorActions from '../actions/error.actions';
import * as ErrorSelectors from '../selectors/error.selectors';
import { NotificationService } from '../services/notification.service';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class ErrorEffects {
  
  // Handle global errors
  handleGlobalError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ErrorActions.addError),
      withLatestFrom(this.store.select(ErrorSelectors.selectErrorState)),
      filter(([{ error }, errorState]) => 
        !errorState.suppressedErrors.includes(error.type!)
      ),
      tap(([{ error }]) => {
        // Log error
        this.loggingService.logError(error);
        
        // Show user notification based on severity
        switch (error.severity) {
          case 'critical':
            this.notificationService.showError(
              error.userMessage || 'A critical error occurred. Please contact support.',
              { duration: 0, action: 'Retry' }
            );
            break;
          case 'high':
            this.notificationService.showError(
              error.userMessage || 'An error occurred. Please try again.',
              { duration: 8000, action: 'Dismiss' }
            );
            break;
          case 'medium':
            this.notificationService.showWarning(
              error.userMessage || 'Something went wrong.',
              { duration: 5000 }
            );
            break;
          case 'low':
            // Silent logging only
            break;
        }
      })
    ),
    { dispatch: false }
  );
  
  // Auto-retry retryable errors
  autoRetryErrors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ErrorActions.addError),
      filter(({ error }) => error.retryable && error.retryCount! < error.maxRetries!),
      delay(this.calculateRetryDelay),
      map(({ error }) => ErrorActions.retryError({ errorId: error.id! }))
    )
  );
  
  // Network status monitoring
  monitorNetworkStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType('@ngrx/store/init'),
      switchMap(() => {
        // Monitor online/offline status
        const online$ = fromEvent(window, 'online').pipe(
          map(() => ErrorActions.setNetworkStatus({ status: 'online' }))
        );
        
        const offline$ = fromEvent(window, 'offline').pipe(
          map(() => ErrorActions.setNetworkStatus({ status: 'offline' }))
        );
        
        return merge(online$, offline$);
      })
    )
  );
  
  // Clear resolved errors periodically
  cleanupResolvedErrors$ = createEffect(() =>
    timer(0, 300000).pipe( // Every 5 minutes
      withLatestFrom(this.store.select(ErrorSelectors.selectAllErrors)),
      filter(([, errors]) => errors.some(error => error.resolved)),
      switchMap(([, errors]) => {
        const oldResolvedErrors = errors.filter(error => 
          error.resolved && 
          new Date().getTime() - error.timestamp.getTime() > 600000 // 10 minutes old
        );
        
        return oldResolvedErrors.map(error => 
          ErrorActions.resolveError({ errorId: error.id })
        );
      })
    )
  );
  
  constructor(
    private actions$: Actions,
    private store: Store,
    private notificationService: NotificationService,
    private loggingService: LoggingService
  ) {}
  
  private calculateRetryDelay(action: any): number {
    const baseDelay = 1000;
    const maxDelay = 30000;
    const retryCount = action.error.retryCount || 0;
    
    // Exponential backoff with jitter
    const exponentialDelay = Math.min(baseDelay * Math.pow(2, retryCount), maxDelay);
    const jitter = Math.random() * 1000;
    
    return exponentialDelay + jitter;
  }
}
```

**4. HTTP Error Interceptor:**

```typescript
// interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, retryWhen, delay, concatMap } from 'rxjs/operators';
import * as ErrorActions from '../state/actions/error.actions';
import { AppError } from '../state/error.state';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(private store: Store) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen(errors => 
        errors.pipe(
          concatMap((error, index) => {
            if (this.shouldRetry(error, index)) {
              const delayTime = this.calculateRetryDelay(index);
              return of(error).pipe(delay(delayTime));
            }
            return throwError(error);
          })
        )
      ),
      catchError((error: HttpErrorResponse) => {
        const appError = this.mapHttpErrorToAppError(error, req);
        this.store.dispatch(ErrorActions.addError({ error: appError }));
        
        // Return a user-friendly error or empty response based on context
        if (this.isNonCriticalRequest(req)) {
          return of(this.createFallbackResponse(req));
        }
        
        return throwError(error);
      })
    );
  }
  
  private shouldRetry(error: HttpErrorResponse, attemptIndex: number): boolean {
    const maxRetries = 3;
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    
    return attemptIndex < maxRetries && 
           retryableStatuses.includes(error.status);
  }
  
  private calculateRetryDelay(attemptIndex: number): number {
    return Math.min(1000 * Math.pow(2, attemptIndex), 10000);
  }
  
  private mapHttpErrorToAppError(error: HttpErrorResponse, req: HttpRequest<any>): Partial<AppError> {
    let errorType: AppError['type'] = 'network';
    let severity: AppError['severity'] = 'medium';
    let userMessage = 'An error occurred. Please try again.';
    let retryable = false;
    
    switch (error.status) {
      case 0:
        errorType = 'network';
        severity = 'high';
        userMessage = 'Network connection failed. Please check your internet connection.';
        retryable = true;
        break;
      case 400:
        errorType = 'validation';
        severity = 'medium';
        userMessage = 'Invalid request. Please check your input.';
        break;
      case 401:
        errorType = 'business';
        severity = 'high';
        userMessage = 'Authentication required. Please log in.';
        break;
      case 403:
        errorType = 'business';
        severity = 'medium';
        userMessage = 'Access denied. You don\'t have permission for this action.';
        break;
      case 404:
        errorType = 'business';
        severity = 'low';
        userMessage = 'The requested resource was not found.';
        break;
      case 408:
      case 429:
      case 500:
      case 502:
      case 503:
      case 504:
        errorType = 'network';
        severity = 'high';
        userMessage = 'Server error. Please try again in a moment.';
        retryable = true;
        break;
      default:
        errorType = 'system';
        severity = 'medium';
    }
    
    return {
      type: errorType,
      severity,
      message: error.message,
      details: {
        status: error.status,
        statusText: error.statusText,
        url: req.url,
        method: req.method,
        body: error.error
      },
      source: this.extractSourceFromUrl(req.url),
      userMessage,
      retryable,
      maxRetries: retryable ? 3 : 0
    };
  }
  
  private isNonCriticalRequest(req: HttpRequest<any>): boolean {
    const nonCriticalEndpoints = ['/api/analytics', '/api/tracking', '/api/suggestions'];
    return nonCriticalEndpoints.some(endpoint => req.url.includes(endpoint));
  }
  
  private createFallbackResponse(req: HttpRequest<any>): any {
    // Return appropriate fallback data based on request
    if (req.url.includes('/api/suggestions')) {
      return { suggestions: [] };
    }
    if (req.url.includes('/api/analytics')) {
      return { data: null, cached: true };
    }
    return null;
  }
  
  private extractSourceFromUrl(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2] || 'unknown';
  }
}
```

**5. Error Boundary Component:**

```typescript
// components/error-boundary.component.ts
import { 
  Component, 
  Input, 
  OnInit, 
  OnDestroy, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import * as ErrorSelectors from '../selectors/error.selectors';
import * as ErrorActions from '../actions/error.actions';
import { AppError } from '../state/error.state';

@Component({
  selector: 'app-error-boundary',
  template: `
    <div class="error-boundary" *ngIf="hasErrors$ | async">
      <div class="error-container">
        <div class="error-header">
          <mat-icon class="error-icon">error_outline</mat-icon>
          <h3>{{ getErrorTitle() }}</h3>
        </div>
        
        <div class="error-content">
          <p>{{ getErrorMessage() }}</p>
          
          <div class="error-actions">
            <button 
              mat-raised-button 
              color="primary"
              *ngIf="canRetry()"
              (click)="retryOperation()"
              [disabled]="retrying"
            >
              <mat-icon *ngIf="retrying">refresh</mat-icon>
              {{ retrying ? 'Retrying...' : 'Retry' }}
            </button>
            
            <button 
              mat-button
              (click)="dismissError()"
            >
              Dismiss
            </button>
            
            <button 
              mat-button
              *ngIf="showDetails"
              (click)="toggleDetails()"
            >
              {{ showingDetails ? 'Hide' : 'Show' }} Details
            </button>
          </div>
          
          <div class="error-details" *ngIf="showingDetails">
            <pre>{{ getErrorDetails() | json }}</pre>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Fallback content when there are errors -->
    <div class="fallback-content" *ngIf="showFallback && (hasErrors$ | async)">
      <ng-content select="[slot=fallback]"></ng-content>
    </div>
    
    <!-- Normal content when no errors -->
    <div class="normal-content" *ngIf="!(hasErrors$ | async)">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./error-boundary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorBoundaryComponent implements OnInit, OnDestroy {
  @Input() errorTypes: string[] = [];
  @Input() showFallback = false;
  @Input() showDetails = false;
  @Input() autoRetry = true;
  
  private destroy$ = new Subject<void>();
  
  hasErrors$: Observable<boolean>;
  currentError$: Observable<AppError | null>;
  
  retrying = false;
  showingDetails = false;
  
  constructor(private store: Store) {
    this.hasErrors$ = this.store.select(ErrorSelectors.selectUnresolvedErrors).pipe(
      map(errors => this.filterRelevantErrors(errors).length > 0)
    );
    
    this.currentError$ = this.store.select(ErrorSelectors.selectUnresolvedErrors).pipe(
      map(errors => {
        const relevantErrors = this.filterRelevantErrors(errors);
        return relevantErrors.length > 0 ? relevantErrors[0] : null;
      })
    );
  }
  
  ngOnInit() {
    if (this.autoRetry) {
      this.setupAutoRetry();
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private filterRelevantErrors(errors: AppError[]): AppError[] {
    if (this.errorTypes.length === 0) {
      return errors;
    }
    return errors.filter(error => this.errorTypes.includes(error.type));
  }
  
  private setupAutoRetry() {
    this.store.select(ErrorSelectors.selectRetryableErrors).pipe(
      filter(errors => errors.length > 0),
      takeUntil(this.destroy$)
    ).subscribe(errors => {
      const error = errors[0];
      if (error.retryCount < error.maxRetries) {
        setTimeout(() => {
          this.store.dispatch(ErrorActions.retryError({ errorId: error.id }));
        }, this.calculateRetryDelay(error.retryCount));
      }
    });
  }
  
  private calculateRetryDelay(retryCount: number): number {
    return Math.min(1000 * Math.pow(2, retryCount), 10000);
  }
  
  getErrorTitle(): string {
    // Implementation to get appropriate error title
    return 'Something went wrong';
  }
  
  getErrorMessage(): string {
    // Implementation to get user-friendly error message
    return 'We encountered an issue. Please try again.';
  }
  
  getErrorDetails(): any {
    // Implementation to get error details for debugging
    return {};
  }
  
  canRetry(): boolean {
    // Implementation to check if retry is possible
    return true;
  }
  
  retryOperation() {
    this.retrying = true;
    // Implementation to retry the failed operation
    setTimeout(() => {
      this.retrying = false;
    }, 2000);
  }
  
  dismissError() {
    // Implementation to dismiss the current error
  }
  
  toggleDetails() {
    this.showingDetails = !this.showingDetails;
  }
}
```

**6. Resilience Service:**

```typescript
// services/resilience.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError, timer } from 'rxjs';
import { 
  catchError, 
  retry, 
  retryWhen, 
  delay, 
  concatMap, 
  switchMap,
  timeout,
  map
} from 'rxjs/operators';
import * as ErrorActions from '../actions/error.actions';

export interface ResilienceConfig {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  fallbackValue?: any;
  circuitBreakerThreshold?: number;
}

@Injectable({ providedIn: 'root' })
export class ResilienceService {
  private circuitBreakers = new Map<string, CircuitBreaker>();
  
  constructor(private store: Store) {}
  
  // Wrap operations with resilience patterns
  withResilience<T>(
    operation: () => Observable<T>,
    config: ResilienceConfig = {},
    operationId?: string
  ): Observable<T> {
    const {
      maxRetries = 3,
      retryDelay = 1000,
      timeout: timeoutMs = 10000,
      fallbackValue,
      circuitBreakerThreshold = 5
    } = config;
    
    // Check circuit breaker
    if (operationId && this.isCircuitOpen(operationId)) {
      return fallbackValue !== undefined 
        ? of(fallbackValue)
        : throwError(new Error('Circuit breaker is open'));
    }
    
    return operation().pipe(
      timeout(timeoutMs),
      retryWhen(errors => 
        errors.pipe(
          concatMap((error, index) => {
            if (index >= maxRetries) {
              // Record failure for circuit breaker
              if (operationId) {
                this.recordFailure(operationId);
              }
              return throwError(error);
            }
            
            const delayTime = retryDelay * Math.pow(2, index);
            return timer(delayTime);
          })
        )
      ),
      catchError(error => {
        // Log error to store
        this.store.dispatch(ErrorActions.addError({
          error: {
            type: 'system',
            severity: 'high',
            message: error.message,
            source: operationId || 'unknown',
            retryable: true,
            maxRetries
          }
        }));
        
        // Return fallback if available
        if (fallbackValue !== undefined) {
          return of(fallbackValue);
        }
        
        return throwError(error);
      }),
      map(result => {
        // Record success for circuit breaker
        if (operationId) {
          this.recordSuccess(operationId);
        }
        return result;
      })
    );
  }
  
  private isCircuitOpen(operationId: string): boolean {
    const breaker = this.circuitBreakers.get(operationId);
    return breaker ? breaker.isOpen() : false;
  }
  
  private recordFailure(operationId: string) {
    let breaker = this.circuitBreakers.get(operationId);
    if (!breaker) {
      breaker = new CircuitBreaker();
      this.circuitBreakers.set(operationId, breaker);
    }
    breaker.recordFailure();
  }
  
  private recordSuccess(operationId: string) {
    const breaker = this.circuitBreakers.get(operationId);
    if (breaker) {
      breaker.recordSuccess();
    }
  }
}

class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private readonly threshold = 5;
  private readonly timeout = 60000; // 1 minute
  
  isOpen(): boolean {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'half-open';
        return false;
      }
      return true;
    }
    return false;
  }
  
  recordFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }
  
  recordSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }
}
```

These comprehensive error handling and resilience patterns ensure your NgRx application can gracefully handle failures, provide meaningful feedback to users, and maintain system stability under adverse conditions.

---

## NgRx Real-time Updates and WebSocket Integration

### Q16: How do you implement real-time updates and WebSocket integration with NgRx?

**Answer:**
Integrating real-time updates with NgRx involves managing WebSocket connections, handling real-time data streams, and maintaining synchronization between local and remote state.

**1. WebSocket State Management:**

```typescript
// state/websocket.state.ts
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface WebSocketConnection {
  id: string;
  url: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastConnected?: Date;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
  subscriptions: string[];
  heartbeatInterval?: number;
  lastHeartbeat?: Date;
}

export interface RealtimeMessage {
  id: string;
  type: string;
  payload: any;
  timestamp: Date;
  connectionId: string;
  processed: boolean;
}

export interface WebSocketState extends EntityState<WebSocketConnection> {
  messages: RealtimeMessage[];
  globalConnectionStatus: 'online' | 'offline' | 'degraded';
  messageQueue: RealtimeMessage[]; // For offline queuing
  subscriptionTopics: Record<string, string[]>; // topic -> connectionIds
}

export const connectionAdapter: EntityAdapter<WebSocketConnection> = 
  createEntityAdapter<WebSocketConnection>({
    selectId: (connection: WebSocketConnection) => connection.id
  });

export const initialWebSocketState: WebSocketState = connectionAdapter.getInitialState({
  messages: [],
  globalConnectionStatus: 'offline',
  messageQueue: [],
  subscriptionTopics: {}
});

export const webSocketReducer = createReducer(
  initialWebSocketState,
  
  on(WebSocketActions.connectRequest, (state, { connectionConfig }) => 
    connectionAdapter.addOne({
      id: connectionConfig.id,
      url: connectionConfig.url,
      status: 'connecting',
      reconnectAttempts: 0,
      maxReconnectAttempts: connectionConfig.maxReconnectAttempts || 5,
      subscriptions: [],
      heartbeatInterval: connectionConfig.heartbeatInterval
    }, state)
  ),
  
  on(WebSocketActions.connectionEstablished, (state, { connectionId }) => 
    connectionAdapter.updateOne(
      {
        id: connectionId,
        changes: {
          status: 'connected',
          lastConnected: new Date(),
          reconnectAttempts: 0
        }
      },
      {
        ...state,
        globalConnectionStatus: 'online'
      }
    )
  ),
  
  on(WebSocketActions.connectionLost, (state, { connectionId, error }) => 
    connectionAdapter.updateOne(
      {
        id: connectionId,
        changes: {
          status: 'disconnected',
          reconnectAttempts: state.entities[connectionId]!.reconnectAttempts + 1
        }
      },
      {
        ...state,
        globalConnectionStatus: 'degraded'
      }
    )
  ),
  
  on(WebSocketActions.messageReceived, (state, { message }) => ({
    ...state,
    messages: [message, ...state.messages.slice(0, 99)] // Keep last 100 messages
  })),
  
  on(WebSocketActions.subscribeToTopic, (state, { connectionId, topic }) => {
    const connection = state.entities[connectionId];
    if (!connection) return state;
    
    return connectionAdapter.updateOne(
      {
        id: connectionId,
        changes: {
          subscriptions: [...connection.subscriptions, topic]
        }
      },
      {
        ...state,
        subscriptionTopics: {
          ...state.subscriptionTopics,
          [topic]: [...(state.subscriptionTopics[topic] || []), connectionId]
        }
      }
    );
  }),
  
  on(WebSocketActions.queueMessage, (state, { message }) => ({
    ...state,
    messageQueue: [...state.messageQueue, message]
  })),
  
  on(WebSocketActions.processQueuedMessages, (state) => ({
    ...state,
    messages: [...state.messageQueue, ...state.messages],
    messageQueue: []
  }))
);
```

**2. WebSocket Actions:**

```typescript
// actions/websocket.actions.ts
import { createAction, props } from '@ngrx/store';
import { RealtimeMessage, WebSocketConnection } from '../state/websocket.state';

export interface ConnectionConfig {
  id: string;
  url: string;
  protocols?: string[];
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  autoReconnect?: boolean;
}

// Connection Management
export const connectRequest = createAction(
  '[WebSocket] Connect Request',
  props<{ connectionConfig: ConnectionConfig }>()
);

export const connectionEstablished = createAction(
  '[WebSocket] Connection Established',
  props<{ connectionId: string }>()
);

export const connectionLost = createAction(
  '[WebSocket] Connection Lost',
  props<{ connectionId: string; error?: any }>()
);

export const disconnect = createAction(
  '[WebSocket] Disconnect',
  props<{ connectionId: string }>()
);

export const reconnectAttempt = createAction(
  '[WebSocket] Reconnect Attempt',
  props<{ connectionId: string }>()
);

// Message Handling
export const sendMessage = createAction(
  '[WebSocket] Send Message',
  props<{ connectionId: string; message: any }>()
);

export const messageReceived = createAction(
  '[WebSocket] Message Received',
  props<{ message: RealtimeMessage }>()
);

export const queueMessage = createAction(
  '[WebSocket] Queue Message',
  props<{ message: RealtimeMessage }>()
);

export const processQueuedMessages = createAction(
  '[WebSocket] Process Queued Messages'
);

// Subscription Management
export const subscribeToTopic = createAction(
  '[WebSocket] Subscribe To Topic',
  props<{ connectionId: string; topic: string; params?: any }>()
);

export const unsubscribeFromTopic = createAction(
  '[WebSocket] Unsubscribe From Topic',
  props<{ connectionId: string; topic: string }>()
);

// Heartbeat
export const sendHeartbeat = createAction(
  '[WebSocket] Send Heartbeat',
  props<{ connectionId: string }>()
);

export const heartbeatReceived = createAction(
  '[WebSocket] Heartbeat Received',
  props<{ connectionId: string }>()
);
```

**3. WebSocket Effects:**

```typescript
// effects/websocket.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { 
  EMPTY, 
  fromEvent, 
  interval, 
  merge, 
  of, 
  timer, 
  Subject,
  WebSocketSubject,
  webSocket
} from 'rxjs';
import {
  catchError,
  delay,
  filter,
  map,
  mergeMap,
  retryWhen,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import * as WebSocketActions from '../actions/websocket.actions';
import * as WebSocketSelectors from '../selectors/websocket.selectors';
import { RealtimeMessage } from '../state/websocket.state';

@Injectable()
export class WebSocketEffects {
  private connections = new Map<string, WebSocketSubject<any>>();
  private destroy$ = new Subject<void>();
  
  // Establish WebSocket connection
  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.connectRequest),
      mergeMap(({ connectionConfig }) => {
        const { id, url, protocols, heartbeatInterval } = connectionConfig;
        
        // Create WebSocket connection
        const ws$ = webSocket({
          url,
          protocols,
          openObserver: {
            next: () => {
              this.store.dispatch(
                WebSocketActions.connectionEstablished({ connectionId: id })
              );
            }
          },
          closeObserver: {
            next: (event) => {
              this.store.dispatch(
                WebSocketActions.connectionLost({ 
                  connectionId: id, 
                  error: event 
                })
              );
            }
          }
        });
        
        // Store connection reference
        this.connections.set(id, ws$);
        
        // Handle incoming messages
        const messages$ = ws$.pipe(
          map(data => {
            const message: RealtimeMessage = {
              id: this.generateMessageId(),
              type: data.type || 'unknown',
              payload: data.payload || data,
              timestamp: new Date(),
              connectionId: id,
              processed: false
            };
            
            return WebSocketActions.messageReceived({ message });
          }),
          catchError(error => {
            console.error('WebSocket message error:', error);
            return EMPTY;
          })
        );
        
        // Setup heartbeat if configured
        const heartbeat$ = heartbeatInterval
          ? interval(heartbeatInterval).pipe(
              map(() => WebSocketActions.sendHeartbeat({ connectionId: id }))
            )
          : EMPTY;
        
        return merge(messages$, heartbeat$).pipe(
          takeUntil(
            this.actions$.pipe(
              ofType(WebSocketActions.disconnect),
              filter(action => action.connectionId === id)
            )
          ),
          retryWhen(errors =>
            errors.pipe(
              withLatestFrom(
                this.store.select(WebSocketSelectors.selectConnectionById(id))
              ),
              switchMap(([error, connection]) => {
                if (!connection || 
                    connection.reconnectAttempts >= connection.maxReconnectAttempts) {
                  return EMPTY;
                }
                
                const delay = Math.min(
                  1000 * Math.pow(2, connection.reconnectAttempts),
                  30000
                );
                
                return timer(delay).pipe(
                  tap(() => {
                    this.store.dispatch(
                      WebSocketActions.reconnectAttempt({ connectionId: id })
                    );
                  })
                );
              })
            )
          )
        );
      })
    )
  );
  
  // Send messages through WebSocket
  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.sendMessage),
      withLatestFrom(
        this.store.select(WebSocketSelectors.selectGlobalConnectionStatus)
      ),
      switchMap(([{ connectionId, message }, connectionStatus]) => {
        const connection = this.connections.get(connectionId);
        
        if (!connection || connectionStatus === 'offline') {
          // Queue message for later sending
          const queuedMessage: RealtimeMessage = {
            id: this.generateMessageId(),
            type: 'queued',
            payload: message,
            timestamp: new Date(),
            connectionId,
            processed: false
          };
          
          return of(WebSocketActions.queueMessage({ message: queuedMessage }));
        }
        
        try {
          connection.next(message);
          return EMPTY;
        } catch (error) {
          console.error('Failed to send WebSocket message:', error);
          return of(
            WebSocketActions.connectionLost({ 
              connectionId, 
              error 
            })
          );
        }
      })
    )
  );
  
  // Process queued messages when connection is restored
  processQueuedMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.connectionEstablished),
      delay(1000), // Wait a bit for connection to stabilize
      map(() => WebSocketActions.processQueuedMessages())
    )
  );
  
  // Handle topic subscriptions
  subscribeToTopic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.subscribeToTopic),
      map(({ connectionId, topic, params }) => {
        const subscriptionMessage = {
          type: 'subscribe',
          topic,
          params
        };
        
        return WebSocketActions.sendMessage({ 
          connectionId, 
          message: subscriptionMessage 
        });
      })
    )
  );
  
  // Handle heartbeat
  sendHeartbeat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.sendHeartbeat),
      map(({ connectionId }) => {
        const heartbeatMessage = {
          type: 'ping',
          timestamp: Date.now()
        };
        
        return WebSocketActions.sendMessage({ 
          connectionId, 
          message: heartbeatMessage 
        });
      })
    )
  );
  
  // Disconnect WebSocket
  disconnect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.disconnect),
      tap(({ connectionId }) => {
        const connection = this.connections.get(connectionId);
        if (connection) {
          connection.complete();
          this.connections.delete(connectionId);
        }
      })
    ),
    { dispatch: false }
  );
  
  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
  
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Close all connections
    this.connections.forEach(connection => connection.complete());
    this.connections.clear();
  }
}
```

**4. Real-time Data Integration:**

```typescript
// effects/realtime-data.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as WebSocketActions from '../actions/websocket.actions';
import * as UserActions from '../actions/user.actions';
import * as NotificationActions from '../actions/notification.actions';
import * as WebSocketSelectors from '../selectors/websocket.selectors';

@Injectable()
export class RealtimeDataEffects {
  
  // Handle real-time user updates
  handleUserUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.messageReceived),
      filter(({ message }) => message.type === 'user_update'),
      map(({ message }) => {
        const { action, user } = message.payload;
        
        switch (action) {
          case 'created':
            return UserActions.addUserSuccess({ user });
          case 'updated':
            return UserActions.updateUserSuccess({ user });
          case 'deleted':
            return UserActions.deleteUserSuccess({ userId: user.id });
          default:
            return UserActions.loadUsers(); // Refresh all users
        }
      })
    )
  );
  
  // Handle real-time notifications
  handleNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.messageReceived),
      filter(({ message }) => message.type === 'notification'),
      map(({ message }) => 
        NotificationActions.addNotification({ 
          notification: {
            id: message.id,
            ...message.payload,
            timestamp: message.timestamp,
            realtime: true
          }
        })
      )
    )
  );
  
  // Handle real-time chat messages
  handleChatMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.messageReceived),
      filter(({ message }) => message.type === 'chat_message'),
      withLatestFrom(
        this.store.select(WebSocketSelectors.selectCurrentUser)
      ),
      filter(([{ message }, currentUser]) => 
        message.payload.recipientId === currentUser?.id
      ),
      map(([{ message }]) => 
        ChatActions.receiveMessage({ 
          message: {
            id: message.id,
            ...message.payload,
            timestamp: message.timestamp
          }
        })
      )
    )
  );
  
  // Handle real-time system events
  handleSystemEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.messageReceived),
      filter(({ message }) => message.type === 'system_event'),
      switchMap(({ message }) => {
        const { eventType, data } = message.payload;
        
        switch (eventType) {
          case 'maintenance_mode':
            return [SystemActions.setMaintenanceMode({ enabled: data.enabled })];
          case 'feature_toggle':
            return [SystemActions.updateFeatureFlag({ 
              flag: data.flag, 
              enabled: data.enabled 
            })];
          case 'cache_invalidation':
            return [CacheActions.invalidateCache({ keys: data.keys })];
          default:
            return [];
        }
      })
    )
  );
  
  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}
```

**5. WebSocket Service:**

```typescript
// services/websocket.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as WebSocketActions from '../actions/websocket.actions';
import * as WebSocketSelectors from '../selectors/websocket.selectors';
import { ConnectionConfig, RealtimeMessage } from '../state/websocket.state';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  
  constructor(private store: Store) {}
  
  // Connect to WebSocket
  connect(config: ConnectionConfig): void {
    this.store.dispatch(
      WebSocketActions.connectRequest({ connectionConfig: config })
    );
  }
  
  // Disconnect from WebSocket
  disconnect(connectionId: string): void {
    this.store.dispatch(
      WebSocketActions.disconnect({ connectionId })
    );
  }
  
  // Send message
  sendMessage(connectionId: string, message: any): void {
    this.store.dispatch(
      WebSocketActions.sendMessage({ connectionId, message })
    );
  }
  
  // Subscribe to topic
  subscribeToTopic(connectionId: string, topic: string, params?: any): void {
    this.store.dispatch(
      WebSocketActions.subscribeToTopic({ connectionId, topic, params })
    );
  }
  
  // Unsubscribe from topic
  unsubscribeFromTopic(connectionId: string, topic: string): void {
    this.store.dispatch(
      WebSocketActions.unsubscribeFromTopic({ connectionId, topic })
    );
  }
  
  // Get connection status
  getConnectionStatus(connectionId: string): Observable<string> {
    return this.store.select(
      WebSocketSelectors.selectConnectionById(connectionId)
    ).pipe(
      map(connection => connection?.status || 'disconnected')
    );
  }
  
  // Get messages by type
  getMessagesByType(messageType: string): Observable<RealtimeMessage[]> {
    return this.store.select(WebSocketSelectors.selectAllMessages).pipe(
      map(messages => messages.filter(msg => msg.type === messageType))
    );
  }
  
  // Get global connection status
  getGlobalConnectionStatus(): Observable<string> {
    return this.store.select(WebSocketSelectors.selectGlobalConnectionStatus);
  }
}
```

**6. Component Integration:**

```typescript
// components/realtime-dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { WebSocketService } from '../services/websocket.service';
import * as WebSocketSelectors from '../selectors/websocket.selectors';
import * as UserSelectors from '../selectors/user.selectors';
import { RealtimeMessage } from '../state/websocket.state';

@Component({
  selector: 'app-realtime-dashboard',
  template: `
    <div class="realtime-dashboard">
      <div class="connection-status">
        <div class="status-indicator" 
             [class.connected]="(connectionStatus$ | async) === 'online'"
             [class.disconnected]="(connectionStatus$ | async) === 'offline'"
             [class.degraded]="(connectionStatus$ | async) === 'degraded'">
          {{ connectionStatus$ | async | titlecase }}
        </div>
      </div>
      
      <div class="realtime-content">
        <div class="user-list">
          <h3>Active Users</h3>
          <div class="user-item" 
               *ngFor="let user of activeUsers$ | async"
               [class.online]="user.isOnline">
            <div class="user-avatar">
              <img [src]="user.avatar" [alt]="user.name">
              <div class="status-dot" [class.online]="user.isOnline"></div>
            </div>
            <div class="user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-status">{{ user.status }}</div>
            </div>
          </div>
        </div>
        
        <div class="activity-feed">
          <h3>Live Activity</h3>
          <div class="activity-item" 
               *ngFor="let message of recentMessages$ | async">
            <div class="activity-time">
              {{ message.timestamp | date:'short' }}
            </div>
            <div class="activity-content">
              {{ formatActivityMessage(message) }}
            </div>
          </div>
        </div>
        
        <div class="notifications">
          <h3>Real-time Notifications</h3>
          <div class="notification-item"
               *ngFor="let notification of notifications$ | async"
               [class]="notification.type">
            <div class="notification-icon">
              <mat-icon>{{ getNotificationIcon(notification.type) }}</mat-icon>
            </div>
            <div class="notification-content">
              <div class="notification-title">{{ notification.title }}</div>
              <div class="notification-message">{{ notification.message }}</div>
            </div>
            <div class="notification-time">
              {{ notification.timestamp | date:'short' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./realtime-dashboard.component.scss']
})
export class RealtimeDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  connectionStatus$: Observable<string>;
  activeUsers$: Observable<any[]>;
  recentMessages$: Observable<RealtimeMessage[]>;
  notifications$: Observable<any[]>;
  
  constructor(
    private store: Store,
    private webSocketService: WebSocketService
  ) {
    this.connectionStatus$ = this.webSocketService.getGlobalConnectionStatus();
    this.activeUsers$ = this.store.select(UserSelectors.selectActiveUsers);
    this.recentMessages$ = this.store.select(WebSocketSelectors.selectRecentMessages);
    this.notifications$ = this.store.select(WebSocketSelectors.selectRealtimeNotifications);
  }
  
  ngOnInit() {
    // Connect to WebSocket
    this.webSocketService.connect({
      id: 'main',
      url: 'wss://api.example.com/ws',
      maxReconnectAttempts: 5,
      heartbeatInterval: 30000,
      autoReconnect: true
    });
    
    // Subscribe to relevant topics
    this.webSocketService.subscribeToTopic('main', 'user_updates');
    this.webSocketService.subscribeToTopic('main', 'notifications');
    this.webSocketService.subscribeToTopic('main', 'system_events');
    
    // Handle connection status changes
    this.connectionStatus$.pipe(
      takeUntil(this.destroy$),
      filter(status => status === 'offline')
    ).subscribe(() => {
      // Handle offline state
      this.showOfflineMessage();
    });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Disconnect WebSocket
    this.webSocketService.disconnect('main');
  }
  
  formatActivityMessage(message: RealtimeMessage): string {
    switch (message.type) {
      case 'user_update':
        return `User ${message.payload.user.name} ${message.payload.action}`;
      case 'system_event':
        return `System: ${message.payload.eventType}`;
      default:
        return message.payload.message || 'Unknown activity';
    }
  }
  
  getNotificationIcon(type: string): string {
    const iconMap: Record<string, string> = {
      info: 'info',
      warning: 'warning',
      error: 'error',
      success: 'check_circle'
    };
    return iconMap[type] || 'notifications';
  }
  
  private showOfflineMessage() {
    // Show offline notification
  }
}
```

This comprehensive WebSocket integration with NgRx provides real-time capabilities while maintaining predictable state management, proper error handling, and offline resilience.

---

## NgRx in Micro-frontends Architecture

### Q17: How do you implement NgRx in a micro-frontends architecture with state sharing and isolation?

**Answer:**
Implementing NgRx in micro-frontends requires careful consideration of state isolation, shared state management, and communication between different micro-frontend applications.

**1. Micro-frontend State Architecture:**

```typescript
// shared/state/micro-frontend.state.ts
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface MicroFrontend {
  id: string;
  name: string;
  version: string;
  status: 'loading' | 'loaded' | 'error' | 'unloaded';
  mountPath: string;
  remoteEntry: string;
  exposedModule: string;
  sharedDependencies: string[];
  isolatedState: boolean;
  sharedStateKeys: string[];
}

export interface SharedStateSlice {
  key: string;
  data: any;
  version: number;
  lastUpdated: Date;
  ownerMicroFrontend: string;
  subscribers: string[];
}

export interface MicroFrontendState extends EntityState<MicroFrontend> {
  currentMicroFrontend: string | null;
  sharedState: Record<string, SharedStateSlice>;
  communicationChannels: Record<string, any>;
  globalEvents: any[];
  stateSync: {
    enabled: boolean;
    strategy: 'broadcast' | 'centralized' | 'peer-to-peer';
    conflictResolution: 'last-write-wins' | 'merge' | 'manual';
  };
}

export const microFrontendAdapter: EntityAdapter<MicroFrontend> = 
  createEntityAdapter<MicroFrontend>({
    selectId: (mf: MicroFrontend) => mf.id
  });

export const initialMicroFrontendState: MicroFrontendState = 
  microFrontendAdapter.getInitialState({
    currentMicroFrontend: null,
    sharedState: {},
    communicationChannels: {},
    globalEvents: [],
    stateSync: {
      enabled: true,
      strategy: 'broadcast',
      conflictResolution: 'last-write-wins'
    }
  });

export const microFrontendReducer = createReducer(
  initialMicroFrontendState,
  
  on(MicroFrontendActions.registerMicroFrontend, (state, { microFrontend }) => 
    microFrontendAdapter.addOne(microFrontend, state)
  ),
  
  on(MicroFrontendActions.setCurrentMicroFrontend, (state, { microFrontendId }) => ({
    ...state,
    currentMicroFrontend: microFrontendId
  })),
  
  on(MicroFrontendActions.updateSharedState, (state, { key, data, ownerMicroFrontend }) => ({
    ...state,
    sharedState: {
      ...state.sharedState,
      [key]: {
        key,
        data,
        version: (state.sharedState[key]?.version || 0) + 1,
        lastUpdated: new Date(),
        ownerMicroFrontend,
        subscribers: state.sharedState[key]?.subscribers || []
      }
    }
  })),
  
  on(MicroFrontendActions.subscribeToSharedState, (state, { key, microFrontendId }) => {
    const currentSlice = state.sharedState[key];
    if (!currentSlice) return state;
    
    return {
      ...state,
      sharedState: {
        ...state.sharedState,
        [key]: {
          ...currentSlice,
          subscribers: [...new Set([...currentSlice.subscribers, microFrontendId])]
        }
      }
    };
  }),
  
  on(MicroFrontendActions.addGlobalEvent, (state, { event }) => ({
    ...state,
    globalEvents: [event, ...state.globalEvents.slice(0, 99)] // Keep last 100 events
  }))
);
```

**2. State Isolation Service:**

```typescript
// services/state-isolation.service.ts
import { Injectable, Injector } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface IsolatedStoreConfig {
  microFrontendId: string;
  isolatedReducers: any;
  sharedReducers?: any;
  effects?: any[];
  sharedStateKeys?: string[];
}

@Injectable({ providedIn: 'root' })
export class StateIsolationService {
  private isolatedStores = new Map<string, Store>();
  private storeConfigs = new Map<string, IsolatedStoreConfig>();
  private sharedStateSubject = new BehaviorSubject<Record<string, any>>({});
  
  constructor(
    private globalStore: Store,
    private injector: Injector
  ) {}
  
  // Create isolated store for micro-frontend
  createIsolatedStore(config: IsolatedStoreConfig): Store {
    const { microFrontendId, isolatedReducers, sharedReducers, effects } = config;
    
    // Combine isolated and shared reducers
    const combinedReducers = {
      ...isolatedReducers,
      ...(sharedReducers || {}),
      microFrontend: microFrontendReducer
    };
    
    // Create isolated injector
    const isolatedInjector = Injector.create({
      providers: [
        {
          provide: Store,
          useFactory: () => {
            // Create store with combined reducers
            const storeModule = StoreModule.forRoot(combinedReducers);
            const effectsModule = effects ? EffectsModule.forRoot(effects) : null;
            
            // This is a simplified version - in practice, you'd need to
            // properly bootstrap the store with the Angular module system
            return new Store(combinedReducers, this.injector);
          }
        }
      ],
      parent: this.injector
    });
    
    const isolatedStore = isolatedInjector.get(Store);
    
    // Store references
    this.isolatedStores.set(microFrontendId, isolatedStore);
    this.storeConfigs.set(microFrontendId, config);
    
    // Setup state synchronization
    this.setupStateSynchronization(microFrontendId, isolatedStore, config);
    
    return isolatedStore;
  }
  
  // Get isolated store for micro-frontend
  getIsolatedStore(microFrontendId: string): Store | null {
    return this.isolatedStores.get(microFrontendId) || null;
  }
  
  // Setup bidirectional state synchronization
  private setupStateSynchronization(
    microFrontendId: string, 
    isolatedStore: Store, 
    config: IsolatedStoreConfig
  ) {
    const { sharedStateKeys = [] } = config;
    
    // Sync from isolated store to global store
    sharedStateKeys.forEach(stateKey => {
      isolatedStore.select(state => state[stateKey]).subscribe(stateSlice => {
        if (stateSlice !== undefined) {
          this.globalStore.dispatch(
            MicroFrontendActions.updateSharedState({
              key: stateKey,
              data: stateSlice,
              ownerMicroFrontend: microFrontendId
            })
          );
        }
      });
    });
    
    // Sync from global store to isolated store
    this.globalStore.select(state => state.microFrontend?.sharedState)
      .pipe(
        filter(sharedState => !!sharedState),
        map(sharedState => {
          const relevantState: Record<string, any> = {};
          sharedStateKeys.forEach(key => {
            if (sharedState[key] && 
                sharedState[key].ownerMicroFrontend !== microFrontendId) {
              relevantState[key] = sharedState[key].data;
            }
          });
          return relevantState;
        })
      )
      .subscribe(relevantState => {
        Object.keys(relevantState).forEach(key => {
          isolatedStore.dispatch({
            type: `[Shared] Update ${key}`,
            payload: relevantState[key]
          });
        });
      });
  }
  
  // Destroy isolated store
  destroyIsolatedStore(microFrontendId: string) {
    const store = this.isolatedStores.get(microFrontendId);
    if (store) {
      // Cleanup subscriptions and references
      this.isolatedStores.delete(microFrontendId);
      this.storeConfigs.delete(microFrontendId);
    }
  }
  
  // Get shared state observable
  getSharedState(): Observable<Record<string, any>> {
    return this.sharedStateSubject.asObservable();
  }
  
  // Update shared state
  updateSharedState(key: string, data: any, microFrontendId: string) {
    this.globalStore.dispatch(
      MicroFrontendActions.updateSharedState({
        key,
        data,
        ownerMicroFrontend: microFrontendId
      })
    );
  }
}
```

**3. Inter-Micro-Frontend Communication:**

```typescript
// services/micro-frontend-communication.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface MicroFrontendMessage {
  id: string;
  type: string;
  payload: any;
  source: string;
  target?: string; // specific micro-frontend or 'all'
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

@Injectable({ providedIn: 'root' })
export class MicroFrontendCommunicationService {
  private messageSubject = new Subject<MicroFrontendMessage>();
  private currentMicroFrontendId: string;
  
  constructor(private store: Store) {
    this.setupGlobalMessageListener();
  }
  
  // Set current micro-frontend ID
  setCurrentMicroFrontend(microFrontendId: string) {
    this.currentMicroFrontendId = microFrontendId;
    this.store.dispatch(
      MicroFrontendActions.setCurrentMicroFrontend({ microFrontendId })
    );
  }
  
  // Send message to other micro-frontends
  sendMessage(message: Omit<MicroFrontendMessage, 'id' | 'source' | 'timestamp'>) {
    const fullMessage: MicroFrontendMessage = {
      ...message,
      id: this.generateMessageId(),
      source: this.currentMicroFrontendId,
      timestamp: new Date()
    };
    
    // Dispatch to global store
    this.store.dispatch(
      MicroFrontendActions.addGlobalEvent({ event: fullMessage })
    );
    
    // Broadcast via custom events
    this.broadcastMessage(fullMessage);
    
    // Emit to local subscribers
    this.messageSubject.next(fullMessage);
  }
  
  // Listen for messages
  onMessage(messageType?: string, source?: string): Observable<MicroFrontendMessage> {
    return this.messageSubject.asObservable().pipe(
      filter(message => {
        // Filter by target
        if (message.target && 
            message.target !== 'all' && 
            message.target !== this.currentMicroFrontendId) {
          return false;
        }
        
        // Filter by type
        if (messageType && message.type !== messageType) {
          return false;
        }
        
        // Filter by source
        if (source && message.source !== source) {
          return false;
        }
        
        // Don't receive own messages
        return message.source !== this.currentMicroFrontendId;
      })
    );
  }
  
  // Request-Response pattern
  sendRequest<T>(request: {
    type: string;
    payload: any;
    target?: string;
  }): Observable<T> {
    const requestId = this.generateMessageId();
    const responseType = `${request.type}_RESPONSE`;
    
    // Send request
    this.sendMessage({
      ...request,
      type: request.type,
      payload: {
        ...request.payload,
        requestId
      },
      priority: 'medium'
    });
    
    // Wait for response
    return this.onMessage(responseType).pipe(
      filter(message => message.payload.requestId === requestId),
      map(message => message.payload.data)
    );
  }
  
  // Send response to request
  sendResponse(requestMessage: MicroFrontendMessage, responseData: any) {
    this.sendMessage({
      type: `${requestMessage.type}_RESPONSE`,
      payload: {
        requestId: requestMessage.payload.requestId,
        data: responseData
      },
      target: requestMessage.source,
      priority: 'medium'
    });
  }
  
  // Broadcast message via custom events (for cross-origin communication)
  private broadcastMessage(message: MicroFrontendMessage) {
    // Use CustomEvent for same-origin communication
    window.dispatchEvent(new CustomEvent('micro-frontend-message', {
      detail: message
    }));
    
    // Use postMessage for cross-origin communication
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'micro-frontend-message',
        data: message
      }, '*');
    }
    
    // Broadcast to all iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      try {
        iframe.contentWindow?.postMessage({
          type: 'micro-frontend-message',
          data: message
        }, '*');
      } catch (error) {
        // Handle cross-origin restrictions
        console.warn('Could not send message to iframe:', error);
      }
    });
  }
  
  // Setup global message listener
  private setupGlobalMessageListener() {
    // Listen for custom events
    fromEvent<CustomEvent>(window, 'micro-frontend-message')
      .pipe(
        map(event => event.detail as MicroFrontendMessage)
      )
      .subscribe(message => {
        this.messageSubject.next(message);
      });
    
    // Listen for postMessage events
    fromEvent<MessageEvent>(window, 'message')
      .pipe(
        filter(event => event.data?.type === 'micro-frontend-message'),
        map(event => event.data.data as MicroFrontendMessage)
      )
      .subscribe(message => {
        this.messageSubject.next(message);
      });
  }
  
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

**4. Micro-Frontend Store Factory:**

```typescript
// factories/micro-frontend-store.factory.ts
import { Injectable, Injector } from '@angular/core';
import { Store, StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StateIsolationService } from '../services/state-isolation.service';
import { MicroFrontendCommunicationService } from '../services/micro-frontend-communication.service';

export interface MicroFrontendStoreConfig {
  microFrontendId: string;
  reducers: any;
  effects?: any[];
  sharedStateKeys?: string[];
  enableDevTools?: boolean;
  metaReducers?: MetaReducer<any>[];
  isolationLevel: 'full' | 'partial' | 'shared';
}

@Injectable({ providedIn: 'root' })
export class MicroFrontendStoreFactory {
  
  constructor(
    private stateIsolationService: StateIsolationService,
    private communicationService: MicroFrontendCommunicationService,
    private injector: Injector
  ) {}
  
  // Create store for micro-frontend
  createStore(config: MicroFrontendStoreConfig): Store {
    const {
      microFrontendId,
      reducers,
      effects = [],
      sharedStateKeys = [],
      enableDevTools = false,
      metaReducers = [],
      isolationLevel
    } = config;
    
    // Set current micro-frontend
    this.communicationService.setCurrentMicroFrontend(microFrontendId);
    
    // Add communication meta-reducer
    const communicationMetaReducer = this.createCommunicationMetaReducer(
      microFrontendId
    );
    const allMetaReducers = [communicationMetaReducer, ...metaReducers];
    
    switch (isolationLevel) {
      case 'full':
        return this.createFullyIsolatedStore(config, allMetaReducers);
      case 'partial':
        return this.createPartiallyIsolatedStore(config, allMetaReducers);
      case 'shared':
        return this.createSharedStore(config, allMetaReducers);
      default:
        throw new Error(`Unknown isolation level: ${isolationLevel}`);
    }
  }
  
  // Create fully isolated store
  private createFullyIsolatedStore(
    config: MicroFrontendStoreConfig,
    metaReducers: MetaReducer<any>[]
  ): Store {
    const { microFrontendId, reducers, effects, enableDevTools } = config;
    
    // Create completely isolated store
    const isolatedInjector = Injector.create({
      providers: [
        StoreModule.forRoot(reducers, { metaReducers }).providers || [],
        EffectsModule.forRoot(effects).providers || [],
        ...(enableDevTools ? 
          StoreDevtoolsModule.instrument({
            name: `MicroFrontend: ${microFrontendId}`
          }).providers || [] : []
        )
      ],
      parent: this.injector
    });
    
    return isolatedInjector.get(Store);
  }
  
  // Create partially isolated store (shares some state)
  private createPartiallyIsolatedStore(
    config: MicroFrontendStoreConfig,
    metaReducers: MetaReducer<any>[]
  ): Store {
    return this.stateIsolationService.createIsolatedStore({
      microFrontendId: config.microFrontendId,
      isolatedReducers: config.reducers,
      effects: config.effects,
      sharedStateKeys: config.sharedStateKeys
    });
  }
  
  // Create shared store (uses global store)
  private createSharedStore(
    config: MicroFrontendStoreConfig,
    metaReducers: MetaReducer<any>[]
  ): Store {
    // Register micro-frontend with global store
    const globalStore = this.injector.get(Store);
    
    globalStore.dispatch(
      MicroFrontendActions.registerMicroFrontend({
        microFrontend: {
          id: config.microFrontendId,
          name: config.microFrontendId,
          version: '1.0.0',
          status: 'loaded',
          mountPath: window.location.pathname,
          remoteEntry: '',
          exposedModule: '',
          sharedDependencies: [],
          isolatedState: false,
          sharedStateKeys: config.sharedStateKeys || []
        }
      })
    );
    
    return globalStore;
  }
  
  // Create meta-reducer for communication
  private createCommunicationMetaReducer(
    microFrontendId: string
  ): MetaReducer<any> {
    return (reducer: ActionReducer<any>): ActionReducer<any> => {
      return (state, action) => {
        // Intercept actions for communication
        if (action.type.startsWith('[Communication]')) {
          this.communicationService.sendMessage({
            type: 'state_action',
            payload: {
              action,
              microFrontendId
            },
            priority: 'medium'
          });
        }
        
        return reducer(state, action);
      };
    };
  }
}
```

**5. Micro-Frontend Module:**

```typescript
// modules/micro-frontend.module.ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MicroFrontendStoreFactory, MicroFrontendStoreConfig } from '../factories/micro-frontend-store.factory';
import { StateIsolationService } from '../services/state-isolation.service';
import { MicroFrontendCommunicationService } from '../services/micro-frontend-communication.service';
import { microFrontendReducer } from '../state/micro-frontend.state';
import { MicroFrontendEffects } from '../effects/micro-frontend.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('microFrontend', microFrontendReducer),
    EffectsModule.forFeature([MicroFrontendEffects])
  ],
  providers: [
    StateIsolationService,
    MicroFrontendCommunicationService,
    MicroFrontendStoreFactory
  ]
})
export class MicroFrontendModule {
  
  static forRoot(): ModuleWithProviders<MicroFrontendModule> {
    return {
      ngModule: MicroFrontendModule,
      providers: [
        StateIsolationService,
        MicroFrontendCommunicationService,
        MicroFrontendStoreFactory
      ]
    };
  }
  
  static forChild(config: MicroFrontendStoreConfig): ModuleWithProviders<MicroFrontendModule> {
    return {
      ngModule: MicroFrontendModule,
      providers: [
        {
          provide: 'MICRO_FRONTEND_CONFIG',
          useValue: config
        },
        {
          provide: Store,
          useFactory: (factory: MicroFrontendStoreFactory) => {
            return factory.createStore(config);
          },
          deps: [MicroFrontendStoreFactory]
        }
      ]
    };
  }
}
```

**6. Usage Example:**

```typescript
// micro-frontend-app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicroFrontendModule } from './micro-frontend.module';
import { userReducer } from './state/user.reducer';
import { UserEffects } from './effects/user.effects';

@NgModule({
  imports: [
    BrowserModule,
    MicroFrontendModule.forChild({
      microFrontendId: 'user-management',
      reducers: {
        users: userReducer
      },
      effects: [UserEffects],
      sharedStateKeys: ['currentUser', 'permissions'],
      isolationLevel: 'partial',
      enableDevTools: true
    })
  ],
  // ... rest of module configuration
})
export class MicroFrontendAppModule {}
```

This architecture provides flexible state management for micro-frontends with configurable isolation levels, inter-application communication, and shared state synchronization while maintaining the benefits of NgRx's predictable state management.

---

## NgRx Migration Strategies

### Q18: What are the best practices for migrating from legacy state management to NgRx or upgrading NgRx versions?

**Answer:**
Migrating to NgRx or upgrading NgRx versions requires careful planning, incremental implementation, and proper testing strategies to ensure smooth transitions.

**1. Migration from Legacy State Management:**

```typescript
// migration/legacy-state-adapter.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export interface LegacyStateConfig {
  legacyServiceName: string;
  ngrxFeatureName: string;
  stateMapping: Record<string, string>;
  actionMapping: Record<string, string>;
  migrationPhase: 'preparation' | 'dual-write' | 'dual-read' | 'cleanup';
}

@Injectable({ providedIn: 'root' })
export class LegacyStateAdapterService {
  private migrationConfigs = new Map<string, LegacyStateConfig>();
  private legacyServices = new Map<string, any>();
  
  constructor(private store: Store) {}
  
  // Register legacy service for migration
  registerLegacyService(config: LegacyStateConfig, legacyService: any) {
    this.migrationConfigs.set(config.legacyServiceName, config);
    this.legacyServices.set(config.legacyServiceName, legacyService);
    
    // Setup bidirectional sync based on migration phase
    this.setupMigrationSync(config, legacyService);
  }
  
  // Setup synchronization between legacy and NgRx
  private setupMigrationSync(config: LegacyStateConfig, legacyService: any) {
    const { migrationPhase, stateMapping, actionMapping } = config;
    
    switch (migrationPhase) {
      case 'preparation':
        this.setupPreparationPhase(config, legacyService);
        break;
      case 'dual-write':
        this.setupDualWritePhase(config, legacyService);
        break;
      case 'dual-read':
        this.setupDualReadPhase(config, legacyService);
        break;
      case 'cleanup':
        this.setupCleanupPhase(config, legacyService);
        break;
    }
  }
  
  // Phase 1: Preparation - Setup NgRx alongside legacy
  private setupPreparationPhase(config: LegacyStateConfig, legacyService: any) {
    // Initialize NgRx state with current legacy state
    const currentLegacyState = this.extractLegacyState(legacyService, config.stateMapping);
    
    this.store.dispatch({
      type: `[Migration] Initialize ${config.ngrxFeatureName}`,
      payload: currentLegacyState
    });
    
    console.log(`Migration Phase 1 (Preparation) setup for ${config.legacyServiceName}`);
  }
  
  // Phase 2: Dual Write - Write to both legacy and NgRx
  private setupDualWritePhase(config: LegacyStateConfig, legacyService: any) {
    // Intercept legacy service methods
    const originalMethods = this.interceptLegacyMethods(legacyService, config);
    
    // Override methods to write to both systems
    Object.keys(config.actionMapping).forEach(legacyMethod => {
      const ngrxAction = config.actionMapping[legacyMethod];
      const originalMethod = originalMethods[legacyMethod];
      
      legacyService[legacyMethod] = (...args: any[]) => {
        // Execute original legacy method
        const result = originalMethod.apply(legacyService, args);
        
        // Dispatch corresponding NgRx action
        this.store.dispatch({
          type: ngrxAction,
          payload: this.transformArgsToPayload(args, legacyMethod)
        });
        
        return result;
      };
    });
    
    console.log(`Migration Phase 2 (Dual Write) setup for ${config.legacyServiceName}`);
  }
  
  // Phase 3: Dual Read - Read from NgRx, fallback to legacy
  private setupDualReadPhase(config: LegacyStateConfig, legacyService: any) {
    // Create adapter methods that read from NgRx first
    Object.keys(config.stateMapping).forEach(legacyProperty => {
      const ngrxSelector = config.stateMapping[legacyProperty];
      
      // Create getter that reads from NgRx
      Object.defineProperty(legacyService, legacyProperty, {
        get: () => {
          let ngrxValue: any;
          this.store.select(ngrxSelector).pipe(
            map(value => value),
            distinctUntilChanged()
          ).subscribe(value => ngrxValue = value).unsubscribe();
          
          return ngrxValue;
        },
        configurable: true
      });
    });
    
    console.log(`Migration Phase 3 (Dual Read) setup for ${config.legacyServiceName}`);
  }
  
  // Phase 4: Cleanup - Remove legacy dependencies
  private setupCleanupPhase(config: LegacyStateConfig, legacyService: any) {
    // Mark legacy service as deprecated
    console.warn(`Legacy service ${config.legacyServiceName} is deprecated. Use NgRx selectors and actions instead.`);
    
    // Optionally, throw errors for legacy method calls
    Object.keys(config.actionMapping).forEach(legacyMethod => {
      legacyService[legacyMethod] = () => {
        throw new Error(`Method ${legacyMethod} is deprecated. Use NgRx action ${config.actionMapping[legacyMethod]} instead.`);
      };
    });
  }
  
  // Extract current state from legacy service
  private extractLegacyState(legacyService: any, stateMapping: Record<string, string>): any {
    const state: any = {};
    
    Object.keys(stateMapping).forEach(legacyProperty => {
      const ngrxProperty = stateMapping[legacyProperty];
      state[ngrxProperty] = legacyService[legacyProperty];
    });
    
    return state;
  }
  
  // Intercept legacy methods for dual-write
  private interceptLegacyMethods(legacyService: any, config: LegacyStateConfig): Record<string, Function> {
    const originalMethods: Record<string, Function> = {};
    
    Object.keys(config.actionMapping).forEach(methodName => {
      originalMethods[methodName] = legacyService[methodName].bind(legacyService);
    });
    
    return originalMethods;
  }
  
  // Transform method arguments to NgRx action payload
  private transformArgsToPayload(args: any[], methodName: string): any {
    // Implement transformation logic based on method signature
    switch (methodName) {
      case 'updateUser':
        return { user: args[0] };
      case 'deleteUser':
        return { userId: args[0] };
      case 'loadUsers':
        return { filters: args[0] || {} };
      default:
        return args.length === 1 ? args[0] : args;
    }
  }
  
  // Get migration progress
  getMigrationProgress(): Record<string, LegacyStateConfig> {
    const progress: Record<string, LegacyStateConfig> = {};
    
    this.migrationConfigs.forEach((config, serviceName) => {
      progress[serviceName] = config;
    });
    
    return progress;
  }
  
  // Update migration phase
  updateMigrationPhase(serviceName: string, newPhase: LegacyStateConfig['migrationPhase']) {
    const config = this.migrationConfigs.get(serviceName);
    const legacyService = this.legacyServices.get(serviceName);
    
    if (config && legacyService) {
      config.migrationPhase = newPhase;
      this.setupMigrationSync(config, legacyService);
    }
  }
}
```

**2. NgRx Version Migration Service:**

```typescript
// migration/ngrx-version-migration.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

export interface NgRxMigrationConfig {
  fromVersion: string;
  toVersion: string;
  features: string[];
  breakingChanges: BreakingChange[];
  migrationSteps: MigrationStep[];
}

export interface BreakingChange {
  type: 'action' | 'selector' | 'effect' | 'reducer' | 'entity';
  description: string;
  oldPattern: string;
  newPattern: string;
  autoFixable: boolean;
}

export interface MigrationStep {
  id: string;
  description: string;
  type: 'manual' | 'automatic';
  files: string[];
  commands?: string[];
  validation?: () => boolean;
}

@Injectable({ providedIn: 'root' })
export class NgRxVersionMigrationService {
  private migrationConfigs: NgRxMigrationConfig[] = [
    {
      fromVersion: '13.x',
      toVersion: '14.x',
      features: ['Standalone APIs', 'Functional Guards', 'Optional Injectors'],
      breakingChanges: [
        {
          type: 'action',
          description: 'createAction props function signature changed',
          oldPattern: 'createAction(type, props<T>())',
          newPattern: 'createAction(type, props<{payload: T}>())',
          autoFixable: true
        }
      ],
      migrationSteps: [
        {
          id: 'update-dependencies',
          description: 'Update NgRx dependencies to version 14',
          type: 'automatic',
          files: ['package.json'],
          commands: ['ng update @ngrx/store@14']
        },
        {
          id: 'migrate-actions',
          description: 'Update action creators to new signature',
          type: 'automatic',
          files: ['**/*.actions.ts']
        }
      ]
    },
    {
      fromVersion: '14.x',
      toVersion: '15.x',
      features: ['Standalone Components', 'Functional Effects', 'Signal Store'],
      breakingChanges: [
        {
          type: 'effect',
          description: 'Effects can now be functional',
          oldPattern: '@Injectable() class Effects { @Effect() effect$ = ... }',
          newPattern: 'export const effect = createEffect(() => ...)',
          autoFixable: false
        }
      ],
      migrationSteps: [
        {
          id: 'update-dependencies',
          description: 'Update NgRx dependencies to version 15',
          type: 'automatic',
          files: ['package.json'],
          commands: ['ng update @ngrx/store@15']
        },
        {
          id: 'migrate-to-standalone',
          description: 'Migrate to standalone components',
          type: 'manual',
          files: ['**/*.component.ts', '**/*.module.ts']
        }
      ]
    }
  ];
  
  constructor(private store: Store) {}
  
  // Get migration path between versions
  getMigrationPath(fromVersion: string, toVersion: string): NgRxMigrationConfig[] {
    const path: NgRxMigrationConfig[] = [];
    
    // Find all migration configs in the path
    let currentVersion = fromVersion;
    
    while (currentVersion !== toVersion) {
      const nextMigration = this.migrationConfigs.find(
        config => config.fromVersion === currentVersion
      );
      
      if (!nextMigration) {
        throw new Error(`No migration path found from ${currentVersion} to ${toVersion}`);
      }
      
      path.push(nextMigration);
      currentVersion = nextMigration.toVersion;
    }
    
    return path;
  }
  
  // Execute migration
  async executeMigration(fromVersion: string, toVersion: string): Promise<void> {
    const migrationPath = this.getMigrationPath(fromVersion, toVersion);
    
    for (const migration of migrationPath) {
      console.log(`Starting migration from ${migration.fromVersion} to ${migration.toVersion}`);
      
      // Execute migration steps
      for (const step of migration.migrationSteps) {
        await this.executeStep(step, migration);
      }
      
      // Validate migration
      if (await this.validateMigration(migration)) {
        console.log(`Migration to ${migration.toVersion} completed successfully`);
      } else {
        throw new Error(`Migration to ${migration.toVersion} failed validation`);
      }
    }
  }
  
  // Execute individual migration step
  private async executeStep(step: MigrationStep, migration: NgRxMigrationConfig): Promise<void> {
    console.log(`Executing step: ${step.description}`);
    
    switch (step.type) {
      case 'automatic':
        await this.executeAutomaticStep(step);
        break;
      case 'manual':
        this.logManualStep(step);
        break;
    }
    
    // Run validation if provided
    if (step.validation && !step.validation()) {
      throw new Error(`Step ${step.id} validation failed`);
    }
  }
  
  // Execute automatic migration step
  private async executeAutomaticStep(step: MigrationStep): Promise<void> {
    if (step.commands) {
      for (const command of step.commands) {
        console.log(`Running command: ${command}`);
        // In a real implementation, you would execute the command
        // using child_process or similar
      }
    }
    
    // Apply code transformations
    await this.applyCodeTransformations(step);
  }
  
  // Apply code transformations
  private async applyCodeTransformations(step: MigrationStep): Promise<void> {
    switch (step.id) {
      case 'migrate-actions':
        await this.migrateActionCreators(step.files);
        break;
      case 'migrate-effects':
        await this.migrateEffects(step.files);
        break;
      case 'migrate-selectors':
        await this.migrateSelectors(step.files);
        break;
    }
  }
  
  // Migrate action creators
  private async migrateActionCreators(files: string[]): Promise<void> {
    // Implementation would use AST transformations
    console.log('Migrating action creators...');
    
    // Example transformation:
    // createAction('type', props<User>()) -> createAction('type', props<{user: User}>())
  }
  
  // Migrate effects
  private async migrateEffects(files: string[]): Promise<void> {
    console.log('Migrating effects...');
    
    // Example: Convert class-based effects to functional effects
  }
  
  // Migrate selectors
  private async migrateSelectors(files: string[]): Promise<void> {
    console.log('Migrating selectors...');
    
    // Example: Update selector signatures
  }
  
  // Log manual migration step
  private logManualStep(step: MigrationStep): void {
    console.log(`\n=== MANUAL STEP REQUIRED ===`);
    console.log(`Description: ${step.description}`);
    console.log(`Files to update: ${step.files.join(', ')}`);
    console.log(`Please complete this step manually before continuing.`);
    console.log(`===============================\n`);
  }
  
  // Validate migration
  private async validateMigration(migration: NgRxMigrationConfig): Promise<boolean> {
    console.log(`Validating migration to ${migration.toVersion}...`);
    
    // Run tests
    const testsPass = await this.runTests();
    if (!testsPass) {
      console.error('Tests failed after migration');
      return false;
    }
    
    // Check for breaking changes
    const breakingChangesResolved = await this.checkBreakingChanges(migration.breakingChanges);
    if (!breakingChangesResolved) {
      console.error('Breaking changes not properly resolved');
      return false;
    }
    
    return true;
  }
  
  // Run tests
  private async runTests(): Promise<boolean> {
    // Implementation would run actual tests
    console.log('Running tests...');
    return true; // Placeholder
  }
  
  // Check breaking changes
  private async checkBreakingChanges(breakingChanges: BreakingChange[]): Promise<boolean> {
    for (const change of breakingChanges) {
      if (!change.autoFixable) {
        console.warn(`Manual verification required for: ${change.description}`);
      }
    }
    
    return true; // Placeholder
  }
  
  // Get migration report
  getMigrationReport(fromVersion: string, toVersion: string): any {
    const migrationPath = this.getMigrationPath(fromVersion, toVersion);
    
    return {
      fromVersion,
      toVersion,
      steps: migrationPath.length,
      features: migrationPath.flatMap(m => m.features),
      breakingChanges: migrationPath.flatMap(m => m.breakingChanges),
      estimatedTime: this.estimateMigrationTime(migrationPath)
    };
  }
  
  // Estimate migration time
  private estimateMigrationTime(migrationPath: NgRxMigrationConfig[]): string {
    const totalSteps = migrationPath.reduce((sum, m) => sum + m.migrationSteps.length, 0);
    const manualSteps = migrationPath.reduce(
      (sum, m) => sum + m.migrationSteps.filter(s => s.type === 'manual').length, 
      0
    );
    
    const automaticTime = (totalSteps - manualSteps) * 5; // 5 minutes per automatic step
    const manualTime = manualSteps * 30; // 30 minutes per manual step
    
    return `${automaticTime + manualTime} minutes`;
  }
}
```

**3. Migration Testing Strategy:**

```typescript
// testing/migration-testing.service.ts
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

@Injectable({ providedIn: 'root' })
export class MigrationTestingService {
  
  // Test legacy to NgRx migration
  async testLegacyMigration(legacyService: any, ngrxActions: any[], ngrxSelectors: any[]): Promise<boolean> {
    const testResults: boolean[] = [];
    
    // Test state synchronization
    testResults.push(await this.testStateSynchronization(legacyService, ngrxSelectors));
    
    // Test action mapping
    testResults.push(await this.testActionMapping(legacyService, ngrxActions));
    
    // Test data consistency
    testResults.push(await this.testDataConsistency(legacyService, ngrxSelectors));
    
    return testResults.every(result => result);
  }
  
  // Test state synchronization
  private async testStateSynchronization(legacyService: any, selectors: any[]): Promise<boolean> {
    const mockStore = TestBed.inject(MockStore);
    
    // Test each selector
    for (const selector of selectors) {
      const legacyValue = legacyService.getValue();
      const ngrxValue = mockStore.select(selector);
      
      // Compare values
      if (JSON.stringify(legacyValue) !== JSON.stringify(ngrxValue)) {
        console.error(`State synchronization failed for selector: ${selector.name}`);
        return false;
      }
    }
    
    return true;
  }
  
  // Test action mapping
  private async testActionMapping(legacyService: any, actions: any[]): Promise<boolean> {
    const mockStore = TestBed.inject(MockStore);
    spyOn(mockStore, 'dispatch');
    
    // Test each action
    for (const action of actions) {
      // Trigger legacy method
      legacyService.triggerAction(action.type, action.payload);
      
      // Verify NgRx action was dispatched
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    }
    
    return true;
  }
  
  // Test data consistency
  private async testDataConsistency(legacyService: any, selectors: any[]): Promise<boolean> {
    // Perform operations and verify consistency
    const initialState = legacyService.getState();
    
    // Perform mutations
    legacyService.updateData({ id: 1, name: 'Test' });
    
    // Verify both systems have same state
    const legacyState = legacyService.getState();
    const ngrxState = {}; // Get from selectors
    
    return JSON.stringify(legacyState) === JSON.stringify(ngrxState);
  }
}
```

**4. Migration CLI Tool:**

```typescript
// cli/migration-cli.ts
import { Command } from 'commander';
import { NgRxVersionMigrationService } from '../migration/ngrx-version-migration.service';

const program = new Command();
const migrationService = new NgRxVersionMigrationService(null as any);

program
  .name('ngrx-migrate')
  .description('NgRx Migration Tool')
  .version('1.0.0');

program
  .command('analyze')
  .description('Analyze current NgRx usage and migration requirements')
  .option('-f, --from <version>', 'Current NgRx version')
  .option('-t, --to <version>', 'Target NgRx version')
  .action((options) => {
    const report = migrationService.getMigrationReport(options.from, options.to);
    console.log('Migration Analysis Report:');
    console.log(JSON.stringify(report, null, 2));
  });

program
  .command('migrate')
  .description('Execute NgRx migration')
  .option('-f, --from <version>', 'Current NgRx version')
  .option('-t, --to <version>', 'Target NgRx version')
  .option('--dry-run', 'Show what would be changed without making changes')
  .action(async (options) => {
    if (options.dryRun) {
      console.log('Dry run mode - no changes will be made');
      const report = migrationService.getMigrationReport(options.from, options.to);
      console.log(JSON.stringify(report, null, 2));
    } else {
      await migrationService.executeMigration(options.from, options.to);
    }
  });

program
  .command('validate')
  .description('Validate migration results')
  .option('-v, --version <version>', 'NgRx version to validate')
  .action((options) => {
    console.log(`Validating NgRx ${options.version} migration...`);
    // Implementation would run validation checks
  });

program.parse();
```

This comprehensive migration strategy provides tools and services for both legacy-to-NgRx migrations and NgRx version upgrades, with proper testing, validation, and automation capabilities.

---

## NgRx DevTools and Debugging

### Q19: How do you effectively use NgRx DevTools for debugging and what are advanced debugging techniques?

**Answer:**
NgRx DevTools provide powerful debugging capabilities for state management, action tracking, time-travel debugging, and performance monitoring.

**1. Advanced DevTools Configuration:**

```typescript
// app.module.ts
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    StoreDevtoolsModule.instrument({
      name: 'MyApp DevTools',
      maxAge: 50, // Retain last 50 states
      logOnly: environment.production, // Restrict extension to log-only mode in production
      autoPause: true, // Pauses recording actions and state changes when extension window is not open
      trace: !environment.production, // Include stack trace for every dispatched action
      traceLimit: 75, // Maximum stack trace frames to be stored
      connectInZone: true, // Connect in Angular zone for better performance
      
      // Custom action sanitizer
      actionSanitizer: (action: any) => {
        if (action.type === '[Auth] Login Success') {
          return {
            ...action,
            payload: {
              ...action.payload,
              token: '***SANITIZED***' // Hide sensitive data
            }
          };
        }
        return action;
      },
      
      // Custom state sanitizer
      stateSanitizer: (state: any) => {
        return {
          ...state,
          auth: {
            ...state.auth,
            token: state.auth?.token ? '***SANITIZED***' : null,
            refreshToken: state.auth?.refreshToken ? '***SANITIZED***' : null
          }
        };
      },
      
      // Predicate to determine which actions to include
      predicate: (state: any, action: any) => {
        // Exclude noisy actions from DevTools
        const excludedActions = [
          '[Router] Navigation',
          '[UI] Mouse Move',
          '[WebSocket] Heartbeat'
        ];
        return !excludedActions.some(excluded => action.type.includes(excluded));
      },
      
      // Features configuration
      features: {
        pause: true, // Start/pause recording of actions
        lock: true, // Lock/unlock dispatching actions and side effects
        persist: true, // Persist states on page reloading
        export: true, // Export history of actions in a file
        import: 'custom', // Import history of actions from a file
        jump: true, // Jump back and forth (time travelling)
        skip: true, // Skip (cancel) actions
        reorder: true, // Drag and drop actions in the history list
        dispatch: true, // Dispatch custom actions or action creators
        test: true // Generate tests for the selected actions
      }
    })
  ]
})
export class AppModule {}
```

**2. Custom DevTools Extensions:**

```typescript
// debugging/custom-devtools.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

export interface DebugSession {
  id: string;
  name: string;
  startTime: Date;
  endTime?: Date;
  actions: any[];
  states: any[];
  performance: PerformanceMetrics;
  annotations: DebugAnnotation[];
}

export interface PerformanceMetrics {
  actionCount: number;
  averageActionTime: number;
  slowestActions: { action: any; duration: number }[];
  stateSize: number;
  memoryUsage: number;
}

export interface DebugAnnotation {
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'bookmark';
  message: string;
  action?: any;
  state?: any;
}

@Injectable({ providedIn: 'root' })
export class CustomDevToolsService {
  private debugSessions = new Map<string, DebugSession>();
  private currentSession: DebugSession | null = null;
  private actionTimings = new Map<string, number>();
  private annotationSubject = new Subject<DebugAnnotation>();
  
  constructor(
    private store: Store,
    private actions$: Actions
  ) {
    this.setupActionMonitoring();
    this.setupPerformanceMonitoring();
  }
  
  // Start debug session
  startDebugSession(name: string): string {
    const sessionId = this.generateSessionId();
    const session: DebugSession = {
      id: sessionId,
      name,
      startTime: new Date(),
      actions: [],
      states: [],
      performance: {
        actionCount: 0,
        averageActionTime: 0,
        slowestActions: [],
        stateSize: 0,
        memoryUsage: 0
      },
      annotations: []
    };
    
    this.debugSessions.set(sessionId, session);
    this.currentSession = session;
    
    this.addAnnotation({
      type: 'info',
      message: `Debug session '${name}' started`
    });
    
    return sessionId;
  }
  
  // End debug session
  endDebugSession(sessionId: string): DebugSession | null {
    const session = this.debugSessions.get(sessionId);
    if (session) {
      session.endTime = new Date();
      this.addAnnotation({
        type: 'info',
        message: `Debug session '${session.name}' ended`
      });
      
      if (this.currentSession?.id === sessionId) {
        this.currentSession = null;
      }
    }
    return session;
  }
  
  // Add annotation
  addAnnotation(annotation: Omit<DebugAnnotation, 'timestamp'>) {
    const fullAnnotation: DebugAnnotation = {
      ...annotation,
      timestamp: new Date()
    };
    
    if (this.currentSession) {
      this.currentSession.annotations.push(fullAnnotation);
    }
    
    this.annotationSubject.next(fullAnnotation);
    
    // Send to DevTools
    this.sendToDevTools('annotation', fullAnnotation);
  }
  
  // Setup action monitoring
  private setupActionMonitoring() {
    this.actions$.pipe(
      withLatestFrom(this.store),
      tap(([action, state]) => {
        if (this.currentSession) {
          this.currentSession.actions.push({
            ...action,
            timestamp: new Date()
          });
          
          this.currentSession.states.push({
            state: this.sanitizeState(state),
            timestamp: new Date()
          });
          
          this.currentSession.performance.actionCount++;
        }
        
        // Track action timing
        this.trackActionTiming(action);
      })
    ).subscribe();
  }
  
  // Setup performance monitoring
  private setupPerformanceMonitoring() {
    // Monitor action performance
    this.actions$.pipe(
      tap(action => {
        const startTime = performance.now();
        this.actionTimings.set(action.type, startTime);
        
        // Use setTimeout to measure action completion time
        setTimeout(() => {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          if (this.currentSession) {
            this.updatePerformanceMetrics(action, duration);
          }
          
          // Warn about slow actions
          if (duration > 100) {
            this.addAnnotation({
              type: 'warning',
              message: `Slow action detected: ${action.type} took ${duration.toFixed(2)}ms`,
              action
            });
          }
        }, 0);
      })
    ).subscribe();
    
    // Monitor memory usage
    setInterval(() => {
      if (this.currentSession && (performance as any).memory) {
        this.currentSession.performance.memoryUsage = (performance as any).memory.usedJSHeapSize;
      }
    }, 5000);
  }
  
  // Track action timing
  private trackActionTiming(action: any) {
    const actionType = action.type;
    const timestamp = performance.now();
    
    // Store timing for analysis
    this.actionTimings.set(`${actionType}_${timestamp}`, timestamp);
  }
  
  // Update performance metrics
  private updatePerformanceMetrics(action: any, duration: number) {
    if (!this.currentSession) return;
    
    const metrics = this.currentSession.performance;
    
    // Update average action time
    const totalTime = metrics.averageActionTime * (metrics.actionCount - 1) + duration;
    metrics.averageActionTime = totalTime / metrics.actionCount;
    
    // Track slowest actions
    metrics.slowestActions.push({ action, duration });
    metrics.slowestActions.sort((a, b) => b.duration - a.duration);
    metrics.slowestActions = metrics.slowestActions.slice(0, 10); // Keep top 10
  }
  
  // Sanitize state for storage
  private sanitizeState(state: any): any {
    // Remove circular references and large objects
    return JSON.parse(JSON.stringify(state, (key, value) => {
      if (key.includes('password') || key.includes('token')) {
        return '***SANITIZED***';
      }
      return value;
    }));
  }
  
  // Send data to DevTools
  private sendToDevTools(type: string, data: any) {
    if (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
      (window as any).__REDUX_DEVTOOLS_EXTENSION__.send(
        { type: `[Debug] ${type}`, payload: data },
        data
      );
    }
  }
  
  // Generate session ID
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Get debug session
  getDebugSession(sessionId: string): DebugSession | undefined {
    return this.debugSessions.get(sessionId);
  }
  
  // Get all debug sessions
  getAllDebugSessions(): DebugSession[] {
    return Array.from(this.debugSessions.values());
  }
  
  // Export debug session
  exportDebugSession(sessionId: string): string {
    const session = this.debugSessions.get(sessionId);
    if (!session) {
      throw new Error(`Debug session ${sessionId} not found`);
    }
    
    return JSON.stringify(session, null, 2);
  }
  
  // Import debug session
  importDebugSession(sessionData: string): string {
    const session: DebugSession = JSON.parse(sessionData);
    const newSessionId = this.generateSessionId();
    session.id = newSessionId;
    
    this.debugSessions.set(newSessionId, session);
    return newSessionId;
  }
  
  // Get annotations observable
  getAnnotations(): Observable<DebugAnnotation> {
    return this.annotationSubject.asObservable();
  }
}
```

**3. State Inspection Utilities:**

```typescript
// debugging/state-inspector.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';

export interface StateInspectionResult {
  path: string;
  value: any;
  type: string;
  size: number;
  lastChanged: Date;
  changeFrequency: number;
}

export interface StateDiff {
  path: string;
  oldValue: any;
  newValue: any;
  changeType: 'added' | 'removed' | 'modified';
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class StateInspectorService {
  private stateHistory: any[] = [];
  private changeTracking = new Map<string, { count: number; lastChange: Date }>();
  
  constructor(private store: Store) {
    this.setupStateTracking();
  }
  
  // Setup state change tracking
  private setupStateTracking() {
    this.store.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(state => {
      this.stateHistory.push({
        state: this.deepClone(state),
        timestamp: new Date()
      });
      
      // Keep only last 100 states
      if (this.stateHistory.length > 100) {
        this.stateHistory.shift();
      }
      
      this.trackStateChanges(state);
    });
  }
  
  // Inspect state at path
  inspectState(path: string): Observable<StateInspectionResult> {
    return this.store.pipe(
      map(state => this.getValueAtPath(state, path)),
      distinctUntilChanged(),
      map(value => {
        const tracking = this.changeTracking.get(path);
        return {
          path,
          value,
          type: this.getValueType(value),
          size: this.calculateSize(value),
          lastChanged: tracking?.lastChange || new Date(),
          changeFrequency: tracking?.count || 0
        };
      })
    );
  }
  
  // Get state differences between two points in time
  getStateDiff(fromIndex: number, toIndex: number): StateDiff[] {
    if (fromIndex >= this.stateHistory.length || toIndex >= this.stateHistory.length) {
      throw new Error('Invalid state history index');
    }
    
    const fromState = this.stateHistory[fromIndex].state;
    const toState = this.stateHistory[toIndex].state;
    
    return this.calculateDiff(fromState, toState, '');
  }
  
  // Calculate differences between two states
  private calculateDiff(oldState: any, newState: any, basePath: string): StateDiff[] {
    const diffs: StateDiff[] = [];
    
    // Check for added/modified properties
    for (const key in newState) {
      const currentPath = basePath ? `${basePath}.${key}` : key;
      const oldValue = oldState?.[key];
      const newValue = newState[key];
      
      if (!(key in oldState)) {
        diffs.push({
          path: currentPath,
          oldValue: undefined,
          newValue,
          changeType: 'added',
          timestamp: new Date()
        });
      } else if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        if (typeof newValue === 'object' && newValue !== null) {
          diffs.push(...this.calculateDiff(oldValue, newValue, currentPath));
        } else {
          diffs.push({
            path: currentPath,
            oldValue,
            newValue,
            changeType: 'modified',
            timestamp: new Date()
          });
        }
      }
    }
    
    // Check for removed properties
    for (const key in oldState) {
      if (!(key in newState)) {
        const currentPath = basePath ? `${basePath}.${key}` : key;
        diffs.push({
          path: currentPath,
          oldValue: oldState[key],
          newValue: undefined,
          changeType: 'removed',
          timestamp: new Date()
        });
      }
    }
    
    return diffs;
  }
  
  // Track state changes
  private trackStateChanges(state: any) {
    this.traverseState(state, '', (path, value) => {
      const existing = this.changeTracking.get(path);
      if (existing) {
        existing.count++;
        existing.lastChange = new Date();
      } else {
        this.changeTracking.set(path, {
          count: 1,
          lastChange: new Date()
        });
      }
    });
  }
  
  // Traverse state object
  private traverseState(obj: any, basePath: string, callback: (path: string, value: any) => void) {
    for (const key in obj) {
      const currentPath = basePath ? `${basePath}.${key}` : key;
      const value = obj[key];
      
      callback(currentPath, value);
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.traverseState(value, currentPath, callback);
      }
    }
  }
  
  // Get value at path
  private getValueAtPath(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  
  // Get value type
  private getValueType(value: any): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }
  
  // Calculate object size
  private calculateSize(obj: any): number {
    return JSON.stringify(obj).length;
  }
  
  // Deep clone object
  private deepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
  
  // Get state history
  getStateHistory(): any[] {
    return this.stateHistory;
  }
  
  // Get change frequency report
  getChangeFrequencyReport(): { path: string; frequency: number; lastChange: Date }[] {
    return Array.from(this.changeTracking.entries())
      .map(([path, tracking]) => ({
        path,
        frequency: tracking.count,
        lastChange: tracking.lastChange
      }))
      .sort((a, b) => b.frequency - a.frequency);
  }
  
  // Clear tracking data
  clearTracking() {
    this.stateHistory = [];
    this.changeTracking.clear();
  }
}
```

**4. Action Replay and Testing:**

```typescript
// debugging/action-replay.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable, Subject, timer } from 'rxjs';
import { take, delay } from 'rxjs/operators';

export interface ActionRecording {
  id: string;
  name: string;
  actions: RecordedAction[];
  initialState: any;
  finalState: any;
  duration: number;
  createdAt: Date;
}

export interface RecordedAction {
  action: any;
  timestamp: number;
  relativeTime: number;
  resultingState?: any;
}

@Injectable({ providedIn: 'root' })
export class ActionReplayService {
  private recordings = new Map<string, ActionRecording>();
  private currentRecording: ActionRecording | null = null;
  private recordingStartTime: number = 0;
  private replaySubject = new Subject<{ action: any; delay: number }>();
  
  constructor(
    private store: Store,
    private actions$: Actions
  ) {}
  
  // Start recording actions
  startRecording(name: string): string {
    const recordingId = this.generateRecordingId();
    
    // Get initial state
    let initialState: any;
    this.store.pipe(take(1)).subscribe(state => {
      initialState = this.deepClone(state);
    });
    
    this.currentRecording = {
      id: recordingId,
      name,
      actions: [],
      initialState,
      finalState: null,
      duration: 0,
      createdAt: new Date()
    };
    
    this.recordingStartTime = performance.now();
    
    // Subscribe to actions
    this.actions$.subscribe(action => {
      if (this.currentRecording) {
        const timestamp = performance.now();
        const relativeTime = timestamp - this.recordingStartTime;
        
        this.currentRecording.actions.push({
          action: this.deepClone(action),
          timestamp,
          relativeTime
        });
      }
    });
    
    return recordingId;
  }
  
  // Stop recording
  stopRecording(): ActionRecording | null {
    if (!this.currentRecording) {
      return null;
    }
    
    // Get final state
    this.store.pipe(take(1)).subscribe(state => {
      if (this.currentRecording) {
        this.currentRecording.finalState = this.deepClone(state);
        this.currentRecording.duration = performance.now() - this.recordingStartTime;
      }
    });
    
    // Store recording
    this.recordings.set(this.currentRecording.id, this.currentRecording);
    
    const recording = this.currentRecording;
    this.currentRecording = null;
    
    return recording;
  }
  
  // Replay actions
  async replayActions(recordingId: string, options: {
    speed?: number; // 1 = normal speed, 2 = 2x speed, 0.5 = half speed
    skipDelay?: boolean;
    startFromAction?: number;
    endAtAction?: number;
  } = {}): Promise<void> {
    const recording = this.recordings.get(recordingId);
    if (!recording) {
      throw new Error(`Recording ${recordingId} not found`);
    }
    
    const {
      speed = 1,
      skipDelay = false,
      startFromAction = 0,
      endAtAction = recording.actions.length
    } = options;
    
    // Reset to initial state
    this.store.dispatch({
      type: '[Replay] Reset State',
      payload: recording.initialState
    });
    
    // Replay actions
    const actionsToReplay = recording.actions.slice(startFromAction, endAtAction);
    
    for (let i = 0; i < actionsToReplay.length; i++) {
      const recordedAction = actionsToReplay[i];
      const nextAction = actionsToReplay[i + 1];
      
      // Dispatch action
      this.store.dispatch(recordedAction.action);
      
      // Wait for next action if not skipping delay
      if (!skipDelay && nextAction) {
        const delay = (nextAction.relativeTime - recordedAction.relativeTime) / speed;
        await timer(delay).pipe(take(1)).toPromise();
      }
    }
  }
  
  // Generate test cases from recording
  generateTestCases(recordingId: string): string {
    const recording = this.recordings.get(recordingId);
    if (!recording) {
      throw new Error(`Recording ${recordingId} not found`);
    }
    
    let testCode = `
// Generated test for recording: ${recording.name}
describe('${recording.name}', () => {
  let store: MockStore;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: ${JSON.stringify(recording.initialState, null, 6)} })]
    });
    store = TestBed.inject(MockStore);
  });
  
  it('should replay actions correctly', () => {
`;
    
    recording.actions.forEach((recordedAction, index) => {
      testCode += `
    // Action ${index + 1}: ${recordedAction.action.type}
    store.dispatch(${JSON.stringify(recordedAction.action, null, 6)});
`;
    });
    
    testCode += `
    // Verify final state
    store.pipe(take(1)).subscribe(state => {
      expect(state).toEqual(${JSON.stringify(recording.finalState, null, 6)});
    });
  });
});
`;
    
    return testCode;
  }
  
  // Get recording
  getRecording(recordingId: string): ActionRecording | undefined {
    return this.recordings.get(recordingId);
  }
  
  // Get all recordings
  getAllRecordings(): ActionRecording[] {
    return Array.from(this.recordings.values());
  }
  
  // Export recording
  exportRecording(recordingId: string): string {
    const recording = this.recordings.get(recordingId);
    if (!recording) {
      throw new Error(`Recording ${recordingId} not found`);
    }
    
    return JSON.stringify(recording, null, 2);
  }
  
  // Import recording
  importRecording(recordingData: string): string {
    const recording: ActionRecording = JSON.parse(recordingData);
    const newRecordingId = this.generateRecordingId();
    recording.id = newRecordingId;
    
    this.recordings.set(newRecordingId, recording);
    return newRecordingId;
  }
  
  // Delete recording
  deleteRecording(recordingId: string): boolean {
    return this.recordings.delete(recordingId);
  }
  
  // Generate recording ID
  private generateRecordingId(): string {
    return `recording_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Deep clone object
  private deepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}
```

These advanced debugging tools provide comprehensive state inspection, action recording/replay, performance monitoring, and automated test generation capabilities for NgRx applications.

---

## NgRx Enterprise Patterns

### Q20: What are the best practices and patterns for implementing NgRx in large-scale enterprise applications?

**Answer:**
Enterprise NgRx applications require sophisticated patterns for scalability, maintainability, team collaboration, and performance optimization.

**1. Enterprise State Architecture:**

```typescript
// shared/state/enterprise-state.interface.ts
export interface EnterpriseAppState {
  // Core application state
  core: CoreState;
  
  // Feature modules state
  features: {
    [featureName: string]: any;
  };
  
  // Shared state across features
  shared: SharedState;
  
  // Runtime configuration
  runtime: RuntimeState;
  
  // User context and permissions
  user: UserState;
  
  // Application metadata
  metadata: MetadataState;
}

export interface CoreState {
  loading: LoadingState;
  errors: ErrorState;
  notifications: NotificationState;
  navigation: NavigationState;
  theme: ThemeState;
}

export interface SharedState {
  cache: CacheState;
  lookup: LookupState;
  configuration: ConfigurationState;
  audit: AuditState;
}

export interface RuntimeState {
  environment: EnvironmentInfo;
  features: FeatureFlags;
  performance: PerformanceMetrics;
  monitoring: MonitoringState;
}

export interface UserState {
  profile: UserProfile;
  permissions: Permission[];
  preferences: UserPreferences;
  session: SessionInfo;
  roles: Role[];
}

export interface MetadataState {
  version: string;
  buildInfo: BuildInfo;
  dependencies: DependencyInfo[];
  healthChecks: HealthCheck[];
}
```

**2. Feature Module State Management:**

```typescript
// shared/state/feature-state.factory.ts
import { Injectable, InjectionToken } from '@angular/core';
import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const FEATURE_STATE_TOKEN = new InjectionToken<string>('FeatureStateToken');

export interface FeatureStateConfig {
  featureName: string;
  reducers: ActionReducerMap<any>;
  effects?: any[];
  metaReducers?: MetaReducer<any>[];
  initialState?: any;
  storageKeys?: string[];
  permissions?: string[];
}

@Injectable({ providedIn: 'root' })
export class FeatureStateFactory {
  private registeredFeatures = new Map<string, FeatureStateConfig>();
  
  // Register feature state
  registerFeature(config: FeatureStateConfig): void {
    if (this.registeredFeatures.has(config.featureName)) {
      console.warn(`Feature ${config.featureName} is already registered`);
      return;
    }
    
    // Validate feature configuration
    this.validateFeatureConfig(config);
    
    // Add enterprise meta-reducers
    config.metaReducers = [
      ...config.metaReducers || [],
      this.createAuditMetaReducer(config.featureName),
      this.createPerformanceMetaReducer(config.featureName),
      this.createValidationMetaReducer(config.featureName)
    ];
    
    this.registeredFeatures.set(config.featureName, config);
    
    console.log(`Feature ${config.featureName} registered successfully`);
  }
  
  // Get feature configuration
  getFeatureConfig(featureName: string): FeatureStateConfig | undefined {
    return this.registeredFeatures.get(featureName);
  }
  
  // Create feature selector
  createFeatureSelector<T>(featureName: string) {
    return createFeatureSelector<T>(featureName);
  }
  
  // Validate feature configuration
  private validateFeatureConfig(config: FeatureStateConfig): void {
    if (!config.featureName) {
      throw new Error('Feature name is required');
    }
    
    if (!config.reducers) {
      throw new Error('Feature reducers are required');
    }
    
    // Validate naming conventions
    if (!/^[a-z][a-zA-Z0-9]*$/.test(config.featureName)) {
      throw new Error('Feature name must follow camelCase convention');
    }
  }
  
  // Create audit meta-reducer
  private createAuditMetaReducer(featureName: string): MetaReducer<any> {
    return (reducer) => {
      return (state, action) => {
        const newState = reducer(state, action);
        
        // Log state changes for audit
        if (!environment.production && state !== newState) {
          console.log(`[${featureName}] State changed:`, {
            action: action.type,
            previousState: state,
            newState,
            timestamp: new Date().toISOString()
          });
        }
        
        return newState;
      };
    };
  }
  
  // Create performance meta-reducer
  private createPerformanceMetaReducer(featureName: string): MetaReducer<any> {
    return (reducer) => {
      return (state, action) => {
        const startTime = performance.now();
        const newState = reducer(state, action);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Warn about slow reducers
        if (duration > 10) {
          console.warn(`[${featureName}] Slow reducer detected:`, {
            action: action.type,
            duration: `${duration.toFixed(2)}ms`
          });
        }
        
        return newState;
      };
    };
  }
  
  // Create validation meta-reducer
  private createValidationMetaReducer(featureName: string): MetaReducer<any> {
    return (reducer) => {
      return (state, action) => {
        try {
          const newState = reducer(state, action);
          
          // Validate state structure
          this.validateStateStructure(newState, featureName);
          
          return newState;
        } catch (error) {
          console.error(`[${featureName}] State validation failed:`, error);
          return state; // Return previous state on validation error
        }
      };
    };
  }
  
  // Validate state structure
  private validateStateStructure(state: any, featureName: string): void {
    if (state === null || state === undefined) {
      throw new Error(`State cannot be null or undefined for feature ${featureName}`);
    }
    
    // Check for circular references
    try {
      JSON.stringify(state);
    } catch (error) {
      throw new Error(`Circular reference detected in ${featureName} state`);
    }
  }
}
```

**3. Enterprise Effects Management:**

```typescript
// shared/effects/enterprise-effects.service.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of, timer, EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap, debounceTime, retry, timeout, withLatestFrom } from 'rxjs/operators';

export interface EffectConfig {
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
  debounce?: number;
  requiresAuth?: boolean;
  requiresPermission?: string[];
  cacheable?: boolean;
  cacheKey?: string;
  priority?: 'high' | 'medium' | 'low';
}

@Injectable()
export class EnterpriseEffectsService {
  private effectsRegistry = new Map<string, EffectConfig>();
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
  
  // Create enterprise effect with advanced configuration
  createEffect<T>(
    effectName: string,
    actionType: string,
    effectFn: (action: any) => Observable<any>,
    config: EffectConfig = {}
  ): Observable<any> {
    this.effectsRegistry.set(effectName, config);
    
    return createEffect(() =>
      this.actions$.pipe(
        ofType(actionType),
        
        // Apply debouncing if configured
        config.debounce ? debounceTime(config.debounce) : (source) => source,
        
        // Check authentication and permissions
        withLatestFrom(this.store),
        mergeMap(([action, state]) => {
          // Check authentication
          if (config.requiresAuth && !this.isAuthenticated(state)) {
            return of({ type: '[Auth] Authentication Required', payload: { action } });
          }
          
          // Check permissions
          if (config.requiresPermission && !this.hasPermissions(state, config.requiresPermission)) {
            return of({ type: '[Auth] Insufficient Permissions', payload: { action, requiredPermissions: config.requiresPermission } });
          }
          
          // Check cache if cacheable
          if (config.cacheable && config.cacheKey) {
            const cacheKey = this.generateCacheKey(config.cacheKey, action);
            const cachedData = this.getFromCache(cacheKey);
            if (cachedData) {
              return of({ type: `${actionType} Success`, payload: cachedData });
            }
          }
          
          // Execute effect with error handling and retry logic
          return effectFn(action).pipe(
            // Apply timeout if configured
            config.timeout ? timeout(config.timeout) : (source) => source,
            
            // Apply retry logic
            retry({
              count: config.retryAttempts || 3,
              delay: (error, retryCount) => {
                const delay = (config.retryDelay || 1000) * Math.pow(2, retryCount - 1);
                console.warn(`Effect ${effectName} retry ${retryCount}/${config.retryAttempts || 3} after ${delay}ms`, error);
                return timer(delay);
              }
            }),
            
            // Handle success
            map(result => {
              // Cache result if cacheable
              if (config.cacheable && config.cacheKey) {
                const cacheKey = this.generateCacheKey(config.cacheKey, action);
                this.setCache(cacheKey, result, 300000); // 5 minutes default TTL
              }
              
              return { type: `${actionType} Success`, payload: result };
            }),
            
            // Handle errors
            catchError(error => {
              console.error(`Effect ${effectName} failed:`, error);
              
              return of({
                type: `${actionType} Failure`,
                payload: {
                  error: this.sanitizeError(error),
                  action,
                  effectName,
                  timestamp: new Date().toISOString()
                }
              });
            })
          );
        })
      )
    );
  }
  
  // Check if user is authenticated
  private isAuthenticated(state: any): boolean {
    return state.user?.session?.isAuthenticated || false;
  }
  
  // Check if user has required permissions
  private hasPermissions(state: any, requiredPermissions: string[]): boolean {
    const userPermissions = state.user?.permissions || [];
    return requiredPermissions.every(permission => 
      userPermissions.some((userPerm: any) => userPerm.name === permission)
    );
  }
  
  // Generate cache key
  private generateCacheKey(template: string, action: any): string {
    return template.replace(/\{([^}]+)\}/g, (match, key) => {
      return action.payload?.[key] || action[key] || match;
    });
  }
  
  // Get from cache
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    
    if (cached) {
      this.cache.delete(key); // Remove expired cache
    }
    
    return null;
  }
  
  // Set cache
  private setCache(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }
  
  // Sanitize error for logging
  private sanitizeError(error: any): any {
    return {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      timestamp: new Date().toISOString()
    };
  }
  
  // Clear cache
  clearCache(pattern?: string): void {
    if (pattern) {
      const regex = new RegExp(pattern);
      for (const key of this.cache.keys()) {
        if (regex.test(key)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }
  
  // Get effect statistics
  getEffectStatistics(): { name: string; config: EffectConfig }[] {
    return Array.from(this.effectsRegistry.entries()).map(([name, config]) => ({ name, config }));
  }
}
```

**4. Enterprise State Persistence:**

```typescript
// shared/state/state-persistence.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

export interface PersistenceConfig {
  key: string;
  storage: 'localStorage' | 'sessionStorage' | 'indexedDB';
  whitelist?: string[];
  blacklist?: string[];
  encrypt?: boolean;
  compress?: boolean;
  version?: number;
  migrate?: (state: any, version: number) => any;
  throttle?: number;
}

@Injectable({ providedIn: 'root' })
export class StatePersistenceService {
  private persistenceConfigs = new Map<string, PersistenceConfig>();
  private encryptionKey = 'enterprise-app-key'; // Should be from secure config
  
  constructor(private store: Store) {
    this.setupAutoSave();
    this.setupVisibilityHandling();
  }
  
  // Configure state persistence
  configurePersistence(config: PersistenceConfig): void {
    this.persistenceConfigs.set(config.key, config);
    
    // Load persisted state
    this.loadPersistedState(config);
    
    // Setup state saving
    this.setupStateSaving(config);
  }
  
  // Load persisted state
  private async loadPersistedState(config: PersistenceConfig): Promise<void> {
    try {
      const persistedData = await this.getFromStorage(config.key, config.storage);
      
      if (persistedData) {
        let state = persistedData.state;
        
        // Handle version migration
        if (config.version && persistedData.version !== config.version) {
          if (config.migrate) {
            state = config.migrate(state, persistedData.version);
          } else {
            console.warn(`State version mismatch for ${config.key}. Skipping load.`);
            return;
          }
        }
        
        // Decrypt if needed
        if (config.encrypt) {
          state = this.decrypt(state);
        }
        
        // Decompress if needed
        if (config.compress) {
          state = this.decompress(state);
        }
        
        // Filter state based on whitelist/blacklist
        state = this.filterState(state, config);
        
        // Dispatch restore action
        this.store.dispatch({
          type: '[Persistence] Restore State',
          payload: { key: config.key, state }
        });
      }
    } catch (error) {
      console.error(`Failed to load persisted state for ${config.key}:`, error);
    }
  }
  
  // Setup state saving
  private setupStateSaving(config: PersistenceConfig): void {
    this.store.pipe(
      debounceTime(config.throttle || 1000),
      distinctUntilChanged(),
      filter(state => this.shouldPersistState(state, config))
    ).subscribe(async state => {
      try {
        await this.saveState(state, config);
      } catch (error) {
        console.error(`Failed to save state for ${config.key}:`, error);
      }
    });
  }
  
  // Save state
  private async saveState(state: any, config: PersistenceConfig): Promise<void> {
    let stateToSave = this.filterState(state, config);
    
    // Compress if needed
    if (config.compress) {
      stateToSave = this.compress(stateToSave);
    }
    
    // Encrypt if needed
    if (config.encrypt) {
      stateToSave = this.encrypt(stateToSave);
    }
    
    const persistData = {
      state: stateToSave,
      version: config.version || 1,
      timestamp: Date.now()
    };
    
    await this.setToStorage(config.key, persistData, config.storage);
  }
  
  // Filter state based on whitelist/blacklist
  private filterState(state: any, config: PersistenceConfig): any {
    if (config.whitelist) {
      const filtered: any = {};
      config.whitelist.forEach(key => {
        if (state[key] !== undefined) {
          filtered[key] = state[key];
        }
      });
      return filtered;
    }
    
    if (config.blacklist) {
      const filtered = { ...state };
      config.blacklist.forEach(key => {
        delete filtered[key];
      });
      return filtered;
    }
    
    return state;
  }
  
  // Check if state should be persisted
  private shouldPersistState(state: any, config: PersistenceConfig): boolean {
    // Add custom logic to determine if state should be persisted
    // For example, don't persist if user is not authenticated
    return true;
  }
  
  // Storage operations
  private async getFromStorage(key: string, storage: string): Promise<any> {
    switch (storage) {
      case 'localStorage':
        const localData = localStorage.getItem(key);
        return localData ? JSON.parse(localData) : null;
        
      case 'sessionStorage':
        const sessionData = sessionStorage.getItem(key);
        return sessionData ? JSON.parse(sessionData) : null;
        
      case 'indexedDB':
        return this.getFromIndexedDB(key);
        
      default:
        throw new Error(`Unsupported storage type: ${storage}`);
    }
  }
  
  private async setToStorage(key: string, data: any, storage: string): Promise<void> {
    const serializedData = JSON.stringify(data);
    
    switch (storage) {
      case 'localStorage':
        localStorage.setItem(key, serializedData);
        break;
        
      case 'sessionStorage':
        sessionStorage.setItem(key, serializedData);
        break;
        
      case 'indexedDB':
        await this.setToIndexedDB(key, data);
        break;
        
      default:
        throw new Error(`Unsupported storage type: ${storage}`);
    }
  }
  
  // IndexedDB operations
  private async getFromIndexedDB(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('EnterpriseAppDB', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['state'], 'readonly');
        const store = transaction.objectStore('state');
        const getRequest = store.get(key);
        
        getRequest.onsuccess = () => resolve(getRequest.result?.data);
        getRequest.onerror = () => reject(getRequest.error);
      };
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('state')) {
          db.createObjectStore('state', { keyPath: 'key' });
        }
      };
    });
  }
  
  private async setToIndexedDB(key: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('EnterpriseAppDB', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['state'], 'readwrite');
        const store = transaction.objectStore('state');
        const putRequest = store.put({ key, data });
        
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      };
    });
  }
  
  // Encryption/Decryption (simplified - use proper crypto library in production)
  private encrypt(data: any): string {
    // Implement proper encryption
    return btoa(JSON.stringify(data));
  }
  
  private decrypt(encryptedData: string): any {
    // Implement proper decryption
    return JSON.parse(atob(encryptedData));
  }
  
  // Compression/Decompression (simplified)
  private compress(data: any): string {
    // Implement proper compression (e.g., using pako)
    return JSON.stringify(data);
  }
  
  private decompress(compressedData: string): any {
    // Implement proper decompression
    return JSON.parse(compressedData);
  }
  
  // Setup auto-save on page unload
  private setupAutoSave(): void {
    fromEvent(window, 'beforeunload').subscribe(() => {
      // Force save all configured states
      this.persistenceConfigs.forEach(async (config) => {
        this.store.pipe().subscribe(async state => {
          await this.saveState(state, config);
        });
      });
    });
  }
  
  // Setup visibility change handling
  private setupVisibilityHandling(): void {
    fromEvent(document, 'visibilitychange').subscribe(() => {
      if (document.hidden) {
        // Save state when page becomes hidden
        this.persistenceConfigs.forEach(async (config) => {
          this.store.pipe().subscribe(async state => {
            await this.saveState(state, config);
          });
        });
      }
    });
  }
  
  // Clear persisted state
  async clearPersistedState(key: string): Promise<void> {
    const config = this.persistenceConfigs.get(key);
    if (config) {
      switch (config.storage) {
        case 'localStorage':
          localStorage.removeItem(key);
          break;
        case 'sessionStorage':
          sessionStorage.removeItem(key);
          break;
        case 'indexedDB':
          // Implement IndexedDB removal
          break;
      }
    }
  }
  
  // Get persistence statistics
  getPersistenceStatistics(): { key: string; size: number; lastSaved: number }[] {
    const stats: { key: string; size: number; lastSaved: number }[] = [];
    
    this.persistenceConfigs.forEach((config, key) => {
      let size = 0;
      let lastSaved = 0;
      
      try {
        const data = localStorage.getItem(key) || sessionStorage.getItem(key);
        if (data) {
          size = new Blob([data]).size;
          const parsed = JSON.parse(data);
          lastSaved = parsed.timestamp || 0;
        }
      } catch (error) {
        console.warn(`Failed to get statistics for ${key}:`, error);
      }
      
      stats.push({ key, size, lastSaved });
    });
    
    return stats;
  }
}
```

These enterprise patterns provide comprehensive solutions for large-scale NgRx applications including advanced state architecture, feature management, effects handling, and state persistence with encryption and compression capabilities.