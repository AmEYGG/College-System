const express = require("express");
const router = express.Router();
const { login, forgotPassword, resetPassword } = require("../controllers/authController");
const User = require("../models/User");

router.post("/login", login);
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