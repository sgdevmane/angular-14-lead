# Angular 14 Integration Interview Questions

## Table of Contents
1. [Angular 14 New Features](#angular-14-new-features)
2. [Standalone Components](#standalone-components)
3. [Angular CLI Auto-completion](#angular-cli-auto-completion)
4. [Optional Injectors](#optional-injectors)
5. [Extended Developer Diagnostics](#extended-developer-diagnostics)
6. [Angular DevKit](#angular-devkit)
7. [Third-Party Integration](#third-party-integration)
8. [Micro-frontend Architecture](#micro-frontend-architecture)
9. [State Management Integration](#state-management-integration)
10. [Testing Integration](#testing-integration)

---

## Angular 14 New Features

### Q1: What are the key new features introduced in Angular 14?

**Answer:**
Angular 14 introduced several significant features that enhance developer experience and application performance.

**Key Angular 14 Features:**

1. **Standalone Components**
2. **Optional Injectors in Embedded Views**
3. **Extended Developer Diagnostics**
4. **Angular CLI Auto-completion**
5. **Bind Route Info to Component Inputs**
6. **Page Title Strategy**
7. **Angular DevKit**
8. **Strict Typed Forms**

**Feature Implementation Examples:**
```typescript
// 1. Standalone Components
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="standalone-component">
      <h2>Standalone Component</h2>
      <button mat-raised-button color="primary" (click)="onClick()">
        Click Me
      </button>
      <p *ngIf="showMessage">{{ message }}</p>
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
  showMessage = false;
  message = 'Hello from Standalone Component!';
  
  onClick() {
    this.showMessage = !this.showMessage;
  }
}

// 2. Bootstrapping with Standalone Components
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      BrowserAnimationsModule
    ),
    // Additional providers
    { provide: 'API_URL', useValue: 'https://api.example.com' }
  ]
}).catch(err => console.error(err));

// 3. Route Configuration with Standalone Components
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then(m => m.routes)
  },
  {
    path: 'user/:id',
    loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
    // Bind route parameters to component inputs
    data: { bindToComponentInputs: true }
  }
];

// 4. Component with Route Input Binding
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `
    <div class="user-profile">
      <h2>User Profile</h2>
      <p>User ID: {{ id }}</p>
      <p>Tab: {{ tab }}</p>
    </div>
  `
})
export class UserComponent {
  @Input() id!: string; // Automatically bound from route params
  @Input() tab?: string; // Automatically bound from query params
}

// 5. Page Title Strategy
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  
  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`MyApp - ${title}`);
    } else {
      this.title.setTitle('MyApp - Default Title');
    }
  }
}

// Register the title strategy
bootstrapApplication(AppComponent, {
  providers: [
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    // other providers
  ]
});

// 6. Optional Injectors in Embedded Views
import { Component, TemplateRef, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-dynamic-content',
  standalone: true,
  template: `
    <div class="container">
      <ng-template #dynamicTemplate let-user="user">
        <div class="user-card">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
          <button (click)="updateUser(user)">Update</button>
        </div>
      </ng-template>
      
      <div #dynamicContainer></div>
      
      <button (click)="loadDynamicContent()">Load Dynamic Content</button>
    </div>
  `
})
export class DynamicContentComponent {
  @ViewChild('dynamicTemplate', { read: TemplateRef }) template!: TemplateRef<any>;
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  
  constructor(private injector: Injector) {}
  
  loadDynamicContent() {
    // Create a custom injector for the embedded view
    const customInjector = Injector.create({
      providers: [
        { provide: UserService, useClass: UserService },
        { provide: 'CUSTOM_CONFIG', useValue: { theme: 'dark' } }
      ],
      parent: this.injector
    });
    
    // Create embedded view with custom injector
    const embeddedView = this.container.createEmbeddedView(
      this.template,
      { user: { name: 'John Doe', email: 'john@example.com' } },
      { injector: customInjector }
    );
  }
  
  updateUser(user: any) {
    console.log('Updating user:', user);
  }
}

// 7. Extended Developer Diagnostics
import { enableProdMode, isDevMode } from '@angular/core';

if (!isDevMode()) {
  enableProdMode();
} else {
  // Enable extended diagnostics in development
  console.log('Development mode - Extended diagnostics enabled');
  
  // Custom error handler for better debugging
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });
}

// 8. Strict Typed Forms (Angular 14+)
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
  selector: 'app-typed-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
        <h3>Preferences</h3>
        
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
      
      <button type="submit" [disabled]="userForm.invalid">
        Submit
      </button>
    </form>
  `
})
export class TypedFormComponent {
  userForm: FormGroup<UserForm>;
  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      age: this.fb.control(0, { validators: [Validators.min(0)], nonNullable: true }),
      preferences: this.fb.group({
        newsletter: this.fb.control(false, { nonNullable: true }),
        theme: this.fb.control<'light' | 'dark'>('light', { nonNullable: true })
      })
    });
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      // TypeScript now knows the exact types
      console.log('Form submitted:', formValue);
      
      // Access typed values
      const name: string = formValue.name!;
      const email: string = formValue.email!;
      const age: number = formValue.age!;
      const newsletter: boolean = formValue.preferences?.newsletter!;
      const theme: 'light' | 'dark' = formValue.preferences?.theme!;
    }
  }
}
```

---

## Standalone Components

### Q2: How do you migrate from NgModules to Standalone Components?

**Answer:**
Migrating to standalone components involves converting existing NgModule-based components and updating the application bootstrap process.

**Migration Strategy:**
```typescript
// BEFORE: Traditional NgModule approach
// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [UserService],
  exports: [UserComponent]
})
export class UserModule { }

// AFTER: Standalone Components approach
// user.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { UserService } from './user.service';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    UserListComponent,
    UserDetailComponent
  ],
  providers: [UserService],
  template: `
    <div class="user-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>User Management</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name">
              <mat-error *ngIf="userForm.get('name')?.errors?.['required']">
                Name is required
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              <mat-error *ngIf="userForm.get('email')?.errors?.['email']">
                Invalid email
              </mat-error>
            </mat-form-field>
            
            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="userForm.invalid">
                Save User
              </button>
              <button mat-button type="button" (click)="onReset()">
                Reset
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
      
      <app-user-list 
        [users]="users" 
        (userSelected)="onUserSelected($event)">
      </app-user-list>
      
      <app-user-detail 
        *ngIf="selectedUser" 
        [user]="selectedUser"
        (userUpdated)="onUserUpdated($event)">
      </app-user-detail>
    </div>
  `,
  styles: [`
    .user-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 20px;
    }
    
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    mat-form-field {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class UserComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  
  users: any[] = [];
  selectedUser: any = null;
  
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  
  ngOnInit() {
    this.loadUsers();
  }
  
  async loadUsers() {
    try {
      this.users = await this.userService.getUsers();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  
  async onSubmit() {
    if (this.userForm.valid) {
      try {
        const user = await this.userService.createUser(this.userForm.value);
        this.users.push(user);
        this.userForm.reset();
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  }
  
  onReset() {
    this.userForm.reset();
    this.selectedUser = null;
  }
  
  onUserSelected(user: any) {
    this.selectedUser = user;
  }
  
  onUserUpdated(user: any) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }
}

// user-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
    <mat-list>
      <h3 mat-subheader>Users</h3>
      <mat-list-item *ngFor="let user of users" (click)="selectUser(user)">
        <mat-icon matListItemIcon>person</mat-icon>
        <h4 matListItemTitle>{{ user.name }}</h4>
        <p matListItemLine>{{ user.email }}</p>
        <button mat-icon-button (click)="$event.stopPropagation(); deleteUser(user)">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    mat-list-item {
      cursor: pointer;
    }
    
    mat-list-item:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class UserListComponent {
  @Input() users: any[] = [];
  @Output() userSelected = new EventEmitter<any>();
  @Output() userDeleted = new EventEmitter<any>();
  
  selectUser(user: any) {
    this.userSelected.emit(user);
  }
  
  deleteUser(user: any) {
    this.userDeleted.emit(user);
  }
}

// Migration Utility
class StandaloneMigrationHelper {
  static convertComponentToStandalone(componentPath: string) {
    // This would be a CLI tool or script to help with migration
    console.log(`Converting ${componentPath} to standalone component`);
    
    // Steps:
    // 1. Add standalone: true to @Component decorator
    // 2. Move imports from NgModule to component imports array
    // 3. Move providers from NgModule to component providers array
    // 4. Update routing configuration
    // 5. Update tests
  }
  
  static generateStandaloneBootstrap(appComponentPath: string) {
    return `
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '${appComponentPath}';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      BrowserAnimationsModule
    )
  ]
}).catch(err => console.error(err));
    `;
  }
}

// Lazy Loading with Standalone Components
export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user.component').then(m => m.UserComponent)
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('./user-profile.component').then(m => m.UserProfileComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./user-settings.component').then(m => m.UserSettingsComponent),
    canActivate: [AuthGuard]
  }
];

// Feature-based routing with standalone components
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/user.routes').then(m => m.userRoutes)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/product.routes').then(m => m.productRoutes)
  }
];
```

**Migration Checklist:**
1. ✅ Convert components to standalone
2. ✅ Update routing configuration
3. ✅ Replace NgModule bootstrap with bootstrapApplication
4. ✅ Move shared services to root providers
5. ✅ Update lazy loading routes
6. ✅ Update unit tests
7. ✅ Update e2e tests
8. ✅ Remove unused NgModules

---

## Angular CLI Auto-completion

### Q3: How do you set up and use Angular CLI auto-completion?

**Answer:**
Angular 14 introduced CLI auto-completion to improve developer productivity.

**Setting up Auto-completion:**
```bash
# Enable auto-completion for current session
ng completion

# Add to shell profile for permanent setup
# For Bash
echo 'source <(ng completion script)' >> ~/.bashrc

# For Zsh
echo 'source <(ng completion script)' >> ~/.zshrc

# For Fish
ng completion script | source

# Reload shell or source the profile
source ~/.bashrc  # or ~/.zshrc
```

**Auto-completion Features:**
```bash
# Command completion
ng <TAB>  # Shows: build, serve, test, lint, e2e, generate, add, etc.

# Subcommand completion
ng generate <TAB>  # Shows: component, service, module, directive, etc.

# Option completion
ng build --<TAB>  # Shows: --configuration, --prod, --watch, --output-path, etc.

# Configuration completion
ng build --configuration <TAB>  # Shows: development, production, etc.

# Schematic completion
ng generate component <TAB>  # Shows available component options

# File path completion
ng generate component src/app/<TAB>  # Shows directory structure
```

**Custom CLI Commands with Auto-completion:**
```typescript
// custom-schematic.ts
import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  chain,
  mergeWith
} from '@angular-devkit/schematics';
import { strings, normalize, experimental } from '@angular-devkit/core';

interface Options {
  name: string;
  path?: string;
  project?: string;
  type: 'basic' | 'advanced' | 'custom';
}

export function customComponent(options: Options): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new Error('Could not find Angular workspace configuration');
    }

    const workspaceContent = workspaceConfig.toString();
    const workspace = JSON.parse(workspaceContent);
    
    if (!options.project) {
      options.project = workspace.defaultProject;
    }

    const projectConfig = workspace.projects[options.project];
    const projectRoot = projectConfig.root;
    const sourceRoot = projectConfig.sourceRoot || 'src';

    if (!options.path) {
      options.path = `${sourceRoot}/app`;
    }

    const templateSource = apply(url('./files'), [
      template({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
        type: options.type
      }),
      move(normalize(options.path as string))
    ]);

    return chain([
      mergeWith(templateSource)
    ]);
  };
}

// schema.json for auto-completion
{
  "$schema": "http://json-schema.org/schema",
  "id": "CustomComponent",
  "title": "Custom Component Options Schema",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the component.",
      "$default": {
        "$source": "argv",
        "index": 0
      },
      "x-prompt": "What name would you like to use for the component?"
    },
    "path": {
      "type": "string",
      "format": "path",
      "description": "The path at which to create the component file.",
      "visible": false
    },
    "project": {
      "type": "string",
      "description": "The name of the project.",
      "$default": {
        "$source": "projectName"
      }
    },
    "type": {
      "type": "string",
      "description": "The type of component to create.",
      "enum": ["basic", "advanced", "custom"],
      "default": "basic",
      "x-prompt": {
        "message": "Which type of component would you like to create?",
        "type": "list",
        "items": [
          { "value": "basic", "label": "Basic Component" },
          { "value": "advanced", "label": "Advanced Component with Services" },
          { "value": "custom", "label": "Custom Component with Full Setup" }
        ]
      }
    }
  },
  "required": ["name"]
}

// collection.json
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "custom-component": {
      "description": "A custom component schematic with auto-completion.",
      "factory": "./custom-component/index#customComponent",
      "schema": "./custom-component/schema.json"
    }
  }
}
```

**Enhanced CLI Workflow:**
```bash
# Auto-completion in action
ng generate custom-component <TAB>
# Prompts for component name with auto-completion

ng generate custom-component my-feature --type <TAB>
# Shows: basic, advanced, custom

ng build --configuration <TAB>
# Shows all available configurations from angular.json

ng test --browsers <TAB>
# Shows available browsers: Chrome, Firefox, Safari, etc.

ng lint --files <TAB>
# Shows file patterns and paths
```

---

## Optional Injectors

### Q4: How do you use optional injectors in embedded views?

**Answer:**
Optional injectors in Angular 14 allow you to provide different dependency injection contexts for embedded views.

**Implementation Examples:**
```typescript
// Dynamic Component Loading with Custom Injector
import {
  Component,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  Injector,
  inject,
  Injectable
} from '@angular/core';

// Services for injection
@Injectable()
export class ThemeService {
  private currentTheme = 'light';
  
  getTheme() {
    return this.currentTheme;
  }
  
  setTheme(theme: string) {
    this.currentTheme = theme;
  }
}

@Injectable()
export class ConfigService {
  constructor(private config: any) {}
  
  getConfig(key: string) {
    return this.config[key];
  }
}

// Component with optional injectors
@Component({
  selector: 'app-dynamic-injector',
  standalone: true,
  template: `
    <div class="container">
      <h2>Dynamic Injector Example</h2>
      
      <!-- Template for embedded view -->
      <ng-template #dynamicTemplate let-data="data">
        <div class="dynamic-content" [class]="getThemeClass()">
          <h3>{{ data.title }}</h3>
          <p>{{ data.description }}</p>
          <p>Theme: {{ getCurrentTheme() }}</p>
          <p>Config: {{ getConfigValue('apiUrl') }}</p>
          <button (click)="performAction(data)">Action</button>
        </div>
      </ng-template>
      
      <!-- Container for dynamic content -->
      <div #dynamicContainer class="dynamic-container"></div>
      
      <!-- Controls -->
      <div class="controls">
        <button (click)="createLightThemeView()">Create Light Theme View</button>
        <button (click)="createDarkThemeView()">Create Dark Theme View</button>
        <button (click)="createCustomConfigView()">Create Custom Config View</button>
        <button (click)="clearViews()">Clear All Views</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    
    .dynamic-container {
      border: 2px dashed #ccc;
      padding: 20px;
      margin: 20px 0;
      min-height: 200px;
    }
    
    .dynamic-content {
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    
    .dynamic-content.light {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
    }
    
    .dynamic-content.dark {
      background-color: #343a40;
      color: white;
      border: 1px solid #495057;
    }
    
    .controls {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class DynamicInjectorComponent {
  @ViewChild('dynamicTemplate', { read: TemplateRef }) template!: TemplateRef<any>;
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  
  private parentInjector = inject(Injector);
  private viewCounter = 0;
  
  createLightThemeView() {
    const lightThemeService = new ThemeService();
    lightThemeService.setTheme('light');
    
    const customInjector = Injector.create({
      providers: [
        { provide: ThemeService, useValue: lightThemeService },
        { provide: ConfigService, useValue: new ConfigService({ apiUrl: 'https://api.light.com' }) }
      ],
      parent: this.parentInjector
    });
    
    this.createEmbeddedView(customInjector, {
      title: `Light Theme View ${++this.viewCounter}`,
      description: 'This view uses a light theme configuration'
    });
  }
  
  createDarkThemeView() {
    const darkThemeService = new ThemeService();
    darkThemeService.setTheme('dark');
    
    const customInjector = Injector.create({
      providers: [
        { provide: ThemeService, useValue: darkThemeService },
        { provide: ConfigService, useValue: new ConfigService({ apiUrl: 'https://api.dark.com' }) }
      ],
      parent: this.parentInjector
    });
    
    this.createEmbeddedView(customInjector, {
      title: `Dark Theme View ${++this.viewCounter}`,
      description: 'This view uses a dark theme configuration'
    });
  }
  
  createCustomConfigView() {
    const customThemeService = new ThemeService();
    customThemeService.setTheme('custom');
    
    const customInjector = Injector.create({
      providers: [
        { provide: ThemeService, useValue: customThemeService },
        { provide: ConfigService, useValue: new ConfigService({ 
          apiUrl: 'https://api.custom.com',
          features: ['advanced', 'premium'],
          version: '2.0'
        }) },
        { provide: 'CUSTOM_TOKEN', useValue: 'Custom Value' }
      ],
      parent: this.parentInjector
    });
    
    this.createEmbeddedView(customInjector, {
      title: `Custom Config View ${++this.viewCounter}`,
      description: 'This view uses a custom configuration with additional features'
    });
  }
  
  private createEmbeddedView(injector: Injector, data: any) {
    const embeddedViewRef = this.container.createEmbeddedView(
      this.template,
      { data },
      { injector }
    );
    
    // Store reference for cleanup
    embeddedViewRef.context.getThemeClass = () => {
      const themeService = injector.get(ThemeService);
      return themeService.getTheme();
    };
    
    embeddedViewRef.context.getCurrentTheme = () => {
      const themeService = injector.get(ThemeService);
      return themeService.getTheme();
    };
    
    embeddedViewRef.context.getConfigValue = (key: string) => {
      const configService = injector.get(ConfigService);
      return configService.getConfig(key);
    };
    
    embeddedViewRef.context.performAction = (data: any) => {
      console.log('Action performed with data:', data);
      console.log('Theme:', injector.get(ThemeService).getTheme());
      console.log('Config:', injector.get(ConfigService));
    };
  }
  
  clearViews() {
    this.container.clear();
    this.viewCounter = 0;
  }
}

// Advanced Example: Modal Service with Custom Injectors
@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals = new Map<string, any>();
  
  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {}
  
  open<T>(component: any, config: ModalConfig<T> = {}): ModalRef<T> {
    const modalId = this.generateId();
    
    // Create custom injector for modal
    const modalInjector = Injector.create({
      providers: [
        { provide: 'MODAL_DATA', useValue: config.data },
        { provide: 'MODAL_CONFIG', useValue: config },
        { provide: ModalRef, useValue: new ModalRef(modalId, this) },
        ...(config.providers || [])
      ],
      parent: this.injector
    });
    
    // Create component with custom injector
    const componentRef = this.viewContainerRef.createComponent(
      component,
      { injector: modalInjector }
    );
    
    const modalRef = new ModalRef<T>(modalId, this);
    modalRef.componentRef = componentRef;
    
    this.modals.set(modalId, modalRef);
    
    return modalRef;
  }
  
  close(modalId: string, result?: any) {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.componentRef.destroy();
      this.modals.delete(modalId);
      modal.afterClosed.next(result);
      modal.afterClosed.complete();
    }
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

interface ModalConfig<T = any> {
  data?: T;
  providers?: any[];
  width?: string;
  height?: string;
  disableClose?: boolean;
}

export class ModalRef<T = any> {
  componentRef: any;
  afterClosed = new Subject<T>();
  
  constructor(
    private modalId: string,
    private modalService: ModalService
  ) {}
  
  close(result?: T) {
    this.modalService.close(this.modalId, result);
  }
}

// Modal Component Example
@Component({
  selector: 'app-custom-modal',
  standalone: true,
  template: `
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>{{ modalData.title }}</h2>
        <p>{{ modalData.message }}</p>
        <p>Custom Service Value: {{ customValue }}</p>
        
        <div class="modal-actions">
          <button (click)="onConfirm()">Confirm</button>
          <button (click)="onCancel()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 400px;
      width: 90%;
    }
    
    .modal-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `]
})
export class CustomModalComponent {
  modalData = inject('MODAL_DATA');
  modalRef = inject(ModalRef);
  customValue = inject('CUSTOM_SERVICE', { optional: true })?.getValue() || 'No custom service';
  
  onConfirm() {
    this.modalRef.close({ confirmed: true, data: this.modalData });
  }
  
  onCancel() {
    this.modalRef.close({ confirmed: false });
  }
}

// Usage
@Component({
  selector: 'app-modal-example',
  standalone: true,
  template: `
    <button (click)="openModal()">Open Modal with Custom Injector</button>
  `
})
export class ModalExampleComponent {
  constructor(private modalService: ModalService) {}
  
  openModal() {
    const modalRef = this.modalService.open(CustomModalComponent, {
      data: {
        title: 'Custom Modal',
        message: 'This modal has a custom injector context'
      },
      providers: [
        { provide: 'CUSTOM_SERVICE', useValue: { getValue: () => 'Injected Value' } }
      ]
    });
    
    modalRef.afterClosed.subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }
}
```

This comprehensive guide covers Angular 14's new features and integration patterns, providing practical examples for modern Angular development.