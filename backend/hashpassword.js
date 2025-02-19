const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/College_Management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  passwordHash: String, // This field stores hashed passwords
  department: String,
});

const User = mongoose.model("users", userSchema);

// Function to hash and update passwords
async function hashPasswords() {
  const users = await User.find(); // Fetch all users

  for (let user of users) {
    if (!user.passwordHash.startsWith("$2b$")) { // Check if already hashed
      const hashedPassword = await bcrypt.hash(user.passwordHash, 10); // Hash the password
      await User.updateOne(
        { _id: user._id },
        { $set: { passwordHash: hashedPassword } }
      );
      console.log(`Updated password for: ${user.email}`);
    }
  }

  console.log("Password hashing completed!");
  mongoose.connection.close();
}

hashPasswords();
