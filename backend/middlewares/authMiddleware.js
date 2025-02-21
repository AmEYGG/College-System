const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Get token from header
      const token = req.header("Authorization")?.replace("Bearer ", "");
      
      if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
      }

      // Verify token
      const decoded = jwt.verify(token, "SECRET_KEY");
      
      // Check if user role is allowed
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded;
      next();
      
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
};

module.exports = authMiddleware;
