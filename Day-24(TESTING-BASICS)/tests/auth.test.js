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

describe("AUTH API - Integration Tests", () => {
  const user = testUser();

  test("POST /api/auth/register - happy path", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
  });

  test("POST /api/auth/register - missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "missing@example.com",
      });

    expect(response.statusCode).toBe(400);
  });

  test("POST /api/auth/register - short password", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Short Password",
        email: `short${Date.now()}@example.com`,
        password: "123",
      });

    expect(response.statusCode).toBe(400);
  });

  test("POST /api/auth/register - duplicate user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(response.statusCode).toBe(409);
  });

  test("POST /api/auth/login - happy path", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /api/auth/login - wrong password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: "wrongpassword",
      });

    expect(response.statusCode).toBe(401);
  });

  test("POST /api/auth/login - missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
      });

    expect(response.statusCode).toBe(400);
  });
});