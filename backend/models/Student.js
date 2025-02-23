const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college_email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  studying_year: { type: Number, required: true },
  div: { type: String, required: true },
  role: { type: String, default: 'Student' },
  votedPositions: [{ type: String }], // Array of positions the student has voted for
  hasVoted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema); 