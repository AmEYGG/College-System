const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  try {
    console.log("🔹 Login Request Received:", req.body);

    const { college_email, email, password, role } = req.body;
    const userEmail = college_email || email;

    // Validation logic
    if (!userEmail || !password || !role) {
      return res.status(400).json({ 
        message: `${!userEmail ? 'Email' : !password ? 'Password' : 'Role'} is required` 
      });
    }

    const user = await User.findOne({ college_email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Role validation
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    if (user.role !== normalizedRole) {
      return res.status(403).json({ message: "Invalid role" });
    }

    // Password validation
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.college_email },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    // Determine dashboard URL
    const dashboardUrl = getDashboardUrl(user.role);

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
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { college_email } = req.body;

    // Check if user exists
    const user = await User.findOne({ college_email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // For this example, we'll just verify the email exists
    res.json({ message: "Email verified successfully" });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { college_email, newPassword } = req.body;

    // Find user in existing database
    const user = await User.findOne({ college_email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in existing database
    await User.updateOne(
      { college_email },
      { password: hashedPassword }
    );

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

const getDashboardUrl = (role) => {
  switch (role) {
    case 'Admin': return '/admin-dashboard';
    case 'Student': return '/dashboard';
    case 'Faculty': return '/admin-dashboard';
    case 'Doctor': return '/doctor-dashboard';
    default: return '/';
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword
}; 