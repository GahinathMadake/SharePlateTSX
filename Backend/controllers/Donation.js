const Donation = require('../models/Donation');

const getDonations = async (req, res) => {

    try {
        const { status } = req.params; // Get status from request parameters
        console.log("status",status);
        // Validate status
        const validStatuses = ['pending', 'accepted', 'delivered'];
        if (!validStatuses.includes(status)) {
          return res.status(400).json({ error: "Invalid status value" });
        }
    
        // Find donations with the given status
        const donations = await Donation.find({ status });
       console.log("donations in backend",donations);
        res.status(200).json(donations);
      } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
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

// ...existing code...

const createDonation = async (req, res) => {
  console.log("[createDonation] Received donation creation request");
  try {
    const { foodType, quantity, expirationDate, pickupLocation, imageUrl } = req.body;

    // Validate required fields
    if (!foodType || !quantity || !expirationDate || !pickupLocation) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create donation object
    const donationData = {
      foodType,
      quantity,
      expirationDate,
      pickupLocation,
      imageUrl,
      donor: req.user?._id, // Add donor ID if user is authenticated
    };

    const newDonation = new Donation(donationData);
    const savedDonation = await newDonation.save();

    res.status(201).json(savedDonation);
  } catch (error) {
    console.error('[createDonation] Error creating donation:', error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Add this function to the existing controller file

const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate('donor', 'name'); // Optionally populate donor details

    res.status(200).json(donations);
  } catch (error) {
    console.error('[getMyDonations] Error fetching donations:', error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Add getMyDonations to the exports
module.exports = { 
  getDonations, 
  getTotalDonations, 
  deliverdDonationsCount, 
  createDonation,
  getMyDonations 
};



