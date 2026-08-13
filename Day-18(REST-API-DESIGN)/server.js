const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory tasks data
let tasks = [
  {
    id: 1,
    title: "Learn REST API",
    completed: false
  },
  {
    id: 2,
    title: "Practice Express Routing",
    completed: true
  }
];

// GET all tasks
app.get("/api/tasks", (req, res) => {
  const { completed } = req.query;

  let result = tasks;

  if (completed !== undefined) {
    const completedValue = completed === "true";
    result = tasks.filter(task => task.completed === completedValue);
  }

  res.status(200).json(result);
});

// GET single task
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.status(200).json(task);
});

// POST create task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    title,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT update task
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const { title, completed } = req.body;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...(title !== undefined && { title }),
    ...(completed !== undefined && { completed })
  };

  res.status(200).json(tasks[taskIndex]);
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`REST API server running at http://localhost:${PORT}`);
});