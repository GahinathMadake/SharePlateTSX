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
  getAcceptedDonations,
  completeDonation,
  getMyAcceptedAndDeliveredDonations,
  submitFeedback,
  getFeedbackDetails,
  generateDeliveryOTP,
  verifyDeliveryOTP
} = require('../controllers/Donation');

// Make sure this route is before the /:status route to avoid conflicts
router.get("/my-donations", authMiddleware, getMyDonations);
router.get("/accepted", authMiddleware, getAcceptedDonations);
router.patch("/:donationId/complete", authMiddleware, completeDonation);
router.get("/my-accepted-delivered", authMiddleware, getMyAcceptedAndDeliveredDonations);
router.post("/:donationId/feedback", authMiddleware, submitFeedback);
router.get("/:donationId/feedback", authMiddleware, getFeedbackDetails);
router.post("/:donationId/generate-otp", authMiddleware, generateDeliveryOTP);
router.post("/:donationId/verify-otp", authMiddleware, verifyDeliveryOTP);


router.get("/totaldonations", authMiddleware, getTotalDonations);

router.get("/totaldeliveredfood", authMiddleware, deliverdDonationsCount);
router.get("/totalfoodsaved",authMiddleware,getTotalFoodSaved);
router.get("/topdonors",authMiddleware,getTopDonors);

router.get("/:status", authMiddleware, getDonationsUsingStatus);
router.get("donation/:ListId", authMiddleware, getDonationUsingId);
router.post("/create", createDonation);
router.put("/:donationId/assign", authMiddleware, addDonationToUser);

module.exports = router;