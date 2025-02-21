const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/Authentication');
const { getDonations, getTotalDonations, deliverdDonationsCount, createDonation } = require('../controllers/Donation');

// Apply auth to specific routes that need it
router.get("/totaldonations", authMiddleware, getTotalDonations);
router.get("/totaldeliveredfood", authMiddleware, deliverdDonationsCount);
router.get("/:status", authMiddleware, getDonations);

// Make the create donation endpoint public
router.post("/create", createDonation);

module.exports = router;