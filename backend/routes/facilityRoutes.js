const express = require('express');
const router = express.Router();
const FacilityBooking = require('../models/FacilityBooking');
const authMiddleware = require('../middlewares/authMiddleware');

// Create booking
router.post('/', authMiddleware(['Student']), async (req, res) => {
  try {
    // Set proper headers
    res.setHeader('Content-Type', 'application/json');

    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is empty'
      });
    }

    // Validate required fields
    const requiredFields = ['organizationName', 'leaderName', 'contactNumber', 'facility', 'bookingReason', 'bookingDate'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate facility type
    const validFacilities = ['Auditorium', 'Seminar Hall', 'Sports Ground', 'Conference Room'];
    if (!validFacilities.includes(req.body.facility)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid facility type'
      });
    }

    // Create booking
    const booking = new FacilityBooking({
      organizationName: req.body.organizationName,
      leaderName: req.body.leaderName,
      contactNumber: req.body.contactNumber,
      facility: req.body.facility,
      bookingReason: req.body.bookingReason,
      bookingDate: new Date(req.body.bookingDate),
      studentId: req.user.id
    });

    await booking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully',
      data: booking
    });

  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing booking request',
      error: error.message
    });
  }
});

// Get user's bookings
router.get('/my-bookings', authMiddleware(['Student']), async (req, res) => {
  try {
    const bookings = await FacilityBooking.find({ studentId: req.user.id })
      .sort('-createdAt');

    return res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// Get all bookings (admin only)
router.get('/all', authMiddleware(['Admin']), async (req, res) => {
  try {
    const bookings = await FacilityBooking.find()
      .populate('studentId', 'full_name college_email')
      .sort('-createdAt');

    return res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', authMiddleware(['Admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await FacilityBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: `Booking ${status.toLowerCase()} successfully`,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
});

module.exports = router;