const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { login, forgotPassword, resetPassword } = require("../controllers/authController");
const User = require("../models/User");

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { college_email, password, role } = req.body;

    // Find user
    const user = await User.findOne({ college_email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check role
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    if (user.role !== normalizedRole) {
      return res.status(403).json({ message: "Invalid role" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    // Get dashboard URL
    const dashboardUrl = getDashboardUrl(user.role);

    res.json({
      token,
      user: {
        full_name: user.full_name,
        college_email: user.college_email,
        role: user.role,
        department: user.department,
        studying_year: user.studying_year,
        div: user.div
      },
      dashboardUrl
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

function getDashboardUrl(role) {
  const urls = {
    'Admin': '/admin-dashboard',
    'Student': '/dashboard',
    'Faculty': '/admin-dashboard',
    'Doctor': '/doctor-dashboard'
  };
  return urls[role] || '/dashboard';
}

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Add this route to check a user's password
router.get("/check-user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ college_email: req.params.email }).select('college_email password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      email: user.college_email,
      hasPassword: !!user.password,
      passwordLength: user.password?.length || 0
    });
  } catch (error) {
    res.status(500).json({ message: "Error checking user", error: error.message });
  }
});

module.exports = router;