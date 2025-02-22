const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: String,
  address: String,
  college_email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['Student', 'Admin', 'Faculty', 'Doctor']
  },
  department: String,
  studying_year: String,
  div: String,
  phone_number: String,
  parents_phone_number: String
});

module.exports = mongoose.model("users", userSchema); 