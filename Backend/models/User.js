const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['donor', 'ngo', 'admin'], required: true },
  location: { type: String, required: true },
  phone: { type: String },
  registrationNumber: { type: String }, // For NGOs only
  isVerified: { type: Boolean, default: false }, // For NGOs only
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);

