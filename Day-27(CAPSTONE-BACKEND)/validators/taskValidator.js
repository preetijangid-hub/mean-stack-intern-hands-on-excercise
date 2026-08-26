const { body, validationResult } = require("express-validator");

const taskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid task status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid task priority"),
];

const validateTask = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  taskValidation,
  validateTask,
};