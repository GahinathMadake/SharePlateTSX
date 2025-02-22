const Donation = require('../models/Donation');
const User = require('../models/User');
const axios = require('axios');

// const { calculateDistance, calculateMaxDistance, sendEmail, generateNGOEmail } = require("../utils");
const sendEmail = require("../utils/sendEmail");
const {calculateDistance}= require("../utils/calculateDistance");
const {calculateMaxDistance}= require("../utils/calculateMaxDistance");
const {generateNGOEmail}= require("../utils/generateNgoEmail");

require("dotenv").config();


const getMatchNgos = async (req, res) => {
  try {
    const { donorId } = req.body;

    // Fetch donor details
    const donor = await Donation.findById(donorId).populate("donor");
    if (!donor) {
      console.log(donor);
      return res.status(404).json({ error: "Donor not found" });
    }

    // Fetch all NGOs
    const ngos = await User.find({ role: "NGO" }).select("email location");


    console.log("matching ngo fetch",ngos);
    // Convert pickup location to lat/lng using Google Geocoding API
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        donor.pickupLocation
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
   // console.log("geocodeResponse",geocodeResponse);

    if (!geocodeResponse.data.results || geocodeResponse.data.results.length === 0) {
      console.error("No results found for address:", donor.pickupLocation);
      throw new Error("No results found for address");
    }

    const { lat: donorLat, lng: donorLng } =
      geocodeResponse.data.results[0].geometry.location;

    // Current date
    const currentDate = new Date();

    // Calculate dynamic maximum distance
    const maxDistance = calculateMaxDistance(donor.expirationDate, currentDate);

    // Match NGOs
    const matches = await Promise.all(
      ngos.map(async (ngo) => {
        // Convert NGO location to lat/lng using Google Geocoding API
        const ngoGeocodeResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            ngo.location
          )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
    
        if (!ngoGeocodeResponse.data.results || ngoGeocodeResponse.data.results.length === 0) {
          console.error("No results found for NGO address:", ngo.location);
          return null; // Skip this NGO
        }
    
        const { lat: ngoLat, lng: ngoLng } =
          ngoGeocodeResponse.data.results[0].geometry.location;
    
        // Calculate distance
        const distance = calculateDistance(donorLat, donorLng, ngoLat, ngoLng);
    
        // Calculate estimated travel time (in hours)
        const averageSpeed = 30; // Average travel speed in km/h
        const travelTime = distance / averageSpeed;
    
        // Calculate NGO-specific expiration time
        const expirationDate = new Date(donor.expirationDate);
        const ngoExpirationTime = expirationDate - travelTime * 1000 * 60 * 60; // Convert travelTime (hours) to milliseconds
    
        // Calculate NGO-specific time difference
        const timeDifference = (ngoExpirationTime - currentDate) / (1000 * 60 * 60); // Convert milliseconds to hours
    
        // Check if the food can reach the NGO before it expires
        if (timeDifference <= 0) {
          console.log("Skipping NGO:", ngo.email, "because travel time exceeds expiration time");
          return null; // Skip this NGO if the food cannot reach in time
        }
    
        // Assign weights to distance and expiration time
        const distanceWeight = 0.6; // Higher weight for distance
        const expirationWeight = 0.4; // Lower weight for expiration time
    
        // Normalize distance (lower distance = higher score)
        const normalizedDistance = Math.max(0, 1 - distance / maxDistance);
    
        // Normalize expiration time (earlier expiration = higher score)
        const maxExpirationHours = 168; // Maximum expiration hours for normalization (7 days)
        const normalizedExpiration = Math.max(0, 1 - timeDifference / maxExpirationHours);
    
        // Calculate combined score
        const score =
          distanceWeight * normalizedDistance + expirationWeight * normalizedExpiration;
    
        return { ...ngo.toObject(), distance, timeDifference, travelTime, score };
      })
    );

    // Filter valid matches within max distance
    const validMatches = matches.filter(
      (match) => match !== null && match.distance <= maxDistance
    );

    // Sort matches by score (highest score first)
    validMatches.sort((a, b) => b.score - a.score);

    // Send emails to matched NGOs
    for (const match of validMatches) {
      const { subject, text, html } = generateNGOEmail(donor.donor, donor);
      await sendEmail(match.email, subject, text, html);
    }

    res.json({ matches: validMatches });
  } catch (error) {
    console.error("Error matching donor with NGOs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


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
        console.log("donations in backend", donations);
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

    donation.save();

    res.status(200).json({ message: "Donation assigned successfully", donation });
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error });
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
  getMatchNgos,
};



