const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
   console.log("Accessed AuthMiddleware");

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ 
        sucess:false,
        message: "No token, authorization denied" 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // console.log("Decoded User:", decoded);

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token" });
  }
};

const isAdmin = (req, res, next) => {
  console.log("User role:", req.user.role); // Log user role
  if (req.user.role.toLowerCase() !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { authMiddleware, isAdmin };