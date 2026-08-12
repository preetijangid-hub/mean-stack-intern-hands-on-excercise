const express = require("express");

const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");

const app = express();

const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Day 17 Express Basics API is running",
  });
});

// Router modules
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} does not exist`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});