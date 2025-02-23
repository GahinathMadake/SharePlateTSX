const Contact = require('../models/Contact');
const User = require('../models/User');

const raiseUserQuery = async (req, res) => {

    console.log("HJhjdhgskdjfghsbjdhf")
    try {
      const { name, email, phone, query } = req.body;
      const userId = req.user.id;
  
      if (!name || !email || !phone || !query) {
        return res.status(400).json({
            success: false, 
            message: "All Fields are required" 
        });
      }

      const user =  await User.findById(userId);

      if (!user) {
        return res.status(400).json({
            success: false, 
            message: "User unauthorised!" 
        });
      }

  
      const newContact = new Contact({
        user: userId,
        name,
        email,
        phone,
        query,
      });
  
      await newContact.save();
  
      res.status(201).json({
        success: true,
        message: "Query submitted successfully!",
        contact: newContact
      });
  
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

const fetchUserQuery = async (req, res) => {
  console.log("User");
    try {
        const queries = await Contact.find().populate('user', 'name email'); // Populate user details if needed
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  module.exports = {raiseUserQuery, fetchUserQuery};
  