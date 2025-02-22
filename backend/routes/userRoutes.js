const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require('../middlewares/authMiddleware');

// Get user profile
router.get('/profile', authMiddleware(['Admin', 'Student', 'Faculty', 'Doctor']), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by role
router.get('/getUser', authMiddleware(['Admin', 'Student', 'Faculty', 'Doctor']), async (req, res) => {
  try {
    const { role } = req.query;
    const user = await User.findOne({ 
      _id: req.user.id,
      role: role
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
