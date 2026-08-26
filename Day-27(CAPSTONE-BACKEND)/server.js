const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TaskFlow Backend API is running",
  });
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});