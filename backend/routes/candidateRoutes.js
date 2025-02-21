// routes/candidateRoutes.js
const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// @route   GET /api/candidates
// @desc    Get all candidates
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/candidates
// @desc    Create a new candidate
// @access  Public (Change to admin-protected in future)
router.post('/', async (req, res, next) => {
  try {
    const { name, department, collegeYear, about, image } = req.body;

    // Input Validation
    if (!name || !department || !collegeYear || !image) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const newCandidate = new Candidate({
      name,
      department,
      collegeYear,
      about,
      image
    });

    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
