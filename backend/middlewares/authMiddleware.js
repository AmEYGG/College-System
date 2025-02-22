const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      
      if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token, "SECRET_KEY");
      
      // Convert roles to proper case for comparison
      const normalizedAllowedRoles = allowedRoles.map(role => 
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
      );

      if (!normalizedAllowedRoles.includes(decoded.role)) {
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
