const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to User model
        required: true
      },
    name:{
        type: String, required: true 
    },
    email:{
        type: String, required: true
    },
    phone:{ 
        type: String, required: true 
    },
    query:{
        type: String, required: true 
    },
    document: { 
        type: String, default: null 
        }, // File name stored
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
