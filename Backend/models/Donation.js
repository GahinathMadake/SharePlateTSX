// In Donation.js

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  pickupLocation: { type: String, required: true },
  name:{
    type:String,
    default: "Food",
  },
  description: { type: String }, // Add description field
  imageUrl: { type: String },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //store the reciver id also but not required
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // for status keep 3 values : accepted, delivered, pending
  status: { type: String, enum: ['pending', 'accepted', 'delivered'], default: 'pending' },
  otp: { 
    type: String,
    default: null 
  },
  otpExpires: { 
    type: Date,
    default: null 
  },
  createdAt: { type: Date, default: Date.now },
});

// At the end of your schema file (document #2)
const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;