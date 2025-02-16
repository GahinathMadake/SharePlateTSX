
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {

  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded.user; // Attach user data to request

    console.log("Decode",decoded);

    next();
  }
  catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


module.exports = {authMiddleware};