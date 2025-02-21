const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/Authentication');
const { 
  getDonationsUsingStatus,
  getDonationUsingId,
  getTotalDonations, 
  deliverdDonationsCount, 
  createDonation, 
  getMyDonations,
  addDonationToUser
} = require('../controllers/Donation');

// Make sure this route is before the /:status route to avoid conflicts
router.get("/my-donations", authMiddleware, getMyDonations);

router.get("/totaldonations", authMiddleware, getTotalDonations);
router.get("/totaldeliveredfood", authMiddleware, deliverdDonationsCount);
router.get("/:status", authMiddleware, getDonationsUsingStatus);
router.get("donation/:ListId", authMiddleware, getDonationUsingId);
router.post("/create", createDonation);
router.post("/:donationId/assign", addDonationToUser);

module.exports = router;