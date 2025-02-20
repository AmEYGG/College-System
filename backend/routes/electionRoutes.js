const express = require("express");
const multer = require("multer");
const path = require("path");
const ElectionCandidate = require("../models/ElectionCandidate");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post("/registerCandidate", upload.single("photo"), async (req, res) => {
  try {
    const { fullName, email, department, year, position, additionalDetails } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newCandidate = new ElectionCandidate({
      fullName,
      email,
      department,
      year,
      position,
      additionalDetails,
      photo,
    });

    await newCandidate.save();
    res.status(201).json({ message: "Candidate Registered Successfully", candidate: newCandidate });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
