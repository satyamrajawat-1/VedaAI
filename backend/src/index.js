import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db/connect.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 VedaAI Backend running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/api/v1/health`);
      console.log(`🔐 Auth API: http://localhost:${PORT}/api/v1/auth`);
      console.log(`📝 Assignments API: http://localhost:${PORT}/api/v1/assignments\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
