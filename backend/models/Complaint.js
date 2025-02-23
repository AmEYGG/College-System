const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintType: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  anonymous: { type: Boolean, default: true },
  priority: { type: String, default: 'medium' },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
