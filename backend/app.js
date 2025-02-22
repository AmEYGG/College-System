const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require('./middlewares/errorHandler');
const path = require("path");
const connectDB = require('./config/db');
const User = require('./models/User');
const candidateRoutes = require('./routes/candidateRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const electionRoutes = require("./routes/electionRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/candidates", electionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/users", userRoutes);

// 🛠 Login Route
app.post("/login", async (req, res) => {
  try {
    console.log("🔹 Login Request Received:", req.body);

    const { college_email, email, password, role } = req.body;
    
    // Allow both college_email and email for backwards compatibility
    const userEmail = college_email || email;

    // Validate inputs with specific error messages
    if (!userEmail) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    // Find user by email
    const user = await User.findOne({ college_email: userEmail });
    if (!user) {
      console.log("❌ User Not Found:", userEmail);
      return res.status(404).json({ message: "User not found" });
    }

    // Normalize role case for comparison
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    if (user.role !== normalizedRole) {
      console.log("❌ Role Mismatch. Expected:", user.role, "Got:", normalizedRole);
      return res.status(403).json({ message: "Invalid role" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("❌ Invalid Password for:", userEmail);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });

    // Determine dashboard URL based on role
    let dashboardUrl;
    switch (user.role) {
      case 'Admin':
        dashboardUrl = '/admin-dashboard';
        break;
      case 'Student':
        dashboardUrl = '/dashboard';
        break;
      case 'Faculty':
        dashboardUrl = '/admin-dashboard';
        break;
      case 'Doctor':
        dashboardUrl = '/doctor-dashboard';
        break;
      default:
        dashboardUrl = '/dashboard';
    }

    console.log("✅ Login Successful for:", userEmail);
    res.json({ 
      message: "Login successful", 
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
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error. Please try again later.", error });
  }
});

// Protected Routes for Different Dashboards
app.get("/admin-dashboard", authMiddleware(['Admin', 'Faculty']), async (req, res) => {
  try {
    // Fetch admin specific data
    const adminData = await User.findById(req.user.id).select('-password');
    res.json({ 
      message: "Welcome Admin", 
      user: adminData 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/dashboard", authMiddleware(['Student']), async (req, res) => {
  try {
    const studentData = await User.findById(req.user.id).select('-password');
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
    const facultyData = await User.findById(req.user.id).select('-password');
    res.json({ 
      message: "Welcome Faculty", 
      user: facultyData 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/doctor-dashboard", authMiddleware(['Doctor']), async (req, res) => {
  try {
    const doctorData = await User.findById(req.user.id).select('-password');
    res.json({ 
      message: "Welcome Doctor", 
      user: doctorData 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Test route to check users in database
app.get("/test-users", async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});
app.use('/api/candidates', candidateRoutes);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', err);
  }
});
