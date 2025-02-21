const mongoose = require('mongoose');

// const donationSchema = new mongoose.Schema({
//   donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   foodType: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   expirationDate: { type: Date, required: true },
//   pickupLocation: { type: String, required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'delivered'], default: 'pending' },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Donation', donationSchema);

const donationSchema = new mongoose.Schema({
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  pickupLocation: { type: String, required: true },
  imageUrl: { type: String },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);