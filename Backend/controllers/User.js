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
    const { _id, name, about, phone, location } = req.body;

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
      { name, about, phone, location },
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



module.exports = {getUser, logOut, userProfileUpdate, updateImageProfile};