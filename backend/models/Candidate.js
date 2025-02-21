// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  collegeYear: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);
