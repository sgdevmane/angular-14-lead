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