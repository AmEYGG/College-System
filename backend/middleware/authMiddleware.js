const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      console.log("🔹 Checking authorization for roles:", allowedRoles);
      
      const token = req.header("Authorization")?.replace("Bearer ", "");
      
      if (!token) {
        console.log("❌ No token provided");
        return res.status(401).json({ message: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token, "SECRET_KEY");
      console.log("🔹 Decoded token role:", decoded.role);
      
      // Convert roles to proper case for comparison
      const normalizedAllowedRoles = allowedRoles.map(role => 
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
      );
      
      console.log("🔹 Normalized allowed roles:", normalizedAllowedRoles);
      console.log("🔹 User role:", decoded.role);
      
      if (!normalizedAllowedRoles.includes(decoded.role)) {
        console.log("❌ Access denied for role:", decoded.role);
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded;
      console.log("✅ Authorization successful for role:", decoded.role);
      next();
      
    } catch (error) {
      console.error("❌ Auth Error:", error);
      res.status(401).json({ message: "Token is not valid" });
    }
  };
};

module.exports = authMiddleware;
