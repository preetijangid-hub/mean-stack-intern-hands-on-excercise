🚀 MEAN Stack Internship — Hands-on Exercises

📌 Repository Overview

This repository contains the daily hands-on exercises completed during the MEAN Stack internship.

Important: This repository is separate from the TaskFlow Project Build repository.Hands-on exercises are individual learning tasks, while Project Build is the continuous TaskFlow application.

📅 Week 1 — JavaScript & TypeScript Foundations

Day 1 — JavaScript Basics

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

Day 2 — Functions, Arrays & Objects

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

Day 3 — Async JavaScript

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

Day 4 — TypeScript Conversion

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

Day 5 — Node.js CLI

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

Day 5 — Node.js, npm & Modules

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

Day 6 — Angular Dashboard

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

Day 7 — Angular Todo App

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

Day 8 — Component Communication

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

Day 9 — Routing & Navigation

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

Day 10 — Forms & Validation

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

📅 Week 3 — Angular In Depth

Day 11 — HttpClient & REST

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

Day 12 — RxJS in Practice

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

Day 13 — Pipes, Directives & Lifecycle

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

Day 14 — Guards, Interceptors & Shared State

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

Day 14 — Guards, Interceptors & State

Topics

Route protection

Authentication state

Functional guards

HTTP interceptors

Shared state

Error handling

Exercise

Practiced combining route protection, HTTP request processing and shared application state.

Day 15 — Angular Material + Review

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

📅 Week 4 — Node.js Deeper Concepts

Day 16 — Node.js Deeper

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