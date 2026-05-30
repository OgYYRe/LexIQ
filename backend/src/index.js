const dotenv = require("dotenv");

const { startServer } = require("./server");

dotenv.config();

const requiredEnv = ["MONGO_URI", "JWT_SECRET"];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  console.error(
    "Set the required environment variables before starting the backend.",
  );
  process.exit(1);
}

startServer();
