import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// --- Health check ---
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "VedaAI Backend is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// --- API Routes ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/assignments", assignmentRoutes);

// --- Global error handler (must have 4 params for Express to recognize it) ---
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error("Error:", err.message);

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File too large. Maximum size is 10MB.",
    });
  }

  // Multer file type error
  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
