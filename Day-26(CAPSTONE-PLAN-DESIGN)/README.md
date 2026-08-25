# Day 26 – Capstone: Plan & Design

## Project Name

# TaskFlow – Project & Task Management REST API

TaskFlow is a backend-focused Project and Task Management application designed to demonstrate the concepts learned throughout the MEAN Stack internship.

The application will allow authenticated users to create projects, manage tasks, update task status and priorities, and organize their work through a RESTful API.

---

## 1. Project Overview

TaskFlow is a REST API that provides project and task management functionality.

The application will use:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Jest
* Supertest
* Git & GitHub
* MongoDB Atlas
* Render

The main purpose of the capstone is to combine the backend concepts learned during the internship into one complete application design.

---

## 2. Problem Statement

Users often need a simple way to organize projects and track tasks.

TaskFlow provides a centralized system where users can:

* Create an account
* Login securely
* Create projects
* Add tasks to projects
* Set task priorities
* Update task status
* Edit and delete projects and tasks

---

## 3. Objectives

The main objectives of TaskFlow are:

1. Build a RESTful backend API.
2. Implement JWT-based authentication.
3. Store application data using MongoDB.
4. Use Mongoose for database modeling.
5. Create relationships between users, projects and tasks.
6. Implement validation and error handling.
7. Write automated API tests.
8. Deploy the API using Render.
9. Use MongoDB Atlas as the production database.
10. Follow Git and GitHub workflow practices.

---

# 4. Main Features

## Authentication

* User registration
* User login
* JWT authentication
* Get current user profile
* Protected API routes

## Project Management

* Create a project
* Get all projects
* Get a single project
* Update a project
* Delete a project

## Task Management

* Create a task inside a project
* Get all tasks of a project
* Get a single task
* Update a task
* Delete a task

## Task Status

Tasks can have one of the following statuses:

* `todo`
* `in-progress`
* `completed`

## Task Priority

Tasks can have one of the following priorities:

* `low`
* `medium`
* `high`

## Validation

The API will validate:

* Required fields
* Email format
* Password requirements
* Project data
* Task data
* Status values
* Priority values

## Error Handling

The API will provide appropriate HTTP status codes and error messages for:

* Bad requests
* Unauthorized requests
* Forbidden access
* Missing resources
* Server errors

## Testing

The API will be tested using:

* Jest
* Supertest

Testing will cover authentication, projects and tasks.

## Deployment

The application will be deployed using:

* GitHub
* MongoDB Atlas
* Render

---

# 5. User Roles

TaskFlow will initially have one user role:

## User

An authenticated user can:

* Manage their own account
* Create their own projects
* Manage their projects
* Create tasks inside their projects
* Manage their tasks

Users should not be able to modify another user's projects or tasks.

---

# 6. User Stories

## Authentication User Stories

### Register

As a user, I want to register an account so that I can use TaskFlow.

### Login

As a user, I want to login using my email and password so that I can securely access my account.

### Profile

As a user, I want to view my profile so that I can see my account information.

---

## Project User Stories

### Create Project

As a user, I want to create a project so that I can organize my work.

### View Projects

As a user, I want to view my projects so that I can see all the projects I have created.

### View Single Project

As a user, I want to view a specific project so that I can see its details.

### Update Project

As a user, I want to update a project so that I can keep its information current.

### Delete Project

As a user, I want to delete a project when I no longer need it.

---

## Task User Stories

### Create Task

As a user, I want to create tasks inside a project so that I can track individual pieces of work.

### View Tasks

As a user, I want to view all tasks belonging to a project so that I can track my work.

### Update Task

As a user, I want to update a task so that I can change its information, status or priority.

### Delete Task

As a user, I want to delete a task when it is no longer required.

### Complete Task

As a user, I want to mark a task as completed so that I can track my progress.

---

# 7. Application Flow

```text
User
  |
  v
Register
  |
  v
Login
  |
  v
JWT Token
  |
  v
Create Project
  |
  v
Create Tasks
  |
  +----> Update Task
  |
  +----> Change Status
  |
  +----> Change Priority
  |
  +----> Delete Task
  |
  v
Complete Project
```

---

# 8. Database Design

TaskFlow will use MongoDB with three main collections:

```text
users
projects
tasks
```

Relationship:

```text
User
 |
 +---- Projects
          |
          +---- Tasks
```

---

# 9. Users Collection

## User Schema

| Field       | Type     | Required | Description           |
| ----------- | -------- | -------- | --------------------- |
| `_id`       | ObjectId | Auto     | Unique user ID        |
| `name`      | String   | Yes      | User's name           |
| `email`     | String   | Yes      | User's email          |
| `password`  | String   | Yes      | Hashed password       |
| `createdAt` | Date     | Auto     | Account creation date |
| `updatedAt` | Date     | Auto     | Last update date      |

### Rules

* `name` is required.
* `email` is required and unique.
* Password must not be stored as plain text.
* Password will be hashed before storing.
* `createdAt` and `updatedAt` will be generated automatically.

---

# 10. Projects Collection

## Project Schema

| Field         | Type     | Required | Description           |
| ------------- | -------- | -------- | --------------------- |
| `_id`         | ObjectId | Auto     | Unique project ID     |
| `name`        | String   | Yes      | Project name          |
| `description` | String   | No       | Project description   |
| `owner`       | ObjectId | Yes      | Reference to User     |
| `createdAt`   | Date     | Auto     | Project creation date |
| `updatedAt`   | Date     | Auto     | Last update date      |

### Relationship

```text
Project.owner
       |
       v
User._id
```

Each project belongs to one user.

---

# 11. Tasks Collection

## Task Schema

| Field         | Type     | Required | Description          |
| ------------- | -------- | -------- | -------------------- |
| `_id`         | ObjectId | Auto     | Unique task ID       |
| `title`       | String   | Yes      | Task title           |
| `description` | String   | No       | Task description     |
| `status`      | String   | Yes      | Task status          |
| `priority`    | String   | Yes      | Task priority        |
| `project`     | ObjectId | Yes      | Reference to Project |
| `createdAt`   | Date     | Auto     | Task creation date   |
| `updatedAt`   | Date     | Auto     | Last update date     |

### Status Values

```text
todo
in-progress
completed
```

### Priority Values

```text
low
medium
high
```

### Relationship

```text
Task.project
      |
      v
Project._id
```

Each task belongs to one project.

---

# 12. Database Relationship Diagram

```text
+----------------+
|     User       |
+----------------+
| _id            |
| name           |
| email          |
| password       |
+----------------+
        |
        | owner
        v
+----------------+
|    Project     |
+----------------+
| _id            |
| name           |
| description    |
| owner          |
+----------------+
        |
        | project
        v
+----------------+
|      Task      |
+----------------+
| _id            |
| title          |
| description    |
| status         |
| priority       |
| project        |
+----------------+
```

---

# 13. REST API Contract

Base URL:

```text
/api
```

All protected routes require a valid JWT token.

Authentication header:

```http
Authorization: Bearer <token>
```

---

# 14. Authentication API

## Register User

### Endpoint

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Preeti",
  "email": "preeti@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "Preeti",
    "email": "preeti@example.com"
  }
}
```

### Status Code

```text
201 Created
```

---

## Login User

### Endpoint

```http
POST /api/auth/login
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
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Preeti",
    "email": "preeti@example.com"
  }
}
```

### Status Code

```text
200 OK
```

---

## Get Current User

### Endpoint

```http
GET /api/auth/me
```

### Authentication

```http
Authorization: Bearer <token>
```

### Success Response

```json
{
  "user": {
    "id": "USER_ID",
    "name": "Preeti",
    "email": "preeti@example.com"
  }
}
```

### Status Code

```text
200 OK
```

---

# 15. Project API

## Create Project

### Endpoint

```http
POST /api/projects
```

### Authentication

Required.

### Request Body

```json
{
  "name": "MEAN Internship Project",
  "description": "Capstone project for the MEAN stack internship"
}
```

### Success Response

```json
{
  "message": "Project created successfully",
  "project": {
    "id": "PROJECT_ID",
    "name": "MEAN Internship Project",
    "description": "Capstone project for the MEAN stack internship",
    "owner": "USER_ID"
  }
}
```

### Status Code

```text
201 Created
```

---

## Get All Projects

### Endpoint

```http
GET /api/projects
```

### Authentication

Required.

### Success Response

```json
{
  "projects": [
    {
      "id": "PROJECT_ID",
      "name": "MEAN Internship Project",
      "description": "Capstone project",
      "owner": "USER_ID"
    }
  ]
}
```

### Status Code

```text
200 OK
```

---

## Get Single Project

### Endpoint

```http
GET /api/projects/:id
```

### Authentication

Required.

### Success Response

```json
{
  "project": {
    "id": "PROJECT_ID",
    "name": "MEAN Internship Project",
    "description": "Capstone project",
    "owner": "USER_ID"
  }
}
```

### Status Code

```text
200 OK
```

---

## Update Project

### Endpoint

```http
PUT /api/projects/:id
```

### Authentication

Required.

### Request Body

```json
{
  "name": "Updated Project Name",
  "description": "Updated project description"
}
```

### Success Response

```json
{
  "message": "Project updated successfully",
  "project": {
    "id": "PROJECT_ID",
    "name": "Updated Project Name",
    "description": "Updated project description"
  }
}
```

### Status Code

```text
200 OK
```

---

## Delete Project

### Endpoint

```http
DELETE /api/projects/:id
```

### Authentication

Required.

### Success Response

```json
{
  "message": "Project deleted successfully"
}
```

### Status Code

```text
200 OK
```

---

# 16. Task API

## Create Task

### Endpoint

```http
POST /api/projects/:projectId/tasks
```

### Authentication

Required.

### Request Body

```json
{
  "title": "Build REST API",
  "description": "Create project and task endpoints",
  "status": "todo",
  "priority": "high"
}
```

### Success Response

```json
{
  "message": "Task created successfully",
  "task": {
    "id": "TASK_ID",
    "title": "Build REST API",
    "description": "Create project and task endpoints",
    "status": "todo",
    "priority": "high",
    "project": "PROJECT_ID"
  }
}
```

### Status Code

```text
201 Created
```

---

## Get Project Tasks

### Endpoint

```http
GET /api/projects/:projectId/tasks
```

### Authentication

Required.

### Success Response

```json
{
  "tasks": [
    {
      "id": "TASK_ID",
      "title": "Build REST API",
      "description": "Create project and task endpoints",
      "status": "todo",
      "priority": "high",
      "project": "PROJECT_ID"
    }
  ]
}
```

### Status Code

```text
200 OK
```

---

## Get Single Task

### Endpoint

```http
GET /api/tasks/:id
```

### Authentication

Required.

### Success Response

```json
{
  "task": {
    "id": "TASK_ID",
    "title": "Build REST API",
    "description": "Create project and task endpoints",
    "status": "todo",
    "priority": "high",
    "project": "PROJECT_ID"
  }
}
```

### Status Code

```text
200 OK
```

---

## Update Task

### Endpoint

```http
PUT /api/tasks/:id
```

### Authentication

Required.

### Request Body

```json
{
  "title": "Build REST API",
  "description": "Complete all REST API endpoints",
  "status": "in-progress",
  "priority": "high"
}
```

### Success Response

```json
{
  "message": "Task updated successfully",
  "task": {
    "id": "TASK_ID",
    "title": "Build REST API",
    "description": "Complete all REST API endpoints",
    "status": "in-progress",
    "priority": "high"
  }
}
```

### Status Code

```text
200 OK
```

---

## Delete Task

### Endpoint

```http
DELETE /api/tasks/:id
```

### Authentication

Required.

### Success Response

```json
{
  "message": "Task deleted successfully"
}
```

### Status Code

```text
200 OK
```

---

# 17. HTTP Status Codes

| Status Code | Meaning                        |
| ----------- | ------------------------------ |
| `200`       | Request successful             |
| `201`       | Resource created successfully  |
| `400`       | Bad request / validation error |
| `401`       | Unauthorized                   |
| `403`       | Forbidden                      |
| `404`       | Resource not found             |
| `500`       | Internal server error          |

---

# 18. Common Error Response

The API will use a consistent error response format.

```json
{
  "message": "Project not found"
}
```

For validation errors:

```json
{
  "message": "Validation failed",
  "errors": [
    "Project name is required"
  ]
}
```

---

# 19. Authentication & Authorization

JWT will be used for authentication.

After successful login, the server will generate a JWT token.

The client will send the token with protected requests:

```http
Authorization: Bearer <token>
```

Protected resources will only be accessible to authenticated users.

A user will only be allowed to manage their own projects and tasks.

---

# 20. API Route Summary

| Method | Route                            | Authentication | Purpose           |
| ------ | -------------------------------- | -------------- | ----------------- |
| POST   | `/api/auth/register`             | No             | Register user     |
| POST   | `/api/auth/login`                | No             | Login user        |
| GET    | `/api/auth/me`                   | Yes            | Get current user  |
| POST   | `/api/projects`                  | Yes            | Create project    |
| GET    | `/api/projects`                  | Yes            | Get projects      |
| GET    | `/api/projects/:id`              | Yes            | Get project       |
| PUT    | `/api/projects/:id`              | Yes            | Update project    |
| DELETE | `/api/projects/:id`              | Yes            | Delete project    |
| POST   | `/api/projects/:projectId/tasks` | Yes            | Create task       |
| GET    | `/api/projects/:projectId/tasks` | Yes            | Get project tasks |
| GET    | `/api/tasks/:id`                 | Yes            | Get task          |
| PUT    | `/api/tasks/:id`                 | Yes            | Update task       |
| DELETE | `/api/tasks/:id`                 | Yes            | Delete task       |

---

# 21. Planned Technology Stack

```text
Frontend / Client
       |
       v
REST API
       |
       v
Node.js + Express.js
       |
       v
Mongoose
       |
       v
MongoDB Atlas
```

Additional tools:

* JWT for authentication
* Jest for testing
* Supertest for API testing
* Git for version control
* GitHub for repository hosting
* Render for deployment

---

# 22. Future Project Structure

The actual implementation will later follow a structure similar to:

```text
TaskFlow
│
├── server.js
├── package.json
├── .env
├── .gitignore
│
├── config
│   └── db.js
│
├── models
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── controllers
│   ├── auth.controller.js
│   ├── project.controller.js
│   └── task.controller.js
│
├── routes
│   ├── auth.routes.js
│   ├── project.routes.js
│   └── task.routes.js
│
├── middleware
│   ├── auth.middleware.js
│   └── error.middleware.js
│
└── tests
    ├── auth.test.js
    ├── project.test.js
    └── task.test.js
```

**Note:** This structure is for the future implementation phase. It is not required to create these files during Day-26.

---

# 23. Capstone Development Plan

```text
Day 26
Plan & Design
     ↓
Day 27+
Backend Implementation
     ↓
Authentication
     ↓
MongoDB Models
     ↓
Project APIs
     ↓
Task APIs
     ↓
Validation & Error Handling
     ↓
Testing
     ↓
GitHub
     ↓
MongoDB Atlas
     ↓
Render Deployment
```

---

# 24. Day-26 Deliverables

The following design work is completed for the TaskFlow capstone:

* [x] App specification
* [x] Problem statement
* [x] Project objectives
* [x] Feature list
* [x] User roles
* [x] User stories
* [x] Application flow
* [x] MongoDB collections
* [x] Database schemas
* [x] Database relationships
* [x] REST API routes
* [x] Request body shapes
* [x] Response shapes
* [x] HTTP status codes
* [x] Authentication requirements
* [x] Error response format
* [x] Technology stack
* [x] Future project structure
* [x] Capstone development plan

---

# Conclusion

Day-26 establishes the complete plan and design for the TaskFlow capstone project.

The application specification, user stories, MongoDB data model and REST API contract provide the foundation for the implementation phase.

The next phase will convert this design into a working Node.js, Express.js and MongoDB REST API.
