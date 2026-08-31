const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const protect = require('../middleware/auth');
const { taskValidator } = require('../validators/taskValidators');

// All task routes require a logged-in user
router.use(protect);

router.route('/').get(getTasks).post(taskValidator, createTask);
router.route('/:id').get(getTaskById).put(taskValidator, updateTask).delete(deleteTask);

module.exports = router;
