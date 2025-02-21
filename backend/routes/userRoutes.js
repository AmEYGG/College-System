const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/getUserByRole", async (req, res) => {
  try {
    const { role, email } = req.query;
    const user = await User.findOne({ role, email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
