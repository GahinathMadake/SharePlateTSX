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


const FetchRoleBasedData = async (req, res) => {

  try {
    const { role } = req.query;
    let query = {};
    if (role && role !== "all") {
      query.role = role.toUpperCase(); // Convert role to uppercase before querying
    }
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}

module.exports = {getUser, FetchRoleBasedData};