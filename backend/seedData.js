const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/College_Management");
    
    // Hash a test password
    const hashedPassword = await bcrypt.hash("Pass@123", 10);
    
    // Create a test student
    const testStudent = new User({
      full_name: "Test Student",
      college_email: "aarav.sharma.it@scoe.org.in",
      password: hashedPassword,
      role: "Student",
      department: "IT",
      studying_year: "2nd Year",
      div: "A"
    });

    await testStudent.save();
    console.log("✅ Test student created");

  } catch (error) {
    console.error("Error:", error);
  }
  process.exit();
};

seedDatabase(); 