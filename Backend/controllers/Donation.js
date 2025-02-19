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


module.exports = { getDonations,getTotalDonations,deliverdDonationsCount };