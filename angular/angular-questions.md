# Angular 14 Interview Questions

## Comprehensive preparation for Angular 14 Lead Software Engineer position at UST Global

### Table of Contents
1. [Angular Fundamentals](#angular-fundamentals)
2. [Components & Templates](#components--templates)
3. [Services & Dependency Injection](#services--dependency-injection)
4. [Routing & Navigation](#routing--navigation)
5. [Forms & Validation](#forms--validation)
6. [HTTP Client & Observables](#http-client--observables)
7. [Lifecycle Hooks](#lifecycle-hooks)
8. [Directives & Pipes](#directives--pipes)
9. [State Management](#state-management)
10. [Performance & Optimization](#performance--optimization)
11. [Testing](#testing)
12. [Angular 14 New Features](#angular-14-new-features)
13. [Angular 15+ Advanced Features](#angular-15-advanced-features-and-enterprise-patterns)
14. [Angular 16+ Signals](#angular-16-signals-and-reactive-programming-patterns)
15. [Angular 17+ SSR & Hydration](#angular-17-ssr-and-hydration-optimization)
16. [Advanced Architecture Patterns](#advanced-angular-architecture-and-patterns)
17. [Micro-frontends & Module Federation](#micro-frontends-with-angular-and-module-federation)
18. [Performance Optimization](#advanced-performance-optimization-techniques)
19. [Testing Strategies](#advanced-testing-strategies)
20. [Standalone Components](#standalone-components-and-the-new-angular-architecture)
21. [Enterprise Patterns](#advanced-angular-architecture-patterns)

---

## Angular Fundamentals

### Q1: What is Angular and what are its key features?
**Difficulty: Easy**

**Answer:**
Angular is a TypeScript-based, open-source web application framework developed by Google. It's a complete rewrite of AngularJS and follows a component-based architecture.

**Key Features:**

1. **Component-Based Architecture**: Applications are built as a tree of components
2. **TypeScript**: Built with TypeScript for better type safety and tooling
3. **Dependency Injection**: Built-in DI system for managing dependencies
4. **Two-Way Data Binding**: Automatic synchronization between model and view
5. **Reactive Programming**: Built on RxJS for handling asynchronous operations
6. **Modular Architecture**: NgModules for organizing application functionality
7. **Cross-Platform**: Web, mobile (Ionic), and desktop (Electron) development
8. **CLI Tool**: Angular CLI for scaffolding, building, and testing
9. **Routing**: Built-in router for single-page applications
10. **Forms**: Template-driven and reactive forms

```typescript
// Example Angular component
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
    <h1>{{ title }}</h1>
    <p>Welcome to {{ name }}!</p>
    <button (click)="onClick()">Click me</button>
  `,
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {
  title = 'Angular 14 App';
  name = 'UST Global';

  onClick() {
    console.log('Button clicked!');
  }
}
```

**Angular vs AngularJS:**
- Angular is a complete rewrite, not an upgrade
- Uses TypeScript instead of JavaScript
- Component-based instead of controller-based
- Better performance with change detection
- Mobile-first approach
- Better tooling and CLI support

---

### Q2: Explain the Angular architecture and its building blocks.
**Difficulty: Medium**

**Answer:**
Angular follows a hierarchical architecture with several key building blocks:

**1. Modules (NgModules)**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent], // Components, directives, pipes
  imports: [BrowserModule, UserModule], // Other modules
  providers: [], // Services
  bootstrap: [AppComponent] // Root component
})
export class AppModule { }
```

**2. Components**
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="onEdit()">Edit</button>
    </div>
  `,
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() editUser = new EventEmitter<User>();

  onEdit() {
    this.editUser.emit(this.user);
  }
}
```

**3. Services**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
```

**4. Directives**
```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

**5. Pipes**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
```

---

### Q3: What are Angular Standalone Components and how do they work?
**Difficulty: Medium**

**Answer:**
Standalone Components (Angular 14+) allow you to create components without NgModules, simplifying the application structure.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserService],
  template: `
    <div class="user-list">
      <input [(ngModel)]="searchTerm" placeholder="Search users...">
      <div *ngFor="let user of filteredUsers" class="user-item">
        {{ user.name }}
      </div>
    </div>
  `
})
export class UserListComponent {
  searchTerm = '';
  users: User[] = [];
  
  get filteredUsers() {
    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
```

**Bootstrapping Standalone Components:**
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // other providers
  ]
});
```

**Benefits:**
- Reduced boilerplate code
- Better tree-shaking
- Simplified testing
- Easier lazy loading
- More intuitive for developers coming from other frameworks

---

### Q4: Explain Angular Change Detection and OnPush strategy.
**Difficulty: Hard**

**Answer:**
Angular's change detection is the mechanism that keeps the view in sync with the component state.

**Default Change Detection:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
      <app-child [data]="childData"></app-child>
    </div>
  `
})
export class CounterComponent {
  count = 0;
  childData = { value: 0 };

  increment() {
    this.count++;
    // This will trigger change detection for entire component tree
    this.childData.value++; // Mutating object - not recommended
  }
}
```

**OnPush Change Detection:**
```typescript
import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-optimized-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p>Child Value: {{ data.value }}</p>
      <p>Internal Count: {{ internalCount }}</p>
      <button (click)="updateInternal()">Update Internal</button>
    </div>
  `
})
export class OptimizedChildComponent {
  @Input() data!: { value: number };
  internalCount = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  updateInternal() {
    this.internalCount++;
    // Manually trigger change detection
    this.cdr.markForCheck();
  }
}
```

**Best Practices for OnPush:**
```typescript
// Parent component with OnPush
@Component({
  selector: 'app-parent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-child [data]="childData$ | async"></app-child>
  `
})
export class ParentComponent {
  private dataSubject = new BehaviorSubject({ value: 0 });
  childData$ = this.dataSubject.asObservable();

  updateData() {
    // Create new object reference
    this.dataSubject.next({ value: this.dataSubject.value.value + 1 });
  }
}
```

**Change Detection Triggers:**
- DOM events (click, keyup, etc.)
- HTTP requests
- Timers (setTimeout, setInterval)
- Promises and Observables

---

### Q5: How do you implement lazy loading in Angular?
**Difficulty: Medium**

**Answer:**
Lazy loading allows you to load feature modules only when needed, improving initial load time.

**Route Configuration:**
```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'products',
    loadComponent: () => import('./products/product-list.component')
      .then(c => c.ProductListComponent) // Standalone component lazy loading
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules // Optional: preload after initial load
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Feature Module:**
```typescript
// users/users.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
```

**Feature Module Routing:**
```typescript
// users/users-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
```

**Custom Preloading Strategy:**
```typescript
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Only preload routes marked with data.preload = true
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
```

---

### Q6: Explain RxJS operators commonly used in Angular applications.
**Difficulty: Hard**

**Answer:**
RxJS operators are essential for handling asynchronous data streams in Angular.

**Creation Operators:**
```typescript
import { of, from, interval, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// of - creates observable from values
const numbers$ = of(1, 2, 3, 4, 5);

// from - creates observable from array, promise, or iterable
const fromArray$ = from([1, 2, 3]);
const fromPromise$ = from(fetch('/api/data'));

// interval - emits sequential numbers
const timer$ = interval(1000);

// fromEvent - creates observable from DOM events
const clicks$ = fromEvent(document, 'click');
```

**Transformation Operators:**
```typescript
import { map, switchMap, mergeMap, concatMap, exhaustMap } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  // map - transforms emitted values
  getUserNames(): Observable<string[]> {
    return this.http.get<User[]>('/api/users')
      .pipe(
        map(users => users.map(user => user.name))
      );
  }

  // switchMap - switches to new observable, cancels previous
  searchUsers(searchTerm$: Observable<string>): Observable<User[]> {
    return searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => 
        term ? this.http.get<User[]>(`/api/users?search=${term}`) : of([])
      )
    );
  }

  // mergeMap - merges multiple observables
  getUsersWithDetails(): Observable<UserWithDetails[]> {
    return this.http.get<User[]>('/api/users').pipe(
      mergeMap(users => 
        users.map(user => 
          this.http.get<UserDetails>(`/api/users/${user.id}/details`).pipe(
            map(details => ({ ...user, details }))
          )
        )
      )
    );
  }
}
```

**Filtering Operators:**
```typescript
import { filter, take, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
    <input #searchInput placeholder="Search...">
    <div *ngFor="let result of searchResults$ | async">
      {{ result.name }}
    </div>
  `
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;
  searchResults$!: Observable<SearchResult[]>;
  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchResults$ = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        filter(text => text.length > 2), // Only search if more than 2 characters
        debounceTime(300), // Wait 300ms after user stops typing
        distinctUntilChanged(), // Only search if term changed
        switchMap(term => this.searchService.search(term)),
        takeUntil(this.destroy$) // Unsubscribe on component destroy
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Error Handling Operators:**
```typescript
import { catchError, retry, retryWhen, delay } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get('/api/data').pipe(
      retry(3), // Retry up to 3 times
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to load data'));
      })
    );
  }

  getDataWithRetryDelay(): Observable<any> {
    return this.http.get('/api/data').pipe(
      retryWhen(errors => 
        errors.pipe(
          delay(1000), // Wait 1 second before retry
          take(3) // Maximum 3 retries
        )
      ),
      catchError(error => of([])) // Return empty array on final failure
    );
  }
}
```

---

### Q7: How do you implement micro-frontends with Angular?
**Difficulty: Hard**

**Answer:**
Micro-frontends allow you to break down a large application into smaller, independently deployable pieces.

**Module Federation Setup:**
```javascript
// webpack.config.js for shell application
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        userMfe: 'userMfe@http://localhost:4201/remoteEntry.js',
        productMfe: 'productMfe@http://localhost:4202/remoteEntry.js'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true }
      }
    })
  ]
};
```

**Remote Module Configuration:**
```javascript
// webpack.config.js for user micro-frontend
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'userMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './UserModule': './src/app/user/user.module.ts'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true }
      }
    })
  ]
};
```

**Dynamic Loading in Shell:**
```typescript
// app-routing.module.ts
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './UserModule'
    }).then(m => m.UserModule)
  },
  {
    path: 'products',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './ProductModule'
    }).then(m => m.ProductModule)
  }
];
```

**Shared Services Between Micro-frontends:**
```typescript
// shared-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
    // Broadcast to other micro-frontends
    window.postMessage({ type: 'USER_UPDATED', user }, '*');
  }

  constructor() {
    // Listen for messages from other micro-frontends
    window.addEventListener('message', (event) => {
      if (event.data.type === 'USER_UPDATED') {
        this.userSubject.next(event.data.user);
      }
    });
  }
}
```

**Communication Between Micro-frontends:**
```typescript
// event-bus.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface MfeEvent {
  type: string;
  payload: any;
  source: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventSubject = new Subject<MfeEvent>();

  emit(type: string, payload: any, source: string) {
    this.eventSubject.next({ type, payload, source });
  }

  on(eventType: string): Observable<any> {
    return this.eventSubject.pipe(
      filter(event => event.type === eventType),
      map(event => event.payload)
    );
  }
}
```

---

### Q8: Explain Angular Universal and Server-Side Rendering (SSR).
**Difficulty: Medium**

**Answer:**
Angular Universal enables server-side rendering, improving SEO and initial page load performance.

**Setup Angular Universal:**
```bash
ng add @nguniversal/express-engine
```

**Server Configuration:**
```typescript
// server.ts
import { ngExpressEngine } from '@nguniversal/express-engine';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import express from 'express';
import { AppServerModule } from './src/main.server';

const app = express();
const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Set the engine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Serve static files
app.get('*.*', express.static(DIST_FOLDER));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Platform-Specific Code:**
```typescript
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-platform-specific',
  template: `
    <div>
      <p>Platform: {{ platform }}</p>
      <div *ngIf="isBrowser">
        <p>Browser-only content</p>
        <canvas #canvas></canvas>
      </div>
    </div>
  `
})
export class PlatformSpecificComponent {
  platform: string;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.platform = this.isBrowser ? 'Browser' : 'Server';
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Browser-only code
      console.log('Running in browser');
      localStorage.setItem('visited', 'true');
    }
  }
}
```

**SEO Optimization:**
```typescript
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `
    <div *ngIf="product">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <img [src]="product.imageUrl" [alt]="product.name">
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe(product => {
        this.product = product;
        this.updateSEO(product);
      });
    }
  }

  private updateSEO(product: Product) {
    this.title.setTitle(`${product.name} - Our Store`);
    
    this.meta.updateTag({ name: 'description', content: product.description });
    this.meta.updateTag({ name: 'keywords', content: product.tags.join(', ') });
    
    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: product.name });
    this.meta.updateTag({ property: 'og:description', content: product.description });
    this.meta.updateTag({ property: 'og:image', content: product.imageUrl });
    
    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: product.name });
    this.meta.updateTag({ name: 'twitter:description', content: product.description });
  }
}
```

---

### Q9: How do you implement advanced form validation in Angular?
**Difficulty: Medium**

**Answer:**
Angular provides powerful form validation capabilities through reactive forms and custom validators.

**Custom Validators:**
```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Synchronous custom validator
export function emailDomainValidator(allowedDomain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const email = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    
    if (domain.toLowerCase() === allowedDomain.toLowerCase()) {
      return null;
    }
    
    return { emailDomain: { requiredDomain: allowedDomain, actualDomain: domain } };
  };
}

// Asynchronous validator
export function uniqueEmailValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    
    return userService.checkEmailExists(control.value).pipe(
      map(exists => exists ? { emailExists: true } : null),
      catchError(() => of(null))
    );
  };
}

// Cross-field validator
export function passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (!password || !confirmPassword) {
    return null;
  }
  
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};
```

**Complex Form Implementation:**
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-registration',
  template: `
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
      <!-- Personal Information -->
      <div formGroupName="personalInfo">
        <h3>Personal Information</h3>
        
        <div class="form-field">
          <label>First Name</label>
          <input formControlName="firstName" type="text">
          <div *ngIf="getFieldError('personalInfo.firstName') as error" class="error">
            <span *ngIf="error['required']">First name is required</span>
            <span *ngIf="error['minlength']">Minimum 2 characters required</span>
          </div>
        </div>
        
        <div class="form-field">
          <label>Email</label>
          <input formControlName="email" type="email">
          <div *ngIf="getFieldError('personalInfo.email') as error" class="error">
            <span *ngIf="error['required']">Email is required</span>
            <span *ngIf="error['email']">Invalid email format</span>
            <span *ngIf="error['emailDomain']">Email must be from {{ error['emailDomain'].requiredDomain }}</span>
            <span *ngIf="error['emailExists']">Email already exists</span>
          </div>
          <div *ngIf="isFieldPending('personalInfo.email')" class="pending">
            Checking email availability...
          </div>
        </div>
      </div>
      
      <!-- Password Section -->
      <div formGroupName="passwordGroup">
        <h3>Password</h3>
        
        <div class="form-field">
          <label>Password</label>
          <input formControlName="password" type="password">
          <div *ngIf="getFieldError('passwordGroup.password') as error" class="error">
            <span *ngIf="error['required']">Password is required</span>
            <span *ngIf="error['minlength']">Password must be at least 8 characters</span>
            <span *ngIf="error['pattern']">Password must contain uppercase, lowercase, number and special character</span>
          </div>
        </div>
        
        <div class="form-field">
          <label>Confirm Password</label>
          <input formControlName="confirmPassword" type="password">
          <div *ngIf="getFieldError('passwordGroup') as error" class="error">
            <span *ngIf="error['passwordMismatch']">Passwords do not match</span>
          </div>
        </div>
      </div>
      
      <!-- Dynamic Skills Array -->
      <div>
        <h3>Skills</h3>
        <div formArrayName="skills">
          <div *ngFor="let skill of skillsArray.controls; let i = index" [formGroupName]="i">
            <input formControlName="name" placeholder="Skill name">
            <select formControlName="level">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button type="button" (click)="removeSkill(i)">Remove</button>
          </div>
        </div>
        <button type="button" (click)="addSkill()">Add Skill</button>
      </div>
      
      <button type="submit" [disabled]="registrationForm.invalid">Register</button>
    </form>
    
    <!-- Form Debug Info -->
    <div class="debug" *ngIf="showDebug">
      <h4>Form Status</h4>
      <p>Valid: {{ registrationForm.valid }}</p>
      <p>Errors: {{ getFormErrors() | json }}</p>
      <p>Value: {{ registrationForm.value | json }}</p>
    </div>
  `
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  showDebug = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createForm();
    this.setupFormSubscriptions();
  }

  private createForm() {
    this.registrationForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: [
          '',
          [Validators.required, Validators.email, emailDomainValidator('company.com')],
          [uniqueEmailValidator(this.userService)]
        ]
      }),
      passwordGroup: this.fb.group({
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
          ]
        ],
        confirmPassword: ['', Validators.required]
      }, { validators: passwordMatchValidator }),
      skills: this.fb.array([this.createSkillGroup()])
    });
  }

  private createSkillGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['beginner', Validators.required]
    });
  }

  get skillsArray(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skillsArray.push(this.createSkillGroup());
  }

  removeSkill(index: number) {
    this.skillsArray.removeAt(index);
  }

  private setupFormSubscriptions() {
    // Watch for email changes and validate
    this.registrationForm.get('personalInfo.email')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(email => {
        if (email) {
          console.log('Email changed:', email);
        }
      });
  }

  getFieldError(fieldPath: string): any {
    const field = this.registrationForm.get(fieldPath);
    return field && field.invalid && (field.dirty || field.touched) ? field.errors : null;
  }

  isFieldPending(fieldPath: string): boolean {
    const field = this.registrationForm.get(fieldPath);
    return field ? field.pending : false;
  }

  getFormErrors(): any {
    let formErrors: any = {};
    
    Object.keys(this.registrationForm.controls).forEach(key => {
      const controlErrors = this.registrationForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });
    
    return formErrors;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      console.log('Form submitted:', formValue);
      // Process form submission
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.registrationForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
```

---

### Q10: How do you optimize Angular application performance?
**Difficulty: Hard**

**Answer:**
Angular performance optimization involves multiple strategies across different areas.

**Bundle Optimization:**
```typescript
// Lazy loading with preloading strategy
import { PreloadingStrategy, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}

// Usage in routing
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
    data: { preload: true }
  }
];
```

**Change Detection Optimization:**
```typescript
import { Component, ChangeDetectionStrategy, OnPush } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-optimized-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-container">
      <div 
        *ngFor="let item of items$ | async; trackBy: trackByFn" 
        class="list-item"
      >
        <app-item [data]="item"></app-item>
      </div>
    </div>
  `
})
export class OptimizedListComponent {
  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) {
    this.items$ = this.itemService.getItems();
  }

  trackByFn(index: number, item: Item): any {
    return item.id; // Use unique identifier for tracking
  }
}
```

**Virtual Scrolling for Large Lists:**
```typescript
import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-scroll',
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      <div *cdkVirtualFor="let item of items; trackBy: trackByFn" class="item">
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 400px;
      width: 100%;
    }
    .item {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      border-bottom: 1px solid #ccc;
    }
  `]
})
export class VirtualScrollComponent {
  items = Array.from({ length: 100000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
```

**Image Optimization:**
```typescript
@Component({
  selector: 'app-optimized-image',
  template: `
    <img 
      [src]="imageSrc" 
      [alt]="imageAlt"
      loading="lazy"
      [style.width.px]="imageWidth"
      [style.height.px]="imageHeight"
      (load)="onImageLoad()"
      (error)="onImageError()"
    >
  `
})
export class OptimizedImageComponent {
  @Input() imageSrc!: string;
  @Input() imageAlt!: string;
  @Input() imageWidth = 300;
  @Input() imageHeight = 200;

  onImageLoad() {
    console.log('Image loaded successfully');
  }

  onImageError() {
    console.log('Image failed to load');
    // Fallback to placeholder image
    this.imageSrc = '/assets/placeholder.jpg';
  }
}
```

**Service Worker for Caching:**
```typescript
// Add service worker
ng add @angular/pwa

// Custom service worker configuration
// ngsw-config.json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api-performance",
      "urls": ["/api/performance/**"],
      "cacheConfig": {
        "strategy": "performance",
        "maxSize": 100,
        "maxAge": "3d"
      }
    }
  ]
}
```

**Memory Leak Prevention:**
```typescript
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-leak-prevention',
  template: `<div>Component with proper cleanup</div>`
})
export class LeakPreventionComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) {
    // Proper subscription management
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log('Data received:', data);
      });

    // Multiple subscriptions
    this.dataService.getUpdates()
      .pipe(takeUntil(this.destroy$))
      .subscribe(update => {
        console.log('Update received:', update);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Performance Monitoring:**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  measureComponentLoad(componentName: string) {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      
      // Send to analytics
      this.sendPerformanceMetric(componentName, loadTime);
    };
  }

  private sendPerformanceMetric(component: string, time: number) {
    // Send to your analytics service
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/api/performance', JSON.stringify({
        component,
        loadTime: time,
        timestamp: Date.now()
      }));
    }
  }
}

// Usage in component
@Component({
  selector: 'app-monitored',
  template: `<div>Monitored component</div>`
})
export class MonitoredComponent implements OnInit {
  private measureLoad = this.performanceService.measureComponentLoad('MonitoredComponent');

  constructor(private performanceService: PerformanceService) {}

  ngOnInit() {
    // Component initialization logic
    setTimeout(() => {
      this.measureLoad(); // Call when component is fully loaded
    });
  }
}
```

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="onEdit()">Edit</button>
      <button (click)="onDelete()">Delete</button>
    </div>
  `,
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.user);
  }

  onDelete() {
    this.delete.emit(this.user.id);
  }
}
```

**3. Services**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        this.usersSubject.next(users);
        return users;
      }),
      catchError(this.handleError)
    );
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
```

**4. Directives**
```typescript
// Structural Directive
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

// Attribute Directive
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

**5. Pipes**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  pure: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

// Usage in template
// {{ longText | truncate:100:'...' }}
```

**Architecture Flow:**
1. **Bootstrap**: Angular starts by bootstrapping the root module
2. **Component Tree**: Creates a tree of components starting from root
3. **Dependency Injection**: Resolves and injects dependencies
4. **Change Detection**: Monitors and updates the view when data changes
5. **Event Handling**: Handles user interactions and updates the model

---

### Q3: What is dependency injection in Angular and how does it work?
**Difficulty: Medium**

**Answer:**
Dependency Injection (DI) is a design pattern where dependencies are provided to a class rather than the class creating them itself. Angular has a built-in DI system that manages the creation and lifetime of service instances.

**Key Concepts:**

**1. Injectable Services**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Singleton service available app-wide
})
export class LoggerService {
  log(message: string): void {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  error(message: string, error?: any): void {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error);
  }
}
```

**2. Provider Configuration**
```typescript
// Different ways to provide services

// Class provider
{ provide: LoggerService, useClass: LoggerService }

// Value provider
{ provide: 'API_URL', useValue: 'https://api.example.com' }

// Factory provider
{
  provide: DatabaseService,
  useFactory: (config: ConfigService) => {
    return new DatabaseService(config.getDatabaseUrl());
  },
  deps: [ConfigService]
}

// Existing provider (alias)
{ provide: 'Logger', useExisting: LoggerService }
```

**3. Injection in Components**
```typescript
import { Component, Inject } from '@angular/core';
import { LoggerService } from './logger.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `
})
export class UserListComponent {
  users$ = this.userService.getUsers();

  constructor(
    private userService: UserService,
    private logger: LoggerService,
    @Inject('API_URL') private apiUrl: string
  ) {
    this.logger.log('UserListComponent initialized');
    console.log('API URL:', this.apiUrl);
  }
}
```

**4. Hierarchical Injection**
```typescript
// Module level provider
@NgModule({
  providers: [
    { provide: 'FEATURE_CONFIG', useValue: { enableFeatureX: true } }
  ]
})
export class FeatureModule {}

// Component level provider
@Component({
  selector: 'app-special',
  providers: [
    { provide: LoggerService, useClass: SpecialLoggerService }
  ],
  template: '...'
})
export class SpecialComponent {
  // This will get SpecialLoggerService instead of the root LoggerService
  constructor(private logger: LoggerService) {}
}
```

**5. Injection Tokens**
```typescript
import { InjectionToken } from '@angular/core';

// Create injection token
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  apiEndpoint: string;
  production: boolean;
  version: string;
}

// Provide the token
@NgModule({
  providers: [
    {
      provide: APP_CONFIG,
      useValue: {
        apiEndpoint: 'https://api.example.com',
        production: false,
        version: '1.0.0'
      }
    }
  ]
})
export class AppModule {}

// Inject the token
@Component({...})
export class MyComponent {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    console.log('API Endpoint:', this.config.apiEndpoint);
  }
}
```

**6. Optional and Self Decorators**
```typescript
import { Component, Optional, Self, SkipSelf } from '@angular/core';

@Component({...})
export class MyComponent {
  constructor(
    @Optional() private optionalService: OptionalService, // Won't throw if not found
    @Self() private selfService: SelfService, // Only look in current injector
    @SkipSelf() private parentService: ParentService // Skip current, look in parent
  ) {}
}
```

**Benefits of DI:**
- **Testability**: Easy to mock dependencies for unit testing
- **Maintainability**: Loose coupling between classes
- **Flexibility**: Easy to swap implementations
- **Reusability**: Services can be shared across components
- **Lifecycle Management**: Angular manages service instances

---

### Q4: Explain Angular component lifecycle hooks.
**Difficulty: Medium**

**Answer:**
Angular component lifecycle hooks are methods that allow you to tap into key moments in a component's lifecycle, from creation to destruction.

**Lifecycle Hook Order:**

1. **ngOnChanges** - Called when input properties change
2. **ngOnInit** - Called once after first ngOnChanges
3. **ngDoCheck** - Called during every change detection run
4. **ngAfterContentInit** - Called once after content projection
5. **ngAfterContentChecked** - Called after every content check
6. **ngAfterViewInit** - Called once after view initialization
7. **ngAfterViewChecked** - Called after every view check
8. **ngOnDestroy** - Called just before component destruction

```typescript
import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lifecycle-demo',
  template: `
    <div>
      <h3>{{ title }}</h3>
      <p>Count: {{ count }}</p>
      <div #contentDiv>Content goes here</div>
      <ng-content></ng-content>
    </div>
  `
})
export class LifecycleDemoComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() title!: string;
  @Input() count!: number;
  @ViewChild('contentDiv') contentDiv!: ElementRef;

  private subscription = new Subscription();
  private previousCount = 0;

  constructor() {
    console.log('Constructor called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called', changes);
    
    // Check specific property changes
    if (changes['title']) {
      console.log('Title changed from', changes['title'].previousValue, 'to', changes['title'].currentValue);
    }
    
    if (changes['count'] && !changes['count'].firstChange) {
      console.log('Count changed from', changes['count'].previousValue, 'to', changes['count'].currentValue);
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    
    // Initialize component
    // Subscribe to observables
    // Set up initial data
    this.initializeComponent();
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
    
    // Custom change detection
    if (this.count !== this.previousCount) {
      console.log('Count changed detected in ngDoCheck');
      this.previousCount = this.count;
    }
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
    // Content projection is complete
    // Access projected content
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
    // Content has been checked
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    
    // View is fully initialized
    // Safe to access ViewChild elements
    if (this.contentDiv) {
      console.log('Content div element:', this.contentDiv.nativeElement);
    }
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
    // View has been checked
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
    
    // Cleanup
    this.subscription.unsubscribe();
    // Remove event listeners
    // Clear timers
    // Cancel HTTP requests
  }

  private initializeComponent(): void {
    // Component initialization logic
    console.log('Component initialized with title:', this.title);
  }
}
```

**Practical Usage Examples:**

**1. Data Fetching in ngOnInit**
```typescript
@Component({...})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  loading = true;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(+userId).subscribe({
        next: (user) => {
          this.user = user;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading user:', error);
          this.loading = false;
        }
      });
    }
  }
}
```

**2. Cleanup in ngOnDestroy**
```typescript
@Component({...})
export class TimerComponent implements OnInit, OnDestroy {
  private timerSubscription?: Subscription;
  private intervalId?: number;
  currentTime = new Date();

  ngOnInit(): void {
    // Observable subscription
    this.timerSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date();
    });

    // Native timer
    this.intervalId = window.setInterval(() => {
      console.log('Timer tick');
    }, 5000);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.timerSubscription?.unsubscribe();
    
    // Clear native timers
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

**3. Responding to Input Changes**
```typescript
@Component({...})
export class SearchComponent implements OnChanges {
  @Input() searchTerm!: string;
  @Input() filters!: SearchFilters;
  
  results: SearchResult[] = [];

  constructor(private searchService: SearchService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] || changes['filters']) {
      this.performSearch();
    }
  }

  private performSearch(): void {
    if (this.searchTerm && this.searchTerm.length > 2) {
      this.searchService.search(this.searchTerm, this.filters)
        .subscribe(results => this.results = results);
    } else {
      this.results = [];
    }
  }
}
```

**Best Practices:**
- Use `ngOnInit` for initialization logic, not the constructor
- Always unsubscribe in `ngOnDestroy` to prevent memory leaks
- Use `ngOnChanges` to react to input property changes
- Access ViewChild elements only after `ngAfterViewInit`
- Avoid heavy operations in `ngDoCheck` as it runs frequently
- Use `OnPush` change detection strategy when possible for better performance

---

### Q5: What are Angular directives and what are the different types?
**Difficulty: Medium**

**Answer:**
Angular directives are classes that add additional behavior to elements in your Angular applications. They are markers in the DOM that tell Angular to attach specific behavior to those elements.

**Types of Directives:**

**1. Component Directives**
Components are directives with templates. They are the most common type of directive.

```typescript
@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `
})
export class UserCardComponent {
  @Input() user!: User;
}
```

**2. Structural Directives**
Structural directives change the DOM layout by adding, removing, or replacing elements.

```typescript
// Built-in structural directives
// *ngIf
<div *ngIf="isVisible">This content is conditionally displayed</div>

// *ngFor
<ul>
  <li *ngFor="let item of items; let i = index; trackBy: trackByFn">
    {{ i + 1 }}. {{ item.name }}
  </li>
</ul>

// *ngSwitch
<div [ngSwitch]="userRole">
  <admin-panel *ngSwitchCase="'admin'"></admin-panel>
  <user-panel *ngSwitchCase="'user'"></user-panel>
  <guest-panel *ngSwitchDefault></guest-panel>
</div>

// Custom structural directive
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRepeat(count: number) {
    this.viewContainer.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i,
        index: i,
        count: count
      });
    }
  }
}

// Usage: <div *appRepeat="3; let i = index">Item {{ i }}</div>
```

**3. Attribute Directives**
Attribute directives change the appearance or behavior of an element, component, or another directive.

```typescript
// Built-in attribute directives
// ngClass
<div [ngClass]="{
  'active': isActive,
  'disabled': isDisabled,
  'highlight': shouldHighlight
}">Dynamic classes</div>

// ngStyle
<div [ngStyle]="{
  'color': textColor,
  'font-size': fontSize + 'px',
  'background-color': backgroundColor
}">Dynamic styles</div>

// Custom attribute directive
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText!: string;
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  
  private tooltipElement?: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (this.tooltipElement) {
      return;
    }

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.addClass(this.tooltipElement, `tooltip-${this.placement}`);
    
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, text);
    
    this.renderer.appendChild(document.body, this.tooltipElement);
    
    // Position the tooltip
    this.positionTooltip();
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = undefined;
    }
  }

  private positionTooltip() {
    if (!this.tooltipElement) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    let top: number, left: number;

    switch (this.placement) {
      case 'top':
        top = hostRect.top - tooltipRect.height - 8;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + 8;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + 8;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }
}

// Usage: <button appTooltip="Click me!" placement="top">Hover me</button>
```

**Advanced Directive Examples:**

**1. Form Validation Directive**
```typescript
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true
    }
  ]
})
export class PasswordStrengthDirective implements Validator {
  @Input() minLength = 8;
  @Input() requireUppercase = true;
  @Input() requireLowercase = true;
  @Input() requireNumbers = true;
  @Input() requireSpecialChars = true;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    const errors: ValidationErrors = {};

    if (value.length < this.minLength) {
      errors['minLength'] = { requiredLength: this.minLength, actualLength: value.length };
    }

    if (this.requireUppercase && !/[A-Z]/.test(value)) {
      errors['requireUppercase'] = true;
    }

    if (this.requireLowercase && !/[a-z]/.test(value)) {
      errors['requireLowercase'] = true;
    }

    if (this.requireNumbers && !/\d/.test(value)) {
      errors['requireNumbers'] = true;
    }

    if (this.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['requireSpecialChars'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
}
```

**2. Lazy Loading Directive**
```typescript
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit {
  @Input('appLazyLoad') src!: string;
  @Input() placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+';

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit() {
    // Set placeholder initially
    this.el.nativeElement.src = this.placeholder;

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage() {
    const img = new Image();
    img.onload = () => {
      this.el.nativeElement.src = this.src;
      this.observer?.unobserve(this.el.nativeElement);
    };
    img.src = this.src;
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}

// Usage: <img appLazyLoad="path/to/image.jpg" alt="Lazy loaded image">
```

**Key Points:**
- Structural directives use `*` syntax and modify DOM structure
- Attribute directives modify element behavior or appearance
- Use `TemplateRef` and `ViewContainerRef` for structural directives
- Use `ElementRef` and `Renderer2` for safe DOM manipulation
- Host listeners and host bindings provide declarative event handling
- Custom validators can be implemented as directives
- Always clean up resources in `ngOnDestroy`

---

## Routing & Navigation

### Q6: Explain Angular routing and how to implement lazy loading.
**Difficulty: Medium**

**Answer:**
Angular Router enables navigation from one view to another as users perform application tasks. It supports lazy loading to improve application performance by loading feature modules only when needed.

**Basic Routing Setup:**

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Set to true for debugging
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Feature Module Routing:**

```typescript
// users/users-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserResolver } from './resolvers/user.resolver';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', component: UserListComponent },
      {
        path: 'new',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: { user: UserResolver }
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        resolve: { user: UserResolver },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
```

**Route Guards:**

```typescript
// guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuth(state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> {
    return this.checkAuth(`/${route.path}`);
  }

  private checkAuth(url: string): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: url }
          });
          return false;
        }
      })
    );
  }
}

// guards/can-deactivate.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
```

**Route Resolver:**

```typescript
// resolvers/user.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id');
    
    if (id) {
      return this.userService.getUser(+id).pipe(
        catchError(() => {
          this.router.navigate(['/users']);
          return EMPTY;
        })
      );
    } else {
      this.router.navigate(['/users']);
      return EMPTY;
    }
  }
}
```

**Navigation in Components:**

```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <button (click)="createUser()">Create New User</button>
      <div *ngFor="let user of users" class="user-card">
        <h3>{{ user.name }}</h3>
        <button (click)="viewUser(user.id)">View</button>
        <button (click)="editUser(user.id)">Edit</button>
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  createUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  viewUser(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  editUser(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  private loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
```

**Advanced Routing Features:**

```typescript
// Route parameters and query parameters
this.router.navigate(['/users', userId], {
  queryParams: { tab: 'profile', edit: true },
  fragment: 'top'
});

// Reading route parameters
this.route.paramMap.subscribe(params => {
  const id = params.get('id');
  // Load user data
});

// Reading query parameters
this.route.queryParamMap.subscribe(queryParams => {
  const tab = queryParams.get('tab');
  const editMode = queryParams.get('edit') === 'true';
});

// Custom preloading strategy
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    } else {
      return of(null);
    }
  }
}

// Usage in route configuration
{
  path: 'important-feature',
  loadChildren: () => import('./important/important.module').then(m => m.ImportantModule),
  data: { preload: true }
}
```

---

### Q7: What are Angular Forms and explain the difference between Template-driven and Reactive forms?
**Difficulty: Medium**

**Answer:**
Angular provides two approaches for handling user input through forms: Template-driven forms and Reactive forms. Both capture user input events, validate the input, create a form model, and provide a way to track changes.

**Template-Driven Forms:**
Template-driven forms rely on directives in the template to create and manipulate the underlying object model.

```typescript
// template-driven-form.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          [(ngModel)]="user.name"
          #name="ngModel"
          required
          minlength="2"
          class="form-control"
          [class.is-invalid]="name.invalid && name.touched"
        >
        <div *ngIf="name.invalid && name.touched" class="invalid-feedback">
          <div *ngIf="name.errors?.['required']">Name is required</div>
          <div *ngIf="name.errors?.['minlength']">Name must be at least 2 characters</div>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          [(ngModel)]="user.email"
          #email="ngModel"
          required
          email
          class="form-control"
          [class.is-invalid]="email.invalid && email.touched"
        >
        <div *ngIf="email.invalid && email.touched" class="invalid-feedback">
          <div *ngIf="email.errors?.['required']">Email is required</div>
          <div *ngIf="email.errors?.['email']">Please enter a valid email</div>
        </div>
      </div>

      <div class="form-group">
        <label for="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          [(ngModel)]="user.age"
          #age="ngModel"
          required
          min="18"
          max="100"
          class="form-control"
          [class.is-invalid]="age.invalid && age.touched"
        >
        <div *ngIf="age.invalid && age.touched" class="invalid-feedback">
          <div *ngIf="age.errors?.['required']">Age is required</div>
          <div *ngIf="age.errors?.['min']">Age must be at least 18</div>
          <div *ngIf="age.errors?.['max']">Age must be less than 100</div>
        </div>
      </div>

      <button
        type="submit"
        [disabled]="userForm.invalid"
        class="btn btn-primary"
      >
        Submit
      </button>
    </form>

    <div class="debug-info" *ngIf="showDebug">
      <h4>Form Debug Info:</h4>
      <p>Form Valid: {{ userForm.valid }}</p>
      <p>Form Value: {{ userForm.value | json }}</p>
      <p>Form Errors: {{ userForm.errors | json }}</p>
    </div>
  `
})
export class TemplateFormComponent {
  user = {
    name: '',
    email: '',
    age: null
  };
  
  showDebug = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted:', form.value);
      // Process form data
      this.processUser(form.value);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(form);
    }
  }

  private markFormGroupTouched(form: NgForm) {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsTouched();
    });
  }

  private processUser(userData: any) {
    // API call or other processing
    console.log('Processing user:', userData);
  }
}
```

**Reactive Forms:**
Reactive forms provide a model-driven approach to handling form inputs whose values change over time.

```typescript
// reactive-form.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          formControlName="name"
          class="form-control"
          [class.is-invalid]="isFieldInvalid('name')"
        >
        <div *ngIf="isFieldInvalid('name')" class="invalid-feedback">
          <div *ngIf="userForm.get('name')?.errors?.['required']">Name is required</div>
          <div *ngIf="userForm.get('name')?.errors?.['minlength']">Name must be at least 2 characters</div>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          formControlName="email"
          class="form-control"
          [class.is-invalid]="isFieldInvalid('email')"
        >
        <div *ngIf="isFieldInvalid('email')" class="invalid-feedback">
          <div *ngIf="userForm.get('email')?.errors?.['required']">Email is required</div>
          <div *ngIf="userForm.get('email')?.errors?.['email']">Please enter a valid email</div>
          <div *ngIf="userForm.get('email')?.errors?.['emailTaken']">Email is already taken</div>
        </div>
      </div>

      <div formGroupName="address" class="form-group">
        <h4>Address</h4>
        <div class="form-group">
          <label for="street">Street:</label>
          <input
            type="text"
            id="street"
            formControlName="street"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('address.street')"
          >
        </div>
        
        <div class="form-group">
          <label for="city">City:</label>
          <input
            type="text"
            id="city"
            formControlName="city"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('address.city')"
          >
        </div>
      </div>

      <div class="form-group">
        <h4>Skills</h4>
        <div formArrayName="skills">
          <div *ngFor="let skill of skills.controls; let i = index" class="skill-item">
            <input
              type="text"
              [formControlName]="i"
              class="form-control"
              placeholder="Enter skill"
            >
            <button type="button" (click)="removeSkill(i)" class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
        <button type="button" (click)="addSkill()" class="btn btn-secondary">Add Skill</button>
      </div>

      <button
        type="submit"
        [disabled]="userForm.invalid"
        class="btn btn-primary"
      >
        Submit
      </button>
    </form>

    <div class="debug-info" *ngIf="showDebug">
      <h4>Form Debug Info:</h4>
      <p>Form Valid: {{ userForm.valid }}</p>
      <p>Form Value: {{ userForm.value | json }}</p>
      <p>Form Status: {{ userForm.status }}</p>
    </div>
  `
})
export class ReactiveFormComponent implements OnInit {
  userForm!: FormGroup;
  showDebug = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.setupFormValidation();
  }

  private createForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], [this.emailAsyncValidator.bind(this)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required]
      }),
      skills: this.fb.array([this.createSkill()])
    });
  }

  private setupFormValidation() {
    // Watch for email changes and validate asynchronously
    this.userForm.get('email')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      console.log('Email changed:', value);
    });

    // Watch for form status changes
    this.userForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
    });
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  createSkill(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  addSkill() {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Custom async validator
  private emailAsyncValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const email = control.value;
        const takenEmails = ['admin@example.com', 'user@example.com'];
        
        if (takenEmails.includes(email)) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      this.processUser(this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.userForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private processUser(userData: any) {
    console.log('Processing user:', userData);
  }
}
```

**Custom Validators:**

```typescript
// validators/custom-validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // Password strength validator
  static passwordStrength(minLength: number = 8): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      
      if (!value) {
        return null;
      }

      const hasNumber = /[0-9]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasSpecial = /[#?!@$%^&*-]/.test(value);
      const isValidLength = value.length >= minLength;

      const passwordValid = hasNumber && hasUpper && hasLower && hasSpecial && isValidLength;

      return !passwordValid ? {
        passwordStrength: {
          hasNumber,
          hasUpper,
          hasLower,
          hasSpecial,
          isValidLength
        }
      } : null;
    };
  }

  // Confirm password validator
  static confirmPassword(passwordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get(passwordField);
      const confirmPassword = control.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password.value === confirmPassword ? null : { confirmPassword: true };
    };
  }

  // Date range validator
  static dateRange(startDateField: string, endDateField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.get(startDateField)?.value;
      const endDate = control.get(endDateField)?.value;

      if (!startDate || !endDate) {
        return null;
      }

      return new Date(startDate) <= new Date(endDate) ? null : { dateRange: true };
    };
  }
}
```

**Comparison Table:**

| Feature | Template-Driven | Reactive |
|---------|----------------|----------|
| **Setup** | Easy, minimal code | More setup required |
| **Data Model** | Implicit, created by directives | Explicit, created in component |
| **Data Flow** | Asynchronous | Synchronous |
| **Form Validation** | Directives | Functions |
| **Mutability** | Mutable | Immutable |
| **Scalability** | Limited for complex forms | Highly scalable |
| **Testing** | Difficult to unit test | Easy to unit test |
| **Dynamic Forms** | Limited support | Excellent support |
| **Performance** | Good for simple forms | Better for complex forms |

**When to Use:**
- **Template-Driven**: Simple forms, rapid prototyping, minimal validation
- **Reactive**: Complex forms, dynamic forms, extensive validation, better testing requirements

---

### Q8: Explain Angular HTTP Client and how to handle HTTP requests.
**Difficulty: Medium**

**Answer:**
Angular HTTP Client is a simplified API for HTTP functionality that is built on top of the XMLHttpRequest interface. It provides a powerful way to communicate with backend services.

**Basic HTTP Client Setup:**

```typescript
// app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  // ...
})
export class AppModule { }
```

**HTTP Service Implementation:**

```typescript
// services/api.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {
  map,
  catchError,
  retry,
  timeout,
  finalize,
  tap
} from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://api.example.com';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  // GET request with query parameters
  getUsers(page: number = 1, limit: number = 10): Observable<ApiResponse<User[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', 'name')
      .set('order', 'asc');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    this.setLoading(true);

    return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/users`, {
      params,
      headers
    }).pipe(
      timeout(10000), // 10 second timeout
      retry(2), // Retry failed requests 2 times
      tap(response => console.log('Users loaded:', response)),
      catchError(this.handleError),
      finalize(() => this.setLoading(false))
    );
  }

  // GET single user
  getUser(id: number): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/users/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // POST request
  createUser(user: Omit<User, 'id'>): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    this.setLoading(true);

    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/users`, user, {
      headers
    }).pipe(
      map(response => response.data),
      catchError(this.handleError),
      finalize(() => this.setLoading(false))
    );
  }

  // PUT request
  updateUser(id: number, user: Partial<User>): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.put<ApiResponse<User>>(`${this.baseUrl}/users/${id}`, user, {
      headers
    }).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // DELETE request
  deleteUser(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.delete<void>(`${this.baseUrl}/users/${id}`, {
      headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  // File upload with progress tracking
  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
      // Don't set Content-Type for FormData, let browser set it
    });

    return this.http.post(`${this.baseUrl}/upload`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Download file
  downloadFile(fileId: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.get(`${this.baseUrl}/files/${fileId}`, {
      headers,
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Search with debouncing
  searchUsers(query: string): Observable<User[]> {
    if (!query.trim()) {
      return new Observable(observer => observer.next([]));
    }

    const params = new HttpParams().set('q', query);
    
    return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/users/search`, {
      params
    }).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: ' + (error.error?.message || 'Invalid request');
          break;
        case 401:
          errorMessage = 'Unauthorized: Please log in again';
          this.handleUnauthorized();
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource was not found';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Please try again later';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.error?.message || error.message}`;
      }
    }

    console.error('HTTP Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

  private handleUnauthorized(): void {
    // Clear auth token and redirect to login
    localStorage.removeItem('authToken');
    // Inject Router and navigate to login
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
}
```

**HTTP Interceptors:**

```typescript
// interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Show loading spinner
    this.loadingService.show();

    // Add auth token to request
    const authToken = this.authService.getToken();
    let authRequest = request;

    if (authToken) {
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    // Add common headers
    authRequest = authRequest.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}

// interceptors/logging.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    
    console.log(`HTTP Request: ${request.method} ${request.url}`);
    
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          console.log(
            `HTTP Response: ${request.method} ${request.url} - ` +
            `Status: ${event.status} - Duration: ${duration}ms`
          );
        }
      })
    );
  }
}

// Register interceptors in app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

**Component Usage:**

```typescript
// components/user-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  startWith
} from 'rxjs/operators';
import { ApiService, User } from '../services/api.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <!-- Search -->
      <input
        type="text"
        placeholder="Search users..."
        (input)="onSearchInput($event)"
        class="search-input"
      >

      <!-- Loading indicator -->
      <div *ngIf="apiService.loading$ | async" class="loading">
        Loading...
      </div>

      <!-- User list -->
      <div *ngFor="let user of users" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button (click)="editUser(user)">Edit</button>
        <button (click)="deleteUser(user.id)">Delete</button>
      </div>

      <!-- File upload -->
      <div class="upload-section">
        <input
          type="file"
          (change)="onFileSelected($event)"
          #fileInput
        >
        <button (click)="uploadFile()" [disabled]="!selectedFile">
          Upload
        </button>
        <div *ngIf="uploadProgress > 0" class="progress">
          Upload Progress: {{ uploadProgress }}%
        </div>
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchResults$!: Observable<User[]>;
  selectedFile: File | null = null;
  uploadProgress = 0;
  
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(public apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUsers() {
    this.apiService.getUsers(1, 20)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.users = response.data;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          // Show error message to user
        }
      });
  }

  private setupSearch() {
    this.searchResults$ = this.searchSubject.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.apiService.searchUsers(query)),
      takeUntil(this.destroy$)
    );

    this.searchResults$.subscribe(results => {
      this.users = results;
    });
  }

  onSearchInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }

  editUser(user: User) {
    // Navigate to edit form or open modal
    console.log('Editing user:', user);
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.users = this.users.filter(user => user.id !== id);
            console.log('User deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting user:', error);
          }
        });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;

    this.apiService.uploadFile(this.selectedFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                this.uploadProgress = Math.round(100 * event.loaded / event.total);
              }
              break;
            case HttpEventType.Response:
              console.log('Upload complete:', event.body);
              this.uploadProgress = 0;
              this.selectedFile = null;
              break;
          }
        },
        error: (error) => {
          console.error('Upload error:', error);
          this.uploadProgress = 0;
        }
      });
  }
}
```

**Key Features:**
- **Type Safety**: Full TypeScript support with typed responses
- **Error Handling**: Comprehensive error handling with retry logic
- **Interceptors**: Request/response transformation and common functionality
- **Progress Tracking**: File upload progress monitoring
- **Caching**: Built-in HTTP caching capabilities
- **Testing**: Easy to mock and test HTTP calls
- **Observables**: Reactive programming with RxJS operators

---

### Q9: What is Change Detection in Angular and how does it work?
**Difficulty: Medium-Hard**

**Answer:**
Angular's Change Detection is the mechanism that keeps the application UI in sync with the application state. It runs after certain asynchronous operations to check if any data-bound properties have changed and updates the DOM accordingly.

**Change Detection Cycle:**

```typescript
// change-detection-demo.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  DoCheck,
  AfterViewChecked,
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-change-detection-demo',
  template: `
    <div class="demo-container">
      <h3>Change Detection Demo</h3>
      <p>Counter: {{ counter }}</p>
      <p>Random: {{ randomNumber }}</p>
      <p>Check Count: {{ checkCount }}</p>
      
      <button (click)="increment()">Increment</button>
      <button (click)="updateRandom()">Update Random</button>
      <button (click)="runOutsideAngular()">Run Outside Angular</button>
      <button (click)="manualDetection()">Manual Detection</button>
      
      <app-child 
        [data]="childData" 
        (dataChange)="onChildDataChange($event)">
      </app-child>
    </div>
  `,
  // Default change detection strategy
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChangeDetectionDemoComponent implements OnInit, DoCheck, AfterViewChecked {
  counter = 0;
  randomNumber = Math.random();
  checkCount = 0;
  childData = { value: 'initial' };

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    console.log('Component initialized');
  }

  ngDoCheck() {
    this.checkCount++;
    console.log('ngDoCheck called - Check count:', this.checkCount);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }

  increment() {
    this.counter++;
    console.log('Counter incremented:', this.counter);
  }

  updateRandom() {
    this.randomNumber = Math.random();
    console.log('Random number updated:', this.randomNumber);
  }

  // Demonstrates running code outside Angular's zone
  runOutsideAngular() {
    this.ngZone.runOutsideAngular(() => {
      // This won't trigger change detection
      setTimeout(() => {
        this.counter += 10;
        console.log('Updated outside Angular zone:', this.counter);
        // UI won't update automatically
      }, 1000);
    });
  }

  // Manual change detection
  manualDetection() {
    this.ngZone.runOutsideAngular(() => {
      this.counter += 5;
      console.log('Updated outside zone:', this.counter);
      
      // Manually trigger change detection
      this.ngZone.run(() => {
        console.log('Manually triggered change detection');
      });
    });
  }

  onChildDataChange(newData: any) {
    this.childData = { ...newData }; // Create new reference
    console.log('Child data changed:', newData);
  }

  // Method to demonstrate immutable updates
  updateChildData() {
    // Wrong way - mutating existing object
    // this.childData.value = 'mutated'; // Won't trigger change detection in OnPush child
    
    // Correct way - creating new object reference
    this.childData = {
      ...this.childData,
      value: 'updated'
    };
  }
}

// Child component with OnPush strategy
@Component({
  selector: 'app-child',
  template: `
    <div class="child-component">
      <h4>Child Component (OnPush)</h4>
      <p>Data: {{ data.value }}</p>
      <p>Child Check Count: {{ childCheckCount }}</p>
      <button (click)="emitChange()">Emit Change</button>
      <button (click)="updateLocal()">Update Local</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements DoCheck {
  @Input() data: any;
  @Output() dataChange = new EventEmitter<any>();
  
  childCheckCount = 0;
  localValue = 'local';

  constructor(private cdr: ChangeDetectorRef) {}

  ngDoCheck() {
    this.childCheckCount++;
    console.log('Child ngDoCheck called - Check count:', this.childCheckCount);
  }

  emitChange() {
    this.dataChange.emit({ value: 'changed from child' });
  }

  updateLocal() {
    this.localValue = 'updated: ' + Date.now();
    // With OnPush, this won't update the view automatically
    // Need to manually trigger change detection
    this.cdr.markForCheck();
  }
}
```

**Change Detection Strategies:**

```typescript
// performance-optimized.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnChanges,
  SimpleChanges,
  TrackByFunction
} from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-performance-optimized',
  template: `
    <div class="optimized-component">
      <h3>Performance Optimized Component</h3>
      
      <!-- Using OnPush with immutable data -->
      <div *ngFor="let user of users; trackBy: trackByUserId" class="user-item">
        <app-user-card 
          [user]="user" 
          [isSelected]="selectedUserId === user.id"
          (userSelected)="selectUser($event)">
        </app-user-card>
      </div>
      
      <!-- Using async pipe for observables -->
      <div class="async-data">
        <h4>Async Data:</h4>
        <p>{{ asyncData$ | async }}</p>
      </div>
      
      <!-- Pure pipes for expensive operations -->
      <div class="filtered-data">
        <h4>Filtered Users:</h4>
        <div *ngFor="let user of users | expensiveFilter:filterCriteria">
          {{ user.name }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceOptimizedComponent implements OnChanges {
  @Input() users: User[] = [];
  @Input() filterCriteria: string = '';
  @Input() asyncData$!: Observable<any>;
  
  selectedUserId: number | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges triggered:', changes);
    
    // Only update if users array reference changed
    if (changes['users'] && changes['users'].currentValue !== changes['users'].previousValue) {
      console.log('Users array changed');
      // Component will automatically re-render due to OnPush + Input change
    }
  }

  // TrackBy function for ngFor optimization
  trackByUserId: TrackByFunction<User> = (index: number, user: User) => {
    return user.id; // Track by unique identifier
  };

  selectUser(userId: number) {
    this.selectedUserId = userId;
    // Since we're using OnPush, we need to manually trigger change detection
    // for internal state changes
    this.cdr.markForCheck();
  }

  // Method to demonstrate detaching from change detection
  pauseChangeDetection() {
    this.cdr.detach();
    console.log('Change detection detached');
  }

  // Method to re-attach to change detection
  resumeChangeDetection() {
    this.cdr.reattach();
    console.log('Change detection reattached');
  }

  // Force change detection
  forceUpdate() {
    this.cdr.detectChanges();
    console.log('Forced change detection');
  }
}

// User card component with OnPush
@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card" 
         [class.selected]="isSelected"
         (click)="onUserClick()">
      <h5>{{ user.name }}</h5>
      <p>{{ user.email }}</p>
      <small>Rendered at: {{ renderTime }}</small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent implements OnChanges {
  @Input() user!: User;
  @Input() isSelected: boolean = false;
  @Output() userSelected = new EventEmitter<number>();
  
  renderTime = new Date().toLocaleTimeString();

  ngOnChanges(changes: SimpleChanges) {
    // Update render time only when inputs change
    if (changes['user'] || changes['isSelected']) {
      this.renderTime = new Date().toLocaleTimeString();
      console.log(`UserCard re-rendered for user ${this.user.id}`);
    }
  }

  onUserClick() {
    this.userSelected.emit(this.user.id);
  }
}
```

**Custom Change Detection with Zone.js:**

```typescript
// zone-demo.component.ts
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-zone-demo',
  template: `
    <div class="zone-demo">
      <h3>Zone.js Demo</h3>
      <p>Counter: {{ counter }}</p>
      <p>Zone Counter: {{ zoneCounter }}</p>
      
      <button (click)="normalIncrement()">Normal Increment</button>
      <button (click)="zoneIncrement()">Zone Increment</button>
      <button (click)="outsideZoneIncrement()">Outside Zone Increment</button>
      
      <div class="status">
        <p>Is in Angular Zone: {{ isInAngularZone() }}</p>
      </div>
    </div>
  `
})
export class ZoneDemoComponent implements OnInit, OnDestroy {
  counter = 0;
  zoneCounter = 0;
  private intervalId: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // Example of running heavy computation outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        // Heavy computation that doesn't need to trigger change detection
        this.performHeavyComputation();
        
        // Only update UI every 10 iterations
        if (this.zoneCounter % 10 === 0) {
          this.ngZone.run(() => {
            // This will trigger change detection
            console.log('Updating UI from outside zone');
          });
        }
      }, 100);
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  normalIncrement() {
    this.counter++;
    // This will automatically trigger change detection
  }

  zoneIncrement() {
    this.ngZone.run(() => {
      this.counter++;
      console.log('Incremented inside zone.run()');
    });
  }

  outsideZoneIncrement() {
    this.ngZone.runOutsideAngular(() => {
      this.counter++;
      console.log('Incremented outside zone - UI will not update');
      
      // Manually trigger change detection after 2 seconds
      setTimeout(() => {
        this.ngZone.run(() => {
          console.log('Manually triggered change detection');
        });
      }, 2000);
    });
  }

  isInAngularZone(): boolean {
    return NgZone.isInAngularZone();
  }

  private performHeavyComputation() {
    this.zoneCounter++;
    // Simulate heavy computation
    let result = 0;
    for (let i = 0; i < 1000; i++) {
      result += Math.random();
    }
  }
}
```

**Pure Pipes for Performance:**

```typescript
// expensive-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expensiveFilter',
  pure: true // This is the default, but explicitly showing it
})
export class ExpensiveFilterPipe implements PipeTransform {
  transform(items: any[], criteria: string): any[] {
    console.log('ExpensiveFilterPipe transform called');
    
    if (!items || !criteria) {
      return items;
    }

    // Simulate expensive operation
    const startTime = performance.now();
    
    const filtered = items.filter(item => 
      item.name.toLowerCase().includes(criteria.toLowerCase())
    );
    
    const endTime = performance.now();
    console.log(`Filter operation took ${endTime - startTime} milliseconds`);
    
    return filtered;
  }
}

// Impure pipe example (use sparingly)
@Pipe({
  name: 'impureFilter',
  pure: false // This will run on every change detection cycle
})
export class ImpureFilterPipe implements PipeTransform {
  transform(items: any[], criteria: string): any[] {
    console.log('ImpureFilterPipe transform called - runs every CD cycle!');
    
    if (!items || !criteria) {
      return items;
    }

    return items.filter(item => 
      item.name.toLowerCase().includes(criteria.toLowerCase())
    );
  }
}
```

**Change Detection Best Practices:**

1. **Use OnPush Strategy**: Reduces change detection cycles
2. **Immutable Data**: Always create new object references for updates
3. **TrackBy Functions**: Optimize ngFor loops
4. **Async Pipe**: Automatically handles subscriptions and change detection
5. **Pure Pipes**: Cache expensive computations
6. **Zone.js Optimization**: Run heavy operations outside Angular zone
7. **Detach/Reattach**: For components with complex update logic

**Common Change Detection Triggers:**
- DOM Events (click, keyup, etc.)
- HTTP Requests
- Timers (setTimeout, setInterval)
- Promises
- Observables (when using async pipe)

---

### Q10: Explain Angular Pipes and create custom pipes with examples.
**Difficulty: Medium**

**Answer:**
Angular Pipes are a way to transform data in templates. They take data as input and transform it to a desired output format. Angular provides built-in pipes and allows you to create custom pipes.

**Built-in Pipes Examples:**

```typescript
// built-in-pipes-demo.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-built-in-pipes-demo',
  template: `
    <div class="pipes-demo">
      <h3>Built-in Pipes Demo</h3>
      
      <!-- String Pipes -->
      <div class="section">
        <h4>String Pipes</h4>
        <p>Original: {{ message }}</p>
        <p>Uppercase: {{ message | uppercase }}</p>
        <p>Lowercase: {{ message | lowercase }}</p>
        <p>Titlecase: {{ message | titlecase }}</p>
        <p>Slice (0,10): {{ message | slice:0:10 }}</p>
      </div>
      
      <!-- Number Pipes -->
      <div class="section">
        <h4>Number Pipes</h4>
        <p>Number: {{ price | number:'1.2-2' }}</p>
        <p>Currency: {{ price | currency:'USD':'symbol':'1.2-2' }}</p>
        <p>Percent: {{ percentage | percent:'1.2-2' }}</p>
      </div>
      
      <!-- Date Pipes -->
      <div class="section">
        <h4>Date Pipes</h4>
        <p>Default: {{ currentDate | date }}</p>
        <p>Short: {{ currentDate | date:'short' }}</p>
        <p>Medium: {{ currentDate | date:'medium' }}</p>
        <p>Custom: {{ currentDate | date:'dd/MM/yyyy HH:mm:ss' }}</p>
        <p>Relative: {{ pastDate | date:'relative' }}</p>
      </div>
      
      <!-- JSON Pipe -->
      <div class="section">
        <h4>JSON Pipe</h4>
        <pre>{{ user | json }}</pre>
      </div>
      
      <!-- Async Pipe -->
      <div class="section">
        <h4>Async Pipe</h4>
        <p>Observable Data: {{ observableData$ | async }}</p>
        <p>Promise Data: {{ promiseData | async }}</p>
      </div>
      
      <!-- Chaining Pipes -->
      <div class="section">
        <h4>Chaining Pipes</h4>
        <p>{{ message | lowercase | slice:0:20 | titlecase }}</p>
        <p>{{ price | currency:'EUR':'symbol':'1.0-0' | uppercase }}</p>
      </div>
    </div>
  `
})
export class BuiltInPipesDemoComponent {
  message = 'Hello Angular Pipes World!';
  price = 1234.567;
  percentage = 0.1234;
  currentDate = new Date();
  pastDate = new Date(Date.now() - 86400000); // Yesterday
  
  user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    roles: ['admin', 'user']
  };
  
  observableData$ = new Observable(observer => {
    setTimeout(() => observer.next('Observable data loaded!'), 2000);
  });
  
  promiseData = new Promise(resolve => {
    setTimeout(() => resolve('Promise data loaded!'), 3000);
  });
}
```

**Custom Pipes Examples:**

```typescript
// pipes/truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  pure: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }
    
    return value.substring(0, limit) + trail;
  }
}

// pipes/file-size.pipe.ts
@Pipe({
  name: 'fileSize',
  pure: true
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, decimals: number = 2): string {
    if (!bytes || bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

// pipes/time-ago.pipe.ts
@Pipe({
  name: 'timeAgo',
  pure: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return '';
    
    const date = new Date(value);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) {
      return years === 1 ? '1 year ago' : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
      return 'Just now';
    }
  }
}

// pipes/highlight.pipe.ts
@Pipe({
  name: 'highlight',
  pure: true
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string, className: string = 'highlight'): string {
    if (!text || !search) {
      return text;
    }
    
    const regex = new RegExp(search, 'gi');
    return text.replace(regex, `<span class="${className}">$&</span>`);
  }
}

// pipes/safe-html.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  pure: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  
  transform(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

// pipes/filter.pipe.ts
@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, property?: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    
    searchText = searchText.toLowerCase();
    
    return items.filter(item => {
      if (property) {
        return item[property]?.toString().toLowerCase().includes(searchText);
      } else {
        return JSON.stringify(item).toLowerCase().includes(searchText);
      }
    });
  }
}

// pipes/sort.pipe.ts
@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {
  transform(array: any[], field: string, direction: 'asc' | 'desc' = 'asc'): any[] {
    if (!array || !field) {
      return array;
    }
    
    return array.sort((a, b) => {
      const aValue = this.getNestedProperty(a, field);
      const bValue = this.getNestedProperty(b, field);
      
      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }
}
```

**Advanced Custom Pipes:**

```typescript
// pipes/memoized.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoized',
  pure: true
})
export class MemoizedPipe implements PipeTransform {
  private cache = new Map<string, any>();
  
  transform(value: any, expensiveOperation: (val: any) => any): any {
    const key = JSON.stringify(value);
    
    if (this.cache.has(key)) {
      console.log('Cache hit for:', key);
      return this.cache.get(key);
    }
    
    console.log('Cache miss, computing for:', key);
    const result = expensiveOperation(value);
    this.cache.set(key, result);
    
    // Limit cache size
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    return result;
  }
}

// pipes/async-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Pipe({
  name: 'asyncFilter',
  pure: false // Impure because it returns observables
})
export class AsyncFilterPipe implements PipeTransform {
  transform(items$: Observable<any[]>, filterFn: (item: any) => boolean): Observable<any[]> {
    if (!items$ || !filterFn) {
      return items$ || of([]);
    }
    
    return items$.pipe(
      map(items => items.filter(filterFn)),
      catchError(error => {
        console.error('Error in async filter:', error);
        return of([]);
      })
    );
  }
}

// pipes/currency-converter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Pipe({
  name: 'currencyConverter',
  pure: false
})
export class CurrencyConverterPipe implements PipeTransform {
  private cache = new Map<string, number>();
  
  constructor(private http: HttpClient) {}
  
  transform(amount: number, fromCurrency: string, toCurrency: string): Observable<number> {
    if (!amount || !fromCurrency || !toCurrency) {
      return of(amount);
    }
    
    if (fromCurrency === toCurrency) {
      return of(amount);
    }
    
    const cacheKey = `${fromCurrency}-${toCurrency}`;
    
    if (this.cache.has(cacheKey)) {
      const rate = this.cache.get(cacheKey)!;
      return of(amount * rate);
    }
    
    return this.http.get<any>(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`).pipe(
      map(response => {
        const rate = response.rates[toCurrency];
        this.cache.set(cacheKey, rate);
        return amount * rate;
      }),
      catchError(error => {
        console.error('Currency conversion error:', error);
        return of(amount);
      })
    );
  }
}
```

**Using Custom Pipes in Components:**

```typescript
// custom-pipes-demo.component.ts
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-custom-pipes-demo',
  template: `
    <div class="custom-pipes-demo">
      <h3>Custom Pipes Demo</h3>
      
      <!-- Truncate Pipe -->
      <div class="section">
        <h4>Truncate Pipe</h4>
        <p>{{ longText | truncate:50:'...' }}</p>
        <p>{{ longText | truncate:20:'[more]' }}</p>
      </div>
      
      <!-- File Size Pipe -->
      <div class="section">
        <h4>File Size Pipe</h4>
        <p>{{ fileSize1 | fileSize }}</p>
        <p>{{ fileSize2 | fileSize:0 }}</p>
        <p>{{ fileSize3 | fileSize:3 }}</p>
      </div>
      
      <!-- Time Ago Pipe -->
      <div class="section">
        <h4>Time Ago Pipe</h4>
        <p>{{ pastDate1 | timeAgo }}</p>
        <p>{{ pastDate2 | timeAgo }}</p>
        <p>{{ pastDate3 | timeAgo }}</p>
      </div>
      
      <!-- Highlight Pipe -->
      <div class="section">
        <h4>Highlight Pipe</h4>
        <div [innerHTML]="text | highlight:searchTerm:'highlight' | safeHtml"></div>
        <input [(ngModel)]="searchTerm" placeholder="Search term">
      </div>
      
      <!-- Filter and Sort Pipes -->
      <div class="section">
        <h4>Filter and Sort Pipes</h4>
        <input [(ngModel)]="filterText" placeholder="Filter users">
        <select [(ngModel)]="sortField">
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="email">Email</option>
        </select>
        <select [(ngModel)]="sortDirection">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        
        <div *ngFor="let user of users | filter:filterText:'name' | sort:sortField:sortDirection">
          {{ user.name }} ({{ user.age }}) - {{ user.email }}
        </div>
      </div>
      
      <!-- Memoized Pipe -->
      <div class="section">
        <h4>Memoized Pipe</h4>
        <p>{{ complexData | memoized:expensiveCalculation }}</p>
        <button (click)="updateComplexData()">Update Data</button>
      </div>
    </div>
  `,
  styles: [`
    .highlight {
      background-color: yellow;
      font-weight: bold;
    }
    .section {
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  `]
})
export class CustomPipesDemoComponent {
  longText = 'This is a very long text that needs to be truncated to show only a portion of it to the user while keeping the rest hidden.';
  
  fileSize1 = 1024;
  fileSize2 = 1048576;
  fileSize3 = 1073741824;
  
  pastDate1 = new Date(Date.now() - 3600000); // 1 hour ago
  pastDate2 = new Date(Date.now() - 86400000); // 1 day ago
  pastDate3 = new Date(Date.now() - 2592000000); // 30 days ago
  
  text = 'This is a sample text for highlighting specific words.';
  searchTerm = 'sample';
  
  users = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
    { name: 'Alice Brown', age: 28, email: 'alice@example.com' }
  ];
  
  filterText = '';
  sortField = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  complexData = { value: 100, multiplier: 2 };
  
  expensiveCalculation = (data: any) => {
    // Simulate expensive calculation
    console.log('Performing expensive calculation...');
    let result = data.value;
    for (let i = 0; i < 1000000; i++) {
      result = result * data.multiplier / data.multiplier;
    }
    return result;
  };
  
  updateComplexData() {
    this.complexData = {
      ...this.complexData,
      value: this.complexData.value + 10
    };
  }
}
```

**Pipe Testing:**

```typescript
// truncate.pipe.spec.ts
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;
  
  beforeEach(() => {
    pipe = new TruncatePipe();
  });
  
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  it('should truncate long text', () => {
    const longText = 'This is a very long text that should be truncated';
    const result = pipe.transform(longText, 20);
    expect(result).toBe('This is a very long...');
  });
  
  it('should not truncate short text', () => {
    const shortText = 'Short text';
    const result = pipe.transform(shortText, 20);
    expect(result).toBe('Short text');
  });
  
  it('should use custom trail', () => {
    const text = 'This is a long text';
    const result = pipe.transform(text, 10, '[more]');
    expect(result).toBe('This is a [more]');
  });
  
  it('should handle empty input', () => {
    expect(pipe.transform('', 10)).toBe('');
    expect(pipe.transform(null as any, 10)).toBe('');
    expect(pipe.transform(undefined as any, 10)).toBe('');
  });
});
```

**Key Pipe Concepts:**
- **Pure Pipes**: Only execute when input changes (default, better performance)
- **Impure Pipes**: Execute on every change detection cycle (use sparingly)
- **Parameterized Pipes**: Accept additional parameters for customization
- **Chaining**: Multiple pipes can be chained together
- **Async Pipe**: Automatically subscribes/unsubscribes to observables
- **Custom Pipes**: Implement PipeTransform interface
- **Memoization**: Cache expensive computations for better performance

---

### Q11: What is Angular Testing and how do you implement unit and integration tests?
**Difficulty: Medium-Hard**

**Answer:**
Angular provides a comprehensive testing framework using Jasmine and Karma for unit testing, and Protractor/Cypress for end-to-end testing. Angular CLI generates test files automatically and provides testing utilities.

**Unit Testing Components:**

```typescript
// user.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from './user.service';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

@Component({
  selector: 'app-user',
  template: `
    <div class="user-component">
      <h3>{{ user?.name }}</h3>
      <p>{{ user?.email }}</p>
      <p>Status: {{ user?.active ? 'Active' : 'Inactive' }}</p>
      <button (click)="toggleStatus()" [disabled]="loading">Toggle Status</button>
      <button (click)="deleteUser()" [disabled]="loading">Delete</button>
      <div *ngIf="loading" class="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
    </div>
  `
})
export class UserComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() userDeleted = new EventEmitter<number>();
  @Output() statusChanged = new EventEmitter<User>();
  
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (!this.user) {
      this.error = 'User data is required';
    }
  }

  async toggleStatus() {
    if (!this.user) return;
    
    this.loading = true;
    this.error = null;
    
    try {
      const updatedUser = await this.userService.updateUserStatus(
        this.user.id, 
        !this.user.active
      );
      this.user = updatedUser;
      this.statusChanged.emit(updatedUser);
    } catch (error) {
      this.error = 'Failed to update user status';
    } finally {
      this.loading = false;
    }
  }

  async deleteUser() {
    if (!this.user) return;
    
    this.loading = true;
    this.error = null;
    
    try {
      await this.userService.deleteUser(this.user.id);
      this.userDeleted.emit(this.user.id);
    } catch (error) {
      this.error = 'Failed to delete user';
    } finally {
      this.loading = false;
    }
  }
}

// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUserStatus(id: number, active: boolean): Promise<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, { active }).toPromise();
  }

  deleteUser(id: number): Promise<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).toPromise();
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
```

**Component Unit Tests:**

```typescript
// user.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let compiled: HTMLElement;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    active: true
  };

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'updateUserStatus',
      'deleteUser'
    ]);

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information when user is provided', () => {
    component.user = mockUser;
    fixture.detectChanges();

    expect(compiled.querySelector('h3')?.textContent).toContain('John Doe');
    expect(compiled.querySelector('p')?.textContent).toContain('john@example.com');
    expect(compiled.textContent).toContain('Status: Active');
  });

  it('should show error when no user is provided', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.error).toBe('User data is required');
    expect(compiled.querySelector('.error')?.textContent).toContain('User data is required');
  });

  it('should toggle user status successfully', async () => {
    component.user = mockUser;
    const updatedUser = { ...mockUser, active: false };
    userService.updateUserStatus.and.returnValue(Promise.resolve(updatedUser));
    
    spyOn(component.statusChanged, 'emit');

    await component.toggleStatus();
    fixture.detectChanges();

    expect(userService.updateUserStatus).toHaveBeenCalledWith(1, false);
    expect(component.user.active).toBe(false);
    expect(component.statusChanged.emit).toHaveBeenCalledWith(updatedUser);
    expect(component.loading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('should handle toggle status error', async () => {
    component.user = mockUser;
    userService.updateUserStatus.and.returnValue(Promise.reject('API Error'));

    await component.toggleStatus();
    fixture.detectChanges();

    expect(component.error).toBe('Failed to update user status');
    expect(component.loading).toBe(false);
    expect(compiled.querySelector('.error')?.textContent).toContain('Failed to update user status');
  });

  it('should delete user successfully', async () => {
    component.user = mockUser;
    userService.deleteUser.and.returnValue(Promise.resolve());
    
    spyOn(component.userDeleted, 'emit');

    await component.deleteUser();
    fixture.detectChanges();

    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.userDeleted.emit).toHaveBeenCalledWith(1);
    expect(component.loading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('should disable buttons when loading', () => {
    component.user = mockUser;
    component.loading = true;
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('button');
    buttons.forEach(button => {
      expect(button.hasAttribute('disabled')).toBe(true);
    });
    expect(compiled.querySelector('.loading')).toBeTruthy();
  });

  it('should emit events when buttons are clicked', () => {
    component.user = mockUser;
    fixture.detectChanges();

    spyOn(component, 'toggleStatus');
    spyOn(component, 'deleteUser');

    const toggleButton = compiled.querySelector('button');
    const deleteButton = compiled.querySelectorAll('button')[1];

    toggleButton?.click();
    deleteButton?.click();

    expect(component.toggleStatus).toHaveBeenCalled();
    expect(component.deleteUser).toHaveBeenCalled();
  });
});
```

**Service Unit Tests:**

```typescript
// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch a single user', () => {
    const userId = 1;
    const mockUser = mockUsers[0];

    service.getUser(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`https://api.example.com/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update user status', async () => {
    const userId = 1;
    const updatedUser = { ...mockUsers[0], active: false };

    const promise = service.updateUserStatus(userId, false);
    
    const req = httpMock.expectOne(`https://api.example.com/users/${userId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ active: false });
    req.flush(updatedUser);

    const result = await promise;
    expect(result).toEqual(updatedUser);
  });

  it('should delete user', async () => {
    const userId = 1;

    const promise = service.deleteUser(userId);
    
    const req = httpMock.expectOne(`https://api.example.com/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    await expectAsync(promise).toBeResolved();
  });

  it('should create user', () => {
    const newUser = { name: 'Bob Johnson', email: 'bob@example.com', active: true };
    const createdUser = { id: 3, ...newUser };

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(createdUser);
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should handle HTTP errors', () => {
    service.getUsers().subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
```

**Integration Testing:**

```typescript
// user-list.component.integration.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { UserListComponent } from './user-list.component';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <h2>Users</h2>
      <button (click)="loadUsers()">Load Users</button>
      <div *ngIf="loading" class="loading">Loading users...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <app-user 
        *ngFor="let user of users" 
        [user]="user"
        (userDeleted)="onUserDeleted($event)"
        (statusChanged)="onStatusChanged($event)">
      </app-user>
    </div>
  `
})
export class UserListComponent {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  async loadUsers() {
    this.loading = true;
    this.error = null;
    
    try {
      this.users = await this.userService.getUsers().toPromise();
    } catch (error) {
      this.error = 'Failed to load users';
    } finally {
      this.loading = false;
    }
  }

  onUserDeleted(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  onStatusChanged(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }
}

describe('UserListComponent Integration', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUsers',
      'updateUserStatus',
      'deleteUser'
    ]);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent, UserComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should load and display users', async () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    
    await component.loadUsers();
    fixture.detectChanges();

    expect(component.users).toEqual(mockUsers);
    expect(component.loading).toBe(false);
    
    const userComponents = fixture.debugElement.queryAll(By.directive(UserComponent));
    expect(userComponents.length).toBe(2);
    
    const userElements = fixture.nativeElement.querySelectorAll('app-user');
    expect(userElements.length).toBe(2);
  });

  it('should handle user deletion', async () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    userService.deleteUser.and.returnValue(Promise.resolve());
    
    await component.loadUsers();
    fixture.detectChanges();

    // Simulate user deletion
    component.onUserDeleted(1);
    fixture.detectChanges();

    expect(component.users.length).toBe(1);
    expect(component.users[0].id).toBe(2);
    
    const userComponents = fixture.debugElement.queryAll(By.directive(UserComponent));
    expect(userComponents.length).toBe(1);
  });

  it('should handle status change', async () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    
    await component.loadUsers();
    fixture.detectChanges();

    const updatedUser = { ...mockUsers[0], active: false };
    component.onStatusChanged(updatedUser);
    fixture.detectChanges();

    expect(component.users[0].active).toBe(false);
  });

  it('should show loading state', () => {
    component.loading = true;
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.loading');
    expect(loadingElement?.textContent).toContain('Loading users...');
  });

  it('should show error state', () => {
    component.error = 'Failed to load users';
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement?.textContent).toContain('Failed to load users');
  });
});
```

**Testing Pipes:**

```typescript
// truncate.pipe.spec.ts (already shown above)
// Testing pipes in components
describe('TruncatePipe in Component', () => {
  @Component({
    template: `<p>{{ text | truncate:limit:trail }}</p>`
  })
  class TestComponent {
    text = 'This is a long text that should be truncated';
    limit = 20;
    trail = '...';
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, TruncatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should truncate text in template', () => {
    fixture.detectChanges();
    
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toBe('This is a long text...');
  });

  it('should update when inputs change', () => {
    component.limit = 10;
    fixture.detectChanges();
    
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toBe('This is a ...');
  });
});
```

**Testing Directives:**

```typescript
// highlight.directive.ts
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: string = '';
  @Input() highlightColor: string = 'yellow';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.highlight();
  }

  private highlight() {
    if (this.appHighlight) {
      this.el.nativeElement.style.backgroundColor = this.highlightColor;
    } else {
      this.el.nativeElement.style.backgroundColor = '';
    }
  }
}

// highlight.directive.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <div appHighlight="test" highlightColor="red">Test Element</div>
    <div appHighlight="" highlightColor="blue">No Highlight</div>
  `
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should highlight element when appHighlight has value', () => {
    fixture.detectChanges();
    
    const highlightedElement = fixture.nativeElement.querySelector('div');
    expect(highlightedElement.style.backgroundColor).toBe('red');
  });

  it('should not highlight element when appHighlight is empty', () => {
    fixture.detectChanges();
    
    const elements = fixture.nativeElement.querySelectorAll('div');
    const nonHighlightedElement = elements[1];
    expect(nonHighlightedElement.style.backgroundColor).toBe('');
  });
});
```

**Testing with Async Operations:**

```typescript
// async-component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { of, delay } from 'rxjs';

describe('AsyncComponent', () => {
  let component: AsyncComponent;
  let fixture: ComponentFixture<AsyncComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [AsyncComponent],
      providers: [
        { provide: DataService, useValue: dataServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should handle async data loading with fakeAsync', fakeAsync(() => {
    const mockData = ['item1', 'item2', 'item3'];
    dataService.getData.and.returnValue(of(mockData).pipe(delay(1000)));

    component.loadData();
    expect(component.loading).toBe(true);
    
    tick(1000); // Simulate passage of time
    
    expect(component.loading).toBe(false);
    expect(component.data).toEqual(mockData);
  }));

  it('should handle async data loading with async/await', async () => {
    const mockData = ['item1', 'item2', 'item3'];
    dataService.getData.and.returnValue(of(mockData));

    await component.loadData();
    
    expect(component.loading).toBe(false);
    expect(component.data).toEqual(mockData);
  });

  it('should handle promises with fakeAsync', fakeAsync(() => {
    const mockData = 'promise data';
    spyOn(component, 'getPromiseData').and.returnValue(
      new Promise(resolve => setTimeout(() => resolve(mockData), 2000))
    );

    component.loadPromiseData();
    expect(component.loading).toBe(true);
    
    tick(2000);
    
    expect(component.loading).toBe(false);
    expect(component.promiseData).toBe(mockData);
  }));
});
```

**Testing Best Practices:**

1. **AAA Pattern**: Arrange, Act, Assert
2. **Mock Dependencies**: Use spies and mocks for external dependencies
3. **Test Isolation**: Each test should be independent
4. **Descriptive Names**: Test names should describe what they test
5. **Edge Cases**: Test error conditions and edge cases
6. **Async Testing**: Use fakeAsync, tick, and flush for async operations
7. **Component Testing**: Test both logic and template rendering
8. **Service Testing**: Test HTTP calls with HttpClientTestingModule
9. **Integration Testing**: Test component interactions
10. **Coverage**: Aim for high test coverage but focus on critical paths

---

### Q12: What is Angular Security and how do you implement security best practices?
**Difficulty: Medium-Hard**

**Answer:**
Angular provides built-in security features to protect against common web vulnerabilities. Understanding and implementing these security measures is crucial for building secure applications.

**Cross-Site Scripting (XSS) Prevention:**

```typescript
// xss-prevention.component.ts
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-xss-prevention',
  template: `
    <div class="xss-demo">
      <h3>XSS Prevention Demo</h3>
      
      <!-- Angular automatically sanitizes this -->
      <div class="safe-content">
        <h4>Safe Content (Auto-sanitized)</h4>
        <p [innerHTML]="userContent"></p>
      </div>
      
      <!-- Bypassing sanitization (use with caution) -->
      <div class="trusted-content">
        <h4>Trusted Content (Manually sanitized)</h4>
        <div [innerHTML]="trustedHtml"></div>
      </div>
      
      <!-- Safe URL handling -->
      <div class="url-handling">
        <h4>Safe URL Handling</h4>
        <a [href]="safeUrl">Safe Link</a>
        <iframe [src]="safeResourceUrl" width="300" height="200"></iframe>
      </div>
      
      <!-- Input sanitization -->
      <div class="input-sanitization">
        <h4>Input Sanitization</h4>
        <input 
          [(ngModel)]="userInput" 
          (input)="sanitizeInput($event)"
          placeholder="Enter some text">
        <p>Sanitized: {{ sanitizedInput }}</p>
      </div>
    </div>
  `
})
export class XssPreventionComponent {
  userContent = '<script>alert("XSS Attack!")</script><p>Safe content</p>';
  userInput = '';
  sanitizedInput = '';
  
  trustedHtml: SafeHtml;
  safeUrl: SafeUrl;
  safeResourceUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Manually trust HTML content (only for trusted sources)
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(
      '<p style="color: green;">This is trusted HTML content</p>'
    );
    
    // Trust URLs
    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl('https://angular.io');
    this.safeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  }

  sanitizeInput(event: any) {
    const input = event.target.value;
    // Remove potentially dangerous characters
    this.sanitizedInput = input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  }
}

// Custom sanitization service
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanitizationService {
  
  sanitizeHtml(html: string): string {
    // Remove script tags
    html = html.replace(/<script[^>]*>.*?<\/script>/gi, '');
    
    // Remove event handlers
    html = html.replace(/on\w+="[^"]*"/gi, '');
    html = html.replace(/on\w+='[^']*'/gi, '');
    
    // Remove javascript: URLs
    html = html.replace(/javascript:[^"']*/gi, '');
    
    // Remove potentially dangerous tags
    const dangerousTags = ['iframe', 'object', 'embed', 'link', 'meta', 'style'];
    dangerousTags.forEach(tag => {
      const regex = new RegExp(`<${tag}[^>]*>.*?<\/${tag}>`, 'gi');
      html = html.replace(regex, '');
    });
    
    return html;
  }
  
  sanitizeUrl(url: string): string {
    // Allow only http, https, and mailto protocols
    const allowedProtocols = /^(https?|mailto):/i;
    
    if (!allowedProtocols.test(url)) {
      return '#'; // Return safe default
    }
    
    return url;
  }
  
  validateInput(input: string, type: 'email' | 'url' | 'text'): boolean {
    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
      
      case 'url':
        try {
          new URL(input);
          return this.sanitizeUrl(input) !== '#';
        } catch {
          return false;
        }
      
      case 'text':
        // Check for potentially malicious patterns
        const maliciousPatterns = [
          /<script/i,
          /javascript:/i,
          /on\w+=/i,
          /<iframe/i
        ];
        
        return !maliciousPatterns.some(pattern => pattern.test(input));
      
      default:
        return false;
    }
  }
}
```

**Authentication and Authorization:**

```typescript
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();
  
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'current_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredAuth();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', {
      username,
      password
    }).pipe(
      map(response => {
        this.setAuthData(response);
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    // Call logout endpoint
    this.http.post('/api/auth/logout', {}).subscribe();
    
    // Clear local storage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    
    // Clear subjects
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
    
    // Redirect to login
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    
    if (!refreshToken) {
      this.logout();
      return throwError('No refresh token available');
    }

    return this.http.post<AuthResponse>('/api/auth/refresh', {
      refreshToken
    }).pipe(
      map(response => {
        this.setAuthData(response);
        return response;
      }),
      catchError(error => {
        this.logout();
        return throwError(error);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles.includes(role) || false;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setAuthData(authResponse: AuthResponse): void {
    // Store tokens and user data
    localStorage.setItem(this.tokenKey, authResponse.token);
    localStorage.setItem(this.refreshTokenKey, authResponse.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(authResponse.user));
    
    // Update subjects
    this.currentUserSubject.next(authResponse.user);
    this.tokenSubject.next(authResponse.token);
    
    // Set token expiration timer
    this.setTokenExpirationTimer(authResponse.expiresIn);
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userJson = localStorage.getItem(this.userKey);
    
    if (token && userJson && !this.isTokenExpired(token)) {
      const user = JSON.parse(userJson);
      this.currentUserSubject.next(user);
      this.tokenSubject.next(token);
    } else {
      this.logout();
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  private setTokenExpirationTimer(expiresIn: number): void {
    // Refresh token 5 minutes before expiration
    const refreshTime = (expiresIn - 300) * 1000;
    
    setTimeout(() => {
      if (this.isAuthenticated()) {
        this.refreshToken().subscribe();
      }
    }, refreshTime);
  }
}

// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route);
  }

  private checkAuth(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check role-based access
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && !this.authService.hasAnyRole(requiredRoles)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}

// role.guard.ts
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'] as string;
    
    if (!this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
```

**HTTP Security with Interceptors:**

```typescript
// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add auth token to requests
    const authReq = this.addAuthHeader(req);
    
    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    }
    
    return req;
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.token);
          return next.handle(this.addAuthHeader(req));
        }),
        catchError(error => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => next.handle(this.addAuthHeader(req)))
      );
    }
  }
}

// security.interceptor.ts
@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add security headers
    const secureReq = req.clone({
      setHeaders: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    });
    
    return next.handle(secureReq);
  }
}
```

**Content Security Policy (CSP):**

```typescript
// csp.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CspService {
  
  constructor() {
    this.setupCSP();
  }

  private setupCSP(): void {
    // Set CSP meta tag dynamically
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = this.generateCSPPolicy();
    document.head.appendChild(cspMeta);
  }

  private generateCSPPolicy(): string {
    const policies = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://apis.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.example.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ];
    
    return policies.join('; ');
  }

  reportViolation(violationReport: any): void {
    // Send CSP violation reports to monitoring service
    console.warn('CSP Violation:', violationReport);
    
    // In production, send to logging service
    // this.loggingService.logSecurityViolation(violationReport);
  }
}
```

**Security Best Practices:**

1. **Input Validation**: Always validate and sanitize user inputs
2. **Output Encoding**: Use Angular's built-in sanitization
3. **Authentication**: Implement secure token-based authentication
4. **Authorization**: Use guards for route protection
5. **HTTPS**: Always use HTTPS in production
6. **CSP**: Implement Content Security Policy
7. **Token Management**: Secure storage and refresh mechanisms
8. **Error Handling**: Don't expose sensitive information in errors
9. **Dependencies**: Keep dependencies updated and scan for vulnerabilities
10. **Security Headers**: Implement security headers via interceptors

---

### Q13: What is NgRx and how do you implement state management in Angular?
**Difficulty: Hard**

**Answer:**
NgRx is a reactive state management library for Angular applications, inspired by Redux. It provides a predictable state container that helps manage application state through actions, reducers, effects, and selectors.

**Core NgRx Concepts:**

```typescript
// state/app.state.ts
import { ActionReducerMap } from '@ngrx/store';
import { UserState } from './user/user.reducer';
import { ProductState } from './product/product.reducer';
import { CartState } from './cart/cart.reducer';

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

// User State Management
// state/user/user.actions.ts
import { createAction, props } from '@ngrx/store';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

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
  props<{ id: number; changes: Partial<User> }>()
);
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

// Delete User Actions
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);
export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>()
);

// Select User Actions
export const selectUser = createAction(
  '[User] Select User',
  props<{ id: number }>()
);
export const clearSelectedUser = createAction('[User] Clear Selected User');

// Filter Actions
export const setUserFilter = createAction(
  '[User] Set Filter',
  props<{ filter: string }>()
);
export const clearUserFilter = createAction('[User] Clear Filter');
```

**User Reducer:**

```typescript
// state/user/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UserActions from './user.actions';
import { User } from './user.actions';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
  error: string | null;
  filter: string;
  lastUpdated: Date | null;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: (a: User, b: User) => a.name.localeCompare(b.name)
});

export const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
  filter: '',
  lastUpdated: null
});

export const userReducer = createReducer(
  initialUserState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, {
      ...state,
      loading: false,
      error: null,
      lastUpdated: new Date()
    })
  ),
  
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
  
  on(UserActions.createUserSuccess, (state, { user }) =>
    userAdapter.addOne(user, {
      ...state,
      loading: false,
      error: null,
      lastUpdated: new Date()
    })
  ),
  
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Update User
  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.updateUserSuccess, (state, { user }) =>
    userAdapter.updateOne(
      { id: user.id, changes: user },
      {
        ...state,
        loading: false,
        error: null,
        lastUpdated: new Date()
      }
    )
  ),
  
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Delete User
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.deleteUserSuccess, (state, { id }) =>
    userAdapter.removeOne(id, {
      ...state,
      loading: false,
      error: null,
      selectedUserId: state.selectedUserId === id ? null : state.selectedUserId,
      lastUpdated: new Date()
    })
  ),
  
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Select User
  on(UserActions.selectUser, (state, { id }) => ({
    ...state,
    selectedUserId: id
  })),
  
  on(UserActions.clearSelectedUser, (state) => ({
    ...state,
    selectedUserId: null
  })),
  
  // Filter
  on(UserActions.setUserFilter, (state, { filter }) => ({
    ...state,
    filter
  })),
  
  on(UserActions.clearUserFilter, (state) => ({
    ...state,
    filter: ''
  }))
);

// Export entity selectors
export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = userAdapter.getSelectors();
```

**User Selectors:**

```typescript
// state/user/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, selectAllUsers, selectUserEntities } from './user.reducer';
import { AppState } from '../app.state';

// Feature selector
export const selectUserState = createFeatureSelector<UserState>('users');

// Basic selectors
export const selectUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUsersFilter = createSelector(
  selectUserState,
  (state: UserState) => state.filter
);

export const selectSelectedUserId = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUserId
);

export const selectUsersLastUpdated = createSelector(
  selectUserState,
  (state: UserState) => state.lastUpdated
);

// Entity selectors
export const selectUsers = createSelector(
  selectUserState,
  selectAllUsers
);

export const selectUserEntitiesMap = createSelector(
  selectUserState,
  selectUserEntities
);

// Filtered users
export const selectFilteredUsers = createSelector(
  selectUsers,
  selectUsersFilter,
  (users, filter) => {
    if (!filter) return users;
    
    const lowerFilter = filter.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(lowerFilter) ||
      user.email.toLowerCase().includes(lowerFilter) ||
      user.role.toLowerCase().includes(lowerFilter)
    );
  }
);

// Selected user
export const selectSelectedUser = createSelector(
  selectUserEntitiesMap,
  selectSelectedUserId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

// Active users
export const selectActiveUsers = createSelector(
  selectUsers,
  (users) => users.filter(user => user.active)
);

// Users by role
export const selectUsersByRole = (role: string) => createSelector(
  selectUsers,
  (users) => users.filter(user => user.role === role)
);

// User statistics
export const selectUserStats = createSelector(
  selectUsers,
  (users) => {
    const total = users.length;
    const active = users.filter(u => u.active).length;
    const inactive = total - active;
    
    const roleStats = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total,
      active,
      inactive,
      roleStats
    };
  }
);

// Complex selector with multiple dependencies
export const selectUserDashboardData = createSelector(
  selectFilteredUsers,
  selectUsersLoading,
  selectUsersError,
  selectUserStats,
  selectSelectedUser,
  (users, loading, error, stats, selectedUser) => ({
    users,
    loading,
    error,
    stats,
    selectedUser,
    hasUsers: users.length > 0,
    isEmpty: users.length === 0 && !loading
  })
);
```

**User Effects:**

```typescript
// state/user/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, EMPTY } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  switchMap,
  withLatestFrom,
  filter,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';
import { selectUsersLastUpdated } from './user.selectors';
import { AppState } from '../app.state';

@Injectable()
export class UserEffects {
  
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  // Load users effect
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      withLatestFrom(this.store.select(selectUsersLastUpdated)),
      filter(([action, lastUpdated]) => {
        // Only load if data is stale (older than 5 minutes)
        if (!lastUpdated) return true;
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        return lastUpdated < fiveMinutesAgo;
      }),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ 
            error: error.message || 'Failed to load users' 
          })))
        )
      )
    )
  );

  // Create user effect
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      exhaustMap(action =>
        this.userService.createUser(action.user).pipe(
          map(user => UserActions.createUserSuccess({ user })),
          catchError(error => of(UserActions.createUserFailure({ 
            error: error.message || 'Failed to create user' 
          })))
        )
      )
    )
  );

  // Update user effect
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(action =>
        this.userService.updateUser(action.id, action.changes).pipe(
          map(user => UserActions.updateUserSuccess({ user })),
          catchError(error => of(UserActions.updateUserFailure({ 
            error: error.message || 'Failed to update user' 
          })))
        )
      )
    )
  );

  // Delete user effect
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      exhaustMap(action =>
        this.userService.deleteUser(action.id).pipe(
          map(() => UserActions.deleteUserSuccess({ id: action.id })),
          catchError(error => of(UserActions.deleteUserFailure({ 
            error: error.message || 'Failed to delete user' 
          })))
        )
      )
    )
  );

  // Auto-refresh effect
  autoRefresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsersSuccess),
      switchMap(() => {
        // Auto-refresh every 30 seconds
        return timer(30000).pipe(
          map(() => UserActions.loadUsers())
        );
      })
    )
  );

  // Search effect with debouncing
  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setUserFilter),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(action => {
        if (action.filter.length < 2) {
          return EMPTY; // Don't search for short queries
        }
        
        return this.userService.searchUsers(action.filter).pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ 
            error: error.message || 'Search failed' 
          })))
        );
      })
    )
  );

  // Notification effects
  userCreatedNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUserSuccess),
      map(action => {
        // Show success notification
        this.notificationService.showSuccess(`User ${action.user.name} created successfully`);
        return { type: '[Notification] User Created' };
      })
    ),
    { dispatch: false }
  );

  userErrorNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.loadUsersFailure,
        UserActions.createUserFailure,
        UserActions.updateUserFailure,
        UserActions.deleteUserFailure
      ),
      map(action => {
        this.notificationService.showError(action.error);
        return { type: '[Notification] User Error' };
      })
    ),
    { dispatch: false }
  );
}
```

**Component Integration:**

```typescript
// components/user-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import * as UserActions from '../state/user/user.actions';
import * as UserSelectors from '../state/user/user.selectors';
import { User } from '../state/user/user.actions';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list-container">
      <div class="header">
        <h2>User Management</h2>
        <button 
          class="btn btn-primary" 
          (click)="loadUsers()"
          [disabled]="loading$ | async">
          <span *ngIf="loading$ | async">Loading...</span>
          <span *ngIf="!(loading$ | async)">Refresh</span>
        </button>
      </div>
      
      <!-- Search and Filter -->
      <div class="filters">
        <input 
          type="text"
          placeholder="Search users..."
          [value]="filter$ | async"
          (input)="onFilterChange($event)"
          class="search-input">
        <button (click)="clearFilter()">Clear</button>
      </div>
      
      <!-- Statistics -->
      <div class="stats" *ngIf="stats$ | async as stats">
        <div class="stat-card">
          <h3>{{ stats.total }}</h3>
          <p>Total Users</p>
        </div>
        <div class="stat-card">
          <h3>{{ stats.active }}</h3>
          <p>Active Users</p>
        </div>
        <div class="stat-card">
          <h3>{{ stats.inactive }}</h3>
          <p>Inactive Users</p>
        </div>
      </div>
      
      <!-- Error Display -->
      <div class="error" *ngIf="error$ | async as error">
        {{ error }}
      </div>
      
      <!-- User List -->
      <div class="user-grid">
        <div 
          *ngFor="let user of filteredUsers$ | async; trackBy: trackByUserId"
          class="user-card"
          [class.selected]="(selectedUser$ | async)?.id === user.id"
          (click)="selectUser(user.id)">
          
          <div class="user-info">
            <h4>{{ user.name }}</h4>
            <p>{{ user.email }}</p>
            <span class="role-badge" [class]="'role-' + user.role">{{ user.role }}</span>
            <span class="status-badge" [class.active]="user.active">{{ user.active ? 'Active' : 'Inactive' }}</span>
          </div>
          
          <div class="user-actions">
            <button (click)="editUser(user); $event.stopPropagation()">Edit</button>
            <button (click)="deleteUser(user.id); $event.stopPropagation()" class="danger">Delete</button>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div class="empty-state" *ngIf="(dashboardData$ | async)?.isEmpty">
        <p>No users found</p>
        <button (click)="loadUsers()">Load Users</button>
      </div>
      
      <!-- Selected User Details -->
      <div class="user-details" *ngIf="selectedUser$ | async as selectedUser">
        <h3>User Details</h3>
        <p><strong>Name:</strong> {{ selectedUser.name }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        <p><strong>Role:</strong> {{ selectedUser.role }}</p>
        <p><strong>Status:</strong> {{ selectedUser.active ? 'Active' : 'Inactive' }}</p>
        <button (click)="clearSelection()">Close</button>
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Observables
  users$ = this.store.select(UserSelectors.selectUsers);
  filteredUsers$ = this.store.select(UserSelectors.selectFilteredUsers);
  selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
  loading$ = this.store.select(UserSelectors.selectUsersLoading);
  error$ = this.store.select(UserSelectors.selectUsersError);
  filter$ = this.store.select(UserSelectors.selectUsersFilter);
  stats$ = this.store.select(UserSelectors.selectUserStats);
  dashboardData$ = this.store.select(UserSelectors.selectUserDashboardData);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Load users on component initialization
    this.loadUsers();
    
    // Subscribe to dashboard data for complex operations
    this.dashboardData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // Handle dashboard data changes
        console.log('Dashboard data updated:', data);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers() {
    this.store.dispatch(UserActions.loadUsers());
  }

  selectUser(id: number) {
    this.store.dispatch(UserActions.selectUser({ id }));
  }

  clearSelection() {
    this.store.dispatch(UserActions.clearSelectedUser());
  }

  onFilterChange(event: any) {
    const filter = event.target.value;
    this.store.dispatch(UserActions.setUserFilter({ filter }));
  }

  clearFilter() {
    this.store.dispatch(UserActions.clearUserFilter());
  }

  editUser(user: User) {
    // Navigate to edit form or open modal
    // this.router.navigate(['/users', user.id, 'edit']);
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UserActions.deleteUser({ id }));
    }
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
```

**NgRx DevTools Integration:**

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './state/app.state';
import { UserEffects } from './state/user/user.effects';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    // NgRx Store
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    
    // NgRx Effects
    EffectsModule.forRoot([UserEffects]),
    
    // NgRx DevTools (only in development)
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    
    // Router Store
    StoreRouterConnectingModule.forRoot()
  ]
})
export class AppModule {}
```

**NgRx Best Practices:**

1. **Immutable State**: Always return new state objects
2. **Single Source of Truth**: Keep all state in the store
3. **Predictable State Updates**: Use pure functions in reducers
4. **Side Effects in Effects**: Handle async operations in effects
5. **Memoized Selectors**: Use createSelector for performance
6. **Entity Adapter**: Use for normalized state management
7. **Action Hygiene**: Use descriptive action names and types
8. **Error Handling**: Handle errors in effects and reducers
9. **Testing**: Test actions, reducers, effects, and selectors
10. **DevTools**: Use NgRx DevTools for debugging

---

### Q14: What are Angular 14 specific features and improvements?
**Difficulty: Medium-Hard**

**Answer:**
Angular 14 introduced several significant features and improvements that enhance developer experience, performance, and application capabilities.

**1. Standalone Components:**

```typescript
// standalone.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Standalone component - no need for NgModule
@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  template: `
    <div class="standalone-component">
      <h2>Standalone Component</h2>
      <p>This component doesn't need to be declared in any NgModule!</p>
      
      <input [(ngModel)]="message" placeholder="Enter message">
      <p>Message: {{ message }}</p>
      
      <button (click)="loadData()">Load Data</button>
      <div *ngIf="loading">Loading...</div>
      <ul *ngIf="data.length > 0">
        <li *ngFor="let item of data">{{ item.name }}</li>
      </ul>
      
      <a routerLink="/other-page">Navigate</a>
    </div>
  `,
  styles: [`
    .standalone-component {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin: 10px;
    }
  `]
})
export class StandaloneComponent {
  message = '';
  loading = false;
  data: any[] = [];

  constructor(private http: HttpClient) {}

  async loadData() {
    this.loading = true;
    try {
      this.data = await this.http.get<any[]>('/api/data').toPromise();
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      this.loading = false;
    }
  }
}

// Using standalone component in routing
// app-routing.module.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'standalone',
    loadComponent: () => import('./standalone.component').then(c => c.StandaloneComponent)
  },
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.routes').then(r => r.FEATURE_ROUTES)
  }
];

// feature/feature.routes.ts
import { Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { FeatureDetailComponent } from './feature-detail.component';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: FeatureComponent
  },
  {
    path: 'detail/:id',
    component: FeatureDetailComponent
  }
];
```

**2. Optional Injectors in Embedded Views:**

```typescript
// optional-injector.component.ts
import { Component, Injector, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-optional-injector',
  template: `
    <div class="container">
      <h3>Optional Injectors Demo</h3>
      
      <button (click)="createEmbeddedView()">Create Embedded View</button>
      <button (click)="createEmbeddedViewWithInjector()">Create with Custom Injector</button>
      
      <ng-template #templateRef let-data="data" let-service="service">
        <div class="embedded-view">
          <h4>Embedded View</h4>
          <p>Data: {{ data }}</p>
          <p>Service available: {{ !!service }}</p>
          <button *ngIf="service" (click)="service.performAction()">Use Service</button>
        </div>
      </ng-template>
      
      <div #container class="view-container"></div>
    </div>
  `
})
export class OptionalInjectorComponent {
  @ViewChild('templateRef', { static: true }) templateRef!: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  constructor(
    private injector: Injector,
    private dataService: DataService
  ) {}

  createEmbeddedView() {
    // Create embedded view without custom injector
    const viewRef = this.container.createEmbeddedView(this.templateRef, {
      data: 'Default data',
      service: null
    });
  }

  createEmbeddedViewWithInjector() {
    // Create custom injector with additional services
    const customInjector = Injector.create({
      providers: [
        { provide: DataService, useValue: this.dataService },
        { provide: 'CUSTOM_TOKEN', useValue: 'Custom value' }
      ],
      parent: this.injector
    });

    // Create embedded view with custom injector (Angular 14 feature)
    const viewRef = this.container.createEmbeddedView(
      this.templateRef,
      {
        data: 'Custom injector data',
        service: this.dataService
      },
      {
        injector: customInjector // This is the new Angular 14 feature
      }
    );
  }
}
```

**3. Extended Developer Diagnostics:**

```typescript
// main.ts - Enable extended diagnostics
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  // Enable extended diagnostics in development
  import('@angular/core').then(({ ɵsetClassDebugInfo, ɵsetClassMetadata }) => {
    // These provide better debugging information
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    // Enable extended diagnostics
    ngZoneEventCoalescing: true,
    ngZoneRunCoalescing: true
  })
  .catch(err => console.error(err));

// Component with diagnostics
@Component({
  selector: 'app-diagnostics',
  template: `
    <div class="diagnostics">
      <h3>Extended Diagnostics Demo</h3>
      
      <!-- This will show better error messages in dev mode -->
      <div *ngFor="let item of items; trackBy: trackByFn">
        {{ item.name }}
      </div>
      
      <!-- Better debugging for template expressions -->
      <p>{{ complexExpression() }}</p>
      
      <!-- Improved change detection debugging -->
      <button (click)="updateData()">Update Data</button>
    </div>
  `
})
export class DiagnosticsComponent {
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];

  trackByFn(index: number, item: any) {
    return item.id;
  }

  complexExpression() {
    // Angular 14 provides better debugging for complex expressions
    return this.items
      .filter(item => item.id > 0)
      .map(item => item.name)
      .join(', ');
  }

  updateData() {
    // Better change detection debugging
    this.items = [...this.items, { id: Date.now(), name: `Item ${Date.now()}` }];
  }
}
```

**4. Angular CLI Auto-Completion:**

```bash
# Enable Angular CLI auto-completion (Angular 14 feature)
ng completion

# Add to your shell profile (.bashrc, .zshrc, etc.)
echo 'source <(ng completion script)' >> ~/.bashrc

# Now you get auto-completion for:
ng generate component <TAB>  # Shows available options
ng build --<TAB>             # Shows build flags
ng test --<TAB>              # Shows test options
```

**5. Bind Route Info to Component Inputs:**

```typescript
// route-binding.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-route-binding',
  template: `
    <div class="route-binding">
      <h3>Route Binding Demo</h3>
      <p>User ID from route: {{ userId }}</p>
      <p>Tab from query params: {{ tab }}</p>
      <p>Data from route data: {{ routeData }}</p>
    </div>
  `
})
export class RouteBindingComponent {
  // Angular 14 allows binding route info directly to component inputs
  @Input() userId!: string;      // From route params
  @Input() tab!: string;         // From query params
  @Input() routeData!: any;      // From route data
}

// app-routing.module.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user/:userId',
    component: RouteBindingComponent,
    data: { routeData: 'Some route data' },
    // Angular 14 feature: bind route info to component inputs
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

// Usage: /user/123?tab=profile
// Will automatically bind:
// - userId = '123'
// - tab = 'profile'
// - routeData = 'Some route data'
```

**6. Protected Routes with Functional Guards:**

```typescript
// functional-guards.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

// Functional guard (Angular 14 feature)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

export const roleGuard = (requiredRole: string): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    return authService.currentUser$.pipe(
      map(user => {
        if (user && user.roles.includes(requiredRole)) {
          return true;
        } else {
          router.navigate(['/unauthorized']);
          return false;
        }
      })
    );
  };
};

export const canMatchFeature: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  
  return authService.hasFeatureAccess('advanced-features');
};

// Using functional guards in routing
export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard('admin')]
  },
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
    canMatch: [canMatchFeature]
  }
];
```

**7. Page Title Strategy:**

```typescript
// title-strategy.service.ts
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {
  constructor(private title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      // Custom title formatting
      this.title.setTitle(`MyApp - ${title}`);
    } else {
      this.title.setTitle('MyApp - Default Title');
    }
  }
}

// app.module.ts
import { TitleStrategy } from '@angular/router';

@NgModule({
  providers: [
    { provide: TitleStrategy, useClass: CustomTitleStrategy }
  ]
})
export class AppModule {}

// Using in routes
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home Page'
  },
  {
    path: 'user/:id',
    component: UserComponent,
    title: (route) => `User ${route.params['id']}`
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products',
    children: [
      {
        path: ':id',
        component: ProductDetailComponent,
        title: 'Product Details'
      }
    ]
  }
];
```

**8. Strict Typed Forms (Reactive Forms):**

```typescript
// typed-forms.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number>;
  preferences: FormGroup<{
    newsletter: FormControl<boolean>;
    theme: FormControl<'light' | 'dark'>;
  }>;
}

@Component({
  selector: 'app-typed-forms',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" formControlName="name" type="text">
        <div *ngIf="userForm.get('name')?.errors?.['required']">
          Name is required
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" formControlName="email" type="email">
        <div *ngIf="userForm.get('email')?.errors?.['email']">
          Invalid email format
        </div>
      </div>
      
      <div class="form-group">
        <label for="age">Age:</label>
        <input id="age" formControlName="age" type="number">
      </div>
      
      <div formGroupName="preferences">
        <h4>Preferences</h4>
        
        <label>
          <input formControlName="newsletter" type="checkbox">
          Subscribe to newsletter
        </label>
        
        <div class="form-group">
          <label for="theme">Theme:</label>
          <select id="theme" formControlName="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      
      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>
    
    <div class="form-debug">
      <h4>Form Value (Typed):</h4>
      <pre>{{ formValue | json }}</pre>
      
      <h4>Form Status:</h4>
      <p>Valid: {{ userForm.valid }}</p>
      <p>Touched: {{ userForm.touched }}</p>
      <p>Dirty: {{ userForm.dirty }}</p>
    </div>
  `
})
export class TypedFormsComponent {
  // Strongly typed form with Angular 14
  userForm: FormGroup<UserForm>;
  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      age: this.fb.control(0, { validators: [Validators.min(0), Validators.max(120)], nonNullable: true }),
      preferences: this.fb.group({
        newsletter: this.fb.control(false, { nonNullable: true }),
        theme: this.fb.control<'light' | 'dark'>('light', { nonNullable: true })
      })
    });
  }
  
  get formValue() {
    // Type-safe access to form values
    return this.userForm.value;
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      // formData is now strongly typed!
      console.log('Form submitted:', formData);
      
      // Type-safe access to individual controls
      const name = this.userForm.get('name')?.value; // string
      const email = this.userForm.get('email')?.value; // string
      const age = this.userForm.get('age')?.value; // number
      const newsletter = this.userForm.get('preferences.newsletter')?.value; // boolean
      const theme = this.userForm.get('preferences.theme')?.value; // 'light' | 'dark'
    }
  }
  
  // Type-safe form manipulation
  updateUserData(userData: Partial<{ name: string; email: string; age: number }>) {
    this.userForm.patchValue({
      name: userData.name,
      email: userData.email,
      age: userData.age
    });
  }
  
  // Type-safe validation
  validateForm(): boolean {
    const nameControl = this.userForm.get('name');
    const emailControl = this.userForm.get('email');
    
    return !!(nameControl?.valid && emailControl?.valid);
  }
}
```

**Angular 14 Key Benefits:**

1. **Standalone Components**: Simplified component architecture
2. **Better Developer Experience**: Enhanced debugging and diagnostics
3. **Improved Performance**: Better tree-shaking and bundle sizes
4. **Type Safety**: Strongly typed reactive forms
5. **Modern Routing**: Functional guards and better route binding
6. **CLI Improvements**: Auto-completion and better tooling
7. **Flexible Architecture**: Mix of standalone and module-based components
8. **Enhanced Testing**: Better testing utilities and debugging

---

### Q15: How do you optimize Angular application performance?
**Difficulty: Hard**

**Answer:**
Angular performance optimization involves multiple strategies across different layers of the application. Here's a comprehensive approach:

**1. Change Detection Optimization:**

```typescript
// performance-optimized.component.ts
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, TrackByFunction } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-performance-optimized',
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush strategy
  template: `
    <div class="performance-container">
      <h3>Performance Optimized Component</h3>
      
      <!-- Use async pipe to avoid manual subscriptions -->
      <div *ngIf="loading$ | async" class="loading">Loading...</div>
      
      <!-- Use trackBy for large lists -->
      <div class="item-list">
        <div 
          *ngFor="let item of items$ | async; trackBy: trackByItemId"
          class="item"
          [class.selected]="item.id === (selectedItemId$ | async)">
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
          <span class="price">{{ item.price | currency }}</span>
        </div>
      </div>
      
      <!-- Debounced search -->
      <input 
        type="text"
        placeholder="Search items..."
        (input)="onSearchInput($event)"
        class="search-input">
      
      <!-- Virtual scrolling for large datasets -->
      <cdk-virtual-scroll-viewport itemSize="50" class="virtual-scroll">
        <div *cdkVirtualFor="let item of virtualItems$ | async; trackBy: trackByItemId">
          {{ item.name }}
        </div>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styles: [`
    .performance-container {
      height: 100vh;
      overflow: hidden;
    }
    .virtual-scroll {
      height: 400px;
    }
    .item {
      padding: 10px;
      border-bottom: 1px solid #eee;
      transition: background-color 0.2s;
    }
    .item.selected {
      background-color: #e3f2fd;
    }
  `]
})
export class PerformanceOptimizedComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject$ = new BehaviorSubject<string>('');
  
  // Use observables for reactive data flow
  items$: Observable<Item[]>;
  virtualItems$: Observable<Item[]>;
  loading$: Observable<boolean>;
  selectedItemId$: Observable<number | null>;
  
  constructor(
    private itemService: ItemService,
    private cdr: ChangeDetectorRef
  ) {
    // Setup reactive streams
    this.items$ = this.itemService.getItems();
    this.loading$ = this.itemService.loading$;
    this.selectedItemId$ = this.itemService.selectedItemId$;
    
    // Setup virtual scrolling data
    this.virtualItems$ = this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => 
        this.itemService.searchItems(searchTerm)
      )
    );
  }
  
  ngOnInit() {
    // Load initial data
    this.itemService.loadItems();
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // TrackBy function for *ngFor optimization
  trackByItemId: TrackByFunction<Item> = (index: number, item: Item) => {
    return item.id; // Use unique identifier
  };
  
  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchSubject$.next(target.value);
  }
  
  // Manual change detection trigger when needed
  forceUpdate() {
    this.cdr.detectChanges();
  }
  
  private setupPerformanceMonitoring() {
    // Monitor component performance
    if (typeof performance !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log('Performance entry:', entry);
        });
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
  }
}

// Optimized service with caching
@Injectable({ providedIn: 'root' })
export class ItemService {
  private itemsSubject$ = new BehaviorSubject<Item[]>([]);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  private selectedItemIdSubject$ = new BehaviorSubject<number | null>(null);
  private cache = new Map<string, Item[]>();
  
  items$ = this.itemsSubject$.asObservable();
  loading$ = this.loadingSubject$.asObservable();
  selectedItemId$ = this.selectedItemIdSubject$.asObservable();
  
  constructor(private http: HttpClient) {}
  
  loadItems(): Observable<Item[]> {
    const cacheKey = 'all-items';
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cachedItems = this.cache.get(cacheKey)!;
      this.itemsSubject$.next(cachedItems);
      return of(cachedItems);
    }
    
    this.loadingSubject$.next(true);
    
    return this.http.get<Item[]>('/api/items').pipe(
      tap(items => {
        // Cache the results
        this.cache.set(cacheKey, items);
        this.itemsSubject$.next(items);
        this.loadingSubject$.next(false);
      }),
      catchError(error => {
        this.loadingSubject$.next(false);
        console.error('Failed to load items:', error);
        return of([]);
      })
    );
  }
  
  searchItems(searchTerm: string): Observable<Item[]> {
    if (!searchTerm.trim()) {
      return this.items$;
    }
    
    const cacheKey = `search-${searchTerm}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey)!);
    }
    
    return this.http.get<Item[]>(`/api/items/search?q=${encodeURIComponent(searchTerm)}`).pipe(
      tap(items => {
        // Cache search results
        this.cache.set(cacheKey, items);
      }),
      catchError(error => {
        console.error('Search failed:', error);
        return of([]);
      })
    );
  }
  
  selectItem(id: number) {
    this.selectedItemIdSubject$.next(id);
  }
  
  clearCache() {
    this.cache.clear();
  }
}
```

**2. Lazy Loading and Code Splitting:**

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    data: { preload: true } // Custom preloading flag
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    data: { preload: false }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard],
    data: { preload: false }
  },
  // Standalone component lazy loading
  {
    path: 'standalone',
    loadComponent: () => import('./standalone/standalone.component').then(c => c.StandaloneComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Use custom preloading strategy
    preloadingStrategy: CustomPreloadingStrategy,
    // Enable router optimizations
    enableTracing: false, // Only for debugging
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// Custom preloading strategy
@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Only preload routes marked for preloading
    if (route.data && route.data['preload']) {
      console.log('Preloading:', route.path);
      return load();
    }
    return of(null);
  }
}
```

**3. Bundle Optimization:**

```typescript
// webpack-bundle-analyzer configuration
// angular.json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "optimization": true,
            "buildOptimizer": true,
            "aot": true,
            "extractLicenses": true,
            "sourceMap": false,
            "namedChunks": false,
            "vendorChunk": true,
            "commonChunk": true,
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "2mb",
                "maximumError": "5mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "6kb",
                "maximumError": "10kb"
              }
            ]
          }
        },
        "analyze": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "statsJson": true
          }
        }
      }
    }
  }
}

// Tree shaking optimization
// shared/utils.ts
// Use named exports for better tree shaking
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function memoize<T extends (...args: any[]) => any>(
  func: T
): T {
  const cache = new Map();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(null, args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Import only what you need
// BAD: import * as utils from './utils';
// GOOD: import { debounce, throttle } from './utils';
```

**4. Image and Asset Optimization:**

```typescript
// image-optimization.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-optimization',
  template: `
    <div class="image-gallery">
      <!-- Lazy loading images -->
      <img 
        *ngFor="let image of images; trackBy: trackByImageId"
        [src]="image.thumbnail"
        [attr.data-src]="image.fullSize"
        [alt]="image.alt"
        class="lazy-image"
        loading="lazy"
        (load)="onImageLoad($event)"
        (error)="onImageError($event)">
      
      <!-- Responsive images -->
      <picture>
        <source 
          media="(min-width: 768px)" 
          [srcset]="getResponsiveSrcSet('large')">
        <source 
          media="(min-width: 480px)" 
          [srcset]="getResponsiveSrcSet('medium')">
        <img 
          [src]="getResponsiveSrcSet('small')"
          alt="Responsive image"
          loading="lazy">
      </picture>
      
      <!-- WebP support with fallback -->
      <picture>
        <source type="image/webp" [srcset]="image.webp">
        <source type="image/jpeg" [srcset]="image.jpeg">
        <img [src]="image.jpeg" [alt]="image.alt" loading="lazy">
      </picture>
    </div>
  `,
  styles: [`
    .image-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      padding: 16px;
    }
    
    .lazy-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
      transition: opacity 0.3s ease;
    }
    
    .lazy-image[data-loaded="false"] {
      opacity: 0.5;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class ImageOptimizationComponent implements OnInit {
  images = [
    {
      id: 1,
      thumbnail: '/assets/images/thumb1.jpg',
      fullSize: '/assets/images/full1.jpg',
      webp: '/assets/images/image1.webp',
      jpeg: '/assets/images/image1.jpg',
      alt: 'Image 1'
    }
    // ... more images
  ];
  
  private intersectionObserver?: IntersectionObserver;
  
  ngOnInit() {
    this.setupLazyLoading();
  }
  
  trackByImageId(index: number, image: any): number {
    return image.id;
  }
  
  getResponsiveSrcSet(size: 'small' | 'medium' | 'large'): string {
    const sizes = {
      small: '480w',
      medium: '768w',
      large: '1200w'
    };
    return `/assets/images/responsive-${size}.jpg ${sizes[size]}`;
  }
  
  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.setAttribute('data-loaded', 'true');
  }
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/placeholder.jpg'; // Fallback image
  }
  
  private setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const dataSrc = img.getAttribute('data-src');
              if (dataSrc) {
                img.src = dataSrc;
                img.removeAttribute('data-src');
                this.intersectionObserver?.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );
      
      // Observe all lazy images
      setTimeout(() => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
          this.intersectionObserver?.observe(img);
        });
      }, 100);
    }
  }
}
```

**5. Memory Management and Leak Prevention:**

```typescript
// memory-management.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subject, fromEvent, interval } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-memory-management',
  template: `
    <div class="memory-container">
      <h3>Memory Management Demo</h3>
      
      <div #scrollContainer class="scroll-container">
        <!-- Large list with proper cleanup -->
        <div *ngFor="let item of items; trackBy: trackByFn" class="item">
          {{ item.name }}
        </div>
      </div>
      
      <div class="memory-stats">
        <p>Memory Usage: {{ memoryUsage }}MB</p>
        <p>Active Subscriptions: {{ activeSubscriptions }}</p>
        <button (click)="forceGarbageCollection()">Force GC</button>
      </div>
    </div>
  `
})
export class MemoryManagementComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  
  private destroy$ = new Subject<void>();
  private subscriptions = new Set<any>();
  
  items: any[] = [];
  memoryUsage = 0;
  activeSubscriptions = 0;
  
  ngOnInit() {
    this.setupMemoryMonitoring();
    this.setupEventListeners();
    this.loadData();
  }
  
  ngOnDestroy() {
    // Cleanup all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
    
    // Clear any remaining references
    this.items = [];
    this.subscriptions.clear();
    
    // Remove event listeners
    this.removeEventListeners();
  }
  
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  
  private setupMemoryMonitoring() {
    // Monitor memory usage
    const memoryMonitor$ = interval(5000).pipe(
      takeUntil(this.destroy$)
    );
    
    const subscription = memoryMonitor$.subscribe(() => {
      this.updateMemoryStats();
    });
    
    this.subscriptions.add(subscription);
  }
  
  private setupEventListeners() {
    // Properly managed event listeners
    const scroll$ = fromEvent(this.scrollContainer.nativeElement, 'scroll').pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    );
    
    const scrollSubscription = scroll$.subscribe((event) => {
      this.handleScroll(event);
    });
    
    this.subscriptions.add(scrollSubscription);
    
    // Window resize listener
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(250),
      takeUntil(this.destroy$)
    );
    
    const resizeSubscription = resize$.subscribe(() => {
      this.handleResize();
    });
    
    this.subscriptions.add(resizeSubscription);
  }
  
  private loadData() {
    // Simulate loading large dataset
    this.items = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      data: new Array(100).fill(0).map(() => Math.random())
    }));
  }
  
  private handleScroll(event: Event) {
    // Implement virtual scrolling or pagination
    const element = event.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = element;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      // Load more data if needed
      this.loadMoreData();
    }
  }
  
  private handleResize() {
    // Handle window resize
    console.log('Window resized');
  }
  
  private loadMoreData() {
    // Implement pagination to avoid memory issues
    console.log('Loading more data...');
  }
  
  private updateMemoryStats() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024);
    }
    
    this.activeSubscriptions = this.subscriptions.size;
  }
  
  private removeEventListeners() {
    // Clean up any manual event listeners
    // (RxJS subscriptions are handled by takeUntil)
  }
  
  forceGarbageCollection() {
    // Force garbage collection (development only)
    if ('gc' in window) {
      (window as any).gc();
    }
    
    // Clear unused data
    this.items = this.items.filter(item => item.id % 2 === 0);
    
    setTimeout(() => {
      this.updateMemoryStats();
    }, 1000);
  }
}
```

**6. Service Worker and Caching:**

```typescript
// app.module.ts
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
})
export class AppModule {}

// sw-update.service.ts
import { Injectable } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  constructor(
    private swUpdate: SwUpdate,
    private swPush: SwPush
  ) {
    if (swUpdate.isEnabled) {
      // Check for updates every 6 hours
      interval(6 * 60 * 60 * 1000).subscribe(() => {
        swUpdate.checkForUpdate();
      });
      
      // Handle available updates
      swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load new version?')) {
          window.location.reload();
        }
      });
    }
  }
  
  checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
    }
  }
}

// ngsw-config.json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api-performance",
      "urls": ["/api/**"],
      "cacheConfig": {
        "strategy": "performance",
        "maxSize": 100,
        "maxAge": "3d"
      }
    }
  ]
}
```

**Performance Monitoring:**

```typescript
// performance-monitor.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PerformanceMonitorService {
  private metrics = new Map<string, number>();
  
  startMeasure(name: string) {
    performance.mark(`${name}-start`);
  }
  
  endMeasure(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name)[0];
    this.metrics.set(name, measure.duration);
    
    console.log(`${name}: ${measure.duration}ms`);
  }
  
  getMetrics() {
    return new Map(this.metrics);
  }
  
  clearMetrics() {
    this.metrics.clear();
    performance.clearMarks();
    performance.clearMeasures();
  }
  
  // Core Web Vitals monitoring
  monitorCoreWebVitals() {
    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('FCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['paint'] });
    
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          console.log('CLS:', (entry as any).value);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
}
```

**Key Performance Optimization Strategies:**

1. **Change Detection**: Use OnPush strategy, async pipe, trackBy functions
2. **Lazy Loading**: Implement route-based and component-based lazy loading
3. **Bundle Optimization**: Tree shaking, code splitting, compression
4. **Caching**: HTTP caching, service worker, memory caching
5. **Image Optimization**: Lazy loading, responsive images, WebP format
6. **Memory Management**: Proper subscription cleanup, avoid memory leaks
7. **Virtual Scrolling**: For large datasets
8. **Preloading**: Strategic preloading of routes and data
9. **Compression**: Gzip, Brotli compression
10. **CDN**: Use CDN for static assets

---

### Q16: How do you implement comprehensive error handling in Angular?
**Difficulty: Hard**

**Answer:**
Comprehensive error handling in Angular involves multiple layers: global error handling, HTTP error handling, form validation errors, and user-friendly error display.

**1. Global Error Handler:**

```typescript
// global-error-handler.service.ts
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { LoggingService } from './logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse): void {
    const notificationService = this.injector.get(NotificationService);
    const loggingService = this.injector.get(LoggingService);
    const router = this.injector.get(Router);

    let displayMessage = 'An unexpected error occurred';
    let logLevel: 'error' | 'warn' | 'info' = 'error';

    if (error instanceof HttpErrorResponse) {
      // HTTP error handling
      displayMessage = this.getHttpErrorMessage(error);
      logLevel = this.getHttpErrorLogLevel(error);
      
      // Handle specific HTTP errors
      this.handleHttpError(error, router);
    } else {
      // JavaScript error handling
      displayMessage = this.getJavaScriptErrorMessage(error);
      
      // Handle specific JavaScript errors
      this.handleJavaScriptError(error);
    }

    // Log the error
    loggingService.log({
      level: logLevel,
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId()
    });

    // Show user-friendly notification
    notificationService.showError(displayMessage);

    // Report to external service (optional)
    this.reportToExternalService(error);
  }

  private getHttpErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'No internet connection. Please check your network.';
      case 400:
        return error.error?.message || 'Invalid request. Please check your input.';
      case 401:
        return 'You are not authorized. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'Conflict occurred. The resource may have been modified.';
      case 422:
        return 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return `An error occurred (${error.status}). Please try again.`;
    }
  }

  private getJavaScriptErrorMessage(error: Error): string {
    if (error.name === 'ChunkLoadError') {
      return 'Failed to load application. Please refresh the page.';
    }
    
    if (error.message.includes('Loading chunk')) {
      return 'Failed to load part of the application. Please refresh the page.';
    }
    
    if (error.message.includes('Script error')) {
      return 'A script error occurred. Please refresh the page.';
    }
    
    return 'An unexpected error occurred. Please refresh the page.';
  }

  private getHttpErrorLogLevel(error: HttpErrorResponse): 'error' | 'warn' | 'info' {
    if (error.status >= 500) return 'error';
    if (error.status >= 400) return 'warn';
    return 'info';
  }

  private handleHttpError(error: HttpErrorResponse, router: Router): void {
    switch (error.status) {
      case 401:
        // Redirect to login
        router.navigate(['/login']);
        break;
      case 403:
        // Redirect to unauthorized page
        router.navigate(['/unauthorized']);
        break;
      case 404:
        // Redirect to not found page
        router.navigate(['/not-found']);
        break;
    }
  }

  private handleJavaScriptError(error: Error): void {
    if (error.name === 'ChunkLoadError') {
      // Automatically reload the page for chunk load errors
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  private getCurrentUserId(): string | null {
    // Get current user ID from your auth service
    try {
      const authService = this.injector.get(AuthService);
      return authService.getCurrentUserId();
    } catch {
      return null;
    }
  }

  private getSessionId(): string {
    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private reportToExternalService(error: Error | HttpErrorResponse): void {
    // Report to external error tracking service (e.g., Sentry, Bugsnag)
    try {
      // Example: Sentry.captureException(error);
      console.log('Error reported to external service:', error);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }
}

// Register in app.module.ts
@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class AppModule {}
```

**2. HTTP Error Interceptor:**

```typescript
// http-error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer, of } from 'rxjs';
import { catchError, retryWhen, concatMap, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retryWhen(errors =>
        errors.pipe(
          concatMap((error, count) => {
            // Retry logic for specific errors
            if (count < 3 && this.shouldRetry(error)) {
              const delay = Math.pow(2, count) * 1000; // Exponential backoff
              console.log(`Retrying request in ${delay}ms (attempt ${count + 1})`);
              return timer(delay);
            }
            return throwError(error);
          })
        )
      ),
      catchError((error: HttpErrorResponse) => {
        return this.handleHttpError(error, request);
      }),
      finalize(() => {
        // Always hide loading indicator
        this.loadingService.hide();
      })
    );
  }

  private shouldRetry(error: HttpErrorResponse): boolean {
    // Retry for network errors and 5xx server errors
    return (
      error.status === 0 || // Network error
      error.status === 408 || // Request timeout
      error.status === 429 || // Too many requests
      (error.status >= 500 && error.status < 600) // Server errors
    );
  }

  private handleHttpError(
    error: HttpErrorResponse,
    request: HttpRequest<any>
  ): Observable<never> {
    let errorMessage = 'An error occurred';
    let shouldShowToUser = true;

    switch (error.status) {
      case 0:
        errorMessage = 'Network error. Please check your connection.';
        break;
      
      case 400:
        errorMessage = this.extractErrorMessage(error) || 'Bad request';
        break;
      
      case 401:
        errorMessage = 'Authentication required';
        this.handleUnauthorized();
        shouldShowToUser = false; // Handled by redirect
        break;
      
      case 403:
        errorMessage = 'Access forbidden';
        break;
      
      case 404:
        errorMessage = 'Resource not found';
        // Don't show 404 errors for background requests
        shouldShowToUser = !this.isBackgroundRequest(request);
        break;
      
      case 409:
        errorMessage = 'Conflict: Resource has been modified';
        break;
      
      case 422:
        errorMessage = this.extractValidationErrors(error);
        break;
      
      case 429:
        errorMessage = 'Too many requests. Please try again later.';
        break;
      
      case 500:
        errorMessage = 'Internal server error';
        break;
      
      case 502:
      case 503:
      case 504:
        errorMessage = 'Service temporarily unavailable';
        break;
      
      default:
        errorMessage = `Error ${error.status}: ${error.statusText}`;
    }

    // Create enhanced error object
    const enhancedError = new HttpErrorResponse({
      error: {
        ...error.error,
        userMessage: errorMessage,
        shouldShowToUser,
        requestUrl: request.url,
        requestMethod: request.method,
        timestamp: new Date().toISOString()
      },
      headers: error.headers,
      status: error.status,
      statusText: error.statusText,
      url: error.url
    });

    return throwError(enhancedError);
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }
    
    if (error.error?.error) {
      return error.error.error;
    }
    
    if (typeof error.error === 'string') {
      return error.error;
    }
    
    return '';
  }

  private extractValidationErrors(error: HttpErrorResponse): string {
    if (error.error?.errors) {
      const errors = error.error.errors;
      if (Array.isArray(errors)) {
        return errors.join(', ');
      }
      
      if (typeof errors === 'object') {
        return Object.values(errors).flat().join(', ');
      }
    }
    
    return this.extractErrorMessage(error) || 'Validation failed';
  }

  private handleUnauthorized(): void {
    // Clear auth tokens and redirect to login
    this.authService.logout();
  }

  private isBackgroundRequest(request: HttpRequest<any>): boolean {
    // Check if this is a background request (e.g., polling, analytics)
    return request.headers.has('X-Background-Request') ||
           request.url.includes('/analytics') ||
           request.url.includes('/health-check');
  }
}
```

**3. Form Validation Error Handling:**

```typescript
// form-error-handler.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  template: `
    <div class="form-errors" *ngIf="hasErrors">
      <div 
        *ngFor="let error of errorMessages" 
        class="error-message"
        [class.field-error]="error.type === 'field'"
        [class.form-error]="error.type === 'form'">
        <i class="error-icon" [class]="getErrorIcon(error.severity)"></i>
        <span>{{ error.message }}</span>
      </div>
    </div>
  `,
  styles: [`
    .form-errors {
      margin-top: 8px;
    }
    
    .error-message {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      margin-bottom: 4px;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .field-error {
      background-color: #ffebee;
      color: #c62828;
      border-left: 4px solid #f44336;
    }
    
    .form-error {
      background-color: #fff3e0;
      color: #ef6c00;
      border-left: 4px solid #ff9800;
    }
    
    .error-icon {
      margin-right: 8px;
      font-size: 16px;
    }
    
    .icon-error::before { content: '⚠️'; }
    .icon-warning::before { content: '⚠️'; }
    .icon-info::before { content: 'ℹ️'; }
  `]
})
export class FormErrorsComponent implements OnInit {
  @Input() control?: AbstractControl;
  @Input() form?: FormGroup;
  @Input() fieldName?: string;
  @Input() customErrors?: { [key: string]: string };
  
  errorMessages: Array<{
    message: string;
    type: 'field' | 'form';
    severity: 'error' | 'warning' | 'info';
  }> = [];
  
  private defaultErrorMessages: { [key: string]: string } = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: 'Minimum length is {requiredLength} characters',
    maxlength: 'Maximum length is {requiredLength} characters',
    min: 'Minimum value is {min}',
    max: 'Maximum value is {max}',
    pattern: 'Please enter a valid format',
    passwordMismatch: 'Passwords do not match',
    uniqueEmail: 'This email is already registered',
    strongPassword: 'Password must contain uppercase, lowercase, number and special character'
  };
  
  ngOnInit() {
    this.updateErrorMessages();
  }
  
  ngOnChanges() {
    this.updateErrorMessages();
  }
  
  get hasErrors(): boolean {
    return this.errorMessages.length > 0;
  }
  
  private updateErrorMessages(): void {
    this.errorMessages = [];
    
    if (this.control && this.control.errors && this.shouldShowErrors()) {
      this.addFieldErrors(this.control.errors);
    }
    
    if (this.form && this.form.errors) {
      this.addFormErrors(this.form.errors);
    }
  }
  
  private shouldShowErrors(): boolean {
    return !!(this.control && 
             (this.control.dirty || this.control.touched) && 
             this.control.invalid);
  }
  
  private addFieldErrors(errors: ValidationErrors): void {
    Object.keys(errors).forEach(errorKey => {
      const errorValue = errors[errorKey];
      let message = this.getErrorMessage(errorKey, errorValue);
      
      this.errorMessages.push({
        message,
        type: 'field',
        severity: this.getErrorSeverity(errorKey)
      });
    });
  }
  
  private addFormErrors(errors: ValidationErrors): void {
    Object.keys(errors).forEach(errorKey => {
      const errorValue = errors[errorKey];
      let message = this.getErrorMessage(errorKey, errorValue);
      
      this.errorMessages.push({
        message,
        type: 'form',
        severity: 'warning'
      });
    });
  }
  
  private getErrorMessage(errorKey: string, errorValue: any): string {
    // Check custom errors first
    if (this.customErrors && this.customErrors[errorKey]) {
      return this.interpolateMessage(this.customErrors[errorKey], errorValue);
    }
    
    // Check default errors
    if (this.defaultErrorMessages[errorKey]) {
      return this.interpolateMessage(this.defaultErrorMessages[errorKey], errorValue);
    }
    
    // Fallback to generic message
    return `Invalid ${this.fieldName || 'value'}`;
  }
  
  private interpolateMessage(template: string, errorValue: any): string {
    if (typeof errorValue === 'object' && errorValue !== null) {
      let message = template;
      Object.keys(errorValue).forEach(key => {
        message = message.replace(`{${key}}`, errorValue[key]);
      });
      return message;
    }
    return template;
  }
  
  private getErrorSeverity(errorKey: string): 'error' | 'warning' | 'info' {
    const errorSeverities: { [key: string]: 'error' | 'warning' | 'info' } = {
      required: 'error',
      email: 'error',
      minlength: 'warning',
      maxlength: 'warning',
      pattern: 'error',
      passwordMismatch: 'error',
      uniqueEmail: 'error',
      strongPassword: 'info'
    };
    
    return errorSeverities[errorKey] || 'error';
  }
  
  getErrorIcon(severity: 'error' | 'warning' | 'info'): string {
    return `icon-${severity}`;
  }
}

// Usage in forms
@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          id="email" 
          type="email" 
          formControlName="email"
          [class.error]="userForm.get('email')?.invalid && userForm.get('email')?.touched">
        <app-form-errors 
          [control]="userForm.get('email')!"
          fieldName="email"
          [customErrors]="{
            required: 'Email address is required',
            email: 'Please enter a valid email address',
            uniqueEmail: 'This email is already taken'
          }">
        </app-form-errors>
      </div>
      
      <div class="form-group">
        <label for="password">Password:</label>
        <input 
          id="password" 
          type="password" 
          formControlName="password"
          [class.error]="userForm.get('password')?.invalid && userForm.get('password')?.touched">
        <app-form-errors 
          [control]="userForm.get('password')!"
          fieldName="password">
        </app-form-errors>
      </div>
      
      <!-- Form-level errors -->
      <app-form-errors [form]="userForm"></app-form-errors>
      
      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>
  `
})
export class UserFormComponent {
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], [this.uniqueEmailValidator.bind(this)]],
    password: ['', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]]
  }, {
    validators: [this.customFormValidator]
  });
  
  constructor(private fb: FormBuilder) {}
  
  // Custom async validator
  async uniqueEmailValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    if (!control.value) return null;
    
    try {
      const exists = await this.checkEmailExists(control.value);
      return exists ? { uniqueEmail: true } : null;
    } catch (error) {
      return null; // Don't show validation error if check fails
    }
  }
  
  // Custom sync validator
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const hasNumber = /\d/.test(control.value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    
    if (hasUpper && hasLower && hasNumber && hasSpecial) {
      return null;
    }
    
    return { strongPassword: true };
  }
  
  // Custom form validator
  customFormValidator(form: AbstractControl): ValidationErrors | null {
    // Add any form-level validation logic here
    return null;
  }
  
  private async checkEmailExists(email: string): Promise<boolean> {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(email === 'test@example.com');
      }, 1000);
    });
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      this.userForm.markAllAsTouched();
    }
  }
}
```

**4. Error Boundary Component:**

```typescript
// error-boundary.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error-boundary',
  template: `
    <div class="error-boundary" *ngIf="hasError; else content">
      <div class="error-container">
        <div class="error-icon">⚠️</div>
        <h3>{{ errorTitle }}</h3>
        <p>{{ errorMessage }}</p>
        
        <div class="error-actions">
          <button 
            class="btn btn-primary" 
            (click)="retry()"
            *ngIf="canRetry">
            Try Again
          </button>
          
          <button 
            class="btn btn-secondary" 
            (click)="goHome()">
            Go to Home
          </button>
          
          <button 
            class="btn btn-link" 
            (click)="toggleDetails()">
            {{ showDetails ? 'Hide' : 'Show' }} Details
          </button>
        </div>
        
        <div class="error-details" *ngIf="showDetails">
          <h4>Error Details:</h4>
          <pre>{{ errorDetails }}</pre>
          
          <h4>Stack Trace:</h4>
          <pre>{{ errorStack }}</pre>
        </div>
      </div>
    </div>
    
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [`
    .error-boundary {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 20px;
    }
    
    .error-container {
      text-align: center;
      max-width: 600px;
      padding: 40px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #fafafa;
    }
    
    .error-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    
    .error-actions {
      margin: 24px 0;
    }
    
    .error-actions button {
      margin: 0 8px;
    }
    
    .error-details {
      text-align: left;
      margin-top: 24px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    
    .error-details pre {
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 12px;
      max-height: 200px;
      overflow-y: auto;
    }
  `]
})
export class ErrorBoundaryComponent implements OnInit, OnDestroy {
  @Input() errorTitle = 'Something went wrong';
  @Input() errorMessage = 'An unexpected error occurred. Please try again.';
  @Input() canRetry = true;
  @Input() retryAction?: () => void;
  
  hasError = false;
  showDetails = false;
  errorDetails = '';
  errorStack = '';
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private errorService: ErrorService,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Listen for errors in child components
    this.errorService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.handleError(error);
      });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private handleError(error: any) {
    this.hasError = true;
    this.errorDetails = JSON.stringify(error, null, 2);
    this.errorStack = error.stack || 'No stack trace available';
  }
  
  retry() {
    if (this.retryAction) {
      this.retryAction();
    } else {
      // Default retry: reload the page
      window.location.reload();
    }
    
    this.hasError = false;
    this.showDetails = false;
  }
  
  goHome() {
    this.router.navigate(['/']);
    this.hasError = false;
  }
  
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}

// Error service for communication
@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorSubject$ = new Subject<any>();
  
  error$ = this.errorSubject$.asObservable();
  
  reportError(error: any) {
    this.errorSubject$.next(error);
  }
}
```

**Key Error Handling Best Practices:**

1. **Global Error Handler**: Catch all unhandled errors
2. **HTTP Interceptor**: Handle HTTP errors consistently
3. **Retry Logic**: Implement exponential backoff for transient errors
4. **User-Friendly Messages**: Show meaningful error messages
5. **Error Logging**: Log errors for debugging and monitoring
6. **Form Validation**: Provide clear validation feedback
7. **Error Boundaries**: Isolate error impact to specific components
8. **Graceful Degradation**: Provide fallback functionality
9. **Error Recovery**: Allow users to retry failed operations
10. **External Reporting**: Integrate with error tracking services

---

### Q17: How do you implement advanced Angular architecture patterns?

**Answer:**
Advanced Angular architecture involves implementing scalable patterns that promote maintainability, testability, and performance.

**1. Feature Module Architecture:**
```typescript
// Core module (singleton services)
@NgModule({
  providers: [
    AuthService,
    ErrorHandlerService,
    LoggingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only once.');
    }
  }
}

// Shared module (common components/pipes/directives)
@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    TruncatePipe,
    HighlightDirective
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    TruncatePipe,
    HighlightDirective
  ]
})
export class SharedModule {}

// Feature module
@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  providers: [UserService] // Feature-specific services
})
export class UserModule {}
```

**2. Smart/Dumb Component Pattern:**
```typescript
// Smart Component (Container)
@Component({
  selector: 'app-user-container',
  template: `
    <app-user-list
      [users]="users$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (userSelected)="onUserSelected($event)"
      (userDeleted)="onUserDeleted($event)"
      (refreshRequested)="onRefresh()">
    </app-user-list>
  `
})
export class UserContainerComponent implements OnInit {
  users$ = this.store.select(selectUsers);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  onUserSelected(user: User) {
    this.store.dispatch(selectUser({ user }));
  }

  onUserDeleted(userId: string) {
    this.store.dispatch(deleteUser({ userId }));
  }

  onRefresh() {
    this.store.dispatch(loadUsers());
  }
}

// Dumb Component (Presentational)
@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <div class="user-list__header">
        <h2>Users</h2>
        <button (click)="refresh.emit()" [disabled]="loading">
          Refresh
        </button>
      </div>
      
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
      
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>
      
      <div class="user-grid" *ngIf="!loading && !error">
        <app-user-card
          *ngFor="let user of users; trackBy: trackByUserId"
          [user]="user"
          (selected)="userSelected.emit(user)"
          (deleted)="userDeleted.emit(user.id)">
        </app-user-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() users: User[] | null = null;
  @Input() loading: boolean | null = false;
  @Input() error: string | null = null;
  
  @Output() userSelected = new EventEmitter<User>();
  @Output() userDeleted = new EventEmitter<string>();
  @Output() refreshRequested = new EventEmitter<void>();

  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
```

**3. Advanced Service Patterns:**
```typescript
// Repository Pattern
export abstract class UserRepository {
  abstract getUsers(): Observable<User[]>;
  abstract getUserById(id: string): Observable<User>;
  abstract createUser(user: CreateUserDto): Observable<User>;
  abstract updateUser(id: string, user: UpdateUserDto): Observable<User>;
  abstract deleteUser(id: string): Observable<void>;
}

@Injectable()
export class HttpUserRepository implements UserRepository {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      map(users => users.map(user => new User(user))),
      catchError(this.handleError)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`).pipe(
      map(user => new User(user)),
      catchError(this.handleError)
    );
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>('/api/users', user).pipe(
      map(user => new User(user)),
      catchError(this.handleError)
    );
  }

  updateUser(id: string, user: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, user).pipe(
      map(user => new User(user)),
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    console.error('User repository error:', error);
    return throwError(() => new Error('User operation failed'));
  };
}

// Facade Pattern
@Injectable({ providedIn: 'root' })
export class UserFacade {
  // Selectors
  users$ = this.store.select(selectUsers);
  selectedUser$ = this.store.select(selectSelectedUser);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);

  constructor(private store: Store) {}

  // Actions
  loadUsers() {
    this.store.dispatch(loadUsers());
  }

  loadUser(id: string) {
    this.store.dispatch(loadUser({ id }));
  }

  createUser(user: CreateUserDto) {
    this.store.dispatch(createUser({ user }));
  }

  updateUser(id: string, user: UpdateUserDto) {
    this.store.dispatch(updateUser({ id, user }));
  }

  deleteUser(id: string) {
    this.store.dispatch(deleteUser({ id }));
  }

  selectUser(user: User) {
    this.store.dispatch(selectUser({ user }));
  }

  clearSelection() {
    this.store.dispatch(clearUserSelection());
  }
}
```

**4. Advanced State Management with NgRx:**
```typescript
// Feature State
export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  filters: UserFilters;
  pagination: PaginationState;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    role: null,
    status: null
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0
  }
};

// Actions
export const loadUsers = createAction(
  '[User] Load Users',
  props<{ filters?: UserFilters; pagination?: PaginationState }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[]; total: number }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

// Reducer
const userReducer = createReducer(
  initialState,
  on(loadUsers, (state, { filters, pagination }) => ({
    ...state,
    loading: true,
    error: null,
    filters: filters ? { ...state.filters, ...filters } : state.filters,
    pagination: pagination ? { ...state.pagination, ...pagination } : state.pagination
  })),
  on(loadUsersSuccess, (state, { users, total }) => ({
    ...state,
    users,
    loading: false,
    error: null,
    pagination: {
      ...state.pagination,
      total
    }
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

// Effects
@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.select(selectUserFilters)),
      switchMap(([action, currentFilters]) => {
        const filters = action.filters || currentFilters;
        const pagination = action.pagination || { page: 1, pageSize: 10 };
        
        return this.userRepository.getUsers(filters, pagination).pipe(
          map(response => loadUsersSuccess({ 
            users: response.users, 
            total: response.total 
          })),
          catchError(error => of(loadUsersFailure({ 
            error: error.message 
          })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private userRepository: UserRepository
  ) {}
}

// Selectors
export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectFilteredUsers = createSelector(
  selectUsers,
  selectUserFilters,
  (users, filters) => {
    return users.filter(user => {
      if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.role && user.role !== filters.role) {
        return false;
      }
      if (filters.status && user.status !== filters.status) {
        return false;
      }
      return true;
    });
  }
);

export const selectUsersPaginated = createSelector(
  selectFilteredUsers,
  selectUserPagination,
  (users, pagination) => {
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return users.slice(start, end);
  }
);
```

### Q18: How do you implement advanced performance optimization techniques?

**Answer:**
Advanced performance optimization in Angular involves multiple strategies from bundle optimization to runtime performance.

**1. Advanced Lazy Loading Strategies:**
```typescript
// Route-based lazy loading with preloading
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    data: { preload: true }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard],
    data: { preload: false }
  }
];

// Custom preloading strategy
@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}

// Component-level lazy loading
@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="sidebar">
        <!-- Always loaded content -->
      </div>
      <div class="main-content">
        <ng-container *ngIf="showAdvancedFeatures">
          <ng-container *ngComponentOutlet="advancedComponent"></ng-container>
        </ng-container>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  advancedComponent: any;
  showAdvancedFeatures = false;

  async ngOnInit() {
    // Load component only when needed
    if (this.userHasAdvancedPermissions()) {
      const { AdvancedAnalyticsComponent } = await import('./advanced-analytics/advanced-analytics.component');
      this.advancedComponent = AdvancedAnalyticsComponent;
      this.showAdvancedFeatures = true;
    }
  }

  private userHasAdvancedPermissions(): boolean {
    // Check user permissions
    return true;
  }
}
```

**2. Advanced Change Detection Optimization:**
```typescript
// OnPush strategy with immutable data
@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <app-user-item
        *ngFor="let user of users; trackBy: trackByUserId"
        [user]="user"
        (userUpdated)="onUserUpdated($event)">
      </app-user-item>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() users: readonly User[] = [];
  @Output() userUpdated = new EventEmitter<User>();

  constructor(private cdr: ChangeDetectorRef) {}

  trackByUserId(index: number, user: User): string {
    return user.id;
  }

  onUserUpdated(updatedUser: User) {
    // Emit immutable update
    this.userUpdated.emit(updatedUser);
  }

  // Manual change detection when needed
  refreshView() {
    this.cdr.markForCheck();
  }
}

// Detached change detection for heavy components
@Component({
  selector: 'app-heavy-chart',
  template: `
    <div class="chart-container">
      <canvas #chartCanvas></canvas>
    </div>
  `
})
export class HeavyChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: any;
  private animationId: number | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    // Detach from change detection
    this.cdr.detach();
  }

  ngOnInit() {
    this.initChart();
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private initChart() {
    // Initialize heavy chart library
  }

  private startAnimation() {
    const animate = () => {
      // Update chart
      this.updateChart();
      
      // Manual change detection only when needed
      this.cdr.detectChanges();
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  private updateChart() {
    // Chart update logic
  }
}
```

**3. Advanced Bundle Optimization:**
```typescript
// Dynamic imports for code splitting
export class FeatureService {
  async loadFeature(featureName: string) {
    switch (featureName) {
      case 'analytics':
        const { AnalyticsModule } = await import('./analytics/analytics.module');
        return AnalyticsModule;
      case 'reporting':
        const { ReportingModule } = await import('./reporting/reporting.module');
        return ReportingModule;
      default:
        throw new Error(`Unknown feature: ${featureName}`);
    }
  }
}

// Tree-shakable providers
@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (environment.production) {
      return new ProductionAnalyticsService();
    } else {
      return new DevelopmentAnalyticsService();
    }
  }
})
export class AnalyticsService {
  abstract trackEvent(event: string, properties?: any): void;
}

// Conditional feature loading
@NgModule({
  imports: [
    CommonModule,
    // Conditionally import modules
    ...(environment.features.includes('advanced-analytics') 
      ? [AdvancedAnalyticsModule] 
      : []),
    ...(environment.features.includes('real-time-updates') 
      ? [RealTimeModule] 
      : [])
  ]
})
export class FeatureModule {}
```

**4. Memory Management and Leak Prevention:**
```typescript
// Advanced subscription management
@Component({
  selector: 'app-data-component'
})
export class DataComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private subscriptions = new Map<string, Subscription>();

  constructor(
    private dataService: DataService,
    private websocketService: WebSocketService
  ) {}

  ngOnInit() {
    // Method 1: takeUntil pattern
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.handleData(data));

    // Method 2: Manual subscription management
    const realtimeSubscription = this.websocketService.connect()
      .subscribe(message => this.handleRealtimeMessage(message));
    
    this.subscriptions.set('realtime', realtimeSubscription);

    // Method 3: Async pipe (automatic unsubscription)
    this.data$ = this.dataService.getData().pipe(
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    // Cleanup observables
    this.destroy$.next();
    this.destroy$.complete();

    // Cleanup manual subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.clear();
  }

  private handleData(data: any) {
    // Process data
  }

  private handleRealtimeMessage(message: any) {
    // Handle real-time updates
  }
}

// Memory-efficient virtual scrolling
@Component({
  selector: 'app-virtual-list',
  template: `
    <cdk-virtual-scroll-viewport 
      itemSize="50" 
      class="viewport"
      [maxBufferPx]="200"
      [minBufferPx]="100">
      <div 
        *cdkVirtualFor="let item of items; trackBy: trackByFn; templateCacheSize: 20"
        class="list-item">
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
export class VirtualListComponent {
  @Input() items: any[] = [];

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
```

### Q19: How do you implement advanced testing strategies?

**Answer:**
Advanced testing in Angular involves comprehensive strategies covering unit tests, integration tests, and end-to-end testing.

**1. Advanced Unit Testing Patterns:**
```typescript
// Testing with NgRx
describe('UserEffects', () => {
  let effects: UserEffects;
  let actions$: Observable<any>;
  let userService: jasmine.SpyObj<UserService>;
  let store: MockStore;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'createUser']);

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            users: {
              users: [],
              loading: false,
              error: null
            }
          }
        }),
        { provide: UserService, useValue: userServiceSpy }
      ]
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    store = TestBed.inject(MockStore);
  });

  describe('loadUsers$', () => {
    it('should return loadUsersSuccess action on successful API call', () => {
      const users = [{ id: '1', name: 'John' }];
      const action = loadUsers();
      const outcome = loadUsersSuccess({ users, total: 1 });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: { users, total: 1 } });
      userService.getUsers.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.loadUsers$).toBeObservable(expected);
    });

    it('should return loadUsersFailure action on API error', () => {
      const action = loadUsers();
      const error = new Error('API Error');
      const outcome = loadUsersFailure({ error: error.message });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      userService.getUsers.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.loadUsers$).toBeObservable(expected);
    });
  });
});

// Testing components with complex interactions
describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['createUser', 'updateUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  describe('form validation', () => {
    it('should show validation errors for invalid form', () => {
      component.ngOnInit();
      fixture.detectChanges();

      // Submit empty form
      component.onSubmit();
      fixture.detectChanges();

      const nameError = fixture.debugElement.query(By.css('[data-testid="name-error"]'));
      const emailError = fixture.debugElement.query(By.css('[data-testid="email-error"]'));

      expect(nameError.nativeElement.textContent).toContain('Name is required');
      expect(emailError.nativeElement.textContent).toContain('Email is required');
    });

    it('should validate email format', () => {
      component.ngOnInit();
      
      component.userForm.patchValue({
        name: 'John Doe',
        email: 'invalid-email'
      });
      
      fixture.detectChanges();
      component.onSubmit();
      fixture.detectChanges();

      const emailError = fixture.debugElement.query(By.css('[data-testid="email-error"]'));
      expect(emailError.nativeElement.textContent).toContain('Invalid email format');
    });
  });

  describe('form submission', () => {
    it('should create user and navigate on successful submission', fakeAsync(() => {
      const newUser = { name: 'John Doe', email: 'john@example.com' };
      const createdUser = { id: '1', ...newUser };
      
      userService.createUser.and.returnValue(of(createdUser));
      
      component.ngOnInit();
      component.userForm.patchValue(newUser);
      
      component.onSubmit();
      tick();
      
      expect(userService.createUser).toHaveBeenCalledWith(newUser);
      expect(snackBar.open).toHaveBeenCalledWith('User created successfully', 'Close', { duration: 3000 });
      expect(router.navigate).toHaveBeenCalledWith(['/users']);
    }));

    it('should handle creation error', fakeAsync(() => {
      const newUser = { name: 'John Doe', email: 'john@example.com' };
      const error = new Error('Creation failed');
      
      userService.createUser.and.returnValue(throwError(() => error));
      
      component.ngOnInit();
      component.userForm.patchValue(newUser);
      
      component.onSubmit();
      tick();
      
      expect(component.isSubmitting).toBeFalse();
      expect(snackBar.open).toHaveBeenCalledWith('Error creating user: Creation failed', 'Close', { duration: 5000 });
    }));
  });
});
```

**2. Integration Testing:**
```typescript
// Testing module integration
describe('UserModule Integration', () => {
  let store: Store;
  let httpMock: HttpTestingController;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('users', userReducer),
        EffectsModule.forFeature([UserEffects]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'users', component: UserListComponent },
          { path: 'users/:id', component: UserDetailComponent }
        ])
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load users and update store', fakeAsync(() => {
    const users = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }];
    
    store.dispatch(loadUsers());
    
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush({ users, total: 2 });
    
    tick();
    
    store.select(selectUsers).subscribe(loadedUsers => {
      expect(loadedUsers).toEqual(users);
    });
  }));

  it('should navigate to user detail on selection', fakeAsync(() => {
    const fixture = TestBed.createComponent(UserListComponent);
    const component = fixture.componentInstance;
    
    router.navigate(['/users']);
    tick();
    
    expect(location.path()).toBe('/users');
    
    component.onUserSelected({ id: '1', name: 'John' });
    tick();
    
    expect(location.path()).toBe('/users/1');
  }));
});
```

**3. End-to-End Testing with Cypress:**
```typescript
// cypress/integration/user-management.spec.ts
describe('User Management', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');
    cy.intercept('POST', '/api/users', { fixture: 'user.json' }).as('createUser');
    cy.intercept('DELETE', '/api/users/*', {}).as('deleteUser');
    
    cy.visit('/users');
    cy.wait('@getUsers');
  });

  it('should display user list', () => {
    cy.get('[data-testid="user-list"]').should('be.visible');
    cy.get('[data-testid="user-item"]').should('have.length.greaterThan', 0);
  });

  it('should create new user', () => {
    cy.get('[data-testid="add-user-button"]').click();
    
    cy.get('[data-testid="user-name-input"]').type('John Doe');
    cy.get('[data-testid="user-email-input"]').type('john@example.com');
    cy.get('[data-testid="user-role-select"]').select('Admin');
    
    cy.get('[data-testid="submit-button"]').click();
    
    cy.wait('@createUser');
    cy.get('[data-testid="success-message"]').should('contain', 'User created successfully');
  });

  it('should delete user with confirmation', () => {
    cy.get('[data-testid="user-item"]').first().within(() => {
      cy.get('[data-testid="delete-button"]').click();
    });
    
    cy.get('[data-testid="confirm-dialog"]').should('be.visible');
    cy.get('[data-testid="confirm-delete-button"]').click();
    
    cy.wait('@deleteUser');
    cy.get('[data-testid="success-message"]').should('contain', 'User deleted successfully');
  });

  it('should filter users by search term', () => {
    cy.get('[data-testid="search-input"]').type('John');
    
    cy.get('[data-testid="user-item"]').should('have.length', 1);
    cy.get('[data-testid="user-item"]').should('contain', 'John');
  });

  it('should handle pagination', () => {
    cy.get('[data-testid="pagination"]').should('be.visible');
    cy.get('[data-testid="next-page-button"]').click();
    
    cy.url().should('include', 'page=2');
    cy.get('[data-testid="user-item"]').should('have.length.greaterThan', 0);
  });
});

// Custom commands
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="username-input"]').type(username);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('not.include', '/login');
  });
});

Cypress.Commands.add('createUser', (user: { name: string; email: string; role: string }) => {
  cy.get('[data-testid="add-user-button"]').click();
  cy.get('[data-testid="user-name-input"]').type(user.name);
  cy.get('[data-testid="user-email-input"]').type(user.email);
  cy.get('[data-testid="user-role-select"]').select(user.role);
  cy.get('[data-testid="submit-button"]').click();
});
```

This comprehensive Angular guide now covers advanced architecture patterns, performance optimization techniques, and sophisticated testing strategies essential for senior Angular development roles.

---

## Angular 15+ Modern Features and Patterns

### Q20: How do you implement standalone components and the new Angular architecture?
**Difficulty: Advanced**

**Answer:**
Angular 15+ introduces standalone components, which eliminate the need for NgModules in many cases and provide a more streamlined development experience.

**1. Standalone Components:**
```typescript
// Standalone component without NgModule
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="user-profile">
      <h2>{{ user()?.name }}</h2>
      <p>{{ user()?.email }}</p>
      
      @if (isEditing()) {
        <form (ngSubmit)="saveUser()">
          <input [(ngModel)]="editForm.name" name="name" required>
          <input [(ngModel)]="editForm.email" name="email" type="email" required>
          <button type="submit">Save</button>
          <button type="button" (click)="cancelEdit()">Cancel</button>
        </form>
      } @else {
        <button (click)="startEdit()">Edit Profile</button>
      }
      
      @for (skill of user()?.skills; track skill.id) {
        <span class="skill-tag">{{ skill.name }}</span>
      } @empty {
        <p>No skills added yet.</p>
      }
    </div>
  `,
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  private userService = inject(UserService);
  
  // Signals for reactive state management
  user = signal<User | null>(null);
  isEditing = signal(false);
  editForm = {
    name: '',
    email: ''
  };
  
  ngOnInit() {
    this.loadUser();
  }
  
  async loadUser() {
    try {
      const userData = await this.userService.getCurrentUser();
      this.user.set(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  }
  
  startEdit() {
    const currentUser = this.user();
    if (currentUser) {
      this.editForm = {
        name: currentUser.name,
        email: currentUser.email
      };
      this.isEditing.set(true);
    }
  }
  
  async saveUser() {
    try {
      const updatedUser = await this.userService.updateUser(this.editForm);
      this.user.set(updatedUser);
      this.isEditing.set(false);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  }
  
  cancelEdit() {
    this.isEditing.set(false);
  }
}
```

**2. Standalone Application Bootstrap:**
```typescript
// main.ts - Bootstrap standalone application
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { errorInterceptor } from './app/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideAnimations(),
    // Import providers from existing modules if needed
    importProvidersFrom(/* existing modules */)
  ]
}).catch(err => console.error(err));
```

**3. Modern Routing with Standalone Components:**
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(c => c.DashboardComponent),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes')
      .then(r => r.userRoutes)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component')
      .then(c => c.ProfileComponent),
    resolve: {
      user: () => inject(UserService).getCurrentUser()
    }
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component')
      .then(c => c.NotFoundComponent)
  }
];

// users.routes.ts - Feature routes
import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-list/user-list.component')
      .then(c => c.UserListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./user-detail/user-detail.component')
      .then(c => c.UserDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./user-edit/user-edit.component')
      .then(c => c.UserEditComponent)
  }
];
```

**4. Angular Signals for State Management:**
```typescript
// signals-based state management
import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AppState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class StateService {
  private http = inject(HttpClient);
  
  // Private signals for internal state
  private _users = signal<User[]>([]);
  private _currentUser = signal<User | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  
  // Public readonly signals
  readonly users = this._users.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  
  // Computed signals
  readonly activeUsers = computed(() => 
    this.users().filter(user => user.isActive)
  );
  
  readonly userCount = computed(() => this.users().length);
  
  readonly isAuthenticated = computed(() => 
    this.currentUser() !== null
  );
  
  constructor() {
    // Effects for side effects
    effect(() => {
      const user = this.currentUser();
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    });
    
    // Load initial state
    this.loadInitialState();
  }
  
  async loadUsers() {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const users = await this.http.get<User[]>('/api/users').toPromise();
      this._users.set(users || []);
    } catch (error) {
      this._error.set('Failed to load users');
      console.error('Error loading users:', error);
    } finally {
      this._loading.set(false);
    }
  }
  
  async addUser(user: Omit<User, 'id'>) {
    this._loading.set(true);
    
    try {
      const newUser = await this.http.post<User>('/api/users', user).toPromise();
      if (newUser) {
        this._users.update(users => [...users, newUser]);
      }
    } catch (error) {
      this._error.set('Failed to add user');
      throw error;
    } finally {
      this._loading.set(false);
    }
  }
  
  async updateUser(id: string, updates: Partial<User>) {
    this._loading.set(true);
    
    try {
      const updatedUser = await this.http.put<User>(`/api/users/${id}`, updates).toPromise();
      if (updatedUser) {
        this._users.update(users => 
          users.map(user => user.id === id ? updatedUser : user)
        );
        
        // Update current user if it's the same
        if (this.currentUser()?.id === id) {
          this._currentUser.set(updatedUser);
        }
      }
    } catch (error) {
      this._error.set('Failed to update user');
      throw error;
    } finally {
      this._loading.set(false);
    }
  }
  
  async deleteUser(id: string) {
    this._loading.set(true);
    
    try {
      await this.http.delete(`/api/users/${id}`).toPromise();
      this._users.update(users => users.filter(user => user.id !== id));
    } catch (error) {
      this._error.set('Failed to delete user');
      throw error;
    } finally {
      this._loading.set(false);
    }
  }
  
  setCurrentUser(user: User | null) {
    this._currentUser.set(user);
  }
  
  clearError() {
    this._error.set(null);
  }
  
  private loadInitialState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        this._currentUser.set(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    }
  }
}
```

**5. Modern Component with New Control Flow:**
```typescript
// Component using new @if, @for, @switch syntax
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard">
      <header>
        <h1>User Dashboard</h1>
        @if (stateService.isAuthenticated()) {
          <div class="user-info">
            Welcome, {{ stateService.currentUser()?.name }}!
            <button (click)="logout()">Logout</button>
          </div>
        }
      </header>
      
      <main>
        @if (stateService.loading()) {
          <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading users...</p>
          </div>
        } @else if (stateService.error()) {
          <div class="error-message">
            <p>{{ stateService.error() }}</p>
            <button (click)="retry()">Retry</button>
          </div>
        } @else {
          <div class="user-management">
            <div class="filters">
              <input 
                [(ngModel)]="searchTerm" 
                placeholder="Search users..."
                (input)="onSearchChange()">
              
              <select [(ngModel)]="selectedRole" (change)="onRoleChange()">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            
            <div class="user-stats">
              <div class="stat-card">
                <h3>Total Users</h3>
                <p>{{ stateService.userCount() }}</p>
              </div>
              <div class="stat-card">
                <h3>Active Users</h3>
                <p>{{ stateService.activeUsers().length }}</p>
              </div>
              <div class="stat-card">
                <h3>Filtered Results</h3>
                <p>{{ filteredUsers().length }}</p>
              </div>
            </div>
            
            <div class="user-grid">
              @for (user of filteredUsers(); track user.id) {
                <div class="user-card" [class.active]="user.isActive">
                  <div class="user-avatar">
                    <img [src]="user.avatar || '/assets/default-avatar.png'" 
                         [alt]="user.name">
                  </div>
                  
                  <div class="user-details">
                    <h3>{{ user.name }}</h3>
                    <p>{{ user.email }}</p>
                    
                    @switch (user.role) {
                      @case ('admin') {
                        <span class="role-badge admin">Administrator</span>
                      }
                      @case ('moderator') {
                        <span class="role-badge moderator">Moderator</span>
                      }
                      @default {
                        <span class="role-badge user">User</span>
                      }
                    }
                    
                    <div class="user-actions">
                      <button (click)="editUser(user)">Edit</button>
                      <button (click)="deleteUser(user.id)" 
                              class="danger">Delete</button>
                    </div>
                  </div>
                </div>
              } @empty {
                <div class="empty-state">
                  <p>No users found matching your criteria.</p>
                  <button (click)="clearFilters()">Clear Filters</button>
                </div>
              }
            </div>
          </div>
        }
      </main>
    </div>
  `,
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  stateService = inject(StateService);
  
  searchTerm = signal('');
  selectedRole = signal('');
  
  // Computed signal for filtered users
  filteredUsers = computed(() => {
    const users = this.stateService.users();
    const search = this.searchTerm().toLowerCase();
    const role = this.selectedRole();
    
    return users.filter(user => {
      const matchesSearch = !search || 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);
      
      const matchesRole = !role || user.role === role;
      
      return matchesSearch && matchesRole;
    });
  });
  
  ngOnInit() {
    this.stateService.loadUsers();
  }
  
  onSearchChange() {
    // Search term is automatically updated via signal
    // Filtered users will be recomputed automatically
  }
  
  onRoleChange() {
    // Role filter is automatically updated via signal
  }
  
  clearFilters() {
    this.searchTerm.set('');
    this.selectedRole.set('');
  }
  
  editUser(user: User) {
    // Navigate to edit page or open modal
    console.log('Edit user:', user);
  }
  
  async deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await this.stateService.deleteUser(id);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  }
  
  logout() {
    this.stateService.setCurrentUser(null);
  }
  
  retry() {
    this.stateService.clearError();
    this.stateService.loadUsers();
  }
}
```

**6. Modern HTTP Interceptors:**
```typescript
// Functional interceptors (Angular 15+)
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

// Auth interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  
  return next(req);
};

// Loading interceptor
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  loadingService.show();
  
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};

// Error interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = error.error.message;
      } else {
        // Server-side error
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized access';
            // Redirect to login
            inject(Router).navigate(['/login']);
            break;
          case 403:
            errorMessage = 'Access forbidden';
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Internal server error';
            break;
          default:
            errorMessage = `Error: ${error.message}`;
        }
      }
      
      // Show error notification
      inject(NotificationService).showError(errorMessage);
      
      return throwError(() => error);
    })
  );
};
```

This enhanced Angular guide now includes the latest Angular 15+ features including standalone components, signals, new control flow syntax, functional interceptors, and modern architectural patterns that represent the cutting edge of Angular development.

---

## Advanced Angular Architecture and Patterns

### Q21: How do you implement micro-frontends with Angular and Module Federation?
**Difficulty: Expert**

**Answer:**
Micro-frontends allow you to break down large Angular applications into smaller, independently deployable pieces. Module Federation is the recommended approach for implementing micro-frontends in Angular.

**1. Shell Application Configuration:**
```typescript
// webpack.config.js (Shell/Host Application)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        'user-management': 'userManagement@http://localhost:4201/remoteEntry.js',
        'product-catalog': 'productCatalog@http://localhost:4202/remoteEntry.js',
        'order-processing': 'orderProcessing@http://localhost:4203/remoteEntry.js'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
        '@angular/platform-browser': { singleton: true, strictVersion: true }
      }
    })
  ]
};

// Shell application routes
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(c => c.DashboardComponent)
  },
  {
    path: 'users',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './UserModule'
    }).then(m => m.UserModule)
  },
  {
    path: 'products',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './ProductModule'
    }).then(m => m.ProductModule)
  },
  {
    path: 'orders',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposedModule: './OrderModule'
    }).then(m => m.OrderModule)
  }
];
```

**2. Micro-frontend Configuration:**
```typescript
// webpack.config.js (User Management Micro-frontend)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new ModuleFederationPlugin({
      name: 'userManagement',
      filename: 'remoteEntry.js',
      exposes: {
        './UserModule': './src/app/user/user.module.ts',
        './UserService': './src/app/user/services/user.service.ts'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true }
      }
    })
  ]
};

// User module (exposed)
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list.component';
import { UserDetailComponent } from './components/user-detail.component';
import { UserService } from './services/user.service';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [UserService]
})
export class UserModule { }
```

**3. Shared State Management Across Micro-frontends:**
```typescript
// Shared event bus service
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface MicroFrontendEvent {
  type: string;
  payload: any;
  source: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class MicroFrontendEventBus {
  private eventSubject = new BehaviorSubject<MicroFrontendEvent | null>(null);
  
  emit(type: string, payload: any, source: string) {
    const event: MicroFrontendEvent = {
      type,
      payload,
      source,
      timestamp: Date.now()
    };
    
    this.eventSubject.next(event);
    
    // Also emit to window for cross-application communication
    window.dispatchEvent(new CustomEvent('mf-event', { detail: event }));
  }
  
  on<T = any>(eventType: string): Observable<T> {
    return this.eventSubject.pipe(
      filter(event => event !== null && event.type === eventType),
      map(event => event!.payload)
    );
  }
  
  onFromSource<T = any>(eventType: string, source: string): Observable<T> {
    return this.eventSubject.pipe(
      filter(event => 
        event !== null && 
        event.type === eventType && 
        event.source === source
      ),
      map(event => event!.payload)
    );
  }
}

// Shared state service
@Injectable({ providedIn: 'root' })
export class SharedStateService {
  private eventBus = inject(MicroFrontendEventBus);
  
  private _currentUser = signal<User | null>(null);
  private _theme = signal<'light' | 'dark'>('light');
  private _notifications = signal<Notification[]>([]);
  
  readonly currentUser = this._currentUser.asReadonly();
  readonly theme = this._theme.asReadonly();
  readonly notifications = this._notifications.asReadonly();
  
  constructor() {
    // Listen for cross-application events
    window.addEventListener('mf-event', (event: any) => {
      const mfEvent = event.detail as MicroFrontendEvent;
      this.handleCrossAppEvent(mfEvent);
    });
    
    // Listen for internal events
    this.eventBus.on('user-updated').subscribe(user => {
      this._currentUser.set(user);
    });
    
    this.eventBus.on('theme-changed').subscribe(theme => {
      this._theme.set(theme);
    });
    
    this.eventBus.on('notification-added').subscribe(notification => {
      this._notifications.update(notifications => [...notifications, notification]);
    });
  }
  
  setCurrentUser(user: User | null, source = 'shell') {
    this._currentUser.set(user);
    this.eventBus.emit('user-updated', user, source);
  }
  
  setTheme(theme: 'light' | 'dark', source = 'shell') {
    this._theme.set(theme);
    this.eventBus.emit('theme-changed', theme, source);
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  addNotification(notification: Omit<Notification, 'id'>, source = 'shell') {
    const newNotification = {
      ...notification,
      id: Date.now().toString()
    };
    
    this._notifications.update(notifications => [...notifications, newNotification]);
    this.eventBus.emit('notification-added', newNotification, source);
  }
  
  private handleCrossAppEvent(event: MicroFrontendEvent) {
    switch (event.type) {
      case 'user-updated':
        if (event.source !== 'shell') {
          this._currentUser.set(event.payload);
        }
        break;
      case 'theme-changed':
        if (event.source !== 'shell') {
          this._theme.set(event.payload);
          document.documentElement.setAttribute('data-theme', event.payload);
        }
        break;
      case 'notification-added':
        if (event.source !== 'shell') {
          this._notifications.update(notifications => [...notifications, event.payload]);
        }
        break;
    }
  }
}
```

**4. Advanced Performance Optimization:**
```typescript
// Performance monitoring service
import { Injectable, signal, computed } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  memoryUsage: number;
  bundleSize: number;
}

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  private _metrics = signal<Partial<PerformanceMetrics>>({});
  private _isOptimized = computed(() => {
    const metrics = this._metrics();
    return (
      (metrics.fcp || 0) < 1800 &&
      (metrics.lcp || 0) < 2500 &&
      (metrics.fid || 0) < 100 &&
      (metrics.cls || 0) < 0.1
    );
  });
  
  readonly metrics = this._metrics.asReadonly();
  readonly isOptimized = this._isOptimized;
  
  constructor() {
    this.initializePerformanceMonitoring();
  }
  
  private initializePerformanceMonitoring() {
    // Core Web Vitals monitoring
    this.observeWebVitals();
    
    // Memory usage monitoring
    this.observeMemoryUsage();
    
    // Bundle size analysis
    this.analyzeBundleSize();
    
    // Custom performance marks
    this.setupCustomMarks();
  }
  
  private observeWebVitals() {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        this._metrics.update(m => ({ ...m, fcp: fcp.startTime }));
      }
    }).observe({ entryTypes: ['paint'] });
    
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this._metrics.update(m => ({ ...m, lcp: lastEntry.startTime }));
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        this._metrics.update(m => ({ ...m, fid: entry.processingStart - entry.startTime }));
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this._metrics.update(m => ({ ...m, cls: clsValue }));
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  private observeMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        this._metrics.update(m => ({ ...m, memoryUsage }));
      }, 5000);
    }
  }
  
  private analyzeBundleSize() {
    // Analyze loaded resources
    const resources = performance.getEntriesByType('resource');
    const totalSize = resources.reduce((total, resource) => {
      return total + (resource.transferSize || 0);
    }, 0);
    
    this._metrics.update(m => ({ ...m, bundleSize: totalSize }));
  }
  
  private setupCustomMarks() {
    // Mark component initialization
    performance.mark('app-init-start');
    
    // Mark when app is ready
    setTimeout(() => {
      performance.mark('app-init-end');
      performance.measure('app-initialization', 'app-init-start', 'app-init-end');
    }, 0);
  }
  
  markFeatureLoad(featureName: string) {
    performance.mark(`${featureName}-load-start`);
  }
  
  markFeatureReady(featureName: string) {
    performance.mark(`${featureName}-load-end`);
    performance.measure(
      `${featureName}-load-time`,
      `${featureName}-load-start`,
      `${featureName}-load-end`
    );
  }
  
  getPerformanceReport(): PerformanceMetrics {
    return this._metrics() as PerformanceMetrics;
  }
  
  exportMetrics() {
    const metrics = this.getPerformanceReport();
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics,
      recommendations: this.getRecommendations(metrics)
    };
    
    // Send to analytics service
    console.log('Performance Report:', report);
    return report;
  }
  
  private getRecommendations(metrics: Partial<PerformanceMetrics>): string[] {
    const recommendations: string[] = [];
    
    if ((metrics.fcp || 0) > 1800) {
      recommendations.push('Optimize First Contentful Paint by reducing render-blocking resources');
    }
    
    if ((metrics.lcp || 0) > 2500) {
      recommendations.push('Improve Largest Contentful Paint by optimizing images and critical resources');
    }
    
    if ((metrics.fid || 0) > 100) {
      recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time');
    }
    
    if ((metrics.cls || 0) > 0.1) {
      recommendations.push('Minimize Cumulative Layout Shift by setting dimensions for media elements');
    }
    
    if ((metrics.memoryUsage || 0) > 0.8) {
      recommendations.push('Optimize memory usage by implementing proper cleanup and avoiding memory leaks');
    }
    
    return recommendations;
  }
}
```

**5. Advanced Caching and State Persistence:**
```typescript
// Advanced caching service with IndexedDB
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  version: string;
}

@Injectable({ providedIn: 'root' })
export class AdvancedCacheService {
  private dbName = 'angular-app-cache';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  
  constructor() {
    this.initializeDB();
  }
  
  private async initializeDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
        
        if (!db.objectStoreNames.contains('user-preferences')) {
          db.createObjectStore('user-preferences', { keyPath: 'userId' });
        }
        
        if (!db.objectStoreNames.contains('offline-queue')) {
          db.createObjectStore('offline-queue', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }
  
  async set<T>(key: string, data: T, ttlMinutes = 60): Promise<void> {
    if (!this.db) await this.initializeDB();
    
    const entry: CacheEntry<T> & { key: string } = {
      key,
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000,
      version: '1.0'
    };
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const request = store.put(entry);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  
  async get<T>(key: string): Promise<T | null> {
    if (!this.db) await this.initializeDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readonly');
      const store = transaction.objectStore('cache');
      const request = store.get(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        
        if (!result) {
          resolve(null);
          return;
        }
        
        // Check if cache entry is expired
        const now = Date.now();
        if (now - result.timestamp > result.ttl) {
          this.delete(key); // Clean up expired entry
          resolve(null);
          return;
        }
        
        resolve(result.data);
      };
    });
  }
  
  async delete(key: string): Promise<void> {
    if (!this.db) await this.initializeDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const request = store.delete(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  
  async clear(): Promise<void> {
    if (!this.db) await this.initializeDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const request = store.clear();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  
  // Cache with automatic refresh
  getWithRefresh<T>(
    key: string,
    refreshFn: () => Observable<T>,
    ttlMinutes = 60
  ): Observable<T> {
    return from(this.get<T>(key)).pipe(
      switchMap(cachedData => {
        if (cachedData) {
          return of(cachedData);
        }
        
        return refreshFn().pipe(
          switchMap(freshData => {
            return from(this.set(key, freshData, ttlMinutes)).pipe(
              map(() => freshData)
            );
          })
        );
      }),
      catchError(error => {
        console.error('Cache error:', error);
        return refreshFn();
      })
    );
  }
  
  // User preferences persistence
  async saveUserPreferences(userId: string, preferences: any): Promise<void> {
    if (!this.db) await this.initializeDB();
    
    const entry = {
      userId,
      preferences,
      timestamp: Date.now()
    };
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['user-preferences'], 'readwrite');
      const store = transaction.objectStore('user-preferences');
      const request = store.put(entry);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  
  async getUserPreferences(userId: string): Promise<any | null> {
    if (!this.db) await this.initializeDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['user-preferences'], 'readonly');
      const store = transaction.objectStore('user-preferences');
      const request = store.get(userId);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.preferences : null);
      };
    });
  }
  
  // Offline queue for failed requests
  async queueOfflineAction(action: any): Promise<void> {
    if (!this.db) await this.initializeDB();
    
    const entry = {
      action,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['offline-queue'], 'readwrite');
      const store = transaction.objectStore('offline-queue');
      const request = store.add(entry);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  
  async getOfflineQueue(): Promise<any[]> {
    if (!this.db) await this.initializeDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['offline-queue'], 'readonly');
      const store = transaction.objectStore('offline-queue');
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }
}
```

---

## Angular 15+ Advanced Features and Enterprise Patterns

### Q22: How do you implement Angular 15+ Image Optimization and new directives?
**Difficulty: Advanced**

**Answer:**
Angular 15 introduced significant improvements in image optimization, new directives, and performance enhancements.

**1. NgOptimizedImage Directive:**
```typescript
// app.module.ts
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  imports: [NgOptimizedImage],
  // ...
})
export class AppModule {}

// component.html
<img ngSrc="/hero.jpg" 
     width="400" 
     height="300"
     priority
     alt="Hero image"
     placeholder="blur"
     [sizes]="(max-width: 768px) 100vw, 50vw">

// Responsive images with srcset
<img ngSrc="/hero.jpg"
     width="400"
     height="300"
     [ngSrcset]="'hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w'"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="Responsive hero">
```

**2. New Control Flow Syntax (@if, @for, @switch):**
```typescript
// Modern control flow (Angular 17+)
@Component({
  template: `
    @if (user.isLoggedIn) {
      <div class="user-dashboard">
        <h2>Welcome, {{ user.name }}!</h2>
        
        @for (item of user.items; track item.id) {
          <div class="item-card">
            <h3>{{ item.title }}</h3>
            
            @switch (item.status) {
              @case ('active') {
                <span class="badge success">Active</span>
              }
              @case ('pending') {
                <span class="badge warning">Pending</span>
              }
              @default {
                <span class="badge error">Inactive</span>
              }
            }
          </div>
        } @empty {
          <p>No items found</p>
        }
      </div>
    } @else {
      <app-login></app-login>
    }
  `
})
export class DashboardComponent {}
```

**3. Advanced Image Loading Strategies:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  private imageCache = new Map<string, HTMLImageElement>();
  
  preloadCriticalImages(urls: string[]): Promise<void[]> {
    return Promise.all(
      urls.map(url => this.preloadImage(url))
    );
  }
  
  private preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.imageCache.has(url)) {
        resolve();
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(url, img);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  }
  
  // Intersection Observer for lazy loading
  setupLazyLoading(): void {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset['src']!;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px' }
    );
    
    document.querySelectorAll('img[data-src]')
      .forEach(img => imageObserver.observe(img));
  }
}
```

---

### Q23: How do you implement Angular 15+ Standalone APIs and bootstrapping?
**Difficulty: Advanced**

**Answer:**
Angular 15+ provides enhanced standalone APIs for bootstrapping applications without NgModules.

**1. Standalone Application Bootstrap:**
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(
      // Import specific modules if needed
    ),
    // Custom providers
    { provide: 'API_URL', useValue: 'https://api.example.com' },
  ]
}).catch(err => console.error(err));
```

**2. Standalone Component with Providers:**
```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    FeatureService,
    { provide: FEATURE_CONFIG, useValue: { apiUrl: '/api/feature' } }
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput formControlName="name" placeholder="Name">
      </mat-form-field>
      <button mat-raised-button type="submit">Submit</button>
    </form>
  `
})
export class FeatureComponent {
  form = this.fb.group({
    name: ['', Validators.required]
  });
  
  constructor(
    private fb: FormBuilder,
    private featureService: FeatureService,
    @Inject(FEATURE_CONFIG) private config: FeatureConfig
  ) {}
  
  onSubmit(): void {
    if (this.form.valid) {
      this.featureService.save(this.form.value).subscribe();
    }
  }
}
```

**3. Advanced Standalone Routing:**
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component')
          .then(m => m.ProfileComponent)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.routes')
          .then(m => m.settingsRoutes)
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
      .then(m => m.adminRoutes),
    canMatch: [() => inject(AuthService).hasAdminRole()]
  }
];
```

---

### Q24: How do you implement Angular 16+ Signals and reactive programming patterns?
**Difficulty: Expert**

**Answer:**
Angular 16+ introduces Signals as a new reactive primitive for fine-grained reactivity and better performance.

**1. Basic Signals Implementation:**
```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div class="counter">
      <h2>Count: {{ count() }}</h2>
      <h3>Double: {{ doubleCount() }}</h3>
      <h3>Status: {{ status() }}</h3>
      
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>
    </div>
  `
})
export class CounterComponent {
  // Writable signal
  count = signal(0);
  
  // Computed signal
  doubleCount = computed(() => this.count() * 2);
  
  // Computed with complex logic
  status = computed(() => {
    const value = this.count();
    if (value === 0) return 'Zero';
    if (value > 0) return 'Positive';
    return 'Negative';
  });
  
  constructor() {
    // Effect for side effects
    effect(() => {
      console.log(`Count changed to: ${this.count()}`);
      
      // Update document title
      document.title = `Counter: ${this.count()}`;
      
      // Save to localStorage
      localStorage.setItem('counter', this.count().toString());
    });
  }
  
  increment(): void {
    this.count.update(value => value + 1);
  }
  
  decrement(): void {
    this.count.update(value => value - 1);
  }
  
  reset(): void {
    this.count.set(0);
  }
}
```

**2. Advanced Signals with Services:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users = signal<User[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  
  // Read-only signals
  users = this._users.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  
  // Computed signals
  activeUsers = computed(() => 
    this._users().filter(user => user.isActive)
  );
  
  userCount = computed(() => this._users().length);
  
  hasUsers = computed(() => this._users().length > 0);
  
  constructor(private http: HttpClient) {}
  
  async loadUsers(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const users = await firstValueFrom(
        this.http.get<User[]>('/api/users')
      );
      this._users.set(users);
    } catch (error) {
      this._error.set('Failed to load users');
    } finally {
      this._loading.set(false);
    }
  }
  
  addUser(user: User): void {
    this._users.update(users => [...users, user]);
  }
  
  updateUser(id: string, updates: Partial<User>): void {
    this._users.update(users => 
      users.map(user => 
        user.id === id ? { ...user, ...updates } : user
      )
    );
  }
  
  removeUser(id: string): void {
    this._users.update(users => 
      users.filter(user => user.id !== id)
    );
  }
}
```

**3. Signals with RxJS Integration:**
```typescript
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <input 
      [formControl]="searchControl" 
      placeholder="Search users...">
    
    @if (loading()) {
      <div class="loading">Searching...</div>
    }
    
    @if (error()) {
      <div class="error">{{ error() }}</div>
    }
    
    @for (user of filteredUsers(); track user.id) {
      <div class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    }
  `
})
export class SearchComponent {
  searchControl = new FormControl('');
  
  private _searchTerm = signal('');
  private _users = signal<User[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  
  // Expose read-only signals
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  
  // Computed filtered users
  filteredUsers = computed(() => {
    const term = this._searchTerm().toLowerCase();
    if (!term) return this._users();
    
    return this._users().filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });
  
  constructor(private userService: UserService) {
    // Convert FormControl to Signal
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(term => {
      this._searchTerm.set(term || '');
      if (term) {
        this.searchUsers(term);
      }
    });
    
    // Effect to react to search term changes
    effect(() => {
      const term = this._searchTerm();
      console.log(`Searching for: ${term}`);
    });
  }
  
  private async searchUsers(term: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const users = await firstValueFrom(
        this.userService.searchUsers(term)
      );
      this._users.set(users);
    } catch (error) {
      this._error.set('Search failed');
    } finally {
      this._loading.set(false);
    }
  }
}
```

---

### Q25: How do you implement Angular 17+ SSR and hydration optimization?
**Difficulty: Expert**

**Answer:**
Angular 17+ provides enhanced SSR capabilities with improved hydration, streaming, and performance optimizations.

**1. Advanced SSR Configuration:**
```typescript
// app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig([
      {
        path: '/api/**',
        renderMode: RenderMode.Server
      },
      {
        path: '/dashboard/**',
        renderMode: RenderMode.Prerender,
        prerender: true
      },
      {
        path: '**',
        renderMode: RenderMode.ServerSideRendering
      }
    ])
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

**2. Optimized Hydration Strategies:**
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(
      withEventReplay() // Replay events during hydration
    ),
    // Other providers
  ]
});

// Component with hydration optimization
@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    <div class="product-grid">
      @for (product of products(); track product.id) {
        <app-product-card 
          [product]="product"
          [loading]="loading()"
          (addToCart)="addToCart($event)"
          [attr.data-product-id]="product.id">
        </app-product-card>
      } @empty {
        <div class="empty-state">No products found</div>
      }
    </div>
  `
})
export class ProductListComponent {
  products = signal<Product[]>([]);
  loading = signal(false);
  
  constructor(
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only run on browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadProducts();
    }
  }
  
  private async loadProducts(): Promise<void> {
    this.loading.set(true);
    
    try {
      const products = await firstValueFrom(
        this.productService.getProducts()
      );
      this.products.set(products);
    } finally {
      this.loading.set(false);
    }
  }
  
  addToCart(product: Product): void {
    // Optimistic update
    this.products.update(products => 
      products.map(p => 
        p.id === product.id 
          ? { ...p, inCart: true }
          : p
      )
    );
    
    this.productService.addToCart(product).subscribe({
      error: () => {
        // Revert on error
        this.products.update(products => 
          products.map(p => 
            p.id === product.id 
              ? { ...p, inCart: false }
              : p
          )
        );
      }
    });
  }
}
```

**3. Streaming SSR with Suspense:**
```typescript
// Streaming component
@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      
      <!-- Critical content rendered immediately -->
      <app-user-info [user]="user()"></app-user-info>
      
      <!-- Non-critical content with suspense -->
      <Suspense fallback="<app-loading-skeleton></app-loading-skeleton>">
        <app-analytics-widget></app-analytics-widget>
      </Suspense>
      
      <Suspense fallback="<app-loading-skeleton></app-loading-skeleton>">
        <app-recent-activity></app-recent-activity>
      </Suspense>
    </div>
  `
})
export class DashboardComponent {
  user = signal<User | null>(null);
  
  constructor(
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Load critical data immediately
    this.loadUser();
  }
  
  private async loadUser(): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.userService.getCurrentUser()
      );
      this.user.set(user);
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  }
}

// Lazy-loaded analytics widget
@Component({
  selector: 'app-analytics-widget',
  standalone: true,
  template: `
    <div class="analytics-widget">
      <h2>Analytics</h2>
      @if (data(); as analytics) {
        <div class="metrics">
          <div class="metric">
            <span class="value">{{ analytics.pageViews }}</span>
            <span class="label">Page Views</span>
          </div>
          <div class="metric">
            <span class="value">{{ analytics.uniqueVisitors }}</span>
            <span class="label">Unique Visitors</span>
          </div>
        </div>
      } @else {
        <app-loading-spinner></app-loading-spinner>
      }
    </div>
  `
})
export class AnalyticsWidgetComponent {
  data = signal<AnalyticsData | null>(null);
  
  constructor(
    private analyticsService: AnalyticsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only load on browser to avoid blocking SSR
    if (isPlatformBrowser(this.platformId)) {
      this.loadAnalytics();
    }
  }
  
  private async loadAnalytics(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.analyticsService.getAnalytics()
      );
      this.data.set(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  }
}
```

---

### Q15: How do you implement Angular 18+ Material 3 Design System and advanced theming?

**Answer:**
Angular 18+ introduces Material 3 (Material You) design system with dynamic theming, improved accessibility, and advanced customization capabilities.

**Material 3 Implementation:**
```typescript
// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_COLOR_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMaterial3Theme } from '@angular/material/theming';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideMaterial3Theme({
      // Material 3 dynamic color system
      colorSystem: 'material3',
      // Enable dynamic theming based on user preferences
      dynamicColors: true,
      // Custom color tokens
      customColors: {
        brand: {
          primary: '#6750A4',
          secondary: '#625B71',
          tertiary: '#7D5260'
        },
        semantic: {
          success: '#198754',
          warning: '#FFC107',
          error: '#DC3545',
          info: '#0DCAF0'
        }
      },
      // Typography scale
      typography: {
        fontFamily: 'Roboto, sans-serif',
        scale: 'material3'
      },
      // Density configuration
      density: {
        default: 0,
        compact: -1,
        comfortable: 1
      }
    }),
    {
      provide: MAT_COLOR_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD'
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    }
  ]
};
```

**Advanced Theme Service:**
```typescript
// theme.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  colorScheme: 'material3' | 'custom';
  density: 'compact' | 'default' | 'comfortable';
  contrast: 'normal' | 'high';
  reducedMotion: boolean;
  customColors?: Record<string, string>;
}

interface ColorTokens {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private mediaQuery = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
  private reducedMotionQuery = this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)');
  private contrastQuery = this.document.defaultView?.matchMedia('(prefers-contrast: high)');
  
  // Theme configuration signals
  private themeConfig = signal<ThemeConfig>({
    mode: 'auto',
    colorScheme: 'material3',
    density: 'default',
    contrast: 'normal',
    reducedMotion: false
  });
  
  // System preferences signals
  private systemDarkMode = signal(this.mediaQuery?.matches ?? false);
  private systemReducedMotion = signal(this.reducedMotionQuery?.matches ?? false);
  private systemHighContrast = signal(this.contrastQuery?.matches ?? false);
  
  // Computed theme state
  readonly isDarkMode = computed(() => {
    const config = this.themeConfig();
    if (config.mode === 'auto') {
      return this.systemDarkMode();
    }
    return config.mode === 'dark';
  });
  
  readonly currentTheme = computed(() => {
    const config = this.themeConfig();
    const isDark = this.isDarkMode();
    const isHighContrast = config.contrast === 'high' || this.systemHighContrast();
    const isReducedMotion = config.reducedMotion || this.systemReducedMotion();
    
    return {
      ...config,
      isDark,
      isHighContrast,
      isReducedMotion,
      colorTokens: this.generateColorTokens(isDark, isHighContrast)
    };
  });
  
  constructor() {
    // Listen to system preference changes
    this.setupSystemPreferenceListeners();
    
    // Apply theme changes to DOM
    effect(() => {
      this.applyThemeToDOM(this.currentTheme());
    });
    
    // Load saved theme preferences
    this.loadThemePreferences();
  }
  
  private setupSystemPreferenceListeners(): void {
    this.mediaQuery?.addEventListener('change', (e) => {
      this.systemDarkMode.set(e.matches);
    });
    
    this.reducedMotionQuery?.addEventListener('change', (e) => {
      this.systemReducedMotion.set(e.matches);
    });
    
    this.contrastQuery?.addEventListener('change', (e) => {
      this.systemHighContrast.set(e.matches);
    });
  }
  
  private generateColorTokens(isDark: boolean, isHighContrast: boolean): ColorTokens {
    // Material 3 color token generation
    const baseTokens = isDark ? this.getDarkColorTokens() : this.getLightColorTokens();
    
    if (isHighContrast) {
      return this.applyHighContrastAdjustments(baseTokens);
    }
    
    return baseTokens;
  }
  
  private getLightColorTokens(): ColorTokens {
    return {
      primary: '#6750A4',
      onPrimary: '#FFFFFF',
      primaryContainer: '#EADDFF',
      onPrimaryContainer: '#21005D',
      secondary: '#625B71',
      onSecondary: '#FFFFFF',
      secondaryContainer: '#E8DEF8',
      onSecondaryContainer: '#1D192B',
      tertiary: '#7D5260',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#FFD8E4',
      onTertiaryContainer: '#31111D',
      error: '#BA1A1A',
      onError: '#FFFFFF',
      errorContainer: '#FFDAD6',
      onErrorContainer: '#410002',
      background: '#FFFBFE',
      onBackground: '#1C1B1F',
      surface: '#FFFBFE',
      onSurface: '#1C1B1F',
      surfaceVariant: '#E7E0EC',
      onSurfaceVariant: '#49454F',
      outline: '#79747E',
      outlineVariant: '#CAC4D0',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#313033',
      inverseOnSurface: '#F4EFF4',
      inversePrimary: '#D0BCFF'
    };
  }
  
  private getDarkColorTokens(): ColorTokens {
    return {
      primary: '#D0BCFF',
      onPrimary: '#381E72',
      primaryContainer: '#4F378B',
      onPrimaryContainer: '#EADDFF',
      secondary: '#CCC2DC',
      onSecondary: '#332D41',
      secondaryContainer: '#4A4458',
      onSecondaryContainer: '#E8DEF8',
      tertiary: '#EFB8C8',
      onTertiary: '#492532',
      tertiaryContainer: '#633B48',
      onTertiaryContainer: '#FFD8E4',
      error: '#FFB4AB',
      onError: '#690005',
      errorContainer: '#93000A',
      onErrorContainer: '#FFDAD6',
      background: '#1C1B1F',
      onBackground: '#E6E1E5',
      surface: '#1C1B1F',
      onSurface: '#E6E1E5',
      surfaceVariant: '#49454F',
      onSurfaceVariant: '#CAC4D0',
      outline: '#938F99',
      outlineVariant: '#49454F',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#E6E1E5',
      inverseOnSurface: '#313033',
      inversePrimary: '#6750A4'
    };
  }
  
  private applyHighContrastAdjustments(tokens: ColorTokens): ColorTokens {
    // Apply high contrast adjustments
    return {
      ...tokens,
      outline: tokens.onSurface,
      outlineVariant: tokens.onSurfaceVariant
    };
  }
  
  private applyThemeToDOM(theme: any): void {
    const root = this.document.documentElement;
    
    // Apply color tokens as CSS custom properties
    Object.entries(theme.colorTokens).forEach(([key, value]) => {
      root.style.setProperty(`--md-sys-color-${this.kebabCase(key)}`, value);
    });
    
    // Apply theme classes
    root.classList.toggle('dark-theme', theme.isDark);
    root.classList.toggle('high-contrast', theme.isHighContrast);
    root.classList.toggle('reduced-motion', theme.isReducedMotion);
    root.classList.toggle(`density-${theme.density}`, true);
    
    // Apply density scale
    const densityScale = {
      compact: '-1',
      default: '0',
      comfortable: '1'
    };
    root.style.setProperty('--md-density-scale', densityScale[theme.density]);
  }
  
  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
  
  // Public API
  setThemeMode(mode: 'light' | 'dark' | 'auto'): void {
    this.themeConfig.update(config => ({ ...config, mode }));
    this.saveThemePreferences();
  }
  
  setDensity(density: 'compact' | 'default' | 'comfortable'): void {
    this.themeConfig.update(config => ({ ...config, density }));
    this.saveThemePreferences();
  }
  
  setContrast(contrast: 'normal' | 'high'): void {
    this.themeConfig.update(config => ({ ...config, contrast }));
    this.saveThemePreferences();
  }
  
  toggleReducedMotion(): void {
    this.themeConfig.update(config => ({ 
      ...config, 
      reducedMotion: !config.reducedMotion 
    }));
    this.saveThemePreferences();
  }
  
  private saveThemePreferences(): void {
    localStorage.setItem('theme-preferences', JSON.stringify(this.themeConfig()));
  }
  
  private loadThemePreferences(): void {
    const saved = localStorage.getItem('theme-preferences');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        this.themeConfig.set(config);
      } catch (error) {
        console.error('Failed to load theme preferences:', error);
      }
    }
  }
}
```

**Advanced Material 3 Components:**
```typescript
// advanced-card.component.ts
import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

interface CardAction {
  label: string;
  icon?: string;
  action: () => void;
  disabled?: boolean;
}

@Component({
  selector: 'app-advanced-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ],
  template: `
    <mat-card 
      class="advanced-card"
      [class.elevated]="variant() === 'elevated'"
      [class.filled]="variant() === 'filled'"
      [class.outlined]="variant() === 'outlined'"
      [class.interactive]="interactive()"
      [matRipple]="interactive()"
      (click)="onCardClick()"
    >
      @if (headerImage()) {
        <div class="card-header-image">
          <img [src]="headerImage()" [alt]="headerImageAlt()" />
        </div>
      }
      
      @if (title() || subtitle()) {
        <mat-card-header>
          @if (avatar()) {
            <div mat-card-avatar class="card-avatar">
              <img [src]="avatar()" [alt]="avatarAlt()" />
            </div>
          }
          @if (title()) {
            <mat-card-title>{{ title() }}</mat-card-title>
          }
          @if (subtitle()) {
            <mat-card-subtitle>{{ subtitle() }}</mat-card-subtitle>
          }
        </mat-card-header>
      }
      
      @if (content()) {
        <mat-card-content>
          <ng-content></ng-content>
        </mat-card-content>
      }
      
      @if (actions().length > 0) {
        <mat-card-actions align="end">
          @for (action of actions(); track action.label) {
            <button 
              mat-button
              [disabled]="action.disabled"
              (click)="executeAction(action, $event)"
            >
              @if (action.icon) {
                <mat-icon>{{ action.icon }}</mat-icon>
              }
              {{ action.label }}
            </button>
          }
        </mat-card-actions>
      }
    </mat-card>
  `,
  styles: [`
    .advanced-card {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &.elevated {
        box-shadow: var(--md-elevation-level1);
        
        &:hover {
          box-shadow: var(--md-elevation-level2);
        }
      }
      
      &.filled {
        background-color: var(--md-sys-color-surface-variant);
        color: var(--md-sys-color-on-surface-variant);
      }
      
      &.outlined {
        border: 1px solid var(--md-sys-color-outline-variant);
        background-color: var(--md-sys-color-surface);
      }
      
      &.interactive {
        cursor: pointer;
        
        &:hover {
          transform: translateY(-2px);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
    
    .card-header-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .card-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .advanced-card {
        transition: none;
        
        &.interactive:hover {
          transform: none;
        }
      }
    }
  `]
})
export class AdvancedCardComponent {
  // Input signals
  title = input<string>();
  subtitle = input<string>();
  content = input<boolean>(true);
  headerImage = input<string>();
  headerImageAlt = input<string>('Header image');
  avatar = input<string>();
  avatarAlt = input<string>('Avatar');
  variant = input<'elevated' | 'filled' | 'outlined'>('elevated');
  interactive = input<boolean>(false);
  actions = input<CardAction[]>([]);
  
  // Output signals
  cardClick = output<void>();
  actionClick = output<CardAction>();
  
  // Computed properties
  hasHeader = computed(() => !!(this.title() || this.subtitle() || this.avatar()));
  
  onCardClick(): void {
    if (this.interactive()) {
      this.cardClick.emit();
    }
  }
  
  executeAction(action: CardAction, event: Event): void {
    event.stopPropagation();
    if (!action.disabled) {
      action.action();
      this.actionClick.emit(action);
    }
  }
}
```

---

### Q16: How do you implement advanced Angular 18+ performance optimization with new control flow and deferrable views?

**Answer:**
Angular 18+ introduces advanced performance optimization techniques including new control flow syntax, deferrable views, and intelligent loading strategies.

**New Control Flow Implementation:**
```typescript
// performance-optimized.component.ts
import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defer, fromEvent, merge, timer } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';

interface ListItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  lastModified: Date;
}

interface ViewportInfo {
  width: number;
  height: number;
  isVisible: boolean;
}

@Component({
  selector: 'app-performance-optimized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="performance-container">
      <!-- New @if control flow with performance optimization -->
      @if (isLoading()) {
        <div class="loading-skeleton">
          @for (item of skeletonItems(); track $index) {
            <div class="skeleton-item"></div>
          }
        </div>
      } @else {
        <!-- Conditional rendering based on viewport -->
        @if (viewportInfo().width > 768) {
          <!-- Desktop layout with advanced features -->
          <div class="desktop-layout">
            @defer (on viewport; prefetch on idle) {
              <app-advanced-filters 
                [filters]="filters()"
                (filtersChange)="onFiltersChange($event)"
              ></app-advanced-filters>
            } @placeholder {
              <div class="filter-placeholder">Loading filters...</div>
            } @loading (minimum 500ms) {
              <div class="filter-loading">Preparing filters...</div>
            } @error {
              <div class="filter-error">Failed to load filters</div>
            }
          </div>
        } @else {
          <!-- Mobile layout with simplified features -->
          <div class="mobile-layout">
            @defer (on interaction; prefetch on hover) {
              <app-mobile-filters 
                [filters]="filters()"
                (filtersChange)="onFiltersChange($event)"
              ></app-mobile-filters>
            } @placeholder {
              <button class="show-filters-btn">Show Filters</button>
            }
          </div>
        }
        
        <!-- Virtualized list with new @for control flow -->
        <div class="items-container" #container>
          @for (item of visibleItems(); track item.id; let i = $index) {
            <!-- Conditional rendering based on item priority -->
            @switch (item.priority) {
              @case ('high') {
                @defer (on immediate) {
                  <app-high-priority-item 
                    [item]="item"
                    [index]="i"
                    (itemClick)="onItemClick(item)"
                  ></app-high-priority-item>
                }
              }
              @case ('medium') {
                @defer (on viewport; prefetch on idle) {
                  <app-medium-priority-item 
                    [item]="item"
                    [index]="i"
                    (itemClick)="onItemClick(item)"
                  ></app-medium-priority-item>
                } @placeholder {
                  <div class="item-placeholder">{{ item.title }}</div>
                }
              }
              @default {
                @defer (on interaction) {
                  <app-low-priority-item 
                    [item]="item"
                    [index]="i"
                    (itemClick)="onItemClick(item)"
                  ></app-low-priority-item>
                } @placeholder {
                  <div class="item-placeholder">{{ item.title }}</div>
                }
              }
            }
          } @empty {
            <div class="empty-state">
              <h3>No items found</h3>
              <p>Try adjusting your filters or search criteria.</p>
            </div>
          }
        </div>
        
        <!-- Infinite scroll with deferred loading -->
        @if (hasMoreItems()) {
          @defer (on viewport) {
            <app-load-more-trigger 
              (loadMore)="loadMoreItems()"
              [loading]="loadingMore()"
            ></app-load-more-trigger>
          } @placeholder {
            <div class="load-more-placeholder">Scroll to load more</div>
          }
        }
      }
      
      <!-- Performance monitoring overlay (dev only) -->
      @if (showPerformanceOverlay()) {
        @defer (on idle) {
          <app-performance-overlay 
            [metrics]="performanceMetrics()"
          ></app-performance-overlay>
        }
      }
    </div>
  `,
  styles: [`
    .performance-container {
      height: 100vh;
      overflow-y: auto;
      scroll-behavior: smooth;
    }
    
    .loading-skeleton {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
    
    .skeleton-item {
      height: 80px;
      background: linear-gradient(
        90deg,
        var(--md-sys-color-surface-variant) 25%,
        var(--md-sys-color-surface) 50%,
        var(--md-sys-color-surface-variant) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .items-container {
      contain: layout style paint;
      will-change: scroll-position;
    }
    
    .item-placeholder {
      height: 60px;
      display: flex;
      align-items: center;
      padding: 1rem;
      background-color: var(--md-sys-color-surface-variant);
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--md-sys-color-on-surface-variant);
    }
    
    @media (prefers-reduced-motion: reduce) {
      .skeleton-item {
        animation: none;
      }
      
      .performance-container {
        scroll-behavior: auto;
      }
    }
  `]
})
export class PerformanceOptimizedComponent {
  // Signals for reactive state management
  private items = signal<ListItem[]>([]);
  private filters = signal<Record<string, any>>({});
  private isLoading = signal(true);
  private loadingMore = signal(false);
  private viewportInfo = signal<ViewportInfo>({
    width: window.innerWidth,
    height: window.innerHeight,
    isVisible: true
  });
  
  // Performance monitoring
  private performanceMetrics = signal({
    renderTime: 0,
    memoryUsage: 0,
    frameRate: 60,
    bundleSize: 0
  });
  
  private showPerformanceOverlay = signal(
    !environment.production && localStorage.getItem('showPerfOverlay') === 'true'
  );
  
  // Computed values for optimized rendering
  readonly filteredItems = computed(() => {
    const items = this.items();
    const filters = this.filters();
    
    if (Object.keys(filters).length === 0) {
      return items;
    }
    
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key as keyof ListItem]?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    });
  });
  
  readonly visibleItems = computed(() => {
    // Virtual scrolling implementation
    const items = this.filteredItems();
    const viewport = this.viewportInfo();
    
    // Calculate visible range based on viewport
    const itemHeight = 80;
    const containerHeight = viewport.height;
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 5; // Buffer
    
    return items.slice(0, Math.min(visibleCount, items.length));
  });
  
  readonly hasMoreItems = computed(() => {
    return this.visibleItems().length < this.filteredItems().length;
  });
  
  readonly skeletonItems = computed(() => {
    return Array(10).fill(null);
  });
  
  constructor(
    private itemService: ItemService,
    private performanceService: PerformanceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Setup viewport monitoring
    this.setupViewportMonitoring();
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
    
    // Load initial data
    this.loadInitialData();
  }
  
  private setupViewportMonitoring(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Viewport size monitoring
      const resize$ = fromEvent(window, 'resize').pipe(
        debounceTime(100),
        map(() => ({
          width: window.innerWidth,
          height: window.innerHeight,
          isVisible: !document.hidden
        }))
      );
      
      // Visibility monitoring
      const visibility$ = fromEvent(document, 'visibilitychange').pipe(
        map(() => ({
          width: window.innerWidth,
          height: window.innerHeight,
          isVisible: !document.hidden
        }))
      );
      
      merge(resize$, visibility$)
        .pipe(startWith(this.viewportInfo()))
        .subscribe(info => this.viewportInfo.set(info));
    }
  }
  
  private setupPerformanceMonitoring(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Monitor performance metrics
      effect(() => {
        const startTime = performance.now();
        
        // Measure render time
        requestAnimationFrame(() => {
          const renderTime = performance.now() - startTime;
          
          this.performanceMetrics.update(metrics => ({
            ...metrics,
            renderTime,
            memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
            frameRate: this.calculateFrameRate()
          }));
        });
      });
    }
  }
  
  private calculateFrameRate(): number {
    // Simple frame rate calculation
    let frames = 0;
    let lastTime = performance.now();
    
    const countFrames = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        frames = 0;
        lastTime = currentTime;
        return fps;
      }
      
      requestAnimationFrame(countFrames);
      return 60; // Default
    };
    
    return countFrames();
  }
  
  private async loadInitialData(): Promise<void> {
    try {
      this.isLoading.set(true);
      
      // Simulate loading with minimum time for UX
      const [items] = await Promise.all([
        firstValueFrom(this.itemService.getItems()),
        timer(500).toPromise() // Minimum loading time
      ]);
      
      this.items.set(items);
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async loadMoreItems(): Promise<void> {
    if (this.loadingMore()) return;
    
    try {
      this.loadingMore.set(true);
      
      const currentItems = this.items();
      const nextPage = Math.floor(currentItems.length / 20) + 1;
      
      const newItems = await firstValueFrom(
        this.itemService.getItems({ page: nextPage })
      );
      
      this.items.update(items => [...items, ...newItems]);
    } catch (error) {
      console.error('Failed to load more items:', error);
    } finally {
      this.loadingMore.set(false);
    }
  }
  
  onFiltersChange(newFilters: Record<string, any>): void {
    this.filters.set(newFilters);
  }
  
  onItemClick(item: ListItem): void {
    // Handle item click with performance tracking
    const startTime = performance.now();
    
    // Navigate or perform action
    this.router.navigate(['/items', item.id]);
    
    // Track interaction performance
    const interactionTime = performance.now() - startTime;
    this.performanceService.trackInteraction('item_click', {
      itemId: item.id,
      interactionTime
    });
  }
}
```

This comprehensive Angular guide now covers the most advanced topics including Angular 15+ image optimization, standalone APIs, Angular 16+ Signals, Angular 17+ SSR enhancements, Angular 18+ Material 3 design system with advanced theming, new control flow syntax with deferrable views, micro-frontends with Module Federation, cross-application state management, advanced performance monitoring, and sophisticated caching strategies essential for enterprise-level Angular applications.