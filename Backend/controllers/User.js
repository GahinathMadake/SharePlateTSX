const User = require('../models/User');

const  getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).includes();
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
  
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("error while fetching user details"); 
    }  
}

module.exports = {getUser};