const mongoose = require("mongoose");

const createApp = require("./app");
const seedWords = require("./utils/seedWords");

async function connectToDatabase(mongoUri = process.env.MONGO_URI) {
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

async function initializeAppData() {
  await seedWords();
}

async function startServer() {
  const PORT = process.env.PORT || 5000;

  try {
    await connectToDatabase();
    await initializeAppData();

    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

module.exports = {
  startServer,
  connectToDatabase,
  initializeAppData,
};
