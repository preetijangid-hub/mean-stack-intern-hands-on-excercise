const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

// POST - Create task
router.post("/", createTask);

// GET - Get all tasks
router.get("/", getTasks);

// GET - Get single task
router.get("/:id", getTaskById);

// PUT - Update task
router.put("/:id", updateTask);

// DELETE - Delete task
router.delete("/:id", deleteTask);

module.exports = router;