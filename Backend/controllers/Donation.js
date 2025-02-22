const Donation = require('../models/Donation');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const getDonationsUsingStatus = async (req, res) => {

   console.log("Heloooo")

    try {
        const { status } = req.params; // Get status from request parameters
        console.log("status", status);
        // Validate status
        const validStatuses = ['pending', 'accepted', 'delivered'];
        if (!validStatuses.includes(status)) {
          return res.status(400).json({ error: "Invalid status value" });
        }
    
        // Find donations with the given status
        const donations = await Donation.find({ status });
        // console.log("donations in backend", donations);
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
      }

}

const getDonationUsingId = async (req, res) => {
  try {
    const { ListId } = req.params;
      
    const donation = await Donation.findById(ListId);
    res.status(200).json({
      success:true,
      message:"Attached the Donation",
      donation
    });
    }
    catch (error) {
      res.status(500).json({
        success:false,
        message: "Internal server error"
      });
    }
}


const getTotalDonations = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments({ status: "delivered" });

    res.status(200).json({ totalDonations });
  } catch (error) {
    console.error("Error fetching total donations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deliverdDonationsCount = async (req, res) => {
  try{
  const foodCount=await Donation.aggregate([
    {$match:{status:"delivered"}},
    {$group:{_id:null,total:{$sum:"$quantity"}}}
  ]);
  res.status(200).json({ totalDeliveredFood: foodCount[0]?.total || 0 });
}
catch{
  res.status(500).json({ error: "Internal server error" });
}



}


//add on to add dashboard

const getTotalFoodSaved =async (req,res)=>{
  try{
    const totalFoodSaved=await Donation.aggregate([
      { $match: { status: { $in: ["accepted", "delivered"] } } }, // Consider only approved or delivered donations
      { $group: { _id: null, total: { $sum: "$quantity" } } }, // Sum up quantities
    ]);
    console.log("Aggregation Result:", totalFoodSaved);
    res.json({ totalFoodSaved: totalFoodSaved.length > 0 ? totalFoodSaved[0].total : 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate food saved" });
  }

  }


const getTopDonors=async(req,res)=>{

  try{
  const topDonors = await Donation.aggregate([
    { $match: { status: { $in: ["accepted", "delivered"] } } }, // Filter by status
    { $group: { _id: "$donor", totalDonations: { $sum: "$quantity" } } }, // Group by donor and sum donations
    { $sort: { totalDonations: -1 } }, // Sort by total donations (descending)
    { $limit: 5 }, // Limit to top 5 donors
    {
      $lookup: {
        from: "users", // Join with the User collection
        localField: "_id",
        foreignField: "_id",
        as: "donorDetails",
      },
    },
    { $unwind: "$donorDetails" }, // Unwind the joined data
    {
      $project: {
        name: "$donorDetails.name", // Project donor name
        totalDonations: 1, // Include total donations
      },
    },
  ]);
  res.json(topDonors);
} catch (error) {
  res.status(500).json({ error: "Failed to fetch top donors" });
 }

}


// ...existing code...

const createDonation = async (req, res) => {
  try {
    console.log("[createDonation] Received donation creation request");
    
    // Create a new donation using the mongoose model
    const donation = new Donation({
      donor: req.body.donor,
      foodType: req.body.foodType,
      quantity: req.body.quantity,
      expirationDate: req.body.expirationDate,
      pickupLocation: req.body.pickupLocation,
      name:req.body.name,
      description: req.body.description, // New field
      imageUrl: req.body.imageUrl
    });
    
    // Save the donation
    const savedDonation = await donation.save();
    
    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: savedDonation
    });
  } catch (error) {
    console.log("[createDonation] Error creating donation:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to create donation',
      error: error.message
    });
  }
};

const getMyDonations = async (req, res) => {
  try {
    console.log('Auth Middleware User:', req.user);
    
    // Use req.user.id instead of req.user._id
    const userDonations = await Donation.find({ donor: req.user.id })
      .sort({ createdAt: -1 })
      .populate('donor', 'name')
      .lean();

    console.log('Raw donations found:', userDonations);

    // Transform the data to match frontend expectations
    const formattedDonations = userDonations.map(donation => {
      return {
        _id: donation._id.toString(),
        foodType: donation.foodType,
        quantity: Number(donation.quantity),
        expirationDate: donation.expirationDate.toISOString(),
        pickupLocation: donation.pickupLocation,
        description: donation.description || '',
        imageUrl: donation.imageUrl || '',
        donor: {
          _id: donation.donor._id.toString(),
          name: donation.donor.name || ''
        },
        status: donation.status,
        createdAt: donation.createdAt.toISOString()
      };
    });

    console.log('Formatted donations:', formattedDonations);
    res.status(200).json(formattedDonations);
  } catch (error) {
    console.error('[getMyDonations] Error:', error);
    res.status(500).json({ 
      error: "Internal server error", 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


const addDonationToUser = async (req, res) => {
  try {
    const { donationId } = req.params;
    const userId = req.user.id;


    const donation = await Donation.findById(
      donationId,
    );

    if (!donation) {
      return res.status(404).json({
        success:false,
        message: "Donation not found" 
      });
    }



    if(donation.receiver){
      return res.status(400).json({
        success:false,
        message:"Food already reserved",
      });
    }

    donation.receiver = userId;
    donation.status = "accepted";

    const userDonor = await User.findById(donation.donor);

    // Send OTP via email
    const subject = 'Shareplat - Your Donation Accepted';
    const text = `Your Donation of ${donation.description}, was reserved by NGO`;
    const htmlBody = `<h1>Your Donation of ${donation.description}, was reserved by NGO</h1>`;

    await sendEmail(userDonor.email, subject, text, htmlBody);

    donation.save();

    res.status(200).json({ 
      success:true,
      message: "Donation assigned successfully",
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message: "Server error", error 
    });
  }
}



// Export all functions properly
module.exports = { 
  getDonationsUsingStatus,
  getDonationUsingId,
  getTotalDonations, 
  deliverdDonationsCount, 
  createDonation,
  getMyDonations,
  addDonationToUser,
  getTotalFoodSaved,
  getTopDonors,
};



