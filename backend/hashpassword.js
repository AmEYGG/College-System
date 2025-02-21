const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/College_Management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  full_name: String,
  address: String,  
  college_email: String,
  password: String, // This field stores hashed passwords
  role: String,
  department: String,
  studing_year : String,
  phone_number : String,
  parent_phone_number : String,
});

const User = mongoose.model("users", userSchema);

// Function to hash and update passwords
async function hashPasswords() {
  const users = await User.find(); // Fetch all users

  for (let user of users) {
    if (!user.password.startsWith("$2b$")) { // Check if already hashed
      const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
      await User.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword } }
      );
      console.log(`Updated password for: ${user.college_email}`);
    }
  }

  console.log("Password hashing completed!");
  mongoose.connection.close();
}

hashPasswords();
