const User = require('../models/User');


const  getUser = async (req, res) => {
    try {
      // console.log("Request Received", req.user.email, req.user.id)

      const user = await User.findById(req.user.id);

      console.log(user);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({
        success:true,
        message:"User verification successful!",
        user:user
      });
    }
    catch(error){
      // console.error(error.message);
      res.status(500).json({
        success: false,
        message: "User not Found"
      });
    } 
}

const  logOut = async (req, res) => {
  console.log("Logout");
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict",
  });

  res.status(200).json({ success: true, message: "Logged out successfully!" });
}

const userProfileUpdate = async (req, res) => {
  console.log("Request Body:", req.body);

  try {
    const { _id, name, about, phone, location, profileImage } = req.body;

    // Validate required fields
    if (!name || !about || !phone || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Find the user by ID and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { 
        name, 
        about, 
        phone, 
        location,
        ...(profileImage && { profileImage }) // Only include if profileImage exists
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const updateImageProfile = async(req, res) =>{
  console.log("Hello");
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



const getDonarDataByID = async (req, res) => {
  try {

    console.log("jfkhgdjkhgerjtgdfrbejhfvbcdncbnvfdf")
    const { donationId } = req.params;

    const donor = await User.findById(donationId);
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.status(200).json({
      success:true,
      message:"User Sent Successfully",
      donor:{
        name: donor.name,
        email: donor.email,
        about:donor.about,
        phone: donor.phone,
        location: donor.location,
        profileImage: donor.profileImage,
        },
    });
  } 
  catch (error) {
    res.status(500).json({
      success:true,
      message:"User Sent Successfully",
  });
}
}



module.exports = {getUser, logOut, userProfileUpdate, updateImageProfile, yearlyChartData, FetchRoleBasedData, getDonarDataByID};