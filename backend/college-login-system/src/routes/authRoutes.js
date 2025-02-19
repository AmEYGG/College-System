const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

const authController = new AuthController();

// Login route
router.post('/login', authController.login.bind(authController));

module.exports = router;