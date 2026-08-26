const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {
  taskValidation,
  validateTask,
} = require("../validators/taskValidator");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasks);

router.get("/:id", getTask);

router.post(
  "/",
  taskValidation,
  validateTask,
  createTask
);

router.put(
  "/:id",
  taskValidation,
  validateTask,
  updateTask
);

router.delete("/:id", deleteTask);

module.exports = router;