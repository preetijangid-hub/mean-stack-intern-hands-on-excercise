const express = require("express");

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Protected Profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;