const User = require('../models/User');

const  getUser = async (req, res) => {
    try {
      console.log("Request Received", req.user.email)

      const user = await User.findById(req.user.id);
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
    console.log("query", req.query);
    console.log("role:", role);

    if(role === 'all'){
      users = await User.find({ role: { $ne: "Admin" } });  //exclude admin here
    }
    else if(role==='donar'){
      const users = await User.find({role: 'Donar'});
    }
    else if(role==='ngo'){
      const users = await User.find({role: 'NGO'});
    }
    else{
      res.status(400).json({ message: "Invalid role" });
    }
    res.json(users);
    
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const { getYearlyChartData } = require("../utils/chartData");

const yearlyChartData=async(req,res)=>{
  try {
    const yearlyChartData = await getYearlyChartData();
    res.json(yearlyChartData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

};

module.exports = { getUser, FetchRoleBasedData,yearlyChartData };