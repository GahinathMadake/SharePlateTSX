const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  console.log("Accessed AuthMidleware")

  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded.user; // Attach user data to request

    console.log("Decoded user:", decoded.user); // Log decoded user

    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log error
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  console.log("User role:", req.user.role); // Log user role
  if (req.user.role.toLowerCase() !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { authMiddleware, isAdmin };