MEAN Stack Hands-on Exercises

This repository contains the daily hands-on exercises completed duringthe 6-week MEAN Stack learning plan.

Important: This repository is separate from the TaskFlow ProjectBuild. Hands-on exercises are individual learning tasks; ProjectBuild is the continuous TaskFlow application.

########################################Week 1 --- JavaScript & TypeScript Foundations

## Day 1 --- JavaScript Basics

Topics: variables, let/const, scope, == vs ===,truthy/falsy, operators, conditions, loops, functions.

Exercise

Build: 1. FizzBuzz 2. Temperature Converter

FizzBuzz checks divisibility by 3 and 5 and returns Fizz, Buzz,FizzBuzz, or the number.

The temperature converter uses reusable functions with input validation.

Practiced: functions, parameters, return values, conditions , validation, manual testing.

Run:

node script.js

## Day 2 --- Functions, Arrays & Objects (ES6)

Topics: arrow functions, this, destructuring , spread/rest, defaultparameters, map, filter, reduce, chaining, immutability.

Exercise

Solve 10 array-method problems using map, filter, and reduce.

Requirements: - No traditional loops. - Do not mutate input arrays. -Use array methods and chaining.

Example:

Input → filter() → map() → reduce() → Result

Run:

node script.js

## Day 3 --- Async JavaScript

Topics: event loop, callbacks, promises, async/await, try/catch,Fetch API.

Exercise

Fetch data from a public API using async/await.

Implemented: - API request - Loading flag - Error handling - Successhandling - Two requests using Promise.all()

Flow:

Request → Loading → await fetch() → Success/Error → Loading false

Run:

node script.js

## Day 4 --- TypeScript Fundamentals

Topics: types, interfaces vs type, unions, literals, enums,generics, strict mode, tsconfig.

Exercise

Convert a JavaScript module to strict TypeScript.

Requirements: - Type every parameter. - Type every return value. -Remove unnecessary any. - Use interfaces/types appropriately. - Enablestrict checking.

Example:

function add(a: number, b: number): number {
  return a + b;
}

Compile:

npx tsc

## Day 5 --- Node.js, npm & Modules

Topics: Node runtime, npm, scripts, CommonJS vs ES modules,package.json, JSON read/write.

Exercise

Create a Node CLI that: 1. Reads a JSON file. 2. Transforms the data. 3.Writes the result. 4. Runs through an npm script.

Flow:

JSON → Node script → Transform → Output

Run:

npm install
npm run <script-name>

or:

node app.js

################################################## Week 2 --- Angular Fundamentals

## Day 6 --- Angular Setup & Components

Topics: Angular CLI, project structure, standalone components,templates, styles, signals.

Exercise

Create two Angular components and render a small dashboard card drivenby a signal value.

Practiced: components, templates, styles, signals and basic stateupdates.

Run:

npm install
ng serve

Open http://localhost:4200.

## Day 7 --- Templates & Directives

Topics: interpolation, property/event binding, @if, @for,track, @switch, ngClass, ngStyle.

Exercise --- Todo List UI

Build a Todo List UI with: - Todo items - @for rendering - track -Filter buttons - Empty state - No backend

Filters:

All | Active | Completed

When no task matches the filter, display an empty-state message.

Run:

npm install
ng serve

## Day 8 --- Component Communication & Dependency Injection

Topics: @Input, @Output, signal inputs, services, DependencyInjection, providedIn: 'root'.

Exercise --- Shared Counter

Share state between parent and child through an injectable service soboth components stay synchronized.

Structure:

Parent Component
       ↓
Shared Service
       ↑
Child Component

Implemented: - Shared counter - Increase/decrease actions -Parent-to-child synchronized state - Signal-based shared state

Example:

Parent Component
Counter: 6
[Increase] [Decrease]

Child Component
Shared Counter: 6

Run:

npm install
ng serve

Important: Hands-on Day 8 is Component Communication + SharedService. It is different from Project Build Day 8, which isTaskService + Add/Edit/Delete.

## Day 9 --- Routing & Navigation

Topics: routes, routerLink, route params, query params, lazyloading, wildcard 404.

Exercise --- Multi-route App

Add:

/login
/board
/task/:id

Implemented: - Login route - Board route - Task detail route -routerLink navigation - Route parameters - Query parameters - Onelazy-loaded route - Wildcard 404 route

Example:

/task/10

where 10 is the task ID.

Unknown URLs display a 404 page.

Run:

npm install
ng serve

## Day 10 --- Forms & Validation

Topics: Reactive Forms, FormBuilder, validators, customvalidators, error messages, dirty/touched state.

Exercise --- Reactive Signup Form

Build a signup form with: - Name - Email - Password - Confirm Password

Implemented: - Required validation - Email validation - Passwordvalidation - Custom password-match validator - Per-field errormessages - dirty / touched / valid / invalid states

Password rule:

Password === Confirm Password

Run:

npm install
ng serve

################################################################# Week 3 --- Angular in Depth

## Day 11 --- HttpClient & REST

Topics: provideHttpClient, GET/POST/PUT/DELETE, typed responses,Observables, async pipe.

Exercise --- Public API Data

Fetch and display typed data from a public API using Angular HttpClientand the async pipe.

Implemented: - HTTP GET - Typed interface/model - Observable - Asyncpipe - Loading state - Error state

Flow:

Component → HttpClient → REST API → Observable → async pipe → UI

Run:

npm install
ng serve

## Day 12 --- RxJS in Practice

Topics: Observable vs Promise, map, filter, switchMap,debounceTime, combineLatest, takeUntilDestroyed.

Exercise --- Search Box

Build a search box that: 1. Accepts input. 2. Debounces typing. 3. Callsan API. 4. Uses switchMap. 5. Cancels stale requests. 6. Handleserrors. 7. Displays latest results.

Flow:

Input → debounceTime → switchMap → API → Results

Run:

npm install
ng serve

## Day 13 --- Pipes, Custom Directives & Lifecycle

Topics: built-in pipes, pure/impure pipes, custom pipes, attributedirectives, HostListener, ngOnInit, ngOnDestroy.

Exercise

Create: 1. A custom timeAgo pipe. 2. A highlight-on-hover directive.

timeAgo converts dates into readable text such as:

2 hours ago

The highlight directive changes the element appearance when the mouse isover it using HostListener.

Also practice:

ngOnInit
ngOnDestroy

Run:

npm install
ng serve

## Day 14 --- Guards, Interceptors & Shared State

Topics: functional route guards, HTTP interceptors, auth headers,shared signal/service state.

Exercise

Build: 1. An auth guard for a protected route. 2. An HTTP interceptorthat attaches a token. 3. Handling for HTTP 401 Unauthorized.

Protected example:

/board

Interceptor concept:

Authorization: Bearer <token>

On 401, handle authentication failure appropriately.

Run:

npm install
ng serve

## Day 15 --- Angular Material + Review

Topics: Angular Material, toolbar, cards, inputs, table, theming,accessibility basics.

Exercise --- Material Todo App

Restyle the Todo application using Angular Material.

Use Material components for: - Toolbar - Cards - Form fields - Buttons -Inputs

Also improve: - Board layout - Responsiveness - Visual consistency -Accessibility warnings

Run:

npm install
ng serve


Day 16 --- Node.js Deeper + CLI Note Tool

Topics: Node.js deeper concepts, CLI applications, command-line arguments,
File System module, JSON file handling, reading/writing files,
creating and managing data from the terminal, npm scripts and
Node.js application structure.

Exercise --- CLI Note Tool

Build a command-line based Note Management application using Node.js.

The application allows users to manage notes directly from the terminal.

Features:
- Add a new note
- View existing notes
- Store notes in a JSON file
- Read and write JSON data using Node.js
- Handle command-line arguments
- Validate note input
- Maintain persistent note data
- Use Node.js File System APIs
- Organize the application using package.json
- Provide a README with usage instructions

Project Structure:

Day-16(NODE-DEEPER)/
└── cli-note-tool/
    ├── app.js
    ├── notes.json
    ├── package.json
    ├── README.md
    ├── .gitignore
    └── .gitattributes

Running Day 16 Exercise

Go to the CLI Note Tool:

cd "hands-on/Day-16(NODE-DEEPER)/cli-note-tool"

Install dependencies:

npm install

Run the application:

node app.js

The CLI application can be used from the terminal to create and manage notes.

Example:

node app.js add "Learn Node.js"
node app.js list

## Day 16 Learning Outcome

By completing this exercise, the following Node.js concepts were practiced:

- Node.js runtime
- Command-line applications
- Command-line arguments
- File System module
- Reading and writing files
- JSON data processing
- Persistent local data storage
- npm and package.json
- Node.js project structure
- Error handling and input validation

###### Running Angular Exercises

Go to the required Angular project:

cd <project-folder>
npm install
ng serve

Open:

http://localhost:4200

If Angular CLI is not installed globally:

npx ng serve

Running JavaScript / Node Exercises

node script.js

or:

node app.js

For npm projects:

npm install
npm run <script-name>

GitHub Workflow

Hands-on work is pushed to the hands-on branch.

git checkout hands-on
git add .
git commit -m "Day 11 Hands-on: HttpClient and REST API"
git push origin hands-on

Example commit messages:

Day 1 Hands-on: FizzBuzz and temperature converter
Day 2 Hands-on: Array methods
Day 3 Hands-on: Async JavaScript and Fetch API
Day 4 Hands-on: TypeScript conversion
Day 5 Hands-on: Node CLI
Day 6 Hands-on: Angular components
Day 7 Hands-on: Todo list UI
Day 8 Hands-on: Component communication and shared service
Day 9 Hands-on: Angular routing
Day 10 Hands-on: Reactive forms and validation
Day 11 Hands-on: HttpClient and REST API
Day 12 Hands-on: RxJS search
Day 13 Hands-on: Custom pipe and directive
Day 14 Hands-on: Guards and interceptors
Day 15 Hands-on: Angular Material
Day 16 Hands-on: Node.js Deeper and CLI Note Tool

Repository Structure

mean-stack-hands-on/
├── Day-01(FIZZBUZZ)/
├── Day-01(TEMPERATURE-CONVERTER)/
├── Day-02(ARRAY-METHODS)/
├── Day-03(TODO-APP)/
├── Day-04(TYPESCRIPT-CONVERSION)/
├── Day-05(NODE-CLI)/
├── Day-06(ANGULAR-DASHBOARD)/
├── Day-07(ANGULAR-TODO)/
├── Day-08(COMPONENT-COMMUNICATION)/
├── Day-09(ROUTING-PROJECT)/
├── Day-10(FORMS-VALIDATION)/
├── Day-11(HTTPCLIENT-REST)/
├── Day-12(RXJS)/
├── Day-13(PIPES-DIRECTIVES)/
├── Day-14(GUARDS-INTERCEPTORS)/
├── Day-15(ANGULAR-MATERIAL)/
├── Day 16(Node.js Deeper and CLI Note Tool)/
└── README.md

Folder names may vary according to the local project setup.

Hands-on Learning Outcome

By completing these exercises, the following areas are practiced:

JavaScript

Variables, functions, arrays, objects, ES6, async JavaScript, promisesand Fetch API.

TypeScript

Types, interfaces, unions, enums, generics, strict mode and tsconfig.

Node.js

Node runtime, npm, modules, JSON processing and CLI scripts.

Angular

Components, templates, control flow, signals, services, DependencyInjection, component communication, routing, Reactive Forms, HttpClient,RxJS, pipes, directives, lifecycle hooks, guards, interceptors andAngular Material.


Project Build Day 8 focuses on: - TaskService - Add task - Edit task -Delete task - Shared task state

The two tracks should remain separate.
