const request = require("supertest");
const mongoose = require("mongoose");

const createApp = require("../src/app");

describe("integration: health route", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("returns api health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
    });
  });
});
