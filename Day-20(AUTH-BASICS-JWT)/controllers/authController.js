const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Temporary in-memory users
const users = [];

// =========================
// REGISTER
// =========================
const register = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and age are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = users.find(
      (user) => user.email === email.toLowerCase()
    );

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      age,
    };

    users.push(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =========================
// LOGIN
// =========================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = users.find(
      (user) => user.email === email.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =========================
// PROTECTED PROFILE
// =========================
const getProfile = async (req, res) => {
  const user = users.find(
    (user) => user.id === req.user.userId
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Protected profile accessed successfully",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    },
  });
};

module.exports = {
  register,
  login,
  getProfile,
};