const request = require("supertest");
const app = require("../app");

describe("API Integration Smoke Tests", () => {
  test("GET / should return API status", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Day 24 Testing Basics API is running"
    );
  });

  test("GET unknown route should return 404", async () => {
    const response = await request(app).get("/unknown-route");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Route not found");
  });
});