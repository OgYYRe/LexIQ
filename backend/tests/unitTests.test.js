const jwt = require("jsonwebtoken");
const evaluateGuess = require("../src/utils/evaluateGuess");
const authMiddleware = require("../src/middleware/authMiddleware");

jest.mock("../src/models/Word", () => ({
  countDocuments: jest.fn(),
  insertMany: jest.fn(),
}));

const Word = require("../src/models/Word");
const seedWords = require("../src/utils/seedWords");

describe("unit: evaluateGuess", () => {
  test("returns correct for all letters in the right position", () => {
    const result = evaluateGuess("apple", "apple");

    expect(result).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });

  test("returns present for letters in the wrong position", () => {
    const result = evaluateGuess("pleap", "apple");

    expect(result).toContain("present");
  });

  test("returns absent for letters that are not in the target word", () => {
    const result = evaluateGuess("zzzzz", "apple");

    expect(result).toEqual(["absent", "absent", "absent", "absent", "absent"]);
  });
});

describe("unit: seedWords", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("inserts words when database is empty", async () => {
    Word.countDocuments.mockResolvedValue(0);
    Word.insertMany.mockResolvedValue([]);

    await seedWords();

    expect(Word.countDocuments).toHaveBeenCalled();
    expect(Word.insertMany).toHaveBeenCalled();
  });

  test("does not insert words when database already has words", async () => {
    Word.countDocuments.mockResolvedValue(5);

    await seedWords();

    expect(Word.countDocuments).toHaveBeenCalled();
    expect(Word.insertMany).not.toHaveBeenCalled();
  });
});

describe("unit: authMiddleware", () => {
  test("allows request with valid JWT token", () => {
    process.env.JWT_SECRET = "test-secret";

    const token = jwt.sign(
      { id: "1", username: "testuser", email: "test@example.com" },
      process.env.JWT_SECRET,
    );

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = {};
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(req.user).toEqual({
      id: "1",
      username: "testuser",
      email: "test@example.com",
    });
    expect(next).toHaveBeenCalled();
  });

  test("returns 401 when token is missing", () => {
    const req = {
      headers: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing or invalid token.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
