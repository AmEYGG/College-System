const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authMiddleware = require('./middlewares/authMiddleware');

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
    console.log("🔹 Login Request Received:", req.body);

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

    // Determine dashboard URL based on role
    let dashboardUrl;
    switch (user.role.toLowerCase()) {
      case 'admin':
        dashboardUrl = '/admin-dashboard';
        break;
      case 'student':
        dashboardUrl = '/student-dashboard';
        break;
      case 'faculty':
        dashboardUrl = '/faculty-dashboard';
        break;
      case 'doctor':
        dashboardUrl = '/doctor-dashboard';
        break;
      default:
        dashboardUrl = '/dashboard';
    }

    console.log("✅ Login Successful for:", email);
    res.json({ 
      message: "Login successful", 
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      },
      dashboardUrl 
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error. Please try again later.", error });
  }
});

// Protected Routes for Different Dashboards
app.get("/admin-dashboard", authMiddleware(['admin']), async (req, res) => {
  try {
    // Fetch admin specific data
    const adminData = await User.findById(req.user.id).select('-passwordHash');
    res.json({ 
      message: "Welcome Admin", 
      user: adminData 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/student-dashboard", authMiddleware(['student']), async (req, res) => {
  try {
    const studentData = await User.findById(req.user.id).select('-passwordHash');
    res.json({ 
      message: "Welcome Student", 
      user: studentData 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/faculty-dashboard", authMiddleware(['faculty']), async (req, res) => {
  try {
    const facultyData = await User.findById(req.user.id).select('-passwordHash');
    res.json({ 
      message: "Welcome Faculty", 
      user: facultyData 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/doctor-dashboard", authMiddleware(['doctor']), async (req, res) => {
  try {
    const doctorData = await User.findById(req.user.id).select('-passwordHash');
    res.json({ 
      message: "Welcome Doctor", 
      user: doctorData 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please try another port.`);
  } else {
    console.error('❌ Server error:', err);
  }
});
