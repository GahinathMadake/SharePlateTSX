const express = require('express');
const axios = require('axios');
const connectDB = require('./config/Database');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

// Initialize Express app
const app = express();

// Configure CORS globally FIRST - before any routes
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Configure Express to handle large payloads
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));



// API Call Frontend
const API_KEY = 'AIzaSyDwVTRKadnAxjs5Go4T2nO9l0ETxySHlTo'; // Replace with your Google Maps API key

app.get('/api/nearby-places', async (req, res) => {
  const { lat, lng, radius, type } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    res.status(500).json({ error: 'Failed to fetch nearby places' });
  }
});

// Connect to MongoDB
connectDB();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const ngoRoutes = require("./routes/Ngo");
const donationRoutes = require("./routes/donation");
const contactRoutes = require('./routes/ContactUs');
const uploadRoutes = require('./routes/upload');
const feedBackRoutes = require('./routes/feedback');

// Define routes
app.use('/api/auth', authRoutes);
app.use("/api/ngos", ngoRoutes);
app.use('/user', contactRoutes);
app.use('/api/faq', require('./routes/faq'));
app.use('/user', userRoutes);
app.use("/api/donations", donationRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/feedback/user', feedBackRoutes);

// Test route
app.get('/api/donation/test', (req, res) => {
  res.json({ message: 'Donation routes are working' });
});


// CORS test route - add this to your index.js
app.get('/api/cors-test', (req, res) => {
  res.json({ 
    message: 'CORS is working correctly',
    origin: req.headers.origin || 'No origin header',
    method: req.method
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});