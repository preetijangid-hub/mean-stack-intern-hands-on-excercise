# Day 24 - Testing Basics

## 📌 Overview

Day 24 focuses on **API Testing and Testing Basics** using Jest and Supertest.

In this exercise, we learned how to test Express APIs, write unit tests, perform integration testing, test authentication and task APIs, and handle both successful and error scenarios.

---

## 🎯 Objectives

- Understand the basics of software testing.
- Understand the difference between Unit Testing and Integration Testing.
- Set up Jest for JavaScript testing.
- Use Supertest for testing Express APIs.
- Test authentication APIs.
- Test Task CRUD APIs.
- Test both happy paths and error paths.
- Use test data for automated tests.
- Test API status codes and response data.
- Integrate API testing with MongoDB.
- Test invalid routes and authentication errors.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Jest
- Supertest
- JWT
- bcryptjs
- dotenv
- Nodemon
- Postman / Thunder Client

---

## 📂 Project Structure

```text
Day-24(TESTING-BASICS)
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   └── task.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── Task.js
│   └── User.js
│
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
│
├── tests/
│   ├── auth.test.js
│   └── task.test.js
│
├── unit/
│   └── math.test.js
│
├── integration/
│   └── api.test.js
│
├── test-data/
│   └── users.js
│
├── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md