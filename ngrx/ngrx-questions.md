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