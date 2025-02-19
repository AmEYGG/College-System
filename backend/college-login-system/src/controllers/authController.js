class AuthController {
  constructor(User) {
    this.User = User;
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await this.User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Route users based on their roles
      switch (user.role) {
        case 'admin':
          return res.status(200).json({ message: 'Login successful', role: 'admin' });
        case 'faculty':
          return res.status(200).json({ message: 'Login successful', role: 'faculty' });
        case 'student':
          return res.status(200).json({ message: 'Login successful', role: 'student' });
        default:
          return res.status(403).json({ message: 'Access denied' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = AuthController;