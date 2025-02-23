const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/candidates/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get All Candidates
router.get('/', async (req, res) => {
  try {
    const { position } = req.query;
    const query = position ? { position, isActive: true } : { isActive: true };
    
    const candidates = await Candidate.find(query)
      .select('-__v')
      .sort('name');

    res.json({
      success: true,
      data: candidates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching candidates',
      error: error.message
    });
  }
});

// Create Candidate (for admin use)
router.post('/', authMiddleware(['Admin']), upload.single('image'), async (req, res) => {
  try {
    const { name, department, position, collegeYear, about } = req.body;
    
    const candidate = new Candidate({
      name,
      department,
      position,
      collegeYear,
      about,
      image: req.file ? `/uploads/candidates/${req.file.filename}` : '',
      voteCount: 0,
      isActive: true
    });

    await candidate.save();

    res.status(201).json({
      success: true,
      data: candidate,
      message: 'Candidate created successfully'
    });
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating candidate',
      error: error.message
    });
  }
});

// Get candidate by ID
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      data: candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching candidate',
      error: error.message
    });
  }
});

// Update candidate (Admin only)
router.put('/:id', authMiddleware(['Admin']), upload.single('image'), async (req, res) => {
  try {
    const { name, department, position, collegeYear, about, isActive } = req.body;
    
    const updateData = {
      name,
      department,
      position,
      collegeYear,
      about,
      isActive
    };

    if (req.file) {
      updateData.image = `/uploads/candidates/${req.file.filename}`;
    }

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      data: candidate,
      message: 'Candidate updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating candidate',
      error: error.message
    });
  }
});

// Delete candidate (Admin only)
router.delete('/:id', authMiddleware(['Admin']), async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting candidate',
      error: error.message
    });
  }
});

// Get voting results by position
router.get('/results/:position', authMiddleware(['Admin']), async (req, res) => {
  try {
    const results = await Candidate.find({ position: req.params.position })
      .select('name voteCount')
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

module.exports = router;
