const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/Authentication');
const { 
  getDonationsUsingStatus,
  getDonationUsingId,
  getTotalDonations, 
  deliverdDonationsCount, 
  createDonation,
  getTotalFoodSaved,
  getTopDonors,
  getMyDonations,
  addDonationToUser,
  getMatchNgos,
  getAcceptedDonations,
  completeDonation,
  getMyAcceptedAndDeliveredDonations,
  submitFeedback,
  getFeedbackDetails,
  generateDeliveryOTP,
  verifyDeliveryOTP,
  getNgoDashboardData,   // <-- imported new method,
  getalldonations,
  getAcceptedDonationsByDonor
} = require('../controllers/Donation');

// Base routes
router.post("/create", authMiddleware, createDonation);
router.get("/totaldonations", authMiddleware, getTotalDonations);
router.get("/totaldeliveredfood", authMiddleware, deliverdDonationsCount);
router.get("/totalfoodsaved", authMiddleware, getTotalFoodSaved);
router.get("/topdonors", authMiddleware, getTopDonors);
router.get("/my-donations", authMiddleware, getMyDonations);
router.get("/accepted", authMiddleware, getAcceptedDonations);
router.get("/my-accepted-delivered", authMiddleware, getMyAcceptedAndDeliveredDonations);
router.get("/alldonations", authMiddleware, getalldonations);
router.get("/accepteddonationsbydonor", authMiddleware, getAcceptedDonationsByDonor);

// New route for NGO dashboard data
router.get("/ngo-dashboard", authMiddleware, getNgoDashboardData);

// Routes with parameters
router.get("/:status", authMiddleware, getDonationsUsingStatus);
router.get("/donation/:ListId", authMiddleware, getDonationUsingId);
router.put("/:donationId/assign", authMiddleware, addDonationToUser);
router.patch("/:donationId/complete", authMiddleware, completeDonation);
router.post("/:donationId/feedback", authMiddleware, submitFeedback);
router.get("/:donationId/feedback", authMiddleware, getFeedbackDetails);
router.post("/:donationId/generate-otp", authMiddleware, generateDeliveryOTP);
router.post("/:donationId/verify-otp", authMiddleware, verifyDeliveryOTP);

// Special routes (should be before /:status to avoid conflicts)
router.post("/match-ngos", authMiddleware, getMatchNgos);

module.exports = router;