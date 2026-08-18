🚀 MEAN Stack Internship — Hands-on Exercises

📌 Repository Overview

This repository contains the daily hands-on exercises completed during the MEAN Stack internship.

Important: This repository is separate from the TaskFlow Project Build repository.Hands-on exercises are individual learning tasks, while Project Build is the continuous TaskFlow application.

________________________________________________________________________________________________
📅 Week 1 — JavaScript & TypeScript Foundations

## Day 1 — JavaScript Basics

Topics

Variables

let and const

Scope

== vs ===

Truthy and falsy values

Operators

Conditions

Loops

Functions

Exercise

Build:

FizzBuzz

Temperature Converter

FizzBuzz

Checks divisibility by 3 and 5 and returns:

Fizz
Buzz
FizzBuzz
Number

Temperature Converter

Implemented reusable conversion functions with input validation.

Practiced

Functions

Parameters

Return values

Conditions

Validation

Manual testing

Run

node script.js
_________________________________________________________________________________________
## Day 2 — Functions, Arrays & Objects

Topics

Arrow functions

this

Destructuring

Spread/rest operators

Default parameters

map()

filter()

reduce()

Method chaining

Immutability

Exercise

Solved array-method problems using:

map()
filter()
reduce()

Requirements

No traditional loops

Do not mutate input arrays

Use array methods

Use method chaining where appropriate

Example Flow

Input
  ↓
filter()
  ↓
map()
  ↓
reduce()
  ↓
Result

Run

node script.js

___________________________________________________________________________________________
## Day 3 — Async JavaScript

Topics

Event loop

Callbacks

Promises

async/await

try/catch

Fetch API

Promise.all()

Exercise

Fetch data from a public API using async/await.

Implemented

API request

Loading state

Error handling

Success handling

Multiple requests using Promise.all()

Flow

Request
   ↓
Loading
   ↓
await fetch()
   ↓
Success / Error
   ↓
Loading false

Run

node script.js

_____________________________________________________________________________________________
## Day 4 — TypeScript Conversion

Topics

TypeScript types

Function parameter types

Return types

Interfaces

Type aliases

Strict mode

tsconfig.json

Exercise

Converted a JavaScript module to strict TypeScript.

Requirements

Type every parameter

Type every return value

Remove unnecessary any

Use interfaces/types appropriately

Enable strict checking

Example

function add(a: number, b: number): number {
  return a + b;
}

Compile

npx tsc

Day 4 — TypeScript Fundamentals

Topics

Types

Interfaces vs type

Union types

Literal types

Enums

Generics

Strict mode

tsconfig

Exercise

Practiced TypeScript fundamentals and type-safe programming concepts.

Practiced

Type annotations

Interfaces

Type aliases

Unions

Enums

Generics

Strict TypeScript configuration

__________________________________________________________________________________________________
## Day 5 — Node.js CLI

Topics

Node.js runtime

npm

npm scripts

Modules

CommonJS

ES modules

package.json

JSON read/write

File-system operations

Exercise

Created a Node CLI that:

Reads a JSON file

Transforms the data

Writes the result

Runs through an npm script

Flow

JSON
 ↓
Node Script
 ↓
Transform
 ↓
Output

Run

npm install
npm run <script-name>

or:

node app.js

## Day 5 — Node.js, npm & Modules

Topics

Node.js runtime

npm

package.json

Modules

CommonJS

ES modules

JSON processing

npm scripts

Exercise

Practiced Node.js project setup, npm dependencies, modules and JSON processing.

📅 Week 2 — Angular Fundamentals

________________________________________________________________________________________________
## Day 6 — Angular Dashboard

Topics

Angular CLI

Angular project structure

Standalone components

Templates

Styles

Signals

Basic state management

Exercise

Created an Angular dashboard containing reusable dashboard components and a card driven by signal-based state.

Practiced

Components

Templates

Styles

Signals

Basic state updates

Run

npm install
ng serve

Open:

http://localhost:4200

_____________________________________________________________________________________________________
## Day 7 — Angular Todo App

Topics

Interpolation

Property binding

Event binding

@if

@for

track

@switch

ngClass

ngStyle

Exercise — Todo List UI

Built a Todo List UI with:

Todo items

@for rendering

track

Filter buttons

Empty state

No backend

Filters

All | Active | Completed

When no task matches the selected filter, an empty-state message is displayed.

Run

npm install
ng serve

__________________________________________________________________________________________________
## Day 8 — Component Communication

Topics

@Input

@Output

Signal inputs

Services

Dependency Injection

providedIn: 'root'

Exercise — Shared Counter

Created a shared counter using an injectable service so parent and child components remain synchronized.

Structure

Parent Component
       ↓
Shared Service
       ↑
Child Component

Implemented

Shared counter

Increase/decrease actions

Parent-to-child state synchronization

Signal-based shared state

Run

npm install
ng serve

Note: Hands-on Day 8 is Component Communication + Shared Service.Project Build Day 8 is a separate TaskService + Add/Edit/Delete + Shared Task State implementation.

__________________________________________________________________________________________________
## Day 9 — Routing & Navigation

Topics

Angular routes

routerLink

Route parameters

Query parameters

Lazy loading

Wildcard 404 route

Exercise — Multi-route App

Added:

/login
/board
/task/:id

Implemented

Login route

Board route

Task detail route

routerLink navigation

Route parameters

Query parameters

Lazy-loaded route

Wildcard 404 route

Example

/task/10

where 10 represents the task ID.

Unknown URLs display a 404 page.

Run

npm install
ng serve

________________________________________________________________________________________________
## Day 10 — Forms & Validation

Topics

Reactive Forms

FormBuilder

Validators

Custom validators

Error messages

Dirty/touched state

Valid/invalid state

Exercise — Reactive Signup Form

Built a signup form with:

Name

Email

Password

Confirm Password

Implemented

Required validation

Email validation

Password validation

Custom password-match validator

Per-field error messages

dirty

touched

valid

invalid

Password Rule

Password === Confirm Password

Run

npm install
ng serve

__________________________________________________________________________________________________
## 📅 Week 3 — Angular In Depth

## Day 11 — HttpClient & REST

Topics

provideHttpClient

GET

POST

PUT

DELETE

Typed responses

Observables

Async pipe

Exercise — Public API Data

Fetched and displayed typed data from a public API using Angular HttpClient and the async pipe.

Implemented

HTTP GET

Typed interface/model

Observable

Async pipe

Loading state

Error state

Flow

Component
    ↓
HttpClient
    ↓
REST API
    ↓
Observable
    ↓
async pipe
    ↓
UI

Run

npm install
ng serve

____________________________________________________________________________________________________
## Day 12 — RxJS in Practice

Topics

Observable vs Promise

map

filter

switchMap

debounceTime

combineLatest

takeUntilDestroyed

Exercise — Search Box

Built a search box that:

Accepts user input

Debounces typing

Calls an API

Uses switchMap

Cancels stale requests

Handles errors

Displays the latest results

Flow

Input
  ↓
debounceTime
  ↓
switchMap
  ↓
API
  ↓
Results

Run

npm install
ng serve

____________________________________________________________________________________________________
## Day 13 — Pipes, Directives & Lifecycle

Topics

Built-in pipes

Pure pipes

Impure pipes

Custom pipes

Attribute directives

HostListener

ngOnInit

ngOnDestroy

Exercise

Created:

A custom timeAgo pipe

A highlight-on-hover directive

Custom Pipe

Converts dates into readable text.

Example:

2 hours ago

Highlight Directive

Changes the appearance of an element when the mouse moves over it using HostListener.

Lifecycle Practice

Practiced:

ngOnInit
ngOnDestroy

Run

npm install
ng serve

_____________________________________________________________________________________________________
## Day 14 — Guards, Interceptors & Shared State

Topics

Functional route guards

HTTP interceptors

Authentication headers

Shared signal/service state

HTTP 401 handling

Exercise

Built:

An authentication guard for a protected route

An HTTP interceptor that attaches a token

Handling for HTTP 401 Unauthorized

Protected Route

/board

Interceptor Concept

Authorization: Bearer <token>

Implemented

Protected route

Auth guard

Token attachment

HTTP interceptor

Unauthorized response handling

Shared authentication state

Run

npm install
ng serve

_____________________________________________________________________________________________________
## Day 14 — Guards, Interceptors & State

Topics

Route protection

Authentication state

Functional guards

HTTP interceptors

Shared state

Error handling

Exercise

Practiced combining route protection, HTTP request processing and shared application state.

_____________________________________________________________________________________________________
## Day 15 — Angular Material + Review

Topics

Angular Material

Toolbar

Cards

Inputs

Form fields

Buttons

Tables

Theming

Accessibility basics

Exercise — Material Todo App

Restyled the Todo application using Angular Material.

Material Components

Toolbar

Cards

Form fields

Buttons

Inputs

Improvements

Board layout

Responsiveness

Visual consistency

Accessibility warnings

Better spacing

Consistent UI

Run

npm install
ng serve

_____________________________________________________________________________________________________
## 📅 Week 4 — Node.js Deeper Concepts

## Day 16 — Node.js Deeper

Topics

Node.js deeper concepts

CLI application development

File-system operations

JSON data handling

npm scripts

Node modules

Command-line arguments

Persistent local data

Exercise — CLI Note Tool

Built a Node.js command-line note management tool.

Project

Day-16(NODE-DEEPER)/
└── cli-note-tool/
    ├── app.js
    ├── notes.json
    ├── package.json
    ├── README.md
    ├── .gitignore
    └── .gitattributes

Purpose

The CLI note tool demonstrates how Node.js can be used to build a small command-line application that works with local JSON data.

Implemented

Node.js CLI workflow

JSON-based notes storage

File-system based data handling

Note operations through the CLI

npm project configuration

Command-line execution

Persistent local note data

Data Flow

CLI Command
     ↓
Node.js app.js
     ↓
Read notes.json
     ↓
Process Note
     ↓
Write Updated Data
     ↓
notes.json

Run

Install dependencies:

npm install

Run the application using the configured npm script or Node.js:

node app.js

Learning Outcome

Day 16 strengthened Node.js fundamentals by moving from simple scripts to a small practical CLI application using file handling, JSON persistence and npm project configuration.

____________________________________________________________________________________________________
## Day 17 — Express Basics

### Topics Studied
- Introduction to Express.js
- Express application setup
- Creating an Express server
- Starting a server with `app.listen()`
- HTTP request and response handling
- Express routes
- GET requests
- Route parameters
- Organizing routes into separate files
- Express Router
- Basic API structure
- Middleware / request handling basics
- Working with JSON responses

### Hands-on Exercise

Built an **Express.js REST API** named `express-basics`.

#### Project Structure
- `server.js` — Express server setup and API entry point
- `routes/tasks.js` — Task-related routes
- `routes/users.js` — User-related routes
- `package.json` — Project dependencies and scripts
- `package-lock.json` — Dependency lock file

### What I Practiced
- Created an Express application
- Configured and started the Express server
- Created separate route modules for users and tasks
- Used Express routing to handle API requests
- Returned API responses in JSON format
- Organized the application into a basic scalable route structure
________________________________________________________________________________________________________________________________________________________________________________________________________________________

# Day 18 — REST API Design

## 📌 Overview

Day 18 focused on designing and implementing a RESTful API using **Node.js** and **Express.js**.

The hands-on exercise demonstrates a complete **in-memory CRUD API for tasks**, including REST conventions, HTTP methods, status codes, route parameters, and query-based filtering.

---

## 🎯 Topics Covered

* REST API architecture and design
* REST resources and nouns
* RESTful URL conventions
* HTTP methods:

  * `GET`
  * `POST`
  * `PUT`
  * `DELETE`
* HTTP status codes
* Route parameters
* Query parameters
* Express routing
* JSON request and response handling
* CRUD operations
* In-memory data storage
* API error handling

---

## 🔑 REST API Concepts

### Resources & Nouns

REST APIs represent resources using nouns in URLs.

Example:

```text
/api/tasks
```

Instead of action-based URLs such as:

```text
/api/getTasks
/api/createTask
```

### HTTP Methods

| Method | Purpose                     |
| ------ | --------------------------- |
| GET    | Retrieve resources          |
| POST   | Create a new resource       |
| PUT    | Update an existing resource |
| DELETE | Delete a resource           |

---

## 📊 HTTP Status Codes Used

| Status Code | Meaning     | Usage                         |
| ----------- | ----------- | ----------------------------- |
| `200`       | OK          | Successful GET/PUT request    |
| `201`       | Created     | Successful POST request       |
| `204`       | No Content  | Successful DELETE request     |
| `400`       | Bad Request | Invalid request data          |
| `404`       | Not Found   | Requested task does not exist |

---

## 🔍 Route Parameters vs Query Parameters

### Route Parameter

Used to identify a specific resource:

```text
GET /api/tasks/1
```

Here, `1` is the task ID.

### Query Parameter

Used for filtering or modifying the result:

```text
GET /api/tasks?completed=true
```

This returns only completed tasks.

---

# 🛠️ Hands-on Exercise

## In-Memory CRUD API for Tasks

A REST API was created using Express.js to manage tasks.

The API supports:

* Fetching all tasks
* Fetching a single task
* Creating a task
* Updating a task
* Deleting a task
* Filtering tasks using query parameters
* Proper HTTP status codes
* Handling missing resources with `404`
* Validating required task title with `400`

---

## 📁 Project Structure

```text
Day-18(REST-API-DESIGN)/
│
├── node_modules/
├── package-lock.json
├── package.json
├── server.js
├── .gitignore
└── README.md
```

---

## 🚀 Setup

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Server runs at:

```text
http://localhost:3000
```

---

# 🔗 API Endpoints

## 1. Get All Tasks

```http
GET /api/tasks
```

Returns all tasks.

Example:

```text
http://localhost:3000/api/tasks
```

---

## 2. Filter Tasks

```http
GET /api/tasks?completed=true
```

Returns completed tasks.

For incomplete tasks:

```http
GET /api/tasks?completed=false
```

---

## 3. Get Single Task

```http
GET /api/tasks/:id
```

Example:

```text
GET /api/tasks/1
```

If the task does not exist:

```json
{
  "message": "Task not found"
}
```

Response status:

```text
404 Not Found
```

---

## 4. Create Task

```http
POST /api/tasks
```

Request body:

```json
{
  "title": "Build CRUD API"
}
```

Successful response:

```text
201 Created
```

---

## 5. Update Task

```http
PUT /api/tasks/:id
```

Example:

```text
PUT /api/tasks/1
```

Request body:

```json
{
  "title": "Learn REST API",
  "completed": true
}
```

Successful response:

```text
200 OK
```

---

## 6. Delete Task

```http
DELETE /api/tasks/:id
```

Example:

```text
DELETE /api/tasks/2
```

Successful response:

```text
204 No Content
```

If the task does not exist:

```text
404 Not Found
```

---

# 🧪 API Testing

The API was tested using the browser and PowerShell HTTP requests.

Example POST request:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/api/tasks" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Build CRUD API"}'
```

Example GET request:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/api/tasks" `
  -Method GET
```

---

# ✅ Key Learning Outcomes

After completing Day 18, I understood:

* How REST APIs are structured
* How resources are represented using URLs
* How HTTP methods map to CRUD operations
* How Express routes handle API requests
* How route parameters identify resources
* How query parameters are used for filtering
* How to return appropriate HTTP status codes
* How to validate request data
* How to handle `404 Not Found` errors
* How to build and test an in-memory CRUD API

---

## ⭐ Day 18 Highlights

> **RESTful API Design + Express Routing + CRUD + HTTP Status Codes + Route Parameters + Query Filtering**

The hands-on project successfully implements a task-based REST API using Express.js with proper REST conventions and status-code handling.


### Outcome
Successfully built and structured a basic Express.js backend API with separate user and task routes.
▶️ Running Angular Exercises

Go to the required Angular project:

cd <project-folder>

Install dependencies:

npm install

Start Angular:

ng serve

Open:

http://localhost:4200

If Angular CLI is not installed globally:

npx ng serve

▶️ Running JavaScript / Node.js Exercises

For a JavaScript file:

node script.js

For a Node.js application:

node app.js

For an npm project:

npm install
npm run <script-name>

🔀 GitHub Workflow

Hands-on work is maintained on the:

hands-on

branch.

Check Current Branch

git branch --show-current

Check Status

git status

Stage Changes

git add .

Commit

git commit -m "Day 16 Hands-on: Node deeper CLI note tool"

Push

git push origin hands-on

📂 Repository Structure

The current Hands-on repository contains the daily exercises from Day 1 through Day 16.

hands-on/
│
├── Day-01(JAVASCRIPT-BASICS)/
├── Day-02(FUNCTIONS-ARRAYS-OBJECTS)/
├── Day-03(ASYNC-JAVASCRIPT)/
├── Day-03(TODO-APP)/
├── Day-04(TYPESCRIPT-CONVERSION)/
├── Day-04(TYPESCRIPT-FUNDAMENTALS)/
├── Day-05(NODE-CLI)/
├── Day-05(NODE-NPM-MODULES)/
├── Day-06(ANGULAR-DASHBOARD)/
├── Day-07(ANGULAR-TODO)/
├── Day-08(COMPONENT-COMMUNICATION)/
├── Day-09(ROUTING-NAVIGATION)/
├── Day-10(FORMS-VALIDATION)/
├── Day-11(HTTPCLIENT-REST)/
├── Day-12(RXJS-IN-PRACTICE)/
├── Day-13(PIPES-DIRECTIVES-LIFECYCLE)/
├── Day-14(AUTH-GUARD)/
├── Day-14(GUARDS-INTERCEPTORS-STATE)/
├── Day-15(ANGULAR-MATERIAL-REVIEW)/
├── Day-16(NODE-DEEPER)/
│   └── cli-note-tool/
│
└── README.md

Folder names may vary slightly according to the local project setup. The structure above reflects the current hands-on folders.

📚 Hands-on Learning Outcomes

By completing these exercises, the following areas are practiced.

JavaScript

Variables

Functions

Arrays

Objects

ES6 features

Async JavaScript

Promises

Fetch API

Error handling

Array methods

Immutability

TypeScript

Types

Interfaces

Type aliases

Union types

Literal types

Enums

Generics

Strict mode

tsconfig

Node.js

Node.js runtime

npm

Modules

CommonJS

ES modules

JSON processing

File-system operations

CLI applications

npm scripts

Persistent local data

Angular

Components

Templates

Data binding

Control flow

Signals

Services

Dependency Injection

Component communication

Routing

Reactive Forms

Validation

HttpClient

REST API

RxJS

Pipes

Directives

Lifecycle hooks

Guards

Interceptors

Angular Material

Responsive UI

Accessibility basics

🔗 Project Build vs Hands-on

These repositories/tracks are intentionally separate.

Hands-on Repository

Contains individual exercises used to practice daily concepts.

Examples:

FizzBuzz
Array methods
Async JavaScript
TypeScript conversion
Node CLI
Angular Dashboard
Todo App
Routing
Reactive Forms
HttpClient
RxJS Search
Custom Pipe
Directive
Auth Guard
Angular Material
Node CLI Note Tool

Project Build Repository

Contains the continuous TaskFlow application where features are integrated across multiple days.

Examples:

TaskFlow Dashboard
TaskList
TaskService
Add/Edit/Delete Task
Routing
Authentication
Angular Material
Express Backend

📊 Daily Progress

Day

Area

Main Exercise

Day 1

JavaScript

FizzBuzz + Temperature Converter

Day 2

JavaScript

Array Methods

Day 3

Async JavaScript

Async API / Fetch

Day 4

TypeScript

JavaScript to TypeScript Conversion

Day 4

TypeScript

TypeScript Fundamentals

Day 5

Node.js

Node CLI

Day 5

Node.js

npm + Modules

Day 6

Angular

Angular Dashboard

Day 7

Angular

Todo App

Day 8

Angular

Component Communication

Day 9

Angular

Routing & Navigation

Day 10

Angular

Forms & Validation

Day 11

Angular

HttpClient + REST

Day 12

Angular

RxJS Search

Day 13

Angular

Pipes + Directives + Lifecycle

Day 14

Angular

Auth Guard

Day 14

Angular

Guards + Interceptors + State

Day 15

Angular

Angular Material Review

Day 16

Node.js

Deeper Node CLI Note Tool

✅ Current Status

Hands-on Progress: Day 16 Completed

Current Focus

Node.js Deeper Concepts
        ↓
CLI Application
        ↓
File System
        ↓
JSON Persistence
        ↓
npm Scripts

Day 16 Deliverable

CLI Note Tool completed using Node.js with local JSON-based note storage.

🎯 Overall Learning Journey

JavaScript
    ↓
TypeScript
    ↓
Node.js
    ↓
Angular Fundamentals
    ↓
Angular Advanced Features
    ↓
Authentication & HTTP
    ↓
Angular Material
    ↓
Node.js Deeper Concepts
    ↓
Next Backend / Full-Stack Concepts

🏁 MEAN Stack Hands-on Progress

Days Completed: 1–16

Current Stage: Node.js Deeper Concepts

Next Stage: Continue with backend and full-stack MEAN development.

## Day 19 – Validation, Errors & Configuration

## Overview

Day 19 focuses on building a safe and reliable Express.js API using request validation, centralized error handling, environment configuration, CORS, and asynchronous error handling.

## Topics Covered

* Express Error Handling
* `express-validator`
* Request/Input Validation
* Centralized Error Handling Middleware
* Consistent JSON Error Responses
* `dotenv` Configuration
* CORS
* Async Error Handling
* 404 Route Handling
* API Testing using Thunder Client

## Hands-on Exercise

**Add request validation + a central error handler returning consistent JSON errors.**

## Project Structure

```text
Day-19(VALIDATION-ERRORS-CONFIG)
└── validation-error-api
    ├── middleware
    │   └── errorHandler.js
    ├── routes
    │   └── userRoutes.js
    ├── validators
    │   └── userValidator.js
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    └── server.js
```

## Technologies Used

* Node.js
* Express.js
* express-validator
* dotenv
* CORS
* Nodemon
* Thunder Client

## Installation

Initialize the project:

```bash
npm init -y
```

Install dependencies:

```bash
npm install express express-validator dotenv cors
```

Install Nodemon:

```bash
npm install --save-dev nodemon
```

## Environment Configuration

The `.env` file contains:

```env
PORT=5000
NODE_ENV=development
```

The `.env` file is excluded from Git using `.gitignore`.

## API Endpoints

### Health Check

```http
GET /
```

Response:

```json
{
  "success": true,
  "message": "Day 19 Validation & Error Handling API is running"
}
```

### Create User

```http
POST /api/users
```

Valid request:

```json
{
  "name": "Preeti",
  "email": "preeti@example.com",
  "age": 22
}
```

Successful response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 123456789,
    "name": "Preeti",
    "email": "preeti@example.com",
    "age": 22
  }
}
```

## Request Validation

The API validates:

* Name is required.
* Name must contain at least 3 characters.
* Email is required.
* Email must be valid.
* Age is required.
* Age must be at least 18.

Example invalid request:

```json
{
  "name": "A",
  "email": "wrong-email",
  "age": 15
}
```

The API returns a consistent `400 Bad Request` JSON response.

## Centralized Error Handling

All application errors are handled by:

```text
middleware/errorHandler.js
```

The common response format is:

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "statusCode": 400,
    "details": []
  }
}
```

## 404 Handling

Invalid routes are also handled centrally.

Example:

```http
GET /api/unknown
```

Response:

```json
{
  "success": false,
  "error": {
    "message": "Route not found: /api/unknown",
    "statusCode": 404,
    "details": []
  }
}
```

## Async Error Handling

The user creation route uses `async/await` and forwards errors using:

```javascript
next(error);
```

This allows the centralized error middleware to handle asynchronous errors consistently.

## CORS

CORS is enabled using:

```javascript
app.use(cors());
```

This allows the API to receive requests from different frontend origins.

## Running the Application

Development mode:

```bash
npm run dev
```

Production/start mode:

```bash
npm start
```

Server:

```text
http://localhost:5000
```

## Testing

The API was tested using Thunder Client for:

* Valid user creation
* Invalid user input
* Missing fields
* Invalid email
* Invalid age
* 404 routes
* Centralized JSON error responses

## Learning Outcome

After completing this exercise, the following concepts were practiced:

* Creating validated Express APIs
* Validating request bodies
* Handling errors centrally
* Returning consistent API responses
* Using environment variables
* Enabling CORS
* Handling asynchronous errors
* Testing APIs using Thunder Client

## Status

**Day 19 Hands-on – Completed ✅**


# Day 20 - Auth Basics (JWT)

## 📌 Overview

Day 20 covers the basics of authentication using **bcrypt** and **JSON Web Token (JWT)** with Node.js and Express.js.

In this hands-on exercise, we implemented:

* User Registration
* Password Hashing
* User Login
* Password Verification
* JWT Token Generation
* JWT Token Verification
* Authentication Middleware
* Protected Routes
* Error Handling

> **Note:** MongoDB is not used in this Day 20 hands-on implementation. Users are temporarily stored in an in-memory array for learning and testing purposes.

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* bcrypt
* JSON Web Token (jsonwebtoken)
* dotenv
* Nodemon

---

## 📁 Project Structure

```text
Day-20(AUTH-BASICS-JWT)
│
├── config
│   └── db.js
│
├── controllers
│   └── authController.js
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   └── User.js
│
├── routes
│   └── authRoutes.js
│
├── .env
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── server.js
```

---

## 📦 Installation

Install the required dependencies:

```bash
npm install
```

Development dependency:

```bash
npm install --save-dev nodemon
```

---

## ▶️ Run the Project

### Development Mode

```bash
npm run dev
```

### Normal Mode

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=day20_super_secret_key_2026
```

> `.env` should not be committed to GitHub.

---

# 🔑 Authentication Flow

```text
Register
   ↓
Password received
   ↓
bcrypt password hashing
   ↓
User stored temporarily in memory
   ↓
Login
   ↓
Password comparison using bcrypt
   ↓
JWT generated
   ↓
JWT sent to client
   ↓
Protected Route
   ↓
JWT verification
   ↓
Authentication successful
   ↓
Protected data returned
```

---

# 🚀 API Endpoints

## 1. Register User

### Request

```http
POST /api/auth/register
```

### URL

```text
http://localhost:5000/api/auth/register
```

### Request Body

```json
{
  "name": "Preeti",
  "email": "preeti@example.com",
  "password": "password123",
  "age": 22
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1786696675413,
    "name": "Preeti",
    "email": "preeti@example.com",
    "age": 22
  }
}
```

---

# 2. Login User

### Request

```http
POST /api/auth/login
```

### URL

```text
http://localhost:5000/api/auth/login
```

### Request Body

```json
{
  "email": "preeti@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "data": {
    "id": 1786696675413,
    "name": "Preeti",
    "email": "preeti@example.com",
    "age": 22
  }
}
```

The JWT token returned from login is required to access protected routes.

---

# 3. Get Protected Profile

This is a protected route.

### Request

```http
GET /api/auth/profile
```

### URL

```text
http://localhost:5000/api/auth/profile
```

### Authorization Header

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

In Postman:

```text
Authorization
    ↓
Type: Bearer Token
    ↓
Paste JWT Token
```

### Success Response

```json
{
  "success": true,
  "message": "Protected profile accessed successfully",
  "data": {
    "id": 1786696675413,
    "name": "Preeti",
    "email": "preeti@example.com",
    "age": 22
  }
}
```

---

# 🧪 Authentication Testing

## Register

```text
POST /api/auth/register
```

Creates a new user and hashes the password using bcrypt.

## Login

```text
POST /api/auth/login
```

Checks the email and password and generates a JWT token.

## Protected Route

```text
GET /api/auth/profile
```

Requires a valid JWT token.

## Invalid Token

If an invalid or expired token is provided:

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

## Missing Token

If no token is provided:

```json
{
  "success": false,
  "message": "Authorization token is required"
}
```

---

# 🔒 Password Security

Passwords are never stored as plain text.

During registration:

```text
Plain Password
      ↓
bcrypt.hash()
      ↓
Hashed Password
      ↓
Stored in memory
```

During login:

```text
Entered Password
      ↓
bcrypt.compare()
      ↓
Stored Hash
      ↓
Password Match
```

---

# 🎫 JWT Authentication

JWT is generated after successful login.

Example:

```javascript
const token = jwt.sign(
  {
    userId: user.id,
    email: user.email
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);
```

The authentication middleware verifies the token:

```javascript
const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);
```

If the token is valid, the request continues to the protected route.

---

# 🛡️ Authentication Middleware

The middleware:

1. Reads the Authorization header.
2. Checks the Bearer token.
3. Extracts the JWT.
4. Verifies the JWT.
5. Stores decoded user information in `req.user`.
6. Allows the request to continue.

Example:

```text
Authorization: Bearer JWT_TOKEN
```

---

# 📚 What I Learned

* Authentication vs authorization basics
* Password hashing with bcrypt
* Password comparison with bcrypt
* JWT token generation
* JWT token verification
* Authorization headers
* Bearer authentication
* Express middleware
* Protected routes
* Environment variables
* API testing with Postman
* Handling authentication errors

---

# ⚠️ Important Note

This Day 20 hands-on uses an **in-memory users array instead of MongoDB**.

Therefore:

```text
Server Restart
      ↓
In-memory users reset
      ↓
Previously registered users are lost
```

This is only for learning the authentication and JWT concepts.

In a production application, user data should be stored in a proper database such as MongoDB.

---

# ✅ Day 20 Checklist

* [x] Create Day 20 folder
* [x] Initialize Node.js project
* [x] Install Express
* [x] Install bcrypt
* [x] Install jsonwebtoken
* [x] Install dotenv
* [x] Install nodemon
* [x] Create Register API
* [x] Hash password using bcrypt
* [x] Create Login API
* [x] Compare password using bcrypt
* [x] Generate JWT
* [x] Create authentication middleware
* [x] Verify JWT
* [x] Create protected profile route
* [x] Test Register API in Postman
* [x] Test Login API in Postman
* [x] Test Protected Profile API
* [x] Test Invalid Token
* [x] Test Missing Token

---

# 🎯 Conclusion

Day 20 successfully demonstrates the basic authentication flow using **Express.js, bcrypt and JWT**.

The project implements:

```text
REGISTER
   ↓
HASH PASSWORD
   ↓
LOGIN
   ↓
VERIFY PASSWORD
   ↓
GENERATE JWT
   ↓
VERIFY JWT
   ↓
ACCESS PROTECTED ROUTE
```

**Day 20 - Auth Basics (JWT) completed successfully.**

db.users.find().sort({
  age: -1
});
