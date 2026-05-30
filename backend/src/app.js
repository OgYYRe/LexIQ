const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");

function createApp() {
  const corsOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin(origin, callback) {
        if (
          !origin ||
          corsOrigins.length === 0 ||
          corsOrigins.includes(origin)
        ) {
          callback(null, true);
          return;
        }

        callback(new Error("Not allowed by CORS"));
      },
    }),
  );

  app.use("/api/auth", authRoutes);
  app.use("/api/game", gameRoutes);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const frontendPath = path.resolve(__dirname, "../../frontend");
  app.use(express.static(frontendPath));

  app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });

  return app;
}

module.exports = createApp;
