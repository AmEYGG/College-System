const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Express app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/College_Management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// User Model
const User = mongoose.model("users", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: String,
  passwordHash: String,
  department: String,
}));

// 🛠 Login Route
app.post("/login", async (req, res) => {
  try {
    console.log("🔹 Login Request Received:", req.body); // Debugging

    const { email, password, role } = req.body;
    
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User Not Found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== role) {
      console.log("❌ Role Mismatch:", role);
      return res.status(403).json({ message: "Invalid role" });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      console.log("❌ Invalid Password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });

    console.log("✅ Login Successful for:", email);
    res.json({ message: "Login successful", token });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error. Please try again later.", error });
  }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
