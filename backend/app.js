require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { connectDatabase } = require("./config/database");
const setupDefaultData = require("./seed/setupDefaultData");
const apiDelay = require("./middleware/apiDelay");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-user-id"]
  })
);

app.use(express.json());

// ============================================================
// HOME / HEALTH
// ============================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MPloyChek backend is running.",
    database: "MongoDB",
    api: "http://localhost:5000/api"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "UP",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

app.get("/api/test-delay", apiDelay, (req, res) => {
  res.json({
    success: true,
    message: "API delay test successful.",
    timestamp: new Date()
  });
});

// ============================================================
// API ROUTES
// ============================================================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);        // admin CRUD
app.use("/api/users", profileRoutes);     // profile (public-ish)
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ============================================================
// 404
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
    path: req.originalUrl
  });
});

// ============================================================
// START SERVER
// ============================================================

async function startServer() {
  try {
    await connectDatabase();

    console.log("");
    console.log("==========================================");
    console.log("       MPloyChek MongoDB Backend");
    console.log("==========================================");

    await setupDefaultData();

    app.listen(PORT, () => {
      console.log("");
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("");
    console.error("==========================================");
    console.error("DATABASE CONNECTION FAILED");
    console.error("==========================================");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();