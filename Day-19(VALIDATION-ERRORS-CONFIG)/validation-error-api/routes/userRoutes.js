const express = require("express");
const validateUser = require("../validators/userValidator");

const router = express.Router();

// Create user
router.post("/", validateUser, async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    const user = {
      id: Date.now(),
      name,
      email,
      age,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Test async error handling
router.get("/test-error", async (req, res, next) => {
  try {
    throw new Error("Something went wrong in async operation");
  } catch (error) {
    next(error);
  }
});

module.exports = router;