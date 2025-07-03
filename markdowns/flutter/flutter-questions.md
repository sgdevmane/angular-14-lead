# Flutter Interview Questions

A comprehensive collection of Flutter interview questions covering fundamentals, advanced concepts, state management, performance optimization, and best practices.

## Table of Contents
1. [Flutter Fundamentals](#q1-what-is-flutter-and-what-are-its-key-features)
2. [Dart Programming](#q2-explain-dart-programming-language-features-for-flutter-development)
3. [Widgets and UI](#q3-explain-the-difference-between-stateless-and-stateful-widgets)
4. [State Management](#q4-how-do-you-implement-state-management-in-flutter)
5. [Navigation and Routing](#q5-how-do-you-implement-navigation-in-flutter-applications)
6. [Animations](#q6-how-do-you-implement-animations-in-flutter)
7. [Networking and APIs](#q7-how-do-you-handle-http-requests-and-api-integration-in-flutter)
8. [Local Storage](#q8-how-do-you-implement-local-storage-and-data-persistence-in-flutter)
9. [Testing](#q9-how-do-you-implement-testing-in-flutter-applications)
10. [Performance Optimization](#q10-how-do-you-implement-performance-optimization-in-flutter-applications)
11. [Platform Integration](#q11-how-do-you-implement-platform-specific-code-in-flutter)
12. [Custom Widgets](#q12-how-do-you-create-custom-widgets-and-reusable-components)
13. [Responsive Design](#q13-how-do-you-implement-responsive-design-in-flutter)
14. [Error Handling](#q14-how-do-you-implement-error-handling-and-exception-management)
15. [Security](#q15-how-do-you-implement-security-best-practices-in-flutter)
16. [Deployment](#q16-how-do-you-build-and-deploy-flutter-applications)
17. [Advanced Patterns](#q17-how-do-you-implement-advanced-flutter-patterns-and-architecture)
18. [Internationalization](#q18-how-do-you-implement-internationalization-and-localization)
19. [Accessibility](#q19-how-do-you-implement-accessibility-features-in-flutter)
20. [App Architecture](#q20-what-are-the-best-practices-for-flutter-app-architecture-and-design-patterns)

### Q1: What is Flutter and what are its key features?

**Answer:**
Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase using the Dart programming language.

**Key Features:**
- **Single Codebase**: Write once, run anywhere (iOS, Android, Web, Desktop)
- **Fast Development**: Hot reload for instant code changes
- **Native Performance**: Compiled to native ARM code
- **Rich UI**: Extensive widget library with Material Design and Cupertino
- **Reactive Framework**: Declarative UI programming

**Flutter Architecture:**
```dart
// Basic Flutter app structure
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        elevation: 0,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
              style: Theme.of(context).textTheme.headline6,
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

**Flutter vs Native Development:**
```dart
// Flutter advantages
class FlutterAdvantages {
  static const List<String> benefits = [
    'Single codebase for multiple platforms',
    'Fast development with hot reload',
    'Consistent UI across platforms',
    'Rich animation and gesture support',
    'Growing ecosystem and community',
    'Backed by Google',
  ];
  
  static const List<String> considerations = [
    'Larger app size compared to native',
    'Platform-specific features may require native code',
    'Learning curve for Dart language',
    'Relatively newer ecosystem',
  ];
}
```

**Flutter Widget Tree:**
```dart
// Understanding the widget tree
class WidgetTreeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Widget Tree'),
        ),
        body: Container(
          padding: EdgeInsets.all(16.0),
          child: Column(
            children: [
              Card(
                child: ListTile(
                  leading: Icon(Icons.person),
                  title: Text('User Profile'),
                  subtitle: Text('Manage your profile'),
                  trailing: Icon(Icons.arrow_forward_ios),
                ),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {},
                child: Text('Action Button'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

---

### Q2: Explain Dart programming language features for Flutter development.

**Answer:**
State management is crucial in Flutter applications for handling data that changes over time. Flutter offers various approaches to manage state, each suitable for different scenarios.

**1. setState() - Built-in State Management:**
The simplest form of state management for local widget state.

```dart
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;
  
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_counter'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

**2. Provider - Recommended by Flutter Team:**
Provider is a wrapper around InheritedWidget that makes state management easier.

```dart
// Model class
class CounterModel extends ChangeNotifier {
  int _counter = 0;
  
  int get counter => _counter;
  
  void increment() {
    _counter++;
    notifyListeners();
  }
  
  void decrement() {
    _counter--;
    notifyListeners();
  }
  
  void reset() {
    _counter = 0;
    notifyListeners();
  }
}

// Main app setup
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => CounterModel(),
      child: MaterialApp(
        home: CounterScreen(),
      ),
    );
  }
}

// Consumer widget
class CounterScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Provider Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Consumer<CounterModel>(
              builder: (context, counter, child) {
                return Text(
                  'Count: ${counter.counter}',
                  style: Theme.of(context).textTheme.headlineMedium,
                );
              },
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () => context.read<CounterModel>().decrement(),
                  child: Text('-'),
                ),
                ElevatedButton(
                  onPressed: () => context.read<CounterModel>().increment(),
                  child: Text('+'),
                ),
                ElevatedButton(
                  onPressed: () => context.read<CounterModel>().reset(),
                  child: Text('Reset'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

**3. BLoC (Business Logic Component) Pattern:**
BLoC separates business logic from UI using streams and events.

```dart
// Events
abstract class CounterEvent {}

class CounterIncrement extends CounterEvent {}
class CounterDecrement extends CounterEvent {}
class CounterReset extends CounterEvent {}

// States
abstract class CounterState {
  final int counter;
  CounterState(this.counter);
}

class CounterInitial extends CounterState {
  CounterInitial() : super(0);
}

class CounterUpdated extends CounterState {
  CounterUpdated(int counter) : super(counter);
}

// BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterInitial()) {
    on<CounterIncrement>((event, emit) {
      emit(CounterUpdated(state.counter + 1));
    });
    
    on<CounterDecrement>((event, emit) {
      emit(CounterUpdated(state.counter - 1));
    });
    
    on<CounterReset>((event, emit) {
      emit(CounterUpdated(0));
    });
  }
}

// BLoC Provider setup
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => CounterBloc(),
      child: MaterialApp(
        home: CounterBlocScreen(),
      ),
    );
  }
}

// BLoC Consumer
class CounterBlocScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('BLoC Counter')),
      body: BlocBuilder<CounterBloc, CounterState>(
        builder: (context, state) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Count: ${state.counter}',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton(
                      onPressed: () => context.read<CounterBloc>().add(CounterDecrement()),
                      child: Text('-'),
                    ),
                    ElevatedButton(
                      onPressed: () => context.read<CounterBloc>().add(CounterIncrement()),
                      child: Text('+'),
                    ),
                    ElevatedButton(
                      onPressed: () => context.read<CounterBloc>().add(CounterReset()),
                      child: Text('Reset'),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
```

**4. Functional Programming Features:**
```dart
// Higher-order functions
class FunctionalExample {
  static List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  static void demonstrateFunctionalFeatures() {
    // Map - transform each element
    var doubled = numbers.map((n) => n * 2).toList();
    print('Doubled: $doubled');
    
    // Filter - select elements that match condition
    var evenNumbers = numbers.where((n) => n % 2 == 0).toList();
    print('Even numbers: $evenNumbers');
    
    // Reduce - combine all elements into single value
    var sum = numbers.reduce((a, b) => a + b);
    print('Sum: $sum');
    
    // Fold - like reduce but with initial value
    var product = numbers.fold(1, (prev, element) => prev * element);
    print('Product: $product');
  }
}
```

**5. Hot Reload Support:**
Dart's compilation model enables Flutter's hot reload feature, allowing developers to see changes instantly without losing app state.

**6. AOT and JIT Compilation:**
- **JIT (Just-In-Time)**: Used during development for fast compilation and hot reload
- **AOT (Ahead-Of-Time)**: Used for production builds for optimal performance

**7. Memory Management:**
Dart uses automatic garbage collection, eliminating manual memory management concerns.

---

### Q3: Explain the difference between Stateless and Stateful widgets.

**Answer:**
Widgets are the building blocks of Flutter applications. There are two main types of widgets: Stateless and Stateful widgets.

**Stateless Widgets:**
Stateless widgets are immutable and their properties cannot change once created. They are rebuilt only when their parent widget changes.

**Characteristics:**
- Immutable (cannot change state)
- No internal state management
- Rebuilt only when parent changes
- More performant (less overhead)
- Suitable for static content

**Example:**
```dart
class WelcomeScreen extends StatelessWidget {
  final String userName;
  final String message;
  
  const WelcomeScreen({
    Key? key,
    required this.userName,
    required this.message,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Hello, $userName!',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            Text(
              message,
              style: TextStyle(fontSize: 16),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
```

**Stateful Widgets:**
Stateful widgets can change their state during the widget's lifetime. They maintain mutable state and can rebuild themselves when the state changes.

**Characteristics:**
- Mutable (can change state)
- Internal state management
- Can rebuild themselves when state changes
- More overhead (state management)
- Suitable for interactive content

**Example:**
```dart
class CounterScreen extends StatefulWidget {
  final String title;
  final int initialValue;
  
  const CounterScreen({
    Key? key,
    required this.title,
    this.initialValue = 0,
  }) : super(key: key);
  
  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  late int _counter;
  bool _isEven = true;
  
  @override
  void initState() {
    super.initState();
    _counter = widget.initialValue;
    _updateEvenStatus();
  }
  
  void _incrementCounter() {
    setState(() {
      _counter++;
      _updateEvenStatus();
    });
  }
  
  void _decrementCounter() {
    setState(() {
      _counter--;
      _updateEvenStatus();
    });
  }
  
  void _resetCounter() {
    setState(() {
      _counter = widget.initialValue;
      _updateEvenStatus();
    });
  }
  
  void _updateEvenStatus() {
    _isEven = _counter % 2 == 0;
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: _resetCounter,
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Counter Value:',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                color: _isEven ? Colors.green : Colors.red,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            Text(
              _isEven ? 'Even Number' : 'Odd Number',
              style: TextStyle(
                fontSize: 18,
                color: _isEven ? Colors.green : Colors.red,
              ),
            ),
            SizedBox(height: 32),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                FloatingActionButton(
                  onPressed: _decrementCounter,
                  heroTag: 'decrement',
                  child: Icon(Icons.remove),
                ),
                FloatingActionButton(
                  onPressed: _incrementCounter,
                  heroTag: 'increment',
                  child: Icon(Icons.add),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

**Key Differences:**

| Aspect | Stateless Widget | Stateful Widget |
|--------|------------------|------------------|
| **Mutability** | Immutable | Mutable |
| **State Management** | No internal state | Has internal state |
| **Rebuild Trigger** | Parent widget changes | setState() calls |
| **Performance** | Better (less overhead) | More overhead |
| **Use Cases** | Static content, UI components | Interactive elements, dynamic content |
| **Lifecycle** | build() only | initState(), build(), dispose(), etc. |
| **Memory Usage** | Lower | Higher |

**Stateful Widget Lifecycle Methods:**
```dart
class LifecycleExample extends StatefulWidget {
  @override
  _LifecycleExampleState createState() => _LifecycleExampleState();
}

class _LifecycleExampleState extends State<LifecycleExample> {
  @override
  void initState() {
    super.initState();
    // Called once when widget is inserted into widget tree
    print('initState called');
  }
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Called when dependencies change
    print('didChangeDependencies called');
  }
  
  @override
  Widget build(BuildContext context) {
    // Called every time widget needs to be rendered
    print('build called');
    return Container();
  }
  
  @override
  void didUpdateWidget(LifecycleExample oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Called when parent widget changes
    print('didUpdateWidget called');
  }
  
  @override
  void dispose() {
    // Called when widget is removed from widget tree
    print('dispose called');
    super.dispose();
  }
}
```

**When to Use:**
- **Stateless**: Static text, icons, layouts that don't change
- **Stateful**: Forms, animations, counters, any interactive UI

---

### Q4: What are the different state management approaches in Flutter?

**Answer:**
State management is crucial in Flutter applications for handling data that changes over time. Flutter offers various approaches to manage state, each suitable for different scenarios.

**1. setState() - Built-in State Management:**
The simplest form of state management for local widget state.

```dart
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;
  
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_counter'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

**2. Object-Oriented Programming:**
```dart
// Classes and inheritance
abstract class Animal {
  String name;
  Animal(this.name);
  
  void makeSound(); // Abstract method
  
  void sleep() {
    print('$name is sleeping');
  }
}

class Dog extends Animal {
  String breed;
  
  Dog(String name, this.breed) : super(name);
  
  @override
  void makeSound() {
    print('$name barks!');
  }
  
  void fetch() {
    print('$name is fetching the ball');
  }
}

// Mixins for code reuse
mixin Flyable {
  void fly() {
    print('Flying high!');
  }
}

class Bird extends Animal with Flyable {
  Bird(String name) : super(name);
  
  @override
  void makeSound() {
    print('$name chirps!');
  }
}
```

**3. Async Programming:**
```dart
// Future and async/await
class ApiService {
  static const String baseUrl = 'https://api.example.com';
  
  Future<List<User>> fetchUsers() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/users'));
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonData = json.decode(response.body);
        return jsonData.map((json) => User.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load users');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  
  Stream<String> countdownStream(int seconds) async* {
    for (int i = seconds; i >= 0; i--) {
      await Future.delayed(Duration(seconds: 1));
      yield i.toString();
    }
  }
}
```

**4. Riverpod - Modern Provider Alternative:**
Riverpod is a complete rewrite of Provider with better performance and features.

```dart
// Provider definition
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state++;
  void decrement() => state--;
  void reset() => state = 0;
}

// Consumer widget
class RiverpodCounterScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final counter = ref.watch(counterProvider);
    
    return Scaffold(
      appBar: AppBar(title: Text('Riverpod Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Count: $counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () => ref.read(counterProvider.notifier).decrement(),
                  child: Text('-'),
                ),
                ElevatedButton(
                  onPressed: () => ref.read(counterProvider.notifier).increment(),
                  child: Text('+'),
                ),
                ElevatedButton(
                  onPressed: () => ref.read(counterProvider.notifier).reset(),
                  child: Text('Reset'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

**5. GetX - All-in-One Solution:**
GetX provides state management, dependency injection, and route management.

```dart
// Controller
class CounterController extends GetxController {
  var counter = 0.obs;
  
  void increment() => counter++;
  void decrement() => counter--;
  void reset() => counter.value = 0;
}

// Screen
class GetXCounterScreen extends StatelessWidget {
  final CounterController controller = Get.put(CounterController());
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('GetX Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Obx(() => Text(
              'Count: ${controller.counter}',
              style: Theme.of(context).textTheme.headlineMedium,
            )),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: controller.decrement,
                  child: Text('-'),
                ),
                ElevatedButton(
                  onPressed: controller.increment,
                  child: Text('+'),
                ),
                ElevatedButton(
                  onPressed: controller.reset,
                  child: Text('Reset'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

**State Management Comparison:**

| Approach | Learning Curve | Performance | Boilerplate | Use Case |
|----------|---------------|-------------|-------------|----------|
| **setState** | Easy | Good | Low | Simple local state |
| **Provider** | Medium | Good | Medium | Medium complexity apps |
| **BLoC** | Hard | Excellent | High | Large, complex apps |
| **Riverpod** | Medium | Excellent | Medium | Modern apps, testing |
| **GetX** | Easy | Good | Low | Rapid development |

**When to Use Each:**

- **setState()**: Simple widgets with local state
- **Provider**: Recommended for most Flutter apps
- **BLoC**: Large enterprise applications with complex business logic
- **Riverpod**: Modern alternative to Provider with better testing
- **GetX**: Rapid prototyping and small to medium apps

**Best Practices:**
1. Start with setState() for local state
2. Use Provider/Riverpod for app-wide state
3. Consider BLoC for complex business logic
4. Keep state as close to where it's used as possible
5. Separate business logic from UI logic
```

**5. Extension Methods:**
```dart
// Extending existing classes
extension StringExtensions on String {
  bool get isValidEmail {
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(this);
  }
  
  String get capitalizeFirst {
    if (isEmpty) return this;
    return this[0].toUpperCase() + substring(1).toLowerCase();
  }
  
  String truncate(int maxLength) {
    if (length <= maxLength) return this;
    return '${substring(0, maxLength)}...';
  }
}

extension ListExtensions<T> on List<T> {
  T? get firstOrNull => isEmpty ? null : first;
  T? get lastOrNull => isEmpty ? null : last;
  
  List<T> get unique {
    return toSet().toList();
  }
}

// Usage
void useExtensions() {
  String email = 'user@example.com';
  print(email.isValidEmail); // true
  
  String name = 'john doe';
  print(name.capitalizeFirst); // John doe
  
  List<int> numbers = [1, 2, 2, 3, 3, 4];
  print(numbers.unique); // [1, 2, 3, 4]
}
```

**6. Null Safety:**
```dart
// Null safety features
class UserProfile {
  String name; // Non-nullable
  String? email; // Nullable
  late String userId; // Late initialization
  
  UserProfile(this.name, {this.email});
  
  void initializeUserId() {
    userId = generateUserId();
  }
  
  String generateUserId() {
    return 'user_${DateTime.now().millisecondsSinceEpoch}';
  }
  
  // Null-aware operators
  String getDisplayName() {
    return email?.split('@').first ?? name;
  }
  
  void updateEmail(String? newEmail) {
    email = newEmail;
    // Null assertion operator (use carefully)
    if (newEmail != null) {
      print('Email updated: ${newEmail!}');
    }
  }
}
```

---

### Q5: How do you handle navigation in Flutter applications?

**Answer:**
Navigation is essential for multi-screen Flutter applications. Flutter provides several approaches for handling navigation, from basic routing to advanced navigation patterns.

**1. Basic Navigation with Navigator:**
Flutter's Navigator widget manages a stack of Route objects and provides methods for managing the stack.

```dart
// Basic navigation example
class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home Screen')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Welcome to Home Screen',
              style: TextStyle(fontSize: 24),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Navigate to second screen
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => SecondScreen(),
                  ),
                );
              },
              child: Text('Go to Second Screen'),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: () {
                // Navigate with data
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ProfileScreen(
                      userName: 'John Doe',
                      userId: 123,
                    ),
                  ),
                );
              },
              child: Text('Go to Profile'),
            ),
          ],
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Second Screen')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'This is the Second Screen',
              style: TextStyle(fontSize: 20),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Navigate back
                Navigator.pop(context);
              },
              child: Text('Go Back'),
            ),
            ElevatedButton(
              onPressed: () {
                // Navigate back to home (pop all)
                Navigator.popUntil(context, (route) => route.isFirst);
              },
              child: Text('Back to Home'),
            ),
          ],
        ),
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  final String userName;
  final int userId;
  
  const ProfileScreen({
    Key? key,
    required this.userName,
    required this.userId,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'User: $userName',
              style: TextStyle(fontSize: 20),
            ),
            Text(
              'ID: $userId',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Back'),
            ),
          ],
        ),
      ),
    );
  }
}
```

**2. Named Routes:**
Named routes provide a cleaner way to manage navigation in larger applications.

```dart
// Define routes in MaterialApp
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Navigation Demo',
      initialRoute: '/',
      routes: {
        '/': (context) => HomeScreen(),
        '/second': (context) => SecondScreen(),
        '/profile': (context) => ProfileScreen(
          userName: 'Default User',
          userId: 0,
        ),
        '/settings': (context) => SettingsScreen(),
      },
      // Handle unknown routes
      onUnknownRoute: (settings) {
        return MaterialPageRoute(
          builder: (context) => NotFoundScreen(),
        );
      },
    );
  }
}

// Navigation using named routes
class NavigationExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Named Routes')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/second');
              },
              child: Text('Go to Second Screen'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/settings');
              },
              child: Text('Go to Settings'),
            ),
            ElevatedButton(
              onPressed: () {
                // Replace current route
                Navigator.pushReplacementNamed(context, '/profile');
              },
              child: Text('Replace with Profile'),
            ),
          ],
        ),
      ),
    );
  }
}

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Settings')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Settings Screen'),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Back'),
            ),
          ],
        ),
      ),
    );
  }
}

class NotFoundScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('404')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Page Not Found'),
            ElevatedButton(
              onPressed: () => Navigator.pushNamedAndRemoveUntil(
                context,
                '/',
                (route) => false,
              ),
              child: Text('Go Home'),
            ),
          ],
        ),
      ),
    );
  }
}
```

**3. Passing Arguments with Named Routes:**
You can pass arguments to named routes using RouteSettings.
```dart
// Passing arguments with named routes
class ArgumentPassingExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Argument Passing')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                // Pass arguments using Navigator.pushNamed
                Navigator.pushNamed(
                  context,
                  '/user-profile',
                  arguments: UserArguments(
                    userId: 123,
                    userName: 'John Doe',
                    email: 'john@example.com',
                  ),
                );
              },
              child: Text('Go to User Profile'),
            ),
            ElevatedButton(
              onPressed: () {
                // Pass simple arguments
                Navigator.pushNamed(
                  context,
                  '/product-detail',
                  arguments: {
                    'productId': 456,
                    'productName': 'Flutter Book',
                    'price': 29.99,
                  },
                );
              },
              child: Text('Go to Product Detail'),
            ),
          ],
        ),
      ),
    );
  }
}

// Define argument classes
class UserArguments {
  final int userId;
  final String userName;
  final String email;
  
  UserArguments({
    required this.userId,
    required this.userName,
    required this.email,
  });
}

// Receiving arguments in destination screen
class UserProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Extract arguments
    final UserArguments args = ModalRoute.of(context)!.settings.arguments as UserArguments;
    
    return Scaffold(
      appBar: AppBar(title: Text('User Profile')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'User ID: ${args.userId}',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 8),
            Text(
              'Name: ${args.userName}',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 8),
            Text(
              'Email: ${args.email}',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Back'),
            ),
          ],
        ),
      ),
    );
  }
}

class ProductDetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Extract map arguments
    final Map<String, dynamic> args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    
    return Scaffold(
      appBar: AppBar(title: Text('Product Detail')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Product ID: ${args['productId']}',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 8),
            Text(
              'Name: ${args['productName']}',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 8),
            Text(
              'Price: \$${args['price']}',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Back'),
            ),
          ],
        ),
      ),
    );
  }
}

// Update MaterialApp routes
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Navigation with Arguments',
      initialRoute: '/',
      routes: {
        '/': (context) => ArgumentPassingExample(),
        '/user-profile': (context) => UserProfileScreen(),
        '/product-detail': (context) => ProductDetailScreen(),
      },
    );
  }
}
```

**4. Bottom Navigation:**
Bottom navigation provides easy access to top-level views in an app.

```dart
class BottomNavigationExample extends StatefulWidget {
  @override
  _BottomNavigationExampleState createState() => _BottomNavigationExampleState();
}

class _BottomNavigationExampleState extends State<BottomNavigationExample> {
  int _currentIndex = 0;
  
  final List<Widget> _screens = [
    HomeTab(),
    SearchTab(),
    FavoritesTab(),
    ProfileTab(),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.favorite),
            label: 'Favorites',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

// Tab screens
class HomeTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Home Screen', style: TextStyle(fontSize: 24)),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => DetailScreen('Home Detail')),
                );
              },
              child: Text('Go to Detail'),
            ),
          ],
        ),
      ),
    );
  }
}

class SearchTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Search')),
      body: Center(
        child: Text('Search Screen', style: TextStyle(fontSize: 24)),
      ),
    );
  }
}

class FavoritesTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Favorites')),
      body: Center(
        child: Text('Favorites Screen', style: TextStyle(fontSize: 24)),
      ),
    );
  }
}

class ProfileTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: Center(
        child: Text('Profile Screen', style: TextStyle(fontSize: 24)),
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  final String title;
  
  const DetailScreen(this.title, {Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(
        child: Text('Detail Screen', style: TextStyle(fontSize: 24)),
      ),
    );
  }
}
```

**5. Drawer Navigation:**
Drawer navigation provides a slide-out menu for accessing different sections of your app.

```dart
class DrawerNavigationExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Drawer Navigation'),
        backgroundColor: Colors.blue,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.blue, Colors.blueAccent],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 30,
                    backgroundImage: NetworkImage('https://via.placeholder.com/150'),
                  ),
                  SizedBox(height: 10),
                  Text(
                    'John Doe',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'john.doe@example.com',
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text('Home'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushReplacementNamed(context, '/home');
              },
            ),
            ListTile(
              leading: Icon(Icons.person),
              title: Text('Profile'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/profile');
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('Settings'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/settings');
              },
            ),
            Divider(),
            ListTile(
              leading: Icon(Icons.info),
              title: Text('About'),
              onTap: () {
                Navigator.pop(context);
                _showAboutDialog(context);
              },
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text('Logout'),
              onTap: () {
                Navigator.pop(context);
                _showLogoutDialog(context);
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Main Content Area',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Text(
              'Swipe from left or tap the menu icon to open drawer',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, color: Colors.grey[600]),
            ),
          ],
        ),
      ),
    );
  }
  
  void _showAboutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('About'),
        content: Text('This is a Flutter navigation example app.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('OK'),
          ),
        ],
      ),
    );
  }
  
  void _showLogoutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Logout'),
        content: Text('Are you sure you want to logout?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              // Perform logout logic here
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Logged out successfully')),
              );
            },
            child: Text('Logout'),
          ),
        ],
      ),
    );
  }
}
```

**6. Tab Navigation:**
Tab navigation allows users to switch between different views using tabs.

```dart
class TabNavigationExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Tab Navigation'),
          backgroundColor: Colors.teal,
          bottom: TabBar(
            tabs: [
              Tab(icon: Icon(Icons.home), text: 'Home'),
              Tab(icon: Icon(Icons.search), text: 'Search'),
              Tab(icon: Icon(Icons.favorite), text: 'Favorites'),
              Tab(icon: Icon(Icons.person), text: 'Profile'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            HomeTabView(),
            SearchTabView(),
            FavoritesTabView(),
            ProfileTabView(),
          ],
        ),
      ),
    );
  }
}

class HomeTabView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.home, size: 100, color: Colors.teal),
          SizedBox(height: 20),
          Text('Home Tab', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          SizedBox(height: 10),
          Text('Welcome to the home screen'),
        ],
      ),
    );
  }
}

class SearchTabView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Column(
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'Search...',
              prefixIcon: Icon(Icons.search),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
          SizedBox(height: 20),
          Expanded(
            child: ListView.builder(
              itemCount: 10,
              itemBuilder: (context, index) {
                return ListTile(
                  leading: CircleAvatar(
                    child: Text('${index + 1}'),
                  ),
                  title: Text('Search Result ${index + 1}'),
                  subtitle: Text('Description for result ${index + 1}'),
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Tapped on result ${index + 1}')),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class FavoritesTabView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.favorite, size: 100, color: Colors.red),
          SizedBox(height: 20),
          Text('Favorites Tab', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          SizedBox(height: 10),
          Text('Your favorite items will appear here'),
        ],
      ),
    );
  }
}

class ProfileTabView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Column(
        children: [
          SizedBox(height: 20),
          CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage('https://via.placeholder.com/150'),
          ),
          SizedBox(height: 20),
          Text('John Doe', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          Text('john.doe@example.com', style: TextStyle(color: Colors.grey[600])),
          SizedBox(height: 30),
          ListTile(
            leading: Icon(Icons.edit),
            title: Text('Edit Profile'),
            trailing: Icon(Icons.arrow_forward_ios),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => EditProfileScreen()),
              );
            },
          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Settings'),
            trailing: Icon(Icons.arrow_forward_ios),
            onTap: () {},
          ),
          ListTile(
            leading: Icon(Icons.help),
            title: Text('Help & Support'),
            trailing: Icon(Icons.arrow_forward_ios),
            onTap: () {},
          ),
        ],
      ),
    );
  }
}

class EditProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Profile'),
        backgroundColor: Colors.teal,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Name',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Profile updated successfully')),
                );
              },
              child: Text('Save Changes'),
            ),
          ],
        ),
      ),
    );
  }
}
```

**7. Nested Navigation and Best Practices:**

```dart
// Navigation best practices and patterns
class NavigationBestPractices {
  // 1. Use named routes for better organization
  static Map<String, WidgetBuilder> routes = {
    '/': (context) => HomeScreen(),
    '/profile': (context) => ProfileScreen(),
    '/settings': (context) => SettingsScreen(),
    '/login': (context) => LoginScreen(),
  };
  
  // 2. Navigation with result handling
  static Future<void> navigateForResult(BuildContext context) async {
    final result = await Navigator.push<String>(
      context,
      MaterialPageRoute(
        builder: (context) => SelectionScreen(),
      ),
    );
    
    if (result != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Selected: $result')),
      );
    }
  }
  
  // 3. Conditional navigation
  static void conditionalNavigation(BuildContext context, bool isLoggedIn) {
    if (isLoggedIn) {
      Navigator.pushReplacementNamed(context, '/home');
    } else {
      Navigator.pushReplacementNamed(context, '/login');
    }
  }
  
  // 4. Clear navigation stack
  static void navigateAndClearStack(BuildContext context, String routeName) {
    Navigator.pushNamedAndRemoveUntil(
      context,
      routeName,
      (route) => false,
    );
  }
}

class SelectionScreen extends StatelessWidget {
  final List<String> options = ['Option 1', 'Option 2', 'Option 3'];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Select Option')),
      body: ListView.builder(
        itemCount: options.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(options[index]),
            onTap: () {
              Navigator.pop(context, options[index]);
            },
          );
        },
      ),
    );
  }
}
```

**Navigation Comparison and Use Cases:**

| Navigation Type | Use Case | Pros | Cons |
|----------------|----------|------|------|
| **Basic Navigation** | Simple app flows | Easy to implement | Can become complex |
| **Named Routes** | Medium to large apps | Organized, maintainable | Requires setup |
| **Bottom Navigation** | Main app sections | Familiar UX pattern | Limited to 5 tabs |
| **Drawer Navigation** | Many menu options | Space-efficient | Hidden by default |
| **Tab Navigation** | Related content views | Easy switching | Limited screen space |

**Best Practices:**
- Use named routes for better code organization
- Handle navigation results when needed
- Implement proper back button behavior
- Consider user experience and app flow
- Use appropriate navigation patterns for your app structure
- Test navigation on different screen sizes
- Implement deep linking for better user experience

---

### Q6: How do you implement animations in Flutter?

**Answer:**
Flutter provides a rich animation framework that allows you to create smooth, performant animations ranging from simple transitions to complex custom animations.

**1. Basic Animations with AnimationController:**
```dart
import 'package:flutter/material.dart';

class BasicAnimationExample extends StatefulWidget {
  @override
  _BasicAnimationExampleState createState() => _BasicAnimationExampleState();
}

class _BasicAnimationExampleState extends State<BasicAnimationExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    
    _animation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Basic Animation')),
      body: Center(
        child: AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return Transform.scale(
              scale: _animation.value,
              child: Container(
                width: 200,
                height: 200,
                decoration: BoxDecoration(
                  color: Colors.blue,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Center(
                  child: Text(
                    'Animated',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          if (_controller.isCompleted) {
            _controller.reverse();
          } else {
            _controller.forward();
          }
        },
        child: Icon(Icons.play_arrow),
      ),
    );
  }
}
```

**2. Implicit Animations:**
Flutter provides built-in animated widgets for common use cases.

```dart
class ImplicitAnimationExample extends StatefulWidget {
  @override
  _ImplicitAnimationExampleState createState() => _ImplicitAnimationExampleState();
}

class _ImplicitAnimationExampleState extends State<ImplicitAnimationExample> {
  bool _isExpanded = false;
  Color _color = Colors.blue;
  double _borderRadius = 10.0;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Implicit Animations')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // AnimatedContainer
            AnimatedContainer(
              duration: Duration(milliseconds: 500),
              curve: Curves.easeInOut,
              width: _isExpanded ? 300 : 150,
              height: _isExpanded ? 300 : 150,
              decoration: BoxDecoration(
                color: _color,
                borderRadius: BorderRadius.circular(_borderRadius),
              ),
              child: Center(
                child: Text(
                  'Tap me!',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            SizedBox(height: 30),
            
            // AnimatedOpacity
            AnimatedOpacity(
              duration: Duration(milliseconds: 500),
              opacity: _isExpanded ? 1.0 : 0.3,
              child: Text(
                'Fading Text',
                style: TextStyle(fontSize: 20),
              ),
            ),
            
            SizedBox(height: 30),
            
            // Control buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _isExpanded = !_isExpanded;
                    });
                  },
                  child: Text('Toggle Size'),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _color = _color == Colors.blue ? Colors.red : Colors.blue;
                    });
                  },
                  child: Text('Change Color'),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _borderRadius = _borderRadius == 10.0 ? 50.0 : 10.0;
                    });
                  },
                  child: Text('Toggle Radius'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

```

**3. Hero Animations:**
Hero animations create smooth transitions between screens by animating shared elements.

```dart
class HeroAnimationExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Hero Animation')),
      body: GridView.builder(
        padding: EdgeInsets.all(16),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
        ),
        itemCount: 6,
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => HeroDetailScreen(index: index),
                ),
              );
            },
            child: Hero(
              tag: 'hero-$index',
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.primaries[index % Colors.primaries.length],
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: Text(
                    'Item $index',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class HeroDetailScreen extends StatelessWidget {
  final int index;
  
  const HeroDetailScreen({Key? key, required this.index}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Detail $index'),
        backgroundColor: Colors.primaries[index % Colors.primaries.length],
      ),
      body: Column(
        children: [
          Hero(
            tag: 'hero-$index',
            child: Container(
              width: double.infinity,
              height: 300,
              decoration: BoxDecoration(
                color: Colors.primaries[index % Colors.primaries.length],
              ),
              child: Center(
                child: Text(
                  'Item $index',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Details for Item $index',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 16),
                  Text(
                    'This is a detailed view of item $index. The hero animation smoothly transitions the shared element between screens.',
                    style: TextStyle(fontSize: 16),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

**4. Custom Animations with Tween and AnimatedBuilder:**
```dart
class CustomAnimationExample extends StatefulWidget {
  @override
  _CustomAnimationExampleState createState() => _CustomAnimationExampleState();
}

class _CustomAnimationExampleState extends State<CustomAnimationExample>
    with TickerProviderStateMixin {
  late AnimationController _rotationController;
  late AnimationController _scaleController;
  late Animation<double> _rotationAnimation;
  late Animation<double> _scaleAnimation;
  
  @override
  void initState() {
    super.initState();
    
    _rotationController = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    
    _scaleController = AnimationController(
      duration: Duration(milliseconds: 800),
      vsync: this,
    );
    
    _rotationAnimation = Tween<double>(
      begin: 0,
      end: 2 * 3.14159, // 360 degrees in radians
    ).animate(CurvedAnimation(
      parent: _rotationController,
      curve: Curves.linear,
    ));
    
    _scaleAnimation = Tween<double>(
      begin: 0.5,
      end: 1.5,
    ).animate(CurvedAnimation(
      parent: _scaleController,
      curve: Curves.elasticOut,
    ));
    
    // Start continuous rotation
    _rotationController.repeat();
  }
  
  @override
  void dispose() {
    _rotationController.dispose();
    _scaleController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Custom Animations')),
      body: Center(
        child: AnimatedBuilder(
          animation: Listenable.merge([_rotationAnimation, _scaleAnimation]),
          builder: (context, child) {
            return Transform.scale(
              scale: _scaleAnimation.value,
              child: Transform.rotate(
                angle: _rotationAnimation.value,
                child: Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.purple, Colors.pink],
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(
                    Icons.star,
                    color: Colors.white,
                    size: 50,
                  ),
                ),
              ),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          if (_scaleController.isCompleted) {
            _scaleController.reverse();
          } else {
            _scaleController.forward();
          }
        },
        child: Icon(Icons.transform),
      ),
    );
  }
}
```

**Animation Best Practices:**
- Use `SingleTickerProviderStateMixin` for single animations
- Use `TickerProviderStateMixin` for multiple animations
- Always dispose animation controllers to prevent memory leaks
- Use appropriate curves for natural-feeling animations
- Consider performance impact of complex animations
- Test animations on different devices and screen sizes

---

### Q7: How do you handle networking and HTTP requests in Flutter?

**Answer:**
Flutter provides several ways to handle networking and HTTP requests, from simple HTTP calls to complex API integrations with proper error handling and state management.

**1. Basic HTTP Requests with http package:**
```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

// Model class
class User {
  final int id;
  final String name;
  final String email;
  final String phone;
  
  User({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
  });
  
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      phone: json['phone'],
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
    };
  }
}

// Basic HTTP service
class HttpService {
  static const String baseUrl = 'https://jsonplaceholder.typicode.com';
  
  // GET request
  static Future<List<User>> getUsers() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/users'),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      
      if (response.statusCode == 200) {
        List<dynamic> jsonList = json.decode(response.body);
        return jsonList.map((json) => User.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load users: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  
  // POST request
  static Future<User> createUser(User user) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/users'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode(user.toJson()),
      );
      
      if (response.statusCode == 201) {
        return User.fromJson(json.decode(response.body));
      } else {
        throw Exception('Failed to create user: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  
  // PUT request
  static Future<User> updateUser(User user) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/users/${user.id}'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode(user.toJson()),
      );
      
      if (response.statusCode == 200) {
        return User.fromJson(json.decode(response.body));
      } else {
        throw Exception('Failed to update user: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  
  // DELETE request
  static Future<bool> deleteUser(int userId) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/users/$userId'),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      
      return response.statusCode == 200;
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}
```

**2. Advanced HTTP Client with Dio:**
```dart
import 'package:dio/dio.dart';

class ApiService {
  late Dio _dio;
  static const String baseUrl = 'https://api.example.com';
  
  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: 5000,
      receiveTimeout: 3000,
      headers: {
        'Content-Type': 'application/json',
      },
    ));
    
    // Add interceptors
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // Add authentication token
          options.headers['Authorization'] = 'Bearer ${getAuthToken()}';
          print('Request: ${options.method} ${options.path}');
          handler.next(options);
        },
        onResponse: (response, handler) {
          print('Response: ${response.statusCode} ${response.data}');
          handler.next(response);
        },
        onError: (error, handler) {
          print('Error: ${error.message}');
          handler.next(error);
        },
      ),
    );
    
    // Add logging interceptor
    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
    ));
  }
  
  String getAuthToken() {
    // Get token from secure storage
    return 'your_auth_token_here';
  }
  
  // Generic GET request
  Future<T> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dio.get(
        path,
        queryParameters: queryParameters,
      );
      
      if (fromJson != null) {
        return fromJson(response.data);
      }
      return response.data;
    } on DioError catch (e) {
      throw _handleDioError(e);
    }
  }
  
  // Generic POST request
  Future<T> post<T>(
    String path, {
    dynamic data,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dio.post(path, data: data);
      
      if (fromJson != null) {
        return fromJson(response.data);
      }
      return response.data;
    } on DioError catch (e) {
      throw _handleDioError(e);
    }
  }
  
  // File upload
  Future<String> uploadFile(
    String path,
    String filePath,
    String fileName,
  ) async {
    try {
      FormData formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(filePath, filename: fileName),
      });
      
      final response = await _dio.post(path, data: formData);
      return response.data['url'];
    } on DioError catch (e) {
      throw _handleDioError(e);
    }
  }
  
  // File download with progress
  Future<void> downloadFile(
    String url,
    String savePath,
    Function(int, int)? onProgress,
  ) async {
    try {
      await _dio.download(
        url,
        savePath,
        onReceiveProgress: onProgress,
      );
    } on DioError catch (e) {
      throw _handleDioError(e);
    }
  }
  
  Exception _handleDioError(DioError error) {
    switch (error.type) {
      case DioErrorType.connectTimeout:
        return Exception('Connection timeout');
      case DioErrorType.sendTimeout:
        return Exception('Send timeout');
      case DioErrorType.receiveTimeout:
        return Exception('Receive timeout');
      case DioErrorType.response:
        return Exception('Server error: ${error.response?.statusCode}');
      case DioErrorType.cancel:
        return Exception('Request cancelled');
      default:
        return Exception('Network error: ${error.message}');
    }
  }
}
```

**3. Repository Pattern with Error Handling:**
```dart
// Result wrapper for better error handling
class Result<T> {
  final T? data;
  final String? error;
  final bool isSuccess;
  
  Result.success(this.data) : error = null, isSuccess = true;
  Result.error(this.error) : data = null, isSuccess = false;
}

// Repository interface
abstract class UserRepository {
  Future<Result<List<User>>> getUsers();
  Future<Result<User>> getUserById(int id);
  Future<Result<User>> createUser(User user);
  Future<Result<User>> updateUser(User user);
  Future<Result<bool>> deleteUser(int id);
}

// Repository implementation
class UserRepositoryImpl implements UserRepository {
  final ApiService _apiService;
  
  UserRepositoryImpl(this._apiService);
  
  @override
  Future<Result<List<User>>> getUsers() async {
    try {
      final users = await _apiService.get<List<User>>(
        '/users',
        fromJson: (data) => (data as List)
            .map((json) => User.fromJson(json))
            .toList(),
      );
      return Result.success(users);
    } catch (e) {
      return Result.error(e.toString());
    }
  }
  
  @override
  Future<Result<User>> getUserById(int id) async {
    try {
      final user = await _apiService.get<User>(
        '/users/$id',
        fromJson: (data) => User.fromJson(data),
      );
      return Result.success(user);
    } catch (e) {
      return Result.error(e.toString());
    }
  }
  
  @override
  Future<Result<User>> createUser(User user) async {
    try {
      final createdUser = await _apiService.post<User>(
        '/users',
        data: user.toJson(),
        fromJson: (data) => User.fromJson(data),
      );
      return Result.success(createdUser);
    } catch (e) {
      return Result.error(e.toString());
    }
  }
  
  @override
  Future<Result<User>> updateUser(User user) async {
    try {
      final updatedUser = await _apiService.post<User>(
        '/users/${user.id}',
        data: user.toJson(),
        fromJson: (data) => User.fromJson(data),
      );
      return Result.success(updatedUser);
    } catch (e) {
      return Result.error(e.toString());
    }
  }
  
  @override
  Future<Result<bool>> deleteUser(int id) async {
    try {
      await _apiService.post('/users/$id/delete');
      return Result.success(true);
    } catch (e) {
      return Result.error(e.toString());
    }
  }
}
```

**4. State Management with Networking (using Provider):**
```dart
class UserProvider extends ChangeNotifier {
  final UserRepository _repository;
  
  UserProvider(this._repository);
  
  List<User> _users = [];
  bool _isLoading = false;
  String? _error;
  
  List<User> get users => _users;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  Future<void> loadUsers() async {
    _setLoading(true);
    _setError(null);
    
    final result = await _repository.getUsers();
    
    if (result.isSuccess) {
      _users = result.data!;
    } else {
      _setError(result.error!);
    }
    
    _setLoading(false);
  }
  
  Future<void> createUser(User user) async {
    _setLoading(true);
    _setError(null);
    
    final result = await _repository.createUser(user);
    
    if (result.isSuccess) {
      _users.add(result.data!);
      notifyListeners();
    } else {
      _setError(result.error!);
    }
    
    _setLoading(false);
  }
  
  Future<void> updateUser(User user) async {
    _setLoading(true);
    _setError(null);
    
    final result = await _repository.updateUser(user);
    
    if (result.isSuccess) {
      final index = _users.indexWhere((u) => u.id == user.id);
      if (index != -1) {
        _users[index] = result.data!;
        notifyListeners();
      }
    } else {
      _setError(result.error!);
    }
    
    _setLoading(false);
  }
  
  Future<void> deleteUser(int id) async {
    _setLoading(true);
    _setError(null);
    
    final result = await _repository.deleteUser(id);
    
    if (result.isSuccess) {
      _users.removeWhere((user) => user.id == id);
      notifyListeners();
    } else {
      _setError(result.error!);
    }
    
    _setLoading(false);
  }
  
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void _setError(String? error) {
    _error = error;
    notifyListeners();
  }
}
```

**5. UI Implementation with Networking:**
```dart
class UserListScreen extends StatefulWidget {
  @override
  _UserListScreenState createState() => _UserListScreenState();
}

class _UserListScreenState extends State<UserListScreen> {
  @override
  void initState() {
    super.initState();
    // Load users when screen initializes
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<UserProvider>().loadUsers();
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Users'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: () => context.read<UserProvider>().loadUsers(),
          ),
        ],
      ),
      body: Consumer<UserProvider>(builder: (context, provider, child) {
        if (provider.isLoading && provider.users.isEmpty) {
          return Center(child: CircularProgressIndicator());
        }
        
        if (provider.error != null && provider.users.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.error_outline, size: 64, color: Colors.red),
                SizedBox(height: 16),
                Text(
                  'Error: ${provider.error}',
                  style: TextStyle(color: Colors.red),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () => provider.loadUsers(),
                  child: Text('Retry'),
                ),
              ],
            ),
          );
        }
        
        return RefreshIndicator(
          onRefresh: () => provider.loadUsers(),
          child: ListView.builder(
            itemCount: provider.users.length,
            itemBuilder: (context, index) {
              final user = provider.users[index];
              return Card(
                margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: ListTile(
                  leading: CircleAvatar(
                    child: Text(user.name[0].toUpperCase()),
                  ),
                  title: Text(user.name),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(user.email),
                      Text(user.phone),
                    ],
                  ),
                  trailing: PopupMenuButton(
                    itemBuilder: (context) => [
                      PopupMenuItem(
                        value: 'edit',
                        child: Text('Edit'),
                      ),
                      PopupMenuItem(
                        value: 'delete',
                        child: Text('Delete'),
                      ),
                    ],
                    onSelected: (value) {
                      if (value == 'edit') {
                        _showEditDialog(context, user);
                      } else if (value == 'delete') {
                        _showDeleteDialog(context, user);
                      }
                    },
                  ),
                ),
              );
            },
          ),
        );
      }),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showCreateDialog(context),
        child: Icon(Icons.add),
      ),
    );
  }
  
  void _showCreateDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => UserFormDialog(),
    );
  }
  
  void _showEditDialog(BuildContext context, User user) {
    showDialog(
      context: context,
      builder: (context) => UserFormDialog(user: user),
    );
  }
  
  void _showDeleteDialog(BuildContext context, User user) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Delete User'),
        content: Text('Are you sure you want to delete ${user.name}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              context.read<UserProvider>().deleteUser(user.id);
              Navigator.pop(context);
            },
            child: Text('Delete'),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
          ),
        ],
      ),
    );
  }
}

class UserFormDialog extends StatefulWidget {
  final User? user;
  
  const UserFormDialog({Key? key, this.user}) : super(key: key);
  
  @override
  _UserFormDialogState createState() => _UserFormDialogState();
}

class _UserFormDialogState extends State<UserFormDialog> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  
  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.user?.name ?? '');
    _emailController = TextEditingController(text: widget.user?.email ?? '');
    _phoneController = TextEditingController(text: widget.user?.phone ?? '');
  }
  
  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(widget.user == null ? 'Create User' : 'Edit User'),
      content: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Name'),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter a name';
                }
                return null;
              },
            ),
            TextFormField(
              controller: _emailController,
              decoration: InputDecoration(labelText: 'Email'),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter an email';
                }
                if (!value.contains('@')) {
                  return 'Please enter a valid email';
                }
                return null;
              },
            ),
            TextFormField(
              controller: _phoneController,
              decoration: InputDecoration(labelText: 'Phone'),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter a phone number';
                }
                return null;
              },
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: _saveUser,
          child: Text(widget.user == null ? 'Create' : 'Update'),
        ),
      ],
    );
  }
  
  void _saveUser() {
    if (_formKey.currentState!.validate()) {
      final user = User(
        id: widget.user?.id ?? 0,
        name: _nameController.text,
        email: _emailController.text,
        phone: _phoneController.text,
      );
      
      if (widget.user == null) {
        context.read<UserProvider>().createUser(user);
      } else {
        context.read<UserProvider>().updateUser(user);
      }
      
      Navigator.pop(context);
    }
  }
}
```

**Networking Best Practices:**

| Practice | Description | Implementation |
|----------|-------------|----------------|
| **Error Handling** | Proper exception handling and user feedback | Try-catch blocks, Result wrapper |
| **Loading States** | Show loading indicators during requests | Provider state management |
| **Retry Mechanism** | Allow users to retry failed requests | Retry buttons, pull-to-refresh |
| **Caching** | Cache responses to improve performance | SharedPreferences, Hive |
| **Timeout Configuration** | Set appropriate timeouts | Dio configuration |
| **Authentication** | Handle tokens and secure requests | Interceptors, secure storage |
| **Request Cancellation** | Cancel requests when not needed | CancelToken with Dio |
| **Offline Support** | Handle offline scenarios | Connectivity checks |

**Key Points:**
- Always handle network errors gracefully
- Use proper loading states and error messages
- Implement retry mechanisms for failed requests
- Consider caching strategies for better performance
- Use interceptors for common functionality like authentication
- Test network code with different scenarios (slow network, no network)
- Follow repository pattern for better code organization
- Use proper state management for UI updates
  
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void _setError(String? error) {
    _error = error;
    notifyListeners();
  }
}
```

**5. UI Implementation with Networking:**
```dart
class UserListScreen extends StatefulWidget {
  @override
  _UserListScreenState createState() => _UserListScreenState();
}

class _UserListScreenState extends State<UserListScreen> {
  @override
  void initState() {
    super.initState();
    // Load users when screen initializes
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<UserProvider>().loadUsers();
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Users'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: () {
              context.read<UserProvider>().loadUsers();
            },
          ),
        ],
      ),
      body: Consumer<UserProvider>(
        builder: (context, userProvider, child) {
          if (userProvider.isLoading && userProvider.users.isEmpty) {
            return Center(child: CircularProgressIndicator());
          }
          
          if (userProvider.error != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.error, size: 64, color: Colors.red),
                  SizedBox(height: 16),
                  Text(
                    'Error: ${userProvider.error}',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.red),
                  ),
                  SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      userProvider.loadUsers();
                    },
                    child: Text('Retry'),
                  ),
                ],
              ),
            );
          }
          
          return RefreshIndicator(
            onRefresh: () => userProvider.loadUsers(),
            child: ListView.builder(
              itemCount: userProvider.users.length,
              itemBuilder: (context, index) {
                final user = userProvider.users[index];
                return ListTile(
                  leading: CircleAvatar(
                    child: Text(user.name[0]),
                  ),
                  title: Text(user.name),
                  subtitle: Text(user.email),
                  trailing: PopupMenuButton(
                    onSelected: (value) {
                      if (value == 'delete') {
                        _showDeleteDialog(context, user);
                      }
                    },
                    itemBuilder: (context) => [
                      PopupMenuItem(
                        value: 'delete',
                        child: Text('Delete'),
                      ),
                    ],
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => UserDetailScreen(user: user),
                      ),
                    );
                  },
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => CreateUserScreen(),
            ),
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
  
  void _showDeleteDialog(BuildContext context, User user) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Delete User'),
        content: Text('Are you sure you want to delete ${user.name}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              context.read<UserProvider>().deleteUser(user.id);
            },
            child: Text('Delete'),
          ),
        ],
      ),
    );
  }
}
```

### Q8: How do you implement local storage and data persistence in Flutter?

**Answer:**
Flutter provides multiple options for local storage and data persistence, ranging from simple key-value storage to complex database solutions.

**1. SharedPreferences for Simple Key-Value Storage:**
```dart
import 'package:shared_preferences/shared_preferences.dart';

// Service class for SharedPreferences
class PreferencesService {
  static SharedPreferences? _preferences;
  
  // Initialize SharedPreferences
  static Future<void> init() async {
    _preferences = await SharedPreferences.getInstance();
  }
  
  // String operations
  static Future<bool> setString(String key, String value) async {
    return await _preferences?.setString(key, value) ?? false;
  }
  
  static String? getString(String key, {String? defaultValue}) {
    return _preferences?.getString(key) ?? defaultValue;
  }
  
  // Integer operations
  static Future<bool> setInt(String key, int value) async {
    return await _preferences?.setInt(key, value) ?? false;
  }
  
  static int? getInt(String key, {int? defaultValue}) {
    return _preferences?.getInt(key) ?? defaultValue;
  }
  
  // Boolean operations
  static Future<bool> setBool(String key, bool value) async {
    return await _preferences?.setBool(key, value) ?? false;
  }
  
  static bool? getBool(String key, {bool? defaultValue}) {
    return _preferences?.getBool(key) ?? defaultValue;
  }
  
  // Double operations
  static Future<bool> setDouble(String key, double value) async {
    return await _preferences?.setDouble(key, value) ?? false;
  }
  
  static double? getDouble(String key, {double? defaultValue}) {
    return _preferences?.getDouble(key) ?? defaultValue;
  }
  
  // List operations
  static Future<bool> setStringList(String key, List<String> value) async {
    return await _preferences?.setStringList(key, value) ?? false;
  }
  
  static List<String>? getStringList(String key) {
    return _preferences?.getStringList(key);
  }
  
  // Remove and clear operations
  static Future<bool> remove(String key) async {
    return await _preferences?.remove(key) ?? false;
  }
  
  static Future<bool> clear() async {
    return await _preferences?.clear() ?? false;
  }
  
  // Check if key exists
  static bool containsKey(String key) {
    return _preferences?.containsKey(key) ?? false;
  }
  
  // Get all keys
  static Set<String> getKeys() {
    return _preferences?.getKeys() ?? {};
  }
}

// Usage example
class UserPreferences {
  static const String _keyUsername = 'username';
  static const String _keyThemeMode = 'theme_mode';
  static const String _keyLanguage = 'language';
  static const String _keyIsFirstLaunch = 'is_first_launch';
  static const String _keyUserSettings = 'user_settings';
  
  // Save user data
  static Future<void> saveUsername(String username) async {
    await PreferencesService.setString(_keyUsername, username);
  }
  
  static String? getUsername() {
    return PreferencesService.getString(_keyUsername);
  }
  
  // Theme settings
  static Future<void> saveThemeMode(ThemeMode mode) async {
    await PreferencesService.setString(_keyThemeMode, mode.toString());
  }
  
  static ThemeMode getThemeMode() {
    final modeString = PreferencesService.getString(_keyThemeMode);
    switch (modeString) {
      case 'ThemeMode.dark':
        return ThemeMode.dark;
      case 'ThemeMode.light':
        return ThemeMode.light;
      default:
        return ThemeMode.system;
    }
  }
  
  // First launch check
  static Future<void> setFirstLaunchComplete() async {
    await PreferencesService.setBool(_keyIsFirstLaunch, false);
  }
  
  static bool isFirstLaunch() {
    return PreferencesService.getBool(_keyIsFirstLaunch, defaultValue: true) ?? true;
  }
  
  // Complex object storage (JSON)
  static Future<void> saveUserSettings(Map<String, dynamic> settings) async {
    final jsonString = json.encode(settings);
    await PreferencesService.setString(_keyUserSettings, jsonString);
  }
  
  static Map<String, dynamic>? getUserSettings() {
    final jsonString = PreferencesService.getString(_keyUserSettings);
    if (jsonString != null) {
      return json.decode(jsonString) as Map<String, dynamic>;
    }
    return null;
  }
}
```

**2. SQLite Database with sqflite:**
```dart
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

// Database helper class
class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  factory DatabaseHelper() => _instance;
  DatabaseHelper._internal();
  
  static Database? _database;
  
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'app_database.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: _createDatabase,
      onUpgrade: _upgradeDatabase,
    );
  }
  
  Future<void> _createDatabase(Database db, int version) async {
    // Create users table
    await db.execute('''
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    ''');
    
    // Create notes table
    await db.execute('''
      CREATE TABLE notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    ''');
    
    // Create index for better performance
    await db.execute('CREATE INDEX idx_notes_user_id ON notes(user_id)');
  }
  
  Future<void> _upgradeDatabase(Database db, int oldVersion, int newVersion) async {
    if (oldVersion < 2) {
      // Add new column in version 2
      await db.execute('ALTER TABLE users ADD COLUMN avatar_url TEXT');
    }
  }
  
  // User CRUD operations
  Future<int> insertUser(User user) async {
    final db = await database;
    return await db.insert('users', user.toMap());
  }
  
  Future<List<User>> getAllUsers() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('users');
    return List.generate(maps.length, (i) => User.fromMap(maps[i]));
  }
  
  Future<User?> getUserById(int id) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'users',
      where: 'id = ?',
      whereArgs: [id],
    );
    
    if (maps.isNotEmpty) {
      return User.fromMap(maps.first);
    }
    return null;
  }
  
  Future<int> updateUser(User user) async {
    final db = await database;
    return await db.update(
      'users',
      user.toMap(),
      where: 'id = ?',
      whereArgs: [user.id],
    );
  }
  
  Future<int> deleteUser(int id) async {
    final db = await database;
    return await db.delete(
      'users',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
  
  // Note CRUD operations
  Future<int> insertNote(Note note) async {
    final db = await database;
    return await db.insert('notes', note.toMap());
  }
  
  Future<List<Note>> getNotesByUserId(int userId) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'notes',
      where: 'user_id = ?',
      whereArgs: [userId],
      orderBy: 'created_at DESC',
    );
    return List.generate(maps.length, (i) => Note.fromMap(maps[i]));
  }
  
  // Complex query with JOIN
  Future<List<Map<String, dynamic>>> getUsersWithNoteCount() async {
    final db = await database;
    return await db.rawQuery('''
      SELECT u.*, COUNT(n.id) as note_count
      FROM users u
      LEFT JOIN notes n ON u.id = n.user_id
      GROUP BY u.id
      ORDER BY u.name
    ''');
  }
  
  // Transaction example
  Future<void> transferNotes(int fromUserId, int toUserId) async {
    final db = await database;
    await db.transaction((txn) async {
      await txn.update(
        'notes',
        {'user_id': toUserId, 'updated_at': DateTime.now().toIso8601String()},
        where: 'user_id = ?',
        whereArgs: [fromUserId],
      );
    });
  }
  
  // Close database
  Future<void> close() async {
    final db = await database;
    await db.close();
  }
}

// Enhanced User model for database
class User {
  final int? id;
  final String name;
  final String email;
  final String? phone;
  final DateTime createdAt;
  final DateTime updatedAt;
  
  User({
    this.id,
    required this.name,
    required this.email,
    this.phone,
    required this.createdAt,
    required this.updatedAt,
  });
  
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
  
  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'],
      name: map['name'],
      email: map['email'],
      phone: map['phone'],
      createdAt: DateTime.parse(map['created_at']),
      updatedAt: DateTime.parse(map['updated_at']),
    );
  }
}

class Note {
  final int? id;
  final String title;
  final String content;
  final int userId;
  final DateTime createdAt;
  final DateTime updatedAt;
  
  Note({
    this.id,
    required this.title,
    required this.content,
    required this.userId,
    required this.createdAt,
    required this.updatedAt,
  });
  
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'user_id': userId,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
  
  factory Note.fromMap(Map<String, dynamic> map) {
    return Note(
      id: map['id'],
      title: map['title'],
      content: map['content'],
      userId: map['user_id'],
      createdAt: DateTime.parse(map['created_at']),
      updatedAt: DateTime.parse(map['updated_at']),
    );
  }
}
```

**3. Hive Database (NoSQL):**
```dart
import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';

// Hive model with annotations
@HiveType(typeId: 0)
class HiveUser extends HiveObject {
  @HiveField(0)
  late String name;
  
  @HiveField(1)
  late String email;
  
  @HiveField(2)
  String? phone;
  
  @HiveField(3)
  late DateTime createdAt;
  
  @HiveField(4)
  late DateTime updatedAt;
  
  HiveUser({
    required this.name,
    required this.email,
    this.phone,
    required this.createdAt,
    required this.updatedAt,
  });
}

// Hive service class
class HiveService {
  static const String userBoxName = 'users';
  static const String settingsBoxName = 'settings';
  
  // Initialize Hive
  static Future<void> init() async {
    await Hive.initFlutter();
    
    // Register adapters
    Hive.registerAdapter(HiveUserAdapter());
    
    // Open boxes
    await Hive.openBox<HiveUser>(userBoxName);
    await Hive.openBox(settingsBoxName);
  }
  
  // User operations
  static Box<HiveUser> get userBox => Hive.box<HiveUser>(userBoxName);
  static Box get settingsBox => Hive.box(settingsBoxName);
  
  // Add user
  static Future<void> addUser(HiveUser user) async {
    await userBox.add(user);
  }
  
  // Get all users
  static List<HiveUser> getAllUsers() {
    return userBox.values.toList();
  }
  
  // Update user
  static Future<void> updateUser(int index, HiveUser user) async {
    await userBox.putAt(index, user);
  }
  
  // Delete user
  static Future<void> deleteUser(int index) async {
    await userBox.deleteAt(index);
  }
  
  // Search users
  static List<HiveUser> searchUsers(String query) {
    return userBox.values
        .where((user) => 
            user.name.toLowerCase().contains(query.toLowerCase()) ||
            user.email.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }
  
  // Settings operations
  static Future<void> saveSetting(String key, dynamic value) async {
    await settingsBox.put(key, value);
  }
  
  static T? getSetting<T>(String key, {T? defaultValue}) {
    return settingsBox.get(key, defaultValue: defaultValue);
  }
  
  // Close boxes
  static Future<void> close() async {
    await Hive.close();
  }
}
```

**4. File Storage:**
```dart
import 'dart:io';
import 'dart:convert';
import 'package:path_provider/path_provider.dart';

class FileStorageService {
  // Get application documents directory
  static Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }
  
  // Get file reference
  static Future<File> _localFile(String fileName) async {
    final path = await _localPath;
    return File('$path/$fileName');
  }
  
  // Write string to file
  static Future<File> writeString(String fileName, String content) async {
    final file = await _localFile(fileName);
    return file.writeAsString(content);
  }
  
  // Read string from file
  static Future<String?> readString(String fileName) async {
    try {
      final file = await _localFile(fileName);
      if (await file.exists()) {
        return await file.readAsString();
      }
    } catch (e) {
      print('Error reading file: $e');
    }
    return null;
  }
  
  // Write JSON to file
  static Future<File> writeJson(String fileName, Map<String, dynamic> data) async {
    final jsonString = json.encode(data);
    return writeString(fileName, jsonString);
  }
  
  // Read JSON from file
  static Future<Map<String, dynamic>?> readJson(String fileName) async {
    try {
      final jsonString = await readString(fileName);
      if (jsonString != null) {
        return json.decode(jsonString) as Map<String, dynamic>;
      }
    } catch (e) {
      print('Error reading JSON: $e');
    }
    return null;
  }
  
  // Write bytes to file
  static Future<File> writeBytes(String fileName, List<int> bytes) async {
    final file = await _localFile(fileName);
    return file.writeAsBytes(bytes);
  }
  
  // Read bytes from file
  static Future<List<int>?> readBytes(String fileName) async {
    try {
      final file = await _localFile(fileName);
      if (await file.exists()) {
        return await file.readAsBytes();
      }
    } catch (e) {
      print('Error reading bytes: $e');
    }
    return null;
  }
  
  // Delete file
  static Future<bool> deleteFile(String fileName) async {
    try {
      final file = await _localFile(fileName);
      if (await file.exists()) {
        await file.delete();
        return true;
      }
    } catch (e) {
      print('Error deleting file: $e');
    }
    return false;
  }
  
  // Check if file exists
  static Future<bool> fileExists(String fileName) async {
    final file = await _localFile(fileName);
    return await file.exists();
  }
  
  // Get file size
  static Future<int?> getFileSize(String fileName) async {
    try {
      final file = await _localFile(fileName);
      if (await file.exists()) {
        return await file.length();
      }
    } catch (e) {
      print('Error getting file size: $e');
    }
    return null;
  }
  
  // List all files in directory
  static Future<List<String>> listFiles() async {
    try {
      final directory = Directory(await _localPath);
      final files = await directory.list().toList();
      return files
          .where((entity) => entity is File)
          .map((file) => file.path.split('/').last)
          .toList();
    } catch (e) {
      print('Error listing files: $e');
      return [];
    }
  }
}
```

**Storage Comparison:**

| Storage Type | Use Case | Performance | Complexity | Data Size |
|--------------|----------|-------------|------------|----------|
| **SharedPreferences** | Simple settings, user preferences | Fast | Low | Small |
| **SQLite** | Complex relational data, queries | Medium | High | Large |
| **Hive** | Object storage, offline-first apps | Very Fast | Medium | Medium-Large |
| **File Storage** | Documents, images, custom formats | Medium | Medium | Any |

**Best Practices:**
- Use SharedPreferences for simple key-value data
- Choose SQLite for complex relational data with queries
- Use Hive for fast object storage and offline-first apps
- Implement proper error handling and data validation
- Consider data encryption for sensitive information
- Use transactions for multiple related operations
- Implement data migration strategies for app updates
  static const String _keyIsLoggedIn = 'is_logged_in';
  static const String _keyThemeMode = 'theme_mode';
  static const String _keyLanguage = 'language';
  
  // User authentication
  static Future<void> setUsername(String username) async {
    await PreferencesService.setString(_keyUsername, username);
  }
  
  static String? getUsername() {
    return PreferencesService.getString(_keyUsername);
  }
  
  static Future<void> setLoggedIn(bool isLoggedIn) async {
    await PreferencesService.setBool(_keyIsLoggedIn, isLoggedIn);
  }
  
  static bool isLoggedIn() {
    return PreferencesService.getBool(_keyIsLoggedIn, defaultValue: false) ?? false;
  }
  
  // App settings
  static Future<void> setThemeMode(String themeMode) async {
    await PreferencesService.setString(_keyThemeMode, themeMode);
  }
  
  static String getThemeMode() {
    return PreferencesService.getString(_keyThemeMode, defaultValue: 'system') ?? 'system';
  }
  
  static Future<void> setLanguage(String language) async {
    await PreferencesService.setString(_keyLanguage, language);
  }
  
  static String getLanguage() {
    return PreferencesService.getString(_keyLanguage, defaultValue: 'en') ?? 'en';
  }
  
  // Clear user data
  static Future<void> clearUserData() async {
    await PreferencesService.remove(_keyUsername);
    await PreferencesService.remove(_keyIsLoggedIn);
  }
}
```

**2. SQLite Database with sqflite:**
```dart
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

// Model class
class Task {
  final int? id;
  final String title;
  final String description;
  final bool isCompleted;
  final DateTime createdAt;
  final DateTime? completedAt;
  
  Task({
    this.id,
    required this.title,
    required this.description,
    this.isCompleted = false,
    required this.createdAt,
    this.completedAt,
  });
  
  // Convert Task to Map
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'isCompleted': isCompleted ? 1 : 0,
      'createdAt': createdAt.millisecondsSinceEpoch,
      'completedAt': completedAt?.millisecondsSinceEpoch,
    };
  }
  
  // Create Task from Map
  factory Task.fromMap(Map<String, dynamic> map) {
    return Task(
      id: map['id'],
      title: map['title'],
      description: map['description'],
      isCompleted: map['isCompleted'] == 1,
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt']),
      completedAt: map['completedAt'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['completedAt'])
          : null,
    );
  }
  
  // Copy with method
  Task copyWith({
    int? id,
    String? title,
    String? description,
    bool? isCompleted,
    DateTime? createdAt,
    DateTime? completedAt,
  }) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      createdAt: createdAt ?? this.createdAt,
      completedAt: completedAt ?? this.completedAt,
    );
  }
}

// Database helper class
class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  factory DatabaseHelper() => _instance;
  DatabaseHelper._internal();
  
  static Database? _database;
  
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'tasks.db');
    
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
      onUpgrade: _onUpgrade,
    );
  }
  
  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE tasks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        isCompleted INTEGER NOT NULL DEFAULT 0,
        createdAt INTEGER NOT NULL,
        completedAt INTEGER
      )
    ''');
    
    // Create indexes for better performance
    await db.execute('CREATE INDEX idx_tasks_completed ON tasks(isCompleted)');
    await db.execute('CREATE INDEX idx_tasks_created ON tasks(createdAt)');
  }
  
  Future<void> _onUpgrade(Database db, int oldVersion, int newVersion) async {
    // Handle database schema upgrades
    if (oldVersion < 2) {
      // Add new columns or tables for version 2
    }
  }
  
  // CRUD operations
  Future<int> insertTask(Task task) async {
    final db = await database;
    return await db.insert('tasks', task.toMap());
  }
  
  Future<List<Task>> getAllTasks() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'tasks',
      orderBy: 'createdAt DESC',
    );
    
    return List.generate(maps.length, (i) {
      return Task.fromMap(maps[i]);
    });
  }
  
  Future<Task?> getTaskById(int id) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'tasks',
      where: 'id = ?',
      whereArgs: [id],
    );
    
    if (maps.isNotEmpty) {
      return Task.fromMap(maps.first);
    }
    return null;
  }
  
  Future<List<Task>> getTasksByStatus(bool isCompleted) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'tasks',
      where: 'isCompleted = ?',
      whereArgs: [isCompleted ? 1 : 0],
      orderBy: 'createdAt DESC',
    );
    
    return List.generate(maps.length, (i) {
      return Task.fromMap(maps[i]);
    });
  }
  
  Future<List<Task>> searchTasks(String query) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'tasks',
      where: 'title LIKE ? OR description LIKE ?',
      whereArgs: ['%$query%', '%$query%'],
      orderBy: 'createdAt DESC',
    );
    
    return List.generate(maps.length, (i) {
      return Task.fromMap(maps[i]);
    });
  }
  
  Future<int> updateTask(Task task) async {
    final db = await database;
    return await db.update(
      'tasks',
      task.toMap(),
      where: 'id = ?',
      whereArgs: [task.id],
    );
  }
  
  Future<int> deleteTask(int id) async {
    final db = await database;
    return await db.delete(
      'tasks',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
  
  Future<int> deleteAllTasks() async {
    final db = await database;
    return await db.delete('tasks');
  }
  
  Future<int> getTaskCount() async {
    final db = await database;
    final result = await db.rawQuery('SELECT COUNT(*) as count FROM tasks');
    return Sqflite.firstIntValue(result) ?? 0;
  }
  
  Future<int> getCompletedTaskCount() async {
    final db = await database;
    final result = await db.rawQuery(
      'SELECT COUNT(*) as count FROM tasks WHERE isCompleted = 1'
    );
    return Sqflite.firstIntValue(result) ?? 0;
  }
  
  Future<void> close() async {
    final db = await database;
    await db.close();
  }
}
```

**3. Hive Database (NoSQL):**
```dart
import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';

// Hive model with type adapter
@HiveType(typeId: 0)
class HiveTask extends HiveObject {
  @HiveField(0)
  late String title;
  
  @HiveField(1)
  late String description;
  
  @HiveField(2)
  late bool isCompleted;
  
  @HiveField(3)
  late DateTime createdAt;
  
  @HiveField(4)
  DateTime? completedAt;
  
  HiveTask({
    required this.title,
    required this.description,
    this.isCompleted = false,
    required this.createdAt,
    this.completedAt,
  });
}

// Generate type adapter: flutter packages pub run build_runner build

// Hive service
class HiveService {
  static const String _taskBoxName = 'tasks';
  static const String _settingsBoxName = 'settings';
  
  static Future<void> init() async {
    await Hive.initFlutter();
    
    // Register adapters
    Hive.registerAdapter(HiveTaskAdapter());
    
    // Open boxes
    await Hive.openBox<HiveTask>(_taskBoxName);
    await Hive.openBox(_settingsBoxName);
  }
  
  // Task operations
  static Box<HiveTask> get _taskBox => Hive.box<HiveTask>(_taskBoxName);
  
  static Future<void> addTask(HiveTask task) async {
    await _taskBox.add(task);
  }
  
  static List<HiveTask> getAllTasks() {
    return _taskBox.values.toList();
  }
  
  static List<HiveTask> getCompletedTasks() {
    return _taskBox.values.where((task) => task.isCompleted).toList();
  }
  
  static List<HiveTask> getPendingTasks() {
    return _taskBox.values.where((task) => !task.isCompleted).toList();
  }
  
  static Future<void> updateTask(int index, HiveTask task) async {
    await _taskBox.putAt(index, task);
  }
  
  static Future<void> deleteTask(int index) async {
    await _taskBox.deleteAt(index);
  }
  
  static Future<void> deleteAllTasks() async {
    await _taskBox.clear();
  }
  
  // Settings operations
  static Box get _settingsBox => Hive.box(_settingsBoxName);
  
  static Future<void> saveSetting(String key, dynamic value) async {
    await _settingsBox.put(key, value);
  }
  
  static T? getSetting<T>(String key, {T? defaultValue}) {
    return _settingsBox.get(key, defaultValue: defaultValue);
  }
  
  static Future<void> deleteSetting(String key) async {
    await _settingsBox.delete(key);
  }
  
  static Future<void> clearSettings() async {
    await _settingsBox.clear();
  }
  
  // Close boxes
  static Future<void> close() async {
    await Hive.close();
  }
}
```

**4. File Storage:**
```dart
import 'dart:io';
import 'dart:convert';
import 'package:path_provider/path_provider.dart';

class FileStorageService {
  // Get application documents directory
  static Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }
  
  // Get file reference
  static Future<File> _localFile(String fileName) async {
    final path = await _localPath;
    return File('$path/$fileName');
  }
  
  // Write string to file
  static Future<File> writeString(String fileName, String content) async {
    final file = await _localFile(fileName);
    return file.writeAsString(content);
  }
  
  // Read string from file
  static Future<String> readString(String fileName) async {
    try {
      final file = await _localFile(fileName);
      return await file.readAsString();
    } catch (e) {
      return '';
    }
  }
  
  // Write JSON to file
  static Future<File> writeJson(String fileName, Map<String, dynamic> data) async {
    final jsonString = json.encode(data);
    return writeString(fileName, jsonString);
  }
  
  // Read JSON from file
  static Future<Map<String, dynamic>?> readJson(String fileName) async {
    try {
      final jsonString = await readString(fileName);
      if (jsonString.isNotEmpty) {
        return json.decode(jsonString);
      }
    } catch (e) {
      print('Error reading JSON: $e');
    }
    return null;
  }
  
  // Write bytes to file
  static Future<File> writeBytes(String fileName, List<int> bytes) async {
    final file = await _localFile(fileName);
    return file.writeAsBytes(bytes);
  }
  
  // Read bytes from file
  static Future<List<int>?> readBytes(String fileName) async {
    try {
      final file = await _localFile(fileName);
      return await file.readAsBytes();
    } catch (e) {
      return null;
    }
  }
  
  // Check if file exists
  static Future<bool> fileExists(String fileName) async {
    final file = await _localFile(fileName);
    return file.exists();
  }
  
  // Delete file
  static Future<void> deleteFile(String fileName) async {
    try {
      final file = await _localFile(fileName);
      if (await file.exists()) {
        await file.delete();
      }
    } catch (e) {
      print('Error deleting file: $e');
    }
  }
  
  // Get file size
  static Future<int> getFileSize(String fileName) async {
    try {
      final file = await _localFile(fileName);
      if (await file.exists()) {
        return await file.length();
      }
    } catch (e) {
      print('Error getting file size: $e');
    }
    return 0;
  }
  
  // List all files in directory
  static Future<List<String>> listFiles() async {
    try {
      final directory = Directory(await _localPath);
      final files = await directory.list().toList();
      return files
          .where((entity) => entity is File)
          .map((file) => file.path.split('/').last)
          .toList();
    } catch (e) {
      print('Error listing files: $e');
      return [];
    }
  }
}

// Usage example for complex data storage
class UserDataManager {
  static const String _userDataFile = 'user_data.json';
  static const String _cacheFile = 'cache.json';
  
  // Save user profile
  static Future<void> saveUserProfile(Map<String, dynamic> profile) async {
    await FileStorageService.writeJson(_userDataFile, profile);
  }
  
  // Load user profile
  static Future<Map<String, dynamic>?> loadUserProfile() async {
    return await FileStorageService.readJson(_userDataFile);
  }
  
  // Cache API response
  static Future<void> cacheApiResponse(
    String endpoint,
    Map<String, dynamic> data,
  ) async {
    final cacheData = await FileStorageService.readJson(_cacheFile) ?? {};
    cacheData[endpoint] = {
      'data': data,
      'timestamp': DateTime.now().millisecondsSinceEpoch,
    };
    await FileStorageService.writeJson(_cacheFile, cacheData);
  }
  
  // Get cached API response
  static Future<Map<String, dynamic>?> getCachedApiResponse(
    String endpoint, {
    Duration maxAge = const Duration(hours: 1),
  }) async {
    final cacheData = await FileStorageService.readJson(_cacheFile);
    if (cacheData != null && cacheData.containsKey(endpoint)) {
      final cachedItem = cacheData[endpoint];
      final timestamp = cachedItem['timestamp'] as int;
      final cacheTime = DateTime.fromMillisecondsSinceEpoch(timestamp);
      
      if (DateTime.now().difference(cacheTime) < maxAge) {
        return cachedItem['data'];
      }
    }
    return null;
  }
  
  // Clear cache
  static Future<void> clearCache() async {
    await FileStorageService.deleteFile(_cacheFile);
  }
  
  // Clear all user data
  static Future<void> clearAllData() async {
    await FileStorageService.deleteFile(_userDataFile);
    await FileStorageService.deleteFile(_cacheFile);
  }
}
```

**5. Secure Storage:**
```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
    ),
    iOptions: IOSOptions(
      accessibility: IOSAccessibility.first_unlock_this_device,
    ),
  );
  
  // Store sensitive data
  static Future<void> storeSecureData(String key, String value) async {
    await _storage.write(key: key, value: value);
  }
  
  // Read sensitive data
  static Future<String?> readSecureData(String key) async {
    return await _storage.read(key: key);
  }
  
  // Delete sensitive data
  static Future<void> deleteSecureData(String key) async {
    await _storage.delete(key: key);
  }
  
  // Clear all secure data
  static Future<void> clearAllSecureData() async {
    await _storage.deleteAll();
  }
  
  // Check if key exists
  static Future<bool> containsKey(String key) async {
    return await _storage.containsKey(key: key);
  }
  
  // Get all keys
  static Future<Map<String, String>> readAllSecureData() async {
    return await _storage.readAll();
  }
}

// Usage for authentication tokens
class AuthTokenManager {
  static const String _accessTokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userIdKey = 'user_id';
  
  static Future<void> saveTokens({
    required String accessToken,
    required String refreshToken,
    required String userId,
  }) async {
    await Future.wait([
      SecureStorageService.storeSecureData(_accessTokenKey, accessToken),
      SecureStorageService.storeSecureData(_refreshTokenKey, refreshToken),
      SecureStorageService.storeSecureData(_userIdKey, userId),
    ]);
  }
  
  static Future<String?> getAccessToken() async {
    return await SecureStorageService.readSecureData(_accessTokenKey);
  }
  
  static Future<String?> getRefreshToken() async {
    return await SecureStorageService.readSecureData(_refreshTokenKey);
  }
  
  static Future<String?> getUserId() async {
    return await SecureStorageService.readSecureData(_userIdKey);
  }
  
  static Future<void> clearTokens() async {
    await Future.wait([
      SecureStorageService.deleteSecureData(_accessTokenKey),
      SecureStorageService.deleteSecureData(_refreshTokenKey),
      SecureStorageService.deleteSecureData(_userIdKey),
    ]);
  }
  
  static Future<bool> hasValidTokens() async {
    final accessToken = await getAccessToken();
    final refreshToken = await getRefreshToken();
    return accessToken != null && refreshToken != null;
  }
}
```

### Q9: How do you implement testing in Flutter (Unit, Widget, and Integration tests)?

**Answer:**
Flutter provides a comprehensive testing framework that supports three types of tests: unit tests, widget tests, and integration tests.

**1. Unit Tests:**
Unit tests verify the behavior of individual functions, methods, or classes.

```dart
// test/models/calculator_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/models/calculator.dart';

class Calculator {
  int add(int a, int b) => a + b;
  int subtract(int a, int b) => a - b;
  int multiply(int a, int b) => a * b;
  double divide(int a, int b) {
    if (b == 0) throw ArgumentError('Cannot divide by zero');
    return a / b;
  }
  
  bool isEven(int number) => number % 2 == 0;
  
  List<int> fibonacci(int n) {
    if (n <= 0) return [];
    if (n == 1) return [0];
    if (n == 2) return [0, 1];
    
    List<int> sequence = [0, 1];
    for (int i = 2; i < n; i++) {
      sequence.add(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
  }
}

void main() {
  group('Calculator Tests', () {
    late Calculator calculator;
    
    setUp(() {
      calculator = Calculator();
    });
    
    group('Basic Operations', () {
      test('should add two numbers correctly', () {
        // Arrange
        const int a = 5;
        const int b = 3;
        
        // Act
        final result = calculator.add(a, b);
        
        // Assert
        expect(result, equals(8));
      });
      
      test('should subtract two numbers correctly', () {
        expect(calculator.subtract(10, 4), equals(6));
        expect(calculator.subtract(0, 5), equals(-5));
      });
      
      test('should multiply two numbers correctly', () {
        expect(calculator.multiply(4, 5), equals(20));
        expect(calculator.multiply(-3, 4), equals(-12));
        expect(calculator.multiply(0, 100), equals(0));
      });
      
      test('should divide two numbers correctly', () {
        expect(calculator.divide(10, 2), equals(5.0));
        expect(calculator.divide(7, 2), equals(3.5));
      });
      
      test('should throw error when dividing by zero', () {
        expect(() => calculator.divide(10, 0), throwsArgumentError);
      });
    });
    
    group('Utility Functions', () {
      test('should correctly identify even numbers', () {
        expect(calculator.isEven(2), isTrue);
        expect(calculator.isEven(4), isTrue);
        expect(calculator.isEven(1), isFalse);
        expect(calculator.isEven(3), isFalse);
        expect(calculator.isEven(0), isTrue);
      });
      
      test('should generate fibonacci sequence correctly', () {
        expect(calculator.fibonacci(0), equals([]));
        expect(calculator.fibonacci(1), equals([0]));
        expect(calculator.fibonacci(2), equals([0, 1]));
        expect(calculator.fibonacci(5), equals([0, 1, 1, 2, 3]));
        expect(calculator.fibonacci(8), equals([0, 1, 1, 2, 3, 5, 8, 13]));
      });
    });
  });
}
```

**2. Widget Tests:**
Widget tests verify the behavior and appearance of individual widgets.

```dart
// test/widgets/counter_widget_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/widgets/counter_widget.dart';

// Counter Widget Implementation
class CounterWidget extends StatefulWidget {
  final int initialValue;
  final VoidCallback? onIncrement;
  final VoidCallback? onDecrement;
  
  const CounterWidget({
    Key? key,
    this.initialValue = 0,
    this.onIncrement,
    this.onDecrement,
  }) : super(key: key);
  
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  late int _counter;
  
  @override
  void initState() {
    super.initState();
    _counter = widget.initialValue;
  }
  
  void _increment() {
    setState(() {
      _counter++;
    });
    widget.onIncrement?.call();
  }
  
  void _decrement() {
    setState(() {
      _counter--;
    });
    widget.onDecrement?.call();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Counter: $_counter',
          key: const Key('counter_text'),
          style: Theme.of(context).textTheme.headlineMedium,
        ),
        const SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              key: const Key('decrement_button'),
              onPressed: _decrement,
              child: const Icon(Icons.remove),
            ),
            const SizedBox(width: 20),
            ElevatedButton(
              key: const Key('increment_button'),
              onPressed: _increment,
              child: const Icon(Icons.add),
            ),
          ],
        ),
      ],
    );
  }
}

void main() {
  group('CounterWidget Tests', () {
    testWidgets('should display initial counter value', (WidgetTester tester) async {
      // Arrange
      const initialValue = 5;
      
      // Act
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: CounterWidget(initialValue: initialValue),
          ),
        ),
      );
      
      // Assert
      expect(find.text('Counter: 5'), findsOneWidget);
      expect(find.byKey(const Key('counter_text')), findsOneWidget);
      expect(find.byKey(const Key('increment_button')), findsOneWidget);
      expect(find.byKey(const Key('decrement_button')), findsOneWidget);
    });
    
    testWidgets('should increment counter when increment button is tapped', 
        (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: CounterWidget(initialValue: 0),
          ),
        ),
      );
      
      // Act
      await tester.tap(find.byKey(const Key('increment_button')));
      await tester.pump();
      
      // Assert
      expect(find.text('Counter: 1'), findsOneWidget);
      expect(find.text('Counter: 0'), findsNothing);
    });
    
    testWidgets('should decrement counter when decrement button is tapped', 
        (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: CounterWidget(initialValue: 5),
          ),
        ),
      );
      
      // Act
      await tester.tap(find.byKey(const Key('decrement_button')));
      await tester.pump();
      
      // Assert
      expect(find.text('Counter: 4'), findsOneWidget);
      expect(find.text('Counter: 5'), findsNothing);
    });
    
    testWidgets('should call callbacks when buttons are tapped', 
        (WidgetTester tester) async {
      // Arrange
      bool incrementCalled = false;
      bool decrementCalled = false;
      
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CounterWidget(
              initialValue: 0,
              onIncrement: () => incrementCalled = true,
              onDecrement: () => decrementCalled = true,
            ),
          ),
        ),
      );
      
      // Act & Assert
      await tester.tap(find.byKey(const Key('increment_button')));
      await tester.pump();
      expect(incrementCalled, isTrue);
      
      await tester.tap(find.byKey(const Key('decrement_button')));
      await tester.pump();
      expect(decrementCalled, isTrue);
    });
    
    testWidgets('should handle multiple rapid taps', (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: CounterWidget(initialValue: 0),
          ),
        ),
      );
      
      // Act
      for (int i = 0; i < 5; i++) {
        await tester.tap(find.byKey(const Key('increment_button')));
        await tester.pump();
      }
      
      // Assert
      expect(find.text('Counter: 5'), findsOneWidget);
    });
  });
}
```

**3. Integration Tests:**
Integration tests verify the complete app or large parts of the app running together.

```dart
// integration_test/app_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('App Integration Tests', () {
    testWidgets('complete user flow test', (WidgetTester tester) async {
      // Start the app
      app.main();
      await tester.pumpAndSettle();
      
      // Verify home screen is displayed
      expect(find.text('Welcome'), findsOneWidget);
      
      // Navigate to login screen
      await tester.tap(find.byKey(const Key('login_button')));
      await tester.pumpAndSettle();
      
      // Fill login form
      await tester.enterText(
        find.byKey(const Key('email_field')), 
        'test@example.com'
      );
      await tester.enterText(
        find.byKey(const Key('password_field')), 
        'password123'
      );
      
      // Submit login
      await tester.tap(find.byKey(const Key('submit_button')));
      await tester.pumpAndSettle();
      
      // Verify successful login
      expect(find.text('Dashboard'), findsOneWidget);
      
      // Test navigation to profile
      await tester.tap(find.byKey(const Key('profile_tab')));
      await tester.pumpAndSettle();
      
      expect(find.text('Profile'), findsOneWidget);
      
      // Test logout
      await tester.tap(find.byKey(const Key('logout_button')));
      await tester.pumpAndSettle();
      
      // Verify back to home screen
      expect(find.text('Welcome'), findsOneWidget);
    });
    
    testWidgets('network request integration test', (WidgetTester tester) async {
      app.main();
      await tester.pumpAndSettle();
      
      // Navigate to data screen
      await tester.tap(find.byKey(const Key('data_screen_button')));
      await tester.pumpAndSettle();
      
      // Wait for data to load
      await tester.pump(const Duration(seconds: 2));
      
      // Verify data is displayed
      expect(find.byType(ListView), findsOneWidget);
      expect(find.byType(ListTile), findsWidgets);
      
      // Test pull to refresh
      await tester.fling(
        find.byType(ListView), 
        const Offset(0, 300), 
        1000
      );
      await tester.pumpAndSettle();
      
      // Verify refresh indicator appeared
      expect(find.byType(RefreshIndicator), findsOneWidget);
    });
    
    testWidgets('form validation integration test', (WidgetTester tester) async {
      app.main();
      await tester.pumpAndSettle();
      
      // Navigate to form screen
      await tester.tap(find.byKey(const Key('form_screen_button')));
      await tester.pumpAndSettle();
      
      // Test empty form submission
      await tester.tap(find.byKey(const Key('submit_form_button')));
      await tester.pumpAndSettle();
      
      // Verify validation errors
      expect(find.text('Please enter your name'), findsOneWidget);
      expect(find.text('Please enter your email'), findsOneWidget);
      
      // Fill form with invalid data
      await tester.enterText(
        find.byKey(const Key('name_field')), 
        'A'
      );
      await tester.enterText(
        find.byKey(const Key('email_field')), 
        'invalid-email'
      );
      
      await tester.tap(find.byKey(const Key('submit_form_button')));
      await tester.pumpAndSettle();
      
      // Verify specific validation errors
      expect(find.text('Name must be at least 2 characters'), findsOneWidget);
      expect(find.text('Please enter a valid email'), findsOneWidget);
      
      // Fill form with valid data
      await tester.enterText(
        find.byKey(const Key('name_field')), 
        'John Doe'
      );
      await tester.enterText(
        find.byKey(const Key('email_field')), 
        'john@example.com'
      );
      
      await tester.tap(find.byKey(const Key('submit_form_button')));
      await tester.pumpAndSettle();
      
      // Verify successful submission
      expect(find.text('Form submitted successfully'), findsOneWidget);
    });
  });
}
```

**4. Advanced Testing Patterns:**

**Mock Dependencies:**
```dart
// test/mocks/mock_api_service.dart
import 'package:mockito/mockito.dart';
import 'package:my_app/services/api_service.dart';

class MockApiService extends Mock implements ApiService {}

// test/services/user_service_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:my_app/services/user_service.dart';
import 'package:my_app/models/user.dart';
import '../mocks/mock_api_service.dart';

void main() {
  group('UserService Tests', () {
    late UserService userService;
    late MockApiService mockApiService;
    
    setUp(() {
      mockApiService = MockApiService();
      userService = UserService(apiService: mockApiService);
    });
    
    test('should fetch user successfully', () async {
      // Arrange
      const userId = '123';
      final expectedUser = User(
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
      );
      
      when(mockApiService.getUser(userId))
          .thenAnswer((_) async => expectedUser);
      
      // Act
      final result = await userService.fetchUser(userId);
      
      // Assert
      expect(result, equals(expectedUser));
      verify(mockApiService.getUser(userId)).called(1);
    });
    
    test('should handle API error gracefully', () async {
      // Arrange
      const userId = '123';
      when(mockApiService.getUser(userId))
          .thenThrow(Exception('Network error'));
      
      // Act & Assert
      expect(
        () => userService.fetchUser(userId),
        throwsA(isA<Exception>()),
      );
    });
  });
}
```

**Testing with Provider/Bloc:**
```dart
// test/providers/counter_provider_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:my_app/providers/counter_provider.dart';

class CounterProvider extends ChangeNotifier {
  int _count = 0;
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
  
  void decrement() {
    _count--;
    notifyListeners();
  }
  
  void reset() {
    _count = 0;
    notifyListeners();
  }
}

void main() {
  group('CounterProvider Tests', () {
    late CounterProvider counterProvider;
    
    setUp(() {
      counterProvider = CounterProvider();
    });
    
    test('initial count should be 0', () {
      expect(counterProvider.count, equals(0));
    });
    
    test('increment should increase count by 1', () {
      counterProvider.increment();
      expect(counterProvider.count, equals(1));
      
      counterProvider.increment();
      expect(counterProvider.count, equals(2));
    });
    
    test('decrement should decrease count by 1', () {
      counterProvider.increment();
      counterProvider.increment();
      
      counterProvider.decrement();
      expect(counterProvider.count, equals(1));
    });
    
    test('reset should set count to 0', () {
      counterProvider.increment();
      counterProvider.increment();
      
      counterProvider.reset();
      expect(counterProvider.count, equals(0));
    });
    
    test('should notify listeners on state change', () {
      bool notified = false;
      counterProvider.addListener(() {
        notified = true;
      });
      
      counterProvider.increment();
      expect(notified, isTrue);
    });
  });
}

// Widget test with Provider
testWidgets('CounterWidget with Provider', (WidgetTester tester) async {
  await tester.pumpWidget(
    ChangeNotifierProvider(
      create: (_) => CounterProvider(),
      child: MaterialApp(
        home: Scaffold(
          body: Consumer<CounterProvider>(
            builder: (context, counter, child) {
              return Column(
                children: [
                  Text('Count: ${counter.count}'),
                  ElevatedButton(
                    key: const Key('increment'),
                    onPressed: counter.increment,
                    child: const Text('Increment'),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    ),
  );
  
  expect(find.text('Count: 0'), findsOneWidget);
  
  await tester.tap(find.byKey(const Key('increment')));
  await tester.pump();
  
  expect(find.text('Count: 1'), findsOneWidget);
});
```

**Testing Best Practices:**

| Practice | Description | Example |
|----------|-------------|----------|
| **AAA Pattern** | Arrange, Act, Assert structure | Clear test organization |
| **Descriptive Names** | Test names should describe behavior | `should_increment_counter_when_button_tapped` |
| **Single Responsibility** | One test per behavior | Separate tests for different scenarios |
| **Test Data Builders** | Create reusable test data | `UserBuilder().withName('John').build()` |
| **Mock External Dependencies** | Isolate units under test | Mock API calls, databases |
| **Test Edge Cases** | Boundary conditions, errors | Empty lists, null values, network failures |
| **Use Keys for Widgets** | Reliable widget identification | `Key('submit_button')` |
| **Pump and Settle** | Wait for animations/async operations | `await tester.pumpAndSettle()` |
| **Group Related Tests** | Organize tests logically | `group('Authentication Tests', ...)` |
| **Setup and Teardown** | Initialize/cleanup test state | `setUp()`, `tearDown()` methods |

**Test Configuration Files:**

**pubspec.yaml:**
```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  integration_test:
    sdk: flutter
  mockito: ^5.4.2
  build_runner: ^2.4.7
  test: ^1.24.3
```

**test/flutter_test_config.dart:**
```dart
import 'dart:async';

Future<void> testExecutable(FutureOr<void> Function() testMain) async {
  // Global test setup
  setUpAll(() {
    // Initialize test environment
  });
  
  tearDownAll(() {
    // Cleanup after all tests
  });
  
  await testMain();
}
```

Testing in Flutter ensures code reliability, maintainability, and helps catch bugs early in the development process.

---

### Q10: How do you implement performance optimization in Flutter applications?

**Answer:**
Flutter performance optimization involves multiple strategies to ensure smooth 60fps rendering and efficient resource usage.

**1. Widget Performance Optimization:**
```dart
// Efficient widget building
class OptimizedListView extends StatefulWidget {
  final List<Item> items;
  
  const OptimizedListView({Key? key, required this.items}) : super(key: key);
  
  @override
  _OptimizedListViewState createState() => _OptimizedListViewState();
}

class _OptimizedListViewState extends State<OptimizedListView> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      // Use itemExtent for fixed-height items
      itemExtent: 80.0,
      itemCount: widget.items.length,
      // Efficient item builder
      itemBuilder: (context, index) {
        final item = widget.items[index];
        return OptimizedListItem(
          key: ValueKey(item.id), // Stable keys for efficient updates
          item: item,
        );
      },
    );
  }
}

// Optimized list item widget
class OptimizedListItem extends StatelessWidget {
  final Item item;
  
  const OptimizedListItem({
    Key? key,
    required this.item,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        // Use const constructors when possible
        leading: const CircleAvatar(
          child: Icon(Icons.person),
        ),
        title: Text(item.title),
        subtitle: Text(item.description),
        trailing: IconButton(
          icon: const Icon(Icons.more_vert),
          onPressed: () => _showOptions(context),
        ),
      ),
    );
  }
  
  void _showOptions(BuildContext context) {
    // Implement options menu
  }
}

// Use const constructors for static widgets
class StaticHeader extends StatelessWidget {
  const StaticHeader({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Text(
          'Header Title',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
```

**2. State Management Optimization:**
```dart
// Efficient state management with Provider
class UserProvider extends ChangeNotifier {
  List<User> _users = [];
  bool _isLoading = false;
  String? _error;
  
  List<User> get users => _users;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  // Batch updates to minimize rebuilds
  Future<void> loadUsers() async {
    _setLoadingState(true);
    
    try {
      final users = await _userRepository.getUsers();
      
      // Single notification for multiple state changes
      _users = users;
      _error = null;
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }
  
  void _setLoadingState(bool loading) {
    if (_isLoading != loading) {
      _isLoading = loading;
      notifyListeners();
    }
  }
  
  // Selective updates for specific users
  void updateUser(User updatedUser) {
    final index = _users.indexWhere((user) => user.id == updatedUser.id);
    if (index != -1) {
      _users[index] = updatedUser;
      notifyListeners();
    }
  }
}

// Use Selector for granular rebuilds
class UserListWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Only rebuilds when loading state changes
        Selector<UserProvider, bool>(
          selector: (context, provider) => provider.isLoading,
          builder: (context, isLoading, child) {
            return isLoading
                ? const CircularProgressIndicator()
                : const SizedBox.shrink();
          },
        ),
        
        // Only rebuilds when users list changes
        Selector<UserProvider, List<User>>(
          selector: (context, provider) => provider.users,
          builder: (context, users, child) {
            return Expanded(
              child: ListView.builder(
                itemCount: users.length,
                itemBuilder: (context, index) {
                  return UserTile(user: users[index]);
                },
              ),
            );
          },
        ),
      ],
    );
  }
}
```

**3. Image and Asset Optimization:**
```dart
class OptimizedImageWidget extends StatelessWidget {
  final String imageUrl;
  final double? width;
  final double? height;
  
  const OptimizedImageWidget({
    Key? key,
    required this.imageUrl,
    this.width,
    this.height,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: imageUrl,
      width: width,
      height: height,
      fit: BoxFit.cover,
      
      // Placeholder while loading
      placeholder: (context, url) => Container(
        width: width,
        height: height,
        color: Colors.grey[300],
        child: const Center(
          child: CircularProgressIndicator(),
        ),
      ),
      
      // Error widget
      errorWidget: (context, url, error) => Container(
        width: width,
        height: height,
        color: Colors.grey[300],
        child: const Icon(Icons.error),
      ),
      
      // Memory cache configuration
      memCacheWidth: width?.toInt(),
      memCacheHeight: height?.toInt(),
      
      // Disk cache configuration
      cacheManager: DefaultCacheManager(),
    );
  }
}

// Preload critical images
class ImagePreloader {
  static Future<void> preloadImages(BuildContext context, List<String> imageUrls) async {
    final futures = imageUrls.map((url) {
      return precacheImage(NetworkImage(url), context);
    });
    
    await Future.wait(futures);
  }
}

// Efficient asset loading
class AssetImageWidget extends StatelessWidget {
  final String assetPath;
  final double? width;
  final double? height;
  
  const AssetImageWidget({
    Key? key,
    required this.assetPath,
    this.width,
    this.height,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Image.asset(
      assetPath,
      width: width,
      height: height,
      fit: BoxFit.cover,
      // Use appropriate cache settings
      cacheWidth: width?.toInt(),
      cacheHeight: height?.toInt(),
    );
  }
}
```

**4. Memory Management:**
```dart
class MemoryEfficientWidget extends StatefulWidget {
  @override
  _MemoryEfficientWidgetState createState() => _MemoryEfficientWidgetState();
}

class _MemoryEfficientWidgetState extends State<MemoryEfficientWidget> {
  late StreamSubscription _subscription;
  Timer? _timer;
  
  @override
  void initState() {
    super.initState();
    _initializeResources();
  }
  
  void _initializeResources() {
    // Initialize streams and timers
    _subscription = someStream.listen((data) {
      // Handle data
    });
    
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      // Periodic task
    });
  }
  
  @override
  void dispose() {
    // Always dispose resources
    _subscription.cancel();
    _timer?.cancel();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Memory Efficient Widget'),
    );
  }
}

// Use AutomaticKeepAliveClientMixin for expensive widgets
class ExpensiveWidget extends StatefulWidget {
  @override
  _ExpensiveWidgetState createState() => _ExpensiveWidgetState();
}

class _ExpensiveWidgetState extends State<ExpensiveWidget>
    with AutomaticKeepAliveClientMixin {
  
  @override
  bool get wantKeepAlive => true;
  
  @override
  Widget build(BuildContext context) {
    super.build(context); // Required for AutomaticKeepAliveClientMixin
    
    return Container(
      child: Text('Expensive Widget'),
    );
  }
}
```

**5. Build Optimization Techniques:**
```dart
// Use RepaintBoundary for complex widgets
class OptimizedComplexWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Isolate expensive repaints
        RepaintBoundary(
          child: CustomPainter(
            painter: ComplexCustomPainter(),
          ),
        ),
        
        // Regular widgets
        Text('Some text'),
        ElevatedButton(
          onPressed: () {},
          child: Text('Button'),
        ),
      ],
    );
  }
}

// Use Builder to limit rebuild scope
class ScopedRebuildWidget extends StatefulWidget {
  @override
  _ScopedRebuildWidgetState createState() => _ScopedRebuildWidgetState();
}

class _ScopedRebuildWidgetState extends State<ScopedRebuildWidget> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // This won't rebuild when counter changes
        const Text('Static Header'),
        
        // Only this Builder rebuilds
        Builder(
          builder: (context) {
            return Text('Counter: $_counter');
          },
        ),
        
        ElevatedButton(
          onPressed: () {
            setState(() {
              _counter++;
            });
          },
          child: const Text('Increment'),
        ),
      ],
    );
  }
}

// Use ValueListenableBuilder for specific value changes
class ValueListenableWidget extends StatelessWidget {
  final ValueNotifier<int> counterNotifier = ValueNotifier<int>(0);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text('Static Content'),
        
        ValueListenableBuilder<int>(
          valueListenable: counterNotifier,
          builder: (context, value, child) {
            return Text('Count: $value');
          },
        ),
        
        ElevatedButton(
          onPressed: () {
            counterNotifier.value++;
          },
          child: const Text('Increment'),
        ),
      ],
    );
  }
}
```

**Performance Monitoring and Debugging:**
```dart
// Performance monitoring
class PerformanceMonitor {
  static void measureBuildTime(String widgetName, VoidCallback buildFunction) {
    final stopwatch = Stopwatch()..start();
    buildFunction();
    stopwatch.stop();
    
    if (stopwatch.elapsedMilliseconds > 16) { // More than one frame
      print('Warning: $widgetName took ${stopwatch.elapsedMilliseconds}ms to build');
    }
  }
  
  static void logMemoryUsage() {
    final info = ProcessInfo.currentRss;
    print('Current memory usage: ${info / 1024 / 1024} MB');
  }
}

// Custom performance widget
class PerformanceAwareWidget extends StatelessWidget {
  final Widget child;
  final String name;
  
  const PerformanceAwareWidget({
    Key? key,
    required this.child,
    required this.name,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (context) {
        PerformanceMonitor.measureBuildTime(name, () {});
        return child;
      },
    );
  }
}
```

**Performance Best Practices:**

| Technique | Description | Impact |
|-----------|-------------|--------|
| **Const Constructors** | Use const for immutable widgets | Reduces widget rebuilds |
| **ListView.builder** | Build items on demand | Efficient for large lists |
| **Selector/Consumer** | Granular state listening | Minimizes unnecessary rebuilds |
| **RepaintBoundary** | Isolate expensive repaints | Improves rendering performance |
| **Image Caching** | Cache network images | Reduces network calls |
| **Lazy Loading** | Load content when needed | Improves initial load time |
| **Dispose Resources** | Clean up streams, timers | Prevents memory leaks |
| **Use Keys Wisely** | Stable keys for list items | Efficient widget updates |
| **Avoid Deep Nesting** | Flatten widget trees | Better performance |
| **Profile Regularly** | Use Flutter Inspector | Identify bottlenecks |

Regular performance profiling and optimization ensure smooth user experiences across all devices.
          .thenAnswer((_) async => Result.error('Network error'));
      
      // Act
      await userProvider.loadUsers();
      
      // Assert
      expect(userProvider.users.isEmpty, isTrue);
      expect(userProvider.isLoading, isFalse);
      expect(userProvider.error, equals('Network error'));
    });
  });
}
```

**6. Test Configuration (pubspec.yaml):**
```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  integration_test:
    sdk: flutter
  mockito: ^5.4.0
  build_runner: ^2.3.3
  test: ^1.21.0
```

**7. Running Tests:**
```bash
# Run unit tests
flutter test

# Run specific test file
flutter test test/models/calculator_test.dart

# Run tests with coverage
flutter test --coverage

# Run integration tests
flutter test integration_test/

# Run tests on specific device
flutter test integration_test/ -d chrome
```

### Q10: How do you optimize performance in Flutter applications?

**Answer:**
Flutter performance optimization involves multiple strategies across different aspects of the application, from widget management to memory usage and rendering optimization.

**1. Widget Optimization:**

```dart
// BAD: Rebuilding entire widget tree
class BadPerformanceWidget extends StatefulWidget {
  @override
  _BadPerformanceWidgetState createState() => _BadPerformanceWidgetState();
}

class _BadPerformanceWidgetState extends State<BadPerformanceWidget> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ExpensiveWidget(), // Rebuilds unnecessarily
        Text('Counter: $_counter'),
        ElevatedButton(
          onPressed: () => setState(() => _counter++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}

// GOOD: Using const constructors and separating widgets
class GoodPerformanceWidget extends StatefulWidget {
  @override
  _GoodPerformanceWidgetState createState() => _GoodPerformanceWidgetState();
}

class _GoodPerformanceWidgetState extends State<GoodPerformanceWidget> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const ExpensiveWidget(), // Won't rebuild
        CounterDisplay(counter: _counter), // Only this rebuilds
        ElevatedButton(
          onPressed: () => setState(() => _counter++),
          child: const Text('Increment'), // const constructor
        ),
      ],
    );
  }
}

class CounterDisplay extends StatelessWidget {
  final int counter;
  
  const CounterDisplay({Key? key, required this.counter}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text('Counter: $counter');
  }
}

class ExpensiveWidget extends StatelessWidget {
  const ExpensiveWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    // Expensive computation or complex UI
    return Container(
      height: 200,
      child: ListView.builder(
        itemCount: 1000,
        itemBuilder: (context, index) => ListTile(
          title: Text('Item $index'),
        ),
      ),
    );
  }
}
```

**2. ListView and ScrollView Optimization:**

```dart
// Optimized ListView with proper itemExtent and caching
class OptimizedListView extends StatelessWidget {
  final List<String> items;
  
  const OptimizedListView({Key? key, required this.items}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemExtent: 60.0, // Fixed height for better performance
      cacheExtent: 500.0, // Cache more items
      addAutomaticKeepAlives: false, // Don't keep alive unnecessarily
      addRepaintBoundaries: false, // Reduce repaint boundaries if not needed
      itemBuilder: (context, index) {
        return OptimizedListItem(
          key: ValueKey(items[index]), // Stable keys
          title: items[index],
        );
      },
    );
  }
}

class OptimizedListItem extends StatelessWidget {
  final String title;
  
  const OptimizedListItem({Key? key, required this.title}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return RepaintBoundary( // Isolate repaints
      child: ListTile(
        title: Text(title),
        leading: const CircleAvatar(
          child: Icon(Icons.person),
        ),
      ),
    );
  }
}

// For very large lists, use Sliver widgets
class SliverOptimizedList extends StatelessWidget {
  final List<String> items;
  
  const SliverOptimizedList({Key? key, required this.items}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          title: const Text('Optimized List'),
          floating: true,
          snap: true,
        ),
        SliverFixedExtentList(
          itemExtent: 60.0,
          delegate: SliverChildBuilderDelegate(
            (context, index) => OptimizedListItem(
              key: ValueKey(items[index]),
              title: items[index],
            ),
            childCount: items.length,
          ),
        ),
      ],
    );
  }
}
```

**3. Image Optimization:**

```dart
class OptimizedImageWidget extends StatelessWidget {
  final String imageUrl;
  final double width;
  final double height;
  
  const OptimizedImageWidget({
    Key? key,
    required this.imageUrl,
    required this.width,
    required this.height,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Image.network(
          imageUrl,
          width: width,
          height: height,
          fit: BoxFit.cover,
          // Optimize memory usage
          cacheWidth: width.toInt(),
          cacheHeight: height.toInt(),
          // Add loading and error handling
          loadingBuilder: (context, child, loadingProgress) {
            if (loadingProgress == null) return child;
            return Center(
              child: CircularProgressIndicator(
                value: loadingProgress.expectedTotalBytes != null
                    ? loadingProgress.cumulativeBytesLoaded /
                        loadingProgress.expectedTotalBytes!
                    : null,
              ),
            );
          },
          errorBuilder: (context, error, stackTrace) {
            return const Center(
              child: Icon(Icons.error, color: Colors.red),
            );
          },
        ),
      ),
    );
  }
}

// For better image caching, use cached_network_image
class CachedImageWidget extends StatelessWidget {
  final String imageUrl;
  final double width;
  final double height;
  
  const CachedImageWidget({
    Key? key,
    required this.imageUrl,
    required this.width,
    required this.height,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: imageUrl,
      width: width,
      height: height,
      fit: BoxFit.cover,
      memCacheWidth: width.toInt(),
      memCacheHeight: height.toInt(),
      placeholder: (context, url) => const Center(
        child: CircularProgressIndicator(),
      ),
      errorWidget: (context, url, error) => const Icon(Icons.error),
    );
  }
}
```

**4. State Management Optimization:**

```dart
// Using Provider with Selector for granular updates
class OptimizedProviderWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Only rebuilds when user name changes
        Selector<UserProvider, String>(
          selector: (context, provider) => provider.user.name,
          builder: (context, name, child) {
            return Text('Name: $name');
          },
        ),
        // Only rebuilds when user email changes
        Selector<UserProvider, String>(
          selector: (context, provider) => provider.user.email,
          builder: (context, email, child) {
            return Text('Email: $email');
          },
        ),
        // Static widget that never rebuilds
        Consumer<UserProvider>(
          builder: (context, provider, child) {
            return ElevatedButton(
              onPressed: provider.updateUser,
              child: child, // This child is passed from below
            );
          },
          child: const Text('Update User'), // This won't rebuild
        ),
      ],
    );
  }
}

// Using ValueNotifier for lightweight state management
class ValueNotifierExample extends StatefulWidget {
  @override
  _ValueNotifierExampleState createState() => _ValueNotifierExampleState();
}

class _ValueNotifierExampleState extends State<ValueNotifierExample> {
  final ValueNotifier<int> _counter = ValueNotifier<int>(0);
  
  @override
  void dispose() {
    _counter.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Only this widget rebuilds when counter changes
        ValueListenableBuilder<int>(
          valueListenable: _counter,
          builder: (context, value, child) {
            return Text('Counter: $value');
          },
        ),
        // This widget never rebuilds
        ElevatedButton(
          onPressed: () => _counter.value++,
          child: const Text('Increment'),
        ),
      ],
    );
  }
}
```

**5. Memory Management:**

```dart
class MemoryOptimizedWidget extends StatefulWidget {
  @override
  _MemoryOptimizedWidgetState createState() => _MemoryOptimizedWidgetState();
}

class _MemoryOptimizedWidgetState extends State<MemoryOptimizedWidget> {
  StreamSubscription? _subscription;
  Timer? _timer;
  AnimationController? _animationController;
  
  @override
  void initState() {
    super.initState();
    
    // Initialize resources
    _animationController = AnimationController(
      duration: const Duration(seconds: 1),
      vsync: this,
    );
    
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      // Periodic task
    });
    
    _subscription = someStream.listen((data) {
      // Handle stream data
    });
  }
  
  @override
  void dispose() {
    // Clean up resources to prevent memory leaks
    _animationController?.dispose();
    _timer?.cancel();
    _subscription?.cancel();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

// Lazy loading for expensive operations
class LazyLoadingWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<ExpensiveData>(
      future: _loadDataLazily(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        }
        
        if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        }
        
        return ExpensiveDataWidget(data: snapshot.data!);
      },
    );
  }
  
  Future<ExpensiveData> _loadDataLazily() async {
    // Load data only when needed
    await Future.delayed(const Duration(milliseconds: 500));
    return ExpensiveData();
  }
}
```

**6. Build Method Optimization:**

```dart
class OptimizedBuildWidget extends StatefulWidget {
  @override
  _OptimizedBuildWidgetState createState() => _OptimizedBuildWidgetState();
}

class _OptimizedBuildWidgetState extends State<OptimizedBuildWidget> {
  int _counter = 0;
  
  // Cache expensive computations
  late final List<Widget> _staticWidgets;
  
  @override
  void initState() {
    super.initState();
    _staticWidgets = _buildStaticWidgets();
  }
  
  List<Widget> _buildStaticWidgets() {
    return List.generate(100, (index) {
      return Container(
        height: 50,
        child: Text('Static Item $index'),
      );
    });
  }
  
  @override
  Widget build(BuildContext context) {
    // Avoid creating objects in build method
    return Column(
      children: [
        Text('Counter: $_counter'),
        ElevatedButton(
          onPressed: () => setState(() => _counter++),
          child: const Text('Increment'),
        ),
        // Use pre-built widgets
        Expanded(
          child: ListView(children: _staticWidgets),
        ),
      ],
    );
  }
}

// Use AutomaticKeepAliveClientMixin for expensive widgets
class KeepAliveWidget extends StatefulWidget {
  @override
  _KeepAliveWidgetState createState() => _KeepAliveWidgetState();
}

class _KeepAliveWidgetState extends State<KeepAliveWidget>
    with AutomaticKeepAliveClientMixin {
  
  @override
  bool get wantKeepAlive => true;
  
  @override
  Widget build(BuildContext context) {
    super.build(context); // Required for AutomaticKeepAliveClientMixin
    
    return ExpensiveWidget();
  }
}
```

**7. Animation Optimization:**

```dart
class OptimizedAnimationWidget extends StatefulWidget {
  @override
  _OptimizedAnimationWidgetState createState() => _OptimizedAnimationWidgetState();
}

class _OptimizedAnimationWidgetState extends State<OptimizedAnimationWidget>
    with TickerProviderStateMixin {
  
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    
    // Use Tween for better performance
    _animation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.scale(
          scale: _animation.value,
          child: child, // This child is passed from below and won't rebuild
        );
      },
      child: const ExpensiveChildWidget(), // Built once
    );
  }
}

// Use RepaintBoundary for complex animations
class RepaintBoundaryExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        RepaintBoundary(
          child: AnimatedContainer(
            duration: const Duration(seconds: 1),
            width: 100,
            height: 100,
            color: Colors.blue,
          ),
        ),
        // This won't repaint when the animation above changes
        const Text('Static content'),
      ],
    );
  }
}
```

**8. Performance Monitoring:**

```dart
class PerformanceMonitor {
  static void measureBuildTime(String widgetName, VoidCallback buildFunction) {
    final stopwatch = Stopwatch()..start();
    buildFunction();
    stopwatch.stop();
    
    if (kDebugMode) {
      print('$widgetName build time: ${stopwatch.elapsedMilliseconds}ms');
    }
  }
  
  static void measureFrameTime() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final renderTime = WidgetsBinding.instance.renderTimeMillis;
      if (renderTime > 16) { // 60 FPS = 16.67ms per frame
        print('Frame took ${renderTime}ms (target: 16ms)');
      }
    });
  }
}

// Usage in widget
class MonitoredWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return PerformanceMonitor.measureBuildTime('MonitoredWidget', () {
      PerformanceMonitor.measureFrameTime();
      
      return Container(
        child: ExpensiveWidget(),
      );
    }) as Widget;
  }
}
```

**9. Best Practices Summary:**

```dart
// Performance checklist
class PerformanceBestPractices {
  static const List<String> tips = [
    '1. Use const constructors wherever possible',
    '2. Minimize widget rebuilds with proper state management',
    '3. Use ListView.builder for large lists',
    '4. Implement proper dispose methods',
    '5. Cache expensive computations',
    '6. Use RepaintBoundary for isolated repaints',
    '7. Optimize images with proper sizing',
    '8. Use Selector with Provider for granular updates',
    '9. Avoid creating objects in build methods',
    '10. Use AutomaticKeepAliveClientMixin for expensive widgets',
    '11. Profile your app regularly with Flutter Inspector',
    '12. Use flutter run --profile for performance testing',
  ];
}
```

### Q11: How do you implement platform integration and native functionality in Flutter?

**Answer:**
Flutter provides several ways to integrate with platform-specific functionality through platform channels, plugins, and native code integration.

**1. Platform Channels (Method Channels):**

```dart
// Flutter side - main.dart
import 'package:flutter/services.dart';

class PlatformService {
  static const MethodChannel _channel = MethodChannel('com.example.app/platform');
  
  // Call native method
  static Future<String> getBatteryLevel() async {
    try {
      final int result = await _channel.invokeMethod('getBatteryLevel');
      return 'Battery level: $result%';
    } on PlatformException catch (e) {
      return 'Failed to get battery level: ${e.message}';
    }
  }
  
  // Call native method with parameters
  static Future<bool> saveToGallery(String imagePath) async {
    try {
      final bool result = await _channel.invokeMethod('saveToGallery', {
        'imagePath': imagePath,
      });
      return result;
    } on PlatformException catch (e) {
      print('Error saving to gallery: ${e.message}');
      return false;
    }
  }
  
  // Listen to native events
  static Stream<String> get locationUpdates {
    return const EventChannel('com.example.app/location')
        .receiveBroadcastStream()
        .map((dynamic event) => event.toString());
  }
}

// Usage in widget
class PlatformIntegrationWidget extends StatefulWidget {
  @override
  _PlatformIntegrationWidgetState createState() => _PlatformIntegrationWidgetState();
}

class _PlatformIntegrationWidgetState extends State<PlatformIntegrationWidget> {
  String _batteryLevel = 'Unknown';
  StreamSubscription<String>? _locationSubscription;
  String _currentLocation = 'Unknown';
  
  @override
  void initState() {
    super.initState();
    _getBatteryLevel();
    _startLocationUpdates();
  }
  
  @override
  void dispose() {
    _locationSubscription?.cancel();
    super.dispose();
  }
  
  Future<void> _getBatteryLevel() async {
    final batteryLevel = await PlatformService.getBatteryLevel();
    setState(() {
      _batteryLevel = batteryLevel;
    });
  }
  
  void _startLocationUpdates() {
    _locationSubscription = PlatformService.locationUpdates.listen(
      (location) {
        setState(() {
          _currentLocation = location;
        });
      },
      onError: (error) {
        print('Location error: $error');
      },
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Platform Integration')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Battery Level: $_batteryLevel'),
            const SizedBox(height: 16),
            Text('Location: $_currentLocation'),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _getBatteryLevel,
              child: const Text('Refresh Battery'),
            ),
          ],
        ),
      ),
    );
  }
}
```

**2. Android Implementation (Kotlin):**

```kotlin
// android/app/src/main/kotlin/MainActivity.kt
package com.example.app

import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.EventChannel
import io.flutter.plugin.common.MethodChannel
import android.Manifest
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.app/platform"
    private val LOCATION_CHANNEL = "com.example.app/location"
    private var locationManager: LocationManager? = null
    private var eventSink: EventChannel.EventSink? = null
    
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        
        // Method Channel
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL)
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    "getBatteryLevel" -> {
                        val batteryLevel = getBatteryLevel()
                        if (batteryLevel != -1) {
                            result.success(batteryLevel)
                        } else {
                            result.error("UNAVAILABLE", "Battery level not available.", null)
                        }
                    }
                    "saveToGallery" -> {
                        val imagePath = call.argument<String>("imagePath")
                        if (imagePath != null) {
                            val success = saveImageToGallery(imagePath)
                            result.success(success)
                        } else {
                            result.error("INVALID_ARGUMENT", "Image path is required", null)
                        }
                    }
                    else -> {
                        result.notImplemented()
                    }
                }
            }
        
        // Event Channel for location updates
        EventChannel(flutterEngine.dartExecutor.binaryMessenger, LOCATION_CHANNEL)
            .setStreamHandler(object : EventChannel.StreamHandler {
                override fun onListen(arguments: Any?, events: EventChannel.EventSink?) {
                    eventSink = events
                    startLocationUpdates()
                }
                
                override fun onCancel(arguments: Any?) {
                    eventSink = null
                    stopLocationUpdates()
                }
            })
    }
    
    private fun getBatteryLevel(): Int {
        val batteryLevel: Int
        if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
            val batteryManager = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
            batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
        } else {
            val intent = ContextWrapper(applicationContext).registerReceiver(
                null, IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            )
            batteryLevel = intent!!.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100 /
                    intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
        }
        return batteryLevel
    }
    
    private fun saveImageToGallery(imagePath: String): Boolean {
        return try {
            // Implementation to save image to gallery
            // This is a simplified example
            true
        } catch (e: Exception) {
            false
        }
    }
    
    private fun startLocationUpdates() {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
            
            val locationListener = object : LocationListener {
                override fun onLocationChanged(location: Location) {
                    val locationString = "Lat: ${location.latitude}, Lng: ${location.longitude}"
                    eventSink?.success(locationString)
                }
                
                override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
                override fun onProviderEnabled(provider: String) {}
                override fun onProviderDisabled(provider: String) {}
            }
            
            locationManager?.requestLocationUpdates(
                LocationManager.GPS_PROVIDER,
                1000L, // 1 second
                1f, // 1 meter
                locationListener
            )
        }
    }
    
    private fun stopLocationUpdates() {
        locationManager?.removeUpdates(locationListener)
    }
}
```

**3. iOS Implementation (Swift):**

```swift
// ios/Runner/AppDelegate.swift
import UIKit
import Flutter
import CoreLocation

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate, CLLocationManagerDelegate {
    private var locationManager: CLLocationManager?
    private var eventSink: FlutterEventSink?
    
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
        
        // Method Channel
        let platformChannel = FlutterMethodChannel(
            name: "com.example.app/platform",
            binaryMessenger: controller.binaryMessenger
        )
        
        platformChannel.setMethodCallHandler { [weak self] (call: FlutterMethodCall, result: @escaping FlutterResult) in
            switch call.method {
            case "getBatteryLevel":
                self?.receiveBatteryLevel(result: result)
            case "saveToGallery":
                if let args = call.arguments as? [String: Any],
                   let imagePath = args["imagePath"] as? String {
                    let success = self?.saveImageToGallery(imagePath: imagePath) ?? false
                    result(success)
                } else {
                    result(FlutterError(code: "INVALID_ARGUMENT", message: "Image path is required", details: nil))
                }
            default:
                result(FlutterMethodNotImplemented)
            }
        }
        
        // Event Channel
        let locationChannel = FlutterEventChannel(
            name: "com.example.app/location",
            binaryMessenger: controller.binaryMessenger
        )
        
        locationChannel.setStreamHandler(LocationStreamHandler())
        
        GeneratedPluginRegistrant.register(with: self)
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
    
    private func receiveBatteryLevel(result: FlutterResult) {
        let device = UIDevice.current
        device.isBatteryMonitoringEnabled = true
        
        if device.batteryState == UIDevice.BatteryState.unknown {
            result(FlutterError(code: "UNAVAILABLE", message: "Battery level not available.", details: nil))
        } else {
            result(Int(device.batteryLevel * 100))
        }
    }
    
    private func saveImageToGallery(imagePath: String) -> Bool {
        // Implementation to save image to photo library
        // This is a simplified example
        return true
    }
}

class LocationStreamHandler: NSObject, FlutterStreamHandler, CLLocationManagerDelegate {
    private var locationManager: CLLocationManager?
    private var eventSink: FlutterEventSink?
    
    func onListen(withArguments arguments: Any?, eventSink events: @escaping FlutterEventSink) -> FlutterError? {
        self.eventSink = events
        
        locationManager = CLLocationManager()
        locationManager?.delegate = self
        locationManager?.requestWhenInUseAuthorization()
        locationManager?.startUpdatingLocation()
        
        return nil
    }
    
    func onCancel(withArguments arguments: Any?) -> FlutterError? {
        locationManager?.stopUpdatingLocation()
        locationManager = nil
        eventSink = nil
        return nil
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last {
            let locationString = "Lat: \(location.coordinate.latitude), Lng: \(location.coordinate.longitude)"
            eventSink?(locationString)
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        eventSink?(FlutterError(code: "LOCATION_ERROR", message: error.localizedDescription, details: nil))
    }
}
```

**4. Using Existing Plugins:**

```dart
// pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  camera: ^0.10.5
  geolocator: ^9.0.2
  shared_preferences: ^2.2.0
  url_launcher: ^6.1.12
  device_info_plus: ^9.1.0
  connectivity_plus: ^4.0.2
  permission_handler: ^10.4.3

// Using popular plugins
class PluginIntegrationExample extends StatefulWidget {
  @override
  _PluginIntegrationExampleState createState() => _PluginIntegrationExampleState();
}

class _PluginIntegrationExampleState extends State<PluginIntegrationExample> {
  String _deviceInfo = '';
  String _connectivity = '';
  Position? _currentPosition;
  
  @override
  void initState() {
    super.initState();
    _getDeviceInfo();
    _checkConnectivity();
    _getCurrentLocation();
  }
  
  Future<void> _getDeviceInfo() async {
    final deviceInfo = DeviceInfoPlugin();
    if (Platform.isAndroid) {
      final androidInfo = await deviceInfo.androidInfo;
      setState(() {
        _deviceInfo = 'Android ${androidInfo.version.release} (${androidInfo.model})';
      });
    } else if (Platform.isIOS) {
      final iosInfo = await deviceInfo.iosInfo;
      setState(() {
        _deviceInfo = 'iOS ${iosInfo.systemVersion} (${iosInfo.model})';
      });
    }
  }
  
  Future<void> _checkConnectivity() async {
    final connectivityResult = await Connectivity().checkConnectivity();
    setState(() {
      _connectivity = connectivityResult.toString();
    });
    
    // Listen to connectivity changes
    Connectivity().onConnectivityChanged.listen((ConnectivityResult result) {
      setState(() {
        _connectivity = result.toString();
      });
    });
  }
  
  Future<void> _getCurrentLocation() async {
    // Check permissions
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return;
      }
    }
    
    if (permission == LocationPermission.deniedForever) {
      return;
    }
    
    // Get current position
    try {
      final position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
      setState(() {
        _currentPosition = position;
      });
    } catch (e) {
      print('Error getting location: $e');
    }
  }
  
  Future<void> _openUrl(String url) async {
    if (await canLaunchUrl(Uri.parse(url))) {
      await launchUrl(Uri.parse(url));
    }
  }
  
  Future<void> _savePreference() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user_name', 'John Doe');
    await prefs.setInt('user_age', 25);
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Plugin Integration')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Device: $_deviceInfo'),
            const SizedBox(height: 8),
            Text('Connectivity: $_connectivity'),
            const SizedBox(height: 8),
            Text(
              'Location: ${_currentPosition?.latitude ?? 'Unknown'}, ${_currentPosition?.longitude ?? 'Unknown'}',
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => _openUrl('https://flutter.dev'),
              child: const Text('Open Flutter Website'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _savePreference,
              child: const Text('Save Preference'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _getCurrentLocation,
              child: const Text('Refresh Location'),
            ),
          ],
        ),
      ),
    );
  }
}
```

**5. Creating Custom Plugin:**

```bash
# Create a new plugin
flutter create --template=plugin --platforms=android,ios my_custom_plugin
```

```dart
// lib/my_custom_plugin.dart
import 'dart:async';
import 'package:flutter/services.dart';

class MyCustomPlugin {
  static const MethodChannel _channel = MethodChannel('my_custom_plugin');
  
  static Future<String?> get platformVersion async {
    final String? version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }
  
  static Future<bool> showNativeDialog(String title, String message) async {
    try {
      final bool result = await _channel.invokeMethod('showNativeDialog', {
        'title': title,
        'message': message,
      });
      return result;
    } on PlatformException catch (e) {
      print('Error showing native dialog: ${e.message}');
      return false;
    }
  }
}
```

**6. Permission Handling:**

```dart
class PermissionHandler {
  static Future<bool> requestCameraPermission() async {
    final status = await Permission.camera.request();
    return status == PermissionStatus.granted;
  }
  
  static Future<bool> requestLocationPermission() async {
    final status = await Permission.location.request();
    return status == PermissionStatus.granted;
  }
  
  static Future<bool> requestStoragePermission() async {
    final status = await Permission.storage.request();
    return status == PermissionStatus.granted;
  }
  
  static Future<Map<Permission, PermissionStatus>> requestMultiplePermissions() async {
    return await [
      Permission.camera,
      Permission.microphone,
      Permission.location,
      Permission.storage,
    ].request();
  }
  
  static Future<void> openAppSettings() async {
    await openAppSettings();
  }
}

// Usage in widget
class PermissionWidget extends StatefulWidget {
  @override
  _PermissionWidgetState createState() => _PermissionWidgetState();
}

class _PermissionWidgetState extends State<PermissionWidget> {
  Map<Permission, PermissionStatus> _permissions = {};
  
  @override
  void initState() {
    super.initState();
    _checkPermissions();
  }
  
  Future<void> _checkPermissions() async {
    final permissions = await PermissionHandler.requestMultiplePermissions();
    setState(() {
      _permissions = permissions;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Permissions')),
      body: ListView(
        children: _permissions.entries.map((entry) {
          return ListTile(
            title: Text(entry.key.toString()),
            subtitle: Text(entry.value.toString()),
            trailing: entry.value == PermissionStatus.denied
                ? ElevatedButton(
                    onPressed: () async {
                      final status = await entry.key.request();
                      setState(() {
                        _permissions[entry.key] = status;
                      });
                    },
                    child: const Text('Request'),
                  )
                : Icon(
                    entry.value == PermissionStatus.granted
                        ? Icons.check_circle
                        : Icons.error,
                    color: entry.value == PermissionStatus.granted
                        ? Colors.green
                        : Colors.red,
                  ),
          );
        }).toList(),
      ),
    );
  }
}
```

**7. Platform-Specific UI:**

```dart
class PlatformSpecificWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Platform Specific'),
        // Platform-specific app bar
        backgroundColor: Platform.isIOS ? CupertinoColors.systemBlue : Colors.blue,
      ),
      body: Column(
        children: [
          // Platform-specific button
          Platform.isIOS
              ? CupertinoButton(
                  onPressed: () {},
                  child: const Text('iOS Button'),
                )
              : ElevatedButton(
                  onPressed: () {},
                  child: const Text('Android Button'),
                ),
          
          // Platform-specific dialog
          ElevatedButton(
            onPressed: () => _showPlatformDialog(context),
            child: const Text('Show Platform Dialog'),
          ),
          
          // Platform-specific switch
          Platform.isIOS
              ? CupertinoSwitch(
                  value: true,
                  onChanged: (value) {},
                )
              : Switch(
                  value: true,
                  onChanged: (value) {},
                ),
        ],
      ),
    );
  }
  
  void _showPlatformDialog(BuildContext context) {
    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) => CupertinoAlertDialog(
          title: const Text('iOS Dialog'),
          content: const Text('This is a Cupertino dialog'),
          actions: [
            CupertinoDialogAction(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        ),
      );
    } else {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Android Dialog'),
          content: const Text('This is a Material dialog'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        ),
      );
    }
  }
}
```

### Q12: How do you create custom widgets and implement widget composition in Flutter?

**Answer:**
Custom widgets in Flutter allow you to create reusable, composable UI components that encapsulate specific functionality and styling. Widget composition is a fundamental concept in Flutter for building complex UIs from simpler components.

**1. Creating Custom Stateless Widgets:**

```dart
// Simple custom widget
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color? backgroundColor;
  final Color? textColor;
  final double? width;
  final double? height;
  final IconData? icon;
  
  const CustomButton({
    Key? key,
    required this.text,
    this.onPressed,
    this.backgroundColor,
    this.textColor,
    this.width,
    this.height,
    this.icon,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height ?? 48,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: backgroundColor ?? Theme.of(context).primaryColor,
          foregroundColor: textColor ?? Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          elevation: 2,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ..[
              Icon(icon, size: 18),
              const SizedBox(width: 8),
            ],
            Text(
              text,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: textColor ?? Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Advanced custom widget with multiple child widgets
class CustomCard extends StatelessWidget {
  final Widget? header;
  final Widget? body;
  final Widget? footer;
  final EdgeInsetsGeometry? padding;
  final Color? backgroundColor;
  final double? elevation;
  final BorderRadius? borderRadius;
  
  const CustomCard({
    Key? key,
    this.header,
    this.body,
    this.footer,
    this.padding,
    this.backgroundColor,
    this.elevation,
    this.borderRadius,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: elevation ?? 4,
      color: backgroundColor ?? Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: borderRadius ?? BorderRadius.circular(12),
      ),
      child: Padding(
        padding: padding ?? const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (header != null) ..[
              header!,
              const SizedBox(height: 12),
            ],
            if (body != null) ..[
              Flexible(child: body!),
            ],
            if (footer != null) ..[
              const SizedBox(height: 12),
              footer!,
            ],
          ],
        ),
      ),
    );
  }
}

// Usage examples
class CustomWidgetExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Custom Widgets')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            CustomButton(
              text: 'Primary Button',
              icon: Icons.star,
              onPressed: () => print('Primary button pressed'),
            ),
            const SizedBox(height: 16),
            CustomButton(
              text: 'Secondary Button',
              backgroundColor: Colors.grey[300],
              textColor: Colors.black87,
              width: double.infinity,
              onPressed: () => print('Secondary button pressed'),
            ),
            const SizedBox(height: 16),
            CustomCard(
              header: Row(
                children: [
                  Icon(Icons.person, color: Colors.blue),
                  const SizedBox(width: 8),
                  Text(
                    'User Profile',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              body: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Name: John Doe'),
                  Text('Email: john.doe@example.com'),
                  Text('Role: Developer'),
                ],
              ),
              footer: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () {},
                    child: Text('Edit'),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: Text('Delete'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

**2. Creating Custom Stateful Widgets:**

```dart
// Custom input field with validation
class CustomTextField extends StatefulWidget {
  final String label;
  final String? hint;
  final String? initialValue;
  final TextInputType? keyboardType;
  final bool obscureText;
  final String? Function(String?)? validator;
  final void Function(String)? onChanged;
  final void Function(String)? onSubmitted;
  final IconData? prefixIcon;
  final Widget? suffixIcon;
  final int? maxLines;
  final bool enabled;
  
  const CustomTextField({
    Key? key,
    required this.label,
    this.hint,
    this.initialValue,
    this.keyboardType,
    this.obscureText = false,
    this.validator,
    this.onChanged,
    this.onSubmitted,
    this.prefixIcon,
    this.suffixIcon,
    this.maxLines = 1,
    this.enabled = true,
  }) : super(key: key);
  
  @override
  _CustomTextFieldState createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late TextEditingController _controller;
  late FocusNode _focusNode;
  String? _errorText;
  
  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialValue);
    _focusNode = FocusNode();
    
    _focusNode.addListener(() {
      if (!_focusNode.hasFocus && widget.validator != null) {
        setState(() {
          _errorText = widget.validator!(_controller.text);
        });
      }
    });
  }
  
  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: Colors.grey[700],
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: _controller,
          focusNode: _focusNode,
          keyboardType: widget.keyboardType,
          obscureText: widget.obscureText,
          maxLines: widget.maxLines,
          enabled: widget.enabled,
          decoration: InputDecoration(
            hintText: widget.hint,
            prefixIcon: widget.prefixIcon != null ? Icon(widget.prefixIcon) : null,
            suffixIcon: widget.suffixIcon,
            errorText: _errorText,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide(color: Colors.grey[300]!),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide(color: Colors.grey[300]!),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide(color: Theme.of(context).primaryColor),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: Colors.red),
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 12,
            ),
          ),
          onChanged: (value) {
            widget.onChanged?.call(value);
            if (_errorText != null && widget.validator != null) {
              setState(() {
                _errorText = widget.validator!(value);
              });
            }
          },
          onFieldSubmitted: widget.onSubmitted,
        ),
      ],
    );
  }
}

// Custom animated counter widget
class AnimatedCounter extends StatefulWidget {
  final int value;
  final Duration duration;
  final TextStyle? textStyle;
  
  const AnimatedCounter({
    Key? key,
    required this.value,
    this.duration = const Duration(milliseconds: 500),
    this.textStyle,
  }) : super(key: key);
  
  @override
  _AnimatedCounterState createState() => _AnimatedCounterState();
}

class _AnimatedCounterState extends State<AnimatedCounter>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  int _previousValue = 0;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: widget.duration,
      vsync: this,
    );
    _animation = Tween<double>(
      begin: 0,
      end: widget.value.toDouble(),
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
    _controller.forward();
  }
  
  @override
  void didUpdateWidget(AnimatedCounter oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value) {
      _previousValue = oldWidget.value;
      _animation = Tween<double>(
        begin: _previousValue.toDouble(),
        end: widget.value.toDouble(),
      ).animate(CurvedAnimation(
        parent: _controller,
        curve: Curves.easeInOut,
      ));
      _controller.reset();
      _controller.forward();
    }
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Text(
          _animation.value.round().toString(),
          style: widget.textStyle ?? TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        );
      },
    );
  }
}
```

**3. Widget Composition and Builder Patterns:**

```dart
// Composable list item widget
class ListItemWidget extends StatelessWidget {
  final Widget? leading;
  final Widget title;
  final Widget? subtitle;
  final Widget? trailing;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry? padding;
  final Color? backgroundColor;
  
  const ListItemWidget({
    Key? key,
    this.leading,
    required this.title,
    this.subtitle,
    this.trailing,
    this.onTap,
    this.padding,
    this.backgroundColor,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      color: backgroundColor,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: padding ?? const EdgeInsets.all(16),
          child: Row(
            children: [
              if (leading != null) ..[
                leading!,
                const SizedBox(width: 16),
              ],
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    title,
                    if (subtitle != null) ..[
                      const SizedBox(height: 4),
                      subtitle!,
                    ],
                  ],
                ),
              ),
              if (trailing != null) ..[
                const SizedBox(width: 16),
                trailing!,
              ],
            ],
          ),
        ),
      ),
    );
  }
}

// Builder widget for complex compositions
class CustomListBuilder extends StatelessWidget {
  final List<dynamic> items;
  final Widget Function(BuildContext context, dynamic item, int index) itemBuilder;
  final Widget Function(BuildContext context)? emptyBuilder;
  final Widget Function(BuildContext context)? loadingBuilder;
  final bool isLoading;
  final EdgeInsetsGeometry? padding;
  final ScrollPhysics? physics;
  
  const CustomListBuilder({
    Key? key,
    required this.items,
    required this.itemBuilder,
    this.emptyBuilder,
    this.loadingBuilder,
    this.isLoading = false,
    this.padding,
    this.physics,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return loadingBuilder?.call(context) ?? 
          const Center(child: CircularProgressIndicator());
    }
    
    if (items.isEmpty) {
      return emptyBuilder?.call(context) ?? 
          const Center(child: Text('No items found'));
    }
    
    return ListView.builder(
      padding: padding,
      physics: physics,
      itemCount: items.length,
      itemBuilder: (context, index) {
        return itemBuilder(context, items[index], index);
      },
    );
  }
}

// Usage of composed widgets
class ComposedWidgetExample extends StatelessWidget {
  final List<User> users = [
    User(name: 'John Doe', email: 'john@example.com', avatar: 'J'),
    User(name: 'Jane Smith', email: 'jane@example.com', avatar: 'J'),
    User(name: 'Bob Johnson', email: 'bob@example.com', avatar: 'B'),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Composed Widgets')),
      body: CustomListBuilder(
        items: users,
        padding: const EdgeInsets.all(16),
        itemBuilder: (context, user, index) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: ListItemWidget(
              leading: CircleAvatar(
                backgroundColor: Colors.blue,
                child: Text(
                  user.avatar,
                  style: const TextStyle(color: Colors.white),
                ),
              ),
              title: Text(
                user.name,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
              subtitle: Text(
                user.email,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[600],
                ),
              ),
              trailing: Icon(Icons.arrow_forward_ios, size: 16),
              onTap: () => print('Tapped on ${user.name}'),
              backgroundColor: Colors.grey[50],
            ),
          );
        },
        emptyBuilder: (context) => const Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.people_outline, size: 64, color: Colors.grey),
              SizedBox(height: 16),
              Text('No users found', style: TextStyle(fontSize: 18)),
            ],
          ),
        ),
      ),
    );
  }
}

class User {
  final String name;
  final String email;
  final String avatar;
  
  User({required this.name, required this.email, required this.avatar});
}
```

**4. Advanced Custom Widget with Inherited Widget:**

```dart
// Theme provider using InheritedWidget
class CustomTheme extends InheritedWidget {
  final CustomThemeData themeData;
  
  const CustomTheme({
    Key? key,
    required this.themeData,
    required Widget child,
  }) : super(key: key, child: child);
  
  static CustomTheme? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<CustomTheme>();
  }
  
  @override
  bool updateShouldNotify(CustomTheme oldWidget) {
    return themeData != oldWidget.themeData;
  }
}

class CustomThemeData {
  final Color primaryColor;
  final Color secondaryColor;
  final Color backgroundColor;
  final TextStyle titleTextStyle;
  final TextStyle bodyTextStyle;
  final double borderRadius;
  
  const CustomThemeData({
    required this.primaryColor,
    required this.secondaryColor,
    required this.backgroundColor,
    required this.titleTextStyle,
    required this.bodyTextStyle,
    required this.borderRadius,
  });
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is CustomThemeData &&
        other.primaryColor == primaryColor &&
        other.secondaryColor == secondaryColor &&
        other.backgroundColor == backgroundColor &&
        other.titleTextStyle == titleTextStyle &&
        other.bodyTextStyle == bodyTextStyle &&
        other.borderRadius == borderRadius;
  }
  
  @override
  int get hashCode {
    return Object.hash(
      primaryColor,
      secondaryColor,
      backgroundColor,
      titleTextStyle,
      bodyTextStyle,
      borderRadius,
    );
  }
}

// Widget that uses the custom theme
class ThemedWidget extends StatelessWidget {
  final String title;
  final String content;
  
  const ThemedWidget({
    Key? key,
    required this.title,
    required this.content,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    final theme = CustomTheme.of(context)?.themeData;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme?.backgroundColor ?? Colors.white,
        borderRadius: BorderRadius.circular(theme?.borderRadius ?? 8),
        border: Border.all(color: theme?.primaryColor ?? Colors.blue),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: theme?.titleTextStyle ?? const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            content,
            style: theme?.bodyTextStyle ?? const TextStyle(fontSize: 14),
          ),
        ],
      ),
    );
  }
}

// Usage with custom theme
class ThemedApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomTheme(
      themeData: const CustomThemeData(
        primaryColor: Colors.purple,
        secondaryColor: Colors.purpleAccent,
        backgroundColor: Colors.purple50,
        titleTextStyle: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.purple,
        ),
        bodyTextStyle: TextStyle(
          fontSize: 16,
          color: Colors.purple700,
        ),
        borderRadius: 12,
      ),
      child: Scaffold(
        appBar: AppBar(title: const Text('Themed Widgets')),
        body: const Padding(
          padding: EdgeInsets.all(16),
          child: ThemedWidget(
            title: 'Custom Theme Example',
            content: 'This widget uses the custom theme provided by the CustomTheme InheritedWidget.',
          ),
        ),
      ),
    );
  }
}
```

**5. Widget Composition Best Practices:**

```dart
// Mixin for common widget functionality
mixin LoadingStateMixin<T extends StatefulWidget> on State<T> {
  bool _isLoading = false;
  
  bool get isLoading => _isLoading;
  
  void setLoading(bool loading) {
    if (mounted) {
      setState(() {
        _isLoading = loading;
      });
    }
  }
  
  Widget buildWithLoading(Widget child) {
    return Stack(
      children: [
        child,
        if (_isLoading)
          Container(
            color: Colors.black26,
            child: const Center(
              child: CircularProgressIndicator(),
            ),
          ),
      ],
    );
  }
}

// Widget that uses the mixin
class LoadingExampleWidget extends StatefulWidget {
  @override
  _LoadingExampleWidgetState createState() => _LoadingExampleWidgetState();
}

class _LoadingExampleWidgetState extends State<LoadingExampleWidget>
    with LoadingStateMixin {
  
  Future<void> _simulateLoading() async {
    setLoading(true);
    await Future.delayed(const Duration(seconds: 2));
    setLoading(false);
  }
  
  @override
  Widget build(BuildContext context) {
    return buildWithLoading(
      Scaffold(
        appBar: AppBar(title: const Text('Loading Example')),
        body: Center(
          child: ElevatedButton(
            onPressed: isLoading ? null : _simulateLoading,
            child: const Text('Start Loading'),
          ),
        ),
      ),
    );
  }
}
```

### Q13: How do you implement responsive design and adaptive layouts in Flutter?

**Answer:**
Responsive design in Flutter involves creating layouts that adapt to different screen sizes, orientations, and device types. Flutter provides several tools and techniques to build adaptive UIs that work well across phones, tablets, and desktop platforms.

**1. Using MediaQuery for Screen Information:**

```dart
class ResponsiveExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final screenWidth = mediaQuery.size.width;
    final screenHeight = mediaQuery.size.height;
    final orientation = mediaQuery.orientation;
    final devicePixelRatio = mediaQuery.devicePixelRatio;
    
    // Define breakpoints
    bool isMobile = screenWidth < 600;
    bool isTablet = screenWidth >= 600 && screenWidth < 1024;
    bool isDesktop = screenWidth >= 1024;
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Responsive Design'),
        backgroundColor: isMobile ? Colors.blue : isTablet ? Colors.green : Colors.purple,
      ),
      body: Padding(
        padding: EdgeInsets.all(isMobile ? 16 : 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Screen Info',
              style: TextStyle(
                fontSize: isMobile ? 20 : 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            _buildInfoCard('Width', '${screenWidth.toInt()}px'),
            _buildInfoCard('Height', '${screenHeight.toInt()}px'),
            _buildInfoCard('Orientation', orientation.name),
            _buildInfoCard('Device Type', 
              isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'),
            _buildInfoCard('Pixel Ratio', devicePixelRatio.toString()),
            SizedBox(height: 24),
            Expanded(
              child: _buildResponsiveGrid(context),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildInfoCard(String label, String value) {
    return Card(
      margin: EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: EdgeInsets.all(12),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: TextStyle(fontWeight: FontWeight.w500)),
            Text(value, style: TextStyle(color: Colors.grey[600])),
          ],
        ),
      ),
    );
  }
  
  Widget _buildResponsiveGrid(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    int crossAxisCount;
    
    if (screenWidth < 600) {
      crossAxisCount = 2; // Mobile: 2 columns
    } else if (screenWidth < 1024) {
      crossAxisCount = 3; // Tablet: 3 columns
    } else {
      crossAxisCount = 4; // Desktop: 4 columns
    }
    
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: crossAxisCount,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1,
      ),
      itemCount: 12,
      itemBuilder: (context, index) {
        return Container(
          decoration: BoxDecoration(
            color: Colors.blue[100 * ((index % 9) + 1)],
            borderRadius: BorderRadius.circular(8),
          ),
          child: Center(
            child: Text(
              'Item ${index + 1}',
              style: TextStyle(
                fontSize: screenWidth < 600 ? 14 : 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        );
      },
    );
  }
}
```

**2. Using LayoutBuilder for Widget-Level Responsiveness:**

```dart
class LayoutBuilderExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('LayoutBuilder Example')),
      body: LayoutBuilder(
        builder: (context, constraints) {
          // Use constraints to determine layout
          if (constraints.maxWidth > 800) {
            return _buildDesktopLayout();
          } else if (constraints.maxWidth > 600) {
            return _buildTabletLayout();
          } else {
            return _buildMobileLayout();
          }
        },
      ),
    );
  }
  
  Widget _buildDesktopLayout() {
    return Row(
      children: [
        // Sidebar
        Container(
          width: 250,
          color: Colors.grey[200],
          child: _buildSidebar(),
        ),
        // Main content
        Expanded(
          flex: 2,
          child: _buildMainContent(),
        ),
        // Right panel
        Container(
          width: 300,
          color: Colors.grey[100],
          child: _buildRightPanel(),
        ),
      ],
    );
  }
  
  Widget _buildTabletLayout() {
    return Row(
      children: [
        // Sidebar (collapsed)
        Container(
          width: 80,
          color: Colors.grey[200],
          child: _buildCollapsedSidebar(),
        ),
        // Main content with right panel below
        Expanded(
          child: Column(
            children: [
              Expanded(
                flex: 2,
                child: _buildMainContent(),
              ),
              Expanded(
                flex: 1,
                child: _buildRightPanel(),
              ),
            ],
          ),
        ),
      ],
    );
  }
  
  Widget _buildMobileLayout() {
    return Column(
      children: [
        // Top navigation
        Container(
          height: 60,
          color: Colors.grey[200],
          child: _buildTopNavigation(),
        ),
        // Main content
        Expanded(
          child: _buildMainContent(),
        ),
      ],
    );
  }
  
  Widget _buildSidebar() {
    return ListView(
      padding: EdgeInsets.all(16),
      children: [
        Text('Navigation', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        SizedBox(height: 16),
        _buildNavItem(Icons.home, 'Home'),
        _buildNavItem(Icons.person, 'Profile'),
        _buildNavItem(Icons.settings, 'Settings'),
        _buildNavItem(Icons.help, 'Help'),
      ],
    );
  }
  
  Widget _buildCollapsedSidebar() {
    return Column(
      children: [
        SizedBox(height: 16),
        IconButton(icon: Icon(Icons.home), onPressed: () {}),
        IconButton(icon: Icon(Icons.person), onPressed: () {}),
        IconButton(icon: Icon(Icons.settings), onPressed: () {}),
        IconButton(icon: Icon(Icons.help), onPressed: () {}),
      ],
    );
  }
  
  Widget _buildTopNavigation() {
    return Row(
      children: [
        IconButton(icon: Icon(Icons.menu), onPressed: () {}),
        Expanded(child: Text('App Title', style: TextStyle(fontSize: 18))),
        IconButton(icon: Icon(Icons.search), onPressed: () {}),
        IconButton(icon: Icon(Icons.more_vert), onPressed: () {}),
      ],
    );
  }
  
  Widget _buildNavItem(IconData icon, String title) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {},
    );
  }
  
  Widget _buildMainContent() {
    return Container(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Main Content',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 16),
          Expanded(
            child: ListView.builder(
              itemCount: 20,
              itemBuilder: (context, index) {
                return Card(
                  margin: EdgeInsets.only(bottom: 8),
                  child: ListTile(
                    leading: CircleAvatar(child: Text('${index + 1}')),
                    title: Text('Item ${index + 1}'),
                    subtitle: Text('Description for item ${index + 1}'),
                    trailing: Icon(Icons.arrow_forward_ios),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildRightPanel() {
    return Container(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Side Panel',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 16),
          Card(
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Column(
                children: [
                  Icon(Icons.info, size: 48, color: Colors.blue),
                  SizedBox(height: 8),
                  Text('Information'),
                  Text('Additional details here'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

**3. Creating Responsive Widgets with Flexible and Expanded:**

```dart
class FlexibleResponsiveWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Flexible & Expanded')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            // Responsive row with flexible widgets
            Container(
              height: 100,
              child: Row(
                children: [
                  Flexible(
                    flex: 2,
                    child: Container(
                      color: Colors.red[200],
                      child: Center(child: Text('Flex 2')),
                    ),
                  ),
                  SizedBox(width: 8),
                  Flexible(
                    flex: 3,
                    child: Container(
                      color: Colors.green[200],
                      child: Center(child: Text('Flex 3')),
                    ),
                  ),
                  SizedBox(width: 8),
                  Flexible(
                    flex: 1,
                    child: Container(
                      color: Colors.blue[200],
                      child: Center(child: Text('Flex 1')),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 16),
            // Responsive with MediaQuery
            LayoutBuilder(
              builder: (context, constraints) {
                bool isWide = constraints.maxWidth > 600;
                
                if (isWide) {
                  return Row(
                    children: [
                      Expanded(child: _buildCard('Card 1', Colors.purple[200]!)),
                      SizedBox(width: 16),
                      Expanded(child: _buildCard('Card 2', Colors.orange[200]!)),
                      SizedBox(width: 16),
                      Expanded(child: _buildCard('Card 3', Colors.teal[200]!)),
                    ],
                  );
                } else {
                  return Column(
                    children: [
                      _buildCard('Card 1', Colors.purple[200]!),
                      SizedBox(height: 8),
                      _buildCard('Card 2', Colors.orange[200]!),
                      SizedBox(height: 8),
                      _buildCard('Card 3', Colors.teal[200]!),
                    ],
                  );
                }
              },
            ),
            SizedBox(height: 16),
            // Responsive text sizing
            LayoutBuilder(
              builder: (context, constraints) {
                double fontSize = constraints.maxWidth < 400 ? 14 : 
                                 constraints.maxWidth < 800 ? 16 : 18;
                
                return Text(
                  'This text size adapts to screen width',
                  style: TextStyle(
                    fontSize: fontSize,
                    fontWeight: FontWeight.w500,
                  ),
                  textAlign: TextAlign.center,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildCard(String title, Color color) {
    return Container(
      height: 120,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: Text(
          title,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
```

**4. Orientation-Aware Layouts:**

```dart
class OrientationAwareWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Orientation Aware')),
      body: OrientationBuilder(
        builder: (context, orientation) {
          if (orientation == Orientation.landscape) {
            return _buildLandscapeLayout();
          } else {
            return _buildPortraitLayout();
          }
        },
      ),
    );
  }
  
  Widget _buildPortraitLayout() {
    return Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          Container(
            height: 200,
            width: double.infinity,
            color: Colors.blue[200],
            child: Center(
              child: Text(
                'Portrait Header',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          SizedBox(height: 16),
          Expanded(
            child: ListView.builder(
              itemCount: 10,
              itemBuilder: (context, index) {
                return Card(
                  margin: EdgeInsets.only(bottom: 8),
                  child: ListTile(
                    leading: Icon(Icons.star),
                    title: Text('Item ${index + 1}'),
                    subtitle: Text('Portrait layout item'),
                    trailing: Icon(Icons.arrow_forward),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildLandscapeLayout() {
    return Padding(
      padding: EdgeInsets.all(16),
      child: Row(
        children: [
          // Left panel
          Container(
            width: 200,
            color: Colors.blue[200],
            child: Center(
              child: Text(
                'Landscape\nSidebar',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          SizedBox(width: 16),
          // Main content
          Expanded(
            child: GridView.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
                childAspectRatio: 1.5,
              ),
              itemCount: 12,
              itemBuilder: (context, index) {
                return Container(
                  decoration: BoxDecoration(
                    color: Colors.green[200],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: Text(
                      'Grid ${index + 1}',
                      style: TextStyle(fontWeight: FontWeight.w500),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
```

**5. Custom Responsive Helper Class:**

```dart
class ResponsiveHelper {
  static const double mobileBreakpoint = 600;
  static const double tabletBreakpoint = 1024;
  
  static bool isMobile(BuildContext context) {
    return MediaQuery.of(context).size.width < mobileBreakpoint;
  }
  
  static bool isTablet(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width >= mobileBreakpoint && width < tabletBreakpoint;
  }
  
  static bool isDesktop(BuildContext context) {
    return MediaQuery.of(context).size.width >= tabletBreakpoint;
  }
  
  static double getResponsiveFontSize(BuildContext context, {
    double mobile = 14,
    double tablet = 16,
    double desktop = 18,
  }) {
    if (isMobile(context)) return mobile;
    if (isTablet(context)) return tablet;
    return desktop;
  }
  
  static EdgeInsets getResponsivePadding(BuildContext context, {
    EdgeInsets mobile = const EdgeInsets.all(16),
    EdgeInsets tablet = const EdgeInsets.all(24),
    EdgeInsets desktop = const EdgeInsets.all(32),
  }) {
    if (isMobile(context)) return mobile;
    if (isTablet(context)) return tablet;
    return desktop;
  }
  
  static int getGridColumns(BuildContext context, {
    int mobile = 2,
    int tablet = 3,
    int desktop = 4,
  }) {
    if (isMobile(context)) return mobile;
    if (isTablet(context)) return tablet;
    return desktop;
  }
}

// Usage of ResponsiveHelper
class ResponsiveHelperExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Responsive Helper')),
      body: Padding(
        padding: ResponsiveHelper.getResponsivePadding(context),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Responsive Title',
              style: TextStyle(
                fontSize: ResponsiveHelper.getResponsiveFontSize(
                  context,
                  mobile: 20,
                  tablet: 24,
                  desktop: 28,
                ),
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            Text(
              'Device Type: ${ResponsiveHelper.isMobile(context) ? "Mobile" : ResponsiveHelper.isTablet(context) ? "Tablet" : "Desktop"}',
              style: TextStyle(
                fontSize: ResponsiveHelper.getResponsiveFontSize(context),
              ),
            ),
            SizedBox(height: 24),
            Expanded(
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: ResponsiveHelper.getGridColumns(context),
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1,
                ),
                itemCount: 20,
                itemBuilder: (context, index) {
                  return Container(
                    decoration: BoxDecoration(
                      color: Colors.blue[100 * ((index % 9) + 1)],
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Center(
                      child: Text(
                        '${index + 1}',
                        style: TextStyle(
                          fontSize: ResponsiveHelper.getResponsiveFontSize(
                            context,
                            mobile: 16,
                            tablet: 18,
                            desktop: 20,
                          ),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

**6. Adaptive Widgets for Different Platforms:**

```dart
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

class AdaptiveWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Adaptive Design')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            // Platform-specific button
            _buildAdaptiveButton(),
            SizedBox(height: 16),
            // Platform-specific switch
            _buildAdaptiveSwitch(),
            SizedBox(height: 16),
            // Platform info
            _buildPlatformInfo(),
          ],
        ),
      ),
    );
  }
  
  Widget _buildAdaptiveButton() {
    if (kIsWeb) {
      return ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        ),
        child: Text('Web Button'),
      );
    } else if (Platform.isIOS) {
      return CupertinoButton(
        color: Colors.blue,
        onPressed: () {},
        child: Text('iOS Button'),
      );
    } else {
      return ElevatedButton(
        onPressed: () {},
        child: Text('Android Button'),
      );
    }
  }
  
  Widget _buildAdaptiveSwitch() {
    bool value = true;
    
    if (Platform.isIOS) {
      return CupertinoSwitch(
        value: value,
        onChanged: (bool newValue) {},
      );
    } else {
      return Switch(
        value: value,
        onChanged: (bool newValue) {},
      );
    }
  }
  
  Widget _buildPlatformInfo() {
    String platform;
    if (kIsWeb) {
      platform = 'Web';
    } else if (Platform.isIOS) {
      platform = 'iOS';
    } else if (Platform.isAndroid) {
      platform = 'Android';
    } else if (Platform.isMacOS) {
      platform = 'macOS';
    } else if (Platform.isWindows) {
      platform = 'Windows';
    } else if (Platform.isLinux) {
      platform = 'Linux';
    } else {
      platform = 'Unknown';
    }
    
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Text(
              'Platform: $platform',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              'Screen: ${MediaQuery.of(context).size.width.toInt()} x ${MediaQuery.of(context).size.height.toInt()}',
            ),
          ],
        ),
      ),
    );
  }
}
```

### Q14: How do you handle errors and exceptions in Flutter applications?

**Answer:**
Error handling in Flutter is crucial for creating robust applications that gracefully handle unexpected situations. Flutter provides several mechanisms for catching, handling, and reporting errors at different levels of the application.

**1. Basic Exception Handling with Try-Catch:**

```dart
class ErrorHandlingExample extends StatefulWidget {
  @override
  _ErrorHandlingExampleState createState() => _ErrorHandlingExampleState();
}

class _ErrorHandlingExampleState extends State<ErrorHandlingExample> {
  String _result = '';
  bool _isLoading = false;
  
  // Basic try-catch for synchronous operations
  void _performDivision() {
    try {
      int numerator = 10;
      int denominator = 0;
      double result = numerator / denominator;
      
      if (result.isInfinite) {
        throw Exception('Division by zero is not allowed');
      }
      
      setState(() {
        _result = 'Result: $result';
      });
    } catch (e) {
      setState(() {
        _result = 'Error: ${e.toString()}';
      });
      _showErrorDialog('Calculation Error', e.toString());
    }
  }
  
  // Async error handling
  Future<void> _fetchDataWithErrorHandling() async {
    setState(() {
      _isLoading = true;
      _result = '';
    });
    
    try {
      // Simulate network request
      final data = await _simulateNetworkRequest();
      setState(() {
        _result = 'Data: $data';
      });
    } on NetworkException catch (e) {
      // Handle specific network exceptions
      setState(() {
        _result = 'Network Error: ${e.message}';
      });
      _showErrorDialog('Network Error', e.message);
    } on TimeoutException catch (e) {
      // Handle timeout exceptions
      setState(() {
        _result = 'Timeout Error: Request took too long';
      });
      _showErrorDialog('Timeout', 'Request timed out. Please try again.');
    } catch (e) {
      // Handle any other exceptions
      setState(() {
        _result = 'Unexpected Error: ${e.toString()}';
      });
      _showErrorDialog('Error', 'An unexpected error occurred.');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }
  
  Future<String> _simulateNetworkRequest() async {
    await Future.delayed(Duration(seconds: 2));
    
    // Simulate different types of errors
    final random = Random();
    final errorType = random.nextInt(4);
    
    switch (errorType) {
      case 0:
        throw NetworkException('Server is unreachable');
      case 1:
        throw TimeoutException('Request timeout', Duration(seconds: 30));
      case 2:
        throw FormatException('Invalid response format');
      default:
        return 'Successfully fetched data!';
    }
  }
  
  void _showErrorDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('OK'),
          ),
        ],
      ),
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Error Handling')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ElevatedButton(
              onPressed: _performDivision,
              child: Text('Test Division Error'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _isLoading ? null : _fetchDataWithErrorHandling,
              child: _isLoading 
                ? Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      ),
                      SizedBox(width: 8),
                      Text('Loading...'),
                    ],
                  )
                : Text('Test Network Request'),
            ),
            SizedBox(height: 24),
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                _result.isEmpty ? 'No result yet' : _result,
                style: TextStyle(
                  fontSize: 16,
                  color: _result.startsWith('Error') ? Colors.red : Colors.black,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Custom exception classes
class NetworkException implements Exception {
  final String message;
  NetworkException(this.message);
  
  @override
  String toString() => 'NetworkException: $message';
}

class TimeoutException implements Exception {
  final String message;
  final Duration timeout;
  
  TimeoutException(this.message, this.timeout);
  
  @override
  String toString() => 'TimeoutException: $message (${timeout.inSeconds}s)';
}
```

**2. Global Error Handling with FlutterError:**

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Error Handling Demo',
      home: ErrorHandlingExample(),
      builder: (context, widget) {
        // Global error handling for widget build errors
        ErrorWidget.builder = (FlutterErrorDetails errorDetails) {
          return CustomErrorWidget(errorDetails: errorDetails);
        };
        return widget!;
      },
    );
  }
}

// Custom error widget
class CustomErrorWidget extends StatelessWidget {
  final FlutterErrorDetails errorDetails;
  
  const CustomErrorWidget({Key? key, required this.errorDetails}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.red[50],
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.error_outline,
                size: 64,
                color: Colors.red,
              ),
              SizedBox(height: 16),
              Text(
                'Oops! Something went wrong',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.red[800],
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 8),
              Text(
                'We\'re sorry for the inconvenience. Please try again.',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.red[600],
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  // Restart the app or navigate to a safe screen
                  Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(builder: (context) => MyApp()),
                    (route) => false,
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                ),
                child: Text('Restart App'),
              ),
              if (kDebugMode) ..[
                SizedBox(height: 16),
                ExpansionTile(
                  title: Text('Debug Info'),
                  children: [
                    Padding(
                      padding: EdgeInsets.all(8),
                      child: Text(
                        errorDetails.toString(),
                        style: TextStyle(
                          fontSize: 12,
                          fontFamily: 'monospace',
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

// Global error handler setup
void main() {
  // Catch Flutter framework errors
  FlutterError.onError = (FlutterErrorDetails details) {
    FlutterError.presentError(details);
    
    // Log error to crash reporting service
    _logErrorToCrashlytics(details.exception, details.stack);
  };
  
  // Catch errors outside of Flutter framework
  PlatformDispatcher.instance.onError = (error, stack) {
    _logErrorToCrashlytics(error, stack);
    return true;
  };
  
  runApp(MyApp());
}

void _logErrorToCrashlytics(Object error, StackTrace? stack) {
  // In a real app, you would send this to a crash reporting service
  // like Firebase Crashlytics, Sentry, etc.
  print('Error logged: $error');
  if (stack != null) {
    print('Stack trace: $stack');
  }
}
```

**3. Error Handling in State Management (Provider Example):**

```dart
class ErrorState {
  final String? message;
  final bool hasError;
  
  ErrorState({this.message, this.hasError = false});
  
  ErrorState.error(String message) : message = message, hasError = true;
  ErrorState.noError() : message = null, hasError = false;
}

class DataProvider extends ChangeNotifier {
  List<String> _data = [];
  bool _isLoading = false;
  ErrorState _errorState = ErrorState.noError();
  
  List<String> get data => _data;
  bool get isLoading => _isLoading;
  ErrorState get errorState => _errorState;
  
  Future<void> fetchData() async {
    _setLoading(true);
    _clearError();
    
    try {
      // Simulate API call
      await Future.delayed(Duration(seconds: 2));
      
      // Simulate random error
      if (Random().nextBool()) {
        throw Exception('Failed to fetch data from server');
      }
      
      _data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
      notifyListeners();
    } catch (e) {
      _setError(e.toString());
    } finally {
      _setLoading(false);
    }
  }
  
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void _setError(String message) {
    _errorState = ErrorState.error(message);
    notifyListeners();
  }
  
  void _clearError() {
    _errorState = ErrorState.noError();
    notifyListeners();
  }
  
  void retryFetch() {
    fetchData();
  }
}

// Widget that consumes the provider with error handling
class DataListWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Data with Error Handling')),
      body: Consumer<DataProvider>(
        builder: (context, dataProvider, child) {
          if (dataProvider.isLoading) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 16),
                  Text('Loading data...'),
                ],
              ),
            );
          }
          
          if (dataProvider.errorState.hasError) {
            return ErrorRetryWidget(
              message: dataProvider.errorState.message!,
              onRetry: dataProvider.retryFetch,
            );
          }
          
          if (dataProvider.data.isEmpty) {
            return EmptyStateWidget(
              onRefresh: dataProvider.fetchData,
            );
          }
          
          return RefreshIndicator(
            onRefresh: dataProvider.fetchData,
            child: ListView.builder(
              itemCount: dataProvider.data.length,
              itemBuilder: (context, index) {
                return ListTile(
                  leading: Icon(Icons.data_usage),
                  title: Text(dataProvider.data[index]),
                  subtitle: Text('Item ${index + 1}'),
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.read<DataProvider>().fetchData();
        },
        child: Icon(Icons.refresh),
      ),
    );
  }
}

// Reusable error widget
class ErrorRetryWidget extends StatelessWidget {
  final String message;
  final VoidCallback onRetry;
  
  const ErrorRetryWidget({
    Key? key,
    required this.message,
    required this.onRetry,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.error_outline,
              size: 64,
              color: Colors.red[400],
            ),
            SizedBox(height: 16),
            Text(
              'Something went wrong',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text(
              message,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: onRetry,
              icon: Icon(Icons.refresh),
              label: Text('Try Again'),
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Empty state widget
class EmptyStateWidget extends StatelessWidget {
  final VoidCallback onRefresh;
  
  const EmptyStateWidget({Key? key, required this.onRefresh}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.inbox_outlined,
            size: 64,
            color: Colors.grey[400],
          ),
          SizedBox(height: 16),
          Text(
            'No data available',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Pull to refresh or tap the button to load data',
            style: TextStyle(
              color: Colors.grey[600],
            ),
          ),
          SizedBox(height: 24),
          ElevatedButton(
            onPressed: onRefresh,
            child: Text('Load Data'),
          ),
        ],
      ),
    );
  }
}
```

**4. Network Error Handling with Dio:**

```dart
class ApiService {
  late Dio _dio;
  
  ApiService() {
    _dio = Dio();
    _setupInterceptors();
  }
  
  void _setupInterceptors() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // Add auth token, logging, etc.
          print('Request: ${options.method} ${options.path}');
          handler.next(options);
        },
        onResponse: (response, handler) {
          print('Response: ${response.statusCode}');
          handler.next(response);
        },
        onError: (error, handler) {
          print('Error: ${error.message}');
          
          // Handle different types of errors
          if (error.type == DioErrorType.connectionTimeout) {
            handler.reject(
              DioError(
                requestOptions: error.requestOptions,
                error: 'Connection timeout. Please check your internet connection.',
                type: DioErrorType.connectionTimeout,
              ),
            );
          } else if (error.type == DioErrorType.receiveTimeout) {
            handler.reject(
              DioError(
                requestOptions: error.requestOptions,
                error: 'Server is taking too long to respond.',
                type: DioErrorType.receiveTimeout,
              ),
            );
          } else {
            handler.next(error);
          }
        },
      ),
    );
  }
  
  Future<ApiResult<T>> request<T>(
    String path, {
    String method = 'GET',
    Map<String, dynamic>? data,
    T Function(Map<String, dynamic>)? fromJson,
  }) async {
    try {
      final response = await _dio.request(
        path,
        options: Options(method: method),
        data: data,
      );
      
      if (response.statusCode == 200) {
        if (fromJson != null && response.data != null) {
          final result = fromJson(response.data);
          return ApiResult.success(result);
        } else {
          return ApiResult.success(response.data as T);
        }
      } else {
        return ApiResult.error('Server returned ${response.statusCode}');
      }
    } on DioError catch (e) {
      return _handleDioError(e);
    } catch (e) {
      return ApiResult.error('Unexpected error: ${e.toString()}');
    }
  }
  
  ApiResult<T> _handleDioError<T>(DioError error) {
    switch (error.type) {
      case DioErrorType.connectionTimeout:
      case DioErrorType.sendTimeout:
      case DioErrorType.receiveTimeout:
        return ApiResult.error('Connection timeout. Please try again.');
      
      case DioErrorType.badResponse:
        final statusCode = error.response?.statusCode;
        switch (statusCode) {
          case 400:
            return ApiResult.error('Bad request. Please check your input.');
          case 401:
            return ApiResult.error('Unauthorized. Please log in again.');
          case 403:
            return ApiResult.error('Access forbidden.');
          case 404:
            return ApiResult.error('Resource not found.');
          case 500:
            return ApiResult.error('Server error. Please try again later.');
          default:
            return ApiResult.error('Server error (${statusCode})');
        }
      
      case DioErrorType.cancel:
        return ApiResult.error('Request was cancelled.');
      
      case DioErrorType.unknown:
        if (error.error.toString().contains('SocketException')) {
          return ApiResult.error('No internet connection.');
        }
        return ApiResult.error('Network error. Please check your connection.');
      
      default:
        return ApiResult.error('Unknown error occurred.');
    }
  }
}

// Result wrapper class
class ApiResult<T> {
  final T? data;
  final String? error;
  final bool isSuccess;
  
  ApiResult.success(this.data) : error = null, isSuccess = true;
  ApiResult.error(this.error) : data = null, isSuccess = false;
}
```

**5. Error Boundary Widget (Custom Implementation):**

```dart
class ErrorBoundary extends StatefulWidget {
  final Widget child;
  final Widget Function(Object error, StackTrace? stackTrace)? errorBuilder;
  final void Function(Object error, StackTrace? stackTrace)? onError;
  
  const ErrorBoundary({
    Key? key,
    required this.child,
    this.errorBuilder,
    this.onError,
  }) : super(key: key);
  
  @override
  _ErrorBoundaryState createState() => _ErrorBoundaryState();
}

class _ErrorBoundaryState extends State<ErrorBoundary> {
  Object? _error;
  StackTrace? _stackTrace;
  
  @override
  void initState() {
    super.initState();
    
    // Set up error handling for this subtree
    FlutterError.onError = (FlutterErrorDetails details) {
      setState(() {
        _error = details.exception;
        _stackTrace = details.stack;
      });
      
      widget.onError?.call(details.exception, details.stack);
    };
  }
  
  @override
  Widget build(BuildContext context) {
    if (_error != null) {
      return widget.errorBuilder?.call(_error!, _stackTrace) ??
          DefaultErrorWidget(error: _error!, stackTrace: _stackTrace);
    }
    
    return widget.child;
  }
  
  void reset() {
    setState(() {
      _error = null;
      _stackTrace = null;
    });
  }
}

class DefaultErrorWidget extends StatelessWidget {
  final Object error;
  final StackTrace? stackTrace;
  
  const DefaultErrorWidget({
    Key? key,
    required this.error,
    this.stackTrace,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.error, size: 48, color: Colors.red),
          SizedBox(height: 16),
          Text(
            'An error occurred',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(
            error.toString(),
            style: TextStyle(color: Colors.grey[600]),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
```

### Q15: What are the security best practices for Flutter applications?

**Answer:**
Security is crucial for Flutter applications, especially when handling sensitive data, user authentication, and network communications. Here are comprehensive security best practices and implementations.

**1. Secure Data Storage:**

```dart
// Using flutter_secure_storage for sensitive data
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
      keyCipherAlgorithm: KeyCipherAlgorithm.RSA_ECB_OAESwithSHA_256andMGF1Padding,
      storageCipherAlgorithm: StorageCipherAlgorithm.AES_GCM_NoPadding,
    ),
    iOptions: IOSOptions(
      accessibility: IOSAccessibility.first_unlock_this_device,
    ),
  );
  
  // Store sensitive data
  static Future<void> storeSecureData(String key, String value) async {
    try {
      await _storage.write(key: key, value: value);
    } catch (e) {
      throw SecurityException('Failed to store secure data: $e');
    }
  }
  
  // Retrieve sensitive data
  static Future<String?> getSecureData(String key) async {
    try {
      return await _storage.read(key: key);
    } catch (e) {
      throw SecurityException('Failed to retrieve secure data: $e');
    }
  }
  
  // Delete sensitive data
  static Future<void> deleteSecureData(String key) async {
    try {
      await _storage.delete(key: key);
    } catch (e) {
      throw SecurityException('Failed to delete secure data: $e');
    }
  }
  
  // Clear all secure data
  static Future<void> clearAllSecureData() async {
    try {
      await _storage.deleteAll();
    } catch (e) {
      throw SecurityException('Failed to clear secure data: $e');
    }
  }
}

// Token management with secure storage
class TokenManager {
  static const String _accessTokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _biometricKey = 'biometric_enabled';
  
  static Future<void> saveTokens({
    required String accessToken,
    required String refreshToken,
  }) async {
    await Future.wait([
      SecureStorageService.storeSecureData(_accessTokenKey, accessToken),
      SecureStorageService.storeSecureData(_refreshTokenKey, refreshToken),
    ]);
  }
  
  static Future<String?> getAccessToken() async {
    return await SecureStorageService.getSecureData(_accessTokenKey);
  }
  
  static Future<String?> getRefreshToken() async {
    return await SecureStorageService.getSecureData(_refreshTokenKey);
  }
  
  static Future<void> clearTokens() async {
    await Future.wait([
      SecureStorageService.deleteSecureData(_accessTokenKey),
      SecureStorageService.deleteSecureData(_refreshTokenKey),
    ]);
  }
  
  static Future<bool> hasValidTokens() async {
    final accessToken = await getAccessToken();
    return accessToken != null && accessToken.isNotEmpty;
  }
}

class SecurityException implements Exception {
  final String message;
  SecurityException(this.message);
  
  @override
  String toString() => 'SecurityException: $message';
}
```

**2. Network Security and Certificate Pinning:**

```dart
import 'package:dio/dio.dart';
import 'package:dio_certificate_pinning/dio_certificate_pinning.dart';

class SecureNetworkService {
  late Dio _dio;
  
  SecureNetworkService() {
    _dio = Dio();
    _setupSecureInterceptors();
  }
  
  void _setupSecureInterceptors() {
    // Certificate pinning
    _dio.interceptors.add(
      CertificatePinningInterceptor(
        allowedSHAFingerprints: [
          'SHA256:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', // Your server's certificate fingerprint
        ],
      ),
    );
    
    // Request/Response interceptor for security headers
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // Add security headers
          options.headers['X-Requested-With'] = 'XMLHttpRequest';
          options.headers['X-API-Version'] = '1.0';
          
          // Add authentication token
          _addAuthToken(options);
          
          // Validate request before sending
          if (_isValidRequest(options)) {
            handler.next(options);
          } else {
            handler.reject(
              DioError(
                requestOptions: options,
                error: 'Invalid request parameters',
                type: DioErrorType.cancel,
              ),
            );
          }
        },
        onResponse: (response, handler) {
          // Validate response
          if (_isValidResponse(response)) {
            handler.next(response);
          } else {
            handler.reject(
              DioError(
                requestOptions: response.requestOptions,
                error: 'Invalid response format',
                type: DioErrorType.badResponse,
              ),
            );
          }
        },
        onError: (error, handler) {
          // Log security-related errors
          _logSecurityError(error);
          handler.next(error);
        },
      ),
    );
  }
  
  Future<void> _addAuthToken(RequestOptions options) async {
    final token = await TokenManager.getAccessToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
  }
  
  bool _isValidRequest(RequestOptions options) {
    // Validate URL
    if (!options.uri.toString().startsWith('https://')) {
      return false;
    }
    
    // Validate headers
    if (options.headers.containsKey('X-Malicious-Header')) {
      return false;
    }
    
    // Add more validation as needed
    return true;
  }
  
  bool _isValidResponse(Response response) {
    // Check for expected security headers
    final headers = response.headers;
    
    // Validate content type
    final contentType = headers.value('content-type');
    if (contentType != null && !contentType.contains('application/json')) {
      return false;
    }
    
    return true;
  }
  
  void _logSecurityError(DioError error) {
    // Log to security monitoring service
    print('Security Error: ${error.message}');
    // In production, send to security monitoring service
  }
}
```

**3. Input Validation and Sanitization:**

```dart
class InputValidator {
  // Email validation
  static bool isValidEmail(String email) {
    final emailRegex = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    );
    return emailRegex.hasMatch(email.trim());
  }
  
  // Password strength validation
  static PasswordStrength validatePassword(String password) {
    if (password.length < 8) {
      return PasswordStrength.weak;
    }
    
    bool hasUppercase = password.contains(RegExp(r'[A-Z]'));
    bool hasLowercase = password.contains(RegExp(r'[a-z]'));
    bool hasDigits = password.contains(RegExp(r'[0-9]'));
    bool hasSpecialCharacters = password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'));
    
    int score = 0;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasDigits) score++;
    if (hasSpecialCharacters) score++;
    if (password.length >= 12) score++;
    
    if (score >= 4) return PasswordStrength.strong;
    if (score >= 2) return PasswordStrength.medium;
    return PasswordStrength.weak;
  }
  
  // Sanitize input to prevent injection attacks
  static String sanitizeInput(String input) {
    return input
        .replaceAll(RegExp(r'[<>"\'\/]'), '') // Remove potentially dangerous characters
        .trim()
        .substring(0, input.length > 1000 ? 1000 : input.length); // Limit length
  }
  
  // Validate phone number
  static bool isValidPhoneNumber(String phone) {
    final phoneRegex = RegExp(r'^\+?[1-9]\d{1,14}$');
    return phoneRegex.hasMatch(phone.replaceAll(RegExp(r'[\s-()]'), ''));
  }
  
  // Validate URL
  static bool isValidUrl(String url) {
    try {
      final uri = Uri.parse(url);
      return uri.hasScheme && (uri.scheme == 'https' || uri.scheme == 'http');
    } catch (e) {
      return false;
    }
  }
}

enum PasswordStrength { weak, medium, strong }

// Secure form widget with validation
class SecureLoginForm extends StatefulWidget {
  @override
  _SecureLoginFormState createState() => _SecureLoginFormState();
}

class _SecureLoginFormState extends State<SecureLoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _isLoading = false;
  
  @override
  void dispose() {
    // Clear sensitive data from memory
    _emailController.clear();
    _passwordController.clear();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            autocorrect: false,
            enableSuggestions: false,
            decoration: InputDecoration(
              labelText: 'Email',
              prefixIcon: Icon(Icons.email),
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Email is required';
              }
              if (!InputValidator.isValidEmail(value)) {
                return 'Please enter a valid email';
              }
              return null;
            },
            onChanged: (value) {
              // Sanitize input in real-time
              final sanitized = InputValidator.sanitizeInput(value);
              if (sanitized != value) {
                _emailController.text = sanitized;
                _emailController.selection = TextSelection.fromPosition(
                  TextPosition(offset: sanitized.length),
                );
              }
            },
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _passwordController,
            obscureText: _obscurePassword,
            autocorrect: false,
            enableSuggestions: false,
            decoration: InputDecoration(
              labelText: 'Password',
              prefixIcon: Icon(Icons.lock),
              suffixIcon: IconButton(
                icon: Icon(
                  _obscurePassword ? Icons.visibility : Icons.visibility_off,
                ),
                onPressed: () {
                  setState(() {
                    _obscurePassword = !_obscurePassword;
                  });
                },
              ),
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Password is required';
              }
              final strength = InputValidator.validatePassword(value);
              if (strength == PasswordStrength.weak) {
                return 'Password is too weak';
              }
              return null;
            },
          ),
          SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _isLoading ? null : _handleLogin,
              child: _isLoading
                  ? CircularProgressIndicator(color: Colors.white)
                  : Text('Login'),
            ),
          ),
        ],
      ),
    );
  }
  
  Future<void> _handleLogin() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    
    setState(() {
      _isLoading = true;
    });
    
    try {
      final email = _emailController.text.trim();
      final password = _passwordController.text;
      
      // Perform secure login
      await _performSecureLogin(email, password);
      
      // Clear password from memory immediately after use
      _passwordController.clear();
      
      // Navigate to home screen
      Navigator.of(context).pushReplacementNamed('/home');
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Login failed: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }
  
  Future<void> _performSecureLogin(String email, String password) async {
    // Implement secure login logic
    // This would typically involve:
    // 1. Hashing the password
    // 2. Sending to secure API endpoint
    // 3. Storing tokens securely
    // 4. Setting up session management
    
    // Simulate API call
    await Future.delayed(Duration(seconds: 2));
    
    // Store tokens securely
    await TokenManager.saveTokens(
      accessToken: 'secure_access_token',
      refreshToken: 'secure_refresh_token',
    );
  }
}
```

**4. Biometric Authentication:**

```dart
import 'package:local_auth/local_auth.dart';

class BiometricAuthService {
  static final LocalAuthentication _localAuth = LocalAuthentication();
  
  static Future<bool> isBiometricAvailable() async {
    try {
      final isAvailable = await _localAuth.canCheckBiometrics;
      final isDeviceSupported = await _localAuth.isDeviceSupported();
      return isAvailable && isDeviceSupported;
    } catch (e) {
      return false;
    }
  }
  
  static Future<List<BiometricType>> getAvailableBiometrics() async {
    try {
      return await _localAuth.getAvailableBiometrics();
    } catch (e) {
      return [];
    }
  }
  
  static Future<bool> authenticateWithBiometrics({
    required String reason,
    bool useErrorDialogs = true,
    bool stickyAuth = true,
  }) async {
    try {
      final isAuthenticated = await _localAuth.authenticate(
        localizedReason: reason,
        options: AuthenticationOptions(
          useErrorDialogs: useErrorDialogs,
          stickyAuth: stickyAuth,
          biometricOnly: true,
        ),
      );
      return isAuthenticated;
    } catch (e) {
      print('Biometric authentication error: $e');
      return false;
    }
  }
  
  static Future<void> enableBiometricLogin() async {
    final isAvailable = await isBiometricAvailable();
    if (!isAvailable) {
      throw SecurityException('Biometric authentication not available');
    }
    
    final isAuthenticated = await authenticateWithBiometrics(
      reason: 'Enable biometric login for secure access',
    );
    
    if (isAuthenticated) {
      await SecureStorageService.storeSecureData('biometric_enabled', 'true');
    } else {
      throw SecurityException('Biometric authentication failed');
    }
  }
  
  static Future<bool> isBiometricLoginEnabled() async {
    final enabled = await SecureStorageService.getSecureData('biometric_enabled');
    return enabled == 'true';
  }
  
  static Future<void> disableBiometricLogin() async {
    await SecureStorageService.deleteSecureData('biometric_enabled');
  }
}

// Biometric login widget
class BiometricLoginWidget extends StatefulWidget {
  final VoidCallback onSuccess;
  final VoidCallback onFallback;
  
  const BiometricLoginWidget({
    Key? key,
    required this.onSuccess,
    required this.onFallback,
  }) : super(key: key);
  
  @override
  _BiometricLoginWidgetState createState() => _BiometricLoginWidgetState();
}

class _BiometricLoginWidgetState extends State<BiometricLoginWidget> {
  bool _isBiometricAvailable = false;
  bool _isBiometricEnabled = false;
  List<BiometricType> _availableBiometrics = [];
  
  @override
  void initState() {
    super.initState();
    _checkBiometricStatus();
  }
  
  Future<void> _checkBiometricStatus() async {
    final isAvailable = await BiometricAuthService.isBiometricAvailable();
    final isEnabled = await BiometricAuthService.isBiometricLoginEnabled();
    final availableBiometrics = await BiometricAuthService.getAvailableBiometrics();
    
    setState(() {
      _isBiometricAvailable = isAvailable;
      _isBiometricEnabled = isEnabled;
      _availableBiometrics = availableBiometrics;
    });
  }
  
  Future<void> _authenticateWithBiometrics() async {
    try {
      final isAuthenticated = await BiometricAuthService.authenticateWithBiometrics(
        reason: 'Authenticate to access your account',
      );
      
      if (isAuthenticated) {
        widget.onSuccess();
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Biometric authentication failed'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
  
  @override
  Widget build(BuildContext context) {
    if (!_isBiometricAvailable || !_isBiometricEnabled) {
      return SizedBox.shrink();
    }
    
    return Column(
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Theme.of(context).primaryColor.withOpacity(0.1),
          ),
          child: IconButton(
            onPressed: _authenticateWithBiometrics,
            icon: Icon(
              _getBiometricIcon(),
              size: 40,
              color: Theme.of(context).primaryColor,
            ),
          ),
        ),
        SizedBox(height: 16),
        Text(
          'Use ${_getBiometricTypeText()} to login',
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey[600],
          ),
        ),
        SizedBox(height: 16),
        TextButton(
          onPressed: widget.onFallback,
          child: Text('Use password instead'),
        ),
      ],
    );
  }
  
  IconData _getBiometricIcon() {
    if (_availableBiometrics.contains(BiometricType.face)) {
      return Icons.face;
    } else if (_availableBiometrics.contains(BiometricType.fingerprint)) {
      return Icons.fingerprint;
    } else {
      return Icons.security;
    }
  }
  
  String _getBiometricTypeText() {
    if (_availableBiometrics.contains(BiometricType.face)) {
      return 'Face ID';
    } else if (_availableBiometrics.contains(BiometricType.fingerprint)) {
      return 'fingerprint';
    } else {
      return 'biometric';
    }
  }
}
```

**5. App Security Configuration:**

```dart
// Security configuration class
class SecurityConfig {
  static const bool kDebugMode = bool.fromEnvironment('dart.vm.product') == false;
  
  // API endpoints
  static const String baseUrl = kDebugMode 
      ? 'https://api-dev.example.com'
      : 'https://api.example.com';
  
  // Security settings
  static const Duration sessionTimeout = Duration(minutes: 30);
  static const int maxLoginAttempts = 3;
  static const Duration lockoutDuration = Duration(minutes: 15);
  
  // Certificate pinning fingerprints
  static const List<String> certificateFingerprints = [
    'SHA256:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
  ];
  
  // Allowed domains for deep links
  static const List<String> allowedDomains = [
    'example.com',
    'app.example.com',
  ];
}

// Session management
class SessionManager {
  static Timer? _sessionTimer;
  static DateTime? _lastActivity;
  
  static void startSession() {
    _lastActivity = DateTime.now();
    _resetSessionTimer();
  }
  
  static void updateActivity() {
    _lastActivity = DateTime.now();
    _resetSessionTimer();
  }
  
  static void _resetSessionTimer() {
    _sessionTimer?.cancel();
    _sessionTimer = Timer(SecurityConfig.sessionTimeout, () {
      _handleSessionTimeout();
    });
  }
  
  static void _handleSessionTimeout() {
    // Clear sensitive data
    TokenManager.clearTokens();
    
    // Navigate to login screen
    // This would typically be handled by your navigation service
    print('Session timed out - redirecting to login');
  }
  
  static void endSession() {
    _sessionTimer?.cancel();
    _lastActivity = null;
    TokenManager.clearTokens();
  }
  
  static bool isSessionActive() {
    if (_lastActivity == null) return false;
    
    final now = DateTime.now();
    final difference = now.difference(_lastActivity!);
    return difference < SecurityConfig.sessionTimeout;
  }
}

// Root detection (Android)
class SecurityChecker {
  static Future<bool> isDeviceSecure() async {
    try {
      // Check for root/jailbreak
      final isRooted = await _checkForRoot();
      if (isRooted) {
        return false;
      }
      
      // Check for debugging
      final isDebugging = await _checkForDebugging();
      if (isDebugging && !SecurityConfig.kDebugMode) {
        return false;
      }
      
      return true;
    } catch (e) {
      // If we can't determine security status, assume insecure
      return false;
    }
  }
  
  static Future<bool> _checkForRoot() async {
    // This would use a plugin like 'root_check' or 'jailbreak_root_detection'
    // For demonstration purposes, we'll return false
    return false;
  }
  
  static Future<bool> _checkForDebugging() async {
    // Check if app is being debugged
    return SecurityConfig.kDebugMode;
  }
  
  static Future<void> handleInsecureDevice() async {
    // Clear sensitive data
    await TokenManager.clearTokens();
    await SecureStorageService.clearAllSecureData();
    
    // Show security warning
    // This would typically show a dialog or navigate to a security warning screen
    print('Insecure device detected - clearing sensitive data');
  }
}
```

**Security Best Practices Summary:**

1. **Data Protection**: Use `flutter_secure_storage` for sensitive data
2. **Network Security**: Implement certificate pinning and validate all requests/responses
3. **Input Validation**: Sanitize and validate all user inputs
4. **Authentication**: Implement biometric authentication and secure session management
5. **Device Security**: Check for rooted/jailbroken devices
6. **Code Obfuscation**: Use code obfuscation in production builds
7. **API Security**: Use HTTPS, implement proper authentication, and validate API responses
8. **Session Management**: Implement automatic session timeout and secure token handling
9. **Error Handling**: Don't expose sensitive information in error messages
10. **Regular Updates**: Keep dependencies updated and monitor for security vulnerabilities

### Q16: How do you deploy Flutter applications and optimize them for app stores?

**Answer:**
Deploying Flutter applications involves building, optimizing, and publishing apps to various platforms. Here's a comprehensive guide covering deployment strategies, optimization techniques, and app store requirements.

**1. Building for Production:**

```yaml
# pubspec.yaml - Production configuration
name: my_flutter_app
description: A production-ready Flutter application
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'
  flutter: ">=3.10.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  http: ^1.1.0
  shared_preferences: ^2.2.0
  flutter_secure_storage: ^9.0.0
  package_info_plus: ^4.0.2
  url_launcher: ^6.1.12
  image_picker: ^1.0.2
  connectivity_plus: ^4.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0
  build_runner: ^2.4.6
  json_annotation: ^4.8.1
  json_serializable: ^6.7.1

flutter:
  uses-material-design: true
  
  assets:
    - assets/images/
    - assets/icons/
    - assets/config/
  
  fonts:
    - family: CustomFont
      fonts:
        - asset: assets/fonts/CustomFont-Regular.ttf
        - asset: assets/fonts/CustomFont-Bold.ttf
          weight: 700
```

```dart
// lib/config/app_config.dart - Environment configuration
class AppConfig {
  static const String appName = 'My Flutter App';
  static const String packageName = 'com.example.myflutterapp';
  static const String version = '1.0.0';
  static const int buildNumber = 1;
  
  // Environment-specific configurations
  static const bool isProduction = bool.fromEnvironment('PRODUCTION', defaultValue: false);
  static const bool enableAnalytics = bool.fromEnvironment('ENABLE_ANALYTICS', defaultValue: true);
  static const bool enableCrashReporting = bool.fromEnvironment('ENABLE_CRASH_REPORTING', defaultValue: true);
  
  static const String baseUrl = isProduction 
      ? 'https://api.myapp.com'
      : 'https://api-staging.myapp.com';
  
  static const String apiKey = String.fromEnvironment('API_KEY');
  static const String analyticsKey = String.fromEnvironment('ANALYTICS_KEY');
}

// lib/utils/build_info.dart - Build information
class BuildInfo {
  static Future<Map<String, dynamic>> getBuildInfo() async {
    final packageInfo = await PackageInfo.fromPlatform();
    
    return {
      'appName': packageInfo.appName,
      'packageName': packageInfo.packageName,
      'version': packageInfo.version,
      'buildNumber': packageInfo.buildNumber,
      'buildSignature': packageInfo.buildSignature,
      'isProduction': AppConfig.isProduction,
      'buildDate': DateTime.now().toIso8601String(),
    };
  }
  
  static Future<void> logBuildInfo() async {
    final buildInfo = await getBuildInfo();
    print('Build Info: $buildInfo');
  }
}
```

**2. Android Deployment Configuration:**

```gradle
// android/app/build.gradle
def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withReader('UTF-8') { reader ->
        localProperties.load(reader)
    }
}

def flutterRoot = localProperties.getProperty('flutter.sdk')
if (flutterRoot == null) {
    throw new GradleException("Flutter SDK not found. Define location with flutter.sdk in the local.properties file.")
}

def flutterVersionCode = localProperties.getProperty('flutter.versionCode')
if (flutterVersionCode == null) {
    flutterVersionCode = '1'
}

def flutterVersionName = localProperties.getProperty('flutter.versionName')
if (flutterVersionName == null) {
    flutterVersionName = '1.0'
}

// Keystore configuration
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"

android {
    namespace "com.example.myflutterapp"
    compileSdkVersion 34
    ndkVersion flutter.ndkVersion

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }

    sourceSets {
        main.java.srcDirs += 'src/main/kotlin'
    }

    defaultConfig {
        applicationId "com.example.myflutterapp"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
        
        // Enable multidex for large apps
        multiDexEnabled true
        
        // Proguard configuration
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            useProguard true
            
            // Build configuration fields
            buildConfigField "boolean", "PRODUCTION", "true"
            buildConfigField "boolean", "ENABLE_ANALYTICS", "true"
            buildConfigField "String", "API_KEY", '"${System.getenv("API_KEY") ?: ""}'"'
        }
        
        debug {
            applicationIdSuffix ".debug"
            debuggable true
            buildConfigField "boolean", "PRODUCTION", "false"
            buildConfigField "boolean", "ENABLE_ANALYTICS", "false"
        }
        
        profile {
            signingConfig signingConfigs.release
            minifyEnabled true
            useProguard true
            buildConfigField "boolean", "PRODUCTION", "false"
        }
    }
    
    flavorDimensions "environment"
    productFlavors {
        staging {
            dimension "environment"
            applicationIdSuffix ".staging"
            versionNameSuffix "-staging"
            resValue "string", "app_name", "My App (Staging)"
        }
        
        production {
            dimension "environment"
            resValue "string", "app_name", "My App"
        }
    }
}

flutter {
    source '../..'
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.multidex:multidex:2.0.1'
}
```

```properties
# android/key.properties (DO NOT commit to version control)
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=your_key_alias
storeFile=../keystore/release-keystore.jks
```

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" 
                     android:maxSdkVersion="28" />
    
    <!-- Features -->
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
    
    <application
        android:label="@string/app_name"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher"
        android:allowBackup="false"
        android:usesCleartextTraffic="false"
        android:networkSecurityConfig="@xml/network_security_config"
        android:requestLegacyExternalStorage="false">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            
            <!-- Standard App Intent -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
            
            <!-- Deep Link Intent -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https"
                      android:host="myapp.com" />
            </intent-filter>
        </activity>
        
        <!-- Don't delete the meta-data below -->
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
            
        <!-- Firebase Configuration -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_icon"
            android:resource="@drawable/ic_notification" />
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_color"
            android:resource="@color/notification_color" />
    </application>
</manifest>
```

**3. iOS Deployment Configuration:**

```xml
<!-- ios/Runner/Info.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>$(DEVELOPMENT_LANGUAGE)</string>
	<key>CFBundleDisplayName</key>
	<string>My Flutter App</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>myflutterapp</string>
	<key>CFBundlePackageType</key>
	<string>APPL</string>
	<key>CFBundleShortVersionString</key>
	<string>$(FLUTTER_BUILD_NAME)</string>
	<key>CFBundleSignature</key>
	<string>????</string>
	<key>CFBundleVersion</key>
	<string>$(FLUTTER_BUILD_NUMBER)</string>
	<key>LSRequiresIPhoneOS</key>
	<true/>
	<key>UILaunchStoryboardName</key>
	<string>LaunchScreen</string>
	<key>UIMainStoryboardFile</key>
	<string>Main</string>
	<key>UISupportedInterfaceOrientations</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	<key>UISupportedInterfaceOrientations~ipad</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationPortraitUpsideDown</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	
	<!-- Permissions -->
	<key>NSCameraUsageDescription</key>
	<string>This app needs access to camera to take photos</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>This app needs access to photo library to select images</string>
	<key>NSLocationWhenInUseUsageDescription</key>
	<string>This app needs location access to provide location-based services</string>
	
	<!-- URL Schemes -->
	<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLName</key>
			<string>myapp.com</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>https</string>
				<string>myapp</string>
			</array>
		</dict>
	</array>
	
	<!-- App Transport Security -->
	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<false/>
		<key>NSExceptionDomains</key>
		<dict>
			<key>myapp.com</key>
			<dict>
				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<false/>
				<key>NSExceptionMinimumTLSVersion</key>
				<string>TLSv1.2</string>
			</dict>
		</dict>
	</dict>
	
	<!-- Background Modes -->
	<key>UIBackgroundModes</key>
	<array>
		<string>fetch</string>
		<string>remote-notification</string>
	</array>
	
	<!-- Minimum iOS Version -->
	<key>MinimumOSVersion</key>
	<string>12.0</string>
</dict>
</plist>
```

**4. Build Scripts and Automation:**

```bash
#!/bin/bash
# scripts/build_android.sh

set -e

echo "Building Android APK/AAB..."

# Clean previous builds
flutter clean
flutter pub get

# Generate code if needed
flutter packages pub run build_runner build --delete-conflicting-outputs

# Build APK for testing
echo "Building APK..."
flutter build apk --release --flavor production --dart-define=PRODUCTION=true --dart-define=API_KEY=$API_KEY

# Build AAB for Play Store
echo "Building AAB..."
flutter build appbundle --release --flavor production --dart-define=PRODUCTION=true --dart-define=API_KEY=$API_KEY

echo "Android build completed!"
echo "APK: build/app/outputs/flutter-apk/app-production-release.apk"
echo "AAB: build/app/outputs/bundle/productionRelease/app-production-release.aab"
```

```bash
#!/bin/bash
# scripts/build_ios.sh

set -e

echo "Building iOS IPA..."

# Clean previous builds
flutter clean
flutter pub get

# Generate code if needed
flutter packages pub run build_runner build --delete-conflicting-outputs

# Build iOS
echo "Building iOS..."
flutter build ios --release --dart-define=PRODUCTION=true --dart-define=API_KEY=$API_KEY

# Archive and export IPA (requires Xcode)
echo "Creating archive..."
xcodebuild -workspace ios/Runner.xcworkspace \
           -scheme Runner \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath build/ios/Runner.xcarchive \
           archive

echo "Exporting IPA..."
xcodebuild -exportArchive \
           -archivePath build/ios/Runner.xcarchive \
           -exportPath build/ios/ipa \
           -exportOptionsPlist ios/ExportOptions.plist

echo "iOS build completed!"
echo "IPA: build/ios/ipa/Runner.ipa"
```

```yaml
# .github/workflows/build_and_deploy.yml
name: Build and Deploy

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.13.0'
    - run: flutter pub get
    - run: flutter test
    - run: flutter analyze

  build-android:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.13.0'
    - uses: actions/setup-java@v3
      with:
        distribution: 'zulu'
        java-version: '11'
    
    - name: Decode Keystore
      run: |
        echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 --decode > android/keystore/release-keystore.jks
    
    - name: Create key.properties
      run: |
        echo "storePassword=${{ secrets.STORE_PASSWORD }}" > android/key.properties
        echo "keyPassword=${{ secrets.KEY_PASSWORD }}" >> android/key.properties
        echo "keyAlias=${{ secrets.KEY_ALIAS }}" >> android/key.properties
        echo "storeFile=../keystore/release-keystore.jks" >> android/key.properties
    
    - run: flutter pub get
    - run: flutter build appbundle --release --flavor production --dart-define=PRODUCTION=true --dart-define=API_KEY=${{ secrets.API_KEY }}
    
    - name: Upload to Play Store
      uses: r0adkll/upload-google-play@v1
      with:
        serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}
        packageName: com.example.myflutterapp
        releaseFiles: build/app/outputs/bundle/productionRelease/app-production-release.aab
        track: internal
        status: completed

  build-ios:
    needs: test
    runs-on: macos-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.13.0'
    
    - name: Install certificates and provisioning profiles
      env:
        BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
        P12_PASSWORD: ${{ secrets.P12_PASSWORD }}
        BUILD_PROVISION_PROFILE_BASE64: ${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
        KEYCHAIN_PASSWORD: ${{ secrets.KEYCHAIN_PASSWORD }}
      run: |
        # Create variables
        CERTIFICATE_PATH=$RUNNER_TEMP/build_certificate.p12
        PP_PATH=$RUNNER_TEMP/build_pp.mobileprovision
        KEYCHAIN_PATH=$RUNNER_TEMP/app-signing.keychain-db
        
        # Import certificate and provisioning profile from secrets
        echo -n "$BUILD_CERTIFICATE_BASE64" | base64 --decode --output $CERTIFICATE_PATH
        echo -n "$BUILD_PROVISION_PROFILE_BASE64" | base64 --decode --output $PP_PATH
        
        # Create temporary keychain
        security create-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH
        security set-keychain-settings -lut 21600 $KEYCHAIN_PATH
        security unlock-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH
        
        # Import certificate to keychain
        security import $CERTIFICATE_PATH -P "$P12_PASSWORD" -A -t cert -f pkcs12 -k $KEYCHAIN_PATH
        security list-keychain -d user -s $KEYCHAIN_PATH
        
        # Apply provisioning profile
        mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
        cp $PP_PATH ~/Library/MobileDevice/Provisioning\ Profiles
    
    - run: flutter pub get
    - run: flutter build ios --release --no-codesign --dart-define=PRODUCTION=true --dart-define=API_KEY=${{ secrets.API_KEY }}
    
    - name: Build and archive
      run: |
        xcodebuild -workspace ios/Runner.xcworkspace \
                   -scheme Runner \
                   -configuration Release \
                   -destination generic/platform=iOS \
                   -archivePath $RUNNER_TEMP/Runner.xcarchive \
                   archive
    
    - name: Export IPA
      run: |
        xcodebuild -exportArchive \
                   -archivePath $RUNNER_TEMP/Runner.xcarchive \
                   -exportPath $RUNNER_TEMP/ipa \
                   -exportOptionsPlist ios/ExportOptions.plist
    
    - name: Upload to App Store Connect
      run: |
        xcrun altool --upload-app \
                     --type ios \
                     --file "$RUNNER_TEMP/ipa/Runner.ipa" \
                     --username "${{ secrets.APPLE_ID_EMAIL }}" \
                     --password "${{ secrets.APPLE_ID_PASSWORD }}"
```

**5. App Store Optimization (ASO):**

```dart
// lib/utils/app_store_optimization.dart
class AppStoreOptimization {
  // App metadata for store listings
  static const Map<String, dynamic> appMetadata = {
    'title': 'My Flutter App - Best Mobile Experience',
    'subtitle': 'Fast, Secure, and User-Friendly',
    'description': '''
Discover the ultimate mobile experience with My Flutter App! 

🚀 FEATURES:
• Lightning-fast performance
• Secure data encryption
• Intuitive user interface
• Offline functionality
• Real-time synchronization
• Cross-platform compatibility

💡 WHY CHOOSE US:
• 99.9% uptime reliability
• 24/7 customer support
• Regular feature updates
• Privacy-focused design
• Award-winning user experience

📱 PERFECT FOR:
• Business professionals
• Students and educators
• Creative individuals
• Anyone seeking productivity

Download now and join millions of satisfied users worldwide!

🔒 Your privacy is our priority - we never share your personal data.
🌟 Rated 4.8/5 stars by users globally.

Contact us: support@myapp.com
Privacy Policy: https://myapp.com/privacy
Terms of Service: https://myapp.com/terms
''',
    'keywords': [
      'productivity',
      'business',
      'mobile app',
      'flutter',
      'secure',
      'fast',
      'reliable',
      'cross-platform',
      'offline',
      'sync'
    ],
    'category': 'Productivity',
    'contentRating': '4+',
    'supportUrl': 'https://myapp.com/support',
    'marketingUrl': 'https://myapp.com',
    'privacyUrl': 'https://myapp.com/privacy',
  };
  
  // Screenshot specifications
  static const Map<String, Map<String, dynamic>> screenshotSpecs = {
    'ios': {
      'iPhone_6.7': {'width': 1290, 'height': 2796}, // iPhone 14 Pro Max
      'iPhone_6.5': {'width': 1242, 'height': 2688}, // iPhone XS Max
      'iPhone_5.5': {'width': 1242, 'height': 2208}, // iPhone 8 Plus
      'iPad_12.9': {'width': 2048, 'height': 2732},   // iPad Pro 12.9
      'iPad_10.5': {'width': 1668, 'height': 2224},   // iPad Pro 10.5
    },
    'android': {
      'phone': {'width': 1080, 'height': 1920},
      'tablet_7': {'width': 1200, 'height': 1920},
      'tablet_10': {'width': 1600, 'height': 2560},
    },
  };
  
  // App icon specifications
  static const Map<String, List<int>> iconSizes = {
    'ios': [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024],
    'android': [36, 48, 72, 96, 144, 192, 512],
  };
  
  // Localization support
  static const List<String> supportedLocales = [
    'en-US', // English (US)
    'es-ES', // Spanish (Spain)
    'fr-FR', // French (France)
    'de-DE', // German (Germany)
    'it-IT', // Italian (Italy)
    'pt-BR', // Portuguese (Brazil)
    'ja-JP', // Japanese (Japan)
    'ko-KR', // Korean (South Korea)
    'zh-CN', // Chinese (Simplified)
    'zh-TW', // Chinese (Traditional)
  ];
  
  static Map<String, String> getLocalizedMetadata(String locale) {
    // Return localized app store metadata
    switch (locale) {
      case 'es-ES':
        return {
          'title': 'Mi App Flutter - Mejor Experiencia Móvil',
          'subtitle': 'Rápida, Segura y Fácil de Usar',
          'description': 'Descubre la experiencia móvil definitiva...',
        };
      case 'fr-FR':
        return {
          'title': 'Mon App Flutter - Meilleure Expérience Mobile',
          'subtitle': 'Rapide, Sécurisée et Conviviale',
          'description': 'Découvrez l\'expérience mobile ultime...',
        };
      default:
        return {
          'title': appMetadata['title'] as String,
          'subtitle': appMetadata['subtitle'] as String,
          'description': appMetadata['description'] as String,
        };
    }
  }
}

// lib/utils/analytics_helper.dart
class AnalyticsHelper {
  static Future<void> trackAppStoreConversion(String source) async {
    // Track app store conversion events
    await FirebaseAnalytics.instance.logEvent(
      name: 'app_store_conversion',
      parameters: {
        'source': source,
        'platform': Platform.isIOS ? 'ios' : 'android',
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  static Future<void> trackFirstAppOpen() async {
    final prefs = await SharedPreferences.getInstance();
    final isFirstOpen = prefs.getBool('is_first_open') ?? true;
    
    if (isFirstOpen) {
      await FirebaseAnalytics.instance.logEvent(
        name: 'first_app_open',
        parameters: {
          'platform': Platform.isIOS ? 'ios' : 'android',
          'app_version': AppConfig.version,
          'timestamp': DateTime.now().millisecondsSinceEpoch,
        },
      );
      
      await prefs.setBool('is_first_open', false);
    }
  }
}
```

**6. Performance Optimization for Stores:**

```dart
// lib/utils/performance_optimizer.dart
class PerformanceOptimizer {
  static Future<void> optimizeForAppStore() async {
    // Preload critical resources
    await _preloadCriticalAssets();
    
    // Initialize essential services
    await _initializeEssentialServices();
    
    // Setup performance monitoring
    _setupPerformanceMonitoring();
  }
  
  static Future<void> _preloadCriticalAssets() async {
    // Preload images that appear on first screen
    final criticalImages = [
      'assets/images/logo.png',
      'assets/images/onboarding_1.png',
      'assets/images/splash_background.png',
    ];
    
    for (final imagePath in criticalImages) {
      await precacheImage(
        AssetImage(imagePath),
        NavigationService.navigatorKey.currentContext!,
      );
    }
  }
  
  static Future<void> _initializeEssentialServices() async {
    // Initialize only critical services for faster startup
    await Future.wait([
      SharedPreferences.getInstance(),
      PackageInfo.fromPlatform(),
      ConnectivityService.initialize(),
    ]);
  }
  
  static void _setupPerformanceMonitoring() {
    // Monitor app performance metrics
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final renderTime = DateTime.now().millisecondsSinceEpoch;
      FirebasePerformance.instance.newTrace('app_startup').start();
    });
  }
  
  // App size optimization
  static const List<String> optimizationTips = [
    'Use vector graphics (SVG) instead of raster images',
    'Compress images using tools like TinyPNG',
    'Remove unused dependencies and assets',
    'Enable code shrinking and obfuscation',
    'Use dynamic feature delivery for large features',
    'Implement lazy loading for non-critical components',
    'Use efficient data structures and algorithms',
    'Minimize the use of heavy third-party libraries',
  ];
}
```

**Deployment Checklist:**

✅ **Pre-deployment:**
- [ ] All tests passing
- [ ] Code analysis clean
- [ ] Performance optimized
- [ ] Security audit completed
- [ ] App store guidelines compliance
- [ ] Proper versioning and build numbers
- [ ] Signing certificates configured
- [ ] Privacy policy and terms updated

✅ **App Store Requirements:**
- [ ] App icons in all required sizes
- [ ] Screenshots for all device types
- [ ] App description optimized for ASO
- [ ] Keywords research completed
- [ ] Localization for target markets
- [ ] Age rating appropriate
- [ ] Contact information provided

✅ **Post-deployment:**
- [ ] Monitor crash reports
- [ ] Track user feedback
- [ ] Monitor app store rankings
- [ ] Plan for updates and maintenance
- [ ] Analyze user acquisition metrics

### Q17: What are advanced Flutter patterns and architecture approaches?

**Answer:**
Advanced Flutter patterns and architecture approaches help build scalable, maintainable, and testable applications. Here's a comprehensive guide covering various architectural patterns, design patterns, and advanced techniques.

**1. Clean Architecture Pattern:**

```dart
// lib/core/error/failures.dart
abstract class Failure {
  final String message;
  const Failure(this.message);
}

class ServerFailure extends Failure {
  const ServerFailure(String message) : super(message);
}

class CacheFailure extends Failure {
  const CacheFailure(String message) : super(message);
}

class NetworkFailure extends Failure {
  const NetworkFailure(String message) : super(message);
}

// lib/core/usecases/usecase.dart
import 'package:dartz/dartz.dart';

abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}

class NoParams {
  const NoParams();
}

// lib/features/user/domain/entities/user.dart
class User {
  final String id;
  final String name;
  final String email;
  final String? avatar;
  final DateTime createdAt;
  final bool isActive;

  const User({
    required this.id,
    required this.name,
    required this.email,
    this.avatar,
    required this.createdAt,
    required this.isActive,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is User && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;
}

// lib/features/user/domain/repositories/user_repository.dart
abstract class UserRepository {
  Future<Either<Failure, List<User>>> getUsers();
  Future<Either<Failure, User>> getUserById(String id);
  Future<Either<Failure, User>> createUser(User user);
  Future<Either<Failure, User>> updateUser(User user);
  Future<Either<Failure, void>> deleteUser(String id);
}

// lib/features/user/domain/usecases/get_users.dart
class GetUsers implements UseCase<List<User>, NoParams> {
  final UserRepository repository;

  GetUsers(this.repository);

  @override
  Future<Either<Failure, List<User>>> call(NoParams params) async {
    return await repository.getUsers();
  }
}

// lib/features/user/data/models/user_model.dart
class UserModel extends User {
  const UserModel({
    required String id,
    required String name,
    required String email,
    String? avatar,
    required DateTime createdAt,
    required bool isActive,
  }) : super(
          id: id,
          name: name,
          email: email,
          avatar: avatar,
          createdAt: createdAt,
          isActive: isActive,
        );

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      avatar: json['avatar'],
      createdAt: DateTime.parse(json['created_at']),
      isActive: json['is_active'] ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'avatar': avatar,
      'created_at': createdAt.toIso8601String(),
      'is_active': isActive,
    };
  }

  UserModel copyWith({
    String? id,
    String? name,
    String? email,
    String? avatar,
    DateTime? createdAt,
    bool? isActive,
  }) {
    return UserModel(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      avatar: avatar ?? this.avatar,
      createdAt: createdAt ?? this.createdAt,
      isActive: isActive ?? this.isActive,
    );
  }
}

// lib/features/user/data/datasources/user_remote_data_source.dart
abstract class UserRemoteDataSource {
  Future<List<UserModel>> getUsers();
  Future<UserModel> getUserById(String id);
  Future<UserModel> createUser(UserModel user);
  Future<UserModel> updateUser(UserModel user);
  Future<void> deleteUser(String id);
}

class UserRemoteDataSourceImpl implements UserRemoteDataSource {
  final http.Client client;
  final String baseUrl;

  UserRemoteDataSourceImpl({
    required this.client,
    required this.baseUrl,
  });

  @override
  Future<List<UserModel>> getUsers() async {
    final response = await client.get(
      Uri.parse('$baseUrl/users'),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final List<dynamic> jsonList = json.decode(response.body);
      return jsonList.map((json) => UserModel.fromJson(json)).toList();
    } else {
      throw ServerException('Failed to fetch users');
    }
  }

  @override
  Future<UserModel> createUser(UserModel user) async {
    final response = await client.post(
      Uri.parse('$baseUrl/users'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(user.toJson()),
    );

    if (response.statusCode == 201) {
      return UserModel.fromJson(json.decode(response.body));
    } else {
      throw ServerException('Failed to create user');
    }
  }

  // ... other methods
}

// lib/features/user/data/repositories/user_repository_impl.dart
class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource remoteDataSource;
  final UserLocalDataSource localDataSource;
  final NetworkInfo networkInfo;

  UserRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, List<User>>> getUsers() async {
    if (await networkInfo.isConnected) {
      try {
        final remoteUsers = await remoteDataSource.getUsers();
        await localDataSource.cacheUsers(remoteUsers);
        return Right(remoteUsers);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      }
    } else {
      try {
        final localUsers = await localDataSource.getLastUsers();
        return Right(localUsers);
      } on CacheException catch (e) {
        return Left(CacheFailure(e.message));
      }
    }
  }

  // ... other methods
}
```

**2. BLoC Pattern with Cubit:**

```dart
// lib/features/user/presentation/cubit/user_state.dart
abstract class UserState {
  const UserState();
}

class UserInitial extends UserState {
  const UserInitial();
}

class UserLoading extends UserState {
  const UserLoading();
}

class UserLoaded extends UserState {
  final List<User> users;
  final User? selectedUser;

  const UserLoaded({
    required this.users,
    this.selectedUser,
  });

  UserLoaded copyWith({
    List<User>? users,
    User? selectedUser,
  }) {
    return UserLoaded(
      users: users ?? this.users,
      selectedUser: selectedUser ?? this.selectedUser,
    );
  }
}

class UserError extends UserState {
  final String message;
  const UserError(this.message);
}

// lib/features/user/presentation/cubit/user_cubit.dart
class UserCubit extends Cubit<UserState> {
  final GetUsers getUsers;
  final CreateUser createUser;
  final UpdateUser updateUser;
  final DeleteUser deleteUser;

  UserCubit({
    required this.getUsers,
    required this.createUser,
    required this.updateUser,
    required this.deleteUser,
  }) : super(const UserInitial());

  Future<void> loadUsers() async {
    emit(const UserLoading());
    
    final result = await getUsers(const NoParams());
    
    result.fold(
      (failure) => emit(UserError(failure.message)),
      (users) => emit(UserLoaded(users: users)),
    );
  }

  Future<void> addUser(User user) async {
    if (state is UserLoaded) {
      final currentState = state as UserLoaded;
      
      final result = await createUser(CreateUserParams(user));
      
      result.fold(
        (failure) => emit(UserError(failure.message)),
        (newUser) {
          final updatedUsers = [...currentState.users, newUser];
          emit(currentState.copyWith(users: updatedUsers));
        },
      );
    }
  }

  Future<void> removeUser(String userId) async {
    if (state is UserLoaded) {
      final currentState = state as UserLoaded;
      
      final result = await deleteUser(DeleteUserParams(userId));
      
      result.fold(
        (failure) => emit(UserError(failure.message)),
        (_) {
          final updatedUsers = currentState.users
              .where((user) => user.id != userId)
              .toList();
          emit(currentState.copyWith(users: updatedUsers));
        },
      );
    }
  }

  void selectUser(User user) {
    if (state is UserLoaded) {
      final currentState = state as UserLoaded;
      emit(currentState.copyWith(selectedUser: user));
    }
  }
}
```

**3. Repository Pattern with Caching:**

```dart
// lib/core/cache/cache_manager.dart
class CacheManager {
  static const String _usersCacheKey = 'cached_users';
  static const Duration _cacheExpiry = Duration(hours: 1);
  
  final SharedPreferences _prefs;
  
  CacheManager(this._prefs);
  
  Future<void> cacheUsers(List<UserModel> users) async {
    final cacheData = {
      'data': users.map((user) => user.toJson()).toList(),
      'timestamp': DateTime.now().millisecondsSinceEpoch,
    };
    
    await _prefs.setString(_usersCacheKey, json.encode(cacheData));
  }
  
  Future<List<UserModel>?> getCachedUsers() async {
    final cachedString = _prefs.getString(_usersCacheKey);
    
    if (cachedString == null) return null;
    
    final cacheData = json.decode(cachedString);
    final timestamp = DateTime.fromMillisecondsSinceEpoch(cacheData['timestamp']);
    
    // Check if cache is expired
    if (DateTime.now().difference(timestamp) > _cacheExpiry) {
      await _prefs.remove(_usersCacheKey);
      return null;
    }
    
    final List<dynamic> usersJson = cacheData['data'];
    return usersJson.map((json) => UserModel.fromJson(json)).toList();
  }
  
  Future<void> clearCache() async {
    await _prefs.remove(_usersCacheKey);
  }
}

// lib/core/network/network_info.dart
abstract class NetworkInfo {
  Future<bool> get isConnected;
}

class NetworkInfoImpl implements NetworkInfo {
  final Connectivity connectivity;
  
  NetworkInfoImpl(this.connectivity);
  
  @override
  Future<bool> get isConnected async {
    final result = await connectivity.checkConnectivity();
    return result != ConnectivityResult.none;
  }
}
```

**4. Dependency Injection with GetIt:**

```dart
// lib/injection_container.dart
final sl = GetIt.instance;

Future<void> init() async {
  // Features - User
  _initUser();
  
  // Core
  _initCore();
  
  // External
  await _initExternal();
}

void _initUser() {
  // Cubit
  sl.registerFactory(
    () => UserCubit(
      getUsers: sl(),
      createUser: sl(),
      updateUser: sl(),
      deleteUser: sl(),
    ),
  );
  
  // Use cases
  sl.registerLazySingleton(() => GetUsers(sl()));
  sl.registerLazySingleton(() => CreateUser(sl()));
  sl.registerLazySingleton(() => UpdateUser(sl()));
  sl.registerLazySingleton(() => DeleteUser(sl()));
  
  // Repository
  sl.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(
      remoteDataSource: sl(),
      localDataSource: sl(),
      networkInfo: sl(),
    ),
  );
  
  // Data sources
  sl.registerLazySingleton<UserRemoteDataSource>(
    () => UserRemoteDataSourceImpl(
      client: sl(),
      baseUrl: 'https://api.example.com',
    ),
  );
  
  sl.registerLazySingleton<UserLocalDataSource>(
    () => UserLocalDataSourceImpl(cacheManager: sl()),
  );
}

void _initCore() {
  sl.registerLazySingleton<NetworkInfo>(() => NetworkInfoImpl(sl()));
  sl.registerLazySingleton(() => CacheManager(sl()));
}

Future<void> _initExternal() async {
  final sharedPreferences = await SharedPreferences.getInstance();
  sl.registerLazySingleton(() => sharedPreferences);
  
  sl.registerLazySingleton(() => http.Client());
  sl.registerLazySingleton(() => Connectivity());
}
```

**5. MVVM Pattern with Provider:**

```dart
// lib/features/user/presentation/viewmodels/user_view_model.dart
class UserViewModel extends ChangeNotifier {
  final GetUsers _getUsers;
  final CreateUser _createUser;
  final UpdateUser _updateUser;
  final DeleteUser _deleteUser;
  
  UserViewModel({
    required GetUsers getUsers,
    required CreateUser createUser,
    required UpdateUser updateUser,
    required DeleteUser deleteUser,
  }) : _getUsers = getUsers,
       _createUser = createUser,
       _updateUser = updateUser,
       _deleteUser = deleteUser;
  
  List<User> _users = [];
  User? _selectedUser;
  bool _isLoading = false;
  String? _errorMessage;
  
  // Getters
  List<User> get users => _users;
  User? get selectedUser => _selectedUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get hasError => _errorMessage != null;
  
  // Methods
  Future<void> loadUsers() async {
    _setLoading(true);
    _clearError();
    
    final result = await _getUsers(const NoParams());
    
    result.fold(
      (failure) => _setError(failure.message),
      (users) => _setUsers(users),
    );
    
    _setLoading(false);
  }
  
  Future<void> addUser(User user) async {
    _setLoading(true);
    _clearError();
    
    final result = await _createUser(CreateUserParams(user));
    
    result.fold(
      (failure) => _setError(failure.message),
      (newUser) {
        _users = [..._users, newUser];
        notifyListeners();
      },
    );
    
    _setLoading(false);
  }
  
  Future<void> updateUser(User user) async {
    _setLoading(true);
    _clearError();
    
    final result = await _updateUser(UpdateUserParams(user));
    
    result.fold(
      (failure) => _setError(failure.message),
      (updatedUser) {
        final index = _users.indexWhere((u) => u.id == updatedUser.id);
        if (index != -1) {
          _users[index] = updatedUser;
          if (_selectedUser?.id == updatedUser.id) {
            _selectedUser = updatedUser;
          }
          notifyListeners();
        }
      },
    );
    
    _setLoading(false);
  }
  
  Future<void> deleteUser(String userId) async {
    _setLoading(true);
    _clearError();
    
    final result = await _deleteUser(DeleteUserParams(userId));
    
    result.fold(
      (failure) => _setError(failure.message),
      (_) {
        _users = _users.where((user) => user.id != userId).toList();
        if (_selectedUser?.id == userId) {
          _selectedUser = null;
        }
        notifyListeners();
      },
    );
    
    _setLoading(false);
  }
  
  void selectUser(User user) {
    _selectedUser = user;
    notifyListeners();
  }
  
  void clearSelection() {
    _selectedUser = null;
    notifyListeners();
  }
  
  // Private methods
  void _setUsers(List<User> users) {
    _users = users;
    notifyListeners();
  }
  
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void _setError(String message) {
    _errorMessage = message;
    notifyListeners();
  }
  
  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
```

**6. Factory Pattern for Widget Creation:**

```dart
// lib/core/widgets/widget_factory.dart
abstract class WidgetFactory {
  Widget createButton({
    required String text,
    required VoidCallback onPressed,
    ButtonStyle? style,
  });
  
  Widget createTextField({
    required String label,
    required TextEditingController controller,
    String? hint,
    bool obscureText = false,
    String? Function(String?)? validator,
  });
  
  Widget createCard({
    required Widget child,
    EdgeInsetsGeometry? padding,
    Color? backgroundColor,
  });
}

class MaterialWidgetFactory implements WidgetFactory {
  @override
  Widget createButton({
    required String text,
    required VoidCallback onPressed,
    ButtonStyle? style,
  }) {
    return ElevatedButton(
      onPressed: onPressed,
      style: style,
      child: Text(text),
    );
  }
  
  @override
  Widget createTextField({
    required String label,
    required TextEditingController controller,
    String? hint,
    bool obscureText = false,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      obscureText: obscureText,
      validator: validator,
      decoration: InputDecoration(
        labelText: label,
        hintText: hint,
        border: const OutlineInputBorder(),
      ),
    );
  }
  
  @override
  Widget createCard({
    required Widget child,
    EdgeInsetsGeometry? padding,
    Color? backgroundColor,
  }) {
    return Card(
      color: backgroundColor,
      child: Padding(
        padding: padding ?? const EdgeInsets.all(16.0),
        child: child,
      ),
    );
  }
}

class CupertinoWidgetFactory implements WidgetFactory {
  @override
  Widget createButton({
    required String text,
    required VoidCallback onPressed,
    ButtonStyle? style,
  }) {
    return CupertinoButton(
      onPressed: onPressed,
      child: Text(text),
    );
  }
  
  @override
  Widget createTextField({
    required String label,
    required TextEditingController controller,
    String? hint,
    bool obscureText = false,
    String? Function(String?)? validator,
  }) {
    return CupertinoTextFormFieldRow(
      controller: controller,
      obscureText: obscureText,
      validator: validator,
      placeholder: hint,
      prefix: Text(label),
    );
  }
  
  @override
  Widget createCard({
    required Widget child,
    EdgeInsetsGeometry? padding,
    Color? backgroundColor,
  }) {
    return Container(
      padding: padding ?? const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: backgroundColor ?? CupertinoColors.systemBackground,
        borderRadius: BorderRadius.circular(8.0),
        boxShadow: [
          BoxShadow(
            color: CupertinoColors.systemGrey.withOpacity(0.2),
            blurRadius: 4.0,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: child,
    );
  }
}
```

**7. Observer Pattern for State Management:**

```dart
// lib/core/observers/app_observer.dart
abstract class Observer<T> {
  void update(T data);
}

class Subject<T> {
  final List<Observer<T>> _observers = [];
  
  void addObserver(Observer<T> observer) {
    _observers.add(observer);
  }
  
  void removeObserver(Observer<T> observer) {
    _observers.remove(observer);
  }
  
  void notifyObservers(T data) {
    for (final observer in _observers) {
      observer.update(data);
    }
  }
}

// lib/core/services/theme_service.dart
class ThemeService extends Subject<ThemeData> {
  static final ThemeService _instance = ThemeService._internal();
  factory ThemeService() => _instance;
  ThemeService._internal();
  
  ThemeData _currentTheme = ThemeData.light();
  
  ThemeData get currentTheme => _currentTheme;
  
  void changeTheme(ThemeData newTheme) {
    _currentTheme = newTheme;
    notifyObservers(_currentTheme);
  }
  
  void toggleTheme() {
    final newTheme = _currentTheme.brightness == Brightness.light
        ? ThemeData.dark()
        : ThemeData.light();
    changeTheme(newTheme);
  }
}

// lib/features/settings/presentation/widgets/theme_observer_widget.dart
class ThemeObserverWidget extends StatefulWidget {
  final Widget child;
  
  const ThemeObserverWidget({Key? key, required this.child}) : super(key: key);
  
  @override
  State<ThemeObserverWidget> createState() => _ThemeObserverWidgetState();
}

class _ThemeObserverWidgetState extends State<ThemeObserverWidget>
    implements Observer<ThemeData> {
  late ThemeData _currentTheme;
  
  @override
  void initState() {
    super.initState();
    _currentTheme = ThemeService().currentTheme;
    ThemeService().addObserver(this);
  }
  
  @override
  void dispose() {
    ThemeService().removeObserver(this);
    super.dispose();
  }
  
  @override
  void update(ThemeData data) {
    setState(() {
      _currentTheme = data;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Theme(
      data: _currentTheme,
      child: widget.child,
    );
  }
}
```

**8. Command Pattern for Actions:**

```dart
// lib/core/commands/command.dart
abstract class Command {
  Future<void> execute();
  Future<void> undo();
}

// lib/core/commands/command_manager.dart
class CommandManager {
  final List<Command> _history = [];
  int _currentIndex = -1;
  
  Future<void> executeCommand(Command command) async {
    await command.execute();
    
    // Remove any commands after current index
    if (_currentIndex < _history.length - 1) {
      _history.removeRange(_currentIndex + 1, _history.length);
    }
    
    _history.add(command);
    _currentIndex++;
  }
  
  Future<void> undo() async {
    if (canUndo) {
      await _history[_currentIndex].undo();
      _currentIndex--;
    }
  }
  
  Future<void> redo() async {
    if (canRedo) {
      _currentIndex++;
      await _history[_currentIndex].execute();
    }
  }
  
  bool get canUndo => _currentIndex >= 0;
  bool get canRedo => _currentIndex < _history.length - 1;
  
  void clear() {
    _history.clear();
    _currentIndex = -1;
  }
}

// lib/features/user/presentation/commands/create_user_command.dart
class CreateUserCommand implements Command {
  final UserRepository repository;
  final User user;
  User? _createdUser;
  
  CreateUserCommand({
    required this.repository,
    required this.user,
  });
  
  @override
  Future<void> execute() async {
    final result = await repository.createUser(user);
    result.fold(
      (failure) => throw Exception(failure.message),
      (createdUser) => _createdUser = createdUser,
    );
  }
  
  @override
  Future<void> undo() async {
    if (_createdUser != null) {
      await repository.deleteUser(_createdUser!.id);
    }
  }
}
```

**Architecture Benefits:**

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Testability**: Easy to unit test individual components
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features and modify existing ones
5. **Reusability**: Components can be reused across different parts of the app
6. **Dependency Inversion**: High-level modules don't depend on low-level modules
7. **Single Responsibility**: Each class has one reason to change
8. **Open/Closed Principle**: Open for extension, closed for modification

**Best Practices:**

- Use dependency injection for better testability
- Implement proper error handling at each layer
- Keep business logic in the domain layer
- Use immutable data models when possible
- Implement caching strategies for better performance
- Follow SOLID principles throughout the architecture
- Use design patterns appropriately for specific problems
- Maintain clear boundaries between layers
- Document architectural decisions and patterns used

### Q18: How do you implement internationalization (i18n) and localization (l10n) in Flutter?

**Answer:**
Internationalization (i18n) and localization (l10n) in Flutter enable your app to support multiple languages and regions. Here's a comprehensive guide covering setup, implementation, and best practices.

**1. Basic Setup and Configuration:**

```yaml
# pubspec.yaml
name: my_flutter_app
description: A Flutter app with internationalization support

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: ^0.18.1
  intl_utils: ^2.8.5

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
  generate: true
  
  assets:
    - assets/images/
    - assets/flags/

# Enable code generation for internationalization
flutter_intl:
  enabled: true
  class_name: S
  main_locale: en
  arb_dir: lib/l10n
  output_dir: lib/generated
  use_deferred_loading: false
```

```yaml
# l10n.yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
output-class: AppLocalizations
output-dir: lib/generated/l10n
preferred-supported-locales: ["en", "es", "fr", "de", "ja", "ar"]
```

**2. ARB Files for Different Locales:**

```json
// lib/l10n/app_en.arb (English - Template)
{
  "@@locale": "en",
  "appTitle": "My Flutter App",
  "@appTitle": {
    "description": "The title of the application"
  },
  "welcome": "Welcome",
  "@welcome": {
    "description": "Welcome message"
  },
  "hello": "Hello {name}!",
  "@hello": {
    "description": "Greeting message with name parameter",
    "placeholders": {
      "name": {
        "type": "String",
        "example": "John"
      }
    }
  },
  "itemCount": "{count, plural, =0{No items} =1{One item} other{{count} items}}",
  "@itemCount": {
    "description": "Number of items with pluralization",
    "placeholders": {
      "count": {
        "type": "int",
        "format": "compact"
      }
    }
  },
  "lastSeen": "Last seen {date}",
  "@lastSeen": {
    "description": "Last seen date",
    "placeholders": {
      "date": {
        "type": "DateTime",
        "format": "yMd"
      }
    }
  },
  "price": "Price: {amount}",
  "@price": {
    "description": "Price with currency formatting",
    "placeholders": {
      "amount": {
        "type": "double",
        "format": "currency",
        "optionalParameters": {
          "symbol": "$"
        }
      }
    }
  },
  "login": "Login",
  "logout": "Logout",
  "email": "Email",
  "password": "Password",
  "forgotPassword": "Forgot Password?",
  "createAccount": "Create Account",
  "settings": "Settings",
  "language": "Language",
  "theme": "Theme",
  "notifications": "Notifications",
  "profile": "Profile",
  "save": "Save",
  "cancel": "Cancel",
  "delete": "Delete",
  "edit": "Edit",
  "search": "Search",
  "loading": "Loading...",
  "error": "Error",
  "retry": "Retry",
  "noData": "No data available",
  "networkError": "Network connection error",
  "validationEmailRequired": "Email is required",
  "validationEmailInvalid": "Please enter a valid email",
  "validationPasswordRequired": "Password is required",
  "validationPasswordTooShort": "Password must be at least 8 characters"
}
```

```json
// lib/l10n/app_es.arb (Spanish)
{
  "@@locale": "es",
  "appTitle": "Mi Aplicación Flutter",
  "welcome": "Bienvenido",
  "hello": "¡Hola {name}!",
  "itemCount": "{count, plural, =0{Sin elementos} =1{Un elemento} other{{count} elementos}}",
  "lastSeen": "Visto por última vez {date}",
  "price": "Precio: {amount}",
  "login": "Iniciar Sesión",
  "logout": "Cerrar Sesión",
  "email": "Correo Electrónico",
  "password": "Contraseña",
  "forgotPassword": "¿Olvidaste tu contraseña?",
  "createAccount": "Crear Cuenta",
  "settings": "Configuración",
  "language": "Idioma",
  "theme": "Tema",
  "notifications": "Notificaciones",
  "profile": "Perfil",
  "save": "Guardar",
  "cancel": "Cancelar",
  "delete": "Eliminar",
  "edit": "Editar",
  "search": "Buscar",
  "loading": "Cargando...",
  "error": "Error",
  "retry": "Reintentar",
  "noData": "No hay datos disponibles",
  "networkError": "Error de conexión de red",
  "validationEmailRequired": "El correo electrónico es obligatorio",
  "validationEmailInvalid": "Por favor ingrese un correo electrónico válido",
  "validationPasswordRequired": "La contraseña es obligatoria",
  "validationPasswordTooShort": "La contraseña debe tener al menos 8 caracteres"
}
```

```json
// lib/l10n/app_fr.arb (French)
{
  "@@locale": "fr",
  "appTitle": "Mon Application Flutter",
  "welcome": "Bienvenue",
  "hello": "Bonjour {name} !",
  "itemCount": "{count, plural, =0{Aucun élément} =1{Un élément} other{{count} éléments}}",
  "lastSeen": "Vu pour la dernière fois {date}",
  "price": "Prix : {amount}",
  "login": "Se connecter",
  "logout": "Se déconnecter",
  "email": "E-mail",
  "password": "Mot de passe",
  "forgotPassword": "Mot de passe oublié ?",
  "createAccount": "Créer un compte",
  "settings": "Paramètres",
  "language": "Langue",
  "theme": "Thème",
  "notifications": "Notifications",
  "profile": "Profil",
  "save": "Enregistrer",
  "cancel": "Annuler",
  "delete": "Supprimer",
  "edit": "Modifier",
  "search": "Rechercher",
  "loading": "Chargement...",
  "error": "Erreur",
  "retry": "Réessayer",
  "noData": "Aucune donnée disponible",
  "networkError": "Erreur de connexion réseau",
  "validationEmailRequired": "L'e-mail est requis",
  "validationEmailInvalid": "Veuillez saisir un e-mail valide",
  "validationPasswordRequired": "Le mot de passe est requis",
  "validationPasswordTooShort": "Le mot de passe doit contenir au moins 8 caractères"
}
```

```json
// lib/l10n/app_ar.arb (Arabic - RTL)
{
  "@@locale": "ar",
  "appTitle": "تطبيق Flutter الخاص بي",
  "welcome": "مرحباً",
  "hello": "مرحباً {name}!",
  "itemCount": "{count, plural, =0{لا توجد عناصر} =1{عنصر واحد} =2{عنصران} few{{count} عناصر} many{{count} عنصراً} other{{count} عنصر}}",
  "lastSeen": "آخر ظهور {date}",
  "price": "السعر: {amount}",
  "login": "تسجيل الدخول",
  "logout": "تسجيل الخروج",
  "email": "البريد الإلكتروني",
  "password": "كلمة المرور",
  "forgotPassword": "نسيت كلمة المرور؟",
  "createAccount": "إنشاء حساب",
  "settings": "الإعدادات",
  "language": "اللغة",
  "theme": "المظهر",
  "notifications": "الإشعارات",
  "profile": "الملف الشخصي",
  "save": "حفظ",
  "cancel": "إلغاء",
  "delete": "حذف",
  "edit": "تعديل",
  "search": "بحث",
  "loading": "جاري التحميل...",
  "error": "خطأ",
  "retry": "إعادة المحاولة",
  "noData": "لا توجد بيانات متاحة",
  "networkError": "خطأ في الاتصال بالشبكة",
  "validationEmailRequired": "البريد الإلكتروني مطلوب",
  "validationEmailInvalid": "يرجى إدخال بريد إلكتروني صحيح",
  "validationPasswordRequired": "كلمة المرور مطلوبة",
  "validationPasswordTooShort": "يجب أن تكون كلمة المرور 8 أحرف على الأقل"
}
```

**3. Main App Configuration:**

```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'generated/l10n/app_localizations.dart';
import 'services/locale_service.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => LocaleService(),
      child: Consumer<LocaleService>(
        builder: (context, localeService, child) {
          return MaterialApp(
            title: 'Flutter i18n Demo',
            
            // Localization configuration
            locale: localeService.currentLocale,
            localizationsDelegates: const [
              AppLocalizations.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
            ],
            supportedLocales: AppLocalizations.supportedLocales,
            
            // RTL support
            localeResolutionCallback: (locale, supportedLocales) {
              // Check if the current device locale is supported
              for (var supportedLocale in supportedLocales) {
                if (supportedLocale.languageCode == locale?.languageCode &&
                    supportedLocale.countryCode == locale?.countryCode) {
                  return supportedLocale;
                }
              }
              
              // If the locale of the device is not supported, use the first one
              // from the list (English, in this case)
              return supportedLocales.first;
            },
            
            theme: ThemeData(
              primarySwatch: Colors.blue,
              visualDensity: VisualDensity.adaptivePlatformDensity,
            ),
            
            home: HomeScreen(),
          );
        },
      ),
    );
  }
}
```

**4. Locale Service for Language Management:**

```dart
// lib/services/locale_service.dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocaleService extends ChangeNotifier {
  static const String _localeKey = 'selected_locale';
  
  Locale _currentLocale = const Locale('en');
  
  Locale get currentLocale => _currentLocale;
  
  // Supported locales with their display names
  static const Map<String, String> supportedLanguages = {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'ja': '日本語',
    'ar': 'العربية',
    'zh': '中文',
    'hi': 'हिन्दी',
    'pt': 'Português',
    'ru': 'Русский',
  };
  
  // RTL languages
  static const Set<String> rtlLanguages = {'ar', 'he', 'fa', 'ur'};
  
  bool get isRTL => rtlLanguages.contains(_currentLocale.languageCode);
  
  LocaleService() {
    _loadSavedLocale();
  }
  
  Future<void> _loadSavedLocale() async {
    final prefs = await SharedPreferences.getInstance();
    final savedLocale = prefs.getString(_localeKey);
    
    if (savedLocale != null) {
      _currentLocale = Locale(savedLocale);
      notifyListeners();
    }
  }
  
  Future<void> changeLocale(String languageCode) async {
    if (supportedLanguages.containsKey(languageCode)) {
      _currentLocale = Locale(languageCode);
      
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_localeKey, languageCode);
      
      notifyListeners();
    }
  }
  
  String getLanguageName(String languageCode) {
    return supportedLanguages[languageCode] ?? languageCode;
  }
  
  List<Locale> getSupportedLocales() {
    return supportedLanguages.keys.map((code) => Locale(code)).toList();
  }
}
```

**5. Language Selector Widget:**

```dart
// lib/widgets/language_selector.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../generated/l10n/app_localizations.dart';
import '../services/locale_service.dart';

class LanguageSelector extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final localeService = Provider.of<LocaleService>(context);
    final l10n = AppLocalizations.of(context)!;
    
    return PopupMenuButton<String>(
      icon: Icon(Icons.language),
      tooltip: l10n.language,
      onSelected: (String languageCode) {
        localeService.changeLocale(languageCode);
      },
      itemBuilder: (BuildContext context) {
        return LocaleService.supportedLanguages.entries.map((entry) {
          final isSelected = entry.key == localeService.currentLocale.languageCode;
          
          return PopupMenuItem<String>(
            value: entry.key,
            child: Row(
              children: [
                if (isSelected)
                  Icon(Icons.check, color: Theme.of(context).primaryColor)
                else
                  SizedBox(width: 24),
                SizedBox(width: 8),
                Text(
                  entry.value,
                  style: TextStyle(
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    color: isSelected ? Theme.of(context).primaryColor : null,
                  ),
                ),
              ],
            ),
          );
        }).toList();
      },
    );
  }
}

// lib/widgets/language_list_tile.dart
class LanguageListTile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final localeService = Provider.of<LocaleService>(context);
    final l10n = AppLocalizations.of(context)!;
    
    return ListTile(
      leading: Icon(Icons.language),
      title: Text(l10n.language),
      subtitle: Text(
        localeService.getLanguageName(localeService.currentLocale.languageCode),
      ),
      trailing: Icon(Icons.arrow_forward_ios),
      onTap: () {
        showDialog(
          context: context,
          builder: (context) => LanguageSelectionDialog(),
        );
      },
    );
  }
}

class LanguageSelectionDialog extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final localeService = Provider.of<LocaleService>(context);
    final l10n = AppLocalizations.of(context)!;
    
    return AlertDialog(
      title: Text(l10n.language),
      content: SizedBox(
        width: double.maxFinite,
        child: ListView.builder(
          shrinkWrap: true,
          itemCount: LocaleService.supportedLanguages.length,
          itemBuilder: (context, index) {
            final entry = LocaleService.supportedLanguages.entries.elementAt(index);
            final isSelected = entry.key == localeService.currentLocale.languageCode;
            
            return RadioListTile<String>(
              title: Text(entry.value),
              value: entry.key,
              groupValue: localeService.currentLocale.languageCode,
              onChanged: (String? value) {
                if (value != null) {
                  localeService.changeLocale(value);
                  Navigator.of(context).pop();
                }
              },
            );
          },
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text(l10n.cancel),
        ),
      ],
    );
  }
}
```

**6. RTL Support and Directional Widgets:**

```dart
// lib/widgets/rtl_aware_widgets.dart
import 'package:flutter/material.dart';
import '../services/locale_service.dart';
import 'package:provider/provider.dart';

class RTLAwareRow extends StatelessWidget {
  final List<Widget> children;
  final MainAxisAlignment mainAxisAlignment;
  final CrossAxisAlignment crossAxisAlignment;
  
  const RTLAwareRow({
    Key? key,
    required this.children,
    this.mainAxisAlignment = MainAxisAlignment.start,
    this.crossAxisAlignment = CrossAxisAlignment.center,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    final localeService = Provider.of<LocaleService>(context);
    
    return Row(
      textDirection: localeService.isRTL ? TextDirection.rtl : TextDirection.ltr,
      mainAxisAlignment: mainAxisAlignment,
      crossAxisAlignment: crossAxisAlignment,
      children: children,
    );
  }
}

class RTLAwarePadding extends StatelessWidget {
  final Widget child;
  final double? left;
  final double? right;
  final double? top;
  final double? bottom;
  
  const RTLAwarePadding({
    Key? key,
    required this.child,
    this.left,
    this.right,
    this.top,
    this.bottom,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    final localeService = Provider.of<LocaleService>(context);
    
    return Padding(
      padding: EdgeInsetsDirectional.only(
        start: localeService.isRTL ? (right ?? 0) : (left ?? 0),
        end: localeService.isRTL ? (left ?? 0) : (right ?? 0),
        top: top ?? 0,
        bottom: bottom ?? 0,
      ),
      child: child,
    );
  }
}

class DirectionalIcon extends StatelessWidget {
  final IconData ltrIcon;
  final IconData rtlIcon;
  final double? size;
  final Color? color;
  
  const DirectionalIcon({
    Key? key,
    required this.ltrIcon,
    required this.rtlIcon,
    this.size,
    this.color,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    final localeService = Provider.of<LocaleService>(context);
    
    return Icon(
      localeService.isRTL ? rtlIcon : ltrIcon,
      size: size,
      color: color,
    );
  }
}
```

**7. Date and Number Formatting:**

```dart
// lib/utils/formatting_utils.dart
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';

class FormattingUtils {
  static String formatDate(DateTime date, Locale locale) {
    final formatter = DateFormat.yMMMd(locale.toString());
    return formatter.format(date);
  }
  
  static String formatTime(DateTime time, Locale locale) {
    final formatter = DateFormat.Hm(locale.toString());
    return formatter.format(time);
  }
  
  static String formatDateTime(DateTime dateTime, Locale locale) {
    final formatter = DateFormat.yMMMd(locale.toString()).add_Hm();
    return formatter.format(dateTime);
  }
  
  static String formatCurrency(double amount, Locale locale, {String? symbol}) {
    final formatter = NumberFormat.currency(
      locale: locale.toString(),
      symbol: symbol,
    );
    return formatter.format(amount);
  }
  
  static String formatNumber(num number, Locale locale) {
    final formatter = NumberFormat('#,##0', locale.toString());
    return formatter.format(number);
  }
  
  static String formatPercentage(double value, Locale locale) {
    final formatter = NumberFormat.percentPattern(locale.toString());
    return formatter.format(value);
  }
  
  static String formatCompactNumber(num number, Locale locale) {
    final formatter = NumberFormat.compact(locale: locale.toString());
    return formatter.format(number);
  }
  
  // Relative time formatting
  static String formatRelativeTime(DateTime dateTime, Locale locale) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);
    
    if (difference.inDays > 0) {
      return formatDate(dateTime, locale);
    } else if (difference.inHours > 0) {
      return '${difference.inHours}h ago';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes}m ago';
    } else {
      return 'Just now';
    }
  }
}

// lib/widgets/formatted_text_widgets.dart
class FormattedDateText extends StatelessWidget {
  final DateTime date;
  final TextStyle? style;
  
  const FormattedDateText({
    Key? key,
    required this.date,
    this.style,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    final locale = Localizations.localeOf(context);
    
    return Text(
      FormattingUtils.formatDate(date, locale),
      style: style,
    );
  }
}

class FormattedCurrencyText extends StatelessWidget {
  final double amount;
  final String? currencySymbol;
  final TextStyle? style;
  
  const FormattedCurrencyText({
    Key? key,
    required this.amount,
    this.currencySymbol,
    this.style,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    final locale = Localizations.localeOf(context);
    
    return Text(
      FormattingUtils.formatCurrency(amount, locale, symbol: currencySymbol),
      style: style,
    );
  }
}
```

**8. Validation with Localization:**

```dart
// lib/utils/validation_utils.dart
import '../generated/l10n/app_localizations.dart';

class ValidationUtils {
  static String? validateEmail(String? value, AppLocalizations l10n) {
    if (value == null || value.isEmpty) {
      return l10n.validationEmailRequired;
    }
    
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(value)) {
      return l10n.validationEmailInvalid;
    }
    
    return null;
  }
  
  static String? validatePassword(String? value, AppLocalizations l10n) {
    if (value == null || value.isEmpty) {
      return l10n.validationPasswordRequired;
    }
    
    if (value.length < 8) {
      return l10n.validationPasswordTooShort;
    }
    
    return null;
  }
  
  static String? validateRequired(String? value, String fieldName, AppLocalizations l10n) {
    if (value == null || value.isEmpty) {
      return '$fieldName is required'; // You can add this to ARB files
    }
    return null;
  }
}
```

**9. Testing Localization:**

```dart
// test/localization_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:my_flutter_app/generated/l10n/app_localizations.dart';

void main() {
  group('Localization Tests', () {
    testWidgets('English localization', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          locale: Locale('en'),
          localizationsDelegates: [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
          ],
          supportedLocales: AppLocalizations.supportedLocales,
          home: Builder(
            builder: (context) {
              final l10n = AppLocalizations.of(context)!;
              return Scaffold(
                body: Text(l10n.welcome),
              );
            },
          ),
        ),
      );
      
      expect(find.text('Welcome'), findsOneWidget);
    });
    
    testWidgets('Spanish localization', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          locale: Locale('es'),
          localizationsDelegates: [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
          ],
          supportedLocales: AppLocalizations.supportedLocales,
          home: Builder(
            builder: (context) {
              final l10n = AppLocalizations.of(context)!;
              return Scaffold(
                body: Text(l10n.welcome),
              );
            },
          ),
        ),
      );
      
      expect(find.text('Bienvenido'), findsOneWidget);
    });
    
    testWidgets('Pluralization test', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          locale: Locale('en'),
          localizationsDelegates: [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
          ],
          supportedLocales: AppLocalizations.supportedLocales,
          home: Builder(
            builder: (context) {
              final l10n = AppLocalizations.of(context)!;
              return Scaffold(
                body: Column(
                  children: [
                    Text(l10n.itemCount(0)),
                    Text(l10n.itemCount(1)),
                    Text(l10n.itemCount(5)),
                  ],
                ),
              );
            },
          ),
        ),
      );
      
      expect(find.text('No items'), findsOneWidget);
      expect(find.text('One item'), findsOneWidget);
      expect(find.text('5 items'), findsOneWidget);
    });
  });
}
```

**Best Practices:**

1. **Use ARB files** for better translation management
2. **Implement proper pluralization** for different languages
3. **Support RTL languages** with appropriate layouts
4. **Format dates, numbers, and currencies** according to locale
5. **Test all supported locales** thoroughly
6. **Use context-aware translations** when needed
7. **Implement fallback mechanisms** for missing translations
8. **Consider cultural differences** beyond language
9. **Use professional translation services** for production apps
10. **Keep translation keys descriptive** and organized

### Q19: How do you implement accessibility features in Flutter?

**Answer:**
Accessibility in Flutter ensures your app is usable by people with disabilities. Flutter provides comprehensive accessibility support through semantic widgets, screen reader compatibility, and various accessibility features.

**1. Basic Accessibility Setup:**

```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(MyAccessibleApp());
}

class MyAccessibleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Accessible Flutter App',
      
      // Enable accessibility debugging
      debugShowCheckedModeBanner: false,
      showSemanticsDebugger: false, // Set to true for debugging
      
      theme: ThemeData(
        primarySwatch: Colors.blue,
        
        // High contrast theme support
        visualDensity: VisualDensity.adaptivePlatformDensity,
        
        // Accessibility-friendly text theme
        textTheme: TextTheme(
          bodyLarge: TextStyle(
            fontSize: 16,
            height: 1.5, // Line height for readability
          ),
          bodyMedium: TextStyle(
            fontSize: 14,
            height: 1.4,
          ),
        ),
        
        // Ensure sufficient color contrast
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          brightness: Brightness.light,
        ),
      ),
      
      // Dark theme for accessibility
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.blue,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          brightness: Brightness.dark,
        ),
      ),
      
      home: AccessibleHomeScreen(),
    );
  }
}
```

**2. Semantic Widgets and Labels:**

```dart
// lib/widgets/accessible_widgets.dart
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

class AccessibleButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final String? semanticLabel;
  final String? tooltip;
  final bool isLoading;
  
  const AccessibleButton({
    Key? key,
    required this.text,
    this.onPressed,
    this.semanticLabel,
    this.tooltip,
    this.isLoading = false,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: semanticLabel ?? text,
      hint: tooltip,
      button: true,
      enabled: onPressed != null && !isLoading,
      child: Tooltip(
        message: tooltip ?? text,
        child: ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          child: isLoading
              ? SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    semanticsLabel: 'Loading',
                  ),
                )
              : Text(text),
        ),
      ),
    );
  }
}

class AccessibleTextField extends StatelessWidget {
  final String label;
  final String? hint;
  final String? errorText;
  final TextEditingController? controller;
  final bool obscureText;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;
  final String? semanticLabel;
  
  const AccessibleTextField({
    Key? key,
    required this.label,
    this.hint,
    this.errorText,
    this.controller,
    this.obscureText = false,
    this.keyboardType,
    this.onChanged,
    this.semanticLabel,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: semanticLabel ?? label,
      hint: hint,
      textField: true,
      child: TextFormField(
        controller: controller,
        obscureText: obscureText,
        keyboardType: keyboardType,
        onChanged: onChanged,
        
        // Accessibility properties
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          errorText: errorText,
          
          // Ensure sufficient contrast
          border: OutlineInputBorder(),
          
          // Error styling for accessibility
          errorStyle: TextStyle(
            fontSize: 14,
            color: Theme.of(context).colorScheme.error,
          ),
        ),
        
        // Screen reader support
        style: TextStyle(
          fontSize: 16, // Minimum readable size
        ),
      ),
    );
  }
}

class AccessibleCard extends StatelessWidget {
  final Widget child;
  final String? semanticLabel;
  final VoidCallback? onTap;
  final bool isSelected;
  
  const AccessibleCard({
    Key? key,
    required this.child,
    this.semanticLabel,
    this.onTap,
    this.isSelected = false,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: semanticLabel,
      button: onTap != null,
      selected: isSelected,
      child: Card(
        elevation: isSelected ? 8 : 2,
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: EdgeInsets.all(16),
            child: child,
          ),
        ),
      ),
    );
  }
}
```

**3. Screen Reader Support:**

```dart
// lib/widgets/screen_reader_widgets.dart
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

class ScreenReaderAnnouncement extends StatefulWidget {
  final String message;
  final Widget child;
  
  const ScreenReaderAnnouncement({
    Key? key,
    required this.message,
    required this.child,
  }) : super(key: key);
  
  @override
  _ScreenReaderAnnouncementState createState() => _ScreenReaderAnnouncementState();
}

class _ScreenReaderAnnouncementState extends State<ScreenReaderAnnouncement> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SemanticsService.announce(widget.message, TextDirection.ltr);
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return widget.child;
  }
}

class AccessibleListView extends StatelessWidget {
  final List<Widget> children;
  final String? semanticLabel;
  
  const AccessibleListView({
    Key? key,
    required this.children,
    this.semanticLabel,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: semanticLabel ?? 'List with ${children.length} items',
      child: ListView.builder(
        itemCount: children.length,
        itemBuilder: (context, index) {
          return Semantics(
            label: 'Item ${index + 1} of ${children.length}',
            child: children[index],
          );
        },
      ),
    );
  }
}

class AccessibleTabBar extends StatelessWidget {
  final List<Tab> tabs;
  final TabController? controller;
  
  const AccessibleTabBar({
    Key? key,
    required this.tabs,
    this.controller,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Tab bar with ${tabs.length} tabs',
      child: TabBar(
        controller: controller,
        tabs: tabs.asMap().entries.map((entry) {
          final index = entry.key;
          final tab = entry.value;
          
          return Semantics(
            label: 'Tab ${index + 1} of ${tabs.length}: ${tab.text}',
            selected: controller?.index == index,
            child: tab,
          );
        }).toList(),
      ),
    );
  }
}
```

**4. Focus Management:**

```dart
// lib/widgets/focus_management.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AccessibleForm extends StatefulWidget {
  @override
  _AccessibleFormState createState() => _AccessibleFormState();
}

class _AccessibleFormState extends State<AccessibleForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  
  final _emailFocusNode = FocusNode();
  final _passwordFocusNode = FocusNode();
  final _submitFocusNode = FocusNode();
  
  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _emailFocusNode.dispose();
    _passwordFocusNode.dispose();
    _submitFocusNode.dispose();
    super.dispose();
  }
  
  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // Announce success to screen reader
      SemanticsService.announce(
        'Form submitted successfully',
        TextDirection.ltr,
      );
      
      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Login successful'),
          behavior: SnackBarBehavior.floating,
        ),
      );
    } else {
      // Announce validation errors
      SemanticsService.announce(
        'Please fix the errors in the form',
        TextDirection.ltr,
      );
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Accessible Login Form'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Semantics(
                label: 'Login form',
                child: Text(
                  'Please enter your credentials',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
              ),
              SizedBox(height: 24),
              
              // Email field with focus management
              TextFormField(
                controller: _emailController,
                focusNode: _emailFocusNode,
                keyboardType: TextInputType.emailAddress,
                textInputAction: TextInputAction.next,
                
                decoration: InputDecoration(
                  labelText: 'Email',
                  hintText: 'Enter your email address',
                  prefixIcon: Icon(Icons.email),
                  border: OutlineInputBorder(),
                ),
                
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Email is required';
                  }
                  if (!value.contains('@')) {
                    return 'Please enter a valid email';
                  }
                  return null;
                },
                
                onFieldSubmitted: (_) {
                  FocusScope.of(context).requestFocus(_passwordFocusNode);
                },
              ),
              SizedBox(height: 16),
              
              // Password field
              TextFormField(
                controller: _passwordController,
                focusNode: _passwordFocusNode,
                obscureText: true,
                textInputAction: TextInputAction.done,
                
                decoration: InputDecoration(
                  labelText: 'Password',
                  hintText: 'Enter your password',
                  prefixIcon: Icon(Icons.lock),
                  border: OutlineInputBorder(),
                ),
                
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Password is required';
                  }
                  if (value.length < 6) {
                    return 'Password must be at least 6 characters';
                  }
                  return null;
                },
                
                onFieldSubmitted: (_) {
                  FocusScope.of(context).requestFocus(_submitFocusNode);
                },
              ),
              SizedBox(height: 24),
              
              // Submit button with focus
              Focus(
                focusNode: _submitFocusNode,
                child: ElevatedButton(
                  onPressed: _submitForm,
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: 16),
                    child: Text(
                      'Login',
                      style: TextStyle(fontSize: 16),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Custom focus traversal
class CustomFocusTraversalPolicy extends OrderedTraversalPolicy {
  @override
  Iterable<FocusNode> sortDescendants(Iterable<FocusNode> descendants, FocusNode currentNode) {
    return descendants.toList()
      ..sort((FocusNode a, FocusNode b) {
        // Custom sorting logic for focus order
        final aOrder = a.debugLabel?.hashCode ?? 0;
        final bOrder = b.debugLabel?.hashCode ?? 0;
        return aOrder.compareTo(bOrder);
      });
  }
}
```

**5. High Contrast and Visual Accessibility:**

```dart
// lib/themes/accessible_theme.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AccessibleTheme {
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    primarySwatch: Colors.blue,
    
    // High contrast colors
    colorScheme: ColorScheme.light(
      primary: Color(0xFF0066CC),
      secondary: Color(0xFF0066CC),
      error: Color(0xFFD32F2F),
      background: Color(0xFFFFFFFF),
      surface: Color(0xFFFFFFFF),
      onPrimary: Color(0xFFFFFFFF),
      onSecondary: Color(0xFFFFFFFF),
      onError: Color(0xFFFFFFFF),
      onBackground: Color(0xFF000000),
      onSurface: Color(0xFF000000),
    ),
    
    // Accessible text theme
    textTheme: TextTheme(
      displayLarge: TextStyle(
        fontSize: 32,
        fontWeight: FontWeight.bold,
        height: 1.2,
        color: Color(0xFF000000),
      ),
      displayMedium: TextStyle(
        fontSize: 28,
        fontWeight: FontWeight.bold,
        height: 1.2,
        color: Color(0xFF000000),
      ),
      displaySmall: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        height: 1.2,
        color: Color(0xFF000000),
      ),
      headlineLarge: TextStyle(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        height: 1.3,
        color: Color(0xFF000000),
      ),
      headlineMedium: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        height: 1.3,
        color: Color(0xFF000000),
      ),
      headlineSmall: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        height: 1.3,
        color: Color(0xFF000000),
      ),
      bodyLarge: TextStyle(
        fontSize: 16,
        height: 1.5,
        color: Color(0xFF000000),
      ),
      bodyMedium: TextStyle(
        fontSize: 14,
        height: 1.4,
        color: Color(0xFF000000),
      ),
      bodySmall: TextStyle(
        fontSize: 12,
        height: 1.4,
        color: Color(0xFF666666),
      ),
    ),
    
    // Button theme with sufficient touch targets
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        minimumSize: Size(88, 48), // Minimum touch target size
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        textStyle: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),
    
    // Input decoration theme
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderSide: BorderSide(width: 2),
      ),
      focusedBorder: OutlineInputBorder(
        borderSide: BorderSide(color: Color(0xFF0066CC), width: 3),
      ),
      errorBorder: OutlineInputBorder(
        borderSide: BorderSide(color: Color(0xFFD32F2F), width: 2),
      ),
      contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
    ),
  );
  
  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    primarySwatch: Colors.blue,
    
    // High contrast dark colors
    colorScheme: ColorScheme.dark(
      primary: Color(0xFF4FC3F7),
      secondary: Color(0xFF4FC3F7),
      error: Color(0xFFFF5252),
      background: Color(0xFF000000),
      surface: Color(0xFF121212),
      onPrimary: Color(0xFF000000),
      onSecondary: Color(0xFF000000),
      onError: Color(0xFF000000),
      onBackground: Color(0xFFFFFFFF),
      onSurface: Color(0xFFFFFFFF),
    ),
    
    // Dark theme text
    textTheme: TextTheme(
      bodyLarge: TextStyle(
        fontSize: 16,
        height: 1.5,
        color: Color(0xFFFFFFFF),
      ),
      bodyMedium: TextStyle(
        fontSize: 14,
        height: 1.4,
        color: Color(0xFFFFFFFF),
      ),
    ),
  );
  
  // High contrast theme for accessibility
  static ThemeData highContrastTheme = ThemeData(
    brightness: Brightness.light,
    primarySwatch: Colors.blue,
    
    colorScheme: ColorScheme.light(
      primary: Color(0xFF000000),
      secondary: Color(0xFF000000),
      error: Color(0xFFFF0000),
      background: Color(0xFFFFFFFF),
      surface: Color(0xFFFFFFFF),
      onPrimary: Color(0xFFFFFFFF),
      onSecondary: Color(0xFFFFFFFF),
      onError: Color(0xFFFFFFFF),
      onBackground: Color(0xFF000000),
      onSurface: Color(0xFF000000),
    ),
    
    textTheme: TextTheme(
      bodyLarge: TextStyle(
        fontSize: 18, // Larger text for high contrast
        height: 1.6,
        color: Color(0xFF000000),
        fontWeight: FontWeight.w500,
      ),
      bodyMedium: TextStyle(
        fontSize: 16,
        height: 1.5,
        color: Color(0xFF000000),
        fontWeight: FontWeight.w500,
      ),
    ),
  );
}
```

**6. Gesture and Touch Accessibility:**

```dart
// lib/widgets/gesture_accessibility.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AccessibleGestureDetector extends StatelessWidget {
  final Widget child;
  final VoidCallback? onTap;
  final VoidCallback? onDoubleTap;
  final VoidCallback? onLongPress;
  final String? semanticLabel;
  final String? semanticHint;
  
  const AccessibleGestureDetector({
    Key? key,
    required this.child,
    this.onTap,
    this.onDoubleTap,
    this.onLongPress,
    this.semanticLabel,
    this.semanticHint,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: semanticLabel,
      hint: semanticHint,
      button: onTap != null,
      onTap: onTap,
      onLongPress: onLongPress,
      child: GestureDetector(
        onTap: () {
          // Provide haptic feedback
          HapticFeedback.lightImpact();
          onTap?.call();
        },
        onDoubleTap: () {
          HapticFeedback.mediumImpact();
          onDoubleTap?.call();
        },
        onLongPress: () {
          HapticFeedback.heavyImpact();
          onLongPress?.call();
        },
        child: Container(
          // Ensure minimum touch target size (44x44 points)
          constraints: BoxConstraints(
            minWidth: 44,
            minHeight: 44,
          ),
          child: child,
        ),
      ),
    );
  }
}

class AccessibleSlider extends StatefulWidget {
  final double value;
  final double min;
  final double max;
  final ValueChanged<double>? onChanged;
  final String label;
  final String? semanticFormatterCallback;
  
  const AccessibleSlider({
    Key? key,
    required this.value,
    this.min = 0.0,
    this.max = 1.0,
    this.onChanged,
    required this.label,
    this.semanticFormatterCallback,
  }) : super(key: key);
  
  @override
  _AccessibleSliderState createState() => _AccessibleSliderState();
}

class _AccessibleSliderState extends State<AccessibleSlider> {
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: widget.label,
      value: widget.semanticFormatterCallback ?? '${(widget.value * 100).round()}%',
      slider: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.label,
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          SizedBox(height: 8),
          Slider(
            value: widget.value,
            min: widget.min,
            max: widget.max,
            onChanged: (value) {
              HapticFeedback.selectionClick();
              widget.onChanged?.call(value);
            },
            semanticFormatterCallback: (double value) {
              return widget.semanticFormatterCallback ?? '${(value * 100).round()} percent';
            },
          ),
          Text(
            'Current value: ${(widget.value * 100).round()}%',
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
```

**7. Testing Accessibility:**

```dart
// test/accessibility_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/widgets/accessible_widgets.dart';

void main() {
  group('Accessibility Tests', () {
    testWidgets('AccessibleButton has correct semantics', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: AccessibleButton(
              text: 'Submit',
              semanticLabel: 'Submit form',
              tooltip: 'Press to submit the form',
              onPressed: () {},
            ),
          ),
        ),
      );
      
      // Test semantic properties
      final semantics = tester.getSemantics(find.byType(AccessibleButton));
      expect(semantics.label, 'Submit form');
      expect(semantics.hint, 'Press to submit the form');
      expect(semantics.hasFlag(SemanticsFlag.isButton), true);
      expect(semantics.hasFlag(SemanticsFlag.isEnabled), true);
    });
    
    testWidgets('AccessibleTextField has proper focus management', (WidgetTester tester) async {
      final controller = TextEditingController();
      
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: AccessibleTextField(
              label: 'Email',
              hint: 'Enter your email',
              controller: controller,
            ),
          ),
        ),
      );
      
      // Test focus
      await tester.tap(find.byType(TextFormField));
      await tester.pump();
      
      expect(tester.binding.focusManager.primaryFocus?.hasFocus, true);
    });
    
    testWidgets('Screen reader announcements work', (WidgetTester tester) async {
      final List<String> announcements = [];
      
      tester.binding.defaultBinaryMessenger.setMockMethodCallHandler(
        SystemChannels.accessibility,
        (MethodCall methodCall) async {
          if (methodCall.method == 'announce') {
            announcements.add(methodCall.arguments['message']);
          }
          return null;
        },
      );
      
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ScreenReaderAnnouncement(
              message: 'Test announcement',
              child: Text('Content'),
            ),
          ),
        ),
      );
      
      await tester.pump();
      
      expect(announcements, contains('Test announcement'));
    });
    
    testWidgets('Minimum touch target size is enforced', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: AccessibleGestureDetector(
              onTap: () {},
              child: Icon(Icons.star, size: 20),
            ),
          ),
        ),
      );
      
      final container = tester.widget<Container>(
        find.descendant(
          of: find.byType(AccessibleGestureDetector),
          matching: find.byType(Container),
        ),
      );
      
      expect(container.constraints!.minWidth, 44);
      expect(container.constraints!.minHeight, 44);
    });
  });
}
```

**8. Accessibility Service Integration:**

```dart
// lib/services/accessibility_service.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AccessibilityService {
  static bool _isScreenReaderEnabled = false;
  static bool _isHighContrastEnabled = false;
  static double _textScaleFactor = 1.0;
  
  static bool get isScreenReaderEnabled => _isScreenReaderEnabled;
  static bool get isHighContrastEnabled => _isHighContrastEnabled;
  static double get textScaleFactor => _textScaleFactor;
  
  static Future<void> initialize() async {
    await _checkAccessibilitySettings();
  }
  
  static Future<void> _checkAccessibilitySettings() async {
    try {
      // Check if screen reader is enabled
      final bool? screenReader = await _invokeMethod('isScreenReaderEnabled');
      _isScreenReaderEnabled = screenReader ?? false;
      
      // Check if high contrast is enabled
      final bool? highContrast = await _invokeMethod('isHighContrastEnabled');
      _isHighContrastEnabled = highContrast ?? false;
      
      // Get text scale factor
      final double? textScale = await _invokeMethod('getTextScaleFactor');
      _textScaleFactor = textScale ?? 1.0;
    } catch (e) {
      debugPrint('Error checking accessibility settings: $e');
    }
  }
  
  static Future<T?> _invokeMethod<T>(String method) async {
    try {
      return await SystemChannels.accessibility.invokeMethod<T>(method);
    } catch (e) {
      debugPrint('Error invoking accessibility method $method: $e');
      return null;
    }
  }
  
  static Future<void> announceToScreenReader(String message) async {
    if (_isScreenReaderEnabled) {
      await SemanticsService.announce(message, TextDirection.ltr);
    }
  }
  
  static ThemeData getAccessibleTheme(BuildContext context) {
    if (_isHighContrastEnabled) {
      return AccessibleTheme.highContrastTheme;
    }
    
    final brightness = MediaQuery.of(context).platformBrightness;
    return brightness == Brightness.dark
        ? AccessibleTheme.darkTheme
        : AccessibleTheme.lightTheme;
  }
  
  static double getAccessibleFontSize(double baseFontSize) {
    return baseFontSize * _textScaleFactor;
  }
}
```

**Best Practices:**

1. **Use semantic widgets** to provide meaningful descriptions
2. **Ensure sufficient color contrast** (4.5:1 for normal text, 3:1 for large text)
3. **Provide alternative text** for images and icons
4. **Implement proper focus management** for keyboard navigation
5. **Use minimum touch target sizes** (44x44 points)
6. **Test with screen readers** (TalkBack on Android, VoiceOver on iOS)
7. **Support dynamic text sizing** for users with visual impairments
8. **Provide haptic feedback** for touch interactions
9. **Use descriptive error messages** and validation feedback
10. **Test accessibility** with automated tools and real users

### Q20: What are the best practices for Flutter app architecture and design patterns?

**Answer:**
Flutter app architecture is crucial for building maintainable, scalable, and testable applications. Here are the best practices and design patterns for Flutter development.

**1. Clean Architecture Implementation:**

```dart
// lib/core/architecture/base_use_case.dart
import 'package:dartz/dartz.dart';
import '../error/failures.dart';

abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}

abstract class UseCaseNoParams<Type> {
  Future<Either<Failure, Type>> call();
}

class NoParams {
  const NoParams();
}

// lib/core/error/failures.dart
abstract class Failure {
  final String message;
  const Failure(this.message);
}

class ServerFailure extends Failure {
  const ServerFailure(String message) : super(message);
}

class CacheFailure extends Failure {
  const CacheFailure(String message) : super(message);
}

class NetworkFailure extends Failure {
  const NetworkFailure(String message) : super(message);
}

// lib/core/error/exceptions.dart
class ServerException implements Exception {
  final String message;
  const ServerException(this.message);
}

class CacheException implements Exception {
  final String message;
  const CacheException(this.message);
}

class NetworkException implements Exception {
  final String message;
  const NetworkException(this.message);
}
```

**2. Domain Layer (Business Logic):**

```dart
// lib/features/user/domain/entities/user.dart
class User {
  final String id;
  final String name;
  final String email;
  final String? avatar;
  final DateTime createdAt;
  final bool isActive;
  
  const User({
    required this.id,
    required this.name,
    required this.email,
    this.avatar,
    required this.createdAt,
    required this.isActive,
  });
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is User && other.id == id;
  }
  
  @override
  int get hashCode => id.hashCode;
}

// lib/features/user/domain/repositories/user_repository.dart
import 'package:dartz/dartz.dart';
import '../../../core/error/failures.dart';
import '../entities/user.dart';

abstract class UserRepository {
  Future<Either<Failure, List<User>>> getUsers();
  Future<Either<Failure, User>> getUserById(String id);
  Future<Either<Failure, User>> createUser(User user);
  Future<Either<Failure, User>> updateUser(User user);
  Future<Either<Failure, void>> deleteUser(String id);
  Future<Either<Failure, List<User>>> searchUsers(String query);
}

// lib/features/user/domain/usecases/get_users.dart
import 'package:dartz/dartz.dart';
import '../../../core/architecture/base_use_case.dart';
import '../../../core/error/failures.dart';
import '../entities/user.dart';
import '../repositories/user_repository.dart';

class GetUsers implements UseCaseNoParams<List<User>> {
  final UserRepository repository;
  
  GetUsers(this.repository);
  
  @override
  Future<Either<Failure, List<User>>> call() async {
    return await repository.getUsers();
  }
}

class GetUserById implements UseCase<User, String> {
  final UserRepository repository;
  
  GetUserById(this.repository);
  
  @override
  Future<Either<Failure, User>> call(String id) async {
    return await repository.getUserById(id);
  }
}

class CreateUser implements UseCase<User, CreateUserParams> {
  final UserRepository repository;
  
  CreateUser(this.repository);
  
  @override
  Future<Either<Failure, User>> call(CreateUserParams params) async {
    final user = User(
      id: '', // Will be generated by backend
      name: params.name,
      email: params.email,
      avatar: params.avatar,
      createdAt: DateTime.now(),
      isActive: true,
    );
    return await repository.createUser(user);
  }
}

class CreateUserParams {
  final String name;
  final String email;
  final String? avatar;
  
  const CreateUserParams({
    required this.name,
    required this.email,
    this.avatar,
  });
}
```

**3. Data Layer (Repository Implementation):**

```dart
// lib/features/user/data/models/user_model.dart
import '../../domain/entities/user.dart';

class UserModel extends User {
  const UserModel({
    required String id,
    required String name,
    required String email,
    String? avatar,
    required DateTime createdAt,
    required bool isActive,
  }) : super(
          id: id,
          name: name,
          email: email,
          avatar: avatar,
          createdAt: createdAt,
          isActive: isActive,
        );
  
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      avatar: json['avatar'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
      isActive: json['is_active'] as bool,
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'avatar': avatar,
      'created_at': createdAt.toIso8601String(),
      'is_active': isActive,
    };
  }
  
  factory UserModel.fromEntity(User user) {
    return UserModel(
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      isActive: user.isActive,
    );
  }
}

// lib/features/user/data/datasources/user_remote_data_source.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../../core/error/exceptions.dart';
import '../models/user_model.dart';

abstract class UserRemoteDataSource {
  Future<List<UserModel>> getUsers();
  Future<UserModel> getUserById(String id);
  Future<UserModel> createUser(UserModel user);
  Future<UserModel> updateUser(UserModel user);
  Future<void> deleteUser(String id);
  Future<List<UserModel>> searchUsers(String query);
}

class UserRemoteDataSourceImpl implements UserRemoteDataSource {
  final http.Client client;
  final String baseUrl;
  
  UserRemoteDataSourceImpl({
    required this.client,
    required this.baseUrl,
  });
  
  @override
  Future<List<UserModel>> getUsers() async {
    try {
      final response = await client.get(
        Uri.parse('$baseUrl/users'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = json.decode(response.body);
        return jsonList.map((json) => UserModel.fromJson(json)).toList();
      } else {
        throw ServerException('Failed to fetch users: ${response.statusCode}');
      }
    } catch (e) {
      if (e is ServerException) rethrow;
      throw NetworkException('Network error: $e');
    }
  }
  
  @override
  Future<UserModel> getUserById(String id) async {
    try {
      final response = await client.get(
        Uri.parse('$baseUrl/users/$id'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        return UserModel.fromJson(json.decode(response.body));
      } else if (response.statusCode == 404) {
        throw ServerException('User not found');
      } else {
        throw ServerException('Failed to fetch user: ${response.statusCode}');
      }
    } catch (e) {
      if (e is ServerException) rethrow;
      throw NetworkException('Network error: $e');
    }
  }
  
  @override
  Future<UserModel> createUser(UserModel user) async {
    try {
      final response = await client.post(
        Uri.parse('$baseUrl/users'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(user.toJson()),
      );
      
      if (response.statusCode == 201) {
        return UserModel.fromJson(json.decode(response.body));
      } else {
        throw ServerException('Failed to create user: ${response.statusCode}');
      }
    } catch (e) {
      if (e is ServerException) rethrow;
      throw NetworkException('Network error: $e');
    }
  }
  
  @override
  Future<UserModel> updateUser(UserModel user) async {
    try {
      final response = await client.put(
        Uri.parse('$baseUrl/users/${user.id}'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(user.toJson()),
      );
      
      if (response.statusCode == 200) {
        return UserModel.fromJson(json.decode(response.body));
      } else {
        throw ServerException('Failed to update user: ${response.statusCode}');
      }
    } catch (e) {
      if (e is ServerException) rethrow;
      throw NetworkException('Network error: $e');
    }
  }
  
  @override
  Future<void> deleteUser(String id) async {
    try {
      final response = await client.delete(
        Uri.parse('$baseUrl/users/$id'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode != 204) {
        throw ServerException('Failed to delete user: ${response.statusCode}');
      }
    } catch (e) {
      if (e is ServerException) rethrow;
      throw NetworkException('Network error: $e');
    }
  }
  
  @override
  Future<List<UserModel>> searchUsers(String query) async {
    try {
      final response = await client.get(
        Uri.parse('$baseUrl/users/search?q=${Uri.encodeComponent(query)}'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = json.decode(response.body);
        return jsonList.map((json) => UserModel.fromJson(json)).toList();
      } else {
        throw ServerException('Failed to search users: ${response.statusCode}');
      }
    } catch (e) {
      if (e is ServerException) rethrow;
      throw NetworkException('Network error: $e');
    }
  }
}

// lib/features/user/data/datasources/user_local_data_source.dart
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/error/exceptions.dart';
import '../models/user_model.dart';

abstract class UserLocalDataSource {
  Future<List<UserModel>> getCachedUsers();
  Future<void> cacheUsers(List<UserModel> users);
  Future<UserModel?> getCachedUser(String id);
  Future<void> cacheUser(UserModel user);
  Future<void> clearCache();
}

class UserLocalDataSourceImpl implements UserLocalDataSource {
  final SharedPreferences sharedPreferences;
  static const String CACHED_USERS = 'CACHED_USERS';
  static const String CACHED_USER_PREFIX = 'CACHED_USER_';
  
  UserLocalDataSourceImpl({required this.sharedPreferences});
  
  @override
  Future<List<UserModel>> getCachedUsers() async {
    try {
      final jsonString = sharedPreferences.getString(CACHED_USERS);
      if (jsonString != null) {
        final List<dynamic> jsonList = json.decode(jsonString);
        return jsonList.map((json) => UserModel.fromJson(json)).toList();
      } else {
        throw CacheException('No cached users found');
      }
    } catch (e) {
      throw CacheException('Failed to get cached users: $e');
    }
  }
  
  @override
  Future<void> cacheUsers(List<UserModel> users) async {
    try {
      final jsonString = json.encode(users.map((user) => user.toJson()).toList());
      await sharedPreferences.setString(CACHED_USERS, jsonString);
    } catch (e) {
      throw CacheException('Failed to cache users: $e');
    }
  }
  
  @override
  Future<UserModel?> getCachedUser(String id) async {
    try {
      final jsonString = sharedPreferences.getString('$CACHED_USER_PREFIX$id');
      if (jsonString != null) {
        return UserModel.fromJson(json.decode(jsonString));
      }
      return null;
    } catch (e) {
      throw CacheException('Failed to get cached user: $e');
    }
  }
  
  @override
  Future<void> cacheUser(UserModel user) async {
    try {
      final jsonString = json.encode(user.toJson());
      await sharedPreferences.setString('$CACHED_USER_PREFIX${user.id}', jsonString);
    } catch (e) {
      throw CacheException('Failed to cache user: $e');
    }
  }
  
  @override
  Future<void> clearCache() async {
    try {
      final keys = sharedPreferences.getKeys();
      final userKeys = keys.where((key) => 
        key == CACHED_USERS || key.startsWith(CACHED_USER_PREFIX)
      );
      
      for (final key in userKeys) {
        await sharedPreferences.remove(key);
      }
    } catch (e) {
      throw CacheException('Failed to clear cache: $e');
    }
  }
}

// lib/features/user/data/repositories/user_repository_impl.dart
import 'package:dartz/dartz.dart';
import '../../../core/error/exceptions.dart';
import '../../../core/error/failures.dart';
import '../../../core/network/network_info.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/user_repository.dart';
import '../datasources/user_local_data_source.dart';
import '../datasources/user_remote_data_source.dart';
import '../models/user_model.dart';

class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource remoteDataSource;
  final UserLocalDataSource localDataSource;
  final NetworkInfo networkInfo;
  
  UserRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.networkInfo,
  });
  
  @override
  Future<Either<Failure, List<User>>> getUsers() async {
    if (await networkInfo.isConnected) {
      try {
        final remoteUsers = await remoteDataSource.getUsers();
        await localDataSource.cacheUsers(remoteUsers);
        return Right(remoteUsers);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      } on NetworkException catch (e) {
        return Left(NetworkFailure(e.message));
      }
    } else {
      try {
        final localUsers = await localDataSource.getCachedUsers();
        return Right(localUsers);
      } on CacheException catch (e) {
        return Left(CacheFailure(e.message));
      }
    }
  }
  
  @override
  Future<Either<Failure, User>> getUserById(String id) async {
    if (await networkInfo.isConnected) {
      try {
        final remoteUser = await remoteDataSource.getUserById(id);
        await localDataSource.cacheUser(remoteUser);
        return Right(remoteUser);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      } on NetworkException catch (e) {
        return Left(NetworkFailure(e.message));
      }
    } else {
      try {
        final localUser = await localDataSource.getCachedUser(id);
        if (localUser != null) {
          return Right(localUser);
        } else {
          return Left(CacheFailure('User not found in cache'));
        }
      } on CacheException catch (e) {
        return Left(CacheFailure(e.message));
      }
    }
  }
  
  @override
  Future<Either<Failure, User>> createUser(User user) async {
    if (await networkInfo.isConnected) {
      try {
        final userModel = UserModel.fromEntity(user);
        final createdUser = await remoteDataSource.createUser(userModel);
        await localDataSource.cacheUser(createdUser);
        return Right(createdUser);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      } on NetworkException catch (e) {
        return Left(NetworkFailure(e.message));
      }
    } else {
      return Left(NetworkFailure('No internet connection'));
    }
  }
  
  @override
  Future<Either<Failure, User>> updateUser(User user) async {
    if (await networkInfo.isConnected) {
      try {
        final userModel = UserModel.fromEntity(user);
        final updatedUser = await remoteDataSource.updateUser(userModel);
        await localDataSource.cacheUser(updatedUser);
        return Right(updatedUser);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      } on NetworkException catch (e) {
        return Left(NetworkFailure(e.message));
      }
    } else {
      return Left(NetworkFailure('No internet connection'));
    }
  }
  
  @override
  Future<Either<Failure, void>> deleteUser(String id) async {
    if (await networkInfo.isConnected) {
      try {
        await remoteDataSource.deleteUser(id);
        // Remove from cache as well
        final keys = (await localDataSource.sharedPreferences.getKeys())
            .where((key) => key.contains(id));
        for (final key in keys) {
          await localDataSource.sharedPreferences.remove(key);
        }
        return Right(null);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      } on NetworkException catch (e) {
        return Left(NetworkFailure(e.message));
      }
    } else {
      return Left(NetworkFailure('No internet connection'));
    }
  }
  
  @override
  Future<Either<Failure, List<User>>> searchUsers(String query) async {
    if (await networkInfo.isConnected) {
      try {
        final users = await remoteDataSource.searchUsers(query);
        return Right(users);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      } on NetworkException catch (e) {
        return Left(NetworkFailure(e.message));
      }
    } else {
      return Left(NetworkFailure('No internet connection'));
    }
  }
}
```

**4. Presentation Layer (BLoC Pattern):**

```dart
// lib/features/user/presentation/bloc/user_bloc.dart
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import '../../domain/entities/user.dart';
import '../../domain/usecases/get_users.dart';
import '../../domain/usecases/get_user_by_id.dart';
import '../../domain/usecases/create_user.dart';
import '../../domain/usecases/update_user.dart';
import '../../domain/usecases/delete_user.dart';
import '../../domain/usecases/search_users.dart';

// Events
abstract class UserEvent extends Equatable {
  const UserEvent();
  
  @override
  List<Object?> get props => [];
}

class GetUsersEvent extends UserEvent {}

class GetUserByIdEvent extends UserEvent {
  final String id;
  
  const GetUserByIdEvent(this.id);
  
  @override
  List<Object?> get props => [id];
}

class CreateUserEvent extends UserEvent {
  final CreateUserParams params;
  
  const CreateUserEvent(this.params);
  
  @override
  List<Object?> get props => [params];
}

class UpdateUserEvent extends UserEvent {
  final User user;
  
  const UpdateUserEvent(this.user);
  
  @override
  List<Object?> get props => [user];
}

class DeleteUserEvent extends UserEvent {
  final String id;
  
  const DeleteUserEvent(this.id);
  
  @override
  List<Object?> get props => [id];
}

class SearchUsersEvent extends UserEvent {
  final String query;
  
  const SearchUsersEvent(this.query);
  
  @override
  List<Object?> get props => [query];
}

// States
abstract class UserState extends Equatable {
  const UserState();
  
  @override
  List<Object?> get props => [];
}

class UserInitial extends UserState {}

class UserLoading extends UserState {}

class UsersLoaded extends UserState {
  final List<User> users;
  
  const UsersLoaded(this.users);
  
  @override
  List<Object?> get props => [users];
}

class UserLoaded extends UserState {
  final User user;
  
  const UserLoaded(this.user);
  
  @override
  List<Object?> get props => [user];
}

class UserCreated extends UserState {
  final User user;
  
  const UserCreated(this.user);
  
  @override
  List<Object?> get props => [user];
}

class UserUpdated extends UserState {
  final User user;
  
  const UserUpdated(this.user);
  
  @override
  List<Object?> get props => [user];
}

class UserDeleted extends UserState {
  final String id;
  
  const UserDeleted(this.id);
  
  @override
  List<Object?> get props => [id];
}

class UserError extends UserState {
  final String message;
  
  const UserError(this.message);
  
  @override
  List<Object?> get props => [message];
}

// BLoC
class UserBloc extends Bloc<UserEvent, UserState> {
  final GetUsers getUsers;
  final GetUserById getUserById;
  final CreateUser createUser;
  final UpdateUser updateUser;
  final DeleteUser deleteUser;
  final SearchUsers searchUsers;
  
  UserBloc({
    required this.getUsers,
    required this.getUserById,
    required this.createUser,
    required this.updateUser,
    required this.deleteUser,
    required this.searchUsers,
  }) : super(UserInitial()) {
    on<GetUsersEvent>(_onGetUsers);
    on<GetUserByIdEvent>(_onGetUserById);
    on<CreateUserEvent>(_onCreateUser);
    on<UpdateUserEvent>(_onUpdateUser);
    on<DeleteUserEvent>(_onDeleteUser);
    on<SearchUsersEvent>(_onSearchUsers);
  }
  
  Future<void> _onGetUsers(GetUsersEvent event, Emitter<UserState> emit) async {
    emit(UserLoading());
    
    final result = await getUsers();
    result.fold(
      (failure) => emit(UserError(failure.message)),
      (users) => emit(UsersLoaded(users)),
    );
  }
  
  Future<void> _onGetUserById(GetUserByIdEvent event, Emitter<UserState> emit) async {
    emit(UserLoading());
    
    final result = await getUserById(event.id);
    result.fold(
      (failure) => emit(UserError(failure.message)),
      (user) => emit(UserLoaded(user)),
    );
  }
  
  Future<void> _onCreateUser(CreateUserEvent event, Emitter<UserState> emit) async {
    emit(UserLoading());
    
    final result = await createUser(event.params);
    result.fold(
      (failure) => emit(UserError(failure.message)),
      (user) => emit(UserCreated(user)),
    );
  }
  
  Future<void> _onUpdateUser(UpdateUserEvent event, Emitter<UserState> emit) async {
    emit(UserLoading());
    
    final result = await updateUser(event.user);
    result.fold(
      (failure) => emit(UserError(failure.message)),
      (user) => emit(UserUpdated(user)),
    );
  }
  
  Future<void> _onDeleteUser(DeleteUserEvent event, Emitter<UserState> emit) async {
    emit(UserLoading());
    
    final result = await deleteUser(event.id);
    result.fold(
      (failure) => emit(UserError(failure.message)),
      (_) => emit(UserDeleted(event.id)),
    );
  }
  
  Future<void> _onSearchUsers(SearchUsersEvent event, Emitter<UserState> emit) async {
    emit(UserLoading());
    
    final result = await searchUsers(event.query);
    result.fold(
      (failure) => emit(UserError(failure.message)),
      (users) => emit(UsersLoaded(users)),
    );
  }
}
```

**5. Dependency Injection Setup:**

```dart
// lib/core/di/injection_container.dart
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

// Core
import '../network/network_info.dart';

// Features - User
import '../../features/user/data/datasources/user_local_data_source.dart';
import '../../features/user/data/datasources/user_remote_data_source.dart';
import '../../features/user/data/repositories/user_repository_impl.dart';
import '../../features/user/domain/repositories/user_repository.dart';
import '../../features/user/domain/usecases/get_users.dart';
import '../../features/user/domain/usecases/get_user_by_id.dart';
import '../../features/user/domain/usecases/create_user.dart';
import '../../features/user/domain/usecases/update_user.dart';
import '../../features/user/domain/usecases/delete_user.dart';
import '../../features/user/domain/usecases/search_users.dart';
import '../../features/user/presentation/bloc/user_bloc.dart';

final sl = GetIt.instance;

Future<void> init() async {
  // Features - User
  _initUser();
  
  // Core
  await _initCore();
  
  // External
  await _initExternal();
}

void _initUser() {
  // BLoC
  sl.registerFactory(
    () => UserBloc(
      getUsers: sl(),
      getUserById: sl(),
      createUser: sl(),
      updateUser: sl(),
      deleteUser: sl(),
      searchUsers: sl(),
    ),
  );
  
  // Use cases
  sl.registerLazySingleton(() => GetUsers(sl()));
  sl.registerLazySingleton(() => GetUserById(sl()));
  sl.registerLazySingleton(() => CreateUser(sl()));
  sl.registerLazySingleton(() => UpdateUser(sl()));
  sl.registerLazySingleton(() => DeleteUser(sl()));
  sl.registerLazySingleton(() => SearchUsers(sl()));
  
  // Repository
  sl.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(
      remoteDataSource: sl(),
      localDataSource: sl(),
      networkInfo: sl(),
    ),
  );
  
  // Data sources
  sl.registerLazySingleton<UserRemoteDataSource>(
    () => UserRemoteDataSourceImpl(
      client: sl(),
      baseUrl: 'https://api.example.com',
    ),
  );
  
  sl.registerLazySingleton<UserLocalDataSource>(
    () => UserLocalDataSourceImpl(sharedPreferences: sl()),
  );
}

Future<void> _initCore() async {
  sl.registerLazySingleton<NetworkInfo>(
    () => NetworkInfoImpl(sl()),
  );
}

Future<void> _initExternal() async {
  final sharedPreferences = await SharedPreferences.getInstance();
  sl.registerLazySingleton(() => sharedPreferences);
  
  sl.registerLazySingleton(() => http.Client());
  sl.registerLazySingleton(() => Connectivity());
}

// lib/core/network/network_info.dart
import 'package:connectivity_plus/connectivity_plus.dart';

abstract class NetworkInfo {
  Future<bool> get isConnected;
}

class NetworkInfoImpl implements NetworkInfo {
  final Connectivity connectivity;
  
  NetworkInfoImpl(this.connectivity);
  
  @override
  Future<bool> get isConnected async {
    final result = await connectivity.checkConnectivity();
    return result != ConnectivityResult.none;
  }
}
```

**6. UI Layer with Proper State Management:**

```dart
// lib/features/user/presentation/pages/users_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/di/injection_container.dart';
import '../bloc/user_bloc.dart';
import '../widgets/user_list_widget.dart';
import '../widgets/user_search_widget.dart';
import '../widgets/create_user_dialog.dart';

class UsersPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => sl<UserBloc>()..add(GetUsersEvent()),
      child: UsersView(),
    );
  }
}

class UsersView extends StatefulWidget {
  @override
  _UsersViewState createState() => _UsersViewState();
}

class _UsersViewState extends State<UsersView> {
  final _searchController = TextEditingController();
  
  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Users'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: () {
              context.read<UserBloc>().add(GetUsersEvent());
            },
          ),
        ],
      ),
      body: Column(
        children: [
          UserSearchWidget(
            controller: _searchController,
            onSearch: (query) {
              if (query.isNotEmpty) {
                context.read<UserBloc>().add(SearchUsersEvent(query));
              } else {
                context.read<UserBloc>().add(GetUsersEvent());
              }
            },
          ),
          Expanded(
            child: BlocConsumer<UserBloc, UserState>(
              listener: (context, state) {
                if (state is UserError) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(state.message),
                      backgroundColor: Colors.red,
                    ),
                  );
                } else if (state is UserCreated) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('User created successfully'),
                      backgroundColor: Colors.green,
                    ),
                  );
                  context.read<UserBloc>().add(GetUsersEvent());
                } else if (state is UserDeleted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('User deleted successfully'),
                      backgroundColor: Colors.green,
                    ),
                  );
                  context.read<UserBloc>().add(GetUsersEvent());
                }
              },
              builder: (context, state) {
                if (state is UserLoading) {
                  return Center(child: CircularProgressIndicator());
                } else if (state is UsersLoaded) {
                  return UserListWidget(users: state.users);
                } else if (state is UserError) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.error, size: 64, color: Colors.red),
                        SizedBox(height: 16),
                        Text(
                          'Error: ${state.message}',
                          style: Theme.of(context).textTheme.titleMedium,
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {
                            context.read<UserBloc>().add(GetUsersEvent());
                          },
                          child: Text('Retry'),
                        ),
                      ],
                    ),
                  );
                }
                return Center(child: Text('No users found'));
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await showDialog<bool>(
            context: context,
            builder: (context) => CreateUserDialog(),
          );
          
          if (result == true) {
            context.read<UserBloc>().add(GetUsersEvent());
          }
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
```

**7. Testing Architecture:**

```dart
// test/features/user/domain/usecases/get_users_test.dart
import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';

import 'package:my_app/features/user/domain/entities/user.dart';
import 'package:my_app/features/user/domain/repositories/user_repository.dart';
import 'package:my_app/features/user/domain/usecases/get_users.dart';

import 'get_users_test.mocks.dart';

@GenerateMocks([UserRepository])
void main() {
  late GetUsers usecase;
  late MockUserRepository mockUserRepository;
  
  setUp(() {
    mockUserRepository = MockUserRepository();
    usecase = GetUsers(mockUserRepository);
  });
  
  final tUsers = [
    User(
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: DateTime.now(),
      isActive: true,
    ),
    User(
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      createdAt: DateTime.now(),
      isActive: true,
    ),
  ];
  
  test('should get users from the repository', () async {
    // arrange
    when(mockUserRepository.getUsers())
        .thenAnswer((_) async => Right(tUsers));
    
    // act
    final result = await usecase();
    
    // assert
    expect(result, Right(tUsers));
    verify(mockUserRepository.getUsers());
    verifyNoMoreInteractions(mockUserRepository);
  });
}

// test/features/user/presentation/bloc/user_bloc_test.dart
import 'package:bloc_test/bloc_test.dart';
import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';

import 'package:my_app/core/error/failures.dart';
import 'package:my_app/features/user/domain/entities/user.dart';
import 'package:my_app/features/user/domain/usecases/get_users.dart';
import 'package:my_app/features/user/presentation/bloc/user_bloc.dart';

import 'user_bloc_test.mocks.dart';

@GenerateMocks([
  GetUsers,
  GetUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
  SearchUsers,
])
void main() {
  late UserBloc bloc;
  late MockGetUsers mockGetUsers;
  
  setUp(() {
    mockGetUsers = MockGetUsers();
    bloc = UserBloc(
      getUsers: mockGetUsers,
      getUserById: MockGetUserById(),
      createUser: MockCreateUser(),
      updateUser: MockUpdateUser(),
      deleteUser: MockDeleteUser(),
      searchUsers: MockSearchUsers(),
    );
  });
  
  test('initial state should be UserInitial', () {
    expect(bloc.state, equals(UserInitial()));
  });
  
  final tUsers = [
    User(
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: DateTime.now(),
      isActive: true,
    ),
  ];
  
  blocTest<UserBloc, UserState>(
    'should emit [UserLoading, UsersLoaded] when data is gotten successfully',
    build: () {
      when(mockGetUsers())
          .thenAnswer((_) async => Right(tUsers));
      return bloc;
    },
    act: (bloc) => bloc.add(GetUsersEvent()),
    expect: () => [
      UserLoading(),
      UsersLoaded(tUsers),
    ],
  );
  
  blocTest<UserBloc, UserState>(
    'should emit [UserLoading, UserError] when getting data fails',
    build: () {
      when(mockGetUsers())
          .thenAnswer((_) async => Left(ServerFailure('Server error')));
      return bloc;
    },
    act: (bloc) => bloc.add(GetUsersEvent()),
    expect: () => [
      UserLoading(),
      UserError('Server error'),
    ],
  );
}
```

**Best Practices Summary:**

1. **Separation of Concerns**: Clear separation between domain, data, and presentation layers
2. **Dependency Inversion**: Use abstractions and dependency injection
3. **Single Responsibility**: Each class has one reason to change
4. **Testability**: Easy to unit test each layer independently
5. **Error Handling**: Proper error handling with Either type
6. **Caching Strategy**: Offline-first approach with local caching
7. **State Management**: BLoC pattern for predictable state management
8. **Code Organization**: Feature-based folder structure
9. **Type Safety**: Strong typing with Dart's type system
10. **Performance**: Efficient data flow and minimal rebuilds