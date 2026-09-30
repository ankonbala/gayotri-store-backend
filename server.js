import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

// =========================
// CORS
// =========================

const allowedOrigins = [
 "https://gayotris-rosette.vercel.app/",
    "http://localhost:5173",
  "https://www.rosette.website",
  "https://rosette.website"
 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =========================
// Middleware
// =========================

app.use(express.json());

// =========================
// Health Check
// =========================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Rosette API is running",
  });
});

// =========================
// Routes
// =========================

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// =========================
// Error Handler
// =========================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

// =========================
// Server
// =========================

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rosette";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Rosette API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
