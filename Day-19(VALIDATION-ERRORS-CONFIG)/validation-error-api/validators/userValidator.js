const { body, validationResult } = require("express-validator");

const validateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 18 })
    .withMessage("Age must be an integer and at least 18"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.errors = errors.array();

      return next(error);
    }

    next();
  },
];

module.exports = validateUser;