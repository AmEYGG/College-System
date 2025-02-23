const express = require('express');
const Student = require('../models/Student');
const Candidate = require('../models/Candidate');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Register Student
router.post('/register', async (req, res) => {
  const { name, email, college_email, department, studentId, studying_year, div } = req.body;
  try {
    const student = new Student({
      name,
      email,
      college_email,
      department,
      studentId,
      studying_year,
      div
    });
    await student.save();
    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Get all students
router.get('/', authMiddleware(['Admin']), async (req, res) => {
  try {
    const students = await Student.find().select('-__v');
    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Enhanced vote endpoint with authentication
router.post('/vote', authMiddleware(['Student']), async (req, res) => {
  const { candidateId, position } = req.body;
  
  try {
    // Get student from authenticated user
    const student = await Student.findById(req.user.id);
    
    // Check if student has already voted for this position
    if (student.votedPositions && student.votedPositions.includes(position)) {
      return res.status(400).json({ 
        success: false,
        message: 'You have already voted for this position.' 
      });
    }

    // Verify candidate exists and is active
    const candidate = await Candidate.findOne({ 
      _id: candidateId,
      isActive: true,
      position: position
    });

    if (!candidate) {
      return res.status(404).json({ 
        success: false,
        message: 'Candidate not found or is no longer active.' 
      });
    }

    // Atomic update of vote count
    await Candidate.findByIdAndUpdate(
      candidateId,
      { $inc: { voteCount: 1 } }
    );

    // Update student's voting record
    if (!student.votedPositions) {
      student.votedPositions = [];
    }
    student.votedPositions.push(position);
    await student.save();

    res.json({ 
      success: true,
      message: 'Vote cast successfully!' 
    });
    
  } catch (error) {
    console.error('Voting error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while processing vote.',
      error: error.message 
    });
  }
});

// Get voting results (for admin only)
router.get('/results', authMiddleware(['Admin']), async (req, res) => {
  try {
    const results = await Candidate.find()
      .select('name position voteCount')
      .sort('-voteCount');
      
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching results',
      error: error.message 
    });
  }
});

// Get voted positions for the current student
router.get('/voted-positions', authMiddleware(['Student']), async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      votedPositions: student.votedPositions || []
    });
  } catch (error) {
    console.error('Error fetching voted positions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching voted positions',
      error: error.message
    });
  }
});

module.exports = router;
