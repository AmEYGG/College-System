const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/admin-dashboard", authMiddleware(['Admin', 'Faculty']), async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select('-password');
    res.json({ message: `Welcome ${userData.role}`, user: userData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/dashboard", authMiddleware(['Student']), async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select('-password');
    res.json({ message: "Welcome Student", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/doctor-dashboard", authMiddleware(['Doctor']), async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select('-password');
    res.json({ message: "Welcome Doctor", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; 