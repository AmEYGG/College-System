const mongoose = require("mongoose");

const electionCandidateSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  department: String,
  year: String,
  position: String,
  additionalDetails: String,
  photo: String,
}, { timestamps: true });

module.exports = mongoose.model("ElectionCandidate", electionCandidateSchema);
