const express = require('express');
const connectDB = require('./config/Database');

// -------------------------Routes---------------------------------
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const ngoRoutes = require("./routes/Ngo");
const donationRoutes = require("./routes/donation");

require('dotenv').config();


// Initialize Express app
const app = express();
const cookieParser = require("cookie-parser");


// Allow Cross origin access
const cors = require('cors');

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser())


app.use(cors({
  origin: "http://localhost:5173",  // ✅ Replace with your frontend URL
  credentials: true,
}));


// Middleware to parse JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
connectDB();


// Define routes
app.use('/api/auth', authRoutes);
app.use("/api/ngos", ngoRoutes);

// app.use('/api', userRoutes);
app.use('/api/faq', require('./routes/faq'));
app.use('/user', userRoutes);
app.use("/api/donations",donationRoutes);

// In your main app.js/index.js
app.use('/api/upload', require('./routes/upload'));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});