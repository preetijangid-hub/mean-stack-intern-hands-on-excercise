const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const connectDB = require("../config/db");

const { testUser } = require("../test-data/users");

beforeAll(async () => {
  await connectDB();
}, 15000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("TASK API - Integration Tests", () => {
  let token;
  let taskId;

  beforeAll(async () => {
    const user = testUser();

    const response = await request(app)
      .post("/api/auth/register")
      .send(user);

    token = response.body.token;
  });

  test("GET /api/tasks - without token", async () => {
    const response = await request(app)
      .get("/api/tasks");

    expect(response.statusCode).toBe(401);
  });

  test("GET /api/tasks - happy path", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("tasks");
    expect(response.body).toHaveProperty("count");
  });

  test("POST /api/tasks - happy path", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Learn Jest",
        description: "Practice Jest and Supertest",
        completed: false,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("task");

    taskId = response.body.task._id;
  });

  test("POST /api/tasks - missing title", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "No title",
      });

    expect(response.statusCode).toBe(400);
  });

  test("GET /api/tasks/:id - happy path", async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("task");
  });

  test("PUT /api/tasks/:id - happy path", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        completed: true,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.task.completed).toBe(true);
  });

  test("DELETE /api/tasks/:id - happy path", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test("GET deleted task - error path", async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });

  test("GET invalid route - error path", async () => {
    const response = await request(app)
      .get("/invalid-route");

    expect(response.statusCode).toBe(404);
  });
});