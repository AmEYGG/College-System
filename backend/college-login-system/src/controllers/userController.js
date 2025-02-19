const User = require('../models/userModel');

class UserController {
  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getUsersByRole(req, res) {
    try {
      const role = req.params.role;
      const users = await User.find({ role });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Additional user-related methods can be added here
}

module.exports = new UserController();