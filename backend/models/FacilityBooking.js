const mongoose = require('mongoose');

const facilityBookingSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  leaderName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  facility: {
    type: String,
    required: true,
    enum: ['Auditorium', 'Seminar Hall', 'Sports Ground', 'Conference Room'] // Add your facilities here
  },
  bookingReason: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Facility_booking', facilityBookingSchema);