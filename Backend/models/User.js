
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about:{
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Donar", "NGO", "Admin"],
    required: true,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  registrationNumber: {
    type: String,
    validate: {
      validator: function (value) {
        // registrationNumber is required only if role is "NGO"
        if (this.role === "NGO" && !value) {
          return false;
        }
        return true;
      },
      message: "Registration Number is required for NGOs.",
    },
  },
  isVerified:{
    type: Boolean, 
    default: false,
  },
  createdAt: { type: Date, 
    default: Date.now
  },
});

module.exports = mongoose.model('User', userSchema);

