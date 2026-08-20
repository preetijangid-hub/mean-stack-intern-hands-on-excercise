require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/task.routes");

const app = express();

// Middleware
app.use(express.json());

// Connect MongoDB
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Day 23 MongoDB Integration API is running",
  });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});