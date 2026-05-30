const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const createApp = require("../src/app");

const User = require("../src/models/User");
const GameResult = require("../src/models/GameResult");
const Word = require("../src/models/Word");

jest.setTimeout(30000);

describe("integration: api flow", () => {
  let app;

  beforeAll(async () => {
    process.env.JWT_SECRET = "test-secret";

    await mongoose.connect(process.env.MONGO_URI);

    app = createApp();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await GameResult.deleteMany({});
    await Word.deleteMany({});
    await Word.create({ value: "apple" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("returns api health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  test("registers and logs in a user", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "Test1234",
      });

    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "Test1234",
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toEqual(expect.any(String));
  });

  test("starts a new game with valid token", async () => {
    await request(app).post("/api/auth/register").send({
      username: "player1",
      email: "player1@example.com",
      password: "Test1234",
    });

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "player1@example.com",
      password: "Test1234",
    });

    const gameResponse = await request(app)
      .get("/api/game/new")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(gameResponse.status).toBe(200);
    expect(gameResponse.body.word).toBe("apple");
    expect(gameResponse.body.length).toBe(5);
  });
});
