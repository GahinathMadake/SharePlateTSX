const Donation = require('../models/Donation');
const User = require('../models/User');
const axios = require('axios');
const Feedback = require('../models/Feedback');
const sendEmail = require('../utils/sendEmail');
const otpVerificationTemplate = require('../helper/OTPVerification');

// const { calculateDistance, calculateMaxDistance, sendEmail, generateNGOEmail } = require("../utils");
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

    console.log("matching ngo fetch", ngos);
    // Convert pickup location to lat/lng using Google Geocoding API
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        donor.pickupLocation
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

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

    // Log matched NGOs
    console.log("Matched NGOs:", validMatches);

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
      .populate('receiver', 'name')
      .lean();

    console.log('Raw donations found:', userDonations);

    res.status(200).json(userDonations);
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

const getAcceptedDonations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const donations = await Donation.find({ 
      receiver: userId,
      status: "accepted"
    })
    .populate('donor', 'name')
    .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching accepted donations",
      error: error.message 
    });
  }
};

const completeDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const userId = req.user.id;

    const donation = await Donation.findOne({
      _id: donationId,
      receiver: userId,
      status: "accepted"
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found or not authorized"
      });
    }

    donation.status = "delivered";
    await donation.save();

    res.status(200).json({
      success: true,
      message: "Donation marked as delivered"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error completing donation",
      error: error.message
    });
  }
};

const getMyAcceptedAndDeliveredDonations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const donations = await Donation.find({
      receiver: userId,
      status: { $in: ['accepted', 'delivered'] }
    })
    .populate('donor', 'name')  // Ensure donor field is populated
    .sort({ createdAt: -1 });

    // Check for existing feedback for each donation
    const donationsWithFeedbackStatus = await Promise.all(
      donations.map(async (donation) => {
        const feedback = await Feedback.findOne({ donation: donation._id });
        return {
          ...donation.toObject(),
          hasFeedback: !!feedback
        };
      })
    );

    res.status(200).json(donationsWithFeedbackStatus);
  } catch (error) {
    console.error('Error in getMyAcceptedAndDeliveredDonations:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching donations",
      error: error.message
    });
  }
};


const submitFeedback = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { rating, comment, images } = req.body;
    const userId = req.user.id;

    const existingFeedback = await Feedback.findOne({
      ngo: userId,
      donation: donationId
    });

    const donation = await Donation.findById(donationId);

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: "Feedback already submitted for this donation"
      });
    }

    const feedback = new Feedback({
      ngo: userId,
      donation: donationId,
      donor:donation.donor,
      rating,
      comment,
      images: images || []
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting feedback",
      error: error.message
    });
  }
};

const getFeedbackDetails = async (req, res) => {
  try {
    const { donationId } = req.params;
    
    // First find the feedback directly
    const feedback = await Feedback.findOne({
      donation: donationId
    }).populate('ngo', 'name');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "No feedback found for this donation"
      });
    }

    // Format the response
    const response = {
      rating: feedback.rating,
      comment: feedback.comment || '',
      images: feedback.images || [],
      createdAt: feedback.createdAt,
      ngoName: feedback.ngo?.name || 'Anonymous'
    };

    res.status(200).json(response);
    
  } catch (error) {
    console.error('Error in getFeedbackDetails:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching feedback",
      error: error.message
    });
  }
};

const generateDeliveryOTP = async (req, res) => {
  try {
    const { donationId } = req.params;
    const userId = req.user.id;

    // Find donation and populate both receiver and donor details
    const donation = await Donation.findOne({
      _id: donationId,
      donor: userId,
      status: "accepted"
    }).populate('receiver', 'email name')
      .populate('donor', 'name');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found or not authorized"
      });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP expiration time (e.g., 30 minutes from now)
    const otpExpires = new Date(Date.now() + 30 * 60 * 1000);

    // Store OTP and expiration in donation document
    donation.otp = otp;
    donation.otpExpires = otpExpires;
    await donation.save();

    // Create email content
    const emailSubject = 'SharePlate - Delivery OTP';
    const textContent = `Your delivery OTP is: ${otp}. This OTP will expire in 30 minutes.`;
    
    // Create custom HTML template for delivery OTP
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
            <h2 style="color: #2E7D32; text-align: center;">SharePlate Delivery OTP</h2>
            <p>Hello ${donation.receiver.name},</p>
            <p>A delivery OTP has been generated for the food donation from ${donation.donor.name}.</p>
            <p>Donation details:</p>
            <ul>
              <li>Food Type: ${donation.foodType}</li>
              <li>Quantity: ${donation.quantity} servings</li>
              <li>Pickup Location: ${donation.pickupLocation}</li>
            </ul>
            <div style="background-color: #E8F5E9; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
              <h3 style="margin: 0; color: #2E7D32;">Your OTP: ${otp}</h3>
              <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">Valid for 30 minutes</p>
            </div>
            <p style="font-size: 0.9em; color: #666; text-align: center;">
              Please provide this OTP to the donor when collecting the donation.
            </p>
          </div>
        </body>
      </html>
    `;

    // Send OTP email to NGO
    await sendEmail(
      donation.receiver.email,
      emailSubject,
      textContent,
      htmlContent
    );

    res.status(200).json({
      success: true,
      message: "OTP generated and sent to NGO",
      otp: otp,
      expiresAt: otpExpires
    });

  } catch (error) {
    console.error('Error in generateDeliveryOTP:', error);
    res.status(500).json({
      success: false,
      message: "Error generating OTP",
      error: error.message
    });
  }
};

const verifyDeliveryOTP = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { otp } = req.body;
    const userId = req.user.id;

    const donation = await Donation.findOne({
      _id: donationId,
      receiver: userId,
      status: "accepted"
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found or not authorized"
      });
    }

    if (!donation.otp || !donation.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "No OTP generated for this donation"
      });
    }

    if (Date.now() > donation.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }

    if (donation.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error('Error in verifyDeliveryOTP:', error);
    res.status(500).json({
      success: false,
      message: "Error verifying OTP",
      error: error.message
    });
  }
};

const getNgoDashboardData = async (req, res) => {
  try {
    const ngoId = req.user.id;
    // Donations that have been accepted or delivered
    const processedDonations = await Donation.find({
      receiver: ngoId,
      status: { $in: ["accepted", "delivered"] },
    });
    const totalDonations = processedDonations.length;
    const totalFoodSaved = processedDonations.reduce(
      (total, donation) => total + donation.quantity,
      0
    );
    // Pending donations for this NGO
    const pendingDonations = await Donation.countDocuments({
      status: "pending",
    });

    const currentliveDonations = await Donation.countDocuments({
      receiver: ngoId,
      status: "accepted",
    });

    res.status(200).json({ totalDonations, totalFoodSaved, pendingDonations , currentliveDonations});
  } catch (error) {
    console.error("Error fetching NGO dashboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getalldonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// write function to get all accepted donations created by a donor who is logged in

const getAcceptedDonationsByDonor = async (req, res) => {
  try {
    const userId = req.user.id;
    const donations = await Donation.find({
      donor: userId,
      status: "accepted",
    });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
  getAcceptedDonations,
  completeDonation,
  getMyAcceptedAndDeliveredDonations,
  submitFeedback,
  getFeedbackDetails,
  generateDeliveryOTP,
  verifyDeliveryOTP,
  getNgoDashboardData,
  getalldonations,
  getAcceptedDonationsByDonor,
};



