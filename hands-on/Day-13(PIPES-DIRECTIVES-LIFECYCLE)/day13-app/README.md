# Day13App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.20.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




--------------------------------------------------------------------------

# Day 13 - Pipes, Directives & Lifecycle Hooks (Angular)

## Objective

This hands-on exercise demonstrates three important Angular concepts:

- Custom Pipe
- Custom Attribute Directive
- Lifecycle Hooks

---

## Features

### 1. Custom TimeAgo Pipe

A custom pipe converts a date into a human-readable format.

### Example Output

- 30 seconds ago
- 5 minutes ago
- 2 hours ago
- 3 days ago

The pipe calculates the difference between the current time and the given date.

---

### 2. Highlight On Hover Directive

A custom attribute directive highlights an element when the mouse hovers over it.

The directive uses:

- HostListener
- Renderer2
- ElementRef

### Behavior

- Mouse Enter → Background becomes light yellow.
- Mouse Leave → Original background is restored.

---

### 3. Lifecycle Hooks

The component demonstrates Angular lifecycle hooks.

Used hooks:

- ngOnInit()
- ngOnDestroy()

### Console Output

```
Component Initialized
Component Destroyed
```

---

## Project Structure

```
src/
│
├── app/
│   ├── directives/
│   │   └── highlight-on-hover.ts
│   │
│   ├── pipes/
│   │   └── time-ago-pipe.ts
│   │
│   ├── app.ts
│   ├── app.html
│   ├── app.css
│   └── app.config.ts
│
├── main.ts
└── styles.css
```

---

## Technologies Used

- Angular 21
- TypeScript
- Standalone Components
- Custom Pipes
- Custom Directives
- Lifecycle Hooks

---

## Concepts Covered

- Creating Custom Pipes
- PipeTransform Interface
- Creating Attribute Directives
- HostListener Decorator
- Renderer2
- ElementRef
- Standalone Components
- ngOnInit()
- ngOnDestroy()

---

## Output

The application displays:

- Angular Day 13 heading
- Created date formatted using the TimeAgo Pipe
- A hoverable card that highlights on mouse hover
- Lifecycle hook messages in the browser console

---

## Run the Project

Install dependencies

```bash
npm install
```

Start the development server

```bash
ng serve -o
```

Open

```
http://localhost:4200
```

---

## Learning Outcome

After completing this exercise, you will be able to:

- Create reusable custom pipes.
- Build attribute directives using HostListener and Renderer2.
- Understand Angular lifecycle hooks.
- Develop standalone Angular components.