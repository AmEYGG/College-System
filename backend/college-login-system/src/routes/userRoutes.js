const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const userController = new UserController();

// Route to get user information based on role
router.get('/:role', userController.getUserByRole);

// Route to get all users
router.get('/', userController.getAllUsers);

module.exports = router;