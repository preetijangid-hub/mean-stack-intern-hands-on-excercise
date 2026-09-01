# 🚀 TaskFlow — Full-Stack Task Management Application

## 📌 Project Overview

TaskFlow is a full-stack task management application built as the final capstone project of the MEAN Stack Internship.

The application provides secure user authentication and complete task management functionality. Users can register, log in, create tasks, update tasks, change task status, search and filter tasks, delete tasks, and securely log out.

The project follows a complete full-stack architecture:

Angular Frontend → Express REST API → MongoDB Database

---

## 🎯 Project Objective

The main objective of TaskFlow is to build and deploy a complete full-stack application using the MEAN stack with:

- User registration and login
- JWT-based authentication
- Protected API routes
- Task CRUD operations
- MongoDB database integration
- Angular frontend
- HTTP services and interceptor
- Route guards
- Form validation
- Loading, error, and empty states
- Responsive and user-friendly UI
- Production deployment
- End-to-end testing

---

# ✨ Features

## 🔐 Authentication

- User registration
- User login
- JWT authentication
- Token storage
- Authentication interceptor
- Protected routes
- Automatic authentication handling
- Logout functionality

## 📋 Task Management

Authenticated users can:

- Create a task
- View tasks
- Edit a task
- Delete a task
- Change task status
- Set task priority
- Add task description

### Task Status

- Todo
- In Progress
- Done

### Task Priority

- Low
- Medium
- High

## 🔎 Task Organization

The dashboard supports:

- Task search
- Status filtering
- Priority filtering
- Sorting
- Empty-state handling
- Loading-state handling
- Error-state handling

---

# 🛠️ Tech Stack

## Frontend

- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- Angular HttpClient
- RxJS

## Backend

- Node.js
- Express.js
- REST API
- JWT
- bcrypt
- Mongoose

## Database

- MongoDB
- MongoDB Atlas

## Deployment

- Render

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman / API testing tools
- npm

---

# 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │      User/Browser    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Angular Frontend     │
                    │                      │
                    │ Components           │
                    │ Services             │
                    │ Router               │
                    │ Auth Guard           │
                    │ HTTP Interceptor     │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │ Express.js Backend   │
                    │                      │
                    │ Routes               │
                    │ Controllers          │
                    │ Validation           │
                    │ JWT Authentication   │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │ MongoDB Atlas        │
                    │                      │
                    │ Users                │
                    │ Tasks                │
                    └──────────────────────┘