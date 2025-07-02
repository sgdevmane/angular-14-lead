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

---

## Advanced Angular 14 Integration Patterns

### Q5: How do you implement micro-frontend architecture with Angular 14?

**Answer:**
Micro-frontend architecture allows teams to develop and deploy frontend applications independently. Angular 14 provides excellent support for this pattern.

**Module Federation Setup:**
```typescript
// webpack.config.js for Shell Application
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 4200,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        'mfe1': 'mfe1@http://localhost:4201/remoteEntry.js',
        'mfe2': 'mfe2@http://localhost:4202/remoteEntry.js',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
      },
    }),
  ],
};

// webpack.config.js for Micro-frontend
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 4201,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe1',
      filename: 'remoteEntry.js',
      exposes: {
        './Component': './src/app/mfe1/mfe1.component.ts',
        './Module': './src/app/mfe1/mfe1.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
      },
    }),
  ],
};
```

**Dynamic Component Loading:**
```typescript
// Dynamic MFE Loader Service
import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@module-federation/runtime';

@Injectable({
  providedIn: 'root'
})
export class MicroFrontendLoaderService {
  private loadedComponents = new Map<string, ComponentRef<any>>();

  async loadMicroFrontend(
    containerRef: ViewContainerRef,
    remoteName: string,
    exposedModule: string,
    componentName: string
  ): Promise<ComponentRef<any>> {
    try {
      // Clear existing component
      containerRef.clear();

      // Load remote module
      const module = await loadRemoteModule({
        remoteName,
        exposedModule
      });

      // Get component from module
      const component = module[componentName];
      
      // Create component
      const componentRef = containerRef.createComponent(component);
      
      // Store reference for cleanup
      this.loadedComponents.set(`${remoteName}-${componentName}`, componentRef);
      
      return componentRef;
    } catch (error) {
      console.error(`Failed to load micro-frontend: ${remoteName}`, error);
      throw error;
    }
  }

  unloadMicroFrontend(remoteName: string, componentName: string): void {
    const key = `${remoteName}-${componentName}`;
    const componentRef = this.loadedComponents.get(key);
    
    if (componentRef) {
      componentRef.destroy();
      this.loadedComponents.delete(key);
    }
  }

  unloadAllMicroFrontends(): void {
    this.loadedComponents.forEach(componentRef => componentRef.destroy());
    this.loadedComponents.clear();
  }
}

// Shell Component
@Component({
  selector: 'app-shell',
  template: `
    <nav class="navigation">
      <button (click)="loadMFE('mfe1', 'UserManagement')">User Management</button>
      <button (click)="loadMFE('mfe2', 'ProductCatalog')">Product Catalog</button>
      <button (click)="unloadAll()">Clear All</button>
    </nav>
    
    <div class="mfe-container" #mfeContainer></div>
    
    <div class="error-boundary" *ngIf="error">
      <h3>Error Loading Micro-Frontend</h3>
      <p>{{ error }}</p>
      <button (click)="clearError()">Dismiss</button>
    </div>
  `,
  styles: [`
    .navigation {
      padding: 20px;
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
    
    .navigation button {
      margin-right: 10px;
      padding: 10px 20px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .mfe-container {
      padding: 20px;
      min-height: 400px;
    }
    
    .error-boundary {
      background: #f8d7da;
      color: #721c24;
      padding: 20px;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      margin: 20px;
    }
  `]
})
export class ShellComponent implements OnDestroy {
  @ViewChild('mfeContainer', { read: ViewContainerRef }) 
  mfeContainer!: ViewContainerRef;
  
  error: string | null = null;
  
  constructor(private mfeLoader: MicroFrontendLoaderService) {}
  
  async loadMFE(remoteName: string, componentName: string): Promise<void> {
    try {
      this.error = null;
      await this.mfeLoader.loadMicroFrontend(
        this.mfeContainer,
        remoteName,
        './Component',
        componentName
      );
    } catch (error) {
      this.error = `Failed to load ${componentName} from ${remoteName}`;
      console.error(error);
    }
  }
  
  unloadAll(): void {
    this.mfeLoader.unloadAllMicroFrontends();
    this.mfeContainer.clear();
  }
  
  clearError(): void {
    this.error = null;
  }
  
  ngOnDestroy(): void {
    this.unloadAll();
  }
}
```

**Inter-MFE Communication:**
```typescript
// Shared Event Bus Service
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface MFEEvent {
  type: string;
  source: string;
  target?: string;
  payload: any;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class MFEEventBusService {
  private eventSubject = new Subject<MFEEvent>();
  private events$ = this.eventSubject.asObservable();
  
  // Emit event to other MFEs
  emit(type: string, payload: any, source: string, target?: string): void {
    const event: MFEEvent = {
      type,
      source,
      target,
      payload,
      timestamp: Date.now()
    };
    
    this.eventSubject.next(event);
  }
  
  // Listen for specific event types
  on(eventType: string, source?: string): Observable<MFEEvent> {
    return this.events$.pipe(
      filter(event => {
        const typeMatch = event.type === eventType;
        const sourceMatch = !source || event.source === source;
        return typeMatch && sourceMatch;
      })
    );
  }
  
  // Listen for events targeted to specific MFE
  onTargeted(target: string): Observable<MFEEvent> {
    return this.events$.pipe(
      filter(event => event.target === target)
    );
  }
  
  // Get event payload directly
  onPayload<T>(eventType: string, source?: string): Observable<T> {
    return this.on(eventType, source).pipe(
      map(event => event.payload as T)
    );
  }
}

// Usage in MFE1
@Component({
  selector: 'app-user-management',
  template: `
    <div class="user-management">
      <h2>User Management MFE</h2>
      <button (click)="selectUser()">Select User</button>
      <div *ngIf="selectedProduct">
        <h3>Related Product: {{ selectedProduct.name }}</h3>
        <p>Price: {{ selectedProduct.price | currency }}</p>
      </div>
    </div>
  `
})
export class UserManagementComponent implements OnInit, OnDestroy {
  selectedProduct: any = null;
  private destroy$ = new Subject<void>();
  
  constructor(private eventBus: MFEEventBusService) {}
  
  ngOnInit(): void {
    // Listen for product selection from other MFEs
    this.eventBus.onPayload<any>('product-selected')
      .pipe(takeUntil(this.destroy$))
      .subscribe(product => {
        this.selectedProduct = product;
      });
  }
  
  selectUser(): void {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    // Emit user selection event
    this.eventBus.emit('user-selected', user, 'mfe1');
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Q6: How do you implement advanced state sharing between Angular 14 applications?

**Answer:**
Advanced state sharing involves multiple strategies for different scenarios, from simple cross-component communication to complex distributed state management.

**Cross-Application State Management:**
```typescript
// Shared State Service using BroadcastChannel
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface StateMessage {
  type: string;
  payload: any;
  timestamp: number;
  source: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrossAppStateService {
  private channel: BroadcastChannel;
  private localState = new BehaviorSubject<any>({});
  private channelMessages$: Observable<StateMessage>;
  
  constructor() {
    this.channel = new BroadcastChannel('app-state-sync');
    
    // Listen for messages from other app instances
    this.channelMessages$ = fromEvent<MessageEvent>(this.channel, 'message')
      .pipe(
        map(event => event.data as StateMessage),
        filter(message => message.source !== this.getAppId())
      );
    
    // Subscribe to external state changes
    this.channelMessages$.subscribe(message => {
      this.handleExternalStateChange(message);
    });
  }
  
  // Update local state and broadcast to other instances
  updateState(key: string, value: any): void {
    const currentState = this.localState.value;
    const newState = { ...currentState, [key]: value };
    
    this.localState.next(newState);
    
    // Broadcast to other app instances
    this.broadcastStateChange(key, value);
  }
  
  // Get current state
  getState(): Observable<any> {
    return this.localState.asObservable();
  }
  
  // Get specific state slice
  getStateSlice<T>(key: string): Observable<T> {
    return this.localState.pipe(
      map(state => state[key] as T),
      filter(value => value !== undefined)
    );
  }
  
  // Listen for external state changes
  onExternalStateChange(type?: string): Observable<StateMessage> {
    return this.channelMessages$.pipe(
      filter(message => !type || message.type === type)
    );
  }
  
  private broadcastStateChange(key: string, value: any): void {
    const message: StateMessage = {
      type: 'state-update',
      payload: { key, value },
      timestamp: Date.now(),
      source: this.getAppId()
    };
    
    this.channel.postMessage(message);
  }
  
  private handleExternalStateChange(message: StateMessage): void {
    if (message.type === 'state-update') {
      const { key, value } = message.payload;
      const currentState = this.localState.value;
      const newState = { ...currentState, [key]: value };
      
      // Update local state without broadcasting (to avoid loops)
      this.localState.next(newState);
    }
  }
  
  private getAppId(): string {
    // Generate or retrieve unique app instance ID
    if (!sessionStorage.getItem('app-instance-id')) {
      sessionStorage.setItem('app-instance-id', 
        `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    }
    return sessionStorage.getItem('app-instance-id')!;
  }
  
  destroy(): void {
    this.channel.close();
  }
}

// Advanced State Synchronization with Conflict Resolution
@Injectable({
  providedIn: 'root'
})
export class AdvancedStateSync {
  private stateVersions = new Map<string, number>();
  private conflictResolver = new Map<string, (local: any, remote: any) => any>();
  
  constructor(private crossAppState: CrossAppStateService) {
    this.setupConflictResolvers();
    this.listenForConflicts();
  }
  
  // Register conflict resolution strategy
  registerConflictResolver(
    key: string, 
    resolver: (local: any, remote: any) => any
  ): void {
    this.conflictResolver.set(key, resolver);
  }
  
  // Update state with versioning
  updateVersionedState(key: string, value: any): void {
    const version = (this.stateVersions.get(key) || 0) + 1;
    this.stateVersions.set(key, version);
    
    const versionedValue = {
      data: value,
      version,
      timestamp: Date.now(),
      source: this.getInstanceId()
    };
    
    this.crossAppState.updateState(key, versionedValue);
  }
  
  private setupConflictResolvers(): void {
    // Last-write-wins resolver
    this.registerConflictResolver('user-preferences', 
      (local, remote) => remote.timestamp > local.timestamp ? remote : local
    );
    
    // Merge resolver for arrays
    this.registerConflictResolver('notifications', 
      (local, remote) => {
        const localIds = new Set(local.data.map((item: any) => item.id));
        const mergedData = [
          ...local.data,
          ...remote.data.filter((item: any) => !localIds.has(item.id))
        ];
        return {
          data: mergedData,
          version: Math.max(local.version, remote.version),
          timestamp: Math.max(local.timestamp, remote.timestamp),
          source: 'merged'
        };
      }
    );
    
    // Custom business logic resolver
    this.registerConflictResolver('shopping-cart', 
      (local, remote) => {
        // Merge cart items, sum quantities for same products
        const mergedItems = new Map();
        
        [...local.data.items, ...remote.data.items].forEach((item: any) => {
          const existing = mergedItems.get(item.productId);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            mergedItems.set(item.productId, { ...item });
          }
        });
        
        return {
          data: {
            items: Array.from(mergedItems.values()),
            total: Array.from(mergedItems.values())
              .reduce((sum, item) => sum + (item.price * item.quantity), 0)
          },
          version: Math.max(local.version, remote.version) + 1,
          timestamp: Date.now(),
          source: 'conflict-resolved'
        };
      }
    );
  }
  
  private listenForConflicts(): void {
    this.crossAppState.onExternalStateChange('state-update')
      .subscribe(message => {
        const { key, value: remoteValue } = message.payload;
        
        this.crossAppState.getStateSlice(key).pipe(
          take(1)
        ).subscribe(localValue => {
          if (localValue && this.hasConflict(localValue, remoteValue)) {
            this.resolveConflict(key, localValue, remoteValue);
          }
        });
      });
  }
  
  private hasConflict(local: any, remote: any): boolean {
    return local.version !== remote.version && 
           local.source !== remote.source;
  }
  
  private resolveConflict(key: string, local: any, remote: any): void {
    const resolver = this.conflictResolver.get(key);
    
    if (resolver) {
      const resolved = resolver(local, remote);
      this.crossAppState.updateState(key, resolved);
    } else {
      // Default: use timestamp-based resolution
      const winner = remote.timestamp > local.timestamp ? remote : local;
      this.crossAppState.updateState(key, winner);
    }
  }
  
  private getInstanceId(): string {
    return sessionStorage.getItem('app-instance-id') || 'unknown';
  }
}
```

### Q7: How do you implement real-time collaboration features in Angular 14?

**Answer:**
Real-time collaboration requires WebSocket connections, operational transformation, and conflict resolution strategies.

**Real-time Collaboration Service:**
```typescript
// WebSocket-based Collaboration Service
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retry, catchError } from 'rxjs/operators';

interface CollaborationEvent {
  type: 'operation' | 'cursor' | 'selection' | 'user-join' | 'user-leave';
  userId: string;
  documentId: string;
  operation?: Operation;
  cursor?: CursorPosition;
  selection?: SelectionRange;
  timestamp: number;
}

interface Operation {
  type: 'insert' | 'delete' | 'retain';
  position: number;
  content?: string;
  length?: number;
  attributes?: any;
}

interface CursorPosition {
  line: number;
  column: number;
  color: string;
}

interface SelectionRange {
  start: { line: number; column: number };
  end: { line: number; column: number };
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  private socket$: WebSocketSubject<any> | null = null;
  private connectionStatus$ = new BehaviorSubject<'connected' | 'disconnected' | 'connecting'>('disconnected');
  private collaborationEvents$ = new Subject<CollaborationEvent>();
  private activeUsers$ = new BehaviorSubject<Map<string, any>>(new Map());
  
  private currentUserId: string;
  private currentDocumentId: string | null = null;
  
  constructor() {
    this.currentUserId = this.generateUserId();
  }
  
  // Connect to collaboration server
  connect(documentId: string, wsUrl: string): Observable<CollaborationEvent> {
    this.currentDocumentId = documentId;
    this.connectionStatus$.next('connecting');
    
    this.socket$ = webSocket({
      url: `${wsUrl}?documentId=${documentId}&userId=${this.currentUserId}`,
      openObserver: {
        next: () => {
          this.connectionStatus$.next('connected');
          this.joinDocument(documentId);
        }
      },
      closeObserver: {
        next: () => {
          this.connectionStatus$.next('disconnected');
        }
      }
    });
    
    // Handle incoming messages
    this.socket$.pipe(
      retry({ delay: 3000 }),
      catchError(error => {
        console.error('WebSocket error:', error);
        this.connectionStatus$.next('disconnected');
        throw error;
      })
    ).subscribe(event => {
      this.handleCollaborationEvent(event);
    });
    
    return this.collaborationEvents$.asObservable();
  }
  
  // Send operation to other collaborators
  sendOperation(operation: Operation): void {
    if (this.socket$ && this.currentDocumentId) {
      const event: CollaborationEvent = {
        type: 'operation',
        userId: this.currentUserId,
        documentId: this.currentDocumentId,
        operation,
        timestamp: Date.now()
      };
      
      this.socket$.next(event);
    }
  }
  
  // Send cursor position
  sendCursorPosition(cursor: CursorPosition): void {
    if (this.socket$ && this.currentDocumentId) {
      const event: CollaborationEvent = {
        type: 'cursor',
        userId: this.currentUserId,
        documentId: this.currentDocumentId,
        cursor,
        timestamp: Date.now()
      };
      
      this.socket$.next(event);
    }
  }
  
  // Send selection range
  sendSelection(selection: SelectionRange): void {
    if (this.socket$ && this.currentDocumentId) {
      const event: CollaborationEvent = {
        type: 'selection',
        userId: this.currentUserId,
        documentId: this.currentDocumentId,
        selection,
        timestamp: Date.now()
      };
      
      this.socket$.next(event);
    }
  }
  
  // Get connection status
  getConnectionStatus(): Observable<'connected' | 'disconnected' | 'connecting'> {
    return this.connectionStatus$.asObservable();
  }
  
  // Get active users
  getActiveUsers(): Observable<Map<string, any>> {
    return this.activeUsers$.asObservable();
  }
  
  // Disconnect from collaboration
  disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
    this.connectionStatus$.next('disconnected');
    this.activeUsers$.next(new Map());
  }
  
  private joinDocument(documentId: string): void {
    if (this.socket$) {
      this.socket$.next({
        type: 'user-join',
        userId: this.currentUserId,
        documentId,
        userInfo: {
          name: this.getUserName(),
          avatar: this.getUserAvatar(),
          color: this.getUserColor()
        },
        timestamp: Date.now()
      });
    }
  }
  
  private handleCollaborationEvent(event: CollaborationEvent): void {
    // Don't process our own events
    if (event.userId === this.currentUserId) {
      return;
    }
    
    switch (event.type) {
      case 'user-join':
        this.handleUserJoin(event);
        break;
      case 'user-leave':
        this.handleUserLeave(event);
        break;
      default:
        this.collaborationEvents$.next(event);
    }
  }
  
  private handleUserJoin(event: CollaborationEvent): void {
    const users = this.activeUsers$.value;
    users.set(event.userId, {
      id: event.userId,
      ...event,
      joinedAt: event.timestamp
    });
    this.activeUsers$.next(new Map(users));
    this.collaborationEvents$.next(event);
  }
  
  private handleUserLeave(event: CollaborationEvent): void {
    const users = this.activeUsers$.value;
    users.delete(event.userId);
    this.activeUsers$.next(new Map(users));
    this.collaborationEvents$.next(event);
  }
  
  private generateUserId(): string {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private getUserName(): string {
    return localStorage.getItem('userName') || 'Anonymous User';
  }
  
  private getUserAvatar(): string {
    return localStorage.getItem('userAvatar') || '/assets/default-avatar.png';
  }
  
  private getUserColor(): string {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    const index = this.currentUserId.charCodeAt(0) % colors.length;
    return colors[index];
  }
}

// Operational Transformation for Text Editing
@Injectable({
  providedIn: 'root'
})
export class OperationalTransformService {
  // Transform operation against another operation
  transform(op1: Operation, op2: Operation): [Operation, Operation] {
    if (op1.type === 'retain' && op2.type === 'retain') {
      return [op1, op2];
    }
    
    if (op1.type === 'insert' && op2.type === 'insert') {
      if (op1.position <= op2.position) {
        return [
          op1,
          { ...op2, position: op2.position + (op1.content?.length || 0) }
        ];
      } else {
        return [
          { ...op1, position: op1.position + (op2.content?.length || 0) },
          op2
        ];
      }
    }
    
    if (op1.type === 'delete' && op2.type === 'delete') {
      if (op1.position <= op2.position) {
        return [
          op1,
          { ...op2, position: Math.max(op2.position - (op1.length || 0), op1.position) }
        ];
      } else {
        return [
          { ...op1, position: Math.max(op1.position - (op2.length || 0), op2.position) },
          op2
        ];
      }
    }
    
    if (op1.type === 'insert' && op2.type === 'delete') {
      if (op1.position <= op2.position) {
        return [
          op1,
          { ...op2, position: op2.position + (op1.content?.length || 0) }
        ];
      } else {
        return [
          { ...op1, position: Math.max(op1.position - (op2.length || 0), op2.position) },
          op2
        ];
      }
    }
    
    if (op1.type === 'delete' && op2.type === 'insert') {
      if (op1.position <= op2.position) {
        return [
          op1,
          { ...op2, position: Math.max(op2.position - (op1.length || 0), op1.position) }
        ];
      } else {
        return [
          { ...op1, position: op1.position + (op2.content?.length || 0) },
          op2
        ];
      }
    }
    
    return [op1, op2];
  }
  
  // Apply operation to text
  applyOperation(text: string, operation: Operation): string {
    switch (operation.type) {
      case 'insert':
        return text.slice(0, operation.position) + 
               (operation.content || '') + 
               text.slice(operation.position);
      
      case 'delete':
        return text.slice(0, operation.position) + 
               text.slice(operation.position + (operation.length || 0));
      
      case 'retain':
        return text;
      
      default:
        return text;
    }
  }
  
  // Compose multiple operations
  composeOperations(ops: Operation[]): Operation[] {
    if (ops.length === 0) return [];
    if (ops.length === 1) return ops;
    
    const result: Operation[] = [];
    let current = ops[0];
    
    for (let i = 1; i < ops.length; i++) {
      const next = ops[i];
      
      // Try to merge operations
      if (this.canMerge(current, next)) {
        current = this.mergeOperations(current, next);
      } else {
        result.push(current);
        current = next;
      }
    }
    
    result.push(current);
    return result;
  }
  
  private canMerge(op1: Operation, op2: Operation): boolean {
    if (op1.type !== op2.type) return false;
    
    if (op1.type === 'insert' && op2.type === 'insert') {
      return op1.position + (op1.content?.length || 0) === op2.position;
    }
    
    if (op1.type === 'delete' && op2.type === 'delete') {
      return op1.position === op2.position;
    }
    
    return false;
  }
  
  private mergeOperations(op1: Operation, op2: Operation): Operation {
    if (op1.type === 'insert' && op2.type === 'insert') {
      return {
        type: 'insert',
        position: op1.position,
        content: (op1.content || '') + (op2.content || '')
      };
    }
    
    if (op1.type === 'delete' && op2.type === 'delete') {
      return {
        type: 'delete',
        position: op1.position,
        length: (op1.length || 0) + (op2.length || 0)
      };
    }
    
    return op1;
  }
}
```

### Q8: How would you implement advanced Angular 14+ integration with modern development tools and CI/CD pipelines?

**Answer:**
Advanced Angular 14+ integration involves sophisticated tooling, automated workflows, and modern development practices to ensure scalable, maintainable, and high-performance applications.

**Modern Development Toolchain Integration:**

1. **Advanced Angular CLI Workspace Configuration:**
```json
// angular.json - Advanced workspace configuration
{
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "main-app": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": true,
          "changeDetection": "OnPush"
        },
        "@schematics/angular:directive": {
          "standalone": true
        },
        "@schematics/angular:pipe": {
          "standalone": true
        }
      },
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser-esbuild",
          "options": {
            "outputPath": "dist/main-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "node_modules/@angular/material/prebuilt-themes/",
                "output": "/assets/themes/"
              }
            ],
            "styles": [
              "@angular/material/prebuilt-themes/indigo-pink.css",
              "src/styles.scss"
            ],
            "scripts": [],
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "500kb",
                "maximumError": "1mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "2kb",
                "maximumError": "4kb"
              }
            ],
            "optimization": {
              "scripts": true,
              "styles": {
                "minify": true,
                "inlineCritical": true
              },
              "fonts": true
            },
            "sourceMap": false,
            "namedChunks": false,
            "aot": true,
            "extractLicenses": true,
            "vendorChunk": false,
            "buildOptimizer": true
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "serviceWorker": true,
              "ngswConfigPath": "ngsw-config.json"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": [],
            "codeCoverage": true,
            "browsers": "ChromeHeadless"
          }
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": ["src/**/*.ts", "src/**/*.html"]
          }
        },
        "e2e": {
          "builder": "@cypress/schematic:cypress",
          "options": {
            "devServerTarget": "main-app:serve",
            "watch": true,
            "headless": false
          },
          "configurations": {
            "production": {
              "devServerTarget": "main-app:serve:production",
              "headless": true
            }
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false,
    "cache": {
      "enabled": true,
      "path": ".angular/cache",
      "environment": "all"
    },
    "completion": {
      "prompted": true
    },
    "schematicCollections": [
      "@angular-eslint/schematics",
      "@ngrx/schematics"
    ]
  }
}
```

2. **Advanced ESBuild Integration:**
```typescript
// esbuild.config.ts - Custom ESBuild configuration
import { BuildOptions } from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { copy } from 'esbuild-plugin-copy';

export const esbuildConfig: BuildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  target: 'es2020',
  platform: 'browser',
  splitting: true,
  chunkNames: 'chunks/[name]-[hash]',
  assetNames: 'assets/[name]-[hash]',
  metafile: true,
  sourcemap: true,
  minify: process.env['NODE_ENV'] === 'production',
  treeShaking: true,
  plugins: [
    sassPlugin({
      filter: /\.(s[ac]ss|css)$/,
      type: 'css',
      cache: true
    }),
    copy({
      resolveFrom: 'cwd',
      assets: [
        {
          from: ['src/assets/**/*'],
          to: ['dist/assets']
        },
        {
          from: ['src/favicon.ico'],
          to: ['dist']
        }
      ]
    })
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env['NODE_ENV'] || 'development'),
    'process.env.API_URL': JSON.stringify(process.env['API_URL'] || 'http://localhost:3000')
  },
  external: [
    // Mark certain dependencies as external if needed
  ],
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.svg': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file'
  },
  banner: {
    js: '/* Angular Application Bundle */'
  }
};
```

3. **Advanced CI/CD Pipeline Integration:**
```yaml
# .github/workflows/ci-cd.yml - GitHub Actions workflow
name: Angular CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18.x'
  CACHE_KEY: 'node-modules'

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          npm ci --prefer-offline --no-audit
          npx ngcc --properties es2020 browser module main
      
      - name: Lint code
        run: |
          npm run lint
          npm run lint:html
      
      - name: Run unit tests
        run: |
          npm run test:ci
          npm run test:coverage
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
      
      - name: Run e2e tests
        run: |
          npm run e2e:ci
      
      - name: Build application
        run: |
          npm run build:prod
      
      - name: Analyze bundle
        run: |
          npm run analyze
          npm run lighthouse:ci
      
      - name: Security audit
        run: |
          npm audit --audit-level=high
          npm run security:check
  
  build-and-deploy:
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci --prefer-offline --no-audit
      
      - name: Build for production
        run: |
          npm run build:prod
          npm run prerender
      
      - name: Build Docker image
        run: |
          docker build -t angular-app:${{ github.sha }} .
          docker tag angular-app:${{ github.sha }} angular-app:latest
      
      - name: Run security scan
        run: |
          docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
            -v $PWD:/tmp/.cache/ aquasec/trivy:latest image \
            --exit-code 0 --no-progress --format table \
            angular-app:${{ github.sha }}
      
      - name: Deploy to staging
        if: github.ref == 'refs/heads/develop'
        run: |
          echo "Deploying to staging environment"
          # Add staging deployment commands
      
      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: |
          echo "Deploying to production environment"
          # Add production deployment commands
      
      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

4. **Advanced Development Tools Integration:**
```typescript
// tools/dev-server.ts - Custom development server
import { createServer } from 'vite';
import { angular } from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export const devServerConfig = defineConfig({
  plugins: [
    angular({
      tsconfig: 'tsconfig.app.json',
      workspaceRoot: process.cwd(),
      inlineStylesExtension: 'scss'
    })
  ],
  server: {
    port: 4200,
    host: '0.0.0.0',
    hmr: {
      port: 4201
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@angular/core', '@angular/common', '@angular/platform-browser'],
          material: ['@angular/material'],
          rxjs: ['rxjs']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/material',
      'rxjs'
    ]
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env['API_URL'] || 'http://localhost:3000')
  }
});

// Custom development middleware
export class DevServerMiddleware {
  static setupMiddleware(app: any) {
    // API mocking middleware
    app.use('/api/mock', (req: any, res: any, next: any) => {
      const mockData = this.generateMockData(req.path);
      res.json(mockData);
    });
    
    // Performance monitoring middleware
    app.use('/api/performance', (req: any, res: any, next: any) => {
      const performanceData = this.collectPerformanceMetrics();
      res.json(performanceData);
    });
    
    // Hot reload middleware for standalone components
    app.use('/api/hmr', (req: any, res: any, next: any) => {
      this.handleHotModuleReplacement(req, res);
    });
  }
  
  private static generateMockData(path: string): any {
    // Generate mock data based on API path
    const mockResponses = {
      '/users': [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ],
      '/products': [
        { id: 1, name: 'Product 1', price: 99.99 },
        { id: 2, name: 'Product 2', price: 149.99 }
      ]
    };
    
    return mockResponses[path] || { message: 'Mock data not found' };
  }
  
  private static collectPerformanceMetrics(): any {
    return {
      timestamp: Date.now(),
      memory: process.memoryUsage(),
      uptime: process.uptime()
    };
  }
  
  private static handleHotModuleReplacement(req: any, res: any): void {
    // Handle HMR for Angular standalone components
    res.json({ status: 'HMR enabled', timestamp: Date.now() });
  }
}
```

### Q9: How would you implement advanced Angular 14+ integration with modern monitoring, analytics, and observability tools?

**Answer:**
Advanced monitoring and observability integration involves comprehensive tracking, real-time analytics, and intelligent alerting to ensure optimal application performance and user experience.

**Comprehensive Observability Integration:**

1. **Advanced Application Performance Monitoring:**
```typescript
// monitoring/apm.service.ts - Advanced APM integration
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { filter, tap, catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdvancedAPMService {
  private performanceObserver: PerformanceObserver;
  private metricsSubject = new BehaviorSubject<PerformanceMetrics>({});
  private errorTracker = new Map<string, ErrorMetric>();
  
  constructor(private router: Router) {
    this.initializeAPM();
    this.setupRouteTracking();
    this.setupErrorTracking();
    this.setupUserInteractionTracking();
  }
  
  private initializeAPM() {
    // Initialize performance observer
    this.performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.processPerformanceEntry(entry);
      }
    });
    
    this.performanceObserver.observe({
      entryTypes: [
        'navigation',
        'resource',
        'paint',
        'largest-contentful-paint',
        'first-input',
        'layout-shift',
        'long-animation-frame',
        'user-timing',
        'measure'
      ]
    });
    
    // Track Core Web Vitals
    this.trackCoreWebVitals();
    
    // Setup real-time monitoring
    this.setupRealTimeMonitoring();
  }
  
  private trackCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.sendMetric({
        name: 'LCP',
        value: lastEntry.startTime,
        timestamp: Date.now(),
        url: window.location.href,
        rating: this.getRating('LCP', lastEntry.startTime)
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        
        this.sendMetric({
          name: 'FID',
          value: fid,
          timestamp: Date.now(),
          url: window.location.href,
          rating: this.getRating('FID', fid)
        });
      }
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      
      this.sendMetric({
        name: 'CLS',
        value: clsValue,
        timestamp: Date.now(),
        url: window.location.href,
        rating: this.getRating('CLS', clsValue)
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  private setupRouteTracking() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap((event: NavigationEnd) => {
          this.trackPageView({
            url: event.url,
            timestamp: Date.now(),
            loadTime: performance.now(),
            referrer: document.referrer,
            userAgent: navigator.userAgent
          });
        })
      )
      .subscribe();
  }
  
  private setupErrorTracking() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    });
  }
  
  private setupUserInteractionTracking() {
    // Track user interactions
    const interactionEvents = ['click', 'scroll', 'keydown', 'touchstart'];
    
    interactionEvents.forEach(eventType => {
      fromEvent(document, eventType)
        .pipe(
          tap((event) => {
            this.trackUserInteraction({
              type: eventType,
              target: (event.target as Element)?.tagName,
              timestamp: Date.now(),
              url: window.location.href
            });
          })
        )
        .subscribe();
    });
  }
  
  private setupRealTimeMonitoring() {
    // Monitor memory usage
    setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        
        this.sendMetric({
          name: 'Memory',
          value: memory.usedJSHeapSize,
          metadata: {
            totalJSHeapSize: memory.totalJSHeapSize,
            jsHeapSizeLimit: memory.jsHeapSizeLimit,
            usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
          },
          timestamp: Date.now()
        });
      }
    }, 30000);
    
    // Monitor network quality
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      connection.addEventListener('change', () => {
        this.sendMetric({
          name: 'NetworkQuality',
          value: connection.downlink,
          metadata: {
            effectiveType: connection.effectiveType,
            rtt: connection.rtt,
            saveData: connection.saveData
          },
          timestamp: Date.now()
        });
      });
    }
  }
  
  private getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 }
    };
    
    const threshold = thresholds[metric];
    if (!threshold) return 'good';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }
  
  private sendMetric(metric: any) {
    // Send to analytics service
    this.sendToAnalytics(metric);
    
    // Send to APM service
    this.sendToAPM(metric);
    
    // Update local metrics
    this.metricsSubject.next(metric);
  }
  
  private sendToAnalytics(data: any) {
    // Google Analytics 4 integration
    if (typeof gtag !== 'undefined') {
      gtag('event', data.name, {
        custom_parameter_1: data.value,
        custom_parameter_2: data.rating
      });
    }
    
    // Custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(console.error);
  }
  
  private sendToAPM(data: any) {
    // New Relic integration
    if (typeof newrelic !== 'undefined') {
      newrelic.addPageAction(data.name, data);
    }
    
    // Datadog integration
    if (typeof DD_RUM !== 'undefined') {
      DD_RUM.addAction(data.name, data);
    }
    
    // Custom APM endpoint
    fetch('/api/apm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(console.error);
  }
  
  trackPageView(data: any) {
    this.sendMetric({
      name: 'PageView',
      ...data
    });
  }
  
  trackError(error: any) {
    const errorKey = `${error.message}-${error.filename}-${error.lineno}`;
    const existingError = this.errorTracker.get(errorKey);
    
    if (existingError) {
      existingError.count++;
      existingError.lastOccurrence = Date.now();
    } else {
      this.errorTracker.set(errorKey, {
        ...error,
        count: 1,
        firstOccurrence: Date.now(),
        lastOccurrence: Date.now()
      });
    }
    
    this.sendMetric({
      name: 'Error',
      ...error,
      count: this.errorTracker.get(errorKey)?.count
    });
  }
  
  trackUserInteraction(interaction: any) {
    this.sendMetric({
      name: 'UserInteraction',
      ...interaction
    });
  }
}
```

2. **Advanced HTTP Interceptor for API Monitoring:**
```typescript
// monitoring/http-monitoring.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpMonitoringInterceptor implements HttpInterceptor {
  private activeRequests = new Map<string, RequestMetric>();
  
  constructor(private apmService: AdvancedAPMService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestId = this.generateRequestId();
    const startTime = performance.now();
    
    // Track request start
    this.activeRequests.set(requestId, {
      url: req.url,
      method: req.method,
      startTime,
      headers: this.sanitizeHeaders(req.headers)
    });
    
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.trackSuccessfulRequest(requestId, event, startTime);
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          this.trackFailedRequest(requestId, error, startTime);
        }
        throw error;
      }),
      finalize(() => {
        this.activeRequests.delete(requestId);
      })
    );
  }
  
  private trackSuccessfulRequest(requestId: string, response: HttpResponse<any>, startTime: number) {
    const request = this.activeRequests.get(requestId);
    if (!request) return;
    
    const duration = performance.now() - startTime;
    
    this.apmService.sendMetric({
      name: 'HTTPRequest',
      type: 'success',
      url: request.url,
      method: request.method,
      statusCode: response.status,
      duration,
      responseSize: this.getResponseSize(response),
      timestamp: Date.now(),
      rating: this.getRating(duration)
    });
  }
  
  private trackFailedRequest(requestId: string, error: HttpErrorResponse, startTime: number) {
    const request = this.activeRequests.get(requestId);
    if (!request) return;
    
    const duration = performance.now() - startTime;
    
    this.apmService.sendMetric({
      name: 'HTTPRequest',
      type: 'error',
      url: request.url,
      method: request.method,
      statusCode: error.status,
      errorMessage: error.message,
      duration,
      timestamp: Date.now()
    });
  }
  
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private sanitizeHeaders(headers: any): any {
    const sanitized = {};
    headers.keys().forEach(key => {
      if (!this.isSensitiveHeader(key)) {
        sanitized[key] = headers.get(key);
      }
    });
    return sanitized;
  }
  
  private isSensitiveHeader(headerName: string): boolean {
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
    return sensitiveHeaders.includes(headerName.toLowerCase());
  }
  
  private getResponseSize(response: HttpResponse<any>): number {
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : 0;
  }
  
  private getRating(duration: number): 'fast' | 'average' | 'slow' {
    if (duration < 200) return 'fast';
    if (duration < 1000) return 'average';
    return 'slow';
  }
}
```

3. **Advanced Analytics Dashboard Integration:**
```typescript
// analytics/dashboard.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnalyticsDashboardService {
  private dashboardData$ = new BehaviorSubject<DashboardData>({});
  private realTimeMetrics$ = new BehaviorSubject<RealTimeMetrics>({});
  
  constructor(private apmService: AdvancedAPMService) {
    this.initializeRealTimeUpdates();
  }
  
  private initializeRealTimeUpdates() {
    // Update dashboard every 30 seconds
    interval(30000)
      .pipe(
        switchMap(() => this.fetchDashboardData())
      )
      .subscribe(data => {
        this.dashboardData$.next(data);
      });
    
    // Update real-time metrics every 5 seconds
    interval(5000)
      .pipe(
        switchMap(() => this.fetchRealTimeMetrics())
      )
      .subscribe(metrics => {
        this.realTimeMetrics$.next(metrics);
      });
  }
  
  getDashboardData(): Observable<DashboardData> {
    return this.dashboardData$.asObservable();
  }
  
  getRealTimeMetrics(): Observable<RealTimeMetrics> {
    return this.realTimeMetrics$.asObservable();
  }
  
  private async fetchDashboardData(): Promise<DashboardData> {
    try {
      const response = await fetch('/api/analytics/dashboard');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      return {};
    }
  }
  
  private async fetchRealTimeMetrics(): Promise<RealTimeMetrics> {
    try {
      const response = await fetch('/api/analytics/realtime');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch real-time metrics:', error);
      return {};
    }
  }
  
  generateReport(timeRange: string, metrics: string[]): Observable<AnalyticsReport> {
    return this.fetchReport(timeRange, metrics);
  }
  
  private fetchReport(timeRange: string, metrics: string[]): Observable<AnalyticsReport> {
    return new Observable(observer => {
      fetch('/api/analytics/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeRange, metrics })
      })
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }
}

// Types for analytics
interface DashboardData {
  pageViews?: number;
  uniqueUsers?: number;
  averageLoadTime?: number;
  errorRate?: number;
  topPages?: Array<{ url: string; views: number }>;
  performanceMetrics?: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

interface RealTimeMetrics {
  activeUsers?: number;
  currentPageViews?: number;
  realtimeErrors?: number;
  serverResponseTime?: number;
}

interface AnalyticsReport {
  summary: any;
  charts: any[];
  tables: any[];
  insights: string[];
}
```

This comprehensive integration guide now covers advanced Angular 14 patterns including micro-frontend architecture, cross-application state management, real-time collaboration features, modern development toolchain integration, advanced CI/CD pipelines, comprehensive monitoring and observability, and analytics dashboard integration with practical implementation examples.