import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db/connect.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
   
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`VedaAI Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
